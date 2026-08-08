# Portfolio Repositioning Build Plan — statement hero, teaser hook, About v2 (Biesty Cutaway)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline) or superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the 15 locks of the 2026-08-06 partner-session sidecar: statement hero, migrated teaser↔PullQuote lockstep, the content-complete About v2 (paragraph, machinery line, Biesty Cutaway with six pairing-grammar cards, ProofPoints + resume, RecruiterCallout restore), the GSAP ban lift recorded properly, and the docs layer — all on one branch, one PR, never touching `main`.

**Source of truth:** `~/.creative-harness/partner-sessions/2026-08-06-portfolio-about-repositioning.md` (15 locks). The sidecar outranks this plan if they disagree.

**Architecture:** Astro 5 + Tailwind 4 site, statically built; `npm run build` runs a prebuild validate chain (`validate_content` → `fetch_canonical_sources` → `derive_crosslinks` → `validate_about`) that byte-locks copy. About page restructures from the 10-band anatomy to Hero → paragraph → NowPulse+machinery → Biesty Cutaway → ProofPoints → RecruiterCallout → PullQuote. GSAP core + CustomEase enters as the cutaway's choreography engine (MotionPath only in the overture preview); the lockstep contract becomes a shared constant so it can never drift again.

**Tech stack additions:** `gsap` (npm — core, CustomEase; DrawSVG/MotionPath available, all free since the Webflow acquisition), gsap-skills repo cloned into `.claude/skills/`.

---

## 0. Assumptions to confirm at the approval gate

1. **Resume v3 PDF identity.** No file named `*v3*.pdf` exists. `…/prj-job-hunt-2026/assets/2026-RESUME-TO-USE/Sean-Winslow_Resume_AI_PM_2026.pdf` (66 KB) was saved 2026-08-06 15:34, the same minute as `Sean-Winslow_Resume_AI_PM_2026-v3.docx` and `-v3.md` — I read it as the v3 export. **Confirm this is the file to ship**, or point me at the right one.
2. **Hero statement styling.** "AI Product Manager" renders in the existing role-tag slot (mono, under the name) but plain: no `/` prefix, no forced uppercase — `AI Product Manager` as written. The tagline block is removed entirely. Dateline strip + character animation untouched.
3. **Touch / small screens get the floor state.** The cursor lens is a pointer-device interaction; on touch and narrow viewports the cutaway renders the docked six-card grid below the plate (same as reduced-motion/no-JS). The hint line shows only in lens mode. This is my read of the prototype finding; flag if you want tappable hotspots on mobile instead.
4. **Verify-link targets** (all checked for non-404 during build; final URLs may shift to whatever actually resolves):
   | Card | Verify label | Target |
   |---|---|---|
   | Codex | control architecture | `https://github.com/seanwinslow28/code-brain` → `agents-sdk/docs/CONTROL_ARCHITECTURE.md` blob (fallback: on-site `/architecture/` if a matching entry exists) |
   | Gemini | evals/ | code-brain `evals/vault-synthesizer/` blob |
   | Grok | transactions | `/transactions/` (on-site) |
   | Claude | groundwork | groundwork repo on GitHub |
   | Sean | groundwork | groundwork repo on GitHub (different anchor/file than Claude card if available, e.g. the owner-fields spec) |
   | User | code-brain | code-brain discovery council path (`tools/llm-council/council/discovery/`) |
5. **Unused component files are deleted, not orphaned** (Beats, BeatRow, LaneRule, CartoonCanon, CartoonCel, BuildingToward, CurrentlyAtStamp — after a grep confirms no other importer). The `cartoons` content collection and its entries stay (banked content, harmless). The six life beats live on in the sidecar + git history + the anima brief lane; they are not resurrected anywhere on-page.

---

## 1. Branch + safety rails

- Branch: `reposition/about-2026-08` off current `main`. **Never commit to `main`** — Daily Driver auto-deploys it every morning at 08:30 ET.
- Every commit leaves `npm run build` green (the prebuild chain is part of `build`).
- Merge is Sean's call after preview review. The PR body lists the locks each commit executes.

## 2. Locked strings (byte-exact, single source noted)

| String | Where it lives |
|---|---|
| `AI Product Manager` | `Hero.astro` statement |
| `I make agents think the way I do.` | **`src/lib/site.ts` → `export const ABOUT_HOOK`** — imported by `AboutTeaser.astro` and `PullQuote.astro`. Byte-identical by construction; the old comment-contract (which drifted once, see PullQuote audit note 2026-06-10) is retired. |
| `Raised by Saturday morning cartoons and Vercel deployment logs.` | unchanged (`index.mdx` lead + `validate_about.mjs` `LOCKED_LEAD`) |
| The final paragraph (L13, verbatim — see Task C3) | `index.mdx` body; byte-validated by `validate_about.mjs` |
| `Written this morning by an autonomous agent. Validator approved.` | `NowPulse.astro` — rendered **only when the pulse is fresh** (stale/fallback pulse suppresses it; "this morning" must never be a lie) |
| `drag your cursor across the drawing` | `BiestyCutaway.astro` hint line (lens mode only) |
| `if you're hiring around this, my agent fleet config goes out on second conversation.` | `RecruiterCallout.astro` — unchanged |

