# Code Brain Interactive Explainer ("Drag the night") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the static Code Brain explainer (a flat clock-dial `.webp`) into an interactive radial night-dial the reader sweeps dusk → dawn, watching the fleet capture → synthesize → vet → vault the day's notes while the figure sleeps, paying off at 08:30 on a dateline-style masthead.

**Architecture:** A thin per-project Astro island (`CodeBrainExplainer.astro`) consumes the shared `InteractiveExplainer.astro` base (chrome + progressive-enhancement contract) and supplies a `render(t)` over an overpainted-but-not-keyed dial image plus an overlay SVG drawn in the image's own pixel space (viewBox `0 0 1672 941`). The "radial" lives entirely in `render(t)` — the actual control stays the base's linear, keyboard-operable `<input type=range>`. Reduced-motion / no-JS falls back to the original complete `code-brain.webp`.

**Tech Stack:** Astro 5, Tailwind 4, vanilla TS islands, inline SVG, CSS `mask`/transforms, `rough-notation` (already a dep), Python 3 + Pillow 12 (asset prep). No new npm dependencies.

## Global Constraints

- **Branch:** work on `feat/2026-06-21-codebrain-explainer` (repo uses feature-branch → PR; session started on `main`). Per CLAUDE.md, **push/open a PR only when Sean asks** — local commits are fine.
- **No new dependencies.** `rough-notation` (^0.5.1) and `roughjs` (^4.6.6) are already in `package.json`. Do not add others. Skip list stands: no GSAP / Three.js / Lenis / Lottie / Rive / scroll-driven CSS.
- **Reuse the scaffold unchanged:** import `wireScrubber` + `easeInOut` from `~/scripts/interactive-explainer`. Do not modify that file or `InteractiveExplainer.astro`.
- **Progressive-enhancement contract (non-negotiable):** `is-interactive` is added only by `wireScrubber`, never under `prefers-reduced-motion`; no-JS and reduced-motion render the original `code-brain.webp`, scrubber hidden. The honest final state is always reachable.
- **Design tokens (exact):** night = `var(--ink)` / `var(--teal)`; two critics = `var(--teal)` (approve) vs `var(--ink-secondary)` (reject); vault payoff = `var(--success-teal)`; dawn wash + 08:30 + rough-notation circle = `var(--stamp-amber)`. One splash (amber = dawn). Fonts: only `var(--font-mono)` (JetBrains Mono) + the serif (Newsreader) already in tokens.
- **Aspect ratio:** the explainer stage is `16 / 9`. The art is **1672×941** (exactly 16:9) → the overlay SVG `viewBox="0 0 1672 941"` aligns 1:1 with the contained base image.
- **Masthead date:** derive from `dateline()` in `~/lib/dateline` (→ `"BOSTON, JUNE 21, 2026"`), styled to match `src/components/case-study/DatelineStrip.astro` (mono, `font-weight:500`, `letter-spacing:1.2px`, color `--stamp-amber`). Self-contained; never reads `public/api/*.json`.
- **Geometry + beat-timing constants are starting estimates** measured by eye from the art; they are tuned visually in Task 6. They are flagged `// TUNE` in code.
- **Verification reality:** this repo has no unit-test runner; verification is `npm run build` (final gate; its `prebuild` hits the network via `fetch_canonical_sources.mjs`), `npm run validate` (frontmatter only, offline — the cheap per-task gate), and visual inspection in `npm run dev` at specific slider values. "Expected" outcomes below are the observable result in the browser.

**The target component** (built across Tasks 2–5; shown complete in Task 3, extended by complete insert-blocks in Tasks 4–5): `src/components/case-study/CodeBrainExplainer.astro`.

---

### Task 1: Overpaint the dawn cluster → `code-brain-dial.webp`

Produce the interactive base image: the existing colored dial with the lower-right dawn cluster (sun / 08:30 / newspaper) painted out, so those elements can be re-added as live SVG/DOM at dawn. Pure deterministic Pillow edit, no keying (the dial is teal+amber — the graphite keyer would flatten it).

**Files:**
- Create: `scripts/prep-explainer-codebrain.py`
- Create (output): `public/assets/projects/explainers/code-brain-dial.webp`
- Read-only input: `public/assets/projects/explainers/code-brain.webp` (1672×941; left untouched)

**Interfaces:**
- Produces: the asset path `/assets/projects/explainers/code-brain-dial.webp` consumed by Task 3.

- [ ] **Step 1: Write the prep script**

Create `scripts/prep-explainer-codebrain.py`:

