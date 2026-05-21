# `src/content/cartoons/` — content collection draft

> **Status:** Draft authored 2026-05-21 (Phase 0 prep). `src/` does not yet exist — Astro 5 scaffold is Phase 2. This file holds the 6 MDX frontmatter blocks so they can be copy-pasted into `src/content/cartoons/0N-<slug>.md` at scaffold time.
> **Spec reference:** [`docs/specs/about-spec-v1.md`](../../docs/specs/about-spec-v1.md) §11.6 (content collection schema) + §11.2 (locked canon).
> **Asset paths:** All `image:` fields point at `/assets/cartoons/0N-<slug>.png` — at scaffold time, copy the 6 PNGs from [`reference-images/about-cartoons/`](.) to `src/assets/cartoons/` (or `public/assets/cartoons/` depending on bundling choice in Phase 2 build).

---

## File 1 of 6 — `01-tommy-pickles.md`

```yaml
---
order: 1
name: TOMMY PICKLES
year_range: 1991–2004
studio: Klasky Csupo / Nickelodeon
image: /assets/cartoons/01-tommy-pickles.png
image_alt: pencil-test study of Tommy Pickles holding his purple-handled screwdriver overhead in a determined stance
lesson_noun: THE SCREWDRIVER
lesson_body: unlock the playpen first. the adventure is downstream.
angle: -1.1
break_grid: false
---
```

---

## File 2 of 6 — `02-ash-ketchum.md`

```yaml
---
order: 2
name: ASH KETCHUM
year_range: 1997–
studio: OLM / TV Tokyo
image: /assets/cartoons/02-ash-ketchum.png
image_alt: pencil-test study of Ash Ketchum mid-stride holding a Pokéball forward, in anime line language translated to pencil
lesson_noun: THE LONG GAMBIT
lesson_body: chased the same goal for twenty years before he won. the journey is the artifact; the title is the byproduct.
angle: 0.9
break_grid: false
---
```

---

## File 3 of 6 — `03-rocko.md`

```yaml
---
order: 3
name: ROCKO
year_range: 1993–96
studio: Joe Murray Productions / Nickelodeon
image: /assets/cartoons/03-rocko.png
image_alt: pencil-test study of Rocko the wallaby standing slightly slack-shouldered in his Hawaiian shirt, looking around in mild bewilderment
lesson_noun: THE OUTSIDER
lesson_body: rocko didn't argue with modernity, he survived it. learn the system before you reform it.
angle: -0.6
break_grid: false
---
```

---

## File 4 of 6 — `04-samurai-jack.md`  ⭐ break_grid

```yaml
---
order: 4
name: SAMURAI JACK
year_range: 2001–17
studio: Cartoon Network Studios (Genndy Tartakovsky)
image: /assets/cartoons/04-samurai-jack.png
image_alt: pencil-test study of Samurai Jack standing in a calm ready stance with his katana drawn at a low diagonal
lesson_noun: THE CODE
lesson_body: jack keeps the samurai code in a world of robots. the spec is the code; everything around it is noise.
angle: 0.0
break_grid: true
---
```

**Note:** `break_grid: true` per about-spec §11.3.1. Renders at 1.2× scale (336×384 instead of 280×320) and spans two grid columns on desktop. Mobile (single-column stack) treats it as a no-op. `angle: 0.0` keeps the break-grid cel visually anchored — the surrounding cels tilt around it.

---

## File 5 of 6 — `05-uncle-iroh.md`

```yaml
---
order: 5
name: UNCLE IROH
year_range: 2005–08
studio: Nickelodeon Animation Studio (Avatar: The Last Airbender)
image: /assets/cartoons/05-uncle-iroh.png
image_alt: pencil-test study of Uncle Iroh standing calmly holding a small ceramic teacup in both hands at chest height
lesson_noun: WISDOM IN RESTRAINT
lesson_body: the most experienced person in the room is the one who speaks last. authority is the right not to use it.
angle: 1.2
break_grid: false
---
```

---

## File 6 of 6 — `06-jake.md`

```yaml
---
order: 6
name: JAKE THE DOG
year_range: 2010–18
studio: Cartoon Network Studios (Pendleton Ward)
image: /assets/cartoons/06-jake.png
image_alt: pencil-test study of Jake the Dog with his right arm stretched roughly three times his body length, body squashed slightly to preserve volume
lesson_noun: SQUASH AND STRETCH
lesson_body: flexibility under constraint, without losing the character. the spec stretches; the thesis doesn't.
angle: -0.8
break_grid: false
---
```

---

## Notes for Phase 2 scaffold

1. **File names match `order:`** — about-spec §11.6 sorts via `getCollection('cartoons').sort(order)`. Filename digits are convenience for git-listing; the field is authoritative.
2. **MDX bodies are empty** — the caption (`lesson_noun` + `lesson_body`) fits in frontmatter alone; no overflow body is needed for any of the 6.
3. **The `angle:` values above** are hand-picked to give visual variety while keeping `04-samurai-jack` (the break-grid cel) at `0.0` — the cel that anchors the layout sits straight so the surrounding cels' tilt is felt against it. About-spec §11.3 allows omission (defaults to a stable random in ±1.5°); explicit values lock the layout for `git diff` clarity.
4. **`image:` paths assume the cartoons folder lives at `src/assets/cartoons/`** with Astro 5's `astro:assets` pipeline. If Phase 2 build chooses to keep them in `public/assets/cartoons/` instead (no transform), the paths still work as-is.
5. **Annotation (§11.7)** — the `← this one rewires you` curved arrow targets the Samurai Jack cel by Sean's call. Per about-spec §1.2 deferral table, annotations are **deferred to v2** — the v1 emphasis comes from the `break_grid: true` geometry alone. The annotation reappears in v1.1 if Sean reviews the live build and decides the section needs more character.
