# Site Chrome — Prose Locked Content

**Date:** 2026-05-28
**Status:** LOCKED — Phase 1 confirmed prose + Phase 2 footer-staging mechanism + Phase 3 dark-mode wipe (comprehensive). Ready to apply on Mac Mini AFTER the seven prior Workstream D lock docs land (transactions → architecture → essays → this doc).
**Scope:** The site chrome's prose surfaces — nav labels, wordmark, footer column headers + link strings, `/contact/` body, `/404/` body, copyright line, plus the cross-cutting F-2 footer-staging mechanism + the comprehensive dark-mode infrastructure wipe across 14+ spec sections and 5+ codebase locations. Out of scope: visual treatments + layout + JS behavior (already locked in `site-chrome-spec-v1.md` §2-§6 + §13-§14).
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-28 (continued from the essays lock earlier this session — Workstream D Phase 4 of the writing-council pass; final lock-doc in the Workstream D sequence).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

> **⚠️ EMAIL OVERRIDE (applied 2026-05-30, SHIP-PLAN-2026-05-29 D4):** The locked email below — `sean@seanwinslow.com` — is **superseded by `sean.winslow28@gmail.com`**. The `EMAIL` constant in `src/lib/site.ts` now holds the gmail address; the footer Contact column, `/contact/`, and every `mailto:` read from it. Every `sean@seanwinslow.com` string in this doc is historical; do not re-apply it.

---

## ⚠️ Apply order — read before Mac Mini work

This is the **eighth and final Workstream D lock doc**. Apply sequence at Mac Mini-side:

