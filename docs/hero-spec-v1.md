# Hero v1 — Build Spec

> **Status:** Locked 2026-05-13. Animation-reconcile + prototype-validated revisions applied 2026-05-16 — see §1.1 changelog.
> **Validation:** 24-hour recall test passed (original design). Prototype rendered + visually approved at the proportions specced below.
> **Scope:** This spec governs the home-page hero only. It supersedes V4 §5 (Layout) and V4 §9 (Hero Component) for the home page. Everything else in V3/V4 still stands — color system, paper texture, fonts, accessibility.
> **Buildable as-is.** Hand to a Claude Code session with this file open.

---

## 1. The Hero, in one sentence

Newsroom dateline above an editorial headline, with Sean working at his desk and his pencil-test AI companion floating beside him — a landscape loop anchored flush to the right edge of the viewport.

## 1.1 Changelog

- **2026-05-16 (prototype validation):** Composition revised from portrait shoulder-cutout to landscape desk-scene after the actual asset (`sean-typing-at-desk-hero-transparent.webm`) was rendered. The rotating "get in touch" badge was removed — character lane now owns the right side undisputed, contact CTA lives in the footer per §10. Name and tagline switched to `clamp()` so they scale on viewports >1440px. Lane sizing locked at 1024×576 with -180px right-bleed to clip the source canvas's empty band.
- **2026-05-16 (animation reconcile):** Originally three frame sets (walk-in / idle / blink). Replaced with a single seamless WebM loop per master plan §8.1.
- **2026-05-13:** Original spec locked + recall-tested.

---

## 2. Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  [52px gutter, 60px top padding]                                     │
│                                                                      │
│  BOSTON, MAY 13, 2026 — vault indexer wrote 47 chunks at 02:34...    │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  Sean Winslow                                                        │
│  / AI PRODUCT MANAGER                          ╭──◾◾◾─────────┐ ─ ─ ─│
│                                                │  ░░ companion ░░░ ░░│
│                                                │ ░░░░ floats   ░░░░░░│
│  Product Manager.                              │ ░░ here  ▭▭▭▭▭▭▭░░ ░│
│  The agents handle the math.                   │ ░░░░  ┌─┴───┴─┐ ░░░░│
│  I handle the taste.                           │ ░░░░  │ desk  │ ░░ ░│
│                                                │ ░░  ┌─┘       └─┐ ░│
│                                                │ ░░  │ Sean typing│░│
│  ╲╱╲╱╲╱╲ torn-paper edge ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲ │ ░░  └───────────┘ ░│
└──────────────────────────────────────────────────────────────────────┘
                                                  (lane bleeds past
                                                   the viewport edge —
                                                   the right empty
                                                   band of the source
                                                   is clipped off)
