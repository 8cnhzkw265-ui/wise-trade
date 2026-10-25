require("dotenv").config();
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

/* serve the static storefront */
app.use(express.static("."));
app.use(express.json());

/* create a PaymentIntent for the current cart total (Stripe cards) */
app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency = "BDT" } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: { integration_check: "accept_a_payment" }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* create an SSLCOMMERZ payment session (bKash / Nagad / Rocket / Card in BD) */
app.post("/create-sslcommerz-payment", async (req, res) => {
  try {
    const {
      amount, currency = "BDT",
      first_name, last_name, address, city, postcode, country,
      phone, email
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const storeId = process.env.SSLCOMMERZ_STORE_ID || "sslcz";
    const storePasswd = process.env.SSLCOMMERZ_STORE_PASSWD || "sslcz";
    const isSandbox = process.env.SSLCOMMERZ_SANDBOX !== "false"; // sandbox by default
    const gatewayBase = isSandbox
      ? "https://sandbox.sslcommerz.com/gwprocess/v3/api.php"
      : "https://securepay.sslcommerz.com/gwprocess/v3/api.php";

    const tranId = "WT-" + Date.now();

    const params = new URLSearchParams();
    params.set("store_id", storeId);
    params.set("store_passwd", storePasswd);
    params.set("total_amount", amount / 100); // SSLCOMMERZ expects amount in BDT, not cents
    params.set("currency", currency);
    params.set("tran_id", tranId);
    params.set("success_url", BASE_URL + "/sslcommerz-success");
    params.set("fail_url", BASE_URL + "/sslcommerz-fail");
    params.set("cancel_url", BASE_URL + "/sslcommerz-cancel");
    params.set("cus_name", (first_name + " " + last_name).trim() || "Customer");
    params.set("cus_email", email || "");
    params.set("cus_add1", address || "");
    params.set("cus_city", city || "");
    params.set("cus_postcode", postcode || "");
    params.set("cus_country", country || "Bangladesh");
    params.set("cus_phone", phone || "");
    params.set("shipping_method", "No");
    params.set("product_name", "Wise Trade Order");
    params.set("product_category", "Goods");
    params.set("product_profile", "general");

    const response = await fetch(gatewayBase, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    const text = await response.text();

    /* SSLCOMMERZ returns JSON as a string */
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("SSLCOMMERZ non-JSON response:", text);
      return res.status(502).json({ error: "SSLCOMMERZ returned invalid response" });
    }

    if (data.status === "SUCCESS" && data.GatewayPageURL) {
      /* store pending order keyed by tran_id for validation on return */
      res.json({ gatewayUrl: data.GatewayPageURL, tranId: tranId });
    } else {
      console.error("SSLCOMMERZ initiation failed:", data);
      res.status(502).json({ error: data.status || "SSLCOMMERZ initiation failed" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* Stripe webhook — verify signature and fulfill successful payments */
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object;
    console.log("PaymentIntent succeeded:", pi.id, "amount:", pi.amount);
    /* fulfill order here: save to DB, send email, decrement stock */
  } else if (event.type === "payment_intent.payment_failed") {
    console.log("PaymentIntent failed:", event.data.object.id);
  }

  res.json({ received: true });
});

/* SSLCOMMERZ return URLs */
app.get("/sslcommerz-success", (req, res) => {
  const { val_id, tran_id } = req.query;
  res.redirect(`/payment-status.html?status=success&val_id=${val_id}&tran_id=${tran_id}`);
});

app.get("/sslcommerz-fail", (req, res) => {
  res.redirect(`/payment-status.html?status=fail`);
});

app.get("/sslcommerz-cancel", (req, res) => {
  res.redirect(`/payment-status.html?status=cancel`);
});

/* SSLCOMMERZ IPN validation (server-to-server confirmation) */
app.post("/sslcommerz-validate", async (req, res) => {
  try {
    const { val_id, tran_id, status } = req.body;
    const storeId = process.env.SSLCOMMERZ_STORE_ID || "sslcz";
    const storePasswd = process.env.SSLCOMMERZ_STORE_PASSWD || "sslcz";
    const isSandbox = process.env.SSLCOMMERZ_SANDBOX !== "false";
    const validateBase = isSandbox
      ? "https://sandbox.sslcommerz.com/validator/api/verificationserver.php"
      : "https://securepay.sslcommerz.com/validator/api/verificationserver.php";

    const validateUrl = validateBase + "?val_id=" + val_id + "&vkey=" + tran_id + "&amount=" + (req.body.amount || "") + "&store_id=" + storeId + "&store_passwd=" + storePasswd;

    const response = await fetch(validateUrl);
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = {}; }

    if (data.status === "VALID" && data.tran_id === tran_id) {
      console.log("SSLCOMMERZ payment validated:", tran_id, "amount:", data.amount);
      /* fulfill order: save to DB, send email, decrement stock */
      return res.json({ validated: true, tran_id: tran_id, amount: data.amount });
    }

    console.log("SSLCOMMERZ validation failed:", tran_id, data.status);
    res.status(400).json({ validated: false, reason: data.status });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Wise Trade checkout server running on http://localhost:${PORT}`);
  if (!process.env.STRIPE_SECRET_KEY) {
    console.warn("WARNING: STRIPE_SECRET_KEY is not set — card payments will fail.");
  }
  if (!process.env.SSLCOMMERZ_STORE_ID) {
    console.warn("WARNING: SSLCOMMERZ_STORE_ID is not set — using sandbox test credentials.");
  }
});
