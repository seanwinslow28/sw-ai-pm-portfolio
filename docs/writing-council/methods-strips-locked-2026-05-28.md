# Methods Strips — All 5 Case Studies — Locked Content

**Date:** 2026-05-28
**Status:** LOCKED — full Methods strip authoring for all 5 case studies per case-study-spec §8. Ready to apply on Mac Mini AFTER the prior 10 lock docs land.
**Scope:** The `methods:` frontmatter array on each of the 5 case-study MDX files. Each strip carries 4–6 rows per spec §8.1. Out of scope: Methods strip rendering (already locked in spec §8 + §11), opener / 4Q / tagline / anchor_metric (locked elsewhere), investigation boards (locked at Surface 1 + Surface 2).
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-28 (post-Workstream-D cleanup phase 3, following investigation-boards-a2-a3-a5-locked-2026-05-28).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## ⚠️ Apply order — read before Mac Mini work

This is the **eleventh lock doc** (cleanup phase 3). Apply sequence at Mac Mini-side:

1. Eight Workstream D locks (transactions → architecture → essays → site chrome inclusive).
2. [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md) — cleanup phase 1.
3. [`investigation-boards-a2-a3-a5-locked-2026-05-28.md`](investigation-boards-a2-a3-a5-locked-2026-05-28.md) — cleanup phase 2.
4. **This doc** — cleanup phase 3 — five Methods strips.
5. *(closing session)* Surface 4 — final verification pass across all 11 lock docs (cleanup phase 4).

All 5 strips touch frontmatter only; single commit covering 5 MDX files.

---

## TL;DR — what's locked

| Project | Rows | Cross-links |
|---|---|---|
| **A-1 anima** | 6 | → `/work/code-brain` (orchestration row) |
| **A-2 code-brain** | 6 | → `/work/animation-pipeline/` (downstream consumer row) |
| **A-3 intent-engineering-mcp** | 5 | → `/work/code-brain` (development environment row) |
| **A-4 the-block** | 5 | → `/work/code-brain` ×2 (production tooling + PRD authoring) |
| **A-5 16bitfit** | 5 | → `/work/animation-pipeline/` (sibling row) |

Methods graph topology after this lock (per spec §8.2): Code Brain is the most-cross-linked node with 4 inbound cross-links from A-1, A-3, A-4×2. Animation Pipeline is second with 2 inbound cross-links from A-2 + A-5. Intent Engineering MCP, The Block, and 16BitFit are leaf nodes (no inbound cross-links to them from other case studies). The graph makes the agentic-engineering hub thesis visible without any prose claiming it.

---

## Carry-forward constraints

No new constraints — applies the cumulative constraint set from the 10 prior lock docs. The notable ones that actually intersect this surface:

