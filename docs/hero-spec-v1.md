# Hero v1 — Build Spec

> **Status:** Locked 2026-05-13.
> **Validation:** 24-hour recall test passed — visitors recall "AI PM who animates" without studying the page.
> **Scope:** This spec governs the home-page hero only. It supersedes V4 §5 (Layout) and V4 §9 (Hero Component) for the home page. Everything else in V3/V4 still stands — color system, paper texture, fonts, accessibility.
> **Buildable as-is.** Hand to a Claude Code session with this file open.

---

## 1. The Hero, in one sentence

Newsroom dateline above an editorial headline, with a pencil-test character standing in the right margin and a rotating "get in touch" badge in the top-right.

---

## 2. Anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│  [52px gutter, 60px top padding]                                    │
│                                                                     │
│  BOSTON, MAY 13, 2026 — vault indexer wrote 47 chunks at 02:34.     │
│  ──────────────────────────────────────────────────────────────     │
│                                                                     │
│  Sean Winslow                                  ┌─────────────┐      │
│  / AI PRODUCT MANAGER                          │  ◜ get in ◝  │      │
│                                                │  touch       │      │
│                                                │  ◟          ◞ │      │
│                                                └─────────────┘      │
│                                                                     │
│                                                                     │
│  Raised by Saturday morning                       ┌──────────────┐  │
│  cartoons and Vercel deployment logs.             │              │  │
│                                                   │  pencil-test │  │
│                                                   │  character   │  │
│                                                   │  (Sean v1)   │  │
│                                                   │              │  │
│  ╲╱╲╱╲╱╲ torn-paper edge ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲    │              │  │
└─────────────────────────────────────────────────────────────────────┘
```

Five elements. No nav. No CTA besides the badge. No subtitle. The dateline is the only thing above the name; the tagline is the only thing below the role. The character is in the right margin from name baseline to the bottom of the hero. The torn-paper edge masks the seam into the projects section.

---

## 3. Vertical budget

### Desktop (≥1024px viewport, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Top padding | 60px | |
| **Dateline strip** | 24px text + 30px gap + 0.5px divider | total ~54px |
| **Name** (`Sean Winslow`) | 100px | Newsreader 85px / line-height 1.1 |
| **Role tag** | 14px text + 8px top margin | mono, uppercase |
| Gap | 80px | |
| **Tagline** | 60px | Newsreader 45px weight 300, fits on one line at 1440 |
| Bottom padding | 60px | torn-paper edge sits here |
| **Total content stack** | **~408px** | |
| Character (absolute, bottom-right) | 480px tall | floats, doesn't push content |
| Hero section height | **720px** | leaves ~310px of breathing room |

The hero is ~80vh on a 900px laptop, ~67vh on a 1080p monitor. Never 100vh — leave a visible torn-paper edge below the fold to invite the scroll.

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Dateline | Stacks: `BOSTON, MAY 13, 2026` on line 1, status on line 2. Same mono, same stamp color. |
| Name | Drops to Newsreader 48px / line-height 1.1 |
| Role tag | unchanged |
| Tagline | Drops to Newsreader 26px weight 300, wraps to 2-3 lines |
| Character | Scales to 220px tall, anchored bottom-right but vertically aligned to the tagline (not the full hero) |
| Hero height | ~640px |
| Badge | 56px instead of 142px |

The mobile rule: the character never sits *below* the tagline. If it doesn't fit in the right margin at small viewports, it drops to 70% scale and overlaps the bottom-right corner of the tagline — that's the mynrd move and it works.

---

## 4. Type system

| Role | Font | Size (D) | Size (M) | Weight | Tracking | Line-height | Color |
|---|---|---|---|---|---|---|---|
| Dateline stamp | JetBrains Mono | 12px | 11px | 500 | 1.2px | 1.4 | `#7C2D12` (transaction stamp) |
| Dateline body | JetBrains Mono | 12px | 11px | 400 | 1.2px | 1.4 | `#546E71` (secondary ink) |
| Name | Newsreader | 85px | 48px | 400 | -0.6px | 1.1 | `#0A3E42` (primary teal) |
| Role tag | JetBrains Mono | 12px | 12px | 400 | 1.4px | 1.4 | `#546E71` |
| Tagline | Newsreader | 45px | 26px | 300 | -0.3px | 1.22 | `#1A1A1E` (near-black) |
| Badge text | JetBrains Mono | 10px | 9px | 400 | 1.4px | 1.2 | `#0A3E42` |
| Frame label (footer of hero, optional) | JetBrains Mono | 10px | 10px | 400 | 1.6px | 1 | `#0A3E42` @ 0.7 opacity |

