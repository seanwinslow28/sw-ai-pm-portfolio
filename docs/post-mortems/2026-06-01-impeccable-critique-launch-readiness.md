# Post-Mortem — Impeccable Launch-Readiness Critique + Remediation

**Date:** 2026-06-01
**Branch:** `feat/impeccable-critique-cel-optim` (this work)
**Scope:** A final pre-Vercel `/impeccable critique` of the whole site, triggered by Sean spotting empty graph/board frames on the project pages. Two isolated live-browser design reviews + the deterministic detector, reconciled into a report, then a full remediation pass: empty cards, the daily-dated date layer, fonts, OG cards, the manifesto essay, P3 polish, and a complete em-dash conformance pass.
**Outcome:** All P0/P1/P2 findings resolved and verified in `dist`. Manifesto essay published early (dated 6/1) with a voice-preserving em-dash pass. Fonts fully self-hosted (zero CDN font requests). Every rendered in-prose em dash across case studies, transactions, architecture, and the essay converted. Build green at 30 pages. Two follow-ups remain Sean's call (regenerate fleet data before deploy; the optional daily-rebuild cron).

---

## 1. Summary

The build was genuinely close to launch-ready — clean anti-pattern verdict, ~34/40 Nielsen, the differentiator (hand-drawn character + dated agent-fleet layer) intact. But six issues sat between it and "a recruiter instantly wants to talk to him," and the through-line of all six is the same: **work that was authored or specced correctly but never *finished into the rendered page*.** The excerpts existed (in the wrong slot). The OG cards existed (unwired). The fonts were "optimized" (still CDN-fetched). The manifesto was written (gated to a future date). The em-dash rule was documented (not enforced). None of these are build errors, so the build stayed green while the page stayed wrong.

The headline lesson repeats the [2026-05-30 remediation post-mortem](2026-05-30-v1-remediation-apply.md): **the dangerous failures here are the silent ones — valid data that's incomplete, and authored assets that were never connected.** A green build is not evidence of a finished page.

---

## 2. What failed (and severity)

### F1 — Seven Investigation-Board cards rendered as empty frames *(P0 / the one Sean caught)*
`<BoardArtifact>` renders its body from an `excerpt` (or `ticketKey`/`ticketTitle`) prop into a 180px-min-height polaroid. Seven cards (code-brain ×3, the-block ×3, 16bitfit ×1) passed only a `boardLabel`, so the frame showed a single amber title over a void, with the date stamp trailing a dangling "—". The substance existed but sat in the right-hand `caption` slot. Worst on mobile, where the empty boxes dominate the column. **Why it shipped:** the props are all optional in the schema, so a card with no body is structurally valid; nothing failed at build. It read as a broken data binding to the one person who matters (a recruiter), which is exactly the "is this real?" reflex the site exists to defeat.

### F2 — The daily-dated layer showed three different "today"s *(P0 — attacks the core differentiator)*
On 2026-06-01 the home hero read **MAY 30**, the home About-teaser pulse labelled May-30 stats **"TODAY,"** transactions read **MAY 31**, and case studies/essays computed **JUNE 1**. Root cause: **two date sources.** Build-time `new Date()` datelines (case studies, essays) were current; the Daily-Driver fleet JSON (`dateline.json`, `about-pulse.json`) was frozen at its last write (2026-05-30) and only refreshes on redeploy. The whole thesis is "real and dated to this morning," so a home page two days behind a case study is the single most corrosive crack a skeptical recruiter could find — and the pulse calling stale stats "TODAY" was the worst version of it.

### F3 — Fonts loaded from the Google CDN, not self-hosted *(P1 — resilience + FOUT)*
`<GoogleFontsOptimizer>` (`astro-google-fonts-optimizer`, hero-spec §13) inlines the `@font-face` CSS but the woff2 binaries still fetched from `fonts.gstatic.com` at runtime, with `font-display: swap`. On a locked-down corporate network (common for recruiters) the entire Newsreader/JetBrains editorial identity degrades to generic serif at the exact moment of first impression. **Why it slipped:** the component name implied "optimized/self-hosted." It optimized the request, not the dependency. Assumed-done, never verified. Also surfaced a quiet spec drift: a *third* font, Caveat, rode the same CDN against the two-font lock.

