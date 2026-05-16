#!/usr/bin/env bash
# clean-frame-v2a.sh — minimal denoise pass. Single reference (raw only).
# Usage: ./clean-frame-v2a.sh <raw_frame_path> <output_path>

set -euo pipefail

RAW="${1:?usage: clean-frame-v2a.sh <raw_frame_path> <output_path>}"
OUT="${2:?usage: clean-frame-v2a.sh <raw_frame_path> <output_path>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/BMAD/sw-portfolio-3/sw-portfolio-animation-2026"
SCRIPT="/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PROMPT_FILE="${ANIM_DIR}/scripts/cleanup-prompt-v2a.txt"
ENV_FILE="${ANIM_DIR}/.env"
LOG="${ANIM_DIR}/cleanup-log.txt"

PROMPT="$(cat "$PROMPT_FILE")"

mkdir -p "$(dirname "$OUT")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLEAN(v2a) $RAW -> $OUT" | tee -a "$LOG"

python3 "$SCRIPT" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ENV_FILE" \
  --reference "$RAW" \
  2>&1 | tee -a "$LOG"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE(v2a)  $OUT" | tee -a "$LOG"
