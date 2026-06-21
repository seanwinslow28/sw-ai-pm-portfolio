---
name: gemini-pixel-image-gen
description: Generate pixel art sprites, sprite sheets, office backgrounds, and tile assets using Google Gemini's image generation API. Use when creating pixel art characters, agent sprites, office scenes, tile maps, floor tiles, wall tiles, furniture, retro game assets, 8-bit or 16-bit sprites, or any pixel art visual content. Triggers on "generate pixel art", "create sprite", "pixel agent", "office background", "tile asset", "retro sprite", "pixel character", "sprite sheet".
---

# Gemini Pixel Art Image Generator

## Purpose

Generate pixel art assets (character sprites, sprite sheets, floor/wall tiles, furniture, office backgrounds) by calling the Gemini image generation API directly via a Python script. Designed to produce assets compatible with the [pixel-agents](https://github.com/pablodelucca/pixel-agents) rendering engine format. One script, one API call, one saved PNG.

## When to Use

- Creating pixel art character sprites for the Agent Control Center Zone 2
- Generating custom characters from reference photos (e.g., real people as pixel agents)
- Building sprite sheets with animation frames (idle, walk, type, read)
- Producing floor tiles, wall tilesets, or furniture assets
- Creating office background layouts
- User mentions "pixel art", "sprite", "tile", "retro asset", "pixel agent", or "sprite sheet"

## Examples

**Example 1: Custom character from reference photo**
```
User: "Create a pixel art sprite of me based on this photo"
Claude: [Uses gemini-pixel-image-gen] Reads references/pixel-art-prompt-templates.md,
uses Template 1 (Custom Character Sprite), crafts prompt with hot pink background,
captures distinguishing features from the photo, runs generate_image.py, saves PNG.
```

**Example 2: Sprite sheet with animations**
```
User: "Generate a full sprite sheet for my character with walk, type, and idle animations"
Claude: [Uses gemini-pixel-image-gen] Uses Template 2 (Character Sprite Sheet),
builds an 18-frame strip on hot pink background, runs the script, verifies frame alignment.
```

**Example 3: Office floor tiles**
```
User: "Create custom floor tiles for my command center"
Claude: [Uses gemini-pixel-image-gen] Uses Template 3 (Floor Tiles), generates
9 variants at 16x16 each on hot pink background, runs the script.
```

## Prerequisites

1. **API Key:** Set `GEMINI_API_KEY` in your `.env` file or as an environment variable
2. **Python packages:** `pip install google-genai`
3. **Script location:** `scripts/generate_image.py` in this skill directory

## How It Works

The skill uses a single Python script that:
1. Reads your `GEMINI_API_KEY` from environment variables (or `.env` file)
2. Sends your prompt to `gemini-3.1-flash-image-preview` (Nano Banana 2) via the `google-genai` SDK
3. Decodes the image response and saves it as a PNG

This replaces the old 4-layer chain (Claude -> MCP -> Gemini CLI -> Nano Banana -> model) with a direct 1-layer call (script -> API -> PNG).

### Hot Pink Chroma Key Background

Gemini cannot generate true PNG transparency. To make background removal easy later, **always instruct the prompt to use a hot pink/magenta chroma key background (`#FF00FF`)**. This color won't appear in typical pixel art palettes, making manual or scripted removal clean and predictable.

Example prompt suffix: `"The background must be solid hot pink (#FF00FF). Fill the entire background with exactly this color."`

## Script Usage

```bash
# Basic — generate and save
python3 scripts/generate_image.py "your prompt here" --output ./sprite.png

# With env file and aspect ratio
python3 scripts/generate_image.py "A pixel art character on solid hot pink #FF00FF background..." \
  --output ./assets/characters/char_custom.png \
  --aspect-ratio 1:1 \
  --env-file .env
```

### Script Arguments

| Argument | Required | Default | Description |
|----------|----------|---------|-------------|
| `prompt` | Yes | — | The image generation prompt (positional) |
| `--output` / `-o` | No | `./generated.png` | Output file path |
| `--aspect-ratio` | No | `1:1` | Aspect ratio (1:1, 16:9, 9:16, 3:2, 4:3, etc.) |
| `--model` | No | `gemini-3.1-flash-image-preview` | Gemini model name (Nano Banana 2) |
| `--env-file` | No | `.env` | Path to .env file containing GEMINI_API_KEY |

## Critical Asset Specifications (pixel-agents Compatible)

These specs come from the pixel-agents repository and MUST be followed:

| Asset Type | Dimensions | Projection |
|-----------|------------|------------|
| Character sprite | **16x32 px** (W x H) | Top-down orthogonal |
| Floor tile | **16x16 px** | Flat top-down |
| Wall tile | **16x32 px** per sprite | Top-down with height |
| Furniture | Multiples of 16px | Top-down orthogonal |
| Floor tile strip (9 tiles) | **144x16 px** | Flat top-down |
| Sprite sheet (18 frames) | **288x32 px** | Mixed directions |

**NOT isometric.** Pixel-agents uses a flat orthogonal grid with Y-based depth sorting. Prompts must specify "top-down orthogonal" and explicitly reject isometric perspective.

### Character States to Animate

| State | Frames | Pattern | Trigger |
|-------|--------|---------|---------|
| `IDLE` | 2-4 | Breathing loop | Waiting, no active task |
| `WALK` | 4 | 0, 1, 2, 1 | Moving to seat or wandering |
| `TYPE` | 2 | Alternating | Active coding/generation task |
| `READ` | 2 | Alternating | Active Read/Grep/Glob/WebFetch/WebSearch task |

Directions needed: DOWN (front), UP (back), RIGHT (profile). LEFT is auto-generated by flipping RIGHT.

## Prompt Construction Workflow

### Step 1: Read the Templates
Always read `references/pixel-art-prompt-templates.md` first. It contains 7 ready-to-use templates:
1. Custom Character Sprite (from reference photo)
2. Character Sprite Sheet (all animation frames)
3. Floor Tiles (9 variants)
4. Wall Tileset (16-sprite bitmask)
5. Furniture Assets (individual pieces)
6. CRT Screen Content (monitor displays)
7. Full Office Layout Background

### Step 2: Fill In the Template
Replace placeholders with specifics. Key principles from the `image-generator-prompt-science` skill:
- **Narrative over keywords:** Write full sentences, not comma-separated tags
- **Quantified parameters:** "16x32 pixels" not "small sprite"
- **Explicit negatives:** "No anti-aliasing. No gradients. No blur."
- **Perspective clarity:** "Top-down orthogonal, NOT isometric"
- **Background:** Always specify `"solid hot pink (#FF00FF) background"`

### Step 3: Run the Script
```bash
python3 [SKILL_DIR]/scripts/generate_image.py "[PROMPT]" \
  --output [OUTPUT_PATH] \
  --aspect-ratio [RATIO]
```

### Step 4: Verify Output
After generation, use the Read tool to view the image. Check:
- Hot pink background is present and clean
- No anti-aliasing or gradient artifacts
- Correct perspective (flat, not angled)
- Character/asset looks correct

If the image is 80% correct, adjust the prompt rather than starting from scratch — Gemini works well with iterative refinement.

## Cross-References

- For prompt engineering techniques: See `image-generator-prompt-science` skill
- For Gemini model capabilities and limitations: See `gemini-nanobanana-visual/references/Gemini-3-Pro-Image-Master-Prompt-Guide.md`
- For pixel-agents source code: https://github.com/pablodelucca/pixel-agents

## Error Handling

| Error | Cause | Fix |
|-------|-------|-----|
| `GEMINI_API_KEY not found` | Missing env variable | Add to `.env` file or export in shell |
| `403 Forbidden` | API key lacks image gen access | Ensure billing is enabled on Google AI account |
| `400 Bad Request` | Prompt blocked by safety filter | Rephrase prompt, remove potentially flagged terms |
| `No image in response` | Model returned text only | Add "Generate an image of..." prefix |
| `command not found: python` | macOS uses python3 | Use `python3` instead of `python` |
| `Image data is only N bytes` | Corrupt output | Check API key, retry with simpler prompt |

## Success Criteria

- [ ] Script runs without errors and saves a PNG file
- [ ] Hot pink (#FF00FF) background is present for easy chroma key removal
- [ ] Perspective is flat top-down orthogonal (not isometric)
- [ ] No anti-aliasing in output
- [ ] Custom characters are recognizable from their reference photos
- [ ] Sprite sheet frames align cleanly to the pixel grid

## Copy/Paste Ready

```
"Generate a pixel art sprite of me from this photo"
"Create a sprite sheet with walk and typing animations"
"Make custom floor tiles for my office"
"Generate a wall tileset for the command center"
"Create pixel art furniture for the office"
"Build an office background layout"
```
