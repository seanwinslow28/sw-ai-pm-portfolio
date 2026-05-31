# Post-Mortem — seanwinslow.com v1 Remediation Apply

**Date:** 2026-05-30
**Branch:** `feat/v1-remediation-apply` → `main` (PR #12, merged 2026-05-30, 23 commits)
**Scope:** Apply 11 writing-council lock docs + 11 brainstorm decisions (D1–D11) to disk; integrate 5 project tiles (S3); reverse the hero loading choreography (Issue B / D6); fix stale daily-dated data (S5) + OG cards (S4); harden cross-link cache infra.
**Outcome:** Shipped to `main`, build green at 28 pages, sitemap + 3 RSS feeds on apex `seanwinslow.com`. No production incident — this was a pre-deploy remediation. Deploy (S6) remains Sean's manual step.

> Reconciliation log of record: [`docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md`](../writing-council/IMPLEMENTATION-NOTES-2026-05-30.md) (NOTE-1..NOTE-6). This post-mortem summarizes and draws lessons; the notes carry the per-row detail.

---

## 1. Summary

The v1 build had drifted: nine locked surfaces had council-authored prose and decisions (D1–D11) that were never reconciled to disk, the build was **red** at baseline, the project tiles and OG cards were stale/mislabeled, and the daily-dated layer had frozen dates. This session reconciled all of it on one branch, fixed a build-breaking infra bug, and landed a single PR.

The headline failure was **a latent content-collection infra bug that a lock doc surfaced and turned into a hard build break** (BLOCKER-1). Everything else was lower-severity drift: hallucinated/mislabeled content from the council passes, art-vs-copy divergence, and stale generated data.

---

## 2. What failed (and severity)

### F1 — Build red at baseline: architecture canonical-fetch collided with the collection glob *(High)*
`npm run build` failed before any apply edits. Architecture lock #6 set `essaySourceUrl`/`explanationUrl` to GitHub **`/blob/` HTML URLs**, and `fetch_canonical_sources.mjs` wrote the fetched body into `src/content/architecture/essays/` — **inside the architecture content-collection glob**. Astro loaded the frontmatter-less cache file as a malformed entry → `InvalidContentEntryDataError`. The `prebuild` lifecycle hook runs the fetch before every build, so this broke *every* build. A second, independent bug: `[slug].astro` rendered the fetched markdown via `set:html` (raw injection, no md→html), so even a correct raw URL would have rendered broken.

**Why it surfaced now:** architecture was the only collection with non-null canonical URLs (essays already used the `null` inline-fallback). Lock #6 flipped the URLs non-null and exposed the latent bug.

### F2 — Same failure class lurking in the cross-link cache *(Medium)*
`derive_crosslinks.mjs` wrote `.crosslinks.json` **inside** each content-collection dir (`transactions/`, `architecture/`, `essays/`). Gitignored, but structurally the same trap as F1 — generated files sitting inside collection globs.

### F3 — Council passes generated hallucinated / mislabeled content *(Medium)*
The multi-model writing-council that authored the locks produced artifacts that didn't survive audit: fabricated/composed investigation-board artifacts, fixed Code-Brain counts ("118 skills"), future-dated artifacts, placeholder copy, and over-quota repeated phrases (the "ceiling" terms). These had to be caught and corrected during apply, not trusted verbatim.

### F4 — Asset/copy divergence: A-4 tile ≠ its locked alt-text *(Low, open)*
The delivered `A-4_The-Block.png` depicts a 4-monitor financial-charts study; lock #9 had rewritten A-4's alt to a "multi-surface PM composite" (skill cards + RevOps pipeline + x402 memo). Art was authored on a separate track from the copy lock, and the two never reconciled. Alt was written to the *delivered* art; the keep-vs-re-author decision is still open with Sean.

### F5 — OG card generator: copy-paste mislabel + stale title + non-reproducible fonts *(Low)*
`vault-knowledge-mcp.png` contained Intent Engineering MCP content with the wrong slug URL (a Phase-0 generator copy-paste error); the essays card title was the pre-lock "Access vs Meaning." Separately, `generate_og_cards.py` depended on fonts at `/tmp/og-fonts` with **no fetch step in the script** — not reproducible from a clean machine.

### F6 — Stale daily-dated layer *(Low)*
The "unfakeable differentiator" had frozen: API JSON dated 2026-05-21, an `08:45` that should be `08:30`, and a hardcoded date in `DatelineLabel`. The honesty of the dated layer is load-bearing, so stale dates are a credibility bug, not cosmetic.

### F7 — Parallel-edit ownership ambiguity at PR time *(Low, process)*
Four tracked files (the F2 refactor) appeared modified in the working tree mid-session from Sean's concurrent IDE edits. They weren't part of the plan's task list and risked being either silently absorbed or orphaned.

---

## 3. How each was resolved

| # | Resolution |
|---|---|
| **F1** | Sean's **Option B**: set the two architecture canonical URLs to `null`, rendering the complete authored inline body via `<Content />` (proper md→html) — matching essays' proven fallback. Unblocked the build; deferred the live-upstream-fetch infra (path relocation + md→html render) to v1.1. |
| **F2** | Relocated the derived cross-link cache to top-level **`.cache/`** (already gitignored) and repointed the 3 `[slug].astro` readers. Removes the files from the collection globs entirely. |
| **F3** | **Ceiling greps as a standing gate**, run after Stage 1 *and* Stage 3 (iPad ≤3, "Comprehension is the artifact" ≤3, "Building got cheap" ≤2, HybridRouter in `methods[]` only, no fixed counts). Trusted the lock *string* over priors; logged every deviation to IMPLEMENTATION-NOTES. |
| **F4** | Wrote accurate alt to the delivered art; **logged NOTE-6 and surfaced to Sean** rather than guessing intent. Decision held open. |
| **F5** | Fixed the generator (`card_vault_knowledge_mcp` → `card_intent_engineering_mcp`, correct output filename + URL; essays title → "Access Over Meaning"); regenerated all 4 cards, synced authored `reference-images/` → served `public/`, deleted the orphan. Fonts fetched from Google Fonts to rebuild. |
| **F6** | Refreshed API JSON to 2026-05-30, `08:45 → 08:30`, wired `DatelineLabel` off `dateline.json`. |
| **F7** | Verified the edits were build-green + gitignore-clean, committed them with an honest attribution message, and **flagged them explicitly in the PR + handoff** with an offer to drop the commit. |

**Verification discipline that caught/confirmed fixes:** Playwright re-verify of the hero reduced-motion contract (`.character-video` null + overlay suppressed + hero visible immediately) and once-per-session overlay; a 12-route dev sweep asserting status anchors (A-1 ACT1/ACT2, A-2 08:30, A-3 SHIPPED, A-4 ARCHIVED no-ref-link, A-5 PAUSED/APR 20/2 KILLED); zero-broken-resource network check; `prebuild && build` green with apex URLs in sitemap + RSS.

---

## 4. What we learned

1. **Generated files must never live inside a content-collection glob.** F1 and F2 are the same root cause. Astro will try to parse any matching file as an entry. Caches, fetch bodies, and derived JSON belong in `.cache/` or another non-globbed location — full stop.
2. **A lock doc can be a *trigger*, not the *cause*.** Lock #6 didn't introduce the fetch/glob bug; it was latent and only architecture's non-null URLs exposed it. When a config change breaks a build, check for pre-existing fragility the change merely *surfaced* before "fixing" the change.
3. **Multi-model council output is a draft, not a source of truth.** It hallucinates confidently (fake artifacts, invented counts, future dates). The value is breadth; the cost is mandatory audit. The ceiling greps + per-stage checkpoints turned "trust" into "verify cheaply."
4. **Art and copy authored on separate tracks will diverge.** F4 happened because tile art and alt-text locks moved independently with no reconciliation gate. The honest alt is the one that describes what shipped — but the gap should have been caught at art-delivery, not at integration.
5. **A running reconciliation log pays for itself.** IMPLEMENTATION-NOTES (NOTE-1..NOTE-6) made every deviation auditable by Sean post-hoc and made this post-mortem a summarization job, not an archaeology dig. "Match by field name + heading, trust the lock string, log the ambiguity" is the right reconciliation protocol.
6. **Asset-generation scripts must be reproducible from clean.** F5's `/tmp/og-fonts` dependency means the OG cards couldn't be regenerated without tribal knowledge. Scripts should fetch or vendor their inputs.
7. **The reduced-motion contract is load-bearing and worth a real test.** The `ad64ce1` "no `<video>` in the DOM under reduced-motion" guarantee is the kind of thing that silently regresses in a refactor. Playwright assertion >> eyeballing.
8. **Surface parallel work, don't absorb it silently.** F7 ended well because the edits were flagged with an explicit veto path, not folded in quietly.

---

## 5. Next steps

### Decisions owed by Sean
- [ ] **A-4 tile** — keep the delivered financial-charts art (alt already matches) or re-author lock #9's multi-surface composite? (NOTE-6)
- [ ] **Voice review** — the 3 authored transaction 4Q bodies (`knowledge-loop-phase-6`, `vault-synthesizer-eval-suite`, `substack-drafter`) + the essays inline manifesto body (currently the 5/24 draft, not the 2026-05-21 voice-passed upstream).
- [ ] **S6 deploy** — Sean's manual clicks; run the recruiter 5s/30s/2min test + no-template-feeling gut-check (PMP §1.3) first.

### v1.1 engineering backlog
- [ ] **Live canonical fetch for architecture + essays.** Fix the two deferred bugs together: (a) relocate the fetch body-cache out of the collection glob (same as F2), (b) replace the `[slug].astro` `set:html` raw injection with real md→html rendering. Then flip `essaySourceUrl`/`explanationUrl` non-null. Until then, inline-body `<Content />` fallback is the supported state.
- [ ] **Make `generate_og_cards.py` reproducible** — add a font-fetch/vendor step so it runs from a clean checkout (F5).
- [ ] **vault-knowledge-mcp OG card + surface** — deferred until that surface ships (~2026-06-04) with its own title-lock.
- [ ] **Reconcile the `intent-engineering-mcp` transactions row** to lock #5 Row 3's "three tools / 23–25 dogfood" string (left as valid 5/24 content to avoid render churn — NOTE-4).
- [ ] **Daily Driver dateline templates** — the dateline/pulse JSON is computed in the `code-brain` repo, not here; track the template work there (NOTE-4).

### Process guardrails to institutionalize
- [ ] **Lint/CI check:** fail the build if any file matching a generated-cache pattern (`*.crosslinks.json`, fetch bodies) exists inside a `src/content/**` collection dir. Prevents F1/F2 from ever recurring.
- [ ] **Art-delivery reconciliation gate:** when a tile/asset is delivered, diff it against its alt-text/caption lock before marking the lock applied (F4).
- [ ] **Keep the ceiling-grep checkpoint** in any future council-authored apply (F3).
