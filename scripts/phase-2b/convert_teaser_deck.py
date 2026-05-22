#!/usr/bin/env python3
"""Convert teaser-deck source PNGs → WebP at quality=80.

Per home-about-teaser-spec §7.1:
- Card 1 (photo): ≤220KB (more tonal range)
- Cards 2-10: ≤180KB each
- Total deck: ≤1.9MB
"""

import os
from PIL import Image

SRC_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/teaser-deck"
OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/teaser-deck"
os.makedirs(OUT_DIR, exist_ok=True)

CARDS = [
    "01-photo.png",
    "02-pencil-test.png",
    "03-watercolor-ink.png",
    "04-bobs-burgers.png",
    "05-shonen-anime.png",
    "06-classic-nicktoons.png",
    "07-cn-noodle.png",
    "08-comic-allred.png",
    "09-modern-cn.png",
    "10-pop-art-comic.png",
]

# Card 1 (photo) gets a more generous budget per spec
PHOTO_BUDGET_KB = 220
STYLIZED_BUDGET_KB = 180

# Downscale to 960px on the long edge — the spec calls for cards at
# 320×427 max (desktop) so 960px source preserves headroom for retina.
MAX_EDGE = 960

total_kb = 0
for fname in CARDS:
    src = os.path.join(SRC_DIR, fname)
    if not os.path.exists(src):
        print(f"  SKIP (missing): {src}")
        continue

    img = Image.open(src).convert("RGB")
    w, h = img.size
    if max(w, h) > MAX_EDGE:
        scale = MAX_EDGE / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)

    out = os.path.join(OUT_DIR, fname.replace(".png", ".webp"))

    # Try quality=80 first; if over budget, step down in 5-point increments
    is_photo = fname.startswith("01-")
    budget = PHOTO_BUDGET_KB if is_photo else STYLIZED_BUDGET_KB

    for quality in (80, 75, 70, 65, 60):
        img.save(out, "WEBP", quality=quality, method=6)
        size_kb = os.path.getsize(out) / 1024
        if size_kb <= budget:
            break

    total_kb += size_kb
    flag = "" if size_kb <= budget else "  ⚠ OVER BUDGET"
    print(f"  → {out}  ({size_kb:.1f} KB / budget {budget} KB, quality={quality}){flag}")

print(f"\nTotal: {total_kb:.1f} KB (budget: ≤1900 KB / 1.9MB)")
if total_kb > 1900:
    print("⚠ TOTAL OVER BUDGET — rerun with lower max_edge or stricter quality")
