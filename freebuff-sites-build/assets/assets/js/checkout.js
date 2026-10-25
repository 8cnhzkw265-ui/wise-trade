/* ============================================================
   WISE TRADE — checkout controller
   Renders the order summary from the shared cart, recalculates
   on qty/shipping changes, and fakes a successful order.
   ============================================================ */
(function () {
  "use strict";

  var $  = WT.$;
  var $$ = WT.$$;

  var FREE_SHIP = 75;
  var SHIP_FEE  = 7.95;
  var EXPRESS   = 14.00;
  var TAX_RATE  = 0.21;   /* 21% — EU default */

  function shipMode() {
    var el = document.querySelector('input[name="ship"]:checked');
    return el ? el.value : "standard";
  }

  function renderSummary() {
    var cart = WT.Cart;
    var host = $("[data-summary-items]");
    if (!host) return;

    var items = cart.items;

    if (!items.length) {
      host.innerHTML =
        '<div class="empty" style="padding:30px 0">' +
          '<span class="empty__icon"><svg><use href="#i-bag"/></svg></span>' +
          "<h3>Your cart is empty</h3>" +
          '<a class="btn btn--dark btn--sm" href="' + WT.shopUrl() + '">Browse the collection</a>' +
        "</div>";
      setTotals(0, 0);
      return;
    }

    host.innerHTML = items.map(function (item) {
      var p = WT.byId(item.id);
      if (!p) return "";
      return (
        '<div class="line" style="border-bottom:1px solid var(--stroke)">' +
          '<a class="line__media" href="' + WT.productUrl(p) + '">' +
            '<img src="' + WT.imgSrc(p) + '" alt="' + p.name + '" width="84" height="84">' +
          "</a>" +
          '<div class="line__body">' +
            '<div class="line__top"><div>' +
              '<a class="line__name" href="' + WT.productUrl(p) + '">' + p.name + "</a>" +
              '<div class="line__variant">' + WT.catName(p.cat) + " &middot; Qty " + item.qty + "</div>" +
            "</div>" +
            '<span class="line__price">' + WT.money(WT.priceOf(p) * item.qty) + "</span></div>" +
            '<div class="line__actions">' +
              '<div class="qty">' +
                '<button data-qty-dec="' + p.id + '" aria-label="Decrease quantity"><svg><use href="#i-minus"/></svg></button>' +
                "<output>" + item.qty + "</output>" +
                '<button data-qty-inc="' + p.id + '" aria-label="Increase quantity"><svg><use href="#i-plus"/></svg></button>' +
              "</div>" +
              '<button class="line__remove" data-remove="' + p.id + '">Remove</button>' +
            "</div>" +
          "</div>" +
        "</div>"
      );
    }).join("");

    var sub = cart.subtotal();
    var ship = shipMode() === "express" ? EXPRESS : (sub >= FREE_SHIP ? 0 : SHIP_FEE);
    setTotals(sub, ship);

    var count = cart.count();
    var cEl = $("[data-summary-count]");
    if (cEl) cEl.textContent = count ? "(" + count + ")" : "";

    var sStd = $("[data-ship-standard]");
    if (sStd) sStd.textContent = sub >= FREE_SHIP ? "Free" : WT.money(SHIP_FEE);

    var bar = $("[data-summary-bar]");
    if (bar) {
      bar.style.width = Math.min(100, (sub / FREE_SHIP) * 100) + "%";
      bar.setAttribute("data-full", sub >= FREE_SHIP ? "true" : "false");
    }
    var free = $("[data-summary-free]");
    if (free) {
      free.innerHTML = sub >= FREE_SHIP
        ? "Nice — <b>free standard shipping</b> applied."
        : "Add <b>" + WT.money(FREE_SHIP - sub) + "</b> more for free standard shipping.";
    }
  }

  function setTotals(sub, ship) {
    var tax = sub * TAX_RATE;
    var set = function (sel, v) { var el = $(sel); if (el) el.textContent = v; };
    set("[data-sum-subtotal]", WT.money(sub));
    set("[data-sum-shipping]", ship === 0 ? "Free" : WT.money(ship));
    set("[data-sum-tax]", WT.money(tax));
    set("[data-sum-total]", WT.money(sub + ship + tax));

    var btn = $("[data-pay-label]");
    if (btn) btn.textContent = "Pay " + WT.money(sub + ship + tax);
  }

  /* ---------------- init ---------------- */
  function init() {
    var form = $("[data-checkout]");
    if (!form) return;

    renderSummary();

    /* keep the summary live as the shared cart changes */
    document.addEventListener("wt:cart-change", function () {
      renderSummary();
    });

    /* shipping method */
    $$('input[name="ship"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        $$('input[name="ship"]').forEach(function (r) {
          var label = r.closest("label");
          if (!label) return;
          if (r.checked) {
            label.style.borderColor = "var(--brand)";
            label.style.background = "var(--brand-soft)";
          } else {
            label.style.borderColor = "var(--stroke-strong)";
            label.style.background = "transparent";
          }
        });
        renderSummary();
      });
    });

    /* light card formatting — no processing, purely cosmetic */
    var card = $("#co-card");
    if (card) {
      card.addEventListener("input", function () {
        var v = card.value.replace(/\D/g, "").slice(0, 16);
        card.value = v.replace(/(.{4})/g, "$1 ").trim();
      });
    }
    var exp = $("#co-exp");
    if (exp) {
      exp.addEventListener("input", function () {
        var v = exp.value.replace(/\D/g, "").slice(0, 4);
        exp.value = v.length > 2 ? v.slice(0, 2) + " / " + v.slice(2) : v;
      });
    }

    /* submit -> simulate a successful order */
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!WT.Cart.count()) {
        WT.toast({ title: "Your cart is empty", text: "Add something before checking out." });
        return;
      }

      /* basic required-field validation with inline feedback */
      var missing = $$("[required]", form).filter(function (f) { return !f.value.trim(); });
      if (missing.length) {
        missing[0].style.borderColor = "var(--down)";
        missing[0].focus();
        WT.toast({ title: "Check your details", text: missing.length + " field(s) still need filling in." });
        return;
      }

      var email = $("#co-email");
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
        email.style.borderColor = "var(--down)";
        email.focus();
        WT.toast({ title: "Invalid email", text: "Please check your email address." });
        return;
      }

      var orderNo = "WT-" + Math.floor(100000 + Math.random() * 899999);
      var label = $("[data-pay-label]");
      if (label) label.textContent = "Processing…";

      setTimeout(function () {
        var items = WT.Cart.count();
        var total = $("[data-sum-total]").textContent;

        /* clear the cart */
        WT.Cart.items = [];
        WT.Cart.save();

        form.innerHTML =
          '<div class="empty" style="padding:70px 20px;grid-column:1/-1">' +
            '<span class="empty__icon" style="background:var(--brand-soft);color:var(--brand)"><svg><use href="#i-check"/></svg></span>' +
            "<h3>Order confirmed</h3>" +
            "<p>Thanks — your order <b>" + orderNo + "</b> is in. We've emailed a receipt and you can " +
            "expect it to leave Rotterdam within 24 hours.</p>" +
            '<div class="totals" style="max-width:280px;margin:0 auto;text-align:left">' +
              '<div class="totals__row"><span>Items</span><span>' + items + "</span></div>" +
              '<div class="totals__row"><span>Total paid</span><span>' + total + "</span></div>" +
            "</div>" +
            '<a class="btn btn--dark" href="' + WT.shopUrl() + '">Continue shopping</a>' +
          "</div>";

        var aside = $(".co__summary");
        if (aside) aside.hidden = true;

        WT.toast({ title: "Order " + orderNo, text: "Confirmation sent to your inbox." });
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 1100);
    });
  }

  document.addEventListener("wt:ready", init);
})();
