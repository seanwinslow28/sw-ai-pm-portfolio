# Home — About Teaser v1 — Build Spec

> **Status:** LOCKED 2026-05-20. All 7 OPEN-N items resolved to recommended defaults; the deck style sequence (OPEN-1) + Card 1 photo source (OPEN-6) are deferred to the asset-brainstorm session (assets to be authored before Phase 2 build fires). See [CHANGELOG.md](../../CHANGELOG.md) for the lock entry.
> **Scope:** The new home-page section between the projects grid and the universal footer. Inherits everything from [`hero-spec-v1.md`](hero-spec-v1.md) (color, type, motion, cursor), [`projects-section-spec-v1.md`](projects-section-spec-v1.md) (view-transition contract), and [`site-chrome-spec-v1.md`](site-chrome-spec-v1.md) (footer adjacency + torn-paper seam vocabulary). Co-dependent with [`about-spec-v1.md`](about-spec-v1.md) §7 (cross-page lead-line property) and §11 (Saturday-morning-canon styles, may inform card variations). Requires the §784 addendum captured in §10 of this spec.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + the four inherited specs open.

---

## 1. The Teaser, in one sentence

A wire-service-quiet two-column closeout below the projects grid — a 10-card swipeable character-deck (Sean rendered ten ways: 1 photograph + 9 AI-style variations) on one side, a Vonnegut-coded editorial line + dated proof beat + CTA into `/about/` on the other. The card stack is the *visual* argument; the text is the *spoken* argument; both say *"animator + photograph + cartoon-renderings are all me."*

The teaser is the second load-bearing home-page surface after the hero. It carries the **character thesis** (CLAUDE.md's first load-bearing thing) all the way down the page — by the time the visitor reaches the footer, the character has been re-stated ten aesthetic ways. The deck is also the explicit resolution to the apparent contradiction between the locked anti-photo rule (about-spec §784) and the visitor's reasonable desire to see Sean's face — the photo is one card in ten, anchoring the deck without supplanting the character.

---

## 2. Anatomy

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from projects section) ╲╱╲╱╲╱╲╱╲
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [52px gutter, 80px top padding]                                                │
│                                                                                 │
│   ABOUT — TEASER                                ← mono eyebrow, 12px teal       │
│                                                                                 │
│   ┌────────────────────────────┐                                                │
│   │  "A man, a pencil, an     │       ╭──────────────────────╮                  │
│   │   agent fleet. Same       │      ╱│                       │ ← 3D cascade   │
│   │   person, different       │     ╱ │   ┌──────────────┐    │   front card   │
│   │   tools."                 │    ╱  │   │              │    │   on top       │
│   │                            │   ╱   │   │   Sean       │    │                │
│   │  TODAY · 14 commits ·     │  ╱    │   │   [card 1]   │    │   z-index ↓    │
│   │  2 ship-drafts · 3 cels   │ ╱     │   │              │    │   with depth   │
│   │                            │       │   └──────────────┘    │                │
│   │  → READ THE FULL ABOUT    │       │                        │   stack of 10  │
│   │                            │       │   ──── swipe me → ►   │                │
│   └────────────────────────────┘       ╰──────────────────────╯                │
│                                                                                 │
│                                              ╲╱╲╱╲╱╲╱╲ torn-paper edge          │
└─────────────────────────────────────────────────────────────────────────────────┘
   ↑ text column (40% width)                ↑ swiper column (60% width)
   left-aligned                              right-aligned, sits ~40px higher than
                                             text baseline (visual rhyme to hero's
                                             `bottom: 80px` character lane)
