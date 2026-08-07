# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## designs/ — Key Web Design concept showcase (the active work)

`designs/` is a client-demo showcase of homepage concepts for **Key Web Design** (Brigham's studio: websites, LSA ads, apps & AI agents). Product context lives in `PRODUCT.md` (impeccable schema) — read it before design work. Key rules:

- Each concept is one fully self-contained HTML file (inline CSS/JS, Google Fonts only); gallery at `designs/index.html`. Main page only — nav links (Work, Services, Pricing, About, Contact) are intentionally inert.
- **`designs/site/` is the real Key Web Design studio site** (built from concept 9C · Citrus): 7 pages sharing `site.css`/`site.js` (the self-contained rule binds concepts only). Chrome is copy-pasted per page inside `<!-- KWD-NAV:BEGIN -->`/`<!-- KWD-FOOTER:BEGIN -->` anchors — edit once, stamp into all pages, re-apply each page's `aria-current`. The `document.documentElement.className+=' js'` gate stays inline in every `<head>` (must beat first paint). Public pages are INDEXABLE (no robots meta, unlike the concepts); `casebook.html` is the exception — noindex, linked from nowhere (sales-call page, has no site nav by design). All internal links are bare relative filenames (never `/`-rooted — the Pages subpath breaks them). Unconfirmed facts render as visible `.ph` placeholders. Contact form posts to Formspree — `YOUR_FORM_ID` must be replaced before launch (`grep -rn "YOUR_FORM_ID" designs/site/`); until then it errors gracefully to mailto.
- 20 concepts exist: layouts 1–5 (Stripe/Linear/Vercel/Anthropic/Wise archetypes), 1a/1b/1d/1e (Gradient-series palette riffs; 1c was rejected & deleted — owner dislikes dark full-page themes), 6–10 (Split/Bold/Bento/Organic/Glass), 9a–9f (Organic-series riffs on layout-9, the owner's favorite). Green is the pinned color direction; 1e and 9f (Lagoon) are the two sanctioned blues.
- **No confirmed business facts** — all stats/response times are illustrative filler; never present them as real, never name clients (Kodiak, JHansen, Alaskan Anglers) in demos without owner approval. Keep the demo-content disclaimer on the gallery.
- All pages honor `prefers-reduced-motion` and stay readable with JS disabled (`html.js` gate + IntersectionObserver reveals).
- Deploys via GitHub Actions (`.github/workflows/pages.yml`, Pages build_type=workflow) — live at https://brigsap100.github.io/mywebsite/designs/. Push to `main` triggers deploy; check `gh run list --workflow=pages.yml` if pages look stale.

Everything below describes the legacy Kodiak mirror at the repo root — do not disturb it.

## What this is

Marketing website for Kodiak Roofing & Waterproofing (commercial roofing, CA/NV). Plain static HTML/CSS/JS — **no framework, no build step, no package.json, no generator**. This repo is the standalone public site: **no CRM and no backend** (the CRM lives in its own repo, [Brigsap100/CRMApp](https://github.com/Brigsap100/CRMApp); the full site+backend variant lives in [Brigsap100/kodiak-webpage](https://github.com/Brigsap100/kodiak-webpage)).

- **Public site** (root `*.html`) — marketing pages, careers (`careers.html` + Spanish mirror `careers-es.html`), lead/service-request forms
- **HR portal** (`hr/`) — passcode-gated employee pages (benefits, payroll, pto, policies, directory), all `noindex`. The passcode gate (`kodiak2027`, sessionStorage `kodiakCrmAuth`) is cosmetic only, not security.

`examples/` holds discarded design mockups — ignore it.

## Commands

```bash
# Run locally (only requirement)
python3 -m http.server 4173 --bind 127.0.0.1

# Syntax-check any changed JS (no linter/test suite exists)
node --check js/site.js

# Check an inline <script> in an HTML page: extract it to a temp file, then node --check it
```

There are no tests. Verification = `node --check` + tag-balance + browsing the served pages.

## Hosting reality (important)

GitHub Pages only — static hosting, **`/api/*` does not exist**. `js/site.js` still POSTs form submissions to `/api/lead` and `/api/service-request`, and `js/site-data.js` still fetches `/api/site-content`; all of these fail silently by design (short timeout, friendly confirmation shown to the user, baked-in filler content stays). This graceful-degradation pattern is deliberate — copy it, don't weaken it, and don't remove the form wiring: it keeps this repo drop-in compatible with the Azure-backed variant in kodiak-webpage.

`staticwebapp.config.json` is kept for parity with the kodiak-webpage repo (harmless on Pages).

## Layout integration

**There is no partial/template system.** The header/nav, footer (with Employee Portal block), `.cta` section, and `.emerg` bar are copy-pasted verbatim into every public page. To change shared chrome you must edit all ~17 root pages consistently (grep for a unique string from the block). New pages: copy an existing interior page (e.g. `contact.html`), keep `<head>` (Google Fonts Fraunces+Inter, `css/site.css`, favicon `assets/img/logo-seal.png`), use `.banner`+`.crumb` for the page header, end with `<script src="js/site.js"></script>`.

Design system in `css/site.css`: LIGHT theme matched to Kodiak's WP dev site (kodiakroofidev.wpenginepowered.com) — red `#990000` on white/`#F4F4F4`, dark band `#1C1C1C`, Roboto Condensed uppercase headings + Montserrat body, 10/15px radius tokens. IMPORTANT: legacy var names (`--gold`, `--gold-2`, `--cream`, `--card`, `--bg-2`…) still exist as ALIASES into the new palette because inline `style=""` attributes across all pages reference them — never delete these vars. Key classes: `.wrap`, `.split`, `.sec-head`, `.svc-grid`/`.svc`, `.stats`/`.s`, `.tick`, `.form-grid`/`.field(.full)`, `.btn-red/-gold/-ghost`, `.reveal` (scroll-in), `.banner`, `.cta`, `.emerg`. Pages use inline `style=""` tweaks rather than page-scoped `<style>` blocks. Stats are static text (a JS count-up existed once and got removed — don't reintroduce `data-count` zeros in markup).

`js/site.js` is the one shared script: sticky header, mobile menu, `.reveal` observer, and all form wiring. Form payload keys (`/api/lead`: `{source, name, company, email, phone, service, position, message}`; `/api/service-request`: `{company, name, phone, email, building, leakLocation, problem, emergency, urgent}`) are a fixed contract shared with the kodiak-webpage backend — fold new data into `message`/`problem`, never add keys.

Site content overrides: editable values (stats, pay ranges, service cities…) are wrapped as `<span data-content="key">filler</span>`; on this repo the baked-in filler always shows (the `/api/site-content` fetch always fails). The baked fillers are plausible but UNCONFIRMED business numbers — confirm with the owner before treating them as fact.

## Content rules

- Never invent business numbers (pay ranges, percentages, SLAs, stats). Unknown real values are written literally as `[PLACEHOLDER — confirm before publishing]` — several exist on careers pages and index.html awaiting real numbers. Keep accurate facts intact: 35+ years, founded 1992, CA/NV, licenses CA #1119594 / CA #732770 / NV #0042603, phone 916.253.1900.
- `careers-es.html` mirrors `careers.html`: Spanish labels/copy but **English option `value`s and `data-position` values**. Changes to one careers page almost always need the same change in the other.
- Keep `<meta name="robots" content="noindex">` on hr/ pages; careers and public pages stay indexable.

## Deploy

Push to `main` → GitHub Pages auto-builds (~1 min).
