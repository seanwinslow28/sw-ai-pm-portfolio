# Claude Code kickoff — Intent Engineering MCP interactive explainer

> Paste everything below the line into a fresh Claude Code session opened at the
> repo root: `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. It plans then
> builds the second interactive case-study explainer. `frontend-design` is
> installed. Start in plan mode.

---

You are working in the `sw-ai-pm-portfolio` repo (Astro 5 + Tailwind 4). Build the **second** interactive case-study explainer — for the `intent-engineering-mcp` project — following the pattern set by the shipped `animation-pipeline` pilot. **Start in plan mode: read everything in §0, then show me a plan (art approach, the scaffold-extraction diff, and the full file list) and wait for my approval before writing any code.**

## 0. Read these first (in order)

1. `docs/specs/interactive-explainer-rollout-v1.md` — the rollout plan. Your build is **§3 (Intent MCP)**. Also read §6 (shared scaffold), §7 (tooling), §9 (asset pipeline), §10 (verification).
2. `docs/specs/interactive-explainer-pattern-v1.md` — the pilot + the reusable pipeline: art generation (§6), luminance keying (§7), the interaction + progressive-enhancement contract (§8), design-system fit (§9), and the playbook (§11).
3. `src/content/work/intent-engineering-mcp.mdx` — the project's `four_q` + the existing `explainer:` block. Its `alt` is your alt-text source; the static `src` is your reduced-motion / no-JS fallback.
4. `src/components/case-study/AnimationPipelineExplainer.astro` and `ExplainerGraphic.astro` — the pilot component you will generalize, and its wiring branch.
5. `DESIGN.md` + `PRODUCT.md` — tokens and the rules you must honor: color-as-actor, flat/sharp (no shadows/gradients), `--ease-out`, the Licensed-Infinite-Motion rule, reduced-motion, WCAG AA, and the **stack bans**.

## 1. Skills to invoke (and when)

- **`frontend-design`** (installed) — invoke for the component build. CSS-first, restrained motion, nothing that reads as a templated default. This is your taste gate.
- **`gemini-pencil-animation-image-gen`** — generate the explainer art in the pencil register; use its `references/pencil-animation-prompt-templates.md`.
- **`image-generator-prompt-science`** — read for the 7-layer prompt framework when you write the generation prompt.
- **`2d-animation-principles`** — if present in this workspace, use it for reveal spacing/easing (ease-in/out, never linear). If absent, reuse the `easeInOut` already in `AnimationPipelineExplainer.astro`.
- **`design:accessibility-review`** + **`design:design-critique`** — if available, run them as the verification gate (§6); otherwise do a manual WCAG AA + design pass.
- Do **not** re-run `pm-product-discovery:brainstorm` — the metaphor is locked in rollout §3. Only reach for it if you want to reshape the concept, and flag me first.

## 2. The concept (LOCKED — rollout §3)

**"Tighten the spec, watch the score."** One slider = spec quality (vague → tight). As the reader drags right, three things move together:
- the scribbled spec card resolves into the clean **9-section checklist** (sections check off one at a time),
- the **AUDIT score climbs ~7/25 → 23/25**,
- the **agent glyph** at the end flips from building-the-wrong-thing to building-the-right-thing.

Predict-then-check: the reader feels that *intent quality, not model smarts,* decides the outcome. The `23/25` is real — the MCP scores its own spec 23/25 (`four_q.what` in the mdx).

Nicky Case 3-act: open at vague / 7-of-25 / garbage output → climb (each notch checks a section; at mid-score the agent is *still* wrong — structure isn't done) → close at 23/25, checklist complete, agent builds the right thing, rough-notation circles the score.

## 3. Tooling to add

- `npm i roughjs rough-notation` (MIT, ~13kB total). Use **rough-notation** only for the draw-on circle/underline around the final `23/25`. Use **Rough.js** sparingly, only if a dynamic element genuinely needs a hand-drawn stroke; prefer pre-rendered pencil art everywhere you can.
- **Honor the skip list** (rollout §7 / DESIGN.md): no GSAP, Framer, Lenis, Three.js, Lottie, Rive, anime.js, or scroll libraries. **Ignore the `animation-components` / `gsap-scrolltrigger` / `locomotive-scroll` / `react-spring` plugins entirely** — they violate the stack ban. The scrub core is native **WAAPI + CSS `mask-image`**, exactly like the pilot.

## 4. Art — generate-then-key (pilot §6–7)

This machine can reach the Gemini API and run npm (unlike the cowork sandbox), so you can generate inline — but still **commit the generator** for reproducibility.

- Write `scripts/gen-explainer-intent.sh`, mirroring `scripts/gen-explainer-runcycle.sh`: a verbatim committed prompt, `--aspect-ratio 16:9`, output to `public/assets/projects/explainers/intent-engineering-mcp-*-raw.png`, using the anima skill at `/Users/seanwinslow/Code-Brain/anima/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py` with `--env-file /Users/seanwinslow/Code-Brain/anima/.env`.
- Generate with **style consistency** (the pilot's lesson: one generation = consistent identity/style). Prefer a **single sheet** holding both spec-card states (vague scribble | clean 9-section checklist) plus the two small agent glyphs (wrong | right) in one pencil register, then crop. The two cards must register so they **cross-fade in place**.
- Graphite line art on a **plain flat off-white** background (no paper chrome — the portfolio supplies the paper), with explicit negatives (no color, no ink-black, no anime/3D/vector-clean lines), per the pilot prompt.
- Key to transparent: `python3 scripts/key-explainer-art.py IN.png public/assets/projects/explainers/<name>.webp` (tune `--alpha-floor` / `--dark-anchor` if the source contrast differs). Re-roll a couple of takes; image gen varies.
- The **score number and the checkmarks are LIVE** (text / SVG), not baked into the art — so they animate and stay screen-reader-accessible.

## 5. Build — the component + the scaffold extraction

This is build #2, so **extract the shared scaffold now** (rollout §6):

- Create `src/components/case-study/InteractiveExplainer.astro` — the base: the wrapper, the CLS-safe `aspect-ratio` stage, the **progressive-enhancement contract** (`is-interactive` added by JS only; `prefers-reduced-motion` early-return; static `.webp` as the no-JS/reduced-motion floor), the scrubber affordance styling + `:focus-visible` ring, the label-zone row generalized to `{label, sublabel, token}` props, and the a11y wiring.
- Refactor `AnimationPipelineExplainer.astro` to consume the base **without changing its rendered behavior** — treat the shipped pilot as a regression test and diff before/after (it must stay behavior-equivalent).
- Create the **IntentExplainer** interaction module: the slider → `render(t)` logic (cross-fade vague→clean card, progressive checklist reveal, score counter, agent-glyph flip, rough-notation circle).
- Generalize `ExplainerGraphic.astro`'s `interactive` branch into a small **registry** (slug → component). Set `explainer.interactive: intent-engineering-mcp` in the mdx; keep the static `src` as the fallback.

Mechanics:
- Slider = the same native `range` + WAAPI pattern as the pilot.
- `render(t)`: cross-fade the cards (CSS opacity/mask), reveal checklist sections progressively, count the score 7→23 as **live mono text**, flip the agent glyph near the top, rough-notation circles `23/25` at `t≈1`. Ease-in/out, never linear.
- Color-as-actor on real tokens: score `--ink-secondary` → `--teal` → `--success-teal`; AUDIT stamp `--teal`; `--stamp-amber` reserved for the score circle. Flat, sharp, no shadows.

## 6. Verify — do NOT claim done until these pass

- `npm run dev` → `/work/intent-engineering-mcp` renders the interactive figure; `npm run build` is clean.
- **Reduced-motion + no-JS:** the static `intent-engineering-mcp.webp` shows, the slider is hidden, the final state is the honest one.
- The score is **live text a screen reader announces** (not a drawn number); the range carries an `aria-label`; the focus ring is present.
- **CLS:** the stage reserves height before paint.
- **Bundle check:** `roughjs` / `rough-notation` ship only in this island, not site-wide.
- Run `design:accessibility-review` (or a manual WCAG AA pass).
- **Regression:** the `animation-pipeline` explainer is unchanged in behavior after the scaffold extraction.
- **Kill switch:** if anything forces hiding the slider or shipping passive output where the interactive figure was, stop and tell me.

## 7. Wrap

- Update `docs/specs/interactive-explainer-rollout-v1.md` (mark Intent MCP built; note the shared scaffold landed and where) and add a `CHANGELOG.md` entry (read its "How to add an entry" header first). Follow the spec/CHANGELOG conventions in `CLAUDE.md`.
- Leave the raw generation PNG(s) reproducible via the committed `gen-explainer-intent.sh`; safe to delete the raw from `public/` after keying.

Plan first. Wait for my approval before writing code.
