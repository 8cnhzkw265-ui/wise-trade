/* ============================================================
   WISE TRADE — collection controller
   Text-style dropdown filters (Availability / Price / Color),
   sort menu, grid/list toggle, pagination and URL state.
   ============================================================ */
(function () {
  "use strict";

  var $  = WT.$;
  var $$ = WT.$$;

  var PER_PAGE = 8;
  var PRICE_MAX = 200;

  var COLLECTIONS = {
    chargers:     { title: "Chargers",     desc: "Power banks and cables that stay cool and quiet, rated for the whole desk at once." },
    backpacks:    { title: "Backpacks",    desc: "Padded, weather-ready carry for the commute, the gate and everything between." },
    audio:        { title: "Audio",        desc: "Headphones and earbuds for the deep-work hours — quiet, comfortable, all-day." },
    watches:      { title: "Watches",      desc: "Smart watches and fitness bands that track the day without owning it." },
    all:          { title: "Shop All",     desc: "Power, audio, watches and carry — built to be repaired rather than replaced." }
  };

  var TRADE_DESK = "Power, audio, watches and carry at trade pricing — " +
    Math.round(WT.WHOLESALE_DISCOUNT * 100) + "% below retail, minimum " + WT.MOQ +
    " units per product.";

  var state = {
    cats: [],
    inStock: false,
    onSale: false,
    maxPrice: PRICE_MAX,
    colors: [],
    sort: "featured",
    view: "grid",
    page: 1
  };

  function qs(name) {
    var m = new RegExp("[?&]" + name + "=([^&]*)").exec(window.location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : null;
  }

  function setParam(key, value) {
    var url = new URL(window.location.href);
    if (value === null || value === "" || value === "all") url.searchParams["delete"](key);
    else url.searchParams.set(key, value);
    window.history.replaceState({}, "", url.pathname + url.search);
  }

  /* ---------------- filtering ---------------- */
  function filtered() {
    return WT.PRODUCTS.filter(function (p) {
      if (state.cats.length && state.cats.indexOf(p.cat) === -1) return false;
      if (state.inStock && p.stock <= 0) return false;
      if (state.onSale && !p.compareAt) return false;
      if (WT.priceOf(p) > state.maxPrice) return false;
      if (state.colors.length) {
        var hit = (p.colors || []).some(function (c) { return state.colors.indexOf(c) > -1; });
        if (!hit) return false;
      }
      return true;
    });
  }

  var SORTS = {
    "featured":   { label: "Featured",    fn: function (a, b) { return b.reviews - a.reviews; } },
    "price-asc":  { label: "Price: low",  fn: function (a, b) { return WT.priceOf(a) - WT.priceOf(b); } },
    "price-desc": { label: "Price: high", fn: function (a, b) { return WT.priceOf(b) - WT.priceOf(a); } },
    "rating":     { label: "Top rated",   fn: function (a, b) { return b.rating - a.rating; } },
    "newest":     { label: "Newest",      fn: function (a, b) { return (b.flags.indexOf("new") > -1) - (a.flags.indexOf("new") > -1); } }
  };

  function render() {
    var list = filtered().sort(SORTS[state.sort].fn);
    var pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
    if (state.page > pages) state.page = pages;
    var slice = list.slice((state.page - 1) * PER_PAGE, (state.page - 1) * PER_PAGE + PER_PAGE);

    var grid = $("[data-results]");
    if (!grid) return;
    grid.className = "pgrid" + (state.view === "list" ? " pgrid--list" : "");

    if (!slice.length) {
      grid.innerHTML =
        '<div class="empty" style="grid-column:1/-1">' +
          '<span class="empty__icon"><svg><use href="#i-search"/></svg></span>' +
          "<h3>Nothing matches those filters</h3>" +
          "<p>Try widening the price range or clearing a category.</p>" +
          '<button class="btn" data-clear-filters>Clear all</button>' +
        "</div>";
    } else {
      grid.innerHTML = slice.map(WT.cardHTML).join("");
      $$(".card", grid).forEach(function (c, i) {
        c.style.opacity = "0";
        c.style.transform = "translateY(14px)";
        c.style.transition = "opacity .5s var(--ease-out) " + (i * 40) + "ms, transform .5s var(--ease-out) " + (i * 40) + "ms";
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { c.style.opacity = "1"; c.style.transform = "none"; });
        });
      });
    }

    var countEl = $("[data-result-count]");
    if (countEl) {
      countEl.textContent = list.length + (list.length === 1 ? " item" : " items");
      /* the grid swaps silently; announce the new total for screen readers */
      if (!countEl.hasAttribute("aria-live")) {
        countEl.setAttribute("role", "status");
        countEl.setAttribute("aria-live", "polite");
      }
    }

    var sortLabel = $("[data-sort-label]");
    if (sortLabel) sortLabel.childNodes[0].nodeValue = SORTS[state.sort].label + " ";

    renderPager(pages);
  }

  function renderPager(pages) {
    var pager = $("[data-pager]");
    if (!pager) return;
    if (pages <= 1) { pager.innerHTML = ""; return; }
    var html = '<button data-page="' + (state.page - 1) + '"' + (state.page === 1 ? " disabled" : "") +
      ' aria-label="Previous page"><svg style="transform:rotate(180deg)"><use href="#i-arrow"/></svg></button>';
    for (var i = 1; i <= pages; i++) {
      html += '<button data-page="' + i + '"' + (i === state.page ? ' aria-current="true"' : "") + ">" + i + "</button>";
    }
    html += '<button data-page="' + (state.page + 1) + '"' + (state.page === pages ? " disabled" : "") +
      ' aria-label="Next page"><svg><use href="#i-arrow"/></svg></button>';
    pager.innerHTML = html;
  }


  /* ---------------- dropdown panels ---------------- */
  function optBtn(label, active, count, attrs) {
    return (
      '<button class="dd__opt" ' + attrs + ' aria-pressed="' + (active ? "true" : "false") + '">' +
        "<span>" + label + "</span>" +
        (count !== undefined ? "<small>" + count + "</small>" : "") +
        '<span class="dd__check"><svg><use href="#i-check"/></svg></span>' +
      "</button>"
    );
  }

  var COLOR_NAMES = {
    "#1f1c18": "Black", "#8b5a2b": "Walnut", "#e8e2d4": "Chalk",
    "#c9c4b6": "Stone", "#2b2e26": "Charcoal", "#4a4d42": "Moss",
    "#7a6a52": "Khaki", "#2f3a36": "Pine"
  };

  function buildDropdowns() {
    var dds = $$("[data-dd]");

    /* --- Availability (plus categories) --- */
    if (dds[0]) {
      var nStock = WT.PRODUCTS.filter(function (p) { return p.stock > 0; }).length;
      var nSale = WT.PRODUCTS.filter(function (p) { return !!p.compareAt; }).length;
      $("[data-dd-panel]", dds[0]).innerHTML =
        optBtn("In stock", state.inStock, nStock, 'data-f="instock"') +
        optBtn("On sale", state.onSale, nSale, 'data-f="onsale"') +
        '<div style="height:1px;background:var(--stroke);margin:6px 0"></div>' +
        WT.CATEGORIES.map(function (c) {
          var n = WT.PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
          return optBtn(c.name, state.cats.indexOf(c.id) > -1, n, 'data-f="cat" data-val="' + c.id + '"');
        }).join("");
    }

    /* --- Price --- */
    if (dds[1]) {
      var steps = [
        { v: 30, label: "Under $30" },
        { v: 60, label: "Under $60" },
        { v: 100, label: "Under $100" },
        { v: PRICE_MAX, label: "Any price" }
      ];
      $("[data-dd-panel]", dds[1]).innerHTML = steps.map(function (s) {
        return optBtn(s.label, state.maxPrice === s.v, undefined, 'data-f="price" data-val="' + s.v + '"');
      }).join("");
    }

    /* --- Color --- */
    if (dds[2]) {
      var seen = {}, colors = [];
      WT.PRODUCTS.forEach(function (p) {
        (p.colors || []).forEach(function (c) { if (!seen[c]) { seen[c] = 1; colors.push(c); } });
      });
      $("[data-dd-panel]", dds[2]).innerHTML = colors.map(function (c) {
        var n = WT.PRODUCTS.filter(function (p) { return (p.colors || []).indexOf(c) > -1; }).length;
        return (
          '<button class="dd__opt" data-f="color" data-val="' + c + '" aria-pressed="' +
          (state.colors.indexOf(c) > -1 ? "true" : "false") + '">' +
            '<span style="display:flex;align-items:center;gap:9px">' +
              '<span class="swatch" style="background:' + c + ';width:15px;height:15px"></span>' +
              (COLOR_NAMES[c] || c) +
            "</span>" +
            "<small>" + n + "</small>" +
            '<span class="dd__check"><svg><use href="#i-check"/></svg></span>' +
          "</button>"
        );
      }).join("");
    }

    /* --- Sort --- */
    if (dds[3]) {
      $("[data-dd-panel]", dds[3]).innerHTML = Object.keys(SORTS).map(function (k) {
        return optBtn(SORTS[k].label, state.sort === k, undefined, 'data-f="sort" data-val="' + k + '"');
      }).join("");
    }
  }

  /* ---------------- events ---------------- */
  function initEvents() {
    document.addEventListener("click", function (e) {
      /* open / close a dropdown */
      var btn = e.target.closest("[data-dd-btn]");
      if (btn) {
        var dd = btn.closest("[data-dd]");
        var wasOpen = dd.classList.contains("is-open");
        closeAllDropdowns();
        if (!wasOpen) {
          dd.classList.add("is-open");
          btn.setAttribute("aria-expanded", "true");
        }
        return;
      }

      /* an option inside a panel */
      var opt = e.target.closest("[data-f]");
      if (opt) {
        var kind = opt.getAttribute("data-f");
        var val = opt.getAttribute("data-val");

        if (kind === "instock") state.inStock = !state.inStock;
        else if (kind === "onsale") state.onSale = !state.onSale;
        else if (kind === "cat") {
          var i = state.cats.indexOf(val);
          if (i > -1) state.cats.splice(i, 1); else state.cats.push(val);
          setParam("c", state.cats.length === 1 ? state.cats[0] : null);
        } else if (kind === "price") {
          state.maxPrice = parseInt(val, 10);
        } else if (kind === "color") {
          var k = state.colors.indexOf(val);
          if (k > -1) state.colors.splice(k, 1); else state.colors.push(val);
        } else if (kind === "sort") {
          state.sort = val;
          setParam("sort", val === "featured" ? null : val);
          closeAllDropdowns();
        }

        state.page = 1;
        buildDropdowns();
        render();

        /* buildDropdowns() replaces the panel's contents, which throws focus
           back to <body>. Put it back on the option the user just toggled so
           keyboard filtering doesn't need a re-tab after every choice. */
        var again = (kind && kind !== "sort")   /* sort closes the panel */
          ? $('[data-f="' + kind + '"]' + (val !== null ? '[data-val="' + val + '"]' : ""))
          : null;
        if (again) again.focus();
        return;   /* keep the panel open so multi-select works */
      }

      /* grid / list */
      var view = e.target.closest("[data-view]");
      if (view) {
        state.view = view.getAttribute("data-view");
        $$("[data-view]").forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-view") === state.view ? "true" : "false");
        });
        render();
        return;
      }

      /* pagination */
      var pg = e.target.closest("[data-page]");
      if (pg && !pg.disabled) {
        state.page = parseInt(pg.getAttribute("data-page"), 10);
        render();
        window.scrollTo({ top: $("[data-results]").offsetTop - 140, behavior: "smooth" });
        return;
      }

      /* clear all */
      if (e.target.closest("[data-clear-filters]")) {
        state.cats = []; state.inStock = false; state.onSale = false;
        state.colors = []; state.maxPrice = PRICE_MAX; state.page = 1;
        setParam("c", null);
        buildDropdowns();
        render();
        WT.toast({ title: "Filters cleared" });
        return;
      }

      /* clicking outside closes the dropdowns */
      closeAllDropdowns();
    });

    /* `on` is app.js's private helper — it does not exist in this file's
       scope, so use addEventListener directly (matches the click handler above). */
    document.addEventListener("keydown", function (e) {
      var open = $("[data-dd].is-open");

      if (e.key === "Escape") {
        if (!open) return;
        var trigger = $("[data-dd-btn]", open);
        closeAllDropdowns();
        if (trigger) trigger.focus();
        return;
      }

      /* ArrowDown on a trigger opens the panel and lands on the first option */
      var triggerBtn = e.target.closest && e.target.closest("[data-dd-btn]");
      if (triggerBtn && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
        e.preventDefault();
        var dd = triggerBtn.closest("[data-dd]");
        closeAllDropdowns();
        dd.classList.add("is-open");
        triggerBtn.setAttribute("aria-expanded", "true");
        var opts = $$(".dd__opt", dd);
        var pick = e.key === "ArrowDown" ? opts[0] : opts[opts.length - 1];
        if (pick) pick.focus();
        return;
      }

      /* arrow-key movement inside an open panel */
      var opt = e.target.closest && e.target.closest(".dd__opt");
      if (opt && open) {
        var items = $$(".dd__opt", open);
        var at = items.indexOf(opt);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          var next = items[at + (e.key === "ArrowDown" ? 1 : -1)];
          if (next) next.focus();
        } else if (e.key === "Home" || e.key === "End") {
          e.preventDefault();
          var edge = e.key === "Home" ? items[0] : items[items.length - 1];
          if (edge) edge.focus();
        }
      }
    });
  }

  function closeAllDropdowns() {
    $$("[data-dd].is-open").forEach(function (d) {
      d.classList.remove("is-open");
      var b = $("[data-dd-btn]", d);
      if (b) b.setAttribute("aria-expanded", "false");
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    if (!$("[data-results]")) return;

    var c = qs("c");
    if (c && COLLECTIONS[c]) state.cats = [c];
    var s = qs("sort");
    if (s && SORTS[s]) state.sort = s;

    buildDropdowns();
    initEvents();
    syncHeading();
    render();
  }

  function syncHeading() {
    var key = state.cats.length === 1 ? state.cats[0] : "all";
    var meta = COLLECTIONS[key] || COLLECTIONS.all;
    var title = meta.title;
    var desc = meta.desc;
    if (WT.isWholesale()) {
      title = key === "all" ? "Wholesale" : "Wholesale — " + meta.title;
      desc = key === "all" ? TRADE_DESK : meta.desc;
    }
    var t = $("[data-collection-title]"), b = $("[data-collection-blurb]"), cr = $("[data-crumb]");
    if (t) t.textContent = title;
    if (b) b.textContent = desc;
    if (cr) cr.textContent = title;
    document.title = title + " — Wise Trade";
  }

  document.addEventListener("wt:ready", init);
})();
