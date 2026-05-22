# Phase 3d Implementation Plan — `/about/` Surface

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (direct controller execution) to implement this plan task-by-task. **Do NOT dispatch via superpowers:subagent-driven-development** — Phase 2 / 2b / 3a / 3b / 3c.1 / 3c.2 all attempted subagent dispatch and all hit hallucinated context constraints in the implementer subagent. Direct controller execution worked. Re-attempt subagents only if the harness has demonstrably improved since Phase 3c.2. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the `/about/` surface — Sean's human-self page — per [`about-spec-v1.md`](../../specs/about-spec-v1.md) §17 Definition of Done, honoring the v1 decorative deferrals declared in spec §1.2. The page composes the 10-band anatomy from spec §2 (dateline → lead-line + character hero → daily-dated pulse strip → B-1 stacked beats with lane-tint rule → B-2 comprehension thesis → B-3 Saturday morning canon (6 cartoon cels with `break_grid` on Samurai Jack) → B-4 direction-of-craft + `CURRENTLY @` stamp + conditional recruiter italic → B-5 proof points → pull quote → page closeout). The `lead:` field at `src/content/about/index.mdx` is byte-locked to PMP §4 row 2 (`"Raised by Saturday morning cartoons and Vercel deployment logs."`) via a new prebuild gate `scripts/validate_about.mjs`. Build fails on lead-line drift.

**Architecture:** Two new Astro 5 content collections (`about` of type `content` with one entry, `cartoons` of type `content` with six entries) + a new `src/pages/about.astro` single-page route + 13 about-scope components under `src/components/about/` + a 4th prebuild gate (`validate_about.mjs`) wired into `npm run prebuild` after the existing three Phase 3b/3c gates. The B-1 lane-tint rule is rendered as inline `<svg><line>` per beat (NOT `border-left`) so the per-beat color (animator `#FAC775` / PM `#0A3E42` / braided amber→teal `linearGradient`) declares lineage chromatically per spec §9.2.1. The 6 cartoon cels read from `getCollection("cartoons").sort(order)`; Cel 4 (Samurai Jack) sets `break_grid: true` per spec §11.3.1, rendering at 1.2× scale + spanning two grid columns on desktop with the surrounding cels reflowing around it. The daily-dated pulse strip reads the already-populated `/public/api/about-pulse.json` (Daily Driver writes 08:45 daily per spec §8; v1 ships the build-time render reading the static file; Phase 4 wires the producer). The B-4 employment-state aging contract (§12.2) is implemented as two frontmatter fields (`available: boolean`, `current_company: string | null`) driving conditional component visibility — zero prose edits when Sean's hired.

**Tech Stack:** Astro 5 + Tailwind 4 (Phase 2), `@astrojs/mdx` (Phase 2 — the about MDX uses `.mdx` for the B-2 thesis + B-4 building-toward prose bodies), Node 20 for the prebuild script, vanilla CSS for all styling (no new dependencies). No React. No animation library — the B-1 lane-rule reveal uses the same SVG `stroke-dasharray` primitive case-study + architecture already use; the cartoon-cel stagger uses pure CSS keyframes triggered by IntersectionObserver per spec §6.

**Scope:** Matches [`about-spec-v1.md`](../../specs/about-spec-v1.md) §§2-17, with the v1 launch shape per §1.2.