**Two fonts only.** No Inter. No Sora. Newsreader for editorial, JetBrains Mono for everything terminal/wire-service/technical. The serif-vs-mono contrast IS the duality.

**Newsreader source:** Google Fonts. Preload Newsreader 300 + 400 (Latin subset). `font-display: swap`.
**JetBrains Mono source:** Google Fonts. Preload 400 + 500.

---

## 5. Color rules (hero scope)

| Color | Hex | Used by |
|---|---|---|
| Paper | `#FFF9F0` | Hero background |
| Ink (primary) | `#1A1A1E` | Tagline |
| Teal (primary) | `#0A3E42` | Name, role, badge stroke, badge text |
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
| 1200 | Badge | Scale 0.6 → 1.0 + opacity, then rotation engages | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| 1300 | Character | Walks in from the right edge: translateX(120%) → translateX(0) + idle loop starts | `cubic-bezier(0.22, 1, 0.36, 1)` | 800ms |
| 1600 | Badge rotation | Continuous 30°/sec, infinite | linear | always-on |
| 1800 | Hero settled | All idle loops engaged | — | — |

**The opinionated bit:** the character WALKS in. Not fades, not slides — walks. Uses a 6-frame loop (right foot forward, mid-stride, left foot forward, mirror) crossfaded with the translateX. This is the highest-leverage motion moment on the page. It's the first 2 seconds that say *this is not a template*.

**Idle loop (after t=1800):** character has a 4-second breathing cycle — subtle shoulder rise, blink every 6 seconds (asymmetric — left eye half a frame later than right per the 2D animation principles). Badge rotates continuously. Dateline does NOT animate after the initial type-on (it only changes on page reload or manual refresh).

---

## 7. Character animation

**Source:** The pencil-test character at `sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png` is the **idle pose**. Generate the walk cycle and idle breathing as separate frames using the `gemini-pencil-animation-image-gen` skill, anchored to this style.

**Frames needed:**

| Set | Frame count | Use |
|---|---|---|
| Walk-in | 6 frames (3 right-step, 3 left-step) | Plays once during entrance, 800ms total |
| Idle breathing | 8 frames (shoulders up, hold, down, hold × 2) | Loops infinitely at 4s/cycle |
| Blink | 2 frames (eyes open, eyes closed) | Triggered every 6s, 100ms total, eyes asymmetric per 2d-animation-principles |

**Format:** SVG sprite sheet (preferred for line-art crispness) OR PNG sprite sheet at 2x retina. Lottie is acceptable but not required — the character is line-art with no fills, so SVG path interpolation is cheaper.

**Implementation:** CSS `steps()` timing on a `background-position` shift, or a tiny JS RAF loop swapping `<g>` visibility for SVG. No GSAP, no Lottie unless absolutely needed.

**Fallback:** If reduced-motion is on, the character renders as the idle pose only — no walk-in, no breathing, no blink.

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

The Daily Driver picks one of four patterns based on what fired the night before:

| Pattern | When it wins | Example |
|---|---|---|
| `fleet_pulse` | Default — vault/synth/lint activity to report | *vault indexer wrote 47 chunks at 02:34. fleet green. 7 of 9 agents on.* |
| `ship_log` | Something actually shipped in the last 24h (git tag, deploy, MCP release) | *synthesizer retrofit tier 1 shipped. 62 tests pass.* |
| `reading_log` | Quiet day, Sean explicitly logs what he's reading | *currently reading: ob1 typed reasoning edges spec.* |
| `now_line` | Job-hunt milestone day | *wk 2 of 8. 3 phone screens booked.* |

One pattern per day. Never mix. The Daily Driver chooses; the page renders.

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
| Badge | Scales to 80px circle + small "mailto" hint | Click → opens default mail client |
| Character | Cursor becomes a tiny pencil icon | Easter egg — no click action |
| Empty paper | Default 6px dot | |

