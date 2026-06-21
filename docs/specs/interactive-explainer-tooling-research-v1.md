# Interactive Explainer Tooling — Discovery Research (v1)

**Status:** research / discovery (companion to [`interactive-explainer-pattern-v1.md`](interactive-explainer-pattern-v1.md))
**Date:** 2026-06-20
**Question:** Beyond HeyGen's hyperframes (rejected — outputs passive MP4, kills the interactivity), what GitHub repos / libraries / Claude skills / MCP servers would make Claude a better author of the *interactive, self-hosted, hand-drawn* explainer pattern — across Claude Code, Claude Design, and Claude Cowork?
**Method:** 5 parallel research agents (Claude-authoring tools · hand-drawn/SVG libs · runtimes/scrollytelling · native CSS/WAAPI · craft lineage), GitHub/npm-verified, adversarially checked. Today = 2026-06-20; maintenance/licenses verified live.

---

## 0. Bottom line (read this first)

**You already have the right architecture.** The current explainer — inline SVG + `mask-image` reveal + WAAPI + keyed graphite art — is *exactly* what the research says a lightweight, self-hosted, accessible explainer should be. None of the heavy tools (Rive, Lottie, GSAP, Three.js) move the needle for your use case; most of them fight it.

The real upgrade is **three cheap things**, in priority order:

1. **Taste + discipline skills for Claude** — install the official `frontend-design` skill so Claude writes CSS-first, restrained motion by default. Highest leverage, near-zero cost.
2. **One graphite-fit micro-library: Rough.js** (21k★, MIT, <9kB) — the only library that *generates* the hand-drawn look. Everything else you need is already native (`stroke-dashoffset`, WAAPI, `feTurbulence`).
3. **Craft references, not tools** — Nicky Case's method post + Distill's interactive-articles paper + Kosara's "Scrollytelling Scourge" are what make the *next four* explainers better than the first.

The honest trap to avoid: you just discovered a category of shiny libraries. Most of them (Rive, Lottie, Theatre.js, GSAP) are real and good — and wrong for a hand-drawn pencil explainer with a lightweight bias. Filter hard.

---

## 1. Make Claude a better AUTHOR (skills / plugins / MCPs)

Ranked by fit for "authoring a lightweight, self-hosted, hand-drawn interactive explainer."

