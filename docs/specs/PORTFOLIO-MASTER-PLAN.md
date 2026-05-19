# SW Portfolio — Master Plan

> **Created:** 2026-05-14
> **Owner:** Sean Winslow
> **Status:** Living document. The canonical plan for the `sw-ai-pm-portfolio` build.
> **Purpose:** Captures everything decided in the 2026-05-14 product-discovery session — design philosophy, the brainstorm, copy decisions, the hero and projects specs, what remains, and the build sequence. Future Claude sessions read this + `CLAUDE.md` first.
> **How to use this doc:** This is the strategic layer. The per-section build specs (`hero-spec-v1.md`, `projects-section-spec-v1.md`) are the tactical layer. This doc points to them; it doesn't duplicate them.

---

## 0. TL;DR

Sean is building his **third** attempt at a PM portfolio. The first two attempts (DESIGN-SPEC-V3, DESIGN-SPEC-V4) were beautifully specced but kept drifting into "template feeling" — either a design-system-viewer aesthetic or a luxury-minimal-PM-portfolio aesthetic. This session diagnosed *why* that kept happening and locked a direction that fixes it.

**The fix in one line:** Stop building the frame and forgetting the pencil test. The portfolio's personality lives in three things prior attempts kept dropping — the hand-drawn **character**, the comedic-confident **voice**, and a **live** layer (real agent-fleet activity surfaced on the page). Lock those three and the template feeling dies.

**What's locked as of this session:**
- Design philosophy ("an animator's pencil test, mounted in a Vercel-grade frame" — inherited from V3/V4, re-validated)
- The home-page hero (validated via a 24-hour recall test)
- The projects section (5 projects + a live "next in production" card)
- The home-page hero tagline and the About-page lead line
- A voice rule (the "parallel lineage" rule) that governs all future copy

**What's in motion:** The character animation (working directory: `sw-portfolio-animation-2026/`).

**What's next:** Reconcile the animation work with the hero spec, then spec the About page and the case-study page, then build.

---

## 0.5 Relationship to the Roadmap (NEW 2026-05-17)

This redesign **supersedes** the V3-card portfolio currently in flight at `~/Code-Brain/sw-portfolio/`, which the [unified roadmap](../prompts-and-references/2026-05-06-unified-roadmap%20copy.md) is actively deploying to `seanwinslow.com` on Mon 2026-05-19 (Council Gap-Fill 3, un-deferred 2026-05-16).

**Why two efforts existed in parallel:** Sean built the V3 site first; the dissatisfaction with it (the "design-system-viewer template trap" diagnosed in §1.3) is what triggered this redesign. The roadmap kept executing against the V3 site in parallel because the job hunt needed a recruiter-readable surface *now* — couldn't wait for the redesign to finish.

**What this means operationally:**

- **The V3 site shipping Mon 5/19 is a tactical bridge.** It gives recruiters a `/transactions/` ledger they can read while the redesign builds out. Same domain (`seanwinslow.com`) — when the redesign goes live, it replaces V3 at the apex with no DNS churn.
- **This redesign inherits five live ledger entries.** Sean already has `EXPLANATION.md` files committed for: intent-engineering MCP, vault-synthesizer eval suite, substack-drafter (gate-b-drafts), Phase D typed reasoning edges, and Phase 6 knowledge loop. The redesign's `/transactions/` route reads from the same MDX content collection the V3 bridge established. **Nothing gets lost at the crossover.**
- **Roadmap artifacts ship into the redesign automatically.** Every future Task ship (Judge Layer 6/4, Vault Scorecard 6/3, Access-vs-Meaning Manifesto 6/19, Control Architecture 6/10, vault-knowledge-mcp ~6/4, animation pipeline 6/11) writes its `EXPLANATION.md` into the content collection. The redesign just renders what's there.
- **Three new IAs come from the roadmap (specced in §7):** `/transactions/` (the ledger), `/architecture/` (Vault Scorecard, Task 15), `/essays/` (Access-vs-Meaning Manifesto, Task 13). All locked, all expected to launch with the redesign.

**The strategic punchline:** the redesign's job is to put the pencil-test personality + hand-drawn character + comedic-confident voice *around* a body of work that's already 80% built and 20% being framed. The roadmap is filling in the body. This plan is the frame. Both ship into the same domain.

---

## 1. The Story — Why Portfolio 3

### 1.1 Context

Sean was laid off from The Block on 2026-05-04 (cost-cutting, not performance). He's in an 8-week job hunt targeting **AI PM > Tech PM > Creative PM**, Boston metro or remote. The portfolio is a core asset of that hunt — it's the highest-fidelity surface for proving the "creative who learned to think like a product manager, who ships with an agent fleet" positioning.

Full personal context: `docs/Sean-Winslow-Full-Personal-Context-v2.0.md`.

### 1.2 The two prior attempts

| Version | Date | What it was | Why it didn't land |
|---|---|---|---|
| **V3** (`docs/previous-design-specs/DESIGN-SPEC-V3.md`) | Apr 2026 | "Natural history museum of creative evolution." Pencil-test paper texture system, teal+amber palette, museum metaphor, light/dark duality. Extremely thorough spec. | Beautiful on paper but execution drifted toward a *design-system viewer* — the mockups (`reference-images/sw-portfolio-light-1.png`, `sw-portfolio-dark-2.png`, "The Iterative Blueprint") are literally a Figma kit display: color swatches, type samples, component cards. That's a designer's *tool*, not a portfolio. |
| **V4** (`docs/previous-design-specs/DESIGN-SPEC-V4.md`) | May 7, 2026 | V3 + a "Transactions wing" — a newsroom/wire-service metaphor for weekly artifact dispatches. Added datelines, bylines, the 4Q block, Methods strip. | Layered *more* conceptual frameworks on top of an already-heavy spec. The portfolio got more elaborate, not more *Sean*. More frame, still no pencil test. |

### 1.3 The diagnosis — "the template trap"

Across V3, V4, and the standalone mockups, the same failure pattern repeated: Sean kept drifting toward one of two templates —

