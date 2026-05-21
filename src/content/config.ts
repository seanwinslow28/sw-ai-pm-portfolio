import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    // `slug` is reserved by Astro — comes from frontmatter override or filename → entry.slug
    frame: z.enum(["A-1", "A-2", "A-3", "A-4", "A-5"]),
    title: z.string(),
    tagline: z.string().optional(),
    status: z.enum(["ACTIVE", "COMING", "PAUSED", "ARCHIVED", "SHIPPED"]),
    tags: z.array(z.string()),
    hero_media: z.string(),
    hero_media_type: z.enum(["video", "image"]),
    hero_media_alt: z.string(),
    order: z.number().int().min(1).max(5),
    date_started: z.coerce.string().optional(),
    date_active_through: z.coerce.string().optional(),
    case_study_dateline_pattern: z
      .enum(["fleet_pulse", "ship_log", "reading_log", "now_line", "ledger_row"])
      .optional(),
  }),
});

const teaserDeck = defineCollection({
  type: "data",
  schema: z.object({
    cards: z.array(
      z.object({
        cardIndex: z.number().int().min(0).max(9),
        src: z.string(),
        alt: z.string(),
        style: z.string(),
      })
    ).length(10),
  }),
});

export const collections = { work, teaserDeck };
