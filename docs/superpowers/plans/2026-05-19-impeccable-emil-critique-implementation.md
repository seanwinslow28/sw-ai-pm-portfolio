# Impeccable + Emil Critique Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the 7-item punch list + motion/typography/structural fixes from `docs/impeccable-and-emil-design-critique.md` to the locked spec set under `docs/specs/`, so the build session opens with no known blockers.

**Architecture:** Pure spec edits — no code yet. Each task targets one spec file and makes a surgical change anchored to a named section. Every edit gets a CHANGELOG entry per the project's `CHANGELOG.md` "How to add an entry" rules. Group commits by spec so the diff for any one spec is reviewable.

**Tech Stack:** Markdown specs in `docs/specs/`, the root `CHANGELOG.md`, and (for the load-bearing-things rename) `CLAUDE.md`. No build scripts run yet.

**Critique cross-reference:** Every task below cites the section of `docs/impeccable-and-emil-design-critique.md` it addresses (e.g., `[crit §1.1]`, `[crit §2 row 1]`).

**Edits already landed before this plan** (verified via `CHANGELOG.md`):
- MCP-embed URL contradiction (hero §14) — done 2026-05-19 audit fix C-2.1.
- `relatedArchitecture` additive on transactions §3.2 — done 2026-05-19 audit fix I-1.1.

Those two punch-list items (the 4th and 7th) are **already complete** and do not appear as tasks below.

---

## Conventions

- **Files paths** are absolute from repo root: `docs/specs/<file>.md`, `CHANGELOG.md`, `CLAUDE.md`.
- **Section anchors** like "§9.2" refer to the heading numbering as it appears in the spec body (run `grep -n "^##\|^### " docs/specs/<file>.md` to find line numbers).
- **CHANGELOG entries** go under the spec's existing subsection (e.g., `### [`docs/about-spec-v1.md`](docs/about-spec-v1.md)`) and are reverse-chronological (newest first). Each entry leads with the date + short label, names the affected spec sections (§N.N), and matches the voice rules in `docs/PORTFOLIO-MASTER-PLAN.md` §3.
- **Commits** use the project's conventional-commits style. Reference the critique file: `docs(specs): ... per impeccable+emil critique`.
- **No build verification** — these are spec edits. Verification is: the spec reads cleanly with the new text, no broken anchors, no inconsistent counterparts, and the CHANGELOG entry is present.

---

## Task 1: Resolve blocker 1.1 — B-1 lane rule (about-spec §9.2 + §6) `[crit §1.1, §2 row 5]`

**The decision:** Render the per-beat lane-tint rule as an **SVG `<line>` element**, not a CSS `border-left`. This is the option the critique recommends; it (a) sidesteps Impeccable's side-stripe-border ban because the affordance reads as a timeline scrubber, not a card border, (b) preserves the `stroke-dasharray` animation the §6 motion timeline already calls for, and (c) keeps the braided-beat linear-gradient legal (Impeccable allows strategic background gradients; the gradient lives on a vertical SVG stroke, not on text or a card surface).

**Files:**
- Modify: `docs/specs/about-spec-v1.md` §6 (line ~307) and §9.2 (lines ~421–429), §9.3 (lines ~431–439)
- Modify: `CHANGELOG.md` under `### [`docs/about-spec-v1.md`](docs/about-spec-v1.md)`

- [ ] **Step 1: Read the current §9.2 component shape**

Read [docs/specs/about-spec-v1.md](docs/specs/about-spec-v1.md) lines 421–440 to confirm the current "Lane-tint rule" bullet (currently described as "a left-margin vertical bar, 3px wide desktop / 4px mobile, running the full height of the beat").

- [ ] **Step 2: Rewrite the §9.2 "Lane-tint rule" bullet to declare SVG**

Replace the third bullet under "Each beat has three parts:" with:

```markdown
  3. **Lane-tint rule** — an SVG `<line>` (NOT a CSS `border-left`) rendered as the first child of the beat container. Stroke 3px desktop / 4px mobile, full beat height (date line + body). The line sits ~16px to the left of the date line. Stroke color is determined per-beat (see §9.3). This is rendered as SVG explicitly to (a) sidestep the side-stripe-border anti-pattern by reading as a timeline scrubber rather than a card affordance, and (b) animate via `stroke-dasharray` per §6.
```

- [ ] **Step 3: Append a §9.2.1 subsection clarifying the SVG markup**

Insert immediately after the four bullets in §9.2 (after "Vertical spacing — …"), as a new subsection:

```markdown
### 9.2.1 The lane-rule SVG markup (canonical)

Each beat renders a single-`<line>` SVG, sized to match the beat's content height via JS measurement on mount (the height isn't known at server-render time because beat bodies wrap to a variable number of lines). For Animator beats the stroke is the amber solid; for PM beats, the teal solid; for braided beats, a `linearGradient` defined in `<defs>` inside the same SVG:

```html
<svg class="lane-rule" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="braid-{slug}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"  stop-color="#FAC775" />
      <stop offset="100%" stop-color="#0A3E42" />
    </linearGradient>
  </defs>
  <line x1="0" y1="0" x2="0" y2="100%"
        stroke="url(#braid-{slug})"
        stroke-width="3"
        stroke-dasharray="0 9999"
        class="lane-rule__stroke" />
</svg>
```

The `stroke-dasharray="0 9999"` start state hides the stroke; the reveal animation lerps it to `9999 0` (full draw). See §6 for the reveal timing.

**Why the gradient is sanctioned (color-strategy note):** Per PMP §5, the site bans gradient text and bans gradient backgrounds on full-bleed surfaces. A linear gradient on a vertical SVG `<line>` stroke is a *strategic* gradient — it carries semantic meaning (this beat braids both lineages), is the only multi-color gradient on the site, and lives at <1% of the section's pixel area. Document the exemption in PMP §5.
```

- [ ] **Step 4: Update §9.3 to remove the redundant "left-margin vertical bar" phrasing**

In the §9.3 table, change the header row's "Rule color" column header to "Stroke color" and confirm the body cells still read correctly (they already specify the amber / teal / gradient values — no body changes needed).

- [ ] **Step 5: Update §6 motion timeline row for the lane-rule reveal**

The current §6 row at the `viewport-triggered` per-beat trigger reads "The lane-tint rule for that beat reveals via SVG `stroke-dasharray` top-to-bottom **after** the beat body lands (200ms delay) — the rule 'draws in' as the beat settles…" — confirm this language already names SVG (it does). No edit needed in §6, but verify the wording is consistent.

- [ ] **Step 6: Add the CHANGELOG entry**

