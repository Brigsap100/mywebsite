# only-kodiak-web

Marketing website for Kodiak Roofing & Waterproofing (commercial roofing, CA/NV).

Static HTML/CSS/JS — no framework, no build step. This repo is the standalone
public site only: no CRM and no backend. Forms degrade gracefully (they show a
friendly confirmation; nothing is posted anywhere).

## Development

```bash
python3 -m http.server 4173 --bind 127.0.0.1
# then open http://127.0.0.1:4173
```

## Deploy

Push to `main` → GitHub Pages.
