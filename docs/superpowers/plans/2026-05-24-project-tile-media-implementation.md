# Project Tile Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Author and ship the 5 project tile images (A-1 through A-5) for the home page projects splash, replacing 4 stub assets and 1 misdirected OG-card asset with real tile media per the locked design spec.

**Architecture:** Per-tile generation via three image-gen skills (`gemini-pencil-animation-image-gen`, `openai-image-gen`, plus image-manipulation for A-5). Each tile gets a draft prompt + generate + visual-QA cycle, then crop/convert/integrate. Two-attempt rule per tile; fall back to Option 2 (pencil-test of project beat) if both attempts fail.

**Tech Stack:** Python 3 + `google-genai` (Nano Banana 2) for pencil-test tiles · Python 3 + `openai` SDK (GPT Image 2) for the terminal tile · Pillow / ImageMagick for crop and `.webp` conversion · Astro 5 dev server for browser QA.

**Spec source:** [docs/superpowers/specs/2026-05-24-project-tile-media-design.md](docs/superpowers/specs/2026-05-24-project-tile-media-design.md)

---

## File Structure

**Generated artifacts (target):**
- `public/assets/projects/animation-pipeline.webp` — A-1 (replaces 1.5KB stub)
- `public/assets/projects/code-brain.webp` — A-2 (replaces 1.5KB stub)
- `public/assets/projects/intent-engineering-mcp.webp` — A-3 (replaces misdirected OG-card .png)
- `public/assets/projects/the-block.webp` — A-4 (replaces 1.5KB stub)
- `public/assets/projects/16bitfit.webp` — A-5 (replaces 1.5KB stub)

**Working artifacts (gitignored or temp):**
- `assets/tile-generation/raw/<slug>.png` — raw generator output before crop/convert
- `assets/tile-generation/prompts/<slug>.txt` — saved prompts for traceability + reuse

**MDX files to modify:** `src/content/work/<slug>.mdx` — only the `hero_media_alt` frontmatter field on each (5 files total). The `hero_media` path stays; the extension changes for A-3 only (`.png` → `.webp`).

---

## Pre-flight

### Task 0: Set up working directory + verify environment

**Files:**
- Create: `assets/tile-generation/raw/` (working directory, gitignored)
- Create: `assets/tile-generation/prompts/` (committed — prompt traceability)
- Modify: `.gitignore` (add `assets/tile-generation/raw/`)

- [ ] **Step 0.1: Create working directories**

```bash
mkdir -p assets/tile-generation/raw assets/tile-generation/prompts
```

- [ ] **Step 0.2: Add raw outputs to .gitignore**

```bash
echo "" >> .gitignore
echo "# Tile generation working files (raw before crop+convert)" >> .gitignore
echo "assets/tile-generation/raw/" >> .gitignore
```

- [ ] **Step 0.3: Verify Pillow + image-gen API keys present**

```bash
python3 -c "import PIL; print('Pillow', PIL.__version__)"
python3 -c "import os; from dotenv import load_dotenv; load_dotenv(); print('GEMINI_API_KEY:', 'SET' if os.getenv('GEMINI_API_KEY') else 'MISSING'); print('OPENAI_API_KEY:', 'SET' if os.getenv('OPENAI_API_KEY') else 'MISSING')"
```

Expected: Pillow version printed; both API keys SET.

If Pillow missing: `pip install Pillow python-dotenv`.
If GEMINI or OPENAI key missing: add to `.env` before proceeding.

- [ ] **Step 0.4: Confirm anchor reference images exist**

```bash
ls -lh reference-images/2D-Character-Sketch-Sean-v1.png sw-portfolio-animation-2026/anchor-images/ai-companion-turnaround-anchor.png assets/projects-tiles/16bitfit-photo-1.png
```

Expected: all three files present.

- [ ] **Step 0.5: Confirm Astro dev server is running**

```bash
curl -sI http://localhost:4321 | head -1
```

Expected: `HTTP/1.1 200 OK`. If not running: `npm run dev &` and wait ~10s.

- [ ] **Step 0.6: Commit working-directory setup**

```bash
git add .gitignore assets/tile-generation/prompts/
git commit -m "chore(phase-3f): scaffold tile-generation working dirs"
```

---

## Task 1: A-5 · 16BitFit (lowest risk — just crop Photo 1)

**Why first:** Validates the full integration pipeline (crop → convert → MDX update → browser QA → commit) on the easiest input, building muscle memory before the harder generative work.

**Files:**
- Source: `assets/projects-tiles/16bitfit-photo-1.png` (1536×2752, already vertical)
- Output: `public/assets/projects/16bitfit.webp` (800×1000, ≤180 KB)
- Modify: `src/content/work/16bitfit.mdx` (`hero_media_alt` only)

- [ ] **Step 1.1: Analyze Photo 1 dimensions vs target 4:5**

```bash
python3 -c "from PIL import Image; im = Image.open('assets/projects-tiles/16bitfit-photo-1.png'); print(f'{im.width}x{im.height}, ratio={im.width/im.height:.3f}, target 4:5={4/5:.3f}')"
```

Expected output: `1536x2752, ratio=0.558, target 4:5=0.800`. Photo 1 is *taller* than 4:5 — must crop top/bottom to fit, not pad.

- [ ] **Step 1.2: Compute crop box**

We want 4:5 (ratio 0.800). Photo 1 is 1536×2752. To keep full width and crop vertically:
- target height = `1536 / 0.8 = 1920`
- crop the central 1920px of the 2752 height: top = `(2752 - 1920) / 2 = 416`, bottom = `416 + 1920 = 2336`
- crop box: `(0, 416, 1536, 2336)`

- [ ] **Step 1.3: Crop and resize**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/projects-tiles/16bitfit-photo-1.png')
cropped = im.crop((0, 416, 1536, 2336))    # 1536x1920, 4:5
resized = cropped.resize((800, 1000), Image.LANCZOS)
resized.save('assets/tile-generation/raw/16bitfit.png', 'PNG')
print(f'wrote {resized.size}')
PY
```

Expected: `wrote (800, 1000)`.

- [ ] **Step 1.4: Visual-QA the crop**

Open `assets/tile-generation/raw/16bitfit.png` in Preview (or `open` it). Verify:
- The hands holding the Game Boy are centered.
- The pixel-art runner on the screen is fully visible.
- The bottom 250px (visually below the device) is quiet enough for metadata-strip overlay.
- The bookshelf at the top is not awkwardly cropped.

If the crop is wrong (e.g. cuts off important detail), re-run with a different crop box and re-check.

- [ ] **Step 1.5: Convert to .webp at quality 80**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/tile-generation/raw/16bitfit.png')
im.save('public/assets/projects/16bitfit.webp', 'WEBP', quality=80, method=6)
import os
print(f'wrote {os.path.getsize("public/assets/projects/16bitfit.webp") // 1024} KB')
PY
```

