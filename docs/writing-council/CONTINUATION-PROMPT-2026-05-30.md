# Continuation prompt — v1 remediation apply (fresh Claude Code session)

*Paste everything in the fenced block below into a fresh Claude Code session opened at the repo root (`/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`). It's written to drive `superpowers:executing-plans`, with a `superpowers:writing-plans` fallback if the session judges the plan needs decomposition first.*

---

```
You are continuing the seanwinslow.com v1 remediation apply. This is an EXECUTION session — you will edit files, commit per chunk, and drive toward a single PR. Sean has ratified the plan; the lock docs are approved canon.

═══════════════════════════════════════════════════════════════
STEP 0 — ORIENT (read these in order, in full, before touching anything)
═══════════════════════════════════════════════════════════════
1. CLAUDE.md — three load-bearing things (character / voice / daily-dated layer) + the template-trap warning + locked decisions.
2. docs/specs/SHIP-PLAN-2026-05-29.md — THE authoritative plan: streams S1–S6, decisions D1–D11, sequencing §3, launch gate §5, risk §6. Read it end-to-end.
3. docs/writing-council/POST-BRAINSTORM-KICKOFF-2026-05-30.md — execution kickoff with per-stream notes.
4. docs/writing-council/IMPLEMENTATION-PROMPT-2026-05-28.md — the lock-apply spine: §4 apply order, §6 commit strategy, §7 dev-QA checklist, §9 unexpected-state protocol.
5. The 11 lock docs in docs/writing-council/*.md — read each IN FULL only when you are about to apply it.

═══════════════════════════════════════════════════════════════
STEP 1 — CHOOSE YOUR SKILL
═══════════════════════════════════════════════════════════════
The SHIP-PLAN is strategic and the IMPLEMENTATION-PROMPT is tactical, but the remaining work is not yet a discrete task-list with independently-verifiable checkpoints.

- If after reading you can execute directly against IMPLEMENTATION-PROMPT §4 + SHIP-PLAN §2/§3, invoke `superpowers:executing-plans` and treat those as the plan.
- If you judge it needs decomposition first (RECOMMENDED given the reconciliation complexity + the hero spec-change + the union ledger), invoke `superpowers:writing-plans` to author `docs/superpowers/plans/2026-05-30-v1-remediation-apply.md` from the SHIP-PLAN + lock docs, THEN `superpowers:executing-plans` to run it.
- Also use `superpowers:verification-before-completion` before any "done" claim, and `superpowers:systematic-debugging` for any bug.

Tell Sean which path you chose and your task sequence BEFORE editing files.

═══════════════════════════════════════════════════════════════
STEP 2 — CURRENT STATE (don't redo finished work)
═══════════════════════════════════════════════════════════════
Branch: feat/v1-remediation-apply  (work HERE — never on main. ONE PR to main at the very end; ASK Sean before opening it. Nothing is pushed yet.)

ALREADY COMMITTED & lock-aligned — do NOT redo:
- Architecture lock #6: vault-knowledge-mcp.mdx → vault-scorecard.mdx (full surface: scoreboard, 4Q body, ERD updated to the real concept_edges schema, live upstream URLs) + essays/transactions cross-link backfills to vault-scorecard.
- transactions/enterprise-data-readiness-matrix.mdx (the D9 row).
- All 5 re-authored tile SOURCE assets in assets/projects-tiles/ (+ prompts, old/ archive).
- AGENTS.md + .agents/ (Codex mirror); the planning docs (SHIP-PLAN, kickoff, tile brainstorm, this prompt).

UNCOMMITTED:
- src/content/transactions/vault-scorecard.mdx (the 6th ledger row, untracked) — commit it as part of the transactions step.

WORK REMAINING (order per SHIP-PLAN §3 + IMPLEMENTATION-PROMPT §4):
A. S1 Stage 1 Foundations — locks #1 (about, remove <RecruiterCallout/>), #2 (5 case-study openers + frontmatter date/anchor corrections + 08:45→08:30), #3 (4 taglines), #4 (3 four_q blocks + A-4 opener amendment + About B-2 ¶1 swap). PLUS display-title swaps D7 (A-1 → "Anima") + D10 (A-5 → "16BitFit"), keeping slugs.
B. S5 stale-data — Daily Driver JSON refresh + 08:45→08:30; wire DatelineLabel.astro:10 (hardcoded 2026-05-21). Coordinate with #2's 08:45 fix (don't double-edit).
C. S1 Stage 3 Cleanup — locks #9 (the-block), #10 (investigation boards A2/A3/A5), #11 (methods strips ×5).
D. CEILING-GREP CHECKPOINT (see guardrails).
E. S1 Stage 2 Transactions — lock #5 page chrome (subhead, dateline templates, pull-quote rules) + the UNION rows (D11): verify + add knowledge-loop-phase-6, vault-synthesizer-eval-suite, substack-drafter; commit the already-authored vault-scorecard row; add "infra" to FilterPills + the [surface] route if absent.
F. S1 Stage 2 Essays — lock #7: schema amendment FIRST (roleMap jdUrl optional + isNegativeSpace), then content staged status: DRAFT.
G. S1 Stage 2 Site chrome — lock #8: nav/footer/BaseLayout, dark-mode wipe (terminal), F-2 footer staging, /contact + /404. FOLD email D4 (below).
H. S2 Hero — Issue B loading choreography (D6) + hero-title change (D8). Spec amendment + CHANGELOG FIRST.
I. S3 Tile integration — optimize the 5 source PNGs → WebP, 4:5 crop, place at public/assets/projects/<slug>.webp, update hero_media_alt (A-1 alt no longer "mascot walk cycle"), verify View-Transition morph.
J. S1 Stage 4 OG cards — essays title "Access vs Meaning"→"Access Over Meaning"; rename vault-knowledge-mcp.png→intent-engineering-mcp.png + URL fix; delete orphan.
K. Full dev QA (IMPLEMENTATION-PROMPT §7) + npm run prebuild && npm run build, then ASK Sean before the PR.
(Do NOT run S6 deploy — that's Sean's Vercel/Cloudflare/LinkedIn clicks behind a private-preview review gate.)

═══════════════════════════════════════════════════════════════
STEP 3 — DECISIONS TO HONOR EXACTLY (SHIP-PLAN §1.3, D1–D11)
═══════════════════════════════════════════════════════════════
- D4 EMAIL → sean.winslow28@gmail.com. Edit src/lib/site.ts:9 + the hardcoded leak in src/pages/contact.astro:17 (meta description). ALSO update the lock record so it never reverts: docs/writing-council/site-chrome-prose-locked-2026-05-28.md + docs/specs/BLUEPRINT-COMPLETE.md (OPEN-5) + CLAUDE.md "Locked decisions".
- D7 A-1 display title → "Anima"; D10 A-5 display title → "16BitFit". DISPLAY TITLES ONLY — keep slugs animation-pipeline / 16bitfit. Do NOT rewrite the locked prose (it's already anima-aware: "the pipeline is called *anima*"). Also fix the literal "16BitFit Battle Mode" in src/pages/work/index.astro.
- D8 HERO TITLE → "The agents handle the loops. I handle the taste." (drop the "Product Manager." line) + enlarge the /AI PRODUCT MANAGER role tag so the role reads immediately. Update CLAUDE.md locked decision + hero-spec tagline section + CHANGELOG + any tagline byte-match in scripts/validate_about.mjs (run npm run prebuild to confirm) + the IMPLEMENTATION-PROMPT §7 QA string.
- D11 TRANSACTIONS LEDGER = UNION (curated): keep vault-knowledge-mcp + vault-scorecard + enterprise-data-readiness-matrix AND add lock #5's knowledge-loop-phase-6 + vault-synthesizer-eval-suite + substack-drafter. Verify each lock-#5 row's upstream exists before adding; stage inline-body 4Q per lock #5's note where no explanationUrl exists.
- D5 ESSAYS staged status: DRAFT (publish_target 2026-06-19 does not gate launch).

═══════════════════════════════════════════════════════════════
STEP 4 — GUARDRAILS
═══════════════════════════════════════════════════════════════
- RECONCILIATION, NOT GREENFIELD. The collections already exist with divergent 5/24 content. When on-disk structure ≠ a lock doc's expectation, follow IMPLEMENTATION-PROMPT §9: match by field name + section heading (not line number), trust the lock string over your priors, and log anything ambiguous to docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md for Sean's post-apply review.
- CEILING GREPS after Stage 1 AND after Stage 3: iPad ≤3 · "Comprehension is the artifact" ≤3 · "Building got cheap" ≤2 · HybridRouter in methods[] arrays ONLY · no fixed Code-Brain skill/agent/hook counts · no tenure-foregrounding · no traces-of-desperation cadence.
- S2 HERO: amend hero-spec §6/§7.5/§7.5.5 + tagline section and log a CHANGELOG entry BEFORE coding. The loading overlay must be ADDITIVE (hero renders underneath from first paint; the cream #FFF9F0 full-viewport overlay cycles the 8 bg-removed icons from reference-images/hero-icons/background-removed/, normalized to a consistent transparent canvas + exported WebP, then fades out). Once-per-session via sessionStorage. Under reduced-motion/no-JS the overlay does NOT mount and the hero shows immediately with no <video> in DOM (preserve commit ad64ce1). Re-verify with Playwright: querySelector(".character-video") → null AND hero visible immediately when the overlay is suppressed. Sequence global.css/BaseLayout touches in series with lock #8.
- SEAN HAS FINAL VOICE AUTHORITY on every locked string. Surface — don't guess — anything that feels wrong or diverges from disk.
- COMMIT per coherent chunk, referencing the lock-doc filename in the message (per IMPLEMENTATION-PROMPT §6). Run npm run prebuild && npm run build before claiming any stage done. Do NOT push. Do NOT open the PR or run any deploy step without Sean's go.

═══════════════════════════════════════════════════════════════
STEP 5 — HOLD POINTS (stop and ask Sean)
═══════════════════════════════════════════════════════════════
- Whether each lock-#5 union fleet row (knowledge-loop-phase-6 / vault-synthesizer-eval-suite / substack-drafter) has real upstream content vs. stages inline.
- Any lock string that doesn't match disk (per §9).
- Before opening the PR to main; before any S6 deploy step.

LAUNCH GATE: do not proceed toward deploy until all 8 criteria in SHIP-PLAN §5 are green + Sean's no-template-feeling gut-check (PMP §1.3).

Begin with STEP 0, then report your skill choice (STEP 1) and proposed task sequence for Sean's confirmation before editing files.
```
