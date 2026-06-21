# GitHub Profile README — Banner Prompts

Prompts for the README header banner. Concept: a pencil-test "exposure sheet" where Sean holds three hero keyframes (01 / 05 / 09) while tiny agent sprites draw the in-between frames — the pencil-test medium + "agents handle the loops, I handle the taste" thesis in one image.

**Before pasting either prompt:**
- Attach the A-2 character art (`sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png`) as the reference/upload so it locks the likeness.
- Set output to wide landscape (Nano Banana → 21:9; ChatGPT → 16:9).
- The small handwritten frame numbers and the "A-1" label are intentional pencil-test texture. Do not bake the name or tagline into the art — those live as README markdown text.
- Croppability is required: the prompts keep all key elements in the central horizontal band so the image can be cropped to a wide banner strip.

---

## Prompt A — Nano Banana 2 (gemini-pencil-animation)

```
Create a traditional animation pencil-test "exposure sheet": one wide sheet of warm cream animation paper showing a short keyframe sequence of the SAME man (use the attached reference for his likeness) holding three hero poses, while tiny animator-assistant robots draw the in-between frames.

STYLE CLUSTER — PENCIL ANIMATION:
Hand-drawn graphite pencil on warm cream animation paper. Lines are warm gray (NOT black) with natural stroke-weight variation — thicker contours, thinner interior details. Visible construction-line artifacts beneath the drawing. Subtle cross-hatching for shading; fluid, gestural, professional-animator strokes. Color: extremely limited, desaturated flat fills layered OVER the pencil so the lines show through — dark navy shirt, cool gray jeans, warm skin, muted sandy-blonde hair. Paper: warm cream (#FAF5E8) with visible grain and aging specks, three hole-punch marks along the bottom edge, a hand-drawn circled "A-1" label top-left. Proportions slightly stylized, Disney/Pixar pre-production adjacent, ~7 heads tall, clean silhouette. NOT anime, NOT exaggerated cartoon.

LAYOUT: Lay the sheet out left-to-right like a film exposure strip with THREE hero keyframes of the man, each lightly boxed with a small handwritten frame number:
- "01" (left): standing relaxed, stylus down at his side.
- "05" (center): mid-gesture, lifting the stylus, looking up, focused.
- "09" (right): confident, pointing the stylus forward — a "that's the one" beat.
BETWEEN the hero frames, draw smaller, lighter, half-finished in-between sketch frames, and place 3–4 tiny friendly robot assistant characters (simple boxy little helpers — one a small terracotta box-shaped creature) actively DRAWING those in-between frames: holding tiny pencils, leaning over the frames, construction lines and eraser dust around them. The robots clearly fill the in-betweens while the man holds the hero poses.

CONSISTENCY: The man is the SAME person in all three hero frames (identical hair, face, build, outfit) — only his pose changes. Stylus stays in his RIGHT hand every frame. Consistent pencil weight and paper texture across the whole sheet.

CROPPABILITY: Keep all key elements (the three hero keyframes and the robots) inside the central horizontal band. Leave the top and bottom margins as mostly plain cream paper, so the sheet can be cropped into a wide banner strip without cutting off any character, robot, or frame.

OUTPUT: One cohesive wide animation-paper sheet that looks like a scanned page from a professional animator's sketchbook. Do NOT render any title, name, caption, watermark, or large lettering — only the small handwritten frame numbers and the "A-1" label. NEGATIVES: No vector-clean lines. No solid black outlines. No cel shading. No anime. No heavy saturation. No digital-painting or 3D-render look. No pure white background.
```

---

## Prompt B — ChatGPT / gpt-image-2

```
Create a wide illustration in the unmistakable style of a traditional, hand-drawn animation pencil test — graphite on warm cream animation paper. Hand-drawn medium, NOT digital-flat, NOT photorealistic, NOT 3D.

Use the attached photo ONLY for the man's likeness (sandy-blonde hair, navy t-shirt, gray jeans). Render him as a hand-drawn pencil character, slightly stylized (Disney/Pixar pre-production feel, ~7 heads tall).

SCENE: A single sheet of cream animation paper laid out left-to-right like a film exposure strip, showing the SAME man in THREE hero keyframes, each lightly boxed with a small handwritten frame number:
- Left "01": standing relaxed, stylus held down in his right hand.
- Center "05": mid-gesture, lifting the stylus, focused.
- Right "09": confident, pointing the stylus forward.
BETWEEN the hero frames, draw smaller, lighter, half-finished in-between sketch frames, and 3–4 tiny friendly robot assistant characters (simple boxy helpers, one a small terracotta box-creature) actively drawing those in-between frames with tiny pencils — they fill the in-betweens while the man holds the hero poses.

STYLE: Warm gray graphite lines (never black ink), natural stroke-weight variation, visible construction lines under the drawing, light cross-hatching, extremely muted/desaturated flat color fills with the pencil showing through. Warm cream paper grain, three hole-punch marks along the bottom edge, a small hand-drawn circled "A-1" label top-left.

CONSISTENCY: The man is clearly the same person in all three hero frames; only his pose changes; stylus always in his right hand.

CROPPABILITY: Keep the three hero frames and the robots within the central horizontal band; leave plain cream paper in the top and bottom margins so it can be cropped to a wide banner without losing anything.

This must look hand-drawn on real paper by a professional animator — NOT digital-flat, NOT photorealistic, NOT a 3D render. Do NOT render any title, name, caption, watermark, or large text — only the small handwritten frame numbers and the "A-1" label. Wide landscape orientation, 16:9.
```

---

## Outcomes (2026-06-20)

Both generated successfully (stored in `docs/superpowers/images/`):
- `github-hero-chatgpt-16x9.png` — richer aged-paper texture; more visible agent activity (more box-creatures actively drawing); 16:9, so needs more vertical cropping to become a banner strip.
- `github-hero-nb2-21x9.png` — banner-native 21:9 (minimal cropping); strongest, most consistent likeness including the in-betweens; cleaner read at small banner size.

**Recommendation: the Nano Banana 21:9** — banner-native aspect (the croppability requirement), best likeness (the load-bearing character), and cleanest legibility when shrunk to a profile-top strip. The README text already carries the agent-fleet story, so the banner's main job is "unmistakably him, in pencil-test, wide."
