# Code Brain Interactive Explainer — "Drag the night" (design)

**Status:** design / spec (ready for implementation plan)
**Date:** 2026-06-21
**Surface:** the case-study explainer slot (`/work/code-brain`, between the 4Q and Methods bands — critique W3)
**Project:** `code-brain` (rollout build order #2, after Intent MCP #1; the third interactive explainer overall — after the `animation-pipeline` pilot and the Intent MCP scaffold-extraction build)
**Process:** `superpowers:brainstorming` (existing product, ideas mode) → 4-question convergence elicitation → this design.

This is the canonical build reference for the Code Brain interactive explainer. It is the third doc in the explainer set and should be read alongside its companions:

- [`interactive-explainer-pattern-v1.md`](../../specs/interactive-explainer-pattern-v1.md) — the pilot + the pattern (run-cycle).
- [`interactive-explainer-rollout-v1.md`](../../specs/interactive-explainer-rollout-v1.md) — the rollout map; **§2 is the locked Code Brain entry this design executes and refines.**
- [`interactive-explainer-tooling-research-v1.md`](../../specs/interactive-explainer-tooling-research-v1.md) — the tooling research (skip list + craft references).

---

## 0. TL;DR

The static `code-brain` explainer (a flat clock-dial `.webp` of "THE OVERNIGHT LOOP") becomes an interactive **night-dial**: the reader sweeps a "now" hand **dusk → dawn** and watches the fleet run the night shift unattended — NOTES IN → CAPTURE → SYNTHESIZE → a two-critic gate (one note rejected, one survives) → VAULT — while the figure stays asleep the whole time. At dawn an amber wash sweeps in, the sun rises, **08:30** appears, and the newspaper resolves into a masthead styled like the live dateline strip at the top of the portfolio. It is the project's thesis — *infrastructure that does a night's work before Sean sits down* — made tactile: the reader performs the night the fleet runs while he sleeps.

The architecture is **identical to the shipped pattern**: the shared [`InteractiveExplainer.astro`](../../../src/components/case-study/InteractiveExplainer.astro) base + [`interactive-explainer.ts`](../../../src/scripts/interactive-explainer.ts) `wireScrubber`/`easeInOut`, with a thin per-project island ([`CodeBrainExplainer.astro`](../../../src/components/case-study/CodeBrainExplainer.astro), new) supplying `render(t)` over the prepared dial art. The "radial" lives entirely in `render(t)` — the control stays the base's linear, keyboard-operable `<input type=range>`. No new framework, no Gemini generation, no keying, no live-data coupling.

**Reproduce / extend:** see the rollout doc. **File manifest:** §11.

---

## 1. Decisions locked this session

The four convergence calls + three judgment calls, all resolved:

| # | Decision | Choice | Consequence |
|---|---|---|---|
| 1 | **Core aha** | **"It runs while he sleeps"** (autonomy) | Budget goes to the dusk→dawn sweep feeling like time passing + the dawn payoff. The figure never wakes. |
| 2 | **Art strategy** | **Reuse + overpaint (hybrid)** | Key the existing dial as the base; paint the sun/08:30/newspaper out and re-add them as dawn elements. No re-generation. |
| 3 | **Dawn payoff** | **Visually-matching masthead** | A self-contained DOM masthead styled like the real dateline (no live JSON wiring; never degrades). |
| 4 | **Note motion** | **Station-sequential (robust)** | Notes resolve *in place* at each station — no bezier path-travel. Drops the build from HIGH → MEDIUM. |
| 5 | **Zone label row** | **Omit** | The dial is already label-rich; no HUMAN/FLEET/SHIP-style row. |
| 6 | **Night-hand render** | **Clean SVG stroke** | Rough.js stays installed but largely unused here; trial only if the hand reads too sterile. |
| 7 | **Two-critic beat** | **Quick glance** | One ✗ reject + one ✓ approve, brief — not a dwelt-on moment. Kept, not cut. |

---

## 2. The metaphor & 3-act script (Nicky Case)

The autonomy frame drives every beat: the figure is asleep at `t=0` and **still asleep at `t=1`** — the work is finished and *waiting* for him.

- **Open 🤔 (`t≈0`):** dusk. Moon up, stars, the figure asleep at the desk, one raw note sitting at NOTES IN (12 o'clock). Hand at 12. Hint: *"Drag from dusk to dawn →"*.
- **Climb (BUT/THEREFORE):** the hand sweeps clockwise; each station activates *as the hand reaches it* — CAPTURE → SYNTHESIZE → the two-critic gate. The **BUT** is the gate: not everything survives — one note is rejected, one is approved. THEREFORE only *vetted* concepts reach the VAULT. Time is passing; he is still asleep.
- **Close (`t→1`):** dawn. The moon fades, an amber dawn-wash sweeps in, the sun rises lower-right, **08:30** appears, and the newspaper resolves into the dateline-style masthead. The loop handed back a finished morning.

---

## 3. Control → radial mapping (why this is MEDIUM)

The base scaffold's **linear `<input type=range>` stays the actual control** (keyboard-operable, screen-reader labeled). The per-project `render(t)` maps the normalized `t∈[0,1]` to the **angle** of the night-hand:

- Hand sweeps from 12 o'clock (≈ −90°) **clockwise ~270°** to the VAULT (≈ 8–9 o'clock), eased via `easeInOut(t)` (slow-in/slow-out — never linear).
- The six stations sit at **measured angles** (read from the keyed art at build time, exactly like Intent's `CHECK_TOPS` were alpha-scanned). A node lights `--teal` when the hand-angle passes its station-angle.
- **No path-tweening of cards** — notes resolve in place at the active station. This is the single choice that keeps the build MEDIUM, not HIGH.

Scrub config (base `scrub` prop):
- `title`: "The night shift"
- `hint`: "Drag from dusk to dawn →"
- `ariaLabel`: "Drag from dusk to dawn to watch the fleet capture, synthesize, vet, and vault the day's notes by 08:30."
- `ticks`: time markers, e.g. `["Dusk", "Midnight", "Dawn"]` (final wording tuned in build).
- **No `zones`** (decision #5).

---

## 4. Layer model — baked vs live

**Baked** (one keyed-transparent base, derived from the *existing* art — no new generation):
- the dial ring + tick marks, all six labeled node circles + icons (NOTES IN, CAPTURE, SYNTHESIZE, CRITIC ×2, VAULT), the "THE OVERNIGHT LOOP" title, the asleep figure + desk, the moon + stars.
- The **sun / 08:30 / newspaper are painted out** of this base — they are the payoff and must not be pre-visible.

**Live** (DOM/SVG/CSS over the base, driven by `render(t)`):
- the sweeping **night-hand** — a clean SVG line pivoting from the dial center, rotated by `t` (decision #6).
- per-node **lit rings** — a `--teal` ring/glow per station, opacity = "has the hand passed this angle?".
- a single **note-card glyph** that snaps to the active station and transforms stage to stage (raw lines → connected concept → ✓ vetted). Snap, not tween (decision #4).
- the **two-critic beat** (quick glance, decision #7): at the gate, `--teal` ✓ (approve) and `--ink-secondary` ✗ (reject); the rejected card fades fast; the survivor continues.
- the **vault** filling / latching on `--success-teal` as the survivor lands.
- the **dawn** (`t≈0.85→1`): a `--stamp-amber` CSS wash fading in over the dial + an **SVG sun** rising lower-right (drawn, not a raster sprite — the existing sun is a simple amber glyph) + **08:30** (live mono text) + the **masthead** resolving in (DOM, styled like the real dateline). (Moon-fade is optional flourish, not load-bearing — the moon stays baked in the base.)
- **one** `rough-notation` callout circling 08:30 at `t≈0.97` — lazy-loaded to this island only, never fetched under reduced motion (exact pattern from Intent's score circle).

---

## 5. Beat timeline (starting `t` ranges — tuned in build)

| `t` range | Beat | Visual |
|---|---|---|
| 0.00–0.05 | Dusk | Hand at 12; moon + stars; figure asleep; raw note at NOTES IN; dawn elements hidden. |
| 0.05–0.22 | Capture | Hand → CAPTURE node; node lights teal; note-card appears ("captured"). |
| 0.22–0.42 | Synthesize | Hand → SYNTHESIZE; node lights; card transforms (raw → connected concept). |
| 0.42–0.65 | Two-critic gate | Hand → the two CRITIC nodes; quick ✓ (teal) / ✗ (ink-secondary); rejected card fades, survivor continues. |
| 0.65–0.85 | Vault | Hand → VAULT; vault latches on success-teal; vetted card lands. |
| 0.85–1.00 | Dawn payoff | Moon fades; amber wash; sun rises; 08:30 prints; masthead resolves; rough-notation circle at ≈0.97. |

Beats are angle-gated against the measured station positions, so uneven node spacing (the two critics sit close together at the bottom of the existing dial) is handled naturally.

---

## 6. Color-as-actor (DESIGN.md tokens)

- Night = `--ink` / `--teal`; the hand + active nodes light `--teal`.
- Two critics: `--teal` (approve) vs `--ink-secondary` (reject).
- Vault payoff: `--success-teal`.
- Dawn wash + 08:30 + the rough-notation circle: `--stamp-amber`.

One splash per section (amber = dawn), per the Inversion Rule; teal stays structural through the night. This matches the existing art's own palette (teal dial + amber moon/sun/08:30) exactly.

---

## 7. Asset pipeline — one PIL overpaint, no Gemini, no keyer

Two facts shape this: we reuse existing art, and the dawn elements are re-added as **live SVG/DOM**, not rasters. So the prep is a single **deterministic PIL overpaint, runnable in-session** (no image API). And unlike the graphite run-cycle, the dial is *colored* (teal + amber), so it is **not** run through the graphite keyer ([`key-explainer-art.py`](../../../scripts/key-explainer-art.py) recolors all ink to uniform graphite — it would flatten the teal/amber). The base instead keeps its original white-card background, the same treatment the current static already uses on the cream page.

1. Sample the art's background color from a clean corner.
2. **Overpaint** the lower-right **dawn cluster** (sun / 08:30 / newspaper) with that background color → a night-only base.

Output: `public/assets/projects/explainers/code-brain-dial.webp` (overpainted base; **not** keyed — a bordered white-card figure like the shipped static).

New script: `scripts/prep-explainer-codebrain.py` (the overpaint). **No `gen-explainer-codebrain.sh`** (nothing to generate) and **no keying / no sprite** — the sun, 08:30, and masthead are re-added as SVG/DOM dawn layers.

The original `code-brain.webp` is left untouched and stays the `explainer.src` — the no-JS / reduced-motion floor (it already shows the *complete* diagram, the honest final state).

---

## 8. Component & wiring (mirrors Intent exactly)

- **New** [`src/components/case-study/CodeBrainExplainer.astro`](../../../src/components/case-study/CodeBrainExplainer.astro) — consumes the `InteractiveExplainer` base, `variant="code-brain"`, `aspectRatio="16 / 9"`, no `zones`. Slots the keyed base + sun sprite + the live SVG/DOM layers; owns the `render(t)` island that imports `wireScrubber` + `easeInOut` from `interactive-explainer.ts`.
- **Edit** [`ExplainerGraphic.astro`](../../../src/components/case-study/ExplainerGraphic.astro) — one registry line: `"code-brain": CodeBrainExplainer` in the `INTERACTIVE` map.
- **Edit** [`code-brain.mdx`](../../../src/content/work/code-brain.mdx) — add `interactive: code-brain` to the `explainer:` block; the static `src` stays unchanged as alt source + fallback.
- **Reuse** [`interactive-explainer.ts`](../../../src/scripts/interactive-explainer.ts) unchanged.
- **Geometry constants** — the dial center (x%, y%), radius, each station's angle, and the sun/dawn anchor positions are measured from the keyed art and live as constants in the component (the `CHECK_TOPS` precedent).

---

## 9. a11y / reduced-motion / CLS

- **Reduced-motion + no-JS:** `wireScrubber` no-ops and never adds `is-interactive`; the original `code-brain.webp` shows (the complete diagram), scrubber hidden. The honest final state.
- **Live text:** 08:30 and the masthead are real text (screen-reader readable). A polite `aria-live` region narrates the beats at the station transitions ("notes captured → synthesized → vetted by two critics → vaulted → ready 08:30").
- **Masthead date:** pulls `BUILD_DATE` from [`src/lib/dateline.ts`](../../../src/lib/dateline.ts) — self-contained, stays current with the daily rebuild, never couples to the runtime `public/api/*.json` pipeline or its `isFresh` gate.
- **CLS:** the base `.ie-stage` reserves height via `aspect-ratio: 16 / 9` (the canonical explainer ratio) before paint.
- **Control:** `aria-label` on the range, `--stamp-amber` `:focus-visible` ring (inherited from the base).

---

## 10. Scope / YAGNI (explicitly out)

- No bezier path-travel of note-cards (decision #4 → station-sequential).
- No live-dateline data wiring (decision #3 → visually-matching masthead).
- No new Gemini generation and no keying (decision #2 → reuse + a single PIL overpaint; dawn elements are SVG/DOM).
- No figure animation — the asleep figure stays baked (reinforces autonomy).
- No Rough.js-everywhere — clean SVG hand (decision #6); one `rough-notation` callout, max.
- Skip list unchanged (tooling research §4): GSAP / Three.js / Lenis / Lottie / Rive / scroll-driven CSS.

---

## 11. File manifest

| Path | Change | What |
|---|---|---|
| `src/components/case-study/CodeBrainExplainer.astro` | **new** | The per-project island (keyed base + sun sprite + live SVG/DOM layers + radial `render(t)` + reduced-motion fallback). |
| `src/components/case-study/ExplainerGraphic.astro` | edit | One registry entry: `"code-brain": CodeBrainExplainer`. |
| `src/content/work/code-brain.mdx` | edit | `interactive: code-brain` added to the `explainer:` block. |
| `public/assets/projects/explainers/code-brain-dial.webp` | **new** | Overpainted night-only base (white card; dawn cluster removed; **not** keyed). |
| `scripts/prep-explainer-codebrain.py` | **new** | Overpaint the dawn cluster out of the existing art (PIL, in-session, no API, no keying). |
| `src/scripts/interactive-explainer.ts` | reuse | Unchanged shared scrubber/easing. |
| `public/assets/projects/explainers/code-brain.webp` | unchanged | The no-JS / reduced-motion floor + alt source. |
| `docs/specs/interactive-explainer-rollout-v1.md` | edit (on ship) | Flip §2 + §8 status to BUILT. |
| *(this file)* | — | The design / build reference. |

---

## 12. Verification gates (rollout §10)

1. `npm run dev` → `/work/code-brain` renders the interactive night-dial (Sean-machine check; sandbox can't run the live build).
2. **Reduced-motion + no-JS:** the original `code-brain.webp` shows, the control is hidden, the final state is the honest one.
3. **CLS:** the stage reserves height before paint (`aspect-ratio: 16 / 9`).
4. `design:accessibility-review` — control label, focus ring, live-text for 08:30 + the beats, color-contrast on the new amber/teal beats.
5. **Bundle check:** `rough-notation` ships only in this island (it's already a dep; confirm tree-shake).
6. **Kill switch (unchanged):** if the build means hiding the control or shipping passive video where the interactive figure was, stop — it breaks the thesis.

---

## 13. Open items / tuning knobs

- **Station angles + dial center/radius** — measured from the keyed art during build; the beat `t`-ranges in §5 are starting points and get tuned against the real geometry.
- **Night-hand authenticity** — default clean SVG; only trial Rough.js if it reads too sterile (decision #6). Disable any Rough.js redraw under reduced motion.
- **Dawn-wash feel** — the amber wash must read as *dawn light*, not a color filter; tune opacity + gradient direction (low/right, where the sun rises) in build.
- **Two-critic timing** — keep the reject a *quick* glance (decision #7); if it reads as a glitch rather than a gate, slow it a touch but never dwell.
- **Masthead fidelity** — match the real dateline's Newsreader + JetBrains Mono treatment and format closely enough to read as "the strip at the top," without re-rendering the live component.
