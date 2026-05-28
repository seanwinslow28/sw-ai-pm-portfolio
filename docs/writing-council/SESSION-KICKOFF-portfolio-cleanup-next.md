# Portfolio writing /pm-product-discovery:brainstorm-ideas-existing — continuation session

I'm Sean Winslow. We're continuing the multi-session brainstorm refining my portfolio's writing surfaces. Four prior sessions have locked content; this session continues with the remaining open items, plus a hallucination audit on what's already locked.

**Session lineage so far:**
- **2026-05-25 (MBP):** About B-1/B-2/B-4 prose locked. Recruiter italic call-out removed. Lock doc: `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
- **2026-05-26 (MBP):** All 5 case-study openers locked (A-1, A-2, A-3, A-4, A-5). Lock doc: `docs/writing-council/case-study-openers-locked-2026-05-26.md`
- **2026-05-26 (MBP):** 4 project taglines locked (A-1, A-2, A-4, A-5; A-3 was already locked in `CLAUDE.md`). Lock doc: `docs/writing-council/project-taglines-locked-2026-05-26.md`
- **2026-05-27 (MBP):** 3 case-study `four_q` blocks rewritten (A-1, A-2, A-4); A-5 audited clean. A-4 opener ¶1 + ¶3 amended (surface inventory swap + tenure deletion). About B-2 ¶1 tenure-word swap. New carry-forward constraint added: no tenure-foregrounding on public surfaces. Lock doc: `docs/writing-council/project-four-q-locked-2026-05-27.md`

---

## CRITICAL FIRST STEP — audit before you edit

Before writing or proposing ANY changes this session, ask me directly:

> *"Is there specific context I should ground against before starting? Resume files, architecture docs, decision memos, anything I should check before assuming the prior council writings are factually correct?"*

**Why this matters:** The prior council passes hallucinated. The A-4 (The Block) opener originally listed surfaces that don't appear in my resume (Data API, Simon AI feature, AdOps). The A-4 four_q originally described a 2024–2026 three-tier-structure narrative that didn't happen. We caught those in the 2026-05-27 session by grounding against my actual resume — but I want every remaining locked piece audited the same way before you propose tweaks.

**Do not assume prior locked text is factually correct.** Audit, then propose. If you find anything in the prior locks that looks fabricated, stale, or anchored to a wrong premise, flag it before proposing edits.

The most likely places fabrication has snuck in: investigation board artifacts (dates + metrics throughout each case study), Methods strip rows (stack-truth drift between Seedance / NB2 / Seedream), anchor metrics (count-fragile or factually wrong), `date_started:` / `date_active_through:` frontmatter (A-4 in particular has wrong dates), `four_q:` content on surfaces we haven't touched yet.

---

## Read these files first (in order)

1. **My personal context** — `/Users/seanwinslow/Code-Brain/code-brain/vault/Sean-Winslow-Full-Personal-Context-v2.0.md` (biography, voice, communication baseline, current state)
2. **Portfolio CLAUDE.md** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md` (project rules, template-trap warnings, three load-bearing things, locked decisions quick-reference at §"Locked decisions")
3. **Voice modes skill** — `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/writing-voice-modes/SKILL.md` + `references/voice-samples.md` + `references/calibration-notes.md`
4. **All four prior lock docs in chronological order** — read each in full:
   1. `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md`
   2. `docs/writing-council/case-study-openers-locked-2026-05-26.md` (note especially the §"Carry-forward constraints" — 7 constraints — and the §"2026-05-27 amendment" near the top)
   3. `docs/writing-council/project-taglines-locked-2026-05-26.md`
   4. `docs/writing-council/project-four-q-locked-2026-05-27.md` (most recent, most important — read carry-forward constraints section in full)
