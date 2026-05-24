h# seanwinslow.com v1 Launch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship seanwinslow.com v1 to production by Tue 5/26 AM (Mon 5/25 EOD if Sun closes Pass A ahead of schedule), passing all 5 Task 1 verification criteria + the Phase 3F acceptance criteria + Sean's no-template-feeling gut-check.

**Architecture:** Three-phase rollout. Phase 3F (today + Mon) closes content + console + funnel + polish; Phase 4 (Mon late or Tue AM) ships production deploy + apex DNS + LinkedIn refresh; Phase 4E (Wed–Fri) absorbs v1.1 stretch (ledger gap + Daily Driver cron). The two long poles — case-study writing (Pass A2.a, 5 case studies) and tile-media authoring (Pass B3, 5 tiles) — run via `superpowers:subagent-driven-development` parallelization to compress the timeline.

**Tech Stack:** Astro 5 + Tailwind 4 · MDX content collections · `.claude/skills/writing-voice-modes` (Sedaris/declarative-thesis/wire-service registers) · `/llm-council` (premium profile, on the 6 highest-leverage prose surfaces only) · `superpowers:systematic-debugging` (Cursor.tsx fix) · `superpowers:subagent-driven-development` (two parallel pools) · Vercel + Cloudflare DNS-only for apex.

**Parent specs (read first, do NOT re-decompose):**
- [docs/specs/SHIP-PLAN-2026-05-23.md](../../specs/SHIP-PLAN-2026-05-23.md) — the launch-encompassing plan (RATIFIED)
- [docs/bugs-changes/phase-3f-ship-ready-plan.md](../../bugs-changes/phase-3f-ship-ready-plan.md) — Phase 3F Pass A/B/C tactical structure
- [docs/superpowers/plans/2026-05-24-project-tile-media-implementation.md](2026-05-24-project-tile-media-implementation.md) — Pass B-B3 tile-media tasks (already decomposed; this plan references, does not re-decompose)
- [docs/superpowers/specs/2026-05-24-project-tile-media-design.md](../specs/2026-05-24-project-tile-media-design.md) — per-tile direction LOCKED
- [docs/specs/PORTFOLIO-MASTER-PLAN.md](../../specs/PORTFOLIO-MASTER-PLAN.md) §3 — voice register per surface
- [CLAUDE.md](../../../CLAUDE.md) — three-load-bearing-things + template-trap warning

---

## File Structure

**Files modified across the plan:**

| Path | Phase | Why |
|---|---|---|
| `src/components/Cursor.tsx` | A1 | Fix React hook-call error (P0 console errors) |
| `astro.config.mjs` | A1, C1 | A1: Vite `optimizeDeps.dedupe` for React. C1: `rollupOptions.manualChunks` for diagram-lib code-split |
| `src/layouts/BaseLayout.astro` (or hero parent) | A1 | Verify `client:*` directive on Cursor island |
| `src/content/work/{animation-pipeline,code-brain,intent-engineering-mcp,the-block,16bitfit}.mdx` | A2.a | Author 5 case studies (opener + 4Q + captions + Slack DMs or cut) |
| `src/content/about/index.mdx` | A2.b | Strip 0 placeholders + author 2 paragraphs (B-2 ¶3 + B-4 ¶2) |
| `src/content/architecture/vault-knowledge-mcp.mdx` | A2.b | Strip vestige `[PLACEHOLDER —]` markers (Q2/Q3/Q4) |
| `src/content/transactions/{intent-engineering-mcp,vault-knowledge-mcp,phase-d-typed-edges}.mdx` | A2.b | Strip vestige markers (Q2/Q3/Q4) |
| `public/api/dateline.json` | A3 | Refresh with today's 5/24 morning Daily Driver fire signal |
| `public/api/about-pulse.json` | A3 | Refresh with today's counts |
| `public/api/next-piece.json` | A3 | Refresh to Vault Scorecard 2026-06-03 |
| `public/api/shipped-stats-intent-engineering-mcp.json` | A3 | Bump `updated_at` if present |
| `src/components/projects/ProjectsSection.astro` (or `ProjectTile.astro`) | B1, C4 | B1: `min-width: 0` on grid child to fix A-3 overflow. C4: trailing-slash on tile hrefs |
| `src/components/teaser/TeaserSwiper.astro` | B2 | Cascade `--card-z-offset` + `--card-y-offset` server-render, `perspective` on parent |
| `src/scripts/teaser-swiper.js` | B2 | Defer/JS-mount fix for cards 2–10 |
| `public/assets/projects/*.webp` (5 files) | B3 | Per [tile-media implementation plan](2026-05-24-project-tile-media-implementation.md) |
| `src/components/hero/CharacterLane.astro` | C2 | Reduced-motion gate: don't mount `<video>` if prefers-reduced-motion |
| `src/content/essays/meaning-over-access.mdx` | C3 | Frontmatter: title-slug match · status enum compliance · date sanity |
| `src/pages/architecture/[slug].astro` | C5 | Spot-check getStaticPaths |
| Repo root | C6 | Delete `hotfix-tear-boundary-current.png`, `audit-*.png` × 17, `.audit-screens/` |
| `CLAUDE.md` | 4D | Status banner update |
| `docs/prompts-and-references/2026-05-13-personal-site-deployment-deferred.md` | 4D | `status: superseded-by-gap-fill-3` + top note |
| `docs/comms/2026-05-26-linkedin-launch.md` | 4D | NEW — LinkedIn copy decision trail |

**Files NOT touched by this plan:** the 2 v1.1 stretch ledger MDXs (vault-synthesizer-eval-suite + substack-drafter), Daily Driver cron config in `~/Code-Brain/code-brain/`, agent-feed footer module.

---

## Pre-flight

### Task 0: Verify baseline + start dev server

**Files:** none — environment check.

- [ ] **Step 0.1: Verify branch + clean status check**

```bash
git -C /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio rev-parse --abbrev-ref HEAD
git -C /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio status --short | wc -l
```

