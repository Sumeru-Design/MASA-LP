# Porting this page into Unbounce

Roughly 30–45 minutes. Everything is designed so the port is mechanical: copy blocks, paste
stylesheet, paste script, swap one form.

Every gotcha below is tagged **[VERIFIED]**, **[DESIGNED]** (handled in the code already) or
**[UNVERIFIED]** (an assumption about Unbounce's behaviour that §2 resolves in 15 minutes).

> **`AGENTS.md` in the repo root does not apply to this folder.** It mandates the Astryx design
> system for the sibling `audit/` app. Astryx components and tokens cannot survive this port.
> This page is deliberately plain HTML/CSS/JS with no build step. Do not "helpfully" Astryx-ify it.

---

## 1. Before you start

- An Unbounce page, and access to the **Stylesheet** panel and **Script Manager**.
- **Duplicate the live page first.** That duplicate is the rollback.
- Decide where images are hosted (Unbounce's own image hosting is fine).
- Confirm how this account connects to HubSpot — Unbounce's native integration, or a HubSpot
  forms embed. The two map fields differently. **[UNVERIFIED — check the account]**

---

## 2. Pre-flight canary — do this FIRST

Its answers can change steps 5, 7 and 8. Fifteen minutes here saves hours later.

Build a throwaway page with **one** Custom HTML widget containing:

```html
<div id="canary" style="font:12px monospace;white-space:pre"></div>
<details><summary>details test</summary>ok</details>
<script>window.__canaryRan = true;</script>
<script>
var w = document.getElementById('canary'), a = [], el = w.parentNode, t = [];
while (el && el !== document.documentElement) {
  var s = getComputedStyle(el);
  if (s.transform && s.transform !== 'none') t.push(el.className + ':' + s.transform);
  el = el.parentNode;
}
a.push('innerWidth              ' + window.innerWidth);
a.push('clientWidth             ' + document.documentElement.clientWidth);
a.push('viewport meta           ' + ((document.querySelector('meta[name=viewport]')||{}).content || 'NONE'));
a.push('widget computed width   ' + getComputedStyle(w.parentNode).width);
a.push('ancestor transforms     ' + (t.join(' | ') || 'none'));
a.push('body transform          ' + getComputedStyle(document.body).transform);
a.push('matchMedia(min-width:48em) ' + matchMedia('(min-width:48em)').matches);
a.push('inline <script> ran     ' + (window.__canaryRan === true));
a.push('<details> survived      ' + !!document.querySelector('details'));
a.push('lp-pom-root present     ' + !!document.querySelector('.lp-pom-root'));
w.textContent = a.join('\n');
</script>
```

Publish it (**not** the builder preview) and open it on a real phone and a desktop. Record the
answers in §12. Specifically you are learning:

1. Does Unbounce set a fixed-width viewport meta, or apply a `transform: scale()` to fit the 320px
   mobile canvas? If `body` itself is transformed, `position: fixed` resolves against that transform
   and the sticky bar needs rework.
2. Do media queries see the real viewport width? Everything in `03-sections.css` assumes yes.
3. Does an inline `<script>` inside a widget execute? If not, the FAQ JSON-LD (if you add it) must
   go in the page's Javascript panel instead.
4. Does content taller than the widget's builder height clip, or overflow visibly?

---

## 3. Assets

Upload everything in `assets/img/` (10 files — see `IMAGES.md` for the manifest).

Then find-and-replace the prefix `assets/img/` with the Unbounce CDN base in every block you paste.
Afterwards, search the published page source for `assets/img/` — **zero results expected.**

---

## 4. Page settings

| Setting | Value |
|---|---|
| Title | `Sleep & Anxiety Protocol \| The Art of Living` |
| Meta description | `Live online sessions with a certified instructor and a small group. Breathing, movement and guided meditation, from your own home. $149.` |
| Robots | `noindex, nofollow` for the paid page. Remove it if this becomes the organic entry. |
| `html lang` | `en` — set it in the SEO panel if available; otherwise add `document.documentElement.lang='en'` to a head-placement script. **[UNVERIFIED]** |
| OG image | `hero-morning-window-1400x1500.jpg`, width `1400`, height `1500` |

Do **not** repeat the old page's mistakes here: `og:title` was declared twice, `og:url` on the organic
page pointed at the paid page, and `og:image:width` was literally set to
`"1200 (add the width dimension of your image here)"`.

---

## 5. Stylesheet panel

Paste all three files into the single Stylesheet panel, **in this order**:

1. `assets/css/01-tokens.css`
2. `assets/css/02-base.css`
3. `assets/css/03-sections.css`

No `<style>` tags. Keep the comments — they are the section map and the contrast record.

The Unbounce form skin is already at the bottom of file 3, so the form in §8 needs **no CSS work at
all**: paste the stylesheet you were going to paste anyway and the Unbounce form already matches.

---

## 6. Section map

Each region is delimited in `index.html` by `<!-- #region unbounce:NN-name -->` … `<!-- #endregion -->`.
Copy between the markers. Nothing should need stripping — if it does, fix `index.html`, not the paste.

Set each **Unbounce Section's own background** to the colour named in the region comment, and leave
the Custom HTML widget transparent. Backgrounds are owned by the section, not the widget, because a
widget-painted background will not span the viewport.

| # | Region | Section background | Notes |
|---|---|---|---|
| 00 | `00-header` | transparent | Logo + one CTA. No mega-nav. |
| 01 | `01-hero` | `--aol-grad-wash` | The only `<h1>`. Price above the fold by design; the stats row below it also clears the fold at 1440×900. |
| 02 | `02-proof` | `--aol-surface` | One stats row, rendered once. |
| 03 | `03-problem` | `--aol-surface-cream` | "Everything you give comes from somewhere." |
| 04 | `04-protocol` | `--aol-surface` | Inset image overhangs — give the widget headroom. |
| 05 | `05-evidence` | `--aol-surface-blush` | No photograph, deliberately. |
| 06 | `06-guide` | `--aol-surface` | **Contains the form slot — see §8.** |
| 09 | `09-gurudev` | `--aol-surface` | Portrait + quote. Numbering keeps the original gaps so region names stay stable. |
| 10 | `10-enroll` | `--aol-grad-wash-up` | |
| 11 | `11-faq` | `--aol-surface` | Native `<details>`. Its CTA carries `data-aol-sticky-hide-at` — it is the last CTA on the page. |
| 13 | `13-footer` | `--aol-surface` | 11 links maximum. |
| — | `sticky` | — | **Not a section.** Paste once, anywhere; `aol.js` moves it to `<body>`. |

Regions `07-voices`, `08-complete` and `12-close` were cut. Their numbers are deliberately **not**
reused, so a region name always means the same block.

---

## 7. Script Manager

One script, named `aol.js`, contents of `assets/js/aol.js`.

- Placement: **Before Body End Tag**
- Audience: All visitors
- Scope: This page only

Whether the panel wants the `<script>` tags or supplies them: check the field's own hint. **[UNVERIFIED]**

The script is safe to inject twice (global re-entry guard), safe to run early (`ready()` wrapper), and
each module is individually `try/catch`'d, so one failure cannot take down the rest.

---

## 8. The form swap

**The constraint:** Unbounce Classic widgets are siblings on a positioned canvas, **not nestable**.
So you almost certainly cannot drop a Form widget *inside* the Custom HTML widget's DOM. The design
accounts for that — the form slot is a reserved, correctly-sized hole, not a parent. **[UNVERIFIED —
resolved by §2]**

1. **Locally first:** delete everything between `<!-- BEGIN PLACEHOLDER -->` and
   `<!-- END PLACEHOLDER -->`, reload, and confirm the reserved box is the right size and nothing
   below it shifts. Then undo.
2. In Unbounce, create the §06 widget from the region, **deleting the placeholder form but keeping
   the `.aol-formslot` wrapper div.** Its `min-height` is what reserves the space.
3. Add an Unbounce **Form widget**; position it over the reserved box.
4. Fields: **Email** (required) and **First name** (optional). Nothing else — this is a low-friction
   capture, not a qualification form.
5. Add five hidden fields, named exactly: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
   `aol_variant`. `aol.js` populates them. Without `aol_variant` you can measure form fills but not
   which A/B variant produced the revenue.
6. Confirmation: **same-page message** preferred — it keeps them on the page where they can still buy.
7. Connect HubSpot and map fields. Names must match HubSpot's **internal** property names
   (`email`, `firstname`). **[UNVERIFIED — depends on the integration in use]**
8. Submit a real test lead. Confirm it lands in **both** Unbounce Leads **and** HubSpot, with
   `aol_variant` populated.

Check afterwards: field height ≥ 48px, visible focus ring, and the submit button is white on
Royal Purple — **not** white on orange.

*Rejected: a hand-rolled modal.* Focus trapping, scroll locking, `inert` and Escape handling all
fight the Unbounce canvas. An inline section plus a sticky-bar anchor does the same job with none
of the risk.

---

## 9. Fonts

Poppins and Lora, both on Google Fonts, both confirmed available.

- **Preferred:** Unbounce's built-in Google Font picker — it handles loading and `font-display`.
- Alternative: `@import` as the very **first** rule in the Stylesheet panel. If it is not first it
  is dropped per CSS spec, and whether Unbounce preserves `@import` at all is **[UNVERIFIED]**.
- Either way the full fallback stacks in `--aol-font-ui` / `--aol-font-display` stay as they are.

Madelyn, the brand's accent script, is Canva-only and cannot be webfont-loaded. It is not used here.
If a Gurudev signature is ever needed, ship it as an SVG.

---

## 10. The 320px mobile canvas

Unbounce Classic reports a 320px mobile design canvas, scaled up to the real device width.

This is why the CSS uses **media queries, not container queries**: a container query would key off
the widget wrapper's computed width (~320px on the canvas regardless of the real phone) and would
give the narrowest possible layout on every device.

The responsive load is carried mostly by intrinsic CSS that needs no query at all —
`repeat(auto-fit, minmax(16rem, 1fr))`, `clamp()` and `flex-wrap`. There are only a handful of media
queries in the whole stylesheet, at two breakpoints.

**Verified at 320×568: zero horizontally overflowing elements, zero tap targets under 24px.**
If it survives 320, it survives the port.

---

## 11. Palette discrepancy — resolve before launch

The brand guide states each core colour **twice, with different values** — once in the prose table,
once in the tint ramps and the Appendix B token block:

| Colour | Prose table | Appendix B (**used here**) |
|---|---|---|
| Coral Bliss | `#fe855c` | `#f5865f` |
| Royal Purple | `#8147af` | `#7e4d9f` |
| Delightful Tangerine | `#fe9e1a` | `#f99d22` |
| Golden Yellow | `#ffc545` | `#fec845` |

This page uses the **Appendix B machine-readable values** throughout, because that block is the one
written for programmatic use. The difference is small and does not change any accessibility result —
both purples pass (6.08:1 vs 6.09:1 with a white label). Worth settling at source anyway.

---

## 12. Gotchas register

| Gotcha | Status |
|---|---|
| Widget wrapper may clip content taller than its box | **[UNVERIFIED]** — §2 canary |
| `position: sticky` fails inside positioned wrappers → bar is `fixed` + relocated to `<body>` | **[DESIGNED]** |
| Do **not** use `@layer` — unlayered Unbounce CSS would outrank it | **[VERIFIED]** — CSS spec |
| Never add `<style>` or `style=` inside a widget | **[POLICY]** — page ships 0 of each |
| Script may execute twice (variants, preview) → global re-entry guard | **[DESIGNED]** |
| Anchor `id`s belong to Unbounce → JS resolves `data-aol-anchor` first | **[DESIGNED]** |
| Landmarks cannot span sibling widgets → `role="main"` shim, no-ops locally | **[DESIGNED]** |
| Widgets are siblings, not nestable → the form-slot contract | **[UNVERIFIED]** — §2 canary |
| `.lp-pom-root` may not be the right container for the landmark shim | **[UNVERIFIED]** — resolved defensively (`|| document.body`) |
| The hero reel is a pure-CSS crossfade — it ports with the stylesheet, needs no JS, and animates only `opacity` | **[DESIGNED]** |
| **Never put `overflow-x: hidden` on `body`** — it makes body a scroll container, pins `window.scrollY` at 0 and silently kills every scroll-linked behaviour | **[VERIFIED]** — hit during build; see §13 |
| Builder preview ≠ published page. Always verify on the live URL. | **[VERIFIED]** |

---

## 13. Acceptance checklist

Run at **1440×900**, **390×844** and **320×568** on the *published* page. Each line maps to a finding
on the old pages. Measured results from the local build are in the right column.

```js
// exactly one H1                                     was: 0
document.querySelectorAll('h1').length

// lang attribute                                     was: empty
document.documentElement.lang

// landmarks                                          was: none
['main','header','footer','nav'].filter(t=>document.querySelector(t))

// links with no accessible name                      was: 44
[...document.querySelectorAll('a')].filter(a=>!((a.textContent||'').trim()
  || a.getAttribute('aria-label'))).length

// images with no alt                                 was: 47 of 49
[...document.images].filter(i=>!i.hasAttribute('alt')).length

// tap targets under 24px                             was: 45
[...document.querySelectorAll('a,button,summary,input,select')]
  .map(e=>e.getBoundingClientRect())
  .filter(r=>r.width&&(r.height<24||r.width<24)).length

// horizontal overflow — measure RECTS, not scrollWidth.
// scrollWidth lies whenever an ancestor clips.
(()=>{const vw=document.documentElement.clientWidth;
 return [...document.querySelectorAll('.aol-section *,.aol-sticky *,.aol-header *')]
  .map(e=>e.getBoundingClientRect())
  .filter(r=>r.width>0&&(r.right>vw+1||r.left<-1)).length})()

// authored inline styles                             was: 462
[...document.querySelectorAll('[style]')].map(e=>e.tagName)   // expect ['HTML'] only

// DOM nodes                                          was: 1307
document.getElementsByTagName('*').length
```

| Check | Old page | This build | Target |
|---|---|---|---|
| `<h1>` count | 0 | **1** | 1 |
| Heading level skips | n/a | **none** | none |
| `html lang` | empty | **en** | en |
| Landmarks | none | **main, header, footer, nav** | all |
| Links with no accessible name | 44 | **0** | 0 |
| Images with no alt | 47 of 49 | **0 of 11** | 0 |
| Tap targets under 24px | 45 | **0** | 0 |
| Horizontally overflowing elements | — | **0** at 1440 / 390 / 320 | 0 |
| Authored inline `style=` attributes | 462 | **0** | 0 |
| `<style>` tags | — | **0** | 0 |
| DOM nodes | 1307 | **292** | < 600 |
| Primary CTA contrast | **2.55:1** | **6.09:1** | ≥ 4.5:1 |
| Lowest text contrast anywhere | 1.67:1 | **5.12:1** | ≥ 4.5:1 |
| Longest stretch with no CTA (desktop) | 2,334px | **1,522px** | minimise |
| Page height (desktop) | 9,745px | **7,548px** | — |

Also confirm by hand:

- **Keyboard only.** Tab through the page. Visible focus ring everywhere; the sticky bar is reachable
  and last in tab order; the FAQ opens with Enter/Space; anchor jumps land focus on the target.
- **Reduced motion.** Emulate `prefers-reduced-motion: reduce` — nothing animates, reveal elements
  are visible immediately, and the hero reel holds on frame one instead of cycling. It must be
  *off*, not slowed.
- **Script blocked.** Disable JavaScript. The page must still render complete and still sell:
  every element is visible by default and the sticky bar simply does not appear.
- **Sticky bar.** Hidden while the hero CTA is on screen; visible through the body of the page;
  **hidden again once the closing CTA comes into view**, so it never covers the real button.
- `?aol-solo=<region>` on all 10 regions — each must render correctly alone, which is exactly how
  it will sit inside its own widget.

---

## 14. Variant register — the A/B test

The current live test varies headline, hero image, page title, page weight (+38%), image count
(+62%), heading structure **and** CTA labels simultaneously, at an uneven 32:16 split. Whichever
variant won, it told you nothing about why.

**Vary exactly one thing: the `<h1>` string.**

| Variant | `#aol-hero-title` | Everything else identical? |
|---|---|---|
| A | Sleep Through the Night. Wake With the Sun. | ☐ |
| B | Stop Waking Up at 3 AM | ☐ |

**If a box cannot be ticked, the test does not launch.**

Held constant and checked explicitly: `<title>`, meta description, hero image, section order and
count, image count, heading structure, CTA labels, price display, form. `<title>` is the tempting
second variable — it is what went wrong last time. Use one neutral title covering both.

- Set weights to **50/50 explicitly.** Do not inherit `routingStrategy: "weighted"`.
- Hardcode `data-aol-variant="a"` / `"b"` on the hero section in each variant. `aol.js` copies it
  into the form's `aol_variant` hidden field, so HubSpot can attribute downstream revenue.
- Both variants stay `noindex, nofollow`.
- No second concurrent test on the same traffic.

**Declared before launch, not after:**

- **One** primary metric: checkout click (`data-aol-cta="…-primary"`). Form submit is explicitly
  secondary. Two co-primary metrics is how you talk yourself into a false winner.
- **Minimum sample: ~12,000–14,000 visitors per variant** (≈2% baseline, +25% relative lift,
  80% power, 95% confidence). Write the number down. The original test's whole sample was
  48 requests — somebody will otherwise call this after a day.
- **Minimum runtime: two whole weeks.** Day-of-week effects are strong for a sleep product.
- No mid-flight peeking. No winner before both the sample floor and ≥95% confidence are met.

---

## 15. `!important` register

Every use, with its reason. Keep this honest — an unexplained `!important` is how a stylesheet
starts to rot.

| Selector | Reason | Date |
|---|---|---|
| `.aol-vh` (`position`) | Standard visually-hidden utility; must not be overridable. | 2026-09-16 |
| `@media (prefers-reduced-motion)` block | A user's motion preference must beat author CSS. This is the one place `!important` is unambiguously correct. | 2026-09-16 |
| Section margin overrides (`.aol-hero__title`, `.aol-problem__p`, et al.) | The `:where()` margin reset in `02-base.css` is deliberately zero-specificity so Unbounce can override it; these block-level rules sit at the same specificity as each other and need to win. Cheaper than raising the reset's specificity for the whole page. | 2026-09-16 |

---

## 16. Rollback

Duplicate the page before editing. Unbounce also keeps page version history. If anything goes wrong
after publish, revert to the duplicate — do not debug on live traffic.