```

Six elements on desktop, five on mobile (the "Swipe me" indicator drops on touch):

1. **Eyebrow** — `ABOUT — TEASER` (mono, 12px, teal). Sets register expectation immediately.
2. **Editorial line** — *"A man, a pencil, an agent fleet. Same person, different tools."* (Newsreader, weight 300, italic). Locked — the Vonnegut-coded pick from voice-variation pass 2026-05-20.
3. **Dated proof beat** — `TODAY · 14 commits · 2 ship-drafts · 3 cels` (mono, 14px, teal, with stamp-amber `TODAY · ` prefix). Renders the first 3 items of `/api/about-pulse.json`. See §9.
4. **CTA** — `→ READ THE FULL ABOUT` (mono, 14px, teal underline-on-hover). Routes to `/about/` via Astro View Transition (page-level fade).
5. **Swiper card stack** — 10 cards in a 3D cascade. See §6.
6. **"Swipe me" indicator** — desktop only, hidden on touch. See §6.

The teaser sits between the projects grid (above) and the chrome footer (below). Torn-paper seams on both edges — the visual sandwich primitive shared with `/contact/` and `/404/` (see [`site-chrome-spec-v1.md`](site-chrome-spec-v1.md) §2.3).

---

## 3. Vertical budget

### Desktop (≥1024px, 1440px reference)

| Element | Height |
|---|---|
| Torn-paper edge in from projects | 24px |
| Top padding | 80px |
| Eyebrow + 16px gap below | 28px |
| Editorial line (wraps ~2 lines at this size) | 96px |
| Gap below editorial | 24px |
| Dated proof beat | 24px |
| Gap below beat | 32px |
| CTA | 24px |
| Bottom padding | 80px |
| Torn-paper edge into footer | 24px |
| **Section total** | **~436px** |

The **swiper column** total is taller: ~427px (card height) + ~32px (Swipe me indicator + caption) = **~459px**. The swiper sits ~40px above the editorial line's baseline so the column heights visually balance (text column ~380px content height after padding ≈ swiper column ~459px content height). Visual rhyme to the hero's `bottom: 80px` character lane offset.

### Tablet (768–1023px)

| Element | Height |
|---|---|
| Editorial / proof / CTA column | ~360px |
| Swiper column (scaled to 290×387px card) | ~420px |
| **Section total** (incl. padding + torn-paper edges) | **~520px** |

Two-column layout preserved; text column shifts to 45%, swiper to 55%.

### Mobile (<768px)

Single column. Swiper on top, text below.

| Element | Height |
|---|---|
| Top padding | 48px |
| Swiper (260×347px card + cascade depth + Swipe me caption) | ~400px |
| Gap | 32px |
| Eyebrow | 22px |
| Editorial line (wraps ~3 lines) | 132px |
| Dated proof beat (wraps ~2 lines) | 40px |
| CTA | 24px |
| Bottom padding | 48px |
| Torn-paper edges (top + bottom) | 48px |
| **Section total** | **~794px** |

---

## 4. Type system (deltas only)

Inherits all type tokens from [`hero-spec-v1.md`](hero-spec-v1.md) §4. New elements only:

| Element | Font | Size desktop / mobile | Weight | Tracking | Leading | Color |
|---|---|---|---|---|---|---|
| Eyebrow | JetBrains Mono | 12 / 11 | 500 | 1.2px | 1.0 | `#0A3E42` (teal) |
| Editorial line | Newsreader italic | `clamp(22px, 2.4vw, 32px)` | 300 | -0.2px | 1.32 | `#1A1A1E` (ink) |
| Dated proof beat | JetBrains Mono | 14 / 13 | 500 | 0.8px | 1.4 | `#0A3E42` (teal); `TODAY · ` prefix in stamp-amber `#FAC775` |
| CTA | JetBrains Mono | 14 / 13 | 500 | 0.8px | 1.0 | `#0A3E42` (teal), underline animates on hover |
| Swipe-me caption | JetBrains Mono | 12 / hidden | 400 | 1.0px | 1.0 | `#0A3E42` (teal) |
| Card aria-label (screen-reader-only) | n/a | n/a | n/a | n/a | n/a | n/a |

The editorial line is the only Newsreader element in the teaser. Everything else is wire-service mono.

---

## 5. Color rules (teaser scope)

Inherits hero §5 color tokens verbatim. **No new color introduced.** Per PMP §4 color discipline: no splash color in this section — the teaser is wire-service-quiet, as fits a "byline" register. The deck cards bring their own palettes (varied across the nine styles), but the section's surrounding chrome is paper + ink + teal + stamp-amber only.

The torn-paper edges use the canonical SVG paper-tear primitive from [`texture-and-artifacts-spec-v1.md`](texture-and-artifacts-spec-v1.md) §2.

---

## 6. The Swiper (mechanics)

The swiper is a faithful rebuild of the original-portfolio pattern documented in `docs/old-portfolio-walkthrough.md` §5, adapted to the locked Astro 5 + Tailwind 4 stack. **No Framer Motion** — the original implementation's swipe physics were already pure CSS custom properties + native pointer events + `requestAnimationFrame`. The Framer pieces (entrance fades, "Swipe me" bob) are reimplemented as CSS keyframes.

