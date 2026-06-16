# Portfolio Critique Execution — Design Spec

**Date:** 2026-06-16
**Status:** Approved (Sean, 2026-06-16) — ready for plan generation
**Origin:** Honest hiring-manager critique from a PM-lead friend, reviewing the live site as if Sean were a candidate. Notes file: `PM-Portfolio-Notes-From-Friend-2026-06-16.md`.
**Scope:** Three independent workstreams. Sean runs the copy workstream in Claude Code rooted in `code-brain`, and the redesign/home workstreams in Claude Code rooted in `sw-ai-pm-portfolio`, simultaneously.

---

## 1. The Problem (in the friend's words)

A recruiter scanning the site gets hooked by the home page, clicks a project, and immediately hits a wall: a cluster of small, cryptic labels (`ROLE — PM + BUILDER + OPERATOR`, `IN FLIGHT 03-2026 → 06-2026`, `A-1 · ACTIVE`, `◐ ACT 1 SHIPPED · ACT 2 IN FLIGHT`, `animation · agentic · pipeline`) that mean nothing to an outsider. Then a long Opener. Then an "Investigation Board" of artifacts that read as sloppy and partly hallucinated. The reader is overwhelmed before they learn what the project *is*.

Three home-page affordances also failed: the "updated" dateline was missed (too small), the swipeable About teaser deck read as a rendering glitch (no visible affordance), and there's no nav to let a recruiter jump where they want.

**The thesis of the fix:** lead with what hooks (title + one-line subtitle + hero), then answer "What is this?" immediately, replace the wall of text and the messy board with one simple explainer graphic per project, and make the home page easier to navigate. Less reading, faster comprehension, nothing hallucinated.

---

## 2. Current State (verified in code 2026-06-16)

The build is live and further along than `CLAUDE.md` (dated 2026-05-21) claims. Relevant anatomy:

**Project page** — `src/pages/work/[slug].astro` renders this band order:
`DatelineStrip → TitleBlock → (status callout) → HeroMedia → MDX <Content> (Opener + InvestigationBoard + artifacts) → MethodsStrip → FourQBlock → CharacterCloseout → NextPrevNav`

- The cluttered header lines live entirely in `src/components/case-study/TitleBlock.astro` (`role-row`, `frame-row`, `tag-row`).
- `Opener.astro` and `InvestigationBoard.astro` are thin section wrappers; their content is authored in each project's MDX body (the artifacts `PRDDecision`, `SlackQuote`, `BoardArtifact`, `MetricChart` live inside the board).
- The `A-1.Q1`-style prefixes and the `─ 4Q ─` heading are hardcoded in `src/components/case-study/FourQBlock.astro`. The 4Q copy is `four_q:` frontmatter in each `src/content/work/*.mdx`.

**Home page** — `src/pages/index.astro` sets `noChrome={true}` (suppresses the existing sticky nav). Relevant pieces:
- `src/components/chrome/SiteNav.astro` — full sticky 5-tab nav, **already exists**, used on sub-pages.
- `src/components/teaser/SwipeMeIndicator.astro` — **already exists** ("SWIPE ME →"), but is desktop-only and hidden on touch (`@media (hover: none) { display: none }`) and sits below the deck. Likely why the affordance was missed.
- `src/components/projects/DatelineLabel.astro` — renders `WORK · {n} PIECES · UPDATED {date}` at 12px.
- `src/components/projects/PencilAnnotation.astro` `variant="updated-weekly"` — the curved-arrow "updated weekly" SVG, placed by `ProjectsSection.astro`.

**Five projects** (all have `four_q` + an MDX body ~50–60 lines):

| frame | title | slug | status | source repo for rewrite |
|---|---|---|---|---|
| A-1 | Anima | `animation-pipeline` | ACTIVE | `/Users/seanwinslow/Code-Brain/anima` |
| A-2 | Code Brain | `code-brain` | ACTIVE | `/Users/seanwinslow/Code-Brain/code-brain` |
| A-3 | Intent Engineering MCP | `intent-engineering-mcp` | SHIPPED | `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering` |
| A-4 | The Block — Campus + RevOps | `the-block` | ARCHIVED | see §5 (three vault files) |
| A-5 | 16BitFit | `16bitfit` | PAUSED | `/Users/seanwinslow/Code-Brain/16BitFit-V3/CLAUDE.md` |

---

## 3. Locked Design Decisions

