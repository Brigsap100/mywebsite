# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: prospective clients of Key Web Design — owners of small, owner-run local service businesses (roofers, cleaners, fishing charters, contractors) evaluating whether to hire the studio. They are shown this repo's `designs/` gallery as a demonstration of design range during a sales conversation. Secondary: Brigham Nash (the studio owner), who browses and compares concepts to pick directions for real client work.

## Product Purpose

A client-demo showcase: a growing gallery of polished, distinct homepage concepts that demonstrates what Key Web Design can build, used to sell website projects. Success = a prospect sees a concept close to their taste and says "build me that." It is not (currently) the studio's own public site — that lives separately — and the repo also still carries a legacy Kodiak-site mirror at its root, which the showcase must not disturb.

## Positioning

One team, whole stack: Key Web Design builds the website, runs the Google Local Services Ads that feed it, and ships the apps/AI agents that answer, quote, and book the leads — so no vendor finger-pointing. Every demo concept sells these three services, in that funnel order (Build → Advertise → Automate), with the AI story emphasized.

## Operating Context

- Concepts live in `designs/` as fully self-contained single HTML files (inline CSS/JS, Google Fonts only) with a gallery index at `designs/index.html`.
- Each demo is a main page only: nav links name future pages (Work, Services, Pricing, About, Contact) but are intentionally inert.
- Hosted on GitHub Pages from `main` (`brigsap100.github.io/mywebsite/designs/`). The repo root is a legacy Kodiak Roofing site mirror — leave it untouched.
- Demos are shown on desktop and phones during sales conversations; both must hold up.

## Capabilities and Constraints

- Plain static HTML/CSS/JS; no framework, no build step, no backend.
- Every page must honor `prefers-reduced-motion` and remain readable with JavaScript disabled.
- Verification is `node --check` on scripts, tag-balance, and browsing the served pages; no test suite.
- Undecided: whether this repo eventually becomes the studio's public site or stays a showcase; whether the Kodiak mirror gets removed.

## Brand Commitments

- Studio name: **Key Web Design** (owner Brigham Nash, brigham@saptron.com).
- Tagline in use: "We build websites. Then we keep them working."
- Green is the binding color direction for the current concept series (user-pinned); two deliberate blue variants (layout-1e, layout-9f) exist by request. The owner named layout-9 (Organic) a favorite — the 9a–9f riff series grew from it. Dark full-page themes were rejected for the Gradient series (layout-1c was removed).
- Services always presented as: Website Design, LSA Ads (Google Local Services Ads), Apps & AI Agents.

## Evidence on Hand

None confirmed. No client names, stats, response times, pricing, or performance numbers may be presented as fact — the owner explicitly chose "no claims yet." All numbers in demos (e.g. "<1s load", "Top 3", "24/7", chat reply times) are illustrative filler and must stay visibly framed as targets/demo content (the gallery index carries this disclaimer). Real projects exist (Kodiak Roofing, JHansen Cleaning, Alaskan Anglers, Kroofing Estimator) but must not be named in demos until the owner approves each.

## Product Principles

1. Range over house style — each concept should feel like a different (excellent) studio built it, so any prospect finds a fit.
2. Never invent facts — filler is fine, fabricated proof is not; keep the demo-content disclaimer intact.
3. The AI agent is the story arc — every concept leads the visitor from "nice site" to "it answers your leads at 2am."
4. Ship self-contained — a concept must survive being opened as a single file, forever, with no build step.
5. Don't disturb the Kodiak mirror — the showcase is a tenant in this repo, not the landlord.