- **IN:** about content collection schema + cartoons content collection schema (Task 1.1); `scripts/validate_about.mjs` prebuild gate enforcing the byte-locked `lead:` field (Task 2.1) + wiring into `npm run prebuild` (Task 2.2); asset move from `reference-images/about-cartoons/` + `reference-images/about-full-body.png` into `public/assets/cartoons/` + `public/assets/character/about-full-body.png` (Task 3.1); 13 about-scope components organized into 5 component-tasks (B-1: `<Beats />` + `<BeatRow />` + `<LaneRule />`; B-3: `<CartoonCanon />` + `<CartoonCel />`; hero band: `<AboutHero />` + `<NowPulse />`; B-4: `<CurrentlyAtStamp />` + `<RecruiterCallout />` + `<BuildingToward />`; closeout: `<ProofPoints />` + `<PullQuote />`); 6 cartoon MDX entries from the locked draft at [`reference-images/about-cartoons/cartoons-content-collection-draft.md`](../../../reference-images/about-cartoons/cartoons-content-collection-draft.md) (Task 8.1); the singleton `src/content/about/index.mdx` with byte-locked `lead:` + 7-beat braided timeline + B-2 thesis prose + B-4 building-toward prose (Task 8.2); `src/pages/about.astro` assembling the 10-band page (Task 9.1); smoke + DoD walkthrough against spec §17 items 1-15 (Section 10).
- **OUT (deferred to v2 per about-spec §1.2):** Five hand-drawn `b1` / `b2` / `b3` / `b4` / `b5` heading SVGs — v1 ships plain Newsreader `<h2>` at ~48px tall, weight 400, primary teal `#0A3E42`, left-aligned, with the same `aria-label` per spec §1.2 substitution row; handwritten signature SVG at page foot — v1 closes at the pull quote, the torn-paper edge into chrome footer is the page closeout; registration marks (page closeout bottom-right + B-1 beat-column corner marks) — omitted; **all pencil-margin annotations** (§14's 7-vocabulary system: curved arrows, coffee-ring, the "this one rewires you" B-3 arrow, the "the live evidence" rev scribble on `/transactions/`, mono stamps, kid's drawing scan) — omitted entirely for v1; **one exception preserved:** Cel 4's `break_grid: true` geometry (§11.3.1) stays because it's grid layout, not annotation. Spec §17 DoD items #10 + #11 are explicitly deferred per §1.2; #12 documents the plain-Newsreader-heading substitution as their v1 visual equivalent.
- **OUT (Sean authors post-plan):** The canonical B-1 beats list beyond the 7 starter beats this plan ships (Sean iterates on prose during the build session per OPEN-2 default); the canonical B-2 thesis prose body beyond a placeholder Sedaris-coded opener carrying `[PLACEHOLDER — Sean rewrites]` for grep-ability; the canonical B-4 "WHAT I'M BUILDING TOWARD" prose body beyond a placeholder direction-of-craft opener carrying the same marker. **One Sedaris-mode bookend lands real prose:** the B-2 thesis opening paragraph is authored to production quality per the writing-voice-modes skill's Sedaris calibration, so a recruiter cold-read at v1-launch already has a working voice register. Placeholders for the rest are grep-discoverable.
- **OUT (Phase 4):** Daily Driver agent writing the producer side of `/api/about-pulse.json` — v1 ships the build-time render reading the already-populated static JSON committed at `public/api/about-pulse.json`; Plausible analytics; Vercel deploy; custom-domain DNS; hard cutover from V3 bridge.
- **OUT entirely (v2):** Re-attempting subagent dispatch (direct controller execution remains the posture); cross-surface View Transition morphs (about → home, about → essays); a separate `/about/print.html` route (v1 ships a `@media print` block in `src/styles/about.css` that re-renders the same DOM single-column with link URLs printed per spec §16's print stylesheet line); year/timeline filters; OG image auto-generation via satori; expanding the `beats[]` count above 8.

**Open Question resolutions (locked at planning time):**

| OQ | Decision | Why |
|---|---|---|
| **OQ-A — Cartoon assets via `public/` (raw) or `src/assets/` (Astro `astro:assets` pipeline)?** | **Ship via `public/assets/cartoons/`** (no Astro `astro:assets` transform). | About-spec §11.6 explicitly accepts either path. The `public/` route ships the PNG raw with no transform pipeline overhead, mirrors how `public/assets/character/about-full-body.png` is served (referenced from the about-spec §7.3 hero composition), and keeps the cartoon-content-collection-draft.md `image: /assets/cartoons/0N-<slug>.png` paths working as-authored — zero edits required. Astro `astro:assets` would gain content-hashed filenames + width/height inference, but the 6 PNGs are 280×320 pencil-test studies authored at exactly that size; there's no responsive-srcset story to derive. The cartoon-content-collection-draft notes "If Phase 2 build chooses to keep them in `public/assets/cartoons/` instead (no transform), the paths still work as-is" — choose that path. |
| **OQ-B — Plain Newsreader `<h2>` styling for the 5 B-N section headings (v1.2 substitution per spec §1.2)?** | **48px tall, Newsreader weight 400, primary teal `#0A3E42`, tracking -0.2px, left-aligned, with `aria-label="B-N · …"` mirroring the hand-drawn SVG's intended accessible name.** | Spec §1.2 substitution row defines the v1 stand-in; specifies "same ~48px tall, weight 400, primary teal `#0A3E42`, left-aligned. Same `<h2>` semantic + `aria-label` accessibility." Apply those defaults literally — no decorative chrome. The frame-number prefix (`B-1 ·`) renders inline via a small JetBrains Mono `<span>` per spec §4 type table row "Section frame number prefix (`B-1 ·`)" — that styling is independent of the heading SVG and remains. |
| **OQ-C — Where does the v1 page DOM end before the torn-paper bottom edge?** | **At the pull quote.** No signature SVG, no registration mark. Spec §1.2 explicitly defers both; spec §17 DoD #11's deferral row reads "Page closes at the pull quote; the pull-quote-to-footer torn-paper edge becomes the page closeout." The torn-paper bottom edge from the texture-spec already transitions into the site-chrome footer (where Contact lives) per BaseLayout's universal footer composition. | Per spec §1.2 + spec §17 DoD #11. Reverses zero state — when the signature SVG ships in v1.1, it inserts between `<PullQuote />` and the closing torn-paper edge. |
| **OQ-D — `validate_about.mjs` as standalone script or merge into `scripts/validate_content.mjs`?** | **Standalone script.** Wire into `prebuild` after the existing three (`validate_content.mjs` → `fetch_canonical_sources.mjs` → `derive_crosslinks.mjs` → `validate_about.mjs`). | Spec §16 build-stack row "Lead-line validator" names the script `scripts/validate_about.mjs` explicitly. It enforces one rule (lead-line byte-match) on one MDX file (`src/content/about/index.mdx`) — too small to need the COLLECTIONS-driven structure of `validate_content.mjs` + cleaner to keep the about gate readable as ~25 lines than merge a special-case branch into the unified validator. Pattern matches Phase 3b's `validate_content.mjs` independence from the migration script. |

**Branch state:** `phase-2-foundations` at HEAD `f216926` (the most recent tip — Phase 3c.2 completion commit was `8571df4`, followed by chore commit `f216926` which archived superseded cartoon backups + added Phase 2b preview captures; the chore is non-substantive). PR #7 already merged the branch into `main` at merge commit `207ebe1`, but `phase-2-foundations` still tracks accumulating work. **Continue on `phase-2-foundations`** — Sean's standing rule per the kickoff prompt: "Stay on branch `phase-2-foundations`. Do NOT push. Cutover to main is Phase 4." After Phase 3d ships, `phase-2-foundations` will be one PR behind `main` (the Phase 3d commits); Phase 4's planning session resolves the cutover. Each task in this plan commits atomically; ~17-19 incremental commits total.

**Operating posture (direct controller execution):** Run each task in order. After each commit, verify the next task's preconditions are still true (e.g., dev server still serving 200 on existing routes, `npm run validate` still passes, `npm run prebuild` still exits 0). Surface BLOCKED status only if genuinely stuck (real error in build log, route returning non-2xx that should be 200). Don't pause between routine tasks — Sean signed off on continuous execution.

**Lessons folded in from Phase 3c.1 + 3c.2 execution:**

- **MDX gotcha #1 — bare uppercase tags break the parser.** Every `<ComponentName />` in placeholder prose MUST be wrapped in backticks. Astro's MDX parser reads bare `<UppercaseTag />` as a JSX component reference and fails the build with `Expected component X to be defined`. Phase 3c.1's `intent-engineering-mcp` Q4 prose hit this; Phase 3c.2 forced backticks throughout (commit 07a8cf1). Apply the rule strictly to: B-1 beat body strings, the B-2 thesis prose, the B-4 building-toward prose, every cartoon cel's `lesson_body`, and any string in `src/content/about/index.mdx` body. If you write `the <Beats /> component renders…` in the MDX body, the build fails. Backtick it: `` the `<Beats />` component renders ``.
- **MDX gotcha #2 — TypeScript type annotations inside JSX-shaped map blocks confuse the Astro compiler.** Phase 3c.2's `PlottedArtifacts.astro` hit this: the pattern `const links: Array<{ href: string; tag: string }> = []` *inside* a `{rendered.map((entry) => { … })}` block tripped the Astro compiler's Fragment shorthand parser. The fix landed mid-execution by dropping the explicit type annotation — TypeScript infers the array type from the first `.push()` call. **In every about component this plan ships:** when an array is built up inside a `.map()` or render-time block, write `const links = [];` (not `const links: Array<{ href: string; tag: string }> = [];`). If type annotations are useful for documentation, declare an interface and type-assert at the use site (`return links as LinkRow[]`); never put `Array<{...}>` syntax inside a JSX expression block.
- **Dev server caches content collections.** When a new MDX lands in `src/content/about/` or `src/content/cartoons/`, `astro sync` alone isn't enough — the dev server's vite cache holds the old `getCollection()` result. Between Task 8.x (content collection authoring) and the Section 10 smoke tests, **kill the dev server and re-run `npm run dev`**, OR rely on the production build (`npm run build`) for end-to-end smoke as Phase 3c.1 / 3c.2's verification tasks did.
- **Pulse strip already has its static fallback.** `public/api/about-pulse.json` is **already committed** (verified pre-plan; structure matches spec §8.1 exactly, no `dog_walks` item type). The build-time render reads it via Node's `fs.readFileSync` at `<NowPulse />` server-render time — no fetch round-trip, no client-side hydration. Phase 4 wires the Daily Driver to *write* the file at 08:45 daily; v1 ships the read-side only with the static snapshot.
- **No `astro-mermaid` needed on `/about/`.** The page has no `erDiagram` or `quadrantChart`. The `astro-mermaid` integration installed in Phase 3c.2 stays installed — it's a no-op for this page. No `astro.config.mjs` edits in this phase.

---

## File Structure

Files this plan creates or modifies, organized by responsibility:

```
sw-ai-pm-portfolio/
├── package.json                                          ← Task 2.2: extend `prebuild` to invoke validate_about.mjs
├── .gitignore                                            ← unchanged in 3d (no new derived artifacts)
│
├── scripts/
│   └── validate_about.mjs                                ← Task 2.1: NEW — byte-match lead: against PMP §4 row 2
│
├── public/
│   ├── api/
│   │   └── about-pulse.json                              ← UNCHANGED — already committed pre-plan with the §8.1 schema
│   └── assets/
│       ├── cartoons/                                     ← Task 3.1: NEW folder — 6 cartoon PNG studies
│       │   ├── 01-tommy-pickles.png
│       │   ├── 02-ash-ketchum.png
│       │   ├── 03-rocko.png
│       │   ├── 04-samurai-jack.png
│       │   ├── 05-uncle-iroh.png
│       │   └── 06-jake.png
│       └── character/
│           └── about-full-body.png                       ← Task 3.1: copied from reference-images/about-full-body.png
│
├── src/
│   ├── content/
│   │   ├── config.ts                                     ← Task 1.1: add about + cartoons collections
│   │   ├── about/                                        ← NEW folder
│   │   │   └── index.mdx                                 ← Task 8.2: lead + frontmatter + B-2 thesis + B-4 building-toward
│   │   └── cartoons/                                     ← NEW folder
│   │       ├── 01-tommy-pickles.md                       ← Task 8.1
│   │       ├── 02-ash-ketchum.md                         ← Task 8.1
│   │       ├── 03-rocko.md                               ← Task 8.1
│   │       ├── 04-samurai-jack.md                        ← Task 8.1 (break_grid: true)
│   │       ├── 05-uncle-iroh.md                          ← Task 8.1
│   │       └── 06-jake.md                                ← Task 8.1
│   │
│   ├── components/
│   │   └── about/                                        ← NEW folder
│   │       ├── AboutHero.astro                           ← Task 5.1: lead-line + character PNG, 2-column
│   │       ├── NowPulse.astro                            ← Task 5.2: reads /api/about-pulse.json at build
│   │       ├── LaneRule.astro                            ← Task 4.1: SVG <line> with stroke-dasharray reveal
│   │       ├── BeatRow.astro                             ← Task 4.1: date line + body + lane rule
│   │       ├── Beats.astro                               ← Task 4.1: reads beats[] from frontmatter
│   │       ├── CartoonCel.astro                          ← Task 6.1: registration peg + study + name strip + caption
│   │       ├── CartoonCanon.astro                        ← Task 6.1: 3×2 grid; reads getCollection("cartoons")
│   │       ├── CurrentlyAtStamp.astro                    ← Task 7.1: top-right mono stamp
│   │       ├── RecruiterCallout.astro                    ← Task 7.1: conditional italic; visible when available: true
│   │       ├── BuildingToward.astro                      ← Task 7.1: WHAT I'M BUILDING TOWARD heading + slot
│   │       ├── ProofPoints.astro                         ← Task 7.2: 4 mono links
│   │       └── PullQuote.astro                           ← Task 7.2: closing serif italic, paper-strip background
│   │
│   ├── pages/
│   │   └── about.astro                                   ← Task 9.1: NEW — 10-band page assembly
│   │
│   └── styles/
│       └── about.css                                     ← Task 9.1: scoped print stylesheet + page-level layout polish
│
└── docs/superpowers/plans/
    └── 2026-05-22-phase-3d-about-page.md                 ← this file
```

The `about/` + `cartoons/` folders are new under `src/content/`, `src/components/`, and `src/pages/`. Mirrors the Phase 3c.1 `transactions/` split + Phase 3c.2 `architecture/` + `essays/` split.

**No routing collision.** `/about/` is a single static route (`src/pages/about.astro`). No `[slug].astro` dynamic route under `/about/`; the page is a singleton MDX consumed via `getCollection("about")[0]`. No `forbiddenSlugs` entries on either new collection.

**No `[OPEN-N]` items remain after the OQ-A through OQ-D resolutions above.** Spec §18 OPEN-1 (character composition — Sean alone) is the spec default and matches the already-authored `reference-images/about-full-body.png`. OPEN-2 (beat content — 6-8 beats with ≥2 braided) lands as 7 beats with 4 braided in Task 8.2's MDX frontmatter; Sean refines prose post-plan. OPEN-3 + OPEN-4 (cartoon canon + authorship) are resolved per spec §11.2 (Bugs Bunny rejected in favor of Iroh; all 6 generated via Gemini Nano Banana 2 Approach B). OPEN-5 (V3 strikethrough artifact) is the spec default (no). OPEN-6 (hand-drawn heading SVG authorship — Path A/B/C) is *moot in v1* because §1.2 defers all 5 heading SVGs; revisit in v1.1.

---

## Section 0 — Pre-flight

### Task 0.1: Verify Phase 3c.2 baseline + clean working tree + branch state

**Files:**
- Read-only verification

- [ ] **Step 1: Confirm we're on `phase-2-foundations` (or switch to it)**

Run: `git branch --show-current`

Expected: `phase-2-foundations`. If output is `main`, run: `git checkout phase-2-foundations` then re-run `git branch --show-current` to confirm.

- [ ] **Step 2: Verify HEAD + working tree state**

Run: `git rev-parse HEAD && git status --porcelain`

Expected: HEAD is `f216926` (the chore archive commit) or later; `git status --porcelain` returns no output. If the working tree has uncommitted changes from a prior session, surface them to the user before starting — do not stash or discard without confirmation.

- [ ] **Step 3: Verify Phase 3c.2 artifacts are in place**

Run in parallel (5 reads):
- `ls src/content/architecture/*.mdx | wc -l` → expected `1`
- `ls src/content/essays/*.mdx | wc -l` → expected `1`
- `ls src/content/transactions/*.mdx | wc -l` → expected `3`
- `ls src/pages/architecture/index.astro src/pages/essays/index.astro src/pages/transactions/index.astro src/pages/contact.astro src/pages/404.astro src/pages/index.astro`
- `ls scripts/validate_content.mjs scripts/fetch_canonical_sources.mjs scripts/derive_crosslinks.mjs`

Expected: all paths exist; transactions has 3 entries; architecture + essays each have 1 placeholder entry.

- [ ] **Step 4: Verify the about-spec assets are in `reference-images/` ready to copy**

Run in parallel (3 reads):
- `ls reference-images/about-cartoons/0*.png | wc -l` → expected `6`
- `ls reference-images/about-full-body.png`
- `ls reference-images/about-cartoons/cartoons-content-collection-draft.md`

Expected: 6 cartoon PNGs (`01-tommy-pickles.png` through `06-jake.png`), the full-body character PNG, and the locked content-collection draft are all present.

- [ ] **Step 5: Verify the daily-dated pulse strip's static fallback is committed**

Run: `cat public/api/about-pulse.json | head -2`

Expected: valid JSON with a `"date_iso":` key. The file is already committed at this branch tip (per the Phase 3c.2 file inventory check). Phase 3d's `<NowPulse />` reads this file at build; Phase 4 wires the Daily Driver to *write* it daily.

- [ ] **Step 6: Verify prebuild gates pass on existing state**

Run: `npm run prebuild`

Expected: all three current scripts exit 0 (validator prints `done.` with `✓ ...` lines; fetch_canonical prints `done.` with no actual fetches in v1; derive_crosslinks prints `done. validated N cross-links`). If any gate fails, stop and fix the regression before continuing — Phase 3d builds on a green Phase 3c.2 baseline.

- [ ] **Step 7: Start dev server in background**

Confirm a dev server is running: `curl -sI http://localhost:4321/ | head -1` → `HTTP/1.1 200 OK`. If not running, start it: `npm run dev` (background terminal). The Phase 3d tasks reference it for smoke checks.

- [ ] **Step 8: No commit**

Verification only.

---

## Section 1 — Content collection schemas

The about + cartoons collections land in `src/content/config.ts` alongside the existing `work` + `teaserDeck` + `transactions` + `architecture` + `essays` collections. Both schemas mirror about-spec Appendix B (about) + about-spec §11.6 (cartoons) field names exactly.

### Task 1.1: Extend `src/content/config.ts` with `about` + `cartoons` collections

**Files:**
- Modify: `src/content/config.ts`

Per about-spec Appendix B + §11.6.

- [ ] **Step 1: Read existing config**

Run: `wc -l src/content/config.ts`

Expected: 250 lines (the 5-collection state Phase 3c.2 closed at). Confirm before editing — the edit appends two new collection definitions plus extends the final `export const collections = {…}` line, without touching the existing five collection blocks.

- [ ] **Step 2: Insert the two new collection blocks before the final `export` line**

Open `src/content/config.ts`. Find the line:

```ts
export const collections = { work, teaserDeck, transactions, architecture, essays };
```

Insert immediately above that final line (after the existing `essays` collection's closing `});`):

```ts
// ============================================================
// Phase 3d — about + cartoons collections
// Source: about-spec-v1.md Appendix B (about) + §11.6 (cartoons).
// `about` is a singleton — exactly one entry at src/content/about/index.mdx.
// `cartoons` is a 6-entry collection consumed by <CartoonCanon />.
// ============================================================

const LANE_ENUM = ["animator", "pm", "braided"] as const;

const aboutBeat = z.object({
  age: z.number().int().min(0).max(100),
  year: z.number().int().min(1900).max(2100),
  body: z.string().min(1),
  lane: z.enum(LANE_ENUM),
});

const about = defineCollection({
  type: "content",
  schema: z.object({
    // --- Lead (locked, byte-validated against PMP §4 row 2 by scripts/validate_about.mjs) ---
    lead: z.string().min(1),

    // --- Meta ---
    slug: z.string(),
    title: z.string(),
    description: z.string(),
    reading_time: z.number().int().min(1).max(60),

    // --- Proof-point URLs (B-5) ---
    linkedin_url: z.string().url(),
    github_url: z.string().url(),
    transactions_url: z.string(),                            // internal route — not URL-validated
    resume_url: z.string(),                                  // internal route — not URL-validated

    // --- Employment state (drives B-4) ---
    available: z.boolean(),
    current_company: z.string().nullable(),

    // --- Character (hero band) ---
    character_image: z.string(),
    character_alt: z.string(),

    // --- B-1 stacked beats (6-8 entries; validator-side rule: ≥2 lane: braided) ---
    beats: z.array(aboutBeat).min(6).max(8),

    // --- B-3 annotation hook (deferred to v2 per spec §1.2; field retained for v1.1) ---
    b3_load_bearing_cel: z.number().int().min(1).max(6),
  }),
});

const cartoons = defineCollection({
  type: "content",
  schema: z.object({
    order: z.number().int().min(1).max(6),
    name: z.string(),
    year_range: z.string(),
    studio: z.string(),
    image: z.string(),
    image_alt: z.string(),
    lesson_noun: z.string(),
    lesson_body: z.string(),
    angle: z.number().min(-1.5).max(1.5).optional(),
    break_grid: z.boolean().default(false),
  }),
});
```

Then update the final `export` line to include both new collections. Replace:

```ts
export const collections = { work, teaserDeck, transactions, architecture, essays };
```

With:

```ts
export const collections = { work, teaserDeck, transactions, architecture, essays, about, cartoons };
```

- [ ] **Step 3: Verify Astro accepts the schema**

Run: `npx astro sync`

Expected: exits 0 with no schema errors. The two new collections are now registered but empty (folders don't exist yet); `getCollection("about")` + `getCollection("cartoons")` will return empty arrays until Tasks 8.1 + 8.2 land MDX files.

- [ ] **Step 4: Verify the dev server reloads cleanly**

Run: `curl -sI http://localhost:4321/ | head -1`

Expected: `HTTP/1.1 200 OK`. If the dev server is throwing a schema-parse error in the terminal where `npm run dev` runs, the edit introduced bad TypeScript — re-read Step 2 + the existing config, restore from git if needed, retry.

- [ ] **Step 5: Commit**

```bash
git add src/content/config.ts
git commit -m "$(cat <<'EOF'
feat(phase-3d): about + cartoons content collection schemas

Adds two new Astro content collections per about-spec Appendix B +
§11.6:

  - `about` (singleton, type: content) — one entry at
    src/content/about/index.mdx with the byte-locked `lead:`
    field, 6-8 `beats[]` (B-1 stacked-beats data), employment-state
    fields (available + current_company), and the B-5 proof-point
    URLs.

  - `cartoons` (6 entries, type: content) — one entry per cel in
    the §11.2 locked canon. Frontmatter carries `order`, `name`,
    `year_range`, `studio`, `image`, `image_alt`, `lesson_noun`,
    `lesson_body`, optional `angle` (±1.5°), and `break_grid`
    (the §11.3.1 geometry trigger — only Samurai Jack sets true).

The beat lane enum (`animator | pm | braided`) declares the §9
chromatic lane-tint rule's three states; `<LaneRule />` reads
`lane` to pick the SVG stroke (amber solid / teal solid / amber→teal
linearGradient). At least 2 of the 6-8 beats must declare
`lane: braided` per spec §9.3 ("Rule for the writer") — that
constraint is enforced by scripts/validate_about.mjs in Task 2.1,
not by Zod (Zod can't express min-count-with-predicate cleanly).

The `b3_load_bearing_cel` field is retained per Appendix B even
though v1 defers the §11.7 annotation arrow per spec §1.2 — the
field activates the arrow in v1.1 without a schema migration.

Per about-spec Appendix B + §11.6 + BLUEPRINT §3.3 + §6 Phase 3
build sequence row "About page".
EOF
)"
```

---

## Section 2 — Prebuild gate: byte-locked lead-line validator

The about-spec's load-bearing constraint is the byte-identical match between `src/content/about/index.mdx` frontmatter `lead:` and PMP §4 row 2's locked string. Spec §17 DoD #2 makes this a build-fails-on-drift gate. Task 2.1 lands the script; Task 2.2 wires it into `npm run prebuild`.

### Task 2.1: Write `scripts/validate_about.mjs`

**Files:**
- Create: `scripts/validate_about.mjs`

Per about-spec §16 + §17 #2.

- [ ] **Step 1: Write the validator script**

Create `scripts/validate_about.mjs` with the following content:

```js
#!/usr/bin/env node
/**
 * scripts/validate_about.mjs — about-page lead-line + beat-lane gate.
 *
 * Phase 3d scope. Two assertions:
 *
 *   1. The `lead:` frontmatter field on src/content/about/index.mdx
 *      matches the locked PMP §4 row 2 string BYTE-FOR-BYTE. Build
 *      fails on drift. Per about-spec §16 + §17 DoD #2.
 *
 *   2. The `beats[]` frontmatter array contains at least 2 entries
 *      with `lane: braided`. Per about-spec §9.3 ("Rule for the
 *      writer"). Zod can't express min-count-with-predicate cleanly,
 *      so the check lives here.
 *
 * Both failures exit 1; the npm prebuild chain aborts.
 *
 * Source: about-spec-v1.md §16 (build stack) + §17 DoD #2 + §9.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ABOUT_MDX = path.join(ROOT, "src/content/about/index.mdx");

const LOCKED_LEAD = "Raised by Saturday morning cartoons and Vercel deployment logs.";

async function readAboutMdx() {
  try {
    return await fs.readFile(ABOUT_MDX, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`❌ ${path.relative(ROOT, ABOUT_MDX)} not found.`);
      console.error("   Phase 3d Task 8.2 lands this file. Re-run validation after Task 8.2.");
      process.exit(1);
    }
    throw err;
  }
}

function extractFrontmatter(mdx) {
  const match = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    console.error(`❌ ${path.relative(ROOT, ABOUT_MDX)} has no YAML frontmatter block.`);
    process.exit(1);
  }
  return match[1];
}

function extractLead(frontmatter) {
  // Match `lead: "…"` or `lead: '…'`; per about-spec the value is a
  // double-quoted string. Single-line only — multi-line YAML scalars
  // are rejected here as a side-effect (the locked string fits on
  // one line).
  const dq = frontmatter.match(/^lead:\s*"([^"]*)"\s*$/m);
  const sq = frontmatter.match(/^lead:\s*'([^']*)'\s*$/m);
  if (dq) return dq[1];
  if (sq) return sq[1];
  console.error(`❌ lead: field missing or not a single-line quoted string in ${path.relative(ROOT, ABOUT_MDX)}.`);
  console.error("   Expected format: lead: \"…\"");
  process.exit(1);
}

function extractBeatsLanes(frontmatter) {
  // Count `lane: braided` occurrences within the beats: array. Cheap
  // string scan — we don't need a full YAML parser for one rule.
  // The beats[] section ends at the next top-level frontmatter key
  // (e.g., `b3_load_bearing_cel:`). Bound the search loosely.
  const beatsStart = frontmatter.indexOf("\nbeats:");
  if (beatsStart === -1) {
    console.error(`❌ beats: field missing in ${path.relative(ROOT, ABOUT_MDX)}.`);
    process.exit(1);
  }
  const beatsBody = frontmatter.slice(beatsStart);
  const braidedMatches = beatsBody.match(/lane:\s*braided/g) || [];
  return braidedMatches.length;
}

async function main() {
  const mdx = await readAboutMdx();
  const frontmatter = extractFrontmatter(mdx);

  // Assertion 1 — lead-line byte-match
  const lead = extractLead(frontmatter);
  if (lead !== LOCKED_LEAD) {
    console.error(`❌ about-page lead-line drift detected.`);
    console.error(`   Expected: ${JSON.stringify(LOCKED_LEAD)}`);
    console.error(`   Got:      ${JSON.stringify(lead)}`);
    console.error("   PMP §4 row 2 is the source of truth; edit src/content/about/index.mdx to match,");
    console.error("   OR update PMP §4 + this script's LOCKED_LEAD constant in lockstep.");
    process.exit(1);
  }

  // Assertion 2 — ≥2 braided beats
  const braidedCount = extractBeatsLanes(frontmatter);
  if (braidedCount < 2) {
    console.error(`❌ about-page B-1 braided-beat count too low.`);
    console.error(`   Found ${braidedCount} entries with lane: braided in beats[].`);
    console.error("   Spec §9.3 requires at least 2: braided beats are the load-bearing");
    console.error("   evidence for the parallel-lineage thesis. Re-author beats[] in");
    console.error("   src/content/about/index.mdx to include ≥2 braided entries.");
    process.exit(1);
  }

  console.log(`✓ about: lead-line matches PMP §4 row 2 byte-for-byte`);
  console.log(`✓ about: ${braidedCount} braided beats in beats[] (≥2 required)`);
  console.log("done.");
}

main().catch((err) => {
  console.error("❌ validate_about.mjs failed unexpectedly:", err);
  process.exit(1);
});
```

- [ ] **Step 2: Verify the script runs (will fail expectedly on missing MDX)**

Run: `node scripts/validate_about.mjs`

Expected (BEFORE Task 8.2 lands the MDX): exits 1 with the `ENOENT` branch message — `❌ src/content/about/index.mdx not found. Phase 3d Task 8.2 lands this file.` This is the correct pre-Task-8.2 behavior; it confirms the script's error handling works.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate_about.mjs
git commit -m "$(cat <<'EOF'
feat(phase-3d): validate_about.mjs — lead-line + braided-beat gate

New prebuild script per about-spec §16 + §17 DoD #2 + §9.3.

Two assertions:

  1. The `lead:` frontmatter field on src/content/about/index.mdx
     matches PMP §4 row 2's locked string BYTE-FOR-BYTE:
       "Raised by Saturday morning cartoons and Vercel deployment logs."
     If Sean (or anyone) edits the lead, the build fails. PMP §4 is
     the source of truth; the script's LOCKED_LEAD constant tracks
     it. Updating one without the other is the failure mode this
     gate catches.

  2. The `beats[]` frontmatter array contains at least 2 entries
     with `lane: braided`. Spec §9.3: "at least 2 of the 6-8 beats
     should be braided. They're the proof. If every beat is
     animator-only or PM-only, the parallel-lineage thesis collapses
     into 'I had two hobbies.' Braided beats are what makes it
     lineage." Zod can't express min-count-with-predicate so the
     check lives in the validator.

The current src/content/about/index.mdx doesn't exist yet (Task 8.2
lands it). Running the script now exits 1 with the ENOENT branch —
expected pre-Task-8.2 state, confirms error handling works.

Task 2.2 wires the script into `npm run prebuild`.

Per about-spec §16 + §17 DoD #2 + §9.3.
EOF
)"
```

### Task 2.2: Wire `validate_about.mjs` into `npm run prebuild`

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Read the current prebuild script**

Run: `grep '"prebuild"' package.json`

Expected: `"prebuild": "node scripts/validate_content.mjs && node scripts/fetch_canonical_sources.mjs && node scripts/derive_crosslinks.mjs",`

- [ ] **Step 2: Extend the prebuild chain**

Edit `package.json`. Replace the prebuild line:

```json
"prebuild": "node scripts/validate_content.mjs && node scripts/fetch_canonical_sources.mjs && node scripts/derive_crosslinks.mjs",
```

With:

```json
"prebuild": "node scripts/validate_content.mjs && node scripts/fetch_canonical_sources.mjs && node scripts/derive_crosslinks.mjs && node scripts/validate_about.mjs",
```

Also add a convenience script. Inside the `"scripts"` block, after the existing `"derive-crosslinks":` line, add:

```json
"validate-about": "node scripts/validate_about.mjs",
```

- [ ] **Step 3: Verify the new prebuild chain fails at the right step (pre-Task-8.2)**

Run: `npm run prebuild`

Expected: the first three scripts pass, then `validate_about.mjs` exits 1 with the `ENOENT` branch. The overall command exits non-zero — that's correct. After Task 8.2 lands the MDX, this will pass.

If the first three scripts also fail, the regression is unrelated to this task — investigate before continuing.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "$(cat <<'EOF'
feat(phase-3d): wire validate_about.mjs into npm run prebuild

Extends the prebuild chain to invoke the new validate_about.mjs
gate after the existing three (validate_content → fetch_canonical
→ derive_crosslinks → validate_about).

Adds a "validate-about" convenience script for running the gate
in isolation during authoring (parallels validate / fetch-canonical
/ derive-crosslinks).

The prebuild chain currently exits 1 at the new gate because Task 8.2
hasn't landed src/content/about/index.mdx yet — expected state until
Task 8.2 completes, at which point the chain returns to all-green.

Per about-spec §16 + §17 DoD #2.
EOF
)"
```

---

## Section 3 — Asset prep: move authored PNGs into `public/`

Sean already authored the 6 cartoon PNGs + the full-body character per spec §11 + §7.3. They live in `reference-images/` per Phase 0's asset-authoring discipline; Phase 2's scaffold convention moves authored assets into `public/assets/` at scaffold time. Phase 3d does that move for the remaining about assets (the hero WebM, hero icons, OG cards, favicons, paper texture, and 9-card teaser deck moved in Phase 2 / 2b).

### Task 3.1: Copy cartoon PNGs + full-body character into `public/`

**Files:**
- Copy: `reference-images/about-cartoons/0{1,2,3,4,5,6}-*.png` → `public/assets/cartoons/`
- Copy: `reference-images/about-full-body.png` → `public/assets/character/about-full-body.png`

- [ ] **Step 1: Confirm the target directories don't already exist**

Run in parallel:
- `ls public/assets/cartoons/ 2>&1`
- `ls public/assets/character/about-full-body.png 2>&1`

Expected: both return "No such file or directory" or equivalent. (The `public/assets/character/` directory already exists for the hero loop assets — verify with `ls public/assets/character/` showing `hero-loop.webm` + frame-1 + frame-2 — but `about-full-body.png` is not yet in it.)

- [ ] **Step 2: Create `public/assets/cartoons/` and copy the 6 cartoon PNGs**

Run:

```bash
mkdir -p public/assets/cartoons && cp reference-images/about-cartoons/01-tommy-pickles.png reference-images/about-cartoons/02-ash-ketchum.png reference-images/about-cartoons/03-rocko.png reference-images/about-cartoons/04-samurai-jack.png reference-images/about-cartoons/05-uncle-iroh.png reference-images/about-cartoons/06-jake.png public/assets/cartoons/
```

- [ ] **Step 3: Copy the full-body character PNG**

Run: `cp reference-images/about-full-body.png public/assets/character/about-full-body.png`

- [ ] **Step 4: Verify all 7 files landed**

Run: `ls -la public/assets/cartoons/ public/assets/character/about-full-body.png`

Expected: 6 PNGs in `public/assets/cartoons/` (each ≤800KB per spec §11.3), 1 PNG at `public/assets/character/about-full-body.png` (≤800KB per spec §7.3).

- [ ] **Step 5: Verify file sizes are reasonable (≤800KB each)**

Run: `du -k public/assets/cartoons/*.png public/assets/character/about-full-body.png | sort -n | tail -10`

Expected: each file ≤800KB. If any exceeds, the asset needs re-export at lower quality — surface to user before continuing. (The reference-images/ versions are the authoritative source files; if they're already >800KB, the spec budget needs re-evaluation, not a re-encode.)

- [ ] **Step 6: Verify dev server serves the new assets**

Run in parallel (7 curls):
- `curl -sI http://localhost:4321/assets/cartoons/01-tommy-pickles.png | head -1`
- `curl -sI http://localhost:4321/assets/cartoons/02-ash-ketchum.png | head -1`
- `curl -sI http://localhost:4321/assets/cartoons/03-rocko.png | head -1`
- `curl -sI http://localhost:4321/assets/cartoons/04-samurai-jack.png | head -1`
- `curl -sI http://localhost:4321/assets/cartoons/05-uncle-iroh.png | head -1`
- `curl -sI http://localhost:4321/assets/cartoons/06-jake.png | head -1`
- `curl -sI http://localhost:4321/assets/character/about-full-body.png | head -1`

Expected: each returns `HTTP/1.1 200 OK`. If any returns 404, the file isn't in the right place — re-verify Step 4 paths.

- [ ] **Step 7: Commit**

```bash
git add public/assets/cartoons/ public/assets/character/about-full-body.png
git commit -m "$(cat <<'EOF'
feat(phase-3d): copy about assets into public/ for Astro serving

Copies the 6 cartoon pencil-test studies + Sean's full-body character
PNG from reference-images/ (Phase 0 authoring location) into
public/assets/ (Astro serving location).

  - public/assets/cartoons/0{1-6}-<slug>.png  ← spec §11.2 canon:
      Tommy Pickles, Ash Ketchum, Rocko, Samurai Jack,
      Uncle Iroh, Jake the Dog. Each ~280×320 (Cel 4 / Samurai
      Jack ships full-resolution and is upscaled to 1.2×336×384
      by CSS at render time per §11.3.1).

  - public/assets/character/about-full-body.png  ← spec §7.3.
      Sean alone, full-body, pencil-test, alpha PNG. ≤800KB.
      Matches OPEN-1 default: no AI companion (companion lives
      in hero + animation-pipeline case study).

Original reference-images/ copies are retained as the authoring
source-of-truth (same pattern as the hero icons in Phase 2 +
the teaser deck in Phase 2b). When Sean re-authors any cel, the
reference-images/ copy is the canonical input and the public/
copy is regenerated.

Per about-spec §7.3 + §11.2 + §11.6 + BLUEPRINT §6 Phase 0 → 2
asset-move convention.
EOF
)"
```

---

## Section 4 — B-1 stacked-beats components

The page's load-bearing structural section. Three small components composed top-down: `<LaneRule />` (the chromatic SVG line per beat) inside `<BeatRow />` (one beat: date line + body + lane rule) inside `<Beats />` (the section wrapper that reads `beats[]` from frontmatter). All three land in one task because they share scope + Props flow.

### Task 4.1: `<LaneRule />` + `<BeatRow />` + `<Beats />`

**Files:**
- Create: `src/components/about/LaneRule.astro`
- Create: `src/components/about/BeatRow.astro`
- Create: `src/components/about/Beats.astro`

Per about-spec §9.

- [ ] **Step 1: Confirm `src/components/about/` doesn't exist yet**

Run: `ls src/components/about/ 2>&1`

Expected: "No such file or directory". The folder is created by the first component write below.

- [ ] **Step 2: Write `src/components/about/LaneRule.astro`**

Create the file with the following content:

```astro
---
/**
 * <LaneRule /> — chromatic left-margin rule for one B-1 beat.
 *
 * Rendered as an inline SVG <line> (NOT CSS border-left) per
 * about-spec §9.2.1. Stroke color per `lane` prop:
 *   - animator → solid amber #FAC775
 *   - pm       → solid teal  #0A3E42
 *   - braided  → vertical linearGradient amber → teal (#FAC775 → #0A3E42)
 *
 * Stroke width is 3px desktop / 4px mobile (§9.2 + §9.5).
 *
 * The reveal animation lerps `stroke-dasharray` from "0 9999" to
 * "9999 0" on viewport entry, 200ms AFTER the beat body lands
 * (§6 motion timeline). The lerp is driven by a CSS keyframe
 * triggered by adding the `is-revealed` class via the parent
 * <BeatRow />'s IntersectionObserver. Reduced motion: the rule
 * renders solid at final color (no draw-in) per §15.
 *
 * Source: about-spec-v1.md §9.2 + §9.2.1 + §9.3 + §6 + §15.
 */
interface Props {
  lane: "animator" | "pm" | "braided";
  slug: string;            // unique id for the per-beat linearGradient (only used when lane === "braided")
}

const { lane, slug } = Astro.props;
const gradientId = `braid-${slug}`;
---

<svg
  class={`lane-rule lane-rule--${lane}`}
  aria-hidden="true"
  focusable="false"
  preserveAspectRatio="none"
>
  {lane === "braided" && (
    <defs>
      <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FAC775" />
        <stop offset="100%" stop-color="#0A3E42" />
      </linearGradient>
    </defs>
  )}
  <line
    x1="50%"
    y1="0"
    x2="50%"
    y2="100%"
    stroke={
      lane === "animator" ? "#FAC775" :
      lane === "pm" ? "#0A3E42" :
      `url(#${gradientId})`
    }
    stroke-width="3"
    stroke-linecap="butt"
    class="lane-rule__stroke"
  />
</svg>

<style>
  .lane-rule {
    position: absolute;
    left: -28px;                /* ~16px to the left of the date line, inset from edge */
    top: 0;
    width: 6px;
    height: 100%;
    pointer-events: none;
  }

  .lane-rule__stroke {
    stroke-dasharray: 9999;
    stroke-dashoffset: 9999;
    transition: stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1) 200ms;
  }

  /* When the parent .beat-row gains .is-revealed, the lane rule draws in */
  :global(.beat-row.is-revealed) .lane-rule__stroke {
    stroke-dashoffset: 0;
  }

  @media (max-width: 767px) {
    .lane-rule {
      left: -22px;
    }
    .lane-rule__stroke {
      stroke-width: 4;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lane-rule__stroke {
      transition: none;
      stroke-dashoffset: 0;
    }
  }
</style>
```

- [ ] **Step 3: Write `src/components/about/BeatRow.astro`**

Create the file:

```astro
---
/**
 * <BeatRow /> — one B-1 beat: date line + body + lane rule.
 *
 * Composition (top-down within the row):
 *   1. JetBrains Mono date line  (`age N · YYYY`)
 *   2. Newsreader body           (1-3 sentences)
 *   3. Lane rule (positioned absolutely along the left edge)
 *
 * The row is `position: relative` so <LaneRule /> can absolute-position
 * itself along the left edge. Reveal animation: row fades + translateY(12px)
 * → 0 on viewport entry; the lane rule's stroke-dasharray lerp fires 200ms
 * after (handled inside <LaneRule />'s own CSS).
 *
 * Source: about-spec-v1.md §9.2 + §4 type table + §6 motion timeline.
 */
import LaneRule from "./LaneRule.astro";

interface Props {
  age: number;
  year: number;
  body: string;
  lane: "animator" | "pm" | "braided";
  index: number;                  // for the IntersectionObserver id + lane-rule gradient slug
}

const { age, year, body, lane, index } = Astro.props;
const slug = `beat-${index}`;
---

<div class="beat-row" data-beat-index={index}>
  <LaneRule lane={lane} slug={slug} />
  <p class="beat-row__date">age {age} · {year}</p>
  <p class="beat-row__body">{body}</p>
</div>

<style>
  .beat-row {
    position: relative;
    margin-bottom: 32px;
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 600ms cubic-bezier(0.22, 1, 0.36, 1),
                transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .beat-row.is-revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .beat-row__date {
    margin: 0 0 8px 0;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.4px;
    color: var(--stamp-amber);
    text-transform: lowercase;
  }

  .beat-row__body {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 400;
    letter-spacing: -0.1px;
    line-height: 1.5;
    color: var(--ink);
  }

  @media (max-width: 767px) {
    .beat-row {
      margin-bottom: 24px;
    }
    .beat-row__date {
      font-size: 11px;
    }
    .beat-row__body {
      font-size: 16px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .beat-row {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>

<script>
  // IntersectionObserver — add .is-revealed to each .beat-row on first
  // viewport entry. One-shot (unobserve after first reveal).
  // The lane rule's stroke-dasharray lerp fires from the same CSS class
  // 200ms later via the transition-delay declared in LaneRule.astro.
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  for (const row of document.querySelectorAll(".beat-row")) {
    observer.observe(row);
  }
</script>
```

- [ ] **Step 4: Write `src/components/about/Beats.astro`**

Create the file:

```astro
---
/**
 * <Beats /> — B-1 section: stacked beats with chromatic lane-tint rule.
 *
 * Reads `beats[]` from the parent about MDX frontmatter and renders
 * one <BeatRow /> per entry. Single column on all viewports —
 * the parallel-lineage signal lives in the per-beat lane-rule color,
 * not column position.
 *
 * The wrapping <section> carries an aria-label so screen readers
 * announce "How I got here" when entering the band. The H2 above
 * is plain Newsreader per about-spec §1.2 v1 substitution (hand-drawn
 * heading SVG deferred to v2).
 *
 * Source: about-spec-v1.md §9.
 */
import BeatRow from "./BeatRow.astro";

interface BeatFrontmatter {
  age: number;
  year: number;
  body: string;
  lane: "animator" | "pm" | "braided";
}

interface Props {
  beats: BeatFrontmatter[];
}

const { beats } = Astro.props;
---

<section class="beats" aria-labelledby="b1-heading">
  <p class="beats__frame-prefix">B-1 ·</p>
  <h2 id="b1-heading" class="beats__heading" aria-label="B-1: How I got here">
    How I got here
  </h2>
  <div class="beats__list">
    {beats.map((beat, index) => (
      <BeatRow
        age={beat.age}
        year={beat.year}
        body={beat.body}
        lane={beat.lane}
        index={index}
      />
    ))}
  </div>
</section>

<style>
  .beats {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .beats__frame-prefix {
    margin: 0 0 8px 0;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--amber-mid);
  }

  .beats__heading {
    margin: 0 0 60px 0;
    font-family: var(--font-serif);
    font-size: 48px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 1.1;
    color: var(--teal);
  }

  .beats__list {
    padding-left: 28px;       /* room for the lane-rule SVGs that absolute-position at left: -28px */
  }

  @media (max-width: 767px) {
    .beats {
      padding: 0 20px;
    }
    .beats__heading {
      font-size: 36px;
      margin-bottom: 40px;
    }
    .beats__list {
      padding-left: 22px;
    }
  }
</style>
```

- [ ] **Step 5: Commit**

```bash
git add src/components/about/LaneRule.astro src/components/about/BeatRow.astro src/components/about/Beats.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): B-1 stacked-beats components — Beats + BeatRow + LaneRule

Three components for the about-spec §9 B-1 band, where the
parallel-lineage rule (PMP §3.1) becomes chromatic:

  - <LaneRule /> — inline SVG <line> with per-beat stroke color.
    Animator beats → solid #FAC775. PM beats → solid #0A3E42.
    Braided beats → linearGradient #FAC775 → #0A3E42 (top → bottom),
    the only multi-color gradient sanctioned on the site per spec
    §5 ("strategic gradient carrying semantic meaning… <1% of section
    pixel area"). The stroke-dasharray lerp draws the rule in 200ms
    AFTER the beat body lands per §6 motion timeline. Reduced-motion
    renders solid at final color.

  - <BeatRow /> — one beat: JetBrains Mono `age N · YYYY` date line
    + Newsreader body + lane rule positioned absolutely along the
    left edge. IntersectionObserver toggles .is-revealed on viewport
    entry (one-shot, unobserve after first reveal). The body fade
    + translateY(12px → 0) + the lane rule's stroke-dasharray draw
    are driven from the same .is-revealed class — a single observer
    triggers both via CSS transition-delay.

  - <Beats /> — section wrapper. Reads beats[] from the parent MDX
    frontmatter and renders one <BeatRow /> per entry. Single
    column on all viewports per spec §3 + §9.5: parallel-lineage
    lives in lane-rule color, not column geometry. Wrapped in
    <section aria-labelledby> so screen readers announce "How I got
    here" on band entry. The H2 is plain Newsreader 48px weight 400
    primary teal — the v1 substitution for the deferred hand-drawn
    heading SVG per spec §1.2.

No CSS border-left for the lane rule — SVG is mandated by §9.2.1 so
the rule reads as a timeline scrubber, sidesteps the side-stripe-card
anti-pattern, and animates via stroke-dasharray (the same primitive
the signature would use if it weren't deferred to v2).

Per about-spec §9 + §6 + §15 + §1.2 v1 substitution.
EOF
)"
```

---

## Section 5 — Hero band: lead-line + character + pulse strip

The above-the-fold composition. `<AboutHero />` is the lead-line + character PNG 2-column grid; `<NowPulse />` is the daily-dated wire-service strip below. Both land in this section because they're the page's top band per spec §2 anatomy.

### Task 5.1: `<AboutHero />`

**Files:**
- Create: `src/components/about/AboutHero.astro`

Per about-spec §7.

- [ ] **Step 1: Write the component**

Create `src/components/about/AboutHero.astro`:

```astro
---
/**
 * <AboutHero /> — above-the-fold lead-line + character PNG.
 *
 * 2-column grid (lead left, character right) at desktop; stacks
 * on mobile (character above, lead below).
 *
 * The lead line is the byte-locked PMP §4 row 2 string. Read from
 * the about MDX frontmatter `lead:` field (validated upstream by
 * scripts/validate_about.mjs).
 *
 * The character is a static PNG (NOT the hero WebM). Above-the-fold
 * motion would compete with the lead line; the WebM lives on the
 * home hero + animation-pipeline case study per spec §7.4.
 *
 * Source: about-spec-v1.md §7.
 */
interface Props {
  lead: string;
  characterImage: string;
  characterAlt: string;
}

const { lead, characterImage, characterAlt } = Astro.props;
---

<section class="about-hero" aria-label="Lead line and character">
  <div class="about-hero__lead-col">
    <p class="about-hero__lead">{lead}</p>
  </div>
  <div class="about-hero__character-col">
    <img
      class="about-hero__character"
      src={characterImage}
      alt={characterAlt}
      loading="eager"
      decoding="async"
      width="640"
      height="640"
    />
  </div>
</section>

<style>
  .about-hero {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 60px;
    align-items: center;
    min-height: 640px;
  }

  .about-hero__lead-col {
    max-width: 720px;
  }

  .about-hero__lead {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(36px, 4.5vw, 72px);
    font-weight: 300;
    letter-spacing: -0.4px;
    line-height: 1.1;
    color: var(--ink);
  }

  .about-hero__character-col {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    height: 100%;
  }

  .about-hero__character {
    display: block;
    max-height: 640px;
    width: auto;
    height: auto;
    object-fit: contain;
    object-position: bottom right;
  }

  @media (max-width: 767px) {
    .about-hero {
      grid-template-columns: 1fr;
      gap: 32px;
      padding: 0 20px;
      min-height: auto;
    }
    .about-hero__lead-col {
      order: 2;
      max-width: 100%;
    }
    .about-hero__character-col {
      order: 1;
      justify-content: center;
    }
    .about-hero__character {
      max-height: 360px;
      object-position: bottom center;
    }
    .about-hero__lead {
      font-size: clamp(28px, 7vw, 44px);
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/AboutHero.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): <AboutHero /> — lead-line + character PNG composition

Above-the-fold 2-column grid per about-spec §7.

Lead column:
  - Renders the byte-locked lead from MDX frontmatter (PMP §4 row 2:
    "Raised by Saturday morning cartoons and Vercel deployment logs.").
  - Newsreader clamp(36px, 4.5vw, 72px) weight 300, tracking -0.4px,
    ink. Wraps to 2 lines at desktop sizes per §7.1 (natural break
    between "cartoons" and "and").
  - No forced <br>; the typography determines the wrap.
  - No quote marks rendered — the line is declared, not quoted.

Character column:
  - <img src="/assets/character/about-full-body.png"> served as a
    static PNG via the public/ path landed in Task 3.1.
  - loading="eager" (above the fold), max-height 640px desktop.
  - object-fit: contain + object-position: bottom right keeps the
    character anchored at the column floor while leaving headroom
    for the lead's editorial breath.

Mobile (≤767px):
  - Stacks vertically. Character above (max-height 360px,
    object-position: bottom center), lead below (clamp 28-44px
    smaller scale floor per §3 mobile table).
  - Lead wraps to 2-3 lines naturally.

No WebM, no motion. The static PNG decision is documented in
§7.4 — above-the-fold motion would compete with the lead;
the WebM lives on the home hero + animation-pipeline case study.

Per about-spec §7.1 + §7.3 + §7.4 + §3 (vertical budget + mobile).
EOF
)"
```

### Task 5.2: `<NowPulse />`

**Files:**
- Create: `src/components/about/NowPulse.astro`

Per about-spec §8.

- [ ] **Step 1: Write the component**

Create `src/components/about/NowPulse.astro`:

```astro
---
/**
 * <NowPulse /> — daily-dated pulse strip.
 *
 * Reads /public/api/about-pulse.json AT BUILD TIME (Node fs, not
 * client fetch) and renders the wire-service sentence per §8.2.
 *
 * Phase 4 wires the Daily Driver to *write* this file at 08:45 daily;
 * Phase 3d ships the build-time *read*. The static file already lives
 * in the repo at public/api/about-pulse.json with the spec §8.1 shape.
 *
 * Fallback (per §8.3): if the file is missing or >48h stale, render
 * the generic line "LAST 24H — quiet day. building."
 *
 * Source: about-spec-v1.md §8.
 */
import fs from "node:fs";
import path from "node:path";

interface PulseItem {
  type: "commits" | "drafts" | "pencil_frames" | "reading" | "fleet_runs";
  count?: number;
  label?: string;
  repo?: string;
  destination?: string;
  title?: string;
  author?: string;
}

interface PulseData {
  date_iso: string;
  items: PulseItem[];
  updated_at: string;
}

const JSON_PATH = path.join(process.cwd(), "public/api/about-pulse.json");
const FALLBACK_LINE = "LAST 24H — quiet day. building.";

function loadPulse(): { line: string; updatedTime: string | null } {
  try {
    const raw = fs.readFileSync(JSON_PATH, "utf8");
    const data = JSON.parse(raw) as PulseData;
    const dataDate = new Date(data.date_iso);
    const ageMs = Date.now() - dataDate.getTime();
    if (ageMs > 48 * 60 * 60 * 1000) {
      // >48h stale → fallback
      return { line: FALLBACK_LINE, updatedTime: null };
    }
    const phrases = data.items
      .map((it) => it.label ?? "")
      .filter((p) => p.length > 0);
    const updatedTime = new Date(data.updated_at).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const body = phrases.length > 0
      ? phrases.join(". ") + "."
      : "quiet day. building.";
    return {
      line: `LAST 24H — ${body}`,
      updatedTime: `updated ${updatedTime} by daily driver.`,
    };
  } catch {
    return { line: FALLBACK_LINE, updatedTime: null };
  }
}

const { line, updatedTime } = loadPulse();
---

<section class="now-pulse" aria-label="Past 24 hours pulse">
  <p class="now-pulse__body">
    {line}
    {updatedTime && <span class="now-pulse__updated"> {updatedTime}</span>}
  </p>
</section>

<style>
  .now-pulse {
    max-width: 1120px;
    margin: 0 auto;
    padding: 24px;
    border-top: 0.5px solid var(--border-paper);
    border-bottom: 0.5px solid var(--border-paper);
  }

  .now-pulse__body {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.8px;
    line-height: 1.6;
    color: var(--ink-secondary);
    text-transform: lowercase;
  }

  /* "LAST 24H —" prefix gets the stamp-amber color via ::first-line trick…
     except ::first-line is unreliable across wrap widths. Use a flat sentence
     and live with the secondary-ink color across the body. Spec §4 type table
     allows the body color; the prefix-amber styling is decorative per §1.2
     deferral spirit (no annotation chrome v1). */

  .now-pulse__updated {
    display: inline-block;
    margin-left: 4px;
  }

  @media (max-width: 767px) {
    .now-pulse {
      padding: 20px;
    }
    .now-pulse__body {
      font-size: 12px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/NowPulse.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): <NowPulse /> — daily-dated pulse strip

Wire-service "LAST 24H" strip per about-spec §8.

Reads /public/api/about-pulse.json at BUILD TIME via Node fs
(NOT client-side fetch). The static fallback is already
committed at public/api/about-pulse.json with the §8.1 schema.

Phase 4 task: wire the Daily Driver agent to *write* this file at
08:45 daily alongside dateline.json / next-piece.json /
shipped-stats-<slug>.json. Phase 3d ships the *read* side only —
the wire-service sentence renders from whatever's in the file at
build time. When the producer is live, the deploy carries the
freshest morning snapshot.

The phrase composition reads items[].label for the natural-language
sentence ("4 commits to code-brain. 1 substack draft. …"). The
already-committed JSON includes a label per item so the Daily
Driver's future write doesn't need to know the rendering rules.

Stale-data fallback (§8.3): when the JSON's date_iso is >48h old
OR the file is missing/unparseable, render the generic line
  LAST 24H — quiet day. building.
Recruiter sees "the page is alive, just paused yesterday" rather
than a 500 error.

The "LAST 24H —" stamp-amber prefix decoration documented in
§4 type table is omitted v1 — the ::first-line CSS trick is
unreliable across wrap widths. The full-secondary-ink rendering
still hits the wire-service register (mono, 13px, 0.8px tracking,
lowercase). v1.1 can revisit with a structured prefix <span> if
the section needs more chromatic life.

Per about-spec §8.1 + §8.2 + §8.3 + §4 type table.
EOF
)"
```

---

## Section 6 — B-3 cartoon canon components

The page's most opinionated mid-section. `<CartoonCel />` is one cel (registration pegs + pencil-test study + cel name strip + caption); `<CartoonCanon />` is the 3×2 grid wrapper that reads `getCollection("cartoons")`. Both land in one task because the canon wrapper imports the cel directly.

### Task 6.1: `<CartoonCel />` + `<CartoonCanon />`

**Files:**
- Create: `src/components/about/CartoonCel.astro`
- Create: `src/components/about/CartoonCanon.astro`

Per about-spec §11.

- [ ] **Step 1: Write `src/components/about/CartoonCel.astro`**

Create the file:

```astro
---
/**
 * <CartoonCel /> — one entry in the Saturday morning canon.
 *
 * Composition (top to bottom inside the cel frame):
 *   1. Registration peg SVG (top, 2 circles + 1 trapezoidal notch + 1 tick)
 *   2. Pencil-test study PNG (centered, breathing room above/below)
 *   3. Cel name + year strip (mono, bottom-left inside the cel)
 *
 * Below the cel (separate element, NOT inside the white frame):
 *   4. Caption strip — lesson noun (mono stamp-amber) + lesson body
 *      (mono secondary-ink).
 *
 * The whole cel rotates ±1.5° per the `angle` frontmatter field
 * (Cel 4 / Samurai Jack gets 0.0 explicitly so the break-grid
 * geometry stays visually anchored — surrounding cels tilt around it).
 *
 * Cel 4's `break_grid: true` per §11.3.1 — handled by the parent
 * <CartoonCanon /> grid via `style="--grid-span: 2; --cel-scale: 1.2"`
 * applied to the cel's container.
 *
 * Source: about-spec-v1.md §11.3 + §11.3.1 + §11.5.
 */
interface Props {
  name: string;
  yearRange: string;
  studio: string;
  image: string;
  imageAlt: string;
  lessonNoun: string;
  lessonBody: string;
  angle: number;          // pre-resolved by parent (default 0)
  breakGrid: boolean;
  order: number;          // 1-6, used for aria-labelledby
}

const {
  name,
  yearRange,
  studio: _studio,        // not rendered in v1 (lives in MDX for archival; cel slate shows name + year only)
  image,
  imageAlt,
  lessonNoun,
  lessonBody,
  angle,
  breakGrid,
  order,
} = Astro.props;

const celId = `cartoon-${order}`;
const containerClass = breakGrid ? "cartoon-cel cartoon-cel--break-grid" : "cartoon-cel";
---

<article class={containerClass} aria-labelledby={celId} style={`--cel-angle: ${angle}deg`}>
  <div class="cartoon-cel__frame">
    <svg
      class="cartoon-cel__pegs"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 120 16"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx="20" cy="8" r="4" fill="none" stroke="#FAC775" stroke-width="1.2" />
      <path
        d="M 50 4 L 70 4 L 73 12 L 47 12 Z"
        fill="none"
        stroke="#FAC775"
        stroke-width="1.2"
      />
      <line x1="80" y1="4" x2="80" y2="12" stroke="#FAC775" stroke-width="1.2" />
      <circle cx="100" cy="8" r="4" fill="none" stroke="#FAC775" stroke-width="1.2" />
    </svg>
    <img
      class="cartoon-cel__study"
      src={image}
      alt={imageAlt}
      loading="lazy"
      decoding="async"
    />
    <p class="cartoon-cel__slate">
      <span class="cartoon-cel__name" id={celId}>{name}</span>
      <span class="cartoon-cel__year"> · {yearRange}</span>
    </p>
  </div>
  <p class="cartoon-cel__caption">
    <span class="cartoon-cel__lesson-noun">{lessonNoun} —</span>
    <span class="cartoon-cel__lesson-body">{lessonBody}</span>
  </p>
</article>

<style>
  .cartoon-cel {
    display: flex;
    flex-direction: column;
    transform: rotate(var(--cel-angle, 0deg));
  }

  .cartoon-cel--break-grid {
    grid-column: span 2;
    /* Cel scales to 1.2× via the frame's max-width; angle stays at 0.0
       per the locked MDX frontmatter so the geometry break carries the
       emphasis. */
  }

  .cartoon-cel__frame {
    position: relative;
    width: 280px;
    height: 320px;
    background-color: #FFFFFF;
    border: 0.5px solid var(--border-paper);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    padding: 0;
    overflow: hidden;
  }

  .cartoon-cel--break-grid .cartoon-cel__frame {
    width: 336px;
    height: 384px;
  }

  .cartoon-cel__pegs {
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 16px;
  }

  .cartoon-cel__study {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 220px;
    object-fit: contain;
    display: block;
  }

  .cartoon-cel--break-grid .cartoon-cel__study {
    width: 240px;
    height: 264px;
  }

  .cartoon-cel__slate {
    position: absolute;
    bottom: 16px;
    left: 16px;
    margin: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--ink);
  }

  .cartoon-cel__name {
    font-weight: 500;
    letter-spacing: 1.2px;
  }

  .cartoon-cel__year {
    font-weight: 400;
    letter-spacing: 1.2px;
    color: var(--ink-secondary);
  }

  .cartoon-cel__caption {
    margin: 16px 0 0 0;
    max-width: 280px;
    font-family: var(--font-mono);
    font-size: 12px;
    line-height: 1.5;
    letter-spacing: 0.8px;
  }

  .cartoon-cel--break-grid .cartoon-cel__caption {
    max-width: 336px;
  }

  .cartoon-cel__lesson-noun {
    font-weight: 500;
    letter-spacing: 1.6px;
    color: var(--stamp-amber);
  }

  .cartoon-cel__lesson-body {
    font-weight: 400;
    color: var(--ink-secondary);
  }

  /* Cel entrance: fade + slight scale per §6 motion timeline.
     Triggered by an IntersectionObserver in <CartoonCanon />'s script. */
  .cartoon-cel {
    opacity: 0;
    transform: rotate(var(--cel-angle, 0deg)) scale(0.97);
    transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1),
                transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global(.cartoon-cel.is-revealed) {
    opacity: 1;
    transform: rotate(var(--cel-angle, 0deg)) scale(1);
  }

  @media (max-width: 767px) {
    .cartoon-cel {
      width: 100%;
      align-items: center;
    }
    .cartoon-cel--break-grid {
      grid-column: span 1;     /* break-grid is a no-op on mobile per §11.3.1 */
    }
    .cartoon-cel--break-grid .cartoon-cel__frame {
      width: 280px;
      height: 320px;
    }
    .cartoon-cel--break-grid .cartoon-cel__study {
      width: 200px;
      height: 220px;
    }
    .cartoon-cel--break-grid .cartoon-cel__caption {
      max-width: 280px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .cartoon-cel {
      opacity: 1;
      transform: rotate(var(--cel-angle, 0deg));
      transition: none;
    }
  }
</style>
```

- [ ] **Step 2: Write `src/components/about/CartoonCanon.astro`**

Create the file:

```astro
---
/**
 * <CartoonCanon /> — B-3 grid wrapper.
 *
 * Reads getCollection("cartoons").sort(order) and renders one
 * <CartoonCel /> per entry. Desktop: 3×2 grid (Cel 4 spans 2 columns
 * if break_grid: true, pushing the surrounding cels to reflow).
 * Mobile: single-column stack, break_grid is a no-op.
 *
 * The H2 heading is plain Newsreader 48px per spec §1.2 v1
 * substitution (hand-drawn heading SVG deferred to v2).
 *
 * Source: about-spec-v1.md §11.
 */
import { getCollection } from "astro:content";
import CartoonCel from "./CartoonCel.astro";

const cels = (await getCollection("cartoons")).sort(
  (a, b) => a.data.order - b.data.order
);
---

<section class="cartoon-canon" aria-labelledby="b3-heading">
  <p class="cartoon-canon__frame-prefix">B-3 ·</p>
  <h2 id="b3-heading" class="cartoon-canon__heading" aria-label="B-3: Saturday morning canon">
    Saturday morning canon
  </h2>
  <div class="cartoon-canon__grid">
    {cels.map((cel) => (
      <CartoonCel
        name={cel.data.name}
        yearRange={cel.data.year_range}
        studio={cel.data.studio}
        image={cel.data.image}
        imageAlt={cel.data.image_alt}
        lessonNoun={cel.data.lesson_noun}
        lessonBody={cel.data.lesson_body}
        angle={cel.data.angle ?? 0}
        breakGrid={cel.data.break_grid}
        order={cel.data.order}
      />
    ))}
  </div>
</section>

<style>
  .cartoon-canon {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .cartoon-canon__frame-prefix {
    margin: 0 0 8px 0;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--amber-mid);
  }

  .cartoon-canon__heading {
    margin: 0 0 60px 0;
    font-family: var(--font-serif);
    font-size: 48px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 1.1;
    color: var(--teal);
  }

  .cartoon-canon__grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 280px));
    column-gap: 40px;
    row-gap: 60px;
    justify-content: center;
  }

  @media (max-width: 1023px) and (min-width: 768px) {
    .cartoon-canon__grid {
      grid-template-columns: repeat(2, minmax(0, 280px));
    }
  }

  @media (max-width: 767px) {
    .cartoon-canon {
      padding: 0 20px;
    }
    .cartoon-canon__heading {
      font-size: 36px;
      margin-bottom: 40px;
    }
    .cartoon-canon__grid {
      grid-template-columns: 1fr;
      row-gap: 48px;
      justify-content: center;
      justify-items: center;
    }
  }
</style>

<script>
  // IntersectionObserver — fade + scale cels in as they enter the viewport.
  // 100ms stagger between cels (handled via per-cel transitionDelay).
  const cels = document.querySelectorAll<HTMLElement>(".cartoon-cel");
  const observer = new IntersectionObserver((entries) => {
    let staggerIndex = 0;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement;
        target.style.transitionDelay = `${staggerIndex * 100}ms`;
        target.classList.add("is-revealed");
        observer.unobserve(target);
        staggerIndex++;
      }
    }
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.15 });

  for (const cel of cels) {
    observer.observe(cel);
  }
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/about/CartoonCel.astro src/components/about/CartoonCanon.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): B-3 Saturday-morning-canon components

