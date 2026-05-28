# Transactions Ledger — Prose Locked Content

**Date:** 2026-05-27
**Status:** LOCKED — Phase 1 page chrome + Phase 2 per-row content for the 5 ledger rows expected at crossover. Ready to apply on Mac Mini.
**Scope:** The `/transactions/` route's prose surfaces — index page subhead, Daily Driver dateline body templates (4 scenarios), value-prop pull-quote shape rules, and the full frontmatter for 5 ledger rows (`phase-d-typed-edges`, `knowledge-loop-phase-6`, `intent-engineering-mcp`, `vault-synthesizer-eval-suite`, `substack-drafter`). The spec is voice-locked (wire-service throughout, no Sedaris opener) — this doc fills in the named prose surfaces the spec left open.
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-27 (continued from MBP session — second amendment passes on `case-study-openers-locked-2026-05-26.md` + `project-four-q-locked-2026-05-27.md` earlier the same day; this is the next surface in Workstream D).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## TL;DR — what's locked

### Phase 1 — Page chrome

| Surface | Locked content |
|---|---|
| Index page subhead | `Every shipped artifact, dated and explained.` |
| Dateline body templates (Daily Driver writes daily at 08:30) | 4 scenarios — new ship overnight / 2+ ships overnight / no new ship but ACTIVE exists / true steady state |
| Limitations block heading | `WHAT THIS DOESN'T YET DO` (spec-locked, confirmed — the "yet" is Sedaris-coded forward-tilt) |
| Footer fold | `→ subscribe via RSS` + `→ view the fleet ↗` (spec-locked, confirmed for v1) |
| Value-prop pull-quote shape rules | 6 rules (1-2 sentences, max 280 chars, lead with technical primitive, no first-person, no tagline echo, name one before→after when sentence 2 used) |

### Phase 2 — Per-row content (5 ledger rows)

| # | Slug | Surface | Shipped | EXPLANATION source |
|---|---|---|---|---|
| 1 | `phase-d-typed-edges` | FLEET | 2026-05-13 | V3 inline-body 4Q (upgrade to `explanationUrl` later) |
| 2 | `knowledge-loop-phase-6` | FLEET | 2026-05-20 | V3 inline-body 4Q (upgrade to `explanationUrl` later) |
| 3 | `intent-engineering-mcp` | PRODUCT | 2026-05-12 | `explanationUrl` → `sw-mcp-intent-engineering/docs/EXPLANATION.md` |
| 4 | `vault-synthesizer-eval-suite` | FLEET | 2026-04-23 | `explanationUrl` if exists, else inline-body — Sean verifies at apply |
| 5 | `substack-drafter` | FLEET | 2026-05-06 | `explanationUrl` if exists, else inline-body — Sean verifies at apply |

---

## Carry-forward constraints

