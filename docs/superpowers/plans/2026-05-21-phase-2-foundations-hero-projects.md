# Phase 2 Implementation Plan — Foundations + Hero + Projects

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a working home page on `localhost:4321` — hero + projects + footer composed into `src/pages/index.astro` — so the 24-hour recall test (hero §15 DoD #10) can re-run on the live build before sub-page surfaces are added in Phase 3.

**Architecture:** Astro 5 file-based routing + Tailwind 4 + minimal-JS islands. Three-layer visual model from texture-spec (`<body>` teal chrome at Z=0 → `.page-sheet` cream paper at Z=10 → page content at Z=20). Site constants in `src/lib/site.ts` consumed by chrome components. Theme cookie + FOUC-prevention inline script. WebM character + 8-icon intro cycle as the hero's load-bearing visual.

**Tech Stack:** Astro 5, Tailwind 4 (`@tailwindcss/vite`), `@astrojs/mdx`, `@astrojs/react` (for the cursor island only), `@astrojs/sitemap`, `astro-google-fonts-optimizer`. No GSAP, no Framer Motion, no Lenis. Python + Pillow for substrate asset generation. WebM VP9 + alpha for the character.

**Scope:** Matches [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 2 exactly: hero + projects + footer. **The home-about-teaser** ([`docs/specs/home-about-teaser-spec-v1.md`](../../specs/home-about-teaser-spec-v1.md), added 2026-05-20 after blueprint draft) is **Phase 2b** — its own plan, executed after this one. Sub-page chrome (top nav + dynamic routes) is Phase 3. The home `noChrome={true}` flag in this plan is the gating mechanism that keeps Phase 2 self-contained.

**Out of scope:** Sub-page nav rendering, case-study deep-dive pages (stub the `/work/[slug]` route as a View Transition target only), `/transactions/` `/architecture/` `/essays/` `/about/` `/contact/` `/404`, Daily Driver agent endpoints (we'll hand-seed the static JSON for v1), Plausible analytics, RSS feeds (collection deep-dives are Phase 3).

**Branch strategy:** Sean works on `main`. Each section commits incrementally so revert is one-checkbox-back. No PR flow for Phase 2 (single-author, no review-gate).

---

## File Structure

Files this plan creates or modifies, organized by responsibility:

```
sw-ai-pm-portfolio/
├── package.json                                ← Astro 5 deps
├── tsconfig.json
├── astro.config.mjs                            ← integrations
├── tailwind.config.js                          ← Tailwind 4 config
├── .gitignore
├── .nvmrc                                      ← Node 22.x
│
├── public/
│   ├── favicon.svg                             ← from reference-images/favicon/
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-default.png                          ← from reference-images/og-cards/
│   ├── og-cards/
│   │   ├── vault-scorecard.png
│   │   ├── vault-knowledge-mcp.png
│   │   └── essays/meaning-over-access.png
│   ├── robots.txt
│   ├── api/
│   │   ├── dateline.json                       ← static seed
│   │   └── next-piece.json                     ← static seed
│   └── assets/
│       ├── character/
│       │   └── hero-loop.webm                  ← from animation source
│       ├── hero-icons/
│       │   ├── icon-1-loop.webp
│       │   ├── icon-2-terminal.webp
│       │   ├── icon-3-graph.webp
│       │   ├── icon-4-pencil.webp
│       │   ├── icon-5-sticky-note.webp
│       │   ├── icon-6-matrix.webp
│       │   ├── icon-7-claude.webp
│       │   └── icon-8-coffee.webp
│       ├── projects/
│       │   ├── animation-pipeline.webp         ← placeholder if no video yet
│       │   ├── code-brain.webp
│       │   ├── intent-engineering-mcp.png      ← OG-card variant works
│       │   ├── the-block.webp
│       │   └── 16bitfit.webp
│       └── textures/
│           ├── paper-tile.png                  ← Pillow-generated
│           ├── tear-edge.png                   ← Pillow-generated
│           └── hero-floor-shadow.png           ← Pillow-generated
│
├── scripts/
│   └── phase-2/
│       ├── generate_substrate.py               ← paper-tile + tear-edge + floor-shadow
│       └── convert_hero_icons.py               ← PNG → WebP at 80% quality, ≤40KB each
│
└── src/
    ├── lib/
    │   └── site.ts                             ← URL + identity constants
    ├── styles/
    │   └── global.css                          ← tokens + base + print
    ├── content/
    │   ├── config.ts                           ← Astro content collections schema
    │   └── work/
    │       ├── animation-pipeline.mdx
    │       ├── code-brain.mdx
    │       ├── intent-engineering-mcp.mdx
    │       ├── the-block.mdx
    │       └── 16bitfit.mdx
    ├── layouts/
    │   └── BaseLayout.astro                    ← shell with noChrome prop
    ├── components/
    │   ├── chrome/
    │   │   ├── SkipLink.astro
    │   │   ├── SiteFooter.astro
    │   │   └── ThemeToggle.astro
    │   ├── substrate/
    │   │   └── TornDivider.astro
    │   ├── hero/
    │   │   ├── Hero.astro
    │   │   ├── Dateline.astro
    │   │   ├── CharacterLane.astro
    │   │   └── HeroIconCycle.astro
    │   ├── projects/
    │   │   ├── ProjectsSection.astro
    │   │   ├── DatelineLabel.astro
    │   │   ├── ProjectTile.astro
    │   │   ├── StatusPill.astro
    │   │   ├── NextInProduction.astro
    │   │   └── PencilAnnotation.astro
    │   └── Cursor.tsx                          ← React island, client:load
    ├── scripts/
    │   └── hero-icon-cycle.js                  ← vanilla JS module, no framework
    └── pages/
        ├── index.astro                         ← home page
        └── work/
            └── [slug].astro                    ← View Transition target stub
```

The `chrome/`, `substrate/`, `hero/`, `projects/` component sub-folders mirror the spec organization. Each Astro component has one responsibility. The `src/scripts/` folder is for **runtime JS modules** loaded by Astro's `<script>` tag; `scripts/` at repo root is for **build-time Python scripts** (asset generation) — same convention used in `scripts/phase-0/`.

---

## Section 0 — Repo scaffold

### Task 0.1: Initialize package.json + Node version

**Files:**
- Create: `package.json`
- Create: `.nvmrc`
- Create: `.gitignore`

- [ ] **Step 1: Create `.nvmrc`**

```
22
```

- [ ] **Step 2: Create `.gitignore`**

```
# Node
node_modules/
.pnpm-store/
npm-debug.log*

# Astro
dist/
.astro/

# Env
.env
.env.local
.env.production

# Editors
.DS_Store
.vscode/
.idea/

# Asset staging (texture-spec §7)
src/assets/**/staging/

# Build artifacts
*.log
```

- [ ] **Step 3: Initialize package.json via npm**

Run: `npm init -y`
Expected: a default `package.json` is created.

- [ ] **Step 4: Set the package metadata**

Edit `package.json` so it reads:

```json
{
  "name": "sw-ai-pm-portfolio",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add package.json .nvmrc .gitignore
git commit -m "chore(phase-2): scaffold package.json + node version + gitignore"
```

### Task 0.2: Install Astro 5 + integrations

**Files:**
- Modify: `package.json` (npm-managed)

- [ ] **Step 1: Install Astro core + content libs**

Run:
```bash
npm install astro@^5.0.0 @astrojs/mdx@^4.0.0 @astrojs/sitemap@^3.2.0 @astrojs/react@^4.0.0
```

Expected: `package.json` `dependencies` populates; `node_modules/` populates; `package-lock.json` created.

- [ ] **Step 2: Install Tailwind 4 via Vite plugin**

Astro 5 + Tailwind 4 uses the official `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`, which is for Tailwind 3).

Run:
```bash
npm install -D @tailwindcss/vite@^4.0.0 tailwindcss@^4.0.0
```

- [ ] **Step 3: Install React peer deps + font optimizer**

Run:
```bash
npm install react@^19.0.0 react-dom@^19.0.0 @types/react@^19.0.0 @types/react-dom@^19.0.0
npm install astro-google-fonts-optimizer@^0.2.6
```

- [ ] **Step 4: Verify install**

Run: `npx astro --version`
Expected: prints `5.x.x` (any Astro 5 patch is fine).

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore(phase-2): install Astro 5 + Tailwind 4 + integrations"
```

### Task 0.3: Astro config + TypeScript config

**Files:**
- Create: `astro.config.mjs`
- Create: `tsconfig.json`

- [ ] **Step 1: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://seanwinslow.com',
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    // Astro 5 has ClientRouter View Transitions stable; no flag needed.
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "preserve",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  },
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 3: Verify build infrastructure**

Create `src/pages/index.astro` as a 1-line placeholder so `astro check` doesn't choke:

```astro
<h1>Placeholder</h1>
```

Run: `npx astro check`
Expected: `0 errors`. May print warnings about config — that's fine.

- [ ] **Step 4: Commit**

```bash
git add astro.config.mjs tsconfig.json src/pages/index.astro
git commit -m "chore(phase-2): add astro.config.mjs + tsconfig + placeholder index"
```

---

## Section 1 — Substrate assets (programmatic generation)

The texture-spec calls for hand-authored Procreate PNGs (paper-tile, tear-edge, hero floor-shadow). For v1 we generate programmatic substitutes via Python + Pillow that ship usable defaults; Sean can swap in hand-authored versions later. Same approach used for the OG cards in Phase 0.

### Task 1.1: Generate paper texture tile

**Files:**
- Create: `scripts/phase-2/generate_substrate.py`
- Create: `public/assets/textures/paper-tile.png`

- [ ] **Step 1: Write the substrate generator**

```python
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
```

- [ ] **Step 2: Run the generator**

Run: `python3 scripts/phase-2/generate_substrate.py`
Expected output:
```
Generating Phase 2 substrate assets...
  → /Users/.../public/assets/textures/paper-tile.png  (XXX.X KB)
  → /Users/.../public/assets/textures/tear-edge.png  (XXX.X KB)
  → /Users/.../public/assets/textures/hero-floor-shadow.png  (XXX.X KB)
Done.
```

If any file exceeds its budget (paper-tile >180 KB, tear-edge >220 KB, floor-shadow >160 KB), run `pngquant --quality=70-85 --skip-if-larger --output <file> <file>` on the offender. Don't proceed until all three are under budget.

- [ ] **Step 3: Visual-verify on the filesystem**

Open each PNG via the macOS Preview / IDE preview pane:
- `paper-tile.png` — subtle horizontal-grain fibers, no obvious repeat when mentally tiled
- `tear-edge.png` — cream paper above the jagged line, transparent below, visible fluff strands
- `hero-floor-shadow.png` — soft elliptical shadow centered ~62% from left, ~70% from top, falls off in all directions

If any read as obviously broken, regenerate with a different `random.seed()` value at the top of the relevant function.

- [ ] **Step 4: Commit**

```bash
git add scripts/phase-2/generate_substrate.py public/assets/textures/
git commit -m "feat(phase-2): generate substrate assets (paper-tile + tear-edge + floor-shadow)"
```

### Task 1.2: Stage Phase 0 assets into /public/

The OG cards, favicons, and hero icons currently live under `reference-images/`. Move them to their final `/public/` locations.

**Files:**
- Copy: `reference-images/favicon/favicon.svg` → `public/favicon.svg`
- Copy: `reference-images/favicon/favicon.ico` → `public/favicon.ico`
- Copy: `reference-images/favicon/apple-touch-icon.png` → `public/apple-touch-icon.png`
- Copy: `reference-images/og-cards/*.png` → `public/og-default.png` + `public/og-cards/*.png`
- Copy: `reference-images/og-cards/essays/meaning-over-access.png` → `public/og-cards/essays/meaning-over-access.png`

- [ ] **Step 1: Copy favicons + OG cards**

Run:
```bash
cp reference-images/favicon/favicon.svg public/favicon.svg
cp reference-images/favicon/favicon.ico public/favicon.ico
cp reference-images/favicon/apple-touch-icon.png public/apple-touch-icon.png
cp reference-images/og-cards/og-default.png public/og-default.png
mkdir -p public/og-cards/essays
cp reference-images/og-cards/vault-scorecard.png public/og-cards/vault-scorecard.png
cp reference-images/og-cards/vault-knowledge-mcp.png public/og-cards/vault-knowledge-mcp.png
cp reference-images/og-cards/essays/meaning-over-access.png public/og-cards/essays/meaning-over-access.png
```

Verify with `ls -la public/ public/og-cards/ public/og-cards/essays/` — all 7 files should be present.

- [ ] **Step 2: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://seanwinslow.com/sitemap-index.xml
```

- [ ] **Step 3: Commit**

```bash
git add public/favicon.svg public/favicon.ico public/apple-touch-icon.png public/og-default.png public/og-cards/ public/robots.txt
git commit -m "feat(phase-2): stage favicons + OG cards + robots.txt to /public/"
```

### Task 1.3: Convert hero icons PNG → WebP + stage to /public/

Hero spec §7.5.6: built WebPs ≤40KB each, ≤320KB total.

**Files:**
- Create: `scripts/phase-2/convert_hero_icons.py`
- Create: `public/assets/hero-icons/icon-N-*.webp` (×8)

- [ ] **Step 1: Write the converter**

```python
#!/usr/bin/env python3
"""Convert hero-icon source PNGs → WebP at quality=80, target ≤40KB each."""

import os
from PIL import Image

SRC_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/hero-icons"
OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/hero-icons"
os.makedirs(OUT_DIR, exist_ok=True)

ICONS = [
    "icon-1-loop.png",
    "icon-2-terminal.png",
    "icon-3-graph.png",
    "icon-4-pencil.png",
    "icon-5-sticky-note.png",
    "icon-6-matrix.png",
    "icon-7-claude.png",
    "icon-8-coffee.png",
]

total_kb = 0
for fname in ICONS:
    src = os.path.join(SRC_DIR, fname)
    if not os.path.exists(src):
        print(f"  SKIP (missing): {src}")
        continue
    img = Image.open(src).convert("RGBA")
    # Downscale if larger than 720px on the longest edge — the lane displays
    # at ~1024×576 max but the icons are framed inside; ~720px source is plenty.
    max_edge = 720
    w, h = img.size
    if max(w, h) > max_edge:
        scale = max_edge / max(w, h)
        img = img.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    out = os.path.join(OUT_DIR, fname.replace(".png", ".webp"))
    img.save(out, "WEBP", quality=80, method=6)
    size_kb = os.path.getsize(out) / 1024
    total_kb += size_kb
    print(f"  → {out}  ({size_kb:.1f} KB)")

print(f"Total: {total_kb:.1f} KB (budget: ≤320 KB)")
```

- [ ] **Step 2: Run the converter**

Run: `python3 scripts/phase-2/convert_hero_icons.py`
Expected: 8 WebPs created, each <40KB, total <320KB.

If total exceeds 320 KB, rerun with `quality=70` at the `img.save` line.

- [ ] **Step 3: Commit**

```bash
git add scripts/phase-2/convert_hero_icons.py public/assets/hero-icons/
git commit -m "feat(phase-2): convert hero icons PNG→WebP at 80% quality"
```

### Task 1.4: Copy hero WebM to /public/

**Files:**
- Copy: `sw-portfolio-animation-2026/hero-color-final-BG-removed-frames/hero-color-final.webm` → `public/assets/character/hero-loop.webm`

- [ ] **Step 1: Copy the WebM**

Run:
```bash
mkdir -p public/assets/character
cp sw-portfolio-animation-2026/hero-color-final-BG-removed-frames/hero-color-final.webm public/assets/character/hero-loop.webm
ls -la public/assets/character/hero-loop.webm
```

Expected: file present, ~478KB.

- [ ] **Step 2: Verify VP9 + alpha**

Run: `ffprobe public/assets/character/hero-loop.webm 2>&1 | grep -i 'codec\|alpha'` (or open in QuickTime + verify transparent background is preserved).

Expected: codec is `vp9`; if `alpha_mode=1` is present in the metadata, alpha is encoded. If alpha verification fails the asset has a different encoding than hero-spec §7 expects — flag to Sean for re-export, don't proceed.

- [ ] **Step 3: Commit**

```bash
git add public/assets/character/hero-loop.webm
git commit -m "feat(phase-2): copy hero WebM to /public/assets/character/"
```

---

## Section 2 — Design tokens + global styles

### Task 2.1: Write global.css with all design tokens

The single source of truth for color, type, spacing, motion. Inherits DESIGN.md tokens. Defines paper-mode + dark-mode color variants per site-chrome §8.5.

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Write the global stylesheet**

```css
/* ----------------------------------------------------------------------
 * src/styles/global.css — design tokens + base styles + print
 * Inherits: DESIGN.md (color/type/spacing) + texture-spec (Z-stacking)
 * ---------------------------------------------------------------------- */

@import "tailwindcss";

/* ===== Design tokens (light mode default) ===== */
:root {
  /* Colors — paper layer */
  --paper: #FFF9F0;
  --ink: #1A1A1E;
  --ink-secondary: #546E71;
  --teal: #0A3E42;
  --teal-deep: #0c2d2f;
  --success-teal: #0F6E56;
  --stamp-amber: #7C2D12;
  --amber-mid: #FAC775;
  --amber-warm: #E89060;

  /* Border whispers */
  --border-paper: rgba(10, 62, 66, 0.15);
  --border-chrome: rgba(255, 249, 240, 0.18);

  /* Three-layer model — chrome backdrop */
  --chrome: var(--teal);

  /* Typography */
  --font-serif: 'Newsreader', Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-caveat: 'Caveat', cursive;

  /* Spacing scale (DESIGN.md §spacing) */
  --space-hairline: 4px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 60px;
  --space-xxl: 80px;

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-snap: cubic-bezier(0.23, 1, 0.32, 1);

  /* Page-status desaturation (case-study spec §12 hook) */
  --page-status-desat: 1;
}

/* ===== Dark mode tokens ===== */
:root[data-theme="dark"] {
  --paper: #1A1A1E;
  --ink: #FFF9F0;
  --ink-secondary: #A0B5B8;
  --teal: #2A6E72;
  --border-paper: rgba(255, 249, 240, 0.15);
  /* chrome stays the same — see texture-spec §2.4 */
}

/* ===== Reset (minimal) ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  /* No smooth-scroll-behavior — leaves Lenis space; we don't use it */
  font-size: 16px;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-family: var(--font-serif);
  color: var(--ink);
  background-color: var(--chrome);
  /* Three-layer model — body IS the chrome backdrop */
  min-height: 100vh;
  overflow-x: hidden;
}

/* ===== Page sheet (the paper layer at Z=10) ===== */
.page-sheet {
  position: relative;
  z-index: 10;
  background-color: var(--paper);
  background-image: url('/assets/textures/paper-tile.png');
  background-size: 1024px 1024px;
  background-repeat: repeat;
  background-blend-mode: multiply;
}

/* ===== Section-scoped splash color (one per section, never two) ===== */
.section-splash-teal {
  background-color: var(--teal);
  color: var(--paper);
}

/* ===== Type defaults ===== */
h1, h2, h3, h4, h5, h6 {
  margin: 0;
  font-weight: 400;
  letter-spacing: -0.2px;
}

p {
  margin: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

a:focus-visible {
  outline: 2px dashed var(--teal);
  outline-offset: 6px;
}

/* Screen-reader-only helper */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ===== Reduced motion baseline ===== */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 200ms !important;
    scroll-behavior: auto !important;
  }
}