```python
#!/usr/bin/env python3
"""
Prep the Code Brain interactive-explainer base image.

Unlike the graphite run-cycle, the Code Brain dial is COLORED (teal dial + amber
moon/sun). So it is NOT run through scripts/key-explainer-art.py (that keyer
recolors all ink to uniform graphite, which would flatten the teal/amber). Here
we only overpaint the lower-right "dawn cluster" (sun / 08:30 / newspaper) with
the art's own background color, leaving a night-only base that keeps its original
white-card background. The sun, 08:30, and masthead are re-added as live SVG/DOM
dawn layers by CodeBrainExplainer.astro.

See docs/superpowers/specs/2026-06-21-codebrain-interactive-explainer-design.md §7.

Usage: python3 scripts/prep-explainer-codebrain.py
Requires: pip install Pillow
"""
from PIL import Image, ImageDraw

SRC = "public/assets/projects/explainers/code-brain.webp"
OUT = "public/assets/projects/explainers/code-brain-dial.webp"

# Dawn cluster bounding box, in source pixels (1672x941). The dial's bottom arc
# stays left of x~960 at these y's, so this rectangle is clear of the dial.
# TUNE in Task 6: open OUT and confirm sun/08:30/newspaper are gone and no node,
# label, or dial arc is clipped.
BOX = (1075, 695, 1672, 905)  # (x0, y0, x1, y1)

im = Image.open(SRC).convert("RGB")
bg = im.getpixel((12, 12))  # clean top-left corner = the background color
ImageDraw.Draw(im).rectangle(BOX, fill=bg)
im.save(OUT, "WEBP", lossless=True, method=6)
print(f"overpainted {SRC} -> {OUT}  size={im.size}  bg={bg}  box={BOX}")
```

- [ ] **Step 2: Run the prep script**

Run: `python3 scripts/prep-explainer-codebrain.py`
Expected: prints `overpainted ... -> public/assets/projects/explainers/code-brain-dial.webp  size=(1672, 941)  bg=(...)  box=(1075, 695, 1672, 905)` and the file exists.

- [ ] **Step 3: Visually verify the overpaint**

Open `public/assets/projects/explainers/code-brain-dial.webp`.
Expected: the dial ring, all six labeled nodes (NOTES IN, CAPTURE, SYNTHESIZE, CRITIC ×2, VAULT), the asleep figure, the moon + stars, and the "THE OVERNIGHT LOOP" title are all intact; the sun, the `08:30`, and the newspaper in the lower-right are gone (filled flat with the background color). If anything is clipped or any dawn element survives, adjust `BOX` and re-run Step 2.

- [ ] **Step 4: Commit**

```bash
git add scripts/prep-explainer-codebrain.py public/assets/projects/explainers/code-brain-dial.webp
git commit -m "feat(explainer): overpaint dawn cluster for code-brain interactive base"
```

---

### Task 2: Component scaffold + registry + mdx (degrades to static)

Stand up `CodeBrainExplainer.astro` rendering only the static fallback, wire it into the registry and the project frontmatter. After this task the case study routes through the new component but is visually identical to today — a safe, independently shippable increment.

**Files:**
- Create: `src/components/case-study/CodeBrainExplainer.astro`
- Modify: `src/components/case-study/ExplainerGraphic.astro:13-19`
- Modify: `src/content/work/code-brain.mdx` (the `explainer:` block, lines 54-57)

**Interfaces:**
- Consumes: `InteractiveExplainer.astro` (`variant`, `aspectRatio`, `scrub` props); `Props = { src: string; alt: string }` (the shape every interactive explainer takes, matching `IntentExplainer`).
- Produces: registry key `"code-brain"` → `CodeBrainExplainer`; the `interactive: code-brain` frontmatter value.

- [ ] **Step 1: Create the component (static-only for now)**

Create `src/components/case-study/CodeBrainExplainer.astro`:

```astro
---
/**
 * <CodeBrainExplainer /> — interactive variant of the code-brain case-study
 * explainer ("Drag the night", rollout §2 / spec 2026-06-21). Consumes the
 * shared <InteractiveExplainer/> base for chrome + the progressive-enhancement
 * contract; owns the radial night-dial interaction (added in Tasks 3-5).
 *
 * Progressive enhancement: no-JS / prefers-reduced-motion shows the original
 * code-brain.webp (the complete diagram, honest final state) with the scrubber
 * hidden. This task ships that fallback only.
 */
import InteractiveExplainer from "./InteractiveExplainer.astro";

interface Props {
  /** Frontmatter static src — the no-JS / reduced-motion fallback image. */
  src: string;
  alt: string;
}
const { src, alt } = Astro.props;
---

<InteractiveExplainer
  variant="code-brain"
  aspectRatio="16 / 9"
  scrub={{
    title: "The night shift",
    hint: "Drag from dusk to dawn →",
    ariaLabel:
      "Drag from dusk to dawn to watch the fleet capture, synthesize, vet, and vault the day's notes by 08:30",
    ticks: ["Dusk", "Midnight", "Dawn"],
  }}
>
  {/* no-JS / reduced-motion floor — the complete diagram */}
  <img class="cb-static" src={src} alt={alt} draggable="false" decoding="async" />
</InteractiveExplainer>

<style>
  .cb-static {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
```

- [ ] **Step 2: Register the component**

In `src/components/case-study/ExplainerGraphic.astro`, add the import and map entry. Replace lines 13-19:

```astro
import AnimationPipelineExplainer from "./AnimationPipelineExplainer.astro";
import IntentExplainer from "./IntentExplainer.astro";
import CodeBrainExplainer from "./CodeBrainExplainer.astro";

const INTERACTIVE = {
  "animation-pipeline": AnimationPipelineExplainer,
  "intent-engineering-mcp": IntentExplainer,
  "code-brain": CodeBrainExplainer,
} as const;
```

