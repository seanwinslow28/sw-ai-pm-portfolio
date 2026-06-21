#!/usr/bin/env bash
#
# Generate the 16BitFit interactive-explainer sprite sheet — one consistent pixel
# fighter throwing a straight punch, as a 6-phase PUNCH cycle, on the Game Boy DMG
# 4-green palette. This is the PIXEL skill (gemini-pixel-image-gen), NOT the pencil
# skill: pixel art stays opaque, so there is NO key-explainer-art.py luminance pass.
#
# Why per-frame: a single 6-in-a-row generation kept crowding the punch (the
# extended fist bled into the next frame and got clipped) and stayed guard-heavy.
# So each pose is generated on its OWN centered frame, identity locked to a COCKED
# anchor via --reference, then assembled into an even, well-spaced strip with cell
# widths we control (normalize_16bitfit_sheet.py). Hot pink (#FF00FF) is a chroma
# key the normalize step removes so the fighter composites onto the LCD. Image gen
# varies — re-run for another take; commit the one you like (the committed sheet +
# -raw.png are the approved take).
#
# Pipeline:
#   1. generate 1_cocked (anchor), then 2_mid + 3_ext with --reference 1_cocked
#         -> scratch/16bitfit-frames/{1_cocked,2_mid,3_ext}.png  (one fighter each)
#   2. normalize --frames-dir -> 16bitfit-fighter-sheet.png  (3 even cells, DMG-quantized)
#   The explainer loop plays the 3 cells out-and-back (cocked->mid->extended->mid).
#
# Usage:  bash scripts/gen-explainer-16bitfit.sh [--normalize-only]
#
set -euo pipefail

ANIMA="/Users/seanwinslow/Code-Brain/anima"
PORTFOLIO="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio"
GEN="$PORTFOLIO/.claude/skills/gemini-pixel-image-gen/scripts/generate_image.py"
NORMALIZE="$PORTFOLIO/scripts/normalize_16bitfit_sheet.py"
ASSETS="$PORTFOLIO/public/assets/projects/explainers"
FRAMES="$PORTFOLIO/scratch/16bitfit-frames"
SHEET="$ASSETS/16bitfit-fighter-sheet.png"

# Pick a python that has google-genai + Pillow (override with PYTHON=...).
PYTHON="${PYTHON:-/usr/bin/python3}"

# ── shared prompt blocks ────────────────────────────────────────────────────
STYLE="16-bit pixel art in the Game Boy DMG monochrome aesthetic. Render the fighter using only the three darker Game Boy greens — #8BAC0F (light, highlights), #306230 (mid tone), #0F380F (darkest, the 1-2px outlines and deepest shadow). Do NOT use the lightest green on the fighter; the lightest tone is reserved for the screen background. Bold #0F380F outlines, flat cel colors with optional dithering for shading, crisp hard pixel edges, top-front lighting. Flat side view, the fighter facing right. The fighter is a lean, athletic original martial artist in a simple tank top and shorts, with a clean, readable silhouette — a generic fitness fighter that does not resemble any specific existing or copyrighted video-game character."

FRAMING="Show ONE single full-body fighter, one character only, centered in the frame with clear empty margin on all four sides so the entire body and the fully extended punching arm stay completely inside the frame with room to spare. The background is solid hot pink (#FF00FF) filling the entire frame behind the fighter and nothing else. No anti-aliasing. No gradients. No blur. No glow. No text, no numbers, no UI, no health bars, no logos, no ground shadow, no scenery, no border, no second character. Flat side view, NOT isometric, no perspective tilt."

# 6 progressive stages of ONE straight punch. The KEY difference between frames is
# the LEAD-FIST POSITION (cocked -> mid -> extended); everything else holds. Three
# poses is the model's reliable ceiling for ONE character — it gives cocked, a
# half-extension, and full lockout, and collapses finer in-betweens (the exact
# consistency gap Anima exists to close). The explainer loop plays these out-and-
# back (cocked -> mid -> extended -> mid) so 3 cells read as a full jab.
POSE_COCKED="The lead fist is held back BESIDE THE CHIN with the elbow fully bent — the arm is fully cocked and NOT extended, a tight ready stance about to fire a straight punch. The fist is up by the face, not out in front."
POSE_MID="The lead arm is about HALF extended, the fist pushed out to roughly midway between the chin and full reach, the elbow partly bent — the straight punch caught mid-travel, not cocked and not yet locked out."
POSE_EXT="The lead arm is 100 percent straight and FULLY EXTENDED forward at maximum reach, the elbow locked, the fist as far out in front as it can go, hips and shoulder turned into the strike — peak impact. Keep the whole extended arm inside the frame with empty space beyond the fist."

SAME="This is the SAME fighter as the reference image: identical face, build, proportions, outfit, stance, and the exact same green palette. The ONLY thing that changes from the reference is the position of the lead fist and arm, described next — place the lead fist exactly where described and keep everything else matched to the reference."

gen() { # $1=output  $2=pose  $3(optional)=reference
  local out="$1" pose="$2" ref="${3:-}"
  local prompt="Create a single pixel art sprite frame of a fighting-game character. ${pose} ${STYLE} ${FRAMING}"
  if [ -n "$ref" ]; then
    prompt="Create a single pixel art sprite frame of a fighting-game character. ${SAME} ${pose} ${STYLE} ${FRAMING}"
    "$PYTHON" "$GEN" "$prompt" --output "$out" --aspect-ratio 1:1 --env-file "$ANIMA/.env" --reference "$ref"
  else
    "$PYTHON" "$GEN" "$prompt" --output "$out" --aspect-ratio 1:1 --env-file "$ANIMA/.env"
  fi
}

if [ "${1:-}" != "--normalize-only" ]; then
  rm -rf "$FRAMES"; mkdir -p "$FRAMES"
  echo "[1/2] Generating 3 jab poses (frame 1 = COCKED identity anchor) → $FRAMES"
  gen "$FRAMES/1_cocked.png" "$POSE_COCKED"
  gen "$FRAMES/2_mid.png"    "$POSE_MID" "$FRAMES/1_cocked.png"
  gen "$FRAMES/3_ext.png"    "$POSE_EXT" "$FRAMES/1_cocked.png"
fi

echo
echo "[2/2] Assembling + normalizing → $SHEET  (cells: cocked, mid, extended)"
"$PYTHON" "$NORMALIZE" --frames-dir "$FRAMES" --output "$SHEET" --cell-height 104

echo
echo "Done. Committed sheet: $SHEET (per-frame sources in $FRAMES are intermediate)."
echo "No keying pass — pixel art stays opaque (see header)."
