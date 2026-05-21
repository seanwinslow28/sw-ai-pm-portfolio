# Phase 0 Closeout — Cartoon Canon + OG Cards + Favicons

> **Status:** SHIPPED 2026-05-21. This is a retrospective design spec — every artifact named here is committed at the path given.
> **Owner:** Sean Winslow.
> **Origin:** Continuation of the 2026-05-21 Phase 0 asset-authoring session. Closes the last three rows of [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §5 punch list (items 7, 11, 12, 13).
> **Next step:** Phase 2 build session — Astro 5 scaffold. All blockers cleared.

---

## 1. TL;DR

Three asset groups + one spec sweep, executed sequentially:

1. **Saturday morning canon** (about-spec §11) — 6 pencil-test cels finalized after a Bugs Bunny → Uncle Iroh swap; generation post-mortem and 8 reusable lessons banked in [`reference-images/about-cartoons/GENERATION-PROMPTS.md`](../../../reference-images/about-cartoons/GENERATION-PROMPTS.md); MDX frontmatter draft authored ahead of Phase 2 scaffold.
2. **OG cards** (site-chrome §12 + arch §17 + essays §18) — 4 cards (1200×630, ≤55KB each) generated deterministically via Python + Pillow + the locked typefaces. Default card + 3 per-page overrides.
3. **Favicon set** (site-chrome Appendix A + §16 OPEN-1) — SVG source + multi-resolution ICO + apple-touch-icon. Wordmark question CONFIRMED at the recommended default.
4. **Spec sweep** — about-spec §11.2 / §11.4 / §18 + site-chrome §16 + CHANGELOG + CLAUDE.md status table + BLUEPRINT punch list. All edits committed inline.

Net effect: the spec graph is airtight, every Phase 0 asset row reads LOCKED, and the Phase 2 Astro scaffold can open with no outstanding ambiguity.

---

## 2. Context — why this session

Phase 0 was carrying three open rows when the session opened:

| Row | Status going in | Status going out |
|---|---|---|
| 6 Saturday-morning cartoon cels | Pending — 5 cels generated, Bugs Bunny in slot 5 felt wrong | LOCKED — Iroh replacement, all 6 validated |
| OG cards (default + 3 per-page) | Pending | LOCKED — 4 cards at `reference-images/og-cards/` |
| Favicon set (SVG + ICO + apple-touch-icon) | Pending — wordmark question (OPEN-1) still open | LOCKED — SVG hand-authored, rasters generated via Pillow; OPEN-1 CONFIRMED |

The session was self-paced ("work without stopping for clarifying questions") with explicit instructions to make reasonable calls and continue. The brainstorming skill was invoked at the start to honor the multi-perspective (PM / Designer / Engineer) headspace this project was planned in — applied as compressed brainstorms per part rather than full dialog cycles, since the design contracts were already locked in the surface specs.

---

## 3. Design decisions — by part

### 3.1 Saturday morning canon (Part A tail-end)

**The locked 6** (about-spec §11.2):

| # | Cartoon | Studio | Lesson noun | break_grid |
|---|---|---|---|---|
| 01 | Tommy Pickles (Rugrats) | Klasky Csupo / Nickelodeon | THE SCREWDRIVER | false |
| 02 | Ash Ketchum (Pokémon, Indigo League) | OLM / TV Tokyo | THE LONG GAMBIT | false |
| 03 | Rocko (Rocko's Modern Life) | Joe Murray Productions / Nickelodeon | THE OUTSIDER | false |
| 04 | Samurai Jack | Cartoon Network (Tartakovsky) | THE CODE | **true** ⭐ |
| 05 | Uncle Iroh (Avatar: TLA) | Nickelodeon Animation Studio | WISDOM IN RESTRAINT | false |
| 06 | Jake the Dog (Adventure Time) | Cartoon Network (Pendleton Ward) | SQUASH AND STRETCH | false |

**Why Iroh replaced Bugs:** Bugs read as a composure-under-chaos gag-cartoon lesson; Iroh carries the deeper PM truth — *the most experienced person in the room choosing not to use their authority*. The lesson Sean actually wanted in the canon. Bugs prompt + post-mortem are preserved in [`reference-images/about-cartoons/removed/`](../../../reference-images/about-cartoons/removed/) as a historical record.

**Why Jack is the break_grid cel:** Per about-spec §11.3.1, one cel renders at 1.2× scale spanning two grid columns on desktop. Jack's lesson ("the spec is the code; everything around it is noise") is the section's structural anchor — the cel the v2 annotation will eventually arrow at, but in v1 the geometry break carries the emphasis alone (per about-spec §1.2 decorative deferrals).

**The MDX content collection draft** lives at [`reference-images/about-cartoons/cartoons-content-collection-draft.md`](../../../reference-images/about-cartoons/cartoons-content-collection-draft.md) — 6 frontmatter blocks ready to copy into `src/content/cartoons/0N-<slug>.md` at scaffold time. Hand-picked `angle:` values give visual variety while keeping `04-samurai-jack` (the break-grid cel) at `0.0` so the surrounding cels' tilt is felt against the anchor.

### 3.2 OG cards (Part B)

**Approach choice — three candidates, one verdict:**

| Candidate | Trade-off | Verdict |
|---|---|---|
| **Python + Pillow + TTF fonts** | Deterministic, exact type, version-controlled, scriptable for v2 regens | ✅ **Locked** |
| Gemini Nano Banana 2 | Same tool as the cartoon cels, but text rendering at OG-card scale is unreliable, type alignment can't be guaranteed | ❌ Wrong tool — wire-service register is type-driven |
| Hand-authored in Figma | Full creative control, costs Sean's time | ❌ v2 fallback if v1 cards read off |

**Why Python + Pillow:** The wire-service register is type-driven — Newsreader + JetBrains Mono at exact sizes, tight alignment, deterministic kerning. Pillow with the actual TTF files renders pixel-identical across runs. Gemini can render beautiful images but can't be trusted to render `JetBrains Mono 14px tracking 1.5px` correctly at 1200×630 scale. The generator script ([`scripts/phase-0/generate_og_cards.py`](../../../scripts/phase-0/generate_og_cards.py)) doubles as the v2 enhancement seed when Sean wants to add new per-page cards (architecture writeups, additional case studies, future essays) — the layout function is parameterized.

**Layout contract** (consistent across all 4):

```
┌────────────────────────────────────────────────────────┐
│  BOSTON · <PAGE LABEL> · <YEAR/SLUG>           [STAMP] │  ← dateline strip, mono 16px stamp-amber
│  ────────────────────────────────────────────────────  │  ← 1px teal rule
│ │                                                       │
│ │  <Title>                                              │  ← Newsreader 64-88px weight 400, ink
│ │  <italic hook line>                                   │  ← Newsreader italic 32-44px weight 300
│ │                                                       │
│ │                                                       │
│ │                                                       │
│ SW  seanwinslow.com                  /slug/route/       │  ← wordmark teal + URL mono secondary + slug mono right
└────────────────────────────────────────────────────────┘
   ↑ 4px splash bar (teal default, amber for SHIPPED projects)
```

**Per-card content:**

| Card | Output | Splash | Title | Hook |
|---|---|---|---|---|
| Default | [`og-default.png`](../../../reference-images/og-cards/og-default.png) | Teal | *Sean Winslow* | *AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs.* |
| Architecture deep-dive (Vault Scorecard) | [`vault-scorecard.png`](../../../reference-images/og-cards/vault-scorecard.png) | Teal | *Vault as Agent Infrastructure* | *Most people see Obsidian as content. I treat my vault as agent infrastructure.* |
| Case-study deep-dive (Intent Engineering MCP) | [`vault-knowledge-mcp.png`](../../../reference-images/og-cards/vault-knowledge-mcp.png) | Amber `#FAC775` (projects splash) | *Intent Engineering MCP* | *Drawing up agents to act with intent.* (plus `SHIPPED 2026-05-12` stamp) |
| Essay deep-dive (Manifesto) | [`essays/meaning-over-access.png`](../../../reference-images/og-cards/essays/meaning-over-access.png) | Teal | *Access vs Meaning* | *I bet on meaning, not access.* |

**Hook lines are not arbitrary:** Each pulls from a locked spec primary, not a session-improvised string. Default hook = PMP §4 row 7 (the locked meta description). Vault Scorecard hook = arch-spec §16 OPEN-2 (resolved default, the page-level identity claim). MCP hook = PMP §4 row 4 ("Drawing up agents to act with intent" — the case-study + tile shared tagline). Essay hook = essays §17 OPEN-1 (resolved default, the manifesto's own identity claim).

### 3.3 Favicon set (Part C)

**OPEN-1 wordmark question (site-chrome §16):** Recommended default was "SW" in JetBrains Mono uppercase. **Confirmed at the recommended default.** The Newsreader alternative would compete with every page's Newsreader `<h1>` and lose the wire-service register that ties the chrome together. The mono wordmark renders cleanly at 14px (browser tab) without crowding, and it's the same wordmark used on every OG card foot and on the nav — one identity, consistent everywhere.

**Color:** Teal `#0A3E42` on warm paper `#FFF9F0`. Same teal as the chrome nav + OG cards. The paper background carries the warm-substrate identity across favicon → nav → social share without competing.

**Implementation:** Hand-author the SVG ([`reference-images/favicon/favicon.svg`](../../../reference-images/favicon/favicon.svg)), then rasterize via Pillow at the three target sizes (16/32/48 multi-res ICO + 180×180 apple-touch-icon). SVG is the source of truth; rasters are pixel-tuned at small sizes by re-drawing the wordmark directly (rather than scaling the SVG) so the 16×16 tab favicon doesn't blur. Script preserved at [`scripts/phase-0/generate_favicons.py`](../../../scripts/phase-0/generate_favicons.py).

**File sizes** (all well under common platform limits):
- `favicon.svg` — 543B
- `favicon.ico` — 372B (16+32+48 multi-resolution)
- `apple-touch-icon.png` — 4.5KB (180×180)

---

## 4. Lessons banked from this session

These belong forward — apply on the next asset session if/when one materializes.

1. **Minimal prompts beat verbose prompts** when a strong character reference image is in play. Gemini Nano Banana 2 over-corrects on named features ("single orange curl", "zigzag mouth", "freckle dots") and breaks identity. Trust the reference image to carry features that show up on it; only name the pose + temperament in the prompt. (Bedrock for any future cartoon canon / pencil-test additions.)

2. **Use absolute paths in `python3 .../generate_image.py` invocations.** The Bash tool's working-directory persistence trapped one Tommy generation. Don't trust the cwd; pass full paths.

3. **AI Studio is the escape hatch.** When the scripted CLI fights — same model, same prompt, same refs — drop into Google AI Studio with `gemini-3.1-flash-image-preview`. Same engine, faster iteration loop. Sean landed canonical Jake there after multiple scripted misses.

4. **Validate-the-hardest-thing-first.** Generate the highest-stakes asset first (the `break_grid` cel; or in OG cards, the most-shared card). If it lands, the pipeline is validated and the rest batch in parallel with confidence.

5. **Back up before regen.** Copy working PNG to `<file>-v1-backup.png` before re-running a generation that overwrites. Three backups in the cartoon folder were saved this way.

6. **Cream paper (#FAF5E8) reads beautifully** in pencil-test treatments and integrates with the site's `#FFF9F0` chrome substrate without competing. Default to cream for any future pencil-test asset; pure white feels clinical against the warm chrome.

7. **Safety filters trip on `baby` / `toddler` / `diaper`** + child reference images even in cartoon context. Mitigation: don't name those terms in the prompt; describe via head shape + costume + reference image instead. (Tommy's final prompt does exactly this.)

8. **The right tool depends on the register.** Cartoon cels and stylized images → Gemini Nano Banana 2 (it's the right tool for character art with mood). Typographic SOCIAL previews and pixel-perfect chrome → Python + Pillow + TTF (deterministic type beats generative inconsistency). Don't reach for the same tool for both — the wrong choice is a thrash multiplier.

---

## 5. Two flagged choices for the next session

Neither blocks Phase 2. Both are one-line edits if Sean decides to flip them at any point before launch.

1. **OG card URL line** is left bare-domain (`seanwinslow.com`) with the page slug in a separate mono lower-right corner (e.g. `/work/vault-knowledge-mcp/`). If Sean prefers `seanwinslow.com/work/vault-knowledge-mcp/` rendered as a single full URL, that's a 2-line change in [`scripts/phase-0/generate_og_cards.py`](../../../scripts/phase-0/generate_og_cards.py) (`url_line` parameter per card).

2. **og-default.png title** is "Sean Winslow" (the only card with a name as title; the other three carry the page's title). If Sean prefers the home-hero tagline (`"Product Manager. The agents handle the loops. I handle the taste."`) as the title slot instead — making the default card feel more like the home page — that's a one-line swap in the `card_default()` function. The argument against: the home-hero tagline is on-page headline copy (PMP §4 row 1, locked); the meta description (PMP §4 row 7, locked) is the social-preview register. Keeping them separate preserves the locked split.

---

## 6. Definition of Done (Step-10 from the session prompt)

All 16 items met as of 2026-05-21:

- ✅ [`reference-images/about-cartoons/GENERATION-PROMPTS.md`](../../../reference-images/about-cartoons/GENERATION-PROMPTS.md) reflects the Bugs → Iroh swap with the post-mortem lessons banked at the top
- ✅ [`reference-images/about-cartoons/cartoons-content-collection-draft.md`](../../../reference-images/about-cartoons/cartoons-content-collection-draft.md) exists with 6 MDX frontmatter blocks matching about-spec §11.6 schema
- ✅ [`reference-images/og-cards/og-default.png`](../../../reference-images/og-cards/og-default.png) exists (1200×630, 52KB)
- ✅ [`reference-images/og-cards/vault-scorecard.png`](../../../reference-images/og-cards/vault-scorecard.png) exists (1200×630, 46KB)
- ✅ [`reference-images/og-cards/vault-knowledge-mcp.png`](../../../reference-images/og-cards/vault-knowledge-mcp.png) exists (1200×630, 46KB)
- ✅ [`reference-images/og-cards/essays/meaning-over-access.png`](../../../reference-images/og-cards/essays/meaning-over-access.png) exists (1200×630, 44KB)
- ✅ [`reference-images/favicon/favicon.svg`](../../../reference-images/favicon/favicon.svg) exists
- ✅ [`reference-images/favicon/favicon.ico`](../../../reference-images/favicon/favicon.ico) exists (multi-res 16/32/48)
- ✅ [`reference-images/favicon/apple-touch-icon.png`](../../../reference-images/favicon/apple-touch-icon.png) exists (180×180)
- ✅ about-spec §11.2 has the locked 6-cartoon table with Jack marked `break_grid: true`
- ✅ about-spec §11.4 has "Seedream 2.0" replaced with the correct Gemini Nano Banana 2 reference + Approach B
- ✅ about-spec §18 OPEN-3 + OPEN-4 marked RESOLVED 2026-05-21 with strikethrough
- ✅ site-chrome-spec §16 OPEN-1 marked CONFIRMED 2026-05-21 (SW in JetBrains Mono uppercase locked)
- ✅ CHANGELOG.md has the cartoon-canon-lock entry under about-spec + the OG/favicon entry under site-chrome
- ✅ CLAUDE.md status table has the Phase 0 rows (cartoon cels, OG cards, favicons) moved from "Pending" to "LOCKED" with paths; Phase 0 marked COMPLETE
- ✅ BLUEPRINT-COMPLETE.md §5 punch list items 7, 11, 12, 13 marked DONE 2026-05-21

---

## 7. Artifact map (everything created or modified in this session)

```
sw-ai-pm-portfolio/
├── CLAUDE.md                                                          ← status table updated; date bumped to 2026-05-21
├── CHANGELOG.md                                                       ← about-spec + site-chrome 2026-05-21 entries appended
├── docs/specs/
│   ├── about-spec-v1.md                                               ← §11.2 canon locked; §11.4 Seedream→Gemini correction; §18 OPEN-3/4 RESOLVED
│   ├── site-chrome-spec-v1.md                                         ← §16 OPEN-1 CONFIRMED (SW JetBrains Mono 700 teal)
│   └── BLUEPRINT-COMPLETE.md                                          ← §5 punch list items 7, 11, 12, 13 marked DONE
├── docs/superpowers/specs/
│   └── 2026-05-21-phase-0-closeout-design.md                          ← (this file)
├── reference-images/
│   ├── about-cartoons/
│   │   ├── 01-tommy-pickles.png                                       ← canonical canon, slot 1
│   │   ├── 02-ash-ketchum.png                                         ← canonical canon, slot 2
│   │   ├── 03-rocko.png                                               ← canonical canon, slot 3
│   │   ├── 04-samurai-jack.png                                        ← canonical canon, slot 4 (break_grid: true)
│   │   ├── 05-uncle-iroh.png                                          ← canonical canon, slot 5 (replaces Bugs Bunny)
│   │   ├── 06-jake.png                                                ← canonical canon, slot 6
│   │   ├── *-v1-backup.png                                            ← 3 backups preserved as history (Tommy, Rocko, Jake)
│   │   ├── removed/                                                   ← Bugs Bunny + earlier Tommy/Jake variants, history only
│   │   ├── GENERATION-PROMPTS.md                                      ← rewritten; lessons banked at top; locked canon table
│   │   └── cartoons-content-collection-draft.md                       ← NEW; 6 MDX frontmatter blocks
│   ├── og-cards/
│   │   ├── og-default.png                                             ← 1200×630, 52KB
│   │   ├── vault-scorecard.png                                        ← 1200×630, 46KB
│   │   ├── vault-knowledge-mcp.png                                    ← 1200×630, 46KB (SHIPPED 2026-05-12 stamp)
│   │   └── essays/
│   │       └── meaning-over-access.png                                ← 1200×630, 44KB
│   └── favicon/
│       ├── favicon.svg                                                ← hand-authored, 543B (source of truth)
│       ├── favicon.ico                                                ← multi-res 16/32/48, 372B
│       ├── apple-touch-icon.png                                       ← 180×180, 4.5KB
│       └── favicon-16/32/48.png                                       ← inspection previews (not shipped)
└── scripts/phase-0/                                                   ← NEW; deterministic regen scripts
    ├── generate_og_cards.py                                           ← Python + Pillow, parameterized per card
    └── generate_favicons.py                                           ← Python + Pillow, multi-size raster from same SW wordmark
```

**At Phase 2 scaffold:** `reference-images/og-cards/` → `/public/og-cards/`; `reference-images/favicon/{favicon.svg, favicon.ico, apple-touch-icon.png}` → `/public/`; `reference-images/about-cartoons/0N-*.png` → `src/assets/cartoons/`. The MDX frontmatter draft moves to `src/content/cartoons/0N-<slug>.md` per about-spec §11.6.

---

## 8. What this session deliberately did NOT do

- ❌ **Did not invoke `writing-plans`.** The brainstorming skill's terminal state is normally writing an implementation plan, but every artifact in this spec is already shipped — there is no implementation to plan. The next session (Phase 2 Astro 5 scaffold) gets its own brainstorm + plan from cold.
- ❌ **Did not draw character art** for the OG cards. The chosen layout is type-driven; embedding character compositing into the type-driven generator would have been a different tool (Gemini for the character, Pillow for the layer compositing). The wire-service register stands on its own; v2 can introduce a character variant.
- ❌ **Did not author the hand-drawn heading SVGs** (about §4) or the kid-drawing margin artifact or the registration marks — all of those are in about-spec §1.2's v1-decorative-deferrals table, not in Phase 0.
- ❌ **Did not regenerate the 6 cartoon cels.** They were already validated when the session opened; only the slot-5 swap (Bugs → Iroh) and the doc cleanup happened here.

---

*Drafted 2026-05-21 as Phase 0 closeout. Phase 2 build session opens next with no outstanding spec ambiguity.*
