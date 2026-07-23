# Kodiak Website Redesign Plan — "Sitemap 6.19" + Competitor Enrichment

Status: CONFIRMED TREE — mega-menu labels transcribed from the readable
Sitemap 6.19 image (2026-07-23). Items marked ⚠ CLIENT still need Brigham's
confirmation.

## 1. Research findings (top 5 commercial roofers)

| Site | Nav style | What they do best (worth copying) |
|---|---|---|
| **CentiMark** | Multi-column dropdowns; Systems / Services / Company split | Persistent utility bar "EMERGENCY SERVICE: <phone>" separate from general phone; industry pages built on vertical-specific *risk & compliance* (healthcare = Joint Commission); named warranty product ("Single Source Warranty"); hard safety numbers (EMR 0.35 vs 1.0 avg); FAQ blocks on every money page |
| **Tecta America** | Simple dropdowns | Publishes operational numbers (EMR 0.51, 9-min dispatch, 48-hr leak completion); separate "Emergency Response" vs "Leak & Repair" pages with a comparison table; qualifying quote form (sq ft, building type, multi-facility?); productized asset mgmt (TectaTracker®) |
| **Flynn Group** | Intent-based nav: New Build / Replace / Repair | Buyers self-select by problem; ONE 24/7 emergency number repeated verbatim on every page; contact form routes by branch + "my message is about…"; filterable project portfolio instead of thin industry pages; branch-level concrete safety stats |
| **Nations Roof** | Mega menu (Services + Solutions groups) | "Report a Leak" as permanent top-nav CTA; ZIP-first progressive lead form with "Good news, we serve your area!"; "What We Find on Roofs Every Day" defect-photo section → free-inspection CTA; real project specifics inside service pages ("31,000 sq ft Duro-Last PVC, Santa Clara") |
| **Baker Roofing** | ONE mega menu: Services / Industries / Systems / Featured Projects | The closest match to our sitemap: three-axis panel + project cards; heritage woven everywhere ("since 1915", phone ends in -1915); leads routed into named lanes with human promises ("our dispatch team will…"); filterable /projects/ reused as embedded proof on every page |

Gap the nationals leave open (per Flynn/Tecta research): they barely show
manufacturer certifications or license numbers — a regional roofer displaying
GAF/Carlisle/etc. certifications ⚠ CLIENT (which ones does Kodiak hold?) and CA/NV
licenses prominently out-signals them locally.

## 2. Current-state problems found in our own site (must fix regardless)

- Header drift: gold **CRM button exists only on index.html** — ⚠ CLIENT: keep it
  in the public header at all, or footer-only (Employee Portal block already has it)?
  Recommendation: footer-only.
- **Careers is not in the nav at all** (careers.html/-es.html have no active link).
- Three conflicting service taxonomies: homepage advertises 6 services, footer
  lists 5, services.html lists all 9.
- `.emerg` bar SLA placeholder (`[PLACEHOLDER — confirm real SLA]`) duplicated on
  all 16 pages.
- Active nav link is hand-placed per page — replace with JS auto-detect so future
  nav edits don't require re-verifying 16 files.
- contact.html is the only page missing the `.cta` section (fine — keep).

## 3. Confirmed sitemap / mega-menu tree (transcribed from Sitemap 6.19)

Top bar (desktop): HOME (logo) | 7 nav items | **Contact** (Primary/CTA →
triggers CA/NV picker before routing — per sitemap note).

1. **Services** (Main Nav; 6 children)
   - New Constructions — service-commercial-roofing.html (retitle page "New Construction")
   - Re-Roof — service-reroofing.html
   - Preventative Maintenance — service-maintenance.html
   - Emergency Leak Repair — service-emergency.html
   - Roof Inspections — service-roof-inspections.html (NEW; can grow out of
     service-roof-life-extension.html content ⚠ CLIENT: keep Roof Life Extension
     as its own page too, or fold into Inspections/Maintenance? Sitemap omits it,
     and also omits Waterproofing Injections — fold into Waterproofing?)
   - Waterproofing — service-waterproofing.html
2. **Roof Systems** (Main Nav; children mix systems + the Metal-differentiated tier)
   - TPO — roof-system-tpo.html (NEW)
   - EPDM — roof-system-epdm.html (NEW)
   - BUR — roof-system-bur.html (NEW)
   - ACM Cladding — service-metal-wall-panels.html §/retitle (Metal tier)
   - Insulated Wall Panels — metal-insulated-wall-panels.html (NEW, Metal tier)
   - Metal Fabrication — service-metal-roofing.html §/retitle (Metal tier)
   ⚠ CLIENT: sitemap shows TPO/EPDM/BUR only (no PVC/Mod-Bit) — confirm.
   The 3 metal children get the gold "differentiate" treatment inside this panel.
