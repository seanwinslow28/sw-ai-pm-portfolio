#!/usr/bin/env python3
"""
Key a graphite pencil sheet (dark line art on a light/cream background) to a
transparent PNG/WebP, so it composites cleanly onto the portfolio's real cream
paper.

Why luminance-to-alpha (not a magic-wand / chroma key): pencil line art is soft
and anti-aliased, and the charm is in the *faint* construction lines (joint
circles, gesture lines, ribcage ovals). A hard background cut leaves halos and
tends to eat the faint marks. Mapping darkness -> alpha keeps every graphite
stroke at its natural weight (lighter line = lower alpha) and turns the page
white into true transparency. A small alpha floor then removes paper noise and a
faint printed ground line in the same pass.

Used by the animation-pipeline interactive explainer. See
docs/specs/interactive-explainer-pattern-v1.md for the full pipeline.

Usage:
    python3 scripts/key-explainer-art.py INPUT.png OUTPUT.webp \
        [--gain-floor 0.50] [--alpha-floor 36] [--graphite 50,48,45] [--pad 24] \
        [--crop X,Y,W,H]

--crop carves one cell out of a multi-cell sheet (e.g. a 2x2 grid where each
quadrant becomes its own keyed asset) BEFORE keying, so a single style-consistent
generation yields several registered transparent pieces. Omit it to key the whole
image (the original behavior).

Requires: pip install Pillow numpy
"""
import argparse
import numpy as np
from PIL import Image


def key(inp, out, *, dark_anchor=0.50, alpha_floor=36.0, graphite=(50, 48, 45), pad=24, crop=None):
    im = Image.open(inp).convert("RGB")
    if crop is not None:
        x, y, w, h = crop
        im = im.crop((x, y, x + w, y + h))
    a = np.asarray(im).astype(np.float32) / 255.0
    L = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    paperL = float(np.median(L[:40, :40]))          # sample a clean corner = the paper white
    d = np.clip(paperL - L, 0, 1)                    # darkness below paper
    gain = 255.0 / max(paperL - dark_anchor, 0.30)   # darkest ink -> fully opaque
    alpha = np.clip(d * gain, 0, 255)
    alpha[alpha < alpha_floor] = 0                   # kill paper grain + faint ground line

    H, W = alpha.shape
    rgba = np.zeros((H, W, 4), np.uint8)
    rgba[..., 0], rgba[..., 1], rgba[..., 2] = graphite   # uniform warm graphite; alpha carries value
    rgba[..., 3] = alpha.astype(np.uint8)
    img = Image.fromarray(rgba, "RGBA")

    ys, xs = np.where(alpha > 0)                     # trim to content bbox (+pad)
    if len(xs):
        img = img.crop((max(xs.min() - pad, 0), max(ys.min() - pad, 0),
                        min(xs.max() + pad, W), min(ys.max() + pad, H)))

    if out.lower().endswith(".webp"):
        img.save(out, "WEBP", lossless=True, method=6)
    else:
        img.save(out)
    print(f"keyed {inp} -> {out}  size={img.size}  paperL={paperL:.3f}  ink={(alpha>0).mean()*100:.1f}%")


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("input")
    p.add_argument("output")
    p.add_argument("--dark-anchor", type=float, default=0.50, help="luminance of darkest ink (lower = more contrast)")
    p.add_argument("--alpha-floor", type=float, default=36.0, help="alpha below this -> 0 (kills paper noise + ground line)")
    p.add_argument("--graphite", default="50,48,45", help="R,G,B of the uniform line color")
    p.add_argument("--pad", type=int, default=24)
    p.add_argument("--crop", default=None, help="X,Y,W,H — carve one cell from a multi-cell sheet before keying")
    args = p.parse_args()
    crop = tuple(int(v) for v in args.crop.split(",")) if args.crop else None
    key(args.input, args.output,
        dark_anchor=args.dark_anchor, alpha_floor=args.alpha_floor,
        graphite=tuple(int(x) for x in args.graphite.split(",")), pad=args.pad, crop=crop)
