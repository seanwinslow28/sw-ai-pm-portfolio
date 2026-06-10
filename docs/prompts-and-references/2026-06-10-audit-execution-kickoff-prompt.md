# Kickoff — Execute the 2026-06-10 Audit's Remaining Fixes + Upgrades

You are a senior design engineer executing the follow-ups from a completed launch-grade audit of my AI-PM portfolio (Astro 5 + Tailwind 4, deployed to seanwinslow.com via Vercel). The audit itself is DONE: 18 fixes are already implemented, verified, and committed on the branch `audit/2026-06-10-impeccable-fable` (1 commit, cut from `origin/main`). Your job is to plan and execute everything the audit deliberately did NOT build, in approval-gated phases.

Start in plan mode. Read everything in <read_first>, then present a phased plan and ask me the decision questions in <decisions> before writing any code.

<read_first>
1. `docs/audits/2026-06-10-fable-impeccable-audit.md` — the audit report. This is your work order. §3 "Proposed / reported" + §4 levers 2–5 + §5 delight menu are the backlog; §6 "What's strong" is the do-not-break list; §7 "Dismissed" are settled non-issues — do not re-litigate them.
2. `CLAUDE.md` — orientation + locked decisions + the template trap.
3. `DESIGN.md` — the design constitution (Named Rules + Don't list are hard constraints).
4. `git log --oneline -10 audit/2026-06-10-impeccable-fable` and `git show --stat audit/2026-06-10-impeccable-fable` — what the audit branch already contains, so you don't redo or undo it.
5. Skim the relevant `docs/specs/*-spec-v1.md` only when a task needs adjudication; spec changes are logged in `CHANGELOG.md` (read its "How to add an entry" header), never silently.
</read_first>

<operating_rules>
Carried over from the audit — they exist because prior critiques chased phantom bugs off bad artifacts:
- All visual verification happens against a fresh `npm run build` + `npm run preview`, never `astro dev`. Dismiss the hero overlay via `sessionStorage.setItem('hero-overlay-shown','true')` before judging the hero.
- Verify every change against the human-visible symptom (screenshot / rendered DOM), not the proxy.
- Never touch `public/api/*.json` (Daily Driver's data — report issues, don't edit).
- Branch off `audit/2026-06-10-impeccable-fable` (so this work stacks on the audit fixes), e.g. `feat/2026-06-10-audit-execution`. Never commit to `main` — Vercel auto-deploys it and the Daily Driver commits to it every morning.
- DESIGN.md bans in force: two fonts + Caveat only, no #000/#fff, no gradients on chrome, no gradient text, no decorative blur/glass, no >1px colored side-stripes, sharp corners (2px pills only), flat by default, one splash per section, light mode only, no em dashes in editorial prose (wire-service surfaces exempt).
- The three load-bearing things (character, voice, daily-dated honesty layer) get strengthened, never weakened.
- New art is generated via `.claude/skills/gemini-pencil-animation-image-gen`, anchored to `reference-images/2D-Character-Sketch-Sean-v1.png` (API keys in `.env`). Every generated asset gets my visual sign-off before it's wired into a page.
- Run `npm run build` + `npx astro check` + `npm run validate` green after each phase. Log every spec deviation or DESIGN.md amendment in `CHANGELOG.md`.
</operating_rules>

<phases>
Phase 0 — Ship the audit branch. Confirm `audit/2026-06-10-impeccable-fable` still rebases cleanly onto current `origin/main` (the Daily Driver commits daily — if main moved, rebase and re-verify build + the date-bearing surfaces). Open a PR to `main` titled for the audit commit; I merge it myself. Then cut the execution branch from it.

Phase 1 — Conformance fixes (pre-approved, no questions needed):
- P2-09a: give `.case-study` the paper-tile texture + `.page-sheet` treatment (kills the only raw-flat-cream surfaces; verify the texture visibly tiles and z-stacking still matches the 0/10/11/12/20/30 map).
- P3-16: radius/shadow sweep — `ReturnConditionCallout`, `BoardArtifact` ticket card, Try-It `pre`, `/work/` row thumbs (drop the 2px radii to 0 and the stray 1px shadow), per the Sharp-Corners Rule.
- P3-18: comfortable tap-target padding on footer links at the mobile breakpoint (visual rhythm unchanged at desktop).
- P3-14: the doc-reconcile pass — log the hero tagline clamp drift, NIP hover-border 0.85, and meta-strip shadow vocabulary in CHANGELOG (and design.json shadow vocabulary if you amend it); update the texture-spec's stale `hero-floor-shadow.png` reference note via CHANGELOG entry (don't rewrite spec bodies).

