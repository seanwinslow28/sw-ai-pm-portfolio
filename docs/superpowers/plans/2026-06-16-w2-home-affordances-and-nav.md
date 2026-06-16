# W2 — Home Affordances + Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the home page easier to navigate and read: add a minimal corner nav, enlarge the projects dateline, remove the misleading "updated weekly" annotation, and make the teaser-deck swipe affordance obvious and touch-visible so it no longer reads as a glitch.

**Architecture:** Four small, independent changes on the home page (`src/pages/index.astro` and its sections). One new component (`HomeCornerNav.astro`); three edits to existing components (`DatelineLabel`, `ProjectsSection`, `SwipeMeIndicator`). No content or data changes.

**Tech Stack:** Astro 5, Tailwind 4. **Verification model:** no component unit tests in this repo — verify via `npm run build` (must succeed) and a visual check at `npm run dev` (http://localhost:4321), on both a desktop width and a narrow/touch width (DevTools device mode). Each task ends with build + visual check + commit.

**Spec:** [`docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md`](../specs/2026-06-16-portfolio-critique-execution-design.md) §6. **Decision D2:** minimal corner nav (Option A).

---

## Status — ✅ COMPLETE (2026-06-16)

All five tasks implemented via subagent-driven-development on `feat/2026-06-16-critique-w2-home-affordances-and-nav` (off `main`), each gated by a spec+quality review, then a clean whole-branch review and a browser visual-QA pass. Shipped as **PR [#25](https://github.com/seanwinslow28/sw-ai-pm-portfolio/pull/25)**.

| Task | Status | Commit |
|---|---|---|
| 1 — Minimal corner nav (D2) | ✅ done | `1809f20` |
| 2 — Enlarge projects dateline | ✅ done | `dc607f7` |
| 3 — Remove "updated weekly" annotation | ✅ done | `ba6b01a` |
| 4 — Swipe affordance + card-stack peek | ✅ done | `10d8063` |
| 5 — Docs (CLAUDE.md + specs + CHANGELOG) | ✅ done | `c68956f` |

(Base commit `fe48707` carries the critique-pass scaffolding — W1/W3 plans, execution spec, CLAUDE.md status — so the task commits stay focused.)

**Verification:** `npm run build` green (full prebuild validate/fetch/crosslink chain + 34 pages). Browser visual QA (Playwright, desktop 1280px / 1024–1100px band / mobile 390px) confirmed: corner nav legible + pinned on scroll; enlarged dateline readable; no annotation; `← SWIPE ME` right-of-deck on desktop and visible **below** the deck on touch (computed `opacity:1`, centered); card-stack peek renders **behind** the front card.

**Note on Task 4 Step 4 (tune offsets):** evaluated in the visual pass — the plan's starting rotation/offset values (`-3deg`/`2.5deg`, ±6px) read well at all widths, so **no tuning was needed**.

**Nothing blocking remains.** Optional, deferred polish (logged, not required for merge):
- Mobile `← SWIPE ME` is subtle and sits close to the busy fanned peek — could read a touch stronger.
- `TeaserSwiper.astro` now has two `.teaser-swiper` rules (existing props + plan-mandated `{ z-index: 1 }`, no collision) — consolidate next time the file is touched.
- Removing the `updated-weekly` CSS also dropped the `/* Pencil annotation positioning */` section comment above the surviving `rev-3`/`registration-mark` rules (cosmetic; could re-add).
- The corner-nav CHANGELOG bullet's `§2.1 + §3.2` tag is slightly imprecise for the swipe-affordance item (it's a home-about-teaser §6.4 concern; already cross-referenced).

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `src/components/chrome/HomeCornerNav.astro` | Quiet home-only nav | Create |
| `src/pages/index.astro` | Home composition | Add `<HomeCornerNav />` |
| `src/components/projects/DatelineLabel.astro` | `WORK · N PIECES · UPDATED …` label | Enlarge font |
| `src/components/projects/ProjectsSection.astro` | Projects splash | Remove `updated-weekly` annotation |
| `src/components/teaser/SwipeMeIndicator.astro` | Swipe affordance | Reposition right, show on touch, restyle |
| `src/components/teaser/TeaserSwiper.astro` | Deck wrapper | Add a "card stack" peek cue |
| `CLAUDE.md` · specs · `CHANGELOG.md` | Docs | Update the "no top nav on home" decision |

---

### Task 1: Minimal corner nav (Option A)

**Files:**
- Create: `src/components/chrome/HomeCornerNav.astro`
- Modify: `src/pages/index.astro`

- [x] **Step 1: Create the component**

```astro
---
/**
 * <HomeCornerNav /> — minimal home-only nav (critique W2, decision D2).
 *
 * The home page is intentionally chrome-free (BaseLayout noChrome={true}),
 * but recruiters need a cue that there's more and a way to jump. This is a
 * quiet paper pill in the top-right corner: wordmark + two jump links. It is
 * NOT the full sticky SiteNav used on sub-pages.
 */
import { WORDMARK } from "~/lib/site";
---

<nav class="home-corner-nav" aria-label="Home navigation">
  <a href="/" class="hc-wordmark" aria-label={`${WORDMARK} — home`}>{WORDMARK}</a>
  <span class="hc-sep" aria-hidden="true">·</span>
  <a href="/work/" class="hc-link">work</a>
  <a href="/about/" class="hc-link">about</a>
</nav>

<style>
  .home-corner-nav {
    position: fixed;
    top: 16px;
    right: 20px;
    z-index: 100;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 8px 14px;
    background-color: var(--paper);
    border: 0.5px solid var(--border-paper);
    border-radius: 6px;
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }
  .hc-wordmark {
    font-weight: 700;
    color: var(--teal);
    text-decoration: none;
    line-height: 1;
  }
  .hc-sep { color: var(--ink-secondary); }
  .hc-link {
    font-weight: 500;
    color: var(--ink-secondary);
    text-decoration: none;
    line-height: 1;
    border-bottom: 1px solid transparent;
    transition: color 160ms var(--ease-out), border-color 160ms var(--ease-out);
  }
  .hc-link:hover,
  .hc-link:focus-visible { color: var(--teal); border-bottom-color: var(--stamp-amber); }
  .hc-wordmark:focus-visible,
  .hc-link:focus-visible { outline: 2px solid var(--teal); outline-offset: 3px; }

  @media (max-width: 640px) {
    .home-corner-nav { top: 12px; right: 12px; gap: 10px; padding: 6px 10px; font-size: 11px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .hc-link { transition: none; }
  }
</style>
```

- [x] **Step 2: Mount it on the home page** — edit `src/pages/index.astro`

Find:
```astro
import AboutTeaser from "~/components/home/AboutTeaser.astro";
---

<BaseLayout title="Sean Winslow — AI Product Manager" noChrome={true}>
  <LoadingOverlay />
  <Hero />
```
Replace with:
```astro
import AboutTeaser from "~/components/home/AboutTeaser.astro";
import HomeCornerNav from "~/components/chrome/HomeCornerNav.astro";
---

<BaseLayout title="Sean Winslow — AI Product Manager" noChrome={true}>
  <LoadingOverlay />
  <HomeCornerNav />
  <Hero />
```

- [x] **Step 3: Build + visual check (desktop + mobile widths)**

Run: `npm run build` (expect success), then `npm run dev` → http://localhost:4321
Expected: a small paper pill top-right reading `SW · work · about`, legible over the hero, links work, visible after the loading overlay clears. Check it doesn't cover the hero's key content at 1280px and at 390px.

- [x] **Step 4: Commit**

```bash
git add src/components/chrome/HomeCornerNav.astro src/pages/index.astro
git commit -m "feat(home): minimal corner nav (critique W2, D2)"
```

---

### Task 2: Enlarge the projects dateline

**Files:**
- Modify: `src/components/projects/DatelineLabel.astro`

- [x] **Step 1: Bump the label font size**

Find:
```css
  .label {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.6px;
    line-height: 1.4;
    color: var(--paper);
    text-transform: uppercase;
    margin: 0;
  }
  @media (max-width: 768px) {
    .label {
      font-size: 11px;
    }
  }
```
Replace with:
```css
  .label {
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 1.4px;
    line-height: 1.4;
    color: var(--paper);
    text-transform: uppercase;
    margin: 0;
  }
  @media (max-width: 768px) {
    .label {
      font-size: 13px;
      letter-spacing: 1.0px;
    }
  }
```

- [x] **Step 2: Visual check**

Run: `npm run dev` → http://localhost:4321 → scroll to Projects.
Expected: `WORK · 5 PIECES · UPDATED 2026-…` is clearly readable, not lost. Confirm it still fits on one line at desktop width; if it wraps awkwardly on mobile, it's acceptable to keep two lines but verify it reads cleanly.

- [x] **Step 3: Commit**

```bash
git add src/components/projects/DatelineLabel.astro
git commit -m "feat(projects): enlarge dateline label so it isn't missed (critique W2)"
```

---

### Task 3: Remove the "updated weekly" annotation

**Files:**
- Modify: `src/components/projects/ProjectsSection.astro`

- [x] **Step 1: Remove the annotation usage**

Find:
```astro
    <div class="dateline-block">
      <DatelineLabel />
      <PencilAnnotation variant="updated-weekly" />
    </div>
```
Replace with:
```astro
    <div class="dateline-block">
      <DatelineLabel />
    </div>
```

- [x] **Step 2: Remove its now-dead positioning CSS** (in the same file)

Find and delete this block:
```css
  /* Pencil annotation positioning */
  :global(.dateline-block .annotation--updated-weekly) {
    top: 8px;
    left: 200px;
    width: 220px;
    height: 60px;
  }
```
Leave the `.annotation--rev-3` and `.annotation--registration-mark` positioning blocks intact — those variants are still used.

- [x] **Step 3: Verify the import is still needed**

`PencilAnnotation` is still used for `rev-3` and `registration-mark`, so keep its import. Confirm:
Run: `grep -n "PencilAnnotation" src/components/projects/ProjectsSection.astro`
Expected: the import line + the `rev-3` and `registration-mark` usages remain; no `updated-weekly` usage.

- [x] **Step 4: Build + visual check**

Run: `npm run build` (success), `npm run dev` → Projects section shows no "updated weekly" curved-arrow scribble near the dateline.

- [x] **Step 5: Commit**

```bash
git add src/components/projects/ProjectsSection.astro
git commit -m "feat(projects): remove 'updated weekly' annotation (critique W2)"
```

---

### Task 4: Make the swipe affordance obvious + touch-visible

Two edits: restyle/reposition `SwipeMeIndicator` to sit to the right of the deck with a left-pointing cue and show on touch; add a "card stack" peek cue to the deck so it reads as swipeable.

**Files:**
- Modify (full rewrite): `src/components/teaser/SwipeMeIndicator.astro`
- Modify: `src/components/teaser/TeaserSwiper.astro` (style block only)

- [x] **Step 1: Rewrite `SwipeMeIndicator.astro`** — right of the deck, left-pointing, visible on touch

```astro
---
/* Swipe affordance — critique W2. Sits to the right of the deck, points back
 * at it, and now shows on touch devices too (the friend on a touch screen
 * read the stacked deck as a glitch because the old indicator was
 * desktop-only and below the deck). */
---

<div class="swipe-me" aria-hidden="true">
  <span class="chevron">&larr;</span>
  <span class="caption">SWIPE ME</span>
</div>

<style>
  /* The deck (320px) is centered inside a wider wrap, so anchor off the
     wrap center + half the deck width + a gap, not the wrap's right edge. */
  .swipe-me {
    position: absolute;
    top: 50%;
    left: calc(50% + 172px);
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.0px;
    color: var(--teal);
    white-space: nowrap;
    opacity: 0;
    animation:
      swipe-me-fade-in 400ms linear 1000ms forwards,
      swipe-me-bob 2s ease-in-out 1400ms infinite;
  }
  .chevron { font-size: 16px; line-height: 1; }

  @keyframes swipe-me-fade-in { to { opacity: 1; } }
  @keyframes swipe-me-bob {
    0%, 100% { transform: translateY(-50%) translateX(0); }
    50%      { transform: translateY(-50%) translateX(-6px); }
  }

  /* On narrow / touch layouts there's no room to the right of the deck —
     drop it below the deck, centered, still visible (the ≤1023px deck is
     290px and the wrap stops being offset, so static flow is correct). */
  @media (max-width: 1023px) {
    .swipe-me {
      position: static;
      top: auto;
      left: auto;
      transform: none;
      justify-content: center;
      margin-top: 12px;
      animation: swipe-me-fade-in 400ms linear 1000ms forwards;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swipe-me { animation: none; opacity: 1; }
  }
</style>
```

- [x] **Step 2: Add the card-stack peek cue** — edit the `<style>` in `TeaserSwiper.astro`

Find:
```css
  .teaser-swiper-wrap {
    /* Aligns under the editorial column with the spec §3 ~40px upward visual rhyme */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: -40px;
  }
```
Replace with:
```css
  .teaser-swiper-wrap {
    /* Aligns under the editorial column with the spec §3 ~40px upward visual rhyme */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: -40px;
  }
  /* Card-stack peek cue (critique W2): two faint offset paper rectangles behind
     the deck so it visibly reads as a flippable stack, not a render glitch.
     Purely decorative, JS-independent — the swiper transforms live on the
     cards inside .teaser-swiper, above these. */
  .teaser-swiper-wrap::before,
  .teaser-swiper-wrap::after {
    content: "";
    position: absolute;
    top: 6px;
    left: calc(50% - 160px);
    width: 320px;
    height: 427px;
    border: 0.5px solid var(--border-paper);
    border-radius: 8px;
    background-color: var(--paper);
    z-index: 0;
    pointer-events: none;
  }
  .teaser-swiper-wrap::before { transform: rotate(-3deg) translateX(-6px); }
  .teaser-swiper-wrap::after  { transform: rotate(2.5deg) translateX(6px); }
  .teaser-swiper { z-index: 1; }
  @media (max-width: 1023px) {
    .teaser-swiper-wrap::before,
    .teaser-swiper-wrap::after { width: 290px; height: 387px; left: calc(50% - 145px); }
  }
  @media (max-width: 767px) {
    .teaser-swiper-wrap::before,
    .teaser-swiper-wrap::after { width: 260px; height: 347px; left: calc(50% - 130px); }
  }
```

- [x] **Step 3: Build + visual check (desktop AND touch/narrow)**

Run: `npm run build` (success), `npm run dev` → http://localhost:4321 → About teaser section.
Expected (desktop): the deck reads as a stack of paper cards (faint edges peeking behind), and `← SWIPE ME` sits to the right, bobbing toward the deck. Expected (DevTools device mode / touch width): the indicator appears centered below the deck and the peek cue still shows. Confirm the `::before/::after` rectangles sit BEHIND the active card (not covering it) — if they bleed in front, re-check the `z-index` on `.teaser-swiper`.

- [x] **Step 4: Tune offsets if needed**

The rotation/offset values (`-3deg`/`2.5deg`, ±6px) are a starting point. If the peek looks too strong or too subtle against the real cards, adjust the degrees/translate and re-verify. Keep it subtle — a hint, not a fan.

- [x] **Step 5: Commit**

```bash
git add src/components/teaser/SwipeMeIndicator.astro src/components/teaser/TeaserSwiper.astro
git commit -m "feat(teaser): obvious + touch-visible swipe affordance, card-stack peek (critique W2)"
```

---

### Task 5: Update docs — the "no top nav on home" decision + specs + CHANGELOG

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/specs/site-chrome-spec-v1.md` and/or `docs/specs/home-about-teaser-spec-v1.md`
- Modify: `CHANGELOG.md`

- [x] **Step 1: Update the locked decision in `CLAUDE.md`**

Find:
```
- **Home page shape:** Hero → Projects → About teaser (9-card character deck) → universal Footer. No top nav on home (`noChrome={true}` per site-chrome spec).
```
Replace with:
```
- **Home page shape:** Hero → Projects → About teaser (9-card character deck) → universal Footer. The full sticky SiteNav stays off on home (`noChrome={true}`), but a minimal corner nav (`HomeCornerNav.astro`, wordmark + work/about) sits top-right so recruiters know there's more (critique W2, 2026-06-16).
```

- [x] **Step 2: Update the relevant spec(s)**

In `site-chrome-spec-v1.md` (and `home-about-teaser-spec-v1.md` for the swipe affordance), note: the home now carries a minimal corner nav; the projects dateline was enlarged; the "updated weekly" annotation was removed; the teaser swipe affordance was repositioned, made touch-visible, and given a card-stack peek cue.

- [x] **Step 3: Add a CHANGELOG entry**

Per the `CHANGELOG.md` "How to add an entry" header, add a 2026-06-16 entry covering all four W2 changes.

- [x] **Step 4: Commit**

```bash
git add CLAUDE.md docs/specs/site-chrome-spec-v1.md docs/specs/home-about-teaser-spec-v1.md CHANGELOG.md
git commit -m "docs: record home affordances + corner nav (critique W2)"
```

---

## Self-Review (run before declaring W2 done)

- [x] A minimal corner nav appears top-right on the home page, legible over the hero, links to /work/ and /about/, keyboard-focusable.
- [x] The projects dateline is visibly larger and readable.
- [x] No "updated weekly" annotation in the projects section; `rev-3` + registration mark untouched.
- [x] The teaser deck reads as a swipeable stack (peek cue) with an obvious `← SWIPE ME` cue, visible on touch as well as desktop, reduced-motion safe.
- [x] `npm run build` green; visual check passed at desktop + narrow widths.
- [x] CLAUDE.md "no top nav on home" decision updated; spec(s) + CHANGELOG updated.