Expected: <180 KB. If >180 KB, lower quality to 75 and re-check; if still >180 KB, increase compression `method=6` to default and accept ≤220 KB.

- [ ] **Step 1.6: Update MDX alt text**

Open `src/content/work/16bitfit.mdx`. Replace the `hero_media_alt:` line with:

```yaml
hero_media_alt: A photographic illustration of two hands holding a Nintendo Game Boy with a pixel-art runner on the screen, warm bookshelf and lamp in the background.
```

- [ ] **Step 1.7: Visual-QA in browser**

Reload http://localhost:4321 — scroll to the projects splash. Verify:
- A-5 tile renders with the Game Boy image.
- Metadata strip (frame number, status pill, title, tagline) overlays cleanly on the bottom 250px.
- No layout break at desktop (1440) or mobile (390) viewports.

- [ ] **Step 1.8: Commit**

```bash
git add public/assets/projects/16bitfit.webp src/content/work/16bitfit.mdx
git commit -m "feat(phase-3f): A-5 16bitfit tile media — game boy in hands"
```

---

## Task 2: A-3 · Intent Engineering MCP (highest technical risk — terminal text legibility)

**Why second:** The terminal text-rendering risk is the biggest unknown. Solve it early; if one-shot generation can't render legible mono text, pivot to the two-pass HTML/SVG composite before A-1/A-2/A-4 commit time to the pencil register.

**Files:**
- Output: `public/assets/projects/intent-engineering-mcp.webp` (800×1000)
- Delete: `public/assets/projects/intent-engineering-mcp.png` (current OG-card stand-in)
- Save: `assets/tile-generation/prompts/intent-engineering-mcp.txt` (the prompt below)
- Modify: `src/content/work/intent-engineering-mcp.mdx` (`hero_media`, `hero_media_type`, `hero_media_alt`)

- [ ] **Step 2.1: Save the prompt for traceability**

Write `assets/tile-generation/prompts/intent-engineering-mcp.txt` with the following exact content:

```text
An editorial illustration of a software terminal pane rendered on warm cream paper, with a small pencil-test marginalia character in the top-right corner.

Composition: 4:5 portrait, 800×1000 pixels.

The terminal pane occupies the central area of the upper 75% of the image (the upper 800×750 zone). The terminal pane is approximately 680px wide × 360px tall, centered horizontally with about 60px of cream margin on each side, positioned roughly in the vertical middle of the upper zone.

Terminal pane styling:
- Sharp rectangular block. NO rounded corners. NO macOS Terminal.app chrome. NO traffic-light buttons. NO header bar.
- Background INSIDE the pane: warm cream #FFF9F0 (same as the page paper — this is a paper-on-paper editorial rendering, NOT a dark terminal).
- Top edge of the pane: a thin 0.5pt horizontal rule in teal #0A3E42 spanning the full pane width.
- Bottom edge of the pane: a matching thin 0.5pt horizontal rule in teal #0A3E42.

Content inside the pane, rendered in JetBrains Mono font at approximately 16pt visual size, left-aligned with ~24px left padding, line-height 1.4:
  Line 1: $ npm install @swins/intent-engineering-mcp
  Line 2: added 1 package in 1.2s
  Line 3: ✓ DNS-verified registry · 2026-05-12
  Line 4: ✓ Claude Desktop MCP server registered

- Lines 1 and 2 in ink primary #1A1A1E.
- The two ✓ checkmarks on lines 3 and 4 are in stamp amber #7C2D12. The text after each checkmark is in ink primary #1A1A1E.
- Text must be crisp and fully legible. The exact strings above are mandatory and must appear character-for-character.

Below the terminal pane, with about 48px of cream paper gap, a small two-line MCP-tool-call indicator block, JetBrains Mono ~13pt, left-aligned with the terminal pane:
  Line 1: tools/list ↩ 2 tools
  Line 2: intent.draw_up ✓

The ↩ glyph and the trailing ✓ on line 2 are in stamp amber #7C2D12; the rest is ink primary #1A1A1E.

In the top-right corner of the image (in the cream margin OUTSIDE the terminal pane), a small pencil-test marginalia illustration: a slim, casually-drawn human male figure (~140px tall), drawn in rough pencil-test register, shown in profile from the side, holding a pencil with his right hand and drawing a small ✓ check mark in the air. Hand-drawn imperfection — soft pencil construction lines, slight rough edges, no clean inks. Reads as a quick annotation in the margin.

Background of the entire image: warm cream paper #FFF9F0 with a very subtle paper-fiber texture. Slight warm vignette acceptable but not required.

Palette (strict): ink primary #1A1A1E (most text, pencil-test character), paper cream #FFF9F0 (background, terminal-pane interior), teal #0A3E42 (top and bottom rules of the terminal pane only), stamp amber #7C2D12 (the two checkmarks in the terminal, the ↩ glyph and ✓ checkmark in the MCP indicator block, the small pencil-test ✓ being drawn by the character). NO other colors. NO dark substrates. NO neon. NO gradients.

The bottom 250px of the image (the lowest quarter) must be visually quiet — clean cream paper with no terminal content, no character, no rules. This zone will be overlaid by a metadata strip in HTML.

NEGATIVES (must not appear):
- NO macOS, Windows, Linux, or any OS chrome on the terminal.
- NO traffic-light close/minimize/maximize buttons.
- NO baked-in project title, tagline, URL, or branding (the project name, "Intent Engineering MCP", and the tagline "Drawing up agents to act with intent." must NOT appear anywhere in the image — these render in HTML).
- NO full-color terminal.
- NO dark-substrate terminal (this terminal is on cream paper, not on a black or navy background).
- NO photorealistic terminal — the rendering is editorial / paper-on-paper, not a literal screenshot.
- NO additional human characters beyond the corner marginalia figure.
- NO watermarks or signatures.
```

