---
name: Key Web Design — Studio Site (9C · Citrus)
description: A tended-garden world in cream, greens, and citrus — organic blobs, petal cards, and one green button, for a studio that grows the whole lead funnel.
colors:
  cream-paper: "#fdfef8"
  garden-ink: "#22301b"
  moss-dim: "#5d6f52"
  hairline: "#eaeedb"
  fresh-green: "#3aa864"
  deep-fern: "#217447"
  seedling-mist: "#eef7e6"
  citrus-sun: "#ffd9a8"
  new-leaf: "#daf0d3"
  button-green: "#1f7544"
  button-green-deep: "#185c36"
  clay-error: "#a83c26"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(38px, 5.8vw, 64px)"
    fontWeight: 800
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(27px, 3.6vw, 38px)"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 800
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.65
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
rounded:
  input: "16px"
  card-sm: "24px"
  card: "32px"
  bowl: "44px"
  pill: "999px"
spacing:
  sm: "14px"
  md: "22px"
  lg: "44px"
  xl: "84px"
components:
  button-primary:
    backgroundColor: "{colors.button-green}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.button-green-deep}"
  button-soft:
    backgroundColor: "{colors.seedling-mist}"
    textColor: "{colors.deep-fern}"
    rounded: "{rounded.pill}"
    padding: "13px 26px"
  button-soft-hover:
    backgroundColor: "{colors.new-leaf}"
  kicker:
    backgroundColor: "{colors.seedling-mist}"
    textColor: "{colors.button-green}"
    rounded: "{rounded.pill}"
    padding: "7px 16px"
    typography: "{typography.label}"
  card-petal:
    backgroundColor: "#ffffff"
    rounded: "{rounded.card}"
    padding: "34px 28px"
  input-field:
    backgroundColor: "#ffffff"
    textColor: "{colors.garden-ink}"
    rounded: "{rounded.input}"
    padding: "12px 16px"
---

# Design System: Key Web Design — Studio Site (9C · Citrus)

This DESIGN.md governs **`designs/site/` only** — the studio's own multi-page site, grown from the `designs/layout-9c.html` concept. The sibling `designs/*.html` files are deliberately distinct concept worlds and must never be unified under this system; the repo root is a separate legacy site.

## Overview

**Creative North Star: "The Tended Garden"**

The site tells one story — one studio grows the whole lead funnel (site → ads → AI agent) — as a garden, and the visual world is grown accordingly: warm cream paper, living greens, one citrus accent, and organic geometry everywhere a rectangle would be expected. Blobs morph slowly behind heroes, section handoffs are drawn as waves rather than hard edges, cards are soft "petals," bullets are leaf-shaped, and icons are hand-drawn single-stroke sketches. It explicitly refuses the agency-template scaffold: no hero stat rows, no testimonial walls, no competing CTAs — there is exactly one action ("Start a project") and it is always the same green pill.

Density is low and friendly: generous line-height (1.65), short measure (heroes cap at 17–22ch for headings, 52–56ch for lead paragraphs), and a narrow 1080px container. The voice of the type is a single family — Plus Jakarta Sans — doing all jobs through weight alone (500 body up to 800 display), tightened at display sizes. Everything works without JavaScript (native `<details>` mobile nav, plain-POST form fallback) and goes fully still under `prefers-reduced-motion`.

**Key Characteristics:**
- Cream `#fdfef8` paper with a green-only chromatic voice and one citrus accent (`#ffd9a8`)
- Organic geometry: morphing blobs, wave section dividers, blob-cornered icon chips, leaf-mask bullets
- One typeface, weight-driven hierarchy (Plus Jakarta Sans 500–800), negative tracking at display sizes
- A single CTA phrase and a single primary button style, repeated rather than varied
- Honesty is a visual device: unconfirmed facts wear the visible `.ph` placeholder token
- Progressive enhancement as doctrine: JS-off readable, reduced-motion respected down to pseudo-elements

## Colors

A near-monochrome green palette on warm cream, with citrus as the sole warm counterpoint — greens carry structure, emphasis, and action; citrus carries warmth and warning-of-filler.

