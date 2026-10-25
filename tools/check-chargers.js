/* Throwaway harness: loads the real catalogue and verifies image
   resolution, card markup and the charger section (power banks +
   cables). Run: node tools\check-chargers.js */
const fs = require("fs"), path = require("path");
const root = path.resolve(__dirname, "..");

global.window = global;
eval(fs.readFileSync(path.join(root, "assets", "js", "data.js"), "utf8"));
const WT = global.WT;

let fail = 0;
const check = (cond, msg) => { if (!cond) { fail++; console.log("  [FAIL] " + msg); } };
const exists = f => fs.existsSync(path.join(root, f));

const chargers = WT.PRODUCTS.filter(p => p.cat === "chargers");
const catMeta = WT.CATEGORIES.find(c => c.id === "chargers");
console.log("=== chargers section ===");
console.log("  products: " + chargers.length + "  (category advertises " + catMeta.count + ")");
check(chargers.length === 16, "expected 16 charger products (7 power banks + 9 cables), got " + chargers.length);
check(chargers.length === catMeta.count, "count mismatch vs CATEGORIES");
const removed = ["atlas-dock", "voyager-hub", "gather-magsafe", "gather-note-tray", "clip-cable-kit",
  "felt-desk-mat", "session-ledger", "brass-tape", "field-notebook", "reach-arm", "meridian-lamp"];
check(removed.every((id) => !WT.byId(id)), "illustrated placeholder products are all removed");
for (const p of chargers) console.log("  - " + p.name + "  [" + p.img + "]  $" + p.price.toFixed(2));

console.log("=== every product: image files + card markup ===");
for (const p of WT.PRODUCTS) {
  const src = WT.imgSrc(p), alt = WT.imgAltSrc(p);
  check(exists(src), p.id + ": missing " + src);
  check(exists(alt), p.id + ": missing " + alt);
  check(/\.(jpe?g|png|webp)$/i.test(p.img), p.id + ": photo product, not an SVG placeholder");
  const html = WT.cardHTML(p);
  check(html.indexOf('src="' + src + '"') > -1, p.id + ": card missing primary src");
  check(html.indexOf('src="' + alt + '"') > -1, p.id + ": card missing alt src");
  check(!/\.(jpg|webp|png)\.svg|\.svg\.svg/.test(html), p.id + ": double extension in markup");
  check(html.indexOf(p.name) > -1, p.id + ": card missing name");
}
console.log("  checked " + WT.PRODUCTS.length + " products");

console.log("=== raster (photo) products ===");
for (const p of chargers) {
  check(WT.imgSrc(p) === WT.imgAltSrc(p), p.id + ": photo product should fall back to primary as hover alt");
}
console.log("  photo fallbacks verified: " + chargers.length);

console.log(fail ? "\n>>> " + fail + " FAILURE(S)" : "\n>>> ALL CHECKS PASSED");
process.exit(fail ? 1 : 0);
