#!/usr/bin/env python3
"""
Hero Issue B (D6) — normalize the 8 background-removed hero icons onto a
consistent transparent square canvas and export WebP for the full-viewport
loading overlay.

The overlay (hero-spec §2 AMENDMENT 2026-05-30) cycles these 8 frames centered
on a cream field, so every frame must occupy the SAME canvas size and be scaled
to the SAME content footprint — otherwise the icon visibly jumps between frames.

Source:  reference-images/hero-icons/background-removed/icon-*.png  (8 PNGs, RGBA)
Output:  public/assets/hero-icons/loading/icon-*.webp                (8 WebPs)

Run:  python3 scripts/phase-0/prep_hero_loading_icons.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC_DIR = ROOT / "reference-images" / "hero-icons" / "background-removed"
OUT_DIR = ROOT / "public" / "assets" / "hero-icons" / "loading"

CANVAS = 512           # square canvas edge (px)
CONTENT_FRAC = 0.72    # longest content edge occupies this fraction of the canvas
WEBP_QUALITY = 90

ICONS = [
    "icon-1-loop",
    "icon-2-terminal",
    "icon-3-graph",
    "icon-4-pencil",
    "icon-5-sticky-note",
    "icon-6-matrix",
    "icon-7-claude",
    "icon-8-coffee",
]


def normalize(src_path: Path, out_path: Path) -> None:
    im = Image.open(src_path).convert("RGBA")

    # Trim fully-transparent margins so every icon is scaled by its real content.
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)

    # Scale the content so its longest edge == CONTENT_FRAC * CANVAS.
    target = int(CANVAS * CONTENT_FRAC)
    w, h = im.size
    scale = target / max(w, h)
    new_w, new_h = max(1, round(w * scale)), max(1, round(h * scale))
    im = im.resize((new_w, new_h), Image.LANCZOS)

    # Center on a transparent square canvas.
    canvas = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    canvas.paste(im, ((CANVAS - new_w) // 2, (CANVAS - new_h) // 2), im)

    canvas.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total = 0
    for name in ICONS:
        src = SRC_DIR / f"{name}.png"
        if not src.exists():
            raise SystemExit(f"missing source: {src}")
        out = OUT_DIR / f"{name}.webp"
        normalize(src, out)
        kb = out.stat().st_size / 1024
        total += out.stat().st_size
        print(f"  {name}.webp  {kb:6.1f} KB  ({CANVAS}x{CANVAS})")
    print(f"\ndone. 8 icons normalized to {CANVAS}x{CANVAS} → {OUT_DIR.relative_to(ROOT)}  ({total/1024:.0f} KB total)")


if __name__ == "__main__":
    main()
