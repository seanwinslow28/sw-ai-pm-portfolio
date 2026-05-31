/**
 * Custom cursor — RAF-driven lerp + hover state class toggles.
 * Source: hero-spec §9.
 */
import { useEffect, useRef } from "react";

const LERP = 0.15;
const SCALE_LERP = 0.22; // snappier than position — Emil snap-feedback
const DEFAULT_SIZE = 6;
const HOVER_NAME_SIZE = 60;
const HOVER_NAME_SCALE = HOVER_NAME_SIZE / DEFAULT_SIZE; // 10× — grows from center

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    targetScale: 1,
    currentScale: 1,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const el = cursorRef.current;
    if (!el) return;
    el.style.display = "block";

    function onMove(e: MouseEvent) {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!el) return;
      if (target.closest(".hero-name")) {
        el.classList.add("cursor--hover-name");
        stateRef.current.targetScale = HOVER_NAME_SCALE;
      } else if (target.closest(".character")) {
        el.classList.add("cursor--hover-character");
      }
    }

    function onMouseOut() {
      el?.classList.remove("cursor--hover-name", "cursor--hover-character");
      stateRef.current.targetScale = 1;
    }

    let raf = 0;
    function tick() {
      const s = stateRef.current;
      s.currentX += (s.targetX - s.currentX) * LERP;
      s.currentY += (s.targetY - s.currentY) * LERP;
      s.currentScale += (s.targetScale - s.currentScale) * SCALE_LERP;
      if (el) {
        // Compose position + hover scale in one transform (no layout-property
        // animation). Origin is the dot's center, so scale grows symmetrically
        // around the cursor point.
        el.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0) scale(${s.currentScale})`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        borderRadius: "50%",
        backgroundColor: "#1A1A1E",
        pointerEvents: "none",
        zIndex: 800,
        mixBlendMode: "difference",
        marginLeft: -DEFAULT_SIZE / 2,
        marginTop: -DEFAULT_SIZE / 2,
        display: "none",
      }}
      className="cursor"
    />
  );
}
