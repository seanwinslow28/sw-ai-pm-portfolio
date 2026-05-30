# Post-Mortem — Impeccable Pre-Vercel Critique

**Date:** 2026-05-30
**Branch:** `feat/impeccable-critique-cel-optim` (this work)
**Scope:** `/impeccable critique` of the v1 site before the Vercel publish. Two isolated assessments (live browser design review + deterministic detector), reconciled into a critique report, then applied the one verified-real fix and triaged the rest.
**Outcome:** Cel images optimized (~8.5MB → 236KB) and verified painting on `/about/`. Two originally-flagged "ship-blockers" were disproven under verification and correctly NOT changed. Remaining items are P3 judgment calls, none blocking, carried forward below.

---

## 1. Summary

The critique scored the build well (no AI-slop, strong editorial system, the ledger + case study prove the positioning). It surfaced two issues it labeled P1 ship-blockers — a desktop hero "burying the value prop under a teal void," and a public DRAFT/future-dated essay. **Both were false under verification.** The only evidence-backed defect was image weight on the `/about/` cartoon cels, which was fixed and verified.

The headline lesson: **two of the critique's top findings were artifacts of stale evidence, not real defects.** The fix work was small; the diagnostic discipline was the real story.

---

## 2. What the critique got wrong (and why)

### F1 — "Hero buries the value prop under a teal void" *(False / High-confidence-but-wrong)*
The live design review reported the H1 stuck at `opacity 0` below ~510px of empty teal, name at `absTop 666`. Two compounding bad inputs produced this:
- The `critique-home-*.png` screenshots handed in for review were **stale** — captured before the same-day D6 `LoadingOverlay` refactor (`CharacterLane.astro` / hero-spec §2 AMENDMENT 2026-05-30), so they showed the superseded inline-teal §7.5 icon stage that no longer exists.
- The live review ran against the **Astro dev server, which was in an HMR reload loop** (~106k static requests logged, reloading every 2-3s). That froze the once-per-session cream `LoadingOverlay` mid-cycle and continually restarted the hero's pure-CSS entrance animation, so the name never settled to `opacity 1` during inspection.

**Ground truth** (fresh `astro build` + `astro preview`, overlay dismissed via `sessionStorage`, measured at 1440×900): dateline top 60, `h1.hero-name` top **154** (opacity 1), tagline top **361** (opacity 1), character 224→800 — **the entire value prop is within the fold on both desktop and mobile.** The band above the dateline is the hero's own cream paper, not teal. No change made; the approved "shrink teal stage ~40%" fix would have broken a working hero.

### F2 — "Public DRAFT, future-dated essay is a credibility leak" *(Intentional, not a defect)*
`src/content/essays/meaning-over-access.mdx` carries `status: DRAFT`, `dateline: "BOSTON, JUNE 19, 2026"`, `published: "2026-06-19"`. This is documented in the frontmatter: *"status DRAFT per SHIP-PLAN D5 — manifesto publishes 2026-06-19; staged DRAFT does not gate v1 launch. Flip to PUBLISHED on publish day."* The index logic is built around it (`hasPublishedEssay` gates the RSS affordance; the DRAFT row is shown deliberately as an in-production signal). The future date is the planned publish date, not a bug. Decision: **leave it** (Sean, trusting the plan). The critique's "recruiter may read DRAFT as unfinished" remains a valid opinion, not a blocker.

---

## 3. What was real, and fixed

### Cartoon-cel image weight *(Real / Medium — fixed + verified)*
`/about/` "Saturday morning canon" served 6 cels as PNGs: five at ~540-636KB (896×1200) and **`06-jake.png` at 5.4MB (1792×2400)** — all 4-7× oversized vs the ≤240px display box. On a real connection these pop in late; the live review caught all six blank (`naturalWidth 0`) under the dev-server thrash.

**Fix:** sharp resize to 720px width (3× the display box) + WebP q82. Results:

| cel | before | after |
|---|---|---|
| 01-tommy-pickles | 636KB | 43KB |
| 02-ash-ketchum | 564KB | 36KB |
| 03-rocko | 624KB | 43KB |
| 04-samurai-jack | 616KB | 43KB |
| 05-uncle-iroh | 540KB | 36KB |
| **06-jake** | **5.4MB** | **25KB** |
| **dir total** | **~8.5MB** | **236KB** |

Updated `image:` refs in all 6 `src/content/cartoons/*.md`, removed the dead public PNGs (full-res masters preserved in `reference-images/about-cartoons/`). Validators + build green, zero PNG leaks. **Verified painting:** all 6 decode at 720×964, `complete:true`, 0 console errors on a fresh preview of `/about/`.

---

## 4. Carried forward — open P3s (none blocking publish)

These are judgment calls, deliberately not actioned this session. Pick up any in a follow-up.

- **P3-A — `B-n ·` spec-code kickers leak to the public `/about/` page.** Section kickers render as `"B-3 · Saturday morning canon"`, `"B-5 · Proof points"`. To a recruiter without the spec doc, the `B-n ·` prefix reads as CMS scaffolding (the one place the deterministic detector's "AI editorial scaffolding" flag has a point). *Fix:* drop the `B-n ·` prefix from the public kicker strings (keep the codes in the spec, not the DOM). *Open question:* is the internal-labeling aesthetic intentional brand, or accidental leak? Resolve before touching.

- **P3-B — `transition: width, height, margin` on index pages.** Detector flagged layout-property animation (impeccable ban; GPU jank) on `/work/`, `/transactions/`, `/essays/` — likely one shared component (hover/underline/progress). *Fix:* move to `transform`/`opacity`.

- **P3-C — One skipped heading level** (a11y) and a **flat type cluster** (11/12/13/16/17px) on `/work/`. Minor; fix the heading skip first (semantic/SEO), the type cluster is cosmetic.

- **Dismissed (not defects):** em-dash counts (Sean's voice, intentional), wide letter-tracking (JetBrains Mono uppercase labels, intentional), the `/contact/`-duplicates-footer and flat-404 notes (cosmetic, optional delight).

---

## 5. Lessons

1. **Rebuild before you diagnose.** The two worst findings both traced to inspecting a stale `dist`/screenshot set and a thrashing dev server. A critique's altitude is only as good as the artifact under it — for any visual/animation/timing claim, measure a fresh `astro build` + `astro preview`, never the dev server (HMR poisons timing) and never hand-me-down screenshots.
2. **Read the frontmatter before flagging "leaks."** F2 was a documented decision sitting in a comment three lines above the field. Check for an in-repo decision record before calling something an oversight.
3. **Verify the fix against the original symptom, not just the artifact.** The cel symptom was "blank on screen," so HTTP-200 wasn't proof — `naturalWidth > 0` on the live page was. Close the loop on the symptom the user would actually see.
4. **Sub-agents litter.** The two browser sub-agents wrote ~22 screenshots to the repo root. Clean agent scratch output at the end of the session, or scope it to a temp dir up front.