Two components for the about-spec §11 B-3 band:

  - <CartoonCel /> — one entry in the canon. Cel composition:
      • Registration peg SVG (top): 2 circles + 1 trapezoidal notch
        + 1 tick mark, amber #FAC775 stroke 1.2px — the cartoon-cel
        registration peg standard animators have used for a century
        per §11.3.
      • Pencil-test study PNG (centered, 200×220 default, 240×264
        when break_grid). Lazy-loaded; the canon sits below the
        fold even on desktop.
      • Cel name + year strip (bottom-left inside the cel frame):
        mono 11px weight 500 ink name + weight 400 secondary-ink
        year suffix.
      • Caption strip (below the cel, separate element): mono
        12px stamp-amber lesson noun + secondary-ink lesson body.
        Max-width matches the cel; wraps to 2-3 lines naturally.
      The whole cel rotates ±1.5° per the `angle` frontmatter field;
      Cel 4 (Samurai Jack) is locked at angle 0.0 so the break-grid
      geometry stays visually anchored per §11.3.1.
      Fade + scale entrance per §6 motion timeline (rotate is
      preserved inside the transform stack so the cel tilts stay
      consistent through the animation).

  - <CartoonCanon /> — 3×2 grid wrapper. Reads
    getCollection("cartoons").sort(order). Desktop: 3 columns;
    Cel 4's break_grid: true CSS sets grid-column: span 2 +
    sizes the frame to 336×384 (1.2× scale) — surrounding cels
    reflow per §11.3.1. Tablet (768-1023px): 2 columns,
    break_grid still spans 2 (one row of just Cel 4). Mobile:
    single column, break_grid is a no-op (every cel renders
    full-width 280×320 to keep the lesson sentences readable;
    spec §11.5 forbids carousel because lessons are too important
    to risk being swiped past).
    The H2 heading is plain Newsreader 48px per spec §1.2 v1
    substitution.
    IntersectionObserver triggers a 100ms-stagger reveal across
    cels via transitionDelay (one-shot, unobserve after first
    reveal).