5. **Case-study spec** — `docs/specs/case-study-spec-v1.md` (§4 voice register, §9 4Q rendering, §13 per-case-study angle hints — note many §13 sub-items have spec amendments flagged in the lock docs but not yet applied)
6. **Projects-section spec** — `docs/specs/projects-section-spec-v1.md` (tile shape, where taglines + anchor metrics render)
7. **Resume source-of-truth files** (mandatory for any A-4 / Block work):
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md`
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md`
   - `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md`
8. **anima architecture docs** (mandatory for any A-1 / animation-pipeline work):
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md`
   - `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md`
9. **The 5 MDX files** — `src/content/work/{animation-pipeline,code-brain,intent-engineering-mcp,the-block,16bitfit}.mdx` (read the full files; you'll be editing frontmatter + MDX body across most of them)
10. **About MDX** — `src/content/about/index.mdx`

Optionally invoke `/pm-product-discovery:brainstorm-ideas-existing` if you want the multi-perspective ideation framework loaded.

---

## What we're writing this session

Five workstreams remain open. Confirm priority order with me before starting — the audit-first step may surface things that change the ordering.

### Workstream A — Surgical fixes (small, high-value)

These are small textual swaps flagged in prior lock docs as deferred-not-done.

| # | Surface | What needs to change | Source flag |
|---|---|---|---|
| A1 | A-4 opener ¶2 | "the Simon feature ships faster when you've already drafted the line that justifies it" — Simon AI feature is no longer in the ¶1 surface inventory (swapped 2026-05-27). Surgical swap to a ¶1-listed surface example (Polymarket microcourse PRD, .co homepage redesign brief, RevOps automation, ETF launch page) | `project-four-q-locked-2026-05-27.md` §A-4 "Flag" |
| A2 | A-1 `anchor_metric:` | Currently `220 FRAMES`. Count-fragile (frames grow weekly until June 11 ship). Replace with rhythm-based, status-based, or date-based metric | `case-study-openers-locked-2026-05-26.md` §A-2 spec implications references the same count-fragility pattern |
| A3 | A-2 `anchor_metric:` | Currently `16 SKILLS · 14 HOOKS · 8 AGENTS`. Violates Carry-forward constraint #1 (no fixed counts on Code Brain). Three candidates flagged: `OVERNIGHT FLEET · LAUNCHD-NATIVE` / `3 MACHINES · 1 VAULT · A LIVE FLEET` / `LIVE SINCE 2024` (need real start date if going with date version) | `case-study-openers-locked-2026-05-26.md` §"A-2 code-brain anchor metric" |
| A4 | A-4 `anchor_metric:` | Currently `"2024 – 2026 · TWO PRODUCTS · ONE FIRM"`. Wrong tenure, wrong scope, foregrounds dates on a public surface (violates new constraint #7). Full replacement | `case-study-openers-locked-2026-05-26.md` §A-4 spec implications |
| A5 | A-5 Methods strip | `Seedance 2.0 + pixel-art Gemini skill` → `Gemini Nano Banana 2 (pixel-art Gemini skill)`. Same stack-truth correction as A-1. Cost on same row also likely needs update | `case-study-openers-locked-2026-05-26.md` §"A-5 spec implications — Methods strip stack drift" |
| A6 | A-1 spec amendments | `case-study-spec-v1.md` §13.1 opener angle hint, §13.1 Methods strip line, §8.1 sample Methods table, Appendix B sample frontmatter — all currently reference Seedream 2.0 where they should reference Gemini Nano Banana 2 + Seedance 2.0 | `case-study-openers-locked-2026-05-26.md` §"A-1 animation-pipeline stack errors" |

### Workstream B — A-4 broader cleanup (heaviest lift)

`src/content/work/the-block.mdx` has frontmatter + investigation board fields anchored to the wrong premise. The opener and 4Q are locked correctly; the frontmatter + investigation board are still pencil-test-era fabrications.

| Field | Current state | Needs to become |
|---|---|---|
| `date_started:` (line 15) | `2024-02-01` (wrong) | Actual start date in November 2025 |
| `date_active_through:` (line 16) | `2026-02-01` (wrong) | `2026-05-04` (or actual layoff date) |
| `methods:` array (lines 24–36) | Campus + RevOps + data partnerships only | Broaden to match multi-surface scope per the new 4Q. Per case-study-spec §8.1: "4–7 rows typical." Choose 4–6 most credible: Campus / ETF launch pages / Polymarket × Campus / RevOps automation / Claude Skills library / bi-weekly P&E stakeholder update / x402 strategy memo |
| Investigation board artifacts (lines 57–95) | Fabricated dates + metrics (Campus v1 launch "2024," tier structure "2025 Q1," subscriber chart 18→134 across "2024 Q2"–"2025 Q4") | Full rework. Forward-chronological calendar of actual 6-month tenure with sanitizable artifacts. No fabricated subscriber growth charts. Source material lives in `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/` |

### Workstream C — Investigation board hallucination audit across ALL case studies

Each case study's investigation board (lines 60+ in each MDX) renders artifact prose with dates + metrics. The A-1 investigation board references render times v1→v2a (22s, 18s, 11s, 4s) which may or may not be real; A-2 references "synth-manifest JSON from a recent nightly run (May 16)" which may or may not be the actual date; A-3 references "npm registry page screenshot (May 12)" which IS real (ship date is May 12 per the locked opener); A-5 references "frames generated by the pipeline over time (Mar–May)" which needs verification.

Audit each investigation board against actual project history. Flag anything fabricated. Propose corrections grounded in real data (or remove the artifact if no real data exists).

### Workstream D — Other portfolio surfaces not yet written

Per `CLAUDE.md` §"Current status" and the spec map, these surfaces have locked **structural specs** but not yet locked **prose**:

- **Transactions ledger** (`/transactions/`) — spec at `docs/specs/transactions-spec-v1.md`. Daily-dated ledger of shipped work.
- **Architecture page** (`/architecture/`) — spec at `docs/specs/architecture-spec-v1.md`. The diagram + explanation of the agent fleet + portfolio infrastructure.
- **Essays index + per-essay pages** — spec at `docs/specs/essays-spec-v1.md`. The writing surface for longer-form pieces (e.g., "meaning-over-access" is referenced in the OG-cards as an existing essay).
- **Site chrome** — nav, footer, `/contact/`, 404 page. Spec at `docs/specs/site-chrome-spec-v1.md`. Each surface has copy that needs voice calibration.
- **Home About teaser deck** — 10 card captions (already-locked teaser-deck content has card images at `reference-images/teaser-deck/`; the captions are spec'd in `home-about-teaser-spec-v1.md` and may or may not be written yet)

Sean will decide whether to tackle any of these this session or defer to a future one.

### Workstream E — Spec implications follow-up

Several `docs/specs/case-study-spec-v1.md` sections have amendments flagged in the lock docs but not yet applied to the spec itself. Apply when relevant to the surfaces being rewritten:
- §13.1 (A-1 stack truth)
- §13.2 (A-2 anchor metric)
- §13.4 (A-4 full scope/dates/tenure)
- §13.4 sample preamble (Frame-the-work-not-the-exit, if still wanted)
- §13.5 (A-5 Methods strip stack drift)

---

## Working approach (calibrated from prior sessions)

1. **Audit-first, then propose.** Per the CRITICAL FIRST STEP above. Always ground against the actual source-of-truth file before tweaking prior council prose.
2. **Multi-perspective generation** for any prose rewrite: draft 4–6 options tagged by voice mode (Sedaris / Thompson / Kerouac / Vonnegut / Sean Mode / hybrid). Sean picks + calibrates.
3. **One surface at a time** — lock one before moving to the next.
4. **Be brief and direct.** Don't over-explain. Sean wants the why and the how, not a thesis. No "ready to start?" or "want me to proceed?" — just dive in.
5. **No MDX edits committed from this session** if Sean is not on the Mac Mini. Write all locked content into a single markdown lock doc at `docs/writing-council/{topic}-locked-YYYY-MM-DD.md`. Match the format of the four prior lock docs.
6. **Update existing lock docs in place** when amending prior decisions (use `Edit`, not `Write` — preserve history). Add an §"YYYY-MM-DD amendment" section if the amendment is substantive.
7. **Resume-evidence anchoring** is required for any prose about The Block. The three resume files listed above are the source of truth. If a claim in the prose can't be grounded there, flag it before writing.
8. **Architecture-doc anchoring** is required for any prose about anima (A-1 animation pipeline). PHILOSOPHY.md is the soul; the two brainstorm docs are the architecture.

---

## Voice calibration constraints (carry-forward — NON-NEGOTIABLE)

These accumulate across all four prior lock docs. Read each lock doc's §"Carry-forward constraints" in full before writing; quick reference here:

### From the case-study openers lock (2026-05-26)
1. **Code Brain — no fixed counts** of skills, agents, or hooks anywhere. Use language that leans into the fluctuation ("a fleet that grows and shrinks with the work" / "a roster that never sits still") or omit the count entirely.
2. **iPad callback ceiling reached.** Used in About B-1 beats 3 + 6 + A-1 opener ¶1. Three is the cap; do not let the iPad surface in any further surface prose.
3. **"Comprehension is the artifact" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1 (as "Comprehension didn't") + A-2 opener ¶3. Three is the cap; do not let it surface anywhere else.
4. **"Building got cheap" ceiling reached.** Used in About B-2 ¶2 + B-4 ¶1. Two is the cap.
5. **HybridRouter STOP-DOING.** Lives in Methods strip rows only, never in opener prose, never in 4Q, never in tagline.
6. **No traces of desperation.** Page reads identically hired vs hunting. Zero "looking for work / please hire me / in the room" cadence.
7. **No tenure-foregrounding on public surfaces** *(new 2026-05-27)*. Date data lives in frontmatter fields; user-facing prose stays focused on the work. Applies to all surfaces — case-study openers, 4Q blocks, About prose, taglines, anchor metrics.

### From the taglines lock (2026-05-26)
8. **"fleet" usage frequency — ceiling at 2 for tagline-level**. Used in Home About teaser + A-1 tagline. A-2/A-4/A-5/About taglines cannot use "fleet"; A-1 grandfathered because animation-native. Methods strips + opener prose + 4Q prose can still use "fleet" freely.
9. **Tagline word-count range: 6–12 words.**
10. **Structural-family discipline.** Four locked tagline families now: parallel-clause Hard Cut (hero + A-1 + A-5), Sedaris compound-noun pair (A-2), opener-callback reframe (A-4), sports/screenwriter metaphor (A-3). Avoid the "Same X, same Y, same Z" rule-of-three family (ceiling reached at About B-1 beat 6 + A-5 opener ¶2).

### From the four_q lock (2026-05-27)
11. **Resume-evidence anchoring for ARCHIVED case studies**. The Block work specifically: prose must be groundable in `Sean_Winslow_Resume_AI_PM.md` or `the-block-resume-additions-2026.md`. No fabricated surfaces, tier structures, or metric arcs.
12. **Agentic-engineering thread as load-bearing framing** for The Block. The 3 Claude Skills (`etf-page-creator`, `stakeholder-update`, `jira-automation`) shipped against P&E Q2 OKR, the RevOps automation pipeline, the AI-assisted Campus 201 media generation, the x402 / A2A / MCP strategy memo — these are the receipts. Foreground them.
13. **A-1 architecture-doc anchoring**. Anima prose must reflect the v2 architecture lock: 10-phase pipeline, 7 named personas (Maya/Cy/Sam/Bea/Flo/Em/Mo), 3-tier critic stack (T1 rule gates / T2 vision critic Em / T3 council Codie+Annie+Sage+Opus chairman), Phase 5 model routing (NB Pro / NB2 / GPT-Image-2 / Seedream / Qwen-IE / FLUX+LoRA), draft→pro escalation. The model layer is replaceable; the architecture and human role are not.

### General voice rules (from all sessions)
- **Quick and silly, NOT heavy self-deprecation.** Forward-tilted, not retrospective-confessional.
- **Wire-service-style format, sentence-case prose.**
- **Compound nouns / hyphens for parallel comparisons.** Fuse compared options into symmetric units.
- **Specific nouns over abstract claims.** Always anchor.
- **Kill the "I realized that…" / "I used to think…" / "I noticed…" signposts.** Pivots happen by collision.
- **Page-level callback rhymes are gold** — but watch the ceilings above.
- **Watch council-default reflexes.** When multiple drafts reach for the same anchor unprompted (e.g., "cold coffee," "5 a.m.," timestamps that smell like grinding), it's the safe call, not the strongest call. Push past it.

Signature moves available (used elsewhere; can echo their *family* without literal repeat):
- **"The decision wasn't X, it was Y"** (A-1, A-2, A-4 4Q `why` family — third use; further uses of this exact family should be deliberate, not default)
- **"X becomes Y" cadence** from PHILOSOPHY.md (A-1 4Q `what`; available for future anima-adjacent writing)
- **Hard Cut compound-noun pair** (hero, A-1 tagline, A-5 tagline)
- **Screenwriter→PM bridge** (A-3 opener ¶2 — single use; available)
- **"Build it, ship it, write it down"** (A-4 opener ¶2 — Vonnegut affirmative; available for future use)
- **Reader-dismissal signature** (A-4 opener ¶3 "The firm restructured around me; the products didn't" — single use; available)
- **Rule-of-three with fourth-item pivot** (A-5 opener ¶1 — single use; available)

---

## Biographical anchors (so you don't have to ask)

- Born November 28, 1992 → age 33 in 2026
- Boston (Charlestown, MA) with girlfriend Mary McKee
- ~10 years multimedia freelancer in NYC (illustration, animation, film)
- November 2025 – May 2026: **Product Manager** at The Block (resume title — not "Associate PM Technical"). Laid off 2026-05-04 (cost-cutting, not performance). The Block is an institutional crypto data and research firm. **Tenure stays out of public prose per constraint #7** — only appears in frontmatter date fields.
- Currently in 8-week job hunt (through ~2026-07-04). Target: AI PM > Tech PM > Creative PM. Boston metro or remote. **No mentions of the hunt itself on the public page** — page reads identically hired vs hunting.
- Tools: Anti-Gravity IDE, Claude Code (power user), Ollama (local Qwen3/gemma4), Procreate on iPad
- Three machines: Mac Mini (primary), MacBook Pro (travel/couch), Alienware RTX 5080 (CUDA)
- Animation pipeline (**anima**) — first proof-piece deadline June 11, 2026. Stack: Gemini Nano Banana 2 (keyframe stills) + Seedance 2.0 (motion interpolation). **NOT Seedream** — that was a council miss we corrected.
- Pocket PM was the project that landed the Block role (retired)
- Larry Cermak is primary reference (personal-network fact, NOT a page fact — no contactable references named in public prose)

---

## Locked content reference (do not recreate)

### Taglines

| Surface | Tagline | Locked where |
|---|---|---|
| Home hero | `Product Manager. The agents handle the loops. I handle the taste.` | `CLAUDE.md` |
| About header | `Raised by Saturday morning cartoons and Vercel deployment logs.` | `CLAUDE.md` |
| Home About teaser editorial | `A man, a pencil, an agent fleet. Same person, different tools.` | `CLAUDE.md` |
| A-1 animation-pipeline | `A pencil-test pipeline with a fleet of in-betweeners.` | `project-taglines-locked-2026-05-26.md` |
| A-2 code-brain | `A second brain that grew a third one for itself.` | `project-taglines-locked-2026-05-26.md` |
| A-3 intent-engineering-mcp | `Drawing up agents to act with intent.` | `CLAUDE.md` |
| A-4 the-block | `B2B PM work where the agreement is the UX.` | `project-taglines-locked-2026-05-26.md` |
| A-5 16bitfit | `Paused the game. Shipped the pipeline.` | `project-taglines-locked-2026-05-26.md` |

### Case-study opener prose
All five locked in `case-study-openers-locked-2026-05-26.md` (A-4 amended 2026-05-27). Don't rewrite; only the flagged A-4 ¶2 surgical swap (Workstream A item A1) is in play this session.

### four_q blocks
A-1, A-2, A-4 locked 2026-05-27 (`project-four-q-locked-2026-05-27.md`). A-5 audited clean and unchanged. A-3 reads from `EXPLANATION.md` in the intent-engineering-mcp repo per spec §13.3 — out of scope for portfolio frontmatter.

### About B-1 / B-2 / B-4
Locked 2026-05-25 (`about-b1-b2-b4-locked-2026-05-25.md`). B-2 ¶1 amended 2026-05-27 (tenure word swap). Don't rewrite further unless audit-first surfaces a fabrication.

---

## Source-of-truth files (referenced earlier — collected here for quick scan)

**The Block / A-4:**
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/Sean_Winslow_Resume_AI_PM.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/the-block-resume-additions-2026.md`
- `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/_CONVERSION-LOG-2026-05-09.md`

