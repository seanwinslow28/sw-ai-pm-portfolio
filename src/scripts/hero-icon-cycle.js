/**
 * Hero icon cycle controller (hero-spec §7.5.4).
 * - Advances active class on 8 stacked icons every 600ms
 * - Coordinates the final crossfade with WebM readyState >= 3
 * - Once per session via sessionStorage
 */

const CYCLE_INTERVAL_MS = 600;
const ICON_COUNT = 8;
const FINAL_CROSSFADE_MS = 300;
const SESSION_KEY = "hero-cycle-played";

export function initHeroIconCycle({ container, video }) {
  if (!container || !video) return;

  // Idempotency guard: if a previous init already started the cycle
  // on this container, the dataset flag is set — bail.
  if (container.dataset.cycleInitialized === "true") return;
  container.dataset.cycleInitialized = "true";

  // Reduced motion: skip the cycle entirely. The CSS keeps icon-7 visible.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  // Once-per-session bypass: skip to WebM steady state.
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    container.style.display = "none";
    video.style.opacity = "1";
    video.play().catch(() => {});
    return;
  }

  const icons = Array.from(container.querySelectorAll("img"));
  let i = 0;

  function advance() {
    icons[i].classList.remove("active");
    i = (i + 1) % ICON_COUNT;
    icons[i].classList.add("active");
    if (i < ICON_COUNT - 1) {
      setTimeout(advance, CYCLE_INTERVAL_MS);
    } else {
      // Last icon (icon-8) — hold for one beat, then crossfade to WebM
      setTimeout(handleFinalCrossfade, CYCLE_INTERVAL_MS);
    }
  }

  function handleFinalCrossfade() {
    function crossfade() {
      video.style.transition = `opacity ${FINAL_CROSSFADE_MS}ms linear`;
      video.style.opacity = "1";
      container.style.transition = `opacity ${FINAL_CROSSFADE_MS}ms linear`;
      container.style.opacity = "0";
      video.play().catch(() => {});
      setTimeout(() => {
        container.remove();
        sessionStorage.setItem(SESSION_KEY, "true");
      }, FINAL_CROSSFADE_MS + 50);
    }

    if (video.readyState >= 3) {
      crossfade();
    } else {
      video.addEventListener("canplay", crossfade, { once: true });
    }
  }

  // Start cycle (icon-0 already active in HTML)
  setTimeout(advance, CYCLE_INTERVAL_MS);
}
