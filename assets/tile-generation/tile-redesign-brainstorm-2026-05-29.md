# Project Tile Redesign — Brainstorm (A-1 → A-4)

> **Date:** 2026-05-29
> **Skill:** `pm-product-discovery:brainstorm-ideas-existing` (PM / Designer / Engineer trio)
> **Scope:** Replace the generated media for tiles A-1, A-2, A-3, A-4. **A-5 (16BitFit) is locked** and is the north star. Tagline strings stay in HTML (`projects-section-spec` §3.1) — they never live in the image.
> **Status:** Brainstorm — concepts proposed, awaiting Sean's pick before prompt-writing.

---

## 1. The opportunity, stated plainly

The current A-1…A-4 media lean on **text baked into the image** — frame numbers, node labels, terminal strings, tier bands. Nano Banana 2 can't render type reliably, so the last pass shipped garbled glyphs (`Pletend ANALYSIS`, `Innowation Clackens`, `SAYTOV`, `OUT TITRGE`). The fix isn't better typography prompting — it's removing the dependency on type entirely.

**Reference (mynrd.co.uk projects section):** every tile is a *different medium* — surreal editorial illustration, dark product photography, flat vector, architectural illustration, brand-object render. Identity is carried by **the image alone**; the site never captions a tile. The only legible text lives inside *real* product screenshots, never AI-generated.

**The job to be done for each tile:** convey a project's *character and craft* in one wordless, in-world image that a recruiter reads in 3 seconds — while the HTML metadata strip below carries the actual title/status/tags.

### Locked constraints (from Sean, this session)

| Decision | Choice |
|---|---|
| **Art-style range** | **Anchored variety** — shared warm-paper substrate + pencil-test soul; each tile a clearly *different technique*. |
| **Character** | **In-world scenes, no figure** — imply Sean via hands / desk / tools, like 16BitFit. No drawn human. |
| **Text** | **Truly zero** — no legible glyphs anywhere, incidental object text included. Design *around* text surfaces. |

---

## 2. The shared anchor (what every tile holds constant)

Variety is the spice; this is the plate it sits on. If a concept drifts off this anchor, it's drifting toward the template trap.

