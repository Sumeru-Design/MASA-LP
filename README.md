# Sleep & Anxiety Protocol — landing page

One landing page for the Art of Living's $149 Sleep & Anxiety Protocol, built on the brand
(Style Guide, May 2026), optimised for conversion, and portable to Unbounce.

It replaces two live pages that contradicted each other. See `../audit/` for the audit this
was built against — `audit/src/data.ts` holds the findings, and every one of them is closed here.

```bash
cd "/Users/Nishant/Documents/Claude Code/AOL/landing" && python3 -m http.server 4173
```

Then open <http://localhost:4173>. No build step, no npm, no framework — that is deliberate.

Dev flags: `?aol-solo=<region>` renders one section alone (exactly how it will sit in its own
Unbounce widget). `?aol-draft=1` reveals the magenta outlines around unverified copy —
they are hidden by default so a shared link never shows them.

---

## Files

```
index.html                 The whole page. Region-marked for per-widget extraction.
assets/css/01-tokens.css   Brand tokens. :root only. Paste FIRST.
assets/css/02-base.css     Scoped reset, six-step type scale, buttons, inheritance firewall.
assets/css/03-sections.css Section blocks, then the Unbounce form skin. Paste LAST.
assets/js/aol.js           One idempotent IIFE. Sticky bar, anchors, reveals, UTM, telemetry.
assets/img/                10 files. Manifest and licence in IMAGES.md.
IMAGES.md                  Every image: source, dimensions, alt text, and what to replace.
UNBOUNCE.md                Port guide, gotchas, acceptance checklist, variant register.
```

**Not Astryx.** The root `AGENTS.md` mandates the Astryx design system — that guidance is scoped
to the sibling `audit/` React app. Astryx components and tokens cannot survive the port into an
Unbounce Custom HTML widget. Please don't convert this.

---

## The idea

The brief asked for conversion-optimised and premium. The brand guide forbids the standard CRO
levers — *"guilt, fear, or salesy urgency"*, naming "Don't miss out" and "You need this now" as
bad examples. And the product is sleep, which invites dark bedroom photography, which the guide
also forbids.

**Both resolve the same way: the payoff of fixing sleep is the morning.**

3 a.m. is not really about the hours lost — it is about the day you cannot face afterwards. So the
product is *you get your mornings back*. That makes sunrise, the brand's visual north star, the
literal product promise rather than decoration. Every photograph is legitimately bright, and there
is no bedroom imagery anywhere on the page.

Premium and conversion then come from specificity, evidence and generosity — not pressure.

---

## What the course actually is

Worth stating plainly, because an earlier draft of this page got it wrong:

- **Live and online.** Participants join a certified instructor and a small group from home, at a
  set time. Not a video course, and not an in-person class — so no copy anywhere says "near you",
  "in your city" or "walk into".
- **Breathing exercises, some gentle movement, and a guided meditation.** That is the method.
- **It does NOT teach SKY Breath Meditation.** See the warning below.
- Most participants report better sleep after the very first session — the strongest line on the
  page, and flagged as a placeholder until someone can substantiate it.

### ⚠️ Do not cite SKY research here

An earlier version of the evidence section claimed *"SKY Breath Meditation has been studied in more
than 150 independent, peer-reviewed papers."* That claim is now removed, and there is a warning
comment above the section in `index.html` saying why.

The 150+ figure is real, and it is the Art of Living's own — but it belongs to **SKY**, and this
course does not teach SKY. Citing a technique's research base for a product that does not contain
that technique is precisely the failure the section's own "Where the research stops" paragraph
exists to prevent. It would also be an implied clinical claim on a health-adjacent page with Meta
pixels on it.

The section now points at the practices the course *does* use, with three `[CONFIRM]` slots. If the
Art of Living holds research on the Sleep & Anxiety Protocol itself, that is what goes there.

## The one rule that governs the page

The old CTA was white on `#FF7E00` — **2.55:1**, below even the 3:1 large-text floor, on every
button on both pages. The fix needed no new colour:

> **Royal Purple `#7e4d9f` is the only brand colour that carries a white label.** 6.09:1, passes AA.
>
> **The warm colours — coral, tangerine, golden — are fills and gradients only.** Never text on
> white, never under a white label. When a warm fill carries text, the text is ink `#2a1b35`.

| | Ratio | |
|---|---|---|
| White on Royal Purple | **6.09:1** | ✅ the primary CTA |
| Ink on Golden / Tangerine / Coral | 10.38 / 7.56 / 6.47 | ✅ |
| White on Coral / Tangerine / Golden | 2.48 / 2.13 / 1.55 | ❌ never do this |
| Tangerine on white | 2.13:1 | ❌ never do this |

