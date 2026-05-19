# About Page v1 — Build Spec

> **Status:** Drafted 2026-05-17. Revised 2026-05-17 (dog framing → Saturday-morning-canon). Revised 2026-05-18 (lead line: 3-sentence credentials block → single "Raised by..." header; home hero repositioned in lockstep). Revised 2026-05-18 (B-1 two-column timeline → single-column stacked beats with lane-tint; B-4 availability pill + job-hunt copy → "What I'm building toward" + frontmatter-gated recruiter note). Revised 2026-05-18 (three-layer chrome → paper → content substrate externalized to `texture-and-artifacts-spec-v1.md`; torn-paper edge height corrected from 32px to ~200px to reflect the real raster asset). Awaiting Sean's final lock.
> **Scope:** The `/about/` page body. Inherits everything from `hero-spec-v1.md` (color, type, motion, cursor, character) and `projects-section-spec-v1.md` (status pill vocabulary, annotation conventions). Where the **character lives most fully** (hero §11) and where **pencil annotations hit their fullest expression** before propagating site-wide (case-study spec §11).
> **Contact CTA is OUT OF SCOPE** for this spec. The Contact section is its own surface and folds into [`site-chrome-spec-v1.md`](#) (spec #6). The About page ends at the signature; the page-bottom torn-paper edge transitions into the site-chrome footer where Contact lives.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + `hero-spec-v1.md` + `case-study-spec-v1.md` open.

---

## 1. The About Page, in one sentence

A single-column animator's-sketchbook page where Sean's animator-self and PM-self run forward in time in sync — braided down a single column by a chromatic lane-tint rule (warm amber for animator beats, teal for PM beats, blended for braided ones) — landing in a mid-page "Saturday morning canon" cel-grid that earns the lead line literally by mapping six formative cartoons to six product/craft principles.

## 1.1 Changelog

- **2026-05-18 (substrate externalized to texture-and-artifacts-spec-v1.md):** The site's three-layer model (full-bleed teal `#0A3E42` chrome → cream paper sheets → page content) was promoted from "implied" to a dedicated foundational spec at `texture-and-artifacts-spec-v1.md`. The about page now inherits its substrate from that spec rather than declaring its own. Two consequential edits land in this file: (a) the §2 anatomy diagram's torn-paper edge labels are updated to name the chrome explicitly (top edge "reveals teal chrome `#0A3E42`"; bottom edge "reveals teal chrome → site-chrome footer (Contact lives there)"); (b) the §3 vertical budget's torn-paper top + bottom rows correct from 32px (which assumed an SVG fake-tear) to ~200px visible / 80px overlap into the chrome above (which reflects the real raster torn-paper PNG defined in §4 of the texture spec). No other §2/§3 changes — the rest of the page anatomy is unaffected because the chrome substrate was already implicit. All cartoon-cel art assets + hand-drawn heading SVGs + pencil-margin annotation vocabulary are also now governed by the texture spec's §6 authoring pipeline; the about spec's §14 (pencil annotations) and §16 (build stack) stay authoritative for *which* artifacts land *where on the about page*, while *how* they get authored, sized, and optimized lives in the texture spec.
- **2026-05-18 (B-1 geometry swap + B-4 evergreen rewrite):** Two structural edits after Sean's review. **B-1** abandons the two-column animator-vs-PM parallel-lineage timeline (with torn-paper gutter + cross-gutter SVG arrows) in favor of a **single-column stacked-beats** layout: 6-8 moments running top-to-bottom, each a Newsreader sentence + JetBrains Mono subline, with a thin left-margin rule that runs **warm amber `#FAC775` for animator-coded beats**, **teal `#0A3E42` for PM-coded beats**, and **blends between** when a beat braids both. The parallel-lineage rule (PMP §3.1) survives — it's now expressed as a chromatic gradient on a single column, not as side-by-side columns. The "back-and-forth" reading rhythm Sean found exhausting collapses into a single down-the-page scan. Mobile no longer needs the alternating-row collapse rule. §2 anatomy diagram, §3 vertical budget (B-1 collapses from ~1200-1800px to ~960-1280px), §4 type + voice register, §6 motion timeline (cross-gutter arrow logic retired), §9 fully rewritten, §14 annotations (cross-gutter arrows removed from the curved-arrow vocabulary list, registration-mark corners retained as "beat-column registration spine"), §16 build stack (`<TimelineGutter />` and `<GutterArrow />` retired; `<BeatRow />` + `<LaneRule />` added), §17 DoD items 5 + 6 rewritten, Appendix A file map updated. **B-4** replaces the job-hunt-coded `AVAILABLE 2026-05 · AI PM > TECH PM > CREATIVE PM` pill + "I'm looking for a seat..." copy with **direction-of-craft prose** ("What I'm building toward" — 2 paragraphs naming Sean's bet on AI-native PM, agent governance, and the spec layer). A tiny `CURRENTLY @ FREE AGENT` or `CURRENTLY @ <COMPANY>` mono stamp top-right of the section is the only employment-state surface — driven by frontmatter `current_company`. The agent-fleet-config beat is preserved but moved into a single italic call-out that renders **only when `available: true`** ("if you're hiring around this, my agent fleet config goes out on second conversation"). Net effect: when Sean gets hired, he flips `available: false` and updates `current_company` — zero prose edits required, the page reads cleanly either way. §2 anatomy, §4 type + voice register, §12 fully rewritten, §17 DoD item 8 rewritten, Appendix B frontmatter shape updated.
- **2026-05-18 (lead-line + home-hero swap):** After drafting the About body, Sean preferred the single original line ("Raised by Saturday morning cartoons and Vercel deployment logs.") as the About header — the 3-sentence credentials block was retired. In lockstep, the home-hero tagline was repositioned to lead with the PM role explicitly ("Product Manager. The agents handle the math. I handle the taste.") — letting the home page declare the role and the About page do the biographical work. The cross-page rhyme architecture (home "Raised by..." → about "Trained by...") dissolves; the two pages now tell one story in two registers (declarative on home, biographical on About) without rhyming verbatim. PMP §4 updated in lockstep. The "Trained by Looney Tunes..." string is marked SUPERSEDED 2026-05-18 in PMP §4. The bottom-of-page pull quote is updated to echo the new home hero. §7.1 and §7.2 rewritten accordingly. The motion timeline collapses from per-sentence-stagger to a single-line reveal (one beat, not three).
- **2026-05-17 (revision):** Lead-line + B-3 section revised after Sean's review of v1. The dog framing was killed (it forced an artifact that wasn't load-bearing to Sean's actual personality). The PMP §4 About-page lead row gets updated in lockstep — the locked string moves from the dog deflation to a **compressed-parallel credentials block** that harmonizes with the home-hero tagline ("Raised by..." → "Trained by..."). B-3 transitions from a dog-Polaroid gallery to **Saturday morning canon** — six hand-drawn pencil-test studies of cartoon characters Sean takes as formative, each captioned with the product/craft principle the cartoon taught. Animation-cel frame treatment (with hand-drawn registration pegs) replaces Polaroid framing to signal "cultural-craft reference rendered through Sean's hand" rather than "personal artifact." Five dog-related OPEN questions in §18 are removed; three cartoon-canon OPENs added.
- **2026-05-17 (initial):** First draft. Honored hero §10's locked "About = paper, no splash" decision. Annotation density cap raised from ≤6 (case-study) to ≤12 (About).

---

## 2. Anatomy

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, reveals teal chrome #0A3E42) ╲╱╲╱╲╱╲╱╲
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
│  │  Raised by Saturday morning       │  │   pencil-test PNG,       │ │
│  │  cartoons and Vercel              │  │   alpha channel,         │ │
│  │  deployment logs.                 │  │   ~640px tall            │ │
│  │                                   │  │                          │ │
│  │  Newsreader, clamp(36, 4.5vw, 72),│  │   (the same character    │ │
│  │  weight 300, ink, 1-2 lines       │  │    as cursor / tile /    │ │
│  │  desktop, 2-3 lines mobile,       │  │    hero, full-body,      │ │
│  │  max-width 720px                  │  │    static)               │ │
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
│  ┌──────────────── STACKED BEATS, LANE-TINT RULE ────────────────┐   │
│  │                                                               │   │
│  │  ▌ age 8 · 1998                                               │   │
│  │  ▌ drew a coyote badly. asked dad to deploy a webpage.        │   │
│  │  ▌ it was on Geocities.                                       │   │
│  │  ▌                                                            │   │
│  │  ▌ age 14 · 2004                                              │   │
│  │  ▌ filled six sketchbooks. shipped the school-play site.      │   │
│  │  ▌ learned what "broken" meant.                               │   │
│  │  ▌                                                            │   │
│  │  ▌ age 22 · 2012                                              │   │
│  │  ▌ first short film. first festival rejection.                │   │
│  │  ▌ first PRD. first stakeholder loop.                         │   │
│  │  ▌                                                            │   │
│  │  ▌ (6-8 beats total)                                          │   │
│  │                                                               │   │
│  │  ▌ = left-margin lane rule, ~3px wide, runs the full height   │   │
│  │      of each beat.                                            │   │
│  │      ANIMATOR-coded beat → warm amber #FAC775                 │   │
│  │      PM-coded beat       → teal #0A3E42                       │   │
│  │      BRAIDED beat        → vertical gradient amber → teal     │   │
│  │                                                               │   │
│  │  Each beat: JetBrains Mono date line (age + year) above       │   │
│  │  a 1-2 sentence Newsreader 18/16 body. ~120-160px per beat.   │   │
│  │  Single column desktop AND mobile — no grid, no gutter,       │   │
│  │  no cross-arrows. The braid is the gradient.                  │   │
│  └───────────────────────────────────────────────────────────────┘   │
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
│                                          ┌────────────────────────┐  │
│                                          │ CURRENTLY @ FREE AGENT │  │
│                                          └────────────────────────┘  │
│                                                ↑ mono stamp,         │
│                                                  top-right of B-4,   │
│                                                  driven by frontmatter│
│                                                  current_company.     │
│                                                                      │
│  WHAT I'M BUILDING TOWARD                                            │
│                                                                      │
│  2 short paragraphs — direction-of-craft, not direction-of-Sean.     │
│  Names the bet: AI-native PM, agent governance, the spec layer.      │
│  Reads the same whether Sean is hired or hunting. No "available"     │
│  language. No geography unless geography is part of the craft bet.   │
│                                                                      │
│  ── conditional, renders ONLY when available: true ─────────────     │
│  ╱ if you're hiring around this, my agent fleet config goes out      │
│  ╱ on second conversation.                                           │
│  ─── Newsreader italic, single line, paper-strip background ────     │
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
│  "Product Manager. The agents handle the math.                       │
│   I handle the taste."                                               │
│  Newsreader 40px italic, paper-strip background — echoes             │
│  the home hero tagline (cross-page closeout)                         │
│                                                                      │
│                                                                      │
│  Sean   ← handwritten signature SVG                                  │
│         ◐ registration mark (page closeout, bottom-right)            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, reveals teal chrome) → site-chrome footer (Contact lives there) ╲╱╲╱╲╱╲╱╲
```

Six bands. Top to bottom: **dateline strip → lead-line + character hero → live pulse strip → stacked beats with lane-tint rule (B-1) → comprehension thesis (B-2) → Saturday morning canon (B-3) → building-toward (B-4) → proof points (B-5) → pull quote → signature**. The page sits on cream paper edge to edge. No splash. The character + the annotations + the pencil-test cartoon cels + the B-1 lane-tint rule carry the chromatic interest.

---

## 3. Vertical budget

### Desktop (≥1024px, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | ~200px visible | Raster PNG asset per texture-and-artifacts-spec §4. Overlaps the teal chrome above by 80px (negative margin); overlaps the paper sheet below by 2px to hide the seam. |
| Top padding | 60px | |
| **Dateline strip** | ~54px | reused component, includes reading-time `4 MIN` suffix |
| Gap | 60px | |
| **Lead-line + character hero** | ~640px | 2-column grid; single-line lead at `clamp(36px, 4.5vw, 72px)` Newsreader weight 300 left (wraps 1-2 lines), character PNG full-body right. Character height (640px) is the binding constraint on the section height. |
| Gap | 60px | |
| **Live pulse strip** | ~80px | mono, paper, 0.5px teal dividers top + bottom |
| Gap | 100px | |
| **B-1 Stacked beats + lane-tint** | ~960-1280px | 6-8 single-column beats, ~120-160px per beat, lane-tint rule on the left margin (~3px wide). No gutter, no cross-arrows. |
| Gap | 100px | |
| **B-2 Comprehension thesis** | ~600px | single column, max-width 680px |
| Gap | 100px | |
| **B-3 Saturday morning canon** | ~860px | 3×2 cel grid (~360px per row) + wire-service caption strips below each cel |
| Gap | 100px | |
| **B-4 Where I'm going** | ~460px | `WHAT I'M BUILDING TOWARD` heading + 2 paragraphs + conditional recruiter italic (~40px when rendered). `CURRENTLY @` stamp floats top-right of the section, doesn't add to vertical budget. |
| Gap | 80px | |
| **B-5 Proof points** | ~280px | 4 mono links, left-aligned |
| Gap | 120px | |
| **Pull quote** | ~280px | paper-strip background, Newsreader 40px italic, centered — quoting the home-hero tagline |
| Gap | 80px | |
| **Signature + closeout** | ~120px | handwritten "Sean" SVG + registration mark bottom-right |
| Bottom padding | 80px | |
| Torn-paper bottom edge | ~200px visible | Same raster PNG flipped via `transform: scaleY(-1)` per texture-and-artifacts-spec §4.4. Overlaps the paper sheet above by 2px; overlaps the teal chrome below by 80px. Site-chrome footer (where Contact lives) renders on the chrome, below the tear. |
| **Page height** | ~5300-5900px | longest page on the site by design. Range bumped +200px vs. earlier draft to reflect the real ~200px raster torn-paper edges (each contributes ~118px to document flow after the §4.4 negative-margin overlaps). |

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Lead-line + character hero | Stack: character PNG on top (max-height 360px), lead line below, single line wraps to 2-3 lines at the mobile type-scale floor |
| Live pulse strip | Wraps to 2-3 lines, same content |
| **B-1 stacked beats** | No collapse needed — already single-column at all viewports. Lane-tint rule stays at ~3px wide; if the lane-rule color contrast feels weak at mobile sizes, the rule widens to ~4px. |
| **B-3 cartoon canon** | Single-column stack; each cel + caption renders full-width, 6 stacked. No horizontal carousel (the lessons are too important to risk being swiped past). |
| Annotations | Cap drops from ≤12 → ≤6 (geometry breaks at high density on mobile) |
| Pull quote | Newsreader `clamp(24px, 5vw, 40px)` |

The opinionated bit for B-1 across viewports is the **lane-tint rule itself** — a single column with a chromatic left-margin rule preserves the parallel-lineage rule (PMP §3.1) without geometry, because animator-coded and PM-coded beats are visually distinguishable at-a-glance through the rule color, not through column position. A purely monochrome single-column timeline would imply chronological hierarchy and fail PMP §3.1.

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
| **Beat date line** (`age 8 · 1998`, etc.) | JetBrains Mono | 12 / 11 | 500 | 1.4px | `#7C2D12` |
| **Beat body** | Newsreader | 18 / 16 | 400 | -0.1px | `#1A1A1E` |
| **Beat lane rule** (left margin) | — (CSS background) | width 3px desktop / 4px mobile | — | — | `#FAC775` (animator) / `#0A3E42` (PM) / linear-gradient `#FAC775 → #0A3E42` top-to-bottom (braided beat) |
| B-2 prose | Newsreader | 22 / 18 | 300 | -0.2px | `#1A1A1E` |
| **Cartoon cel name strip** | JetBrains Mono | 11 (both) | 500 | 1.2px | `#1A1A1E` (inside the cel, bottom-left) |
| **Cartoon cel year suffix** | JetBrains Mono | 11 (both) | 400 | 1.2px | `#546E71` (inside the cel, after the name) |
| **Cartoon lesson noun (caption prefix)** | JetBrains Mono | 12 (both) | 500 | 1.6px | `#7C2D12` (caption strip below cel) |
| **Cartoon lesson body** | JetBrains Mono | 12 / 11 | 400 | 0.8px | `#546E71` (caption strip below cel) |
| **B-4 "Currently @" stamp** | JetBrains Mono | 12 (both) | 500 | 1.8px | `#7C2D12` (stamp amber) on `rgba(124,45,18,0.06)` paper-tinted background, 1px stamp-amber outline rendered as a hand-stamp rectangle |
| **B-4 section heading** ("WHAT I'M BUILDING TOWARD") | JetBrains Mono | 13 (both) | 500 | 1.8px | `#7C2D12` (stamp amber), small-caps style — wire-service section heading, not a hand-drawn SVG, sits below the B-4 hand-drawn heading SVG |
| B-4 prose | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
| **B-4 conditional recruiter italic** | Newsreader | 18 / 16 | 300 italic | -0.1px | `#0A3E42` (primary teal), on a paper-strip background `rgba(10,62,66,0.04)` with 0.5px teal top + bottom dividers — visual sibling to the live pulse strip up top |
| Proof-point links | JetBrains Mono | 15 / 13 | 500 | 0.6px | `#0A3E42` (underline on hover) |
| Pull quote | Newsreader | `clamp(28px, 4.5vw, 40px)` | 300 italic | -0.3px | `#0A3E42` |
| Signature | SVG (handwritten), not type | rendered ~36px tall | — | — | `#1A1A1E` |

**Hand-drawn section headings are the typographic signature of this page.** Every B-N heading is a custom SVG, rendered at ~48px tall, in primary teal `#0A3E42`. The heading SVGs live in `src/assets/headings/about/`. Five headings total: `b1-how-i-got-here.svg`, `b2-why-pm.svg`, **`b3-saturday-morning-canon.svg`**, `b4-where-im-going.svg`, `b5-proof-points.svg`. Single-color, viewBox-locked, scale freely.

### Voice register by section (PMP §3.3)

| Section | Register | Notes |
|---|---|---|
| Dateline strip | Wire-service mono | Same as hero/case-study |
| **Lead line** | **Editorial declarative** | A single Newsreader-serif line establishing lineage. Sedaris register — two specific true things in comedic juxtaposition (Saturday cartoons + Vercel deploys), no punchline, no credentials list. Earns the home hero's "taste" claim by naming where the taste came from. The factual ship-stamps that previously sat below the headline are now distributed to the live pulse strip and B-4 availability section, where they read as evidence rather than claims. |
| **Live pulse strip** | **Wire-service personal** | Wire-service register applied to personal data — commits / drafts / frames cleaned / reading. Past 24h, factual, no first-person pronouns. |
| **B-1 stacked beats** | **Wire-service captions** | Each beat's prose is wire-service: dated, factual, one claim per beat. The animator/PM braid lives in the **lane-tint rule**, not in the prose — sentences themselves are register-neutral. Quotes around childhood mile-markers are encouraged but optional. Mixing animator-detail + PM-detail in the same beat sentence is the move that earns a braided lane rule. |
| **B-2 prose** | **Sedaris-coded narrative** | The page's most personal section. First-person-warm, comedic juxtaposition, specific nouns. |
| **B-3 cartoon lessons** | **Wire-service captions, declarative** | Each lesson opens with a noun (`TIMING.` / `ANTICIPATION.` / `POV.`) followed by a one-line elaboration that maps the cartoon-craft principle to a product-craft principle. Pure declarative voice — no first-person, no comedic move. The lesson IS the move. |
| **B-4 where I'm going** | **Position-statement / direction-of-craft** | Calm, factual, future-tense. Names the bet (AI-native PM, agent governance, spec-layer ownership) and the problems Sean wants to be in the room for. Reads identically whether Sean is hired or hunting. No "open to opportunities" or "looking for a seat" language — the bet is durable, the availability state is not. The `CURRENTLY @ …` stamp and the conditional italic call-out are the **only** surfaces that carry employment-state signal; the prose body must work without them. |
| **B-5 proof points** | Wire-service mono | Single-line links. No descriptions. |
| Pull quote | Editorial (home-hero call-back) | The home-hero tagline (*"Product Manager. The agents handle the math. I handle the taste."*) reproduced verbatim at the page foot, in serif italic. Closes the page with a cross-surface echo to the surface the visitor entered through. |

**The opinionated bit:** the lead line is editorial-as-stat-block, the pulse strip is wire-service, B-1 is wire-service-with-chromatic-braid (the prose is register-neutral; the lane-tint rule carries the lineage signal), B-2 is Sedaris, B-3 is **declarative-wire-service** (a new register on this page — the cartoon-lessons sound like classified ads for product-craft principles), B-4 is position-statement (direction-of-craft, employment-state-neutral), B-5 is wire-service, pull quote is editorial. **Warm and factual alternate by section** — and the new declarative register in B-3 reads as "the canon, plainly stated," which fits the section's authority claim ("here's what taught me to ship").

**STOP-DOING:** Per PMP §3.4. The HybridRouter is never described as architecture on this page either. If agent-fleet operation is named in the lead line ("Deploys agent fleets.") or B-4 ("AI PM"), the framing is product judgment + governance + authority — not concurrency or routing. The semantic-product-architecture lane, not the runtime lane.

---

## 5. Color rules — About scope

About inherits the full hero §5 palette. **About has NO splash block** per hero §10 (locked).

| Color | Hex | Used by |
|---|---|---|
| Paper | `#FFF9F0` | Page background, edge to edge |
| Ink (primary) | `#1A1A1E` | Lead line, prose, beat body, cartoon cel name strip |
| Teal (primary) | `#0A3E42` | Hand-drawn heading SVGs, proof-point links, pull quote, **B-1 lane-tint rule for PM-coded beats**, B-4 recruiter italic |
| Secondary ink | `#546E71` | Dateline body, pulse body, cartoon lesson body, cel year suffix |
| Stamp amber | `#7C2D12` | Dateline prefix, pulse prefix, beat date lines, cartoon lesson noun, reading-time, B-4 "Currently @" stamp, B-4 section heading |
| Amber mid-stop | `#FAC775` | Frame-number prefixes (`B-1 ·`), registration marks, cartoon-cel registration pegs, **B-1 lane-tint rule for animator-coded beats** |
| Border whisper | `rgba(10, 62, 66, 0.15)` | Pulse strip dividers, cartoon-cel 0.5px outer border, B-4 recruiter italic top/bottom dividers |
| Annotation ink | `rgba(10, 62, 66, 0.7)` | Pencil-margin annotation strokes (curved arrows) |
| Strikethrough ink | `rgba(124, 45, 18, 0.8)` | Annotation X (e.g., on the "v3 portfolio" historical artifact, if surfaced) |
| Coffee ring | sepia PNG | One per page, ~30% opacity |

**No coral, no third splash color, no decorative gradients except the B-1 braided-beat lane rule.** The chromatic interest comes from: (1) the character PNG, (2) the 6 pencil-test cartoon cels, (3) the maximum-density pencil annotations, (4) the B-1 lane-tint rule running down the left margin of the stacked beats. The braided-beat gradient is the **only** sanctioned multi-color gradient on the site, and it's load-bearing for the parallel-lineage thesis — not decorative.

---

## 6. Motion timeline

Trigger: page entry (via View Transition from a sibling route or via direct nav).

| t (ms) | Element | Animation | Easing | Duration |
|---|---|---|---|---|
| 0 | View Transition completes; dateline + lead line + character PNG already painted | — | — | — |
| 200 | Dateline + reading-time | Type-on, character by character | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| 400 | Lead line | **Per-line reveal** (1-2 lines desktop, 2-3 lines mobile), translateY(40px) → 0 + opacity, 120ms stagger between wrapped lines — the line settles in like a hand-written page heading | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 700ms total |
| 600 | Character PNG | Fade 0 → 1, no translation | linear | 600ms |
| 1300 | Live pulse strip | Fade + translateY(8px) → 0 | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms |
| viewport-triggered | Each B-1 beat | IntersectionObserver-triggered. Beat body fades + translateY(12px) → 0. The lane-tint rule for that beat reveals via SVG `stroke-dasharray` top-to-bottom **after** the beat body lands (200ms delay) — the rule "draws in" as the beat settles, reinforcing the sense that the lineage gets resolved beat by beat as the reader scrolls. Braided-beat rules draw amber-then-teal in a single continuous reveal. | `cubic-bezier(0.22, 1, 0.36, 1)` | 600ms body + 500ms rule |
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
Raised by Saturday morning cartoons and Vercel deployment logs.
```

- Source: `src/content/about/index.mdx` frontmatter field `lead:` — **identical to PMP §4 locked string (revised 2026-05-18)**
- Build-time validator (`scripts/validate_about.mjs`) asserts the lead line in MDX matches PMP §4 byte-for-byte. Build fails on drift.
- Type: Newsreader, `clamp(36px, 4.5vw, 72px)`, weight 300, tracking -0.4px, ink `#1A1A1E`
- **Renders as one editorial line.** Wraps to 2 lines on desktop (≥1024px) at the cited size — the natural break lands between `cartoons` and `and`, which the design accepts as the editorial breath. Mobile wraps to 2-3 lines.
- max-width 720px desktop, 100% mobile
- Implementation: single `<p>` element. No forced line breaks; let the typography determine the wrap. The string IS the artifact — its rhythm comes from the words, not from imposed `<br>` tags.
- No quote marks render on screen — the line is declared, not quoted.
- No CTA below it. The pulse strip is the next thing.

### 7.2 Why this lead line works

**The line establishes lineage on the page where lineage belongs.** The home hero declares the role (*"Product Manager. The agents handle the math. I handle the taste."*); the About page establishes how the person got that taste. *"Raised by..."* puts both halves of Sean's lineage — Saturday morning cartoons (creative / right-brain) and Vercel deployment logs (technical / left-brain) — in childhood. They're parallel, equal lineage — no timeline, no hierarchy, no "old hobby vs. new career." The line passes the parallel-lineage rule (PMP §3.1) trivially because "raised by" implies both have been there all along.

**It earns the home hero's "taste" claim by showing where the taste came from.** The home hero says *I handle the taste*. About says *here's the lineage that built the taste*. The two pages tell one story across two surfaces — declarative on home, biographical on About — without rhyming verbatim. The mid-page Saturday morning canon section (§11) earns this lineage claim literally by mapping six cartoons to six product/craft principles. By the time the reader leaves the page, the line has been substantiated, not just asserted.

**No comedic deflation, no factual ship-stamps.** The line lands its point through the comedic juxtaposition of two specific, true things (Saturday cartoons + Vercel deploys) without needing a punchline or a credentials list. Sedaris register: hyper-specific nouns, no signposting. The factual ship-stamps that were earlier carried by sentences 2-3 of the "Trained by..." credentials block (*"Ships AI-native products. Deploys agent fleets."*) are now distributed across the live pulse strip (§8) and the B-4 availability section, where they belong as evidence rather than as claims sitting next to the headline.

**Cross-page closeout via pull quote.** The page ends (§Anatomy, "Pull quote") with the home hero tagline reproduced verbatim — the visitor's last beat on About is a callback to the page they entered through. Both surfaces close the loop without the rhyme architecture of the prior draft.

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

## 9. B-1 — How I got here (stacked beats, lane-tint rule)

The load-bearing section. Where PMP §3.1's parallel-lineage rule becomes **chromatic** — a single column of beats with a colored left-margin rule that varies per beat to declare which lineage(s) that beat belongs to.

### 9.1 Why stacked beats, not two columns

The prior draft used a two-column CSS Grid with a torn-paper gutter and cross-gutter SVG arrows. It read as back-and-forth ping-pong: the reader's eye bounced left-right-left-right across the gutter, age by age, and the "parallel" thesis got buried under the geometry. Two real problems:

1. **Reading rhythm fights the thesis.** Parallel lineage is supposed to feel like *both threads have always been there, in sync*. Side-by-side columns make the reader actively switch between two narratives — the opposite of "in sync."
2. **Mobile collapse was load-bearing on a fragile rule.** The two-column → alternating-rows mobile collapse preserved the parallel-lineage thesis structurally but at the cost of a different reading rhythm on every viewport. Two different geometries for one thesis is a smell.

The stacked-beats layout collapses both problems: **one column on every viewport, one reading rhythm (top-to-bottom), and the lineage signal lives in a chromatic left-margin rule** rather than in column position. The reader scans down once; the rule color tells them, beat by beat, whether they're in animator territory, PM territory, or a moment where both braided.

### 9.2 The component shape

- **Single column**, max-width 680px, centered. Same max-width as B-2 prose for vertical consistency.
- **6-8 beats** total. The number is opinionated: 8-10 was the old paired-row count; with the back-and-forth gone, each beat carries more semantic weight, so fewer beats land harder. Sean writes the canonical list in the build session.
- **Each beat** has three parts:
  1. **Date line** — JetBrains Mono 12/11px weight 500, stamp amber `#7C2D12`, format `age N · YYYY` (e.g., `age 8 · 1998`)
  2. **Body** — Newsreader 18/16px weight 400, ink `#1A1A1E`, 1-3 sentences. One claim per beat. Can quote younger-Sean ("*I want to be a cartoonist*") but the quote shouldn't be the whole beat.
  3. **Lane-tint rule** — a left-margin vertical bar, 3px wide desktop / 4px mobile, running the full height of the beat (date line + body). The bar sits ~16px to the left of the date line. Color is determined per-beat (see §9.3).
- **Vertical spacing** — 32px gap between beats. Lane rules do NOT extend through the gap; each beat's rule is self-contained, which makes the chromatic shift between beats legible.

### 9.3 The three lane states

| State | Rule color | When to use |
|---|---|---|
| **Animator** | Solid `#FAC775` (amber mid-stop) | Beat is purely animator-self — drawing, animation, film, traditional craft. e.g., "filled six sketchbooks; saved up for first Wacom." |
| **PM** | Solid `#0A3E42` (primary teal) | Beat is purely PM-self — code, deploys, product judgment, agents. e.g., "first PM role; first PRD; first stakeholder loop." |
| **Braided** | Linear gradient `#FAC775` → `#0A3E42`, top-to-bottom | Beat braids both threads in the same sentence. The most opinionated beats. e.g., "age 8 — drew a coyote badly and asked dad to deploy a webpage." These beats are the page's load-bearing moments — they're the literal evidence that the two threads were always in sync. |

**Rule for the writer:** at least 2 of the 6-8 beats should be **braided**. They're the proof. If every beat is animator-only or PM-only, the parallel-lineage thesis collapses into "I had two hobbies." Braided beats are what makes it lineage.

### 9.4 No annotations inside the lane rule

The maximum-density pencil annotations (§14) stay **outside** the beat column — in the page margins, not in the lane-rule channel. A single annotation may point AT a beat (curved arrow with label, anchored beside the date line), but the rule itself is a chromatic system, not a notation surface. Mixing the two would create read-order confusion: is the color a signal, or is the color part of the annotation? Keep them lanes apart.

### 9.5 Mobile

No collapse — the layout is already single column at every viewport. The lane-tint rule widens slightly (3px → 4px) for legibility at small sizes. Vertical gap between beats reduces from 32px → 24px to keep the section from over-running on phones.

### 9.6 Content collection

Beats live in MDX frontmatter as an array, so the lane state is declarative:

```yaml
beats:
  - age: 8
    year: 1998
    body: "drew a coyote badly. asked dad to deploy a webpage. it was on Geocities."
    lane: braided
  - age: 14
    year: 2004
    body: "filled six sketchbooks. shipped the school-play site. learned what 'broken' meant."
    lane: braided
  - age: 18
    year: 2008
    body: "RISD pencil tests; flipbook obsession."
    lane: animator
  - age: 22
    year: 2012
    body: "first short film. first festival rejection. first PRD. first stakeholder loop."
    lane: braided
  # …6-8 total
```

The `<Beats />` component reads this array and renders one `<BeatRow />` per entry, with the `<LaneRule />` colored per `lane` value. The schema is small enough that Sean can iterate on beats during the build session without touching component code.

**[OPEN-2: Beat content (§9)]** — 6-8 beats, with at least 2 marked `lane: braided`. The component is locked; the prose is not. Sean writes the canonical beats in the build session. Recommended: draft 10-12, cut to 6-8, prioritize braided beats over animator-only or PM-only ones.

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

## 12. B-4 — "Where I'm going" (direction of craft, employment-state-neutral)

A position-statement section. **Reads identically whether Sean is hired or hunting.** The job-hunt-coded framing of the prior draft (the `AVAILABLE 2026-05 · AI PM > TECH PM > CREATIVE PM` pill, the "I'm looking for a seat..." copy, the "agent fleet config before our second conversation" line) is gone — that copy required Sean to rewrite the section the moment he got a job, which fights the whole "this site is alive" thesis. The replacement separates **what Sean is building toward (durable)** from **his current employment state (volatile)** and renders them as different surfaces with different update cadences.

### 12.1 Three surfaces, one section

The section has three discrete surfaces, top to bottom:

1. **`CURRENTLY @ …` stamp** — top-right of the section, mono 12px stamp-amber on a paper-tinted background, hand-stamp rectangle outline. Reads `CURRENTLY @ FREE AGENT` when `frontmatter.current_company` is null, `CURRENTLY @ FOO INC.` (uppercase, mono) when populated. **This is the only surface that carries employment-state signal.** Updating it is one frontmatter field; no prose edits.
2. **`WHAT I'M BUILDING TOWARD` heading + 2 paragraphs** (always rendered) — wire-service mono section heading in stamp amber, followed by 2 short Newsreader paragraphs naming the **craft direction**: AI-native PM as discipline, agent governance, the spec layer as the durable PM artifact. Names the **problems Sean wants to be in the room for** rather than the role he wants to get. Future-tense, opinionated, employer-agnostic. Sean writes these paragraphs once; they age across job changes because the bet is about the field, not about Sean's vacancy.
3. **Recruiter italic call-out** (conditional, `frontmatter.available === true` only) — a single Newsreader italic line on a paper-strip background (visual sibling to the live pulse strip up top), at the bottom of the section. Suggested copy: *"if you're hiring around this, my agent fleet config goes out on second conversation."* This is where the prior draft's punchy recruiter beat goes — preserved, but **fenced**. When Sean flips `available: false`, this entire surface disappears; the section above closes cleanly on the 2-paragraph craft direction and the page reads as continuous practice rather than vacancy notice.

### 12.2 The aging contract

When Sean accepts an offer, the **only** edits to this section are:

```yaml
available: false           # was: true
current_company: "Foo Inc." # was: null
```

The `CURRENTLY @` stamp updates from `FREE AGENT` → `FOO INC.`, the recruiter italic call-out stops rendering, and the 2 paragraphs of craft-direction prose stay verbatim. Net: **zero prose edits** when Sean's hired. Same when he leaves: flip the two fields back, the recruiter italic returns, the rest of the page is unchanged.

This is the structural answer to "I don't want to make edits whenever I actually get the job." The volatile part of the section is data, not prose, and the prose carries the durable signal.

### 12.3 Voice register

Position-statement / direction-of-craft. Calm, future-tense, **opinionated about the field**. Names the bet, names the problems, names the artifact Sean considers durable (the spec layer). No "open to opportunities," no "looking for," no "available for," no listing of preferred company sizes or industries. The closest registers on the rest of the page are B-2 (Sedaris-coded thesis) and the pull quote (editorial); B-4 is colder than both — more position paper than personal essay.

### 12.4 What stays out

- **No geography line.** "Boston metro or remote" was load-bearing only when the section was a vacancy notice. Without that framing, geography becomes irrelevant trivia; it can live in the resume PDF if needed.
- **No "AI PM > Tech PM > Creative PM" role-stacking.** The prior pill ranked role flavors; the new prose ranks **problems**, which doesn't expire when Sean's title changes.
- **No date window.** `AVAILABLE 2026-05` was a freshness signal; the live pulse strip up top is now the page's freshness signal (it updates daily by the Daily Driver). The B-4 section trusts the pulse strip to do that work and stays evergreen.

### 12.5 Component shape

```
<section id="b-4">
  <CurrentlyAtStamp current_company={frontmatter.current_company} />
  <h2>WHAT I'M BUILDING TOWARD</h2>
  <!-- 2 paragraphs from MDX body, Newsreader 20/18px weight 300 -->
  <RecruiterCallout visible={frontmatter.available === true} />
</section>
```

`<CurrentlyAtStamp />` reads one frontmatter field and renders the stamp. `<RecruiterCallout />` reads one frontmatter field and renders or returns null. Neither component has user-facing copy that changes — the call-out's italic line is locked in the component, validated against PMP §4 if Sean wants to surface it there for cross-page consistency.

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

1. **Curved arrow** with label — top-of-page "updated weekly", an optional arrow beside one B-1 beat (anchored next to the date line, label like *"this is when it clicked"*), "the live evidence" arrow on `/transactions/` link, "this one rewires you" arrow on one cartoon cel in B-3. **Cross-gutter arrows are retired** — the B-1 layout no longer has a gutter to cross.
2. **Strikethrough X** — on a "v3 portfolio" historical artifact link if Sean wants to surface it (see §18 OPEN); else not used
3. **Coffee ring** — one per page, on B-2 prose
4. **Registration mark** — page closeout bottom-right, plus 2 corner marks at the top + bottom of the B-1 beat column (treating the beat column itself as a registration spine) to evoke an animator's registration peg system. (Note: the cartoon cels' top registration pegs in B-3 are a SEPARATE pattern — they're part of the cel-frame component, not freestanding annotations.)
5. **Kid's drawing scan** *(margin artifact)* — one per page only, in B-1 left or right margin (beside the beat column, not inside it)
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
| **Stacked beats component** | `<Beats />` (reads `beats[]` from MDX frontmatter) + `<BeatRow />` (renders one beat — date line + body + lane rule) + `<LaneRule />` (3px vertical SVG, color per `lane` prop) | Pure CSS, no JS hydration. `<LaneRule />` uses inline SVG for the `stroke-dasharray` reveal animation, same primitive as the signature. |
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

1. The MDX file at `src/content/about/index.mdx` exists with full frontmatter per Appendix B: `lead` (locked, validated), `linkedin_url`, `github_url`, `transactions_url`, `resume_url`, `available` (boolean), `current_company` (string or null), `character_image`, `character_alt`, `beats[]` (6-8 entries with `age` + `year` + `body` + `lane`), and `b3_load_bearing_cel` (1-6).
2. `scripts/validate_about.mjs` runs in `prebuild` and asserts the `lead:` field matches **the revised PMP §4 string byte-for-byte** (`"Trained by Looney Tunes and Vercel deployment logs. Ships AI-native products. Deploys agent fleets."`). Build fails on drift.
3. The above-the-fold renders the 3-sentence lead as a stat-block + character PNG at the spec'd proportions. The character PNG exists at `/public/assets/character/about-full-body.png`.
4. The live pulse strip reads from a real `/api/about-pulse.json` written by the Daily Driver — not hardcoded. Stale-data fallback works. **No `dog_walks` item type in the schema.**
5. The B-1 stacked-beats section renders 6-8 beats in a single-column layout (same geometry desktop + mobile), each beat showing a JetBrains Mono date line, a Newsreader body, and a left-margin lane-tint rule (3px desktop / 4px mobile). At least 2 of the beats are marked `lane: braided` and render with the amber-to-teal vertical gradient rule.
6. Each B-1 beat's lane rule reveals via SVG `stroke-dasharray` top-to-bottom on viewport entry, 200ms after the beat body lands. Disabled under reduced motion (rules render solid at final color). At most 1 curved-arrow annotation lands beside a beat in B-1.
7. **The B-3 Saturday morning canon renders 6 `<CartoonCel />` entries from `src/content/cartoons/` in a 3×2 grid on desktop, stacks single-column on mobile. Each cel includes: hand-drawn registration pegs (SVG), Sean's pencil-test study (PNG), cartoon name + year strip inside the cel, and a wire-service caption strip below.** No real cartoon stills (licensing); pencil-test studies only.
8. B-4 renders three surfaces: (a) the `CURRENTLY @ FREE AGENT` / `CURRENTLY @ <COMPANY>` mono stamp top-right, driven by `frontmatter.current_company`; (b) the `WHAT I'M BUILDING TOWARD` heading + 2 paragraphs of direction-of-craft prose, always rendered, employment-state-neutral; (c) the recruiter italic call-out at the bottom, rendered **only** when `frontmatter.available === true`. Flipping `available: false` + setting `current_company` is sufficient to take the page from "available" → "employed" state with zero prose edits. The aging contract in §12.2 is satisfied: a fresh reader cannot tell that any of the section's text was written before or after Sean's last job change.
9. The B-5 proof points render four mono links with the "rev scribble" annotation on the `/transactions/` link.
10. Pencil annotations render at the spec'd density cap (≤12 desktop / ≤6 mobile) with the seven vocabularies defined in §14. Never adjacent within 200px (desktop) / 120px (mobile). **One annotation lands in B-3** (curved arrow with "this one rewires you" label, pointing at Sean's chosen most-load-bearing cel).
11. The handwritten signature SVG draws itself in via `stroke-dasharray` on viewport entry. Disabled under reduced motion.
12. Hand-drawn heading SVGs (five of them, one per B-N — including `b3-saturday-morning-canon.svg`) render with proper `<h2>` + `aria-label` accessibility.
13. Print stylesheet renders a clean single-column, link-URL-suffixed version of the page on letter paper.
14. Lighthouse: Accessibility ≥95, Performance ≥90, Best Practices = 100.
15. Cold-read test: a fresh reader can describe Sean's professional positioning + read at least 3 of the 6 cartoon lessons + name at least one bet from the B-4 "WHAT I'M BUILDING TOWARD" paragraphs within 60 seconds of landing. Re-run on the live build. When `frontmatter.available === true`, the reader should also recall the recruiter italic line ("agent fleet config on second conversation") without prompting; when `available: false`, the reader should NOT mention employment-seeking when summarizing the page.

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

