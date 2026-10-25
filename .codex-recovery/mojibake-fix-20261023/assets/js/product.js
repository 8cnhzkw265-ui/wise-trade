/* ============================================================
   WISE TRADE — product detail controller
   Reads ?id= from the URL, renders the gallery + buy box,
   wires variant swatches, the stock counter, the spec strip
   and the sticky cart bar.
   ============================================================ */
(function () {
  "use strict";

  var $  = WT.$;
  var $$ = WT.$$;

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : null;
  }

  var product = null;
  var color = null;
  var qty = WT.isWholesale() ? WT.MOQ : 1;
  var current = 0;   /* index of the visible gallery frame */

  /* gallery frames — raster products ship a single photograph, so they
     get one frame; SVG products keep the five-frame turntable cycle */
  function galleryFrames(p) {
    var primary = WT.imgSrc(p);
    var alt = WT.imgAltSrc(p);
    if (primary === alt) return [{ src: primary, label: p.name + " — product view" }];
    return [
      { src: primary, label: p.name + " — front view" },
      { src: alt, label: p.name + " — angled view" },
      { src: primary, label: p.name + " — detail" },
      { src: alt, label: p.name + " — in use" },
      { src: primary, label: p.name + " — packaging" }
    ];
  }

  function stockState(p) {
    if (p.stock <= 0) return { cls: "stock--out", text: "Out of stock" };
    if (p.stock <= 12) return { cls: "stock--low", text: "Only " + p.stock + " left — selling fast" };
    return { cls: "", text: p.stock + " in stock, ships today" };
  }

  function specStrip(p) {
    return (
      '<dl class="specstrip">' +
        Object.keys(p.specs).map(function (k) {
          return "<div><dt>" + k + "</dt><dd>" + p.specs[k] + "</dd></div>";
        }).join("") +
      "</dl>"
    );
  }

  function priceBlock(p) {
    if (WT.isWholesale()) {
      return (
        '<div class="buybox__price"><ins>' + WT.money(WT.priceOf(p)) + "</ins>" +
        "<del>" + WT.money(p.price) + "</del>" +
        '<span class="badge badge--soft">Trade price</span></div>'
      );
    }
    if (p.compareAt) {
      var off = Math.round((1 - p.price / p.compareAt) * 100);
      return (
        '<div class="buybox__price"><ins>' + WT.money(p.price) + "</ins>" +
        "<del>" + WT.money(p.compareAt) + "</del>" +
        '<span class="badge badge--sale">Save ' + off + "%</span></div>"
      );
    }
    return '<div class="buybox__price">' + WT.money(p.price) + "</div>";
  }

  /* ---------------- render ---------------- */
  function render() {
    var host = $("[data-pdp]");
    if (!host || !product) return;

    var p = product;
    var frames = galleryFrames(p);
    var st = stockState(p);
    var pct = Math.min(100, (p.stock / 250) * 100);

    host.innerHTML =
      /* ---------- gallery ---------- */
      '<div class="gallery">' +
        '<div class="gallery__main">' +
          '<img data-gallery-main src="' + frames[0].src + '" alt="' + frames[0].label + '" width="600" height="600" tabindex="0" role="group" aria-label="Product image gallery, use arrow keys">' +
          '<div class="gallery__flags">' + WT.flags(p) + "</div>" +
          /* arrows and thumbnails only make sense with more than one frame —
             a single photograph gets a clean, chrome-free well */
          (frames.length > 1
            ? '<button class="gallery__nav gallery__nav--prev" data-gal-prev aria-label="Previous image"><svg style="transform:rotate(180deg)"><use href="#i-arrow"/></svg></button>' +
              '<button class="gallery__nav gallery__nav--next" data-gal-next aria-label="Next image"><svg><use href="#i-arrow"/></svg></button>'
            : "") +
        "</div>" +
        (frames.length > 1
          ? '<div class="gallery__thumbs" role="tablist" aria-label="Product images">' +
              frames.map(function (f, i) {
                return (
                  '<button class="gallery__thumb" data-gal-thumb="' + i + '" role="tab" ' +
                  'aria-current="' + (i === 0 ? "true" : "false") + '" aria-label="' + f.label + '">' +
                  '<img src="' + f.src + '" alt="" width="120" height="120"></button>'
                );
              }).join("") +
            "</div>"
          : "") +
      "</div>" +

      /* ---------- buy box ---------- */
      '<div class="buybox">' +
        '<div class="buybox__head">' +
          '<p class="eyebrow">' + WT.catName(p.cat) + "</p>" +
          "<h1>" + p.name + "</h1>" +
          '<div class="buybox__meta">' +
            (function () { var rating = WT.ratingFor(p); return '<div class="rating-summary" data-rating-summary="' + p.id + '"><span class="rating-stars">' + WT.stars(rating.average) + '</span><span>' + rating.average.toFixed(1) + ' (' + rating.count + ' ratings)</span></div><div class="rate-product" role="group" aria-label="Rate this product">' + [1,2,3,4,5].map(function (n) { return '<button type="button" data-rate="' + n + '" data-rating-product="' + p.id + '" aria-label="Rate ' + n + ' out of 5 stars" aria-pressed="' + (rating.user === n) + '">&#9733;</button>'; }).join('') + '<span data-rating-label="' + p.id + '">' + (rating.user ? 'Your rating' : 'Rate this product') + '</span></div>'; })() +
            '<span class="badge badge--soft">SKU ' + WT.skuOf(p) + "</span>" +
          "</div>" +
          priceBlock(p) +
          '<p class="buybox__desc">' + p.blurb + "</p>" +
        "</div>" +

        /* variants: colour */
        '<div class="optrow">' +
          '<div class="optrow__label">Finish <span data-color-name></span></div>' +
          '<div class="swatches" role="group" aria-label="Choose a finish">' +
            (p.colors || []).map(function (c, i) {
              return (
                '<button class="swatch swatch--lg" data-color="' + c + '" ' +
                'style="background:' + c + '" ' +
                'aria-pressed="' + (i === 0 ? "true" : "false") + '" ' +
                'aria-label="Finish: ' + colorName(c) + '"></button>'
              );
            }).join("") +
          "</div>" +
        "</div>" +

        /* stock counter */
        '<p class="stock ' + st.cls + '"><svg style="width:15px;height:15px"><use href="#i-package"/></svg>' +
          st.text + '<span class="stock__bar"><span class="stock__fill" style="width:' + pct + '%"></span></span></p>' +

        /* quantity + add */
        '<div class="buyrow">' +
          '<div class="qty">' +
            '<button data-qty-minus aria-label="Decrease quantity"' + (WT.isWholesale() ? " disabled" : "") + '><svg><use href="#i-minus"/></svg></button>' +
            '<output data-qty-value aria-live="polite">' + qty + '</output>' +
            '<button data-qty-plus aria-label="Increase quantity"><svg><use href="#i-plus"/></svg></button>' +
          "</div>" +
          '<button class="btn btn--primary btn--lg" data-add-main' + (p.stock <= 0 ? " disabled" : "") + ">" +
            (p.stock <= 0 ? "Sold out" : (WT.isWholesale() ? "Add " + WT.MOQ + " to cart" : "Add to cart")) +
          "</button>" +
        "</div>" +
        (WT.isWholesale() ? '<p class="buybox__moq">Trade price · minimum ' + WT.MOQ + ' units per product</p>' : "") +

        '<button class="btn btn--light btn--block" data-buy-now>Buy it now</button>' +

        /* spec strip from metafields */
        specStrip(p) +

        '<div class="assure">' +
          "<div><svg><use href='#i-truck'/></svg> Free shipping over $75</div>" +
          "<div><svg><use href='#i-refresh'/></svg> 60-day free returns</div>" +
          "<div><svg><use href='#i-shield'/></svg> 5-year warranty</div>" +
          "<div><svg><use href='#i-lock'/></svg> Secure checkout</div>" +
        "</div>" +
      "</div>";

    color = (p.colors && p.colors[0]) || null;
    paintColorName();
    renderFeatures();
    renderRelated();
    initStickyBar();
  }

  /* friendly names for the swatch hexes */
  function colorName(hex) {
    if (!hex) return "";
    var map = {
      "#16180f": "Graphite", "#2b2e26": "Charcoal", "#0f4c33": "Forest",
      "#b9b4a6": "Stone", "#c9c4b6": "Sand", "#e8e4da": "Chalk",
      "#d98a2b": "Amber", "#8a5a3b": "Cognac", "#4a4d42": "Moss",
      "#7a6a52": "Khaki", "#2f3a36": "Pine", "#3fbf87": "Signal",
      "#1f1c18": "Ink", "#e8e2d4": "Bone", "#cfc3ad": "Dune",
      "#8d9194": "Slate", "#5a5d63": "Basalt", "#4a5b8c": "Navy"
    };
    return map[hex.toLowerCase()] || "Selected";
  }

  function paintColorName() {
    var el = $("[data-color-name]");
    if (el) el.textContent = colorName(color);
  }

  /* ---------------- accordion features ---------------- */
  function renderFeatures() {
    var host = $("[data-acc-features]");
    if (!host || !product) return;
    host.innerHTML =
      "<p>" + product.blurb + "</p>" +
      "<ul>" +
        Object.keys(product.specs).map(function (k) {
          return "<li><strong>" + k + ":</strong> " + product.specs[k] + "</li>";
        }).join("") +
      "</ul>";
  }

  /* ---------------- related products ---------------- */
  function renderRelated() {
    var section = $("[data-related-section]");
    var grid = $("[data-related]");
    if (!section || !grid || !product) return;

    var related = WT.PRODUCTS.filter(function (p) {
      return p.id !== product.id;
    }).sort(function (a, b) {
      /* same category first, then best reviewed */
      var aScore = (a.cat === product.cat ? 1000 : 0) + a.reviews;
      var bScore = (b.cat === product.cat ? 1000 : 0) + b.reviews;
      return bScore - aScore;
    }).slice(0, 4);

    grid.innerHTML = related.map(WT.cardHTML).join("");
    section.hidden = false;
  }

  /* ---------------- gallery ---------------- */
  function setFrame(i) {
    var frames = galleryFrames(product);
    var n = (i + frames.length) % frames.length;
    current = n;
    var main = $("[data-gallery-main]");
    if (main) {
      main.src = frames[n].src;
      main.alt = frames[n].label;
    }
    $$("[data-gal-thumb]").forEach(function (t) {
      t.setAttribute("aria-current", t.getAttribute("data-gal-thumb") === String(n) ? "true" : "false");
    });
  }

  /* ---------------- sticky cart bar ---------------- */
  function initStickyBar() {
    var bar = $("[data-stickybar]");
    var addMain = $("[data-add-main]");
    if (!bar || !addMain || !product) return;

    var img = $("[data-sticky-img]");
    var title = $("[data-sticky-title]");
    var price = $("[data-sticky-price]");
    if (img) img.src = WT.imgSrc(product);
    if (title) title.textContent = product.name;
    if (price) price.textContent = WT.money(WT.priceOf(product) * qty);

    var stickyAdd = $("[data-sticky-add]");
    if (stickyAdd) {
      stickyAdd.addEventListener("click", function () {
        addToCart();
        WT.Drawer.open("cart");
      });
    }
  }

  /* ---------------- cart ---------------- */
  function addToCart() {
    if (!product) return;
    if (WT.isWholesale()) qty = Math.max(qty, WT.MOQ);
    var p = WT.Cart.add(product.id, qty, color);
    if (p) WT.toast({ title: "Added to cart", text: p.name + (qty > 1 ? " × " + qty : ""), image: WT.imgSrc(p) });
  }

  /* ---------------- events ---------------- */
  function wire() {
    /* colour swatches */
    document.addEventListener("click", function (e) {
      var sw = e.target.closest("[data-color]");
      if (sw) {
        color = sw.getAttribute("data-color");
        $$("[data-color]").forEach(function (s) {
          s.setAttribute("aria-pressed", s.getAttribute("data-color") === color ? "true" : "false");
        });
        paintColorName();
        return;
      }

      /* quantity stepper */
      if (e.target.closest("[data-qty-minus]")) {
        qty = Math.max(WT.isWholesale() ? WT.MOQ : 1, qty - 1);
        paintQty();
        return;
      }
      if (e.target.closest("[data-qty-plus]")) {
        var max = product ? Math.max(WT.isWholesale() ? WT.MOQ : 1, product.stock) : 99;
        qty = Math.min(max, qty + 1);
        paintQty();
        return;
      }

      /* add to cart */
      if (e.target.closest("[data-add-main]")) {
        addToCart();
        WT.Drawer.open("cart");
        return;
      }

      /* buy it now */
      if (e.target.closest("[data-buy-now]")) {
        addToCart();
        WT.Drawer.open("cart");
        WT.toast({ title: "Checkout is next", text: "Your items are reserved for 60 minutes." });
        return;
      }

      /* gallery thumbnails + arrows */
      var thumb = e.target.closest("[data-gal-thumb]");
      if (thumb) {
        setFrame(parseInt(thumb.getAttribute("data-gal-thumb"), 10));
        return;
      }
      if (e.target.closest("[data-gal-prev]")) { setFrame(current - 1); return; }
      if (e.target.closest("[data-gal-next]")) { setFrame(current + 1); return; }
    });

    /* keyboard gallery support — keydown lives on its own listener:
       a click event never carries a key, so the branch it used to sit in
       could not fire */
    var galleryMain = $("[data-gallery-main]");
    if (galleryMain) {
      galleryMain.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") { e.preventDefault(); setFrame(current - 1); }
        if (e.key === "ArrowRight") { e.preventDefault(); setFrame(current + 1); }
        if (e.key === "Home") { e.preventDefault(); setFrame(0); }
      });
    }

    /* swipe the gallery on touch devices */
    var main = $("[data-gallery-main]");
    if (main) {
      var x0 = null;
      main.addEventListener("touchstart", function (e) {
        x0 = e.touches[0].clientX;
      }, { passive: true });
      main.addEventListener("touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0;
        if (Math.abs(dx) > 44) setFrame(dx < 0 ? current + 1 : current - 1);
        x0 = null;
      }, { passive: true });
    }

    /* show the sticky bar once the main add button scrolls out of view */
    var bar = $("[data-stickybar]");
    var buyRow = $("[data-add-main]");
    if (bar && buyRow && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          bar.classList.toggle("is-visible", !entry.isIntersecting);
          bar.setAttribute("aria-hidden", entry.isIntersecting ? "true" : "false");
        });
      }, { threshold: 0 }).observe(buyRow);
    }
  }

  function paintQty() {
    var min = WT.isWholesale() ? WT.MOQ : 1;
    var out = $("[data-qty-value]");
    if (out) out.textContent = qty;
    var dec = $("[data-qty-minus]");
    if (dec) dec.disabled = qty <= min;
    var price = $("[data-sticky-price]");
    if (price && product) price.textContent = WT.money(WT.priceOf(product) * qty);

    /* the button mirrors the stepper so the quantity is never a guess */
    var addMain = $("[data-add-main]");
    if (addMain && product && product.stock > 0) {
      addMain.textContent = WT.isWholesale()
        ? "Add " + WT.MOQ + " to cart"
        : (qty > 1 ? "Add " + qty + " to cart" : "Add to cart");
    }
  }

  /* ---------------- init ---------------- */
  function init() {
    if (!$("[data-pdp]")) return;

    var id = qs("id") || WT.PRODUCTS[0].id;
    product = WT.byId(id);

    if (!product) {
      var host = $("[data-pdp]");
      host.innerHTML =
        '<div class="empty" style="grid-column:1/-1;padding:80px 20px">' +
          '<span class="empty__icon"><svg><use href="#i-search"/></svg></span>' +
          "<h3>We couldn't find that product</h3>" +
          "<p>It may have sold out or the link may be out of date.</p>" +
          '<a class="btn btn--dark" href="' + WT.shopUrl() + '">Browse the collection</a>' +
        "</div>";
      return;
    }

    /* page chrome */
    document.title = (WT.isWholesale() ? "Wholesale · " : "") + product.name + " — Wise Trade";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", product.blurb);

    var crumb = $("[data-crumb]");
    if (crumb) crumb.textContent = product.name;
    var crumbCat = $("[data-crumb-cat]");
    if (crumbCat) {
      crumbCat.textContent = WT.catName(product.cat);
      crumbCat.setAttribute("href", WT.shopUrl(product.cat));
    }

    render();
    wire();
  }

  document.addEventListener("wt:ready", init);
})();
