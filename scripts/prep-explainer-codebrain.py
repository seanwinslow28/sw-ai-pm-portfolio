#!/usr/bin/env python3
"""
Prep the Code Brain interactive-explainer base image.

Unlike the graphite run-cycle, the Code Brain dial is COLORED (teal dial + amber
moon/sun). So it is NOT run through scripts/key-explainer-art.py (that keyer
recolors all ink to uniform graphite, which would flatten the teal/amber). Here
we only overpaint the lower-right "dawn cluster" (sun / 08:30 / newspaper) with
the art's own background color, leaving a night-only base that keeps its original
white-card background. The sun, 08:30, and masthead are re-added as live SVG/DOM
dawn layers by CodeBrainExplainer.astro.

See docs/superpowers/specs/2026-06-21-codebrain-interactive-explainer-design.md §7.

Usage: python3 scripts/prep-explainer-codebrain.py
Requires: pip install Pillow
"""
from PIL import Image, ImageDraw

SRC = "public/assets/projects/explainers/code-brain.webp"
OUT = "public/assets/projects/explainers/code-brain-dial.webp"

# Dawn cluster bounding box, in source pixels (1672x941). The dial's bottom arc
# stays left of x~960 at these y's, so this rectangle is clear of the dial.
# TUNE in Task 6: open OUT and confirm sun/08:30/newspaper are gone and no node,
# label, or dial arc is clipped.
BOX = (1075, 695, 1672, 905)  # (x0, y0, x1, y1)

im = Image.open(SRC).convert("RGB")
bg = im.getpixel((12, 12))  # clean top-left corner = the background color
ImageDraw.Draw(im).rectangle(BOX, fill=bg)
im.save(OUT, "WEBP", lossless=True, method=6)
print(f"overpainted {SRC} -> {OUT}  size={im.size}  bg={bg}  box={BOX}")
