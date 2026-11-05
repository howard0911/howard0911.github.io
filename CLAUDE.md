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
- `albums.html` — Photo album index; one card per album in `travel/`
- `contact.html` — Contact and resume
- `template-post.html` — Template to copy when creating new article pages
- `[topic].html` — Individual article pages (amm, defi, onchain_fund, shor, byzantium, etc.)

### Shared Components (Partials)
Navigation and footer are loaded dynamically via `js/layout.js` using the Fetch API:
- `partials/nav.html` — Navbar (loaded into every page via `<div class="nav-slot" data-include=...>`; the slot is the sticky element)
- `partials/footer.html` — Footer with social links

`layout.js` also contains inline fallback HTML for `file://` access. When editing nav or footer, update **both** the partial and the fallback strings inside `layout.js`.

### Styling
- `css/site.css` — The only stylesheet; hand-written, no framework. Design tokens (colors, fonts, spacing) are CSS variables on `:root` at the top and follow `DESIGN.md`. Accent color is burgundy (`--accent`). Dark mode follows the OS unless the visitor toggles it (`html[data-theme]`).
- Fonts come from Google Fonts: Source Serif 4 + Noto Serif TC (headings and reading text), IBM Plex Sans + Noto Sans TC (UI), IBM Plex Mono (dates and numbers). Every page loads the same font link. Icons are inline SVG; there is no icon library.

### JS
- `js/layout.js` — Partial loader (nav/footer injection); fires `partials:loaded`
- `js/theme.js` — Loaded in `<head>`; applies the saved theme from localStorage before first paint
- `js/scripts.js` — Theme toggle, mobile menu, nav border on scroll, current-page highlight
- `js/articles.js` — Category filter on `articles.html` only
- `js/toc.js` — Builds the "On this page" table of contents on article pages only

### Assets
- `assets/img/` — Article covers and in-article images (~5MB total); use compressed JPGs/PNGs when adding new ones

## Photo Albums

`travel/` is a git submodule of `https://github.com/howard0911/photo-albums` (public, so GitHub Pages checks it out on deploy). Each album is a self-contained folder served at `/travel/<album>/`.

- Clone with `git clone --recurse-submodules`, or run `git submodule update --init` after a plain clone.
- After pushing album changes to photo-albums, run `git submodule update --remote travel` here, commit the new submodule pointer, and push.
- A new album also needs an `.album` entry in `albums.html` and in the Albums block of `index.html`, linking to `travel/<album>/index.html` (cover from `travel/<album>/photos/full/`).

## Adding New Articles

1. Copy `template-post.html` to a new file (e.g., `newtopic.html`) and fill in the title, English title (`post-en`), description, category, date and cover image. Use `<h2>` for sections; the table of contents and the section numbers are generated from them.
2. Add an `.entry` at the top of `#article-list` in `articles.html` with `data-category` set to `study`, `defi` or `quantum`, the Chinese title and its English gloss (same text as `post-en`). Update the counts on the filter tabs.
3. Update the Writing list in `index.html` so it shows the five newest articles, and the article counts there.
4. Place images under `assets/img/`

## Design System
Always read DESIGN.md before making any visual or UI decisions.
All font choices, colors, spacing, and aesthetic direction are defined there.
Do not deviate without explicit user approval.
In QA mode, flag any code that doesn't match DESIGN.md.
