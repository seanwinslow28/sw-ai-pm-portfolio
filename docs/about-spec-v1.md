# About Page v1 — Build Spec

> **Status:** Drafted 2026-05-17. Revised 2026-05-17 (dog framing → Saturday-morning-canon). Awaiting Sean's final lock.
> **Scope:** The `/about/` page body. Inherits everything from `hero-spec-v1.md` (color, type, motion, cursor, character) and `projects-section-spec-v1.md` (status pill vocabulary, annotation conventions). Where the **character lives most fully** (hero §11) and where **pencil annotations hit their fullest expression** before propagating site-wide (case-study spec §11).
> **Contact CTA is OUT OF SCOPE** for this spec. The Contact section is its own surface and folds into [`site-chrome-spec-v1.md`](#) (spec #6). The About page ends at the signature; the page-bottom torn-paper edge transitions into the site-chrome footer where Contact lives.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + `hero-spec-v1.md` + `case-study-spec-v1.md` open.

---

## 1. The About Page, in one sentence

A two-column animator's-sketchbook page where Sean's animator-self and PM-self run forward in time in sync — separated by a torn-paper gutter, connected by hand-drawn arrows across it — landing in a mid-page "Saturday morning canon" cel-grid that earns the lead line literally by mapping six formative cartoons to six product/craft principles.

## 1.1 Changelog

- **2026-05-17 (revision):** Lead-line + B-3 section revised after Sean's review of v1. The dog framing was killed (it forced an artifact that wasn't load-bearing to Sean's actual personality). The PMP §4 About-page lead row gets updated in lockstep — the locked string moves from the dog deflation to a **compressed-parallel credentials block** that harmonizes with the home-hero tagline ("Raised by..." → "Trained by..."). B-3 transitions from a dog-Polaroid gallery to **Saturday morning canon** — six hand-drawn pencil-test studies of cartoon characters Sean takes as formative, each captioned with the product/craft principle the cartoon taught. Animation-cel frame treatment (with hand-drawn registration pegs) replaces Polaroid framing to signal "cultural-craft reference rendered through Sean's hand" rather than "personal artifact." Five dog-related OPEN questions in §18 are removed; three cartoon-canon OPENs added.
- **2026-05-17 (initial):** First draft. Honored hero §10's locked "About = paper, no splash" decision. Annotation density cap raised from ≤6 (case-study) to ≤12 (About).

---

## 2. Anatomy

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from prev surface) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON · ABOUT · UPDATED 2026-05-17 · 4 MIN                         │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  ┌── pencil annotation ──┐                                           │
│  │ updated weekly ↗      │                                           │
│  └────────────────────── ┘                                           │
│                                                                      │
│  ╭───────────────────────────────────╮  ┌──────────────────────────┐ │
│  │                                   │  │   FULL-BODY CHARACTER    │ │
│  │  Trained by Looney Tunes and      │  │   pencil-test PNG,       │ │
│  │  Vercel deployment logs.          │  │   alpha channel,         │ │
│  │  Ships AI-native products.        │  │   ~640px tall            │ │
│  │  Deploys agent fleets.            │  │                          │ │
│  │                                   │  │   (the same character    │ │
│  │  Newsreader, clamp(36, 4vw, 64),  │  │    as cursor / tile /    │ │
│  │  ink, 3 lines on desktop,         │  │    hero, full-body,      │ │
│  │  4-5 on mobile, max-width 540px   │  │    static)               │ │
│  │                                   │  │                          │ │
│  ╰───────────────────────────────────╯  └──────────────────────────┘ │
│                                                                      │
│  ─── LIVE PULSE STRIP ────────────────────────────────────────────── │
│  LAST 24H — 4 commits to superuser-pack. 1 substack draft. 2         │
│  pencil-test frames cleaned. currently reading: karpathy on the      │
│  explanation artifact. updated 08:45 by daily driver.                │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│                                                                      │
│  ── handwritten heading SVG ──                                       │
│  ╱╱ B-1 · How I got here ╱╱                                          │
│                                                                      │
│  ┌──────────────────── PARALLEL-LINEAGE TIMELINE ─────────────────┐  │
│  │                                                                │  │
│  │  ANIMATOR  ╲╱╲╱╲╱╲                          ╱╲╱╲╱╲╱╲  PM       │  │
│  │     (left column)   torn-paper vertical gutter   (right)       │  │
│  │                                                                │  │
│  │  ┌──────────────┐    │                       ┌──────────────┐  │  │
│  │  │ age 8        │    │                       │ age 8        │  │  │
│  │  │ "drew first  │    ├─ hand-drawn arrow ──→ │ "discovered  │  │  │
│  │  │ saturday     │←───┤    "parallel"          │ vercel       │  │  │
│  │  │ morning      │    │                       │ deployment   │  │  │
│  │  │ cartoon"     │    │                       │ logs"        │  │  │
│  │  └──────────────┘    │                       └──────────────┘  │  │
│  │                      │                                         │  │
│  │  (8-10 paired rows; mobile collapses to alternating)           │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                      │
│                                                                      │
│  ── handwritten heading SVG ──                                       │
│  ╱╱ B-2 · Why a PM, not just a builder ╱╱                            │
│                                                                      │
│  3 short paragraphs, single-column. Sedaris-coded. The              │
│  comprehension thesis: building is cheap now; specs and             │
│  governance are the durable PM skill. Why he loves writing          │
│  PRDs more than commits.                                            │
│                                                                      │
│      ☕ coffee-ring annotation on this section                       │
│                                                                      │
│                                                                      │
│  ── handwritten heading SVG ──                                       │
│  ╱╱ B-3 · Saturday morning canon ╱╱                                  │
│                                                                      │
│  ┌──◐──◐──┐ ┌──◐──◐──┐ ┌──◐──◐──┐                                    │
│  │ CARTOON│ │ CARTOON│ │ CARTOON│   ← registration pegs on each cel  │
│  │ CEL    │ │ CEL    │ │ CEL    │   (pencil-test study, Sean's hand) │
│  │ 280×320│ │ 280×320│ │ 280×320│                                    │
│  │        │ │        │ │        │                                    │
│  │ name · │ │ name · │ │ name · │   ← cartoon name + year, mono,     │
│  │ year   │ │ year   │ │ year   │     in the cel bottom              │
│  └────────┘ └────────┘ └────────┘                                    │
│   LESSON ─  LESSON ─   LESSON ─       ← wire-service caption,         │
│   one-line  one-line   one-line         lesson noun + 1-line          │
│                                         elaboration                   │
│                                                                      │
│  ┌──◐──◐──┐ ┌──◐──◐──┐ ┌──◐──◐──┐                                    │
│  │ CARTOON│ │ CARTOON│ │ CARTOON│                                    │
│  │ CEL    │ │ CEL    │ │ CEL    │                                    │
│  └────────┘ └────────┘ └────────┘                                    │
│   LESSON ─  LESSON ─   LESSON ─                                      │
│                                                                      │
│  (6 cels total in a 3×2 grid on desktop, 2×3 on tablet,              │
│   single column on mobile)                                           │
│                                                                      │
│                                                                      │
│  ── handwritten heading SVG ──                                       │
│  ╱╱ B-4 · Where I'm going ╱╱                                         │
│                                                                      │
│  AVAILABLE 2026-05 · AI PM > TECH PM > CREATIVE PM                   │
│  BOSTON METRO OR REMOTE                                              │
│                                                                      │
│  2 short paragraphs — calm, factual.                                 │
│                                                                      │
│                                                                      │
│  ── handwritten heading SVG ──                                       │
│  ╱╱ B-5 · Proof points ╱╱                                            │
│                                                                      │
│  → linkedin.com/in/seanwinslow                                       │
│  → github.com/seanwinslow                                            │
│  → seanwinslow.com/transactions ← rev scribble annotation            │
│  → resume.pdf                                                        │
│                                                                      │
│                                                                      │
│  ─── PULL QUOTE ──────────────────────────────────────────────────   │
│  "Raised by Saturday morning cartoons                                │
│   and Vercel deployment logs."                                       │
│  Newsreader 40px italic, paper-strip background — pulled from        │
│  the home hero tagline, as a deliberate cross-page echo              │
│                                                                      │
│                                                                      │
│  Sean   ← handwritten signature SVG                                  │
│         ◐ registration mark (page closeout, bottom-right)            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom) → site-chrome footer (Contact lives there) ╲╱╲╱╲╱╲╱╲
```

Six bands. Top to bottom: **dateline strip → lead-line + character hero → live pulse strip → parallel-lineage timeline (B-1) → comprehension thesis (B-2) → Saturday morning canon (B-3) → where-I'm-going (B-4) → proof points (B-5) → pull quote → signature**. The page sits on cream paper edge to edge. No splash. The character + the annotations + the pencil-test cartoon cels carry the chromatic interest.

---

## 3. Vertical budget

### Desktop (≥1024px, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | 32px | overlaps prev surface by 16px |
| Top padding | 60px | |
| **Dateline strip** | ~54px | reused component, includes reading-time `4 MIN` suffix |
| Gap | 60px | |
| **Lead-line + character hero** | ~640px | 2-column grid; 3-sentence lead at `clamp(36px, 4vw, 64px)` Newsreader left, character PNG full-body right |
| Gap | 60px | |
| **Live pulse strip** | ~80px | mono, paper, 0.5px teal dividers top + bottom |
| Gap | 100px | |
| **B-1 Parallel-lineage timeline** | ~1200-1800px | 8-10 paired rows, ~150-180px per row, hand-drawn arrows in the gutter |
| Gap | 100px | |
| **B-2 Comprehension thesis** | ~600px | single column, max-width 680px |
| Gap | 100px | |
| **B-3 Saturday morning canon** | ~860px | 3×2 cel grid (~360px per row) + wire-service caption strips below each cel |
| Gap | 100px | |
| **B-4 Where I'm going** | ~440px | availability pill + 2 paragraphs |
| Gap | 80px | |
| **B-5 Proof points** | ~280px | 4 mono links, left-aligned |
| Gap | 120px | |
| **Pull quote** | ~280px | paper-strip background, Newsreader 40px italic, centered — quoting the home-hero tagline |
| Gap | 80px | |
| **Signature + closeout** | ~120px | handwritten "Sean" SVG + registration mark bottom-right |
| Bottom padding | 80px | |
| Torn-paper bottom edge | 32px | overlaps site-chrome footer by 16px (where Contact lives) |
| **Page height** | ~5100-5700px | longest page on the site by design |

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Lead-line + character hero | Stack: character PNG on top (max-height 360px), lead line below, 3 sentences wrap to 4-5 lines |
| Live pulse strip | Wraps to 2-3 lines, same content |
| **B-1 timeline** | Collapses to single column with **alternating left/right rows** — left-anchored row is animator-self, right-anchored row is PM-self, gutter arrows replaced with small vertical "see also" pencil marks |
| **B-3 cartoon canon** | Single-column stack; each cel + caption renders full-width, 6 stacked. No horizontal carousel (the lessons are too important to risk being swiped past). |
| Annotations | Cap drops from ≤12 → ≤6 (geometry breaks at high density on mobile) |
| Pull quote | Newsreader `clamp(24px, 5vw, 40px)` |

The mobile collapse rule for B-1 is the key opinionated bit — **alternating rows preserve the parallel-lineage rule when columns can't fit**. A single linear timeline would imply chronological hierarchy and fail PMP §3.1.

For B-3 on mobile: vertical stack, not carousel. The dog-Polaroid version of this spec used `scroll-snap` because Polaroids are scannable; cartoon-canon entries each carry a load-bearing lesson sentence that earns the lead line, so they must be readable in single-column scroll order, not swiped through.

---

## 4. Type + voice register

### Type system (extends hero §4 + case-study §4)

| Role | Font | Size (responsive) | Weight | Tracking | Color |
|---|---|---|---|---|---|
| Dateline strip | JetBrains Mono | 12 / 11 | 500 + 400 | 1.2px | stamp `#7C2D12` + body `#546E71` |
| Reading-time suffix | JetBrains Mono | 12 (both) | 500 | 1.6px | `#7C2D12` |
| **Lead line (3 sentences)** | Newsreader | `clamp(36px, 4vw, 64px)` | 300 | -0.4px | `#1A1A1E` |
| Live pulse "LAST 24H" prefix | JetBrains Mono | 12 (both) | 500 | 1.6px | `#7C2D12` |
| Live pulse body | JetBrains Mono | 13 / 12 | 400 | 0.8px | `#546E71` |
| **Hand-drawn section headings (B-1, B-2 …)** | SVG, not type | rendered at ~48px tall | — | — | `#0A3E42` |
| Section frame number prefix (`B-1 ·`) | JetBrains Mono | 14 (both) | 500 | 1.8px | `#FAC775` (amber mid-stop) |
| Timeline row labels (`age 8`, etc.) | JetBrains Mono | 11 (both) | 500 | 1.4px | `#7C2D12` |
| Timeline row body | Newsreader | 18 / 16 | 400 | -0.1px | `#1A1A1E` |
| B-2 prose | Newsreader | 22 / 18 | 300 | -0.2px | `#1A1A1E` |
| **Cartoon cel name strip** | JetBrains Mono | 11 (both) | 500 | 1.2px | `#1A1A1E` (inside the cel, bottom-left) |
| **Cartoon cel year suffix** | JetBrains Mono | 11 (both) | 400 | 1.2px | `#546E71` (inside the cel, after the name) |
| **Cartoon lesson noun (caption prefix)** | JetBrains Mono | 12 (both) | 500 | 1.6px | `#7C2D12` (caption strip below cel) |
| **Cartoon lesson body** | JetBrains Mono | 12 / 11 | 400 | 0.8px | `#546E71` (caption strip below cel) |
| Availability pill | JetBrains Mono | 13 (both) | 500 | 1.8px | `#0F6E56` (success teal) |
| B-4 prose | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
| Proof-point links | JetBrains Mono | 15 / 13 | 500 | 0.6px | `#0A3E42` (underline on hover) |
| Pull quote | Newsreader | `clamp(28px, 4.5vw, 40px)` | 300 italic | -0.3px | `#0A3E42` |
| Signature | SVG (handwritten), not type | rendered ~36px tall | — | — | `#1A1A1E` |