Lowest text contrast anywhere on the finished page: **5.12:1**.

---

## Conversion architecture

Primary path: **`Start the Protocol`**, used identically 5 times plus the sticky bar, always as a
block — price above, button, then `Checkout opens on members.us.artofliving.org` beneath. An
unannounced jump to another domain is a top abandonment cause; naming it costs nothing.

Secondary path: **`Get the 3 AM Guide`** — deliberately a different *shape* of promise (a noun you
receive, not an action you begin), rendered as a link, never a second button.

Ten CTA labels on the old pages became two.

**The lead magnet** is one page and one six-minute audio you can do lying down, in the dark, without
getting out of bed. It is useful at 3 a.m. tonight, before anyone buys anything. Generosity is the
premium lever the brand permits; pressure is the one it forbids.

One inline capture section plus a persistent link in the sticky bar, **zero interstitials**.
No exit-intent modal — an exit-intent modal *is* "don't miss out" rendered as a UI component.

**Replacing "Limited Time Offer".** The old claim had no date, no countdown and no seat count. An
urgency claim that never resolves trains people to ignore every future claim you make. §10 carries
a real cohort date pulled from the scheduling system, *plus the next one* — real scarcity that
offers an alternative is information; scarcity that doesn't is a tactic. If sessions aren't
scheduled, delete the block. Do not keep a deadline that isn't one.

---

## Honest proof

**Statistics** use the organic set (43 years, 10,000+ centres, 182 countries, 800M+ lives), rendered
**once** — the old organic page printed the same four numbers twice. Worth escalating: 10,000 vs
3,000 centres is a 3.3× gap between the two live pages. Someone is counting something different,
and it should be settled at source, not per page.

**The five-star graphic is gone.** A decorative PNG with no rating value and no review count is the
weakest social proof available, and on a health-adjacent page it invites exactly the scrutiny you
don't want. Bring it back only as a real rating with its denominator.

**The 150+ studies are fenced.** Three named papers, then this, in body type rather than small grey
type: *these studies examine the breathing technique, not this course, and are not a promise about
your sleep.* Everyone selling wellness claims research; almost nobody says where it stops. That
sentence is the most premium thing on the page, and it keeps the ad account clear of Meta's
health-attribution policy.

### Testimonials — cut, on purpose

The old page carried a "Daniel K" testimonial that failed four ways at once: a product name that
didn't exist, two incompatible stories under one name across the two pages, a stock portrait, and
no date.

The section is **gone** rather than fixed. Testimonials are among the least persuasive things on a
health-adjacent page — a reader who is weighing $149 discounts anonymous quotes almost instantly,
and every one of them costs scroll. The research section does the same job with citable sources.

If they ever come back, they come back with a schema, not better copywriting:

```
first_name, last_initial     course_taken        ← validate against the live catalogue
city_state                   course_date            at build time, so "Sleep & Calm Reset"
quote        ≤ 45 words      quote_consent_date     can never be published again
photo_path   real or null    photo_consent_date  ← required if photo_path is set
verified_by
```

Hard rule: nothing renders without `quote_consent_date`, and a stock photograph may never stand in
for a named real person.

## Placeholders — 10 of them

Anything unverified is marked `data-aol-placeholder`. Add **`?aol-draft=1`** to outline them in
dashed magenta; they are hidden by default, so a link you share never shows boxes around real copy.

The release gate is the grep below, **not** the outline — hiding the marker changes nothing about
what ships.

```bash
# 10 unverified content markers, plus the local placeholder form that the
# Unbounce Form widget replaces. Both must reach zero before launch.
grep -c 'data-aol-placeholder[ >]'     index.html   # expect 0
grep -c 'data-aol-placeholder-form'    index.html   # expect 0 after the form swap
grep -c 'CONFIRM'                      index.html   # expect 0
```

Make that grep a release gate. Every other safeguard depends on somebody remembering.

`[CONFIRM]` markers in the copy and in HTML comments flag the same thing inline: session count and
length, refund terms, HSA/FSA documentation, contraindications, founding year, the three named
studies, the cohort dates, and the 501(c)(3) line.

**The `$449` anchor price needs a decision.** It appears consistently on both live pages, so it isn't
newly introduced here — but if the course never actually transacts at $449, a permanent strikethrough
is a fictitious-pricing problem under FTC guidance (16 CFR 233), the same class of failure as the
deadline-less "Limited Time Offer". It is also anti-premium: a permanent 67% off teaches people the
$149 isn't real either. FAQ question 9 asks it directly, which forces the organisation to have an
answer. If there isn't one, delete the `$449` and delete the question.