```

Four elements. No nav. No CTA. No subtitle. The dateline is the only thing above the name; the tagline is the only thing below the role. The right side of the hero is owned entirely by the character lane.

**Right-margin character lane** — anchored flush right with a negative right offset (lane width 1024px, `right: -180px`). The painted character is pushed visually flush against the right edge of the viewport; the empty whitespace band on the right side of the 1280×720 source canvas extends past the viewport and gets clipped by `overflow: hidden`. The lane sits with its bottom ~80px above the torn-paper edge.

**No badge.** The "get in touch" CTA is consolidated into the footer/contact section per §10 — the hero is paper + ink + character only.

The torn-paper edge masks the seam into the projects section.

---

## 3. Vertical budget

### Desktop (≥1024px viewport, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Top padding | 60px | |
| **Dateline strip** | 24px text + 30px gap + 0.5px divider | total ~54px |
| **Name** (`Sean Winslow`) | scales 56px → 130px via `clamp(56px, 7.2vw, 130px)` | renders ~120px at 2000px viewport, ~100px at 1440 |
| **Role tag** | 14px text + 12px top margin | mono, uppercase, 1.8px tracking |
| Gap (`.hero__body { margin-top }`) | 56px | |
| **Tagline** | scales 26px → 56px via `clamp(26px, 3.2vw, 56px)`, max-width 600px | wraps 2-3 lines on larger viewports |
| Bottom padding | 60px | torn-paper edge sits here |
| Character lane (absolute, flush right + bleed) | 576px tall × 1024px wide; `right: -180px`, `bottom: 80px` | floats, doesn't push content |
| Hero section height | **720px min**, expands with content | leaves breathing room without going 100vh |

The hero is ~80vh on a 900px laptop, ~67vh on a 1080p monitor. Never 100vh — leave a visible torn-paper edge below the fold to invite the scroll.

**Character lane composition rule:** the source video is 1280×720 landscape with the painted character (Sean at desk + companion floating to his right) centered horizontally with ~180px of empty canvas on each side. The lane is sized 1024×576 (16:9, matches source aspect) and positioned with `right: -180px` so the source's right empty band extends past the viewport edge and gets clipped by `.hero { overflow: hidden }`. The visual effect: the painted character sits flush against the right page edge, no whitespace gutter.

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Dateline | Stacks: `BOSTON, MAY 13, 2026` on line 1, status on line 2. Same mono, same stamp color. |
| Name | `clamp()` bottoms out at 56px |
| Role tag | unchanged |
| Tagline | `clamp()` bottoms out at 26px, wraps 3-4 lines |
| Character lane | Scales to ~240px tall × 420px wide (max-width: 420px), `right: -24px`, `bottom: -10px` — keeps the same flush-right bleed pattern at proportional scale |
| Hero height | ~640px |

The mobile rule: the character lane never sits *below* the tagline. If it doesn't fit in the right margin at small viewports, it drops to ~40% scale and overlaps the bottom-right corner of the tagline — that's the mynrd move and it works.

---

## 4. Type system

| Role | Font | Size (responsive) | Weight | Tracking | Line-height | Color |
|---|---|---|---|---|---|---|
| Dateline stamp | JetBrains Mono | 12px desktop / 11px mobile | 500 | 1.2px | 1.4 | `#7C2D12` (transaction stamp) |
| Dateline body | JetBrains Mono | 12px desktop / 11px mobile | 400 | 1.2px | 1.4 | `#546E71` (secondary ink) |
| Name | Newsreader | `clamp(56px, 7.2vw, 130px)` | 400 | -0.8px | 1.05 | `#0A3E42` (primary teal) |
| Role tag | JetBrains Mono | 14px (both) | 400 | 1.8px | 1.4 | `#546E71` |
| Tagline | Newsreader | `clamp(26px, 3.2vw, 56px)` | 300 | -0.3px | 1.22 | `#1A1A1E` (near-black) |
| Frame label (footer of hero, optional) | JetBrains Mono | 10px (both) | 400 | 1.6px | 1 | `#0A3E42` @ 0.7 opacity |

**Two fonts only.** No Inter. No Sora. Newsreader for editorial, JetBrains Mono for everything terminal/wire-service/technical. The serif-vs-mono contrast IS the duality.

**Newsreader source:** Google Fonts. Preload Newsreader 300 + 400 (Latin subset). `font-display: swap`.
**JetBrains Mono source:** Google Fonts. Preload 400 + 500.

---

## 5. Color rules (hero scope)

| Color | Hex | Used by |
|---|---|---|
| Paper | `#FFF9F0` | Hero background |
| Ink (primary) | `#1A1A1E` | Tagline |
| Teal (primary) | `#0A3E42` | Name |
| Secondary ink | `#546E71` | Dateline body, role tag |
| Transaction stamp | `#7C2D12` | Dateline `BOSTON, MAY 13, 2026 —` prefix ONLY |
| Border whisper | `rgba(10, 62, 66, 0.15)` | Dateline divider, torn-paper shadow |

The hero gets **zero splash color blocks.** No teal-backed sections, no amber pulls. The dateline stamp is the only chromatic moment, and it's a single phrase. The first full splash block lives in the project showcase section below.

---

## 6. Motion timeline (page load)

Trigger: `DOMContentLoaded`. Total entrance window: 1800ms.

