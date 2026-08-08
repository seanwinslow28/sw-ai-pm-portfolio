# CLAUDE.md — sw-ai-pm-portfolio

Sean Winslow's PM portfolio — third build, **now built and live on Vercel.** This file orients every Claude session. Read it first, then [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) for the strategic anchor. [`docs/specs/BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) is the historical build sequence — useful for *why* a surface is shaped the way it is, not a to-do list.

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

## Current status (2026-06-16)

**The site is fully built and live on Vercel.** All nine surfaces are shipped and rendering: Hero, Projects, Home About-teaser, About, Case study (`/work/<slug>`), Transactions ledger, Architecture, Essays, and site chrome (nav + footer + `/contact/` + 404). The Astro 5 + Tailwind 4 build runs through `npm run build` (with a `prebuild` validate/fetch/crosslink chain) and the Daily Driver agent auto-refreshes the daily-dated layer each morning. The work now is **iterating on the live site and adding new projects** — not scaffolding.

The pre-build "Phase 0 / Phase 2 / all-specs-LOCKED" status that used to live here is **retired** — it described a site that didn't exist yet. The surface specs in `docs/specs/` are now **as-built references** (read them for *why* a surface is shaped the way it is). Where an active change supersedes a locked spec, the spec body + `CHANGELOG.md` get updated as part of that change.

**Active work — 2026-06-16 hiring-manager critique pass.** A PM-lead friend reviewed the live site as a hiring manager. The execution design is at [`docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md`](docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md), broken into three independent plans in [`docs/superpowers/plans/`](docs/superpowers/plans/):

1. **Project-page surgery + 4Q rewrites** — strip the cryptic header cluster (`role` / `IN FLIGHT` / `frame · status` / tags / anchor-metric) down to title + tagline; remove the Opener and Investigation Board; lead with the 4Q ("What is this?" first, no `A-1.Q1` prefixes, no `─ 4Q ─` heading); rewrite all 20 4Q answers grounded in real repo source. (Copy authored in `code-brain` via the voice chain; components edited here.)
2. **Home affordances + nav** — add a minimal corner nav; enlarge the projects dateline; remove the "updated weekly" annotation; make the teaser-deck swipe affordance obvious and touch-visible.
3. **Explainer graphics** — one simple test-first explainer graphic per project, between the 4Q and Methods bands.

**Adding a project** is the other recurring task: a new `src/content/work/<slug>.mdx` (frontmatter + `four_q:`), a hero asset, and — going forward — an explainer graphic. The `order:` field sets its grid position.

## Locked decisions (quick reference)

- **Hero tagline:** "The agents handle the loops. I handle the taste." (D8 2026-05-30 dropped the redundant "Product Manager." line — role lives in the enlarged `/ AI PRODUCT MANAGER` tag.)
- **About header:** "Raised by Saturday morning cartoons and Vercel deployment logs."
- **Home About teaser editorial line:** "A man, a pencil, an agent fleet. Same person, different tools."
- **Intent Engineering MCP tile + case-study hero:** "An MCP server that checks an agent's spec before it runs." (Subtitle pass 2026-06-16: superseded the prior "Drawing up agents to act with intent." for recruiter scan-ability, follow-on to the W1 critique redesign. The baked OG-card PNG still shows the old line until the og-card generator is re-run.)
- **Hero treatment:** the "duet" — newsroom dateline strip above the name, tagline below.
- **Fonts:** Newsreader (serif/editorial) + JetBrains Mono (terminal/wire-service). Only two. No Inter, no Sora.
- **Color:** warm paper `#FFF9F0` + ink + teal `#0A3E42`; one splash color per section, never two.
- **5 projects:** 2D Animation Pipeline, Code Brain, Intent Engineering MCP, The Block — Campus + RevOps, 16BitFit Battle Mode.
- **Click-through:** full route per project (`/work/<slug>`), Astro View Transitions.
- **Home page shape:** Hero → Projects → About teaser (9-card character deck) → universal Footer. The full sticky SiteNav stays off on home (`noChrome={true}`), but a minimal corner nav (`HomeCornerNav.astro`, wordmark + work/about) sits top-right so recruiters know there's more (critique W2, 2026-06-16).
- **Email constant:** `sean.winslow28@gmail.com` (per SHIP-PLAN-2026-05-29 D4 — supersedes the prior `sean@seanwinslow.com`; lives in `src/lib/site.ts`).
- **Stack:** Astro 5 + Tailwind 4. No Next.js, no Framer, no Lenis, no CMS. GSAP core + DrawSVG/MotionPath/CustomEase licensed per DESIGN.md's Licensed Motion Registry (ban lifted 2026-08-08, sidecar L4/L5) — no ScrollTrigger scroll-jacking, reduced-motion/no-JS floors inviolable.

