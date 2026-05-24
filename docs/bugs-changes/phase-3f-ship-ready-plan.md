---
phase: 3F
title: Ship-Ready Action Plan
status: ACTIVE
created: 2026-05-23
author: Sean Winslow (planning), Claude Opus 4.7 (drafting)
source: /impeccable critique 2026-05-23 — combined Assessment A (strategic + aesthetic) + Assessment B (spec compliance + tech audit), score 30/40
---

# Phase 3F — Ship-Ready Action Plan

## Why this exists

The 2026-05-23 `/impeccable critique` returned **30/40** on Nielsen's heuristics with **four P0 ship-blockers** and a clear recruiter-test verdict:

> *Passes the 5-second test. Fails the 30-second test. Doesn't reach the 2-minute test.*

The home hero is doing recruiter-grade work. The case-study clickthrough is where the funnel breaks. Four P0s away from "this guy has taste, we need to talk to him immediately."

Sean's decisions on the four scoping questions:

| # | Question | Answer |
|---|---|---|
| 1 | Sequencing | **Pass A first, then Pass B.** Stop the bleeding, then fix the funnel. |
| 2 | Case studies | **Author all 5.** Not one finished + four `COMING`. |
| 3 | Daily Driver | **Refresh today's data.** Manual write — fleet missed its 08:30 fire because of last night's power outage. |
| 4 | Project tile media | **Author all 4 missing tiles.** Open: which skill / style direction. Brainstorm after this doc lands. |

---

## Pass A — Stop the bleeding (TODAY)

Four moves. Closes all four P0s. After this pass, the site is shippable. Pass B + C are quality bars on top.

### A1 — Fix `Cursor.tsx` React island

**P0 · engineering · ~30–60 min**

**Problem.** Home page throws 7 console errors on load. Stack: `Invalid hook call. Hooks can only be called inside of the body of a function component...` (×6) + `TypeError: Cannot read properties of null (reading 'useRef') at Cursor (src/components/Cursor.tsx:25:21)`. Two React copies in the bundle. Marcus (VP Eng persona) opens devtools, sees red, stops reading.

**Files.**
- [src/components/Cursor.tsx](src/components/Cursor.tsx)
- [astro.config.mjs](astro.config.mjs) — verify single React adapter resolution
- Built output: [dist/_astro/Cursor.CYOv-RE7.js](dist/_astro/Cursor.CYOv-RE7.js) once built

**Fix path.**
1. Verify the island's `client:*` directive in the parent template (likely [src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) or [src/pages/index.astro](src/pages/index.astro)). Should be `client:idle` or `client:load`, never SSR.
2. Run `npm ls react` and `npm ls react-dom` — confirm only one instance per tree.
3. If a second React is being pulled by a transitive dep, add `optimizeDeps.dedupe` for `react` + `react-dom` in `astro.config.mjs` Vite config.
4. Rebuild, reload, verify console is clean.
5. If still failing: replace `Cursor.tsx` with a plain `<canvas>` + vanilla TS implementation. The cursor effect doesn't need React.

**Acceptance.** Zero console errors on `/` desktop + mobile. Verified via Playwright `browser_console_messages` returning empty `errors` array.

**Suggested skill.** `superpowers:systematic-debugging` (four-phase root cause). Possibly `vercel:react-best-practices` for the dedupe pattern.

---

### A2 — Strip every `[PLACEHOLDER]` marker from production HTML

**P0 · content · biggest time sink in the plan**

**Inventory (verified via grep 2026-05-23).**

| File | Placeholder count | Surface |
|---|---:|---|
| [src/content/work/intent-engineering-mcp.mdx](src/content/work/intent-engineering-mcp.mdx) | ~9 | A-3 case study |
| [src/content/work/the-block.mdx](src/content/work/the-block.mdx) | ~10 | A-4 case study |
| [src/content/work/16bitfit.mdx](src/content/work/16bitfit.mdx) | 15 | A-5 case study |
| [src/content/work/code-brain.mdx](src/content/work/code-brain.mdx) | 14 | A-2 case study |
| [src/content/work/animation-pipeline.mdx](src/content/work/animation-pipeline.mdx) | 13 | A-1 case study |
| [src/content/transactions/vault-knowledge-mcp.mdx](src/content/transactions/vault-knowledge-mcp.mdx) | ~3 | ledger Q2/Q3/Q4 |
| [src/content/transactions/intent-engineering-mcp.mdx](src/content/transactions/intent-engineering-mcp.mdx) | ~3 | ledger Q2/Q3/Q4 |
| [src/content/transactions/phase-d-typed-edges.mdx](src/content/transactions/phase-d-typed-edges.mdx) | ~3 | ledger Q2/Q3/Q4 |
| [src/content/about/index.mdx](src/content/about/index.mdx) | 2 | §B-2, §B-4 |
| **Total** | **~72** | **9 files** |

**Fix path.** Two phases.

