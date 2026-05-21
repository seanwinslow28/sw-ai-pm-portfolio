import { defineCollection, z } from "astro:content";

const methodRow = z.object({
  task: z.string(),
  tool: z.string(),
  cost: z.string(),
  link: z.string().nullable().optional(),
});

const fourQ = z.object({
  what: z.string(),
  why: z.string(),
  break: z.string(),
  learn: z.string(),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    // `slug` is reserved by Astro — comes from frontmatter override or filename
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

    // --- Phase 3b additions (case-study-spec Appendix B) ---
    role: z.string(),
    anchor_metric: z.string(),
    investigation_order: z.enum(["reverse", "forward"]).default("reverse"),

    methods: z.array(methodRow).min(1),

    // One of (four_q, explanation_url) is required — enforced by
    // scripts/validate_content.mjs since Zod can't express "one-of" cleanly
    // without union-discriminator gymnastics. Both fields are optional at
    // the schema level; the validator is the source of truth.
    four_q: fourQ.optional(),
    explanation_url: z.string().url().optional(),

    // --- Status-specific frontmatter (validator enforces presence per status) ---
    shipped_at: z.coerce.string().optional(),                  // SHIPPED only
    shipped_stats_endpoint: z.string().optional(),             // SHIPPED only
    return_condition: z.string().optional(),                   // PAUSED only
    archived_reference_url: z.string().url().optional(),       // ARCHIVED only
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
