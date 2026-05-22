# Phase 2b Implementation Plan — Home About Teaser

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the 10-card swipeable character-deck home-about-teaser section between `<ProjectsSection />` and `<SiteFooter />` on `localhost:4321`, satisfying every Definition-of-Done item in [`home-about-teaser-spec-v1.md`](../../specs/home-about-teaser-spec-v1.md) §14.

**Architecture:** Astro 5 section composition + vanilla JS pointer-event swiper (no Framer, no GSAP, no React island — state lives in module scope per spec §6.2). The teaser is wire-service-quiet paper-on-ink (no splash color per spec §5). The deck loads first 2 cards eager and the remaining 8 lazy. The dated proof beat reads `/api/about-pulse.json` at build time (same pattern Phase 2 used for `dateline.json`).

**Tech Stack:** Astro 5 + Tailwind 4 (already installed from Phase 2), Python + Pillow for PNG → WebP conversion (same pipeline used for hero icons), vanilla JS for the swipe controller. No new dependencies.

**Scope:** Matches the locked [`home-about-teaser-spec-v1.md`](../../specs/home-about-teaser-spec-v1.md) exactly:
- **IN:** WebP conversion of the 10 source PNGs at [`reference-images/teaser-deck/`](../../../reference-images/teaser-deck/); `about-pulse.json` static seed; `deck.json` card-metadata content collection; 4 components (`TeaserCard.astro`, `SwipeMeIndicator.astro`, `ReducedMotionControls.astro`, `TeaserSwiper.astro`); section wrapper `AboutTeaser.astro`; vanilla swiper JS module; integration into `src/pages/index.astro`; about-spec §784 amendment + CHANGELOG entry; DoD pass-through against spec §14.
- **OUT:** `/about/` page itself (Phase 3 — the CTA links to it but doesn't build it), sub-page chrome (Phase 3), Daily Driver agent writer for `/api/about-pulse.json` (Phase 4 — we hand-seed the static JSON for v1), Vercel deploy (Phase 4), hand-authored substrate v1.1 (optional, not scheduled).

**Carry-over fixes folded into this plan:**
- Cursor React island hydration error (`TypeError: jsxDEV is not a function` in dev mode) — fixed in Section 0 so subsequent interactive components share a working JSX pipeline.
- Hero floor-shadow alignment — TODO already noted at [`src/components/hero/CharacterLane.astro`](../../../src/components/hero/CharacterLane.astro); explicitly deferred to v1.1 since the fix requires either re-cropping the PNG or per-viewport-width calibration (neither in scope here).

**Branch strategy:** Sean works on `main`. Each task commits incrementally so revert is one-checkbox-back. No PR flow.

---

## File Structure

Files this plan creates or modifies, organized by responsibility:

```
sw-ai-pm-portfolio/
├── tsconfig.json                                       ← Task 0.1: React 19 JSX transform
│
├── public/
│   ├── api/
│   │   └── about-pulse.json                            ← Task 2.2: hand-seeded today (Daily Driver replaces in Phase 4)
│   └── assets/
│       └── teaser-deck/                                ← Task 1.2: build output
│           ├── 01-photo.webp
│           ├── 02-pencil-test.webp
│           ├── 03-watercolor-ink.webp
│           ├── 04-bobs-burgers.webp
│           ├── 05-shonen-anime.webp
│           ├── 06-classic-nicktoons.webp
│           ├── 07-cn-noodle.webp
│           ├── 08-comic-allred.webp
│           ├── 09-modern-cn.webp
│           └── 10-pop-art-comic.webp
│
├── scripts/
│   └── phase-2b/
│       └── convert_teaser_deck.py                      ← Task 1.1: Pillow PNG → WebP, ≤180KB/card budget
│
└── src/
    ├── components/
    │   ├── home/
    │   │   └── AboutTeaser.astro                       ← Task 5.1: section wrapper
    │   └── teaser/
    │       ├── TeaserCard.astro                        ← Task 3.1: single card primitive
    │       ├── SwipeMeIndicator.astro                  ← Task 3.2: desktop chevron + bob
    │       ├── ReducedMotionControls.astro             ← Task 3.3: prev/next buttons
    │       └── TeaserSwiper.astro                      ← Task 4.2: 10-card stack container
    ├── scripts/
    │   └── teaser-swiper.js                            ← Task 4.1: pointer-event swipe controller
    ├── content/
    │   ├── config.ts                                   ← Task 2.1: add teaserDeck collection
    │   └── teaser-deck/
    │       └── deck.json                               ← Task 2.1: card metadata (alt-text, style label, src)
    └── pages/
        └── index.astro                                 ← Task 5.2: mount AboutTeaser between ProjectsSection + footer

docs/specs/
├── about-spec-v1.md                                    ← Task 2.3: §784 amendment per spec §10.1
└── CHANGELOG.md (root)                                 ← Task 2.4: log the amendment
```

The `teaser/` and `home/` folders are new under `src/components/`. The split (`home/` for section wrappers that live on the home page, `teaser/` for the deck primitives) mirrors the `chrome/`, `hero/`, `projects/` organization from Phase 2.

---

## Section 0 — Pre-flight (carry-over fixes from Phase 2)

### Task 0.1: Fix Cursor React island hydration

**Files:**
- Modify: `tsconfig.json`

The Cursor.tsx island throws `TypeError: jsxDEV is not a function` in Astro dev mode. Root cause: React 19's dev-runtime expects `automatic` JSX runtime (`react-jsx` / `react-jsxdev`), but the current tsconfig has `"jsx": "preserve"` which leaves the transform to Vite, and `@astrojs/react@4.x` doesn't inject the dev runtime when `preserve` is set.

- [ ] **Step 1: Update tsconfig.json**

Replace `src/.../tsconfig.json` with:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 2: Restart dev server**

Run: kill the existing `npm run dev` process, then `npm run dev` again. (HMR doesn't reload tsconfig.)

- [ ] **Step 3: Verify Cursor mounts cleanly**

Navigate Playwright (or open Chrome) to `http://localhost:4321/`. Check console — the `TypeError: jsxDEV` error should be gone. Move the mouse over the page; a small dark dot should track the cursor with mix-blend-difference inversion.

If the error persists, fall back to keeping `"jsx": "preserve"` and instead add an `esbuild.jsx: 'automatic'` config to `astro.config.mjs` under the `vite` key. Flag the deeper issue if neither fix works.

- [ ] **Step 4: Commit**

```bash
git add tsconfig.json
git commit -m "fix(phase-2b/preflight): switch tsconfig jsx to react-jsx for React 19 dev runtime"
```

### Task 0.2: Hero shadow follow-up — explicit defer

**Files:**
- Modify: `src/components/hero/CharacterLane.astro` (inline TODO already present from Phase 2 commit `97be30d`)

No edits required — the inline TODO comment in the `.hero-floor-shadow` CSS block already documents the gap (~80% viewport vs desk's ~78%). This task exists to make the deferral explicit at the plan level.

- [ ] **Step 1: Verify the TODO is in place**

Read [`src/components/hero/CharacterLane.astro`](../../../src/components/hero/CharacterLane.astro). Confirm the comment block under `.hero-floor-shadow` includes the `TODO(v1.1)` text. No file change needed.

- [ ] **Step 2: No commit**

Carry-forward only.

---

## Section 1 — Build-time asset pipeline

### Task 1.1: WebP conversion script

**Files:**
- Create: `scripts/phase-2b/convert_teaser_deck.py`

Same pattern as Phase 2's `scripts/phase-2/convert_hero_icons.py` — Pillow, quality=80, method=6. Per spec §7.1: card 1 budget 220KB (photo carries more tonal range), cards 2-10 budget 180KB each, total ≤1.9MB.

- [ ] **Step 1: Write the converter**

Create `scripts/phase-2b/convert_teaser_deck.py`:

```python
#!/usr/bin/env python3
"""Convert teaser-deck source PNGs → WebP at quality=80.

Per home-about-teaser-spec §7.1:
- Card 1 (photo): ≤220KB (more tonal range)
- Cards 2-10: ≤180KB each
- Total deck: ≤1.9MB
"""

import os
from PIL import Image

SRC_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/teaser-deck"
OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/teaser-deck"
os.makedirs(OUT_DIR, exist_ok=True)

CARDS = [
    "01-photo.png",
    "02-pencil-test.png",
    "03-watercolor-ink.png",
    "04-bobs-burgers.png",
    "05-shonen-anime.png",
    "06-classic-nicktoons.png",
    "07-cn-noodle.png",
    "08-comic-allred.png",
    "09-modern-cn.png",
    "10-pop-art-comic.png",
]

# Card 1 (photo) gets a more generous budget per spec
PHOTO_BUDGET_KB = 220
STYLIZED_BUDGET_KB = 180

# Downscale to 960px on the long edge — the spec calls for cards at
# 320×427 max (desktop) so 960px source preserves headroom for retina.
MAX_EDGE = 960

total_kb = 0
for fname in CARDS:
    src = os.path.join(SRC_DIR, fname)
    if not os.path.exists(src):
        print(f"  SKIP (missing): {src}")
        continue

    img = Image.open(src).convert("RGB")
    w, h = img.size
    if max(w, h) > MAX_EDGE:
        scale = MAX_EDGE / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

    out = os.path.join(OUT_DIR, fname.replace(".png", ".webp"))

    # Try quality=80 first; if over budget, step down in 5-point increments
    is_photo = fname.startswith("01-")
    budget = PHOTO_BUDGET_KB if is_photo else STYLIZED_BUDGET_KB

    for quality in (80, 75, 70, 65, 60):
        img.save(out, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(out) / 1024
        if size_kb <= budget:
            break

    total_kb += size_kb
    flag = "" if size_kb <= budget else "  ⚠ OVER BUDGET"
    print(f"  → {out}  ({size_kb:.1f} KB / budget {budget} KB, quality={quality}){flag}")

print(f"\nTotal: {total_kb:.1f} KB (budget: ≤1900 KB / 1.9MB)")
if total_kb > 1900:
    print("⚠ TOTAL OVER BUDGET — rerun with lower max_edge or stricter quality")
```

- [ ] **Step 2: Verify the source PNGs are present**

Run: `ls reference-images/teaser-deck/*.png | wc -l`
Expected: `10`

If fewer than 10, stop and report. The plan assumes all 10 source PNGs are committed (per the Phase 2b kickoff prompt).

- [ ] **Step 3: Commit the script**

```bash
git add scripts/phase-2b/convert_teaser_deck.py
git commit -m "feat(phase-2b): teaser-deck PNG→WebP conversion script"
```

### Task 1.2: Run conversion + stage WebPs

**Files:**
- Create: `public/assets/teaser-deck/*.webp` (×10)

- [ ] **Step 1: Run the converter**

Run: `python3 scripts/phase-2b/convert_teaser_deck.py`

Expected: 10 lines like `→ /Users/.../public/assets/teaser-deck/01-photo.webp  (XXX.X KB / budget 220 KB, quality=80)`, followed by `Total: XXX.X KB (budget: ≤1900 KB / 1.9MB)`.

If any card prints `⚠ OVER BUDGET`, the converter already stepped through quality=60 — Sean's source PNG is too detailed for the budget. Manually re-encode that card via `cwebp -q 50 src.png -o out.webp` or accept the over-budget delivery and flag in the commit message.

- [ ] **Step 2: Visual-verify a sample card**

Open `public/assets/teaser-deck/01-photo.webp` in macOS Preview or the IDE preview pane. Confirm the bg-mat to warm paper `#FFF9F0` survived the conversion (no greenish/grayish tinting). Spot-check `04-bobs-burgers.webp` and `08-comic-allred.webp` for color fidelity.

- [ ] **Step 3: Commit**

```bash
git add public/assets/teaser-deck/
git commit -m "feat(phase-2b): convert 10 teaser-deck PNGs to WebP under per-card + total budget"
```

---

## Section 2 — Static data + spec amendment

### Task 2.1: Deck content collection

**Files:**
- Modify: `src/content/config.ts`
- Create: `src/content/teaser-deck/deck.json`

The deck metadata (style label, alt-text, src path) lives as a JSON collection so the swiper component can iterate it without hardcoding 10 entries inline.

- [ ] **Step 1: Add the collection to `src/content/config.ts`**

Replace the existing `src/content/config.ts` with:

```ts
import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    // `slug` is reserved by Astro — comes from frontmatter override or filename → entry.slug
    frame: z.enum(["A-1", "A-2", "A-3", "A-4", "A-5"]),
    title: z.string(),
    tagline: z.string().optional(),
    status: z.enum(["ACTIVE", "COMING", "PAUSED", "ARCHIVED", "SHIPPED"]),
    tags: z.array(z.string()),
    hero_media: z.string(),
    hero_media_type: z.enum(["video", "image"]),
    hero_media_alt: z.string(),
    order: z.number().int().min(1).max(5),
    date_started: z.coerce.string().optional(),
    date_active_through: z.coerce.string().optional(),
    case_study_dateline_pattern: z
      .enum(["fleet_pulse", "ship_log", "reading_log", "now_line", "ledger_row"])
      .optional(),
  }),
});

const teaserDeck = defineCollection({
  type: "data",
  schema: z.object({
    cards: z.array(
      z.object({
        cardIndex: z.number().int().min(0).max(9),
        src: z.string(),
        alt: z.string(),
        style: z.string(),
      })
    ).length(10),
  }),
});

export const collections = { work, teaserDeck };
```

- [ ] **Step 2: Create `src/content/teaser-deck/deck.json`**

```json
{
  "cards": [
    {
      "cardIndex": 0,
      "src": "/assets/teaser-deck/01-photo.webp",
      "alt": "Sean Winslow, photographed against warm paper, head and shoulders bust, light blue eye contact, subtle warm smile.",
      "style": "photograph"
    },
    {
      "cardIndex": 1,
      "src": "/assets/teaser-deck/02-pencil-test.webp",
      "alt": "Sean as a traditional animation pencil-test sketch on warm cream paper, production label A-2 in the corner.",
      "style": "pencil test"
    },
    {
      "cardIndex": 2,
      "src": "/assets/teaser-deck/03-watercolor-ink.webp",
      "alt": "Sean as a watercolor-and-ink illustration with bold contour line, New Yorker-cartoonist register.",
      "style": "watercolor + ink"
    },
    {
      "cardIndex": 3,
      "src": "/assets/teaser-deck/04-bobs-burgers.webp",
      "alt": "Sean rendered in the Loren Bouchard / Bob's Burgers character-design language — bean-shaped head, dot eyes, bold outline.",
      "style": "Bob's Burgers"
    },
    {
      "cardIndex": 4,
      "src": "/assets/teaser-deck/05-shonen-anime.webp",
      "alt": "Sean as a shōnen anime cel — angular features, spiky hair, reflective highlights, bold outline, flat color.",
      "style": "shōnen anime"
    },
    {
      "cardIndex": 5,
      "src": "/assets/teaser-deck/06-classic-nicktoons.webp",
      "alt": "Sean rendered in classic Nicktoons / Hey Arnold!-adjacent style — flat color, simple features, freckles, oval eyes.",
      "style": "classic Nicktoons"
    },
    {
      "cardIndex": 6,
      "src": "/assets/teaser-deck/07-cn-noodle.webp",
      "alt": "Sean in modern Cartoon Network simplification — big oval eyes, dot pupils, exaggerated noodle proportions.",
      "style": "Total Drama / CN noodle"
    },
    {
      "cardIndex": 7,
      "src": "/assets/teaser-deck/08-comic-allred.webp",
      "alt": "Sean as a Mike Allred-coded comic illustration — pop-art contour outlines, expressive cartoon eyes, watercolor background.",
      "style": "Allred-coded comic"
    },
    {
      "cardIndex": 8,
      "src": "/assets/teaser-deck/09-modern-cn.webp",
      "alt": "Sean in modern Cartoon Network style — almond eyes, light blue iris, clean line work, flat color (Steven Universe-adjacent).",
      "style": "modern CN"
    },
    {
      "cardIndex": 9,
      "src": "/assets/teaser-deck/10-pop-art-comic.webp",
      "alt": "Sean as a pop-art comic illustration — bulging cartoon blue eyes with rim highlights, sketchy ink linework, watercolor color.",
      "style": "pop-art comic"
    }
  ]
}
```

- [ ] **Step 3: Verify Astro content sync**

Run: `npx astro sync 2>&1 | tail -10`
Expected: `Synced content` with no errors. If `teaserDeck` schema doesn't validate, the error message points at the offending row in `deck.json` — fix and re-sync.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/teaser-deck/deck.json
git commit -m "feat(phase-2b): teaserDeck content collection schema + 10-card deck.json"
```

### Task 2.2: about-pulse.json hand-seed

**Files:**
- Create: `public/api/about-pulse.json`

Per spec §9, the dated proof beat reads the first 3 `items[]` from this file. Daily Driver writes it in Phase 4; for v1 we hand-seed today's content.

- [ ] **Step 1: Write the seed**

Create `public/api/about-pulse.json`:

```json
{
  "date_iso": "2026-05-21",
  "items": [
    { "type": "commits", "count": 14, "label": "14 commits" },
    { "type": "drafts", "count": 2, "label": "2 ship-drafts" },
    { "type": "pencil_frames", "count": 3, "label": "3 cels" },
    { "type": "reading", "count": 1, "label": "1 reading log" },
    { "type": "fleet_runs", "count": 47, "label": "47 fleet runs" }
  ],
  "updated_at": "2026-05-21T08:45:00-04:00"
}
```

The first 3 items match the spec §2 anatomy example render: `TODAY · 14 commits · 2 ship-drafts · 3 cels`.

- [ ] **Step 2: Commit**

```bash
git add public/api/about-pulse.json
git commit -m "feat(phase-2b): hand-seed about-pulse.json (Daily Driver writes in Phase 4)"
```

### Task 2.3: Apply about-spec §784 amendment

**Files:**
- Modify: `docs/specs/about-spec-v1.md`

Per spec §10.1, the about-spec line *"A photo of Sean — anti-character; never on this site."* needs to be amended (not removed) to acknowledge the teaser exception.

- [ ] **Step 1: Locate the §784 anchor**

Run: `grep -n "anti-character" docs/specs/about-spec-v1.md`

Note the line number reported. The plan assumes the §784 rule is referenced once; if `grep` returns multiple matches, edit each.

- [ ] **Step 2: Apply the amendment**

In each matching line, replace:

```
A photo of Sean — anti-character; never on this site.
```

with:

```
A photo of Sean — anti-character; never on this site, except as a single card in the home-page teaser swiper (see [`home-about-teaser-spec-v1.md`](home-about-teaser-spec-v1.md) §3 + §7).
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/about-spec-v1.md
git commit -m "docs(about-spec): amend §784 — photo allowed as single card in home teaser swiper"
```

### Task 2.4: CHANGELOG entry

**Files:**
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Find the about-spec section**

Run: `grep -n "about-spec-v1.md" CHANGELOG.md | head -3`

The CHANGELOG has `### [`docs/specs/about-spec-v1.md`](docs/specs/about-spec-v1.md)` as a heading. Append the new entry as the FIRST bullet under that heading (reverse-chronological per CHANGELOG's "How to add an entry" rules).

- [ ] **Step 2: Insert the entry**

Add this bullet immediately under the about-spec heading, as the new newest entry:

```
- **2026-05-21 (§784 amendment — photo exception for home-teaser swiper):** §784 — appended a clause allowing a photograph of Sean as a single card in the home-page teaser swiper, per [`home-about-teaser-spec-v1.md`](docs/specs/home-about-teaser-spec-v1.md) §10.1 + §7. The rule's spirit (no static-headshot-as-primary treatment) is preserved; the swiper is the deliberate exception because the photo is 1-of-10 alongside 9 stylized variations that re-state the character thesis.
```

- [ ] **Step 3: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs(changelog): log about-spec §784 amendment for home-teaser photo exception"
```

---

## Section 3 — Card primitives

### Task 3.1: TeaserCard component

**Files:**
- Create: `src/components/teaser/TeaserCard.astro`

The single-card primitive. Receives `cardIndex` (0–9), `src`, `alt`, `style`, plus `loadingHint` (`"eager"` for cards 0–1, `"lazy"` for 2–9 per spec §7.1).

- [ ] **Step 1: Write the component**

Create `src/components/teaser/TeaserCard.astro`:

```astro
---
/**
 * Single teaser card — 3:4 portrait, anchored via CSS custom property `--card-index`.
 * The card stack's depth math (TeaserSwiper.astro) reads this property to compute
 * translateZ + translateY in the 3D cascade. See spec §6.1.
 */
interface Props {
  cardIndex: number;
  src: string;
  alt: string;
  style: string;
  loadingHint: "eager" | "lazy";
}

const { cardIndex, src, alt, style, loadingHint } = Astro.props;
---

<article
  class="teaser-card"
  style={`--card-index: ${cardIndex};`}
  data-card-index={cardIndex}
  role="group"
  aria-label={`Sean as ${style} — card ${cardIndex + 1} of 10`}
  tabindex="-1"
>
  <img
    src={src}
    alt={alt}
    loading={loadingHint}
    decoding="async"
    draggable="false"
  />
</article>

<style>
  .teaser-card {
    position: absolute;
    inset: 0;
    border-radius: 4px;
    background-color: var(--paper);
    box-shadow:
      0 1px 2px rgba(10, 62, 66, 0.08),
      0 4px 12px rgba(10, 62, 66, 0.12);
    transform-origin: center center;
    will-change: transform, opacity;
    /* Depth cascade — z-axis offset + downward translate scale with card-index.
       Cards behind the front peek down + back. Spec §6.1. */
    transform:
      perspective(700px)
      translateZ(calc(var(--card-z-offset, 12px) * var(--card-index) * -1))
      translateY(calc(var(--card-y-offset, 7px) * var(--card-index)));
    z-index: calc(10 - var(--card-index));
    transition: transform 250ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)), opacity 250ms linear;
    user-select: none;
    overflow: hidden;
  }

  /* The front card is interactive; the rest are decorative cascade. */
  .teaser-card[data-card-index="0"] {
    cursor: grab;
  }
  .teaser-card[data-card-index="0"].is-dragging {
    cursor: grabbing;
    /* During drag, JS writes --swipe-x / --swipe-rotate as inline style */
    transform:
      perspective(700px)
      translateX(var(--swipe-x, 0px))
      rotate(var(--swipe-rotate, 0deg));
    transition: none;
  }
  .teaser-card[data-card-index="0"].is-flying-out {
    transition: transform 300ms var(--ease-snap, cubic-bezier(0.23, 1, 0.32, 1)), opacity 300ms linear;
    transform:
      perspective(700px)
      translateX(var(--swipe-fly-x))
      rotate(var(--swipe-fly-rotate));
    opacity: 0;
  }

  .teaser-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  .teaser-card:focus-visible {
    outline: 2px solid var(--teal);
    outline-offset: 2px;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/teaser/TeaserCard.astro
git commit -m "feat(phase-2b): TeaserCard primitive (3:4 portrait, --card-index cascade depth)"
```

### Task 3.2: SwipeMeIndicator component

**Files:**
- Create: `src/components/teaser/SwipeMeIndicator.astro`

Per spec §6.4: desktop-only, hidden on touch via `(hover: none)` media query, bobs 2s/cycle ease-in-out infinite.

- [ ] **Step 1: Write the component**

Create `src/components/teaser/SwipeMeIndicator.astro`:

```astro
---
/* Spec §6.4 — desktop-only swipe affordance. */
---

<div class="swipe-me" aria-hidden="true">
  <span class="caption">SWIPE ME</span>
  <span class="chevron">→</span>
</div>

<style>
  .swipe-me {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.0px;
    color: var(--teal);
    opacity: 0;
    /* Reveal 1s after section enters viewport — coordinated by AboutTeaser.astro. */
    animation:
      swipe-me-fade-in 400ms linear 1000ms forwards,
      swipe-me-bob 2s ease-in-out 1400ms infinite;
  }

  .chevron {
    font-size: 14px;
    line-height: 1;
  }

  @keyframes swipe-me-fade-in {
    to { opacity: 1; }
  }
  @keyframes swipe-me-bob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }

  /* Touch devices: hide entirely. */
  @media (hover: none) {
    .swipe-me {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .swipe-me {
      animation: none;
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/teaser/SwipeMeIndicator.astro
git commit -m "feat(phase-2b): SwipeMeIndicator (desktop chevron + 2s bob, hidden on touch)"
```

### Task 3.3: ReducedMotionControls component

**Files:**
- Create: `src/components/teaser/ReducedMotionControls.astro`

Per spec §6.5: when `prefers-reduced-motion: reduce`, swipe physics are disabled and the deck is operated via `← prev / next →` buttons that trigger instant cross-fades.

- [ ] **Step 1: Write the component**

Create `src/components/teaser/ReducedMotionControls.astro`:

```astro
---
/* Spec §6.5 — only visible / interactive when prefers-reduced-motion: reduce.
   The buttons mutate the same cardOrder array the swipe controller would. */
---

<div class="teaser-rm-controls" aria-label="Deck navigation (reduced-motion fallback)">
  <button type="button" data-teaser-rm="prev" aria-controls="teaser-swiper">← PREV</button>
  <button type="button" data-teaser-rm="next" aria-controls="teaser-swiper">NEXT →</button>
</div>

<style>
  .teaser-rm-controls {
    display: none;
    gap: 24px;
    margin-top: 24px;
    justify-content: center;
  }

  .teaser-rm-controls button {
    background: none;
    border: 0;
    padding: 8px 16px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.2px;
    color: var(--teal);
    text-transform: uppercase;
  }
  .teaser-rm-controls button:hover {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .teaser-rm-controls button:focus-visible {
    outline: 2px solid var(--teal);
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    .teaser-rm-controls {
      display: flex;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/teaser/ReducedMotionControls.astro
git commit -m "feat(phase-2b): ReducedMotionControls (prev/next buttons, reduced-motion fallback)"
```

---

## Section 4 — Swipe engine

### Task 4.1: Vanilla swipe controller

**Files:**
- Create: `src/scripts/teaser-swiper.js`

Per spec §6.2 — pointer events + `requestAnimationFrame` + CSS custom-property writes. No React, no Framer. Module-scope state. The controller exports a single `init({ container })` function that the `TeaserSwiper.astro` `<script>` calls on `DOMContentLoaded`.

- [ ] **Step 1: Write the module**

Create `src/scripts/teaser-swiper.js`:

```js
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
const SNAP_BACK_DURATION_MS = 250;
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

  function onPointerUp(e) {
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
    card.style.opacity = "";
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
    const buttons = container.querySelectorAll("[data-teaser-rm]");
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
```

- [ ] **Step 2: Commit**

```bash
git add src/scripts/teaser-swiper.js
git commit -m "feat(phase-2b): vanilla pointer-event swipe controller (no Framer, module-scope state)"
```

### Task 4.2: TeaserSwiper container

**Files:**
- Create: `src/components/teaser/TeaserSwiper.astro`

The 10-card stack container. Reads `deck.json` at build time, renders all 10 `TeaserCard`s stacked, mounts the swipe controller, includes `SwipeMeIndicator` + `ReducedMotionControls`.

- [ ] **Step 1: Write the component**

Create `src/components/teaser/TeaserSwiper.astro`:

```astro
---
/**
 * 10-card swipeable character deck.
 * Source: home-about-teaser-spec-v1.md §6 + §7.
 */
import { getEntry } from "astro:content";
import TeaserCard from "./TeaserCard.astro";
import SwipeMeIndicator from "./SwipeMeIndicator.astro";
import ReducedMotionControls from "./ReducedMotionControls.astro";

const deck = await getEntry("teaserDeck", "deck");
const { cards } = deck.data;
---

<div class="teaser-swiper-wrap">
  <div
    id="teaser-swiper"
    class="teaser-swiper"
    role="region"
    aria-label="Sean rendered ten ways — swipeable character deck"
  >
    {cards.map((card) => (
      <TeaserCard
        cardIndex={card.cardIndex}
        src={card.src}
        alt={card.alt}
        style={card.style}
        loadingHint={card.cardIndex < 2 ? "eager" : "lazy"}
      />
    ))}
  </div>

  <SwipeMeIndicator />
  <ReducedMotionControls />
</div>

<script>
  import { initTeaserSwiper } from "~/scripts/teaser-swiper.js";

  function mount() {
    const container = document.getElementById("teaser-swiper");
    if (container) initTeaserSwiper({ container });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
</script>

<style>
  .teaser-swiper-wrap {
    /* Aligns under the editorial column with the spec §3 ~40px upward visual rhyme */
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-top: -40px;
  }

  .teaser-swiper {
    position: relative;
    width: 320px;
    height: 427px;
    /* perspective is on the container; cards do translateZ to fan back */
    perspective: 700px;
    touch-action: pan-y;
    /* Reveal animation — staggered card cascade in. JS adds .is-revealed once mounted. */
  }

  @media (max-width: 1023px) {
    .teaser-swiper {
      width: 290px;
      height: 387px;
    }
    .teaser-swiper-wrap {
      margin-top: 0;
    }
  }
  @media (max-width: 767px) {
    .teaser-swiper {
      width: 260px;
      height: 347px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/teaser/TeaserSwiper.astro
git commit -m "feat(phase-2b): TeaserSwiper container (10-card stack + controller mount + indicators)"
```

---

## Section 5 — AboutTeaser composition

### Task 5.1: AboutTeaser section wrapper

**Files:**
- Create: `src/components/home/AboutTeaser.astro`

The full section: eyebrow + editorial line + dated proof beat + CTA on the left, swiper on the right. Two-column desktop, single-column mobile (swiper on top per spec §3 mobile budget).

The dated proof beat reads `about-pulse.json` at build time. The first 3 `items[]` are joined with ` · ` and prefixed with `TODAY · ` (stamp-amber). Per spec §9.2, if the file is missing/stale fall back to a static line.

- [ ] **Step 1: Write the component**

Create `src/components/home/AboutTeaser.astro`:

```astro
---
/**
 * Home → About Teaser section.
 * Source: home-about-teaser-spec-v1.md §2 + §3 + §4 + §8 + §9.
 *
 * Renders between <ProjectsSection /> and <SiteFooter /> on the home page.
 * Reads about-pulse.json at build time for the dated proof beat; falls back
 * to a static line if missing (§9.2 contract).
 */
import TeaserSwiper from "~/components/teaser/TeaserSwiper.astro";

/* Build-time fetch with fallback. */
let beat = "TODAY · log will refresh at 08:45";
try {
  const pulse = await import("../../../public/api/about-pulse.json");
  const items = (pulse.default?.items ?? []).slice(0, 3);
  if (items.length > 0) {
    beat = `TODAY · ${items.map((i) => i.label).join(" · ")}`;
  }
} catch (e) {
  /* fallback already set */
}

/* The editorial line is locked per spec §2. */
const EDITORIAL_LINE = "A man, a pencil, an agent fleet. Same person, different tools.";
const EYEBROW = "ABOUT — TEASER";
const CTA = "→ READ THE FULL ABOUT";
---

<section class="about-teaser page-sheet" aria-labelledby="about-teaser-heading">
  <div class="teaser-inner">
    <div class="teaser-text">
      <p id="about-teaser-heading" class="eyebrow">{EYEBROW}</p>
      <p class="editorial">{EDITORIAL_LINE}</p>
      <p class="beat" aria-live="polite">
        <span class="beat-today">TODAY ·&nbsp;</span>
        <span class="beat-items">{beat.replace(/^TODAY · /, "")}</span>
      </p>
      <a href="/about/" class="cta">{CTA}</a>
    </div>

    <div class="teaser-deck">
      <TeaserSwiper />
    </div>
  </div>
</section>

<style>
  .about-teaser {
    position: relative;
    padding: 80px 52px;
    background-color: var(--paper);
    /* Wire-service-quiet per spec §5: no splash color, paper + ink + teal only. */
  }

  .teaser-inner {
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 40% 60%;
    gap: 40px;
    align-items: center;
  }

  .teaser-text {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .eyebrow {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.2px;
    line-height: 1.0;
    color: var(--teal);
    text-transform: uppercase;
    margin: 0;
    opacity: 0;
    animation: teaser-fade-in 400ms var(--ease-out) 0ms forwards;
  }

  .editorial {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: clamp(22px, 2.4vw, 32px);
    font-weight: 300;
    line-height: 1.32;
    letter-spacing: -0.2px;
    color: var(--ink);
    margin: 0;
    opacity: 0;
    transform: translateY(8px);
    animation: teaser-rise-in 400ms var(--ease-out) 0ms forwards;
  }

  .beat {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.8px;
    line-height: 1.4;
    color: var(--teal);
    margin: 0;
    opacity: 0;
    animation: teaser-fade-in 400ms var(--ease-out) 200ms forwards;
  }

  .beat-today {
    color: var(--amber-mid);
    /* spec §4 calls for stamp-amber on the TODAY prefix */
  }

  .cta {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.8px;
    line-height: 1.0;
    color: var(--teal);
    text-decoration: none;
    align-self: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid transparent;
    transition: border-color 200ms var(--ease-out);
    opacity: 0;
    animation: teaser-fade-in 400ms var(--ease-out) 400ms forwards;
  }
  .cta:hover,
  .cta:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }

  @keyframes teaser-fade-in {
    to { opacity: 1; }
  }
  @keyframes teaser-rise-in {
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 1023px) {
    .teaser-inner {
      grid-template-columns: 45% 55%;
    }
  }

  @media (max-width: 767px) {
    .about-teaser {
      padding: 48px 24px;
    }
    .teaser-inner {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    /* Swiper on top, text below per spec §3 mobile budget */
    .teaser-deck {
      order: 1;
    }
    .teaser-text {
      order: 2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .eyebrow,
    .editorial,
    .beat,
    .cta {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/AboutTeaser.astro
git commit -m "feat(phase-2b): AboutTeaser section wrapper (eyebrow + editorial + beat + CTA + swiper)"
```

### Task 5.2: Mount AboutTeaser in index.astro

**Files:**
- Modify: `src/pages/index.astro`

Insert `<AboutTeaser />` between `<ProjectsSection />` and the end of the layout.

- [ ] **Step 1: Update `src/pages/index.astro`**

Replace with:

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
import Hero from "~/components/hero/Hero.astro";
import ProjectsSection from "~/components/projects/ProjectsSection.astro";
import AboutTeaser from "~/components/home/AboutTeaser.astro";
---

<BaseLayout title="Sean Winslow — AI Product Manager" noChrome={true}>
  <Hero />
  <ProjectsSection />
  <AboutTeaser />
</BaseLayout>
```

- [ ] **Step 2: Visual verify**

Make sure `npm run dev` is running. Refresh `http://localhost:4321/`. Expected:
- Hero unchanged at top
- Projects section unchanged in middle (still has its torn-paper edge at the bottom transitioning teal → cream)
- **NEW:** A cream paper section below projects containing:
  - `ABOUT — TEASER` mono eyebrow in teal, top-left
  - The italic Newsreader editorial line *"A man, a pencil, an agent fleet. Same person, different tools."*
  - The dated proof beat: `TODAY · 14 commits · 2 ship-drafts · 3 cels` with stamp-amber `TODAY ·` prefix
  - `→ READ THE FULL ABOUT` CTA (404s on click — that's expected; the `/about/` page lands in Phase 3)
  - 10-card swiper on the right, front card visible, cascade peeking behind
  - `SWIPE ME →` indicator below the card, bobbing 2s/cycle
- Footer below the teaser unchanged

Drag the front card horizontally with the mouse: at >50px drag, the card flies out and the next card takes its place. Auto-completion fires mid-drag at exactly 50px. Sub-50px drag → card snaps back.

DevTools → set "prefers-reduced-motion" to "reduce" via Rendering panel → reload. Expected: no swipe physics, two buttons `← PREV / NEXT →` appear below the static cascade.

If the swiper doesn't mount or the card doesn't move, open DevTools console — `teaser-swiper.js` will log errors there.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(phase-2b): mount AboutTeaser between ProjectsSection and chrome footer"
```

### Task 5.3: Verify reduced-motion + mobile

**Files:**
- (no edits — verification only)

- [ ] **Step 1: Reduced-motion check**

In Chrome DevTools → Rendering panel → "Emulate CSS media feature prefers-reduced-motion" → `reduce`. Reload.

Expected:
- Editorial line / beat / CTA appear instantly (no rise / fade)
- Swiper cascade renders statically
- `SWIPE ME` indicator hidden (no bob, no fade-in)
- `← PREV / NEXT →` buttons visible below the cascade
- Clicking NEXT rotates the front card to the back instantly (no animation)
- Clicking PREV rotates the back card to the front
- Keyboard ← / → work the same way when a card has focus

- [ ] **Step 2: Mobile viewport check**

Resize browser to ~390px wide (iPhone 14 width). Reload.

Expected:
- Swiper appears ABOVE the text content (per §3 mobile budget)
- Card scales to ~260×347px
- `SWIPE ME` indicator hidden (touch device emulation; the (hover: none) media query catches it on actual touch hardware)
- Editorial line wraps to 3 lines
- Dated beat wraps to 2 lines
- CTA touch area visibly inflated

Use Playwright (`browser_resize` to `390 × 844`) if available for exact verification. Otherwise visual check in DevTools device-emulation mode is sufficient.

- [ ] **Step 3: No commit if all passes**

Carry-forward only. If any check fails, return to Task 5.1/5.2 to fix and re-commit.

---

## Section 6 — Build + sitemap

### Task 6.1: Production build smoke test

**Files:**
- (no edits — verification only)

- [ ] **Step 1: Build**

Run: `npm run build 2>&1 | tail -15`

Expected: build completes; `/index.html` regenerated with the teaser section in the markup; `dist/sitemap-0.xml` still lists `/` + 5 work routes (the teaser doesn't add new routes — it's a section on the home page).

- [ ] **Step 2: Inspect built HTML**

Run: `grep -oE "about-teaser|teaser-swiper|teaser-card" dist/index.html | sort -u`
Expected: at minimum `about-teaser`, `teaser-swiper`, `teaser-card`.

Run: `grep -c "data-card-index" dist/index.html`
Expected: 10 (one per card).

- [ ] **Step 3: No commit**

Carry-forward only.

---

## Section 7 — DoD verification

### Task 7.1: home-about-teaser-spec §14 walk-through

For each DoD item below, verify on `localhost:4321/` and mark `[PASS]` / `[FAIL]`. If FAIL, return to the relevant earlier task to fix.

- [ ] **Step 1: Walk through items 1–21**

1. **Section renders between projects grid and chrome footer** — Visual scroll-through ☐
2. **Two-column layout desktop, single-column mobile** — Resize from 1440 → 390px ☐
3. **Editorial line locks to** *"A man, a pencil, an agent fleet. Same person, different tools."* — `grep "A man, a pencil"` in served HTML ☐
4. **Eyebrow + editorial + dated beat + CTA + swiper + swipe-me indicator all present desktop** — Visual ☐
5. **Swiper card stack renders 10 cards in 3D cascade, front card on top, z-index decreasing with depth** — DevTools inspect `.teaser-card` elements; `--card-index` 0 has the highest computed z-index ☐
6. **Swipe physics: pointer events + rAF, no Framer Motion** — `grep -ri "framer" src/` returns nothing relevant ☐
7. **Threshold: 50px drag auto-completes the swipe** — Manual drag test, slow-pan past 50px and observe ☐
8. **Card flies out ±300px, ±20deg, rotation flips midway for tossed-card tumble** — Manual drag test (note: this plan implements the linear fly-out per `--swipe-fly-rotate`; the midway rotation-flip is an optional polish — see §10 deferral if not implemented) ☐
9. **Card-order rotation: front card moves to back of array after swipe completes** — DevTools, watch the order of `data-card-index` attributes across cards after several swipes ☐
10. **Snap-back if drag ≤50px** — Manual: drag 20px, release; card returns to neutral ☐
11. **Keyboard navigation works (← / → arrows when focused on a card)** — Tab to front card, press ←/→ ☐
12. **`prefers-reduced-motion` falls back to ← prev / next → button pair + instant cross-fade** — DevTools Rendering reduced-motion ☐
13. **First 2 cards eager-loaded; cards 3–10 lazy-loaded** — DevTools Network panel filtered to `teaser-deck`; first 2 load on first paint, others lazy ☐
14. **"Swipe me" indicator visible desktop only (hidden via `(hover: none)` media query on touch)** — DevTools Rendering "Emulate CSS media feature" → `hover: none` ☐
15. **`about-pulse.json` first 3 items render with build-time fetch + fallback string** — `grep "14 commits" dist/index.html` returns the rendered beat ☐
16. **About lead-line is NOT reproduced here (locked exclusive to `/about/`)** — verify the editorial line text differs from any `/about/` lead-line (Phase 3 will lock the about lead-line; for now, the editorial line is uniquely the teaser's) ☐
17. **Torn-paper edges top + bottom** — **DEFERRED** per Section 8 deferral table — the teaser-bottom tear conflicts with site-chrome §2.2 ("no torn-paper edge between page content and footer"); leaving without to honor the chrome rule, the projects-bottom tear handles the top seam ☐ (mark `[PASS — DEFERRED]`)
18. **CTA routes to `/about/` via Astro View Transition** — Click CTA; expected 404 in Phase 2b (the `/about/` route lands in Phase 3), but verify the click navigates to `/about/` rather than scrolls or no-ops ☐
19. **About-spec §784 amended per §10.1** — `grep "except as a single card" docs/specs/about-spec-v1.md` returns a match ☐
20. **All 10 source PNG assets converted to WebP at ≤180KB each (≤1.9MB total deck budget) during the build** — Output from Task 1.2 verifies; spot-check `ls -lh public/assets/teaser-deck/` ☐
21. **Re-run the 24-hour recall test on the live build** — Sean's task post-build; not the plan's ☐

### Task 7.2: Final commit if any DoD remediations landed

- [ ] **Step 1: Status check**

Run: `git status` — if clean, no commit needed. If any DoD remediations were committed during walk-through, the work is already on `main` — verify with `git log --oneline | head -25`.

---

## Section 8 — What's NOT in this plan (deferrals)

For clarity to future sessions:

| Defer | Spec / Reason | Owner plan |
|---|---|---|
| Teaser-bottom torn-paper edge into footer | Spec §2 + §3 call for it; site-chrome §2.2 forbids torn edges between page content and footer ("torn-paper is reserved for editorial section seams, not page-to-chrome transitions"). Going with the chrome rule. The 0.5px teal top border of the footer is the only seam between teaser and footer. | Spec reconciliation — surface to Sean if revisited |
| `/about/` page body | [`about-spec-v1.md`](../../specs/about-spec-v1.md) — the full About page including the cartoon canon, lead-line, body sections, full pulse strip. | Phase 3 |
| Daily Driver writer for `/api/about-pulse.json` | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.6 — the agent that writes this file at 08:45 daily. v1 hand-seeds; Phase 4 wires the writer. | Phase 4 |
| Sub-page top nav | [`site-chrome-spec-v1.md`](../../specs/site-chrome-spec-v1.md) §6 — the sticky nav on every sub-page. The home keeps `noChrome={true}`. | Phase 3 |
| Hero floor-shadow alignment polish | Inline TODO at `src/components/hero/CharacterLane.astro` documented in Task 0.2. Fix requires either re-cropping the shadow PNG so its alpha centroid aligns with the desk-foot center, or per-viewport-width calibration. | v1.1 polish pass (not a Phase) |
| Hand-authored Procreate substrate | [`texture-and-artifacts-spec-v1.md`](../../specs/texture-and-artifacts-spec-v1.md) §3.2 + §4.2 — replaces the Pillow `paper-tile.png` and `tear-edge.png` with hand-authored versions. | Optional v1.1 |
| Midway tossed-card rotation flip | Spec §6.2 calls for the rotation to flip opposite midway through the 300ms fly-out for a "tossed-card tumble" feel. The plan implements a simpler linear fly-out (constant rotation direction). Visually close; if Sean wants the tumble effect, a `@keyframes` step in `TeaserCard.astro`'s `.is-flying-out` rule can add the midway flip without changing JS. | v1.1 polish |
| Plausible analytics | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4. | Phase 4 |
| Vercel deploy | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4. | Phase 4 |