/* ===== Print stylesheet (site-chrome spec §14) ===== */
@media print {
  header,
  footer,
  .skip-link,
  .theme-toggle,
  .character,
  [aria-hidden="true"] {
    display: none !important;
  }

  a[href^="http"]::after,
  a[href^="mailto"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #546E71;
  }

  :root {
    color-scheme: light !important;
  }

  body {
    background: white !important;
    color: black !important;
  }
}
```

- [ ] **Step 2: Verify Tailwind 4 loads via the new `@import "tailwindcss"` directive**

Add the stylesheet import to the placeholder `src/pages/index.astro`:

```astro
---
import '~/styles/global.css';
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Sean Winslow</title>
  </head>
  <body>
    <main class="page-sheet" style="min-height: 100vh; padding: 40px;">
      <h1 style="font-family: var(--font-serif); color: var(--teal); font-size: 64px;">Token check</h1>
      <p style="font-family: var(--font-mono); color: var(--ink-secondary);">If this is teal serif + secondary-ink mono, tokens load.</p>
    </main>
  </body>
</html>
```

- [ ] **Step 3: Start the dev server**

Run: `npm run dev` (leave running in a separate terminal).
Visit: `http://localhost:4321/`

Expected: "Token check" renders in dark teal Newsreader (or Georgia fallback if Newsreader hasn't loaded yet — fonts come in Section 3), "If this is..." renders in mono secondary-ink, body bg is teal `#0A3E42`, the main element shows the paper texture tile.

If the page is unstyled / 500s, check the terminal for compile errors. Fix and reload before continuing.

- [ ] **Step 4: Commit**

```bash
git add src/styles/global.css src/pages/index.astro
git commit -m "feat(phase-2): global.css with design tokens + paper-sheet substrate + print"
```

---

## Section 3 — Site constants + fonts + BaseLayout

### Task 3.1: Site constants module

**Files:**
- Create: `src/lib/site.ts`

- [ ] **Step 1: Write `src/lib/site.ts`** (verbatim from site-chrome §11)

```ts
/**
 * Single source of truth for URLs + identity values that appear across the
 * chrome + the minimal pages. Imported by SiteFooter, /contact/, /404, and
 * BaseLayout meta tags.
 *
 * Source: docs/specs/site-chrome-spec-v1.md §11.
 */

export const EMAIL = "sean@seanwinslow.com";
export const LINKEDIN_URL = "https://linkedin.com/in/seanwinslow";
export const GITHUB_URL = "https://github.com/seanwinslow";
export const SUBSTACK_URL = "https://sean.substack.com";
export const FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com";
export const SITE_REPO_URL = "https://github.com/seanwinslow/sw-portfolio";

export const SITE_NAME = "Sean Winslow";
export const SITE_DESCRIPTION = "AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs.";
export const SITE_LOCALE = "BOSTON";
export const COPYRIGHT_YEAR = "2026";

/* Wordmark — site-chrome §16 OPEN-1 CONFIRMED 2026-05-21 */
export const WORDMARK = "SW";

/* Asset paths (canonical) */
export const HERO_LOOP_WEBM = "/assets/character/hero-loop.webm";
export const HERO_LOOP_POSTER = "/assets/hero-icons/icon-1-loop.webp";

/* OG defaults */
export const OG_DEFAULT_IMAGE = "/og-default.png";
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/site.ts
git commit -m "feat(phase-2): site.ts constants module"
```

### Task 3.2: BaseLayout shell

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write BaseLayout**

```astro
---
/**
 * src/layouts/BaseLayout.astro — site shell
 * Renders skip link, conditional top nav (Phase 3+), <main>, universal footer.
 * Inline FOUC-prevention script sets the theme cookie before first paint.
 *
 * Source: site-chrome-spec-v1.md §3, §12.
 */

import { GoogleFontsOptimizer } from "astro-google-fonts-optimizer";
import { SITE_DESCRIPTION, OG_DEFAULT_IMAGE } from "~/lib/site";
import SkipLink from "~/components/chrome/SkipLink.astro";
import SiteFooter from "~/components/chrome/SiteFooter.astro";
import "~/styles/global.css";

interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  noChrome?: boolean;
}

const {
  title,
  description = SITE_DESCRIPTION,
  ogImage = OG_DEFAULT_IMAGE,
  noChrome = false,
} = Astro.props;

const canonicalUrl = new URL(Astro.url.pathname, Astro.site ?? "https://seanwinslow.com").toString();
const ogImageUrl = new URL(ogImage, Astro.site ?? "https://seanwinslow.com").toString();
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title}</title>

    <link rel="canonical" href={canonicalUrl} />

    <!-- OG -->
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogImageUrl} />
    <meta property="og:url" content={canonicalUrl} />

    <!-- Twitter card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={ogImageUrl} />

    <!-- Favicons -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Preload substrate (texture-spec §3.6 + §4.6) -->
    <link rel="preload" as="image" href="/assets/textures/paper-tile.png" />
    <link rel="preload" as="image" href="/assets/textures/tear-edge.png" />

    <!-- Fonts via astro-google-fonts-optimizer (hero-spec §13) -->
    <GoogleFontsOptimizer
      url="https://fonts.googleapis.com/css2?family=Newsreader:wght@300;400;500&family=JetBrains+Mono:wght@400;500;700&display=swap"
    />

    <!-- Inline theme script (FOUC prevention) -->
    <script is:inline>
      (function() {
        var match = document.cookie.match(/sw-theme=(light|dark)/);
        var theme = match ? match[1] : 'light';
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
  </head>
  <body>
    <SkipLink />
    {/* Sub-page top nav lands in Phase 3 — when noChrome=false. For Phase 2 the home is the only route, so this stays as a stub. */}
    <main id="main-content">
      <slot />
    </main>
    <SiteFooter />
  </body>
</html>
```

- [ ] **Step 2: Verify BaseLayout compiles even before children exist**

Stub SkipLink + SiteFooter so the build doesn't 500:

Create `src/components/chrome/SkipLink.astro`:
```astro
<a href="#main-content" class="skip-link sr-only">Skip to content</a>
<style>
  .skip-link {
    position: absolute;
    left: -10000px;
  }
  .skip-link:focus {
    position: fixed;
    top: 8px;
    left: 8px;
    z-index: 1000;
    padding: 8px 16px;
    background: var(--stamp-amber);
    color: var(--paper);
    font-family: var(--font-mono);
    font-size: 13px;
    letter-spacing: 1.0px;
    font-weight: 500;
    clip: auto;
    width: auto;
    height: auto;
    overflow: visible;
    white-space: normal;
  }
</style>
```

Create `src/components/chrome/SiteFooter.astro` as a stub:
```astro
<footer style="padding: 60px 24px; background: var(--paper); border-top: 0.5px solid var(--border-paper);">
  <p style="font-family: var(--font-mono); font-size: 11px; color: var(--ink-secondary); letter-spacing: 1.2px;">© 2026 SEAN WINSLOW · BOSTON (footer stub — replaced in Section 4)</p>
</footer>
```

- [ ] **Step 3: Replace placeholder `index.astro` with a BaseLayout consumer**

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
---
<BaseLayout title="Sean Winslow" noChrome={true}>
  <section class="page-sheet" style="padding: 80px 24px; min-height: 80vh;">
    <h1 style="font-family: var(--font-serif); color: var(--teal); font-size: 96px;">Hello, Layout.</h1>
    <p style="font-family: var(--font-mono); color: var(--ink-secondary);">BaseLayout shell loads with skip link + footer stub. Fonts via Google Fonts Optimizer.</p>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Restart dev server + verify**

In the dev terminal, stop (`Ctrl+C`) + restart `npm run dev`.
Visit: `http://localhost:4321/`

Expected:
- Page bg is teal `#0A3E42` (chrome at Z=0).
- A cream paper sheet renders inside `<main>` with the texture tile.
- "Hello, Layout." renders in dark-teal **Newsreader** (not Georgia — fonts should now have loaded via the optimizer).
- "BaseLayout shell loads..." renders in **JetBrains Mono** secondary-ink.
- Tab key from page top → focus lands on the visible "Skip to content" pill at the top-left.
- Footer stub at the bottom.
- View source — `<head>` contains canonical, OG, twitter:card, favicon links, preload tags, GoogleFontsOptimizer-emitted font CSS, inline theme script.

If fonts don't load (still Georgia), check the GoogleFontsOptimizer output in `<head>` — the integration emits inline `@font-face` rules. If the integration silently fails, swap to a direct `<link rel="stylesheet">` fallback temporarily and flag.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/BaseLayout.astro src/components/chrome/SkipLink.astro src/components/chrome/SiteFooter.astro src/pages/index.astro
git commit -m "feat(phase-2): BaseLayout shell + skip link + footer stub + Google Fonts optimizer"
```

---

## Section 4 — SiteFooter + ThemeToggle

### Task 4.1: Build the universal footer

**Files:**
- Modify: `src/components/chrome/SiteFooter.astro`
- Create: `src/components/chrome/ThemeToggle.astro`

- [ ] **Step 1: Write ThemeToggle**

Create `src/components/chrome/ThemeToggle.astro` per site-chrome §8:

```astro
---
/* Theme toggle — two text labels, vanilla JS click handler. Site-chrome §8.1-§8.4. */
---
<div class="theme-toggle" role="group" aria-label="Theme">
  <button type="button" data-theme="light" class="active" aria-label="Light theme">LIGHT</button>
  <span class="sep" aria-hidden="true">·</span>
  <button type="button" data-theme="dark" aria-label="Dark theme">DARK</button>
</div>

<script is:inline>
  (function() {
    var toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    var current = document.documentElement.getAttribute('data-theme') || 'light';
    toggle.querySelectorAll('[data-theme]').forEach(function(el) {
      el.classList.toggle('active', el.dataset.theme === current);
    });
    toggle.addEventListener('click', function(e) {
      var target = e.target;
      if (!target || !target.dataset || !target.dataset.theme) return;
      var newTheme = target.dataset.theme;
      document.documentElement.setAttribute('data-theme', newTheme);
      document.cookie = 'sw-theme=' + newTheme + '; path=/; max-age=31536000; SameSite=Lax';
      toggle.querySelectorAll('[data-theme]').forEach(function(el) {
        el.classList.toggle('active', el.dataset.theme === newTheme);
      });
    });
  })();
</script>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0;
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.4;
    letter-spacing: 1.6px;
  }
  .theme-toggle button {
    background: none;
    border: 0;
    padding: 4px 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    font-weight: 400;
    color: var(--ink-secondary);
    text-transform: uppercase;
    transition: color 200ms var(--ease-out), transform 100ms var(--ease-out);
  }
  .theme-toggle button.active {
    color: var(--teal);
    font-weight: 500;
  }
  .theme-toggle button:not(.active):hover {
    transform: translateY(-1px);
  }
  .theme-toggle .sep {
    color: var(--ink-secondary);
    padding: 0 4px;
  }
