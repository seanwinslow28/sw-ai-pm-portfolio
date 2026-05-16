#!/usr/bin/env bash
# clean-frame-solo.sh — run Nano Banana 2 cleanup on a single SEAN-SOLO raw frame.
# Uses 2 references (raw + anchor-1) and the solo prompt. No companion turnaround.
# Usage: ./clean-frame-solo.sh <raw_frame_path> <output_path>

set -euo pipefail

RAW="${1:?usage: clean-frame-solo.sh <raw_frame_path> <output_path>}"
OUT="${2:?usage: clean-frame-solo.sh <raw_frame_path> <output_path>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/BMAD/sw-portfolio-3/sw-portfolio-animation-2026"
SCRIPT="/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PROMPT_FILE="${ANIM_DIR}/scripts/cleanup-prompt-solo.txt"
ENV_FILE="${ANIM_DIR}/.env"
LOG="${ANIM_DIR}/cleanup-log.txt"

ANCHOR_1="${ANIM_DIR}/anchor-1.png"

PROMPT="$(cat "$PROMPT_FILE")"

mkdir -p "$(dirname "$OUT")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLEAN(solo) $RAW -> $OUT" | tee -a "$LOG"

python3 "$SCRIPT" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ENV_FILE" \
  --reference "$RAW" "$ANCHOR_1" \
  2>&1 | tee -a "$LOG"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE(solo)  $OUT" | tee -a "$LOG"