- [ ] **Step 2.2: Generate via OpenAI Image 2**

```bash
python3 .claude/skills/openai-image-gen/scripts/generate_image.py \
  "$(cat assets/tile-generation/prompts/intent-engineering-mcp.txt)" \
  --output assets/tile-generation/raw/intent-engineering-mcp-v1.png \
  --aspect-ratio 4:5 \
  --quality high \
  --env-file .env
```

Expected: PNG written to `assets/tile-generation/raw/intent-engineering-mcp-v1.png`. If the skill script's output dimensions are not 800×1000, note them — we will resize in Step 2.5.

- [ ] **Step 2.3: Visual-QA the v1 generation**

Open the file. Check against the spec §3 + the prompt's negatives:
- ✅ Terminal pane rendered on cream, not dark.
- ✅ All 4 terminal text lines are legible and read character-for-character correct (this is the most likely failure point — verify exact strings).
- ✅ Pencil-test character in top-right corner, holding pencil, drawing a check mark.
- ✅ Bottom 250px is visually quiet.
- ✅ No baked-in project title / tagline / URL.
- ✅ Palette discipline holds.

- [ ] **Step 2.4: If v1 fails the text legibility check — regenerate (attempt 2) OR pivot to two-pass composite**

**If text is illegible or wrong** (most common failure mode): regenerate ONCE with a tightened prompt. Append to the prompt:

```text
CRITICAL: Render the exact text strings below character-for-character. This is mandatory; the strings cannot be paraphrased or stylized:
$ npm install @swins/intent-engineering-mcp
added 1 package in 1.2s
✓ DNS-verified registry · 2026-05-12
✓ Claude Desktop MCP server registered
tools/list ↩ 2 tools
intent.draw_up ✓
```

Save as `assets/tile-generation/raw/intent-engineering-mcp-v2.png`. Visual-QA again.

**If v2 also fails the text check** — pivot to the two-pass composite:

  Pass A (background + character only): regenerate with the terminal-pane content stripped from the prompt (replace the terminal section with: "An empty rectangular region of clean cream paper, ~680px wide × 360px tall, centered in the upper-middle of the image, bounded above and below by thin 0.5pt teal #0A3E42 horizontal rules. The interior of this region is plain cream with no text or content."). Save as `intent-engineering-mcp-bg.png`.

  Pass B (terminal text overlay): generate the terminal-pane content as actual HTML in a single-purpose Astro page, screenshot via Playwright at exact dimensions matching the empty region in Pass A, composite the screenshot onto the Pass A image with PIL `Image.paste()` at the matching coordinates.

  Pseudocode:
  ```python
  from PIL import Image
  bg = Image.open('assets/tile-generation/raw/intent-engineering-mcp-bg.png')
  terminal_overlay = Image.open('assets/tile-generation/raw/intent-engineering-mcp-overlay.png')
  bg.paste(terminal_overlay, (60, 240), mask=terminal_overlay.convert('RGBA').split()[3])
  bg.save('assets/tile-generation/raw/intent-engineering-mcp.png')
  ```

- [ ] **Step 2.5: Resize / crop the chosen winner to exactly 800×1000**

```bash
python3 <<'PY'
from PIL import Image
src = 'assets/tile-generation/raw/intent-engineering-mcp.png'  # or -v1.png / -v2.png whichever won
im = Image.open(src)
print(f'source: {im.size}')
# If aspect is 4:5 already, resize directly:
if abs(im.width/im.height - 0.8) < 0.01:
    im.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/intent-engineering-mcp-final.png', 'PNG')
else:
    # Center-crop to 4:5 first
    target_h = im.width / 0.8
    top = (im.height - target_h) / 2
    cropped = im.crop((0, int(top), im.width, int(top + target_h)))
    cropped.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/intent-engineering-mcp-final.png', 'PNG')
print('wrote final 800x1000')
PY
```

- [ ] **Step 2.6: Convert to .webp**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/tile-generation/raw/intent-engineering-mcp-final.png')
im.save('public/assets/projects/intent-engineering-mcp.webp', 'WEBP', quality=80, method=6)
import os
print(f'wrote {os.path.getsize("public/assets/projects/intent-engineering-mcp.webp") // 1024} KB')
PY
```

Expected: <180 KB.

- [ ] **Step 2.7: Delete the misdirected OG-card PNG**

```bash
git rm public/assets/projects/intent-engineering-mcp.png
```

- [ ] **Step 2.8: Update MDX frontmatter**

Open `src/content/work/intent-engineering-mcp.mdx`. Change:
- `hero_media: /assets/projects/intent-engineering-mcp.png` → `hero_media: /assets/projects/intent-engineering-mcp.webp`
- `hero_media_type: image` (already correct — keep)
- `hero_media_alt: Terminal showing npm install @swins/intent-engineering-mcp resolving.` → `hero_media_alt: An editorial terminal pane on cream paper showing npm install @swins/intent-engineering-mcp resolving with DNS-verified registry success, beside a small pencil-test character drawing a check mark in the margin.`

- [ ] **Step 2.9: Visual-QA in browser**

Reload http://localhost:4321. Scroll to projects splash. Verify A-3 renders with the new terminal composite. Click into `/work/intent-engineering-mcp/` and verify the hero_media also renders correctly there.

- [ ] **Step 2.10: Commit**

```bash
git add public/assets/projects/intent-engineering-mcp.webp public/assets/projects/intent-engineering-mcp.png src/content/work/intent-engineering-mcp.mdx assets/tile-generation/prompts/intent-engineering-mcp.txt
git commit -m "feat(phase-3f): A-3 intent-engineering-mcp tile media — editorial terminal pane"
```

---

## Task 3: A-1 · Animation Pipeline (Claude mascot walk cycle, no Sean)

**Files:**
- Output: `public/assets/projects/animation-pipeline.webp` (800×1000)
- Save: `assets/tile-generation/prompts/animation-pipeline.txt`
- Modify: `src/content/work/animation-pipeline.mdx` (`hero_media_alt`)
- Reference: `sw-portfolio-animation-2026/anchor-images/ai-companion-turnaround-anchor.png`

- [ ] **Step 3.1: Save the prompt**

Write `assets/tile-generation/prompts/animation-pipeline.txt`:

```text
A vertical strip of 4 stacked pencil-test animation frames showing a walk cycle of a soft, rounded peach-colored AI companion character.

