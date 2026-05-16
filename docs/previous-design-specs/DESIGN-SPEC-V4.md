# SW Portfolio — Design Specification

> **Version:** 4.0
> **Date:** May 7, 2026
> **Scope:** Governs the SW Portfolio across two velocities — **Flagship** surfaces (hero, case studies, About) and **Transactions** surfaces (artifact pages, Loom hosts, `EXPLANATION.md` deep-dives). Self-contained — read this file first; it inherits structurally from V3 but supersedes it where they conflict.
> **Evolution from V3:** V3 was a museum. V4 is a museum with an open-floor temporary exhibit wing. Same architecture, two velocities. Comedic Sedaris-tuned prose voice now codified. Agent-collaboration credit now required on every artifact page. Spec is now versioned in 8-week sprints with explicit Tier-A protected vs. Tier-B negotiable cuts.
> **Posture:** This spec serves an active 8-week job-hunt sprint (post-2026-05-04 layoff) targeting AI / Tech / Creative PM. The portfolio's primary job through July 4 is to be the highest-fidelity surface for the Track-C MCP server (May 25), the animation pipeline short (June 11), and the weekly `EXPLANATION.md` cadence. V5 lands post-employment.

---

## 0. Sprint Anchors

The targets this spec is in service of *right now*. Updated every 8 weeks.

| Anchor | Date | Surface |
|---|---|---|
| `sw-mcp-intent-engineering` ship | 2026-05-25 | Track-C; `/transactions/intent-engineering-mcp` deep-dive page |
| Animation pipeline portfolio short | 2026-06-11 | Hero State 2 (with-character) goes live; `/work/animation-pipeline` case study |
| Weekly Friday artifact ship | Every Friday by 5pm through 2026-07-04 | New `/transactions/` page + Substack syndication |
| Job-hunt window close | ~2026-07-04 | Spec re-versions to V5 post-employment |

These anchors shape every Tier-B decision in the rest of the spec. If a section can't be traced back to one of them, it lives in the appendix or doesn't ship in V4.

---

## 1. Design Philosophy

**"An animator's pencil test, mounted in a Vercel-grade frame — with a temporary exhibit wing that opens on Tuesdays."**

The portfolio is a **natural history museum of creative evolution**, with two wings: a permanent collection (Flagship) and a temporary exhibits area (Transactions). The architecture is shared — same texture, color, typography, motion vocabulary — but the velocities differ.

**The duality, refined for V4:** Pencil-test paper meets Vercel deployment logs meets Friday's filed dispatch. A creative who learned to think like a product manager, who ships with an agent fleet, who shows their work weekly.

Light mode tells the origin story (the animator — tactile, warm, pencil on animation paper). Dark mode represents the present (the creative technologist — precise, engineered, luminous). The pencil-test character bridges them. The Transactions wing keeps both velocities honest: the museum cannot become a monument if a new exhibit drops every Friday.

### Design Movements This Draws From

| Movement | What We Take | What We Leave Behind |
|---|---|---|
| **Minimal Luxury** | Extreme whitespace, muted tones, restraint | The coldness, the impersonality |
| **Editorial / Swiss** | Strong typographic hierarchy, grid discipline | Rigid symmetry |
| **Vercel Engineering** | Dark mode precision, monospace accents, card patterns | The corporate anonymity |
| **Animation Studio** | Pencil-test textures, registration marks, frame numbers | Cartoon aesthetics in UI chrome |
| **Newsroom / Wire Service** | Datelines, bylines, dated dispatches, the discipline of "what shipped today" | The cynicism, the gray walls |

The Newsroom row is V4's load-bearing addition. The Transactions wing owes more to *The New York Times* than to a museum label.

---

## 2. Shared Foundations

**Unchanged from V3 §2.** Spacing system (4px base), breakpoints, accessibility (WCAG AA, focus indicators, reduced-motion kill switch), motion principles (max 400ms micro-interactions, GPU-only properties), named easing curves, duration scale, Lucide icons, font loading, no-emoji rule, micro-copy consistency, form validation timing.

