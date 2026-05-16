# CLAUDE.md — sw-portfolio-3

Sean Winslow's PM portfolio — third build. This file orients every Claude session. Read it first, then `docs/PORTFOLIO-MASTER-PLAN.md`.

## What this is

A portfolio for an **AI PM > Tech PM > Creative PM** job hunt (post-layoff, 8-week sprint through ~2026-07-04). It must prove the positioning: *a creative who learned to think like a product manager, who ships with an agent fleet.*

This is **attempt 3**. Attempts 1 and 2 (`docs/previous-design-specs/DESIGN-SPEC-V3.md`, `V4.md`) were well-specced but kept drifting into "template feeling." This build fixes that — see the master plan §1.3 for the diagnosis.

## The one thing to never forget — the template trap

Every prior attempt drifted toward one of two templates:
1. **The design-system-viewer** (color swatches + type samples + component cards — a designer's tool, not a portfolio)
2. **The luxury-minimal-PM-portfolio** (minimal serif + abstract gradients + "VISION MEETS VELOCITY" — what every PM portfolio looks like)

Before proposing anything, ask: *is this drifting toward either template?* If yes, stop.

**The three load-bearing things** that kill the template feeling — never drop one:
1. **The character** — Sean's hand-drawn pencil-test character (`reference-images/2D-Character-Sketch-Sean-v1.png`). The load-bearing wall.
2. **The voice** — comedic, specific, self-deprecating. Calibrated via `.claude/skills/writing-voice-modes`.
3. **The live layer** — real autonomous agent-fleet activity surfaced on the page. The unfakeable differentiator.

## Working mindset

Sean will invoke `pm-product-discovery:brainstorm` to put Claude in the multi-perspective (PM / Designer / Engineer) headspace this project was planned in. Honor it: generate breadth before converging, pressure-test every idea against *"why is this Sean, not a template?"*

Be a thinking partner, not an executor — challenge while exploring, amplify once committed, cross-pollinate from animation/game-design/PM. Brief and to the point, calm and factual, no trailing summaries. (Full communication baseline: `docs/Sean-Winslow-Full-Personal-Context-v2.0.md` §Communication Baseline.)

## Current status (2026-05-14)

| Surface | Status |
|---|---|
| Design philosophy | Locked — "an animator's pencil test, mounted in a Vercel-grade frame" |
| Voice rules | Locked — incl. the parallel-lineage rule (master plan §3.1) |
| Home hero | Spec'd + validated (`docs/hero-spec-v1.md`) — recall test passed |
| Projects section | Spec'd (`docs/projects-section-spec-v1.md`) |
| Hero tagline + About lead | Locked (master plan §4) |
| Character animation | In progress — `sw-portfolio-animation-2026/` |
| Case-study page, About page, footer/agent feed, MCP embed | Not yet spec'd |
| The build | Not started |

**Immediate blocker:** the character animation work (two 166-frame loops + an AI companion character) must be reconciled with `hero-spec-v1.md` §7 before any hero build. See master plan §8.1.

## Locked decisions (quick reference)

- **Hero tagline:** "Raised by Saturday morning cartoons and Vercel deployment logs."
- **About lead:** "I architect AI-native products, deploy agent fleets, ship to thousands — and on weekends, I draw my dog."
- **Hero treatment:** the "duet" — newsroom dateline strip above the name, tagline below.
- **Fonts:** Newsreader (serif/editorial) + JetBrains Mono (terminal/wire-service). Only two. No Inter, no Sora.
- **Color:** warm paper `#FFF9F0` + ink + teal `#0A3E42`; one splash color per section, never two.
- **5 projects:** 2D Animation Pipeline, Claude Code Superuser Pack, Intent Engineering MCP, The Block — Campus + RevOps, 16BitFit Battle Mode.
- **Click-through:** full route per project (`/work/<slug>`), Astro View Transitions.
- **Stack:** Astro 5 + Tailwind 4. No Next.js, no GSAP, no Framer, no Lenis, no CMS.

## File map

```
sw-portfolio-3/
├── CLAUDE.md                          ← you are here
├── docs/
│   ├── PORTFOLIO-MASTER-PLAN.md       ← the strategic plan — read second
│   ├── hero-spec-v1.md                ← hero build spec (locked, validated)
│   ├── projects-section-spec-v1.md    ← projects build spec (locked)
│   ├── Sean-Winslow-Full-Personal-Context-v2.0.md
│   ├── sw-portfolio-idea-1.md         ← original idea note
│   ├── 2026-05-06-unified-roadmap.md  ← prior roadmap (partially superseded)
│   └── previous-design-specs/         ← V3, V4 — superseded direction, useful foundations
├── mynrd.co.uk-site-analysis/         ← DNA teardown of the #1 inspiration anchor
├── reference-images/                  ← the character, hero sketches, inspo (good + bad)
├── sw-portfolio-animation-2026/       ← character animation working dir (in progress)
└── prototype/                         ← early hero code prototype (superseded by hero-spec-v1)
```

## When you create or lock something

- New section locked → write a `docs/<section>-spec-v1.md`, add a pointer in the master plan §6 or §7.
- Direction changed, decision made, idea killed, open question resolved → update `docs/PORTFOLIO-MASTER-PLAN.md`. It's a living document.
- Keep specs tactical and the master plan strategic — don't duplicate build detail into the plan.

## Skills in play

- `pm-product-discovery:brainstorm` — the planning mindset; Sean invokes it per session
- `.claude/skills/writing-voice-modes` — all portfolio copy is calibrated through this
- `.claude/skills/gemini-pencil-animation-image-gen` — 2D pencil-test character art, anchored to `reference-images/2D-Character-Sketch-Sean-v1.png`
- `.claude/skills/gemini-image-gen` — general image generation

## Related context (outside this repo)

- `/Users/seanwinslow/Code-Brain/claude-code-superuser-pack/` — Sean's Claude Code command center (118 skills, 14 SDK agents). The portfolio's "live layer" (dateline, agent feed) reads from this fleet's outputs. The Daily Driver agent there will be extended to write `/api/dateline.json`.
