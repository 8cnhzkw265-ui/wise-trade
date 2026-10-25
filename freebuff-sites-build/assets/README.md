# Wise Trade

A responsive storefront for **Wise Trade** — power, audio, watches and carry for
people who spend the day at a desk. The design follows the **Tinker** reference: a warm cream
canvas, huge high-contrast serif headlines, beige
product cards, a newsletter split with a circular sage button, and a sage-green
footer with solid social glyphs.

No build step, no dependencies. Open `index.html` in a browser and it runs.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| `--canvas` | `#f4f1e8` | page background, warm cream |
| `--beige` | `#ede9e0` | product card wells, panels |
| `--amber` | `#e8b23c` | accent, video play button |
| `--sage` | `#a9bda6` | footer, newsletter button |
| `--ink` | `#2b2721` | text — warm near-black, never pure |

**Type:** `Playfair Display` for all display headings (serif, high contrast),
`Archivo` ExtraBold uppercase for the wordmark, `Inter` for body and UI,
`JetBrains Mono` for eyebrow labels and meta.

**The collection header** — a huge serif title on the left with a short sans
description on the right, aligned to the baseline. This is the reference's
signature layout and it opens every page.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero mosaic, values, craft split, testimonials, press, FAQ, newsletter |
| `shop.html` | Collection — text dropdown filters (Availability / Price / Color), sort menu, grid ⇄ list, pagination |
| `product.html` | Product detail — 5-frame gallery, colour variants, stock counter, spec strip, accordions, related grid, sticky cart bar |
| `checkout.html` | Two-column checkout with validation, delivery options, tax, simulated confirmation |
| `wholesale.html` | Trade catalogue — same grid, filters and sort, priced at trade rates |
| `wholesale-product.html` | Trade product detail — trade price, 15-unit minimum, wholesale cart |
| `wholesale-checkout.html` | Wholesale checkout — same form and flow, trade totals |

## Wholesale (trade) section

The retail pages and the wholesale pages share the same markup, CSS and JS.
A page opts into trade mode with `<body data-tier="wholesale">`; everything
else (prices, links, cart, quantity rules) is derived from that.

| Setting | Where | Default |
| --- | --- | --- |
| Trade discount | `WT.WHOLESALE_DISCOUNT` in `assets/js/data.js` | `0.25` (25% off retail) |
| Minimum order | `WT.MOQ` in `assets/js/data.js` | `15` units per product |
| Per-product trade price | optional `wholesale: 49.5` on a product | falls back to the discount |

Wholesale uses its own cart (`wt_cart_wholesale`), so a trade order never
mixes with a retail cart. Add 15 units from a card or product page; the cart
and checkout steppers clamp to the 15-unit minimum.

## Structure

```
assets/
  css/  base.css       tokens, reset, typography, layout
        components.css header, mega menu, buttons, cards, drawers, toasts
        sections.css   collection header, toolbar, dropdowns, newsletter, footer, responsive
        pages.css      breadcrumbs, list view, filters, pagination, PDP, sticky bar
        motion.css     scroll progress, parallax, tilt, marquee, text reveal, reduced-motion
  js/   icons.js       SVG sprite injected into #icon-sprite
        data.js        catalogue + card markup
        app.js         cart, drawers, search, slider, accordion, scroll, forms
        motion.js      pointer + scroll interactions (progress, magnetic, tilt, parallax)
        shop.js        dropdown filters, sort, view toggle, pagination
        product.js     PDP gallery, variants, sticky bar
        checkout.js    order summary and simulated payment
  img/  product photographs + legacy SVG scenes (hero, craft, newsletter)
tools/  gen-products.ps1     product artwork (transparent ground, beige shows through)
        gen-categories.ps1   category scenes used by the hero mosaic
        check-js.ps1         syntax-checks every JS file
        validate.ps1         verifies every asset reference and icon resolves
```

## Product imagery

Product SVGs are drawn on a **transparent** ground so the beige card shows
through, matching the reference's cut-out product photography. Each has a hover
variant that scales the object slightly, so cards get a real turntable effect on
hover without a second photograph.

The **Chargers** (power banks + cables), **Backpacks**, **Audio** (headphones +
earbuds, kept together in one section) and **Watches** use studio
**photographs** (`charger-*` / `backpack-*` / `cable-*` / `headphone-*` /
`earbud-*` / `watch-*` in `assets/img/`). Every catalogue product is a photo; the
generated `p1`–`p12` SVG product artwork is legacy and no longer referenced.
`WT.imgSrc()` / `WT.imgAltSrc()` in `data.js` resolve a full raster file name
(`charger-foo.jpg`), and a `mix-blend-mode: multiply` rule blends
each photo's white studio ground into the beige card well. Single-photo products
skip the duplicate hover layer (`altTag()`). Run `node tools\check-chargers.js`,
`node tools\check-backpacks.js`, `node tools\check-audio.js` and
`node tools\check-watches.js` to verify every product's image files resolve.

## Interactivity

- **Cart** — `localStorage` backed, survives reloads and pages. Quantity steppers,
  remove, free-shipping progress bar, live totals.
- **Drawers** — cart, search, mobile nav, account. Scrim, focus trap, focus
  restore, `Esc` to close, body scroll lock.
- **Search** — live results, ranking, `↑`/`↓` navigation, `Ctrl`/`Cmd`+`K`.
- **Collection** — multi-select filters in dropdown panels that stay open for
  multi-select, five sorts, animated result transitions, state written to the URL.
- **PDP** — gallery with thumbnails, arrows, swipe and keyboard; self-labelling
  colour variants; stock counter; sticky cart bar via `IntersectionObserver`.
- **Motion** — scroll reveals, marquee, testimonial slider with autoplay/swipe.
  All respect `prefers-reduced-motion`.

## Responsive

Breakpoints at 1200 / 1000 / 900 / 720 / 420px. The desktop nav becomes a
slide-out, grids reflow 4 → 3 → 2 → 1, the collection header stacks, the
newsletter split stacks, and hover-only affordances become permanently visible
on touch. `env(safe-area-inset-*)` is respected on notched screens.

## Accessibility

Semantic landmarks, visible focus states, `aria-expanded` on all dropdowns,
accordions and menus, `aria-pressed` on toggles, `aria-live` on the cart count,
labelled icon buttons, alt text throughout, and full keyboard support for
gallery, slider, search and drawers.

## Tooling

```powershell
# syntax-check all JS
powershell -ExecutionPolicy Bypass -File tools\check-js.ps1

# verify every asset reference and icon sprite entry resolves
powershell -ExecutionPolicy Bypass -File tools\validate.ps1

# regenerate artwork
powershell -ExecutionPolicy Bypass -File tools\gen-products.ps1
powershell -ExecutionPolicy Bypass -File tools\gen-categories.ps1
```

## Going live on Shopify

`assets/js/data.js` is the only file that needs to change. Replace `WT.PRODUCTS`
with a Storefront API call, keeping the field names (`id`, `price`, `compareAt`,
`flags`, `colors`, `specs`, `stock`, `img`) so `cardHTML`, the filters and the
PDP keep working. The spec strip maps to product metafields, and `WT.catName`
should read from Shopify collections.

Note: checkout is a simulation — wire the submit handler to Shopify before
taking real payments.
