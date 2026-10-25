/* ============================================================
   Validates the Backpacks section the way check-chargers.js
   validates Chargers: 8 photo products, category count match,
   every image resolves on disk, cards render the photo with no
   duplicate hover layer and no undefined fields.
   Run:  node tools\check-backpacks.js
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

const packs = WT.PRODUCTS.filter((p) => p.cat === "backpacks");
const meta = WT.CATEGORIES.find((c) => c.id === "backpacks");

console.log("=== backpacks section ===");
console.log("  products: " + packs.length + "  (category advertises " + (meta ? meta.count : "?") + ")");

check(!!meta, "backpacks category exists in CATEGORIES");
check(packs.length === 8, "expected 8 backpack products, got " + packs.length);
if (meta) check(packs.length === meta.count, "count matches CATEGORIES");
check(WT.catName("backpacks") === "Backpacks", "WT.catName resolves backpacks");

for (const p of packs) {
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
