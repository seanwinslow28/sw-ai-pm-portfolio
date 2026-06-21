#!/usr/bin/env python3
"""
Pixel Art Sprite Post-Processing Pipeline

Processes Gemini-generated pixel art images:
1. Chroma key removal (#FF00FF -> transparent)
2. Auto-crop to content bounding box
3. Color quantization to limited palette
4. Nearest-neighbor resize to target dimensions

Usage:
    python3 process_sprite.py --input raw.png --output processed.png --target-size 16x32
    python3 process_sprite.py --input raw.png --output processed.png --chroma-key FF00FF --quantize 16

Requires:
    pip install Pillow
"""

import argparse
import sys
from pathlib import Path

from PIL import Image


def hex_to_rgb(hex_str: str) -> tuple:
    """Convert hex color string to RGB tuple."""
    hex_str = hex_str.lstrip("#")
    return tuple(int(hex_str[i : i + 2], 16) for i in (0, 2, 4))


def color_distance(c1: tuple, c2: tuple) -> float:
    """Euclidean distance between two RGB tuples."""
    return sum((a - b) ** 2 for a, b in zip(c1, c2)) ** 0.5


def chroma_key_remove(img: Image.Image, key_color: tuple, tolerance: int = 30) -> Image.Image:
    """Replace chroma key color with transparent alpha."""
    img = img.convert("RGBA")
    pixels = img.load()
    w, h = img.size
    removed = 0
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if color_distance((r, g, b), key_color) <= tolerance:
                pixels[x, y] = (0, 0, 0, 0)
                removed += 1
    print(f"  Chroma key: removed {removed} pixels ({removed * 100 / (w * h):.1f}%)")
    return img


def auto_crop(img: Image.Image) -> Image.Image:
    """Trim transparent borders to content bounding box."""
    bbox = img.getbbox()
    if bbox is None:
        print("  Warning: Image is entirely transparent after chroma key removal")
        return img
    cropped = img.crop(bbox)
    print(f"  Auto-crop: {img.size[0]}x{img.size[1]} -> {cropped.size[0]}x{cropped.size[1]}")
    return cropped


def quantize_colors(img: Image.Image, max_colors: int = 16, palette_file: str = None) -> Image.Image:
    """Reduce to limited color palette while preserving transparency."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")

    # Separate alpha channel
    r, g, b, a = img.split()
    rgb_img = Image.merge("RGB", (r, g, b))

    if palette_file:
        # Load palette from file (one hex color per line)
        palette_colors = []
        with open(palette_file) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#"):
                    palette_colors.append(hex_to_rgb(line))
                elif line.startswith("#") and len(line) == 7:
                    palette_colors.append(hex_to_rgb(line))
        if palette_colors:
            # Create a palette image and quantize to it
            flat_palette = []
            for c in palette_colors[:256]:
                flat_palette.extend(c)
            # Pad to 256 colors
            while len(flat_palette) < 768:
                flat_palette.extend((0, 0, 0))
            palette_img = Image.new("P", (1, 1))
            palette_img.putpalette(flat_palette)
            quantized = rgb_img.quantize(colors=len(palette_colors), palette=palette_img, dither=0)
            quantized = quantized.convert("RGB")
            result = Image.merge("RGBA", (*quantized.split(), a))
            print(f"  Quantize: applied {len(palette_colors)}-color palette from file")
            return result

    # Standard quantization
    quantized = rgb_img.quantize(colors=max_colors, dither=0)
    quantized = quantized.convert("RGB")
    result = Image.merge("RGBA", (*quantized.split(), a))
    print(f"  Quantize: reduced to {max_colors} colors")
    return result


def resize_nearest(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Nearest-neighbor resize to target dimensions."""
    resized = img.resize((target_w, target_h), Image.NEAREST)
    print(f"  Resize: {img.size[0]}x{img.size[1]} -> {target_w}x{target_h} (nearest-neighbor)")
    return resized


def process_sprite(
    input_path: str,
    output_path: str,
    target_size: str = None,
    chroma_key: str = "FF00FF",
    chroma_tolerance: int = 30,
    quantize: int = None,
    palette_file: str = None,
    skip_crop: bool = False,
    skip_chroma: bool = False,
) -> str:
    """Run the full post-processing pipeline on a sprite image."""
    img = Image.open(input_path).convert("RGBA")
    print(f"Input: {input_path} ({img.size[0]}x{img.size[1]})")

    # Step 1: Chroma key removal
    if not skip_chroma:
        key_rgb = hex_to_rgb(chroma_key)
        img = chroma_key_remove(img, key_rgb, chroma_tolerance)

    # Step 2: Auto-crop
    if not skip_crop:
        img = auto_crop(img)

    # Step 3: Color quantization
    if quantize or palette_file:
        img = quantize_colors(img, max_colors=quantize or 16, palette_file=palette_file)

    # Step 4: Resize to target
    if target_size:
        parts = target_size.lower().split("x")
        target_w, target_h = int(parts[0]), int(parts[1])
        img = resize_nearest(img, target_w, target_h)

    # Save
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    img.save(out, "PNG")
    print(f"Output: {out} ({img.size[0]}x{img.size[1]})")
    return str(out)


def main():
    parser = argparse.ArgumentParser(
        description="Post-process pixel art sprites: chroma key, crop, quantize, resize",
    )
    parser.add_argument("--input", "-i", required=True, help="Input image path")
    parser.add_argument("--output", "-o", required=True, help="Output image path")
    parser.add_argument("--target-size", help="Target dimensions as WxH (e.g., 16x32)")
    parser.add_argument("--chroma-key", default="FF00FF", help="Chroma key color hex (default: FF00FF)")
    parser.add_argument("--chroma-tolerance", type=int, default=30, help="Chroma key tolerance (default: 30)")
    parser.add_argument("--quantize", type=int, help="Max colors for quantization")
    parser.add_argument("--palette", help="Path to palette file (one hex color per line)")
    parser.add_argument("--skip-crop", action="store_true", help="Skip auto-crop step")
    parser.add_argument("--skip-chroma", action="store_true", help="Skip chroma key removal")

    args = parser.parse_args()
    process_sprite(
        input_path=args.input,
        output_path=args.output,
        target_size=args.target_size,
        chroma_key=args.chroma_key,
        chroma_tolerance=args.chroma_tolerance,
        quantize=args.quantize,
        palette_file=args.palette,
        skip_crop=args.skip_crop,
        skip_chroma=args.skip_chroma,
    )


if __name__ == "__main__":
    main()
