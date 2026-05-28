# A-4 The Block — Broader Cleanup — Locked Content

**Date:** 2026-05-28
**Status:** LOCKED — Phase 1 frontmatter mechanical fixes + Phase 2 investigation board full rework + Phase 3 methods array transitional stub. Ready to apply on Mac Mini AFTER the prior 8 Workstream D lock docs land. Closes the long-standing A-4 cleanup carry-over flagged in the 2026-05-26 openers lock + the 2026-05-27 four_q lock.
**Scope:** `src/content/work/the-block.mdx` — every field + section that was anchored to the fabricated 2024–2026 two-products-three-tier-structure premise. Specifically: frontmatter dates + role + hero_media_alt + archived_reference_url, the full investigation board (4 fabricated artifacts cut, 6 resume-confirmed artifacts authored), and a transitional 2-row methods stub that survives forward into Surface 3. Out of scope: tagline + anchor_metric + opener + four_q (all locked in prior docs; cross-confirmed here as the source of truth).
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-28 (post-Workstream D — Workstream D Phase 5 / cleanup phase 1).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## ⚠️ Apply order — read before Mac Mini work

This is the **ninth Workstream D lock doc** (the first of the post-Workstream-D cleanup queue). Apply sequence at Mac Mini-side:

1. Eight prior Workstream D locks (transactions → architecture → essays → site chrome inclusive). Per the site chrome lock's apply order.
2. **This doc** — A-4 broader cleanup. Can apply concurrently with the openers + taglines + four_q locks for The Block (they all target `src/content/work/the-block.mdx`). Recommend single commit covering all four A-4 locks together.
3. *(next sessions)* Surface 2 — A-2 / A-3 / A-5 investigation boards. Surface 3 — Methods strips full authoring for all 5 case studies. Surface 4 — final verification pass.

The 6 investigation board artifacts authored here are resume-confirmed and sanitized by construction. The 2-row methods stub in Phase 3 is transitional — Surface 3 expands it into a full 4-7 row strip.

---

## TL;DR — what's locked

### Phase 1 — Mechanical frontmatter fixes (the-block.mdx)

| Line | On disk | Locked |
|---|---|---|
| 15 `date_started:` | `2024-02-01` | `2025-11-10` |
| 16 `date_active_through:` | `2026-02-01` | `2026-05-04` |
| 18 `role:` | `pm + product partner` | `pm + builder` |
| 11 `hero_media:` | `/assets/projects/the-block.webp` (existing 3-tier-matrix asset, fabricated) | re-author per §1.3 asset spec; same path overwritten |
| 13 `hero_media_alt:` | "3-tier customer matrix" alt text | rewritten per §1.3 |
| 22 `archived_reference_url:` | placeholder URL | `null` — drop the field, the page carries enough work-anchoring |

### Phase 2 — Investigation board full rework (forward-chronological per spec §12.4)

6 resume-confirmed artifacts replacing the 4 fabricated ones currently on disk. Sequence:

| # | Date | Type | Resume thread |
|---|---|---|---|
| 1 | DEC 2025 | PRDDecision | Polymarket × Campus PRD v1 — first 0-to-1 ship scope-locked at 5 components |
| 2 | JAN 2026 | MetricChart | `etf-page-creator` Claude Skill ships + RevOps automation pipeline collapses 7 manual handoff steps to 0 |
| 3 | FEB 2026 | PRDDecision | Polymarket × Campus PRD v3 — 5-component shipped state + Sales One-Pager productizes the partnership |
| 4 | MAR 2026 | BoardArtifact | Block Pro 2.0 competitive landscape kickoff — 9 platforms benchmarked + 3 stakeholder interviews scope the proposal |
| 5 | APR 2026 | BoardArtifact | x402 / A2A / MCP strategy memo — 6 agent-economy monetization patterns mapped |
| 6 | MAY 2026 | BoardArtifact | bi-weekly P&E final + 3 Claude Skills KR3 delivery (etf-page-creator + stakeholder-update + jira-automation) |

### Phase 3 — Methods array (transitional stub)

`methods:` set to a 2-row stub that's resume-confirmed and survives forward into the Surface 3 full rebuild. Avoids rendering an empty Methods strip between Surface 1 + Surface 3 apply commits.

---

## Carry-forward constraints

