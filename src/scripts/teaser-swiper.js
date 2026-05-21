/**
 * Teaser swiper controller — vanilla pointer events + rAF + CSS custom properties.
 * Source: home-about-teaser-spec-v1.md §6.2 + §6.3 + §6.5.
 *
 * Module-scope state per spec OPEN-4 resolution.
 */

const SWIPE_THRESHOLD_PX = 50;
const FLY_DISTANCE_PX = 300;
const FLY_ROTATE_DEG = 20;
const FLY_DURATION_MS = 300;
const ROTATE_PER_DRAG_PX = 0.2; // deg per px

export function initTeaserSwiper({ container }) {
  if (!container) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const cards = Array.from(container.querySelectorAll(".teaser-card"));
  if (cards.length === 0) return;

  /** Mutable card-order: cardOrder[0] is always the front card (rendered index). */
  let cardOrder = cards.map((_, i) => i);
  let isDragging = false;
  let startX = 0;
  let currentDeltaX = 0;
  let rafId = 0;
  let isAutoCompleting = false;

  function frontCard() {
    return cards[cardOrder[0]];
  }

  /** Re-write --card-index on every card so the cascade renders cardOrder[0] in front. */
  function updatePositions() {
    cardOrder.forEach((cardListIndex, depth) => {
      const el = cards[cardListIndex];
      el.style.setProperty("--card-index", String(depth));
      el.setAttribute("data-card-index", String(depth));
      el.tabIndex = depth === 0 ? 0 : -1;
    });
  }

  /** Rotate front card to the back of cardOrder. */
  function rotateFrontToBack() {
    const [front, ...rest] = cardOrder;
    cardOrder = [...rest, front];
  }

  /** Rotate back card to the front (for reduced-motion "prev"). */
  function rotateBackToFront() {
    const last = cardOrder[cardOrder.length - 1];
    cardOrder = [last, ...cardOrder.slice(0, -1)];
  }

  /** Commit a completed swipe — front card flies out, then becomes back. */
  function commitSwipe(direction) {
    if (isAutoCompleting) return;
    isAutoCompleting = true;
    const card = frontCard();
    const flyX = direction === "right" ? FLY_DISTANCE_PX : -FLY_DISTANCE_PX;
    const flyRotate = direction === "right" ? FLY_ROTATE_DEG : -FLY_ROTATE_DEG;
    card.style.setProperty("--swipe-fly-x", `${flyX}px`);
    card.style.setProperty("--swipe-fly-rotate", `${flyRotate}deg`);
    card.classList.remove("is-dragging");
    card.classList.add("is-flying-out");

    setTimeout(() => {
      // Reset the inline drag state on the now-departing card
      card.style.removeProperty("--swipe-x");
      card.style.removeProperty("--swipe-rotate");
      card.style.removeProperty("--swipe-fly-x");
      card.style.removeProperty("--swipe-fly-rotate");
      card.style.opacity = "";
      card.classList.remove("is-flying-out");
      rotateFrontToBack();
      updatePositions();
      isAutoCompleting = false;
    }, FLY_DURATION_MS);
  }

  /** Snap front card back to neutral after a sub-threshold drag. */
  function snapBack() {
    const card = frontCard();
    card.classList.remove("is-dragging");
    // CSS handles the transition since is-dragging is gone
    card.style.removeProperty("--swipe-x");
    card.style.removeProperty("--swipe-rotate");
  }

  /** rAF-throttled drag-update writer. */
  function writeDragState() {
    const card = frontCard();
    const rotate = currentDeltaX * ROTATE_PER_DRAG_PX;
    const opacity = Math.max(0.25, 1 - (Math.abs(currentDeltaX) / 100) * 0.75);
    card.style.setProperty("--swipe-x", `${currentDeltaX}px`);
    card.style.setProperty("--swipe-rotate", `${rotate}deg`);
    card.style.opacity = String(opacity);

    // Auto-trigger mid-drag if past threshold
    if (!isAutoCompleting && Math.abs(currentDeltaX) > SWIPE_THRESHOLD_PX) {
      commitSwipe(currentDeltaX > 0 ? "right" : "left");
    }
    rafId = 0;
  }

  function onPointerDown(e) {
    if (reducedMotion) return;
    const card = frontCard();
    if (!card.contains(e.target)) return;
    isDragging = true;
    startX = e.clientX;
    currentDeltaX = 0;
    card.classList.add("is-dragging");
    card.setPointerCapture?.(e.pointerId);
  }

  function onPointerMove(e) {
    if (!isDragging || reducedMotion) return;
    currentDeltaX = e.clientX - startX;
    if (!rafId) rafId = requestAnimationFrame(writeDragState);
  }

  function onPointerUp() {
    if (!isDragging) return;
    isDragging = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (Math.abs(currentDeltaX) > SWIPE_THRESHOLD_PX) {
      if (!isAutoCompleting) {
        commitSwipe(currentDeltaX > 0 ? "right" : "left");
      }
    } else {
      snapBack();
    }
    currentDeltaX = 0;
    const card = frontCard();
    if (card && !card.classList.contains("is-flying-out")) {
      card.style.opacity = "";
    }
  }

  function onPointerCancel() {
    if (!isDragging) return;
    isDragging = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    snapBack();
    currentDeltaX = 0;
    const card = frontCard();
    card.style.opacity = "";
  }

  function onKeydown(e) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      if (reducedMotion) {
        rotateFrontToBack();
        updatePositions();
      } else {
        commitSwipe("right");
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (reducedMotion) {
        rotateBackToFront();
        updatePositions();
      } else {
        commitSwipe("left");
      }
    }
  }

  /** Reduced-motion `← prev / next →` buttons. */
  function wireReducedMotionButtons() {
    const buttons = container.parentElement?.querySelectorAll("[data-teaser-rm]") ?? [];
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dir = btn.getAttribute("data-teaser-rm");
        if (dir === "next") {
          rotateFrontToBack();
        } else if (dir === "prev") {
          rotateBackToFront();
        }
        updatePositions();
      });
    });
  }

  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerCancel);
  container.addEventListener("keydown", onKeydown);
  wireReducedMotionButtons();

  // Initial position write
  updatePositions();
}
