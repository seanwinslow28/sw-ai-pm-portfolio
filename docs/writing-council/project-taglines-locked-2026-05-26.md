# Project Taglines — Locked Content

**Date:** 2026-05-26
**Status:** LOCKED — 4 project taglines (A-1, A-2, A-4, A-5) ready to apply on Mac Mini. A-3 (`intent-engineering-mcp`) tagline is locked separately in `CLAUDE.md` §"Locked decisions" as `Drawing up agents to act with intent.` and is not touched here.
**Scope:** The `tagline:` frontmatter field on the 4 case-study MDX files. Tagline renders on the projects-section tile and as the case-study hero subtitle per `case-study-spec-v1.md` §4 + `projects-section-spec-v1.md`.
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-26 (continued from the case-study openers lock authored earlier the same day on MBP).
**Build environment:** Mac Mini (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## TL;DR — what's locked

| Frame | File | Locked tagline | Word count | Voice mode |
|---|---|---|---|---|
| A-1 | `animation-pipeline.mdx` | `A pencil-test pipeline with a fleet of in-betweeners.` | 8 | Sedaris-coded, animator-idiom |
| A-2 | `code-brain.mdx` | `A second brain that grew a third one for itself.` | 10 | Sedaris-coded, comedic recursion |
| A-4 | `the-block.mdx` | `B2B PM work where the agreement is the UX.` | 9 | Sedaris-coded, opener ¶2 callback |
| A-5 | `16bitfit.mdx` | `Paused the game. Shipped the pipeline.` | 6 | Hard Cut parallel (A-1/A-2 family) |

Reference family (do not recreate):

| Surface | Tagline | Locked where |
|---|---|---|
| Home hero | `Product Manager. The agents handle the loops. I handle the taste.` | `CLAUDE.md` |
| About header | `Raised by Saturday morning cartoons and Vercel deployment logs.` | `CLAUDE.md` |
| Home About teaser editorial | `A man, a pencil, an agent fleet. Same person, different tools.` | `CLAUDE.md` |
| A-3 intent-engineering-mcp | `Drawing up agents to act with intent.` | `CLAUDE.md` |

---

## Carry-forward constraints (new + reaffirmed)

These apply to all 4 taglines locked here, and to any future tagline writing across the portfolio.

1. **"fleet" usage frequency — ceiling now reached at 2.** `fleet` appears in the Home About teaser ("an agent fleet") and in A-1 tagline ("fleet of in-betweeners"). The Code Brain context tempted a third; Sean ruled the agent-fleet idiom out for A-2, A-4, A-5, About surfaces, and any future tagline writing. A-1's use is grandfathered because the animation-pipeline page is the project where the agent-fleet idiom is genre-native (classical animation in-betweeners). Methods strip cells and case-study opener prose can still use "fleet" — this is a tagline-level constraint only.
2. **Tagline word-count range: 6–12 words.** All five locked taglines (the four above + A-3) sit between 6 and 11 words. Hero, About header, and teaser editorial sit at 9–11. The family ceiling is ~12.
3. **Structural-family discipline.** Locked taglines now span four families: (a) parallel-clause Hard Cut (A-1, A-5 — `Paused the game. Shipped the pipeline.` mirrors the hero's `The agents handle the loops. I handle the taste.`); (b) Sedaris-coded compound-noun pair (A-2's "second brain / third brain" recursion); (c) opener-callback reframe (A-4 → opener ¶2's "agreement is the UX"); (d) sports/screenwriter metaphor (A-3). Avoid the "Same X, same Y, same Z" rule-of-three family — used at About B-1 beat 6 and A-5 opener ¶2; tagline-level ceiling reached.
4. **All carry-forward constraints from `case-study-openers-locked-2026-05-26.md` §"Carry-forward constraints" still apply.** Particularly: no Code Brain fixed counts; no iPad in taglines (used About B-1 beats 3 + 6 + A-1 opener ¶1); no "comprehension is the artifact" echo (ceiling at three); no "building got cheap" echo (ceiling at two); no HybridRouter in user-facing prose.

---

## A-1 · animation-pipeline — LOCKED

**File:** `src/content/work/animation-pipeline.mdx` — frontmatter `tagline:` field (line 5).

Replace:

```yaml
tagline: Teaching Seedance to draw me, then teaching the pipeline to ship the drawing.
```

With:

```yaml
tagline: A pencil-test pipeline with a fleet of in-betweeners.
```

**Why this lands:**
- "In-betweener" is the classical animation term for the artist who drew the frames between the lead animator's keys. So "a fleet of in-betweeners" is the agent fleet doing the exact job that named human role once did — comedic juxtaposition without a punchline, animator-idiom signal in eight words.
- Doesn't echo the opener's compound-noun pair ("animator's idiom, not a content-farm idiom") verbatim while staying in the same Sedaris-coded family.
- "Fleet" usage is grandfathered for this page only — see Carry-forward constraint #1.
- The previous tagline was stack-wrong (Seedance is video interpolation, not the still-image draw step — that's Gemini Nano Banana 2) and ran 13 words past the family ceiling. Both fixed.

**Voice-mode source:** Sedaris-coded, animator-idiom family. Final pick out of 6 options (Hard Cut compound-noun pair / Sedaris animator-idiom / Vonnegut affirmative parallel / rule-of-three specific nouns / Sedaris register-flip / etymology play on *anima*).

**Stack truth honored:** The tagline no longer references Seedance for the drawing step. The opener (locked 2026-05-26) handles the stack split correctly: NB2 for keyframe stills, Seedance for motion interpolation between approved keys.

---

## A-2 · code-brain — LOCKED

**File:** `src/content/work/code-brain.mdx` — frontmatter `tagline:` field (line 5).

Replace:

```yaml
tagline: My second brain has a fleet now.
```

With:

```yaml
tagline: A second brain that grew a third one for itself.
```

**Why this lands:**
- The comedic puzzle. Reader gets it after a half-second: 1st brain = Sean's, 2nd brain = the vault (the established "second brain" term in PKM circles), 3rd brain = the agent fleet that emerged on top of the vault. "Grew a third one for itself" is the Sedaris minor-weirdness — the vault doing something to itself, autonomously, while the human sleeps.
- Carries the recursion / autonomy thesis from the opener without echoing "Comprehension is the artifact" (ceiling reached at A-2 opener ¶3) or "an Obsidian vault that built itself a fleet" (opener ¶2 verbatim).
- Avoids the "fleet" word entirely per Sean's 2026-05-26 ruling — uses "third one" as the implicit fleet referent. The compression makes the recursion the joke instead of the inventory.
- Forward-tilted: the verb is "grew," not "has," not "had." Reads identically hired vs hunting.
- Standalone-strong: works on the projects tile without needing the opener to explain it.

**Voice-mode source:** Sedaris-coded, comedic recursion. Final pick out of 6 options (Hard Cut "Vault by day. Fleet by night." / Sedaris autonomy "vault that thinks while I sleep" / Sedaris recursion / Vonnegut flat "launchd habit" / Sedaris current-refinement / mirror recursion "vault grew a fleet, fleet runs the vault").

**Code Brain numerics rule applied:** No fixed counts. The tagline doesn't claim a number of agents, skills, or hooks — only the existence of an emergent third brain. Carry-forward constraint #1 from `case-study-openers-locked-2026-05-26.md`.

---

## A-4 · the-block — LOCKED

**File:** `src/content/work/the-block.mdx` — frontmatter `tagline:` field (line 5).

Replace:

```yaml
tagline: Two products, one institutional research firm, two years.
```

With:

```yaml
tagline: B2B PM work where the agreement is the UX.
```

**Why this lands:**
- The previous tagline was factually wrong on both counts of its claim: scope was multi-surface (Campus + ETF launch pages + Polymarket × Campus + .co homepage redesign + RevOps automation + bi-weekly P&E update — not "two products"), and the tenure number was foregrounded on a public surface where dates belong in frontmatter, not prose. Both errors fixed by full replacement. See carry-forward constraint on tenure-foregrounding in `project-four-q-locked-2026-05-27.md` §"Carry-forward constraints."
- Echoes opener ¶2's load-bearing PM insight (*"Institutional B2B doesn't have UX to lean on — only the agreement"*) as a tighter reframe. Page-level callback: reader scans the tagline first, reads the opener, and the agreement-as-UX reframe pays off twice.
- PM-craft specificity. "Agreement-as-UX" is portable PM insight that travels to any institutional B2B role on Sean's hunt list and is unsayable by anyone who hasn't worked the genre. Credibility move the ARCHIVED page needs to do without leaning on tenure or scope claims.
- Forward-tilted. Reads identically hired vs hunting. No trace of layoff or "looking for work" cadence.
- Avoids "fleet" per Carry-forward constraint #1.

**Voice-mode source:** Sedaris-coded, opener ¶2 callback. Final pick out of 6 options (Vonnegut affirmative "Build it, ship it, write it down." / Sedaris agreement-as-UX / Sedaris customer-reality / Hard Cut declarative / Vonnegut flat role-title / specific-marquee-artifact "bi-weekly update on top").

**Tagline-vs-opener doubling avoided:** The "Build it, ship it, write it down." phrase is locked inside opener ¶2 and was a candidate for tagline duty as well. Surfaced both, picked the agreement-as-UX reframe so the opener's marquee phrase stays singular instead of doubling as a refrain.

---

## A-5 · 16bitfit — LOCKED

**File:** `src/content/work/16bitfit.mdx` — frontmatter `tagline:` field (line 5).

Replace:

```yaml
tagline: The pipeline is the artifact, not the game.
```

With:

```yaml
tagline: Paused the game. Shipped the pipeline.
```

**Why this lands:**
- Hard Cut parallel structure — mirrors A-1's `Pencil on paper. Agents on frames.` family-shape and the hero tagline's `The agents handle the loops. I handle the taste.` parallel-clause cadence. Three locked taglines now share the structural family (hero, A-1, A-5) — a deliberate refrain across the portfolio.
- Forward-tilted even though the project is PAUSED, because the verb pairing (*paused / shipped*) lands the pause-decision as a PM call, not a failure. "Shipped the pipeline" is the receipt.
- Compresses opener ¶2's two-sentence move (*"The pipeline went one way. The game went on the shelf with a date on it. The pipeline became the case study."*) into six words. The tagline → opener rhyme is stronger now than under the previous tagline: tagline is the compressed thesis, opener is the working-through.
- 6 words — matches A-3's word count exactly (`Drawing up agents to act with intent.`), reinforcing the case-study-page tagline ceiling at the short end.
- Avoids "fleet" per Carry-forward constraint #1. Avoids the "X, not Y" Vonnegut family (the previous tagline's structure) — that family isn't used elsewhere in the locked set, and dropping it costs nothing.

**Voice-mode source:** Hard Cut parallel (A-1/A-2 structural family). Final pick out of 3 options (keep-as-is "pipeline is the artifact, not the game" / Hard Cut paused-shipped / specific-fighter anchor).

**Opener compatibility verified:** The locked A-5 opener (`case-study-openers-locked-2026-05-26.md` §A-5) does not echo the previous tagline verbatim anywhere. The closest opener phrases — `"The pipeline went one way. The game went on the shelf with a date on it."` (¶2) and `"The pipeline became the case study."` (¶2) — rhyme cleanly with the new tagline rather than depending on the old one. Safe swap with no downstream prose edit required.

---

## Apply-on-Mac-Mini checklist — all 4 taglines

When Sean opens this on the Mac Mini:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree)
3. Open `src/content/work/animation-pipeline.mdx` → replace line 5 `tagline:` with `A pencil-test pipeline with a fleet of in-betweeners.`
4. Open `src/content/work/code-brain.mdx` → replace line 5 `tagline:` with `A second brain that grew a third one for itself.`
5. Open `src/content/work/the-block.mdx` → replace line 5 `tagline:` with `B2B PM work where the agreement is the UX.`
6. Open `src/content/work/16bitfit.mdx` → replace line 5 `tagline:` with `Paused the game. Shipped the pipeline.`
7. Run `npm run dev` and confirm all four projects-section tiles + four case-study hero subtitles render the new taglines correctly. Check word-wrapping at the projects-section tile breakpoint (taglines should fit on 1–2 lines per the locked projects-section-spec-v1.md tile shape).
8. Commit: `git add . && git commit -m "4 project taglines locked (A-1, A-2, A-4, A-5)"`
9. **Follow-up (separate session, already flagged in openers-lock §A-4 spec implications):** the-block.mdx broader cleanup — frontmatter dates (line 15–16), anchor_metric (line 19), methods array (lines 24–36), four_q (lines 38–43), and fabricated investigation board artifacts. Tagline lock here does not address those; they need Sean's sanitizable source material.

---

## Spec implications

No spec amendments required by the tagline locks themselves. Two observations for completeness:

1. **`projects-section-spec-v1.md`** — tile-shape spec needs to accommodate the longest of the locked taglines (A-2 at 10 words / 56 characters). If the spec assumes a single-line tile tagline, A-2 may wrap. Visual QA on Mac Mini in `npm run dev` will confirm. No change requested here without seeing the render.
2. **`case-study-spec-v1.md` §13 per-case-study angle hints** — the §13.4 A-4 sample preamble cleanup flagged in `case-study-openers-locked-2026-05-26.md` §A-4 spec implications now has a new tagline to refer to (`B2B PM work where the agreement is the UX.`). If/when the broader the-block.mdx cleanup pass updates §13.4, the new tagline becomes the canonical reference string.

---

*Authored 2026-05-26 in the brainstorm-ideas-existing skill session on MBP. Companion artifact to the openers lock at [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) and the About lock at [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md). Sean retains voice authority on every locked string above.*