Prepend (newest-first) under `### [`docs/about-spec-v1.md`](docs/about-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix 1.1 — SVG lane rule):** §9.2 + new §9.2.1 — the B-1 lane-tint rule is now explicitly an SVG `<line>` element with `stroke-dasharray` animation, not a CSS `border-left`. Sidesteps Impeccable's side-stripe-border ban by reframing the affordance as a timeline scrubber. Preserves the §6 reveal animation contract (the prior wording was self-inconsistent: §6 wanted `stroke-dasharray`, §9.2 implied a CSS border). Per `impeccable-and-emil-design-critique.md` blocker 1.1.
```

- [ ] **Step 7: Commit**

```bash
git add docs/specs/about-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(about-spec): switch B-1 lane rule to SVG line per critique blocker 1.1

§9.2 + new §9.2.1 — the lane-tint rule is now explicitly an SVG <line>
with stroke-dasharray animation, not a CSS border-left. Sidesteps
Impeccable's side-stripe-border ban; preserves the §6 reveal contract.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Resolve blocker 1.2 — projects tile hover ≤300ms (projects §8) `[crit §1.2, §2 row 1]`

**The fix:** Change the tile-media hover from `scale(1.04) over 700ms cubic-bezier(0.4, 0, 0.2, 1)` to `scale(1.03) over 220ms cubic-bezier(0.23, 1, 0.32, 1)`. Crisp hover feedback at the moment recruiters are scanning.

**Files:**
- Modify: `docs/specs/projects-section-spec-v1.md` §8 (lines ~218–223)
- Modify: `CHANGELOG.md` under `### [`docs/projects-section-spec-v1.md`](docs/projects-section-spec-v1.md)`

- [ ] **Step 1: Edit the §8 hover table — tile media row**

Replace the "Tile media" row in the table at lines ~220–223. Current:

```markdown
| Tile media | `scale(1.04)` | 700ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
```

New:

```markdown
| Tile media | `scale(1.03)` | 220ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
```

- [ ] **Step 2: Add a one-line note immediately after the §8 table**

Insert a single line below the table (after the cursor-preview paragraph at line ~225) explaining the timing constraint:

```markdown
**Why 220ms / scale(1.03):** UI hover stays under 300ms per Emil's frequency framework. The lower 1.03 scale keeps the image from jumping under the cursor at the moment recruiters are scanning tiles.
```

- [ ] **Step 3: Add the CHANGELOG entry**

Prepend under `### [`docs/projects-section-spec-v1.md`](docs/projects-section-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix 1.2 — tile hover ≤300ms):** §8 tile-media hover timing was 700ms / scale(1.04) / cubic-bezier(0.4, 0, 0.2, 1) — sluggish at the exact moment recruiters scan tiles. Now 220ms / scale(1.03) / cubic-bezier(0.23, 1, 0.32, 1). Per Emil's UI-animation-under-300ms rule and `impeccable-and-emil-design-critique.md` blocker 1.2 + §2 row 1.
```

- [ ] **Step 4: Commit**

```bash
git add docs/specs/projects-section-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(projects-spec): tighten tile hover to 220ms per critique blocker 1.2

§8 — tile-media hover was 700ms / scale(1.04). Now 220ms / scale(1.03)
with cubic-bezier(0.23, 1, 0.32, 1). Hover stays under 300ms per Emil.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Resolve blocker 1.3 — declare Committed-teal color strategy (PMP §2.2 + §5) `[crit §1.3]`

**The fix:** The texture-and-artifacts spec promoted teal `#0A3E42` from a per-section splash to full-bleed structural chrome (Z=0, visible through every torn-paper edge on every page). Per Impeccable's color-strategy axis, the site moved from "Restrained" (tinted neutrals + one accent ≤10%) to "Committed" (one saturated color carries 30–60%). PMP §2.2 still describes the prior math. Declare the strategy shift explicitly in PMP and reconcile §5.

**Files:**
- Modify: `docs/specs/PORTFOLIO-MASTER-PLAN.md` §2.2 (around line 111–115) and §5 (likely under "Top 5" / D2 rationale, around lines 201–235)
- Modify: `CHANGELOG.md` under a new `## Non-spec changes` entry (PMP is non-spec) — actually PMP lives at `docs/specs/PORTFOLIO-MASTER-PLAN.md`; treat as a spec change. If the CHANGELOG doesn't have a PMP subsection yet, add one alphabetically.

- [ ] **Step 1: Read PMP §2.2 and §5 to confirm current text**

Read [docs/specs/PORTFOLIO-MASTER-PLAN.md](docs/specs/PORTFOLIO-MASTER-PLAN.md) lines 111–116 (§2.2) and 187–235 (§5). Confirm §2.2 contains "95% of the site is warm paper" and "one full-bleed splash-color moment, never two."

- [ ] **Step 2: Rewrite §2.2 to declare Committed-teal**

Replace §2.2 entirely with:

```markdown
### 2.2 The aesthetic rule Sean stated

> "I'm a fan of simplicity with splashes of color."

Codified as a two-layer architecture (locked in `docs/specs/texture-and-artifacts-spec-v1.md` §2):

- **The substrate is Committed-teal.** A persistent teal `#0A3E42` chrome at Z=0 carries the site as a structural color — visible through every torn-paper edge on every page. Per Impeccable's color-strategy axis, this is a *Committed* palette (one saturated color carrying 30–60% of the visible page surface), not the Restrained palette earlier drafts described.
- **The page surface is paper.** Each page sits on the chrome as a cream `#FFF9F0` paper sheet at Z=10, with torn-paper edges revealing the teal at the seams.
- **Each section still earns *one* full-bleed splash-color block, never two** — this rule survives intact. The chrome and the splash blocks are at different z-layers (Z=0 vs Z=20) and serve different jobs: the chrome is the *book cover*, the splash blocks are *full-page color illustrations inside the book*. Sections without a splash (hero, About) sit on paper-on-chrome and read as 95% paper.