These tokens are velocity-agnostic — they apply identically to Flagship and Transactions. Refer to V3 §2 verbatim. No additions.

---

## 3. Color System

**Inherits from V3 §3.** Teal-and-amber palette stays. Tinted neutrals stay. Light/dark mode behaviors stay. 80/20 teal/amber ratio stays.

### One Addition for V4: Transaction Stamp

A deeper, archival amber used only for date stamps, edition marks, and limited-time markers on `/transactions/` pages. Maps a single new role:

| Role | Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|---|
| Transaction Stamp | `--color-stamp` | `#7C2D12` | `#FB923C` | Datelines, edition marks, "ed. 2026-05-13" stamps, archival markers |

The stamp color sits inside the existing teal/amber discipline — it's a deeper amber, not a third color. It signals "you are reading a dated transaction" the way a wire-service dateline signals it in print.

All other V3 color tokens stand. See V3 §3 for primary palette, surface tokens, semantic colors, and color behavior across modes.

---

## 4. Typography

**Inherits from V3 §4.** Font stack (Sora / Inter / JetBrains Mono), type scale, font weight rules, typographic signature, hero entrance animation — all stand.

### One Addition for V4: Dateline Style

A new type role used as the leading element on every Transactions page:

| Token | Spec | Usage |
|---|---|---|
| `--text-dateline` | JetBrains Mono, `--text-caption` (12px), `0.05em` tracking, uppercase, `--color-stamp` color | Top of every Transactions page; index-page entries; Substack syndication header |

Pattern: `BOSTON, MAY 13, 2026 —`

The dateline is the recurring visual cue that signals "you are reading a transaction, not a flagship piece." Same fonts as V3, same scale system, single new role.

---

## 5. Layout & Grid

**Inherits from V3 §5** — content widths, horizontal padding, generous whitespace, asymmetric editorial composition for Flagship. All stand.

### New for V4: Transactions Grid

The Transactions wing uses a different grid than the Flagship editorial composition. The trade is intentional — author velocity matters more than layout virtuosity for surfaces shipping weekly.

| Element | Spec |
|---|---|
| **Width** | 720px reading width on desktop (matches V3 case-study prose width); full mobile width on small screens |
| **Layout** | Single column; above-the-fold value-prop + Loom embed slot; below-the-fold 4Q deep-dive + Methods strip + Limitations footer |
| **Hierarchy** | Dateline → Headline (h1) → Byline → Above-the-fold block (value prop + Loom or hero image) → 4Q section → Methods strip → Limitations footer |
| **Author target** | Page from finished artifact → published in <90 minutes |

The Transactions grid is a near-template — same structure every page, content varies. The Flagship grid stays asymmetric and editorial; the Transactions grid stays disciplined and template-driven.

| Layout context | Grid type |
|---|---|
| Hero | Flagship (V3 §5) |
| Featured project card on `/` | Flagship |
| Project grid on `/` | Flagship |
| Case study (`/work/<slug>`) | Flagship (cinematic scroll, optional — see Section 9) |
| Transactions index (`/transactions/`) | Track-listing (defined in Section 11) |
| Transactions artifact page (`/transactions/<slug>`) | Transactions Grid |
| About page | Flagship |

---

## 6. Texture System: Pencil-Test Paper

**Unchanged from V3 §6.** All four layers stay — paper base color, SVG feTurbulence grain, paper drift animation, registration marks (light mode only). Light/dark mode behaviors stay (paper in light, lightbox in dark).

This is V3's most distinctive contribution. The texture system applies identically to both velocities — it's the unifying material language that makes the Transactions wing feel like part of the same museum, not a separate site.

No additions. No subtractions.

---

## 7. Component Patterns

**Inherits from V3 §7** — Cards, Buttons, Input Fields, Navigation. All stand for Flagship.

### New for V4: Transactions Components

Four additional components for the Transactions wing. None of them break the Flagship pattern; all of them are template-friendly to keep author time low.

