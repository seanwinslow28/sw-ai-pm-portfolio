/**
 * biesty-cutaway.ts — lens-mode enhancement for <BiestyCutaway />.
 *
 * The floor (docked card grid below the plate) is the server-rendered
 * truth. This script upgrades to lens mode ONLY when every gate passes:
 *   - fine pointer + real hover + ≥768px viewport
 *   - no prefers-reduced-motion
 * Touch, narrow, reduced-motion, and no-JS all keep the floor.
 *
 * Lens mode: a cursor lens follows the pointer across the plate,
 * hotspots glow on approach, click peels the card open while an iris
 * dims the room. Esc / click-outside / re-click closes. One card at a
 * time; focus moves into the card and returns to the hotspot on close.
 *
 * Motion: GSAP core + CustomEase (licensed per DESIGN.md's Licensed
 * Motion Registry — About row). Attract layer: ONE lens sweep on first
 * viewport entry, then settle. Entrances one-shot; nothing loops.
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

/* The house peel curve — a settled ease-out-quart relative (DESIGN.md
 * --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1)). */
const PEEL_EASE = CustomEase.create("swPeel", "M0,0 C0.165,0.84 0.44,1 1,1");

const NEAR_RADIUS = 110; // px — hotspot glow-on-approach distance

export function initBiestyCutaway(): void {
  const root = document.querySelector<HTMLElement>("[data-cutaway]");
  if (!root) return;

  const wantsLens =
    window.matchMedia("(pointer: fine) and (hover: hover) and (min-width: 768px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!wantsLens) return; // the floor stays — by design, not by failure

  const plate = root.querySelector<HTMLElement>("[data-plate]");
  const lens = root.querySelector<HTMLElement>("[data-lens]");
  const iris = root.querySelector<HTMLElement>("[data-iris]");
  const hint = root.querySelector<HTMLElement>("[data-hint]");
  const hotspots = Array.from(root.querySelectorAll<HTMLButtonElement>("[data-hotspot]"));
  const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
  if (!plate || !lens || !iris || !hint || hotspots.length === 0) return;

  root.classList.add("is-lens");
  hint.hidden = false;

  const lensX = gsap.quickTo(lens, "x", { duration: 0.25, ease: "power2.out" });
  const lensY = gsap.quickTo(lens, "y", { duration: 0.25, ease: "power2.out" });

  let openCard: HTMLElement | null = null;
  let openButton: HTMLButtonElement | null = null;

  /* --- Cursor lens + glow-on-approach --- */

  plate.addEventListener("pointermove", (e: PointerEvent) => {
    const r = plate.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    lensX(x);
    lensY(y);
    gsap.to(lens, { opacity: openCard ? 0 : 1, duration: 0.2, overwrite: "auto" });

    for (const b of hotspots) {
      const bx = (Number(b.dataset.x) / 100) * r.width;
      const by = (Number(b.dataset.y) / 100) * r.height;
      b.classList.toggle("is-near", Math.hypot(bx - x, by - y) < NEAR_RADIUS);
    }
  });

  plate.addEventListener("pointerleave", () => {
    gsap.to(lens, { opacity: 0, duration: 0.25, overwrite: "auto" });
    hotspots.forEach((b) => b.classList.remove("is-near"));
  });

  /* --- Attract: one lens sweep on first viewport entry, then settle --- */

  const attract = new IntersectionObserver(
    (entries) => {
      if (!entries.some((en) => en.isIntersecting)) return;
      attract.disconnect();
      const r = plate.getBoundingClientRect();
      gsap.set(lens, { x: r.width * 0.3, y: r.height * 0.55 });
      gsap
        .timeline()
        .to(lens, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .to(lens, { x: r.width * 0.68, y: r.height * 0.45, duration: 1.4, ease: "power1.inOut" }, "<")
        .to(lens, { opacity: 0, duration: 0.5, ease: "power2.in" }, "-=0.2");
    },
    { threshold: 0.45 },
  );
  attract.observe(plate);

  /* --- Open / close choreography --- */

  function positionCard(card: HTMLElement, button: HTMLButtonElement): void {
    // Anchor the card on the emptier side of the plate: hotspots left of
    // center get the card on the right, and vice versa. Never over the
    // hotspot itself — the drawing stays visible around the iris hole.
    const hx = Number(button.dataset.x);
    const hy = Number(button.dataset.y);
    if (hx < 50) {
      card.style.left = "auto";
      card.style.right = "6%";
    } else {
      card.style.right = "auto";
      card.style.left = "6%";
    }
    card.style.top = `${Math.min(Math.max(hy - 18, 6), 46)}%`;
  }

  function openFor(button: HTMLButtonElement): void {
    const card = cards.find((c) => c.dataset.card === button.dataset.hotspot);
    if (!card) return;
    if (openCard) closeCard(false);

    openCard = card;
    openButton = button;
    button.setAttribute("aria-expanded", "true");
    positionCard(card, button);
    card.classList.add("is-open");

    iris.style.background = `radial-gradient(circle 120px at ${button.dataset.x}% ${button.dataset.y}%, rgba(26,26,26,0) 0%, rgba(26,26,26,0) 60%, rgba(26,26,26,0.45) 100%)`;

    gsap
      .timeline()
      .to(iris, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .fromTo(
        card,
        { opacity: 0, scale: 0.92, rotate: -1.5, y: 10 },
        { opacity: 1, scale: 1, rotate: 0, y: 0, duration: 0.45, ease: PEEL_EASE },
        "-=0.15",
      );
    gsap.to(lens, { opacity: 0, duration: 0.2, overwrite: "auto" });
    card.focus({ preventScroll: true });
  }

  function closeCard(restoreFocus = true): void {
    if (!openCard || !openButton) return;
    const card = openCard;
    const button = openButton;
    openCard = null;
    openButton = null;

    button.setAttribute("aria-expanded", "false");
    gsap.to(iris, { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(card, {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        card.classList.remove("is-open");
        gsap.set(card, { clearProps: "opacity,scale,rotate,y" });
      },
    });
    if (restoreFocus) button.focus({ preventScroll: true });
  }

  hotspots.forEach((b) =>
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      if (openButton === b) closeCard();
      else openFor(b);
    }),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeCard();
  });

  document.addEventListener("click", (e) => {
    if (!openCard) return;
    const t = e.target as Node;
    if (!openCard.contains(t)) closeCard(false);
  });
}