| t (ms) | Element | Animation | Easing | Duration |
|---|---|---|---|---|
| 0 | Hero paper background | Fade from 0 → 1 | linear | 200ms |
| 200 | Dateline strip | Type-on, character by character | `cubic-bezier(0.16, 1, 0.3, 1)` | 500ms |
| 400 | Name (`Sean Winslow`) | Per-character stagger, translateY(40px) → 0 + opacity 0 → 1 | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms, 20ms/char stagger |
| 700 | Role tag | Fade + slight translateY(8px) → 0 | `cubic-bezier(0.16, 1, 0.3, 1)` | 300ms |
| 900 | Tagline | Per-line reveal (1 line desktop, 2-3 mobile); each line translateY(60%) → 0 + opacity | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 700ms, 120ms/line stagger |
| 1300 | Character lane | Opacity 0 → 1 fade-in; the video loop begins playing from frame 1 at this exact moment | `cubic-bezier(0.22, 1, 0.36, 1)` | 600ms fade |
| 1900 | Hero settled | Loop running on its own clock, dateline static | — | — |

**The opinionated bit:** Sean and his AI companion are *already there together* when you land. No walk-in, no arrival beat — the loop is the page's heartbeat. Sean types at his desk; the companion floats beside him with a subtle bob (~3.9s/cycle). This is the first 2 seconds that say *this is not a template* — an AI PM whose AI partner is hand-drawn and visibly working with him, looping quietly.

**Loop behavior (after t=1900):** the video plays continuously on its native ~3.9s cycle, `autoplay muted loop playsinline`, seamless first-frame-to-last-frame match (no visible loop point). Dateline does NOT animate after the initial type-on (it only changes on page reload or manual refresh).

**Note on phasing:** the loop begins playback at t=1300 so the *first* viewing experience is "page resolves → Sean and the companion appear together → typing + bob cycle begins." Subsequent cycles are ambient.

---

## 7. Character animation

> **Revised 2026-05-16** to match the asset that was actually rendered + the composition validated in the prototype. The original three-frame-set spec (walk-in / idle / blink) and the intermediate shoulder-cutout revision are both superseded.

**The asset:** one seamless WebM video loop. Sean seated at a desk, typing at a keyboard with a monitor in front of him; the **AI companion** (a pencil-test rendering of the Claude mascot) floats beside him in the upper-right of the frame with a subtle vertical bob. No entrance, no exit. The loop is the page's ambient heartbeat.

**Source:** Rendered via Seedream 2.0, anchored to the pencil-test style of `reference-images/2D-Character-Sketch-Sean-v1.png` (Sean) and `sw-portfolio-animation-2026/anchor-images/ai-companion-turnaround-anchor.png` (companion turnaround sheet). Frames exported, background-removed to alpha-transparent PNGs, then compiled to WebM with VP9 alpha. The shipping file:
`sw-portfolio-animation-2026/loop-3-hero-shoulder/loop-3-video/sean-typing-at-desk-hero-transparent.webm`
At build time this moves (or copies) to `/public/assets/character/hero-loop.webm`.

**Asset spec — measured from the shipping file:**

| Property | Value |
|---|---|
| Format | WebM, VP9 codec, `alpha_mode=1` (alpha channel encoded as a secondary VP9 stream) |
| Source resolution | 1280×720 landscape — the character pair sits centered in the canvas with ~180px of empty space on each side |
| Frame rate | 24fps |
| Frame count | 94 |
| Duration | 3.917s |
| Loop | Seamless — frame 1 matches frame 94 |
| File size | 378KB (well under the <800KB budget) |
| Path | `/public/assets/character/hero-loop.webm` |
| Poster image | `/public/assets/character/hero-loop-poster.webp` — frame 1 still |

**Why WebM with alpha (not MP4):** the paper background (`#FFF9F0`) must show through everywhere the character isn't. MP4/h.264 doesn't carry alpha; the video would render as a rectangle on the page. WebM VP9 with `alpha_mode=1` encodes the alpha channel as a secondary stream. Browser support is universal (Chrome/Edge/Firefox/Safari 16+).

**Implementation:** Native HTML5 `<video>` element. No React, no canvas, no JS scrubber, no Lottie. The element sits inside the character lane (absolute-positioned, see §3):

```html
<div class="character">
  <video
    src="/assets/character/hero-loop.webm"
    poster="/assets/character/hero-loop-poster.webp"
    autoplay muted loop playsinline preload="auto"
    aria-hidden="true">
  </video>
</div>
```

CSS for the inner `<video>` element uses `object-fit: contain` and `object-position: bottom right` so the painted character anchors to the bottom-right corner of the lane.

