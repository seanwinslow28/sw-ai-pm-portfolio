/**
 * src/scripts/annotation-positioner.js — runtime positioner.
 *
 * Each <Annotation> renders as a fixed-size absolutely-positioned
 * element inside its nearest .annotation-anchor-root parent. The
 * positioner reads data-target + data-offset-x/y, resolves the
 * target's getBoundingClientRect relative to the root, and applies
 * top/left.
 *
 * ResizeObserver on the root re-runs the layout pass on viewport
 * changes. No layout reads inside RAF — geometry is event-driven.
 *
 * Source: case-study-spec-v1.md §11.
 */
function positionAnnotations(root) {
  if (!root) return;
  const annotations = root.querySelectorAll(".annotation[data-target]");
  const rootRect = root.getBoundingClientRect();
  annotations.forEach((el) => {
    const targetId = el.getAttribute("data-target");
    if (!targetId) return;
    const target = root.querySelector(targetId);
    if (!target) {
      el.style.display = "none";
      return;
    }
    const offsetX = parseInt(el.getAttribute("data-offset-x") || "0", 10);
    const offsetY = parseInt(el.getAttribute("data-offset-y") || "0", 10);
    const r = target.getBoundingClientRect();
    el.style.position = "absolute";
    el.style.left = `${r.right - rootRect.left + offsetX}px`;
    el.style.top = `${r.top - rootRect.top + offsetY}px`;
    el.style.display = "";
  });
}

export function initAnnotations() {
  const roots = document.querySelectorAll(".annotation-anchor-root");
  if (roots.length === 0) return;
  roots.forEach((root) => {
    positionAnnotations(root);
    const ro = new ResizeObserver(() => positionAnnotations(root));
    ro.observe(root);
  });
  // Defer one re-position pass after web fonts load (Newsreader/JetBrains
  // Mono reflow shifts artifact heights enough to misposition annotations
  // on first render).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      roots.forEach((root) => positionAnnotations(root));
    });
  }
}
