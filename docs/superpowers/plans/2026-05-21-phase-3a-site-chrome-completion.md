# Phase 3a Implementation Plan — Site Chrome Completion

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (direct controller execution) to implement this plan task-by-task. **Do NOT dispatch via superpowers:subagent-driven-development** — Phase 2 and Phase 2b both attempted subagent dispatch and both hit hallucinations / context-overflow in the implementer subagent. Direct controller execution worked. Re-attempt subagents only if the harness has improved between Phase 2b and Phase 3a. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the sticky top nav on every sub-page, the `/contact/` and `/404` minimal routes, and three v1.1 polish carry-overs from Phase 2 / 2b — so every subsequent Phase 3 surface (case-study body, transactions, architecture, essays, about) inherits a working chrome and the v1.1 debt doesn't compound.

**Architecture:** A single `<SiteNav.astro>` component lives outside `<main>` in BaseLayout, governed by the existing `noChrome` prop (already wired in Phase 2). The home page passes `noChrome={true}` so the hero owns y=0 (hero-spec §13 contract preserved); every other page renders the nav. The nav is `position: sticky` per site-chrome §6.1 — no scroll-aware hide/reveal, no hamburger, no React island. `/contact/` and `/404` are sober wire-service stubs per site-chrome §9 + §10 — no form, no comedy. The three v1.1 carry-overs land in Section 0 (pre-flight) so the rest of the plan ships against a clean tree.

**Tech Stack:** Astro 5 + Tailwind 4 (already installed from Phase 2), CSS custom-properties for nav typography, `Astro.url.pathname` for active-route highlighting. **No new dependencies.**

**Scope:** Matches [`site-chrome-spec-v1.md`](../../specs/site-chrome-spec-v1.md) §6 (nav), §9 (`/contact/`), §10 (`/404`), §18 DoD items 1–7, 14–15, and the three carry-over polish items from the Phase 3 kickoff prompt:
- **IN:** `<SiteNav.astro>` component (wordmark + 5 tabs + active-route highlighting + sticky positioning + mobile wrap), BaseLayout integration honoring `noChrome`, `src/pages/contact.astro`, `src/pages/404.astro`, hero floor-shadow alignment fix, midway tossed-card rotation flip on swipe fly-out, dev-doc note on subagent harness reliability, DoD walk-through against site-chrome §18 items 1–7 + 14 + 15.
- **OUT (Phase 3b):** case-study body for `/work/[slug]` (replaces the Phase 2 stub).
- **OUT (Phase 3c):** `/transactions/` + `/architecture/` + `/essays/` index, surface, and slug routes + 3 RSS feeds.
- **OUT (Phase 3d):** `/about/` page body.
- **OUT (Phase 4):** Daily Driver agent writers, Plausible analytics, Vercel deploy, custom-domain DNS, sitemap integration (`@astrojs/sitemap` is already installed; the `/sitemap-index.xml` exists at build today per Phase 2 work — no Phase 3a action).
- **OUT entirely (deferred indefinitely):** Hand-authored Procreate substrate (paper-tile / tear-edge / floor-shadow); Pillow substitutes ship as v1.

**Branch state:** `phase-2-foundations` at HEAD `e80d75d`. 17 commits ahead of `origin/phase-2-foundations`. **Do NOT switch branches.** Sean's standing rule is "Sean works on `main`" but Phase 2 + 2b accumulated on this branch — if Sean wants to consolidate to `main` before executing this plan, surface it as a separate operation and get confirmation. Each task in this plan commits atomically; ~25 incremental commits total.

**Operating posture (direct controller execution):** Run each task in order. After each commit, verify the next task's preconditions are still true (e.g., dev server still serving 200 on the relevant route). Surface BLOCKED status only if genuinely stuck (a real error in the build log, a route returning a non-2xx that should). Don't pause to check in between routine tasks — the user signed off on continuous execution.

---

## File Structure

Files this plan creates or modifies, organized by responsibility:

```
sw-ai-pm-portfolio/
├── src/
│   ├── components/
│   │   ├── chrome/
│   │   │   └── SiteNav.astro                       ← Task 1.1: sticky top nav (NEW)
│   │   ├── hero/
│   │   │   └── CharacterLane.astro                 ← Task 0.1: floor-shadow alignment fix
│   │   └── teaser/
│   │       └── TeaserCard.astro                    ← Task 0.2: midway rotation flip on fly-out
│   ├── layouts/
│   │   └── BaseLayout.astro                        ← Task 2.1: render <SiteNav> when !noChrome
│   └── pages/
│       ├── contact.astro                           ← Task 4.1: minimal route preserving V3 SEO (NEW)
│       └── 404.astro                               ← Task 3.1: sober wire-service (NEW)
│
├── docs/
│   └── superpowers/
│       └── plans/
│           ├── 2026-05-21-phase-3a-site-chrome-completion.md   ← this file
│           └── 2026-05-21-phase-3-backlog.md                   ← Phase 3b/3c/3d backlog (separate doc, not modified here)
│
└── CHANGELOG.md                                    ← (no edits this phase; spec is locked, no spec changes land)
```

The `<SiteNav.astro>` component lands in the existing `src/components/chrome/` folder alongside `SiteFooter.astro` + `SkipLink.astro` + `ThemeToggle.astro` (already shipped Phase 2). No new top-level folders.

---

## Section 0 — Pre-flight (v1.1 polish carry-overs)

These three items were explicitly deferred from Phase 2 / 2b. Folding them in here so Phase 3a ships them and the rest of Phase 3 doesn't inherit the debt.

### Task 0.1: Hero floor-shadow alignment

**Files:**
- Modify: `src/components/hero/CharacterLane.astro:54-77`

Per Phase 2 commit `397515f`'s diagnostic: the shadow PNG's alpha centroid is at 49% of its own width. The CSS positions the shadow at `left: 18%; width: 55%`, which lands the dark center at ~46% of the lane → ~80% of viewport on a 1920 viewport. The desk's painted center sits at ~78% of viewport. ~2% off.

