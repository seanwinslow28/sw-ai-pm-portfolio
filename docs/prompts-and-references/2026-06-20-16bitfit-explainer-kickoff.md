# Claude Code kickoff — 16BitFit interactive explainer

> Paste everything below the line into a fresh Claude Code session opened at the
> repo root: `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. It plans then
> builds the **fifth and final** interactive case-study explainer.
> `frontend-design` is installed. Start in plan mode.
>
> Prereq: the shared `InteractiveExplainer.astro` base exists (Intent build) and
> now accepts DOM stage content (The Block build). This build CONSUMES that base.
> **This one switches medium — pixel art, not graphite — and is the only
> continuous-playback explainer.** Its art comes from the PIXEL skill, not the
> pencil skill, and the "drift" is synthesized at runtime, not generated.

---

You are working in the `sw-ai-pm-portfolio` repo (Astro 5 + Tailwind 4). Build the **16BitFit** interactive case-study explainer, following the pattern set by the four shipped explainers (`animation-pipeline`, `intent-engineering-mcp`, `code-brain`, `the-block`). **Start in plan mode: read everything in §0, then show me (a) the sprite source plan, (b) a de-risk prototype of the drift OFF (flicker) vs ON (locked) state on a couple of frames, and (c) the full file list, and wait for my approval before the full build.**

## 0. Read these first (in order)

1. `docs/specs/interactive-explainer-rollout-v1.md` — the rollout plan. Your build is **§5 (16BitFit)**. Also read §6 (shared scaffold — already built), §9 (asset pipeline — note the PIXEL skill row), §10 (verification), and §11 (the named "drift must read as flicker, not chaos" risk).
2. `docs/specs/interactive-explainer-pattern-v1.md` — the pilot + the interaction / progressive-enhancement contract (§8) and design-system fit (§9). (You will use a sprite sheet, NOT the pencil keying pipeline.)
3. `src/components/case-study/InteractiveExplainer.astro` — the shared base you consume (now supports a DOM stage slot, added in The Block build). Read it + the four existing interaction modules as worked examples.
4. `src/content/work/16bitfit.mdx` — the project's `four_q` + the existing `explainer:` block. Its `alt` is your alt-text source; the static `16bitfit.webp` is your reduced-motion / no-JS fallback. The `four_q.break` is your script source: identity drift "even a pixel or two" reads as flicker — the exact bug.
5. `DESIGN.md` + `PRODUCT.md` — tokens and the rules: color-as-actor, flat/sharp, the **Licensed-Infinite-Motion rule** (load-bearing here — this is the only looping explainer), reduced-motion, WCAG AA, the stack bans.

## 1. Skills to invoke (and when)

- **`frontend-design`** (installed) — invoke for the component build. CSS-first, restrained, nothing templated. Your taste gate.
- **`2d-animation-principles`** — invoke prominently for this one. It's the most animation-craft-heavy build: it covers **hold durations**, **TV/limited-animation timing**, run-cycle/idle phrasing, smear, and the "floaty / robotic / snappy" diagnosis — exactly what makes a fighting-game idle + punch loop read as alive. Use it to set the idle hold timing and the snap on the punch, and to judge the source frames. If absent, hand-time the loop and document the holds.
- **`gemini-pixel-image-gen`** — generate the pixel sprite frames (idle + punch). This is the PIXEL skill — **not** the pencil skill. It's the project's own sprite-generation tool (the `four_q` mentions it).
- **`image-generator-prompt-science`** — read for the 7-layer prompt framework when you write the sprite prompt.
- **`design:accessibility-review`** + **`design:design-critique`** — if available, run them as the verification gate (§6); otherwise a manual WCAG AA + design pass.
- Do **not** use `gemini-pencil-animation-image-gen` here (wrong register) or re-run `pm-product-discovery:brainstorm` (metaphor locked in rollout §5). Flag me if you want to reshape the concept.

## 2. The concept (LOCKED — rollout §5)

**"Watch the fighter drift, then lock it."** A small pixel fighter plays its idle/punch loop on the Game Boy's green LCD. One toggle:
- **PIPELINE OFF** → the silhouette **drifts and flickers** frame to frame — the literal bug (identity drift even a pixel or two reads as flicker).
- **PIPELINE ON (ANIMA)** → every frame **locks to one fighter** and the loop runs clean.

The reader sees a defect that's invisible in prose, then sees the fix is the sibling pipeline (Anima). Predict-then-check: the BUT is that *more* frames make drift worse, not better — so the volume can't be brute-forced, it needs a consistency factory. That's why the game is paused (`PIPELINE 47%`, `ON THE SHELF`).

Nicky Case 3-act (rollout §5): open with PIPELINE OFF, the fighter flickering ("something's wrong with this fighter") → climb (name the bug: identity drift = flicker; the BUT: more frames = worse) → close by flipping PIPELINE ON, the loop locks, the dotted "game inherits the pipeline when Anima ships, ~2026-08" arrow resolves.

## 3. The honest mechanic — synthesize the drift, don't generate it

Generate **clean** source frames (one consistent fighter, idle + punch). Both states play the **same source frames**; the toggle just adds or removes a runtime jitter layer:
- **ON** = play the clean frames as-is (a tight, well-held loop).
- **OFF** = apply a small per-frame jitter over the same frames: 1–2px silhouette wander, an occasional stray/missing edge pixel, a subtle palette flip — **identity-bearing** (the fighter subtly becomes a slightly *different* fighter), not random noise. It must read as **flicker**, not chaos or a glitch effect (rollout §11 risk).

This is honest: it shows what drift *looks like* without faking broken art, and ON/OFF share one source so the contrast is purely "consistency on vs off."

## 4. Art — pixel sprite sheet (PIXEL skill, NO keying)

This machine can reach the Gemini API and run npm — generate inline, but **commit the generator**.

- Write `scripts/gen-explainer-16bitfit.sh`, mirroring the shape of `scripts/gen-explainer-runcycle.sh`, but pointing at the **`gemini-pixel-image-gen`** skill's generation script (find it under the anima repo's `.claude/skills/gemini-pixel-image-gen/` — confirm the path, it differs from the pencil skill). Output a **sprite sheet** (a horizontal row of frames: a few idle frames + a punch) to `public/assets/projects/explainers/16bitfit-fighter-sheet.png`.
- **Consistency is the whole point:** one generation must yield the *same fighter* across all frames (the pixel skill's job — and ironically the exact problem Anima exists to solve). Only the pose changes between frames.
- Do **not** run `key-explainer-art.py` — pixel art stays opaque on the LCD. Aspect ratio is whatever fits the sprite row (NOT forced 16:9); the overall explainer stage stays 16:9 via the base, the sheet composites onto the LCD.
- The Game Boy shell: keep the existing `16bitfit.webp` handheld look — reuse/crop it or draw a simple shell in CSS/SVG. The star is the LCD loop + the toggle; don't over-build the shell.

## 5. Build — consume the base, add the LCD loop + toggle

The shared `InteractiveExplainer.astro` base exists and accepts DOM stage content. **Consume it; do not re-extract.**

- Create the **SixteenBitFitExplainer** interaction module: the Game Boy shell + a green LCD region hosting the sprite loop + the PIPELINE OFF/ON toggle + the status chips (`PAUSED` / `PIPELINE 47%` / the inherit arrow).
- Drive the loop with **`requestAnimationFrame`** stepping the sprite sheet (background-position or canvas) at a fixed fps with `2d-animation-principles` hold timing — native, no library. The drift jitter (§3) is applied per-frame only when OFF.
- Register the variant in `ExplainerGraphic.astro`'s registry; set `explainer.interactive: 16bitfit` in the mdx; keep the static `src` as fallback.
- **Color-as-actor:** the Game-Boy green LCD is the register; `PAUSED` stays `--stamp-amber`; PIPELINE ON resolves to `--success-teal` on the status chip. Flat, sharp.
- **No Rough.js** here (pixel register — the installed dep stays unused in this island).

## 5b. Licensed-Infinite-Motion + performance (load-bearing)

This is the only looping explainer, so motion discipline is the gate, not an afterthought:
- The loop runs **only while in view AND the toggle invites it** — pause it via `IntersectionObserver` when off-screen, and respect a sensible default (consider starting paused-on-a-frame with a clear "play / pipeline off" affordance, so nothing flickers unbidden the moment the band scrolls into view).
- **Reduced-motion** → render a **single locked frame** (no loop, no jitter), not the animated drift. The toggle may still flip the static comparison, but nothing animates.
- The loop must be cheap (small sheet, rAF, no layout thrash) — a nice meta-touch: the explainer respects the very 60fps-on-a-mid-range-phone constraint the project is paused over.

## 6. Verify — do NOT claim done until these pass

- `npm run dev` → `/work/16bitfit` renders the interactive Game Boy; `npm run build` is clean.
- **No-JS:** the static `16bitfit.webp` shows, the final state is honest.
- **Reduced-motion:** a single locked frame, no loop, no jitter; the toggle (if present) changes state without animating.
- **Keyboard + SR:** the PIPELINE toggle is a real focusable control with a clear label ("Pipeline off / on"); state is announced; focus ring present.
- **CLS:** the stage reserves height before paint.
- **Performance:** the loop pauses off-screen (IntersectionObserver) and when toggled off; no runaway rAF; no jank on a mid-range profile.
- **Bundle check:** no new libraries shipped for this island (sprite loop is native).
- Run `design:accessibility-review` (or a manual WCAG AA pass) — contrast on the green LCD text + the amber/teal chips in both light/dark host contexts.
- **Regression:** the other four explainers are unchanged in behavior; the base is untouched (it already supports the DOM stage).
- **Drift legibility (the craft gate):** the OFF state reads as *flicker/identity-drift*, not random glitch — confirm with me on the prototype before the full build.
- **Kill switch:** if anything forces hiding the toggle or shipping passive output, stop and tell me.

## 7. Wrap

- Update `docs/specs/interactive-explainer-rollout-v1.md` (mark 16BitFit built in the §8 build-status block — that completes the rollout) and add a `CHANGELOG.md` entry (read its "How to add an entry" header first). Follow the spec/CHANGELOG conventions in `CLAUDE.md`.
- With all four built, the rollout's §11 note applies: fold a one-line "case-study explainers are interactive" mention into the case-study spec, and flag that the **Code Brain polish pass** (deferred, rollout §8 build status) is now the next item.
- **Do not touch the other four explainers** — stay scoped to 16BitFit. Leave the sprite sheet reproducible via the committed `gen-explainer-16bitfit.sh`.

Plan first, including the drift prototype. Wait for my approval before the full build.
