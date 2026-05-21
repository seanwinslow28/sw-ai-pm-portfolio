# Cartoon Canon Cel — Generation Prompts (v1)

> **Status:** LOCKED 2026-05-21. All 6 cels generated and validated against about-spec §11. Bugs Bunny was in the original draft; replaced with Uncle Iroh per Sean's call after generation. Samurai Jack confirmed as the `break_grid: true` cel.
> **Consumer:** About page B-3, the Saturday morning canon section. 6 cels in a 3×2 grid; cel 04 (Samurai Jack) is `break_grid: true` per about-spec §11.3.1 — renders at 1.2× scale spanning two columns on desktop.
> **Tool:** Gemini Nano Banana 2 via [`.claude/skills/gemini-pencil-animation-image-gen`](../../.claude/skills/gemini-pencil-animation-image-gen/SKILL.md). Generation strategy = Approach B (style anchor + per-character reference, both passed via `--reference`).

---

## Lessons banked from v1 generations (apply forward)

These are the post-mortems from authoring the 6 cels. Apply them to any future pencil-test generation (OG cards, additional cartoons, hero-icon refreshes).

1. **Minimal prompts beat verbose prompts.** When the reference image is strong, let it do the work. Sean's improved Tommy prompt removed the "single orange curl" + "zigzag mouth" + "freckle dots" feature spec — Gemini was over-correcting on those features and breaking identity. The minimal "same head shape, same hairs, same eyes, same shirt" approach let the ref carry it and produced canonical Tommy on the first generation. **Forward rule: if a feature shows on the reference image, don't name it in the prompt unless absent-by-default risks losing it.**

2. **Use absolute paths in `python3 .../generate_image.py` invocations.** The Bash tool's working-directory persistence trapped one generation when a relative path resolved against the wrong directory. **Forward rule: invoke the script with absolute paths for both `--output` and every `--reference`.**

3. **AI Studio is the escape hatch.** When a scripted generation fights — same model, same prompt, same refs — drop the prompt into Google AI Studio with the same model (`gemini-3.1-flash-image-preview` / Nano Banana 2). Faster iteration loop, same engine. Sean landed the canonical Jake there after the scripted attempts kept missing.

4. **Safety filters trip on "baby" / "toddler" / "diaper" + child reference images, even for cartoon characters.** Mitigation: don't name those terms — describe the visual via reference instead. Tommy's prompt now describes him via head shape + hair tuft + shirt without ever naming his age.

5. **Validate-the-hardest-thing-first.** Generate the `break_grid` cel (or whichever is highest-stakes) first. If it lands, the pipeline is validated and the rest can batch in parallel with confidence. Jack was generated first for this reason.

6. **Back up before regen.** Copy the working version to `<file>-v1-backup.png` before re-running a generation that overwrites. We have three backups in this folder (`02-tommy-pickles-v1-backup.png`, `04-rocko-v1-backup.png`, `06-jake-v1-backup.png`) preserved this way.

7. **Cream paper background (`#FAF5E8`) reads beautifully in the pencil-test treatment** and integrates with the site's `#FFF9F0` paper without competing. For any future pencil-test asset (OG cards with embedded character art, the about-page full-body, additional cartoons), default to cream — pure white feels clinical against the warm chrome.

