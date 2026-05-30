#!/usr/bin/env python3
"""
Generate the 4 OG cards for sw-ai-pm-portfolio Phase 0.
Outputs PNGs at 1200x630 to reference-images/og-cards/.

Design contract (per docs/specs/site-chrome-spec-v1.md §12 + per-page specs):
- Paper background #FFF9F0
- Ink #1A1A1A, Teal #0A3E42, Stamp amber #7C2D12, Secondary ink #546E71
- Newsreader (serif) + JetBrains Mono (mono) — two fonts only
- One splash color per card max
- Layout: dateline strip → rule → title (serif) → hook (italic) → wordmark/URL foot
"""

import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# --- Colors (from DESIGN.md + site-chrome-spec-v1.md §5) ---
PAPER = (255, 249, 240)          # #FFF9F0
INK = (26, 26, 26)               # #1A1A1A
SECONDARY = (84, 110, 113)       # #546E71
TEAL = (10, 62, 66)              # #0A3E42
STAMP_AMBER = (124, 45, 18)      # #7C2D12
SPLASH_AMBER = (250, 199, 117)   # #FAC775 — projects splash

# --- Fonts (variable TTFs — Pillow loads default variation) ---
FONT_DIR = "/tmp/og-fonts"
NEWSREADER = os.path.join(FONT_DIR, "newsreader-300.ttf")
NEWSREADER_ITALIC = os.path.join(FONT_DIR, "newsreader-italic.ttf")
MONO = os.path.join(FONT_DIR, "jetbrains-mono.ttf")

# --- Output ---
OUT_DIR = "/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/reference-images/og-cards"
ESSAYS_OUT = os.path.join(OUT_DIR, "essays")
os.makedirs(ESSAYS_OUT, exist_ok=True)

# --- Canvas ---
W, H = 1200, 630
PAD_L = 80
PAD_R = 80
PAD_T = 70
PAD_B = 70

# --- Variable font axis helpers ---
def set_var(font, **axes):
    """Best-effort set variable-font axes; falls back silently if unsupported."""
    try:
        font.set_variation_by_axes(list(axes.values()))
    except Exception:
        pass
    return font

def load_font(path, size, *, weight=None, opsz=None):
    """Load a font at given pixel size; set variable axes if applicable."""
    f = ImageFont.truetype(path, size=size)
    if weight is None and opsz is None:
        return f
    axes = []
    # Newsreader variable axes are (opsz, wght). JetBrainsMono is (wght,).
    # We probe via try/except instead of hard-coding the axis order.
    try:
        axis_names = f.get_variation_axes()
        for axis in axis_names:
            tag = axis.get("name", "").lower() if isinstance(axis.get("name"), str) else ""
            if "opsz" in tag or "optical" in tag:
                axes.append(opsz if opsz is not None else axis.get("default", 14))
            elif "wght" in tag or "weight" in tag:
                axes.append(weight if weight is not None else axis.get("default", 400))
            else:
                axes.append(axis.get("default", 400))
        f.set_variation_by_axes(axes)
    except Exception:
        pass
    return f


def add_paper_grain(img, seed=42):
    """Add subtle warm paper grain — sparse multiply noise."""
    random.seed(seed)
    grain = Image.new("L", (W, H), 255)
    gd = ImageDraw.Draw(grain)
    # Sparse darker speckles
    for _ in range(2400):
        x, y = random.randint(0, W - 1), random.randint(0, H - 1)
        v = random.randint(230, 250)
        gd.point((x, y), fill=v)
    grain = grain.filter(ImageFilter.GaussianBlur(0.5))
    # Apply grain as multiply
    base = img.convert("RGB")
    grain_rgb = Image.merge("RGB", (grain, grain, grain))
    out = Image.blend(base, Image.composite(base, grain_rgb,
                                            Image.new("L", (W, H), 255)), 0.0)
    # Simpler approach: multiply each pixel by grain/255
    arr_grain = grain.load()
    arr = out.load()
    for y in range(H):
        for x in range(W):
            r, g, b = arr[x, y]
            m = arr_grain[x, y] / 255.0
            arr[x, y] = (int(r * m + 255 * (1 - m) * 0.0 + r * (1 - m)),
                         int(g * m + g * (1 - m)),
                         int(b * m + b * (1 - m)))
    return out


def add_paper_grain_fast(img, seed=42):
    """Faster grain — overlay sparse low-alpha speckles."""
    random.seed(seed)
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for _ in range(1800):
        x, y = random.randint(0, W - 1), random.randint(0, H - 1)
        alpha = random.randint(4, 12)
        # warm-tone speckle (slight brown)
        od.point((x, y), fill=(80, 60, 40, alpha))
    base = img.convert("RGBA")
    base.alpha_composite(overlay)
    return base.convert("RGB")


def wrap_text(text, font, max_width, draw):
    """Word-wrap to fit max_width pixels."""
    words = text.split()
    lines, cur = [], []
    for w in words:
        trial = " ".join(cur + [w])
        bbox = draw.textbbox((0, 0), trial, font=font)
        if bbox[2] - bbox[0] <= max_width or not cur:
            cur.append(w)
        else:
            lines.append(" ".join(cur))
            cur = [w]
    if cur:
        lines.append(" ".join(cur))
    return lines


