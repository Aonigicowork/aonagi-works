# Aonagi Works

Premium single-page studio website with a nostalgic **Windows XP desktop** aesthetic.

**Live (GitHub Pages):** https://aonagiworks.github.io/aonagi-works/

## Features

- Interactive desktop UI (windows, taskbar, Start menu)
- Light / Dark mode
- XP boot loading screen
- Floating windows, clouds, desktop icons
- Services, pricing, projects, tech stack, workflow, testimonials, contact
- Fully responsive (mobile → desktop)
- `prefers-reduced-motion` support
- Zero build step — pure HTML/CSS/JS

## Local preview

```bash
cd aonagi-works
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to GitHub Pages

1. Push this repo to `aonagiworks/aonagi-works`
2. Settings → Pages → Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Site will be at `https://aonagiworks.github.io/aonagi-works/`

Or use the included GitHub Action (`.github/workflows/pages.yml`).

## Customize

| Item | Where |
|------|--------|
| WhatsApp link | `index.html` → Contact section |
| Telegram | default `@botunlverse` |
| Email | `mailto:` in Contact |
| Pricing | `#pricing` window |
| Projects | `#projects` cards |

## Brand

- Studio: **Aonagi Works**
- Channel: [@botunlverse](https://t.me/botunlverse)
- GitHub: [aonagiworks](https://github.com/aonagiworks)

## License

MIT © 2026 Aonagi Works