- [ ] **Step 3: Wire the frontmatter**

In `src/content/work/code-brain.mdx`, add `interactive: code-brain` to the `explainer:` block (it currently has `src`, `alt`, `caption`). Result:

```yaml
explainer:
  src: /assets/projects/explainers/code-brain.webp?v=2026-06-18b
  interactive: code-brain
  alt: "A hand-drawn pencil-test diagram on cream paper showing an overnight automation loop as a clock dial. At the top, a crescent moon and a small figure asleep at a desk, labeled NOTES IN, HUMAN ASLEEP. Reading clockwise around the dial: CAPTURE, then SYNTHESIZE, then a fork to two nodes both labeled CRITIC that rejoin, then VAULT. At the lower right, a rising sun and an 08:30 marker beside a small newspaper strip, where the loop hands the finished work back to the human. Titled THE OVERNIGHT LOOP."
  caption: "The fleet works overnight, turning the day's notes into vetted knowledge by 08:30."
```

- [ ] **Step 4: Validate frontmatter**

Run: `npm run validate`
Expected: exits 0, no schema errors for `code-brain` (the `explainer.interactive` field is already optional in `src/content/config.ts`, added during the Intent build).

- [ ] **Step 5: Visually verify the static fallback path**

Run: `npm run dev`, open `/work/code-brain`, scroll to the explainer band (between the 4Q and Methods).
Expected: the explainer renders the full `code-brain.webp` diagram exactly as before; no scrubber is visible (no per-project script wires `is-interactive` yet). No console errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/case-study/CodeBrainExplainer.astro src/components/case-study/ExplainerGraphic.astro src/content/work/code-brain.mdx
git commit -m "feat(explainer): scaffold code-brain interactive (degrades to static)"
```

---

### Task 3: Interactive base + radial night-hand (the core mechanic)

Add the interactive layer: the overpainted dial base, an overlay SVG in image-pixel space, and the sweeping night-hand driven by `render(t)` through the shared scrubber. This is the load-bearing "radial from a linear control" mechanic.

**Files:**
- Modify: `src/components/case-study/CodeBrainExplainer.astro` (full file below supersedes Task 2's)

**Interfaces:**
- Consumes: `wireScrubber(root, render, opts?)` and `easeInOut(x)` from `~/scripts/interactive-explainer`; the base's `.ie-stage` + `data-interactive-explainer="code-brain"` selector + `.ie-range`.
- Produces: the overlay SVG `viewBox="0 0 1672 941"`, the `.cb-interactive` layer (shown only under `:global(.ie-root.is-interactive)`), the geometry constants `CX=800 CY=478 R=300`, `HAND_SWEEP_DEG=240`, `SWEEP_END=0.82`, and the `.cb-hand` `<line>` element rotated by `render(t)`. Tasks 4-5 add elements inside `.cb-svg` / `.cb-interactive` and extend the `render(t)` body.

- [ ] **Step 1: Replace the component with the radial-core version**

Overwrite `src/components/case-study/CodeBrainExplainer.astro`:

```astro
---
/**
 * <CodeBrainExplainer /> — interactive "Drag the night" radial dial
 * (rollout §2 / spec 2026-06-21). Consumes <InteractiveExplainer/> for chrome +
 * the progressive-enhancement contract; owns the radial interaction.
 *
 * The reader sweeps a "now" hand dusk -> dawn around the clock dial. As the hand
 * passes each station the node lights teal and a note resolves in place
 * (capture -> synthesize -> two-critic gate -> vault); the figure stays asleep.
 * At dawn an amber wash sweeps in, an SVG sun rises, 08:30 prints, and a
 * dateline-style masthead resolves. (Stations: Task 4. Dawn: Task 5.)
 *
 * Art: the colored dial with the dawn cluster overpainted out
 * (code-brain-dial.webp, NOT keyed). The base stays a bordered white card like
 * the shipped static; the hand / glows / note / sun / masthead are live SVG/DOM.
 *
 * Geometry is in image-pixel space: the base art is 1672x941 (exactly 16:9), so
 * the overlay SVG viewBox 0 0 1672 941 aligns 1:1 with the contained image, and
 * the "radial" is just render(t) rotating the hand. The control stays linear.
 *
 * Progressive enhancement: no-JS / prefers-reduced-motion shows the original
 * code-brain.webp (complete diagram) with the scrubber hidden.
 */
import InteractiveExplainer from "./InteractiveExplainer.astro";

interface Props {
  src: string;
  alt: string;
}
const { src, alt } = Astro.props;

const V = "?v=2026-06-21";
const dialArt = `/assets/projects/explainers/code-brain-dial.webp${V}`;

// Dial geometry in source pixels (1672x941). TUNE in Task 6.
const CX = 800;
const CY = 478;
const R = 300;
---

