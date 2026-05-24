---
title: Project Tile Media — Design Spec
phase: 3F · Pass B · B3
status: DRAFT (pending Sean review)
created: 2026-05-24
author: Sean Winslow (direction), Claude Opus 4.7 (drafting)
parent: docs/bugs-changes/phase-3f-ship-ready-plan.md §B3
target_files:
  - public/assets/projects/animation-pipeline.webp
  - public/assets/projects/code-brain.webp
  - public/assets/projects/intent-engineering-mcp.png
  - public/assets/projects/the-block.webp
  - public/assets/projects/16bitfit.webp
---

# Project Tile Media — Design Spec

## 1. Why this spec exists

The 2026-05-23 `/impeccable critique` flagged that 4 of 5 project tiles on the home page render as flat color blocks because the on-disk `.webp` assets are 1.5KB stubs. The fifth tile (A-3 Intent Engineering MCP) has the wrong asset entirely — a 1200×630 OG card with a mismatched URL footer (`/work/vault-knowledge-mcp/` for a tile titled "Intent Engineering MCP").

All five tiles need authored media. Without it, the projects splash drifts toward the design-system-viewer trap — *"color tiles arranged for variety"* — which is the failure mode V3 and V4 kept reverting to.

## 2. Design strategy

**Option 3 from the brainstorm: per-tile medium, anchored to project content.** Each tile carries a different visual register chosen because the project's content *demands* that register. The character throughline (per DESIGN.md §"Character-on-Every-Key-Surface") is preserved on every tile, varied in placement and form to avoid monoculture.

**Locked fallback:** if any single tile fails to render cleanly after two generation attempts, that tile pivots to Option 2 (pencil-test register matching the hero) without forcing the others to follow.

## 3. Shared compositional constraints

These apply to every tile and must be encoded into every generation prompt.

- **Output dimensions:** 800×1000 pixels (4:5 portrait). Final export `.webp`, quality 80, target ≤180 KB per tile.
- **Safe zone for metadata strip:** the bottom 250px (25%) of each image is the metadata-strip zone. It will be overlaid with `rgba(0,0,0,0.15)` and four lines of text (frame number, status pill, title, tagline). The bottom 250px must be **visually quiet** — no busy detail, no high-contrast content that would fight the overlay.
- **Character placement variance:** each tile uses a different character position (see per-tile section). Never two tiles with character in the same spot.
- **Palette discipline:** ink `#1A1A1E`, teal `#0A3E42`, paper cream `#FFF9F0`, stamp amber `#7C2D12` as the only earned warm. Amber mid-stop `#FAC775` permitted only on dark-substrate tiles (A-3 terminal, A-5). Each tile reads as if it sits on the cream paper substrate of the page, with the metadata strip painting over the bottom.
- **No baked-in titles or labels.** The tile's title and tagline render via HTML on the metadata strip. Never burn the project name, tagline, or URL into the image. (This is the A-3 OG-card mistake the current asset makes.)
- **Sharp corners.** 0px radius. No vignettes, no rounded-corner masks.
- **No shadows on the substrate.** Tile flat-renders onto the teal-chrome splash background; the metadata strip is the only depth signal.

## 4. Per-tile direction

### A-1 · Animation Pipeline (ACTIVE)

**Concept.** Vertical pencil-test walk-cycle frame strip of the Claude mascot — solo, no Sean character. Theme: *the pipeline's deliverable is the mascot's animation.* Sean's character lives on every other key surface on the site; A-1 is the tile where the Claude mascot earns its own frame.

**Composition.**
- Background: warm cream paper texture (`#FFF9F0` with subtle fiber), matches the page substrate.
- Top 75% (800×750 zone): a vertical strip of **4 stacked pencil-test frames** of a walk cycle, **Claude mascot only**. Rough-line pencil-test register, anchored to the `3/4 FRONT` pose from `sw-portfolio-animation-2026/anchor-images/ai-companion-turnaround-anchor.png` (the rounded peach-colored AI companion). Each frame separated by a hand-ruled hairline divider.
- The 4 frames render the classic walk-cycle key poses: **contact · recoil · passing · high-point**. Each frame shows the mascot mid-stride, one beat further into the cycle than the last. Reads as a literal animator's frame strip pulled from a dope sheet.
- Each frame annotated in JetBrains Mono at the top-left with the frame number (`01`, `02`, `03`, `04`), stamp amber `#7C2D12`. Each frame's bottom-right carries a small mono pose label: `contact`, `recoil`, `passing`, `high-point`.
- Bottom 250px (the metadata-strip safe zone): the last frame fades into clean paper at the bottom — quiet zone for the overlay.

