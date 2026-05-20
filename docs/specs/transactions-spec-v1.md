# `/transactions/` Ledger v1 — Build Spec

> **Status:** Drafted 2026-05-17. Awaiting Sean's lock.
> **Scope:** The `/transactions/` route — index, per-surface filter pages, per-row deep-dive pages, and the RSS feed. Inherits everything from `hero-spec-v1.md` (color, type, motion, cursor), `projects-section-spec-v1.md` (status pill vocabulary, View Transition contract), and `case-study-spec-v1.md` (Methods strip, 4Q block, EXPLANATION fetch contract).
> **The schema is the surface contract.** Every future ship that produces an `EXPLANATION.md` writes a row through this schema. Get it right once.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + the three inherited specs open.

---

## 1. The Ledger, in one sentence

A newspaper-index of every shipped artifact across the agent fleet — dense wire-service rows on cream paper, sorted desc by ship date, filtered by surface, with each row deep-diving to a comprehension page whose 4Q block reads from the canonical `EXPLANATION.md` at build time.

## 1.1 Changelog

- **2026-05-17:** Initial draft. Re-architects the V3-bridge schema (which doesn't carry forward verbatim — see §3.1). Inherits case-study spec §9.2's canonical-EXPLANATION contract. Reuses `scripts/fetch_explanations.mjs`. Slugs from the 2 (or 5, depending on cadence at crossover) V3 entries are preserved across migration. Recruiter mental model: "Sean's resume is the ledger."

---

## 2. Anatomy

### 2.1 Index page (`/transactions/` and `/transactions/<surface>/`)

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from site chrome) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON, MAY 17, 2026 — 12 artifacts this month. 9 from the fleet.   │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  Transactions                                                        │
│  Every shipped artifact, dated, with the explanation attached.       │
│                                                                      │
│  47 ARTIFACTS · UPDATED 2026-05-17 · RSS →                           │
│                                                                      │
│  ┌─ filter pills ──────────────────────────────────────────────┐    │
│  │ [ALL]  fleet  pipeline  product  writing  infra              │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ────────────────────────────────────────────────────────────────    │
│  MAY 13, 2026   FLEET    SHIPPED   Phase D — Typed Reasoning Edges  →│
│                            SQLite typed-edge layer; six relation…    │
│  ────────────────────────────────────────────────────────────────    │
│  MAY 12, 2026   PRODUCT  SHIPPED   Intent Engineering MCP            │
│                            npm + MCP registry; DNS-verified namespa… │
│  ────────────────────────────────────────────────────────────────    │
│  MAY 06, 2026   FLEET    SHIPPED   Substack Drafter (gate-b-drafts)  │
│                            Weekly Thursday drafter; HybridRouter qw… │
│  ────────────────────────────────────────────────────────────────    │
│  APR 23, 2026   PIPELINE SHIPPED   Vault Synthesizer Eval Suite      │
│                            10-case eval harness; Sonnet judge…       │
│  ────────────────────────────────────────────────────────────────    │
│  …                                                                   │
│                                                                      │
│                                                                      │
│  ─── footer fold ─────────────────────────────────────────────       │
│  → subscribe via RSS                  → view the fleet ↗             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, into site chrome footer) ╲╱╲╱╲╱╲╱╲
```

Five bands. Top to bottom: **dateline strip → page title block → filter pill row → ledger rows → footer fold (RSS + fleet links)**. Paper edge to edge. No splash. No pencil annotations on the index — the wire-service register is the editorial signal.

### 2.2 Deep-dive page (`/transactions/<slug>/`)

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from ledger or sibling deep-dive) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON, MAY 13, 2026 — phase d typed reasoning edges, shipped.      │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  FLEET · SHIPPED                                                     │
│  Phase D — Typed Reasoning Edges                                     │
│  agentic-engineering · sqlite · synthesizer                          │
│                                                                      │
│  ─── value-prop pull-quote ──────────────────────────────────       │
│  "A typed-edge SQLite layer the nightly synthesizer writes to as     │
│   a side effect of connection articles. Six relation types turn      │
│   weekly knowledge-lint contradiction detection into a SQL query     │
│   instead of an LLM scan."                                           │
│                                                                      │
│  ┌───────────────── LOOM POSTER (optional) ─────────────────────┐    │
│  │     [▶ play overlay]                                          │    │
│  └───────────────────────────────────────────────────────────────┘    │
│                                                                      │
│  ─ METHODS ─────────────────────────────────────────────────────    │
│  ┌────────────────┬──────────────────────┬─────────────────┐         │
│  │ TASK           │ AGENT / TOOL         │ MODEL / COST    │         │
│  ├────────────────┼──────────────────────┼─────────────────┤         │
│  │ edge insertion │ → /work/code-brain…   │ Sonnet 4.6 / …  │         │
│  │ sql query      │ sqlite3              │ local / $0      │         │
│  └────────────────┴──────────────────────┴─────────────────┘         │
│                                                                      │
│  ─ EXPLANATION ─────────────────────────────────────────────────    │
│  (rendered from canonical EXPLANATION.md, fetched at build)          │
│                                                                      │
│  ## What is this?                                                    │
│  ## Why this approach?                                               │
│  ## What would break?                                                │
│  ## What did I learn?                                                │
│                                                                      │
│  → read the canonical EXPLANATION.md on github ⓘ                    │
│                                                                      │
│  ─ WHAT THIS DOESN'T YET DO ──────────────────────────────────      │
│  · Contradiction detection is still rigid…                           │
│  · Nightly synthesize takes 4 minutes…                               │
│                                                                      │
│  ─ RELATED ────────────────────────────────────────────────         │
│  → part of: Code Brain (case study)                  │
│  → sister ships: Phase 6 · Vault Synthesizer Eval Suite              │
│  → supersedes: (none)                                                │
│                                                                      │
│  ─ NEXT / PREV ──────────────────────────────────────────────       │
│  ← MAY 12 INTENT ENGINEERING MCP        APR 23 EVAL SUITE →          │
│                                                                      │
│  ◐ registration mark (page closeout)                                 │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, into site chrome footer) ╲╱╲╱╲╱╲╱╲
```

Seven bands. **Dateline → title block → value-prop pull-quote → Loom (optional) → Methods strip → EXPLANATION (4Q) → Limitations → Related → Next/Prev.** Paper edge to edge. Max 2 pencil annotations (registration mark + optional "rev N" scribble if `previousVersion` is set).

---

## 3. The schema (the load-bearing contract)

### 3.1 Why re-architecting beats inheriting V3 verbatim

The V3 bridge schema carries three technical debts that compound across ~20 future ships:

1. **`beat` enum is newsroom-coded, not surface-coded.** The 3 values (`agentic-engineering` / `creative-pipeline` / `cushion-economics`) are register, not IA. The redesign needs a surface enum that maps to portfolio IA so filtering surfaces a coherent slice.
2. **`producedBy` is a free-text string** that the deep-dive page splits on `+` to fake a methods strip. Brittle. Replaced with a structured `methods[]` array (mirroring case-study spec §8.1) so the methods graph is queryable across the ledger + case-studies.
3. **`shipped` is a free-text string** (`"May 2026"`). No real sort, no RSS pubDate, no ISO display. Becomes a strict ISO date.

The 2 (or 5) V3 entries migrate once at crossover via `scripts/migrate_v3_transactions.mjs` (§11). Slugs unchanged. Bodies preserved.

### 3.2 New schema

`src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const transactionsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // --- Identity ---
    title: z.string(),
    dateline: z.string(),                          // "BOSTON, MAY 13, 2026"
    shipped: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // ISO YYYY-MM-DD

    // --- IA + status ---
    surface: z.enum(['fleet', 'pipeline', 'product', 'writing', 'infra']),
    status:  z.enum(['ACTIVE', 'SHIPPED', 'PAUSED', 'ARCHIVED']),
    // COMING is rare on the ledger — projects-level, not artifact-level.

    // --- Comprehension layer ---
    valueProp: z.string().max(280),                // 1-sentence, ~tweet length
    methods: z.array(z.object({
      task: z.string(),
      tool: z.string(),
      cost: z.string().optional(),
      link: z.string().optional(),                 // internal /work/<slug> OR external URL
    })).min(1),
    limitations: z.array(z.string()).min(1),       // "what this doesn't yet do" — V3 pattern, load-bearing

    // --- 4Q source (one of two required) ---
    explanationUrl: z.string().url().optional(),   // GitHub raw URL, fetched at build (preferred)
    // OR: the MDX body itself carries the 4Q headings inline (V3 fallback pattern)

    // --- Cross-links (bidirectional graph; build validator enforces) ---
    relatedCaseStudy: z.string().optional(),       // /work/<slug>
    relatedTransactions: z.array(z.string()).optional(),
    relatedEssay: z.string().optional(),           // /essays/<slug>
    previousVersion: z.string().optional(),        // slug of superseded ledger row
    relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional(),
    // slug or array of slugs into /architecture/; bidirectional via derive_crosslinks.mjs
    // per architecture-spec §14.1. Pure additive; legacy rows that omit the field still validate.

    // --- Optional editorial ---
    repoUrl: z.string().url().optional(),
    loomUrl: z.string().url().optional(),
    loomPosterUrl: z.string().url().optional(),

    // --- Frame number is NOT here. Frame numbers (A-1..A-5) are project-level only.
    //     Ledger rows use the dateline as the implicit ordinal.
  }),
});

export const collections = { transactions: transactionsCollection };
```

### 3.3 What's NOT in the schema (and why)

- **No `frame` field.** Frame numbers belong to the projects section's 5 case-study tiles. Ledger rows use the dateline as the ordinal.
- **No `beat` field.** Replaced by `surface`. Migration maps `beat: agentic-engineering` → `surface: fleet`, etc.
- **No `producedBy` field.** Replaced by `methods[]`.
- **No `tags` field.** The surface + status pills carry the only metadata pills on a row. Tag explosion is a template trap.
- **No `author` field.** Single-author site — Sean. Implied.
- **No `featured` flag.** The 5 case-study tiles are the curated layer; the ledger is exhaustive-by-default. Featuring within the ledger violates IA discipline.

---

## 4. Vertical budget

### 4.1 Index page — desktop (≥1024px, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | 32px | overlaps prev surface by 16px |
| Top padding | 60px | |
| **Dateline strip** | ~54px | wire-service mono; pattern is `ledger_total` — count + recent activity |
| Gap | 40px | |
| **Page title block** | ~180px | h1 "Transactions" (Newsreader `clamp(56px, 6vw, 96px)`) + Newsreader 20px subhead + mono metadata strip (`47 ARTIFACTS · UPDATED 2026-05-17 · RSS →`) |
| Gap | 48px | |
| **Filter pill row** | ~48px + 32px bottom margin | wraps on narrower viewports |
| **Ledger rows** | 60px per row + 0.5px divider; variable total | for 47 rows: ~2820px |
| Gap | 80px | |
| **Footer fold** | ~80px | `→ subscribe via RSS` + `→ view the fleet ↗` |
| Bottom padding | 60px | |
| Torn-paper bottom edge | 32px | |
| **Page height** | varies; ~3500-4000px for ~47 rows | scroll-friendly |

### 4.2 Index page — mobile (<768px)

| Slot | Adaptation |
|---|---|
| Page title | h1 clamps to ~40px |
| Filter pills | wrap onto 2-3 lines; same tap-target size |
| Ledger rows | collapse to 80px-tall blocks; dateline + status above title above valueProp; whole row is tap target |
| Footer fold | stacks: RSS on line 1, fleet on line 2 |

### 4.3 Deep-dive page — desktop

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | 32px | View-Transition seam from row title |
| Top padding | 60px | |
| **Dateline strip** | ~54px | project-specific body, pattern matches the row's surface |
| **Surface + status pills** | ~24px + 12px margin | mono row above title |
| **Title** | ~120px | Newsreader `clamp(40px, 5vw, 72px)` |
| **Tags** | ~20px + 24px margin | optional — drawn from methods task names if no separate tags |
| Gap | 48px | |
| **Value-prop pull-quote** | ~120-180px | Newsreader 24px italic, paper background, 0.5px teal top + bottom rules, max-width 680px |
| Gap | 64px | |
| **Loom** (optional) | poster: 16:9 box, max-width 880px; expands to `<dialog>` iframe on click | only if `loomUrl` present |
| Gap | 64px | |
| **Methods strip** | ~240-320px | same component as case-study §8 |
| Gap | 80px | |
| **EXPLANATION (4Q) block** | ~600px | same `<FourQBlock />` component as case-study §9; canonical-source rule applies |
| Gap | 32px | |
| **"Read the canonical EXPLANATION.md on github →"** link | ~32px | mono 13px, teal |
| Gap | 64px | |
| **Limitations block** | ~140px per 3-4 bullets | mono, "WHAT THIS DOESN'T YET DO" heading |
| Gap | 80px | |
| **Related block** (only renders if any cross-link field is set) | ~140-200px | three rows max: part of / sister ships / supersedes |
| Gap | 64px | |
| **Next/Prev nav** | ~80px | adjacent rows in ledger order |
| Bottom padding | 80px | registration mark sits in bottom-right corner |
| **Page height** | ~2400-3000px typical | shorter than case-study; the ledger is denser-information / less-narrative |