### 6.1 Stack geometry

| Property | Value |
|---|---|
| Card count | 10 |
| Card aspect ratio | 3:4 portrait |
| Card size — desktop | 320 × 427px |
| Card size — tablet | 290 × 387px |
| Card size — mobile | 260 × 347px |
| Cascade depth offset (per card behind front) | CSS var `--card-z-offset: 12px` (z-axis), `--card-y-offset: 7px` (downward) |
| Container perspective | `perspective(700px)` |
| Z-index | Decreases with depth — front card always on top. Implemented via `style="z-index: var(--card-index)"` per card. |

The transform per card (depth `i = 0` is front): `perspective(700px) translateZ(-12px * i) translateY(7px * i)`. Renders as a fanned 3D cascade where cards behind the front peek down + back.

### 6.2 Swipe gesture

Implemented as a vanilla JS module (`src/scripts/teaser-swiper.js`) imported via an Astro `<script>` tag in the `<TeaserSwiper.astro>` component. Vanilla, no React island — state lives in module scope.

| Phase | Behavior |
|---|---|
| `pointerdown` | Records `startX`. Sets `transition: none` on the front card for immediate response. |
| `pointermove` | `requestAnimationFrame`-throttled. Computes `deltaX = clientX - startX`. Writes two CSS custom properties on the front card: `--swipe-x: ${deltaX}px` and `--swipe-rotate: ${deltaX * 0.2}deg`. Opacity fades: `1 - (Math.abs(deltaX) / 100) * 0.75`. |
| **Auto-trigger** | If `Math.abs(deltaX) > 50px` mid-drag, swipe auto-completes — user doesn't need to release. |
| `pointerup` (swipe completes) | If `Math.abs(deltaX) > 50px`: card flies to `x = ±300px`, `rotate = ±20deg` over 300ms. Midway through (50% of duration via `@keyframes` step), rotation flips opposite for "tossed card" tumble. After 300ms, the front card moves to the back of the `cardOrder` array; all cards re-rendered with new `--card-index` values; new front card becomes interactive. |
| `pointerup` (snap-back) | If `Math.abs(deltaX) ≤ 50px`: card springs back to `--swipe-x: 0`, `--swipe-rotate: 0`, opacity 1 over 250ms. |
| `pointercancel` | Treated as snap-back. |

The swipe duration is exposed as CSS variable `--card-swap-duration: 300ms` for tuning.

### 6.3 Card order rotation

`cardOrder` is a JS array of card indices, initialized `[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`. On swipe completion, the first element shifts to the end: `[1, 2, 3, 4, 5, 6, 7, 8, 9, 0]`. The module then calls `updatePositions()`, which writes the new `--card-index` value on every card element. CSS handles the rest via the transform formula in §6.1.

The deck is therefore infinite-loop — every card cycles through the front position eventually. There is no "swiped-out" terminal state.

### 6.4 "Swipe me" indicator

Desktop only. A small `→ SWIPE ME` mono caption + chevron arrow, positioned ~24px right of the card stack at vertical center. Detects touch capability via `(window.matchMedia('(hover: none)').matches)` — if true, the indicator is hidden (touch users know to swipe).

Bob animation: pure CSS keyframe.

```css
@keyframes teaser-swipe-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-8px); }
}
.teaser-swipe-me { animation: teaser-swipe-bob 2s ease-in-out infinite; }
```

Reveals 1s after the section enters viewport (see §8).

### 6.5 Fallback (`prefers-reduced-motion`)

Swipe physics disabled. The deck collapses to a tab-style affordance: `← prev` / `next →` buttons below the stack. Card change is an instant cross-fade (no transform). The CSS keyframe bob is removed. The 3D cascade is preserved (static), but no card moves except on button click. Keyboard navigation (§12) continues to work.

---

## 7. The 10 cards — style sequence (LOCKED)

The deck has a deliberate aesthetic sequence. The narrative shape: **photograph → animator's pencil-test → 8 cartoon/illustration registers** — each subsequent card re-renders the same person through a different aesthetic language. The deck argues "Sean is the same person; the tools change; the taste persists."

