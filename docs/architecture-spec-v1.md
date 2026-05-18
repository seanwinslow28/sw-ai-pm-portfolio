# `/architecture/` Route v1 — Build Spec

> **Status:** Drafted 2026-05-17. Awaiting Sean's lock.
> **Scope:** The `/architecture/` route — index, per-writeup deep-dive pages, RSS feed. Inherits everything from `hero-spec-v1.md`, `projects-section-spec-v1.md`, `case-study-spec-v1.md`, and `transactions-spec-v1.md`.
> **First occupant:** Vault Scorecard (Task 15, ships 2026-06-03). Second occupant ~1 week later: `vault-knowledge-mcp` (Task 10, ~2026-06-04). Possible third: Control Architecture (Task 14, ~2026-06-10) — see `[OPEN-1]` §16.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + the four inherited specs open.

---

## 1. The Architecture Route, in one sentence

A sober, paper-on-ink editorial surface for **architectural arguments** — thesis-shaped writeups whose canonical long-form essays live upstream in `claude-code-superuser-pack/docs/`, fetched at build, rendered with embedded Mermaid `erDiagram`s and flat comparison tables, where the honesty calibration (`HONEST NOTE — Linear wins`) is the load-bearing credibility signal.

## 1.1 Changelog

- **2026-05-17:** Initial draft. Establishes /architecture/ as the third top-level IA surface (alongside /transactions/ + /work/), specifically for **architectural arguments** (thesis-shaped, comparison-based) — distinct from /transactions/ which is for **shipped systems**. An artifact can appear on both surfaces with the same slug, cross-linked. Requires an **additive** update to `transactions-spec-v1.md` §3.2 — adding `relatedArchitecture: string \| string[]` as an optional field on the ledger schema (see §15.4). No removals or renames to the locked transactions spec.

---

## 2. Anatomy

### 2.1 Index page (`/architecture/`)

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from site chrome) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON, JUNE 3, 2026 — vault scorecard shipped. 1 writeup.          │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  Architecture                                                        │
│                                                                      │
│  Most people see Obsidian as content. I treat my vault as agent      │
│  infrastructure.                                                     │
│                                                                      │
│  Architectural arguments where the proof is the code, linked.        │
│                                                                      │
│  2 WRITEUPS · UPDATED 2026-06-04 · RSS →                             │
│                                                                      │
│  ────────────────────────────────────────────────────────────────    │
│  JUN 03, 2026   SHIPPED   Vault as Agent Infrastructure              │
│                            5-test scoreboard scoring Notion / def.   │
│                            Obsidian / Linear / Sean's vault. Two     │
│                            failures, three passes.                   │
│                            ┌─ er-diagram thumb ─┐                    │
│                            │  ▮▯▮ schema ▮▯▮    │                    │
│                            └────────────────────┘                    │
│  ────────────────────────────────────────────────────────────────    │
│  JUN 04, 2026   SHIPPED   Vault Knowledge MCP — Design               │
│                            The MCP wrapping the only public PM vault │
│                            that passes all five Nate tests.          │
│                            ┌─ er-diagram thumb ─┐                    │
│                            │  ▮▯▮ schema ▮▯▮    │                    │
│                            └────────────────────┘                    │
│  ────────────────────────────────────────────────────────────────    │
│                                                                      │
│                                                                      │
│  ─── footer fold ─────────────────────────────────────────────       │
│  → subscribe via RSS                  → view the fleet ↗             │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom) ╲╱╲╱╲╱╲╱╲
```

Five bands. **Dateline → page title block (h1 + 1-line hook + sober subhead + metadata strip) → writeup rows → footer fold.** Paper edge to edge. The 1-line hook is the page's only Newsreader serif moment above the rows; the subhead beneath is sober/declarative.

### 2.2 Deep-dive page (`/architecture/<slug>/`)

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON, JUNE 3, 2026 — vault as agent infrastructure, scored.       │
│                                          8 MIN READ                  │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  ARCHITECTURE · SHIPPED                                              │
│  Vault as Agent Infrastructure                                       │
│  agent-infrastructure · sqlite · obsidian · linear                   │
│                                                                      │
│  ─── thesis pull-quote ─────────────────────────────────────────    │
│  "Three passes, two failures, and the failures are where             │
│   vault-knowledge-mcp and the Judge Layer are going next."           │
│                                                                      │
│  ── Lead ───────────────────────────────────────────────             │
│  Newsreader 20px weight 300, max-width 680px. ~2-3 paragraphs        │
│  defining what "agent infrastructure" means in Nate's vocabulary.    │
│  No Sedaris — sober/declarative throughout.                          │
│                                                                      │
│                                                                      │
│  ── Persistent State ──────────────────────────────────              │
│  Newsreader 32px weight 500 section heading (NOT hand-drawn SVG).    │
│  Diagnostic question verbatim from Nate. Sean's vault answer with    │
│  permalinks to ≥1 specific file or commit. Comparison row.           │
│                                                                      │
│  [code snippet — Shiki, 0.5px teal border, mono]                     │
│                                                                      │
│  ── Defined Verbs ─────────────────────────────────                  │
│  …                                                                   │
│                                                                      │
│  ── Ownership ─────────────────────────────────                     │
│                                                                      │
│  ┌─ HONEST NOTE ──────────────────────────────────────┐             │
│  │ Linear is genuinely better here. That gap is exactly│             │
│  │ why vault-knowledge-mcp matters — it's the first    │             │
│  │ step toward giving the vault Linear-grade ownership │             │
│  │ semantics on the axes that matter for agent control.│             │
│  └─────────────────────────────────────────────────────┘             │
│  (mono, wire-service register; visual punctuation                    │
│   against the surrounding Newsreader prose)                          │
│                                                                      │
│  ── Permissions ────────────────────────────────                    │
│  …                                                                   │
│                                                                      │
│  ── Queryable Audit History ──────────────────                       │
│  …                                                                   │
│                                                                      │
│  ┌─ ER DIAGRAM — concept_edges schema (Mermaid SVG) ──┐             │
│  │   ┌──────────┐  supports / contradicts /            │             │
│  │   │ concept  │─ evolved_into / supersedes /         │             │
│  │   │          │  depends_on / related_to             │             │
│  │   └──────────┘                                      │             │
│  │   concept_edges schema — 6 relation types,          │             │
│  │   validated against 47 production edges             │             │
│  └─────────────────────────────────────────────────────┘             │
│                                                                      │
│                                                                      │
│  ─── SCOREBOARD ────────────────────────────────────────             │
│  ┌─────────────────┬──────┬──────┬──────┬──────┬──────┐              │
│  │                 │ STATE│ VERBS│ OWN  │ PERM │ AUDIT│              │
│  ├─────────────────┼──────┼──────┼──────┼──────┼──────┤              │
│  │ Notion          │  ✗   │  ✗   │  ✓   │  ✓   │  ⚠   │              │
│  │ Obsidian (def.) │  ⚠   │  ⚠   │  ✗   │  ✗   │  ✗   │              │
│  │ Linear          │  ✓   │  ✓   │  ✓✓  │  ✓✓  │  ✓   │              │
│  │ Sean's vault    │  ✓✓  │  ✓✓  │  ⚠   │  ⚠   │  ✓✓  │              │
│  └─────────────────┴──────┴──────┴──────┴──────┴──────┘              │
│  (all 4 rows visually identical. equality of presentation            │
│   IS the honesty signal.)                                            │
│                                                                      │
│                                                                      │
│  ── Where the vault loses, and why those losses are the roadmap ──   │
│  Closing section. Names Task 10 + Task 12 by their work product.     │
│                                                                      │
│                                                                      │
│  ┌─ TRY IT YOURSELF ────────────────────────────────────┐            │
│  │ The synthetic public vault fixture is reproducible:  │            │
│  │                                                      │            │
│  │   git clone <repo>                                   │            │
│  │   cp -r examples/public_vault_fixture/ /tmp/test_vault│           │
│  │   AGENT_VAULT_PATH=/tmp/test_vault python3 …         │            │
│  │                                                      │            │
│  │ → examples/public_vault_fixture/ on github           │            │
│  └──────────────────────────────────────────────────────┘            │
│                                                                      │
│                                                                      │
│  ─ METHODS ─────────────────────────────────────────────────────    │
│  ┌────────────────┬──────────────────────┬─────────────────┐         │
│  │ TASK           │ AGENT / TOOL         │ MODEL / COST    │         │
│  ├────────────────┼──────────────────────┼─────────────────┤         │
│  │ persistent state│ SQLite + git + JSONL│ local / $0      │         │
│  │ typed edges    │ → /work/superuser…   │ Sonnet 4.6      │         │
│  │ er diagram gen │ scripts/generate_sc… │ stdlib / $0     │         │
│  │ fixture author │ Sean + LLM seed      │ ~$0.10          │         │
│  └────────────────┴──────────────────────┴─────────────────┘         │
│                                                                      │
│  ─ EXPLANATION (4Q) ───────────────────────────────────────         │
│  (rendered from canonical EXPLANATION.md, fetched at build)          │
│                                                                      │
│  ## What is this?                                                    │
│  ## Why this approach?                                               │
│  ## What would break?                                                │
│  ## What did I learn?                                                │
│                                                                      │
│  → read the canonical EXPLANATION.md on github ⓘ                    │
│  → view the long-form source on github ⓘ                            │
│                                                                      │
│  ─ RELATED ────────────────────────────────────────────────         │
│  → ledger row: /transactions/vault-scorecard/                        │
│  → companion case study: 2D Animation Pipeline (Methods cross-ref)   │
│  → next architecture writeup: Vault Knowledge MCP (Design)           │
│                                                                      │
│  ─ NEXT / PREV ──────────────────────────────────────────────       │
│  (none)        ←                       JUN 04 VAULT KNOWLEDGE MCP →  │
│                                                                      │
│  ◐ registration mark (page closeout)                                 │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom) ╲╱╲╱╲╱╲╱╲
```