</style>
```

- [ ] **Step 2: Write the full SiteFooter (replacing the stub)**

Replace `src/components/chrome/SiteFooter.astro`:

```astro
---
/* Universal site footer — site-chrome §7. Renders on EVERY page including home. */
import {
  EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
  SUBSTACK_URL,
  FLEET_DASHBOARD_URL,
  SITE_REPO_URL,
  COPYRIGHT_YEAR,
  SITE_LOCALE,
} from "~/lib/site";
import ThemeToggle from "./ThemeToggle.astro";
---

<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-columns">
      <section aria-labelledby="footer-contact-heading">
        <h2 id="footer-contact-heading" class="col-heading">CONTACT</h2>
        <ul class="link-list">
          <li><span class="prefix">→</span> email · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
          <li><span class="prefix">→</span> <a href={LINKEDIN_URL} rel="me">linkedin.com/in/seanwinslow</a> <span class="glyph">↗</span></li>
          <li><span class="prefix">→</span> <a href={GITHUB_URL} rel="me">github.com/seanwinslow</a> <span class="glyph">↗</span></li>
        </ul>
      </section>

      <section aria-labelledby="footer-subscribe-heading">
        <h2 id="footer-subscribe-heading" class="col-heading">SUBSCRIBE</h2>
        <ul class="link-list">
          <li><span class="prefix">→</span> <a href="/transactions/rss.xml">transactions / rss</a></li>
          <li><span class="prefix">→</span> <a href="/architecture/rss.xml">architecture / rss</a></li>
          <li><span class="prefix">→</span> <a href="/essays/rss.xml">essays / rss</a></li>
          <li><span class="prefix">→</span> <a href={SUBSTACK_URL}>read on substack</a> <span class="glyph">↗</span></li>
        </ul>
      </section>

      <section aria-labelledby="footer-dashboard-heading">
        <h2 id="footer-dashboard-heading" class="col-heading">DASHBOARD</h2>
        <ul class="link-list">
          <li><span class="prefix">→</span> <a href={FLEET_DASHBOARD_URL}>view the fleet</a> <span class="glyph">↗</span></li>
          <li><span class="prefix">→</span> <a href={SITE_REPO_URL}>view the source</a> <span class="glyph">↗</span></li>
        </ul>
      </section>
    </div>

    <div class="footer-strip">
      <ThemeToggle />
      <p class="copyright">© {COPYRIGHT_YEAR} SEAN WINSLOW · {SITE_LOCALE}</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background-color: var(--paper);
    border-top: 0.5px solid var(--border-paper);
    padding: 60px 24px;
    color: var(--ink);
    position: relative;
    z-index: 30;
  }
  .footer-inner {
    max-width: 1120px;
    margin: 0 auto;
  }
  .footer-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
  }
  .col-heading {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    color: var(--stamp-amber);
    margin-bottom: 16px;
  }
  .link-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .link-list li {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.8px;
    line-height: 1.8;
    color: var(--teal);
  }
  .link-list .prefix {
    color: var(--ink-secondary);
    margin-right: 4px;
  }
  .link-list .glyph {
    color: var(--ink-secondary);
    font-size: 12px;
    margin-left: 4px;
  }
  .link-list a {
    color: var(--teal);
    text-decoration: none;
  }
  .link-list a:hover,
  .link-list a:focus-visible {
    text-decoration: underline;
    text-underline-offset: 4px;
  }
  .footer-strip {
    margin-top: 48px;
    padding-top: 24px;
    border-top: 0.5px solid var(--border-paper);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .copyright {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--ink-secondary);
  }
  @media (max-width: 768px) {
    .footer-columns {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .footer-strip {
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;
    }
    .site-footer {
      padding: 40px 24px;
    }
  }
</style>
```

- [ ] **Step 3: Verify in browser**

Refresh `http://localhost:4321/`. Expected:
- 3 footer columns: CONTACT / SUBSCRIBE / DASHBOARD with stamp-amber headers
- All links readable in teal mono
- LIGHT · DARK toggle bottom-left, copyright bottom-right
- Click DARK → page bg + paper inverts (dark mode tokens active) + cookie set
- Click LIGHT → returns to light mode

Open DevTools cookies → confirm `sw-theme=dark` (or light) after toggling.

- [ ] **Step 4: Commit**

```bash
git add src/components/chrome/SiteFooter.astro src/components/chrome/ThemeToggle.astro
git commit -m "feat(phase-2): SiteFooter (3-column) + ThemeToggle (text labels + cookie)"
```

---

## Section 5 — Static API seeds

The Daily Driver agent writes these endpoints at 08:45 daily in production. For v1 we hand-seed today's content; the agent extension wiring is Phase 4.

### Task 5.1: Dateline JSON seed

**Files:**
- Create: `public/api/dateline.json`

- [ ] **Step 1: Write today's dateline**

```json
{
  "date_iso": "2026-05-21",
  "date_display": "BOSTON, MAY 21, 2026",
  "pattern": "fleet_pulse",
  "body": "phase 0 closed. 6 cartoon cels, 4 OG cards, 3 favicons committed. astro 5 scaffold next.",
  "updated_at": "2026-05-21T08:45:00-04:00"
}
```

Per hero-spec §8 patterns. `body` is hand-written today; Daily Driver replaces it in Phase 4.

### Task 5.2: Next-piece JSON seed

**Files:**
- Create: `public/api/next-piece.json`

- [ ] **Step 1: Write next-piece**

```json
{
  "title": "Vault Scorecard",
  "date_target": "2026-06-03",
  "updated_at": "2026-05-21T08:45:00-04:00"
}
```

Per projects-spec §4 — Vault Scorecard ships 6/3, the closest queue date.

- [ ] **Step 2: Commit both seeds together**

```bash
git add public/api/dateline.json public/api/next-piece.json
git commit -m "feat(phase-2): hand-seed dateline.json + next-piece.json (Daily Driver writes these in Phase 4)"
```

---

## Section 6 — Hero

### Task 6.1: Dateline component

**Files:**
- Create: `src/components/hero/Dateline.astro`

- [ ] **Step 1: Write the dateline reading from /api/dateline.json**

```astro
---
/**
 * Hero dateline strip — reads /api/dateline.json at build time and renders the
 * fleet_pulse / ship_log / reading_log / now_line / ledger_row pattern.
 * Source: hero-spec §8.
 */
import datelineData from "../../../public/api/dateline.json";

const { date_display, body } = datelineData;
---

<div class="dateline-strip">
  <p class="dateline-line">
    <span class="stamp">{date_display} —</span>
    <span class="body">{body}</span>
  </p>
  <hr class="dateline-rule" />
</div>

<style>
  .dateline-strip {
    margin-bottom: 30px;
  }
  .dateline-line {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.2px;
    line-height: 1.4;
    color: var(--ink-secondary);
    margin-bottom: 30px;
  }
  .stamp {
    color: var(--stamp-amber);
    font-weight: 500;
    margin-right: 4px;
  }
  .dateline-rule {
    height: 0;
    border: 0;
    border-top: 0.5px solid var(--border-paper);
    margin: 0;
  }
  @media (max-width: 768px) {
    .dateline-line {
      font-size: 11px;
    }
  }
</style>
```

### Task 6.2: HeroIconCycle component

**Files:**
- Create: `src/components/hero/HeroIconCycle.astro`
- Create: `src/scripts/hero-icon-cycle.js`

- [ ] **Step 1: Write the icon-cycle markup**

```astro
---
/**
 * Hero intro icon cycle — 8 stacked WebPs that crossfade in sequence for
 * 4.8s before the WebM character animation fades in.
 * Source: hero-spec §7.5.
 */

const icons = [
  { src: "/assets/hero-icons/icon-1-loop.webp",        alt: "" },
  { src: "/assets/hero-icons/icon-2-terminal.webp",    alt: "" },
  { src: "/assets/hero-icons/icon-3-graph.webp",       alt: "" },
  { src: "/assets/hero-icons/icon-4-pencil.webp",      alt: "" },
  { src: "/assets/hero-icons/icon-5-sticky-note.webp", alt: "" },
  { src: "/assets/hero-icons/icon-6-matrix.webp",      alt: "" },
  { src: "/assets/hero-icons/icon-7-claude.webp",      alt: "" },
  { src: "/assets/hero-icons/icon-8-coffee.webp",      alt: "" },
];
---

<div class="hero-intro-cycle" aria-hidden="true">
  {icons.map((icon, i) => (
    <img
      src={icon.src}
      alt={icon.alt}
      data-cycle-index={i}
      class={i === 0 ? "active" : ""}
      loading={i === 0 ? "eager" : "lazy"}
    />
  ))}
</div>

<style>
  .hero-intro-cycle {
    position: absolute;
    inset: 0;
    z-index: 21;
    pointer-events: none;
  }
  .hero-intro-cycle img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: bottom right;
    opacity: 0;
    transition: opacity 120ms linear;
  }
  .hero-intro-cycle img.active {
    opacity: 1;
  }
  @media (prefers-reduced-motion: reduce) {
    /* Static icon-7-claude only (the "agents made literal" frame). */
    .hero-intro-cycle img {
      display: none;
    }
    .hero-intro-cycle img[data-cycle-index="6"] {
      display: block;
      opacity: 1;
    }
  }
</style>
```

- [ ] **Step 2: Write the cycle controller (vanilla JS module)**

Create `src/scripts/hero-icon-cycle.js`:

```js
/**
 * Hero icon cycle controller (hero-spec §7.5.4).
 * - Advances active class on 8 stacked icons every 600ms
 * - Coordinates the final crossfade with WebM readyState >= 3
 * - Once per session via sessionStorage
 */

const CYCLE_INTERVAL_MS = 600;
const ICON_COUNT = 8;
const FINAL_CROSSFADE_MS = 300;
const SESSION_KEY = "hero-cycle-played";

export function initHeroIconCycle({ container, video }) {
  if (!container || !video) return;

  // Reduced motion: skip the cycle entirely. The CSS keeps icon-7 visible.
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return;

  // Once-per-session bypass: skip to WebM steady state.
  if (sessionStorage.getItem(SESSION_KEY) === "true") {
    container.style.display = "none";
    video.style.opacity = "1";
    video.play().catch(() => {});
    return;
  }

  const icons = Array.from(container.querySelectorAll("img"));
  let i = 0;

  function advance() {
    icons[i].classList.remove("active");
    i = (i + 1) % ICON_COUNT;
    icons[i].classList.add("active");
    if (i < ICON_COUNT - 1) {
      setTimeout(advance, CYCLE_INTERVAL_MS);
    } else {
      // Last icon (icon-8) — hold for one beat, then crossfade to WebM
      setTimeout(handleFinalCrossfade, CYCLE_INTERVAL_MS);
    }
  }

  function handleFinalCrossfade() {
    function crossfade() {
      video.style.transition = `opacity ${FINAL_CROSSFADE_MS}ms linear`;
      video.style.opacity = "1";
      container.style.transition = `opacity ${FINAL_CROSSFADE_MS}ms linear`;
      container.style.opacity = "0";
      video.play().catch(() => {});
      setTimeout(() => {
        container.remove();
        sessionStorage.setItem(SESSION_KEY, "true");
      }, FINAL_CROSSFADE_MS + 50);
    }

    if (video.readyState >= 3) {
      crossfade();
    } else {
      video.addEventListener("canplay", crossfade, { once: true });
    }
  }

  // Start cycle (icon-0 already active in HTML)
  setTimeout(advance, CYCLE_INTERVAL_MS);
}
```

### Task 6.3: CharacterLane (WebM + intro cycle wrapper)

**Files:**
- Create: `src/components/hero/CharacterLane.astro`

- [ ] **Step 1: Write CharacterLane**

```astro
---
/**
 * Hero character lane — flush-right WebM + intro icon cycle + floor shadow.
 * Source: hero-spec §7, §7.5; texture-spec §5.
 */
import HeroIconCycle from "./HeroIconCycle.astro";
import { HERO_LOOP_WEBM, HERO_LOOP_POSTER } from "~/lib/site";
---

<div class="character" aria-hidden="true">
  <img
    class="hero-floor-shadow"
    src="/assets/textures/hero-floor-shadow.png"
    alt=""
    loading="eager"
    decoding="async"
  />
  <HeroIconCycle />
  <video
    class="character-video"
    src={HERO_LOOP_WEBM}
    poster={HERO_LOOP_POSTER}
    muted
    loop
    playsinline
    preload="auto"
    data-state="pending"
  />
</div>

<script>
  import { initHeroIconCycle } from "~/scripts/hero-icon-cycle.js";

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".hero-intro-cycle");
    const video = document.querySelector(".character-video");
    if (container && video) {
      initHeroIconCycle({ container, video });
    }
  });
</script>

<style>
  .character {
    position: absolute;
    width: 1024px;
    height: 576px;
    right: -180px;
    bottom: 80px;
    z-index: 20;
    pointer-events: none;
  }
  .hero-floor-shadow {
    position: absolute;
    width: 100%;
    height: 30%;
    bottom: 0;
    left: 0;
    object-fit: cover;
    object-position: bottom right;
    z-index: 18;
    pointer-events: none;
  }
  .character-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: bottom right;
    z-index: 20;
    opacity: 0;
  }
  @media (max-width: 1024px) {
    .character {
      width: 420px;
      height: 240px;
      right: -24px;
      bottom: -10px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    /* No video mounted in JS — but we hide it via CSS as a defensive measure. */
    .character-video {
      display: none;
    }
  }
</style>
```

### Task 6.4: Hero composition

**Files:**
- Create: `src/components/hero/Hero.astro`

- [ ] **Step 1: Write Hero**

```astro
---
/**
 * Hero — composition wrapper. Layouts the dateline, name, role tag, tagline,
 * and the absolute-positioned character lane.
 * Source: hero-spec §2-§6.
 */
import Dateline from "./Dateline.astro";
import CharacterLane from "./CharacterLane.astro";

const NAME = "Sean Winslow";
const ROLE = "AI PRODUCT MANAGER";
const TAGLINE = "Product Manager. The agents handle the loops. I handle the taste.";
---

<section class="hero page-sheet">
  <div class="hero-inner">
    <Dateline />
    <h1 class="hero-name">{NAME}</h1>
    <p class="hero-role">/ {ROLE}</p>
    <p class="hero-tagline">{TAGLINE}</p>
  </div>
  <CharacterLane />
</section>

<style>
  .hero {
    position: relative;
    overflow: hidden;
    min-height: 720px;
    padding: 60px 52px;
  }
  .hero-inner {
    position: relative;
    z-index: 20;
    max-width: 1120px;
    margin: 0 auto;
  }
  .hero-name {
    font-family: var(--font-serif);
    font-size: clamp(56px, 7.2vw, 130px);
    font-weight: 400;
    line-height: 1.05;
    letter-spacing: -0.8px;
    color: var(--teal);
    margin: 0;
    /* Stagger entrance */
    opacity: 0;
    animation: heroNameIn 600ms var(--ease-out) 400ms forwards;
  }
  .hero-role {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1.8px;
    line-height: 1.4;
    color: var(--ink-secondary);
    text-transform: uppercase;
    margin-top: 12px;
    opacity: 0;
    transform: translateY(8px);
    animation: heroRoleIn 300ms var(--ease-out) 700ms forwards;
  }
  .hero-tagline {
    font-family: var(--font-serif);
    font-size: clamp(26px, 3.2vw, 56px);
    font-weight: 300;
    line-height: 1.22;
    letter-spacing: -0.3px;
    color: var(--ink);
    max-width: 600px;
    margin-top: 56px;
    opacity: 0;
    transform: translateY(28px);
    animation: heroTaglineIn 700ms var(--ease-out-quart) 900ms forwards;
  }

  @keyframes heroNameIn {
    to {
      opacity: 1;
    }
  }
  @keyframes heroRoleIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes heroTaglineIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    .hero {
      min-height: 640px;
      padding: 40px 24px;
    }
    .hero-name {
      font-size: 56px;
    }
    .hero-tagline {
      font-size: 26px;
      max-width: none;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-name,
    .hero-role,
    .hero-tagline {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: Wire Hero into index.astro**

Replace `src/pages/index.astro`:

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
import Hero from "~/components/hero/Hero.astro";
---

<BaseLayout title="Sean Winslow — AI Product Manager" noChrome={true}>
  <Hero />
</BaseLayout>
```

- [ ] **Step 3: Visual verify**

Refresh `http://localhost:4321/`. Expected:
- Teal `#0A3E42` chrome bg edge-to-edge
- Cream paper sheet inside with the texture grain
- Dateline strip at top: stamp `BOSTON, MAY 21, 2026 —` in stamp-amber + body in secondary-ink + 0.5px teal rule
- `Sean Winslow` in huge teal Newsreader (~130px on a wide viewport)
- `/ AI PRODUCT MANAGER` role tag in mono secondary-ink
- Tagline `Product Manager. The agents handle the loops. I handle the taste.` in lighter Newsreader weight 300
- Character lane on the right — icon-cycle plays (8 icons crossfade ~4.8s) → final crossfade → WebM plays continuously
- Reload the page: cycle plays again first time; subsequent reloads within the same browser session SKIP the cycle and go straight to the WebM (sessionStorage check)

Open DevTools → set "prefers-reduced-motion" to "reduce" via Rendering panel → reload → expected: no cycle, no WebM playback, just a static icon-7-claude in the lane.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero/ src/scripts/hero-icon-cycle.js src/pages/index.astro
git commit -m "feat(phase-2): Hero (Dateline + Name + Role + Tagline + CharacterLane with intro icon cycle + WebM)"
```

### Task 6.5: Custom cursor (React island)

**Files:**
- Create: `src/components/Cursor.tsx`

- [ ] **Step 1: Write Cursor**

```tsx
/**
 * Custom cursor — RAF-driven lerp + hover state class toggles.
 * Source: hero-spec §9.
 */
import { useEffect, useRef } from "react";

const LERP = 0.15;
const DEFAULT_SIZE = 6;
const HOVER_NAME_SIZE = 60;
const HOVER_DURATION = 160; // ms — Emil snap-feedback

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const el = cursorRef.current;
    if (!el) return;
    el.style.display = "block";

    function onMove(e: MouseEvent) {
      stateRef.current.targetX = e.clientX;
      stateRef.current.targetY = e.clientY;
    }

    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!el) return;
      if (target.closest(".hero-name")) {
        el.classList.add("cursor--hover-name");
      } else if (target.closest(".character")) {
        el.classList.add("cursor--hover-character");
      }
    }

    function onMouseOut() {
      el?.classList.remove("cursor--hover-name", "cursor--hover-character");
    }

    let raf = 0;
    function tick() {
      const s = stateRef.current;
      s.currentX += (s.targetX - s.currentX) * LERP;
      s.currentY += (s.targetY - s.currentY) * LERP;
      if (el) {
        el.style.transform = `translate3d(${s.currentX}px, ${s.currentY}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mouseout", onMouseOut);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: DEFAULT_SIZE,
        height: DEFAULT_SIZE,
        borderRadius: "50%",
        backgroundColor: "#1A1A1E",
        pointerEvents: "none",
        zIndex: 800,
        mixBlendMode: "difference",
        transition: `width ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), height ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), margin ${HOVER_DURATION}ms cubic-bezier(0.23, 1, 0.32, 1)`,
        marginLeft: -DEFAULT_SIZE / 2,
        marginTop: -DEFAULT_SIZE / 2,
        display: "none",
      }}
      className="cursor"
    />
  );
}
```