1. **Transactions lock** ([`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)) — first; ledger rows live
2. **Architecture lock** ([`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md)) — second, AFTER voice-review gate
3. **Essays lock** ([`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md)) — third, AFTER upstream manifesto ships
4. **Site chrome lock** (this doc) — fourth. Site chrome can technically apply at any point during Phase 2 build (the chrome shell renders empty surfaces gracefully), but the F-2 footer staging mechanism's initial `RSS_FEEDS = [transactions only]` state assumes transactions is live. Apply after transactions lands.

The dark-mode wipe in Phase 3 is comprehensive — codebase deletions + 14+ spec amendments. Sean confirmed 2026-05-28: "There shouldn't be any toggle for dark mode and there shouldn't be any way to switch over within the codebase." Treat the wipe as terminal — no v2 dark-mode work; if dark mode ever returns it'll be a fresh design pass from scratch (per the §8 DEVIATION's existing language).

---

## TL;DR — what's locked

### Phase 1 — Confirmed prose (lock-as-spec'd)

| Element | Locked content |
|---|---|
| Nav labels (5 tabs, sub-pages only — home has `noChrome={true}`) | `WORK · TRANSACTIONS · ARCHITECTURE · ESSAYS · ABOUT` |
| Wordmark | `SW` (JetBrains Mono 700, teal `#0A3E42`) |
| Footer column headers | `CONTACT · SUBSCRIBE · DASHBOARD` (mono 11px weight 500, tracking 1.8px, stamp amber `#7C2D12`) |
| Footer Contact column | `→ email · sean@seanwinslow.com` · `→ linkedin.com/in/seanwinslow ↗` · `→ github.com/seanwinslow ↗` |
| Footer Dashboard column | `→ view the fleet ↗` (`fleet.seanwinslow.com`) · `→ view the source ↗` (`github.com/seanwinslow/sw-portfolio`) |
| Skip link | `Skip to content` |
| Copyright line | `© 2026 SEAN WINSLOW · BOSTON` |
| `/contact/` body sentence | `Email me at sean@seanwinslow.com.` (Newsreader 20px weight 300) |
| `/contact/` link list | 3 mono links matching the Contact column |
| `/404/` h1 | `PAGE NOT FOUND` |
| `/404/` body sentence | `Nothing at this URL.` (4-1 — spec default, Vonnegut flat) |
| `/404/` link | `→ HOME` (mono 14px) |

### Phase 2 — Footer staging (F-2 mechanism)

Two `site.ts` constants drive the SUBSCRIBE column + RSS auto-discovery `<head>` tags. Surfaces stage as they ship by uncommenting one array entry per surface.

| Stage | Trigger | SUBSCRIBE column rendered | `<head>` RSS tags rendered |
|---|---|---|---|
| **v1 launch** | portfolio goes live | `→ transactions / rss` + `→ read on substack ↗` | 1 transactions link |
| **v2** | architecture page goes live (post-voice-review) | + `→ architecture / rss` | + 1 architecture link |
| **v3** | essays publish day (2026-06-19) | + `→ essays / rss` | + 1 essays link |

### Phase 3 — Dark-mode wipe (comprehensive, terminal)

14+ spec sections amended + 5+ codebase locations deleted. Full enumeration in §3.3. **Terminal:** no v2 dark-mode work queued; the §8 DEVIATION's "fresh design pass required" language stands.

---

## Carry-forward constraints

1. **The chrome must never compete with the editorial content above it.** Per spec §1: "Restraint is the principle — this is the part of the site that LITERALLY repeats on every page." Calibrate all chrome prose against this — every word ships on every page; over-cute language ages within a week of repeated exposure.
2. **No comedy on the 404 or `/contact/` pages.** Per spec §10.3 + §9.3. The chrome is the calm frame around the content — it must never be the personality moment. The Sedaris voice register lives in case-study openers + About B-2 + About B-4, not here.
3. **No Sedaris-coded moments on chrome.** Per spec §4 voice register: "wire-service mono throughout the chrome — except the 404 page's body sentence and the `/contact/` page's calm one-paragraph, which use Newsreader 20px weight 300." Newsreader is the only non-mono surface; the voice within Newsreader stays sober (not Sean-coded warmth, not comedic, not first-person except where the spec explicitly requires it).
4. **Dark mode is terminal.** Per Sean's 2026-05-28 confirmation. Don't add infrastructure for "future dark-mode re-introduction" — if it comes back, it's a fresh design pass starting from a new spec.
5. **All carry-forward constraints from prior lock docs still apply.** Particularly: no Code Brain fixed counts (doesn't apply directly here), no HybridRouter (doesn't apply), no tenure-foregrounding (doesn't apply), no fleet-at-tagline-level (doesn't apply — chrome has no tagline). The chrome surfaces are mechanically downstream of editorial discipline; constraints from prior locks don't intersect chrome prose, but the same SOBRIETY rule that governs the architecture surface governs the chrome.
6. **Email constant lives in one place** — `src/lib/site.ts`. Per the chrome spec §11 + prior locks. The footer Contact column, the `/contact/` page, the BaseLayout meta tags, and the `mailto:` link all import from one source. Changing the email later is a one-character edit.

---

## Phase 1 — Confirmed prose (LOCKED)

### 1.1 Nav labels

**File:** rendered by `src/components/chrome/SiteNav.astro` per spec §6.

**Locked — 5 sibling tabs, right-aligned, mono uppercase:**

```
WORK · TRANSACTIONS · ARCHITECTURE · ESSAYS · ABOUT
```

JetBrains Mono 12px weight 500, tracking 1.2px. Active tab gets `aria-current="page"` + 1px stamp-amber `#7C2D12` bottom border. Per-tab `pathname.startsWith()` match (per spec §6.2) — `/work/` matches both `/work/` and `/work/animation-pipeline/`.

**Home (`/`) does NOT render the nav** — `noChrome={true}` per spec §3 + hero spec §13. `/contact/` and `/404/` render the nav (per spec §3.2). `/about/` renders the nav.

### 1.2 Wordmark

**Locked:** `SW`

JetBrains Mono 14px weight 500 (700 per the §16 OPEN-1 confirmation 2026-05-21 — using 700 for stronger optical weight at small size), tracking 1.4px uppercase, teal `#0A3E42`. Links to `/`. Renders in the nav (sub-pages), the universal footer (all pages), the favicon set (already authored per CLAUDE.md), and the lower-left corner of all 4 OG cards (already authored).

**Resolved spec §16 OPEN-1** — confirmed default; no further editorial work.

### 1.3 Footer column headers

**File:** `src/components/chrome/SiteFooter.astro`.

**Locked — 3 columns, stamp amber `#7C2D12`, mono 11px weight 500 tracking 1.8px uppercase:**

| Column | Header |
|---|---|
| Left | `CONTACT` |
| Middle | `SUBSCRIBE` |
| Right | `DASHBOARD` |

### 1.4 Footer Contact column links

**Locked — 3 links, mono 13px weight 500, tracking 0.8px, teal `#0A3E42`:**

```
→ email · sean@seanwinslow.com
→ linkedin.com/in/seanwinslow ↗
→ github.com/seanwinslow ↗
```

External links (linkedin + github) get the `↗` glyph (mono 12px secondary ink, 4px left margin per spec §7.5). The `email · ` prefix on the first link distinguishes it from a bare URL — mirrors the `→ email` shape Sean uses across his other surfaces.

URLs resolve from `src/lib/site.ts`:
- `EMAIL = "sean.winslow28@gmail.com"`  <!-- D4 override 2026-05-30 (was sean@seanwinslow.com) -->
- `LINKEDIN_URL = "https://linkedin.com/in/seanwinslow"`
- `GITHUB_URL = "https://github.com/seanwinslow"`

### 1.5 Footer Dashboard column links

**Locked — 2 links, same mono treatment as Contact column:**

```
→ view the fleet ↗
→ view the source ↗
```

External links resolve from `site.ts`:
- `FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com"`
- `SITE_REPO_URL = "https://github.com/seanwinslow/sw-portfolio"`

The "view the source" link materializes the portfolio's transparency thesis (per spec §7.7) — recruiters who care about how the site is built click through; recruiters who don't, don't. Per audit answer #10 (2026-05-28): the portfolio repo is public at crossover.

### 1.6 Skip link

**Locked:** `Skip to content`

JetBrains Mono 13px weight 500, paper `#FFF9F0` text on stamp amber `#7C2D12` background when focused; `sr-only` hidden otherwise. First focusable element in `<body>`; jumps to `#main-content`.

### 1.7 Copyright line

**Locked:** `© 2026 SEAN WINSLOW · BOSTON`

JetBrains Mono 11px weight 400, tracking 1.2px uppercase, secondary ink `#546E71`. Right-aligned on desktop bottom strip; below the (now empty) bottom strip on mobile.

Resolves from `site.ts`:
- `SITE_NAME = "Sean Winslow"`
- `SITE_LOCALE = "BOSTON"`
- `COPYRIGHT_YEAR = "2026"`

### 1.8 `/contact/` page body

**File:** `src/pages/contact.astro` per spec §9.

**Locked content (renders inside `<BaseLayout>` with full chrome):**

```mdx
BOSTON · CONTACT
─────────────────────────────────────────

Contact

Email me at sean@seanwinslow.com.

→ email · sean@seanwinslow.com
→ linkedin.com/in/seanwinslow ↗
→ github.com/seanwinslow ↗
```

The dateline + h1 ("Contact") use spec §5 type tokens (Newsreader `clamp(40px, 5vw, 72px)` weight 400 teal for h1; mono 12px secondary ink for dateline). The body sentence is Newsreader 20px weight 300 ink — single sober paragraph; matches the architecture surface's prose register.

**The 3 link list** uses the same shape as the chrome footer's Contact column — by design. The page exists primarily to preserve V3-bridge bookmarks (per spec §9.1); the meaningful subscribe affordances are in the chrome footer below.

### 1.9 `/404/` page body (4-1 — spec default)

**File:** `src/pages/404.astro` per spec §10.

**Locked content (renders inside `<BaseLayout>` with full chrome):**

```mdx
BOSTON · 404
─────────────────────────────────────────

PAGE NOT FOUND

Nothing at this URL.

→ HOME
```

Vonnegut flat. Four words for the body sentence; one mono link for the affordance. **No comedy, no illustration, no apologetic tone, no "lost in the wilderness" framing.** The 404 is a fact, stated calmly. Per spec §10.3 — the discipline ages well; a too-cute 404 becomes the dated personality moment within a month.

H1 uses Newsreader `clamp(40px, 5vw, 72px)` weight 400 teal (matches `/contact/` h1). Body uses Newsreader 20px weight 300 ink. `→ HOME` mono 14px weight 500 teal.

---

## Phase 2 — Footer staging (F-2 mechanism, LOCKED)

### 2.1 The staging principle

At v1 launch, only the transactions surface has a live RSS feed (essays ships ~6/19; architecture ships post-voice-review, ~6/3-6/4). Including links to non-existent feeds would 404. Each surface's go-live moment includes a one-line site.ts edit to add its RSS link to the chrome footer + the BaseLayout head.

### 2.2 `src/lib/site.ts` additions

Append to the existing constants module:

```ts
/**
 * RSS feeds rendered in the chrome footer's SUBSCRIBE column + BaseLayout <head>
 * auto-discovery tags. Stage by uncommenting entries as each surface ships its
 * RSS endpoint. v1 launch = transactions only; architecture + essays uncomment
 * on their respective go-live days (architecture ~6/3 post-voice-review,
 * essays 2026-06-19 publish day).
 */
export const RSS_FEEDS = [
  { surface: "transactions", url: "/transactions/rss.xml", label: "transactions / rss" },
  // { surface: "architecture", url: "/architecture/rss.xml", label: "architecture / rss" },
  // { surface: "essays",       url: "/essays/rss.xml",       label: "essays / rss" },
] as const;

/**
 * External subscribe affordances rendered alongside the RSS feeds in the
 * chrome footer's SUBSCRIBE column. Substack is the only external entry at v1.
 */
export const EXTERNAL_SUBSCRIBE_LINKS = [
  { name: "Substack", url: SUBSTACK_URL, label: "read on substack" },
] as const;
```

`SUBSTACK_URL` already declared in `site.ts` per spec §11 (`https://sean.substack.com`).

### 2.3 `SiteFooter.astro` SUBSCRIBE column render

The component maps over both arrays:

```astro
---
import { RSS_FEEDS, EXTERNAL_SUBSCRIBE_LINKS } from '../../lib/site.ts';
---
<section aria-labelledby="footer-subscribe-heading">
  <h2 id="footer-subscribe-heading">SUBSCRIBE</h2>
  <ul>
    {RSS_FEEDS.map(feed => (
      <li>→ <a href={feed.url}>{feed.label}</a></li>
    ))}
    {EXTERNAL_SUBSCRIBE_LINKS.map(link => (
      <li>→ <a href={link.url}>{link.label}</a> ↗</li>
    ))}
  </ul>
</section>
```

The `↗` glyph appears only on external links (per spec §7.5). RSS links are internal; no glyph.

### 2.4 `BaseLayout.astro` `<head>` auto-discovery render

Map over `RSS_FEEDS` only (substack is not an RSS feed, doesn't get `<link rel="alternate">`):

```astro
---
import { RSS_FEEDS } from '../lib/site.ts';
---
<head>
  ...
  {RSS_FEEDS.map(feed => (
    <link
      rel="alternate"
      type="application/rss+xml"
      href={feed.url}
      title={`Sean Winslow — ${feed.surface.charAt(0).toUpperCase() + feed.surface.slice(1)}`}
    />
  ))}
  ...
</head>
```

At v1 launch, the head renders one `<link rel="alternate">` for transactions only. Architecture + essays auto-add when the array entries uncomment.

### 2.5 Staging triggers — when to uncomment each entry

| Trigger | Action |
|---|---|
| Architecture page goes live (post-voice-review, ~early June) | Uncomment line 2 of `RSS_FEEDS` (`architecture` entry). Commit + deploy. |
| Essays publish day (2026-06-19) | Uncomment line 3 of `RSS_FEEDS` (`essays` entry). Commit + deploy. Same commit can flip the essays MDX `status: DRAFT → PUBLISHED` per the essays lock §2a. |

Each staging commit is 1 line of code + 1 line uncommented + a commit message like `chrome: stage architecture RSS subscribe link`.

### 2.6 Auditability

The git log carries the staging history — every surface's go-live moment leaves a corresponding chrome staging commit. Auditable in 2 grep commands:
```bash
git log --oneline -- src/lib/site.ts | grep -i 'stage'
git log --oneline -- src/components/chrome/SiteFooter.astro
```

---

## Phase 3 — Dark-mode wipe (LOCKED, comprehensive, terminal)

Per Sean's 2026-05-28 confirmation: "There shouldn't be any toggle for dark mode and there shouldn't be any way to switch over within the codebase." This is the terminal wipe — no v2 dark-mode work queued.

### 3.1 Spec amendments (14+ sections)

Applied to `docs/specs/site-chrome-spec-v1.md`:

| Spec section | Currently says | Amend to |
|---|---|---|
| §1.1 changelog | (entry implicit in §8 deviation) | Add explicit 2026-05-28 changelog: "Comprehensive dark-mode wipe across §2.2 / §4 / §5 / §7.1 / §7.2 / §7.3 / §8 / §12 / §15 / §17 / §18 / §23 / Appendix A / Appendix B + 5 codebase locations. Terminal — no v2 dark-mode work queued. See `docs/writing-council/site-chrome-prose-locked-2026-05-28.md` for the full amendment table." |
| §2.2 universal footer ASCII | Bottom strip shows `LIGHT · DARK` toggle (left) + copyright (right) | Bottom strip shows copyright only (right-aligned, single line) |
| §4 type system table | Includes 3 rows for theme toggle labels: `Theme toggle label (active)` / `Theme toggle label (inactive)` / `Theme toggle separator` | Delete all 3 rows |
| §5 color rules table | Includes the row: `Dark-mode tokens \| per V3 bridge's data-theme="dark" palette; defined site-wide but home hero stays light-only per hero spec §14` | Delete that row |
| §7.1 footer JSX example | Includes `<ThemeToggle />` element inside `<div class="footer__strip">` | Replace `<ThemeToggle />` + the surrounding `footer__strip` wrapper with a single `<p class="copyright">` right-aligned element |
| §7.2 desktop layout | "Bottom strip below the columns: theme toggle left-aligned, copyright right-aligned. 60px vertical padding." | "Bottom strip below the columns: copyright right-aligned (single line). 60px vertical padding." |
| §7.3 mobile layout | "Bottom strip stacks: theme toggle on top, copyright below. 40px vertical padding." | "Bottom strip: copyright only. 40px vertical padding." |
| §8 entire section (DEVIATION header + §8.1 through §8.6) | DEVIATION header + 6 sub-sections of legacy rationale | Collapse to a 3-line stub: *"Dark mode removed 2026-05-22 (`global.css` palette + `<ThemeToggle />` component + `<script is:inline>` FOUC-prevention + `sw-theme` cookie reader all deleted). Comprehensive codebase + spec wipe completed 2026-05-28 per `site-chrome-prose-locked-2026-05-28.md` §3. Re-introducing dark mode requires a fresh design pass — the warm-paper torn-paper texture and the hero animation aren't dark-mode-compatible."* Delete §8.1 through §8.6. |
| §12.1 BaseLayout `<head>` example | Includes the `<!-- Inline theme script (FOUC prevention) -->` block with the `<script is:inline>` cookie-reader function | Delete the comment + the entire `<script is:inline>` block |
| §15 anti-stack | Includes: `No cookie banner — no tracking cookies (theme cookie is functional, not tracking)` | Amend to: `No cookie banner — no cookies at all.` (theme cookie is gone; parenthetical no longer applies) |
| §17 out of scope | 3 items: `Auto-detect prefers-color-scheme for theme — v2` / `Time-of-day theme switch (PMP §10 D5) — v2` / `Home-page dark-mode hero — v2` | Delete all 3 items (terminal — not deferred, not happening) |
| §18 DoD #9 | `Theme toggle uses two mono text labels "LIGHT · DARK"...` | Delete |
| §18 DoD #10 | `Theme cookie persists across reloads (1-year max-age, SameSite=Lax)...` | Delete |
| §18 DoD #11 | `Dark-mode color tokens defined site-wide; home hero stays light-only when dark mode is toggled...` | Delete |
| §18 DoD item count | "23 items" in the closing sentence | Renumber: "20 items." Renumber existing #12-#23 → #9-#20 to fill the gap |
| §23 DoD V3 bridge clause (originally #23 after renumber → #20) | `V3 bridge bookmarks pointing at /contact/ resolve to the new minimal page (no 404); the sw-theme cookie from V3 continues to work without modification at crossover.` | Trim to: `V3 bridge bookmarks pointing at /contact/ resolve to the new minimal page (no 404).` Cookie clause deleted. |
| Appendix A file map | Includes `ThemeToggle.astro` under `src/components/chrome/` | Delete the `ThemeToggle.astro` line |
| Appendix B hand-off prompt | `Build <SiteNav.astro> + <SiteFooter.astro> + <ThemeToggle.astro> + <SkipLink.astro>` | Trim to: `Build <SiteNav.astro> + <SiteFooter.astro> + <SkipLink.astro>` |

### 3.2 Codebase deletions

Tracked in the apply checklist (§"Apply-on-Mac-Mini" below):

| Location | Action |
|---|---|
| `src/components/chrome/ThemeToggle.astro` | **Delete file entirely.** Component never imported anywhere after the deletions in `SiteFooter.astro`. |
| `src/styles/global.css` — `:root[data-theme="dark"] { ... }` block | **Delete the entire selector block** (the dark-mode token palette). |
| `src/components/chrome/SiteFooter.astro` — `<ThemeToggle />` import + JSX | **Delete the import statement.** Delete the `<ThemeToggle />` element from the bottom-strip render. Restructure bottom strip per §3.1 §7.1 amendment (copyright only, right-aligned). |
| `src/layouts/BaseLayout.astro` — `<script is:inline>` FOUC-prevention block | **Delete the entire `<script is:inline>` block** from `<head>`. The block reads the `sw-theme` cookie and sets `document.documentElement.setAttribute('data-theme', theme)`. Without dark-mode CSS, this code does nothing. |
| `src/layouts/BaseLayout.astro` — any `data-theme` attribute on `<html>` | **Delete the attribute** if present. The chrome no longer cares about a theme attribute. |
| `src/styles/global.css` — `@media print { :root { color-scheme: light !important; } }` | **Drop the `!important`.** Keep the `color-scheme: light` rule as the only "lightness signal" — tells the browser the page wants light mode, prevents browser auto-darkening features from inverting colors. No competing dark mode to overcome, so `!important` is unnecessary. |

### 3.3 The `sw-theme` cookie

Cookies set by V3 bridge visitors and possibly still present in some browsers expire on their own (1-year max-age; browsers ignore unread cookies). **No code action needed** — the new code never reads the cookie, so it's inert. The spec language at §23 promising it continues to work is amended away per §3.1.

### 3.4 Verification

After the wipe, no grep should return matches for any of these patterns:
- `data-theme` (codebase-wide)
- `ThemeToggle` (codebase-wide)
- `sw-theme` (codebase-wide)
- `prefers-color-scheme` (codebase-wide — except in `print` stylesheet's `color-scheme: light` rule, which is one-way "tell the browser we want light" rather than reading the user's preference)
- `LIGHT · DARK` (codebase-wide)

Run these greps post-apply as a smoke test. If any return matches, audit each one — the wipe missed a location.

---

## Spec implications

The full spec amendment table is §3.1 above (14+ sections covering Phase 3). Two additional amendments cover Phase 1 + Phase 2:

| Spec section | Currently says | Amend to |
|---|---|---|
| §16 OPEN-2 (sticky vs scrolls-away nav) | Open question | Resolved: locked sticky (`position: sticky`) per spec recommended default. No change to spec body needed; just mark OPEN-2 as resolved in §16. |
| §16 OPEN-3 (`/contact/` route preservation) | Open question | Resolved: minimal page kept per Phase 1 §1.8. Mark OPEN-3 as resolved. Re-assess in 6 months — if `/contact/` gets <5 hits/month after crossover, drop the route per the spec's own guidance. |
| §16 OPEN-4 ("view the source" link) | Open question — confirm portfolio repo public at crossover | Resolved: confirmed 2026-05-28 (Sean: "This works now, we're good"). Mark OPEN-4 as resolved. |
| §16 OPEN-5 (email constant) | Open question | Resolved: `sean.winslow28@gmail.com` per SHIP-PLAN-2026-05-29 D4 (2026-05-30 override of the prior `sean@seanwinslow.com`). Mark OPEN-5 as resolved. (OPEN-1 already resolved in §16 per the 2026-05-21 wordmark confirmation.) |
| §7 (footer structure) | Single static SUBSCRIBE column with 3 RSS feed links + 1 Substack link | Amend to describe the F-2 staging mechanism per Phase 2 §2.2-§2.5. Reference: `RSS_FEEDS` + `EXTERNAL_SUBSCRIBE_LINKS` arrays in `site.ts`. |
| §12.2 per-page OG overrides | (no change needed) | No change |
| §13.1 sitemap | (no change needed) | No change |
| Appendix A file map | (no change beyond §3.1) | No change |

Apply as a single spec-amendment commit on Mac Mini after the lock-doc apply lands. Closes out all 5 OPEN questions + the dark-mode wipe + the F-2 staging documentation.

---

## Apply-on-Mac-Mini checklist

Single combined session for chrome + dark-mode wipe. The wipe is mechanical but touches many files — execute carefully + run the §3.4 verification greps before commit.

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; transactions + architecture + essays lock-doc applies should already have landed)
3. **`site.ts` additions** (§2.2 above). Edit `src/lib/site.ts`:
   - Append the `RSS_FEEDS` array with transactions uncommented + architecture/essays commented out
   - Append the `EXTERNAL_SUBSCRIBE_LINKS` array with Substack entry
4. **`SiteNav.astro`** — confirm 5-tab render per §1.1 above; wordmark per §1.2; sticky behavior per spec §6.1 + §6.1.1 (locked sticky default, first-sub-page chrome continuity discipline preserved). No editorial changes from spec.
5. **`SiteFooter.astro` — restructure for dark-mode wipe + F-2:**
   - Delete `<ThemeToggle />` import statement
   - Delete `<ThemeToggle />` element from JSX
   - Delete the `<div class="footer__strip">` wrapper around the toggle (or restructure to hold copyright only)
   - Replace SUBSCRIBE column ul with the `RSS_FEEDS.map() + EXTERNAL_SUBSCRIBE_LINKS.map()` render per §2.3
   - Bottom strip: copyright right-aligned, single `<p class="copyright">` element
   - Confirm Contact column links per §1.4
   - Confirm Dashboard column links per §1.5
6. **`BaseLayout.astro` — restructure for dark-mode wipe + F-2:**
   - Delete the entire `<!-- Inline theme script (FOUC prevention) -->` comment + `<script is:inline>` block from `<head>`
   - Delete any `data-theme` attribute setter on `<html>`
   - Replace the 3 hard-coded `<link rel="alternate" type="application/rss+xml">` tags with `RSS_FEEDS.map(...)` per §2.4
7. **Delete `src/components/chrome/ThemeToggle.astro` entirely.** `rm src/components/chrome/ThemeToggle.astro`. Confirm no other component imports it (grep `ThemeToggle` site-wide — should return zero matches after this step).
8. **`global.css` deletions:**
   - Delete the `:root[data-theme="dark"] { ... }` selector block (the dark-mode token palette)
   - In `@media print { :root { color-scheme: light !important; } }`: drop the `!important` modifier (keep the `color-scheme: light` rule)
9. **Create `src/pages/contact.astro`** per §1.8 above (if not already created in a prior session — confirm).
10. **Create `src/pages/404.astro`** per §1.9 above (if not already created — confirm).
11. **Verification greps** (§3.4) — should return zero or near-zero matches:
    ```bash
    grep -rn "data-theme" src/    # zero
    grep -rn "ThemeToggle" src/   # zero
    grep -rn "sw-theme" src/      # zero
    grep -rn "prefers-color-scheme" src/  # zero (or matches only on the print stylesheet's color-scheme rule, which is acceptable)
    grep -rn "LIGHT · DARK" src/  # zero
    ```
    If any return matches, audit each one before commit.
12. Run `npm run dev` and QA:
    - Home (`/`) renders without nav (`noChrome={true}` preserved)
    - Every sub-page (`/work/<slug>/`, `/transactions/`, `/architecture/` if shipped, `/essays/` if shipped, `/about/`, `/contact/`, `/404`) renders the nav with the active tab carrying `aria-current="page"`
    - Footer renders on every page with 3 columns (Contact / Subscribe / Dashboard) — Subscribe column shows transactions/rss + read-on-substack only at v1 launch
    - Bottom strip shows copyright only (no LIGHT · DARK toggle)
    - `/contact/` renders the Phase 1 §1.8 content + chrome
    - `/404` renders the Phase 1 §1.9 content + chrome (test by visiting `/this-does-not-exist`)
    - `<head>` auto-discovery shows one `<link rel="alternate">` for transactions only
    - No dark-mode CSS in the rendered page source (view source on any page; grep for `data-theme` and `LIGHT · DARK` — both should be absent)
    - Skip link works (Tab key from page load focuses the skip link)
    - Print preview: page renders in light mode regardless of any browser auto-darkening preference (the `color-scheme: light` rule + the absence of dark tokens make this automatic)
13. **Lighthouse spot-check:** Performance ≥95 on home (no nav script, no theme script, no FOUC reader); Accessibility ≥95; Best Practices = 100.
14. Commit:
    ```bash
    git add .
    git commit -m "Site chrome v1: F-2 footer staging + dark-mode wipe (terminal) + /contact/ + /404 per site-chrome-prose-locked-2026-05-28"
    ```
15. **Separate spec-amendment commit.** Update `docs/specs/site-chrome-spec-v1.md` per §"Spec implications" + §3.1 above:
    ```bash
    git add docs/specs/site-chrome-spec-v1.md
    git commit -m "Site chrome spec v1.1: dark-mode wipe across 14 sections + F-2 footer staging documented + OPEN-2/3/4/5 resolutions"
    ```
16. **Staging follow-ups (single-line edits, separate commits when each surface goes live):**
    - When architecture page goes live (post-voice-review): uncomment `architecture` entry in `RSS_FEEDS`. Commit message: `chrome: stage architecture RSS subscribe link`
    - When essays publish day (2026-06-19): uncomment `essays` entry in `RSS_FEEDS`. Same commit can flip essays MDX `status: DRAFT → PUBLISHED` per essays lock §2a. Commit message: `chrome: stage essays RSS subscribe link; essays status → PUBLISHED`

When steps 1-15 land, site chrome v1 is locked and Workstream D is closed. Steps 16's staging follow-ups fire as each surface's editorial work clears its own gates.

---

## Source-of-truth files used in this lock

| File | Role |
|---|---|
| `docs/specs/site-chrome-spec-v1.md` | Canonical chrome spec — the 14+ sections amended by Phase 3 + the 5 OPEN questions resolved here |
| `docs/writing-council/essays-prose-locked-2026-05-28.md` | Essays lock — established the v1/v2 footer-staging precedent that this lock formalizes as F-2 |
| `docs/writing-council/transactions-prose-locked-2026-05-27.md` | Transactions lock — established the per-surface footer fold language ("→ subscribe via RSS + → view the fleet ↗") that the chrome footer's SUBSCRIBE column inherits |
| `docs/writing-council/architecture-prose-locked-2026-05-27.md` | Architecture lock — established the chrome wire-service register that this lock honors (austere voice, no Sedaris, no comedic juxtaposition) |
| CLAUDE.md §"Locked decisions" | Wordmark (SW), email constant (sean@seanwinslow.com), and the home-page `noChrome={true}` rule — all confirmed by this lock |

---

## Companion lock docs

Final lock doc in the Workstream D writing-council sequence. Read in order:

1. [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md) — About B-1/B-2/B-4 prose
2. [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) — 5 case-study openers (with 2 amendments)
3. [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md) — 4 project taglines
4. [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) — 3 case-study 4Q blocks (with 1 amendment)
5. [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md) — Transactions ledger v1
6. [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md) — Architecture surface v1 (Vault Scorecard)
7. [`essays-prose-locked-2026-05-28.md`](essays-prose-locked-2026-05-28.md) — Essays surface v1 (meaning-over-access manifesto)
8. **This doc** — Site chrome v1 + dark-mode wipe + F-2 footer staging — **closes Workstream D**

All carry-forward constraints accumulate across the 8 lock docs. Sean retains voice authority on every locked string above.

---

## What's next (post-Workstream D, per Sean's 2026-05-28 sequencing)

Sean specified the post-Workstream D audit + authoring queue:

1. **A-4 The Block broader cleanup** — fix the fabricated content: frontmatter dates (line 15-16), anchor metric (now locked but Methods strip not yet refreshed), methods array (the multi-surface scope from the 2026-05-27 four_q lock needs to land in `methods[]`), fabricated investigation board artifacts. Needs sanitizable source material from `/Users/seanwinslow/Code-Brain/code-brain/the-block/product-management/the-block-resume-info/`.
2. **A-2 / A-3 / A-5 investigation board content** — locked content authoring per case-study spec §10. A-2 board tracks Code Brain fleet ops; A-3 board is the intent-engineering-mcp build calendar with the v0 → v0.1.0 cut decision visible; A-5 board tracks the pause decision + the KILLED items. A-1 already locked (anima production progress tracked separately).
3. **Methods strip full authoring for all 5 case studies** — partial fixes already applied (A-1 + A-5 stack-truth corrections per the 2026-05-27 amendment); full row sets (4-7 rows per case study per spec §8.1) need editorial work. The Methods strip is where HybridRouter lives per the cross-portfolio STOP-DOING rule.

After those three closures, the writing-council pass is closed. Items 7-10 from this lock's pre-Workstream-D queue (About §B-3 cartoon cels content collection, 6th ledger row vault-scorecard, OG card text verification, backfill amendments) all stay queued but Sean's 2026-05-28 call is to ship the site without them and amend post-launch as needed.

---

*Authored 2026-05-28 in the brainstorm-ideas-existing skill session on MBP. Final lock-doc in the Workstream D writing-council sequence. Sean retains voice authority on every locked string above.*
