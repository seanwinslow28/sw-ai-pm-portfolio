# Continuation Prompt — RSS feed styling + content-validation guardrails

**Created:** 2026-06-01 (paste this whole file into a fresh Claude Code session in this repo)
**Repo:** `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
**Branch to start from:** `feat/impeccable-critique-cel-optim` (or branch off `main` if that's merged)
**Why this session exists:** A launch-readiness `/impeccable critique` + remediation pass just landed (see the post-mortem below). It left two things for a fresh session: (1) a user-found RSS bug, and (2) the four prevention checks the post-mortem recommends so this class of defect can't recur.

---

## 0. Orientation — read these first, in order

1. [`CLAUDE.md`](../../CLAUDE.md) — project orientation, the "template trap," the three load-bearing things, working mindset, locked decisions, file map. **Non-negotiable: read it.**
2. **This file.**
3. [`docs/post-mortems/2026-06-01-impeccable-critique-launch-readiness.md`](../post-mortems/2026-06-01-impeccable-critique-launch-readiness.md) — the WHY behind Task 2. §5 "How we should proceed" is the spec for the guardrails. §2/§4 explain the failure classes the checks defend against.
4. [`DESIGN.md`](../../DESIGN.md) — design-system encoding (color, type, spacing, motion). Needed for Task 1's stylesheet so the RSS landing page is on-brand. Also carries the **em-dash ban** — keep all new prose/copy em-dash-free (the whole site was just cleaned; don't reintroduce them).
5. [`CHANGELOG.md`](../../CHANGELOG.md) — read its "How to add an entry" header. Log any spec-touching change here.
6. Spec for whichever surface you touch: [`docs/specs/transactions-spec-v1.md`](../specs/transactions-spec-v1.md) §10 (RSS), [`docs/specs/site-chrome-spec-v1.md`](../specs/site-chrome-spec-v1.md) §2.4 (RSS auto-discovery + footer), [`docs/specs/essays-spec-v1.md`](../specs/essays-spec-v1.md), [`docs/specs/architecture-spec-v1.md`](../specs/architecture-spec-v1.md).

**Voice:** any user-facing copy you write (e.g. the RSS landing page heading/blurb) goes through `.claude/skills/writing-voice-modes`. Calm, specific, comedic-confident, dialed to ~40-60% for a utility page. No em dashes.

**Working norms (from the two prior post-mortems — these are load-bearing):**
- A green build proves compilation, not a finished page. **Verify in `dist/` and in the browser**, not just that `npm run build` exits 0.
- Run `npm run build` after changes; it runs the `prebuild` chain (`validate_content → fetch_canonical → derive_crosslinks → validate_about`) then `astro build`. 30 pages currently build.
- To see it live: `npm run dev` (it will pick an open port; recent sessions landed on `:4324`). Kill stray `astro dev` processes when done.
- A critique/observation is a hypothesis until ground-truthed. Verify before you change.

---

## Task 1 — RSS feeds render as a raw, unstyled XML page (USER-FOUND BUG)

### Symptom
Clicking **"subscribe via RSS"** (and the `RSS →` links in the page headers) on **Transactions, Architecture, and Essays** opens the feed XML directly and the browser shows the scary default *"This XML file does not appear to have any style information"* tree. For a recruiter who clicks it, that reads as broken. (The user supplied screenshots of exactly this on `/transactions/rss.xml`.)

### Ground truth / likely cause (verify, then fix)
This is *expected* browser behavior for an RSS feed that ships no XSL stylesheet — the feed itself is valid and correct for feed readers. The question the user asked is **"what is supposed to be shown there?"** The answer for a portfolio: a small, on-brand **styled landing page** that renders when a human opens the feed in a browser, while staying valid RSS for readers. The standard mechanism is an XSL stylesheet referenced by an `<?xml-stylesheet?>` processing instruction.

`@astrojs/rss`'s `rss()` helper supports a **`stylesheet`** option that injects exactly that PI. None of the three feeds set it.

### Files
- Feeds (all three call `rss()` with no `stylesheet`):
  - [`src/pages/transactions/rss.xml.ts`](../../src/pages/transactions/rss.xml.ts)
  - [`src/pages/essays/rss.xml.ts`](../../src/pages/essays/rss.xml.ts)
  - [`src/pages/architecture/rss.xml.ts`](../../src/pages/architecture/rss.xml.ts)
- Link sources (where "subscribe via RSS" / `RSS →` originate):
  - [`src/components/chrome/SiteFooter.astro`](../../src/components/chrome/SiteFooter.astro)
  - [`src/components/transactions/FooterFold.astro`](../../src/components/transactions/FooterFold.astro)
  - [`src/components/transactions/IndexHeader.astro`](../../src/components/transactions/IndexHeader.astro), [`src/components/essays/IndexHeader.astro`](../../src/components/essays/IndexHeader.astro), [`src/components/architecture/IndexHeader.astro`](../../src/components/architecture/IndexHeader.astro)
- Auto-discovery `<link rel="alternate">` + the feed registry: `RSS_FEEDS` in [`src/lib/site.ts`](../../src/lib/site.ts), consumed in [`src/layouts/BaseLayout.astro`](../../src/layouts/BaseLayout.astro).
- Astro RSS docs: use Context7 (`mcp__plugin_context7_context7`) or WebFetch on `https://docs.astro.build/en/recipes/rss/` to confirm the current `stylesheet` API + how to author the XSL.

