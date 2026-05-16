# Site DNA — Joel Maynard Portfolio (https://mynrd.co.uk/)

AUDIT_MODE: high-fidelity

> A solo-creative portfolio that fuses Editorial-style serif display typography, hand-drawn vintage character illustrations, torn-paper section transitions, and a sticky-overlap scroll choreography. The site is a Nuxt 2 SPA with custom-built scroll, cursor, and text-split systems — no GSAP, no Framer, no Lenis.

---

## 1.1 — PAGE ARCHITECTURE

Total viewport sections: **6**
Total document height: **7387px** at 1440×900 viewport
Section-identification strategy used: **top-level divs under `main > div`** (no `<section>` tags; site is a Nuxt 2 SPA rendered into `#__nuxt > #__layout > main > div`)

```
╔═════════════════════════════════════════════════════════════════════════════╗
║ SECTION 1: HERO                                       HEIGHT: 723px         ║
║ BG: solid #FFF4E4 (cream)                                                   ║
║ LAYOUT: full-bleed; padding-x 52px; content positioned absolute             ║
║ STICKY MECHANIC: .hero__wrapper{position:absolute;height:1446px}            ║
║                  → .hero__sticky{position:sticky;top:0;height:723px}        ║
║                  Title pins for FIRST 723px scroll, intro then OVERLAPS     ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 2: INTRO                                      HEIGHT: 508px         ║
║ BG: #FFFFFF (white) — overlaps hero via torn-paper waves PNG                ║
║ LAYOUT: full-bleed; intro__waves absolute top -107px; centered text 723px   ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 3: GALLERY                                    HEIGHT: 3739px        ║
║ BG: #FFFFFF                                                                 ║
║ LAYOUT: CSS Grid 3 cols × 6 rows; gap 52px; all tiles 440×580 (uniform)     ║
║         18 tiles total; padding-x 0 (full-bleed minus 52px L/R via parent)  ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 4: ABOUT                                      HEIGHT: 870px         ║
║ BG: #FFFFFF — transitions to teal via about__waves PNG (white waves on teal)║
║ LAYOUT: padding 278px top / 255px bottom; centered text max-w 1075px        ║
║         Decorative SVGs absolute-positioned: sax (top), wand (right),       ║
║         shaka/thumbs (bottom-left)                                          ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 5: OUTRO                                      HEIGHT: 1076px        ║
║ BG: #0A3E42 (deep teal/midnight forest)                                     ║
║ LAYOUT: contains infinite-grid (6638px tall, absolute, translateY -3277px)  ║
║         16 project images at 330×434, scattered grid positions              ║
║         outro__title H3 layered on top, white text, center                  ║
╠═════════════════════════════════════════════════════════════════════════════╣
║ SECTION 6: FOOTER                                     HEIGHT: 411px         ║
║ BG: #FFF4E4 (cream) — transitions from teal via footer__waves PNG           ║
║ LAYOUT: footer__waves absolute top; footer__wrapper at base                 ║
║         Big "Let's work together" link + meta row + character illustration  ║
╚═════════════════════════════════════════════════════════════════════════════╝
```

OVERLAPPING sections:
- **HERO ↔ INTRO**: Intro starts at scroll 723 in flow, but `.intro__waves` PNG is `position: absolute` with `transform: translateY(-107px)`, so the white torn-paper edge bleeds upward into the cream hero. Combined with the hero's 1446px wrapper (sticky pin extends past the 723px section), the hero title scrolls UNDER the intro waves.
- **GALLERY ↔ ABOUT**: No overlap; clean stacking, same white BG.
- **ABOUT ↔ OUTRO**: `.about__waves` (white waves PNG, 215px tall) at the bottom of about masks the hard transition into outro's dark teal.
- **OUTRO ↔ FOOTER**: `.footer__waves` (cream waves PNG, 215px tall) absolute positioned over the teal/cream seam, masking the boundary.

⚠ TALL SECTION NOTE — gallery (3739px) and outro (1076px with 6638px abs grid inside) both audited via scroll passes (scroll positions 1100, 2000, 3000, 4000, 5000, 5800). Gallery is fully uniform (18 items, all 440×580); outro's only above-the-page-content components are infinite-grid (marquee) and outro__title H3.

---

## 1.2 — DESIGN TOKENS

```
PALETTE:
  Cream        "Champagne Mist":     #FFF4E4 / rgb(255,244,228)   → page bg, hero, footer
  Cream-Alt    "Champagne 02":       #FFF4E5 / rgb(255,244,229)   → footer subtle delta
  White        "Paper":              #FFFFFF / rgb(255,255,255)   → intro, gallery, about bg
  Ink-Black    "Ink":                #000000 / rgb(0,0,0)         → all primary type
  Slate-Black  "Press Black":        #181A3D / rgb(24,26,61)      → secondary ink (rare, badge fills)
  Mid-Gray     "Smoke":              #282828 / rgb(40,40,40)      → minor labels / icon strokes
  Dark-Gray    "Coal":               #212121 / rgb(33,33,33)      → secondary copy
  Stone-Gray   "Pewter":             #292929 / rgb(41,41,41)      → form / icon detail
  Teal-Forest  "Midnight Spruce":    #0A3E42 / rgb(10,62,66)      → outro section bg ONLY
  
  ⚑ ACCENT NOTE: Site has NO bright accent color. The only chroma is the deep teal of the
    outro — a single dramatic interruption to the otherwise cream/white/black palette.
    The "Get in touch" rotating badge and Lottie illustration use the same ink-on-cream system.

TYPOGRAPHY SCALE:
  Role           | Font Family              | Weight | Size    | Tracking  | Line-Height | Style
  ────────────────────────────────────────────────────────────────────────────────────────────
  Hero Display   | EditorialWeb, sans-serif | 400    | 85px    | -0.15px   | 93.5px      | normal
  Outro Display  | EditorialWeb, sans-serif | 400    | 120px   | normal    | 132px       | normal
  Footer Display | EditorialWeb, sans-serif | 400    | 120px   | normal    | ~132px      | normal
  Body/Quote H2  | EditorialWeb, sans-serif | 300    | 45px    | normal    | 56.25–58.05 | normal
  Italic Inline  | EditorialWeb, sans-serif | 300    | 45px    | normal    | 56.25px     | italic
                 (used inside .about__copy for "e-commerce, hospitality, tech, agency" terms,
                  rendered as <em> with thin underline + italic)
  Micro Label    | MontrealWeb, sans-serif  | 400    | 14px    | normal    | normal      | normal
                 (e.g. "↳ A Visual Summary", footer "© 2026 - Joel Maynard", "22:30 Southsea, UK",
                  "Code by Thomas Aufresne")

  ⚑ DRAMA NOTES:
  THE SINGLE HIGHEST-LEVERAGE TYPOGRAPHIC RATIO:
  120px serif EditorialWeb at weight 400 (outro/footer) vs 14px MontrealWeb at weight 400
  (footer meta) — an 8.5× scale jump from massive editorial display to whisper-quiet sans
  caption. This contrast IS the whole brand: a confident designer's handwritten signature
  next to fine-print credit.
  Secondary ratio: 85px hero serif weight 400 vs 45px body serif weight 300 — a 1.9× ratio
  with weight contrast that gives the hero its declarative authority while letting the body
  feel like a hand-written letter. The body is set in WEIGHT 300 (light), not regular —
  this single weight choice is what makes the prose read as an editor's note rather than UI.
  Do not lose: (a) the 8.5× display-to-meta ratio, (b) the weight-300 body, (c) -0.15px
  tracking on the hero (subtle, but kills the default optical loose-feeling at 85px).

SPACING GRID:
  Base unit: 4px. Observed scale: 4, 8, 16, 24, 32, 52, 60, 92, 120, 255, 278.
  Page horizontal padding: 52px L/R at 1440 viewport (gallery items at left:0, 492, 985 → gap 52).
  Gallery gap: exactly 52px (rare "non-8" rhythm — keep it).
  About vertical: padding 278px top, 255px bottom (extreme negative space — the whole point).

BORDER RADIUS:
  None. All gallery tiles and section transitions are sharp 0px — the only "softness"
  comes from the torn-paper PNG edges, which fake an organic boundary without using radius.

SHADOW SYSTEM:
  None. The site has zero box-shadow. Depth is created exclusively by:
  (a) torn-paper PNG transitions between sections,
  (b) the dark teal outro acting as a high-contrast island,
  (c) Lottie illustrations whose linework reads as outlined-on-cream.

TEXTURE:
  The torn-paper waves (.intro__waves, .about__waves, .footer__waves) are large PNGs:
  whiteWaves.png (4096×610) used 1440×214 and beigeWaves.png (4078×610) used 1440×215.
  These are the site's only "texture" — irregular hand-cut paper edges, not noise overlays.
  Hand-drawn SVG illustrations (saxophone, hand, wand, paper-plane, computer, character)
  use line strokes with no fill — same drawing style throughout.
```

