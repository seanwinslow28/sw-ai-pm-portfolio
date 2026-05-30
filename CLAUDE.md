# CLAUDE.md — sw-ai-pm-portfolio

Sean Winslow's PM portfolio — third build. This file orients every Claude session. Read it first, then [`docs/specs/BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) for the spec graph + build sequence, then [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) for the strategic anchor.

## What this is

A portfolio for an **AI PM > Tech PM > Creative PM** job hunt (post-layoff, 8-week sprint through ~2026-07-04). It must prove the positioning: *a creative who learned to think like a product manager, who ships with an agent fleet.*

This is **attempt 3**. Attempts 1 and 2 ([`docs/previous-design-specs/DESIGN-SPEC-V3.md`](docs/previous-design-specs/DESIGN-SPEC-V3.md), [`docs/previous-design-specs/DESIGN-SPEC-V4.md`](docs/previous-design-specs/DESIGN-SPEC-V4.md)) were well-specced but kept drifting into "template feeling." This build fixes that — see the master plan §1.3 for the diagnosis.

## The one thing to never forget — the template trap

Every prior attempt drifted toward one of two templates:
1. **The design-system-viewer** (color swatches + type samples + component cards — a designer's tool, not a portfolio)
2. **The luxury-minimal-PM-portfolio** (minimal serif + abstract gradients + "VISION MEETS VELOCITY" — what every PM portfolio looks like)

Before proposing anything, ask: *is this drifting toward either template?* If yes, stop.

**The three load-bearing things** that kill the template feeling — never drop one:
1. **The character** — Sean's hand-drawn pencil-test character ([`reference-images/2D-Character-Sketch-Sean-v1.png`](reference-images/2D-Character-Sketch-Sean-v1.png)). The load-bearing wall.
2. **The voice** — comedic, specific, self-deprecating. Calibrated via `.claude/skills/writing-voice-modes`.
3. **The daily-dated layer** — real autonomous agent-fleet activity surfaced on the page, dated to the morning it was written. Sub-daily for the agent-feed footer; daily-fresh (Daily Driver writes 08:45) for the dateline + pulse strip + shipped-stats. The unfakeable differentiator. The framing reads "real and dated," not "streaming" — the honesty is the load-bearing part.

## Working mindset

Sean will invoke `pm-product-discovery:brainstorm` (or `superpowers:brainstorming`) to put Claude in the multi-perspective (PM / Designer / Engineer) headspace this project was planned in. Honor it: generate breadth before converging, pressure-test every idea against *"why is this Sean, not a template?"*

Be a thinking partner, not an executor — challenge while exploring, amplify once committed, cross-pollinate from animation/game-design/PM. Brief and to the point, calm and factual, no trailing summaries. (Full communication baseline: [`docs/prompts-and-references/Sean-Winslow-Full-Personal-Context-v2.0.md`](docs/prompts-and-references/Sean-Winslow-Full-Personal-Context-v2.0.md) §Communication Baseline.)

## Current status (2026-05-21)

All 9 surface specs are LOCKED. The spec graph is internally consistent and build-ready. Phase 0 asset authoring is COMPLETE — the Astro 5 scaffold can begin immediately.

| Surface | Status |
|---|---|
| Design philosophy | Locked — "an animator's pencil test, mounted in a Vercel-grade frame" |
| Voice rules | Locked — incl. the parallel-lineage rule (PMP §3.1) |
| Hero | **LOCKED** 2026-05-13; `math` → `loops` word swap 2026-05-20 |
| Projects section | **LOCKED** 2026-05-13 |
| Home About teaser (NEW) | **LOCKED** 2026-05-20 — 9-card swipeable character-deck between projects + footer |
| About page | **LOCKED** 2026-05-20 (with v1 decorative deferrals per spec §1.2) |
| Case study | **LOCKED** 2026-05-20 |
| Transactions ledger | **LOCKED** 2026-05-20 |
| Architecture | **LOCKED** 2026-05-20 |
| Essays | **LOCKED** 2026-05-20 |
| Site chrome (nav + footer + `/contact/` + 404) | **LOCKED** 2026-05-20 |
| Texture + artifacts (paper substrate) | **LOCKED** — foundational asset-authoring spec |
| PMP §10 cross-cutting decisions | All 6 remaining items LOCKED 2026-05-20 |
| Hero character animation | 3.917s hero WebM rendered + prototype-validated; 9.2s loop for `/work/animation-pipeline` done |
| Headshot for teaser deck | Captured + bg-matted to warm paper at [`reference-images/headshot-source/sean-headshot-v2.png`](reference-images/headshot-source/sean-headshot-v2.png) |
| Teaser deck (all 10 cards) | **LOCKED 2026-05-20** — sources at [`reference-images/teaser-deck/`](reference-images/teaser-deck/) (PNG; WebP conversion at Phase 2 build). 1 photograph + pencil-test + 8 AI-style variations. Deck thesis tightened around cartoons-that-formed-my-taste. |
| About page full-body character | **LOCKED 2026-05-20** at [`reference-images/about-full-body.png`](reference-images/about-full-body.png) — V1 of Sean's drawn canonical character (matches `2D-Character-Sketch-Sean-v1.png` palette) |
| Hero intro icon cycle (replaces static hero-loop-poster) | **LOCKED 2026-05-20** — 8 pencil-test icons at [`reference-images/hero-icons/`](reference-images/hero-icons/) (loop, terminal, graph, pencil, sticky note, matrix, Claude mascot, coffee). 4.8s cycle plays once-per-session before WebM crossfades in. See hero-spec §7.5. |
| Saturday-morning cartoon cels (about §11) | **LOCKED 2026-05-21** — 6 pencil-test cels at [`reference-images/about-cartoons/`](reference-images/about-cartoons/) (Tommy Pickles · Ash Ketchum · Rocko · Samurai Jack `break_grid:true` · Uncle Iroh · Jake the Dog). MDX frontmatter draft at [`reference-images/about-cartoons/cartoons-content-collection-draft.md`](reference-images/about-cartoons/cartoons-content-collection-draft.md). Authored via Gemini Nano Banana 2 / Approach B (style anchor + per-character reference). |
| OG cards | **LOCKED 2026-05-21** — 4 cards (1200×630, ≤55KB each) at [`reference-images/og-cards/`](reference-images/og-cards/): og-default · vault-scorecard · vault-knowledge-mcp (with SHIPPED 2026-05-12 stamp) · essays/meaning-over-access. Generated via Python + Pillow + Newsreader/JetBrains Mono TTFs; script at [`scripts/phase-0/generate_og_cards.py`](scripts/phase-0/generate_og_cards.py). |
| Favicon set | **LOCKED 2026-05-21** — SW wordmark, JetBrains Mono 700, teal `#0A3E42` on warm paper `#FFF9F0`. SVG source + multi-res ICO (16/32/48) + apple-touch-icon.png (180×180) at [`reference-images/favicon/`](reference-images/favicon/). Raster script at [`scripts/phase-0/generate_favicons.py`](scripts/phase-0/generate_favicons.py). |
| The build | Not started — **all specs locked, all Phase 0 assets authored**; Astro 5 scaffold is the next session. |

**Immediate next:** Phase 2 build session — Astro 5 scaffold + Tailwind 4 + hero + projects + teaser + footer. All Phase 0 assets are authored, all spec OPEN-N items resolved. Asset folders under `reference-images/` move to `/public/` at scaffold time. See [`docs/specs/BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) §6 Phase 2 build sequence.

## Locked decisions (quick reference)

- **Hero tagline:** "The agents handle the loops. I handle the taste." (D8 2026-05-30 dropped the redundant "Product Manager." line — role lives in the enlarged `/ AI PRODUCT MANAGER` tag.)
- **About header:** "Raised by Saturday morning cartoons and Vercel deployment logs."
- **Home About teaser editorial line:** "A man, a pencil, an agent fleet. Same person, different tools."
- **Intent Engineering MCP tile + case-study hero:** "Drawing up agents to act with intent."
- **Hero treatment:** the "duet" — newsroom dateline strip above the name, tagline below.
- **Fonts:** Newsreader (serif/editorial) + JetBrains Mono (terminal/wire-service). Only two. No Inter, no Sora.
- **Color:** warm paper `#FFF9F0` + ink + teal `#0A3E42`; one splash color per section, never two.
- **5 projects:** 2D Animation Pipeline, Code Brain, Intent Engineering MCP, The Block — Campus + RevOps, 16BitFit Battle Mode.
- **Click-through:** full route per project (`/work/<slug>`), Astro View Transitions.
- **Home page shape:** Hero → Projects → About teaser (9-card character deck) → universal Footer. No top nav on home (`noChrome={true}` per site-chrome spec).
- **Email constant:** `sean.winslow28@gmail.com` (per SHIP-PLAN-2026-05-29 D4 — supersedes the prior `sean@seanwinslow.com`; lives in `src/lib/site.ts`).
- **Stack:** Astro 5 + Tailwind 4. No Next.js, no GSAP, no Framer, no Lenis, no CMS.

## File map

```
sw-ai-pm-portfolio/
├── CLAUDE.md                              ← you are here
├── CHANGELOG.md                           ← spec-change log (read before editing any spec)
├── DESIGN.md                              ← design-system encoding (color, type, spacing, motion)
├── PRODUCT.md                             ← product context + positioning
├── .claude/skills/                        ← local skills (gemini-pencil-animation, writing-voice-modes, etc.)
├── .env                                   ← API keys (Gemini, OpenAI, OpenRouter) — gitignored
├── docs/
│   ├── specs/                             ← all locked build specs
│   │   ├── BLUEPRINT-COMPLETE.md          ← entry point synthesizing the spec graph — read second
│   │   ├── PORTFOLIO-MASTER-PLAN.md       ← strategic anchor — read third
│   │   ├── hero-spec-v1.md                ← LOCKED
│   │   ├── projects-section-spec-v1.md    ← LOCKED
│   │   ├── home-about-teaser-spec-v1.md   ← LOCKED 2026-05-20
│   │   ├── case-study-spec-v1.md          ← LOCKED 2026-05-20
│   │   ├── about-spec-v1.md               ← LOCKED 2026-05-20 (with v1 decorative deferrals per §1.2)
│   │   ├── transactions-spec-v1.md        ← LOCKED 2026-05-20
│   │   ├── architecture-spec-v1.md        ← LOCKED 2026-05-20
│   │   ├── essays-spec-v1.md              ← LOCKED 2026-05-20
│   │   ├── site-chrome-spec-v1.md         ← LOCKED 2026-05-20
│   │   └── texture-and-artifacts-spec-v1.md  ← LOCKED (foundational paper-substrate spec)
│   ├── prompts-and-references/            ← personal context, roadmaps, kickoff prompts
│   │   └── Sean-Winslow-Full-Personal-Context-v2.0.md
│   ├── impeccable-and-emil-design-critique.md  ← critique pass that drove 2026-05-19 fixes
│   ├── previous-design-specs/             ← V3, V4 — superseded direction, useful foundations
│   └── superpowers/                       ← superpowers skill artifacts
├── reference-images/
│   ├── 2D-Character-Sketch-Sean-v1.png    ← THE load-bearing character (§template trap #1)
│   ├── headshot-source/                   ← Sean's photo + style refs for the teaser deck
│   └── teaser-deck-trials/                ← in-progress + locked deck cards + prompts
├── mynrd.co.uk-site-analysis/             ← DNA teardown of the #1 inspiration anchor
├── sw-portfolio-animation-2026/           ← character animation working dir (hero WebM + assets)
├── assets/                                ← generic project assets
├── prototype/                             ← early hero code prototype (superseded by hero-spec-v1)
└── .impeccable/                           ← impeccable critique config
```

## When you create or lock something

- New section locked → write a `docs/specs/<section>-spec-v1.md`, add a pointer in [`PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) §6 or §7 + a row in [`BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) §2 spec map.
- Direction changed, decision made, idea killed, open question resolved → update [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md). It's a living document.
- **Spec edited after initial draft** (revision, restructure, scope change, decision reversal) → log it in [`CHANGELOG.md`](CHANGELOG.md), not in the spec's body. The specs used to carry their own `## 1.1 Changelog` sections; those are now historical baselines and all new entries land in the root CHANGELOG.md. Read its "How to add an entry" header before writing.
- Keep specs tactical and the master plan strategic — don't duplicate build detail into the plan.

## Skills in play

- `pm-product-discovery:brainstorm` / `superpowers:brainstorming` — the planning mindset; Sean invokes per session
- `.claude/skills/writing-voice-modes` — all portfolio copy is calibrated through this (5 voice modes: Sedaris / Thompson / Kerouac / Vonnegut / Sean Mode hybrid)
- `.claude/skills/gemini-pencil-animation-image-gen` — 2D pencil-test character art, anchored to [`reference-images/2D-Character-Sketch-Sean-v1.png`](reference-images/2D-Character-Sketch-Sean-v1.png)
- `.claude/skills/gemini-image-gen` — general image generation (Nano Banana 2) for the teaser deck stylized cards
- `.claude/skills/image-generator-prompt-science` — prompt-engineering reference for image gen

## Related context (outside this repo)

- `/Users/seanwinslow/Code-Brain/code-brain/` — Sean's Claude Code command center (118 skills, 14 SDK agents). The portfolio's "daily-dated layer" (dateline, pulse strip, ledger row) and the universal footer all read from this fleet's outputs. The Daily Driver agent writes `/api/dateline.json`, `/api/next-piece.json`, `/api/about-pulse.json`, `/api/shipped-stats-<slug>.json` daily at 08:45.
