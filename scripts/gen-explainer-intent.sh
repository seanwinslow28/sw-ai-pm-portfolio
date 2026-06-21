#!/usr/bin/env bash
#
# Generate the intent-engineering-mcp explainer pencil sheet — "Tighten the spec,
# watch the score." One style-consistent 2x2 graphite sheet holding four pieces
# (vague spec card | clean checklist card | wrong agent glyph | right agent glyph)
# that get cropped + keyed into four registered transparent webps. The cards
# cross-fade in place; the glyphs flip; the checkmarks + score are drawn LIVE in
# the component (not baked), so the art carries no readable text or numbers.
#
# Why this is a local script: it calls Google's image API
# (generativelanguage.googleapis.com), so it must run where the Gemini key lives.
# The raw PNG drops into the portfolio's mounted assets folder; the agent then
# crops + keys it (scripts/key-explainer-art.py --crop) and wires the component.
#
# Usage:  bash scripts/gen-explainer-intent.sh
#
set -euo pipefail

ANIMA="/Users/seanwinslow/Code-Brain/anima"
PORTFOLIO="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio"
SKILL="$ANIMA/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
OUT="$PORTFOLIO/public/assets/projects/explainers/intent-engineering-mcp-sheet-raw.png"

# The prompt is written to a temp file via a plain heredoc redirect (NOT inside a
# $(...) command substitution): macOS's bash 3.2 has a naive $() parser that
# miscounts unbalanced quotes/parens inside a heredoc body, so an apostrophe like
# "animator's" trips it. A file redirect sidesteps that entirely.
PROMPT_FILE="$(mktemp)"
trap 'rm -f "$PROMPT_FILE"' EXIT

cat > "$PROMPT_FILE" <<'EOF'
Create a single CONCEPT SHEET drawn as a traditional animation pencil test, showing FOUR separate small drawings floating on an empty background in a clean 2x2 arrangement (two on top, two on the bottom) with generous, even empty space between them. Each of the four drawings sits well within its own quadrant with clear empty margins all around it; NOTHING crosses the central horizontal or vertical gap. Do NOT draw any arrows, connectors, dividing lines, or grid lines between or around the four drawings — they float separately on blank space. All four drawings share the SAME hand, the SAME warm gray graphite pencil style, and a consistent scale.

TOP-LEFT — a "vague spec" note card: one single rounded-corner index card drawn in loose graphite, its surface covered in MESSY, illegible scribbles, wavy squiggly lines standing in for sloppy handwriting, a couple of crossed-out marks, and two or three large question marks. It must read as confused, unfinished, uncertain. Do NOT write any real words.

TOP-RIGHT — a "clean checklist" card: a card of the SAME size, shape, and position as the top-left one, but now neat and ORGANIZED. Inside it draw ONE SINGLE VERTICAL COLUMN of exactly NINE rows stacked directly one below another, each row spanning most of the card width. This is a single list of nine — do NOT use two columns, do NOT split into left and right halves. Each row has one small EMPTY square checkbox at the far left (leave every box empty, NO marks inside any box) followed by one long straight horizontal line to its right standing in for a tidy label. The nine rows are evenly spaced with a steady even vertical rhythm from top to bottom, filling the card. The card reads as structured and resolved. Do NOT draw any check marks inside the boxes, do NOT draw a score box, do NOT write any real words or numbers.

BOTTOM-LEFT — a "wrong output" glyph: a small, simple computer monitor / terminal window drawn in graphite, its screen showing BROKEN, wonky output — a tangled scribble, a crooked lopsided shape, and a small X. It reads as "built the wrong thing."

BOTTOM-RIGHT — a "right output" glyph: the SAME small monitor / terminal window at the SAME size and position as the bottom-left one, but its screen now showing CLEAN, tidy, well-aligned output — a few neat even horizontal lines and one single clear check mark. It reads as "built the right thing."

STYLE: Traditional animation pencil test drawing. Hand-drawn WARM GRAY graphite pencil lines (NOT black ink), natural stroke-weight variation, thicker on contour, thinner inside. Loose, fluid, gestural strokes with slight wobble, retraced strokes, and faint eraser-ghost construction marks, like a professional animator's hand. PURE GRAPHITE LINE WORK ONLY, no color fills, no solid shading.

BACKGROUND: plain flat off-white, perfectly clean, no paper grain, no border, no shadow, no scenery. Even soft lighting. Nothing but the graphite drawings on a clean light background so the line art reads clearly and can be cut out.

NEGATIVES: No color whatsoever. No solid black ink outlines, warm gray graphite only. Absolutely NO letters, NO words, NO numbers, NO readable text anywhere on the sheet. No check marks in the checklist boxes. No arrows, no connector arrows, no lines or dividers between or around the four drawings, no quadrant grid lines, no border frame around the whole sheet. No paper texture, no hole punches, no production label, no registration marks, no measurement grid, no ground shadow. No anime, no cel shading, no vector-clean lines, no digital painting, no gradients, no airbrush. Must look hand-drawn in graphite by a professional animator.
EOF

echo "Generating intent explainer sheet → $OUT"
python3 "$SKILL" "$(cat "$PROMPT_FILE")" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ANIMA/.env"

echo
echo "Done. Crop + key each quadrant, e.g.:"
echo "  python3 scripts/key-explainer-art.py \"$OUT\" public/assets/projects/explainers/intent-engineering-mcp-vague.webp     --crop X,Y,W,H"
echo "  ...repeat for checklist / agent-wrong / agent-right (re-run for another take — image gen varies)."