**Hand-drawn section headings are the typographic signature of this page.** Every B-N heading is a custom SVG, rendered at ~48px tall, in primary teal `#0A3E42`. The heading SVGs live in `src/assets/headings/about/`. Five headings total: `b1-how-i-got-here.svg`, `b2-why-pm.svg`, **`b3-saturday-morning-canon.svg`**, `b4-where-im-going.svg`, `b5-proof-points.svg`. Single-color, viewBox-locked, scale freely.

### Voice register by section (PMP §3.3)

| Section | Register | Notes |
|---|---|---|
| Dateline strip | Wire-service mono | Same as hero/case-study |
| **Lead line** | **Editorial credentials-block** | 3 short sentences rendered as a stat-block — Newsreader serif, but wire-service-coded in cadence. Sentence 1 calls back to the home-hero lineage frame; sentences 2-3 are factual ship-stamps. No comedic deflation; the warmth comes from the cross-page rhyme with the home tagline, not from a punchline. |
| **Live pulse strip** | **Wire-service personal** | Wire-service register applied to personal data — commits / drafts / frames cleaned / reading. Past 24h, factual, no first-person pronouns. |
| **B-1 timeline rows** | **Wire-service captions** | Each row's prose is wire-service: dated, factual, one claim per row. Quotes around childhood mile-markers. |
| **B-2 prose** | **Sedaris-coded narrative** | The page's most personal section. First-person-warm, comedic juxtaposition, specific nouns. |
| **B-3 cartoon lessons** | **Wire-service captions, declarative** | Each lesson opens with a noun (`TIMING.` / `ANTICIPATION.` / `POV.`) followed by a one-line elaboration that maps the cartoon-craft principle to a product-craft principle. Pure declarative voice — no first-person, no comedic move. The lesson IS the move. |
| **B-4 where I'm going** | **Sober / declarative** | Calm, factual. Names roles, geography, availability. No "open to opportunities" energy. |
| **B-5 proof points** | Wire-service mono | Single-line links. No descriptions. |
| Pull quote | Editorial (home-hero call-back) | The home-hero tagline reproduced verbatim at the page foot, in serif italic. Closes the page with a cross-surface echo. |

