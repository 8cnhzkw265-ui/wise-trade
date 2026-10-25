// Hyper hero rebuild: replace Tinker gradient hero with Hyper slideshow hero
const fs = require('fs');
const f = 'assets/css/sections.css';
let s = fs.readFileSync(f, 'utf8');
const start = s.indexOf('/* ---------- HERO ---------- */');
const end = s.indexOf('@keyframes scrollPulse');
if (start === -1 || end === -1) { console.log('hero block not found'); process.exit(1); }
const endLine = s.indexOf('\n', s.indexOf('}', end) + 1);
const heroCss = `/* ---------- HERO — Hyper slideshow: full-bleed image, left copy ---------- */
.hero {
  position: relative;
  overflow: clip;
  background: #101010;
  color: #fff;
  min-height: clamp(480px, 72vh, 760px);
  display: flex;
  align-items: center;
  padding: clamp(48px, 6vw, 96px) 0;
}
.hero__bg { position: absolute; inset: 0; z-index: 0; }
.hero__bg img { width: 100%; height: 100%; object-fit: cover; }
.hero__bg::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.28) 46%, rgba(0,0,0,.05) 75%);
}
.hero__inner { position: relative; z-index: 1; max-width: 640px; display: grid; gap: 18px; justify-items: start; }
.hero__kicker {
  display: inline-flex; align-items: center; gap: 8px;
  font-family: var(--font-mono); font-size: .6875rem; font-weight: 500;
  letter-spacing: .18em; text-transform: uppercase; color: #fff;
  border: 1px solid rgba(255,255,255,.4); border-radius: 999px; padding: 8px 14px;
}
.hero__title { color: #fff; font-size: clamp(2.4rem, 5vw, 4.5rem); line-height: 1.02; letter-spacing: -.03em; }
.hero__lede { color: rgba(255,255,255,.82); font-size: clamp(1rem, 1.4vw, 1.2rem); line-height: 1.6; max-width: 46ch; }
.hero__ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 6px; }
.hero__ctas .btn--light { background: #fff; color: #111; border-color: #fff; }
.hero__ctas .btn--ghostlight { background: transparent; color: #fff; border: 1px solid rgba(255,255,255,.55); }
.hero__ctas .btn--ghostlight:hover { background: rgba(255,255,255,.14); transform: translateY(-1px); }
.hero__stats { display: flex; gap: 36px; margin-top: 10px; }
.hero__stats div { display: grid; gap: 2px; }
.hero__stats b { font-size: 1.4rem; font-weight: 700; letter-spacing: -.02em; }
.hero__stats span { font-size: .75rem; letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.65); }
.hero__dots { position: absolute; z-index: 2; left: 50%; bottom: 22px; transform: translateX(-50%); display: flex; gap: 8px; }
.hero__dots button { width: 26px; height: 4px; border-radius: 2px; background: rgba(255,255,255,.35); }
.hero__dots button[aria-current="true"] { background: #fff; }
@media (max-width: 720px) {
  .hero { min-height: 560px; align-items: end; }
  .hero__bg::after { background: linear-gradient(180deg, rgba(0,0,0,.05) 20%, rgba(0,0,0,.66) 100%); }
  .hero__stats { gap: 24px; }
}
`;
s = s.slice(0, start) + heroCss + s.slice(endLine + 1);
fs.writeFileSync(f, s);
console.log('hero rebuilt');
