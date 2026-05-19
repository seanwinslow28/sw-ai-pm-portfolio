# Projects Section v1 — Build Spec

> **Status:** Locked 2026-05-13.
> **Scope:** The home-page projects section + the routing contract for `/work/<slug>` pages. Inherits all foundations from `hero-spec-v1.md` (color, type, motion, cursor, character).
> **The case-study page detail** (what lives inside `/work/<slug>`) is intentionally a separate spec — written after this one. This file ends at the click.
> **Buildable as-is.** Hand to a Claude Code session with this file + `hero-spec-v1.md` open.

---

## 1. The Section, in one sentence

A 6-cell grid of project tiles on a full-bleed deep-teal splash, framed by torn-paper edges, with a wire-service dateline label in the corner and the sixth cell reserved as a "next in production" placeholder that signals the portfolio is live.

---

## 2. Anatomy

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  WORK · 5 PIECES · UPDATED 2026-05-13                                │
│  ←── pencil arrow ── updated weekly                                  │
│                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│   │              │  │              │  │              │               │
│   │   animation  │  │   superuser  │  │     mcp      │               │
│   │   pipeline   │  │     pack     │  │              │               │
│   │              │  │              │  │              │               │
│   │              │  │              │  │  ◜ coming    │               │
│   │              │  │              │  │   may 25 ◞   │               │
│   ├──────────────┤  ├──────────────┤  ├──────────────┤               │
│   │ A-1 ACTIVE   │  │ A-2 ACTIVE   │  │ A-3 COMING   │               │
│   │ 2D Animation │  │ Claude Code  │  │ Intent       │               │
│   │ Pipeline     │  │ Superuser    │  │ Engineering  │               │
│   │ animation·   │  │ Pack         │  │ MCP          │               │
│   │ agentic      │  │ agents·mcp   │  │ mcp·ai-pm    │               │
│   └──────────────┘  └──────────────┘  └──────────────┘               │
│                                                                      │
│   ┌──────────────┐  ┌──────────────┐  ┌╴╴╴╴╴╴╴╴╴╴╴╴╴╴┐               │
│   │              │  │              │  ╎              ╎               │
│   │  the block   │  │   16bitfit   │  ╎  next piece  ╎               │
│   │              │  │              │  ╎      in      ╎               │
│   │              │  │              │  ╎  production  ╎               │
│   │              │  │              │  ╎              ╎               │
│   ├──────────────┤  ├──────────────┤  ╎  check back  ╎               │
│   │ A-4 ARCHIVED │  │ A-5 PAUSED   │  ╎    ~jun 11   ╎               │
│   │ The Block —  │  │ 16BitFit     │  ╎              ╎               │
│   │ Campus +     │  │ Battle Mode  │  ╎ next-piece   ╎               │
│   │ RevOps       │  │ game·agent·  │  ╎ tile (torn   ╎               │
│   │ pm·b2b·crypto│  │ phaser       │  ╎  paper edges)╎               │
│   └──────────────┘  └──────────────┘  └╴╴╴╴╴╴╴╴╴╴╴╴╴╴┘               │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom) ╲╱╲╱╲╱╲╱╲
```

Six tiles. Five are projects, the sixth is the "next in production" card. The dateline label lives top-left of the section, in the same mono voice as the hero. Torn-paper edges top and bottom seam the section into the page.

---

## 3. The 5 Project Tiles

| Frame | Project | Status | Title | Tags | Slug |
|---|---|---|---|---|---|
| **A-1** | 2D Animation Pipeline | `ACTIVE` | 2D Animation Pipeline | animation · agentic · pipeline | `/work/animation-pipeline` |
| **A-2** | Claude Code Superuser Pack | `ACTIVE` | Claude Code Superuser Pack | agents · mcp · ai-pm | `/work/superuser-pack` |
| **A-3** | Intent Engineering MCP | `SHIPPED` | Intent Engineering MCP | mcp · ai-pm · infrastructure | `/work/intent-engineering-mcp` |
| **A-4** | The Block — Campus + RevOps | `ARCHIVED` | The Block — Campus + RevOps | pm · b2b · crypto | `/work/the-block` |
| **A-5** | 16BitFit Battle Mode | `PAUSED` | 16BitFit Battle Mode | game · agentic · phaser | `/work/16bitfit` |

> **A-3 status amended 2026-05-17:** Originally locked as `COMING` (anticipating the 2026-05-25 launch). Shipped 13 days early on 2026-05-12 — `@swins/intent-engineering-mcp@0.1.0` live on npm; `com.seanwinslow/intent-engineering@0.1.0` live on the MCP registry via DNS-verified domain namespace. Status flipped to `SHIPPED` accordingly.

### 3.1 Project taglines

Each tile may carry an **optional tagline** — one short line rendered below the tile title in the metadata strip (JetBrains Mono 12px weight 400, secondary ink `#546E71`, single line, no wrap). The same string also functions as the case-study page hero subtitle, sharing a `view-transition-name` with the tile so the line doesn't rewrite mid-transition. Taglines are project-tile voice — they drop the "Product Manager who" subject because the tile is *about* a project, not *about* a person.

