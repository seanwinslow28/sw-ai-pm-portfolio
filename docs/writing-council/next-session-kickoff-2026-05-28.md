# Next-Session Kickoff — Workstream D Closeout

**Drafted:** 2026-05-28 on MBP at the close of the essays + site chrome lock session
**For use in:** a fresh Cowork session, after Sean invokes the `/pm-product-discovery:brainstorm-ideas-existing` skill
**Authored by:** Claude (Sonnet 4.6), at Sean's request
**Purpose:** Hand off the 4 remaining audit + locked-content tasks (A-4 cleanup, A-2/A-3/A-5 investigation boards, Methods strips for all 5, final verification pass) so a fresh session can complete the Workstream D writing-council pass without re-grounding from scratch.

---

> *(Copy everything below this divider into the new Cowork session, after invoking the skill.)*

---

I'm Sean Winslow. We're continuing a multi-session brainstorm refining my portfolio's writing surfaces. Eight prior sessions have locked content; this session continues Workstream D — the **final audit + locked-content tasks** to close the writing-council pass before the portfolio ships.

## Session lineage so far

1. **2026-05-25 (MBP):** About B-1/B-2/B-4 prose locked. Recruiter italic call-out removed. Lock doc: `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
2. **2026-05-26 (MBP):** All 5 case-study openers locked (A-1, A-2, A-3, A-4, A-5). Lock doc: `docs/writing-council/case-study-openers-locked-2026-05-26.md`
3. **2026-05-26 (MBP):** 4 project taglines locked (A-1, A-2, A-4, A-5; A-3 was already locked in CLAUDE.md). Lock doc: `docs/writing-council/project-taglines-locked-2026-05-26.md`
4. **2026-05-27 (MBP):** 3 case-study four_q blocks rewritten (A-1, A-2, A-4); A-5 audited clean. A-4 opener ¶1 + ¶3 amended. About B-2 ¶1 tenure-word swap. Lock doc: `docs/writing-council/project-four-q-locked-2026-05-27.md`
5. **2026-05-27 (MBP):** Second 2026-05-27 amendment pass against case-study-openers-locked-2026-05-26.md + project-four-q-locked-2026-05-27.md — Tier 1 mechanical fixes (A-3 timing 08:45→08:30; A-5 Methods stack truth; date corrections on Code Brain `date_started: 2026-02-06` + 16BitFit `date_active_through: 2026-04-20` + investigation board APR 2→APR 20) + Tier 2 anchor metrics (A-1/A-2/A-4) + A-1 opener ¶3 closer rewrite + A-4 opener ¶2 Simon→Polymarket swap.
6. **2026-05-27 (MBP):** Workstream D Phase 1 — Transactions ledger. Lock doc: `docs/writing-council/transactions-prose-locked-2026-05-27.md` — Phase 1 page chrome + Phase 2 five ledger rows (phase-d-typed-edges, knowledge-loop-phase-6, intent-engineering-mcp, vault-synthesizer-eval-suite, substack-drafter).
7. **2026-05-27 (MBP):** Workstream D Phase 2 — Architecture surface. Lock doc: `docs/writing-council/architecture-prose-locked-2026-05-27.md` — Phase 1 page chrome + Phase 2 Vault Scorecard frontmatter. One v1 occupant only per "get-site-up-first" preference; Vault Knowledge MCP Design + Control Architecture deferred to future sessions.
8. **2026-05-28 (MBP):** Workstream D Phase 3 — Essays surface. Lock doc: `docs/writing-council/essays-prose-locked-2026-05-28.md` — Phase 1 index page chrome + Phase 2 meaning-over-access manifesto frontmatter (E-1 excerpt, S-1 subtitle, M-1 caption, Option A roleMap schema amendment, 4 cross-link nulls + 6 quadrantLegend nulls intentional for v1).
9. **2026-05-28 (MBP):** Workstream D Phase 4 — Site chrome + dark-mode wipe + F-2 footer staging. Lock doc: `docs/writing-council/site-chrome-prose-locked-2026-05-28.md` — Phase 1 confirmed prose (nav labels / wordmark / footer columns / /contact/ / /404/) + Phase 2 F-2 staging mechanism (RSS_FEEDS + EXTERNAL_SUBSCRIBE_LINKS arrays in site.ts) + Phase 3 comprehensive dark-mode wipe (14+ spec sections + 5 codebase deletions, terminal).

## CRITICAL FIRST STEP — audit before you edit

Before writing or proposing ANY changes this session, ask me directly:

> *"Is there specific context I should ground against before starting? Resume files, architecture docs, decision memos, source-of-truth files for the A-4 cleanup / investigation boards / methods strips, anything I should check before assuming the prior council writings and the existing MDX files are factually correct?"*

**Why this matters:** prior council passes have hallucinated. The A-4 (The Block) opener originally listed surfaces that don't appear in my resume. The A-4 four_q originally described a 2024–2026 three-tier-structure narrative that didn't happen. We caught those by grounding against my actual resume. The 2026-05-27 second amendment caught more — Code Brain real start date was wrong on disk (2025-09-01), 16BitFit pause date was wrong, the "118 SKILLS / 14 HOOKS / 8 AGENTS" anchor metric violated the no-fixed-counts rule. Audit every surface you touch against actual source-of-truth before proposing prose.

**Do not assume prior locked text is factually correct.** Audit, then propose. If you find anything in the prior locks that looks fabricated, stale, or anchored to a wrong premise, flag it before proposing edits.

**The most likely places fabrication has historically snuck in:** investigation board artifacts (dates + metrics), Methods strip rows (stack drift), anchor metrics (count-fragile), `date_started:` / `date_active_through:` frontmatter, four_q content, fabricated subscriber growth charts, fabricated tier structures.

For the new Workstream D surfaces specifically:

- **A-4 broader cleanup:** the resume files at `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/` are the ground truth. The existing `the-block.mdx` has a fabricated `act3-tier-structure` investigation board artifact, a fabricated subscriber growth chart claiming 18→134 across "2024 Q2"–"2025 Q4," fabricated tenure dates (`date_started: 2024-02-01`), and a fabricated `anchor_metric` that was already locked-corrected on 2026-05-27 but the rest of the file wasn't reconciled. Treat ALL existing the-block.mdx content (except the 2026-05-27 opener + tagline + anchor metric + 4Q locks) as suspect until verified against the resume.
- **Investigation boards (A-2 / A-3 / A-5):** spec §10 defines the shape. A-2 board tracks Code Brain fleet ops calendar (real dates from `/Users/seanwinslow/Code-Brain/code-brain/CHANGELOG.md` — but note the v1.0.0 date is wrong on disk, real first date is 2026-02-06). A-3 board is the intent-engineering-mcp build calendar with the v0→v0.1.0 cut decision visible (source: `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/CHANGELOG.md`). A-5 board tracks the 16BitFit pause decision + KILLED items (source: `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md` + the pause-related notes referenced from the case-study openers lock). A-1 is already locked elsewhere (anima production progress tracked in `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/production-checklist.md`).
- **Methods strips:** spec §8.1 says 4-7 rows typical. The Methods strip is where HybridRouter lives per the cross-portfolio STOP-DOING rule (it must NEVER appear in opener/4Q/tagline/lead/About prose — only Methods rows). Partial fixes already applied (A-1 + A-5 stack-truth corrections per 2026-05-27 amendment; A-4 multi-surface methods array flagged in the 4Q lock). Full row sets need editorial work for each case study.

## Carry-forward comments from prior sessions (READ THIS BEFORE STARTING)

This is the single most important section. The prior 9 sessions surfaced findings that the new session needs to inherit cleanly:

**Lock-doc apply state:**

1. **No prior lock doc has been applied to disk yet.** Sean has been authoring lock docs on MBP and committing them to GitHub; Mac Mini Claude Code applies them in separate sessions. The current on-disk MDX state is mostly pre-lock pencil-test-era content. Don't assume the lock docs reflect what's rendering at localhost:4321.
2. **Apply order coordination needs to happen.** The 8 lock docs + the second 2026-05-27 amendments + the spec amendments are all queued for Mac Mini. Sean should sequence them in a single coherent commit chain before running `npm run dev`. Do NOT do the apply yourself — that's a Mac Mini job.
3. **The architecture lock doc has a voice-review gate that blocks Mac Mini apply.** Don't recommend applying the architecture lock until the upstream essay at `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` has been voice-reviewed via the `writing-voice-modes` skill. Same gate applies to every future architecture writeup before public posting.
4. **The essays lock doc has the same gate** — upstream `code-brain/docs/MEANING_OVER_ACCESS.md` is voice-stable per the 2026-05-21 council pass (per the file's frontmatter `voice_pass_applied: 2026-05-21`) but the `sourceUrl` + `explanationUrl` only resolve after Sean tags the `draft_lock_target: 2026-05-23` commit and pushes.
5. **The essays lock requires a schema amendment FIRST** before the manifesto MDX validates. Option A: roleMap row `jdUrl` becomes optional + new `isNegativeSpace` boolean flag. Spelled out in essays lock §"Spec implications" + apply-checklist step 3.
6. **The site chrome lock includes a comprehensive dark-mode wipe** — 14+ spec amendments + 5 codebase deletions. Dark mode is TERMINAL. Don't add dark-mode references or infrastructure to any new content this session.

**Decision carry-forwards from 2026-05-28 audit answers:**

7. **Title decision: "Access Over Meaning"** for the manifesto display title. URL slug stays `meaning-over-access`. Italic hook on the essays index = "I bet on meaning, not access." This is a deliberate title-vs-slug split — title carries the rhetorical move (the ironic framing of the world-as-it-is), slug carries the searchable thesis (the bet).
8. **4 cross-link nulls + 6 quadrantLegend artifact nulls** in the essays manifesto frontmatter are intentional v1 limitations. They backfill via amendment as each upstream artifact ships its ledger row or architecture writeup. Don't propose populating them with placeholder strings — the validator hard-fails on dangling slugs.
9. **F-2 footer staging mechanism.** RSS_FEEDS + EXTERNAL_SUBSCRIBE_LINKS arrays in `src/lib/site.ts`. Each surface go-live = one-line uncomment + 1 commit. v1 launches with transactions only.
10. **Vault Scorecard 6th ledger row (`src/content/transactions/vault-scorecard.md`)** still not authored. Open item, low priority, defer. Sean's call to ship without it; amend post-launch as needed.
11. **OG card text verification** — outstanding audit item. CLAUDE.md says 4 cards already authored. The essays card needs to match today's "Access Over Meaning" title decision (was the card text written before today's swap?). The vault-knowledge-mcp card has a `SHIPPED 2026-05-12` stamp but vault-knowledge-mcp ships ~6/4 per the architecture lock — date conflict worth checking. Surface this during the final verification pass.

**Cumulative voice-calibration constraints (NON-NEGOTIABLE, accumulated across 8 lock docs):**

12. **No fixed counts of Code Brain skills, agents, or hooks anywhere.** The fleet is constantly evolving; numbers are stale within a week. Use language that leans into the fluctuation ("a fleet that grows and shrinks with the work" / "a roster that never sits still") or omit the count entirely and let "fleet" carry the meaning. Applies to all surfaces — case-study openers, Methods strips, anchor metrics, About prose, footer copy.
13. **iPad callback ceiling reached.** Used in About B-1 beats 3 + 6 + A-1 opener ¶1. Three is the cap; do not let the iPad surface in any further surface prose.
14. **"Comprehension is the artifact" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1 + A-2 opener ¶3. Three is the cap.
15. **"Building got cheap" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1. Two is the cap.
16. **HybridRouter STOP-DOING is portfolio-wide.** HybridRouter lives in Methods strip rows only. Never in valueProp prose, opener prose, 4Q prose, lead prose, taglines, hero text, About prose. Applied universally to every new surface this session.
17. **"fleet" usage frequency at tagline-level ceiling reached at 2.** Used in Home About teaser + A-1 tagline. Methods strips + opener prose + 4Q prose + valueProp prose + anchor metrics can still use "fleet" freely (ceiling is tagline-level only).
18. **No tenure-foregrounding on public surfaces.** Date data lives in frontmatter `date_started` / `date_active_through` for anyone who needs the timeline; user-facing prose stays focused on the work. Particularly the A-4 cleanup.
19. **No traces of desperation.** Page reads identically hired vs hunting. Zero "looking for work / please hire me / in the room" cadence.
20. **No tagline echo** in value-prop pull-quotes, openers, 4Q blocks, anchor metrics, leads. Each surface carries a different facet, not a repeat.
21. **Structural-family discipline at tagline level.** Avoid "Same X, same Y, same Z" rule-of-three family — used at About B-1 beat 6 + A-5 opener ¶2; tagline-level ceiling reached.
22. **Resume-evidence anchoring for A-4.** All prose about The Block must be groundable in the resume files. No fabricated surfaces, fabricated tier structures, fabricated metric arcs.
23. **Agentic-engineering thread as load-bearing for A-4.** The 3 Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`), the RevOps automation pipeline, the AI-assisted Campus 201 media generation, the x402/A2A/MCP strategy memo — these are the receipts. Foreground them.
24. **Architecture-doc anchoring for A-1.** anima prose must reflect the v2 architecture lock: 10-phase pipeline, 7 named personas (Maya/Cy/Sam/Bea/Flo/Em/Mo), 3-tier critic stack, Phase 5 model routing (NB Pro / NB2 / GPT-Image-2 / Seedream / Qwen-IE / FLUX+LoRA), draft→pro escalation.
25. **Real dates Sean confirmed:** Code Brain real start = 2026-02-06. 16BitFit pause = 2026-04-20. The Block tenure = Nov 2025 – May 4, 2026. (Layoff = 2026-05-04, cost-cutting not performance, Larry Cermak primary reference.)
26. **A-5 anchor metric (`PIPELINE 47% · GAME ON SHELF`)** is count-fragile per constraint #12 but Sean's call to defer the fix. Don't change it this session unless Sean specifically asks.
27. **Dark mode is terminal.** Per site chrome lock §3. No dark-mode references, no `data-theme="dark"`, no theme-toggle infrastructure anywhere in new content.