8. **Iroh's clean first-gen confirmed the minimal-prompt rule.** When the reference image carries the character's defining features (Iroh's beard, robes, half-lidded calm), the prompt only needs to name pose + temperament. The wallaby-versus-Iroh stylistic delta was solved entirely by the reference image, not by adding more descriptive text.

---

## Locked canon (6 cels, in render order)

| Slot | Cel | File | Lesson noun | break_grid |
|---|---|---|---|---|
| 01 | Tommy Pickles | [`01-tommy-pickles.png`](01-tommy-pickles.png) | THE SCREWDRIVER | false |
| 02 | Ash Ketchum | [`02-ash-ketchum.png`](02-ash-ketchum.png) | THE LONG GAMBIT | false |
| 03 | Rocko | [`03-rocko.png`](03-rocko.png) | THE OUTSIDER | false |
| 04 | Samurai Jack | [`04-samurai-jack.png`](04-samurai-jack.png) | THE CODE | **true** |
| 05 | Uncle Iroh | [`05-uncle-iroh.png`](05-uncle-iroh.png) | WISDOM IN RESTRAINT | false |
| 06 | Jake the Dog | [`06-jake.png`](06-jake.png) | SQUASH AND STRETCH | false |

Backups preserved in this folder: `02-tommy-pickles-v1-backup.png`, `04-rocko-v1-backup.png`, `06-jake-v1-backup.png`. Removed candidates (Bugs Bunny + earlier Tommy + earlier Jake) live in [`removed/`](removed/) — not for build, retained as a historical record.

---

## Shared inputs (every prompt uses these)

| Input | Path / value |
|---|---|
| `--reference` flag #1 (style anchor) | [`../2D-Character-Sketch-Sean-v1.png`](../2D-Character-Sketch-Sean-v1.png) — locks the pencil-test treatment |
| `--reference` flag #2 (character) | `./character-refs/<character>-N.{jpg,png}` — locks character identity |
| `--aspect-ratio` | `3:4` — portrait orientation, gives the character standing room |
| `--output` | `./0N-<slug>.png` |
| `--model` | `gemini-3.1-flash-image-preview` (Nano Banana 2, the skill default) |
| `--env-file` | `../../.env` (absolute path recommended per lesson #2 above) |

---

## Shared style block (appended to every prompt)

```
STYLE: Hand-drawn graphite pencil-test study on warm cream paper. Warm gray
pencil lines (NOT black), natural stroke-weight variation — thicker on
contour outlines (~2-3px), thinner on interior details (~1px). Visible
construction line artifacts beneath the final drawing. Subtle cross-hatching
for shading on clothing folds, under chin, shadow areas. Confident, gestural
strokes — the line work of a professional animator. Limited, desaturated
flat color fills layered OVER the pencil drawing — pencil lines remain
visible through and on top of color. Colors match the character's canonical
palette but rendered muted.

PAPER / BACKGROUND: Warm cream/near-white background (#FAF5E8 approximate)
with subtle paper grain. Clean. NO production label, NO hole-punch marks,
NO border, NO frame, NO text on the image.

LAYOUT: Single character, full body, centered, occupying ~70% of vertical
canvas. Some negative space above the head and below the feet. Slight 3/4
view angle to show personality.

NEGATIVES: No vector-clean lines. No solid black outlines. No cel shading.
No anime style (unless explicitly called for by the character, e.g. Ash).
No saturated colors. No digital painting look. No gradient shading. No pure
white background. No pure black lines. NO production label or hole-punch
marks (those compete with the cel's own framing in the Astro component).
NO border, NO frame, NO text on the image.

IDENTITY: The character must be unmistakably [CHARACTER NAME]. The
character reference image (--reference flag #2) is the source-of-truth for
face, costume, and defining features. The style anchor (--reference flag
#1) is the source-of-truth for the pencil-test treatment. Translate the
cartoon character INTO the pencil-test style without losing identity.
```

---

## 1 · TOMMY PICKLES — `THE SCREWDRIVER`

**Output:** `./01-tommy-pickles.png`
**Lesson body:** unlock the playpen first. the adventure is downstream.
**Post-mortem:** First generation tripped the safety filter on "baby" + child reference image. Mitigation: drop "baby" / "toddler" / "diaper" from the prompt, describe via head shape + hair tuft + light-blue shirt-and-shorts setup. Second gen also over-corrected on Gemini's read of "single orange curl" + "zigzag mouth" + "freckle dots" — those tripped the model into exaggerating the features and breaking identity. Final prompt (used here) is intentionally minimal: name the show + name the character + describe the pose + let the reference image do the rest.

```
Create a pencil-test study of Tommy Pickles from Rugrats.

CHARACTER: Same head shape, same hairs, same eyes, same shirt as the
character reference image. Holding his iconic purple-handled flathead
screwdriver raised in his right hand.

POSE: Standing in a determined stance with feet slightly apart. Right
hand raised holding the purple screwdriver up like a torch or sword
overhead. Left hand balled into a small fist at his side. Eyes wide with
mid-action curiosity-meets-courage. Slight forward lean. The pose of a
character who has decided that the playpen lock is the only thing between
him and the adventure, and he is about to do something about it.

[+ shared style block]
```

---

## 2 · ASH KETCHUM — `THE LONG GAMBIT`

**Output:** `./02-ash-ketchum.png`
**Lesson body:** chased the same goal for twenty years before he won. the journey is the artifact; the title is the byproduct.

```
Create a pencil-test study of Ash Ketchum from Pokémon (Indigo League /
Kanto-era, the original late-90s design).

CHARACTER: Ash Ketchum — 10-year-old boy, short messy black hair under
his iconic red and white baseball cap with the green half-Pokéball logo on
the front. Wearing his classic blue short-sleeve jacket with white
shoulders and yellow trim. Black t-shirt underneath. Blue jeans. Red and
white sneakers. Green fingerless gloves with black trim. Determined,
optimistic expression — wide eyes, slight smile of conviction.

POSE: Mid-stride walking forward. Right leg planted, left leg coming
forward with knee slightly bent. Gaze fixed ahead with determination —
looking past the viewer. Right hand extended outward holding a red-and-
white Pokéball, as if about to throw it. Left arm relaxed at his side or
slightly back for balance. Slight forward lean to suggest momentum.

ANIME NOTE: Render in pencil-test style but preserve the anime line
language of his face and proportions (large eyes, sharp hair silhouette,
slim build). The pencil treatment translates the anime aesthetic; it
doesn't replace it. The result should read as "an animator's pencil-test
sketch of an anime character," not as a Disney-Westernized version.

[+ shared style block]
```

---

## 3 · ROCKO — `THE OUTSIDER`

**Output:** `./03-rocko.png`
**Lesson body:** rocko didn't argue with modernity, he survived it. learn the system before you reform it.

```
Create a pencil-test study of Rocko from Rocko's Modern Life.

CHARACTER: Rocko — Joe Murray's wallaby. Light blue-violet/teal skin, cream-
white belly and inner ears, tall upright wallaby ears, big pink/peach
rounded snout, small black eyes, simple round body shape. Wearing his
iconic blue-and-purple Hawaiian shirt with palm tree pattern, no pants
(wallaby legs visible). Wide flat wallaby feet.

POSE: Standing alone with both arms hanging slightly slack at his sides.
Weight on one foot — slight uneven stance. Head tilted slightly to the
side as he looks around with mild bewilderment. Eyebrows raised in soft
confusion. Mouth in a small downturn. The slight shoulder slump of an
introvert braced for modernity. The pose of an immigrant wallaby observing
suburban life and not entirely understanding it but deciding to survive
it anyway.

[+ shared style block]
```

---

## 4 · SAMURAI JACK — `THE CODE` (break_grid)

**Output:** `./04-samurai-jack.png`
**Lesson body:** jack keeps the samurai code in a world of robots. the spec is the code; everything around it is noise.
**break_grid:** TRUE — this is the section's hero cel at 1.2× scale, spans 2 columns desktop. Per lesson #5 above, Jack was generated FIRST to validate the pipeline.

```
Create a pencil-test study of Samurai Jack (Genndy Tartakovsky's Samurai Jack).

CHARACTER: Samurai Jack — Japanese samurai, black hair pulled up into a
traditional topknot/chonmage, clean-shaven, geometric/angular facial
proportions in Tartakovsky's signature stylized design (sharp jaw, narrow
eyes, defined cheekbones). White kimono / gi with kimono sleeves, brown
or beige obi (waist sash), white hakama-style pants. Barefoot or in
traditional wooden geta sandals. Carrying his iconic katana.

POSE: Standing in a calm ready stance — feet planted shoulder-width apart,
weight evenly distributed. Right hand grips the katana, blade drawn and
held at a low diagonal across his body. Left hand poised — open palm down,
slightly extended. Eyes focused ahead, calm and unblinking. Mouth set in
a thin, neutral line — no expression of strain or aggression. The
discipline of a samurai who has been displaced in time but kept his code
intact. Classic Tartakovsky silhouette: geometric, austere, ready —
reducible to clean primitive shapes.

STYLE NOTE: Tartakovsky's character design language is itself almost
pencil-test-adjacent — geometric, minimal, gestural. Lean into this. The
pencil-test treatment should feel like it's REVEALING the construction
under his canonical design, not adding ornamentation. Keep the silhouette
clean and unmistakable from outline alone.

[+ shared style block]
```

---

## 5 · UNCLE IROH — `WISDOM IN RESTRAINT`

**Output:** `./05-uncle-iroh.png`
**Lesson body:** the most experienced person in the room is the one who speaks last. authority is the right not to use it.
**Post-mortem:** Replaced Bugs Bunny in slot 5 per Sean's call. Bugs read as a "composure under chaos" gag-cartoon lesson; Iroh carries the deeper PM truth — the person with the most authority and skill choosing not to use them. The lesson Sean actually wants in the canon. First generation landed clean using the minimal-prompt approach (lesson #1 above).

```
Create a pencil-test study of Uncle Iroh from Avatar: The Last Airbender.

CHARACTER: Uncle Iroh — older man, gray hair pulled into a small topknot,
long full gray beard, gentle face with kind half-lidded eyes, slight smile
at rest. Traditional Fire Nation-coded robes — red, brown, and gold layered
wrap garments with wide sleeves. Soft round build, the build of a man who
has retired from the war and chosen tea over conquest.

POSE: Standing calmly holding a small ceramic teacup in both hands at
chest height, as if offering it to the viewer. Slight forward lean of
warmth. Eyes half-lidded with the patience of someone who has nothing to
prove. Mouth set in a small knowing smile. Both feet planted, weight even.
The pose of the most powerful firebender in the room choosing, instead,
to make tea.

[+ shared style block]
```

---

## 6 · JAKE THE DOG — `SQUASH AND STRETCH`

**Output:** `./06-jake.png`
**Lesson body:** flexibility under constraint, without losing the character. the spec stretches; the thesis doesn't.
**Post-mortem:** Scripted generations kept missing the canonical "stretch arm" pose — Gemini drew Jake at default proportions instead. Sean landed the final via Google AI Studio with the same model + the same prompt (lesson #3 above). Scripted attempts are preserved in `06-jake-v1-backup.png`.

```
Create a pencil-test study of Jake the Dog from Adventure Time.

CHARACTER: Jake the Dog — yellow shapeshifting dog in Pendleton Ward's
simple round design language. Round body, short stubby legs, big black
oval eyes, small black dot for a nose, mouth as a single curved line. No
clothes. Yellow body color throughout.

POSE: Mid-stretch — his right arm has shapeshifted/stretched to be roughly
3 times longer than his body, reaching out and to the right to grab
something offscreen. The stretched arm tapers slightly. Body is slightly
squashed shorter as compensation for the stretched arm — the volume is
preserved (squash and stretch principle). Face is calm and unbothered,
eyes half-lidded with chill confidence, mouth in a slight knowing smile.
The pose of a dog who knows he can reshape for any moment — not straining,
just adapting.

STYLE NOTE: Adventure Time's design language is loose, gestural, slightly
wobbly — already pencil-test-adjacent. Lean into the looseness. The
stretch should feel like the animator drew it in one fluid gesture, not
like a rigid 3D model deforming.

[+ shared style block]
```

---

## Generation command (template, for future regens)

Run from the project root (absolute paths per lesson #2):

```bash
python3 /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py \
  "$(cat /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/about-cartoons/prompt-NN.txt)" \
  --output /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/about-cartoons/0N-<slug>.png \
  --aspect-ratio 3:4 \
  --reference /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png \
  --reference /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/about-cartoons/character-refs/<character>-N.jpg \
  --env-file /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/.env
```

---

## Post-generation (DONE 2026-05-21)

- ✅ All 6 PNGs validated — identity reads, pose fits the lesson, pencil-test style matches the anchor
- ✅ Backups preserved for the cels that took multiple iterations (Tommy, Rocko, Jake)
- ✅ Cream backgrounds accepted in v1 — the Astro CartoonCel component's white cel body (#FFFFFF per about-spec §11.3) is visually close enough to cream that the integration reads as intentional "soft warm cel" (per lesson #7 above)
- ⏳ `src/content/cartoons/0N-<slug>.md` frontmatter to be authored when src/ exists (Phase 2 scaffold) — draft lives in [`cartoons-content-collection-draft.md`](cartoons-content-collection-draft.md)
- ✅ about-spec §11.2 + §11.4 + §18 OPEN-3 + OPEN-4 updated in the 2026-05-21 spec sweep
