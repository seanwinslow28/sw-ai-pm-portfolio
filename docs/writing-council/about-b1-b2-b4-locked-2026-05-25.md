# About Page — B-1 + B-2 + B-4 Locked Content

**Date:** 2026-05-25
**Status:** Locked — ready to write into `src/content/about/index.mdx`
**Scope:** B-1 stacked beats (6 entries) · B-2 thesis prose (3 paragraphs) · B-4 building-toward prose (2 paragraphs) · recruiter italic removal
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-25
**Supersedes:** Council critique session 2026-05-24 ([`about-b2-p3-2026-05-24.md`](about-b2-p3-2026-05-24.md))
**Build environment:** Mac Mini (this doc was authored on MBP — no MDX edits committed here to avoid Github conflicts)

---

## TL;DR — what changed

1. **B-1 beats rewritten with real biography** — 7 placeholder beats replaced with 6 true beats anchored to actual moments (Ash Ketchum drawing → College of Staten Island film festival → Covid basement → WGA strike → Mario-in-Cursor + Krieger → current state).
2. **B-2 ¶1 rewritten** — opening signpost ("I used to think") replaced with a lifetime/PM-job contrast that earns the thesis biographically.
3. **B-2 ¶2 rewritten** — three-stamp aphorism ("Comprehension is the artifact. Governance is the artifact. The spec is the artifact.") replaced with a single Tuesday-someone-fixed-a-bug-off-your-old-spec moment.
4. **B-2 ¶3 rewritten** — council edits applied (kill "realized," kill em dash, protect "success-empty" + "The sentence was the product") + "cold coffee" replaced with "overcooked breakfast."
5. **B-4 ¶1+¶2 rewritten** — thought-leader cadence ("the spec layer is where I want to be in the room") replaced with quieter position-paper register ("That's the layer I'm working in" / "The fix isn't smarter models. The fix is a PM who can write the spec line that distinguishes them.").
6. **Recruiter italic call-out REMOVED entirely** — no traces of hunting-signal anywhere in the prose. The page now reads identically hired vs hunting at every level of detail.

---

## Lane mapping decision (B-1)

Sean introduced an "AI Shift" lane state on two beats. The spec only defines three lanes (animator / PM / braided). After discussion, both AI Shift beats map to **braided** per the spec's definition (both threads active in the same beat). No spec amendment needed.

**Final chromatic rhythm:** `gradient → amber → amber → gradient → gradient → gradient`

Visually: braid at birth → solid amber block (the screenwriting era) → braid arrives in 2023 (WGA strike + ChatGPT) and never leaves. The 15-year amber middle visually *is* the screenwriting-as-day-job period running solo. The braid returning at beat 4 and persisting through beat 6 makes the AI-tools-as-rebraiding thesis literal at the color level. The prose doesn't have to state it — the left-margin rule does.

---

## B-1 — Locked frontmatter

Replace the current `beats:` block in the frontmatter (lines 26–55 of `src/content/about/index.mdx`) with:

```yaml
beats:
  - age: 8
    year: 2000
    body: "Drew Ash Ketchum and Pikachu. Sold it to a kid in second grade for a buck."
    lane: braided
  - age: 23
    year: 2015
    body: "Won \"Best Comedy\" at my college film festival. Still have the certificate."
    lane: animator
  - age: 28
    year: 2020
    body: "Spent all of Covid in my parents' basement hunched over an old desk with my iPad. Created my first animated short — \"Break Time\"."
    lane: animator
  - age: 30
    year: 2023
    body: "The WGA went on strike over AI. The writers' rooms started to shrink along with my chances of breaking in. I asked ChatGPT for advice."
    lane: braided
  - age: 32
    year: 2025
    body: "Built Super Mario with Cursor when I stumbled upon Lenny's Podcast — Mike Krieger explained what a PM does inside an AI company. My ears perked up."
    lane: braided
  - age: 33
    year: 2026
    body: "Writing PRDs. Checking evals. Sketching animatics on my iPad for the animation pipeline. Same desk, different purpose."
    lane: braided
```

**Note:** The `b3_load_bearing_cel: 4` field (line 58) stays as-is. It still references the Samurai Jack cel intended for annotation, but the annotation itself is deferred to v1.1 per spec §1.2.

---

## B-2 — Locked prose

Replace the entire prose body inside `<section class="about-section about-section--b2">` (currently lines 77–81 of `src/content/about/index.mdx`) with:

```mdx
  Deep enough into the PM job, I finally understood why a lifetime of making things hadn't quite landed. The drawing, the code, the cut — I shipped the artifact and assumed the artifact would explain itself. The artifact never explains itself. The PRD does. The spec does. The note at the top of the file that says *this is what this is and what it's for* does. The thing I was avoiding because I thought it was paperwork turned out to be the actual product.

  Building got cheap this year. The agents draw the keyframes now; they write the code; they ship the page. The Tuesday I noticed was the Tuesday a PM I'd never met opened a PR I'd never read, fixing a bug I'd never logged, off a spec I'd written six weeks earlier. Comprehension is the artifact. Everything else is shavings off the side.

  Sunday morning the fleet ran clean. The indexer wrote 86 chunks, the synth landed one concept and one connection, the critic returned success-empty. I read the 09:12 digest over my overcooked breakfast. The oldest moving part on the page was a sentence I'd written three weeks earlier and forgotten. The sentence was the product.
```