<InteractiveExplainer
  variant="code-brain"
  aspectRatio="16 / 9"
  scrub={{
    title: "The night shift",
    hint: "Drag from dusk to dawn →",
    ariaLabel:
      "Drag from dusk to dawn to watch the fleet capture, synthesize, vet, and vault the day's notes by 08:30",
    ticks: ["Dusk", "Midnight", "Dawn"],
  }}
>
  {/* no-JS / reduced-motion floor — the complete diagram */}
  <img class="cb-static" src={src} alt={alt} draggable="false" decoding="async" />

  {/* interactive layers — shown only when JS adds is-interactive */}
  <div class="cb-interactive">
    {/* overpainted base (dawn cluster removed) */}
    <img class="cb-base" src={dialArt} alt={alt} draggable="false" decoding="async" />

    {/* overlay SVG in image-pixel space — hand (Task 3), node glows + note (Task 4) */}
    <svg
      class="cb-svg"
      viewBox="0 0 1672 941"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      aria-hidden="true"
    >
      {/* night-hand: a line from the dial center pointing up at rest, rotated by render(t) */}
      <g class="cb-hand" transform={`rotate(0 ${CX} ${CY})`}>
        <line x1={CX} y1={CY} x2={CX} y2={CY - R} stroke="var(--teal)" stroke-width="3" stroke-linecap="round" />
      </g>
      <circle cx={CX} cy={CY} r="6" fill="var(--teal)" />
    </svg>
  </div>

  {/* state narration for screen readers */}
  <span class="ie-sr-only" aria-live="polite" data-cb-sr>The night shift: dusk.</span>
</InteractiveExplainer>

<style>
  .cb-static {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .cb-interactive {
    display: none;
    position: absolute;
    inset: 0;
    container-type: inline-size; /* cqw drives any in-stage DOM typography (Task 5) */
  }
  :global(.ie-root.is-interactive) .cb-interactive { display: block; }
  :global(.ie-root.is-interactive) .cb-static { display: none; }

  .cb-base {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
  }

  .cb-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .ie-sr-only {
    position: absolute;
    width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }
</style>

<script>
  import { wireScrubber, easeInOut } from "~/scripts/interactive-explainer";

  const CX = 800, CY = 478;          // dial center (px) — TUNE in Task 6
  const HAND_SWEEP_DEG = 240;        // 12 o'clock -> ~8 o'clock (vault), clockwise
  const SWEEP_END = 0.82;            // hand reaches the vault at t=0.82; 0.82-1.0 = dawn
  const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

  document
    .querySelectorAll<HTMLElement>('[data-interactive-explainer="code-brain"]')
    .forEach((root) => {
      const hand = root.querySelector<SVGGElement>(".cb-hand");
      const sr = root.querySelector<HTMLElement>("[data-cb-sr]");
      if (!hand) return;

      wireScrubber(root, (t) => {
        // night-hand sweeps clockwise from 12 o'clock to the vault over [0, SWEEP_END]
        const rot = HAND_SWEEP_DEG * easeInOut(clamp01(t / SWEEP_END));
        hand.setAttribute("transform", `rotate(${rot.toFixed(2)} ${CX} ${CY})`);

        if (sr) sr.textContent = t < SWEEP_END ? "The night shift: in progress." : "The night shift: ready at 08:30.";
      });
    });
</script>
```

- [ ] **Step 2: Visually verify the sweep**

Run: `npm run dev`, open `/work/code-brain`, drag the scrubber.
Expected: the scrubber is now visible; at `t=0` the night-hand points to 12 o'clock (NOTES IN); dragging sweeps it clockwise; near the right end it points at the VAULT node (~8 o'clock). The overpainted base shows (no sun/08:30/newspaper). With the scrubber at 0 and reloaded, reduced-motion (DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`) shows the original full diagram with no scrubber.

- [ ] **Step 3: Verify the build**

