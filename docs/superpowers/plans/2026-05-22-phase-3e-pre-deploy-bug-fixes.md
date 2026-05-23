# Phase 3e Implementation Plan — Pre-deploy Bug Fixes (post-Phase-3d cleanup pass)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (direct controller execution) to implement this plan task-by-task. **Do NOT dispatch via superpowers:subagent-driven-development** — Phase 2 / 2b / 3a / 3b / 3c.1 / 3c.2 / 3d all hit hallucinated context constraints in subagent dispatch. Direct controller execution worked. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Close the 9 bugs Sean filed in [`docs/bugs-changes/seanwinslow-portfolio-bugs-and-errors-1.md`](../../bugs-changes/seanwinslow-portfolio-bugs-and-errors-1.md) so the site is presentable on localhost and ready for the Phase 4 Vercel deploy. Bugs span dark-mode removal (Bug 1 + auto-closes Bug 6), hero bfcache flash (Bug 2), torn-paper z-stacking (Bug 3), footer subscribe vs. navigate confusion (Bug 4), wrong external URLs (Bug 5), missing `/work/` index page (Bug 7), Jake-the-Dog row reflow (Bug 8), and hero floor-shadow recalibration (Bug 9).

**Architecture:** Pure cleanup — no new collections, no new prebuild scripts, no new dependencies, no new build infrastructure. The biggest behavioral change is *removing* dark mode entirely (a `~/.claude` user-facing decision Sean made on review). The largest single file added is one new `/work/index.astro` (~70 lines, mirrors `/essays/index.astro`'s shape). Every other change is an edit-in-place to existing components or a single-frontmatter-flag flip.

**Tech Stack:** No additions. Astro 5 + Tailwind 4 (already installed). The interactive shadow-calibration task uses the running dev server + browser DevTools — no new tooling.

**Scope:**
- **IN:** All 9 bugs from `docs/bugs-changes/seanwinslow-portfolio-bugs-and-errors-1.md`. The Bug 6 fix is implicit — it closes automatically when Bug 1 lands. Three spec edits + matching CHANGELOG entries (site-chrome §8 + about §11.3.1 + a new minimal §3.5 in projects-section-spec or a new tiny `/work/` index addendum). One smoke walk at the end covering all 9 bugs + side effects.
- **OUT (Phase 4):** Vercel deploy, custom-domain DNS cutover, Plausible analytics, Daily Driver agent writers (`/api/dateline.json` + `/api/next-piece.json` + `/api/about-pulse.json` + `/api/shipped-stats-<slug>.json`), V3 bridge `sw-theme` cookie hard cutover, the `.crosslinks.json` dev-server flake (already filed), prose rewrites in placeholder MDX bodies, asset re-encoding (`about-full-body.png` + `06-jake.png` size budget), and the home → main branch hard cutover.
- **OUT entirely (v2):** Auto-detect `prefers-color-scheme` (PMP §10 Decision 3 already deferred dark mode auto-switch to v2 — v1 was supposed to ship a manual toggle; we are now killing the toggle too, but the v2 path is unchanged), the `break_grid` cel-emphasis behavior (CSS dead code stays in `CartoonCel.astro` for v1.1 — it's now a no-op since no cel sets the flag), the time-of-day theme auto-switch.

**Open Question resolutions (locked at planning time):**

| OQ | Decision | Why |
|---|---|---|
| **OQ-1 — Bug 1: delete the V3 `sw-theme` cookie reader, or also write a fresh `sw-theme=light` to overwrite any stale cookies in the wild?** | **Just delete the reader.** Do not write a counter-cookie. | Phase 4 has not deployed yet — there are no "users in the wild" with stale `sw-theme=dark` cookies except Sean's own dev browser. Writing a counter-cookie adds chrome JS that runs on every page-load forever to fix a transient state in one browser. Sean clears his cookie once after the build (smoke walk Step 10.2) and the problem disappears. Document the deviation in CHANGELOG so a future audit can find it. |
| **OQ-2 — Bug 2: re-init the icon cycle on `pageshow` (bfcache event) or hide the container synchronously via an inline script before first paint?** | **Both — belt-and-suspenders.** (a) Add an inline script in `BaseLayout.astro` that sets `document.documentElement.dataset.heroCyclePlayed = "true"` synchronously when `sessionStorage["hero-cycle-played"] === "true"`, AND (b) add a CSS rule that hides `.hero-intro-cycle` when that data attribute is present, AND (c) add a `pageshow` listener in `hero-icon-cycle.js` to re-run init on bfcache restore. | (a) + (b) win the flash war on bfcache (the CSS rule applies before paint). (c) covers the View-Transitions case (`ClientRouter` doesn't fire `pageshow` but does fire `astro:after-swap` — but the inline script doesn't re-run on swap, only on full page load). Pure CSS + sessionStorage hides the container on bfcache restore even before JS evaluates; the `pageshow` listener is the defensive fallback if the static CSS rule misses. The combined cost is ~12 lines across two files and zero new JS frameworks. |
| **OQ-3 — Bug 3: drop `z-index: 10` from `.page-sheet` globally, or bump `.projects` to a higher z-index?** | **Bump `.projects` to `z-index: 11`.** Don't touch `.page-sheet`. | `.page-sheet` is used by 6+ surfaces (`/about/`, `/contact/`, `/404`, AboutTeaser, etc.); changing its z-index globally risks side effects across the site. `.projects` is one element used once on the home page; bumping it to 11 is surgical, reasons-itself locally in `ProjectsSection.astro`, and matches the spec's stacking-order intent (the tear PNG should bleed *over* the next section). One-line CSS edit; no ripple. |
| **OQ-4 — Bug 4: subscribe column restructure approach (a/b/c from kickoff prompt)?** | **Option (b) — swap hrefs + add small `rss` glyph.** | Matches the existing 3-column footer layout from site-chrome-spec §7.1 verbatim (Contact · Subscribe · Dashboard). Option (a) would force a 4-column footer or a stacked re-org Sean hasn't reviewed. Option (c) (delete the column) loses the explicit "I publish — subscribe" affordance that's load-bearing for recruiters who follow Substack. (b) is one HTML edit per row, preserves the column header "SUBSCRIBE" as the user-facing label, and keeps the RSS auto-discovery `<link rel="alternate">` in BaseLayout untouched. |
| **OQ-5 — Bug 7: build a `/work/` index page, or drop `WORK` from the nav and route the home Projects grid as the only `/work/` surface?** | **Build the index page.** | The four other catalog surfaces (`/transactions/`, `/architecture/`, `/essays/`, `/about/`) all have index pages. Dropping `/work/` from the nav would make WORK an orphan affordance — recruiters who land via OG card or Substack referrer expect a `/work/` index to exist. The index also gives `/work/` an SEO surface (the home page is `/`, not `/work/`). Cost: ~70 lines of Astro mirroring `/essays/index.astro`. Spec edit: a new §3.5 inside projects-section-spec-v1.md documenting the index page's relationship to the home Projects grid. |
| **OQ-6 — Bug 8: also remove the `.cartoon-cel--break-grid` CSS rules from `CartoonCel.astro` since no cel sets the flag anymore?** | **Leave the CSS in place; flip the MDX flag only.** | The schema field stays defined in `src/content/config.ts` and the CSS is ~30 lines of dead code. If Sean later wants to emphasize a different cel (v1.1), the field + CSS are ready. Deleting the CSS would require restoring it later. Single-frontmatter-flag-flip is the lowest-blast-radius fix; the dead code is harmless. Document the deviation in CHANGELOG: about-spec §11.3.1 v1 ships all 6 cels uniform; break_grid reserved for v1.1. |

**Branch state:** `phase-2-foundations` at HEAD `b0d1d96` (the most recent Phase 3d commit — "essays: meaning-over-access body + chart sync"). 13 Phase 3d commits accumulated since `446b764`. The new untracked `docs/bugs-changes/` directory carries the bug report + 17 screenshots — these get committed alongside the plan in the pre-flight pass so the Phase 3e branch state is clean. **Do NOT switch branches.** Sean's standing rule "Sean works on `main`" remains paused; Phase 4 carries the cutover. Each task in this plan commits atomically; ~14-16 incremental commits total (incl. the plan + bug-doc commit).

**Operating posture (direct controller execution):** Run each task in order. After each commit, verify the next task's preconditions still hold (e.g., dev server still serving 200 on existing routes, prebuild gates still exit 0 if they're touched). Surface BLOCKED only on genuine errors (build failure, dev server crash). Don't pause between routine tasks — Sean signed off on continuous execution under Auto Mode.

**Lessons folded in from Phase 3c.1 + 3c.2 + 3d execution:**
- **Dev server caches content collections.** When a single `.md` file under `src/content/cartoons/` flips a frontmatter value (Task 4.1), the dev server's vite cache *usually* picks it up on save — but verify by reloading `/about/` in the browser; if Jake still appears alone in row 3, kill+restart the dev server.
- **MDX gotcha doesn't apply here.** Phase 3e touches zero MDX body prose. The only MDX edit is the `linkedin_url` / `github_url` frontmatter in `src/content/about/index.mdx` (Task 2.2) — pure frontmatter, no body component-name risk.
- **`ClientRouter` View Transitions need explicit re-init for `<script>` side effects.** Phase 3d learned this with the annotation positioner (`document.addEventListener("astro:after-swap", initAnnotations)`). The hero-icon-cycle inherits the same pattern in Task 5.2 — the `pageshow` listener handles bfcache, but we ALSO wire `astro:page-load` for the SPA-navigation path so the home page renders identically whether reached via View Transition or hard navigation.
- **`isolation: isolate` is the cleaner stacking-context primer than `z-index: 0` when you don't want a numeric value to fight with other rules.** Task 6.1 uses plain `z-index: 11` because we explicitly want 11 > 10; isolation would obscure the comparison.
- **`grid-column: span 2` reflows but `grid-column: span 1` doesn't.** Task 4.1 (the Jake reflow) relies on the parent grid's `repeat(3, minmax(0, 280px))` filling row by row once Samurai Jack stops spanning 2 columns. No grid-template-areas rewrite needed; Jake naturally lands in column 3 of row 2.

---

## File Structure

Files this plan creates, deletes, or modifies:

```
sw-ai-pm-portfolio/
├── CHANGELOG.md                                            ← Task 9.1: 3 changelog entries (site-chrome §8 dark-mode removal, about §11.3.1 break_grid v1 default, projects-section §3.5 /work/ index)
│
├── docs/
│   ├── bugs-changes/                                       ← Task 0.2: commit the bug report + 17 screenshots into the repo
│   │   ├── seanwinslow-portfolio-bugs-and-errors-1.md
│   │   └── screenshots/error-{1..9}*.png                   (17 PNGs)
│   ├── specs/
│   │   ├── site-chrome-spec-v1.md                          ← Task 9.1: strike §8 + §8.1-§8.6 (theme toggle); note deviation in §8 retained-as-historical
│   │   ├── about-spec-v1.md                                ← Task 9.1: add v1 break_grid:false note to §11.3.1
│   │   └── projects-section-spec-v1.md                     ← Task 9.1: add §3.5 documenting the new /work/ index page
│   └── superpowers/plans/
│       └── 2026-05-22-phase-3e-pre-deploy-bug-fixes.md     ← this file (commits in Task 0.1)
│
├── src/
│   ├── content/
│   │   ├── about/index.mdx                                 ← Task 2.2: linkedin_url + github_url frontmatter fields → corrected URLs
│   │   └── cartoons/04-samurai-jack.md                     ← Task 4.1: break_grid: true → false
│   │
│   ├── components/
│   │   ├── about/ProofPoints.astro                         ← Task 2.3: visible link text + correct URLs
│   │   ├── chrome/SiteFooter.astro                         ← Task 1.4: remove <ThemeToggle /> import + render; Task 2.3: visible link text update; Task 8.1: SUBSCRIBE column href + glyph restructure
│   │   ├── chrome/ThemeToggle.astro                        ← Task 1.3: DELETE file entirely
│   │   └── hero/CharacterLane.astro                        ← Task 5.2: wire astro:page-load re-init; Task 7.1: shadow recalibration (per-breakpoint values baked from DevTools)
│   │
│   ├── layouts/BaseLayout.astro                            ← Task 1.5: delete the FOUC-prevention inline script; Task 5.1: add the inline pre-paint hero-cycle data-attribute setter
│   │
│   ├── lib/site.ts                                         ← Task 2.1: LINKEDIN_URL + GITHUB_URL + SUBSTACK_URL + SITE_REPO_URL → corrected values
│   │
│   ├── pages/
│   │   ├── contact.astro                                   ← Task 2.3: visible link text update (hrefs already come from site.ts)
│   │   └── work/index.astro                                ← Task 3.1: NEW — /work/ index page mirroring /essays/index.astro structure
│   │
│   ├── scripts/hero-icon-cycle.js                          ← Task 5.2: add pageshow + astro:page-load listeners; refactor init to be idempotent
│   │
│   └── styles/global.css                                   ← Task 1.2: delete :root[data-theme="dark"] block; Task 5.1: add .hero-intro-cycle suppression rule
```

No new dependencies. No new prebuild scripts. No new content collections. No new layouts. Net delta: **+1 new file (`/work/index.astro`)**, **−1 deleted file (`ThemeToggle.astro`)**, **~9 edited files**, **+3 spec edits**, **+1 CHANGELOG batch**.

---

## Section 0 — Pre-flight

### Task 0.1: Commit this plan + verify Phase 3d baseline

**Files:**
- Create: `docs/superpowers/plans/2026-05-22-phase-3e-pre-deploy-bug-fixes.md` (this file — already written; needs commit)

- [ ] **Step 1: Verify branch + HEAD + working tree state**

Run: `git branch --show-current && git rev-parse HEAD && git status --porcelain`

Expected: branch `phase-2-foundations`, HEAD `b0d1d96` (or later if v1.1 follow-ups landed since planning), `git status --porcelain` shows `?? docs/bugs-changes/` + `?? docs/superpowers/plans/2026-05-22-phase-3e-pre-deploy-bug-fixes.md`.

- [ ] **Step 2: Verify Phase 3d artifacts are in place**

Run in parallel:
- `ls src/pages/about.astro src/content/about/index.mdx`
- `ls src/content/cartoons/*.md | wc -l` → expected `6`
- `ls src/components/about/CartoonCanon.astro src/components/about/CartoonCel.astro src/components/about/ProofPoints.astro`
- `ls src/components/chrome/ThemeToggle.astro` → expected exists (it gets deleted in Task 1.3)

Expected: all paths exist; cartoons collection has 6 entries.

- [ ] **Step 3: Verify dev server boots cleanly + all 5 nav routes serve 200**

Run: `npm run dev` in background. Wait until you see `astro v5.x.x ready in NNNms`. Then verify:

```bash
for path in / /work/ /transactions/ /architecture/ /essays/ /about/ /contact/; do
  echo -n "$path → "; curl -sI "http://localhost:4321$path" | head -1
done
```

Expected: `/` `/transactions/` `/architecture/` `/essays/` `/about/` `/contact/` return `HTTP/1.1 200 OK`. `/work/` returns `HTTP/1.1 404 Not Found` (the bug we're fixing in Task 3.1). Note this baseline state — Task 3.1's verification turns the `/work/` line green.

- [ ] **Step 4: Commit the plan file**

```bash
git add docs/superpowers/plans/2026-05-22-phase-3e-pre-deploy-bug-fixes.md
git commit -m "$(cat <<'EOF'
docs(phase-3e): implementation plan for 9 pre-deploy bug fixes

Plan covers dark-mode removal (Bug 1 + auto-closes Bug 6), hero bfcache
flash (Bug 2), torn-paper z-stacking (Bug 3), footer subscribe restructure
(Bug 4), external URL corrections (Bug 5), /work/ index page (Bug 7),
cartoon canon Jake reflow (Bug 8), and hero shadow recalibration (Bug 9).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: 1 file changed, clean commit.

### Task 0.2: Commit the bug report + screenshots into the repo

**Files:**
- Create (commit-existing): `docs/bugs-changes/seanwinslow-portfolio-bugs-and-errors-1.md` + 17 PNG screenshots

- [ ] **Step 1: Verify the bug-doc tree is in place**

Run: `ls docs/bugs-changes/ && ls docs/bugs-changes/screenshots/ | wc -l`

Expected: `seanwinslow-portfolio-bugs-and-errors-1.md` + `screenshots/` subdir; 17 PNG files in `screenshots/` (`error-1-1.png`, `error-1-2.png`, `error-2.png`, `error-3.png`, `error-4-1.png`, `error-4-2.png`, `error-4-3.png`, `error-5-1.png`, `error-5-2.png`, `error-5-3.png`, `error-5-4.png`, `error-6-1.png`, `error-6-2.png`, `error-6-3.png`, `error-7.png`, `error-8.png`, `error-9.png`).

- [ ] **Step 2: Commit the bug-changes folder**

```bash
git add docs/bugs-changes/
git commit -m "$(cat <<'EOF'
docs(phase-3e): bug report + 17 screenshots for pre-deploy fixes

Source of truth for Phase 3e — the 9 bugs Sean filed after running v1
on localhost. Plan at docs/superpowers/plans/2026-05-22-phase-3e-pre-deploy-bug-fixes.md
addresses each.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: 18 files changed (1 md + 17 png).

- [ ] **Step 3: Final pre-flight smoke**

Run: `git status --porcelain` → expected: empty (clean working tree).

---

## Section 1 — Bug 1: Remove dark mode entirely

Dark mode looks awful against the warm-paper torn-paper texture and the hero animation. Sean's call: kill it entirely, not fix it. This also auto-closes **Bug 6** (section pages opening in dark mode because the V3 `sw-theme=dark` cookie was still being read).

### Task 1.1: Delete the dark-mode token block from `global.css`

**Files:**
- Modify: `src/styles/global.css:51-59`

- [ ] **Step 1: Read the current dark-mode block**

Already verified at planning: `src/styles/global.css:51-59` carries:

```css
/* ===== Dark mode tokens ===== */
:root[data-theme="dark"] {
  --paper: #1A1A1E;
  --ink: #FFF9F0;
  --ink-secondary: #A0B5B8;
  --teal: #2A6E72;
  --border-paper: rgba(255, 249, 240, 0.15);
  /* chrome stays the same — see texture-spec §2.4 */
}
```

- [ ] **Step 2: Delete the block**

Use Edit:

```
old_string:
/* ===== Dark mode tokens ===== */
:root[data-theme="dark"] {
  --paper: #1A1A1E;
  --ink: #FFF9F0;
  --ink-secondary: #A0B5B8;
  --teal: #2A6E72;
  --border-paper: rgba(255, 249, 240, 0.15);
  /* chrome stays the same — see texture-spec §2.4 */
}

/* ===== Reset (minimal) ===== */
```

```
new_string:
/* ===== Reset (minimal) ===== */
```

- [ ] **Step 3: Verify no other `data-theme` references remain in global.css**

Run: `grep -n "data-theme\|dark" src/styles/global.css`

Expected: no matches (the `.theme-toggle` selector in the print stylesheet at line 154 also goes — see Step 4).

- [ ] **Step 4: Drop the `.theme-toggle` selector from the print stylesheet**

The print block at `src/styles/global.css:150-159` lists `.theme-toggle` among elements to hide. Since `ThemeToggle.astro` is being deleted (Task 1.3), the selector becomes dead code:

```
old_string:
  header,
  footer,
  .skip-link,
  .theme-toggle,
  .character,
  [aria-hidden="true"] {
```

```
new_string:
  header,
  footer,
  .skip-link,
  .character,
  [aria-hidden="true"] {
```

- [ ] **Step 5: Verify global.css is still valid CSS**

Run: `npx stylelint src/styles/global.css --syntax css 2>&1 | head -20` — OR if stylelint isn't installed, simply rely on the dev server's HMR which would error out on a syntax fault. Hot-reload `/` and confirm no console errors and the page still renders.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css
git commit -m "$(cat <<'EOF'
fix(phase-3e): remove dark-mode tokens from global.css (Bug 1)

The :root[data-theme="dark"] override block and the .theme-toggle print
selector both go. Dark mode reads awful against the warm-paper torn-paper
texture and the hero animation; killing entirely is the right call.

Auto-closes Bug 6 once the cookie reader is deleted (Task 1.5).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 1.2: Delete the `ThemeToggle.astro` component file

**Files:**
- Delete: `src/components/chrome/ThemeToggle.astro`

- [ ] **Step 1: Verify the file is only imported in one place**

Run: `grep -rn "ThemeToggle" src/ 2>/dev/null`

Expected: 2 matches — `src/components/chrome/SiteFooter.astro:13` (import) and `src/components/chrome/SiteFooter.astro:48` (render). Task 1.3 deletes both call-sites.

- [ ] **Step 2: Delete the file**

Run: `git rm src/components/chrome/ThemeToggle.astro`

Expected: file removed from working tree and staged for deletion.

- [ ] **Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
fix(phase-3e): delete ThemeToggle.astro component (Bug 1)

Component only rendered the LIGHT · DARK toggle in the universal footer
strip; with dark mode dropped, the toggle has no purpose. Removed
alongside its global.css tokens.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 1.3: Remove `<ThemeToggle />` from `SiteFooter.astro`

**Files:**
- Modify: `src/components/chrome/SiteFooter.astro` (drop the import + the render call; flex-justify the strip cleanly)

- [ ] **Step 1: Drop the import line**

```
old_string:
import {
  EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
  SUBSTACK_URL,
  FLEET_DASHBOARD_URL,
  SITE_REPO_URL,
  COPYRIGHT_YEAR,
  SITE_LOCALE,
} from "~/lib/site";
import ThemeToggle from "./ThemeToggle.astro";
```

```
new_string:
import {
  EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
  SUBSTACK_URL,
  FLEET_DASHBOARD_URL,
  SITE_REPO_URL,
  COPYRIGHT_YEAR,
  SITE_LOCALE,
} from "~/lib/site";
```

- [ ] **Step 2: Remove the `<ThemeToggle />` element from the footer strip**

Replace the entire `<div class="footer-strip">` block so the copyright sits alone, right-aligned, as the only element in the strip:

```
old_string:
    <div class="footer-strip">
      <ThemeToggle />
      <p class="copyright">© {COPYRIGHT_YEAR} SEAN WINSLOW · {SITE_LOCALE}</p>
    </div>
```

```
new_string:
    <div class="footer-strip">
      <p class="copyright">© {COPYRIGHT_YEAR} SEAN WINSLOW · {SITE_LOCALE}</p>
    </div>
```

- [ ] **Step 3: Update the `.footer-strip` flex layout**

The previous `.footer-strip` used `justify-content: space-between` with two children (toggle on left, copyright on right). With one child, change to `justify-content: flex-end` so the copyright sits flush-right on desktop. The mobile rule already does `flex-direction: column` + `align-items: flex-start`, which now renders the copyright left-aligned on mobile — that's the correct mobile behavior.

```
old_string:
  .footer-strip {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 0.5px solid var(--border-paper);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
```

```
new_string:
  .footer-strip {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 0.5px solid var(--border-paper);
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
```

- [ ] **Step 4: Verify dev server still renders the footer + footer-strip without the toggle**

Hot-reload any page (e.g., `/about/`). Scroll to the footer. Confirm:
- 3 columns (CONTACT · SUBSCRIBE · DASHBOARD) render normally
- The bottom strip shows only the copyright `© 2026 SEAN WINSLOW · BOSTON`, right-aligned on desktop
- No console errors

- [ ] **Step 5: Commit**

```bash
git add src/components/chrome/SiteFooter.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): remove ThemeToggle render + import from footer (Bug 1)

Footer-strip now contains only the copyright, justified flex-end on
desktop. Mobile column behavior unchanged (already collapsed via
@media (max-width: 768px)).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 1.4: Delete the FOUC-prevention `sw-theme` reader from `BaseLayout.astro`

**Files:**
- Modify: `src/layouts/BaseLayout.astro:79-86`

- [ ] **Step 1: Delete the inline theme script**

```
old_string:
    <!-- Inline theme script (FOUC prevention) -->
    <script is:inline>
      (function() {
        var match = document.cookie.match(/sw-theme=(light|dark)/);
        var theme = match ? match[1] : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>

    <!-- View Transitions -->
    <ClientRouter />
```

```
new_string:
    <!-- View Transitions -->
    <ClientRouter />
```

- [ ] **Step 2: Verify no stale `data-theme` attribute is being set elsewhere**

Run: `grep -rn "data-theme\|sw-theme" src/ 2>/dev/null`

Expected: no matches. (Note: this also closes Bug 6 — any visitor with a stale `sw-theme=dark` cookie now renders in light mode because no JS reads the cookie.)

- [ ] **Step 3: Hot-reload + verify**

Hard-reload `/` and `/about/` in the browser. Confirm:
- Both pages render in light mode regardless of any `sw-theme=dark` cookie still in the dev browser
- No flash of dark-mode tokens at first paint
- Devtools → Elements → `<html>` element has no `data-theme` attribute

To prove Bug 6 closes: in dev tools console, run `document.cookie = "sw-theme=dark; path=/"` then hard-reload `/about/`. Expected: page still renders in light mode (the cookie is now ignored). Then clear the cookie: `document.cookie = "sw-theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"`.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): delete sw-theme FOUC-prevention script (Bug 1 + Bug 6)

Removes the inline <script> in <head> that read document.cookie's
sw-theme value and set data-theme on <html>. With dark mode entirely
gone (Task 1.1) the reader is dead code. Side effect: closes Bug 6
(section pages auto-loading in dark mode because of stale V3 bridge
cookies).

Per Phase 3e OQ-1: do not write a counter-cookie to clear stale
sw-theme=dark values; the v1 dev browser is the only consumer and
Sean clears it manually in the smoke walk.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 2 — Bug 5: External link corrections (substack / linkedin / github)

Five touchpoints need the correct URLs. The constants in `src/lib/site.ts` are the source of truth — visible link text in three components is hardcoded and must be updated alongside the constants.

**Authoritative URLs (per Sean's bug doc):**

| Constant | Old (wrong) | New (correct) |
|---|---|---|
| `LINKEDIN_URL` | `https://linkedin.com/in/seanwinslow` | `https://www.linkedin.com/in/sean-winslow-204390a5` |
| `GITHUB_URL` | `https://github.com/seanwinslow` | `https://github.com/seanwinslow28` |
| `SUBSTACK_URL` | `https://sean.substack.com` | `https://substack.com/@seanpwins` |
| `SITE_REPO_URL` | `https://github.com/seanwinslow/sw-portfolio` | `https://github.com/seanwinslow28/sw-ai-pm-portfolio` |

**Authoritative visible-text strings** (replace everywhere the old form appears):

| Old (wrong) | New (correct) |
|---|---|
| `linkedin.com/in/seanwinslow` | `linkedin.com/in/sean-winslow-204390a5` |
| `github.com/seanwinslow` | `github.com/seanwinslow28` |

### Task 2.1: Update the 4 URL constants in `src/lib/site.ts`

**Files:**
- Modify: `src/lib/site.ts:10-14`

- [ ] **Step 1: Verify current constant values**

Already verified at planning: `src/lib/site.ts:10-14` carries the wrong URLs as listed in the table above.

- [ ] **Step 2: Replace the 4 URL constants**

```
old_string:
export const EMAIL = "sean@seanwinslow.com";
export const LINKEDIN_URL = "https://linkedin.com/in/seanwinslow";
export const GITHUB_URL = "https://github.com/seanwinslow";
export const SUBSTACK_URL = "https://sean.substack.com";
export const FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com";
export const SITE_REPO_URL = "https://github.com/seanwinslow/sw-portfolio";
```

```
new_string:
export const EMAIL = "sean@seanwinslow.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sean-winslow-204390a5";
export const GITHUB_URL = "https://github.com/seanwinslow28";
export const SUBSTACK_URL = "https://substack.com/@seanpwins";
export const FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com";
export const SITE_REPO_URL = "https://github.com/seanwinslow28/sw-ai-pm-portfolio";
```

- [ ] **Step 3: Verify by grepping for the old patterns**

Run: `grep -rn 'linkedin.com/in/seanwinslow"\|github.com/seanwinslow"\|sean.substack.com\|seanwinslow/sw-portfolio' src/lib/`

Expected: no matches. (The `seanwinslow28/sw-ai-pm-portfolio` form is the correct one — it should match in any subsequent grep on the corrected file.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/site.ts
git commit -m "$(cat <<'EOF'
fix(phase-3e): correct LINKEDIN/GITHUB/SUBSTACK/REPO URL constants (Bug 5)

Previous values pointed at:
  - linkedin.com/in/seanwinslow — different Sean Winslow ("Digital Humanist")
  - github.com/seanwinslow — SeanWinslow with no public repos
  - sean.substack.com — Sean Haufler, a stranger
  - github.com/seanwinslow/sw-portfolio — non-existent repo

Corrected values now point at the actual Sean Winslow's profiles
(seanwinslow28 on GitHub, sean-winslow-204390a5 on LinkedIn, @seanpwins
on Substack) and the canonical portfolio repo
(seanwinslow28/sw-ai-pm-portfolio).

Visible link text updates land in Task 2.3 (4 components).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 2.2: Update the 2 URL fields in `src/content/about/index.mdx`

**Files:**
- Modify: `src/content/about/index.mdx:12-13`

- [ ] **Step 1: Replace the two frontmatter URL fields**

```
old_string:
linkedin_url: https://linkedin.com/in/seanwinslow
github_url: https://github.com/seanwinslow
```

```
new_string:
linkedin_url: https://www.linkedin.com/in/sean-winslow-204390a5
github_url: https://github.com/seanwinslow28
```

- [ ] **Step 2: Verify the about content collection still validates**

Run: `npm run astro -- sync` (or rely on the next dev-server hot-reload — the about Zod schema has `linkedin_url: z.string().url()` + `github_url: z.string().url()` per `src/content/config.ts:281-282`; both new URLs are valid HTTPS).

Expected: sync exits 0, no validation errors.

- [ ] **Step 3: Hot-reload `/about/` + verify**

Open `/about/` in the browser. Scroll to the B-5 Proof Points section. Hover the LinkedIn and GitHub links → confirm the bottom-of-browser tooltip shows the corrected URLs. (The *visible text* still reads `linkedin.com/in/seanwinslow` and `github.com/seanwinslow` — that's the hardcoded literal in `ProofPoints.astro`, fixed in Task 2.3.)

- [ ] **Step 4: Commit**

```bash
git add src/content/about/index.mdx
git commit -m "$(cat <<'EOF'
fix(phase-3e): correct linkedin_url + github_url in about frontmatter (Bug 5)

Both fields previously pointed at the wrong-Sean profiles. Now match
src/lib/site.ts canonical values (Task 2.1).

Visible link text fix is Task 2.3.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 2.3: Update visible link text in 3 components

**Files:**
- Modify: `src/components/about/ProofPoints.astro:33,39`
- Modify: `src/components/chrome/SiteFooter.astro:23-24`
- Modify: `src/pages/contact.astro:32,37`

- [ ] **Step 1: Update `ProofPoints.astro` visible text**

```
old_string:
    <li>
      <a href={linkedinUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        linkedin.com/in/seanwinslow
      </a>
    </li>
    <li>
      <a href={githubUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        github.com/seanwinslow
      </a>
    </li>
```

```
new_string:
    <li>
      <a href={linkedinUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        linkedin.com/in/sean-winslow-204390a5
      </a>
    </li>
    <li>
      <a href={githubUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        github.com/seanwinslow28
      </a>
    </li>
```

- [ ] **Step 2: Update `SiteFooter.astro` visible text**

```
old_string:
          <li><span class="prefix">→</span> <a href={LINKEDIN_URL} rel="me">linkedin.com/in/seanwinslow</a> <span class="glyph">↗</span></li>
          <li><span class="prefix">→</span> <a href={GITHUB_URL} rel="me">github.com/seanwinslow</a> <span class="glyph">↗</span></li>
```

```
new_string:
          <li><span class="prefix">→</span> <a href={LINKEDIN_URL} rel="me">linkedin.com/in/sean-winslow-204390a5</a> <span class="glyph">↗</span></li>
          <li><span class="prefix">→</span> <a href={GITHUB_URL} rel="me">github.com/seanwinslow28</a> <span class="glyph">↗</span></li>
```

- [ ] **Step 3: Update `contact.astro` visible text**

```
old_string:
      <li>
        <span class="prefix">&rarr;</span>
        <a href={LINKEDIN_URL} rel="me">linkedin.com/in/seanwinslow</a>
        <span class="glyph">&#x2197;</span>
      </li>
      <li>
        <span class="prefix">&rarr;</span>
        <a href={GITHUB_URL} rel="me">github.com/seanwinslow</a>
        <span class="glyph">&#x2197;</span>
      </li>
```

```
new_string:
      <li>
        <span class="prefix">&rarr;</span>
        <a href={LINKEDIN_URL} rel="me">linkedin.com/in/sean-winslow-204390a5</a>
        <span class="glyph">&#x2197;</span>
      </li>
      <li>
        <span class="prefix">&rarr;</span>
        <a href={GITHUB_URL} rel="me">github.com/seanwinslow28</a>
        <span class="glyph">&#x2197;</span>
      </li>
```

- [ ] **Step 4: Final grep audit — no `seanwinslow` (without -204390a5 or 28 suffix) should appear in visible link text or in any src/ file outside legitimate context**

Run:

```bash
grep -rn 'linkedin.com/in/seanwinslow\b' src/ 2>/dev/null
grep -rn 'github.com/seanwinslow\b' src/ 2>/dev/null
```

Expected: both return 0 matches. (The `\b` word boundary ensures `seanwinslow28` and `sean-winslow-204390a5` don't match.)

Also audit the in-prose URL in essays/meaning-over-access.mdx and architecture/vault-knowledge-mcp.mdx (already verified at planning to use `seanwinslow28`):

```bash
grep -rn 'seanwinslow28\|sean-winslow-204390a5' src/content/ 2>/dev/null
```

Expected: matches in `transactions/phase-d-typed-edges.mdx`, `transactions/vault-knowledge-mcp.mdx`, `transactions/intent-engineering-mcp.mdx`, `architecture/vault-knowledge-mcp.mdx`, `essays/meaning-over-access.mdx`, `about/index.mdx` — all correct.

- [ ] **Step 5: Manual click-through verification**

Open `/about/`, click LinkedIn → confirms opens at sean-winslow-204390a5 profile. Click GitHub → confirms opens at seanwinslow28 profile. Repeat on `/contact/` and on `/`'s footer.

- [ ] **Step 6: Commit**

```bash
git add src/components/about/ProofPoints.astro src/components/chrome/SiteFooter.astro src/pages/contact.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): correct visible LinkedIn + GitHub link text (Bug 5)

Three components had hardcoded visible link text reading
"linkedin.com/in/seanwinslow" and "github.com/seanwinslow" — the
hrefs came from site.ts constants (corrected in Task 2.1) but the
visible text needed manual replacement.

Updated:
  - ProofPoints.astro (B-5 on /about/)
  - SiteFooter.astro (universal footer Contact column)
  - contact.astro (/contact/ page body)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 3 — Bug 7: `/work/` index page

The top nav at `src/components/chrome/SiteNav.astro:19` declares `WORK` as `{ label: "WORK", href: "/work/", matchPrefix: "/work/" }` — but no `src/pages/work/index.astro` exists, only `src/pages/work/[slug].astro`. Visiting `/work/` returns the 404 page.

The fix: create a small `/work/` index that mirrors the catalog-surface pattern from `/essays/index.astro` — a header band + row list + footer fold. Each row links to `/work/<slug>` (the existing case-study route).

### Task 3.1: Create `src/pages/work/index.astro`

**Files:**
- Create: `src/pages/work/index.astro` (NEW)

- [ ] **Step 1: Write the new index page**

Author the file at `src/pages/work/index.astro` with the following exact contents:

```astro
---
/**
 * /work/ — index page.
 *
 * Lists the 5 case studies in `order` (A-1 → A-5). Bands:
 *   dateline → page title block → work rows → footer fold (transactions / about).
 *
 * Mirrors /essays/index.astro structure (essays-spec §2.1 shape) but
 * reads from the existing `work` content collection (the same collection
 * that powers <ProjectsSection /> on the home page).
 *
 * Spec context: projects-section-spec-v1.md §3.5 (added 2026-05-22 in
 * Phase 3e plan §9.1) — the /work/ index is the catalog-surface twin
 * of the home Projects grid; they share the same data but render in
 * different registers (grid on home, row-list on the index).
 */
import BaseLayout from "~/layouts/BaseLayout.astro";
import { getCollection } from "astro:content";

const work = (await getCollection("work")).sort(
  (a, b) => a.data.order - b.data.order
);

const count = work.length;
---

<BaseLayout
  title="Work — Sean Winslow"
  description="Five case studies running across the agent fleet — animation pipeline, code-brain, intent engineering MCP, The Block, 16BitFit Battle Mode."
>
  <article class="work-index page-sheet">
    <header class="index-header">
      <p class="dateline">BOSTON · {count} CASE {count === 1 ? "STUDY" : "STUDIES"}</p>
      <h1>Work</h1>
      <p class="lead">
        Five case studies. Five frames. The agents handle the loops; the loops are sequenced by frame number.
      </p>
    </header>

    <section class="work-list" aria-label="Case studies">
      {work.map((entry) => (
        <a href={`/work/${entry.slug}/`} class="work-row" aria-label={`Case study: ${entry.data.title}`}>
          <div class="row-meta">
            <span class="frame">{entry.data.frame}</span>
            <span class="status" data-status={entry.data.status}>{entry.data.status}</span>
          </div>
          <h2 class="row-title">{entry.data.title}</h2>
          {entry.data.tagline && <p class="row-tagline">{entry.data.tagline}</p>}
          <p class="row-tags">{entry.data.tags.join(" · ")}</p>
          <span class="row-arrow" aria-hidden="true">→</span>
        </a>
      ))}
    </section>

    <footer class="footer-fold">
      <p>
        <a href="/transactions/">→ transactions ledger</a>
        <span aria-hidden="true" class="sep">&nbsp;&nbsp;&nbsp;</span>
        <a href="/about/">→ about</a>
        <span aria-hidden="true" class="sep">&nbsp;&nbsp;&nbsp;</span>
        <a href="/">→ view the fleet <span aria-hidden="true">↑</span></a>
      </p>
    </footer>
  </article>
</BaseLayout>

<style>
  .work-index {
    max-width: 1120px;
    margin: 0 auto;
    padding: 80px 24px 60px;
  }

  .index-header {
    margin-bottom: 60px;
  }
  .dateline {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--ink-secondary);
    margin: 0 0 16px 0;
  }
  h1 {
    font-family: var(--font-serif);
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 400;
    letter-spacing: -0.4px;
    line-height: 1.1;
    color: var(--teal);
    margin: 0 0 24px 0;
  }
  .lead {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 300;
    line-height: 1.45;
    letter-spacing: -0.1px;
    color: var(--ink);
    max-width: 680px;
    margin: 0;
  }

  .work-list {
    display: flex;
    flex-direction: column;
    border-top: 0.5px solid var(--border-paper);
  }

  .work-row {
    position: relative;
    display: block;
    padding: 32px 24px 32px 0;
    border-bottom: 0.5px solid var(--border-paper);
    color: inherit;
    text-decoration: none;
    transition: background-color 160ms var(--ease-out);
  }
  .work-row:hover {
    background-color: rgba(10, 62, 66, 0.03);
  }
  .work-row:focus-visible {
    outline: 2px dashed var(--teal);
    outline-offset: 4px;
  }

  .row-meta {
    display: flex;
    gap: 16px;
    margin-bottom: 8px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
  }
  .frame {
    color: var(--amber-mid);
  }
  .status {
    color: var(--ink-secondary);
  }
  .status[data-status="SHIPPED"] { color: var(--success-teal); }
  .status[data-status="ACTIVE"]  { color: var(--teal); }
  .status[data-status="PAUSED"]  { color: var(--stamp-amber); }
  .status[data-status="ARCHIVED"] { color: var(--ink-secondary); }
  .status[data-status="COMING"]  { color: var(--ink-secondary); }

  .row-title {
    font-family: var(--font-serif);
    font-size: clamp(24px, 3vw, 32px);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.2px;
    color: var(--ink);
    margin: 0 0 8px 0;
  }
  .row-tagline {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 17px;
    font-weight: 300;
    line-height: 1.4;
    color: var(--ink-secondary);
    margin: 0 0 12px 0;
    max-width: 720px;
  }
  .row-tags {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1.2px;
    color: var(--ink-secondary);
    margin: 0;
  }
  .row-arrow {
    position: absolute;
    top: 32px;
    right: 0;
    font-family: var(--font-mono);
    font-size: 16px;
    color: var(--teal);
    transition: transform 160ms var(--ease-out);
  }
  .work-row:hover .row-arrow {
    transform: translateX(4px);
  }

  .footer-fold {
    margin-top: 80px;
  }
  .footer-fold p {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.0px;
    color: var(--teal);
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }
  .footer-fold a {
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms var(--ease-out);
  }
  .footer-fold a:hover,
  .footer-fold a:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }

  @media (max-width: 767px) {
    .work-index { padding: 48px 16px 40px; }
    .index-header { margin-bottom: 40px; }
    .work-row { padding: 24px 24px 24px 0; }
    .row-arrow { top: 24px; }
    .footer-fold { margin-top: 56px; }
  }
</style>
```

- [ ] **Step 2: Verify the file compiles**

The dev server hot-reloads automatically. Watch the terminal for any astro:check errors. Then:

Run: `curl -sI http://localhost:4321/work/ | head -1`

Expected: `HTTP/1.1 200 OK` (replaces the 404 from pre-flight).

- [ ] **Step 3: Visually verify in the browser**

Open `http://localhost:4321/work/`. Expected:
- Header strip reading `BOSTON · 5 CASE STUDIES`
- `Work` H1 in Newsreader teal
- 5 rows in `order` ascending (A-1 → A-5):
  1. A-1 · ACTIVE — 2D Animation Pipeline
  2. A-2 · ACTIVE — Code Brain
  3. A-3 · SHIPPED — Intent Engineering MCP
  4. A-4 · ARCHIVED — The Block — Campus + RevOps
  5. A-5 · PAUSED — 16BitFit Battle Mode
- Each row's title + tagline + tags + arrow render correctly
- Footer fold at the bottom with 3 links (transactions / about / view the fleet)

Click each row → confirms navigation to `/work/<slug>/` and back to `/work/` via browser back button works.

- [ ] **Step 4: Verify the nav active-state**

Click into `/work/` from `/about/` via the top nav. Expected: `WORK` tab shows the stamp-amber underline (active state from `SiteNav.astro:115-118`). Click any case-study row → on `/work/<slug>/`, `WORK` tab should still be active (the active prefix is `/work/`, so any sub-route highlights it).

- [ ] **Step 5: Commit**

```bash
git add src/pages/work/index.astro
git commit -m "$(cat <<'EOF'
feat(phase-3e): add /work/ index page (Bug 7)

Top nav has linked /work/ since Phase 3a, but no index file existed —
only src/pages/work/[slug].astro for the case-study deep-dives. Result:
visiting /work/ returned 404.

New index mirrors /essays/index.astro shape: dateline header + 5 case-
study rows sorted by frame order (A-1 → A-5) + footer fold linking to
/transactions/ + /about/ + home.

Reads the existing 'work' content collection (same as <ProjectsSection />
on the home page). Both surfaces are now valid catalog entries to /work/
case studies — the grid on home for first-impression, the row-list on
/work/ for catalog-mode browsing.

Spec consequence: projects-section-spec-v1.md §3.5 lands in Task 9.1
documenting the index/grid relationship.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 4 — Bug 8: Cartoon canon — reflow Jake into row 2

The 6-cel grid renders 3 columns wide. Samurai Jack (cel 4) has `break_grid: true` which makes it span 2 columns at 1.2× scale, pushing Jake (cel 6) into a single-cel row 3 below it. Sean's call: scale Samurai Jack down to match the other cels, so row 2 packs cleanly (Samurai Jack · Uncle Iroh · Jake).

### Task 4.1: Flip `break_grid: true` → `false` on Samurai Jack

**Files:**
- Modify: `src/content/cartoons/04-samurai-jack.md:11`

- [ ] **Step 1: Replace the flag value**

```
old_string:
break_grid: true
```

```
new_string:
break_grid: false
```

(The line currently reads `break_grid: true` on line 11 of `src/content/cartoons/04-samurai-jack.md`. Filename is unambiguous; the string is only used once.)

- [ ] **Step 2: Verify schema still validates**

The `cartoons` collection schema in `src/content/config.ts:314` defines `break_grid: z.boolean().default(false)` — both values are valid; this is a pure visual flip.

Run: `npm run astro -- sync` (or wait for the dev server hot-reload to settle).

Expected: clean sync, no validation errors.

- [ ] **Step 3: Hot-reload `/about/` + verify visual result**

Open `/about/` and scroll to the Saturday Morning Canon section (B-3). Expected:
- All 6 cels render at uniform 280×320 frame size (Samurai Jack no longer 1.2×)
- Grid lays out as 3 cols × 2 rows desktop:
  - Row 1: Tommy Pickles · Ash Ketchum · Rocko
  - Row 2: Samurai Jack · Uncle Iroh · Jake the Dog
- Jake is no longer alone in row 3
- Tilt angles on each cel still apply (each cel's `angle:` frontmatter — Tommy `+0.6`, Ash `-0.9`, Rocko `+1.2`, Jack `0.0`, Iroh `-0.6`, Jake `+0.9` per the existing MDX files; verify these are still set after the edit)
- The IntersectionObserver-driven cel reveal animation still plays (each cel fades + scales in with 100ms stagger)

Hot-reload should pick up the MDX frontmatter change without dev-server restart. If Jake still appears in row 3 alone, kill `npm run dev` and re-run it (vite cache lesson from Phase 3c.2).

- [ ] **Step 4: Mobile spot-check**

In DevTools, switch to a phone viewport (e.g., 375×667 — iPhone SE). Expected: single-column stack of all 6 cels, no break-grid behavior (the `@media (max-width: 767px)` rule at `CartoonCel.astro:205-224` made `break_grid: true` a no-op on mobile anyway — flipping to false makes no visual difference on mobile).

- [ ] **Step 5: Commit**

```bash
git add src/content/cartoons/04-samurai-jack.md
git commit -m "$(cat <<'EOF'
fix(phase-3e): unset Samurai Jack break_grid so Jake reflows into row 2 (Bug 8)

Per Sean's review: the 1.2× size on Jack wasn't doing meaningful work
visually — the lesson noun + body carry the emphasis, and the extra
scale pushed Jake the Dog into a lonely row 3. Flipping the flag
collapses the grid to a clean 3×2 layout with Jake landing between
Jack and Iroh.

CSS path for break_grid stays in CartoonCel.astro as dead code for v1.1
emphasis if/when needed (per OQ-6).

Spec consequence: about-spec-v1.md §11.3.1 note in Task 9.1 documents
v1 ships all 6 cels at uniform scale.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 5 — Bug 2: Hero icon-cycle bfcache + View Transitions flash

When the user navigates `/about/ → /` via the SW wordmark in the nav, the home hero briefly shows icon-7 (the refresh/loop frame) before the WebM character animation crossfades in. Root cause: `hero-icon-cycle.js`'s once-per-session bypass (`if (sessionStorage.getItem(SESSION_KEY) === "true")`) only fires inside a `DOMContentLoaded` handler — but bfcache restoration and Astro View Transitions don't fire DOMContentLoaded. The reduced-motion CSS fallback at `HeroIconCycle.astro:57` (showing icon-6 / claude.webp when motion is reduced) was the placeholder visible.

Per OQ-2, fix with a belt-and-suspenders approach:
1. **CSS pre-paint** — inline script in `BaseLayout.astro` reads sessionStorage and sets a `data-hero-cycle-played` attribute on `<html>` BEFORE first paint. A global CSS rule hides `.hero-intro-cycle` when the attribute is present.
2. **Re-init on bfcache restore + View Transition** — add `pageshow` + `astro:page-load` listeners in `CharacterLane.astro` that call `initHeroIconCycle()` if the elements still exist.

### Task 5.1: Add the inline pre-paint hero-cycle attribute setter to `BaseLayout.astro` + matching CSS rule to `global.css`

**Files:**
- Modify: `src/layouts/BaseLayout.astro` (re-add an inline script, smaller scope than the dark-mode one we deleted)
- Modify: `src/styles/global.css` (append a global CSS rule)

- [ ] **Step 1: Add the inline pre-paint script to `BaseLayout.astro`**

The script reads `sessionStorage["hero-cycle-played"]` and, if set, marks the `<html>` element so CSS can hide the icon container before paint. This runs ONLY on initial page-load (View Transitions skip `<head>` re-evaluation; bfcache restores skip it too but the attribute persists in the restored DOM).

```
old_string:
    <!-- View Transitions -->
    <ClientRouter />
```

```
new_string:
    <!-- Hero icon-cycle pre-paint suppression (Phase 3e Bug 2) -->
    <script is:inline>
      (function() {
        try {
          if (sessionStorage.getItem('hero-cycle-played') === 'true') {
            document.documentElement.dataset.heroCyclePlayed = 'true';
          }
        } catch (e) { /* sessionStorage unavailable — fall through to JS init */ }
      })();
    </script>

    <!-- View Transitions -->
    <ClientRouter />
```

- [ ] **Step 2: Add the matching CSS rule to `global.css`**

Append at the end of `src/styles/global.css` (after the `@media print { ... }` block):

```
old_string:
@media print {
  header,
  footer,
  .skip-link,
  .character,
  [aria-hidden="true"] {
    display: none !important;
  }

  a[href^="http"]::after,
  a[href^="mailto"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #546E71;
  }

  :root {
    color-scheme: light !important;
  }

  body {
    background: white !important;
    color: black !important;
  }
}
```

```
new_string:
@media print {
  header,
  footer,
  .skip-link,
  .character,
  [aria-hidden="true"] {
    display: none !important;
  }

  a[href^="http"]::after,
  a[href^="mailto"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #546E71;
  }

  :root {
    color-scheme: light !important;
  }

  body {
    background: white !important;
    color: black !important;
  }
}

/* ===== Hero icon-cycle pre-paint suppression (Phase 3e Bug 2) =====
 * When sessionStorage["hero-cycle-played"] === "true", BaseLayout's
 * inline <script> sets data-hero-cycle-played="true" on <html> BEFORE
 * first paint. This rule then hides the icon container synchronously
 * — no flash of icon-6/icon-7 on bfcache restore or SPA navigation
 * back to /.
 * Sister behavior: hero-icon-cycle.js's existence check skips the
 * cycle entirely when the container is display:none.
 */
html[data-hero-cycle-played="true"] .hero-intro-cycle {
  display: none !important;
}
html[data-hero-cycle-played="true"] .character-video {
  opacity: 1 !important;
}
```

- [ ] **Step 3: Verify both edits compile + hot-reload works**

Open `/` in a clean browser session (`sessionStorage` empty). Expected: the icon cycle plays normally (8 icons × 600ms), then crossfades to the WebM. After the cycle completes, `sessionStorage["hero-cycle-played"]` === `"true"`.

Now navigate to `/about/` via the nav, then back to `/` via the SW wordmark. Expected: WebM appears immediately, no icon flash. (This is the View-Transition path; Task 5.2 fully closes the loop.)

Hit hard reload (cmd-R or ctrl-R) on `/`. Expected: WebM appears immediately, no icon flash (the inline script reads the sessionStorage flag → sets the data attribute → CSS hides `.hero-intro-cycle` before first paint).

- [ ] **Step 4: Commit**

```bash
git add src/layouts/BaseLayout.astro src/styles/global.css
git commit -m "$(cat <<'EOF'
fix(phase-3e): pre-paint hero-cycle suppression for bfcache + reloads (Bug 2)

Adds an inline <script> in BaseLayout that reads sessionStorage's
hero-cycle-played flag and, if set, marks <html> with
data-hero-cycle-played="true" BEFORE first paint. A matching CSS rule
in global.css hides .hero-intro-cycle and shows .character-video
immediately when that attribute is present.

This is the belt — Task 5.2 adds the suspenders (pageshow +
astro:page-load re-init listeners for the SPA-navigation path).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

### Task 5.2: Wire `pageshow` + `astro:page-load` re-init in `CharacterLane.astro` + make `hero-icon-cycle.js` idempotent

**Files:**
- Modify: `src/components/hero/CharacterLane.astro:31-41`
- Modify: `src/scripts/hero-icon-cycle.js`

- [ ] **Step 1: Refactor the inline `<script>` in `CharacterLane.astro` to wire 3 init paths**

```
old_string:
<script>
  import { initHeroIconCycle } from "~/scripts/hero-icon-cycle.js";

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".hero-intro-cycle");
    const video = document.querySelector(".character-video");
    if (container && video) {
      initHeroIconCycle({ container, video });
    }
  });
</script>
```

```
new_string:
<script>
  import { initHeroIconCycle } from "~/scripts/hero-icon-cycle.js";

  function tryInit() {
    const container = document.querySelector(".hero-intro-cycle");
    const video = document.querySelector(".character-video");
    if (container && video) {
      initHeroIconCycle({ container, video });
    }
  }

  // (1) Fresh page-load path
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryInit);
  } else {
    tryInit();
  }

  // (2) bfcache restore path — fires on back/forward navigation that
  // restored the page from the browser's back-forward cache. The
  // sessionStorage flag is already set, so initHeroIconCycle's
  // once-per-session bypass kicks in and immediately reveals the WebM.
  window.addEventListener("pageshow", tryInit);

  // (3) Astro View Transitions path — fires after each ClientRouter
  // swap. /about/ → / via the SW wordmark goes through here.
  document.addEventListener("astro:page-load", tryInit);
</script>
```

- [ ] **Step 2: Make `initHeroIconCycle()` idempotent + bfcache-safe in `hero-icon-cycle.js`**

The existing `initHeroIconCycle()` has two latent bugs when called multiple times: (a) it starts a new `setTimeout(advance, 600)` chain even if one is already in flight; (b) it doesn't check whether the container was already display:none'd by the pre-paint CSS (Task 5.1). Add guards:

```
old_string:
export function initHeroIconCycle({ container, video }) {
  if (!container || !video) return;

  // Reduced motion: skip the cycle entirely. The CSS keeps icon-7 visible.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  // Once-per-session bypass: skip to WebM steady state.
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    container.style.display = "none";
    video.style.opacity = "1";
    video.play().catch(() => {});
    return;
  }

  const icons = Array.from(container.querySelectorAll("img"));
  let i = 0;
```

```
new_string:
export function initHeroIconCycle({ container, video }) {
  if (!container || !video) return;

  // Idempotency guard: if a previous init already started the cycle
  // on this container, the dataset flag is set — bail.
  if (container.dataset.cycleInitialized === "true") return;
  container.dataset.cycleInitialized = "true";

  // Reduced motion: skip the cycle entirely. The CSS keeps icon-7 visible.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  // Once-per-session bypass: skip to WebM steady state.
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    container.style.display = "none";
    video.style.opacity = "1";
    video.play().catch(() => {});
    return;
  }

  const icons = Array.from(container.querySelectorAll("img"));
  let i = 0;
```

- [ ] **Step 3: Verify all three init paths work**

Test matrix (open DevTools → Application → Storage → Session Storage):

**(A) Fresh page-load (sessionStorage empty):**
1. Clear `sessionStorage["hero-cycle-played"]`.
2. Hard-reload `/`.
3. Expected: icon cycle plays 8 frames × 600ms = 4.8s, then crossfades to WebM. `hero-cycle-played` is now `true` in sessionStorage.

**(B) bfcache restore:**
1. From `/` (post-cycle), navigate to a different domain (e.g., open a new tab to google.com, then close it — OR click the LinkedIn link in the footer which navigates externally, then hit browser back button).
2. Expected: home page restored from bfcache. WebM visible immediately, no icon flash.

**(C) Astro View Transition:**
1. From `/`, click `ABOUT` in the nav.
2. From `/about/`, click `SW` wordmark in the nav.
3. Expected: home page reached via View Transition. WebM visible immediately, no icon flash. (This is the exact path from Sean's bug report.)

If any of the three flashes appears: BLOCKED — investigate before proceeding. The most likely culprit is the inline pre-paint script (Task 5.1) not running before paint on the affected path; check `<html>` element in DevTools at the moment of flash for the `data-hero-cycle-played` attribute.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/CharacterLane.astro src/scripts/hero-icon-cycle.js
git commit -m "$(cat <<'EOF'
fix(phase-3e): re-init hero cycle on pageshow + astro:page-load (Bug 2)

The original DOMContentLoaded-only init misses two paths:
  (a) bfcache restore (back-forward cache)
  (b) Astro View Transitions (ClientRouter swap)

Adds pageshow + astro:page-load listeners that re-call
initHeroIconCycle. Made initHeroIconCycle idempotent via a
container.dataset.cycleInitialized guard so multiple invocations are
safe.

Combined with the pre-paint CSS suppression in Task 5.1, no icon
flash visible on /about/ → / navigation or back-button restore.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 6 — Bug 3: Torn-paper divider gap above About Teaser

The `.tear-divider--bottom` PNG inside `<ProjectsSection />` is supposed to bleed 80px down into the next section (`.about-teaser`) so the boundary reads as a torn-paper edge, not a hard horizontal line. Currently it stops at the section boundary because `.about-teaser.page-sheet` sets `z-index: 10` (from `global.css:88`) — explicit z-index beats `.projects`'s default `z-index: auto`, so the about-teaser's background paints over the tear's bleed.

Per OQ-3: bump `.projects` to `z-index: 11` (one above page-sheet's 10) so the tear bleeds visibly over the start of about-teaser. Compare against the working top-tear (Hero → Projects): the hero section doesn't use `.page-sheet`, so no z-index fight occurs there.

### Task 6.1: Add `z-index: 11` to `.projects` in `ProjectsSection.astro`

**Files:**
- Modify: `src/components/projects/ProjectsSection.astro:59-65`

- [ ] **Step 1: Add the z-index rule**

```
old_string:
  .projects {
    position: relative;
    padding: 80px 52px;
    background-color: var(--teal);
    overflow: hidden;
  }
```

```
new_string:
  .projects {
    position: relative;
    z-index: 11;
    padding: 80px 52px;
    background-color: var(--teal);
    overflow: hidden;
  }
```

- [ ] **Step 2: Verify the tear now bleeds correctly**

Hot-reload `/`. Scroll down to the boundary between the teal Projects section and the warm-paper About Teaser. Expected:
- The torn-paper edge from `tear-divider--bottom` visibly extends past the bottom of the teal box into the cream About Teaser's top 80px
- No thin horizontal line between the two sections
- The tear's silhouette matches the top tear (Hero → Projects) — both are torn-paper bleeds, not hard rules

Inspect the `.tear-divider--bottom` element in DevTools → Computed → Layout. Expected: it sits at the same world-Y as before (no movement), but its painted z-order is now ABOVE `.about-teaser`'s background.

- [ ] **Step 3: Verify no regression on the top tear**

Scroll up to the Hero → Projects boundary. Expected: the top tear renders identically to before (the hero section never had a z-index fight; bumping `.projects` to 11 doesn't change anything visible at the top boundary because nothing higher-z-indexed precedes it).

- [ ] **Step 4: Verify no regression on About Teaser content**

Confirm the AboutTeaser's text + swiper deck render normally. The eyebrow ("ABOUT — TEASER"), editorial line, beat strip, CTA, and swiper deck should all be visible and clickable. (The about-teaser's z-index:10 still wins against deeper-nested children of itself; only the Projects section's tear-divider paints above it now.)

- [ ] **Step 5: Commit**

```bash
git add src/components/projects/ProjectsSection.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): bump .projects z-index to 11 so tear bleeds over teaser (Bug 3)

Root cause: .about-teaser.page-sheet declared z-index:10 (from
global.css's .page-sheet class), beating .projects's default z-index:auto.
The .tear-divider--bottom inside .projects had local z-index:12 but that
was scoped to .projects's stacking context — the about-teaser's z:10
overpainted the 80px bleed.

Fix: add z-index:11 to .projects so its stacking context outranks
about-teaser. The bleed now paints visibly over the start of the next
section, matching the working top-tear (Hero → Projects).

One-line surgical fix per Phase 3e OQ-3. .page-sheet stays at z-index:10
globally — no ripple to other surfaces using the class.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 7 — Bug 9: Hero floor-shadow recalibration (interactive)

The floor-shadow PNG under the desk WebM is offset wrong on all viewport classes. Sean's call: "up a few pixels, right a few pixels" so the shadow sits directly under the desk legs. The current breakpoints at `CharacterLane.astro:53-90`:

| Breakpoint | `left` | `bottom` | `width` |
|---|---|---|---|
| default (≥1025) | `16%` | `-6px` | `55%` |
| `≥1600px` | `15%` | (inherit `-6px`) | (inherit `55%`) |
| `≤1024px` | `20%` | (inherit `-6px`) | `70%` |

This task is **interactive** — the executor opens the dev server in a browser at each breakpoint, uses DevTools to drag the shadow into position by tweaking `left` / `bottom` live, then bakes the resulting values into the CSS.

### Task 7.1: Interactively recalibrate the shadow at 4 viewport classes + bake the final values

**Files:**
- Modify: `src/components/hero/CharacterLane.astro:66-90`

- [ ] **Step 1: Set up the 4 viewport test sizes**

Open `/` in Chrome DevTools → Responsive viewport. Test at:
1. **`1920×1080`** (the ≥1600px branch — widescreen desktop)
2. **`1440×900`** (between 1280 and 1599 — the default branch)
3. **`1280×800`** (lower boundary of default branch)
4. **`1024×768`** (the ≤1024px branch — tablet landscape)

For each viewport, scroll to top so the hero is fully visible.

- [ ] **Step 2: Calibrate via DevTools live edits**

At each viewport, inspect the `.hero-floor-shadow` element. In the Styles panel, edit `left` and `bottom` percent / px values until the shadow ellipse sits **directly under the desk legs** (visible against the chair-and-legs WebM frame).

Sean's directional ask:
- "Up" means decrease `bottom` (more negative pulls it up into the WebM area). Current `bottom: -6px` → try `-12px`, `-18px`, then adjust.
- "Right" means increase `left` percentage. Current `left: 16%` (default branch) → try `18%`, `20%`, then adjust.

**Sanity check the calibration:** the shadow's centroid (49% of its own width, per the comment in the source file at line 56) should align with the visual center of the desk legs. The chair leg base and the front desk leg are the two grounding points — the shadow's center should sit between them.

Read off the final `left` + `bottom` values per breakpoint. Sample target table (the executor's actual values will differ — these are illustrative bounds):

| Breakpoint | `left` (likely) | `bottom` (likely) | `width` |
|---|---|---|---|
| default (≥1025) | `18%`–`22%` | `-10px` to `-2px` | `55%` (keep) |
| `≥1600px` | `17%`–`20%` | (likely matches default `bottom`) | `55%` (keep) |
| `≤1024px` | `22%`–`28%` | (likely matches default) | `70%` (keep) |

**The actual numbers come from DevTools, not from this plan.** Don't guess.

- [ ] **Step 3: Bake the calibrated values into `CharacterLane.astro`**

Replace the three breakpoint rules (the default `.hero-floor-shadow` block at lines 66-77, the `@media (min-width: 1600px)` block at lines 80-84, and the `@media (max-width: 1024px)` block at lines 85-90). Below is the **template** — replace the `LEFT_DEFAULT`, `BOTTOM_DEFAULT`, `LEFT_WIDE`, `BOTTOM_WIDE`, `LEFT_SMALL`, `BOTTOM_SMALL` placeholders with the values measured in Step 2:

```
old_string:
  .hero-floor-shadow {
    /* Reference: sw-portfolio-animation-2026/.../hero-image-with-bg000.png —
       a tight ellipse only under the desk + chair, not a wide swath.
       Shadow PNG centroid is at 49% of its own width. Per Sean's 2026-05-21
       review, the desk's painted center sits at ~78% of viewport on a 1920
       viewport — the original `left: 18%; width: 55%` rule landed at ~80%.
       Below 1280px viewports the lane scales down and the offset diverges
       further. The breakpoint table below nudges the centroid back toward
       the desk-foot on each viewport class.

       Re-cropping the source PNG would be cleaner long-term but blocks on
       Procreate-substrate work that's deferred indefinitely per the
       texture-spec deferral table. Per-viewport calibration is the v1 fix. */
    position: absolute;
    width: 55%;
    height: auto;
    bottom: -6px;
    left: 16%;        /* was 18% — shifts the shadow ~2% leftward at >=1280px */
    right: auto;
    object-fit: contain;
    object-position: center bottom;
    z-index: 18;
    pointer-events: none;
    opacity: 0.9;
  }
  /* Mid-viewport (≥1280 ≤1599): same nudge holds. */
  /* Wide viewport (≥1600): the lane sits further right; shadow needs ~1% more leftward shift. */
  @media (min-width: 1600px) {
    .hero-floor-shadow {
      left: 15%;
    }
  }
  @media (max-width: 1024px) {
    .hero-floor-shadow {
      width: 70%;
      left: 20%;
    }
  }
```

```
new_string:
  .hero-floor-shadow {
    /* Calibrated 2026-05-22 (Phase 3e Bug 9) via DevTools at 4 viewport
       classes — 1920, 1440, 1280, 1024. Source PNG centroid is at 49%
       of its own width; values below align the centroid with the visual
       center of the desk legs at each viewport.

       Re-cropping the source PNG would be cleaner long-term but blocks
       on Procreate-substrate work deferred indefinitely per texture-spec.
       Per-viewport calibration remains the v1 fix. */
    position: absolute;
    width: 55%;
    height: auto;
    bottom: BOTTOM_DEFAULT;
    left: LEFT_DEFAULT;
    right: auto;
    object-fit: contain;
    object-position: center bottom;
    z-index: 18;
    pointer-events: none;
    opacity: 0.9;
  }
  /* Wide viewport (≥1600): the lane sits further right; nudge left/bottom. */
  @media (min-width: 1600px) {
    .hero-floor-shadow {
      left: LEFT_WIDE;
      bottom: BOTTOM_WIDE;
    }
  }
  /* Tablet / small desktop (≤1024): lane scales down; bigger shadow + nudge. */
  @media (max-width: 1024px) {
    .hero-floor-shadow {
      width: 70%;
      left: LEFT_SMALL;
      bottom: BOTTOM_SMALL;
    }
  }
```

After the Edit applies, manually replace the 6 placeholders (`LEFT_DEFAULT`, `BOTTOM_DEFAULT`, `LEFT_WIDE`, `BOTTOM_WIDE`, `LEFT_SMALL`, `BOTTOM_SMALL`) with the actual measured values from Step 2.

- [ ] **Step 4: Re-verify across all 4 viewports**

Hard-reload `/` at each viewport (1920, 1440, 1280, 1024). At each: the shadow sits directly under the desk legs, not offset to the left or below.

- [ ] **Step 5: Commit**

```bash
git add src/components/hero/CharacterLane.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): recalibrate hero floor-shadow position across 4 breakpoints (Bug 9)

Sean's review: shadow was offset left + low across all viewport sizes —
the desk's painted center never aligned with the shadow's centroid.
Recalibrated in DevTools at 1920, 1440, 1280, and 1024 viewports;
baked final left/bottom values into the existing 3 breakpoint rules.

Width values unchanged (55% default, 70% mobile) — only the
positioning offsets were wrong. Source PNG remains uncropped per the
texture-spec deferral table; per-viewport CSS is the v1 fix.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 8 — Bug 4: Footer SUBSCRIBE column — add `rss` glyph, route to section index pages

Currently the SUBSCRIBE column's 3 rows (transactions / rss · architecture / rss · essays / rss) all point at the raw `.xml` feed files. Sean expected those to navigate to the section index pages.

Per OQ-4 (option (b)): swap the primary hrefs to `/transactions/`, `/architecture/`, `/essays/`, and add a small `rss` glyph (visually distinct from the primary link) that links to the `.xml` file. Keep the column header "SUBSCRIBE" so the row of `rss` glyphs makes coherent visual sense.

### Task 8.1: Restructure the SUBSCRIBE column rows in `SiteFooter.astro`

**Files:**
- Modify: `src/components/chrome/SiteFooter.astro:28-36`

- [ ] **Step 1: Replace the 3 subscribe rows + add a `.rss-tag` style**

The new pattern: primary link text is the section name (clickable navigation), followed by a small mono "rss" pill that links to the feed XML. The "read on substack" row stays as-is.

```
old_string:
      <section aria-labelledby="footer-subscribe-heading">
        <h2 id="footer-subscribe-heading" class="col-heading">SUBSCRIBE</h2>
        <ul class="link-list">
          <li><span class="prefix">→</span> <a href="/transactions/rss.xml">transactions / rss</a></li>
          <li><span class="prefix">→</span> <a href="/architecture/rss.xml">architecture / rss</a></li>
          <li><span class="prefix">→</span> <a href="/essays/rss.xml">essays / rss</a></li>
          <li><span class="prefix">→</span> <a href={SUBSTACK_URL}>read on substack</a> <span class="glyph">↗</span></li>
        </ul>
      </section>
```

```
new_string:
      <section aria-labelledby="footer-subscribe-heading">
        <h2 id="footer-subscribe-heading" class="col-heading">SUBSCRIBE</h2>
        <ul class="link-list">
          <li>
            <span class="prefix">→</span>
            <a href="/transactions/">transactions</a>
            <a href="/transactions/rss.xml" class="rss-tag" aria-label="Transactions RSS feed">rss</a>
          </li>
          <li>
            <span class="prefix">→</span>
            <a href="/architecture/">architecture</a>
            <a href="/architecture/rss.xml" class="rss-tag" aria-label="Architecture RSS feed">rss</a>
          </li>
          <li>
            <span class="prefix">→</span>
            <a href="/essays/">essays</a>
            <a href="/essays/rss.xml" class="rss-tag" aria-label="Essays RSS feed">rss</a>
          </li>
          <li><span class="prefix">→</span> <a href={SUBSTACK_URL}>read on substack</a> <span class="glyph">↗</span></li>
        </ul>
      </section>
```

- [ ] **Step 2: Add the `.rss-tag` style at the end of the existing `<style>` block**

Append after the existing `.link-list a:hover, .link-list a:focus-visible` rule (line 111), BEFORE the `.footer-strip` rule:

```
old_string:
  .link-list a:hover,
  .link-list a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .footer-strip {
```

```
new_string:
  .link-list a:hover,
  .link-list a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .link-list .rss-tag {
    margin-left: 6px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
    color: var(--ink-secondary);
    background-color: rgba(10, 62, 66, 0.06);
    border-radius: 2px;
    text-transform: lowercase;
    transition: color 160ms var(--ease-out), background-color 160ms var(--ease-out);
  }
  .link-list .rss-tag:hover,
  .link-list .rss-tag:focus-visible {
    color: var(--teal);
    background-color: rgba(10, 62, 66, 0.12);
    text-decoration: none;
  }
  .footer-strip {
```

- [ ] **Step 3: Verify all 4 navigation paths**

Hot-reload `/` and scroll to footer. Expected SUBSCRIBE column rows:
- `→ transactions [rss]` — primary link text `transactions` is large, `rss` is a small pill on the right
- `→ architecture [rss]`
- `→ essays [rss]`
- `→ read on substack ↗`

Test each link:
1. Click `transactions` → navigates to `/transactions/` (index page renders)
2. Click `rss` next to transactions → opens `/transactions/rss.xml` (RSS XML feed)
3. Click `architecture` → `/architecture/`
4. Click `rss` next to architecture → `/architecture/rss.xml`
5. Click `essays` → `/essays/`
6. Click `rss` next to essays → `/essays/rss.xml`
7. Click `read on substack` → opens `https://substack.com/@seanpwins` in a new tab (per `SUBSTACK_URL`)

- [ ] **Step 4: Mobile spot-check**

In DevTools → 375px viewport, scroll to footer. Expected: the SUBSCRIBE column stacks below CONTACT (per the existing `@media (max-width: 768px)` rule at `SiteFooter.astro:128-141`). Each row's primary text + small `rss` pill render side-by-side without wrapping awkwardly.

- [ ] **Step 5: Commit**

```bash
git add src/components/chrome/SiteFooter.astro
git commit -m "$(cat <<'EOF'
fix(phase-3e): footer SUBSCRIBE rows route to section pages, rss as small tag (Bug 4)

Previous structure made the whole text "transactions / rss" link to the
.xml feed — recruiters expected the primary navigation to land on the
section index. Restructured each row to: primary link (transactions /
architecture / essays) navigating to the section index, plus a small
mono "rss" pill linking to the feed XML.

Per Phase 3e OQ-4 (option b). Footer 3-column shape preserved per
site-chrome §7.1. RSS auto-discovery (<link rel="alternate">) in
BaseLayout untouched.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 9 — Spec updates + CHANGELOG entries

Three spec edits land batched. Each spec gets a small inline note where the deviation lives; the CHANGELOG.md gets one entry per spec under the existing per-spec sections.

### Task 9.1: Apply 3 spec edits + 3 CHANGELOG entries

**Files:**
- Modify: `docs/specs/site-chrome-spec-v1.md` (add a deviation note at the top of §8 marking it as v1-superseded)
- Modify: `docs/specs/about-spec-v1.md` (add a v1 note inside §11.3.1)
- Modify: `docs/specs/projects-section-spec-v1.md` (add a new §3.5 documenting the /work/ index)
- Modify: `CHANGELOG.md` (add 3 entries under the existing per-spec sections, plus 1 entry for /work/ index under projects-section-spec)

- [ ] **Step 1: Add v1 deviation note to site-chrome-spec §8**

Find the line `## 8. The theme toggle` in `docs/specs/site-chrome-spec-v1.md` (around line 308 per the grep at planning) and insert a deviation banner immediately under the heading. Don't strike §8.1-§8.6 — leave them as historical reference (their original spec is still useful documentation of why the toggle was specced this way). The banner makes the deviation discoverable for future readers.

Use Edit:

```
old_string:
## 8. The theme toggle

### 8.1 Visual
```

```
new_string:
## 8. The theme toggle

> **Phase 3e (2026-05-22) — DEVIATION: dark mode removed entirely.** The toggle was deleted, the `:root[data-theme="dark"]` token block was deleted, and the FOUC-prevention cookie reader in `BaseLayout.astro` was deleted. The V3 bridge `sw-theme` cookie may still exist in legacy browsers but is no longer read or honored. Sections §8.1–§8.6 below remain as historical reference for the rationale; do not implement them. Re-introducing dark mode would require a fresh design pass — the warm-paper torn-paper texture and the hero animation aren't currently dark-mode-compatible. See CHANGELOG for the bug context.

### 8.1 Visual
```

- [ ] **Step 2: Add v1 break_grid note to about-spec §11.3.1**

Find the heading `### 11.3.1 The "rewires-you" cel breaks the grid` in `docs/specs/about-spec-v1.md` (around line 600). Add a v1-default note immediately after the existing paragraph that says "v1 ships break_grid: false on all cels":

```
old_string:
### 11.3.1 The "rewires-you" cel breaks the grid

One cel — the cel Sean considers most load-bearing (the cel the §11.7 annotation arrows at) — sets `break_grid: true` in its frontmatter. That cel renders at **1.2× scale** (336×384 instead of 280×320) and **spans two grid columns** on desktop, pushing the cels around it to reflow. The §11.7 annotation arrow + the geometric break work in concert: typography flags the cel, geometry confirms it. Without the break, all 6 cels read at identical visual weight despite the annotation calling one out — the bento-box quality the spec was trying to dodge.
```

```
new_string:
### 11.3.1 The "rewires-you" cel breaks the grid

One cel — the cel Sean considers most load-bearing (the cel the §11.7 annotation arrows at) — sets `break_grid: true` in its frontmatter. That cel renders at **1.2× scale** (336×384 instead of 280×320) and **spans two grid columns** on desktop, pushing the cels around it to reflow. The §11.7 annotation arrow + the geometric break work in concert: typography flags the cel, geometry confirms it. Without the break, all 6 cels read at identical visual weight despite the annotation calling one out — the bento-box quality the spec was trying to dodge.

> **Phase 3e (2026-05-22) — v1 default: all 6 cels ship `break_grid: false`.** On review, the 1.2×-scale Samurai Jack cel was orphaning Jake-the-Dog in a single-cel row 3. Sean's call: scale Jack to match the rest. The CSS path (`.cartoon-cel--break-grid` rules + the schema field's default `false`) stays in place as dead code for v1.1 emphasis if/when a future cel warrants it; v1 ships a uniform 3×2 grid.
```

- [ ] **Step 3: Add new §3.5 to projects-section-spec documenting the /work/ index**

Read `docs/specs/projects-section-spec-v1.md` to find the right insertion point — somewhere after §3 (anatomy / structure) and before §4 (whatever §4 is). The insertion documents that there is now both a home Projects grid AND a `/work/` catalog index, both reading from the same `work` collection.

First read the spec around §3 to find the insertion point:

```bash
grep -n "^### \|^## " docs/specs/projects-section-spec-v1.md | head -20
```

Then insert a new §3.5 after whatever the last §3.x section is. Below is the body for the new section — the executor places it at the correct location based on the grep output:

```markdown
### 3.5 The `/work/` index page (Phase 3e — added 2026-05-22)

The home page's Projects section (§3.1–§3.4) is one of two surfaces over the `work` content collection. The other is `/work/` — a catalog-style index page that lists the same 5 case studies as row entries (not tiles).

**Why both surfaces:**

- **Home grid** is the first-impression register: tiles + media + frame numbers, optimized for the recruiter who lands on `/` cold and scans.
- **`/work/` index** is the catalog register: dateline header + row list + tagline + tags + status, optimized for the recruiter who arrives via the nav from another sub-page (`/transactions/`, `/architecture/`, `/about/`) and expects parity with those catalog surfaces.

**File:** `src/pages/work/index.astro` (lands Phase 3e).

**Shape:** Mirrors `/essays/index.astro` and `/transactions/index.astro` — dateline strip + `<h1>` + lead paragraph + row list sorted ascending by `data.order` (A-1 → A-5) + footer fold (transactions / about / view the fleet). No `<ProjectsSection />` re-render — the row format is row-list, not tile-grid, by design.

**Click contract:** Each row links to `/work/<slug>/` (same target as the home grid tiles). Astro View Transitions morph the row title into the case-study `<h1>` via the existing `view-transition-name: hero-title-<slug>` lock (case-study-spec §15).

**Spec lineage:** The original projects-section-spec didn't anticipate a `/work/` index because the home grid was intended as the primary surface. Phase 3e elevated `/work/` to a first-class catalog surface alongside `/transactions/`, `/architecture/`, `/essays/` because the top nav already promised the route and recruiters expected the index to exist. The home grid remains the marketing surface; `/work/` is the IA-completeness surface.

```

- [ ] **Step 4: Add 3 CHANGELOG entries**

Read `CHANGELOG.md` to confirm the per-spec section structure (already verified at planning — sections are alphabetical-ish by spec filename). Insert these entries at the **top** of each spec's section (reverse chronological per the file's own "Rules"):

For `site-chrome-spec-v1.md` section:

```
old_string:
### [`docs/specs/site-chrome-spec-v1.md`](docs/specs/site-chrome-spec-v1.md)

- **2026-05-21 (OPEN-1 wordmark CONFIRMED + favicon + OG assets generated):**
```

```
new_string:
### [`docs/specs/site-chrome-spec-v1.md`](docs/specs/site-chrome-spec-v1.md)

- **2026-05-22 (Phase 3e — §8 theme toggle deviated: dark mode removed entirely):** The locked §8 theme toggle was removed end-to-end as part of Phase 3e Bug 1. The `LIGHT · DARK` toggle in the footer-strip (Task 1.3), the `ThemeToggle.astro` component (Task 1.2), the `:root[data-theme="dark"]` token override block in `global.css` (Task 1.1), the print-stylesheet `.theme-toggle` selector (Task 1.1), and the inline `sw-theme` cookie-reader in `BaseLayout.astro` (Task 1.4) all went. The V3 bridge `sw-theme` cookie may still persist in legacy browsers but is no longer read or honored — Phase 3e OQ-1 decided against writing a counter-cookie. §8.1–§8.6 retained as historical reference under a v1-deviation banner. Side effect: closes Bug 6 (section pages opening in dark mode because of stale V3 cookies). Re-introducing dark mode would require a fresh design pass — the warm-paper texture + hero animation aren't currently dark-mode-compatible.

- **2026-05-21 (OPEN-1 wordmark CONFIRMED + favicon + OG assets generated):**
```

For `about-spec-v1.md` section:

```
old_string:
### [`docs/specs/about-spec-v1.md`](docs/specs/about-spec-v1.md)

- **2026-05-21 (§784 photo-exception sync to 10-card deck):**
```

```
new_string:
### [`docs/specs/about-spec-v1.md`](docs/specs/about-spec-v1.md)

- **2026-05-22 (Phase 3e — §11.3.1 v1 default: all 6 cels ship `break_grid: false`):** Samurai Jack's `break_grid: true` was orphaning Jake-the-Dog in a single-cel row 3 (Bug 8). Sean's call: scale Jack down to match the other 5 cels, packing row 2 cleanly (Jack · Iroh · Jake). The `.cartoon-cel--break-grid` CSS path in `CartoonCel.astro` stays as dead code for v1.1 emphasis if/when a future cel warrants the geometric break; the schema field default in `src/content/config.ts` remains `false`. v1.1 swap-back is a one-flag MDX edit. Documented inline at §11.3.1 with a Phase 3e v1-default banner.

- **2026-05-21 (§784 photo-exception sync to 10-card deck):**
```

For `projects-section-spec-v1.md` section:

```
old_string:
### [`docs/specs/projects-section-spec-v1.md`](docs/specs/projects-section-spec-v1.md)

- **2026-05-19 (critique fix §2 row 8 — drop annotation idle bob):**
```

```
new_string:
### [`docs/specs/projects-section-spec-v1.md`](docs/specs/projects-section-spec-v1.md)

- **2026-05-22 (Phase 3e — §3.5 added: `/work/` index page):** New §3.5 documents the `/work/` catalog index page that lands at `src/pages/work/index.astro` in Phase 3e. The original spec only anticipated a single surface over the `work` collection — the home Projects grid — but the top nav (added Phase 3a) already linked `/work/` and recruiters arriving via nav from other sub-pages expected the index to exist (Bug 7). The home grid remains the marketing surface; `/work/` is the IA-completeness surface. Both surfaces read the same content collection; row format on `/work/`, tile format on `/`. Click contract for both: `/work/<slug>/`.

- **2026-05-19 (critique fix §2 row 8 — drop annotation idle bob):**
```

- [ ] **Step 5: Verify all 4 edits land cleanly**

Run: `git diff --stat docs/specs/ CHANGELOG.md` — expected: 4 files modified, ~30-50 lines added.

Run: `grep -c "Phase 3e" CHANGELOG.md` — expected: 3 (one entry per spec).

- [ ] **Step 6: Commit**

```bash
git add docs/specs/site-chrome-spec-v1.md docs/specs/about-spec-v1.md docs/specs/projects-section-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(phase-3e): spec deviation notes + CHANGELOG entries for 3 bug fixes

Three spec edits + their CHANGELOG.md entries:

  1. site-chrome §8 — dark mode toggle removed entirely (deviation
     banner under §8 retained as historical reference for §8.1-§8.6)
  2. about §11.3.1 — v1 default: all 6 cels ship break_grid:false
  3. projects-section §3.5 — new section documenting the /work/ index
     page (Phase 3e Bug 7)

Each spec edit lands inline at the deviation point; each CHANGELOG
entry sits at the top of its per-spec section per the file's own
reverse-chronological rule.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Section 10 — Smoke + DoD walk

End-to-end verification that every bug closes and no regressions snuck in.

### Task 10.1: Build the site + serve it locally for the final smoke

**Files:**
- Read-only verification

- [ ] **Step 1: Stop the dev server + run a production build**

If the dev server is still running, stop it (Ctrl+C). Then:

Run: `npm run build`

Expected: build completes without errors; output written to `dist/`. Watch for any astro:check errors, MDX compilation failures, or Mermaid SSR failures — none should occur (Phase 3e doesn't touch Mermaid or any prebuild gate).

- [ ] **Step 2: Serve the built site**

Run: `npm run preview` (or `npx astro preview`) in a background terminal. Defaults to port 4321 or 4322 (the dev server may have held 4321).

Verify: `curl -sI http://localhost:4321/ | head -1` → `HTTP/1.1 200 OK`.

### Task 10.2: Clear the stale `sw-theme` cookie (closes Bug 6)

- [ ] **Step 1: In the browser DevTools → Application → Cookies → http://localhost:4321, delete any `sw-theme` cookie**

If the cookie doesn't exist, skip — the page already renders in light mode regardless (per Task 1.4).

- [ ] **Step 2: Hard-reload `/about/` + verify light mode**

Expected: page renders in light mode. `<html>` element has no `data-theme` attribute (per Task 1.4's deletion of the FOUC script).

### Task 10.3: Walk all 9 bugs against the built site

For each bug, perform the listed verification. If any bug FAILS, surface BLOCKED and investigate before claiming the smoke complete.

- [ ] **Bug 1 — Dark mode removed**

  - Footer-strip shows only the copyright; no LIGHT · DARK toggle visible.
  - Run: `curl -s http://localhost:4321/ | grep -c "data-theme\|sw-theme\|theme-toggle"` → expected `0`.
  - `<html>` element in DevTools has no `data-theme` attribute on any page.

- [ ] **Bug 2 — Hero loading flash on /about → / navigation**

  - From `/`, wait for the icon cycle to play through.
  - Click `ABOUT` in the nav → arrives at `/about/`.
  - Click `SW` wordmark → arrives at `/` via View Transition.
  - Expected: WebM visible immediately, no icon flash. Watch the hero region during the View Transition.
  - Hit browser back button (from `/` back to `/about/` then back to `/` again). Expected: same — no flash on bfcache restore.

- [ ] **Bug 3 — Torn-paper edge above About Teaser is continuous**

  - Scroll down `/` to the Projects → About Teaser boundary.
  - Expected: the torn-paper edge visibly bleeds 80px down into the warm-paper About Teaser, no thin horizontal line between sections.
  - Compare side-by-side with the Hero → Projects torn-paper edge — both should read as torn-paper, not as a hard rule.

- [ ] **Bug 4 — Footer SUBSCRIBE rows navigate to section pages**

  - Scroll to footer on `/` (or any page).
  - Click `transactions` (primary text) → expected: navigates to `/transactions/` index.
  - Click `rss` pill next to transactions → expected: opens `/transactions/rss.xml` (raw RSS XML).
  - Repeat for architecture + essays.
  - Click `read on substack` → expected: opens `https://substack.com/@seanpwins` in new tab.

- [ ] **Bug 5 — External link URLs corrected**

  - Hover (don't click) the LinkedIn link in the footer Contact column. Bottom-of-browser tooltip shows `https://www.linkedin.com/in/sean-winslow-204390a5`.
  - Hover the GitHub link → tooltip shows `https://github.com/seanwinslow28`.
  - Hover `read on substack` → tooltip shows `https://substack.com/@seanpwins`.
  - Hover `view the source` (DASHBOARD column) → tooltip shows `https://github.com/seanwinslow28/sw-ai-pm-portfolio`.
  - Visit `/about/` → confirm the B-5 ProofPoints visible text reads `linkedin.com/in/sean-winslow-204390a5` and `github.com/seanwinslow28`.
  - Visit `/contact/` → confirm same visible text strings.
  - Click each external link in turn → confirm it opens the correct Sean Winslow profile (not the wrong-Sean profiles).

- [ ] **Bug 6 — Section pages render in light mode**

  - Closes automatically via Bug 1.
  - Cookie cleared in Task 10.2; verify `/transactions/`, `/architecture/`, `/essays/`, `/about/`, `/contact/`, `/work/` all render in light mode (warm-paper background, dark teal headings).

- [ ] **Bug 7 — `/work/` index page exists**

  - Click `WORK` in the top nav (from any sub-page) → expected: lands on `/work/` with the 5-row case-study index.
  - Direct-visit `http://localhost:4321/work/` → expected: same.
  - Click any row → expected: navigates to `/work/<slug>/` (case-study deep-dive).
  - Click browser back → expected: returns to `/work/` index.
  - Verify the nav `WORK` tab shows the stamp-amber underline (active state) on both `/work/` and `/work/<slug>/`.

- [ ] **Bug 8 — Cartoon canon Jake reflows into row 2**

  - Visit `/about/` and scroll to the Saturday Morning Canon section.
  - Expected: 3×2 grid layout.
    - Row 1: Tommy Pickles · Ash Ketchum · Rocko
    - Row 2: Samurai Jack · Uncle Iroh · Jake the Dog
  - No cel renders at 1.2× scale; all 6 cels are uniform 280×320 frames.
  - Each cel still has its individual ±1.5° tilt (per the `angle:` frontmatter).
  - Mobile (375px viewport): single-column stack of all 6 cels, in order 1-6.

- [ ] **Bug 9 — Hero floor-shadow sits under the desk legs**

  - Visit `/` at 1920×1080. Expected: shadow centroid aligns with the visual center of the desk legs (chair leg base + front desk leg).
  - Test at 1440×900, 1280×800, 1024×768. Same expectation at each.
  - Compare against pre-fix screenshot (`docs/bugs-changes/screenshots/error-9.png`) — the shadow should now sit visibly higher and further right than before.

### Task 10.4: Verify build outputs are gitignored / committed correctly

- [ ] **Step 1: Confirm `dist/` is in `.gitignore` + working tree is clean**

Run: `git status --porcelain`

Expected: empty output (clean working tree). The `dist/` folder from `npm run build` should be gitignored (verify with `git check-ignore dist/` → exits 0).

- [ ] **Step 2: Confirm the branch is ready for Sean's review**

Run: `git log --oneline phase-2-foundations ^main | wc -l`

Expected: the Phase 3d count (13) + Phase 3e additions (~13-15) = ~26-28 commits ahead of main. (Sean's standing rule: do NOT push; the cutover to main is Phase 4.)

- [ ] **Step 3: Final commit (if any uncommitted changes from interactive steps)**

If Task 7.1's interactive shadow recalibration left any uncommitted changes from a follow-up tweak: amend or create a follow-up commit. Otherwise: no commit needed.

---

## Deferral table

Items intentionally NOT addressed in Phase 3e — picked up in Phase 4 or v2:

| Deferral | Why now / Where it goes |
|---|---|
| **Vercel deploy + DNS cutover** | Phase 4. The site needs all 9 bugs closed before deploy; Phase 3e is the gate. |
| **Plausible analytics** | Phase 4. Requires the live domain. |
| **Daily Driver agent writers** (`/api/dateline.json`, `/api/next-piece.json`, `/api/about-pulse.json`, `/api/shipped-stats-<slug>.json`) | Phase 4. Currently all four endpoints fall back to static placeholders. Sean's fleet code-brain agent picks these up after the cutover. |
| **V3 bridge `sw-theme` cookie hard cutover** | Phase 4. Phase 3e deleted the *reader* in the portfolio code; the V3 site (if still live during crossover) may still write the cookie. The cookie continues to exist in user browsers but is now harmless — no portfolio code reads it. |
| **`.crosslinks.json` dev-server flake** | Already filed for Phase 4. Pre-existing intermittent issue where the dev server caches stale crosslinks. Doesn't block Phase 3e's bug-fix scope. |
| **Sean's prose placeholder rewrites in MDX bodies** | Sean owns post-plan. The `[PLACEHOLDER —]` markers in `src/content/about/index.mdx`, `src/content/transactions/*.mdx`, `src/content/architecture/vault-knowledge-mcp.mdx`, and `src/content/essays/meaning-over-access.mdx` stay until Sean writes the prose. |
| **Asset re-encoding** (`about-full-body.png` + `06-jake.png` size budgets) | Sean owns post-plan. Currently both PNGs are over the spec'd byte budget; doesn't affect functionality, only LCP. |
| **OG image regeneration** (4 cards under `reference-images/og-cards/`) | Phase 4 — moves to `/public/` at scaffold-time. Currently still in `reference-images/`. |
| **`break_grid: true` re-introduction** | v1.1 if a cel ever needs emphasis. CSS path stays as dead code in `CartoonCel.astro`; schema field default stays `false`. |
| **Hero source PNG re-crop** (`hero-floor-shadow.png` centroid) | Texture-spec deferral — blocks on Procreate substrate work that's deferred indefinitely. Phase 3e ships a per-viewport CSS calibration instead. |
| **Dark mode v2** | If Sean revisits, requires a fresh design pass on the warm-paper texture + hero animation. No code currently expects dark mode to exist. |
| **Mid-cel `.cartoon-cel--break-grid` CSS dead-code removal** | Reserved for v1.1 / v2 cleanup pass. Removing now creates rework if Sean wants emphasis later. |

---

## Self-review

After writing the plan, I checked the bug doc against the plan:

**Spec coverage check:** All 9 bugs from `docs/bugs-changes/seanwinslow-portfolio-bugs-and-errors-1.md` have at least one task.

| Bug | Task(s) |
|---|---|
| 1 — Dark mode removal | Section 1 (Tasks 1.1, 1.2, 1.3, 1.4) — global.css tokens, ThemeToggle.astro delete, SiteFooter remove, BaseLayout FOUC script remove |
| 2 — Hero flash on /about → / | Section 5 (Tasks 5.1, 5.2) — inline pre-paint script + CSS, plus pageshow/astro:page-load listeners |
| 3 — Tear divider gap | Section 6 (Task 6.1) — z-index:11 on .projects |
| 4 — Footer subscribe routes wrong | Section 8 (Task 8.1) — restructure SUBSCRIBE column with rss-tag pill |
| 5 — Wrong external URLs | Section 2 (Tasks 2.1, 2.2, 2.3) — site.ts + about MDX + 3 components |
| 6 — Section pages auto-dark | Closes via Bug 1 + Task 10.2 (clear cookie) |
| 7 — /work/ returns 404 | Section 3 (Task 3.1) — new `/work/index.astro` |
| 8 — Jake in row 3 alone | Section 4 (Task 4.1) — flip `break_grid` flag |
| 9 — Hero shadow misaligned | Section 7 (Task 7.1) — interactive recalibration |

Plus Section 9 (Task 9.1) lands 3 spec edits + 3 CHANGELOG entries.

Plus Section 10 (Tasks 10.1–10.4) walks all 9 bugs end-to-end against the production build.

**Placeholder scan:** No "TBD", "implement later", or "similar to Task N" markers in any code block. The shadow-calibration step (Task 7.1 Step 3) intentionally uses `LEFT_DEFAULT` / `BOTTOM_DEFAULT` placeholders because the actual values come from the executor's DevTools measurement — they cannot be pre-derived. Step 2 documents the calibration procedure explicitly and Step 3 documents the placeholder replacement. This is the only intentional placeholder.

**Type consistency check:** No type mismatches — Phase 3e touches no TypeScript schemas. The `astro:content` schema for `cartoons` already has `break_grid: z.boolean().default(false)` which validates both true and false.

**Naming consistency check:** `hero-cycle-played` (sessionStorage key, kebab-case) matches between `BaseLayout.astro` inline script (Task 5.1) and `hero-icon-cycle.js`'s `SESSION_KEY` constant. `data-hero-cycle-played` (HTML attribute, also kebab-case) matches between BaseLayout script and `global.css` selector. `cycleInitialized` (camelCase dataset key) is new in Task 5.2 and only referenced in that one file.

**Commit count check:** Counted from the commit blocks above: 0.1 (1) + 0.2 (1) + 1.1 (1) + 1.2 (1) + 1.3 (1) + 1.4 (1) + 2.1 (1) + 2.2 (1) + 2.3 (1) + 3.1 (1) + 4.1 (1) + 5.1 (1) + 5.2 (1) + 6.1 (1) + 7.1 (1) + 8.1 (1) + 9.1 (1) + 10.3 (potential follow-up, 0-1) = **17 commits** ± 1. Within the ~14-16 estimate range (slight overrun acceptable given Section 2's URL-correction split across 3 tasks).

**Risk surface:** The only task with real ambiguity is Task 7.1 (interactive shadow calibration). It cannot be pre-determined; the executor's eye against Sean's prior review is the test. The plan documents the procedure and the directional guidance ("up" = decrease bottom, "right" = increase left) but explicitly does NOT pre-bake values. This is the right call — guessing would risk a 4th calibration round.