Phase 2 — Decisions I'll answer up front (see <decisions>), then implement whichever I pick.

Phase 3 — Conversion levers + delights (each gated on a visual checkpoint):
- Lever 2 / delight 1: rubber-stamp treatment for the home dateline's BOSTON stamp (slight rotation + ink texture, once, home only). Build 2–3 CSS-only variants behind a scratch page or screenshots, show me, I pick one or reject all. The hero is LOCKED — nothing lands without my explicit yes, and the calm paper-on-chrome layout must not move.
- Lever 3 / delight 3: character close-out beat on all 5 case studies (static pencil pose above the prev/next nav). Generate candidates with the gemini skill; I approve the art; wire it per the Character-on-Every-Key-Surface rule; reduced-motion-safe (it's static anyway); lazy-loaded with explicit dimensions.
- Lever 4: restyle About "Proof points" into labeled rows with human display text (e.g. "LinkedIn — Sean Winslow" instead of the raw `sean-winslow-204390a5` slug). Stay in the wire-service register; voice-check the labels.
- Delight 2: Caveat margin annotations in the case-study right rail ("this is the cut →" beside the dated cards). Annotations are signal, not pattern — max 1–2 per case study, and only where the annotation says something true about the artifact next to it.
- Delight 5: 404 pencil-test doodle (one cel, character at an empty desk). Same art-approval gate.

Phase 4 — Verification + handoff. Fresh build + preview sweep of every touched route (desktop 1440×900 + mobile 390×844), `astro check` 0 errors, validators green, Lighthouse spot-check ≥ the audit's post-fix scores (a11y stays 100), screenshots of each new element, CHANGELOG entries complete, PR opened with a summary that maps each change to its audit finding ID. Nothing on main.
</phases>

<decisions>
Ask me these via your question tool at the start (after reading, before coding). My audit-report agreement pre-approves Phase 1; these are the genuinely open calls:
1. **P2-09b sub-page teal:** (a) scope the Committed-Teal Named Rule to the home page in DESIGN.md (doc-only, log in CHANGELOG), or (b) add a chrome-reveal tear seam above the footer on sub-pages (visual change, show a mockup first), or (c) both.
2. **P3-13 infinite animations:** license `live-pulse` (status semantics, already omitted when stale) and `swipe-me-bob` (functional swipe affordance) in DESIGN.md's motion vocabulary, or kill one/both.
3. **P3-15 amber-mid annotation marks on paper:** license as a "ghost watermark" exception in DESIGN.md, or move them to `--border-paper`.
4. **D-6 carryover (5/30 P3-A):** the `B-n ·` spec-code kickers on /about/ — keep as intentional internal-labeling brand (and resolve the spec-vs-DESIGN.md color conflict by licensing it), or drop the `B-n ·` prefixes from the public DOM.
5. **Scope check:** which of Phase 3's five items do I want this session vs deferred?
</decisions>

<out_of_scope>
- `public/api/*.json` and anything the Daily Driver writes (P3-17 is handled manually in the code-brain repo, not here).
- P3-19 Mermaid prerendering (explicitly fine as-is).
- Everything in audit §7 Dismissed.
- Rewriting locked spec bodies (deviations go in CHANGELOG).
</out_of_scope>
</phases>

Deliverable: the executed phases on a branch, a PR to `main` I can review, CHANGELOG entries, and a short closing summary mapping each change to its audit finding ID with verification evidence.