Run: `npm run validate`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/case-study/CodeBrainExplainer.astro
git commit -m "feat(explainer): code-brain radial night-hand core"
```

---

### Task 4: Station activation — node glows + note-card + two-critic glance

As the hand passes each station, the node lights teal and a single note-card resolves in place, transforming stage to stage (raw → concept → vetted). At the gate, a quick ✓ / ✗ shows the two critics; the rejected ghost fades. Notes snap between stations (straight chord, short ease) — no path-following along the dial curve (decision #4).

**Files:**
- Modify: `src/components/case-study/CodeBrainExplainer.astro` (add markup inside `.cb-svg`, CSS, and `render(t)` body)

**Interfaces:**
- Consumes: the `.cb-svg` overlay + `render(t)` from Task 3; the `NODES` station table below.
- Produces: `.cb-node` glow circles (one per station, `data-node` keyed), the `.cb-note` group (repositioned + reglyphed each frame), the `.cb-verdict` ✓/✗ marks.

- [ ] **Step 1: Add the station markup inside `.cb-svg`**

In `CodeBrainExplainer.astro`, in the frontmatter add the station table after the `const R = 300;` line:

```astro
// Station centers in source pixels + the t at which the hand reaches each.
// TUNE in Task 6 (measure against code-brain-dial.webp). NOTES IN is the start.
const NODES = [
  { key: "capture",  x: 1075, y: 378, t: 0.235 },
  { key: "synth",    x: 1108, y: 612, t: 0.382 },
  { key: "criticR",  x: 940,  y: 760, t: 0.516 },
  { key: "criticL",  x: 715,  y: 760, t: 0.661 },
  { key: "vault",    x: 505,  y: 620, t: 0.820 },
];
const NOTE0 = { x: 800, y: 188 }; // NOTES IN — where the raw note starts
```

In the SVG, immediately after the closing `</g>` of `.cb-hand` and before the center `<circle>`, insert the node glows, the verdict marks, and the note-card:

```astro
      {/* per-station glow rings — lit as the hand passes (render sets opacity) */}
      {NODES.map((n) => (
        <circle class="cb-node" data-node={n.key} cx={n.x} cy={n.y} r="44" stroke="var(--teal)" stroke-width="3" opacity="0" />
      ))}

      {/* two-critic verdicts — quick glance at the gate (render toggles opacity) */}
      <g class="cb-verdict cb-approve" data-verdict="approve" opacity="0">
        <path d="M925 760 l10 12 l22 -26" stroke="var(--teal)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      </g>
      <g class="cb-verdict cb-reject" data-verdict="reject" opacity="0">
        <path d="M702 748 l26 26 M728 748 l-26 26" stroke="var(--ink-secondary)" stroke-width="5" stroke-linecap="round" />
      </g>

      {/* the single note-card — snaps to the active station, glyph transforms by stage */}
      <g class="cb-note" data-note transform={`translate(${NOTE0.x} ${NOTE0.y})`} opacity="0">
        <rect x="-26" y="-20" width="52" height="40" rx="3" fill="var(--paper)" stroke="var(--ink)" stroke-width="2.5" />
        {/* stage glyphs, toggled by render: raw lines / connected concept / vetted check */}
        <g class="cb-note-raw">
          <line x1="-16" y1="-8" x2="16" y2="-8" stroke="var(--ink-secondary)" stroke-width="2.5" />
          <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--ink-secondary)" stroke-width="2.5" />
          <line x1="-16" y1="8" x2="6" y2="8" stroke="var(--ink-secondary)" stroke-width="2.5" />
        </g>
        <g class="cb-note-concept" opacity="0">
          <circle cx="-12" cy="-6" r="3.5" fill="var(--teal)" /><circle cx="10" cy="-9" r="3.5" fill="var(--teal)" />
          <circle cx="2" cy="8" r="3.5" fill="var(--teal)" />
          <path d="M-12 -6 L10 -9 L2 8 Z" stroke="var(--teal)" stroke-width="2" fill="none" />
        </g>
        <g class="cb-note-vetted" opacity="0">
          <path d="M-14 0 l9 10 l19 -22" stroke="var(--success-teal)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </g>
      </g>
```

- [ ] **Step 2: Add the note transition CSS**

In the component `<style>`, add (the straight-chord ease — snap, not path-follow):

```css
  .cb-note { transition: transform 0.28s var(--ease-out, ease-out); }
  .cb-node, .cb-verdict, .cb-note-raw, .cb-note-concept, .cb-note-vetted { transition: opacity 0.18s linear; }
