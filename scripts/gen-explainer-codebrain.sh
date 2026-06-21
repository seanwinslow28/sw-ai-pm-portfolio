#!/usr/bin/env bash
#
# Generate the Code Brain "overnight loop" dial as a clean PENCIL-TEST sheet.
#
# Why regenerate (vs. reusing the original colored dial): the shipped
# code-brain.webp was never keyed to transparent — it carries a hard white card
# background + keying noise around the strokes, which reads as a sloppy box on the
# portfolio's cream paper. This regenerates the SAME composition as warm-graphite
# line art on a flat off-white field, so scripts/key-explainer-art.py can map it
# to a clean transparent WebP that composites on the real cream paper (exactly
# like the animation-pipeline run cycle). Color comes back as LIVE SVG/CSS in
# CodeBrainExplainer.astro (teal node glows + hand, the dawn amber wash/sun/08:30).
#
# It is reference-locked to the existing dial (`--reference code-brain.webp`) so
# the layout — ring, five icon-nodes, the asleep figure, moon, the two-critic
# fork, the dawn cluster, and the labels — stays put and the component geometry
# barely moves.
#
# Usage:  bash scripts/gen-explainer-codebrain.sh
# Then:   key it (no-trim, resize 1672x941) — see the rollout spec §2 / CHANGELOG.
#
set -euo pipefail

ANIMA="/Users/seanwinslow/Code-Brain/anima"
PORTFOLIO="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio"
SKILL="$ANIMA/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PY="$ANIMA/.venv/bin/python"; [ -x "$PY" ] || PY="python3"   # google-genai lives in the anima venv
REF="$PORTFOLIO/public/assets/projects/explainers/code-brain.webp"          # composition reference
OUT="$PORTFOLIO/public/assets/projects/explainers/code-brain-dial-raw.png"

PROMPT=$(cat <<'EOF'
Redraw the diagram in the reference image as a clean TRADITIONAL ANIMATION PENCIL-TEST line drawing. Keep the EXACT same composition, layout, elements, and text labels as the reference — change ONLY the rendering to hand-drawn graphite pencil and the background to a plain flat off-white field.

THE DIAGRAM (an "overnight loop" clock dial), matching the reference:
- A large circular clock-dial ring centered on the page, with small tick marks around its inside edge and arrowheads along the ring showing a clockwise flow.
- At the very top, just above the ring, a small simple figure asleep at a desk: head down on folded arms next to an open laptop, with three little "z z z" marks. The desk sits on a short shelf line.
- Five circular station nodes sit ON the ring, each holding one simple line-drawn icon, in clockwise order: a document/page (top), a camera (upper right), a brain (lower right), then two magnifying-glass nodes side by side at the bottom whose arrows fork downward and rejoin at a small solid dot, and a safe/vault with a combination dial (left).
- In the center of the dial: a crescent moon and a scattering of small four-point stars and little plus/cross marks — a night sky.
- At the lower-right, OUTSIDE the ring: a small rising sun with short rays, the time "08:30", and a small folded newspaper.
- Hand-printed UPPERCASE labels, spelled EXACTLY as in the reference and kept fully legible: "THE OVERNIGHT LOOP" (top-left corner), "NOTES IN - HUMAN ASLEEP" (right of the top node), "CAPTURE", "SYNTHESIZE", "CRITIC", "CRITIC", "VAULT", and "08:30".

STYLE: Traditional animation pencil test drawing. Hand-drawn WARM GRAY graphite pencil lines (NOT black ink), natural stroke-weight variation — heavier on outlines, lighter on interior detail — with a little hand wobble and a few retraced strokes so it reads as drawn by a real animator, not software. Pure graphite line work only. NO color fills.

BACKGROUND: plain flat off-white, perfectly clean and even. No paper grain, no border, no drop shadow, no scenery, no hole punches, no production label, no registration marks. Nothing but the graphite line drawing on a clean light field, so the art reads clearly and can be cleanly cut out to transparent.

NEGATIVES: No color whatsoever — the reference is colored, render it in warm gray graphite only and ignore its colors. No solid black ink outlines. No paper texture, no hole punches, no production label, no measurement grid, no extra text beyond the labels listed, no scenery, no drop shadows. No anime, no cel shading, no vector-clean lines, no digital painting, no gradients, no airbrush. Must look hand-drawn in graphite by a professional animator. Keep every label legible and spelled exactly as listed.
EOF
)

echo "Generating Code Brain dial → $OUT"
"$PY" "$SKILL" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --reference "$REF" \
  --env-file "$ANIMA/.env"

echo
echo "Done. Key it to transparent + resize to 1672x941, then re-derive code-brain-dial.webp."
echo "(re-run for another take — image gen varies; legible labels can take a few rolls.)"