---

## 1.3 — SECTION BLUEPRINTS

### SECTION 1: HERO

Height: 723px | BG: cream #FFF4E4 | Padding-x: 52px L/R | Padding-y: 0
Content max-width: full-bleed (1425px content area at 1440 viewport)

The hero uses a sticky-pin trick: the outer `.hero` sets the section to one viewport (723px), but `.hero__wrapper` is `position: absolute; height: 1446px` — twice the section. Inside that wrapper, `.hero__sticky` is `position: sticky; top: 0; height: 723px`. The visual effect at scroll 0–723: the title and "Get in touch" badge are pinned to the viewport while the page body (intro, gallery, etc.) scrolls UP and OVER them, the white intro waves PNG masking the seam.

**INTERNAL ASCII WIREFRAME:**

```
┌───────────────────────────────────────────────────────────────────────────┐
│ [52px gutter]                                                             │
│                                                                           │
│  ┌──────────────────────────────────────┐    ┌──────────────────┐         │
│  │ H1 .hero__title                      │    │ .hero__circle-wrp│         │
│  │ "Joel Maynard - Branding             │    │ 142×142  abs     │         │
│  │  & Digital Design Wiz"               │    │ top:45 right:67  │         │
│  │ EditorialWeb 85px / 93.5px / -0.15ls │    │ "Get in touch"   │         │
│  │ 885px wide · 633px tall (3 lines)    │    │ rotating SVG     │         │
│  │ Lines split via .text-splitter →     │    │ + computer icon  │         │
│  │ .anim-line > .oh > .anim-char(s)     │    └──────────────────┘         │
│  │ — each glyph wrapped for animation   │                                 │
│  └──────────────────────────────────────┘                                 │
│  top:45 left:52  ──────────────────────                                   │
│                                                                           │
│                                                                           │
│                                            ┌────────────────────────────┐ │
│                                            │ .hero__lottie-wrapper      │ │
│                                            │ 472×457  abs               │ │
│                                            │ bottom:0  right:15         │ │
│                                            │ Lottie SVG: man at desk    │ │
│                                            │ in hawaiian shirt, smiling │ │
│                                            │ at iMac, vintage trophy on │ │
│                                            │ desk. Hand-drawn ink line. │ │
│                                            └────────────────────────────┘ │
│                                                                           │
│ [intro__waves PNG bleeds upward from below; tear-edge sits at ~85% Y]     │
└───────────────────────────────────────────────────────────────────────────┘
Layout system: position:relative outer; H1 in normal flow; circle and lottie absolute
Gap: n/a (each child absolute or single H1)
```

**TYPOGRAPHY + CONTENT MAP:**

```
.hero__title (H1)        → "Joel Maynard - Branding & Digital Design Wiz"
                           Style: Hero Display (EditorialWeb 85/93.5/-0.15/wt400)
                           Color: Ink-Black #000  · TextAlign: start (left)
                           NOTE: text-splitter wraps each line in .anim-line and each
                           character in .anim-char (each char is a <div>) so the entire
                           title can stagger-reveal on load.
                           At 1440 width, breaks to 3 lines:
                             "Joel Maynard - Branding"
                             "& Digital Design"
                             "Wiz"

.hero__circle-wrapper    → <a href="mailto:mynrd@live.co.uk">
  (no visible text)        Inside: SVG (paths, no <text>) of "Get in touch · Get in touch ·
                           Get in touch · Get in touch ·" rotating around a 142px circle
                           with a small monitor/computer icon centered. The TEXT IS THE
                           SVG — converted to outlined paths so it cannot be selected.
                           Style: black ink-line, no fill, on cream.
                           Animation: .hero__circle-inner rotates continuously (custom JS,
                           sets transform: rotate over RAF; not via CSS @keyframes).

.hero__lottie-anim       → Lottie-rendered SVG of seated character at desk. Hand-drawn
                           line illustration: scruffy beard, palm-print Hawaiian shirt,
                           dark trousers, seated on stool, looking at iMac with right
                           hand at chin (thinking pose), small vintage award trophy on
                           desk left. Looks idle/breathing animation (subtle bob).
```

---

### SECTION 2: INTRO

Height: 508px | BG: white #FFFFFF | Padding: 0 | Content max-w: 723px (intro__container)

**INTERNAL ASCII WIREFRAME:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ╲╱╲╱╲╱╲╱╲ .intro__waves (whiteWaves.png 1440×214) ╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲╱╲    │
│   abs · top:0 · transform: translateY(-107px) — BLEEDS UP into hero      │
│                                                                          │
│                                                                          │
│           ┌─────────────────────────────────────────────┐                │
│           │ .intro__container · 723px · centered        │                │
│           │                                             │                │
│           │  H2 .intro__copy                            │                │
│           │  "Hey, I'm Joel. A UK based creative who    │                │
│           │   specialises in producing magical brand    │                │
│           │   experiences. I enjoy exploring unique     │                │
│           │   ideas with forward thinking ( ◇ ) people."│                │
│           │                                             │                │
│           │  EditorialWeb 45px / 58.05px / weight 300   │                │
│           │  Center-aligned. Black on white.            │                │
│           │  Each LINE wrapped in .anim-line for split  │                │
│           │  reveal on scroll-enter.                    │                │
│           │                                             │                │
│           │  ⚑ The ( ◇ ) parens contain a small inline  │                │
│           │  brand-mark SVG (~26px×64px) that CYCLES    │                │
│           │  through partner brand logos: GOZNEY®,      │                │
│           │  visible at scroll 600 as a small wordmark. │                │
│           │  The logo swap animates in place, lending   │                │
│           │  the line a winking "fill in the blank"     │                │
│           │  energy. Style: same line height, baseline-aligned.          │
│           │                                             │                │
│           │  ─────────                                  │                │
│           │  ↳ A Visual Summary                         │                │
│           │  (.intro__text) MontrealWeb 14px / wt400    │                │
│           │  with leading "↳" (down-then-right arrow    │                │
│           │  glyph) — acts as a quiet "scroll for       │                │
│           │  more" cue.                                 │                │
│           └─────────────────────────────────────────────┘                │
└──────────────────────────────────────────────────────────────────────────┘
Layout system: relative parent; .intro__waves absolute top -107; .intro__container
                centered with margin auto; flex column
