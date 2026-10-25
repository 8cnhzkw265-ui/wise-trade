/* ============================================================
   WISE TRADE — app shell
   Vanilla ES5-compatible JS, no build step.
   ============================================================ */
(function () {
  "use strict";

  var $  = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* Publish the helpers the moment this file parses: the page scripts
     (shop.js / product.js / checkout.js) capture WT.$ at their own parse
     time, which happens BEFORE boot() runs — if we only published there,
     they would capture undefined and their wt:ready init would throw. */
  window.WT = window.WT || {};
  window.WT.$ = $;
  window.WT.$$ = $$;

  function on(el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt || false); }

  /* ==========================================================
     1. CART — localStorage backed
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

      /* re-rendering wipes the drawer body — remember where the user was
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
          ? "Nice — <b>free shipping unlocked</b>."
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

      /* Enter inside the field must not submit/reload the page —
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
     6. ACCORDION (FAQ) — one open at a time
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
         up — and never hide while a drawer owns the screen */
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
     8.5 PAGE CHROME — skip link + back-to-top
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

    /* the footer's bottom bar sits in this corner — the button steps aside
       while the footer is on screen so it never covers the payment marks */
    var footer = $(".footer");
    if (footer && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          toTop.classList.toggle("is-tucked", entry.isIntersecting);
        });
      }).observe(footer);
    }
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
     13.5 HOME GRID — Hyper collection tabs (render bestsellers)
     ========================================================== */
  function currentColor(id) {
    for (var i = 0; i < Cart.items.length; i++) {
      if (Cart.items[i].id === id) return Cart.items[i].color;
    }
    return null;
  }

  function initGlobalEvents() {
    on(document, "click", function (e) {
      var target = e.target;
      var opener = target.closest ? target.closest("[data-open]") : null;
      if (opener) {
        e.preventDefault();
        var name = opener.getAttribute("data-open");
        if (name === "mnav") opener.setAttribute("aria-expanded", "true");
        Drawer.open(name);
        return;
      }
      var closer = target.closest ? target.closest("[data-close]") : null;
      if (closer) {
        e.preventDefault();
        var menuTrigger = document.querySelector('[data-open="mnav"]');
        if (menuTrigger) menuTrigger.setAttribute("aria-expanded", "false");
        Drawer.close();
        return;
      }
      var addBtn = target.closest ? target.closest("[data-add]") : null;
      if (addBtn) {
        e.preventDefault();
        var id = addBtn.getAttribute("data-add");
        var p = Cart.add(id, MIN_QTY, null);
        if (p) {
          toast({ title: "Added to cart", text: p.name + (WHOLESALE ? " — " + WT.MOQ + " units" : ""), image: WT.imgSrc(p) });
          var original = addBtn.getAttribute("data-label") || addBtn.textContent;
          addBtn.setAttribute("data-label", original);
          addBtn.textContent = "Added";
          setTimeout(function () { addBtn.textContent = original; }, 1500);
          if (window.innerWidth >= 900) Drawer.open("cart");
        }
        return;
      }
      var rateBtn = target.closest ? target.closest("[data-rate]") : null;
      if (rateBtn) {
        e.preventDefault();
        var productId = rateBtn.getAttribute("data-rating-product");
        if (productId && WT.rateProduct(productId, rateBtn.getAttribute("data-rate"))) {
          toast({ title: "Rating saved", text: "Thanks for sharing your rating." });
        }
        return;
      }
      var inc = target.closest ? target.closest("[data-qty-inc]") : null;
      if (inc) {
        var incId = inc.getAttribute("data-qty-inc");
        var incItem = Cart.find(incId, currentColor(incId));
        if (incItem) Cart.setQty(incItem.id, incItem.qty + 1, incItem.color);
        return;
      }
      var dec = target.closest ? target.closest("[data-qty-dec]") : null;
      if (dec) {
        var decId = dec.getAttribute("data-qty-dec");
        var decItem = Cart.find(decId, currentColor(decId));
        if (decItem) Cart.setQty(decItem.id, decItem.qty - 1, decItem.color);
        return;
      }
      var remove = target.closest ? target.closest("[data-remove]") : null;
      if (remove) {
        var removeId = remove.getAttribute("data-remove");
        var removeItem = Cart.find(removeId, currentColor(removeId));
        var removeProduct = WT.byId(removeId);
        if (removeItem) Cart.remove(removeId, removeItem.color);
        if (removeProduct) toast({ title: "Removed", text: removeProduct.name });
        return;
      }
      if (target.matches && target.matches("[data-scrim]")) Drawer.close();
    });

    on(document, "keydown", function (e) {
      if (e.key === "Escape") {
        var open = $("[data-drawer].is-open");
        if (open) {
          var trigger = document.querySelector('[data-open="' + open.getAttribute("data-drawer") + '"]');
          if (trigger && trigger.getAttribute("data-open") === "mnav") trigger.setAttribute("aria-expanded", "false");
          Drawer.close();
        }
      }
      if (e.key === "Tab") {
        var drawer = $("[data-drawer].is-open");
        if (drawer) {
          var f = focusables(drawer);
          if (f.length) {
            var first = f[0], last = f[f.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
          }
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        Drawer.open("search");
      }
    });
  }

  function initHomeGrid() {
    var host = $("[data-home-grid]");
    if (!host || !window.WT || !WT.PRODUCTS) return;
    var top = WT.PRODUCTS.slice().sort(function (a, b) { return b.reviews - a.reviews; }).slice(0, 16);
    host.innerHTML = top.map(function (p) { return WT.cardHTML(p); }).join("");
  }

  function initTopRatedGrid() {
    var host = $("[data-top-rated]");
    if (!host || !WT.PRODUCTS || !WT.ratingFor) return;
    var top = WT.PRODUCTS.slice().sort(function (a, b) {
      var ar = WT.ratingFor(a), br = WT.ratingFor(b);
      return br.average - ar.average || br.count - ar.count;
    }).slice(0, 4);
    host.innerHTML = top.map(function (p) { return WT.cardHTML(p); }).join("");
  }

  on(document, "wt:rating-change", function (e) {
    var product = WT.byId(e.detail && e.detail.id);
    if (!product) return;
    $$('[data-rating-summary="' + product.id + '"]').forEach(function (el) {
      var rating = WT.ratingFor(product);
      el.innerHTML = '<span class="rating-stars">' + WT.stars(rating.average) + '</span><span>' + rating.average.toFixed(1) + ' (' + rating.count + ' ratings)</span>';
    });
    $$('[data-rating-product="' + product.id + '"]').forEach(function (button) {
      button.setAttribute("aria-pressed", Number(button.getAttribute("data-rate")) === WT.ratingFor(product).user ? "true" : "false");
    });
    $$('[data-rating-label="' + product.id + '"]').forEach(function (label) { label.textContent = "Your rating"; });
  });

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
  function renderCatNav() {
    try {
      if (!window.WT || !window.WT.CATEGORIES) return;
      $$("[data-cat-nav]").forEach(function (container) {
        var base = container.getAttribute("data-base") || "shop.html";
        var wholesale = container.getAttribute("data-wholesale") === "true";
        if (wholesale) base = "wholesale.html";
        container.innerHTML = window.WT.CATEGORIES.map(function (c) {
          return '<a class="nav__link" href="' + base + '?c=' + c.id + '">' + c.name + "</a>";
        }).join("");
      });
    } catch (e) { /* nav render is non-critical */ }
  }

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
    initTopRatedGrid();
    initReveal();
    initCounters();
    renderCatNav();
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