```

- [ ] **Step 3: Extend `render(t)` with station activation**

Replace the `<script>` block's `forEach` body so `render(t)` also drives the nodes, note, and verdicts. Full script:

```astro
<script>
  import { wireScrubber, easeInOut } from "~/scripts/interactive-explainer";

  const CX = 800, CY = 478;
  const HAND_SWEEP_DEG = 240;
  const SWEEP_END = 0.82;
  const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

  // Station centers + activation t (must match the .astro NODES table). TUNE in Task 6.
  const NODES = [
    { key: "capture", x: 1075, y: 378, t: 0.235 },
    { key: "synth",   x: 1108, y: 612, t: 0.382 },
    { key: "criticR", x: 940,  y: 760, t: 0.516 },
    { key: "criticL", x: 715,  y: 760, t: 0.661 },
    { key: "vault",   x: 505,  y: 620, t: 0.820 },
  ];
  const at = (k: string) => NODES.find((n) => n.key === k)!;

  document
    .querySelectorAll<HTMLElement>('[data-interactive-explainer="code-brain"]')
    .forEach((root) => {
      const hand = root.querySelector<SVGGElement>(".cb-hand");
      const note = root.querySelector<SVGGElement>("[data-note]");
      const noteRaw = root.querySelector<SVGGElement>(".cb-note-raw");
      const noteConcept = root.querySelector<SVGGElement>(".cb-note-concept");
      const noteVetted = root.querySelector<SVGGElement>(".cb-note-vetted");
      const approve = root.querySelector<SVGGElement>('[data-verdict="approve"]');
      const reject = root.querySelector<SVGGElement>('[data-verdict="reject"]');
      const nodeEls = new Map(
        Array.from(root.querySelectorAll<SVGCircleElement>(".cb-node")).map((el) => [el.dataset.node!, el]),
      );
      const sr = root.querySelector<HTMLElement>("[data-cb-sr]");
      if (!hand) return;

      const setOp = (el: Element | null, v: number) => el && ((el as HTMLElement).style.opacity = v.toFixed(3));

      wireScrubber(root, (t) => {
        // 1) night-hand sweep
        const rot = HAND_SWEEP_DEG * easeInOut(clamp01(t / SWEEP_END));
        hand.setAttribute("transform", `rotate(${rot.toFixed(2)} ${CX} ${CY})`);

        // 2) nodes light as the hand reaches each station t
        for (const n of NODES) setOp(nodeEls.get(n.key) ?? null, t >= n.t ? 1 : 0);

        // 3) the single note snaps to the latest reached station, glyph by stage
        let pos = { x: 800, y: 188 }; // NOTES IN
        let stage = 0; // 0 raw, 1 concept, 2 vetted
        if (t >= at("capture").t) { pos = at("capture"); stage = 0; }
        if (t >= at("synth").t)   { pos = at("synth");   stage = 1; }
        if (t >= at("criticR").t) { pos = { x: 828, y: 815 }; stage = 1; } // the fork's rejoin point
        if (t >= at("criticL").t) { stage = 2; }                            // survived the gate
        if (t >= at("vault").t)   { pos = at("vault"); stage = 2; }
        if (note) {
          note.setAttribute("transform", `translate(${pos.x} ${pos.y})`);
          setOp(note, t >= 0.06 ? 1 : 0); // appears just after dusk
        }
        setOp(noteRaw, stage === 0 ? 1 : 0);
        setOp(noteConcept, stage === 1 ? 1 : 0);
        setOp(noteVetted, stage === 2 ? 1 : 0);

        // 4) two-critic quick glance: ✓ + ✗ flash on between the two critic t's
        const inGate = t >= at("criticR").t && t <= at("criticL").t + 0.06;
        setOp(approve, inGate ? 1 : 0);
        setOp(reject, inGate ? 1 : 0);

        if (sr) {
          sr.textContent =
            t < at("capture").t ? "The night shift: dusk, one note in." :
            t < at("synth").t   ? "Captured." :
            t < at("criticR").t ? "Synthesized into a concept." :
            t < at("vault").t   ? "Two critics: one rejects, one approves." :
            t < SWEEP_END       ? "Vaulted as vetted knowledge." :
                                  "Ready at 08:30.";
        }
      });
    });
</script>
```

- [ ] **Step 4: Visually verify station activation**

Run: `npm run dev`, `/work/code-brain`, drag slowly.
Expected: each node lights teal as the hand reaches it (CAPTURE → SYNTHESIZE → the two CRITICs → VAULT); the note-card appears at NOTES IN, snaps station to station, and its glyph changes raw lines → connected concept → green check; around the critic gate a teal ✓ and an ink ✗ flash briefly. No console errors.

- [ ] **Step 5: Verify + commit**

Run: `npm run validate` → exits 0.

```bash
git add src/components/case-study/CodeBrainExplainer.astro
git commit -m "feat(explainer): code-brain station activation + two-critic glance"
```

---

### Task 5: Dawn payoff — wash + SVG sun + 08:30 + masthead + rough-notation

From `t≈0.82` to `1.0`, the night resolves into morning: an amber wash fades over the dial, an SVG sun rises lower-right, `08:30` prints, and a dateline-style masthead resolves. A single `rough-notation` circle draws on `08:30` at the very top, lazy-loaded to this island.

**Files:**
- Modify: `src/components/case-study/CodeBrainExplainer.astro` (add the dawn markup, CSS, the masthead import, and the dawn portion of `render(t)`)

**Interfaces:**
- Consumes: `dateline()` from `~/lib/dateline`; `annotate` from `rough-notation` (dynamic import); the `render(t)` from Task 4.
- Produces: `.cb-wash`, `.cb-sun`, the `.cb-dawn` DOM card (08:30 + masthead). No new exports.

- [ ] **Step 1: Import the dateline stamp**

In the frontmatter, add the import and compute the stamp (after the existing imports / consts):

```astro
import { dateline } from "~/lib/dateline";
const stamp = dateline(); // e.g. "BOSTON, JUNE 21, 2026"
```

- [ ] **Step 2: Add the dawn markup**

Inside `.cb-interactive`, after the `</svg>` overlay, add the wash + sun (SVG) and the dawn DOM card:

```astro
    {/* dawn wash + SVG sun — drawn in the same image-pixel space, above the base */}
    <svg class="cb-dawn-svg" viewBox="0 0 1672 941" preserveAspectRatio="xMidYMid meet" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="cb-dawn-grad" cx="80%" cy="92%" r="70%">
          <stop offset="0%" stop-color="var(--stamp-amber)" stop-opacity="0.22" />
          <stop offset="100%" stop-color="var(--stamp-amber)" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect class="cb-wash" x="0" y="0" width="1672" height="941" fill="url(#cb-dawn-grad)" opacity="0" />
      {/* simple amber sun rising lower-right (echoes the original glyph) */}
      <g class="cb-sun" opacity="0">
        <circle cx="1180" cy="820" r="34" stroke="var(--stamp-amber)" stroke-width="4" fill="none" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <line
            x1={1180 + Math.cos((a * Math.PI) / 180) * 46}
            y1={820 + Math.sin((a * Math.PI) / 180) * 46}
            x2={1180 + Math.cos((a * Math.PI) / 180) * 60}
            y2={820 + Math.sin((a * Math.PI) / 180) * 60}
            stroke="var(--stamp-amber)" stroke-width="3.5" stroke-linecap="round"
          />
        ))}
      </g>
    </svg>

    {/* dawn DOM card: 08:30 + dateline-style masthead (real text for screen readers) */}
    <div class="cb-dawn">
      <span class="cb-clock" data-cb-clock>08:30</span>
      <span class="cb-masthead">{stamp}</span>
    </div>
