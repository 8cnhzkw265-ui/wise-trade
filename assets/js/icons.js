/* ============================================================
   WISE TRADE — icon sprite
   Injected once into #icon-sprite so every page can use
   <svg><use href="#i-name"/></svg> without duplicating markup.
   ============================================================ */
(function () {
  "use strict";

  var P = (function () {
    return { fill: "none", stroke: "currentColor", w: 1.6 };
  })();

  var solid = { fill: "currentColor", stroke: "none" };

  var icons = {
    "i-search":      { v: P, d: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>' },
    "i-bag":         { v: P, d: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>' },
    "i-user":        { v: P, d: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/>' },
    "i-menu":        { v: P, d: '<path d="M4 7h16M4 12h16M4 17h16"/>' },
    "i-close":       { v: P, d: '<path d="m6 6 12 12M18 6 6 18"/>' },
    "i-chevron":     { v: P, d: '<path d="m6 9 6 6 6-6"/>', w: 1.7 },
    "i-arrow":       { v: P, d: '<path d="M4 12h15m-5-6 6 6-6 6"/>' },
    "i-plus":        { v: P, d: '<path d="M12 5v14M5 12h14"/>', w: 1.7 },
    "i-minus":       { v: P, d: '<path d="M5 12h14"/>', w: 1.7 },
    "i-check":       { v: P, d: '<path d="m5 13 4.5 4.5L19 7"/>', w: 1.8 },
    "i-star":        { v: solid, d: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z"/>' },
    "i-star-gold":  { v: { fill: "#ffb800", stroke: "none" }, d: '<path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z"/>' },
    "i-play":        { v: solid, d: '<path d="M8 5.5v13l11-6.5-11-6.5Z"/>' },
    "i-youtube":     { v: P, d: '<path d="M21 12a8 8 0 1 0-8-8v8zM21 2v6h-6"/>' },
    "i-truck":       { v: P, d: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/>' },
    "i-shield":      { v: P, d: '<path d="M12 3.5 5 6v6c0 4.2 2.9 7.6 7 8.5 4.1-.9 7-4.3 7-8.5V6l-7-2.5Z"/><path d="m9 12 2 2 4-4"/>' },
    "i-refresh":     { v: P, d: '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v4h-4"/>' },
    "i-headset":     { v: P, d: '<path d="M5 13v-1a7 7 0 0 1 14 0v1"/><path d="M5 13h2.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-5Zm14 0h-2.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-5Z"/>' },
    "i-mail":        { v: P, d: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>' },
    "i-instagram":   { v: P, d: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17" cy="7" r=".7" fill="currentColor"/>' },
    "i-x":           { v: solid, d: '<path d="M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8-6.9-10h6.2l4.3 5.6L17.5 3Zm-1 16.2h1.7L8.6 4.7H6.8l9.7 14.5Z"/>' },
    "i-linkedin":    { v: P, d: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 11v6M8 8v.01M12 17v-3.2a2 2 0 0 1 4 0V17"/>' },
    "i-facebook":    { v: solid, d: '<path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6A21 21 0 0 0 14.25 3.5c-2.4 0-4 1.45-4 4.1V9.9H7.5V13h2.75v8h3.25Z"/>' },
    "i-tiktok":      { v: solid, d: '<path d="M16.5 3c.4 2.1 1.8 3.5 4 3.8v3c-1.5 0-2.9-.5-4-1.3v6.1c0 3.7-2.6 6.4-6.3 6.4A6.1 6.1 0 0 1 4 15c0-3.5 2.9-6.2 6.4-6 .4 0 .8 0 1.1.1v3.1a3.1 3.1 0 0 0-3.1 2.8c0 1.7 1.4 3 3.1 3 1.8 0 3.1-1.4 3.1-3.3V3h2Z"/>' },
    "i-filter":      { v: P, d: '<path d="M4 6h16M7 12h10M10 18h4"/>' },
    "i-sliders":     { v: P, d: '<path d="M4 8h10M18 8h2M4 16h4M12 16h8"/><circle cx="16" cy="8" r="2"/><circle cx="10" cy="16" r="2"/>' },
    "i-grid":        { v: P, d: '<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>', j: "round" },
    "i-list":        { v: P, d: '<path d="M8 7h12M8 12h12M8 17h12"/><circle cx="4.5" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="17" r="1" fill="currentColor" stroke="none"/>' },
    "i-trend-up":    { v: P, d: '<path d="m4 16 5-5 3.5 3.5L20 7"/><path d="M15 7h5v5"/>', w: 1.7 },
    "i-trend-down":  { v: P, d: '<path d="m4 8 5 5 3.5-3.5L20 17"/><path d="M15 17h5v-5"/>', w: 1.7 },
    "i-bookmark":    { v: P, d: '<path d="M7 4.5h10v16l-5-4-5 4v-16Z"/>' },
    "i-heart":       { v: P, d: '<path d="M12 19.5s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10.5c0 4.6-7 9-7 9Z"/>' },
    "i-lock":        { v: P, d: '<rect x="5" y="10" width="14" height="10" rx="2.5"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10"/>' },
    "i-clock":       { v: P, d: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>' },
    "i-package":     { v: P, d: '<path d="M12 3.5 20 7.5v9L12 20.5 4 16.5v-9l8-4Z"/><path d="M4 7.5 12 11.5l8-4M12 11.5v9"/>' },
    "i-sparkle":     { v: solid, d: '<path d="M12 4.5 13.6 9l4.4 1.6-4.4 1.6L12 16.5l-1.6-4.3L6 10.6 10.4 9 12 4.5Z"/>' },
    "i-info":        { v: P, d: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>' },
    "i-phone":       { v: P, d: '<path d="M6 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.7 2 2 0 0 1 6 3.5Z"/>' },
    "i-pin":         { v: P, d: '<path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 0 0-13 0C5.5 15 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.4"/>' }
  };

  function build() {
    var parts = ['<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true" focusable="false">'];
    for (var key in icons) {
      if (!Object.prototype.hasOwnProperty.call(icons, key)) continue;
      var i = icons[key], v = i.v;
      var attrs = 'viewBox="0 0 24 24" fill="' + v.fill + '" stroke="' + v.stroke + '"';
      if (v.fill === "none") {
        attrs += ' stroke-width="' + (i.w || v.w || 1.6) + '"';
        attrs += ' stroke-linecap="round" stroke-linejoin="' + (i.j || "round") + '"';
      }
      parts.push('<symbol id="' + key + '" ' + attrs + '">' + i.d + "</symbol>");
    }
    parts.push("</svg>");

    var host = document.getElementById("icon-sprite") || document.body;
    host.innerHTML = parts.join("");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
