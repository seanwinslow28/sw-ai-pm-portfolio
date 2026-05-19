# Texture & Artifacts Spec v1 — Build Spec

> **Status:** Drafted 2026-05-18. Foundational cross-page spec — every page-level spec (`hero-spec-v1.md`, `projects-section-spec-v1.md`, `case-study-spec-v1.md`, `about-spec-v1.md`, `transactions-spec-v1.md`, `essays-spec-v1.md`, `site-chrome-spec-v1.md`) inherits the three-layer model and the artifact vocabulary defined here. Awaiting Sean's final lock.
> **Scope:** The visual substrate of the entire site — the teal chrome backdrop, the cream paper sheets that pages render on, the torn-paper edges that bridge chrome and paper, the construction-paper background texture, the hero floor-shadow underlay, and the hand-authored artifact vocabulary (stamps, coffee rings, kid's drawing, hand-drawn annotations, signature, heading SVGs, cartoon-cel pencil-test studies). Defines authoring dimensions, file formats, repo layout, optimization pipeline, and DoD.
> **Out of scope:** Page-level component composition (lives in each page spec), copy + voice (lives in PMP), motion timeline beyond the per-artifact reveal hooks (lives in each page spec). Asset *content* (what each cartoon study depicts, which beats braid the two threads) lives in the relevant page spec, not here.
> **Buildable as-is once locked.** Hand to a Claude Code session with this file + the seven page specs open; Sean authors the assets in Procreate/Figma in parallel.

---

## 1. The spec, in one sentence

A three-layer physical model (teal chrome → cream paper → page content) plus a vocabulary of seven hand-authored artifact families, sized and pipelined so Sean authors once in Procreate or Figma and the build system optimizes + ships them with zero hand-rolled CSS-as-art.

## 1.1 Changelog

- **2026-05-18 (initial draft):** First draft of the texture + artifact substrate. Born from the build-phase discovery that the about-page prototype rendered all paper-craft artifacts (stamps, coffee rings, kid drawing, torn edges) as raw CSS rectangles + inline SVG primitives, which is acceptable for prototyping but cannot ship — the artifacts have to be *real* art objects (raster scans of physical media + crisp single-color SVG line art) to land the "this is not a template" promise. Promotes three structural decisions to spec law: (a) the **three-layer model** — every page is a cream paper sheet sitting on a full-bleed teal `#0A3E42` chrome backdrop, with torn-paper PNG dividers revealing the chrome at the edges of each page; (b) the **two-format split** — raster PNG-with-alpha for anything that needs fiber/grain/wash (paper texture, torn edges, coffee rings, kid drawing, cartoon-cel studies, hero floor-shadow), SVG for anything that needs to animate, scale, or be re-tinted (annotations, stamps, signature, hand-drawn headings); (c) the **authoring pipeline** — Procreate as the primary raster authoring tool, Figma as the primary vector authoring tool, vectorization through Figma's Image Trace or external SVG conversion, optimization via SVGO + pngquant. Two cross-spec patches flagged in §11 for the about-spec (torn-paper height + chrome reference).

---

## 2. The three-layer model

Every surface on the site is composed of three layers stacked z-axially. This is the foundational visual decision the spec is built on.

```
Z=20    PAGE CONTENT
        (lead lines, prose, B-N sections, character PNGs, cartoon cels,
         pencil annotations, stamps in margins, signatures)
                 │
        ─────────┼──── cream paper sheet boundary ─────────
                 │
Z=10    CREAM PAPER SHEET
        (#FFF9F0 base + construction-paper texture tile)
        Per-page surface; finite vertical extent;
        bounded top + bottom by torn-paper PNG edges
                 │
        ───── torn-paper edge (PNG with alpha) ────────────
                 │  ← chrome shows through alpha
Z=0     TEAL CHROME BACKDROP
        (#0A3E42 solid color, full-bleed, scrolls with page)
        Persistent surface — nav, footer, contact section live here
```

### 2.1 The chrome (Z=0)

- **Color:** `#0A3E42` (primary teal — same hex as the paper-layer's hand-drawn heading SVG color; reusing the existing palette token rather than minting a new one)
- **Extent:** Full bleed, edge-to-edge, height-of-document
- **Texture:** Flat for v1 (no grain, no noise). Revisit if the flat teal reads as too screen-y next to the textured paper — locked decision to start flat (see §11 OPEN-1).
- **Scroll behavior:** Scrolls with the page (not fixed). The chrome is part of the document flow — nav lives at the top of the chrome, footer/contact lives at the bottom of the chrome, and the paper sheets sit on the chrome in between.
- **Content that lives on the chrome:** Site nav (top), Contact section (bottom, per the about-spec hand-off), copyright + social links + time stamp (bottom strip). All other content sits on paper.

### 2.2 The cream paper sheet (Z=10)

- **Base color:** `#FFF9F0` (paper)
- **Texture:** A tiled construction-paper PNG (see §3) blended at `background-blend-mode: multiply` over the base color, so the texture adds grain without changing the perceived hue
- **Extent:** Per-page. Each route renders as one paper sheet (or in some cases multiple sheets, see §2.6). The sheet is full-width horizontally but finite vertically — it starts after the top torn edge and ends before the bottom torn edge.
- **Boundary:** Top and bottom of each sheet are torn-paper PNG dividers (§4) that reveal the teal chrome through their alpha channel
- **What lives on paper:** Everything page-level — lead lines, prose, B-N sections, character PNGs, cartoon cels, pencil annotations, in-page artifacts

### 2.3 The page content (Z=20)

Per-page surface. Each page spec defines what lives at Z=20 on its sheet. This spec defines only the *artifact vocabulary* — the reusable visual primitives every page draws from — not what each page composes from them.

### 2.4 Inverted palette on the chrome

Type and color rules **invert** between the paper layer and the chrome layer:

| Role | On paper (Z=10/20) | On chrome (Z=0) |
|---|---|---|
| Default text color | Ink `#1A1A1E` | Cream `#FFF9F0` |
| Primary accent | Teal `#0A3E42` | Amber mid-stop `#FAC775` |
| Secondary accent | Stamp amber `#7C2D12` | Stamp amber `#7C2D12` (unchanged — passes contrast on both surfaces) |
| Border whisper | `rgba(10, 62, 66, 0.15)` (teal at low alpha) | `rgba(255, 249, 240, 0.18)` (cream at low alpha) |

Cream `#FFF9F0` on teal `#0A3E42` contrast = **~13.5:1** (passes AAA at all sizes).
Ink `#1A1A1E` on paper `#FFF9F0` contrast = **~17.1:1** (passes AAA at all sizes).
The inversion is intentional — the chrome reads as "the cover" and the paper reads as "the page."

### 2.5 Z-stacking order (CSS reference)

```css
body                        { z-index: 0;   background: var(--chrome); }
.page-sheet                 { z-index: 10;  background: var(--paper) + texture; }
.tear-divider               { z-index: 12;  position: absolute; }   /* sits ABOVE the paper, BELOW the content */
.page-content               { z-index: 20; }
.character-stage            { z-index: 20; }
.hero-floor-shadow          { z-index: 18; }                        /* below character, above paper */
.annotation, .stamp         { z-index: 25; }                        /* margin-anchored, above content */
.cursor                     { z-index: 100; }
```

### 2.6 Multi-sheet pages

Most pages = one paper sheet. Some pages (e.g., a case-study page transitioning into a related-case-study teaser, or the hero transitioning into the projects section) may render as **two paper sheets with a teal chrome band visible between them**. The chrome band is the *gutter* between sheets; the torn-paper edges of both sheets reveal the chrome on opposite sides of the gutter. Decision per page lives in each page's spec.

---

## 3. The paper texture

A subtle, tileable, construction-paper PNG applied as a tiled background over the cream paper base color.

### 3.1 Why texture, not flat

Flat `#FFF9F0` reads as a screen color. The whole site's "this is not a template" thesis depends on the cream surface reading as **physical paper**, which means it needs fiber. A construction-paper texture (warm beige fibers, occasional speck inclusions, slight directional grain) is the minimum-cost intervention that gets the surface from "warm flat color" to "real paper."

### 3.2 Authoring (Procreate workflow)

| Step | Detail |
|---|---|
| 1. Canvas | Open Procreate. New canvas: **2048 × 2048 px**, sRGB color profile, 72 DPI. Delivers @2x retina; CSS will scale down to 1024px display size. |
| 2. Reference | Place a real piece of construction paper (kraft, manila, or recycled cream) under good lighting. Take a 4K photo with your phone if you don't want to draw it from scratch — you can import + trace, or you can use the photo directly (see §3.2.alt below). |
| 3. Brushes | Use Procreate's built-in **6B Pencil** brush at ~8% opacity for fiber strokes; **Old Beach** or **Soft Brush** at 4-6% opacity for wash gradients; **Pointillism** at 2-3% opacity for paper inclusions/specks. |
| 4. Color | Render fibers in **warm beige** (~`#E8D9BC` for darker fibers, ~`#F0E4CE` for lighter fibers) on a **white** background. The cream tint comes from the CSS base color underneath via `background-blend-mode: multiply`; your asset should NOT carry the cream — it carries only the texture variation. |
| 5. Direction | Paint **mostly horizontal grain** with subtle vertical cross-fibers. Real paper has fiber direction; pure isotropic noise reads as digital. |
| 6. Specks | Add 30-50 tiny specks (1-3px) at 3-5% opacity scattered randomly — recycled-paper inclusions. |
| 7. Tileability | **Critical.** Apply Procreate's offset trick: `Adjustments → Move and Transform → Magnetics off → drag canvas exactly 1024px right and 1024px down → seams now visible in middle → paint over them with the same brushes until invisible → drag back → repeat for a few iterations.` Test by duplicating the layer and offsetting — no visible repeat. |
| 8. Export | `Share → PNG`. Run the resulting file through `pngquant --quality=75-90 paper-tile.png` (or drag-drop into TinyPNG.com) to drop file size ~60%. |
| 9. Target | **≤180 KB final**, 2048×2048 source PNG with alpha. |

**§3.2.alt — Photograph path (faster):** If authoring fiber by hand feels like overkill, photograph a real piece of construction paper with even lighting and no shadows, crop to 2048×2048, run through Procreate's `Adjustments → Curves` to flatten the value range so it sits well at low blend opacity, then export. This is the quickest path to "good" — 15 minutes vs. 90.

### 3.3 Dimensions table

| Spec | Value |
|---|---|
| Procreate canvas | 2048 × 2048 px |
| Color profile | sRGB |
| Source colors | `#E8D9BC` (darker fibers) + `#F0E4CE` (lighter fibers) on white |
| Export format | PNG-24 with alpha (transparent BG, opaque fibers) |
| Target file size | ≤ 180 KB after `pngquant` |
| Display size in CSS | 1024 × 1024 px (one tile) |
| Tileability | Must be perfectly seamless — test before delivery |

### 3.4 CSS application

```css
body {
  background-color: var(--chrome);     /* #0A3E42 */
}

.page-sheet {
  background-color: var(--paper);                          /* #FFF9F0 */
  background-image: url('/assets/textures/paper-tile.png');
  background-size: 1024px 1024px;                          /* CSS pixels */
  background-repeat: repeat;
  background-blend-mode: multiply;                         /* texture multiplies into cream */
  background-attachment: scroll;                           /* not fixed — scrolls with the sheet */
}
```

If the texture reads too strong, wrap it in a top-level `<div class="texture-overlay">` with `opacity: 0.6-0.8` instead of using blend-mode — gives a finer-grained tuning knob during the build session.

### 3.5 Mobile + retina behavior

The same 2048px asset works on every viewport. On phones (~375-414 CSS px wide), the 1024px tile width is wider than the viewport — only one column of the tile shows. That's fine; the texture isn't a pattern the reader should perceive as repeating. On 4K monitors, the tile repeats ~2× horizontally and 2-3× vertically. Imperceptible if §3.2 step 7 is done right.

### 3.6 Performance budget

Single shared asset, served once, cached forever. The 180 KB cost amortizes across every page load on the site. No per-page overhead. Critical asset — `<link rel="preload" as="image" href="/assets/textures/paper-tile.png">` in the document head.

---

## 4. The torn-paper edge

A high-resolution PNG-with-alpha of a real torn paper edge, positioned between the cream paper sheet and the teal chrome.

### 4.1 Why this is raster, not SVG

SVG `<path>` jagged lines look mathematical (vertices, not fibers). `clip-path: polygon()` has the same problem (straight lines between points). SVG `<feTurbulence>` noise filters fake irregularity but never fake **fluff** — the tiny fibers extending past the main tear line that your eye locks onto when you look at real torn paper. The only technique that captures fluff is a raster scan of a real torn page. mynrd.co.uk and every other portfolio with convincing torn edges does it this way.

### 4.2 Authoring

| Step | Detail |
|---|---|
| 1. Source material | Tear a piece of cream cardstock or construction paper by hand. **Slow tear, slightly off-grain** = maximum fluff. Tear horizontally so the edge runs left-to-right. |
| 2. Photograph | Lay the torn paper on a **dark contrasting background** (charcoal felt, black foam board, dark wood). Even lighting, no shadows under the paper, phone camera held parallel to the page. Or scan at 600 DPI if you have a flatbed scanner. |
| 3. Import to Procreate | New canvas **6400 × 600 px**, sRGB, 72 DPI. Place the photograph as a layer, scale to canvas width. The tear line should run through the **vertical middle** of the canvas — ~150px of fluffy tear above, ~150px of solid paper below (or vice versa for top-edge variant). |
| 4. Isolate the paper | `Selection → Automatic → tap the dark background → Invert → Cut.` The paper is now on transparent. Clean up dust with a small eraser. |
| 5. Repaint the cream | `Layer → Alpha Lock → Fill layer with #FFF9F0.` This recolors all the paper pixels to match the site's paper hex exactly, while preserving every fiber. Critical step — the photographed cream is almost certainly the wrong hex. |
| 6. Tighten fibers (optional) | At small brush size (~2px), use the same `#FFF9F0` to extend a few stray fluff strands further past the main tear line for emphasis. ~10-20 strands. |
| 7. Export | `Share → PNG`. Run through `pngquant -Q 75-90` → target ≤ 220 KB. |

**Escape hatch:** If hand-authoring feels like overkill, Creative Market + Envato sell torn-paper edge packs ($5-15, 20-50 edges) — pick one with good fluff, recolor in Procreate per step 5. Costs less time but gives less authorial signal.

### 4.3 Dimensions table

| Spec | Value |
|---|---|
| Procreate canvas | 6400 × 600 px (@2x retina; displays at 3200 × 300) |
| Source format | Photograph or scan of real torn paper |
| Color | Cream `#FFF9F0` (recolor in Procreate post-import) |
| Background | Transparent (alpha-on-transparent PNG) |
| Tear position | Vertically centered — 150-200px of fluffy fibers, 150-200px of solid paper |
| Export format | PNG-24 with alpha |
| Target file size | ≤ 220 KB after `pngquant` |
| Deliverable count | **One** asset (`tear-edge.png`); flipped vertically via CSS for opposite-side tear |

### 4.4 CSS application

```html
<!-- Above each paper sheet (chrome-to-paper transition) -->
<section class="chrome-band">...</section>
<img src="/assets/textures/tear-edge.png"
     class="tear-divider tear-divider--top"
     alt="" aria-hidden="true" />
<section class="page-sheet">...</section>
<img src="/assets/textures/tear-edge.png"
     class="tear-divider tear-divider--bottom"
     alt="" aria-hidden="true" />
<section class="chrome-band">...</section>
```

```css
.tear-divider {
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  z-index: 12;
  pointer-events: none;
  user-select: none;
}

/* Top of sheet — chrome above, paper below */
.tear-divider--top {
  margin-top: -80px;        /* pull tear up into the chrome */
  margin-bottom: -2px;      /* hide seam into the paper */
}

/* Bottom of sheet — paper above, chrome below */
.tear-divider--bottom {
  transform: scaleY(-1);    /* flip the same asset */
  margin-top: -2px;
  margin-bottom: -80px;
}
```

The negative margins are the key trick: the tear PNG visually overlaps both the chrome above and the paper below, so there's never a visible "seam" between the layers — the cream fluff *protrudes* into the chrome, exactly how real torn paper does.

### 4.5 Per-page variants

**For v1: one asset rules them all.** A single tear edge, cream-colored, flipped via CSS for top vs. bottom. Same asset on every page-to-chrome boundary across the entire site.

Possible future variants (deferred — see §11 OPEN-2):
- A second tear with a different fiber profile, so adjacent pages don't show identical edges
- A "deep tear" variant with longer fluff strands for the home hero (most prominent visual moment)

### 4.6 Performance budget

Single shared asset, ~200 KB, cached forever. Used 2-12 times per page (top + bottom of each sheet × number of sheets). Critical asset — `<link rel="preload" as="image">` in the head. Same caching profile as the paper texture.

---

## 5. The hero floor-shadow underlay

A separate pencil-rendered PNG with alpha that sits beneath the hero character WebM to add depth — wooden floorboards with light pencil shading + a soft pencil shadow under the desk.

### 5.1 Why a separate asset, not baked into the character WebM

Three reasons it has to live as its own layer:

1. **The WebM loops; the floor doesn't.** The character animation is a short loop (typing, blinking, occasional turn-to-companion). Baking the floor into every frame triples the encoded data of every loop iteration for content that doesn't change. Inefficient.
2. **The character lives at multiple sizes.** The hero shows the character at 1024×576px; the about-page surface shows the same character at 640px tall full-body; the cursor shows the character at 64×64px. The hero floor only belongs in the hero. Separating it lets each surface show the character with the appropriate context.
3. **Z-order needs to be adjustable.** The floor sits beneath the character but on top of the paper. Other paper-layer content (lead line text on the left half of the hero) sits ABOVE the floor on the z-axis, so the floor doesn't bleed under the tagline. A separate layer lets z-index resolve this cleanly.

### 5.2 Authoring (Procreate workflow)

Compositionally similar to the reference image Sean attached — **wooden floorboards with light perspective shading + a soft pencil shadow under the desk** — but WITHOUT the hole punches at the bottom and WITHOUT the pencil writing at top-left from the reference.

| Step | Detail |
|---|---|
| 1. Canvas | New canvas: **2800 × 560 px** (@2x retina; displays at 1400 × 280). Horizontally-elongated. |
| 2. Reference layer | Drop a screenshot of the current hero prototype's character placement as a 30%-opacity reference layer. Align the character's feet/desk-base with the bottom-right region of the canvas. The character occupies roughly the right two-thirds of the asset; the left third is floor that extends past where the character is. |
| 3. Floorboard layer | Pencil-render 4-6 floorboards running into the distance with slight perspective convergence toward the right. Use the **6B Pencil** brush at ~30% opacity for boards; **HB Pencil** at ~15% for wood grain. Color: warm gray-brown (~`#9C8A78`). |
| 4. Shadow layer | Below the character/desk position, paint a soft pencil shadow. The shadow is **densest directly under the desk**, fading outward in all directions. Use **Soft Pastel** brush at 6-8% opacity, color `#3A3530` (warm dark gray). Multiple passes for opacity buildup. |
| 5. Edge fades | The asset must NOT have hard edges anywhere except where it abuts the right side of the viewport. Use a soft eraser at low opacity on the top edge (fades up to transparent), the left edge (fades left to transparent), and the bottom edge (fades down to transparent — though the bottom may be cut off by the hero section boundary anyway). The right edge can stay sharp since the character clips past the viewport per the prototype's `right: -180px`. |
| 6. Style match | The pencil rendering should feel like Sean's hand on the same paper — same warm graphite tones, same loose pencil-test register as the cartoon-cel studies (see §6.6) and the lead-line character (see hero-spec). NOT solid black. NOT a digital-photo-shadow drop. Hand-drawn pencil only. |
| 7. Export | PNG-24 with alpha. Run through `pngquant -Q 75-90` → target ≤ 160 KB. |

### 5.3 Dimensions + positioning

| Spec | Value |
|---|---|
| Procreate canvas | 2800 × 560 px (@2x retina) |
| Display size in CSS | 1400 × 280 px |
| Color palette | `#9C8A78` (warm gray-brown floorboards), `#3A3530` (warm dark gray shadow), HB graphite tones for grain |
| Background | Transparent (PNG-24 with alpha) |
| Edge fades | Top, left, bottom fade to transparent; right edge can stay solid |
| Character alignment | The character's feet/desk-base in the hero WebM (1024×576, positioned `right: -180px; bottom: 80px`) sits with feet at the bottom-right region of this asset |
| Target file size | ≤ 160 KB after `pngquant` |

### 5.4 CSS application

The hero's character `<div>` already lives in `.hero__body` with `position: relative`. The floor-shadow PNG sits inside the same parent with `position: absolute`, behind the character video on the z-axis.

```html
<div class="hero__body">
  <p class="hero__tagline">...</p>

  <div class="character-stage">
    <img src="/assets/textures/hero-floor-shadow.png"
         class="hero-floor-shadow"
         alt="" aria-hidden="true" />
    <video class="character__video" autoplay muted loop playsinline>
      <source src="/assets/character/hero-loop.webm" type="video/webm" />
    </video>
  </div>
</div>
```

```css
.character-stage {
  position: absolute;
  right: -180px;                       /* matches existing .character positioning */
  bottom: 80px;
  width: 1024px;
  height: 576px;
}

.hero-floor-shadow {
  position: absolute;
  right: -160px;                       /* slightly inset from the character's -180px */
  bottom: 40px;                        /* drops below the character's feet line */
  width: 1400px;
  height: auto;
  z-index: 18;                         /* below character (Z=20), above paper (Z=10) */
  pointer-events: none;
  user-select: none;
}

.character__video {
  position: relative;                  /* sits on top of the floor */
  z-index: 20;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: bottom right;
}
```

The `bottom: 40px` on the floor offset relative to the character's `bottom: 80px` is what makes the character's feet appear to land ON the floor — the floor's pencil shadow under the desk peeks below the character's body, anchoring the figure to a surface.

### 5.5 Mobile behavior

Hero character on mobile is smaller (per hero-spec, character scales down). The floor-shadow PNG can scale proportionally — `width: 90vw; max-width: 600px;` overrides the desktop `width: 1400px` rule below 768px. The fade-to-transparent edges keep it from getting visually awkward when scaled down.

If the floor reads as too busy on small viewports, **hide it below 480px** via `display: none` — the character on a phone is small enough that the lack of floor doesn't read as missing.

### 5.6 Reduced motion

The asset is static — no motion concern. Renders identically with or without `prefers-reduced-motion`.

---

## 6. The artifact vocabulary

Seven artifact families. Three are SVG (line art that needs to animate or re-tint), four are PNG-with-alpha (raster grain that has to survive). Each family has a single authoring workflow, a single delivery format, and a single repo home.

### 6.1 Hand-drawn annotations *(SVG)*

The pencil-margin vocabulary defined in the about-spec §14 and reused across every page.

Members:
- **Curved arrow with label** — e.g., `← this one rewires you`, `the live evidence ↗`, `updated weekly ↗`
- **Strikethrough X** — for historical/superseded artifacts
- **Registration mark** — page closeout corners; cartoon-cel registration pegs (separate component, same vocabulary)
- **Coffee ring** — *(see §6.3 — raster, not vector — listed here for cross-reference)*
- **Kid's drawing scan** — *(see §6.4 — raster, not vector)*
- **Handwritten signature** — page closeout, draws itself in via `stroke-dasharray`
- **Mono passport stamp** — *(see §6.2)*

**Authoring:** Draw in Procreate at 4× target size with a clean pencil brush (HB or 2B at ~15% opacity), export PNG, vectorize via Figma's Image Trace plugin or [vectorizer.ai](https://vectorizer.ai), clean up paths in Figma or directly in the SVG markup. Single color, single stroke, no fills.

**Critical detail for the signature + arrows:** the SVG must use `stroke` (not `fill`) for the path, with `stroke-dasharray: 0; stroke-dashoffset: <path-length>;` initial state so JS/CSS can animate `stroke-dashoffset → 0` to draw the line in.

**Delivery:**

| Asset | Source canvas | Delivery format | File budget |
|---|---|---|---|
| Curved arrow (×5 variants) | Procreate 800 × 400 | SVG (inline) | ≤ 3 KB each |
| Strikethrough X | Procreate 400 × 400 | SVG (inline) | ≤ 2 KB |
| Registration mark | Procreate 200 × 200 | SVG (inline) | ≤ 1.5 KB |
| Signature ("Sean") | Procreate 1200 × 400 | SVG with `stroke-dasharray` | ≤ 5 KB |

### 6.2 Mono passport stamps *(SVG)*

The wire-service stamps that scatter in margins (`FILED · BOSTON`, `REV 3 · 2026-05`, `PROOF / NOT FOR PRESS`, etc.).

Built in **Figma**, not Procreate — they're text + rectangle + slight rotation, fundamentally vector. The "stamped" feel comes from:
- Slight rotation (±2-6°)
- 1px stroke (not solid fill rectangle — outlined like a real rubber stamp)
- Stamp amber color `#7C2D12`
- JetBrains Mono font, weight 500, tracking 1.6px
- Tiny offsets / smudges if Sean wants extra fidelity (optional)

**Authoring (Figma):**

| Step | Detail |
|---|---|
| 1. Frame | 240 × 60 px frame (resizable; this is just a default) |
| 2. Stroke rectangle | 1px solid `#7C2D12`, 8px corner radius (slight) or 0px (sharper) |
| 3. Text | JetBrains Mono Medium 12px, tracking 1.6px, color `#7C2D12`, centered |
| 4. Rotation | Apply ±2-6° rotation to the entire frame |
| 5. Export | `Export as → SVG` |

**Per-stamp content** lives in `/src/data/about-stamps.json` (per page) — the SVG asset is a *template*, populated per-instance via a `<StampMarginalia text="FILED · BOSTON" rotation="4" />` component. So in practice there's ONE SVG template, not N stamp SVGs.

| Asset | Source | Delivery | File budget |
|---|---|---|---|
| Stamp template | Figma vector | `<StampMarginalia />` Astro component | ≤ 2 KB inline SVG |

### 6.3 Coffee ring *(PNG with alpha)*

One per page, ~30% opacity, lands on a thesis section to suggest a physical desk + a real writer.

**Authoring:**

| Step | Detail |
|---|---|
| 1. Source | Wet a real coffee cup, press it onto cream paper, photograph the ring. Or scan if you have a flatbed. |
| 2. Canvas | Procreate, 1200 × 1200 px @2x retina (delivers at 600 × 600 display) |
| 3. Isolate | Use selection tools to remove the paper background; leave only the coffee-stain pixels on transparent |
| 4. Color | Don't recolor — leave the natural coffee sepia. The ring will sit on cream paper, and the warm brown reads correctly. Optionally bump saturation if it's reading too gray. |
| 5. Opacity | Don't bake low opacity into the asset — let CSS apply `opacity: 0.3` so the asset is reusable at different intensities later. |
| 6. Export | PNG-24 with alpha. Through `pngquant -Q 75-90` → target ≤ 80 KB. |

| Asset | Source | Delivery | File budget |
|---|---|---|---|
| Coffee ring | Procreate 1200 × 1200 | PNG with alpha | ≤ 80 KB |

### 6.4 Kid's drawing scan *(PNG with alpha)*

The margin artifact in the about-spec §14 — a kid's-drawing-style scan in B-1's margin, captioned `by sean, age 6` in handwritten ink.

**Authoring:**

| Step | Detail |
|---|---|
| 1. Source | Draw a kid-style stick figure (or sketch one in Procreate using the **6B Pencil** brush with shaky-hand quality) — keep it deliberately rough, asymmetric, "by a six-year-old" |
| 2. Canvas | Procreate 1200 × 1600 px portrait orientation @2x retina (delivers at 600 × 800) |
| 3. Background | The drawing sits on a slight paper-tint rectangle inside the canvas, to suggest a "scrap of paper taped to the page" — but the OUTSIDE of that rectangle is transparent, so it composes onto the page's existing paper texture |
| 4. Caption | Write `by sean, age 6` in handwritten ink (Caveat font in Figma, OR Sean's own handwriting scanned and pasted in) below the drawing, in stamp amber `#7C2D12` |
| 5. Rotation | Apply slight rotation (-3° to +5°) to the asset as a whole, baked into the export |
| 6. Export | PNG-24 with alpha. Through `pngquant -Q 75-90` → target ≤ 100 KB. |

| Asset | Source | Delivery | File budget |
|---|---|---|---|
| Kid's drawing scan | Procreate 1200 × 1600 | PNG with alpha | ≤ 100 KB |

### 6.5 Cartoon-cel pencil-test studies *(PNG with alpha)*

The six cartoon-canon studies in the about-spec §11 — Sean's pencil-test renderings of formative cartoon characters (Wile E. Coyote, etc.).

**Authoring:** Per the about-spec OPEN-4, **Path C (hybrid)** is recommended for v1 — Sean hand-draws 2-3 to lock the visual language, then Seedream renders the remaining 3-4 from references + the anchor studies.

| Step | Detail |
|---|---|
| 1. Canvas (hand-drawn studies) | Procreate 2240 × 2480 px @2x retina (delivers at 1120 × 1240) |
| 2. Style | Pencil-test rendering — single weight strokes, no fill, suggested form via key contour + minimal shading. Match Sean's lead-line character art style for visual consistency. |
| 3. Subject placement | Character centered horizontally, leaving ~10-15% breathing room at top (the cel name strip occupies the bottom 12% — see about-spec §11.3) |
| 4. Background | Transparent (alpha-on-transparent PNG). The cel's white background comes from the `<CartoonCel />` component's CSS, not from this asset. |
| 5. Seedream rendering (for remaining 3-4 studies) | Use the hand-drawn studies as character-anchor references; prompt Seedream with the cartoon-character reference + Sean's style anchor to produce style-consistent studies in the same dimensions |
| 6. Export | PNG-24 with alpha. Through `pngquant -Q 75-90` → target ≤ 250 KB each. |

| Asset | Source | Delivery | File budget | Quantity |
|---|---|---|---|---|
| Cartoon-cel study | Procreate 2240 × 2480 | PNG with alpha | ≤ 250 KB each | 6 |

### 6.6 Hand-drawn heading SVGs *(SVG)*

The handwritten B-N section headings on the about page (`B-1 · How I got here`, etc.). Five total for the about page; additional headings for case-study, projects, transactions pages live in their own spec's asset budget but use this same authoring workflow.

**Authoring:**

| Step | Detail |
|---|---|
| 1. Canvas (per heading) | Procreate 1600 × 400 px @2x retina (delivers at 800 × 200) |
| 2. Brush | **HB Pencil** at full opacity, ~1.5-2.5mm stroke width |
| 3. Style | Sean's actual handwriting OR a custom hand-drawn style — match the signature glyph language. Match the energy of the `╱╱ B-1 · How I got here ╱╱` ASCII representation in the about-spec §2 anatomy diagram: the double-slash bookends are stylistic, not literal. |
| 4. Color | Source in primary teal `#0A3E42` — re-tintable via CSS if needed |
| 5. Vectorize | Procreate → export PNG → drop into Figma → use Image Trace plugin (or vectorizer.ai) → clean up paths → export SVG |
| 6. File hygiene | Run through SVGO with `--multipass` to flatten transforms and minify |

| Asset | Source | Delivery | File budget | Quantity |
|---|---|---|---|---|
| Heading SVG (per heading) | Procreate 1600 × 400 → Figma SVG | Inline SVG | ≤ 8 KB each | 5 for about + N per other pages |

---

## 7. Authoring pipeline

End-to-end workflow from Procreate/Figma → optimized site asset.

### 7.0 Asset authoring order (Phase 0 Gantt)

Hand-authored assets ship in three waves, each unblocking a specific build phase. Don't wait for the build to start before authoring — start Phase 0a the same week the spec is locked.

| Wave | Assets | Authoring window | Unblocks |
|---|---|---|---|
| **0a — Substrate** | `paper-tile.png` (§3), `tear-edge.png` ×3 variants (§4), hero floor-shadow `hero-floor-shadow.png` (§5) | Week 1, before hero build starts | Hero build (needs paper substrate + floor shadow), torn-edge transitions site-wide |
| **0b — Hero + projects splash** | `coffee-ring.png` (§6.3), `kid-drawing-1.png` (§6.4), `signature.svg` (§6.6 + about §6), the 3 projects annotations (curved arrow / "rev 3" scribble / registration mark) | Week 1–2, in parallel with hero build | Projects-section build (the splash + annotations land here first), about-page closeout (signature) |
| **0c — About long-form** | 6 cartoon-cel pencil-test studies (§6.5 + about §11) — path C per about §11.4 (Sean hand-draws 2–3, Seedream 2.0 renders 3–4 from anchor style) ; 5 about heading SVGs (§6.6); OG card | Week 3, in parallel with case-study build | About build (cels are §11's load-bearing artifact; without them §11 doesn't render), social-share previews |

**Asset count:** 13 mandatory PNG/SVG files + the 6 cartoon studies. Total ~19 hand-authored assets in 3 weeks.

**Gating rule:** If a Phase 0a asset slips into Week 2, the hero build cannot complete; if Phase 0b slips into Week 3, the projects build cannot complete; if Phase 0c slips, About ships as a stub. Track in the build session's open-questions log.

**OPEN:** Whether the OG card lives in this spec or in site-chrome-spec — currently undecided. Resolve at build session start.

### 7.1 Procreate workflow (raster path)

1. **Author at @2x.** Every Procreate canvas is sized at 2× the CSS display size, so the asset is retina-ready.
2. **sRGB color profile** (not P3 — Apple's wide-gamut profile won't render correctly on non-Apple browsers).
3. **Export as PNG.** Use `Share → PNG`, NOT `Share → Image` (which may compress as JPEG).
4. **AirDrop to laptop** (faster than iCloud for large files).
5. **Drop into `src/assets/<family>/staging/`** — the staging folder is for unoptimized originals; the optimized version goes one folder up.

### 7.2 Figma workflow (vector path)

1. **Author at native size** — Figma vectors don't need @2x; they scale infinitely.
2. **Convert text to outlines** before export (right-click → Outline Stroke / Flatten) — preserves text rendering without depending on font loading.
3. **Export as SVG.** Use Figma's built-in export: `File → Export → SVG`. Include `id` attributes for any path that needs CSS animation hooks.
4. **Drop into `src/assets/<family>/staging/`**.

### 7.3 Vectorization (Procreate → SVG)

For artifacts that need to be SVG but are easier to author in Procreate (annotations, signature, hand-drawn headings), the pipeline is:

```
Procreate PNG  →  Figma "Place image"  →  Image Trace plugin OR vectorizer.ai
              →  Manual path cleanup in Figma  →  SVG export  →  SVGO optimization
```

Or, faster:

```
Procreate PNG  →  vectorizer.ai (paid tier, $9/mo)  →  SVG  →  SVGO
```

[vectorizer.ai](https://vectorizer.ai) is the highest-quality automatic vectorizer; **Figma's Image Trace plugin** is free but produces messier paths. For high-stakes assets (signature, lead-line character if it ever needs SVG variants), pay for vectorizer.ai. For everything else, Figma is fine.

### 7.4 Optimization

Two CLI tools, both available via Homebrew:

```bash
brew install svgo
brew install pngquant
```

Per-asset optimization commands:

```bash
# SVGs
svgo --multipass --pretty src/assets/staging/foo.svg -o src/assets/foo.svg

# PNGs
pngquant --quality=75-90 --skip-if-larger --strip --output src/assets/foo.png src/assets/staging/foo.png
```

Wire these into a `scripts/optimize-assets.sh` and a `prebuild` npm script so every asset is optimized at build time without manual intervention.

**SVGO budget targets:**
- Single-path icon: ≤ 2 KB
- Multi-path annotation: ≤ 5 KB
- Hand-drawn heading: ≤ 8 KB
- Signature (complex stroke): ≤ 5 KB

**pngquant budget targets:**
- Paper texture tile: ≤ 180 KB
- Torn-paper edge: ≤ 220 KB
- Hero floor-shadow: ≤ 160 KB
- Coffee ring: ≤ 80 KB
- Kid's drawing: ≤ 100 KB
- Cartoon-cel study: ≤ 250 KB each

### 7.5 Naming conventions

`kebab-case`, no spaces, no underscores, no version numbers in filenames (git tracks versions):

```
paper-tile.png
tear-edge.png
hero-floor-shadow.png
coffee-ring.png
kid-drawing-1.png
cartoon-coyote-study.png
b1-how-i-got-here.svg
arrow-curved.svg
signature.svg
stamp-template.svg
```

Group by family in the repo (see §8), so global naming uniqueness isn't required — just within-family uniqueness.

---

## 8. Repo layout

```
sw-ai-pm-portfolio/
└── src/
    └── assets/
        ├── textures/                       ← site-wide substrate
        │   ├── paper-tile.png              ← §3
        │   ├── tear-edge.png               ← §4
        │   ├── hero-floor-shadow.png       ← §5
        │   └── staging/                    ← unoptimized originals (gitignored)
        ├── artifacts/                      ← raster artifacts
        │   ├── coffee-ring.png             ← §6.3
        │   ├── kid-drawing-1.png           ← §6.4
        │   └── staging/
        ├── cartoons/                       ← B-3 cartoon-canon studies (about page)
        │   ├── coyote-study.png            ← §6.5
        │   ├── pinky-and-brain-study.png
        │   ├── spongebob-study.png
        │   ├── looney-tunes-study.png
        │   ├── dexters-lab-study.png
        │   ├── hey-arnold-study.png
        │   └── staging/
        ├── annotations/                    ← SVG vocabulary
        │   ├── arrow-curved-1.svg          ← §6.1
        │   ├── arrow-curved-2.svg
        │   ├── arrow-curved-3.svg
        │   ├── strikethrough-x.svg
        │   ├── registration-mark.svg
        │   ├── signature.svg
        │   └── staging/
        ├── stamps/                         ← SVG stamp template
        │   ├── stamp-template.svg          ← §6.2 (single template, populated per-instance)
        │   └── staging/
        └── headings/                       ← hand-drawn heading SVGs, organized per page
            ├── about/                      ← §6.6
            │   ├── b1-how-i-got-here.svg
            │   ├── b2-why-pm.svg
            │   ├── b3-saturday-morning-canon.svg
            │   ├── b4-where-im-going.svg
            │   └── b5-proof-points.svg
            ├── case-study/                 ← per case-study spec
            │   └── (TBD)
            └── staging/
```

`staging/` is in `.gitignore` — unoptimized originals don't go into the repo. Only the post-optimization assets get committed.

---

## 9. Loading + performance

### 9.1 Asset budgets (cumulative)

| Asset category | Per-asset budget | Total assets | Total weight |
|---|---|---|---|
| Paper texture | ≤ 180 KB | 1 | ≤ 180 KB |
| Torn-paper edge | ≤ 220 KB | 1 | ≤ 220 KB |
| Hero floor-shadow | ≤ 160 KB | 1 | ≤ 160 KB |
| Coffee ring | ≤ 80 KB | 1 | ≤ 80 KB |
| Kid's drawing | ≤ 100 KB | 1-2 | ≤ 200 KB |
| Cartoon-cel studies | ≤ 250 KB | 6 | ≤ 1500 KB |
| Annotations (SVG) | ≤ 5 KB | 8-12 | ≤ 60 KB |
| Stamp template (SVG) | ≤ 2 KB | 1 | ≤ 2 KB |
| Hand-drawn headings (SVG) | ≤ 8 KB | ~12-15 (across pages) | ≤ 120 KB |
| Signature (SVG) | ≤ 5 KB | 1 | ≤ 5 KB |
| **TOTAL ASSET WEIGHT** | — | — | **≤ 2.6 MB** |

2.6 MB across the entire site is comfortable. The cartoon-cel studies (1.5 MB total) are the heaviest cluster, but they're only on the about page and they're below-the-fold, so they can lazy-load without blocking initial render.

### 9.2 Lazy loading

| Asset | Loading strategy |
|---|---|
| Paper texture | `<link rel="preload" as="image">` in head — critical for first paint |
| Torn-paper edge | `<link rel="preload" as="image">` in head — visible immediately |
| Hero floor-shadow | `loading="eager"` (above-the-fold on home) |
| Character WebM (hero) | `loading="eager"`, `preload="auto"` |
| Coffee ring | `loading="lazy"` — below the fold on every page that uses it |
| Kid's drawing | `loading="lazy"` |
| Cartoon-cel studies | `loading="lazy"` — six images, below the fold |
| Annotations / stamps / signatures (SVG) | Inline — no separate request |
| Hand-drawn headings (SVG) | Inline — no separate request |

### 9.3 Lighthouse target

Per the about-spec DoD #14: Accessibility ≥95, Performance ≥90, Best Practices = 100. Asset budgets in §9.1 are sized to leave headroom under Performance ≥ 90 on a 4G connection.

---

## 10. Definition of Done

Texture & artifacts v1 is locked when:

1. `src/assets/textures/paper-tile.png` exists at 2048 × 2048 px, ≤ 180 KB, perfectly seamlessly tileable (visual diff check: duplicate + offset → no visible seam).
2. `src/assets/textures/tear-edge.png` exists at 6400 × 600 px, ≤ 220 KB, with visible paper fibers/fluff along the tear (not a clean wave). Cream color matches `#FFF9F0` exactly.
3. `src/assets/textures/hero-floor-shadow.png` exists at 2800 × 560 px, ≤ 160 KB, with pencil-rendered floorboards + soft pencil shadow, soft fades on top + left + bottom edges, hard right edge OK.
4. `<body>` is styled with `background-color: var(--chrome)` (`#0A3E42`) at Z=0.
5. Every page `<section class="page-sheet">` is styled with `background-color: var(--paper)`, the paper texture tile, and `background-blend-mode: multiply`.
6. Torn-paper edges render as `<img class="tear-divider">` between every paper-sheet and chrome boundary, with negative margins overlapping both layers per §4.4. The same asset is used flipped via `transform: scaleY(-1)` for bottom-side tears.
7. The hero floor-shadow renders inside `.character-stage` at z-index 18, behind the character WebM (z-index 20) but in front of the paper sheet (z-index 10). Positioning aligns with the character's feet/desk-base.
8. The six artifact families (§6) each have at least one delivered asset in `src/assets/<family>/`, optimized per §7.4, file size within the per-asset budget.
9. `scripts/optimize-assets.sh` exists and is wired into a `prebuild` npm script. Running `npm run build` optimizes every staged asset.
10. Lighthouse Performance ≥ 90 on the home page (the heaviest page in terms of texture assets: paper tile + torn edges + hero floor + character WebM + paper artifacts).
11. **Reduced-motion fallback:** every asset that participates in motion (signature `stroke-dasharray` reveal, lane-rule reveal, character WebM) honors `@media (prefers-reduced-motion: reduce)` per the about-spec §15.
12. **Print stylesheet** strips all paper textures, torn edges, hero floor-shadow, coffee rings, kid drawings, and cartoon-cel studies — print shows clean ink-on-white per the about-spec §17 item 13.

---

## 11. Open questions

**[OPEN-1: Chrome texture vs. flat (§2.1)]** — Locked decision for v1: flat teal `#0A3E42`. Revisit after the paper texture is delivered and the chrome is visible against it; if the flat reads as too screen-y, author a subtle "felt mat" texture for the chrome layer in v1.1. Default: ship flat.

**[OPEN-2: Torn-paper edge variants (§4.5)]** — One asset for v1. Possible future: a second-pass tear with longer fluff for the home hero specifically, so the first tear the visitor sees is the most luxurious. Defer until v1 ships and Sean can judge from real footage.

**[OPEN-3: Signature handwriting source (§6.1)]** — Two paths: Sean's actual handwritten signature, scanned and vectorized (highest authorial signal, requires Sean to scan his sig); or a hand-drawn "Sean" glyph custom-designed in Procreate (still hand-drawn, but stylized — less personal, more controlled). **Default: actual signature.** Confirm.

**[OPEN-4: Coffee ring authenticity (§6.3)]** — Photograph a real coffee ring (most authentic) OR Procreate-paint one from scratch (more controllable). **Default: photograph a real one.** Sean has 30 seconds to make a real ring on cream paper.

**[OPEN-5: Hand-drawn heading SVG vectorization path (§6.6, §7.3)]** — Path A: Figma Image Trace plugin (free, decent quality, messier paths). Path B: vectorizer.ai paid tier ($9/mo, highest quality, clean paths). **Default: Path B for the signature + the about page's five headings (high-stakes assets); Path A for everything else.** Confirm.

**[OPEN-6: Kid's drawing — actual childhood drawing vs. fresh authoring (§6.4)]** — If Sean has an actual childhood drawing he could scan, it would carry maximum authorial signal. Otherwise, he authors a fresh "by age 6" rough sketch in Procreate. **Default: fresh authoring in Procreate** (unless Sean's mom has a shoebox). Confirm.

---

## 12. Out of scope for v1

- **Animated textures** (paper that subtly "breathes," chrome that has a slow ambient shimmer) — deferred indefinitely; risks crossing into kitsch.
- **Per-page paper texture variants** (e.g., a "darker recycled" tile for the case-study pages) — one texture rules them all for v1; revisit if a future page legitimately needs a different paper register.
- **Dark-mode** — the site is paper-on-desk by thesis; a dark mode would be a different site. Not planned.
- **Tactile / 3D effects** (CSS `box-shadow` to fake paper lift, parallax on the chrome) — restraint over showmanship.
- **Sound design** (page-turn audio on route change, etc.) — never.
- **A separate "drop shadow" for paper sheets** (additional shadow between paper and chrome) — the torn-paper PNG already does this work. Adding a discrete CSS shadow would over-engineer the layering.

---

## 13. Cross-spec patches required

This spec changes the substrate that other specs reference. Two patches needed in already-locked specs:

### 13.1 about-spec-v1.md

| Location | Current | Patched to |
|---|---|---|
| §2 anatomy diagram, top-edge label | `╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from prev surface) ╲╱╲╱╲╱╲╱╲` | `╲╱╲╱╲╱╲╱╲ torn-paper edge (top, reveals teal chrome #0A3E42) ╲╱╲╱╲╱╲╱╲` |
| §2 anatomy diagram, bottom-edge label | `╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom) → site-chrome footer (Contact lives there) ╲╱╲╱╲╱╲╱╲` | `╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, reveals teal chrome) → site-chrome footer (Contact lives there) ╲╱╲╱╲╱╲╱╲` |
| §3 vertical budget, "Torn-paper top edge" | `32px / overlaps prev surface by 16px` | `~200px visible / overlaps teal chrome above by 80px` |
| §3 vertical budget, "Torn-paper bottom edge" | `32px / overlaps site-chrome footer by 16px` | `~200px visible / overlaps teal chrome below by 80px (site-chrome footer renders on the chrome, below the tear)` |
| §1.1 changelog | n/a | New entry: "2026-05-18: Three-layer model (chrome → paper → content) externalized to `texture-and-artifacts-spec-v1.md`. Torn-paper edge height bumped from 32px to ~200px to reflect the actual asset (real-scan PNG, not SVG zigzag)." |

### 13.2 hero-spec-v1.md (when written or already-drafted)

The hero character now requires a `.character-stage` wrapper with the hero floor-shadow PNG as a sibling element at z-index 18, per §5.4. If hero-spec already exists and doesn't reflect this, it needs the same wrapper structure added.

---

## Appendix A — Per-asset dimensions table (single reference)

The complete table, for Sean's authoring session:

| Family | Asset | Procreate / Figma source | Delivery | File budget | Quantity |
|---|---|---|---|---|---|
| §3 Texture | Paper tile | 2048 × 2048 (Procreate) | PNG-24 alpha, tileable | ≤ 180 KB | 1 |
| §4 Texture | Torn-paper edge | 6400 × 600 (Procreate, scanned source) | PNG-24 alpha, cream `#FFF9F0` | ≤ 220 KB | 1 |
| §5 Texture | Hero floor-shadow | 2800 × 560 (Procreate) | PNG-24 alpha, pencil rendering | ≤ 160 KB | 1 |
| §6.1 Annotation | Curved arrow (×3-5 variants) | 800 × 400 (Procreate → SVG) | Inline SVG, stroke-only | ≤ 3 KB | 3-5 |
| §6.1 Annotation | Strikethrough X | 400 × 400 (Procreate → SVG) | Inline SVG | ≤ 2 KB | 1 |
| §6.1 Annotation | Registration mark | 200 × 200 (Procreate → SVG) | Inline SVG | ≤ 1.5 KB | 1 |
| §6.1 Annotation | Signature ("Sean") | 1200 × 400 (Procreate → SVG) | Inline SVG with `stroke-dasharray` | ≤ 5 KB | 1 |
| §6.2 Stamp | Stamp template | Figma vector | Inline SVG, populated per-instance | ≤ 2 KB | 1 |
| §6.3 Artifact | Coffee ring | 1200 × 1200 (Procreate, photographed source) | PNG-24 alpha | ≤ 80 KB | 1 |
| §6.4 Artifact | Kid's drawing scan | 1200 × 1600 (Procreate) | PNG-24 alpha | ≤ 100 KB | 1-2 |
| §6.5 Cartoon | Cartoon-cel study | 2240 × 2480 (Procreate, Path C hybrid) | PNG-24 alpha | ≤ 250 KB | 6 |
| §6.6 Heading | About-page B-N heading | 1600 × 400 (Procreate → SVG) | Inline SVG, teal `#0A3E42` | ≤ 8 KB | 5 (about) + N (other pages) |

---

## Appendix B — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `texture-and-artifacts-spec-v1.md` end-to-end alongside any page-level spec being built (`about-spec-v1.md`, `hero-spec-v1.md`, etc.). The texture spec is foundational — the three-layer model (`<body>` → `.page-sheet` → page content) must be implemented before any page-level CSS sits coherently on top of it.
>
> Implementation order: (1) stand up the `<body>` chrome backdrop with `background-color: var(--chrome)` and the CSS-custom-property tokens for `--chrome`, `--paper`, `--ink`, `--teal`, `--amber`, `--stamp` etc. per §2.4. (2) Implement the `.page-sheet` wrapper with the paper texture tile, blend mode, and inverted palette tokens. (3) Implement `<TearDivider />` as a reusable Astro component reading `/assets/textures/tear-edge.png`, with `--top` and `--bottom` variants per §4.4. (4) Implement `<CharacterStage />` as a wrapper for the hero with the floor-shadow underlay positioned at z-index 18 per §5.4. (5) Wire `scripts/optimize-assets.sh` (SVGO + pngquant) into `prebuild` per §7.4. (6) Apply the cross-spec patches per §13.
>
> Sean authors the assets in parallel per the dimensions in Appendix A — paper texture first (§9 critical asset), torn-paper edge second (also critical), hero floor-shadow third, then the artifact vocabulary as each page-level spec calls for it. The build session can run with placeholder PNGs (solid-color flat fills at the right dimensions) while Sean's authoring lands; swap the real assets in as they arrive.
>
> Stop when the 12 Definition-of-Done items in §10 can be ticked on a `localhost:4321` preview, every asset's file weight is under the per-asset budget in Appendix A, and the cross-spec patches in §13 are applied to `about-spec-v1.md`.

---

*Drafted 2026-05-18. Foundational spec — every page-level spec inherits from this. Awaits Sean's final lock. Open questions flagged in §11.*
