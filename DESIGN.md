---
name: SW Portfolio
description: An animator's pencil test, mounted in a Vercel-grade frame.
colors:
  teal-chrome: "#0A3E42"
  teal-chrome-deep: "#0c2d2f"
  paper-cream: "#FFF9F0"
  ink-primary: "#1A1A1E"
  ink-secondary: "#546E71"
  success-teal: "#0F6E56"
  stamp-amber: "#7C2D12"
  amber-mid: "#FAC775"
  amber-warm: "#E89060"
  border-whisper-paper: "#0a3e4226"
  border-whisper-chrome: "#fff9f02e"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(56px, 7.2vw, 130px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.8px"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(26px, 3.2vw, 56px)"
    fontWeight: 300
    lineHeight: 1.22
    letterSpacing: "-0.3px"
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.2px"
  body:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "20px"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "-0.1px"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "1.2px"
  dateline:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "1.2px"
  annotation:
    fontFamily: "Caveat, cursive"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  sharp: "0px"
  pill: "2px"
  soft: "4px"
spacing:
  hairline: "4px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "60px"
  xxl: "80px"
components:
  tile-project:
    backgroundColor: "{colors.teal-chrome}"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.sharp}"
    padding: "0px"
    width: "400px"
    height: "500px"
  tile-next-in-production:
    backgroundColor: "{colors.teal-chrome}"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.sharp}"
    padding: "32px"
  pill-status-active:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.stamp-amber}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  pill-status-shipped:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.success-teal}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  pill-status-paused:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  pill-status-archived:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  nav-tab:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "56px"
  nav-tab-active:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.teal-chrome}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0 16px"
    height: "56px"
  footer-link:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.teal-chrome}"
    typography: "{typography.label}"
    rounded: "{rounded.sharp}"
    padding: "0px"
  dateline-stamp:
    backgroundColor: "{colors.paper-cream}"
    textColor: "{colors.stamp-amber}"
    typography: "{typography.dateline}"
    rounded: "{rounded.sharp}"
    padding: "0px"
---

# Design System: SW Portfolio

## 1. Overview

**Creative North Star: "An animator's pencil test, mounted in a Vercel-grade frame."**

The system is a three-layer physical model — a Committed deep-teal chrome carrying the page like a book cover, cream paper sheets sitting on the chrome like pages in that book, and editorial content + hand-authored artifacts living on the paper. Torn-paper PNG edges with real fluff reveal the chrome at every paper-to-paper seam. The chrome reads as architecture (Vercel restraint, mono labels, flat surfaces, sharp corners). The paper reads as handmade (warm cream `#FFF9F0`, fiber texture, the illustrated pencil-test character, comedic-editorial Newsreader serif). Both layers are non-negotiable: drop the chrome and the portfolio becomes a hobby blog; drop the paper and it becomes a design-system viewer.

Color strategy is **Committed** — `#0A3E42` teal carries 30–60% of the visible surface as the persistent chrome at Z=0. The paper sheets sit on top at Z=10. Each section earns at most *one* full-bleed splash-color block, never two. The hero is the calm exception (paper-on-chrome, zero splash); the projects section is the first chromatic moment (the teal chrome reveals itself as a full splash through the torn-paper edges).

This system explicitly rejects the design-system-viewer template (V3 "Iterative Blueprint" mockups: four colors at once, three fonts, no opinion), the luxury-minimal-PM template ("VISION MEETS VELOCITY" headlines, abstract gradients, glassmorphism heroes), the generic AI-PM aesthetic (dark navy + electric gradient + glass cards), and the hero-metric template (big number, small label, supporting stats). Every visual decision exists to make recruiters *believe the positioning*, not to demonstrate craft for its own sake.

