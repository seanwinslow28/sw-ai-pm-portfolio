import { defineCollection, z } from "astro:content";

const methodRow = z.object({
  task: z.string(),
  tool: z.string(),
  cost: z.string().optional(),  // architecture-spec §3 makes cost optional
  link: z.string().nullable().optional(),
});

const fourQ = z.object({
  what: z.string(),
  why: z.string(),
  break: z.string(),
  learn: z.string(),
});

const explainer = z.object({
  src: z.string(),          // /assets/projects/explainers/<slug>.webp
  alt: z.string(),
  caption: z.string().max(160).optional(),
  interactive: z.string().optional(),  // names an interactive variant component; static src is the fallback
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
    hero_media_position: z.string().optional(),  // CSS object-position for the case-study hero crop; defaults to "center"
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

    // --- Explainer graphic (critique W3, optional) ---
    explainer: explainer.optional(),

    // --- Status-specific frontmatter (validator enforces presence per status) ---
    shipped_at: z.coerce.string().optional(),
    shipped_stats_endpoint: z.string().optional(),
    return_condition: z.string().optional(),
    archived_reference_url: z.string().url().nullable().optional(),  // null = honest shape for an ARCHIVED page with no shareable public artifact (the-block-cleanup-locked-2026-05-28 §1.4)
    ogImage: z.string().optional(),  // dedicated OG card; falls back to og-default.png when absent
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

    // --- Cross-links (bidirectional graph; derive_crosslinks.mjs enforces resolution) ---
    relatedCaseStudy: z.string().optional(),                 // /work/<slug>
    relatedTransactions: z.array(z.string()).optional(),
    relatedEssay: z.string().optional(),                     // /essays/<slug>
    previousVersion: z.string().optional(),
    relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional(),

    // --- Optional editorial ---
    repoUrl: z.string().url().optional(),
    loomUrl: z.string().url().optional(),
    loomPosterUrl: z.string().url().optional(),
  }),
});

// ============================================================
// Phase 3c.2 — architecture collection
// Source: architecture-spec-v1.md §3 + Appendix B.
// Strict deviation from §3.1: validator (Task 3.2) accepts inline-body
// 4Q as a fallback to explanationUrl, mirroring the transactions
// pattern, per Phase 3c.2 OQ-C. When upstream EXPLANATION.md ships,
// swap explanationUrl: null → real URL + drop the inline-body section.
// ============================================================

const SCORE_SYMBOL = z.enum(["✓", "✓✓", "⚠", "✗"]);

const architecture = defineCollection({
  type: "content",
  schema: z.object({
    // --- Identity ---
    title: z.string(),
    dateline: z.string(),                                    // "BOSTON, JUNE 3, 2026"
    shipped: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readingTime: z.number().int().positive(),                // minutes, manually authored (OPEN-4 default)

    // --- IA + status ---
    status: z.enum(["DRAFT", "SHIPPED"]),                    // only 2 statuses
    tags: z.array(z.string()).max(6),                        // 3-6 wire-service tags

    // --- Comprehension layer ---
    lead: z.string().max(280),
    methods: z.array(methodRow).min(1),

    // --- Canonical sources (fetched at build) ---
    // OQ-C: both fields nullable for v1; placeholders ship inline-body
    // 4Q + body. When Sean ships upstream EXPLANATION.md + the long-form
    // essay source, populate both.
    essaySourceUrl: z.string().url().nullable().optional(),
    explanationUrl: z.string().url().nullable().optional(),

    // --- Diagram (optional but expected on architecture surface) ---
    mermaidSource: z.string().optional(),                    // path under src/content/architecture/diagrams/<slug>.mmd OR inline source
    mermaidCaption: z.string().optional(),

    // --- Scoreboard (optional structured data) ---
    scoreboard: z.object({
      columns: z.array(z.string()).min(2).max(6),
      rows: z.array(z.object({
        label: z.string(),
        scores: z.array(SCORE_SYMBOL).min(2).max(6),
      })).min(2).max(8),
    }).optional(),

    // --- Honesty callouts (load-bearing credibility signal; ≤3 per page per §8.4) ---
    honestNotes: z.array(z.object({
      anchor: z.string(),                                    // section heading where callout anchors
      body: z.string(),
    })).max(3).optional(),

    // --- Cross-links (bidirectional via derive_crosslinks.mjs) ---
    relatedLedgerRow: z.string().optional(),                 // /transactions/<slug>
    relatedCaseStudy: z.string().optional(),                 // /work/<slug>
    relatedEssay: z.string().nullable().optional(),          // /essays/<slug>
    relatedArchitecture: z.array(z.string()).optional(),     // siblings

    // --- Optional editorial ---
    sourceRepoUrl: z.string().url().optional(),
    tryItYourselfUrl: z.string().url().optional(),
    tryItYourselfCommand: z.string().optional(),             // multi-line bash; rendered via Shiki
    ogImage: z.string().optional(),                          // dedicated OG card; falls back to og-default.png when absent
  }),
});

