---
title: Project Tile Re-Author — Trio Brainstorm (S3)
status: BRAINSTORM 2026-05-29 (rev 2 — no-text rule + gallery path)
created: 2026-05-29
authored_by: Claude (brainstorm-ideas-existing), Sean Winslow (deciding)
feeds: docs/specs/SHIP-PLAN-2026-05-29.md §S3
scope: re-author 4 of 5 project tiles — A-1 animation-pipeline, A-2 code-brain, A-3 intent-engineering-mcp, A-4 the-block. A-5 (16BitFit) stays; it's also the prototype for the gallery path.
method: Product Trio ideation (PM / Designer / Engineer) → two candidate visual systems → recommended concept per tile + assumptions.
references: mynrd.co.uk-site-analysis/01-site-dna.md · docs/specs/texture-and-artifacts-spec-v1.md · PORTFOLIO-MASTER-PLAN.md §1.3
---

# Project Tile Re-Author — Trio Brainstorm

## 0. The objective, stated plainly

The projects row is the 30-second clickthrough surface. Each tile has to (1) read as *what the project is* at a glance, (2) feel hand-made — not template, not AI-stock (PMP §1.3), and (3) tell the truth (the audit killed A-4's art because it rendered a fabricated 3-tier matrix). We scrap A-1–A-4 and re-author them; A-5 (Game Boy photo) stays.

Output is a recommended concept per tile under whichever visual system you pick (§1), plus the assumptions each bets on.

## 1. HARD RULES (apply to every tile, both paths)

1. **Zero text inside any generated image.** No titles, no anchor metrics, no labels, no UI copy, no logos-with-words. Nano Banana 2 botches type, and the last pass proved it. Every word on the tile — title, tagline, anchor metric — is **real HTML/CSS overlaid by the tile component** (selectable, accessible, editable). The art is purely pictorial. This also future-proofs A-4's anchor string, which is changing anyway.
2. **Uniform tile geometry.** Same aspect ratio + crop discipline across all five (mynrd uses 440×580, uniform). Variety comes from *content and style*, never from size drift.
3. **The frame stays cohesive even if the tiles don't.** Cream/paper substrate, torn-paper transitions, editorial serif + mono type, and the inked pencil-character live in the hero/about/footer/chrome (already locked). That frame is what licenses the tiles to differ — see §2.

## 2. The framing decision (decide this first) — two paths

### Path A — One register, controlled variety
All four re-authored tiles share one render style: pencil-and-ink on cream, recurring character, single amber accent; A-5's photo is the lone outlier. Cohesive, safe, clearly "one hand made this." Risk: four pencil tiles in a row can read as monotone, and it underuses the gallery mechanic the site is built on.

### Path B — The mynrd gallery (★ recommended to explore — your ask)
Each tile is rendered in **the visual brand of its own project** — different medium per tile — presented in a uniform grid. This is exactly what mynrd.co.uk does: the teardown (`01-site-dna.md` §1.1) shows an 18-tile gallery where every tile is a different client in a different visual language, unified only by the cream/white/ink frame and torn-paper transitions. It's also what your Savee boards are: five studios, five languages, one grid.

**Why Path B is on-thesis, not a departure:**
- Your locked philosophy is *"an animator's pencil test, mounted in a Vercel-grade frame."* Path B makes that literal — the pencil character is the **mount** (hero/about/footer/chrome); the project tiles are the **mounted works**, each in its native style.
- It's the strongest anti-template move available. A row of five distinct media (pencil / photo / render / illustration / pixel) cannot read as a template, because there's no single template to fall into.
- A-5 already proves it. The Game Boy photo sits beside pencil tiles today and reads as *range*, not inconsistency. Path B just extends that intentionally across the row.

**The one thing Path B must not break (template-trap #1):** the character is the load-bearing wall. Under Path B the character lives in the **frame** (hero intro, about full-body, footer) and in the **A-1 tile** (whose native medium *is* pencil-test) — not in every tile. Confirm you're comfortable with the character anchoring the frame rather than appearing on all five tiles. If yes, Path B is clear to run.

The rest of this doc develops **Path B** (with Path A noted per tile as the fallback).

## 3. Trio ideation — 5 ideas per lens

### Product Manager lens (what each tile must sell in 5s)
1. **Match the medium to the credential.** A-1 = creative/craft → pencil. A-2 = personal infra → cinematic/atmospheric. A-3 = shipped public product → premium product-render. A-4 = institutional B2B → editorial/print. A-5 = game → pixel. The medium itself communicates the project category before a word is read.
2. **Anchor metric carries the headline — in HTML.** Each tile's one number (220 FRAMES; 118 SKILLS · 8 AGENTS; 0.1.0 · NPM) is overlay type. *Flag:* A-4's current `2024–2026 · TWO PRODUCTS · ONE FIRM` encodes the killed 2-year tenure — re-author it (overlay, so trivial to change).
3. **The row should escalate, not repeat:** craft → system → shipped artifact → prior-firm credential → paused side-quest.
4. **A-3 and A-4 are the recruiter-credibility anchors** — they should look the most *finished/produced* (a real product render; a real editorial illustration), least sketchy.
5. **De-risk A-4 by depicting the institution/relationship, not the product surface** — the corrected canon is a ~6-month institutional crypto-research role (Campus + RevOps); the honest story is "B2B research is a relationship product."

### Product Designer lens (the per-tile style, text-free)
1. **A-1 — pencil-test, the anchor medium.** A single hero pose with faint onion-skin ghost frames behind it (motion + the 220-frame volume), graphite-on-cream. The project *is* hand-drawn animation, so this tile legitimately stays in the character register and grounds the gallery. No text.
2. **A-2 — warm nocturne (photographic/3D).** A dark pre-dawn desk, one warm amber lamp, a laptop's glow — the moment the Daily Driver wakes at 08:30. Cinematic, domestic, single warm key light (the Creed/David dark-premium mood, but a workspace). Atmosphere, not a diagram. No screen text — the laptop glow is light, not legible UI.
3. **A-3 — premium product render on bold color.** Treat the shipped package as a physical object: a clean matte monolith/module on a seamless studio sweep, dramatic single light, set on the site's deep teal `#0A3E42` (Coast-style fintech-minimal). "This shipped; it's a real product." Pure object + light, zero labels.
4. **A-4 — editorial ink-and-wash.** An illustrated institutional interior — an analyst's reading room / research desk — in restrained ink-and-watercolor (the Trafalgar-Tavern architectural-illustration register). Reads "established research house," editorial and credible, no crypto clichés, no tiers, no text.
5. **A-5 — pixel art (native).** Keep the Game Boy photo and/or a pixel-art runner; pixel is the game's own brand and is text-free by nature.

### Software Engineer lens (how to make these, cheaply + truthfully)
1. **A-1 uses a real `runs/` frame** from the actual pipeline — the most-meta tile becomes genuine pipeline output. Lowest effort, highest honesty, zero text.
2. **A-2 / A-4 via `gemini-image-gen` (Nano Banana 2)** for the photographic-nocturne and the ink-wash illustration — both are general-image styles, not pencil-test. **A-3** also `gemini-image-gen` for the studio product render. Commit every prompt to `assets/tile-generation/prompts/`.
3. **A-1 (and any character moment) via `gemini-pencil-animation-image-gen`** off `sean-anchor/anchor.png` for identity-lock — only where the character actually appears.
4. **Generate text-free, typeset in the component.** Anchor metric + title are HTML overlays in the tile (matches how mynrd overlays its labels). Never bake type into the raster.
5. **Normalize + budget.** Pillow pass → uniform aspect ratio → WebP into `/assets/projects/`; raws cached in `assets/tile-generation/raw/` (gitignored). Two-attempt budget per tile, then fall back to the Path-A pencil version. Current `.webp` stays live until a replacement clears your bar.

## 4. Top picks → recommended concept per tile (Path B)

| Tile | Medium (the "brand") | Concept — text-free | Anchor (HTML overlay) | Path-A fallback |
|---|---|---|---|---|
| **A-1 Animation Pipeline** | Pencil-test on cream (anchor medium) | Hero pose + onion-skin ghost frames; a real `runs/` frame | `220 FRAMES` | same (it's already the register) |
| **A-2 Code Brain** | Warm nocturne photo/3D | Pre-dawn desk, one amber lamp, laptop glow — the 08:30 wake | `118 SKILLS · 14 HOOKS · 8 AGENTS` | pencil "morning the fleet wakes" scene |
| **A-3 Intent Engineering MCP** | Premium product render on teal | Matte monolith/module on a studio sweep, dramatic light, `#0A3E42` field | `0.1.0 · NPM + MCP REGISTRY` | pencil "drawing up the agent" at a drafting table |
| **A-4 The Block** | Editorial ink-and-wash | Institutional reading room / analyst's desk, restrained ink+watercolor | re-authored (e.g. `CAMPUS + REVOPS · B2B RESEARCH`) | pencil two-figure "relationship over infrastructure" |
| **A-5 16BitFit** | Pixel art / photo (native) | Keep Game Boy photo; optional pixel runner | `PIPELINE 47% · GAME ON SHELF` (count-fragile; v1.1) | unchanged |

**Why this set:** five media, five brands, one frame — the gallery realized. Each medium pre-classifies its project (craft / atmosphere / product / institution / game) before any text loads. The character still anchors the site via the frame and the A-1 tile, so template-trap #1 holds.

### Per-tile assumptions to validate
- **A-1:** a real frame reads clearly at tile crop; onion-skin ghosts don't muddy at small size.
- **A-2:** "fleet / infrastructure" reads from an *atmosphere* (a lit desk at dawn) without any diagram — the metric overlay may carry the rest.
- **A-3:** an abstract matte object reads as "a shipped software product," not a generic gadget; teal field is distinct enough from the site's own teal chrome.
- **A-4 (highest-stakes):** references **nothing** from killed canon (no matrix, no 2-year arc); "research firm" reads without crypto/finance cliché; ink-wash doesn't drift toward stock-illustration; corrected anchor string confirmed against S1 lock #9 before generation.
- **Frame cohesion:** five distinct styles still cohere through the cream/torn-paper frame and uniform crop — verify on the actual grid, not in isolation, before committing.

## 5. What to hand the generator (next step)

Pick a path (§2). If Path B: per-tile path is **A-1 → real `runs/` frame**; **A-2/A-3/A-4 → `gemini-image-gen`** (nocturne / product render / ink-wash); character moments → `gemini-pencil-animation-image-gen` off the anchor. All gens **text-free**; titles + anchors are HTML overlays. Commit prompts; two-attempt budget; current `.webp` stays live until replaced. I can draft the four text-free prompts on your go.

## 6. Canon-safety note

A-4 is the one to watch. The on-disk `the-block.mdx` still carries the fabricated "two years / 3-tier matrix" until S1 lock #9 lands. **Do not generate A-4 from the current MDX** — generate from the corrected canon (Campus + RevOps, ~6-month institutional crypto-research role, "relationship product" learn), and confirm the corrected anchor string before art. Because all type is now an HTML overlay, the *art* can't re-commit a fabricated number even by accident — but the *concept* (institution, not tier-matrix) still has to be right.
