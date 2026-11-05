# Design System: howard0911.github.io

## Product Context
- **What this is:** Howard Peng's personal site: who he is (data product manager, Chicago), his writing, and his travel photo albums.
- **Who it's for:** Recruiters and peers who read English, and Chinese readers of the articles. Personality comes first; it should read like a person, not a résumé.
- **Space:** Personal sites of people who write (Craig Mod, Maggie Appleton, Robin Sloan), not developer-portfolio templates.
- **Project type:** Static editorial site (home, writing index, article pages, albums, about, contact).
- **Language:** English for navigation, home, About, contact and all UI text. Article bodies are Chinese (zh-Hant). Every Chinese article title gets a one-line English gloss wherever it is listed.

## Aesthetic Direction
- **Direction:** Notebook. A self-published bilingual journal: the clarity of a math notebook with the warmth of a printed book.
- **Decoration level:** Minimal. Hairline rules, numbered sections, dates set in the margin. Typography does the work.
- **Mood:** Calm, literate, precise. Paper, ink and one burgundy.
- **Reference sites:** https://craigmod.com, https://maggieappleton.com, https://www.robinsloan.com
- **Never use:** box shadows, gradients (including radial glows), pill-shaped tags or buttons (`border-radius: 999px`), glass/backdrop blur outside the nav, dot-grid backgrounds, hover lift (`translateY`), image zoom on hover, arrow nudges, initials-in-a-gradient avatars, uppercase letter-spaced mono "kicker" labels, three-equal-card rows, "Building X for Y" headline copy.

## Typography
- **Display and reading:** Source Serif 4 (Latin) + Noto Serif TC (CJK). Source Serif and Source Han Serif / Noto Serif TC are one Adobe family, so mixed English and Chinese lines share stroke weight and rhythm. Stack: `"Source Serif 4", "Noto Serif TC", serif`.
- **UI and navigation:** IBM Plex Sans + Noto Sans TC. Stack: `"IBM Plex Sans", "Noto Sans TC", system-ui, sans-serif`. Used for nav, buttons, meta lines, filters, form fields, captions.
- **Data, dates, formulas, code:** IBM Plex Mono with `font-variant-numeric: tabular-nums`. Normal case, no letter-spacing.
- **English gloss under Chinese titles:** Source Serif 4 italic, muted color.
- **Loading (Google Fonts):**
  `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Noto+Sans+TC:wght@400;500&family=Noto+Serif+TC:wght@400;600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap`
- **Scale (size / line-height, px):**

| Role | Desktop | Mobile (≤760px) | Font, weight |
|---|---|---|---|
| Home headline | 42-46 / 1.3 | 30 / 1.35 | Serif 600, accent phrase italic 400 |
| Article title | 36-38 / 1.4 | 30 / 1.4 | Serif 700 |
| Section h2 | 24-25 / 1.4 | 22 / 1.4 | Serif 600, mono number in accent before it |
| List title, blockquote | 19 / 1.5 | 18 / 1.5 | Serif 400 |
| Body | 18 / 1.85 | 17 / 1.85 | Serif 400 |
| UI, nav, buttons | 15 / 1.6 | 15 / 1.6 | Sans 400-500 |
| Dates, margin notes | 13 / 1.7 | 13 / 1.7 | Mono 400 |

- **Chinese body:** `text-align: justify; text-justify: inter-character;` on desktop, `text-align: left` at ≤760px. Measure about 34-38 Chinese characters (680px column).

## Color
- **Approach:** Restrained. Burgundy appears only where it means something: current nav item, link hover, section numbers, the italic phrase in the home headline, the formula rule.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F7F4EE` | `#141311` | Page background |
| `--paper-2` | `#EFEBE3` | `#1C1A17` | Formula/code blocks, subtle fills |
| `--surface` | `#FFFDF8` | `#1A1816` | Form fields |
| `--ink` | `#1A1A1A` | `#E8E4DC` | Headings, primary text, strong rules |
| `--ink-body` | `#2A2724` | `#D6D1C7` | Long-form body text |
| `--muted` | `#6B6560` | `#9A938A` | Dates, meta, glosses, captions |
| `--rule` | `#D9D3C7` | `#2E2B27` | Hairlines, link underlines at rest |
| `--accent` | `#8A1C2B` | `#D97A86` | Burgundy |
| `--on-ink` | `#F7F4EE` | `#141311` | Text on ink-filled buttons |

