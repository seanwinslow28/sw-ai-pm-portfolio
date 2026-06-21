#!/usr/bin/env python3
"""
Normalize raw 16BitFit punch art into an even-cell sprite sheet the explainer
canvas can step through. The pixel-art counterpart to key-explainer-art.py — no
luminance keying; pixel art stays opaque.

Two input modes:
  --frames-dir DIR  : one fighter per PNG (the reference-locked per-frame path).
  --input STRIP     : one horizontal strip; fighters are isolated by 4-connected
                      components (robust to a punch arm overlapping a neighbour's
                      column range), falling back to an even split.

Per frame: chroma-key the hot pink -> transparent, keep the largest component,
crop to the fighter, find a stable FEET anchor (centroid of the bottom ~18%).
Then every frame is re-placed into a uniform cell, feet anchor centered and feet
on the ground line, so the body stays planted while the arm punches; the strip is
nearest-neighbor downscaled for chunky LCD pixels and quantized to the 3 darker
DMG greens (#9BBC0F lightest is the LCD bg, reserved so the fighter pops).

Usage:
  python3 scripts/normalize_16bitfit_sheet.py --frames-dir scratch/16bitfit-frames \
      --output public/assets/projects/explainers/16bitfit-fighter-sheet.png
  python3 scripts/normalize_16bitfit_sheet.py --input raw.png --output sheet.png
"""
import argparse
from pathlib import Path
from PIL import Image

# DMG fighter greens — the 3 darker tones. #9BBC0F (lightest) is the LCD bg.
DMG = [(0x8B, 0xAC, 0x0F), (0x30, 0x62, 0x30), (0x0F, 0x38, 0x0F)]


def is_bg(r, g, b):
    """Magenta-ish background test, tolerant of JPEG ringing. Greens (g is the
    largest channel) are always kept."""
    return r > 110 and b > 110 and g < min(r, b) - 25


def chroma_key(img):
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if is_bg(r, g, b):
                px[x, y] = (0, 0, 0, 0)
    return img


def components(img, min_size):
    """All 4-connected opaque components (list of pixel lists) above min_size."""
    w, h = img.size
    px = img.load()
    seen = [[False] * w for _ in range(h)]
    comps = []
    for sy in range(h):
        for sx in range(w):
            if seen[sy][sx] or px[sx, sy][3] == 0:
                continue
            stack = [(sx, sy)]
            seen[sy][sx] = True
            comp = []
            while stack:
                x, y = stack.pop()
                comp.append((x, y))
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx] and px[nx, ny][3] > 0:
                        seen[ny][nx] = True
                        stack.append((nx, ny))
            if len(comp) >= min_size:
                comps.append(comp)
    return comps


def keep_largest(img):
    """Return a copy with only the largest opaque component (drops fragments)."""
    comps = components(img, 1)
    if not comps:
        return img
    keep = set(max(comps, key=len))
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 0 and (x, y) not in keep:
                px[x, y] = (0, 0, 0, 0)
    return img


def isolate_component(img, comp):
    """Build a tight RGBA image containing only `comp`'s pixels."""
    xs = [p[0] for p in comp]
    ys = [p[1] for p in comp]
    x0, x1, y0, y1 = min(xs), max(xs) + 1, min(ys), max(ys) + 1
    src = img.load()
    out = Image.new("RGBA", (x1 - x0, y1 - y0), (0, 0, 0, 0))
    opx = out.load()
    for (x, y) in comp:
        opx[x - x0, y - y0] = src[x, y]
    return out


def feet_anchor(cell):
    fw, fh = cell.size
    fpx = cell.load()
    rows = range(int(fh * 0.82), fh)
    xs = [x for y in rows for x in range(fw) if fpx[x, y][3] > 0]
    return (min(xs) + max(xs)) // 2 if xs else fw // 2


def frames_from_strip(strip_path, n_frames):
    img = chroma_key(Image.open(strip_path))
    min_size = (img.size[0] * img.size[1]) // (n_frames * 40)
    comps = components(img, min_size)
    if len(comps) >= n_frames:
        comps = sorted(comps, key=len, reverse=True)[:n_frames]
        comps.sort(key=lambda c: sum(p[0] for p in c) / len(c))   # left -> right
        print(f"component-segmented {n_frames} fighters")
        return [isolate_component(img, c) for c in comps]
    print(f"only {len(comps)} components; falling back to even split")
    W, H = img.size
    sw = W // n_frames
    out = []
    for i in range(n_frames):
        sub = keep_largest(img.crop((i * sw, 0, (i + 1) * sw, H)))
        bb = sub.getbbox()
        out.append(sub.crop(bb) if bb else sub)
    return out


def frames_from_dir(frames_dir):
    paths = sorted(Path(frames_dir).glob("*.png"))
    out = []
    for p in paths:
        sub = keep_largest(chroma_key(Image.open(p)))
        bb = sub.getbbox()
        out.append(sub.crop(bb) if bb else sub)
    print(f"loaded {len(out)} frames from {frames_dir}")
    return out


def assemble(frame_imgs, output_path, target_cell_h=104, pad_x=8, pad_top=6, pad_bot=4):
    frames = [{"img": f, "w": f.size[0], "h": f.size[1], "ax": feet_anchor(f)} for f in frame_imgs]
    n = len(frames)
    half_l = max(f["ax"] for f in frames)
    half_r = max(f["w"] - f["ax"] for f in frames)
    max_h = max(f["h"] for f in frames)
    cell_w = half_l + half_r + pad_x * 2
    cell_h = max_h + pad_top + pad_bot

    sheet = Image.new("RGBA", (cell_w * n, cell_h), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        cx = i * cell_w + pad_x + half_l
        sheet.alpha_composite(f["img"], (cx - f["ax"], cell_h - pad_bot - f["h"]))

    # downscale (nearest); force INTEGER cell width so the canvas stepper slices
    # cells at exact multiples (sheet_w = cell_w * frames).
    scale = target_cell_h / cell_h
    cw = max(1, int(round(cell_w * scale)))
    sw, sh = cw * n, target_cell_h
    sheet = sheet.resize((sw, sh), Image.NEAREST)
    qpx = sheet.load()
    for y in range(sh):
        for x in range(sw):
            r, g, b, a = qpx[x, y]
            if a < 128:
                qpx[x, y] = (0, 0, 0, 0)
                continue
            best = min(DMG, key=lambda c: (c[0]-r)**2 + (c[1]-g)**2 + (c[2]-b)**2)
            qpx[x, y] = (best[0], best[1], best[2], 255)

    sheet.save(output_path)
    print(f"frames={n} cell={cw}x{sh} sheet={sw}x{sh} -> {output_path}")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("--input", "-i", help="single horizontal strip")
    p.add_argument("--frames-dir", help="directory of one-fighter-per-PNG frames")
    p.add_argument("--output", "-o", required=True)
    p.add_argument("--frames", type=int, default=6)
    p.add_argument("--cell-height", type=int, default=104)
    a = p.parse_args()
    if a.frames_dir:
        imgs = frames_from_dir(a.frames_dir)
    else:
        imgs = frames_from_strip(a.input, a.frames)
    assemble(imgs, a.output, a.cell_height)