- [ ] **Step 2: Mount the cursor in BaseLayout**

Edit `src/layouts/BaseLayout.astro` — add the React import + render below `<SkipLink />`:

```astro
---
// ... existing imports ...
import Cursor from "~/components/Cursor.tsx";
---
<!-- ... existing head ... -->
<body>
  <SkipLink />
  <Cursor client:load />
  <main id="main-content">
    <slot />
  </main>
  <SiteFooter />

  <style is:global>
    .cursor--hover-name {
      width: 60px !important;
      height: 60px !important;
      margin-left: -30px !important;
      margin-top: -30px !important;
    }
    .cursor--hover-character {
      /* Future easter egg: pencil-icon cursor. v1 keeps the same dot. */
    }
  </style>
</body>
```

- [ ] **Step 3: Verify**

Refresh. Move the mouse over the `Sean Winslow` heading — the dot should expand to a 60px circle with `mix-blend-mode: difference` inverting over the teal text. Move away — returns to 6px dot.

Touch device or reduced-motion environment → cursor element renders as `display: none` (the page-native cursor returns).

- [ ] **Step 4: Commit**

```bash
git add src/components/Cursor.tsx src/layouts/BaseLayout.astro
git commit -m "feat(phase-2): custom cursor React island with lerp + hover-state class toggles"
```

