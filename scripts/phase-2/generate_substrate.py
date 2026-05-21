#!/usr/bin/env python3
"""
Phase 2 substrate asset generator.

Produces tileable Pillow-based substitutes for the texture-spec §3-§5 assets:
- paper-tile.png   (2048×2048, ≤180KB, tileable construction-paper grain)
- tear-edge.png    (6400×600, ≤220KB, jagged torn edge with fluff approximation)
- hero-floor-shadow.png (2800×560, ≤160KB, radial soft pencil shadow)

These are v1 substitutes. Per texture-spec §3.2 the hand-authored Procreate
versions are the eventual target; this script provides a shippable default.
"""

import os
import random
import math
from PIL import Image, ImageDraw, ImageFilter

OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/textures"
os.makedirs(OUT_DIR, exist_ok=True)


def generate_paper_tile():
    """2048×2048 tileable construction-paper grain.

    The texture is layered on top of the #FFF9F0 base via background-blend-mode:
    multiply, so this asset carries only the texture variation (warm fibers on
    near-white). Tileability achieved by drawing on a wrapped torus — every
    stroke that crosses an edge wraps to the opposite edge.
    """
    W, H = 2048, 2048
    img = Image.new("RGB", (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    random.seed(1337)

    # Layer 1: warm beige fibers (mostly horizontal, slight angle variation)
    fiber_colors = [
        (232, 217, 188, 12),   # #E8D9BC at low alpha
        (240, 228, 206, 8),    # #F0E4CE at lower alpha
    ]

    overlay = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    od = ImageDraw.Draw(overlay)

    for _ in range(2400):
        x0 = random.randint(0, W - 1)
        y0 = random.randint(0, H - 1)
        # mostly horizontal fibers
        angle = random.uniform(-0.18, 0.18)  # radians (~±10°)
        length = random.randint(40, 220)
        x1 = x0 + int(math.cos(angle) * length)
        y1 = y0 + int(math.sin(angle) * length)
        color = random.choice(fiber_colors)
        od.line([(x0, y0), (x1, y1)], fill=color, width=1)
        # Wrap for tileability: if line exited canvas, draw the wrapped portion
        if x1 < 0 or x1 >= W or y1 < 0 or y1 >= H:
            wx0 = x0 - W if x1 >= W else (x0 + W if x1 < 0 else x0)
            wy0 = y0 - H if y1 >= H else (y0 + H if y1 < 0 else y0)
            wx1 = x1 - W if x1 >= W else (x1 + W if x1 < 0 else x1)
            wy1 = y1 - H if y1 >= H else (y1 + H if y1 < 0 else y1)
            od.line([(wx0, wy0), (wx1, wy1)], fill=color, width=1)

    # Layer 2: paper specks (recycled-paper inclusions)
    for _ in range(800):
        x = random.randint(0, W - 1)
        y = random.randint(0, H - 1)
        r = random.randint(1, 3)
        v = random.randint(190, 220)
        od.ellipse([x - r, y - r, x + r, y + r], fill=(v, v - 10, v - 30, 16))

    # Blur to soften
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.4))
    img.paste(overlay, (0, 0), overlay)

    out = os.path.join(OUT_DIR, "paper-tile.png")
    img.save(out, "PNG", optimize=True)
    size_kb = os.path.getsize(out) / 1024
    print(f"  → {out}  ({size_kb:.1f} KB)")


def generate_tear_edge():
    """6400×600 horizontal torn-paper edge with cream paper above the tear.

    SVG-jaggies are forbidden by texture-spec §4.1 (no fluff). This raster
    version uses Perlin-style noise displacement on the tear line + sparse
    pixel fluff above the main edge to approximate paper fibers. Real-scan
    quality requires Sean's photograph; this is the deterministic stopgap.
    """
    W, H = 6400, 600
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))  # fully transparent
    d = ImageDraw.Draw(img)
    random.seed(4242)

    # Build a jagged tear line at y ≈ H/2 with stochastic micro-jitter
    PAPER = (255, 249, 240, 255)
    points = []
    base_y = H // 2
    x = 0
    while x <= W:
        # Multi-frequency noise: macro waves + micro jitter
        macro = math.sin(x / 320.0) * 22
        meso = math.sin(x / 90.0 + 1.3) * 14
        micro = random.uniform(-6, 6)
        y = int(base_y + macro + meso + micro)
        points.append((x, y))
        x += random.randint(2, 7)

    # Fill the polygon above the tear line with cream
    poly = points + [(W, 0), (0, 0)]
    d.polygon(poly, fill=PAPER)

    # Add fluff: 1-3px cream pixels sprinkled above the tear edge
    for px, py in points:
        for _ in range(random.randint(0, 4)):
            fx = px + random.randint(-3, 3)
            fy = py - random.randint(1, 18)
            if 0 <= fx < W and 0 <= fy < H:
                alpha = random.randint(140, 235)
                d.point((fx, fy), fill=(255, 249, 240, alpha))
                # occasional 2px strand
                if random.random() < 0.18:
                    d.point((fx, fy - 1), fill=(255, 249, 240, alpha - 30))

    # Light Gaussian on the alpha channel only, for soft fluff
    r, g, b, a = img.split()
    a = a.filter(ImageFilter.GaussianBlur(0.6))
    img = Image.merge("RGBA", (r, g, b, a))

    out = os.path.join(OUT_DIR, "tear-edge.png")
    img.save(out, "PNG", optimize=True)
    size_kb = os.path.getsize(out) / 1024
    print(f"  → {out}  ({size_kb:.1f} KB)")


def generate_hero_floor_shadow():
    """2800×560 soft radial pencil shadow under the hero character.

    Anchors the WebM character to the paper. Soft fades on top + left + bottom;
    hard right edge (the character lane bleeds off the right viewport edge so
    a hard right is OK).
    """
    W, H = 2800, 560
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    random.seed(7777)

    # Two stacked radial gradients: tighter core + wider penumbra
    shadow_color = (10, 62, 66)  # teal-shifted shadow

    for cy_off in (-60, 0):  # two passes for depth
        center_x = W * 0.62  # weighted toward where the desk sits
        center_y = H * 0.7 + cy_off
        radius_x = W * 0.42
        radius_y = H * 0.45

        for y in range(H):
            for x in range(W):
                # normalized distance from center (ellipse)
                dx = (x - center_x) / radius_x
                dy = (y - center_y) / radius_y
                dist = math.sqrt(dx * dx + dy * dy)
                if dist > 1.0:
                    continue
                # falloff
                alpha = int((1.0 - dist) ** 2.2 * 36)
                if alpha < 1:
                    continue
                # blend additively into existing alpha
                cur = img.getpixel((x, y))
                new_alpha = min(255, cur[3] + alpha)
                img.putpixel((x, y), (shadow_color[0], shadow_color[1],
                                      shadow_color[2], new_alpha))

    # Soft blur for pencil-grain feel
    img = img.filter(ImageFilter.GaussianBlur(8))

    out = os.path.join(OUT_DIR, "hero-floor-shadow.png")
    img.save(out, "PNG", optimize=True)
    size_kb = os.path.getsize(out) / 1024
    print(f"  → {out}  ({size_kb:.1f} KB)")


if __name__ == "__main__":
    print("Generating Phase 2 substrate assets...")
    generate_paper_tile()
    generate_tear_edge()
    generate_hero_floor_shadow()
    print("Done.")
