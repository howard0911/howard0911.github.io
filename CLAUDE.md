# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static personal portfolio and blog site deployed on GitHub Pages. No build process — edit files and push to `master`; GitHub Pages auto-deploys.

Live site: `https://howard0911.github.io`

## Development

No build tools required. Open any `.html` file in a browser, or run a local server:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Architecture

### Page Structure
- `index.html` — Landing/home page
- `about.html` — Professional bio, experience, skills
- `articles.html` — Article listing index
- `contact.html` — Contact and resume
- `template-post.html` — Template to copy when creating new article pages
- `[topic].html` — Individual article pages (amm, defi, onchain_fund, shor, byzantium, etc.)

### Shared Components (Partials)
Navigation and footer are loaded dynamically via `js/layout.js` using the Fetch API:
- `partials/nav.html` — Navbar (loaded into every page)
- `partials/footer.html` — Footer with social links

`layout.js` also contains inline fallback HTML for `file://` access. When editing nav or footer, update **both** `partials/nav.html` and the fallback strings inside `layout.js`.

### Styling
- `css/styles.css` — Bootstrap 5.1.3 + Clean Blog theme (Start Bootstrap). Large file (~11k lines). Bootstrap classes are used inline in HTML; custom overrides are at the bottom of this file.

### JS
- `js/scripts.js` — Scroll-based navbar hide/show behavior
- `js/layout.js` — Partial loader (nav/footer injection)

### Assets
- `assets/img/` — Article images (~28MB total); use compressed JPGs/PNGs when adding new ones

## Adding New Articles

1. Copy `template-post.html` to a new file (e.g., `newtopic.html`)
2. Add a card linking to it in `articles.html`
3. Place images under `assets/img/`