### Recommended approach (confirm against the docs first)
1. Author one XSL stylesheet, e.g. `public/rss/styles.xsl`, styled to the paper/editorial brand (warm paper `#FFF9F0`, ink, teal `#0A3E42`, Newsreader headings + JetBrains Mono meta — but note an XSL page is standalone HTML/CSS, it does **not** get the site's fonts/CSS for free, so inline a minimal on-brand stylesheet; web-safe fallbacks are fine, don't pull the CDN back in). It should render: the feed title, the one-line description, a short human blurb ("This is an RSS feed. Paste this URL into your reader," with the page's own URL), and the list of items (title linked to the post, date, description). Keep it calm and on-voice. No em dashes.
2. Pass `stylesheet: "/rss/styles.xsl"` to all three `rss()` calls.
3. **Related loose end to fix in the same task:** the **essays** entry in `RSS_FEEDS` ([`src/lib/site.ts`](../../src/lib/site.ts) ~line 44) is still commented out with "uncomment on 2026-06-19 publish day" — but the manifesto essay was **published early, dated 2026-06-01**, in the prior session (it's live at `/essays/meaning-over-access/`). Uncomment the essays feed so its `<link rel="alternate">` auto-discovery is emitted, and confirm `/essays/rss.xml` now contains the manifesto item.

### Acceptance criteria
- Opening `/transactions/rss.xml`, `/essays/rss.xml`, `/architecture/rss.xml` in a browser shows a readable, on-brand page — not the raw XML tree.
- `curl`/view-source still shows valid RSS 2.0 XML with the `<?xml-stylesheet?>` PI at the top; the feed still validates (item titles, links, pubDates, `content:encoded` intact).
- The essays feed is registered in `RSS_FEEDS` and its auto-discovery `<link>` appears in `<head>` on essays pages.
- Build green; verify in `dist/` (the `.xsl` should land in `dist/rss/`) and in the browser.
- Log the change in CHANGELOG under transactions-spec / site-chrome-spec (RSS stylesheet) and essays-spec (feed un-gated on early publish).

### Open question for you to resolve (don't guess — decide and note it)
The spec'd intent (transactions-spec §10, site-chrome §2.4) may say nothing about a browser-styled feed. Confirm whether a styled landing is the right call vs. just leaving feeds as reader-only (and instead making the footer link clearer, e.g. "RSS feed (for readers)"). The styled-XSL approach is the recommended default for a portfolio because the link is recruiter-facing; but check the specs and state the decision in CHANGELOG.

---

## Task 2 — Turn the post-mortem's lessons into `prebuild` guardrails

**Source of truth:** [`docs/post-mortems/2026-06-01-impeccable-critique-launch-readiness.md`](../post-mortems/2026-06-01-impeccable-critique-launch-readiness.md) §5 "How we should proceed." Build these four checks. The point: every P0/P1/P2 in that critique passed the build because the failures were *valid-but-incomplete data* and *authored-but-unwired assets*. Make the build catch them.

Existing infra: [`scripts/validate_content.mjs`](../../scripts/validate_content.mjs) already runs first in the `prebuild` chain (see `package.json` scripts). Add to it (or add a sibling script wired into `prebuild`). Match its existing style, error format, and exit-code conventions — read it before extending.

### The four checks (priority order)
1. **Empty-board-card check (prevents the bug Sean caught).** Every `<BoardArtifact>` in `src/content/work/*.mdx` must have a non-empty `excerpt` **or** both `ticketKey` and `ticketTitle`. A card with only `boardLabel` renders as an empty polaroid frame. **Fail the build** on a body-less card; name the file + artifactId. (See post-mortem F1; component is [`src/components/artifacts/BoardArtifact.astro`](../../src/components/artifacts/BoardArtifact.astro).)
2. **Em-dash lint (keeps the just-completed pass from rotting).** Scan **rendered** fields across content collections — body prose, `valueProp`, `lead`, `excerpt`, `boardLabel`, `prdTitle`, `chartTitle`, `mermaidCaption`, `subtitle`, honest-note/limitation strings — for `—`. **Allowlist** (do NOT flag): the wire-service dateline-stamp pattern (`MON DD —` / `MONTH YYYY —`) and `KILLED —` status stamps inside `<p slot="caption">`, the locked project title `The Block — Campus + RevOps`, the sitewide `— Sean Winslow` page-title separator, and `#` code comments. Warning-on-fail is acceptable (it's a P3 tell), but prefer hard-fail on clearly-rendered prose fields. (See post-mortem F6; the prior pass converted ~150 of these — the patterns it preserved are your allowlist.)
3. **Dateline-coherence assertion (backstops the three-different-todays bug).** No "today/updated" date a page renders may be *after* the build date. The single source is [`src/lib/dateline.ts`](../../src/lib/dateline.ts) (`BUILD_DATE_ISO`); the fleet JSON lives in `public/api/*.json`. Assert that `dateline.json.date_iso` and `about-pulse.json.date_iso` are `<= BUILD_DATE_ISO` (stale-behind is fine, it's handled by the fallback; *ahead* is the bug). (See post-mortem F2.)
4. **Render-gated asset locks (prevents unwired OG cards / CDN fonts).** A cheap version: assert that every file in `public/og-cards/**` is referenced by some page's `ogImage` (grep the content collections + `src/lib/site.ts`), and assert no `dist/**/*.html` references `fonts.gstatic.com`/`fonts.googleapis.com` (a post-build check, or a guard in `validate_content` over `BaseLayout.astro`). (See post-mortem F3/F4.)

### Acceptance criteria
- Each check fails the build (or warns, per above) on a seeded violation, and passes on the current clean tree.
- `npm run build` stays green on the current content (the prior session already made all four conditions pass — so a correct implementation should NOT fire on today's tree; if it does, you've found a real issue, investigate before loosening the check).
- Don't over-fit: the em-dash allowlist must not be so broad it never fires, nor so narrow it flags the legitimate stamps/titles. Test both directions.
- Log the new checks in CHANGELOG (reference the post-mortem).

---

## Suggested order
Task 1 first (user-facing, self-contained, fast win), then Task 2 (infra). They're independent; do Task 1, verify, commit, then Task 2.

## Definition of done for the session
- RSS feeds render an on-brand styled page in-browser, still valid for readers; essays feed registered.
- The four guardrail checks live in the `prebuild` chain, fire on violations, pass clean.
- `npm run build` green at 30+ pages; spot-checked in the browser.
- CHANGELOG updated. No new em dashes introduced. Stray dev artifacts cleaned from the repo root.
- Note any decisions/open questions back to the user (especially the Task 1 open question).
