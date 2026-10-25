/* ============================================================
   WISE TRADE — motion layer
   Pointer and scroll interactions. Every module bails out early
   when the user prefers reduced motion or the device has no hover,
   so the site stays fully usable and quiet.
   ============================================================ */
(function () {
  "use strict";

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  function reduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  /* coarse pointer = touch; tilt/magnetic are meaningless there */
  function coarse() {
    return window.matchMedia && window.matchMedia("(hover: none)").matches;
  }
  /* one rAF-throttled scroll handler for the whole page */
  function onScroll(fn) {
    var queued = false;
    window.addEventListener("scroll", function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; fn(); });
    }, { passive: true });
  }

  /* ==========================================================
     1. SCROLL PROGRESS
     ========================================================== */
  function initProgress() {
    var bar = $("[data-progress]");
    if (!bar || reduced()) return;

    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.pageYOffset / max : 0;
      bar.style.transform = "scaleX(" + Math.max(0, Math.min(1, p)) + ")";
    }
    onScroll(update);
    window.addEventListener("resize", update);
    update();
  }

  /* ==========================================================
     2. MAGNETIC BUTTONS
     Elements lean a few px toward the cursor, then spring back.
     ========================================================== */
  function initMagnetic() {
    var els = $$("[data-magnetic]");
    if (!els.length || reduced() || coarse()) return;

    els.forEach(function (el) {
      var strength = parseFloat(el.getAttribute("data-magnetic")) || 0.28;

      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.setProperty("--mx", (dx * strength * 22).toFixed(2) + "px");
        el.style.setProperty("--my", (dy * strength * 14).toFixed(2) + "px");
      });

      el.addEventListener("pointerleave", function () {
        el.style.setProperty("--mx", "0px");
        el.style.setProperty("--my", "0px");
      });
    });
  }

  /* Card tilt removed: it forced a layout read on every pointermove across
     the product grids and re-rasterised the blended card images, which made
     hovering products feel laggy. Hover motion is CSS-only now. */

  /* ==========================================================
     4. HERO PARALLAX
     Tiles drift vertically at different rates as the mosaic
     leaves the viewport, which reads as depth without motion blur.
     ========================================================== */
  function initParallax() {
    var grid = $(".mosaic__grid");
    if (!grid || reduced() || coarse()) return;

    var tiles = $$(".mtile", grid);
    if (!tiles.length) return;

    function update() {
      var r = grid.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;

      var vh = window.innerHeight;
      /* -1 (below fold) .. 1 (above fold) */
      var progress = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);

      tiles.forEach(function (tile, i) {
        /* alternating depth keeps the drift subtle, not busy */
        var depth = i % 2 === 0 ? 1 : -0.6;
        var shift = progress * 26 * depth;
        tile.style.setProperty("--py", shift.toFixed(2) + "px");
        var img = $(".mtile__media img", tile);
        if (img) img.style.translate = "0 " + (shift * -0.45).toFixed(2) + "px";
      });
    }
    onScroll(update);
    update();
  }

  /* ==========================================================
     5. TEXT REVEAL
     Headings marked .reveal-line animate once when scrolled into
     view. Uses the same pattern as app.js but is self-contained so
     headings outside a [data-stagger] parent still animate.
     ========================================================== */
  function initTextReveal() {
    var els = $$(".reveal-line");
    if (!els.length) return;

    if (reduced() || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.15 });

    els.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     6. MARQUEE — duplicate content for a seamless loop
     ========================================================== */
  function initMarquee() {
    $$("[data-marquee-track]").forEach(function (track) {
      if (track.dataset.cloned) return;
      track.dataset.cloned = "1";
      track.innerHTML += track.innerHTML;
    });
  }

  /* ==========================================================
     7. BOOT
     ========================================================== */
  function boot() {
    initProgress();
    initMagnetic();
    initParallax();
    initTextReveal();
    initMarquee();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