#### 7.1 Transaction Card

Variant of the V3 Portfolio Card, used on the `/transactions/` index. Adds two strips:

- **Top strip:** Dateline (per Section 4) + beat tag (per Section 11) in JetBrains Mono `--text-caption`
- **Bottom strip:** "Produced by Claude Opus 4.7 + [other tools]" in JetBrains Mono `--text-caption`, `--text-tertiary` color

```
Background, border, radius, shadow: identical to V3 Portfolio Card
Padding: var(--space-6)
Hover: identical to V3 Portfolio Card
Top strip: dateline + beat tag, --space-2 gap below
Title: --text-h3, Sora SemiBold 600
Excerpt: --text-body, Inter Regular 400, max 3 lines
Bottom strip: produced-by credit, --space-3 gap above, --text-caption
```

#### 7.2 Loom Embed Block

Standardized Loom (or video) embed used on Transactions artifact pages.

```
Container: 16:9 aspect ratio, max-width 100% of grid (720px on desktop)
Border: 1px solid var(--surface-3)
Border radius: 12px
Shadow: 0 1px 3px rgba(0,0,0,0.04) (light mode); none (dark mode, borders define)
Frame number caption: JetBrains Mono --text-caption, "A-2" / "B-3" pattern, --color-stamp,
                      positioned bottom-right, --space-2 below the embed
Loading state: skeleton at the same dimensions; subtle shimmer (V3 §13)
```

The frame-number caption preserves the pencil-test metaphor — the Loom is a frame in a sequence, not a YouTube embed.

#### 7.3 4Q Block

Typographic treatment for the four-question artifact pattern (`What is this?` / `Why this approach?` / `What would break?` / `What did I learn?`). Used on every Transactions artifact page below the fold.

```
Each question: --text-h4 (18px), Sora Medium 500, --text-primary
Each answer: --text-body (16px), Inter Regular 400, --text-primary, max-width 720px
Spacing between Q/A pairs: var(--space-8)
Spacing between question and its answer: var(--space-3)
Section heading above the block: "Explanation" in --text-h2, Sora Medium 500
```

The 4Q block is the same scale and rhythm across every artifact page — the visual rhythm itself is the recognizability.

#### 7.4 Methods Strip

JetBrains Mono mini-table listing the agent stack and tools used to produce the artifact. Renders compactly above the fold on every Transactions page.

```
Layout: single column, 1 line per tool/agent
Type: JetBrains Mono --text-caption (12px), 1.6 line height
Color: --text-secondary
Format: "<role>: <tool>" — e.g.,
        "Reasoning: Claude Opus 4.7 (1M context)"
        "Synthesis: gemma4 (local)"
        "Image gen: ComfyUI + Nano Banana 3"
Border: 1px solid var(--surface-3) on top and bottom; no side borders
Padding: var(--space-3) vertical, 0 horizontal
```

The strip is the agent-collaboration credit made structural. It's unmissable but unobtrusive — recruiters see it; readers who don't care can skim past it.

---

## 8. Portfolio Hero & Creative Signature

**Inherits from V3 §8** — hero layout (asymmetric, name + character), character animation behavior, page entrance choreography.

### New for V4: Three Hero States

V3 framed the V2 headshot as a "fallback" before the pencil-test character is ready. V4 reframes this as **three explicit, ship-able hero states**, each with its own design contract.

#### State 1 — Pre-Character (May 6 – June 10)

**The V2 headshot is the *primary* hero, not a fallback.** Ships immediately. Lives until June 10.

| Element | Spec |
|---|---|
| Layout | Asymmetric per V3 §8 — name/tagline left-aligned (60% width), headshot right-positioned |
| Name | "Sean Winslow" — Sora Bold 700, `clamp(48px, 8vw, 72px)`, tight tracking `-0.02em` |
| Tagline | One authored line — Sora Medium 500, `--text-h3`, `--text-secondary` |
| Headshot | 200px desktop / 180px mobile circle, V3 §8 grayscale-to-color hover spec |
| Background | Pencil-test paper texture (V3 §6 layers) |
| Frame number | "A-1" in JetBrains Mono `--text-caption`, `opacity: 0.2` |
| Vertical height | 90vh |
| Scroll cue | Lucide chevron-down with bounce (V3) |

