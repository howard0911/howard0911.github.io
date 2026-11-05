# howard0911.github.io

Source code for my personal website, live at [howard0911.github.io](https://howard0911.github.io): a portfolio and blog about my work as a data product manager.

## What's on the site

- **Home**: a short introduction and the three newest articles.
- **About**: my experience, education, projects, technical skills, extracurriculars and awards.
- **Articles**: writing (mostly in Traditional Chinese) on studying abroad, DeFi and blockchain, and quantum computing, filterable by topic. Each article has an auto-generated table of contents.
- **Albums**: interactive travel photo albums, one per trip, whose colors, type and synthesized sound come from the photos.
- **Contact**: email, LinkedIn and my latest resume.

The site supports light and dark mode and works on phones.

## How it's built

Plain HTML, CSS and JavaScript, with no framework and no build step. The navigation and footer are shared partials in `partials/`, injected by `js/layout.js`. All styling is in `css/site.css`.

The travel albums live in their own repository, [photo-albums](https://github.com/howard0911/photo-albums), mounted here as the `travel/` git submodule.

Run it locally:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Pushing to `master` deploys the site through GitHub Pages.

See [CLAUDE.md](CLAUDE.md) for the file layout and the steps to publish a new article.

## Contact

Email me at [howardpeng911@gmail.com](mailto:howardpeng911@gmail.com) or reach me on [LinkedIn](https://www.linkedin.com/in/sheng-hau-peng/).