3. **Industries** (all 9 children; first 3 are green "Priority Industries")
   - Data Centers — industry-data-centers.html (PRIORITY)
   - Sports & Entertainment — industry-sports-entertainment.html (PRIORITY)
   - Education — industry-education.html (PRIORITY)
   - Industrial & Warehouse — industry-industrial-warehouse.html
   - Hospitality — industry-hospitality.html
   - Government & Municipal — industry-government.html
   - Retail & Shopping Center — industry-retail.html
   - Multifamily — industry-multifamily.html
   - Commercial Real Estate — industry-commercial-real-estate.html
   (all NEW; hub industries.html optional — sitemap shows no hub, panel links direct)
4. **Projects**
   - Portfolio/Gallery — projects.html (existing, upgraded with filters)
   - Case Studies — case-studies.html (NEW)
   - Testimonials — testimonials.html (NEW; seed with the 2 real index quotes)
5. **About**
   - Our Story — about.html
   - Core Values — core-values.html (NEW ⚠ CLIENT: or anchor section in about.html)
   - Careers — careers.html (+ Empleos — careers-es.html)
   - Safety — safety.html (NEW)
   - Manufacturer Certifications/Awards — certifications.html (NEW ⚠ CLIENT: which certs?)
   - Manufacturer Partnerships — partnerships.html (NEW ⚠ CLIENT: or merge with
     certifications into one page — recommend merging)
6. **Resources**
   - Blog — blog.html (NEW; static card grid, no CMS)
7. **Contact** (Primary/CTA button; children = the picker outcomes)
   - California — contact.html?region=ca
   - Nevada — contact.html?region=nv
   (sitemap shows CA/Nevada as child nodes — implemented as the picker modal,
   not separate pages)

Footer-only (per sitemap page 2): **areas-we-serve.html**, **privacy.html**,
**sitemap.html**, **news.html** — all NEW. (News is footer-only; Blog is in
Resources — ⚠ CLIENT: keep both, or is News = Blog? Recommend one blog.html and
footer "News" linking to it.)

Page inventory: 16 existing pages KEEP (no renames — hrefs are hard-coded in 16
files; retitles only). NEW pages: 3 roof-system pages + 1 insulated-panels +
1 roof-inspections + 9 industry pages + case-studies + testimonials + core-values
+ safety + certifications + partnerships + blog + 4 footer pages = **~23 new**
(fewer if the ⚠ CLIENT merges above are taken — recommended set is ~19).

## 4. Mega menu — technical approach (no templates!)

- CSS: new section in css/site.css — `.nl.has-panel`, `.mega` (absolute panel under
  header, grid columns, gold top border), `.mega-col`, `.mega-hot` (emergency/red),
  `.mega-metal` (gold tier). Desktop: open on hover + focus-within (keyboard a11y).
  Mobile (≤900px): panels become accordion sections inside the existing off-canvas
  drawer (`nav.main`); reuse `.open` pattern.
- JS (js/site.js): add small handler — click toggles panel on touch; Escape closes;
  auto-detect active link from `location.pathname` (replaces hand-placed `active`).
  Existing close-on-click drawer handler must skip accordion toggles
  (`a.mega-toggle` gets `data-noclose`).
- HTML: one canonical header block maintained in a comment-fenced region
  (`<!-- NAV:BEGIN --> … <!-- NAV:END -->`) pasted verbatim into every page.
  A tiny local script (scripts/sync-chrome.py, not deployed) can re-stamp the
  fenced block across all root pages — makes future relabeling one-file cheap.
  ⚠ note: script is a convenience; manual grep-and-paste stays the documented path.
- No new network calls. No framework. Honors reduced-motion.

## 5. CA/NV contact picker (Primary CTA)

- Clicking "Request a Quote" (any page) opens a lightweight modal (new CSS + JS in
  site.js): "Where is your building?" → **California** / **Nevada** buttons
  (+ "Somewhere else / not sure" small link).
