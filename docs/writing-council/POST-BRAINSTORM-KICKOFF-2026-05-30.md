# Execution Kickoff — seanwinslow.com v1 remediation apply

**For:** Claude Code on Sean's Mac Mini (the session that EXECUTES the plan)
**From:** the 2026-05-29/30 brainstorm session
**Authority:** [`docs/specs/SHIP-PLAN-2026-05-29.md`](../specs/SHIP-PLAN-2026-05-29.md) — read it first, in full. This kickoff is the operating summary; the SHIP-PLAN is the source of truth.
**Lock-apply spine:** [`IMPLEMENTATION-PROMPT-2026-05-28.md`](IMPLEMENTATION-PROMPT-2026-05-28.md) — the §4 order, §6 commits, §7 QA, §9 unexpected-state protocol still govern the 11-lock apply. This kickoff only layers the post-brainstorm changes on top.

> This session DOES execute. The 2026-05-29/30 session was plan-only; this one applies. Sean retains voice authority on every locked string and final say on every visual.

---

## 0. Orient (read in this order)

1. `CLAUDE.md` — three load-bearing things + template-trap warning + locked decisions.
2. `docs/specs/SHIP-PLAN-2026-05-29.md` — the full plan (6 streams, sequencing, v1/v1.1, launch gate, risk).
3. `docs/writing-council/IMPLEMENTATION-PROMPT-2026-05-28.md` — the lock-apply ground truth.
4. The 11 lock docs (read each in full only when you're about to apply it).
5. The current on-disk MDX in `src/content/` — confirm the divergences (the apply is **reconciliation, not creation**).

---

## 1. The one thing that changed since IMPLEMENTATION-PROMPT-2026-05-28

That doc assumed a clean apply onto greenfield collections. **Reality: the collections already exist with 5/24 content that diverges from the locks, and none of the 11 locks are applied.** Treat every "creates collection" instruction as a reconciliation. When on-disk structure ≠ lock-doc expectation, follow IMPLEMENTATION-PROMPT §9: match by field name + section heading (not line number), trust the lock string over priors, and log anything ambiguous to `docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md` for Sean's post-apply review.

---

## 2. Decisions to honor (D1–D10, from the brainstorm)

| # | Decision | What it means for the apply |
|---|---|---|
| D1 | Tiles delivered | Integrate, don't author (see §4 S3). |
| D2 | Hero Issue B in v1 | Re-architect the loading choreography (§4 S2). |
| D3 | Architecture essay shipped → **Gate A GREEN** | Apply lock #6. (Optionally add `voice_pass_applied:` frontmatter to the upstream `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md`.) |
| D4 | **Email → `sean.winslow28@gmail.com`** | Edit `site.ts:9` + hardcoded `contact.astro:17`. **Also update the lock record** so it doesn't revert: `site-chrome-prose-locked-2026-05-28.md`, BLUEPRINT OPEN-5, CLAUDE.md "Locked decisions". |
| D5 | Essays staged | Apply lock #7 with manifesto `status: DRAFT`; flip to PUBLISHED on 6/19. |
| D6 | Hero loading = transparent icons on cream overlay | See §4 S2 approach. |
| D7 | **A-1 display title → "Anima"** | Swap `title:` on `animation-pipeline.mdx`. **Keep slug `animation-pipeline`** — all locked cross-links/routes/OG depend on it. Locked prose is already anima-aware; do not touch it. |
| D8 | **Hero title drops "Product Manager"** → *"The agents handle the loops. I handle the taste."* + enlarge the `/AI PRODUCT MANAGER` role tag | See §4 S2(b). Overrides a locked decision — update CLAUDE.md, hero-spec, CHANGELOG, the tagline validator, and IMPLEMENTATION-PROMPT §7 QA string. |
| D9 | New ledger row Enterprise Data Readiness Matrix (`surface: infra`) | Fold the `feat/ledger-data-readiness-matrix` branch into the transactions apply; add "infra" to FilterPills/`[surface]` route if missing. |
| D10 | **A-5 display title → "16BitFit"** | Swap `title:` on `16bitfit.mdx` + the literal in `work/index.astro`. Keep slug `16bitfit`. No lock-doc churn. |

---

## 3. Commit-strategy delta (on top of IMPLEMENTATION-PROMPT §6)

Use the §6 commit sequence, with these additions/changes:
- **Foundations commit** also carries the Anima + 16BitFit `title:` swaps and the `work/index.astro` literal fix.
- **Site-chrome commit** also carries the email swap (D4) + the lock-record updates.
- **A dedicated hero commit** (separate from lock-apply): hero-spec amendment + CHANGELOG + loading overlay + hero-title change + Playwright re-verify.
- **A tile-integration commit**: 5 WebP tiles + frontmatter `hero_media`/`hero_media_alt` updates; reference the superseded 5/24 tile commits for traceability.
- **A transactions commit** that includes the merged D9 row.

---

## 4. Per-stream execution notes

### S1 — Lock apply (the spine)
Run IMPLEMENTATION-PROMPT §4 Stages 1 → 3 → 2 → 4 (foundations, cleanup, new/divergent surfaces, OG). Gate B green (essays staged). Gate A green (architecture in). Run the ceiling greps (iPad ≤3 · "Comprehension is the artifact" ≤3 · HybridRouter methods-only · no fixed counts · no tenure-foregrounding · no desperation) after Stage 1 and after Stage 3. Surface the transactions final-row-set question (OPEN-T1 + whether lock #5's knowledge-loop/eval-suite/substack-drafter have upstream content) to Sean when you hit Stage 2.

### S2 — Hero (Issue B + title)
1. Amend `hero-spec-v1.md` §6/§7.5/§7.5.5 + tagline section; log to CHANGELOG.
2. Pillow script: normalize the 8 `reference-images/hero-icons/background-removed/*.png` onto a consistent transparent square canvas → WebP → `public/assets/hero-icons/loading/`.
3. New full-viewport loading overlay: fixed, `#FFF9F0`, centered icon, cycles 8 frames per §6 timing, then **the overlay fades out** to reveal the hero rendered underneath. Hero renders from first paint; overlay is additive. Once-per-session (sessionStorage).
4. Reduced-motion / no-JS: overlay does NOT mount, hero shows immediately, no `<video>` in DOM. Re-verify with Playwright (`.character-video` null + hero visible immediately).
5. Hero title → drop the "Product Manager." line; enlarge role tag; update CLAUDE.md/hero-spec/CHANGELOG/validator/QA string.

### S3 — Tile integration
Source: `assets/projects-tiles/A-{1..5}_*.png`. Optimize → WebP, crop to the 4:5 `ProjectTile` spec, place at `public/assets/projects/<slug>.webp`, update `hero_media_alt` to match the new art (A-1 alt no longer "mascot walk cycle"). Verify `view-transition-name: hero-media-<slug>` morph. Per-tile visual QA at 390/1440 before commit.

### S5 — Stale data
Daily Driver JSON refresh + `08:45`→`08:30`; wire `DatelineLabel.astro:10` (or fix the static fallback). Don't double-edit the 08:45 prose that lock #2 also touches.

### S6 — Deploy (terminal gate, Sean clicks)
Phase 4 sequence from SHIP-PLAN-2026-05-23 §2. **Private Vercel preview for Sean's review before the apex flip + LinkedIn.** Confirm `dist/` sitemap + RSS carry `seanwinslow.com`. Update CLAUDE.md status banner.

---

## 5. Launch gate (do not flip to deploy until all green)

Per SHIP-PLAN §5: 5 tiles integrated · hero Issue B + title pass (reduced-motion re-verified, prebuild clean) · ceiling greps clean · architecture #6 applied + transactions renders incl. infra row · dark-mode greps zero · `npm run build` clean with apex URLs · recruiter test on preview (5s/30s/2min) · Sean's no-template-feeling gut-check.

---

## 6. Hold points — stop and ask Sean

- Transactions final row set / OPEN-T1 (vault-knowledge-mcp row fate).
- Any lock string that "feels wrong" mid-apply (trust the lock over priors, but surface it).
- Before the apex flip + LinkedIn announce (S6 preview-review checkpoint).

---

*Authored 2026-05-30. Supersedes the launch-sequencing portions of SHIP-PLAN-2026-05-23. The audit + brainstorm were the hard part; this apply is mostly mechanical — but it's reconciliation, so read the on-disk state before trusting any "create" instruction. Ship with pride; don't rush.*
