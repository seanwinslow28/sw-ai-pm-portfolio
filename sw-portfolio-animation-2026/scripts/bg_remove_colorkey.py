#!/usr/bin/env python3
"""
Background-removal for the portfolio character animation.

Why this exists:
    Photoshop's batch "Select Subject" treats the orange AI companion as
    background and removes it along with the paper texture. This script
    keeps the companion by using a color-key + connected-components approach
    that's robust to multi-subject scenes.

How it works (in order):
    1. Detect the LARGE connected paper region by thresholding HSV
       saturation/value (paper = low S, high V).
    2. Anything not in that big paper blob is candidate foreground.
    3. Keep only foreground connected components that
         (a) are bigger than 1500 px AND
         (b) do not touch the frame border (border-touching = bg-derived).
    4. Fill internal pinholes; feather the edge by 2 px.

Usage:
    python3 bg_remove_colorkey.py <input_dir> <output_dir>

Tested on: /sw-portfolio-animation-2026/Portfolio-BG-removal/RAW-Needs-BG-Removal/
Produces output matching the style of existing /BG-Removed/ frames.
"""
import sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage


def hsv_sv(rgb: np.ndarray) -> tuple[np.ndarray, np.ndarray]:
    """Return (saturation, value) channels in 0..1 from an HxWx3 uint8 RGB array."""
    rgb_f = rgb.astype(np.float32) / 255.0
    mx = rgb_f.max(axis=2)
    mn = rgb_f.min(axis=2)
    d = mx - mn
    v = mx
    s = np.where(mx == 0, 0, d / np.where(mx == 0, 1, mx))
    return s, v


def remove_background(rgb: np.ndarray) -> np.ndarray:
    """Return an HxWx4 RGBA image with the paper background keyed to alpha=0."""
    s, v = hsv_sv(rgb)

    # Step 1: paper detection — keep only LARGE connected paper regions
    paper_candidate = (s < 0.10) & (v > 0.83)
    paper_labels, n_paper = ndimage.label(paper_candidate)
    if n_paper:
        sizes = ndimage.sum(paper_candidate, paper_labels, range(1, n_paper + 1))
        big_paper = np.where(sizes > 20_000)[0] + 1
        is_background = np.isin(paper_labels, big_paper)
    else:
        is_background = np.zeros_like(paper_candidate)

    # Step 2: foreground = everything not in the big paper region; clean speckle
    fg = ~is_background
    fg = ndimage.binary_opening(fg, iterations=2)

    # Step 3: drop foreground components that touch the frame border (always bg artifacts),
    # and drop components whose mean color is paper-cream (orphan interior paper islands
    # that got isolated by motion lines or texture variation).
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
        # Reject if mean color of this component is paper-like (low S, high V)
        mask = fg_labels == label
        mean_rgb = rgb[mask].mean(axis=0) / 255.0
        mx, mn = mean_rgb.max(), mean_rgb.min()
        comp_v = mx
        comp_s = 0 if mx == 0 else (mx - mn) / mx
        if comp_s < 0.13 and comp_v > 0.82:
            continue  # this whole component is just paper
        keep.append(label)

    final = np.isin(fg_labels, keep)
    final = ndimage.binary_fill_holes(final)

    # Step 4: soft edge feather
    edge_ring = ndimage.binary_dilation(final, iterations=2) & ~final
    alpha = np.zeros(rgb.shape[:2], dtype=np.uint8)
    alpha[final] = 255
    alpha[edge_ring] = 140

    return np.dstack([rgb, alpha])


def main():
    if len(sys.argv) != 3:
        print(f"usage: {sys.argv[0]} <input_dir> <output_dir>")
        sys.exit(1)
    indir, outdir = Path(sys.argv[1]), Path(sys.argv[2])
    outdir.mkdir(parents=True, exist_ok=True)
    files = sorted(indir.glob("*.png"))
    print(f"processing {len(files)} frames -> {outdir}")
    for f in files:
        rgb = np.array(Image.open(f).convert("RGB"))
        rgba = remove_background(rgb)
        Image.fromarray(rgba, "RGBA").save(outdir / f.name)
        print(f"  {f.name}: {(rgba[..., 3] > 0).sum() // 1000}k px kept")


if __name__ == "__main__":
    main()