**Eleven bands.** Dateline → title block → thesis pullquote → essay body (multi-section Newsreader, with mono `HONEST NOTE` callout + Mermaid ER diagram + flat scoreboard table embedded inline) → "Try it yourself" callout → Methods strip → 4Q block → Related → Next/Prev. **Paper edge to edge. One pencil annotation max (registration mark, page closeout).**

---

## 3. The schema

`src/content/config.ts` adds an `architecture` collection alongside `transactions`:

```ts
const architectureCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // --- Identity ---
    title: z.string(),
    dateline: z.string(),                          // "BOSTON, JUNE 3, 2026"
    shipped: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    readingTime: z.number().int().positive(),     // minutes

    // --- IA + status ---
    status: z.enum(['DRAFT', 'SHIPPED']),         // only 2 statuses on architecture surface
    tags: z.array(z.string()).max(6),             // 3-6 wire-service tags, e.g., ["agent-infrastructure", "sqlite", "obsidian", "linear"]

    // --- Comprehension layer ---
    lead: z.string().max(280),                    // 1-line thesis (the pullquote)
    methods: z.array(z.object({
      task: z.string(),
      tool: z.string(),
      cost: z.string().optional(),
      link: z.string().optional(),
    })).min(1),

    // --- Canonical sources (fetched at build) ---
    essaySourceUrl: z.string().url(),             // raw GitHub URL of the long-form essay (e.g., docs/VAULT_AS_AGENT_INFRASTRUCTURE.md)
    explanationUrl: z.string().url(),             // raw GitHub URL of the 4Q EXPLANATION.md (REQUIRED on architecture pages — no inline-body fallback)

    // --- Diagram (optional) ---
    mermaidSource: z.string().optional(),         // path under src/content/architecture/diagrams/ OR inline source string
    mermaidCaption: z.string().optional(),

    // --- Scoreboard (optional structured data) ---
    scoreboard: z.object({
      columns: z.array(z.string()).min(2).max(6), // test names, e.g., ["STATE","VERBS","OWN","PERM","AUDIT"]
      rows: z.array(z.object({
        label: z.string(),                        // system name, e.g., "Notion"
        scores: z.array(z.enum(['✓','✓✓','⚠','✗'])).min(2).max(6),
      })).min(2).max(8),
    }).optional(),

    // --- Honesty callouts (the load-bearing credibility signal) ---
    honestNotes: z.array(z.object({
      anchor: z.string(),                         // section heading where the callout lands
      body: z.string(),
    })).optional(),

    // --- Cross-links ---
    relatedLedgerRow: z.string().optional(),
    relatedCaseStudy: z.string().optional(),
    relatedEssay: z.string().optional(),
    relatedArchitecture: z.array(z.string()).optional(),

    // --- Optional editorial ---
    sourceRepoUrl: z.string().url().optional(),   // top-level repo URL (e.g., github.com/seanwinslow/claude-code-superuser-pack)
    tryItYourselfUrl: z.string().url().optional(),// fixture / demo URL (e.g., github.com/.../examples/public_vault_fixture)
    tryItYourselfCommand: z.string().optional(),  // ~3-line code snippet rendered in the callout
  }),
});
```