| Frame | Tagline | Status |
|---|---|---|
| A-1 | (open — write during case-study draft) | OPEN |
| A-2 | (open — write during case-study draft) | OPEN |
| **A-3** | *"Drawing up agents to act with intent."* | **LOCKED 2026-05-18** |
| A-4 | (open — write during case-study draft) | OPEN |
| A-5 | (open — write during case-study draft) | OPEN |

**A-3 rationale:** The verb "drawing up" threads two domains in two words — *drawing* (the animator's hand) and *drafting up plans* (the PM's spec hand). The phrase "act with intent" is the philosophical core of the Intent Engineering MCP server. The line is a project teaser that doubles as the project thesis. Locked in PMP §4. Same string lives on the case-study page hero per §11.

**Implementation:** The MDX frontmatter `tagline:` field is optional (see Appendix B). When present, the tile metadata strip renders it as an additional line below the title; when absent, the strip renders title + tags only (the v1 behavior for A-1, A-2, A-4, A-5 until their case-study drafts land taglines).

### Status labels — single-word, mono, uppercase

| Status | Color | Meaning |
|---|---|---|
| `ACTIVE` | `#7C2D12` (stamp amber) | Currently shipping / in motion this week |
| `COMING` | `#7C2D12` (stamp amber) with subtle pulse | Has a public launch date, not yet live |
| `PAUSED` | `#546E71` (secondary ink) | Real but on hold; explicit return condition documented |
| `ARCHIVED` | `#546E71` (secondary ink) | Closed chapter, reference-only |
| `SHIPPED` | `#0F6E56` (deep teal, success-leaning) | One-time launches that landed, reserved for case studies of finished work |

Five statuses. No others. The status is the second-strongest signal on the tile after the media — visitors triage projects by it.

### Tile media

| Tile | Default media | If media not ready |
|---|---|---|
| A-1 (animation) | Looping video of a pencil-test frame from the in-progress short (muted, autoplay, playsinline, loop) | A still frame with the animator's character mid-walk |
| A-2 (superuser pack) | Looping video of an agent fleet event firing in the terminal | Architecture diagram (the 3-domain map) |
| A-3 (mcp) | 90-sec Loom poster frame (terminal showing `npm install @swins/intent-engineering-mcp` resolving + Claude Desktop loading the server) | npm registry screenshot OR a still of the MCP protocol diagram with a `SHIPPED 2026-05-12` stamp overlay |
| A-4 (the block) | Static product screenshot — Campus or RevOps surface, sanitized | A Jira board excerpt or roadmap snippet |
| A-5 (16bitfit) | Looping gameplay GIF / video — battle mode sprite collision | Sprite sheet image |

All media: object-fit cover. Tile is 400×500px (4:5 portrait). Videos are <2MB encoded, looped, no audio, autoplay-friendly.

---

## 4. The Sixth Tile — "Next in Production"

```
╎                          ╎
╎    next piece            ╎
╎    in production         ╎
╎                          ╎
╎    check back            ╎
╎    ~jun 11               ╎
╎                          ╎
```

