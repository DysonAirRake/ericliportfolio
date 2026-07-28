import { defineCollection, z } from 'astro:content';

/**
 * A "project module" = one YAML file in src/content/projects/.
 * All of a project's images/videos live in ONE folder: public/media/projects/<slug>/
 * Image fields below are just the FILENAME inside that folder (e.g. "hero.jpg").
 *
 * To add a project:
 *   1. drop assets in  public/media/projects/<slug>/
 *   2. create          src/content/projects/<slug>.yaml
 *   3. (optional) add <slug> to src/content/home.yaml -> featured list
 * The card, detail page, slideshow and nav all wire up automatically.
 */
const mediaItem = z.object({
  img: z.string().optional(),
  video: z.string().optional(),
  poster: z.string().optional(),
  alt: z.string().optional(),
});

const block = z.object({
  type: z.enum(['lead', 'text', 'full', 'pair', 'video']),
  heading: z.string().optional(),
  body: z.string().optional(),
  src: z.string().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  poster: z.string().optional(),
  a: mediaItem.optional(),
  b: mediaItem.optional(),
});

const projects = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    discipline: z.string(),
    tags: z.array(z.string()).default([]),
    employer: z.string().optional(),
    location: z.string().optional(),
    timeframe: z.string(),
    role: z.string().optional(),
    summary: z.string(),
    blurb: z.string().optional(),
    liveUrl: z.string().optional(),
    crossLink: z.object({ label: z.string(), slug: z.string() }).optional(),  // button to another project

    card: z.string(),                              // filename in the project's folder
    cardMedia: z.array(mediaItem).default([]),     // "More Work" card slideshow (video/images); falls back to card
    gallery: z.array(mediaItem).default([]),       // featured-block slideshow (falls back to card)

    // "Completed at <company>" band
    companyLogo: z.string().optional(),            // filename in /media/site/logos (else auto by employer)

    // Hero showcase: a description + the single best video/image
    showcase: z.object({
      heading: z.string().optional(),
      body: z.string().optional(),
      video: z.string().optional(),
      img: z.string().optional(),
      poster: z.string().optional(),
      youtube: z.string().optional(),   // YouTube video id (embeds a player)
      button: z.object({ label: z.string(), href: z.string() }).optional(),  // CTA under the showcase text
      // A slideshow in the single-column hero's media slot (text on one side, cycling slides on the other)
      slides: z.array(z.object({
        video: z.string().optional(), img: z.string().optional(), poster: z.string().optional(),
        title: z.string().optional(), caption: z.string().optional(),
      })).optional(),
      // Multi-column hero: optional text column + one column per media item.
      // If the showcase has no heading/body, the columns render on their own (media + title + caption).
      media: z.array(z.object({
        video: z.string().optional(),
        img: z.string().optional(),
        poster: z.string().optional(),
        youtube: z.string().optional(),
        vimeo: z.string().optional(),
        label: z.string().optional(),
        title: z.string().optional(),
        caption: z.string().optional(),
      })).optional(),
    }).optional(),

    // Additional hero blocks below the first (each like a showcase). For multi-hero pages.
    heroes: z.array(z.object({
      heading: z.string().optional(),
      body: z.string().optional(),
      flip: z.boolean().optional(),          // media on left instead of right
      video: z.string().optional(),
      img: z.string().optional(),
      poster: z.string().optional(),
      youtube: z.string().optional(),
      button: z.object({ label: z.string(), href: z.string() }).optional(),
    })).default([]),

    // Featured sub-project cards (home-page-style): title + accomplishment callouts + description + a slideshow
    features: z.array(z.object({
      title: z.string(),
      callouts: z.array(z.object({ icon: z.string(), value: z.string(), label: z.string() })).default([]),
      body: z.string().optional(),
      media: z.array(z.object({
        video: z.string().optional(), img: z.string().optional(), poster: z.string().optional(),
        title: z.string().optional(), caption: z.string().optional(),
      })).default([]),
    })).default([]),

    // Optional centered intro line above the sub-projects grid
    subprojectsIntro: z.string().optional(),
    // Three-column smaller-projects section: each column = media (single OR slideshow) + title + explanation
    subprojects: z.array(z.object({
      title: z.string(),
      img: z.string().optional(),
      video: z.string().optional(),
      poster: z.string().optional(),
      media: z.array(z.object({
        video: z.string().optional(), img: z.string().optional(), poster: z.string().optional(),
        title: z.string().optional(), caption: z.string().optional(),
      })).default([]),
      body: z.string(),
    })).default([]),

    // Project Summary & Impacts
    impact: z.string().optional(),                 // paragraph for the "Info" card
    highlights: z.array(z.object({                 // icon callout cards (with context text)
      icon: z.string(),
      value: z.string(),
      label: z.string(),
      desc: z.string().optional(),
    })).default([]),

    // How I built it — software (with logos) + skills (with icons)
    software: z.array(z.union([
      z.string(),
      z.object({ name: z.string(), desc: z.string().optional() }),
    ])).default([]),
    skills: z.array(z.string()).default([]),

    // Clickable media gallery (compact cards -> lightbox). One entry per image/video.
    media: z.array(z.object({
      img: z.string().optional(),
      video: z.string().optional(),
      poster: z.string().optional(),
      title: z.string(),
      subtitle: z.string().optional(),
      desc: z.string().optional(),
    })).default([]),

    sections: z.array(block).default([]),
  }),
});

export const collections = { projects };
