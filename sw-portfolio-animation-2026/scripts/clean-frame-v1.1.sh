#!/usr/bin/env bash
# clean-frame.sh — run Nano Banana 2 cleanup on a single raw frame.
# Usage: ./clean-frame.sh <raw_frame_path> <output_path>

set -euo pipefail

RAW="${1:?usage: clean-frame.sh <raw_frame_path> <output_path>}"
OUT="${2:?usage: clean-frame.sh <raw_frame_path> <output_path>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026"
SCRIPT="/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PROMPT_FILE="${ANIM_DIR}/scripts/cleanup-prompt.txt"
ENV_FILE="${ANIM_DIR}/.env"
LOG="${ANIM_DIR}/cleanup-log.txt"

ANCHOR_1="${ANIM_DIR}/anchor-1.png"
ANCHOR_2="${ANIM_DIR}/anchor-2.png"
TURNAROUND="${ANIM_DIR}/ai-companion-turnaround-anchor.png"

PROMPT="$(cat "$PROMPT_FILE")"

mkdir -p "$(dirname "$OUT")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLEAN $RAW -> $OUT" | tee -a "$LOG"

python3 "$SCRIPT" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ENV_FILE" \
  --reference "$ANCHOR_1" "$ANCHOR_2" "$TURNAROUND" "$RAW" \
  2>&1 | tee -a "$LOG"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE  $OUT" | tee -a "$LOG"
