/**
 * Custom cursor — RAF-driven lerp + hover state class toggles.
 * Source: hero-spec §9.
 */
import { useEffect, useRef } from "react";

const LERP = 0.15;
const DEFAULT_SIZE = 6;
const HOVER_NAME_SIZE = 60;
const HOVER_DURATION = 160; // ms — Emil snap-feedback

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
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
      } else if (target.closest(".character")) {
        el.classList.add("cursor--hover-character");
      }
    }

    function onMouseOut() {
      el?.classList.remove("cursor--hover-name", "cursor--hover-character");
    }

    let raf = 0;
    function tick() {
      const s = stateRef.current;
      s.currentX += (s.targetX - s.currentX) * LERP;
      s.currentY += (s.targetY - s.currentY) * LERP;
      if (el) {
        el.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0)`;
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
        transition: `width ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), height ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), margin ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        marginLeft: -DEFAULT_SIZE / 2,
        marginTop: -DEFAULT_SIZE / 2,
        display: "none",
      }}
      className="cursor"
    />
  );
}
