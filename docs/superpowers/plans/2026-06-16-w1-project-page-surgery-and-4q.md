# W1 — Project-Page Surgery + 4Q Rewrites Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Strip the cryptic header cluster, Opener, and Investigation Board from every project page; lead with a slim title + tagline → hero → 4Q (no jargon labels) → methods; and rewrite all 20 4Q answers grounded in real repo source, voiced through Sean's full writing chain.

**Architecture:** Two decoupled parts that meet at the `four_q:` frontmatter of `src/content/work/*.mdx`. **Part A** (this repo, `sw-ai-pm-portfolio`) edits the case-study components and strips the MDX bodies. **Part B** authors the 4Q copy in `code-brain` (where the voice chain lives) and Sean pastes the approved text into frontmatter here. All file writes to `src/content/work/*.mdx` happen in THIS repo — the code-brain session only produces text — so the two halves never collide on the same file in two repos.

**Tech Stack:** Astro 5, Tailwind 4, MDX content collections. **Verification model:** this repo has no component unit-test harness, so "tests" are the repo's real gates — `npm run build` (must succeed), `npm run validate` (content-schema gate), and a visual check at `npm run dev` (http://localhost:4321). Each task ends by running those gates and committing.

**Spec:** [`docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md`](../specs/2026-06-16-portfolio-critique-execution-design.md) §4 + §5.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/components/case-study/TitleBlock.astro` | Case-study title block | Rewrite: render only title + tagline |
| `src/components/case-study/FourQBlock.astro` | 4Q closer | Rewrite: drop `─ 4Q ─` heading, frame prefix, `Q1` labels; question becomes the heading |
| `src/pages/work/[slug].astro` | Case-study page composition | Reorder bands; remove Opener/InvestigationBoard + MDX `<Content>`; add explainer-graphic slot |
| `src/content/work/animation-pipeline.mdx` | Anima project | Strip body (imports + Opener + Board); rewrite `four_q` |
| `src/content/work/code-brain.mdx` | Code Brain project | Same |
| `src/content/work/intent-engineering-mcp.mdx` | Intent Engineering project | Same |
| `src/content/work/the-block.mdx` | The Block project | Same |
| `src/content/work/16bitfit.mdx` | 16BitFit project | Same (preserve paused/pivot narrative) |
| `docs/specs/case-study-spec-v1.md` | As-built case-study spec | Update band order + removed sections |
| `CHANGELOG.md` | Change log | Log the redesign |

---

# PART A — Component + layout surgery (this repo)

> **STATUS — ✅ COMPLETE (2026-06-16).** All five tasks implemented and committed to branch `feat/2026-06-16-critique-w1-part-a`:
> | Task | Commit |
> |---|---|
> | A1 — slim TitleBlock | `cb73f9c` |
> | A2 — question-led FourQBlock | `83aa806` |
> | A3 — reorder `[slug].astro`, drop Opener/Board, explainer slot | `28cdaa5` |
> | A4 — strip Opener/Board bodies from all 5 MDX | `76cf52d` |
> | A5 — case-study spec amendment + CHANGELOG | `156d5f7` |
>
> Content validation (`npm run validate`) passes for all 5 work entries. **Deferred to a Mac run:** the Astro build (`npm run build`) and the `npm run dev` visual checks — the Cowork Linux sandbox can't run the build (macOS-native `node_modules` + a FUSE mount that blocks Vite's cache rewrite). Run them locally before deploy. The branch is unmerged; the 4Q frontmatter still holds the pre-existing copy until Part B replaces it.

### Task A1: Slim the TitleBlock to title + tagline

**Files:**
- Modify (full rewrite): `src/components/case-study/TitleBlock.astro`

- [x] **Step 1: Replace the entire file with the slim version**

```astro
---
/**
 * <TitleBlock /> — case-study title block.
 *
 * Renders the project title + a one-line tagline subtitle. The cryptic
 * header cluster (role pill, IN FLIGHT range, frame + status pill, tags,
 * anchor metric) was removed 2026-06-16 per the hiring-manager critique
 * (see docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md §4.1).
 * Status-driven page accents live on the page shell in work/[slug].astro,
 * not here.
 */
interface Props {
  title: string;
  tagline?: string;
}