The "Iterative Blueprint" mockup violated both rules — four colors at once on every screen, no substrate logic. Committed-teal fits the autobiography thesis (the chrome IS the book cover); Restrained-paper-with-one-accent would have been too quiet for an animator-as-PM positioning.
```

- [ ] **Step 3: Update §5 / D2 rationale**

In §5.2's D2 row (line ~206), the current text reads "One splash color per section, never two — 95% paper+ink; work section = full teal; contact = amber; about = soft coral; torn-paper edges between". Append a clarifying clause after "torn-paper edges between":

```markdown
| D2 | **One splash color per section, never two** — 95% paper+ink at the section level; work section = full teal splash; contact = amber; about = paper-no-splash; torn-paper edges between. Layered over a **Committed-teal chrome substrate** (Z=0, full-bleed, visible through every torn edge — see §2.2) so the site reads as paper-on-teal at rest, with full-bleed splash blocks per section. | Codifies "simplicity with splashes of color" as a two-layer architecture (chrome + page), not a flat palette | H/L |
```

- [ ] **Step 4: Search for any other §5/§6 references that still describe the prior "95% paper" math**

Run `grep -n "95% of the site\|95% paper" docs/specs/PORTFOLIO-MASTER-PLAN.md docs/specs/hero-spec-v1.md`. For each hit, verify the surrounding context still parses with the new Committed-teal framing. The hero §10 "one splash per section" rule still parses (section splash blocks are still one-per-section; the chrome is a different layer) — no edit needed in hero. Only adjust PMP hits that aren't already covered by the §2.2 rewrite.

- [ ] **Step 5: Add CHANGELOG entries**

PMP edits land under `## Non-spec changes` per CHANGELOG's own rules ("Use this section for changes to [`CLAUDE.md`](CLAUDE.md), [`docs/PORTFOLIO-MASTER-PLAN.md`](docs/PORTFOLIO-MASTER-PLAN.md)…"). Prepend (newest-first) under `## Non-spec changes`:

```markdown
- **2026-05-19 (critique fix 1.3 — Committed-teal color strategy):** [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) §2.2 + §5 D2 row — declared the site's color strategy as **Committed-teal** (one saturated color carrying 30–60% of visible surface) rather than the prior Restrained-paper math ("95% paper, one accent ≤10%"). The texture-and-artifacts spec promoted teal `#0A3E42` from a per-section splash to full-bleed structural chrome at Z=0 — Committed is the honest framing now. The one-splash-per-section rule survives intact; chrome and splash blocks are at different z-layers serving different jobs. Per `impeccable-and-emil-design-critique.md` blocker 1.3.
```

- [ ] **Step 6: Commit**

```bash
git add docs/specs/PORTFOLIO-MASTER-PLAN.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(pmp): declare Committed-teal color strategy per critique blocker 1.3

§2.2 + §5 — teal chrome promotion (Z=0 substrate) moved the site from
Restrained to Committed on Impeccable's color-strategy axis. Declare it
explicitly; one-splash-per-section rule preserved at a different z-layer.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Specify the missing hero cursor-hover duration (hero §9) `[crit punch #5, §2 row 2]`

