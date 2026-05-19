# BLUEPRINT-COMPLETE — sw-ai-pm-portfolio

> **Status:** Synthesis. Drafted 2026-05-18 from the two-session spec sprint. Awaits Sean's lock.
> **Purpose:** Single entry point for the build session. Replaces "read 11 files in order" with "read this, then the 8 specs as a tactical reference."
> **Scope:** Pure synthesis. No new opinions. Every claim traces to a specific spec section or PMP §.
> **Owner:** Sean Winslow.

---

## 1. TL;DR

Eight surface specs locked or drafted-awaiting-lock across two sessions. The strategic layer ([`PORTFOLIO-MASTER-PLAN.md`](PORTFOLIO-MASTER-PLAN.md)) and the canonical 4Q template ([`EXPLANATION-template.md`](../../claude-code-superuser-pack/vault/40_knowledge/templates/EXPLANATION-template.md)) anchor the tactical specs. One additive update is **pending** and **must** be folded in before build session #1: architecture-spec-v1.md §14.1 requires `relatedArchitecture: string | string[]` as an optional field on `transactions-spec-v1.md` §3.2. 29 `[OPEN-N]` questions are flagged across 6 specs plus 6 open PMP §10 decisions — every one has a recommended default; Sean's task at lock is confirm-or-switch, not author-from-scratch. One inter-spec contradiction surfaces in the punch list (hero §14 vs case-study §13.3 on the MCP embed URL). Build proceeds in 5 phases inheriting PMP §9.

---

## 2. Spec map

