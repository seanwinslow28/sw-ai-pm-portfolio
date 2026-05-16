# Replication Prompt — Sean Winslow Portfolio 2.0

> **Reference site:** https://mynrd.co.uk/
> **Audit mode:** High-Fidelity (artifacts embedded verbatim with brand substitutions)
> **Stack target:** Astro 5 + React islands + Tailwind CSS v4 + GSAP + Lenis
> **Brand thesis:** "An animator's pencil test, mounted in a Vercel-grade frame."

---

## 1. ROLE + AESTHETIC IDENTITY

**Role:** Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer. You build sites that pass DevTools inspection by a Vercel engineer AND make a design director feel something. You write Astro that ships zero JS by default, hydrate React islands surgically, and orchestrate GSAP timelines that earn their kilobytes. You treat motion as autobiography, not decoration.

**Aesthetic Identity:** *"Pencil-Test Editorial × Vercel-Grade Engineering — an autobiographical museum of creative evolution."*

The site's soul lives in three adjectives: **tactile, engineered, autobiographical.** Light mode tells the origin story (animator's pencil test, warm cream paper, hand-drawn ink). Dark mode reveals the present (creative technologist, near-black engineering chrome, deep teal accent). The mode toggle is not decoration — it is the *thesis* rendered as interaction. Build it like a person, not a website.

---

## 2. CORE DESIGN SYSTEM

### Palette

The reference site uses a 5-tier palette of cream/white/ink/teal/midnight. Sean's brand palette aligns nearly 1:1 — most notably the reference's outro `#0A3E42` IS Sean's `Primary`. Color roles are preserved structurally; only hex values change where Sean's tokens supersede.

| Semantic Name        | Descriptive Word     | Light Mode Hex | Dark Mode Hex | Usage                                                                                    |
| -------------------- | -------------------- | -------------- | ------------- | ---------------------------------------------------------------------------------------- |
| **Primary**          | *Midnight Spruce*    | `#0A3E42`      | `#0A3E42`     | Outro section bg (light); accent ink and section borders (dark); the constant brand axis |
| **Background**       | *Aged Paper*         | `#FFF9F0`      | `#0A0E0F`     | Page bg in light mode; page bg in dark mode (near-black, slightly warm)                  |
| **Surface**          | *Paper Stock*        | `#FFFFFF`      | `#10161A`     | Intro/Case-studies/About bg (light); raised surface in dark                              |
| **Ink**              | *Press Ink*          | `#0A3E42`      | `#FFF9F0`     | Primary type — note: light mode uses Primary teal AS the type color (not pure black) for the warm-ink-on-paper feel; dark mode flips to cream |
| **Ink-Subtle**       | *Slate Mist*         | `#546E71`      | `#9DAFB1`     | Muted labels, dividers, frame numbers (Secondary brand)                                  |
| **Ink-Tertiary**     | *Graphite Stone*     | `#455A64`      | `#6E7E83`     | Tertiary chrome — registration marks, card stroke, micro icons (Tertiary brand)          |
| **Accent-Outro**     | *Midnight Spruce*    | `#0A3E42`      | `#0A3E42`     | The dramatic teal island for the closing section in BOTH modes (a constant)              |
| **Accent-Outro-Ink** | *Cream on Teal*      | `#FFF9F0`      | `#FFF9F0`     | Type color over the outro teal (always cream, regardless of mode)                        |

**Anti-pattern:** Do NOT use pure black `#000000` anywhere. The reference uses `#000` but Sean's brand replaces it with `#0A3E42` — warm-teal ink on warm cream is the entire visual identity in light mode.

### Typography

The reference uses two custom Pangram Pangram fonts: **PP Editorial New** (serif display) and **PP Neue Montreal** (sans). Default to free Google equivalents so the site is self-hostable; provide a clearly-labeled font-face swap point if Sean licenses the originals later.

| Role            | Font Family (default)      | Licensed Swap-In         | Weight | Size       | Line-Height | Tracking   | Notes                                                                          |
| --------------- | -------------------------- | ------------------------ | ------ | ---------- | ----------- | ---------- | ------------------------------------------------------------------------------ |
| Hero Display    | **Newsreader** (Google)    | PP Editorial New         | 400    | `85px` (clamp 56→85→104) | `93.5px` (1.1) | `-0.15px` | The hero H1. Tracking is critical — kills loose feel at 85px.            |
| Outro/Footer    | **Newsreader**             | PP Editorial New         | 400    | `120px` (clamp 72→120→160) | `132px` (1.1) | normal     | The closing "earn-their-applause" line + footer "Let's work together"     |
| Body Quote      | **Newsreader**             | PP Editorial New         | 300    | `45px` (clamp 28→45→56) | `1.29` (~58px) | normal     | Intro and About paragraphs. Weight 300 — NOT 400. Italic for emphasis.   |
| Italic Inline   | **Newsreader Italic**      | PP Editorial New Italic  | 300    | inherits   | inherits    | normal     | Inside `<em>` tags inside body quote — discipline list, named concepts.   |
| Micro Label     | **Geist Sans** (Vercel)    | PP Neue Montreal         | 400    | `14px`     | normal      | normal     | "↳ A Visual Summary", footer meta, frame numbers, all small UI text.     |
| Mono / Frame No | **Geist Mono** (Vercel)    | PP Neue Mono             | 400    | `12px`     | normal      | `0.02em`   | Frame counter labels (`1A`, `2A`…), file-path tooltips, monospace accents — the Vercel-engineering signal. |