**Key Characteristics:**
- Two layers, always: teal chrome (Z=0) + cream paper (Z=10). Never one without the other.
- Two fonts only: Newsreader (editorial) + JetBrains Mono (wire-service). No Inter. No Sora.
- Sharp corners by default. Radius is `0px` for tiles, sections, page edges. Status pills are `2px` and *only* because they're sub-glyph affordances.
- Flat by default. No shadows on chrome, no glass, no gradient borders. Depth comes from torn-paper PNG edges and z-stacking, never from `box-shadow` decoration.
- One splash color per section. Never two.
- The hand-drawn character anchors every key surface. Lose the character, lose the system.
- Every dated string on the site is *real and dated* — never streaming, never invented.
- **Light mode only.** Dark mode was tried (Phase 3 prototypes) and killed in Phase 3e (CHANGELOG 2026-05-22). The warm-cream paper texture, the hand-drawn character lane, and the torn-paper edges all read awful against an inverted ink/cream palette. There is no `data-theme="dark"` override, no `ThemeToggle` component, no `prefers-color-scheme` auto-switch. The system ships one register: cream paper, ink type, teal chrome. Auto-switch and a manual toggle were both deferred indefinitely.

## 2. Colors: The Pencil-Test-on-Paper Palette

Tinted neutrals built around a deep teal anchor with two earned warm accents and one success-coded green. The palette is Committed, not Restrained: the teal carries the chrome at 30–60% of the visible page surface, not as a 10% accent.

### Primary
- **Deep Teal Chrome** (`#0A3E42`, oklch(31.6% 0.043 197)): The book-cover color. Lives on the persistent chrome backdrop at Z=0, the hero name, every editorial heading on paper, all "primary ink" mono labels. Carries 30–60% of any given screen. The site's structural color — not an accent.
- **Deep Teal Chrome (deep)** (`#0c2d2f`): One step darker; used only for chrome-on-chrome inversion moments (footer hover backgrounds, deepest contrast pairs). Not for type.

### Secondary
- **Stamp Amber** (`#7C2D12`, oklch(36.8% 0.13 35)): The transaction stamp. Dateline prefix (`BOSTON, MAY 13, 2026 —`), `ACTIVE` and `COMING` status pills, footer column headers, the active-nav-tab underline, skip-link background. Earned scarcity — appears once per surface, never as decoration. *Not* a warning color, not a CTA color; it's the wire-service register's accent.
- **Amber Mid-Stop** (`#FAC775`, oklch(85.1% 0.124 75)): The chrome-side accent. Used *only* on chrome surfaces (Z=0), where the primary teal is the bg and amber needs to read warm against it. Frame numbers (`A-1`, `A-2`) on project tiles. Highlights inside the universal footer. Never used on paper — on paper, stamp amber `#7C2D12` is the only warm.
- **Amber Warm** (`#E89060`): One transitional warm between stamp amber and amber mid-stop. Used sparingly for hover states on chrome where stamp amber would feel too dark and amber mid-stop too pale.

### Tertiary
- **Success Teal** (`#0F6E56`, oklch(45.8% 0.078 170)): The `SHIPPED` status color on paper. Distinct hue from the primary teal — slightly cooler, more green-leaning, so a recruiter scanning project status pills can read "shipped" as different from "active" at a glance without thinking about it. Contrast on paper = 7.1:1 (AAA at 14px+).

### Neutral
- **Paper Cream** (`#FFF9F0`, oklch(98.3% 0.008 80)): The page surface color. Lives on every page sheet at Z=10, underneath the construction-paper texture PNG. Also the nav and footer background — the chrome is teal but the nav/footer are paper sheets sitting on the chrome.
- **Ink Primary** (`#1A1A1E`, oklch(20.6% 0.005 280)): The default text color on paper. Tagline body, About prose, case-study narrative, essay body. Tinted slightly cool to harmonize with the teal rather than read pure-black against the warm cream.
- **Ink Secondary** (`#546E71`, oklch(48.4% 0.020 200)): The mono secondary on paper. Inactive nav tabs, dateline body (after the stamp prefix), project tags, copyright, role tags. Tinted toward teal — same hue family, lower saturation, lower lightness.
- **Border Whisper (on paper)** (`rgba(10, 62, 66, 0.15)`): 0.5px hairline dividers on paper surfaces. Dateline rule, nav bottom border, footer top border. Always 0.5px (sub-pixel), never thicker.
- **Border Whisper (on chrome)** (`rgba(255, 249, 240, 0.18)`): 0.5px hairline dividers on chrome surfaces. Tile borders default at `0.08` alpha and lift to `0.25` on hover.