---

## Section 7 — Projects section

### Task 7.1: Work content collection schema + MDX files

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/work/animation-pipeline.mdx`
- Create: `src/content/work/code-brain.mdx`
- Create: `src/content/work/intent-engineering-mcp.mdx`
- Create: `src/content/work/the-block.mdx`
- Create: `src/content/work/16bitfit.mdx`

- [ ] **Step 1: Define the content collection**

Write `src/content/config.ts`:

```ts
import { defineCollection, z } from "astro:content";

const work = defineCollection({
  type: "content",
  schema: z.object({
    slug: z.string(),
    frame: z.enum(["A-1", "A-2", "A-3", "A-4", "A-5"]),
    title: z.string(),
    tagline: z.string().optional(),
    status: z.enum(["ACTIVE", "COMING", "PAUSED", "ARCHIVED", "SHIPPED"]),
    tags: z.array(z.string()),
    hero_media: z.string(),
    hero_media_type: z.enum(["video", "image"]),
    hero_media_alt: z.string(),
    order: z.number().int().min(1).max(5),
    date_started: z.string().optional(),
    date_active_through: z.string().optional(),
    case_study_dateline_pattern: z
      .enum(["fleet_pulse", "ship_log", "reading_log", "now_line", "ledger_row"])
      .optional(),
  }),
});

