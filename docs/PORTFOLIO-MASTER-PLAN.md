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

Codified as the **one-splash-per-section** rule (see §5, idea D2): 95% of the site is warm paper (`#FFF9F0`) and ink. Each section gets *one* full-bleed splash-color moment, never two. The "Iterative Blueprint" mockup violated this — every screen had four colors at once.

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

---

## 4. Locked Copy Decisions

| Surface | Copy | Status | Rationale |
|---|---|---|---|
| **Home hero tagline** | *"Raised by Saturday morning cartoons and Vercel deployment logs."* | LOCKED | Passes the parallel-lineage rule. Validated via 24-hour recall test — viewers recall "AI PM who animates" without studying. |
| **About page lead** | *"I architect AI-native products, deploy agent fleets, ship to thousands — and on weekends, I draw my dog."* | LOCKED | Hard-cut deflation (epic register → mundane punchline). 18 words — too long for a hero, perfect as an About-page hook. |
| **Hero dateline (default pattern)** | e.g. *"BOSTON, MAY 13, 2026 — vault indexer wrote 47 chunks at 02:34. fleet green."* | LOCKED — pattern, not exact string | Wire-service "fleet pulse" pattern. Real data, rotates daily. See `hero-spec-v1.md` §8 for the 4 rotation patterns. |
| **Killed line** | *"Ten years of cartoons, six months of PRDs..."* | KILLED | Violates the parallel-lineage rule. |
| **Killed line** | *"Animator who became a product manager. Then taught the agents to draw."* | NOT USED | Strong line, but "became" implies the timeline. Held as a possible case-study or social pull-quote, never the hero. |
| **Meta description / OG card / Substack tagline** | *"Raised by Saturday morning cartoons and Vercel deployment logs."* | CANDIDATE | The hero line doubles as the wire-service meta line — it's built like a dateline tagline. |

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
| D2 | **One splash color per section, never two** — 95% paper+ink; work section = full teal; contact = amber; about = soft coral; torn-paper edges between | Codifies "simplicity with splashes of color" as architecture, not decoration | H/L |
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
- **The 5 projects (locked):** 2D Animation Pipeline (`ACTIVE`), Claude Code Superuser Pack (`ACTIVE`), Intent Engineering MCP (`COMING`), The Block — Campus + RevOps (`ARCHIVED`), 16BitFit Battle Mode (`PAUSED`).
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
| **Case-study page** (`/work/<slug>` body) | The investigation-board artifact thread (P4), Methods strip, 4Q block, next/prev nav | **Next after animation reconcile** | High editorial complexity. Once spec'd, all 5 MDX bodies can be drafted in one sitting. Shape is sketched in `projects-section-spec-v1.md` §11. |
| **About page** | The character in its fullest form, the locked About lead line, the origin story, the parallel-lineage life narrative | High | Where D3 (pencil annotations) and the warm/origin-story half of the duality live most fully. |
| **Footer + live agent feed** (E1) | The Cloudflare Worker reading `agent-run-history.csv`, the last-3-events display | Medium | Shares the data-source pattern with the hero dateline. |
| **Contact section** | The amber splash block, the "get in touch" rotating badge in its full-page form | Medium | Small surface; can fold into the About or footer spec. |
| **MCP embed page** (E2) | `/work/intent-engineering-mcp` with a live read-only MCP tool call | Medium | Time it ~1 week before the May 25 `sw-mcp-intent-engineering` launch. |
| **Site-wide foundations** | Section-scoped splash-color custom properties, the torn-paper edge component, global cursor, dark-mode tokens | Before the build session | Mostly inherited from V3/V4 §2–§6; needs a consolidation pass. |

---

## 8. The Character Animation (In Progress)

**Working directory:** `sw-portfolio-animation-2026/`

**Current contents (as of 2026-05-14):**
- `anchor-1.png`, `anchor-2.png` — anchor frames for the character
- `ai-companion-turnaround-anchor.png` — a turnaround sheet for an **AI companion character** (see flag below)
- `loop-1/` — 166 raw frames (`loop-1-raw/`) + a Nano Banana 2 cleanup pass (`NB2_cleanup/`) + a 24fps contact sheet
- `loop-2/` — 166 raw frames (`loop-2-raw/`) + an NB2 cleanup pass + a 24fps contact sheet