- **Substrate:** warm cream paper `#FFF9F0`, subtle fiber/texture. The world sits *on* paper.
- **Soul:** a hand made this — construction lines, slightly imperfect edges, a tool left in frame. Pencil-test DNA even when the technique isn't literally pencil.
- **One splash color per tile**, tied to status (see picks). Never two splashes.
- **In-world, first-or-second-person framing** — an object on a desk, a thing under a lamp, a sheet on a table. The viewer is *at the work*, not looking at a diagram.
- **Bottom ~25% stays visually quiet** — the HTML metadata strip overlays here (carry this convention forward from the old prompts; it's the one thing those prompts got right).
- **4:5 portrait, 800×1000**, object-fit cover.
- **Zero legible text.** Surfaces that normally carry type (cards, blueprints, ledgers, screens) are rendered blank, hatched, or icon-only.

**POV spread (so the grid doesn't feel same-y, and none clones A-5's over-the-shoulder warm-lamp POV):**
A-1 top-down flat-lay · A-2 three-quarter lamplit desk · A-3 angled drafting table · A-4 eye-level still life · *(A-5 = first-person hands, locked)*.

---

## 3. Three-lens idea pool

Compact pass — the trio generating raw directions before convergence.

**Product Manager (identity, status legibility, differentiation):**
- Each tile should encode *status* through palette, not words — ACTIVE runs warm, ARCHIVED runs cool. A recruiter triages by temperature.
- Don't over-explain the project literally; mynrd's cologne-on-a-moonrock doesn't "explain" the brand. Mood + the HTML strip do the work.
- The four must look like *one author, four crafts* — that's the whole positioning (a creative who ships with a fleet).

**Product Designer (craft, in-world scene, delight):**
- Replace every former *label* with a *physical object that means the same thing* (tier-bands → stacked forms; node-labels → pinned blank cards + string; terminal text → a blueprint).
- Use light as the narrative device — light-table glow, lamp pool, raking museum light. 16BitFit already proves warm light sells "real."
- Distinct *technique per tile* is where the variety lives: graphite, ink-wash nocturne, blueprint draft, cool tonal still life.

**Software Engineer (what NB2 can actually do, reliably, textlessly):**
- NB2 is strong at: hands, desks, single hero objects, lighting, paper, fanned sheets, string, stacked geometry. Weak at: type, dense UI, many small repeated labels.
- Reuse existing assets as *in-world content*: the peach AI-companion walk frames can sit on the light table; no re-derivation needed.
- Force blank surfaces explicitly and **inspect-then-regenerate** — treat any legible glyph as a hard-fail reason code, same discipline as the anima HF/SF gates.

---

## 4. Converged picks — one locked direction per tile

### A-1 · 2D Animation Pipeline — *"The Light Table"*  · status ACTIVE · splash **amber**

**Scene:** Top-down flat-lay of a backlit animator's light table. A fan of translucent pencil-test sheets spread across the glowing rectangle, peg-bar at the top edge, a pencil and kneaded eraser resting. The top 3–4 sheets show the rounded **peach AI-companion** mid-walk (reuse the existing walk-cycle as the *content* of the frames). Faint registration holes punched down the sheet edges. Warm amber light bleeds from under the paper.
**Technique:** warm graphite + light-table glow; painterly enough to feel real, *top-down* so it never clones A-5's first-person POV.
**Why:** It's the literal artifact of the pipeline — frames, by hand, lit from below — and it mirrors 16BitFit's "real object on a desk" move with a different object and angle. The sequence reads as motion with zero captions.
**Validate:** that the on-sheet character stays charming at tile scale; that "light table" reads without a single number on the frames.
**Zero-text risk:** low — sheets are drawings, not labels. Keep peg-bar and any tool blank.

### A-2 · Code Brain — *"The Second Brain Wakes Up"*  · status ACTIVE · splash **teal-cool node-glow + one amber thread**

**Scene:** A lamplit desk at night, three-quarter view. An open notebook whose blank pages emit faint glowing threads that rise off the page and weave into a constellation of nodes hovering above the desk — the knowledge graph lighting up. Nodes are small luminous orbs/icons (no text). One thread runs **amber** through three nodes (the "live" path); the rest cool. A hand may rest at the notebook edge. Coffee, a closed laptop as ambient props.
**Technique:** nocturne ink-wash + dual-temperature glow (cool nodes, one warm thread). Cozy-nocturnal matches the *nightly autonomous agents* truth.
**Why:** This is the A-2 garble fixed at the root — the old node-labels become *blank luminous nodes*, the metaphor carried by light and a single amber thread instead of words. Distinct technique from A-1 and A-3.
**Validate:** that the graph reads as "a brain/system," not "random dots"; that one amber thread stays legible as the hero path.
**Zero-text risk:** medium — notebook pages and any screen must be blank/abstract. Force "no writing on pages."

### A-3 · Intent Engineering MCP — *"Drawing Up an Agent"*  · status SHIPPED · splash **teal**

**Scene:** Angled top-down of a drafting table. Pinned down: a patent/blueprint-style **orthographic turnaround of a small agent/robot** — front, side, top views — being *drawn up*. Drafting tools in frame: compass, set square, ruler, a mechanical pencil mid-stroke. Faint cyan/teal drafting grid as the one splash. Title-block corner of the blueprint is left **blank/hatched** (this is the text trap — keep it empty).
**Technique:** blueprint drafting — fine technical ink/pencil on cream, faint teal construction lines. The coolest, most "infrastructure" technique in the set.
**Why:** Renders the locked tagline *"Drawing up agents to act with intent"* literally — *drawing* (the animator's hand) + *drafting up a spec* (the PM's hand), the exact double meaning, with no text. SHIPPED reads as "a finished, drafted thing."
**Validate:** that "blueprint of an agent" reads as intentional infrastructure, not a toy robot; that the title-block stays empty through generation.
**Zero-text risk:** high — blueprints *beg* for dimension labels and title blocks. Strongest guardrails needed (see §6). This is the tile most likely to need 2–3 regenerations.

### A-4 · The Block — Campus + RevOps — *"The Cooled Newsroom"*  · status ARCHIVED · splash **none (cool graphite, no amber)**

**Scene:** Eye-level still life of a closed chapter at a crypto-media desk. A folded broadsheet newspaper, a coffee gone cold with a faint ring, a blank challenge-coin / token used as a paperweight (a smooth disc, *no* stamped text), a closed ledger book. Raking cool window light, dust motes, long quiet shadows. Everything slightly desaturated — the air of an archived room.
**Technique:** cool graphite tonal still life — desaturated, restrained, no warm accents (ARCHIVED register per spec; "the register stays cool").
**Why:** The Block was a **media** company; the mood of a quieted newsroom desk carries "closed B2B chapter" emotionally, and the HTML strip names Campus + RevOps. Turns the old garbled tier-bands into *objects and atmosphere*. The only fully amber-free tile — its coolness is the status signal.
**Validate:** that "archived/closed chapter" lands without reading as generic stock; that the token-as-paperweight stays blank.
**Zero-text risk:** medium — newspaper and ledger must show *texture of text* (hatched lines), never legible words. Token must be a plain disc.

---

## 5. Runner-ups (if a pick doesn't land in generation)

| Tile | Runner-up concept | One-liner |
|---|---|---|
| A-1 | **Drying line of cels** | A clothesline of pinned animation frames in window light — sequence implied by repetition, ink-wash. |
| A-2 | **The red-string board** | A detective's evidence board of *blank* pinned index cards + string, one amber thread — knowledge graph as physical pinboard. |
| A-3 | **The marionette control bar** | A hand on a puppeteer's control bar, amber strings to a small agent mid-purposeful-action — "act with intent" as a felt gesture. |
| A-4 | **Tiered stone plinths** | Three plinths of rising height (the partnership tiers) as a cool sculptural still life — structure carried by geometry, not text bands. |

---

## 6. Generation guardrails — the zero-text discipline (this is what fixes last pass)

The last pass failed because the *prompts asked for text*. These don't. Bake the following into every prompt:

1. **No type, anywhere.** End every prompt with an explicit negative: *"No text, no letters, no numbers, no labels, no captions, no logos, no UI copy, no legible glyphs of any kind. Any surface that would normally carry writing (pages, blueprints, screens, newspaper, coins, title blocks) is rendered blank, hatched, or icon-only."*
2. **Name the trap surface per tile** and force it blank — A-3's title block, A-2's notebook pages, A-4's newspaper/token. NB2 fills these with garble by default unless told otherwise.
3. **One splash color, stated as a hard palette** — amber (A-1), cool+one-amber-thread (A-2), teal (A-3), none (A-4). List exact hex; list "no other colors" as a negative.
4. **Keep the bottom ~25% quiet** for the HTML metadata strip (carry over from old prompts).
5. **Inspect-then-regenerate loop.** After each generation, read the image back and treat *any legible glyph* as a hard fail — regenerate or crop. Same gate philosophy as anima's HF/SF reason codes. Budget 2–3 attempts for A-3 specifically.
6. **Anchor with references where it helps** — A-1 can pass the existing peach-companion turnaround as a reference for the on-sheet frames; the rest are scene-built, no character reference needed.

---

## 7. Recommended next step

Lock the four picks (or swap any for its runner-up), then I write four NB2 prompts to `assets/tile-generation/prompts/` (versioned `-v3`), generate, run the inspect-then-regenerate loop, and drop the winners into `public/assets/projects/`. A-5 is untouched throughout.
