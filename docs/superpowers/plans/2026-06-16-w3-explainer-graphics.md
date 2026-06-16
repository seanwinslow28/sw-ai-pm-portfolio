# W3 — Explainer Graphics Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One simple "what this does at a glance" explainer graphic per project, in the site's visual language (warm paper, ink, teal, pencil-test register), placed between the 4Q and Methods bands — generated test-first, Sean approving each before it's final.

**Architecture:** A small render path (one `ExplainerGraphic.astro` component + an optional `explainer` frontmatter field) plus a per-project, human-gated generation loop. The component is built and wired first (it renders nothing until a project has an `explainer:` block, so it ships safely while graphics are still being made). Then each project's graphic is brainstormed → prompt-engineered → test-rendered → Sean-approved → finalized → wired in.

**Tech Stack:** Astro 5; image generation via `.claude/skills/gemini-image-gen` (Nano Banana 2) and `.claude/skills/openai-image-gen`, prompt help from `.claude/skills/image-generator-prompt-science`; WebP output. **Verification model:** `npm run build` + `npm run validate` for the code path; **Sean's eye is the gate for every graphic** (test-first — nothing is final until he approves it). `.env` already holds the Gemini + OpenAI keys.

**Spec:** [`docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md`](../specs/2026-06-16-portfolio-critique-execution-design.md) §7. **Decision D4:** separate, test-first phase. **Depends on:** W1 Task A3 left the explainer slot in `work/[slug].astro` (order: hero → 4Q → explainer → methods).

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/content/config.ts` | Content schemas | Add optional `explainer` object to the `work` schema |
| `src/components/case-study/ExplainerGraphic.astro` | Render the explainer figure | Create |
| `src/pages/work/[slug].astro` | Case-study composition | Render `<ExplainerGraphic>` in the W1 slot when present |
| `public/assets/projects/explainers/<slug>.webp` | The 5 graphics | Create (test-first) |
| `src/content/work/<slug>.mdx` | Per project | Add `explainer:` frontmatter when the graphic is approved |
| `docs/specs/case-study-spec-v1.md` · `CHANGELOG.md` | Docs | Record the new band |

---

### Task 1: Add the `explainer` field to the work schema

**Files:**
- Modify: `src/content/config.ts`

- [ ] **Step 1: Add the schema object** — near the top, beside `fourQ`

After the `fourQ` definition (around line 14), add:
```ts
const explainer = z.object({
  src: z.string(),          // /assets/projects/explainers/<slug>.webp
  alt: z.string(),
  caption: z.string().max(160).optional(),
});
```

- [ ] **Step 2: Add the optional field to the `work` schema**

In the `work` `defineCollection` schema, just after the `four_q` / `explanation_url` lines, add:
```ts
    // --- Explainer graphic (critique W3, optional) ---
    explainer: explainer.optional(),
```

- [ ] **Step 3: Validate the schema compiles**

Run: `npm run validate && npm run build`
Expected: both pass (the field is optional, so no existing content breaks).

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts
git commit -m "feat(work): optional explainer-graphic frontmatter field (critique W3)"
```

---

### Task 2: Build the ExplainerGraphic component + wire it into the page slot

**Files:**
- Create: `src/components/case-study/ExplainerGraphic.astro`
- Modify: `src/pages/work/[slug].astro`

- [ ] **Step 1: Create the component**

```astro
---
/**
 * <ExplainerGraphic /> — the "what this does at a glance" figure on a case
 * study, between the 4Q and Methods bands (critique W3). Renders only when
 * the project's frontmatter carries an `explainer:` block.
 */
interface Props {
  explainer: { src: string; alt: string; caption?: string };
}
const { explainer } = Astro.props;
---

<figure class="explainer-graphic">
  <img src={explainer.src} alt={explainer.alt} loading="lazy" decoding="async" />
  {explainer.caption && <figcaption>{explainer.caption}</figcaption>}
</figure>

<style>
  .explainer-graphic {
    max-width: 1120px;
    margin: 56px auto 0;
    padding: 0 24px;
  }
  .explainer-graphic img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
  .explainer-graphic figcaption {
    margin: 12px 0 0;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.6px;
    color: var(--ink-secondary);
    text-transform: uppercase;
  }
  @media (max-width: 767px) {
    .explainer-graphic { padding: 0 16px; margin-top: 40px; }
  }
</style>
```

- [ ] **Step 2: Import + render it in the W1 slot** — `src/pages/work/[slug].astro`

Add the import beside the other case-study imports:
```astro
import ExplainerGraphic from "~/components/case-study/ExplainerGraphic.astro";
```
Replace the W1 placeholder comment:
```astro
    {/* Explainer-graphic slot — wired in W3 (ExplainerGraphic.astro). Order per
        critique spec §4.1: hero → 4Q → explainer graphic → methods. */}
```
with:
```astro
    {data.explainer && <ExplainerGraphic explainer={data.explainer} />}
```

- [ ] **Step 3: Build (no graphics yet — band is absent everywhere)**

Run: `npm run build`
Expected: success. No project has an `explainer:` block yet, so the band renders on zero pages — safe to ship.

- [ ] **Step 4: Commit**

```bash
git add src/components/case-study/ExplainerGraphic.astro src/pages/work/[slug].astro
git commit -m "feat(case-study): ExplainerGraphic component + page slot (critique W3)"
```

