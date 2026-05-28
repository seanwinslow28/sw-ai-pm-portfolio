# Workstream D continuation — Cowork session kickoff prompt

> **Use:** paste the section below ("KICKOFF PROMPT — copy from here") into a fresh Cowork session and invoke `/pm-product-discovery:brainstorm-ideas-existing` to load the multi-perspective ideation framework. Update the date at the top of the prompt to the current session date before pasting.
>
> **Authored:** 2026-05-27 on MBP after Workstream D Phase 1 + Phase 2 (transactions + architecture) lock docs landed.
>
> **Why this exists:** session context blows away between Cowork runs. This prompt re-seeds the new session with everything it needs to ground against — every prior lock doc, every voice constraint, every source-of-truth file path, every carry-forward comment from this session — without you having to re-explain.

---

## KICKOFF PROMPT — copy from here ↓

I'm Sean Winslow. We're continuing a multi-session brainstorm refining my portfolio's writing surfaces. **Six prior sessions** have locked content; this session continues **Workstream D** — the remaining unwritten surfaces (essays, site chrome, home about teaser deck) — plus a hallucination audit on whatever you'll touch.

Session lineage so far:
- 2026-05-25 (MBP): About B-1/B-2/B-4 prose locked. Recruiter italic call-out removed. Lock doc: `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
- 2026-05-26 (MBP): All 5 case-study openers locked (A-1, A-2, A-3, A-4, A-5). Lock doc: `docs/writing-council/case-study-openers-locked-2026-05-26.md`
- 2026-05-26 (MBP): 4 project taglines locked (A-1, A-2, A-4, A-5; A-3 was already locked in CLAUDE.md). Lock doc: `docs/writing-council/project-taglines-locked-2026-05-26.md`
- 2026-05-27 (MBP): 3 case-study four_q blocks rewritten (A-1, A-2, A-4); A-5 audited clean. A-4 opener ¶1 + ¶3 amended. About B-2 ¶1 tenure-word swap. Lock doc: `docs/writing-council/project-four-q-locked-2026-05-27.md`
- 2026-05-27 (MBP): Second 2026-05-27 amendment pass against `case-study-openers-locked-2026-05-26.md` + `project-four-q-locked-2026-05-27.md` — Tier 1 mechanical fixes (A-3 timing 08:45→08:30; A-5 Methods stack truth; date corrections on Code Brain `date_started` 2026-02-06 + 16BitFit `date_active_through` 2026-04-20 + investigation board APR 2→APR 20) + Tier 2 anchor metrics (A-1/A-2/A-4) + A-1 opener ¶3 closer rewrite + A-4 opener ¶2 Simon→Polymarket swap.
- 2026-05-27 (MBP): **Workstream D Phase 1 — Transactions ledger.** Lock doc: `docs/writing-council/transactions-prose-locked-2026-05-27.md` — Phase 1 page chrome + Phase 2 five ledger rows (phase-d-typed-edges, knowledge-loop-phase-6, intent-engineering-mcp, vault-synthesizer-eval-suite, substack-drafter).
- 2026-05-27 (MBP): **Workstream D Phase 2 — Architecture surface.** Lock doc: `docs/writing-council/architecture-prose-locked-2026-05-27.md` — Phase 1 page chrome + Phase 2 Vault Scorecard frontmatter. **One v1 occupant only** per "get-site-up-first" preference; Vault Knowledge MCP Design + Control Architecture deferred to future sessions.

## CRITICAL FIRST STEP — audit before you edit

Before writing or proposing ANY changes this session, ask me directly:

> "Is there specific context I should ground against before starting? Resume files, architecture docs, decision memos, source-of-truth files for the essays / site chrome / teaser deck surfaces, anything I should check before assuming the prior council writings and the new specs are factually correct?"

Why this matters: prior council passes have hallucinated. The A-4 (The Block) opener originally listed surfaces that don't appear in my resume. The A-4 four_q originally described a 2024–2026 three-tier-structure narrative that didn't happen. We caught those by grounding against my actual resume. The 2026-05-27 second amendment caught more — Code Brain real start date was wrong on disk (2025-09-01), 16BitFit pause date was wrong, the "118 SKILLS / 14 HOOKS / 8 AGENTS" anchor metric violated the no-fixed-counts rule. Audit every surface you touch against actual source-of-truth before proposing prose.

**Do not assume prior locked text is factually correct.** Audit, then propose. If you find anything in the prior locks that looks fabricated, stale, or anchored to a wrong premise, flag it before proposing edits.

The most likely places fabrication has historically snuck in: investigation board artifacts (dates + metrics), Methods strip rows (stack drift), anchor metrics (count-fragile), date_started: / date_active_through: frontmatter, four_q: content. For the new Workstream D surfaces specifically:

- **Essays:** the manifesto essay exists at `code-brain/docs/MEANING_OVER_ACCESS.md` (13.4KB) + its 4Q at `MEANING_OVER_ACCESS_EXPLANATION.md` (6.5KB). Ground every claim in the essay prose against what's actually written there. There's also a Substack cross-publication draft at `code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/substack-drafts/2026-06-19-meaning-over-access-substack-cross.md` — useful for voice calibration.
- **Site chrome:** the nav labels + footer copy + /contact/ + 404 are mostly editorial-light, but every link target needs to resolve (no placeholder URLs like the A-4 `archived_reference_url`).
- **Home About teaser deck:** 10 cards already-locked at `reference-images/teaser-deck/` (per CLAUDE.md §"Current status"). The card captions are spec'd structurally in `docs/specs/home-about-teaser-spec-v1.md` but the caption strings themselves are unlocked. Look at the actual card images before writing captions — caption needs to be grounded against what the image shows.

## Carry-forward comments from the 2026-05-27 session (READ THIS BEFORE STARTING)

This is the single most important section. The prior session surfaced findings that the new session needs to inherit cleanly:

1. **No prior lock doc has been applied to disk yet.** Sean has been authoring lock docs on MBP and committing them to GitHub; Mac Mini Claude Code applies them in separate sessions. The current on-disk MDX state is mostly pre-lock pencil-test-era content. Don't assume the lock docs reflect what's rendering at `localhost:4321`.
2. **Apply order coordination needs to happen.** The transactions lock + architecture lock + the second 2026-05-27 amendments + the spec amendments are all queued for Mac Mini. Sean should sequence them in a single coherent commit chain before running `npm run dev`. Do NOT do the apply yourself — that's a Mac Mini job.
3. **The architecture lock doc has a voice-review gate that blocks Mac Mini apply.** Don't recommend applying the architecture lock until the upstream essay at `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` has been voice-reviewed via the `writing-voice-modes` skill. Same gate applies to every future architecture writeup before public posting.
4. **Code Brain real start date = 2026-02-06.** The CHANGELOG `v1.0.0` entry dated "2024-01-XX" is a mistake; the `v2.0.0` entry at the bottom (dated "2025-02-06") has the wrong year — the real date is 2026-02-06. The Code Brain `date_started` frontmatter, A-2 anchor metric, and any prose referencing "since 2024" or "since 2025" Code Brain history needs to reflect this.
5. **16BitFit real pause date = 2026-04-20.** Currently on disk as 2026-04-01 (frontmatter) and 2026-04-02 (investigation board). Both wrong.
6. **HybridRouter STOP-DOING is portfolio-wide.** HybridRouter lives in Methods strip rows only. Never in valueProp prose, opener prose, 4Q prose, lead prose, taglines, hero text, About prose. This was originally a case-study constraint; the transactions lock extended it. Apply across every new Workstream D surface.
7. **"Get site up first before piling up projects" preference.** This drove two design calls in the 2026-05-27 session: (a) transactions ledger v1 = the 5 already-shipped rows only, no future roadmap rows; (b) architecture v1 = Vault Scorecard only, no Vault Knowledge MCP Design + no Control Architecture. Apply the same preference to any "should we include this future thing?" question that comes up in Workstream D. Defer beats premature.
8. **The 6th ledger row needed.** The architecture lock requires a paired ledger row at `src/content/transactions/vault-scorecard.md` for the bidirectional cross-link to resolve. This row was NOT in the locked 5-row transactions batch. Sean adds it during the architecture apply (using the same shape rules locked in the transactions lock doc). Worth flagging to Sean if he hasn't authored it yet.
9. **Spec amendments queued for separate commits.** Each of the 2026-05-27 lock docs has a "Spec implications" section listing amendments to apply to the matching `docs/specs/*.md` file. These should land as separate commits on Mac Mini after the lock-doc applies. The amendments resolve OPEN questions and canonicalize patterns that emerged during the brainstorms.
10. **All voice-calibration constraints below are cumulative across the 6 prior lock docs.** Each new lock doc inherits all prior constraints + adds new ones. Read every prior lock doc's "Carry-forward constraints" section in full before writing.

## Read these files first (in order)

1. **Personal context** — `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md` (biography, voice, communication baseline, current state)
2. **Portfolio CLAUDE.md** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md` (project rules, template-trap warnings, three load-bearing things, locked decisions quick-reference)
3. **Voice modes skill** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/writing-voice-modes/SKILL.md` + `references/voice-samples.md` + `references/calibration-notes.md`
4. **All six prior lock docs in chronological order — read each in full:**
   - `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
   - `docs/writing-council/case-study-openers-locked-2026-05-26.md` (note the **two** 2026-05-27 amendment sections near the top — first amendment is A-4 ¶1+¶3 surface-inventory swap; second amendment is Tier 1 mechanical fixes + Tier 2 anchor metrics)
   - `docs/writing-council/project-taglines-locked-2026-05-26.md`
   - `docs/writing-council/project-four-q-locked-2026-05-27.md` (note the **second** 2026-05-27 amendment near the top — A-4 opener ¶2 Simon→Polymarket swap)
   - `docs/writing-council/transactions-prose-locked-2026-05-27.md`
   - `docs/writing-council/architecture-prose-locked-2026-05-27.md` (note the voice-review gate at the top — blocks Mac Mini apply until upstream essay is voice-reviewed)
5. **Surface specs (READ ALL THREE — they're all in scope for this session):**
   - `docs/specs/essays-spec-v1.md`
   - `docs/specs/site-chrome-spec-v1.md`
   - `docs/specs/home-about-teaser-spec-v1.md`
6. **Source-of-truth files for the surfaces being written:**
   - **For essays / meaning-over-access:**
     - `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS.md` (the 13.4KB manifesto essay — the canonical source)
     - `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS_EXPLANATION.md` (the 6.5KB 4Q EXPLANATION.md)
     - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/substack-drafts/2026-06-19-meaning-over-access-substack-cross.md` (Substack cross-publication draft — useful for voice tone)
     - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-20-task-13-step-1-manifesto-outline.md` (Task 13 manifesto outline)
     - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-21-task-13-step-2-council-draft.md` (Task 13 council critique pass)
   - **For home about teaser deck:**
     - `reference-images/teaser-deck/` — the 10 already-locked card images (1 photograph + pencil-test + 8 AI-style variations per CLAUDE.md). Look at each image before writing captions.
     - `reference-images/teaser-deck-trials/` — in-progress prompts that explain what each card is conceptually
   - **For site chrome:** no external source-of-truth — pure editorial. Anchor against the existing locked-content reference table at the bottom of this prompt to make sure nav labels + footer copy align with what already exists.

7. **Optionally invoke** `/pm-product-discovery:brainstorm-ideas-existing` if you want the multi-perspective ideation framework loaded explicitly. The skill is what puts you in the PM / Designer / Engineer multi-perspective headspace this project was planned in.

## What we're writing this session

Three Workstream D surfaces remain after this session's transactions + architecture work. Confirm priority order with me before starting — the audit-first step may surface things that change the ordering.

### Surface 1 — Essays index + per-essay pages

- **Spec:** `docs/specs/essays-spec-v1.md`
- **Index page chrome:** h1 + subhead + writeup rows + footer fold (similar shape to transactions but with longer-form content per row)
- **First essay:** "meaning-over-access" — the manifesto. Source files listed above. The essay BODY lives upstream in `code-brain/docs/MEANING_OVER_ACCESS.md`; the per-essay page frontmatter is what we write here.
- **Per-essay frontmatter:** title, dateline, published date, reading time, tags, lead (the thesis pullquote), `essaySourceUrl`, `explanationUrl`, cross-links (relatedLedgerRow, relatedCaseStudy, relatedArchitecture), optional methods/honest-notes if the essay shape calls for them.
- **Voice register:** TBD per spec — likely Newsreader serif sober/declarative on the index, with essay-body register coming from the upstream canonical essay (already voice-tuned by Sean).

### Surface 2 — Site chrome

- **Spec:** `docs/specs/site-chrome-spec-v1.md`
- **Four small surfaces, can batch:**
  - **Nav** — label strings + active-state behavior + which routes are in the nav (home / work / transactions / architecture / essays / about / contact / fleet?)
  - **Footer** — universal footer copy, RSS affordances, links to /work + /transactions + /architecture + /essays + fleet observability dashboard, social links, copyright/colophon
  - **/contact/** — page copy + CTA + form/email affordance. Wire-service register per the rest of the portfolio.
  - **404 page** — copy + voice + return-to-home affordance. Sedaris-coded one-liner opportunity if the spec allows.
- **Voice constraint:** these are small strings, but they appear on EVERY page. Calibrate carefully — a too-cute 404 message gets stale fast.

### Surface 3 — Home About teaser deck (10 card captions)

- **Spec:** `docs/specs/home-about-teaser-spec-v1.md`
- **Already-locked editorial line:** `"A man, a pencil, an agent fleet. Same person, different tools."` (per CLAUDE.md)
- **10 cards locked at `reference-images/teaser-deck/`** — 1 photograph + Sean's pencil-test character + 8 AI-style variations (per CLAUDE.md). Deck thesis is "cartoons-that-formed-my-taste" — variations represent stylistic ancestry of Sean's visual taste.
- **What to write:** caption per card. Likely 1-line wire-service-mono (matches the editorial line's three-beat structure) OR 1-line Newsreader serif. Spec will dictate.

## Working approach (calibrated from prior sessions)

1. **Audit-first, then propose.** Per CRITICAL FIRST STEP. Always ground against the actual source-of-truth file before tweaking prior council prose or writing new prose.
2. **Multi-perspective generation for any prose rewrite:** draft 4-6 options tagged by voice mode (Sedaris / Thompson / Kerouac / Vonnegut / Sean Mode / hybrid). Sean picks + calibrates.
3. **One surface at a time** — lock one before moving to the next. Within a surface, phase the work (chrome before per-row content, like the transactions lock).
4. **Be brief and direct.** Don't over-explain. Sean wants the why and the how, not a thesis. No "ready to start?" or "want me to proceed?" — just dive in.
5. **No MDX edits committed from this session.** Sean is on MBP, applies on Mac Mini. Write all locked content into markdown lock docs at `docs/writing-council/{topic}-locked-YYYY-MM-DD.md`. Match the format of the seven prior lock docs.
6. **Update existing lock docs in place when amending prior decisions** (use Edit, not Write — preserve history). Add a `## YYYY-MM-DD amendment` section if the amendment is substantive. Multiple amendments on the same day disambiguate via descriptive titles ("Tier 1 mechanical + Tier 2 anchor metrics", "A-4 ¶2 Simon swap", etc.).
7. **Resume-evidence anchoring is required for any prose about The Block.** The three resume files are the source of truth.
8. **Architecture-doc anchoring is required for any prose about anima (A-1 animation pipeline).** PHILOSOPHY.md is the soul; the two brainstorm docs are the architecture.
9. **For new surfaces, ground against the upstream canonical content** (e.g., the manifesto essay for essays). Don't invent thesis claims that aren't in the source.

## Voice calibration constraints (carry-forward — NON-NEGOTIABLE)

Accumulate across all six prior lock docs. Read each lock doc's "Carry-forward constraints" section in full before writing; quick reference here:

### From the case-study openers lock (2026-05-26) + its second amendment

1. **Code Brain — no fixed counts of skills, agents, or hooks anywhere.** Applies to all surfaces. Use language that leans into the fluctuation or omits the count entirely.
2. **iPad callback ceiling reached.** Used in About B-1 beats 3 + 6 + A-1 opener ¶1. Three is the cap; do not let the iPad surface in any further surface prose.
3. **"Comprehension is the artifact" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1 + A-2 opener ¶3. Three is the cap.
4. **"Building got cheap" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1. Two is the cap.
5. **HybridRouter STOP-DOING.** Methods strip rows only, never in opener prose, never in 4Q, never in tagline, never in valueProp prose, never in lead prose.
6. **No traces of desperation.** Page reads identically hired vs hunting.
7. **No tenure-foregrounding on public surfaces** (added 2026-05-27).
8. **Code Brain real start date = 2026-02-06.** Anchor metric, frontmatter, prose must reflect this.

### From the taglines lock (2026-05-26)

9. **"fleet" usage frequency — ceiling at 2 for tagline-level.** Used in Home About teaser + A-1 tagline. Methods strips + opener prose + 4Q prose + valueProp prose + anchor metrics can still use "fleet" freely (the ceiling is tagline-level only).
10. **Tagline word-count range: 6–12 words.**
11. **Structural-family discipline.** Avoid the "Same X, same Y, same Z" rule-of-three family at the tagline level (ceiling reached at About B-1 beat 6 + A-5 opener ¶2).

### From the four_q lock (2026-05-27) + its second amendment

12. **Resume-evidence anchoring for ARCHIVED case studies.** The Block work specifically.
13. **Agentic-engineering thread as load-bearing framing for The Block.** The 3 Claude Skills (etf-page-creator, stakeholder-update, jira-automation), the RevOps automation pipeline, the AI-assisted Campus 201 media generation, the x402/A2A/MCP strategy memo — these are the receipts. Foreground them.
14. **A-1 architecture-doc anchoring.** Anima prose must reflect the v2 architecture lock: 10-phase pipeline, 7 named personas (Maya/Cy/Sam/Bea/Flo/Em/Mo), 3-tier critic stack, Phase 5 model routing (NB Pro / NB2 / GPT-Image-2 / Seedream / Qwen-IE / FLUX+LoRA), draft→pro escalation.

### From the transactions lock (2026-05-27)

15. **Wire-service register throughout on the ledger surface.** No Sedaris opener; the subhead is the only Newsreader/personal-warm slot.
16. **Value-prop pull-quote shape rules** (6 rules — see transactions lock §1.5). Apply to any tweet-length artifact summary across the portfolio.

### From the architecture lock (2026-05-27)

17. **Architecture is the most austere voice register on the site.** No Sedaris, no comedic juxtaposition. The mono HONEST NOTE callouts inside Newsreader essay prose are the load-bearing visual signal.
18. **Honesty calibration is the load-bearing credibility signal on the architecture surface.** Don't soften the HONEST NOTE language.
19. **Flat presentation IS the credibility on scoreboards.** All rows visually identical, no row highlights.
20. **Voice-review gate applies to every architecture writeup before public posting.**

### General voice rules (from all sessions)

- Quick and silly, NOT heavy self-deprecation.
- Wire-service-style format, sentence-case prose.
- Compound nouns / hyphens for parallel comparisons.
- Specific nouns over abstract claims. Always anchor.
- Kill the "I realized that…" / "I used to think…" / "I noticed…" signposts.
- Page-level callback rhymes are gold — but watch the ceilings above.
- Watch council-default reflexes ("cold coffee," "5 a.m.," timestamps).
- Signature moves catalogued in the voice-modes skill — Hard Cut, Rule of Three + Pivot, Callback Closer, Sensory Before Numbers, Reader-Dismissal, etc.

## Biographical anchors (so you don't have to ask)

- Born November 28, 1992 → age 33 in 2026
- Boston (Charlestown, MA) with girlfriend Mary McKee
- ~10 years multimedia freelancer in NYC (illustration, animation, film)
- November 10, 2025 – May 4, 2026: Product Manager at The Block. Laid off 2026-05-04 (cost-cutting, not performance). Larry Cermak is primary reference. **Tenure stays out of public prose per constraint #7** — only appears in frontmatter date fields.
- Currently in 8-week job hunt (through ~2026-07-04). Target: AI PM > Tech PM > Creative PM. Boston metro or remote. No mentions of the hunt itself on the public page.
- Tools: Anti-Gravity IDE, Claude Code, Ollama, Procreate on iPad
- Three machines: Mac Mini (primary), MacBook Pro (travel/couch), Alienware RTX 5080 (CUDA)
- Animation pipeline (anima) — first proof-piece deadline June 11, 2026. Stack: Gemini Nano Banana 2 (keyframe stills) + Seedance 2.0 (motion interpolation). NOT Seedream.
- Code Brain real start = **February 6, 2026** (not 2024).
- 16BitFit paused 2026-04-20.

## Locked content reference (do not recreate)

### Taglines

| Surface | Tagline |
|---|---|
| Home hero | `Product Manager. The agents handle the loops. I handle the taste.` |
| About header | `Raised by Saturday morning cartoons and Vercel deployment logs.` |
| Home About teaser editorial line | `A man, a pencil, an agent fleet. Same person, different tools.` |
| A-1 animation-pipeline | `A pencil-test pipeline with a fleet of in-betweeners.` |
| A-2 code-brain | `A second brain that grew a third one for itself.` |
| A-3 intent-engineering-mcp | `Drawing up agents to act with intent.` |
| A-4 the-block | `B2B PM work where the agreement is the UX.` |
| A-5 16bitfit | `Paused the game. Shipped the pipeline.` |

### Anchor metrics (locked in 2026-05-27 second amendment)

| Surface | Metric |
|---|---|
| A-1 animation-pipeline | `ACT 1 SHIPPED · ACT 2 IN FLIGHT` |
| A-2 code-brain | `OVERNIGHT FLEET · LAUNCHD-NATIVE` |
| A-3 intent-engineering-mcp | `0.1.0 · NPM + MCP REGISTRY · 2026-05-12` |
| A-4 the-block | `B2B PM · INSTITUTIONAL CRYPTO RESEARCH` |
| A-5 16bitfit | `PIPELINE 47% · GAME ON SHELF` (on-disk, not locked in second amendment — verify if this is still the right shape) |

### Page chrome (transactions surface)

| Element | Locked content |
|---|---|
| Index subhead | `Every shipped artifact, dated and explained.` |
| Limitations heading | `WHAT THIS DOESN'T YET DO` |
| Footer fold | `→ subscribe via RSS` + `→ view the fleet ↗` |
| Dateline templates | 4 scenarios per `transactions-prose-locked-2026-05-27.md` §1.2 |

### Page chrome (architecture surface)

| Element | Locked content |
|---|---|
| Index italic hook | `Most people see Obsidian as content. I treat my vault as agent infrastructure.` |
| Index sober subhead | `Architectural arguments where the proof is the code, linked.` |
| Footer fold | `→ subscribe via RSS` + `→ view the fleet ↗` (same as transactions) |
| Deep-dive dateline template | `BOSTON, <date> — <title lowercased>, <past-tense verb>.` with 3-verb defaults |

### Case-study openers, four_q blocks, About B-1/B-2/B-4

All locked in the prior lock docs. Read them; don't recreate.

### Transactions ledger rows

5 rows locked in `transactions-prose-locked-2026-05-27.md`: phase-d-typed-edges, knowledge-loop-phase-6, intent-engineering-mcp, vault-synthesizer-eval-suite, substack-drafter. **Plus a 6th row needed** (vault-scorecard) for the architecture cross-link — Sean to author using the same shape rules.

### Architecture writeups

1 writeup locked: Vault Scorecard (`architecture-prose-locked-2026-05-27.md`). Voice-review-before-apply gate blocks Mac Mini apply.

## Source-of-truth files (collected here for quick scan)

### Portfolio context

- `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/writing-voice-modes/SKILL.md`
- `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md`

### Portfolio specs

- `docs/specs/BLUEPRINT-COMPLETE.md` (entry point)
- `docs/specs/PORTFOLIO-MASTER-PLAN.md` (strategic anchor)
- `docs/specs/hero-spec-v1.md`
- `docs/specs/projects-section-spec-v1.md`
- `docs/specs/case-study-spec-v1.md`
- `docs/specs/home-about-teaser-spec-v1.md` ← **THIS SESSION**
- `docs/specs/about-spec-v1.md`
- `docs/specs/transactions-spec-v1.md` (locked + this-session amendments queued)
- `docs/specs/architecture-spec-v1.md` (locked + this-session amendments queued)
- `docs/specs/essays-spec-v1.md` ← **THIS SESSION**
- `docs/specs/site-chrome-spec-v1.md` ← **THIS SESSION**
- `docs/specs/texture-and-artifacts-spec-v1.md`

### Source-of-truth for surfaces in this session

- **Essays / meaning-over-access manifesto:**
  - `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS.md` (13.4KB essay — canonical)
  - `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS_EXPLANATION.md` (6.5KB 4Q)
  - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/substack-drafts/2026-06-19-meaning-over-access-substack-cross.md` (Substack draft)
  - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-20-task-13-step-1-manifesto-outline.md` (manifesto outline)
  - `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-21-task-13-step-2-council-draft.md` (council critique pass)
- **Home About teaser deck:**
  - `reference-images/teaser-deck/` — 10 locked card images
  - `reference-images/teaser-deck-trials/` — in-progress prompts for context
- **Site chrome:** no external source-of-truth; pure editorial

### Anima / A-1 (for any architecture or animation-pipeline cross-references)

- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md`

### Code Brain / A-2 (for any cross-references)

- `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/code-brain/CHANGELOG.md` (note: v1.0.0 entry dated "2024-01-XX" is a mistake; v2.0.0 entry's year is wrong; real first date = 2026-02-06)
- `/Users/seanwinslow/Code-Brain/agent-fleet-observability/PRODUCT.md`

### Resume / A-4 (mandatory for any The Block prose)

- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md`

### MCP intent engineering / A-3

- `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/README.md`
- `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering/CHANGELOG.md`

### 16BitFit / A-5 (deprecated path)

- `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/README.md`
- `/Users/seanwinslow/.gemini/antigravity/scratch/16BitFit-V3/CLAUDE.md`

### Prior lock docs (read all six before writing)

- `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
- `docs/writing-council/case-study-openers-locked-2026-05-26.md` (with 2 amendments)
- `docs/writing-council/project-taglines-locked-2026-05-26.md`
- `docs/writing-council/project-four-q-locked-2026-05-27.md` (with 1 amendment)
- `docs/writing-council/transactions-prose-locked-2026-05-27.md`
- `docs/writing-council/architecture-prose-locked-2026-05-27.md`

## Where to start

After running the CRITICAL FIRST STEP (audit-first ask), let me confirm priority order. The default sequence I'd suggest:

1. **Essays first** (1-2 sittings) — the manifesto is voice-final upstream, so the per-essay frontmatter brainstorm is mostly mechanical. Highest strategic value (the manifesto is the "long-form thesis" recruiter signal — it explains the comprehension-over-access thesis that the rest of the portfolio is evidence for).
2. **Home About teaser deck captions next** (1 sitting) — contained scope (10 captions), images locked, editorial line locked. Quick win.
3. **Site chrome last** (1-2 sittings) — small strings but they appear on every page; calibrate carefully.

But the audit-first step may surface higher-priority items I don't know about yet. Let me know what you want to tackle first after you read in and audit.

---

## END KICKOFF PROMPT
