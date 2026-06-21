# Interactive Explainer Rollout — explainers 2–5 (v1)

**Status:** plan / rollout map (companion to [`interactive-explainer-pattern-v1.md`](interactive-explainer-pattern-v1.md) + [`interactive-explainer-tooling-research-v1.md`](interactive-explainer-tooling-research-v1.md))
**Date:** 2026-06-20
**Surface:** the case-study explainer slot (`/work/<slug>`, between the 4Q and Methods bands)
**Scope:** the four un-piloted explainers — `code-brain`, `intent-engineering-mcp`, `the-block`, `16bitfit`. The `animation-pipeline` pilot is shipped (see the pattern doc).
**Process:** `pm-product-discovery:brainstorm` (mode: ideas, existing) → convergence elicitation → this map.

This doc is the canonical plan for rolling the interactive-explainer pattern across the remaining four case studies. It exists so a future session can pick up any one project and build it without re-deriving the metaphor. Read it after the pattern doc.

---

## 0. Decisions locked in this session

- **Build all four** (this doc maps the full set before any one is built).
- **Vary the interaction per project.** Each explainer gets the interaction shape its system *wants* — not one reused scrub. The variety is a feature: it's the anti-template thesis applied to the explainer band itself.
- **Tooling to install:** the official **`frontend-design`** skill + **Rough.js / rough-notation** (used surgically, §7). Everything else from the research doc stays on the skip list.
- **Build order:** Intent MCP → Code Brain → The Block → 16BitFit (§8). Generalize the shared scaffold *during* Intent MCP, before the third build.

---

## 1. The principle carried forward

Every rule from the pattern doc still holds. The four non-negotiables for each new explainer:

1. **Dramatize *this* system, not generic motion.** The reader manipulates the thing the project is *about* — the night shift, the spec, the repetition, the drift. If the interaction would fit any project, it's wrong.
2. **Predict-then-check** (Distill). Each interaction should let the reader form a guess and test it live. That's where comprehension comes from — not from decoration.
3. **Reader agency, never autoplay** (Kosara). A stepper/slider/toggle the reader drives — never scroll-jacking, never a passive video. This is *why* hyperframes was rejected.
4. **The existing static `.webp` is the floor.** No-JS and `prefers-reduced-motion` render the already-shipped static diagram (the honest final state). Interactivity is pure progressive enhancement layered on top — it never gates the meaning.

**Script each one with Nicky Case's 3-act pattern** before building: open with a concrete draggable moment the reader cares about (🤔) → climb the ladder of abstraction one BUT/THEREFORE beat at a time → close on the resolved state. Each per-project section below carries its 3-act script.