### Named Rules
**The Committed-Teal Rule.** The teal carries the chrome at 30–60% of any given screen. Anyone who collapses this back to "10% accent" is rebuilding the Restrained palette and producing the luxury-minimal-PM template. The chrome IS the book cover.

**The One Splash Rule.** Each section earns at most *one* full-bleed splash-color block, never two. The hero has zero splash (paper-on-chrome). The projects section earns the teal splash (the chrome reveals through torn edges). A future section can earn an amber splash, but the same page cannot earn both a teal splash and an amber splash.

**The Paper-vs-Chrome Inversion Rule.** Type and accent colors *invert* between the two layers. On paper: ink `#1A1A1E` text, teal `#0A3E42` accent. On chrome: cream `#FFF9F0` text, amber mid-stop `#FAC775` accent. Stamp amber `#7C2D12` is the only color that survives both surfaces (it passes contrast on cream *and* on teal). Never put paper-mode tokens on chrome or vice versa.

**The No Pure Black, No Pure White Rule.** `#000` is prohibited. `#fff` is prohibited. Ink is `#1A1A1E` (slightly cool tint). Paper is `#FFF9F0` (warm cream). Every neutral carries hue.

## 3. Typography

**Display Font:** Newsreader (with Georgia, serif fallback).
**Body Font:** Newsreader (same family; weight 300 for body, weight 400 for editorial headings).
**Label/Mono Font:** JetBrains Mono (with ui-monospace, monospace fallback).
**Annotation Font:** Caveat (handwritten — used sparingly, only for hand-drawn margin annotations and the kid-drawing artifacts).

**Character:** A two-family pairing where the serif IS the editorial register and the mono IS the wire-service register. Newsreader carries the comedic-confident voice (the "Saturday morning cartoons and Vercel deployment logs" surface) at a wide weight range (300 for body prose, 400 for editorial headings, 300 for tagline). JetBrains Mono carries every dated, machine-coded, technical-register surface (dateline, project tags, frame numbers, methods strip, footer columns, navigation, agent feed). The serif-vs-mono contrast IS the duality the portfolio's thesis is built on. **No Inter. No Sora. No third typeface beyond the Caveat annotation accent.**

### Hierarchy
- **Display** (Newsreader 400, `clamp(56px, 7.2vw, 130px)`, line-height 1.05, tracking -0.8px): The hero name "Sean Winslow." Page-level h1 on About + case-study + essay heroes (`clamp(40px, 5vw, 72px)` at 400 for those). Always teal `#0A3E42`. Never gradient-filled, never outlined, never animated as a color shift.
- **Headline** (Newsreader 300, `clamp(26px, 3.2vw, 56px)`, line-height 1.22, tracking -0.3px): The hero tagline, the About lead, the essay deck, case-study deck. Sedaris-register editorial. Always ink `#1A1A1E`. The weight is intentionally light (300) so the tagline reads as a *quoted thought*, not a banner.
- **Title** (Newsreader 400, 24px, line-height 1.2, tracking -0.2px): Project tile titles on the splash, B-N section headings on About, case-study section headings. On chrome surfaces (tiles), color is paper `#FFF9F0`; on paper surfaces, color is teal `#0A3E42`.
- **Body** (Newsreader 300, 20px, line-height 1.6, tracking -0.1px, max-width 65–75ch): About prose, case-study narrative, essay body, `/contact/` page sentence. Always ink `#1A1A1E`. Cap at 65–75ch — never let body prose stretch wider.
- **Label** (JetBrains Mono 500, 12px, line-height 1.4, tracking 1.2px, uppercase): Project tile status pills, nav tabs, role tag, footer column headers (slightly wider 1.8px tracking + 11px), agent-feed timestamps. All wire-service register. Uppercase by rule.
- **Dateline** (JetBrains Mono 400 for body / 500 for stamp prefix, 12px, line-height 1.4, tracking 1.2px, uppercase for the stamp prefix only): The dateline strip pattern. Stamp prefix in `#7C2D12`, body in `#546E71`. The em-dash exception lives here — datelines may use em dashes by inheritance from real newspaper typography.
- **Annotation** (Caveat 500, 18px, line-height 1.2): Hand-drawn margin annotations on tiles, kid-drawing artifacts in case studies. Always paper color on chrome, ink-secondary on paper. Used *rarely* — annotations are signal, not pattern.