The character is sourced from the attached turnaround reference: a short, stout, friendly character with a rounded square body, two small ear-knobs on the sides of the head, simple dot eyes, soft expression, and four small leg-stubs. Use the 3/4 FRONT pose as the base, animated through a walk cycle.

NO human character in this image. The AI companion is the only character. Sean's human pencil-test character does NOT appear in this tile.

Composition: 4:5 portrait, 800×1000 pixels.

The upper 75% of the image (800×750 zone) contains the 4 frames stacked vertically. Each frame is approximately 800px wide × 180px tall, separated from the next by a thin hand-ruled horizontal hairline in ink primary #1A1A1E. Each frame contains exactly one rendering of the AI companion character.

The 4 frames render the classic 4-key walk cycle, top to bottom:
- Frame 01 (top): CONTACT. The front leg-stub is forward and just making contact with the ground, weight transferring forward. The body leans slightly forward.
- Frame 02: RECOIL. Weight settling onto the front leg-stub. The body compresses slightly downward. The back leg-stub is lifting.
- Frame 03: PASSING. Mid-stride. Both leg-stubs nearly under the body, the body at its highest point above the ground line. The back leg is swinging through to become the next front leg.
- Frame 04 (bottom): HIGH-POINT. The (new) front leg-stub is reaching forward, the (now) back leg-stub is pushing off the ground. Body leaning forward into the next contact.

Style: traditional 2D animation pencil-test register. Rough construction lines visible — circle for the body, light guidelines, soft pencil shading. Inked details are minimal — just enough to suggest finish, not a clean final render. Looks like a working page from an animator's flipbook or a Disney production sketch. Each frame should have slight imperfections — a hairline that's not perfectly horizontal, a leg-stub that's drawn a touch differently across frames (because it's hand-drawn, not vector).

Each frame is annotated:
- Top-left of each frame: a small JetBrains Mono frame number in stamp amber #7C2D12, approximately 11pt visual size. Top-down: 01, 02, 03, 04.
- Bottom-right of each frame: a small JetBrains Mono pose label in ink-secondary #546E71, approximately 10pt visual size. Top-down: contact, recoil, passing, high-point.

Background of each frame: warm cream paper #FFF9F0 with subtle paper-fiber texture. The cream is the substrate — the frames are not on a separate background.

Below frame 04, the bottom 250px of the image is clean cream paper with NO content. This is the metadata-strip safe zone — must be visually quiet.

Palette (strict): ink primary #1A1A1E (pencil construction lines, frame dividers, inked details on the character), paper cream #FFF9F0 (background), stamp amber #7C2D12 (frame numbers ONLY), ink-secondary #546E71 (pose labels ONLY), peach (the character's body color, sourced from the anchor reference). NO other colors.

NEGATIVES:
- NO Sean's human pencil-test character. The AI companion is alone.
- NO full-color rendering of the character — keep the peach body color from the anchor, do not over-saturate.
- NO clean vector lines or digital flat rendering.
- NO baked-in project title or tagline. The text "Animation Pipeline" and the tagline must NOT appear in the image.
- NO photorealism. This is a pencil-test, not a render.
- NO dope-sheet grid behind the frames — just frames on cream paper, separated by hand-ruled hairlines.
- NO watermarks or signatures.
```

- [ ] **Step 3.2: Generate via Gemini Pencil Animation skill**

```bash
python3 .claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py \
  "$(cat assets/tile-generation/prompts/animation-pipeline.txt)" \
  --output assets/tile-generation/raw/animation-pipeline-v1.png \
  --aspect-ratio 4:5 \
  --reference sw-portfolio-animation-2026/anchor-images/ai-companion-turnaround-anchor.png \
  --env-file .env
```

Expected: PNG written. Note the output dimensions.

- [ ] **Step 3.3: Visual-QA the v1 generation**

Check against the prompt + spec §3:
- ✅ 4 distinct frames, stacked vertically, hairline dividers.
- ✅ Each frame shows the AI companion in a different walk-cycle pose (NOT 4 copies of the same pose).
- ✅ Sean is NOT in the image.
- ✅ Frame numbers `01-04` in amber, top-left of each frame.
- ✅ Pose labels `contact, recoil, passing, high-point` in ink-secondary, bottom-right of each frame.
- ✅ Bottom 250px is clean cream paper.
- ✅ No baked-in title or tagline.
- ✅ Character matches the anchor (peach body, ear-knobs, dot eyes, leg-stubs).

- [ ] **Step 3.4: If v1 fails — regenerate (attempt 2) OR pivot to Option-2 fallback**

If the frames are all identical pose (Gemini sometimes duplicates rather than animates), regenerate with this addition appended to the prompt:

```text
CRITICAL: The 4 frames must show 4 DIFFERENT poses of the walk cycle, not 4 copies of the same pose. Each frame's body position, leg-stub positions, and body height above the ground line must visibly differ from the adjacent frames. This is a sequence, not a tile pattern.
```

Save as `assets/tile-generation/raw/animation-pipeline-v2.png`. Visual-QA.

If v2 also fails: pivot to Option-2 fallback. Generate a single-frame pencil-test of Sean's character with a flipbook in hand (using `reference-images/2D-Character-Sketch-Sean-v1.png` as anchor). The fallback re-introduces Sean but at least carries the pencil-test register.

- [ ] **Step 3.5: Resize / crop to exactly 800×1000**

```bash
python3 <<'PY'
from PIL import Image
src = 'assets/tile-generation/raw/animation-pipeline-v1.png'  # or -v2.png if v2 won
im = Image.open(src)
print(f'source: {im.size}')
if abs(im.width/im.height - 0.8) < 0.01:
    im.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/animation-pipeline-final.png', 'PNG')
else:
    target_h = im.width / 0.8
    top = (im.height - target_h) / 2
    cropped = im.crop((0, int(top), im.width, int(top + target_h)))
    cropped.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/animation-pipeline-final.png', 'PNG')