---

## 5. Type system (deltas only)

Inherits everything from hero spec §4 + case-study spec §4. Deltas for the ledger:

| Role | Font | Size (responsive) | Weight | Tracking | Color |
|---|---|---|---|---|---|
| Index page h1 | Newsreader | `clamp(56px, 6vw, 96px)` | 400 | -0.6px | `#0A3E42` |
| Index subhead | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
| Index metadata strip | JetBrains Mono | 12 (both) | 500 | 1.6px | `#546E71` |
| **Filter pill (inactive)** | JetBrains Mono | 13 (both) | 400 | 1.4px | `#546E71` |
| **Filter pill (active)** | JetBrains Mono | 13 (both) | 500 | 1.4px | `#0A3E42` + 1px amber bottom border |
| **Row dateline** | JetBrains Mono | 12 (both) | 400 | 1.2px | date portion `#7C2D12` stamp, year `#546E71` |
| **Row surface pill** | JetBrains Mono | 11 (both) | 500 | 1.6px uppercase | `#1A1A1E` ink on paper, 1px ink border |
| **Row status pill** | JetBrains Mono | 11 (both) | 500 | 1.6px uppercase | status-driven (see §6) |
| **Row title** | Newsreader | 20 / 18 | 400 | -0.2px | `#1A1A1E` (hover → 1px `#0A3E42` underline) |
| **Row valueProp 1-line** | JetBrains Mono | 12 (both) | 400 | 0.6px | `#546E71` (text-overflow: ellipsis) |
| **Deep-dive value-prop pull-quote** | Newsreader | 24 / 20 | 300 italic | -0.2px | `#0A3E42` |
| Deep-dive Limitations heading | JetBrains Mono | 14 (both) | 500 | 2.4px | `#0A3E42` |
| Deep-dive Limitations body | JetBrains Mono | 13 / 12 | 400 | 0.6px | `#546E71` |
| Related block heading | JetBrains Mono | 14 (both) | 500 | 2.4px | `#0A3E42` |
| Related block link | JetBrains Mono | 14 / 13 | 500 | 0.8px | `#0A3E42` (underline on hover) |
| Footer fold link | JetBrains Mono | 13 (both) | 500 | 1.2px | `#0A3E42` |

**Voice register by surface** (PMP §3.3):
- Index page: wire-service mono throughout. **No Sedaris opener.** The h1 + subhead are the only Newsreader on the index — and the subhead is sober/declarative, not personal-warm.
- Deep-dive page: wire-service top-to-bottom. The 4Q block's "What did I learn?" closer carries whatever warmth the canonical `EXPLANATION.md` has. No additional opener; no Sedaris paragraph above the title block.

---

## 6. Color rules (status pills + the chromatic-per-row rule)

Inherits the case-study §5 base palette unchanged. **One chromatic per row** rule — only one color block per ledger row to keep the index visually flat.

| Element | Color rule |
|---|---|
| Surface pill | `#1A1A1E` ink on paper. **No surface-specific color.** All surfaces look the same; the label IS the differentiation. |
| Status pill (ACTIVE) | stamp amber `#7C2D12` text, 1px stamp amber border, paper bg |
| Status pill (SHIPPED) | success teal `#0F6E56` text, 1px success teal border, paper bg |
| Status pill (PAUSED) | secondary ink `#546E71` text, 1px secondary ink border, paper bg |
| Status pill (ARCHIVED) | secondary ink `#546E71` text @ 70% opacity, 1px @ 70% opacity, paper bg |
| Row title (default) | `#1A1A1E` |
| Row title (hover) | `#1A1A1E` + 1px `#0A3E42` underline appearing from left, 200ms |
| Row background (hover) | `rgba(10, 62, 66, 0.04)` |
| Row divider | 0.5px `rgba(10, 62, 66, 0.15)` |

KILL: recency badges, "NEW" pills, amber wash on rows shipped within N days. The dateline IS the recency signal.

---

## 7. Filter pills + per-surface routing

### 7.1 The filter contract

v1 ships **surface filter only.** No year filter, no status filter, no tag filter, no full-text search.

Pills wrap as a single static row above the ledger. Each pill is a real `<a>` element pointing at a build-time-generated per-surface page:

| Pill | Target route |
|---|---|
| **ALL** | `/transactions/` |
| fleet | `/transactions/fleet/` |
| pipeline | `/transactions/pipeline/` |
| product | `/transactions/product/` |
| writing | `/transactions/writing/` |
| infra | `/transactions/infra/` |

Active pill carries `aria-current="page"` + 1px `#7C2D12` (stamp amber) bottom border + weight 500.

### 7.2 Why per-surface SSG pages (not client-side filter)

Three reasons: (1) zero JS dependency for navigation; (2) SEO-friendly per-surface URLs that share-link cleanly; (3) consistent with hero/projects/case-study principle of "no client-side library for navigation." The cost is ~6 extra static pages at build time — negligible.

### 7.3 Empty filter state

When a per-surface page has zero rows:

```
No artifacts in <surface> yet. Check back ~<next ship date for that surface>.
```

