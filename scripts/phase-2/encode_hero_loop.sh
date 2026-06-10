#!/usr/bin/env bash
#
# encode_hero_loop.sh — (re)encode the hero character-lane alpha videos.
#
# WHY THIS EXISTS
# ---------------
# iOS Safari (and macOS Safari) renders transparent <video> using the file's
# declared alpha mode. Apple's HEVC encoder (`hevc_videotoolbox`) ALWAYS tags
# the stream `AlphaChannelMode = PremultipliedAlpha`. If you feed it STRAIGHT
# (non-premultiplied) RGBA — i.e. transparent pixels still carrying the paper
# color — the data no longer matches the declaration. WebKit then composites
# `src.rgb + dst·(1−α)`, and a transparent pixel adds the leftover paper RGB
# on top of the page → it clamps to WHITE. That was the "white box on mobile"
# bug (the prior encode missed both `-alpha_quality` AND premultiplication).
#
# THE FIX: premultiply RGB by alpha BEFORE the HEVC encode, so transparent
# areas are truly (0,0,0,0). Verified via AVFoundation decode (the same path
# iOS uses): transparent corners decode to (0,0,0,0), character pixels intact.
#
# Chrome/Firefox/Android use the VP9 WebM, which uses STRAIGHT alpha — so the
# WebM is NOT premultiplied. Apple WebKit is the only consumer of the .mp4.
#
# REQUIREMENTS: macOS (hevc_videotoolbox is VideoToolbox-only) + ffmpeg 6+.
# Run from the repo root:  bash scripts/phase-2/encode_hero_loop.sh
#
# SOURCE OF TRUTH: the desktop VP9-alpha WebM is the canonical, validated loop
# (correct trim + 24fps timing). Every other asset is derived from it so the
# loop never drifts.
set -euo pipefail

DIR="public/assets/character"
SRC="$DIR/hero-loop-alpha.webm"   # canonical loop (VP9, straight alpha, 1280×720)

if [[ ! -f "$SRC" ]]; then
  echo "ERROR: missing canonical source $SRC (run from repo root)" >&2
  exit 1
fi

decode() { ffmpeg -y -hide_banner -loglevel error -c:v libvpx-vp9 -i "$SRC" -an "$@"; }

echo "→ desktop HEVC (premultiplied, 1280) → $DIR/hero-loop-alpha.mp4"
decode -vf "premultiply=inplace=1,format=rgba" \
  -c:v hevc_videotoolbox -alpha_quality 0.85 -q:v 46 -tag:v hvc1 -pix_fmt bgra \
  "$DIR/hero-loop-alpha.mp4"

echo "→ mobile HEVC (premultiplied, 720) → $DIR/hero-loop-alpha-mobile.mp4"
# premultiply FIRST so the downscale operates on premultiplied data (no edge
# fringing) and the result is already premultiplied for VideoToolbox.
decode -vf "premultiply=inplace=1,scale=720:-2:flags=lanczos,format=rgba" \
  -c:v hevc_videotoolbox -alpha_quality 0.85 -q:v 52 -tag:v hvc1 -pix_fmt bgra \
  "$DIR/hero-loop-alpha-mobile.mp4"

echo "→ mobile VP9 WebM (straight alpha, 720) → $DIR/hero-loop-alpha-mobile.webm"
decode -vf "scale=720:-2:flags=lanczos" \
  -c:v libvpx-vp9 -pix_fmt yuva420p -b:v 0 -crf 33 \
  "$DIR/hero-loop-alpha-mobile.webm"

echo "✓ done"
ls -lh "$DIR"/hero-loop-alpha*.{mp4,webm} | awk '{print "   "$5"\t"$NF}'