**One craft note that shapes the art strategy:** the run-cycle worked as a *single keyed raster sheet* because the only thing that changed was a left-to-right reveal. The four new metaphors all change *state* (time of day, score, hours, identity), so each splits into a **pre-rendered static base** (Nano Banana, keyed — the parts that don't change) **+ a thin dynamic layer** (SVG/CSS/JS — the parts that do). That split is called out per project.

---

## 2. Code Brain — "Drag the night"

**Status: BUILT 2026-06-21.** Shipped the radial night-dial. The reader sweeps a "now" hand dusk → dawn: a note-card rides a CSS `offset-path` ARC (CAPTURE → SYNTHESIZE, eased spacing + holds, never linear), the five nodes light teal as the hand passes, the two-critic gate REJECTS one card (drops out, `--ink-secondary` ✗) while the survivor is APPROVED (`--success-teal` ✓) into the VAULT, and at dawn an `--amber-mid` wash sweeps in, an SVG sun rises, and 08:30 + a masthead strip print — the same 08:30 the Daily Driver writes at the top of this portfolio. Geometry calibrated against the live render (ring center 810,516 · R 325 · on-ring glow R 56; re-calibrated 2026-06-21 — see CHANGELOG); the hand auto-tracks the card and stops at the active node's inner edge. Component: [`CodeBrainExplainer.astro`](../../src/components/case-study/CodeBrainExplainer.astro). **Art follows the §4 generate-then-key pipeline:** [`scripts/gen-explainer-codebrain.sh`](../../scripts/gen-explainer-codebrain.sh) regenerates the dial as warm-graphite line art on a flat off-white field — reference-locked to the original dial so the layout (and the geometry) is preserved and the labels stay legible — then [`scripts/key-explainer-art.py`](../../scripts/key-explainer-art.py) `--no-trim --resize 1672x941 --paper-pct 85` (three flags added this build) maps it to a transparent WebP that composites on the real cream paper with no card/halo. (The first pass reused the shipped *colored* dial, but it carried a hard white-box background + keying noise that read as sloppy on cream — regenerating + keying was the fix.) **Deviations that remain:** note-cards travel as native SVG (not keyed sprites), via CSS `offset-path` + `offset-distance`, de-risked first per §10 (a swept-hand + one-card prototype confirmed the arc before the full loop). Color returns as the live layer — teal node glows + hand; the dawn `--amber-mid` wash, sun, 08:30, masthead. [`scripts/prep-explainer-codebrain.py`](../../scripts/prep-explainer-codebrain.py) erases the dawn cluster to transparent → `code-brain-dial.webp` (the interactive base). Rough.js unused. Reduced-motion / no-JS falls back to the keyed static `code-brain.webp`. Verified: `npm run build` clean (34 pages); Playwright progressive-enhancement check 9/9 (interactive + `aria-label` normally, static dial + hidden scrubber under reduced-motion and no-JS); shared base + sibling explainers untouched (no regression); nothing autoplays. Tooling note: `2d-animation-principles` + `frontend-design` were applied; `design:accessibility-review`/`design:design-critique` are not installed, so the a11y pass was manual.

**System it dramatizes:** the overnight loop. While Sean sleeps, the fleet turns the day's notes into vetted concepts by 08:30 (`four_q.what` / `break`). The static explainer already draws this as a clock dial: NOTES IN (moon, figure asleep) → CAPTURE → SYNTHESIZE → fork to two CRITICs that rejoin → VAULT → 08:30 sunrise hands a newspaper strip back to the human.

**The metaphor — what the reader manipulates:** the dial becomes draggable. The reader sweeps a "now" hand from dusk → dawn. As night advances: raw note-cards get pulled off the desk into CAPTURE → SYNTHESIZE → forked through the two CRITICs (the reader *watches one reject and one approve*) → the survivors land in the VAULT as vetted concepts. At dawn the sun rises and the **08:30 newspaper prints — the same dateline strip running at the top of this very portfolio.** The reader performs the night shift the fleet runs unattended.

**Interaction shape:** **radial / time scrub** (a dial, deliberately *not* the run-cycle's horizontal wipe). This is the variety payoff — the first thing a reader meets after the run-cycle is a fundamentally different gesture.

**Nicky Case 3-act:**
- *Open 🤔:* the dial sits at dusk, one note-card on the desk, the human asleep. "Drag the night forward."
- *Climb:* each hour-step moves a card one stage; the two-critic fork is the BUT (not everything survives — one card gets rejected); THEREFORE only vetted concepts reach the vault.
- *Close:* dawn, the vault full, the 08:30 newspaper prints and ties back to the page the reader is on.

**Art plan:** pre-render the dial face, the moon/sun, the asleep-at-desk figure, and the stage labels as one keyed graphite sheet (Nano Banana pencil skill → `key-explainer-art.py`, exactly like the run-cycle). The **dynamic layer** is SVG/CSS: the sweeping hand (live SVG line), node states lighting teal as the hand passes, 2–3 small keyed note-card sprites tweened along the loop path, a dawn color-wash overlay (CSS), and the newspaper fade-in near `t≈1`. Rough.js is *optional* here — only if the swept hand or a callout reads better hand-drawn than a clean SVG stroke.

**Color-as-actor:** night ink/teal → dawn `--stamp-amber` wash; the two critics use `--teal` (approve) vs `--ink-secondary` (reject); the vault/payoff lands on `--success-teal`.

**a11y / reduced-motion:** range input drives the hand (keyboard-operable); reduced-motion + no-JS render the static `code-brain.webp` dial. `alt` already exists in frontmatter.

**Complexity: HIGH** (radial path animation + cards traveling a curve is the hardest of the four). Consider building it *third* in skill terms even though it's listed second by priority — see §8.

---

## 3. Intent Engineering MCP — "Tighten the spec, watch the score"

**Status: BUILT 2026-06-20.** Shipped as specced — the slider resolves the scribble card into the 9-section checklist, climbs the live AUDIT score 7/25 → 23/25 (recoloring `--ink-secondary` → `--teal` → `--success-teal`), checks land one at a time, the agent glyph stays *wrong* until the spec is tight (flips at t≈0.8), and **rough-notation** draws a `--stamp-amber` circle on `23/25` at the top. Art: one Gemini graphite sheet (`scripts/gen-explainer-intent.sh`) cropped + keyed into four registered pieces (`intent-engineering-mcp-{vague,checklist,agent-wrong,agent-right}.webp`) via `key-explainer-art.py --crop`. Component: [`IntentExplainer.astro`](../../src/components/case-study/IntentExplainer.astro). The shared scaffold was extracted in this build (§6). The score is live `aria-live` text; reduced-motion / no-JS falls back to the static `intent-engineering-mcp.webp`; `rough-notation` lazy-loads to this island only. Verified: `npm run build` clean, Playwright shots across the slider, pilot regression intact.

**System it dramatizes:** the product's whole argument — most agent failures are *intent* failures, not reasoning failures; a vague spec makes the agent confidently build the wrong thing. The MCP audits a spec against a 9-section template and scores it (`four_q.what` — "point its audit at its own spec and it scores 23 out of 25"). The static explainer draws VAGUE SPEC → AUDIT/SCAFFOLD/TRIAGE → clean checklist + 23/25 → agent runs the right thing.

**The metaphor — what the reader manipulates:** one slider labeled **spec quality** (vague → tight). Drag right and three things move together: the scribbled note-card resolves into the 9-section checklist (sections check off one at a time), the AUDIT score climbs ~7/25 → 23/25, and the agent glyph at the end flips from building-the-wrong-thing (a wonky output) to building-the-right-thing. The reader *feels* that intent quality — not model smarts — decides the outcome.

**Interaction shape:** **quality slider with a live-reacting score + outcome.** Same WAAPI/`range` core as the run-cycle, so it's the right place to *extract the shared scaffold* (§6). A number that moves on drag is the most recruiter-legible interaction on the site.

**Nicky Case 3-act:**
- *Open 🤔:* slider at the left, a scribbled spec, score 7/25, the agent producing garbage. "Tighten the spec."
- *Climb:* each notch checks off a template section (the BUT: the agent's output is still wrong at mid-score — structure isn't done yet); THEREFORE only near the top does the outcome flip.
- *Close:* 23/25, checklist complete, agent builds the right thing — rough-notation circles the score.

**Art plan:** pre-render two end-state cards (vague scribble; clean 9-section checklist) + two tiny agent-output glyphs (wrong; right), all keyed graphite. The **dynamic layer**: cross-fade the cards on the slider, reveal the section checkmarks progressively (CSS mask or live SVG checks), a JS counter for the score, and **rough-notation** for the draw-on circle/underline around `23/25`. This is the cleanest mid-complexity build and the best first target.

**Color-as-actor:** the score climbs `--ink-secondary` → `--teal` → `--success-teal`; the AUDIT stamp uses `--teal`; the wrong→right agent flip ends on `--success-teal`. Amber reserved for the rough-notation score circle.

**a11y / reduced-motion:** the score must be live text (screen-reader reads it, not just a drawn number); range carries an `aria-label`; reduced-motion + no-JS render the static `intent-engineering-mcp.webp` (already shows the 23/25 end state).

**Complexity: MEDIUM** (slider + counter + cross-fade; reuses the most from the run-cycle).

---

## 4. The Block — "Automate the week, get the hours back"

**Status: BUILT 2026-06-21.** Shipped the toggle-to-automate switchboard — the first DOM/stateful explainer (the cards toggle, so they can't be a baked raster). Four task cards (DEAL HANDOFF, STATUS UPDATES, CLIENT SETUP, COURSE LAUNCH), each a real `<input type="checkbox">` styled as a switch. Flip one → its recurring-loop glyph fades (the manual repetition, engineered away), a route draws to its human-gated tool, the gate ✓ pops `--teal` AND STAYS LIT (the structural honesty: AI took the repetition, a human still signs off), and the HOURS BACK readout fills. **Rough.js held up** (the §11 authenticity risk did not materialize): a one-card spike was rendered + Sean-approved at the **V1/moderate** register (`roughness 1.15`, `bowing 1.0`, `strokeWidth 1.6`, fixed seed, `stroke: currentColor` so the card/tool CSS recolors boxes on toggle without a redraw) before the other three were built; it reads as drawn graphite, not "filter-y," so the keyed-pencil-art fallback was **not** needed. The counter is honest by construction (Sean-confirmed): the climbing number is a literal `N / 4 ENGINEERED` count, and the only asserted figures — `~3 HRS / DEAL` (DEAL HANDOFF) and `~6 HRS / WEEK` (the three Claude Skills together) — ink on only when their backing tasks are all engineered; **no invented per-task hours** (a `n / 3 skills` progress shows until the ~6/week aggregate resolves). **rough-notation** draws one `--stamp-amber` underline on `~6 HRS / WEEK` at the all-four close (lazy-loaded, this island only). Component: [`TheBlockExplainer.astro`](../../src/components/case-study/TheBlockExplainer.astro). **No raster, no generator, no keying** — the cards are live DOM + Rough.js per §4/§9. **Base addition (regression-safe):** the shared [`InteractiveExplainer.astro`](../../src/components/case-study/InteractiveExplainer.astro) `scrub` prop is now optional (the `.ie-scrub` range block only renders when passed) so a checkbox-driven island needs no fake range — the three existing explainers all pass `scrub`, so their output is unchanged; [`interactive-explainer.ts`](../../src/scripts/interactive-explainer.ts) gained an additive `enableInteractive()` / `prefersReducedMotion()` (the `is-interactive` opt-in for control-driven islands; `wireScrubber` untouched). **Reduced-motion deviation from the other three (Sean-confirmed):** because this interaction is *discrete state*, not continuous motion, reduced-motion keeps the switchboard fully operable with instant, un-tweened state changes (all motion is CSS-gated behind `@media (prefers-reduced-motion: no-preference)` + a `.tb-has-motion` class) rather than falling back to the static `.webp` — more accessible than hiding a discrete control. **Verified in-session:** `npm run build` clean (34 pages); live render (Chrome headless) of the initial all-off, the all-four close (gates lit + amber payoff + rough-notation underline), the **no-JS** fallback (scripts-disabled iframe → static `the-block.webp`, the honest final state), and **reduced-motion** (live switchboard, not static); roughjs / rough-notation ship only via the the-block island's module graph (no other page's HTML pulls them); the `animation-pipeline` / `intent-engineering-mcp` / `code-brain` explainers still ship their `.ie-range` scrubber unchanged (no regression); WCAG AA holds (cards `--ink` 16.6:1, gate `--teal` 11.3:1, hours `--stamp-amber` 9.0:1, dim `--ink-secondary` 5.2:1, all on cream); nothing autoplays (the recurring-loop glyph is a static icon, not a 4th licensed infinite animation). Tooling: `frontend-design` + `2d-animation-principles` applied (toggle anticipation→settle, gate overshoot pop, eased reveals); `design:accessibility-review` not installed → manual WCAG AA pass.

**System it dramatizes:** repetitive PM work engineered into human-gated tools that gave the team hours back (`four_q.break` — "~3 hrs/deal," "~6 hrs/week"). The static explainer draws four repeating task cards → ENGINEERED INTO TOOLS (3 skills + RevOps, human-review gates) → BACK TO THE TEAM with the hour figures.

**The metaphor — what the reader manipulates:** the funnel becomes a switchboard. Each of the four repetitive task cards (DEAL HANDOFF, STATUS UPDATES, CLIENT SETUP, COURSE LAUNCH) has a toggle. Flip one → it routes through its human-gated tool (the gate checkmark lights teal), its manual hours drain, and a **HOURS BACK** counter fills toward ~6 hrs/week and ~3 hrs/deal. Flip all four → "the PM stops being the bottleneck." The reader makes the engineer-it-away call task by task.

**Interaction shape:** **toggle-to-automate with a filling counter.** A fourth distinct gesture (not scrub, not dial, not quality slider). The honesty is built in: the **human-review gate stays lit** on every automated task — the reader can see this isn't "AI replaced the work," it's "AI took the repetition, a human still signs off."

**Nicky Case 3-act:**
- *Open 🤔:* four cards looping manually, HOURS BACK at 0. "Flip a task to engineer it away."
- *Climb:* each toggle drains that card's hours and fills the counter (the BUT: the human-review gate stays required — automation isn't abdication); THEREFORE the time returns without dropping the customer-facing check.
- *Close:* all four automated, counter full, the bottleneck gone.

**Art plan:** the cards are *stateful*, so build them as **DOM/SVG**, not a pre-rendered raster (a baked PNG can't toggle). Skin them with **Rough.js** so the boxes read as hand-drawn graphite (this is where Rough.js earns its install). The toggles are styled checkboxes; the hour drain + counter are JS; the gate checkmark is an SVG that fills teal. `roughViz` is *not* needed — there's no chart, just counters.

**Color-as-actor:** task cards in `--ink`; the human-review gate badge in `--teal`; the HOURS BACK payoff counter in `--stamp-amber` (the metric, like the static diagram).

**a11y / reduced-motion:** toggles are real checkboxes (keyboard + screen-reader native); the counter is live text; reduced-motion + no-JS render the static `the-block.webp`.

**Complexity: MEDIUM** (mostly DOM state + Rough.js skin; least raster work of the four).

---

## 5. 16BitFit — "Watch the fighter drift, then lock it"

**System it dramatizes:** the reason the game is paused — the fight loop needs a sprite that stays the *same fighter* across hundreds of frames, and identity drift "even a pixel or two" reads as flicker; that's the exact problem the sibling pipeline (Anima) exists to solve (`four_q.what` / `break`). The static explainer draws the shelved Game Boy → brick wall (NEEDS HUNDREDS OF CONSISTENT FRAMES) → ANIMA conveyor → frames inherited later.

**The metaphor — what the reader manipulates:** a small sprite plays the fighter's idle/punch loop on the Game Boy screen. One toggle: **PIPELINE OFF** → the silhouette drifts and flickers frame to frame (the literal bug — pixels wander, the fighter subtly changes). **PIPELINE ON (ANIMA)** → every frame locks to one fighter and the loop runs clean. The reader *sees* a defect that's invisible in prose, then sees the fix.

**Interaction shape:** **a toggle that switches a looping animation broken ↔ fixed** — the only continuous-playback explainer. It must obey the Licensed-Infinite-Motion rule: the loop runs only while the toggle is engaged / in view, and reduced-motion shows a single locked frame.

**Nicky Case 3-act:**
- *Open 🤔:* the fighter loops with PIPELINE OFF — it flickers. "Something's wrong with this fighter."
- *Climb:* name the bug (identity drift = flicker) — the BUT is that more frames make it *worse*, not better; THEREFORE the volume can't be brute-forced, it needs a consistency factory.
- *Close:* flip PIPELINE ON — the loop locks; the dotted "game inherits the pipeline when Anima ships" arrow resolves.

**Art plan:** **pixel-art register, not graphite** — a deliberate, authentic medium switch (this project *is* pixel art). Generate a tiny sprite sheet (idle + punch frames) via the **pixel-art Gemini skill** (`gemini-pixel-image-gen`), not the pencil skill — so this one does *not* use `key-explainer-art.py`. The **dynamic layer**: a `requestAnimationFrame` stepper over the sprite sheet; OFF = per-frame jitter (small random offset/scale + an extra stray pixel) to simulate drift/flicker; ON = the clean fixed loop. The "drift" sim is the craft risk — it must read as *flicker*, not chaos (subtle, 1–2px).

**Color-as-actor:** the Game-Boy green LCD is the register here; PAUSED stays `--stamp-amber`; the PIPELINE ON state resolves to `--success-teal` on the status chip.

**a11y / reduced-motion:** the toggle is a real control with a clear label ("Pipeline off / on"); reduced-motion + no-JS render the static `16bitfit.webp` (locked state). Continuous motion is gated behind the toggle and paused when off-screen.

**Complexity: MEDIUM** (sprite-sheet generation + rAF stepping; the only one needing a pixel sheet).

---

## 6. The shared scaffold (LANDED 2026-06-20, during build #2)

**Done.** Extracted during the Intent MCP build, as planned. What shipped:
- [`InteractiveExplainer.astro`](../../src/components/case-study/InteractiveExplainer.astro) — the base: wrapper + CLS-safe `.ie-stage` (aspect-ratio via prop) + default `<slot/>` for stage layers + the optional `.ie-zones` row (`{label, sublabel, token}[]` prop) + the `.ie-scrub` block (`title/hint/ariaLabel/ticks` props, hidden until `.is-interactive`) + the amber `:focus-visible` ring. Shared classes renamed `.api-*` → `.ie-*`; the base styles only base-rendered elements (slotted layers keep the per-project scope, so layer CSS + any `is-interactive` layer-reveal rule wrap the ancestor in `:global()`).
- [`src/scripts/interactive-explainer.ts`](../../src/scripts/interactive-explainer.ts) — `easeInOut(x)` + `wireScrubber(root, render, opts)` (the reduced-motion gate, `is-interactive` opt-in, range wiring, track fill, initial paint). Mirrors the `teaser-swiper.js` shared-module precedent.
- [`ExplainerGraphic.astro`](../../src/components/case-study/ExplainerGraphic.astro) — the hardcoded `=== "animation-pipeline"` branch is now a null-guarded registry (`INTERACTIVE` map, slug → component); an unknown `interactive:` value degrades to the static `<img>`.
- The pilot ([`AnimationPipelineExplainer.astro`](../../src/components/case-study/AnimationPipelineExplainer.astro)) was refactored to consume the base, **behavior-identical** (verified by build-output diff + Playwright). To add explainer #3: import it, add one registry entry, set `explainer.interactive` in the mdx.

The original plan follows.

`AnimationPipelineExplainer.astro` is currently hard-wired to one project (one asset path, fixed labels, the horizontal mask). The four metaphors have *different interaction shapes*, so "collapse everything into one component" (pattern doc §11.5) is the wrong read. The right read: **extract the shared chrome into a base, keep the interaction per-project.**

**Extract into `InteractiveExplainer.astro` (the base):**
- the `.explainer-interactive` wrapper + CLS-safe `.api-stage` aspect-ratio reservation
- the **progressive-enhancement contract**: `is-interactive` class only added by JS, `prefers-reduced-motion` early-return, static `.webp` as the no-JS/reduced-motion floor
- the scrubber/affordance styling (`--font-mono` labels, the range thumb, `:focus-visible` amber ring, hint text)
- the label-zone row (HUMAN/FLEET/SHIP → generalized to 2–3 `{label, sublabel, token}` props)
- the a11y wiring (alt on the meaningful layer, `aria-hidden` on decoration, `aria-label` on the control)

**Keep per-project (a small interaction module each):**
- the dynamic layer and its `render(t)` / `toggle(state)` logic (dial sweep, score counter, hours counter, sprite stepper)
- the art asset(s) and any Rough.js / pixel-sheet specifics

**Wiring:** `ExplainerGraphic.astro` already branches on `explainer.interactive === "animation-pipeline"`. Generalize that to a small registry that maps the `interactive` frontmatter key → the project's interaction component, all sharing the base. Each project's `.mdx` sets `explainer.interactive: <slug>` (the static `src` stays as alt source + fallback, unchanged).

**Sequencing:** do the extraction *during* the Intent MCP build (build #2), because Intent reuses the most from the run-cycle (slider + reveal). Don't refactor speculatively before then.

---

## 7. Tooling — what to install and where it's used

Both confirmed for install this session. Use them surgically; the run-cycle proved most of the work is native.

| Tool | Install | Used for | Not used for |
|---|---|---|---|
| **`frontend-design` skill** (official, `anthropics/claude-code` plugins) | Claude Code: add the plugin, then it auto-loads on frontend work | Taste + motion-restraint discipline on *every* build — CSS-first, one orchestrated reveal, no AI-slop motion. Highest leverage, $0. | n/a — it's discipline, not a library |
| **Rough.js** (`npm i roughjs`, MIT, <9kB) | portfolio `package.json` | The **dynamic graphite** parts that can't be pre-rendered: The Block's stateful task cards; optionally Code Brain's swept hand. | Anything that *can* be pre-rendered (the run-cycle, Intent's end-state cards, Code Brain's dial face) — keep doing Nano Banana, it's more authentic |
| **rough-notation** (`npm i rough-notation`, MIT, ~3.8kB) | portfolio `package.json` | Draw-on graphite **callouts**: circling Intent's `23/25`, underlining a payoff number on The Block. | Decorative annotation everywhere — one callout per explainer, max |

**Keep (already have, $0):** WAAPI + `stroke-dashoffset` for any scrub/draw; CSS `mask-image` for reveals; the `key-explainer-art.py` luminance keyer for all pencil art.

**Confirmed skip list** (research doc §4): hyperframes (passive video), GSAP / Three.js / Lenis (banned + heavy + template-y), Lottie (After-Effects pipeline), Rive (200kB + editor authoring), Theatre.js (maintenance limbo), Figma MCP (import-only), `roughViz` (pulls D3 — draw the few counters by hand), CSS Scroll-Driven Animations (not Baseline until ~2026; `@supports`-gate only if ever).

**One install caveat to verify at adoption:** confirm Rough.js + rough-notation tree-shake cleanly in the Astro 5 build and add no runtime weight to pages that don't use them (they should only ship in the islands that import them). Check the bundle after wiring The Block.

---

## 8. Build order + effort

| # | Project | Why this slot | Interaction | Complexity | New art |
|---|---|---|---|---|---|
| 1 | **Intent MCP** ✅ BUILT 2026-06-20 | Top job-hunt leverage (the AI-PM proof); a moving score is the most recruiter-legible interaction; reuses the most from the run-cycle → the natural place to extract the shared scaffold | quality slider + live score | MEDIUM | 2 keyed cards + 2 agent glyphs |
| 2 | **Code Brain** | Loops the payoff back to the live page (08:30 dateline); high narrative value; ACTIVE + order 2 | radial/time dial scrub | HIGH | keyed dial + figures + card sprites |
| 3 | **The Block** | Clearest ROI numbers; least raster work (DOM + Rough.js); proves the Rough.js path | toggle + hours counter | MEDIUM | Rough.js (no raster) |
| 4 | **16BitFit** | Lowest-priority project (PAUSED); only one needing a pixel sheet; most fun, can wait | broken↔fixed loop toggle | MEDIUM | pixel sprite sheet |

Note the priority/skill tension on Code Brain: it's #2 by value but the hardest to build. If the dial fights back, swap it with The Block (#3) and ship the two MEDIUM builds first.

**Build status (updated 2026-06-21):**

- **Intent MCP — built.** Shared `InteractiveExplainer` scaffold landed here.
- **Code Brain — built, pending polish.** Functional and shipped, but needs a round of minor tweaks to reach the bar (specifics to be enumerated when we return). **Deferred on purpose: finish The Block + 16BitFit first, then circle back to the Code Brain polish pass.** Do not re-open Code Brain mid-rollout.
- **The Block — built (2026-06-21).** Toggle-to-automate switchboard; Rough.js held up at the V1/moderate register (no pencil-art fallback needed); honest counter (literal task count + real-only hour reveals); shared base gained an optional `scrub` + `enableInteractive()` for control-driven islands; reduced-motion keeps live toggles (instant) rather than the static fallback. See §4.
- **16BitFit — built (2026-06-21). Rollout complete.** "Watch the fighter drift, then lock it": a CSS/SVG Game Boy with a live LCD jab loop (canvas + `requestAnimationFrame`, no library) and a `PIPELINE OFF/ON` toggle. The honest mechanic held — ON and OFF play the *same* source frames; OFF adds a runtime jitter layer (1–2px silhouette wander + a stray/missing edge pixel + an occasional DMG-green-band flip) so the fighter subtly becomes a slightly different fighter (identity drift = flicker), Sean-approved on a de-risk prototype before the build (§11 craft gate). Art is a **pixel sprite sheet** via the PIXEL skill (`gemini-pixel-image-gen`), not pencil — and not keyed (opaque). Reality check on §5's "tiny sprite sheet": a single 6-in-a-row generation crowded/clipped the punch and stayed guard-heavy, so the pipeline is **per-frame, reference-locked** (a COCKED anchor + MID + EXTENDED, `--reference` for identity) assembled into 3 even cells the loop plays out-and-back as a jab — the model's reliable ceiling is ~3 distinct punch poses, which is itself the consistency gap Anima exists to close. Color-as-actor: PAUSED / PIPELINE 47% / ON THE SHELF stay `--stamp-amber` (the game is shelved regardless of the toggle); flipping ON resolves the dotted inherit arrow to `--success-teal`. Licensed-Infinite-Motion honored: the loop runs only while in view (IntersectionObserver) and reduced-motion renders a single locked frame. Bundle stays isolated (no Rough.js in this island). See §5; generator `scripts/gen-explainer-16bitfit.sh` + `scripts/normalize_16bitfit_sheet.py`.

**With all four built, the rollout is done. Follow-ups (§11):** a one-line "case-study explainers are interactive" note is now folded into [`case-study-spec-v1.md`](case-study-spec-v1.md); the deferred **Code Brain polish pass** (built-pending-polish above) is the next item.

---

## 9. Per-project asset pipeline (the generate-locally → key-in-session split)

The sandbox can't reach the Gemini image API (pattern doc §6). Each pencil explainer gets its own committed generator script, run **locally** by Sean, output to the mounted assets folder, then keyed + wired in-session.

| Project | Generator to add | Skill | Keyer |
|---|---|---|---|
| Intent MCP | `scripts/gen-explainer-intent.sh` | `gemini-pencil-animation-image-gen` | `key-explainer-art.py` |
| Code Brain | `scripts/gen-explainer-codebrain.sh` | `gemini-pencil-animation-image-gen` | `key-explainer-art.py` |
| The Block | *(none — DOM + Rough.js, no raster)* | — | — |
| 16BitFit | `scripts/gen-explainer-16bitfit.sh` | `gemini-pixel-image-gen` (pixel, **not** pencil) | *(none — sprite sheet stays opaque)* |

Each generator mirrors `gen-explainer-runcycle.sh`: a verbatim committed prompt, `--aspect-ratio 16:9` (pencil) or the sprite-sheet layout (pixel), output into `public/assets/projects/explainers/<slug>-*.{png,webp}`, re-rollable.

---

## 10. Verification gates (every build)

Same as the pattern doc §12 + tooling research §5:

1. `npm run dev` → the case-study route renders the interactive figure (sandbox can't run the live build — this is a Sean-machine check).
2. **Reduced-motion + no-JS:** the static `.webp` shows, the control is hidden, the final state is the honest one.
3. **CLS:** the stage reserves height before paint (`aspect-ratio`).
4. `design:accessibility-review` — control labels, focus ring, live-text for any number, color-contrast on the new color-as-actor beats.
5. **Bundle check** (after The Block): Rough.js / rough-notation ship only in their islands.
6. **Kill switch (unchanged):** if any build means hiding the control or shipping passive video where the interactive figure was, stop — it breaks the thesis.

---

## 11. Open questions / risks

- **Code Brain dial is the craft risk** — radial path animation + cards traveling a curve is genuinely harder than a linear scrub. De-risk by prototyping the swept-hand + one card on the path before committing the full loop.
- **16BitFit "drift" must read as flicker, not chaos** — the jitter has to be subtle (1–2px) and *identity-bearing* (the fighter subtly becomes a different fighter), or it looks like a glitch rather than the specific bug.
- **Rough.js authenticity** — generated rough may read less authentic than Nano Banana pencil. Trial it on The Block first; if it looks "filter-y," fall back to pre-rendered card states + DOM counters.
- **Scaffold timing** — resist extracting the base until Intent MCP is built; one concrete second example beats a speculative abstraction.
- **Master-plan / blueprint pointers** — this is a rollout *plan*, not a locked surface spec, so it's filed alongside the pattern + tooling research docs. If/when the rollout completes, fold a one-line "explainers are interactive" note into the case-study spec.
- **Code Brain polish pass (deferred 2026-06-21)** — the Code Brain explainer shipped but needs minor tweaks before it's at the bar. Held until The Block + 16BitFit are built, then a dedicated polish pass enumerates and fixes the tweaks. Tracked in §8 build status.