No new constraints — this lock applies the cumulative constraint set from the 8 prior Workstream D locks. The notable ones that actually intersect this surface:

1. **Resume-evidence anchoring for ARCHIVED case studies** (four_q lock #2). Every artifact, every metric, every named surface in this lock is groundable in `Sean_Winslow_Resume_AI_PM.md` or `the-block-resume-additions-2026.md`. No fabricated dates, fabricated tier structures, fabricated subscriber arcs. The audit cut every line that couldn't pass the resume-grounding test.
2. **No tenure-foregrounding on public surfaces** (openers lock #7 + four_q lock #1). Investigation board dates use wire-service-mono month stamps per spec §7.3 — dates appear AS evidence, not as tenure-framing. Frontmatter `date_started` / `date_active_through` carry the actual range for any reader who needs it.
3. **Agentic-engineering thread as load-bearing framing** (four_q lock #3). Phase 2's investigation board sequence makes the thread visible: 3 production Claude Skills shipped, RevOps automation as the recursion-on-PM-work-itself receipt, x402 memo as the future-PM thesis artifact. Forward-chronological lets the recruiter watch the thread emerge across the 6 months.
4. **No tagline echo + no opener echo + no 4Q echo** in investigation board captions. Each artifact carries its own facet of the multi-surface scope; captions name the artifact and its 1-claim significance, not the page's overall argument.
5. **Wire-service mono throughout the investigation board** (spec §4 voice register). Past-tense, factual, one claim per caption. No first-person, no editorial flourish, no Sedaris-coded warmth (that lives in the opener, not here).
6. **No traces of desperation** (openers lock #6). Page reads identically hired vs hunting at every level of detail. The MAY 2026 final-bi-weekly artifact closes the arc as a ship, not as a departure.

---

## Phase 1 — Mechanical frontmatter fixes (LOCKED)

### 1.1 `date_started:` + `date_active_through:`

**File:** `src/content/work/the-block.mdx` — frontmatter lines 15–16.

```yaml
date_started: 2025-11-10
date_active_through: 2026-05-04
```

**Why:** 2025-11-10 is Sean's actual start date at The Block (confirmed 2026-05-28). 2026-05-04 is the layoff date per `Sean-Winslow-Full-Personal-Context-v2.0.md` §"Active Projects" + the resume's "November 2025 – May 2026" line. Both fields are frontmatter-only; neither surfaces in prose (constraint #2). The on-disk values (2024-02-01 → 2026-02-01) were carried over from the fabricated 2024–2026 two-year arc and are simply wrong.

### 1.2 `role:`

**File:** `src/content/work/the-block.mdx` — frontmatter line 18.

```yaml
role: pm + builder
```

**Why:** Matches the chrome convention from case-study-spec §2 anatomy (`ROLE — pm + builder + operator` example). Acknowledges that Sean both PM'd the multi-surface scope AND shipped production tooling (3 Claude Skills + RevOps pipeline + competitive audit + PRD-to-Prototype Lab). `pm + product partner` (current) reads as a vague consulting-flavored title that doesn't carry the agentic-engineering thread the 4Q lock foregrounds. `product manager` alone is accurate but loses the builder signal that maps Sean to AI-PM positioning. The compound `pm + builder` matches the spec convention AND the resume Summary line ("AI Product Manager and agentic-engineering practitioner").

### 1.3 `hero_media:` + `hero_media_alt:`

**File:** `src/content/work/the-block.mdx` — frontmatter lines 11–13.

**Locked:**

```yaml
hero_media: /assets/projects/the-block.webp
hero_media_type: image
hero_media_alt: "A hand-drawn pencil-test composite of the multi-surface PM scope at The Block — three Claude Skill cards (etf-page-creator, stakeholder-update, jira-automation) on the left, a RevOps pipeline flow diagram center (Salesforce Closed Won → Jira tickets, intake emails, Slack notifications), and an x402 / A2A / MCP memo stamped at right. The bi-weekly P&E status update sits across the top, frame-of-frames."
```

**Path stays `/assets/projects/the-block.webp`** — current file at that path is the fabricated 3-tier-matrix diagram; it gets **overwritten in place** by the new asset. No path change, no MDX edit besides the alt text.

**Asset authoring spec (for `gemini-pencil-animation-image-gen` skill):**

| Element | Spec |
|---|---|
| Format | 16:9, .webp, ~1MB target |
| Style | Pencil-test on cream paper, ink lines, matches portfolio aesthetic. Construction lines visible. Paper grain. Hole-punch marks down the left edge per anima visual identity. |
| Composition | 4-quadrant composite: top band (full width) = bi-weekly P&E status update as a one-pager "frame around everything"; bottom-left = 3 Claude Skill cards in a row, labeled `etf-page-creator` / `stakeholder-update` / `jira-automation`; bottom-center = RevOps pipeline flow diagram (boxes: Salesforce "Closed Won" → arrows → Jira parent/child tickets + intake emails + Slack notifications + Tables DB); bottom-right = x402 / A2A / MCP memo as a stamped/bordered document, "STRATEGY MEMO" header visible. |
| Character | Sean's pencil-test character (per `reference-images/2D-Character-Sketch-Sean-v1.png`) somewhere in the margin or lower-right — operator pose, observing/holding the artifacts. Not center stage. |
| Palette | Cream paper `#FFF9F0`, ink `#1A1A1E`, teal `#0A3E42` accents on the Claude Skill cards, stamp amber `#7C2D12` on the x402 memo stamp + the bi-weekly update letterhead. |
| Negative space | Generous. The composite should read as inventory, not crowding. Recruiter scanning the hero should be able to name the 6 things visible within 3 seconds. |

Authoring fires when Sean has time before the the-block.mdx commit lands. Until then, the existing 3-tier-matrix `.webp` keeps rendering — visually inaccurate but doesn't break the build. Lock-doc apply does NOT block on asset authoring.

**Alt text rationale:** factual scene description, names every visible element + their spatial layout (accessibility requirement per spec §14). No editorial register, no first-person.

### 1.4 `archived_reference_url:`

**File:** `src/content/work/the-block.mdx` — frontmatter line 22.

**Locked: drop the field entirely** (or set explicitly to `null` if the validator requires the key to exist):

```yaml
archived_reference_url: null
```

**Why:** Sean cannot share documents he authored at The Block; the firm has not posted public content (Campus 201 marketing page, ETF launch pages, Polymarket × Campus landing) that names him. The single sanitized public artifact the spec §12.4 ARCHIVED pattern requests does not exist. Null is the honest shape; the page carries enough work-anchoring through the investigation board + Methods strip without leaning on an external proof link. If a public credit surfaces post-launch (Block publishes a Campus 201 announcement crediting Sean, a sanitized PRD becomes shareable, etc.), backfill amendment lands as a 1-line MDX edit.

**Companion render behavior:** the `FrameTheWorkPreamble` "Reference artifact" link rendered at the bottom of the investigation board (per spec §12.4) renders nothing when `archived_reference_url: null`. Confirm the component handles null gracefully without rendering a broken `→ reference artifact` affordance.

### 1.5 Confirm-by-lock (no changes here — source of truth lives in prior docs)

The following fields on `src/content/work/the-block.mdx` are LOCKED elsewhere and called out here as confirmed source-of-truth for the Mac Mini apply:

| Line | Field | Locked value | Lock source |
|---|---|---|---|
| 5 | `tagline:` | `B2B PM work where the agreement is the UX.` | [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md) §A-4 |
| 19 | `anchor_metric:` | `"B2B PM · INSTITUTIONAL CRYPTO RESEARCH"` | [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) 2026-05-27 second amendment §T2.4 |
| 38–43 | `four_q:` | full rebuild | [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) §A-4 |
| 51–55 | `<Opener>` body | amended 3 paragraphs | openers lock 2026-05-27 second amendment §T2.5 + four_q lock 2026-05-27 second amendment "Companion opener amendments" — the fully-amended ¶1 + ¶2 + ¶3 paragraphs are the canonical render |

Apply all four lock-doc updates in the same commit to keep the file self-consistent. The four locks together produce a fully resume-grounded the-block.mdx.

---

## Phase 2 — Investigation board full rework (LOCKED, paste-ready)

**File:** `src/content/work/the-block.mdx` — lines 57–95 (the `<InvestigationBoard>` block).

**Replace the entire block** (artifacts 1–4 currently on disk are all cut — fabricated dates + metrics + tier structure) **with the 6 artifacts below**.

```mdx
<InvestigationBoard>
  <PRDDecision
    artifactId="artifact-1"
    date="DEC 2025"
    prdTitle="Polymarket × Campus — Sponsored Microcourses PRD v1"
    decisionLine="Scope locked at 5 components: homepage module, Learn page hub, in-article recirculation, embedded course player, reporting requirements."
    rationale="The Block's editorial audience already reaches Polymarket's target market; Campus already produces the educational format. The 5-component build connects the two surfaces without standing up a new product team — sponsor-native distribution against the existing engagement loop.">
    <p slot="caption">DEC 2025 — Polymarket × Campus 0-to-1 PRD v1. First sponsored-microcourse B2B revenue vertical scoped end-to-end.</p>
  </PRDDecision>

  <MetricChart
    artifactId="artifact-2"
    date="JAN 2026"
    chartTitle="RevOps manual handoff steps per Closed Won — before vs after"
    yLabel="manual steps"
    data={[
      { x: "before", y: 7 },
      { x: "after",  y: 0 },
    ]}>
    <p slot="caption">JAN 2026 — etf-page-creator Claude Skill ships. RevOps automation pipeline collapses 7 manual handoff steps into a single Salesforce "Closed Won" trigger: 11 Zapier workflows + 10 product-specific intake forms + central Tables database.</p>
  </MetricChart>

  <PRDDecision
    artifactId="artifact-3"
    date="FEB 2026"
    prdTitle="Polymarket × Campus PRD v3 — 5-component shipped state"
    decisionLine="All 5 components landed; Sales One-Pager template productizes the partnership for repeatable revenue-team sale."
    rationale="Sponsored microcourse becomes a recurring revenue line, not a one-off integration. The Sales One-Pager template means the next sponsor ships without per-deal product involvement — partnership becomes infrastructure.">
    <p slot="caption">FEB 2026 — Polymarket × Campus 0-to-1 ships. PRD v1 → v3 across two months; Sales One-Pager makes the partnership repeatable.</p>
  </PRDDecision>

  <BoardArtifact
    artifactId="artifact-4"
    date="MAR 2026"
    boardLabel="Block Pro 2.0 — competitive landscape kickoff">
    <p slot="caption">MAR 2026 — Block Pro 2.0 product audit + competitive analysis begins. 9 enterprise data and research platforms benchmarked; 3 internal stakeholder interviews (sales, research, head of data) scope the proposal for the incoming CEO.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-5"
    date="APR 2026"
    boardLabel="x402 / A2A / MCP — internal strategy memo">
    <p slot="caption">APR 2026 — x402 protocol, agent-to-agent payments, and MCP integration mapped to 6 monetization patterns for the agent economy. Future-PM thesis artifact authored under the data and research firm's editorial roof.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-6"
    date="MAY 2026"
    boardLabel="bi-weekly P&E — final update + KR3 delivery">
    <p slot="caption">MAY 2026 — final bi-weekly Product and Engineering status update. 3 production Claude Skills shipped against P&E Q2 Objective 5 KR3: etf-page-creator, stakeholder-update, jira-automation. The writing discipline encoded as production tooling.</p>
  </BoardArtifact>
</InvestigationBoard>
```

### 2.1 Per-artifact grounding (resume evidence)

Every artifact + caption is groundable in `Sean_Winslow_Resume_AI_PM.md` or `the-block-resume-additions-2026.md`. Specific receipts:

| # | Resume evidence |
|---|---|
| 1 | Resume Work Experience bullet 5: "Drove 0-to-1 product creation: authored the PRD (v1→v3) and shipped The Block's first sponsored-microcourse B2B revenue vertical (Polymarket × Campus) — a 5-component build (homepage module, Learn page hub, in-article recirculation, embedded course player, reporting requirements)" + additions §10 ("Drafted the PRD and shipped the Polymarket Sponsored Courses integration") + `_CONVERSION-LOG` row `Campus_Sponsored_MicroCourses_PRD_v3.docx` (the actual v3 PRD file). |
| 2 | Resume Work Experience bullet 2: "Built an end-to-end RevOps automation pipeline — 11 Zapier workflows + 10 product-specific intake forms + central Tables database — turning a Salesforce 'Closed Won' trigger into auto-created parent/child Jira tickets, personalized client intake emails, and routed Slack notifications, eliminating 7 manual handoff steps per deal" + bullet 1: "Shipped 3 production Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`)" + additions §7 ("Automated/Scheduled Product workflows using Claude Skills"). |
| 3 | Same as #1 — resume bullet 5 names the 5 components + the Sales One-Pager template explicitly. |
| 4 | Resume Work Experience bullet 3: "Co-authored the Block Pro 2.0 product audit + competitive analysis (9 enterprise data/research platforms benchmarked) and conducted 3 internal stakeholder interviews (sales, research, head of data) to scope the pitch deck delivered to the incoming CEO" + additions §13. |
| 5 | Resume Leadership Experience bullet 2: "Authored internal x402 / A2A / MCP strategy memo mapping 6 potential agent-economy monetization patterns" + additions §11 + `_CONVERSION-LOG` row `x402 Strategy The Block.pdf` (the actual memo). |
| 6 | Resume Work Experience bullet 1: "Shipped 3 production Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`) automating WordPress ETF page generation, biweekly executive updates, and per-product Jira ticket scaffolding... direct delivery against the P&E Q2 Objective 5 KR3 ('Ship 1–3 Claude Skills')." |

No fabrication. No embellishment beyond what the resume + additions already document.

### 2.2 What changed from the on-disk fabricated board

| On-disk artifact (CUT) | Replaced by | Why cut |
|---|---|---|
| `artifact-1` "Campus product launch — Q1 2024" | Polymarket × Campus PRD v1 (DEC 2025) | Sean did not launch Campus v1; Sean's tenure started Nov 2025, well after Campus existed. |
| `artifact-2` "Subscription tier structure" — 3-tier model | Polymarket × Campus PRD v3 shipped (FEB 2026) | Sean did not own subscription tier decisions; the 3-tier (research-only / +data / +data+API) narrative was fabricated. |
| `artifact-3` "RevOps internal launch" (2025 Q2) | RevOps handoff metric (JAN 2026) | Sean DID build the RevOps automation but it was Jan 2026, not 2025 Q2; the work is real but the date and framing were wrong. |
| `artifact-4` "Institutional subscriber growth" — 18→134 across 2024 Q2–2025 Q4 | (no replacement metric chart in the same slot) | Subscriber arc was wholly fabricated; no resume evidence. Replaced thematically by the JAN 2026 handoff-step MetricChart, which IS a real before/after Sean owned. |

The new board has 6 artifacts (within spec §7.1's 4–6 typical range); the old board had 4 + 1 implicit "Reference artifact" link. The wire-service register holds throughout.

### 2.3 Cross-confirmation with the locked opener + 4Q

The investigation board sequence visually substantiates the four_q lock's `what` block + the opener's ¶1 surface inventory:

| Locked text element | Investigation board echo |
|---|---|
| Opener ¶1 surface inventory: "the Campus education product, the ETF launch page workflow on WordPress, the Polymarket × Campus sponsored-microcourse vertical, the .co homepage redesign competitive audit, the RevOps automation pipeline behind Salesforce closes" | Artifacts 2 (RevOps), 1+3 (Polymarket × Campus), 4 (Block Pro 2.0 audit substitutes for the .co audit thematically), 6 (the 3 Skills including etf-page-creator) |
| Opener ¶2 (per the four_q lock's 2026-05-27 second amendment): "the Polymarket microcourse builds faster when you've already drafted the five components out loud" | Artifacts 1 + 3 carry the v1 → v3 progression that the opener references; the five components are listed verbatim in artifact 1's decisionLine. |
| 4Q `what`: "three production Claude Skills shipped against the P&E Q2 OKR (etf-page-creator, stakeholder-update, jira-automation)" | Artifacts 2 + 6 carry the KR3 ship; the three skills are named in 6's caption. |
| 4Q `break` failure mode #1: "Handoff multiplication — seven manual handoff steps per deal in the RevOps process before automation" | Artifact 2's MetricChart shows the 7 → 0 metric directly. |

The page reads as a self-consistent document end-to-end after the four locks land together.

---

## Phase 3 — Methods array transitional stub (LOCKED)

**File:** `src/content/work/the-block.mdx` — frontmatter lines 24–36.

Surface 3 (next session) authors the full 4–7 row Methods strip. This lock sets a **2-row transitional stub** that's resume-confirmed and survives forward into the Surface 3 expansion — avoids rendering an empty/broken Methods strip section between the Surface 1 and Surface 3 apply commits.

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
```

**Why this stub:**

| Row | Resume evidence | Survives Surface 3? |
|---|---|---|
| `production tooling` row | Resume Work Experience bullet 1 (3 Claude Skills KR3 delivery) | Yes — likely stays as a Methods row, possibly tightened in label or cost field |
| `revops automation` row | Resume Work Experience bullet 2 (11 Zapier + 10 intake forms + central Tables DB + 7 handoff steps eliminated) | Yes — likely stays as a Methods row, possibly split into 2 rows (intake + pipeline) per Surface 3 editorial |

Cross-link to `/work/code-brain` on the production-tooling row is the canonical home for the agentic-engineering thread; matches the four_q lock's framing of the Skills as the agentic-engineering-thread receipts.

**Surface 3 expansion candidates** (called out here so the next session knows what to draw from):

- Campus 201 enterprise course launch — AI media generation (Nano Banana Pro + Veo 3.1 / Kling 3.0 + ElevenLabs)
- Polymarket × Campus PRD authoring — Claude Code + Confluence + Figma
- Block Pro 2.0 competitive analysis — manual + GA4 + competitive synthesis tooling
- bi-weekly P&E status update — `stakeholder-update` Claude Skill (recursion on writing-discipline)
- x402 / A2A / MCP strategy memo — research + synthesis
- 10-week P&E Department 2.0 execution plan — Confluence + Templates Library
- PRD-to-Prototype Lab — internal reference project for designers + engineers
- Onboarding fellow PMs on Claude Code — workshop + Skills library

Surface 3 picks 4–7 from the combined stub + candidate list per spec §8.1.

---

## Spec implications

No spec amendments needed by this lock. The case-study spec §13.4 sample section already flagged the broader-cleanup work as pending; this lock executes that pending work without changing the spec's shape rules.

Two confirmations the spec already supports:

| Spec section | Confirmation |
|---|---|
| §7.2 — 4 artifact types | All 6 new artifacts use the 4 declared types (3× BoardArtifact + 2× PRDDecision + 1× MetricChart). No new artifact type introduced. |
| §12.4 — ARCHIVED page shape | The page renders cleanly when `archived_reference_url: null` — the Reference artifact link affordance renders nothing rather than a broken `→` link. Confirm the `FrameTheWorkPreamble` component handles null gracefully (audit during Mac Mini QA). |

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini, the sequence — applied alongside the 3 prior A-4 locks (openers + tagline + four_q) for a single self-consistent commit:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; prior 8 Workstream D locks should already have landed)
3. **Open `src/content/work/the-block.mdx`** — single file edit for the broader-cleanup commit. All 4 A-4 locks (openers + tagline + four_q + this doc) land in the same commit.
4. **Frontmatter changes (Phase 1):**
   - Line 5 `tagline:` → `B2B PM work where the agreement is the UX.` (per taglines lock)
   - Line 11 `hero_media:` → unchanged path (`/assets/projects/the-block.webp`); asset itself re-authored separately per §1.3 spec
   - Line 13 `hero_media_alt:` → new alt text per §1.3
   - Line 15 `date_started:` → `2025-11-10`
   - Line 16 `date_active_through:` → `2026-05-04`
   - Line 18 `role:` → `pm + builder`
   - Line 19 `anchor_metric:` → `"B2B PM · INSTITUTIONAL CRYPTO RESEARCH"` (per openers 2026-05-27 second amendment T2.4)
   - Line 22 `archived_reference_url:` → `null` (drop the placeholder URL)
   - Lines 24–36 `methods:` → 2-row stub per §Phase 3
   - Lines 38–43 `four_q:` → full block per four_q lock §A-4
5. **MDX body changes (Phase 2):**
   - Lines 51–55 `<Opener>` body → 3 amended paragraphs per openers second 2026-05-27 amendment + four_q lock 2026-05-27 second amendment "Companion opener amendments"
   - Lines 57–95 `<InvestigationBoard>` block → 6 new artifacts per §Phase 2 above
6. **Asset re-authoring (separate prerequisite, can fire before OR after the commit lands without blocking):**
   - Use `gemini-pencil-animation-image-gen` skill with the §1.3 asset spec
   - Output to `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/projects/the-block.webp` (or `reference-images/` then move per Phase 2 scaffold)
   - Until landed: existing 3-tier-matrix `.webp` continues to render; alt text mismatches reality but build doesn't break
7. Run `npm run dev` and QA:
   - `/work/the-block/` renders with the new opener, new four_q, new investigation board
   - 6 investigation board artifacts render in forward-chronological order (DEC 2025 → MAY 2026)
   - Methods strip renders 2 rows (transitional state — Surface 3 expands)
   - ARCHIVED status page shape: title block status pill in secondary ink, right-margin accent at 50% opacity, frame-the-work preamble renders, Reference artifact link affordance does NOT render (because `archived_reference_url: null`)
   - `scripts/validate_case_study.mjs` passes (every required frontmatter field present)
   - `scripts/fetch_explanations.mjs` either reads from `four_q:` frontmatter mirror (Option B per spec §9.2) or fetches `explanation_url` if set — this lock keeps `four_q:` frontmatter as the source for A-4 since The Block doesn't have a public EXPLANATION.md
   - View Transition: clicking the A-4 tile on `/` morphs into the case-study hero cleanly (status-driven palette desaturation activates on the case-study side)
   - Title block status pill renders `ARCHIVED` in secondary ink `#546E71`
   - Anchor metric renders `B2B PM · INSTITUTIONAL CRYPTO RESEARCH`
   - Tagline renders `B2B PM work where the agreement is the UX.`
8. Commit (single commit covering 4 A-4 locks):
   ```bash
   git add src/content/work/the-block.mdx
   git commit -m "A-4 The Block — 4 locks applied (opener + tagline + anchor_metric + four_q + broader cleanup: frontmatter dates/role/alt/null reference url + 6-artifact investigation board + methods stub) per writing-council lock docs 2026-05-26 / 2026-05-27 / 2026-05-28"
   ```
9. (Optional follow-up, separate commit) Author the new hero `.webp` per §1.3 asset spec via the `gemini-pencil-animation-image-gen` skill; commit to `public/assets/projects/the-block.webp` (overwrites the existing 3-tier-matrix file).
10. **Surface 2 (next session)** — investigation board content authoring for A-2 / A-3 / A-5. Cross-references this lock for the Surface 1 grounding pattern.
11. **Surface 3 (next session)** — Methods strips full authoring for all 5 case studies including expansion of the 2-row A-4 stub locked here.

---

## Source-of-truth files used in this lock

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md` | Canonical resume — Work Experience bullets 1–7 + Leadership Experience bullets 1–5 ground every investigation board artifact + caption + Methods stub row |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md` | Resume additions — §1, §5, §7, §10, §11, §13 confirmed specific surfaces (Campus 201, AI media generation tools, Polymarket PRD, x402 memo, Block Pro 2.0) |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md` | Conversion log — confirmed real artifact files exist on disk (Campus_Sponsored_MicroCourses_PRD_v3, x402 Strategy The Block, AdOps-Automation-Walkthrough) for any future Loom or annotated-artifact embed pass |
| `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md` | Tenure dates confirmed: Nov 10, 2025 – May 4, 2026 (start date provided 2026-05-28 audit answer; layoff date in §"Active Projects") |
| Prior 8 Workstream D lock docs | Source of truth for tagline + anchor_metric + opener + four_q (all locked elsewhere; cross-confirmed here as the canonical render) |

---

## Companion lock docs

Ninth lock doc in the broader writing-council sequence. Workstream D (locks 1–8) + cleanup phase 1 (this doc):

1. [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md)
2. [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) (with 2 amendments)
3. [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md)
4. [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) (with 1 amendment)
5. [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)
6. [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md)
7. [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md)
8. [`site-chrome-prose-locked-2026-05-28.md`](site-chrome-prose-locked-2026-05-28.md) — closes Workstream D
9. **This doc** — A-4 The Block broader cleanup (cleanup phase 1)
10. *(next session)* Surface 2 — A-2 / A-3 / A-5 investigation boards (cleanup phase 2)
11. *(next session)* Surface 3 — Methods strips full authoring for all 5 case studies (cleanup phase 3)
12. *(closing session)* Surface 4 — final verification pass across all 11 lock docs (cleanup phase 4)

All carry-forward constraints accumulate across the 9 lock docs. Sean retains voice authority on every locked string above.

---

*Authored 2026-05-28 in the brainstorm-ideas-existing skill session on MBP, post-Workstream-D cleanup phase 1. Sean retains voice authority on every locked string above.*