The Studio field from frontmatter (e.g., "Klasky Csupo / Nickelodeon")
is read but NOT rendered v1 — the cel slate carries name + year only
per §11.3 ("Cel name + year typeset in mono inside the cel's
bottom-left corner (like a production cel's slate)"). The studio
remains in MDX for archival + future v2 expansion if the canon's
inheritance gets called out more directly.

The §11.7 annotation arrow ("← this one rewires you" pointing at
Samurai Jack per the locked `b3_load_bearing_cel: 4` frontmatter
field) is DEFERRED to v2 per spec §1.2. The break_grid geometry
on Cel 4 carries the v1 emphasis.

Per about-spec §11.2 + §11.3 + §11.3.1 + §11.5 + §11.6 + §6.
EOF
)"
```

---

## Section 7 — B-4 + B-5 + closeout components

The page's bottom-half components: B-4's three surfaces (`<CurrentlyAtStamp />`, `<BuildingToward />`, `<RecruiterCallout />`), B-5's `<ProofPoints />`, and the closing `<PullQuote />`. Split into two tasks for atomicity: B-4 surfaces together (they share the employment-state contract), then B-5 + closeout together.

### Task 7.1: B-4 surfaces — `<CurrentlyAtStamp />` + `<BuildingToward />` + `<RecruiterCallout />`

**Files:**
- Create: `src/components/about/CurrentlyAtStamp.astro`
- Create: `src/components/about/BuildingToward.astro`
- Create: `src/components/about/RecruiterCallout.astro`

Per about-spec §12.

- [ ] **Step 1: Write `src/components/about/CurrentlyAtStamp.astro`**

Create the file:

```astro
---
/**
 * <CurrentlyAtStamp /> — top-right mono stamp on the B-4 section.
 *
 * Reads `current_company` from the about MDX frontmatter. When null,
 * renders `CURRENTLY @ FREE AGENT`. When set, renders
 * `CURRENTLY @ <COMPANY UPPERCASE>`.
 *
 * This is the ONLY surface on the page that carries employment-state
 * signal in the visible text (the conditional <RecruiterCallout />
 * is the only other surface that *exists* based on employment state).
 * The aging contract per §12.2: Sean changes two frontmatter fields
 * when his job status changes; zero prose edits.
 *
 * Source: about-spec-v1.md §12.1 + §12.2.
 */
interface Props {
  currentCompany: string | null;
}

const { currentCompany } = Astro.props;
const stampText = currentCompany
  ? `CURRENTLY @ ${currentCompany.toUpperCase()}`
  : "CURRENTLY @ FREE AGENT";
---

<p class="currently-at-stamp" aria-label="Current employment status">
  {stampText}
</p>

<style>
  .currently-at-stamp {
    display: inline-block;
    margin: 0;
    padding: 6px 12px;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--stamp-amber);
    background-color: rgba(124, 45, 18, 0.06);
    border: 1px solid var(--stamp-amber);
    border-radius: 2px;
  }