Expected: branch = `phase-2-foundations`. Working-tree change count noted (~18 modified + 17 audit-png + screenshots; this is the pre-plan state we'll commit through across passes).

- [ ] **Step 0.2: Verify `npm run prebuild && npm run build` baseline**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | tail -30
```

Expected: build succeeds. Note any warnings (1.9 MB diagram-lib warning is expected, closes in C1).

If build fails: STOP. Fix the failure before any task below. The plan assumes a green baseline.

- [ ] **Step 0.3: Start dev server in background**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run dev &
sleep 8 && curl -sI http://localhost:4321 | head -1
```

Expected: `HTTP/1.1 200 OK`.

- [ ] **Step 0.4: Commit current Phase 3e wrap + audit-screenshots to a clean checkpoint**

Stage and commit the existing in-flight work as a pre-Pass-A checkpoint so we have a known-good rollback point:

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add -A
git commit -m "$(cat <<'EOF'
chore(phase-3e-wrap): checkpoint in-flight catalog edits + audit screenshots

Captures the working-tree state before Phase 3F Pass A begins:
- 5 catalog page edits (transactions/architecture/essays slug + index)
- ProjectsSection.astro + CharacterLane.astro tweaks
- teaserDeck deck.json swap (03-watercolor-ink → 03-comic-book)
- 17 audit-*.png screenshots from the 2026-05-23 impeccable critique
- 4 new error-screenshot files in docs/bugs-changes/screenshots/
- DESIGN.md + writing-voice-modes skill updates

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds. `git status` is clean after this step.

---

## Pass A — Stop the bleeding (Sun 5/24)

### Task A1: Fix `Cursor.tsx` React hook-call errors

**Skill:** `superpowers:systematic-debugging` — 4-phase root cause.

**Files:**
- Modify: `src/components/Cursor.tsx:1-97`
- Verify (likely modify): `src/layouts/BaseLayout.astro` (find Cursor import + island directive)
- Verify (possibly modify): `astro.config.mjs` (add `vite.optimizeDeps.dedupe` if dedupe is the root cause)

- [ ] **Step A1.1: Reproduce the bug**

Open `http://localhost:4321/` in a browser. Open devtools console. Note all errors. Expected per the impeccable critique: 6 × `Invalid hook call. Hooks can only be called inside of the body of a function component...` + 1 × `TypeError: Cannot read properties of null (reading 'useRef') at Cursor (src/components/Cursor.tsx:25:21)`.

- [ ] **Step A1.2: Find where Cursor is mounted + its client:* directive**

```bash
grep -rn "Cursor" /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/layouts/ /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/pages/index.astro 2>&1 | head -10
```

Look for an `<Cursor client:idle />` or `<Cursor client:load />` import + use. **If no `client:*` directive is present, that's the root cause** — React components without a client directive render server-side and call hooks during SSR, which throws.

- [ ] **Step A1.3: Apply the client directive fix (if missing)**

In the parent file (e.g. `src/layouts/BaseLayout.astro`), ensure the Cursor import + use looks like:

```astro
---
import Cursor from "~/components/Cursor";
---
<Cursor client:idle />
```

Save. The browser should auto-reload via Astro dev server.

- [ ] **Step A1.4: Re-check console**

Refresh `http://localhost:4321/`. Verify devtools console shows **zero hook-related errors**. The Cursor should now render correctly (small dark dot following the cursor) on desktop, and silently no-op on touch / reduced-motion (per `Cursor.tsx:21-25`).

- [ ] **Step A1.5: If errors persist — check React dedupe**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm ls react && npm ls react-dom
```

If multiple React versions are resolved (most common second cause): add to `astro.config.mjs`:

```js
export default defineConfig({
  // ... existing ...
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      dedupe: ['react', 'react-dom'],
    },
  },
});
```

Restart dev server (`npm run dev`). Re-test console.

- [ ] **Step A1.6: If errors STILL persist — apply the vanilla-JS fallback**

Per Phase 3F doc §A1.5: replace `Cursor.tsx` with a vanilla TS implementation. The cursor effect doesn't need React. Implementation outline (only if A1.5 fails):

```ts
// src/components/Cursor.client.ts
const LERP = 0.15, DEFAULT_SIZE = 6, HOVER_DURATION = 160;
const el = document.createElement('div');
el.setAttribute('aria-hidden', 'true');
Object.assign(el.style, {
  position: 'fixed', top: '0', left: '0',
  width: `${DEFAULT_SIZE}px`, height: `${DEFAULT_SIZE}px`,
  borderRadius: '50%', backgroundColor: '#1A1A1E',
  pointerEvents: 'none', zIndex: '800', mixBlendMode: 'difference',
  transition: `width ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), height ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`,
  marginLeft: `${-DEFAULT_SIZE/2}px`, marginTop: `${-DEFAULT_SIZE/2}px`,
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(pointer: coarse)').matches;
if (!reducedMotion && !isTouch) {
  document.body.appendChild(el);
  let tX=0, tY=0, cX=0, cY=0;
  addEventListener('mousemove', (e) => { tX = e.clientX; tY = e.clientY; });
  function tick() {
    cX += (tX-cX)*LERP; cY += (tY-cY)*LERP;
    el.style.transform = `translate3d(${cX}px, ${cY}px, 0)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
```

In `BaseLayout.astro` replace `<Cursor client:idle />` with:

```astro
<script>import "../components/Cursor.client";</script>
```

Delete `src/components/Cursor.tsx`. Re-check console.

- [ ] **Step A1.7: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/components/Cursor.tsx src/layouts/BaseLayout.astro astro.config.mjs 2>/dev/null || true
git add -A  # catches Cursor.client.ts + Cursor.tsx delete if fallback was used
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass A · A1): Cursor.tsx React hook-call errors

Root cause: [client:idle directive missing | React dedupe | vanilla-JS fallback applied — pick the one that landed].

Resolves 7 console errors on / per the 2026-05-23 impeccable critique:
- 6× Invalid hook call
- 1× TypeError: Cannot read properties of null (reading 'useRef')

Verification: devtools console clean on / desktop + mobile.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A2.b: Strip vestige `[PLACEHOLDER —]` markers + write 2 About paragraphs

**Files:**
- Modify: `src/content/architecture/vault-knowledge-mcp.mdx` (strip 3 markers from Q2/Q3/Q4)
- Modify: `src/content/transactions/intent-engineering-mcp.mdx` (strip 3 markers from Q2/Q3/Q4)
- Modify: `src/content/transactions/vault-knowledge-mcp.mdx` (strip 3 markers from Q2/Q3/Q4)
- Modify: `src/content/transactions/phase-d-typed-edges.mdx` (strip 3 markers from Q2/Q3/Q4)
- Modify: `src/content/about/index.mdx` (write B-2 ¶3 Sedaris pivot + B-4 ¶2 building-toward bet)

- [ ] **Step A2.b.1: Strip the 12 vestige markers (4 files × 3 markers each)**

For each file, find the 3 lines matching `## What ... ?` followed by a body starting with `[PLACEHOLDER — Q[234]]`. Remove the marker prefix only — preserve the rest of the body verbatim.

Run a find-replace via a one-shot Python pass (safest because it operates per-file with exact line matches):

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
python3 <<'PY'
import re, pathlib
files = [
  'src/content/architecture/vault-knowledge-mcp.mdx',
  'src/content/transactions/intent-engineering-mcp.mdx',
  'src/content/transactions/vault-knowledge-mcp.mdx',
  'src/content/transactions/phase-d-typed-edges.mdx',
]
for f in files:
    p = pathlib.Path(f)
    txt = p.read_text()
    # Match "[PLACEHOLDER — Q2] " / "[PLACEHOLDER — Q3] " / "[PLACEHOLDER — Q4] " at start of paragraph
    new = re.sub(r'\[PLACEHOLDER — Q[234]\]\s+', '', txt)
    if new != txt:
        p.write_text(new)
        print(f'✓ {f}: {txt.count("[PLACEHOLDER — Q")} marker(s) stripped')
    else:
        print(f'  {f}: no markers found')
PY
```

Expected: 4 ✓ rows, total 12 markers stripped.

- [ ] **Step A2.b.2: Verify the strip didn't break content**

```bash
grep -n "PLACEHOLDER" src/content/architecture/*.mdx src/content/transactions/*.mdx 2>&1
```

Expected: zero matches (the 4 files now have no `PLACEHOLDER` markers).

Reload `http://localhost:4321/transactions/intent-engineering-mcp/`, `/transactions/vault-knowledge-mcp/`, `/transactions/phase-d-typed-edges/`, `/architecture/vault-knowledge-mcp/`. Verify the 4Q sections render landed prose, no marker text.

- [ ] **Step A2.b.3: Author About B-2 ¶3 — Sedaris pivot**

The slot is in `src/content/about/index.mdx` at the line beginning `[PLACEHOLDER — Sean rewrites the third paragraph in Sedaris register:`.

Voice mode: **Sedaris (Domestic Observer)** per `.claude/skills/writing-voice-modes/SKILL.md`. 3–5 sentences. Comedic juxtaposition without a punchline. Specific nouns. The "comprehension thesis" needs to click via one small, true, lived moment.

Draft path:
1. Invoke `.claude/skills/writing-voice-modes` with: `{ register: 'Sedaris (Domestic Observer)', surface: 'About B-2 ¶3 — Sedaris pivot on comprehension thesis', constraints: 'specific nouns only · no em dashes · parallel-lineage rule honored · ≤5 sentences · the gap between two true things, not a punchline · the comprehension thesis clicks via one small lived moment' }`
2. Sean reviews the draft.
3. Invoke `/llm-council` (premium profile) with:
   - Surface: About B-2 ¶3
   - Voice mode: Sedaris (Domestic Observer)
   - Design philosophy: "an animator's pencil test, mounted in a Vercel-grade frame"
   - Three load-bearing things: character, voice, daily-dated layer
   - Template-trap warning: drift toward design-system-viewer OR luxury-minimal-PM-portfolio = STOP
   - Ask for: voice fidelity score (0–10), template-drift sniff, line-level edits, kill-list for cliché phrases
4. Apply council edits selectively — voice authority sits with Sean.
5. Save council transcript to `docs/writing-council/about-b2-p3-2026-05-24.md`.
6. Replace the placeholder line in `src/content/about/index.mdx` with the ratified paragraph.

- [ ] **Step A2.b.4: Author About B-4 ¶2 — building-toward bet**

The slot is at the line beginning `[PLACEHOLDER — Sean rewrites the second paragraph:`.

Voice mode: **Sedaris (Domestic Observer)**, single paragraph. Name the specific bet (agent governance / spec-as-source-of-truth / human-in-the-loop at the loop's hinge points) AND the specific problems Sean wants to be assigned to. Per spec §12.3: reads identically whether hired or hunting (no "open to opportunities" / "looking for a seat" language).

Draft path (no council pass — too short for council overhead per ship-plan §5):
1. Invoke `.claude/skills/writing-voice-modes` with: `{ register: 'Sedaris (Domestic Observer)', surface: 'About B-4 ¶2 — building-toward bet', constraints: 'single paragraph · name the bet + the problems · no "open to opportunities" language · reads identically hired-or-hunting · the bet is durable, availability is not' }`
2. Sean reviews + edits.
3. Replace the placeholder line in `src/content/about/index.mdx` with the ratified paragraph.

- [ ] **Step A2.b.5: Run `npm run prebuild` to verify validators pass**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run prebuild 2>&1 | tail -20
```

Expected: `validate_content.mjs` + `fetch_canonical_sources.mjs` + `derive_crosslinks.mjs` + `validate_about.mjs` all pass. The `validate_about.mjs` byte-matches the `lead:` field against PMP §4 — that's unchanged, so should pass.

- [ ] **Step A2.b.6: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/content/architecture/vault-knowledge-mcp.mdx src/content/transactions/intent-engineering-mcp.mdx src/content/transactions/vault-knowledge-mcp.mdx src/content/transactions/phase-d-typed-edges.mdx src/content/about/index.mdx
git add docs/writing-council/about-b2-p3-2026-05-24.md 2>/dev/null || true
git commit -m "$(cat <<'EOF'
content(phase-3f · pass A · A2.b): strip 12 vestige markers + author 2 About paragraphs

Strips [PLACEHOLDER — Q2/Q3/Q4] markers from 4 ledger/architecture files
where the prose under each marker is landed and Sean-readable as-is.

Authors:
- About B-2 ¶3 — Sedaris-coded pivot earning the comprehension thesis
  (LLM-council pass transcript at docs/writing-council/about-b2-p3-2026-05-24.md)
- About B-4 ¶2 — building-toward bet, reads identically hired-or-hunting

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A2.a: Author 5 case studies via subagent-driven-development

**Skill:** `superpowers:subagent-driven-development` — one subagent per case study, 5 in parallel.

**Files:**
- Modify: `src/content/work/intent-engineering-mcp.mdx` (A-3 — recruiter click-path priority)
- Modify: `src/content/work/code-brain.mdx` (A-2)
- Modify: `src/content/work/animation-pipeline.mdx` (A-1)
- Modify: `src/content/work/the-block.mdx` (A-4 — sensitive framing per spec §13.4)
- Modify: `src/content/work/16bitfit.mdx` (A-5 — return-condition framing per spec §13.5)

- [ ] **Step A2.a.1: Read the per-case-study spec context**

Each subagent prompt below loads the relevant case-study MDX file + the locked specs ([case-study-spec-v1.md](../../specs/case-study-spec-v1.md), PMP §3.3 voice register, CLAUDE.md three-load-bearing-things, the template-trap warning). The subagent does NOT need to read this plan — only the spec + the MDX file + the subagent prompt itself.

- [ ] **Step A2.a.2: Dispatch subagent A2.a-1 — Intent Engineering MCP (A-3)**

Use `Agent` with `subagent_type: general-purpose`. Prompt:

```
SURFACE: src/content/work/intent-engineering-mcp.mdx (A-3 case study)
STATUS: SHIPPED (npm + MCP registry live 2026-05-12)
PRIORITY: #1 — recruiter click-path leader; most visible tile; live install-count signal

YOUR TASK: Fill every [PLACEHOLDER] slot in the MDX file using the voice
calibration loop. Slots include: 4 four_q frontmatter answers · 3 Opener
paragraphs · 4 InvestigationBoard artifact captions · 1 SlackQuote DM.

VOICE REGISTERS (load-bearing):
- Opener (3 paragraphs): Sedaris (Domestic Observer). Specific nouns. Comedic
  juxtaposition without punchline. First-person warm. Parallel-lineage rule
  (PMP §3.1). The "13 days early" + "what got cut" narrative.
- four_q (4 short paragraphs): Declarative-thesis (essays middle-section
  voice). Sober. One claim per paragraph. NO comedic register.
- Artifact captions: Wire-service. One sentence each. Mono register tone.
- Slack DM placeholder: Use a REAL or anonymized DM Sean actually had on this
  project. If Sean has no real DM for this slot, CUT THE ARTIFACT rather than
  fake one (per case-study-spec §11.4).

EXECUTION:
1. Read src/content/work/intent-engineering-mcp.mdx end-to-end.
2. Read .claude/skills/writing-voice-modes/SKILL.md (the calibration source).
3. Read docs/specs/case-study-spec-v1.md §3 (status governs page shape) +
   §11 (artifact discipline) — this case study's SHIPPED status drives the
   <ShippedNow /> live-install-count block.
4. Read docs/specs/PORTFOLIO-MASTER-PLAN.md §3 (voice rules) +
   CLAUDE.md (three-load-bearing-things + template-trap warning).
5. Draft v0 of every placeholder in-register.
6. Self-review pass: cliché kill-list (no "seamless", "leverage", "elevate",
   "robust", "intuitive"); no em dashes outside wire-service register; no
   timeline framing animator-self-vs-PM-self.
7. Apply your edits to the MDX file. Strip [PLACEHOLDER — ...] prefix
   wherever the existing draft prose is shippable as-is after voice-mode
   calibration (some Q answers may only need a marker strip + one-word polish).
8. Run `npm run prebuild` from the repo root to verify schemas + crosslinks.

DELIVERABLE: An MDX file with zero [PLACEHOLDER] markers, voice-calibrated,
prebuild-green. Report back with:
- The diff you applied (the actual changed lines, not a summary).
- Any artifacts you CUT instead of filled, with the reason.
- A self-graded voice-fidelity score (0-10) for the opener.

IMPORTANT — do NOT:
- Invent customer testimonials, fake DM exchanges, fabricated metrics.
- Frame the HybridRouter as "Agent OS" or "runtime architecture" anywhere
  (CLAUDE.md STOP-DOING rule).
- Drift toward design-system-viewer or luxury-minimal-PM template language.
- Use cliché PM-portfolio openers ("Vision meets velocity", "I love building").
```

After the subagent returns:
1. Read the diff.
2. Run `/llm-council` (premium profile) on the OPENER only (3 paragraphs). Council brief: same registers + template-trap warning as above. Ask for: voice fidelity score, template-drift sniff, line-level edits, cliché kill-list.
3. Apply council edits to the opener. Voice authority sits with Sean — if council pushes homogenizing edits, push back.
4. Save council transcript to `docs/writing-council/work-intent-engineering-mcp-opener-2026-05-24.md`.
5. Sean does the final 5-min read.

- [ ] **Step A2.a.3: Dispatch subagent A2.a-2 — Code Brain (A-2)**

Same skill + same EXECUTION pattern as A2.a.2, with these prompt deltas:

```
SURFACE: src/content/work/code-brain.mdx (A-2 case study)
STATUS: ACTIVE
PRIORITY: #2 — "I ship with an agent fleet" positioning; load-bearing for the
            agent-fleet thesis the daily-dated layer surfaces.

DELTAS from A-3 prompt:
- Opener should land the "second brain has a fleet now" tagline already in
  frontmatter — earn it via specific scene (the 08:45 morning fire ritual).
- four_q.what reads as a system description not a feature list.
- four_q.learn: "the fleet's job isn't to write code. the fleet's job is to
  keep me thinking about the next problem instead of the last one." This line
  is gold — preserve it.
- Anchor metric "118 SKILLS · 14 HOOKS · 8 AGENTS" must match the real counts
  in ~/.claude/skills/ and ~/Code-Brain/code-brain/agents-sdk/. If the counts
  drifted, update the anchor_metric line + the four_q.what answer.
```

After subagent returns: council pass on opener (only), council transcript to `docs/writing-council/work-code-brain-opener-2026-05-24.md`, Sean reviews.

- [ ] **Step A2.a.4: Dispatch subagent A2.a-3 — Animation Pipeline (A-1)**

```
SURFACE: src/content/work/animation-pipeline.mdx (A-1 case study)
STATUS: ACTIVE
PRIORITY: #3 — the unfakeable craft signal; "raised by Saturday morning
            cartoons" lineage proof; aligns with the hero WebM.

DELTAS:
- Opener: lean into the "I taught Seedance to draw me, then taught the
  pipeline to ship the drawing" tagline. The pipeline IS the artifact. The
  character is the test.
- four_q answers already have decent draft prose; verify each, polish.
- The Slack DM (alpha-channel + vp9 with alpha_mode=1) is plausible
  engineering content — verify with Sean it's a real exchange, otherwise cut
  per the spec §11.4 authenticity rule.
- The MetricChart data (render time per frame v1 → v2a: 22 → 4) — verify
  against the real pipeline numbers; update if off.
```

After subagent returns: council pass on opener, transcript to `docs/writing-council/work-animation-pipeline-opener-2026-05-24.md`, Sean reviews.

- [ ] **Step A2.a.5: Dispatch subagent A2.a-4 — The Block (A-4)**

```
SURFACE: src/content/work/the-block.mdx (A-4 case study)
STATUS: ARCHIVED
PRIORITY: #4 — institutional-PM credibility; SENSITIVE FRAMING per
            case-study-spec §13.4.

DELTAS — load-bearing framing rules:
- Frame the work, not the exit. Per CLAUDE.md + PMP §10 Decision 4:
  ARCHIVED status, Larry Cermak is the primary public reference, work was
  real and shippable, the firm restructured (not "I was laid off because...").
- Sanitize: redact internal project keys, anonymize customer names,
  generic-ize subscription tier descriptions.
- The opener must NOT explain the layoff. The opener describes Campus + RevOps
  as products + the 2024-2026 arc. The frame is "this was the work" not "this
  is why it ended."
- four_q.what: 2 products in 2 years for an institutional research firm.
- four_q.why: the 3 options considered for the Campus thesis (e.g. closed
  product / data-first / research-first); the why-we-chose answer.
- four_q.break: 3 honest failure modes managed at scale (could include:
  data-partnership renewals, RevOps automation slips, customer onboarding
  bottlenecks — Sean confirms the real ones).
- four_q.learn: "B2B research is a relationship product. The infrastructure
  has to disappear; the relationship has to remain." (preserve, polish.)
- Slack DM artifact — almost certainly cut per spec §11.4 (real DMs are
  customer-confidential).
- archived_reference_url in frontmatter currently points at
  www.theblockcrypto.com/post/example-placeholder — needs a real public Larry
  Cermak / Block post URL. Ask Sean for the right URL.
```

After subagent returns: council pass on opener AND framing review (council asks: "does this read as 'frame the work' or as 'explain the exit'?"). Transcript to `docs/writing-council/work-the-block-opener-and-framing-2026-05-24.md`. Sean reviews carefully.

- [ ] **Step A2.a.6: Dispatch subagent A2.a-5 — 16BitFit (A-5)**

```
SURFACE: src/content/work/16bitfit.mdx (A-5 case study)
STATUS: PAUSED
PRIORITY: #5 — least time-sensitive; the return-condition is the load-bearing
            frame per case-study-spec §13.5.

DELTAS:
- The "return_condition" frontmatter is already in place: "when the animation
  pipeline ships its first full short. then the game inherits the pipeline.
  ~2026-08." This callout renders ABOVE the hero media per spec §12 PAUSED
  status behavior — preserve verbatim.
- Opener: "The pipeline is the artifact, not the game" (tagline) — earn it
  via the pause decision narrative. The pause is deliberate, not abandoned.
- four_q.learn: "pausing was right. The return condition is the animation
  pipeline shipping; until then, the game can't inherit a tested production
  system." Preserve, polish.
- Slack DM (Phaser scope creep / pause decision) — verify with Sean it's a
  real exchange or cut.
- The MetricChart (sprite frames generated by pipeline: Mar 12 → Apr 38 →
  May 64) — verify against real generation log, update if off.
```

After subagent returns: council pass on opener, transcript to `docs/writing-council/work-16bitfit-opener-2026-05-24.md`, Sean reviews.

- [ ] **Step A2.a.7: Verify zero placeholders remain across the 5 case studies**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
grep -n "PLACEHOLDER" src/content/work/*.mdx 2>&1
```

Expected: zero matches.

- [ ] **Step A2.a.8: Run prebuild + smoke-test each case-study page**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run prebuild
```

Expected: green. Then visit each of:
- `http://localhost:4321/work/intent-engineering-mcp/`
- `http://localhost:4321/work/code-brain/`
- `http://localhost:4321/work/animation-pipeline/`
- `http://localhost:4321/work/the-block/`
- `http://localhost:4321/work/16bitfit/`

Verify each renders: opener prose lands, 4Q section populates, investigation board artifacts visible (or correctly cut), status pill renders per ACTIVE/SHIPPED/ARCHIVED/PAUSED behavior.

- [ ] **Step A2.a.9: Commit (one commit per case study so the diff is reviewable)**

For each of the 5 case studies, commit individually:

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/content/work/intent-engineering-mcp.mdx docs/writing-council/work-intent-engineering-mcp-opener-2026-05-24.md
git commit -m "$(cat <<'EOF'
content(phase-3f · pass A · A2.a): A-3 intent-engineering-mcp case study

Authors 4Q + opener + captions per case-study-spec voice register split:
- Opener: Sedaris (council-passed, transcript at docs/writing-council/)
- 4Q: declarative-thesis
- Captions: wire-service

Status: SHIPPED — <ShippedNow /> block renders live install count.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Then repeat (with matching commit messages) for code-brain, animation-pipeline, the-block, 16bitfit. **Five commits total.**

---

### Task A3: Refresh today's daily JSON

**Files:**
- Modify: `public/api/dateline.json`
- Modify: `public/api/about-pulse.json`
- Modify: `public/api/next-piece.json`
- Modify: `public/api/shipped-stats-intent-engineering-mcp.json` (only the `updated_at` if present)

Source: today's daily note at `/Users/seanwinslow/Code-Brain/code-brain/vault/10_timeline/daily/2026-05-24.md`. Per Q2 LOCKED — paper over the off-day; use this morning's Daily Driver run signal.

Today's morning fleet digest (from the daily note's `## Fleet Overnight Digest` section):
- Vault Indexer ✓ 02:06:12 — chunks=86, embeddings=86, errors=0
- Vault Synthesizer ✓ 03:15:14 — concepts=1, connections=1, rejected=0, edges=1
- Deep Researcher ○ empty queue (02:45:01)
- Vault Critic ✓ 03:30:05 — status=success-empty, articles=0
- Session Flush ○ no-op (16:20:07) — 0 msgs

- [ ] **Step A3.1: Update `public/api/dateline.json`**

Replace the file contents with:

```json
{
  "date_iso": "2026-05-24",
  "date_display": "BOSTON, MAY 24, 2026",
  "pattern": "fleet_pulse",
  "body": "morning fleet ran clean. indexer wrote 86 chunks at 02:06. synth landed 1 concept + 1 connection. critic returned success-empty (nothing to flag). fleet green.",
  "updated_at": "2026-05-24T08:45:00-04:00"
}
```

Verify by visiting `http://localhost:4321/api/dateline.json` — should return the above JSON, and the home hero dateline strip should render `BOSTON, MAY 24, 2026 — morning fleet ran clean...`.

- [ ] **Step A3.2: Verify about-pulse.json schema against its consumer**

```bash
grep -rn "about-pulse" /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/ 2>&1 | head -10
```

Find the consumer (likely `src/components/about/NowPulse.astro`). Read it to confirm the `items[]` schema — what `type` enums it accepts (`commits`, `drafts`, `pencil_frames`, `reading`, `fleet_runs` from the 5/21 snapshot). If the consumer hard-codes a specific enum set, we must respect it.

- [ ] **Step A3.3: Update `public/api/about-pulse.json`**

Get today's commit count first:

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && git log --since="2026-05-24 00:00" --oneline | wc -l
```

Replace the file contents (substitute the commit count above for `<N>` below; tally other types from today's reality):

```json
{
  "date_iso": "2026-05-24",
  "items": [
    { "type": "commits", "count": <N>, "label": "<N> commits" },
    { "type": "drafts", "count": 5, "label": "5 case-study drafts" },
    { "type": "fleet_runs", "count": 3, "label": "3 fleet runs (indexer · synth · critic)" },
    { "type": "reading", "count": 1, "label": "1 daily note" }
  ],
  "updated_at": "2026-05-24T08:45:00-04:00"
}
```

If the consumer schema in A3.2 requires `pencil_frames` to be present, add `{ "type": "pencil_frames", "count": 0, "label": "0 cels (writing day)" }` and accept the honest zero.

- [ ] **Step A3.4: Update `public/api/next-piece.json`**

Replace the file contents (per Q3 LOCKED — Vault Scorecard 2026-06-03):

```json
{
  "title": "Vault Scorecard",
  "date_target": "2026-06-03",
  "updated_at": "2026-05-24T08:45:00-04:00"
}
```

This is what it currently says — verify the file content matches; only the `updated_at` needs bumping. After the update, the home page's "next in production" card should still display Vault Scorecard 2026-06-03.

- [ ] **Step A3.5: Update `public/api/shipped-stats-intent-engineering-mcp.json`**

```bash
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/api/shipped-stats-intent-engineering-mcp.json
```

If the file carries an `updated_at` field, bump it to `"2026-05-24T08:45:00-04:00"`. Stats values (npm downloads, registry installs, GitHub stars) stay accurate — they're real numbers, not date-coupled. If `updated_at` is missing, no change.

- [ ] **Step A3.6: Smoke-test all 4 endpoints**

```bash
for f in dateline about-pulse next-piece shipped-stats-intent-engineering-mcp; do
  echo "=== $f ==="
  curl -s "http://localhost:4321/api/$f.json"
  echo ""
done
```

Expected: all 4 return JSON with `date_iso` or `updated_at` carrying `2026-05-24`. Verify the home page's hero dateline strip shows MAY 24, 2026 (not 5/21 staleness) and the about teaser pulse strip shows today's counts.

- [ ] **Step A3.7: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add public/api/dateline.json public/api/about-pulse.json public/api/next-piece.json public/api/shipped-stats-intent-engineering-mcp.json
git commit -m "$(cat <<'EOF'
data(phase-3f · pass A · A3): refresh daily-driver JSON to 2026-05-24

Replaces 2026-05-21 snapshot with today's morning Daily Driver fire signal:
- dateline.json: fleet_pulse body sourced from today's overnight digest
  (indexer 86 chunks · synth 1+1 · critic success-empty)
- about-pulse.json: today's commits + fleet runs + drafts + reading counts
- next-piece.json: Vault Scorecard 2026-06-03 (target unchanged; updated_at
  bumped per Q3-LOCKED in ship-plan §1.3)
- shipped-stats-intent-engineering-mcp.json: updated_at bumped

Q2-LOCKED tone: paper over the Friday/Saturday outage; surface this morning's
clean fire as the live signal.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task A4: Pass A wrap + commit checkpoint

- [ ] **Step A4.1: Run full build verification**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | tail -30
```

Expected: green. Only the diagram-lib chunk-size warning (closes in C1).

- [ ] **Step A4.2: Verify zero `[PLACEHOLDER]` markers remain in content**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
grep -rn "PLACEHOLDER" src/content/ 2>&1
```

Expected: zero matches.

- [ ] **Step A4.3: Spot-check every page in browser**

Visit each of the 11 surfaces at viewport 1440×900:
- `/` (home)
- `/work/` + `/work/{intent-engineering-mcp,code-brain,animation-pipeline,the-block,16bitfit}/`
- `/transactions/` + 3 deep-dives
- `/architecture/` + `/architecture/vault-knowledge-mcp/`
- `/essays/` + `/essays/meaning-over-access/`
- `/about/`
- `/contact/`
- `/404` (force via random URL)

Open devtools console for each. Expected: zero errors, all content renders, no placeholder text visible.

- [ ] **Step A4.4: Pass A wrap commit**

If any cleanup was needed during A4.3, commit it. Otherwise this is a no-op step.

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git status
# if anything to commit:
# git add ... && git commit -m "fix(phase-3f · pass A · A4): wrap fixes from spot-check"
```

---

## Pass B — Fix the funnel (Mon 5/25)

### Task B1: A-3 tile content overflow (CSS)

**Files:**
- Modify: `src/components/projects/ProjectTile.astro` (most likely the per-tile content wrapper)

- [ ] **Step B1.1: Reproduce the bug at 1440 + 390**

Open `http://localhost:4321/` at 1440×900. Inspect the A-3 (Intent Engineering MCP) tile. Verify title + tagline bleed left into the adjacent grid cell. Resize to 390×844. Verify the same overflow happens (or different — note it).

- [ ] **Step B1.2: Apply `min-width: 0` + `overflow: hidden` to the tile content wrapper**

Open `src/components/projects/ProjectTile.astro`. Find the outermost content wrapper. Add to its styles:

```css
.tile-content {
  min-width: 0;          /* CSS Grid children default to min-width: auto which can blow out the column */
  overflow: hidden;       /* belt-and-suspenders */
}
```

If the existing styles already have `overflow: hidden` (per the grep that showed `ProjectTile.astro:53` + `:65`), then just add `min-width: 0` to the same selectors and verify in browser.

- [ ] **Step B1.3: Check for view-transition-name conflicts**

```bash
grep -n "view-transition-name" /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/projects/*.astro
```

If A-3 has a unique `view-transition-name` on a child element that's wider than its parent, the transition target can blow out the grid. If found, move the `view-transition-name` to the outer `<a>` wrapper instead of an inner child.

- [ ] **Step B1.4: Verify across breakpoints**

Reload `/` at 1440 then 390 then 768 then 2560. Verify A-3 tile content stays inside its grid cell at every breakpoint. No horizontal scroll on the page at any breakpoint.

- [ ] **Step B1.5: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/components/projects/ProjectTile.astro
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass B · B1): A-3 tile content overflow

CSS Grid child needs explicit min-width: 0 to prevent text content from
blowing out the column width. Verified at 390 / 768 / 1440 / 2560 breakpoints.

Closes the P0 from the 2026-05-23 impeccable critique.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B2: About-teaser swiper cascade

**Files:**
- Modify: `src/components/teaser/TeaserSwiper.astro`
- Possibly modify: `src/scripts/teaser-swiper.js`
- Possibly modify: `src/components/teaser/TeaserCard.astro`

- [ ] **Step B2.1: Reproduce at desktop first paint**

Open `http://localhost:4321/` in a private/incognito window (to defeat caching). Scroll to the about teaser. Verify cards 2–10 don't paint behind the front card — only the front card is visible, with empty white space behind.

- [ ] **Step B2.2: Read the swiper component + script**

```bash
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/teaser/TeaserSwiper.astro
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/scripts/teaser-swiper.js
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/teaser/TeaserCard.astro
```

Note: where the cascade `--card-z-offset` + `--card-y-offset` get applied · where `perspective` is set · whether `--i` (card index) is server-rendered or JS-set on hydration.

- [ ] **Step B2.3: Apply the fix — server-render the cascade transforms + ensure parent perspective**

Two likely root causes (per Phase 3F doc §B2 fix path):

(a) **`perspective` missing on parent**: Z-translation has no visual effect without parent `perspective`. Add to the swiper container CSS:

```css
.teaser-swiper {
  perspective: 1200px;
}
```

(b) **`--i` set on hydration (JS-mounted) instead of server-render**: each `<TeaserCard>` needs `style="--i: {index}"` baked into the SSR'd HTML, not added by `teaser-swiper.js` after hydration.

Open `src/components/teaser/TeaserSwiper.astro` and the iteration that renders the cards. Verify each card receives `style={`--i: ${index}`}` (or equivalent) at server-render time. If `teaser-swiper.js` is the only thing setting `--i`, move it to the Astro template.

Verify each card's CSS transform reads `--i` correctly:

```css
.teaser-card {
  transform: translate3d(0, calc(var(--card-y-offset, 8px) * var(--i, 0)), calc(var(--card-z-offset, -12px) * var(--i, 0)));
}
```

- [ ] **Step B2.4: Test cascade renders at first paint**

Reload `/` in a private window. Scroll to the about teaser. Expected: front card + at least 3 cards visible behind it in the cascade (each one slightly smaller / shifted down / shifted back in Z). Mobile renders front card only (acceptable per spec).

- [ ] **Step B2.5: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/components/teaser/
git add src/scripts/teaser-swiper.js 2>/dev/null || true
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass B · B2): teaser swiper cascade renders at first paint

Two-part fix:
1. Added perspective: 1200px to the swiper container (Z-translation needs it).
2. Server-rendered --i card index on each TeaserCard (was JS-hydration-only).

Closes the P0 from the 2026-05-23 impeccable critique — cards 2-10 now visible
in the cascade behind the front card at desktop first paint.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task B3: Author 5 project tile media

**Reference:** Execute the existing plan at [docs/superpowers/plans/2026-05-24-project-tile-media-implementation.md](2026-05-24-project-tile-media-implementation.md) verbatim. Run Task 0 → Task 1 → Tasks 2-5 in parallel via `superpowers:subagent-driven-development` → Task 6 → Task 7.

- [ ] **Step B3.1: Run the tile-media plan's Task 0 (pre-flight)**

Execute the steps in the tile-media implementation plan's "Pre-flight" section verbatim.

- [ ] **Step B3.2: Run the tile-media plan's Task 1 (A-5 crop, lowest risk, validates pipeline)**

Execute the steps in the tile-media implementation plan's "Task 1: A-5 · 16BitFit" section verbatim. This validates the full integration pipeline before committing 4 subagents.

- [ ] **Step B3.3: Dispatch 4 subagents in parallel for tile-media Tasks 2-5**

Use `Agent` with `subagent_type: general-purpose`, one per tile (A-3 / A-1 / A-4 / A-2). Each subagent's prompt:

```
You are executing Task <N> from the tile-media implementation plan at
docs/superpowers/plans/2026-05-24-project-tile-media-implementation.md.

Read the plan. Execute YOUR task verbatim — all steps in your task only:
- Task 2 (A-3 Intent Engineering MCP terminal)
- Task 3 (A-1 Animation Pipeline walk cycle)
- Task 4 (A-4 The Block 3-tier matrix)
- Task 5 (A-2 Code Brain concept graph)

Use the per-task prompt, generation skill, visual-QA gates, 2-attempt budget,
and Option 2 fallback rules specified in the plan. Do NOT skip the QA steps.
Do NOT commit until your task's commit step. Commit only your task's files +
its prompt file.

Return back: which version (v1 or v2) shipped · whether you fell to Option 2
fallback or two-pass composite · the final .webp file size · your visual-QA
notes (one sentence per check).
```

Dispatch all 4 in a single message. Wait for all 4 to return.

- [ ] **Step B3.4: Run the tile-media plan's Task 6 (full-set QA) + Task 7 (CHANGELOG)**

Execute "Task 6: Full-set visual QA + rhythm check" + "Task 7: CHANGELOG entry + Pass B · B3 close-out" verbatim from the tile-media plan.

- [ ] **Step B3.5: Verify across the projects grid**

Reload `/` at 1440 + 390. Verify all 5 tiles render authored media (no flat color blocks). Each tile reads as Sean-specific within 1s of glance. The 5 tiles read as a *set* of different physical artifacts, not 5 versions of the same thing.

---

### Task B4: Pass B wrap + commit checkpoint

- [ ] **Step B4.1: Run full build verification**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | tail -30
```

Expected: green. Diagram-lib warning still present (closes in C1).

- [ ] **Step B4.2: Re-run Playwright tour at 1440 + 390**

(Manual — open both viewports in a browser, walk through `/`, `/work/`, all 5 `/work/<slug>/`, `/about/`, `/transactions/`, `/architecture/`, `/essays/`. Devtools console open throughout.)

Acceptance: zero errors. Grid: all tiles inside bounds. Swiper: cascade visible. No layout breaks.

- [ ] **Step B4.3: Pass B wrap commit (if anything residual)**

If B4.2 surfaces residual fixes, commit them. Otherwise no-op.

---

## Pass C — Polish (Mon 5/25 late PM)

### Task C1: Code-split diagram libraries

**Files:**
- Modify: `astro.config.mjs`

- [ ] **Step C1.1: Identify the diagram lib import paths**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | grep -A 2 "1\..*MB\|larger than" | head -20
```

Note the exact module paths flagged for the chunk warning (mermaid, wardley if present, cytoscape, katex).

- [ ] **Step C1.2: Add `manualChunks` to `astro.config.mjs`**

Open `astro.config.mjs`. The existing config has a `vite: { plugins: [tailwindcss()] }` block. Extend it:

```js
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            mermaid: ['mermaid'],
            cytoscape: ['cytoscape', 'cytoscape-cose-bilkent'],
            katex: ['katex'],
            // add 'wardley' here if it's a direct dep
          },
        },
      },
    },
  },
```

Only include the chunks for libs that are actually direct deps (skip any that aren't in package.json).

- [ ] **Step C1.3: Rebuild + verify chunk split**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | tail -50
```

Expected: separate chunks for mermaid/cytoscape/katex in the output. The home page bundle should drop significantly (~1+ MB).

- [ ] **Step C1.4: Verify architecture page still renders Mermaid**

Visit `http://localhost:4321/architecture/vault-knowledge-mcp/`. Verify the Mermaid concept-edges ER diagram still renders correctly (not a blank space).

- [ ] **Step C1.5: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add astro.config.mjs
git commit -m "$(cat <<'EOF'
perf(phase-3f · pass C · C1): code-split mermaid + cytoscape + katex bundles

Splits diagram libs into separate chunks so the home page doesn't ship
~1.9MB of diagram code it never uses. Architecture pages still render
Mermaid correctly (lazy-loaded on-page).

Closes the Lighthouse Performance budget issue from the 2026-05-23 critique.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C2: Reduced-motion contract fix on the hero

**Files:**
- Modify: `src/components/hero/CharacterLane.astro`

- [ ] **Step C2.1: Read the current implementation**

```bash
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/hero/CharacterLane.astro | head -80
```

Note where the `<video>` element is rendered + whether there's any reduced-motion gate.

- [ ] **Step C2.2: Gate the `<video>` mount behind a client-side check**

Astro can't read media queries at server-render time. Pattern: render the poster `<img>` by default, render the `<video>` inside a `<template>`, and only swap them in if `prefers-reduced-motion: reduce` is NOT set.

Modify `CharacterLane.astro` per the spec §7.5.5 / §12. Pattern:

```astro
---
// ... existing frontmatter ...
---
<div class="character-lane" data-hero-character>
  <picture data-hero-poster>
    <img src="/assets/character/hero-loop-poster.webp" alt="..." />
  </picture>
  <template data-hero-video>
    <video autoplay muted loop playsinline poster="/assets/character/hero-loop-poster.webp">
      <source src="/assets/character/hero-loop.webm" type="video/webm" />
    </video>
  </template>
</div>

<script>
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const tpl = document.querySelector('[data-hero-video]') as HTMLTemplateElement;
    const poster = document.querySelector('[data-hero-poster]');
    if (tpl && poster && tpl.content.firstElementChild) {
      tpl.parentNode?.replaceChild(tpl.content.firstElementChild.cloneNode(true), tpl);
      poster.remove();
    }
  }
</script>
```

(Adapt to match the existing CharacterLane.astro structure — preserve hero-icon-cycle wiring, CSS classes, etc.)

- [ ] **Step C2.3: Test with reduced-motion enabled**

In DevTools (Chrome): Cmd+Shift+P → "Show Rendering" → "Emulate CSS prefers-reduced-motion: reduce". Reload `/`. Inspect the DOM. Expected: no `<video>` element, just the poster `<img>`.

Disable the emulation. Reload. Expected: `<video>` element present and autoplaying.

- [ ] **Step C2.4: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/components/hero/CharacterLane.astro
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass C · C2): reduced-motion contract — no <video> in DOM

Per hero-spec §7.5.5 + §12, prefers-reduced-motion: reduce must not mount
the hero <video>. Pattern: render <picture> poster by default, render
<video> inside <template>, swap in only if reduce is not set.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C3: Essay status / title / date consistency

**Files:**
- Modify: `src/content/essays/meaning-over-access.mdx` (frontmatter only)

- [ ] **Step C3.1: Reconcile the title-slug-date triad**

Current state per file read (frontmatter lines 1–11):
- `title: "Access Over Meaning"` ← title says "access over meaning"
- slug: `meaning-over-access` ← URL slug is reversed
- `published: "2026-06-19"` ← 26 days future-dated
- `status: DRAFT` ← outside the locked 5-status vocabulary (ACTIVE / COMING / SHIPPED / PAUSED / ARCHIVED)

Reconcile against the spec + CLAUDE.md locked decisions:
- Title should match slug → change title to `"Meaning Over Access"` (or update slug — slug is the URL contract, change title).
- Date: if the essay is ready to ship, set to today (`"2026-05-24"`). If still drafting, set to a near-term real target (the original `2026-06-19` target is in the roadmap as the publish date — keep if Sean wants).
- Status: must be one of the locked 5 values. The essay body is fully drafted (1600 words) — set to `SHIPPED` if Sean wants it to count for the launch, or `COMING` if he wants to hold publication until 6/19.

Sean confirms which:
- **Option A (ship the essay at launch):** title → `"Meaning Over Access"`, published → `"2026-05-24"`, status → `SHIPPED`.
- **Option B (hold for 6/19 launch as per roadmap):** title → `"Meaning Over Access"`, published → `"2026-06-19"`, status → `COMING`.

Apply Option A unless Sean specifies Option B.

- [ ] **Step C3.2: Edit frontmatter**

Open `src/content/essays/meaning-over-access.mdx`. Update the three lines:

```yaml
title: "Meaning Over Access"
published: "2026-05-24"
status: SHIPPED
```

(Or use Option B values if Sean directs.)

- [ ] **Step C3.3: Run prebuild to verify essays-spec validator passes**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run prebuild 2>&1 | tail -15
```

Expected: green. If the validator rejects the new status, escalate — that's a spec drift, not a content fix.

- [ ] **Step C3.4: Visit + verify**

Visit `http://localhost:4321/essays/` — verify the index row shows "Meaning Over Access" + 2026-05-24 + SHIPPED pill. Click through to `/essays/meaning-over-access/` — verify the title at the top matches.

- [ ] **Step C3.5: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/content/essays/meaning-over-access.mdx
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass C · C3): essay frontmatter — title-slug match + status enum

- title: "Access Over Meaning" → "Meaning Over Access" (matches slug)
- published: 2026-06-19 → 2026-05-24 (no future-dating at launch)
- status: DRAFT → SHIPPED (DRAFT is outside the locked 5-status vocabulary)

Closes the inconsistency flagged in the 2026-05-23 impeccable critique.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C4: Trailing-slash consistency on tile hrefs

**Files:**
- Modify: `src/components/projects/ProjectsSection.astro` (and/or ProjectTile.astro)

- [ ] **Step C4.1: Find tile hrefs**

```bash
grep -n "href.*work/" /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/components/projects/*.astro
```

Note whether hrefs use `/work/${slug}` (no trailing slash) or `/work/${slug}/` (trailing).

- [ ] **Step C4.2: Apply trailing slash**

Open each file. Change `/work/${slug}` to `/work/${slug}/` (same pattern for any `/transactions/`, `/architecture/`, `/essays/` slug links).

Alternative (cleaner): set globally in `astro.config.mjs`:

```js
export default defineConfig({
  // ... existing ...
  trailingSlash: 'always',
});
```

But verify sitemap + RSS still output correctly first (some integrations interact with trailingSlash). Check `dist/sitemap-index.xml` + `dist/transactions/rss.xml` after the build.

- [ ] **Step C4.3: Verify no 301 hops**

In DevTools network tab, click each tile on `/`. Expected: direct 200 response, no 301 redirect hop.

- [ ] **Step C4.4: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add src/components/projects/ astro.config.mjs 2>/dev/null
git commit -m "$(cat <<'EOF'
fix(phase-3f · pass C · C4): trailing-slash consistency on tile hrefs

Adds trailing slash to /work/${slug} hrefs so tile clicks don't add a 301
redirect hop. Verified via network log.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

### Task C5: Architecture slug routing spot-check

**Files:** none expected (verification only).

- [ ] **Step C5.1: Spot-check the architecture index → deep-dive flow**

Visit `http://localhost:4321/architecture/` in a real browser (not curl). Click the single writeup row (vault-knowledge-mcp). Verify it lands on `/architecture/vault-knowledge-mcp/` with status 200, not a 404.

- [ ] **Step C5.2: If 404 — debug**

```bash
cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/pages/architecture/[slug].astro | head -40
ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/src/content/architecture/
```

Verify `getStaticPaths` in `[slug].astro` matches the slug filename in `src/content/architecture/`. Common cause: `[slug].astro` uses `.id` (filename) but the row link uses `.slug` (frontmatter slug) or vice versa.

- [ ] **Step C5.3: If 200 — note resolved**

No fix needed. The 5/23 audit's A-vs-B inconsistency was a View Transitions intermittent.

- [ ] **Step C5.4: Commit (only if a fix was applied)**

If C5.2 applied a fix, commit it. Otherwise no-op.

---

### Task C6: Repo hygiene

**Files:**
- Delete: `hotfix-tear-boundary-current.png` (repo root)
- Delete: `audit-*.png` × 17 (repo root)
- Delete: `.audit-screens/` directory
- Verify: deleted `public/assets/teaser-deck/03-watercolor-ink.webp` already absent + `03-comic-book.webp` present

- [ ] **Step C6.1: List the files to remove**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
ls hotfix-tear-boundary-current.png audit-*.png 2>&1 | head -20
ls -d .audit-screens/ 2>&1
```

- [ ] **Step C6.2: Move audit screenshots to a documented location**

The audit screenshots are useful as the visual record of the 2026-05-23 critique pass. Don't delete — move them to `docs/bugs-changes/screenshots/26-05-23-audit/`.

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
mkdir -p docs/bugs-changes/screenshots/26-05-23-audit
mv audit-*.png docs/bugs-changes/screenshots/26-05-23-audit/ 2>/dev/null || true
mv .audit-screens docs/bugs-changes/screenshots/26-05-23-audit-impeccable 2>/dev/null || true
```

- [ ] **Step C6.3: Delete the hotfix screenshot if it's outdated**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
rm hotfix-tear-boundary-current.png 2>/dev/null || true
```

(If unsure, move it to the bugs-changes screenshots dir instead.)

- [ ] **Step C6.4: Verify clean status**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git status --short | head -30
```

Expected: only the moved/deleted files, plus any in-flight Pass A/B/C work.

- [ ] **Step C6.5: Commit**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add -A
git commit -m "$(cat <<'EOF'
chore(phase-3f · pass C · C6): repo hygiene — sweep audit artifacts

Moves 17 audit-*.png + .audit-screens/ from repo root into
docs/bugs-changes/screenshots/ where they belong. Deletes the outdated
hotfix-tear-boundary-current.png.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## MVP-CONTENT-GATE (Mon 5/25 EOD)

- [ ] **Step MCG.1: Verify all Phase 3F acceptance criteria green**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
grep -rn "PLACEHOLDER" src/content/ src/pages/ 2>&1   # expect 0
npm run build 2>&1 | tail -10                          # expect green
```

Plus manual: zero console errors on `/`, all 11 surfaces render at 390/1440, all 5 tiles carry authored media, swiper cascade visible, reduced-motion contract honored, today's date in home dateline.

If anything is red: stop and fix before proceeding to Phase 4. Don't ship a broken site.

---

## Phase 4 — Production deploy (Tue 5/26 AM; Mon late if ahead of schedule)

### Task 4A: Production config sanity

**Files:** none expected (verification only).

- [ ] **Step 4A.1: Run full build locally**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run build 2>&1 | tail -30
```

Expected: green.

- [ ] **Step 4A.2: Verify sitemap + RSS carry production URLs**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
grep -l "localhost" dist/sitemap-index.xml dist/transactions/rss.xml 2>&1
```

Expected: no matches (no `localhost` in production output). If a sitemap or RSS file references `localhost`, the `site:` constant in `astro.config.mjs` is wrong — fix and rebuild.

- [ ] **Step 4A.3: Diff dev vs dist rendering**

Open `http://localhost:4321/` in one tab. In another, build + serve `dist/`:

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio && npm run preview &
sleep 5 && curl -s http://localhost:4322/ | head -100
```

Compare hero + projects rendering visually. Expected: identical except for the localhost vs production URL hostnames.

- [ ] **Step 4A.4: Spot-check no broken View Transitions in built output**

Click through `/work/intent-engineering-mcp/`, `/transactions/intent-engineering-mcp/`, `/architecture/vault-knowledge-mcp/`, `/essays/meaning-over-access/` in the preview build. Verify transitions don't break (no white flash, no missing content).

---

### Task 4B: Vercel deploy

**Files:** none changed in this repo (Vercel dashboard work).

- [ ] **Step 4B.1: Push the branch to GitHub**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git push origin phase-2-foundations
```

If `main` is the target deploy branch, also:

```bash
git checkout main
git merge phase-2-foundations --no-ff -m "merge(phase-3f): launch-ready content + tile media + Phase 4 prep"
git push origin main
```

- [ ] **Step 4B.2: Sean creates the Vercel project**

Sean owns this (login required):
1. Open Vercel dashboard → "Add New" → "Project".
2. Import `seanwinslow28/sw-ai-pm-portfolio` from GitHub.
3. Framework preset: Astro (auto-detected).
4. Build Command: `npm run build` (auto-populated).
5. Output Directory: `dist` (auto-populated).
6. Install Command: `npm install` (auto-populated).
7. Environment variables: none required.
8. Click "Deploy".

Wait for build to complete (~2 min). Vercel returns a `*.vercel.app` preview URL.

- [ ] **Step 4B.3: Smoke-test the preview URL**

Open the `*.vercel.app` URL in a browser. Verify:
- Home loads with 5 tile cards (authored media, not flat colors) + 1 next-in-prod card.
- `/transactions/` shows 3 ledger rows; each deep-dive resolves cleanly with 4Q + repo links.
- All 5 `/work/<slug>/` deep-dives resolve and render the polished prose.
- `/architecture/vault-knowledge-mcp/` resolves with Mermaid diagram rendering.
- `/essays/meaning-over-access/` resolves with quadrantChart rendering.
- `/about/`, `/contact/`, `/404` all render correctly.
- `/sitemap-index.xml` + `/transactions/rss.xml` resolve with the `*.vercel.app` URL (until apex DNS lands).
- Devtools console: zero errors on `/` and a spot-check sub-page.

- [ ] **Step 4B.4: If smoke-test fails — debug locally + re-push**

The build pipeline runs `prebuild` → `build`. The most likely failure is `validate_about.mjs` byte-mismatching the lead line, or `derive_crosslinks.mjs` rejecting a dangling slug. Read the Vercel build log; fix the validation drift locally; commit + push.

---

### Task 4C: Apex DNS (Cloudflare DNS-only)

**Files:** none changed in this repo (Vercel + Cloudflare dashboard work).

- [ ] **Step 4C.1: Verify Cloudflare proxy is OFF for the target records BEFORE adding to Vercel**

Sean owns this:
1. Open Cloudflare DNS dashboard for `seanwinslow.com`.
2. Locate any existing apex (`@`) or `www` records.
3. If proxy is ON (orange cloud), click to toggle to DNS-only (grey cloud) **before** the Vercel attach. Vercel handles its own edge + SSL; Cloudflare proxy causes SSL handshake friction if left on.

- [ ] **Step 4C.2: Sean adds `seanwinslow.com` + `www.seanwinslow.com` to Vercel**

Sean owns this:
1. Vercel dashboard → the new project → Settings → Domains.
2. Add `seanwinslow.com`. Vercel returns target A record (likely `76.76.21.21`) + CNAME for verification.
3. Add `www.seanwinslow.com`. Vercel returns a CNAME (likely `cname.vercel-dns.com`); set up as a www→apex redirect.

- [ ] **Step 4C.3: Sean adds the records in Cloudflare**

1. Cloudflare DNS dashboard for `seanwinslow.com`.
2. Add A record: Name `@`, IPv4 `76.76.21.21` (or whatever Vercel returned), Proxy status **DNS only** (grey cloud).
3. Add CNAME: Name `www`, Target `cname.vercel-dns.com` (or whatever Vercel returned), Proxy status **DNS only**.
4. Remove any conflicting old records (V3-bridge apex if still present).

- [ ] **Step 4C.4: Wait for SSL provisioning + verify**

Wait ~5 minutes. Then:

```bash
curl -I https://seanwinslow.com
```

Expected: `HTTP/2 200`. If SSL handshake fails, verify Cloudflare proxy is truly DNS-only (grey cloud), wait another 5 min, retry.

- [ ] **Step 4C.5: Verify the live site renders**

Open `https://seanwinslow.com` in a clean browser. Smoke-test as in Step 4B.3 but against the apex. Verify `/sitemap-index.xml` + `/transactions/rss.xml` now resolve at the apex with `seanwinslow.com` URLs throughout.

---

### Task 4D: Comms

**Files:**
- Modify: `CLAUDE.md` (status banner)
- Modify: `docs/prompts-and-references/2026-05-13-personal-site-deployment-deferred.md` (frontmatter + top note)
- Create: `docs/comms/2026-05-26-linkedin-launch.md`

- [ ] **Step 4D.1: Author the LinkedIn About paragraph via voice-modes + council**

Draft path (per ship-plan §5):
1. Invoke `.claude/skills/writing-voice-modes` with: `{ register: 'Sedaris (Domestic Observer)', surface: 'LinkedIn About paragraph (recruiter-facing, ~150 words)', constraints: 'single paragraph · ends with the seanwinslow.com URL · the parallel-lineage rule (PMP §3.1) honored · specific nouns · comedic juxtaposition without punchline · NO "passionate about" / "thrilled to" / "open to opportunities" language' }`.
2. Sean reviews v0 draft.
3. Invoke `/llm-council` (premium profile) with: surface · voice mode · design philosophy · three-load-bearing-things · template-trap warning · ask for voice fidelity score, template-drift sniff, line-level edits, cliché kill-list.
4. Apply council edits.
5. Save council transcript + final copy to `docs/comms/2026-05-26-linkedin-launch.md`.

- [ ] **Step 4D.2: Sean refreshes LinkedIn**

Sean owns this (UI clicks):
1. LinkedIn → Profile → Edit banner → upload `/transactions/` screenshot (1584×396 banner; take from the live site).
2. Edit Headline → `AI PM | Agent fleet operator | seanwinslow.com/transactions`.
3. Edit About → paste the ratified paragraph from `docs/comms/2026-05-26-linkedin-launch.md`.
4. "Open to Work" toggle: ON, **recruiter-only visibility** (not the public green frame).
5. Save.

- [ ] **Step 4D.3: Supersede the deferred-deployment doc**

Open `docs/prompts-and-references/2026-05-13-personal-site-deployment-deferred.md`. Add to the frontmatter:

```yaml
status: superseded-by-gap-fill-3
superseded_at: 2026-05-26
```

Add at the top of the body (immediately after the frontmatter):

```markdown
> **SUPERSEDED 2026-05-26.** Personal-site deployment landed via roadmap Task 1 Steps 3.5–3.9 + Phase 3F + Phase 4 of [docs/specs/SHIP-PLAN-2026-05-23.md](../specs/SHIP-PLAN-2026-05-23.md). The canonical deploy record is the SHIP-PLAN + the `docs/comms/2026-05-26-linkedin-launch.md` LinkedIn refresh trail.
```

- [ ] **Step 4D.4: Update CLAUDE.md status banner**

Open `CLAUDE.md`. Find the "## Current status (2026-05-21)" line + the row in the status table that says "The build | Not started — **all specs locked, all Phase 0 assets authored**; Astro 5 scaffold is the next session." Replace the section with:

```markdown
## Current status (2026-05-26)

seanwinslow.com is LIVE at https://seanwinslow.com (v1, hard-cutover from V3 bridge per PMP §10 Decision 9).

| Surface | Status |
|---|---|
| Phase 2 (hero + projects + about teaser + footer) | SHIPPED |
| Phase 3 (case studies + about + transactions + architecture + essays + contact + 404) | SHIPPED |
| Phase 3F (cursor fix + 5 case studies + 5 tile media + Pass C polish) | SHIPPED |
| Phase 4 (production + apex + LinkedIn refresh) | SHIPPED 2026-05-26 |
| v1.1 stretch (2 missing EXPLANATION.md → ledger ≥5, Daily Driver cron, agent-feed footer) | IN PROGRESS |
```

Plus update the "Immediate next:" line below the table to reflect v1.1 priorities.

- [ ] **Step 4D.5: Commit comms work**

```bash
cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio
git add CLAUDE.md docs/prompts-and-references/2026-05-13-personal-site-deployment-deferred.md docs/comms/2026-05-26-linkedin-launch.md
git commit -m "$(cat <<'EOF'
docs(phase-4 · 4D): site is live — CLAUDE.md status + supersede deferred doc + LinkedIn copy trail

- CLAUDE.md status banner: build LIVE at seanwinslow.com 2026-05-26
- 2026-05-13-personal-site-deployment-deferred.md: superseded-by-gap-fill-3
- docs/comms/2026-05-26-linkedin-launch.md: LinkedIn About paragraph
  (council-passed, transcript inline)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"

git push origin main
```

---

## MVP-STABLE-GATE (Mon 5/25 EOD or Tue 5/26 EOD)

- [ ] **Step MSG.1: All 5 Task 1 verification criteria green**

| # | Criterion | How |
|---|---|---|
| 1 | `https://seanwinslow.com` resolves with clean SSL | `curl -I https://seanwinslow.com` returns 200 |
| 2 | Home shows 5 project cards + 1 next-in-prod card | Manual visit |
| 3 | `/transactions/` shows ≥3 ledger rows | Click each of 3 deep-dives, verify 4Q + repo links |
| 4 | `/sitemap-index.xml` + `/transactions/rss.xml` resolve with apex URLs | Visit both; grep for `localhost` should return 0 |
| 5 | Sean's no-template-feeling gut-check | Sean reviews against PMP §1.3 diagnosis |

Plus the Phase 3F acceptance items + the LinkedIn refresh visible to a logged-out viewer with new headline.

- [ ] **Step MSG.2: Recruiter cold-read test**

Sean (or a trusted recruiter friend) opens the live site cold:
- **5-second test**: AI PM positioning + fleet + 3 ships visible? Pass / fail.
- **30-second test**: case-study clickthrough holds? Pass / fail.
- **2-minute test**: deep-read on the strongest case study (intent-eng-mcp) earns a callback intent? Pass / fail.

If any of the three fail: log the failure mode + decide whether it's launch-blocking. Most likely: cosmetic issues that get patched in v1.1.

---

## Phase 4E — v1.1 stretch (Wed–Fri 5/27–5/29)

Stretch unlock rule: pull these in priority order only if MVP-stable gate is green AND Sean has bandwidth. Drop any item that pushes past 22:00.

### Task 4E.1: 2 missing EXPLANATION.md → ledger ≥5 rows (Wed AM)

- [ ] Lift `vault-synthesizer-eval-suite/EXPLANATION.md` + `substack-drafter/EXPLANATION.md` from `~/Code-Brain/code-brain/` into `src/content/transactions/vault-synthesizer-eval-suite.mdx` + `src/content/transactions/substack-drafter.mdx`. Adapt to the transactions content collection schema (frontmatter + 4 h2 headings). Run `npm run prebuild` to validate crosslinks. Commit + push (triggers Vercel auto-deploy). Target: 2 new ledger rows live within 90 min.

### Task 4E.2: Daily Driver morning cron (Wed PM)

- [ ] Wire the morning agent in `~/Code-Brain/code-brain/agents-sdk/` to write the 4 JSON endpoints automatically each morning at 08:45. Add `RunAtLoad=true` + idempotency guards per today's daily note's 5/23 medium item. Test via manual launchctl fire.

### Task 4E.3: Agent-feed footer module (Thu)

- [ ] New brainstorm: spec the sub-daily ledger surface for the footer. Per CLAUDE.md "three load-bearing things" §3 the daily-dated layer needs a sub-daily surface beyond dateline + about-pulse. Author its own spec, decompose into its own plan, ship Thu.

### Task 4E.4: Audit + recruiter-feedback patches (Fri)

- [ ] Process any post-launch recruiter feedback. Triage the remaining 17 audit screenshots from `docs/bugs-changes/screenshots/26-05-23-audit/`. Patch what's worth patching.

---

## Acceptance criteria (entire plan)

- [ ] **A1**: `Cursor.tsx` console errors closed; zero hook-related errors on `/`.
- [ ] **A2.a**: All 5 case-study MDX files have zero `[PLACEHOLDER]` markers; openers council-passed; transcripts saved per surface.
- [ ] **A2.b**: 12 vestige markers stripped (4 files × Q2/Q3/Q4); About B-2 ¶3 + B-4 ¶2 authored (¶3 council-passed).
- [ ] **A3**: All 4 daily-driver JSON files carry `date_iso: 2026-05-24` (or `updated_at` bump); home dateline shows MAY 24, 2026.
- [ ] **A4**: `grep -r "PLACEHOLDER" src/content/ src/pages/` returns 0.
- [ ] **B1**: A-3 tile content stays inside grid cell at 390 / 768 / 1440 / 2560.
- [ ] **B2**: Teaser swiper cascade visible at desktop first paint (front + 3+ cards behind).
- [ ] **B3**: All 5 `public/assets/projects/*.webp` exist, each ≤180 KB, all 800×1000; CHANGELOG entry committed (per tile-media plan §Task 7).
- [ ] **B4**: `npm run build` green; zero console errors on `/` and all sub-pages.
- [ ] **C1**: Home page payload drops ≥1 MB after diagram-lib code-split; architecture page still renders Mermaid.
- [ ] **C2**: With `prefers-reduced-motion: reduce`, no `<video>` element in DOM.
- [ ] **C3**: `meaning-over-access.mdx` frontmatter — title matches slug, status in locked enum, no future-dating.
- [ ] **C4**: No 301 hops on tile clicks.
- [ ] **C5**: `/architecture/<slug>/` resolves from index row click.
- [ ] **C6**: Repo root clean of audit-*.png + .audit-screens/; screenshots moved to docs/bugs-changes/screenshots/.
- [ ] **4A**: `npm run build` produces sitemap + RSS with `seanwinslow.com` URLs, no `localhost`.
- [ ] **4B**: Vercel `*.vercel.app` preview URL smoke-test green.
- [ ] **4C**: `https://seanwinslow.com` resolves with clean SSL; sitemap + RSS at apex.
- [ ] **4D**: LinkedIn refreshed (banner + headline + About + Open-to-Work recruiter-only); CLAUDE.md status banner updated; deferred-deploy doc superseded; LinkedIn copy trail saved.
- [ ] **MSG**: Sean's no-template-feeling gut-check passes against PMP §1.3 diagnosis.

---

## Out of scope for this plan

- The tile-media implementation (B3) — has its own plan; this plan references it but does not re-decompose.
- The Phase 3F doc's Pass A/B/C high-level structure — this plan inherits it; per-pass detail lives in that doc.
- v1.1 stretch detail beyond the brief Phase 4E sketch — each Wed/Thu/Fri item earns its own plan if it touches non-trivial code.
- Agent-feed footer module spec — earns its own brainstorm before any implementation.

---

## Self-review notes (Claude internal)

- **Spec coverage:** Every phase in SHIP-PLAN-2026-05-23.md §2 has at least one task. Phase 3F A1/A2.a/A2.b/A3/A4 + B1/B2/B3 (ref'd)/B4 + C1/C2/C3/C4/C5/C6 + Phase 4A/4B/4C/4D + MVP-content-gate + MVP-stable-gate + 4E v1.1 stretch all addressed.
- **Placeholder scan:** Two intentional `<N>` placeholders in A3 (commit count to be substituted at execution) and Step C3.1 Option-A-vs-B (Sean confirms at execution) — both are explicit decision points, not vague hand-waving. Fixed.
- **Type/path consistency:** All file paths absolute or repo-relative. All component paths verified via grep. All JSON schema fields match the consumer (A3.2 verifies before A3.3 writes).
- **Subagent dispatch shape:** A2.a dispatches 5 subagents serially in the plan (one per case study) — but they CAN run in parallel via the `superpowers:subagent-driven-development` skill at execution time. B3 dispatches 4 subagents in parallel after A-5 crop validates pipeline. Council passes serial against subagent outputs (council is the Sean-review-bottleneck moment).
- **Ordering rationale:** A1 first (closes P0 console errors before anything else; otherwise dev work is noisy). A2.b before A2.a (vestige strips are cheap + win confidence). A2.a (long pole) on Sun afternoon (parallel subagents). A3 fast (15min). A4 wrap. B1+B2 fast on Mon AM. B3 via tile-media plan + subagents. B4 wrap. C1-C6 in numbered order Mon PM. Phase 4 Tue AM (or Mon late if ahead).
