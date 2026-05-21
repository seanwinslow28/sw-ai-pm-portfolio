# Phase 2b Kickoff Prompt

Paste this into a fresh Claude Code session, working directory
`/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. It briefs the new
session on where Phase 2 landed, points at the locked spec + assets,
and asks for a `superpowers:writing-plans` plan for Phase 2b. Carries
the three follow-ups Phase 2 deferred.

---

## Prompt

> This is sw-ai-pm-portfolio — Sean Winslow's third-attempt AI PM portfolio. Phase 2 (foundations + hero + projects + footer) shipped on `main` over ~22 commits on 2026-05-21. The home page renders on `localhost:4321` with the dateline, name, 3-line tagline ("Product Manager / The agents handle the loops. / I handle the taste."), WebM character lane, intro icon cycle, full-bleed torn-paper seam, 6-cell projects grid, and universal 3-column footer. `npm run build` produces 6 static pages plus `sitemap-index.xml`.
>
> **Your job this session: produce a Phase 2b implementation plan via `superpowers:writing-plans`.** Phase 2b = the **home-about-teaser** — the 9 → 10 card swipeable character-deck that lives between the projects grid and the footer on the home page. Editorial line: *"A man, a pencil, an agent fleet. Same person, different tools."*
>
> ### Read in this order before invoking the skill
>
> 1. [`CLAUDE.md`](CLAUDE.md) — orientation, template trap, voice rules, status table
> 2. [`docs/specs/home-about-teaser-spec-v1.md`](docs/specs/home-about-teaser-spec-v1.md) — the locked spec you're planning against
> 3. [`docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md`](docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md) — Phase 2 plan, especially §10 deferral table — to copy the plan structure (task-by-task with verbatim file contents, DoD pass-through at the end, ~40 incremental commits)
> 4. [`docs/specs/site-chrome-spec-v1.md`](docs/specs/site-chrome-spec-v1.md) §3 + §7 — for chrome handoff between projects → teaser → footer
> 5. [`docs/specs/texture-and-artifacts-spec-v1.md`](docs/specs/texture-and-artifacts-spec-v1.md) §2 + §4 — torn-paper seam vocabulary you'll reuse
>
> ### Assets already authored (committed at HEAD)
>
> - 10 source PNGs in [`reference-images/teaser-deck/`](reference-images/teaser-deck/) — Phase 2b build converts each to WebP at the budget the spec specifies
> - Headshot source + bg-matted variant in [`reference-images/headshot-source/`](reference-images/headshot-source/) (Card 1)
> - Daily Driver endpoint `/api/about-pulse.json` is already referenced by the spec — for v1 the plan should hand-seed a static JSON at `public/api/about-pulse.json` (same pattern Phase 2 used for `dateline.json` + `next-piece.json`)
>
> ### Carry-over follow-ups from Phase 2 to fold into the new plan
>
> Three items Phase 2 deferred — the new plan should either address them or explicitly leave them for v1.1/Phase 3 with a one-line rationale:
>
> 1. **Hero floor shadow alignment** — currently lands at ~80% of viewport vs the painted desk at ~78%. Inline TODO at [`src/components/hero/CharacterLane.astro`](src/components/hero/CharacterLane.astro). Fix is either a re-crop of the shadow PNG so its alpha centroid aligns with the desk-foot center, or per-viewport-width calibration. Lightweight task — slot into the plan if you can do it without scope creep.
> 2. **Cursor React island hydration error** — Astro dev mode throws `TypeError: jsxDEV is not a function` in `Cursor.tsx`. React 19 dev-runtime mismatch with the default Vite JSX transform. Fix is a one-line `tsconfig.json` tweak (`"jsx": "react-jsx"` instead of `"jsx": "preserve"`) or an explicit `jsx-dev-runtime` alias in `astro.config.mjs`. Page renders cleanly without it but the cursor is currently inert. **Block this in early in the plan** since other interactive components in Phase 2b may share the same hydration path.
> 3. **Substrate v1.1** (optional) — `paper-tile.png` + `tear-edge.png` + `hero-floor-shadow.png` ship as Pillow-generated substitutes. Hand-authored Procreate versions per texture-spec §3.2 + §4.2 are the eventual target. Not in Phase 2b scope unless Sean elevates it.
>
> ### Scope boundaries
>
> - **In:** Home-about-teaser section composition, the swipeable card deck island (vanilla JS, no Framer/no GSAP per CLAUDE.md), the eyebrow + editorial line + CTA, WebP conversion script for the deck assets, `about-pulse.json` static seed, integration into `src/pages/index.astro` between `<ProjectsSection />` and the footer, DoD pass-through against home-about-teaser-spec §14.
> - **Out:** Sub-page chrome (Phase 3), `/about/` page itself (Phase 3 — the teaser links to it but doesn't build it), case-study bodies (Phase 3), real RSS feed routes (Phase 3), Daily Driver endpoint writer (Phase 4), Vercel deploy (Phase 4).
>
> ### Operating preferences (from CLAUDE.md + Sean's standing rules)
>
> - The plan's tasks should be small enough to be one subagent-driven task each (1–2 files per task, verbatim file contents in the plan body so the implementer doesn't need to think).
> - Each task ends with a commit on `main`; ~30–40 incremental commits total is the target shape.
> - No `git push` unless Sean explicitly asks.
> - Visual verification at each section boundary (Playwright or `curl` + DOM inspection — your call).
> - Continuous execution. Don't pause to check in between tasks; surface BLOCKED status only if genuinely stuck.
> - The template trap is the enemy. Every component decision must pass *"is this drifting toward the design-system-viewer or luxury-minimal-PM template?"* If yes, stop and reconsider against the spec.
>
> ### Deliverable
>
> A new plan at `docs/superpowers/plans/2026-05-21-phase-2b-home-about-teaser.md` that mirrors the structure of the Phase 2 plan: section-by-section task list, verbatim file contents per task, DoD pass-through section at the end, and an explicit §10 "What's NOT in this plan" deferral table that hands off to Phase 3. Once the plan is written, **stop** — execution is a separate session.
>
> Invoke `superpowers:writing-plans` now.

---

## What this prompt assumes is already true

(For Sean's reference — these are the preconditions a new session should be able to verify quickly via `git log` and `ls`.)

- Phase 2 shipped: 22 commits on `main` ending in `397515f fix(hero): tear-edge true full-bleed + shadow re-aligned under desk`, then `97be30d docs: TODO(v1.1) note on hero floor shadow alignment`
- `localhost:4321` serves the home page with hero + projects + footer when `npm run dev` runs
- Spec at [`docs/specs/home-about-teaser-spec-v1.md`](docs/specs/home-about-teaser-spec-v1.md) is **LOCKED 2026-05-20** with all 7 OPEN-N items resolved
- All 10 deck card sources are committed to [`reference-images/teaser-deck/`](reference-images/teaser-deck/)
- Headshot source committed to [`reference-images/headshot-source/`](reference-images/headshot-source/)
- The Phase 2 plan at [`docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md`](docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md) is the structural template the new plan should mirror