The next-ship date pulls from `next-piece.json` (the same file the home projects section's "next in production" card reads) — filtered to rows whose target `surface` matches the empty view.

### 7.4 Out of scope for v1 filter

- Year filter (deferred until ledger >50 rows or recruiter feedback signals a need)
- Status filter (intentionally killed — see §3.3 "what's NOT in the schema")
- Tag filter (intentionally killed)
- Full-text search (deferred — the ledger is short enough to scan)
- Combined filters (deferred — single-axis filter is the v1 discipline)

---

## 8. Row anatomy + interaction

### 8.1 Desktop row (60px tall)

```
┌─────────────────────────────────────────────────────────────────────┐
│ MAY 13, 2026   FLEET    SHIPPED   Phase D — Typed Reasoning Edges  →│
│                                    SQLite typed-edge layer; six rel │
└─────────────────────────────────────────────────────────────────────┘
   ↑              ↑        ↑         ↑                              ↑
   dateline      surface  status    title (Newsreader 20px)        glyph
   (mono 12)    (mono 11) (mono 11) valueProp (mono 12, 1-line)
```

**Grid template:** `grid-template-columns: 120px 80px 96px 1fr 24px;` on desktop. The title + valueProp share the 1fr column; valueProp is a second line truncated with ellipsis.

### 8.2 Mobile row (80px tall)

```
┌────────────────────────────────────┐
│ FLEET  SHIPPED       MAY 13, 2026  │
│ Phase D — Typed Reasoning Edges →  │
│ SQLite typed-edge layer; six rel…  │
└────────────────────────────────────┘
```

Stacks: line 1 = surface + status + dateline (justify-between), line 2 = title + glyph, line 3 = valueProp.

### 8.3 Hover + click

| Event | Behavior |
|---|---|
| Hover (desktop) | Row bg → `rgba(10, 62, 66, 0.04)`; title gets 1px `#0A3E42` underline animating from left (200ms ease); `→` glyph translates 4px right |
| Click | Navigate to `/transactions/<slug>/` via Astro 5 `<ClientRouter />` View Transition |
| View Transition target | Row title shares `view-transition-name: ledger-title-<slug>` with the deep-dive `<h1>` — title morphs across surfaces |
| Touch tap (mobile) | Brief 100ms invert (paper bg → ink bg, ink text → paper text) for tactile feedback |
| Reduced motion | All hover animations + View Transition disabled; instant navigation |

### 8.4 Accessibility

Each row is a single `<a href="/transactions/<slug>/">` wrapping the grid contents, with `aria-label="View transaction: <title>, shipped <date>"`. Surface + status pills are visual metadata (`aria-hidden="true"` on the pills themselves; the aria-label conveys the same content).

Tab order: filter pills → row 1 → row 2 → … → footer fold links.

---

## 9. Deep-dive page (§2.2)

### 9.1 Sections, in render order

1. **Dateline strip** — wire-service mono, project-specific body (e.g., `BOSTON, MAY 13, 2026 — phase d typed reasoning edges, shipped.`)
2. **Surface + status pill row** — mono uppercase, paper, above title
3. **Title** — Newsreader, clamp(40, 5vw, 72)
4. **Tags** *(optional)* — mono, dot-separated, secondary ink; rendered from a `tags:` frontmatter field if added later — **not in v1 schema** (see §3.3 "no tags")
5. **Value-prop pull-quote** — Newsreader 24px italic, max-width 680px, 0.5px teal rules top + bottom, paper background
6. **Loom poster** *(optional)* — only when `loomUrl` is set; click expands to `<dialog>` with native `<iframe>`; single Loom per page
7. **Methods strip** — shared `<MethodsStrip />` component from case-study spec §8; cross-link rule applies
8. **EXPLANATION (4Q) block** — shared `<FourQBlock />` component from case-study spec §9; canonical-source rule (§9.2 below)
9. **"Read the canonical EXPLANATION.md on github →"** link — mono 13px teal; URL = `repoUrl + '/blob/main/<path>/EXPLANATION.md'` or the `explanationUrl` upgraded to its HTML view
10. **Limitations block** — "WHAT THIS DOESN'T YET DO" heading + bulleted list rendered from `limitations[]` frontmatter
11. **Related block** *(conditional)* — only renders if any cross-link field is set:
    - `→ part of: <case-study title>` (when `relatedCaseStudy` resolves)
    - `→ sister ships: <transaction title 1> · <transaction title 2>` (when `relatedTransactions` resolves)
    - `→ supersedes: <transaction title>` / `← superseded by: <transaction title>` (bidirectional via `previousVersion`)
    - `→ read the essay: <essay title>` (when `relatedEssay` resolves)
12. **Next/Prev nav** — adjacent rows in ledger order (desc by `shipped`); wraps around at ledger boundaries
13. **Registration mark** — bottom-right corner, amber, page closeout

### 9.2 The 4Q source rule (inherits case-study spec §9.2)

Every transaction MDX file **must** declare one of two contracts:

- **`explanationUrl:` present (preferred).** Build-time script `scripts/fetch_explanations.mjs` (the *same* script case-study spec §15 uses) curls the file, validates the 4 canonical headings, writes to `src/content/explanations/<slug>.md`. The page renders that file.
- **Inline body 4Q (V3-bridge legacy fallback).** The MDX body itself carries `## What is this?` / `## Why this approach?` / `## What would break?` / `## What did I learn?` as h2 headings. Used for the 2 migrated V3 entries until they earn external `EXPLANATION.md` files in their respective repos.

The build validator (`scripts/validate_transactions.mjs`) asserts every MDX has one of the two. Build fails on both-missing.

### 9.3 Pencil annotations (≤2 per deep-dive page)

| # | Annotation | When it fires |
|---|---|---|
| 1 | **Registration mark** | Always — page closeout, bottom-right |
| 2 | **"rev N" scribble** | Only if `previousVersion` is set — rendered near the title, top-right |

No coffee ring, no curved arrows, no kid drawings. The ledger deep-dive is denser-information / less-narrative than a case-study — fewer annotations earn their keep.

### 9.4 Related block — bidirectional, build-derived

The Related block is *never* hand-maintained. `scripts/derive_crosslinks.mjs` (§11) reads the entire content graph and:

- Auto-fills "← superseded by" on a row whose slug appears as another row's `previousVersion`
- Auto-fills the case-study's "What's on the ledger from this project" section from `relatedCaseStudy` references
- Auto-fills the essay's "← supporting ledger artifacts" from `relatedEssay` references
- Rejects dangling slugs at build time (e.g., row says `relatedCaseStudy: foo` but `/work/foo/` doesn't exist)

---

## 10. RSS feed (`/transactions/rss.xml`)

### 10.1 Implementation

`src/pages/transactions/rss.xml.ts` — Astro endpoint using `@astrojs/rss`:

```ts
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const transactions = await getCollection('transactions');
  return rss({
    title: 'Sean Winslow — Transactions',
    description: 'Every shipped artifact, dated, with the explanation attached.',
    site: context.site,
    items: transactions
      .sort((a, b) => b.data.shipped.localeCompare(a.data.shipped))
      .map((t) => ({
        title: t.data.title,
        link: `/transactions/${t.slug}/`,
        pubDate: new Date(t.data.shipped),
        description: t.data.valueProp,
        // Full 4Q content as content:encoded (read from src/content/explanations/<slug>.md)
        content: /* HTML render of the canonical EXPLANATION.md */,
      })),
    customData: `<language>en-us</language>`,
  });
}
```

### 10.2 Why full content, not summaries

The RSS feed is the **email-signature subscribe affordance** — the cold-open URL recruiters paste into their reader once they've read the manifesto and want the cadence without bookmarking. Full content (the entire 4Q per row) means the comprehension artifact reaches the subscriber's reader directly — no "click to read more" friction. Aligns with the comprehension-first thesis: the explanation IS the value, surface it everywhere it can be surfaced.

### 10.3 Discoverability

- `<link rel="alternate" type="application/rss+xml" href="/transactions/rss.xml" title="Sean Winslow — Transactions" />` in BaseLayout `<head>`
- "RSS →" link in the index page's metadata strip
- "→ subscribe via RSS" in the index page's footer fold
- "→ subscribe via RSS" in the site-chrome global footer (specced in spec #4)

### 10.4 Out of scope for v1

- Aggregated root feed at `/rss.xml` (transactions + essays). Deferred until `/essays/` has >1 entry.
- Per-surface RSS feeds (`/transactions/fleet/rss.xml`). Deferred — single ledger feed is the v1 discipline.
- JSON Feed (`feed.json`). Deferred — RSS 2.0 is universal.
- Push notifications / email digest. Out of scope for the portfolio.

---

## 11. Build pipeline (scripts)

### 11.1 Five scripts, three prebuild gates

| Script | When it runs | What it does |
|---|---|---|
| `scripts/migrate_v3_transactions.mjs` | **One-shot, at crossover only.** Run manually; commit output; delete. | Reads the V3-bridge content collection from a sibling clone of `~/Code-Brain/sw-portfolio/`. Maps `beat → surface`, parses "May 2026" → ISO `shipped`, splits `producedBy` → `methods[]` (Sean reviews + manually corrects each). Writes new MDX into `src/content/transactions/` with slugs unchanged. |
| `scripts/fetch_explanations.mjs` | `prebuild` hook | Walks `work` + `transactions` collections. For each MDX with `explanationUrl:`, curls the GitHub raw URL with ETag-based caching (`.cache/explanations.lockfile`). Validates the 4 canonical headings. Writes to `src/content/explanations/<slug>.md`. Falls back to cached files on network failure. Fails the build if a remote `EXPLANATION.md` is missing the 4Q headings. |
| `scripts/validate_transactions.mjs` | `prebuild` hook | Asserts every MDX has: valid ISO `shipped`, surface in enum, status in enum, `methods` ≥1 entry, `limitations` ≥1 entry, either `explanationUrl` OR inline 4Q headings in the body, all cross-link slugs resolve to real files. Fails build on any violation. |
| `scripts/derive_crosslinks.mjs` | `prebuild` hook (after validate) | Builds the bidirectional cross-link graph. Writes `src/content/crosslinks.json` with reverse-lookup tables (`<slug> → list of rows that reference it as relatedCaseStudy/relatedTransactions/previousVersion`). The Related block on each deep-dive page reads this file. |
| Daily Driver write step | runtime (08:45 daily) | Reads `src/content/transactions/*.md` filesystem; computes ledger count + most-recent title; if a new row landed in the last 24h, sets hero `dateline.json` pattern to `ledger_row` with the rendered body string. Single source of truth — see §13 hero wiring. |

**`derive_crosslinks.mjs` — error message contract:** when the script rejects a dangling slug, the error names (a) the offending file path, (b) the offending field name, (c) the offending slug value, (d) the closest matching real slug if Levenshtein distance ≤ 2. Example: `[derive_crosslinks] src/content/work/animation-pipeline.mdx — relatedArchitecture: "vault-scorcard" — no such architecture slug. Did you mean "vault-scorecard"?` This matters because at v1 most cross-link fields are aspirational (`relatedArchitecture`, `relatedEssay`, `relatedTransactions`); one typo will break the build, and the error needs to point at the typo, not at a generic "dangling slug" message.

### 11.2 Build performance

- Index + 6 per-surface pages: ~7 static HTML files
- Deep-dive pages: 1 per row (~50 at scale)
- RSS endpoint: 1 file
- **Target full build time:** <30s for 50-row ledger. EXPLANATION fetch cache should keep incremental builds at <10s.

### 11.3 Anti-stack

- No headless CMS. Vault-as-CMS — Sean edits MDX in his vault/repo directly.
- No client-side filter library. Build-time SSG per filter.
- No third-party RSS service. `@astrojs/rss` only.
- No analytics on transactions pages by default. (Add a single Plausible script later if needed — no per-page event tracking.)
- No `react-markdown`. MDX renders natively in Astro.

---

## 12. Crossover migration (the 2-or-5 existing entries)

### 12.1 Manifest of inherited entries

As of 2026-05-17, the V3 bridge has 2 committed entries (Glob-verified):

- `phase-d-typed-edges.md` — `beat: agentic-engineering` → `surface: fleet`, `shipped: "May 2026"` → `2026-05-13` ISO
- `knowledge-loop-phase-6.md` — `beat: agentic-engineering` → `surface: fleet`, `shipped: "May 2026"` → `2026-05-20` ISO

The kickoff cites 5 entries (intent-engineering MCP, vault-synthesizer eval suite, substack-drafter gate-b-drafts, Phase D, Phase 6) — the other 3 are either not yet committed to the V3 bridge or are roadmap commitments expected to land between now and crossover. **The migration plan handles N entries; the script is run against whatever exists at crossover time.**

### 12.2 Migration script behavior

`scripts/migrate_v3_transactions.mjs` is one-shot:

1. Reads `~/Code-Brain/sw-portfolio/src/content/transactions/*.md`
2. For each file:
   - Preserves the slug (filename)
   - Preserves the MDX body verbatim (the inline 4Q headings carry forward — the new schema's "inline body" fallback contract honors this)
   - Maps `beat` to new `surface` enum (see §12.3 table)
   - Prompts Sean interactively for the ISO `shipped` date (the V3 strings are too coarse to auto-convert reliably)
   - Splits `producedBy` on `+` → `methods[]` array (Sean reviews each row)
   - Sets `status: SHIPPED` for all migrated rows (all 2 committed V3 entries are in fact shipped)
   - Drops `loomFrame` (the redesign's `loomPosterUrl` carries the editorial-photo moment instead of a frame label)
3. Writes new MDX files at `src/content/transactions/<slug>.md` in the redesign repo
4. Commits with a `migrate: v3 → redesign schema` message

### 12.3 Beat → surface mapping table

| V3 `beat` | Redesign `surface` | Notes |
|---|---|---|
| `agentic-engineering` | `fleet` | Default for the autonomous-agent stack |
| `creative-pipeline` | `pipeline` | Animation pipeline, Seedream rendering, frame interpolation |
| `cushion-economics` | `product` OR `infra` | Manual review per row — "cushion economics" was V3's vault-as-cushion thesis; the surface depends on whether the row is *about* a product (`product`) or the underlying infrastructure (`infra`) |

The migration script does NOT mass-map `cushion-economics` — it flags those rows for manual surface assignment.

#### Free-text → canonical `surface` remap (forward-looking)

The unified roadmap and the V3 bridge author `surface` as free-text (the V3 schema is permissive). The redesign's enum is strict (`fleet` / `pipeline` / `product` / `writing` / `infra`). To prevent every new ledger row from failing the validator at crossover, the migration script consumes the canonical mapping below — defaulting per row, with Sean overriding at the interactive prompt when needed.

| Free-text input (V3 bridge + roadmap authoring) | Canonical `surface` enum value |
|---|---|
| `MCP server` (Task 1 intent-engineering-mcp; future Task 10 vault-knowledge-mcp) | `product` |
| `eval harness` (Task 8 vault-synthesizer-eval-suite) | `fleet` |
| `SDK agent` (Task 9 substack-drafter) | `fleet` |
| `control-plane interceptor` (Task 12 judge-layer) | `fleet` |
| `manifesto / thesis` (Task 13 meaning-over-access ledger row) | `writing` |
| `architecture writeup` (Task 14 control-architecture; Task 15 vault-scorecard) | `infra` |
| `agentic-engineering` (V3 `beat`, Phase D + Phase 6) | `fleet` |
| `creative-pipeline` (V3 `beat`, animation work) | `pipeline` |
| `cushion-economics` (V3 `beat`, vault-as-cushion thesis) | **manual per row** — `product` OR `infra` per the §12.3 note above |

This table is real-data, not example data. `scripts/migrate_v3_transactions.mjs` (§11.1) is the consumer of record; the interactive prompt default-suggests the canonical value but lets Sean override per row.

### 12.4 SEO + link equity preservation

- Slugs are byte-identical pre/post crossover
- All V3 routes resolve in the redesign: `/transactions/phase-d-typed-edges/`, `/transactions/knowledge-loop-phase-6/`
- No 301 redirects needed (slugs match)
- The V3 bridge repo stays committed and non-destructive — it lives on as a historical reference, never deployed again

---

## 13. Hero dateline `ledger_row` pattern — wiring confirmed

Hero spec §8 declared the `ledger_row` rotation pattern. This spec confirms the wiring:

**Source of truth:** `src/content/transactions/*.md` filesystem.

**Producer:** The Daily Driver agent (08:45 daily) reads the content collection's files (already accessible since the agent runs in the same vault). It:

1. Counts total entries
2. Identifies entries with `shipped >= today - 24h` (new arrivals overnight, rare)
3. Identifies entries with `status: ACTIVE` (live in-flight rare-for-ledger)
4. **Pattern wins when:** a new ledger row landed in the last 24h. Otherwise other patterns win.

**Rendered string examples:**

| Scenario | Rendered body |
|---|---|
| New row landed yesterday | `intent-engineering MCP shipped 5/12. 9 artifacts on the ledger. fleet green.` |
| Two new rows landed | `2 ships overnight: judge layer + vault scorecard. 12 artifacts on the ledger.` |
| No new row, but `status: ACTIVE` exists | `judge layer in review. 9 artifacts on the ledger. 3 active.` |

**Writer:** Daily Driver writes `dateline.json` per hero spec §8 schema; no separate file or API. The home hero page renders the JSON unchanged. Single dateline source per day.

**Build-time alternative considered + rejected:** computing `ledger_row` at build was considered, but it doesn't work — the hero needs daily rotation across 5 patterns, only one of which is `ledger_row`. The pattern-selection logic must live in the Daily Driver. Build-time injection of the *count* alone was rejected because the Daily Driver already has filesystem access.

---

## 14. Cross-link contracts (what surfaces ↔ what)

The ledger + case studies + essays form one graph. Build-time-derived, bidirectional, validated.

| Source field | Target | Bidirectional surface |
|---|---|---|
| `relatedCaseStudy: animation-pipeline` (on ledger row) | `/work/animation-pipeline/` | Ledger row Related block shows "→ part of: 2D Animation Pipeline". Case-study page gains a "What's on the ledger from this project" section auto-listing every ledger row pointing here. |
| `relatedTransactions: [phase-6]` (on ledger row) | `/transactions/phase-6/` | Both rows' Related blocks show each other as "sister ships". |
| `previousVersion: phase-6` (on Phase D row) | `/transactions/phase-6/` | Phase D shows "→ supersedes: Phase 6". Phase 6 shows "← superseded by: Phase D" (auto-derived). |
| `relatedEssay: access-vs-meaning` (on ledger row) | `/essays/access-vs-meaning/` | Ledger row shows "→ read the essay". Essay page gains a "← supporting ledger artifacts" section auto-listing every row that names it. |
| `relatedArchitecture: vault-scorecard` (on ledger row; slug or `string[]`) | `/architecture/vault-scorecard/` | Ledger row shows "→ architecture writeup". Architecture page gains a "← shipped on the ledger" section auto-listing every row that names it. Bidirectional via `derive_crosslinks.mjs`; mirrors the `relatedLedgerRow` direction declared by architecture-spec §14.1. |
| Methods strip cell `link: /work/<slug>` (on ledger deep-dive) | `/work/<slug>/` | Same cross-link rule as case-study spec §8.2 — Methods cells become internal links. |

**The opinionated bit:** every cross-link is declared in **one place only** (the source row), and every reverse surface is **auto-derived** at build. Sean never maintains a bidirectional pair manually. The graph stays consistent because the derivation script enforces it.

**Validator behavior on missing targets:** `scripts/validate_transactions.mjs` fails the build with a clear message: `"transactions/phase-d-typed-edges.md: relatedCaseStudy 'foo-bar' does not resolve to /work/foo-bar/ (no MDX file at src/content/work/foo-bar.mdx)"`.

---

## 15. View Transition wiring

Two View Transition seams the ledger participates in:

| Seam | `view-transition-name` | Direction |
|---|---|---|
| Ledger row → deep-dive | `ledger-title-<slug>` on both row title + deep-dive `<h1>` | Row → deep-dive (forward); back button restores |
| Case-study Methods strip cell → ledger row | `ledger-row-from-methods-<slug>` on both | Optional, **v2 deferred** — risks too many shared name targets per page |

**v1 ships only the row → deep-dive title morph.** The Methods strip cross-link is a real navigation (with `<ClientRouter />` View Transition for the page-level fade), but no shared-element morph.

Fallback: browsers without View Transitions (Firefox <128, older Safari) get instant navigation. Functional, less cinematic.

---

## 16. Accessibility (deltas only; inherits case-study §14 baseline)

- Each row is a single `<a>` with `aria-label="View transaction: <title>, shipped <date>"`. Surface + status pills are `aria-hidden="true"` (the aria-label conveys the same).
- Filter pills are real `<a>` elements; active pill carries `aria-current="page"`.
- Index page heading hierarchy: `<h1>` = "Transactions"; subhead is a `<p>`; metadata strip is a `<p>`. Filter pills sit in a `<nav aria-label="Filter by surface">`.
- Deep-dive page heading hierarchy: `<h1>` = title; surface + status are visually-positioned-above-title but **after** the `<h1>` in DOM order; `<h2>` for each of the 5 main sections (Value-prop / Methods / EXPLANATION / Limitations / Related / Next-Prev). The 4 Q-headings within the 4Q block are `<h3>` (subordinate to the section `<h2>`).
- Loom poster: focusable `<button>` that opens `<dialog>`; ESC closes; focus returns to the button on close.
- Status pills carry the status as text always (`ACTIVE` / `SHIPPED` / etc.) — never icon-only.
- Color contrast on the success-teal SHIPPED status pill: `#0F6E56` on paper = 7.1:1 (AAA at 11px+ at weight 500 — clears).
- The 70%-opacity ARCHIVED status pill: `#546E71` @ 0.7 on paper = 4.6:1 (passes AA at 11px+ weight 500 — clears, but only just; do not desaturate further).
- Reduced motion: row hover animations + View Transition + Loom poster zoom-in all disabled per the standard `prefers-reduced-motion` block.

---

## 17. Build stack (deltas only; inherits hero §13 baseline)

| Layer | Choice | Why |
|---|---|---|
| Content collection | Astro 5 `defineCollection` (`type: 'content'`) | Same primitive `work` uses |
| RSS | `@astrojs/rss` | Official Astro adapter; build-time generated |
| Per-surface SSG | Astro 5 `getStaticPaths()` per `src/pages/transactions/[surface]/index.astro` | One file, multiple static outputs |
| Cross-link derivation | Node script in `prebuild` | Pure JS, no deps |
| EXPLANATION fetch + cache | Reuses `scripts/fetch_explanations.mjs` from case-study spec | Single source of fetched files |
| MDX rendering | Astro built-in `@astrojs/mdx` | Already in stack |

---

## 18. Definition of Done

`/transactions/` v1 ships when:

1. `src/content/config.ts` declares the new schema per §3.2 with all fields + `min` constraints.
2. `scripts/migrate_v3_transactions.mjs` has been run; the 2 (or more) V3 entries exist in `src/content/transactions/` with slugs preserved and surfaces correctly mapped.
3. `scripts/validate_transactions.mjs` runs in `prebuild` and rejects any MDX missing required fields or with unresolved cross-link slugs.
4. `scripts/fetch_explanations.mjs` runs in `prebuild` and successfully fetches every `explanationUrl`; legacy V3 entries fall back to inline-body 4Q.
5. `scripts/derive_crosslinks.mjs` runs in `prebuild` and writes `src/content/crosslinks.json`; deep-dive Related blocks render auto-derived reverse links correctly.
6. The index page at `/transactions/` renders all rows in desc `shipped` order with the row anatomy per §8.1.
7. Per-surface pages (`/transactions/fleet/`, `/transactions/pipeline/`, etc.) render correctly with active filter pill state + `aria-current="page"`.
8. Empty filter state renders per §7.3 when a per-surface page has zero rows.
9. Each `/transactions/<slug>/` deep-dive page renders all 13 sections per §9.1, including the value-prop pull-quote and the conditional Related block.
10. The 4Q block on every deep-dive page either fetches from canonical `explanationUrl` (preferred) or renders inline-body 4Q (V3 fallback) — both contracts work.
11. View Transition seam: clicking a row title morphs into the deep-dive `<h1>` via shared `view-transition-name`. Tested Chrome + Safari; Firefox falls back to instant nav.
12. RSS feed at `/transactions/rss.xml` validates against the RSS 2.0 spec; carries full 4Q content as `content:encoded`; sort order matches the index.
13. The hero `ledger_row` dateline pattern fires correctly when a new ledger row landed in the last 24h (manual verification by setting `shipped` to today and re-running Daily Driver).
14. Reduced motion: row hover animation + View Transition + Loom poster zoom-in all gracefully disable.
15. Lighthouse Performance ≥95 on the index page (100% static); Accessibility ≥95; Best Practices = 100.
16. Recruiter cold-read test: a fresh reader can describe (a) what the ledger is, (b) what surface a chosen row belongs to, (c) where to read the canonical 4Q for any row, within 60 seconds of landing. Re-run on the live build.

When all 16 are green, `/transactions/` v1 is locked and we move to `/architecture/` (spec #2).

---

## 19. Out of scope for v1 — and open questions

### Out of scope

- **Year filter.** Deferred until ledger >50 rows or recruiter feedback signals a need.
- **Tag filter.** Killed — surface + status carry the only metadata pills.
- **Status filter.** Killed — discipline is "see the body of work in order."
- **Full-text search.** Deferred — ledger is short enough to scan.
- **Combined filters.** Deferred — single-axis is the v1 discipline.
- **Aggregated root RSS feed at `/rss.xml`.** Deferred until `/essays/` has >1 entry.
- **Per-surface RSS feeds.** Deferred — single ledger feed is the v1 discipline.
- **JSON Feed.** Deferred — RSS 2.0 is universal.
- **Methods strip cross-link View Transition morph.** v2 deferred (§15).
- **Recency badges, "NEW" pills, amber wash on recent rows.** Killed — dateline IS the recency signal.
- **Pencil annotations on the index page.** Killed — wire-service register = no scribbles.
- **A featured/curated row order.** Killed — the 5 case-study tiles are the curated layer; the ledger is exhaustive-by-default.
- **Per-page analytics events.** Out — Plausible script (if added) covers page-view only.
- **Email digest / newsletter form.** Out — `/essays/` may carry that affordance (TBD in spec #3); `/transactions/` carries RSS only.

### Open questions (flagged inline)

**[OPEN-1: Surface enum values (§3.2)]** — proposed `[fleet, pipeline, product, writing, infra]`. The 5-value count mirrors the projects-spec status count (visual continuity). But this is a **5-future-year contract**, not just v1 — every future ship picks one of these. Should `writing` exist as a surface when essays have their own IA? Or should `writing` collapse into `product` (the manifesto IS a product) or `fleet` (the substack-drafter IS a fleet tool)? **Recommended default:** keep all 5; the substack-drafter belongs in `writing` (the *tooling* is the artifact), while the manifesto itself lives at `/essays/` and only appears on the ledger if it warrants its own ledger row (likely yes — it's a published artifact with a 4Q). Confirm.

**[OPEN-2: 4Q source for v1 ledger rows (§9.2)]** — the 2 committed V3 entries have inline-body 4Q (no external `EXPLANATION.md`). The 3 expected-at-crossover entries (intent-engineering MCP, eval suite, substack-drafter) **do** have external `EXPLANATION.md` per code-brain repo. **Recommended default:** new entries default to `explanationUrl:` (canonical lives in the artifact's repo). V3 entries stay inline-body until they earn external EXPLANATIONs in their repos. Confirm migration plan accepts dual-mode for ~3-6 months until backfill is complete.

**[OPEN-3: Substack-drafter / manifesto duality on the ledger (§3.3, OPEN-1 dependency)]** — does the manifesto (Task 13) appear as a ledger row when it publishes ~6/19? The kickoff says "the URL in the email signature" is the manifesto, not the ledger. **Recommended default:** yes, the manifesto is a ledger row with `surface: writing`, `relatedEssay: access-vs-meaning`. Recruiter who lands on the ledger sees it; recruiter who clicks through hits the full essay at `/essays/access-vs-meaning/`. Two surfaces, one artifact, one canonical 4Q. Confirm before `/essays/` spec is written (spec #3).

**[OPEN-4: Daily Driver `ledger_row` rendered-body authorship (§13)]** — three example body templates are sketched in §13's table. The Daily Driver agent picks one based on overnight signal. **Recommended default:** lock the 3 templates in the spec; agent picks; agent doesn't free-form. Confirm the templates are sufficient or expand.

**[OPEN-5: Loom embed budget (§9.1 step 6)]** — each deep-dive page allows one optional Loom. Is the budget always 1, or could a row warrant a 2-Loom layout (e.g., the MCP row has install + demo)? **Recommended default:** strict 1-Loom max. A row needing 2 videos should split into 2 rows or get a case study. Confirm.

---

## Appendix A — File map (additions to case-study spec's map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── transactions/
│   │       ├── index.astro                      ← `/transactions/` (ALL filter)
│   │       ├── [surface]/
│   │       │   └── index.astro                  ← `/transactions/<surface>/` SSG per filter
│   │       ├── [slug].astro                     ← `/transactions/<slug>/` deep-dive
│   │       └── rss.xml.ts                       ← RSS endpoint
│   ├── components/
│   │   └── transactions/
│   │       ├── LedgerRow.astro                  ← single row (60px desktop, 80px mobile)
│   │       ├── FilterPills.astro                ← static pill row, real <a> links
│   │       ├── IndexHeader.astro                ← h1 + subhead + metadata strip
│   │       ├── ValuePropPullQuote.astro         ← deep-dive pull-quote
│   │       ├── LoomPoster.astro                 ← thumb + <dialog> iframe
│   │       ├── LimitationsBlock.astro           ← "WHAT THIS DOESN'T YET DO" + bullets
│   │       ├── RelatedBlock.astro               ← reads src/content/crosslinks.json
│   │       └── FooterFold.astro                 ← "subscribe via RSS" + "view the fleet ↗"
│   ├── content/
│   │   ├── transactions/                        ← MDX rows, migrated + new
│   │   ├── explanations/                        ← fetched at build (shared w/ case-study)
│   │   └── crosslinks.json                      ← derived at build
│   └── scripts/
│       ├── migrate_v3_transactions.mjs          ← one-shot, run at crossover, then deleted
│       ├── validate_transactions.mjs            ← prebuild gate
│       ├── derive_crosslinks.mjs                ← prebuild, after validate
│       └── fetch_explanations.mjs               ← SHARED with case-study spec, already in stack
└── public/
    └── api/
        └── dateline.json                        ← from hero spec; Daily Driver writes `ledger_row`
                                                   pattern body computed from src/content/transactions/
```

---

## Appendix B — MDX frontmatter shape

```yaml
---
# --- Identity ---
title: "Phase D — Typed Reasoning Edges"
dateline: "BOSTON, MAY 13, 2026"
shipped: "2026-05-13"

# --- IA + status ---
surface: fleet
status: SHIPPED

# --- Comprehension layer ---
valueProp: "A typed-edge SQLite layer the nightly synthesizer writes to as a side effect of connection articles. Six relation types turn weekly knowledge-lint contradiction detection into a SQL query instead of an LLM scan."
methods:
  - task: edge insertion
    tool: Code Brain (synthesizer)
    cost: Sonnet 4.6 (HybridRouter)
    link: /work/code-brain
  - task: sql query
    tool: sqlite3
    cost: local / $0
    link: null
  - task: schema enforcement
    tool: SQLite CHECK constraints
    cost: local / $0
    link: null
limitations:
  - "Contradiction detection is still rigid; it flags syntax differences as logical conflicts."
  - "Nightly synthesize takes 4 minutes because it queries the entire graph."

# --- 4Q source (one of two required) ---
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/agents-sdk/lib/concept_edges/EXPLANATION.md
# OR omit explanationUrl and put the 4Q headings in the MDX body (V3 fallback)

# --- Cross-links (all optional; build validator enforces resolution) ---
relatedCaseStudy: code-brain
relatedTransactions:
  - knowledge-loop-phase-6
  - vault-synthesizer-eval-suite
relatedEssay: null
previousVersion: null
relatedArchitecture: null      # slug, list of slugs, or null — bidirectional via derive_crosslinks.mjs

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/code-brain
loomUrl: null
loomPosterUrl: null
---

(MDX body — when explanationUrl is set, the body is rendered above the 4Q block as
optional extended context; when omitted, the body MUST carry the 4 canonical h2
headings as the inline-body fallback contract.)
```

---

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `projects-section-spec-v1.md`, `case-study-spec-v1.md`, and `transactions-spec-v1.md` end-to-end. The hero, projects section, and case-study route are presumed built per their own specs. Build `src/pages/transactions/` per Appendix A, components per the same map. Implement `src/content/config.ts` with the new `transactions` schema per §3.2. Implement the four scripts per §11.1 — `migrate_v3_transactions.mjs` runs once interactively (Sean confirms each row's ISO date + methods array + surface mapping during the run); `validate_transactions.mjs`, `derive_crosslinks.mjs`, and the shared `fetch_explanations.mjs` run as `prebuild` hooks in `package.json`. Wire the RSS endpoint at `src/pages/transactions/rss.xml.ts` per §10.1. Extend the Daily Driver agent to compute the `ledger_row` hero dateline pattern per §13. Drop pencil annotations from the index page; max 2 on each deep-dive page per §9.3. Stop when the 16 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Awaits Sean's lock. Open questions flagged in §19.*
