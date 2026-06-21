# Claude Code kickoff — Code Brain interactive explainer

> Paste everything below the line into a fresh Claude Code session opened at the
> repo root: `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. It plans then
> builds the **third** interactive case-study explainer (the second metaphor
> build, after Intent MCP). `frontend-design` is installed. Start in plan mode.
>
> Prereq: the Intent MCP explainer build should already have landed the shared
> `InteractiveExplainer.astro` base and the `roughjs` / `rough-notation` deps.
> This build CONSUMES that base — it does not re-extract it. If for some reason
> the base isn't there yet, extract it first per rollout §6, then continue.

---

You are working in the `sw-ai-pm-portfolio` repo (Astro 5 + Tailwind 4). Build the **Code Brain** interactive case-study explainer, following the pattern set by the shipped `animation-pipeline` pilot and the `intent-engineering-mcp` build. This is the **highest-complexity** explainer of the set (a radial/time dial with cards traveling an arc), so the plan must include a small prototype checkpoint before the full build. **Start in plan mode: read everything in §0, then show me (a) the art approach, (b) a de-risk prototype of the swept hand + one card on the loop path, and (c) the full file list, and wait for my approval before building the whole thing.**

## 0. Read these first (in order)

1. `docs/specs/interactive-explainer-rollout-v1.md` — the rollout plan. Your build is **§2 (Code Brain)**. Also read §6 (shared scaffold — already built), §7 (tooling), §9 (asset pipeline), §10 (verification + the named Code Brain craft risk).
2. `docs/specs/interactive-explainer-pattern-v1.md` — the pilot + the reusable pipeline: art generation (§6), luminance keying (§7), the interaction + progressive-enhancement contract (§8), design-system fit (§9).
3. `src/components/case-study/InteractiveExplainer.astro` — the shared base you will consume (created during the Intent MCP build). Read it before writing the Code Brain interaction module. Also read `AnimationPipelineExplainer.astro` and the Intent module as worked examples.
4. `src/content/work/code-brain.mdx` — the project's `four_q` + the existing `explainer:` block. Its `alt` is your alt-text source; the static `src` is your reduced-motion / no-JS fallback.
5. `DESIGN.md` + `PRODUCT.md` — tokens and the rules: color-as-actor, flat/sharp (no shadows/gradients), `--ease-out`, the Licensed-Infinite-Motion rule, reduced-motion, WCAG AA, the stack bans.

## 1. Skills to invoke (and when)

- **`frontend-design`** (installed) — invoke for the component build. CSS-first, restrained motion, nothing templated. Your taste gate.
- **`2d-animation-principles`** — invoke for this one specifically. The cards travel an **arc**, and the reveal *spacing* (slow-in/slow-out, never linear) is what keeps it from feeling floaty. Arcs + timing-vs-spacing are exactly its domain. If it isn't in this workspace, reuse the `easeInOut` from the pilot and apply arc'd motion by hand.
- **`gemini-pencil-animation-image-gen`** — generate the dial art in the pencil register; use its `references/pencil-animation-prompt-templates.md`.
- **`image-generator-prompt-science`** — read for the 7-layer prompt framework when you write the generation prompt.
- **`design:accessibility-review`** + **`design:design-critique`** — if available, run them as the verification gate (§6); otherwise a manual WCAG AA + design pass.
- Do **not** re-run `pm-product-discovery:brainstorm` — the metaphor is locked in rollout §2. Only reach for it if you want to reshape the concept, and flag me first.

## 2. The concept (LOCKED — rollout §2)

**"Drag the night."** The existing clock-dial diagram becomes draggable. The reader sweeps a **"now" hand from dusk → dawn**. As night advances:
- raw **note-cards** are pulled off the desk and routed around the dial: CAPTURE → SYNTHESIZE → forked through the **two CRITICs** (the reader *watches one card get rejected and one approved*) → the survivors land in the **VAULT** as vetted concepts,
- the dial's nodes **light as the hand passes** them,
- at dawn the **sun rises** and the **08:30 newspaper strip prints** — the same dateline that the Daily Driver writes at 08:30 and that runs at the top of this very portfolio.

The reader performs the night shift the fleet runs unattended while Sean sleeps. Predict-then-check: not every card survives the critics — that's the BUT that makes the vault mean something.

Nicky Case 3-act (rollout §2): open at dusk, one card on the desk, the human asleep ("drag the night forward") → climb (each step moves a card a stage; the critic fork rejects one) → close at dawn, vault full, the 08:30 paper prints and ties back to the page the reader is on.

## 3. Tooling

- `roughjs` + `rough-notation` are already installed (Intent build). For Code Brain they're **optional** — use Rough.js only if the swept hand or a callout reads better as a hand-drawn stroke than a clean SVG line; otherwise prefer pre-rendered pencil art + native SVG.
- **The loop-travel mechanic is native:** drive the cards with CSS **`offset-path`** (a `path()` tracing the dial loop) + `offset-distance`, and rotate the "now" hand by `transform: rotate(angle)`, all off the slider value — no animation library. Respect the **skip list** (rollout §7 / DESIGN.md): no GSAP, Framer, Lenis, Three.js, Lottie, Rive, anime.js, scroll libs. **Ignore the `animation-components` / `gsap-scrolltrigger` / `locomotive-scroll` / `react-spring` plugins** — they violate the stack ban.

## 4. Art — generate-then-key (pilot §6–7)

This machine can reach the Gemini API and run npm (unlike the cowork sandbox), so you can generate inline — but **commit the generator**.

- Write `scripts/gen-explainer-codebrain.sh`, mirroring `scripts/gen-explainer-runcycle.sh`: a verbatim committed prompt, `--aspect-ratio 16:9`, output to `public/assets/projects/explainers/code-brain-*-raw.png`, using the anima skill at `/Users/seanwinslow/Code-Brain/anima/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py` with `--env-file /Users/seanwinslow/Code-Brain/anima/.env`.
- Generate with **style consistency** (one generation = consistent identity/style). Two kinds of art:
  1. **The dial base sheet** (static): the clock-dial face, the crescent moon + the asleep-at-desk figure, the rising sun, the stage labels (CAPTURE / SYNTHESIZE / two CRITICs / VAULT), and the small 08:30 newspaper strip at the dawn position. This is pre-rendered and keyed, like the run-cycle.
  2. **1–3 small note-card sprites** that travel the loop. Prefer generating them on the **same sheet** as the base (so the register matches), then crop them out.
- Graphite line art on a **plain flat off-white** background (no paper chrome), explicit negatives (no color, no ink-black, no anime/3D/vector-clean lines), per the pilot prompt. The newspaper strip stays drawn art — it does **not** pull live data; it just reads "08:30".
- Key to transparent: `python3 scripts/key-explainer-art.py IN.png public/assets/projects/explainers/<name>.webp` (tune `--alpha-floor` / `--dark-anchor` if contrast differs). Re-roll takes; gen varies.
- The node-state lighting, the swept hand, and the dawn color-wash are **live** (SVG/CSS), not baked into the art.

## 5. Build — consume the base, add the Code Brain interaction

The shared `InteractiveExplainer.astro` base already exists. **Consume it; do not re-extract.**

- Create the **CodeBrainExplainer** interaction module on top of the base: the dial base image + the dynamic layer.
- Generalize the label-zone props for this project (e.g. NIGHT / FLEET / 08:30, or the dial's own stage labels) via the base's `{label, sublabel, token}` API.
- Register the new variant in `ExplainerGraphic.astro` (the slug → component registry from the Intent build); set `explainer.interactive: code-brain` in the mdx; keep the static `src` as fallback.

Dynamic layer mechanics (the `render(t)` logic):
- The slider maps `t` → an **angle/time** sweep (dusk → dawn). The "now" hand rotates with `t`; ease-in/out, never linear.
- **Cards travel the loop** via `offset-path` + `offset-distance = f(t)`, arc'd (not straight) per `2d-animation-principles`. Spawn a card at the desk, move it stage to stage; at the **critic fork** send one card down the reject branch (fade/drop) and one to the vault — legibly, so the reader sees the rejection.
- **Nodes light** (`--teal`) as the hand passes their angle.
- A **dawn color-wash** overlay (CSS) shifts the scene from night ink/teal toward `--stamp-amber` near `t≈1`; the **08:30 newspaper** fades in at the dawn position.
- Color-as-actor on real tokens: night `--ink` / `--teal`; the two critics `--teal` (approve) vs `--ink-secondary` (reject); the vault/payoff `--success-teal`; dawn `--stamp-amber`. Flat, sharp, no shadows.

## 5b. De-risk prototype (do this IN the plan, before the full build)

Per rollout §10, the radial path is the craft risk. Before building the whole loop, stand up a minimal prototype — the swept hand rotating with the slider + **one** card traveling the `offset-path` arc — and show it to me. Only after I approve the motion do you build the full multi-card / critic-fork / dawn-wash sequence. Don't build the whole thing then discover the arc feels wrong.

## 6. Verify — do NOT claim done until these pass

- `npm run dev` → `/work/code-brain` renders the interactive dial; `npm run build` is clean.
- **Reduced-motion + no-JS:** the static `code-brain.webp` shows, the slider is hidden, the final state is the honest one.
- **Keyboard:** the radial scrub is driven by a real `range` input (arrow keys sweep the night); it carries an `aria-label`; focus ring present.
- **CLS:** the stage reserves height before paint.
- **Bundle check:** any `roughjs` use ships only in this island, not site-wide.
- Run `design:accessibility-review` (or a manual WCAG AA pass) — check color-contrast on the night→dawn color shift in both light/dark host contexts.
- **Regression:** the `animation-pipeline` and `intent-engineering-mcp` explainers are unchanged in behavior (the base refactor must not have touched them).
- **Licensed-Infinite-Motion:** nothing autoplays forever — the dial only moves under the reader's drag; reduced-motion lands static.
- **Kill switch:** if anything forces hiding the slider or shipping passive output, stop and tell me.

## 7. Wrap

- Update `docs/specs/interactive-explainer-rollout-v1.md` (mark Code Brain built; note any deviation from the §2 plan) and add a `CHANGELOG.md` entry (read its "How to add an entry" header first). Follow the spec/CHANGELOG conventions in `CLAUDE.md`.
- Leave the raw generation PNG(s) reproducible via the committed `gen-explainer-codebrain.sh`; safe to delete the raw from `public/` after keying.

Plan first, including the de-risk prototype. Wait for my approval before the full build.