The fix is per-viewport-width calibration. Re-cropping the PNG is the cleaner long-term fix but blocks on Procreate work that's deferred indefinitely (the hand-authored substrate); per-viewport CSS adjustment is the right v1 trade.

- [ ] **Step 1: Read CharacterLane.astro current state**

Run: `grep -n "hero-floor-shadow" src/components/hero/CharacterLane.astro`

Expected: at minimum lines around 53–77 (the `.hero-floor-shadow` CSS block) and 79–82 (the `@media (max-width: 1024px)` override).

- [ ] **Step 2: Apply the alignment fix**

Replace the existing `.hero-floor-shadow` CSS block in `src/components/hero/CharacterLane.astro` (lines ~53–77, ending just before the `@media (max-width: 1024px)` block):

```css
  .hero-floor-shadow {
    /* Reference: sw-portfolio-animation-2026/.../hero-image-with-bg000.png —
       a tight ellipse only under the desk + chair, not a wide swath.
       Shadow PNG centroid is at 49% of its own width. Per Sean's 2026-05-21
       review, the desk's painted center sits at ~78% of viewport on a 1920
       viewport — the original `left: 18%; width: 55%` rule landed at ~80%.
       Below 1280px viewports the lane scales down and the offset diverges
       further. The breakpoint table below nudges the centroid back toward
       the desk-foot on each viewport class.

       Re-cropping the source PNG would be cleaner long-term but blocks on
       Procreate-substrate work that's deferred indefinitely per the
       texture-spec deferral table. Per-viewport calibration is the v1 fix. */
    position: absolute;
    width: 55%;
    height: auto;
    bottom: -6px;
    left: 16%;        /* was 18% — shifts the shadow ~2% leftward at >=1280px */
    right: auto;
    object-fit: contain;
    object-position: center bottom;
    z-index: 18;
    pointer-events: none;
    opacity: 0.9;
  }
  /* Mid-viewport (≥1280 ≤1599): same nudge holds. */
  /* Wide viewport (≥1600): the lane sits further right; shadow needs ~1% more leftward shift. */
  @media (min-width: 1600px) {
    .hero-floor-shadow {
      left: 15%;
    }
  }
```

Keep the existing `@media (max-width: 1024px)` block immediately after (the mobile rule is independently calibrated and doesn't need to change).

- [ ] **Step 3: Visual verify**

Make sure `npm run dev` is running. Refresh `http://localhost:4321/`. Inspect the hero: the dark ellipse of the floor shadow should now sit under the desk-foot rather than slightly to the right of it. Compare against the screenshot at `phase-2b-full.png` (untracked in the working tree) if useful for before/after.

Resize the viewport between 1280px and 1920px to confirm the shadow stays under the desk across the breakpoint range.

If the shadow still reads off, the alternative fix is to re-crop the PNG. Surface as BLOCKED and stop — that's a substrate task, not a CSS task.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/CharacterLane.astro
git commit -m "$(cat <<'EOF'
fix(phase-3a/preflight): hero floor-shadow alignment via per-viewport CSS calibration

Shifts the shadow ~2% leftward at all viewports (≥1024px) and an
additional ~1% at ≥1600px so its dark center sits under the desk-foot
rather than slightly to the right of it. Resolves the v1.1 TODO at
src/components/hero/CharacterLane.astro:61 per Sean's 2026-05-21 review.

Re-cropping the source PNG would be the cleaner long-term fix but blocks
on Procreate substrate work that is deferred indefinitely.
EOF
)"
```

### Task 0.2: Midway tossed-card rotation flip on swipe fly-out

**Files:**
- Modify: `src/components/teaser/TeaserCard.astro:71-78`

Per home-about-teaser-spec §6.2: the front card's fly-out animation should reverse rotation direction at the midway point for a "tossed-card tumble" feel. Phase 2b shipped a linear fly-out (constant rotation direction across 300ms) — see the Phase 2b plan's §8 deferral table. The fix is a `@keyframes` step in `TeaserCard.astro`'s `.is-flying-out` rule — no JS changes needed.

- [ ] **Step 1: Apply the keyframe fix**

In `src/components/teaser/TeaserCard.astro`, replace the existing `.teaser-card[data-card-index="0"].is-flying-out` rule (lines ~71–78) with:

```css
  .teaser-card[data-card-index="0"].is-flying-out {
    /* Tossed-card tumble (spec §6.2): the card rotates one direction across
       the first half of the 300ms, then flips opposite direction across
       the second half. Linear interpolation between the four keyframes
       lands the card at its final --swipe-fly-rotate at t=300ms while the
       midpoint visibly reverses, reading as a tumble rather than a glide. */
    animation: teaser-card-toss 300ms var(--ease-snap, cubic-bezier(0.23, 1, 0.32, 1)) forwards;
    opacity: 1;
  }
  @keyframes teaser-card-toss {
    0% {
      transform: perspective(700px) translateX(0) rotate(0deg);
      opacity: 1;
    }
    50% {
      /* Midway: rotation flips to the opposite of the final --swipe-fly-rotate.
         The CSS calc multiplies the final-rotate custom property by -0.6 to
         get a visible counter-rotation without overshooting. */
      transform:
        perspective(700px)
        translateX(calc(var(--swipe-fly-x) * 0.5))
        rotate(calc(var(--swipe-fly-rotate) * -0.6));
      opacity: 0.7;
    }
    100% {
      transform:
        perspective(700px)
        translateX(var(--swipe-fly-x))
        rotate(var(--swipe-fly-rotate));
      opacity: 0;
    }
  }