The deck thesis tightens around the **cartoons-that-formed-my-taste** narrative already running through about-spec §11 (Saturday-morning canon). The original 9-card draft pulled in editorial illustration / Studio Ghibli / blueprint linework registers; the locked 10-card deck instead leans into the cartoon / animation / illustrator-coded family that maps directly onto Sean's formative animation literacy. The trade-off: gained thematic coherence with the about-page thesis; narrowed aesthetic range across the deck.

**LOCKED 2026-05-20** — the 10-card sequence below was authored by Sean (Card 1 photo bg-mat + Cards 3-10 stylized variations) plus a Gemini-generated pencil-test trial (Card 2). Source assets live at [`reference-images/teaser-deck/`](../../reference-images/teaser-deck/). WebP conversion + final placement at `src/assets/teaser-deck/` happens during Phase 2 build (see §7.1).

| # | Card | Style direction | Source asset |
|---|---|---|---|
| 1 | Photograph (real) | Sean photographed against warm cream paper `#FFF9F0`, head + shoulders bust, light blue eye contact with camera, subtle warm closed-mouth smile, lean build, navy T-shirt. Sean's own bg-mat of the source headshot. | [`reference-images/teaser-deck/01-photo.png`](../../reference-images/teaser-deck/01-photo.png) |
| 2 | Pencil-test character | Traditional animation pencil-test sketch on warm cream animation paper. Production label `A-2` in top-left, three hole-punches at the bottom edge. Matches the hero WebM character style exactly. | [`reference-images/teaser-deck/02-pencil-test.png`](../../reference-images/teaser-deck/02-pencil-test.png) — generated by Gemini Nano Banana 2 (2026-05-20) using [`sean-headshot.jpg`](../../reference-images/headshot-source/sean-headshot.jpg) + [`2D-Character-Sketch-Sean-v1.png`](../../reference-images/2D-Character-Sketch-Sean-v1.png) as dual references. |
| 3 | Watercolor + ink illustration | Illustrator-coded — bold ink contour outline + loose watercolor washes on cream paper. Adrian Tomine / Roz Chast / New Yorker cartoonist register. Splattered ink texture across the background. | [`reference-images/teaser-deck/03-watercolor-ink.png`](../../reference-images/teaser-deck/03-watercolor-ink.png) |
| 4 | Bob's Burgers / Loren Bouchard family | Loren Bouchard character-design language — bean-shaped head, simple dot eyes, bold outline, flat color fills. Warm proportions. | [`reference-images/teaser-deck/04-bobs-burgers.png`](../../reference-images/teaser-deck/04-bobs-burgers.png) |
| 5 | Shōnen anime cel | Modern anime — angular features, narrow eyes with reflective highlights, spiky hair styled up, slight smirk. Bold black outline, flat cel-shaded color. | [`reference-images/teaser-deck/05-shonen-anime.png`](../../reference-images/teaser-deck/05-shonen-anime.png) |
| 6 | Classic Nicktoons (Hey Arnold!-adjacent) | 90s Nicktoons character design — flat color, simple features, freckles, oval eyes with dot pupils. Saturday-morning broadcast era. | [`reference-images/teaser-deck/06-classic-nicktoons.png`](../../reference-images/teaser-deck/06-classic-nicktoons.png) |
| 7 | Total Drama / CN noodle-character | Modern Cartoon Network simplification — big oval eyes with dot pupils, simple line work, exaggerated cartoon proportions. Total Drama Island-coded. | [`reference-images/teaser-deck/07-cn-noodle.png`](../../reference-images/teaser-deck/07-cn-noodle.png) |
| 8 | Comic illustration / Mike Allred-coded | Pop-art-coded comic — bold contour outlines, expressive cartoon eyes, watercolor color texture in the background. Editorial-cartoonist register. | [`reference-images/teaser-deck/08-comic-allred.png`](../../reference-images/teaser-deck/08-comic-allred.png) |
| 9 | Modern CN (Steven Universe / Star vs. Forces) | Clean modern Cartoon Network — almond eyes with light blue iris, simple line work, flat color. Late-2010s CN aesthetic. | [`reference-images/teaser-deck/09-modern-cn.png`](../../reference-images/teaser-deck/09-modern-cn.png) |
| 10 | Pop-art comic illustration | Big bulging cartoon blue eyes with rim highlights, sketchy ink line work, watercolor color texture. Roz-Chast-meets-Mignola energy. Closes the deck on expressive cartoon range. | [`reference-images/teaser-deck/10-pop-art-comic.png`](../../reference-images/teaser-deck/10-pop-art-comic.png) |