**The opinionated bit:** the lead line is editorial-as-stat-block, the pulse strip is wire-service, B-1 is wire-service, B-2 is Sedaris, B-3 is **declarative-wire-service** (a new register on this page — the cartoon-lessons sound like classified ads for product-craft principles), B-4 is sober, B-5 is wire-service, pull quote is editorial. **Warm and factual alternate by section** — and the new declarative register in B-3 reads as "the canon, plainly stated," which fits the section's authority claim ("here's what taught me to ship").

**STOP-DOING:** Per PMP §3.4. The HybridRouter is never described as architecture on this page either. If agent-fleet operation is named in the lead line ("Deploys agent fleets.") or B-4 ("AI PM"), the framing is product judgment + governance + authority — not concurrency or routing. The semantic-product-architecture lane, not the runtime lane.

---

## 5. Color rules — About scope

About inherits the full hero §5 palette. **About has NO splash block** per hero §10 (locked).

| Color | Hex | Used by |
|---|---|---|
| Paper | `#FFF9F0` | Page background, edge to edge |
| Ink (primary) | `#1A1A1E` | Lead line, prose, timeline body, cartoon cel name strip |
| Teal (primary) | `#0A3E42` | Hand-drawn heading SVGs, proof-point links, pull quote |
| Secondary ink | `#546E71` | Dateline body, pulse body, cartoon lesson body, cel year suffix |
| Stamp amber | `#7C2D12` | Dateline prefix, pulse prefix, timeline labels, cartoon lesson noun, reading-time |
| Amber mid-stop | `#FAC775` | Frame-number prefixes (`B-1 ·`), registration marks, cartoon-cel registration pegs |
| Success teal | `#0F6E56` | Availability pill (B-4) — same hex as SHIPPED status on case-study |
| Border whisper | `rgba(10, 62, 66, 0.15)` | Pulse strip dividers, cartoon-cel 0.5px outer border, gutter shadow |
| Annotation ink | `rgba(10, 62, 66, 0.7)` | Pencil-margin annotation strokes (curved arrows) |
| Strikethrough ink | `rgba(124, 45, 18, 0.8)` | Annotation X (e.g., on the "v3 portfolio" historical artifact, if surfaced) |
| Coffee ring | sepia PNG | One per page, ~30% opacity |

**No coral, no third splash color, no decorative gradients.** The chromatic interest comes from: (1) the character PNG, (2) the 6 pencil-test cartoon cels, (3) the maximum-density pencil annotations.

---

## 6. Motion timeline

Trigger: page entry (via View Transition from a sibling route or via direct nav).