def draw_card(out_path, *, dateline, title, hook, wordmark="SW",
              url_line, slug_line, splash=TEAL, stamp_text=None,
              title_size=72, hook_size=38, has_title=True):
    """Render one OG card."""
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)

    # Fonts
    f_dateline = load_font(MONO, 16, weight=500)
    f_title = load_font(NEWSREADER, title_size, weight=400, opsz=72)
    f_hook = load_font(NEWSREADER_ITALIC, hook_size, weight=300, opsz=hook_size)
    f_wordmark = load_font(MONO, 32, weight=600)
    f_url = load_font(MONO, 16, weight=400)
    f_slug = load_font(MONO, 14, weight=500)
    f_stamp = load_font(MONO, 18, weight=600)

    # --- Top dateline strip ---
    d.text((PAD_L, PAD_T), dateline.upper(), font=f_dateline, fill=STAMP_AMBER)

    # --- Horizontal rule below dateline ---
    rule_y = PAD_T + 32
    d.line([(PAD_L, rule_y), (W - PAD_R, rule_y)], fill=TEAL, width=1)

    # --- Splash accent: 4px-wide vertical bar at left content edge ---
    splash_x = PAD_L
    splash_top = rule_y + 28
    splash_bot = H - PAD_B - 70
    d.rectangle([splash_x - 16, splash_top, splash_x - 12, splash_bot], fill=splash)

    # --- Title (centered vertical block within content area) ---
    content_left = PAD_L
    content_right = W - PAD_R
    content_width = content_right - content_left

    y = rule_y + 60
    if has_title and title:
        title_lines = wrap_text(title, f_title, content_width, d)
        line_h = int(title_size * 1.05)
        for line in title_lines:
            d.text((content_left, y), line, font=f_title, fill=INK)
            y += line_h
        y += 18  # gap between title and hook

    # --- Hook line (italic, can wrap) ---
    hook_lines = wrap_text(hook, f_hook, content_width, d)
    hook_line_h = int(hook_size * 1.25)
    for line in hook_lines:
        d.text((content_left, y), line, font=f_hook, fill=INK)
        y += hook_line_h

    # --- Footer: wordmark + URL (lower-left) ---
    foot_y = H - PAD_B - 38
    d.text((content_left, foot_y), wordmark, font=f_wordmark, fill=TEAL)
    wm_bbox = d.textbbox((content_left, foot_y), wordmark, font=f_wordmark)
    url_x = wm_bbox[2] + 18
    url_y = foot_y + 10
    d.text((url_x, url_y), url_line, font=f_url, fill=SECONDARY)

    # --- Footer right: page slug ---
    slug_bbox = d.textbbox((0, 0), slug_line, font=f_slug)
    slug_x = content_right - (slug_bbox[2] - slug_bbox[0])
    slug_y = H - PAD_B - 18
    d.text((slug_x, slug_y), slug_line, font=f_slug, fill=SECONDARY)

    # --- Optional stamp (e.g. SHIPPED 2026-05-12) ---
    if stamp_text:
        stamp_bbox = d.textbbox((0, 0), stamp_text, font=f_stamp)
        sw = stamp_bbox[2] - stamp_bbox[0]
        sh = stamp_bbox[3] - stamp_bbox[1]
        sx = content_right - sw - 16
        sy = rule_y + 28
        # Stamp outline rectangle
        pad_x, pad_y = 14, 10
        d.rectangle(
            [sx - pad_x, sy - pad_y, sx + sw + pad_x, sy + sh + pad_y + 4],
            outline=STAMP_AMBER, width=2
        )
        d.text((sx, sy), stamp_text, font=f_stamp, fill=STAMP_AMBER)

    # --- Paper grain ---
    img = add_paper_grain_fast(img, seed=hash(out_path) & 0xFFFF)

    # --- Save ---
    img.save(out_path, "PNG", optimize=True)
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  → {out_path}  ({size_kb:.1f} KB)")


# ============================================================
# Card definitions
# ============================================================

def card_default():
    draw_card(
        out_path=os.path.join(OUT_DIR, "og-default.png"),
        dateline="Boston · Portfolio · SW",
        title="Sean Winslow",
        hook="AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs.",
        url_line="seanwinslow.com",
        slug_line="/",
        splash=TEAL,
        title_size=88,
        hook_size=36,
    )

def card_vault_scorecard():
    draw_card(
        out_path=os.path.join(OUT_DIR, "vault-scorecard.png"),
        dateline="Boston · Architecture · 2026",
        title="Vault as Agent Infrastructure",
        hook="Most people see Obsidian as content. I treat my vault as agent infrastructure.",
        url_line="seanwinslow.com",
        slug_line="/architecture/vault-scorecard/",
        splash=TEAL,
        title_size=64,
        hook_size=32,
    )

def card_intent_engineering_mcp():
    # Fix #2 (IMPLEMENTATION-PROMPT §5): this card was always Intent Engineering
    # MCP content but mis-filed as vault-knowledge-mcp.png with a wrong URL.
    # Output → intent-engineering-mcp.png; URL → /work/intent-engineering-mcp/.
    draw_card(
        out_path=os.path.join(OUT_DIR, "intent-engineering-mcp.png"),
        dateline="Boston · Case Study · 2026",
        title="Intent Engineering MCP",
        hook="Drawing up agents to act with intent.",
        url_line="seanwinslow.com",
        slug_line="/work/intent-engineering-mcp/",
        splash=SPLASH_AMBER,
        stamp_text="SHIPPED 2026-05-12",
        title_size=72,
        hook_size=38,
    )

def card_essay_meaning_over_access():
    draw_card(
        out_path=os.path.join(ESSAYS_OUT, "meaning-over-access.png"),
        dateline="Boston · Essay · 2026",
        title="Access Over Meaning",
        hook="I bet on meaning, not access.",
        url_line="seanwinslow.com",
        slug_line="/essays/meaning-over-access/",
        splash=TEAL,
        title_size=84,
        hook_size=44,
    )


if __name__ == "__main__":
    print("Generating OG cards (1200×630)...")
    card_default()
    card_vault_scorecard()
    card_intent_engineering_mcp()
    card_essay_meaning_over_access()
    print("Done.")