| # | Decision | Choice |
|---|---|---|
| D1 | Project-page shape | **Approach B** — strip the top, and the explainer graphic becomes the new visual proof that replaces the Investigation Board. |
| D2 | Home nav | **Option A** — a new minimal corner nav on the home page only (wordmark + `work · about`), preserving the chrome-free feel. |
| D3 | Voice workflow | **Full chain**: `storytelling-architecture` → `writing-voice-modes` (Sean Mode, recruiter dial) → `writing-critique` → **LLM Council** → `writing-humanity-pass`. |
| D4 | Explainer graphics | **Separate, test-first phase.** Brainstorm concept → draft prompt → generate test renders → Sean approves → final → integrate. |
| D5 | Plan structure | **Three separate plans**, runnable simultaneously across two repos. |
| D6 | Status callouts | **Keep** `ShippedStamp`, `ReturnConditionCallout`, and the ARCHIVED `FrameTheWorkPreamble` — credible signals, not the clutter the friend named. |
| D7 | 4Q labels | **Drop the `Q1/Q2/Q3/Q4` labels entirely.** The question itself is the heading. |
| D8 | Copy-workstream location | Runs in Claude Code rooted in `code-brain` (where `storytelling-architecture`, `writing-critique`, `llm-council` live). The portfolio repo only carries `writing-voice-modes` + `writing-humanity-pass`. |

---

## 4. Workstream 1 — Project-page surgery + 4Q rewrites

Runs in **`sw-ai-pm-portfolio`** for the component/layout work; the 4Q copy is authored in **`code-brain`** (§5) and pasted into frontmatter. The two halves can proceed in parallel and meet at the `four_q:` frontmatter.

### 4.1 Component edits

**`TitleBlock.astro`** — remove three blocks and their styles:
- `role-row` (the `ROLE — …` pill + `IN FLIGHT …` range)
- `frame-row` (the `{frame}` number + status pill)
- `tag-row` (the `tags` line + `◐ {anchor_metric}`)