### Named Rules
**The Two-Fonts Rule.** Newsreader + JetBrains Mono. Caveat is the one allowed annotation accent. Anything else — Inter, Sora, Public Sans, Switzer, Recoleta, Söhne — is a regression to template land. If a new surface "needs" a third font, the surface is wrong.

**The No-Gradient-Text Rule.** `background-clip: text` combined with a gradient background is prohibited. Headlines are solid teal `#0A3E42`. Emphasis comes from weight contrast and size, never from color flow.

**The Wire-Service Em-Dash Exception.** Em dashes (`—`) are banned across the site except in datelines, ledger captions, methods-strip prefixes, and any Daily-Driver-written body copy. Those surfaces use em dashes by inheritance from real newspaper typography. Editorial surfaces (hero, About, case-study narrative, essays) follow the no-em-dash rule — commas, colons, semicolons, periods, parentheses. Also not `--`.

**The Uppercase-Mono-Only Rule.** Uppercase + letter-spacing is reserved for JetBrains Mono labels and stamps. Newsreader is never uppercased except for the wordmark "SW." Putting Newsreader in uppercase recreates the luxury-PM "VISION MEETS VELOCITY" template instantly.

**The Tagline-Weight-300 Rule.** The hero tagline ("Product Manager. The agents handle the loops. I handle the taste.") renders at Newsreader weight 300, not 400. The light weight is what makes the tagline read as *spoken* and *true*, not declared. Bumping to 400 turns it into a banner. Don't bump.

## 4. Elevation

**This system is flat by default.** There are no decorative shadows, no glass-card blurs, no scroll-driven elevation animations. Depth on this site is conveyed through the three-layer Z-stacking model (chrome → paper → splash → tear) and through hand-authored torn-paper PNG edges that reveal the lower layer through alpha. Where shadow is used, it's ambient and atmospheric — supporting the physicality of the paper sheets, never decorating components.

### Z-Stacking (the literal stacking-context map)
- **Z=0 — Chrome.** `body { background-color: var(--teal); }`. The persistent book-cover backdrop. Never has its own `z-index` value.
- **Z=10 — Paper sheets.** `.page-sheet { z-index: 10; }`. Every catalog-surface body (`/transactions/`, `/architecture/`, `/essays/`, `/about/`, `/contact/`, `/404`), every deep-dive article, every home-page band that needs cream paper underfoot (`AboutTeaser`, the hero). The home grid puts each band in its own page-sheet stacking context.
- **Z=11 — Splash sections.** `.projects { z-index: 11; }`. The single full-bleed teal-splash block on the home page sits *above* the cream `.about-teaser` below it so the splash's bottom torn-paper edge can visually bleed cream-on-cream into the next section. Splash sections *don't* use `overflow: hidden` — the tear has to escape the section's bounds to land on the next paper sheet (see §5 Torn-Paper Divider). Any future splash section follows the same Z=11 rule.
- **Z=12 — Torn-paper edges.** `.tear-divider { z-index: 12; }`. Lifts the tear above its sibling content within the splash section's stacking context so the tear renders on top of the splash bg, then bleeds onto the paper below via its alpha-feathered edge. Sister rule: the tear lives *inside* the splash section so it inherits the splash's z=11 in the global page stack.
- **Z=20 — Hero content layer.** `.hero-inner { z-index: 20; }`. Keeps the hero text above the absolute-positioned character lane within the hero's own stacking context.
- **Z=30 — Site footer.** `.site-footer { z-index: 30; }`. Footer always wins against any unexpected paint order in the bands above it.