---

## Portability rules (why the code looks like this)

1. **Every section is a self-contained subtree.** `.aol-shell` repeats in each one rather than being
   a page-level wrapper — in Unbounce the sections land in different widgets with no shared ancestor.
2. **No selector crosses a section boundary.** No sibling combinators between sections, no
   `:nth-child` on sections.
3. **`aol-` on every class.** Unbounce's own are `lp-pom-*`. And **no bare element selectors**
   (`h2 {}`, `p {}`) — those would style Unbounce's own widgets elsewhere on the canvas.
4. **Classes for CSS, `data-aol-*` for JS.** A marketer restyling in Unbounce can't break the JS;
   a developer refactoring CSS can't either.
5. **The inheritance firewall.** `.aol-section` (and the header and sticky bar) re-declare
   `font-family`, `size`, `weight`, `line-height`, `letter-spacing`, `text-align`, `text-transform`,
   `color` and `box-sizing`, so everything inside inherits from a known baseline whatever the widget
   wrapper does. This is what lets the whole page ship with zero `!important` in the layout.
6. **No `@layer`.** Cascade layers rank *below* unlayered styles, so a layered rule would lose to
   Unbounce's own CSS. Wrong direction entirely.
7. **The sticky bar is `position: fixed`, not `sticky`,** and `aol.js` moves it to `<body>` — sticky
   fails inside positioned/transformed/clipped ancestors, all plausible on the Unbounce canvas.
8. **Anchors resolve `data-aol-anchor` before `id`.** Unbounce owns the ids after the port; that
   attribute travels with the markup, so every in-page link keeps working with zero edits.

---

## Two bugs worth remembering

**Never put `overflow-x: hidden` on `body`.** It makes body a scroll container, which pins
`window.scrollY` at 0 and silently kills every scroll-linked behaviour — the sticky bar's
IntersectionObserver sentinels stopped firing entirely. It also *hides* real overflow instead of
surfacing it: the `<h1>` was overflowing at 390px and nothing reported it. Horizontal overflow is
verified by measuring element rects against the viewport instead — `scrollWidth` lies whenever an
ancestor clips.

**Don't name a utility class after an element you also style.** `<body class="aol-body">` collided
with the `.aol-body` type utility (`max-width: 62ch`), capping the entire page at 623px. The body
element class is now `aol-page`.

---

## Results against the audit

| | Old pages | This build |
|---|---|---|
| `<h1>` | 0 | 1 |
| `html lang` | empty | `en` |
| Landmarks | none | main, header, footer, nav |
| Links with no accessible name | 44 | 0 |
| Images with no alt | 47 of 49 | 0 of 11 |
| Tap targets under 24px | 45 | 0 |
| Inline `style=` attributes | 462 | 0 authored |
| DOM nodes | 1,307 | 292 |
| Primary CTA contrast | 2.55:1 | 6.09:1 |
| Lowest text contrast | 1.67:1 | 5.12:1 |
| Forms | 0 | 1 + sticky path |
| CTA labels | 10 | 2 |
| Page height (desktop) | 9,745px | 7,548px |
| Longest stretch with no CTA | 2,334px | 1,522px |
| `prefers-reduced-motion` support | 0 of 29 stylesheets | full |

**Page height is 7,548px on desktop, against the old page's 9,745px** — a 24% shorter scroll.
The first cut got it to 10,400px; a second pass removed the testimonials, "complete experience"
and closing sections, compacted the hero, and dropped the page a further 29%.

At 1440×900 the fold now carries the logo, hook, headline, subhead, price, both CTAs **and** the
full stats row. The hero is 600px, down from 974px.

One honest caveat: the longest stretch without a CTA is 1,522px on desktop but **2,230px on mobile**,
because a single-column stack is simply taller. The sticky bar covers that stretch, so there is never
a moment with nothing to tap — but it is the number to watch if more content is ever added.

## Before launch

1. Clear all 10 placeholders and every `[CONFIRM]`.
2. Decide the `$449` question.
3. Settle the palette hex discrepancy (`UNBOUNCE.md` §11).
4. Replace the four stock stand-ins with real Art of Living photography (`IMAGES.md`).
5. Run the §2 canary in Unbounce before porting — it resolves every `[UNVERIFIED]` item.
6. Work through the acceptance checklist (`UNBOUNCE.md` §13) on the *published* page.