| t (ms) | Element | Animation | Easing | Duration |
|---|---|---|---|---|
| 0 | View Transition completes; dateline + lead line + character PNG already painted | — | — | — |
| 200 | Dateline + reading-time | Type-on, character by character | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| 400 | Lead line | **Per-sentence reveal** (3 sentences on desktop, 4-5 lines on mobile), translateY(40px) → 0 + opacity, 200ms stagger between sentences — the credentials-block reads in line-by-line like a wire-service marquee | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 1000ms total |
| 600 | Character PNG | Fade 0 → 1, no translation | linear | 600ms |
| 1300 | Live pulse strip | Fade + translateY(8px) → 0 | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| viewport-triggered | Each timeline row | IntersectionObserver-triggered. Left + right paragraph fade in simultaneously; if a cross-gutter arrow is present, it draws after both land (200ms delay) using SVG `stroke-dasharray` reveal | `cubic-bezier(0.22, 1, 0.36, 1)` | 600ms per row |
| viewport-triggered | Each hand-drawn heading | Fade + slight scale 0.96 → 1 — feels like a sketchbook page turning | `cubic-bezier(0.22, 1, 0.36, 1)` | 500ms |
| viewport-triggered | **Cartoon cels** | Stagger: each cel fades + slight scale 0.97 → 1 (no rotation — cels are flat artifacts, not Polaroids), 100ms stagger row-by-row; the registration peg SVGs at the top of each cel fade in 200ms after the cel body | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms each |
| viewport-triggered | Pull quote | Per-line reveal | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 700ms |
| viewport-triggered | Signature | SVG `stroke-dasharray` reveal — the signature draws itself in | `cubic-bezier(0.6, 0, 0.4, 1)` | 1200ms |

**The opinionated bit:** the signature draws itself in, slowly. Most pages close with a button or a CTA. This page closes with Sean's hand signing the page — the most explicit "this is not a template" gesture in the entire site. Reduced motion collapses it to opacity 0 → 1 over 200ms (drawn-in static version).

**Note on cel motion:** the cartoon cels do NOT rotate (unlike the dog-Polaroid version of this spec). Animation cels in production sit flat under the camera, square to the registration pegs. Rotating them would read as Polaroid styling, which is the wrong cultural reference. Pure fade + slight scale only.

---

## 7. Lead-line + character hero composition

The above-the-fold block. 2-column grid. Lead line left, character PNG right.

### 7.1 Lead line

```
Trained by Looney Tunes and Vercel deployment logs.
Ships AI-native products.
Deploys agent fleets.
```

- Source: `src/content/about/index.mdx` frontmatter field `lead:` — **identical to PMP §4 locked string (revised 2026-05-17)**
- Build-time validator (`scripts/validate_about.mjs`) asserts the lead line in MDX matches PMP §4 byte-for-byte. Build fails on drift.
- Type: Newsreader, `clamp(36px, 4vw, 64px)`, weight 300, tracking -0.4px, ink `#1A1A1E`
- **Renders as 3 short sentences, one per line** on desktop (≥1024px). Sentence 1 will wrap to 2 lines below ~480px. Total 3 lines desktop, 4-5 lines mobile.
- max-width 540px desktop, 100% mobile
- Implementation: render the 3 sentences as `<p>` elements separated by line breaks in a Newsreader display block. NOT a single `<p>` with autoflow — the line breaks are editorial decisions, not typographic accidents.
- No quote marks render on screen — the string itself is the artifact, not quoted speech
- No CTA below it. The pulse strip is the next thing.

### 7.2 Why this lead line works

**Sentence 1 is a cross-page rhyme with the home-hero tagline.** Home: *"Raised by Saturday morning cartoons and Vercel deployment logs."* About: *"Trained by Looney Tunes and Vercel deployment logs."* The shared trailing phrase (`...and Vercel deployment logs`) is a deliberate echo — recruiters who came in via the home page recognize the lineage frame and feel they're reading the same author, not a fresh template. *"Raised by..."* is the announcement (passive, childhood-coded); *"Trained by..."* is the elaboration (active, craft-coded). Same lineage, different verb-energy.

**Sentences 2-3 are factual ship-stamps.** Wire-service cadence, present tense. They name what the lineage produces — AI-native products + agent fleets — without selling them. The reader extracts "this person ships" from the rhythm, not from the claim.

**No comedic deflation.** This is the structural break from the v1 dog framing. The dog line worked as a hard-cut deflation but forced an artifact section (the gallery) that didn't earn itself. The new line is **parallel-credentials**, not deflation — it harmonizes with the home hero and lets B-3 work as a load-bearing canon section rather than a forced personal artifact.

### 7.3 Character PNG (full-body, static)

- Asset: `/public/assets/character/about-full-body.png` — Sean, full-body, pencil-test rendering, alpha-transparent PNG (the AI companion stays at the hero + animation-pipeline case study)
- Source: rendered via Seedream 2.0 from the existing turnaround anchor sheets in `sw-portfolio-animation-2026/anchor-images/` — a single static composition, not a frame from any existing loop
- Size budget: ≤800KB, 2x retina source
- Display: max-height 640px desktop, max-height 360px mobile (stacks above the lead line)
- `object-fit: contain`, `object-position: bottom right` desktop / `bottom center` mobile
- `loading="eager"` (above the fold)

**[OPEN-1: Character composition (§7.3)]** — confirm Sean alone, full-body, no AI companion. Default decision: Sean alone here. The AI companion lives in the home hero + the animation-pipeline case study; About is the human-self surface.

### 7.4 Why a static PNG, not the WebM loop

Above-the-fold motion competes with the lead line. The home hero has motion because the line is short and the lane is to the side; here the lead is a 3-line credentials block and the character is the visual partner to the text. A static character lets the lead read. The WebM lives elsewhere (hero, case study).

---

## 8. Live pulse strip

Wire-service strip below the lead. Reads from `/api/about-pulse.json` (Daily Driver writes 08:45 daily, same agent infrastructure as `dateline.json`).

### 8.1 Data shape

```json
{
  "date_iso": "2026-05-17",
  "items": [
    { "type": "commits",          "count": 4, "repo": "superuser-pack" },
    { "type": "drafts",           "count": 1, "destination": "substack" },
    { "type": "pencil_frames",    "count": 2 },
    { "type": "reading",          "title": "the explanation artifact in the generative era", "author": "karpathy" }
  ],
  "updated_at": "2026-05-17T08:45:00-04:00"
}
```

**Note:** the `dog_walks` item type from the v1 draft is removed. The pulse strip now reports on Sean's **work** — commits, drafts, pencil-test frames cleaned, reading. The personal artifact (dog walks) is replaced with another work artifact (animation pipeline output), keeping the pulse strip aligned with the page's actual thesis. If Sean later wants a "non-work" pulse item type, that's a frontmatter-driven extension; it's not load-bearing for v1.

### 8.2 Rendered shape