1. **The design-system-viewer** (his own "Iterative Blueprint" mockups) — shows the *kit*, not the *work*. Four colors on every screen, three fonts, no opinion.
2. **The luxury-minimal-PM-portfolio** (the `Portfolio-Design-Inspo-1` through `-5` images — the "Alex Vonn / PM" set) — gorgeous, but it's the aesthetic *every* PM portfolio uses: minimal serif, abstract gradient art, "VISION MEETS VELOCITY" headlines, "SAY HELLO." footers.

What actually moves Sean — confirmed by his reaction to the references — is **mynrd.co.uk** (`Portfolio-Design-Inspo-6`, `-7`, and the full DNA teardown at `mynrd.co.uk-site-analysis/01-site-dna.md`): a hand-drawn character anchor, comedic-confident first-person voice, torn-paper section transitions, and *one* splash of deep teal in an otherwise paper-and-ink palette.

**The three things prior attempts kept dropping:**
1. **The character.** Sean has a killer pencil-test character sketch (`reference-images/2D-Character-Sketch-Sean-v1.png`). Every iteration that lost the character drifted into template-land. The character is the load-bearing wall.
2. **The voice.** mynrd has "Simply making cool sh*t Wilson would say wow too." Sean's own voice (comedic, self-deprecating, specific — see `.claude/skills/writing-voice-modes`) was never *in* the prior specs' copy.
3. **The live layer.** mynrd is a 2024 static site. Sean is a 2026 AI PM with a real autonomous agent fleet. He can surface *live* agent activity on the page — something no template can fake. This is the single biggest differentiator and it was absent from V3/V4.

### 1.4 What carries forward from V3/V4

Not everything was wrong. These survive intact:
- The core design philosophy line: **"an animator's pencil test, mounted in a Vercel-grade frame."**
- The light/dark duality as autobiography (light = the animator/origin story; dark = the creative technologist/present).
- The pencil-test paper texture system.
- The teal + amber color discipline.
- The V4 newsroom/wire-service voice — but **applied to the home page itself** (the dateline strip), not quarantined in a separate "Transactions wing."
- The 4Q block and Methods strip patterns (they move into the case-study page spec).

What's explicitly **dropped or deferred**: the standalone two-velocity "Transactions wing" as a V1 concept (deferred to post-employment per V4's own sprint anchors); the design-system-viewer mockup direction (killed entirely).

---

## 2. Design Philosophy (Locked)

**"An animator's pencil test, mounted in a Vercel-grade frame."**

The portfolio is a natural history museum of creative evolution — engineering-precise containers showcasing expressive, hand-made content. Vercel's crisp dark-mode engineering aesthetic for the chrome; traditional animation's texture language (pencil tests, registration marks, aged paper, frame numbers) for the content.

**Narrative duality:** Light mode tells the origin story (the animator — tactile, warm, pencil on animation paper). Dark mode represents the present (the creative technologist — precise, engineered, luminous). This is autobiography through interface design, not decoration.

**Core narrative:** "A creative who learned to think like a product manager — who now ships with an agent fleet."

**The first 5 seconds** should feel *handmade* — pencil-test texture, the illustrated character, warm paper. Then the museum's engineering precision reveals itself as you scroll. PM substance lives in the case studies.

### 2.1 Inspiration anchors

| Anchor | What we take | Reference |
|---|---|---|
| **mynrd.co.uk** | Hand-drawn character anchor, torn-paper transitions, comedic-confident voice, one-splash-color discipline, custom cursor with hover previews, the 8.5× display-to-meta type ratio, no-nav linear scroll | `mynrd.co.uk-site-analysis/` (5 docs — full DNA teardown) |
| **Vercel** | Dark-mode precision, monospace accents, card patterns, restraint | — |
| **Traditional animation** | Pencil-test paper, registration marks, frame numbers, the character | `reference-images/2D-Character-Sketch-Sean-v1.png` |
| **Newsroom / wire service** | Datelines, the discipline of "what shipped today," dated dispatches | V4 spec §1 |

### 2.2 The aesthetic rule Sean stated

> "I'm a fan of simplicity with splashes of color."

Codified as a two-layer architecture (locked in `docs/specs/texture-and-artifacts-spec-v1.md` §2):

- **The substrate is Committed-teal.** A persistent teal `#0A3E42` chrome at Z=0 carries the site as a structural color — visible through every torn-paper edge on every page. Per Impeccable's color-strategy axis, this is a *Committed* palette (one saturated color carrying 30–60% of the visible page surface), not the Restrained palette earlier drafts described.
- **The page surface is paper.** Each page sits on the chrome as a cream `#FFF9F0` paper sheet at Z=10, with torn-paper edges revealing the teal at the seams.
- **Each section still earns *one* full-bleed splash-color block, never two** — this rule survives intact. The chrome and the splash blocks are at different z-layers (Z=0 vs Z=20) and serve different jobs: the chrome is the *book cover*, the splash blocks are *full-page color illustrations inside the book*. Sections without a splash (hero, About) sit on paper-on-chrome and read as 95% paper.

The "Iterative Blueprint" mockup violated both rules — four colors at once on every screen, no substrate logic. Committed-teal fits the autobiography thesis (the chrome IS the book cover); Restrained-paper-with-one-accent would have been too quiet for an animator-as-PM positioning.

---

## 3. The Voice (Locked Rules)

The portfolio's copy is calibrated to Sean's personal voice via `.claude/skills/writing-voice-modes` — primarily **Domestic Observer (Sedaris-tuned)** and **Minimalist Absurdist (Vonnegut-tuned)** for short-form surfaces like the hero.

### 3.1 The parallel-lineage rule (discovered this session — load-bearing)

**Never frame the animator-self as the "before" and the PM-self as the "after."**

When evaluating tagline options, "Ten years of cartoons, six months of PRDs" was killed because the 10-vs-6 framing reads as *"I just decided to take life seriously six months ago"* — it makes the PM half look thin and the creative half look childish/unprofessional.

The winning line — *"Raised by Saturday morning cartoons and Vercel deployment logs"* — passes the rule because **both halves happen in childhood**. "Raised by" implies both have been there all along. They're parallel, equal lineage — no timeline, no hierarchy, no "old hobby vs. new career."