**No apologetic copy. No "character coming soon" placeholder.** State 1 is a real, ship-able product. Recruiters reading the portfolio May 6–June 10 see a complete hero, not a draft.

#### State 2 — With-Character (June 11 onward)

**Activates when the pencil-test character animation ships, in service of the June 11 animation pipeline portfolio short.** State 1 is gracefully retired — no demo deploy, no draft state, just a clean replacement.

Specifications match V3 §8 verbatim:
- MP4/GIF animated character ~300px wide on desktop, scales to ~200px stacked on mobile
- 4–8s subtle idle loop (breathing, pencil twirl, weight shift)
- Static first frame as poster
- Reduced motion: static first frame
- All other V3 §8 hero specs preserved

#### State 3 — Celebratory (Post-employment, reserved)

**Activates when an offer is signed.** Out of scope for V4. Probably involves a confetti pencil-test loop or some equivalent celebratory variation. Defined in V5.

### Page Entrance Choreography

Unchanged from V3 §8 across all three states. The asset that swaps between states is the hero illustration only; the entrance sequence (paper texture → nav → name → tagline → character → registration marks → scroll cue) stays identical.

---

## 9. Motion & Scroll Choreography

**Inherits from V3 §9** — Lenis smooth scrolling, scroll-triggered fade-up sections, scroll progress indicator, page transitions. All stand.

### Demoted in V4: Cinematic Case Study Recipe (Appendix)

V3 §9 specified GSAP ScrollTrigger choreography for case study pages — pinned heroes, scrubbed timelines, parallax, count-up metrics. **In V4, this moves from "default for every case study" to "Section 9 Appendix — Cinematic Case Study Recipe."** Available, not load-bearing.

Reasoning: only one case study (`campus-201`) plus the animation pipeline page need this level of choreography in the 8-week sprint window. Authoring 5 case studies with this depth before July 4 isn't realistic; demoting the recipe unblocks the spec from a deliverable it can't actually make.

#### Section 9 Appendix — Cinematic Case Study Recipe

For case studies that warrant cinematic scroll (currently: `campus-201`, `animation-pipeline`):

| Scene | Scroll Behavior |
|---|---|
| Hero | Pinned. Title scrubs opacity 1→0 as user scrolls past. Background image parallaxes at 0.3x. |
| Challenge | Fade-up reveal. Key metrics count up from 0 when entering viewport (max 2.0s, `--ease-decelerate`). |
| Process | Timeline visualization builds left-to-right as user scrolls through. |
| Solution | Full-bleed media with caption overlay. Image zoom from `scale(1.1)` to `scale(1)` on scroll. |
| Outcomes | Metrics and quotes stagger in. Final CTA ("Next Project") fades up last. |

For everything else (Transactions pages, About sub-sections, lighter case studies), use V3 §9's default fade-up + the standard scroll progress indicator. Don't reach for the recipe unless the page earns it.

### Page Transitions

Unchanged from V3 §9. Astro View Transitions, 250ms crossfade, `--ease-standard`.

---

## 10. (Removed)

V3 §10 — the About-page Image Swiper — is **removed in V4.** The swiper is a beautiful piece of interaction design and explicitly deferred to V5 (or V4.5 if the need re-emerges). Reason: not on the critical path through July 4; a static three-chapter scroll on About is sufficient and shippable now.

If reinstated in V5, the original V3 §10 spec is the canonical starting point.

---

## 11. Transactions Surface (NEW — load-bearing)

The new flagship section. The Transactions wing carries 80% of the portfolio's job-hunt load and the V3 spec was silent about it.

### 11.1 Route Structure