print('wrote final 800x1000')
PY
```

- [ ] **Step 3.6: Convert to .webp**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/tile-generation/raw/animation-pipeline-final.png')
im.save('public/assets/projects/animation-pipeline.webp', 'WEBP', quality=80, method=6)
import os
print(f'wrote {os.path.getsize("public/assets/projects/animation-pipeline.webp") // 1024} KB')
PY
```

Expected: <180 KB.

- [ ] **Step 3.7: Update MDX alt text**

Open `src/content/work/animation-pipeline.mdx`. Replace `hero_media_alt:` with:

```yaml
hero_media_alt: A vertical strip of four pencil-test animation frames showing a Claude mascot walk cycle, labeled contact, recoil, passing, and high-point.
```

- [ ] **Step 3.8: Visual-QA in browser**

Reload http://localhost:4321. Verify A-1 tile renders with the 4-frame strip. Metadata strip overlays cleanly.

- [ ] **Step 3.9: Commit**

```bash
git add public/assets/projects/animation-pipeline.webp src/content/work/animation-pipeline.mdx assets/tile-generation/prompts/animation-pipeline.txt
git commit -m "feat(phase-3f): A-1 animation-pipeline tile media — claude mascot walk cycle"
```

---

## Task 4: A-4 · The Block (3-tier matrix with Sean annotating)

**Files:**
- Output: `public/assets/projects/the-block.webp` (800×1000)
- Save: `assets/tile-generation/prompts/the-block.txt`
- Modify: `src/content/work/the-block.mdx` (`hero_media_alt`)
- Reference: `reference-images/2D-Character-Sketch-Sean-v1.png`

- [ ] **Step 4.1: Save the prompt**

Write `assets/tile-generation/prompts/the-block.txt`:

```text
An editorial hand-drawn diagram of a 3-tier customer-structure matrix on warm cream paper, with a small pencil-test human male character annotating it from the right margin.

The human character is sourced from the attached reference image: a slim, casually-drawn male figure in pencil-test register. Mid-figure (waist up), about 200px tall in the final image. Drawn in pencil-test register matching the reference exactly.

Composition: 4:5 portrait, 800×1000 pixels.

The upper 75% of the image (800×750 zone) holds the matrix and the character. Bottom 25% (800×250) is visually quiet clean cream paper for metadata-strip overlay.

The matrix:
- Three stacked horizontal bands, each spanning the full image width MINUS a 100px right margin reserved for the human character. So each band is approximately 700px wide, starting at the left edge.
- From top to bottom, the bands are different heights, growing taller:
  - TIER 1 (top band, ~120px tall): On the left, label `RESEARCH-ONLY` in JetBrains Mono ~14pt, ink primary #1A1A1E. On the right side of the band (within the 700px width), a single hand-drawn document icon — a rectangle with three short horizontal lines suggesting text, drawn in rough pencil-and-ink, about 60px tall.
  - TIER 2 (middle band, ~200px tall): Label `RESEARCH + DATA` on the left. On the right, TWO stacked icons: the same document icon (top) plus a hand-drawn data-table icon (a small 3×3 grid of cells, rough), each about 55px tall, stacked vertically with a small gap.
  - TIER 3 (bottom band, ~280px tall): Label `RESEARCH + DATA + API` on the left. On the right, THREE icons stacked vertically: the document icon, the data-table icon, and a hand-drawn API-node icon (a small circle with three short lines radiating out to three smaller circles, suggesting connections), each about 60px tall.

The bands are separated from each other by thin hand-drawn horizontal rules in ink primary #1A1A1E. The bands are NOT clean vector — they have hand-drawn imperfections: a hairline that visibly wavers, an icon that is slightly off-center inside its band, the right edges of the bands not perfectly aligned. The whole matrix looks like the artist drew it in pencil and ink on the back of a partnership-deck slide, not like a designed infographic.

The human character: drawn in the rightmost 100px column of the image, vertically centered on the matrix (around the boundary between Tier 2 and Tier 3). In profile, facing LEFT (toward the matrix). Holding a pencil in his right hand at shoulder height, the pencil pointing toward the Tier 2 band. Mid-figure (waist up). Soft pencil construction lines, rough sketch, same register as the reference image.

Below the matrix, in the upper-75% zone, a single thin hand-drawn horizontal rule in ink-secondary #546E71 spanning the full image width, then clean cream paper down to the metadata-strip safe zone.

Style: pencil-and-ink editorial, slightly muted compared to other tiles in the set. This represents an ARCHIVED project — the register stays cool. NO stamp amber on this tile. NO warm accents.

Palette (strict): ink primary #1A1A1E (matrix lines, labels, icons, character), paper cream #FFF9F0 (background), ink-secondary #546E71 (the single horizontal rule below the matrix, any subtle structural lines or icon details). NO amber, NO teal, NO additional warms.

The bottom 250px must be visually quiet — clean cream paper.

NEGATIVES:
- NO full-color rendering.
- NO clean vector graphics. Hand-drawn imperfection is mandatory.
- NO baked-in project title (the words "The Block" or "Campus + RevOps" must NOT appear in the image).
- NO Claude mascot character.
- NO photorealistic rendering.
- NO institutional or partnership-deck logos.
- NO color icons — all icons rendered in ink-only.
- NO watermarks or signatures.
```

- [ ] **Step 4.2: Generate**

```bash
python3 .claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py \
  "$(cat assets/tile-generation/prompts/the-block.txt)" \
  --output assets/tile-generation/raw/the-block-v1.png \
  --aspect-ratio 4:5 \
  --reference reference-images/2D-Character-Sketch-Sean-v1.png \
  --env-file .env
```

- [ ] **Step 4.3: Visual-QA the v1 generation**

- ✅ Three horizontal bands, different heights (growing from top to bottom).
- ✅ Labels read `RESEARCH-ONLY`, `RESEARCH + DATA`, `RESEARCH + DATA + API` in mono.
- ✅ Icons present: 1 in tier 1, 2 in tier 2, 3 in tier 3.
- ✅ Sean character in right margin, in profile, pointing left at the matrix.
- ✅ Hand-drawn imperfection visible (no clean vector look).
- ✅ Cool palette only — no amber.
- ✅ Bottom 250px quiet.
- ✅ No baked-in title.

- [ ] **Step 4.4: If v1 fails — regenerate or pivot**