**[OPEN-2: Beat content (§9)]** — 6-8 stacked beats with at least 2 marked `lane: braided`. The component + lane-tint geometry is locked; the prose is not. Sean writes the canonical beats (in MDX frontmatter `beats[]` per Appendix B) in the build session. Recommended: draft 10-12 candidate beats, cut to 6-8 keepers, prioritize beats that braid both threads in a single sentence — those are the load-bearing beats for the parallel-lineage thesis.

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
│   │       ├── Beats.astro                ← B-1 wrapper, reads beats[] from MDX frontmatter
│   │       ├── BeatRow.astro              ← single beat (date line + body + lane rule)
│   │       ├── LaneRule.astro             ← 3px vertical SVG, color by lane prop (animator | pm | braided)
│   │       ├── CartoonCanon.astro         ← B-3 wrapper, grid container
│   │       ├── CartoonCel.astro           ← single cartoon entry (pegs + study + name strip + caption)
│   │       ├── CurrentlyAtStamp.astro     ← B-4, top-right mono stamp, reads frontmatter.current_company
│   │       ├── RecruiterCallout.astro     ← B-4 conditional italic, renders only when frontmatter.available === true
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

# --- Employment state (drives B-4) ---
# These two fields together control everything employment-related on the page.
# Sean flips them together when his job status changes. No prose edits required.
available: true                     # true → recruiter italic call-out renders; false → it hides
current_company: null               # null → "CURRENTLY @ FREE AGENT" stamp; "Foo Inc." → "CURRENTLY @ FOO INC."

