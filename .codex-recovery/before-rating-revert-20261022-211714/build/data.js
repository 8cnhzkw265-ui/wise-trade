/* ============================================================
 *   WT — catalog data
 *   Static front-end data source.
 *   ============================================================ */
(function (global) {
  "use strict";

  var CATEGORIES = [
    { id: "chargers",     name: "Chargers",     count: 16 },
    { id: "backpacks",    name: "Backpacks",    count: 8 },
    { id: "audio",        name: "Audio",        count: 15 },
    { id: "watches",      name: "Watches",      count: 10 }
  ];

  var PRODUCTS = [
    {
      id: "anker-maggo-10k", name: "Anker MagGo 10K", cat: "chargers",
      price: 89, compareAt: 99, rating: 4.8, reviews: 512, flags: ["sale", "hot"],
      colors: ["#1f1c18", "#e8e2d4"], img: "charger-anker-maggo-10k.webp",
      blurb: "10,000 mAh of pocketable magnetic power, slim enough to stay on the phone all day.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "7.5W MagSafe", "Standard": "Qi2", "Port": "USB-C" },
      stock: 42
    },
    {
      id: "baseus-qi2-22-5w", name: "Baseus Qi2 Power Bank 22.5W", cat: "chargers",
      price: 59, rating: 4.7, reviews: 348, flags: ["new"],
      colors: ["#e8e2d4", "#1f1c18"], img: "charger-baseus-qi2-22-5w.jpg",
      blurb: "Qi2 magnetic charging with 22.5W wired output for the days you don't want to wait.",
      specs: { "Capacity": "10,000 mAh", "Output": "22.5W", "Standard": "Qi2", "Ports": "USB-A + USB-C" },
      stock: 56
    },
    {
      id: "qi2-magnetic-10k", name: "Qi2 Magnetic Power Bank 10000mAh", cat: "chargers",
      price: 45, rating: 4.5, reviews: 203, flags: [],
      colors: ["#1f1c18"], img: "charger-qi2-magnetic-10k.jpg",
      blurb: "No-frills magnetic bank with a four-light gauge so you always know where you stand.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "15W", "Standard": "Qi2", "Gauge": "4-LED indicator" },
      stock: 74
    },
    {
      id: "otterbox-magsafe", name: "OtterBox MagSafe Power Bank", cat: "chargers",
      price: 79, rating: 4.6, reviews: 167, flags: [],
      colors: ["#cfc3ad", "#1f1c18"], img: "charger-otterbox-magsafe.jpg",
      blurb: "Soft-touch shell in sand, built to the drop standard the cases are known for.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "MagSafe 7.5W", "Standard": "Qi", "Port": "USB-C" },
      stock: 31
    },
    {
      id: "lisen-100w", name: "LISEN 100W Power Bank", cat: "chargers",
      price: 99, rating: 4.7, reviews: 291, flags: ["new"],
      colors: ["#8d9194", "#1f1c18"], img: "charger-lisen-100w.jpg",
      blurb: "Built-in USB-C cable and 100W output — laptop-grade power without the desk brick.",
      specs: { "Output": "100W", "Cable": "Built-in USB-C", "Capacity": "20,000 mAh", "Body": "Aluminium" },
      stock: 26
    },
    {
      id: "qi2-slim-graphite", name: "Qi2 Slim Power Bank — Graphite", cat: "chargers",
      price: 42, compareAt: 52, rating: 4.4, reviews: 128, flags: ["sale"],
      colors: ["#5a5d63"], img: "charger-qi2-slim-graphite.jpg",
      blurb: "The thinnest way to carry a full charge — graphite, featherweight and pocket-flat.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "15W", "Standard": "Qi2", "Finish": "Graphite" },
      stock: 58
    },
    {
      id: "neopack-rapid-pro", name: "Neopack Rapid Pro Power Bank", cat: "chargers",
      price: 55, rating: 4.6, reviews: 244, flags: [],
      colors: ["#4a5b8c", "#1f1c18"], img: "charger-neopack-rapid-pro.jpg",
      blurb: "25W wireless and wired, slim enough to disappear under a phone and a case.",
      specs: { "Capacity": "10,000 mAh", "Wireless": "25W Qi2", "Port": "25W USB-C", "Gauge": "LED indicator" },
      stock: 47
    },
    {
      id: "tri-link-cable", name: "Tri-Link 3-in-1 Charging Cable", cat: "chargers",
      price: 22, compareAt: 28, rating: 4.6, reviews: 118, flags: ["new"],
      colors: ["#c0392b", "#1f1c18"], img: "cable-tri-link-red.jpg",
      blurb: "One braided strand, three ends — micro, Lightning and USB-C for the drawer that hosts everybody's phone.",
      specs: { "Ends": "Micro-USB / Lightning / USB-C", "Length": "1.2 m", "Jacket": "Nylon braid", "Output": "Up to 18W" },
      stock: 63
    },
    {
      id: "baseus-lightning-20w", name: "Baseus USB-C to Lightning Cable 20W", cat: "chargers",
      price: 18, rating: 4.8, reviews: 264, flags: ["hot"],
      colors: ["#1f1c18"], img: "cable-baseus-lightning-20w.jpg",
      blurb: "MFi-certified fast charge for iPhone — half a battery in half an hour, strain-relieved where it counts.",
      specs: { "Output": "20W PD", "Ends": "USB-C to Lightning", "Length": "1 m", "Rating": "MFi-certified" },
      stock: 96
    },
    {
      id: "hoco-braided-usbc", name: "Hoco Braided USB-C Cable — Black", cat: "chargers",
      price: 14, rating: 4.5, reviews: 96, flags: [],
      colors: ["#1f1c18", "#c0392b"], img: "cable-hoco-braided-black.jpg",
      blurb: "Thick nylon braid, red-accented plugs and a bend relief that survives the bottom of the desk drawer.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1.5 m", "Jacket": "Nylon braid", "Output": "Up to 24W" },
      stock: 110
    },
    {
      id: "joyroom-lightning-30w", name: "Joyroom USB-C to Lightning Cable 30W", cat: "chargers",
      price: 24, compareAt: 29, rating: 4.7, reviews: 152, flags: ["sale"],
      colors: ["#1f1c18"], img: "cable-joyroom-lightning-30w.jpg",
      blurb: "Ships in the box you'll actually keep — 30W PD over a metre of braided nylon.",
      specs: { "Output": "30W PD", "Ends": "USB-C to Lightning", "Length": "1 m", "Jacket": "Braided nylon" },
      stock: 74
    },
    {
      id: "everyday-usbc-white", name: "Everyday USB-C Cable — White", cat: "chargers",
      price: 12, rating: 4.3, reviews: 88, flags: [],
      colors: ["#e8e2d4"], img: "cable-usb-c-white.jpg",
      blurb: "The plain white cable for the nightstand — no branding, no fuss, just current.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1 m", "Output": "18W", "Finish": "Matte white" },
      stock: 140
    },
    {
      id: "ugreen-silver-usbc", name: "UGREEN USB-C Cable — Silver", cat: "chargers",
      price: 19, rating: 4.7, reviews: 143, flags: [],
      colors: ["#b8bcc0", "#e8e2d4"], img: "cable-ugreen-silver.jpg",
      blurb: "Aluminium shells and a silver braid that doesn't fight the rest of the desk.",
      specs: { "Ends": "USB-A to USB-C", "Length": "1 m", "Data": "480 Mbps", "Shell": "Aluminium" },
      stock: 82
    },
    {
      id: "hoco-3in1-grey", name: "Hoco 3-in-1 Charging Cable — Grey", cat: "chargers",
      price: 26, compareAt: 32, rating: 4.5, reviews: 104, flags: ["sale"],
      colors: ["#8d9194"], img: "cable-hoco-3in1-grey.jpg",
      blurb: "Three heads on one braided trunk — charge the phone, the watch and the earbuds at once.",
      specs: { "Ends": "USB-C / Lightning / Micro-USB", "Input": "USB-A", "Length": "1.2 m", "Jacket": "Braided nylon" },
      stock: 58
    },
    {
      id: "twin-lightning-white", name: "Twin Lightning Cable — White", cat: "chargers",
      price: 16, rating: 4.2, reviews: 47, flags: [],
      colors: ["#e8e2d4"], img: "cable-twin-lightning-white.jpg",
      blurb: "Lightning at both ends — the odd little cable that moves shots from the old phone to the new one.",
      specs: { "Ends": "Lightning to Lightning", "Length": "1 m", "Use": "Charge & sync", "Finish": "Gloss white" },
      stock: 39
    },
    {
      id: "anker-bio-usbc", name: "Anker Bio-Based USB-C Cable", cat: "chargers",
      price: 21, rating: 4.8, reviews: 187, flags: ["new"],
      colors: ["#e8e2d4"], img: "cable-anker-bio-white.png",
      blurb: "Cable and strap grown from castor oil rather than oil wells — same fast charge, lighter footprint.",
      specs: { "Ends": "USB-C to USB-C", "Output": "60W PD", "Length": "1.8 m", "Jacket": "Bio-based TPE" },
      stock: 67
    },
    {
      id: "active-hunter-commuter", name: "Active Hunter Commuter Pack", cat: "backpacks",
      price: 79, compareAt: 95, rating: 4.7, reviews: 214, flags: ["hot"],
      colors: ["#1f1c18", "#3a3d42"], img: "backpack-active-hunter.jpg",
      blurb: "Wipe-clean textured shell with a badge patch and a side pocket that swallows a bottle.",
      specs: { "Capacity": "22 L", "Laptop": "Up to 15.6-inch", "Shell": "Ripstop polyester", "Water": "IPX4 rated" },
      stock: 36
    },
    {
      id: "core-daypack", name: "Core Daypack — Black", cat: "backpacks",
      price: 49, rating: 4.6, reviews: 331, flags: [],
      colors: ["#1f1c18"], img: "backpack-core-daypack.jpg",
      blurb: "One clean silhouette, two zips and nothing to snag on the train.",
      specs: { "Capacity": "18 L", "Laptop": "Up to 14-inch", "Shell": "Recycled nylon", "Weight": "480 g" },
      stock: 64
    },
    {
      id: "fieldwork-commuter", name: "Fieldwork Commuter Backpack", cat: "backpacks",
      price: 65, rating: 4.8, reviews: 142, flags: ["new"],
      colors: ["#1f1c18", "#4a4d42"], img: "backpack-fieldwork-16.jpg",
      blurb: "Boxy front pocket for chargers and cables, padded sleeve for the laptop.",
      specs: { "Capacity": "20 L", "Laptop": "Up to 16-inch", "Shell": "Cordura nylon", "Pockets": "5 organised" },
      stock: 41
    },
    {
      id: "featherlight-daypack", name: "Featherlight Daypack", cat: "backpacks",
      price: 39, compareAt: 49, rating: 4.4, reviews: 96, flags: ["sale"],
      colors: ["#1f1c18"], img: "backpack-featherlight.jpg",
      blurb: "Weighs less than a water bottle — the pack you forget you are wearing.",
      specs: { "Capacity": "16 L", "Weight": "310 g", "Shell": "Ripstop nylon", "Packable": "Folds into its pocket" },
      stock: 88
    },
    {
      id: "bagboss-combo", name: "Bag Boss Commuter", cat: "backpacks",
      price: 89, compareAt: 110, rating: 4.6, reviews: 118, flags: ["new", "hot"],
      colors: ["#8d9194", "#1f1c18"], img: "backpack-bagboss-combo.jpg",
      blurb: "The full pack plus the sling — two bags that split the day between them.",
      specs: { "Set": "Backpack + sling", "Capacity": "22 L + 4 L", "Shell": "Coated polyester", "Laptop": "Up to 15.6-inch" },
      stock: 27
    },
    {
      id: "metro-leather-backpack", name: "Metro Leather Backpack", cat: "backpacks",
      price: 95, rating: 4.5, reviews: 87, flags: [],
      colors: ["#1f1c18"], img: "backpack-metro-leather.jpg",
      blurb: "Smooth leather with gold-tone hardware — the one that goes to dinner after work.",
      specs: { "Capacity": "17 L", "Material": "Vegan leather", "Hardware": "Gold-tone", "Laptop": "Up to 14-inch" },
      stock: 19
    },
    {
      id: "voyager-tech-pack", name: "Voyager Tech Travel Pack", cat: "backpacks",
      price: 119, compareAt: 139, rating: 4.8, reviews: 203, flags: ["sale", "hot"],
      colors: ["#1f1c18", "#3a3d42"], img: "backpack-voyager-tech.jpg",
      blurb: "Buckles, a pass-through charging port and a clamshell opening for airport security.",
      specs: { "Capacity": "26 L", "Laptop": "Up to 17-inch", "Port": "USB-C pass-through", "Opening": "Clamshell" },
      stock: 33
    },
    {
      id: "fusion-grey-daypack", name: "Fusion Daypack — Grey", cat: "backpacks",
      price: 55, rating: 4.5, reviews: 176, flags: [],
      colors: ["#8d9194", "#d96b1e"], img: "backpack-fusion-grey.webp",
      blurb: "Matte grey shell with pop-orange pulls — calm to look at, easy to find in the dark.",
      specs: { "Capacity": "21 L", "Laptop": "Up to 15.6-inch", "Shell": "Water-repellent", "Pockets": "6 zip pockets" },
      stock: 52
    },
    {
      id: "drift-headphones", name: "Drift Over-Ear Headphones — Black", cat: "audio",
      price: 59, compareAt: 69, rating: 4.6, reviews: 156, flags: ["new"],
      colors: ["#1f1c18"], img: "headphone-drift-black.jpg",
      blurb: "Soft protein pads, a bronze-tinted cup and a fold that disappears into the commuter pocket.",
      specs: { "Type": "Over-ear, closed", "Battery": "40 h", "Bluetooth": "5.3", "Weight": "240 g" },
      stock: 44
    },
    {
      id: "cloud-headphones-white", name: "Cloud On-Ear Headphones — White", cat: "audio",
      price: 49, rating: 4.5, reviews: 121, flags: [],
      colors: ["#e8e2d4"], img: "headphone-cloud-white.jpg",
      blurb: "Featherweight on-ear cups in matte white — the pair you forget you're wearing on a call.",
      specs: { "Type": "On-ear, closed", "Battery": "35 h", "Bluetooth": "5.3", "Weight": "180 g" },
      stock: 66
    },
    {
      id: "apex-anc-headphones", name: "Apex ANC Headphones — 95H", cat: "audio",
      price: 89, compareAt: 109, rating: 4.8, reviews: 298, flags: ["sale", "hot"],
      colors: ["#1f1c18"], img: "headphone-apex-anc.jpg",
      blurb: "Hybrid noise cancelling, LDAC and ninety-five hours between charges — the long-haul pair.",
      specs: { "Driver": "40 mm", "Noise cancelling": "Hybrid ANC", "Battery": "95 h", "Codec": "LDAC / Hi-Res" },
      stock: 37
    },
    {
      id: "vector-headphones", name: "Vector Over-Ear Headphones — Black", cat: "audio",
      price: 65, rating: 4.6, reviews: 134, flags: [],
      colors: ["#1f1c18"], img: "headphone-vector-black.jpg",
      blurb: "Memory-foam cups, a steel slider and a sound signature tuned for voices and long flights.",
      specs: { "Type": "Over-ear, closed", "Battery": "45 h", "Bluetooth": "5.2", "Weight": "260 g" },
      stock: 52
    },
    {
      id: "haze-headphones-sand", name: "Haze On-Ear Headphones — Sand", cat: "audio",
      price: 55, rating: 4.4, reviews: 89, flags: ["new"],
      colors: ["#d9cfc2", "#e8e2d4"], img: "headphone-haze-sand.jpg",
      blurb: "Warm sand colourway with plush pads — quiet luxury for the open-plan floor.",
      specs: { "Type": "On-ear, closed", "Battery": "30 h", "Bluetooth": "5.2", "Weight": "195 g" },
      stock: 48
    },
    {
      id: "hoco-studio-headphones", name: "Hoco Studio Over-Ear Headphones", cat: "audio",
      price: 35, compareAt: 45, rating: 4.4, reviews: 178, flags: ["sale"],
      colors: ["#1f1c18"], img: "headphone-hoco-studio.jpg",
      blurb: "Fold-flat cups, physical buttons and a week of playback for the price of two lunches.",
      specs: { "Driver": "40 mm", "Battery": "60 h", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 84
    },
    {
      id: "ember-headphones", name: "Ember On-Ear Headphones — Black", cat: "audio",
      price: 42, rating: 4.3, reviews: 76, flags: [],
      colors: ["#1f1c18", "#8b5a2b"], img: "headphone-ember-black.jpg",
      blurb: "Matte black with a copper ring — enough padding for a full session, small enough to live in a tote.",
      specs: { "Type": "On-ear, closed", "Battery": "32 h", "Bluetooth": "5.2", "Weight": "190 g" },
      stock: 61
    },
    {
      id: "sony-headphones-black", name: "Sony Headphones — Black", cat: "audio",
      price: 79, rating: 4.7, reviews: 212, flags: ["hot"],
      colors: ["#1f1c18"], img: "headphone-sony-black.jpg",
      blurb: "The commute standard: multipoint pairing, fast charge and an app with every EQ you'll never use.",
      specs: { "Driver": "30 mm", "Battery": "50 h", "Bluetooth": "5.2", "Multipoint": "2 devices" },
      stock: 43
    },
    {
      id: "hoco-eq33-earbuds", name: "Hoco EQ33 Wireless Earbuds", cat: "audio",
      price: 19, rating: 4.4, reviews: 167, flags: ["new"],
      colors: ["#1f1c18"], img: "earbud-hoco-eq33.jpg",
      blurb: "App-tuned EQ, touch controls and twenty-eight hours in a case the size of a lighter.",
      specs: { "Driver": "13 mm", "Battery": "28 h with case", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 120
    },
    {
      id: "nest-earbuds", name: "Nest Wireless Earbuds — Black", cat: "audio",
      price: 29, rating: 4.5, reviews: 108, flags: [],
      colors: ["#1f1c18"], img: "earbud-nest-black.jpg",
      blurb: "Gloss-black buds with stems that seat first time, in a case with a proper lid click.",
      specs: { "Driver": "12 mm", "Battery": "24 h with case", "Bluetooth": "5.3", "Water": "IPX5" },
      stock: 77
    },
    {
      id: "bose-sport-earbuds", name: "Bose Sport Earbuds — Berry", cat: "audio",
      price: 69, compareAt: 89, rating: 4.7, reviews: 231, flags: ["sale"],
      colors: ["#7b2d4e"], img: "earbud-bose-sport.jpg",
      blurb: "StayHear tips that will not move at mile ten, in a berry pair you'll actually spot in a bag.",
      specs: { "Driver": "Bose tuned", "Battery": "5 h (15 h case)", "Bluetooth": "5.1", "Water": "IPX4" },
      stock: 36
    },
    {
      id: "halo-earbuds", name: "Halo Wireless Earbuds — Black", cat: "audio",
      price: 24, rating: 4.3, reviews: 84, flags: [],
      colors: ["#1f1c18"], img: "earbud-halo-black.jpg",
      blurb: "Call-first tuning with two mics per side — the pair for back-to-back standups.",
      specs: { "Mics": "2 per bud", "Battery": "20 h with case", "Bluetooth": "5.3", "Charging": "USB-C" },
      stock: 95
    },
    {
      id: "juayou-earbuds", name: "Juayou Wireless Earbuds with Charging Case", cat: "audio",
      price: 16, rating: 4.2, reviews: 63, flags: [],
      colors: ["#1f1c18"], img: "earbud-juayou-black.jpg",
      blurb: "The honest entry pair — instant pairing, a clear little case light, and change from twenty dollars.",
      specs: { "Driver": "10 mm", "Battery": "18 h with case", "Bluetooth": "5.1", "Charging": "USB-C" },
      stock: 130
    },
    {
      id: "orbit-earbuds", name: "Orbit Wireless Earbuds — Black", cat: "audio",
      price: 39, compareAt: 49, rating: 4.6, reviews: 142, flags: ["sale", "new"],
      colors: ["#1f1c18"], img: "earbud-orbit-black.jpg",
      blurb: "Open the lid and they are already connected — touch controls and a low-profile stem.",
      specs: { "Driver": "13 mm", "Battery": "26 h with case", "Bluetooth": "5.3", "Water": "IPX5" },
      stock: 68
    },
    {
      id: "earfun-earbuds", name: "EarFun Wireless Earbuds — Black", cat: "audio",
      price: 45, rating: 4.8, reviews: 196, flags: ["hot"],
      colors: ["#1f1c18"], img: "earbud-earfun-black.jpg",
      blurb: "The reviewer favourite — hybrid ANC, wireless charging and a case that rounds into a pocket.",
      specs: { "Noise cancelling": "Hybrid ANC", "Battery": "30 h with case", "Charging": "USB-C + Qi", "Bluetooth": "5.3" },
      stock: 54
    },
    {
      id: "navigator-navy-watch", name: "Navigator Smart Watch — Navy", cat: "watches",
      price: 99, rating: 4.6, reviews: 128, flags: ["new"],
      colors: ["#2c3a55", "#1f1c18"], img: "watch-navigator-navy.jpg",
      blurb: "Titanium-tone case on a navy fluoro band — dual-band GPS and a display bright enough for noon.",
      specs: { "Display": "1.9-inch AMOLED", "Battery": "10 days", "GPS": "Dual-band", "Water": "5 ATM" },
      stock: 41
    },
    {
      id: "ranger-black-watch", name: "Ranger Smart Watch — Black", cat: "watches",
      price: 79, compareAt: 95, rating: 4.5, reviews: 96, flags: ["sale"],
      colors: ["#1f1c18", "#d96b1e"], img: "watch-ranger-black.jpg",
      blurb: "Round face, rotating crown and an orange accent dial — the field watch of the group.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "7 days", "Sports": "120 modes", "Water": "5 ATM" },
      stock: 57
    },
    {
      id: "bloom-pink-band", name: "Bloom Fitness Band — Pink", cat: "watches",
      price: 29, rating: 4.4, reviews: 142, flags: [],
      colors: ["#e9a9a0", "#e8e2d4"], img: "watch-bloom-pink.jpg",
      blurb: "Slim, light and pink enough to find in a handbag — sleep, steps and stand rings.",
      specs: { "Display": "1.6-inch AMOLED", "Battery": "10 days", "Sensors": "HR + SpO2", "Water": "IP68" },
      stock: 88
    },
    {
      id: "glow-black-watch", name: "Glow Smart Watch — Black", cat: "watches",
      price: 35, rating: 4.3, reviews: 74, flags: [],
      colors: ["#1f1c18"], img: "watch-glow-black.jpg",
      blurb: "Neon numerals you can read across a dark room, in a square case under forty grams.",
      specs: { "Display": "1.85-inch HD", "Battery": "7 days", "Calling": "Bluetooth", "Water": "IP68" },
      stock: 102
    },
    {
      id: "stride-black-watch", name: "Stride Smart Watch — Black", cat: "watches",
      price: 59, rating: 4.6, reviews: 167, flags: ["new", "hot"],
      colors: ["#1f1c18"], img: "watch-stride-black.jpg",
      blurb: "Steps, kcal and kilometres in one glance — the everyday tracker with a proper crown.",
      specs: { "Display": "2.0-inch AMOLED", "Battery": "8 days", "Sports": "100 modes", "Water": "5 ATM" },
      stock: 63
    },
    {
      id: "trek-red-watch", name: "Trek Smart Watch — Red", cat: "watches",
      price: 65, compareAt: 79, rating: 4.5, reviews: 88, flags: ["sale"],
      colors: ["#c0392b", "#1f1c18"], img: "watch-trek-red.jpg",
      blurb: "Rugged bezel, red strap and a face that keeps the battery honest on a long weekend.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "12 days", "GPS": "Built-in", "Water": "5 ATM" },
      stock: 46
    },
    {
      id: "hoco-y38-watch", name: "Hoco Y38 AMOLED Smart Watch", cat: "watches",
      price: 45, rating: 4.5, reviews: 152, flags: [],
      colors: ["#1f1c18", "#c9c4b6"], img: "watch-hoco-y38.webp",
      blurb: "Round AMOLED with Bluetooth calling and comprehensive health monitoring in black and silver.",
      specs: { "Display": "1.43-inch AMOLED", "Battery": "7 days", "Calling": "Bluetooth", "Sensors": "HR + SpO2" },
      stock: 74
    },
    {
      id: "oraimo-watch-6-pro", name: "Oraimo Watch 6 Pro", cat: "watches",
      price: 69, rating: 4.7, reviews: 184, flags: ["hot"],
      colors: ["#e4d9c3", "#1f1c18"], img: "watch-oraimo-6-pro.jpeg",
      blurb: "Cream strap, green-accent crown and an always-on display — the dress watch of the drawer.",
      specs: { "Display": "2.01-inch AMOLED", "Battery": "7 days", "Calling": "Bluetooth", "Sensors": "HR + SpO2" },
      stock: 52
    },
    {
      id: "oraimo-watch-7n", name: "Oraimo Watch 7N", cat: "watches",
      price: 55, rating: 4.6, reviews: 118, flags: ["new"],
      colors: ["#3a3d42", "#1f1c18"], img: "watch-oraimo-7n.webp",
      blurb: "Graphite case with a mountain watch face and a week of battery between charges.",
      specs: { "Display": "2.01-inch TFT", "Battery": "7 days", "Sports": "100+ modes", "Water": "IP68" },
      stock: 69
    },
    {
      id: "slate-black-watch", name: "Slate Smart Watch — Black", cat: "watches",
      price: 49, rating: 4.4, reviews: 92, flags: [],
      colors: ["#1f1c18"], img: "watch-slate-black.webp",
      blurb: "The plain square one: crisp face, silicone strap and notifications at a flick of the wrist.",
      specs: { "Display": "1.83-inch TFT", "Battery": "10 days", "Calling": "Bluetooth", "Water": "IP68" },
      stock: 86
    }
  ];

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
  global.WT.money = function (n) { return "$" + n.toFixed(2); };

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

  global.WT.catName = function (id) {
    for (var i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].id === id) return CATEGORIES[i].name;
    }
    return "Shop";
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
  global.WT.ratable = function (p) { return !!p && typeof p.rating === "number"; };

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
    return 'm11.9916 4.41945c-.0460986 1.20611-1.13976 2.4388-2.56555 3.02434l-.762134.327873-1.31086-2.47444c.0577942-1.17109.705792-2.35165 1.92543-3.04226l-2.55806-1.3253 1.16679-2.65577c1.23436-.705804 2.00112-2.24451 1.50022-3.72264l.762134.327873 2.54177-1.34855c.742793-.391432 1.39692-1.18644 1.5549-2.1851l-1.16679-2.65577 2.29205-.827992c1.50022-.75431 2.59619-2.29367 2.54994-4.02445l-.762134.327873 1.31086 2.47444c-.157978 1.18644-1.04393 2.35165-2.34639 3.12012l2.55806 1.3253 1.16679 2.65578c-1.23436.705805-2.00112 2.24451-1.50022 3.72264l.762134-.327873L11.9916 4.41945Z';
  }

  function stars(rating) {
    var out = "";
    var full = Math.floor(rating);
    var half = rating - full >= 0.5;
    var path = starPath();
    for (var i = 1; i <= 5; i++) {
      var fill = i <= full ? "#ffb800" : (i === full + 1 && half ? "#f3eede" : "#f3eede");
      var opacity = i <= full || (i === full + 1 && half) ? "" : "opacity:.4";
      out += '<svg class="starrr" viewBox="0 0 20 20" style="width:15px;height:15px;' + opacity + '" role="img" aria-label="' + i + " of 5 stars">'
        + '<defs><linearGradient id="star-half"><stop offset="50%" stop-color="#ffb800"/><stop offset="50%" stop-color="#f3eede"/></linearGradient></defs>'
        + '<path d="' + path + '" fill="' + fill + '"/></svg>';
    }
    return out;
  }
  global.WT.stars = stars;

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

  /* ---------- default currentRating ---------- */
  global.WT.currentRating = function () { return null; };

  /* ---------- interactive star widget ---------- */
  function starRatingContainerId(p) { return "wt-star-container-" + (p.id || ""); }
  function starSymbolId(p) { return "wt-star-" + (p.id || ""); }

  global.WT.ratable = function (p) { return !!p && typeof p.rating === "number"; };

  function buildStarBody(scale) {
    if (!scale) scale = 1;
    var s = scale, cx = 10 * s, cy = 10 * s, R = 9.5 * s, r = 3.5 * s;
    var pts = [];
    for (var k = 0; k < 5; k++) {
      var a = -Math.PI / 2 + k * 2 * Math.PI / 5;
      pts.push(cx + R * Math.cos(a), cy + R * Math.sin(a));
      var ai = a + Math.PI / 5;
      pts.push(cx + r * Math.cos(ai), cy + r * Math.sin(ai));
    }
    return "M " + pts.map(function (p) { return p[0].toFixed(2) + " " + p[1].toFixed(2); }).join(" L ") + " Z";
  }

  function interactiveStar(p, currentRating) {
    var current = currentRating != null ? currentRating : null;
    var hostId = starRatingContainerId(p);
    var host = document.getElementById(hostId);
    if (!host) {
      host = document.createElement("span");
      host.id = hostId;
      host.className = "product-page-stars";
      host.setAttribute("data-rating", p.id);
      host.setAttribute("role", "group");
      host.setAttribute("aria-label", "Star rating for " + (p.name || "this product") + ": currently " + (p.rating != null ? p.rating.toFixed(1) : "0.0") + " out of 5 stars based on " + (p.reviews != null ? p.reviews : 0) + " ratings");
      if (document.body) document.body.appendChild(host);
    }
    var starId = starSymbolId(p);
    var half = !!(current != null && current % 1 !== 0 && current < 5 && Math.floor(current) >= 1 && Math.floor(current) <= 5);
    var pathD = buildStarBody(1);
    if (half) {
      if (!document.getElementById(starId)) {
        var gradId = starId + "-grad";
        var defsEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        defsEl.setAttribute("id", "wt-star-defs-" + (p.id || ""));
        defsEl.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden");
        defsEl.setAttribute("aria-hidden", "true");
        defsEl.setAttribute("focusable", "false");
        defsEl.innerHTML =
          "<defs>" +
          "<linearGradient id=\"" + gradId + "\" x1=" + "'50%'" + " y1=" + "'0%'" + " x2=" + "'50%'" + " y2=" + "'100%'" + ">" +
          "<stop offset=" + "'50%'" + " stop-color=" + "'#ffb800'" + "/>" +
          "<stop offset=" + "'50%'" + " stop-color=" + "'#f3eede'" + "/>" +
          "</linearGradient>" +
          "<path id=" + "'" + starId + "'" + " d=" + "'" + pathD + "'" + " fill=" + "url(" + gradId + ")" + "/>" +
          "</defs>";
        if (document.body) document.body.insertBefore(defsEl, document.body.firstChild);
      }
    } else {
      if (!document.getElementById(starId)) {
        var defsEl2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        defsEl2.setAttribute("id", "wt-star-defs-" + (p.id || ""));
        defsEl2.setAttribute("style", "position:absolute;width:1px;height:1px;overflow:hidden");
        defsEl2.setAttribute("aria-hidden", "true");
        defsEl2.setAttribute("focusable", "false");
        defsEl2.innerHTML =
          "<defs>" +
          "<path id=" + "'" + starId + "'" + " d=" + "'" + pathD + "'" + " fill=" + "'#ffb800'" + "/>" +
          "</defs>";
        if (document.body) document.body.insertBefore(defsEl2, document.body.firstChild);
      }
    }
    while (host.firstChild) host.removeChild(host.firstChild);
    for (var i = 1; i <= 5; i++) {
      var pressed = !!(current != null && current >= i);
      var halfStar = !pressed && half && i === Math.floor(current);
      var fill = "#f3eede";
      if (pressed) fill = "#ffb800";
      else if (halfStar) fill = "url(" + starId + ")";
      var outer = document.createElement("span");
      outer.className = "star";
      outer.setAttribute("data-star", String(i));
      outer.setAttribute("role", "radio");
      outer.setAttribute("aria-label", i + " star" + (i === 1 ? "" : "s"));
      outer.setAttribute("aria-checked", pressed ? "true" : "false");
      outer.setAttribute("aria-pressed", pressed ? "true" : "false");
      if (pressed) outer.classList.add("star--active");
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "starrr");
      svg.setAttribute("viewBox", "0 0 20 20");
      svg.setAttribute("style", "width:16px;height:16px");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("focusable", "false");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathD);
      path.setAttribute("fill", fill);
      svg.appendChild(path);
      outer.appendChild(svg);
      host.appendChild(outer);
    }
    host.setAttribute("aria-valueNow", current != null && current > 0 ? String(current) : "0");
    host.setAttribute("aria-valueMin", "1");
    host.setAttribute("aria-valueMax", "5");
  }

  /* ---------- card HTML ---------- */
  };
  global.WT.cardHTML = function (p) {
    var wholesale = WT.isWholesale();
    var url = WT.productUrl(p);
    var dots = (p && p.colors || []).map(function (c) {
      return '<span class="card__dot" style="background:' + c + '"></span>';
    }).join("");
    var currentRating = WT.currentRating ? WT.currentRating(p && p.id) : null;

    var ratingHTML;
    if (WT.ratable && WT.ratable(p)) {
      ratingHTML = interactiveStar(p, currentRating);
    } else {
      var r = p.rating != null ? p.rating.toFixed(1) : "0.0";
      var rev = p.reviews != null ? p.reviews : 0;
      ratingHTML = '<span class="rating">' +
        '<span class="stars" aria-label="' + r + ' out of 5 stars">' + WT.stars(p.rating) + "</span>" +            '<span class="rating__label">' + r + ' <span class="rating__count">(' + rev + ' ratings)</span></span>' +
      "</span>";
    }

    return (
      '<div class="card">' +
      '<div class="card__media">' +
        '<a href="' + url + '">' +
          '<img src="' + WT.imgSrc(p) + '" alt="' + p.name + '" width="300" height="300">' +
        '</a>' +
      '</div>' +
      '<div class="card__body">' +
        '<div class="card__header">' +
          '<p class="card__cat">' + WT.catName(p.cat) + '</p>' +
          '<h3 class="card__name">' + p.name + '</h3>' +
        '</div>' +
        '<div class="card__rating">' +
          ratingHTML +
        '</div>' +
        '<div class="card__price">' +
          priceHTML(p) +
        '</div>' +
        '<div class="card__desc">' + p.blurb + '</div>' +
        dots +
      '</div>' +
    '</div>'
    );
  };  /* ---------- wire up interactive stars on every existing [data-rating] widget ---------- */
  global.WT.refreshPageRatings = function () {
    if (!document.querySelectorAll) return;
    var hosts = document.querySelectorAll("[data-rating]");
    for (var i = 0; i < hosts.length; i++) {
      var host = hosts[i];
      var productId = host.getAttribute("data-rating");
      var product = global.WT.byId(productId);
      if (!product) continue;
      var current = global.WT.currentRating ? global.WT.currentRating(productId) : null;
      if (host.id && host.id.indexOf("wt-star-container-") === 0) {
        if (global.WT.productPage && global.WT.productPage(product, current)) {}
      } else {
        try { interactiveStar(product, current); } catch (e) { /* a single product must not break the page */ }
      }
    }
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", global.WT.refreshPageRatings);
  } else {
    try { global.WT.refreshPageRatings(); } catch (e) { /* stale ratings must not hide the page */ }
  }

})(window);