### 3.1 What's NOT in the schema (and why)

- **No `surface` field.** Architecture writeups are all the same surface — themselves. No filter axis exists on this route in v1 (small index, ~3-8 entries).
- **No `valueProp` (per ledger).** Replaced by `lead` — semantically clearer for architecture surface, where the 1-line is a *thesis*, not a value pitch.
- **No `loomUrl`.** Architecture writeups aren't Loom-shaped. If a writeup wants embedded video, that's a future v2 extension.
- **No `limitations[]` (per ledger).** Honesty calibration on architecture pages happens via `honestNotes[]` instead — anchored to specific sections, more structurally honest than a generic "what this doesn't do" list.
- **No inline-body 4Q fallback.** Architecture writeups *must* have a canonical `EXPLANATION.md` — no legacy V3 entries to migrate, so the strict canonical-only rule applies from day one.
- **No `previousVersion`.** Architecture writeups don't supersede in this iteration. If a writeup evolves (e.g., Vault Scorecard v2), that's a content edit upstream, not a new MDX.

---

## 4. Vertical budget

### 4.1 Index page — desktop

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top | 32px | overlaps prev surface by 16px |
| Top padding | 60px | |
| **Dateline strip** | ~54px | pattern `architecture_total` — count + recent ship signal (auto-injected; not a new Daily Driver pattern, just a build-time render — see §13) |
| Gap | 40px | |
| **Page title block** | ~240px | h1 "Architecture" (Newsreader `clamp(56px, 6vw, 96px)`) + 1-line Newsreader-italic hook (`clamp(20px, 2.4vw, 32px)`) + sober Newsreader 18px subhead + mono metadata strip |
| Gap | 56px | |
| **Writeup rows** | ~140px per row + 0.5px divider | 3-5 rows expected in v1 |
| Gap | 80px | |
| **Footer fold** | ~80px | `→ subscribe via RSS` + `→ view the fleet ↗` |
| Bottom padding | 60px | |
| Torn-paper bottom | 32px | |
| **Page height** | ~1300-1800px for 3-5 rows | shorter than ledger; small editorial hub |

### 4.2 Deep-dive page — desktop

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top | 32px | |
| Top padding | 60px | |
| **Dateline + reading-time strip** | ~54px | reading-time mono in top-right |
| **Surface + status pills row** | ~24px + 12px margin | `ARCHITECTURE · SHIPPED` mono uppercase |
| **Title** | ~120px | Newsreader `clamp(40px, 5vw, 72px)` |
| **Tags** | ~20px + 24px margin | mono, dot-separated |
| Gap | 48px | |
| **Thesis pullquote** | ~140-200px | Newsreader 24px italic, max-width 680px, 0.5px teal rules |
| Gap | 64px | |
| **Essay body** | variable; ~2,200-2,800px for a 2,000-word essay | Newsreader 20px weight 300, max-width 680px, line-height 1.6; section headings = Newsreader 32px weight 500 (sober — NOT hand-drawn SVG); embedded ER diagram, scoreboard, code blocks, and HONEST NOTE callouts inline |
| Gap | 64px | |
| **Try It Yourself callout** | ~200-260px | optional; mid-essay placement permitted |
| Gap | 80px | |
| **Methods strip** | ~240-320px | shared `<MethodsStrip />` component from case-study §8 |
| Gap | 80px | |
| **4Q block** | ~600px | shared `<FourQBlock />` from case-study §9; canonical-only contract |
| Gap | 32px | |
| **Two "Read the canonical →" links** | ~64px | one for EXPLANATION.md, one for the long-form source |
| Gap | 64px | |
| **Related block** | ~140-200px | bidirectional cross-link auto-derivation, mirrors ledger spec §14 |
| Gap | 64px | |
| **Next/Prev nav** | ~80px | adjacent architecture writeups in `shipped` desc order; wraps at ends |
| Bottom padding | 80px | registration mark sits bottom-right |
| **Page height** | ~3500-4400px typical | longer than ledger deep-dive (2-3× the prose); the essay is the artifact |

---

## 5. Type system (deltas only)

Inherits hero §4 + case-study §4 + ledger §5. Deltas for /architecture/:

| Role | Font | Size (responsive) | Weight | Tracking | Color |
|---|---|---|---|---|---|
| Index page h1 | Newsreader | `clamp(56px, 6vw, 96px)` | 400 | -0.6px | `#0A3E42` |
| **Index page 1-line hook** | Newsreader | `clamp(20px, 2.4vw, 32px)` | 300 italic | -0.2px | `#1A1A1E` |
| Index page sober subhead | Newsreader | 18 / 16 | 300 | -0.1px | `#546E71` |
| Index page metadata strip | JetBrains Mono | 12 (both) | 500 | 1.6px | `#546E71` |
| **Writeup row title** | Newsreader | 22 / 20 | 400 | -0.2px | `#1A1A1E` (hover → 1px `#0A3E42` underline) |
| Writeup row lead | Newsreader | 16 / 15 | 300 | -0.1px | `#546E71` (wraps to 2-3 lines max) |
| **Deep-dive thesis pullquote** | Newsreader | `clamp(22px, 2.8vw, 32px)` | 300 italic | -0.3px | `#0A3E42` |
| **Essay body** | Newsreader | 20 / 18 | 300 | -0.1px line-height 1.6 | `#1A1A1E` |
| **Essay section heading** | Newsreader | `clamp(28px, 3.2vw, 40px)` | 500 | -0.4px | `#0A3E42` |
| **HONEST NOTE prefix** | JetBrains Mono | 12 (both) | 500 | 1.8px | `#7C2D12` (stamp amber) |
| **HONEST NOTE body** | JetBrains Mono | 14 / 13 | 400 | 0.4px line-height 1.5 | `#546E71` |
| Code block | JetBrains Mono | 13 (both) | 400 | 0.2px line-height 1.5 | Shiki theme over portfolio palette |
| **Scoreboard header row** | JetBrains Mono | 11 (both) | 500 | 1.8px uppercase | `#0A3E42` |
| **Scoreboard cell** | JetBrains Mono | 13 (both) | 400 | 0.4px | `#1A1A1E` (label col), inline SVG symbols (score cols) |
| **Scoreboard symbol ✓** | inline SVG | 14×14px | — | — | `#0F6E56` (success teal) |
| **Scoreboard symbol ✓✓** | inline SVG | 14×14px | — | — | `#0F6E56` weight 700 stroke |
| **Scoreboard symbol ⚠** | inline SVG | 14×14px | — | — | `#7C2D12` (stamp amber) |
| **Scoreboard symbol ✗** | inline SVG | 14×14px | — | — | `#546E71` (secondary ink) |
| Mermaid ER diagram | Mermaid SVG, palette override | — | — | — | nodes in `#0A3E42`, edges in `#546E71`, paper bg |
| Mermaid caption | JetBrains Mono | 12 (both) | 400 | 0.8px | `#546E71` |
| Try-it-yourself callout header | JetBrains Mono | 12 (both) | 500 | 1.8px uppercase | `#7C2D12` |
| Try-it-yourself callout body | JetBrains Mono | 13 (both) | 400 | 0.4px line-height 1.5 | `#1A1A1E` |
| Permalink `#` glyph (hover-revealed) | JetBrains Mono | 14 (both) | 500 | 0 | `#FAC775` (amber mid-stop) |
| "Read the canonical →" link | JetBrains Mono | 13 (both) | 500 | 1.0px | `#0A3E42` |