**General voice rules (from all sessions):**

28. **Quick and silly, NOT heavy self-deprecation.**
29. **Wire-service-style format, sentence-case prose.**
30. **Compound nouns / hyphens for parallel comparisons.**
31. **Specific nouns over abstract claims.** Always anchor.
32. **Kill the "I realized that…" / "I used to think…" / "I noticed…" signposts.**
33. **Page-level callback rhymes are gold** — but watch the ceilings above.
34. **Watch council-default reflexes** ("cold coffee," "5 a.m.," timestamps).
35. **Signature moves catalogued in the voice-modes skill** — Hard Cut, Rule of Three + Pivot, Callback Closer, Sensory Before Numbers, Reader-Dismissal, etc.

## Read these files first (in order)

1. **Personal context** — `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md` (biography, voice, communication baseline, current state)
2. **Portfolio CLAUDE.md** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md` (project rules, template-trap warnings, three load-bearing things, locked decisions quick-reference)
3. **Voice modes skill** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/writing-voice-modes/SKILL.md` + `references/voice-samples.md` + `references/calibration-notes.md`
4. **All eight prior lock docs in chronological order** — read each in full:
   - `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
   - `docs/writing-council/case-study-openers-locked-2026-05-26.md` (note the two 2026-05-27 amendment sections near the top)
   - `docs/writing-council/project-taglines-locked-2026-05-26.md`
   - `docs/writing-council/project-four-q-locked-2026-05-27.md` (note the 2026-05-27 amendment near the top)
   - `docs/writing-council/transactions-prose-locked-2026-05-27.md`
   - `docs/writing-council/architecture-prose-locked-2026-05-27.md`
   - `docs/writing-council/essays-prose-locked-2026-05-28.md`
   - `docs/writing-council/site-chrome-prose-locked-2026-05-28.md`
5. **Surface specs** — for this session, the case-study spec is the critical read:
   - `docs/specs/case-study-spec-v1.md` — §8 (Methods strip) + §10 (Investigation board) are this session's load-bearing sections
   - `docs/specs/BLUEPRINT-COMPLETE.md` (entry point)
   - `docs/specs/PORTFOLIO-MASTER-PLAN.md` (strategic anchor)
6. **Source-of-truth files for the surfaces being audited:**

   For A-4 The Block cleanup:
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md` (canonical resume — work-experience bullets are the ground truth for what Sean shipped at The Block)
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md` (resume additions — secondary evidence for tools, surfaces, and workflow details)
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md` (conversion log for sanitizable source PRDs + competitive analyses + x402 research — useful when the investigation board cleanup pass happens)

   For A-2 Code Brain (investigation board + Methods strip):
   - `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md` (canonical Code Brain context — read for current state, dates, agent roster)
   - `/Users/seanwinslow/Code-Brain/code-brain/CHANGELOG.md` (decision history — note: real first date is 2026-02-06, NOT what the v1.0.0 entry says on disk)

   For A-3 intent-engineering-mcp (investigation board + Methods strip):
   - `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/README.md`
   - `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/CHANGELOG.md` (the build calendar — has the v0→v0.1.0 cut decision visible)

   For A-5 16BitFit (investigation board + Methods strip):
   - `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/README.md`
   - `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md`

   For A-1 anima (Methods strip — investigation board already locked):
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md` (load-bearing intent doc — the soul of what anima is for)
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/production-checklist.md` (current Act 1 shipped + Act 2 in flight status)

