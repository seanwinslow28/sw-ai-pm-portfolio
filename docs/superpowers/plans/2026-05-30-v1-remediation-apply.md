# seanwinslow.com v1 Remediation Apply — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. This is a **reconciliation** of divergent on-disk content against 11 lock docs — NOT greenfield. Read each lock doc IN FULL only when about to apply it. When on-disk structure ≠ a lock's expectation, follow IMPLEMENTATION-PROMPT §9: match by field name + section heading (not line number), trust the lock string over priors, log ambiguity to `docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md`.

**Goal:** Apply the 11 writing-council lock docs + 11 brainstorm decisions (D1–D11) to disk on `feat/v1-remediation-apply`, integrate 5 tiles, reverse the hero loading choreography, fix stale data + OG cards, ending at a single PR to main (Sean's go required).

**Architecture:** Astro 5 + Tailwind 4 content-collection site. Work proceeds in IMPLEMENTATION-PROMPT §4 stage order (Stage 1 foundations → Stage 3 cleanup → ceiling grep → Stage 2 new/divergent surfaces → Stage 4 OG), then S2 hero (spec amendment first), S3 tiles, then full QA. Each coherent chunk is one commit referencing the lock-doc filename.

**Tech Stack:** Astro 5, Tailwind 4, MDX content collections, Python+Pillow (OG cards + hero-icon prep), Playwright (hero reduced-motion verify), Node prebuild validators (`npm run prebuild`).

**Source-of-truth docs (re-read at apply time):**
- Plan authority: `docs/specs/SHIP-PLAN-2026-05-29.md` (D1–D11, §5 launch gate)
- Apply spine: `docs/writing-council/IMPLEMENTATION-PROMPT-2026-05-28.md` (§4 order, §6 commits, §7 QA, §9 unexpected-state)
- Kickoff deltas: `docs/writing-council/POST-BRAINSTORM-KICKOFF-2026-05-30.md`
- 11 lock docs: `docs/writing-council/*-locked-*.md`

**Branch:** `feat/v1-remediation-apply`. NEVER work on main. ONE PR at the very end — ASK Sean first. Do NOT push without Sean's go. Do NOT run S6 deploy.

**Cross-cutting decisions to honor exactly (SHIP-PLAN §1.3):**
- **D4 email** → `sean.winslow28@gmail.com` (4 places — see Task 7).
- **D7** A-1 display title → `Anima`; **D10** A-5 display title → `16BitFit`. DISPLAY TITLES ONLY — keep slugs `animation-pipeline` / `16bitfit`. Do NOT rewrite locked prose (already anima-aware).
- **D8 hero title** → `The agents handle the loops. I handle the taste.` (drop "Product Manager." line) + enlarge `/AI PRODUCT MANAGER` role tag.
- **D11 transactions** = curated UNION (verify each upstream first — HOLD POINT).
- **D5 essays** staged `status: DRAFT`.

**Voice ceilings (grep after Stage 1 AND after Stage 3 — Tasks 4 & 8):**
- iPad ≤3 · "Comprehension is the artifact" ≤3 · "Building got cheap" ≤2
- HybridRouter in `methods[]` arrays ONLY · no fixed Code-Brain skill/agent/hook counts · no tenure-foregrounding · no traces-of-desperation cadence.

**Hold points (STOP and ask Sean):** each union fleet row's upstream-vs-stage call (Task 5) · any lock string that doesn't match disk · before opening the PR · before any deploy.

---

## Pre-flight (one-time, before Task 1)

- [ ] **Step 1: Confirm clean tree + branch**

Run: `git status --short && git branch --show-current`
Expected: branch `feat/v1-remediation-apply`; only untracked `src/content/transactions/vault-scorecard.mdx`.

- [ ] **Step 2: Baseline build is green before any edits**

Run: `npm run prebuild && npm run build 2>&1 | tail -30`
Expected: build succeeds. If it FAILS at baseline, use superpowers:systematic-debugging to root-cause BEFORE editing — a pre-existing failure must not be confused with apply damage. Record the baseline result in IMPLEMENTATION-NOTES-2026-05-30.md.

- [ ] **Step 3: Create the implementation-notes log**

Create `docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md` with a header `# Implementation Notes — v1 remediation apply (2026-05-30)` and a `## Baseline` section recording Step 2's result. Append to it whenever on-disk ≠ lock.

---

## Task 1: S1 Stage 1 — About (lock #1 + #4 B-2 ¶1 swap)

**Files:**
- Modify: `src/content/about/index.mdx`
- Reference: `docs/writing-council/about-b1-b2-b4-locked-2026-05-25.md` (read in full), `docs/writing-council/project-four-q-locked-2026-05-27.md` (the B-2 ¶1 cross-doc tenure-deletion amendment)

- [ ] **Step 1: Read lock #1 in full** + the B-2 ¶1 amendment note inside lock #4. Note the apply checklist + the B-1 color rhythm `gradient → amber → amber → gradient → gradient → gradient`.

- [ ] **Step 2: Apply to `about/index.mdx`** — B-1 beats (6 entries), B-2 prose (3 ¶, ends "The sentence was the product."), B-4 prose (2 ¶, opens "Building got cheap. Comprehension didn't."), the B-2 ¶1 surgical word swap (tenure deletion per lock #4), and **remove `<RecruiterCallout />`**. Match by section heading, not line number.

- [ ] **Step 3: Verify the recruiter callout is gone + key strings land**

Run: `grep -n "RecruiterCallout" src/content/about/index.mdx; grep -n "The sentence was the product\|Building got cheap. Comprehension didn't\|Saturday morning cartoons and Vercel deployment logs" src/content/about/index.mdx`
Expected: zero `RecruiterCallout`; the three anchor strings present.

- [ ] **Step 4: Commit**

```bash
git add src/content/about/index.mdx
git commit -m "About B-1 + B-2 + B-4 locked content + recruiter italic removed + B-2 ¶1 tenure deletion per about-b1-b2-b4-locked-2026-05-25 + project-four-q-locked-2026-05-27 cross-doc amendment"
```

---

## Task 2: S1 Stage 1 — Case-study foundations (locks #2 + #3 + #4) + D7/D10 title swaps

**Files:**
- Modify: all 5 `src/content/work/*.mdx` (animation-pipeline, code-brain, intent-engineering-mcp, the-block, 16bitfit)
- Modify: `src/pages/work/index.astro` (D10 literal "16BitFit Battle Mode" → "16BitFit"; verify A-1 display)
- Reference: `case-study-openers-locked-2026-05-26.md` (read full incl. BOTH 2026-05-27 a/b amendments — later supersedes earlier), `project-taglines-locked-2026-05-26.md`, `project-four-q-locked-2026-05-27.md`

- [ ] **Step 1: Read lock #2 top-to-bottom** (amendments supersede earlier prose), lock #3, lock #4. Catalog the frontmatter corrections: A-3 timing `08:45 → 08:30`; A-1 + A-5 date corrections + A-1 anchor-metric swap (T2.1–T2.3); A-5 `date_active_through: 2026-04-20` + board `date="APR 20"`; A-4 opener ¶1+¶3 amendment.

- [ ] **Step 2: Apply openers** to all 5 `work/*.mdx` (3 locked ¶ each). Apply the A-4 opener ¶1+¶3 amendment from lock #4.

- [ ] **Step 3: Apply taglines** — replace 4 `tagline:` fields (A-1/A-2/A-4/A-5; A-3 already locked in CLAUDE.md, leave it). Verify against lock #3.

- [ ] **Step 4: Apply 4Q blocks** — replace 3 `four_q:` blocks (A-1, A-2, A-4) per lock #4. A-5 4Q audited clean — do NOT touch.

- [ ] **Step 5: Frontmatter date/anchor corrections** — apply T2.1–T2.3 (A-1/A-5 dates, A-1 anchor metric), A-3 `08:45 → 08:30`, A-5 `date_active_through: 2026-04-20`.

- [ ] **Step 6: D7 + D10 display-title swaps (titles only, slugs unchanged)** — `title:` on `animation-pipeline.mdx` → `Anima`; `title:` on `16bitfit.mdx` → `16BitFit`. Do NOT change `slug`/filename. Fix the literal in `src/pages/work/index.astro` ("16BitFit Battle Mode" → "16BitFit"; confirm A-1 shows "Anima").

- [ ] **Step 7: Verify slugs intact + titles swapped + 08:30 fix**

Run: `grep -rn "title:" src/content/work/animation-pipeline.mdx src/content/work/16bitfit.mdx; grep -rn "Battle Mode" src/; grep -rn "08:45" src/content/work/`
Expected: titles read `Anima` / `16BitFit`; zero "Battle Mode"; zero `08:45` in work openers (S5 handles JSON). Slugs/filenames unchanged.

- [ ] **Step 8: Commit**

```bash
git add src/content/work/ src/pages/work/index.astro
git commit -m "5 case-study openers + 4 taglines + 3 four_q blocks (A-1,A-2,A-4) + frontmatter date/anchor corrections + D7 Anima/D10 16BitFit display titles (slugs unchanged) per case-study-openers-locked-2026-05-26 + project-taglines-locked-2026-05-26 + project-four-q-locked-2026-05-27"
```

---

## Task 3: S5 — Stale daily-dated data

**Files:**
- Modify: `public/api/dateline.json`, `public/api/about-pulse.json`, `public/api/next-piece.json`, `public/api/shipped-stats-*.json` (whichever exist)
- Modify: `src/components/**/DatelineLabel.astro` (the hardcoded `today` / `2026-05-21`)
- Reference: SHIP-PLAN §S5; coordinate with Task 2's 08:45 fix (don't double-edit prose)

- [ ] **Step 1: Locate the files**

Run: `ls public/api/ 2>/dev/null; grep -rn "2026-05-21\|08:45\|today =" src/components | grep -i dateline`
Expected: list of JSON + the DatelineLabel hardcoded line.

- [ ] **Step 2: Refresh JSON** — update dates to current; change any `08:45` → `08:30`. (Day-of-launch these get re-written; this is the pre-launch refresh.)

- [ ] **Step 3: Wire DatelineLabel** — replace the hardcoded `2026-05-21` so it reads from `dateline.json` (or, if no wiring exists, update the static fallback to current). Prefer wiring to the JSON if the component already imports it.

- [ ] **Step 4: Verify**

Run: `grep -rn "2026-05-21" src/components; grep -rn "08:45" public/api`
Expected: zero stale `2026-05-21` in the dateline component; zero `08:45` in API JSON.

- [ ] **Step 5: Commit**

```bash
git add public/api src/components
git commit -m "Stale-data fix (S5): refresh Daily Driver JSON + 08:45→08:30 + wire DatelineLabel off hardcoded 2026-05-21"
```

---

## Task 4: CEILING-GREP CHECKPOINT (after Stage 1)

**Files:** none (verification only)

- [ ] **Step 1: Run the ceiling greps**

```bash
echo "iPad (≤3):"; grep -rin "ipad" src/content | wc -l
echo "Comprehension is the artifact (≤3):"; grep -rn "Comprehension is the artifact" src/content | wc -l
echo "Building got cheap (≤2):"; grep -rn "Building got cheap" src/content | wc -l
echo "HybridRouter outside methods (expect 0 in prose):"; grep -rn "HybridRouter" src/content
```

- [ ] **Step 2: Audit results** — iPad ≤3, "Comprehension is the artifact" ≤3, "Building got cheap" ≤2, HybridRouter only inside `methods:` arrays. Also eyeball for fixed Code-Brain counts (e.g. "118 skills", "14 hooks", "8 agents") and tenure-foregrounding in user-facing prose. If any ceiling is exceeded, the lock string was misapplied — re-check the lock doc and fix BEFORE proceeding. Log anomalies to IMPLEMENTATION-NOTES.

---

## Task 5: S1 Stage 3 — Cleanup (locks #9 + #10 + #11)

**Files:**
- Modify: all 5 `src/content/work/*.mdx`
- Reference: `the-block-cleanup-locked-2026-05-28.md` (#9), `investigation-boards-a2-a3-a5-locked-2026-05-28.md` (#10), `methods-strips-locked-2026-05-28.md` (#11)

- [ ] **Step 1: Read locks #9, #10, #11 in full.** Note #9's methods stub is OVERWRITTEN by #11's 5-row final — write #11's final directly, skip the stub.

- [ ] **Step 2: Apply lock #9 (the-block)** — frontmatter dates + role + hero alt + `archived_reference_url: null` + 6-artifact investigation board. (Methods handled in Step 4.)

- [ ] **Step 3: Apply lock #10** — replace investigation boards on `code-brain.mdx`, `intent-engineering-mcp.mdx`, `16bitfit.mdx`. A-5 keeps `killed={true}` BoardArtifact pattern for its 2 KILLED artifacts.

- [ ] **Step 4: Apply lock #11** — replace `methods:` arrays on all 5 (A-1 6-row authored from scratch; A-2/A-3/A-5 refine; A-4 5-row final). Verify the cross-link topology (IMPLEMENTATION-PROMPT §7): A-1 row3→code-brain, A-2 row6→animation-pipeline, A-3 row5→code-brain, A-4 rows1&3→code-brain, A-5 row5→animation-pipeline. HybridRouter lives in A-1/A-2 methods cells.

- [ ] **Step 5: Verify**

Run: `grep -rn "archived_reference_url" src/content/work/the-block.mdx; grep -rn "killed" src/content/work/16bitfit.mdx`
Expected: `archived_reference_url: null` present; 16bitfit retains `killed` props.

- [ ] **Step 6: Commit**

```bash
git add src/content/work/
git commit -m "Cleanup phases 1-3: A-4 dates/role/alt/null-ref + 6-artifact board + A-2/A-3/A-5 investigation boards + Methods strips ×5 (HybridRouter methods-only; cross-link graph) per the-block-cleanup-locked-2026-05-28 + investigation-boards-a2-a3-a5-locked-2026-05-28 + methods-strips-locked-2026-05-28"
```

---

## Task 6: CEILING-GREP CHECKPOINT (after Stage 3) + prebuild

**Files:** none (verification only)

- [ ] **Step 1: Re-run all ceiling greps from Task 4 Step 1.** Same thresholds. The cleanup phase re-authored methods/boards — confirm HybridRouter is still methods-only and no fixed counts crept in.

- [ ] **Step 2: Run prebuild + build to confirm Stage 1+3 are structurally sound**

Run: `npm run prebuild && npm run build 2>&1 | tail -30`
Expected: green. If a case-study validator fails, fix per the failing lock doc before continuing.

---

## Task 7: S1 Stage 2 — Transactions (lock #5 + D9 + D11 union) + email-independent infra surface

**Files:**
- Modify/Create: `src/content/transactions/*.mdx` (existing: enterprise-data-readiness-matrix, intent-engineering-mcp, phase-d-typed-edges, vault-knowledge-mcp, vault-scorecard[untracked])
- Modify: FilterPills component + `src/pages/transactions/[surface].astro` (add "infra" if absent)
- Modify: page chrome (subhead, dateline templates) per lock #5
- Reference: `transactions-prose-locked-2026-05-27.md` (read full); SHIP-PLAN D9/D11; OPEN-T1

- [ ] **Step 1: Read lock #5 in full.** Catalog its 5 canonical rows (phase-d-typed-edges, knowledge-loop-phase-6, vault-synthesizer-eval-suite, substack-drafter, intent-engineering-mcp) + page chrome (subhead `Every shipped artifact, dated and explained.`, dateline templates 1A–1D, pull-quote shape rules).

- [ ] **Step 2: Inventory on-disk vs lock + verify upstreams** — for each of lock #5's 3 NOT-yet-on-disk fleet rows (`knowledge-loop-phase-6`, `vault-synthesizer-eval-suite`, `substack-drafter`), verify the upstream content the row's `explanationUrl`/`canonicalUrl` points at actually exists (HEAD check the URL or check the code-brain repo). Record findings.

- [ ] **Step 2.5: ⛔ HOLD POINT — ask Sean.** Present per-row: does real upstream exist (→ add full row) or not (→ stage inline-body 4Q per lock #5's note)? Do not author the 3 fleet rows until Sean confirms each row's treatment.

- [ ] **Step 3: Apply page chrome** — subhead, dateline templates, pull-quote rules per lock #5.

- [ ] **Step 4: Reconcile the union row set (D11)** — KEEP `vault-knowledge-mcp` (resolves OPEN-T1 per D11), `vault-scorecard` (commit the untracked file), `enterprise-data-readiness-matrix` (D9, already committed); ADD the 3 fleet rows per Sean's Step 2.5 call. Verify each row matches lock #5's row-shape rules.

- [ ] **Step 5: Add "infra" surface** — if FilterPills + `[surface]` route don't already enumerate "infra" (D9 row uses it), add it. 

Run: `grep -rn "infra\|fleet\|product" src/pages/transactions/ src/components/transactions/ | grep -i surface`
Expected: "infra" present after edit.

- [ ] **Step 6: Verify + prebuild**

Run: `npm run prebuild 2>&1 | tail -20; ls src/content/transactions/`
Expected: `validate_transactions` passes; final row set on disk.

- [ ] **Step 7: Commit**

```bash
git add src/content/transactions/ src/pages/transactions/ src/components/transactions/
git commit -m "Transactions ledger v1: page chrome + curated union rows (D11) + infra surface (D9) per transactions-prose-locked-2026-05-27"
```

---

## Task 8: S1 Stage 2 — Essays (lock #7, schema FIRST, staged DRAFT)

**Files:**
- Modify: `src/content/config.ts` (roleMap schema: `jdUrl` optional + `isNegativeSpace` flag — Option A)
- Modify: `src/content/essays/meaning-over-access.mdx`
- Reference: `essays-prose-locked-2026-05-28.md` (read full)

- [ ] **Step 1: Read lock #7 in full**, esp. §3 schema Option A + Gate B (D5 says stage DRAFT regardless; SHIP-PLAN §1.4 confirms Gate B GREEN but launch is staged).

- [ ] **Step 2: Apply schema amendment FIRST** — `config.ts` roleMap row: `jdUrl` optional + `isNegativeSpace` flag. Commit separately:

```bash
git add src/content/config.ts
git commit -m "Essays schema amendment: roleMap jdUrl optional + isNegativeSpace flag per essays-prose-locked-2026-05-28 §3 Option A"
```

- [ ] **Step 3: Apply content + chrome** — reconcile `meaning-over-access.mdx` to lock #7 (thesis pullquote, body, quadrantChart, roleMap with negative-space row, 4Q, index hook `I bet on meaning, not access.`, subhead `Thesis-shaped writing where the artifacts back the claim.`). Set manifesto `status: DRAFT` (D5).

- [ ] **Step 4: Verify + prebuild**

Run: `npm run prebuild 2>&1 | tail -20; grep -n "status:" src/content/essays/meaning-over-access.mdx`
Expected: validators pass (negative-space rows skipped per amendment); `status: DRAFT`.

- [ ] **Step 5: Commit**

```bash
git add src/content/essays/ src/components/essays src/pages/essays
git commit -m "Essays v1: meaning-over-access manifesto + index chrome, staged status: DRAFT per essays-prose-locked-2026-05-28 (D5)"
```

---

## Task 9: S1 Stage 2 — Site chrome (lock #8) + email D4 fold + lock-record updates

**Files:**
- Modify: `src/components/chrome/SiteNav.astro`, `SiteFooter.astro`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- Delete: `src/components/chrome/ThemeToggle.astro`
- Modify: `src/lib/site.ts` (email line + RSS/subscribe constants), `src/pages/contact.astro`, `src/pages/404.astro`
- Modify (lock records, D4): `docs/writing-council/site-chrome-prose-locked-2026-05-28.md`, `docs/specs/BLUEPRINT-COMPLETE.md` (OPEN-5), `CLAUDE.md` (Locked decisions)
- Reference: `site-chrome-prose-locked-2026-05-28.md` (read full, incl. §3.4 dark-mode wipe)

- [ ] **Step 1: Read lock #8 in full**, esp. the dark-mode wipe list (14+ spec sections / 5 codebase deletions) + F-2 footer staging + RSS_FEEDS / EXTERNAL_SUBSCRIBE_LINKS constants.

- [ ] **Step 2: Apply nav/footer/BaseLayout/contact/404 prose** per lock #8. Footer 3 columns; SUBSCRIBE shows transactions/rss + read-on-substack only (architecture + essays RSS commented out until shipped). Bottom strip = copyright only.

- [ ] **Step 3: Dark-mode wipe** — `git rm src/components/chrome/ThemeToggle.astro`; delete dark-mode CSS block from `global.css`; drop `!important` from print stylesheet per lock. Append `RSS_FEEDS` + `EXTERNAL_SUBSCRIBE_LINKS` to `site.ts`.

- [ ] **Step 4: D4 email swap (4 places)** — `src/lib/site.ts` email constant → `sean.winslow28@gmail.com`; `src/pages/contact.astro` meta-description hardcoded leak → same. Then lock records: `site-chrome-prose-locked-2026-05-28.md` (the email string), `docs/specs/BLUEPRINT-COMPLETE.md` OPEN-5, `CLAUDE.md` "Locked decisions" (email constant line).

Run: `grep -rn "sean@seanwinslow.com" src/ docs/ CLAUDE.md`
Expected: zero matches after the swap (all now `sean.winslow28@gmail.com`).

- [ ] **Step 5: Dark-mode wipe verification greps (must be zero)**

```bash
grep -rn "data-theme" src/; grep -rn "ThemeToggle" src/; grep -rn "sw-theme" src/; grep -rn "LIGHT · DARK" src/; grep -rn "prefers-color-scheme" src/
```
Expected: zero (or only print-stylesheet `color-scheme: light`). Audit any match before committing.

- [ ] **Step 6: prebuild + build**

Run: `npm run prebuild && npm run build 2>&1 | tail -20`
Expected: green.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Site chrome v1: F-2 footer staging + dark-mode wipe (terminal) + /contact + /404 + email→sean.winslow28@gmail.com (D4) + lock-record updates per site-chrome-prose-locked-2026-05-28"
```

---

## Task 10: S2 — Hero spec amendment + CHANGELOG (FIRST, before any hero code)

**Files:**
- Modify: `docs/specs/hero-spec-v1.md` (§6 motion timeline, §7.5 / §7.5.5 Issue B, tagline section)
- Modify: `CHANGELOG.md`
- Reference: SHIP-PLAN §S2 (D2/D6/D8), hero-spec-v1.md

- [ ] **Step 1: Read hero-spec §6/§7.5/§7.5.5 + tagline section.** Read CHANGELOG.md "How to add an entry" header.

- [ ] **Step 2: Amend hero-spec** — describe Issue B reversal (D6): an ADDITIVE full-viewport cream `#FFF9F0` overlay that cycles the 8 bg-removed icons centered, then fades out; hero renders underneath from first paint; once-per-session via sessionStorage; under reduced-motion/no-JS the overlay does NOT mount and the hero shows immediately with no `<video>` in DOM (preserve commit ad64ce1). Amend the tagline section for D8: title `The agents handle the loops. I handle the taste.` + enlarged `/AI PRODUCT MANAGER` role tag.

- [ ] **Step 3: CHANGELOG entry** for the hero spec-change (Issue B + D8 title).

- [ ] **Step 4: Commit**

```bash
git add docs/specs/hero-spec-v1.md CHANGELOG.md
git commit -m "Hero spec amendment: Issue B additive loading overlay (D6) + hero-title drop 'Product Manager.' line (D8) per SHIP-PLAN-2026-05-29 §S2"
```

---

## Task 11: S2 — Hero loading-icon asset prep

**Files:**
- Create: `scripts/phase-0/prep_hero_loading_icons.py` (Pillow)
- Create: `public/assets/hero-icons/loading/*.webp` (8 frames)
- Source: `reference-images/hero-icons/background-removed/*.png` (8 PNGs)

- [ ] **Step 1: Confirm sources**

Run: `ls reference-images/hero-icons/background-removed/*.png | wc -l`
Expected: 8.

- [ ] **Step 2: Write Pillow script** — normalize each PNG onto a consistent transparent square canvas (uniform size, centered, padded so frames don't jump), export WebP to `public/assets/hero-icons/loading/`.

- [ ] **Step 3: Run + verify**

Run: `python3 scripts/phase-0/prep_hero_loading_icons.py && ls -la public/assets/hero-icons/loading/`
Expected: 8 same-dimension WebP files.

- [ ] **Step 4: Commit**

```bash
git add scripts/phase-0/prep_hero_loading_icons.py public/assets/hero-icons/loading/
git commit -m "Hero Issue B: normalize 8 bg-removed loading icons → WebP (consistent canvas) per hero-spec §6"
```

---

## Task 12: S2 — Hero loading overlay (D6) + hero-title (D8)

**Files:**
- Modify: the Hero component (find: `Hero.astro` / `.character-video` owner), its `<style>`, role-tag CSS
- Modify (serialize after Task 9): `src/layouts/BaseLayout.astro` / `src/styles/global.css` only if the overlay needs global styles
- Modify: any tagline byte-match validator (`scripts/validate_about.mjs` or prebuild), `docs/writing-council/IMPLEMENTATION-PROMPT-2026-05-28.md` §7 QA string, `CLAUDE.md` hero tagline locked decision

- [ ] **Step 1: Locate the hero**

Run: `grep -rln "character-video\|Product Manager. The agents handle the loops" src/`
Expected: the Hero component + any validator with the old tagline.

- [ ] **Step 2: Implement the additive overlay** — fixed full-viewport `#FFF9F0` div, centered icon cycling the 8 loading WebPs per §6 timing, fades out then unmounts. Hero renders underneath from first paint. Gate mount on: JS available AND not reduced-motion AND sessionStorage flag unset; set the flag after first run. Under reduced-motion/no-JS the overlay element does NOT mount and no `<video>` is in the DOM (preserve ad64ce1's behavior).

- [ ] **Step 3: D8 hero-title** — change hero copy to `The agents handle the loops. I handle the taste.` (drop the "Product Manager." line). Enlarge the `/AI PRODUCT MANAGER` role-tag so the role reads immediately. Update CLAUDE.md locked hero tagline, the tagline byte-match validator string, and IMPLEMENTATION-PROMPT §7 QA string (`/ renders hero tagline ...`).

- [ ] **Step 4: prebuild (catches the tagline validator)**

Run: `npm run prebuild 2>&1 | tail -20`
Expected: green; the updated validator matches the new title.

- [ ] **Step 5: Playwright reduced-motion re-verify** — start dev server; with reduced-motion emulated (overlay suppressed), assert `document.querySelector(".character-video")` → null AND the hero is visible immediately. Then with motion allowed + sessionStorage cleared, assert the overlay mounts once and fades.

Run (capture the assertions in a short Playwright check or MCP browser_evaluate):
Expected: `.character-video` null under reduced-motion; hero visible immediately; overlay once-per-session otherwise.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Hero Issue B: additive cream loading overlay (once-per-session, reduced-motion-safe) + hero-title 'The agents handle the loops. I handle the taste.' (D8) + validator/QA/CLAUDE.md updates"
```

---

## Task 13: S3 — Tile integration

**Files:**
- Source: `assets/projects-tiles/A-{1..5}_*.png`
- Create: `public/assets/projects/<slug>.webp` (animation-pipeline, code-brain, intent-engineering-mcp, the-block, 16bitfit)
- Modify: `hero_media` + `hero_media_alt` on the 5 `work/*.mdx`

- [ ] **Step 1: Map tiles → slugs** and confirm sources.

Run: `ls -la assets/projects-tiles/`

- [ ] **Step 2: Optimize** each PNG → WebP, crop to the 4:5 portrait `ProjectTile` spec. (Use a Pillow/sharp/cwebp step; keep PNG sources.)

- [ ] **Step 3: Place** at `public/assets/projects/<slug>.webp`.

- [ ] **Step 4: Wire frontmatter** — update `hero_media` paths + `hero_media_alt` on the 5 case studies. A-1 alt must reflect the new Anima art (no longer "mascot walk cycle").

- [ ] **Step 5: View-Transition check** — confirm `view-transition-name: hero-media-<slug>` morphs tile→deep-dive cleanly at 390/1440 (Playwright or manual dev). Per-tile visual QA before commit.

- [ ] **Step 6: Commit** (reference the superseded 5/24 tile commits for traceability)

```bash
git add public/assets/projects/ src/content/work/
git commit -m "S3 tile integration: 5 re-authored tiles → WebP (4:5) + hero_media/hero_media_alt wiring (A-1 alt = Anima art); supersedes prior 5/24 tile set"
```

---

## Task 14: S1 Stage 4 — OG card fixes

**Files:**
- Modify: `scripts/phase-0/generate_og_cards.py`
- Modify/Delete: `reference-images/og-cards/*`
- Reference: IMPLEMENTATION-PROMPT §5 (Fix #1 + Fix #2)

- [ ] **Step 1: Fix #1** — change essays card title `Access vs Meaning` → `Access Over Meaning` in the script.

- [ ] **Step 2: Fix #2** — change the vault-knowledge-mcp card block: output filename → `intent-engineering-mcp.png`, URL line `/work/vault-knowledge-mcp/` → `/work/intent-engineering-mcp/` (title/hook/stamp already correct for intent-engineering-mcp).

- [ ] **Step 3: Regenerate + verify**

Run: `python3 scripts/phase-0/generate_og_cards.py && ls reference-images/og-cards/`
Expected: `og-default.png`, `vault-scorecard.png`, `intent-engineering-mcp.png`, `essays/meaning-over-access.png`. Delete orphan `vault-knowledge-mcp.png` if still present (`git rm`).

- [ ] **Step 4: CLAUDE.md count** — update the OG cards status line per IMPLEMENTATION-PROMPT §5 (4-card set; drop the vault-knowledge-mcp parenthetical; note deferral).

- [ ] **Step 5: Commit**

```bash
git add scripts/phase-0/generate_og_cards.py reference-images/og-cards/ CLAUDE.md
git rm reference-images/og-cards/vault-knowledge-mcp.png 2>/dev/null || true
git commit -m "OG card fixes: essays 'Access vs Meaning'→'Access Over Meaning' + rename vault-knowledge-mcp.png→intent-engineering-mcp.png + URL fix (Stage 4) per IMPLEMENTATION-PROMPT-2026-05-28 §5"
```

---

## Task 15: Full dev QA + build gate (verification-before-completion)

**Files:** none (verification); use superpowers:verification-before-completion

- [ ] **Step 1: Final ceiling greps** (Task 4 Step 1) — all clean.

- [ ] **Step 2: Dark-mode wipe greps** (Task 9 Step 5) — zero.

- [ ] **Step 3: Email grep** — zero `sean@seanwinslow.com`.

- [ ] **Step 4: Methods cross-link graph** (IMPLEMENTATION-PROMPT §7) renders with `→` + navigates.

- [ ] **Step 5: Dev QA per IMPLEMENTATION-PROMPT §7** — hit every route; spot-check status-specific anchors (A-1 ACTIVE, A-2 08:30, A-3 SHIPPED, A-4 ARCHIVED null-ref, A-5 PAUSED APR 20). Hero: new title + enlarged role tag; overlay once-per-session + reduced-motion safe.

- [ ] **Step 6: Final build**

Run: `npm run prebuild && npm run build 2>&1 | tail -30`
Expected: green; confirm `dist/` sitemap + RSS carry `seanwinslow.com`.

- [ ] **Step 7: ⛔ HOLD — ask Sean before opening the PR.** Summarize what landed + the launch-gate (SHIP-PLAN §5) status. Do NOT open the PR or push without Sean's explicit go. Do NOT run S6 deploy.

---

## Self-review note

This plan references lock-doc canonical prose by filename rather than inlining thousands of words of locked content — deliberate, because (a) the lock docs ARE the source of truth and re-keying risks drift, and (b) the continuation prompt instructs reading each lock in full at apply time. The inlined strings here are only the cross-cutting small ones (hero title, email, title swaps, subheads, ceiling thresholds) where a single source in this plan reduces error. Verification is concrete at every task (greps + prebuild + build + Playwright). Hold points are explicit at Task 7 (union rows) and Task 15 (PR).
