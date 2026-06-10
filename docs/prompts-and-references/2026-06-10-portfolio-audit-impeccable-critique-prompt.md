# Kickoff Prompt — Full Portfolio Audit + Impeccable Design Critique

**Authored:** 2026-06-10 · **Target runner:** Claude Code (Fable 5 / your best model) inside `sw-ai-pm-portfolio/`
**Goal:** one launch-grade pass that makes the portfolio *bug-free and rock-solid* AND *makes a hiring manager lean in*. Technical bug audit + `impeccable` design critique, reconciled into one prioritized report, with safe fixes applied on a new branch.

### How to use this
1. Open Claude Code in the portfolio repo root (`/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`).
2. Make sure the `impeccable` skill is installed (it's global in `~/.claude/`). Confirm the slash command resolves before running, e.g. type `/imp` and check it autocompletes.
3. Copy **everything below the line** into Claude Code and run it. It is self-contained.
4. It works on a new branch and hands you a diff + a written report — nothing lands on `main`.

> The prompt deliberately front-loads the diagnostic discipline from your two prior critique post-mortems (5/30, 6/1), because the most expensive mistakes last time were *false findings off a stale/dev-server artifact*, not missed bugs. Read those two post-mortems if you want to know why each guardrail exists.

---

──────────────────────────────────────────────────────────────────────────
COPY FROM HERE
──────────────────────────────────────────────────────────────────────────

You are a senior **design engineer + QA lead** running a launch-grade audit of my AI-PM portfolio. You have taste *and* a debugger. Your job has two halves that you will reconcile into one report:

1. **Technical audit** — find every real bug, regression, broken link, accessibility failure, performance cost, and silent-data defect. Zero hand-waving; every finding carries reproducible evidence.
2. **Design critique via the `impeccable` skill** — judge the craft against my own design system and against the bar of "a recruiter who scans this for 10 seconds wants to talk to me ASAP." Find where it can shine, delight, and out-class every other PM portfolio — *without* breaking the discipline that makes it mine.

Then you implement the **safe, spec-conformant fixes** on a new branch and hand me a written report plus a diff. You do **not** touch `main`.

<mission_context>
This is Sean Winslow's AI-PM portfolio (Astro 5 + Tailwind 4, deployed to Vercel at seanwinslow.com). The positioning it must prove: *a creative who learned to think like a product manager, and who ships with an agent fleet.* It is a job-hunt asset; the only metric that matters is "does a hiring manager believe the positioning and want a conversation."

**The three load-bearing things — never weaken one in the name of polish:**
1. **The character** — Sean's hand-drawn pencil-test self (hero WebM, About cels, case-study close-outs). The load-bearing wall.
2. **The voice** — comedic, specific, self-deprecating, editorial. Calibrated via `.claude/skills/writing-voice-modes`.
3. **The daily-dated layer** — real autonomous agent-fleet activity (dateline, pulse strip, shipped-stats, agent feed) dated to the morning it was written. The unfakeable differentiator. Framing is "real and dated," never "streaming." **The honesty is the load-bearing part.**

**The template trap (the failure mode this whole build exists to defeat):** every prior attempt drifted toward either (a) the *design-system-viewer* (swatch rows + type samples + component cards) or (b) the *luxury-minimal-PM-portfolio* (minimal serif + abstract gradients + "VISION MEETS VELOCITY"). Before you propose ANY enhancement, ask: *is this drifting toward either template, or is it unmistakably Sean?* If it's a template move, kill it.
</mission_context>

<read_first>
Before touching anything, read these in order and treat them as ground truth (your opinions defer to them):
- `CLAUDE.md` — orientation + locked decisions.
- `DESIGN.md` — the design-system encoding. This is the constitution. Its "Named Rules" and "Don't" list are hard constraints, not suggestions.
- `.impeccable/design.json` — the machine-readable design system the `impeccable` detector scores against.
- `docs/post-mortems/2026-05-30-impeccable-critique-pre-vercel.md` and `docs/post-mortems/2026-06-01-impeccable-critique-launch-readiness.md` — the two prior critiques. **Read the "Lessons" / "What we learned" sections carefully — they encode the diagnostic discipline below and list issues already dismissed as intentional.**
- Skim `docs/specs/PORTFOLIO-MASTER-PLAN.md` and the relevant `docs/specs/*-spec-v1.md` only when a finding needs adjudication.
- `git log --oneline -40` — note what changed since the 6/1 critique (RSS endpoints, content guardrails, new transactions ledger rows, the mobile-hero true-alpha fix). **Those surfaces have never been critiqued — weight them.**
</read_first>

<operating_rules>
These exist because the last two critiques' worst findings were false positives off bad artifacts. Violating these wastes my time on phantom bugs.

1. **Rebuild before you diagnose. Never diagnose off the dev server.** All visual, timing, animation, and layout claims must be measured against a fresh `npm run build` + `npm run preview`. `astro dev` runs an HMR loop that freezes the once-per-session loading overlay and restarts entrance animations — it produced two bogus "ship-blockers" last time. Never reuse hand-me-down screenshots; capture your own against the preview build.
2. **A green build is NOT a finished page.** The dangerous defect class here is *silent*: valid-but-incomplete data (an empty `excerpt` rendering a void card), and authored-but-unwired assets (OG cards on disk but not passed to `BaseLayout`, fonts "optimized" but still CDN-fetched). The build stays green while the page is wrong. Inspect rendered `dist/` HTML and the live preview DOM + network tab, not just exit codes.
3. **Read the frontmatter / decision record before flagging a "leak."** Many apparent defects are documented intentional decisions. Already adjudicated and OFF the table unless you have new evidence: em dashes in *wire-service* surfaces (datelines, ledger captions, methods strips, Daily-Driver body) are intentional newspaper typography; wide letter-tracking on uppercase JetBrains Mono labels is intentional; the `meaning-over-access` essay's DRAFT/future-date staging is intentional per the ship plan; the home's no-nav vs sub-page sticky-nav split is intentional. If you think one of these is now wrong, argue it with fresh evidence — don't re-flag it reflexively.
4. **Verify every fix against the symptom a human would see, not the proxy.** HTTP 200 is not proof an image renders — `naturalWidth > 0` on the live page is. Close the loop on the actual rendered symptom.
5. **Trust converging signals; ground-truth lone ones.** If two independent reviewers flag the same thing, it's likely real. A single reviewer's structural claim is a *hypothesis* until you reproduce it on the fresh build. Label confidence on every finding.
6. **Respect the locked design system.** `DESIGN.md` bans, in force: no third typeface beyond Newsreader + JetBrains Mono + the Caveat annotation accent; no `#000`/`#fff`; no gradients on the teal chrome; no `background-clip:text` gradient text; no decorative `backdrop-filter: blur()` / glass cards; no `border-left`/`border-right` > 1px colored side-stripes; sharp corners by default (only `2px` on status pills); flat by default (depth comes from torn-paper PNG edges + z-stacking, never decorative shadow); one splash color per section; light mode only (no dark-mode anything). A "delightful animation" that breaks one of these is a regression, not a delight.
7. **Do not touch the daily-dated data contract.** `public/api/*.json` (dateline, next-piece, about-pulse, shipped-stats) is written by the external Daily Driver agent and read at build time. Don't fabricate, hardcode, or "freshen" it. If you find a *coherence* bug (e.g. two different "today"s across surfaces, or stale data labelled "TODAY"), report it — the fix is a single date source + honest-staleness fallback, never invented numbers.
8. **Don't edit spec files to match the code.** Spec changes get logged in `CHANGELOG.md` per repo convention. Flag spec/code drift; don't silently reconcile it.
9. **Branch, don't merge. Stay off `main`.** Vercel auto-deploys `main` and the Daily Driver commits to it every morning.
10. **Clean up after yourself.** Browser-review sub-agents littered ~22 screenshots into the repo root last time. Write all scratch (screenshots, logs, agent notes) to a `.audit-scratch/` dir (gitignored or deleted at the end). The repo must be clean except for your branch's intentional changes.
</operating_rules>

<workflow>
Run these phases in order. Use a TODO list to track them. Each phase gates the next.

**Phase 0 — Orient + branch.**
- Read everything in `<read_first>`. Confirm the `impeccable` slash command is available; if not, you will apply its methodology manually from `.impeccable/design.json` + `DESIGN.md` (say so in the report).
- `git checkout -b audit/2026-06-10-impeccable-fable` and confirm a clean working tree.
- Create `.audit-scratch/` for all scratch output.

**Phase 1 — Clean build + technical bug sweep.** (Fresh artifact is mandatory — Rule 1.)
- `nvm use` (Node 22) → `npm ci` if needed → `npm run build`. Capture every warning, not just errors.
- `npx astro check` for TypeScript / content-schema errors.
- `npm run validate` and confirm the prebuild chain (`validate_content`, `fetch_canonical_sources`, `derive_crosslinks`, `validate_about`) all pass; note any network-fragile steps.
- `npm run preview`, then sweep against the preview build (dismiss the LoadingOverlay via `sessionStorage` so you see the settled state):
  - **Every route** (`/`, `/work` + each `/work/<slug>`, `/transactions` + ledger detail + `/transactions/<surface>`, `/architecture` + detail, `/essays` + detail, `/about`, `/contact`, `/404`, all three `rss.xml`). For each: console errors/warnings, failed network requests, broken internal links, missing/empty rendered content (the silent-data class — empty cards, dangling "—", `naturalWidth 0` images), broken View Transitions, broken Mermaid renders.
  - **Responsive:** desktop 1440×900 + mobile 390×844. Check the hero value prop is within the fold on both, tap targets, no horizontal scroll, the mobile-hero true-alpha fix holds.
  - **Accessibility:** heading-order (no skipped levels), color contrast against the real palette, focus-visible states, keyboard nav, `alt` text, `aria-current` on nav, reduced-motion fallbacks actually drop transforms.
  - **Performance:** run Lighthouse against preview (target ≥95). Flag oversized assets (last time a 5.4MB cel shipped), un-lazy images, layout-shift, CDN font fetches (fonts must be self-hosted via `@fontsource` — zero `gstatic`/`googleapis` requests).
  - **Daily-dated coherence (Rule 7):** confirm every "today/updated/TODAY" label across surfaces resolves to one coherent date and nothing stale is labelled current.
  - **Voice/format conformance:** check rendered editorial prose for em dashes that violate the `DESIGN.md` ban (allowlist the wire-service surfaces in Rule 3). Note whether an em-dash lint exists in `prebuild`; if not, that's a recommendation, not a silent fix.

**Phase 2 — Impeccable design critique.**
- Run `/impeccable critique` on the site (point it at the `npm run preview` URL, not dev). If the skill orchestrates its own browser reviewers + deterministic detector, let it; if not, run the methodology yourself:
  - Spawn **2–3 independent design-reviewer sub-agents in parallel**, each given `DESIGN.md` + `.impeccable/design.json` and asked to review the live preview cold. Reconcile their findings (Rule 5: converging = trust, lone = ground-truth). This parallel-reviewer reconciliation is the model's strength — use it.
  - Score the standard axes: **Nielsen's 10 heuristics** (give a number, e.g. 36/40, with per-heuristic notes), an **AI-slop / anti-pattern verdict**, **color-strategy** (confirm it reads as the intended *Committed-teal*, not a drifted Restrained accent), **type hierarchy** (step ratios ≥1.25×, two-font discipline intact), **identical-card-grid** check, and **Emil-style motion review** (UI interactions <300ms; one-shot page-load reveals may run longer; no persistent ambient animation on decoration the user sees 1000+ times; start states `scale(0.95–0.97)` not `scale(0)`; layout-property animation `width/height/margin` is banned → must be `transform`/`opacity`).
- For each design finding, capture the same evidence rigor as Phase 1: selector/route, what's wrong, why it matters *to a recruiter*, the fix, confidence.

**Phase 3 — Recruiter-conversion lens.** (The half generic critiques miss.)
- Adopt the persona of **an AI/Tech-PM hiring manager with 40 tabs open**. Do two timed passes on the live preview:
  - **10-second triage:** above-the-fold only. Does the positioning land instantly? Is there a single "huh, that's different" hook? What would make them close the tab?
  - **2-minute read:** hero → one case study → About. Where does belief build? Where does doubt creep in ("is this real / did AI write this / is this a template")? What is the single highest-leverage change that converts a skim into a "we need to talk to this person"?
- Output a short ranked list of conversion levers, separate from bugs.

**Phase 4 — Implement safe fixes; propose the rest.**
- **Implement on the branch** (no permission needed): real bugs, a11y failures, broken links, silent-data/empty-render defects, authored-but-unwired assets, performance fixes (asset weight, lazy-load, font self-hosting), and editorial-prose em-dash conformance — anything fully inside the locked system.
- **Propose, don't unilaterally build,** anything that touches a locked design decision, the voice, the data contract, or adds new motion/components. Present these as a **menu** (Phase 5) with effort + risk + a one-line "why this is Sean, not a template" justification each. Build the low-risk delights only if they're unambiguously inside `DESIGN.md`.
- Verify each fix against the human-visible symptom (Rule 4) and re-run `npm run build` green after the last change.

**Phase 5 — Report + handoff.**
- Write the report (format below). Re-confirm a clean build, clean working tree (scratch removed), and that nothing landed on `main`.
- Print a terminal summary: branch name, counts by severity, what you fixed vs. what's waiting on my call, and the headline recruiter-conversion lever.
</workflow>

<output_format>
Write the report to `docs/audits/2026-06-10-fable-impeccable-audit.md` (create the dir). Structure:

1. **Verdict** — 2–3 sentences. Ship-ready? Closest thing to a blocker? The one change with the most upside.
2. **Scorecard** — Nielsen score, anti-pattern/AI-slop verdict, color-strategy + type + motion check results, Lighthouse scores per route. A small table.
3. **Findings**, grouped P0 → P3. Each finding is a row/block with: `ID · title · severity · confidence · route/selector · evidence (what you measured) · why it matters (recruiter framing) · fix · status (FIXED / PROPOSED / DISMISSED-with-reason)`.
4. **Recruiter-conversion levers** — the ranked list from Phase 3.
5. **Delight menu** — proposed enhancements not yet built, each with effort/risk and the "why this is Sean, not a template" line.
6. **What's strong — keep these.** Be specific; this protects the load-bearing things from a future session "improving" them away.
7. **Dismissed findings** — things that looked like bugs but are documented/intentional, with the evidence that cleared them (so the next critique doesn't re-flag them).
8. **Changes applied** — file-by-file summary of what landed on the branch + the CHANGELOG entries you wrote.

Keep it skimmable: tables and tight prose, no filler.
</output_format>

<examples>
A well-formed finding (the rigor bar):

<example>
ID: P1-03 · Empty Investigation-Board cards render as void frames
Severity: P1 · Confidence: High (reproduced on fresh preview, 3 routes)
Route/selector: /work/code-brain, /work/the-block — `<BoardArtifact>` polaroids
Evidence: 7 cards pass only `boardLabel`; rendered DOM shows a single amber title over a 180px empty box with a trailing "—". Worst on 390px where the voids dominate the column. Build was green — props are optional in the schema, so nothing failed.
Why it matters: reads as a broken data binding to the exact person who matters; triggers the "is this real?" doubt the site exists to defeat.
Fix: author a terse board-voice `excerpt` for each of the 7 cards (distinct from the caption). Add a `validate_content.mjs` rule requiring `excerpt` OR `ticketKey`+`ticketTitle` so it can't regress.
Status: FIXED — verified excerpts render in dist on both routes; build green.
</example>

An anti-example — how to handle a finding that turns out intentional (do NOT auto-fix):

<example>
Apparent issue: "Hero buries the value prop under ~510px of empty teal; H1 stuck at opacity 0."
Correct handling: this was a FALSE finding last time — caused by inspecting the HMR-thrashing dev server + a stale screenshot. Ground-truth on a fresh `astro build` + `astro preview` with the overlay dismissed: h1 settles at opacity 1, top ~154px, value prop within the fold on desktop and mobile. → DISMISSED, with the measurement as evidence. Do not "shrink the teal stage."
</example>
</examples>

<validation>
Before you present the report, self-check:
- Every visual/timing/animation claim was measured on a fresh `npm run build` + `npm run preview`, never `astro dev`. (If any wasn't, re-measure or drop it.)
- Every finding has reproducible evidence and a confidence label; lone structural claims were ground-truthed.
- No fix violates a `DESIGN.md` Named Rule or the "Don't" list; no third font, glass, gradient text, side-stripe, or chrome gradient was introduced.
- Nothing in `public/api/*.json` was fabricated or hardcoded.
- The three load-bearing things are intact or strengthened, never weakened.
- Build is green, working tree clean, scratch removed, nothing on `main`.
- Re-read each dismissed item: did I check the frontmatter / post-mortems before clearing or re-flagging it?
Then present the report and the terminal summary.
</validation>

──────────────────────────────────────────────────────────────────────────
COPY TO HERE
──────────────────────────────────────────────────────────────────────────