### Shadow Vocabulary
- **Floor Shadow** (`box-shadow: 0 4px 24px rgba(10, 62, 66, 0.18)` on the hero character's standing surface; or a baked-in PNG underlay for the character lane): The illusion that the illustrated character is standing on the page, not floating above it. The only shadow that earns its place on the hero.
- **Tile Ambient** (`box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04)` on inputs and tile metadata strips, present in the prototype): Sub-perceptible. Lifts the metadata strip a fraction so its `rgba(0,0,0,0.15)` background reads as a layered chip on top of the tile media rather than a flat overlay. Never visible as a glow.
- **Sticky Nav Mask** (`box-shadow: 0 1px 0 rgba(10, 62, 66, 0.15)` — really a hairline, used in place of a bottom border): The sticky nav's separation from content scrolling beneath it. Never deeper than 1px of vertical offset, never above 0.15 opacity. The nav must read flat.

### Named Rules
**The Flat-Chrome Rule.** The teal chrome at Z=0 carries zero shadows, zero blurs, zero gradients. The chrome is the structural color and must read absolutely flat. Adding a noise texture or a teal-to-teal gradient is the "make it interesting" reflex that destroys the substrate metaphor. Resist.

**The Torn-Edge-Is-Depth Rule.** Depth between sections comes from torn-paper PNG edges, never from `box-shadow`. The torn edge reveals the chrome through alpha — that's the depth signal. A shadow under a section header re-invents an effect torn-paper already does, and does it worse.

**The No Glass-Cards Rule.** `backdrop-filter: blur()` is banned for decorative use. The only acceptable backdrop blur is the sticky nav's optional 6px blur on a paper-tinted background when content scrolls under it — and even that is opt-in, not default.

## 5. Components

### Buttons
The portfolio has **no traditional buttons.** No "Get Started" CTAs, no "Contact Me" pill buttons, no rounded primary/secondary affordances. The Contact section is mono link text. The "next in production" tile is a dashed-border zone, not a button. Project tiles are full-bleed clickable cards with no internal button. This is intentional and architectural — buttons signal *application*, not *portfolio*.

When a button-shaped affordance is genuinely needed (the 404's `→ HOME` link, the case-study `→ READ MORE` links):
- **Shape:** Sharp corners (`0px` radius). Text-only with a leading `→` glyph in JetBrains Mono.
- **Treatment:** No background fill, no border. Color: teal `#0A3E42` on paper, paper `#FFF9F0` on chrome.
- **Hover:** Underline appears at 1px (`text-decoration: underline; text-underline-offset: 4px`). Never a background-color transition, never a translateY, never a glow.

### Project Tiles (Signature Component)
The defining component of the home page. Six tiles on a teal-splash grid; five carry projects, one carries "next in production."

- **Shape:** Sharp corners (`0px` radius). 4:5 portrait aspect ratio, ~400×500px at desktop, full-width on mobile.
- **Background:** `transparent` — the tile media (looping video or still image) fills the top 75%; the bottom 25% is the metadata strip.
- **Metadata strip background:** `rgba(0, 0, 0, 0.15)` multiplied over the media at the bottom of the tile.
- **Border (default):** `0.5px solid rgba(255, 249, 240, 0.08)`.
- **Border (hover):** `0.5px solid rgba(255, 249, 240, 0.25)`, 200ms `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Frame number** (`A-1`, `A-2`, `A-3`...): JetBrains Mono 11px / 1.4px tracking, amber mid-stop `#FAC775`, top-left of the metadata strip.
- **Status pill** (`ACTIVE`, `SHIPPED`, `PAUSED`, `ARCHIVED`): JetBrains Mono 12px / 1.2px tracking, uppercase, paper-cream background, status-color text, 2px radius, top-right of the metadata strip.
- **Title:** Newsreader 20px weight 400, paper-cream, single line.
- **Tags:** JetBrains Mono 11px / 1.2px tracking, `rgba(255, 249, 240, 0.65)`, dot-separated.
- **Tagline (optional, present on A-3):** JetBrains Mono 12px weight 400, secondary ink — but this is a *project-tile-voice* tagline ("Drawing up agents to act with intent."), not a marketing tagline.

### Status Pills
A constrained vocabulary of five labels, each color-coded against the paper-cream pill background:
- `ACTIVE` — stamp amber `#7C2D12`
- `COMING` — stamp amber `#7C2D12` with subtle pulse animation
- `SHIPPED` — success teal `#0F6E56`
- `PAUSED` — ink-secondary `#546E71`
- `ARCHIVED` — ink-secondary `#546E71`

Five statuses. No others. The vocabulary is the discipline.

### "Next in Production" Tile
- **Background:** transparent on the teal splash (no fill).
- **Border:** 1.5px dashed `rgba(255, 249, 240, 0.4)`.
- **Title:** "next piece in production" — Newsreader 24px / weight 300, paper-cream, lowercase.
- **Subtitle:** "check back ~jun 11" — JetBrains Mono 12px / 1.4px tracking, stamp amber.
- **Hover:** dashed border fills in solid (animated to `rgba(255, 249, 240, 1)` 200ms ease-out).

### Inputs / Fields
There is one input on the site: a future newsletter-subscribe input (TBD). When implemented:
- **Shape:** 0px radius. Single bottom border (0.5px teal whisper), no surrounding box.
- **Padding:** 12px 0px (vertical 12px, no horizontal — the border *is* the affordance).
- **Focus:** Border color shifts to stamp amber `#7C2D12`, 200ms ease-out. No glow, no shadow.
- **Placeholder:** Newsreader 18px weight 300, `#546E71`.

### Navigation
The sticky top nav (sub-pages only — the home page has no nav). 56px tall desktop / 48px mobile, paper bg, 0.5px teal-whisper bottom border.

- **Style:** JetBrains Mono 12px / 1.2px tracking, uppercase. Left-aligned wordmark "SW" (14px / 1.4px tracking), right-aligned 5 sibling tabs (WORK · TRANSACTIONS · ARCHITECTURE · ESSAYS · ABOUT).
- **Tab default:** ink-secondary `#546E71`.
- **Tab hover:** teal `#0A3E42`, 200ms ease-out.
- **Tab active:** teal `#0A3E42` + 1px stamp-amber bottom border 4px below the baseline. `aria-current="page"`.
- **No center element. No search. No hamburger.** The nav never collapses on mobile — five short labels fit at the 48px breakpoint.

### Cards / Containers
Cards are not the default container in this system. Most surfaces are torn-paper-bounded sections, not cards. When a card is genuinely the right affordance (the project tile, the agent-feed footer rows, the architecture scoreboard rows):

- **Corner Style:** 0px (sharp). Status pills are the only 2px-radius exception.
- **Background:** Either paper `#FFF9F0` (on chrome), or transparent (on paper), or — for project tiles only — the tile media itself.
- **Shadow Strategy:** None. See Elevation §4.
- **Border:** 0.5px hairline whisper, color depending on layer (paper-whisper on paper, chrome-whisper on chrome).
- **Internal Padding:** 24–32px depending on density; never below 16px.

### Torn-Paper Divider (Signature Component)
The visual signature of the system. A high-resolution PNG-with-alpha of a real torn paper edge, 6400×600px source, displays at 3200×300, alpha-preserved. Placed at every chrome-to-paper and paper-to-chrome transition.

- **Source:** Photograph of real torn cream cardstock, recolored to `#FFF9F0` in Procreate post-import.
- **Why raster, not SVG:** SVG paths and `clip-path: polygon()` produce mathematical jagged lines; only a raster photograph captures the fluff fibers that read as physical paper. The fluff is the load-bearing detail.
- **Placement:** Negative-margin pulls the edge into the adjoining section so the seam reads as one continuous torn page. Current implementation uses `margin-top: -80px` for the top variant and `margin-bottom: -80px` for the bottom variant (the home `.projects` splash) — large enough that the tear's alpha-feathered fluff lands well inside the next section.
- **One asset, two orientations:** Flip vertically via CSS (`transform: scaleY(-1)`) for top-edge variant vs. bottom-edge variant. Don't author two PNGs.
- **No `overflow: hidden` on the parent splash.** The tear has to escape the splash section's bounding box so its alpha-feathered edge lands on the next paper sheet. Adding `overflow: hidden` to a splash section clips the alpha-fade and creates a hard hairline seam at the cut — the exact bug Phase 3e fixed. Keep splash sections un-clipped; constrain their inner content via a `.*-inner` `max-width` wrapper instead.

### The Character Lane (Signature Component)
The hero's right-margin character lane carries Sean's hand-drawn pencil-test self typing at a desk, with a pencil-test Claude companion floating beside him. The single most load-bearing element on the home page.

- **Source asset:** `sean-typing-at-desk-hero-transparent.webm`, VP9 with alpha (`alpha_mode=1`), 24fps, 94 frames, 3.917s seamless loop, ~378KB.
- **Element:** Native HTML5 `<video autoplay muted loop playsinline>`. No React, no canvas, no Lottie.
- **Lane dimensions:** 1024×576 (16:9), positioned `right: -180px` to bleed the source's empty right band off-viewport.
- **Anchor:** `object-fit: contain; object-position: bottom right`.
- **Floor shadow:** A baked-in PNG (`Hero-floor-shadow-2800x560.png`) underlays the character so it reads as standing on the paper, not floating above it.
- **Reduced-motion:** No `<video>` element mounted at all; renders the poster image (`hero-loop-poster.webp`) as a static `<img>`.

### Named Rules
**The Sharp-Corners-By-Default Rule.** Default radius is `0px`. The only allowed radius values are `0px` (default), `2px` (status pills only, because they're sub-glyph affordances and 0px reads as cramped), and `4px` (no current use; reserved). No `rounded-lg`, no `rounded-xl`, no soft-everything aesthetic. Sharpness IS the engineering register.

**The Character-on-Every-Key-Surface Rule.** The hand-drawn pencil-test character (in static, looped, or beat-illustrated form) appears on the hero, the About B-N sections (cartoon cels), the project tiles' default media when video isn't ready, and as the close-out on every case-study page. If a key surface can't earn the character, the surface is wrong.

**The No-Card-Reflex Rule.** Cards are the lazy answer. Use them only when truly the best affordance. Nested cards are always wrong. The agent-feed footer is rows, not cards. The "next in production" zone is a dashed boundary, not a card. The architecture scoreboard is a table, not a card grid.

## 6. Do's and Don'ts

### Do:
- **Do** put `#0A3E42` teal at Z=0 as the persistent chrome on every page. The chrome is the book cover; the paper sheets sit on it.
- **Do** use the cream `#FFF9F0` paper texture (construction-paper PNG tile) at multiply blend, 1024×1024 tile, ≤180 KB. Never raw flat cream.
- **Do** put real torn-paper PNG edges at every chrome-to-paper seam. Photograph real torn cardstock; the fluff is load-bearing.
- **Do** use Newsreader for editorial register and JetBrains Mono for wire-service register. Those are the two voices.
- **Do** keep the hero tagline at Newsreader weight 300. The lightness is what makes it read as *spoken*.
- **Do** uppercase + space-track only the JetBrains Mono labels (1.2–1.8px tracking depending on size). Never uppercase the serif.
- **Do** earn the dateline through real data. The Daily Driver writes `/api/dateline.json` at 08:45 daily; the page renders what's there. Never invent the dateline string.
- **Do** keep the character on every key surface. The hand-drawn pencil-test of Sean (with the AI companion on the hero) is the load-bearing wall.
- **Do** ship a torn-paper-PNG edge at the projects-section top/bottom, with negative-margin overlap into the adjoining section by 16px so it reads as one continuous tear.
- **Do** render status pills at exactly `2px` radius, in the five colors locked in §5. No sixth status.
- **Do** keep the home page nav-free per `noChrome={true}` on BaseLayout. Sub-pages get the sticky 56px nav, never the home.
- **Do** carry the em-dash exception only in wire-service surfaces (datelines, ledger captions, methods strips, Daily-Driver body). Editorial surfaces use commas, colons, semicolons, periods, parentheses.

### Don't:
- **Don't** rebuild the V3 "Iterative Blueprint" design-system-viewer aesthetic. No color swatch rows, no type-sample grids, no component-card galleries on the portfolio's primary surfaces.
- **Don't** drift into the luxury-minimal-PM template. No "VISION MEETS VELOCITY" headlines, no abstract gradient art behind editorial copy, no minimal-serif-on-cream-with-zero-personality, no "SAY HELLO." footers, no `Portfolio-Design-Inspo-1` through `-5` aesthetic clones.
- **Don't** drift into the generic AI-PM look. Dark navy + electric purple/blue gradient + glassmorphism panels = the first-order category reflex. Avoid all three.
- **Don't** use the hero-metric template. Big number + small label + supporting stats + gradient accent is the SaaS cliché the entire field has converged on. Banned globally.
- **Don't** put `border-left` or `border-right` greater than 1px as a colored stripe on any card, list item, callout, or alert. Side-stripe borders are never intentional. Rewrite with full borders, background tints, leading numbers/icons, or nothing.
- **Don't** use `background-clip: text` with a gradient. Headlines are solid teal `#0A3E42`.
- **Don't** use `backdrop-filter: blur()` decoratively. No glass cards. The sticky nav's optional 6px blur is the only allowed instance, and it's opt-in.
- **Don't** add a third typeface beyond Newsreader + JetBrains Mono + the Caveat annotation accent. No Inter, no Sora, no Public Sans, no Söhne, no Switzer.
- **Don't** use `#000` or `#fff` anywhere. Ink is `#1A1A1E`. Paper is `#FFF9F0`. Every neutral is tinted toward teal or cream.
- **Don't** add gradients to the chrome. The chrome `#0A3E42` is absolutely flat. Adding a teal-to-teal-deep gradient destroys the substrate metaphor. Flat is the discipline.
- **Don't** add noise texture or grain to the chrome. The chrome stays clean; the paper carries the fiber.
- **Don't** put paper-mode tokens on the chrome or chrome-mode tokens on paper. The two layers invert intentionally — see The Paper-vs-Chrome Inversion Rule.
- **Don't** frame the HybridRouter as "Agent OS" or "runtime architecture" anywhere on the site. Sean's edge is *semantic product architecture* (specs, governance, routing, memory, authority, review) — stay there.
- **Don't** use em dashes anywhere outside the wire-service surfaces. The editorial register uses commas, colons, semicolons, periods, parentheses. Also not `--`.
- **Don't** stream the agent feed. Real and dated is the honest framing; fake-streaming is the dishonest one. The feed shows what's already been written, with a timestamp.
- **Don't** put the animator-self on a timeline with the PM-self ("ten years of cartoons, six months of PRDs" is killed). Both lineages have always been there. Parallel, never before/after.
- **Don't** use modal dialogs as a first thought. Exhaust inline / progressive alternatives first. The portfolio has no modals at all in v1.
- **Don't** ship a 6-on-a-page identical card grid. The project section's 6-cell grid is *not* identical cards: each tile carries different media, the sixth tile is a dashed-border placeholder, and the dateline label + pencil arrow annotation break the grid visually.