| Tool | What it adds | Install | Maturity / license | Fit |
|---|---|---|---|---|
| **`frontend-design` skill** (official, in [`anthropics/claude-code`](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md)) | Teaches Claude **taste + motion restraint**: "prioritize CSS-only solutions," "one well-orchestrated load with staggered reveals," bans AI-slop aesthetics. Discipline, not library calls. | Claude Code `frontend-design` plugin | Official, maintained | ★★★★★ — the single best official asset; aligns with your anti-template goal |
| **`anthropics/skills`** (baseline marketplace) | Foundation marketplace. Carries `canvas-design`, `slack-gif-creator` (neither is web-animation, but it's the install root). | `/plugin marketplace add anthropics/skills` → `/plugin install example-skills@anthropic-agent-skills` | 149k★, Apache-2.0, active | ★★★☆☆ — install it, but it's not itself an animation skill |
| **`freshtechbro/claudedesignskills`** marketplace | 27-plugin design marketplace. **Cherry-pick** `gsap-scrolltrigger`, `animejs`, `rive-interactive` — ignore the 3D/WebGL bulk you don't need. | `/plugin marketplace add freshtechbro/claudedesignskills` → `/plugin install <skill>` | 147★, MIT, updated Nov 2025 | ★★★★☆ — best source of scroll/scrub skills *if* you take only 2–3 |
| **`199-biotechnologies/motion-dev-animations-skill`** | Standalone skill for Motion.dev: scroll-scrub (`useScroll`/`useTransform`), `drag` gestures, `prefers-reduced-motion` baked in. Astro 4+ supported. | `git clone … ~/.claude/skills/motion-dev-animations` | 20★, MIT, niche (single-author) | ★★★☆☆ — relevant if you reach for Motion; low adoption |
| **Figma MCP** (official, already connected in Cowork; or [`GLips/Figma-Context-MCP`](https://github.com/GLips/Figma-Context-MCP)) | Design-**import** → code. Converts *static* Figma frames to accurate markup. | `npx -y figma-developer-mcp --figma-api-key=… --stdio` | 14.8k★, MIT, active (v0.11, Apr 2026) | ★★☆☆☆ — only helps if explainers originate in Figma; not an animation authoring tool |
| **`obra/superpowers`** | Dev methodology (TDD, brainstorming, planning). **No animation content.** | `/plugin marketplace add obra/superpowers-marketplace` | active | ★☆☆☆☆ — improves *how* Claude builds, not animation knowledge |

**Claude Design / Artifacts is your cheapest authoring path (and it got better).** Per [Anthropic's Claude Design announcement](https://www.anthropic.com/news/claude-design-anthropic-labs): it generates self-contained HTML/CSS/JS, has an **"Open in Claude Code"** bridge into a real project, and as of **June 2026 can import a design system** (a GitHub repo / file) so it builds with *your* tokens — paper `#FFF9F0`, ink, teal, Newsreader/JetBrains Mono. The Claude Code Artifacts CSP (launched 2026-06-18) forbids external scripts/fonts/CDN and inlines everything — which is *ideal* for you: it forces exactly the self-contained, dependency-free output you want. Author there → export → drop into Astro.

**Skip / unverified:** the mcpmarket.com / lobehub "SVG Animation Expert," "Lottie Animator," "Wiggle Logo Animator" listings (aggregator pages, no checkable repos); file-generating Rive MCPs (`@rive-mcp/server-core`, Rive Console MCP — star/commit health unconfirmed). An MCP is the wrong abstraction for SVG scrubbing anyway — that's code Claude already writes well.

---

## 2. OUTPUT tech & libraries (ranked by fit, filter by weight)

### The graphite-register core — adopt

| Library | What | ★ / license / weight | Maintenance | Fit |
|---|---|---|---|---|
| **Rough.js** ([repo](https://github.com/rough-stuff/rough)) | Renders shapes/paths with a **sketchy, hand-drawn wobble** (Canvas/SVG), hachure fills, `roughness`/`bowing` knobs. Powers Excalidraw. | 21k★ · MIT · **<9kB gz** | Stable maintenance mode (commits to mid-2024, issues triaged into 2025) | ★★★★★ — **the only lib that *generates* the graphite look.** Top adopt. |
| **Native `stroke-dashoffset` + WAAPI** | The actual "ink-in" mechanic: animate dash offset → 0; drive `animation.currentTime` from a slider/drag for frame-accurate scrub. | **0kB** · platform · Baseline since 2020 | N/A | ★★★★★ — your scrub core; zero deps, fully cross-browser |
| **`feTurbulence` + `feDisplacementMap`** SVG filter | Roughen clean strokes into **graphite jitter** — pure SVG/CSS, layered as a static skin. | **0kB** · platform | N/A | ★★★★☆ — best "make vectors read as real pencil." Apply **static**, never animate it (CPU-expensive); disable under reduced-motion if seed-jittered |
| **rough-notation** ([repo](https://github.com/rough-stuff/rough-notation)) | Hand-drawn **annotations** (underline, box, circle, strike) built on Rough.js; draw-on animation = the ink gesture, `animationDuration` scrub-driveable. | 9.6k★ · MIT · **3.8kB gz** | Frozen (last publish 2020) but stable | ★★★★☆ — perfect for graphite *callouts* over an explainer |

### Situational — adopt only with a reason

| Library | When you'd use it | ★ / license / weight | Caveat |
|---|---|---|---|
| **Vivus** ([repo](https://github.com/maxwellito/vivus)) | Multi-path "self-drawing" orchestration; `setFrameProgress(0..1)` is directly scrubbable | 15.5k★ · MIT · ~13kB | **Unmaintained** (last release 2021). It's a convenience wrapper over `stroke-dashoffset` — hand-roll that instead unless you have many paths to sequence |
| **anime.js v4** ([repo](https://github.com/juliangarnier/anime)) | If CSS/WAAPI can't express the timeline; `Timeline.seek()` + built-in `ScrollObserver` scrub | 67.6k★ · **now MIT** (v3 was sponsorware) · low, tree-shakeable | Lightest *full-timeline* engine; adds a JS dep |
| **Motion** (vanilla `animate()`) ([repo](https://github.com/motiondivision/motion)) | WAAPI-native scrub, "stateless & scrubbable," `.time`/`.speed` | 32.2k★ · MIT · **~2.3kB** (mini API) | Smallest scrubbable runtime — but only if you use the vanilla/mini API, not the 34kB React component |
| **Scrollama** ([repo](https://github.com/russellsamora/scrollama)) | The scroll-*step driver* (IntersectionObserver); map step progress → `seek()` | MIT · **~5kB** | Not an engine; pair with one of the above. Read Kosara before scroll-jacking (§3) |
| **roughViz** ([repo](https://github.com/jwilber/roughViz)) | Hand-drawn **charts** for the RevOps/data explainer | 7.1k★ · MIT | Pulls in **D3** (heavy). For 1–2 simple charts, draw them with Rough.js primitives instead |
| **Flubber** ([repo](https://github.com/veltman/flubber)) | SVG shape **morphing** (box → arrow); returns scrubbable `f(t)` | 6.9k★ · MIT | **Frozen ~2017**, no graphite of its own; style the paths with Rough.js first. Adopt only if a beat needs a morph |

### The heavy end — flag, mostly skip

- **Rive** (`@rive-app/canvas`, MIT) — true **state-machine** interactivity (drag → drawing responds), `.riv` smaller than GIF/JSON. **But ~200kB WASM** and the `.riv` is authored in Rive's editor — a poor match for a *hand-drawn pencil* pipeline + lightweight bias. Only if you need genuine state-driven interactivity a slider can't give.
- **Lottie** (lottie-web ~60kB / dotLottie heavier, MIT) — great `goToAndStop(frame)` scrub, **but authored in After Effects.** Fights a pencil pipeline; skip unless you adopt an AE/vectorize step.
- **Theatre.js** (Apache-2.0 core / AGPL studio) — visual keyframe editor over your own SVG. **Maintenance limbo** (1.0 moved to a private repo); watch, don't bet.
- **GSAP** — now **100% free incl. commercial since Apr 2025** (Webflow acquisition); DrawSVG/ScrollTrigger are the gold standard. **But** heavy + the "every agency site" feel cuts against your non-template brand. Your DESIGN.md bans it for a reason — keep it banned.
- **Three.js** (~155kB, MIT) — 3D/WebGL, wrong tool for 2D pencil. Out of scope.
- **Lenis** (smooth-scroll, ~few kB) — the "every Awwwards site" feel; skip to avoid the template look.

### Native platform note (the no-JS upgrade, with a caveat)

**CSS Scroll-Driven Animations** (`animation-timeline: scroll()`/`view()`) let the reader *scroll to ink the drawing with zero JS* — gorgeous, compositor-threaded. **But it is NOT Baseline as of mid-2026:** Chrome/Edge stable; **Safari only since 26.0 (Oct 2025)** with bugfixes through 26.5; **Firefox still behind a flag, off by default.** ~85% support. Use it only `@supports`-gated as enhancement, with the static fully-inked SVG as fallback. For *true drag/slider* scrub (your current approach), **WAAPI is the safe, fully-cross-browser choice** — keep it.

**SMIL** (`<animate>`): still works in 2026 (Chrome's deprecation was suspended; SVG2 keeps it) but **discouraged for new work** and weak at slider/scroll binding. Skip for a scrubbable explainer.

---

## 3. CRAFT references (this is what makes explainers 2–5 great)

The tools are commodities; the craft is the moat. Sources with open code/methodology:

- **Nicky Case — ["How I Make Explorable Explanations"](https://blog.ncase.me/how-i-make-an-explorable-explanation/)** — the most *teachable* method, everything CC0. 3-act pattern: **open with 🤔** (a concrete draggable moment the reader cares about) → **climb the ladder of abstraction** one BUT/THEREFORE beat at a time → **close with a sandbox** the reader steers. His stack is library-light (11ty + GitHub Pages) — maps cleanly onto Astro. **Use this as the script template for each explainer.**
- **Distill — ["Communicating with Interactive Articles"](https://distill.pub/2020/communicating-with-interactive-articles/)** ([source repo](https://github.com/distillpub/post--communicating-with-interactive-articles)) — the closest thing to a peer-reviewed pattern catalog: reactive/connected diagrams, reducing cognitive load via interaction, prompt self-explanation. **Use as a checklist:** does each interaction make the reader *predict-then-check*, or is it decoration?
- **Bartosz Ciechanowski — [ciechanow.ski](https://ciechanow.ski/)** — the gold standard. Every figure is a bespoke draggable simulation, **hand-coded vanilla JS/Canvas/WebGL, zero framework.** The lesson is *restraint*: fewer, deeper interactives beat many widgets. ([method analysis](https://ericholscher.com/blog/2025/jan/7/everything-bartosz-ciechanowski-makes/))
- **The Pudding — [process guides](https://pudding.cool/process/responsive-scrollytelling/)** + [`svelte-starter`](https://github.com/the-pudding/svelte-starter) — responsive-scrollytelling best practices; story-spine-first.
- **Newsroom tooling — [ai2html](https://github.com/newsdev/ai2html)** (NYT) / [Reuters graphics components](https://reuters-graphics.github.io/graphics-svelte-components/) — the "draw it in a vector tool → ship responsive captioned web figure" bridge. Relevant for turning hand-drawn art into crisp responsive markup instead of a flat PNG.
- **Bret Victor — [Up and Down the Ladder of Abstraction](https://worrydream.com/LadderOfAbstraction/)** — the philosophy: the reader scrubs between *one concrete case* and *the general rule*, and that movement *is* the understanding. This is literally your human→fleet→ship metaphor.
- **Robert Kosara — ["The Scrollytelling Scourge"](https://eagereyes.org/blog/2016/the-scrollytelling-scourge)** — the *when-NOT-to*. Seven failure modes; the load-bearing one: **never scroll-jack, and never make the reader watch and read at the same time.** If the story is discrete steps, use a stepper/slider — which is what you already do. Validation that your drag-scrub instinct beats scroll-hijacking.

### Cross-cutting principles (apply to every explainer)

1. **Reader agency over autoplay.** Direct manipulation is the medium's whole advantage — a video throws it away. (This is *why* hyperframes was the wrong call.)
2. **Concrete → abstract, one step at a time**, structured BUT/THEREFORE so each step earns a small surprise.
3. **Restraint: fewer, deeper interactives.** One bespoke draggable thing > ten widgets. Match interaction to story shape.
4. **Show-don't-tell / predict-then-check.** The reader forms a guess and tests it live — that's where comprehension comes from.
5. **Open the question, close with a sandbox.**
6. **Library-light + self-hosted.** Plain HTML + hand-written SVG/JS in an Astro island; never embed a hosted runtime.

---

## 4. Recommended stack (concrete)

**Authoring:** install the official **`frontend-design`** skill; optionally cherry-pick `animejs` + `rive-interactive` from `freshtechbro/claudedesignskills` (don't install the 3D bulk). Use **Claude Design** (with your design system imported) as the from-scratch authoring path, export, commit into Astro.

**Build each explainer from:**
1. **Inline SVG** line art (Nano Banana 2, as today).
2. **Graphite skin** = Rough.js *or* a static `feTurbulence`+`feDisplacementMap` filter.
3. **Ink-in mechanic** = native `stroke-dashoffset`.
4. **Scrub** = WAAPI `currentTime` off a slider/drag (your existing approach — keep it; it's Baseline-stable).
5. **Reduced-motion / no-JS** = render the finished drawing static.
6. Add **rough-notation** for graphite callouts; **roughViz** *only* if the RevOps explainer truly needs charts.

All MIT, all self-hostable, near-zero runtime weight, no After-Effects/Rive-editor dependency.

**Explicit skip list:** hyperframes (passive video), GSAP/Three.js/Lenis (banned + heavy + template-y), Lottie (AE pipeline), Rive (200kB + editor authoring) unless a specific explainer *needs* state-machine interactivity, Theatre.js (maintenance limbo), Figma MCP (import-only), the unverified mcpmarket/lobehub skills.

---

## 5. Next actions

1. Finish what's open in [`interactive-explainer-pattern-v1.md`](interactive-explainer-pattern-v1.md) §12 — confirm the live render (`npm run dev`), run the a11y/reduced-motion checks.
2. Install `frontend-design`; trial **Rough.js** as a graphite skin on the existing run-cycle figure (one branch, compare against the keyed raster — does generated rough beat hand-drawn Nano Banana art? It may not; Nano Banana art is *more* authentic).
3. Generalize the component to `InteractiveExplainer.astro` (§11 step 5) **before** explainer #2.
4. For each of explainers 2–5, write the script with **Nicky Case's 3-act pattern** and gut-check against **Distill's** predict-then-check bar before building.
5. Park Rive as a *maybe* for whichever single explainer most needs true state-machine interactivity (if any) — a separate ticket, accepting the weight.

**Kill switch (unchanged):** if any tool means hiding the scrubber or shipping passive video where the interactive figure was, stop — it breaks the thesis.

---

*Sources are linked inline. All star counts, licenses, bundle weights, and maintenance status verified against live GitHub/npm/MDN on 2026-06-20. Flagged-uncertain: exact Scrollama/Three.js parent-repo star counts; Lenis SPDX; Theatre.js public-repo activity — spot-check at adoption time.*
