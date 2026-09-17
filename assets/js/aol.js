/* ==========================================================================
   aol.js — Sleep & Anxiety Protocol landing page
   One IIFE, no dependencies, ES5 syntax. Paste into the Unbounce Script
   Manager with placement BEFORE BODY END TAG, scope "This page only".

   Four properties that matter for Unbounce:
     1. Global re-entry guard    — the script may be injected twice.
     2. Per-element init guard   — safe to re-run after DOM mutation.
     3. Per-module try/catch     — one failure can't take down the rest.
     4. ready()                  — the builder preview may run this early.

   Every module opens with a null check, so a section that hasn't been
   ported yet simply means that module no-ops.

   NOTHING HERE IS LOAD-BEARING FOR THE SALE. Layout, price, hero content
   and the mobile button order are all CSS. If this file never loads, the
   page still sells.
   ========================================================================== */
(function (w, d) {
  'use strict';

  if (w.__AOL_LP__) { return; }
  w.__AOL_LP__ = { v: '1.0.0' };

  var H = d.documentElement;
  var RM = w.matchMedia && w.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Marks JS as present. Everything that HIDES something is gated behind
     this class, so a blocked or failed script can never blank the page. */
  H.className += ' aol-js';

  function qsa(sel, root) { return [].slice.call((root || d).querySelectorAll(sel)); }
  function qs(sel, root) { return (root || d).querySelector(sel); }

  function once(el) {
    if (!el || el.getAttribute('data-aol-init')) { return false; }
    el.setAttribute('data-aol-init', '1');
    return true;
  }

  function ready(fn) {
    if (d.readyState !== 'loading') { fn(); }
    else { d.addEventListener('DOMContentLoaded', fn); }
  }

  function push(obj) {
    w.dataLayer = w.dataLayer || [];
    try { w.dataLayer.push(obj); } catch (e) {}
  }

  function variant() {
    var el = qs('[data-aol-variant]');
    return (el && el.getAttribute('data-aol-variant')) || 'a';
  }

  /* ---------------------------------------------------------- landmarks
     In Unbounce you cannot wrap <main> around multiple widgets — they are
     siblings on a canvas and the outer DOM belongs to Unbounce. ARIA roles
     on divs are valid landmarks and screen readers treat them identically.
     No-ops locally, where real <main>/<footer> elements exist.

     NOTE: the exact Unbounce container class is unverified. Resolved
     defensively; see UNBOUNCE.md §12.
     ------------------------------------------------------------------- */
  function landmarks() {
    if (qs('main')) { return; }
    var root = qs('.lp-pom-root') || d.body;
    if (root && !root.getAttribute('role')) { root.setAttribute('role', 'main'); }
    var foot = qs('.aol-footer');
    if (foot && !foot.getAttribute('role')) { foot.setAttribute('role', 'contentinfo'); }
  }

  /* --------------------------------------------------------- stickyCta */
  function stickyCta() {
    var bar = qs('[data-aol-sticky]');
    if (!bar || !once(bar)) { return; }

    /* Escape every Unbounce wrapper, and land LAST in the DOM so tab order
       stays sane. */
    if (bar.parentNode !== d.body) { d.body.appendChild(bar); }

    function measure() {
      H.style.setProperty('--aol-sticky-h', bar.offsetHeight + 'px');
    }

    var shown = false;
    function show(v) {
      if (v === shown) { return; }
      shown = v;
      if (v) { bar.className += ' is-visible'; }
      else { bar.className = bar.className.replace(/\s*is-visible/g, ''); }
      measure();
    }

    var header = qs('[data-aol-header-cta]');
    function headerSync(v) {
      if (!header) { return; }
      if (v) { if (header.className.indexOf('is-visible') < 0) { header.className += ' is-visible'; } }
      else { header.className = header.className.replace(/\s*is-visible/g, ''); }
    }

    var after = qs('[data-aol-sticky-show-after]');   /* the hero CTA      */
    var hideAt = qs('[data-aol-sticky-hide-at]');     /* the closing CTA   */

    var pastHero = false, atClose = false;
    function apply() { show(pastHero && !atClose); headerSync(pastHero && !atClose); }

    if (w.IntersectionObserver && after) {
      new w.IntersectionObserver(function (es) {
        pastHero = !es[0].isIntersecting; apply();
      }, { rootMargin: '0px' }).observe(after);

      if (hideAt) {
        new w.IntersectionObserver(function (es) {
          atClose = es[0].isIntersecting; apply();
        }, { rootMargin: '0px 0px -25% 0px' }).observe(hideAt);
      }
    } else {
      /* Fallback: rAF-throttled scroll, pixel threshold. */
      var ticking = false;
      w.addEventListener('scroll', function () {
        if (ticking) { return; }
        ticking = true;
        w.requestAnimationFrame(function () {
          pastHero = w.pageYOffset > 700;
          if (hideAt) {
            var r = hideAt.getBoundingClientRect();
            atClose = r.top < w.innerHeight * 0.75;
          }
          apply();
          ticking = false;
        });
      }, false);
    }

    measure();
    var rt;
    w.addEventListener('resize', function () {
      if (rt) { w.cancelAnimationFrame(rt); }
      rt = w.requestAnimationFrame(measure);
    }, false);
  }

  /* ----------------------------------------------------------- anchors
     Smooth scroll itself is CSS. JS adds two things:
       1. Focus management — without it a keyboard user's focus stays on the
          link and the next Tab goes nowhere useful.
       2. THE PORTABILITY TRICK — resolve data-aol-anchor BEFORE id. After
          the port Unbounce owns the element ids, but data-aol-anchor lives
          in our markup and travels into the widget, so every in-page anchor
          keeps working with zero edits.
     ------------------------------------------------------------------- */
  function anchors() {
    d.addEventListener('click', function (e) {
      var a = e.target;
      while (a && a !== d && a.tagName !== 'A') { a = a.parentNode; }
      if (!a || a === d) { return; }

      var href = a.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href === '#') { return; }

      var key = href.slice(1);
      var t = d.querySelector('[data-aol-anchor="' + key + '"]') || d.getElementById(key);
      if (!t) { return; }

      e.preventDefault();
      try { t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); }
      catch (err) { t.scrollIntoView(); }

      if (!t.getAttribute('tabindex')) { t.setAttribute('tabindex', '-1'); }
      try { t.focus({ preventScroll: true }); } catch (err) { t.focus(); }

      /* Scrolling to the guide should land the cursor in the field. */
      var field = t.querySelector('input[type="email"]');
      if (field) { w.setTimeout(function () { try { field.focus(); } catch (er) {} }, RM ? 0 : 420); }
    }, false);
  }

  /* ------------------------------------------------------------ reveal
     Bails out entirely under reduced motion — it does not even add the
     hiding class. Belt and braces with the CSS media query.
     ------------------------------------------------------------------- */
  function reveal() {
    var els = qsa('[data-aol-reveal]');
    if (!els.length) { return; }

    if (RM || !w.IntersectionObserver) {
      for (var i = 0; i < els.length; i++) { els[i].className += ' is-in'; }
      return;
    }
    var io = new w.IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          entries[j].target.className += ' is-in';
          io.unobserve(entries[j].target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (var k = 0; k < els.length; k++) { io.observe(els[k]); }
  }

  /* --------------------------------------------------------- utmFields
     Load-bearing for attribution. Without it the A/B variant never reaches
     HubSpot and you can only measure form fills, not downstream revenue.
     Runs against any form on the page, including the Unbounce Form widget.
     ------------------------------------------------------------------- */
  function utmFields() {
    var q = {};
    var s = w.location.search.replace(/^\?/, '');
    if (s) {
      var parts = s.split('&');
      for (var i = 0; i < parts.length; i++) {
        var kv = parts[i].split('=');
        if (kv[0]) { q[decodeURIComponent(kv[0])] = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); }
      }
    }
    q.aol_variant = variant();

    var names = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'aol_variant'];
    for (var n = 0; n < names.length; n++) {
      var val = q[names[n]];
      if (!val) { continue; }
      var inputs = qsa('input[name="' + names[n] + '"]');
      for (var m = 0; m < inputs.length; m++) { inputs[m].value = val; }
    }
  }

  /* ------------------------------------------------------ ctaTelemetry */
  function ctaTelemetry() {
    d.addEventListener('click', function (e) {
      var el = e.target;
      while (el && el !== d && !el.getAttribute) { el = el.parentNode; }
      while (el && el !== d && !el.getAttribute('data-aol-cta')) { el = el.parentNode; }
      if (!el || el === d) { return; }
      push({ event: 'aol_cta', cta: el.getAttribute('data-aol-cta'), aol_variant: variant() });
    }, false);
  }

  /* ------------------------------------------------------ faqTelemetry
     The FAQ itself is native <details>/<summary> — no JS needed. Which
     questions people open is genuinely useful for the next round of copy.
     ------------------------------------------------------------------- */
  function faqTelemetry() {
    var items = qsa('[data-aol-faq]');
    for (var i = 0; i < items.length; i++) {
      (function (el) {
        if (!once(el)) { return; }
        el.addEventListener('toggle', function () {
          if (el.open) { push({ event: 'aol_faq_open', question: el.getAttribute('data-aol-faq') }); }
        }, false);
      })(items[i]);
    }
  }

  /* ---------------------------------------------------- placeholderForm
     The local stand-in only. It never submits anywhere — it shows the
     success state in place so copy can be reviewed before the Unbounce
     Form widget replaces it. Deleted during the port.
     ------------------------------------------------------------------- */
  function placeholderForm() {
    var f = qs('[data-aol-placeholder-form]');
    if (!f || !once(f)) { return; }
    var done = qs('[data-aol-form-done]');
    var err = qs('#aol-lead-err');
    var email = qs('#aol-lead-email');

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = email && email.value && /.+@.+\..+/.test(email.value);
      if (err) { err.hidden = !!ok; }
      if (email) { email.setAttribute('aria-invalid', ok ? 'false' : 'true'); }
      if (!ok) { if (email) { email.focus(); } return; }
      f.hidden = true;
      if (done) { done.hidden = false; }
      push({ event: 'aol_lead', form: 'placeholder', aol_variant: variant() });
    }, false);
  }

  /* -------------------------------------------------------- soloPreview
     ?aol-solo=problem hides every section but that one, so you can verify
     a section renders correctly IN ISOLATION — exactly as it will sit
     inside its own Unbounce widget. The cheapest possible pre-port QA.
     ?aol-draft=1 reveals the magenta outlines around unverified copy.
     ------------------------------------------------------------------- */
  function devFlags() {
    var q = w.location.search;
    /* Placeholder outlines are opt-in: ?aol-draft=1 reveals them. */
    if (/[?&]aol-draft=1/.test(q)) { H.className += ' aol-draft'; }

    var m = q.match(/[?&]aol-solo=([a-z0-9-]+)/i);
    if (!m) { return; }
    var keep = m[1];
    var secs = qsa('.aol-section');
    for (var i = 0; i < secs.length; i++) {
      if (secs[i].getAttribute('data-aol-anchor') !== keep) { secs[i].hidden = true; }
    }
    var bar = qs('[data-aol-sticky]');
    if (bar) { bar.hidden = true; }
  }

  var modules = [devFlags, landmarks, stickyCta, anchors, reveal, utmFields,
                 ctaTelemetry, faqTelemetry, placeholderForm];

  ready(function () {
    for (var i = 0; i < modules.length; i++) {
      try { modules[i](); }
      catch (e) { if (w.console && w.console.warn) { w.console.warn('[aol]', modules[i].name, e); } }
    }
  });

})(window, document);