### F4 — Dedicated OG cards authored but never wired *(P2)*
`og-cards/intent-engineering-mcp.png` and `og-cards/vault-scorecard.png` (and the essay card) existed on disk from Phase 0, but `work/[slug].astro` and `architecture/[slug].astro` never passed `ogImage` to `BaseLayout`, so every shared link emitted the generic `og-default.png`. **Authoring an asset is not wiring it.** The Phase-0 lock recorded the cards as "done" and the wiring task fell in the gap between asset authoring and page build.

### F5 — The Essays section was an empty room in the nav *(decision, not bug — but a launch gap)*
`meaning-over-access.mdx` was authored but staged `status: DRAFT` / `published: 2026-06-19`, so `isLiveEssay` correctly excluded it — leaving an "Essays" nav item that dead-ends on "0 essays" while the page header asserts a writing thesis. For a "creative who writes" positioning, an empty writing room on a 10-second triage is a real credibility cost. The gate was working as designed; the *launch sequencing* (ship the nav before the content) was the gap.

### F6 — Em dashes pervasive against the documented DESIGN.md ban *(P3 — slow drift)*
~150 em dashes across the case studies, transactions, architecture, and the essay. DESIGN.md bans em dashes in editorial prose; the essay frontmatter even carried a note to run the pass "through voice, not mechanically." **Why it drifted:** the rule lived in a doc, not in a check, and content was authored fast across many sessions. Em dashes are the single most common "AI wrote this" pattern-match in a hiring window, so it's a low-severity-but-high-signal tell.

### F7 — P3 craft gaps
`/work/` index was a text-only list discarding the project art that makes the home grid land; the home heading order skipped H1→H3 (no section H2); the 404 copy ("Nothing at this URL.") was flat for a comedic-confident brand; the `paper-tile` preload lacked an explicit `type`.

---

## 3. How each was resolved

| # | Fix | Verified by |
|---|---|---|
| F1 | Authored a terse board-voice `excerpt` for all 7 cards (the artifact body), distinct from the narrative caption. | `dist` grep shows excerpts rendering on `/work/code-brain` + `/work/the-block`. |
| F2 | New `src/lib/dateline.ts` — single build-date source (resolved in America/New_York). Hero + projects datelines derive their date from it; the home pulse `TODAY→LATEST` degrades when the JSON is >48h stale (`isFresh`). Fleet JSON refreshed to 6/1. | `dist`: home now `JUNE 1`, coherent with case studies; zero contradictory "today"s. |
| F3 | Removed `<GoogleFontsOptimizer>`; self-hosted via `@fontsource` (Newsreader/JetBrains/Caveat + real italics), imported in `BaseLayout`. Caveat logged as the documented two-font-lock exception. | `dist`: 34 woff2 emitted, **zero** `gstatic`/`googleapis` references. |
| F4 | Added optional `ogImage` to the work + architecture schemas; set it on the two MDX files; passed `data.ogImage` through all three dynamic pages. | `dist`: each page emits its dedicated `og:image`. |
| F5 | Flipped the manifesto to `PUBLISHED`, dated 6/1 (dateline + future `lastValidated` corrected), completed its em-dash voice pass, wired its OG card. | `dist`: `/essays/` lists "Access Over Meaning"; no empty state. |
| F6 | Conscious, voice-preserving re-punctuation of **every rendered in-prose em dash** (commas/colons/parens/periods, no words changed). Left the wire-service dateline/`KILLED` stamps, the locked `The Block — Campus + RevOps` title, alt-text, and the sitewide `— Sean Winslow` title separator by design. | grep: no rendered prose em dash remains in content. |
| F7 | `/work/` rows gained thumbnails; sr-only `<h2>` fixes the heading skip; 404 reads "Filed, but it never ran. The desk is one click back."; preload `type="image/png"`. | Build green; thumbnails present in `dist`. |

All changes logged in [`CHANGELOG.md`](../../CHANGELOG.md) under hero-spec (fonts + dateline), essays-spec (manifesto pull-forward + OG), and case-study-spec (board excerpts + em-dash pass).

---