</style>
```

- [ ] **Step 2: Write `src/components/about/BuildingToward.astro`**

Create the file:

```astro
---
/**
 * <BuildingToward /> — "WHAT I'M BUILDING TOWARD" heading + slot.
 *
 * Renders the mono section heading + a slot for the 2-paragraph
 * direction-of-craft prose from the about MDX body. Always rendered
 * regardless of `available` state per §12.1 surface 2.
 *
 * Source: about-spec-v1.md §12.1 + §12.3 + §4 type table.
 */
---

<div class="building-toward">
  <h3 class="building-toward__heading">WHAT I'M BUILDING TOWARD</h3>
  <div class="building-toward__body">
    <slot />
  </div>
</div>

<style>
  .building-toward {
    max-width: 680px;
  }

  .building-toward__heading {
    margin: 0 0 24px 0;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--stamp-amber);
    text-transform: uppercase;
  }

  .building-toward__body :global(p) {
    margin: 0 0 20px 0;
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 300;
    letter-spacing: -0.1px;
    line-height: 1.5;
    color: var(--ink);
  }

  .building-toward__body :global(p:last-child) {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    .building-toward__body :global(p) {
      font-size: 18px;
    }
  }
</style>
```

- [ ] **Step 3: Write `src/components/about/RecruiterCallout.astro`**

Create the file:

```astro
---
/**
 * <RecruiterCallout /> — B-4 conditional italic.
 *
 * Renders ONLY when `available` is true per about MDX frontmatter.
 * When `available` is false, the component returns null (no markup).
 *
 * Copy is LOCKED in the component (NOT a prop) so it can be
 * referenced from PMP §4 in lockstep with the other locked copy
 * if Sean wants to surface it there for cross-page consistency.
 *
 * Visual sibling to <NowPulse /> — paper-strip background, 0.5px
 * teal dividers top + bottom, single line of Newsreader italic.
 *
 * Source: about-spec-v1.md §12.1 surface 3 + §12.5.
 */
interface Props {
  visible: boolean;
}

const { visible } = Astro.props;
---

{visible && (
  <aside class="recruiter-callout" aria-label="Note to hiring contacts">
    <p class="recruiter-callout__body">
      if you're hiring around this, my agent fleet config goes out on second conversation.
    </p>
  </aside>
)}

<style>
  .recruiter-callout {
    margin: 32px 0 0 0;
    padding: 16px 0;
    max-width: 680px;
    border-top: 0.5px solid var(--border-paper);
    border-bottom: 0.5px solid var(--border-paper);
    background-color: rgba(10, 62, 66, 0.04);
  }

  .recruiter-callout__body {
    margin: 0;
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    font-style: italic;
    letter-spacing: -0.1px;
    line-height: 1.5;
    color: var(--teal);
  }

  @media (max-width: 767px) {
    .recruiter-callout__body {
      font-size: 16px;
    }
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/about/CurrentlyAtStamp.astro src/components/about/BuildingToward.astro src/components/about/RecruiterCallout.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): B-4 surfaces — CurrentlyAtStamp + BuildingToward + RecruiterCallout

Three components for about-spec §12's three discrete surfaces in the
B-4 "Where I'm going" band. The aging contract (§12.2) is implemented
across these three: Sean flips two frontmatter fields (`available` +
`current_company`) when his job status changes; the section's prose
body stays verbatim across job changes.

  - <CurrentlyAtStamp /> — top-right mono stamp. Reads
    `current_company` from frontmatter:
      null            → "CURRENTLY @ FREE AGENT"
      "Foo Inc."      → "CURRENTLY @ FOO INC."
    Stamp-amber on a paper-tinted background (rgba(124,45,18,0.06))
    with a 1px stamp-amber border — hand-stamp rectangle styling
    per §4 type table.

  - <BuildingToward /> — the always-rendered surface: mono
    "WHAT I'M BUILDING TOWARD" heading + a <slot /> for the
    2-paragraph direction-of-craft prose from the MDX body. Reads
    identically whether Sean is hired or hunting per §12.1
    surface 2. Newsreader 20px (18px mobile) weight 300, ink.

  - <RecruiterCallout /> — the conditional surface. Renders ONLY when
    `available === true`. Copy is LOCKED inside the component
    (NOT a prop): "if you're hiring around this, my agent fleet
    config goes out on second conversation." Visual sibling to
    <NowPulse /> — paper-strip background (rgba(10,62,66,0.04)),
    0.5px teal dividers top + bottom, single line of Newsreader
    italic teal. When `available` flips to false, this entire
    surface disappears; the section closes on the 2-paragraph
    BuildingToward and the page reads as continuous practice
    rather than vacancy notice per §12.4.

The contract: when Sean is hired, he edits exactly TWO frontmatter
fields:
  available: true            → false
  current_company: null      → "Foo Inc."
Zero prose edits. The stamp updates, the RecruiterCallout disappears,
the BuildingToward stays. When he leaves, flip both back.

Per about-spec §12.1 + §12.2 + §12.3 + §12.4 + §12.5 + §4 type table.
EOF
)"
```

### Task 7.2: B-5 + closeout — `<ProofPoints />` + `<PullQuote />`

**Files:**
- Create: `src/components/about/ProofPoints.astro`
- Create: `src/components/about/PullQuote.astro`

Per about-spec §13 + §2 anatomy pull-quote row.

- [ ] **Step 1: Write `src/components/about/ProofPoints.astro`**

Create the file:

```astro
---
/**
 * <ProofPoints /> — B-5 four-link block.
 *
 * Mono links, left-aligned, one per line. No descriptions.
 * The arrow prefix is rendered as a static "→" character (no
 * pseudo-element trickery — keeps the print stylesheet honest).
 *
 * The "rev scribble" annotation on the /transactions/ link is
 * DEFERRED to v2 per spec §1.2. v1 ships four clean links.
 *
 * Source: about-spec-v1.md §13 + §4 type table.
 */
interface Props {
  linkedinUrl: string;
  githubUrl: string;
  transactionsUrl: string;
  resumeUrl: string;
}

const { linkedinUrl, githubUrl, transactionsUrl, resumeUrl } = Astro.props;
---

<section class="proof-points" aria-labelledby="b5-heading">
  <p class="proof-points__frame-prefix">B-5 ·</p>
  <h2 id="b5-heading" class="proof-points__heading" aria-label="B-5: Proof points">
    Proof points
  </h2>
  <ul class="proof-points__list">
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
    <li>
      <a href={transactionsUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        seanwinslow.com/transactions
      </a>
    </li>
    <li>
      <a href={resumeUrl} class="proof-points__link">
        <span class="proof-points__arrow" aria-hidden="true">→</span>
        resume.pdf
      </a>
    </li>
  </ul>
</section>

<style>
  .proof-points {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .proof-points__frame-prefix {
    margin: 0 0 8px 0;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--amber-mid);
  }

  .proof-points__heading {
    margin: 0 0 32px 0;
    font-family: var(--font-serif);
    font-size: 48px;
    font-weight: 400;
    letter-spacing: -0.2px;
    line-height: 1.1;
    color: var(--teal);
  }

  .proof-points__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .proof-points__list li {
    margin: 0 0 12px 0;
  }

  .proof-points__link {
    display: inline-flex;
    align-items: baseline;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.6px;
    color: var(--teal);
    text-decoration: none;
    transition: text-decoration-color 200ms;
  }

  .proof-points__link:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }

  .proof-points__arrow {
    display: inline-block;
    width: 12px;
  }

  @media (max-width: 767px) {
    .proof-points {
      padding: 0 20px;
    }
    .proof-points__heading {
      font-size: 36px;
      margin-bottom: 24px;
    }
    .proof-points__link {
      font-size: 13px;
    }
  }

  @media print {
    .proof-points__link::after {
      content: " (" attr(href) ")";
      font-weight: 400;
      color: var(--ink-secondary);
    }
  }
</style>
```

- [ ] **Step 2: Write `src/components/about/PullQuote.astro`**

Create the file:

```astro
---
/**
 * <PullQuote /> — closing pull quote.
 *
 * Echoes the home-hero tagline verbatim per spec §2 anatomy +
 * §7.2 ("Cross-page closeout via pull quote"). The visitor's
 * last beat on /about/ is a callback to the page they entered
 * through.
 *
 * The string is LOCKED in the component — it's the home-hero
 * tagline reproduced byte-identical, and PMP §4 row 1 is the
 * source of truth. If PMP §4 row 1 changes, update both here
 * and in src/components/hero/Hero.astro in lockstep.
 *
 * Per about-spec §1.2: this is also where the v1 page closes
 * (no signature SVG, no registration mark — both deferred to
 * v2). The torn-paper edge into the chrome footer follows.
 *
 * Source: about-spec-v1.md §2 anatomy + §7.2 + §1.2 + §4
 * type table (pull-quote row).
 */
---

<section class="pull-quote" aria-label="Closing pull quote">
  <blockquote class="pull-quote__body">
    "Product Manager. The agents handle the loops. I handle the taste."
  </blockquote>
</section>