---

### Per-project generation loop (run once per project, test-first)

**Brand constraints (every graphic):** warm paper `#FFF9F0` background, ink + teal `#0A3E42`, pencil-test register (construction-line / hand-drawn feel where it suits), one splash accent max, no photoreal, no gradients, legible at ~1100px wide and on mobile. The graphic must make a recruiter *get the project* without reading. Keep it to one clear concept — a small flow or a single before/after, not a dense diagram.

**Model choice:** NB2 (`gemini-image-gen`) for the pencil-test / illustrated register that matches the site; OpenAI (`openai-image-gen`) when a cleaner schematic reads better. Use `image-generator-prompt-science` to engineer the prompt. Decide per concept with Sean.

**The loop (do NOT skip the gate):**
1. **Brainstorm the one concept** with Sean (the single idea that explains the project at a glance). Suggested seeds below — refine, don't assume.
2. **Engineer the prompt** (prompt-science skill) with the brand constraints baked in.
3. **Generate test renders** (2-3 variants). Present to Sean.
4. **Iterate** on prompt/model until Sean approves a direction.
5. **Render final**, save PNG to a scratch path.
6. **Convert to WebP**: `cwebp -q 82 scratch/<slug>.png -o public/assets/projects/explainers/<slug>.webp` (if `cwebp` is unavailable, use the project's existing image tooling; target < ~200 KB). Verify: `ls -la public/assets/projects/explainers/<slug>.webp`.
7. **Write alt text + optional caption** (alt = literal description for screen readers; caption = one wire-service line, ≤160 chars).
8. **Add the frontmatter** to `src/content/work/<slug>.mdx`:
```yaml
explainer:
  src: /assets/projects/explainers/<slug>.webp
  alt: "literal description of the graphic for screen readers"
  caption: "one-line wire-service caption"
```
9. **Validate + build + visual check**: `npm run validate && npm run build && npm run dev` → `/work/<slug>` shows the graphic between the 4Q and Methods, on-brand, legible on desktop + mobile.
10. **Commit** that project's graphic + frontmatter.

**Suggested concept seeds (starting points — brainstorm with Sean before generating):**

| Project | Seed concept |
|---|---|
| Anima | The 10-phase pipeline as a simple left-to-right flow, with the human/agent split marked (human owns timing + taste; fleet runs the volume). |
| Code Brain | The overnight fleet loop as a clock/cycle: session → flush → synthesize → critic → lint → back to morning. |
| Intent Engineering MCP | The three MCP tools as a tiny before/after: vague intent → audit → scaffolded intent spec. |
| The Block | "The agreement is the UX" — a simple B2B flow from research to shipped product. Recruiter-facing; keep it credible and plain. |
| 16BitFit | The pivot, drawn honestly: game paused on the shelf, the animation-pipeline need pulled out into Anima (an arrow from the game to the pipeline). |

### Task 3: Generate + wire the 5 graphics (×5, each gated by Sean)

**Files (per project):** `public/assets/projects/explainers/<slug>.webp` (create) · `src/content/work/<slug>.mdx` (add `explainer:`)

- [ ] **Anima** — run the loop; Sean approves; webp + frontmatter; validate/build/visual; commit `feat(work): anima explainer graphic (critique W3)`.
- [ ] **Code Brain** — run the loop; Sean approves; webp + frontmatter; validate/build/visual; commit.
- [ ] **Intent Engineering MCP** — run the loop; Sean approves; webp + frontmatter; validate/build/visual; commit.
- [ ] **The Block** — run the loop; Sean approves; webp + frontmatter; validate/build/visual; commit.
- [ ] **16BitFit** — run the loop (honor the paused/pivot framing); Sean approves; webp + frontmatter; validate/build/visual; commit.

Per-project commit shape:
```bash
git add public/assets/projects/explainers/<slug>.webp src/content/work/<slug>.mdx
git commit -m "feat(work): <slug> explainer graphic (critique W3)"
```

---

### Task 4: Record the new band in the spec + CHANGELOG

**Files:**
- Modify: `docs/specs/case-study-spec-v1.md`
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Document the band** — in `case-study-spec-v1.md`, add the ExplainerGraphic band to the §2 order (hero → 4Q → explainer → methods), with the `explainer:` frontmatter shape and the brand constraints.
- [ ] **Step 2: CHANGELOG entry** — per the file's "How to add an entry" header, a 2026-06-16 entry: explainer-graphic component + schema field + 5 graphics.
- [ ] **Step 3: Commit**

```bash
git add docs/specs/case-study-spec-v1.md CHANGELOG.md
git commit -m "docs(case-study): record explainer-graphic band (critique W3)"
```

---

## Self-Review (run before declaring W3 done)

- [ ] `explainer` schema field is optional; pages without it build clean.
- [ ] `ExplainerGraphic.astro` renders only when frontmatter is present, between 4Q and Methods.
- [ ] All 5 graphics are on-brand (paper/ink/teal/pencil-test), one clear concept each, Sean-approved, legible desktop + mobile, WebP < ~200 KB, with real alt text.
- [ ] 16BitFit's graphic honors the paused/pivot framing.
- [ ] `npm run validate` + `npm run build` green; each `/work/<slug>` visually verified.
- [ ] case-study spec + CHANGELOG updated.
```