```

Keep all surrounding rules (`.teaser-card`, `.teaser-card[data-card-index="0"]`, `.teaser-card[data-card-index="0"].is-dragging`, `.teaser-card img`, `:focus-visible`) unchanged.

- [ ] **Step 2: Visual verify**

Refresh `http://localhost:4321/`. Scroll to the About Teaser. Grab the front card and drag right past 50px. The card should fly out to the right, but mid-flight it should visibly counter-rotate before continuing to its final rotation — a tumble, not a glide. Repeat for a left-drag. If the tumble looks too aggressive (overshoots visibly), reduce the `-0.6` multiplier in the 50% keyframe to `-0.4`. If too subtle, raise to `-0.8`.

Verify the swipe-controller's commit-and-rotate still works after the keyframe completes: after the fly-out, the next card should slide into the front position cleanly (no stalling, no flash).

- [ ] **Step 3: Commit**

```bash
git add src/components/teaser/TeaserCard.astro
git commit -m "$(cat <<'EOF'
feat(phase-3a/preflight): midway tossed-card rotation flip on swipe fly-out

Replaces the linear fly-out with a 4-keyframe @keyframes animation that
counter-rotates at the midway point (50% mark), reading as a
tossed-card tumble per home-about-teaser-spec §6.2. The Phase 2b
implementation shipped the simpler linear version; this lands the
spec'd tumble effect.

No JS changes — swipe-controller still writes --swipe-fly-x and
--swipe-fly-rotate; the keyframes consume them at t=100% and synthesize
the midway counter-rotation via calc().
EOF
)"
```

### Task 0.3: Document the subagent harness reliability note

**Files:**
- Read-only verification (no file edits)

Phase 2 and Phase 2b both fell back to direct controller execution after the implementer subagent hallucinated context constraints. The Phase 3a plan (this file) already notes this in the top-of-doc directive. No additional file change.

- [ ] **Step 1: Verify the directive is in place**

Run: `grep "Do NOT dispatch" docs/superpowers/plans/2026-05-21-phase-3a-site-chrome-completion.md`

