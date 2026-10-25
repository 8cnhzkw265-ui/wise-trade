/* ============================================================
   WISE TRADE â€” app shell
   Vanilla ES5-compatible JS, no build step.
   ============================================================ */
(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Publish the helpers the moment this file parses: the page scripts
     (shop.js / product.js / checkout.js) capture WT.$ at their own parse
     time, which happens BEFORE boot() runs â€” if we only published there,
     they would capture undefined and their wt:ready init would throw. */
  window.WT = window.WT || {};
  window.WT.$ = $;
  window.WT.$$ = $$;

  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); }

  /* ==========================================================
     1. CART â€” localStorage backed
     ========================================================== */
  var FREE_SHIP = 75;
  var SHIP_FEE  = 7.95;
  var TAX_RATE  = 0.0; /* set at checkout */

  /* wholesale runs its own cart so a trade order never mixes with retail */
  var WHOLESALE = !!(window.WT && WT.isWholesale && WT.isWholesale());
  var MIN_QTY = WHOLESALE ? WT.MOQ : 1;
  var CART_KEY = WHOLESALE ? "wt_cart_wholesale" : "wt_cart";

  var Cart = {
    items: [],
    minQty: MIN_QTY,
    wholesale: WHOLESALE,

    load: function () {
      try {
        var raw = localStorage.getItem(CART_KEY);
        this.items = raw ? JSON.parse(raw) : [];
      } catch (e) { this.items = []; }
      if (!Array.isArray(this.items)) this.items = [];
    },

    save: function () {
      try { localStorage.setItem(CART_KEY, JSON.stringify(this.items)); } catch (e) { /* private mode */ }
      this.render();
      document.dispatchEvent(new CustomEvent("wt:cart-change", { detail: { count: this.count() } }));
    },

    count: function () {
      return this.items.reduce(function (n, i) { return n + i.qty; }, 0);
    },

    subtotal: function () {
      return this.items.reduce(function (n, i) {
        var p = WT.byId(i.id);
        return n + (p ? WT.priceOf(p) * i.qty : 0);
      }, 0);
    },

    find: function (id, color) {
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].id === id && this.items[i].color === color) return this.items[i];
      }
      return null;
    },

    add: function (id, qty, color) {
      var p = WT.byId(id);
      if (!p) return null;
      qty = Math.max(qty || 1, MIN_QTY);
      var found = this.find(id, color);
      if (found) found.qty = Math.min(found.qty + qty, 99);
      else this.items.push({ id: id, qty: qty, color: color || (p.colors && p.colors[0]) || null });
      this.save();
      return p;
    },

    setQty: function (id, qty, color) {
      var it = this.find(id, color);
      if (!it) return;
      if (qty <= 0) this.remove(id, color);
      else { it.qty = Math.min(Math.max(qty, MIN_QTY), 99); this.save(); }
    },

    remove: function (id, color) {
      this.items = this.items.filter(function (i) {
        return !(i.id === id && i.color === color);
      });
      this.save();
    },

    render: function () {
      var count = this.count();
      $$("[data-cart-count]").forEach(function (el) {
        el.textContent = count;
        el.setAttribute("data-count", count);
        if (count > 0) {
          el.classList.remove("pop");
          void el.offsetWidth;
          el.classList.add("pop");
        }
      });

      var body = $("[data-cart-body]");
      var foot = $("[data-cart-foot]");
      if (!body) return;

      var label = $("[data-cart-summary-label]");
      if (label) label.textContent = count ? "(" + count + ")" : "";

      if (!this.items.length) {
        body.innerHTML =
          '<div class="empty">' +
            '<span class="empty__icon"><svg><use href="#i-bag"/></svg></span>' +
            "<h3>Your cart is empty</h3>" +
            "<p>Nothing in here yet. The desk is waiting.</p>" +
            '<a class="btn btn--dark" href="' + WT.shopUrl() + '" data-close>Browse the collection</a>' +
          "</div>";
        if (foot) foot.hidden = true;
        return;
      }

      /* re-rendering wipes the drawer body â€” remember where the user was
         reading and which control they were using so +/- doesn't scroll
         them back to the top or dump focus on <body> */
      var keepScroll = body.scrollTop;
      var focusSel = null;
      if (body.contains(document.activeElement)) {
        ["data-qty-inc", "data-qty-dec", "data-remove"].forEach(function (attr) {
          var v = document.activeElement.getAttribute(attr);
          if (v !== null && !focusSel) focusSel = "[" + attr + '="' + v + '"]';
        });
      }

      body.innerHTML = this.items.map(function (item) {
        var p = WT.byId(item.id);
        if (!p) return "";
        var dot = item.color
          ? ' <span class="swatch" style="background:' + item.color + ";width:11px;height:11px;display:inline-block;vertical-align:-1px\"></span>"
          : "";
        return (
          '<div class="line">' +
            '<a class="line__media" href="' + WT.productUrl(p) + '">' +
              '<img src="' + WT.imgSrc(p) + '" alt="' + p.name + '" width="84" height="84">' +
            "</a>" +
            '<div class="line__body">' +
              '<div class="line__top"><div>' +
                '<a class="line__name" href="' + WT.productUrl(p) + '">' + p.name + "</a>" +
                '<div class="line__variant">' + WT.catName(p.cat) + dot +
                  (WHOLESALE ? ' <span class="line__moq">Min ' + WT.MOQ + '</span>' : "") + "</div>" +
              "</div>" +
              '<span class="line__price">' + WT.money(WT.priceOf(p) * item.qty) + "</span></div>" +
              '<div class="line__actions">' +
                '<div class="qty">' +
                  '<button data-qty-dec="' + p.id + '"' + (WHOLESALE && item.qty <= WT.MOQ ? " disabled" : "") + ' aria-label="Decrease quantity"><svg><use href="#i-minus"/></svg></button>' +
                  "<output>" + item.qty + "</output>" +
                  '<button data-qty-inc="' + p.id + '" aria-label="Increase quantity"><svg><use href="#i-plus"/></svg></button>' +
                "</div>" +
                '<button class="line__remove" data-remove="' + p.id + '">Remove</button>' +
              "</div>" +
            "</div>" +
          "</div>"
        );
      }).join("");

      body.scrollTop = keepScroll;
      if (focusSel) {
        var refocus = $(focusSel, body);
        if (refocus) refocus.focus({ preventScroll: true });
      }

      var sub = this.subtotal();
      var ship = sub >= FREE_SHIP ? 0 : SHIP_FEE;
      var set = function (sel, val) { var el = $(sel); if (el) el.textContent = val; };
      set("[data-cart-subtotal]", WT.money(sub));
      set("[data-cart-shipping]", ship === 0 ? "Free" : WT.money(ship));
      set("[data-cart-total]", WT.money(sub + ship + sub * TAX_RATE));
      if (foot) foot.hidden = false;

      var fill = $("[data-free-fill]");
      var text = $("[data-free-text]");
      if (fill) {
        fill.style.width = Math.min(100, (sub / FREE_SHIP) * 100) + "%";
        fill.setAttribute("data-full", sub >= FREE_SHIP ? "true" : "false");
      }
      if (text) {
        text.innerHTML = sub >= FREE_SHIP
          ? "Nice â€” <b>free shipping unlocked</b>."
          : "Add <b>" + WT.money(FREE_SHIP - sub) + "</b> more for free shipping.";
      }
    }
  };


  /* ==========================================================
     2. TOASTS
     ========================================================== */
  function toast(opts) {
    var host = $("[data-toasts]");
    if (!host) return;
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML =
      (opts.image ? '<img src="' + opts.image + '" alt="" width="34" height="34">' : "") +
      '<span class="toast__icon"><svg><use href="#i-check"/></svg></span>' +
      '<span class="toast__text"><b>' + opts.title + "</b>" +
      (opts.text ? "<br><span>" + opts.text + "</span>" : "") + "</span>";
    host.appendChild(el);
    setTimeout(function () {
      el.setAttribute("data-closing", "true");
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 320);
    }, opts.duration || 3600);
  }

  /* ==========================================================
     3. DRAWERS (cart / search / mobile nav / account)
     ========================================================== */
  var lastFocus = null;

  function focusables(root) {
    return $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', root)
      .filter(function (el) { return el.offsetParent !== null; });
  }

  var Drawer = {
    open: function (name) {
      var el = $('[data-drawer="' + name + '"]');
      if (!el) return;
      lastFocus = document.activeElement;

      $$("[data-drawer].is-open").forEach(function (d) {
        if (d !== el) d.classList.remove("is-open");
      });

      el.hidden = false;
      void el.offsetWidth;            /* reflow so the transition runs */
      el.classList.add("is-open");
      document.body.classList.add("is-locked");

      var scrim = $("[data-scrim]");
      if (scrim) scrim.classList.add("is-open");

      var f = focusables(el);
      if (f.length) setTimeout(function () { f[0].focus(); }, 60);
      document.dispatchEvent(new CustomEvent("wt:drawer-open", { detail: { name: name } }));
    },

    close: function () {
      $$("[data-drawer].is-open").forEach(function (d) {
        d.classList.remove("is-open");
        setTimeout(function () { if (!d.classList.contains("is-open")) d.hidden = true; }, 460);
      });
      var scrim = $("[data-scrim]");
      if (scrim) scrim.classList.remove("is-open");
      document.body.classList.remove("is-locked");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    },

    isOpen: function (name) {
      var el = $('[data-drawer="' + name + '"]');
      return !!(el && el.classList.contains("is-open"));
    }
  };

  /* ==========================================================
     4. SEARCH (drawer + keyboard nav)
     ========================================================== */
  var Search = {
    cursor: -1,

    init: function () {
      var input = $("[data-search-input]");
      var out = $("[data-search-results]");
      if (!input || !out) return;

      /* Enter inside the field must not submit/reload the page â€”
         go to the highlighted result (or the single match) instead. */
      var form = $("[data-search-form]");
      if (form) {
        on(form, "submit", function (e) {
          e.preventDefault();
          var items = $$(".result", out);
          if (Search.cursor > -1 && items[Search.cursor]) items[Search.cursor].click();
          else if (items.length === 1) items[0].click();
        });
      }

      /* every time the search drawer opens, land on the field with
         any previous query selected so typing replaces it */
      on(document, "wt:drawer-open", function (e) {
        if (!e.detail || e.detail.name !== "search") return;
        setTimeout(function () {
          input.focus();
          input.select();
        }, 80);
      });

      on(input, "input", function () { Search.run(input.value, out); });
      on(input, "keydown", function (e) {
        var items = $$(".result", out);
        if (!items.length) return;
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          Search.cursor += e.key === "ArrowDown" ? 1 : -1;
          if (Search.cursor < 0) Search.cursor = items.length - 1;
          if (Search.cursor >= items.length) Search.cursor = 0;
          items.forEach(function (el, i) { el.classList.toggle("is-cursor", i === Search.cursor); });
          items[Search.cursor].scrollIntoView({ block: "nearest" });
        } else if (e.key === "Enter" && Search.cursor > -1) {
          e.preventDefault();
          items[Search.cursor].click();
        } else if (e.key === "Escape") {
          Drawer.close();
        }
      });
      Search.run("", out);
    },

    esc: function (s) {
      return s.replace(/[&<>"]/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
      });
    },

    run: function (q, out) {
      q = (q || "").trim().toLowerCase();
      Search.cursor = -1;

      if (!q) {
        var hot = WT.PRODUCTS.filter(function (p) { return p.flags.indexOf("hot") > -1; }).slice(0, 3);
        out.innerHTML =
          '<p class="mega__heading">Popular right now</p>' +
          '<div class="chips" style="margin-bottom:22px">' + hot.map(function (p) {
            return '<a class="chip" href="' + WT.productUrl(p) + '">' + p.name + "</a>";
          }).join("") + "</div>" +
          '<p class="mega__heading">Browse categories</p>' +
          '<div class="search__cats">' +
            WT.CATEGORIES.map(function (c) {
              return '<a class="search__cat" href="' + WT.shopUrl(c.id) + '">' + c.name + "</a>";
            }).join("") +
          "</div>";
        return;
      }

      var words = q.split(/\s+/).filter(Boolean);
      var hits = WT.PRODUCTS.map(function (p) {
        var hay = (p.name + " " + p.blurb + " " + WT.catName(p.cat)).toLowerCase();
        var score = 0;
        words.forEach(function (w) {
          if (hay.indexOf(w) > -1) score += 1;
          if (p.name.toLowerCase().indexOf(w) === 0) score += 2;
        });
        return { p: p, score: score };
      }).filter(function (r) { return r.score > 0; })
        .sort(function (a, b) { return b.score - a.score; })
        .slice(0, 6);

      if (!hits.length) {
        out.innerHTML =
          '<div class="empty">' +
            '<span class="empty__icon"><svg><use href="#i-search"/></svg></span>' +
            "<h3>No matches for &ldquo;" + Search.esc(q) + "&rdquo;</h3>" +
            "<p>Try a broader term, or browse the categories below.</p>" +
            '<div class="chips" style="justify-content:center;margin-top:6px">' +
              WT.CATEGORIES.map(function (c) {
                return '<a class="chip" href="' + WT.shopUrl(c.id) + '">' + c.name + "</a>";
              }).join("") +
            "</div>" +
          "</div>";
        return;
      }

      out.innerHTML =
        '<p class="mega__heading">' + hits.length + " result" + (hits.length > 1 ? "s" : "") + "</p>" +
        '<div style="margin-top:8px">' + hits.map(function (r) {
          var p = r.p;
          return (
            '<a class="result" href="' + WT.productUrl(p) + '">' +
              '<span class="result__media"><img src="' + WT.imgSrc(p) + '" alt="" width="56" height="56"></span>' +
              "<span>" +
                '<span class="result__name">' + p.name + "</span><br>" +
                '<span class="result__meta">' + WT.catName(p.cat) + " &middot; " + WT.money(WT.priceOf(p)) + "</span>" +
              "</span>" +
              '<span class="result__meta">&#8250;</span>' +
            "</a>"
          );
        }).join("") + "</div>";
    }
  };

  /* ==========================================================
     5. SLIDER (testimonials)
     ========================================================== */
  function initSlider(root) {
    var track = $(".quotes__track", root);
    var slides = $$(".quote", root);
    var dots = $("[data-slider-dots]", root);
    if (!track || slides.length < 2) return;
    var i = 0, timer = null;

    slides.forEach(function (_, n) {
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", "Review " + (n + 1));
      on(b, "click", function () { go(n); restart(); });
      if (dots) dots.appendChild(b);
    });

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = "translateX(-" + i * 100 + "%)";
      slides.forEach(function (s, k) { s.setAttribute("aria-hidden", k === i ? "false" : "true"); });
      if (dots) {
        Array.prototype.forEach.call(dots.children, function (d, k) {
          d.setAttribute("aria-current", k === i ? "true" : "false");
        });
      }
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(function () { go(i + 1); }, 6500);
    }

    on($("[data-slider-next]", root), "click", function () { go(i + 1); restart(); });
    on($("[data-slider-prev]", root), "click", function () { go(i - 1); restart(); });
    on(root, "mouseenter", function () { if (timer) clearInterval(timer); });
    on(root, "mouseleave", restart);

    /* touch swipe */
    var x0 = null;
    on(root, "touchstart", function (e) { x0 = e.touches[0].clientX; if (timer) clearInterval(timer); }, { passive: true });
    on(root, "touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
      x0 = null;
      restart();
    });

    /* keyboard */
    root.setAttribute("tabindex", "0");
    on(root, "keydown", function (e) {
      if (e.key === "ArrowRight") { go(i + 1); restart(); }
      if (e.key === "ArrowLeft") { go(i - 1); restart(); }
    });

    go(0);
    restart();
  }

  /* ==========================================================
     6. ACCORDION (FAQ) â€” one open at a time
     ========================================================== */
  function initAccordion(root) {
    $$(".acc__btn", root).forEach(function (btn) {
      on(btn, "click", function () {
        var isOpen = btn.getAttribute("aria-expanded") === "true";
        $$(".acc__btn", root).forEach(function (b) {
          b.setAttribute("aria-expanded", "false");
          var panel = b.nextElementSibling;
          if (panel) panel.setAttribute("data-open", "false");
        });
        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          var p = btn.nextElementSibling;
          if (p) p.setAttribute("data-open", "true");
        }
      });
    });
  }

  /* ==========================================================
     7. MOBILE NAV ACCORDION
     ========================================================== */
  function initMobileNav() {
    $$(".mnav__toggle").forEach(function (btn) {
      if (btn.tagName !== "BUTTON") return;
      on(btn, "click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        var panel = btn.nextElementSibling;
        if (panel) panel.setAttribute("data-open", open ? "false" : "true");
      });
    });
  }


  /* ==========================================================
     8. SCROLL BEHAVIOUR
        - header float -> solid past hero
        - hide on scroll down, reveal on scroll up
     ========================================================== */
  function initHeaderScroll() {
    var header = $("[data-header]");
    if (!header) return;
    var hero = $("[data-hero]");
    var last = window.pageYOffset;
    var ticking = false;

    function update() {
      var y = window.pageYOffset;
      var trigger = hero ? Math.max(0, hero.offsetHeight - 140) : 120;

      if (hero && !header.classList.contains("is-scrolled")) {
        header.classList.toggle("header--float", y < trigger);
      } else {
        header.classList.remove("header--float");
      }

      /* the header gains elevation as soon as the page leaves the top */
      header.classList.toggle("is-scrolled", y > 6);

      /* hide when scrolling down past the first screen, show when scrolling
         up â€” and never hide while a drawer owns the screen */
      var drawerOpen = !!$("[data-drawer].is-open");
      if (!drawerOpen && y > 520 && y > last + 4) header.classList.add("header--hidden");
      else if (y < last || y < 260) header.classList.remove("header--hidden");

      last = y;
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });

    on(window, "resize", update);
    /* tabbing into the header must always bring it back on screen */
    on(header, "focusin", function () { header.classList.remove("header--hidden"); });
    on(document, "wt:drawer-open", function () { header.classList.remove("header--hidden"); });
    update();
  }

  /* ==========================================================
     8.5 PAGE CHROME â€” skip link + back-to-top
        Both are injected so every page picks them up without
        touching six HTML files.
     ========================================================== */
  function initPageChrome() {
    var main = $("#main") || $("main");

    if (main) {
      if (!main.id) main.id = "main";
      if (!main.hasAttribute("tabindex")) main.setAttribute("tabindex", "-1");

      var skip = document.createElement("a");
      skip.className = "skip-link";
      skip.href = "#main";
      skip.textContent = "Skip to content";
      on(skip, "click", function () {
        /* move focus with the scroll so keyboard users land in the page
           instead of tabbing back through the header */
        setTimeout(function () { main.focus({ preventScroll: true }); }, 0);
      });
      document.body.insertBefore(skip, document.body.firstChild);
    }

    var toTop = document.createElement("button");
    toTop.type = "button";
    toTop.className = "to-top";
    toTop.setAttribute("aria-label", "Back to top");
    toTop.innerHTML = '<svg aria-hidden="true" style="transform:rotate(-90deg)"><use href="#i-arrow"/></svg>';
    on(toTop, "click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(toTop);

    var ticking = false;
    function sync() {
      toTop.classList.toggle("is-visible", window.pageYOffset > 720);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(sync); }
    }, { passive: true });
    sync();
  }

  /* ==========================================================
     9. REVEAL ON SCROLL
     ========================================================== */
  function initReveal() {
    var els = $$("[data-stagger] > *, [data-reveal]");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var sibs = Array.prototype.slice.call(el.parentNode.children);
        var idx = sibs.indexOf(el);
        el.style.transitionDelay = Math.min(idx, 8) * 60 + "ms";
        el.classList.add("is-in");
        io.unobserve(el);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     10. COUNTERS
     ========================================================== */
  function initCounters() {
    var els = $$("[data-count-to]");
    if (!els.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count-to"));
        var start = performance.now();
        var dur = 1400;

        function tick(now) {
          var p = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     11. FORMS
     ========================================================== */
  function initForms() {

    var acc = $("[data-account-form]");
    if (acc) {
      on(acc, "submit", function (e) {
        e.preventDefault();
        toast({ title: "Signed in", text: "Welcome back to Wise Trade." });
        Drawer.close();
      });
    }
  }

  /* ==========================================================
     13.5 HOME GRID â€” Hyper collection tabs (render bestsellers)
     ========================================================== */
  function initHomeGrid() {
    var host = $("[data-home-grid]");
    if (!host || !window.WT || !WT.PRODUCTS) return;
    var top = WT.PRODUCTS.slice().sort(function (a, b) { return b.reviews - a.reviews; }).slice(0, 16);
    host.innerHTML = top.map(function (p) { return WT.cardHTML(p); }).join("");
  }

  /* ==========================================================
     RATING â€” interactive star rating on cards + product page
     ============================================================ */
  function initRating() {
    on(document, "click", function (e) {
      var starBtn = e.target.closest(".star[data-star]");
      if (!starBtn) return;
      var host = starBtn.closest("[data-rating]");
      if (!host) return;
      var productId = host.getAttribute("data-rating");
      var value = parseInt(starBtn.getAttribute("data-star"), 10);
      if (!Number.isFinite(value)) return;
      var ratingSpan = host.querySelector(".card__reviews, .rating__count");
      var current = WT.currentRating ? WT.currentRating(productId) : null;
      if (current === value) {
        if (ratingSpan) ratingSpan.textContent = "";
        return;
      }
      WT.currentRating = function (id) {
        return id === productId ? value : null;
      };
      var p = WT.PRODUCTS ? WT.PRODUCTS.find(function (x) { return x.id === productId; }) : null;
      if (ratingSpan && p) {
        if (value > 0) {
          ratingSpan.textContent = value.toFixed(1) + " (" + p.reviews + " ratings)";
        } else {
          ratingSpan.textContent = p.rating.toFixed(1) + " (" + p.reviews + " ratings)";
        }
      }
      if (p && productId) {
        if (WT.interactiveStars) WT.interactiveStars(p, value);
        else if (WT.productPageStars) WT.productPageStars(p, value);
      }
    });
  }

  /* ==========================================================
     13. GLOBAL EVENT DELEGATION
     ========================================================== */
  function initRatingCards() {
    if (!document.querySelectorAll) return;
    var cards = document.querySelectorAll("[data-rating]");
    cards.forEach(function (host) {
      var productId = host.getAttribute("data-rating");
      var starEls = host.querySelectorAll(".star");
      starEls.forEach(function (s) {
        var value = parseInt(s.getAttribute("data-star"), 10);
        var current = WT.currentRating ? WT.currentRating(productId) : null;
        s.setAttribute("aria-pressed", current != null && current >= value ? "true" : "false");
        var path = s.querySelector(".starrr path");
        if (path) {
          if (current != null && current > value) {
            path.setAttribute("fill", "#ffb800");
          } else if (current != null && current === value) {
            path.setAttribute("fill", "#ffb800");
            var svg = s.querySelector(".starrr");
            if (svg && !svg.querySelector("defs linearGradient")) {
              var id = "star-half-" + productId + "-" + value;
              if (!document.getElementById(id)) {
                var g = document.createElementNS("http://www.w3.org/2000/svg", "defs");
                g.innerHTML =
                  '<linearGradient id="' + id + '" x1="50%" y1="0%" x2="50%" y2="100%">' +
                  '<stop offset="50%" stop-color="#ffb800"/>' +
                  '<stop offset="50%" stop-color="#f3eede"/>' +
                  '</linearGradient>';
                svg.insertBefore(g, svg.firstChild);
              }
              path.setAttribute("fill", "url(#" + id + ")");
            }
          } else {
            path.setAttribute("fill", "#f3eede");
          }
        }
        s.setAttribute("aria-checked", current != null && current >= value ? "true" : "false");
        s.classList.toggle("star--active", current != null && current >= value);
      });
    });
  }

  /* ==========================================================
     13. GLOBAL EVENT DELEGATION
     ========================================================== */
  function initGlobalEvents() {
    /* open triggers */    on(document, "click", function (e) {
      var opener = e.target.closest("[data-open]");
      if (opener) {
        e.preventDefault();
        var name = opener.getAttribute("data-open");
        if (name === "mnav") {
          opener.setAttribute("aria-expanded", "true");
        }
        Drawer.open(name);
        return;
      }

      /* close triggers */
      var closer = e.target.closest("[data-close]");
      if (closer) {
        var t = e.target.closest("[data-open]");
        if (t && t.getAttribute("data-open") === "mnav") t.setAttribute("aria-expanded", "false");
        Drawer.close();
        return;
      }

      /* add to cart */
      var addBtn = e.target.closest("[data-add]");
      if (addBtn) {
        e.preventDefault();
        var id = addBtn.getAttribute("data-add");
        var p = Cart.add(id, MIN_QTY, null);
        if (p) {
          toast({ title: "Added to cart", text: p.name + (WHOLESALE ? " â€” " + WT.MOQ + " units" : ""), image: WT.imgSrc(p) });
          /* remember the original label â€” trade cards say "Add 15", not
             "Add to cart", and the reset must not flatten that */
          var original = addBtn.getAttribute("data-label") || addBtn.textContent;
          addBtn.setAttribute("data-label", original);
        }
       
          addBtn.textContent = "Added";
          setTimeout(function () { addBtn.textContent = original; }, 1500);
          if (window.innerWidth >= 900) Drawer.open("cart");
        }
        return;
      }
      }

      /* qty +/- and remove inside the cart */
      var inc = e.target.closest("[data-qty-inc]");
      if (inc) {
        var it = Cart.find(inc.getAttribute("data-qty-inc"), currentColor(inc.getAttribute("data-qty-inc")));
        if (it) Cart.setQty(it.id, it.qty + 1, it.color);
        return;
      }
      var dec = e.target.closest("[data-qty-dec]");
      if (dec) {
        var id2 = dec.getAttribute("data-qty-dec");
        var it2 = Cart.find(id2, currentColor(id2));
        if (it2) Cart.setQty(id2, it2.qty - 1, it2.color);
        return;
      }
      var rm = e.target.closest("[data-remove]");
      if (rm) {
        var rid = rm.getAttribute("data-remove");
        var rit = Cart.find(rid, currentColor(rid));
        var rp = WT.byId(rid);
        if (rit) Cart.remove(rid, rit.color);
        if (rp) toast({ title: "Removed", text: rp.name });
        return;
      }

      /* close on scrim */
      if (e.target.matches("[data-scrim]")) Drawer.close();
    });

    /* escape closes any drawer */
    on(document, "keydown", function (e) {
      if (e.key !== "Escape") return;
      var open = $("[data-drawer].is-open");
      if (open) {
        var trigger = document.querySelector('[data-open="' + open.getAttribute("data-drawer") + '"]');
        if (trigger && trigger.getAttribute("data-open") === "mnav") trigger.setAttribute("aria-expanded", "false");
        Drawer.close();
      }
    });

    /* focus trap */
    on(document, "keydown", function (e) {
      if (e.key !== "Tab") return;
      var open = $("[data-drawer].is-open");
      if (!open) return;
      var f = focusables(open);
      if (!f.length) return;
      var first = f[0], lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
    });

    /* ctrl/cmd + K opens search */
    on(document, "keydown", function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        Drawer.open("search");
      }
    });
  }

  /* the cart drawer re-renders after every change; keep colour context */
  function currentColor(id) {
    var it = null;
    for (var i = 0; i < Cart.items.length; i++) {
      if (Cart.items[i].id === id) { it = Cart.items[i]; break; }
    }
    return it ? it.color : null;
  }

  /* ==========================================================
     12. VIDEO PLACEHOLDER
     ========================================================== */
  function initVideo() {
    var btn = $("[data-play-video]");
    if (!btn) return;
    on(btn, "click", function () {
      toast({ title: "Workshop film", text: "Video would load here in production.", duration: 4200 });
    });
  }

  /* ==========================================================
     14. BOOTSTRAP
     ========================================================== */
  function boot() {
    Cart.load();
    initGlobalEvents();
    initHeaderScroll();
    initPageChrome();
    initMobileNav();
    Search.init();
    initForms();
    initVideo();
    initHomeGrid();
    initReveal();
    initCounters();
    initRating();
    initRatingCards();

    $$("[data-slider]").forEach(initSlider);
    $$("[data-acc]").forEach(initAccordion);
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* public API for page scripts */
    window.WT.Cart = Cart;
    window.WT.Drawer = Drawer;
    window.WT.toast = toast;
    window.WT.$ = $;
    window.WT.$$ = $$;

    document.dispatchEvent(new CustomEvent("wt:ready"));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