export const collections = { work };
```

- [ ] **Step 2: Write the 5 MDX files** (each per projects-spec §3 + Appendix B)

`src/content/work/animation-pipeline.mdx`:

```mdx
---
slug: animation-pipeline
frame: A-1
title: 2D Animation Pipeline
status: ACTIVE
tags:
  - animation
  - agentic
  - pipeline
hero_media: /assets/projects/animation-pipeline.webp
hero_media_type: image
hero_media_alt: A pencil-test frame from Sean's portfolio short, mid-walk.
order: 1
date_started: 2026-03-15
date_active_through: 2026-06-11
case_study_dateline_pattern: ship_log
---

Placeholder body content. Replaced in Phase 3 (case-study spec).
```

`src/content/work/code-brain.mdx`:

```mdx
---
slug: code-brain
frame: A-2
title: Code Brain
status: ACTIVE
tags:
  - agents
  - mcp
  - ai-pm
hero_media: /assets/projects/code-brain.webp
hero_media_type: image
hero_media_alt: A diagram of the Code Brain agent fleet — 3 domains, 14 SDK agents.
order: 2
date_started: 2026-02-01
case_study_dateline_pattern: fleet_pulse
---

Placeholder body content. Replaced in Phase 3.
```

`src/content/work/intent-engineering-mcp.mdx`:

```mdx
---
slug: intent-engineering-mcp
frame: A-3
title: Intent Engineering MCP
tagline: Drawing up agents to act with intent.
status: SHIPPED
tags:
  - mcp
  - ai-pm
  - infrastructure
hero_media: /assets/projects/intent-engineering-mcp.png
hero_media_type: image
hero_media_alt: Terminal showing npm install @swins/intent-engineering-mcp resolving.
order: 3
date_started: 2026-04-20
date_active_through: 2026-05-12
case_study_dateline_pattern: ship_log
---

Placeholder body content. Replaced in Phase 3.
```

`src/content/work/the-block.mdx`:

```mdx
---
slug: the-block
frame: A-4
title: The Block — Campus + RevOps
status: ARCHIVED
tags:
  - pm
  - b2b
  - crypto
hero_media: /assets/projects/the-block.webp
hero_media_type: image
hero_media_alt: A sanitized product screenshot from The Block.
order: 4
date_started: 2024-09-01
date_active_through: 2026-05-04
case_study_dateline_pattern: now_line
---

Placeholder body content. Replaced in Phase 3.
```

`src/content/work/16bitfit.mdx`:

```mdx
---
slug: 16bitfit
frame: A-5
title: 16BitFit Battle Mode
status: PAUSED
tags:
  - game
  - agentic
  - phaser
hero_media: /assets/projects/16bitfit.webp
hero_media_type: image
hero_media_alt: A sprite collision frame from 16BitFit Battle Mode.
order: 5
date_started: 2025-11-01
case_study_dateline_pattern: reading_log
---

Placeholder body content. Replaced in Phase 3.
```

- [ ] **Step 3: Stage placeholder tile media**

Until real tile media exists, use cropped OG cards / placeholders for v1:

```bash
mkdir -p public/assets/projects
# A-3: reuse the OG card we already authored (it carries the SHIPPED stamp + tagline)
cp public/og-cards/vault-knowledge-mcp.png public/assets/projects/intent-engineering-mcp.png
```

For A-1, A-2, A-4, A-5: create flat-color placeholder WebPs:

```bash
python3 -c "
from PIL import Image
import os
out_dir = '/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/public/assets/projects'
placeholders = {
    'animation-pipeline.webp': (250, 199, 117),  # amber-mid
    'code-brain.webp': (10, 62, 66),             # teal
    'the-block.webp': (84, 110, 113),            # ink-secondary
    '16bitfit.webp': (124, 45, 18),              # stamp-amber
}
for fname, color in placeholders.items():
    img = Image.new('RGB', (800, 1000), color)
    img.save(os.path.join(out_dir, fname), 'WEBP', quality=80)
    print(f'  → {fname}')
"
```

Expected: 4 placeholder WebPs created at flat status-coded colors.

- [ ] **Step 4: Commit**

```bash
git add src/content/config.ts src/content/work/ public/assets/projects/
git commit -m "feat(phase-2): work content collection schema + 5 MDX files + placeholder tile media"
```

### Task 7.2: Status pill + tile + next-in-production + dateline label

**Files:**
- Create: `src/components/projects/StatusPill.astro`
- Create: `src/components/projects/ProjectTile.astro`
- Create: `src/components/projects/NextInProduction.astro`
- Create: `src/components/projects/DatelineLabel.astro`
- Create: `src/components/projects/PencilAnnotation.astro`

- [ ] **Step 1: StatusPill**

```astro
---
/**
 * Status pill — site-chrome / projects-spec §3.
 * 5-value enum: ACTIVE | COMING | PAUSED | ARCHIVED | SHIPPED.
 */
interface Props {
  status: "ACTIVE" | "COMING" | "PAUSED" | "ARCHIVED" | "SHIPPED";
}
const { status } = Astro.props;

const colorMap: Record<Props["status"], string> = {
  ACTIVE: "var(--stamp-amber)",
  COMING: "var(--stamp-amber)",
  PAUSED: "var(--ink-secondary)",
  ARCHIVED: "var(--ink-secondary)",
  SHIPPED: "var(--success-teal)",
};
---

<span class="status-pill" data-status={status} style={`color: ${colorMap[status]};`}>{status}</span>