Any future line (hero, About, case study, meta description) gets checked against this rule. A line that puts the two selves on a timeline fails.

### 3.2 Other voice notes

- **Specificity is the trust mechanism.** "Saturday morning cartoons" not "cartoons." "Vercel deployment logs" not "tech." The specific nouns are what make the comedic juxtaposition land and feel relatable.
- **Comedic juxtaposition without a joke.** The gap between two specific, true things — not a punchline. Sedaris, not standup.
- **Wire-service voice for technical/live surfaces.** The dateline strip, project tags, frame numbers, Methods strips — all JetBrains Mono, all wire-service register.
- **Editorial voice for the human surfaces.** The hero tagline, About prose, case-study narrative — all Newsreader serif, all first-person-warm.

### 3.3 Voice register by surface (NEW 2026-05-17)

Adding a third row for the `/essays/` IA introduced by roadmap Task 13. Manifesto voice is **not** the same as hero/About voice — the manifesto genre doesn't suit pure Sedaris-mode comedy. The register changes by surface:

| Surface | Register | Why |
|---|---|---|
| **Hero, About, case-study narrative** | Sedaris-tuned (first-person-warm, comedic-juxtaposition, specific nouns) | The personality surfaces. Comedic-confident voice is the load-bearing "this is not a template" signal. |
| **`/essays/` (manifesto, thesis) — middle sections** | Sober/declarative, thesis-forward | Per Task 13: a manifesto is the recruiter-call cold-open ("theses get callbacks; tools get bookmarked"). Pure comedy undermines the analytical claim. |
| **`/essays/` — opening hook + closing kicker** | Personal voice (Sedaris-coded OK) | Manifestos need a human anchor on the bookends. The middle stays sober. |
| **Wire-service surfaces** (dateline, project tags, frame numbers, Methods strip) | JetBrains Mono, wire-service register | Editorial restraint. Real data, dated, no flourishes. |

**The rule for any future copy:** if the surface is editorial-narrative, Sedaris; if it's thesis-analytical, sober-with-bookends; if it's machine-data, wire-service.

### 3.4 Inherited STOP-DOING constraint (NEW 2026-05-17)

From [unified roadmap](../prompts-and-references/2026-05-06-unified-roadmap%20copy.md) Task 7 / Council Deprioritization 1 (Gemini Pro, chairman-endorsed):

> **Never frame the HybridRouter as "Agent OS" or "runtime architecture" anywhere on the portfolio.**

The HybridRouter is 100 lines of model-routing logic. Framing it as architecture invites senior engineers in technical screens to grill on concurrency / distributed caching / thread locking — fights Sean's beginner-to-intermediate coding level can't win. The one paragraph it earns lives inside the Control Architecture writeup (Task 14) under the "Authority" section — *"authority over which brain runs which task"* — and nowhere else. No standalone case-study tile, no dedicated essay, no hero callout. Sean's edge is **semantic product architecture** (specs, governance, routing, memory, authority, review) — stay there.

---

## 4. Locked Copy Decisions