**The fix:** The §9 "Sean Winslow" name → 60px circle cursor expansion has no explicit duration today. Specify `160ms cubic-bezier(0.23, 1, 0.32, 1)` (Emil's snap-feedback range for button-press equivalents).

**Files:**
- Modify: `docs/specs/hero-spec-v1.md` §9 (lines ~241–257)
- Modify: `CHANGELOG.md` under `### [`docs/hero-spec-v1.md`](docs/hero-spec-v1.md)`

- [ ] **Step 1: Edit the §9 hover-state table**

Replace the current `Sean Winslow` row in the §9 table:

```markdown
| `Sean Winslow` (name) | Scales to a 60px circle, ink fill, blend-difference | Click does nothing — name is not a link |
```

with:

```markdown
| `Sean Winslow` (name) | Scales to a 60px circle, ink fill, blend-difference. Transition: 160ms `cubic-bezier(0.23, 1, 0.32, 1)` | Click does nothing — name is not a link. The 160ms is Emil's snap-feedback range for button-press equivalents; leaving it unspecified would invite an implementer-default ease-in. |
```

- [ ] **Step 2: Add the CHANGELOG entry**

Prepend under `### [`docs/hero-spec-v1.md`](docs/hero-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix punch #5 — cursor hover duration):** §9 — the name-hover cursor expansion (default 6px dot → 60px circle) was missing an explicit transition duration; specified 160ms `cubic-bezier(0.23, 1, 0.32, 1)`. Emil's snap-feedback range; leaving it unspecified would invite an implementer-default ease-in. Per `impeccable-and-emil-design-critique.md` §2 row 2.
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/hero-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(hero-spec): specify cursor hover duration per critique punch #5

§9 — Sean Winslow name-hover cursor transition: 160ms cubic-bezier
(0.23, 1, 0.32, 1). Was unspecified; would have defaulted to ease-in.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Hero motion timing tightening (hero §6 name reveal + tagline) `[crit §2 row 3 + row 6]`

**The fix:** Two changes to the §6 motion timeline:

1. **Name reveal**: was `translateY(40px)` → `0`, 20ms stagger × ~12 chars = ~840ms total reveal. New: `translateY(24px)` → `0`, 18ms stagger.
2. **Tagline**: was per-line `translateY(60%)` → `0`. New: `translateY(28px)` → `0` (fixed-px, not percentage) — percentage translation can briefly overshoot the line-box at small sizes.

**Files:**
- Modify: `docs/specs/hero-spec-v1.md` §6 (lines ~131–137)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Edit the §6 Name row**

Replace the row at line ~135. Current:

```markdown
| 400 | Name (`Sean Winslow`) | Per-character stagger, translateY(40px) → 0 + opacity 0 → 1 | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms, 20ms/char stagger |
```

New:

```markdown
| 400 | Name (`Sean Winslow`) | Per-character stagger, translateY(24px) → 0 + opacity 0 → 1 | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms, 18ms/char stagger (target ~600ms total reveal) |
```

- [ ] **Step 2: Edit the §6 Tagline row**

Replace the row at line ~137. Current:

```markdown
| 900 | Tagline | Per-line reveal (1 line desktop, 2-3 mobile); each line translateY(60%) → 0 + opacity | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 700ms, 120ms/line stagger |
```

New:

```markdown
| 900 | Tagline | Per-line reveal (1 line desktop, 2-3 mobile); each line translateY(28px) → 0 + opacity. Fixed-px offset (NOT a percentage) so the line doesn't briefly overshoot the line-box at small sizes. Verify in QA that no layout shift fires during the reveal. | `cubic-bezier(0.165, 0.84, 0.44, 1)` | 700ms, 120ms/line stagger |
```

- [ ] **Step 3: Add the CHANGELOG entry**

Prepend under `### [`docs/hero-spec-v1.md`](docs/hero-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §2 rows 3 + 6 — name + tagline motion):** §6 — (a) Name reveal: `translateY(40px)` → `translateY(24px)`, stagger 20ms → 18ms (40px on each of 12 letters was a lot of distance for a confident name reveal). (b) Tagline reveal: `translateY(60%)` → `translateY(28px)` — fixed-px offset prevents the line briefly overshooting the line-box at small sizes. Per `impeccable-and-emil-design-critique.md` §2 rows 3 + 6.
```

- [ ] **Step 4: Commit**

```bash
git add docs/specs/hero-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(hero-spec): tighten name + tagline motion per critique §2

§6 — Name: translateY(40px)→24px, 18ms stagger. Tagline: translateY
(60%)→28px fixed-px so the line doesn't overshoot at small sizes.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: About-spec signature easing + cartoon-cel grid intervention (about §6 + §11) `[crit §2 row 4, §3 cards]`

**The fix:** Two about-spec edits:

1. **§6 signature easing**: keep 1200ms, switch easing from `cubic-bezier(0.6, 0, 0.4, 1)` (essentially ease-in-out) to `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out — the pen starts fast then settles).
2. **§11 cartoon-cel grid**: add (a) per-cel ±1.5° rotation (frontmatter-driven, defaults randomized at author time) to break the bento-box feel, and (b) allow the "this one rewires you" cel to break the grid — slightly larger / differently framed. The §11.7 annotation already singles it out; let geometry do the work too.

**Files:**
- Modify: `docs/specs/about-spec-v1.md` §6 (line ~311), §11.3 (lines ~523–544), §11.7 (line ~590)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Edit §6 signature easing**

Replace the §6 row at line ~311. Current:

```markdown
| viewport-triggered | Signature | SVG `stroke-dasharray` reveal — the signature draws itself in | `cubic-bezier(0.6, 0, 0.4, 1)` | 1200ms |
```

New:

```markdown
| viewport-triggered | Signature | SVG `stroke-dasharray` reveal — the signature draws itself in. The easing reads as a pen writing: starts fast (the down-stroke), settles into the closing curl. | `cubic-bezier(0.16, 1, 0.3, 1)` | 1200ms |
```

- [ ] **Step 2: Edit §11.3 to add per-cel rotation**

The cel-component table at lines ~528–534 describes a flat cel composition. Append a new row to the table immediately before the closing of the cel-composition table:

```markdown
| Cel rotation | The entire cel (registration pegs + body + name strip) rotates ±1.5° around its center. Angle is set per-cel via frontmatter (`angle: -1.2`, `angle: 1.4`, etc.); when omitted, the build script `scripts/randomize_cel_angles.mjs` writes a stable randomized angle in the ±1.5° range at first build (cached in `src/content/cartoons/_angles.json` so the layout doesn't reshuffle between builds). The rotation breaks the 3×2 bento-box feel without destabilizing the read. |
```

Then in §11.6's frontmatter shape (around line 573–583), add the `angle` field example:

```yaml
---
order: 1
name: WILE E. COYOTE
year_range: 1949–
studio: Warner Bros
image: /assets/cartoons/coyote-study.png
image_alt: pencil-test study of Wile E. Coyote in mid-anticipation crouch
lesson_noun: ANTICIPATION TIMING
lesson_body: the wind-up sells every gag. ship the wind-up before the deliverable.
angle: -0.8  # optional; ±1.5° range; defaults to a stable random value if omitted
break_grid: false  # optional; when true, cel renders at 1.2× scale and breaks the 3×2 grid — reserved for the rewires-you cel per §11.7
---
```

- [ ] **Step 3: Add a §11.3.1 subsection for the break-grid cel**

Insert a new subsection after the cel-component table (between §11.3 and §11.4):

```markdown
### 11.3.1 The "rewires-you" cel breaks the grid

One cel — the cel Sean considers most load-bearing (the cel the §11.7 annotation arrows at) — sets `break_grid: true` in its frontmatter. That cel renders at **1.2× scale** (336×384 instead of 280×320) and **spans two grid columns** on desktop, pushing the cels around it to reflow. The §11.7 annotation arrow + the geometric break work in concert: typography flags the cel, geometry confirms it. Without the break, all 6 cels read at identical visual weight despite the annotation calling one out — the bento-box quality the spec was trying to dodge.

Mobile (§11.5): `break_grid: true` is a no-op (single-column stack already gives every cel equal width). The visual emphasis comes from the annotation alone on mobile.
```

- [ ] **Step 4: Add the CHANGELOG entry**

Prepend under `### [`docs/about-spec-v1.md`](docs/about-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §2 row 4 + §3 cards — signature easing + cel grid):** Two edits. §6: signature stroke-dasharray easing was `cubic-bezier(0.6, 0, 0.4, 1)` (ease-in-out); switched to `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out) — reads as a pen writing in, fast down-stroke then settle. §11.3 + new §11.3.1: cels now carry a frontmatter `angle: ±1.5°` (defaults randomized + cached) and one cel (the §11.7 "rewires-you" cel) sets `break_grid: true` to render 1.2× and span two columns — breaks the 3×2 bento-box feel; geometry now confirms what the annotation already flags. Per `impeccable-and-emil-design-critique.md` §2 row 4 + §3 "Identical card grids" finding.
```

- [ ] **Step 5: Commit**

```bash
git add docs/specs/about-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(about-spec): signature easing + cel grid break per critique §2 + §3

§6: signature easing 0.6/0/0.4/1 → 0.16/1/0.3/1 (reads as pen writing
in). §11.3 + new §11.3.1: per-cel ±1.5° rotation (frontmatter-driven)
+ one cel breaks the 3×2 grid at 1.2× scale.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Lock the view-transition object-fit contract (projects §10 + case-study §6) `[crit §2 row 7]`

**The fix:** Astro's View Transition cross-fade looks broken when the source is `object-fit: cover` (tile) and the destination is `object-fit: contain` (full-bleed hero). The two ends of the shared `view-transition-name: hero-media-<slug>` must use the same `object-fit`. Lock both to `cover` and document the contract.

**Files:**
- Modify: `docs/specs/projects-section-spec-v1.md` §10 "View Transitions" (lines ~264–269)
- Modify: `docs/specs/case-study-spec-v1.md` §6 motion timeline (lines ~245–254) and §2 Anatomy hero-media entry
- Modify: `CHANGELOG.md` (two entries — one per spec)

- [ ] **Step 1: Edit projects-spec §10 View Transitions**

Append a new bullet to the "View Transitions" subsection at line ~268, immediately after the existing `view-transition-name` bullet:

```markdown
- **object-fit must match at both endpoints.** Tile `<img>`/`<video>` and case-study hero media both render with `object-fit: cover` and `object-position: center`. A `cover`/`contain` mismatch makes the cross-fade snap mid-transition (the morphed element resizes between the two `object-fit` rules). Lock both ends to `cover`. The case-study hero's full-bleed framing is achieved by making the *container* full-bleed; the inner media still covers, never contains.
```

- [ ] **Step 2: Edit case-study-spec §6 to confirm the contract**

In §6 (line ~247), the row reading "Hero media (shared element) | Cross-fade + morph from tile to full-bleed position..." — append a parenthetical clause:

```markdown
| 0 | Hero media (shared element) | Cross-fade + morph from tile to full-bleed position (Astro View Transitions handles natively). **Both endpoints use `object-fit: cover` + `object-position: center`** — a `cover`/`contain` mismatch would snap the morph mid-transition. See projects-spec §10. | browser default | ~400ms |
```

- [ ] **Step 3: Add CHANGELOG entries (one per spec)**

Prepend under `### [`docs/projects-section-spec-v1.md`](docs/projects-section-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §2 row 7 — view-transition object-fit lock):** §10 — added an explicit bullet locking `object-fit: cover` at both endpoints of the shared `view-transition-name: hero-media-<slug>`. A `cover`/`contain` mismatch would snap the morph mid-transition; the case-study hero achieves full-bleed via container framing, not via `contain`. Per `impeccable-and-emil-design-critique.md` §2 row 7.
```

Prepend under `### [`docs/case-study-spec-v1.md`](docs/case-study-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §2 row 7 — view-transition object-fit lock):** §6 — annotated the hero-media cross-fade row to lock `object-fit: cover` at both endpoints (matching the projects-spec §10 contract). Container is full-bleed; inner media is `cover`. Per `impeccable-and-emil-design-critique.md` §2 row 7.
```

- [ ] **Step 4: Commit**

```bash
git add docs/specs/projects-section-spec-v1.md docs/specs/case-study-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(projects+case-study): lock view-transition object-fit contract

projects §10 + case-study §6 — both ends of shared view-transition-name
must use object-fit: cover. Container is full-bleed; media is cover.
A cover/contain mismatch snaps the morph mid-transition.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Drop the annotation idle bob (projects §9) `[crit §2 row 8]`

**The fix:** The "Subtle bob (rotate ±2°) at 4s/cycle thereafter" on the updated-weekly arrow falls into Emil's "looks cool, will see it 1000+ times" zone — persistent ambient motion on a decorative SVG. Settle on first reveal, then static.

**Files:**
- Modify: `docs/specs/projects-section-spec-v1.md` §9 (lines ~235–241)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Edit the §9 annotation table — row #1**

Replace the row for annotation #1. Current:

```markdown
| 1 | **Curved arrow with "updated weekly"** — points at the `UPDATED 2026-05-13` dateline label | Just below the dateline label, ~20px right of "UPDATED" | Fades in 800ms after the section enters viewport. Subtle bob (rotate ±2°) at 4s/cycle thereafter |
```

New:

```markdown
| 1 | **Curved arrow with "updated weekly"** — points at the `UPDATED 2026-05-13` dateline label | Just below the dateline label, ~20px right of "UPDATED" | Fades in 800ms after the section enters viewport. Static thereafter (no idle bob — decorative SVG ambient motion falls into Emil's "looks cool, will see it 1000+ times" zone). |
```

- [ ] **Step 2: Add the CHANGELOG entry**

Prepend under `### [`docs/projects-section-spec-v1.md`](docs/projects-section-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §2 row 8 — drop annotation idle bob):** §9 — removed the "subtle bob (rotate ±2°) at 4s/cycle" from the updated-weekly arrow annotation. The annotation is decorative (the dateline below it carries the actual information); persistent ambient rotation on a decorative SVG is Emil's "looks cool, will see it 1000+ times" anti-pattern. Settle on first reveal, then static. Per `impeccable-and-emil-design-critique.md` §2 row 8.
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/projects-section-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(projects-spec): drop annotation idle bob per critique §2 row 8

§9 — updated-weekly arrow no longer bobs ±2° at 4s/cycle. Decorative
SVG ambient motion → Emil's "see it 1000+ times" anti-pattern.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Document the em-dash exception for wire-service copy (PMP §3) `[crit §3 "Em dashes in wire-service copy"]`

**The fix:** Datelines are em-dash-heavy by inheritance from real newspapers (e.g., `BOSTON, MAY 13, 2026 — vault indexer…`). Impeccable bans em dashes in product copy. This is a deliberate editorial choice — document it once in PMP §3 so future sessions don't keep "fixing" it.

**Files:**
- Modify: `docs/specs/PORTFOLIO-MASTER-PLAN.md` §3 (around §3.2 "Other voice notes", line ~133)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Append a new bullet to §3.2 "Other voice notes"**

After the existing bullets at lines ~135–138, add:

```markdown
- **Em-dash exception, wire-service register only.** Datelines and other wire-service-coded copy use em dashes by inheritance from real newspaper typography (e.g., `BOSTON, MAY 13, 2026 — vault indexer wrote 47 chunks`). Impeccable's default rule bans em dashes in product copy; this exception is a deliberate editorial choice limited to the *wire-service register* surfaces only — datelines, ledger captions, methods-strip prefixes, Daily-Driver-written body copy. The editorial register (hero, About, case-study narrative, essays) and any non-mono surface follows Impeccable's no-em-dash rule. If a future session "fixes" em dashes in a dateline, it's regressing the brand voice.
```

- [ ] **Step 2: Add the CHANGELOG entry**

PMP edits go under `## Non-spec changes`. Prepend:

```markdown
- **2026-05-19 (critique fix §3 — em-dash exception):** [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) §3.2 — documented the em-dash exception for wire-service register surfaces (datelines, ledger captions, methods-strip prefixes, Daily Driver-written body copy). The editorial register still follows Impeccable's no-em-dash rule. Locking this exception once prevents future sessions from "fixing" dateline em dashes. Per `impeccable-and-emil-design-critique.md` §3 "Em dashes in wire-service copy".
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/PORTFOLIO-MASTER-PLAN.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(pmp): document em-dash exception for wire-service per critique §3

§3.2 — em dashes are allowed in wire-service register only (datelines,
ledger captions, methods-strip). Editorial register still follows
Impeccable's no-em-dash rule. Locks the exception once.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Bump 4Q body type-step (case-study §4) `[crit §3 "Type hierarchy spot-check"]`

**The fix:** Case-study §4 has Newsreader 24/20 for the 4Q opener body and Newsreader 20/18 for Q2-Q4 body. The 24→20 step is only 1.2× — soft against the rest of the page's ≥1.25× steps. Nudge Q2-Q4 down to Newsreader 18 (24→18 = 1.33×, crisp).

**Files:**
- Modify: `docs/specs/case-study-spec-v1.md` §4 (line ~188)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Edit the §4 type table**

Replace the row at line ~188. Current:

```markdown
| 4Q Q2-Q4 body | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
```

New:

```markdown
| 4Q Q2-Q4 body | Newsreader | 18 / 16 | 300 | -0.1px | `#1A1A1E` |
```

This puts the Q1 → Q2-Q4 step at 24 → 18 = 1.33× desktop / 20 → 16 = 1.25× mobile. Both clear the 1.25× threshold the rest of the page maintains.

- [ ] **Step 2: Add the CHANGELOG entry**

Prepend under `### [`docs/case-study-spec-v1.md`](docs/case-study-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §3 — 4Q body type step):** §4 — 4Q Q2-Q4 body size dropped from Newsreader 20/18 → 18/16 so the Q1 ("What is this?") → Q2-Q4 step lands at 1.33× desktop / 1.25× mobile (was 1.2× / 1.1×). Restores the type-step discipline the rest of the page already follows. Per `impeccable-and-emil-design-critique.md` §3 "Type hierarchy spot-check".
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/case-study-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(case-study-spec): tighten 4Q body type step per critique §3

§4 — Q2-Q4 body 20/18 → 18/16. Q1 → Q2-Q4 step now 1.33× desktop /
1.25× mobile, matching the rest of the page's ≥1.25× discipline.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Reframe "the live layer" → "the daily-dated layer" + Daily Driver promise (CLAUDE.md + PMP + cross-spec) `[crit §3 "The 'live' framing oversells slightly"]`

**The fix:** Multiple specs call the dateline / pulse / shipped-stats "the live layer," but the Daily Driver writes once at 08:45. That's daily-fresh, not live. The honest framing reads stronger than the marketing framing.

**Decision (default, work-without-stopping):** Rename to **"the daily-dated layer"** in CLAUDE.md, PMP, and the surface specs. Keep "live" only where there genuinely is sub-daily state (e.g., the agent-fleet footer that pulls the last-3 events from `agent-run-history.csv` — that one can update on every CI write). If Sean wants to actually wire the dateline to a sub-daily stream instead of renaming, he can override during execution.

**Files:**
- Modify: `CLAUDE.md` ("the three load-bearing things" block)
- Modify: `docs/specs/PORTFOLIO-MASTER-PLAN.md` (every "live layer" mention)
- Modify: `docs/specs/hero-spec-v1.md` (any "live layer" mentions)
- Modify: `docs/specs/about-spec-v1.md` (any §8 "live pulse strip" framing)
- Modify: `docs/specs/case-study-spec-v1.md` (any `<ShippedNow />` framing)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Audit current usage**

Run:

```bash
grep -rn "live layer\|live-layer\|the live\|\"live\"" docs/specs/ CLAUDE.md docs/PORTFOLIO-MASTER-PLAN.md 2>/dev/null
```

Capture every hit. For each hit, decide:
- **Rename to "daily-dated layer"** if the data source is the Daily Driver (08:45 once-daily writes).
- **Keep as "live"** if the data source is genuinely sub-daily (the footer agent feed that watches `agent-run-history.csv` writes).

- [ ] **Step 2: Edit CLAUDE.md "three load-bearing things"**

In `CLAUDE.md`, the block currently reads:

```markdown
3. **The live layer** — real autonomous agent-fleet activity surfaced on the page. The unfakeable differentiator.
```

Replace with:

```markdown
3. **The daily-dated layer** — real autonomous agent-fleet activity surfaced on the page, dated to the morning it was written. Sub-daily for the agent-feed footer; daily-fresh (Daily Driver writes 08:45) for the dateline + pulse strip + shipped-stats. The unfakeable differentiator. The framing reads "real and dated," not "streaming" — the honesty is the load-bearing part.
```

- [ ] **Step 3: Edit PMP §6 hero overview**

PMP §6.1 currently lists "The dateline reads from a real file." Add a sentence after that bullet:

```markdown
- **The framing is daily-dated, not live.** The Daily Driver writes the dateline once at 08:45; that's daily-fresh, which is what the page claims. The footer's agent-fleet feed is the only sub-daily surface — that one is "live" in the streaming sense.
```

(If the bullet structure is different at edit time, place the sentence in the equivalent location.)

- [ ] **Step 4: Sweep the hero-spec, about-spec, case-study-spec, transactions-spec for "live layer" / "live pulse" / "live" framing**

For each hit captured in Step 1:
- If it describes the dateline / pulse strip / shipped-stats: replace "live" with "daily-dated" or "morning-fresh" — whichever reads cleanest in context.
- If it describes the footer agent feed: leave as "live."

**Do not** rename `/api/about-pulse.json`, component names like `<ShippedNow />`, or any code-level identifiers — those are wire-level names that don't need to track the editorial framing.

- [ ] **Step 5: Add CHANGELOG entries**

Prepend under `## Non-spec changes` (CLAUDE.md + PMP changes both live there):

```markdown
- **2026-05-19 (critique fix §3 — "daily-dated" honest framing):** [`CLAUDE.md`](CLAUDE.md) "three load-bearing things" block + [`docs/specs/PORTFOLIO-MASTER-PLAN.md`](docs/specs/PORTFOLIO-MASTER-PLAN.md) + cross-spec sweep. Renamed "the live layer" → "the daily-dated layer" wherever the data source is the Daily Driver (08:45 daily writes). "Live" is reserved for genuinely sub-daily surfaces (footer agent feed reading `agent-run-history.csv`). The honest framing reads stronger than the marketing framing — Sean's voice everywhere else is honest, this had been the one place it wasn't. Per `impeccable-and-emil-design-critique.md` §3 "The 'live' framing oversells slightly".
```

And under each affected per-spec subsection (hero, about, case-study, transactions — wherever Step 1's grep found a "live" hit to edit), a brief mirror entry:

```markdown
- **2026-05-19 (critique fix §3 — daily-dated rename):** Swept "live" → "daily-dated" / "morning-fresh" wherever the data source is the Daily Driver. See the `## Non-spec changes` entry for the cross-spec rationale.
```

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md docs/specs/ CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs: reframe "live layer" → "daily-dated layer" per critique §3

CLAUDE.md + PMP + cross-spec sweep. The Daily Driver writes 08:45 once
daily — that's daily-fresh, not live. Honest framing reads stronger.
"Live" reserved for genuinely sub-daily surfaces (footer agent feed).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Add Phase 0 asset Gantt (texture-and-artifacts §7) `[crit §4 "Mid-build asset authoring"]`

**The fix:** ~10–15 hand-authored assets need to ship: paper texture, torn-paper edge, hero floor-shadow, coffee ring, kid-drawing, 6 cartoon-cel studies, 5 about heading SVGs, signature, OG card. §7 has the pipeline but not the *order* in which assets need to land vs. when each spec's components depend on them. Add a Phase 0 Gantt.

**Files:**
- Modify: `docs/specs/texture-and-artifacts-spec-v1.md` §7 (insert a new §7.0 before the existing §7.1)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Insert a new §7.0 immediately before §7.1**

Add a new subsection right after the §7 heading and intro line (before "### 7.1 Procreate workflow (raster path)"):

```markdown
### 7.0 Asset authoring order (Phase 0 Gantt)

Hand-authored assets ship in three waves, each unblocking a specific build phase. Don't wait for the build to start before authoring — start Phase 0a the same week the spec is locked.

| Wave | Assets | Authoring window | Unblocks |
|---|---|---|---|
| **0a — Substrate** | `paper-tile.png` (§3), `tear-edge.png` ×3 variants (§4), hero floor-shadow `hero-floor-shadow.png` (§5) | Week 1, before hero build starts | Hero build (needs paper substrate + floor shadow), torn-edge transitions site-wide |
| **0b — Hero + projects splash** | `coffee-ring.png` (§6.3), `kid-drawing-1.png` (§6.4), `signature.svg` (§6.6 + about §6), the 3 projects annotations (curved arrow / "rev 3" scribble / registration mark) | Week 1–2, in parallel with hero build | Projects-section build (the splash + annotations land here first), about-page closeout (signature) |
| **0c — About long-form** | 6 cartoon-cel pencil-test studies (§6.5 + about §11) — path C per about §11.4 (Sean hand-draws 2–3, Seedream 2.0 renders 3–4 from anchor style) ; 5 about heading SVGs (§6.6); OG card | Week 3, in parallel with case-study build | About build (cels are §11's load-bearing artifact; without them §11 doesn't render), social-share previews |

**Asset count:** 13 mandatory PNG/SVG files + the 6 cartoon studies. Total ~19 hand-authored assets in 3 weeks.

**Gating rule:** If a Phase 0a asset slips into Week 2, the hero build cannot complete; if Phase 0b slips into Week 3, the projects build cannot complete; if Phase 0c slips, About ships as a stub. Track in the build session's open-questions log.

**OPEN:** Whether the OG card lives in this spec or in site-chrome-spec — currently undecided. Resolve at build session start.
```

- [ ] **Step 2: Add the CHANGELOG entry**

Prepend under `### [`docs/specs/texture-and-artifacts-spec-v1.md`](docs/specs/texture-and-artifacts-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §4 — Phase 0 asset Gantt):** §7.0 — new subsection sequences ~19 hand-authored assets into 3 waves (substrate / hero+projects / about long-form), each unblocking a specific build phase. Eliminates the mid-build "blocked on art" failure mode flagged by `impeccable-and-emil-design-critique.md` §4 "Mid-build asset authoring".
```

- [ ] **Step 3: Commit**

```bash
git add docs/specs/texture-and-artifacts-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(texture-spec): add Phase 0 asset Gantt per critique §4

§7.0 — sequences 19 hand-authored assets into 3 waves (substrate /
hero+projects / about long-form), each gating a specific build phase.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Build-script resilience — fetch_canonical_sources fallback cache + derive_crosslinks error messages (architecture §11.1 + transactions §11.1) `[crit §4 "Build infrastructure fragility"]`

**The fix:** Two build-script behavior specs the critique flags:

1. **`fetch_canonical_sources.mjs`**: GitHub raw URLs can fail (rename, network blip). Spec a committed-fallback-cache rule — `src/content/explanations/<slug>.md` is committed to the repo; the script refreshes but never *requires* a network call.
2. **`derive_crosslinks.mjs`**: Rejecting dangling slugs is correct, but error messages must name the offending file + field so a typo is debuggable.

**Files:**
- Modify: `docs/specs/architecture-spec-v1.md` §11.1 (where `fetch_canonical_sources.mjs` is defined)
- Modify: `docs/specs/transactions-spec-v1.md` §11.1 (where `derive_crosslinks.mjs` is defined)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Edit architecture-spec §11.1 for fetch_canonical_sources fallback**

Find the `scripts/fetch_canonical_sources.mjs` row at line 540 of `docs/specs/architecture-spec-v1.md`. After the existing description, append a new sentence:

```markdown
**Fallback contract:** the script never *requires* a network call. The fetched files (`src/content/explanations/<slug>.md`, `src/content/architecture/essays/<slug>.md`, etc.) are committed to the repo; the script's job is to *refresh* them. On network failure (GitHub 404, ENOTFOUND, ETag mismatch with no body), the script logs a warning, leaves the committed version in place, and exits 0. Builds never fail because a remote source moved. CI on the upstream repo runs a separate verification that no `EXPLANATION.md` was deleted from a fetched source repo.
```

- [ ] **Step 2: Edit transactions-spec §11.1 for derive_crosslinks error messages**

Find the `scripts/derive_crosslinks.mjs` definition in transactions-spec §11.1. Append:

```markdown
**Error message contract:** when the script rejects a dangling slug, the error names (a) the offending file path, (b) the offending field name, (c) the offending slug value, (d) the closest matching real slug if Levenshtein distance ≤ 2. Example: `[derive_crosslinks] src/content/work/animation-pipeline.mdx — relatedArchitecture: "vault-scorcard" — no such architecture slug. Did you mean "vault-scorecard"?` This matters because at v1 most cross-link fields are aspirational (`relatedArchitecture`, `relatedEssay`, `relatedTransactions`); one typo will break the build, and the error needs to point at the typo, not at a generic "dangling slug" message.
```

- [ ] **Step 3: Add CHANGELOG entries**

Under `### [`docs/specs/architecture-spec-v1.md`](docs/specs/architecture-spec-v1.md)` (create alphabetically if not present):

```markdown
- **2026-05-19 (critique fix §4 — fetch_canonical_sources fallback):** §11.1 — declared the never-requires-network contract: committed fetched files are the source of truth; the script refreshes but exits 0 on remote failure. Eliminates the build-failure-on-rename surface flagged by `impeccable-and-emil-design-critique.md` §4 "Build infrastructure fragility".
```

Under `### [`docs/specs/transactions-spec-v1.md`](docs/specs/transactions-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §4 — derive_crosslinks error messages):** §11.1 — declared the error-message contract: dangling-slug errors must name file + field + slug + nearest-real-slug suggestion. Eliminates the "one typo breaks the build with a generic error" surface flagged by `impeccable-and-emil-design-critique.md` §4.
```

- [ ] **Step 4: Commit**

```bash
git add docs/specs/architecture-spec-v1.md docs/specs/transactions-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(specs): build-script resilience contracts per critique §4

architecture §11.1: fetch_canonical_sources never requires network;
committed cache is source of truth. transactions §11.1: derive_crosslinks
errors must name file+field+slug+nearest-real-slug suggestion.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Document the sticky-nav vs no-nav-home discipline split (site-chrome §6.1) `[crit §4 "Sticky nav vs no-nav home discipline split"]`

**The fix:** The site has two different navigation grammars (no-nav home, sticky-nav sub-pages). The split is defensible — recruiters reading a 2k-word essay want escape; the home is mynrd-coded linear scroll. But the spec doesn't yet document the *first-impression risk*: the first sub-page visit can feel like "wait, where did the no-nav site go?" Add a defensible note + a build-time mockup check.

**Files:**
- Modify: `docs/specs/site-chrome-spec-v1.md` §6.1 (around the `noChrome` BaseLayout prop)
- Modify: `CHANGELOG.md`

- [ ] **Step 1: Read site-chrome §6.1 to confirm location**

Run `grep -n "noChrome\|sticky\|position: sticky" docs/specs/site-chrome-spec-v1.md` to find the §6.1 sub-section. Read the surrounding 30 lines.

- [ ] **Step 2: Append a §6.1.1 subsection (or inline note if the structure is shallow)**

Add immediately after the §6.1 sticky/no-nav declaration:

```markdown
### 6.1.1 First-sub-page impression — locked

The site uses **two navigation grammars**: no-nav on home (mynrd-coded linear scroll, one beat at a time), sticky-nav on every sub-page (recruiters reading a 2k-word essay need escape). This is a deliberate split — but the first sub-page visit risks reading as "wait, where did the no-nav site go?"

Three rules mitigate:

1. **The sticky nav uses the same chrome substrate as the home footer** (cream-on-teal, JetBrains Mono, no animated reveal). The visitor sees the chrome teal — the substrate they've already been looking through since the home page — and registers continuity, not change.
2. **The first sub-page nav reveal is delayed 600ms after View Transition completes.** The recruiter lands; the page renders; *then* the nav fades in from translateY(-8px). Reads as "the page added a nav for me," not "a different site loaded."
3. **Mockup verification before build complete:** a build-time QA step renders the home → first-sub-page transition in Playwright and visually inspects that the chrome continuity reads correctly. Logged as DoD item in the site-chrome spec §[whatever number §6.1.1's DoD section is].
```

- [ ] **Step 3: Add the CHANGELOG entry**

Prepend under `### [`docs/specs/site-chrome-spec-v1.md`](docs/specs/site-chrome-spec-v1.md)`:

```markdown
- **2026-05-19 (critique fix §4 — sticky-nav first-impression):** §6.1.1 — documented the two-navigation-grammars split (no-nav home, sticky sub-pages) and added three mitigation rules: (a) sticky nav uses the same chrome substrate, (b) first sub-page nav fades in 600ms after View Transition completes, (c) Playwright mockup verification gate. Per `impeccable-and-emil-design-critique.md` §4 "Sticky nav vs no-nav home discipline split".
```

- [ ] **Step 4: Commit**

```bash
git add docs/specs/site-chrome-spec-v1.md CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(site-chrome): document sticky-nav first-impression per critique §4

§6.1.1 — two-grammar split is deliberate; three mitigations: shared
chrome substrate, 600ms delayed nav reveal, Playwright continuity gate.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Final pass — verify the punch list is closed + summary commit

**The fix:** Sweep the critique punch list one final time, confirm every item shows a CHANGELOG entry, and (optionally) add a top-level note to `CHANGELOG.md` under `## Non-spec changes` documenting that the critique was fully implemented.

**Files:**
- Read: `docs/impeccable-and-emil-design-critique.md` punch list (lines 193–203)
- Read: `CHANGELOG.md` to verify entries
- Modify: `CHANGELOG.md` (final non-spec-changes entry)

- [ ] **Step 1: Verify each punch-list item has a corresponding CHANGELOG entry**

For each of the 7 punch-list items from critique §"Tightest punch list before build":

| # | Item | Expected CHANGELOG entry | Task |
|---|---|---|---|
| 1 | Decide blocker 1.1 SVG lane rule | about-spec "critique fix 1.1" | Task 1 |
| 2 | Projects-tile hover ≤300ms | projects-spec "critique fix 1.2" | Task 2 |
| 3 | PMP §2.2/§5 Committed-teal | PMP "critique fix 1.3" | Task 3 |
| 4 | MCP embed URL contradiction | **Already done — 2026-05-19 audit fix C-2.1** | — |
| 5 | Cursor-hover duration in hero §9 | hero-spec "critique fix punch #5" | Task 4 |
| 6 | SVG-stroke OR static border for B-1 lane rule | Same as #1 (Task 1 resolves both §6 + §9.2) | Task 1 |
| 7 | relatedArchitecture additive on transactions §3.2 | **Already done — 2026-05-19 audit fix I-1.1** | — |

Confirm every row above has a matching CHANGELOG entry (or the "already done" note checks out against the existing CHANGELOG body). Run:

```bash
grep -n "critique fix" CHANGELOG.md
```

The output should show entries for blockers 1.1, 1.2, 1.3, punch #5, and the §2/§3/§4 fixes. If any are missing, return to that task.

- [ ] **Step 2: Add a closing entry under `## Non-spec changes`**

Prepend (newest-first) under `## Non-spec changes` in `CHANGELOG.md`:

```markdown
- **2026-05-19 (critique implementation complete):** All 7 punch-list items + §2 motion review + §3 Impeccable findings + §4 cross-spec items from [`docs/impeccable-and-emil-design-critique.md`](docs/impeccable-and-emil-design-critique.md) are landed. Specs are ready for build per the critique's verdict: "Ready to build after three specific blockers are addressed." The three blockers were resolved in Tasks 1–3 of the implementation plan (`docs/superpowers/plans/2026-05-19-impeccable-emil-critique-implementation.md`).
```

- [ ] **Step 3: Final commit**

```bash
git add CHANGELOG.md
git commit -m "$(cat <<'EOF'
docs(changelog): close out impeccable+emil critique implementation

All 7 punch-list items + §2 motion + §3 + §4 findings landed. Specs
ready for build per the critique's "ready after three blockers" verdict.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Self-review notes

After completing all 15 tasks, sanity-check:

- **Spec coverage**: Every numbered finding in `docs/impeccable-and-emil-design-critique.md` (§1.1, §1.2, §1.3, §2 rows 1–8, §3 em-dash + cards + live + type-step, §4 four items, punch-list #1–7) maps to a task above. Task 1 covers blocker 1.1 AND punch-list #6 (they're the same finding). Punch-list #4 + #7 were already done (verified in CHANGELOG.md, not re-implemented).
- **Type consistency**: All references to "Committed-teal" use the same hyphenation. All `view-transition-name` strings use the literal `hero-media-<slug>` template. All durations are ms-suffixed integers.
- **No placeholders**: Every step contains the actual edit text the engineer needs.
- **CHANGELOG voice**: Each entry leads with "(critique fix …)" + section refs + a one-sentence rationale. Matches the established 2026-05-19 audit-fix entries.

If anything in this plan turns out to be wrong at execution time (e.g., a section number drifted between read and edit, or a spec author already landed a related change), update the plan inline and continue — don't re-plan from scratch.