// ============================================================
// Phase 3c.2 — essays collection
// Source: essays-spec-v1.md §3 + Appendix B.
// Same OQ-C inline-body-fallback deviation as architecture.
// ============================================================

const essays = defineCollection({
  type: "content",
  schema: z.object({
    // --- Identity ---
    title: z.string(),
    subtitle: z.string().optional(),
    dateline: z.string(),                                    // "BOSTON, JUNE 19, 2026"
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    lastRevised: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
    readingTime: z.number().int().positive(),

    // --- IA + status ---
    status: z.enum(["DRAFT", "PUBLISHED"]),
    tags: z.array(z.string()).min(2).max(6),

    // --- Comprehension layer ---
    excerpt: z.string().max(280),

    // --- Canonical sources (fetched at build) ---
    // OQ-C: both nullable for v1.
    sourceUrl: z.string().url().nullable().optional(),
    explanationUrl: z.string().url().nullable().optional(),

    // --- Visual centerpiece (optional but expected for thesis-shaped essays) ---
    mermaidSource: z.string().optional(),                    // path or inline
    mermaidCaption: z.string().optional(),

    // --- Structured chart legend (parallel to architecture scoreboard) ---
    quadrantLegend: z.array(z.object({
      key: z.string(),
      label: z.string(),
      artifact: z.string().nullable().optional(),            // slug; null for negative-space callouts
    })).optional(),

    // --- Role map (structured table, validated at build per §9.2) ---
    roleMap: z.object({
      lastValidated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      rows: z.array(z.object({
        buyer: z.string(),
        position: z.string(),
        vocabularyTell: z.string(),
        jdUrl: z.string().url().optional(),        // Option A (essays-prose-locked-2026-05-28 §2.2.6): was required; now optional
        isNegativeSpace: z.boolean().optional(),   // NEW — marks the access-side contrast row (no JD; renders italic + em-dash)
      })).min(2).max(8),
    }).optional(),

    // --- Cross-links ---
    plottedArtifacts: z.array(z.string()).optional(),        // slugs; auto-reverse-rendered on each cited surface
    relatedLedgerRow: z.string().nullable().optional(),
    relatedCaseStudy: z.string().nullable().optional(),
    relatedArchitecture: z.array(z.string()).optional(),
    relatedEssays: z.array(z.string()).optional(),

    // --- Syndication + footer affordances ---
    crossPostedTo: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
    })).optional(),
    sourceRepoUrl: z.string().url().optional(),

    // --- OG ---
    ogImage: z.string().optional(),
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

// ============================================================
// Phase 3d — about + cartoons collections
// Source: about-spec-v1.md Appendix B (about) + §11.6 (cartoons).
// `about` is a singleton — exactly one entry at src/content/about/index.mdx.
// `cartoons` entries are retained content (banked); their consumer
// <CartoonCanon /> died in the 2026-08-08 About v2 recut (sidecar L11).
// ============================================================

const about = defineCollection({
  type: "content",
  schema: z.object({
    // (lead removed 2026-08-08 — the on-page title retired in Sean's round-2
    // preview review; the "Raised by..." line lives on in `description`.)

    // --- Meta ---
    // (slug is reserved by Astro content collections — auto-derived from filename;
    // omitted from the schema. The MDX frontmatter may still carry it as a harmless
    // documentation hint.)
    title: z.string(),
    description: z.string(),
    reading_time: z.number().int().min(1).max(60),

    // --- Proof-point URLs (B-5) ---
    linkedin_url: z.string().url(),
    github_url: z.string().url(),
    transactions_url: z.string(),                            // internal route — not URL-validated
    resume_url: z.string(),                                  // internal route — not URL-validated

    // --- Employment state (drives B-4) ---
    available: z.boolean(),
    current_company: z.string().nullable(),

    // --- Character (hero band) ---
    character_image: z.string(),
    character_alt: z.string(),

    // (beats[] + b3_load_bearing_cel removed 2026-08-08 — the Beats band and
    // CartoonCanon died in the sidecar-L11 About v2 recut; the six life beats
    // are banked in the anima brief lane as film material.)
  }),
});

const cartoons = defineCollection({
  type: "content",
  schema: z.object({
    order: z.number().int().min(1).max(6),
    name: z.string(),
    year_range: z.string(),
    studio: z.string(),
    image: z.string(),
    image_alt: z.string(),
    lesson_noun: z.string(),
    lesson_body: z.string(),
    angle: z.number().min(-1.5).max(1.5).optional(),
    break_grid: z.boolean().default(false),
  }),
});

/* explanations: canonical EXPLANATION.md files written by
 * fetch_canonical_sources.mjs and read via fs (never getCollection).
 * Declared so Astro stops auto-generating a deprecated collection for the
 * folder (build WARN). Markdown with no required frontmatter. */
const explanations = defineCollection({
  type: "content",
  schema: z.object({}).passthrough(),
});

export const collections = { work, teaserDeck, transactions, architecture, essays, about, cartoons, explanations };