# --- Character ---
character_image: /assets/character/about-full-body.png
character_alt: "A pencil-test rendering of Sean Winslow, full-body."

# --- B-1 stacked beats ---
beats:
  - { age: 8,  year: 1998, body: "drew a coyote badly. asked dad to deploy a webpage. it was on Geocities.", lane: braided }
  - { age: 14, year: 2004, body: "filled six sketchbooks. shipped the school-play site. learned what 'broken' meant.", lane: braided }
  - { age: 18, year: 2008, body: "RISD pencil tests; flipbook obsession.", lane: animator }
  - { age: 22, year: 2012, body: "first short film; first festival rejection. first PRD; first stakeholder loop.", lane: braided }
  # …final list: 6-8 beats total, at least 2 with lane: braided. Sean writes the canonical list in the build session.

# --- B-3 cartoon canon (annotation hook only — content lives in src/content/cartoons/) ---
b3_load_bearing_cel: 1               # 1-6; which cel gets the "this one rewires you" annotation arrow
---

# (MDX body below: B-2 thesis prose + B-4 "WHAT I'M BUILDING TOWARD" prose. B-1 reads from frontmatter `beats[]`; B-3 is fully content-collection-driven; B-5 reads from frontmatter URLs; B-4 stamp + recruiter italic read from the two employment-state fields above.)
```

---

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `case-study-spec-v1.md`, and `about-spec-v1.md` end-to-end. The hero, projects, and case-study surfaces are presumed built per their own specs. Build `src/pages/about.astro` + the about components per Appendix A. Author the MDX at `src/content/about/index.mdx` per Appendix B — Sean writes the `beats[]` frontmatter array (6-8 entries, at least 2 with `lane: braided`) + B-2 thesis prose + B-4 "WHAT I'M BUILDING TOWARD" prose in the same session, and sets `available: true` + `current_company: null` until employment state changes. Author or commission five hand-drawn heading SVGs per §4 / Appendix A (note `b3-saturday-morning-canon.svg`, not `b3-dog.svg`). Implement `scripts/validate_about.mjs` as a `prebuild` hook in `package.json` that asserts the `lead:` matches the revised PMP §4 string byte-for-byte. Stand up the Daily Driver agent extension to write `/public/api/about-pulse.json` alongside `dateline.json` and `next-piece.json` (no `dog_walks` item type — the v1 spec deliberately removed it). Populate `src/content/cartoons/` with 6 MDX entries per §11.6 frontmatter shape, and source 6 pencil-test studies per the OPEN-4 path Sean picks (recommended: Path C — hybrid). The handwritten signature + the five heading SVGs + the kid-drawing margin artifact + the 6 cartoon pencil-test studies need authoring before this page can ship. Stop when the 15 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Revised 2026-05-17 (dog → Saturday-morning-canon). Revised 2026-05-18 (B-1 two-column timeline → single-column stacked beats with lane-tint; B-4 availability pill → "What I'm building toward" + frontmatter-gated recruiter note). Awaits Sean's final lock. Open questions flagged in §18.*
