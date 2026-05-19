#!/usr/bin/env bash
# clean-frame-v2b.sh — minimal denoise + Sean turnaround as identity guide.
# Reference order: raw FIRST (the canvas), turnaround SECOND (identity guide).
# Usage: ./clean-frame-v2b.sh <raw_frame_path> <output_path>

set -euo pipefail

RAW="${1:?usage: clean-frame-v2b.sh <raw_frame_path> <output_path>}"
OUT="${2:?usage: clean-frame-v2b.sh <raw_frame_path> <output_path>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026"
SCRIPT="/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PROMPT_FILE="${ANIM_DIR}/scripts/cleanup-prompt-v2b.txt"
ENV_FILE="${ANIM_DIR}/.env"
LOG="${ANIM_DIR}/cleanup-log.txt"

SEAN_TURNAROUND="${ANIM_DIR}/anchor-images/sean-character-turnaround-A-3.png"

PROMPT="$(cat "$PROMPT_FILE")"

mkdir -p "$(dirname "$OUT")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLEAN(v2b) $RAW -> $OUT" | tee -a "$LOG"

python3 "$SCRIPT" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ENV_FILE" \
  --reference "$RAW" "$SEAN_TURNAROUND" \
  2>&1 | tee -a "$LOG"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE(v2b)  $OUT" | tee -a "$LOG"