**Voice register by section** (PMP §3.3 — architecture is a fourth row in addition to the existing three):

| Section | Register |
|---|---|
| **All editorial-narrative prose** (essay body, lead, section headings) | **Sober/declarative.** No Sedaris, no comedic juxtaposition. Newsreader 20px weight 300. |
| **HONEST NOTE callouts** | **Wire-service mono.** The register switch IS the visual emphasis against surrounding Newsreader. |
| **Scoreboard, Methods strip, code blocks** | **Wire-service mono.** Machine-data register. |
| **Dateline, title block, tags** | **Wire-service mono.** Inherits site convention. |
| **Index page 1-line hook** | **Editorial-italic.** The single Newsreader-italic moment above the writeup rows. Quotable. Memorable. |

**The opinionated bit:** architecture is the **most austere voice register on the site**. About has warmth + cels; ledger has wire-service density; case studies have Sedaris openers. Architecture has none of those — it's prose + code + diagrams + flat tables. **Register-switching IS the visual punctuation** — the mono HONEST NOTE callouts inside Newsreader essay prose are the load-bearing visual signal.

---

## 6. Color rules

Inherits case-study §5 + ledger §6 unchanged. Architecture-specific tokens:

| Element | Color rule |
|---|---|
| HONEST NOTE callout border | 1px `#546E71` (secondary ink) — left border only, 24px padding |
| HONEST NOTE callout background | `#FFF9F0` (paper) — same as page bg, no visual fill |
| Try-it-yourself callout border | 1px `#0A3E42` (teal) — left border only, 24px padding |
| Try-it-yourself callout background | `rgba(10, 62, 66, 0.04)` — faint teal wash to distinguish from HONEST NOTE |
| **Scoreboard rows — equality rule** | **All rows visually identical.** No row highlight, no Sean's-vault accent, no zebra striping. The reader reaches the conclusion from the symbols. |
| Scoreboard outer border | 0.5px `rgba(10, 62, 66, 0.15)` |
| Scoreboard internal grid | 0.5px `rgba(10, 62, 66, 0.10)` |
| Mermaid ER diagram bg | `#FFF9F0` (paper) — diagram sits on paper, not in a tinted box |
| Code block bg | `rgba(10, 62, 66, 0.04)` |
| Code block border | 0.5px `rgba(10, 62, 66, 0.15)` |

KILL: row highlight on Sean's vault scoreboard row, gradient backgrounds on the HONEST NOTE, "success" green wash on passing tests. Flat presentation IS the credibility.

---

## 7. The flat scoreboard table

### 7.1 Render contract

The scoreboard is **structured frontmatter data**, not freeform Markdown. The MDX page's `scoreboard:` field carries the column names + row labels + symbol matrix; a single `<Scoreboard />` Astro component reads the data and renders the table.

```yaml
scoreboard:
  columns: ["STATE", "VERBS", "OWN", "PERM", "AUDIT"]
  rows:
    - label: "Notion"
      scores: ["✗", "✗", "✓", "✓", "⚠"]
    - label: "Obsidian (default)"
      scores: ["⚠", "⚠", "✗", "✗", "✗"]
    - label: "Linear"
      scores: ["✓", "✓", "✓✓", "✓✓", "✓"]
    - label: "Sean's vault"
      scores: ["✓✓", "✓✓", "⚠", "⚠", "✓✓"]
```

### 7.2 Why structured, not Markdown table

Three reasons: (1) symbol rendering is consistent — Markdown emoji renders differently across browsers, structured data uses custom inline SVG with palette tokens; (2) accessibility — semantic table with `<caption>` + `<thead>` + `<tbody>` + cell `aria-label="passes"` for each symbol; (3) print stylesheet support — print version renders the scoreboard as text labels (`passes / partial / fails`) instead of symbols.

### 7.3 Symbol legend

Renders below the scoreboard table, mono 11px secondary ink:

```
✓✓ exceeds · ✓ passes · ⚠ partial · ✗ fails
```

### 7.4 Mobile

Scoreboard stays as a horizontally-scrollable table (`overflow-x: auto`) on viewports <768px. Right-fade gradient indicates scrollability. **No transformation to card layout** — equality of presentation rule extends to mobile.

---

## 8. The HONEST NOTE callout

The load-bearing credibility signal. Visually distinct, structurally honest, never optional when an honest calibration exists.

### 8.1 Render

```html
<aside class="honest-note">
  <header class="honest-note__prefix">HONEST NOTE —</header>
  <p class="honest-note__body">
    Linear is genuinely better here. That gap is exactly why
    vault-knowledge-mcp matters — it's the first step toward
    giving the vault Linear-grade ownership semantics on the
    axes that matter for agent control.
  </p>
</aside>
```

### 8.2 Source

Each honest note is declared in frontmatter `honestNotes[]` with an `anchor` (section heading where it appears) + `body` (the prose). The MDX render uses a `<HonestNote anchor="ownership" />` directive to anchor the callout where the section heading lives.

```yaml
honestNotes:
  - anchor: ownership
    body: "Linear is genuinely better here. That gap is exactly why vault-knowledge-mcp matters..."
  - anchor: permissions
    body: "Filesystem permissions only. Linear's RBAC is the upgrade path."
```

### 8.3 Why wire-service mono inside Newsreader essay prose

