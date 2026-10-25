// Hyper homepage rebuild — Option 2: full Hyper default layout, Wise Trade brand
const fs = require('fs');
const f = 'index.html';
let s = fs.readFileSync(f, 'utf8');

const heroStart = s.indexOf('<!-- ============ HERO');
const trustStart = s.indexOf('<!-- ============ TRUSTBAR');
if (heroStart === -1 || trustStart === -1) { console.log('sections not found'); process.exit(1); }

const hyperTop = `<!-- ============ HERO — Hyper slideshow ============ -->
<section class="hero" aria-label="Featured collection">
  <div class="hero__bg" aria-hidden="true"><img src="assets/img/hero-desk.svg" alt="" fetchpriority="high"></div>
  <div class="container">
    <div class="hero__inner">
      <span class="hero__kicker">New — The Autumn Drop</span>
      <h1 class="hero__title">Desk goods built for the long session</h1>
      <p class="hero__lede">Organizers, chargers and decor that keep your desk calm and your gear charged. Bundle 2+ and save 20%.</p>
      <div class="hero__ctas">
        <a class="btn btn--light btn--lg" href="shop.html">Shop bestsellers</a>
        <a class="btn btn--ghostlight btn--lg" href="shop.html?c=decor">Shop the drop</a>
      </div>
      <div class="hero__stats">
        <div><b>4.9★</b><span>12k reviews</span></div>
        <div><b>60-day</b><span>Returns</span></div>
        <div><b>Free $75+</b><span>Shipping</span></div>
      </div>
    </div>
  </div>
  <div class="hero__dots" aria-hidden="true"><button aria-current="true"></button><button></button><button></button></div>
</section>

<!-- ============ TRUSTBAR — Hyper icon row ============ -->
<section class="trustbar" aria-label="Store benefits">
  <div class="container trustbar__grid">
    <div class="trustbar__item"><svg><use href="#i-truck"/></svg><div><b>Free shipping $75+</b><span>Fast, tracked delivery</span></div></div>
    <div class="trustbar__item"><svg><use href="#i-refresh"/></svg><div><b>60-day returns</b><span>No questions asked</span></div></div>
    <div class="trustbar__item"><svg><use href="#i-shield"/></svg><div><b>Lifetime repairs</b><span>Built to be fixed</span></div></div>
    <div class="trustbar__item"><svg><use href="#i-lock"/></svg><div><b>Secure checkout</b><span>256-bit encryption</span></div></div>
  </div>
</section>

<!-- ============ COLLECTION TABS + BESTSELLERS — Hyper default ============ -->
<section class="section section--tight" aria-label="Bestsellers">
  <div class="container">
    <div class="section-head">
      <div class="section-head__text">
        <p class="eyebrow">Most wanted</p>
        <h2>Shop bestsellers</h2>
      </div>
      <a class="link" href="shop.html">View all <svg><use href="#i-arrow"/></svg></a>
    </div>
    <div class="filterbar" role="tablist" aria-label="Shop by category">
      <button class="chip is-active" role="tab" aria-selected="true" data-cat="all">All</button>
      <button class="chip" role="tab" aria-selected="false" data-cat="organizers">Organizers</button>
      <button class="chip" role="tab" aria-selected="false" data-cat="productivity">Productivity</button>
      <button class="chip" role="tab" aria-selected="false" data-cat="chargers">Chargers</button>
      <button class="chip" role="tab" aria-selected="false" data-cat="decor">Decor</button>
    </div>
    <div class="pgrid pgrid--3" id="home-grid" data-stagger></div>
  </div>
</section>

<!-- ============ CATEGORY TILES — Hyper collection list ============ -->
<section class="section section--tight" aria-label="Shop by category">
  <div class="container">
    <div class="section-head">
      <div class="section-head__text">
        <p class="eyebrow">Departments</p>
        <h2>Shop by category</h2>
      </div>
    </div>
    <div class="catgrid">
      <a class="catcard" href="shop.html?c=organizers">
        <span class="catcard__media"><img src="assets/img/p2.svg" alt="Organizers" loading="lazy"></span>
        <span class="catcard__body"><b>Organizers</b><span>12 products →</span></span>
      </a>
      <a class="catcard" href="shop.html?c=productivity">
        <span class="catcard__media"><img src="assets/img/p7.svg" alt="Productivity" loading="lazy"></span>
        <span class="catcard__body"><b>Productivity</b><span>9 products →</span></span>
      </a>
      <a class="catcard" href="shop.html?c=chargers">
        <span class="catcard__media"><img src="assets/img/p6.svg" alt="Chargers" loading="lazy"></span>
        <span class="catcard__body"><b>Chargers</b><span>7 products →</span></span>
      </a>
      <a class="catcard" href="shop.html?c=decor">
        <span class="catcard__media"><img src="assets/img/p5.svg" alt="Decor" loading="lazy"></span>
        <span class="catcard__body"><b>Decor</b><span>10 products →</span></span>
      </a>
    </div>
  </div>
</section>

<!-- ============ BUNDLE PROMO — Hyper multi-bundle ============ -->
<section class="section bundle" aria-label="Bundle and save">
  <div class="container bundle__grid">
    <div class="bundle__media" aria-hidden="true"><img src="assets/img/p4.svg" alt="" loading="lazy"></div>
    <div class="bundle__copy">
      <p class="eyebrow">Bundle &amp; save 20%</p>
      <h2>The Complete Cable Kit + Dock</h2>
      <p class="lede">Buy the kit and the dock together and the discount applies in the cart automatically. No code, no fuss.</p>
      <div class="bundle__row">
        <a class="btn btn--lg" href="shop.html">Build your bundle</a>
        <span class="bundle__price">$228.00 <del>$245.00</del></span>
      </div>
      <p class="bundle__note">Mix any 2+ organizers or chargers — discount stacks in cart.</p>
    </div>
  </div>
</section>

`;

s = s.slice(0, heroStart) + hyperTop + s.slice(trustStart);
fs.writeFileSync(f, s);
console.log('homepage top rebuilt');