```
LAST 24H — 4 commits to superuser-pack. 1 substack draft. 2 pencil-test
frames cleaned. currently reading: karpathy on the explanation artifact.
updated 08:45 by daily driver.
```

- Composition: the Daily Driver concatenates `items` into one wire-service sentence per type, lowercase, no first-person pronouns
- Layout: paper background, 0.5px teal `rgba(10, 62, 66, 0.15)` dividers top + bottom, 24px vertical padding
- Width: matches the page max-width (1120px desktop)
- Wraps to 2-3 lines naturally on mobile

### 8.3 Fallback

If `/api/about-pulse.json` is missing or >48h stale:
> *LAST 24H — quiet day. building.*

The fallback is deliberately generic. It only appears when the system is broken. Recruiter sees "the page is alive, just paused yesterday" — not a 500 error.

---

## 9. B-1 — Parallel-lineage timeline

(Unchanged from v1 — see prior §9 of this spec for the full treatment.)

The load-bearing section. Where PMP §3.1's parallel-lineage rule becomes geometry.

- **Two-column CSS Grid**: `grid-template-columns: 1fr 64px 1fr` (left column + gutter + right column)
- Left = **animator-self** (cartoons, drawing, animation, traditional craft)
- Right = **PM-self** (code, deployment, agents, product judgment)
- Both columns run **forward in time, in sync** — age-aligned rows
- 8-10 paired rows; row content stays for the build session
- ≤3 cross-gutter SVG arrows (`parallel` / `becomes` vocabularies)
- Mobile: alternating left/right rows in single column (NOT a linear timeline)

**[OPEN-2: Timeline content (§9)]** — 8-10 paired rows. The geometry is locked; the prose is not. Sean writes the rows in the build session.

---

## 10. B-2 — Comprehension thesis ("Why a PM, not just a builder")

Single-column, max-width 680px, Newsreader 22/18px weight 300.

3 short paragraphs. Sedaris-coded. The thesis: **building is cheap now; specs, governance, and comprehension are the durable PM skill.** Why Sean loves writing PRDs more than commits. The comprehension-artifact thesis (Karpathy / Nate B Jones) made personal.

Coffee-ring annotation lands on this section — physical-process intrusion mid-thesis, a small visual joke that the writer's a real person at a real desk.

**Not a manifesto.** That voice lives in `/essays/` per PMP §3.3. B-2 is personal, anecdotal, comedic-juxtaposition-with-no-punchline — pure Sedaris register.

---

## 11. B-3 — Saturday morning canon

The page's most opinionated mid-section. The earned half of the lead-line's lineage claim. **Six pencil-test studies of cartoon characters Sean takes as formative, each paired with a wire-service caption mapping the cartoon-craft principle to a product-craft principle.**

### 11.1 Why animation cels, not Polaroids

Polaroids in the v1 draft signaled "personal weekend artifact" (the dog). Cartoon-canon entries are different: they're **cultural-craft references rendered through Sean's hand**. The framing must signal "this is a piece of animation history, observed through an animator's eye" — not "this is a snapshot from Sean's life." **Animation-cel framing** does that work:

- Hand-drawn registration peg SVG at the top of each cel (2 small circles + a notch + a tick mark — the registration peg system animators have used for a century)
- White paper background (cel-coded, not photo-coded)
- Pencil-test study of the cartoon character at the center
- Cartoon name + year typeset in mono inside the cel's bottom-left corner (like a production cel's slate)
- Caption strip below the cel carries the lesson

The visual register flips from "personal scrapbook" to "animator's reference library." Different signal, intentionally.

### 11.2 The 6 cartoons (placeholders — Sean writes the canonical list)

The spec locks the format and structural role; the 6 cartoons and their lessons are Sean's. The list below is a placeholder set demonstrating the caption shape:

| # | Cartoon | Era | Lesson noun | Lesson body (placeholder) |
|---|---|---|---|---|
| 1 | Wile E. Coyote / Roadrunner | 1949– | **ANTICIPATION TIMING** | the wind-up sells every gag. ship the wind-up before the deliverable. |
| 2 | Pinky and the Brain | 1995–98 | **CHARACTER VS SCHEME** | the team that owns the scheme is not always the team that lands it. |
| 3 | SpongeBob SquarePants | 1999– | **PACING** | when in doubt, cut to the close-up. a slow scene needs a closer camera, not a longer cut. |
| 4 | Looney Tunes | 1930– | **PHYSICAL COMEDY** | the joke is in the timing, not the gag. agents need beats, not just plans. |
| 5 | Dexter's Laboratory | 1996–2003 | **SCOPE CREEP** | the experiment that destroys the lab is the one you didn't pre-mortem. |
| 6 | Hey Arnold! | 1996–2004 | **POV CHARACTER** | the city is a character; so is the codebase. write things from the place that holds them. |

**[OPEN-3: The 6 cartoons + lessons (§11.2)]** — the table above is a placeholder. Sean writes the canonical list (which 6 cartoons, the specific lesson noun and 1-line elaboration for each) in the build session. The spec locks: 6 cels, mono-caption format `LESSON NOUN — body line`, lesson maps cartoon-craft to product-craft.

### 11.3 The cel component (`<CartoonCel />`)

Each cel is 280×320px on desktop, contained in a 3×2 CSS Grid (`grid-template-columns: repeat(3, 1fr); row-gap: 60px; column-gap: 40px`).

**Cel composition (top to bottom inside the 280×320 frame):**