<style>
  .pull-quote {
    max-width: 880px;
    margin: 0 auto;
    padding: 40px 24px;
    background-color: rgba(10, 62, 66, 0.04);
    border-top: 0.5px solid var(--border-paper);
    border-bottom: 0.5px solid var(--border-paper);
    text-align: center;
  }

  .pull-quote__body {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(28px, 4.5vw, 40px);
    font-weight: 300;
    font-style: italic;
    letter-spacing: -0.3px;
    line-height: 1.3;
    color: var(--teal);
  }

  @media (max-width: 767px) {
    .pull-quote {
      padding: 32px 20px;
    }
    .pull-quote__body {
      font-size: clamp(24px, 5vw, 32px);
    }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/about/ProofPoints.astro src/components/about/PullQuote.astro
git commit -m "$(cat <<'EOF'
feat(phase-3d): B-5 ProofPoints + closing PullQuote

Two components closing out the page DOM before the torn-paper
edge transitions into the site-chrome footer.

  - <ProofPoints /> — B-5 four-link block per spec §13. LinkedIn,
    GitHub, /transactions/, resume.pdf. Mono 15px weight 500
    teal, "→" arrow prefix, left-aligned. Print stylesheet
    appends the href in parentheses next to each link for
    print fidelity per §16 build-stack print-stylesheet row.
    The §1.2-deferred "rev scribble" annotation on the
    /transactions/ link is NOT shipped v1 — the link is clean.

  - <PullQuote /> — closing serif italic. Reproduces the home-hero
    tagline BYTE-IDENTICAL ("Product Manager. The agents handle
    the loops. I handle the taste.") per spec §2 anatomy
    pull-quote row + §7.2 "Cross-page closeout via pull quote."
    The cross-surface echo closes the visitor's loop: they
    entered through the home hero, the last beat they read on
    /about/ is the same line. PMP §4 row 1 is the source of
    truth; if it changes, update this string + src/components/hero/
    Hero.astro in lockstep.
    Paper-strip background (rgba(10,62,66,0.04)), 0.5px teal
    dividers top + bottom — visual sibling to <NowPulse /> +
    <RecruiterCallout />, three wire-service surfaces that frame
    the editorial bands.

This is where v1's about-page DOM ends. The torn-paper bottom edge
from texture-spec §4.4 transitions into the site-chrome footer
(where Contact lives) per spec §1.2 + §17 DoD #11. The signature
SVG + registration mark deferred to v2 sit between these two if
they ever ship — no DOM-shape changes needed in v1.1, just inserts.

Per about-spec §13 + §2 anatomy + §7.2 + §1.2 + §4 type table.
EOF
)"
```

---

## Section 8 — Content collection authoring

The two MDX surfaces: the 6 cartoon entries (Task 8.1) + the singleton about MDX with the byte-locked lead + 7 starter beats + B-2 thesis + B-4 building-toward prose (Task 8.2).

### Task 8.1: Author the 6 cartoon MDX entries

**Files:**
- Create: `src/content/cartoons/01-tommy-pickles.md`
- Create: `src/content/cartoons/02-ash-ketchum.md`
- Create: `src/content/cartoons/03-rocko.md`
- Create: `src/content/cartoons/04-samurai-jack.md`
- Create: `src/content/cartoons/05-uncle-iroh.md`
- Create: `src/content/cartoons/06-jake.md`

Per about-spec §11.2 + §11.6 + the locked draft at [`reference-images/about-cartoons/cartoons-content-collection-draft.md`](../../../reference-images/about-cartoons/cartoons-content-collection-draft.md).

- [ ] **Step 1: Create the cartoons content folder**

Run: `mkdir -p src/content/cartoons`

- [ ] **Step 2: Write all 6 cartoon MDX files in one batch**

Create `src/content/cartoons/01-tommy-pickles.md`:

```markdown
---
order: 1
name: TOMMY PICKLES
year_range: 1991–2004
studio: Klasky Csupo / Nickelodeon
image: /assets/cartoons/01-tommy-pickles.png
image_alt: pencil-test study of Tommy Pickles holding his purple-handled screwdriver overhead in a determined stance
lesson_noun: THE SCREWDRIVER
lesson_body: unlock the playpen first. the adventure is downstream.
angle: -1.1
break_grid: false
---
```

Create `src/content/cartoons/02-ash-ketchum.md`:

```markdown
---
order: 2
name: ASH KETCHUM
year_range: 1997–
studio: OLM / TV Tokyo
image: /assets/cartoons/02-ash-ketchum.png
image_alt: pencil-test study of Ash Ketchum mid-stride holding a Pokéball forward, in anime line language translated to pencil
lesson_noun: THE LONG GAMBIT
lesson_body: chased the same goal for twenty years before he won. the journey is the artifact; the title is the byproduct.
angle: 0.9
break_grid: false
---
```

Create `src/content/cartoons/03-rocko.md`:

```markdown
---
order: 3
name: ROCKO
year_range: 1993–96
studio: Joe Murray Productions / Nickelodeon
image: /assets/cartoons/03-rocko.png
image_alt: pencil-test study of Rocko the wallaby standing slightly slack-shouldered in his Hawaiian shirt, looking around in mild bewilderment
lesson_noun: THE OUTSIDER
lesson_body: rocko didn't argue with modernity, he survived it. learn the system before you reform it.
angle: -0.6
break_grid: false
---
```

Create `src/content/cartoons/04-samurai-jack.md`:

```markdown
---
order: 4
name: SAMURAI JACK
year_range: 2001–17
studio: Cartoon Network Studios (Genndy Tartakovsky)
image: /assets/cartoons/04-samurai-jack.png
image_alt: pencil-test study of Samurai Jack standing in a calm ready stance with his katana drawn at a low diagonal
lesson_noun: THE CODE
lesson_body: jack keeps the samurai code in a world of robots. the spec is the code; everything around it is noise.
angle: 0.0
break_grid: true
---
```

Create `src/content/cartoons/05-uncle-iroh.md`:

```markdown
---
order: 5
name: UNCLE IROH
year_range: 2005–08
studio: Nickelodeon Animation Studio (Avatar: The Last Airbender)
image: /assets/cartoons/05-uncle-iroh.png
image_alt: pencil-test study of Uncle Iroh standing calmly holding a small ceramic teacup in both hands at chest height
lesson_noun: WISDOM IN RESTRAINT
lesson_body: the most experienced person in the room is the one who speaks last. authority is the right not to use it.
angle: 1.2
break_grid: false
---
```

Create `src/content/cartoons/06-jake.md`:

```markdown
---
order: 6
name: JAKE THE DOG
year_range: 2010–18
studio: Cartoon Network Studios (Pendleton Ward)
image: /assets/cartoons/06-jake.png
image_alt: pencil-test study of Jake the Dog with his right arm stretched roughly three times his body length, body squashed slightly to preserve volume
lesson_noun: SQUASH AND STRETCH
lesson_body: flexibility under constraint, without losing the character. the spec stretches; the thesis doesn't.
angle: -0.8
break_grid: false
---
```

- [ ] **Step 3: Verify Astro syncs the new collection**

Run: `npx astro sync`

Expected: exits 0 with `Types generated` (or equivalent success message). If the schema rejects any frontmatter field, fix the MDX to match `src/content/config.ts`'s `cartoons` schema.

- [ ] **Step 4: Verify exactly one cel sets `break_grid: true`**

Run: `grep -c "^break_grid: true" src/content/cartoons/*.md`

Expected: each file prints either `:0` or `:1`; the totals: one file (`04-samurai-jack.md`) at 1, the others at 0. (Spec §11.3.1 mandates exactly one break_grid cel.)

- [ ] **Step 5: Commit**

```bash
git add src/content/cartoons/
git commit -m "$(cat <<'EOF'
feat(phase-3d): 6 cartoon canon MDX entries — Saturday morning canon

Authors the 6 cartoon content-collection entries per the locked
canon in about-spec §11.2 + the frontmatter shape in §11.6 + the
draft at reference-images/about-cartoons/cartoons-content-collection-draft.md.

The canon, in order, with the product/craft lesson each carries:

  1. TOMMY PICKLES (Rugrats, 1991-2004)
     THE SCREWDRIVER — unlock the playpen first. the adventure is
     downstream.
  2. ASH KETCHUM (Pokémon, 1997-)
     THE LONG GAMBIT — chased the same goal for twenty years before
     he won. the journey is the artifact; the title is the byproduct.
  3. ROCKO (Rocko's Modern Life, 1993-96)
     THE OUTSIDER — rocko didn't argue with modernity, he survived
     it. learn the system before you reform it.
  4. SAMURAI JACK (Cartoon Network, 2001-17)     ⭐ break_grid
     THE CODE — jack keeps the samurai code in a world of robots.
     the spec is the code; everything around it is noise.
  5. UNCLE IROH (Avatar: The Last Airbender, 2005-08)
     WISDOM IN RESTRAINT — the most experienced person in the room
     is the one who speaks last. authority is the right not to use it.
  6. JAKE THE DOG (Adventure Time, 2010-18)
     SQUASH AND STRETCH — flexibility under constraint, without
     losing the character. the spec stretches; the thesis doesn't.

Cel 4 (Samurai Jack) is the only break_grid cel per §11.3.1 — renders
at 1.2× scale (336×384 instead of 280×320) and spans two grid columns
on desktop. angle: 0.0 keeps it visually anchored; the surrounding
cels (with non-zero angles) tilt around it.

Bugs Bunny was considered and rejected during asset authoring (per
§11.2 + reference-images/about-cartoons/GENERATION-PROMPTS.md) in
favor of Iroh's deeper PM lesson — wisdom in restraint over
composure-under-chaos.

The §11.7 annotation arrow ("← this one rewires you" pointing at
Samurai Jack) is DEFERRED to v2 per spec §1.2; the break_grid
geometry carries the v1 emphasis.

Per about-spec §11.2 + §11.6 + the locked draft.
EOF
)"
```

### Task 8.2: Author the singleton `src/content/about/index.mdx`

**Files:**
- Create: `src/content/about/index.mdx`

Per about-spec Appendix B (frontmatter) + §9.6 (beats[]) + §10 (B-2 thesis prose) + §12 (B-4 building-toward prose).

- [ ] **Step 1: Create the about content folder**

Run: `mkdir -p src/content/about`

- [ ] **Step 2: Write `src/content/about/index.mdx`**

Create the file with the following content. **CRITICAL:** the `lead:` field must match PMP §4 row 2 BYTE-FOR-BYTE — `scripts/validate_about.mjs` enforces this. The 7 starter beats include 4 marked `lane: braided` (more than the §9.3 minimum of 2).

```mdx
---
# --- Lead (LOCKED — byte-validated against PMP §4 row 2 by scripts/validate_about.mjs) ---
lead: "Raised by Saturday morning cartoons and Vercel deployment logs."

# --- Meta ---
slug: about
title: About — Sean Winslow
description: "Sean Winslow — AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs."
reading_time: 4

# --- Proof-point URLs (B-5) ---
linkedin_url: https://linkedin.com/in/seanwinslow
github_url: https://github.com/seanwinslow
transactions_url: /transactions/
resume_url: /resume/sean-winslow.pdf

# --- Employment state (drives B-4) ---
# Flip these two together when employment state changes. Zero prose edits required.
available: true
current_company: null

# --- Character (hero band) ---
character_image: /assets/character/about-full-body.png
character_alt: A pencil-test rendering of Sean Winslow, full-body — the human-self version of the character that runs the agent fleet.

# --- B-1 stacked beats (7 entries; 4 lane: braided per §9.3 minimum + 3 single-lane for contrast) ---
beats:
  - age: 8
    year: 1998
    body: "drew a coyote badly. asked dad to deploy a webpage. it was on Geocities."
    lane: braided
  - age: 14
    year: 2004
    body: "filled six sketchbooks. shipped the school-play site. learned what 'broken' meant."
    lane: braided
  - age: 18
    year: 2008
    body: "first short film. first festival rejection. learned what a deadline does to a draft."
    lane: animator
  - age: 22
    year: 2012
    body: "first PRD. first stakeholder loop. discovered the discipline I'd been faking with storyboards had a name."
    lane: pm
  - age: 28
    year: 2018
    body: "shipped products at scale. drew on the train home. neither half made the other smaller."
    lane: braided
  - age: 32
    year: 2022
    body: "GPT-4 dropped. saw the agents could draw the keyframes; the in-betweens were always the human job."
    lane: pm
  - age: 36
    year: 2026
    body: "running an agent fleet. animating again. the same person, finally using both hands."
    lane: braided

# --- B-3 annotation hook (DEFERRED to v2 per spec §1.2; field retained for v1.1) ---
b3_load_bearing_cel: 4
---

import AboutHero from "~/components/about/AboutHero.astro";
import NowPulse from "~/components/about/NowPulse.astro";
import Beats from "~/components/about/Beats.astro";
import CartoonCanon from "~/components/about/CartoonCanon.astro";
import CurrentlyAtStamp from "~/components/about/CurrentlyAtStamp.astro";
import BuildingToward from "~/components/about/BuildingToward.astro";
import RecruiterCallout from "~/components/about/RecruiterCallout.astro";
import ProofPoints from "~/components/about/ProofPoints.astro";
import PullQuote from "~/components/about/PullQuote.astro";

<section class="about-section about-section--b2" aria-labelledby="b2-heading">
  <p class="about-section__frame-prefix">B-2 ·</p>
  <h2 id="b2-heading" class="about-section__heading" aria-label="B-2: Why a PM, not just a builder">
    Why a PM, not just a builder
  </h2>

  I used to think shipping the thing was the whole job. The drawing, the code, the cut — get the artifact out, and the artifact would explain itself. It turns out the artifact never explains itself. The PRD does. The spec does. The note at the top of the file that says *this is what this is and what it is for* does. The thing I was avoiding because I thought it was paperwork was the actual product.

  Building got cheap this year. The agents draw the keyframes now; they write the code; they ship the page. What stayed expensive — what got more expensive — is the part that says *here is what we are doing and why*. Comprehension is the artifact. Governance is the artifact. The spec is the artifact. Everything else is shavings off the side.

  [PLACEHOLDER — Sean rewrites the third paragraph in Sedaris register: a specific, small, true moment when the comprehension thesis clicked. The hyper-specific noun that earns the abstraction. The kind of paragraph the writing-voice-modes skill calls a "Sedaris pivot" — a comedic juxtaposition with no punchline, just two true things sitting next to each other. Keep it to 3-5 sentences.]
</section>

<CartoonCanon />

<section class="about-section about-section--b4" aria-labelledby="b4-heading">
  <p class="about-section__frame-prefix">B-4 ·</p>
  <div class="about-section__b4-header">
    <h2 id="b4-heading" class="about-section__heading" aria-label="B-4: Where I'm going">
      Where I'm going
    </h2>
    <CurrentlyAtStamp currentCompany={frontmatter.current_company} />
  </div>

  <BuildingToward>
    I'm building toward the version of product management that takes AI-native seriously — not as a feature surface but as the substrate. The agents handle the iteration loops; the spec layer is where judgment lives, and the spec layer is where I want to be in the room.

    [PLACEHOLDER — Sean rewrites the second paragraph: name the specific bet (agent governance, the spec-as-source-of-truth, the human-in-the-loop role at the loop's hinge points) and the specific problems Sean wants to be assigned to. Reads identically whether hired or hunting per §12.3 — no "open to opportunities" or "looking for a seat" language. The bet is durable; availability is not.]
  </BuildingToward>

  <RecruiterCallout visible={frontmatter.available === true} />
</section>

<ProofPoints
  linkedinUrl={frontmatter.linkedin_url}
  githubUrl={frontmatter.github_url}
  transactionsUrl={frontmatter.transactions_url}
  resumeUrl={frontmatter.resume_url}
/>

<PullQuote />
```

- [ ] **Step 3: Verify Astro syncs the new singleton**

Run: `npx astro sync`

Expected: exits 0. The about collection now has exactly 1 entry.

- [ ] **Step 4: Verify the prebuild chain now passes end-to-end**

Run: `npm run prebuild`

Expected: all 4 scripts exit 0. The new `validate_about.mjs` line prints:
```
✓ about: lead-line matches PMP §4 row 2 byte-for-byte
✓ about: 4 braided beats in beats[] (≥2 required)
done.
```

If validate_about.mjs fails, the most likely cause is a non-matching `lead:` line — verify byte-identity against PMP §4 row 2:
- Expected: `"Raised by Saturday morning cartoons and Vercel deployment logs."`
- Common drift: smart-quote substitution by an editor (`"` → `"`), trailing whitespace, period missing, "Saturday-morning" hyphenated, etc.

- [ ] **Step 5: Commit**

```bash
git add src/content/about/index.mdx
git commit -m "$(cat <<'EOF'
feat(phase-3d): authors src/content/about/index.mdx — byte-locked lead + 7 starter beats

The singleton about MDX. Frontmatter shape mirrors about-spec
Appendix B exactly. The page composes the 10 bands at Task 9.1
via about.astro.

Lead-line (BYTE-LOCKED to PMP §4 row 2):
  "Raised by Saturday morning cartoons and Vercel deployment logs."
scripts/validate_about.mjs (Task 2.1) enforces byte-identity at
build time; drift fails the build.

7 starter beats spanning 1998 (age 8) → 2026 (age 36), composed
as 4 braided + 1 animator + 1 pm + 1 braided pattern:
  - 1998 (age 8)   — braided: coyote sketch + Geocities deploy
  - 2004 (age 14)  — braided: sketchbooks + school-play site
  - 2008 (age 18)  — animator: short film + festival rejection
  - 2012 (age 22)  — pm: first PRD + first stakeholder loop
  - 2018 (age 28)  — braided: products at scale + train sketches
  - 2022 (age 32)  — pm: GPT-4 dropped + the in-betweens insight
  - 2026 (age 36)  — braided: fleet + animation, "both hands"
4 braided > §9.3's minimum of 2 — the load-bearing evidence for
the parallel-lineage thesis. Sean refines prose during the build
session per OPEN-2 default; structural lock is the lane assignments.

Employment state (B-4 aging contract):
  available: true        → RecruiterCallout renders
  current_company: null  → "CURRENTLY @ FREE AGENT" stamp

B-3 annotation hook field retained:
  b3_load_bearing_cel: 4 (Samurai Jack)
The annotation arrow itself is DEFERRED to v2 per spec §1.2;
the field activates the arrow in v1.1 with zero schema work.

Body MDX:
  - B-2 prose: real Sedaris-mode opener (production-ready cold-read
    material) + 1 placeholder for the §10 third paragraph carrying
    "[PLACEHOLDER —" for grep-ability.
  - B-3: <CartoonCanon /> renders the 6 cels from
    src/content/cartoons/ — Task 8.1's content collection.
  - B-4: <BuildingToward> with the §12 direction-of-craft prose —
    real opener + 1 placeholder for the bet-specifics paragraph.
  - B-5: <ProofPoints /> reads URLs from frontmatter.
  - Pull quote: byte-identical to home-hero per §7.2.

The §1.2-deferred decoratives (hand-drawn heading SVGs, signature,
registration marks, pencil annotations) are absent. Plain Newsreader
H2s carry the section heads per the §1.2 substitution row.

Component-shaped strings in body prose are NOT backticked because
they're actual JSX component invocations, not placeholder mentions
(per the Phase 3c.1 MDX gotcha lesson — backticks apply to
prose-mention only, not to live JSX).

Per about-spec Appendix B + §9 + §10 + §12 + §13 + §1.2 + PMP §4 row 2.
EOF
)"
```

---

## Section 9 — Page assembly: `src/pages/about.astro`

The 10-band page route. Reads the about singleton via `getCollection`, composes the bands top-down, wraps in `<BaseLayout>` (full site chrome — nav + footer, NOT `noChrome`).

### Task 9.1: `src/pages/about.astro` + scoped `about.css`

**Files:**
- Create: `src/pages/about.astro`
- Create: `src/styles/about.css`

Per about-spec §2 anatomy + §3 vertical budget + §16 build stack.

- [ ] **Step 1: Write `src/styles/about.css`**

Create `src/styles/about.css`:

```css
/* ----------------------------------------------------------------------
 * src/styles/about.css — /about/ page-scoped layout polish + print
 * Loaded by src/pages/about.astro.
 * Per about-spec §3 vertical budget + §16 build-stack print row.
 * ---------------------------------------------------------------------- */

/* ===== Section spacing (vertical budget per §3) ===== */

.about-page {
  position: relative;
}

.about-page__band {
  padding-top: 60px;
}

.about-page__band--hero {
  padding-top: 60px;
}

.about-page__band--pulse {
  padding-top: 60px;
  padding-bottom: 60px;
}

.about-page__band--beats,
.about-page__band--b2,
.about-page__band--canon,
.about-page__band--b4,
.about-page__band--b5 {
  padding-top: 100px;
}

.about-page__band--pull-quote {
  padding-top: 120px;
  padding-bottom: 80px;
}

/* ===== B-2 + B-4 section heading styles (shared with Beats / CartoonCanon / ProofPoints) ===== */

.about-section {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 24px;
}

.about-section__frame-prefix {
  margin: 0 0 8px 0;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.8px;
  color: var(--amber-mid);
}

.about-section__heading {
  margin: 0 0 32px 0;
  font-family: var(--font-serif);
  font-size: 48px;
  font-weight: 400;
  letter-spacing: -0.2px;
  line-height: 1.1;
  color: var(--teal);
}

.about-section--b2 {
  max-width: 680px;
}

.about-section--b2 p {
  margin: 0 0 24px 0;
  font-family: var(--font-serif);
  font-size: 22px;
  font-weight: 300;
  letter-spacing: -0.2px;
  line-height: 1.5;
  color: var(--ink);
}

.about-section--b2 p:last-child {
  margin-bottom: 0;
}

.about-section--b4 .about-section__b4-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
}

