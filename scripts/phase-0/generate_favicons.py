#!/usr/bin/env python3
"""
Generate the favicon raster set for sw-ai-pm-portfolio Phase 0.

Outputs:
  reference-images/favicon/favicon.svg       (hand-authored; the source of truth)
  reference-images/favicon/favicon.ico       (16x16 + 32x32 + 48x48 multi-resolution)
  reference-images/favicon/apple-touch-icon.png  (180x180)

Design:
- "SW" in JetBrains Mono (700) — site-chrome §16 OPEN-1 default, LOCKED 2026-05-21
- Teal #0A3E42 on warm paper #FFF9F0
- iOS rounded-corner mask applied by iOS at render time; we leave the
  apple-touch-icon as a square paper background with the wordmark centered
  + slight inset (per Apple's HIG, ~14% padding from edges)
"""

import os
from PIL import Image, ImageDraw, ImageFont

FONT_DIR = "/tmp/og-fonts"
MONO = os.path.join(FONT_DIR, "jetbrains-mono.ttf")

OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/favicon"
os.makedirs(OUT_DIR, exist_ok=True)

PAPER = (255, 249, 240)   # #FFF9F0
TEAL = (10, 62, 66)        # #0A3E42


def load_mono_bold(size):
    f = ImageFont.truetype(MONO, size=size)
    try:
        axes = f.get_variation_axes()
        weights = [a.get("default", 400) for a in axes]
        for i, a in enumerate(axes):
            name = a.get("name", "").lower() if isinstance(a.get("name"), str) else ""
            if "weight" in name or "wght" in name:
                weights[i] = 700
        f.set_variation_by_axes(weights)
    except Exception:
        pass
    return f


def render_sw(size, *, font_ratio=0.62, bg=PAPER, fg=TEAL):
    """Render 'SW' centered on a square paper background at `size`x`size`."""
    img = Image.new("RGB", (size, size), bg)
    d = ImageDraw.Draw(img)

    # Pick the largest font size that still fits horizontally with ~6% side padding
    target_text_w = size * (1 - 0.12)  # 6% on each side
    font_size = int(size * font_ratio)
    f = load_mono_bold(font_size)
    # Iteratively shrink if too wide
    text = "SW"
    while font_size > 6:
        bbox = d.textbbox((0, 0), text, font=f)
        tw = bbox[2] - bbox[0]
        if tw <= target_text_w:
            break
        font_size -= 1
        f = load_mono_bold(font_size)

    bbox = d.textbbox((0, 0), text, font=f)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    # Center using bbox top offset to handle font metrics
    x = (size - tw) // 2 - bbox[0]
    y = (size - th) // 2 - bbox[1]
    d.text((x, y), text, font=f, fill=fg)
    return img


def save_ico(out_path):
    """Save a multi-resolution ICO containing 16, 32, 48 px renders."""
    icons = [render_sw(s) for s in (16, 32, 48)]
    icons[0].save(
        out_path,
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=icons[1:],
    )
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  → {out_path}  ({size_kb:.1f} KB)")


def save_apple_touch(out_path):
    """180x180 PNG. iOS will round corners and may add a 1px stroke; we leave it square."""
    img = render_sw(180, font_ratio=0.58)
    img.save(out_path, "PNG", optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  → {out_path}  ({size_kb:.1f} KB)")


def save_png_previews():
    """Save standalone 16/32/48 previews for inspection (not shipped — the ICO is)."""
    for s in (16, 32, 48):
        img = render_sw(s)
        path = os.path.join(OUT_DIR, f"favicon-{s}.png")
        img.save(path, "PNG", optimize=True)
        size_b = os.path.getsize(path)
        print(f"  → {path}  ({size_b} bytes)")


if __name__ == "__main__":
    print("Generating favicon raster set...")
    save_ico(os.path.join(OUT_DIR, "favicon.ico"))
    save_apple_touch(os.path.join(OUT_DIR, "apple-touch-icon.png"))
    print("  (inspection previews — not shipped, the ICO is the production file)")
    save_png_previews()
    print("Done.")