```
/transactions/                — index page (track-listing IA)
/transactions/<slug>          — individual artifact page (uses Transactions Grid)
/transactions/<beat>/         — beat-filtered index (optional; see 11.3)
```

Astro 5 routes per V4 §16 tech stack.

### 11.2 Index Page (`/transactions/`)

Layout: track-listing IA — the page reads like an album back cover, not a portfolio gallery.

| Column | Content | Type style |
|---|---|---|
| Dateline | "MAY 13, 2026" | `--text-dateline` |
| Title | Artifact name | Sora Medium 500, `--text-h4` |
| Read time | "5 min read" / "90s Loom" | JetBrains Mono `--text-caption` |
| Beat | tag (see 11.3) | JetBrains Mono `--text-caption`, `--color-primary` |
| Produced by | "Claude Opus 4.7 + ComfyUI" | JetBrains Mono `--text-caption`, `--text-tertiary` |

Sort order: reverse-chronological by dateline. Pagination at 20 entries per page.

Above the index: a single paragraph in **Lab notebook mode** (see Section 12) explaining what Transactions is — keep it under 60 words.

### 11.3 Beats

Three beats — mirror the three domains of the personal-context architecture:

| Beat | Token | What it covers |
|---|---|---|
| `agentic-engineering` | `--color-primary` (teal) | MCP servers, skills, hooks, agent fleet artifacts, evals |
| `creative-pipeline` | `--color-accent` (amber) | Animation pipeline, ComfyUI experiments, illustration practice, character work |
| `cushion-economics` | `--color-stamp` (deep amber) | Personal-finance tools, "build don't buy" projects, cost calculators, runway artifacts |

Each beat surfaces in the index entry and on individual artifact pages as a single tag.

### 11.4 Artifact Page Template (uses Transactions Grid from §5)

Required structure. Every Transactions page follows it. The discipline is the brand.

1. **Dateline** (e.g., `BOSTON, MAY 13, 2026 —`) — `--text-dateline`, top of page
2. **Headline** — the *insight* in one phrase. h1 (`--text-h1`), Sora Medium 500.
3. **Byline** — "By Sean Winslow", Inter Regular 400, `--text-secondary`, `--space-2` gap below headline
4. **Beat tag** — single tag, JetBrains Mono `--text-caption`
5. **Above-the-fold value-prop block** — one paragraph stating what this artifact is and why it exists. Inter Regular 400, `--text-body`. Roughly 60–100 words.
6. **Loom Embed Block** (per §7.2) — if a Loom exists for this artifact. Optional but strong.
7. **Methods Strip** (per §7.4) — required. The agent-collaboration credit made structural.
8. **4Q Block** (per §7.3) — required. The deep dive. What is this? / Why this approach? / What would break? / What did I learn?
9. **Limitations footer** — heading "What this doesn't yet do" in `--text-h3`, followed by 2–4 bullets of honest constraints. Required.
10. **Related transactions** (optional) — 2–3 cards linking to other Transactions in the same beat or with thematic adjacency.

### 11.5 Update Cadence

One new artifact per Friday by 5pm through July 4. Index updates same day. Substack syndication (with editorial framing) goes out the following Wednesday. Every artifact has an originating cause (a finished thing got finished) — Transactions don't get authored speculatively.

### 11.6 Sourcing the First Artifacts

Per the [unified roadmap](2026-05-06-unified-roadmap.md), the seed Transactions are the pre-drafted 4Q `EXPLANATION.md` files for Phase D typed reasoning edges and the Phase 6 knowledge loop. Those become the first two `/transactions/` pages. The MCP server (May 25) and animation pipeline diary (June 11+) follow.

---

## 12. Authorial Voice (NEW — load-bearing)

V3 specified typography, color, motion, and error copy — but not authorial *prose voice*. The Sedaris-tuned register existed in the SOUL but was invisible in the spec, so prose authored under the spec's authority drifted toward sober-curatorial by default. V4 codifies three named prose modes the spec explicitly endorses.

