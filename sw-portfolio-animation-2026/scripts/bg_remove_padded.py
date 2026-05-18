#!/usr/bin/env python3
"""
Video-frame background removal — variant of bg_remove_colorkey.py tuned for
Seedance-generated MP4 frames.

Two differences from the original script:
  1. Pads each frame with cream paper before processing so subjects that touch
     the canvas border (Sean's sneakers, desk/chair legs) are not dropped by
     the "border-touching = bg-derived" rule. Crops the alpha back after.
  2. Loosens paper-detection HSV thresholds (S<0.18, V>0.78 vs the original
     S<0.10, V>0.83) because video compression slightly shifts the cream
     paper tone in motion frames, fragmenting the big paper blob below the
     20k-px floor.

Usage:
    python3 bg_remove_padded.py <input_dir> <output_dir> [pad_px]
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage


PAPER_RGB = (255, 249, 240)
PAPER_S_MAX = 0.18
PAPER_V_MIN = 0.78


def hsv_sv(rgb: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    rgb_f = rgb.astype(np.float32) / 255.0
    mx = rgb_f.max(axis=2)
    mn = rgb_f.min(axis=2)
    d = mx - mn
    v = mx
    s = np.where(mx == 0, 0, d / np.where(mx == 0, 1, mx))
    return s, v


def remove_background(rgb: np.ndarray) -> np.ndarray:
    s, v = hsv_sv(rgb)
    paper_candidate = (s < PAPER_S_MAX) & (v > PAPER_V_MIN)
    paper_labels, n_paper = ndimage.label(paper_candidate)
    if n_paper:
        sizes = ndimage.sum(paper_candidate, paper_labels, range(1, n_paper + 1))
        big_paper = np.where(sizes > 20_000)[0] + 1
        is_background = np.isin(paper_labels, big_paper)
    else:
        is_background = np.zeros_like(paper_candidate)

    fg = ~is_background
    fg = ndimage.binary_opening(fg, iterations=2)

    fg_labels, n_fg = ndimage.label(fg)
    border = set(np.unique(fg_labels[0, :])) | set(np.unique(fg_labels[-1, :])) \
           | set(np.unique(fg_labels[:, 0])) | set(np.unique(fg_labels[:, -1]))
    border.discard(0)
    sizes = ndimage.sum(fg, fg_labels, range(1, n_fg + 1)) if n_fg else np.array([])

    keep = []
    for i, sz in enumerate(sizes):
        label = i + 1
        if sz < 1500 or label in border:
            continue
        mask = fg_labels == label
        mean_rgb = rgb[mask].mean(axis=0) / 255.0
        mx, mn = mean_rgb.max(), mean_rgb.min()
        comp_v = mx
        comp_s = 0 if mx == 0 else (mx - mn) / mx
        if comp_s < 0.13 and comp_v > 0.82:
            continue
        keep.append(label)

    final = np.isin(fg_labels, keep)
    final = ndimage.binary_fill_holes(final)

    edge_ring = ndimage.binary_dilation(final, iterations=2) & ~final
    alpha = np.zeros(rgb.shape[:2], dtype=np.uint8)
    alpha[final] = 255
    alpha[edge_ring] = 140

    return np.dstack([rgb, alpha])


def main():
    if len(sys.argv) < 3:
        print(f"usage: {sys.argv[0]} <input_dir> <output_dir> [pad_px]")
        sys.exit(1)
    indir, outdir = Path(sys.argv[1]), Path(sys.argv[2])
    pad = int(sys.argv[3]) if len(sys.argv) > 3 else 80
    outdir.mkdir(parents=True, exist_ok=True)
    files = sorted(indir.glob("*.png"))
    print(f"padding={pad}px, paper S<{PAPER_S_MAX} V>{PAPER_V_MIN}, "
          f"processing {len(files)} frames -> {outdir}")
    for f in files:
        rgb = np.array(Image.open(f).convert("RGB"))
        h, w = rgb.shape[:2]
        padded = np.full((h + 2 * pad, w + 2 * pad, 3), PAPER_RGB, dtype=np.uint8)
        padded[pad:pad + h, pad:pad + w] = rgb
        rgba_padded = remove_background(padded)
        rgba = rgba_padded[pad:pad + h, pad:pad + w]
        Image.fromarray(rgba, "RGBA").save(outdir / f.name)
        kept = (rgba[..., 3] > 0).sum() // 1000
        print(f"  {f.name}: {kept}k px kept")


if __name__ == "__main__":
    main()
