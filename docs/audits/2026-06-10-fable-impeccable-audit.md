# Launch-Grade Audit — 2026-06-10 (Fable + Impeccable)

**Branch:** `audit/2026-06-10-impeccable-fable` (cut from `origin/main` @ `88f3632`, today's fleet refresh) · **Artifact:** fresh `npm run build` + `npm run preview` (never dev) · **Method:** technical sweep + `/impeccable critique` (2 isolated reviewer agents + deterministic detector, reconciled) + recruiter-conversion lens. Environment note: `.nvmrc` says Node 22 but only 25.2.1 exists on this machine (and nvm's loader script is missing); all builds ran on 25.2.1, same as recent history.

---

## 1. Verdict

**Ship-ready, and meaningfully better after this pass.** Nothing here was a true launch-blocker, but two P0/P1-class credibility bugs were live: the manifesto essay rendered its entire body **twice** (the one page arguing "I review what agents produce"), and the live site showed the Daily Driver's 08:32 ET morning write as **"updated 12:32"** because Vercel builds in UTC — both attack the honesty layer at exactly the moments it's supposed to prove itself. Both are fixed and verified. The single change with the most upside left on the table: give the hero dateline (the unfakeable evidence) one earned register of visual weight — it currently whispers at 12px while carrying the whole "agent fleet" half of the positioning.

## 2. Scorecard

| Axis | Result |
|---|---|
| Nielsen heuristics (reviewer A, full notes §App-A) | **32/40** before fixes → the two consistency draggers (duplicate essay, stale About quote) are now fixed |
| AI-slop / anti-pattern verdict | **Clean.** No gradient text, no glass, no hero-metric template, no identical card grid, two fonts confirmed in computed styles. Residual risk: case-study hero illustrations read close to image-gen style (the hero WebM and About cels read hand-drawn) |
| Color strategy | **Committed teal confirmed on home** (~35–40% chrome by area, single splash, Z-map implemented literally 0/10/11/12/20/30). Sub-pages collapse to ~0% visible teal — spec-internal tension, see P2-09 |
| Type discipline | **Intact.** Two families + Caveat accent; every stray family in dist CSS is provably dead code; editorial step ratios 2.0–2.25 (≥1.25 required); tagline weight 300 confirmed |
| Motion (Emil review) | **Conformant.** All UI state transitions 120–250ms; entrances 400–800ms one-shot; zero layout-property transitions; start states scale(0.97), never scale(0). Two unspec'd `infinite` animations noted (P3-13) |
| Lighthouse (throttled, preview) before → after | home perf 77→**80**, a11y 96→**100** · case study perf 85→**85**, a11y 96→**100** · about a11y **100** · transactions perf **96**/a11y **100** · bp+seo **100** everywhere. Home LCP 5.6s→5.0s (sim-throttled; real-world is much faster) |
| Build | 34 pages green · `astro check` 4 errors → **0** · validators green · em-dash lint green (zero prose violations — the 6/1 pass held) |
| Links / assets / feeds | 0 broken internal links, 0 missing assets, 0 CDN font requests, og:image on all 34 pages, 3 valid RSS feeds (14/1/1 items) |

## 3. Findings (P0 → P3)

### Fixed on this branch

**P0-01 · Essay body renders twice** · confidence High (reproduced, measured)
`/essays/meaning-over-access/` — the full ~2,000-word essay rendered in `.essay-body`, then verbatim again under "— EXPLANATION —" (page 14,333px for a "6 MIN READ"). Root cause: the band-8 inline-4Q fallback rendered `<Content />` whenever no canonical explanation file existed — but for an essay whose MDX *is* the body (`sourceUrl: null`), that's the whole essay again. Doubled boilerplate is the signature of an unreviewed LLM pipeline, on the page whose thesis is reviewing what agents produce. **FIXED** — fallback now gated on `essayBodyMarkdown`; body renders once; page 9,478px; zero dead anchors.

**P1-02 · Fleet timestamps rendered in build-machine timezone (live on production)** · High
`NowPulse` and `ShippedNow` formatted `updated_at` without a timeZone: live seanwinslow.com showed **"updated 12:32 by daily driver"** and **"05/30/2026, 12:30"** for 08:32/08:30 ET writes (verified against production HTML). The runbook narrative is "the fleet writes each morning" — the page said early afternoon. **FIXED** — both render in `America/New_York`; verified identical output on ET and UTC builds.