The Newsreader essay prose is the architectural argument. The mono HONEST NOTE is the **author stepping outside the argument to calibrate it.** The register switch signals "I am the author, not the case." This is the structural honesty the surface lives on — Tier-1 recruiters detect calibration; the register switch reinforces it visually.

### 8.4 No more than 3 per page

Density rule: ≤3 HONEST NOTEs per architecture page. Each one earns its place. More than 3 dilutes the signal into self-flagellation. Vault Scorecard's 2 honest notes (Ownership + Permissions, per Task 15 Step 1) are the calibration. A third is reserved for emergent honesty.

---

## 9. Mermaid ER diagram

### 9.1 Source

The Mermaid `erDiagram` source lives at `src/content/architecture/diagrams/<slug>.mmd`. The architecture MDX frontmatter's `mermaidSource: "diagrams/concept-edges-erd.mmd"` points at it.

Alternative: inline `mermaidSource: "erDiagram\n  concept ||--o{ ..."` for short diagrams. Either form works; the build script handles both.

### 9.2 Rendering

`astro-mermaid` integration in `astro.config.mjs`. Configured at build time (NOT runtime) — output is inline SVG on the rendered page. No client-side JS for the diagram.

Palette override via Mermaid `themeVariables`:

```js
mermaid: {
  theme: 'base',
  themeVariables: {
    background: '#FFF9F0',
    primaryColor: '#FFF9F0',
    primaryTextColor: '#0A3E42',
    primaryBorderColor: '#0A3E42',
    lineColor: '#546E71',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '13px',
  },
}
```

### 9.3 Caption

Mono 12px secondary ink, below the diagram. Source: `mermaidCaption:` field in frontmatter.

### 9.4 Mobile

Diagram scales with `max-width: 100%`. If the source SVG is wider than the viewport, wrap in `overflow-x: auto` with a right-fade gradient indicator. Don't render a "simplified" version — that's content drift.

### 9.5 Fallback

If `astro-mermaid` fails to render (Mermaid syntax error, missing source file), the build *succeeds* but the page renders a `<pre>` fallback showing the raw Mermaid source. The validator (§11) catches this in CI before deploy.

---

## 10. The "TRY IT YOURSELF" callout

### 10.1 Render

Optional. Renders only when `tryItYourselfUrl` is set in frontmatter.

```yaml
tryItYourselfUrl: https://github.com/seanwinslow/claude-code-superuser-pack/tree/main/examples/public_vault_fixture
tryItYourselfCommand: |
  git clone https://github.com/seanwinslow/claude-code-superuser-pack
  cp -r claude-code-superuser-pack/examples/public_vault_fixture /tmp/test_vault
  AGENT_VAULT_PATH=/tmp/test_vault python3 ./agents-sdk/scripts/query.py "what brewing methods compete with espresso?"
```

### 10.2 Placement

Mid-essay, **after** the closing essay section ("Where the vault loses, and why those losses are the roadmap") and **before** the Methods strip. The callout closes the essay's argument with reproducibility.

### 10.3 Visual register

1px teal left border, faint teal wash bg, mono throughout, "TRY IT YOURSELF —" uppercase prefix in stamp amber. The teal wash distinguishes it from the HONEST NOTE callout (paper bg, no fill).

### 10.4 Code snippet rendering

The `tryItYourselfCommand` value is rendered as a `<pre>` block with Shiki syntax highlighting (`bash` lexer). Inside the callout box. No line numbers — the brevity is the signal.

---

## 11. Build pipeline (scripts)

### 11.1 Five scripts, three prebuild gates

| Script | When | Role |
|---|---|---|
| `scripts/fetch_canonical_sources.mjs` | `prebuild` | **Extends the case-study `fetch_explanations.mjs`** — renamed to handle three content collections. Walks `work` + `transactions` + `architecture`. For each MDX with `explanationUrl`, curls + validates 4 canonical headings + writes to `src/content/explanations/<slug>.md`. For each architecture MDX with `essaySourceUrl`, curls + writes to `src/content/architecture/essays/<slug>.md`. ETag-cached via `.cache/canonical-sources.lockfile`. |
| `scripts/validate_architecture.mjs` | `prebuild` | Asserts: every MDX has all required fields; `essaySourceUrl` + `explanationUrl` resolve (HEAD checks); cross-link slugs resolve to real files in their respective collections; `shipped` is valid ISO; `status` in enum; `scoreboard` row/column counts consistent; `mermaidSource` file exists when set; `honestNotes[].anchor` matches a real section heading in the fetched essay (warning, not error — heading may have been edited upstream between fetches). |
| `scripts/derive_crosslinks.mjs` | `prebuild` (after validate) | **Extended** to include the architecture collection. Builds bidirectional reverse-lookup tables: a ledger row with `relatedArchitecture: vault-scorecard` auto-renders "→ read the architectural argument" in its Related block; an architecture page with `relatedLedgerRow: vault-scorecard` auto-renders "→ ledger row". Writes to `src/content/crosslinks.json`. Rejects dangling slugs. |
| `scripts/build_scoreboard_svg.mjs` | build-time (within Astro render path) | Reads `scoreboard:` frontmatter, generates inline SVG symbol cells with palette colors. Hand-rolled (no charting lib). |
| Daily Driver | runtime | **No new pattern** for architecture. The paired ledger row's `ledger_row` hero dateline pattern (per ledger spec §13) fires when an architecture writeup ships, because architecture writeups always have paired ledger rows (§14). No separate `architecture_writeup` pattern needed. |

### 11.2 Build performance

- Index + architecture deep-dive pages: ~5-8 static HTML files in v1
- Mermaid SSR via `astro-mermaid`: ~200ms per diagram (acceptable for v1 scale)
- Full build target: <30s for ~5 writeups; cache hits on canonical sources keep incremental builds <10s
- Each architecture page is ~3500-4400px tall; Lighthouse Performance target ≥90 (lower than index pages because of the embedded Mermaid SVG + Shiki-rendered code blocks; both are inline static SVG/HTML, so the score should clear)

### 11.3 Anti-stack

- No client-side Mermaid rendering — build-time SSR only
- No charting library — scoreboard is hand-rolled SVG, ER diagram is Mermaid SVG
- No Algolia / search
- No client-side TOC library
- No analytics on architecture pages by default
- No comments / engagement widgets / view counters

---

## 12. RSS feed (`/architecture/rss.xml`)

### 12.1 Implementation

`src/pages/architecture/rss.xml.ts` — Astro endpoint using `@astrojs/rss`. Same primitive as `/transactions/rss.xml`.

