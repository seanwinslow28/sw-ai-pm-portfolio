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


def hsv_hsv(rgb: np.ndarray) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    """Return (hue, saturation, value) in 0..1 from an HxWx3 uint8 RGB array."""
    rgb_f = rgb.astype(np.float32) / 255.0
    mx = rgb_f.max(axis=2)
    mn = rgb_f.min(axis=2)
    d = mx - mn
    v = mx
    s = np.where(mx == 0, 0, d / np.where(mx == 0, 1, mx))
    h = np.zeros_like(v)
    rc, gc, bc = rgb_f[..., 0], rgb_f[..., 1], rgb_f[..., 2]
    safe_d = np.where(d == 0, 1, d)
    mr = (mx == rc) & (d != 0)
    mg = (mx == gc) & (d != 0)
    mb = (mx == bc) & (d != 0)
    h[mr] = ((gc - bc) / safe_d)[mr] % 6
    h[mg] = ((bc - rc) / safe_d)[mg] + 2
    h[mb] = ((rc - gc) / safe_d)[mb] + 4
    return (h / 6) % 1.0, s, v


def remove_background(
    rgb: np.ndarray,
    target_paper: tuple[int, int, int] | None = None,
    drop_light_strokes: bool = False,
) -> np.ndarray:
    """Return an HxWx4 RGBA image with the paper background keyed to alpha=0.

    If target_paper is given (e.g. (255, 249, 240) for the portfolio's #fff9f0),
    any cream-paper-toned pixel INSIDE the silhouette (monitor screen, under-desk
    shading, paper visible between desk legs) is recolored to that RGB so the
    composite blends seamlessly with the page background. Gray pencil strokes
    and pigmented elements (desk wood, skin, orange companion) are preserved.

    If drop_light_strokes=True, free-standing light pencil hatching is
    removed AFTER the main silhouette is built. The filter targets pixels
    that are simultaneously: light (V > 0.55, S < 0.14), in the lower
    half of the frame (below y = 0.50 * H), and not within 12 px of any
    dark-line structure (V < 0.50 OR S > 0.20). This drops the floor
    hatching under the desk while preserving Sean's pants, shoes, and the
    chair, all of which are enclosed by nearby dark outlines.
    """
    s, v = hsv_sv(rgb)

    # Step 1: paper detection — keep only LARGE connected paper regions.
    # Thresholds tuned across two batches: paper has V > 0.88 reliably,
    # S can drift up to 0.16 on more yellow-saturated source art.
    paper_candidate = (s < 0.16) & (v > 0.88)
    paper_labels, n_paper = ndimage.label(paper_candidate)
    if n_paper:
        sizes = ndimage.sum(paper_candidate, paper_labels, range(1, n_paper + 1))
        big_paper = np.where(sizes > 20_000)[0] + 1
        is_background = np.isin(paper_labels, big_paper)
    else:
        is_background = np.zeros_like(paper_candidate)

    # Step 2: foreground = everything not in the big paper region; clean speckle.
    fg = ~is_background
    fg = ndimage.binary_opening(fg, iterations=2)

    # Step 3: drop tiny components and orphan paper islands. We do NOT drop
    # border-touching components anymore — in complex scenes (e.g. character
    # at a desk) the main subject legitimately extends to the frame edge.
    # The paper-color filter below catches the paper-island case that the
    # border filter used to handle.
    fg_labels, n_fg = ndimage.label(fg)
    sizes = ndimage.sum(fg, fg_labels, range(1, n_fg + 1)) if n_fg else np.array([])

    keep = []
    for i, sz in enumerate(sizes):
        label = i + 1
        if sz < 1500:
            continue
        # Reject if the component's mean color is paper-like (low S, high V)
        mask = fg_labels == label
        mean_rgb = rgb[mask].mean(axis=0) / 255.0
        mx, mn = mean_rgb.max(), mean_rgb.min()
        comp_v = mx
        comp_s = 0 if mx == 0 else (mx - mn) / mx
        if comp_s < 0.18 and comp_v > 0.85:
            continue  # this whole component is just paper
        keep.append(label)

    final = np.isin(fg_labels, keep)
    final = ndimage.binary_fill_holes(final)

    # Step 4: soft edge feather
    edge_ring = ndimage.binary_dilation(final, iterations=2) & ~final
    alpha = np.zeros(rgb.shape[:2], dtype=np.uint8)
    alpha[final] = 255
    alpha[edge_ring] = 140

    # Step 4.5 (optional): kill free-standing floor pencil hatching.
    # Identify "structural" pixels (dark outlines, dark wood, saturated paint),
    # expand into a structure-neighborhood, then in the lower half of the frame
    # zero alpha for light pencil pixels that fall OUTSIDE that neighborhood.
    if drop_light_strokes:
        H = rgb.shape[0]
        # Identify structural pixels (dark linework, dark wood, saturated paint)
        structural = (v < 0.50) | (s > 0.20)
        # Smaller dilation than before (was 12) — that was over-protecting hatching
        # pixels adjacent to Sean's shoes / chair wheels. 6 keeps the silhouette
        # safe without bleeding protection into the surrounding floor area.
        struct_nb = ndimage.binary_dilation(structural, iterations=6)
        # Restrict the rule to the bottom 45% of the frame so it can't touch faces.
        floor_zone = np.zeros_like(structural)
        floor_zone[int(H * 0.55):] = True
        light_pencil = (v >= 0.55) & (v < 0.88) & (s < 0.14)
        hatching = light_pencil & floor_zone & ~struct_nb & (alpha > 0)
        alpha[hatching] = 0

    # Step 5 (optional): recolor cream-paper pixels inside the silhouette
    # to the portfolio's --paper so the embed blends seamlessly with the page.
    #
    # Filter combines three checks:
    #   - S < 0.16 AND V > 0.88   (paper is low-saturation, very bright)
    #   - hue in 42°-52° (yellow band)  — separates paper (~45°) from
    #     skin (~25-35°) and cheek highlights (~10-20°). Without this,
    #     bright skin highlights get caught and the face looks blotchy.
    out_rgb = rgb.copy()
    if target_paper is not None:
        h, _, _ = hsv_hsv(rgb)
        is_paper_pixel = (
            (s < 0.16) & (v > 0.88)
            & (h >= 42 / 360) & (h <= 52 / 360)
            & final
        )
        out_rgb[is_paper_pixel] = np.array(target_paper, dtype=np.uint8)

    return np.dstack([out_rgb, alpha])