<style>
  .status-pill {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    background-color: var(--paper);
    padding: 4px 10px;
    border-radius: 2px;
  }
  .status-pill[data-status="COMING"] {
    animation: pillPulse 2s ease-in-out infinite;
  }
  @keyframes pillPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  @media (prefers-reduced-motion: reduce) {
    .status-pill[data-status="COMING"] {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 2: ProjectTile**

```astro
---
/**
 * Project tile — 4:5 portrait, media on top + metadata strip on bottom 25%.
 * Source: projects-spec §3, §6, §8.
 */
import StatusPill from "./StatusPill.astro";

interface Props {
  slug: string;
  frame: string;
  title: string;
  tagline?: string;
  status: "ACTIVE" | "COMING" | "PAUSED" | "ARCHIVED" | "SHIPPED";
  tags: string[];
  hero_media: string;
  hero_media_type: "image" | "video";
  hero_media_alt: string;
}

const { slug, frame, title, tagline, status, tags, hero_media, hero_media_type, hero_media_alt } = Astro.props;
---

<a
  href={`/work/${slug}`}
  class="project-tile"
  aria-label={`View case study: ${title}`}
  data-cursor-preview={hero_media}
>
  <div class="tile-media" style={`view-transition-name: hero-media-${slug};`}>
    {hero_media_type === "video" ? (
      <video src={hero_media} autoplay muted loop playsinline aria-label={hero_media_alt}></video>
    ) : (
      <img src={hero_media} alt={hero_media_alt} loading="lazy" />
    )}
  </div>
  <div class="tile-meta">
    <div class="tile-meta-top">
      <span class="frame">{frame}</span>
      <StatusPill status={status} />
    </div>
    <h3 class="title">{title}</h3>
    {tagline && <p class="tagline">{tagline}</p>}
    <p class="tags">{tags.join(" · ")}</p>
  </div>
</a>

<style>
  .project-tile {
    position: relative;
    display: block;
    aspect-ratio: 4 / 5;
    width: 100%;
    overflow: hidden;
    border: 0.5px solid rgba(255, 249, 240, 0.08);
    background: transparent;
    text-decoration: none;
    transition: border-color 200ms var(--ease-out);
  }
  .project-tile:hover {
    border-color: rgba(255, 249, 240, 0.25);
  }
  .tile-media {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .tile-media img,
  .tile-media video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 220ms var(--ease-snap);
  }
  .project-tile:hover .tile-media img,
  .project-tile:hover .tile-media video {
    transform: scale(1.03);
  }
  .tile-meta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px 20px 20px;
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  }
  .tile-meta-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
  .frame {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
    color: var(--amber-mid);
  }
  .title {
    font-family: var(--font-serif);
    font-size: 20px;
    font-weight: 400;
    line-height: 1.2;
    color: var(--paper);
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .tagline {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0.4px;
    color: rgba(255, 249, 240, 0.75);
    margin-bottom: 4px;
  }
  .tags {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1.2px;
    color: rgba(255, 249, 240, 0.65);
  }
  @media (prefers-reduced-motion: reduce) {
    .project-tile:hover .tile-media img,
    .project-tile:hover .tile-media video {
      transform: none;
    }
    .tile-media video {
      animation-play-state: paused;
    }
  }
</style>
```

- [ ] **Step 3: NextInProduction**

```astro
---
/**
 * 6th-tile dashed-border "next in production" card.
 * Source: projects-spec §4.
 */
import nextPiece from "../../../public/api/next-piece.json";

const { title, date_target } = nextPiece;

// Format `2026-06-11` → `~jun 11`
function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const month = d.toLocaleString("en-US", { month: "short" }).toLowerCase();
  return `~${month} ${d.getDate()}`;
}
---

<div class="next-in-production">
  <h3>next piece in production</h3>
  <p class="subtitle">check back {formatDate(date_target)}</p>
</div>

<style>
  .next-in-production {
    aspect-ratio: 4 / 5;
    border: 1.5px dashed rgba(255, 249, 240, 0.4);
    background: transparent;
    padding: 32px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: border-color 200ms var(--ease-out);
  }
  .next-in-production:hover {
    border-color: rgba(255, 249, 240, 1);
  }
  h3 {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 300;
    line-height: 1.2;
    color: var(--paper);
    margin: 0;
  }
  .subtitle {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.4px;
    color: var(--stamp-amber);
    margin: 0;
  }
</style>
```

- [ ] **Step 4: DatelineLabel**

```astro
---
/**
 * Projects-section dateline label — top-left of the splash.
 * Source: projects-spec §2.
 */
import { getCollection } from "astro:content";

const work = await getCollection("work");
const count = work.length;
const today = "2026-05-21"; // pulled from dateline.json eventually; static for v1
---

<div class="projects-dateline">
  <p class="label">WORK · {count} PIECES · UPDATED {today}</p>
</div>

<style>
  .projects-dateline {
    margin-bottom: 60px;
  }
  .label {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.6px;
    line-height: 1.4;
    color: var(--paper);
    text-transform: uppercase;
    margin: 0;
  }
  @media (max-width: 768px) {
    .label {
      font-size: 11px;
    }
  }
</style>
```

- [ ] **Step 5: PencilAnnotation (3 inline SVG variants)**

```astro
---
/**
 * Pencil annotations — projects-spec §9. Three variants:
 * - "updated-weekly" curved arrow
 * - "rev 3" scribble
 * - registration mark
 *
 * For v1, inline SVGs. Per about-spec §1.2 the about-page annotations are
 * deferred to v2; the projects-spec §9 annotations stay in v1.
 */
interface Props {
  variant: "updated-weekly" | "rev-3" | "registration-mark";
}
const { variant } = Astro.props;
---

{variant === "updated-weekly" && (
  <svg class="annotation annotation--updated-weekly" viewBox="0 0 220 60" aria-hidden="true">
    <path
      d="M10 30 Q 60 5 120 25 T 200 25"
      fill="none"
      stroke="rgba(255, 249, 240, 0.5)"
      stroke-width="1.2"
      stroke-linecap="round"
    />
    <path
      d="M195 20 L 200 25 L 195 30"
      fill="none"
      stroke="rgba(255, 249, 240, 0.5)"
      stroke-width="1.2"
      stroke-linecap="round"
    />
    <text x="80" y="55" font-family="Caveat, cursive" font-size="18" fill="rgba(255, 249, 240, 0.6)">updated weekly</text>
  </svg>
)}

{variant === "rev-3" && (
  <svg class="annotation annotation--rev-3" viewBox="0 0 60 40" aria-hidden="true">
    <text x="4" y="20" font-family="Caveat, cursive" font-size="18" fill="rgba(255, 249, 240, 0.6)" transform="rotate(-8, 4, 20)">rev 3</text>
    <path d="M4 26 L 36 26" stroke="rgba(255, 249, 240, 0.5)" stroke-width="1.2" stroke-linecap="round" />
  </svg>
)}

{variant === "registration-mark" && (
  <svg class="annotation annotation--registration-mark" viewBox="0 0 40 40" aria-hidden="true">
    <path d="M20 4 L 20 36 M 4 20 L 36 20" stroke="rgba(255, 249, 240, 0.5)" stroke-width="1.2" stroke-linecap="round" />
    <path d="M14 4 L 14 8 M 26 4 L 26 8 M 4 14 L 8 14 M 4 26 L 8 26" stroke="rgba(255, 249, 240, 0.5)" stroke-width="1.2" stroke-linecap="round" />
  </svg>
)}

<style>
  .annotation {
    position: absolute;
    opacity: 0;
    animation: annoIn 800ms var(--ease-out) 600ms forwards;
    pointer-events: none;
  }
  @keyframes annoIn {
    to { opacity: 1; }
  }
  @media (max-width: 768px) {
    .annotation { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .annotation { opacity: 1; animation: none; }
  }
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/projects/
git commit -m "feat(phase-2): project tile + status pill + next-in-production + dateline label + pencil annotations"
```

### Task 7.3: ProjectsSection composition

**Files:**
- Create: `src/components/projects/ProjectsSection.astro`

- [ ] **Step 1: Write ProjectsSection**

```astro
---
/**
 * Projects section — full-bleed teal splash, torn-paper edges, 3×2 grid.
 * Source: projects-spec §2, §5, §6, §7.
 */
import { getCollection } from "astro:content";
import ProjectTile from "./ProjectTile.astro";
import NextInProduction from "./NextInProduction.astro";
import DatelineLabel from "./DatelineLabel.astro";
import PencilAnnotation from "./PencilAnnotation.astro";

const work = await getCollection("work");
const sorted = work.sort((a, b) => a.data.order - b.data.order);
---

<section class="projects section-splash-teal">
  <img
    src="/assets/textures/tear-edge.png"
    class="tear-divider tear-divider--top"
    alt=""
    aria-hidden="true"
  />
  <div class="projects-inner">
    <div class="dateline-block">
      <DatelineLabel />
      <PencilAnnotation variant="updated-weekly" />
    </div>
    <div class="grid">
      {sorted.map((entry, i) => (
        <div class="grid-cell">
          <ProjectTile
            slug={entry.data.slug}
            frame={entry.data.frame}
            title={entry.data.title}
            tagline={entry.data.tagline}
            status={entry.data.status}
            tags={entry.data.tags}
            hero_media={entry.data.hero_media}
            hero_media_type={entry.data.hero_media_type}
            hero_media_alt={entry.data.hero_media_alt}
          />
          {i === 0 && <PencilAnnotation variant="rev-3" />}
        </div>
      ))}
      <div class="grid-cell">
        <NextInProduction />
      </div>
    </div>
    <PencilAnnotation variant="registration-mark" />
  </div>
  <img
    src="/assets/textures/tear-edge.png"
    class="tear-divider tear-divider--bottom"
    alt=""
    aria-hidden="true"
  />
</section>

<style>
  .projects {
    position: relative;
    padding: 80px 52px;
    background-color: var(--teal);
    overflow: hidden;
  }
  .projects-inner {
    position: relative;
    max-width: 1120px;
    margin: 0 auto;
  }
  .dateline-block {
    position: relative;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px 40px;
  }
  .grid-cell {
    position: relative;
  }

  .tear-divider {
    display: block;
    width: 100%;
    height: auto;
    position: relative;
    z-index: 12;
    pointer-events: none;
    user-select: none;
  }
  .tear-divider--top {
    margin-top: -80px;
    margin-bottom: -2px;
  }
  .tear-divider--bottom {
    transform: scaleY(-1);
    margin-top: -2px;
    margin-bottom: -80px;
  }

  /* Pencil annotation positioning */
  :global(.dateline-block .annotation--updated-weekly) {
    top: 8px;
    left: 200px;
    width: 220px;
    height: 60px;
  }
  :global(.grid-cell .annotation--rev-3) {
    top: -8px;
    right: -8px;
    width: 60px;
    height: 40px;
  }
  :global(.projects-inner .annotation--registration-mark) {
    bottom: -20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }

  @media (max-width: 1024px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 640px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .projects {
      padding: 60px 24px;
    }
  }
</style>
```

- [ ] **Step 2: Mount ProjectsSection in index.astro**

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
import Hero from "~/components/hero/Hero.astro";
import ProjectsSection from "~/components/projects/ProjectsSection.astro";
---

<BaseLayout title="Sean Winslow — AI Product Manager" noChrome={true}>
  <Hero />
  <ProjectsSection />
</BaseLayout>
```

- [ ] **Step 3: Visual verify**

Refresh. Expected:
- Hero ends in a torn-paper edge revealing teal below
- Projects section full-bleed teal `#0A3E42`
- Top-left: `WORK · 5 PIECES · UPDATED 2026-05-21` in mono paper-cream
- Curved-arrow annotation with "updated weekly" caption beside it
- 6-cell grid (3 columns × 2 rows on desktop): 5 tiles (animation-pipeline / code-brain / intent-engineering-mcp with SHIPPED stamp + tagline / the-block / 16bitfit) + dashed next-in-production card
- Each tile shows status pill in correct color (amber / amber / success-teal / secondary / secondary)
- Hover any tile → scale(1.03) media transform + border lift
- "rev 3" annotation top-right of A-1
- Registration mark bottom-right of the grid
- Bottom torn-paper edge transitions back to paper
- Footer below

Click a tile → 404 (because `/work/[slug]` is stubbed in next task) — that's fine for now.

- [ ] **Step 4: Commit**

```bash
git add src/components/projects/ProjectsSection.astro src/pages/index.astro
git commit -m "feat(phase-2): ProjectsSection (6-cell grid + dateline + 3 pencil annotations + torn-paper edges)"
```

### Task 7.4: /work/[slug] dynamic route stub

**Files:**
- Create: `src/pages/work/[slug].astro`

- [ ] **Step 1: Write the stub**

```astro
---
/**
 * /work/[slug] — View Transition target stub. Phase 3 (case-study spec)
 * builds out the full case-study page; Phase 2 ships only enough to make
 * the tile → page View Transition land somewhere (no 404 on click).
 */
import { getCollection } from "astro:content";
import BaseLayout from "~/layouts/BaseLayout.astro";

export async function getStaticPaths() {
  const work = await getCollection("work");
  return work.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props as { entry: any };
const { data } = entry;
---

<BaseLayout title={`${data.title} — Sean Winslow`} description={data.tagline ?? data.hero_media_alt}>
  <article class="case-study-stub page-sheet">
    <div class="dateline-strip">BOSTON · {data.title.toUpperCase()} · {data.status}</div>
    <hr />
    <div class="hero-media" style={`view-transition-name: hero-media-${data.slug};`}>
      <img src={data.hero_media} alt={data.hero_media_alt} />
    </div>
    <h1>{data.title}</h1>
    {data.tagline && <p class="tagline">{data.tagline}</p>}
    <p class="placeholder-note">Case-study body lands in Phase 3.</p>
    <p><a href="/" class="mono-link">← HOME</a></p>
  </article>
</BaseLayout>

<style>
  .case-study-stub {
    padding: 60px 24px;
    max-width: 1120px;
    margin: 0 auto;
    min-height: 80vh;
  }
  .dateline-strip {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--ink-secondary);
    letter-spacing: 1.2px;
    margin-bottom: 30px;
  }
  hr {
    border: 0;
    border-top: 0.5px solid var(--border-paper);
    margin-bottom: 40px;
  }
  .hero-media {
    aspect-ratio: 16 / 9;
    overflow: hidden;
    margin-bottom: 40px;
  }
  .hero-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  h1 {
    font-family: var(--font-serif);
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 400;
    color: var(--teal);
    margin-bottom: 16px;
  }
  .tagline {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 300;
    font-style: italic;
    color: var(--ink);
    margin-bottom: 40px;
  }
  .placeholder-note {
    font-family: var(--font-mono);
    font-size: 14px;
    color: var(--ink-secondary);
    margin-bottom: 60px;
  }
  .mono-link {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    color: var(--teal);
  }
</style>
```

- [ ] **Step 2: Add ClientRouter to BaseLayout for View Transitions**

Edit `src/layouts/BaseLayout.astro` — add `import { ClientRouter } from "astro:transitions";` at the top of the frontmatter, then add `<ClientRouter />` inside `<head>` just before `</head>`:

```astro
---
// ... existing imports ...
import { ClientRouter } from "astro:transitions";
---
<head>
  <!-- ... existing tags ... -->
  <ClientRouter />
</head>
```

- [ ] **Step 3: Verify the click → page transition**

Refresh home. Click the A-1 tile. Expected: the tile media morphs/expands into the case-study stub's hero-media (`view-transition-name: hero-media-animation-pipeline` shared at both endpoints). Page renders with the title + tagline (where present) + placeholder note + ← HOME link.

If the transition doesn't morph (instant nav instead), check the browser — Firefox <128 falls back to instant; Chrome + Safari 18+ should morph. Acceptable.

- [ ] **Step 4: Commit**

```bash
git add src/pages/work/[slug].astro src/layouts/BaseLayout.astro
git commit -m "feat(phase-2): /work/[slug] dynamic route stub + ClientRouter for View Transitions"
```

---

## Section 8 — Sitemap + page metadata

### Task 8.1: Verify sitemap generation

**Files:**
- Modify (no edit needed): `astro.config.mjs` (sitemap already configured in Task 0.3)

- [ ] **Step 1: Build the site + check sitemap output**

Run: `npm run build`
Expected: build completes; `dist/sitemap-index.xml` + `dist/sitemap-0.xml` are generated.

Run: `grep -o "<loc>[^<]*</loc>" dist/sitemap-0.xml | head`
Expected: locations for `/`, `/work/animation-pipeline/`, `/work/code-brain/`, `/work/intent-engineering-mcp/`, `/work/the-block/`, `/work/16bitfit/`.

- [ ] **Step 2: Commit** (config already committed, this is verification only)

Skip — nothing to commit unless `astro.config.mjs` needed edits.

---

## Section 9 — DoD verification + recall test prep

### Task 9.1: Hero §15 DoD pass-through

- [ ] **Step 1: Walk through hero-spec §15 items 1-10**

For each item below, verify on `localhost:4321/` and note `[PASS]` / `[FAIL]` in this section. (The plan executor records results inline; if FAIL, fix the underlying issue before continuing.)

1. **Dateline reads from `/api/dateline.json`** — view-source `<p class="dateline-line">` should show today's seeded body, not a hardcoded string. ☐
2. **Character lane plays seamless WebM loop** — wait through cycle, then watch WebM for 4+ cycles; verify no visible loop-point pop. ☐
3. **Painted character flush right** — DevTools, inspect `.character` → `right: -180px`; verify no whitespace gutter between character and viewport edge on desktop. ☐
4. **Custom cursor inverts over name** — hover over `Sean Winslow`; cursor expands 6→60px with `mix-blend-mode: difference`. ☐
5. **Reduced-motion fallback** — DevTools Rendering → reduced-motion → reload; verify no `<video>` plays + static icon-7 renders. ☐
6. **Name `clamp()` scales** — resize viewport from 375px → 2560px; name scales 56px → ~135px. ☐
7. **Mobile character lane fits right margin** — Chrome DevTools device mode → iPhone 12 (390px); verify character lane sits flush right, never below the tagline. ☐
8. **Lighthouse ≥ targets** — run Lighthouse on `localhost:4321/`; Performance ≥95, Accessibility ≥95, Best Practices = 100. ☐ (Note: substrate PNG sizes may push Performance under 95 — if so, document and accept for v1 since the targets are aspirational + Sean can re-author substrate assets in v1.1.)
9. **FCP < 800ms** — Lighthouse trace → First Contentful Paint reading. ☐
10. **Recall test setup** — page is ready for 3-fresh-viewer test. ☐ (Recall test execution is Sean's task post-build, not the plan's.)

### Task 9.2: Projects §13 DoD pass-through

- [ ] **Step 1: Walk through projects-spec §13 items 1-10**

1. **Grid: 6 cells (5 tiles + next-in-production)** ☐
2. **All 5 tile media present** — placeholders are acceptable for v1; verify each `<img>` resolves. ☐
3. **Status labels contrast against teal** — visually verify amber + success-teal + secondary-ink all readable on the splash. ☐
4. **Dateline label count + date pulled** — `WORK · 5 PIECES · UPDATED 2026-05-21` matches collection count. ☐
5. **Hover on any tile → media scale + custom cursor preview** — verified above (custom-cursor preview swap is a hero-spec §9 hint; v1 implements the dot expansion only — `data-cursor-preview` attribute is present on tiles for future use). ☐
6. **Click → /work/[slug] with View Transition** — verified in Task 7.4. ☐
7. **3 pencil annotations on desktop, hidden on mobile** — resize viewport to verify. ☐
8. **Mobile single-column grid** — verified. ☐
9. **Reduced-motion: animations disabled** — verified. ☐
10. **Next-in-production pulls from real source** — verified, reads from `next-piece.json`. ☐

### Task 9.3: Site-chrome §18 DoD pass-through (footer + theme + meta tags)

- [ ] **Step 1: Walk through site-chrome §18 items 1-23**

Most items in §18 are for sub-page chrome (Phase 3). The Phase-2-relevant items:
1. **BaseLayout accepts `title` + `description?` + `ogImage?` + `noChrome?`** ☐
2. **Home page `noChrome={true}`** ☐
6. **Footer renders on every page** ☐
7. **Footer Subscribe column** (RSS links 404 in Phase 2 — that's expected, links land in Phase 3) ☐
8. **Footer Dashboard column** ☐
9. **Theme toggle text labels** ☐
10. **Theme cookie persists** ☐
11. **Dark-mode tokens defined; home hero stays light-only** ☐ (Test: toggle to dark, reload home — hero text + paper sheet stay light per hero-spec §14.)
12. **Skip link first focusable element** ☐
13. **`src/lib/site.ts` source-of-truth** ☐
16. **RSS auto-discovery in head** ☐ (Test: view-source, verify 3 `<link rel="alternate">` tags.)
17. **Sitemap auto-generated** ☐ (verified in Task 8.1)
18. **Default OG image at `/og-default.png`** ☐
21. **Lighthouse home: Performance ≥95, Accessibility ≥95, Best Practices = 100** ☐

### Task 9.4: Phase 2 plan checkpoint commit

- [ ] **Step 1: Final commit + push**

If any DoD items needed fixes, those land as additional commits. After all green:

```bash
git log --oneline | head -20  # verify the Phase 2 commit history
```

Optional push to origin if Sean has a remote configured:

```bash
git push origin main  # only if Sean confirms ready
```

---

## Section 10 — What's NOT in this plan (handoff to Phase 2b + Phase 3)

For clarity to future sessions:

| Defer | Spec | Owner plan |
|---|---|---|
| Home-about-teaser (9-card character deck) | [`home-about-teaser-spec-v1.md`](../../specs/home-about-teaser-spec-v1.md) | **Phase 2b** — write next |
| Sub-page top nav rendering | [`site-chrome-spec-v1.md`](../../specs/site-chrome-spec-v1.md) §6 | Phase 3 |
| Case-study page body | [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) | Phase 3 |
| `/transactions/` route + content collection | [`transactions-spec-v1.md`](../../specs/transactions-spec-v1.md) | Phase 3 |
| `/architecture/` route + content collection | [`architecture-spec-v1.md`](../../specs/architecture-spec-v1.md) | Phase 3 |
| `/essays/` route + content collection | [`essays-spec-v1.md`](../../specs/essays-spec-v1.md) | Phase 3 |
| `/about/` page | [`about-spec-v1.md`](../../specs/about-spec-v1.md) | Phase 3 |
| `/contact/` + `/404` minimal routes | [`site-chrome-spec-v1.md`](../../specs/site-chrome-spec-v1.md) §9, §10 | Phase 3 |
| Daily Driver agent endpoint writers | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §3.6 | Phase 4 |
| Vercel deploy | [`BLUEPRINT-COMPLETE.md`](../../specs/BLUEPRINT-COMPLETE.md) §6 Phase 4 | Phase 4 |
| Hand-authored substrate (Procreate paper tile + scanned tear edge) | [`texture-and-artifacts-spec-v1.md`](../../specs/texture-and-artifacts-spec-v1.md) §3, §4 | Optional v1.1 — Pillow substitutes ship in Phase 2 |
| Real tile media (videos for A-1, A-2, A-4, A-5) | [`projects-section-spec-v1.md`](../../specs/projects-section-spec-v1.md) §3 | Phase 3 (alongside case-study content) — placeholder WebPs ship in Phase 2 |