### 12.1 The Three Modes

#### Curatorial mode

**Where it lives:** Flagship surfaces — hero copy, About chapter intros, case-study openers, navigation copy.

**The contract:** Restrained, declarative, museum-label energy. Sentences that don't waste breath. Authority earned through clarity, not adornment.

**Tells:**
- Short sentences, deliberate punctuation
- No hedging ("perhaps," "seems to," "kind of")
- No exclamation marks
- Voice walks alongside the work, not in front of it

**Sample tone:**
> "A creative who learned to think like a product manager. The portfolio holds that in tension on purpose."

#### Sedaris mode

**Where it lives:** Substack syndication, op-ed pages, anything labeled `essay`, About-page personal voice. Optional on Transactions pages where the artifact has a story behind it.

**The contract:** Comedic, observational, first-person, warm. Storytelling skews comedic per Sean's SOUL — *life should be fun and so should art*. The voice refuses to take itself too seriously without sacrificing precision.

**Tells:**
- Specific concrete details over generic abstraction
- Rhythm of speech, not rhythm of memo
- Humor that earns its place — never forced, never the point
- First person; willing to be vulnerable when it serves the reader, not when it performs vulnerability

**Sample tone:**
> "The morning after the layoff, I sat down and tried to remember how to use Notion for myself instead of for a company. I had forgotten."

#### Lab notebook mode

**Where it lives:** `EXPLANATION.md` artifacts, Methods strips, Limitations footers, technical commentary.

**The contract:** Present-tense, technical, comedic when it lands naturally, never forced. Names the tools. Honest about what worked and what didn't. Reads like a competent engineer's working journal.

**Tells:**
- Specific tool names, version numbers, exact failure modes
- Plain technical English — no engineer-cosplay jargon, no marketing-cosplay euphemism
- Comfortable with "this didn't work" and "I'm not sure why yet"
- The voice of someone who's actually built the thing

**Sample tone:**
> "The first version chunked input specs at 800 tokens. The second version didn't chunk and let Claude handle it; that worked better and cost less. Don't optimize prematurely."

### 12.2 Mode Selection by Surface

| Surface | Default mode |
|---|---|
| Hero copy, navigation, About chapter intros | Curatorial |
| Case study introductions | Curatorial |
| Case study process / build-section prose | Lab notebook |
| Transactions value-prop block | Lab notebook |
| Transactions 4Q block | Lab notebook |
| Transactions Limitations footer | Lab notebook |
| Substack posts | Sedaris (default) or Lab notebook (for technical posts) |
| About-page personal voice | Sedaris |
| Substack post on a creative-studio topic | Sedaris |
| Error messages, form validation | Curatorial (calm, diagnostic, no humor) |
| Marketing copy / launch announcements | Sedaris |

When in doubt: ask which audience is reading and which mode they expect. Recruiter scanning the hero? Curatorial. Friend reading a Substack post? Sedaris. Engineer reading a methods strip? Lab notebook.

### 12.3 Anti-Rule (Resolves V3 Contradiction)

V3 §12 stated error voice has "no humor." That stays — errors remain calm and diagnostic. **But the universal "no humor" implication is amended.** Sean's SOUL explicitly mandates comedic register; V3 inadvertently outlawed it. V4 resolves the contradiction in favor of the SOUL: errors stay sober; everything else is humor-permitted where it serves clarity.

### 12.4 Cross-Mode Discipline

A page is allowed to use two modes (e.g., a Transactions essay opens in Sedaris mode and switches to Lab notebook mode for the 4Q block) — but the switch is deliberate, not accidental. Tonal drift mid-piece kills credibility.

---

## 13. Loading States

**Unchanged from V3 §13.** Skeleton placeholders, no spinners, subtle shimmer animation, `prefers-reduced-motion` static fallback.

Note for V4: Transactions pages use the same skeleton pattern but match the simpler grid (single column, fewer surfaces).

---

## 14. Anti-Patterns