1. **Wire-service register throughout.** Per spec §5: no Sedaris opener on the index page; the subhead is the only Newsreader/personal-warm slot, and it's sober/declarative. Deep-dive pages are wire-service top-to-bottom; the 4Q "What did I learn?" closer carries whatever warmth the canonical `EXPLANATION.md` has.
2. **HybridRouter STOP-DOING applies to value-prop pull-quote prose, not just case-study openers.** Per [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) §"Carry-forward constraints" #5: HybridRouter lives in Methods strip rows only. Ledger value-props are editorial prose — HybridRouter cannot appear there. It can and does appear in the `methods[]` array (per spec §3.2 schema example).
3. **No tenure-foregrounding in any prose** (per [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) §"Carry-forward constraints" #1). Date data lives in `shipped:` frontmatter; user-facing prose stays focused on the artifact.
4. **No Code Brain fixed counts** (per openers-lock constraint #1). The valueProps for Code-Brain-adjacent ledger rows (Phase D, knowledge-loop, eval suite, substack-drafter) don't claim a specific count of skills/agents/hooks/concepts. Status-of-the-fleet language is OK; weekly-stale number claims are not.
5. **No tagline echo, no status-pill echo** in value-prop pull-quotes (spec §9.1 step 5 + Phase 1 shape rule #5 + #6). The pull-quote is a different facet, not a repeat of the case-study tagline (when `relatedCaseStudy` resolves) or the SHIPPED status pill.

---

## Phase 1 — Page chrome (LOCKED)

### 1.1 Index page subhead

**File:** rendered by `src/components/transactions/IndexHeader.astro` (per spec Appendix A) — string literal lives in that component or in a tiny `src/lib/transactions-copy.ts` constants file.

**Currently in spec §2.1 anatomy diagram (illustrative only):** "Every shipped artifact, dated, with the explanation attached."

**Locked:**

> Every shipped artifact, dated and explained.

**Why this lands:**
- Tightest version of the spec'd default. Drops the slightly clinical "with the explanation attached" phrase and lets "explained" do the same work in fewer syllables.
- Wire-service register honored — sober, declarative, no first-person, no editorial flourish.
- "Dated and explained" is the comprehension thesis compressed into four words — the daily-dated layer (per CLAUDE.md load-bearing thing #3) plus the canonical-EXPLANATION primitive in a single clause.
- Single sentence, period at the end (matches the §5 type system's `Index subhead` weight 300 / -0.1px tracking).

### 1.2 Dateline body templates (Daily Driver writes daily at 08:30)

**File:** computed by the Daily Driver agent per spec §13; rendered via the hero spec §8 `ledger_row` pattern in `dateline.json`.

**Locked — 4 scenarios:**

| # | Scenario | Template | Example rendered body |
|---|---|---|---|
| 1A | New row landed in last 24h (most common when fleet is shipping) | `<artifact> shipped <date>. <N> artifacts on the ledger. <status>.` | `intent-engineering MCP shipped 5/12. 9 artifacts on the ledger. fleet green.` |
| 1B | Two or more new rows overnight (rare, bursty) | `<N> ships overnight: <artifact 1> + <artifact 2>. <total> artifacts on the ledger.` | `2 ships overnight: judge layer + vault scorecard. 12 artifacts on the ledger.` |
| 1C | No new row, but `status: ACTIVE` exists (mid-build steady state) | `<active artifact> in review. <N> artifacts on the ledger. <K> active.` | `judge layer in review. 9 artifacts on the ledger. 3 active.` |
| 1D (new) | No new row, nothing active (true steady state) | `<N> artifacts on the ledger. last ship <date>.` | `9 artifacts on the ledger. last ship 5/12.` |

**Why the 4 templates:**
- All wire-service mono. No first-person. No "fleet idle" weather-report tone (intentionally rejected).
- Pattern is consistent across all 4: `<event>. <ledger count>. <status flag>.` — the three-part rhythm reads as a wire-service ticker.
- Scenario 1D is new (not in spec §13); covers the boring days when nothing shipped overnight and nothing is in review. Daily Driver picks 1A/1B/1C if their conditions fire; falls through to 1D otherwise.
- Status flags: `fleet green` (all systems nominal) / `fleet yellow` (one or more agents in degraded/disabled state) / `fleet red` (critical agent down). Sean's call which conditions map to which flag — beyond the scope of this prose lock.

**Spec amendment needed:** spec §13's three sketched templates remain; this lock adds scenario 1D + canonicalizes the three existing templates as the locked forms.

### 1.3 Limitations block heading

**File:** rendered by `src/components/transactions/LimitationsBlock.astro`.

**Currently in spec §9.1:** `WHAT THIS DOESN'T YET DO`

**Locked: keep as spec'd.** The "yet" is Sedaris-coded forward-tilt — the limitation is staged, not permanent. No brainstorm needed.

### 1.4 Footer fold

**File:** rendered by `src/components/transactions/FooterFold.astro`.

**Currently in spec §2.1:** `→ subscribe via RSS` + `→ view the fleet ↗`

**Locked: keep as spec'd for v1.** Two affordances, clean. Reopen if/when `/essays/access-vs-meaning/` ships and a third `→ read the manifesto` affordance earns the row.

### 1.5 Value-prop pull-quote — shape rules (LOCKED)

**Applies to:** every `valueProp:` string in every transaction MDX frontmatter. Rendered by `src/components/transactions/ValuePropPullQuote.astro` (Newsreader 24px italic, max-width 680px, 0.5px teal top + bottom rules, paper background).

**The 6 rules:**

1. **1-2 sentences maximum.** Sentence 1 = what the thing is (technical noun). Sentence 2 (optional) = the load-bearing improvement it makes possible.
2. **Lead with the technical specificity, not the value claim.** "A typed-edge SQLite layer..." not "Smarter contradiction detection..." — name the primitive, let the value emerge from the noun's specificity.
3. **No "we" / "I" / first-person.** Pure object description. Wire-service register.
4. **Name one concrete before→after improvement** when the second sentence is used. Example: "weekly knowledge-lint contradiction detection [as a] SQL query instead of an LLM scan."
5. **No tagline echo.** When `relatedCaseStudy` resolves, the deep-dive page already shows the case-study tagline elsewhere; the pull-quote is a different facet, not a repeat.
6. **No status-pill echo.** The dateline + status pill already carry shipped-date/status metadata. The pull-quote is value, not metadata. Don't write "Shipped on May 12 — ..."

**Hard cap:** `valueProp: z.string().max(280)` per spec §3.2 schema. Tweet length.

**HybridRouter constraint** (per Carry-forward #2): HybridRouter never appears in the pull-quote prose. It can appear in the `methods[]` array.

---

## Phase 2 — Per-row content (LOCKED, 5 rows)

Each row below provides the full frontmatter for `src/content/transactions/<slug>.md`. Paste as-is on Mac Mini. The MDX body is either canonical-EXPLANATION-fetched (preferred, when `explanationUrl` is present) or inline-body 4Q (V3 fallback for the 2 migrated entries).

### Row 1 — `phase-d-typed-edges` · FLEET · SHIPPED 2026-05-13

**File:** `src/content/transactions/phase-d-typed-edges.md`

**Frontmatter (locked):**

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
  - "Contradiction detection is still rigid — it flags syntax differences as logical conflicts."
  - "Nightly synthesize takes ~4 minutes because the contradiction query walks the entire concept graph."

# --- 4Q source ---
# V3-bridge entry: inline-body 4Q carries forward (migration script preserves the body verbatim).
# Upgrade to explanationUrl when Sean writes the canonical EXPLANATION.md in the code-brain repo.
explanationUrl: null

# --- Cross-links ---
relatedCaseStudy: code-brain
relatedTransactions:
  - knowledge-loop-phase-6
  - vault-synthesizer-eval-suite
relatedEssay: null
previousVersion: null
relatedArchitecture: null

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/code-brain
loomUrl: null
loomPosterUrl: null
---
```

**Body content:** preserve V3-bridge inline-body 4Q verbatim per migration script (spec §12.2 step 2). The `## What is this?` / `## Why this approach?` / `## What would break?` / `## What did I learn?` headings carry forward.

---

### Row 2 — `knowledge-loop-phase-6` · FLEET · SHIPPED 2026-05-20

**File:** `src/content/transactions/knowledge-loop-phase-6.md`

**Frontmatter (locked):**

```yaml
---
# --- Identity ---
title: "Knowledge Loop — Phase 6 (Producer + Consumer)"
dateline: "BOSTON, MAY 20, 2026"
shipped: "2026-05-20"

# --- IA + status ---
surface: fleet
status: SHIPPED

# --- Comprehension layer ---
valueProp: "A producer-consumer knowledge loop on the vault: overnight flush → synthesize → critique → next-session inject. The same vault that captures the day's thinking serves it back into tomorrow's context window as additionalContext."
methods:
  - task: session flush
    tool: SessionEnd hook (.claude/hooks/)
    cost: local / $0
    link: null
  - task: synthesize
    tool: Vault Synthesizer (Qwen3-14B on MBP)
    cost: local / $0
    link: /work/code-brain
  - task: critique
    tool: Codex CLI + Anti-Gravity CLI in parallel
    cost: $0 (subscriptions absorb)
    link: null
  - task: inject
    tool: SessionStart hook
    cost: local / $0
    link: null
limitations:
  - "SessionStart injection caps at 15K tokens — concept-heavy days truncate."
  - "The 03:30 critic depends on both CLIs (Codex + Anti-Gravity) being authenticated; ChatGPT Plus or Google personal OAuth expiring silently kills the night."

# --- 4Q source ---
# V3-bridge entry: inline-body 4Q carries forward verbatim per migration script.
# Upgrade to explanationUrl when Sean writes canonical EXPLANATION.md in code-brain repo.
explanationUrl: null

# --- Cross-links ---
relatedCaseStudy: code-brain
relatedTransactions:
  - phase-d-typed-edges
  - vault-synthesizer-eval-suite
relatedEssay: null
previousVersion: null
relatedArchitecture: null

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/code-brain
loomUrl: null
loomPosterUrl: null
---
```

**Body content:** preserve V3-bridge inline-body 4Q verbatim per migration script.

---

### Row 3 — `intent-engineering-mcp` · PRODUCT · SHIPPED 2026-05-12

**File:** `src/content/transactions/intent-engineering-mcp.md`

**Frontmatter (locked):**

```yaml
---
# --- Identity ---
title: "Intent Engineering MCP"
dateline: "BOSTON, MAY 12, 2026"
shipped: "2026-05-12"

# --- IA + status ---
surface: product
status: SHIPPED

# --- Comprehension layer ---
valueProp: "An MCP server with three intent-engineering tools: a 25-item audit of any intent spec, a paste-ready scaffold generator, and a retrofit-level assessor. The audit eats its own dog food at 23/25."
methods:
  - task: protocol implementation
    tool: MCP SDK (TypeScript)
    cost: open-source / $0
    link: null
  - task: registry verification
    tool: DNS-verified MCP registry
    cost: registry / $0
    link: null
  - task: package publish
    tool: npm
    cost: free tier / $0
    link: null
  - task: development
    tool: Claude Code
    cost: per-token billing
    link: /work/code-brain
limitations:
  - "Audit expects explicit `## Objective` + `## Desired Outcomes` headings — skills using different heading vocabularies score artificially low (v0 design tradeoff documented in `docs/v0-scope.md`)."
  - "Stdio transport only; no Streamable HTTP, no SSE, no remote hosting. Run locally next to the client."
  - "Read-only: `assess_retrofit_level` recommends but never writes; `apply_retrofit` waits on user confirmation in a future v0.2."

# --- 4Q source ---
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/sw-mcp-intent-engineering/main/docs/EXPLANATION.md

# --- Cross-links ---
relatedCaseStudy: intent-engineering-mcp
relatedTransactions: []
relatedEssay: null
previousVersion: null
relatedArchitecture: null

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/sw-mcp-intent-engineering
loomUrl: null
loomPosterUrl: null
---
```

**Body content:** none — the 4Q renders from the fetched canonical `EXPLANATION.md`. The MDX body can be empty, or carry optional extended context above the 4Q block (per spec Appendix B note). For v1, leave empty.

---

### Row 4 — `vault-synthesizer-eval-suite` · FLEET · SHIPPED 2026-04-23

**File:** `src/content/transactions/vault-synthesizer-eval-suite.md`

**Frontmatter (locked):**

```yaml
---
# --- Identity ---
title: "Vault Synthesizer Eval Suite"
dateline: "BOSTON, APRIL 23, 2026"
shipped: "2026-04-23"

# --- IA + status ---
surface: fleet
status: SHIPPED

# --- Comprehension layer ---
valueProp: "Ten reference cases the nightly Vault Synthesizer runs against every commit. A Sonnet judge scores quote density + cross-domain pull + depth; CI fails when a regression would otherwise land silently in the knowledge graph."
methods:
  - task: eval harness
    tool: pytest + custom case loader
    cost: local / $0
    link: null
  - task: LLM judge
    tool: Claude Sonnet 4.6
    cost: ~$0.04 per case
    link: /work/code-brain
  - task: case authoring
    tool: hand-curated reference cases
    cost: local / $0
    link: null
limitations:
  - "Ten cases doesn't catch the long tail — niche concept types (contradictions across SOUL artifacts, EDC canonicalization) can regress invisibly."
  - "Sonnet-as-judge introduces ~$0.04/case ongoing cost; full suite ≈ $0.40/run."

# --- 4Q source ---
# Sean to verify at apply: if `evals/vault-synthesizer/EXPLANATION.md` exists in the code-brain repo,
# use the explanationUrl below. Otherwise omit explanationUrl and author inline-body 4Q in the MDX body.
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/evals/vault-synthesizer/EXPLANATION.md

# --- Cross-links ---
relatedCaseStudy: code-brain
relatedTransactions:
  - knowledge-loop-phase-6
  - phase-d-typed-edges
relatedEssay: null
previousVersion: null
relatedArchitecture: null

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/code-brain
loomUrl: null
loomPosterUrl: null
---
```

**Body content:** none if `explanationUrl` resolves; inline-body 4Q if it doesn't (Sean writes the 4 canonical headings inline before commit).

---

### Row 5 — `substack-drafter` · FLEET · SHIPPED 2026-05-06

**File:** `src/content/transactions/substack-drafter.md`

**Frontmatter (locked):**

```yaml
---
# --- Identity ---
title: "Substack Drafter (gate-b-drafts)"
dateline: "BOSTON, MAY 6, 2026"
shipped: "2026-05-06"

# --- IA + status ---
surface: fleet
status: SHIPPED

# --- Comprehension layer ---
valueProp: "A weekly Thursday drafter that reads the `writing-voice-modes` SKILL.md verbatim and rotates across 5 voice modes (sean / sedaris / kerouac / thompson / vonnegut). Drafts land at `gate-b-drafts/`, awaiting Sean's first pass before publication."
methods:
  - task: scheduling
    tool: launchd
    cost: local / $0
    link: null
  - task: generation
    tool: HybridRouter (Qwen3-14B local → Sonnet 4.6 fallback)
    cost: ~$0.10/run cap
    link: /work/code-brain
  - task: voice calibration
    tool: reads writing-voice-modes SKILL.md
    cost: local / $0
    link: null
limitations:
  - "Default disabled — requires `INSTALL_SUBSTACK_DRAFTER=1` to install the launchd schedule (won't fire on a fresh fleet without opt-in)."
  - "Voice fidelity degrades on the local-fallback path when Qwen3-14B handles a mode the model wasn't trained on (Vonnegut and Kerouac in particular)."

# --- 4Q source ---
# Sean to verify at apply: if `agents-sdk/agents/substack_drafter/EXPLANATION.md` exists in the code-brain repo,
# use the explanationUrl below. Otherwise omit and author inline-body 4Q.
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/agents-sdk/agents/substack_drafter/EXPLANATION.md

# --- Cross-links ---
relatedCaseStudy: code-brain
relatedTransactions: []
relatedEssay: null
previousVersion: null
relatedArchitecture: null

# --- Optional editorial ---
repoUrl: https://github.com/seanwinslow28/code-brain
loomUrl: null
loomPosterUrl: null
---
```

**Body content:** none if `explanationUrl` resolves; inline-body 4Q if it doesn't.

---

## Spec implications (transactions-spec-v1.md)

The Phase 1 locks supersede the spec's illustrative anatomy text in §2.1. Apply alongside the Phase 2 row content in a single Mac Mini commit.

| Spec section | Currently says | Amend to |
|---|---|---|
| §2.1 anatomy diagram subhead | "Every shipped artifact, dated, with the explanation attached." | "Every shipped artifact, dated and explained." |
| §13 dateline body templates | 3 sketched templates (scenarios A/B/C) | 4 locked templates (scenarios 1A/1B/1C/1D per §1.2 above) — add scenario 1D + canonicalize the existing three |
| §9.1 step 5 (value-prop pull-quote) | "Newsreader 24px italic, max-width 680px, 0.5px teal rules top + bottom, paper background" (rendering only) | Same rendering + add a pointer: "Value-prop pull-quote prose follows the 6 shape rules locked in [`docs/writing-council/transactions-prose-locked-2026-05-27.md`](../writing-council/transactions-prose-locked-2026-05-27.md) §1.5." |
| §3.2 schema `valueProp:` field | `z.string().max(280)` (validation only) | Same validation + add a comment pointing at the 6 shape rules: `// Shape rules: see docs/writing-council/transactions-prose-locked-2026-05-27.md §1.5.` |
| §19 OPEN-1 (surface enum) | Open question | Resolved: 5 surfaces — `fleet / pipeline / product / writing / infra`. The 5 locked rows below use 2 of them (FLEET × 4, PRODUCT × 1). Other 3 surfaces unused at crossover but reserved for future ships. |
| §19 OPEN-2 (4Q source for v1) | Open question | Resolved: rows 1+2 (V3-bridge) carry forward inline-body 4Q; rows 3+4+5 default to `explanationUrl`. Sean verifies existence of each canonical `EXPLANATION.md` at apply; falls back to inline-body if missing. |
| §19 OPEN-4 (Daily Driver template authorship) | Open question | Resolved: 4 locked templates per §1.2 above; agent picks based on overnight signal; agent doesn't free-form. |

OPEN-3 (substack-drafter / manifesto duality) and OPEN-5 (Loom embed budget) remain open — they depend on Essays spec (#3) and per-row Loom decisions, both deferred until /essays/ ships and Sean has Looms to embed respectively.

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; should already have the second 2026-05-27 amendments from `case-study-openers-locked-2026-05-26.md` + `project-four-q-locked-2026-05-27.md`)
3. Confirm `src/content/transactions/` directory exists (created by Mac Mini's prior `transactions` content-collection scaffolding work, if any; otherwise create empty)
4. **Row 1** — `src/content/transactions/phase-d-typed-edges.md`:
   - If file exists (V3 bridge migration already ran): replace frontmatter with the locked YAML per §Row 1 above; preserve existing inline-body 4Q content
   - If file doesn't exist: create with locked frontmatter + author inline-body 4Q from V3-bridge source (`~/Code-Brain/sw-portfolio/src/content/transactions/phase-d-typed-edges.md` if present, or write fresh)
5. **Row 2** — `src/content/transactions/knowledge-loop-phase-6.md`:
   - Same procedure as Row 1; preserve V3-bridge inline-body 4Q
6. **Row 3** — `src/content/transactions/intent-engineering-mcp.md`:
   - Create with locked frontmatter per §Row 3 above
   - Verify `https://raw.githubusercontent.com/seanwinslow28/sw-mcp-intent-engineering/main/docs/EXPLANATION.md` resolves (README confirms it exists)
   - Empty MDX body (4Q renders from fetched canonical)
7. **Row 4** — `src/content/transactions/vault-synthesizer-eval-suite.md`:
   - Create with locked frontmatter per §Row 4 above
   - Verify `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/evals/vault-synthesizer/EXPLANATION.md` resolves
   - If 404: remove `explanationUrl:` field (set to `null` or omit) + author inline-body 4Q in the MDX body
8. **Row 5** — `src/content/transactions/substack-drafter.md`:
   - Create with locked frontmatter per §Row 5 above
   - Verify `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/agents-sdk/agents/substack_drafter/EXPLANATION.md` resolves
   - If 404: remove `explanationUrl:` field + author inline-body 4Q
9. Confirm `src/components/transactions/IndexHeader.astro` renders the locked subhead `Every shipped artifact, dated and explained.` (per §1.1)
10. Confirm the Daily Driver agent code at `~/Code-Brain/code-brain/agents-sdk/agents/daily_driver.py` (or wherever the `ledger_row` pattern is computed) uses the 4 locked templates per §1.2 — add scenario 1D template if missing
11. Run `npm run dev` and QA:
    - `/transactions/` index renders the new subhead correctly
    - `/transactions/fleet/` renders 4 rows (1, 2, 4, 5)
    - `/transactions/product/` renders 1 row (3)
    - Each `/transactions/<slug>/` deep-dive renders frontmatter correctly
    - Methods strip cross-links navigate to `/work/code-brain` and `/work/intent-engineering-mcp` correctly
    - Cross-link Related block shows correct bidirectional links between rows 1/2/4 (sister ships) and to `/work/code-brain` (part of)
    - `prebuild` script `fetch_explanations.mjs` successfully fetches rows 3/4/5's canonical EXPLANATIONs (or falls back to inline-body for any that 404)
    - `prebuild` script `validate_transactions.mjs` passes
    - `prebuild` script `derive_crosslinks.mjs` writes `src/content/crosslinks.json`
    - RSS feed at `/transactions/rss.xml` validates
12. Commit:
    ```bash
    git add .
    git commit -m "Transactions ledger v1: 5 rows + page chrome (subhead, dateline templates, pull-quote shape rules) per transactions-prose-locked-2026-05-27"
    ```
13. (Separate spec-amendment commit) Update `docs/specs/transactions-spec-v1.md` §2.1 + §3.2 + §9.1 + §13 + §19 per "Spec implications" above. Same recommended note format as prior spec amendments.

---

*Authored 2026-05-27 in the brainstorm-ideas-existing skill session on MBP. Companion to [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md), [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md), [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md), and [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md). Sean retains voice authority on every locked string above.*
