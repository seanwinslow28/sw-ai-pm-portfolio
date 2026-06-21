/**
 * Shared client logic for the interactive case-study explainers.
 *
 * Each explainer is a per-project island (AnimationPipelineExplainer,
 * IntentExplainer, …) that supplies its own render(t) over the keyed pencil art.
 * The boilerplate — the reduced-motion gate, the `is-interactive` opt-in, the
 * native range wiring, the track fill, and the initial paint — lives here so the
 * per-project components stay thin. Mirrors the src/scripts/teaser-swiper.js
 * shared-module pattern.
 *
 * Progressive enhancement is the contract: under prefers-reduced-motion (or with
 * no JS at all) wireScrubber no-ops and never adds `is-interactive`, so the stage
 * stays in its honest final state and the scrubber stays hidden.
 */

/** Cubic ease-in/out — slow-in, slow-out, never linear (animation spacing principle). */
export function easeInOut(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export interface ScrubberOptions {
  /** CSS color for the filled portion of the range track. Default: var(--teal). */
  fill?: string;
  /** CSS color for the unfilled portion of the range track. Default: var(--border-paper). */
  track?: string;
}

/**
 * Wire a per-project explainer's `.ie-range` scrubber to a render(t) callback.
 * `t` is the normalized 0..1 position. Returns true if interactivity was enabled
 * (false under reduced motion or when no range is present).
 */
export function wireScrubber(
  root: HTMLElement,
  render: (t: number) => void,
  opts: ScrubberOptions = {},
): boolean {
  const range = root.querySelector<HTMLInputElement>(".ie-range");
  if (!range) return false;

  // Reduced motion: leave the honest final state drawn, scrubber hidden.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;

  const fill = opts.fill ?? "var(--teal)";
  const track = opts.track ?? "var(--border-paper)";
  const max = parseInt(range.max, 10) || 1000;

  root.classList.add("is-interactive");

  function update() {
    const t = parseInt(range!.value, 10) / max;
    const pct = (t * 100).toFixed(1);
    range!.style.background = `linear-gradient(to right, ${fill} ${pct}%, ${track} ${pct}%)`;
    render(t);
  }

  range.addEventListener("input", update);
  update(); // initial fill + render at the starting value
  return true;
}
