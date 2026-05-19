# CHANGELOG

The running log of changes to the spec docs in [`docs/`](docs/). Each spec used to carry its own `## 1.1 Changelog` section — going forward, new entries land here instead so the specs themselves stay buildable and uncluttered.

## How to add an entry

When you make a substantive change to a locked or drafted spec (revision, restructure, scope change, decision reversal, killed idea), append a bullet to the relevant spec's section below:

```
- **YYYY-MM-DD (short label):** One- or two-sentence description of what changed and why. Reference the spec sections touched (§N.N) so a future reader can diff against the prior version without spelunking.
```

Rules:
- **Reverse chronological within each spec** (newest first).
- **Use absolute dates**, never "today" or "last week."
- **Lead with what changed, then why.** Skip filler. Match the voice rules in [`docs/PORTFOLIO-MASTER-PLAN.md`](docs/PORTFOLIO-MASTER-PLAN.md) §3.
- **One entry per coherent change.** Multiple unrelated edits on the same day get multiple bullets.
- If a spec doesn't yet have a section here, add one (alphabetical by filename under the `## Spec Changelogs` heading).
- If a change cuts across specs (e.g. a decision lock that ripples through 3 of them), record the lockstep update under each affected spec — don't try to invent a cross-cutting section.
- The pre-CHANGELOG entries below were lifted verbatim from each spec's original `## 1.1 Changelog` section. Those in-spec sections are now historical; treat them as superseded by this file.

---

## Spec Changelogs

### [`docs/hero-spec-v1.md`](docs/hero-spec-v1.md)

- **2026-05-19 (audit fix C-2.1):** Patched §14 "Out of scope" MCP-embed line. The interactive embed page now resolves at `/work/intent-engineering-mcp` (not `/transactions/...`) to match the projects-spec §3 routing contract + case-study spec §13.3 canonical route. A ledger row at `/transactions/intent-engineering-mcp/` continues to exist at the same slug per blueprint §3.1 ("one artifact can appear on multiple surfaces simultaneously with the same slug"). Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding C-2.
- **2026-05-19 (audit fix M-3):** Hand-off prompt in Appendix B updated — the working-directory path lost its erroneous `BMAD/` segment (`Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`). Pure string fix; no behavioral change. Per audit finding M-3.
- **2026-05-16 (prototype validation):** Composition revised from portrait shoulder-cutout to landscape desk-scene after the actual asset (`sean-typing-at-desk-hero-transparent.webm`) was rendered. The rotating "get in touch" badge was removed — character lane now owns the right side undisputed, contact CTA lives in the footer per §10. Name and tagline switched to `clamp()` so they scale on viewports >1440px. Lane sizing locked at 1024×576 with -180px right-bleed to clip the source canvas's empty band.
- **2026-05-16 (animation reconcile):** Originally three frame sets (walk-in / idle / blink). Replaced with a single seamless WebM loop per master plan §8.1.
- **2026-05-13:** Original spec locked + recall-tested.

### [`docs/projects-section-spec-v1.md`](docs/projects-section-spec-v1.md)

- **2026-05-19 (critique fix 1.2 — tile hover ≤300ms):** §8 tile-media hover timing was 700ms / scale(1.04) / cubic-bezier(0.4, 0, 0.2, 1) — sluggish at the exact moment recruiters scan tiles. Now 220ms / scale(1.03) / cubic-bezier(0.23, 1, 0.32, 1). Per Emil's UI-animation-under-300ms rule and `impeccable-and-emil-design-critique.md` blocker 1.2 + §2 row 1.
- **2026-05-19 (audit fix M-3):** Hand-off prompt in Appendix C updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.

### [`docs/case-study-spec-v1.md`](docs/case-study-spec-v1.md)