**Arc:** thesis → evidence → click. ¶1 makes the claim (the spec is the product). ¶2 proves it externally (a stranger fixes a bug off your old spec). ¶3 proves it internally (your own fleet runs off a sentence you'd forgotten). The thesis never repeats; each paragraph earns it differently.

---

## B-4 — Locked prose

Replace the entire prose body inside `<BuildingToward>` (currently lines 96–98 of `src/content/about/index.mdx`) with:

```mdx
    Building got cheap. Comprehension didn't. The next decade of product judgment lives in the spec layer — agent governance, intent engineering, the verification loops that catch the wrong-thing-shipped-correctly. That's the layer I'm working in.

    The hinge moments come when a PM has to choose between the agent that's slightly more accurate and the agent that can show its work. Most teams pick accuracy. The fix isn't smarter models. The fix is a PM who can write the spec line that distinguishes them.
```

**Note:** "Building got cheap." in ¶1 is the deliberate callback to B-2 ¶2's "Building got cheap this year." Same phrase, different position, separated by B-3 (cartoon canon). B-2 introduces the thesis with a time-stamp; B-4 restates it without one — observation becomes principle. Vonnegut refrain move at the page-level scale. The page rhymes with itself.

---

## Spec change — Recruiter italic call-out REMOVED

**Scope:** The `<RecruiterCallout />` component should no longer render on the About page. The page makes zero requests for employment; the CURRENTLY @ stamp + daily-dated pulse strip + B-4 position-paper prose carry all freshness/identity work.

### MDX edit

Remove this line from `src/content/about/index.mdx` (currently line 101):

```mdx
  <RecruiterCallout visible={frontmatter.available === true} />
```

Also remove the corresponding import at the top of the file (currently line 67):

```mdx
import RecruiterCallout from "~/components/about/RecruiterCallout.astro";
```

The `<RecruiterCallout />` component file itself can stay in `src/components/about/` — it's just no longer mounted. Future-proofing: if Sean ever wants to reintroduce it, the import + JSX line are the only re-add points.

### Frontmatter field `available`

The `available: true` field on line 19 of the MDX **becomes unused** once the call-out is removed. Two options:

- **Keep it** (recommended) — costs nothing, leaves the field available for any future surface that might want to read employment-state without prose impact.
- **Remove it** — minor schema cleanup; would require updating the Astro content collection schema in `src/content.config.ts` if `available` was marked as a required field there. Lower priority.

### Spec implications (about-spec-v1.md)

The lock breaks alignment with three sections of [`about-spec-v1.md`](../specs/about-spec-v1.md):

| Spec section | What it currently says | Reality after this lock |
|---|---|---|
| §12.1 | Three surfaces: stamp + heading-and-prose + recruiter italic | Two surfaces: stamp + heading-and-prose |
| §12.2 (Aging contract) | "Flipping `available: false` is sufficient to hide the call-out" | The call-out is never rendered regardless of `available`. Aging contract simplifies to: only the `current_company` field changes when Sean's hired. |
| §12.5 (Component shape) | Includes `<RecruiterCallout visible={…} />` | Component removed from the page composition |
| §17 DoD #8 | Tests the recruiter italic conditional render | Test obsolete; replace with: "B-4 prose carries no employment-state signal in either `available: true` or `available: false` state." |

**Recommended spec update:** Add a §1.2 deferral-style entry to about-spec-v1.md noting the removal, dated 2026-05-25, with rationale: "Sean's call — the About page is meant for all readers regardless of employment context. Recruiter italic carried hunting-signal that violated the 'identical hired vs hunting' principle in §12.1. The CURRENTLY @ stamp + daily-dated pulse strip + B-4 position-paper prose already satisfy freshness/identity work without any ask language."

---

## Quality-pass observations (no action needed)

Three callback-rhymes emerged organically from the locked prose. Worth knowing they're there:

1. **"Building got cheap"** — B-2 ¶2 → B-4 ¶1. Time-stamped observation becomes permanent principle.
2. **"Product" / "spec" / "artifact" thesis-family** — threads through B-2 (twice as closer) + B-4 (twice as opener). Same thesis, different referents.
3. **The iPad** — B-1 beat 3 (Covid basement, hunched over an old desk) → B-1 beat 6 (animatics for the pipeline). Same physical object, 6 years apart, completely different output. The chromatic rebraid in B-1 is *also* an iPad-purpose rebraid.

None of these were engineered. They emerged because the prose got tightened around the truth. The signal that the section is working — the rhymes that show up are the ones the underlying biography was already making.

---

## Apply-on-Mac-Mini checklist

When Sean opens this on the Mac Mini, the sequence to apply:

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree)
3. Open `src/content/about/index.mdx`
4. Replace `beats:` block per §B-1 above
5. Replace B-2 prose per §B-2 above
6. Replace B-4 prose per §B-4 above
7. Delete the `<RecruiterCallout />` JSX line + the import per §Spec change above
8. Update `available:` frontmatter if desired (keep recommended)
9. Run `npm run dev` and visually confirm the About page
10. Run `npm run build` to confirm `scripts/validate_about.mjs` still passes (the `lead:` field is unchanged so it should)
11. Commit: `git add . && git commit -m "About B-1 + B-2 + B-4 locked content + recruiter italic removed"`
12. (Optional) Update `about-spec-v1.md` §12 + §17 + §1.2 per "Spec implications" above. Can be a separate commit.

---

*Authored 2026-05-25 in the brainstorm-ideas-existing skill session on MBP. Companion artifact to the ¶3 critique at [`about-b2-p3-2026-05-24.md`](about-b2-p3-2026-05-24.md). Sean retains voice authority on every locked string above.*