const { title, tagline } = Astro.props;
---

<header class="title-block">
  <h1 class="case-study-title">{title}</h1>
  {tagline && <p class="case-study-tagline">{tagline}</p>}
</header>

<style>
  .title-block {
    max-width: 1120px;
    margin: 24px auto 0;
    padding: 0 24px;
  }
  .case-study-title {
    font-family: var(--font-serif);
    font-size: clamp(40px, 5.6vw, 84px);
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.6px;
    color: var(--teal);
    margin: 0 0 16px;
  }
  .case-study-tagline {
    font-family: var(--font-serif);
    font-size: clamp(20px, 2.2vw, 28px);
    font-weight: 300;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: -0.2px;
    color: var(--ink-secondary);
    margin: 0;
    max-width: 720px;
  }
  @media (max-width: 767px) {
    .title-block { padding: 0 16px; }
    .case-study-title { font-size: clamp(36px, 8vw, 56px); }
    .case-study-tagline { font-size: 18px; }
  }
</style>
```

- [x] **Step 2: Verify nothing else imports the removed props**

Run: `grep -rn "anchorMetric\|inFlight\|role-pill\|status-pill" src/components/case-study/TitleBlock.astro`
Expected: no matches (the rows are gone).

- [x] **Step 3: Commit**

```bash
git add src/components/case-study/TitleBlock.astro
git commit -m "feat(case-study): slim TitleBlock to title + tagline (critique W1)"
```

---

### Task A2: Strip jargon from FourQBlock (no `─ 4Q ─`, no frame prefix, no Q labels)

**Files:**
- Modify (full rewrite): `src/components/case-study/FourQBlock.astro`

- [x] **Step 1: Replace the entire file**

```astro
---
/**
 * <FourQBlock /> — renders the canonical 4Q closer.
 *
 * 2026-06-16 critique redesign: the "─ 4Q ─" heading, the "A-1.Q1" frame
 * prefixes, and the Q1/Q2 labels are gone. Each answer's question IS its
 * heading. Prefers fetched canonical EXPLANATION.md markdown when present;
 * otherwise renders the four_q frontmatter mirror.
 */
interface FourQ {
  what: string;
  why: string;
  break: string;
  learn: string;
}
interface Props {
  slug: string;
  fourQ?: FourQ;
  canonicalMarkdown?: string;
  explanationUrl?: string;
}

const { slug, fourQ, canonicalMarkdown, explanationUrl } = Astro.props;

const SECTIONS = [
  { title: "What is this?", key: "what" as const },
  { title: "Why this approach?", key: "why" as const },
  { title: "What would break?", key: "break" as const },
  { title: "What did I learn?", key: "learn" as const },
];

const usingCanonical = Boolean(canonicalMarkdown);
const usingFrontmatter = Boolean(fourQ);
const showLink = Boolean(explanationUrl);
---

<section class="four-q" aria-labelledby={`four-q-${slug}`}>
  <h2 id={`four-q-${slug}`} class="sr-only">Project questions and answers</h2>

  {usingCanonical && (
    <article class="four-q-canonical" set:html={canonicalMarkdown} />
  )}

  {!usingCanonical && usingFrontmatter && (
    <div class="four-q-frontmatter">
      {SECTIONS.map(({ title, key }) => (
        <article class="four-q-section">
          <h3 class="four-q-title">{title}</h3>
          <p class={`four-q-body four-q-body-${key}`}>{fourQ![key]}</p>
        </article>
      ))}
    </div>
  )}

  {showLink && (
    <p class="canonical-link">
      <a href={explanationUrl} rel="external">&rarr; read the canonical EXPLANATION.md</a>
    </p>
  )}
</section>

