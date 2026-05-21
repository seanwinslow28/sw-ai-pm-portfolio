# Phase 3 Kickoff Prompt

Paste this into a fresh Claude Code session, working directory
`/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`. The session decides
Phase 3 phasing, invokes `superpowers:writing-plans`, and produces the
first detailed sub-plan (Phase 3a — site-chrome completion + v1.1
polish carry-overs). Subsequent sub-plans (3b / 3c / 3d) are stubbed
as a backlog the planning session writes alongside 3a but defers
fleshing-out to follow-up sessions.

---

## Prompt

> This is sw-ai-pm-portfolio — Sean Winslow's third-attempt AI PM portfolio. Phases 2 and 2b have shipped on the `phase-2-foundations` branch. The home page on `localhost:4321/` renders:
>
> - **Hero** — dateline + name + 3-line tagline ("Product Manager / The agents handle the loops. / I handle the taste.") + WebM character + intro icon cycle + full-bleed torn-paper seam
> - **Projects** — 6-cell teal-splash grid (5 tiles + next-in-production card) with dateline label + 3 pencil annotations + torn-paper edges
> - **About Teaser** — eyebrow + italic Newsreader editorial line + dated proof beat + CTA + 10-card swipeable character-deck (vanilla JS, pointer events + rAF, reduced-motion fallback, keyboard nav)
> - **Universal footer** — 3-column wire-service (Contact / Subscribe / Dashboard) + LIGHT · DARK theme toggle
>
> `npm run build` produces 6 static pages (1 home + 5 `/work/[slug]/` stubs) plus `sitemap-index.xml`. ~40 incremental commits.
>
> **Your job this session: produce the Phase 3a implementation plan via `superpowers:writing-plans`, plus a Phase 3 backlog document that stubs the remaining sub-phases (3b/3c/3d).** Phase 3 is too large to fit in one plan (~60–80 tasks across 7 surfaces); the right approach is to phase it and write one sub-plan in detail per session.
>
> ### Recommended phasing (validate before locking)
>
> | Sub-phase | Scope | Why this order |
> |---|---|---|
> | **Phase 3a** | Site-chrome completion (sticky top nav rendering on sub-pages) + `/404` page + `/contact/` minimal route + v1.1 polish carry-overs (hero floor-shadow alignment, midway tossed-card rotation flip on swipe fly-out). | Every other Phase 3 surface (case-study, transactions, architecture, essays, about) inherits the top nav. Build the nav once; subsequent plans consume it. |
> | **Phase 3b** | Case-study page body for `/work/[slug]` — full implementation per case-study-spec (replaces the current Phase 2 stub). 5 case studies × ~1–2k words each is a separate content-authoring task Sean owns post-plan; this sub-phase ships the page structure + MDX components + view transition. | The 5 work tiles already link here; recruiters click these first. Highest-value surface after home. |
> | **Phase 3c** | `/transactions/` index + `/<surface>/` + `/<slug>/` routes + RSS feed (transactions-spec). Then `/architecture/` and `/essays/` follow the same pattern (one plan, three collections — they share most of the build). | The three collection routes are structurally near-identical; planning them together cuts the per-surface overhead by ~60%. |
> | **Phase 3d** | `/about/` page — about-spec is the most decorative-heavy spec (Saturday-morning cartoon cels, full character figure, lead-line typography, pulse strip, timeline). Worth its own plan. | Standalone surface; doesn't block anything else; ships last so the rest of the site is settled around it. |
>
> If you disagree with this phasing, propose your own and proceed — Sean's standing rule is "make the reasonable call and continue."
>
> ### Read in this order before invoking the skill
>
> 1. [`CLAUDE.md`](CLAUDE.md) — orientation, template trap, voice rules, status table
> 2. [`docs/specs/BLUEPRINT-COMPLETE.md`](docs/specs/BLUEPRINT-COMPLETE.md) §6 — Phase 3 + Phase 4 hand-off contract
> 3. [`docs/specs/site-chrome-spec-v1.md`](docs/specs/site-chrome-spec-v1.md) §6 (the nav) + §9 (/contact/) + §10 (/404) — Phase 3a primary specs
> 4. [`docs/specs/case-study-spec-v1.md`](docs/specs/case-study-spec-v1.md) — Phase 3b primary spec
> 5. [`docs/specs/transactions-spec-v1.md`](docs/specs/transactions-spec-v1.md) — Phase 3c primary spec (the other two collection specs follow the same shape)
> 6. [`docs/specs/architecture-spec-v1.md`](docs/specs/architecture-spec-v1.md) + [`docs/specs/essays-spec-v1.md`](docs/specs/essays-spec-v1.md) — sibling Phase 3c specs
> 7. [`docs/specs/about-spec-v1.md`](docs/specs/about-spec-v1.md) — Phase 3d primary spec
> 8. [`docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md`](docs/superpowers/plans/2026-05-21-phase-2-foundations-hero-projects.md) and [`2026-05-21-phase-2b-home-about-teaser.md`](docs/superpowers/plans/2026-05-21-phase-2b-home-about-teaser.md) — the structural template the new plans should mirror (section-by-section task list with verbatim file contents, DoD pass-through at the end, §10 deferral table)
>
> ### v1.1 polish items to fold into Phase 3a's pre-flight section
>
> Three small polish items Phase 2/2b deferred. Fold them in early so Phase 3a ships them and Phase 3b+ doesn't inherit the debt:
>
> 1. **Hero floor-shadow alignment** — TODO inline at [`src/components/hero/CharacterLane.astro`](src/components/hero/CharacterLane.astro). Lands at ~80% viewport vs the desk's ~78%. Fix is either (a) re-crop the shadow PNG so its alpha centroid aligns with the desk-foot center (the shadow's current alpha centroid is at 49% per `python3 -c "from PIL import Image; ..."` — see Phase 2 commit `397515f` for the diagnostic) or (b) per-viewport-width calibration via CSS `@media` breakpoints. Either approach is ≤30min.
> 2. **Midway tossed-card rotation flip on swipe fly-out** — Phase 2b's swipe controller does a linear fly-out (constant rotation direction across 300ms). Spec §6.2 calls for the rotation to flip opposite at the midway point for a "tossed-card tumble" feel. Fix is a `@keyframes` step in `TeaserCard.astro`'s `.is-flying-out` rule with a midway rotation reversal — no JS changes needed.
> 3. **Subagent harness reliability** — Phase 2 and Phase 2b both attempted `subagent-driven-development` and both hit hallucinations / context-overflow in the implementer subagent. Direct controller execution worked. Phase 3a should default to direct controller execution unless the harness has improved. Note this in the plan so future executors don't waste cycles re-attempting subagents.
>
> ### Scope boundaries
>
> - **In Phase 3a (the plan you write this session):** sticky `<SiteNav>` component (wordmark + 5 tabs + active-route highlighting + mobile wrap behavior) per site-chrome §6, BaseLayout integration (respect `noChrome={true}` on home, render on all sub-pages), `/404.astro` per site-chrome §10, `/contact.astro` per site-chrome §9, the 3 v1.1 polish items above.
> - **In Phase 3 overall (subsequent sub-plans):** case-study body, 3 collection routes, RSS feeds, about page.
> - **Out of Phase 3 entirely (Phase 4):** Daily Driver agent writers for `dateline.json` / `next-piece.json` / `about-pulse.json`, Plausible analytics, Vercel deploy, custom domain DNS.
> - **Out of scope full-stop (deferred indefinitely):** hand-authored Procreate substrate (paper-tile / tear-edge / floor-shadow); Pillow substitutes ship as v1.
>
> ### Branch state + operating preferences (from CLAUDE.md + Sean's standing rules)
>
> - **Branch:** Currently on `phase-2-foundations`. 16 commits ahead of `origin/phase-2-foundations`. No `git push` has been performed. Sean's standing rule is "Sean works on `main`" but Phase 2 + 2b accumulated on the branch — Sean may want to fast-forward `main` before Phase 3 starts, or keep accumulating on the branch. **Do not switch branches without explicit confirmation** (checking out `main` would erase the Phase 2/2b contents from the working tree).
> - Tasks small enough for one execution unit each (1–2 files, verbatim file contents in the plan body so the implementer doesn't need to think).
> - Each task commits atomically; ~30–60 incremental commits per sub-plan is the target shape.
> - No `git push` unless Sean explicitly asks.
> - Visual verification at each section boundary (Playwright via the `mcp__plugin_playwright_playwright__*` tools or `curl` + DOM inspection — your call).
> - Continuous execution. Don't pause to check in between tasks; surface BLOCKED status only if genuinely stuck.
> - The template trap is the enemy. Every component decision passes *"is this drifting toward the design-system-viewer or luxury-minimal-PM template?"* If yes, stop and reconsider against the spec.
>
> ### Deliverables (this session)
>
> 1. **Primary:** `docs/superpowers/plans/2026-05-21-phase-3a-site-chrome-completion.md` — full plan mirroring Phase 2 / 2b structure: section-by-section task list with verbatim file contents, DoD pass-through against site-chrome §18 items 1–7 + §17 + §15 (404) + §14 (/contact/) + the 3 v1.1 polish DoD checks, and an explicit §X deferral table noting Phase 3b/3c/3d as the handoff. Aim for 25–40 tasks.
>
> 2. **Secondary:** `docs/superpowers/plans/2026-05-21-phase-3-backlog.md` — a short backlog doc (1–2 pages) stubbing Phase 3b / 3c / 3d with: scope summary, primary specs, rough task count estimate, key dependencies on Phase 3a. This is the hand-off doc for the NEXT planning session — it should be self-contained enough that Sean can paste it into a future session to kick off Phase 3b without needing this entire kickoff prompt again.
>
> 3. **NOT this session:** execution. Once the plan + backlog are written and committed, **stop.** Execution is a separate session.
>
> ### Pre-flight checks the planning session must run
>
> Before invoking `superpowers:writing-plans`:
>
> - Confirm `npm run dev` works and `http://localhost:4321/` returns 200 (the site is in a known-good state to plan against)
> - Confirm the current branch with `git branch --show-current` (expect `phase-2-foundations`)
> - Confirm no uncommitted changes with `git status` (expect clean tree)
> - Note the HEAD SHA so the resulting plan references it as the baseline
>
> Invoke `superpowers:writing-plans` now.

---

## What this prompt assumes is already true

(For Sean's reference — these are the preconditions a new session should be able to verify quickly via `git log` and `ls`.)

- Branch `phase-2-foundations` at HEAD `10c18e5` (Phase 2b last commit) — 16 commits ahead of remote, including the bundling commit `9271914`, Phase 2 fixes, and the full Phase 2b implementation
- `localhost:4321` serves home with hero + projects + about-teaser + footer when `npm run dev` runs
- All 9 surface specs are LOCKED (cross-check the status table in `CLAUDE.md`)
- The Phase 2 + Phase 2b plans at `docs/superpowers/plans/2026-05-21-phase-2-*.md` are the structural templates the new plans must mirror
- v1.1 polish items are explicitly known and ready to be folded into Phase 3a's pre-flight (no hidden polish debt)
- Subagent dispatch via `superpowers:subagent-driven-development` is **unreliable in the current harness** — Phase 2 and 2b both fell back to direct controller execution after the implementer subagent hallucinated context constraints twice. Phase 3a should plan around direct execution; subagent dispatch can be re-attempted if the harness behavior improves.

---

## After the planning session ships

Two paths forward:

1. **Execute Phase 3a immediately** (same session or next session) — open the resulting `phase-3a` plan and proceed task-by-task using direct controller execution.
2. **Park Phase 3a for later** — the plan stays on the branch as a buildable artifact. Sean's standing rule "make the reasonable call" applies; the executor doesn't need to wait for explicit approval to start.

If `/main` consolidation is desired before Phase 3a execution, that's a `git push origin phase-2-foundations:main --force-with-lease` (or merge + push) operation — surface it explicitly and get Sean's confirmation before performing.
