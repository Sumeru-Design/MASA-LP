# Image manifest

Every file in `assets/img/`, where it came from, where it is used, and its alt text.

**Licence.** All photographs are from Unsplash under the [Unsplash License](https://unsplash.com/license),
which permits commercial use and does **not** require attribution. Attribution is still appreciated —
see "Attribution" below for why no photographer names are recorded here and how to add them.

**Every URL below was verified with an HTTP request before the file was committed** (all returned 200),
and every image was viewed and judged against the brand photography rules before selection.

---

## The brand rules these were selected against

From the Art of Living Visual Style Guide (May 2026), §7 and §8:

- Sunrise / dawn / awakening feeling. **Vast, vibrant, light.**
- Prioritise **smiles and faces**.
- **No** photos of people's backs, or shot from behind.
- **No** dark, moody or low-key imagery.
- **No** cluttered compositions.
- **No** generic stock ("strangers meditating in offices").
- **No** religious iconography — spiritual, not religious.

Two images were rejected during selection and replaced for exactly these reasons:

| Rejected | Why |
|---|---|
| `photo-1511988617509-a57c8a288659` | One subject is turned away from camera — a back, which the guide forbids outright. It also read as friends at sunset rather than people after a session. |
| `photo-1598559069352-3d8437b0d42c` | Blue, cool and misty. Conflicts with the "light" filter and with the warm sunrise palette. |
| `photo-1699099647221-da4afd4d825e` | A dark interior with a blown-out window. Used in §3 until that section was reframed around rest and family; the lower half is low-key, which the guide rules out, and it no longer matched the copy. |

A search for "sunrise bedroom" returns results captioned *grayscale*, *dimly lit*, *dark room* —
i.e. precisely what the brand forbids. **No image was chosen from a caption alone; every candidate
was rendered and looked at.** That is also why there is no bedroom photography anywhere on this page:
the product is the morning, not the night.

---

## Manifest

| File | Dimensions | Used in | Source | Alt text |
|---|---|---|---|---|
| `hero-morning-window-1400x1500.jpg` | 1400×1500 | §1 Hero | Unsplash `photo-1699880744039-946caab62843` | A woman standing at a tall window in morning light, head tipped back, laughing. |
| `rested-parent-900x1125.jpg` | 900×1125 | §3 Why this matters | Unsplash `photo-1590527548172-295fdcb1bab0` | A man holding his baby daughter in warm morning light, both of them smiling. |
| `group-session-1600x900.jpg` | 1600×900 | §4 The protocol | Unsplash `photo-1778694276944-66df489166e6` | A group seated together in a bright, daylit room during a guided session. |
| `practice-face-700x700.jpg` | 700×700 | §4 inset | Unsplash `photo-1626585957649-b82e43c1269d` | A woman outdoors in warm light, eyes closed, smiling. |
| `gurudev-390x648.jpg` | 390×648 | §9 Gurudev | **Official** — Brand Style Guide (May 2026), Journey Within bookmark | Gurudev Sri Sri Ravi Shankar, smiling, in warm morning light. |
| `aol-logo-fullcolor.png` | 1234×472 | Header, footer | **Official** — Brand Style Guide, slide 8 | The Art of Living |

Source URL pattern: `https://images.unsplash.com/<id>?w=<W>&h=<H>&q=78&fm=jpg&fit=crop&crop=entropy`

The logo is the **full-colour standard logo**, extracted from the official Brand Style Guide deck
(May 2026), slide 8. The guide says to use the full-colour version wherever possible and reserve
monochrome for backup only.

### The Gurudev portrait

Cropped from the *Journey Within* bookmark in the same deck — the quote and the Madelyn signature
trimmed away, the portrait kept whole. It satisfies every rule the guide sets for Gurudev imagery:
fresh, hair well kept, **full head in frame** (never cropped), warm, smiling.

⚠️ **The source is only 390px wide.** It is displayed at 340px, so it is fine on a standard screen
and soft on a high-DPI one. Replace it with a higher-resolution original from the photo library
before launch — same filename and aspect ratio and nothing else changes.

---

## Replace these with real Art of Living photography

Four slots are currently filled with stock stand-ins that a real photo would beat outright.
They are marked here, not hidden:

| Slot | Why stock is weak here |
|---|---|
| **§4 group session** | This is the product. A stock version reads as a corporate wellness seminar and quietly undermines the section. A real class photo is worth more than anything else on this list. |
| **§1 hero** | Works well, but a real Art of Living participant would be better than a stock model. |
| **§3 family** | Same. The emotional weight of the section is carried entirely by this image. |

Swapping any of them is a one-line change: same filename, same dimensions, no CSS edits.
Keep the dimensions — they are baked into the `width`/`height` attributes that prevent layout shift.

---

## No stock faces for real people

The old page carried a testimonial from "Daniel K" illustrated with `jake-nackos-…-unsplash.jpg`.
The same named person told a materially different story on the other landing page, and quoted a
product ("Sleep & Calm Reset") that was not for sale anywhere.

The testimonials section has since been cut from this page entirely. The rule still stands for
anything added later: **a stock photograph may never stand in for a named real person.** The only
portrait on the page is Gurudev, and it is the official one.

## Rules for any image added later

1. **Never upscale.** The audit found a 324×270 source displayed at 485×404 on the old page. Serve
   at or above the rendered size, never below.
2. **Never larger than 2×** the rendered size either.
3. Explicit `width` and `height` attributes, always — they reserve the box and prevent layout shift.
4. `loading="lazy"` and `decoding="async"` on everything except the hero, which is
   `loading="eager" fetchpriority="high"` because it is the LCP element.
5. Real `alt` text describing what is in frame. `alt=""` only for genuinely decorative images —
   there are none on this page. The old page shipped 47 of 49 images with no alt at all.
6. Wide crops need a focal point. A 16:9 source in a 3:1 band loses 40% of its height; centre-cropping
   the closing photo cut every face out of frame until `object-position: 50% 22%` moved it up.

---

## Attribution

The Unsplash License does not require attribution. No photographer names are listed here because the
CDN id (`photo-1699880744039-…`) is not the same as the public photo-page slug, so the id alone cannot
be resolved back to a credit — and inventing names would be worse than omitting them.

To add credits before launch: search the id on unsplash.com, or use the Unsplash API
(`GET /photos/:id` with an access key) to retrieve `user.name` and `links.html` for each.