**Phase A2.a — Author all 5 case studies (the big lift).**
- Approach per case study (consistent across all 5):
  1. Open the MDX. Read the existing placeholder copy — every placeholder already contains a *prompt-to-self* describing what the real paragraph should say. That's the brief. The voice-mode skill is the calibrator.
  2. Invoke `.claude/skills/writing-voice-modes` in **Sedaris (Domestic Observer)** register for the case-study opener + caption prose. The voice is calibrated against this skill, not invented.
  3. For the four-Q block (`what` / `why` / `break` / `learn`): **declarative-thesis register** (essays middle-section), not Sedaris. The four-Q is wire-service-adjacent — short, specific, no comedic juxtaposition.
  4. For investigation-board artifact excerpts + captions: keep them **terse**. One sentence. Mono register if anything.
  5. Voice constraints (load-bearing, drawn from PRODUCT.md §3.3 + master plan §3.3):
     - Specific nouns ("Saturday morning cartoons", "Vercel deployment logs"), not generic ones.
     - No em dashes outside dateline / methods strip / wire-service surfaces.
     - No timeline framing of the two selves (no "ten years of cartoons, six months of PRDs").
     - Parallel-lineage rule: both halves co-present, never before/after.
  6. **Ship-test each case study independently** — render it locally, read it cold, run `bmad-editorial-review-prose` on the resulting MDX.

