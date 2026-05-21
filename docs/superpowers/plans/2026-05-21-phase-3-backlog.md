# Phase 3 Backlog — Sub-phases 3b · 3c · 3d

> **Purpose:** Stub the three sub-plans that follow Phase 3a (site-chrome completion). Each sub-plan is its own session — too much surface area to fit in one. This doc is the **hand-off** for the NEXT planning session: paste it into a fresh kickoff prompt and it provides enough context to invoke `superpowers:writing-plans` without re-reading the entire Phase 3 kickoff thread.
>
> **Source of truth:** [`docs/specs/BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 3 + the 4 surface specs cited per sub-phase below.
>
> **Baseline:** Phase 3a complete on branch `phase-2-foundations`. Each sub-phase below inherits the SiteNav + /404 + /contact shipped in Phase 3a.

---

## Phase 3 phasing rationale (locked 2026-05-21)

Phase 3 ships the 5 non-home surfaces. ~60–80 tasks across them — too large for one plan. Split into 3 sub-phases by what blocks what:

| Sub-phase | Why this order |
|---|---|
| **3a (done by end of this session's plan):** Site-chrome completion | Every other Phase 3 surface inherits the sticky top nav. Build the nav once; subsequent plans consume it. |
| **3b:** Case-study body for `/work/[slug]` | The 5 work tiles already link here; recruiters click these first. Highest-value surface after home. Establishes the `<FourQBlock />` + `<MethodsStrip />` + `<Annotation />` shared components that 3c reuses. |
| **3c:** `/transactions/` + `/architecture/` + `/essays/` (all three collection routes) | Structurally near-identical (index + slug + RSS feed each). Planning them together cuts per-surface overhead ~60% via shared route template + shared `<FourQBlock />` (built in 3b). |
| **3d:** `/about/` page body | Standalone surface; doesn't block anything else. Most decorative-heavy spec; v1 ships per about-spec §1.2 deferral table (no SVG headings, no annotations, no signature). Worth its own plan because the cartoon-cel grid + B-1 chromatic lane-tint timeline are content-heavy. |

After Phase 3 is done, Phase 4 (Daily Driver writers + Plausible + Vercel deploy + custom-domain DNS) ships the site to `seanwinslow.com` per [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6.

---

## Operating preferences carried forward

These apply to every Phase 3 sub-plan:

- **Direct controller execution by default.** Phase 2 / 2b / 3a defaulted to direct execution because `superpowers:subagent-driven-development` consistently hallucinated context constraints in the implementer subagent. Re-attempt subagents only if the harness has demonstrably improved between sub-phases.
- **Tasks small enough for one execution unit each.** 1–2 files, verbatim file contents in the plan body so the implementer doesn't need to think.
- **Atomic commits per task.** 30–60 incremental commits per sub-plan is the target shape.
- **No `git push` unless Sean explicitly asks.**
- **Visual verification at each section boundary** via Playwright MCP or `curl` + DOM inspection.
- **Continuous execution.** Don't pause between routine tasks; surface BLOCKED status only if genuinely stuck.
- **The template trap is the enemy.** Every component decision passes *"is this drifting toward the design-system-viewer or luxury-minimal-PM template?"* If yes, stop and reconsider against the spec.
- **Branch state.** Sean's standing rule is "Sean works on `main`" but Phase 2 / 2b / 3a accumulated on `phase-2-foundations`. Before each subsequent sub-phase, confirm whether to keep accumulating on the branch or fast-forward `main`. Do not switch branches without explicit confirmation.

---

## Phase 3b — Case-study body for `/work/[slug]`

### Scope summary

Replace the Phase 2 case-study stub at [`src/pages/work/[slug].astro`](../../../src/pages/work/[slug].astro) with the full case-study page per [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md). Six bands top-to-bottom: dateline strip → title block → hero media (View Transition target) → opener (3 paragraphs of Sedaris-coded Newsreader) → investigation board (4 artifacts with pencil annotations) → Methods strip → 4Q block (reads canonical `EXPLANATION.md` at build) → next/prev navigation.

**Status-driven page shape** is the non-obvious call: `ACTIVE` / `COMING` look default; `SHIPPED` gets a hand-drawn stamp + `<ShippedNow />` live install-count block; `PAUSED` gets a return-condition callout before the hero media; `ARCHIVED` gets a frame-the-work preamble + 50%-opacity right-margin accent.

**This sub-phase ships the page structure + MDX components + view transition only.** Authoring the 5 individual case studies (~1–2k words each, opener + investigation-board artifacts + Methods rows + 4Q content) is a **separate content-authoring task Sean owns post-plan.** Phase 3b can stop with placeholder MDX bodies and ship those bodies later without changing the page structure.

### Primary specs to read

1. [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) — sections §2 (anatomy), §3 (status-driven shape), §4 (typography deltas from hero), §7 (MDX artifact components), §8 (Methods strip), §9 (4Q block + canonical EXPLANATION.md contract), §10 (status behaviors), §11 (annotation vocabulary), §12 (next/prev), §13 (Definition of Done).
2. [`hero-spec-v1.md`](../../specs/hero-spec-v1.md) — inherited typography, color, cursor, dateline-strip primitive.
3. [`projects-section-spec-v1.md`](../../specs/projects-section-spec-v1.md) — status pill vocabulary + View Transition contract (the tile → page morph that lands on the case-study hero media).
4. [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.2 (shared components) + §3.3 (`scripts/fetch_canonical_sources.mjs`).

### Rough task count estimate

**~30–40 tasks** across these sections:

| Section | Tasks (estimate) | Notes |
|---|---|---|
| 0. Pre-flight (any Phase 3a carry-overs) | 1–2 | Likely none; Phase 3a closes them out |
| 1. Prebuild gate scripts (`fetch_canonical_sources.mjs` + `validate_content.mjs` + `derive_crosslinks.mjs`) | 4–6 | These are reused by Phase 3c — building them here pays dividends |
| 2. Shared component primitives (`<FourQBlock />`, `<MethodsStrip />`, `<Annotation />`) | 4–6 | Each component is its own file with a verbatim implementation |
| 3. Status-shape components (`<ShippedNow />`, `<ShippedStamp />`, `<PausedCallout />`, `<ArchivedPreamble />`) | 4 | One task per status branch |
| 4. MDX artifact components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) | 4 | Per case-study spec §7.2 |
| 5. Page shell (`src/pages/work/[slug].astro` rewrite) | 4–6 | dateline → title → hero media → opener → investigation board → Methods → 4Q → next/prev |
| 6. Next/prev navigation | 2 | A-N → A-(N+1) wrap-around |
| 7. View Transition continuity from tile → page → next case study | 2 | Cross-page transition via shared `view-transition-name` |
| 8. MDX content stubs for 5 case studies (placeholder bodies — real content authored by Sean post-plan) | 5 | One task per slug; minimal opener + frontmatter + 4Q block populated |
| 9. DoD verification (case-study spec §13 items 1–14) | 2 | Walk-through |

**Total:** ~32–37 tasks, ~30–60 commits.

### Key dependencies on Phase 3a

- `<SiteNav>` ships at the top of every `/work/<slug>/` page. (Done in 3a.)
- BaseLayout `noChrome={false}` behavior — case-study pages don't pass `noChrome`, so the nav renders. (Done in 3a.)
- The Phase 2 case-study stub at `src/pages/work/[slug].astro` becomes the *foundation* the Phase 3b rewrite extends — the `getStaticPaths()` block + the `view-transition-name: hero-media-<slug>` hook stay; the body below the hero media is replaced.

### Key dependencies on external work

- 5 case-study slugs need real `EXPLANATION.md` files in `~/Code-Brain/code-brain/vault/30_artifacts/<slug>/EXPLANATION.md` (or equivalent) for the canonical 4Q fetch to populate real content. If those files don't exist yet, Phase 3b can ship with the `four_q:` frontmatter mirror (Option B fallback) per case-study spec §9.2 — full prose authoring is a separate Sean task.

### Hand-off prompt to drop into a fresh session

> sw-ai-pm-portfolio — Phase 3b. Phase 3a (site-chrome) shipped on branch `phase-2-foundations` at HEAD `<sha-from-Phase-3a-completion>`. The sticky top nav + /404 + /contact + v1.1 polish carry-overs (hero floor-shadow + midway tossed-card rotation flip) are all in. Your job this session: write the Phase 3b implementation plan via `/writing-plans` for the full case-study body at `/work/[slug]`. Replaces the Phase 2 stub. ~30–40 tasks across 9 sections (prebuild scripts + shared components + status-shape components + MDX artifact components + page shell + next/prev + view transitions + MDX content stubs + DoD verification). Read [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) end-to-end + [`hero-spec-v1.md`](../../specs/hero-spec-v1.md) §4-§9 + [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.2 + §3.3. Default to direct controller execution; subagent dispatch has been unreliable through Phase 2 / 2b / 3a. Out of scope: real case-study content authoring (Sean owns post-plan), the 3 collection routes (Phase 3c), and `/about/` (Phase 3d). Stop after the plan + a Phase 3b-specific deferral table are written and committed.

---

## Phase 3c — Collection routes (`/transactions/` + `/architecture/` + `/essays/`)

### Scope summary

Three collection routes that share ~80% of their build: index page + per-slug deep-dive + RSS feed. Each one's deep-dive reuses the `<MethodsStrip />` + `<FourQBlock />` shipped in Phase 3b. Building them together (one plan, three collections) cuts per-surface overhead ~60% via a shared route template and a shared `<DatelineStrip />` / `<PullQuote />` / `<RssEndpoint />` set.

**Transactions** ([`transactions-spec-v1.md`](../../specs/transactions-spec-v1.md)) is the dense wire-service ledger — every shipped artifact across the agent fleet. Index page renders filter pills (ALL / fleet / pipeline / product / writing / infra). Deep-dive renders Methods + 4Q from canonical `EXPLANATION.md`.

**Architecture** ([`architecture-spec-v1.md`](../../specs/architecture-spec-v1.md)) is the most austere voice register — sober throughout, with mono `HONEST NOTE` callouts breaking through. Flat-equality scoreboard rendering (no row highlight for Sean's vault). Mermaid diagrams via `astro-mermaid` integration.

**Essays** ([`essays-spec-v1.md`](../../specs/essays-spec-v1.md)) is the sober-middle, personal-voice-bookended register (PMP §3.3). Opening hook + closing kicker carry Sean's voice; the analytical middle stays sober. Cross-link graph closes here: `plottedArtifacts: [...]` auto-reverse-renders "← named in: [essay title]" on every cited ledger row + architecture writeup.

**Migration:** `scripts/migrate_v3_transactions.mjs` runs once at this point (interactive, Sean confirms each row), then is deleted. Pulls ~2-5 V3-bridge transactions into the new schema.

### Primary specs to read

1. [`transactions-spec-v1.md`](../../specs/transactions-spec-v1.md) — full spec; §3.2 is the canonical schema.
2. [`architecture-spec-v1.md`](../../specs/architecture-spec-v1.md) — full spec; §7-§10 components; §11.1 build scripts.
3. [`essays-spec-v1.md`](../../specs/essays-spec-v1.md) — full spec; §8-§10 components; §11.1 build script consolidation.
4. [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) §8 + §9 + §15 — re-read for `<MethodsStrip />` + `<FourQBlock />` + `fetch_canonical_sources.mjs` contract.
5. [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.1 (4-collection content graph) + §3.3 (shared build scripts) + §3.4 (voice register by surface).

### Rough task count estimate

**~40–50 tasks** across these sections:

| Section | Tasks (estimate) | Notes |
|---|---|---|
| 0. Pre-flight (Phase 3b carry-overs, if any) | 1–2 |  |
| 1. V3 migration (`scripts/migrate_v3_transactions.mjs` — interactive one-shot) | 2–3 | Run + commit + delete script |
| 2. Content collection schemas (`transactions` + `architecture` + `essays`) | 3 | One per collection in `src/content/config.ts` |
| 3. Shared collection-route primitives (`<CollectionDateline />`, `<RssLink />`, `<FilterPills />`) | 3–4 |  |
| 4. Transactions surface (`/transactions/` + `/transactions/<surface>/` + `/transactions/<slug>/` + `rss.xml`) | 7–9 |  |
| 5. Architecture-specific components (`<Scoreboard />`, `<HonestNote />`, `<TryItYourself />`) + `astro-mermaid` integration | 4–6 |  |
| 6. Architecture surface (`/architecture/` + `/architecture/<slug>/` + `rss.xml`) | 4–5 |  |
| 7. Essays-specific components (`<QuadrantChart />`, `<QuadrantLegend />`, `<RoleMap />`, `<PlottedArtifacts />`) | 4–5 |  |
| 8. Essays surface (`/essays/` + `/essays/<slug>/` + `rss.xml`) | 4–5 |  |
| 9. Cross-link derivation (`scripts/derive_crosslinks.mjs` extended) | 2 | Already partial from 3b |
| 10. Content stubs (placeholder MDX for each collection — real bodies authored by Sean post-plan) | 3–5 |  |
| 11. DoD verification (transactions §16 + architecture §18 + essays §19 walk-throughs) | 3 |  |

**Total:** ~40–47 tasks, ~50–70 commits. **Largest sub-phase by surface area.** If it feels overwhelming, consider splitting transactions out from architecture+essays (3c.1 transactions; 3c.2 architecture + essays).

### Key dependencies on Phase 3b

- `<FourQBlock />` component (Phase 3b §2) is reused on transactions deep-dive + architecture deep-dive + essays deep-dive.
- `<MethodsStrip />` component (Phase 3b §2) is reused on transactions deep-dive + architecture deep-dive.
- `scripts/fetch_canonical_sources.mjs` (Phase 3b §1) is **extended** in Phase 3c to also walk the `architecture` + `essays` collections (per essays spec §11.1 consolidation rule).
- `scripts/validate_content.mjs` (Phase 3b §1) is **extended** in Phase 3c to cover `transactions` + `architecture` + `essays` schemas.

### Key dependencies on Phase 3a

- `<SiteNav>` highlights the right tab on each route via the `aria-current="page"` rule. Already wired in 3a — no action.

### Hand-off prompt to drop into a fresh session

> sw-ai-pm-portfolio — Phase 3c. Phases 3a + 3b shipped on branch `phase-2-foundations`. Site-chrome + case-study body are both in. Your job this session: write the Phase 3c implementation plan via `/writing-plans` for the three collection routes (`/transactions/` + `/architecture/` + `/essays/`) — each with index + per-slug deep-dive + RSS feed. ~40–50 tasks across 11 sections. The three routes share ~80% of their build via the shared `<MethodsStrip />` + `<FourQBlock />` from Phase 3b + a new shared collection-route template. Read [`transactions-spec-v1.md`](../../specs/transactions-spec-v1.md) + [`architecture-spec-v1.md`](../../specs/architecture-spec-v1.md) + [`essays-spec-v1.md`](../../specs/essays-spec-v1.md) end-to-end + [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.1 + §3.3 + §3.4. Includes the one-shot `scripts/migrate_v3_transactions.mjs` run (interactive — Sean confirms each row) followed by deleting the script. Default to direct controller execution. Out of scope: real collection content authoring (Sean owns post-plan), `/about/` (Phase 3d). If 40+ tasks feels too large, propose splitting into 3c.1 transactions + 3c.2 architecture+essays and proceed. Stop after the plan is written and committed.

---

## Phase 3d — About page body

### Scope summary

The `/about/` page per [`about-spec-v1.md`](../../specs/about-spec-v1.md) — the most decorative-heavy spec but with §1.2 v1 deferrals that simplify the build substantially. v1 ships:

- Header (Newsreader): "Raised by Saturday morning cartoons and Vercel deployment logs."
- Daily-dated pulse strip (reads `about-pulse.json` at build, same pattern Phase 2b's AboutTeaser used)
- **B-1: How I got here** — single-column stacked beats with chromatic lane-tint rule (warm amber for animator-coded beats, teal for PM-coded, blended for braided ones). Per about-spec §9.
- **B-2: Why PM** — short essay register, Newsreader weight 300. Per about-spec §10.
- **B-3: Saturday morning canon** — 6 cartoon cels in a grid (Tommy Pickles · Ash Ketchum · Rocko · Samurai Jack `break_grid:true` · Uncle Iroh · Jake the Dog). Each cel maps to a product/craft principle. Per about-spec §11.
- **B-4: Where I'm going** — "What I'm building toward" 2-paragraph direction-of-craft, with `CURRENTLY @ FREE AGENT` (or `<COMPANY>`) mono stamp top-right. Italic call-out renders only when `available: true`. Per about-spec §12.
- **B-5: Proof points** — links into ledger / architecture / essays / case studies. Per about-spec §13.
- Pull quote at page foot. Per about-spec §15.

**v1 deferrals (NOT in scope):** 5 hand-drawn B-N heading SVGs (use plain Newsreader headings), handwritten signature SVG, registration marks, all pencil-margin annotations (with one exception: the B-3 `break_grid: true` cel-emphasis behavior is preserved — that's geometry, not annotation), kid-drawing scan margin artifact.

### Primary specs to read

1. [`about-spec-v1.md`](../../specs/about-spec-v1.md) — full spec; §1.2 deferral table is the v1 scope filter.
2. [`home-about-teaser-spec-v1.md`](../../specs/home-about-teaser-spec-v1.md) — the home teaser's CTA links here. Plus the §784 photo-exception amendment from Phase 2b.
3. [`hero-spec-v1.md`](../../specs/hero-spec-v1.md) — typography + color inherited.
4. [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) §11 — annotation vocabulary (deferred for v1 but worth understanding the future-state).

### Rough task count estimate

**~20–28 tasks** across these sections:

| Section | Tasks (estimate) | Notes |
|---|---|---|
| 0. Pre-flight (Phase 3b/3c carry-overs, if any) | 1 |  |
| 1. About content collection schema + MDX shell | 2 | `src/content/about/index.mdx` with frontmatter |
| 2. About-pulse strip integration (reuse from Phase 2b's pattern) | 1 | Reads same `about-pulse.json` |
| 3. B-1 stacked-beats component (`<BeatRow />` + `<LaneRule />` per about-spec §16) | 3–4 | Chromatic lane-tint is structural |
| 4. B-3 cartoon-cel grid + cels content collection (6 cels from `reference-images/about-cartoons/`) | 4–5 | `break_grid:true` on Samurai Jack |
| 5. B-4 "CURRENTLY @" stamp + "What I'm building toward" prose block | 2 | Stamp driven by frontmatter `available` + `current_company` |
| 6. B-5 proof-points cross-links (reads cross-link graph from Phase 3c's `derive_crosslinks.mjs` output) | 2 |  |
| 7. Page shell (`src/pages/about/index.astro`) | 2 | Composes B-1 → B-2 → B-3 → B-4 → B-5 |
| 8. `scripts/validate_about.mjs` (lead-line byte-match assertion per blueprint §3.3) | 1 |  |
| 9. DoD verification (about-spec §17 walk-through, scoped to v1 items only per §1.2) | 1–2 |  |

**Total:** ~20–25 tasks, ~25–40 commits.

### Key dependencies on Phase 3a

- `<SiteNav>` renders at top with ABOUT tab active. Already wired in 3a — no action.

### Key dependencies on Phase 3b

- None — about page doesn't reuse case-study components.

### Key dependencies on Phase 3c

- B-5 proof-points reads from the cross-link graph derived in Phase 3c's `scripts/derive_crosslinks.mjs`. If 3c hasn't shipped yet, B-5 can fall back to a hardcoded list of links to known artifacts; the cross-link auto-derivation lands when 3c completes.

### Key dependencies on Phase 2b

- About teaser CTA at `/` already links to `/about/` (currently 404s — Phase 3d resolves this).
- The home-about-teaser shows the **photo** card alongside 9 stylized variations — per about-spec §784 amendment (logged in Phase 2b's plan), this is the **deliberate exception** to the "no photo on the about page itself" rule. About page proper does **not** show a photo.

### Hand-off prompt to drop into a fresh session

> sw-ai-pm-portfolio — Phase 3d. Phases 3a + 3b + 3c shipped on branch `phase-2-foundations`. Site-chrome + case-study + 3 collection routes are all in. Your job this session: write the Phase 3d implementation plan via `/writing-plans` for the `/about/` page body. ~20–28 tasks across 9 sections. Read [`about-spec-v1.md`](../../specs/about-spec-v1.md) end-to-end — **§1.2 deferral table is the v1 scope filter** (defers 5 SVG headings, signature SVG, registration marks, all pencil annotations, kid-drawing artifact). What ships: header lead-line, daily pulse strip, B-1 single-column stacked beats with chromatic lane-tint rule, B-2 short essay, B-3 6 cartoon cels (with Samurai Jack `break_grid:true`), B-4 CURRENTLY @ stamp + 2-paragraph direction-of-craft, B-5 proof-points cross-links, pull quote. Default to direct controller execution. The B-5 proof-points reads from the cross-link graph derived in Phase 3c; if 3c isn't shipped, fall back to a hardcoded list. Stop after the plan is written and committed.

---

## After Phase 3d ships

Phase 4 starts: Daily Driver agent endpoint writers, Plausible, Vercel deploy, custom-domain DNS, hard cutover from V3 bridge. Per [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4.

If `phase-2-foundations` branch was kept all the way through Phase 3, this is the natural fast-forward-to-`main` point — a single PR or merge consolidates Phases 2 + 2b + 3a + 3b + 3c + 3d into `main`, then Phase 4's deploy work begins on `main`.

---

*Drafted 2026-05-21 from the Phase 3 kickoff prompt. Each sub-phase's "hand-off prompt" section is self-contained — paste into a fresh session and the next planner has full context.*