1. **HybridRouter STOP-DOING is portfolio-wide** (cross-portfolio rule from prior locks). Methods strip rows are HybridRouter's only home in the portfolio. Two appearances locked here: A-1 orchestration row (cost cell mentions "Claude Sonnet 4.6 (HybridRouter)") + A-2 local-cloud routing row (dedicated HybridRouter row). Nowhere else.
2. **No fixed counts of Code Brain skills, agents, or hooks** (constraint #1 from openers lock). A-2 strip lists technologies, not counts. The strip never claims a number that fluctuates weekly.
3. **No "Comprehension is the artifact" / "Building got cheap" / "Same X same Y same Z" / iPad** in any row label or cost cell. Ceilings already reached; audited clean across all 27 rows written this session.
4. **Spec §8.4 — not a tech-stack badge wall.** No logos, no version numbers (except where a major version is part of the product identity — Phaser 3, Seedance 2.0, Nano Banana 2, etc.), no "powered by." Each row is the operational truth: the work, the agent that did it, what it cost.
5. **Cross-link rule (spec §8.2).** When the AGENT/TOOL column references a project with its own case study, the `link:` field carries the internal route. Renders as an underlined mono link in the cell.
6. **Cost cells carry actual operational cost, not marketing language.** `per-token billing` for API services, `local / $0` for self-hosted compute, `open-source / $0` for libraries, `free tier` for SaaS free tiers, `$0 incremental (subscription)` for subscription-absorbed costs, `~$X/unit` for per-unit costs, `see case study` for cross-linked rows. No "varies," no "depends," no "TBD."

---

## A-1 anima — Methods strip (LOCKED, 6 rows)

**File:** `src/content/work/animation-pipeline.mdx` — frontmatter `methods:` array.

**Author from scratch** (no methods array on disk currently per CLAUDE.md "the build... not started" status; this is the canonical first authoring). Sean's editorial: "The agents are the most important aspect to showcase to recruiters." Six rows = 2 model rows (the production stack truth) + 4 agent/critic/orchestration rows (the agentic-engineering hub claim).

```yaml
methods:
  - task: keyframe stills
    tool: Gemini Nano Banana 2
    cost: ~$0.04/frame
    link: null
  - task: motion interpolation
    tool: Seedance 2.0
    cost: ~$0.40/clip (Fast tier)
    link: null
  - task: orchestration
    tool: Code Brain
    cost: Claude Sonnet 4.6 (HybridRouter)
    link: /work/code-brain
  - task: vision critic (T2)
    tool: Gemini 3.1 Pro via Anti-Gravity CLI
    cost: $0 incremental (subscription)
    link: null
  - task: multi-CLI critic (T3)
    tool: Codex CLI + Anti-Gravity CLI in parallel
    cost: $0 incremental (subscriptions absorb)
    link: null
  - task: planner
    tool: Opus 4.7 (Maya persona) + Sonnet 4.6 adversarial
    cost: per-token billing
    link: null
```

**Per-row grounding:**

| Row | Receipt |
|---|---|
| 1 | sw-portfolio-animation-pipeline CLAUDE.md §"Asset Naming Convention" + four_q lock §A-1 stack-truth (NB2 for keyframe stills). Cost per case-study-spec §13.1 amended sample. |
| 2 | sw-portfolio-animation-pipeline CLAUDE.md §"Seedance Generation" + four_q lock §A-1 stack-truth (Seedance 2.0 for motion interpolation, Fast tier as production default per [`prompts/seedance-template-v4.md`](../../sw-portfolio-animation-pipeline/prompts/seedance-template-v4.md)). |
| 3 | Cross-link to Code Brain — anima orchestration runs through HybridRouter per the canonical pattern. Lands the cross-portfolio methods-graph anchor (Code Brain ← A-1). |
| 4 | sw-portfolio-animation-pipeline CLAUDE.md §"The Critic Stack" T2 row: "Vision critic — Claude or Gemini reviews output against beat description + style guide. Proposes prompt diffs, not pass/fail." Plus §"Skills Map" `vision_critic — Em` row: "Gemini 3.1 Pro via Anti-Gravity CLI default, Opus 4.7 via Claude Agent SDK escalation." |
| 5 | sw-portfolio-animation-pipeline CLAUDE.md §"The Critic Stack" T3 row: "Multi-CLI variance — Codex CLI + Anti-Gravity CLI run in parallel. The vault-critic pattern, $0 incremental on subscriptions." |
| 6 | sw-portfolio-animation-pipeline CLAUDE.md §"Skills Map" `planner — Maya` row: "Opus 4.7 primary → Sonnet 4.6 adversarial validation → human gate." |

**Notes on Sean's pick:**
- 4 of 6 rows are agents (orchestration / T2 / T3 / planner) — recruiter-facing density on the agentic-engineering thread per Sean's stated editorial intent.
- Sean's choice of `planner` over `character bible authoring` (Cy) lands the Phase 0 + human-gate framing rather than the Phase 2 Character Bible primitive. The Character Bible work shows up in the case-study opener prose and investigation board instead.
- HybridRouter named in row 3 cost cell — first of two portfolio appearances (canonical home is A-2 row 5).

---

## A-2 code-brain — Methods strip (LOCKED, 6 rows)

**File:** `src/content/work/code-brain.mdx` — frontmatter `methods:` array (lines 22–38 currently).

**Replace existing 4-row methods array with:**

```yaml
methods:
  - task: agent runtime
    tool: Claude Agent SDK
    cost: per-token billing
    link: null
  - task: scheduling
    tool: launchd (macOS)
    cost: local / $0
    link: null
  - task: local inference (heavy)
    tool: qwen3.6_35b-a3b-32k on MBP via Ollama
    cost: local / $0
    link: null
  - task: multi-CLI critic
    tool: Codex CLI + Anti-Gravity CLI in parallel
    cost: $0 incremental (subscriptions absorb)
    link: null
  - task: local-cloud routing
    tool: HybridRouter (qwen3.6_35b-a3b-32k → Sonnet 4.6 fallback)
    cost: per-token (capped)
    link: null
  - task: animation pipeline (downstream consumer)
    tool: Animation Pipeline
    cost: see case study
    link: /work/animation-pipeline/
```

**Per-row grounding:**

| Row | Receipt |
|---|---|
| 1 | code-brain CLAUDE.md §"Agents SDK (Autonomous Layer)" — Claude Agent SDK as the runtime. SDK version pinned at `0.1.63` in `agents-sdk/pyproject.toml`. Cost: per-token, matches existing on-disk. |
| 2 | code-brain CLAUDE.md §"launchd requirement" + §"Active agents table" cadences (02:00 / 02:30 / 02:45 / 03:30 / 08:30 / 08:45 / Sunday 22:00 etc.). Cost: zero — launchd is platform. |
| 3 | Sean's 2026-05-28 spec correction: model is `qwen3.6_35b-a3b-32k` on MBP via Ollama (existing on-disk + CLAUDE.md `Qwen3-14B` references are stale). Updated verbatim to Sean's actual deployed model tag. |
| 4 | code-brain CLAUDE.md §"Active agents table" `Vault Critic` row: "Codex CLI (gpt-5.5, ChatGPT Plus) + Anti-Gravity CLI (Gemini 3.1 Pro, Google personal OAuth) via parallel subprocess shell-out... $0 (subscriptions absorb)." Carries forward into A-1 row 5; the multi-CLI critic was prototyped here and exported to anima. |
| 5 | code-brain CLAUDE.md §"Architecture decisions" `Substack-Drafter` row: "HybridRouter (Qwen3-14B local → Sonnet 4.6 fallback)." Updated to the new model spec per Sean's row 3 correction. HybridRouter is canonical here per the cross-portfolio STOP-DOING rule. |
| 6 | Existing on-disk row, retained verbatim. Cross-link to A-1 — Code Brain's downstream consumer. |

**What changed from on-disk:**

| Existing row | Disposition | Why |
|---|---|---|
| `agent runtime / Claude Agent SDK / per-token billing` | KEEP | Verbatim retention. |
| `scheduling / launchd (macOS) / local / $0` | KEEP | Verbatim retention. |
| `local model / Ollama (Qwen3-14B, nomic-embed-text) / local / $0` | REPLACE with row 3 (heavy inference, new model spec) | nomic-embed-text + Qwen3-14B was a multi-purpose row pile-up. Split: heavy inference gets its own row with correct model; embeddings deferred (Sean's pick dropped). |
| `animation pipeline (downstream consumer) / ...` | KEEP | Verbatim retention as row 6. |

Added: row 4 (multi-CLI critic), row 5 (HybridRouter). Net: 4 rows → 6 rows.

**Notes on Sean's pick:**
- Dropped candidates: gemma4:e4b row (light local inference — minor compared to heavy inference + multi-CLI critic), nomic-embed-text (embeddings — tooling detail), intent-engineering-mcp cross-link (Sean kept the mutual A-2 ↔ A-3 link off since A-3 already cross-links INTO Code Brain).
- HybridRouter named explicitly in row 5 tool cell — its canonical portfolio home.
- The 6-row shape lands the three-machine + multi-CLI critic + downstream-consumer credibility moves in one compact strip.

---

## A-3 intent-engineering-mcp — Methods strip (LOCKED, 5 rows)

**File:** `src/content/work/intent-engineering-mcp.mdx` — frontmatter `methods:` array (lines 26–42 currently).

**Replace existing 4-row methods array with:**

```yaml
methods:
  - task: protocol implementation
    tool: TypeScript MCP SDK
    cost: open-source / $0
    link: null
  - task: transport
    tool: stdio
    cost: local / $0
    link: null
  - task: registry verification
    tool: DNS-verified MCP registry
    cost: free
    link: null
  - task: package publish
    tool: npm
    cost: free tier
    link: null
  - task: development environment
    tool: Claude Code
    cost: per-token billing
    link: /work/code-brain
```

**Per-row grounding:**

| Row | Receipt |
|---|---|
| 1 | sw-mcp-intent-engineering README §"Build discipline": "SDK pinned at @modelcontextprotocol/sdk@1.29.0 (stable v1.x line, not the v2 pre-alpha)." Version number deliberately omitted from Methods strip per spec §8.4 (no version numbers). |
| 2 | sw-mcp-intent-engineering README §"Limitations": "Stdio transport only. No Streamable HTTP, no SSE, no remote hosting. Run it locally next to your client." |
| 3 | sw-mcp-intent-engineering README §"Quickstart" + investigation board artifact-4 caption: "DNS-verified registry listing live under com.seanwinslow/intent-engineering." Namespace + cost both honest. |
| 4 | sw-mcp-intent-engineering existing on-disk row + README §"Quickstart" npm install line. `@swins/intent-engineering-mcp@0.1.0` package omitted from tool cell to match A-2's no-package-name convention. |
| 5 | New row replacing existing on-disk row (which had `link: null`). Per Sean's confirm: cross-link to `/work/code-brain` lands the development-environment thread that ties intent-engineering-mcp back to the Code Brain agentic-engineering hub. |

**What changed from on-disk:**

| Existing row | Disposition | Why |
|---|---|---|
| `protocol implementation / MCP SDK / open-source / $0` | KEEP shape; tool cell typed correction | "TypeScript MCP SDK" makes the language stack explicit without claiming a version number. |
| `registry verification / DNS-verified MCP registry / registry / $0` | KEEP shape; cost cell tightened | `free` reads cleaner than `registry / $0`. Same operational truth. |
| `package publish / npm / free tier` | KEEP | Verbatim retention. |
| `development / Claude Code / per-token billing / link: null` | REPLACE with row 5 | Task label tightened (`development` → `development environment`); link added per Sean's confirm. Methods graph gains an inbound edge to Code Brain. |

Added: row 2 (transport — new). Net: 4 rows → 5 rows.

**Notes on Sean's pick:**
- Agreed with recommendation; minimal editorial diff.
- Cross-link to `/work/code-brain` mirrors A-1's orchestration cross-link — two case studies pointing into Code Brain as the development hub.

---

## A-4 the-block — Methods strip (LOCKED, 5 rows)

**File:** `src/content/work/the-block.mdx` — frontmatter `methods:` array (lines 24–36 currently, will hold the Surface 1 2-row transitional stub when Surface 1 applies first).

**Replace the Surface 1 2-row stub with the 5-row final:**

```yaml
methods:
  - task: production tooling
    tool: 3 Claude Skills (etf-page-creator + stakeholder-update + jira-automation)
    cost: per-token billing
    link: /work/code-brain
  - task: revops automation
    tool: Zapier + Tables (11 workflows + 10 intake forms + central DB)
    cost: SaaS
    link: null
  - task: PRD authoring
    tool: Claude Code + Confluence
    cost: per-token + SaaS
    link: /work/code-brain
  - task: AI media generation
    tool: Nano Banana Pro + Veo 3.1 / Kling 3.0 + ElevenLabs
    cost: per-credit
    link: null
  - task: analytics
    tool: GA4
    cost: free tier
    link: null
```

**Per-row grounding:**

| Row | Receipt |
|---|---|
| 1 | Sean_Winslow_Resume_AI_PM.md Work Experience bullet 1: "Shipped 3 production Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`)." Cross-link to Code Brain — production tooling thread. |
| 2 | Sean_Winslow_Resume_AI_PM.md Work Experience bullet 2: "11 Zapier workflows + 10 product-specific intake forms + central Tables database." |
| 3 | the-block-resume-additions-2026.md §10 ("Drafted the PRD and shipped the Polymarket Sponsored Courses integration") + the-block-resume-info `_CONVERSION-LOG-2026-05-09.md` rows confirming Confluence-format PRDs exist on disk. Cross-link to Code Brain — PRD authoring uses Claude Code per Sean's daily workflow per resume additions §3. |
| 4 | Resume Work Experience bullet 4: "Automated AI-assisted image, video, and voiceover generation for the Campus 201 enterprise course launch using Nano Banana Pro, Veo 3.1 / Kling 3.0, and ElevenLabs APIs." Cost cell: `per-credit` (generic — each API has its own credit model; mixed). |
| 5 | the-block-resume-additions-2026.md §15: "Utilized GA4 to track website traffic and user analytics... brainstorm our website redesign." Per Sean's 2026-05-28 editorial: "All PM's should be able to work with analytics. Let's highlight that." |

**What changed from Surface 1 stub:**

| Surface 1 stub row | Disposition |
|---|---|
| `production tooling / 3 Claude Skills / per-token billing / link /work/code-brain` | KEEP verbatim as row 1 |
| `revops automation / Zapier + Tables / SaaS` | KEEP verbatim as row 2 |

Added: rows 3, 4, 5 (PRD authoring with Code Brain cross-link, AI media generation, GA4 analytics). Net: 2-row stub → 5-row final.

**Notes on Sean's pick:**
- Opener ¶3 calls the Methods strip "lean by design" — 5 rows is the upper bound of lean. Still tighter than A-1 (6) and A-2 (6).
- Two Code Brain cross-links (rows 1 + 3). Per spec §8.2 cross-links are allowed at any density; the doubling makes the agentic-engineering thread visible twice in the same strip, which is honest about how the work happened. Visually the two `→` arrows in the AGENT/TOOL column show the same destination; reads as "this PM uses Claude Code routinely," not as redundancy.
- GA4 row foregrounds the analytics surface per Sean's stated editorial intent — recruiters scanning for "can this PM work with data?" get a yes signal at row 5.

---

## A-5 16bitfit — Methods strip (LOCKED, 5 rows)

**File:** `src/content/work/16bitfit.mdx` — frontmatter `methods:` array (lines 26–38 currently).

**Replace existing 3-row methods array with:**

```yaml
methods:
  - task: game engine
    tool: Phaser 3 (WebView bridge)
    cost: open-source / $0
    link: null
  - task: mobile shell
    tool: React Native + Expo + TypeScript
    cost: open-source / $0
    link: null
  - task: backend
    tool: Supabase Cloud (PostgreSQL + Edge Functions + Storage)
    cost: SaaS
    link: null
  - task: sprite generation
    tool: Gemini Nano Banana 2 via pixel-art Gemini skill
    cost: ~$0.034/image (1K)
    link: null
  - task: animation pipeline (sibling)
    tool: Animation Pipeline
    cost: see case study
    link: /work/animation-pipeline/
```

**Per-row grounding:**

| Row | Receipt |
|---|---|
| 1 | 16BitFit-V3 CLAUDE.md §"Tech Stack": "Game Engine: Phaser 3 (WebView bridge)." Existing on-disk row, retained shape with WebView bridge detail added per CLAUDE.md verbatim. |
| 2 | 16BitFit-V3 CLAUDE.md §"Tech Stack": "Frontend: React Native (Expo) + TypeScript." |
| 3 | 16BitFit-V3 CLAUDE.md §"Supabase (Backend)" callout: "IMPORTANT: This project uses Supabase Cloud Database - NOT local Docker instances. Project Reference: noxwzelpibuytttlgztq." Specifies PostgreSQL + Edge Functions + Storage per §"Tech Stack" verbatim. |
| 4 | T1.2 stack-truth correction: "Gemini Nano Banana 2 (pixel-art Gemini skill)" replaces existing on-disk `Seedance 2.0 + pixel-art Gemini skill`. Cost per Sean's 2026-05-28 confirm: `~$0.034/image (1K)` — 1K resolution is the operational target Sean uses for sprite generation. |
| 5 | Existing on-disk row, retained verbatim. Cross-link to A-1 — anima is the sibling pipeline 16BitFit waits on per the locked four_q `learn` ("the return condition is the animation pipeline shipping its first full short"). |

**What changed from on-disk:**

| Existing row | Disposition | Why |
|---|---|---|
| `game engine / Phaser / open-source / $0` | KEEP shape; tool cell extended | `Phaser 3 (WebView bridge)` matches 16BitFit-V3 CLAUDE.md verbatim. |
| `sprite generation / Seedance 2.0 + pixel-art Gemini skill / ~$1/run` | REPLACE per T1.2 | Stack-truth: Seedance is video interpolation, not sprite stills. NB2 + pixel-art Gemini skill is the actual generator. Cost: Sean's confirmed ~$0.034/image at 1K. |
| `pipeline (cross-link) / Animation Pipeline / see case study / link /work/animation-pipeline/` | KEEP shape; task label tightened | `pipeline (cross-link)` → `animation pipeline (sibling)`. Mirrors A-2 row 6 (`animation pipeline (downstream consumer)`) — both describe a relationship to A-1, with different relational verbs. |

Added: row 2 (mobile shell), row 3 (backend). Net: 3 rows → 5 rows.

**Notes on Sean's pick:**
- Agreed with recommendation + ~$0.034/image cost confirm.
- Avatar generation pipeline (Smooth-to-Pixel via Runware AIR) deferred from the strip — it's the investigation board artifact-4 evidence + the case-study body explains it; doesn't need to double on the Methods strip.
- The strip lands the full stack truth (Phaser + React Native + Supabase + NB2) without crowding into avatar pipeline detail, which keeps the recruiter eye on the pipeline-is-the-artifact thesis instead of the unfinished game's internals.

---

## Methods graph topology after this lock

Per spec §8.2, the Methods strip emerges as a methods graph across the portfolio when AGENT/TOOL cells cross-link. Inbound edge count per case study after this lock:

| Case study | Inbound cross-links | Source rows |
|---|---|---|
| **A-2 Code Brain** | 4 inbound (most-cross-linked) | A-1 orchestration · A-3 development environment · A-4 production tooling · A-4 PRD authoring |
| **A-1 Animation Pipeline** | 2 inbound | A-2 downstream consumer · A-5 sibling |
| **A-3 Intent Engineering MCP** | 0 inbound | — (shipped product / leaf node) |
| **A-4 The Block** | 0 inbound | — (archived / leaf node) |
| **A-5 16BitFit** | 0 inbound | — (paused / leaf node) |

The graph makes two claims visible without prose stating them:
1. **Code Brain is the agentic-engineering hub** — every active or shipped project cross-references it for development, orchestration, or tooling.
2. **Animation Pipeline is the production-system hub** — A-2 runs it (Code Brain orchestrates anima); A-5 inherits it (16BitFit's pause condition is anima shipping). The cross-link verb difference matters: "downstream consumer" (A-2) describes orchestration from above; "sibling" (A-5) describes inheritance from below.

The 6 portfolio-wide cross-links cluster on these two hubs. Spec §8.2 explicitly anticipates this pattern: "The Methods strip emerges as a methods graph across the portfolio — code brain appears in 3 case studies' methods, animation pipeline appears in 1, etc." Locked count this session: Code Brain in 3 cross-linking case studies (4 cells); Animation Pipeline in 2 cross-linking case studies (2 cells). Matches spec anticipation.

---

## Spec implications

No spec amendments required by this lock. Two confirmations the spec already supports:

| Spec section | Confirmation |
|---|---|
| §8.1 — 4–7 rows typical | All 5 strips fall in range (5 to 6 rows each). |
| §8.2 — cross-link rule | 6 total cross-links across all 5 strips (4 to Code Brain + 2 to Animation Pipeline). Per spec §8.2, the methods graph property emerges. Visual rendering: `→` arrow + 1px underline on cross-linked cells. |
| §8.4 — not a tech-stack badge wall | All 27 rows audited: no logos, no version numbers (except where the major version is part of product identity), no "powered by." Each row is operational truth. |

The case-study-spec §8.1 sample Methods table (currently shows A-1 sample with Seedream + ~$0.40/run) gets reconciled by the openers second 2026-05-27 amendment's already-queued spec-edit. No new spec amendment from this lock.

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini, the sequence — applied alongside or after Surfaces 1 + 2 cleanup locks:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; prior 10 lock docs should have landed)
3. **A-1 — `src/content/work/animation-pipeline.mdx`:**
   - Add `methods:` array per §A-1 above (5 rows)
   - If `methods:` already exists from earlier Phase 2 build scaffold, replace with the locked 6-row content
4. **A-2 — `src/content/work/code-brain.mdx`:**
   - Replace `methods:` array (lines 22–38) with the locked 6-row content per §A-2 above
5. **A-3 — `src/content/work/intent-engineering-mcp.mdx`:**
   - Replace `methods:` array (lines 26–42) with the locked 5-row content per §A-3 above
6. **A-4 — `src/content/work/the-block.mdx`:**
   - Replace the Surface 1 transitional 2-row stub with the locked 5-row final per §A-4 above
   - If Surface 1 lock applied first, the stub overwrites cleanly
   - If applying A-4 cleanup + Methods strip in the same commit, write the 5-row final directly (skip the stub)
7. **A-5 — `src/content/work/16bitfit.mdx`:**
   - Replace `methods:` array (lines 26–38) with the locked 5-row content per §A-5 above
8. Run `npm run dev` and QA:
   - `/work/animation-pipeline/` Methods strip renders 6 rows; row 3 orchestration cell shows `Code Brain →` with cross-link underline; cost cell mentions "Claude Sonnet 4.6 (HybridRouter)"
   - `/work/code-brain/` Methods strip renders 6 rows; row 3 names `qwen3.6_35b-a3b-32k on MBP via Ollama`; row 5 names HybridRouter with the new model spec; row 6 cross-links to `/work/animation-pipeline/`
   - `/work/intent-engineering-mcp/` Methods strip renders 5 rows; row 5 cross-links to `/work/code-brain`
   - `/work/the-block/` Methods strip renders 5 rows; rows 1 + 3 both cross-link to `/work/code-brain` (two arrows in adjacent rows reads as honest, not redundant)
   - `/work/16bitfit/` Methods strip renders 5 rows; row 4 names NB2 + cost `~$0.034/image (1K)`; row 5 cross-links to `/work/animation-pipeline/`
   - Cross-link navigation: clicking any cross-linked cell triggers View Transition to the target case study
   - `scripts/validate_case_study.mjs` passes for all 5 MDX files
9. Commit (single commit covering 5 MDX files):
   ```bash
   git add src/content/work/animation-pipeline.mdx src/content/work/code-brain.mdx src/content/work/intent-engineering-mcp.mdx src/content/work/the-block.mdx src/content/work/16bitfit.mdx
   git commit -m "Methods strips locked for all 5 case studies per methods-strips-locked-2026-05-28 (6+6+5+5+5 rows; methods graph: Code Brain ×4 inbound + Animation Pipeline ×2 inbound)"
   ```
10. **Surface 4 (closing session)** — final verification pass across all 12 lock docs. Cross-checks every locked string against source-of-truth files, catches remaining ceiling violations + cross-link slug resolution + voice drift.

---

## Source-of-truth files used in this lock

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md` | A-1 stack truth — NB2 keyframes, Seedance 2.0 motion, Maya/Cy/...Mo persona inventory, T1/T2/T3 critic stack costs |
| `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md` | A-2 stack truth — Claude Agent SDK, launchd cadences, HybridRouter, vault critic Codex CLI + Anti-Gravity CLI parallel |
| `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/README.md` | A-3 stack truth — TypeScript MCP SDK, stdio transport, DNS-verified registry namespace, npm package |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md` | A-4 stack truth — 3 Claude Skills, 11 Zapier workflows + 10 intake forms + central Tables DB, AI media APIs (Nano Banana Pro / Veo 3.1 / Kling 3.0 / ElevenLabs) |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md` | A-4 stack truth — GA4 analytics row receipt + Confluence PRD authoring details |
| `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md` | A-5 stack truth — Phaser 3 WebView bridge, React Native + Expo + TypeScript, Supabase Cloud (PostgreSQL + Edge Functions + Storage), Smooth-to-Pixel avatar pipeline |
| Sean's 2026-05-28 cost confirms | A-5 NB2 sprite gen cost (~$0.034/image at 1K); A-2 model spec (qwen3.6_35b-a3b-32k on MBP via Ollama) |
| Prior 10 lock docs | Source of truth for tagline + anchor_metric + opener + four_q + investigation board carryover across all 5 case studies |

---

## Companion lock docs

Eleventh lock doc in the broader writing-council sequence. Workstream D (locks 1–8) + cleanup phase 1–3 (locks 9–11):

1. [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md)
2. [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) (with 2 amendments)
3. [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md)
4. [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) (with 1 amendment)
5. [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)
6. [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md)
7. [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md)
8. [`site-chrome-prose-locked-2026-05-28.md`](site-chrome-prose-locked-2026-05-28.md) — closes Workstream D
9. [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md) — cleanup phase 1
10. [`investigation-boards-a2-a3-a5-locked-2026-05-28.md`](investigation-boards-a2-a3-a5-locked-2026-05-28.md) — cleanup phase 2
11. **This doc** — Methods strips for all 5 case studies (cleanup phase 3)
12. *(closing session)* Surface 4 — final verification pass across all 11 lock docs (cleanup phase 4)

All carry-forward constraints accumulate across the 11 lock docs. Sean retains voice authority on every locked string above.

---

*Authored 2026-05-28 in the brainstorm-ideas-existing skill session on MBP, post-Workstream-D cleanup phase 3. Sean retains voice authority on every locked string above.*