- Routes to `contact.html?region=ca|nv`. contact.html reads the param and:
  - Preselects a new "Building location" `<select>` (CA/NV) in the form,
  - Shows region line (licenses CA #1119594 / CA #732770 vs NV #0042603),
  - Folds `Region: California` as a labeled line into the `message` payload —
    the /api/lead contract stays byte-identical (NO new keys).
- Direct visits to contact.html without region: select defaults to blank; picker
  not forced. Graceful degradation: no JS → plain link to contact.html.
- ⚠ CLIENT: is there a separate NV phone/office to display? (Currently only
  916.253.1900.)

## 6. Content enrichment (from research, fitted to our design system)

a. **Trust-badge module** — one reusable block (`.trust-strip`, styled like .stats):
   35+ years · Founded 1992 · CA & NV licensed (3 license numbers) · EMR
   `[PLACEHOLDER — confirm before publishing]` · manufacturer certs ⚠ CLIENT.
   Stamped onto every service + industry page. (CentiMark/Nations pattern.)
b. **Service-page anatomy upgrade** (apply to all 9): numbered process steps
   ("What to Expect"), FAQ block (4-6 Qs), "What We Find on Roofs" defect section
   (emergency + maintenance pages), 2 embedded relevant projects, related-services
   links (already exist), 2-3 CTAs at scroll depths ("Request an Inspection" —
   low-commitment ask).
c. **Emergency page**: 6-step response process (Call → Dispatch → Stabilize →
   Document → Repair → Close-out), emergency-vs-repair comparison table (Tecta),
   phone-first hero. SLA number stays `[PLACEHOLDER]` until confirmed.
d. **Safety page** (NEW): hard numbers as placeholders (EMR, training hours,
   incident rate), safety program description ⚠ CLIENT for all real facts.
e. **Industry pages** (NEW ×6): vertical pain points + compliance (healthcare =
   OSHA/Joint Commission framing), recommended systems, embedded relevant project,
   tailored FAQ, trust strip. Never invent client names — use our 4 real projects
   (Google Bay View, Golden 1 Center, Carson Tahoe Hospital, Midway Commerce Ctr).
f. **Projects page**: client-side filter pills (Service / Industry / Location);
   4 real projects now, structure ready for more. ⚠ CLIENT: more projects + photos?
g. **Named maintenance program** ⚠ CLIENT: brand it (e.g. "Kodiak RoofCare™") —
   Inspect → Clean → Maintain → Report; ties to CRM roofAssets/workOrders later.
h. **News page**: static article-card grid, hand-added articles (no CMS);
   first posts can be project announcements. Footer-linked only, per sitemap.
i. **Areas We Serve**: CA/NV region list (Sacramento, Bay Area, Central Valley,
   Reno/Tahoe, Las Vegas ⚠ CLIENT confirm actual coverage), one page, SEO-focused.
j. **Sitemap page**: plain linked tree of all public pages. **Privacy policy**:
   standard static policy ⚠ CLIENT review before publish.

## 7. Rollout order (live site stays consistent at every commit)

- **Phase 0 — prep (1 commit):** JS active-link auto-detect + mega-menu CSS/JS
  (inert — no markup uses it yet) + fix `.emerg` SLA line once decision made.
  `node --check js/site.js`. Zero visual change.
- **Phase 1 — new pages, unlinked (several commits):** create the ~23 new pages
  (copy contact.html skeleton per CLAUDE.md; current header/footer chrome —
  Phase 2 re-stamps it). They're orphans until Phase 2 — harmless on GitHub
  Pages. Verify each in local server.
- **Phase 2 — the flip (1 commit):** stamp new header (mega menu) + new footer
  (adds Areas We Serve / Privacy / Sitemap / News, all 9 services, Careers) across
  ALL root pages in one sweep; remove index-only CRM button per decision;
  align homepage service grid to final taxonomy. This is the only commit that
  touches all 16+13 pages — grep `NAV:BEGIN` to verify count.
- **Phase 3 — CA/NV picker (1 commit):** modal + contact.html region handling.
  Test: picker → param → preselect → payload message line; and no-param path.
- **Phase 4 — enrichment (1 commit per page/group):** service-page upgrades,
  emergency rebuild, projects filters, trust strips. Independent, ship as ready.
- **Phase 5 — QA:** `node --check` all changed JS; tag-balance; browse every page
  at 4173; mobile drawer + accordion; keyboard nav of mega menu; verify both
  careers pages still mirror; confirm hr/ untouched; push origin (+ roofwebpage
  mirror if desired).

## 8. Open questions for Brigham (⚠ CLIENT roll-up)

1. ~~Real mega-menu labels~~ ✅ transcribed from readable Sitemap 6.19.
2. Keep CRM button in public header, or footer-only? (Recommend footer-only.)
3. Existing pages the sitemap omits: Roof Life Extension, Waterproofing
   Injections, Metal Roofing & Specialties as separate service — keep reachable
   (recommend: keep pages live, link from related pages, not in menu)?
4. Roof Systems children: TPO/EPDM/BUR only, or add PVC/Mod-Bit (index copy
   mentions both)?
5. Merge Manufacturer Certifications/Awards + Manufacturer Partnerships into one
   page? Which certifications does Kodiak actually hold?
6. Core Values: own page or section of about.html?
7. News (footer) vs Blog (Resources): one blog or two pages?
8. Real EMR / safety numbers, or leave placeholders?
9. Separate NV phone/office for the picker?
10. Name for the maintenance program?
11. Actual service-area cities for Areas We Serve.
12. Emergency SLA number for the .emerg bar.