| Layer | Detail |
|---|---|
| Registration pegs (top) | Hand-drawn SVG: 2 circles + 1 trapezoidal notch + 1 tick — matches the cartoon-cel registration peg standard. ~32px tall, centered horizontally. Amber `#FAC775`, stroke 1.2px. |
| Cel body | White paper background (`#FFFFFF`, not the page's cream `#FFF9F0` — the cel sits ON the paper, not as part of it). 0.5px teal outer border `rgba(10, 62, 66, 0.15)`. Inset shadow 0 2px 4px rgba(0,0,0,0.04). |
| Pencil-test study | Sean's hand-drawn study of the cartoon character (e.g., Wile E. Coyote mid-anticipation crouch). PNG with alpha. ~200×220px, centered, with breathing room above (for the cel name strip below). |
| Cel name strip | Inside the cel, bottom-left corner, ~16px from the edges. Cartoon name in mono 11px weight 500 ink + year suffix in mono 11px weight 400 secondary-ink. Example: `WILE E. COYOTE · 1949–` |

**Caption strip (below the cel, separate element):**

| Element | Detail |
|---|---|
| Lesson noun (prefix) | Mono 12px weight 500 tracking 1.6px, stamp amber `#7C2D12`. E.g., `ANTICIPATION TIMING —` |
| Lesson body | Mono 12px / 11px weight 400 tracking 0.8px, secondary ink `#546E71`. E.g., `the wind-up sells every gag. ship the wind-up before the deliverable.` |
| Caption alignment | Left-aligned with the cel's left edge. Max-width matches the cel (280px). Wraps to 2-3 lines naturally. |
| Vertical position | 16px below the cel's bottom edge. |

### 11.4 Why pencil-test studies, not real cartoon stills

**Three reasons:**

1. **Licensing.** Reproducing Warner Bros / Hanna-Barbera / Nickelodeon stills on a public job-hunt portfolio is a real legal-risk surface, especially for derivative use. Pencil-test studies of cartoon characters are Sean's own art (transformative, fair-use-adjacent at worst, original work at best) and carry no licensing risk.
2. **Craft signal.** Sean is an animator. Pencil-test studies of cartoon characters are **what animators do** — it's how they learn the masters. The cel becomes a craft artifact, not just a reference.
3. **Visual consistency.** Real stills span 70+ years of art styles (1930s Looney Tunes vs. 2010s SpongeBob). Sean's pencil-test studies render all 6 in one consistent style — the site's pencil-test aesthetic — which keeps the section visually unified.

**[OPEN-4: Pencil-test study authorship (§11.4)]** — 6 pencil-test studies need authoring. **Path A:** Sean draws and scans (highest authenticity, ~30 min/study). **Path B:** Seedream 2.0 renders each from a reference + Sean's character style anchor (~5 min/study, less authentic). **Path C:** Hybrid — Sean does the first 2-3 by hand, Seedream produces the rest. Recommended: Path C for v1 (lock the visual language with hand-drawn anchors; backfill with rendered for time). Confirm.

### 11.5 Mobile

Single-column stack. Each cel + caption renders full-width (max 320px wide, centered). 6 stacked entries with 60px vertical gap. No carousel — the lessons are too important to risk being swiped past.

### 11.6 Content collection

```
src/content/cartoons/
├── 1-coyote.md
├── 2-pinky-and-the-brain.md
├── 3-spongebob.md
├── 4-looney-tunes.md
├── 5-dexters-lab.md
└── 6-hey-arnold.md
```

Each file has frontmatter + an optional body for caption overflow (rarely needed):

```yaml
---
order: 1
name: WILE E. COYOTE
year_range: 1949–
studio: Warner Bros
image: /assets/cartoons/coyote-study.png
image_alt: pencil-test study of Wile E. Coyote in mid-anticipation crouch
lesson_noun: ANTICIPATION TIMING
lesson_body: the wind-up sells every gag. ship the wind-up before the deliverable.
---
```

The `<CartoonCanon />` component reads `getCollection('cartoons').sort(order)` and renders the 6 cels in order.

### 11.7 The annotation note

One pencil-margin annotation lands inside B-3 (not on a cel — beside one): a curved arrow with label `← this one rewires you` pointing at the cel Sean considers the most load-bearing of the 6 (his pick, written into the annotation frontmatter). One arrow only. The rest of the section stays clean — the cel grid IS the visual rhythm.

---

## 12. B-4 — "Where I'm going" (calm availability)

(Unchanged from v1 — see prior §12 of this spec.)

The job-hunt anchor section. Sober register.

- Availability pill at top: `AVAILABLE 2026-05 · AI PM > TECH PM > CREATIVE PM` / `BOSTON METRO OR REMOTE`
- 2 short paragraphs, sober — names roles, geography, shapes of work
- No "open to opportunities" energy
- Renders conditionally on frontmatter `available: true | false`

---

## 13. B-5 — Proof points

(Unchanged from v1 — see prior §13 of this spec.)

Four mono links, left-aligned:

```
→ linkedin.com/in/seanwinslow
→ github.com/seanwinslow
→ seanwinslow.com/transactions    ← rev scribble annotation: "the live evidence"
→ resume.pdf
```

---

## 14. Pencil-margin annotations — maximum density

(Unchanged from v1's §14 — same seven vocabularies, same ≤12 desktop / ≤6 mobile cap, same never-adjacent rule. The only spec-level change is the **new annotation hook in B-3** per §11.7 — a single curved arrow pointing at the cel Sean considers most load-bearing.)

**The seven vocabularies:**

1. **Curved arrow** with label — top-of-page "updated weekly", cross-gutter arrows in B-1, "the live evidence" arrow on `/transactions/` link, "this one rewires you" arrow on one cartoon cel in B-3
2. **Strikethrough X** — on a "v3 portfolio" historical artifact link if Sean wants to surface it (see §18 OPEN); else not used
3. **Coffee ring** — one per page, on B-2 prose
4. **Registration mark** — page closeout bottom-right, plus 3 corner marks at the corners of the timeline (B-1) to evoke an animator's registration peg system. (Note: the cartoon cels' top registration pegs in B-3 are a SEPARATE pattern — they're part of the cel-frame component, not freestanding annotations.)
5. **Kid's drawing scan** *(margin artifact)* — one per page only, in B-1 left-column margin
6. **Handwritten signature** — page closeout, just before the registration mark
7. **Mono stamp** ("passport stamp") — 3-5 per page scattered in margins

---

## 15. Accessibility + reduced motion

(Unchanged from v1's §15, with two cartoon-canon additions.)

**Additions:**

- Each `<CartoonCel />` is wrapped in `<article aria-labelledby="cartoon-<order>">` with the cartoon name as the labeled heading. Screen readers announce the cartoon, the year, the lesson noun, and the lesson body in order.
- The registration peg SVGs at the top of each cel are decorative (`aria-hidden="true"`).
- The pencil-test study image inside each cel carries the full `image_alt` from frontmatter — descriptive enough that a non-sighted reader gets the gesture of the study ("Wile E. Coyote in mid-anticipation crouch") not just the subject ("Wile E. Coyote").

**Color contrast (cartoon canon scope):**
- Cel name strip ink on cel white = 14.2:1 (passes AAA)
- Lesson noun stamp amber on paper cream = 7.4:1 (passes AAA at 12px+ weight 500)
- Lesson body secondary ink on paper cream = 5.8:1 (passes AA, fails AAA — acceptable for body text)

---

## 16. Build stack

(Extends v1's §16 — updated for cartoon canon.)

| Layer | Choice | Why |
|---|---|---|
| Page | `src/pages/about.astro` + MDX content from `src/content/about/index.mdx` | Single-page, content collection of one |
| Lead-line validator | `scripts/validate_about.mjs` runs in `prebuild` | Asserts MDX `lead:` matches PMP §4 (revised 2026-05-17) byte-for-byte |
| Pulse data | `/public/api/about-pulse.json` written by Daily Driver morning agent | Same agent that writes `dateline.json` + `next-piece.json` |
| Pulse component | `<NowPulse />` Astro component | Reads JSON at build, server-renders. Stale-data fallback per §8.3. |
| Timeline component | `<TimelineRow />` + `<TimelineGutter />` Astro components | Pure CSS Grid, no JS hydration |
| Cross-gutter arrows | SVG with `stroke-dasharray` for IntersectionObserver-triggered draw-in | Same primitive as the signature |
| Hand-drawn heading SVGs | `src/assets/headings/about/*.svg` | ~5 SVGs, one per B-N section |
| **Cartoon canon collection** | `src/content/cartoons/*.md` content collection + **`<CartoonCanon />` + `<CartoonCel />`** Astro components | Replaces v1's `src/content/dog/` + `<DogPolaroid />`. Pure Astro, no JS hydration. |
| **Cartoon pencil-test studies** | `src/assets/cartoons/*.png` — Sean's hand or Seedream renders | Per §11.4 OPEN: Path C (hybrid) recommended for v1 |
| Mono stamps | `<StampMarginalia stamps={...} />` reading `src/data/about-stamps.json` | Declarative, easy to update |
| Annotations | Reused from `src/components/annotations/` | Density cap raised via prop |
| Signature | `<Signature />` Astro component, SVG asset, `stroke-dasharray` reveal | Reused on About + (potentially) RSS feed |
| Print stylesheet | `@media print` block in `src/styles/about.css` | Single-column, no annotations, link URLs printed |
| Resume PDF | Static at `/public/resume/sean-winslow.pdf` | Authored separately; this page just links |

**Anti-stack (additions):**
- No JS carousel for cartoon cels — vertical stack on mobile
- No third-party image lightbox
- No Calendly / scheduling embed
- No newsletter form (lives in `/essays/` spec)

---

## 17. Definition of Done

About page v1 ships when:

1. The MDX file at `src/content/about/index.mdx` exists with full frontmatter (`lead`, `linkedin_url`, `github_url`, `available`, `available_since`, optional `current_company`).
2. `scripts/validate_about.mjs` runs in `prebuild` and asserts the `lead:` field matches **the revised PMP §4 string byte-for-byte** (`"Trained by Looney Tunes and Vercel deployment logs. Ships AI-native products. Deploys agent fleets."`). Build fails on drift.
3. The above-the-fold renders the 3-sentence lead as a stat-block + character PNG at the spec'd proportions. The character PNG exists at `/public/assets/character/about-full-body.png`.
4. The live pulse strip reads from a real `/api/about-pulse.json` written by the Daily Driver — not hardcoded. Stale-data fallback works. **No `dog_walks` item type in the schema.**
5. The B-1 parallel-lineage timeline renders as a 2-column grid on desktop with a torn-paper gutter SVG, collapses to alternating-row single column on mobile, and has at least 8 paired rows with concrete (non-generic) content.
6. ≤3 cross-gutter arrows render in B-1, animated via `stroke-dasharray` on viewport entry. Disabled under reduced motion.
7. **The B-3 Saturday morning canon renders 6 `<CartoonCel />` entries from `src/content/cartoons/` in a 3×2 grid on desktop, stacks single-column on mobile. Each cel includes: hand-drawn registration pegs (SVG), Sean's pencil-test study (PNG), cartoon name + year strip inside the cel, and a wire-service caption strip below.** No real cartoon stills (licensing); pencil-test studies only.
8. The B-4 availability pill renders only when frontmatter `available: true`. Renders as `CURRENTLY @ <COMPANY>` when `false`.
9. The B-5 proof points render four mono links with the "rev scribble" annotation on the `/transactions/` link.
10. Pencil annotations render at the spec'd density cap (≤12 desktop / ≤6 mobile) with the seven vocabularies defined in §14. Never adjacent within 200px (desktop) / 120px (mobile). **One annotation lands in B-3** (curved arrow with "this one rewires you" label, pointing at Sean's chosen most-load-bearing cel).
11. The handwritten signature SVG draws itself in via `stroke-dasharray` on viewport entry. Disabled under reduced motion.
12. Hand-drawn heading SVGs (five of them, one per B-N — including `b3-saturday-morning-canon.svg`) render with proper `<h2>` + `aria-label` accessibility.
13. Print stylesheet renders a clean single-column, link-URL-suffixed version of the page on letter paper.
14. Lighthouse: Accessibility ≥95, Performance ≥90, Best Practices = 100.
15. Cold-read test: a fresh reader can describe Sean's professional positioning + read at least 3 of the 6 cartoon lessons + understand he's available within 60 seconds of landing. Re-run on the live build.

When all 15 are green, About v1 is locked and we move to `/transactions/` (spec #3).

---

## 18. Out of scope for v1 — and open questions

### Out of scope

- **Contact CTA** — belongs to site-chrome-spec (spec #6). About ends at the signature.
- **Newsletter signup** — belongs to `/essays/` spec.
- **Calendly / scheduling embed** — deferred.
- **A photo of Sean** — anti-character; never on this site.
- **"Press / mentions" strip** — premature; revisit if mentions accrue.
- **Real-time camera / "live workspace" stream** — deferred (the live pulse strip already carries the live-layer signal at appropriate fidelity).
- **A "skills graph"** — luxury-PM template trap; killed.
- **Dog gallery / personal-life Polaroids** — explicitly removed in this revision. The page focuses on lineage (B-1) + thesis (B-2) + craft canon (B-3); personal artifacts that aren't load-bearing to the thesis are out.

### Open questions (flagged inline)

**[OPEN-1: Character composition (§7.3)]** — Sean alone, full-body, NO AI companion. The companion lives in hero + animation-pipeline case study; About is the human-self surface. Confirm.

**[OPEN-2: Timeline content (§9)]** — 8-10 paired rows. The geometry is locked; the prose is not. Sean writes the rows in the build session.

**[OPEN-3: The 6 cartoons + lessons (§11.2)]** — Spec locks: 6 cels, mono-caption format `LESSON NOUN — body line`, lesson maps cartoon-craft to product-craft. The placeholder table in §11.2 is illustrative — Sean writes the canonical list (cartoon, year, lesson noun, lesson body) in the build session, ideally with cartoons that are personally formative (Cartoon Network / Nickelodeon / Looney Tunes / etc. per Sean's note).

**[OPEN-4: Pencil-test study authorship (§11.4)]** — Path A (Sean hand-draws all 6), Path B (Seedream renders all 6 from references), Path C (hybrid — Sean does 2-3 by hand to lock visual language, Seedream backfills). **Recommended: Path C** for v1. Confirm path before build.

**[OPEN-5: "V3 portfolio" strikethrough artifact (§14)]** — does Sean want to surface V3 as a historical artifact with a strikethrough? Transparency-flex move. Default: no — Sean's voice is comedic-confident, not self-flagellating. Confirm.

**[OPEN-6: Hand-drawn heading SVG authorship (§4)]** — five heading SVGs need authoring (including the revised `b3-saturday-morning-canon.svg`). Path A: Sean draws by hand + scans. Path B: Seedream renders. Path C (font like "Caveat"): reads as fake-handwritten, discouraged. Recommend Path A or B; choice flagged for build session.

---

## Appendix A — File map (additions to case-study spec's map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── about.astro              ← single-page route
│   ├── components/
│   │   └── about/
│   │       ├── AboutHero.astro            ← lead line + character PNG, 2-column
│   │       ├── NowPulse.astro             ← reads /api/about-pulse.json
│   │       ├── TimelineRow.astro          ← single paired row
│   │       ├── TimelineGutter.astro       ← torn-paper vertical SVG
│   │       ├── GutterArrow.astro          ← cross-gutter SVG with stroke-dasharray
│   │       ├── CartoonCanon.astro         ← B-3 wrapper, grid container
│   │       ├── CartoonCel.astro           ← single cartoon entry (pegs + study + name strip + caption)
│   │       ├── AvailabilityPill.astro     ← conditional on frontmatter.available
│   │       ├── ProofPoints.astro          ← 4-link block
│   │       ├── PullQuote.astro            ← reusable on /essays/
│   │       ├── Signature.astro            ← SVG, stroke-dasharray reveal
│   │       └── StampMarginalia.astro      ← reads /src/data/about-stamps.json
│   ├── content/
│   │   ├── about/
│   │   │   └── index.mdx               ← lead, prose for B-1 to B-5, frontmatter
│   │   └── cartoons/                   ← REPLACES src/content/dog/ from v1 draft
│   │       ├── 1-coyote.md
│   │       ├── 2-pinky-and-the-brain.md
│   │       ├── 3-spongebob.md
│   │       ├── 4-looney-tunes.md
│   │       ├── 5-dexters-lab.md
│   │       └── 6-hey-arnold.md
│   ├── data/
│   │   └── about-stamps.json
│   ├── assets/
│   │   ├── headings/
│   │   │   └── about/
│   │   │       ├── b1-how-i-got-here.svg
│   │   │       ├── b2-why-pm.svg
│   │   │       ├── b3-saturday-morning-canon.svg   ← UPDATED filename
│   │   │       ├── b4-where-im-going.svg
│   │   │       └── b5-proof-points.svg
│   │   └── cartoons/                       ← NEW: pencil-test studies
│   │       ├── coyote-study.png
│   │       ├── pinky-and-brain-study.png
│   │       ├── spongebob-study.png
│   │       ├── looney-tunes-study.png
│   │       ├── dexters-lab-study.png
│   │       └── hey-arnold-study.png
│   └── scripts/
│       └── validate_about.mjs
└── public/
    ├── api/
    │   └── about-pulse.json        ← written by Daily Driver
    ├── assets/
    │   └── character/
    │       └── about-full-body.png ← static full-body character
    └── resume/
        └── sean-winslow.pdf        ← static, authored separately
```

---

## Appendix B — MDX frontmatter shape (About)

```yaml
---
# --- Lead (locked, validated against PMP §4 — revised 2026-05-17) ---
lead: "Trained by Looney Tunes and Vercel deployment logs. Ships AI-native products. Deploys agent fleets."

# --- Meta ---
slug: about
title: About — Sean Winslow
description: "Sean Winslow — AI PM, trained by Looney Tunes and Vercel deployment logs."
reading_time: 4

# --- Proof-point URLs ---
linkedin_url: https://linkedin.com/in/seanwinslow
github_url: https://github.com/seanwinslow
transactions_url: /transactions/
resume_url: /resume/sean-winslow.pdf

# --- Availability ---
available: true
available_since: 2026-05-04
available_until: 2026-07-04         # job-hunt window close per Sean-Winslow-Full-Personal-Context-v2.0.md
current_company: null               # null when available; "Foo Inc." when employed

# --- Character ---
character_image: /assets/character/about-full-body.png
character_alt: "A pencil-test rendering of Sean Winslow, full-body."

# --- B-3 cartoon canon (annotation hook only — content lives in src/content/cartoons/) ---
b3_load_bearing_cel: 1               # 1-6; which cel gets the "this one rewires you" annotation arrow
---

# (MDX body below: section B-1 timeline rows + B-2 thesis prose + B-4 calm-availability prose. B-3 is fully content-collection-driven; B-5 reads from frontmatter URLs.)
```

---

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `case-study-spec-v1.md`, and `about-spec-v1.md` end-to-end. The hero, projects, and case-study surfaces are presumed built per their own specs. Build `src/pages/about.astro` + the about components per Appendix A. Author the MDX at `src/content/about/index.mdx` per Appendix B — Sean writes the B-1 timeline rows + B-2 thesis prose + B-4 calm-availability prose in the same session. Author or commission five hand-drawn heading SVGs per §4 / Appendix A (note `b3-saturday-morning-canon.svg`, not `b3-dog.svg`). Implement `scripts/validate_about.mjs` as a `prebuild` hook in `package.json` that asserts the `lead:` matches the revised PMP §4 string byte-for-byte. Stand up the Daily Driver agent extension to write `/public/api/about-pulse.json` alongside `dateline.json` and `next-piece.json` (no `dog_walks` item type — the v1 spec deliberately removed it). Populate `src/content/cartoons/` with 6 MDX entries per §11.6 frontmatter shape, and source 6 pencil-test studies per the OPEN-4 path Sean picks (recommended: Path C — hybrid). The handwritten signature + the five heading SVGs + the kid-drawing margin artifact + the 6 cartoon pencil-test studies need authoring before this page can ship. Stop when the 15 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Revised 2026-05-17 (dog → Saturday-morning-canon). Awaits Sean's final lock. Open questions flagged in §18.*