7. **Existing on-disk MDX files (audit these against the source-of-truth files above):**
   - `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/work/the-block.mdx`
   - `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/work/code-brain.mdx`
   - `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/work/intent-engineering-mcp.mdx`
   - `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/work/16bitfit.mdx`
   - `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/work/animation-pipeline.mdx`

Optionally invoke `/pm-product-discovery:brainstorm-ideas-existing` if you want the multi-perspective ideation framework loaded explicitly. The skill is what puts you in the PM / Designer / Engineer multi-perspective headspace this project was planned in. (You're being launched into this session via that skill specifically — I'm assuming it's loaded.)

## What we're writing this session

Three surfaces remain. Confirm priority order with me after the audit-first step.

### Surface 1 — A-4 The Block broader cleanup

**File:** `src/content/work/the-block.mdx`

**Scope:** Fix everything in the-block.mdx that wasn't already locked in the 2026-05-26 + 2026-05-27 opener/tagline/anchor-metric/4Q passes.

**What's already locked (don't recreate):**
- Tagline (line 5): `B2B PM work where the agreement is the UX.`
- Anchor metric (line 19): `"B2B PM · INSTITUTIONAL CRYPTO RESEARCH"`
- Opener prose (lines 52–54): the 3 paragraphs per `case-study-openers-locked-2026-05-26.md` §A-4 LOCKED + the 2 2026-05-27 amendments (¶1 surface inventory swap + ¶2 Simon→Polymarket swap + ¶3 tenure deletion)
- 4Q frontmatter (lines 38–43): the full block per `project-four-q-locked-2026-05-27.md` §A-4 LOCKED

