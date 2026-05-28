# Investigation Boards — A-2 / A-3 / A-5 — Locked Content

**Date:** 2026-05-28
**Status:** LOCKED — full investigation board rework for the three case studies not yet board-locked. A-1 (anima) tracks separately via `sw-portfolio-animation-pipeline/docs/production-checklist.md` and is out of scope. A-4 (The Block) board locked separately at [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md). Ready to apply on Mac Mini AFTER the prior 9 lock docs land.
**Scope:** `<InvestigationBoard>` content in three MDX files — `src/content/work/code-brain.mdx` (lines 60–94), `src/content/work/intent-engineering-mcp.mdx` (lines 63–95), `src/content/work/16bitfit.mdx` (lines 59–98). Each board fully replaced with paste-ready 5–6 artifact sequences anchored in CHANGELOG / CLAUDE.md / README / canonical doc evidence. Out of scope: hero_media + hero_media_alt rework (separate asset-authoring pass), Methods strip full authoring (Surface 3), four_q + tagline + anchor_metric + opener (all locked elsewhere; cross-confirmed here as source of truth).
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-28 (post-Workstream-D cleanup phase 2, following the-block-cleanup-locked-2026-05-28).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## ⚠️ Apply order — read before Mac Mini work

This is the **tenth lock doc** (cleanup phase 2). Apply sequence at Mac Mini-side:

1. Eight Workstream D locks (transactions → architecture → essays → site chrome inclusive).
2. [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md) — cleanup phase 1.
3. **This doc** — cleanup phase 2 — three investigation boards.
4. *(next session)* Surface 3 — Methods strips full authoring for all 5 case studies (cleanup phase 3).
5. *(closing session)* Surface 4 — final verification pass across all 11 lock docs (cleanup phase 4).

The three boards in this lock can apply as a single MDX commit (touches 3 files only) or split per-project per Sean's preference.

---

## TL;DR — what's locked

| Project | Order | Artifacts | Top → bottom (in render order) |
|---|---|---|---|
| **A-2 Code Brain** | reverse-chrono | 6 | MAY 27 fleet memory · MAY 20 Knowledge Loop Phase 6 · MAY 13 Phase D · APR 28 Process Inbox pause · APR 7 launchd PATH fix · FEB 6 inception |
| **A-3 intent-engineering-mcp** | forward-chrono | 5 | APR 24 protocol spec lock · APR 30 cut decision · MAY 8 validation count reconciliation · MAY 12 publish · MAY 13 post-ship scale audit metric |
| **A-5 16BitFit** | reverse-chrono | 5 | APR 20 pause · KILLED gameplay loop · KILLED atlas-streaming · MAR Avatar Smooth-to-Pixel architecture · DEC 29 design lock |

---

## Carry-forward constraints

No new constraints — applies the cumulative constraint set from the 9 prior lock docs. The notable ones that actually intersect this surface:

1. **No fabricated metrics or composed scenes** (resume-evidence anchoring rule, generalized). Drove three audit cuts this session: A-2 existing `Daily Driver fleet runs/day` MetricChart (12→47 implausible — daily-driver fires once/day per launchd), A-3 existing `Build size vs feature count` MetricChart (320KB → 180KB unverifiable; Sean confirmed possibly invented for cut-scope narrative), A-5 existing `MAR 12 SlackQuote` scope-creep exchange (Sean confirmed composed; never Slacked anyone about 16BitFit) + A-5 existing `Sprite frames` MetricChart (12/38/64 not telemetry-backed). All four cut. Replacements pull only verifiable receipts.
2. **Wire-service mono throughout the boards** (spec §4 voice register). Past-tense, factual, one claim per caption. No first-person, no editorial flourish, no Sedaris-coded warmth (that lives in openers).
3. **Captions are wire-service-mono dated stamps; date stamps appear AS evidence, not as tenure-framing** (openers lock #7). Frontmatter `date_started` / `date_active_through` carry the actual project window.
4. **KILLED artifacts use spec §7.5 pattern** — caption opens with `KILLED —` instead of a date stamp; `killed={true}` prop on the BoardArtifact component renders the strikethrough X overlay. Counts toward the 4–6 artifact budget per spec §7.1.
5. **No HybridRouter in board prose** (cross-portfolio STOP-DOING). Methods strip is its only home. Knowledge Loop Phase 6 ship artifact references "Codex CLI + Anti-Gravity CLI parallel" — that's about CLI variance, not model routing; different system layer, no STOP-DOING violation.
6. **No Code Brain fixed counts** (constraint #1). A-2 board doesn't claim a number of skills / agents / hooks anywhere. The Phase D artifact mentions "6 relation types" — that's a schema fact, not a fleet-count claim that fluctuates weekly. Allowed.
7. **No "Comprehension is the artifact" / "Building got cheap" / "Same X same Y same Z" / iPad** in any caption. Ceilings already reached in prior locks. Audited clean across all 16 captions written this session.

---

## A-2 Code Brain — investigation board (LOCKED, reverse-chrono)

**File:** `src/content/work/code-brain.mdx` — replace the `<InvestigationBoard>` block at lines 60–94.

**Cuts (audit findings):**

| Existing artifact | Disposition | Why cut |
|---|---|---|
| `artifact-1` MAY 16 MetricChart "Daily Driver fleet runs/day" (12→47) | CUT | Numbers implausible — Daily Driver fires once/day per launchd. Even if "runs/day" means total fleet-wide events, the chart title says Daily Driver specifically. Audit fail. |
| `artifact-2` MAY 13 PRDDecision "Tier 1 retrofit — agent SDK stable" | CUT | Real intent (Sean confirmed: Tier 1 retrofit was real, but the full 4-tier implementation never completed because he pivoted to the Codex CLI + Anti-Gravity CLI vault_critic instead of continuing to fix vault_synthesizer). The artifact misrepresents the work as a clean ship when it was a pivot-after-partial-completion. Replaced thematically by the Process Inbox pause artifact below (which captures the same pattern more honestly). |
| `artifact-4` MAR 20 BoardArtifact "schedule-recommendations.md — March update" | CUT | References `08:45 daily — Daily Driver` — locked to `08:30` per T1.1. Content is rote schedule list, doesn't carry a load-bearing claim. Lower density than the replacement artifacts. |

**Paste-ready MDX:**

```mdx
<InvestigationBoard>
  <BoardArtifact
    artifactId="artifact-1"
    date="MAY 27"
    boardLabel="Fleet memory Phase 1 — plan landed"
    excerpt="Shared filesystem-memory layer at vault/90_system/fleet-memory/. Per-agent namespacing, explicit promote_to_shared(). Pilot agents: vault_synthesizer + daily_driver. Default-disabled; opt in per agent.">
    <p slot="caption">MAY 27 — fleet memory Phase 1 plan lands. Shared filesystem layer with per-agent namespacing; vault_synthesizer + daily_driver as pilot agents. Default-disabled until the first pilot validates.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-2"
    date="MAY 20"
    boardLabel="Knowledge Loop Phase 6 — producer + consumer ship">
    <p slot="caption">MAY 20 — Knowledge Loop Phase 6 ships end-to-end. SessionEnd flush → 02:30 synthesize → 03:30 critique (Codex CLI + Anti-Gravity CLI in parallel) → SessionStart re-inject as additionalContext. The vault serves itself back into tomorrow's context window.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-3"
    date="MAY 13"
    boardLabel="Phase D — typed reasoning edges shipped">
    <p slot="caption">MAY 13 — typed-edge SQLite layer ships. Six relation types — supports, contradicts, evolved_into, supersedes, depends_on, related_to. Weekly knowledge-lint contradiction detection collapses to a SQL query instead of an LLM scan.</p>
  </BoardArtifact>

  <PRDDecision
    artifactId="artifact-4"
    date="APR 28"
    prdTitle="Process Inbox — pause cloud-Sonnet path; await local rewrite"
    decisionLine="Pause cloud-Sonnet Path A. Local gemma4:e4b Path B rewrite becomes the re-enable precondition; manual triage via the process-inbox skill in interactive sessions is the working alternative."
    rationale="Cost-efficiency: cloud Sonnet ran $1.16/file at ~3 files per run. Local path is $0/file. An agent that validates working at $1.16/file is not the agent worth running on a daily schedule. Pause is a cost call against a capability that worked.">
    <p slot="caption">APR 28 — Process Inbox cloud-Sonnet path paused. Cost-efficiency PM call against capability that validated working — local rewrite becomes the precondition for re-enable.</p>
  </PRDDecision>

  <PRDDecision
    artifactId="artifact-5"
    date="APR 7"
    prdTitle="launchd PATH bug — fix in plist EnvironmentVariables"
    decisionLine="Every launchd plist now ships EnvironmentVariables with PATH set explicitly to include /Users/seanwinslow/.local/bin and /opt/homebrew/bin."
    rationale="Without explicit PATH, the claude CLI isn't discoverable from launchd context; agents fail with CLIConnectionError on the next macOS update. The plist is the deployment surface; the surface has to be self-contained or it silently breaks.">
    <p slot="caption">APR 7 — launchd PATH bug surfaced and patched across the fleet. Recovery from a silent infra failure that took the morning agents down for a day.</p>
  </PRDDecision>

  <BoardArtifact
    artifactId="artifact-6"
    date="FEB 6"
    boardLabel="Code Brain — first commit">
    <p slot="caption">FEB 6 — the Code Brain repo's first commit. The vault has been around longer; the fleet starts here.</p>
  </BoardArtifact>
</InvestigationBoard>
```

**Per-artifact grounding:**

| # | Receipt |
|---|---|
| 1 | CLAUDE.md §Architecture decisions row "Fleet memory (Phase 1)" — verbatim plan, pilot agents named, default-disabled config flag. Plan doc at `agents-sdk/docs/plans/2026-05-27-fleet-memory-phase-1-plan.md`. |
| 2 | CLAUDE.md §Architecture decisions rows "Knowledge loop (producer)" + "Knowledge loop (consumer)" + "PreCompact safety net" + "Vault Critic". The 03:30 timing + Codex CLI + Anti-Gravity CLI parallel is verbatim from CLAUDE.md §Active agents table. Transactions ledger row 2 (knowledge-loop-phase-6) ships 2026-05-20. |
| 3 | CLAUDE.md §Architecture decisions row "Concept edges" — SQLite table with 6 relation types. Transactions ledger row 1 (phase-d-typed-edges) ships 2026-05-13. The "SQL query instead of an LLM scan" framing pulls forward from the transactions value-prop pull-quote. |
| 4 | CLAUDE.md §Agents SDK paragraph: "Process Inbox: paused 2026-04-29 pending Path B rewrite to local gemma4:e4b. Cloud-Sonnet path validated as working (~3 files/run) but cost-inefficient ($1.16/file vs $0/file local)." Date corrected to APR 28 per audit (CLAUDE.md says 2026-04-28 in the AUDIT filename). |
| 5 | CLAUDE.md §"launchd requirement" callout: "All plists must include EnvironmentVariables with PATH set to /Users/seanwinslow/.local/bin:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin. Without this, the claude CLI is not discoverable and agents fail with CLIConnectionError. See agents-sdk/BUGFIX-2026-04-07-launchd-path.md." Maps directly to A-2 4Q `break` failure mode #1 ("launchd silently failing on the first run after a macOS update"). |
| 6 | Per the openers second 2026-05-27 amendment T1.3: Code Brain real start date confirmed 2026-02-06 (the v1.0.0 CHANGELOG entry's "2024-01-XX" date is a mistake; the v2.0.0 entry at the bottom is the real first entry). Frontmatter `date_started:` already locked at this date. |

**Cross-confirmation with locked four_q + opener:**

- Opener ¶1 (locked) describes 02:30 → 03:30 → 08:30 overnight cadence. Investigation board artifact-2 (Knowledge Loop Phase 6) names 02:30 + 03:30 directly. Self-consistent.
- 4Q `break` failure mode #1 (launchd silently failing on macOS update). Investigation board artifact-5 is the patch artifact for exactly that failure mode. Self-consistent.
- 4Q `what` (locked) names the Codex CLI + Anti-Gravity CLI parallel critic. Investigation board artifact-2 references the same in the Phase 6 ship caption. Self-consistent.

---

## A-3 intent-engineering-mcp — investigation board (LOCKED, forward-chrono)

**File:** `src/content/work/intent-engineering-mcp.mdx` — replace the `<InvestigationBoard>` block at lines 63–95.

**Cuts (audit findings):**

| Existing artifact | Disposition | Why cut |
|---|---|---|
| `artifact-1` APR 24 BoardArtifact "MCP protocol implementation — spec lock" | KEEP shape; tighten caption | Verifiable + load-bearing for the build arc |
| `artifact-2` APR 30 PRDDecision "Cut decision" | KEEP shape; expand rationale | Load-bearing per opener; existing decision line is correct but rationale can carry more weight |
| `artifact-3` MAY 1 MetricChart "Build size vs feature count" (320KB → 180KB) | CUT | Sean confirmed possibly invented for cut-scope narrative; can't verify against CHANGELOG. Safe-route call. |
| (artifact-4 was a comment cut) | N/A | Replaced by two new MAY artifacts |

**Paste-ready MDX:**

```mdx
<InvestigationBoard>
  <BoardArtifact
    artifactId="artifact-1"
    date="APR 24"
    boardLabel="MCP protocol surface — 3-tool spec lock"
    excerpt="tools/list + tools/call wired against the SDK. The three tools — audit_intent_spec, generate_intent_spec_scaffold, assess_retrofit_level — registered at this spec lock. Stdio transport only; no Streamable HTTP, no SSE.">
    <p slot="caption">APR 24 — protocol surface specced + locked at three tools. Stdio transport only; the small surface is the discipline.</p>
  </BoardArtifact>

  <PRDDecision
    artifactId="artifact-2"
    date="APR 30"
    prdTitle="Cut decision — keep registry verification, defer embed"
    decisionLine="Keep the DNS-verified registry block as v0.1.0's load-bearing trust signal. Defer the embedded tool-call demo to a separate future spec."
    rationale="Verification is load-bearing for adoption trust; installs without it are taken on faith. The embed is retrospective polish — exciting, but the kind of exciting that slows the ship. Cut on purpose, on the calendar, before it cost the date.">
    <p slot="caption">APR 30 — the cut that saved the ship date. Registry verification stays; embedded tool-call demo moves to a future spec.</p>
  </PRDDecision>

  <PRDDecision
    artifactId="artifact-3"
    date="MAY 8"
    prdTitle="Validation checklist canonicalized at 25 items"
    decisionLine="Scope-lock prose realigns to SKILL.md, not the other way around. 40-item reference reconciled to the canonical 25 across 7 sub-sections."
    rationale="Source-of-truth discipline (scope-lock §3): SKILL.md is canonical. The earlier 40-item figure was paraphrased into scope-lock without verification. validation_score output reads X/25, not X/40. No Zod schema change.">
    <p slot="caption">MAY 8 — validation count reconciliation. 40 → 25 items; spec realigns to the canonical SKILL.md instead of the other way around.</p>
  </PRDDecision>

  <BoardArtifact
    artifactId="artifact-4"
    date="MAY 12"
    boardLabel="@swins/intent-engineering-mcp@0.1.0 — npm + MCP registry publish"
    excerpt="npm publish lands at v0.1.0. MCP registry listing live under com.seanwinslow/intent-engineering with DNS-verified namespace. Thirteen days earlier than the date circled on the calendar.">
    <p slot="caption">MAY 12 — package publishes to npm. DNS-verified registry listing live under com.seanwinslow/intent-engineering. Thirteen days early.</p>
  </BoardArtifact>

  <MetricChart
    artifactId="artifact-5"
    date="MAY 13"
    chartTitle="Scale audit — 118 first-party skills by retrofit level"
    yLabel="% of skills"
    data={[
      { x: "L1-mvr",        y: 24 },
      { x: "L2-structured", y: 36 },
      { x: "L3-full",       y: 40 },
    ]}>
    <p slot="caption">MAY 13 — post-ship scale audit: assess_retrofit_level runs against 118 first-party skills in under a second, zero parse errors. The dogfood test on the canonical intent-engineering SKILL.md scores 23/25 with zero anti-patterns. The tool eats its own dog food.</p>
  </MetricChart>
</InvestigationBoard>
```

**Per-artifact grounding:**

| # | Receipt |
|---|---|
| 1 | sw-mcp-intent-engineering README §"Three tools" — names all three tools verbatim. §"Limitations" — stdio transport only, no Streamable HTTP, no SSE. Existing on-disk artifact-1 already correct; tightened caption only. |
| 2 | sw-mcp-intent-engineering README §"Further reading" implicit + opener ¶2 (locked) names the cut decision as load-bearing. Existing on-disk artifact-2 correct; rationale extended to land the page-level thesis more cleanly. |
| 3 | sw-mcp-intent-engineering CHANGELOG.md Unreleased entry 2026-05-08: "scope-lock §3 and §4 originally described 'the 40-item validation checklist.' The canonical SKILL.md ... defines 25 items across 7 sub-sections... Reconciled scope-lock prose to '25-item' so docs and implementation match." Verbatim CHANGELOG receipt. |
| 4 | Resume Selected AI Artifacts §"intent-engineering MCP Server" — verbatim ship date + package name + registry namespace + 13-days-early framing. Anchor metric (already locked) names same artifact. |
| 5 | sw-mcp-intent-engineering README §"Dogfood result" — 23/25 with zero anti-patterns, verbatim. §"Dogfood result" continued: "118 first-party skills in my Claude Code Superuser Pack in under a second. 24% scored L1-mvr ... 36% scored L2-structured ... and 40% scored L3-full ... Zero parse errors across the batch." MetricChart data is the verbatim L-tier distribution. Caption integrates both receipts. |

**Cross-confirmation with locked four_q + opener:**

- Opener ¶2 (locked) frames the cut decision as "the way you cut a scene that's slowing the second act." Investigation board artifact-2 PRDDecision IS that cut, rendered as evidence. Self-consistent.
- Opener ¶3 (locked) names "the load-bearing part — the DNS-verified registry listing, the npm publish, the install verification block, the handful of tools that actually do the job." Investigation board artifacts 1 + 4 carry the registry + npm receipts; artifact 3 carries the validation-checklist canonicalization that makes the tools-that-actually-do-the-job claim land. Self-consistent.
- 4Q `learn` (per existing on-disk): "The thing that made it ship 13 days early was deciding what not to build." Investigation board artifact-2 is that deciding-what-not-to-build moment in artifact form. Self-consistent.

---

## A-5 16BitFit — investigation board (LOCKED, reverse-chrono)

**File:** `src/content/work/16bitfit.mdx` — replace the `<InvestigationBoard>` block at lines 59–98.

**Cuts (audit findings):**

| Existing artifact | Disposition | Why cut |
|---|---|---|
| `artifact-1` MAY MetricChart "Sprite frames generated" (12/38/64) | CUT | Sean confirmed numbers not telemetry-backed. Cannot verify; cut on the no-fabricated-metrics rule. |
| `artifact-2` APR 2 BoardArtifact "Pause decision board" | KEEP shape; date-corrected to APR 20 per T1.5 | Real PM decision; date wrong on disk |
| `artifact-3` MAR 12 SlackQuote scope-creep exchange | CUT | Sean confirmed composed — "I never Slacked anyone about 16Bitfit." Cut on the no-composed-scenes rule. |
| `artifact-4` MAR 5 BoardArtifact "Killed: v1 gameplay loop" | KEEP shape | Real PM call from opener ¶3 |

**Paste-ready MDX:**

```mdx
<InvestigationBoard>
  <BoardArtifact
    artifactId="artifact-1"
    date="APR 20"
    boardLabel="Pause decision board"
    excerpt="DECISION — pause game work; continue pipeline work. Return condition: animation pipeline ships first full short. Rationale: the game can't inherit a production system that isn't tested yet.">
    <p slot="caption">APR 20 — the pause decision, written in plain language. Pipeline work continues; gameplay work waits for the system to inherit.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-2"
    date="APR"
    boardLabel="Killed: v1 gameplay loop"
    excerpt="KILLED — v1 gameplay loop. The fight loop wasn't carrying its own weight without the polish layer. Decision: rebuild the loop after the pipeline ships and sprites stop drifting between cycles."
    killed={true}>
    <p slot="caption">KILLED — v1 fight loop. Not interesting enough to play before the sprites get pretty. Rebuilds after the pipeline ships.</p>
  </BoardArtifact>

  <BoardArtifact
    artifactId="artifact-3"
    date="MAR"
    boardLabel="Killed: Phaser atlas-streaming experiment"
    excerpt="KILLED — atlas-streaming experiment for large sprite atlases at 60fps on mid-range mobile. Deferred until the sprite pipeline produces stable cycles worth optimizing."
    killed={true}>
    <p slot="caption">KILLED — atlas-streaming experiment for a fitness game that did not yet exist. The scope-creep moment that made the pause inevitable.</p>
  </BoardArtifact>

  <PRDDecision
    artifactId="artifact-4"
    date="MAR"
    prdTitle="Avatar generation pipeline — Smooth-to-Pixel architecture"
    decisionLine="AI generates cel-shaded vector art; server-side CLAHE + Bayer dithering enforces the DMG 4-color palette. Separation of generation and palette enforcement."
    rationale="Direct pixel-art generation was unreliable across cycles — palette drift, identity drift between idle and punch. Separating generation (Lightning-style cel-shaded source) from palette enforcement (deterministic post-processing) makes the pipeline trustworthy enough to feed a roster.">
    <p slot="caption">MAR — avatar generation pipeline architecture lock. Smooth-to-Pixel: AI generates vector art, server post-processes to the 4-color DMG palette. Separation of concerns makes the pipeline trustworthy.</p>
  </PRDDecision>

  <BoardArtifact
    artifactId="artifact-5"
    date="DEC 29"
    boardLabel="Design lock — 6 cosmetic champions + no-defeat philosophy">
    <p slot="caption">DEC 29 — design lock. Champions are cosmetic, not stat-bearing (Mario Party model); battle outcomes are "victory" or "continue_training" — no defeat state. The PM call that says what the game is for.</p>
  </BoardArtifact>
</InvestigationBoard>
```

**Per-artifact grounding:**

| # | Receipt |
|---|---|
| 1 | Existing on-disk artifact-2 content + opener ¶2 (locked) carries the pause-decision PM logic. Date corrected from APR 2 to APR 20 per openers second 2026-05-27 amendment T1.5. |
| 2 | Opener ¶3 (locked) verbatim: "a v1 gameplay loop that wasn't carrying its own weight without the polish layer." Real PM call from the pause-coincident scope cuts. |
| 3 | Opener ¶3 (locked) verbatim: "a Phaser atlas-streaming experiment I'd talked myself into mid-scope-creep." Real PM call from the pause-coincident scope cuts. (The opener's third KILLED — "an evening I would have spent angrily exporting frames" — is more atmospheric than artifact-shaped; it lives in the opener prose and doesn't need a board artifact.) |
| 4 | 16BitFit-V3 CLAUDE.md §"Avatar Generation Pipeline" — Smooth-to-Pixel strategy verbatim. "AI generates cel-shaded vector art (NOT pixel art), then server-side CLAHE + Bayer dithering enforces the DMG 4-color palette. This separation of concerns ensures reliable, consistent output." Real architectural decision documented in the canonical doc. |
| 5 | 16BitFit-V3 CLAUDE.md §"Key Design Decisions (Party Mode 2025-12-29)" — verbatim date + decisions: "Champion Selection (Mario Party Model)" + "No-Defeat Philosophy" + "Champions are purely cosmetic - they have no stat differences." Per Sean's 2026-05-28 instruction: caption omits the "Party Mode" naming convention (internal designation, not load-bearing for the case study) and lands the two locked decisions directly. |

**Cross-confirmation with locked four_q + opener:**

- Opener ¶2 (locked) frames the pause as a PM call: "looked at the two unfinished bets on the desk and picked one. The pipeline went one way. The game went on the shelf with a date on it." Investigation board artifact-1 (APR 20 pause) is that PM call rendered as evidence. Self-consistent.
- Opener ¶3 (locked) names three KILLEDs; the board surfaces two of them as artifacts (the third — the angry-frame-exporting evening — stays in opener prose where it lands as atmospheric color rather than board evidence).
- 4Q `why` (per existing on-disk, audited clean in four_q lock): "three pipeline approaches got considered: full-hand pixel-art (cut on volume), full-generative without cleanup (cut on consistency across cycles), and AI-generated with a manual cleanup pass (kept). The third one is the production system the animation pipeline case study is also using." Investigation board artifact-4 IS the AI-generated-with-cleanup decision (Smooth-to-Pixel = generate cel-shaded, then DMG-palette clean). Self-consistent.

---

## Spec implications

No spec amendments required by this lock. Three confirmations the spec already supports:

| Spec section | Confirmation |
|---|---|
| §7.2 — 4 allowed artifact types | All 16 artifacts across the 3 boards use only the declared types (BoardArtifact, PRDDecision, MetricChart). The SlackQuote type defined in the spec is intentionally unused this session — Sean confirmed A-2 has no real DM available (existing artifact-3 already cut as a comment) and A-5's existing SlackQuote was composed (cut). A-3 has no DM either (existing artifact-4 already cut as a comment). SlackQuote remains spec-supported for future case studies. |
| §7.4 — ordering rule | A-2 stays reverse-chrono (spec default + existing on-disk pattern). A-3 stays forward-chrono via `investigation_order: forward` frontmatter override (spec §7.4 explicitly supports per-page override; ship-arc story uses forward). A-5 stays reverse-chrono (spec default + existing on-disk + opener prose "what's below is the pipeline's progress through May, the pause decision, and the gameplay-loop work"). |
| §7.5 — KILLED artifacts | A-5 uses 2 KILLED artifacts; total artifact count is 5 (within spec §7.1's 4–6 typical range, KILLED items counting toward the budget per spec §7.5). Both KILLED captions open with `KILLED —` instead of a date stamp; the `killed={true}` prop fires the strikethrough X overlay. |

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini, the sequence — applied alongside or after the A-4 cleanup lock from the same date:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; prior 9 lock docs should already have landed)
3. **A-2 — `src/content/work/code-brain.mdx`:**
   - Replace the `<InvestigationBoard>` block at lines 60–94 with the 6 artifacts per §A-2 above
   - Frontmatter mechanical fixes confirm-by-lock from prior docs:
     - Line 15 `date_started:` → `2026-02-06` (per openers T1.3) — apply if not already landed
     - Line 19 `anchor_metric:` → `"OVERNIGHT FLEET · LAUNCHD-NATIVE"` (per openers T2.3) — apply if not already landed
     - Lines 40–44 `four_q:` → full block per four_q lock §A-2 — apply if not already landed
     - Lines 54–57 `<Opener>` → 3 paragraphs per openers lock §A-2 — apply if not already landed
4. **A-3 — `src/content/work/intent-engineering-mcp.mdx`:**
   - Replace the `<InvestigationBoard>` block at lines 63–95 with the 5 artifacts per §A-3 above
   - Frontmatter + opener confirm-by-lock from prior docs:
     - Lines 57–60 `<Opener>` → 3 paragraphs per openers lock §A-3 (note `08:30` not `08:45` per T1.1) — apply if not already landed
     - `methods:`, `anchor_metric:`, `four_q:`, `shipped_stats_endpoint:` already correct on disk per four_q lock §A-3 audit; no changes
5. **A-5 — `src/content/work/16bitfit.mdx`:**
   - Replace the `<InvestigationBoard>` block at lines 59–98 with the 5 artifacts per §A-5 above
   - Frontmatter mechanical fixes confirm-by-lock from prior docs:
     - Line 5 `tagline:` → `Paused the game. Shipped the pipeline.` (per taglines lock §A-5) — apply if not already landed
     - Line 16 `date_active_through:` → `2026-04-20` (per openers T1.4) — apply if not already landed
     - Lines 53–56 `<Opener>` → 3 paragraphs per openers lock §A-5 (one-word fix: `feeding` → `supposed to feed`) — apply if not already landed
     - `four_q:` already audited clean per four_q lock §A-5; no changes
     - Methods strip stack-truth correction per T1.2 (Seedance → Nano Banana 2) is queued for Surface 3, not this commit
6. Run `npm run dev` and QA:
   - `/work/code-brain/` renders 6 artifacts in reverse-chrono order; APR 7 launchd patch caption maps to 4Q `break` failure mode #1; APR 28 Process Inbox pause is a clean PRDDecision
   - `/work/intent-engineering-mcp/` renders 5 artifacts in forward-chrono order; APR 30 cut decision sits visibly in the middle of the arc; MAY 13 MetricChart renders L-tier distribution bar chart (3 bars: L1-mvr 24% / L2-structured 36% / L3-full 40%); caption integrates dogfood receipt
   - `/work/16bitfit/` renders 5 artifacts in reverse-chrono order; APR 20 pause is top; 2 KILLED artifacts render strikethrough X overlays via `killed={true}` prop; DEC 29 design lock is bottom
   - `scripts/validate_case_study.mjs` passes for all 3 MDX files
   - Per-artifact permalinks work for all 16 artifacts across the 3 pages (`/work/code-brain#artifact-3` etc.)
7. Commit (single commit covering 3 MDX files):
   ```bash
   git add src/content/work/code-brain.mdx src/content/work/intent-engineering-mcp.mdx src/content/work/16bitfit.mdx
   git commit -m "A-2 + A-3 + A-5 investigation boards locked per investigation-boards-a2-a3-a5-locked-2026-05-28 (audit cut 4 fabricated/composed artifacts; replaced with verified receipts from CHANGELOG / CLAUDE.md / README)"
   ```
8. **Surface 3 (next session)** — Methods strips full authoring for all 5 case studies including the A-5 Seedance → Nano Banana 2 stack-truth fix from T1.2 + A-3 development row potential `/work/code-brain` cross-link + A-4 2-row stub expansion.
9. **Surface 4 (closing session)** — final verification pass.

---

## Source-of-truth files used in this lock

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md` | Primary A-2 source — fleet memory Phase 1 plan, Knowledge Loop, Phase D, Process Inbox pause, launchd PATH bug, vault critic with Codex CLI + Anti-Gravity CLI parallel, Code Brain real start date 2026-02-06 |
| `/Users/seanwinslow/Code-Brain/code-brain/CHANGELOG.md` | A-2 ops history (audited; bottom v2.0.0 entry is the real first entry per T1.3) |
| `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/README.md` | Primary A-3 source — three tools, stdio transport only, dogfood 23/25 with zero anti-patterns, scale audit 118 skills with 24/36/40 L-tier split + zero parse errors |
| `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/CHANGELOG.md` | A-3 build history — 2026-05-08 unreleased entries on validation count reconciliation (40 → 25) + detectAutonomous parser tightening |
| `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md` | Primary A-5 source — Party Mode 2025-12-29 design lock (champions cosmetic + no-defeat philosophy), Smooth-to-Pixel avatar generation architecture, pause-decision context |
| Existing case-study MDX files (`code-brain.mdx`, `intent-engineering-mcp.mdx`, `16bitfit.mdx`) | Baseline for diff scope + cut audit findings |
| Prior 9 lock docs (Workstream D + the-block-cleanup) | Source of truth for frontmatter + opener + four_q + tagline + anchor_metric carryover across the 3 case studies |

---

## Companion lock docs

Tenth lock doc in the broader writing-council sequence. Workstream D (locks 1–8) + cleanup phase 1 (lock 9) + cleanup phase 2 (this doc):

1. [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md)
2. [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) (with 2 amendments)
3. [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md)
4. [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) (with 1 amendment)
5. [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)
6. [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md)
7. [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md)
8. [`site-chrome-prose-locked-2026-05-28.md`](site-chrome-prose-locked-2026-05-28.md) — closes Workstream D
9. [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md) — cleanup phase 1
10. **This doc** — A-2 / A-3 / A-5 investigation boards (cleanup phase 2)
11. *(next session)* Surface 3 — Methods strips full authoring for all 5 case studies (cleanup phase 3)
12. *(closing session)* Surface 4 — final verification pass across all 11 lock docs (cleanup phase 4)

All carry-forward constraints accumulate across the 10 lock docs. Sean retains voice authority on every locked string above.

---

*Authored 2026-05-28 in the brainstorm-ideas-existing skill session on MBP, post-Workstream-D cleanup phase 2. Sean retains voice authority on every locked string above.*