Keep the `<h1>` title. Add the `tagline` as a single subtitle line directly beneath it (serif or mono per the page's type scale — match existing tagline treatment used on tiles). The `data-status` desaturation logic and the props can stay wired (harmless) or be trimmed; the only hard requirement is that the three noisy rows no longer render. The component's other consumers (`frame`, `status`) still feed the page shell's status class via `[slug].astro`, so removing the *rendered* rows must not remove the *data* the shell relies on — verify the `case-study-{status}` class on `<article>` still resolves.

**`work/[slug].astro`** — new band order:
`DatelineStrip → TitleBlock (slim) → (status callout) → HeroMedia → FourQBlock → ExplainerGraphic → MethodsStrip → CharacterCloseout → NextPrevNav`

- Remove the `Opener` and `InvestigationBoard` imports and their render.
- The MDX `<Content>` render is dropped (its only payload was the Opener prose + board artifacts). If any project's MDX body carries a `<MetricChart>` or annotation worth keeping, flag it during the edit rather than silently deleting — default is removal.
- Insert `<ExplainerGraphic>` (Workstream 3 component) between `FourQBlock` and `MethodsStrip`. Until that component ships, leave a clearly-marked placeholder slot so the two workstreams stay decoupled.

**`FourQBlock.astro`** — remove the `─ 4Q ─` section heading and the `{frame}.{q}` frame-prefix span. Each answer's heading becomes only the question text: "What is this?", "Why this approach?", "What would break?", "What did I learn?". Drop the `Q1`/`Q2` labels (D7). Keep the Q1-body-larger type treatment. The canonical-EXPLANATION.md path can remain as-is; these five render from frontmatter.

**The 5 MDX bodies** — strip the `<Opener>…</Opener>` and `<InvestigationBoard>…</InvestigationBoard>` blocks (and the artifact components inside). Leave frontmatter intact; `four_q:` gets rewritten.

### 4.2 Spec + changelog obligations

`docs/specs/case-study-spec-v1.md` and `docs/specs/projects-section-spec-v1.md` are **LOCKED**. This redesign supersedes parts of them. Per repo convention: do not edit the spec bodies' changelog sections — log every change in root `CHANGELOG.md`, and update the spec bodies to reflect the new band order, the removed sections (Opener, Investigation Board), the slim TitleBlock, and the new ExplainerGraphic band. Update `CLAUDE.md`'s status table if it still claims "build not started."

---

## 5. The 4Q Rewrite (content work, in `code-brain`)

20 answers total (5 projects × {what, why, break, learn}). Each must be grounded in the real source so nothing is hallucinated, then voiced.

### 5.1 The voice chain (D3)

For each project, run the full chain:
1. **`storytelling-architecture`** — emit a beat map for the four answers: what hooks the reader in "What is this?", how "Why" earns trust, how "Break" shows rigor, how "Learn" lands. Beats, not prose.
2. **`writing-voice-modes`** — Sean Mode at a recruiter-safe dial (~40–50%, "stakeholder" register: grit by *substitution*, not subtraction). Honor the **"Desperation Posing as Self-Deprecation"** and **"Do-Not-Promote Topics"** anti-patterns — this is hiring-manager-facing.
3. **`writing-critique`** — adversarial red-team pass; one grounded revise request max back to voice-modes.
4. **LLM Council** — independent multi-vendor critique for blind-spot coverage before Sean approves each project. (`tools/llm-council/council/`, profiles in `code-brain` CLAUDE.md; mind the per-query + daily caps.)
5. **`writing-humanity-pass`** — strip AI tells, enforce no em-dashes.

Sean approves each project's four answers before they're pasted into the portfolio frontmatter.

### 5.2 Source map (authoritative)

| Project | Source(s) |
|---|---|
| Anima (A-1) | `/Users/seanwinslow/Code-Brain/anima` (CLAUDE.md, PHILOSOPHY.md, docs/pipeline-architecture-v1.md) |
| Code Brain (A-2) | `/Users/seanwinslow/Code-Brain/code-brain` (CLAUDE.md, CHANGELOG.md) |
| Intent Engineering MCP (A-3) | `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering` |
| The Block (A-4) | `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/assets/Sean_Winslow_Resume_AI_PM_UPDATED.md` · `…/vault/30_domains/product-management/the-block-resume-info/The-Block-Job-Description.md` · `…/the-block-resume-info/the-block-resume-additions-2026.md` |
| 16BitFit (A-5) | `/Users/seanwinslow/Code-Brain/16BitFit-V3/CLAUDE.md` |

**16BitFit special handling:** the *current website framing is correct* — Sean paused 16BitFit and pivoted to Anima specifically to solve the animation-pipeline problem for the game's video aspect. **Preserve that narrative.** The rewrite only fixes the *hallucinated project details and completion claims*; it does not re-frame the pivot. Treat the existing copy's stance as ground truth and correct the specifics against `16BitFit-V3/CLAUDE.md`.

---

## 6. Workstream 2 — Home affordances + nav (in `sw-ai-pm-portfolio`)

1. **Minimal corner nav (D2).** New component (e.g. `src/components/chrome/HomeCornerNav.astro`) rendered on `index.astro` only. `SW` wordmark → `/`, plus quiet `work` → `/work/` and `about` → `/about/` links in the corner. Keep it visually subordinate to the hero; must not reintroduce the full sticky chrome the home deliberately drops. Respect existing tokens (mono, teal, paper) and a11y (focus-visible, label-in-name on the wordmark, matching `SiteNav`'s pattern).
2. **Dateline visibility.** Increase `DatelineLabel.astro` font size (12px → ~16–18px, final size at build-time judgment) so `WORK · 5 PIECES · UPDATED {date}` is not missed. Keep it on one line where possible.
3. **Remove the "updated weekly" annotation.** Drop the `variant="updated-weekly"` `PencilAnnotation` usage from `ProjectsSection.astro`. The component can keep the variant definition; just stop rendering it.
4. **Make the swipe affordance land.** Three coordinated changes to the teaser deck:
   - Reposition `SwipeMeIndicator` to the **right of the deck** (per the friend's "← Swipe Me to the right of the images"), not below it.
   - Show it on **touch devices too** (remove or replace the `@media (hover: none) { display: none }` gate) — touch users are exactly who need it.
   - Add a **peeking card edge** to the stacked deck so it visually reads as a swipeable stack, not a rendering glitch. Keep `prefers-reduced-motion` behavior intact.

Update `docs/specs/home-about-teaser-spec-v1.md` / `site-chrome-spec-v1.md` and `CHANGELOG.md` for the nav + affordance changes.

---

## 7. Workstream 3 — Explainer graphics (separate, test-first; in `sw-ai-pm-portfolio`)

**Goal:** one simple "what this does at a glance" graphic per project, in the site's visual language (warm paper, ink, teal, pencil-test register), placed between the 4Q and Methods bands.

**Per-project loop (test-first, D4):**
1. Brainstorm the single explainer concept for the project (the one diagram/illustration that makes a recruiter *get it* without reading).
2. Draft the image prompt. Choose the model per concept: **NB2** (`.claude/skills/gemini-image-gen`) for pencil-test brand match; **OpenAI** (`.claude/skills/openai-image-gen`) for cleaner schematic/diagram needs. Use `image-generator-prompt-science` to engineer the prompt.
3. Generate **test renders**, present to Sean, iterate.
4. On approval, render final, convert to WebP, write alt text.
5. Integrate via a new `src/components/case-study/ExplainerGraphic.astro` (image + caption + alt), wired into `[slug].astro` (the slot left in Workstream 1). Assets to `public/assets/projects/explainers/`.

This phase ships *after* (or independently of) Workstream 1's layout — the placeholder slot keeps them decoupled. Five graphics; no graphic is final until Sean approves its test render.

Add `ExplainerGraphic` to the case-study spec and log assets in `CHANGELOG.md`.

---

## 8. Sequencing & dependencies

- **W1 layout** and **W2 home** are independent and can run together in the portfolio repo.
- **W1 copy** runs in `code-brain` and lands as frontmatter `four_q:` edits in the portfolio — the only cross-repo handoff. Coordinate so the layout edits don't clobber frontmatter being rewritten (touch different keys; the layout work is components, the copy work is `four_q:` values).
- **W3 graphics** depends on the `[slug].astro` slot from W1 but not its copy; can start its brainstorm/test loop anytime.
- Each workstream ends green: `npm run validate` (and the 280-char frontmatter caps) must pass before commit in the portfolio repo.

## 9. Success criteria

- [ ] A recruiter landing on any project page sees, in order: title, one-line subtitle, hero, "What is this?" — no cryptic label cluster.
- [ ] No `ROLE`, `IN FLIGHT`, `A-1 · ACTIVE`, tag line, or `◐ anchor metric` on project pages.
- [ ] No Opener section, no Investigation Board, no `A-1.Q1` prefixes, no `─ 4Q ─` heading.
- [ ] All 20 4Q answers are grounded in real repo source (zero hallucinated specifics), voiced through the full chain, and Sean-approved per project. 16BitFit preserves the paused/pivot narrative.
- [ ] Home page has a minimal corner nav; the dateline is visibly larger; the "updated weekly" SVG is gone; the teaser deck has an obvious, touch-visible swipe affordance to the right with a peeking card edge.
- [ ] One Sean-approved explainer graphic per project, in the site's visual language, between 4Q and Methods.
- [ ] Locked specs + `CHANGELOG.md` + `CLAUDE.md` updated to match; `npm run validate` green.

## 10. Out of scope

- Restructuring Transactions / Architecture / Essays surfaces.
- Hero animation changes.
- Re-theming, new color/type system.
- Anything in the daily-dated fleet layer (dateline/pulse/shipped-stats pipeline) beyond the home `DatelineLabel` font-size bump.

---

## 10.5 Repo-doc refresh (done in this planning session, 2026-06-16)

`sw-ai-pm-portfolio/CLAUDE.md` was refreshed to match reality (the file still claimed "build not started" with a pre-build LOCKED-spec table and a pre-build file map). Changes:

- Intro + status now state the site is **built and live on Vercel**; the "Phase 0 / Phase 2 / all-specs-LOCKED" status table and "Immediate next: scaffold" were retired.
- The `docs/specs/` are reframed as **as-built references** (read for *why*), and this critique-execution work is named as the active task, alongside "adding a project."
- The file map was rewritten to reflect the real built repo (`src/pages`, `src/components` by surface, `src/content` collections, `src/lib`, `public/api` daily-dated JSON, build `scripts/`, etc.).
- The voice-modes skill entry now describes the real chain + the recruiter dial; `writing-humanity-pass` and `openai-image-gen` were added; a stale skill/agent count was generalized.
- **Preserved (load-bearing, still true):** the template-trap section, the three load-bearing things, the working mindset, the locked-decisions quick reference, the doc-update conventions, and the daily-dated-layer / runbook context.

Going forward, the W1/W2 plans must keep CLAUDE.md current: when the minimal corner nav lands (W2), update the "No top nav on home" locked decision; when the case-study band order changes (W1), the case-study spec + CLAUDE.md should reflect it.

## 11. Implementation hand-off

Three plan files (per D5), generated next via `superpowers:writing-plans`:
1. `…/plans/2026-06-16-w1-project-page-surgery-and-4q.md` (portfolio components + the 4Q rewrite process spec; copy authored in code-brain)
2. `…/plans/2026-06-16-w2-home-affordances-and-nav.md` (portfolio)
3. `…/plans/2026-06-16-w3-explainer-graphics.md` (portfolio, test-first)
