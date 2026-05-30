# Mac Mini Implementation Prompt — Writing Council Lock-Doc Apply

**For:** Claude Code on Sean's Mac Mini
**From:** Claude (Sonnet 4.6), MBP brainstorm session 2026-05-28
**Repo:** `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
**Stakes:** This apply closes Workstream D (the cumulative writing-council pass) + two cleanup phases. Eleven lock docs land as MDX + script edits. After this apply, the portfolio's writing surfaces are content-locked and ready for Phase 2 Astro build + deploy.

Read this entire doc before touching any file. It explains the *why* (hallucinations the council passes generated, which we audited and corrected), the *what* (11 lock docs + 2 OG card fixes), and the *how* (apply order + commit strategy). Sean is on MBP; this Mac Mini session is the apply hand.

---

## 1. Why this exists — the hallucination problem

The portfolio's writing council ran for multiple sessions across May 2026. Early passes wrote prose that *sounded* right but wasn't grounded in source-of-truth files. The 2026-05-28 session ran a hallucination audit against four canonical anchor sets:

1. **Resume + resume additions** (`/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/`)
2. **Code Brain CLAUDE.md + CHANGELOG.md** (`/Users/seanwinslow/Code-Brain/code-brain/`)
3. **Project canonical docs** (anima `PHILOSOPHY.md` + intent-engineering README + 16BitFit CLAUDE.md)
4. **Sean's lived experience** (confirmed in real-time chat 2026-05-28)

The audit surfaced specific fabrications across all five case studies:

### A-4 The Block — the worst-affected surface

| Hallucination | Reality |
|---|---|
| Tenure: "Two years (2024–2026), two products" | Six months (2025-11-10 → 2026-05-04) at an institutional crypto data + research firm |
| 3-tier subscription structure (research-only / +data / +data+API) | Fabricated narrative; Sean did not own subscription tier decisions |
| Subscriber growth chart 18 → 134 across 2024 Q2–2025 Q4 | Fabricated metric across a fabricated arc |
| Surfaces listed: "Data API, Simon AI feature, AdOps systems" | Not in Sean's resume; possibly real at The Block but not Sean's work. Replaced with resume-confirmed: Polymarket × Campus, .co homepage redesign audit, RevOps automation pipeline |
| Campus v1 launch in 2024 | Sean did not launch Campus v1; his tenure started Nov 2025 |
| Hero image: 3-tier customer matrix diagram | Diagram represented fabricated content; needs re-author |

### A-2 Code Brain

| Hallucination | Reality |
|---|---|
| `date_started: 2025-09-01` | First commit 2026-02-06 (the v1.0.0 CHANGELOG entry's "2024-01-XX" is a mistake; v2.0.0 at the bottom is the real first entry) |
| Daily Driver wakes at 08:45 | Daily Driver fires 08:30; meta-agent fires 08:45 (08:45 was the wrong agent's slot) |
| `anchor_metric: "118 SKILLS · 14 HOOKS · 8 AGENTS"` | Count-fragile — the fleet grows and shrinks weekly. Locked rhythm-based metric instead. |
| MetricChart "Daily Driver fleet runs/day" (12 → 47) | Implausible — Daily Driver fires once/day per launchd. Cut. |
| PRDDecision "Tier 1 retrofit — agent SDK stable" misrepresented as clean ship | Real intent (Sean confirmed) but the full 4-tier implementation never completed because Sean pivoted to Codex CLI + Anti-Gravity CLI vault_critic. Cut. |
| Existing 4-row methods strip used Qwen3-14B model | Sean's actual deployed model is `qwen3.6_35b-a3b-32k` on MBP via Ollama |

### A-3 intent-engineering-mcp

| Hallucination | Reality |
|---|---|
| Opener ¶3 references "08:45 every morning" for install counts | Daily Driver writes at 08:30 (T1.1 fix) |
| MetricChart "Build size vs feature count" 320KB → 180KB | Sean confirmed numbers possibly invented for cut-scope narrative. Cut. Replaced with verifiable scale-audit metric (118 skills audited, 24/36/40 L-tier split — straight from README). |

### A-5 16BitFit

| Hallucination | Reality |
|---|---|
| `date_active_through: 2026-04-01` + investigation board `date="APR 2"` "Pause decision" | Pause date is 2026-04-20 (T1.4 + T1.5 fix) |
| `methods:` row "Seedance 2.0 + pixel-art Gemini skill / ~$1/run" | Seedance is video interpolation, not sprite stills. Real generator: Gemini Nano Banana 2 (pixel-art Gemini skill). Real cost: $0.034/image at 1K resolution (Sean confirmed 2026-05-28). |
| MetricChart "Sprite frames generated" (12 / 38 / 64) | Not telemetry-backed (Sean confirmed). Cut. |
| SlackQuote MAR 12 "scope-creep exchange" between design-crit and sean | Composed — Sean confirmed: "I never Slacked anyone about 16BitFit." Cut. |

### Voice ceilings tracked across the lock docs

Beyond fabrication, the council passes drifted on certain phrases via repeated re-use. Across the 11 lock docs, the following ceilings were established and enforced. **These are non-negotiable — do not re-introduce these phrases beyond the listed locations:**

| Phrase | Ceiling | Locations |
|---|---|---|
| iPad | 3 uses | About B-1 beats 3 + 6 + A-1 opener ¶1 |
| "Comprehension is the artifact" | 3 uses | About B-2 ¶2 + B-4 ¶1 (as "Comprehension didn't") + A-2 opener ¶3 |
| "Building got cheap" | 2 uses | About B-2 ¶2 + B-4 ¶1 |
| HybridRouter | Methods arrays ONLY | Never in opener/4Q/tagline/lead/About prose. Lives in `methods[]` on case studies (A-1, A-2), transactions ledger rows, architecture writeups. |
| Code Brain fixed counts (skills/agents/hooks) | Never | The fleet fluctuates weekly. Language must lean into the fluctuation or omit the count. |
| "Same X, same Y, same Z" rule-of-three family | 2 uses | About B-1 beat 6 + A-5 opener ¶2. No taglines. |
| "fleet" at tagline level | 2 uses | A-1 tagline + Home About teaser. No other taglines. |
| Tenure-foregrounding | Never | Date data lives in frontmatter (`date_started` / `date_active_through`). User-facing prose stays on the work. |
| Traces of desperation | Never | Page reads identically hired vs hunting. No "looking for work / please hire me" cadence. |

Final verification pass 2026-05-28 confirmed all ceilings clean across the 11 lock docs.

---

## 2. Eleven lock docs — the canonical apply set

All locked content lives in `docs/writing-council/`. Read each in full before applying it; the doc carries its own apply checklist + spec implications + per-row grounding.

| # | Lock doc | Touches | Apply notes |
|---|---|---|---|
| 1 | [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md) | `src/content/about/index.mdx` | B-1 beats + B-2 prose + B-4 prose + remove `<RecruiterCallout />` |
| 2 | [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) | All 5 `src/content/work/*.mdx` openers | Includes 2 amendments (2026-05-27 a/b) — read full doc top-to-bottom; later amendments supersede earlier prose |
| 3 | [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md) | 4 case-study `tagline:` frontmatter fields | A-3 tagline already locked in `CLAUDE.md` §"Locked decisions"; this doc handles A-1/A-2/A-4/A-5 |
| 4 | [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) | 3 case-study `four_q:` blocks (A-1, A-2, A-4) + 1 amendment | A-5 4Q audited clean, no change. Includes A-4 opener ¶1+¶3 companion amendment + About B-2 ¶1 tenure-deletion fix |
| 5 | [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md) | `/transactions/` page chrome + 5 ledger row MDX files | First Workstream D surface lock. Creates `src/content/transactions/` collection with 5 rows |
| 6 | [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md) | `/architecture/` page chrome + Vault Scorecard writeup | **Voice-review gate at top — see §3 below** |
| 7 | [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md) | `/essays/` page chrome + meaning-over-access manifesto frontmatter + schema amendment | **Voice-review gate at top — see §3 below.** Requires roleMap schema amendment FIRST. |
| 8 | [`site-chrome-prose-locked-2026-05-28.md`](site-chrome-prose-locked-2026-05-28.md) | Nav + footer + `/contact/` + `/404` + `src/lib/site.ts` F-2 staging + comprehensive dark-mode wipe | Closes Workstream D. Dark mode is **terminal** — 14+ spec sections + 5 codebase deletions. |
| 9 | [`the-block-cleanup-locked-2026-05-28.md`](the-block-cleanup-locked-2026-05-28.md) | `src/content/work/the-block.mdx` frontmatter dates + role + hero alt + investigation board (6 artifacts) + methods stub | Cleanup phase 1. Apply alongside A-4 opener/tagline/4Q locks in same commit. |
| 10 | [`investigation-boards-a2-a3-a5-locked-2026-05-28.md`](investigation-boards-a2-a3-a5-locked-2026-05-28.md) | Investigation boards on `code-brain.mdx`, `intent-engineering-mcp.mdx`, `16bitfit.mdx` | Cleanup phase 2. Three MDX files in one commit. |
| 11 | [`methods-strips-locked-2026-05-28.md`](methods-strips-locked-2026-05-28.md) | `methods:` arrays on all 5 case-study MDX files | Cleanup phase 3. Five MDX files in one commit. |

---

## 3. Voice-review gates — DO NOT bypass

Two of the eleven lock docs carry voice-review gates at their top. **Both must clear before you apply the corresponding lock doc to disk.**

### Gate A — Architecture lock (#6)

Per [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md) §"Voice-review gate" header:

> Do not apply this lock doc on the Mac Mini until:
> 1. The upstream essay at `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` has been voice-reviewed via the `writing-voice-modes` skill
> 2. The companion `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md` (the 4Q) has been voice-reviewed
> 3. The `vault/SCORECARD.md` honest notes have been voice-reviewed
> 4. Sean has tagged the v3.X.X version that marks "voice-reviewed and ready"

**Check before applying:** verify the upstream essay's frontmatter contains a `voice_pass_applied:` date. If absent, **STOP** and message Sean. Do not infer or assume — the gate is explicit.

### Gate B — Essays lock (#7)

Per [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md) §"Apply order" header:

> Requires: (a) the upstream manifesto + EXPLANATION shipped to `code-brain` main and tagged voice-reviewed; (b) the schema amendment in §3 spec implications applied first (roleMap row shape, Option A); (c) `astro-mermaid` integration installed.

**Check before applying:**
1. Verify `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS.md` resolves with HTTP 200 (and that the manifesto frontmatter shows `voice_pass_applied: 2026-05-21` per the lock doc).
2. Verify `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS_EXPLANATION.md` resolves with HTTP 200.
3. If either 404s, apply the lock with `status: DRAFT` in the manifesto frontmatter; flip to `PUBLISHED` on 6/19 publish day per the lock's §"Apply order" guidance.

**If applying with `status: DRAFT`:** the `prebuild` fetch will warn-on-404 + leave the cached canonical empty until the upstream ships. Render the chrome + frontmatter; body + 4Q render as empty placeholders. This is the spec-supported staging state.

---

## 4. Apply order (recommended sequence)

The lock docs interlock — applying out of order surfaces cross-link validation failures or schema mismatches. Recommended Mac Mini session sequence:

### Stage 1: Foundations (locks 1–4)

These touch existing pages (About + 5 case-study openers/taglines/4Q). No new content collections.

1. **Apply lock #1 (about)** — update `src/content/about/index.mdx` per the lock's apply checklist. Remove `<RecruiterCallout />`.
2. **Apply lock #2 (case-study openers)** — read full doc + both 2026-05-27 amendments. Apply to all 5 `src/content/work/*.mdx` opener bodies. A-3 timing fix `08:45 → 08:30` (T1.1). A-1 + A-5 frontmatter date corrections + A-1 anchor metric swap (T2.1–T2.3). A-5 frontmatter `date_active_through: 2026-04-20` + investigation board `date="APR 20"` (T1.4 + T1.5).
3. **Apply lock #3 (taglines)** — replace 4 `tagline:` frontmatter fields.
4. **Apply lock #4 (4Q + companion opener amendment)** — replace 3 four_q blocks (A-1, A-2, A-4) + apply A-4 opener ¶1+¶3 amendment + About B-2 ¶1 surgical word swap.

Single commit per lock OR batch into 1–2 commits per the lock-doc apply checklists. Commit messages should reference the lock doc filename.

### Stage 2: New surfaces (locks 5 + 6 + 7 + 8)

These create new content collections + page chrome.

5. **Apply lock #5 (transactions)** — first Workstream D surface lock. Creates `src/content/transactions/` collection. Apply 5 ledger row MDX files + page chrome (subhead, dateline templates, value-prop shape rules). Spec amendments per lock §"Spec implications."
6. **Apply lock #6 (architecture)** — VOICE-REVIEW GATE A. Once green, create `src/content/architecture/` + Vault Scorecard MDX + Mermaid source + page chrome. Spec amendments per lock §"Spec implications." Schema-additive change: `relatedArchitecture` field added to transactions schema.
7. **Apply lock #7 (essays)** — VOICE-REVIEW GATE B. Schema amendment FIRST (roleMap row shape Option A — `jdUrl` optional + `isNegativeSpace` flag) per the lock's apply checklist step 3. Then create `src/content/essays/` + meaning-over-access MDX + Mermaid source + page chrome. Spec amendments per lock §"Spec implications."
8. **Apply lock #8 (site chrome + dark-mode wipe)** — last Workstream D lock. Edit `src/components/chrome/SiteNav.astro`, `SiteFooter.astro`, `BaseLayout.astro`. Delete `ThemeToggle.astro`. Delete dark-mode CSS block from `global.css`. Drop `!important` from print stylesheet. Run §3.4 verification greps + confirm zero matches on `data-theme` / `ThemeToggle` / `sw-theme` / `LIGHT · DARK` patterns. Append `RSS_FEEDS` + `EXTERNAL_SUBSCRIBE_LINKS` constants to `src/lib/site.ts`.

### Stage 3: Cleanup phases (locks 9 + 10 + 11)

These re-author the case-study surfaces (frontmatter dates + investigation boards + Methods strips) using the resume-confirmed receipts the audit unlocked.

9. **Apply lock #9 (the-block cleanup)** — single MDX file (`src/content/work/the-block.mdx`). Frontmatter dates + role + hero alt + `archived_reference_url: null` + 6-artifact investigation board + 2-row methods stub. **Note:** lock #11 will overwrite the 2-row methods stub with a 5-row final. If applying #9 + #11 in the same commit, write the 5-row final directly per #11 (skip the stub).
10. **Apply lock #10 (investigation boards A-2/A-3/A-5)** — three MDX files in one commit (`code-brain.mdx`, `intent-engineering-mcp.mdx`, `16bitfit.mdx`). Replace investigation board blocks. A-5 retains the existing `killed={true}` BoardArtifact prop pattern for the 2 KILLED artifacts.
11. **Apply lock #11 (Methods strips × 5)** — five MDX files in one commit. Replace `methods:` arrays. A-1 gets the 6-row strip authored from scratch; A-2/A-3/A-5 expand or refine existing rows; A-4 overwrites the Surface 1 stub with the 5-row final.

### Stage 4: OG card fixes (§5 below)

Two card regenerations. Run after locks 1–11 land so the regenerated cards reflect the locked title strings.

### Stage 5: Final dev QA + deploy gate

Run `npm run dev` end-to-end. Hit every locked route. Confirm prebuild scripts pass. Confirm Lighthouse + cross-link navigation + RSS feeds. See §6 below.

---

## 5. OG card fixes — TWO regenerations required

The 2026-05-28 verification pass surfaced two OG card mismatches in `reference-images/og-cards/`. The cards on disk were generated before the 2026-05-28 title swap + before the intent-engineering-mcp / vault-knowledge-mcp filename audit.

### Fix #1: essays/meaning-over-access.png — title swap

**Current state:** card title reads "Access vs Meaning"
**Locked title:** "Access Over Meaning" per [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md) §Phase 2 (frontmatter `title: "Access Over Meaning"`)

Other elements on the card (italic hook "I bet on meaning, not access.", BOSTON · ESSAY · 2026 stamp, URL `/essays/meaning-over-access/`, SW wordmark) are correct and should be preserved.

**Action:**

1. Read `scripts/phase-0/generate_og_cards.py` to locate the essays card title parameter
2. Change the title string from "Access vs Meaning" → "Access Over Meaning"
3. Re-run the script: `python3 scripts/phase-0/generate_og_cards.py` (or whatever the documented invocation is per the script header)
4. Verify the regenerated file at `reference-images/og-cards/essays/meaning-over-access.png` shows "Access Over Meaning" as the title
5. Other 3 cards may regenerate too — that's fine; vault-scorecard is already correct + og-default is keep-as-is per Sean's 2026-05-28 call. The vault-knowledge-mcp regeneration handled by Fix #2 below.

### Fix #2: vault-knowledge-mcp.png — wrong product, rename to intent-engineering-mcp

**Current state:** filename is `vault-knowledge-mcp.png` but the card content is entirely **Intent Engineering MCP**:
- Title: "Intent Engineering MCP"
- Italic hook: "Drawing up agents to act with intent." (A-3 tagline)
- Stamp: "SHIPPED 2026-05-12" (A-3 ship date)
- URL line on card: `/work/vault-knowledge-mcp/` (mismatches the rest of the content — should be `/work/intent-engineering-mcp/`)

This was a generator copy-paste error during Phase 0 — the card was meant for vault-knowledge-mcp but populated with intent-engineering-mcp's strings.

Per Sean's 2026-05-28 decision: rename + fix URL to make this the intent-engineering-mcp card (which the portfolio actually needs for the SHIPPED status page). Defer the vault-knowledge-mcp card until that surface ships ~6/4 with its own title-lock.

**Action:**

1. Read `scripts/phase-0/generate_og_cards.py` to locate the vault-knowledge-mcp card generation block
2. Either:
   - **Option A (preferred):** Update the script — change the output filename param from `vault-knowledge-mcp.png` → `intent-engineering-mcp.png`, update the URL line from `/work/vault-knowledge-mcp/` → `/work/intent-engineering-mcp/`. Re-run. The card title + italic + ship-date stamp stay (they're already correct for intent-engineering-mcp).
   - **Option B:** Move the existing PNG file in place — `mv reference-images/og-cards/vault-knowledge-mcp.png reference-images/og-cards/intent-engineering-mcp.png` — then patch the script's URL line and regenerate. But the URL line on the card image itself will still say `/work/vault-knowledge-mcp/` unless you regenerate. **Prefer Option A.**
3. After regeneration, the og-cards directory should contain:
   - `og-default.png` (keep as-is per Sean's call)
   - `vault-scorecard.png` (already correct)
   - `intent-engineering-mcp.png` (NEW — replaces the misnamed vault-knowledge-mcp.png)
   - `essays/meaning-over-access.png` (regenerated with corrected title per Fix #1)
4. Verify the regenerated intent-engineering-mcp.png shows: title "Intent Engineering MCP", hook "Drawing up agents to act with intent.", stamp "SHIPPED 2026-05-12", URL line `/work/intent-engineering-mcp/`, SW wordmark
5. The old `vault-knowledge-mcp.png` file (if not overwritten by the rename) should be **deleted** — no orphan OG card for a surface that hasn't shipped

### CLAUDE.md count update

After Fix #2, the project's `CLAUDE.md` §"Current status" line "OG cards | LOCKED 2026-05-21 — 4 cards" drops from 4 to 3. Update the line to reflect 3 cards (og-default, vault-scorecard, intent-engineering-mcp, essays/meaning-over-access) — wait, that's 4 counting the essays subfolder card. The count stays at 4. **Update the count to: 4 cards (og-default + vault-scorecard + intent-engineering-mcp + essays/meaning-over-access).** Remove the parenthetical "vault-knowledge-mcp (with SHIPPED 2026-05-12 stamp)" reference; add the deferred-vault-knowledge-mcp note to the §Open items section.

### Minor finding — KEEP AS-IS

`og-default.png` shows "AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs." Sean confirmed 2026-05-28: **keep as-is.** The "AI Product Manager" recruiter-facing keyword on a card that surfaces on LinkedIn/Twitter previews is intentional even though the hero tagline drops the AI prefix. No action needed.

---

## 6. Commit strategy

Recommend the following commit sequence on Mac Mini. Adjust per your judgment — single-lock-per-commit is also fine if cleaner.

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git pull  # confirm clean working tree

# Stage 1 — Foundations
# Lock #1 + #4 (B-2 ¶1 tenure word swap) — single about commit
git add src/content/about/index.mdx
git commit -m "About B-1 + B-2 + B-4 locked content + recruiter italic removed + B-2 ¶1 tenure deletion per about-b1-b2-b4-locked-2026-05-25 + project-four-q-locked-2026-05-27 cross-doc amendment"

# Lock #2 + #3 + #4 (A-4 opener ¶1+¶3 amendment + 4Q rewrites) — case study foundations
git add src/content/work/animation-pipeline.mdx src/content/work/code-brain.mdx src/content/work/intent-engineering-mcp.mdx src/content/work/the-block.mdx src/content/work/16bitfit.mdx
git commit -m "5 case-study openers + 4 taglines + 3 four_q blocks (A-1, A-2, A-4) + frontmatter date/anchor_metric corrections per case-study-openers-locked-2026-05-26 (with 2 amendments) + project-taglines-locked-2026-05-26 + project-four-q-locked-2026-05-27"

# Stage 2 — New surfaces
# Lock #5 — transactions
git add src/content/transactions/ src/components/transactions/ src/lib/transactions-copy.ts scripts/fetch_canonical_sources.mjs scripts/validate_transactions.mjs scripts/derive_crosslinks.mjs
git commit -m "Transactions ledger v1: 5 rows + page chrome (subhead, dateline templates, pull-quote shape rules) per transactions-prose-locked-2026-05-27"

# Stage 2 — Architecture (AFTER voice-review Gate A clears)
git add src/content/architecture/ src/components/architecture/ src/content/config.ts scripts/fetch_canonical_sources.mjs scripts/validate_architecture.mjs scripts/derive_crosslinks.mjs
git commit -m "Architecture v1: Vault Scorecard + page chrome (hook, subhead, dateline template) per architecture-prose-locked-2026-05-27"

# Stage 2 — Essays (AFTER voice-review Gate B clears + schema amendment)
# Schema amendment FIRST
git add src/content/config.ts
git commit -m "Essays schema amendment: roleMap row jdUrl optional + isNegativeSpace flag per essays-prose-locked-2026-05-28 §3 Option A"

# Then content
git add src/content/essays/ src/components/essays/ src/pages/essays/rss.xml.ts scripts/fetch_canonical_sources.mjs scripts/validate_content.mjs scripts/derive_crosslinks.mjs
git commit -m "Essays v1: meaning-over-access manifesto + index chrome (hook, subhead, staged footer) per essays-prose-locked-2026-05-28"

# Stage 2 — Site chrome + dark-mode wipe + F-2 staging
# Delete ThemeToggle.astro
git rm src/components/chrome/ThemeToggle.astro
# Edit nav, footer, BaseLayout, global.css, site.ts
git add src/components/chrome/SiteNav.astro src/components/chrome/SiteFooter.astro src/layouts/BaseLayout.astro src/styles/global.css src/lib/site.ts src/pages/contact.astro src/pages/404.astro
git commit -m "Site chrome v1: F-2 footer staging + dark-mode wipe (terminal) + /contact/ + /404 per site-chrome-prose-locked-2026-05-28"

# Stage 3 — Cleanup phases (all 5 case-study MDX files touched)
# Lock #9 + #10 + #11 — single commit covering all A-4 cleanup + investigation boards + methods strips
git add src/content/work/the-block.mdx src/content/work/code-brain.mdx src/content/work/intent-engineering-mcp.mdx src/content/work/16bitfit.mdx src/content/work/animation-pipeline.mdx
git commit -m "Cleanup phases 1-3: A-4 broader cleanup (dates/role/alt/null reference url + 6-artifact investigation board) + A-2/A-3/A-5 investigation boards (audit cut 4 fabricated/composed artifacts; replaced with verified receipts) + Methods strips for all 5 case studies (6+6+5+5+5 rows; Code Brain ×4 + Animation Pipeline ×2 cross-link graph) per the-block-cleanup-locked-2026-05-28 + investigation-boards-a2-a3-a5-locked-2026-05-28 + methods-strips-locked-2026-05-28"

# Stage 4 — OG card fixes
# Modify scripts/phase-0/generate_og_cards.py per §5 above
git add scripts/phase-0/generate_og_cards.py reference-images/og-cards/
git rm reference-images/og-cards/vault-knowledge-mcp.png  # if it wasn't renamed
git commit -m "OG card fixes: essays title 'Access vs Meaning' → 'Access Over Meaning' + rename vault-knowledge-mcp.png → intent-engineering-mcp.png with URL line correction (vault-knowledge-mcp OG defer until that surface ships)"

# Update CLAUDE.md count
git add CLAUDE.md
git commit -m "CLAUDE.md: update OG cards row to reflect 4-card set (og-default + vault-scorecard + intent-engineering-mcp + essays/meaning-over-access; vault-knowledge-mcp deferred until ship)"
```

Push when all commits land cleanly + dev QA passes (§7 below).

---

## 7. Dev QA checklist before push

Run `npm run dev` and confirm each surface renders the locked content. Hit every route:

### Home + About
- [ ] `/` renders hero tagline `The agents handle the loops. I handle the taste.` (D8 2026-05-30 dropped the `Product Manager.` line) + enlarged `/ AI PRODUCT MANAGER` role tag + no nav chrome (`noChrome={true}`)
- [ ] `/about/` renders B-1 beats (6 entries, color rhythm `gradient → amber → amber → gradient → gradient → gradient`) + B-2 prose (3 paragraphs, ends "The sentence was the product.") + B-4 prose (2 paragraphs, opens "Building got cheap. Comprehension didn't.") + NO recruiter italic + tagline `Raised by Saturday morning cartoons and Vercel deployment logs.`

### Case studies (all 5)
For each `/work/<slug>/` route, confirm:
- [ ] Title block renders correct frame + status + title + tags + locked anchor metric
- [ ] Tagline renders the locked string
- [ ] Hero media frame renders + View Transition cleanly morphs from the projects tile
- [ ] Opener prose renders the 3 locked paragraphs
- [ ] Investigation board renders the locked artifacts in correct order (forward or reverse per spec §7.4)
- [ ] Methods strip renders 4–7 rows + cross-link cells render `→` arrow + 1px underline
- [ ] 4Q block renders all four sections in canonical order
- [ ] Status-driven page shape correct per spec §12 (ACTIVE / SHIPPED / PAUSED / ARCHIVED)

**Status-specific spot-checks:**
- A-1 `ACTIVE` — anchor metric `ACT 1 SHIPPED · ACT 2 IN FLIGHT`, opener closes `Act 1 plays clean. Act 2 is on the board.`
- A-2 `ACTIVE` — anchor metric `OVERNIGHT FLEET · LAUNCHD-NATIVE`, opener references `08:30` (not 08:45), 4Q `what` references model layer without fixed counts
- A-3 `SHIPPED` — anchor metric `0.1.0 · NPM + MCP REGISTRY · 2026-05-12`, `<ShippedNow />` live block renders, opener references `08:30`
- A-4 `ARCHIVED` — anchor metric `B2B PM · INSTITUTIONAL CRYPTO RESEARCH`, `archived_reference_url: null` → Reference artifact link affordance NOT rendered, palette desaturation active, opener ¶3 contains "The firm restructured around me; the products didn't."
- A-5 `PAUSED` — anchor metric `PIPELINE 47% · GAME ON SHELF` (count-fragile per constraint #12 — deferred), return-condition callout renders, investigation board APR 20 (not APR 2), 2 KILLED artifacts render strikethrough X overlay

### Transactions
- [ ] `/transactions/` index renders the locked subhead `Every shipped artifact, dated and explained.` + RSS link in metadata strip
- [ ] `/transactions/fleet/` renders 4 rows (phase-d, knowledge-loop, eval-suite, substack-drafter)
- [ ] `/transactions/product/` renders 1 row (intent-engineering-mcp)
- [ ] Each `/transactions/<slug>/` deep-dive renders frontmatter correctly + value-prop pull-quote + methods + 4Q
- [ ] Daily Driver dateline template renders one of the 4 scenarios (1A/1B/1C/1D) per current overnight signal

### Architecture (if Gate A clear)
- [ ] `/architecture/` index renders locked hook `Most people see Obsidian as content. I treat my vault as agent infrastructure.` + 1 writeup row
- [ ] `/architecture/vault-scorecard/` renders all 11 bands per spec §2.2 (Mermaid ER diagram + scoreboard + HONEST NOTES + Try It Yourself)
- [ ] Cross-link bidirectionality with `/transactions/vault-scorecard/` (6th ledger row — see open items below)

### Essays (if Gate B clear)
- [ ] `/essays/` index renders h1 `Essays` + italic hook `I bet on meaning, not access.` + sober subhead `Thesis-shaped writing where the artifacts back the claim.` + footer fold (2 or 3 affordances depending on PUBLISHED state)
- [ ] `/essays/meaning-over-access/` renders all 12 bands per spec §2.2 (thesis pullquote + body + quadrantChart + role map with negative-space row + 4Q)
- [ ] RoleMap renders the Manus row in italic + secondary ink + em-dash where JD would be (per schema amendment Option A)
- [ ] Page title displays "Access Over Meaning" (matches OG card after Fix #1)

### Site chrome
- [ ] Every sub-page renders nav with correct active-tab carry (`aria-current="page"`)
- [ ] Footer renders 3 columns; SUBSCRIBE column shows transactions/rss + read-on-substack only (architecture + essays RSS commented out until those surfaces ship)
- [ ] Bottom strip shows copyright only (no LIGHT · DARK toggle)
- [ ] `/contact/` renders Newsreader 20px body sentence + 3 mono links
- [ ] `/404` renders `PAGE NOT FOUND` + `Nothing at this URL.` + `→ HOME` mono link

### Dark-mode wipe verification (§3.4 from site-chrome lock)

Run these greps + confirm zero matches (or only the allowed print-stylesheet `color-scheme: light`):

```bash
grep -rn "data-theme" src/    # zero
grep -rn "ThemeToggle" src/   # zero
grep -rn "sw-theme" src/      # zero
grep -rn "prefers-color-scheme" src/  # zero or only print-stylesheet
grep -rn "LIGHT · DARK" src/  # zero
```

If any return matches outside the print stylesheet, audit each one before committing.

### Methods graph cross-link verification

Per methods-strips lock §"Methods graph topology":
- [ ] `/work/animation-pipeline/` row 3 cross-links to `/work/code-brain` (orchestration row, cost cell mentions "HybridRouter")
- [ ] `/work/code-brain/` row 6 cross-links to `/work/animation-pipeline/` (downstream consumer row)
- [ ] `/work/intent-engineering-mcp/` row 5 cross-links to `/work/code-brain` (development environment row)
- [ ] `/work/the-block/` rows 1 AND 3 cross-link to `/work/code-brain` (production tooling + PRD authoring rows)
- [ ] `/work/16bitfit/` row 5 cross-links to `/work/animation-pipeline/` (sibling row)
- [ ] Cross-link cells render `→` arrow + 1px underline + navigate cleanly with View Transition

### Prebuild scripts

Confirm all pass:
- [ ] `scripts/fetch_canonical_sources.mjs` (transactions + architecture + essays canonical fetches; warn-on-404 acceptable per spec §11.1)
- [ ] `scripts/validate_case_study.mjs` (5 case studies pass)
- [ ] `scripts/validate_transactions.mjs` (5 rows pass)
- [ ] `scripts/validate_architecture.mjs` (Vault Scorecard passes — note: relatedLedgerRow: vault-scorecard requires the 6th transactions row OR null override; see open items)
- [ ] `scripts/validate_content.mjs` (essays validation includes JD HEAD checks, skips negative-space rows per amendment §9.2)
- [ ] `scripts/derive_crosslinks.mjs` (writes `src/content/crosslinks.json` with reverse-derived links)

### Lighthouse spot-checks

- [ ] Home: Performance ≥95, Accessibility ≥95, Best Practices = 100
- [ ] Case study deep-dive: Performance ≥90, Accessibility ≥95, Best Practices = 100
- [ ] Architecture deep-dive (Mermaid heavier): Performance ≥85, Accessibility ≥95, Best Practices = 100
- [ ] Essays deep-dive (Mermaid quadrantChart): Performance ≥85, Accessibility ≥95, Best Practices = 100

---

## 8. Open items deferred post-launch

Per Sean's 2026-05-28 sequencing: ship the site without these items; amend post-launch as needed. Track each as a follow-up issue or note.

| # | Item | Trigger to address |
|---|---|---|
| 1 | **6th transactions ledger row `vault-scorecard`** | Architecture lock blocks `relatedLedgerRow: vault-scorecard` on it. Two paths: (a) author the 6th row per transactions lock's row-shape rules; or (b) override architecture frontmatter to `relatedLedgerRow: null`. **Recommend (b) for v1 launch + author (a) within first week post-launch.** |
| 2 | **About §B-3 cartoon cels content collection** | Cels authored at `reference-images/about-cartoons/` + draft frontmatter at `cartoons-content-collection-draft.md`. Content collection scaffolding + rendering deferred per Sean's 2026-05-28 call. Trigger: post-launch polish pass. |
| 3 | **A-5 16BitFit anchor metric `PIPELINE 47% · GAME ON SHELF`** | Count-fragile per constraint #12; Sean deferred fix. Status-pair alternative candidates: `PIPELINE IN MOTION · GAME ON SHELF` or similar. Trigger: any future cleanup pass touching A-5 frontmatter. |
| 4 | **A-4 hero asset re-authoring** | Current `/assets/projects/the-block.webp` is the fabricated 3-tier-matrix diagram. Sean to author new pencil-test composite per the-block-cleanup lock §1.3 asset spec (3 Claude Skill cards + RevOps flow + x402 memo + bi-weekly P&E across the top). Use `gemini-pencil-animation-image-gen` skill. **Apply doesn't block on this** — current asset keeps rendering until Sean ships replacement. Trigger: when Sean has a free creative session. |
| 5 | **Backfill amendments for essays cross-link nulls** | 4 frontmatter nulls + 6 quadrantLegend nulls in `meaning-over-access.mdx`. Each backfill fires when the upstream artifact ships its ledger row or architecture writeup. Specific backfills: `relatedLedgerRow → meaning-over-access` (when 6th transactions row ships per item #1); `relatedArchitecture → ["vault-scorecard"]` (when /architecture/vault-scorecard/ ships); `quadrantLegend.{vault-knowledge-mcp,cost,judge,fleet}.artifact` (when each ledger row ships). |
| 6 | **vault-knowledge-mcp OG card** | Deferred until vault-knowledge-mcp surface ships ~6/4 with its own title-lock. Then re-author from scratch with title + italic + ship-date stamp per the locked content. |
| 7 | **Voice-review gate on upstream `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md`** | Architecture lock #6 blocks on it. If not voice-reviewed by apply time, hold lock #6 + ship transactions + essays + site chrome + cleanup phases without architecture. Trigger: Sean runs `writing-voice-modes` skill against the upstream essay + tags voice-reviewed. |
| 8 | **Manifesto + EXPLANATION upstream ship** | Essays lock #7 fetches canonical from `code-brain/docs/MEANING_OVER_ACCESS.md` + `code-brain/docs/MEANING_OVER_ACCESS_EXPLANATION.md`. If those URLs 404 at apply time, set manifesto `status: DRAFT` and flip to `PUBLISHED` on 6/19 publish day. |
| 9 | **CHANGELOG.md inception entry correction** | code-brain CHANGELOG.md v1.0.0 entry dated "2024-01-XX" is a mistake (Code Brain's actual first commit is 2026-02-06 per T1.3). Not a portfolio repo issue but worth noting for the next code-brain repo session. |

---

## 9. If you encounter unexpected state

**If existing on-disk MDX is structurally different from what the lock doc expected** (e.g., line numbers shifted, frontmatter fields renamed, components moved):

1. **Do not silently adjust the lock-doc content.** The locked strings are canonical.
2. **Read the lock doc's per-section grounding** to understand which field + which line the change targets.
3. **Match by field name + structural location** (not by line number). Lock docs reference line numbers as guidance, but the canonical anchor is the field name + section heading.
4. **If still ambiguous**, write an amendment doc at `docs/writing-council/IMPLEMENTATION-NOTES-2026-05-28.md` capturing what you encountered + how you resolved it. Sean reviews post-apply.

**If a voice-review gate isn't green** (Gate A or Gate B):

1. **STOP applying that specific lock doc.** Skip it; apply the others around it.
2. **Document the blocked state** in a commit message: `[BLOCKED] architecture lock holds for voice-review gate on code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md`
3. **Continue with the remaining locks** — the surface degrades gracefully (the architecture page renders empty placeholders if data isn't fetched; the build doesn't fail).

**If a cross-link slug doesn't resolve** during dev:

1. **Check the canonical lock doc** for which slug should resolve where (e.g., `/work/code-brain` resolves to `src/content/work/code-brain.mdx`).
2. **If the slug exists but the rendered link 404s**, check the Astro routing config + content collection schema in `src/content/config.ts`.
3. **If the slug doesn't exist** (e.g., `relatedLedgerRow: vault-scorecard` with no `src/content/transactions/vault-scorecard.md`), per the open items table #1: override to `null` for v1 launch.

**If a prebuild script fails:**

1. **Read the error** — most failures are either: schema mismatch (the schema amendment hasn't applied), missing canonical file (the upstream essay hasn't shipped), or missing cross-link slug.
2. **Apply the fix** per the lock doc's apply checklist.
3. **If unresolvable**, document in IMPLEMENTATION-NOTES and skip the blocking lock; ship the rest.

---

## 10. Final note

You're applying the cumulative output of 9 brainstorm sessions across 5 days of writing-council work. Every locked string was hand-verified against either resume evidence, code-brain CLAUDE.md, the canonical project docs, or Sean's lived experience confirmed in chat 2026-05-28. The hallucination audit was thorough; you should not encounter content that "feels wrong" while applying.

If you do encounter content that feels wrong, the heuristic is: **trust the lock doc over your priors.** The lock docs are the result of explicit Sean review at every step. Your priors might be informed by older council passes that the audit corrected.

Workstream D + cleanup phases 1–3 close when all 11 commits land + dev QA passes + the 2 OG card fixes ship. After that, the portfolio's writing surfaces are locked — Phase 2 Astro build + deploy is the next session's work.

Sean retains voice authority on every locked string. If anything in the lock docs feels off mid-apply, surface it to Sean before deviating.

Good luck. The audit was the hard part; the apply is mechanical. Ship it clean.

---

*Authored 2026-05-28 on MBP. For Mac Mini Claude Code's Workstream D + cleanup phases 1–3 apply session.*