**P1-03 · SHIPPED stamp and IN FLIGHT ranges shift a day with build timezone** · High
`new Date()` + tz-less formatting on `z.coerce.string()` date output: any ET build stamps the intent-engineering case study **"MAY 11, 2026"** (vs MAY 12 in the page's own prose and OG card) and renders 16BitFit's range as 11-2025 (vs 12-2025 on the live UTC build). Latent nondeterminism: production happened to be right, every local artifact was wrong. **FIXED** — UTC-anchored formatting; double-build (ET + UTC) produces byte-identical dates.

**P1-04 · NIP "check back ~jun 10" at 1.56:1 contrast** · High (Lighthouse + 2 reviewers converged)
The A-6 tile subtitle rendered stamp amber `#7C2D12` on `--teal-deep` — near-invisible (screenshot evidence in audit scratch). DESIGN.md's §5 component spec says stamp amber, but its own Inversion Rule names amber-mid as the chrome-side warm, and the rule's claim that stamp amber "passes contrast on teal" is false (measured 1.26:1 on `#0A3E42`). **FIXED** to `--amber-mid` (9.4:1); the date a recruiter is invited to come back on is now legible.

**P1-05 · Frame numbers amber-mid on paper at 1.48:1** · High
Case-study title block + prev/next nav frames (`A-3`, `← A-2`) rendered chrome-token `#FAC775` on cream — Lighthouse contrast fail, and an Inversion-Rule breach (amber-mid is chrome-only). The case-study spec's §4 table does lock amber-mid here — resolved in favor of DESIGN.md + WCAG, logged as a spec deviation in CHANGELOG. **FIXED** to stamp amber; case-study a11y 96 → 100. (The About `B-n ·` kickers carry the same color by explicit about-spec lock — left untouched, see Dismissed D-6.)

**P1-06 · `/about/` had no h1** · High
The page's heading outline started at `<h2>`; the locked lead line was a `<p>`. **FIXED** — lead is now the `<h1>` with identical styling (class self-styles; copy byte-identical; `validate_about` green).

**P1-07 · Shiki injected pure #fff + 5 foreign hues** · High
The architecture Try-It block's `github-light` theme inlined `#fff` background + `#005CC5`/`#032F62`/`#6F42C1`/`#D73A49`/`#24292e` token colors, defeating the component's CSS override — the only No-Pure-White violation on a rendered page. **FIXED** — custom inline Shiki theme on the system palette; zero foreign hex in the rendered page.

**P2-08 · Index-page datelines bypassed `dateline.ts`** · High
Architecture + essays IndexHeaders stamped "BOSTON, <date>" from a bare `new Date()` — on a UTC server any post-8pm-ET deploy shows *tomorrow's* date, the exact bug `dateline.ts` §8 was built to prevent. **FIXED** — both derive from `BUILD_DATE_PRETTY`.

**P2-10 · Custom cursor was a full React island** · High
The only React on the site (`Cursor.tsx`, `client:load` site-wide) shipped react + react-dom (~186KB raw / ~58KB gzip) for an 80-line effect. **FIXED** — vanilla `Cursor.astro`, behavior-identical (verified live: dot lerps, 10× hero-name hover scale, reduced-motion/touch guards, view-transition re-init); zero React chunks in dist.

**P2-11 · Charts clipped their own labels** · High (both reproduced + screenshotted)
(a) Mermaid quadrant title clipped both ends ("…cess vs Meaning × …Workfl") — text spans −26..526 in a 500px SVG; (b) eval-chart x-axis label rendered "L3-ful" (SVG default `overflow: hidden`, 5px clip). The "PM who measures" evidence read as unreviewed output. **FIXED** — `overflow: visible` on both chart SVGs (the wrappers' padding absorbs the overhang); verified rendering full labels.

**P2-12 · Assorted, all verified**
- 4 `astro check` ts2322 errors (component Props stricter than schema) → **0**; surfaced a real defect: the role-map negative-space row rendered an href-less dead `<a>link ↑</a>` → now a muted `·`. FIXED.
- Tailwind 4 scanned `.claude/skills/` markdown and emitted dead `border-l-4`/`text-gray-400`/`bg-blue-500` utilities into shipped CSS → `source("..")` scoping; gone from dist. FIXED.
- `paper-tile.png` is the measured LCP element on every route; preload lacked `fetchpriority="high"` → added (home LCP 5.6→5.0 sim). FIXED.
- `hero-floor-shadow.png` 159KB → WebP 77KB, dead PNG removed; tear + overlay imgs gained width/height. FIXED.
- Wordmark aria-label lacked the visible "SW" (WCAG 2.5.3) → "SW — Sean Winslow, home". FIXED.
- About close-out quote still carried the pre-D8 "Product Manager." sentence against its own byte-identical-echo contract → matches the hero. FIXED.
- Home teaser `TODAY ·` prefix used amber-mid on cream (1.48:1) where the teaser spec *names* stamp-amber but typo'd amber-mid's hex → stamp amber. FIXED.
- Deprecated auto-collection warning for `src/content/explanations/` → declared collection. FIXED.

### Proposed / reported (not built — touches locked decisions, data contract, or needs Sean)

**P2-09 · Committed-teal collapses to ~0% on all 8 sub-page routes** · Med (rule conflict)
Single full-bleed `.page-sheet` everywhere off-home; tears are home-only per texture-spec §3.6/§4.6 — but the Committed-Teal Named Rule says 30–60% "of any given screen." Additionally, case-study pages skip `.page-sheet` entirely: `.case-study` is **raw flat cream with no paper-tile texture** ("Never raw flat cream" Do-item) and no z-10. Recommend: (a) at minimum, give `.case-study` the paper-tile texture (pure conformance, low risk); (b) decide whether sub-pages should reveal chrome at the footer seam (tear above the footer) or whether the Named Rule should be scoped to the home in DESIGN.md. Spec call, not mine.

**P3-13 · Two unspec'd `infinite` animations** — `swipe-me-bob` (teaser swipe hint, desktop) and `live-pulse` (ShippedNow dot). Both reduced-motion-guarded; the dot is arguably status semantics (omitted when stale). Emil rule says no persistent ambient motion on decoration; only the COMING pulse is licensed. Kill or license them — one CHANGELOG line either way.

**P3-14 · Spec/code drift, unlogged** — hero tagline clamp renders `clamp(28px,3.4vw,60px)` vs spec'd `clamp(26px,3.2vw,56px)`; NIP hover border animates to 0.85 vs spec'd 1.0; tile meta-strip shadow `0 -6px 14px @0.35` logged in CHANGELOG but never added to the design.json shadow vocabulary; texture-spec HTML snippet still references `hero-floor-shadow.png` (now WebP). Reconcile in one doc pass.

**P3-15 · Amber-mid `#FAC775` annotation marks on paper surfaces** (essay + 5 transaction deep-dives) — explicit letter violation ("Never used on paper"), but at ~1.06:1 it reads as an intentional ghost watermark. Decide: license it in DESIGN.md or move to `--border-paper`.

**P3-16 · 2px radius beyond pills + one stray shadow** — `ReturnConditionCallout`, `BoardArtifact` ticket card, Try-It `pre`, `/work/` row thumbs (which also carry an unspec'd 1px shadow). Sharp-Corners Rule says 2px is pills-only. Cosmetic; sweep when convenient.

**P3-17 · Daily-data config notes (report-only, data contract untouched)** — `next-piece.json` says the next piece is "Vault Scorecard" targeted **2026-06-10**, but Vault Scorecard already shipped (ledger MAY 31 + architecture writeup): the editorial `[portfolio.next_piece]` knob needs an update or the A-6 tile's promise inverts tomorrow. Consider a Daily Driver rule that auto-degrades a past `date_target` (honest-staleness, never invented). Also: `/transactions/pipeline/` and `/transactions/writing/` are routable, linked filter targets with **zero artifacts** (designed empty state, but "UPDATED <today> · 0 ARTIFACTS" is odd semantics); fetch_canonical warns that `enterprise-ap-agent-spec` + `enterprise-data-readiness-matrix` upstream EXPLANATION.md files miss the canonical Q1–Q4 headings.

**P3-18 · Footer link tap targets ~18px tall on mobile** — passes with WCAG 2.5.8 spacing exception, but comfortable padding would help thumbs. `/contact/` nav has no `aria-current` (correct — no CONTACT tab — noted so nobody "fixes" it).

**P3-19 · Mermaid bundle** — `mermaid.core` 607KB + `wardley` 612KB + `cytoscape` 442KB chunks exist but **only load on the 2 diagram pages** (verified home loads none). Fine as-is; if it ever bothers, prerender the two diagrams to SVG at build.

## 4. Recruiter-conversion levers (ranked)

1. **Credibility-bug class — done this pass.** The duplicate essay, the 12:32-vs-morning contradiction, MAY 11-vs-12, clipped chart labels, the invisible "check back" date: every one fired the "is this real / did anyone review this?" reflex at a moment of proof. These were the cheapest belief wins available; they're fixed.
2. **Let the dateline speak once at full volume.** The 10-second triage lands "creative + AI PM" instantly (name, role tag, tagline, drawn character), but the *fleet evidence* — the unfakeable half — is a 12px mono whisper the eye reaches 4th, if at all. One earned moment (e.g., the stamp-amber prefix as a literal rubber-stamp treatment, home only) would put "real agent fleet, this morning" into the first three eye stops without touching the calm-paper layout. Touches the locked hero → Sean's call.
3. **End case studies with the character.** The Character-on-Every-Key-Surface rule promises a close-out beat on every case study; today the pages end Q4 → prev/next → registration glyph. The end of a case study is where a recruiter decides to read another. Needs art (even a reused pose) → Sean's call.
4. **Restyle "Proof points" into a proper close.** /about/'s biggest serif promise currently delivers three raw mono links (`sean-winslow-204390a5` showing) right before the (now-corrected) pull quote. Labeled rows with human display text would end the page at the same craft level it opens with.
5. **Watch the A-6 freshness bomb.** "check back ~jun 10" is today; if the date passes with no new piece, the honesty layer inverts into evidence of abandonment (P3-17). This is a fleet-config edit, not site code.

## 5. Delight menu (not built; effort/risk; why it's Sean, not template)

| Idea | Effort | Risk | Why it's Sean |
|---|---|---|---|
| Rubber-stamp dateline prefix on home (slight rotation + ink texture on the BOSTON stamp, once) | S | Low (hero is locked → needs sign-off) | Wire-service register made literal; amplifies the differentiator, not decoration |
| Caveat margin annotations in the case-study right rail ("this is the cut →" beside the APR 30 card) | M | Low — vocabulary already licensed (§14, almost unused) | The animator's hand filling the idle 510px rail; nobody else's portfolio can do it |
| Character close-out beat on case studies (static pencil pose above prev/next) | M (art) | Low | Fulfills an existing Named Rule; ends every story with the load-bearing wall |
| Paper-tile texture on `.case-study` background | S | Low | Pure Do-list conformance; kills the only raw-flat-cream surfaces |
| 404 pencil-test doodle (single cel of the character at an empty desk) | S (art) | Low | Turns the best-written 404 into the best-drawn one |

## 6. What's strong — protect these

- **The dated layer is coherent and honest end-to-end** (now in ET everywhere): home June 10 + "indexer wrote 81 chunks at 02:14," About "updated 08:32 by daily driver," ledger honestly saying June 8 because nothing shipped since. The June-8-vs-June-10 difference is *proof of honesty* — do not "clean it up."
- **The Saturday-morning canon** (six cel-framed characters with PM lessons) and **the honest-note pattern** (the vault scorecard conceding two columns to Linear: "Linear is genuinely better here, and I'm not going to dress that up"). Unreplicable by template, unfakeable by claim.
- **Voice under pressure:** "Paused the game. Shipped the pipeline." · "The ship date was just the receipt." · "Filed, but it never ran." — comedic-confident without credibility cost.
- **The implementation's fidelity to its own constitution:** Z-map 0/10/11/12/20/30 implemented to the digit, two-font discipline airtight, tile border specs byte-exact, motion inside the Emil envelope with real reduced-motion fallbacks. Both reviewers independently concluded "art-directed, not AI-made."
- **Honest small numbers** (47 npm downloads, 12 verified installs) — the anti-hero-metric. They make everything else believable.

## 7. Dismissed findings (checked against decision records — don't re-flag)

| # | Apparent issue | Why cleared |
|---|---|---|
| D-1 | "Hero buries value prop / opacity 0" | Measured on fresh preview, overlay dismissed: dateline top 60, h1 top 154 @opacity 1, tagline top 361; mobile h1 177/tagline 395 — within fold both. Same false finding as 5/30. |
| D-2 | Em dashes in mono labels/ledger titles ("ROLE — pm + builder", "Discovery PRD — …") | Wire-service register + locked-title precedent (DESIGN.md §213). Zero *prose* em dashes — the 6/1 pass held; prebuild lint enforces it. |
| D-3 | `PRIOR ROLE` sixth status pill (reviewer A flagged) | Display alias for `ARCHIVED`, adjudicated CHANGELOG 2026-05-31 ×2; enum/validator/desaturation unchanged. |
| D-4 | Solid `--teal-deep` tile meta strip ≠ spec'd 15%-black multiply; A-6 rebuilt with frame+pill | Both adjudicated CHANGELOG 2026-05-31 design-critique fixes. |
| D-5 | `dist` CSS contains `#fff`/`bg-white`/`backdrop-blur` etc. | Dead Tailwind utilities, zero usages in any of 34 pages (and now eliminated at the source by `source("..")`). |
| D-6 | `B-n ·` kickers amber-mid on paper | Explicitly locked in about-spec §4 (rows 264/314). Left intact; the spec-vs-DESIGN.md conflict + the 5/30 P3-A "spec-code leak" question remain open for Sean. |
| D-7 | Architecture index dateline "JUNE 10" over a MAY 31 writeup; transactions index datelined JUNE 8 | Newsroom convention (today's dateline over dated content) per the 6/1 post-mortem; transactions' content-dated variant is honest "ledger last updated" semantics. Divergent *conventions* noted in P3-14's doc pass, not a bug. |
| D-8 | 404 console error | The 404 page returning HTTP 404 is correct behavior. |
| D-9 | "preloaded but not used" warning for paper-tile on case studies | The texture is used (CSS background); Chrome heuristic noise, further mitigated by fetchpriority. P2-09's missing texture on `.case-study` is the real story there. |
| D-10 | 18px footer links, `/contact/` no aria-current | Spacing exception passes; no CONTACT tab exists to mark current. Noted P3-18. |

## 8. Changes applied (file-by-file)

| File | Change |
|---|---|
| `src/pages/essays/[slug].astro` | P0-01: inline-4Q fallback gated on `essayBodyMarkdown` (kills double render) |
| `src/components/about/NowPulse.astro` · `case-study/ShippedNow.astro` | P1-02: timestamps in `America/New_York` |
| `src/components/case-study/ShippedStamp.astro` · `TitleBlock.astro` | P1-03: UTC-deterministic date formatting; P1-05: frame number → stamp amber |
| `src/components/projects/NextInProduction.astro` | P1-04: subtitle → `--amber-mid` |
| `src/components/case-study/NextPrevNav.astro` | P1-05: frame → stamp amber |
| `src/components/about/AboutHero.astro` | P1-06: lead `<p>` → `<h1>` |
| `src/components/architecture/TryItYourself.astro` | P1-07: custom Shiki theme on system palette |
| `src/components/architecture/IndexHeader.astro` · `essays/IndexHeader.astro` | P2-08: datelines via `BUILD_DATE_PRETTY` |
| `src/components/Cursor.astro` (new) · `Cursor.tsx` (removed) · `layouts/BaseLayout.astro` | P2-10: vanilla cursor, no React island; P2-12: `fetchpriority="high"` preload |
| `src/components/artifacts/MetricChart.astro` · `essays/QuadrantChart.astro` | P2-11: SVG `overflow: visible` |
| `src/components/case-study/MethodsStrip.astro` · `essays/RoleMap.astro` | P2-12: Props match schema (ts errors 4→0); dead negative-space link → `·` |
| `src/styles/global.css` | P2-12: `@import "tailwindcss" source("..")` |
| `src/components/hero/CharacterLane.astro` · `LoadingOverlay.astro` · `projects/ProjectsSection.astro` | P2-12: floor-shadow → WebP + img dimensions |
| `public/assets/textures/hero-floor-shadow.webp` (new) · `…png` (removed) | P2-12: 159KB → 77KB |
| `src/components/projects/ProjectTile.astro` · `chrome/SiteNav.astro` | P2-12: label-in-name fixes |
| `src/components/about/PullQuote.astro` · `home/AboutTeaser.astro` | P2-12: D8 lockstep quote; TODAY prefix → stamp amber |
| `src/content/config.ts` | P2-12: `explanations` collection declared |
| `.gitignore` | `.audit-scratch/` (audit workspace) |
| `CHANGELOG.md` | 6 entries (hero, projects-section, case-study, about, architecture, essays, site-chrome specs) |

**Verification:** every fix re-checked against its rendered symptom on a fresh build (grep of `dist/` + live preview DOM + screenshots); date fixes proven by building under both ET and UTC (`TZ=UTC`) with byte-identical date output; `npm run build` green (34 pages), `astro check` 0 errors, validators green, Lighthouse a11y 100 on all four measured routes. Nothing in `public/api/*.json` was touched. Nothing landed on `main`.

---

### App-A · Nielsen notes (reviewer A, pre-fix)
1 Visibility **4** (dated layer best-in-class) · 2 Real-world match **3** (TRANSACTIONS/ARCHITECTURE are private vocabulary, rescued by subheads) · 3 Control **3** · 4 Consistency **2** (duplicate essay, stale quote — both now fixed) · 5 Error prevention **4** · 6 Recognition **3** · 7 Flexibility **3** · 8 Aesthetic **3** (duplicate essay + idle case-study rail) · 9 Recovery **4** (404 in voice) · 10 Help **3** — **32/40**, with the two consistency draggers fixed expect ~35–36 on re-run.