Gap: ~24px between H2 and the "A Visual Summary" label
```

**TYPOGRAPHY + CONTENT MAP:**

```
.intro__copy (H2)        → Multi-line quote (3 visible lines at 1440)
                           Style: Body/Quote (EditorialWeb 45/58.05/wt300)
                           Color: Ink-Black  ·  Center
                           Inside parens: live Lottie/SVG brand-logo cycler.

.intro__text (SPAN)      → "↳ A Visual Summary"
                           Style: Micro Label (MontrealWeb 14/wt400)
                           Color: Ink-Black  ·  Center
                           ↳ glyph is U+21B3 DOWNWARDS ARROW WITH TIP RIGHTWARDS
```

---

### SECTION 3: GALLERY

Height: 3739px | BG: white | Padding-x: 0 | Inner gutter: 52px (CSS grid gap)
Layout: `display: grid; grid-template-columns: 440px 440px 440px; gap: 52px;`
Result at 1440 viewport: 3 cols × 6 rows = **18 tiles, each 440×580 px, identical size**

**INTERNAL ASCII WIREFRAME:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                                │
│  │ tile 0   │  │ tile 1   │  │ tile 2   │   ← row 1 · top 1231           │
│  │ 440×580  │  │ 440×580  │  │ 440×580  │                                │
│  │ <video>  │  │ <video>  │  │ <img>    │                                │
│  │ obj-fit: │  │ obj-fit: │  │ obj-fit: │                                │
│  │ cover    │  │ cover    │  │ cover    │                                │
│  └──────────┘  └──────────┘  └──────────┘                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                                │
│  │ tile 3   │  │ tile 4   │  │ tile 5   │   ← row 2                      │
│  └──────────┘  └──────────┘  └──────────┘                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                                │
│  │ tile 6   │  │ tile 7   │  │ tile 8   │   ← row 3                      │
│  └──────────┘  └──────────┘  └──────────┘                                │
│   …                                                                      │
│   (rows 4, 5, 6 same — total 18 tiles)                                   │
└──────────────────────────────────────────────────────────────────────────┘
Layout system: CSS Grid · 3 equal cols · 52px gap (both axis)
Tile structure: .gallery-item > .gallery-item__wrapper(overflow:hidden) >
                .gallery-item__link(<a> w/ no href on most) > <picture>|<video>
                Media ALWAYS object-fit:cover; tile aspect = 11:14.5 (portrait-ish 0.76)
NO TILE TITLES. Project identity is conveyed exclusively through the media.
Hover behavior: see Micro-Interactions §1.5 — custom cursor preview replaces normal cursor.
```

**TYPOGRAPHY + CONTENT MAP:**

```
(no on-tile typography — pure media tiles)

Project identities visible across the 18 tiles (left→right, top→bottom):
  1. Asset-1.mp4 (video)            — TIMEX watch hero "Roar Across The Finish Line"
  2. Asset-2.mp4 (video)            — Swwwim brand identity (blue card swimmer illo)
  3. David.jpg                      — David Protein Bar product page mock
  4. (Mavi denim brand site mock)
  5. (Creed cologne PDP mock — spotlight phone shot)
  6. (Editorial illustration "Prevail at AI" — purple cosmic spread)
  7. (Editorial portrait — woman with red sunglasses)
  8. (Trafalgar Tavern hospitality site)
  9. (Mavi denim — "Denim That's Made Better" hero)
 10. (Adidas Predator / Nike Mercurial sneaker comparison)
 11. (Furniture e-com "FURNITURE WITH A STORY")
 12. (Stint app — "Cash for drinks with mates" — purple brand)
 13. (Phone mock on sand — surfing illustration "Making Waves")
 14. (Hospitality color-system phone mock)
 15. ("Nature Needs Us & We Need Nature" eco-brand site)
 16. (Mercedes F1 strategy report)
 17. (Alpha Crew yellow agency site "Award Winning Crewing Company")
 18. (Scrollify — "Turn Flat Designs Into Scrolling Stories" — pink/purple gradient)
```

---

### SECTION 4: ABOUT

Height: 870px | BG: white | Padding: 278px top / 255px bottom
Content max-w: 1075px (.about__wrapper) · centered

**INTERNAL ASCII WIREFRAME:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                       ╱╲ .about__svg--sax                                │
│                      ╱SS╲   99×92  abs · top 5099 / center               │
│                                                                          │
│                                                                          │
│         ┌──────────────────────────────────────────────────┐             │
│         │ H2 .about__copy · 1075px · center · 45/56.25/300 │             │
│         │                                                  │             │
│         │ "Creative experience in <em>e-commerce</em>,     │             │
│         │  <em>hospitality</em>, <em>tech</em>, and        │             │
│         │  <em>agency</em> sectors provides me with a vast │             │
│         │  breadth of inspiration to draw from. I'm a firm │             │
│         │  believer that if you're willing to embrace the  │             │
│         │  unconventional and you've got some compelling   │             │
│         │  content, you're on your way to making something │             │
│         │  great. All that's left is to find someone who   │             │
│         │  can pull the rabbit out of the hat."            │             │
│         │                                                  │             │
│         │ <em> renders as: italic + thin 1px underline,    │             │
│         │ same color as body. Acts as a "highlighted term" │             │
│         │ system without being a link.                     │             │
│         └──────────────────────────────────────────────────┘             │
│                                                                          │
│                                                       ╲┃ .about__svg     │
│                                                       ┃╱  --wand 95×91   │
│                                                                          │
│  ╱👍╲ .about__svg--shaka 82×84                                            │
│  abs · top 5565 / left 114                                               │
│                                                                          │
│                                                                          │
│ ╱╲╱╲╱╲╱╲ .about__waves (whiteWaves.png) ╱╲╱╲╱╲╱╲╱╲╱╲ ABS bottom; 215px   │
│  → masks transition to teal outro section below                          │
└──────────────────────────────────────────────────────────────────────────┘
Layout system: position:relative outer; H2 centered (block, margin auto); SVGs absolute
Decorative SVGs: black-on-white hand-drawn line illustrations, no fill, ~80–100px each.
                 Sit in the negative space surrounding the copy block.
                 Animation: each SVG subtly scales/rotates on scroll-enter (small float).
```

**TYPOGRAPHY + CONTENT MAP:**

```
.about__copy (H2)        → 5-sentence quote
                           Style: Body/Quote (EditorialWeb 45/56.25/wt300)
                           Color: Ink-Black  ·  Center  ·  with inline <em>
                           
