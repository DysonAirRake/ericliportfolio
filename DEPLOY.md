# Deploying to Cloudflare Pages

This is a static Astro site — `npm run build` produces a `dist/` folder of plain
files. Cloudflare Pages serves that folder with unlimited free bandwidth.

## Build settings (both methods use these)

| Setting                | Value           |
|------------------------|-----------------|
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node version           | 20 (pinned in `.nvmrc`; or set env var `NODE_VERSION = 20`) |

`public/_headers` sets long cache lifetimes on build assets and media — Cloudflare
applies it automatically.

---

## Method A — Git-connected (auto-deploys on every push) — recommended

1. Put this folder in a GitHub (or GitLab) repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick the repo.
3. Enter the build settings from the table above → **Save and Deploy**.
4. Every `git push` now rebuilds and redeploys automatically.

Note: the repo will contain ~100 MB of video. That deploys fine, but to keep the
repo lean you can use Git LFS for `public/media/**/*.mp4`, or move the heaviest
clips to a video host later (Cloudflare Stream / Bunny / Mux).

## Method B — Direct upload (no Git needed)

From this folder, with the site already built (`npm run build`):

```
npm install -g wrangler         # one time
wrangler login                  # opens a browser to authorize
wrangler pages deploy dist --project-name=eric-li-portfolio
```

Re-run the last command any time to publish an update. This skips Git entirely
(no repo, no history bloat).

---

## Custom domain

Pages gives you a free `*.pages.dev` URL immediately. To use your own domain:
dashboard → your Pages project → **Custom domains** → add the domain and follow
the DNS steps (HTTPS is automatic).

When you know the final domain, update `site:` in `astro.config.mjs` to it (used
for canonical/SEO URLs) and redeploy.

---

## Good to know

- **Per-file limit:** Cloudflare Pages rejects any single file over **25 MB**.
  The largest file here is a ~17.5 MB video, so it fits — but keep new clips under
  25 MB (compress or move to a video host otherwise).
- **The `/admin` visual editor (Decap CMS)** ships but won't save on the live site
  until a Git backend + auth is configured. Editing the `.yaml` files directly and
  redeploying works without it.
- **YouTube/Vimeo embeds** (Ore Production, Rover Arm) work normally once live.