**⚑ Drama Ratio (PRESERVE — single highest-leverage typographic axis):**
- **120px serif at weight 400 ↔ 14px sans at weight 400 = 8.5× scale jump.** This is the brand. Do not soften it — do not let the closing line shrink, do not let the meta type grow.
- **85px hero serif weight 400 ↔ 45px body serif weight 300 = 1.9× ratio + weight contrast.** The weight-300 body is what makes the prose feel like an editor's note rather than UI. NEVER set body in weight 400.
- **`-0.15px` tracking on the hero** — subtle but load-bearing.

### Texture System

- **Noise/grain:** None on the surfaces themselves. Texture comes from (a) **torn-paper PNG transitions** between sections in light mode, (b) **film-reel sprocket-hole edges** between sections in dark mode (animation reel perforations), and (c) **hand-drawn ink-line illustrations** (no fill) for character art and decorative SVGs.
- **Border-radius:** `0` everywhere. Sharp corners only. The only "softness" comes from the torn-paper / sprocket-hole edges. NO `rounded-lg`, NO `rounded-md`, NO `rounded-xl`. Tile media: 0px radius. Buttons: 0px radius.
- **Shadow system:** None. The reference has zero `box-shadow`. Depth is created by torn-paper PNGs, the dark teal outro acting as a contrast island, and the line-illustration ink. Adding a shadow drift breaks the brand. **Hard rule: no `shadow-*` Tailwind utilities anywhere.**
- **Frame-number / registration mark motif (cross-cutting):** Every section gets a small Geist Mono `12px` label in its upper-left corner: `01A · HERO`, `02A · WORK`, `03A · ABOUT`, `04A · CONTACT`. These replace any kind of nav. They are the autobiographical animator's pencil-test signature.

---

## 3. COMPONENT ARCHITECTURE