**Mobile:** No custom cursor (touch devices). All hover states fall back to default touch affordances. The badge stays tappable; the rest is static.

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
- Focus indicators: 2px dashed outline at 6px offset, color `#0A3E42`. Applies to the badge (the only focusable element in the hero) and any keyboard nav.
- `prefers-reduced-motion: reduce` — all animations collapse to opacity 0 → 1 fade over 200ms. No translateY, no scale, no type-on, no walk-in, no rotation, no custom cursor. Character renders as idle pose, badge renders without rotation.
- Keyboard order: name (focusable for screen readers only) → role → tagline → badge.
- Screen reader label for the character SVG: `<title>Sean, standing, holding a pencil.</title>`
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
| Dateline data | Static JSON file in `/public/api/dateline.json`, written by Daily Driver morning agent | Zero-cost edge serving from Vercel/Netlify/CF Pages |
| Hosting | Vercel (free tier) | Aligns with the "Vercel deployment logs" tagline. Also free. |
| Domain | `seanwinslow.com` or `seanwinslow.studio` | TBD |

**Anti-stack — explicitly avoid:**
- Next.js (too heavy, signals "everyone else's PM portfolio")
- GSAP / Framer Motion (mynrd doesn't use them — neither do we)
- Lenis / Locomotive smooth-scroll (custom cursor lerp creates the illusion of smoothness without taxing scroll)
- Any CMS (vault-as-CMS only — see E5 idea, future spec)

---

## 14. Out of scope for hero v1

- Live agent feed footer (E1) — separate component, lives below the projects section. V1 hero ships with just the dateline pulling from the same data source.
- MCP server interactive embed (E2) — separate page (`/transactions/intent-engineering-mcp`), not in the hero.
- Time-of-day auto-dark-mode (D5) — V2 enhancement. Hero v1 ships light-mode only; add a manual toggle in the footer for dark mode if needed before V2.
- Cinematic case-study scroll (V3 §9) — separate spec, doesn't touch the hero.
- The Transactions wing routing + index (V4 §11) — paused until post-employment per V4 §0 anchors.

---

## 15. Definition of Done

Hero v1 ships when:

1. The dateline reads from a real `dateline.json` written by the Daily Driver overnight (no hardcoded string).
2. The character walks in once on page load and runs the idle breathing loop indefinitely.
3. The custom cursor inverts over the name, the stamp, and the character on hover.
4. Reduced-motion gracefully collapses to a static hero with no entrance animation.
5. Mobile renders without the character below the tagline (always in the right margin, scaled).
6. Lighthouse Performance ≥95, Accessibility ≥95, Best Practices = 100 on the hero alone.
7. First Contentful Paint <800ms on a Fast 3G simulation.
8. The "AI PM who animates" recall test re-runs on the live build with 3 fresh viewers — passes again.

When all 8 are green, hero v1 is locked and we move to the projects section.

---

## Appendix A — File map

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── index.astro           ← hero lives here
│   ├── components/
│   │   ├── Hero.astro            ← composition wrapper
│   │   ├── Dateline.astro        ← reads dateline.json
│   │   ├── Character.tsx         ← React island, walk + idle + blink
│   │   ├── Badge.astro           ← rotating "get in touch"
│   │   ├── Cursor.tsx            ← React island, RAF cursor
│   │   └── TornPaperEdge.astro   ← SVG mask between sections
│   ├── styles/
│   │   └── tokens.css            ← color custom properties, section-scoped splashes
│   └── assets/
│       └── character/
│           ├── walk-cycle.svg    ← 6-frame sprite
│           ├── idle.svg          ← 8-frame breathing
│           └── blink.svg         ← 2-frame
└── public/
    └── api/
        └── dateline.json         ← written by Daily Driver each morning
```

## Appendix B — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/`. Read this spec end-to-end. Scaffold an Astro 5 project with Tailwind 4. Build the Hero, Dateline, Badge, and TornPaperEdge components as Astro components. Build Character and Cursor as React islands with `client:load`. Hardcode the dateline JSON for now (`fleet_pulse` pattern, today's date, current vault indexer numbers). Implement the page-load motion timeline exactly as specified in §6. Use Newsreader + JetBrains Mono from Google Fonts via `astro-google-fonts-optimizer`. Do not introduce any other dependencies. Stop when the 8 Definition-of-Done items can be ticked on a `localhost:4321` preview.