def main():
    if len(sys.argv) < 3:
        print(f"usage: {sys.argv[0]} <input_dir> <output_dir> [--paper RRGGBB] [--no-floor]")
        sys.exit(1)
    indir, outdir = Path(sys.argv[1]), Path(sys.argv[2])
    args = sys.argv[3:]
    target_paper = None
    drop_light = False
    i = 0
    while i < len(args):
        if args[i] == "--paper" and i + 1 < len(args):
            hexstr = args[i + 1].lstrip("#")
            target_paper = tuple(int(hexstr[j:j + 2], 16) for j in (0, 2, 4))
            i += 2
        elif args[i] == "--no-floor":
            drop_light = True
            i += 1
        else:
            i += 1
    outdir.mkdir(parents=True, exist_ok=True)
    files = sorted(indir.glob("*.png"))
    flags = []
    if target_paper: flags.append(f"recolor paper -> {target_paper}")
    if drop_light:   flags.append("drop light pencil strokes")
    suffix = f"  ({'; '.join(flags)})" if flags else ""
    print(f"processing {len(files)} frames -> {outdir}{suffix}")
    for f in files:
        rgb = np.array(Image.open(f).convert("RGB"))
        rgba = remove_background(rgb, target_paper=target_paper, drop_light_strokes=drop_light)
        Image.fromarray(rgba, "RGBA").save(outdir / f.name)
        print(f"  {f.name}: {(rgba[..., 3] > 0).sum() // 1000}k px kept")


if __name__ == "__main__":
    main()
