#!/usr/bin/env python3
"""
S3 tile integration — optimize the 5 re-authored project tiles to the
ProjectTile 4:5 portrait spec (projects-section-spec-v1.md §6: 400×500 @2x =
800×1000) and export WebP for /public.

The source PNGs are already 1122×1402 (exactly 4:5), so no crop is needed —
just a high-quality LANCZOS downscale to 800×1000 + WebP encode. Keeps the PNG
sources under assets/projects-tiles/ untouched.

Source:  assets/projects-tiles/A-{1..5}_*.png   (5 PNGs, 1122×1402, 4:5)
Output:  public/assets/projects/<slug>.webp        (overwrites the 5/24 set)

Run:  python3 scripts/phase-0/prep_project_tiles.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
SRC_DIR = ROOT / "assets" / "projects-tiles"
OUT_DIR = ROOT / "public" / "assets" / "projects"

OUT_W, OUT_H = 800, 1000   # 4:5 portrait @2x of the 400×500 tile
WEBP_QUALITY = 82

# source filename → published slug (display titles Anima/16BitFit; slugs unchanged)
TILES = {
    "A-1_Anima.png": "animation-pipeline",
    "A-2_Code-Brain.png": "code-brain",
    "A-3_Intent-Engineering-MCP.png": "intent-engineering-mcp",
    "A-4_The-Block.png": "the-block",
    "A-5_16BitFit.png": "16bitfit",
}


def optimize(src_path: Path, out_path: Path) -> None:
    im = Image.open(src_path).convert("RGB")

    # Guard the 4:5 assumption — center-crop to 4:5 if a source ever drifts.
    w, h = im.size
    target_ratio = OUT_W / OUT_H
    ratio = w / h
    if abs(ratio - target_ratio) > 0.005:
        if ratio > target_ratio:  # too wide → crop width
            new_w = round(h * target_ratio)
            left = (w - new_w) // 2
            im = im.crop((left, 0, left + new_w, h))
        else:                     # too tall → crop height
            new_h = round(w / target_ratio)
            top = (h - new_h) // 2
            im = im.crop((0, top, w, top + new_h))

    im = im.resize((OUT_W, OUT_H), Image.LANCZOS)
    im.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    total = 0
    for fname, slug in TILES.items():
        src = SRC_DIR / fname
        if not src.exists():
            raise SystemExit(f"missing source: {src}")
        out = OUT_DIR / f"{slug}.webp"
        optimize(src, out)
        kb = out.stat().st_size / 1024
        total += out.stat().st_size
        print(f"  {fname:34s} → {slug}.webp  {kb:6.1f} KB  ({OUT_W}x{OUT_H})")
    print(f"\ndone. 5 tiles → {OUT_DIR.relative_to(ROOT)}  ({total/1024:.0f} KB total)")


if __name__ == "__main__":
    main()