Items per architecture writeup carry:
- `title` (architecture writeup title)
- `link` (`/architecture/<slug>/`)
- `pubDate` (ISO `shipped` parsed)
- `description` (the `lead` field — 1-line thesis)
- `content:encoded` — the full rendered essay as HTML (read from `src/content/architecture/essays/<slug>.md` after build, transformed via remark/rehype)

### 12.2 Why separate from `/transactions/rss.xml`

Architecture writeups are higher-value-per-item (2,000 words + scoreboard + ER diagram) than ledger rows. Different cadence (3-5 per year vs. weekly). Recruiter subscribing to architecture feed is different from recruiter subscribing to ledger feed.

Aggregated root feed at `/rss.xml` (transactions + architecture + essays) is **v2 deferred** until `/essays/` has >1 entry — same gating rule as ledger spec §10.4.

### 12.3 Discoverability

- `<link rel="alternate" type="application/rss+xml" href="/architecture/rss.xml" title="Sean Winslow — Architecture" />` in BaseLayout `<head>`
- "RSS →" link in the index page's metadata strip
- "→ subscribe via RSS" in the index page footer fold
- "→ subscribe via RSS" in site-chrome global footer (specced in spec #4)

---

## 13. Hero dateline integration

**No new pattern** added to hero spec §8. The five existing patterns (`fleet_pulse`, `ship_log`, `reading_log`, `now_line`, `ledger_row`) cover architecture activity transparently:

- When a new architecture writeup ships, its paired ledger row also ships (per §14). Hero dateline fires `ledger_row` pattern with the architecture writeup's title.
- Example: `vault as agent infrastructure shipped 6/3. 9 artifacts on the ledger. fleet green.`

The Daily Driver reads `src/content/architecture/*.md` filesystem at write-time for the index page's dateline strip (an "ARCHITECTURE_TOTAL" virtual pattern internal to the architecture index, NOT a global hero pattern):

> *BOSTON, JUNE 3, 2026 — vault scorecard shipped. 1 writeup.*

This is a **build-time render**, not a Daily Driver write. The architecture index page reads its own collection and synthesizes the dateline. Hero remains the single source of dateline truth for the home page; architecture pages have their own local datelines (matching the case-study spec pattern).

---

## 14. Cross-link contracts

The full graph closes with the architecture collection added:

| Source field | Target | Bidirectional surface |
|---|---|---|
| **`relatedLedgerRow: vault-scorecard`** (on architecture MDX) | `/transactions/vault-scorecard/` | Architecture page's Related block shows "→ ledger row". Ledger row's Related block auto-shows "→ read the architectural argument". |
| **`relatedCaseStudy: superuser-pack`** (on architecture MDX) | `/work/superuser-pack/` | Architecture page shows "→ companion case study". Case-study page gains "→ architectural arguments referencing this project" section auto-listing every architecture writeup pointing here. |
| **`relatedArchitecture: [vault-knowledge-mcp]`** (on architecture MDX) | `/architecture/vault-knowledge-mcp/` | Both writeups' Related blocks show each other under "sibling architecture writeups". |
| **`relatedEssay: access-vs-meaning`** (on architecture MDX) | `/essays/access-vs-meaning/` | Architecture page shows "→ companion essay". Essay page (specced in #3) auto-renders "← architectural arguments supporting this thesis". |
| Methods strip cell `link: /work/<slug>` | `/work/<slug>/` | Same internal-link rule as case-study + ledger. |

### 14.1 The graph closes when transactions spec gets the additive update

**REQUIRED additive update to `transactions-spec-v1.md` §3.2:**

Add an optional field to the transactions schema:

```ts
relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional(),  // slug or array of slugs
```

No removals, no renames, no breaking changes to the locked schema. The transactions spec's `derive_crosslinks.mjs` (§14) already extends architecture; this just gives the ledger row a slot to declare the link in.

**Suggested execution:** fold this as a 2026-05-17 changelog entry into `transactions-spec-v1.md` after `/architecture/` spec is locked. The change is purely additive and the locked spec's behavior under MDX files that lack the field is unchanged.

### 14.2 Validator behavior

`scripts/validate_architecture.mjs` rejects dangling cross-link slugs at build time. Same error pattern as ledger spec §14:

> `"architecture/vault-scorecard.mdx: relatedLedgerRow 'vault-scorecard-mcp' does not resolve to /transactions/vault-scorecard-mcp/ (no MDX at src/content/transactions/vault-scorecard-mcp.md)"`

---

## 15. View Transition wiring

Two View Transition seams the architecture surface participates in:

| Seam | `view-transition-name` | Direction |
|---|---|---|
| Architecture index row → deep-dive | `arch-title-<slug>` on index row title + deep-dive `<h1>` | Index → deep-dive (forward); back button restores |
| Architecture deep-dive ↔ paired ledger row | **v2 deferred** | Risks too many shared name targets; revisit if recruiter feedback signals friction |

v1 ships only the row → deep-dive title morph.

---

## 16. Open questions

**[OPEN-1: Control Architecture surface placement (§1.1, §16)]** — Task 14 (Control Architecture trinity, ships ~6/10) currently has its canonical `docs/CONTROL_ARCHITECTURE.md` in `claude-code-superuser-pack/` and a ledger row at `/transactions/control-architecture/`. **Should it also become an architecture writeup at `/architecture/control-architecture/`?** It's a 1,500-word architectural argument (under the 2,000-word Vault Scorecard but the same shape). **Recommended default:** yes. Control Architecture is the same artifact-shape as Vault Scorecard (thesis + comparison + diagram + worked example). The architecture surface earns three v1 occupants if Task 14 ships before crossover, which is plausible given the 6/10 target. Confirm.

**[OPEN-2: Index page hook line (§4.1, §5)]** — proposed 1-line hook: *"Most people see Obsidian as content. I treat my vault as agent infrastructure."* This is Sean's hand from the Vault Scorecard demo-shape paraphrase in Task 15. It's the only Newsreader-italic moment on the page above the writeup rows. **Open question: stays as-is, or rewritten to be route-level rather than writeup-specific?** A more generic version: *"Architectural arguments where the proof is the code, linked."* (Pure declarative — no first-person.) **Recommended default:** keep the Vault Scorecard hook as the page hook until the architecture surface has 3+ writeups. Then revisit — the hook becomes route-level when the route is no longer dominated by a single writeup. Confirm.

**[OPEN-3: Mermaid palette override completeness (§9.2)]** — the proposed `themeVariables` override hits primary colors but Mermaid has ~25 additional vars (`secondaryColor`, `tertiaryColor`, `noteBkgColor`, etc.). The Vault Scorecard ER diagram only uses entity+relationship rendering, so the primary 5 vars probably cover it. **Recommended default:** ship v1 with the 5-var override; observe the rendered output during Step 5 (Vault Scorecard page build); add more overrides as needed. **Switch only if** the rendered diagram looks inconsistent with the rest of the page — at which point the fallback is `mermaid-cli` (mmdc) build-time PNG-export instead of Astro-rendered SVG. Confirm willingness to swap to mmdc if visual integration fails.

**[OPEN-4: Reading-time computation (§5)]** — proposed `readingTime: number` field, manually authored in frontmatter. **Open: should this be auto-computed at build from word count?** A 200-words-per-minute counter over the fetched essay would give a deterministic value. **Recommended default:** manual for v1 (Sean writes "8" in frontmatter). Auto-compute deferred to v2 — adds build complexity for low payoff at 3-5 writeup scale. Confirm.

**[OPEN-5: Honest-note anchor matching across upstream essay edits (§11.1)]** — the validator currently issues a *warning* (not error) when `honestNotes[].anchor` doesn't match a section heading in the fetched essay. This is because Sean may edit the essay upstream (rename "Permissions" → "Permissions and Access Control") and the architecture MDX's anchor would drift. **Recommended default:** warning, not error. Build keeps shipping; Sean sees the warning at next build and updates the MDX anchor manually. **Switch only if** upstream edits become frequent enough that the warnings get ignored — at which point the validator escalates to error. Confirm.

---

## 17. Out of scope for v1

- Year filter, surface filter, status filter — only ~3-8 writeups in v1, no filter axis needed
- Sticky TOC for long essays (per ledger spec §17 + case-study spec §17 — same restraint)
- Footnotes — inline `[link text](url)` citations only
- Interactive Mermaid diagrams — static SVG only
- Embedded video / Loom on architecture pages — defer (architecture is text + diagram + code; video lives on /transactions/ deep-dives)
- Per-page analytics events — page-view only if Plausible is added globally
- Aggregated root RSS feed at `/rss.xml` — defer until `/essays/` has >1 entry (matches ledger §10.4)
- Cross-surface View Transition morphs (ledger ↔ architecture) — v2 deferred
- OG image auto-generation via satori — v1 ships static PNGs in `public/og-cards/<slug>.png`
- "Where else this work shows up" graph view of the cross-link relationships — defer as a possible v2 surface

---

## 18. Definition of Done

`/architecture/` v1 ships when:

1. `src/content/config.ts` declares the new `architecture` collection per §3 with all fields + constraints.
2. `scripts/fetch_canonical_sources.mjs` runs in `prebuild` and successfully fetches `essaySourceUrl` + `explanationUrl` for every architecture MDX with ETag caching.
3. `scripts/validate_architecture.mjs` runs in `prebuild` and rejects dangling cross-link slugs, missing required fields, invalid ISO `shipped`, or missing `mermaidSource` files.
4. `scripts/derive_crosslinks.mjs` extended to include the architecture collection; reverse-lookup auto-rendering works on both architecture pages AND on paired ledger rows + case-study pages.
5. The index page at `/architecture/` renders the page title block (h1 + 1-line italic hook + sober subhead + metadata strip) + all writeup rows in `shipped` desc order + footer fold.
6. Each deep-dive page renders all 11 bands per §2.2: dateline → title block → thesis pullquote → essay body (Newsreader 20px weight 300, with embedded ER diagram, scoreboard, and HONEST NOTE callouts inline) → Try It Yourself callout → Methods strip → 4Q block → two "Read the canonical →" links → Related block → Next/Prev → registration mark.
7. The scoreboard renders flat — all rows visually identical, custom inline SVG symbols in palette colors, ARIA-accessible.
8. The Mermaid ER diagram renders as inline SVG via `astro-mermaid` with the 5-var palette override; mobile fallback `overflow-x: auto` works.
9. The HONEST NOTE callouts render in wire-service mono with stamp-amber prefix + 1px secondary-ink left border, anchored to the section headings declared in frontmatter `honestNotes[].anchor`.
10. The Try It Yourself callout renders only when `tryItYourselfUrl` is set, with Shiki-highlighted code snippet inside.
11. The 4Q block fetches from canonical `explanationUrl` and renders via shared `<FourQBlock />` component.
12. View Transition: clicking an index row morphs into the deep-dive `<h1>` via shared `arch-title-<slug>`. Tested Chrome + Safari; Firefox falls back to instant nav.
13. RSS feed at `/architecture/rss.xml` validates against RSS 2.0; full essay content in `content:encoded`; sort order matches the index.
14. Permalinks on every essay section heading work — hovering reveals the `#` glyph; clicking copies the URL to clipboard (or fires a `:target` scroll).
15. Reduced motion: View Transition + row hover animations + section-fade-in cascades all gracefully disable.
16. Lighthouse Performance ≥90 on the index; ≥85 on deep-dive (image + diagram heavier); Accessibility ≥95; Best Practices = 100.
17. The first occupant (Vault Scorecard) is fully populated and renders correctly with: 5-section essay + ER diagram + flat scoreboard + 2 HONEST NOTEs (Ownership + Permissions) + Try It Yourself callout + 4Q + paired ledger row at `/transactions/vault-scorecard/` cross-linked bidirectionally.
18. Recruiter cold-read test: a fresh reader can describe (a) the 5-test claim, (b) the scoreboard result for Sean's vault, (c) the two places it loses to Linear, (d) the upgrade path (Task 10 + Task 12), within 90 seconds of landing. Re-run on the live build.

When all 18 are green, `/architecture/` v1 is locked and we move to `/essays/` (spec #3).

---

## Appendix A — File map (additions to ledger spec's map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── architecture/
│   │       ├── index.astro                      ← `/architecture/`
│   │       ├── [slug].astro                     ← `/architecture/<slug>/` deep-dive
│   │       └── rss.xml.ts                       ← RSS endpoint
│   ├── components/
│   │   └── architecture/
│   │       ├── WriteupRow.astro                 ← single row on the index (~140px desktop)
│   │       ├── ThesisPullQuote.astro            ← deep-dive 1-line italic pull-quote
│   │       ├── EssayBody.astro                  ← MDX wrapper that renders the fetched essay
│   │       ├── Scoreboard.astro                 ← flat comparison table; reads frontmatter `scoreboard:`
│   │       ├── ScoreSymbol.astro                ← inline SVG (✓ ✓✓ ⚠ ✗)
│   │       ├── HonestNote.astro                 ← mono callout component
│   │       ├── TryItYourself.astro              ← teal-wash callout with code snippet
│   │       ├── ErDiagram.astro                  ← thin wrapper around Mermaid SVG output + caption
│   │       ├── RelatedBlock.astro               ← reuses crosslinks.json
│   │       └── IndexHeader.astro                ← h1 + italic hook + sober subhead + metadata strip
│   ├── content/
│   │   ├── architecture/
│   │   │   ├── *.mdx                            ← MDX frontmatter per architecture writeup
│   │   │   ├── essays/                          ← fetched at build by fetch_canonical_sources
│   │   │   └── diagrams/                        ← *.mmd Mermaid sources, committed
│   │   ├── crosslinks.json                      ← derived at build (shared)
│   │   └── explanations/                        ← canonical 4Q files (shared)
│   └── scripts/
│       ├── fetch_canonical_sources.mjs          ← renamed from fetch_explanations.mjs
│       ├── validate_architecture.mjs            ← prebuild gate
│       ├── derive_crosslinks.mjs                ← extended (shared with transactions)
│       └── build_scoreboard_svg.mjs             ← inline at build, not a separate script if compact
└── public/
    └── og-cards/
        ├── vault-scorecard.png                  ← static OG image, manually authored
        └── vault-knowledge-mcp.png
```

---

## Appendix B — MDX frontmatter shape

```yaml
---
# --- Identity ---
title: "Vault as Agent Infrastructure"
dateline: "BOSTON, JUNE 3, 2026"
shipped: "2026-06-03"
readingTime: 8

# --- IA + status ---
status: SHIPPED
tags:
  - agent-infrastructure
  - sqlite
  - obsidian
  - linear

# --- Comprehension layer ---
lead: "Three passes, two failures, and the failures are where vault-knowledge-mcp and the Judge Layer are going next."
methods:
  - task: persistent state
    tool: SQLite + git + JSONL
    cost: local / $0
    link: null
  - task: typed edges
    tool: Claude Code Superuser Pack (concept_edges)
    cost: Sonnet 4.6 (HybridRouter)
    link: /work/superuser-pack
  - task: er diagram gen
    tool: scripts/generate_schema.py
    cost: stdlib / $0
    link: null
  - task: fixture author
    tool: Sean + LLM seed
    cost: ~$0.10
    link: null

# --- Canonical sources (fetched at build) ---
essaySourceUrl: https://raw.githubusercontent.com/seanwinslow/claude-code-superuser-pack/main/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md
explanationUrl: https://raw.githubusercontent.com/seanwinslow/claude-code-superuser-pack/main/docs/VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md

# --- Diagram ---
mermaidSource: diagrams/concept-edges-erd.mmd
mermaidCaption: "concept_edges schema — 6 relation types, validated against 47 production edges."

# --- Scoreboard ---
scoreboard:
  columns: ["STATE", "VERBS", "OWN", "PERM", "AUDIT"]
  rows:
    - label: "Notion"
      scores: ["✗", "✗", "✓", "✓", "⚠"]
    - label: "Obsidian (default)"
      scores: ["⚠", "⚠", "✗", "✗", "✗"]
    - label: "Linear"
      scores: ["✓", "✓", "✓✓", "✓✓", "✓"]
    - label: "Sean's vault"
      scores: ["✓✓", "✓✓", "⚠", "⚠", "✓✓"]

# --- Honest notes (anchored to section headings) ---
honestNotes:
  - anchor: ownership
    body: "Linear is genuinely better here. That gap is exactly why vault-knowledge-mcp matters — it's the first step toward giving the vault Linear-grade ownership semantics on the axes that matter for agent control."
  - anchor: permissions
    body: "Filesystem permissions only. POSIX read/write + git remotes. Linear's RBAC is the upgrade path."

# --- Cross-links ---
relatedLedgerRow: vault-scorecard
relatedCaseStudy: superuser-pack
relatedEssay: null                              # Access-vs-Meaning Manifesto (spec #3) — wire when it ships
relatedArchitecture:
  - vault-knowledge-mcp                          # second occupant, ships ~6/4

# --- Optional editorial ---
sourceRepoUrl: https://github.com/seanwinslow/claude-code-superuser-pack
tryItYourselfUrl: https://github.com/seanwinslow/claude-code-superuser-pack/tree/main/examples/public_vault_fixture
tryItYourselfCommand: |
  git clone https://github.com/seanwinslow/claude-code-superuser-pack
  cp -r claude-code-superuser-pack/examples/public_vault_fixture /tmp/test_vault
  AGENT_VAULT_PATH=/tmp/test_vault python3 ./agents-sdk/scripts/query.py \
    "what brewing methods compete with espresso?"
---

(MDX body: optional — only used for in-page directives like `<HonestNote anchor="ownership" />`
or `<Scoreboard />` if Sean wants to override the auto-anchored render order. The actual essay
content lives upstream and is fetched into src/content/architecture/essays/<slug>.md at build.)
```

---

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `projects-section-spec-v1.md`, `case-study-spec-v1.md`, `transactions-spec-v1.md`, and `architecture-spec-v1.md` end-to-end. Implement `src/content/config.ts` with the new `architecture` collection per §3. Implement the `/architecture/` route per Appendix A. Rename `scripts/fetch_explanations.mjs` → `scripts/fetch_canonical_sources.mjs` and extend it to walk all three collections (work + transactions + architecture). Extend `scripts/derive_crosslinks.mjs` to include the architecture collection's cross-link types. Install `astro-mermaid` and configure the 5-var palette override per §9.2. Build the `<Scoreboard />` component with custom inline SVG score symbols + accessibility-first markup. Build the `<HonestNote />` callout (mono register, anchored render). Build the `<TryItYourself />` callout (teal wash + Shiki code block). Author the Vault Scorecard MDX at `src/content/architecture/vault-scorecard.mdx` per Appendix B — frontmatter complete, MDX body minimal/empty (the essay lives upstream and fetches in at build). Commit the Mermaid source at `src/content/architecture/diagrams/concept-edges-erd.mmd`. Apply the **additive transactions schema update** (§14.1) to `src/content/config.ts` — add `relatedArchitecture` as an optional field on the transactions collection. Stop when the 18 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Awaits Sean's lock. Open questions flagged in §16.*