<style>
  .four-q {
    margin: 56px auto 0;
    max-width: 1120px;
    padding: 0 24px;
  }
  .sr-only {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0);
    white-space: nowrap; border: 0;
  }
  .four-q-frontmatter {
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
  .four-q-section { max-width: 720px; }
  .four-q-title {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 400;
    letter-spacing: -0.3px;
    color: var(--teal);
    margin: 0 0 12px;
  }
  .four-q-body {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.55;
    letter-spacing: -0.1px;
    color: var(--ink);
    margin: 0;
  }
  .four-q-body-what { font-size: 22px; }
  .four-q-canonical :global(h2) {
    font-family: var(--font-serif);
    font-size: 26px;
    font-weight: 400;
    color: var(--teal);
    margin: 40px 0 12px;
  }
  .four-q-canonical :global(p) {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.55;
    color: var(--ink);
    max-width: 720px;
    margin: 0 0 16px;
  }
  .canonical-link {
    margin: 32px 0 0;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--teal);
  }
  .canonical-link a {
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    transition: border-color 160ms var(--ease-out);
  }
  .canonical-link a:hover,
  .canonical-link a:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }
  @media (max-width: 767px) {
    .four-q { padding: 0 16px; }
    .four-q-title { font-size: 22px; }
    .four-q-body { font-size: 16px; }
    .four-q-body-what { font-size: 20px; }
  }
</style>
```

- [x] **Step 2: Confirm the jargon is gone**

Run: `grep -n "4Q\|frame-prefix\|frame={frame}\|{frame}.{q}" src/components/case-study/FourQBlock.astro`
Expected: no matches.

- [x] **Step 3: Commit**

```bash
git add src/components/case-study/FourQBlock.astro
git commit -m "feat(case-study): question-led 4Q, drop frame prefixes + 4Q heading (critique W1)"
```

---

### Task A3: Reorder the page + remove Opener/InvestigationBoard + add explainer slot

**Files:**
- Modify: `src/pages/work/[slug].astro`

- [x] **Step 1: Remove the now-unused imports** (frontmatter of `[slug].astro`)

Delete these import lines:
```astro
import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";
```
**Keep** `import Annotation from "~/components/annotations/Annotation.astro";` — it is still used by the page-closeout registration mark.

- [x] **Step 2: Remove the MDX render destructure**

Delete this line:
```astro
const { Content } = await entry.render();
```

- [x] **Step 3: Replace the TitleBlock call** with the slim props

Find:
```astro
      <TitleBlock
        frame={data.frame}
        title={data.title}
        status={data.status}
        tags={data.tags}
        role={data.role}
        dateStarted={data.date_started}
        dateActiveThrough={data.date_active_through}
        anchorMetric={data.anchor_metric}
      />
```
Replace with:
```astro
      <TitleBlock title={data.title} tagline={data.tagline} />
```

- [x] **Step 4: Replace the body region** — swap the `<Content>` + MethodsStrip + FourQBlock block for the new order

Find this block:
```astro
    <Content
      components={{
        Opener,
        InvestigationBoard,
        PRDDecision,
        SlackQuote,
        BoardArtifact,
        MetricChart,
        Annotation,
      }}
    />

    <MethodsStrip methods={data.methods} />

    <FourQBlock
      frame={data.frame}
      slug={entry.slug}
      fourQ={data.four_q}
      explanationUrl={data.explanation_url}
    />
```
Replace with:
```astro
    <FourQBlock
      slug={entry.slug}
      fourQ={data.four_q}
      explanationUrl={data.explanation_url}
    />

    {/* Explainer-graphic slot — wired in W3 (ExplainerGraphic.astro). Order per
        critique spec §4.1: hero → 4Q → explainer graphic → methods. */}

    <MethodsStrip methods={data.methods} />