**Acknowledged register absences:** the locked deck does NOT include the originally-drafted Studio Ghibli watercolor / NYT editorial cross-hatch / Simpsons / architectural blueprint linework registers. Those were trade-able against thesis coherence and Sean chose the cartoon-formative-influences family instead. If a future revision wants those registers, they live as v2 candidate swaps for any of the looser-fitting cards in the current sequence.

### 7.1 Asset budget

| Asset | Source file (PNG) | Final file (WebP, at build) | Max size | Total budget |
|---|---|---|---|---|
| Card 1 (photo) | `reference-images/teaser-deck/01-photo.png` | `src/assets/teaser-deck/01-photo.webp` | 220KB | |
| Cards 2–10 (variations) | `reference-images/teaser-deck/0N-<style>.png` | `src/assets/teaser-deck/0N-<style>.webp` | 180KB each | |
| **Total deck (built)** | | | | **≤1.9MB** |

**WebP conversion at Phase 2 build:** the source PNGs at [`reference-images/teaser-deck/`](../../reference-images/teaser-deck/) range from ~700KB to ~13MB. A build-time conversion step (e.g., `sharp` or `cwebp`) reduces each card to ≤180KB WebP at 80% quality before placement at `src/assets/teaser-deck/`. The conversion is non-destructive — source PNGs remain in `reference-images/` for archival + regeneration.

Cards 1–2 eager-load (`loading="eager"`) — visible in cascade on initial paint. Cards 3–10 lazy-load (`loading="lazy"`).

### 7.2 Generation pipeline (executed 2026-05-20)

**Card 1 (photo):** Sean executed the bg-mat himself — the source headshot's cool-gray studio backdrop was replaced with the warm cream paper texture. Subject otherwise unchanged.

**Card 2 (pencil-test):** Generated using `.claude/skills/gemini-pencil-animation-image-gen` (Gemini Nano Banana 2). Two reference images passed via the `--reference` flag: the headshot at [`sean-headshot.jpg`](../../reference-images/headshot-source/sean-headshot.jpg) (identity anchor) + the canonical hero character anchor sheet at [`2D-Character-Sketch-Sean-v1.png`](../../reference-images/2D-Character-Sketch-Sean-v1.png) (style anchor). Trial 01 locked on first generation — strong identity + style match. See [`reference-images/teaser-deck-trials/02-pencil-test-prompt.txt`](../../reference-images/teaser-deck-trials/02-pencil-test-prompt.txt) for the full prompt.

**Cards 3–10 (8 stylized variations):** Authored by Sean using a combination of Gemini Nano Banana 2 and his own iteration. The lesson from the trial pass: shorter, less-prescriptive prompts produced more interesting results than dense multi-section templates. Sean's executed deck leans into the cartoon / illustration register family that ties back to about-spec §11 cartoon-canon thesis.

**Identity-preservation strategy that worked:** in every generation, the headshot was passed as a primary reference image. Light blue eyes proved to be the strongest single identity anchor — surviving across all 10 cards regardless of stylization severity.

---

## 8. Motion timeline

| t | Element | Motion | Easing | Duration |
|---|---|---|---|---|
| 0ms | Section enters viewport at 50% threshold (IntersectionObserver) | — | — | — |
| 0 → 400ms | Editorial line | Fades + `translateY(8px → 0)` | ease-out | 400ms |
| 200 → 600ms | Dated proof beat | Fades | ease-out | 400ms |
| 100 → 800ms | Swiper cards (staggered) | Cascade reveals — each card translates from `translateZ(-100px)` to its final cascade position with a 60ms-per-card stagger | `cubic-bezier(0.16, 1, 0.3, 1)` | 700ms total |
| 400 → 800ms | CTA | Fades | ease-out | 400ms |
| 1000ms | Swipe-me indicator | Fades in, then begins infinite bob | linear (fade) + ease-in-out (bob loop) | 400ms fade + 2s/cycle bob |
| **steady state** | Swipe-me indicator | Continues bobbing at 2s/cycle | ease-in-out | infinite |