```

- [ ] **Step 3: Add the dawn CSS**

In `<style>`, add:

```css
  .cb-dawn-svg {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    overflow: visible;
    pointer-events: none;
  }
  .cb-wash, .cb-sun { transition: opacity 0.2s linear; }

  /* dawn DOM card, lower-right, in container-query units so it scales with the figure */
  .cb-dawn {
    position: absolute;
    right: 5cqw;
    bottom: 7cqw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.6cqw;
    opacity: 0;
    transition: opacity 0.25s linear;
    text-align: right;
  }
  .cb-clock {
    font-family: var(--font-mono);
    font-size: 4cqw;
    font-weight: 500;
    letter-spacing: 0.06em;
    color: var(--stamp-amber);
    line-height: 1;
  }
  .cb-masthead {
    font-family: var(--font-mono);
    font-size: 1.5cqw;
    font-weight: 500;
    letter-spacing: 0.12em;
    color: var(--stamp-amber);
    border-top: 0.5px solid var(--border-paper);
    padding-top: 0.5cqw;
  }
```

- [ ] **Step 4: Extend `render(t)` with the dawn sequence + rough-notation**

In the `<script>`, (a) add the dawn element lookups inside the `forEach` (next to the others):

```ts
      const wash = root.querySelector<SVGRectElement>(".cb-wash");
      const sun = root.querySelector<SVGGElement>(".cb-sun");
      const dawn = root.querySelector<HTMLElement>(".cb-dawn");
      const clock = root.querySelector<HTMLElement>("[data-cb-clock]");

      const css = getComputedStyle(document.documentElement);
      const stampAmber = css.getPropertyValue("--stamp-amber").trim() || "#7C2D12";
      let annotation: { show(): void; hide(): void } | null = null;
      let circleOn = false;
      async function ensureCircle() {
        if (!annotation && clock) {
          const { annotate } = await import("rough-notation");
          annotation = annotate(clock, { type: "circle", color: stampAmber, strokeWidth: 2, padding: 6, animationDuration: 500 });
        }
        if (annotation && !circleOn) { annotation.show(); circleOn = true; }
      }
      function hideCircle() { if (annotation && circleOn) { annotation.hide(); circleOn = false; } }
```

and (b) append the dawn block at the end of the `wireScrubber(root, (t) => { ... })` callback, after the SR narration:

```ts
        // 5) dawn: wash + sun + 08:30 + masthead ramp in over [SWEEP_END, 1]
        const dawnT = clamp01((t - SWEEP_END) / (1 - SWEEP_END));
        setOp(wash, dawnT);
        setOp(sun, dawnT);
        if (dawn) dawn.style.opacity = dawnT.toFixed(3);
        if (t >= 0.97) ensureCircle(); else hideCircle();
