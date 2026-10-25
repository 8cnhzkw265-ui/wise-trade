/* ============================================================
   Validates the Watches section the way check-chargers.js
   validates Chargers: 10 photo products, category count match,
   every image resolves on disk, cards render the photo with no
   duplicate hover layer and no undefined fields.
   Run:  node tools\check-watches.js
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
global.window = {};
require(path.join(ROOT, "assets", "js", "data.js"));
/* data.js attaches to window; cardHTML references the bare WT global,
   so mirror it onto Node's global like the browser would */
global.WT = global.window.WT;
const WT = global.WT;

let fails = 0;
const check = (ok, msg) => {
  console.log((ok ? "  [ok]   " : "  [FAIL] ") + msg);
  if (!ok) fails++;
};

const watches = WT.PRODUCTS.filter((p) => p.cat === "watches");
const meta = WT.CATEGORIES.find((c) => c.id === "watches");

console.log("=== watches section ===");
console.log("  products: " + watches.length + "  (category advertises " + (meta ? meta.count : "?") + ")");

check(!!meta, "watches category exists in CATEGORIES");
check(watches.length === 10, "expected 10 watch products, got " + watches.length);
if (meta) check(watches.length === meta.count, "count matches CATEGORIES");
check(WT.catName("watches") === "Watches", "WT.catName resolves watches");

for (const p of watches) {
  check(/^watch-/.test(p.img), p.id + ": uses the watch- image prefix");
  const imgFile = path.join(ROOT, "assets", "img", p.img);
  check(fs.existsSync(imgFile), p.id + ": image file exists (" + p.img + ")");
  check(!/\s/.test(p.img) && !/\.(jpg|jpeg|png|webp)\./i.test(p.img), p.id + ": clean file name (no spaces / double extensions)");
  check(WT.imgSrc(p) === "assets/img/" + p.img, p.id + ": imgSrc resolves");
  const html = WT.cardHTML(p);
  check(html.indexOf('src="' + WT.imgSrc(p) + '"') > -1, p.id + ": card renders the photo");
  check(html.indexOf('class="alt"') === -1, p.id + ": no duplicate hover layer for single-photo product");
  check(html.indexOf("undefined") === -1, p.id + ": no undefined fields in card");
  check(typeof p.blurb === "string" && p.blurb.length > 20, p.id + ": has a blurb");
  check(p.specs && Object.keys(p.specs).length === 4, p.id + ": 4 spec cells");
  check(p.colors && p.colors.length > 0, p.id + ": has colour swatches");
}

console.log(fails === 0 ? "\n>>> ALL CHECKS PASSED" : "\n>>> " + fails + " FAILURE(S)");
process.exit(fails ? 1 : 0);