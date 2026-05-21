#!/usr/bin/env python3
"""Convert hero-icon source PNGs → WebP at quality=80, target ≤40KB each."""

import os
from PIL import Image

SRC_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/hero-icons"
OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/hero-icons"
os.makedirs(OUT_DIR, exist_ok=True)

ICONS = [
    "icon-1-loop.png",
    "icon-2-terminal.png",
    "icon-3-graph.png",
    "icon-4-pencil.png",
    "icon-5-sticky-note.png",
    "icon-6-matrix.png",
    "icon-7-claude.png",
    "icon-8-coffee.png",
]

total_kb = 0
for fname in ICONS:
    src = os.path.join(SRC_DIR, fname)
    if not os.path.exists(src):
        print(f"  SKIP (missing): {src}")
        continue
    img = Image.open(src).convert("RGBA")
    # Downscale if larger than 720px on the longest edge — the lane displays
    # at ~1024×576 max but the icons are framed inside; ~720px source is plenty.
    max_edge = 720
    w, h = img.size
    if max(w, h) > max_edge:
        scale = max_edge / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, fname.replace(".png", ".webp"))
    img.save(out, "WEBP", quality=80, method=6)
    size_kb = os.path.getsize(out) / 1024
    total_kb += size_kb
    print(f"  → {out}  ({size_kb:.1f} KB)")

print(f"Total: {total_kb:.1f} KB (budget: ≤320 KB)")