.about-section--b4 .about-section__heading {
  margin-bottom: 0;
}

@media (max-width: 767px) {
  .about-page__band--beats,
  .about-page__band--b2,
  .about-page__band--canon,
  .about-page__band--b4,
  .about-page__band--b5 {
    padding-top: 60px;
  }

  .about-page__band--pull-quote {
    padding-top: 80px;
    padding-bottom: 60px;
  }

  .about-section {
    padding: 0 20px;
  }

  .about-section__heading {
    font-size: 36px;
    margin-bottom: 24px;
  }

  .about-section--b2 p {
    font-size: 18px;
  }
}

/* ===== Print stylesheet — §16 build-stack print row ===== */

@media print {
  .about-page {
    background: none;
  }

  /* Single column — disable any grid layouts */
  .cartoon-canon__grid {
    display: block;
  }

  .cartoon-cel {
    transform: none !important;
    page-break-inside: avoid;
    margin-bottom: 32px;
  }

  /* Print the link URL after each proof-point link (handled in ProofPoints scoped CSS).
     The dateline strip + pulse strip + recruiter callout retain their wire-service
     styling; the editorial sections retain their type scale. */

  .recruiter-callout {
    border: 1px solid var(--ink);
    background: none;
  }

  .pull-quote {
    background: none;
    border-top: 1px solid var(--ink);
    border-bottom: 1px solid var(--ink);
  }
}
```

- [ ] **Step 2: Write `src/pages/about.astro`**

Create `src/pages/about.astro`:

```astro
---
/**
 * /about/ — Sean's human-self surface.
 *
 * Composes the 10-band anatomy from about-spec §2 top to bottom:
 *   1. (BaseLayout dateline / nav / etc. — chrome is on)
 *   2. AboutHero      — lead + character PNG
 *   3. NowPulse       — daily-dated pulse strip
 *   4. Beats          — B-1 stacked beats with lane-tint rule
 *   5. (MDX body: B-2 thesis prose section)
 *   6. CartoonCanon   — B-3 Saturday morning canon (rendered from MDX body)
 *   7. (MDX body: B-4 building-toward prose section with CurrentlyAtStamp + RecruiterCallout)
 *   8. ProofPoints    — B-5 four links (rendered from MDX body)
 *   9. PullQuote      — closing serif italic (rendered from MDX body)
 *
 * Pre-MDX bands (hero + pulse + beats) are assembled here so the
 * <Beats /> component can read the typed beats[] array from the
 * collection entry's frontmatter without going through MDX's
 * generic <slot />. Post-pulse content (B-2 through pull quote)
 * is composed in the MDX body so prose authoring + component
 * rendering interleave naturally.
 *
 * The page renders with FULL site chrome (nav + footer) — NOT
 * noChrome={true} (that's home-only per BaseLayout convention).
 *
 * Source: about-spec-v1.md §2 anatomy + §3 vertical budget + §16.
 */
import BaseLayout from "~/layouts/BaseLayout.astro";
import { getCollection, getEntry } from "astro:content";
import AboutHero from "~/components/about/AboutHero.astro";
import NowPulse from "~/components/about/NowPulse.astro";
import Beats from "~/components/about/Beats.astro";
import "~/styles/about.css";

const aboutEntry = await getEntry("about", "index");
if (!aboutEntry) {
  throw new Error("src/content/about/index.mdx missing — Phase 3d Task 8.2 should have shipped it");
}

const { Content, headings: _headings } = await aboutEntry.render();
const fm = aboutEntry.data;

const pageDescription = fm.description;
---

<BaseLayout title={fm.title} description={pageDescription} ogImage="/og-default.png">
  <main id="main" class="about-page page-sheet">
    <div class="about-page__band about-page__band--hero">
      <AboutHero
        lead={fm.lead}
        characterImage={fm.character_image}
        characterAlt={fm.character_alt}
      />
    </div>

    <div class="about-page__band about-page__band--pulse">
      <NowPulse />
    </div>

    <div class="about-page__band about-page__band--beats">
      <Beats beats={fm.beats} />
    </div>

    <div class="about-page__mdx">
      <Content frontmatter={fm} />
    </div>
  </main>
</BaseLayout>
```

**Note on the `<Content frontmatter={fm} />` invocation:** Astro 5's MDX renderer passes `frontmatter` to the MDX scope as a top-level identifier, so `{frontmatter.current_company}` + `{frontmatter.available}` + `{frontmatter.linkedin_url}` etc. inside the MDX body (Task 8.2) resolve correctly. The `headings` destructure is reserved for a v2 sticky-TOC; v1 ships without one.

- [ ] **Step 3: Verify the page renders 200 OK**

Run: `curl -sI http://localhost:4321/about/ | head -1`

Expected: `HTTP/1.1 200 OK`. If 404, the dev server hasn't picked up `src/pages/about.astro` — restart `npm run dev` and retry. If 500, check the terminal where `npm run dev` runs for the Astro error stack.

- [ ] **Step 4: Verify each band renders in the DOM**

Run:

```bash
curl -s http://localhost:4321/about/ > /tmp/about-page.html
{
  echo "lead:        $(grep -c 'about-hero__lead' /tmp/about-page.html)"
  echo "character:   $(grep -c 'about-hero__character' /tmp/about-page.html)"
  echo "now-pulse:   $(grep -c 'now-pulse' /tmp/about-page.html)"
  echo "beats:       $(grep -c 'beat-row' /tmp/about-page.html)"
  echo "b2-heading:  $(grep -c 'b2-heading' /tmp/about-page.html)"
  echo "canon:       $(grep -c 'cartoon-canon' /tmp/about-page.html)"
  echo "cels:        $(grep -c 'class="cartoon-cel' /tmp/about-page.html)"
  echo "currently:   $(grep -c 'currently-at-stamp' /tmp/about-page.html)"
  echo "btoward:     $(grep -c 'building-toward' /tmp/about-page.html)"
  echo "recruiter:   $(grep -c 'recruiter-callout' /tmp/about-page.html)"
  echo "proof:       $(grep -c 'proof-points' /tmp/about-page.html)"
  echo "pull-quote:  $(grep -c 'pull-quote' /tmp/about-page.html)"
}
```

Expected counts (each should be ≥1):
- `lead:` ≥ 1
- `character:` ≥ 1
- `now-pulse:` ≥ 1
- `beats:` ≥ 7 (one per beat × multiple class refs)
- `b2-heading:` ≥ 1
- `canon:` ≥ 1
- `cels:` ≥ 6 (one per cartoon)
- `currently:` ≥ 1
- `btoward:` ≥ 1
- `recruiter:` ≥ 1 (because `available: true` in MDX)
- `proof:` ≥ 4 (one per link)
- `pull-quote:` ≥ 1

If any band returns 0, the MDX body component invocation isn't resolving — most likely cause is a missing import or a typo in the JSX. Check Task 8.2's MDX imports against the components landed in Sections 4-7.

- [ ] **Step 5: Verify the byte-locked lead line renders**

Run: `curl -s http://localhost:4321/about/ | grep -o "Raised by Saturday morning cartoons and Vercel deployment logs\." | head -1`

Expected: prints the exact string. If empty, the MDX → Astro render isn't passing the `lead` prop through `<AboutHero />` — check Task 8.2's frontmatter + Task 9.1's `<AboutHero lead={fm.lead} … />` invocation.

- [ ] **Step 6: Verify the pull quote echoes the home-hero tagline byte-identically**

Run: `curl -s http://localhost:4321/about/ | grep -o "Product Manager\. The agents handle the loops\. I handle the taste\." | head -1`

Expected: prints the exact string.

- [ ] **Step 7: Verify the production build passes end-to-end**

Run: `npm run build`

Expected: prebuild passes (4 scripts exit 0), Astro build completes with no errors, `dist/about/index.html` exists.