**The "flush right + bleed" trick:** the lane is 1024px wide but anchored at `right: -180px`. The source canvas has ~180px of empty space on its right edge (the AI companion sits well inside, not at the source's rightmost pixel). By bleeding the lane 180px past the viewport edge, the empty band lands off-screen and `overflow: hidden` clips it — the visual result is the painted character flush against the right page edge with zero gutter. This is the locked composition; don't recenter.

**Other surfaces:** the longer 9.2s "Sean + companion arrival + departure" loop (220 frames, `sw-portfolio-animation-2026/Portfolio-BG-removal/BG-Removed/character.webm`) is **not** for the hero. It moves to the **animation-pipeline case-study page** (`/work/animation-pipeline`) as that page's hero media — where the longer narrative beat is the case-study artifact itself.

**Fallback:** If `prefers-reduced-motion: reduce`, render the poster image only — no video element mounted.

---

## 8. Dateline component

### Data source

A static JSON file at `/api/dateline.json` (or a Cloudflare Worker that returns the same shape). The Daily Driver morning agent writes this file at 08:45 daily.

```json
{
  "date_iso": "2026-05-13",
  "date_display": "BOSTON, MAY 13, 2026",
  "pattern": "fleet_pulse",
  "body": "vault indexer wrote 47 chunks at 02:34. fleet green. 7 of 9 agents on.",
  "updated_at": "2026-05-13T08:45:00-04:00"
}
```

### Pattern rotation

The Daily Driver picks one of five patterns based on what fired the night before:

| Pattern | When it wins | Example |
|---|---|---|
| `fleet_pulse` | Default — vault/synth/lint activity to report | *vault indexer wrote 47 chunks at 02:34. fleet green. 7 of 9 agents on.* |
| `ship_log` | Something actually shipped in the last 24h (git tag, deploy, MCP release) | *synthesizer retrofit tier 1 shipped. 62 tests pass.* |
| `reading_log` | Quiet day, Sean explicitly logs what he's reading | *currently reading: ob1 typed reasoning edges spec.* |
| `now_line` | Job-hunt milestone day | *wk 2 of 8. 3 phone screens booked.* |
| `ledger_row` | A new EXPLANATION.md row landed on `/transactions/` | *intent-engineering MCP shipped 5/12. judge layer in review. 9 artifacts on the ledger.* |

One pattern per day. Never mix. The Daily Driver chooses; the page renders. The `ledger_row` pattern reads from the same content collection that powers `/transactions/`, so it stays automatically in sync.

### Fallback

If `/api/dateline.json` is unreachable or stale (>48h old), render a static fallback:
> *BOSTON — building in public, one frame at a time.*

The fallback is the only line on the site that's "voicey" without being earned by real data. It's deliberately generic because it only appears when the system is broken.

### Type-on animation

500ms `cubic-bezier(0.16, 1, 0.3, 1)`. Cursor block character (▌) blinks at the end of the typed line for 800ms, then fades. The stamp prefix (`BOSTON, MAY 13, 2026 —`) types in slightly faster (300ms) than the body (200ms) — newspaper rhythm: dateline first, then the lede.

---

## 9. Custom cursor (D1) — hero scope

**Default state:** A 6px ink dot, lagged 2 frames behind the actual mouse position (lerp factor 0.15). `mix-blend-mode: difference` so it inverts color over the character and the dateline stamp.

**Hover states on the hero:**

| Target | Cursor transforms to | Notes |
|---|---|---|
| `Sean Winslow` (name) | Scales to a 60px circle, ink fill, blend-difference | Click does nothing — name is not a link |
| Character lane | Cursor becomes a tiny pencil icon | Easter egg — no click action |
| Empty paper | Default 6px dot | |

**Mobile:** No custom cursor (touch devices). All hover states fall back to default touch affordances.

**Implementation:** Single `<div class="cursor">` with `position: fixed`, `pointer-events: none`, `z-index: 800`. RAF loop updates `transform: translate(...)` with lerp. State changes via JS class toggles, not CSS `:hover`, so the cursor can react to elements other than the directly hovered one (mynrd pattern §1.5).

**Fallback:** If reduced-motion is on, the cursor renders as the native browser cursor. No custom cursor.

---

## 10. Splash-color rule (D2) — hero scope reminder

The hero is paper-on-ink with one stamp accent. **The first full-bleed splash color block arrives in the next section** (the project showcase, deep teal `#0A3E42`). The torn-paper edge at the bottom of the hero is what introduces it — the visitor sees the teal start to peek through the paper as they scroll, and then commits to the splash as the projects section enters the viewport.

This is the architectural rule, not just a hero rule:
- **Hero:** paper, no splash
- **Projects:** full teal block, torn-paper edges top + bottom
- **About:** paper, no splash (the character lives here in his fullest form)
- **Now / Transactions wing:** paper, the dateline-amber stamp does double duty as the accent
- **Contact:** full amber block, torn-paper edge top

One splash per section, never two. Codify in CSS as section-scoped CSS custom properties.

---

## 11. Pencil margin annotations (D3) — hero scope reminder

**Not on the hero.** The hero is editorial-clean. Margin annotations live on:

- Project case study pages (arrows pointing at metric charts, "rev 3 / fix this" scribbles next to PRD diffs)
- The About page (a coffee-ring stain near the character, a registration mark at the page corner)
- Transactions wing pages (frame numbers in the gutter, a "see also" arrow connecting two artifacts)

The hero is the clean cover of the sketchbook. The annotations live inside.

---

## 12. Accessibility + reduced motion

- WCAG AA contrast minimum. Locked palette already clears AA (teal on paper = 8.7:1, ink on paper = 14.2:1, stamp on paper = 7.4:1).
- Focus indicators: 2px dashed outline at 6px offset, color `#0A3E42`. With the badge removed (see §1.1 changelog), the hero has no focusable elements — focus skips through to the projects section.
- `prefers-reduced-motion: reduce` — all animations collapse to opacity 0 → 1 fade over 200ms. No translateY, no scale, no type-on, no custom cursor. **No video element mounted** — character lane renders the poster image only.
- Keyboard order: name (focusable for screen readers only) → role → tagline → (skip to projects section).
- Character lane is decorative (`aria-hidden="true"`); the video element carries no accessible name. Screen readers skip it. If we surface a label for SEO/social context, it lives in a sibling `<span class="sr-only">` reading "Sean Winslow working at his desk with his AI companion."
- Dateline aria-live: `polite` — screen readers announce changes when the page is refreshed, not during the type-on animation (which is decorative).

---

## 13. Build stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Astro 5+ | Content-first, partial hydration, <50kb JS to first paint |
| Routing | File-based | Hero is `src/pages/index.astro` |
| Component primitives | Astro components + a few React islands | Cursor + character animation are React islands (`client:load`); everything else is static |
| Styles | Tailwind 4 + CSS custom properties for color tokens | Custom properties so section-scoped splash colors work |
| Fonts | Newsreader + JetBrains Mono via Google Fonts, self-hosted via `astro-google-fonts-optimizer` | Avoids the Google Fonts FOUC and the CSP allowlist issue |
| Animation | Native CSS + IntersectionObserver + a single RAF loop for the cursor | No GSAP, no Framer Motion, no Lenis |
| Character video | Native HTML5 `<video>` element, WebM VP9 with alpha channel (`yuva420p`) | Carries transparency over the paper bg — MP4/h.264 can't. Universal browser support at this point. |
| Dateline data | Static JSON file in `/public/api/dateline.json`, written by Daily Driver morning agent | Zero-cost edge serving from Vercel/Netlify/CF Pages |
| Hosting | Vercel (free tier) | Aligns with the About-page lineage line ("Raised by Saturday morning cartoons and Vercel deployment logs"). Also free. |
| Domain | `seanwinslow.com` | **LOCKED** 2026-05-17 per roadmap Task 1 Step 3 (Council Gap-Fill 3). Vercel-hosted; Cloudflare DNS with orange-cloud OFF for Vercel records (Vercel handles edge + SSL). |

**Anti-stack — explicitly avoid:**
- Next.js (too heavy, signals "everyone else's PM portfolio")
- GSAP / Framer Motion (mynrd doesn't use them — neither do we)
- Lenis / Locomotive smooth-scroll (custom cursor lerp creates the illusion of smoothness without taxing scroll)
- Any CMS (vault-as-CMS only — see E5 idea, future spec)

---

## 14. Out of scope for hero v1

- Live agent feed footer (E1) — **no longer a build item.** Task 11's Agent Fleet Observability Dashboard already shipped at `fleet.seanwinslow.com` (v1 code-complete 2026-05-17 evening). The portfolio footer links out to it rather than embedding a custom Cloudflare Worker reading `agent-run-history.csv`. The dateline strip in the hero remains the only inline live-data surface; everything richer lives one click away on the dashboard.
- MCP server interactive embed (E2) — separate page (`/transactions/intent-engineering-mcp`), not in the hero.
- Time-of-day auto-dark-mode (D5) — V2 enhancement. Hero v1 ships light-mode only; add a manual toggle in the footer for dark mode if needed before V2.
- Cinematic case-study scroll (V3 §9) — separate spec, doesn't touch the hero.
- The Transactions wing routing + index (V4 §11) — paused until post-employment per V4 §0 anchors.

---

## 15. Definition of Done

Hero v1 ships when:

1. The dateline reads from a real `dateline.json` written by the Daily Driver overnight (no hardcoded string).
2. The character lane plays the Sean-at-desk + AI-companion loop continuously on its ~3.9s cycle, seamless (no visible loop point), with the paper background showing through the alpha channel cleanly (no rectangular bounding box visible).
3. The painted character sits visually flush against the right viewport edge — the `right: -180px` bleed clips the source canvas's empty band correctly.
4. The custom cursor inverts over the name, the stamp, and the character lane on hover.
5. Reduced-motion gracefully collapses to a static hero — the video element is not mounted; the poster image renders in its place.
6. Name renders at the spec'd `clamp(56px, 7.2vw, 130px)` and scales correctly across viewport sizes from 375px to 2560px.
7. Mobile renders the character lane in the right margin scaled to fit, never below the tagline.
8. Lighthouse Performance ≥95, Accessibility ≥95, Best Practices = 100 on the hero alone.
9. First Contentful Paint <800ms on a Fast 3G simulation. The video loop (~378KB) and `preload="auto"` do not block the FCP budget.
10. The "AI PM who animates" recall test re-runs on the live build with 3 fresh viewers — passes again.

When all 10 are green, hero v1 is locked and we move to the projects section.

---

## Appendix A — File map

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── index.astro              ← hero lives here
│   ├── components/
│   │   ├── Hero.astro               ← composition wrapper
│   │   ├── Dateline.astro           ← reads dateline.json
│   │   ├── CharacterLane.astro      ← <video> element + poster, no JS hydration
│   │   ├── Cursor.tsx               ← React island, RAF cursor
│   │   └── TornPaperEdge.astro      ← SVG mask between sections
│   └── styles/
│       └── tokens.css               ← color custom properties, section-scoped splashes
└── public/
    ├── api/
    │   └── dateline.json            ← written by Daily Driver each morning
    └── assets/
        └── character/
            ├── hero-loop.webm       ← Sean at desk + AI companion, 3.9s, VP9 alpha, 378KB
            └── hero-loop-poster.webp ← frame 1 still, reduced-motion fallback + video poster
```

## Appendix B — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/`. Read this spec end-to-end. The `prototype/index.html` file is the visually-approved reference for proportions and behavior — match it. Scaffold an Astro 5 project with Tailwind 4. Build Hero, Dateline, TornPaperEdge, and CharacterLane as Astro components (CharacterLane is a thin wrapper around a native `<video autoplay muted loop playsinline>` — no JS hydration needed). Build Cursor as the only React island, `client:load`. There is NO badge — the contact CTA lives in the footer section, not the hero. The character WebM at `/public/assets/character/hero-loop.webm` and its WebP poster are expected to be in place. Hardcode the dateline JSON for now (`fleet_pulse` pattern, today's date, current vault indexer numbers). Implement the page-load motion timeline exactly as specified in §6 — note the character lane fades in at t=1300 and the video begins playback from frame 1 at that exact moment. Lane sizing per §3: 1024×576, `right: -180px`, `bottom: 80px` desktop. Name + tagline use the `clamp()` values from §4. Use Newsreader + JetBrains Mono from Google Fonts via `astro-google-fonts-optimizer`. Do not introduce any other dependencies. Stop when the 10 Definition-of-Done items can be ticked on a `localhost:4321` preview.