```

- [ ] **Step 5: Visually verify the dawn payoff**

Run: `npm run dev`, `/work/code-brain`, drag to the far right.
Expected: past ~0.82 an amber wash warms the lower-right, the SVG sun rises, `08:30` and the `BOSTON, JUNE 21, 2026` masthead fade in (right-aligned, mono, amber — reading like the strip at the top of the page); at the very end a rough-notation circle draws around `08:30`. The asleep figure never changes. Dragging back left reverses it cleanly. Reduced-motion still shows the original static diagram.

- [ ] **Step 6: Verify + commit**

Run: `npm run validate` → exits 0.

```bash
git add src/components/case-study/CodeBrainExplainer.astro
git commit -m "feat(explainer): code-brain dawn payoff (wash, sun, 08:30, masthead)"
```

---

### Task 6: Tune geometry/timing, accessibility, build + bundle, docs

Calibrate the estimated constants against the real render, run the a11y gate, confirm CLS + the bundle isolation, and flip the rollout status. This is the task a fresh reviewer signs off the whole figure on.

**Files:**
- Modify: `src/components/case-study/CodeBrainExplainer.astro` (constant tuning only)
- Modify: `scripts/prep-explainer-codebrain.py` (only if the `BOX` needed adjustment)
- Modify: `docs/specs/interactive-explainer-rollout-v1.md` (§2 + §8 status → BUILT)

**Interfaces:** none new — calibration + verification.

- [ ] **Step 1: Tune the geometry + beat timing**

In `npm run dev`, scrub slowly and adjust (keep the `.astro` `NODES`/`CX`/`CY`/`R` and the `<script>` `NODES`/`CX`/`CY` **in sync** — they are duplicated by design so the SSR markup and the client match):
- `CX`, `CY`, `R` so the hand pivots from the true dial center and its tip rides the ring.
- each `NODES[i].t` so a node lights exactly as the hand crosses it.
- the note's fork-rejoin point `{ x: 828, y: 815 }` so the card sits on the dial's bottom rejoin.
- `SWEEP_END` (0.82) if dawn needs more or less room.
Re-verify the full drag after tuning.

- [ ] **Step 2: Accessibility review**

Invoke the `design:accessibility-review` skill against the explainer. Confirm: the range has its `aria-label`; the `:focus-visible` amber ring shows on keyboard focus; the `data-cb-sr` `aria-live` region announces the beats; `08:30` + masthead are real text; color-contrast on the teal/amber beats meets AA. Fix anything it flags.

- [ ] **Step 3: Confirm CLS + reduced-motion + no-JS**

In `npm run dev`: hard-reload and confirm the explainer band reserves height before paint (no layout shift as the image loads — the `16/9` stage). Toggle DevTools `prefers-reduced-motion: reduce` → original `code-brain.webp`, no scrubber. Disable JS → same static fallback.

- [ ] **Step 4: Full build + bundle isolation**

Run: `npm run build`
Expected: completes without error (the `prebuild` validate/fetch/crosslink chain passes; needs network for `fetch_canonical_sources.mjs`).
Then confirm `rough-notation` ships only in the code-brain island: search the build output for the rough-notation chunk and verify it is a dynamic chunk, not in the main/shared bundle.

Run: `grep -rl "rough-notation\|RoughAnnotation" dist/_astro/*.js | head` — Expected: it appears only in a lazily-loaded chunk (the dynamic `import("rough-notation")`), consistent with the Intent island.

- [ ] **Step 5: Update the rollout doc status**

In `docs/specs/interactive-explainer-rollout-v1.md`:
- §2 (Code Brain): prepend a `**Status: BUILT 2026-06-21.**` line summarizing what shipped (radial dial; linear-control→angle render; overpainted-not-keyed base + SVG dawn; station-sequential note; two-critic glance; masthead via `dateline()`; rough-notation on 08:30; reduced-motion → static `code-brain.webp`), mirroring the Intent §3 "BUILT" note.
- §8 build-order table: mark the Code Brain row `✅ BUILT 2026-06-21`.

- [ ] **Step 6: Final commit**

```bash
git add src/components/case-study/CodeBrainExplainer.astro scripts/prep-explainer-codebrain.py docs/specs/interactive-explainer-rollout-v1.md
git commit -m "feat(explainer): tune code-brain dial, a11y pass, mark rollout BUILT"
```

---

## Self-Review

**1. Spec coverage** (spec §§1–13 → tasks):
- §1 decisions #1 autonomy (figure stays asleep, dawn payoff) → Tasks 3–5. #2 reuse+overpaint → Task 1. #3 masthead → Task 5. #4 station-sequential → Task 4. #5 no zones → Task 2 (no `zones` prop). #6 clean SVG hand → Task 3. #7 two-critic quick glance → Task 4. ✓
- §2 3-act script → Tasks 3 (open/sweep), 4 (climb/gate), 5 (close/dawn). ✓
- §3 control→radial mapping → Task 3 (`render(t)` rotates hand; linear range stays). ✓
- §4 layer model → Task 1 (baked base) + Tasks 3–5 (live layers). ✓
- §5 beat timeline → Task 4 (`NODES[].t`) + Task 5 (dawn ramp) + Task 6 (tune). ✓
- §6 color-as-actor → encoded in every markup block (Global Constraints lists exact tokens). ✓
- §7 asset pipeline → Task 1. ✓
- §8 component & wiring → Tasks 2–3. ✓
- §9 a11y / reduced-motion / CLS → Task 2 (fallback), 3 (sr region), 5 (live text), 6 (review/CLS). ✓
- §10 scope/YAGNI → respected (no path-travel, no live data, no keying, no figure animation). ✓
- §11 file manifest → matches Tasks 1–3, 6 file lists. ✓
- §12 verification gates → Task 6. ✓
- §13 tuning knobs → Task 6 Step 1. ✓

**2. Placeholder scan:** every code step carries complete code; no "TBD/TODO/add error handling/similar to Task N". The `// TUNE` markers are explicit calibration targets with a dedicated task (6.1), not gaps.

**3. Type consistency:** `NODES` station keys (`capture/synth/criticR/criticL/vault`) and `CX/CY/R`, `HAND_SWEEP_DEG`, `SWEEP_END` are identical between the `.astro` frontmatter and the `<script>` (intentionally duplicated SSR/client; Task 6.1 calls out keeping them in sync). `render(t)` signature (`(t: number) => void`) matches `wireScrubber`'s contract. `dateline()` returns `string` (verified in `src/lib/dateline.ts`). Props `{ src, alt }` match `ExplainerGraphic`'s `<Interactive src={...} alt={...} />` call and the `IntentExplainer` precedent.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-21-codebrain-interactive-explainer.md`. Two execution options:

1. **Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** — execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
