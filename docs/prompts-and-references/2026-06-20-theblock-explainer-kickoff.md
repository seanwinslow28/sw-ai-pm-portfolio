# Claude Code kickoff — The Block interactive explainer

> Paste everything below the line into a fresh Claude Code session opened at the
> repo root: `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. It plans then
> builds the **fourth** interactive case-study explainer. `frontend-design` is
> installed. Start in plan mode.
>
> Prereq: the Intent MCP build landed the shared `InteractiveExplainer.astro`
> base and the `roughjs` / `rough-notation` deps. This build CONSUMES that base.
> **This is the explainer where Rough.js earns its install** — and the first one
> whose art is *live DOM*, not pre-rendered pencil. There is NO generator script.

---

You are working in the `sw-ai-pm-portfolio` repo (Astro 5 + Tailwind 4). Build the **The Block** interactive case-study explainer, following the pattern set by the shipped `animation-pipeline`, `intent-engineering-mcp`, and `code-brain` builds. **Start in plan mode: read everything in §0, then show me (a) a single Rough.js card rendered in the graphite register as an authenticity check, (b) the interaction model, and (c) the full file list, and wait for my approval before building all four cards.**

## 0. Read these first (in order)

1. `docs/specs/interactive-explainer-rollout-v1.md` — the rollout plan. Your build is **§4 (The Block)**. Also read §6 (shared scaffold — already built), §7 (tooling — Rough.js note), §10 (verification), and §11 (the Rough.js authenticity risk + fallback).
2. `docs/specs/interactive-explainer-pattern-v1.md` — the pilot + the interaction / progressive-enhancement contract (§8) and design-system fit (§9). (You will NOT use the art-generation/keying pipeline this time — see §4.)
3. `src/components/case-study/InteractiveExplainer.astro` — the shared base you consume. Read it + the existing interaction modules (`AnimationPipelineExplainer`, the Intent module, the Code Brain module) as worked examples.
4. `src/content/work/the-block.mdx` — the project's `four_q` + the existing `explainer:` block. Its `alt` is your alt-text source; the static `src` (`the-block.webp`) is your reduced-motion / no-JS fallback. **The real numbers live in `four_q.break`** — use them (don't invent).
5. `DESIGN.md` + `PRODUCT.md` — tokens and the rules: color-as-actor, flat/sharp (no shadows/gradients), `--ease-out`, the Licensed-Infinite-Motion rule, reduced-motion, WCAG AA, the stack bans.

## 1. Skills to invoke (and when)

- **`frontend-design`** (installed) — invoke for the component build. CSS-first, restrained motion, nothing templated. Your taste gate.
- **`2d-animation-principles`** — invoke for the *quality of the state transitions*: the toggle should have a touch of anticipation + settle (not a hard snap), the hours-drain and the counter-fill want eased timing (slow-in/slow-out), and the gate checkmark wants a small secondary-action pop. This is what separates a crisp switchboard from a janky one. If absent, hand-roll the easing from the pilot's `easeInOut`.
- **`image-generator-prompt-science`** + **`gemini-pencil-animation-image-gen`** — likely **not needed** here (the art is live DOM + Rough.js, not a keyed raster). Reach for them only if you decide one small pre-rendered pencil accent (e.g. a tiny desk/figure motif) reads better than a Rough.js shape — and flag me if you do.
- **`design:accessibility-review`** + **`design:design-critique`** — if available, run them as the verification gate (§6); otherwise a manual WCAG AA + design pass.
- Do **not** re-run `pm-product-discovery:brainstorm` — the metaphor is locked in rollout §4. Only reach for it if you want to reshape the concept, and flag me first.

## 2. The concept (LOCKED — rollout §4)

**"Automate the week, get the hours back."** The funnel becomes a switchboard. Four repetitive task cards, each with a toggle:
- DEAL HANDOFF, STATUS UPDATES, CLIENT SETUP, COURSE LAUNCH (the repetitive PM work).
- Flip a task's toggle → it routes through its **human-gated tool** (the gate checkmark lights `--teal`), its manual hours **drain**, and a **HOURS BACK counter fills** toward the real payoff: **~6 hrs/week** (the 3 Claude Skills) and **~3 hrs/deal** (the RevOps automation).
- Flip all four → "the PM stops being the bottleneck."

The honesty is structural and must stay visible: **the human-review gate stays lit on every automated task** — this is "AI took the repetition, a human still signs off," not "AI replaced the work." The reader makes the engineer-it-away call task by task (predict-then-check: they see the hours return *and* the gate hold).

Ground the cards in `four_q` where you can (e.g. DEAL HANDOFF = 7 manual steps collapsed to 1 Salesforce trigger, ~3 hrs/deal; the 3 Claude Skills gave ~6 hrs/week). Keep labels terse; detail is the reach-out talking point, not on-card copy.

Nicky Case 3-act (rollout §4): open at four cards looping manually, counter at 0 ("flip a task to engineer it away") → climb (each toggle drains hours and fills the counter; the BUT: the gate stays required — automation isn't abdication) → close at all four automated, counter full, bottleneck gone.

## 3. Tooling

- `roughjs` + `rough-notation` are already installed. **This is the build that uses them.** Skin the task cards / tool box with **Rough.js** so the boxes read as hand-drawn graphite (tune `roughness` / `bowing` so it reads *pencil*, not "filter-y"). Use **rough-notation** for at most one draw-on callout (e.g. underline/circle the HOURS BACK payoff number).
- `roughViz` is **not** allowed — there's no chart, just counters; draw them as text. Honor the skip list (rollout §7 / DESIGN.md): no GSAP, Framer, Lenis, Three.js, Lottie, Rive, anime.js, scroll libs. **Ignore the `animation-components` / `gsap-scrolltrigger` / `locomotive-scroll` / `react-spring` plugins** — they violate the stack ban.

## 4. Art — live DOM + Rough.js (NO generator, NO keying)

Unlike the prior three explainers, the cards here are **stateful**, so they can't be a pre-rendered raster (a baked PNG can't toggle). Build them as **DOM/SVG, skinned with Rough.js**:

- No `gen-explainer-*.sh`, no `key-explainer-art.py` for this one. The static `the-block.webp` already in `public/assets/projects/explainers/` stays as the reduced-motion / no-JS fallback (don't regenerate it).
- **Authenticity gate (do this in the plan, before building all four):** render ONE Rough.js task card in the graphite register and show it to me. If generated rough reads less authentic than the site's pencil art (the rollout §11 risk), fall back to: pre-render the card *states* as keyed pencil art (then you'd add a generator after all) + DOM counters. Don't build four cards before I've okayed the look.
- Keep it flat and sharp (no shadows), graphite line weight consistent with the pencil register, on the real cream paper (transparent island — the page supplies the paper).

## 5. Build — consume the base, add the switchboard

The shared `InteractiveExplainer.astro` base exists. **Consume it; do not re-extract.**

- This is the first explainer whose stage content is **DOM**, not an `<img>`. If the base only accepts an image stage, make a **minimal, regression-safe** addition: let the stage accept slotted DOM content (a `<slot>`) while keeping the image path byte-equivalent for the three existing explainers. Diff the other three before/after — they must not change behavior.
- Create the **TheBlockExplainer** interaction module: four task cards (real checkboxes, styled), each routing to its tool box with a gate checkmark, the hours-drain, and the shared HOURS BACK counter.
- Register the variant in `ExplainerGraphic.astro`'s registry; set `explainer.interactive: the-block` in the mdx; keep the static `src` as fallback.

Mechanics:
- **Toggles are real `<input type="checkbox">`** (keyboard + screen-reader native) styled as switches — never div-with-onclick. The whole switchboard is operable without a mouse.
- On toggle: ease the card's hours draining to 0, ease the **HOURS BACK** counter up (live mono text — a screen reader must read the value, it's not a drawn number), and pop the `--teal` gate checkmark (small secondary action).
- Color-as-actor on real tokens: task cards `--ink`; the human-review gate badge `--teal`; the HOURS BACK payoff counter `--stamp-amber` (the metric). Flat, sharp, no shadows.
- **Licensed-Infinite-Motion:** nothing autoplays. State changes only on the reader's toggle; under reduced-motion the counter jumps instantly (no fill tween) — or follow the pilot contract and render the static `the-block.webp`. Pick the more accessible of the two and tell me which.

## 6. Verify — do NOT claim done until these pass

- `npm run dev` → `/work/the-block` renders the interactive switchboard; `npm run build` is clean.
- **No-JS:** the static `the-block.webp` shows, the final state is the honest one.
- **Reduced-motion:** either the static `.webp`, or the live toggles with instant (un-tweened) state changes — no autoplay, no infinite motion.
- **Keyboard + SR:** every toggle is a real focusable control with a clear label; the HOURS BACK value is live text a screen reader announces; focus rings present.
- **CLS:** the stage reserves height before paint.
- **Bundle check:** `roughjs` / `rough-notation` ship only in this island, not site-wide.
- Run `design:accessibility-review` (or a manual WCAG AA pass) — contrast on the gate-lit `--teal` and the amber counter in both light/dark host contexts.
- **Regression:** the `animation-pipeline`, `intent-engineering-mcp`, and `code-brain` explainers are unchanged in behavior after the base's DOM-slot addition.
- **Kill switch:** if anything forces hiding the toggles or shipping passive output, stop and tell me.

## 7. Wrap

- Update `docs/specs/interactive-explainer-rollout-v1.md` (mark The Block built in the §8 build-status block; note whether Rough.js held up or you fell back) and add a `CHANGELOG.md` entry (read its "How to add an entry" header first). Follow the spec/CHANGELOG conventions in `CLAUDE.md`.
- **Do not touch the Code Brain explainer** — it's built and deferred for a separate polish pass (rollout §8 build status). Stay scoped to The Block.

Plan first, including the single-card authenticity check. Wait for my approval before building all four.