## File map

```
sw-ai-pm-portfolio/
├── CLAUDE.md                              ← you are here
├── CHANGELOG.md                           ← change log (read before editing any spec or surface)
├── DESIGN.md                              ← design-system encoding (color, type, spacing, motion)
├── PRODUCT.md                             ← product context + positioning
├── AGENTS.md                              ← agent/automation notes
├── astro.config.mjs · package.json · tsconfig.json   ← Astro 5 + Tailwind 4 build config
├── .claude/skills/                        ← local skills (writing-voice-modes, writing-humanity-pass,
│                                            gemini-image-gen, openai-image-gen, gemini-pencil-animation,
│                                            image-generator-prompt-science, + BMAD/GDS/WDS bundles)
├── .env                                   ← API keys (Gemini, OpenAI, OpenRouter) — gitignored
├── src/
│   ├── pages/                             ← routes: index · about · contact · 404 · work/[slug]
│   │   │                                    · transactions/* · architecture/* · essays/* (+ rss.xml)
│   ├── layouts/BaseLayout.astro           ← the one layout (noChrome toggles the sticky nav off, e.g. home)
│   ├── components/                        ← by surface:
│   │   ├── hero/ · home/ · projects/      ←   home page (Hero, ProjectsSection, AboutTeaser, tiles)
│   │   ├── case-study/                    ←   /work/[slug] bands (TitleBlock, HeroMedia, FourQBlock,
│   │   │                                        MethodsStrip, Opener, InvestigationBoard, …)
│   │   ├── teaser/                        ←   swipeable About-teaser deck (TeaserSwiper, SwipeMeIndicator)
│   │   ├── chrome/                        ←   SiteNav, SiteFooter, SkipLink
│   │   ├── about/ · transactions/ · architecture/ · essays/   ←   per-surface components
│   │   ├── artifacts/ · annotations/      ←   case-study artifact + pencil-margin primitives
│   ├── content/                           ← content collections (config.ts defines schemas):
│   │   ├── work/                          ←   the 5 projects (frontmatter + four_q:) — add a project here
│   │   ├── transactions/ · architecture/ · essays/ · cartoons/ · about/ · teaserDeck/
│   ├── lib/                               ← site.ts (constants, email, wordmark) · dateline.ts (isFresh,
│   │                                        BUILD_DATE) · publish-gate.ts
│   ├── scripts/                           ← client JS: teaser-swiper.js · annotation-positioner.js
│   └── styles/                            ← global.css + per-surface css
├── public/
│   ├── api/                               ← daily-dated layer JSON (dateline · about-pulse · next-piece
│   │                                        · shipped-stats-<slug>) — written by code-brain's Daily Driver
│   ├── assets/                            ← project hero media, textures, explainer graphics
│   ├── og-cards/ · og-default.png · favicon.* · apple-touch-icon.png · robots.txt · rss/
├── scripts/                              ← build-time Node: validate_content · fetch_canonical_sources
│                                            · derive_crosslinks · validate_about (+ phase-0/ asset gens)
├── docs/
│   ├── specs/                             ← as-built surface references (read for WHY, not as a to-do):
│   │   │                                    PORTFOLIO-MASTER-PLAN (strategic anchor) · BLUEPRINT-COMPLETE
│   │   │                                    (historical build sequence) · hero · projects-section ·
│   │   │                                    home-about-teaser · case-study · about · transactions ·
│   │   │                                    architecture · essays · site-chrome · texture-and-artifacts
│   │   └──  (specs get updated in place when an active change supersedes them)
│   ├── superpowers/specs/ · superpowers/plans/   ← brainstorm design docs + implementation plans
│   ├── prompts-and-references/            ← personal context, roadmaps, kickoff prompts
│   └── previous-design-specs/             ← V3, V4 — superseded direction, kept for foundations
├── reference-images/                      ← source art; most production assets now live in public/assets/
├── sw-portfolio-animation-2026/           ← character-animation working dir (hero WebM + assets)
└── dist/                                  ← build output (gitignored)
```

