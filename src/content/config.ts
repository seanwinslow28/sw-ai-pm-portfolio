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
    // scripts/validate_content.mjs since Zod can't express "one-of" cleanly.
    four_q: fourQ.optional(),
    explanation_url: z.string().url().optional(),

    // --- Status-specific frontmatter (validator enforces presence per status) ---
    shipped_at: z.coerce.string().optional(),
    shipped_stats_endpoint: z.string().optional(),
    return_condition: z.string().optional(),
    archived_reference_url: z.string().url().optional(),
  }),
});

// ============================================================
// Phase 3c.1 — transactions collection
// Source: transactions-spec-v1.md §3.2
//        + architecture-spec-v1.md §14.1 (relatedArchitecture additive)
//        + BLUEPRINT-COMPLETE.md §5 punch-list #1
// ============================================================

const SURFACE_ENUM = ["fleet", "pipeline", "product", "writing", "infra"] as const;

const transactions = defineCollection({
  type: "content",
  schema: z.object({
    // --- Identity ---
    title: z.string(),
    dateline: z.string(),                                    // "BOSTON, MAY 13, 2026"
    shipped: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),        // ISO YYYY-MM-DD

    // --- IA + status ---
    surface: z.enum(SURFACE_ENUM),
    status: z.enum(["ACTIVE", "SHIPPED", "PAUSED", "ARCHIVED"]),

    // --- Comprehension layer ---
    valueProp: z.string().max(280),
    methods: z.array(methodRow).min(1),
    limitations: z.array(z.string()).min(1),

    // --- 4Q source (one of two required — enforced by validate_content.mjs) ---
    explanationUrl: z.string().url().optional(),
    // OR: inline-body 4Q headings (V3-bridge fallback) — validator detects the
    // presence of all 4 canonical `## What is this?` / `## Why this approach?`
    // / `## What would break?` / `## What did I learn?` h2s in the MDX body.

    // --- Cross-links (bidirectional graph; derive_crosslinks.mjs enforces resolution) ---
    relatedCaseStudy: z.string().optional(),                 // /work/<slug>
    relatedTransactions: z.array(z.string()).optional(),
    relatedEssay: z.string().optional(),                     // /essays/<slug>  (consumed in 3c.2)
    previousVersion: z.string().optional(),
    relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional(),
    // ↑ ADDITIVE per architecture-spec §14.1 / BLUEPRINT-COMPLETE §5 punch-list #1.
    //   Pure additive — legacy rows that omit the field still validate.
    //   Slug or array of slugs into /architecture/. Bidirectional via
    //   derive_crosslinks.mjs (Task 2.3). The /architecture/ surface itself
    //   ships in Phase 3c.2.

    // --- Optional editorial ---
    repoUrl: z.string().url().optional(),
    loomUrl: z.string().url().optional(),
    loomPosterUrl: z.string().url().optional(),
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

export const collections = { work, teaserDeck, transactions };