**Anima / A-1:**
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/PHILOSOPHY.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-24-pipeline-v2-brainstorm.md`
- `/Users/seanwinslow/Code-Brain/sw-portfolio-animation-pipeline/docs/2026-05-26-agent-fleet-brainstorm-v2.md`

**Code Brain / A-2:**
- `/Users/seanwinslow/Code-Brain/code-brain/CLAUDE.md`
- `/Users/seanwinslow/Code-Brain/code-brain/agents-sdk/` (autonomous layer scripts)

**Portfolio specs:**
- `docs/specs/BLUEPRINT-COMPLETE.md` (entry point)
- `docs/specs/PORTFOLIO-MASTER-PLAN.md` (strategic anchor)
- `docs/specs/case-study-spec-v1.md`
- `docs/specs/projects-section-spec-v1.md`
- `docs/specs/home-about-teaser-spec-v1.md`
- `docs/specs/about-spec-v1.md`
- `docs/specs/transactions-spec-v1.md`
- `docs/specs/architecture-spec-v1.md`
- `docs/specs/essays-spec-v1.md`
- `docs/specs/site-chrome-spec-v1.md`

---

## Where to start

After running the CRITICAL FIRST STEP (audit-first ask), let me confirm priority order. The default sequence I'd suggest:

1. **Workstream A surgical fixes** first (1-2 sittings) — these are small textual swaps with high recruiter-cold-scan ROI. Order:
   1. A-4 opener ¶2 surgical swap (Simon-feature flag)
   2. A-2 anchor metric (no fixed counts)
   3. A-1 anchor metric (count-fragile)
   4. A-4 anchor metric (wrong scope + tenure-foregrounding)
   5. A-5 Methods strip stack drift
   6. A-1 spec amendments (apply to `case-study-spec-v1.md`)
2. **Workstream C investigation board hallucination audit** next (1 sitting) — short, audit-only, surfaces what needs rework
3. **Workstream B A-4 broader cleanup** after the investigation audit gives us scope
4. **Workstream D other surfaces** — Sean's call when to tackle these
5. **Workstream E spec amendments** — apply alongside the surfaces they affect, in the same commit

But the audit-first step may surface higher-priority items I don't know about yet. Let me know what you want to tackle first after you read in and audit.

---

*Authored 2026-05-27 by Claude (Sonnet 4.6) at the end of the four_q lock session, as a self-contained kickoff for the next Cowork session. Format mirrors prior session-kickoff docs. Sean retains voice authority on every recommendation above.*