## 4. What we learned

1. **A green build proves the code compiles, not that the page is finished.** Every P0/P1/P2 here passed the build. The failure class is *valid-but-incomplete data* (empty `excerpt`, frozen JSON) and *authored-but-unconnected assets* (OG cards, fonts). Builds don't catch either.
2. **The daily-dated layer's failure mode is silent staleness, and its currency is honesty.** Two date sources will always drift apart; a single source plus a build-date fallback is the only coherent design. And never label stale data "TODAY" — the credibility cost of one noticed contradiction is larger than the whole feature's upside.
3. **"Optimized" is not "self-hosted."** A dependency's name (`GoogleFontsOptimizer`) implied a property it didn't have. Verify the network tab, not the import name.
4. **Authoring ≠ wiring ≠ rendering.** Phase-0 "asset locked" checklists silently assume a later wiring step that has no owner. The lock should not read "done" until the asset renders on the page that uses it.
5. **A documented rule that isn't a check will drift.** The em-dash ban was in DESIGN.md for weeks and accrued ~150 violations. Rules enforced by prose decay; rules enforced by `prebuild` don't.
6. **Staging content behind a future date ships the nav before the room is furnished.** Gating logic (`isLiveEssay`) worked perfectly and still produced a bad launch surface, because the *sequencing* (publish the section link, defer the content) was never reconciled against "what does a recruiter see today."
7. **Trust the converging signal, verify the lone one.** The two isolated reviews agreed on F1–F6 (high confidence, all real). One reviewer flagged the architecture page as "self-contradictory" (`JUNE 1` dateline + `UPDATED 05-31`); on inspection that's correct newsroom convention (today's dateline over content with its own ship date), not a defect. This mirrors the [5/30 post-mortem](2026-05-30-impeccable-critique-pre-vercel.md) lesson: a critique finding is a hypothesis until ground-truthed.

---

## 5. How we should proceed

**Before the Vercel deploy (Sean):**
- **Regenerate the fleet JSON for real.** The dates are now coherent (build-date fallback), but `dateline.json` body + `about-pulse.json` stats are the *last* run's representative numbers restamped to 6/1. Run the Daily Driver so the launch shows genuine 6/1 fleet activity. The honesty of the differentiator is load-bearing.
- Decide the **daily-rebuild question**: the build-date fallback keeps dates coherent on every deploy, but the *content* (fleet narrative, pulse stats) only refreshes when the site rebuilds. If the fleet writes JSON daily but Vercel doesn't rebuild, the page lags. A daily Vercel deploy hook (or a scheduled rebuild) closes that loop.

**Turn the lessons into checks (highest-leverage prevention):**
1. **Add a `validate_content.mjs` rule:** every `<BoardArtifact>` must have an `excerpt` *or* a `ticketKey`+`ticketTitle`. Fails the build on an empty card. (Directly prevents F1.)
2. **Add an em-dash lint to `prebuild`:** scan rendered fields (body, `valueProp`, `lead`, `excerpt`, `mermaidCaption`, `boardLabel`, `prdTitle`, `chartTitle`) for `—`; allowlist the dateline-stamp pattern, the `— Sean Winslow` title separator, and code comments. Warning-on-fail. (Prevents F6 recurring.)
3. **Add a dateline-coherence assertion:** at build, no "today/updated" label may predate `BUILD_DATE_ISO`. (Backstops F2.)
4. **Make Phase-0 asset locks render-gated:** an asset is "locked" only when a test asserts it renders on its target route (OG card in `og:image`, font in `dist` with no CDN ref). (Prevents F3/F4.)

**Process:**
- Re-run `/impeccable critique` after the fleet data is regenerated, to confirm the score moves and nothing regressed.
- Keep the verify-the-lone-finding discipline: converging multi-agent findings are trustworthy; a single reviewer's structural claim gets ground-truthed before it drives a change.

---

## 6. Files touched

33 source/content/config files + 3 fleet JSON + CHANGELOG; 1 new file (`src/lib/dateline.ts`); 3 npm font deps added. No spec files edited (deviations logged in CHANGELOG per the repo convention). Stray review screenshots cleaned from the repo root. Build: 30 pages, green.