**Character placement:** Claude mascot only, centered horizontally inside each of the 4 frames. (A-1 is the only tile in the set that doesn't carry Sean's character — intentional rest beat in the character rhythm.)

**Skill to use:** [`.claude/skills/gemini-pencil-animation-image-gen`](.claude/skills/gemini-pencil-animation-image-gen) with the Claude mascot turnaround anchor as the sole character reference.

**Risks.**
- Pencil-test register may overlap visually with the hero WebM (which also features the Claude mascot). Differentiator: the multi-frame strip vs. single-character loop, and the explicit walk-cycle pose labels read as *deliverable from the pipeline*, not *hero moment*.
- The Claude mascot reference image is a turnaround sheet (5 poses); the prompt must isolate the `3/4 FRONT` pose and rotate/animate it across the 4 walk-cycle beats — not just copy the same pose 4 times.

---

### A-2 · Code Brain (ACTIVE)

**Concept.** Pencil-and-ink editorial illustration of a stylized concept graph. Sean's pencil-test character stands *inside* the graph holding a thread that runs through three connected nodes. Theme: *the second brain as the literal artifact of the thinking.*

**Composition.**
- Background: warm cream paper texture with subtle ink-line marginalia at the edges (small handwritten notes, arrows, struck-out words).
- Top 75% (800×750 zone): a stylized hand-drawn knowledge graph — **5–7 nodes** as rough-ink circles, each labeled with a real concept name in JetBrains Mono (use today's vault_critic concepts: `token-waste`, `comprehension-audit`, `daily-note-generation`, plus 2–3 supporting concepts pulled from `code-brain/vault/knowledge/concepts/`).
- **Edges between nodes**: rough-ink curves, each labeled in tiny JetBrains Mono with `supports`, `contradicts`, `extends`, or `restates` — the actual Phase D typed-edge vocabulary.
- **Sean's pencil-test character** stands at the center of the graph, holding a single thread (one of the edge curves rendered slightly heavier) that visibly passes through three of the nodes. The character is mid-figure, looking up at the graph he's holding together.
- Bottom 250px (safe zone): graph fades into clean paper.

**Character placement:** **center-frame**, slightly lower-third — different from A-1 (off-center) and A-3 (corner).

**Skill to use:** [`.claude/skills/gemini-pencil-animation-image-gen`](.claude/skills/gemini-pencil-animation-image-gen) (pencil-test character) + composite or one-shot generation with all 7+ nodes encoded in the prompt.

**Risks.**
- Knowledge-graph aesthetic risks reading as decorative if the node labels aren't legible. Mitigation: use real concept names from the vault; if generation can't render small mono text legibly, generate base illustration without labels then overlay labels in post via a text layer.
- The thread metaphor must read as one continuous line, not a tangle. Specify "one thread, visibly passing through exactly 3 nodes."

---

### A-3 · Intent Engineering MCP (SHIPPED)

**Concept.** Clean terminal screenshot composite showing `npm install @swins/intent-engineering-mcp` resolving + the registry-verification success line + a small MCP tool-call indicator. Light pencil-test marginalia in the corner with Sean's character. Theme: *ship-evidence, not metaphor.*

**Composition.**
- Background: warm cream paper texture.
- Top 75% (800×750 zone): a single **terminal pane** rendered as a clean editorial mock (not a literal macOS Terminal.app chrome — instead a paper-on-paper editorial rendering: thin teal `#0A3E42` rule above and below the pane, JetBrains Mono 14px content, ink `#1A1A1E` text on cream `#FFF9F0` ground inside the pane).
- Pane content (real, dated):
  ```
  $ npm install @swins/intent-engineering-mcp
  added 1 package in 1.2s
  ✓ DNS-verified registry · 2026-05-12
  ✓ Claude Desktop MCP server registered
  ```
- Below the pane, a small **MCP-tool-call indicator** as a compact 2-line block: `tools/list ↩ 2 tools` / `intent.draw_up ✓`. Mono, stamp amber for the success checkmarks.
- **Sean's pencil-test character** as small **corner marginalia** in the top-right: a tiny figure with a pencil drawing a check mark next to the SHIPPED moment.
- Bottom 250px (safe zone): clean cream below the MCP indicator block, no content.

**Character placement:** **top-right corner**, small marginalia — different from A-1 (center frames) and A-2 (center figure).

**Skill to use:** [`.claude/skills/openai-image-gen`](.claude/skills/openai-image-gen) (better mono-text fidelity than Gemini for terminal content) for the terminal pane; [`.claude/skills/gemini-pencil-animation-image-gen`](.claude/skills/gemini-pencil-animation-image-gen) for the corner marginalia character; composite in post if one-shot generation can't deliver both.

**Risks.**
- Mono text rendering is the failure mode for most image generators. Mitigation: if generated terminal content is illegible, generate the background + character only, then render the terminal pane as **actual HTML/SVG composited in post** before exporting to .webp. Highest-fidelity option.
- The current `intent-engineering-mcp.png` is an OG card; deleting it must also fix the OG-card generation script bug (URL footer reads `/work/vault-knowledge-mcp/` instead of `/work/intent-engineering-mcp/`). Track separately under Phase 3F C5.

---

### A-4 · The Block — Campus + RevOps (ARCHIVED)

**Concept.** Hand-drawn 3-tier customer-structure matrix as an editorial diagram. Three stacked horizontal bands, mono labels, Sean's character drawn small at the side annotating. Theme: *the actual thinking of the work, not a prop photograph.*

**Composition.**
- Background: warm cream paper texture, slightly muted (this tile is ARCHIVED — slightly cooler ink-secondary `#546E71` for any structural lines, less stamp-amber than the active tiles).
- Top 75% (800×750 zone): **three stacked horizontal bands**, each one full tile width, with thin ink-line dividers between them. From top to bottom:
  - **Tier 1: RESEARCH-ONLY** — narrowest band, JetBrains Mono label left, small ink-icon of a single document right.
  - **Tier 2: RESEARCH + DATA** — middle-height band, label left, two stacked icons right (document + data table).
  - **Tier 3: RESEARCH + DATA + API** — widest band, label left, three icons right (document + table + API node).
- The matrix is rendered in hand-drawn pencil-and-ink, NOT clean-vector. Slight imperfections — a hairline that wavers, an icon that's slightly off-center. *Looks like Sean drew it on the back of a partnership-deck slide.*
- **Sean's pencil-test character** drawn small in the **right margin** at mid-height, in profile, pointing at the Tier 2 band with a pencil. This is the *retrospective annotation* posture — the character is reviewing the work, not in the middle of it.
- Bottom 250px (safe zone): a single thin hand-drawn rule under the matrix, then clean cream.

**Character placement:** **right margin, mid-height** — different from A-1, A-2, A-3.

**Skill to use:** [`.claude/skills/gemini-pencil-animation-image-gen`](.claude/skills/gemini-pencil-animation-image-gen) for the matrix + character (pencil-and-ink unified register).

**Risks.**
- Three-band matrix risks reading as design-system-viewer if the bands look like color swatches. Mitigation: hand-drawn imperfection is mandatory; clean-vector renders fail this tile.
- ARCHIVED status means the tile must feel slightly cooler/quieter than the ACTIVE tiles. Encode this in the prompt: "muted ink tones, no warm accents, retrospective register."

---

### A-5 · 16BitFit Battle Mode (PAUSED)

**Concept.** Photo 1 (`assets/projects-tiles/16bitfit-photo-1.png`) — illustrated still of hands holding a Nintendo Game Boy with a pixel-art runner on the screen, warm bookshelf and lamp in the background. Theme: *the human plays the game; the pixel-art lives inside the device where it belongs.*

**Composition.** (Pre-existing — minimal adjustment needed.)
- Source: [`assets/projects-tiles/16bitfit-photo-1.png`](assets/projects-tiles/16bitfit-photo-1.png) — already 4:5 vertical.
- Adjustment: crop or pad to exact 800×1000 if needed. Verify the bottom 250px is visually quiet (the current image fades into ink-shadow at the bottom, which should overlay cleanly).
- **Character throughline preserved at one remove:** the *hands* are the character (the human side of Sean), the *pixel-art runner* inside the Game Boy is the game. No new character drawing needed.
- The image's warm-lamp + bookshelf register sits naturally beside A-2's knowledge-graph register and A-4's institutional matrix register — three different lighting moods that all share the cream-paper register through warmth.

**Character placement:** **hands at center-bottom, holding the device.** Different from A-1 / A-2 / A-3 / A-4.

**Skill to use:** none — Photo 1 is the asset. If Photo 1 needs regeneration to fit 800×1000 cleanly, use Pixel Labs API or the original generator (Photo 1 is from the same generation run that produced 2 and 3).

**Fallback chain (locked):**
1. **Primary:** Photo 1 (Game Boy in hands) cropped/padded to 800×1000.
2. **Fallback A:** Photo 3 (WORKOUT COMPLETE pixel-art card) — accepted with the caveat that character throughline is lost. Only if Photo 1 cannot be made to fit.
3. **Fallback B (Option-2 pivot):** pencil-test Sean-with-gamepad on a couch, pixel-art game on a small TV in the background. Generated via gemini-pencil-animation-image-gen.

**Photo 2 (16BITFIT title screen)** is **out** — 16:9 horizontal aspect + visible KlingAI watermark.

**Risks.**
- Photo 1 may have an aspect-ratio mismatch (currently shows as 4:5-ish, needs verification at exact 800×1000). Resolve with crop or generative-expand.
- This tile is the visual outlier of the set (photographic-illustration vs. four pencil-and-ink tiles). The outlier status is intentional — Sean's recommendation #2 in the brainstorm — and is what gives Option 3 its lift over Option 1. If the outlier reads wrong in context, fall to the chain.

## 5. Tile-set visual rhythm

Five tiles in sequence on the home grid. The intended visual rhythm:

| Tile | Register | Character placement | Tone |
|---|---|---|---|
| A-1 | Pencil-test walk cycle (multi-frame) | Claude mascot only, centered in each frame; **no Sean** | Active, in-motion |
| A-2 | Pencil-and-ink concept graph | Sean center, lower-third | Active, contemplative |
| A-3 | Terminal screenshot composite | Sean top-right marginalia | Shipped, evidence |
| A-4 | Pencil-and-ink tier matrix | Sean right margin, mid-height | Archived, retrospective |
| A-5 | Photographic-illustration | Hands at center-bottom (the human-self, no drawn Sean) | Paused, cozy |

The set reads as **five different physical artifacts** that all belong on the same desk. The cream-paper substrate is the common thread; the medium varies. A-1 (Claude mascot solo) and A-5 (hands, no drawn Sean) function as rest beats in the character rhythm — they keep the set from feeling Sean-saturated while preserving the throughline across A-2, A-3, and A-4.

## 6. Generation + integration workflow

For each tile:

1. **Prompt drafting.** Use `image-generator-prompt-science` skill to draft the per-tile prompt against the per-tile composition above.
2. **First-pass generation.** Run the prompt through the skill specified in the tile section.
3. **Review against the constraints in §3.** If the output fails any shared constraint (dimensions, safe zone, character placement, baked-in text), regenerate with adjusted prompt.
4. **Two-attempt rule.** If two attempts fail to land cleanly, pivot to the per-tile fallback (A-5 has a defined fallback chain; A-1 through A-4 fall to Option 2 — pencil-test).
5. **Export.** `.webp` at quality 80, target ≤180 KB per file. Filename matches existing convention: `[slug].webp` (A-3 becomes `intent-engineering-mcp.webp` — the existing `.png` is deleted).
6. **MDX frontmatter update.** Per-tile MDX in `src/content/work/` needs `hero_media_type: image` (already set) and `hero_media_alt:` updated to match the new image (e.g., A-3 alt becomes "Editorial terminal screenshot showing npm install resolving with registry verification.").
7. **Visual QA.** Render the home page locally, check all five tiles in context, verify the metadata strip overlays cleanly and the rhythm in §5 reads correctly.

## 7. Acceptance criteria

Phase 3F · Pass B · B3 is complete when ALL are true:

- [ ] All 5 tile assets at `public/assets/projects/[slug].webp` are real authored images, each ≤180 KB, at 800×1000.
- [ ] No tile asset under 10 KB (no stubs).
- [ ] Each tile's character placement matches the table in §5.
- [ ] Bottom 250px of every tile is visually quiet (metadata strip overlay reads cleanly).
- [ ] No baked-in titles, taglines, or URLs in any tile image.
- [ ] The home page projects splash, rendered locally, no longer reads as "color blocks." Recruiter test re-run: 30-second clickthrough no longer breaks at the projects section.
- [ ] All 5 tile MDX `hero_media_alt` strings updated to match the new image content.

## 8. Out of scope

- Authoring the case-study body copy (Phase 3F · Pass A · A2).
- Fixing the OG-card generation script's URL-footer bug (tracked in Phase 3F · Pass C · C5 add-on).
- Animating any tile (no auto-playing video on tiles in v1 — that decision stands).
- Mobile-specific tile variants (the 800×1000 master scales to mobile without a separate asset in v1).

## 9. Open items

None at spec lock. All five tile directions resolved.

---

## Spec self-review checklist (Claude internal)

- [x] No `TBD` / `TODO` markers in the body.
- [x] No internal contradictions between §3 (shared) and §4 (per-tile).
- [x] Scope: single implementation plan (Pass B · B3). Does not bleed into A or C.
- [x] Ambiguity: each tile has one locked direction + one named fallback. No interpretive forks.

---

## Sean's review gate

Spec written and committed. Please review and approve (or request changes) before I invoke the writing-plans skill to draft the implementation plan.