If the matrix renders as clean vector (the most likely failure mode for this style), regenerate with the appended emphasis:

```text
CRITICAL: This must look HAND-DRAWN, NOT digital. Visible pencil construction lines. Rough hand-drawn rule edges that wobble. Imperfect alignment between bands. The image should look like someone drew it with a pencil and a pen on paper, NOT generated digitally. Avoid any clean, precise, computer-perfect line work.
```

Save as `the-block-v2.png`. If v2 also fails, pivot to Option-2 fallback: a single-frame pencil-test of Sean reviewing a printed customer-tier document at a desk.

- [ ] **Step 4.5: Resize / crop to 800×1000**

```bash
python3 <<'PY'
from PIL import Image
src = 'assets/tile-generation/raw/the-block-v1.png'
im = Image.open(src)
print(f'source: {im.size}')
if abs(im.width/im.height - 0.8) < 0.01:
    im.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/the-block-final.png', 'PNG')
else:
    target_h = im.width / 0.8
    top = (im.height - target_h) / 2
    cropped = im.crop((0, int(top), im.width, int(top + target_h)))
    cropped.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/the-block-final.png', 'PNG')
print('wrote final 800x1000')
PY
```

- [ ] **Step 4.6: Convert to .webp**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/tile-generation/raw/the-block-final.png')
im.save('public/assets/projects/the-block.webp', 'WEBP', quality=80, method=6)
import os
print(f'wrote {os.path.getsize("public/assets/projects/the-block.webp") // 1024} KB')
PY
```

- [ ] **Step 4.7: Update MDX alt text**

Open `src/content/work/the-block.mdx`. Replace `hero_media_alt:` with:

```yaml
hero_media_alt: A hand-drawn pencil-and-ink diagram of a 3-tier customer matrix — research-only, research + data, and research + data + API — with a pencil-test character in the right margin pointing at the middle tier.
```

- [ ] **Step 4.8: Visual-QA in browser**

Reload and verify A-4 renders correctly.

- [ ] **Step 4.9: Commit**

```bash
git add public/assets/projects/the-block.webp src/content/work/the-block.mdx assets/tile-generation/prompts/the-block.txt
git commit -m "feat(phase-3f): A-4 the-block tile media — 3-tier matrix with sean annotating"
```

---

## Task 5: A-2 · Code Brain (concept graph with Sean inside the thread)

**Why last:** Highest compositional complexity (7 nodes, 8–10 edges, character placed inside the graph holding a labeled thread). Higher generative-failure risk; benefits from any prompt-engineering learnings collected from Tasks 3 and 4.

**Files:**
- Output: `public/assets/projects/code-brain.webp` (800×1000)
- Save: `assets/tile-generation/prompts/code-brain.txt`
- Modify: `src/content/work/code-brain.mdx` (`hero_media_alt`)
- Reference: `reference-images/2D-Character-Sketch-Sean-v1.png`

- [ ] **Step 5.1: Save the prompt**

Write `assets/tile-generation/prompts/code-brain.txt`:

```text
An editorial pencil-and-ink illustration of a hand-drawn knowledge graph on warm cream paper, with a slim casual male character standing inside the graph holding a single labeled thread.

The human character is sourced from the attached reference image: a slim, casually-drawn male figure in pencil-test register. He appears in the lower-center of the upper image zone, three-quarter view, looking upward at the nodes above him. He is mid-figure (waist up), approximately 220px tall in the final image.

Composition: 4:5 portrait, 800×1000 pixels.

The upper 75% of the image (800×750 zone) holds the knowledge graph and the character. Bottom 25% (800×250) is visually quiet clean cream paper for metadata-strip overlay.

The knowledge graph:
- 7 nodes drawn as rough-ink circles, scattered across the upper 60% of the upper zone (so the lower-third stays clearer for the character). Each circle is approximately 80–100px in diameter, hand-drawn with a slight imperfect outline.
- Each circle labeled in small JetBrains Mono text, approximately 11pt visual size, ink primary #1A1A1E, with one concept name centered inside or just below the circle. The 7 labels (in this layout):
  - Top-left (around 15% from left, 15% from top): `token-waste`
  - Top-center (around 50% from left, 8% from top): `comprehension-audit`
  - Top-right (around 85% from left, 15% from top): `daily-note-generation`
  - Mid-left (around 12% from left, 40% from top): `prompt-caching`
  - Mid-right (around 88% from left, 40% from top): `boundary-objects`
  - Lower-left (around 25% from left, 60% from top): `liveness-tokens`
  - Lower-right (around 75% from left, 60% from top): `restatement-bias`

- Nodes connected by curved rough-ink edges. Approximately 8–10 edges total, forming a slightly tangled but readable graph. Each edge has a tiny mono label sitting on or near the curve in ink-secondary #546E71, approximately 8pt visual size, with one of: `supports`, `contradicts`, `extends`, or `restates`. Distribute the four edge labels reasonably across the edges (no single label dominates).

