# Eric Li — Portfolio (2026 rebuild)

A clean, editable rebuild of the Webflow portfolio, built with **Astro**. Every project is
a self-contained "module" — its own content file + its own media folder. No Webflow, no
lock-in: just HTML/CSS/JS you own.

## Run it

```bash
npm install
npm run dev        # local dev server at http://localhost:4321
npm run build      # static output -> dist/  (deploy this anywhere)
npm run preview    # preview the built site
```

## Editing without code

Two ways, both no-HTML:

**1. Quick edits — data files.**
- `src/data/home.json` controls the homepage: the `featured` array is *which* projects
  appear as big "My Best Work" blocks and *in what order*. Reorder or swap slugs here.
- `src/content/projects/<slug>.yaml` is one project. Change text, images, order, etc.

**2. Visual editor (like Webflow) — Decap CMS.**
```bash
npm run edit       # runs the site + the CMS together
```
Then open **http://localhost:4321/admin/**. You get a UI to:
- toggle / reorder featured projects (Homepage → Homepage settings),
- edit any project's text, and
- pick images from your media library and drag-reorder gallery slides & sections.
Changes are written straight back to the data files. (When you deploy to GitHub you can
switch the backend to edit online — see the top of `public/admin/config.yml`.)

## Project modules — the whole system

Each project lives in **two places that share the slug**:

```
src/content/projects/<slug>.yaml     # the content (text, order, which images)
public/media/projects/<slug>/        # that project's images + videos
```

Image fields in the YAML are just the **filename** inside that project's folder
(e.g. `card: hero.jpg` → `public/media/projects/<slug>/hero.jpg`).

### Add a new project (3 steps)

1. `public/media/projects/my-project/` — drop your images/videos in.
2. `src/content/projects/my-project.yaml`:

```yaml
title: My New Project
order: 9
discipline: Mechanical Design · FEA
tags: [SOLIDWORKS, FEA]
employer: Company
timeframe: "2025"
role: Design Engineer
summary: One line for the card.
blurb: 2–3 lines for the featured block.
card: hero.jpg
gallery:                      # featured-block slideshow (optional)
  - { video: clip.mp4, poster: clip.jpg, alt: "..." }
  - { img: hero.jpg, alt: "..." }
highlights:                   # icon stat cards
  - { icon: gauge, value: "10x", label: "Something measurable" }
software: [SOLIDWORKS, ANSYS]         # left column of "How I built it"
skills: [Reverse Engineering, PM]     # right column
sections:                     # detail-page body (see block types below)
  - type: lead
    body: Opening line.
  - type: full
    src: hero.jpg
    caption: A caption.
```

3. (optional) add `my-project` to the `featured` list in `src/data/home.json` to promote it
   to a big homepage block. Otherwise it shows automatically as a "More Work" card.

### Section block types (detail-page body)

| `type`  | Renders |
|---------|---------|
| `lead`  | Large intro paragraph |
| `text`  | Optional heading + paragraph |
| `full`  | Full-width image (capped height) + caption |
| `pair`  | Two images side by side + caption |
| `video` | Embedded clip + caption |

### Highlight-card icons

`layers, doc, gauge, cost, shield, road, check, ruler, team, cpu`
(add more in `src/components/Icon.astro`).

## Structure

```
src/
  data/home.json              # homepage: featured order + hero clips
  content/
    config.ts                 # the project-module schema (the "contract")
    projects/*.yaml           # one file per project  ← content
  components/                 # Hero, Nav (toolbar + email/phone), FeatureBlock,
                              # ProjectCard, Icon, Footer, media/Sections
  layouts/                    # Base (+ scroll-reveal), ProjectLayout
  pages/                      # index.astro, projects/[...slug].astro, resume.astro
  styles/global.css
public/
  admin/                      # Decap CMS (visual editor)
  media/
    hero/                     # homepage hero-slideshow clips
    site/                     # headshot, resume preview
    projects/<slug>/          # per-project images + videos
  resume.pdf                  # the downloadable résumé
```

## Deploy (free)

Push to GitHub → connect to **Cloudflare Pages / Netlify / Vercel**. Build `npm run build`,
output `dist`. Point your custom domain at it. Keep the Webflow site live until DNS is switched.