| Element | Spec |
|---|---|
| Background | `transparent` on the teal splash — no fill |
| Border | 1.5px dashed `rgba(255, 249, 240, 0.4)` (paper at 40%, dashed) |
| Border-radius | 0 (sharp corners like the other tiles) |
| Title | "next piece in production" — Newsreader 24px / weight 300 / line-height 1.2 / paper-color (#FFF9F0) |
| Subtitle | "check back ~jun 11" — JetBrains Mono 12px / 1.4px tracking / stamp amber |
| Date target | Pulls from a static `next-piece.json` at `/public/api/next-piece.json`. **Pick rule:** earliest-upcoming-ship-date wins. The Daily Driver writes the file alongside `dateline.json`, reading from the roadmap's anchor list. As of 2026-05-17 the queue is: Vault Scorecard 6/3 → Judge Layer 6/4 → vault-knowledge-mcp ~6/4 → Control Architecture 6/10 → Animation Pipeline short 6/11. The card always surfaces whichever ship is closest; the JSON shape stays stable as ships happen and the queue rotates. |
| Hover | The dashed border fills in solid + cursor shows a calendar icon, no click action |
| Position | Bottom-right of the 6-cell grid (always the last cell at desktop; on mobile, always last in DOM order) |

The card's job is to say: *the portfolio is alive, the work continues, here's when to look again*. It's the inverse of a stale-portfolio signal. It updates automatically as the next deadline approaches.

---

## 5. Vertical budget

### Desktop (≥1024px, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | 32px | overlaps the hero's bottom edge by 16px |
| Top padding | 80px | |
| Dateline label | 24px + 16px margin | mono, top-left |
| Pencil arrow annotation | overlaps the dateline | absolute-positioned SVG |
| Tile grid | 2 rows × 500px tiles + 60px row gap = 1060px | |
| Bottom padding | 80px | |
| Torn-paper bottom edge | 32px | overlaps the next section by 16px |
| **Section height** | **~1316px** | |

The grid: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px column / 60px row;`. Tile aspect ratio is locked 4:5. Maximum tile width at 1440 viewport is ~440px.

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Grid | Drops to `repeat(1, 1fr)` (single column) below 640px; `repeat(2, 1fr)` between 640-1024px |
| Tile aspect ratio | Shifts from 4:5 to 4:3 on single-column (more landscape, better for thumb scroll) |
| Tile media | Stays object-fit cover; videos still autoplay |
| Row gap | 40px (tighter than desktop) |
| Dateline label | Wraps to two lines: `WORK · 5 PIECES` on line 1, `UPDATED 2026-05-13` on line 2 |
| Pencil arrow annotation | Hidden — margin annotations don't render below 768px (their geometry breaks) |
| Next-in-production tile | Always last, full-width on single-column |
| **Section height** | varies; ~1800-2400px on mobile depending on tile count and viewport |

---

## 6. Splash color treatment

**The whole section is a single flat teal block.** No gradients, no patterns, no noise.

| Token | Value | Used by |
|---|---|---|
| Splash | `#0A3E42` (primary teal, locked) | Section background, full-bleed |
| Tile border (default) | `rgba(255, 249, 240, 0.08)` | 0.5px, barely visible |
| Tile border (hover) | `rgba(255, 249, 240, 0.25)` | 0.5px, 200ms ease |
| Tile metadata strip background | `rgba(0, 0, 0, 0.15)` | Sits at the bottom 25% of each tile, multiplied over the media |
| Tile title | `#FFF9F0` (paper) | Newsreader 20px / weight 400 |
| Tile tags | `rgba(255, 249, 240, 0.65)` | JetBrains Mono 11px / 1.2px tracking |
| Frame number | `#FAC775` (amber, mid-stop) | JetBrains Mono 11px / 1.4px tracking, top-left of metadata strip |
| Status badge | varies (see §3) | top-right of metadata strip |

The teal is **flat**. The only chromatic variety comes from the tile media itself (videos, screenshots) and the amber frame numbers. Resist the urge to add a teal gradient or a noise texture — flatness IS the splash discipline.

---

## 7. Torn-paper transitions

Two SVG mask edges per section.

### Top edge (hero → projects)

A single PNG or inline SVG, 1440×32px, irregular jagged tear. Positioned at the **top of the projects section**, full-bleed, with the cream paper color filling the tear's top half and teal filling the bottom. Negative-margin pulls it up to overlap the hero's bottom by 16px so the seam looks like one continuous torn page.

### Bottom edge (projects → about)

Same SVG flipped vertically. Teal on top, cream on bottom. Overlaps the next section by 16px.

### Asset source

Reuse the same tear-edge PNG asset across both seams (rotated/flipped per use). One asset, two appearances. Saves load time and gives the page a consistent material language.

If we want to be fancy: replace with an inline SVG `<path>` so the tear is a vector and scales perfectly. Path style: `d="M0,16 Q40,4 80,10 T160,12 T240,6 T320,18 T400,8 T480,14 T560,10 T640,16 L1440,16 L1440,32 L0,32 Z"` — the same shape we used in the mockup widget, scaled to 1440 viewBox.

---

## 8. Hover behavior — tile + custom cursor

When the cursor enters a tile (desktop only):

| Element | Transition | Duration | Easing |
|---|---|---|---|
| Tile media | `scale(1.03)` | 220ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Tile border | opacity 0.08 → 0.25 | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Metadata strip | translateY(0) — no change; it's always visible | — | — |
| **Custom cursor** | Default 6px dot → expands to a 220×280px floating preview image of the tile media, positioned ~40px down-right of the cursor | 280ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

The custom cursor preview is the mynrd-derived move from `hero-spec-v1.md` §9. On the projects section, it actually fires — each tile has a `data-cursor-preview="<image-url>"` attribute and the cursor swaps in that image when hovered.

**Why 220ms / scale(1.03):** UI hover stays under 300ms per Emil's frequency framework. The lower 1.03 scale keeps the image from jumping under the cursor at the moment recruiters are scanning tiles.

**On click:** Navigate to `/work/<slug>` via Astro's `<a>` element with View Transitions enabled. The tile media element shares a `view-transition-name` with the hero media on the case-study page, so the transition feels like the tile expanding into the page.

---

## 9. Pencil margin annotations (D3) — first appearance on the site

Three annotations live in this section, all hand-drawn-feeling SVGs:

| # | Annotation | Position | Animation |
|---|---|---|---|
| 1 | **Curved arrow with "updated weekly"** — points at the `UPDATED 2026-05-13` dateline label | Just below the dateline label, ~20px right of "UPDATED" | Fades in 800ms after the section enters viewport. Static thereafter (no idle bob — decorative SVG ambient motion falls into Emil's "looks cool, will see it 1000+ times" zone). |
| 2 | **"rev 3" scribble** — small hand-drawn note tucked at the top-right corner of the A-1 tile (most recently iterated project) | Absolute, top-right of tile A-1, offset -8px / -8px | Fades in with the tile; no idle animation |
| 3 | **Registration mark** (a "+" cross with two perpendicular tick marks) | Bottom-right corner of the section grid, ~20px below the last tile, ~20px from the right edge | Fades in with the section; static after |

All three: stroke `#FFF9F0` (paper color) at 50% opacity, 1.2px stroke weight, no fill. Reads as pencil-on-paper sketches that floated onto the teal page.

These annotations are the **first appearance of D3 on the site.** The hero stays clean; the projects section is where the pencil-margin language is introduced. The pattern then propagates to About and the case-study pages.

**Mobile:** Annotations don't render below 768px. The grid is already tight; the annotations would crowd it.

---

## 10. Click-through contract — `/work/<slug>`

The tile → page transition is the most editorially important moment on the site. Spec the contract here so the case-study spec inherits it cleanly.

### Route shape

`/work/<slug>` where `<slug>` is the kebab-case slug from §3.

### Astro implementation

- File: `src/pages/work/[slug].astro` (dynamic route)
- Content source: `src/content/work/<slug>.mdx` (Astro content collection)
- Each MDX file exports frontmatter matching the tile data shape (title, status, tags, frame, hero-media, slug)
- The home-page projects grid reads from the same content collection — single source of truth

### View Transitions

- The tile's `<img>` / `<video>` element has `view-transition-name: hero-media-<slug>`
- The case-study page's hero media element has the same `view-transition-name`
- On click, the browser cross-fades and morphs between the two — the tile feels like it expands into the full page
- Astro 5's built-in `<ClientRouter />` handles the transition declaratively
- **object-fit must match at both endpoints.** Tile `<img>`/`<video>` and case-study hero media both render with `object-fit: cover` and `object-position: center`. A `cover`/`contain` mismatch makes the cross-fade snap mid-transition (the morphed element resizes between the two `object-fit` rules). Lock both ends to `cover`. The case-study hero's full-bleed framing is achieved by making the *container* full-bleed; the inner media still covers, never contains.

### Browser fallback

Browsers without View Transitions API (Firefox <128, older Safari) get an instant navigation with no animation. Still functional. Not a degraded experience — just a less cinematic one.

---

## 11. Case-study page — high-level shape (spec'd in detail separately)

A `/work/<slug>` page renders, top-to-bottom:

1. **Dateline strip** — same component as the hero, but project-specific. Pattern: `BOSTON, MAY 13, 2026 — animation pipeline, rev 3. last frame rendered 14 hours ago.`
2. **Hero media** — full-bleed, the same media as the tile (transitioned in via View Transitions)
3. **Title block** — frame number + status + project title (Newsreader 64px) + tags
4. **The investigation board** — scrollable thread of artifacts (the P4 idea from the brainstorm). Jira tickets, PRD diffs, anonymized Slack DMs, retro docs, metric charts. Each artifact is an MDX component embedded inline.
5. **Methods strip** — from V4 §7.4. Mono mini-table of agents/tools used to produce or ship this work.
6. **4Q block** — What is this? / Why this approach? / What would break? / What did I learn? (V4 §7.3)
7. **Next/Prev project nav** — at the bottom, links to the adjacent project in the grid order

This shape gets its own spec doc (`case-study-spec-v1.md`) before the build session. This file only spec'd the contract that gets the visitor there.

---

## 12. Accessibility + reduced motion

- All tile content (title, status, tags) is real text, not background-image-baked. Screen readers can parse it.
- Each tile is wrapped in a single `<a>` element with `aria-label="View case study: <title>"`. Status, tags, and frame number are visible to sighted users; the aria-label gives screen readers the focused content first.
- Status colors meet WCAG AA contrast against the teal:
  - Stamp amber `#7C2D12` on teal — 5.4:1 (passes AA for large text, fails AA for small) → use only at 12px+ at weight 500 to clear the threshold
  - Paper `#FFF9F0` on teal — 11.8:1 (passes AAA)
  - Amber mid-stop `#FAC775` on teal — 8.2:1 (passes AAA)
- Focus indicators: 2px solid `#FAC775` (amber) at 4px offset on focused tiles. Visible against teal.
- Keyboard order: dateline → annotation alt-text (skipped for decorative annotations with `aria-hidden="true"`) → tile A-1 → A-2 → A-3 → A-4 → A-5 → next-in-production card.
- `prefers-reduced-motion: reduce`:
  - Tile media: videos pause and show first frame as static image
  - Hover scale on tiles: disabled (no `scale(1.04)`)
  - Custom cursor preview: disabled, default cursor restored
  - Annotation bob: disabled (annotations render in final position, no idle animation)
  - View Transition on click: disabled, instant navigation
  - All other styling preserved

---

## 13. Definition of Done

Projects section v1 ships when:

1. The grid renders 6 cells: 5 project tiles + 1 next-in-production card.
2. All 5 tile media assets are present and looping (videos) or static (images) per §3.
3. Status labels render with correct colors and pass WCAG AA contrast against the teal.
4. The dateline label reads from the same data shape as the hero dateline (count + updated date).
5. Hover on any tile triggers the media scale and the custom cursor preview swap.
6. Click on any tile navigates to `/work/<slug>` with a View Transition (or instant fallback on unsupported browsers).
7. Three pencil annotations (curved arrow, rev 3 scribble, registration mark) render on desktop and are hidden on mobile.
8. Mobile (375px viewport) renders a single-column grid with all 6 cells visible and tappable.
9. Reduced-motion gracefully collapses all animations per §12.
10. The next-in-production card pulls the next anchor date from a real data source (not hardcoded).

When all 10 are green, projects v1 is locked and we move to the About page.

---

## 14. Out of scope for v1

- The case-study page body (`/work/<slug>` contents). Spec'd separately.
- Tile filtering / tag-based browsing. V1 ships with no filter UI — the 5 tiles fit on one screen at desktop, no filtering needed yet.
- Pagination. Not needed at 5 projects.
- A separate `/work` index page. The home page's projects section IS the index for v1. A dedicated `/work` route can come in v2 if the project count grows past ~8.
- **Note on the broader artifact catalog:** the 5 case-study tiles are deliberately *not* the full artifact list. As of 2026-05-17 the roadmap has 9+ flagship + 3 supporting artifacts; only the 5 that warrant a narrative deep-dive get tiles here. Everything else lives on the new `/transactions/` ledger route (specced separately in PMP §7) — the reverse-chronological table over all `EXPLANATION.md` files. The projects section is the curated five; `/transactions/` is the comprehensive ledger. Both surfaces feed off the same MDX content collection.
- Project-level analytics (per-tile click tracking). Add post-launch with a single Plausible event.
- Comments / reactions on projects. Not needed — this is a portfolio, not a blog.

---

## Appendix A — File map (additions to hero spec's file map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   ├── index.astro              ← hero + projects section live here
│   │   └── work/
│   │       └── [slug].astro         ← dynamic route for case studies
│   ├── components/
│   │   ├── ProjectsSection.astro    ← composition wrapper for the grid
│   │   ├── ProjectTile.astro        ← single tile + metadata strip
│   │   ├── NextInProduction.astro   ← the dashed 6th cell
│   │   ├── DatelineLabel.astro      ← reused mono dateline (different content than hero)
│   │   └── PencilAnnotation.astro   ← takes a path + position + label, renders SVG
│   ├── content/
│   │   └── work/
│   │       ├── animation-pipeline.mdx
│   │       ├── superuser-pack.mdx
│   │       ├── intent-engineering-mcp.mdx
│   │       ├── the-block.mdx
│   │       └── 16bitfit.mdx
│   ├── styles/
│   │   └── projects.css             ← grid + section-scoped teal splash custom property
│   └── assets/
│       ├── projects/
│       │   ├── animation-pipeline.mp4
│       │   ├── superuser-pack.mp4
│       │   ├── intent-engineering-mcp.png  (with "coming may 25" stamp)
│       │   ├── the-block.png
│       │   └── 16bitfit.gif
│       └── annotations/
│           ├── updated-weekly-arrow.svg
│           ├── rev-3-scribble.svg
│           └── registration-mark.svg
└── public/
    └── api/
        ├── dateline.json            ← from hero spec
        └── next-piece.json          ← NEW: { "title": "...", "date_target": "2026-06-11" }
```

## Appendix B — MDX frontmatter shape

Every `src/content/work/<slug>.mdx` opens with frontmatter matching this shape:

```yaml
---
slug: animation-pipeline
frame: A-1
title: 2D Animation Pipeline
tagline:                  # optional, see §3.1; when present, rendered below the title on the tile + as case-study hero subtitle
status: ACTIVE           # ACTIVE | COMING | PAUSED | ARCHIVED | SHIPPED
tags:
  - animation
  - agentic
  - pipeline
hero_media: /assets/projects/animation-pipeline.mp4
hero_media_type: video   # video | image
hero_media_alt: A pencil-test frame from Sean's portfolio short, mid-walk.
order: 1                 # display order in the grid (1-5)
date_started: 2026-03-15
date_active_through: 2026-06-11
case_study_dateline_pattern: ship_log  # which dateline pattern this page uses
---
```

The home-page projects grid does a single Astro content collection query, sorts by `order`, and renders. The same frontmatter feeds the case-study page header. Single source of truth.

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md` and `projects-section-spec-v1.md` end-to-end. The hero is presumed built per its own spec. Build the projects section components per the file map in Appendix A. Create the 5 MDX content files in `src/content/work/` with placeholder body content (just the frontmatter is enough for v1 of the projects section — bodies get filled in for the case-study spec). Wire `/work/[slug].astro` as a dynamic route reading from the content collection. Implement the View Transition by adding `view-transition-name` to both the tile media and the case-study hero media. Use real media assets if available; placeholder colored rectangles otherwise. Stop when the 10 Definition-of-Done items can be ticked on a `localhost:4321` preview.