**Inherits from V3 §14.** All 15 V3 anti-patterns stand verbatim.

### Five Additions for V4

The new velocity needs new discipline. Five additions encode it.

16. **No spec section authored without a ship-target.** If a section doesn't serve a surface shipping by July 4, it doesn't exist in V4. (V5 may resurrect it.)
17. **No Transactions page without a dateline + produced-by credit + Limitations footer.** The structural honesty IS the differentiator. Don't fake-modest your collaborators away.
18. **No "coming soon" placeholders on `/transactions/`.** A page either ships or doesn't exist. Empty index entries are worse than three good entries.
19. **No flagship-grade choreography on Transactions pages.** Save the cinematic scroll recipe for case studies. Transactions are templated.
20. **No spec-as-monument.** The spec is versioned in 8-week sprints. V4.1 will ship; V5 will ship. Don't treat the spec as immutable.

---

## 15. Reference Board

**Inherits from V3 §15.** Existing references stand.

### Three Additions for V4

| Reference | What to Draw From |
|---|---|
| **The New York Times / wire services** | Datelines, bylines, dated dispatches, the discipline of "what shipped today," the Methods strip honesty |
| **Stripe Press** *(promote in importance)* | Editorial layout, typographic scale — the Transactions wing owes more to long-form editorial than to museum-label minimalism |
| **Steve Albini's Big Black liner notes / Albini studio session prose** | Lab notebook voice template — first-person plural ("we tried three things"), specificity, comfortable honesty about what didn't work |

The new references explicitly anchor the Newsroom and Lab Notebook movements added in §1 and §12.

---

## 16. Tech Stack

**Inherits from V3 §16.** Astro 5, React islands, Tailwind CSS v4, GSAP + Lenis, Netlify hosting. All stand.

### Structure (revised for V4)

| Page | Route | Purpose |
|---|---|---|
| Homepage | `/` | Hero (Hero State 1 / 2 / 3) + project gallery |
| Case Study | `/work/<slug>` | Cinematic scroll if the case study warrants it (use Section 9 Appendix recipe) |
| About | `/about` | Three chapters: Origin (animator), Evolution (skills), Present (philosophy). Static three-chapter scroll — no swiper in V4 |
| Contact | `/contact` | Form + social links |
| **Transactions Index** | `/transactions/` | Track-listing IA (Section 11.2) |
| **Transactions Artifact** | `/transactions/<slug>` | Transactions Grid template (Section 11.4) |
| **Transactions by Beat** *(optional)* | `/transactions/<beat>/` | Beat-filtered index (Section 11.3) |

### Theme persistence

Unchanged from V3 §16.

---

## 17. The Recruiter Delta

V3's Section 17 was "The Awwwards Delta." V4 demotes that to a sub-table and promotes "The Recruiter Delta" to primary — because the actual reader through July 4 is a recruiter or hiring manager, not an Awwwards judge. The Awwwards aspiration survives; it's just subordinate to the immediate audience.

### The Recruiter Delta (primary)

Every dimension below should push the portfolio toward what makes a recruiter forward the URL to a hiring manager — or open a conversation with Sean.

| Dimension | Average AI/Tech PM Portfolio | This Portfolio |
|---|---|---|
| **Velocity** | One landing page + 3 case studies, frozen | Flagship + weekly-updating Transactions wing |
| **Honesty about agents** | "AI-assisted" hand-wave | Per-artifact "produced by" credit naming the stack |
| **Methods transparency** | Hidden | Methods strip on every Transactions artifact |
| **Limitations** | Absent | "What this doesn't yet do" on every Transactions artifact |
| **Voice** | Sober-corporate or generic-friendly | Three named modes: Curatorial / Sedaris / Lab notebook |
| **Reproducibility** | Screenshot only | Linked GitHub commits, prompts, configs |
| **Ship cadence** | Static | Dated, weekly, public (Friday by 5pm through July 4) |
| **Hero state honesty** | "Coming soon" placeholders | Three explicit ship-able states; no apologetic copy |