### Primary
- **Fresh Green** (`--green`, #3aa864): the bright working green — leaf-bullet fills, gradient start of the bowl CTA, tint source for button shadows.
- **Deep Fern** (`--deep`, #217447): text-level green — `em` highlights in headings, hover/active nav color, focus outlines, soft-button text, gradient end of the bowl. The go-to green wherever green must read as text.
- **Button Green** (`--btn`, #1f7544): reserved for the primary button and the logo mark; **Button Green Deep** (`--btn-hi`, #185c36) is its hover state.

### Secondary
- **Citrus Sun** (`--sun`, #ffd9a8): the only non-green accent — the second hero blob, alternate icon-chip fill, the pricing mid-tier border, and the dashed underline of the `.ph` placeholder token. Warmth, sparingly.

### Tertiary
- **New Leaf** (`--leaf`, #daf0d3): the highlighter — the swipe under `em` words in headings, the underline of the current nav page, hover fill of soft buttons, default icon-chip fill.
- **Seedling Mist** (`--soft`, #eef7e6): the alternate section background (every `.band`/`.svcband`), kicker-pill fill, and the color every wave divider hands off to.

### Neutral
- **Cream Paper** (`--bg`, #fdfef8): page background and theme-color; the header is this at 91% opacity over blur.
- **Garden Ink** (`--ink`, #22301b): all headings and body text; also the stroke color of every drawn icon.
- **Moss Dim** (`--dim`, #5d6f52): secondary text — lead paragraphs, card body copy, nav links at rest, footer.
- **Hairline** (`--line`, #eaeedb): input borders, footer top border, dropdown border.
- **Clay Error** (`--err`, #a83c26): form errors only (error borders, messages, form status).

### Named Rules
**The Green Voice Rule.** Everything chromatic is green except Citrus Sun and Clay Error. New surfaces never introduce a new hue; they pick the right green (Fresh for fills, Deep for green-as-text, Button Green for the action).

**The One Button Rule.** One primary action per view, always the green pill, almost always reading "Start a project." Secondary actions use `.btn.soft` or the `.more` text link — never a second loud button.

**The Visible Placeholder Rule.** Any unconfirmed business fact (price, scope, stat) is wrapped in `.ph` — dashed Citrus Sun underline, `#fffdf7` fill, `#8a5a2b` text — so filler is visibly filler. Never style a `.ph` value to look confirmed; never remove the token without the owner supplying the real value.

## Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif)
**Body Font:** Plus Jakarta Sans (same family; loaded at weights 500, 600, 700, 800 via Google Fonts)

**Character:** One friendly geometric sans doing every job through weight. Display sizes are heavy (800) and tightly tracked (−0.02 to −0.03em); body stays airy at 1.65 line-height. Nothing is ever italic — `em` inside headings is repurposed as the leaf-highlight device (`font-style: normal`, Deep Fern color, New Leaf swipe underneath).

### Hierarchy
- **Display** (800, clamp(38px, 5.8vw, 64px), 1.06, −0.03em): home hero `h1` only, centered, max 17ch. Interior pages use the compact variant (clamp(32px, 4.6vw, 52px), 1.08, max 22ch, left-aligned).
- **Headline** (800, clamp(27px, 3.6vw, 38px), 1.15, −0.02em): section `h2`s; `text-wrap: balance`.
- **Title** (800, 20px): card/petal `h3`s; pricing-tier `h2`s run 21px, aside-card `h2`s 19px.
- **Body** (500 effective, 16px, 1.65): default copy. Card body copy steps down to 14.5px in Moss Dim; hero leads step up to 17–18px, max 52–56ch.
- **Label** (700, 13px): the `.k` kicker pill — sentence-case, Button Green on Seedling Mist. Nav links are 14.5px/600.

### Named Rules
**The Leaf Highlight Rule.** Emphasis inside `h1`/`h2` is an `<em>` — never italic, rendered Deep Fern with a New Leaf swipe (animated `scaleX` grow on the home hero). One `em` phrase per heading, usually the last two words ("Ripe leads.", "No weeds.").

**The Kicker Pill Rule.** Every hero and major section opens with a `.k` pill naming its topic before the heading. On Seedling Mist backgrounds the pill flips to white fill so it stays legible.

## Layout

A single centered column: `.wrap` caps content at 1080px with 24px side padding. Pages alternate Cream Paper and Seedling Mist bands, and every hero hands off to the next band through a 70px inline-SVG wave whose fill **must** match the next section's background (currently always `#eef7e6`).

Page anatomy is fixed: sticky blurred header (72px) → hero (`.hero` centered with two blobs on home; `.page-hero` left-aligned with one off-canvas blob on interior pages) → wave → alternating content bands → (on home) the bowl CTA → centered footer. Cards sit in `.petals` grids: 3-up (or `.petals.two` 2-up) with 22px gaps, collapsing to one column at the single 880px breakpoint, where the inline nav also swaps for the `<details>` menu.

Rhythm values in use: 22px grid gaps, 34px 28px card padding, 44px between a section head and its grid, 84px hero top padding (64px interior), 50–100px band padding. Shared chrome is not templated — the header and footer are stamped verbatim between `KWD-NAV:BEGIN/END` and `KWD-FOOTER:BEGIN/END` comments on every page; edit once, restamp everywhere, and move `aria-current="page"` per page. Page-specific styles live in that page's own `<style>` block; only rules used on 2+ pages belong in `site.css`.

## Elevation & Depth

Soft and green-tinted. There are no gray or black shadows anywhere — every shadow is Deep Fern or Fresh Green at low alpha, large blur, and strong negative spread, so cards read as resting on grass rather than floating in space. Depth also comes from tonal banding (cream vs. mist sections) and the blurred translucent header.

### Shadow Vocabulary
- **Petal rest** (`box-shadow: 0 14px 34px -22px #21744740`): petals, tiers, and the form card at rest.
- **Petal lift** (`box-shadow: 0 24px 44px -20px #21744755` with `translateY(-6px) rotate(-0.5deg)`): petal hover — the tiny rotation is part of the organic signature.
- **Button glow** (`box-shadow: 0 8px 20px -10px #3aa86499`): primary buttons only; soft buttons are shadowless.
- **Menu float** (`box-shadow: 0 18px 44px -24px #21744766`): the mobile `<details>` dropdown.

### Named Rules
**The Green Shadow Rule.** Shadows are always a green tint (#217447 or #3aa864 at ≤50% alpha, negative spread). A neutral gray shadow is off-world.

## Shapes

Nothing is sharp and almost nothing is a plain rounded rectangle. The form language is grown, not drafted: blobs use asymmetric four-value border-radius (`46% 54% 60% 40% / 50% 44% 56% 50%`) and morph over 14–16s; the logo mark and icon chips use the signature **blob corner** — three round corners and one small one (`50% 50% 50% 6px` on the logo, `50% 50% 50% 8px` on `.ic` chips), like a leaf's stem point. Cards are 32px (`--r`), the bowl CTA 44px, small cards 20–24px, inputs 16px, and every button, pill, and kicker is a full 999px capsule. List bullets are literal leaves — a 12px Fresh Green leaf shape applied via CSS `mask`. Icons are never glyphs or icon-font characters: they are inline SVGs drawn as 1.6-stroke round-capped Garden Ink line sketches, sitting in a 52px blob-cornered chip.

**The Blob Corner Rule.** The three-round-one-small corner is the brand's silhouette. Use it for icon chips and marks; don't flatten it to a plain circle or square.

## Components

### Buttons
- **Shape:** full capsule (999px), 13px 26px padding, 700 weight, 15px.
- **Primary (`.btn`):** Button Green (#1f7544) on white text with the green button glow shadow.
- **Hover:** background deepens to #185c36 and the button lifts (`translateY(-2px)`), 0.18s transition.
- **Soft (`.btn.soft`):** Seedling Mist fill, Deep Fern text, no shadow; hovers to New Leaf. Used for secondary actions (e.g. the mailto button). Inside the bowl CTA the button inverts: white fill, Deep Fern text, no shadow.
- **Focus:** global `:focus-visible` — 2px Deep Fern outline, 3px offset.

### Kicker (`.k`)
- **Style:** 13px/700 pill, Button Green text on Seedling Mist (white fill on mist backgrounds), 7px 16px padding. Opens every hero and section.

### Cards / Containers (`.petal`)
- **Corner Style:** 32px (`--r`).
- **Background:** white on either page background.
- **Shadow Strategy:** petal rest → petal lift on hover (see Elevation); whole petals may be links (`.petal-link`).
- **Anatomy:** optional big 800-weight number badge top-right (26px, #3d9c5e), 52px blob-cornered icon chip (New Leaf, Citrus Sun, or #ffe6c4 fill) with a drawn stroke icon, 20px/800 `h3`, 14.5px Moss Dim body, optional `.leaflist` and `.more` text link ("… →", Deep Fern, underline on hover).
- **Bowl CTA (`.bowl`):** the closing move — 44px-radius panel, 135° Fresh-Green→Deep-Fern gradient, white text (#dcf4de for the paragraph), two translucent white blobs morphing inside, inverted white button.

### Inputs / Fields (`.field`)
- **Style:** white fill, 1.5px Hairline border, 16px radius, 12px 16px padding, inherited font; labels 14px/700 above, 6px gap.
- **Focus:** 2px Deep Fern outline, 2px offset.
- **Error:** border flips to Clay Error; a 13px/600 Clay Error `.err-msg` appears under the field; errors clear live once the input becomes valid. Status line is `aria-live="polite"`. A visually-hidden honeypot (`.hp`) rides along. Success replaces the form with `.form-ok` — a Seedling Mist, New-Leaf-bordered 24px-radius card.

### Navigation
- **Header:** sticky, Cream Paper at 91% over `backdrop-filter: blur(10px)`; blob-cornered "K" logo mark + wordmark (17px/800); links 14.5px/600 Moss Dim, hover Deep Fern; the current page gets Deep Fern plus a New Leaf underline (`aria-current="page"`); the green primary button rides at the far right.
- **Mobile (≤880px):** links and header button hide; a `<details class="mnav">` pill ("Menu") opens a white 20px-radius dropdown with the green menu-float shadow — fully functional without JS (JS only adds close-on-click sugar).
- **Skip link:** off-screen until focused, Deep Fern fill.

### Motion (documented with the components it affects)
- Heroes: staggered `up` fade-rise entrances (kicker → h1 → p → CTAs, 0.7–0.8s, 0.1–0.34s delays); the `em` highlight grows in with `scaleX` at 1s.
- Scroll: `.reveal` elements fade-rise 22px over 0.7s with `cubic-bezier(.2,.7,.2,1)`, staggered by `.d1/.d2/.d3` (+0.13s each) — gated behind `html.js` (inline class set in each `<head>`) so JS-off users see everything; the IntersectionObserver strips the classes after transition.
- Ambient: blobs morph 14–16s alternate.
- **The Kill Switch Rule.** `prefers-reduced-motion: reduce` sets `animation: none` and `transition: none` on `*, ::before, ::after` — pseudo-element blobs included — and force-shows `.reveal` content. Any new animation must die under this query with no further work.

## Do's and Don'ts

### Do:
- **Do** open every hero/section with a `.k` kicker pill and highlight one heading phrase with the `em` leaf swipe.
- **Do** end every hero with a wave divider whose fill exactly matches the next section's background (#eef7e6 today).
- **Do** draw new icons as inline 1.6-stroke round-capped Garden Ink SVGs inside 52px blob-cornered chips; illustrations (like Work's `.mini` vignettes) stay in-palette line art.
- **Do** wrap every unconfirmed price, scope, or stat in `.ph` — filler must look like filler.
- **Do** edit shared chrome inside the `KWD-NAV`/`KWD-FOOTER` stamp comments and re-stamp it to all seven pages, moving `aria-current` per page.
- **Do** keep new shared rules in `site.css` only when used on 2+ pages; single-page styles belong in that page's `<style>`.

### Don't:
- **Don't** introduce a new hue: no blues, purples, or grays-as-color; the world is greens + Citrus Sun + Clay Error on cream.
- **Don't** add a second competing CTA style or phrase — one green capsule, "Start a project."
- **Don't** use gray/black shadows, hard offset shadows, sharp corners, or plain-circle icon chips; shadows are green-tinted, corners are capsules/32px/blob-corners.
- **Don't** use italics — emphasis is the leaf highlight — and don't use glyph/icon-font icons or stock imagery.
- **Don't** ship anything that breaks without JS (reveals must ride the `html.js` gate; interactive chrome needs a native fallback) or that keeps moving under `prefers-reduced-motion`.
- **Don't** present filler numbers or client names as fact anywhere; client names live only in the unlisted `casebook.html`.
- **Don't** extend this system to the other `designs/*.html` concepts or the repo root — they are separate worlds by design.