| Surface | Copy | Status | Rationale |
|---|---|---|---|
| **Home hero tagline** | *"Product Manager. The agents handle the math. I handle the taste."* | LOCKED 2026-05-18 (revised) | Vonnegut three-sentence flat. States the PM role explicitly (no "figure it out down the line"). "Taste" is the industry-correct word for the irreducible-human-contribution in the AI era (Karpathy / Linear / Vercel / Anthropic register). The math/taste contrast names the human-agent relationship as it actually is — agents handle the load, the human keeps the judgment. Passes the parallel-lineage rule trivially (both halves present-tense, one identity with two qualities). Replaces the prior locked line, which moved to the About page header (see row #2). |
| **About page header (lead)** | *"Raised by Saturday morning cartoons and Vercel deployment logs."* | LOCKED 2026-05-18 | Sean drafted the actual About body and discovered the line worked better here than on the hero. "Raised by..." establishes lineage explicitly on the page where lineage belongs — biography. Pairs with the new home hero, which is now free to declare the role without doing biographical work. The two pages tell one story across two surfaces — declarative on home, biographical on About — without rhyming verbatim. Earns the home hero's "taste" claim by showing where the taste came from. |
| **Intent Engineering MCP — project tile + case-study page hero** | *"Drawing up agents to act with intent."* | LOCKED 2026-05-18 | Project-tile voice (drops the "Product Manager who" subject because the tile is *about* a project, not *about* a person). Same string on the tile and the case-study page hero — also functions as the shared `view-transition-name` target, no rewrite mid-transition. The verb "drawing up" threads the animator's hand (drawing) with the PM's spec-writing hand (drafting up plans) in two words — earned because the MCP project's whole thesis is intentional agent structure. |
| **Hero dateline (default pattern)** | e.g. *"BOSTON, MAY 13, 2026 — vault indexer wrote 47 chunks at 02:34. fleet green."* | LOCKED — pattern, not exact string | Wire-service "fleet pulse" pattern. Real data, rotates daily. See `hero-spec-v1.md` §8 for the 4 rotation patterns. |
| **Killed line** | *"Ten years of cartoons, six months of PRDs..."* | KILLED | Violates the parallel-lineage rule. |
| **Killed line** | *"Animator who became a product manager. Then taught the agents to draw."* | NOT USED | Strong line, but "became" implies the timeline. Held as a possible case-study or social pull-quote, never the hero. |
| **Killed line** | *"I architect AI-native products, deploy agent fleets, ship to thousands — and on weekends, I draw my dog."* | KILLED 2026-05-17 | Originally locked as the About-page lead. Sean's review of the v1 About spec (2026-05-17) surfaced that the dog framing was forcing a personality artifact (the Polaroid gallery) that didn't earn itself — Sean picked the line because it made him laugh, not because it described his actual life. The hard-cut deflation was structurally sound but the punchline noun wasn't load-bearing. |
| **Superseded line** | *"Trained by Looney Tunes and Vercel deployment logs. Ships AI-native products. Deploys agent fleets."* | SUPERSEDED 2026-05-18 | An interim About lead (locked 2026-05-17) built as a 3-sentence credentials block, designed to rhyme "Trained by..." with the then-locked home hero "Raised by...". Once Sean drafted the About body and the home hero was repositioned to lead with the PM role explicitly, the cross-page-rhyme architecture dissolved — and Sean preferred the single original line as the About header. Replaced by row #2 above. |
| **Meta description / OG card / Substack tagline** | *"AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs."* | LOCKED 2026-05-18 | The "Raised by..." pairing is the more concrete, more memorable copy for social-share previews and search results (more searchable nouns than "math + taste"). The "AI Product Manager." prefix is SEO scaffolding — pattern-match for hiring-manager queries. The About-header line gets reused here as meta WITHOUT becoming a verbatim duplicate (the role prefix differentiates it). The new home hero ("Product Manager. The agents handle the math. I handle the taste.") stays as the on-page tagline only — it's the headline copy, not the social-preview copy. Lives in `site-chrome-spec-v1.md` §11 `SITE_DESCRIPTION` constant; imported by `<SiteFooter.astro>`, `src/pages/contact.astro`, and the BaseLayout `<head>` meta tags. |

### 4.1 The hero treatment decision

Two hero variants were mocked up and compared (the "duet" vs. the "soloist"):
- **E — the duet:** newsroom dateline strip *above* the name + the hero tagline below.
- **F — the soloist:** the tagline carries the hero alone, mynrd-style.

**Decision: E (the duet) is locked.** Three reasons: (1) it earns the headline through *evidence* (real agent activity) instead of self-claim — which is exactly the credibility the killed "ten years" line was trying and failing to provide; (2) it's automatable — the dateline reads from a real file the Daily Driver agent writes each morning, making the page *live*; (3) it anchors the wire-service voice as connective tissue across the whole site.

---

## 5. The Brainstorm — All Ideas + Top 5

Run via `pm-product-discovery:brainstorm` (mode: ideas, new product). Three perspectives. Every idea was pressure-tested against one question: *why does this feel like Sean, not a template?*

### 5.1 PM Perspective

| # | Idea | Why it isn't a template | Impact/Effort |
|---|---|---|---|
| P1 | **"The Wrong Resume" hero** — no headline+photo; a 4s loop of the character walking onto blank paper, drawing a frame around himself, a terminal materializing around the frame | Zero PM portfolios do this; the animation IS the value prop | H/M |
| P2 | **"Now Shipping" newsroom strip** — persistent dateline of live SDK-fleet activity | Backend exposed as a portfolio surface; unfakeable | H/M |
| P3 | **Three-folder navigation** — `the-block/` 🔒, `creative-studio/`, `life-systems/` instead of Work/About/Contact | Visitor navigates identity, not job titles; mirrors his real CLAUDE.md mental model | M/L |
| P4 | **Case studies as evidence boards** — scrollable thread of real artifacts (Jira screenshots, PRD diffs, anonymized Slack DMs, retro docs, metric charts) | Most PMs polish the mess away; this leans into "here's how I actually shipped it" | H/M |
| P5 | **The 5-second test, weaponized** — hard rule that a visitor knows (a) AI PM, (b) 3 ships, (c) why to keep reading, within 5 seconds | Most portfolios bury the goods; this is a constraint not a vibe | H/L |

### 5.2 Designer Perspective

| # | Idea | Why it isn't a template | Impact/Effort |
|---|---|---|---|
| D1 | **The character IS the cursor** — default a tiny lagged pencil; hover a project tile and it becomes a frame-number tag (A-2, B-3) | Only Sean has this character; unforgeable signature | H/M |
| D2 | **One splash color per section, never two** — 95% paper+ink at the section level; work section = full teal splash; contact = amber; about = paper-no-splash; torn-paper edges between. Layered over a **Committed-teal chrome substrate** (Z=0, full-bleed, visible through every torn edge — see §2.2) so the site reads as paper-on-teal at rest, with full-bleed splash blocks per section. | Codifies "simplicity with splashes of color" as a two-layer architecture (chrome + page), not a flat palette | H/L |
| D3 | **Pencil-test margin annotations** — hand-drawn SVGs in the gutters (arrows, "rev 3 / fix this," coffee-ring stain, registration marks) | The physical artifact of his process invading the digital frame | M/L |
| D4 | **Two fonts, intentionally clashing** — Newsreader (serif/editorial) + JetBrains Mono (terminal/wire-service). No Inter, no Sora | Prior mockups used 3 fonts with no opinion; the serif-vs-mono contrast IS the duality | H/L |
| D5 | **Dark mode is the time of day, not a toggle** — 6am–6pm light (animator), 6pm–6am dark (technologist) | Every portfolio has a toggle; time-aware is poetic and earns the duality thesis | M/L |

### 5.3 Engineer Perspective

| # | Idea | Why it isn't a template | Impact/Effort |
|---|---|---|---|
| E1 | **Live agent feed footer** — tiny Cloudflare Worker reads `agent-run-history.csv`; footer shows last 3 fleet events | Engineering + product + the Track-C differentiator in one component; most AI PMs talk about agents, this one runs them | H/M |
| E2 | **MCP server as interactive surface** — `sw-mcp-intent-engineering` embeds a read-only "ask my vault a question" tool with real MCP calls | IS the differentiator; the portfolio launch IS the MCP launch | H/H |
| E3 | **Astro + View Transitions over Next.js** — content-first, <50kb JS to first paint | 90% of PM portfolios are over-engineered Next.js sites; the engineering brag is restraint | M/M |
| E4 | **MDX case studies with inline React** — metric charts, sortable A/B tables, Figma embeds dropped mid-paragraph | Reads like real PM work (narrative + data), not a Notion export | M/M |
| E5 | **Vault is the CMS** — site reads from `vault/20_projects/portfolio-mirror/*.md`; edit in Obsidian, CI rebuilds | Portfolio becomes a real output of the second-brain system, not a separate project that goes stale | H/L |

### 5.4 Top 5 (the build priority)

| Rank | Bundle | Status | Notes |
|---|---|---|---|
| **1** | **D1 + P1** — character cursor + signature hero animation | Spec'd (`hero-spec-v1.md`); animation in production | Hardest-to-fake personality; biggest first-5-seconds payoff |
| **2** | **D2 + D3** — one-splash-per-section + pencil margin annotations | Partially spec'd (projects section locks both); needs site-wide codification | Sean's stated aesthetic preference, turned into a system |
| **3** | **E5 + E4** — vault-as-CMS + MDX case studies | Partially spec'd (projects section locks the MDX content-collection contract); E5 is a future spec | Architectural backbone; compounds forever |
| **4** | **P2 + E1** — newsroom dateline strip + live agent feed | Half spec'd (the dateline lives in `hero-spec-v1.md`); the footer feed is a future spec | The unfakeable differentiator |
| **5** | **E2** — MCP server embed | Future spec | Highest-risk/highest-reward; lines up with the May 25 `sw-mcp-intent-engineering` launch anchor |

**Adopt regardless of ranking:** D4 (Newsreader + JetBrains Mono, no third font) is a constraint, not an idea — already baked into both specs.

**Deliberately not in the Top 5:** D5 (time-of-day dark mode) and P3 (three-folder nav) — great, but cosmetic next to the above. Both deferred to post-V1.

---

## 6. The Specs — What's Locked

### 6.1 Hero v1 — `docs/hero-spec-v1.md`

**Status:** Locked. Validated via 24-hour recall test (passed — viewers recall "AI PM who animates" without studying).

The non-obvious calls:
- **The character walks in.** Not fades, not slides — a 6-frame walk cycle from off-screen-right. The first 2 seconds of the entire portfolio. The single highest-leverage motion moment.
- **Two fonts only.** Newsreader + JetBrains Mono. Inter and Sora killed.
- **The hero gets zero splash color.** The dateline's transaction-stamp amber is the only chromatic moment. The first full splash is the projects section — a reward for scrolling.
- **The dateline reads from a real file.** `/api/dateline.json`, written by the Daily Driver agent at 08:45 daily. Four rotation patterns (fleet pulse / ship log / reading log / now line).
- **No GSAP, no Framer, no Lenis.** Native CSS + IntersectionObserver + one RAF loop for the cursor.
- Full 15-section spec + a copy-paste build hand-off prompt (Appendix B).

### 6.2 Projects Section v1 — `docs/projects-section-spec-v1.md`

**Status:** Locked.

The non-obvious calls:
- **Six grid cells:** 5 project tiles + 1 "next in production" card (dashed border, pulls the next deadline from a data source — the live-portfolio signal).
- **The 5 projects (locked):** 2D Animation Pipeline (`ACTIVE`), Claude Code Superuser Pack (`ACTIVE`), Intent Engineering MCP (`SHIPPED` — amended 2026-05-17, was `COMING`; npm + MCP registry live since 5/12), The Block — Campus + RevOps (`ARCHIVED`), 16BitFit Battle Mode (`PAUSED`).
- **Tile count stays at 5; `/transactions/` is the overflow surface.** The roadmap has grown the artifact roster to 9+ flagship + 3 supporting (Judge Layer, Vault Scorecard, Manifesto, Control Architecture, vault-knowledge-mcp, Phase D EXPLANATION, Phase 6 EXPLANATION, eval suite, substack-drafter, Agent Fleet Dashboard, etc.). Only the 5 that warrant a narrative deep-dive get tiles here. The full ledger lives at `/transactions/` (specced in §7). Same MDX content collection feeds both surfaces.
- **Status labels are weaponized:** exactly 5 strings (`ACTIVE` / `COMING` / `PAUSED` / `ARCHIVED` / `SHIPPED`), each with a locked color. The status is the second-strongest scan signal after the media.
- **Tiles get titles** (against mynrd's media-only discipline) — because PM hiring managers scan project names. A thin metadata strip at the tile bottom: frame number + status + title + tags.
- **Click-through:** full route per project (`/work/<slug>`), via Astro View Transitions — the tile media morphs into the case-study hero.
- **Pencil annotations make their first site appearance here** (curved arrow, "rev 3" scribble, registration mark).
- **The teal stays flat** — no gradient, no noise. The discipline IS the splash.
- **MDX content collection is the single source of truth** — frontmatter feeds both the tile and the case-study page.
- Full 14-section spec + MDX frontmatter shape (Appendix B) + a build hand-off prompt (Appendix C).

---

## 7. What's Still to Spec

| Spec | Covers | Priority | Notes |
|---|---|---|---|
| **Case-study page** (`/work/<slug>` body) | The investigation-board artifact thread (P4), Methods strip, 4Q block (mirrors the canonical [`EXPLANATION-template.md`](../../../vault/40_knowledge/templates/EXPLANATION-template.md) — same What/Why/Break/Learn shape, not a parallel structure), next/prev nav | **Next after animation reconcile** | High editorial complexity. Once spec'd, all 5 MDX bodies can be drafted in one sitting. Shape is sketched in `projects-section-spec-v1.md` §11. |
| **About page** | The character in its fullest form, the locked About lead line, the origin story, the parallel-lineage life narrative | High | Where D3 (pencil annotations) and the warm/origin-story half of the duality live most fully. |
| **`/transactions/` ledger** (NEW 2026-05-17) | The reverse-chronological table of every shipped artifact. Columns: date / artifact / surface (pill) / 4Q link / repo. Sorted desc by `shipped`. RSS feed at `/transactions/rss.xml`. **Inherits the V3-bridge schema** (`surface`, `shipped`, `repoUrl`, `explanationUrl`) so the 5 existing ledger rows carry forward at the crossover. Every future Task ship writes its `EXPLANATION.md` and gets a row automatically. | **High** — this is the comprehensive artifact surface. The 5 case-study tiles are curated; the ledger is exhaustive. | Roadmap Gap-Fill 3 (Task 1 Step 3). The V3 bridge at `~/Code-Brain/sw-portfolio/` is the reference implementation — same schema, redesigned chrome. |
| **`/architecture/` route** (NEW 2026-05-17) | First occupant: Vault Scorecard (Task 15, ships 6/3) — 5-test scoreboard table + ER diagram of `concept_edges` + `examples/public_vault_fixture/` link. Permanent IA for future architecture writeups (`vault-knowledge-mcp` follows here too). | **High** — Task 15 is the foundation doc for the Anthropic FDE Boston / Glean Agent Governance "agent-operable knowledge" interview answer. | Roadmap Task 15. Build-time `scripts/build_fetch_scorecard.mjs` curls `vault/SCORECARD.md` raw from the superuser-pack repo and renders it with V3 design tokens carried over into the new system. |
| **`/essays/` route** (NEW 2026-05-17) | First occupant: Access-vs-Meaning Manifesto (Task 13, draft-lock 5/22, publish ~6/19). Long-form essay + Mermaid `quadrantChart` (access ↔ meaning × infrastructure ↔ workflow) + role-map table. **The URL in the email signature** — Sean's recruiter-call cold-open. Permanent IA for future thesis-shaped writing. | **High** — per Council Gap-Fill 2: "theses get callbacks; tools get bookmarked." | Roadmap Task 13. Voice register per §3.3 (sober middle + personal-voice bookends, NOT pure Sedaris). |
| **Footer + dashboard link** (REVISED 2026-05-17) | Footer link out to `fleet.seanwinslow.com` — Task 11's Agent Fleet Observability Dashboard (v1 code-complete 2026-05-17 evening at `~/Code-Brain/agent-fleet-observability/`). Wire-service "view the fleet →" link + the latest dateline snapshot. No custom Cloudflare Worker. | **Low** — scope removed; the dashboard exists. | Was originally specced as a Cloudflare Worker reading `agent-run-history.csv` inline. Task 11 already shipped the richer surface; the portfolio just links to it. One click, not an embed. |
| **Contact section** | The amber splash block, the "get in touch" rotating badge in its full-page form | Medium | Small surface; can fold into the About or footer spec. |
| **MCP embed page** (E2) | `/work/intent-engineering-mcp` with a live read-only MCP tool call | Medium | Status amended 2026-05-17: the MCP shipped 5/12 (13 days early). The embed is now retrospective ("here's the live server you can install") rather than launch-coupled. |
| **Site-wide foundations** | Section-scoped splash-color custom properties, the torn-paper edge component, global cursor, dark-mode tokens | Before the build session | Mostly inherited from V3/V4 §2–§6; needs a consolidation pass. |

---

## 8. The Character Animation

**Working directory:** `sw-portfolio-animation-2026/`

**Contents (as of 2026-05-16):**
- `anchor-images/` — `anchor-1.png`, `anchor-2.png`, `ai-companion-turnaround-anchor.png` (the Claude-mascot-inspired AI companion turnaround sheet), and `sean-character-turnaround-A-3.png`
- `loop-1/` and `loop-2/` — raw + cleaned source frame sets (146 + 127 = 273 raw frames)
- `Portfolio-BG-removal/BG-Removed/` — final 220-frame sequence + assembled `character.webm` (1.8MB, 9.2s @ 24fps, WebM VP9 with alpha)
- `prompts/` — locked cleanup pipeline prompts (RESUME-PROMPT.md, RESUME-PROMPT-LOOP-2.md)
- `scripts/` — locked v2a cleanup pipeline (cleanup-prompt-v2a.txt + clean-frame-v2a.sh)

**Skills available for this work:** `.claude/skills/gemini-pencil-animation-image-gen`, `.claude/skills/gemini-image-gen`, and Seedream 2.0 (used to produce the original loop).

### 8.1 RESOLVED 2026-05-16 — animation reconcile

**The original §7 of `hero-spec-v1.md`** (three small frame sets: 6-frame walk-in, 8-frame idle, 2-frame blink, single character) is **superseded**.

**Decision:** revise the hero to use a single seamless WebM loop of Sean + the AI companion at his shoulder. The companion is a pencil-test rendering of the Claude mascot (the chunky terra-cotta-orange mascot in `anchor-images/ai-companion-turnaround-anchor.png`). The hero spec has been edited end-to-end to match — see `hero-spec-v1.md` §1, §2, §3, §6, §7, §12, §13, §15, and Appendix A + B.

**The completed 9.2s loop** (`Portfolio-BG-removal/BG-Removed/character.webm`, 220 frames) is **not** for the hero — it's too long and would compete with the tagline. It **moves to the animation-pipeline case study** (`/work/animation-pipeline`) as that page's hero media, where the longer arrival-and-departure narrative beat is exactly the case-study artifact being presented.

**The hero loop has been rendered.** What got built (`sw-portfolio-animation-2026/loop-3-hero-shoulder/loop-3-video/sean-typing-at-desk-hero-transparent.webm`):
- 94 frames @ 24fps = 3.917s
- 1280×720 landscape, VP9 with alpha channel (`alpha_mode=1`)
- 378KB (well under the 800KB budget)
- Composition: Sean seated at a desk typing at a keyboard; the AI companion (pencil-test rendered Claude mascot) floats beside him in the upper-right of the frame with a subtle vertical bob
- Seamless: frame 1 matches frame 94

The composition is **closer to a Sean-working-at-desk scene than the shoulder-hover concept** originally drafted. The asset was visually validated in the prototype on 2026-05-16 at the proportions: 1024×576 lane, `right: -180px` bleed (clips the source canvas's right empty band so the painted character sits visually flush with the right viewport edge), `bottom: 80px`. The rotating "get in touch" badge was removed in the same pass — character lane owns the right side; contact CTA moves to the footer per hero spec §10.

**Narrative rationale:** the hero shows *working with* the AI companion (a permanent partnership in motion); the case study shows *how he met* it (the arrival-and-departure beat). The two surfaces tell the same story at different velocities.

**About-page line stays as-is.** "I architect AI-native products, deploy agent fleets, ship to thousands — and on weekends, I draw my dog." The hero's AI companion (Claude mascot) and the About's dog are deliberately *parallel sides of Sean's life* — weekday AI partner / weekend dog. Not a contradiction; both real, both his.

---

## 9. Build Sequence (Roadmap)

```
PHASE 0 — RECONCILE & PREP   (now → before any build)
  ✅ Reconcile the animation work with hero-spec-v1.md §7 (resolved 2026-05-16; see §8.1)
  ✅ Render the new hero loop (sean-typing-at-desk, 3.9s, WebM VP9 alpha, 378KB)
  ✅ Prototype-validate the hero composition at 1024×576 / right:-180 / bottom:80
  □ Copy/rename the hero loop into /public/assets/character/hero-loop.webm at scaffold time
  □ Export a hero-loop-poster.webp from frame 1 (~30KB target)
  □ Move the existing 9.2s loop (character.webm) to /work/animation-pipeline as its hero media
  □ Extend the Daily Driver agent to write /api/dateline.json each morning
  □ Add /api/next-piece.json (next deadline for the "next in production" card)
  □ Consolidation pass on site-wide foundations (color tokens, torn-paper edge, cursor)

PHASE 1 — SPEC THE REMAINING SURFACES
  □ Case-study page spec       (case-study-spec-v1.md)
  □ About page spec            (about-spec-v1.md)
  □ /transactions/ ledger spec (transactions-spec-v1.md)  — NEW per §7
  □ /architecture/ route spec  (architecture-spec-v1.md)  — NEW per §7
  □ /essays/ route spec        (essays-spec-v1.md)        — NEW per §7
  □ Site chrome + footer spec  (footer links to fleet.seanwinslow.com — no Worker)

PHASE 2 — BUILD: HERO + PROJECTS
  □ Astro 5 scaffold + Tailwind 4 + Newsreader/JetBrains Mono
  □ Hero (per hero-spec-v1.md — use Appendix B hand-off prompt)
  □ Projects section (per projects-section-spec-v1.md — use Appendix C hand-off prompt)
  □ Re-run the 24-hour recall test on the live build (DoD item)

PHASE 3 — BUILD: NARRATIVE + CATALOG SURFACES
  □ 5 MDX case-study files (the curated narrative deep-dives)
  □ /work/[slug] dynamic route + View Transitions
  □ About page
  □ /transactions/ ledger — index + [slug] deep-dive (inherits 5 existing EXPLANATION.md from V3 bridge)
  □ /architecture/ — Vault Scorecard page (Task 15 ships 6/3; render its output)
  □ /essays/ — Access-vs-Meaning Manifesto page (Task 13 draft-locks 5/22; render)

PHASE 4 — LIVE LAYER + LAUNCH
  □ Footer link to fleet.seanwinslow.com (Task 11 dashboard already live)
  □ Deploy to Vercel at seanwinslow.com (replaces the V3 bridge at the same apex)
  □ Cloudflare DNS — orange-cloud OFF for Vercel records (Vercel owns edge + SSL)
  □ MCP embed page (post-ship; the MCP shipped 5/12, embed is retrospective)
```

### 9.1 Job-hunt anchors this serves

From `Sean-Winslow-Full-Personal-Context-v2.0.md` and the V4 sprint anchors:
- `sw-mcp-intent-engineering` ship — **2026-05-25** (Track C differentiator; the MCP embed page should land with it)
- Animation pipeline portfolio short — **2026-06-11** (becomes a live case study; the "next in production" card counts down to this)
- Job-hunt window close — **~2026-07-04** (the portfolio should be live and load-bearing well before this)

---

## 10. Open Decisions

| # | Decision | Notes |
|---|---|---|
| 1 | ~~Animation reconcile~~ | **RESOLVED 2026-05-16.** See §8.1. Hero spec revised; 9.2s loop redirected to the animation-pipeline case study; new ~2.5s shoulder-hover loop in production via Seedream 2.0. |
| 2 | ~~Domain name~~ | **RESOLVED 2026-05-17.** Locked to `seanwinslow.com` (Vercel + Cloudflare DNS-only / orange-cloud OFF). Inherited from roadmap Task 1 Step 3 — the V3 bridge already attached the domain Mon 5/19; the redesign replaces it at the same apex with no DNS churn. |
| 3 | **Dark mode in V1?** | Hero spec ships light-mode only with a manual footer toggle. Time-of-day auto-switch (D5) is deferred. Confirm light-only is acceptable for launch. |
| 4 | **The Block case study framing** | `ARCHIVED` status is locked. The case-study content must "frame the work, not the exit" — needs a careful first draft. Larry Cermak is the primary reference. |
| 5 | **16BitFit case study** | `PAUSED` status is locked. The case study leans on the *pipeline*, not a finished game. Confirm there's enough shippable artifact material. |
| 6 | **Three-folder nav (P3)** | Deferred from V1. Revisit if the standard Work/About/Contact nav feels too template once built. |
| 7 | **Global nav shape (NEW 2026-05-17)** | With `/transactions/`, `/architecture/`, `/essays/` added (§7), the nav now has 5 candidates alongside `/about/`. **Default: all five as siblings** (`work`, `transactions`, `architecture`, `essays`, `about`) — they're distinct genres, conflating them dilutes each. **Switch only if** user-testing on the live build shows the nav reads as cluttered, in which case nest `architecture` and `essays` under a `writing` parent or surface them through `/transactions/` filtering. |
| 8 | **Tile media for A-3 (NEW 2026-05-17)** | Intent Engineering MCP shipped 5/12; the "coming may 25" stamp is dead. **Default: 90-sec Loom poster** (terminal showing `npm install` resolving + Claude Desktop loading the server). Fallback: npm registry screenshot or MCP protocol diagram with `SHIPPED 2026-05-12` stamp. Pick at tile-build time based on which reads better at 400×500px. |
| 9 | **Crossover sequencing (NEW 2026-05-17)** | The V3 bridge ships Mon 5/19; this redesign replaces it at the same domain on a date TBD. Two options: (a) hard cutover — V3 stays live until redesign's V1 DoD is green, then one deploy swaps it; (b) progressive — redesign launches with hero + projects + transactions, V3's `/transactions/` URLs stay valid through identical slugs, About + case studies fill in over weeks. **Default: hard cutover** — preserves the "first 5 seconds feel handmade" impression that progressive launch would dilute. **Switch only if** a hot recruiter loop in Week 4–5 needs a single new artifact surfaced before the full redesign is DoD-green. |

---

## 11. Reference Materials Index

Everything a future session needs, in one place.

| File / folder | What it is |
|---|---|
| `CLAUDE.md` | Project orientation — read first, every session |
| `docs/PORTFOLIO-MASTER-PLAN.md` | This file — the strategic layer |
| `docs/hero-spec-v1.md` | Hero build spec (locked, validated) |
| `docs/projects-section-spec-v1.md` | Projects section build spec (locked) |
| `docs/Sean-Winslow-Full-Personal-Context-v2.0.md` | Sean's Tier-0 personal context — identity, values, career, goals |
| `docs/sw-portfolio-idea-1.md` | The original portfolio idea note (design philosophy seed, color palette, the mynrd + Vercel inspirations) |
| [`docs/prompts-and-references/2026-05-06-unified-roadmap copy.md`](../prompts-and-references/2026-05-06-unified-roadmap%20copy.md) | **The active job-hunt roadmap (last_updated 2026-05-17).** Source of truth for what artifacts ship when, the Council gap-fills (Tasks 12–15), the IA additions, and the V3-bridge crossover. This redesign absorbs everything that ships into the ledger. |
| `~/Code-Brain/sw-portfolio/` (external) | **The V3 bridge site** shipping Mon 5/19 to `seanwinslow.com`. The redesign replaces it at the same apex. Useful as the live reference implementation of the `/transactions/` ledger schema (`surface`, `shipped`, `repoUrl`, `explanationUrl`, RSS). |
| `~/Code-Brain/agent-fleet-observability/` (external) | **Task 11 dashboard** at `fleet.seanwinslow.com` (v1 code-complete 2026-05-17 evening). The redesign's footer links here; we don't reimplement live-data inline. |
| Five live `EXPLANATION.md` files (external) | The crossover ledger inheritance: intent-engineering MCP, vault-synthesizer eval suite, substack-drafter (gate-b-drafts), Phase D typed reasoning edges, Phase 6 knowledge loop. Carry forward at hard-cutover. |
| `docs/previous-design-specs/DESIGN-SPEC-V3.md` | Prior attempt — the museum spec. Useful for foundations (§2–§6); the *direction* is superseded. |
| `docs/previous-design-specs/DESIGN-SPEC-V4.md` | Prior attempt — V3 + Transactions wing. The 4Q block + Methods strip patterns carry forward; the two-velocity concept is deferred. |
| `mynrd.co.uk-site-analysis/01-site-dna.md` | Full DNA teardown of the #1 inspiration anchor — page architecture, design tokens, motion, micro-interactions |
| `mynrd.co.uk-site-analysis/02-05` | Brand interview, replication prompt, final prompt, iterator — supporting analysis |
| `reference-images/2D-Character-Sketch-Sean-v1.png` | **The character.** The style anchor for all animation work. |
| `reference-images/AI-PM-Hero-Idea.png` | An early hero sketch — name + role + character |
| `reference-images/Hero-design-inspiration-1.png`, `-2.png` | mynrd hero + footer screenshots |
| `reference-images/Portfolio-Design-Inspo-1.png` … `-5.png` | The "Alex Vonn / PM" set — the luxury-minimal template trap. Reference for what NOT to do. |
| `reference-images/Portfolio-Design-Inspo-6.png`, `-7.png` | mynrd screenshots — the direction that works |
| `reference-images/sw-portfolio-light-1.png`, `sw-portfolio-dark-2.png` | The "Iterative Blueprint" mockups — the design-system-viewer trap. Reference for what NOT to do. |
| `sw-portfolio-animation-2026/` | The character animation working directory (see §8) |
| `prototype/Hero.jsx`, `prototype/index.html` | An early code prototype of the hero — pre-this-session, superseded by `hero-spec-v1.md` |

---

## 12. How to Work on This Project

For future Claude sessions — the working mindset:

1. **Open in brainstorm mindset.** Sean will invoke `pm-product-discovery:brainstorm` to put Claude in the same multi-perspective (PM / Designer / Engineer) headspace this plan was built in. Honor that — generate breadth before converging, and pressure-test every idea against *"why is this Sean, not a template?"*
2. **The template trap is the enemy.** Before proposing anything, ask: does this drift toward the design-system-viewer or the luxury-minimal-PM template? If yes, stop. (See §1.3.)
3. **The three load-bearing things:** the character, the voice, the live layer. If a proposal drops any of them, it's drifting.
4. **Read before proposing.** The reference materials in §11 exist so Claude doesn't give generic advice. Use them.
5. **Be a thinking partner, not an executor.** Challenge while Sean is exploring; amplify once he's committed. Cross-pollinate from game design / animation / PM. Flag uncertainty honestly. (Per Sean's communication baseline — see his personal-context doc §Communication Baseline.)
6. **Brief and to the point.** No trailing summaries. Don't restate what a diff already shows. Calm, factual, zen tone.
7. **Specs are tactical, this plan is strategic.** When a section gets locked, write a `*-spec-v1.md` for it and add a pointer here — don't bloat this file with build detail.
8. **Update this doc when direction changes.** It's a living document. New locked decisions, killed ideas, resolved open questions — they land here.
9. **The roadmap is the source of truth for what ships into the ledger; this plan is the source of truth for what it looks like (NEW 2026-05-17).** Every Task in [`docs/prompts-and-references/2026-05-06-unified-roadmap copy.md`](../prompts-and-references/2026-05-06-unified-roadmap%20copy.md) that produces an `EXPLANATION.md` writes a row into the `/transactions/` content collection — automatically. The 5 case-study tiles only change when a flagship earns a narrative deep-dive. The ledger handles everything else with zero ceremony. If a new artifact emerges in the roadmap that doesn't fit the 5-tile slot, it's a ledger row, not a tile.

---

*End of master plan. Last updated 2026-05-17.*
