/* ============================================================
   Validates the Audio section the way check-chargers.js
   validates Chargers: 15 photo products (8 headphones +
   7 earbuds, kept together in one section), category count
   match, every image resolves on disk, cards render the photo
   with no duplicate hover layer and no undefined fields.
   Run:  node tools\check-audio.js
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

const audio = WT.PRODUCTS.filter((p) => p.cat === "audio");
const meta = WT.CATEGORIES.find((c) => c.id === "audio");

console.log("=== audio section ===");
console.log("  products: " + audio.length + "  (category advertises " + (meta ? meta.count : "?") + ")");

check(!!meta, "audio category exists in CATEGORIES");
check(audio.length === 15, "expected 15 audio products, got " + audio.length);
if (meta) check(audio.length === meta.count, "count matches CATEGORIES");
check(WT.catName("audio") === "Audio", "WT.catName resolves audio");

const headphones = audio.filter((p) => /^headphone-/.test(p.img));
const earbuds = audio.filter((p) => /^earbud-/.test(p.img));
check(headphones.length === 8, "8 headphones in the audio section, got " + headphones.length);
check(earbuds.length === 7, "7 earbuds in the audio section, got " + earbuds.length);
check(headphones.length + earbuds.length === audio.length, "headphones and earbuds share the one section (no strays)");

for (const p of audio) {
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