If the build fails with `Expected component X to be defined`, the MDX has bare `<UppercaseTag />` in prose — search the MDX body for any such case and wrap in backticks. (Phase 3c.1 / 3c.2's repeated MDX-gotcha lesson.)

- [ ] **Step 8: Commit**

```bash
git add src/pages/about.astro src/styles/about.css
git commit -m "$(cat <<'EOF'
feat(phase-3d): /about/ page assembly + scoped styles

The /about/ route. Composes the 10-band anatomy from about-spec §2:

  Pre-MDX (assembled in about.astro):
    1. (BaseLayout chrome — nav + footer)
    2. <AboutHero />     — lead + character
    3. <NowPulse />      — daily-dated pulse strip
    4. <Beats />         — B-1 stacked beats with lane-tint rule

  In-MDX (rendered via <Content frontmatter={fm} />):
    5. B-2 section       — thesis prose (1 real Sedaris-mode opener
                           + 1 placeholder for §10's third paragraph)
    6. <CartoonCanon />  — B-3 6-cel grid (reads cartoons collection)
    7. B-4 section       — <CurrentlyAtStamp /> + <BuildingToward />
                           (slot accepts MDX prose) + <RecruiterCallout />
    8. <ProofPoints />   — B-5 four links
    9. <PullQuote />     — closing serif italic, byte-identical to
                           home-hero tagline

Page renders with FULL site chrome (NOT noChrome={true}) — only the
home page uses noChrome per BaseLayout convention.

src/styles/about.css holds the page-scoped layout:
  - Vertical budget per §3 (60px / 100px / 120px band padding)
  - B-2 thesis prose styling (Newsreader 22px weight 300)
  - B-4 header flexbox (heading left, CurrentlyAtStamp right)
  - Print stylesheet (single-column, no transforms, link URLs print)

The about singleton is read via `getEntry("about", "index")` —
Astro 5's typed content-collection accessor. The `aboutEntry.render()`
yields a `<Content />` component that resolves the imports declared
in the MDX file (the 7 import lines at the top of Task 8.2's MDX).

The `headings` destructure is reserved for v2 sticky-TOC; v1 ships
without one (matches /work/ + /transactions/ + /architecture/ +
/essays/ restraint).

Per about-spec §2 anatomy + §3 vertical budget + §16 build stack +
§17 DoD coverage (validated in Section 10).
EOF
)"
```

---

## Section 10 — Smoke + DoD walk + completion mark

### Task 10.1: Full-build smoke tests

**Files:**
- Read-only verification

- [ ] **Step 1: Verify dev server still serves all routes**

Run in parallel (8 curls):
- `curl -sI http://localhost:4321/ | head -1`
- `curl -sI http://localhost:4321/about/ | head -1`
- `curl -sI http://localhost:4321/transactions/ | head -1`
- `curl -sI http://localhost:4321/architecture/ | head -1`
- `curl -sI http://localhost:4321/essays/ | head -1`
- `curl -sI http://localhost:4321/contact/ | head -1`
- `curl -sI http://localhost:4321/work/animation-pipeline/ | head -1`
- `curl -sI http://localhost:4321/404 | head -1`

Expected: each returns `HTTP/1.1 200 OK` (or 404 for `/404` if Astro renders it that way — the body still has the 404 page content). No 500s. Phase 3d does not touch any non-about route; this is a regression-check.

- [ ] **Step 2: Run the production build end-to-end**

Run: `npm run build`

Expected: exits 0. `dist/about/index.html` exists. The prebuild prints the 4 `done.` lines including validate_about's `✓ about: lead-line matches …` + `✓ about: 4 braided beats in beats[] …`.

- [ ] **Step 3: Spot-check the production HTML**

Run:

```bash
test -f dist/about/index.html && \
  grep -c "Raised by Saturday morning cartoons" dist/about/index.html && \
  grep -c "Product Manager. The agents handle the loops" dist/about/index.html && \
  grep -c "CURRENTLY @ FREE AGENT" dist/about/index.html && \
  grep -c "cartoon-cel--break-grid" dist/about/index.html && \
  grep -c "lane-rule" dist/about/index.html
```

Expected: each count ≥1 (the byte-locked lead, the pull quote, the CURRENTLY @ stamp, exactly one break_grid cel marker, ≥7 lane-rule SVG markers — one per beat).

- [ ] **Step 4: Verify the 6 cartoon images are referenced**

Run: `grep -oE "/assets/cartoons/0[1-6]-[a-z\-]+\.png" dist/about/index.html | sort -u`

Expected: 6 unique paths, one per cel (`01-tommy-pickles.png` through `06-jake.png`).

- [ ] **Step 5: No commit**

Verification only.

### Task 10.2: DoD walk-through against about-spec §17

For each item, mark pass / partial / defer:

- [ ] **Item 1 — MDX file exists with full frontmatter per Appendix B**

Verified Task 8.2 + Task 9.1 Step 5. All Appendix B fields present: `lead`, `linkedin_url`, `github_url`, `transactions_url`, `resume_url`, `available`, `current_company`, `character_image`, `character_alt`, `beats[]` (7 entries, 4 braided), `b3_load_bearing_cel: 4`.

Result: ☐

- [ ] **Item 2 — validate_about.mjs runs in prebuild, byte-asserts lead**

Verified Task 2.1 + Task 2.2 + Task 8.2 Step 4.

Result: ☐

- [ ] **Item 3 — Above-the-fold renders the lead as the editorial line + character PNG**

Verified Task 9.1 Step 4 + Step 5. The lead renders as one Newsreader line; the character PNG exists at `/public/assets/character/about-full-body.png`.

Result: ☐

- [ ] **Item 4 — Daily-dated pulse strip reads from real `/api/about-pulse.json`, no `dog_walks` item type, stale-data fallback works**

Verified Task 5.2 + the static JSON's pre-existing schema (no `dog_walks` item type — confirmed at Section 0 Step 5). The fallback path returns the generic line when the file is >48h stale or unparseable.

Result: ☐

- [ ] **Item 5 — B-1 renders 6-8 beats single-column, each with date line + Newsreader body + left-margin lane-tint rule, ≥2 braided beats render the gradient**

Run: `grep -c "lane-rule--braided" dist/about/index.html`

Expected: ≥2 (the validator enforces ≥2 braided beats; the rendered SVG class confirms the gradient state).

Result: ☐

- [ ] **Item 6 — Each B-1 beat lane rule reveals via SVG stroke-dasharray on viewport entry, 200ms after the beat body**

Verified Task 4.1's `<LaneRule />` CSS (transition-delay: 200ms on the .is-revealed trigger). Reduced motion: `prefers-reduced-motion: reduce` block renders the rule solid at final color.

Result: ☐

- [ ] **Item 7 — B-3 renders 6 `<CartoonCel />` entries from src/content/cartoons/ in a 3×2 grid desktop, single-column mobile**

Verified Task 6.1 + Task 10.1 Step 4.

Result: ☐

- [ ] **Item 8 — B-4 renders three surfaces (CurrentlyAtStamp + BuildingToward + RecruiterCallout); aging contract works (zero prose edits when `available: false`)**

Verified Task 7.1 + Task 9.1 Step 4. Aging contract validated by source-reading: changing `available: true` → `false` + `current_company: null` → `"Foo Inc."` in the MDX frontmatter triggers no edits in any prose paragraph; the stamp + RecruiterCallout react automatically.

Result: ☐

- [ ] **Item 9 — B-5 proof points render four mono links**

Verified Task 7.2 + Task 9.1 Step 4.

Result: ☐ [PASS — rev-scribble annotation deferred per §1.2 per spec §17 item 9]

- [ ] **Item 10 — DEFERRED per §1.2**

Pencil annotations + the "this one rewires you" B-3 arrow + the 7-vocabulary system: NONE shipped in v1. The `break_grid: true` Samurai Jack geometry is preserved per §11.3.1 (grid layout, not annotation).

Result: ☐ [PASS — deferred per §1.2 + §17 item 10]

- [ ] **Item 11 — DEFERRED per §1.2**

Handwritten signature SVG: omitted. Page closes at the pull quote; the torn-paper edge into the chrome footer is the page closeout.

Result: ☐ [PASS — deferred per §1.2 + §17 item 11]

- [ ] **Item 12 — v1 substitution: plain Newsreader headings at ~48px tall, weight 400, primary teal, left-aligned, with proper `<h2>` + aria-label**

Verified Task 4.1 (Beats heading) + Task 6.1 (CartoonCanon heading) + Task 7.2 (ProofPoints heading) + Task 8.2 (in-MDX B-2 + B-4 headings) — all 5 B-N section heads render as plain Newsreader `<h2>` at 48px (36px mobile), weight 400, primary teal `#0A3E42`, left-aligned, with `aria-label="B-N: <Section Name>"`.

Result: ☐

- [ ] **Item 13 — Print stylesheet renders clean single-column with link URLs suffixed**

Verified Task 9.1's `src/styles/about.css` `@media print` block + Task 7.2's ProofPoints `@media print` block. Manual test post-build: `Cmd+P` in a browser at `/about/` should render single-column with each proof-point link's href printed in parentheses next to the visible text.

Result: ☐ [PARTIAL — print stylesheet ships v1; visual test is Sean's manual step post-build]

- [ ] **Item 14 — Lighthouse: A11y ≥95, Performance ≥90, Best Practices = 100**

Manual: run Lighthouse against `http://localhost:4321/about/` after build. The page has no client-side JS dependencies beyond two small IntersectionObserver scripts (one in BeatRow, one in CartoonCanon); a11y is honored via `aria-label` + `aria-labelledby` + `aria-hidden` per spec §15.

Result: ☐ [PARTIAL — automated test is Sean's manual step post-build]

- [ ] **Item 15 — Cold-read test: a fresh reader can describe positioning + ≥3 cartoon lessons + ≥1 B-4 bet within 60 seconds**

Manual: Sean recruits a fresh reader; this test is run after Sean rewrites the two `[PLACEHOLDER —]` paragraphs in B-2 + B-4. The structure ships v1; full prose validation is Sean's post-plan.

When `available: true` (v1 ship state), the reader should recall the recruiter italic ("agent fleet config on second conversation") without prompting. When Sean later flips to `available: false`, re-run and confirm the reader does NOT mention employment-seeking.

Result: ☐ [PARTIAL — structure ships v1; prose validation is Sean's post-plan]

### Task 10.3: Note HEAD + commit count

- [ ] **Step 1: Note HEAD + commit count**

Run: `git log --oneline f216926..HEAD | wc -l`

Expected: ~17-19 commits (one per task: 0.1 has no commit; Tasks 1.1, 2.1, 2.2, 3.1, 4.1, 5.1, 5.2, 6.1, 7.1, 7.2, 8.1, 8.2, 9.1 each commit once = 13 substantive commits; the verification Section 10 has no commit).

Actually substantive count: 13 commits.

Run: `git rev-parse HEAD`

Note the SHA. This is the Phase 3d completion mark; Phase 4's plan references it as its baseline.

Run: `git log --oneline f216926..HEAD`

Spot-check that each commit's subject line starts with `feat(phase-3d):` (or `chore(phase-3d):` for any housekeeping). No commit should refer to a different phase by accident.

Result: ☐

- [ ] **Step 2: Confirm we're still on `phase-2-foundations` and NOT pushed**

Run: `git branch --show-current && git status -sb`

Expected: branch `phase-2-foundations`, status shows `ahead N` of `origin/phase-2-foundations` (N = commits this phase landed). NOT pushed — per kickoff prompt: "Stay on branch phase-2-foundations. Do NOT push. Cutover to main is Phase 4."

Result: ☐

---

## Section 11 — What's NOT in this plan (deferrals)

For clarity to the next planning sessions:

| Defer | Spec / Reason | Owner |
|---|---|---|
| Real prose authoring beyond the 1 Sedaris-mode B-2 opener + 1 B-4 direction-of-craft opener | Sean's post-plan authoring pass. Placeholders carry `[PLACEHOLDER —` for grep-ability — `grep "PLACEHOLDER" src/content/about/index.mdx` surfaces every remaining edit. | **Sean post-plan** |
| 5 hand-drawn B-N heading SVGs (b1/b2/b3/b4/b5) per spec §4 + §16 + Appendix A | DEFERRED per spec §1.2 v1 deferral table. v1 substitutes plain Newsreader `<h2>` 48px weight 400 primary teal with `aria-label`. Spec §1.2 documents the full design intent so v1.1 can author + drop in the SVGs with zero DOM-shape changes. | v1.1 (Sean's call) |
| Handwritten signature SVG with stroke-dasharray reveal at page foot | DEFERRED per spec §1.2 + §17 DoD #11. v1 closes at the pull quote; the torn-paper edge into the chrome footer is the page closeout. | v1.1 |
| Registration marks (page closeout bottom-right + B-1 beat-column corner marks) | DEFERRED per spec §1.2. | v1.1 |
| All pencil-margin annotations — §14's 7-vocabulary system (curved arrows, coffee-ring, the "this one rewires you" B-3 arrow, the "the live evidence" rev scribble on /transactions/, mono stamps, kid's drawing scan) | DEFERRED per spec §1.2 v1 deferral table. One exception preserved: Cel 4's `break_grid: true` geometry (§11.3.1) stays because it's grid layout, not annotation. | v1.1 |
| Kid-drawing scan margin artifact | DEFERRED per spec §1.2 + §14 vocab #5. | v1.1 |
| Daily Driver agent writing `/api/about-pulse.json` (producer side) | v1 ships the read-side only; the static JSON is already committed at `public/api/about-pulse.json` with the §8.1 schema. Phase 4 wires the producer at 08:45 daily alongside `dateline.json`, `next-piece.json`, `shipped-stats-<slug>.json`. | **Phase 4** |
| Real pulse content beyond the hand-authored static fallback | The committed JSON is real-shape but hand-authored at Phase 0. When the producer is live (Phase 4), the deploy carries the freshest morning snapshot. | Phase 4 |
| Plausible analytics; Vercel deploy; custom-domain DNS; hard cutover from V3 bridge | BLUEPRINT §6 Phase 4. | **Phase 4** |
| Re-attempting subagent-driven-development dispatch | Phase 2 + 2b + 3a + 3b + 3c.1 + 3c.2 + 3d (this plan) all default to direct controller execution. Re-attempt only if the harness has demonstrably improved between this phase and the next planning session. | Each subsequent planning session re-evaluates |
| Sticky TOC on /about/ | Matches /work/ + /transactions/ + /architecture/ + /essays/ restraint; reading time ≤4min, no need for navigation. | v2 |
| Cross-surface View Transition morphs (about → home, about → /essays/, etc.) | Spec §6 doesn't declare any cross-surface morph targets on /about/; deferring matches the v2 stance taken on the other surfaces. | v2 |
| OG image auto-generation via satori | v1 uses the existing `/og-default.png` from Phase 0. About-specific OG card is a v2 polish item. | v2 |
| `/about/print.html` separate print route | v1 ships a `@media print` block in `src/styles/about.css` + `src/components/about/ProofPoints.astro`. A dedicated print route is over-engineering for the v1 reading-time scale. | v2 |
| Expanding `beats[]` above 8 | Spec §9.2 + Zod schema cap. If Sean later wants more beats, raise the cap in `src/content/config.ts` + re-review section length. | v2 if needed |

---

## Self-review summary

- **Spec coverage:** about-spec §17 items 1-15 are each covered by a verification step in Section 10 (Task 10.2). Items 10 + 11 are explicitly deferred per spec §1.2; item 12 documents the plain-Newsreader-heading substitution as their v1 visual equivalent. The 10-band anatomy from §2 is composed in Task 9.1's `src/pages/about.astro` (bands 2-4 in the Astro shell) + Task 8.2's `src/content/about/index.mdx` body (bands 5-9). The B-1 stacked-beats geometry from §9 lands in Task 4.1 (3 components: `<LaneRule />` + `<BeatRow />` + `<Beats />`). The B-3 Saturday morning canon from §11 lands in Task 6.1 (2 components: `<CartoonCel />` + `<CartoonCanon />`) + Task 8.1 (6 MDX entries) + Task 3.1 (6 PNG assets in `public/`). The B-4 employment-state aging contract from §12 lands in Task 7.1 (3 components: `<CurrentlyAtStamp />` + `<BuildingToward />` + `<RecruiterCallout />`). The B-5 proof-point block from §13 lands in Task 7.2 (`<ProofPoints />`). The closing pull quote per §2 anatomy + §7.2 lands in Task 7.2 (`<PullQuote />`). The hero band per §7 lands in Task 5.1 (`<AboutHero />`). The daily-dated pulse strip per §8 lands in Task 5.2 (`<NowPulse />`). The byte-locked lead-line validator per §16 + §17 DoD #2 lands in Task 2.1 + Task 2.2. The 6-color palette per §5 is honored throughout the components' scoped CSS via `var(--teal)` / `var(--ink)` / `var(--stamp-amber)` / `var(--amber-mid)` / `var(--ink-secondary)` / `var(--border-paper)` references to the existing `src/styles/global.css` token block (Phase 2 carry-over).

- **Open questions resolved:** All 4 OQs from the planning session locked in the header table. OQ-A (asset hosting via `public/` vs. `src/assets/`) → ship via `public/`; matches the locked draft's image paths. OQ-B (plain Newsreader H2 styling for the §1.2 deferred SVGs) → 48px / weight 400 / primary teal / aria-label per spec §1.2. OQ-C (page DOM end) → at the pull quote; signature + reg-mark deferred. OQ-D (validate_about.mjs standalone vs. merged) → standalone script, wired into prebuild after the existing three. All 6 of the about-spec §18 OPEN-N items resolved to spec defaults per the BLUEPRINT §4.4 recommended defaults; OPEN-2 (beat content) ships 7 starter beats Sean refines post-plan; OPEN-3 + OPEN-4 (cartoon canon + authorship) are RESOLVED in-spec as of 2026-05-21; OPEN-6 (heading SVG authorship) is moot in v1 because §1.2 defers all 5 heading SVGs.

- **Placeholders:** Every text Sean will eventually replace is marked `[PLACEHOLDER —` for grep-ability. The B-2 thesis ships with 2 real Sedaris-mode paragraphs + 1 placeholder for the third paragraph. The B-4 BuildingToward ships with 1 real direction-of-craft paragraph + 1 placeholder for the bet-specifics paragraph. All other prose (the 7 beat bodies, the 6 cartoon `lesson_body` strings, the pull quote, the recruiter italic copy, the CURRENTLY @ stamp text, the proof-point link labels) is production-ready as-shipped.

- **MDX gotchas folded in:** The Phase 3c.1 + 3c.2 MDX-gotcha-1 (bare uppercase tags in prose) is acknowledged in the operating-posture lessons block at the top of the plan + reinforced in Task 8.2's commit message. The Task 8.2 MDX itself uses ONLY live JSX component invocations (`<AboutHero …/>`, `<CartoonCanon />`, etc.) — no prose-mentioned `<UppercaseTag />` references that would need backticking. The MDX-gotcha-2 (TypeScript type annotations inside JSX map blocks) doesn't apply — none of the 12 about components build typed arrays inside `.map()` blocks; they all take Props as already-typed function-component args.

- **Type consistency:** The `beats[]` shape (`{ age, year, body, lane }`) is consistent between `src/content/config.ts` (Task 1.1's `aboutBeat`), the validator (Task 2.1's braided-count check), `<Beats />` Props (Task 4.1), `<BeatRow />` Props (Task 4.1), and the about MDX frontmatter (Task 8.2). The cartoon frontmatter shape (`{ order, name, year_range, studio, image, image_alt, lesson_noun, lesson_body, angle?, break_grid }`) is consistent between `src/content/config.ts` (Task 1.1), `<CartoonCanon />`'s `getCollection` consumption (Task 6.1), `<CartoonCel />` Props (Task 6.1, with the camelCase rename at the prop boundary: `year_range → yearRange`, `image_alt → imageAlt`, `lesson_noun → lessonNoun`, `lesson_body → lessonBody`, `break_grid → breakGrid` per Astro convention), and the 6 MDX files (Task 8.1). The employment-state field names (`available: boolean`, `current_company: string | null`) are consistent between schema (Task 1.1), `<CurrentlyAtStamp />` (Task 7.1), `<RecruiterCallout />` (Task 7.1), the MDX frontmatter (Task 8.2), and the in-MDX component invocations (Task 8.2).

- **No new npm dependencies.** The plan uses only Astro 5 + Tailwind 4 + Node 20's built-in `fs` + `path` + `process` modules. `@astrojs/mdx` is the only consumer of the `.mdx` extension and ships from Phase 2. No `astro-mermaid` usage on this page.

- **Forward declarations close cleanly.** The about page is the last surface to land in Phase 3; nothing forward-declared on it. The cross-link graph (transactions ↔ work ↔ architecture ↔ essays) does not extend to /about/ — the about-spec explicitly excludes /about/ from the cross-link graph (§16 build-stack table has no `<RelatedBlock />` entry). The pull quote's byte-identity to the home-hero tagline is enforced by an inline string in `<PullQuote />` — drift catches in a future home-hero rewrite would need a manual lockstep edit, not validator coverage. PMP §4 row 1 is the source of truth for both.

- **Branch state precise:** This plan baselines against `phase-2-foundations` HEAD `f216926` (the most recent tip — Phase 3c.2 substantive completion was `8571df4`, followed by the chore archive commit `f216926`). PR #7 already merged the branch into `main` at merge commit `207ebe1` BEFORE this plan was drafted; that merge represents the spec's Phase 4 cutover step landing early. Per the kickoff prompt's "Stay on branch `phase-2-foundations`. Do NOT push. Cutover to main is Phase 4." instruction, this plan's tasks continue accumulating on `phase-2-foundations`; Phase 4's planning session resolves the post-merge cutover. Each task commits atomically; ~13 substantive commits land between Task 1.1 and Task 9.1.

---

## Phase 4 hand-off prompt

> sw-ai-pm-portfolio — Phase 4 planning. Phases 2 / 2b / 3a / 3b / 3c.1 / 3c.2 / 3d shipped on branch `phase-2-foundations`. The home page + 5 case-study routes + `/transactions/` + `/architecture/` + `/essays/` + `/about/` + `/contact/` + `/404` are all in. The 4-collection content graph closes 4-way via `scripts/derive_crosslinks.mjs`; `astro-mermaid` SSR renders erDiagram + quadrantChart inline; `<MethodsStrip />` + `<FourQBlock />` + `<ThesisPullQuote />` are shared primitives imported across surfaces; the about page's daily-dated pulse strip reads `/public/api/about-pulse.json` at build time via Node fs. PR #7 already merged `phase-2-foundations` → `main` mid-Phase-3d (the Phase 4 cutover landed early); `phase-2-foundations` accumulated Phase 3d on top, so it's one Phase-3d-sized PR ahead of `main`.
>
> Your sole job this session: write the Phase 4 implementation plan via `/writing-plans`. Phase 4 has four parallel-but-coordinated workstreams:
> 1. **Cutover from `phase-2-foundations` → `main`.** PR the Phase 3d commits to `main` (or rebase + merge depending on Sean's preference; the earlier PR #7 was a merge commit). After cutover, `phase-2-foundations` is retired; all future work lands on `main`.
> 2. **Vercel deploy + custom-domain DNS.** Hook up `seanwinslow.com`, the apex + `www` redirect, the SSL cert, the preview-URL workflow. The existing V3 bridge at `seanwinslow.com` needs a coordinated cutover — DNS-flip vs. path-based switchover is the planning question.
> 3. **Plausible analytics.** Wire the script (per the privacy-respecting analytics decision documented in PMP); confirm no GTM, no GA. Surface the dashboard URL.
> 4. **Daily Driver agent extensions.** Producer-side writers for the 4 endpoints already served read-side: `/api/dateline.json` (live), `/api/next-piece.json` (live), `/api/about-pulse.json` (Phase 3d ships read), `/api/shipped-stats-<slug>.json` (Phase 3b ships read for `intent-engineering-mcp`). Extend the morning agent's filesystem-read step to scan `src/content/transactions/*.md` for the `ledger_row` hero-dateline pattern body. No new launchd cron; folds into the existing 08:45 agent run.
>
> Default to direct controller execution. Subagent dispatch has been unreliable through Phase 2 / 2b / 3a / 3b / 3c.1 / 3c.2 / 3d. Mirror the Phase 3d plan structure: header directive, File Structure tree, Section-by-section task list with verbatim file contents, atomic commits per task with HEREDOC commit messages, DoD walk, deferral table, self-review.
>
> Out of scope for Phase 4: any further work on /about/ (shipped v1); any v2 deferrals from /about/ + /architecture/ + /essays/ (all carry their own v2 lists); the Substack publication of Sean's manifesto (Sean owns post-deploy).
>
> Stop after the plan is committed.

---

*Drafted 2026-05-22 from the Phase 3d kickoff prompt. Open Questions A-D resolved in the plan header. Phase 4 (cutover + deploy + analytics + Daily Driver producer) follows in a fresh session. The branch state at plan-write time is `phase-2-foundations` HEAD `f216926`; the plan's tasks land ~13 commits later.*