## When you create or lock something

- New section locked → write a `docs/specs/<section>-spec-v1.md`, add a pointer in [`PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) §6 or §7 + a row in [`BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) §2 spec map.
- Direction changed, decision made, idea killed, open question resolved → update [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md). It's a living document.
- **Spec edited after initial draft** (revision, restructure, scope change, decision reversal) → log it in [`CHANGELOG.md`](CHANGELOG.md), not in the spec's body. The specs used to carry their own `## 1.1 Changelog` sections; those are now historical baselines and all new entries land in the root CHANGELOG.md. Read its "How to add an entry" header before writing.
- Keep specs tactical and the master plan strategic — don't duplicate build detail into the plan.

## Skills in play

- `pm-product-discovery:brainstorm` / `superpowers:brainstorming` — the planning mindset; Sean invokes per session
- `.claude/skills/writing-voice-modes` — portfolio copy is voiced through this. Default is **Sean Mode** (Sean's own voice, ~90%, with Sedaris/Thompson/Kerouac/Vonnegut techniques borrowed ~10%); dial down for recruiter-facing copy by *substitution*, not subtraction. For the full copy chain (`storytelling-architecture` → voice-modes → `writing-critique` → LLM Council → `writing-humanity-pass`), run the writing work from `code-brain`, which carries the upstream/critique skills this repo doesn't.
- `.claude/skills/writing-humanity-pass` — final scrub: strips AI tells, enforces no em-dashes. Run after voicing any copy.
- `.claude/skills/gemini-pencil-animation-image-gen` — 2D pencil-test character art, anchored to [`reference-images/2D-Character-Sketch-Sean-v1.png`](reference-images/2D-Character-Sketch-Sean-v1.png)
- `.claude/skills/gemini-image-gen` (Nano Banana 2) + `.claude/skills/openai-image-gen` — image generation for stylized cards and the per-project explainer graphics
- `.claude/skills/image-generator-prompt-science` — prompt-engineering reference for image gen
- `.claude/skills/gsap-*` — official GSAP skills (core, timeline, plugins, utils, performance, frameworks, react), installed 2026-08-08 from github.com/greensock/gsap-skills for the licensed-motion work. `gsap-scrolltrigger` deliberately not installed: ScrollTrigger scroll-jacking is banned per DESIGN.md's Licensed Motion Registry.

## Related context (outside this repo)

- `/Users/seanwinslow/Code-Brain/code-brain/` — Sean's Claude Code command center (a large skill library + an autonomous SDK agent fleet). The portfolio's "daily-dated layer" (dateline, pulse strip, ledger row) and the universal footer all read from this fleet's outputs. The Daily Driver agent renders the four build-time JSON files (`public/api/dateline.json`, `next-piece.json`, `about-pulse.json`, `shipped-stats-<slug>.json`) from real measured fleet activity, runs the portfolio's own `npm run validate`, and — only if it passes — commits + pushes to `main` (Vercel auto-deploys) each morning.
  - **Runbook:** [`code-brain/agents-sdk/docs/portfolio-refresh-runbook.md`](../code-brain/agents-sdk/docs/portfolio-refresh-runbook.md) is the source of truth for how this is wired — the data contract, the `isFresh` freshness gate (48h, anchored 08:30 ET), the validation gate, the push-only dedicated-worktree mechanism, the editorial `next_piece` / `shipped_stats` config knobs, and the failure-mode table. Read it before touching anything that produces or consumes `public/api/*.json`.