## 3. Commit sequence

### C1 — motion license: GSAP in, ban lift recorded

**Files:** `package.json`/`package-lock.json` (add `gsap`), `.claude/skills/gsap-skills/` (clone of https://github.com/greensock/gsap-skills.git — skills only, no `.git/`), `DESIGN.md`, `CLAUDE.md`, `CHANGELOG.md`.

- [ ] `npm i gsap` (verify CustomEase/MotionPath/DrawSVG import paths exist in the installed package).
- [ ] Clone gsap-skills into `.claude/skills/` (strip the inner `.git`); note the install in CLAUDE.md's skills-in-play section.
- [ ] **DESIGN.md — "Licensed Motion Registry"** new subsection adjacent to the Licensed-Infinite-Motion Rule: supersedes the "no animation libraries" phrasing; licenses GSAP core + DrawSVG + MotionPath + CustomEase **only where choreography earns it**, names the doctrine ("Alive at rest, honest in motion" — attract layer one-shot on viewport entry, then settle), bans ScrollTrigger scroll-jacking, defers WebGL, keeps Rive/Lottie out, restates the inviolable reduced-motion/no-JS floors (floors show a true final state). Registry table lists each licensed use as it ships — first row: About Biesty Cutaway (core + CustomEase).
- [ ] **CLAUDE.md stack line:** `No Next.js, no GSAP, …` → `No Next.js, no Framer, no Lenis, no CMS. GSAP core + DrawSVG/MotionPath/CustomEase licensed per DESIGN.md Licensed Motion Registry — no ScrollTrigger scroll-jacking.`
- [ ] CHANGELOG entries (DESIGN.md-affecting change recorded under the relevant spec sections per the header rules; supersedes the 2026-06-20 tooling-research verdict *with* its kill-switch honored: no scrubber hidden, no passive video replacing interaction).
- [ ] `npm run build` green → commit `feat(motion): license GSAP per 2026-08-06 sidecar L4/L5 — registry, stack line, gsap-skills`.

### C2 — home surface: statement hero + teaser hook + lockstep migration

**Files:** `src/lib/site.ts`, `src/components/hero/Hero.astro`, `src/components/home/AboutTeaser.astro`, `src/components/about/PullQuote.astro`, `docs/specs/PORTFOLIO-MASTER-PLAN.md` §4, `CLAUDE.md` locked-decisions table, `CHANGELOG.md`.

- [ ] `site.ts`: add `export const ABOUT_HOOK = "I make agents think the way I do.";`
- [ ] `Hero.astro`: delete the `.hero-tagline` block + its keyframes/delays; `ROLE` line becomes the plain statement (`AI Product Manager`, no slash, no `text-transform: uppercase` — keep the mono treatment and entrance timing). Dateline + CharacterLane untouched.
- [ ] `AboutTeaser.astro`: `EDITORIAL_LINE` → `ABOUT_HOOK` import. Eyebrow + beat + CTA (`→ READ THE FULL ABOUT` = the read-more affordance) survive.
- [ ] `PullQuote.astro`: quote renders `ABOUT_HOOK`; contract comment rewritten — lockstep is now teaser↔PullQuote via the shared constant (L6); notes the old hero↔PullQuote contract superseded, not silently deleted.
- [ ] PMP §4: row 1 marked SUPERSEDED 2026-08-08 (statement hero, sidecar L6) with the old line preserved in the table; new rows for the hero statement + the teaser/PullQuote hook; the old teaser editorial line (`A man, a pencil, an agent fleet. Same person, different tools.`) marked superseded in the same pass.
- [ ] CLAUDE.md locked-decisions quick-reference rows updated to match.
- [ ] CHANGELOG entries under hero-spec + home-about-teaser-spec + PMP sections.
- [ ] `npm run build` green; browser-preview the home page (dateline, character, statement, teaser) → commit `feat(home): statement hero + teaser hook, lockstep migrated to teaser↔PullQuote (L6)`.

### C3 — About restructure: paragraph, machinery line, band demolition, RecruiterCallout, schema + validators

**Files:** `src/content/about/index.mdx`, `src/pages/about.astro`, `src/content/config.ts`, `scripts/validate_about.mjs`, `src/components/about/NowPulse.astro`, `src/styles/about.css`, deletions per Assumption 5, `CHANGELOG.md`.

- [ ] `index.mdx` frontmatter: drop `beats[]` + `b3_load_bearing_cel`; keep lead/meta/proof-point URLs/employment state/character. `reading_time` → 2.
- [ ] `index.mdx` body becomes exactly: the paragraph (below, verbatim) → `<NowPulse />` → `<ProofPoints … />` (the `<BiestyCutaway />` band is inserted between NowPulse and ProofPoints in C4) → `<RecruiterCallout visible={frontmatter.available} />` → `<PullQuote />`. The paragraph is the page's only prose:

  > I studied film in college and taught myself animation in my parents' basement. I managed teams in studios and timelines in editing software. One day, I played around with generating images and my whole world changed. I fell down the AI rabbit hole and never looked back. I was suddenly deep into product meetings, agentic frameworks, and prototypes. Now I spend my days building agent systems and holding them to the same bar I held my drawings to. It ships when it's right.

- [ ] `about.astro`: renders AboutHero only, then `<Content />` (NowPulse moves fully into MDX so the paragraph can sit between hero and pulse). Band-wrapper divs pruned accordingly; `about.css` band styles for dead bands removed.
- [ ] `NowPulse.astro`: machinery line `Written this morning by an autonomous agent. Validator approved.` as a second mono line, rendered only when `updatedTime` is non-null (fresh pulse).
- [ ] `config.ts` about schema: remove `beats`/`aboutBeat`/`b3_load_bearing_cel`.
- [ ] `validate_about.mjs`: keep the lead byte-check; **replace** the braided-beats assertion with a paragraph byte-check (the full L13 text, whitespace-collapsed, must appear in the MDX body) so the page's one paragraph is as drift-proof as the lead.
- [ ] Delete Beats/BeatRow/LaneRule/CartoonCanon/CartoonCel/BuildingToward/CurrentlyAtStamp after `grep -r` confirms no remaining importers.
- [ ] CHANGELOG: about-spec section — anatomy v2 entry (bands killed with the sidecar locks cited; beats banked in the anima brief lane, not deleted history).
- [ ] `npm run build` green → commit `feat(about): v2 anatomy — paragraph, machinery line, bands demolished, RecruiterCallout restored (L11–L14)`.

### C4 — the Biesty Cutaway

**Files:** `src/assets/about/biesty-plate.png` (optimized copy of `anima/briefs/2026-08-02-about-me-short/art-viz/route-c--gpt-ref.png`, 2688×1520 — pre-compressed so the repo doesn't carry 8.5 MB; Astro `<Picture />` emits responsive webp), `src/components/about/BiestyCutaway.astro`, `src/scripts/biesty-cutaway.ts`, `src/styles/about.css`, `CHANGELOG.md`, DESIGN.md registry row (added in C1, confirmed accurate here).

**Structure (progressive enhancement — the floor is the markup):**
- Server-rendered: full-bleed plate (`<Picture />`, descriptive alt), hint line, and the **six cards in a docked grid BELOW the plate** (the prototype-tested floor — cards never cover the drawing). Each card: mono header, 1–2 serif sentences (fleet-real only, never the drawing), mono number line, verify link.
- JS + `pointer: fine` + no `prefers-reduced-motion`: grid hides; six hotspot `<button>`s (keyboard-focusable, `aria-expanded`/`aria-controls` onto the card nodes) activate lens mode — cursor lens follows pointer (GSAP `quickTo`), glow-on-approach near hotspots, click peels the card open over an iris dim (GSAP timeline + CustomEase house curve), Esc/click-out closes. One-shot attract on viewport entry (single lens pulse), then settle.
- Touch / narrow / reduced-motion / no-JS: the docked grid, full stop. Hint line hidden.
- The slot accepts the anima short film later without restructuring: the plate lives in one `<div class="cutaway-plate">` wrapper the film swaps into; hotspot geometry is a data table, decoupled from the media.

**Hotspot geometry** (percent of plate, tuned with eyes on the render during build; PROBLEM! TV = furniture, no hotspot):

| Region | Center ≈ | Card |
|---|---|---|
| USER in doorway | 6.5%, 42% | THE PROBLEM MUST BE REAL |
| Codex cloud / blackboard | 28%, 36% | NOTHING ACTS UNASKED |
| Claude plush / paper stack | 20%, 78% | EVERYTHING HERE CAN DIE |
| Sean, center, palms out | 48%, 52% | HUMANS GET THE LAST WORD |
| Gemini star / concept wall | 64%, 43% | THE EVAL DECIDES WHAT SHIPS |
| Grok gremlin / sledgehammer | 76%, 45% | THE MONEY MOVES FIRST |

**Card content** (scratch per sidecar L9/L10; final language via the voice chain — Task 5 — polish, don't rewrite; number lines verbatim from the locks):

| Header (mono) | Number line | Verify |
|---|---|---|
| NOTHING ACTS UNASKED | `$0 per decision` | control architecture |
| THE EVAL DECIDES WHAT SHIPS | `1/10 → 7/10` | evals/ |
| THE MONEY MOVES FIRST | `cap $0.60/run` | transactions |
| EVERYTHING HERE CAN DIE | `30-turn cap` | groundwork |
| HUMANS GET THE LAST WORD | `5 fields · 0 invented` | groundwork |
| THE PROBLEM MUST BE REAL | `every pain point → a real source` | code-brain |

- [ ] Optimize + place the plate asset; verify rendered weight (target ≤ ~400 KB largest variant).
- [ ] Build component + client script per the structure above; GSAP imports code-split to the about page only.
- [ ] Verify every verify-link resolves (curl 200 / on-site route exists) — never ship a 404.
- [ ] Copy rules check: no em dashes; cards never mention the drawing (never explain the joke); "fleet" appears in at most one card body across the set (ration).
- [ ] `npm run build` green; browser-preview lens mode, keyboard operation, floor state (JS off + reduced-motion + narrow viewport) → commit `feat(about): Biesty Cutaway — six pairing-grammar cards, lens interaction, docked floor (L7–L10)`.

### C5 — resume + PRODUCT.md compass + master-plan sync

**Files:** `public/resume/sean-winslow.pdf`, `PRODUCT.md`, `docs/specs/PORTFOLIO-MASTER-PLAN.md` §4 (+ §3 stack/motion touchpoints), `CHANGELOG.md`.

- [ ] Copy the confirmed resume v3 PDF → `public/resume/sean-winslow.pdf`; build; verify the ProofPoints RESUME row now renders and the link serves the PDF.
- [ ] PRODUCT.md: new short "Internal compass (never on-page)" note carrying the Kusanagi line verbatim + the rule that on-page copy derives from it with no "became" framing (parallel-lineage rule unchanged).
- [ ] PMP §4 sweep for any remaining superseded rows this build touches; §3/§6 motion-stack sentences aligned with the registry.
- [ ] CHANGELOG entries.
- [ ] `npm run build` green → commit `feat(about): resume v3 shipped; docs — compass line, PMP sync (L3, L14)`.

### C6 — voice-chain pass (run from code-brain, edits land here)

- [ ] Run `writing-critique` + `writing-humanity-pass` over: the six card bodies, the machinery line, the hint line, the teaser hook, and the paragraph (paragraph + card content are Sean-approved — **polish, don't rewrite**; the paragraph is byte-locked, so any chain finding on it is reported to Sean, not applied).
- [ ] Apply polish-level edits to card bodies only; re-run `npm run build` (validators catch accidental drift of locked strings) → commit `polish(about): voice-chain pass over cutaway cards + machinery/hint lines`.

### C7 — entry-overture preview (decision artifact, not shipped by default)

**Where it falls: after C4** (needs the plate + hotspot geometry live), built in parallel with C5/C6, presented with the PR preview.

- [ ] Branch-only page `/labs/overture/` (noindex, unlinked): one drawn parcel travels the scene through the four gates in causal order — reserve (Grok region) → propose (Codex region) → judge (Gemini region) → human (Sean, palms out) — GSAP MotionPath, under 20 s, one-shot, then free-roam lens. Reduced-motion: skipped entirely.
- [ ] Sean rules with eyes on it: **yes** → integrate as the cutaway's one-shot entry (viewport-entry trigger, floors untouched) in a follow-up commit + registry row; **no** → the page is deleted before merge. Either way the decision is recorded in CHANGELOG + the sidecar's successor session notes.

## 4. Verification before merge

- [ ] `npm run build` green from a clean checkout of the branch.
- [ ] Browser pass: home (statement hero, dateline, character, teaser hook), about (full v2 order), lens interaction, keyboard-only run, `prefers-reduced-motion` run, JS-disabled run, mobile viewport, print stylesheet sanity on ProofPoints.
- [ ] Template-trap check: does any surface now read luxury-minimal? (Dateline + character + comedic cards are the guards; if trimmed, stop and say so.)
- [ ] Copy sweep: zero em dashes outside wire-service mono surfaces; no "became" framing anywhere on-page.
- [ ] PR opened with lock-by-lock mapping; Sean merges after Vercel preview review.

## 5. Deliberately out of scope (per sidecar L15 + kickoff)

Groundwork project page; five 4Q recuts; Higgsfield video (waits for the film slot); which surface gets the motion doctrine next (case-study explainers are queued per wwf5d rt3 — separate decision round).