Expected: a match in the top-of-doc agentic-worker directive block. (This file's own header.)

- [ ] **Step 2: No commit**

Carry-forward only. The directive is in this plan and in the Phase 3 backlog doc; future planning sessions read both.

---

## Section 1 — SiteNav component

### Task 1.1: Build SiteNav.astro

**Files:**
- Create: `src/components/chrome/SiteNav.astro`

Per site-chrome §6: sticky top nav with wordmark + 5 sibling tabs, paper bg, 0.5px teal bottom border, active-route highlighting via `aria-current="page"`, mobile wrap below ~640px. **No hamburger, no scroll-aware hide, no React island.**

- [ ] **Step 1: Write the component**

Create `src/components/chrome/SiteNav.astro`:

```astro
---
/**
 * src/components/chrome/SiteNav.astro — sticky top nav for every sub-page.
 *
 * Renders the SW wordmark (links to /) + 5 sibling tabs. Active-route
 * highlighting derived from Astro.url.pathname via startsWith() so
 * /work/animation-pipeline correctly highlights WORK.
 *
 * Lives OUTSIDE <main> per site-chrome §6.4 — persists across View
 * Transitions; only the page content swaps.
 *
 * Source: site-chrome-spec-v1.md §6 + §4 (typography).
 */
import { WORDMARK } from "~/lib/site";

const pathname = Astro.url.pathname;

const TABS: Array<{ label: string; href: string; matchPrefix: string }> = [
  { label: "WORK",           href: "/work/",          matchPrefix: "/work/" },
  { label: "TRANSACTIONS",   href: "/transactions/",  matchPrefix: "/transactions/" },
  { label: "ARCHITECTURE",   href: "/architecture/",  matchPrefix: "/architecture/" },
  { label: "ESSAYS",         href: "/essays/",        matchPrefix: "/essays/" },
  { label: "ABOUT",          href: "/about/",         matchPrefix: "/about/" },
];

function isActive(matchPrefix: string): boolean {
  return pathname.startsWith(matchPrefix);
}
---

<header class="site-nav-header">
  <nav class="site-nav" aria-label="Primary navigation">
    <a href="/" class="wordmark" aria-label="Sean Winslow — home">{WORDMARK}</a>
    <ul class="nav-tabs">
      {TABS.map((tab) => (
        <li>
          <a
            href={tab.href}
            class={isActive(tab.matchPrefix) ? "tab active" : "tab"}
            aria-current={isActive(tab.matchPrefix) ? "page" : undefined}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
</header>

<style>
  .site-nav-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--paper);
    border-bottom: 0.5px solid var(--border-paper);
    /* Per site-chrome §5: flat — no drop shadow, no backdrop blur. */
  }

  .site-nav {
    max-width: 1120px;
    margin: 0 auto;
    height: 56px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
  }

  .wordmark {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--teal);
    text-decoration: none;
    line-height: 1;
  }
  .wordmark:focus-visible {
    outline: 2px solid var(--teal);
    outline-offset: 4px;
  }

  .nav-tabs {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 24px;
    row-gap: 4px;
  }

  .tab {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--ink-secondary);
    text-decoration: none;
    line-height: 1;
    padding: 4px 0;
    /* 1px stamp-amber bottom border for the active tab. Default state
       has a transparent border to prevent layout shift on activation. */
    border-bottom: 1px solid transparent;
    transition: color 160ms var(--ease-out), border-color 160ms var(--ease-out);
  }
  .tab:hover {
    color: var(--teal);
  }
  .tab.active {
    color: var(--teal);
    border-bottom-color: var(--stamp-amber);
  }
  .tab:focus-visible {
    outline: 2px solid var(--teal);
    outline-offset: 4px;
  }

  /* Mobile: 5 tabs may wrap to 2 lines under ~640px. Smaller horizontal
     padding + slightly tighter gap. No hamburger per site-chrome §6.3. */
  @media (max-width: 767px) {
    .site-nav {
      height: auto;
      min-height: 48px;
      padding: 8px 16px;
      gap: 12px;
    }
    .nav-tabs {
      gap: 12px 16px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/chrome/SiteNav.astro
git commit -m "$(cat <<'EOF'
feat(phase-3a): SiteNav component — sticky wordmark + 5 tabs + active-route highlighting

Sticky position with z-index 100, paper background, 0.5px teal bottom
border. Wordmark (SW, JetBrains Mono 700, 1.4px tracking) links to /.
Five sibling tabs (WORK · TRANSACTIONS · ARCHITECTURE · ESSAYS · ABOUT)
with active state via Astro.url.pathname.startsWith() and a 1px
stamp-amber bottom border on the active tab; aria-current="page" on
match.

Mobile wraps to 2 lines below 768px with tightened gap. No hamburger.
No scroll-aware hide. No JS — pure server-rendered Astro per
site-chrome-spec §6.
EOF
)"
```

---

## Section 2 — BaseLayout integration

### Task 2.1: Render SiteNav when !noChrome

**Files:**
- Modify: `src/layouts/BaseLayout.astro`

The `noChrome` prop is already wired (Phase 2). What's missing is the actual `<SiteNav>` render. Replace the existing comment-only stub at the top of `<body>` with a conditional render.

- [ ] **Step 1: Import + conditional render**

Edit `src/layouts/BaseLayout.astro`:

Replace the existing import block (lines ~10-16) with:

```astro
import { ClientRouter } from "astro:transitions";
import { GoogleFontsOptimizer } from "astro-google-fonts-optimizer";
import { SITE_DESCRIPTION, OG_DEFAULT_IMAGE } from "~/lib/site";
import SkipLink from "~/components/chrome/SkipLink.astro";
import SiteNav from "~/components/chrome/SiteNav.astro";
import SiteFooter from "~/components/chrome/SiteFooter.astro";
import Cursor from "~/components/Cursor.tsx";
import "~/styles/global.css";
```

(Only the `import SiteNav from "..."` line is new; the rest is existing order preserved.)

Then replace the body's stub-comment block (currently lines ~91-96):

```astro
    <SkipLink />
    <Cursor client:load />
    {/* Sub-page top nav lands in Phase 3 — when noChrome=false. For Phase 2 the home is the only route, so this stays as a stub. */}
    <main id="main-content">
      <slot />
    </main>
```

with:

```astro
    <SkipLink />
    <Cursor client:load />
    {!noChrome && <SiteNav />}
    <main id="main-content">
      <slot />
    </main>
```

- [ ] **Step 2: Verify the home page is unchanged**

Refresh `http://localhost:4321/`. The home page passes `noChrome={true}` (per `src/pages/index.astro`); the hero should still own y=0 with no nav above it. Visual: the dateline strip "BOSTON, MAY 21, 2026 —" is the first content under the viewport top, exactly as it was before this task.

If a nav appears on the home page, the `noChrome` prop isn't being honored — re-check that the conditional render is `{!noChrome && <SiteNav />}` (not `{noChrome && <SiteNav />}`).

- [ ] **Step 3: Verify a sub-page renders the nav**

Navigate to `http://localhost:4321/work/animation-pipeline/`. The case-study stub from Phase 2 should now render WITH the sticky top nav at the top:
- SW wordmark on the left
- WORK · TRANSACTIONS · ARCHITECTURE · ESSAYS · ABOUT on the right
- WORK tab carries the stamp-amber bottom border (active state) and `aria-current="page"` (inspect via DevTools)
- Scroll the page; the nav should stick to the top of the viewport

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "$(cat <<'EOF'
feat(phase-3a): render SiteNav in BaseLayout when !noChrome

Home page (noChrome={true}) renders without the nav per hero-spec §13
+ site-chrome §6.1; every other route renders the sticky nav above
<main>. Skip link remains the first focusable element; nav lives
outside <main> per site-chrome §6.4 so it persists across View
Transitions.
EOF
)"
```

### Task 2.2: Verify nav active state across all 5 prefixes

**Files:**
- (verification only — no edits)

The 5 tabs each need to highlight when on their respective route. Phase 3a only has `/work/[slug]/` populated as sub-pages; the others 404 until Phase 3b/3c/3d. Verify by navigating to each route and checking that the correct tab activates.

- [ ] **Step 1: Navigate the 5 prefixes**

| Route | Expected active tab | Expected status |
|---|---|---|
| `http://localhost:4321/work/animation-pipeline/` | WORK | 200 + nav renders + WORK underlined |
| `http://localhost:4321/transactions/` | TRANSACTIONS | 404 page (Phase 3a's `/404.astro` lands Task 3.1) |
| `http://localhost:4321/architecture/` | ARCHITECTURE | 404 page |
| `http://localhost:4321/essays/` | ESSAYS | 404 page |
| `http://localhost:4321/about/` | ABOUT | 404 page |

For the 404 cases, the active-tab check happens AFTER Task 3.1 ships the 404 page. For now, only check `/work/animation-pipeline/`.

- [ ] **Step 2: Verify the active tab on `/work/<slug>/`**

Open DevTools → Elements panel. Find the WORK tab `<a>`. Confirm:
- `class="tab active"`
- `aria-current="page"`
- Computed style shows a 1px stamp-amber `#7C2D12` bottom border

Confirm the other 4 tabs have:
- `class="tab"` (no `active`)
- No `aria-current` attribute
- Bottom border is `transparent` (or the color is inherited as transparent)

- [ ] **Step 3: No commit**

Verification only.

---

## Section 3 — 404 page

### Task 3.1: Sober wire-service /404.astro

**Files:**
- Create: `src/pages/404.astro`

Per site-chrome §10: ~400px page height, dateline strip → "PAGE NOT FOUND" h1 → "Nothing at this URL." → `→ HOME` mono link. **No comedy, no illustration, no apologetic tone.** Renders WITH the sticky nav (noChrome defaults to false).

- [ ] **Step 1: Write the page**

Create `src/pages/404.astro`:

```astro
---
/**
 * /404 — sober wire-service. site-chrome-spec §10.
 *
 * Astro renders this at /404.html. Vercel serves it on any unmatched
 * route. No additional config needed.
 *
 * Tone discipline: this is a fact, stated calmly. No "lost in the
 * wilderness" framing. No "let's get you back on track!" energy.
 */
import BaseLayout from "~/layouts/BaseLayout.astro";
---

<BaseLayout title="Not Found — Sean Winslow" description="Nothing at this URL.">
  <article class="not-found page-sheet">
    <div class="dateline-strip">BOSTON · 404</div>
    <hr />
    <h1>PAGE NOT FOUND</h1>
    <p>Nothing at this URL.</p>
    <p><a href="/" class="mono-link">&rarr; HOME</a></p>
  </article>
</BaseLayout>

<style>
  .not-found {
    max-width: 1120px;
    margin: 0 auto;
    padding: 80px 24px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .dateline-strip {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--ink-secondary);
  }

  hr {
    border: 0;
    border-top: 0.5px solid var(--border-paper);
    margin: 8px 0 24px;
  }

  h1 {
    font-family: var(--font-mono);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 500;
    letter-spacing: 2.0px;
    text-transform: uppercase;
    color: var(--teal);
    margin: 0;
    /* Mono register per site-chrome §4 — "PAGE NOT FOUND" reads as
       newsroom slug, not editorial headline. */
  }

  p {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.45;
    letter-spacing: -0.1px;
    color: var(--ink);
    margin: 0;
    max-width: 560px;
  }

  .mono-link {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.0px;
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms var(--ease-out);
    display: inline-block;
    padding-bottom: 2px;
  }
  .mono-link:hover,
  .mono-link:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }

  @media (max-width: 767px) {
    .not-found {
      padding: 48px 16px;
    }
  }
</style>
```

- [ ] **Step 2: Visual verify in dev**

Astro serves the 404 in dev when you navigate to an unmatched route. Navigate to `http://localhost:4321/this-route-does-not-exist/`. Expected:
- Sticky nav at the top (5 tabs — none active, since `/this-route-does-not-exist/` doesn't match any of the 5 prefixes)
- Below the nav: `BOSTON · 404` dateline strip
- Below the hr: `PAGE NOT FOUND` h1 (mono, teal, uppercase)
- Below the h1: `Nothing at this URL.` (Newsreader, 18px, weight 300)
- Below the body line: `→ HOME` mono link (clicks back to /)
- Universal footer below

If the 404 doesn't render at the dev URL, Astro in dev mode may fall through to its default 404. Test the production behavior in Step 3.

- [ ] **Step 3: Build + smoke test the static output**

Run: `npm run build 2>&1 | tail -10`

Expected: `404.astro` listed in the build manifest (look for `/404.html` in the output). If `dist/404.html` exists after the build, the route is wired correctly.

Run: `ls dist/404.html && head -20 dist/404.html | grep -oE "PAGE NOT FOUND|BOSTON · 404"`

Expected: both strings appear in the rendered HTML.

- [ ] **Step 4: Commit**

```bash
git add src/pages/404.astro
git commit -m "$(cat <<'EOF'
feat(phase-3a): /404 page — sober wire-service per site-chrome §10

BOSTON · 404 dateline → PAGE NOT FOUND mono h1 → "Nothing at this URL."
Newsreader body → → HOME mono link. ~400px page height. No comedy, no
illustration, no apologetic tone — the 404 is a fact, stated calmly.
The mono → HOME link is the only affordance besides the universal
footer below it.

Builds to dist/404.html; Vercel will serve on any unmatched route in
Phase 4.
EOF
)"
```

---

## Section 4 — Contact page

### Task 4.1: Minimal /contact route

**Files:**
- Create: `src/pages/contact.astro`

Per site-chrome §9: ~600px page height, BOSTON · CONTACT dateline → "Contact" Newsreader h1 → one sober paragraph + 3 mono links. **No form. No "Let's talk!" energy.** Page exists primarily to preserve V3 bookmarks; meaningful surface is the chrome footer's Contact column below.

- [ ] **Step 1: Write the page**

Create `src/pages/contact.astro`:

```astro
---
/**
 * /contact — minimal route preserving V3 SEO. site-chrome-spec §9.
 *
 * The page exists primarily to preserve V3-bridge bookmarks pointing at
 * /contact/; the meaningful surface is the chrome footer's Contact
 * column below.
 *
 * What's killed (vs. V3): the <form>, the "Let's talk!" energy, the
 * "What's on your mind?" placeholder, the "Send Message" button, the
 * SVG social-row icons.
 */
import BaseLayout from "~/layouts/BaseLayout.astro";
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from "~/lib/site";
---

<BaseLayout title="Contact — Sean Winslow" description="Email me at sean@seanwinslow.com.">
  <article class="contact-page page-sheet">
    <div class="dateline-strip">BOSTON · CONTACT</div>
    <hr />
    <h1>Contact</h1>
    <p class="body">
      Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
    </p>
    <ul class="contact-links">
      <li>
        <span class="prefix">&rarr;</span>
        email &middot; <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </li>
      <li>
        <span class="prefix">&rarr;</span>
        <a href={LINKEDIN_URL} rel="me">linkedin.com/in/seanwinslow</a>
        <span class="glyph">&#x2197;</span>
      </li>
      <li>
        <span class="prefix">&rarr;</span>
        <a href={GITHUB_URL} rel="me">github.com/seanwinslow</a>
        <span class="glyph">&#x2197;</span>
      </li>
    </ul>
  </article>
</BaseLayout>

<style>
  .contact-page {
    max-width: 1120px;
    margin: 0 auto;
    padding: 80px 24px;
    min-height: 600px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .dateline-strip {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--ink-secondary);
  }

  hr {
    border: 0;
    border-top: 0.5px solid var(--border-paper);
    margin: 8px 0 16px;
  }

  h1 {
    font-family: var(--font-serif);
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 400;
    letter-spacing: -0.4px;
    line-height: 1.1;
    color: var(--teal);
    margin: 0;
  }

  .body {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.45;
    letter-spacing: -0.1px;
    color: var(--ink);
    margin: 0;
    max-width: 680px;
  }
  .body a {
    color: var(--teal);
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-thickness: 1px;
  }

  .contact-links {
    list-style: none;
    padding: 0;
    margin: 16px 0 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .contact-links li {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--teal);
  }
  .contact-links .prefix {
    color: var(--ink-secondary);
    margin-right: 4px;
  }
  .contact-links .glyph {
    color: var(--ink-secondary);
    font-size: 12px;
    margin-left: 4px;
  }
  .contact-links a {
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms var(--ease-out);
  }
  .contact-links a:hover,
  .contact-links a:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }

  @media (max-width: 767px) {
    .contact-page {
      padding: 48px 16px;
    }
    .body {
      font-size: 18px;
    }
    .contact-links li {
      font-size: 13px;
    }
  }
</style>
```

- [ ] **Step 2: Visual verify**

Navigate to `http://localhost:4321/contact/`. Expected:
- Sticky nav at top, no tab active (the 5 tabs are WORK / TRANSACTIONS / ARCHITECTURE / ESSAYS / ABOUT — `/contact/` isn't among them, so no `aria-current`)
- `BOSTON · CONTACT` dateline below nav
- `Contact` Newsreader h1, teal
- One paragraph: `Email me at sean@seanwinslow.com.` (the email is a mailto link)
- 3 mono links below — email, linkedin, github
- LinkedIn + github show the `↗` glyph; email does not
- Universal footer below

No form, no "Send Message" button, no "Let's talk!" copy.

- [ ] **Step 3: Verify the email constant resolves**

Run: `curl -s http://localhost:4321/contact/ | grep -oE "sean@seanwinslow\.com" | head -2`

Expected: 2 matches (once in the body sentence, once in the contact-links list).

- [ ] **Step 4: Commit**

```bash
git add src/pages/contact.astro
git commit -m "$(cat <<'EOF'
feat(phase-3a): /contact minimal route per site-chrome §9

BOSTON · CONTACT dateline → "Contact" Newsreader h1 → one sober
paragraph + 3 mono links (email · linkedin · github). ~600px page
height. No form, no "Let's talk!" energy, no "Send Message" button.
Email pulled from src/lib/site.ts EMAIL constant; LinkedIn + GitHub
from LINKEDIN_URL / GITHUB_URL.

The route exists primarily to preserve V3-bridge bookmarks pointing at
/contact/; the meaningful contact affordance is the chrome footer's
Contact column below.
EOF
)"
```

---

## Section 5 — First-sub-page transition continuity

### Task 5.1: Verify nav reveal continuity (site-chrome §6.1.1)

**Files:**
- (verification only — no edits)

Per site-chrome §6.1.1, the first sub-page visit risks reading as "wait, where did the no-nav site go?" The spec mandates three mitigations:
1. The sticky nav uses the same chrome substrate as the home footer (paper + teal + JetBrains Mono — already true via tokens).
2. The first sub-page nav reveal should be delayed ~600ms after View Transition completes, then fade in from translateY(-8px).
3. Mockup verification before build complete: home → first-sub-page transition rendered + visually inspected for continuity.

**Sean's call:** Items 1 and 3 are non-negotiable; item 2 (the 600ms delayed reveal) is decorative and adds JS to a chrome that explicitly avoids JS per site-chrome §15 anti-stack ("no `<NavIsland />` React island"). The view-transitions-CSS-only approach: rely on Astro's default ClientRouter behavior; the nav will swap in cleanly as part of the page render. **Skip the 600ms delayed fade-in for v1** — log as a v1.1 polish candidate. The substrate continuity (item 1) and the visual inspection (item 3) deliver the load-bearing 80% of the §6.1.1 intent.

- [ ] **Step 1: Visual transition check from home → /work/animation-pipeline/**

Open `http://localhost:4321/` in the browser. Confirm the home page shows no nav at top. Click the `2D Animation Pipeline` tile (or whichever the first tile is — A-1). The browser should transition to `/work/animation-pipeline/`.

Expected:
- The page content swaps via View Transition (the hero media morphs to the case-study page's hero media block per the `view-transition-name: hero-media-<slug>` contract from Phase 2).
- The nav appears at the top of the new page.
- The nav reads as the same "substrate" as the home page's footer (paper + teal + mono) — not as "a different site loaded."

If the nav appears to pop in jarringly (e.g., a visible flicker), note it for v1.1. If it appears as part of the normal Astro page render, the §6.1.1 intent is satisfied without additional JS.

- [ ] **Step 2: Navigate back to /**

Use the browser back button or click the SW wordmark. Expected:
- Page transitions back to home.
- Nav disappears (because home is `noChrome={true}`).
- Hero re-renders at y=0.

- [ ] **Step 3: No commit**

Verification only. If a v1.1 follow-up is warranted (e.g., a perceptible nav-pop), surface as a comment on the Phase 3a backlog doc rather than editing this plan.

---

## Section 6 — DoD verification + Lighthouse spot-check

### Task 6.1: Walk site-chrome §18 items 1–7 + 14 + 15

For each DoD item below, verify on `localhost:4321` and mark `[PASS]` / `[FAIL]`. If FAIL, return to the relevant earlier task to fix.

- [ ] **Step 1: §18 item 1 — BaseLayout props**

`src/layouts/BaseLayout.astro` accepts `title` + `description?` + `ogImage?` + `noChrome?` props; renders skip link, conditional `<SiteNav>`, `<main id="main-content">` slot, and `<SiteFooter>` on every page.

Verification: `grep -E "title|description|ogImage|noChrome|SkipLink|SiteNav|SiteFooter|main-content" src/layouts/BaseLayout.astro | head -15`
Expected: all 7 names appear.

Result: ☐

- [ ] **Step 2: §18 item 2 — Home noChrome=true preserved**

Home page (`src/pages/index.astro`) passes `noChrome={true}` and renders without the top nav. Hero starts at y=0.

Verification: `curl -s http://localhost:4321/ | grep -c "site-nav-header"`
Expected: 0 (the nav is not in the rendered HTML when noChrome is true).

Result: ☐

- [ ] **Step 3: §18 item 3 — Sub-pages render the nav with active tab + aria-current**

All sub-pages (`/work/<slug>/`, `/contact/`, `/404`) render the top nav. Active tab carries `aria-current="page"`.

Verification:
- `curl -s http://localhost:4321/work/animation-pipeline/ | grep -oE "aria-current=\"page\""` → 1 match
- `curl -s http://localhost:4321/contact/ | grep -c "site-nav-header"` → 1 match (nav renders) + 0 matches for `aria-current` (no tab is active on /contact/)
- `curl -s http://localhost:4321/404 | grep -c "site-nav-header"` (or visit a non-existent route in dev) — nav renders

Result: ☐

- [ ] **Step 4: §18 item 4 — Sticky + paper + 0.5px teal border + mobile wrap + no hamburger**

DevTools on `/work/animation-pipeline/`:
- `.site-nav-header` has `position: sticky`, `top: 0`, `z-index: 100`, `background-color: rgb(255, 249, 240)` (paper), `border-bottom: 0.5px solid` teal.
- Resize browser to ≤640px: the 5 tabs wrap to a second line (the wordmark + first row of tabs on line 1, remaining tabs on line 2). No hamburger appears.

Result: ☐

- [ ] **Step 5: §18 item 5 — Wordmark links to / + 5 tabs link to their routes**

DevTools on `/work/animation-pipeline/`:
- Wordmark `<a>` href is `/`.
- 5 tabs in order: `/work/`, `/transactions/`, `/architecture/`, `/essays/`, `/about/`.

Result: ☐

- [ ] **Step 6: §18 item 6 — Footer renders on every page including home**

Already shipped Phase 2 — verification:
- `curl -s http://localhost:4321/ | grep -c "site-footer"` → 1 match
- `curl -s http://localhost:4321/contact/ | grep -c "site-footer"` → 1 match
- `curl -s http://localhost:4321/work/animation-pipeline/ | grep -c "site-footer"` → 1 match

Result: ☐

- [ ] **Step 7: §18 item 7 — Subscribe column renders 3 RSS + Substack with ↗ glyphs**

Already shipped Phase 2; spot-check: `curl -s http://localhost:4321/ | grep -oE "/transactions/rss.xml|/architecture/rss.xml|/essays/rss.xml|read on substack"` → 4 matches.

Result: ☐

- [ ] **Step 8: §18 item 14 — /contact renders ~600px minimal page**

Verification: `curl -s http://localhost:4321/contact/ | grep -oE "Email me at|sean@seanwinslow.com|BOSTON · CONTACT"` → 3 matches at minimum.
Visual: page height ≥ 600px (DevTools → measure the `.contact-page` element).

Result: ☐

- [ ] **Step 9: §18 item 15 — /404 renders ~400px page**

Verification: `npm run build && grep -oE "PAGE NOT FOUND|Nothing at this URL" dist/404.html` → 2 matches.
Visual at dev URL `http://localhost:4321/route-that-doesnt-exist/`: the 404 layout renders with the nav above + footer below.

Result: ☐

### Task 6.2: Lighthouse spot-check on /work/<slug>

**Files:**
- (no edits — measurement only)

Per site-chrome §18 item 22: Lighthouse on each sub-page index should hit Performance ≥90 / Accessibility ≥95 / Best Practices = 100. The home page already satisfied this Phase 2. Spot-check the case-study stub at `/work/animation-pipeline/` now that the nav is in place.

- [ ] **Step 1: Run Lighthouse**

Open `http://localhost:4321/work/animation-pipeline/` in Chrome → DevTools → Lighthouse tab → "Mobile" + "Performance / Accessibility / Best Practices / SEO" → "Analyze page load".

Wait for the run to complete.

- [ ] **Step 2: Capture scores**

Expected:
- Performance: ≥90
- Accessibility: ≥95
- Best Practices: 100
- SEO: ≥90

If Accessibility is <95, the most likely cause is a missing `lang` attribute on `<html>` (it's set), missing alt text (Phase 2 should have alt on every img), or a contrast issue on the nav. Inspect the Lighthouse breakdown for the exact issue.

If Performance is <90, the most likely cause is the WebM character video or the WebP hero icons. The home page already passes Performance ≥95 in Phase 2; the case-study stub adds ~negligible bytes (just the nav).

- [ ] **Step 3: Record results in a follow-up commit if scores need explanation**

If scores pass: no commit needed.
If scores fail: investigate root cause; fix in a follow-up task. Do NOT lower the DoD threshold to make a number pass.

Result: ☐

### Task 6.3: Final smoke — npm run build

**Files:**
- (no edits — measurement only)

- [ ] **Step 1: Production build**

Run: `npm run build 2>&1 | tail -20`

Expected: build completes without errors. New static files in `dist/`:
- `dist/404.html` (Task 3.1)
- `dist/contact/index.html` (Task 4.1)
- `dist/work/<slug>/index.html` for each of 5 work entries (existing from Phase 2)
- `dist/sitemap-index.xml` + `dist/sitemap-0.xml` (existing from Phase 2)

- [ ] **Step 2: Verify the sitemap picks up new routes**

Run: `grep -oE "<loc>[^<]+</loc>" dist/sitemap-0.xml | sort -u`

Expected entries (at minimum):
- `<loc>https://seanwinslow.com/</loc>`
- `<loc>https://seanwinslow.com/contact/</loc>`
- `<loc>https://seanwinslow.com/work/animation-pipeline/</loc>` (and 4 other work slugs)

The `/404` route is correctly excluded from sitemaps by default.

- [ ] **Step 3: No commit**

Verification only.

---

## Section 7 — Final commit + status

### Task 7.1: Status check

- [ ] **Step 1: Verify clean tree**

Run: `git status`

Expected: working tree clean. All 7 commits from Tasks 0.1, 0.2, 1.1, 2.1, 3.1, 4.1 are on the branch.

- [ ] **Step 2: Note HEAD SHA + commit count**

Run: `git log --oneline e80d75d..HEAD | wc -l`

Expected: ~7 commits (3 carry-overs from Section 0 — though Task 0.3 has no commit — so 2 from Section 0 + 1 SiteNav + 1 BaseLayout + 1 /404 + 1 /contact = 6 commits minimum).

Run: `git rev-parse HEAD`

Note the SHA. This is the Phase 3a completion mark; Phase 3b's plan should reference it as its baseline.

- [ ] **Step 3: No further commit**

Plan complete.

---

## Section 8 — What's NOT in this plan (deferrals to Phase 3b / 3c / 3d / Phase 4)

For clarity to the next planning sessions:

| Defer | Spec / Reason | Owner plan |
|---|---|---|
| Case-study body for `/work/[slug]` (replaces the Phase 2 stub) | [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) §§2-13 — investigation board, Methods strip, 4Q block, next/prev nav. Status-driven page-shape rendering (ACTIVE / SHIPPED / PAUSED / ARCHIVED). 4Q reads from canonical `EXPLANATION.md` at build via `scripts/fetch_canonical_sources.mjs`. | **Phase 3b** |
| `/transactions/` index + per-surface filter + per-slug deep-dive + RSS feed | [`transactions-spec-v1.md`](../../specs/transactions-spec-v1.md) §§2-13. Re-architected schema. `<MethodsStrip />` + `<FourQBlock />` reused from case-study build. RSS via `@astrojs/rss`. | **Phase 3c** (shared with arch + essays — same collection-route template) |
| `/architecture/` index + per-slug deep-dive + RSS feed | [`architecture-spec-v1.md`](../../specs/architecture-spec-v1.md). HONEST NOTE callouts; flat-equality scoreboard; `astro-mermaid` integration. | **Phase 3c** |
| `/essays/` index + per-slug deep-dive + RSS feed | [`essays-spec-v1.md`](../../specs/essays-spec-v1.md). Sober-middle, personal-voice-bookended register. `<QuadrantChart />` + `<RoleMap />` + `<PlottedArtifacts />` components. | **Phase 3c** |
| `/about/` page body | [`about-spec-v1.md`](../../specs/about-spec-v1.md). Saturday-morning cartoon cels (6), full character figure, B-1 chromatic lane-tint timeline, B-4 CURRENTLY @ stamp, pulse strip from `about-pulse.json`. v1 ships per §1.2 deferral table (no decorative SVG headings, no annotations, no signature SVG, no kid-drawing margin artifact). | **Phase 3d** |
| Sub-page nav reveal delay (site-chrome §6.1.1 item 2 — the 600ms delayed fade-in after View Transition) | Adds JS to a chrome that explicitly avoids JS per site-chrome §15. Substrate continuity (item 1) + visual inspection (item 3) deliver the load-bearing 80% of the §6.1.1 intent in v1. | v1.1 polish candidate — log if perceptible nav-pop on the live build |
| Daily Driver agent writers for `/api/dateline.json` / `/api/next-piece.json` / `/api/about-pulse.json` / `/api/shipped-stats-<slug>.json` | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.6 — runtime writer at 08:45 daily. v1 hand-seeds the JSON; Phase 4 wires the writer. | **Phase 4** |
| Plausible analytics | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4. | **Phase 4** |
| Vercel deploy + custom domain DNS | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4. | **Phase 4** |
| Hand-authored Procreate substrate (paper-tile.png, tear-edge.png, hero-floor-shadow.png) | [`texture-and-artifacts-spec-v1.md`](../../specs/texture-and-artifacts-spec-v1.md) §3.2 + §4.2. The Pillow-generated v1 substrates ship as v1; hand-authored versions are an indefinite v1.1+ option. | **Deferred indefinitely** |
| Re-attempt subagent-driven-development dispatch | Phase 2 + 2b + 3a (this plan) defaulted to direct controller execution after the implementer subagent hallucinated context constraints. Re-attempt only if the harness has improved between this phase and the next. | Each subsequent planning session re-evaluates |

---

## Self-review summary

- **Spec coverage:** site-chrome-spec §18 items 1–7 + 14 + 15 are each covered by a verification step in Section 6 (Task 6.1 Steps 1–9). Items 8 (theme toggle) + 9 (theme cookie persistence) + 11 (dark-mode tokens) + 13 (lib/site.ts) + 16 (RSS auto-discovery) + 17 (sitemap) + 18 (OG defaults) + 19 (print stylesheet) + 20 (View Transitions persist) + 21 (Lighthouse home) + 23 (V3 bridge bookmark survival) were all shipped Phase 2 — verified existing, not re-built. Item 10 (theme cookie name `sw-theme` preserved) was already wired in Phase 2's inline FOUC script. Item 12 (skip link first focusable) is existing Phase 2 work; the conditional `<SiteNav>` render does not displace it. Item 22 (Lighthouse on each sub-page index) is the Task 6.2 spot-check on `/work/<slug>/`.
- **Placeholders:** None. Every step is concrete (exact files, exact code, exact verification commands).
- **Type consistency:** `WORDMARK` from `src/lib/site.ts` is consumed by SiteNav; `EMAIL` / `LINKEDIN_URL` / `GITHUB_URL` are consumed by `/contact/`. The `noChrome` prop is already defined in BaseLayout's Props interface from Phase 2; no type drift.
