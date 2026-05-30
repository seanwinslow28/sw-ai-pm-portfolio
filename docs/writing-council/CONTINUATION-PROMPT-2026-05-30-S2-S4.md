# Continuation Prompt — seanwinslow.com v1 remediation: finish S2 (hero) + S3 (tiles) + S4 (OG) + QA

You are continuing the seanwinslow.com v1 remediation apply on branch **`feat/v1-remediation-apply`**. The big lift — **S1, the entire 11-lock-doc apply (the actual remediation)** — is DONE and committed across 12 clean local commits. Your job is the remaining S2/S3/S4 + final QA, then stop at the PR hold point. **Nothing is pushed. Work on this branch only. One PR to main at the very end — ASK Sean first. Do NOT run any deploy (S6 is Sean's clicks).**

═══════════════════════════════════════════════════════════════
STEP 0 — ORIENT (read in order)
═══════════════════════════════════════════════════════════════
1. `CLAUDE.md` — three load-bearing things (character / voice / daily-dated layer) + the template-trap warning + locked decisions (note: hero tagline + email are already updated to the new values).
2. **`docs/superpowers/plans/2026-05-30-v1-remediation-apply.md`** — THE plan. You are executing its **Task 12 (D6 overlay half only — D8 title is done), Task 13, Task 14, Task 15.** Tasks 1–11 + Task 12's D8 half are complete.
3. **`docs/writing-council/IMPLEMENTATION-NOTES-2026-05-30.md`** — the running reconciliation log (NOTE-1..NOTE-5). Read it in full; it explains every deviation from the lock docs and the architecture/essays infra bugs you must NOT re-trigger. **Append to it** whenever on-disk ≠ a spec's expectation.
4. `docs/specs/SHIP-PLAN-2026-05-29.md` §S2/§S3 + §5 (launch gate) + D6/D8.
5. `docs/specs/hero-spec-v1.md` — the **"AMENDMENT 2026-05-30"** block right after the §2 anatomy diagram fully specs the D6 overlay you are building.

═══════════════════════════════════════════════════════════════
STEP 1 — SKILL
═══════════════════════════════════════════════════════════════
Invoke **`superpowers:executing-plans`** and treat `docs/superpowers/plans/2026-05-30-v1-remediation-apply.md` as the plan (start at Task 12's D6-overlay half). Also use **`superpowers:verification-before-completion`** before any "done" claim and **`superpowers:systematic-debugging`** for any bug. Create a TodoWrite list for Tasks 12–15. Tell Sean your task sequence before editing.

═══════════════════════════════════════════════════════════════
STEP 2 — CURRENT STATE (don't redo finished work)
═══════════════════════════════════════════════════════════════
`git log --oneline main..feat/v1-remediation-apply` shows 12 commits. `npm run prebuild && npm run build` is GREEN at 28 pages. Confirm both before starting.

ALREADY DONE — do NOT redo:
- **BLOCKER-1 fix:** architecture lock #6 was breaking every build (GitHub `/blob/` URLs + the fetch body-cache colliding with the architecture collection glob). Fixed via Sean's Option B: `essaySourceUrl`/`explanationUrl` → `null`, renders inline body via `<Content />`. See NOTE-1. **The same latent bug exists for essays (`set:html` at `src/pages/essays/[slug].astro` + `essay-bodies/` cache inside the essays glob) and architecture — do NOT set those URLs non-null. Inline-body fallback is the supported v1 state.**
- **S1 (Tasks 1–9):** about #1/#4 · 5 case-study openers/taglines/4Q #2/#3/#4 · D7 "Anima" + D10 "16BitFit" display titles (slugs unchanged) · S5 stale-data (JSON→2026-05-30, 08:45→08:30, DatelineLabel wired) · cleanup #9/#10/#11 · transactions 8-row union (#5+D9+D11; 3 fleet rows authored with inline 4Q) · essays #7 (schema amended, title "Access Over Meaning", staged `status: DRAFT`) · site chrome #8 (F-2 footer staging, dark-mode wipe already clean) + **email D4 → `sean.winslow28@gmail.com`** + lock-records. Both ceiling-grep checkpoints clean.
- **S2 partial:** hero-spec amended (D6+D8) + CHANGELOG + ripples · **D8 hero-title shipped** (`src/components/hero/Hero.astro` — dropped the "Product Manager." line, enlarged the `/ AI PRODUCT MANAGER` role tag) · **8 loading icons normalized** to `public/assets/hero-icons/loading/icon-{1-loop,2-terminal,3-graph,4-pencil,5-sticky-note,6-matrix,7-claude,8-coffee}.webp` (512×512, ~207KB total) via `scripts/phase-0/prep_hero_loading_icons.py`.

NEEDS SEAN'S VOICE REVIEW (he is reviewing now; do NOT rewrite unless he says): the 3 authored transaction 4Q bodies (`knowledge-loop-phase-6`, `vault-synthesizer-eval-suite`, `substack-drafter`) and the essays inline body. If Sean hasn't flagged them, leave them as-is.

═══════════════════════════════════════════════════════════════
STEP 3 — REMAINING TASKS (the work)
═══════════════════════════════════════════════════════════════

### TASK 12 (D6 overlay half) — Hero Issue B additive loading overlay + Playwright re-verify
Spec: `hero-spec-v1.md` §2 "AMENDMENT 2026-05-30". This refactors WORKING hero code — be careful, use systematic-debugging if anything breaks.

**Current hero architecture (read all three before editing):**
- `src/components/hero/Hero.astro` — composition (D8 title already done).
- `src/components/hero/CharacterLane.astro` — renders the floor shadow + `<HeroIconCycle />` + a `<template data-hero-video-template>` holding `<video class="character-video">`. A `<script>` mounts the video from the template **only when NOT reduced-motion** (the load-bearing **commit `ad64ce1` contract** — under `prefers-reduced-motion: reduce` NO `<video>` is in the DOM). It currently coordinates the lane icon-cycle → video crossfade via `initHeroIconCycle()`.
- `src/components/hero/HeroIconCycle.astro` + `src/scripts/hero-icon-cycle.js` — the §7.5 lane icon-cycle that the D6 overlay **supersedes**.
- `src/pages/index.astro` — composes the hero (home only, `noChrome={true}`).

**Build the overlay (per the spec amendment):**
1. New component (e.g. `src/components/hero/LoadingOverlay.astro`): a `position: fixed` full-viewport cream `#FFF9F0` field, z-index above everything, holding a single centered `<img>` that JS cycles through the 8 `public/assets/hero-icons/loading/*.webp` frames per §6 timing (≈480ms visible + 120ms crossfade each; total ≈4.8s — confirm against §6/§7.5), then **fades the overlay out and unmounts it**.
2. **Additive:** the hero renders underneath from first paint. The overlay never gates the hero. Mount it on the **home page only**.
3. **Gate the mount** on: JS available AND `!matchMedia("(prefers-reduced-motion: reduce)").matches` AND a `sessionStorage` flag unset. Set the flag after first run (once-per-session). Under reduced-motion or no-JS the overlay element does **not** mount at all.
4. **Preserve the `ad64ce1` reduced-motion contract.** Since the lane icon-cycle is superseded, simplify `CharacterLane` so the video (when motion is allowed) just plays + fades in on mount — remove the `HeroIconCycle` dependency + `initHeroIconCycle` coordination, but KEEP the template-based video mount that yields NO `<video>` in the DOM under reduced-motion. Handle the three mount paths the current script handles: fresh load (`DOMContentLoaded`), `pageshow` (bfcache), `astro:page-load` (View Transitions). If you remove `HeroIconCycle.astro`/`hero-icon-cycle.js`, remove their imports too; confirm nothing else references them.
5. **Playwright re-verify** (Playwright MCP `mcp__plugin_playwright_playwright__*` is available; run `npm run dev` first):
   - With reduced-motion emulated: `document.querySelector(".character-video")` → **null** AND the hero (name + tagline) is **visible immediately** AND the overlay did not mount.
   - With motion allowed + `sessionStorage` cleared: the overlay mounts once, cycles, fades out; reload in the same session → overlay does NOT mount again.
6. `npm run prebuild && npm run build` green. Commit (reference the hero-spec amendment).

### TASK 13 — Project tile integration (S3)
Sources: `assets/projects-tiles/A-{1..5}_*.png` (~3MB each; A-5 re-drawn hand-drawn for consistency, A-1 named Anima). Old set archived in `assets/projects-tiles/old/`.
1. Map tiles → slugs: `animation-pipeline`, `code-brain`, `intent-engineering-mcp`, `the-block`, `16bitfit` (`ls assets/projects-tiles/` to confirm exact filenames).
2. Optimize each PNG → WebP, crop to the 4:5 portrait `ProjectTile` spec (check `src/components/.../ProjectTile*` + `projects-section-spec-v1.md` for exact dims). A Pillow script under `scripts/phase-0/` (pattern-match `prep_hero_loading_icons.py`) is the clean way; keep PNG sources.
3. Place at `public/assets/projects/<slug>.webp` (these likely already exist as the superseded 5/24 tiles — overwrite).
4. Update `hero_media_alt` on the 5 `src/content/work/*.mdx`: **A-1 alt must reflect the new Anima art (no longer "mascot walk cycle")**. A-4 alt was already rewritten by lock #9 to the multi-surface composite — reconcile it to whatever the delivered A-4 tile actually depicts (if it differs, log to IMPLEMENTATION-NOTES and surface to Sean). `hero_media` paths are already `/assets/projects/<slug>.webp` — confirm.
5. Verify `view-transition-name: hero-media-<slug>` morphs tile→deep-dive cleanly (Playwright or manual dev at 390 + 1440). Per-tile visual QA before commit. Reference the superseded 5/24 tile commit(s) in the message for traceability.

### TASK 14 — OG card fixes (S4)
Per `docs/writing-council/IMPLEMENTATION-PROMPT-2026-05-28.md` §5. Script: `scripts/phase-0/generate_og_cards.py`.
- **Fix #1:** essays card title `Access vs Meaning` → `Access Over Meaning` (now matches the locked essays title).
- **Fix #2:** the `vault-knowledge-mcp.png` card is actually Intent Engineering MCP content — rename output to `intent-engineering-mcp.png` + fix the URL line `/work/vault-knowledge-mcp/` → `/work/intent-engineering-mcp/`. Delete the orphan `vault-knowledge-mcp.png`.
- Regenerate (`python3 scripts/phase-0/generate_og_cards.py`); verify the 4 cards: `og-default.png`, `vault-scorecard.png`, `intent-engineering-mcp.png`, `essays/meaning-over-access.png`.
- **Check the card location:** OG cards live in `reference-images/og-cards/` but the essays `ogImage` frontmatter points at `/og-cards/essays/meaning-over-access.png` (public). Confirm whether cards are served from `public/og-cards/` or copied at build — make sure the regenerated cards land where the site actually serves them (grep `og-cards` in `src/` + `astro.config` + `public/`).
- Update the `CLAUDE.md` "OG cards" status line per IMPLEMENTATION-PROMPT §5 (4-card set; drop the vault-knowledge-mcp parenthetical; note the deferral). `og-default.png` keeps its "AI Product Manager" copy (Sean's intentional call — do NOT change it).

### TASK 15 — Full QA + build gate (use verification-before-completion)
- Ceiling greps (iPad ≤3 · "Comprehension is the artifact" ≤3 · "Building got cheap" ≤2 · HybridRouter in `methods[]`/transactions/architecture cost-cells ONLY, never in openers/4Q/board-captions/About/essay prose · no fixed Code-Brain counts) — all clean.
- Dark-mode greps zero: `data-theme`, `ThemeToggle`, `sw-theme`, `LIGHT · DARK`, `prefers-color-scheme` (print stylesheet `color-scheme: light` allowed).
- Email grep: zero `sean@seanwinslow.com` in `src/` (constant is `sean.winslow28@gmail.com`).
- Methods cross-link graph (IMPLEMENTATION-PROMPT §7): A-1 row3→code-brain, A-2 row6→animation-pipeline, A-3 row5→code-brain, A-4 rows1&3→code-brain, A-5 row5→animation-pipeline — render `→` + navigate.
- Dev QA per IMPLEMENTATION-PROMPT §7: hit every route; status-specific anchors (A-1 ACTIVE "ACT 1 SHIPPED · ACT 2 IN FLIGHT"; A-2 08:30; A-3 SHIPPED; A-4 ARCHIVED, no reference-artifact link [`archived_reference_url: null`]; A-5 PAUSED, board "APR 20", 2 KILLED). Transactions index subhead "Every shipped artifact, dated and explained." + 8 rows across fleet/product/infra. Essays index hook/subhead + staged footer (2 affordances). Hero: new title + enlarged role tag + overlay once-per-session + reduced-motion safe.
- `npm run prebuild && npm run build` green; confirm `dist/` sitemap + RSS carry `seanwinslow.com` (not localhost).
- **⛔ HOLD — ask Sean before opening the PR.** Summarize what landed + the SHIP-PLAN §5 launch-gate status. Do NOT push or open the PR without his explicit go. Do NOT run S6 deploy.

═══════════════════════════════════════════════════════════════
STEP 4 — GUARDRAILS
═══════════════════════════════════════════════════════════════
- **Reconciliation, not greenfield.** When on-disk ≠ a lock/spec expectation, match by field name + section heading (not line number), trust the lock string over priors, and log to `IMPLEMENTATION-NOTES-2026-05-30.md`.
- **Don't re-trigger the infra bugs:** keep architecture + essays `sourceUrl`/`explanationUrl` null (inline-body fallback). The fetched-body `set:html` render + the `*/essay-bodies/` & `architecture/essays/` caches sit inside their collection globs and break the build.
- **Commit per coherent chunk**, referencing the spec/lock filename. Run `npm run prebuild && npm run build` before claiming any task done. Do NOT push.
- **Sean has final voice authority** on every locked string + the authored 4Q/essays prose. Surface — don't guess — anything that feels wrong or diverges from disk.
- **Image work:** keep PNG sources; per-asset visual QA at 390 + 1440 before commit.

═══════════════════════════════════════════════════════════════
STEP 5 — HOLD POINTS (stop and ask Sean)
═══════════════════════════════════════════════════════════════
- A-4 tile alt-text if the delivered tile depicts something other than lock #9's multi-surface-composite description.
- Any lock/spec string that doesn't match disk.
- **Before opening the PR to main. Before any deploy step.**

LAUNCH GATE (SHIP-PLAN §5 — all 8 green before deploy, which is Sean's): tiles integrated · hero Issue B passes reduced-motion re-verify + once-per-session + new title/role render · ceiling greps clean · architecture #6 applied + transactions renders incl. infra row · dark-mode greps zero · `npm run build` clean with apex URLs · recruiter test (5s/30s/2min) · Sean's no-template-feeling gut-check (PMP §1.3).

Begin with STEP 0, confirm the build is green, then report your task sequence (Tasks 12→15) for Sean's confirmation before editing.