So: two ~7-second loops at 24fps, anchored to Sean's pencil-test character style, being cleaned up via Nano Banana 2.

**Skills available for this work:** `.claude/skills/gemini-pencil-animation-image-gen` (2D pencil-test style art, anchored to `reference-images/2D-Character-Sketch-Sean-v1.png`) and `.claude/skills/gemini-image-gen` (general image gen).

### 8.1 FLAG — reconcile with the hero spec

`hero-spec-v1.md` §7 specs the character animation as **three small frame sets**: a 6-frame walk-in, an 8-frame idle breathing loop, a 2-frame blink. It assumes a single character (Sean).

The animation working directory shows something larger and possibly different: two 166-frame loops, plus an **AI companion character** that the hero spec does not account for.

**This needs an explicit reconcile before the hero build.** Open questions:
1. Are `loop-1` / `loop-2` the hero's walk-in + idle, or are they something else (a portfolio short? a different surface)?
2. Does the AI companion character appear in the hero? If so, the hero spec's §7 and the composition wireframe (§2) both need revision — the companion is a second illustrated element competing for the right margin.
3. If the companion is for a *different* surface (About page? a case study? the animation-pipeline project itself?), note that and leave the hero spec as-is.

Do not start the hero build session until this reconcile is resolved.

---

## 9. Build Sequence (Roadmap)

```
PHASE 0 — RECONCILE & PREP   (now → before any build)
  □ Reconcile the animation work (loop-1, loop-2, AI companion) with hero-spec-v1.md §7
  □ Finalize character frame sets: walk-in, idle, blink (per hero spec, or revised)
  □ Extend the Daily Driver agent to write /api/dateline.json each morning
  □ Add /api/next-piece.json (next deadline for the "next in production" card)
  □ Consolidation pass on site-wide foundations (color tokens, torn-paper edge, cursor)

PHASE 1 — SPEC THE REMAINING SURFACES
  □ Case-study page spec  (case-study-spec-v1.md)
  □ About page spec       (about-spec-v1.md)
  □ Footer + agent feed spec  (can fold into a site-chrome spec)

PHASE 2 — BUILD: HERO + PROJECTS
  □ Astro 5 scaffold + Tailwind 4 + Newsreader/JetBrains Mono
  □ Hero (per hero-spec-v1.md — use Appendix B hand-off prompt)
  □ Projects section (per projects-section-spec-v1.md — use Appendix C hand-off prompt)
  □ Re-run the 24-hour recall test on the live build (DoD item)

PHASE 3 — BUILD: CASE STUDIES + ABOUT
  □ 5 MDX case-study files
  □ /work/[slug] dynamic route + View Transitions
  □ About page

PHASE 4 — BUILD: LIVE LAYER + LAUNCH
  □ Footer live agent feed (Cloudflare Worker)
  □ Deploy to Vercel
  □ MCP embed page (timed ~1 week before May 25 sw-mcp-intent-engineering launch)
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
| 1 | **Animation reconcile** (see §8.1) | Blocks the hero build. Highest priority. |
| 2 | **Domain name** | `seanwinslow.com` vs `seanwinslow.studio` vs other. Hero spec §13 flags it as TBD. |
| 3 | **Dark mode in V1?** | Hero spec ships light-mode only with a manual footer toggle. Time-of-day auto-switch (D5) is deferred. Confirm light-only is acceptable for launch. |
| 4 | **The Block case study framing** | `ARCHIVED` status is locked. The case-study content must "frame the work, not the exit" — needs a careful first draft. Larry Cermak is the primary reference. |
| 5 | **16BitFit case study** | `PAUSED` status is locked. The case study leans on the *pipeline*, not a finished game. Confirm there's enough shippable artifact material. |
| 6 | **Three-folder nav (P3)** | Deferred from V1. Revisit if the standard Work/About/Contact nav feels too template once built. |

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
| `docs/2026-05-06-unified-roadmap.md` | Prior roadmap (pre-this-session; partially superseded by §9 here) |
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

---

*End of master plan. Last updated 2026-05-14.*