- **Order of authoring** (highest-impact first — match the recruiter's likely click path):
  1. **A-3 Intent Engineering MCP** (SHIPPED, most visible tile, the one Riya clicks first).
  2. **A-2 Code Brain** (the agent-fleet positioning — load-bearing for "I ship with an agent fleet").
  3. **A-1 Animation Pipeline** (the creative-PM lineage — load-bearing for "raised by Saturday morning cartoons").
  4. **A-4 The Block — Campus + RevOps** (the institutional-PM credibility).
  5. **A-5 16BitFit Battle Mode** (the side-project surface — least time-sensitive).

- **Estimate.** ~45–90 min per case study at Sedaris-tuned quality. ~4–7 hours total. Heaviest item in the plan. Worth a whole work session.

**Phase A2.b — Resolve transaction-row + about placeholders.**
- 3 transactions files × Q2/Q3/Q4 block per file: ~9 short answers. Declarative-thesis register, ~30 min total.
- 2 about paragraphs: Sedaris register, ~20 min total.

**Acceptance.** `grep -r "PLACEHOLDER" src/content/ src/pages/` returns zero matches. Run `bmad-editorial-review-prose` against each rewritten MDX before commit.

**Suggested skill chain.** `.claude/skills/writing-voice-modes` → `bmad-editorial-review-prose` → `bmad-editorial-review-structure` (only if a beat moves).

---

### A3 — Refresh today's daily-dated JSON

**P0 · data · 15 min**

**Problem.** All three `/public/api/*.json` carry `updated_at: 2026-05-21T08:45:00-04:00`. Today is May 23. Home dateline shows MAY 21 while sub-page datelines compute MAY 23 (different code paths). The site's load-bearing differentiator is currently "real and stale."

**Source.** [`/Users/seanwinslow/Code-Brain/code-brain/vault/10_timeline/daily/2026-05-23.md`](/Users/seanwinslow/Code-Brain/code-brain/vault/10_timeline/daily/2026-05-23.md) — Sean wrote today's daily note manually after the power outage prevented the Daily Driver fire. Real, dated, honest content.

**Today's signal (extracted from the daily note):**

- **Win:** First real `vault_critic` production run shipped end-to-end. 3 expansion files (token-waste, comprehension-audit, daily-note-generation). Codex (gpt-5.5) + Anti-Gravity (gemini-3.1-pro-preview) outputs complementary, both source-anchored.
- **Infra shipped:** LM Studio model reload + MBP IP-drift patch (`192.168.68.50` hardcoded → `seans-macbook-pro.local` mDNS). Two `config.toml` edits.
- **Fleet outage:** 02:00–09:30 (power), all overnight + 08:30 fires missed. Manual catch-up ran end-to-end this session.
- **Pipeline numbers (today's manual rerun):** indexer 1472 chunks · synthesizer 42 concepts / 29 connections / 43 edges / 26 rejected by Tier 1.5 · critic 3 expansion files in 113s.

**Files to update.**

- [public/api/dateline.json](public/api/dateline.json) — replace with today:
  ```json
  {
    "date_iso": "2026-05-23",
    "date_display": "BOSTON, MAY 23, 2026",
    "pattern": "fleet_pulse",
    "body": "power outage killed the overnight fleet. manual catchup ran indexer + synth + critic end-to-end. first real vault critic shipped 3 expansions. mbp ip drift patched to mdns.",
    "updated_at": "2026-05-23T16:38:00-04:00"
  }
  ```

- [public/api/about-pulse.json](public/api/about-pulse.json) — replace with today's counts (verify from `git log --since="2026-05-23 00:00"` + daily note):
  ```json
  {
    "date_iso": "2026-05-23",
    "items": [
      { "type": "commits", "count": <N>, "label": "<N> commits" },
      { "type": "agent_runs", "count": 3, "label": "3 manual catchup runs" },
      { "type": "concepts", "count": 42, "label": "42 concepts synthesized" },
      { "type": "expansions", "count": 3, "label": "3 critic expansions" },
      { "type": "infra_fixes", "count": 2, "label": "2 infra fixes" }
    ],
    "updated_at": "2026-05-23T16:38:00-04:00"
  }
  ```
  *(Verify schema against `src/components/home/AboutTeaser.astro` consumer before commit — if it expects specific `type` enums, align.)*

- [public/api/next-piece.json](public/api/next-piece.json) — re-aim at the next real ship. Two options:
  - **Option A (conservative):** keep `title: "Vault Scorecard"`, bump `date_target` to a real near-term ship (June 4 per `vault-knowledge-mcp` ledger row).
  - **Option B (this plan):** point at the portfolio launch itself. `title: "seanwinslow.com v5 launch"`, `date_target: "2026-05-26"` (or whenever Pass C closes). Recursive honesty — the portfolio is itself the next piece.

- [public/api/shipped-stats-intent-engineering-mcp.json](public/api/shipped-stats-intent-engineering-mcp.json) — if it carries `updated_at`, bump to today. Stats values stay accurate.

**Provocative alternative (raised in critique §Provocative Questions).** Instead of papering over the off-day, surface it. `BOSTON, MAY 23, 2026 — daily driver paused (sat power). 02:00 fires missed. manual catchup at 15:28 ran indexer + synth + critic.` This matches the "real and dated, not streaming" framing better and proves the fleet is honest about its cadence. **Sean to decide tone before commit.**

**Wire the cron going forward.** The plists currently lack `RunAtLoad` fallback — the daily note's morning focus flags this as a decision needed. Out of scope for Pass A but worth tracking. If the user wants the daily driver to NEVER again miss a fire after a power-off, the `RunAtLoad=true` + idempotency-guard path is the answer (estimate ~30 min per the daily note).

**Acceptance.**
- All three JSONs carry `"date_iso": "2026-05-23"`.
- Home dateline strip shows MAY 23, 2026.
- About teaser pulse strip shows today's counts.
- No date mismatch across home / sub-pages.

**Suggested skill.** Direct write, no skill needed. `update-config` only if we wire cron.

---

### A4 — (Pass A wrap) Verify + commit

**~15 min**

1. `npm run build` — confirm clean (currently passes with 1.9 MB diagram-lib warning; that's Pass C).
2. Spot-check `/`, `/work/<each-slug>`, `/about/`, `/transactions/<each-slug>` in browser.
3. Devtools console: zero errors on every page.
4. Commit per locked commit pattern: `fix(phase-3f): pass A — Cursor.tsx, placeholders, daily-driver refresh`.

---

## Pass B — Fix the funnel (after Pass A)

Three moves. Closes the visual + conversion-funnel issues that survive Pass A.

### B1 — A-3 Intent Engineering MCP tile content overflow

**P0 · CSS · ~30 min**

**Problem.** At desktop 1440px AND mobile 390px the A-3 tile title + tagline bleed left of the tile bounding box into the adjacent grid cell. Audit screenshots: [.audit-screens/01-home-1440.jpeg](.audit-screens/01-home-1440.jpeg) + [.audit-screens/11-home-mobile.jpeg](.audit-screens/11-home-mobile.jpeg).

**Fix path.**
1. Open [src/components/projects/ProjectsSection.astro](src/components/projects/ProjectsSection.astro) + the per-tile component (`ProjectTile.astro` or inline).
2. Likely cause: the tile inner content wrapper lacks `min-width: 0` (CSS Grid children default to `min-width: auto` which can blow out the column). Add `min-width: 0; overflow: hidden;` to the tile content wrapper.
3. Check for `view-transition-name` styles on this specific tile (A-3 is the SHIPPED tile and may have a unique transition target). If a `view-transition-name` is on the wrong element, layout will break.
4. Verify at 390 / 768 / 1440 / 2560 via Playwright resize.

**Acceptance.** A-3 tile renders inside its grid cell at all breakpoints, title fully contained, no horizontal scroll.

---

### B2 — About-teaser swiper cascade does not paint cards 2–10

**P0 · JS/CSS · ~30–60 min**

**Problem.** At desktop first paint only the front card paints; cards 2–10 don't peek through the cascade (`translateZ(-12px * i)` per spec §6.1). Empty white space where the stack should be visible.

**Fix path.**
1. Open [src/components/teaser/TeaserSwiper.astro](src/components/teaser/TeaserSwiper.astro) + `src/scripts/teaser-swiper.js`.
2. Inspect `--card-z-offset` and `--card-y-offset` CSS vars — verify both apply via `transform: translate3d(0, calc(var(--card-y-offset) * var(--i)), calc(var(--card-z-offset) * var(--i)))` or equivalent.
3. Verify `perspective` is set on the swiper container — Z-translation has no visual effect without parent `perspective`.
4. Check the `--i` (card-index) custom property is being set per card at server-render time, not waiting for JS hydration.
5. If JS lazy-mounts cards 2–10, switch to server-render-all + JS-only-controls.

**Acceptance.** Desktop first paint shows the front card + at least 3 cards visible behind it in the cascade. Mobile renders front card only (acceptable per spec).

---

### B3 — Author project tile media for A-1, A-2, A-4, A-5

**P1 · creative · open scope — decision needed**

**Problem.** Four of five project tiles render as flat color blocks. Without authored media, the projects splash drifts toward the design-system-viewer trap ("color tiles arranged for variety"). Violates the §"Character-on-Every-Key-Surface Rule" — the rule the V3/V4 attempts kept dropping.

**Three skills available for tile media:**

| Skill | Style | Strength | Risk |
|---|---|---|---|
| [.claude/skills/gemini-pencil-animation-image-gen](.claude/skills/gemini-pencil-animation-image-gen) | Pencil-test, anchored to `2D-Character-Sketch-Sean-v1.png` | On-brand by default. Maps cleanly to the hero WebM + about-cartoon-cels lineage. | Five tiles in identical pencil-test register may read as monoculture. |
| [.claude/skills/openai-image-gen](.claude/skills/openai-image-gen) | OpenAI GPT Image 2 — editorial illustration range | Stylistic variety per tile possible. Editorial / collage / mixed-media moves available. | Off-brand risk. Style discipline must come from prompts, not the skill defaults. |
| [.claude/skills/gemini-image-gen](.claude/skills/gemini-image-gen) | Nano Banana 2 general — photographic + illustration | Wide style palette. Headshot-quality + illustration both reachable. | Same off-brand risk as OpenAI. |

**Open question: tile-style direction.** Three options for Sean to pick from in the brainstorm:

- **Option 1 — All pencil-test, varied beat per tile.** Stays in the established register. Each tile carries a different beat of Sean-at-work: at-desk (A-1), at-whiteboard (A-2), at-terminal (A-3 — already lives), in-conversation (A-4), with-gamepad (A-5). Pure character throughline. Low style risk; medium variety.
- **Option 2 — Pencil-test + one mixed-media outlier.** Four tiles pencil-test, one tile (likely A-5 16BitFit) in pixel-art register as a deliberate stylistic break. Earns the variety the V3 attempts faked with color swatches, but earns it through *actual content*.
- **Option 3 — Per-tile-style with anchor character.** Each tile has a distinct visual register (pencil-test, watercolor-ink, photographic-collage, terminal-screenshot, pixel-art) but each carries the same character somewhere in the frame. Highest variety; highest off-brand risk.

**Recommendation for the brainstorm.** Option 1 is the safest bet for ship-ready. Option 2 buys variety with one calculated risk. Option 3 is the most ambitious and the most likely to drift. Decide in the brainstorm session that follows this doc.

**Acceptance.** All five A-N tiles carry authored, non-flat-color media. Each tile reads as Sean-specific within 1 second of glance. None of the four traps (template, slop, glass, gradient) leak in.

---

### B4 — (Pass B wrap) Verify + commit

1. Re-run Playwright tour. Re-screenshot the home grid + about teaser.
2. Devtools: zero errors. Grid: all tiles inside bounds. Swiper: cascade visible.
3. Commit: `fix(phase-3f): pass B — A-3 tile, teaser cascade, project tile media`.

---

## Pass C — Polish (final pre-launch sweep)

Five small moves. Closes the P1 / P2 items. ~2–3 hours total.

### C1 — Code-split the diagram libs (mermaid + wardley + cytoscape + katex)

**P1 · build config · ~30 min**

**Problem.** 1.9 MB of diagram libs (mermaid 608 kB · wardley 613 kB · cytoscape 443 kB · katex 261 kB) ship in the public bundle even on pages that never render a diagram. Impacts the hero Lighthouse Performance ≥95 DoD target.

**Fix path.**
1. Open [astro.config.mjs](astro.config.mjs). Locate the Vite `rollupOptions` block (or add one).
2. Add `manualChunks` to split each diagram lib into its own chunk:
   ```js
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           mermaid: ['mermaid'],
           wardley: ['wardley'], // adjust to actual import path
           cytoscape: ['cytoscape', 'cytoscape-cose-bilkent'],
           katex: ['katex'],
         },
       },
     },
   },
   ```
3. Or better: wrap diagram-rendering in a `client:visible` island so the lib only loads when a diagram actually mounts.
4. Verify via `astro build` output — chunk should now appear only in pages that import the lib.

**Acceptance.** Home `/` payload drops by ≥1 MB after this fix. Architecture pages still render diagrams correctly.

---

### C2 — Reduced-motion contract fix on the hero

**P1 · spec compliance · ~20 min**

**Problem.** Per hero-spec §7.5.5 + §12, when `prefers-reduced-motion: reduce` is set, the `<video>` element should NOT be mounted. Currently it's in the DOM regardless, with `data-state="pending"`.

**Fix path.** Open [src/components/hero/CharacterLane.astro](src/components/hero/CharacterLane.astro). Gate the `<video>` mount behind a client-side check (Astro can't read media queries at server-render). Pattern:
```html
<picture data-hero-poster>
  <img src="/assets/hero-icons/icon-7-claude.webp" alt="..." />
</picture>
<template data-hero-video>
  <video autoplay muted loop playsinline poster="...">...</video>
</template>
<script>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tpl = document.querySelector('[data-hero-video]');
    tpl.parentNode.replaceChild(tpl.content.firstElementChild, tpl);
    document.querySelector('[data-hero-poster]').remove();
  }
</script>
```

**Acceptance.** With `prefers-reduced-motion: reduce` enabled, no `<video>` element exists in the DOM. The static poster renders instead.

---

### C3 — Essay status / title / date consistency

**P1 · content · ~10 min**

**Problem.** "Access Over Meaning" (index card title) vs `meaning-over-access` (URL slug) vs the CLAUDE.md locked title — pick one. Locked decision per CLAUDE.md: slug is `meaning-over-access`, so title should match. Date `2026-06-19` is 27 days future-dated. Status `DRAFT` is outside the locked 5-status vocabulary (ACTIVE / COMING / SHIPPED / PAUSED / ARCHIVED).

**Fix path.**
1. Open `src/content/essays/meaning-over-access.mdx`. Align title to the slug.
2. If the essay is genuinely shipped, status → `SHIPPED`, date → today (2026-05-23). If not, status → `COMING`, date → real near-term target.
3. If the locked 5-status vocabulary needs a sixth value for "in-progress writing" — that's a spec change, not a content fix. Cross-check with [docs/specs/essays-spec-v1.md](docs/specs/essays-spec-v1.md).

**Acceptance.** No future-dating, no `DRAFT` pill, slug-and-title match.

---

### C4 — Trailing-slash consistency on tile hrefs

**P1 · routing · ~15 min**

**Problem.** Home project tile hrefs use `/work/<slug>` (no trailing slash) while `/work/` index uses `/work/<slug>/` (trailing slash). Every tile click adds a 301 redirect hop.

**Fix path.** Open [src/components/projects/ProjectsSection.astro](src/components/projects/ProjectsSection.astro). Add trailing slash to every project tile `<a href>`. Or globally: set Astro `trailingSlash: 'always'` in `astro.config.mjs` (verify side effects on RSS / sitemap first).

**Acceptance.** No 301 hops in the Playwright network log when clicking any tile.

---

### C5 — Architecture slug routing spot-check

**P1 · routing · ~10 min**

**Problem.** Assessment A reported `/architecture/<slug>/` 404 on the single listed writeup; Assessment B reported 200. Reproduce manually before deciding it's fixed.

**Fix path.**
1. Visit `/architecture/` in a real browser.
2. Click the single writeup row.
3. If 404: check (a) the `<a>` wrapper on the row, (b) `getStaticPaths` in [src/pages/architecture/[slug].astro](src/pages/architecture/[slug].astro) against the slugs in `src/content/architecture/`.
4. If 200: A's report was a view-transitions intermittent. Note resolved.

**Acceptance.** Direct click from index row lands on the writeup, no 404.

---

### C6 — Repo hygiene

**P2 · ~5 min**

- Remove `hotfix-tear-boundary-current.png` from repo root (gitignored or moved to `docs/bugs-changes/screenshots/`).
- Resolve the deleted `public/assets/teaser-deck/03-watercolor-ink.webp` (already replaced by `03-comic-book.webp` per git status).
- Remove the `.audit-screens/` directory if not committed-intentionally (it's from the impeccable audit pass, not a permanent artifact).
- Sweep loose `audit-*.png` files at repo root.

**Acceptance.** `git status` clean except for in-flight Pass A/B/C edits.

---

## Out of scope for Phase 3F (deferred to post-launch)

- **Agent-feed footer module.** CLAUDE.md's "three load-bearing things" §3 names a sub-daily agent-feed footer. Current footer is link-columns only. If sub-daily ledger ships as a v1 surface, it's its own spec. **Decision:** ship 3F with the link-column footer and amend CLAUDE.md §"three load-bearing things" to acknowledge agent-feed footer deferred to v1.1. The dateline + pulse strip carry the daily-dated layer alone for v1.
- **§B-1 timeline ladder restructure.** Closest the site comes to violating parallel-lineage by form. Content is parallel, visual form reads ladder. Out of scope for ship; revisit post-launch.
- **`RunAtLoad` plist hardening for overnight fleet.** Today's power outage is the second time machine state has broken the fleet. The launchd plists need either `RunAtLoad=true` with idempotency guards OR explicit acceptance of the contract. Daily note tracks this as a 5/23 medium thing. ~30 min when Sean takes it.

---

## Sequencing summary

```
TODAY (Pass A):
  A1 Cursor.tsx fix          ~30–60 min   engineering
  A2 Strip placeholders      ~4–7 hours   content (the big lift)
  A3 Refresh daily JSON      ~15 min      data
  A4 Verify + commit         ~15 min

NEXT (Pass B):
  B1 A-3 tile overflow       ~30 min      CSS
  B2 Teaser cascade          ~30–60 min   JS/CSS
  B3 Author tile media       ~?           creative — Sean decides direction
  B4 Verify + commit         ~15 min

PRE-LAUNCH (Pass C):
  C1 Bundle split            ~30 min
  C2 Reduced-motion          ~20 min
  C3 Essay consistency       ~10 min
  C4 Trailing slash          ~15 min
  C5 Architecture slug       ~10 min
  C6 Repo hygiene             ~5 min
```

**Estimated total time to ship-ready:** 10–14 hours of focused work, distributed across 2–4 sessions.

---

## Acceptance criteria (entire phase)

Phase 3F is complete when ALL of the following are true:

- [ ] `grep -r "PLACEHOLDER" src/content/ src/pages/` returns zero matches.
- [ ] `npm run build` succeeds with no warnings except the diagram-lib chunk warnings (closed by C1).
- [ ] Home `/` console: zero errors, zero warnings on desktop + mobile.
- [ ] All 11 surfaces (`/`, `/work/`, `/work/<5-slugs>/`, `/transactions/`, `/transactions/<3-slugs>/`, `/architecture/`, `/architecture/<slug>/`, `/essays/`, `/essays/<slug>/`, `/about/`, `/contact/`) render without 404 or layout break at 390 / 1440 viewports.
- [ ] Home dateline displays today's date and reads as real signal (not phase-0 reuse).
- [ ] All 5 project tiles carry authored, non-flat-color media. Character present on each.
- [ ] About teaser swiper paints front card + cascade visible at desktop first paint.
- [ ] Reduced-motion: no `<video>` in DOM. Static poster renders.
- [ ] Recruiter test (re-run after Pass A+B): hero passes 5s, case-study clickthrough passes 30s, deep-read passes 2 min.
- [ ] Lighthouse Performance ≥95 on the home page (after C1).

---

## Open items for brainstorm (post-doc)

1. **Tile-style direction** — Option 1, 2, or 3 from B3? Or a fourth option Sean wants to propose?
2. **Daily-driver tone for the JSON refresh** — paper over the off-day, or surface it honestly per the Provocative-Questions alternative?
3. **next-piece.json target** — point at Vault Scorecard (June 4) or at the portfolio launch itself (May 26)?
4. **Order of authoring within A2.a** — confirm the recruiter-click-path order, or front-load Sean's favorite first?

Impeccable Critique — Combined Report
sw-ai-pm-portfolio · 2026-05-23 · phase-2-foundations

Two independent assessments ran in isolation: a strategic + aesthetic LLM design review (Assessment A) and a spec-compliance + technical audit (Assessment B). They agreed on the big things, disagreed on one route (architecture slug), and B caught several P0-grade engineering failures A couldn't see from the browser alone.

Design Health Score
#	Heuristic	Score	Key issue
1	Visibility of system status	2/4	Daily-dated data 2 days stale; home dateline says MAY 21 while sub-page datelines compute MAY 23. Two surfaces telling two different truths.
2	Match system / real world	4/4	"Frame numbers," "transactions," "ledger" — vocabulary IS the brand.
3	User control and freedom	3/4	No back-to-top from deep dives; sibling nav is present.
4	Consistency and standards	2/4	Slug/title flip on essays; DRAFT pill outside the locked 5-status vocab; future-dated artifacts (essay JUN 19, architecture JUN 03); trailing-slash inconsistency on tile hrefs.
5	Error prevention	3/4	Architecture slug routing — Assessment A saw 404; B saw 200. Worth a manual spot-check.
6	Recognition over recall	4/4	Eyebrow + dateline + frame-number scaffolding orients fast.
7	Flexibility and efficiency	3/4	RSS on every catalog. No keyboard layer (acceptable v1).
8	Aesthetic and minimalist	4/4	The strongest leg. The hero alone clears this bar.
9	Error recognition & recovery	2/4	7 console errors on / (React hook violation in Cursor.tsx); 404 page renders but view-transitions interfere.
10	Help and documentation	3/4	Case studies ARE the docs — when they aren't placeholder.
Total		30/40	Good aesthetic foundation; execution gaps concentrated in content fill + dated data + React island.
Anti-Patterns Verdict
Does this look AI-generated? Mostly no. First-order category-reflex test (would a stranger guess the aesthetic from "AI PM portfolio" alone?) — they'd guess dark navy + electric gradient + glass cards. The site genuinely subverts that on the home hero in two seconds. The hand-drawn man at the desk, the warm cream paper, the teal book-cover chrome revealed through a real torn-paper edge — not template land.

One inverted slop signal, though, and it's bad: /work/intent-engineering-mcp/ and /about/ ship with literal [PLACEHOLDER OPENER — paragraph 1 of 3] strings rendered as visible body copy. The agent's instructions to itself are in production HTML. A recruiter on the case-study tab learns the page was Claude-drafted before the words land. That's worse than AI-slop — it's AI-scaffolding shipped raw.

Template-trap audit:

Design-system-viewer: Mostly avoided. One yellow flag — four of five project tiles (A-1, A-2, A-4, A-5) render as flat color blocks because tile media wasn't authored. The grid starts to read as "color swatches arranged for variety." Authoring tile media is the load-bearing fix.
Luxury-minimal-PM: Avoided. No "VISION MEETS VELOCITY," no abstract gradients, no "SAY HELLO." footer. Clean.
Deterministic scan: B's CLI build caught 1.9 MB of diagram libs (mermaid + wardley + cytoscape + katex) shipping on every page, including pages that never render a diagram. A's eye missed this entirely. False-positive count: zero.

Overall Impression
The portfolio's strategic intent is largely intact. The home hero is doing 60% of the work the entire portfolio needs to do, and it's doing it correctly. The cartoon-cel "Saturday morning canon" block on /about/ is the most original move in the entire build — no other PM portfolio does this.

The execution gaps are concentrated in three places: (1) placeholder copy shipped to production, (2) the Daily Driver stopped firing 48 hours ago and nobody noticed, (3) Cursor.tsx is throwing 7 console errors on home page load. None of these are design problems. All three are ship-blockers.

The recruiter test:

5 seconds: Passes. Hero hand-drawn man + Newsreader 130px + dated stamp = "this isn't the same portfolio I just closed three tabs of." Scroll.
30 seconds: Fails. Recruiter clicks A-3 (the only project tile with media bleeding through), lands on the case study, sees [PLACEHOLDER OPENER — paragraph 1 of 3] above the fold. Closes tab.
2 minutes: Doesn't happen. The funnel breaks at exactly the moment it most needs to convert.
Net: Not shippable today. Shippable by EOW if four P0s close.

What's Working
The home hero earns the page. The duet treatment — BOSTON, MAY 21, 2026 — phase 0 closed… stamp, "Sean Winslow" at 130px Newsreader, mono / AI PRODUCT MANAGER eyebrow, three-line tagline at weight 300, the hand-drawn pencil-test Sean at a desk with a small AI companion glowing — does the work V3 and V4 failed to do. The character earns the page; the typography earns the credibility; the dateline (when it's fresh) earns the "real." src/components/hero/CharacterLane.astro, src/components/hero/HeroDateline.astro.

/transactions/ is the best-executed catalog page on the site. Dateline, three real artifacts with month-dated status pills, filter tabs (ALL · FLEET · PIPELINE · PRODUCT · WRITING · INFRA), RSS link. It proves the "ledger" framing isn't a slogan, it's a system. This is the page that translates the positioning into evidence. src/pages/transactions/index.astro.

The About page's "Saturday morning canon" cartoon-cel block is the portfolio's signature move. Six pencil-test cels — Tommy Pickles · Ash Ketchum · Rocko · Samurai Jack · Uncle Iroh · Jake the Dog — each carrying a one-line thesis. Genuinely Sean and not a template, which is the whole game. Most original beat in the build.

Priority Issues
[P0] Cursor.tsx React island throws 7 console errors on home page load
Why it matters: Site appears broken to anyone with devtools open. "Invalid hook call" + useRef of null reads as "first-time React user shipped to production" to any engineering reviewer.
Fix: Two React copies are being bundled. Verify the client:* directive on the island, check astro.config.mjs React adapter config, confirm only one React instance in dist/_astro/. src/components/Cursor.tsx:25.
Suggested command: /impeccable harden after fix.
[P0] Strip [PLACEHOLDER] strings from production HTML
Where: /work/intent-engineering-mcp/ (4 narrative blocks + investigation board + Q1–Q4 all placeholder); /about/ §B-2 and §B-3 ("PLACEHOLDER — Sean rewrites the third paragraph in Sedaris register…"); /transactions/vault-knowledge-mcp/ under WHY THIS APPROACH / WHAT WOULD BREAK / WHAT DID I LEARN.
Why it matters: The single most credibility-destroying issue on the site. The agent's prompt-to-self is shipping as body copy.
Fix: Author the prose via the writing-voice-modes skill (Sedaris register for case-study narrative and About; declarative-thesis for essay middle). At minimum: render placeholders as HTML comments until real copy lands. Better: ship one finished case study and mark the other four COMING with real expected dates.
Suggested command: Invoke .claude/skills/writing-voice-modes, then bmad-editorial-review-prose on the resulting MDX.
[P0] Re-fire the Daily Driver to advance dateline + pulse + next-piece from 2026-05-21 to 2026-05-23
What: All three /public/api/*.json files are stamped 2026-05-21T08:45:00-04:00. Home dateline reads MAY 21; sub-page datelines compute MAY 23. The site's load-bearing differentiator is currently "real and stale."
Why it matters: The framing is "real and dated." The first time a recruiter notices today's date is May 23 and the dateline says May 21, the trust dissolves.
Fix: Run the Daily Driver agent in /Users/seanwinslow/Code-Brain/code-brain/. If the cron isn't wired, wire it. If it's silently failing, fix the silent-failure handler — this is the single most important automation in the whole stack. Provocative alternative: make the "off day" visible — BOSTON, MAY 23, 2026 — daily driver paused (Sat). last run 05-21. Honesty about the cadence may be more credibility-positive than freshness-faking.
[P0] Fix A-3 Intent Engineering MCP tile content overflow
What: At desktop 1440px AND mobile 390px, the A-3 tile title and tagline bleed left of the tile bounding box into the adjacent grid cell. Visible in .audit-screens/01-home-1440.jpeg.
Why it matters: A-3 is the SHIPPED tile — the one with media that draws the click. It's also the first thing broken on the page that visitors actually scan.
Fix: Add min-width: 0 / overflow: hidden to the tile inner content wrapper in src/components/projects/ProjectsSection.astro, or audit the view-transition-name styles on the tile. src/components/projects/ProjectTile.astro.
[P0] About-teaser swiper cascade does not paint cards 2–10
What: At desktop first paint the cascade shows the front card and empty white space where cards 2–10 should peek through via translateZ(-12px * i). Spec §6.1 expects all 10 in the stack.
Fix: Verify --card-z-offset / --card-y-offset CSS vars and the cascade transform formula in src/components/teaser/TeaserSwiper.astro + src/scripts/teaser-swiper.js.
[P1] Four of five project tiles carry no character — A-1, A-2, A-4, A-5 are flat color blocks
Why it matters: Without tile media, the projects splash drifts toward the design-system-viewer trap. The §"Character-on-Every-Key-Surface" rule is the spec the V3/V4 attempts kept dropping; dropping it here would be V5 making the same mistake at a subtler altitude.
Fix: Author a pencil-test loop or still per tile via .claude/skills/gemini-pencil-animation-image-gen. Even static stills land better than flat color.
[P1] Reduced-motion contract violation — <video> mounted unconditionally
What: Spec §7.5.5 says when prefers-reduced-motion: reduce, the <video> element is NOT mounted; the icon-7 fallback renders. Currently the element is in the DOM regardless.
Fix: Gate the <video> in src/components/hero/CharacterLane.astro behind a JS reduced-motion check before mount.
[P1] 1.9 MB of diagram libs ship on every page
What: mermaid (608 kB) + wardley (613 kB) + cytoscape (443 kB) + katex (261 kB) emit in the public bundle even on pages that don't render a diagram.
Fix: Dynamic-import diagram islands; configure manualChunks in astro.config.mjs. Impacts Lighthouse Performance ≥95 target.
[P1] Essay status/title/date consistency cluster
"Access Over Meaning" (index card title) vs meaning-over-access (URL slug) vs the CLAUDE.md locked title — pick one. Locked decision is the slug.
DRAFT status pill isn't in the locked 5-status vocabulary (ACTIVE/COMING/SHIPPED/PAUSED/ARCHIVED).
Date 2026-06-19 is 27 days future-dated; architecture writeup is 2026-06-03, 11 days future-dated. Recruiters catch this in two seconds.
Persona Red Flags
Riya (PM Recruiter, ~10s per portfolio, triaging 40 today): Lands on /. Hero is good — keeps scrolling. Notices dateline says May 21, glances at her calendar (May 23), small flicker of doubt. Sees A-3 tile is the only one with media; clicks. [PLACEHOLDER OPENER — paragraph 1 of 3]. Closes tab. Will not return.

Marcus (VP Engineering scouting AI-fluent PMs, devtools open habitually): Lands on /. Sees the hero, impressed. Opens devtools by habit. Console: 7 red errors, Invalid hook call, useRef of null. Stops reading. Concludes "this person hasn't shipped React in production." Doesn't see the actual product chops in the case studies.

Sean's own taste (the third persona — the standard the portfolio holds itself to): The home hero passes. The cartoon-cels block passes. Everything between them is half-built or stale. The site is currently betraying its own standard at the case-study tier.

Where the Assessments Disagreed
One real discrepancy worth resolving manually:

/architecture/<slug>/ routing. A reported 404 on the only listed writeup (could not click into it). B reported 200 with full render. Could be (a) view-transitions interfering with A's screenshot pass, (b) the catalog row not wrapped in an <a> while the direct URL works, or (c) intermittent. Spot-check by clicking the row in a real browser.
Minor Observations
Trailing-slash inconsistency: home tile hrefs /work/animation-pipeline vs /work/ index uses /work/animation-pipeline/. Adds a 301 redirect hop on every tile click.
hotfix-tear-boundary-current.png and public/assets/teaser-deck/03-watercolor-ink.webp (deleted) loose at repo root per git status — clean before launch.
Astro dev toolbar visible in audit screenshots — dev-mode only, won't appear in prod (noted so future eyes don't flag it).
Hero floor-shadow position fix (CHANGELOG Bug 9, 2026-05-22) appears integrated; visual check by designer eye recommended at all three breakpoints.
The §B-1 numbered age-laddered timeline on /about/ is the closest the site comes to violating the parallel-lineage rule by form — content is parallel, but visual form reads ladder-y. Worth a structural look (braided two-column? mixed-age scattershot?) post-ship.
Questions to Consider
What if the projects section dropped the six-cell grid for a scroll-tagged ledger? Without authored media on four of five tiles, the grid reads as a layout. /transactions/ already proves the ledger form works better as evidence. The 6-tile grid was the right shape when every tile carried a finished video — without that, it's the wrong shape today.
Should /work/ link only the one finished case study and the other four live as COMING rows with real dates? Three half-built case studies destroy more trust than one finished one builds.
Is the agent-feed footer deferred or dropped? CLAUDE.md "three load-bearing things" §3 names a sub-daily agent-feed footer. The shipped footer is link-columns only. If sub-daily activity isn't appearing anywhere, the only daily-dated surface is the dateline + pulse strip, both of which are currently stale.
Would honesty about the Daily Driver's cadence beat freshness-faking? BOSTON, MAY 23, 2026 — daily driver paused (Sat). last run 05-21. The framing was already "real and dated, not streaming." Owning the off-day is more on-brand than papering it.
Recruiter-Test Bottom Line
Passes 5 seconds. Fails 30 seconds. Doesn't reach 2 minutes.
The home page is doing recruiter-grade work. The case-study clickthrough is where the funnel breaks — and it's fixable in a week, not a month. Four P0s away from "this guy has taste, we need to talk to him immediately."

Ask the User
To shape the action plan, four decisions to make:

Which P0 cluster do you want to tackle first? I see three natural sequencing options:

A. Stop the bleeding — fix Cursor.tsx, strip placeholders, fire Daily Driver. Highest credibility recovery per hour.
B. Fix the funnel — A-3 tile overflow + teaser cascade + author at least one full case study end-to-end. Highest recruiter-conversion impact.
C. Both in parallel — A and B at once across separate sessions (risk: context-switching cost).
On the case-study placeholder problem — author all five or ship one finished + mark the rest COMING? The latter is honest and faster; the former is more impressive when done but takes a week minimum.

On the Daily Driver — refresh today's data, or change the contract to surface staleness honestly? ("daily driver paused (Sat). last run 05-21.") The second option matches the "real and dated, not streaming" framing better but requires a small UX change.

Project tile media — author all four missing tiles, or restructure projects into a /transactions/-style ledger and skip the tile-media problem entirely? The ledger answer would also resolve Question 1 in "Questions to Consider."

Once you answer, I'll write a prioritized recommended-actions plan and we can start running commands (/impeccable harden, /impeccable polish, etc.) in the order you pick.