- ONE specific edge is rendered slightly heavier in ink than the others. This heavier edge — call it "the thread" — visibly passes through EXACTLY 3 of the 7 nodes in this order: `token-waste` → `boundary-objects` → `daily-note-generation`. The thread enters `token-waste` from the bottom (from the character's hand), passes through `boundary-objects`, and continues to `daily-note-generation`, then trails off the top of the frame. The thread itself is drawn in stamp amber #7C2D12, while all other edges are in ink primary #1A1A1E.

The human character: in the lower-center of the upper image zone, mid-figure, three-quarter view, looking upward at the graph. His RIGHT HAND is raised to about shoulder height, holding the start of the thread (the amber curve) between thumb and forefinger. The thread visibly emerges from his hand and curves up into the `token-waste` node above him.

Background of the image: warm cream paper #FFF9F0 with subtle paper-fiber texture. At the EDGES of the image (left, top, right margins, NOT bottom), very faint marginalia — small handwritten arrows, a few struck-out words in tiny ink-secondary text — barely legible, just enough to suggest a working notebook page. The center of the image (where the graph and character live) is clear.

Below the graph and character (still in the upper-75% zone), clean cream paper down to the metadata-strip safe zone — no nodes, no edges, no marginalia in this lower region.

Style: pencil-and-ink editorial, hand-drawn throughout. Same register as the reference image. Rough construction lines on the character, imperfect circle outlines on the nodes, slightly tangled but readable edges.

Palette (strict): ink primary #1A1A1E (pencil lines on the character, ink edges, node outlines, node labels), paper cream #FFF9F0 (background), ink-secondary #546E71 (edge labels, marginalia at edges), stamp amber #7C2D12 (the thread — the one heavier curve passing through 3 nodes — and ONLY this). NO other colors.

The bottom 250px must be visually quiet — no nodes, no character feet, no edges.

NEGATIVES:
- NO clean vector graphics. The graph must look hand-drawn.
- NO full-color rendering.
- NO Claude mascot or AI companion character.
- NO baked-in project title (the words "Code Brain" or the tagline must NOT appear).
- NO photorealism.
- NO Sean's pencil-test character outside the graph — he is inside the graph (holding the thread), not standing beside it.
- NO more than one amber thread. Exactly ONE heavier amber curve passes through exactly 3 nodes.
- NO watermarks or signatures.
```

- [ ] **Step 5.2: Generate**

```bash
python3 .claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py \
  "$(cat assets/tile-generation/prompts/code-brain.txt)" \
  --output assets/tile-generation/raw/code-brain-v1.png \
  --aspect-ratio 4:5 \
  --reference reference-images/2D-Character-Sketch-Sean-v1.png \
  --env-file .env
```

- [ ] **Step 5.3: Visual-QA the v1 generation**

- ✅ 7 nodes present, each as a rough-ink circle, with one concept label each.
- ✅ Concept labels include at least `token-waste`, `boundary-objects`, `daily-note-generation` (the three on the thread). Other 4 labels may be slightly approximated if the generator can't render all 7 labels legibly — accept if 5+ are correct.
- ✅ Multiple edges connecting nodes, with at least 2–3 edge labels readable (`supports`, `extends`, etc.).
- ✅ ONE heavier amber edge passing through 3 of the nodes — this is the load-bearing visual.
- ✅ Sean character in lower-center, mid-figure, looking up, hand holding the thread.
- ✅ Bottom 250px clean.
- ✅ No baked-in title.

- [ ] **Step 5.4: If v1 fails — regenerate or accept partial**

If most things land but node labels are illegible: this is acceptable. The graph reads visually even if not every label is perfect; the load-bearing detail is the amber thread + character + the overall "concept-graph + figure" composition.

If the amber thread is missing or passes through wrong nodes: regenerate with appended:

```text
CRITICAL: There must be exactly ONE edge in the entire graph rendered in stamp amber #7C2D12 (not ink black). All other edges are ink black. This single amber edge — the "thread" — must visibly pass through 3 of the 7 nodes, starting from the character's raised right hand and ending off the top of the frame. The character holds the amber thread; he is the start of it.
```

Save as `code-brain-v2.png`. If v2 also fails: pivot to Option-2 fallback — a single-frame pencil-test of Sean at a whiteboard with a much simpler hand-drawn graph (3 nodes only, no labels needed).

- [ ] **Step 5.5: Resize / crop to 800×1000**

```bash
python3 <<'PY'
from PIL import Image
src = 'assets/tile-generation/raw/code-brain-v1.png'
im = Image.open(src)
print(f'source: {im.size}')
if abs(im.width/im.height - 0.8) < 0.01:
    im.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/code-brain-final.png', 'PNG')
else:
    target_h = im.width / 0.8
    top = (im.height - target_h) / 2
    cropped = im.crop((0, int(top), im.width, int(top + target_h)))
    cropped.resize((800, 1000), Image.LANCZOS).save('assets/tile-generation/raw/code-brain-final.png', 'PNG')
print('wrote final 800x1000')
PY
```

- [ ] **Step 5.6: Convert to .webp**

```bash
python3 <<'PY'
from PIL import Image
im = Image.open('assets/tile-generation/raw/code-brain-final.png')
im.save('public/assets/projects/code-brain.webp', 'WEBP', quality=80, method=6)
import os
print(f'wrote {os.path.getsize("public/assets/projects/code-brain.webp") // 1024} KB')
PY
```

- [ ] **Step 5.7: Update MDX alt text**

Open `src/content/work/code-brain.mdx`. Replace `hero_media_alt:` with:

```yaml
hero_media_alt: A pencil-and-ink concept graph with seven hand-drawn nodes labeled with PM vault concepts, an amber thread passing through three of them, held by a pencil-test character standing at the bottom of the graph.
```

- [ ] **Step 5.8: Visual-QA in browser**

Reload and verify A-2 renders correctly.

- [ ] **Step 5.9: Commit**

```bash
git add public/assets/projects/code-brain.webp src/content/work/code-brain.mdx assets/tile-generation/prompts/code-brain.txt
git commit -m "feat(phase-3f): A-2 code-brain tile media — concept graph with sean holding the thread"
```

---

## Task 6: Full-set visual QA + rhythm check

**Files:** none modified — pure verification.

- [ ] **Step 6.1: Verify all 5 tile files exist + size**

```bash
ls -lh public/assets/projects/*.webp public/assets/projects/*.png 2>&1
```

Expected: exactly 5 `.webp` files, each between 30 KB and 180 KB. No `.png` files in the directory (the misdirected OG-card PNG was deleted in Task 2).

- [ ] **Step 6.2: Verify all 5 are 800×1000**

```bash
python3 <<'PY'
from PIL import Image
import os
for f in sorted(os.listdir('public/assets/projects')):
    if f.endswith('.webp'):
        im = Image.open(f'public/assets/projects/{f}')
        ok = im.size == (800, 1000)
        print(f'{"✓" if ok else "✗"} {f}: {im.size}')
PY
```

Expected: 5 ✓ rows.

- [ ] **Step 6.3: Browser QA — desktop 1440**

Open http://localhost:4321 in a browser at viewport 1440×900. Inspect the projects splash. Verify:
- All 5 tiles render with their authored media (no flat color blocks).
- Each tile's metadata strip overlays cleanly on the bottom 250px of its image.
- The 5 tiles read as a *set* of different physical artifacts (per spec §5 rhythm table) — not as 5 versions of the same thing.
- A-3 tile (Intent Engineering MCP) no longer overflows its grid cell. (If it still does, that's a Pass-B B1 bug to fix separately — out of scope here.)
- No console errors related to image loading (network 4xx/5xx).

- [ ] **Step 6.4: Browser QA — mobile 390**

Resize the browser to 390×844. Verify:
- All 5 tiles stack to single column.
- No tile overflows its container width.
- Images don't pixelate (the 800×1000 master scales down acceptably for mobile).

- [ ] **Step 6.5: Lighthouse-light check — image weights**

```bash
python3 <<'PY'
import os
total = 0
for f in sorted(os.listdir('public/assets/projects')):
    if f.endswith('.webp'):
        sz = os.path.getsize(f'public/assets/projects/{f}')
        total += sz
        print(f'{f}: {sz // 1024} KB')
print(f'TOTAL: {total // 1024} KB')
PY
```

Expected: total ≤900 KB across all 5 tiles. (Spec target: ≤180 KB per tile.)

- [ ] **Step 6.6: Re-run the impeccable critique acceptance check on the projects section (manual)**

In the browser, scroll through the home page once at desktop. Re-ask the recruiter-test question from the critique: does the 30-second clickthrough now hold? If yes, B3 acceptance criteria from the spec §7 are met. If a single tile is breaking the rhythm (e.g., A-5's photographic register clashing with the four pencil-and-ink tiles in context), note it and decide:
- Accept (the variety IS the lift of Option 3 — outliers are intentional).
- Or fall to Option-2 fallback for that one tile (per spec §4 fallback chains).

- [ ] **Step 6.7: Commit QA notes (optional — only if any tile fell to fallback or partial-pass)**

If any tile shipped via fallback or partial-pass, append a note to `docs/bugs-changes/phase-3f-ship-ready-plan.md` §B3 acceptance section documenting the deviation. Otherwise skip this step.

---

## Task 7: CHANGELOG entry + Pass B · B3 close-out

**Files:**
- Modify: `CHANGELOG.md` (add Pass B · B3 entry)

- [ ] **Step 7.1: Read existing CHANGELOG.md "How to add an entry" header**

```bash
head -30 CHANGELOG.md
```

Follow the documented format for new entries.

- [ ] **Step 7.2: Add the Pass B · B3 entry to CHANGELOG.md**

Add (under the date 2026-05-24 or per the documented format):

```markdown
- **feat(phase-3f · pass B · B3):** Authored all 5 project tile images at 800×1000 .webp. Replaces 4 placeholder stubs and 1 misdirected OG-card asset. Per-tile direction (locked in [docs/superpowers/specs/2026-05-24-project-tile-media-design.md](docs/superpowers/specs/2026-05-24-project-tile-media-design.md)):
  - A-1 animation-pipeline: pencil-test Claude mascot walk cycle, 4 frames (contact · recoil · passing · high-point).
  - A-2 code-brain: pencil-and-ink concept graph, 7 nodes, Sean holding the amber thread through 3 of them.
  - A-3 intent-engineering-mcp: editorial terminal pane on cream paper with `npm install` + DNS-verified registry success, Sean as corner marginalia.
  - A-4 the-block: hand-drawn 3-tier customer matrix, Sean in right margin annotating.
  - A-5 16bitfit: photographic illustration of hands holding a Nintendo Game Boy with a pixel-art runner on the screen.
  All 5 MDX `hero_media_alt` strings updated. Misdirected `intent-engineering-mcp.png` (1200×630 OG card with wrong URL footer) deleted. Source prompts saved to `assets/tile-generation/prompts/` for traceability.
```

- [ ] **Step 7.3: Commit the CHANGELOG**

```bash
git add CHANGELOG.md
git commit -m "docs(phase-3f): CHANGELOG entry for pass B B3 — project tile media"
```

- [ ] **Step 7.4: Mark Pass B · B3 complete in the action plan**

Open `docs/bugs-changes/phase-3f-ship-ready-plan.md` and check off the B3 row + the B3 acceptance criteria in §7. Commit:

```bash
git add docs/bugs-changes/phase-3f-ship-ready-plan.md
git commit -m "docs(phase-3f): mark pass B B3 complete"
```

---

## Acceptance criteria (this plan only — duplicated from spec §7 for traceability)

- [ ] All 5 tile assets at `public/assets/projects/<slug>.webp` are real authored images, each ≤180 KB, at 800×1000.
- [ ] No tile asset under 10 KB (no stubs).
- [ ] Each tile's character placement matches the spec §5 rhythm table.
- [ ] Bottom 250px of every tile is visually quiet (metadata strip overlay reads cleanly).
- [ ] No baked-in titles, taglines, or URLs in any tile image.
- [ ] The home page projects splash, rendered locally, no longer reads as "color blocks."
- [ ] All 5 tile MDX `hero_media_alt` strings updated to match the new image content.
- [ ] No new console errors introduced on `/` or any `/work/<slug>/` page.
- [ ] CHANGELOG entry committed.

---

## Out of scope for this plan

- Case-study body copy authoring (Phase 3F · Pass A · A2 — separate plan).
- The A-3 tile-content overflow CSS bug (Phase 3F · Pass B · B1 — separate plan).
- The teaser swiper cascade bug (Phase 3F · Pass B · B2 — separate plan).
- The OG-card generation script URL-footer bug (Phase 3F · Pass C add-on — to be authored separately).
- Bundle splitting, reduced-motion contract, essay status consistency, trailing slash, architecture slug routing (Phase 3F · Pass C — separate plan).

---

## Self-review notes (Claude internal)

- **Spec coverage:** Each of the 5 tiles in spec §4 has a dedicated task (1–5). Spec §3 shared constraints encoded into every prompt + every visual-QA step. Spec §5 rhythm table verified in Task 6. Spec §6 workflow followed in every per-tile task. Spec §7 acceptance criteria duplicated here for traceability.
- **No placeholders:** Every prompt is complete, character-for-character. Every command is exact. Every file path is absolute or repo-relative with no `<placeholder>` braces.
- **Type/path consistency:** All `hero_media` paths use `.webp` after Task 2 (A-3 is the only extension change). All target paths under `public/assets/projects/` use the exact slug from the MDX frontmatter.
- **Ordering rationale:** A-5 first (lowest risk, validates pipeline) → A-3 (highest technical risk — solve early) → A-1, A-4 (medium risk pencil-test) → A-2 (highest compositional risk, benefits from learnings).