**What needs fixing this session:**
- `date_started:` (line 15) — currently `2024-02-01`, factually `2025-11-01` (or actual start date in November 2025)
- `date_active_through:` (line 16) — currently `2026-02-01`, factually `2026-05-04` (layoff date)
- `methods:` array (lines 24–36) — currently lists Campus + RevOps + data partnerships only; needs to broaden to match the multi-surface scope from the 2026-05-27 4Q lock: Campus / ETF launch pages / Polymarket × Campus / .co homepage redesign audit / RevOps automation / bi-weekly P&E. Sean to curate which 4-6 land on the strip per spec §8.1 "4-7 rows typical."
- Investigation board artifacts (lines 57–95) — currently full of fabricated content: Campus v1 launch dated "2024," tier structure dated "2025 Q1," subscriber chart claiming 18→134 across "2024 Q2"–"2025 Q4." All fabricated. Needs full rework with sanitizable source material from `the-block-resume-info/`.

**Voice register:** ARCHIVED case study, multi-surface scope, present-tense company identity + past-tense work-context. Per opener §A-4 LOCKED + spec §13.4.

### Surface 2 — A-2 / A-3 / A-5 investigation boards

**Files:**
- `src/content/work/code-brain.mdx` (A-2)
- `src/content/work/intent-engineering-mcp.mdx` (A-3)
- `src/content/work/16bitfit.mdx` (A-5)