The site is **6 sections** in source (matching the reference's structure), grouped into Sean's 4 user-facing chapters: **Hero**, **Work** (which includes the intro paragraph + case-study grid), **About** (which includes the manifesto + the dark-teal closing line), and **Contact** (footer).

### Page Architecture (transplanted from Site DNA §1.1, brand-substituted)

```
╔═════════════════════════════════════════════════════════════════════════════╗
║ SECTION 1: HERO                              "The Sticky Origin Frame"      ║
║ Height: 100vh (target 723px at 1440×900)                                    ║
║ BG: Background (Aged Paper #FFF9F0 light / Engineering Black #0A0E0F dark)  ║
║ Sticky pin: .hero__wrapper(absolute h:200vh) > .hero__sticky(sticky top:0)  ║
║ → Title pins for first 100vh of scroll; intro overlaps via torn-paper edge  ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 2: INTRO                             "The Manifesto Tear-Sheet"     ║
║ Height: ~508px desktop                                                      ║
║ BG: Surface (#FFFFFF light / #10161A dark)                                  ║
║ Top edge: torn-paper PNG (light) / sprocket-hole reel-edge SVG (dark)       ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 3: WORK / CASE STUDIES               "The Pencil-Test Filmstrip"    ║
║ Height: auto (3-col grid × N rows; target 8–18 tiles)                       ║
║ BG: Surface                                                                 ║
║ Layout: CSS Grid 3 cols × auto rows · gap 52px · tiles 1fr × 580px aspect   ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 4: ABOUT                             "The Magician's Manifesto"     ║
║ Height: ~870px                                                              ║
║ BG: Surface                                                                 ║
║ Decorative SVGs: pencil-test motifs (registration mark, light bulb, pencil) ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 5: OUTRO PUNCHLINE                   "The Earn-Your-Applause Beat"  ║
║ Height: ~1076px                                                             ║
║ BG: Accent-Outro (#0A3E42) — the constant teal island in BOTH modes         ║
║ Behind H3: parallax marquee of project frame stills (the filmstrip callback)║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 6: CONTACT / FOOTER                  "The Paper-Plane Mailto Send"  ║
║ Height: ~411px                                                              ║
║ BG: Background                                                              ║
║ Top edge: torn-paper or sprocket-hole edge transitioning out of teal        ║
╚═════════════════════════════════════════════════════════════════════════════╝
```

OVERLAPPING sections (preserve verbatim):
- **HERO ↔ INTRO**: Intro starts at scroll 100vh in flow, but the section's top "tear" is `position: absolute; transform: translateY(-107px)` so it bleeds upward into the hero. The hero title scrolls UNDER the tear.
- **GALLERY ↔ ABOUT**: clean stack.
- **ABOUT ↔ OUTRO**: white-tear PNG (light) / sprocket SVG (dark) at the bottom of about masks the hard teal entry.
- **OUTRO ↔ FOOTER**: cream-tear PNG (light) / sprocket SVG (dark) masks the teal-out boundary.

---

### SECTION 1 — "The Sticky Origin Frame" (Hero)

**Layout** (transplanted from Site DNA §1.3 hero, content adapted):

```
┌───────────────────────────────────────────────────────────────────────────┐
│ [01A · HERO]   ← Geist Mono 12px frame number, top-left, Ink-Subtle       │
│                                                                           │
│  ┌──────────────────────────────────────┐    ┌──────────────────┐         │
│  │ H1 .hero__title                      │    │ .hero__circle    │         │
│  │ "Sean Winslow —                       │    │ 142×142  abs     │         │
│  │  Creative Technologist"              │    │ top:45 right:67  │         │
│  │ Newsreader 85px · 93.5lh · -0.15ls   │    │ "Let's talk · "  │         │
│  │ wt400 · Ink color                    │    │ rotating SVG     │         │
│  │ 885px wide · 2 lines at 1440         │    │ + frame-counter  │         │
│  │ Each char wrapped via SplitText →    │    │ icon centered    │         │
│  │ .anim-line > .oh > .anim-char        │    └──────────────────┘         │
│  └──────────────────────────────────────┘                                 │
│  top:45 left:52                                                           │
│                                                                           │
│                                                                           │
│                                            ┌────────────────────────────┐ │
│                                            │ .hero__lottie-wrapper      │ │
│                                            │ 472×457  abs               │ │
│                                            │ bottom:0  right:15         │ │
│                                            │ Pencil-test character:     │ │
│                                            │ Sean at hybrid desk —      │ │
│                                            │ ONE drawing tablet,        │ │
│                                            │ ONE laptop, looking left.  │ │
│                                            │ Black ink line, no fill.   │ │
│                                            │ Idle breathing animation.  │ │
│                                            └────────────────────────────┘ │
│                                                                           │
│ [intro torn edge bleeds upward at ~85% Y]                                 │
└───────────────────────────────────────────────────────────────────────────┘
Layout: position:relative; H1 in normal flow; circle and Lottie absolute
```

**TYPOGRAPHY + CONTENT MAP:**

```
.hero__title (H1)        → "Sean Winslow — Creative Technologist"
                           Newsreader 85/93.5/-0.15/wt400, Ink color, left-aligned
                           SplitText: each line wrapped in .anim-line; each character
                           in .anim-char (each <span>) for stagger reveal.
                           At 1440 width breaks to:
                             "Sean Winslow —"
                             "Creative Technologist"

.hero__circle-wrapper    → <a href="mailto:hi@seanwinslow.com">  (or chosen mail)
                           SVG with paths-as-text: "Let's talk · Let's talk · Let's talk · Let's talk ·"
                           rotating around a 142×142 circle, with a small frame-counter / film-reel
                           icon centered (replaces the reference's monitor icon — keeps the
                           animation-studio motif). Black ink stroke in light mode; cream in dark.
                           Continuous rotation via GSAP `gsap.to(el, {rotation:360, duration:12,
                           ease:'none', repeat:-1})`.

.hero__lottie-anim       → Hand-drawn SW character at hybrid desk. Choose ONE:
                           (a) Lottie JSON (lottie-web; ~30KB) for breathing/idle frames, OR
                           (b) Static SVG with CSS `@keyframes` micro-bob (cheaper).
                           Style: black ink line on warm cream (light) or cream ink on near-black (dark).
                           Same character should reappear in footer (continuity).
```

**State Machine (transplanted from Site DNA §1.6):**

```
STATE MACHINE: Hero Sticky Pin
Type: Sticky → Released
STATES:
  State A — PINNED:    scroll < 100vh; .hero__sticky position:sticky top:0
  State B — RELEASED:  scroll ≥ 100vh; sticky parent ends, title scrolls with page
INITIAL STATE: A
TRANSITION A→B:
  Trigger: native CSS sticky un-pin at scroll = 100vh
  Visual masking: intro top-edge (translateY -107px) covers the seam — un-pin invisible
LOOP: bidirectional (re-pins on scroll-up)
INTERNAL LAYOUT:
  .hero { height: 100vh }
  .hero__wrapper { position:absolute; height:200vh; inset:0 }
  .hero__sticky { position:sticky; top:0; height:100vh }
```

**Animation Timeline (transplanted from Site DNA §1.4, GSAP-substituted):**

```
ANIMATION: Hero Title — Per-Character Stagger Reveal
Trigger: page-load (after font-ready)
Library: GSAP 3 + SplitText (or custom split if not Club GreenSock)
TIMELINE:
  t=0ms      .anim-char (each)  FROM: opacity:0, yPercent:100  STATE: hidden
  t=0ms      .anim-char[0]      TO:   opacity:1, yPercent:0    DURATION:600ms EASING:expo.out
  t=20ms     .anim-char[1]      TO:   same — staggered +20ms per character
  …          (continues for ~30 chars; ~600ms stagger window)
  t=900ms    last char visible
PROPERTIES: opacity, yPercent (translateY)
Mechanism: each char wrapped in .oh (overflow:hidden) > .anim-char (translates from below)
LOOP: no
GSAP: gsap.from('.hero__title .anim-char', {yPercent:100, opacity:0, duration:0.6,
       ease:'expo.out', stagger:0.02, delay:0.1})
```

```
ANIMATION: Hero Circle Rotation
Trigger: page-load (always-on)
Library: GSAP infinite tween
GSAP: gsap.to('.hero__circle-inner', {rotation:360, duration:12, ease:'none', repeat:-1})
Hover: gsap.to('.hero__circle-inner', {timeScale:2.5, duration:0.4})
```

```
ANIMATION: Hero Lottie Idle
Trigger: page-load
Library: lottie-web (loop:true, autoplay:true)
Subtle breathing/eye-blink. No spatial movement.
```

---

### SECTION 2 — "The Manifesto Tear-Sheet" (Intro)

**Layout** (transplanted from Site DNA §1.3 intro, content adapted):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ╲╱╲╱╲╱╲╱ Section top edge ╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲                              │
│   Light mode: torn-paper PNG (1440×214, abs top:0, transform:translateY(-107))
│   Dark mode:  film-reel sprocket SVG (1440×40, abs top:-40px) — perforations
│   bleed up into hero, masking the un-pin                                 │
│                                                                          │
│           ┌─────────────────────────────────────────────┐                │
│           │ .intro__container · 723px · centered        │                │
│           │                                             │                │
│           │  H2 .intro__copy  Newsreader 45/58.05/wt300 │                │
│           │  Ink color · Center                         │                │
│           │  "An animator who learned to think          │                │
│           │   like a product manager. I build           │                │
│           │   things that earn their own applause       │                │
│           │   for ( ◆ ) people."                        │                │
│           │                                             │                │
│           │  ⚑ ( ◆ ) parens contain an inline brand-mark │               │
│           │  cycler (~64×26 inline SVG). Cycles every   │                │
│           │  2500ms with a 350ms crossfade through the  │                │
│           │  brands/tools Sean has shipped FOR or WITH: │                │
│           │  e.g., Linear, Vercel, GSAP, Figma, Notion. │                │
│           │  Same baseline-aligned line height — line   │                │
│           │  must NOT jump on swap.                     │                │
│           │                                             │                │
│           │  ↳ A Visual Summary                         │                │
│           │  Geist Sans 14px wt400, Ink, Center         │                │
│           │  ↳ glyph (U+21B3) precedes the label        │                │
│           └─────────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────────────┘
```

**Animation Timeline (transplanted from Site DNA §1.4):**

```
ANIMATION: Intro Copy Per-Line Reveal
Trigger: scroll-enter (IntersectionObserver, threshold 0.2)
Library: GSAP + SplitText (lines mode)
TIMELINE:
  t=0ms       .anim-line[0]   FROM: yPercent:60, opacity:0
  t=0ms       .anim-line[0]   TO:   yPercent:0,  opacity:1   DURATION:700ms EASING:quart.out
  t=80ms      .anim-line[1]   TO:   same                     DURATION:700ms
  t=160ms     .anim-line[2]   TO:   same
  t=240ms     .anim-line[3]   TO:   same
LOOP: no  ·  RESET: no (fires once on enter)
GSAP: gsap.from('.intro__copy .anim-line', {yPercent:60, opacity:0, duration:0.7,
       ease:'quart.out', stagger:0.08,
       scrollTrigger:{trigger:'.intro', start:'top 80%', once:true}})
```

```
STATE MACHINE: Intro Inline Brand Cycler
Location: inside parens in .intro__copy
Type: Cycler (auto-rotating slot)
STATES (4–8 partner brand wordmarks):
  State A: Linear wordmark visible
  State B: Vercel wordmark visible
  State C: GSAP wordmark visible
  State D: Figma wordmark visible
  …
TRANSITION A→B:
  Trigger: setInterval(2500)
  Element 1: outgoing  opacity 1→0 over 350ms ease
  Element 2: incoming  opacity 0→1 over 350ms ease (delay 175ms — partial overlap)
  Pause when scrolled out via IntersectionObserver
LOOP: infinite while in viewport
INTERNAL LAYOUT:
  Container: span inside .intro__copy, baseline-aligned, width:64px, height:1em
  Each state element: <svg> ~64×26, locked max-height to body x-height
```

---

### SECTION 3 — "The Pencil-Test Filmstrip" (Work / Case Studies)

**Layout** (transplanted from Site DNA §1.3 gallery, content adapted):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [02A · WORK]   ← frame number top-left, Geist Mono 12px Ink-Subtle       │
│                                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                                │
│  │ tile 0   │  │ tile 1   │  │ tile 2   │   ← row 1                      │
│  │ 440×580  │  │ 440×580  │  │ 440×580  │                                │
│  │ <video>  │  │ <video>  │  │ <img>    │                                │
│  │ obj-fit: │  │ obj-fit: │  │ obj-fit: │                                │
│  │ cover    │  │ cover    │  │ cover    │                                │
│  └──────────┘  └──────────┘  └──────────┘                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                                │
│  │ tile 3   │  │ tile 4   │  │ tile 5   │   ← row 2                      │
│  └──────────┘  └──────────┘  └──────────┘                                │
│   …                                                                      │
└──────────────────────────────────────────────────────────────────────────┘
Layout system:
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 52px;
  /* tiles aspect-ratio: 11/14.5 (≈0.76 — portrait-ish) */

Tile structure: .gallery-item > .gallery-item__wrapper(overflow:hidden) >
                .gallery-item__link(<a> w/ href to /work/[slug]) >
                <picture>|<video> object-fit:cover

NO ON-TILE TITLES. Project identity is conveyed through media. Hover reveals
the project name via the custom cursor preview (see §4 Custom Cursor).

Tile count: render whatever number of real projects exist (target 9–18).
If fewer than 6, pad with pencil-test "in progress" frames (registration-mark
border + frame number + "1B / IN PROGRESS" mono label) to maintain rhythm.
```

**Property Diff Table — Tile Hover (transplanted from Site DNA §1.5):**

```
INTERACTION: Gallery Tile (.gallery-item)
STATE         | media transform     | wrapper                       | cursor
────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | scale(1)            | overflow:hidden, radius:0     | normal (custom 6px ink dot)
HOVER         | scale(1.04)         | wrapper unchanged             | becomes 250×N preview tile
                                                                       (sibling project image)
ACTIVE/CLICK  | scale(1.04)         | navigates to /work/[slug]
FOCUS         | outline: 2px solid Ink, inset
MECHANISM: CSS transition on transform · 700ms cubic-bezier(0.4, 0, 0.2, 1)
DURATION: 700ms (slow, deliberate — documentary zoom, not UI bounce)
⚑ SPECIAL BEHAVIOR: NO box-shadow appears on hover. NO border. NO color overlay.
The cursor IS the affordance. The 700ms duration is load-bearing — anything faster
reads as a generic "lift on hover" UI tile; this duration earns the editorial feel.
```

---

### SECTION 4 — "The Magician's Manifesto" (About)

**Layout** (transplanted from Site DNA §1.3 about, content adapted):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [03A · ABOUT]   frame number, top-left                                   │
│                                                                          │
│                       .about__svg--regmark                               │
│                       (registration mark "+", abs top, center)           │
│                       ~80×80                                             │
│                                                                          │
│         ┌──────────────────────────────────────────────────┐             │
│         │ H2 .about__copy · 1075px · center · 45/56.25/300 │             │
│         │                                                  │             │
│         │ "I learned timing from <em>animation</em>.       │             │
│         │  I learned shipping from <em>product</em>.       │             │
│         │  I learned restraint from <em>engineering</em>.  │             │
│         │  And I learned the trick from years of           │             │
│         │  pencil-tests — that the magic is in what        │             │
│         │  you don't draw."                                │             │
│         │                                                  │             │
│         │ <em>: italic + 1px underline same color as body. │             │
│         │ Highlight system, NOT links.                     │             │
│         └──────────────────────────────────────────────────┘             │
│                                                                          │
│                                       .about__svg--bulb                  │
│                                       (light-bulb sketch w/ rays)        │
│                                       ~95×91 abs right                   │
│                                                                          │
│  .about__svg--pencil  ~82×84                                             │
│  abs left, bottom (animator's pencil with motion ticks behind tip)       │
│                                                                          │
│ ╱╲╱╲╱╲ Section bottom edge: white tear (light) / sprocket (dark) ╱╲╱╲    │
└──────────────────────────────────────────────────────────────────────────┘

Decorative SVGs: black-on-cream hand-drawn ink, no fill, ~80–100px each.
On scroll-enter: stagger fade-up + 400ms entrance, then idle wobble (rotate ±3°
sine over 4s) for the "alive" hand-drawn feel.
```

---

### SECTION 5 — "The Earn-Your-Applause Beat" (Outro Punchline)

**Layout** (transplanted from Site DNA §1.3 outro, content adapted):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [Section bg: Accent-Outro #0A3E42 — constant in BOTH modes]              │
│                                                                          │
│  ╱☐╲   ╱☐╲   ╱☐╲     ← .infinite-grid (abs, 1425×6638, behind H3)        │
│  ╲▣╱   ╲▣╱   ╲▣╱        16 figure tiles, each 330×434                    │
│        ╱☐╲              Scattered 3-col grid (NOT uniform):              │
│  ╱☐╲   ╲▣╱              col-A x=120, col-B x=525, col-C x=1020           │
│  ╲▣╱                    Vertical rhythm 283–533px (poster-pinboard feel) │
│                         Items: pencil-test frame stills from Sean's      │
│                         project archive — same media as Work tiles, but  │
│                         repeated/echoed. Acts as the "filmstrip          │
│                         callback" behind the closing line.               │
│                                                                          │
│              ┌──────────────────────────────────────────┐                │
│              │ H3 .outro__title · ~1076 (3 lines)        │                │
│              │ Newsreader 120/132/wt400 · CREAM #FFF9F0  │                │
│              │ Center · 396px tall · z-index above grid  │                │
│              │                                           │                │
│              │ "Building things                          │                │
│              │  that <em>earn</em>                       │                │
│              │  their own applause."                     │                │
│              │                                           │                │
│              │ <em> "earn" is italic + decorative inline │                │
│              │ SVG sparkle wrapper (.outro__title-svg-   │                │
│              │ wrapper, ~97px) drawing a starburst       │                │
│              │ around the word.                          │                │
│              │                                           │                │
│              │ Each line stagger-revealed at section enter│               │
│              └──────────────────────────────────────────┘                │
│                                                                          │
│ ╲╱╲╱ Section bottom edge: cream tear (light) / sprocket (dark) ╲╱╲╱      │
└──────────────────────────────────────────────────────────────────────────┘
```

**Animation Timeline:**

```
ANIMATION: Outro Marquee — Infinite Grid Drift
Section: Outro
Trigger: scroll (parallax-driven)
Library: GSAP ScrollTrigger
TIMELINE: grid translateY drifts upward at ~0.6× scroll velocity as section
          passes through viewport. Fresh project frame stills surface from below.
GSAP: gsap.to('.infinite-grid', {y:-1400, ease:'none',
       scrollTrigger:{trigger:'.outro', start:'top bottom', end:'bottom top',
                      scrub:true}})
LOOP: no (single-pass parallax — despite the class name, it does NOT actually loop)
```

```
ANIMATION: Outro Title Stagger + "earn" Sparkle
Trigger: scroll-enter (section top crosses 80% vh)
Library: GSAP + SplitText
TIMELINE:
  t=0ms      .anim-line[0]  yPercent:60→0, opacity:0→1  700ms quart.out
  t=120ms    .anim-line[1]  same
  t=240ms    .anim-line[2]  same
  t=900ms    .outro__title-svg-wrapper svg paths: stroke-dasharray draw-on (1.2s)
  After:     "earn" inflate-pulse: scale 1→1.05→1 over 1.4s, infinite
GSAP timeline: a single gsap.timeline() chains lines → svg draw-on → pulse loop
```

---

### SECTION 6 — "The Paper-Plane Mailto Send" (Footer / Contact)

**Layout** (transplanted from Site DNA §1.3 footer, content adapted):

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ╲╱╲╱ Top edge: cream tear (light) / sprocket (dark), abs top, ~215px     │
│                                                                          │
│ [04A · CONTACT]   frame number, top-left                                 │
│                                                                          │
│       ✈ .info__title-plane 144×72 abs · top:7074 left:252                │
│       (paper-plane line drawing w/ 3 motion ticks, ink line)             │
│                                                                          │
│  ┌────────────────────────────────────────┐    ┌──────────────────────┐  │
│  │ H3 .info__title  995×140               │    │ Character SVG/Lottie │  │
│  │ <a href="mailto:hi@seanwinslow.com">    │    │ "Sean in chair,      │  │
│  │ "Let's work together  ↗"               │    │  spinning frame      │  │
│  │ Newsreader 120 · wt400 · Ink           │    │  on hand"            │  │
│  │ Inline arrow svg .info__title-arrow    │    │ ~280×280 abs right   │  │
│  │ 64×64 (↗ northeast)                    │    │ Same character as    │  │
│  └────────────────────────────────────────┘    │ hero (continuity).   │  │
│                                                │ He now holds a frame │  │
│                                                │ counter / film cell  │  │
│                                                │ instead of a globe — │  │
│                                                │ animation-studio gag.│  │
│                                                └──────────────────────┘  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │ .info row · Geist Sans 14px wt400 · Ink                          │    │
│  │                                                                  │    │
│  │ © 2026 Sean Winslow   ⏱ [LIVE TIME] [CITY]   Built by Sean       │    │
│  │ Winslow                              [GitHub][LinkedIn][X][Read.cv] │    │
│  │                                                                  │    │
│  │ Clock icon: 11×11 inline before the time                         │    │
│  │ Live time: updates every 60s via setInterval; format:            │    │
│  │   `${hh}:${mm} ${city}` — hour:min, then user-set city           │    │
│  │ Social icons: 13×13 ink SVGs, no fill, hover:scale(1.15) opacity 0.85→1 │
│  └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
```

**Property Diff Table — Footer Mailto Link (transplanted from Site DNA §1.5):**

```
INTERACTION: Footer "Let's work together" Link
Selector: a.info__title-link > h3.info__title
STATE         | color   | letter-spacing  | plane                          | arrow
────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | Ink     | normal          | translate(0,0) rotate(0)       | translate(0,0)
HOVER         | Ink     | -0.5px (tighten)| translate(40px,-20px) rot(8°)  | translate(8px,-8px)
ACTIVE/CLICK  | mailto:hi@seanwinslow.com fires
FOCUS         | underline 2px Ink         | —                              | —
MECHANISM: CSS transitions on transform/letter-spacing
DURATION: title 350ms · plane 500ms · arrow 300ms · easing cubic-bezier(0.4, 0, 0.2, 1)
⚑ SPECIAL BEHAVIOR: paper plane "takes off" toward upper-right while ↗ arrow nudges
in the same direction — the two elements coordinate to imply flight. The H3 itself
does NOT move; only its letter-spacing tightens slightly so the line "leans in."
```

---

### Cross-Cutting Component — "The Inverting Pen" (Custom Cursor)

**State Machine (transplanted from Site DNA §1.6):**

```
STATE MACHINE: Custom Cursor
Container: div.cursor (fixed, 120×120, pointer-events:none, z-index:800)
            > span.cursor__span         (visible "dot")
            > div.cursor__images        (4 cursor-images children for hover previews)
STATES:
  STATE-IDLE       (no hover):    span = 6×6 ink dot, mix-blend-mode:normal, images opacity:0
  STATE-LINK       (hover link):  span scales to 60–80px circle, mix-blend-mode:difference, images opacity:0
  STATE-TILE       (hover tile):  span stays 6×6 dot, accompanied by cursor-images[N] showing project preview
                                   (250×N px next to dot)
  STATE-CTA        (hover CTA):   span scales to 60px, mix-blend-mode:difference

TRANSITION IDLE→TILE (pointerenter on .gallery-item with data-cursor-image="N"):
  cursor-images[N]  opacity 0→1  280ms ease-out
TRANSITION TILE→IDLE (mouseleave):
  cursor-images[N]  opacity 1→0  200ms

POSITION: lerped continuous tracking
  pointer-move handler updates .cursor.style.transform via RAF with lerp(0.15)
  → cursor lags 1–2 frames behind pointer (tactile feel — DO NOT remove the lerp)

IMPLEMENTATION:
  React island (client:idle directive). useEffect attaches RAF loop; useRef
  holds target/current vec2. mix-blend-mode:difference applied via class swap
  triggered by data-cursor-* attrs on hover targets, NOT CSS :hover, so the
  cursor can react to elements other than the directly hovered one.

⚑ SPECIAL BEHAVIOR: mix-blend-mode:difference on link hover means the cursor
INVERTS the color of whatever it overlays (cream text becomes teal when the cursor
passes). This is the single most defining ambient interaction on the page —
preserve it without exception.
```

---

### Cross-Cutting Component — "The Reel-Change Toggle" (Light/Dark Mode)

This is Sean's autobiographical thesis rendered as interaction. **Not a generic moon/sun toggle.**

```
COMPONENT: Reel-Change Toggle
Position: fixed, top-right, mirrors the hero "Get in touch" badge alignment
Form: small chip (~96×40) showing a frame counter — `24 ▸ 25` in Geist Mono
States:
  LIGHT: chip reads "24A · ORIGIN"   (the animator's frame number)
  DARK:  chip reads "25A · PRESENT"  (the technologist's frame number)

Transition LIGHT→DARK (user clicks chip):
  t=0ms     Chip frame counter ticks: 24 → 25 (digit-roll, 200ms)
  t=100ms   Page bg color crossfades #FFF9F0 → #0A0E0F over 600ms cubic-bezier(0.4,0,0.2,1)
  t=100ms   Type color crossfades #0A3E42 → #FFF9F0 over 600ms (same easing)
  t=200ms   Section section-edges (torn paper PNGs) crossfade out;
             sprocket-hole reel-edge SVGs crossfade in (mask-mode swap).
  t=300ms   Hero character illustration source-swaps from "animator at desk" SVG
             to "creative technologist at code editor" SVG — separate Lottie/SVG file,
             cross-faded; same character, different frame of his life.
  t=900ms   All transitions complete.

PERSIST: prefers-color-scheme on first visit; localStorage on subsequent.

ACCESSIBILITY: prefers-reduced-motion → mode change is INSTANT (no crossfade),
                but the frame-counter still ticks (one digit-roll, ~200ms — gentle).

IMPLEMENTATION (Astro + React):
  - <DarkModeToggle client:idle /> React island
  - Tailwind v4 dark-mode set to `[data-theme="dark"]` on <html>
  - GSAP timeline orchestrates the multi-element crossfade on toggle
  - Two character SVG/Lottie files: hero-character-animator.json + hero-character-tech.json
```

---

### Cross-Cutting Component — "The Animator's Pencil-Test Edges"

Section transitions in this site are NOT background-color step changes. They are masked organic edges:

```
COMPONENT: Section Edge System
Light mode:  PNG masks — torn-paper edges (~215px tall, irregular hand-cut)
             Files: /img/edges/tear-cream-on-white.png, tear-white-on-cream.png,
                     tear-teal-on-white.png, tear-cream-on-teal.png

Dark mode:   SVG masks — film-reel sprocket-hole strips (~40px tall, 8 perforations
             across the 1440 viewport). Each sprocket is a rounded rectangle 14×26
             with 8px gap. Drawn inline so we can recolor via currentColor.

Implementation:
  Each section (intro, gallery→about, about→outro, outro→footer) declares:
    <div class="section-edge section-edge--top" data-edge-variant="cream-on-white" />
  CSS:
    .section-edge { position:absolute; inset-inline:0; pointer-events:none; }
    .section-edge--top { top:-107px; height:215px; }
    [data-theme="light"] .section-edge { background-image: var(--edge-png); }
    [data-theme="dark"] .section-edge { mask-image: var(--sprocket-svg); background:currentColor; }

⚑ The edges are the "warmth" of the brand. They are non-negotiable. A flat
section-color step instead of a tear/sprocket = brand failure.
```

---

## 4. TECHNICAL REQUIREMENTS

```
TECHNICAL REQUIREMENTS
  Stack:                Astro 5 (static / SSG; output: 'static')
                        React 18 islands (only for: cursor, dark-mode toggle,
                        intro brand-cycler, lottie host)
                        TypeScript strict (tsconfig "extends": "astro/tsconfigs/strict")
                        Tailwind CSS v4 (CSS-first config in app.css with @theme)

  Animation:            GSAP 3.12+ (registerPlugin ScrollTrigger, SplitText if licensed,
                        otherwise vendored split-by-character helper)
                        lottie-web 5.12+ for hero/footer character (lazy-loaded;
                        client:visible directive on the Astro island)
                        prefers-reduced-motion: a single guard at GSAP boot —
                        if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
                          gsap.globalTimeline.timeScale(1000); ScrollTrigger.disable();
                        } — collapses all motion to instant, but keeps layout intact.

  Scroll:               Lenis 1.1+ for smooth scroll. Mount in BaseLayout root.
                        Bridge to GSAP via:
                          lenis.on('scroll', ScrollTrigger.update);
                          gsap.ticker.add((time) => lenis.raf(time * 1000));
                          gsap.ticker.lagSmoothing(0);
                        Disable Lenis when reduced-motion preferred.

  Animation Lifecycle:  Inside each interactive React island, use:
                          useGSAP(() => { /* timeline setup */ }, { scope: ref });
                        (from @gsap/react). Returns auto-cleanup; no manual revert.
                        For Astro static pages, wrap GSAP in:
                          <script>
                            const ctx = gsap.context(() => { /* setup */ });
                            // Astro view-transition cleanup:
                            document.addEventListener('astro:before-swap', () => ctx.revert());
                          </script>

  Scroll Trigger Setup: Per-section pattern:
                          gsap.from('.intro__copy .anim-line', {
                            yPercent: 60, opacity: 0, duration: 0.7,
                            ease: 'quart.out', stagger: 0.08,
                            scrollTrigger: { trigger: '.intro', start: 'top 80%', once: true }
                          });
                        Outro parallax uses scrub:true; everything else once:true.

  Hover Implementation: CSS transitions are the default for hover (transform,
                        letter-spacing, opacity). GSAP only when the hover state
                        needs to chain multiple elements (e.g., footer plane+arrow).
                        DO NOT use CSS :hover for the custom-cursor reactions —
                        those are JS-driven via data-cursor-* attrs so the cursor
                        can lead the visual change.

  Custom Cursor:        React island (client:idle). Implementation outline:
                          const target = useRef({x:0, y:0});
                          const current = useRef({x:0, y:0});
                          useEffect(() => {
                            const onMove = (e) => { target.current = {x:e.clientX, y:e.clientY}; };
                            window.addEventListener('pointermove', onMove);
                            const tick = () => {
                              current.current.x += (target.current.x - current.current.x) * 0.15;
                              current.current.y += (target.current.y - current.current.y) * 0.15;
                              cursorRef.current.style.transform =
                                `translate3d(${current.current.x-60}px, ${current.current.y-60}px, 0)`;
                              raf = requestAnimationFrame(tick);
                            };
                            tick();
                            return () => { cancelAnimationFrame(raf); window.removeEventListener(...); };
                          }, []);
                        Hide on touch devices: `@media (pointer: coarse) { .cursor { display:none; } }`
                        Restore native cursor: `html { cursor: auto; }` — DO NOT cursor:none, that
                        breaks accessibility. Native cursor + custom dot coexist.

  Font Loading:         Google Fonts (initial — swap to Pangram Pangram licensed if available):
                          Newsreader: 300, 300italic, 400, 400italic
                          Geist Sans: 400, 500
                          Geist Mono: 400
                        Use astro:assets / Fontsource for self-hosted (preferred) — eliminates
                        third-party request and FOUT. Set font-display: swap. Preload the
                        Newsreader 400 woff2 in BaseLayout <head>.

  Image Sources:        For development placeholders BEFORE Sean's real assets exist:
                          - Hero character: hand-drawn SVG (commission or generate; reference
                            the mynrd hero/footer character style)
                          - Case-study tiles: Unsplash queries for stand-ins —
                            "minimal product UI screenshot", "abstract editorial design",
                            "design tool interface". Aesthetic: high-contrast, isolated subject
                            on neutral bg, NO Unsplash author watermarks visible.
                          - Decorative SVGs (registration mark, light bulb, pencil, paper plane,
                            saxophone-style flourishes): hand-drawn ink line, no fill, ~80–100px,
                            stroke-width 2 at 100px viewport (use `vector-effect:non-scaling-stroke`).
                        Replace ALL placeholders with Sean's real project frame stills before launch.
                        Real assets directory: /public/work/[slug]/{cover.jpg, cover.mp4, cursor-preview.jpg}

  Accessibility:        - Color contrast must clear WCAG AA in BOTH modes. Verify Ink #0A3E42 on
                          #FFF9F0 (passes ~7:1) and #FFF9F0 on #0A0E0F (passes).
                        - All decorative SVGs must have `aria-hidden="true"`.
                        - All character illustrations must have meaningful alt text or aria-label.
                        - The custom cursor MUST NOT replace the system cursor; it sits ON TOP.
                        - The frame-counter labels must use real text (not images), so screen
                          readers announce them.
                        - prefers-reduced-motion handled at GSAP boot (see Animation row).
                        - Mailto link must work without JS.

  Performance:          - Astro builds static HTML; first paint goal < 1s on 3G fast.
                        - Hydrate islands at the latest reasonable directive: client:idle for
                          cursor/toggle/cycler; client:visible for the hero Lottie.
                        - Case-study videos: <video preload="none" poster="cover.jpg" muted loop
                          playsinline>; play via IntersectionObserver when within 50% of viewport.
                        - Images: Astro <Image /> with format="webp" + width descriptors.
                        - Font woff2 only; avoid woff/ttf fallbacks.
                        - Lighthouse Performance target: 95+ desktop, 90+ mobile.

  File Structure:       /
                        ├── astro.config.mjs (output:'static', integrations:[react, tailwind])
                        ├── src/
                        │   ├── layouts/BaseLayout.astro          (Lenis, theme, fonts, frame)
                        │   ├── pages/index.astro                 (composes all 6 sections)
                        │   ├── components/
                        │   │   ├── Hero.astro                    (sticky pin + title + lottie + circle)
                        │   │   ├── Intro.astro                   (manifesto paragraph)
                        │   │   ├── BrandCycler.tsx               (React island, intro parens)
                        │   │   ├── Work.astro                    (case-study grid)
                        │   │   ├── About.astro                   (manifesto + decorative SVGs)
                        │   │   ├── Outro.astro                   (closing line + marquee)
                        │   │   ├── Footer.astro                  (mailto + meta + character)
                        │   │   ├── Cursor.tsx                    (React island, fixed cursor)
                        │   │   ├── DarkModeToggle.tsx            (React island, frame-tick chip)
                        │   │   ├── SectionEdge.astro             (torn-paper / sprocket reuse)
                        │   │   └── FrameNumber.astro             (01A · LABEL utility)
                        │   ├── lib/gsap.client.ts                (registers plugins, sets reduce-motion)
                        │   ├── lib/lenis.client.ts               (smooth-scroll bridge)
                        │   └── styles/app.css                    (Tailwind v4 @theme + tokens)
                        ├── public/
                        │   ├── lottie/hero-animator.json
                        │   ├── lottie/hero-tech.json
                        │   ├── img/edges/tear-*.png
                        │   ├── img/edges/sprocket-*.svg
                        │   └── work/[slug]/*
                        └── package.json
```

---

## 5. EXECUTION DIRECTIVE

> *Do not build a portfolio; build a pencil-test of a person, mounted in a Vercel-grade frame. Every section is one cel; every scroll is one frame. The goal is not that a recruiter says "nice site" — it is that a recruiter says "I can see how this person thinks."*