### The Awwwards Delta (sub-table — long-term aesthetic aspiration)

Preserved from V3 §17. Still relevant, just subordinate to the immediate goal. Refer to V3 §17 for the original table.

The awards aspiration kicks back in post-employment when V5 lands.

---

## 18. Living Spec Protocol (NEW — final section)

The meta-section that prevents V4 from becoming the next monument. Names what's protected, what's negotiable, and what the spec is in service of.

### 18.1 Tier-A — Protected (changes require explicit Sean approval)

These are Sacred Cows. They define the portfolio's identity. Changing any of them is a major version (V5) event, not a minor revision.

- **The pencil-test paper texture system** (Section 6) — the architectural material language
- **The teal/amber palette** (Section 3 + V3 §3) — the deliberate color identity
- **The Sora typography stack** (Section 4 + V3 §4) — the typographic signature
- **The duality philosophy** ("pencil-test paper meets Vercel deployment logs" + "with a temporary exhibit wing") (Section 1)
- **The comedic Sedaris mode** as one of three permitted prose modes (Section 12.1) — non-negotiable because the SOUL says so
- **Accessibility non-negotiables** (V3 §2 — WCAG AA, focus indicators, reduced-motion kill switch)
- **The 80/20 teal/amber discipline** (V3 §3)

### 18.2 Tier-B — Negotiable (revisable inside a sprint, V4.x increment)

Anything not in Tier-A is Tier-B. Component patterns, scroll choreography mechanics, specific layout grids, micro-copy patterns, anti-pattern additions, the specific contents of Transactions beats (could become 4 beats, could become 2), the Methods strip format, the Limitations footer pattern.

Tier-B revisions ship as V4.1, V4.2, etc. — same major version, additive.

### 18.3 Sprint Cadence

- **Major version (V5, V6)** — when sprint horizon changes (post-employment, new role, new strategic phase). Authored fresh; previous version archived.
- **Minor version (V4.1, V4.2)** — for in-sprint refinements based on test feedback or new constraints. Tier-A unchanged, Tier-B updated.
- **Spec re-version is scheduled at minimum every 8 weeks.** V4 was authored 2026-05-07. V4.1 review at end of Week 4 of the sprint (~2026-06-04). V5 lands when the job-hunt window closes.

### 18.4 Operating-Model Imports

The spec **imports the operating-model's Tier-A truths by reference.** Design decisions that conflict with operating-model Tier-A are invalid.

Specifically (from `vault/05_atlas/operating-models/job-hunt-2026/operating-model.md`):
- Walk-away salary $100k — no design decision compromises content / pricing / framing for jobs below
- Hard stop at 5:30 PM — no spec work allowed past hard stop
- AI > Tech > Creative PM ordering — design decisions favor AI PM recruiter scan paths first
- Track-C protected even in offer weeks — the MCP server ships May 25 regardless of interview load

### 18.5 Author of Record

Sean. Agent-drafted revisions are normal — and expected — but Sean signs every spec change. The "produced by" discipline that applies to Transactions artifacts applies to the spec itself.

### 18.6 Why This Section Exists

The whole reason V3 felt frozen was that nothing told the reader the spec was allowed to evolve. V4 names that explicitly. The spec is a living document; Tier-A holds; Tier-B moves; revisions are the point.

---

*This specification represents committed design decisions for the SW Portfolio V4 — for the 8-week job-hunt sprint through ~2026-07-04. Tier-A is protected. Tier-B is negotiable. V4.1 will ship; V5 will land post-employment. When in doubt, return to the duality: pencil-test paper meets Vercel deployment logs meets Friday's filed dispatch. The museum architecture stays clean and engineering-precise — the content, the character, the paper texture, and the weekly cadence provide the soul.*

*Authored 2026-05-07 by Sean Winslow with Claude Opus 4.7 (1M context), grounded in the May 6 unified roadmap, the V3 spec, and the V2.0 personal context. Produced under V4's Living Spec Protocol.*