**Scope:** Lock the investigation board content per case-study spec §10 for these three projects. A-1 already locked (anima production progress tracked separately in `production-checklist.md`). A-4 handled separately in Surface 1.

**Per-project framing:**
- **A-2 (Code Brain):** the board is the fleet ops calendar. Real dates from `code-brain/CHANGELOG.md` (remembering the 2026-02-06 real first date). Surfaces real ops failures + how they got patched (the launchd PATH bug, the Process Inbox pause, the vault sync ownership transitions). The "What broke?" entries match the 4Q `break:` block.
- **A-3 (intent-engineering-mcp):** the board is the build calendar with the v0 → v0.1.0 cut decision visible in the middle. The "exciting tool-call demo cut" decision sitting forward-dated on the board is the load-bearing artifact — it visually anchors the opener's ¶2 PM-principle argument. Source: `sw-mcp-intent-engineering/CHANGELOG.md`.
- **A-5 (16BitFit):** the board carries forward to the 2026-04-20 pause decision (corrected per the 2026-05-27 amendment from APR 2). KILLED items list per the opener ¶3: "a v1 gameplay loop that wasn't carrying its own weight without the polish layer, a Phaser atlas-streaming experiment I'd talked myself into mid-scope-creep, and an evening I would have spent angrily exporting frames I knew weren't right yet."

**Voice register:** wire-service mono throughout (board entries are status-strip artifacts, not editorial prose). Specific dates, specific decisions, no first-person editorializing.

### Surface 3 — Methods strips, full authoring for all 5 case studies

**Files:** all 5 MDX files in `src/content/work/`.