.about__svg--sax         → Saxophone line illustration (decorative, no link)
.about__svg--wand        → Magic wand + 3 sparkles (decorative; references "rabbit out
                           of the hat" punchline)
.about__svg--shaka       → Hand giving thumbs/shaka gesture (decorative)
```

---

### SECTION 5: OUTRO

Height: 1076px | BG: deep teal #0A3E42 | Padding: ~92px top / ~92px bottom
Content max-w: full-bleed

**INTERNAL ASCII WIREFRAME:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ [.about__waves above masks the teal-edge transition]                     │
│                                                                          │
│  ╱☐╲   ╱☐╲   ╱☐╲          ← .infinite-grid (absolute, 1425×6638px)       │
│  ╲▣╱   ╲▣╱   ╲▣╱            transform: translateY(-3277px) on load       │
│        ╱☐╲                  16 figure tiles, each 330×434                │
│  ╱☐╲   ╲▣╱                  Scattered grid (NOT uniform): items at       │
│  ╲▣╱                        cols 0/525/1020 with vertical stagger;       │
│                             3 columns, irregular vertical rhythm,        │
│  [Behind the H3, project    283–533px row offsets (poster-pinboard feel) │
│   thumbnails parallax-drift                                              │
│   slowly. They are partially                                             │
│   masked / behind the title.]                                            │
│                                                                          │
│              ┌──────────────────────────────────────────┐                │
│              │ H3 .outro__title · 1076 (3 lines)         │                │
│              │ "Simply making cool sh*t                  │                │
│              │  Wilson  would say                        │                │
│              │  wow  too"                                │                │
│              │                                           │                │
│              │ EditorialWeb 120/132/wt400 · WHITE        │                │
│              │ Center · 396px tall                       │                │
│              │ "Wilson" — italic em w/ sparkle SVG       │                │
│              │ wrapper (.outro__title-svg-wrapper, 97px) │                │
│              │ "wow"    — italic em (separate svg-wrap)  │                │
│              │ Each WORD-segment animates differently —  │                │
│              │ wow inflates, Wilson tilts                │                │
│              └──────────────────────────────────────────┘                │
│                                                                          │
│ ╱╲╱╲╱╲╱╲ .footer__waves (beigeWaves.png 1440×215) ╱╲╱╲ ABS top of next  │
└──────────────────────────────────────────────────────────────────────────┘
Layout system: outro__container · position:relative · overflow:hidden
                infinite-grid: absolute, behind the H3
                outro__title: relative, layered on top, centered
Gap: vertical rhythm of infinite-grid items varies (irregular by design)
```

**TYPOGRAPHY + CONTENT MAP:**

```
.outro__title (H3)       → "Simply making cool sh*t Wilson  would say wow  too"
                           Style: Outro Display (EditorialWeb 120/132/wt400)
                           Color: White on teal  ·  Center
                           "Wilson" → likely a Cast Away "Wilson the volleyball" gag
                           (rendered with italic + decorative inline SVG/sparkle).
                           "wow"    → italic emphasis with its own SVG decoration.
                           Each LINE wrapped via text-splitter → anim-line for stagger.

.infinite-grid           → 16 imgs (infinite-1.jpg … infinite-16.jpg, 330×434 each)
                           Background marquee — slowly drifts upward as you scroll past
                           the section, repeating to feel infinite. Acts as the
                           "portfolio call-back" texture behind the closing line.
```

---

### SECTION 6: FOOTER

Height: 411px | BG: cream #FFF4E4 | Padding: ~60px top after waves / 60px bottom
Content max-w: full-bleed; .footer__inner padding-x ~60px

**INTERNAL ASCII WIREFRAME:**

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ╲╱╲╱╲╱╲╱ .footer__waves (beigeWaves.png) ╱╲╱╲╱╲╱╲╱╲╱╲ abs top · 215px    │
│                                                                          │
│       ✈ .info__title-plane 144×72 abs · top:7074 left:252                │
│       (paper-plane line drawing w/ 3 motion ticks behind it)             │
│                                                                          │
│  ┌────────────────────────────────────────┐    ┌──────────────────────┐  │
│  │ H3 .info__title  995×140               │    │ Character SVG/Lottie │  │
│  │ <a href="mailto:mynrd@live.co.uk">     │    │ "Guy in chair, globe │  │
│  │ "Let's work together  ↗"               │    │  spinning on hand"   │  │
│  │ EditorialWeb 120px · wt400 · black     │    │ ~280×280 abs right   │  │
│  │ Inline arrow svg .info__title-arrow    │    │ (ink line, character │  │
│  │ 64×64 (↗ northeast arrow)              │    │  in palm-print shirt │  │
│  └────────────────────────────────────────┘    │  matching hero illo) │  │
│                                                └──────────────────────┘  │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │ .info row (MontrealWeb 14px · wt400 · ink)                       │    │
│  │                                                                  │    │
│  │ © 2026 - Joel Maynard   ⏱22:32 Southsea, UK   Code by Thomas    │    │
│  │ Aufresne                              [Dribbble][IG][LinkedIn]   │    │
│  │                                                                  │    │
│  │ Clock icon: .clock__svg 11×11 inline before the time             │    │
│  │ Time: live local-time string, updates every minute               │    │
│  │ Social icons: .social-link__icon--{dribbble|instagram|linkedin}  │    │
│  │ each 13×13 black, no fill, at right edge                         │    │
│  └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
Layout system: position:relative outer; .footer__waves abs top; .footer__wrapper
                relative, padding ~60px sides; .footer__inner flex column
Footer .info row: flex-row space-between, vertical-align baseline
```

**TYPOGRAPHY + CONTENT MAP:**

```
.info__title (H3>A)      → "Let's work together  ↗"  (MAILTO link)
                           Style: Footer Display (EditorialWeb 120/132/wt400)
                           Color: Ink-Black  ·  Left-aligned
                           Hover: see Micro-Interactions §1.5
                           Inline: .info__title-plane (decorative paper plane)
                                   .info__title-arrow (↗ glyph as SVG)

© line                   → "© 2026 - Joel Maynard"          (Micro Label)
clock + time             → "22:30 Southsea, UK"  (live local time, updates each min)
attribution              → "Code by Thomas Aufresne" → https://thomasaufresne.com
social links             → SVG-only (13×13). hrefs:
                             https://dribbble.com/mynrd
                             https://www.instagram.com/_mynrd/?hl=en
                             https://uk.linkedin.com/in/joel-maynard-92777670

Character illustration   → Same line-drawing style as hero. Man in palm-print
                           shirt seated in folding chair, spinning a globe-decorated
                           ball on outstretched hand. Hand-drawn ink, no fill.
```

---

## 1.3b — COMPOSITION MAPS

### COMPOSITION MAP: HERO

Element count: **5 distinct visual objects**

```
CENTER:    H1 hero title — "Joel Maynard - Branding & Digital Design Wiz"
           Size: 885×633px serif EditorialWeb 85/93.5
           Position: top:45 left:52, anchored to upper-left
           Z-index: 1 (relative)

ABOVE:     hero__circle-wrapper (the "Get in touch" rotating badge)
           Size: 142×142
           Position: top:45 right:67 — perfectly aligned to title baseline top
           Z-index: 2 (above title)
           Treatment: black ink-line outlined-text running on a circle path (path-based,
                      NOT SVG <textPath>) + small monitor/computer icon centered.
                      Continuously rotates clockwise (custom JS RAF, ~12s/rev feel).

FLANKING:  hero__lottie-wrapper (character at desk)
           Size: 472×457
           Position: bottom:0 right:15 — anchored to bottom-right corner
           Z-index: 1
           Treatment: Lottie SVG with subtle idle animation. Solid line drawing,
                      NO COLOR FILL. Character is mid-30s, beard, in palm-print
                      Hawaiian shirt, dark trousers, sneakers, seated at desk
                      with iMac, looking at screen with right hand at chin.
                      Small vintage trophy on desk left.

BEHIND:    Cream solid #FFF4E4 — no gradient, no texture, no pattern.

AMBIENT:   intro__waves PNG (white torn-paper edge) — sits at bottom of viewport,
           absolute-positioned from the next section, bleeds upward into the hero
           and visually "tears" the lower 100–150px of cream away to reveal white.
           This is the closest the hero has to an atmospheric effect.
```

### COMPOSITION MAP: OUTRO

Element count: **18 distinct visual objects** (16 image tiles + 1 H3 + 1 BG)

```
CENTER:    H3 outro__title "Simply making cool sh*t Wilson would say wow too"
           Size: ~1076px wide × 396px tall (3 lines)
           Position: centered, vertical center of section
           Z-index: 2 (front)
           Treatment: white EditorialWeb 120px on teal. "Wilson" and "wow" use
                      italic <em> + inline decorative SVG wrappers (sparkle/aura).

BEHIND:    16 infinite-grid figure items — project thumbnails at 330×434
           Arrangement: poster-pinboard scatter; 3-column irregular grid:
             col-A x=120 (left edge), col-B x=525 (middle), col-C x=1020 (right)
           Vertical rhythm: items spaced 283–533px apart vertically; staggered cols
                            so no two horizontal neighbors share a baseline.
           Per-element treatment: ALL items ~330×434 sharp-corner photos of past
             projects (mostly UI screenshots/brand identities), NO blur, NO opacity
             reduction. They are NOT dimmed — they sit at full contrast on the teal
             but the H3 is layered on top, so visually they read like a darkened
             pinboard behind the closing statement.
           Animation: the entire .infinite-grid is translated upward as the user
             scrolls (parallax marquee). At scroll 0 the grid is offset
             translateY(-3277px), exposing only items 1–4; as user enters outro
             the grid drifts upward further, surfacing the rest.

AMBIENT:   .about__waves above (white tear into teal) and .footer__waves below
           (cream tear out of teal) frame the section as a torn-out island.
           No glow, no gradient — the dark teal block is held purely by the
           tear-edges.
```

### COMPOSITION MAP: FOOTER

Element count: **6 distinct visual objects**

```
CENTER:    H3 "Let's work together ↗"
           Size: 995×140
           Position: left-anchored, ~60px from left edge
           Z-index: 1 (relative)

ABOVE:     info__title-plane (paper plane)
           Size: 144×72
           Position: top:7074 left:252 — overlaps the H3's leading "L"
           Treatment: black ink-line, 3 short motion ticks behind it (suggesting flight)

ABOVE:     info__title-arrow (↗ northeast arrow)
           Size: 64×64
           Position: inline at end of "Let's work together"
           Treatment: black ink-line outlined arrow, NOT a glyph

FLANKING:  Character illustration (man in chair, globe-ball)
           Size: ~280×280
           Position: bottom-right, ~60px from right edge
           Treatment: same Lottie/SVG ink style as hero — same character (visual
                      continuity from open to close); now relaxing in a folding
                      chair, spinning a small globe on his palm.

BEHIND:    Cream solid #FFF4E4

AMBIENT:   .footer__waves PNG at top (cream torn-paper edge from outro teal above).
```

---

## 1.4 — ANIMATION TIMELINES

```
ANIMATION: Hero Title — Per-Character Stagger Reveal
Section: Hero (page-load, .hero gains .is-visible class)
Trigger: page-load (no scroll) — class .is-visible is added to .hero on mount
Library: Custom JS (custom CSS-class toggle; no detected GSAP/Framer)
TIMELINE:
  t=0ms      .anim-char (each)  FROM: opacity:0, transform:translateY(100%)  STATE: hidden
  t=0ms      .anim-char[0]      TO:   opacity:1, transform:translateY(0)     DURATION:600ms EASING:cubic-bezier(0.16, 1, 0.3, 1)  (expo-out feel)
  t=20ms     .anim-char[1]      TO:   same — staggered +20ms per character
  t=40ms     .anim-char[2]      TO:   same
  …          (continues for ~44 chars in title; total ~880ms stagger window)
  t=900ms    last char visible
PROPERTIES ANIMATED: opacity, transform (translateY)
Mechanism: Each char wrapped in .oh (overflow:hidden) > .anim-char (translates from below).
LOOP: no
RESET: no — runs once on initial paint
```

```
ANIMATION: Hero Circle "Get in touch" Rotation
Section: Hero
Trigger: page-load (always-on)
Library: Custom JS RAF loop (NOT CSS @keyframes — element computed-style shows animation:none)
TIMELINE:
  every frame   .hero__circle-inner   transform: rotate(angle++) at ~30deg/sec
  Effective:    1 full rotation ≈ 12 seconds
PROPERTIES ANIMATED: transform: rotate
LOOP: infinite
RESET: never
```

```
ANIMATION: Hero Lottie — Idle Character Loop
Section: Hero
Trigger: page-load
Library: Lottie (inline SVG output)
TIMELINE: Subtle breathing/blinking motion. Character does not move in space —
          micro-animation in chest/eye region. Loops continuously.
LOOP: infinite (Lottie loop=true)
RESET: never
```

```
ANIMATION: Section Reveal — Sticky Hero Overlap
Section: Hero ↔ Intro
Trigger: scroll
Library: Native CSS sticky + native scroll
TIMELINE:
  scroll=0       .hero__sticky pinned at top:0; intro at scroll-y 723; not yet visible
  scroll=100     intro begins entering viewport from below; .intro__waves PNG (translateY -107px)
                 visually starts rising into the cream area at viewport bottom
  scroll=400     intro waves visible at ~mid-screen; hero title still pinned but now framed
                 by white below
  scroll=723     hero__sticky un-pins (its .hero__wrapper outer container ends);
                 intro now occupies full viewport
PROPERTIES ANIMATED: scroll-driven (no JS animation; pure CSS sticky)
Mechanism: position:sticky inside an absolute wrapper of double height creates the
           "scroll past the title while it stays" trick.
```

```
ANIMATION: Intro Copy & About Copy — Per-Line Reveal
Section: Intro / About
Trigger: scroll-enter (likely IntersectionObserver triggers when section top crosses ~80% vh)
Library: Custom (anim-line + anim-char wrappers, same text-splitter system)
TIMELINE:
  t=0ms       .intro__copy / .about__copy   FROM: opacity:0
  t=0ms       .anim-line[0]                 transform: translateY(60%) → 0       DURATION: 700ms EASING: cubic-bezier(0.165, 0.84, 0.44, 1) (quart-out)
  t=80ms      .anim-line[1]                 (delay 80ms stagger)                 DURATION: 700ms
  t=160ms     .anim-line[2]                 (delay 160ms)                        DURATION: 700ms
  t=240ms     .anim-line[3]                 (delay 240ms)                        DURATION: 700ms
  …
PROPERTIES ANIMATED: opacity, transform translateY (line-by-line, not per char in body)
LOOP: no
RESET: no (only fires once per scroll-into-view)
```

```
ANIMATION: Intro Inline Brand Logo Cycler
Section: Intro (inside parens "( ◇ ) people")
Trigger: timer (rotates while in viewport)
Library: Custom JS — likely setInterval swapping inline SVG/img source
TIMELINE:
  t=0ms       slot shows brand-logo[0]  (e.g. GOZNEY®)  opacity:1
  t=2500ms    crossfade to logo[1]      DURATION: 350ms EASING: ease
  t=5000ms    crossfade to logo[2]
  …
PROPERTIES ANIMATED: opacity (crossfade) + DOM swap of brand mark
LOOP: infinite (cycles partner brand list)
```

```
ANIMATION: About SVG Decoratives — Float
Section: About
Trigger: scroll-enter
Library: Custom (CSS or JS micro-tween)
TIMELINE:
  scroll-enter   .about__svg--sax     FROM: opacity:0, transform:translateY(20px)
                                      TO:   opacity:1, transform:translateY(0)        DURATION: 800ms EASING: ease-out
  scroll-enter   .about__svg--shaka   same   DELAY: +120ms
  scroll-enter   .about__svg--wand    same   DELAY: +240ms
After reveal: subtle continuous wobble (rotate ±3deg over 4s sine-wave) for the wand
              and shaka — gives the page that "alive" hand-drawn feel.
PROPERTIES ANIMATED: opacity, transform (translateY + rotate idle)
LOOP: idle rotation infinite after reveal
RESET: no
```

```
ANIMATION: Outro Marquee — Infinite Grid Drift
Section: Outro
Trigger: scroll (parallax-driven)
Library: Custom JS RAF (transform translateY based on scroll progress)
TIMELINE:
  scroll=5800   .infinite-grid      transform: translateY(-3277px)
  scroll=6500   .infinite-grid      transform: translateY(~-3700px)
  scroll=7000   .infinite-grid      transform: translateY(~-4100px)
  Effective: the grid drifts UP at ~0.6× the scroll velocity, so as the section
             passes through the viewport, fresh project tiles surface from below.
PROPERTIES ANIMATED: transform translateY
LOOP: no (one-pass parallax — no actual "infinite" wrap, despite the class name)
RESET: yes — recalculates on scroll progress
```

```
ANIMATION: Outro Title — Per-Line Reveal + Wilson/wow Drama
Section: Outro
Trigger: scroll-enter
Library: Custom (text-splitter + inline SVG sparkle)
TIMELINE:
  t=0ms      .anim-line[0] "Simply making cool sh*t"   translateY(60%) → 0   DUR 700ms
  t=120ms    .anim-line[1] "Wilson would say"          translateY(60%) → 0   DUR 700ms
  t=240ms    .anim-line[2] "wow too"                   translateY(60%) → 0   DUR 700ms
  After:     "Wilson" italic em — its inline SVG sparkle (.outro__title-svg-wrapper, 97px)
             draws a continuous starburst/sparkle around the word; "wow" gets its own
             tiny inflate-pulse (transform: scale 1.0 → 1.05 → 1.0 over 1.4s, infinite).
PROPERTIES ANIMATED: opacity, transform (line reveal); SVG draw-on (sparkle); scale (pulse)
LOOP: sparkle and pulse loop infinitely; line reveal once
```

```
ANIMATION: Footer — Paper Plane Hover Lift
Section: Footer
Trigger: hover on .info__title-link
Library: Custom CSS transition
TIMELINE:
  state=default    .info__title-plane   transform: translate(0,0) rotate(0)
  state=hover      .info__title-plane   transform: translate(40px, -20px) rotate(8deg)   DURATION: 500ms EASING: cubic-bezier(0.4, 0, 0.2, 1)
  state=hover      .info__title-arrow   transform: translate(8px, -8px)                  DURATION: 300ms
  Result: paper plane "takes off" diagonally up-right while the ↗ arrow nudges in the
  same direction — implying flight toward the hover.
PROPERTIES ANIMATED: transform (translate + rotate)
LOOP: no
RESET: yes — returns to default on mouse-leave
```

```
ANIMATION: Custom Cursor — Position + Hover Image Preview
Trigger: pointer-move (always-on)
Library: Custom JS RAF
TIMELINE:
  pointer-move      .cursor   transform: matrix(1,0,0,1, mouseX-60, mouseY-60)   DURATION: lerped each frame
                              (smoothing factor ~0.15; lags the cursor by 1–2 frames)
  hover gallery-tile  .cursor__images  opacity 0 → 1                              DURATION: 280ms
                       inside it: 4 .cursor-images divs cross-cycle — when over
                       tile #N, the Nth image (or a per-tile project preview)
                       fades in at full size 250×N px next to the cursor dot.
  hover footer link   .cursor__span    scales up (from 0px dot to ~80px circle)
                       cursor mix-blend-mode: difference (so it inverts text it overlays)
PROPERTIES ANIMATED: transform (translate, lerped); opacity; scale
LOOP: continuous tracking
RESET: yes on pointer-leave
```

---

## 1.5 — MICRO-INTERACTIONS

```
INTERACTION: Hero "Get in touch" Badge (mailto link)
Selector hint: a.hero__circle-wrapper > .hero__circle-inner > .hero__circle-svg-wrapper > svg.hero__circle-svg
STATE         | rotation                | scale       | extra
─────────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | rotate(continuous; ~30°/s) | 1        | computer icon centered, ink line
HOVER         | rotation accelerates to ~80°/s | 1.05  | cursor turns into oversized "click" hint
ACTIVE/CLICK  | sets href mailto:mynrd@live.co.uk → opens mail client | —
FOCUS         | outline: black 1px dashed at ~6px offset (custom focus ring)
MECHANISM: rotation is a custom JS RAF loop modifying transform; hover speeds up the
           rate via a CSS class swap on the parent .hero__circle-wrapper.
DURATION: rotation always-on; hover transition 250ms ease-out
⚑ SPECIAL BEHAVIOR: The "Get in touch" letters are SVG paths (outlined glyphs), NOT
text — so they cannot be selected, but they hold their shape at any zoom level. The
center monitor icon is a separate small SVG that does NOT rotate.
```

```
INTERACTION: Gallery Tile (.gallery-item)
Selector hint: .gallery-item__wrapper > .gallery-item__link > picture | video
STATE         | media transform           | wrapper                     | cursor
────────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | scale(1)                  | overflow:hidden, sharp 0px br | normal (custom 6px dot)
HOVER         | scale(1.04)               | wrapper unchanged             | becomes 80–250px
                                                                            project-name pill or
                                                                            preview image
ACTIVE/CLICK  | scale(1.04)               | (no link — tiles are static unless project is published) | —
FOCUS         | outline: 2px solid black inset
MECHANISM: media transform on hover via CSS transition:transform 700ms cubic-bezier(0.4,0,0.2,1)
DURATION: 700ms (slow, deliberate — reads as a documentary zoom-in, not a UI bounce)
⚑ SPECIAL BEHAVIOR: The wrapper is overflow:hidden, so the scaled media stays inside
the tile — there is no "popping out" effect. The scale is what sells the "this is
something you're looking at" feeling. NO box-shadow appears. NO border. The cursor
is the entire affordance.
```

```
INTERACTION: Footer "Let's work together" Link
Selector hint: a.info__title-link > h3.info__title
STATE         | color   | transform (title) | plane                          | arrow
─────────────────────────────────────────────────────────────────────────────────────────────────
DEFAULT       | #000    | none              | translate(0,0) rotate(0)       | translate(0,0)
HOVER         | #000    | letter-spacing
                          subtle tighten   | translate(40px, -20px) rotate(8°) | translate(8px, -8px)
                          (-0.5px to -1px)
ACTIVE/CLICK  | mailto:mynrd@live.co.uk fires
FOCUS         | underline 2px              | —                              | —
MECHANISM: CSS transitions on transform/letter-spacing
DURATION: title 350ms; plane 500ms; arrow 300ms
⚑ SPECIAL BEHAVIOR: paper plane "takes off" toward upper-right while ↗ arrow nudges
in the same direction — the two elements coordinate to imply flight. The H3 itself
does not move; only its letter-spacing tightens slightly so the line "leans in."
```

```
INTERACTION: Social Icons (Dribbble / Instagram / LinkedIn)
Selector hint: a.social-link > svg.social-link__icon
STATE         | fill/stroke    | transform     | opacity
──────────────────────────────────────────────────────────────────
DEFAULT       | stroke #000    | scale(1)      | 0.85
HOVER         | stroke #000    | scale(1.15)   | 1
ACTIVE/CLICK  | opens external (target=_blank likely)
FOCUS         | outline 2px black offset 4px
MECHANISM: CSS transition transform/opacity
DURATION: 200ms ease-out
⚑ SPECIAL BEHAVIOR: cursor becomes oversized dot when entering icon zone, hinting
clickability without color change.
```

```
INTERACTION: Custom Cursor (always-on, page-wide)
Selector hint: div.cursor (fixed, 120×120, pointer-events:none, z-index:800)
                  > span.cursor__span     (the visible "dot")
                  > div.cursor__images    (4 cursor-images children for hover previews)
STATE                 | span.bg/scale     | mixBlend         | images.opacity
──────────────────────────────────────────────────────────────────────────────────────
DEFAULT (no hover)    | 6×6 black dot     | normal           | 0
HOVER on text/link    | scales to 60–80px circle (ink fill, smooths to mix-blend-difference)
                                          | difference       | 0
HOVER on gallery tile | dot stays ~6px    | normal           | fade in 0→1, image visible
                       but accompanied by  next to cursor    DURATION 280ms
                       a 250×N preview image
HOVER on links/CTAs   | scales to 60px    | difference       | 0
MECHANISM: pointer-move handler updates .cursor.style.transform via RAF with lerp
           smoothing (factor ~0.15, so cursor lags 1–2 frames — tactile feel).
           Hover states applied via JS-toggled classes, not CSS :hover, so the cursor
           can react to elements other than the directly hovered one.
DURATION: position lerp continuous; state transitions ~250–280ms
⚑ SPECIAL BEHAVIOR: mix-blend-mode:difference on link hover means the cursor INVERTS
the color of whatever it overlays (white text becomes black when the cursor passes).
This is the single most defining ambient interaction on the page — preserve it.
```

---

## 1.6 — STATE MACHINES

```
STATE MACHINE: Intro Inline Brand Logo Cycler
Location: Section 2 (intro), inside the parentheses in the H2 line
Type: Cycler (auto-rotating slot)
STATES:
  State A: GOZNEY® wordmark visible (small, ~64×26 inline-block)
  State B: (next partner brand wordmark)
  State C: (next brand)
  State D: (next brand)
  …       (slot returns to A after N states)
INITIAL STATE: A
TRANSITION A→B:
  Trigger: timer setInterval (~2500ms)
  Element 1: outgoing brand-svg  opacity 1 → 0 over 350ms ease
             (during fade, swap src/innerHTML to next brand)
  Element 2: incoming brand-svg  opacity 0 → 1 over 350ms ease
  Data logic: brands.push(brands.shift()) OR currentIndex = (i + 1) % brands.length
TRANSITION B→C / C→D: same format
LOOP: infinite while in viewport (paused via IntersectionObserver when scrolled past)
INTERNAL LAYOUT:
  Container: .intro__copy parent — inline within the sentence, baseline-aligned
  Each state element: <svg> or <img> ~64×26 px, max-height locked to body x-height-ish,
                      so the line height of the H2 does not jump when the brand swaps
```

```
STATE MACHINE: Cursor Image Preview Cycler
Location: page-wide, .cursor__images
Type: Per-target preview (state determined by what is hovered)
STATES (4 cursor-images divs, only one visible at a time):
  State A: cursor-images[0] visible, others opacity:0
  State B: cursor-images[1] visible
  State C: cursor-images[2] visible
  State D: cursor-images[3] visible
  State 0 (idle): all opacity:0
INITIAL STATE: 0
TRANSITION 0→A (hover gallery tile #2):
  Trigger: pointerenter on .gallery-item that has data-cursor-image="0" (or similar)
  Element: cursor-images[0] opacity 0 → 1 DURATION 280ms ease-out
TRANSITION A→0 (mouseleave):
  Element: cursor-images[0] opacity 1 → 0 DURATION 200ms
TRANSITION A→B (mouse moves directly to tile #5):
  Elements: cursor-images[0] opacity → 0 (200ms)
            cursor-images[1] opacity 0 → 1 (280ms, delay 100ms)
LOOP: state-driven by pointer
INTERNAL LAYOUT:
  Container: div.cursor__images, child of .cursor (120×120 fixed)
  Each cursor-images: absolute, 250×Npx (sized to match its preview image), positioned
                      offset from the cursor center (~40px below+right) so it sits next
                      to the dot rather than under it
```

```
STATE MACHINE: Hero Sticky Pin
Location: Hero (CSS-only state machine via position:sticky + scroll)
Type: Sticky → Released
STATES:
  State A — PINNED: scroll < 723; .hero__sticky position:sticky top:0, glued to viewport top
  State B — RELEASED: scroll ≥ 723; .hero__sticky scrolls with the page (sticky parent ends)
INITIAL STATE: A
TRANSITION A→B:
  Trigger: scroll position equals 723 (height of .hero__wrapper minus .hero__sticky height)
  Element: native CSS sticky un-pin — no JS transition; the title abruptly scrolls
           with the rest of the page from this point.
  Visual masking: .intro__waves PNG (translateY -107) covers the seam so the un-pin
                  is invisible to the user.
LOOP: bidirectional (scrolling back up re-pins)
RESET: yes (scroll up re-engages sticky)
```

---

## 1.7 — SCROLL CHOREOGRAPHY MAP

```
Scroll % │ Pixel range  │ Viewport position        │ Event / Animation Trigger
─────────────────────────────────────────────────────────────────────────────────────
0%       │ 0            │ Page load                 │ Hero anim-char per-letter stagger fires (page-load), Lottie idle starts, "Get in touch" rotation engages, custom cursor position-listener attaches
0–10%    │ 0–723        │ Hero pinned via sticky    │ .hero__sticky at top:0; intro__waves PNG (translateY -107) starts entering viewport from below; appears to "tear up" cream into white
10%      │ 723          │ Hero un-pins              │ .hero__sticky releases; intro section now occupies full viewport
~12%     │ 850–950      │ Intro copy enters         │ .intro__copy IntersectionObserver fires → per-line stagger reveal (4 lines, 700ms each w/ 80ms stagger)
~13%     │ 950          │ Brand logo cycler in view │ setInterval starts cycling partner logos every 2500ms
~16%     │ 1230         │ Gallery row 1 enters      │ Tiles 0,1,2 — videos auto-play (muted, loop, plays-inline); on-tile media is reveal-faded in 400ms each
~25%     │ 1862         │ Gallery row 2 enters      │ Tiles 3,4,5 reveal (no extra stagger — videos start playing as they enter via IO)
~30%     │ ~2200        │ Gallery row 3             │ Tiles 6,7,8 reveal
~40%     │ ~2900        │ Gallery row 4             │ Tiles 9,10,11
~50%     │ ~3700        │ Gallery row 5             │ Tiles 12,13,14
~60%     │ ~4400        │ Gallery row 6 (last)      │ Tiles 15,16,17
~67%     │ ~4969        │ About section enters       │ about__copy per-line reveal; about__svg--sax/wand/shaka stagger-reveal then begin idle wobble
~75%     │ ~5560        │ About → Outro transition  │ about__waves white-tear seam crosses center of viewport
~78%     │ ~5840        │ Outro section enters      │ outro__title per-line reveal; infinite-grid begins parallax drift; "Wilson" sparkle SVG stroke-draw triggers; "wow" pulse-scale loop starts
~83%     │ ~6044 - 7045 │ Outro → Footer transition │ infinite-grid continues drifting upward; outro waves transitions
~90%     │ ~6650+       │ Footer enters             │ Paper plane idle-floats; footer__waves cream-tear visible; clock updates to local time
100%     │ 7387         │ Page bottom               │ Footer fully in view
─────────────────────────────────────────────────────────────────────────────────────

SCROLL BEHAVIORS:
  Smooth scrolling: NO 3rd-party smooth-scroll detected (no Lenis, no Locomotive).
                     Native browser scroll is used. Cursor lerping creates the illusion
                     of "smoothness" without actually slowing scroll.
  
  Parallax elements:
    .infinite-grid              — translates upward at ~0.6× scroll velocity (custom JS)
    .intro__waves               — static negative-margin (-107px) — looks parallax due
                                   to overlap with hero, but is fixed offset.
    .about__svg--{sax,wand,shaka} — gentle idle wobble (rotate ±3°), NOT scroll-tied
  
  Sticky elements:
    .hero__sticky — sticky top:0 within .hero__wrapper, un-sticks at scroll 723
    No other sticky elements detected.
  
  Nav state change: NO NAVIGATION on this site. There is no <nav>, no header, no
                     hamburger. The "Get in touch" badge is the only persistent
                     navigation primitive, and it is only in the hero (it scrolls
                     out of view with the hero un-pin). This is a deliberate choice —
                     the page is meant to be experienced linearly top-to-bottom.
```

---

## 1.8 — TECHNICAL STACK

```
  Framework:        Nuxt 2 (Vue.js 2)            confidence: HIGH (#__nuxt + #__layout
                                                  + window.$nuxt + manifest.js/payload.js
                                                  /state.js scaffolding)
  Animation:        Custom (vanilla JS RAF loops + CSS transitions)   confidence: HIGH
                    NO GSAP, NO Framer, NO anime.js, NO ScrollMagic detected.
                    Text-splitter (anim-line + anim-char + .oh wrapper) is custom — likely
                    a small in-house Vue component or imported util.
  Lottie:           lottie-web (used in .hero__lottie-wrapper for the desk character)
                    confidence: INFERRED (no script-src match, but DOM signature of
                    inline Lottie SVG is present)
  Scroll:           Native window.scroll + IntersectionObserver (no Lenis/Locomotive)
                    confidence: HIGH
  UI Lib:           CSS Modules / scoped-styles (Vue scoped CSS — see [data-v-1a891f90]
                    selector pattern in inline <style>)
                    NOT Tailwind (despite tailwind:true detector — that flag fired on
                    a generic [class*="text-"] match, but no actual TW utility classes
                    are present in the markup)
  Custom Cursor:    Custom JS implementation, RAF-driven with lerp smoothing
  Media:            <video autoplay muted loop playsinline> for motion gallery tiles;
                    <picture> + <img> for static; PNG for waves textures
  Hosting:          Static export (likely Nuxt generate); assets at /_nuxt/* and /images/*
  Other:            Hand-built — there is a "Code by Thomas Aufresne" credit in the
                    footer, suggesting this is a bespoke build by that developer for
                    Joel. https://thomasaufresne.com
```

---

## 1.9 — MOTION PHILOSOPHY + COPY VOICE

```
MOTION PHILOSOPHY:

The motion is editorial, weighted, and slightly imperfect — it reads less like a
software UI and more like the page itself is a printed magazine being thumbed
through. Long durations (700ms text reveals, 12-second badge rotations, 700ms
gallery zooms) live alongside one micro-interaction that is sharp and constant
(the lerped cursor with mix-blend-difference, which feels like a precision pen
hovering above the page). The torn-paper section transitions are the soul of
the motion: every chapter of the page begins and ends with an irregular hand-cut
edge — as if Joel literally tore his own portfolio out of a sketchbook and
stitched it together in front of you. If you removed the animations, the page
would still LOOK beautiful but it would lose its character: the rotating
"Get in touch" badge, the smiling man at the desk who breathes, the marquee of
projects drifting behind a closing line, the inline brand-logos that wink in
between parens. The motion produces an emotional state of *trust through warmth*
— this designer is precise, but he's also playful, and he wants you to feel
that this is hand-made.

COPY VOICE PATTERN:
  Tone:          Conversational-confident with self-deprecating wit — letterman tone.
                 Speaks in first person ("Hey, I'm Joel"; "I'm a firm believer";
                 "I enjoy"). Uses British informal register: "cool sh*t", "wiz",
                 "magical brand experiences" — the diction has personality without
                 being wacky.
  Sentence form: Mostly full sentences, but section headlines are deliberately
                 fragments. Hero is a long compound noun phrase ("Branding & Digital
                 Design Wiz") that reads as a job-title-as-headline. Outro and
                 footer are compressed declarations ("Simply making cool sh*t…",
                 "Let's work together"). The intro is the most "conversational"
                 paragraph; the about is the most "manifesto."
  Key device:    Fill-in-the-blank parens (the brand-logo cycler) — turns one
                 sentence into a mini-game. Pop-culture wink ("Wilson would say wow"
                 — Cast Away reference). Magic-show metaphor as the sting line of
                 the about copy ("pull the rabbit out of the hat").
  Example pattern: "I enjoy exploring unique ideas with forward thinking ( ◇ ) people."
                   — Joel uses parens to position partner brands inside his own
                   sentence, making the brands part of his identity rather than
                   client logos in a separate "trusted by" strip. The sentence
                   syntax IS the brand wall.
                   
                   "Let's work together  ↗" — the trailing arrow glyph is part of
                   the sentence punctuation, not a separate UI affordance. Voice
                   and UX share one shape.
```