- **Semantic (text color, used as a small label, never as a filled box):** success `#3F6B4A` / `#8DB89A`, warning `#8A5A12` / `#D7A85B`, error `#A3342A` / `#E08A7F`, info `#33557A` / `#8FB0D4`.
- **Contrast (WCAG):** ink/paper 15.9, body/paper 13.5, muted/paper 5.2, muted/paper-2 4.8, accent/paper 8.4; dark: ink 14.6, muted 6.1, accent 6.3. Semantic colors are 5.4 or higher on paper in both themes.
- **Dark mode:** Follows the OS until the visitor toggles it (`html[data-theme]`, as today). Warm near-black paper; the accent becomes a lighter rose so it keeps contrast.

## Spacing
- **Base unit:** 8px.
- **Density:** Comfortable to spacious; long-form reading comes first.
- **Scale:** 2xs(2) xs(4) sm(8) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(72).
- **Rhythm:** 64-72px between home sections; 16px vertical padding per writing-index row.

## Layout
- **Approach:** Editorial with a margin column. Home, writing index and albums index use a two-column grid: a 170px margin column (mono dates, counts, labels) + content, 32px gap. Article pages are a single centered 680px column.
- **Max container width:** 1120px, 24px side padding (18px on mobile).
- **Breakpoint:** At ≤760px the margin column stacks above its content and grids collapse to one column.
- **Home:** Nav, first-person intro (headline, short paragraph, inline text links to Resume / LinkedIn / Email), one wide travel photo (16:6.5) with a mono caption, writing index of the five newest articles as a table of contents (date | Chinese title + English gloss | topic), album thumbnails (4:5).
- **Writing index:** Ordered list with a 1px ink rule on top and hairline rules between rows. No cards, no cover thumbnails.
- **Article:** Meta line (mono date · topic · read time), title, English deck line, numbered sections (`01`, `02` in mono accent), blockquote with a 1px ink left rule, formula blocks in mono on `--paper-2` with a 2px accent left rule. Margin notes sit outside the column at ≥1180px and inline below the paragraph otherwise.
- **Border radius:** 0 for images, blocks and inputs; 2px for buttons. Nothing rounder.
- **Images:** Real photos only. The profile image is a real photo, not initials.

## Components
- **Nav:** Name in serif 600 on the left; page links in sans on the right, muted; the current item is ink with a 2px accent underline. A 1px rule below.
- **Liquid glass (nav only):** The sticky nav is the one glass surface on the site: `--glass` (paper at 70%, 66% in dark) with `backdrop-filter: blur(18px) saturate(170%)` and a 1px inset top highlight (`--glass-edge`) as its specular edge. No drop shadow, no rounded capsule. Without `backdrop-filter` support it falls back to solid paper. The mobile menu panel is solid paper.
- **Links:** Underlined, underline in `--rule` at rest and `--accent` on hover, text turns accent on hover.
- **Buttons:** Primary is ink-filled with paper text (hover: accent fill). Secondary is a 1px ink outline (hover: `--paper-2` fill). Text buttons are underlined links. Height 42px (44px under `pointer: coarse`).
- **Category filter:** Plain text tabs with a mono count; the active tab is ink with a 2px accent bottom border. No pills.
- **Inputs:** Square, `--surface` fill, hairline border with an ink bottom border; error state turns the bottom border and hint text to the error color.
- **Notes:** A mono label in the semantic color + sans text, separated by a hairline. No colored boxes or icons.
- **Focus:** 2px accent outline, 2px offset, on every interactive element.

## Motion
- **Approach:** Minimal-functional. Only color transitions on links, buttons and tabs (150ms ease-out). No transforms, no entrance animations.
- **Reduced motion:** Disable transitions under `prefers-reduced-motion: reduce`.

## Copy
- First person, specific, short. Say what Howard actually does and studied; no category slogans.
- Chinese article titles stay in Chinese; the English gloss is a plain translation of what the piece is about.

## Decisions Log
| Date | Decision | Rationale |
|---|---|---|
| 2026-11-05 | Notebook direction chosen (option A) over Ledger, Darkroom, Oxblood, Split and Big Type | The owner compared six directions side by side and picked the bilingual-journal look |
| 2026-11-05 | English is the primary language; articles stay Chinese with English glosses | Owner's requirement; glosses let English readers see what each piece covers |
| 2026-11-05 | Keep burgundy, deepen it to `#8A1C2B` | It was the only non-template element of the previous design |
| 2026-11-05 | Replace Inter and JetBrains Mono with Source Serif 4, Noto Serif TC, IBM Plex Sans and IBM Plex Mono | Inter is the default face of templated sites; the serif pairing gives English and Chinese one voice |
| 2026-11-05 | Liquid glass kept on the sticky nav only | Owner asked to keep the glass effect |
| 2026-11-05 | Agent defaults, not yet reviewed by the owner: semantic colors, type scale, justified Chinese body, English gloss wording | Set during /design-consultation; change freely |