**Reduced motion** (`prefers-reduced-motion: reduce`):
- All translates become opacity-only fades
- Card cascade reveal: cards appear at final positions instantly with a 200ms fade-in stagger only
- No swipe-me bob; indicator is replaced by static `← prev / next →` button pair
- No swipe physics (§6.5)

---

## 9. Data wiring

The dated proof beat reads from `/api/about-pulse.json` — the same endpoint already specced for the `/about/` page pulse strip (see [`about-spec-v1.md`](about-spec-v1.md) §8.1 + [`BLUEPRINT-COMPLETE.md`](BLUEPRINT-COMPLETE.md) §3.6).

**No new endpoint. No new Daily Driver work.** The Daily Driver writes this file at 08:45 daily from the existing filesystem scan in code-brain.

### 9.1 Render contract

- Fetch happens build-time via Astro middleware (same pattern as `dateline.json` per hero spec §8)
- Render the **first 3 `items[]`** of `about-pulse.json`, comma-separated
- Each item shape: `{ type: "commits"|"drafts"|"pencil_frames"|"reading", count: number, label: string }`
- Stamp-amber `TODAY · ` prefix prepended at render time, not stored in the JSON
- Example render: `TODAY · 14 commits · 2 ship-drafts · 3 cels`

### 9.2 Fallback

If `about-pulse.json` is missing or stale (>36 hours old): render the static line `TODAY · log will refresh at 08:45`. Build never blocks on missing data — matches the hero dateline fallback contract.

### 9.3 Why trim to 3 items

The full strip on `/about/` renders all items. The home teaser trims to 3 to preserve `/about/`'s distinctiveness — the visitor sees a slice on home, gets the full picture on the dedicated page. This is the same scarcity-as-incentive logic the projects grid uses with the dashed "next-in-production" card.

---

## 10. About-spec §784 addendum

[`about-spec-v1.md`](about-spec-v1.md) §784 reads: *"A photo of Sean — anti-character; never on this site."*

This teaser is the explicit exception. The rule was authored assuming a static-headshot-as-primary treatment. The swiper inverts that: the photo is one card in nine; the eight non-photo cards re-state the character thesis in eight aesthetic languages. The deck is the rule's *resolution*, not its violation — it argues that **every aesthetic register the portfolio uses (pencil-test, Saturday-morning canon, editorial illustration, blueprint linework) is downstream of the same person.**

### 10.1 Required edit to about-spec §784

The line is amended (not removed) — append a clause:

> *A photo of Sean — anti-character; never on this site, except as a single card in the home-page teaser swiper (see [`home-about-teaser-spec-v1.md`](home-about-teaser-spec-v1.md) §3 + §7).*

CHANGELOG entry under `docs/specs/about-spec-v1.md` records the amendment.

### 10.2 Photo treatment constraints (executed 2026-05-20)

The locked Card 1 photo satisfies the following constraints:

- ✓ Paper-warm background `#FFF9F0` (Sean executed bg-mat on the source headshot — no studio white, no environmental color)
- ✓ Subtle warm closed-mouth smile (matches the editorial register; matches the character's expression across the deck)
- ✓ Light blue eye contact with camera (visitor reciprocity + key identity anchor)
- ✓ 3:4 portrait crop, head + shoulders bust

**Note on the editorial line cross-reference:** the original spec called for "a hand visible holding a pencil" as a literal nod to the editorial line *"A man, a pencil, an agent fleet."* The executed photo does NOT include a hand-with-pencil composition — the editorial line still lands without the literal prop, and the pencil-test character (Card 2) carries the pencil-craft thesis visually. Acceptable trade.

---

## 11. Mobile

- Single column. Swiper on top, text below — see §3.
- Card scales to 260×347px (3:4 preserved)
- "Swipe me" indicator hidden (touch users know to swipe)
- Swipe physics unchanged (pointer events handle both mouse + touch natively)
- All text content unchanged — wraps to 3 lines for the editorial line and 2 lines for the proof beat at typical phone widths
- Touch targets: every card is 260×347px (well above 44×44px minimum); CTA touch area inflated to 48px tall

---

## 12. Accessibility

- **Keyboard:** when any card has focus, `←` and `→` advance the deck. `Tab` enters the swiper from the editorial column; the front card is the natural focus target. `Enter` or `Space` on the front card opens an alt-text dialog (announcing all 9 card descriptions) for screen reader users who can't perceive the cascade.
- **ARIA:** the swiper container has `role="region"` and `aria-label="Sean rendered ten ways — swipeable character deck"`. Each card has `aria-label="Sean as [style] — card N of 10"`. The `← / next →` reduced-motion buttons have `aria-controls` pointing at the swiper container.
- **Focus ring:** matches the hero spec — `2px solid #0A3E42` offset `2px` outside the card.
- **`prefers-reduced-motion`:** see §6.5.
- **`prefers-color-scheme: dark`:** the section follows site-chrome §8.5's "home page stays light-only even when dark mode is toggled." The deck cards themselves render in their native palettes regardless.
- **Image alt-text:** every card carries a precise alt-text (`alt="Sean as a Studio Ghibli watercolor render"`, etc.). Card 1's alt-text is the most specific (`alt="Sean Winslow, photographed against warm paper, holding a pencil"`).

---

## 13. Open decisions

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| ~~OPEN-1~~ | ~~§7 — full 9-style sequence~~ | **RESOLVED 2026-05-20** — locked as 10-card sequence per §7 table. | — |
| OPEN-2 | §2 — eyebrow text | `ABOUT — TEASER` | Sean prefers `→ ABOUT` (more wayfinding, less section-labeled) |
| OPEN-3 | §2 — CTA text | `→ READ THE FULL ABOUT` | `→ READ ABOUT` (shorter) or `→ TURN THE PAGE` (typeset-coded) |
| OPEN-4 | §6 — implementation: vanilla JS module vs. React island | **Vanilla JS** (Astro `<script>` module, state in module scope). Stays inside locked-stack purity (CLAUDE.md "no Framer, no GSAP, no Lenis"). | Card-order state grows tangled enough that a thin React island is cleaner — easy promotion later |
| OPEN-5 | §6 — swipe semantics | Symmetric rotation (front card moves to back on either-direction swipe, infinite loop). | Sean wants asymmetric "swipe left = dismiss, swipe right = like" — but there is no semantic for like/dismiss on a portrait deck, so symmetric wins by default |
| ~~OPEN-6~~ | ~~§7 — card 1 photo source~~ | **RESOLVED 2026-05-20** — Sean executed a bg-mat on his existing headshot, swapping the studio backdrop for warm cream paper. Card 1 source at [`reference-images/teaser-deck/01-photo.png`](../../reference-images/teaser-deck/01-photo.png). Pencil-in-hand composition dropped — see §10.2. | — |
| ~~OPEN-7~~ | ~~§7 — number of cards~~ | **RESOLVED 2026-05-20** — locked at 10 cards (the original 9-card default expanded to add Sean's authored variations). Stack-depth + cascade math at §6.1 work cleanly at 10. | — |

---

## 14. Definition of Done

- [ ] Section renders between projects grid and chrome footer
- [ ] Two-column layout desktop, single-column mobile
- [ ] Editorial line locks to: *"A man, a pencil, an agent fleet. Same person, different tools."*
- [ ] Eyebrow + editorial + dated beat + CTA + swiper + swipe-me indicator all present desktop
- [ ] Swiper card stack renders 10 cards in 3D cascade, front card on top, z-index decreasing with depth
- [ ] Swipe physics: pointer events + rAF, no Framer Motion
- [ ] Threshold: 50px drag auto-completes the swipe
- [ ] Card flies out `±300px, ±20deg`, rotation flips midway for tossed-card tumble
- [ ] Card-order rotation: front card moves to back of array after swipe completes
- [ ] Snap-back if drag ≤50px
- [ ] Keyboard navigation works (← / → arrows when focused on a card)
- [ ] `prefers-reduced-motion` falls back to `← prev / next →` button pair + instant cross-fade
- [ ] First 2 cards eager-loaded; cards 3–10 lazy-loaded
- [ ] "Swipe me" indicator visible desktop only (hidden via `(hover: none)` media query on touch)
- [ ] `about-pulse.json` first 3 items render with build-time fetch + fallback string
- [ ] About lead-line is NOT reproduced here (locked exclusive to `/about/`)
- [ ] Torn-paper edges top + bottom
- [ ] CTA routes to `/about/` via Astro View Transition
- [ ] About-spec §784 amended per §10.1
- [ ] All 10 source PNG assets converted to WebP at ≤180KB each (≤1.9MB total deck budget) during the build
- [ ] Re-run the 24-hour recall test on the live build — does the visitor remember "there's a full About page" + "Sean is rendered in 10 styles"?

---

## Appendix A: file map

```
src/
├── components/
│   ├── home/
│   │   └── AboutTeaser.astro             ← the section wrapper
│   ├── teaser/
│   │   ├── TeaserSwiper.astro            ← the 10-card stack container
│   │   ├── TeaserCard.astro              ← single card primitive
│   │   ├── SwipeMeIndicator.astro        ← desktop-only chevron + caption
│   │   └── ReducedMotionControls.astro   ← ← prev / next → buttons (reduced-motion fallback)
├── scripts/
│   └── teaser-swiper.js                  ← vanilla pointer-event swipe logic
├── content/
│   └── teaser-deck/
│       └── deck.json                     ← {cardIndex, src, alt, style} for each of 10 cards
├── assets/
│   └── teaser-deck/                      ← WebP-converted at build from reference-images/teaser-deck/
│       ├── 01-photo.webp
│       ├── 02-pencil-test.webp
│       ├── 03-watercolor-ink.webp
│       ├── 04-bobs-burgers.webp
│       ├── 05-shonen-anime.webp
│       ├── 06-classic-nicktoons.webp
│       ├── 07-cn-noodle.webp
│       ├── 08-comic-allred.webp
│       ├── 09-modern-cn.webp
│       └── 10-pop-art-comic.webp
└── styles/
    └── teaser.css                        ← scoped, imported by AboutTeaser.astro

reference-images/teaser-deck/             ← source PNGs (committed) — Phase 2 build converts to WebP
├── 01-photo.png                          ← Sean's bg-mat of sean-headshot-v2.png
├── 02-pencil-test.png                    ← Gemini-generated 2026-05-20
├── 03-watercolor-ink.png
├── 04-bobs-burgers.png
├── 05-shonen-anime.png
├── 06-classic-nicktoons.png
├── 07-cn-noodle.png
├── 08-comic-allred.png
├── 09-modern-cn.png
└── 10-pop-art-comic.png
```

---

## Appendix B: Hand-off prompt (verbatim)

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read this spec end-to-end. The teaser is one section on the home page, sitting between the locked projects grid and the universal site-chrome footer. Read [`hero-spec-v1.md`](hero-spec-v1.md) for the inherited color/type/cursor/motion tokens, [`projects-section-spec-v1.md`](projects-section-spec-v1.md) for the View Transition contract, [`site-chrome-spec-v1.md`](site-chrome-spec-v1.md) for the footer-adjacency seam, [`about-spec-v1.md`](about-spec-v1.md) for the §784 photo rule and §8.1 about-pulse endpoint contract, and `docs/old-portfolio-walkthrough.md` §5 for the original swiper reference implementation. Build `AboutTeaser.astro` as the section wrapper. Build `TeaserSwiper.astro` + `TeaserCard.astro` for the 10-card stack. Implement the swipe logic in `src/scripts/teaser-swiper.js` as a vanilla module — pointer events + `requestAnimationFrame` + CSS custom properties (`--swipe-x`, `--swipe-rotate`, `--card-index`). NO Framer Motion. NO React island unless OPEN-4 is switched. Implement the reduced-motion fallback (`← prev / next →` buttons) as `ReducedMotionControls.astro`. Implement the "Swipe me" indicator as `SwipeMeIndicator.astro`, hidden via `(hover: none)` media query on touch. Wire the dated proof beat to read `/api/about-pulse.json` at build time per §9. Apply the §10.1 amendment to about-spec §784 verbatim. Use Newsreader + JetBrains Mono from the existing Google Fonts import. Use the existing torn-paper SVG primitive. The 10 deck source PNGs at [`reference-images/teaser-deck/`](../../reference-images/teaser-deck/) need WebP conversion (sharp or cwebp, 80% quality, ≤180KB target per card) into `src/assets/teaser-deck/` per Appendix A. Stop when the 21 Definition-of-Done items can be ticked on `localhost:4321`.

---

*Drafted 2026-05-20 from the brainstorming pass that surfaced the photo-vs-character conflict and resolved it via the 9-card character-deck pattern. Awaits Sean's lock.*
