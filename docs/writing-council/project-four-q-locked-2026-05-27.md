# Project four_q — Locked Content

**Date:** 2026-05-27
**Status:** LOCKED — 3 case-study `four_q` blocks rewritten (A-1, A-2, A-4); A-5 audited clean and unchanged. A-3 (intent-engineering-mcp) reads from `EXPLANATION.md` in the artifact's repo per case-study-spec §13.3 and is out of scope here.
**Scope:** The `four_q: { what, why, break, learn }` frontmatter blocks on the 4 case-study MDX files. 4Q renders as the comprehension-artifact section on the case-study page per `case-study-spec-v1.md` §9. Companion artifact: amendments to A-4 opener ¶1 + ¶3 (see §A-4) and About B-2 ¶1 (see §Cross-doc amendments). All driven by the same 2026-05-27 review pass.
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-27 (continued from project-taglines lock 2026-05-26 on MBP).
**Build environment:** Mac Mini (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## TL;DR — what's locked

| Frame | File | What changed | Sections touched |
|---|---|---|---|
| A-1 | `animation-pipeline.mdx` | Rebuilt against v2 anima architecture (10-phase pipeline, agent fleet, 3-tier critic stack, model-layer-replaceable) | `what` rebuilt · `why` rebuilt · `break` rebuilt · `learn` extended (3 sentences) |
| A-2 | `code-brain.mdx` | `what` rebuilt to remove fixed counts (118 skills / 8 agents / 14 hooks) per Carry-forward constraint #1; `why`/`break`/`learn` kept | `what` rebuilt · `why`/`break`/`learn` kept |
| A-4 | `the-block.mdx` | Full rebuild anchored on resume evidence (3 Claude Skills, RevOps automation, Polymarket × Campus, .co audit, x402 memo); tenure-foregrounding removed | `what` rebuilt · `why` rebuilt · `break` rebuilt · `learn` extended (3 sentences) |
| A-5 | `16bitfit.mdx` | Audited clean — no changes | All four sections KEPT |

Companion amendments (driven by the same review pass):

| Surface | File | Change |
|---|---|---|
| A-4 opener ¶1 | `the-block.mdx` | Surface inventory swap — three resume-unsupported surfaces (Data API, Simon AI feature, AdOps systems) replaced with three resume-confirmed (Polymarket × Campus, .co homepage redesign audit, RevOps automation pipeline) |
| A-4 opener ¶3 | `the-block.mdx` | "six months, multiple surfaces, sanitized artifacts" → "multiple surfaces, sanitized artifacts" (tenure deletion; four-item list becomes cleaner rule-of-three) |
| About B-2 ¶1 | `src/content/about/index.mdx` | "Six months into the PM job" → "Deep enough into the PM job" (tenure deletion; surgical word swap, rest of paragraph unchanged) |

---

## Carry-forward constraints (new + reaffirmed)

These apply to all 4Q blocks locked here, and to any future 4Q writing across the portfolio.

1. **No tenure-foregrounding on public surfaces** *(new 2026-05-27)*. Date data lives in frontmatter fields (`date_started`, `date_active_through`) for anyone who needs the timeline; user-facing prose stays focused on the work. Applies to all surfaces — case-study openers, 4Q blocks, About prose, taglines, anchor metrics. Sean's rationale: "I only want the timeline on my resume. The block content on my website should just show the work, not focus on the time period." Drove four amendments on 2026-05-27: A-4 opener ¶3, A-4 4Q `what`, About B-2 ¶1, and minor rationale-text edits to the prior taglines + openers lock docs. **Companion constraint added to openers-lock §"Carry-forward constraints" #7.**
2. **Resume-evidence anchoring for ARCHIVED case studies** *(new 2026-05-27)*. The Block work specifically: prose must be groundable in resume bullets or `the-block-resume-additions-2026.md`. No fabricated surfaces, fabricated tier structures, or fabricated metric arcs. The 2026-05-26 A-4 opener lock named Simon AI + Data API as surfaces without resume evidence — corrected here in the 2026-05-27 amendment. The two source-of-truth files for The Block work going forward: `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md` and `the-block-resume-additions-2026.md`.
3. **Agentic-engineering thread as load-bearing framing** *(new 2026-05-27)*. For The Block specifically: the 3 production Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`) shipped against the P&E Q2 OKR, the RevOps automation pipeline, the AI-assisted Campus 201 media generation, and the x402 / A2A / MCP strategy memo are the receipts that prove Sean was doing AI-PM work inside an institutional B2B firm. This thread maps directly to the AI-PM > Tech-PM > Creative-PM hunt-list positioning and should be foregrounded in 4Q `what` + `why`, not buried in Methods strip cells.
4. **All carry-forward constraints from `case-study-openers-locked-2026-05-26.md` and `project-taglines-locked-2026-05-26.md` still apply.** Particularly: no Code Brain fixed counts; no iPad / no "comprehension is the artifact" / no "building got cheap" ceiling violations in 4Q (those phrases hit their ceilings in About + A-2 opener); no HybridRouter in user-facing prose; no "Same X, same Y, same Z" rule-of-three family; no "fleet" used at tagline level (4Q prose can use "fleet" freely).

---

## 2026-05-27 — second amendment (A-4 opener ¶2 Simon swap)

Second pass on 2026-05-27 (continued from MBP session). Driven by a hallucination audit that resolved the inconsistency originally noted as a "Flag" in §A-4 "Companion opener amendments" below — Sean's first 2026-05-27 ¶1 surface inventory swap removed Simon AI feature, but ¶2 still referenced it as an example. Companion to [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) second 2026-05-27 amendment (T2.5). 4Q `what` / `why` / `break` / `learn` content unchanged.

### Amendment

The A-4 opener ¶2 displayed in §A-4 "Companion opener amendments" below is stale by one sentence. Replace its ¶2 with the version below. ¶1 and ¶3 unchanged (carry forward from first 2026-05-27 amendment).

**¶2 (amended):**

> The job was build it, ship it, and write it down carefully enough that leadership could read the bi-weekly update in under five minutes. That discipline transferred everywhere — the ETF launch page scopes easier when you've already drafted the version that fits in 90 words; the Polymarket microcourse builds faster when you've already drafted the five components out loud. Institutional B2B doesn't have UX to lean on — only the agreement.

**Why:** Simon AI feature is not in the ¶1 resume-confirmed surface inventory. Polymarket × Campus sponsored-microcourse vertical IS — and is the marquee 0-to-1 build named in this lock doc's A-4 4Q `what` ("PRD v1 to v3, 5-component 0-to-1 build"). The new ¶2 example pulls the same surface forward across both 4Q + opener, tightening the page's resume-evidence anchoring. "Five components" mirrors "90 words" — both examples now name a unit-of-measurement the write-it-down discipline produced.

### Updated apply-on-Mac-Mini guidance

Step 5(b) of the apply checklist below now resolves to: the A-4 `<Opener>` body (lines 52–54) is replaced with ¶1 (per first 2026-05-27 amendment) + ¶2 (per this second 2026-05-27 amendment) + ¶3 (per first 2026-05-27 amendment). The fully amended A-4 opener text is:

```mdx
  <p>The Block is an institutional crypto data and research firm whose customers ran money for a living and whose product was, depending on the day, a Snowflake share, a PDF, or a phone call returned within the hour. Multiple surfaces — the Campus education product, the ETF launch page workflow on WordPress, the Polymarket × Campus sponsored-microcourse vertical, the .co homepage redesign competitive audit, the RevOps automation pipeline behind Salesforce closes. The bi-weekly Product and Engineering status update sat above all of them.</p>

  <p>The job was build it, ship it, and write it down carefully enough that leadership could read the bi-weekly update in under five minutes. That discipline transferred everywhere — the ETF launch page scopes easier when you've already drafted the version that fits in 90 words; the Polymarket microcourse builds faster when you've already drafted the five components out loud. Institutional B2B doesn't have UX to lean on — only the agreement.</p>

  <p>The firm restructured around me; the products didn't. This page is about the products. The investigation board below is the build calendar in forward order — multiple surfaces, sanitized artifacts, and a public reference link at the end. The Methods strip is lean by design: most of the receipts from institutional B2B work have to be redacted before they ship.</p>
```

The Flag noted in §A-4 "Companion opener amendments" below ("Flag: ¶2 still references...") is now resolved.

The companion openers lock doc's second 2026-05-27 amendment carries the rest of the Tier 1 + Tier 2 deltas (anchor metrics, A-3 timing fix, A-2 + A-5 frontmatter date corrections, A-5 Methods strip stack-truth fix). Read both amendment sections in sequence before the next Mac Mini apply.

---

## A-1 · animation-pipeline four_q — LOCKED

**File:** `src/content/work/animation-pipeline.mdx` — frontmatter `four_q:` block (lines 41–45).

Replace the entire `four_q:` block with:

```yaml
four_q:
  what: "anima is a 10-phase pipeline for shipping 2D animated stories made by a human and a fleet of named agents working together. A brief becomes a plan. A plan becomes an animatic. An animatic constrains motion. Motion gets cleaned to the aesthetic. The fleet runs the volume work — a line producer, a character designer, a scriptwriter, a storyboard artist, a frame generator, a script-supervisor critic, a museum writer — while the human owns timing, taste, and the decision to ship. The Pencil Test short is the first reference implementation; anima is the system."
  why: "The decision wasn't which model to use. The decision was which working method: a studio budget and a four-year project timeline (out of reach), AI-only generation (fast but someone else's idiom), or a human-author plus AI-fleet partnership. The third one is anima — production-company speed at solo-creator cost, without losing four years of life to a single piece. The model layer is replaceable; the architecture and the human role are not."
  break: "Three named failure modes the architecture guards against, not three encoder bugs. Correlated blind spots when the orchestrator and the vision critic share a model family — 'valid output' and 'acceptable frame' silently align, and bad frames slip through. anima pairs a Sonnet orchestrator with a Gemini vision critic at the busiest checkpoint by construction. Local-optimization drift when every phase ships 'better' output that no longer matches the approved brief. Phase 0's planner emits an immutable acceptance_criteria.json; every downstream critic cites criteria IDs when it blocks. Cheap-judge failures with documented base rates — 58% sycophancy, up to 90% self-preference bias, length and position bias. T3 runs three peers from three vendors (Codex CLI + Anti-Gravity CLI + Claude SDK), with a separate Opus chairman that never grades its own work."
  learn: "Validators cannot recover taste that was absent at generation time. The pipeline is the artifact. The character is the test the pipeline has to pass."
```

**What this does:**
- `what` reframes anima at the **system level** instead of describing one piece's output. Pencil Test becomes the *reference implementation*, not the whole project (PHILOSOPHY.md framing). The "X becomes Y" cadence is lifted verbatim from PHILOSOPHY.md / CLAUDE.md ("Brief becomes plan; plan becomes animatic..."). Names the seven personas inline by role-title (line producer, character designer, scriptwriter, storyboard artist, frame generator, script-supervisor critic, museum writer) — recruiter-readable; the codenames (Maya/Cy/Sam/Bea/Flo/Em/Mo) live in the case-study body or museum where they earn the room.
- `why` reframes the choice axis from *model* to *working method*. Three credible alternatives a solo creator would actually weigh: studio budget (out of reach), AI-only (someone else's idiom), human+AI partnership (anima). The "model layer is replaceable" closer is lifted verbatim from PHILOSOPHY.md as the load-bearing thesis. **Carries the "production-company speed at solo-creator cost, without losing four years of life to a single piece" framing per Sean's 2026-05-27 note.**
- `break` upgrades from stack-bug-level technical failures to **architectural failure modes the system is built against.** Sourced from `docs/2026-05-26-agent-fleet-brainstorm-v2.md` §2.1–§2.5 with citation-quality specificity (the 58% sycophancy figure is real; SycEval, arXiv 2502.08177). Each failure mode names its architectural defense — the break section becomes a credibility move.
- `learn` extends to three sentences. Prepends the *"Validators cannot recover taste that was absent at generation time"* line from agent-fleet-v2 §2.1 as the architectural punchline that explains *why* the pipeline is the artifact. Original two sentences hold as the closer.

**Stack truth verified:** No fabricated stack references. NB Pro / NB2 / GPT-Image-2 / Seedream / Qwen-IE / FLUX+LoRA all live in the Phase 5 routing table (Methods strip handles that). Seedance referenced only as motion interpolation, not as the still-image draw step.

---

## A-2 · code-brain four_q — LOCKED

**File:** `src/content/work/code-brain.mdx` — frontmatter `four_q:` block (lines 40–44).

Replace the entire `four_q:` block with:

```yaml
four_q:
  what: "Code Brain is a personal command center built on Claude Code, sized to fit a PM with a writing habit and an animation pipeline running one repo over. An Obsidian vault with a fleet of SDK agents on macOS launchd. Three machines orchestrating local and cloud models. A knowledge loop that flushes session content overnight, turns it into concepts, critiques them across Codex CLI and Anti-Gravity CLI in parallel, and lands the expansions in the vault by morning. The roster turns over weekly because the working method does. The Daily Driver agent writes this portfolio's daily-dated layer at 08:30 before the workday starts."
  why: "Three options considered: ChatGPT Plus with custom GPTs, Cursor with project rules, or a Claude-Code-native fleet. Chose Claude-Code-native because skills compose better than prompts and because the Agent SDK lets a single launchd job orchestrate an entire morning across local and cloud models."
  break: "Three named failure modes. First, launchd silently failing on the first run after a macOS update. Second, the morning agent saturating its tool-call quota mid-brief. Third, prompt-cache misses cascading across the day's runs and tripling the token bill."
  learn: "The fleet's job isn't to write code. The fleet's job is to keep me thinking about the next problem instead of the last one."
```

**What this does:**
- `what` removes the fixed counts ("118 skills compose into 8 named agents, governed by 14 lifecycle hooks") that violated Carry-forward constraint #1 from the openers-lock. "The roster turns over weekly because the working method does" lands fluctuation as a *feature*, not an inventory number. Opens with the line that anchors Code Brain's role *relative to anima* ("sized to fit a PM with a writing habit and an animation pipeline running one repo over"). Names the **Codex CLI + Anti-Gravity CLI parallel critic** as the architectural move — honest cross-reference with v2 anima's T3 stack (which uses the same multi-CLI variance idea); Code Brain is where it was prototyped.
- `why` kept verbatim. Three-option decision logic is clean. "Skills compose better than prompts" is a real architectural insight that lands with technical recruiters.
- `break` kept verbatim. Three specific real ops failures Sean has actually encountered. Recruiter-readable scar tissue. Different register from A-1's architectural failure modes by design — A-2's ops-level failure modes are the kind AI-PM recruiters specifically want to see (what breaks when you run autonomous agents 24/7).
- `learn` kept verbatim. Strongest `learn` line of the four. Sedaris-coded "the fleet's job isn't X, it's Y" subverts the default "AI for coding" framing in one move. Lands the comprehension-is-the-artifact thesis without the ceiling-reached phrase.

**Code Brain numerics rule applied:** No fixed counts anywhere in the new `what`. The fluctuation is the feature.

---

## A-4 · the-block four_q — LOCKED

**File:** `src/content/work/the-block.mdx` — frontmatter `four_q:` block (lines 38–43).

Replace the entire `four_q:` block with:

```yaml
four_q:
  what: "Product Manager at The Block, an institutional crypto data and research firm. The work spanned multiple surfaces — Campus education, the ETF launch page workflow on WordPress, the Polymarket × Campus sponsored-microcourse vertical (PRD v1 to v3, 5-component 0-to-1 build), the .co homepage redesign competitive audit, and the RevOps automation pipeline behind Salesforce closes. The agentic-engineering thread ran through all of it: three production Claude Skills shipped against the P&E Q2 OKR (etf-page-creator, stakeholder-update, jira-automation), AI-assisted image, video, and voiceover generation for the Campus 201 enterprise launch, an internal x402 / A2A / MCP strategy memo mapping six agent-economy monetization patterns, and the daily PM workflow onboarded onto Claude Code for the rest of the P&E team."
  why: "The decision wasn't which surface to specialize on. The decision was which discipline to anchor the role around: engineering speed, design taste, or writing compression. Institutional B2B PMs spend more time writing than building because the customer relationship is the product, and the relationship is documented in agreements, briefs, and status updates that leadership and partner teams actually read. The bi-weekly P&E update was the marquee version of the writing discipline — and it became one of the three Claude Skills shipped against the Q2 OKR. Pick the writing-heavy version of the role on purpose, then ship the tools that compress it."
  break: "Three failure modes the role guarded against, named and patched on the record. Handoff multiplication — seven manual handoff steps per deal in the RevOps process before automation, each one a place humans could drop the work. The fix was an end-to-end pipeline (eleven Zapier workflows + ten product-specific intake forms + a central Tables database) collapsing the chain to a single Salesforce 'Closed Won' trigger. Documentation sprawl — seven competing team-doc hubs, roughly twenty-five orphaned Developer Sync pages, five-plus overlapping onboarding paths. The fix was a 10-week P&E Department 2.0 execution plan consolidating into a per-product Confluence architecture with a centralized Templates Library. Status-update theater — writing the bi-weekly to look good instead of to surface real status. The fix was building each update around named risks and unresolved decisions, then shipping stakeholder-update as a Claude Skill so the discipline outlasted any one PM."
  learn: "Institutional B2B is a relationship product. The infrastructure has to disappear; the relationship has to remain. The PM who ships the tool that automates the work is the PM who scales past their own bandwidth."
```

**What this does:**
- `what` corrects role title to "Product Manager" per resume (was "Associate PM Technical" in earlier drafts — resume is source of truth). Deletes "Six months as" prefix per the new tenure-foregrounding rule. Inventories the **real, resume-confirmed multi-surface scope**: Campus, ETF launch pages, Polymarket × Campus sponsored microcourse 0-to-1, .co homepage redesign audit, RevOps automation pipeline. Names the three Claude Skills by filename. Lands the "agentic-engineering thread ran through all of it" line — the credibility move that ties the surfaces together AND positions Sean as the AI-PM he's hunting for.
- `why` mirrors A-1's "the decision wasn't X, it was Y" signature. Reframes from a strategic-product decision (which Sean didn't own as PM in a 6-month tenure) to a **personal role-shape decision** (which Sean did own). Closer lands the recursion — Sean automated the very artifact that justified his role (`stakeholder-update` IS the writing discipline encoded). "Pick the writing-heavy version of the role on purpose, then ship the tools that compress it" is forward-tilted as portable career thesis for the AI-PM hunt.
- `break` replaces generic PM-craft platitudes with **three real failure modes with named on-record defenses**. Each is groundable in the resume (7 handoff steps → 11 Zapier workflows + 10 intake forms; 7 competing doc hubs + 25 orphaned pages → 10-week P&E 2.0 plan; status-update theater → `stakeholder-update` Claude Skill). The third failure mode carries the same recursion as `why`.
- `learn` extends the strong two-sentence form ("Institutional B2B is a relationship product. The infrastructure has to disappear; the relationship has to remain.") with a third sentence that lands the agentic-engineering thesis: "The PM who ships the tool that automates the work is the PM who scales past their own bandwidth." Forward-tilted career insight that maps directly to Sean's AI-PM positioning.

### Companion opener amendments (apply with the 4Q in the same commit)

A-4 opener ¶1 surface inventory and ¶3 tenure-list both amended on 2026-05-27. See `case-study-openers-locked-2026-05-26.md` §"2026-05-27 amendment — A-4 opener ¶1 + ¶3 reopened" for full diff. Updated locked text:

```mdx
  <p>The Block is an institutional crypto data and research firm whose customers ran money for a living and whose product was, depending on the day, a Snowflake share, a PDF, or a phone call returned within the hour. Multiple surfaces — the Campus education product, the ETF launch page workflow on WordPress, the Polymarket × Campus sponsored-microcourse vertical, the .co homepage redesign competitive audit, the RevOps automation pipeline behind Salesforce closes. The bi-weekly Product and Engineering status update sat above all of them.</p>

  <p>The job was build it, ship it, and write it down carefully enough that leadership could read the bi-weekly update in under five minutes. That discipline transferred everywhere — the ETF launch page scopes easier when you've already drafted the version that fits in 90 words; the Simon feature ships faster when you've already drafted the line that justifies it. Institutional B2B doesn't have UX to lean on — only the agreement.</p>

  <p>The firm restructured around me; the products didn't. This page is about the products. The investigation board below is the build calendar in forward order — multiple surfaces, sanitized artifacts, and a public reference link at the end. The Methods strip is lean by design: most of the receipts from institutional B2B work have to be redacted before they ship.</p>
```

**Flag:** ¶2 still references "the Simon feature ships faster..." as an example. Sean did not reopen ¶2 in the 2026-05-27 pass; the Simon-feature reference there carries a small inconsistency with the new ¶1 surface inventory (Simon AI feature is not listed in ¶1 anymore). Worth a future surgical pass — could swap for an example anchored on a ¶1-listed surface (e.g., the Polymarket microcourse PRD, the .co homepage redesign brief). Not blocking the current apply.

---

## A-5 · 16bitfit four_q — UNCHANGED (audited clean)

**File:** `src/content/work/16bitfit.mdx` — frontmatter `four_q:` block (lines 40–44). **No edits.**

Audit notes:
- `what`: "A 16-bit fitness battle game with AI-generated sprites. The fight loop is the build target. The sprite pipeline behind it is the artifact, and right now the artifact is further along than the game." — Clean. Lands the pause-decision thesis exactly.
- `why`: Three pipeline approaches considered (full-hand pixel-art, full-generative, AI+cleanup hybrid). Clean three-option decision logic. The closer "the game was supposed to be the second project that inherited it" matches the opener-locked "supposed to feed" correction. No issues.
- `break`: Three named failure modes (sprite identity drift, Phaser performance, gameplay loop not carrying its own weight). Specific and sharp.
- `learn`: "Pausing was right. The return condition is the animation pipeline shipping its first full short..." Forward-tilted PM-call lesson; recursion to A-1 (animation pipeline = the sibling project). Strongest `learn` of the original four.

The A-5 4Q is the strongest of the four currently in the MDX files. Don't touch it.

---

## Cross-doc amendments

In addition to the 4Q rewrites + A-4 opener ¶1/¶3, the same 2026-05-27 review pass triggers one additional edit in a prior lock doc:

### About B-2 ¶1 — "Six months into the PM job" → "Deep enough into the PM job"

**File:** `src/content/about/index.mdx` — locked B-2 prose, ¶1 sentence 1.

**Currently locked** (per `about-b1-b2-b4-locked-2026-05-25.md` §B-2):
> Six months into the PM job, I finally understood why a lifetime of making things hadn't quite landed.

**Amended:**
> Deep enough into the PM job, I finally understood why a lifetime of making things hadn't quite landed.

Rest of B-2 ¶1 unchanged. Same structural beat (enough time inside the role for the lesson to land), no tenure-specific number. Companion lock doc updated in place at `about-b1-b2-b4-locked-2026-05-25.md` line 74.

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree)
3. Open `src/content/work/animation-pipeline.mdx` → replace the `four_q:` block (lines 41–45) with the locked YAML per §A-1 above
4. Open `src/content/work/code-brain.mdx` → replace the `four_q:` block (lines 40–44) with the locked YAML per §A-2 above
5. Open `src/content/work/the-block.mdx` →
   a. Replace the `four_q:` block (lines 38–43) with the locked YAML per §A-4 above
   b. Replace the `<Opener>` body (lines 52–54) with the amended 3 paragraphs per §A-4 "Companion opener amendments"
6. Open `src/content/about/index.mdx` → in the B-2 `<section class="about-section about-section--b2">` block, change "Six months into the PM job" → "Deep enough into the PM job" per §Cross-doc amendments (rest of B-2 unchanged)
7. A-5 `src/content/work/16bitfit.mdx` — **no edits this session**
8. Run `npm run dev`. QA every changed surface:
   - Visit `/work/animation-pipeline/` — confirm 4Q renders the new `what` / `why` / `break` / `learn` blocks
   - Visit `/work/code-brain/` — confirm 4Q renders the new `what`; `why` / `break` / `learn` unchanged
   - Visit `/work/the-block/` — confirm 4Q renders the new full block AND opener ¶1 + ¶3 carry the amended text
   - Visit `/about/` — confirm B-2 ¶1 opens with "Deep enough into the PM job"
9. Commit:
   ```bash
   git add .
   git commit -m "4Q rewrites (A-1, A-2, A-4) + A-4 opener ¶1/¶3 amendment + About B-2 ¶1 tenure deletion"
   ```
10. **Optional follow-up (separate session, flagged in §A-4):** opener ¶2 surgical swap of "the Simon feature ships faster..." for a ¶1-aligned example. Not blocking.
11. **Optional follow-up (separate session, flagged in `case-study-openers-locked-2026-05-26.md` §A-4 spec implications):** broader the-block.mdx cleanup — frontmatter dates, anchor_metric, methods array, fabricated investigation board artifacts. Needs Sean's sanitizable source material from `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/`.

---

## Source-of-truth files used in this lock

For future sessions writing about The Block:

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md` | Canonical resume — work-experience bullets are the ground truth for what Sean shipped at The Block |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md` | Resume additions — secondary evidence for tools, surfaces, and workflow details |
| `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md` | Conversion log for sanitizable source PRDs + competitive analyses + x402 research — useful when the investigation board cleanup pass happens |

For future sessions writing about anima:

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md` | Load-bearing intent doc — the soul of what anima is for |
| `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md` | Architecture v1 brainstorm — 10-phase pipeline, T3 critic stack, Character Bible, museum layer, draft→pro escalation |
| `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md` | Agent fleet v2 lock — seven personas (Maya/Cy/Sam/Bea/Flo/Em/Mo) + T3 council (Codie/Annie/Sage + Opus chairman); Phase 5 model routing table |

---

*Authored 2026-05-27 in the brainstorm-ideas-existing skill session on MBP. Companion artifacts: [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md), [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md), [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md). Sean retains voice authority on every locked string above.*