| Layer | File | Status | The non-obvious call |
|---|---|---|---|
| **Strategic anchor** | [`PORTFOLIO-MASTER-PLAN.md`](PORTFOLIO-MASTER-PLAN.md) | Living | The three load-bearing things — character, voice, live layer — are what prior V3/V4 attempts kept dropping. PMP §10 carries the open decisions adjudicated cross-cutting (dark mode, nav shape, crossover sequencing). |
| **Roadmap source-of-truth** | [`2026-05-06-unified-roadmap copy.md`](2026-05-06-unified-roadmap%20copy.md) | Living | Every Task that ships an `EXPLANATION.md` writes a `/transactions/` ledger row automatically. Tasks 13/14/15 introduce the three new IAs (`/essays/`, `/architecture/`, `/transactions/`); Gap-Fill 3 ships the V3 bridge ledger Mon 5/19 that this redesign replaces at the same apex. Task 10 (`vault-knowledge-mcp`) and Task 11 (fleet dashboard, live) gate downstream surfaces. |
| **4Q comprehension contract** | [`EXPLANATION-template.md`](../../claude-code-superuser-pack/vault/40_knowledge/templates/EXPLANATION-template.md) | Canonical | Every collection that fetches a 4Q at build (work, transactions, architecture, essays) validates against this template's 4 headings exactly: `What is this?` / `Why this approach?` / `What would break?` / `What did I learn?`. The case-study `<FourQBlock />` component is the shared renderer. |
| **Hero (locked)** | [`hero-spec-v1.md`](hero-spec-v1.md) | LOCKED 2026-05-13, animation-reconciled 2026-05-16 | Sean + AI companion are *already there together* when you land — no walk-in arrival beat. The 3.917s WebM loop runs as the page's ambient heartbeat. Lane is `right: -180px` bleed-and-clip so the source canvas's empty band falls off-screen and the painted character sits flush against the viewport edge. |
| **Projects section (locked)** | [`projects-section-spec-v1.md`](projects-section-spec-v1.md) | LOCKED 2026-05-13, A-3 status amended 2026-05-17 | The grid is 5 curated tiles + 1 dashed "next in production" card pulling from `/api/next-piece.json`. The full artifact roster (9+ flagship + 3 supporting at scale) does NOT compete with the 5 tiles — it lives at `/transactions/`. Same MDX content collection feeds both. |
| **Case study (drafted)** | [`case-study-spec-v1.md`](case-study-spec-v1.md) | Drafted 2026-05-17 | Status governs page *shape*, not just the label. ACTIVE/COMING look default; SHIPPED gets a literal hand-drawn stamp + `<ShippedNow />` live install-count block; PAUSED gets a return-condition callout before the hero media; ARCHIVED gets a frame-the-work preamble + 50%-opacity right-margin accent. 4Q reads from canonical `EXPLANATION.md` at build (Option A); `four_q:` frontmatter mirror is the legacy fallback (Option B). |
| **About (drafted)** | [`about-spec-v1.md`](about-spec-v1.md) | Drafted + dog→canon revised 2026-05-17, lead-line repositioned 2026-05-18 | Two-column parallel-lineage timeline (animator left / PM right) connected by hand-drawn cross-gutter arrows is the geometry that operationalizes PMP §3.1's parallel-lineage voice rule. B-3 Saturday morning canon (6 pencil-test cels, animation-cel framing with hand-drawn registration pegs) replaces the killed dog-Polaroid section — earns the "Raised by Saturday morning cartoons" lead literally. **Lead-line (2026-05-18):** single line `"Raised by Saturday morning cartoons and Vercel deployment logs."` — the prior 3-sentence credentials-block was superseded when Sean repositioned the home hero to lead with the PM role explicitly. About now does the biographical work; home declares the role. Cross-page closeout via the pull-quote at the page foot, which echoes the new home hero. |
| **Transactions ledger (drafted)** | [`transactions-spec-v1.md`](transactions-spec-v1.md) | Drafted 2026-05-17 | The V3-bridge schema is **re-architected, not inherited verbatim** — `beat` enum becomes a 5-value `surface` enum; free-text `producedBy` becomes structured `methods[]`; free-text `shipped` becomes strict ISO. Slugs preserved; bodies preserved as inline-body-4Q legacy fallback. `scripts/migrate_v3_transactions.mjs` runs once at crossover, then is deleted. The schema is the load-bearing contract — every future ship writes through it. |
| **Architecture (drafted)** | [`architecture-spec-v1.md`](architecture-spec-v1.md) | Drafted 2026-05-17 | The HONEST NOTE callout (wire-service mono inside Newsreader essay prose) is the load-bearing credibility signal — the register switch IS the visual punctuation. Flat-equality scoreboard rendering (no row highlight for Sean's vault, identical visual treatment across all rows) is the structural honesty. Architecture is the **most austere voice register** on the site — sober throughout, with mono HONEST NOTE callouts breaking through. |
| **Essays (drafted)** | [`essays-spec-v1.md`](essays-spec-v1.md) | Drafted 2026-05-17 | Sober-middle, personal-voice-bookended (PMP §3.3): opening hook + closing kicker carry Sean's voice; the analytical middle (artifact map + role map + anti-thesis) stays sober/declarative. **No visual chrome marks the register switches** — the prose change is the only signal. The cross-link graph closes here: an essay's `plottedArtifacts: [...]` auto-reverse-renders "← named in: [essay title]" on every cited ledger row + architecture writeup, build-derived. |
| **Site chrome (drafted)** | [`site-chrome-spec-v1.md`](site-chrome-spec-v1.md) | Drafted 2026-05-17 | The home page renders without the top nav (`noChrome={true}` BaseLayout flag) — hero owns `y=0`. Footer renders on every page including home (it IS the home page's only navigation affordance — mynrd-coded linear-scroll discipline). Theme toggle is two mono text labels (`LIGHT · DARK`), no icons, no slider. V3-bridge `sw-theme` cookie preserved verbatim so dark-mode preference survives crossover. |

---

## 3. Cross-cutting contracts

The 8 surface specs are not 8 independent surfaces — they are 8 views over a unified content graph wired together by shared components, shared build scripts, and one runtime agent. Surfacing the threads here so the build session has them in one place.

### 3.1 The 4-collection content graph

Four Astro content collections, one cross-link graph:

| Collection | Scale at launch | Path | Schema source-of-truth |
|---|---|---|---|
| `work` | 5 curated tiles | `/work/<slug>/` | [`projects-section-spec-v1.md`](projects-section-spec-v1.md) Appendix B + [`case-study-spec-v1.md`](case-study-spec-v1.md) Appendix B (frontmatter extends) |
| `transactions` | ~5 at crossover → ~47 at scale | `/transactions/<slug>/` + `/transactions/<surface>/` | [`transactions-spec-v1.md`](transactions-spec-v1.md) §3.2 |
| `architecture` | 1-3 in v1 (Vault Scorecard, vault-knowledge-mcp, possibly Control Architecture) | `/architecture/<slug>/` | [`architecture-spec-v1.md`](architecture-spec-v1.md) §3 |
| `essays` | 1 in v1 (Access-vs-Meaning Manifesto) | `/essays/<slug>/` | [`essays-spec-v1.md`](essays-spec-v1.md) §3 |

**One artifact can appear on multiple surfaces simultaneously with the same slug.** Control Architecture (Task 14) is the test case: ledger row at `/transactions/control-architecture/` + architecture writeup at `/architecture/control-architecture/` (pending OPEN-1 in arch spec) + cited as a plotted artifact in the manifesto at `/essays/meaning-over-access/`. Every reverse link auto-derives from the source frontmatter's `plottedArtifacts`, `relatedArchitecture`, `relatedLedgerRow`, `relatedCaseStudy`, `relatedEssay`, `previousVersion` — Sean maintains one direction; the build script writes the other.

### 3.2 Shared components

Three components originated in one spec and propagate across the graph:

| Component | Origin | Used on |
|---|---|---|
| `<FourQBlock />` | [`case-study-spec-v1.md`](case-study-spec-v1.md) §9 | Case-study, transactions deep-dive, architecture deep-dive, essays deep-dive. Validates against `EXPLANATION-template.md` 4 headings. |
| `<MethodsStrip />` | [`case-study-spec-v1.md`](case-study-spec-v1.md) §8 | Case-study, transactions deep-dive, architecture deep-dive. Cross-link rule (`link: /work/<slug>` → internal nav) builds the methods graph across the portfolio. |
| `<Annotation />` | [`case-study-spec-v1.md`](case-study-spec-v1.md) §11 | Case-study (≤6/page), About (≤12/page — maximum density), transactions deep-dive (≤2/page), ledger index (none — wire-service register kills annotations). Anchored to target by ID + offset, never absolute pixel coords. |

The thesis-pullquote primitive originated in [`architecture-spec-v1.md`](architecture-spec-v1.md) §2.2 and is reused in [`essays-spec-v1.md`](essays-spec-v1.md) §2.2 — same Newsreader 24px italic + 0.5px teal rules + max-width 680px.

The dateline-strip component is hero-spec §8 — every surface (case-study, about, transactions, architecture, essays, contact, 404) renders a project-specific or page-specific dateline body through the same primitive. Pattern selection (5 rotation patterns) is the home hero's behavior only; sub-page datelines are statically authored or build-time-rendered.

### 3.3 Shared build scripts

Three prebuild gates, one runtime writer, one one-shot migration:

| Script | Origin | Final scope | Role |
|---|---|---|---|
| `scripts/fetch_canonical_sources.mjs` | Case-study spec §15 (originally `fetch_explanations.mjs`); renamed in architecture spec §11.1; extended a 4th time in essays spec §11.1 | Walks `work` + `transactions` + `architecture` + `essays`. Curls `explanationUrl` + `essaySourceUrl` (architecture) + `sourceUrl` (essays) with ETag-based caching (`.cache/canonical-sources.lockfile`). Validates 4 canonical headings on every `EXPLANATION.md`. Writes to `src/content/explanations/<slug>.md` + `src/content/architecture/essays/<slug>.md` + `src/content/essays/essay-bodies/<slug>.md`. | prebuild |
| `scripts/validate_content.mjs` | Essays spec §11.1 (consolidation pass) | **Replaces** `scripts/validate_transactions.mjs` + `scripts/validate_architecture.mjs` — those two get merged in as dispatched sub-routines, then deleted. Walks all 4 collections. Asserts schema completeness, resolves every cross-link slug, validates ISO dates, HEAD-checks essays' role-map `jdUrl` entries (warning-on-fail), staleness-checks `roleMap.lastValidated` (>30 days = warning). Single prebuild gate. | prebuild |
| `scripts/derive_crosslinks.mjs` | Transactions spec §11.1; extended in architecture + essays specs | Builds the 4-way bidirectional reverse-lookup table. Writes `src/content/crosslinks.json`. Auto-renders "← superseded by" (`previousVersion`), "← named in: [essay]" (essay `plottedArtifacts`), "→ part of" (`relatedCaseStudy`), "→ read the architectural argument" (ledger row's `relatedArchitecture` ⇄ architecture writeup's `relatedLedgerRow`), etc. Rejects dangling slugs. | prebuild (after validate) |
| `scripts/migrate_v3_transactions.mjs` | Transactions spec §11.1 + §12.2 | One-shot interactive script. Reads `~/Code-Brain/sw-portfolio/src/content/transactions/*.md` (V3 bridge clone). Maps `beat` → `surface`, prompts Sean for ISO `shipped` per row, splits `producedBy` → `methods[]`. Preserves slugs + MDX bodies. Run once at crossover, commit output, **delete the script**. | one-shot, at crossover |
| `scripts/validate_about.mjs` | About spec §17 | About-page-specific lead-line validator — asserts MDX `lead:` matches PMP §4 revised string byte-for-byte. Build fails on drift. | prebuild |
| Daily Driver agent extensions | Hero spec §8 (existing `dateline.json`); projects spec §4 (new `next-piece.json`); about spec §8 (new `about-pulse.json`); case-study spec §15 (new `shipped-stats-<slug>.json`) | Writes 4 endpoints to `/public/api/` at 08:45 daily. Reads `src/content/transactions/*.md` filesystem to compute the `ledger_row` hero dateline pattern body. **No new launchd cron** — folds into the existing morning agent run. | runtime, 08:45 daily |

The `scripts/build_scoreboard_svg.mjs` (architecture spec §11.1) and the Mermaid SSR via `astro-mermaid` (architecture §9.2 + essays §8.2 share the integration + 5-var palette override) are build-render-time, not gate scripts.

### 3.4 Voice register by surface (5-surface differentiation, PMP §3.3 expanded)

The voice rule is not "Sean's voice." It's six registers calibrated by surface:

| Register | Where | Defining mark |
|---|---|---|
| **Sedaris-coded (first-person-warm)** | Home hero tagline; About B-1 timeline body (Newsreader rows) + B-2 thesis prose; case-study opener | Specific nouns. Comedic juxtaposition without a punchline. The "parallel-lineage" rule (PMP §3.1): never frame animator-self as before / PM-self as after — both happen in childhood. |
| **Sedaris-with-cels / declarative-wire-service** *(new register, introduced in About spec §4)* | About B-3 cartoon-canon lesson captions | `LESSON NOUN — body line.` Reads like classified ads for product-craft principles. The cartoon-craft-mapped-to-product-craft authority claim IS the move; no comedic register, no first person. |
| **Sober/declarative** | Architecture essay body throughout; essays middle sections (artifact map, role map, anti-thesis); About B-4 "where I'm going"; case-study 4Q body (Q1-Q3); ledger index subhead; architecture index sober subhead | Newsreader 20px weight 300. Analytical. Past + present tense interchangeably. **No comedic register, ever.** |
| **Wire-service dense (machine-data)** | Datelines; project tags; frame numbers; Methods strips; ledger rows; About live pulse strip; ledger filter pills; cartoon cel name strips; architecture HONEST NOTE callouts; essays plotted-artifacts list; role-map tables; scoreboards; chrome footer | JetBrains Mono. Stamp amber prefixes for dates + "LIVE" + "PUBLISHED" + lesson nouns. Dated. Factual. One claim per row. |
| **Bookend-warm (essays only)** | Essays opening hook (Sedaris-coded OK) + essays closing kicker (Sean-honest, not Sedaris-comedic) | Newsreader 20px weight 300 — **no visual chrome marks the register switch**. Prose voice change is the only signal. Trust the reader. |
| **Editorial-credentials-block** *(new register, About spec §4)* | About-page lead line | Serif (Newsreader `clamp(36px, 4vw, 64px)`) but wire-service-coded in cadence. 3 short sentences rendered as a stat-block. Sentence 1 deliberately rhymes with home-hero tagline ("Raised by..." → "Trained by...") — sentences 2-3 are factual ship-stamps. No comedic deflation. |

**STOP-DOING (PMP §3.4, inherited from roadmap Task 7 / Council Deprioritization 1):** Never frame the HybridRouter as "Agent OS" or "runtime architecture" anywhere on the portfolio. The HybridRouter is 100 lines of model-routing logic; framing it as architecture invites senior engineers in technical screens to grill on concurrency / distributed caching / thread locking — fights Sean's beginner-to-intermediate coding level can't win. The one paragraph it earns lives inside the Control Architecture writeup's "Authority" section — *"authority over which brain runs which task"* — and nowhere else. No standalone case-study tile, no dedicated essay, no hero callout. Sean's edge is **semantic product architecture** (specs, governance, routing, memory, authority, review).

### 3.5 View Transition seams

| Seam | `view-transition-name` | Specced in |
|---|---|---|
| Projects tile → case-study hero | `hero-media-<slug>` | Projects spec §10.4 + case-study spec §6 |
| Ledger row → ledger deep-dive | `ledger-title-<slug>` | Transactions spec §15 |
| Architecture index row → architecture deep-dive | `arch-title-<slug>` | Architecture spec §15 |
| Essay index row → essay deep-dive | `essay-title-<slug>` | Essays spec §15 |
| Case-study Methods strip cell → `/work/<slug>` (cross-link) | none (page-level fade only via `<ClientRouter />`) | Case-study spec §8.2 |
| Cross-surface morphs (ledger ↔ architecture, essay ↔ ledger ↔ architecture) | **v2 deferred** | Architecture spec §15 + essays spec §15 — risk of too many shared targets |
| Nav + footer persistence across navigation | none (outside `<main>`, no transition-name shared) | Site chrome spec §6.4 |

All seams: Firefox <128 + older Safari fall back to instant navigation. Functional, not degraded.

### 3.6 Daily Driver agent wiring

The Daily Driver morning agent (runs 08:45 daily, existing infrastructure per superuser-pack `CLAUDE.md`) gains **4 write endpoints** + **1 ledger-pattern computation**:

| Endpoint | Origin spec | Body |
|---|---|---|
| `/public/api/dateline.json` (existing) | Hero spec §8 | 5 rotation patterns: `fleet_pulse`, `ship_log`, `reading_log`, `now_line`, `ledger_row`. One pattern per day. Pattern-selection logic lives in the agent. |
| `/public/api/next-piece.json` (new) | Projects spec §4 | `{ title, date_target }` — earliest-upcoming-ship-date from the roadmap's anchor list. As of 2026-05-17: Vault Scorecard 6/3 → Judge Layer 6/4 → vault-knowledge-mcp ~6/4 → Control Architecture 6/10 → Animation Pipeline short 6/11. |
| `/public/api/about-pulse.json` (new) | About spec §8.1 | Wire-service "LAST 24H" strip: `items[]` of `commits` / `drafts` / `pencil_frames` / `reading`. **No `dog_walks` item type** — explicitly removed in the v1 revision. |
| `/public/api/shipped-stats-<slug>.json` (new, per-SHIPPED-page) | Case-study spec §15 | Live install-count block for `<ShippedNow />`. V1 occupant: `intent-engineering-mcp`. npm weekly downloads + MCP registry installs + GitHub stars. Daily Driver writes nightly. |

The `ledger_row` pattern is the closure point of the live layer: agent reads `src/content/transactions/*.md` filesystem at write-time, computes count + most-recent title + new-arrivals-overnight signal, picks the pattern, renders the body string. Transactions spec §13 confirms the wiring; hero spec §8 declares the consumer.

**Key constraint:** the Daily Driver runs in a headless SDK environment with **no MCP access** (per superuser-pack `CLAUDE.md`). All 4 endpoints write from filesystem reads only — no Slack, no Gmail, no calendar. Live install counts on `shipped-stats-<slug>.json` come from npm/GitHub public APIs via HTTPS, not an MCP client.

---

## 4. Open decisions roll-up

Every `[OPEN-N]` flagged inline in a spec, organized by surface. Each carries a recommended default (per the spec's own switch-only-if condition). Plus PMP §10's still-open cross-cutting decisions.

### 4.1 Hero spec — none

The hero spec is fully locked. No `[OPEN-N]` markers; the only outstanding items are Phase 0 prep tasks (see §5).

### 4.2 Projects section spec — none

Fully locked. A-3 status amendment (COMING → SHIPPED) executed inline 2026-05-17.

### 4.3 Case-study spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| §13.1 | Animation-pipeline `EXPLANATION.md` location | The superuser-pack repo (co-located in `~/Code-Brain/claude-code-superuser-pack/animation-pipeline/EXPLANATION.md`) | Sean's working folder for the animation short is separate from the superuser-pack repo |
| §13.4 | The Block content review (PMP §10 Decision 4 dependency) | First draft with Larry Cermak as primary reference. Frame-the-work, not the exit. ARCHIVED status locked. | Anonymization review surfaces material that can't ship publicly even sanitized — in which case the case study leans on Reference Artifact link + frontmatter-mirror 4Q only |
| §13.5 | 16BitFit shippable artifact material (PMP §10 Decision 5 dependency) | Spec assumes the pipeline is the artifact, not the game. Pipeline artifacts (renders, sprite explorations, agent runs) carry the case study; gameplay screenshots only where they exist | Pipeline artifact material is insufficient even leaning on the pipeline — then the tile drops to A-4 (4 tiles + 1 next-in-production card; reduce grid to 5 cells) |

### 4.4 About spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| OPEN-1 | §7.3 character composition | Sean alone, full-body, no AI companion. AI companion lives in home hero + animation-pipeline case study. About is the human-self surface. | — |
| OPEN-2 | §9 timeline content | Geometry locked; 8-10 paired rows. Sean writes the row prose in the build session. | — |
| OPEN-3 | §11.2 the 6 cartoons + lessons | Spec locks: 6 cels, `LESSON NOUN — body line` caption format, lesson maps cartoon-craft → product-craft. Sean writes the canonical list (cartoon, year, lesson noun, body) in the build session. Cartoon Network / Nickelodeon / Looney Tunes era per Sean's note. | — |
| OPEN-4 | §11.4 pencil-test study authorship | **Path C (hybrid):** Sean draws 2-3 by hand to lock the visual language; Seedream 2.0 backfills the remaining 3-4 from references + Sean's character style anchor. Path A (all hand-drawn, ~30 min/study) and Path B (all Seedream) are alternatives. | Sean has time to do all 6 hand-drawn (Path A) before build, or wants the consistency of pure-Seedream (Path B) |
| OPEN-5 | §14 "V3 portfolio" strikethrough artifact | No — Sean's voice is comedic-confident, not self-flagellating. V3 stays out of the page. | Sean wants the transparency-flex move and confirms he can frame it as iteration, not failure |
| OPEN-6 | §4 hand-drawn heading SVG authorship | Path A (Sean hand-draws + scans) or Path B (Seedream renders). Path C ("Caveat" font) is discouraged — reads as fake-handwritten. | — |

### 4.5 Transactions ledger spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| OPEN-1 | §3.2 surface enum values | Keep all 5: `[fleet, pipeline, product, writing, infra]`. Substack-drafter belongs in `writing` (the tooling is the artifact). Manifesto itself lives at `/essays/` but earns a ledger row with `surface: writing`. | Future surface use shows `writing` collapsing into `product` or `fleet` after ~10 rows of data |
| OPEN-2 | §9.2 4Q source dual-mode duration | Accept dual-mode (canonical `explanationUrl` for new entries + V3 inline-body fallback for migrated entries) for ~3-6 months until V3 entries earn upstream `EXPLANATION.md` files. | — |
| OPEN-3 | §3.3 manifesto on the ledger | Yes — manifesto gets a ledger row with `surface: writing`, `relatedEssay: access-vs-meaning`. Two surfaces, one artifact, one canonical 4Q. | — |
| OPEN-4 | §13 Daily Driver `ledger_row` body authorship | Lock the 3 templates sketched in §13; agent picks based on overnight signal; agent doesn't free-form. | — |
| OPEN-5 | §9.1 Loom embed budget | Strict 1-Loom max per deep-dive page. A row needing 2 videos splits into 2 rows or earns a case study. | — |

### 4.6 Architecture spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| OPEN-1 | §16 Control Architecture surface placement | Yes — Control Architecture (Task 14, ships ~6/10) earns an architecture writeup at `/architecture/control-architecture/` in addition to its ledger row. Same artifact shape as Vault Scorecard (thesis + comparison + diagram + worked example). | Task 14 slips past crossover — then it ships only as a ledger row in v1, architecture writeup follows post-launch |
| OPEN-2 | §16 index page hook line | *"Most people see Obsidian as content. I treat my vault as agent infrastructure."* Keep as page hook until /architecture/ has 3+ writeups, then revisit (becomes route-level when route is no longer dominated by Vault Scorecard). | — |
| OPEN-3 | §16 Mermaid palette override completeness | Ship v1 with the 5-var override; observe rendered output during Vault Scorecard build; add more overrides as needed. Fallback: `mermaid-cli` mmdc build-time PNG export. | Rendered Mermaid output looks inconsistent with the rest of the page — swap to mmdc |
| OPEN-4 | §16 reading-time computation | Manual for v1 (Sean writes `readingTime: 8` in frontmatter). Auto-compute deferred to v2 — adds build complexity for low payoff at 3-5 writeup scale. | — |
| OPEN-5 | §16 honest-note anchor matching | Warning, not error. Build keeps shipping; Sean updates MDX anchor manually after upstream essay edits. | Upstream edits become frequent enough that warnings get ignored — then escalate to error |

### 4.7 Essays spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| OPEN-1 | §17 index page hook line | *"I bet on meaning, not access."* — Vault-Scorecard-style identity claim from the manifesto itself. Ages out to a route-level generic when /essays/ has 3+ entries from different thesis-clusters. | Sean wants route-level generic from day one — alternative: *"Thesis-shaped writing where the artifacts back the claim."* |
| OPEN-2 | §17 JD URL validation cadence | Every build, warning-on-fail. Build wastes <5s; alternative weekly cron adds infrastructure for low value at 1-essay scale. Revisit at 5+ essays. | — |
| OPEN-3 | §17 `plottedArtifacts` locked-at-publish vs. dynamic growth | Frozen at publish. `lastRevised` marks editorial updates (typo fixes, JD URL refreshes); growing the artifact list earns a new essay rather than silent expansion. | — |
| OPEN-4 | §17 future thesis-clustering when /essays/ grows past 5 | Defer. V1 ships flat list. Revisit at 5+ entries. | — |
| OPEN-5 | §17 newsletter-form omission | Intentional. Subscribe affordances are `/essays/rss.xml` + Substack link. No inline form. | Sean wants an inline form — clean add (one component, one POST endpoint), default is "no form" |

### 4.8 Site chrome spec

| # | Where | Recommended default | Switch-only-if |
|---|---|---|---|
| OPEN-1 | §16 wordmark style | "SW" in JetBrains Mono uppercase. Newsreader wordmark would compete with every page's Newsreader `<h1>` (case-study, architecture, essay). | Sean prefers "Sean Winslow" full Newsreader for stronger identity |
| OPEN-2 | §16 sticky nav vs. scrolls-away | `position: sticky`. Recruiters reading long architecture essays / case studies benefit from persistent escape to siblings. Mynrd-pure scrolls-away is the home-page discipline; sub-pages get the pragmatic affordance. | Sean wants mynrd-pure linear-scroll on sub-pages |
| OPEN-3 | §16 `/contact/` route preservation | Keep the minimal page. 80 lines of Astro costs less than a recruiter hitting a 404 from a V3-bridge bookmark. Reassess at 6 months — if <5 hits/month, drop. | — |
| OPEN-4 | §16 "view the source" link in footer | Include, pointing at `github.com/seanwinslow/sw-portfolio`. Comprehension-first thesis is undermined by hiding the portfolio's own source. | Sean doesn't want the portfolio repo public at crossover |
| OPEN-5 | §16 email constant | `sean@seanwinslow.com`. The chrome footer + `/contact/` + every `mailto:` link reads from this one constant. | Sean prefers `sean.winslow28@gmail.com` per personal env, or a separate portfolio-inbound alias — one-character edit later |

### 4.9 PMP §10 cross-cutting open decisions

PMP §10 items #1, #2, #6 are RESOLVED and excluded here. The remaining open items:

| # | Decision | PMP-recommended default |
|---|---|---|
| #3 | Dark mode in V1? | Hero spec ships light-mode only with a manual footer toggle. Time-of-day auto-switch (D5) is deferred to v2. Site chrome spec §8.5 confirms: home hero stays light-only even when dark mode is toggled; sub-pages render in dark mode normally. **Confirm light-only home-hero is acceptable for launch.** |
| #4 | The Block case study framing | ARCHIVED status locked. Case-study content must "frame the work, not the exit" — needs a careful first draft. Larry Cermak is the primary reference. (Dovetails with case-study spec §13.4 OPEN.) |
| #5 | 16BitFit case study | PAUSED status locked. Case study leans on the pipeline, not a finished game. **Confirm there's enough shippable artifact material.** (Dovetails with case-study spec §13.5 OPEN.) |
| #7 | Global nav shape | **Default: all five as siblings** (`work`, `transactions`, `architecture`, `essays`, `about`). Switch only if user-testing on the live build shows the nav reads as cluttered — nest `architecture` and `essays` under a `writing` parent or surface them through `/transactions/` filtering. (Site chrome spec §2.1 honors the default.) |
| #8 | Tile media for A-3 | **Default: 90-sec Loom poster** (terminal showing `npm install` resolving + Claude Desktop loading the server). Fallback: npm registry screenshot or MCP protocol diagram with `SHIPPED 2026-05-12` stamp. Pick at tile-build time based on which reads better at 400×500px. |
| #9 | Crossover sequencing | **Default: hard cutover** — preserves the "first 5 seconds feel handmade" impression that progressive launch would dilute. Switch only if a hot recruiter loop in Week 4-5 needs a single new artifact surfaced before the full redesign is DoD-green. |

---

## 5. Pre-build punch list

Concrete prereqs that must close before code is written.

**Spec-level (must close at lock):**

1. **PENDING ADDITIVE — fold in before build session #1:** Apply [`architecture-spec-v1.md`](architecture-spec-v1.md) §14.1's required additive to [`transactions-spec-v1.md`](transactions-spec-v1.md) §3.2 — add `relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional()` as an optional field on the transactions schema. Purely additive (no removals, no renames); the locked spec's behavior on MDX files lacking the field is unchanged. Architecture spec §14.1 suggests folding as a 2026-05-17 changelog entry into transactions spec after `/architecture/` is locked.

2. **`[CONTRADICTION: MCP embed URL]`** — Hero spec §14 lists the MCP server interactive embed (E2) as living at `/transactions/intent-engineering-mcp`. Case-study spec §13.3 and PMP §7 both place the embed at `/work/intent-engineering-mcp` (it's the A-3 tile's case-study route). Hero spec is dated 2026-05-13 (pre-IA-reshuffle); case-study + PMP are dated 2026-05-17 (post-reshuffle). The case-study route is the canonical destination at scale, but the locked hero spec carries the older URL. Sean adjudicates: confirm `/work/intent-engineering-mcp` and either patch hero §14's out-of-scope line as a 2026-05-17 changelog entry or leave the hero spec's note in place as a historical artifact (the page itself doesn't link there — §14 is out-of-scope content). Either resolution preserves the locked hero spec body.

3. Lock the 6 drafted specs (case-study, about, transactions, architecture, essays, site-chrome). Hero + projects are locked already.

**Asset-level (must exist before the relevant build phase fires):**

4. **Hero character lane** — `hero-loop.webm` rendered (already done, 378KB at `sw-portfolio-animation-2026/loop-3-hero-shoulder/loop-3-video/sean-typing-at-desk-hero-transparent.webm`). Copy/rename to `/public/assets/character/hero-loop.webm` at scaffold time. Export `hero-loop-poster.webp` from frame 1 (~30KB target).

5. **Animation-pipeline case study hero media** — `character.webm` (9.2s, 220 frames, `sw-portfolio-animation-2026/Portfolio-BG-removal/BG-Removed/character.webm`) moves to `/work/animation-pipeline` as its hero media.

6. **About page character** — `about-full-body.png` authored via Seedream 2.0 from anchor sheets in `sw-portfolio-animation-2026/anchor-images/`. Sean alone, full-body, no AI companion (about spec OPEN-1 default). ≤800KB, 2x retina source.

7. **Saturday morning canon cels** — 6 pencil-test studies. Per about spec OPEN-4 Path C: Sean draws 2-3 by hand (locks visual language); Seedream backfills the remaining 3-4. Land at `src/assets/cartoons/<name>-study.png`.

8. **Five About B-N heading SVGs** — `b1-how-i-got-here.svg`, `b2-why-pm.svg`, `b3-saturday-morning-canon.svg`, `b4-where-im-going.svg`, `b5-proof-points.svg`. Per about spec OPEN-6: Path A (hand-drawn + scanned) or Path B (Seedream); Path C (Caveat font) discouraged.

9. **Handwritten signature SVG** for About page closeout (about spec §6 motion timeline — `stroke-dasharray` reveal).

10. **Kid-drawing scan margin artifact** — one per page, B-1 left-column margin (about spec §14 vocabulary 5).

11. **`/public/og-default.png`** (1200×630) — wordmark + hero tagline, manually authored or placeholder (site chrome spec §12.2).

12. **Per-page OG cards** — `/public/og-cards/vault-scorecard.png` + `/public/og-cards/vault-knowledge-mcp.png` + `/public/og-cards/essays/meaning-over-access.png`. Static PNG authored per page; satori auto-generation is v2 (architecture spec §17 + essays spec §18).

13. **Favicon set** — `favicon.svg` + `favicon.ico` + `apple-touch-icon.png` in `/public/` (site chrome spec Appendix A).

**Upstream `EXPLANATION.md` files (gate canonical-source fetch):**

14. **Already committed at PMP §0.5 reference point (5 files):** intent-engineering MCP, vault-synthesizer eval suite, substack-drafter (gate-b-drafts), Phase D typed reasoning edges, Phase 6 knowledge loop. These carry forward at crossover via the migration script.

15. **Must ship upstream before their consumer surface builds:**
    - `animation-pipeline/EXPLANATION.md` — case-study spec §13.1 OPEN (location TBD; default: in superuser-pack repo)
    - `superuser-pack/EXPLANATION.md` — case-study spec §13.2 (in `~/Code-Brain/claude-code-superuser-pack/`)
    - `intent-engineering-mcp/EXPLANATION.md` — case-study spec §13.3 (in the intent-engineering-mcp repo)
    - `VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md` — architecture spec Appendix B (Task 15, ships 6/3, in superuser-pack `docs/`)
    - `MEANING_OVER_ACCESS_EXPLANATION.md` — essays spec Appendix B (Task 13, draft-locks 5/22, publish ~6/19)
    - Plus the long-form essay sources at `VAULT_AS_AGENT_INFRASTRUCTURE.md` (architecture) + `MEANING_OVER_ACCESS.md` (essays) — fetched at build via `fetch_canonical_sources.mjs`

16. **Fallback path (case-study spec §9.2 Option B):** `the-block.mdx` + `16bitfit.mdx` use `four_q:` frontmatter mirror initially — Sean writes the 4Q content directly in MDX frontmatter for v1. Co-located `EXPLANATION.md` follows when the work earns one.

**Runtime / infra:**

17. **Daily Driver agent extension** — write 3 new JSON endpoints (`next-piece.json`, `about-pulse.json`, `shipped-stats-intent-engineering-mcp.json`) alongside the existing `dateline.json`. Extend the morning agent's filesystem-read step to scan `src/content/transactions/*.md` for the `ledger_row` pattern body.

18. **`scripts/migrate_v3_transactions.mjs` is run once at crossover** with Sean interactively confirming each row's ISO date + surface mapping + methods array. Migration outputs committed; script deleted.

19. **`.cache/canonical-sources.lockfile`** initialized empty before first build (ETag cache for `fetch_canonical_sources.mjs`).

20. **`astro-mermaid` integration** installed + configured with the 5-var palette override (architecture spec §9.2 + essays spec §8.2 share the integration).

21. **`@astrojs/sitemap`** + `@astrojs/rss` installed; `robots.txt` at `/public/robots.txt`.

---

## 6. Build sequence

Inherits PMP §9. Layered with per-spec dependencies discovered during the spec sprint.

### Phase 0 — Reconcile & Prep

PMP §9 Phase 0 items, complete or pending:

- ✅ Animation reconcile (PMP §8.1, resolved 2026-05-16)
- ✅ Hero loop rendered (94 frames, 3.917s, 378KB, prototype-validated)
- ✅ Hero composition prototype-validated at 1024×576 / `right: -180px` / `bottom: 80px`
- ☐ Copy `hero-loop.webm` to `/public/assets/character/`
- ☐ Export `hero-loop-poster.webp` from frame 1
- ☐ Move `character.webm` to `/work/animation-pipeline` as case-study hero media
- ☐ Fold in the pending `relatedArchitecture` additive to transactions spec §3.2
- ☐ Asset authoring (punch list items 6-13)
- ☐ Site-wide foundations consolidation (color tokens, torn-paper SVG, cursor, status-pill vocabulary, status-driven CSS custom property `--page-status-desat`)

### Phase 1 — Lock the remaining surface specs

- ☐ Lock case-study spec
- ☐ Lock about spec
- ☐ Lock transactions spec
- ☐ Lock architecture spec
- ☐ Lock essays spec
- ☐ Lock site-chrome spec
- ☐ Apply the flagged additive (`relatedArchitecture`) after locks land

### Phase 2 — Build: foundations + hero + projects

- ☐ Astro 5 scaffold + Tailwind 4
- ☐ Newsreader + JetBrains Mono via Google Fonts (`astro-google-fonts-optimizer` per hero spec §13)
- ☐ `src/lib/site.ts` constants module (site chrome §11) — wired before any chrome component imports
- ☐ `BaseLayout.astro` skeleton with `noChrome` prop + meta-tag rendering + RSS auto-discovery (site chrome §12)
- ☐ `<SiteFooter />` (site chrome §7) — renders on home + every other page, so it's the BaseLayout's only mandatory chrome in Phase 2
- ☐ `<ThemeToggle />` + theme cookie + inline FOUC-prevention script (site chrome §8)
- ☐ Hero (hero spec Appendix B hand-off prompt)
- ☐ Projects section (projects spec Appendix C hand-off prompt)
- ☐ Re-run 24-hour recall test on the live build (hero spec §15 DoD #10)

**Phase 2 ships a working home page** (hero + projects + footer) without the sub-page chrome — enough to validate the 5-second recall test before investing in the sub-page surfaces.

### Phase 3 — Build: narrative + catalog surfaces

The dependency order matters here. Case-study + transactions share `<FourQBlock />` and `<MethodsStrip />` + `fetch_canonical_sources.mjs`; architecture + essays depend on both being in place; about depends on the annotation library being mature.

- ☐ Implement `scripts/fetch_canonical_sources.mjs` (canonical 4Q fetcher, ETag-cached)
- ☐ Implement `scripts/validate_content.mjs` (unified validator across 4 collections)
- ☐ Implement `scripts/derive_crosslinks.mjs` (4-way bidirectional graph derivation)
- ☐ Implement `scripts/validate_about.mjs` (lead-line byte-match assertion)
- ☐ `<SiteNav />` + skip link (site chrome §6) — needed before any sub-page renders
- ☐ Build `<FourQBlock />` + `<MethodsStrip />` + `<Annotation />` shared components (case-study spec is the canonical source for all three)
- ☐ Build 4 artifact MDX components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) (case-study spec §7.2)
- ☐ 5 MDX case-study files (`animation-pipeline`, `superuser-pack`, `intent-engineering-mcp`, `the-block`, `16bitfit`) with frontmatter + opener prose + investigation board content
- ☐ `/work/[slug]` dynamic route + status-driven page-shape rendering (case-study spec §12 — 4 status behaviors)
- ☐ About page (single MDX at `src/content/about/index.mdx`) + B-3 cartoon canon content collection at `src/content/cartoons/`
- ☐ Run `scripts/migrate_v3_transactions.mjs` once at this point — interactively, with Sean confirming each row
- ☐ `/transactions/` index + per-surface SSG (`/transactions/<surface>/`) + `/transactions/<slug>/` deep-dive + RSS endpoint
- ☐ Install `astro-mermaid` + configure 5-var palette override
- ☐ `<Scoreboard />` + `<HonestNote />` + `<TryItYourself />` components (architecture spec §7-§10)
- ☐ `/architecture/` index + `/architecture/<slug>/` deep-dive + RSS — populate with Vault Scorecard (Task 15 ships 6/3) and follow with `vault-knowledge-mcp` (Task 10, ~6/4) and Control Architecture (Task 14, ~6/10, pending OPEN-1)
- ☐ `<QuadrantChart />` + `<QuadrantLegend />` + `<RoleMap />` + `<PlottedArtifacts />` components (essays spec §8-§10)
- ☐ `/essays/` index + `/essays/<slug>/` deep-dive + RSS — populate with the Access-vs-Meaning Manifesto (Task 13, draft-locks 5/22, publish ~6/19)
- ☐ `/contact/` minimal route + `/404.astro` (site chrome §9 + §10)

### Phase 4 — Live layer + launch

- ☐ Daily Driver agent endpoint writers wired (next-piece, about-pulse, shipped-stats per the 4 endpoints in §3.6)
- ☐ Footer link to `fleet.seanwinslow.com` confirmed live (Task 11 dashboard, code-complete 2026-05-17 evening)
- ☐ `@astrojs/sitemap` integration + `robots.txt`
- ☐ Print stylesheet (`@media print` in `src/styles/global.css`)
- ☐ Deploy to Vercel at `seanwinslow.com`
- ☐ Cloudflare DNS — orange-cloud OFF for Vercel records (Vercel owns edge + SSL)
- ☐ Hard cutover from V3 bridge to redesign at the same apex (PMP §10 Decision 9 default)
- ☐ V3 bridge cookie `sw-theme` continues to work (site chrome spec §8.3 honors the V3 cookie shape)
- ☐ Run the 24-hour recall test once more on the live production build
- ☐ Re-run the recruiter cold-read tests per spec DoD items (case-study DoD #13, transactions DoD #16, architecture DoD #18, essays DoD #19)
- ☐ MCP embed page (`/work/intent-engineering-mcp`) — embed is retrospective, post-ship, separate spec (PMP §7)

### Phase 5 (post-launch enhancements, all v2)

- Time-of-day auto-dark-mode (D5)
- Three-folder navigation (P3)
- Cross-surface View Transition morphs (ledger ↔ architecture, essay ↔ ledger ↔ architecture)
- Aggregated root RSS feed at `/rss.xml` (gated on `/essays/` having 2+ entries per ledger §10.4 + essays §12.2)
- Interactive `<MetricChart />` variant
- Per-surface RSS feeds (`/transactions/<surface>/rss.xml`)
- JSON Feed (`feed.json`)
- Year filter on `/transactions/` (gated on ledger >50 rows)
- Auto-generated OG cards via satori at build
- `prefers-color-scheme` auto-detect
- Home-page dark-mode hero (currently light-only per hero spec §14 + site chrome §8.5)
- Plausible analytics (single inline script in BaseLayout, no per-page events)

---

## 7. First build session hand-off

> **Open a Claude Code session at** `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. **Read this file first** (`docs/BLUEPRINT-COMPLETE.md`) — it points at everything else. Then read the 8 surface specs end-to-end in their numbered order (hero, projects-section, case-study, about, transactions, architecture, essays, site-chrome). Reference [`PORTFOLIO-MASTER-PLAN.md`](PORTFOLIO-MASTER-PLAN.md) for strategic context (especially §3 voice rules and §10 open decisions) and [`EXPLANATION-template.md`](../../claude-code-superuser-pack/vault/40_knowledge/templates/EXPLANATION-template.md) for the canonical 4Q contract every collection's deep-dive page renders. Before writing any code, fold in the pending additive flagged in this blueprint's §5 punch list item #1 — add `relatedArchitecture` as an optional field on `transactions-spec-v1.md` §3.2 per architecture-spec §14.1. Then proceed in phase order: Phase 0 asset prep → Phase 2 hero + projects (use the hero spec Appendix B + projects spec Appendix C hand-off prompts verbatim) → Phase 3 narrative + catalog surfaces in dependency order (foundations + scripts → case-study → about → transactions → architecture → essays → contact + 404) → Phase 4 launch. The three load-bearing things — character, voice, live layer — survive every phase. The template trap (design-system-viewer / luxury-minimal-PM) is the enemy. The HybridRouter is never framed as "Agent OS" or "runtime architecture" anywhere on the portfolio. Stop after each phase to validate the relevant DoD items on `localhost:4321` before opening the next phase.

---

*Drafted 2026-05-18 from the two-session spec sprint. Awaits Sean's lock. After lock, this file is the build session's first read.*
