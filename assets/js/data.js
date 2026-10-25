/* ============================================================
 *   WT — catalog data
 *   Static front-end data source.
 *   ============================================================ */
(function (global) {
  "use strict";
  global.WT = global.WT || {};

  /* categories derived from the product catalogue — new categories added
     via admin or CSV import show up automatically on the frontend */
  function titleCase(s) {
    return String(s || "").replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }
  function buildCategories() {
    var seen = {}, out = [];
    for (var i = 0; i < PRODUCTS.length; i++) {
      var c = PRODUCTS[i].cat;
      if (c && !seen[c]) { seen[c] = 1; out.push({ id: c, name: titleCase(c), count: 0 }); }
    }
    return out;
  }
  var CATEGORIES = [];

  global.WT.refreshCategories = function () {
    CATEGORIES = buildCategories();
    global.WT.CATEGORIES = CATEGORIES;
  };

  var PRODUCTS = [
    {
      id: "anker-maggo-10k", name: "Anker MagGo 10K", cat: "chargers",
      sku: "WT-CHG-001",
      price: 8500, compareAt: 10500, rating: 4.8, reviews: 512, flags: ["sale", "hot"],
      colors: ["#1f1c18", "#e8e2d4"], img: "charger-anker-maggo-10k.webp",
      blurb: "10,000 mAh of pocketable magnetic power, slim enough to stay on the phone all day.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "7.5W MagSafe", "Standard": "Qi2", "Port": "USB-C" },
      stock: 42
    },
    {
      id: "baseus-qi2-22-5w", name: "Baseus Qi2 Power Bank 22.5W", cat: "chargers",
      sku: "WT-CHG-002",
      price: 6500, rating: 4.7, reviews: 348, flags: ["new"],
      colors: ["#e8e2d4", "#1f1c18"], img: "charger-baseus-qi2-22-5w.jpg",
      blurb: "Qi2 magnetic charging with 22.5W wired output for the days you don't want to wait.",
      specs: { "Capacity": "10,000 mAh", "Output": "22.5W", "Standard": "Qi2", "Ports": "USB-A + USB-C" },
      stock: 56
    },
    {
      id: "qi2-magnetic-10k", name: "Qi2 Magnetic Power Bank 10000mAh", cat: "chargers",
      sku: "WT-CHG-003",
      price: 4500, rating: 4.5, reviews: 203, flags: [],
      colors: ["#1f1c18"], img: "charger-qi2-magnetic-10k.jpg",
      blurb: "No-frills magnetic bank with a four-light gauge so you always know where you stand.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "15W", "Standard": "Qi2", "Gauge": "4-LED indicator" },
      stock: 74
    },
    {
      id: "otterbox-magsafe", name: "OtterBox MagSafe Power Bank", cat: "chargers",
      sku: "WT-CHG-004",
      price: 8000, rating: 4.6, reviews: 167, flags: [],
      colors: ["#cfc3ad", "#1f1c18"], img: "charger-otterbox-magsafe.jpg",
      blurb: "Soft-touch shell in sand, built to the drop standard the cases are known for.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "MagSafe 7.5W", "Standard": "Qi", "Port": "USB-C" },
      stock: 31
    },
    {
      id: "lisen-100w", name: "LISEN 100W Power Bank", cat: "chargers",
      sku: "WT-CHG-005",
      price: 10500, rating: 4.7, reviews: 291, flags: ["new"],
      colors: ["#8d9194", "#1f1c18"], img: "charger-lisen-100w.jpg",
      blurb: "Built-in USB-C cable and 100W output — laptop-grade power without the desk brick.",
      specs: { "Output": "100W", "Cable": "Built-in USB-C", "Capacity": "20,000 mAh", "Body": "Aluminium" },
      stock: 26
    },
    {
      id: "qi2-slim-graphite", name: "Qi2 Slim Power Bank — Graphite", cat: "chargers",
      sku: "WT-CHG-006",
      price: 4200, compareAt: 5200, rating: 4.4, reviews: 128, flags: ["sale"],
      colors: ["#5a5d63"], img: "charger-qi2-slim-graphite.jpg",
      blurb: "The thinnest way to carry a full charge — graphite, featherweight and pocket-flat.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "15W", "Standard": "Qi2", "Finish": "Graphite" },
      stock: 58
    },
    {
      id: "neopack-rapid-pro", name: "Neopack Rapid Pro Power Bank", cat: "chargers",
      sku: "WT-CHG-007",
      price: 5500, rating: 4.6, reviews: 244, flags: [],
      colors: ["#4a5b8c", "#1f1c18"], img: "charger-neopack-rapid-pro.jpg",
      blurb: "25W wireless and wired, slim enough to disappear under a phone and a case.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "25W Qi2", "Port": "25W USB-C", "Gauge": "LED indicator" },
      stock: 47
    },
    {
      id: "tri-link-cable", name: "Tri-Link 3-in-1 Charging Cable", cat: "chargers",
      sku: "WT-CHG-008",
      price: 1200, compareAt: 1500, rating: 4.6, reviews: 118, flags: ["new"],
      colors: ["#c0392b", "#1f1c18"], img: "cable-tri-link-red.jpg",
      blurb: "One braided strand, three ends — micro, Lightning and USB-C for the drawer that hosts everybody's phone.",
      specs: { "Ends": "Micro-USB / Lightning / USB-C", "Length": "1.2 m", "Jacket": "Nylon braid", "Output": "Up to 18W" },
      stock: 63
    },
    {
      id: "baseus-lightning-20w", name: "Baseus USB-C to Lightning Cable 20W", cat: "chargers",
      sku: "WT-CHG-009",
      price: 900, rating: 4.8, reviews: 264, flags: ["hot"],
      colors: ["#1f1c18"], img: "cable-baseus-lightning-20w.jpg",
      blurb: "MFi-certified fast charge for iPhone — half a battery in half an hour, strain-relieved where it counts.",
      specs: { "Output": "20W PD", "Ends": "USB-C to Lightning", "Length": "1 m", "Rating": "MFi-certified" },
      stock: 96
    },
    {
      id: "hoco-braided-usbc", name: "Hoco Braided USB-C Cable — Black", cat: "chargers",
      sku: "WT-CHG-010",
      price: 700, rating: 4.5, reviews: 96, flags: [],
      colors: ["#1f1c18", "#c0392b"], img: "cable-hoco-braided-black.jpg",
      blurb: "Thick nylon braid, red-accented plugs and a bend relief that survives the bottom of the desk drawer.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1.5 m", "Jacket": "Nylon braid", "Output": "Up to 24W" },
      stock: 110
    },
    {
      id: "joyroom-lightning-30w", name: "Joyroom USB-C to Lightning Cable 30W", cat: "chargers",
      sku: "WT-CHG-011",
      price: 1200, compareAt: 1500, rating: 4.7, reviews: 152, flags: ["sale"],
      colors: ["#1f1c18"], img: "cable-joyroom-lightning-30w.jpg",
      blurb: "Ships in the box you'll actually keep — 30W PD over a metre of braided nylon.",
      specs: { "Output": "30W PD", "Ends": "USB-C to Lightning", "Length": "1 m", "Jacket": "Braided nylon" },
      stock: 74
    },
    {
      id: "everyday-usbc-white", name: "Everyday USB-C Cable — White", cat: "chargers",
      sku: "WT-CHG-012",
      price: 600, rating: 4.3, reviews: 88, flags: [],
      colors: ["#e8e2d4"], img: "cable-usb-c-white.jpg",
      blurb: "The plain white cable for the nightstand — no branding, no fuss, just current.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1 m", "Output": "18W", "Finish": "Matte white" },
      stock: 140
    },
    {
      id: "ugreen-silver-usbc", name: "UGREEN USB-C Cable — Silver", cat: "chargers",
      sku: "WT-CHG-013",
      price: 1000, rating: 4.7, reviews: 143, flags: [],
      colors: ["#b8bcc0", "#e8e2d4"], img: "cable-ugreen-silver.jpg",
      blurb: "Aluminium shells and a silver braid that doesn't fight the rest of the desk.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1 m", "Data": "480 Mbps", "Shell": "Aluminium" },
      stock: 82
    },
    {
      id: "hoco-3in1-grey", name: "Hoco 3-in-1 Charging Cable — Grey", cat: "chargers",
      sku: "WT-CHG-014",
      price: 1300, compareAt: 1600, rating: 4.5, reviews: 104, flags: ["sale"],
      colors: ["#8d9194"], img: "cable-hoco-3in1-grey.jpg",
      blurb: "Three heads on one braided trunk — charge the phone, the watch and the earbuds at once.",
      specs: { "Ends": "USB-C / Lightning / Micro-USB", "Input": "USB-A", "Length": "1.2 m", "Jacket": "Braided nylon" },
      stock: 58
    },
    {
      id: "twin-lightning-white", name: "Twin Lightning Cable — White", cat: "chargers",
      sku: "WT-CHG-015",
      price: 800, rating: 4.2, reviews: 47, flags: [],
      colors: ["#e8e2d4"], img: "cable-twin-lightning-white.jpg",
      blurb: "Lightning at both ends — the odd little cable that moves shots from the old phone to the new one.",
      specs: { "Ends": "Lightning to Lightning", "Length": "1 m", "Use": "Charge & sync", "Finish": "Gloss white" },
      stock: 39
    },
    {
      id: "anker-bio-usbc", name: "Anker Bio-Based USB-C Cable", cat: "chargers",
      sku: "WT-CHG-016",
      price: 1100, rating: 4.8, reviews: 187, flags: ["new"],
      colors: ["#e8e2d4"], img: "cable-anker-bio-white.png",
      blurb: "Cable and strap grown from castor oil rather than oil wells — same fast charge, lighter footprint.",
      specs: { "Ends": "USB-C to USB-C", "Output": "60W PD", "Length": "1.8 m", "Jacket": "Bio-based TPE" },
      stock: 67
    },
    {
      id: "active-hunter-commuter", name: "Active Hunter Commuter Pack", cat: "backpacks",
      sku: "WT-BAG-001",
      price: 8500, compareAt: 10500, rating: 4.7, reviews: 214, flags: ["hot"],
      colors: ["#1f1c18", "#3a3d42"], img: "backpack-active-hunter.jpg",
      blurb: "Wipe-clean textured shell with a badge patch and a side pocket that swallows a bottle.",
      specs: { "Capacity": "22 L", "Laptop": "Up to 15.6-inch", "Shell": "Ripstop polyester", "Water": "IPX4 rated" },
      stock: 36
    },
    {
      id: "core-daypack", name: "Core Daypack — Black", cat: "backpacks",
      sku: "WT-BAG-002",
      price: 4500, rating: 4.6, reviews: 331, flags: [],
      colors: ["#1f1c18"], img: "backpack-core-daypack.jpg",
      blurb: "One clean silhouette, two zips and nothing to snag on the train.",
      specs: { "Capacity": "18 L", "Laptop": "Up to 14-inch", "Shell": "Recycled nylon", "Weight": "480 g" },
      stock: 64
    },
    {
      id: "fieldwork-commuter", name: "Fieldwork Commuter Backpack", cat: "backpacks",
      sku: "WT-BAG-003",
      price: 6500, rating: 4.8, reviews: 142, flags: ["new"],
      colors: ["#1f1c18", "#4a4d42"], img: "backpack-fieldwork-16.jpg",
      blurb: "Boxy front pocket for chargers and cables, padded sleeve for the laptop.",
      specs: { "Capacity": "20 L", "Laptop": "Up to 16-inch", "Shell": "Cordura nylon", "Pockets": "5 organised" },
      stock: 41
    },
    {
      id: "featherlight-daypack", name: "Featherlight Daypack", cat: "backpacks",
      sku: "WT-BAG-004",
      price: 3500, compareAt: 4500, rating: 4.4, reviews: 96, flags: ["sale"],
      colors: ["#1f1c18"], img: "backpack-featherlight.jpg",
      blurb: "Weighs less than a water bottle — the pack you forget you are wearing.",
      specs: { "Capacity": "16 L", "Weight": "310 g", "Shell": "Ripstop nylon", "Packable": "Folds into its pocket" },
      stock: 88
    },
    {
      id: "bagboss-combo", name: "Bag Boss Commuter", cat: "backpacks",
      sku: "WT-BAG-005",
      price: 9500, compareAt: 12000, rating: 4.6, reviews: 118, flags: ["new", "hot"],
      colors: ["#8d9194", "#1f1c18"], img: "backpack-bagboss-combo.jpg",
      blurb: "The full pack plus the sling — two bags that split the day between them.",
      specs: { "Set": "Backpack + sling", "Capacity": "22 L + 4 L", "Shell": "Coated polyester", "Laptop": "Up to 15.6-inch" },
      stock: 27
    },
    {
      id: "metro-leather-backpack", name: "Metro Leather Backpack", cat: "backpacks",
      sku: "WT-BAG-006",
      price: 10500, rating: 4.5, reviews: 87, flags: [],
      colors: ["#1f1c18"], img: "backpack-metro-leather.jpg",
      blurb: "Smooth leather with gold-tone hardware — the one that goes to dinner after work.",
      specs: { "Capacity": "17 L", "Material": "Vegan leather", "Hardware": "Gold-tone", "Laptop": "Up to 14-inch" },
      stock: 19
    },
    {
      id: "voyager-tech-pack", name: "Voyager Tech Travel Pack", cat: "backpacks",
      sku: "WT-BAG-007",
      price: 12500, compareAt: 15000, rating: 4.8, reviews: 203, flags: ["sale", "hot"],
      colors: ["#1f1c18", "#3a3d42"], img: "backpack-voyager-tech.jpg",
      blurb: "Buckles, a pass-through charging port and a clamshell opening for airport security.",
      specs: { "Capacity": "26 L", "Laptop": "Up to 17-inch", "Port": "USB-C pass-through", "Opening": "Clamshell" },
      stock: 33
    },
    {
      id: "fusion-grey-daypack", name: "Fusion Daypack — Grey", cat: "backpacks",
      sku: "WT-BAG-008",
      price: 5500, rating: 4.5, reviews: 176, flags: [],
      colors: ["#8d9194", "#d96b1e"], img: "backpack-fusion-grey.webp",
      blurb: "Matte grey shell with pop-orange pulls — calm to look at, easy to find in the dark.",
      specs: { "Capacity": "21 L", "Laptop": "Up to 15.6-inch", "Shell": "Water-repellent", "Pockets": "6 zip pockets" },
      stock: 52
    },
    {
      id: "drift-headphones", name: "Drift Over-Ear Headphones — Black", cat: "audio",
      sku: "WT-AUD-001",
      price: 6500, compareAt: 7500, rating: 4.6, reviews: 156, flags: ["new"],
      colors: ["#1f1c18"], img: "headphone-drift-black.jpg",
      blurb: "Soft protein pads, a bronze-tinted cup and a fold that disappears into the commuter pocket.",
      specs: { "Type": "Over-ear, closed", "Battery": "40 h", "Bluetooth": "5.3", "Weight": "240 g" },
      stock: 44
    },
    {
      id: "cloud-headphones-white", name: "Cloud On-Ear Headphones — White", cat: "audio",
      sku: "WT-AUD-002",
      price: 4900, rating: 4.5, reviews: 121, flags: [],
      colors: ["#e8e2d4"], img: "headphone-cloud-white.jpg",
      blurb: "Featherweight on-ear cups in matte white — the pair you forget you're wearing on a call.",
      specs: { "Type": "On-ear, closed", "Battery": "35 h", "Bluetooth": "5.3", "Weight": "180 g" },
      stock: 66
    },
    {
      id: "apex-anc-headphones", name: "Apex ANC Headphones — 95H", cat: "audio",
      sku: "WT-AUD-003",
      price: 9500, compareAt: 12000, rating: 4.8, reviews: 298, flags: ["sale", "hot"],
      colors: ["#1f1c18"], img: "headphone-apex-anc.jpg",
      blurb: "Hybrid noise cancelling, LDAC and ninety-five hours between charges — the long-haul pair.",
      specs: { "Driver": "40 mm", "Noise cancelling": "Hybrid ANC", "Battery": "95 h", "Codec": "LDAC / Hi-Res" },
      stock: 37
    },
    {
      id: "vector-headphones", name: "Vector Over-Ear Headphones — Black", cat: "audio",
      sku: "WT-AUD-004",
      price: 7000, rating: 4.6, reviews: 134, flags: [],
      colors: ["#1f1c18"], img: "headphone-vector-black.jpg",
      blurb: "Memory-foam cups, a steel slider and a sound signature tuned for voices and long flights.",
      specs: { "Type": "Over-ear, closed", "Battery": "45 h", "Bluetooth": "5.2", "Weight": "260 g" },
      stock: 52
    },
    {
      id: "haze-headphones-sand", name: "Haze On-Ear Headphones — Sand", cat: "audio",
      sku: "WT-AUD-005",
      price: 6000, rating: 4.4, reviews: 89, flags: ["new"],
      colors: ["#d9cfc2", "#e8e2d4"], img: "headphone-haze-sand.jpg",
      blurb: "Warm sand colourway with plush pads — quiet luxury for the open-plan floor.",
      specs: { "Type": "On-ear, closed", "Battery": "30 h", "Bluetooth": "5.2", "Weight": "195 g" },
      stock: 48
    },
    {
      id: "hoco-studio-headphones", name: "Hoco Studio Over-Ear Headphones", cat: "audio",
      sku: "WT-AUD-006",
      price: 3500, compareAt: 5000, rating: 4.4, reviews: 178, flags: ["sale"],
      colors: ["#1f1c18"], img: "headphone-hoco-studio.jpg",
      blurb: "Fold-flat cups, physical buttons and a week of playback for the price of two lunches.",
      specs: { "Driver": "40 mm", "Battery": "60 h", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 84
    },
    {
      id: "ember-headphones", name: "Ember On-Ear Headphones — Black", cat: "audio",
      sku: "WT-AUD-007",
      price: 4500, rating: 4.3, reviews: 76, flags: [],
      colors: ["#1f1c18", "#8b5a2b"], img: "headphone-ember-black.jpg",
      blurb: "Matte black with a copper ring — enough padding for a full session, small enough to live in a tote.",
      specs: { "Type": "On-ear, closed", "Battery": "32 h", "Bluetooth": "5.2", "Weight": "190 g" },
      stock: 61
    },
    {
      id: "sony-headphones-black", name: "Sony Headphones — Black", cat: "audio",
      sku: "WT-AUD-008",
      price: 8500, rating: 4.7, reviews: 212, flags: ["hot"],
      colors: ["#1f1c18"], img: "headphone-sony-black.jpg",
      blurb: "The commute standard: multipoint pairing, fast charge and an app with every EQ you'll never use.",
      specs: { "Driver": "30 mm", "Battery": "50 h", "Bluetooth": "5.2", "Multipoint": "2 devices" },
      stock: 43
    },
    {
      id: "hoco-eq33-earbuds", name: "Hoco EQ33 Wireless Earbuds", cat: "audio",
      sku: "WT-AUD-009",
      price: 1200, rating: 4.4, reviews: 167, flags: ["new"],
      colors: ["#1f1c18"], img: "earbud-hoco-eq33.jpg",
      blurb: "App-tuned EQ, touch controls and twenty-eight hours in a case the size of a lighter.",
      specs: { "Driver": "13 mm", "Battery": "28 h with case", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 120
    },
    {
      id: "nest-earbuds", name: "Nest Wireless Earbuds — Black", cat: "audio",
      sku: "WT-AUD-010",
      price: 2000, rating: 4.5, reviews: 108, flags: [],
      colors: ["#1f1c18"], img: "earbud-nest-black.jpg",
      blurb: "Gloss-black buds with stems that seat first time, in a case with a proper lid click.",
      specs: { "Driver": "12 mm", "Battery": "24 h with case", "Bluetooth": "5.3", "Water": "IPX5" },
      stock: 77
    },
    {
      id: "bose-sport-earbuds", name: "Bose Sport Earbuds — Berry", cat: "audio",
      sku: "WT-AUD-011",
      price: 7500, compareAt: 9500, rating: 4.7, reviews: 231, flags: ["sale"],
      colors: ["#7b2d4e"], img: "earbud-bose-sport.jpg",
      blurb: "StayHear tips that will not move at mile ten, in a berry pair you'll actually spot in a bag.",
      specs: { "Driver": "Bose tuned", "Battery": "5 h (15 h case)", "Bluetooth": "5.1", "Water": "IPX4" },
      stock: 36
    },
    {
      id: "halo-earbuds", name: "Halo Wireless Earbuds — Black", cat: "audio",
      sku: "WT-AUD-012",
      price: 1500, rating: 4.3, reviews: 84, flags: [],
      colors: ["#1f1c18"], img: "earbud-halo-black.jpg",
      blurb: "Call-first tuning with two mics per side — the pair for back-to-back standups.",
      specs: { "Mics": "2 per bud", "Battery": "20 h with case", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 95
    },
    {
      id: "juayou-earbuds", name: "Juayou Wireless Earbuds with Charging Case", cat: "audio",
      sku: "WT-AUD-013",
      price: 800, rating: 4.2, reviews: 63, flags: [],
      colors: ["#1f1c18"], img: "earbud-juayou-black.jpg",
      blurb: "The honest entry pair — instant pairing, a clear little case light, and change from twenty dollars.",
      specs: { "Driver": "10 mm", "Battery": "18 h with case", "Bluetooth": "5.1", "Charging": "USB-C" },
      stock: 130
    },
    {
      id: "orbit-earbuds", name: "Orbit Wireless Earbuds — Black", cat: "audio",
      sku: "WT-AUD-014",
      price: 3000, compareAt: 3500, rating: 4.6, reviews: 142, flags: ["sale", "new"],
      colors: ["#1f1c18"], img: "earbud-orbit-black.jpg",
      blurb: "Open the lid and they are already connected — touch controls and a low-profile stem.",
      specs: { "Driver": "13 mm", "Battery": "26 h with case", "Bluetooth": "5.3", "Water": "IPX5" },
      stock: 68
    },
    {
      id: "earfun-earbuds", name: "EarFun Wireless Earbuds — Black", cat: "audio",
      sku: "WT-AUD-015",
      price: 4500, rating: 4.8, reviews: 196, flags: ["hot"],
      colors: ["#1f1c18"], img: "earbud-earfun-black.jpg",
      blurb: "The reviewer favourite — hybrid ANC, wireless charging and a case that rounds into a pocket.",
      specs: { "Noise cancelling": "Hybrid ANC", "Battery": "30 h with case", "Charging": "USB-C + Qi", "Bluetooth": "5.3" },
      stock: 54
    },
    {
      id: "navigator-navy-watch", name: "Navigator Smart Watch — Navy", cat: "watches",
      sku: "WT-WCH-001",
      price: 10500, rating: 4.6, reviews: 128, flags: ["new"],
      colors: ["#2c3a55", "#1f1c18"], img: "watch-navigator-navy.jpg",
      blurb: "Titanium-tone case on a navy fluoro band — dual-band GPS and a display bright enough for noon.",
      specs: { "Display": "1.9-inch AMOLED", "Battery": "10 days", "GPS": "Dual-band", "Water": "5 ATM" },
      stock: 41
    },
    {
      id: "ranger-black-watch", name: "Ranger Smart Watch — Black", cat: "watches",
      sku: "WT-WCH-002",
      price: 8500, compareAt: 10000, rating: 4.5, reviews: 96, flags: ["sale"],
      colors: ["#1f1c18", "#d96b1e"], img: "watch-ranger-black.jpg",
      blurb: "Round face, rotating crown and an orange accent dial — the field watch of the group.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "7 days", "Sports": "120 modes", "Water": "5 ATM" },
      stock: 57
    },
    {
      id: "bloom-pink-band", name: "Bloom Fitness Band — Pink", cat: "watches",
      sku: "WT-WCH-003",
      price: 2500, rating: 4.4, reviews: 142, flags: [],
      colors: ["#e9a9a0", "#e8e2d4"], img: "watch-bloom-pink.jpg",
      blurb: "Slim, light and pink enough to find in a handbag — sleep, steps and stand rings.",
      specs: { "Display": "1.6-inch AMOLED", "Battery": "10 days", "Sensors": "HR + SpO2", "Water": "IP68" },
      stock: 88
    },
    {
      id: "glow-black-watch", name: "Glow Smart Watch — Black", cat: "watches",
      sku: "WT-WCH-004",
      price: 3500, rating: 4.3, reviews: 74, flags: [],
      colors: ["#1f1c18"], img: "watch-glow-black.jpg",
      blurb: "Neon numerals you can read across a dark room, in a square case under forty grams.",
      specs: { "Display": "1.85-inch HD", "Battery": "7 days", "Calling": "Bluetooth", "Water": "IP68" },
      stock: 102
    },
    {
      id: "stride-black-watch", name: "Stride Smart Watch — Black", cat: "watches",
      sku: "WT-WCH-005",
      price: 6500, rating: 4.6, reviews: 167, flags: ["new", "hot"],
      colors: ["#1f1c18"], img: "watch-stride-black.jpg",
      blurb: "Steps, kcal and kilometres in one glance — the everyday tracker with a proper crown.",
      specs: { "Display": "2.0-inch AMOLED", "Battery": "8 days", "Sports": "100 modes", "Water": "5 ATM" },
      stock: 63
    },
    {
      id: "trek-red-watch", name: "Trek Smart Watch — Red", cat: "watches",
      sku: "WT-WCH-006",
      price: 7000, compareAt: 8000, rating: 4.5, reviews: 88, flags: ["sale"],
      colors: ["#c0392b", "#1f1c18"], img: "watch-trek-red.jpg",
      blurb: "Rugged bezel, red strap and a face that keeps the battery honest on a long weekend.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "12 days", "GPS": "Built-in", "Water": "5 ATM" },
      stock: 46
    },
    {
      id: "hoco-y38-watch", name: "Hoco Y38 AMOLED Smart Watch", cat: "watches",
      sku: "WT-WCH-007",
      price: 4500, rating: 4.5, reviews: 152, flags: [],
      colors: ["#1f1c18", "#c9c4b6"], img: "watch-hoco-y38.webp",
      blurb: "Round AMOLED with Bluetooth calling and comprehensive health monitoring in black and silver.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "7 days", "Calling": "Bluetooth", "Sensors": "HR + SpO2" },
      stock: 74
    },
    {
      id: "oraimo-watch-6-pro", name: "Oraimo Watch 6 Pro", cat: "watches",
      sku: "WT-WCH-008",
      price: 7500, rating: 4.7, reviews: 184, flags: ["hot"],
      colors: ["#e4d9c3", "#1f1c18"], img: "watch-oraimo-6-pro.jpeg",
      blurb: "Cream strap, green-accent crown and an always-on display — the dress watch of the drawer.",
      specs: { "Display": "2.01-inch AMOLED", "Battery": "7 days", "Calling": "Bluetooth", "Sensors": "HR + SpO2" },
      stock: 52
    },
    {
      id: "oraimo-watch-7n", name: "Oraimo Watch 7N", cat: "watches",
      sku: "WT-WCH-009",
      price: 6000, rating: 4.6, reviews: 118, flags: ["new"],
      colors: ["#3a3d42", "#1f1c18"], img: "watch-oraimo-7n.webp",
      blurb: "Graphite case with a mountain watch face and a week of battery between charges.",
      specs: { "Display": "2.01-inch TFT", "Battery": "7 days", "Sports": "100+ modes", "Water": "IP68" },
      stock: 69
    },
    {
      id: "slate-black-watch", name: "Slate Smart Watch — Black", cat: "watches",
      sku: "WT-WCH-010",
      price: 5000, rating: 4.4, reviews: 92, flags: [],
      colors: ["#1f1c18"], img: "watch-slate-black.webp",
      blurb: "The plain square one: crisp face, silicone strap and notifications at a flick of the wrist.",
      specs: { "Display": "1.83-inch TFT", "Battery": "10 days", "Calling": "Bluetooth", "Water": "IP68" },
      stock: 86
    }
  ];

  /* ---------- merge admin-edited products from localStorage ---------- */
  /* only add products from the admin panel that don't already exist in
     the static catalogue. never overwrite existing products — that keeps
     BDT prices from data.js intact while still picking up new categories
     and products created in the admin panel. */
  (function mergeAdminProducts() {
    try {
      var raw = localStorage.getItem("wt_admin_products");
      if (!raw) return;
      var admin = JSON.parse(raw);
      if (!Array.isArray(admin) || !admin.length) return;
      var existingIds = {};
      PRODUCTS.forEach(function (p) { if (p && p.id) existingIds[p.id] = true; });
      admin.forEach(function (p) {
        if (!p || !p.id) return;
        if (!existingIds[p.id]) {
          PRODUCTS.push(p);
        }
      });
    } catch (e) {
      /* ignore localStorage errors — fall back to static catalogue */
    }
  })();

  CATEGORIES = buildCategories();

  global.WT = global.WT || {};
  global.WT.CATEGORIES = CATEGORIES;
  global.WT.PRODUCTS = PRODUCTS;
  /* ---------- tier: retail (default) vs wholesale ---------- */
  global.WT.WHOLESALE_DISCOUNT = 0.25;
  global.WT.MOQ = 15;
  global.WT.TIER = (function () {
    var el = document.body || document.documentElement;
    return (el && el.getAttribute("data-tier")) || "retail";
  })();
  global.WT.isWholesale = function () { return global.WT.TIER === "wholesale"; };

  /* ---------- money ---------- */
  global.WT.money = function (n) { return "৳" + n.toFixed(2); };

  /* the trade price regardless of which tier the page is on — the retail
     uses it to quote bulk pricing */
  global.WT.tradePrice = function (p) {
    if (!p) return 0;
    if (typeof p.wholesale === "number") return p.wholesale;
    return Math.round(p.price * (1 - global.WT.WHOLESALE_DISCOUNT) * 100) / 100;
  };

  global.WT.priceOf = function (p) {
    if (!p) return 0;
    return global.WT.isWholesale() ? global.WT.tradePrice(p) : p.price;
  };

  global.WT.productUrl = function (p) {
    return (global.WT.isWholesale() ? "wholesale-product.html?id=" : "product.html?id=") + (p && p.id ? p.id : "");
  };

  global.WT.shopUrl = function (cat) {
    var base = global.WT.isWholesale() ? "wholesale.html" : "shop.html";
    return cat ? base + "?c=" + cat : base;
  };

  global.WT.byId = function (id) {
    for (var i = 0; i < PRODUCTS.length; i++) {
      if (PRODUCTS[i].id === id) return PRODUCTS[i];
    }
    return null;
  };

  /* every product carries a stable, unique code ("WT-CHG-001"),
     shown on the product page and in the checkout order summary */
  global.WT.skuOf = function (p) {
    if (!p) return "";
    if (p.sku) return p.sku;
    return "WT-" + String(p.id || "ITEM").toUpperCase();
  };

  global.WT.catName = function (id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i].name;
    }
    return titleCase(id);
  };

  /* ---------- image ----------
     p.img is either a bare stem ("p1" -> p1.svg + p1-alt.svg) or a
     full file name shipped in assets/img ("charger-foo.jpg").
     p.imgAlt is optional; single-photo products fall back to the
     primary image so the card hover swap never points at a missing file.
  */
  function hasExt(name) { return /\.(svg|png|jpe?g|webp|avif|gif)$/i.test(name || ""); }

  global.WT.imgSrc = function (p) {
    var img = (p && p.img) || "";
    return "assets/img/" + (hasExt(img) ? img : img + ".svg");
  };

  global.WT.imgAltSrc = function (p) {
    var alt = (p && p.imgAlt) || "";
    if (alt) return "assets/img/" + (hasExt(alt) ? alt : alt + ".svg");
    var img = (p && p.img) || "";
    if (!img || hasExt(img)) return global.WT.imgSrc(p);
    return "assets/img/" + img + "-alt.svg";
  };

  /* ---------- defensive helpers so a bad product never halts the page ---------- */

  /* flags -> badge markup */
  global.WT.flags = function (p) {
    var map = { sale: "badge--sale", "new": "badge--new", hot: "badge--hot" };
    var label = { sale: "Sale", "new": "New", hot: "Popular" };
    return (p.flags || []).map(function (f) {
      return '<span class="badge ' + (map[f] || "") + '">' + (label[f] || f) + "</span>";
    }).join("");
  };

  /* ---------- star rating (non-interactive) ---------- */
  function starPath() {
    var points = [];
    for (var i = 0; i < 10; i++) {
      var angle = -Math.PI / 2 + i * Math.PI / 5;
      var radius = i % 2 === 0 ? 9.5 : 4.1;
      points.push((10 + Math.cos(angle) * radius).toFixed(2) + "," + (10 + Math.sin(angle) * radius).toFixed(2));
    }
    return "M" + points.join(" L ") + " Z";
  }

  function stars(rating) {
    var out = "";
    var full = Math.floor(rating);
    var half = rating - full >= 0.5;
    var path = starPath();
    for (var i = 1; i <= 5; i++) {
      var fill = i <= full ? "#ffb800" : (i === full + 1 && half ? "#f3eede" : "#f3eede");
      var opacity = i <= full || (i === full + 1 && half) ? "" : "opacity:.4";
      out += '<svg class="starrr" viewBox="0 0 20 20" style="width:15px;height:15px;' + opacity + '" role="img" aria-label="' + i + ' of 5 stars">'
        + '<defs><linearGradient id="star-half"><stop offset="50%" stop-color="#ffb800"/><stop offset="50%" stop-color="#f3eede"/></linearGradient></defs>'
        + '<path d="' + path + '" fill="' + fill + '"/></svg>';
    }
    return out;
  }
  global.WT.stars = stars;

  var RATING_KEY = "wt_product_ratings_v1";
  function savedRatings() {
    try { return JSON.parse(localStorage.getItem(RATING_KEY) || "{}"); }
    catch (e) { return {}; }
  }
  global.WT.ratingFor = function (p) {
    var saved = savedRatings()[p.id];
    var baseCount = Number(p.reviews) || 0;
    if (!saved || !saved.length) return { average: Number(p.rating) || 0, count: baseCount, user: 0 };
    var total = saved.reduce(function (sum, rating) { return sum + rating; }, 0) + (Number(p.rating) || 0) * baseCount;
    return { average: total / (baseCount + saved.length), count: baseCount + saved.length, user: saved[saved.length - 1] };
  };
  global.WT.rateProduct = function (id, value) {
    value = Math.max(1, Math.min(5, Math.round(Number(value))));
    var ratings = savedRatings();
    ratings[id] = ratings[id] || [];
    ratings[id].push(value);
    try { localStorage.setItem(RATING_KEY, JSON.stringify(ratings)); } catch (e) { return false; }
    document.dispatchEvent(new CustomEvent("wt:rating-change", { detail: { id: id } }));
    return true;
  };

  /* ---------- price HTML ---------- */
  function priceHTML(p) {
    if (WT.isWholesale()) {
      return "<ins>" + WT.money(WT.priceOf(p)) + "</ins><del>" + WT.money(p.price) + "</del>";
    }
    if (p.compareAt) {
      return "<ins>" + WT.money(p.price) + "</ins><del>" + WT.money(p.compareAt) + "</del>";
    }
    return "<span>" + WT.money(p.price) + "</span>";
  }

  /* ---------- alt tag ---------- */
  function altTag(p) {
    var primary = WT.imgSrc(p);
    var alt = WT.imgAltSrc(p);
    if (alt === primary) return "";
    return '<img class="alt" src="' + alt + '" alt="" loading="lazy" width="600" height="600">';
  }

  
  /* ---------- card HTML ---------- */
  global.WT.cardHTML = function (p) {
    var url = WT.productUrl(p);
    var dots = (p && p.colors || []).map(function (c) {
      return '<span class="card__dot" style="background:' + c + '"></span>';
    }).join("");
    var rating = WT.ratingFor(p);
    return (
      '<div class="card">' +
      '<div class="card__media">' +
        '<a href="' + WT.productUrl(p) + '">' +
          '<img src="' + WT.imgSrc(p) + '" alt="' + p.name + '" width="300" height="300" loading="lazy" decoding="async">' +
        '</a>' +
      '</div>' +
      '<div class="card__body">' +
        '<div class="card__header">' +
          '<p class="card__cat">' + WT.catName(p.cat) + '</p>' +
          '<h3 class="card__name">' + p.name + '</h3>' +
        '</div>' +
        '<div class="rating-row"><div class="rating-summary" data-rating-summary="' + p.id + '" aria-label="Rated ' + rating.average.toFixed(1) + ' out of 5 from ' + rating.count + ' ratings"><span class="rating-stars">' + stars(rating.average) + '</span><span>' + rating.average.toFixed(1) + ' (' + rating.count + ')</span></div><div class="rating-vote" role="group" aria-label="Rate ' + p.name + '">' + [1,2,3,4,5].map(function (n) { return '<button type="button" data-rate="' + n + '" data-rating-product="' + p.id + '" aria-label="Rate ' + n + ' out of 5 stars" aria-pressed="' + (rating.user === n) + '">&#9733;</button>'; }).join('') + '<span class="rating-vote__label" data-rating-label="' + p.id + '">' + (rating.user ? 'Your rating' : 'Rate this product') + '</span></div></div>' +
        '<div class="card__price">' + priceHTML(p) + '</div>' +
        '<div class="card__desc">' + p.blurb + '</div>' +
        dots +
        '<div class="quickadd"><button class="btn btn--dark" data-add="' + p.id + '" data-label="Add to cart">Add to cart</button></div>' +
      '</div>' +
      '</div>'
    );
  };

})(window);