```

- [ ] **Step 5: Run the build to verify it compiles**  _(deferred to your Mac — sandbox cannot run the Astro build)_

Run: `npm run build`
Expected: build succeeds. If it errors on an unused import or a missing `Content`, re-check Steps 1-2.

- [ ] **Step 6: Visual check**  _(deferred to your Mac — visual check on `npm run dev`)_

Run: `npm run dev`, open http://localhost:4321/work/animation-pipeline
Expected: page shows dateline → big title + italic tagline → hero → "What is this?" (no `A-1.Q1`, no `─ 4Q ─`) → methods. No Opener, no Investigation Board, no cryptic header cluster. (The MDX bodies still contain the Opener/Board markup but it's no longer rendered — Task A4 removes it.)

- [x] **Step 7: Commit**

```bash
git add src/pages/work/[slug].astro
git commit -m "feat(case-study): reorder to title→hero→4Q→methods, drop opener+board (critique W1)"
```

---

### Task A4: Strip the Opener + Investigation Board out of all 5 MDX bodies

Each `src/content/work/*.mdx` is, after its frontmatter `---`, nothing but `import` lines + `<Opener>…</Opener>` + `<InvestigationBoard>…</InvestigationBoard>`. Removing all of it leaves a clean frontmatter-only file. **Do not touch the frontmatter** (the `four_q:` block is rewritten in Part B).

**Files:**
- Modify: `src/content/work/animation-pipeline.mdx`
- Modify: `src/content/work/code-brain.mdx`
- Modify: `src/content/work/intent-engineering-mcp.mdx`
- Modify: `src/content/work/the-block.mdx`
- Modify: `src/content/work/16bitfit.mdx`

- [x] **Step 1: For each file, delete every line after the closing frontmatter `---`**

The body to delete looks like this (animation-pipeline.mdx example — the artifact set differs per file, delete all of it):
```astro
import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
... (all imports) ...

<Opener>
  ... paragraphs ...
</Opener>

<InvestigationBoard>
  ... artifacts ...
</InvestigationBoard>
```
After the edit, the file ends at the frontmatter's closing `---` (frontmatter-only MDX is valid; Astro renders an empty body, which the page no longer references).

- [x] **Step 2: Verify no Opener/Board markup remains in any work file**

Run: `grep -rnE "Opener|InvestigationBoard|PRDDecision|SlackQuote|BoardArtifact|MetricChart" src/content/work/`
Expected: no matches.

- [x] **Step 3: Verify frontmatter survived (four_q still present in all 5)**

Run: `grep -cE "^four_q:" src/content/work/*.mdx`
Expected: each file reports `1`.

- [ ] **Step 4: Build + validate**  _(content validate done and passing; Astro build deferred to your Mac)_

Run: `npm run validate && npm run build`
Expected: both pass.

- [x] **Step 5: Commit**

```bash
git add src/content/work/*.mdx
git commit -m "refactor(work): strip opener + investigation-board bodies from all 5 projects (critique W1)"
```

---

### Task A5: Update the case-study spec + CHANGELOG

**Files:**
- Modify: `docs/specs/case-study-spec-v1.md`
- Modify: `CHANGELOG.md`

- [x] **Step 1: Update the spec band order**

In `docs/specs/case-study-spec-v1.md`, update the §2 band-order description to: `dateline → title (title + tagline only) → status callout → hero → 4Q (question-led) → explainer graphic → methods → character closeout → next/prev`. Mark the Opener and Investigation Board sections as **removed 2026-06-16** (keep a one-line historical note so future readers know they existed). Note the 4Q no longer carries frame prefixes or a `─ 4Q ─` heading.

- [x] **Step 2: Add a CHANGELOG entry**

Read the "How to add an entry" header in `CHANGELOG.md`, then add an entry dated 2026-06-16 summarizing: slim TitleBlock, removed Opener + Investigation Board, question-led 4Q, reorder, explainer-graphic slot added. Reference the spec.

- [x] **Step 3: Commit**

```bash
git add docs/specs/case-study-spec-v1.md CHANGELOG.md
git commit -m "docs(case-study): record critique W1 redesign in spec + changelog"
```

---

# PART B — 4Q copy rewrite (authored in `code-brain`, pasted here)

**Where this runs:** a Claude Code session rooted in `/Users/seanwinslow/Code-Brain/code-brain`, which carries `storytelling-architecture`, `writing-critique`, and the LLM Council. `writing-voice-modes` + `writing-humanity-pass` exist in both repos. The session AUTHORS text only; Sean pastes approved copy into the `four_q:` frontmatter in the portfolio repo (so no cross-repo file conflict with Part A).

**Per-project procedure (run once per project, in order):**

1. **Gather source.** Read the project's source (table below). Pull only true, specific facts — names, numbers, real failure modes, real decisions.
2. **`storytelling-architecture`** — emit a beat map for the four answers (hook in "What is this?", trust in "Why", rigor in "Break", landing in "Learn"). Beats, not prose.
3. **`writing-voice-modes`** — write the four answers in **Sean Mode at a recruiter-safe dial (~40-50%)**: grit by *substitution*, not subtraction. Honor the "Desperation Posing as Self-Deprecation" and "Do-Not-Promote Topics" anti-patterns (hiring-manager audience). Each answer 2-5 sentences; "What is this?" is the hook and can run slightly longer.
4. **`writing-critique`** — adversarial pass; at most one grounded revise request back to voice-modes.
5. **LLM Council** — run the four answers through the council for independent blind-spot coverage. Mind the per-query + daily caps in code-brain's CLAUDE.md.
6. **`writing-humanity-pass`** — strip AI tells, enforce no em-dashes.
7. **Sean approves** the four answers for that project.
8. **Paste** the approved text into the project's `four_q:` `what/why/break/learn` values in `src/content/work/<slug>.mdx` (portfolio repo). Mind the 280-char schema cap enforced by `npm run validate` — keep each value within it.

**Source map (authoritative):**

| Project | `four_q` target file | Source(s) |
|---|---|---|
| Anima | `animation-pipeline.mdx` | `/Users/seanwinslow/Code-Brain/anima` (CLAUDE.md, PHILOSOPHY.md, docs/pipeline-architecture-v1.md) |
| Code Brain | `code-brain.mdx` | `/Users/seanwinslow/Code-Brain/code-brain` (CLAUDE.md, CHANGELOG.md) |
| Intent Engineering MCP | `intent-engineering-mcp.mdx` | `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering` |
| The Block | `the-block.mdx` | `…/vault/20_projects/prj-job-hunt-2026/assets/Sean_Winslow_Resume_AI_PM_UPDATED.md` · `…/vault/30_domains/product-management/the-block-resume-info/The-Block-Job-Description.md` · `…/the-block-resume-info/the-block-resume-additions-2026.md` |
| 16BitFit | `16bitfit.mdx` | `/Users/seanwinslow/Code-Brain/16BitFit-V3/CLAUDE.md` |

**16BitFit special rule:** the current website framing is CORRECT — Sean paused 16BitFit and pivoted to Anima to solve the animation pipeline for the game's video aspect. **Preserve that narrative.** Only fix the hallucinated project details / completion claims against `16BitFit-V3/CLAUDE.md`. Do not re-frame the pivot.

### Task B1: Rewrite + paste — per project (×5)

**Files (paste target, this repo):** `src/content/work/<slug>.mdx` (frontmatter `four_q:` only)

- [ ] **Anima** — run the per-project procedure; Sean approves; paste into `animation-pipeline.mdx`.
- [ ] **Code Brain** — run the procedure; Sean approves; paste into `code-brain.mdx`.
- [ ] **Intent Engineering MCP** — run the procedure; Sean approves; paste into `intent-engineering-mcp.mdx`.
- [ ] **The Block** — run the procedure (three vault sources); Sean approves; paste into `the-block.mdx`.
- [ ] **16BitFit** — run the procedure preserving the paused/pivot narrative; Sean approves; paste into `16bitfit.mdx`.

- [ ] **After each paste: validate**

Run: `npm run validate`
Expected: pass (no value exceeds the 280-char cap; schema intact). If a value is too long, tighten in voice (substitution), do not truncate mid-sentence.

- [ ] **Commit after each project**

```bash
git add src/content/work/<slug>.mdx
git commit -m "content(work): rewrite <slug> 4Q from real source, voiced (critique W1)"
```

- [ ] **Final: full build + visual sweep of all 5 pages**

Run: `npm run build && npm run dev`
Check each `/work/<slug>` page: the four answers read true, hook on "What is this?", recruiter-safe voice, no hallucinated specifics, no em-dashes.

---

## Self-Review (run before declaring W1 done)

- [ ] Every project page leads with title + tagline only — no role/IN FLIGHT/frame·status/tags/anchor-metric.
- [ ] No Opener, no Investigation Board, no artifacts rendered; `grep` in `src/content/work/` is clean.
- [ ] 4Q is question-led: no `A-1.Q1`, no `─ 4Q ─`, no Q labels.
- [ ] Band order is dateline → title → hero → 4Q → (explainer slot) → methods.
- [ ] All 20 4Q answers grounded in real source, voiced through the full chain, Sean-approved; 16BitFit keeps the pivot narrative.
- [ ] `npm run validate` and `npm run build` both green.
- [ ] case-study spec + CHANGELOG updated.