- **2026-05-19 (audit fix M-3):** Hand-off prompt updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.
- **2026-05-17:** Initial draft. Inherits projects-spec §10 (click contract) + §11 (high-level shape sketch). The 4Q block here is canonical — mirrors [`EXPLANATION-template.md`](../../../claude-code-superuser-pack/vault/40_knowledge/templates/EXPLANATION-template.md) heading-for-heading. The `SHIPPED` status (added 2026-05-17 to the projects spec for Intent Engineering MCP) is treated as a full citizen here.

### [`docs/about-spec-v1.md`](docs/about-spec-v1.md)

- **2026-05-19 (critique fix 1.1 — SVG lane rule):** §9.2 + new §9.2.1 — the B-1 lane-tint rule is now explicitly an SVG `<line>` element with `stroke-dasharray` animation, not a CSS `border-left`. Sidesteps Impeccable's side-stripe-border ban by reframing the affordance as a timeline scrubber. Preserves the §6 reveal animation contract (the prior wording was self-inconsistent: §6 wanted `stroke-dasharray`, §9.2 implied a CSS border). Per `impeccable-and-emil-design-critique.md` blocker 1.1.
- **2026-05-19 (audit fix M-3):** Hand-off prompt updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.
- **2026-05-18 (B-1 geometry swap + B-4 evergreen rewrite):** Two structural edits after Sean's review. **B-1** abandons the two-column animator-vs-PM parallel-lineage timeline (with torn-paper gutter + cross-gutter SVG arrows) in favor of a **single-column stacked-beats** layout: 6-8 moments running top-to-bottom, each a Newsreader sentence + JetBrains Mono subline, with a thin left-margin rule that runs **warm amber `#FAC775` for animator-coded beats**, **teal `#0A3E42` for PM-coded beats**, and **blends between** when a beat braids both. The parallel-lineage rule (PMP §3.1) survives — it's now expressed as a chromatic gradient on a single column, not as side-by-side columns. The "back-and-forth" reading rhythm Sean found exhausting collapses into a single down-the-page scan. Mobile no longer needs the alternating-row collapse rule. §2 anatomy diagram, §3 vertical budget (B-1 collapses from ~1200-1800px to ~960-1280px), §4 type + voice register, §6 motion timeline (cross-gutter arrow logic retired), §9 fully rewritten, §14 annotations (cross-gutter arrows removed from the curved-arrow vocabulary list, registration-mark corners retained as "beat-column registration spine"), §16 build stack (`<TimelineGutter />` and `<GutterArrow />` retired; `<BeatRow />` + `<LaneRule />` added), §17 DoD items 5 + 6 rewritten, Appendix A file map updated. **B-4** replaces the job-hunt-coded `AVAILABLE 2026-05 · AI PM > TECH PM > CREATIVE PM` pill + "I'm looking for a seat..." copy with **direction-of-craft prose** ("What I'm building toward" — 2 paragraphs naming Sean's bet on AI-native PM, agent governance, and the spec layer). A tiny `CURRENTLY @ FREE AGENT` or `CURRENTLY @ <COMPANY>` mono stamp top-right of the section is the only employment-state surface — driven by frontmatter `current_company`. The agent-fleet-config beat is preserved but moved into a single italic call-out that renders **only when `available: true`** ("if you're hiring around this, my agent fleet config goes out on second conversation"). Net effect: when Sean gets hired, he flips `available: false` and updates `current_company` — zero prose edits required, the page reads cleanly either way. §2 anatomy, §4 type + voice register, §12 fully rewritten, §17 DoD item 8 rewritten, Appendix B frontmatter shape updated.
- **2026-05-18 (lead-line + home-hero swap):** After drafting the About body, Sean preferred the single original line ("Raised by Saturday morning cartoons and Vercel deployment logs.") as the About header — the 3-sentence credentials block was retired. In lockstep, the home-hero tagline was repositioned to lead with the PM role explicitly ("Product Manager. The agents handle the math. I handle the taste.") — letting the home page declare the role and the About page do the biographical work. The cross-page rhyme architecture (home "Raised by..." → about "Trained by...") dissolves; the two pages now tell one story in two registers (declarative on home, biographical on About) without rhyming verbatim. PMP §4 updated in lockstep. The "Trained by Looney Tunes..." string is marked SUPERSEDED 2026-05-18 in PMP §4. The bottom-of-page pull quote is updated to echo the new home hero. §7.1 and §7.2 rewritten accordingly. The motion timeline collapses from per-sentence-stagger to a single-line reveal (one beat, not three).
- **2026-05-17 (revision):** Lead-line + B-3 section revised after Sean's review of v1. The dog framing was killed (it forced an artifact that wasn't load-bearing to Sean's actual personality). The PMP §4 About-page lead row gets updated in lockstep — the locked string moves from the dog deflation to a **compressed-parallel credentials block** that harmonizes with the home-hero tagline ("Raised by..." → "Trained by..."). B-3 transitions from a dog-Polaroid gallery to **Saturday morning canon** — six hand-drawn pencil-test studies of cartoon characters Sean takes as formative, each captioned with the product/craft principle the cartoon taught. Animation-cel frame treatment (with hand-drawn registration pegs) replaces Polaroid framing to signal "cultural-craft reference rendered through Sean's hand" rather than "personal artifact." Five dog-related OPEN questions in §18 are removed; three cartoon-canon OPENs added.
- **2026-05-17 (initial):** First draft. Honored hero §10's locked "About = paper, no splash" decision. Annotation density cap raised from ≤6 (case-study) to ≤12 (About).

### [`docs/transactions-spec-v1.md`](docs/transactions-spec-v1.md)

- **2026-05-19 (audit fix I-1.1, additive — `relatedArchitecture`):** Added `relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional()` to §3.2 schema per architecture-spec §14.1, with a matching bidirectional row in §14's cross-link contracts table and a `relatedArchitecture: null` example in Appendix B. Pure additive; legacy rows without the field still validate. Closes the 4-surface cross-link graph from the ledger side. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding I-1.
- **2026-05-19 (audit fix C-1, surface remap table):** Added "Free-text → canonical `surface` remap (forward-looking)" subsection inside §12.3 alongside the existing `beat → surface` table. Locks the canonical mapping for the free-text strings the unified roadmap + V3 bridge are already authoring (`MCP server` / `eval harness` / `SDK agent` / `control-plane interceptor` / `manifesto / thesis` / `architecture writeup`) into the 5-value enum. Migration script (`scripts/migrate_v3_transactions.mjs`, §11.1) is the consumer of record. Keeps the enum strict; no schema widening. Per audit finding C-1.
- **2026-05-19 (audit fix M-3):** Hand-off prompt in Appendix C updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per audit finding M-3.
- **2026-05-17:** Initial draft. Re-architects the V3-bridge schema (which doesn't carry forward verbatim — see §3.1). Inherits case-study spec §9.2's canonical-EXPLANATION contract. Reuses `scripts/fetch_explanations.mjs`. Slugs from the 2 (or 5, depending on cadence at crossover) V3 entries are preserved across migration. Recruiter mental model: "Sean's resume is the ledger."

### [`docs/architecture-spec-v1.md`](docs/architecture-spec-v1.md)

- **2026-05-19 (audit fix M-3):** Hand-off prompt updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.
- **2026-05-17:** Initial draft. Establishes /architecture/ as the third top-level IA surface (alongside /transactions/ + /work/), specifically for **architectural arguments** (thesis-shaped, comparison-based) — distinct from /transactions/ which is for **shipped systems**. An artifact can appear on both surfaces with the same slug, cross-linked. Requires an **additive** update to `transactions-spec-v1.md` §3.2 — adding `relatedArchitecture: string \| string[]` as an optional field on the ledger schema (see §15.4). No removals or renames to the locked transactions spec.

### [`docs/essays-spec-v1.md`](docs/essays-spec-v1.md)

- **2026-05-19 (audit fix M-3):** Hand-off prompt updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.
- **2026-05-17:** Initial draft. Establishes /essays/ as the **fourth top-level IA surface** (alongside /work/, /transactions/, /architecture/), specifically for **thesis-shaped writing that frames multiple artifacts into a single argument** — distinct from /architecture/, which argues *about a single system*. An artifact can appear on all four surfaces simultaneously with the same slug, bidirectionally cross-linked. Closes the four-surface cross-link graph: every artifact named in an essay's `plottedArtifacts` array auto-renders "← named in: [essay title]" on its ledger row + architecture writeup, build-derived by `derive_crosslinks.mjs`. No schema changes required on locked transactions or architecture specs (this is the third surface to receive reverse links via the same script).

### [`docs/site-chrome-spec-v1.md`](docs/site-chrome-spec-v1.md)

- **2026-05-19 (audit fix M-3):** Hand-off prompt updated — `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per `2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-3.
- **2026-05-17:** Initial draft. Kills the V3-bridge `<form>`-based `/contact/` route (placeholder-alert pattern). Kills the V3 React islands `<NavIsland.jsx>` + `<SmoothScroll.jsx>`. Keeps the V3 theme-cookie pattern verbatim. Folds in Contact per About spec §18 deferral. Aggregates all three collection RSS feeds (`/transactions/`, `/architecture/`, `/essays/`) into the footer's Subscribe column. Reconciles the nav-budget tension between hero spec §13 (home has no nav) and the four collection specs (sub-pages have implicit ~56px desktop / ~48px mobile nav above their vertical budgets) via a `noChrome` BaseLayout prop.

---

## Non-spec changes

Use this section for changes to [`CLAUDE.md`](CLAUDE.md), [`docs/PORTFOLIO-MASTER-PLAN.md`](docs/PORTFOLIO-MASTER-PLAN.md), or other root-level files that aren't tied to a single spec.

- **2026-05-19 (audit fix M-2 — PMP roadmap links):** Repaired three broken relative links in [`docs/PORTFOLIO-MASTER-PLAN.md`](docs/PORTFOLIO-MASTER-PLAN.md) (§0.5, §3.4, §11). The link target moved from `2026-05-06-unified-roadmap%20copy.md` (which resolved to a non-existent file under `docs/specs/`) to `../prompts-and-references/2026-05-06-unified-roadmap%20copy.md` (the actual canonical location after the 2026-05-18 reorg). The " copy" suffix is retained — that is the on-disk filename. Per `docs/prompts-and-references/2026-05-19-portfolio-spec-roadmap-alignment-audit.md` finding M-2.
- **2026-05-19 (audit fix M-1 — roadmap Task 13 date drift):** Edited [`docs/prompts-and-references/2026-05-06-unified-roadmap copy.md`](docs/prompts-and-references/2026-05-06-unified-roadmap%20copy.md) line 901 heading: `draft-lock 2026-05-23` → `draft-lock 2026-05-22` to match the authoritative date used throughout the Task 13 body (Steps 4–7 + verification gate). Body-wins resolution per audit recommendation. Per audit finding M-1.
- **2026-05-19 (audit fix M-3 — BLUEPRINT + texture-spec hand-off prompts):** [`docs/specs/BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) §10 hand-off prompt and [`docs/specs/texture-and-artifacts-spec-v1.md`](docs/specs/texture-and-artifacts-spec-v1.md) Appendix C hand-off prompt: `Code-Brain/BMAD/sw-ai-pm-portfolio/` → `Code-Brain/sw-ai-pm-portfolio/`. Per audit finding M-3. (The eight other in-spec M-3 fixes are recorded per-spec above.)
- **2026-05-19:** Created this file. Extracted existing per-spec `## 1.1 Changelog` sections verbatim as a baseline. Added pointer in `CLAUDE.md` so future Claude sessions log spec changes here instead of inside the specs.
