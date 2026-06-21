#!/usr/bin/env bash
#
# Generate the animation-pipeline explainer run-cycle pencil sheet.
#
# Why this is a local script: the cowork sandbox's network proxy can't reach
# Google's image API (generativelanguage.googleapis.com → 403), so the actual
# generation has to run on your machine where the Gemini key + API access live.
# The output drops into the portfolio's mounted assets folder, where the agent
# can pick it up to key/optimize/wire.
#
# Usage:  bash scripts/gen-explainer-runcycle.sh
#
set -euo pipefail

ANIMA="/Users/seanwinslow/Code-Brain/anima"
PORTFOLIO="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio"
SKILL="$ANIMA/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
OUT="$PORTFOLIO/public/assets/projects/explainers/animation-pipeline-runcycle-raw.png"

PROMPT=$(cat <<'EOF'
Create a RUN CYCLE pose study: one simple anonymous human figure shown in 7 progressive running poses arranged left to right in a single horizontal row, rendered as a traditional animation pencil test. Pure side profile, the figure running toward the right. Read left to right, the poses progress through one full running stride (contact, recoil/down, passing, push/up, next contact) so the row reads as one figure running across the page.

STYLE: Traditional animation pencil test drawing. Hand-drawn WARM GRAY graphite pencil lines (NOT black ink), natural stroke-weight variation, thicker on contour, thinner inside. Loose, fluid, gestural strokes like a professional animator's hand, with slight wobble, retraced strokes, and faint eraser-ghost construction marks. Show VISIBLE construction guide lines beneath the final drawing: a gesture line of action through the spine, a rough oval for the ribcage and the pelvis, and rough circles at the joints (shoulder, hip, knee, elbow). Construction marks are lighter than the final lines but clearly visible, showing the animator's process. PURE GRAPHITE LINE WORK ONLY, no color fills.

BACKGROUND: plain flat off-white, perfectly clean, no paper grain, no border, no shadow, no scenery. Even soft lighting. Nothing but the graphite figures on a clean light background so the line art reads clearly and can be cut out.

LAYOUT: 7 full-body figures in one horizontal row, evenly spaced with generous even gaps, all standing on the SAME ground line, identical scale and height across all 7.

CONSISTENCY: the SAME simple anonymous figure in every pose. Identical build and proportions, roughly 7 to 7.5 heads tall, slightly stylized and appealing, clean readable silhouette. Simple head with no facial detail, no hair detail, gender neutral, no distinguishing features, a simple athletic silhouette with no clothing detail. Only the running pose changes between the 7 figures.

NEGATIVES: No color whatsoever. No solid black ink outlines, warm gray graphite only. No paper texture, no hole punches, no production label, no registration marks, no measurement grid, no text, no numbers, no arrows, no scenery, no ground shadow. No anime, no cel shading, no vector-clean lines, no digital painting, no gradients, no airbrush. Must look hand-drawn in graphite by a professional animator.
EOF
)

echo "Generating run-cycle sheet → $OUT"
python3 "$SKILL" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ANIMA/.env"

echo
echo "Done. Tell the agent it's ready (or re-run for another take — image gen varies)."