**Scope:** Lock 4-7 row Methods strip per spec §8.1 for each case study. Partial fixes already applied (A-1 + A-5 stack-truth corrections per the 2026-05-27 amendment; A-4 multi-surface methods array flagged but not authored); full row sets need editorial work.

**Methods strip is where HybridRouter lives** per the cross-portfolio STOP-DOING rule. Apply discipline accordingly — HybridRouter goes here only, never in any other prose surface.

**Per-row shape (per spec §8.1):**
```yaml
methods:
  - task: <task verb>
    tool: <tool name>
    cost: <pricing or compute note>
    link: <internal cross-link to /work/<slug> OR null>
```

**Per-project guidance:**
- **A-1 (animation-pipeline):** anima 10-phase pipeline. Stack truth corrected per 2026-05-27 amendment: Gemini Nano Banana 2 (stills) + Seedance 2.0 (motion). Phase 5 routes across NB Pro / NB2 / GPT-Image-2 / Seedream / Qwen-IE / FLUX+LoRA per architecture-doc anchoring. Code Brain cross-link (`link: /work/code-brain`) for orchestration row.
- **A-2 (code-brain):** the orchestration project itself. Methods strip lives the agentic-engineering thread. HybridRouter goes here. Codex CLI + Anti-Gravity CLI parallel critic row. Three-machine orchestration row. SDK agents row (no fixed count — language that leans into fluctuation per constraint #12).
- **A-3 (intent-engineering-mcp):** the npm package + MCP server. Stack: TypeScript MCP SDK, DNS-verified registry, npm publish, stdio transport, Claude Code development environment. Cross-link to /work/code-brain for the development environment row.
- **A-4 (the-block):** multi-surface scope per the 4Q lock. Curate 4-6 rows from: Campus / ETF launch pages / Polymarket × Campus 0-to-1 / .co homepage redesign audit / RevOps automation (11 Zapier workflows + 10 intake forms + central Tables DB) / bi-weekly P&E stakeholder update. The 3 production Claude Skills (etf-page-creator, stakeholder-update, jira-automation) are receipts of the agentic-engineering thread — foreground in row labels.
- **A-5 (16bitfit):** Phaser + Gemini Nano Banana 2 (pixel-art Gemini skill, NOT Seedance — per the 2026-05-27 stack-truth fix) + animation-pipeline cross-link (`link: /work/animation-pipeline`). Cost field needs verification per Sean's pre-commit pass (the previous `~$1/run` was flagged as needs-verification).

### Surface 4 — Final verification pass

After Surfaces 1-3 lock, run a final verification pass across every locked string from all 9 lock docs against the source-of-truth files. Catch:

- Ceiling violations (iPad / "Comprehension is the artifact" / "Building got cheap" / "fleet" at tagline level)
- HybridRouter leaks into non-Methods-strip prose
- Tenure-foregrounding on public surfaces
- Fixed-count anchor metrics
- Fabricated URLs, dates, surfaces, metrics
- Voice-register drift (Sedaris where it shouldn't be, sober where it should be warm, etc.)
- Cross-link slug resolution (validators hard-fail on dangling slugs)
- OG card text alignment with locked titles (especially the essays card vs. today's "Access Over Meaning" title decision)

This pass closes Workstream D. For particularly high-stakes work consider using a subagent (Task tool) for independent verification.

## Working approach (calibrated from prior sessions)

- **Audit-first, then propose.** Per CRITICAL FIRST STEP. Always ground against the actual source-of-truth file before tweaking prior council prose or writing new prose.
- **Multi-perspective generation for any prose rewrite:** draft 4-6 options tagged by voice mode (Sedaris / Thompson / Kerouac / Vonnegut / Sean Mode / hybrid). Sean picks + calibrates.
- **One surface at a time** — lock one before moving to the next. Within a surface, phase the work (per-project audit findings before drafting, then drafting per project, then locking before the next).
- **Be brief and direct.** Don't over-explain. Sean wants the why and the how, not a thesis. No "ready to start?" or "want me to proceed?" — just dive in.
- **No MDX edits committed from this session.** Sean is on MBP, applies on Mac Mini. Write all locked content into markdown lock docs at `docs/writing-council/{topic}-locked-YYYY-MM-DD.md`. Match the format of the eight prior lock docs.
- **Update existing lock docs in place** when amending prior decisions (use Edit, not Write — preserve history). Add a `## YYYY-MM-DD amendment` section if the amendment is substantive. Multiple amendments on the same day disambiguate via descriptive titles.
- **Resume-evidence anchoring is required for any prose about The Block.** The three resume files at `the-block-resume-info/` are the source of truth.
- **Architecture-doc anchoring is required for any prose about anima (A-1).** PHILOSOPHY.md is the soul; the two brainstorm docs are the architecture.
- **For new surfaces, ground against the upstream canonical content.** Don't invent claims that aren't in the source.

## Biographical anchors (so you don't have to ask)

- Born November 28, 1992 → age 33 in 2026
- Boston (Charlestown, MA) with girlfriend Mary McKee
- ~10 years multimedia freelancer in NYC (illustration, animation, film)
- **November 10, 2025 – May 4, 2026:** Product Manager at The Block. Laid off 2026-05-04 (cost-cutting, not performance). Larry Cermak is primary reference. Tenure stays out of public prose per constraint #18 — only appears in frontmatter date fields.
- Currently in 8-week job hunt (through ~2026-07-04). Target: AI PM > Tech PM > Creative PM. Boston metro or remote. No mentions of the hunt itself on the public page.
- Tools: Anti-Gravity IDE, Claude Code, Ollama, Procreate on iPad
- Three machines: Mac Mini (primary), MacBook Pro (travel/couch), Alienware RTX 5080 (CUDA)
- Animation pipeline (anima) — first proof-piece deadline June 11, 2026. Stack: Gemini Nano Banana 2 (keyframe stills) + Seedance 2.0 (motion interpolation). NOT Seedream.
- Code Brain real start = February 6, 2026 (not 2024).
- 16BitFit paused 2026-04-20.

## Locked content reference (do not recreate)

### Taglines

| Surface | Tagline |
|---|---|
| Home hero | Product Manager. The agents handle the loops. I handle the taste. |
| About header | Raised by Saturday morning cartoons and Vercel deployment logs. |
| Home About teaser editorial line | A man, a pencil, an agent fleet. Same person, different tools. |
| A-1 animation-pipeline | A pencil-test pipeline with a fleet of in-betweeners. |
| A-2 code-brain | A second brain that grew a third one for itself. |
| A-3 intent-engineering-mcp | Drawing up agents to act with intent. |
| A-4 the-block | B2B PM work where the agreement is the UX. |
| A-5 16bitfit | Paused the game. Shipped the pipeline. |

### Anchor metrics

| Surface | Metric |
|---|---|
| A-1 animation-pipeline | ACT 1 SHIPPED · ACT 2 IN FLIGHT |
| A-2 code-brain | OVERNIGHT FLEET · LAUNCHD-NATIVE |
| A-3 intent-engineering-mcp | 0.1.0 · NPM + MCP REGISTRY · 2026-05-12 |
| A-4 the-block | B2B PM · INSTITUTIONAL CRYPTO RESEARCH |
| A-5 16bitfit | PIPELINE 47% · GAME ON SHELF (count-fragile, deferred — do not touch this session) |

### Page chrome (transactions / architecture / essays / site chrome)

All locked in their respective lock docs. Cross-reference Phase 1 sections of:
- `transactions-prose-locked-2026-05-27.md` §1
- `architecture-prose-locked-2026-05-27.md` §Phase 1
- `essays-prose-locked-2026-05-28.md` §Phase 1
- `site-chrome-prose-locked-2026-05-28.md` §Phase 1

### Case-study openers, four_q blocks, About B-1/B-2/B-4

All locked in their respective lock docs. Read them; don't recreate.

### Transactions ledger rows + Architecture writeup

5 ledger rows locked + 1 architecture writeup (Vault Scorecard) locked. Per the respective lock docs. 6th ledger row (vault-scorecard) still needs authoring as open item — defer to a future session unless Sean explicitly requests it this session.

### Essays manifesto

Per-essay frontmatter for `meaning-over-access.mdx` locked in `essays-prose-locked-2026-05-28.md`. Title = `"Access Over Meaning"`. Slug = `meaning-over-access`.

### Site chrome

Nav + footer + /contact/ + /404/ + F-2 footer staging + dark-mode wipe all locked in `site-chrome-prose-locked-2026-05-28.md`.

## Source-of-truth files (collected here for quick scan)

### Portfolio context

- `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/writing-voice-modes/SKILL.md`
- `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md`

### Portfolio specs (this session's load-bearing read)

- `docs/specs/case-study-spec-v1.md` — §8 Methods strip + §10 Investigation board are the canonical references for this session's work
- `docs/specs/BLUEPRINT-COMPLETE.md` (entry point)
- `docs/specs/PORTFOLIO-MASTER-PLAN.md` (strategic anchor)

### Anima / A-1 source-of-truth

- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/production-checklist.md`

### Code Brain / A-2 source-of-truth

- `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/code-brain/CHANGELOG.md` (note: real first date is 2026-02-06, not what v1.0.0 entry says)
- `/Users/seanwinslow/Code-Brain/agent-fleet-observability/PRODUCT.md`

### intent-engineering-mcp / A-3 source-of-truth

- `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/README.md`
- `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/CHANGELOG.md`

### The Block / A-4 source-of-truth (mandatory)

- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md`

### 16BitFit / A-5 source-of-truth

- `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/README.md`
- `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md`

### All eight prior lock docs (read all before writing)

- `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
- `docs/writing-council/case-study-openers-locked-2026-05-26.md` (with 2 amendments)
- `docs/writing-council/project-taglines-locked-2026-05-26.md`
- `docs/writing-council/project-four-q-locked-2026-05-27.md` (with 1 amendment)
- `docs/writing-council/transactions-prose-locked-2026-05-27.md`
- `docs/writing-council/architecture-prose-locked-2026-05-27.md`
- `docs/writing-council/essays-prose-locked-2026-05-28.md`
- `docs/writing-council/site-chrome-prose-locked-2026-05-28.md`

## Where to start

After running the CRITICAL FIRST STEP (audit-first ask), let me confirm priority order. The default sequence I'd suggest:

1. **A-4 The Block broader cleanup first** (1-2 sittings) — highest-stakes audit work (fabricated content needs full rework against the resume). Per Sean's 2026-05-28 sequencing: "I want to make sure all of that is clean." Resume files at `the-block-resume-info/` are the ground truth. Single lock doc output: `docs/writing-council/the-block-cleanup-locked-YYYY-MM-DD.md`.

2. **A-2 / A-3 / A-5 investigation boards next** (1-2 sittings) — locked content per case-study spec §10 for three projects. A-1 already locked elsewhere. Can be batched into one lock doc or split per project per Sean's preference. Recommend single lock doc for efficiency: `docs/writing-council/investigation-boards-a2-a3-a5-locked-YYYY-MM-DD.md`.

3. **Methods strips for all 5 case studies** (2-3 sittings) — 4-7 rows per case study per spec §8.1. The Methods strip is where HybridRouter lives. Recommend single lock doc covering all 5 to keep cross-strip consistency tight: `docs/writing-council/methods-strips-locked-YYYY-MM-DD.md`.

4. **Final verification pass last** — cross-checks every locked string from all 11+ lock docs against source-of-truth. Catches remaining ceiling violations + fabrications + voice drift. Outputs: a final audit-findings doc or amendment-pass document. Possibly use Task tool for an independent subagent verification.

After step 4 closes, Workstream D is complete. Open items deferred post-launch (per Sean's 2026-05-28 calls): 6th ledger row (vault-scorecard), About §B-3 cartoon cels content, OG card text verification, A-5 anchor metric Tier-3 fix, backfill amendments as upstream artifacts ship.

But the audit-first step may surface higher-priority items I don't know about yet. Let me know what you want to tackle first after you read in and audit. Use the `/pm-product-discovery:brainstorm-ideas-existing` skill along with the `writing-voice-modes` skill to help me brainstorm.

---

> *(End of kickoff prompt.)*

---

## Author's note (Claude, 2026-05-28)

This prompt is calibrated against Sean's earlier kickoff prompts — same structure, same voice, same level of detail. The new session should be able to:

1. Ground correctly without re-asking biographical questions
2. Honor all 27+ accumulated voice-calibration constraints from prior sessions
3. Resume work seamlessly on the remaining 3 surfaces + verification pass
4. Use the same lock-doc format conventions established across the 8 prior locks

If the new session encounters anything Sean doesn't expect, the audit-first step should surface it before any prose-writing happens — that pattern has caught hallucinations + fabrications + stale anchors in every prior session.

The biggest risk in the new session is the A-4 cleanup. The existing `the-block.mdx` content is heavily fabricated (subscriber growth charts, tier structures, tenure dates all wrong). Treating it as untrusted and auditing every line against the resume files is mandatory. The new session should NOT propose edits to A-4 content until it has confirmed each claim against the three resume files.

Workstream D's eight prior lock docs accumulate substantive editorial decisions. The new session shouldn't re-litigate any of them — only add to them via the three remaining surfaces + the verification pass.

Good luck.
