#!/usr/bin/env bash
# clean-batch-solo.sh — clean a numeric range of raw frames using the SOLO wrapper
# (2 references, no companion turnaround, solo prompt).
# Usage: ./clean-batch-solo.sh <raw_dir> <out_dir> <start_num> <end_num>

set -euo pipefail

RAW_DIR="${1:?usage: clean-batch-solo.sh <raw_dir> <out_dir> <start_num> <end_num>}"
OUT_DIR="${2:?usage: clean-batch-solo.sh <raw_dir> <out_dir> <start_num> <end_num>}"
START="${3:?usage: clean-batch-solo.sh <raw_dir> <out_dir> <start_num> <end_num>}"
END="${4:?usage: clean-batch-solo.sh <raw_dir> <out_dir> <start_num> <end_num>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026"
CLEAN="${ANIM_DIR}/scripts/clean-frame-solo.sh"
LOG="${ANIM_DIR}/cleanup-log.txt"

mkdir -p "$OUT_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] BATCH(solo) $RAW_DIR frames $START..$END" | tee -a "$LOG"

processed=0
skipped=0
for raw in "$RAW_DIR"/frame_*.png; do
  name="$(basename "$raw")"
  num=$(echo "$name" | sed -E 's/frame_0*([0-9]+)\.png/\1/')
  if (( num < START || num > END )); then continue; fi
  out="$OUT_DIR/$name"
  if [[ -f "$out" ]]; then
    echo "  SKIP existing $out" | tee -a "$LOG"
    skipped=$((skipped+1))
    continue
  fi
  "$CLEAN" "$raw" "$out"
  processed=$((processed+1))
done

echo "[$(date '+%Y-%m-%d %H:%M:%S')] BATCH(solo) DONE processed=$processed skipped=$skipped" | tee -a "$LOG"
