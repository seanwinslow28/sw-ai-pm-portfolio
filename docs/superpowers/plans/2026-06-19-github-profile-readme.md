# GitHub Profile README Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship Sean Winslow's GitHub profile README (`seanwinslow28/seanwinslow28`) — a recruiter-first landing page led by his hand-drawn pencil-test character, funnelling to seanwinslow.com.

**Architecture:** A self-contained working folder on Sean's machine holds three artifacts — a composed wide banner image, the `README.md`, and a `gh`-based ship script. The banner is composed from his existing character PNG (not AI-regenerated, to preserve the load-bearing identity). The ship script creates the profile repo if needed and pushes the README + banner. Live verification (links resolve, banner renders, repo public) is the final gate.

**Tech Stack:** Python + Pillow (banner composition), GitHub CLI (`gh`) + git (repo + push), GitHub-flavored Markdown (README rendering — GitHub typography, no custom fonts).

**Design source of truth:** [`docs/superpowers/specs/2026-06-19-github-profile-readme-design.md`](../specs/2026-06-19-github-profile-readme-design.md)

---

## Locked inputs

| Input | Value |
|-------|-------|
| Profile repo | `seanwinslow28/seanwinslow28` (public) |
| Banner | Use the generated Nano Banana 21:9 art (`docs/superpowers/images/github-hero-nb2-21x9.png`), cropped/optimized to `assets/banner.png` (chosen 2026-06-20). The from-scratch PIL composition in Task 2 is superseded. |
| Ship mechanism | README + script to create & push, run on Sean's machine (chosen: `script`) |
| Banner source art | `sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png` |
| anima | https://github.com/seanwinslow28/anima |
| code-brain | https://github.com/seanwinslow28/code-brain |
| intent-engineering-mcp (label) | https://github.com/seanwinslow28/sw-mcp-intent-engineering |
| 16BitFit (label) | https://github.com/seanwinslow28/16BitFit-V3 |
| Portfolio | https://seanwinslow.com |
| Email | sean.winslow28@gmail.com |
| LinkedIn | https://www.linkedin.com/in/sean-winslow-204390a5 |

> Note on "tests": this is a content + asset + shipping deliverable, not a unit-tested code module. Each task's verification step is a concrete check (image dimensions, markdown preview, link resolution, repo visibility) rather than a pytest run. That is the honest analog of TDD here.

## File structure

Working folder on Sean's machine: `~/Downloads/profile-readme/`

- Create: `~/Downloads/profile-readme/build_banner.py` — Pillow script that composes the wide banner.
- Create: `~/Downloads/profile-readme/assets/banner.png` — the composed banner (output of `build_banner.py`).
- Create: `~/Downloads/profile-readme/README.md` — the final profile README.
- Create: `~/Downloads/profile-readme/create-profile-readme.sh` — creates/updates the profile repo and pushes.
- Copy in: the source character PNG (step 1 of Task 2).

The profile repo, once shipped, holds `README.md` + `assets/banner.png`.

---

### Task 1: Set up the working folder

**Files:**
- Create: `~/Downloads/profile-readme/` and `~/Downloads/profile-readme/assets/`

- [ ] **Step 1: Make the folders**

Run:
```bash
mkdir -p ~/Downloads/profile-readme/assets
```

- [ ] **Step 2: Copy the source character art in**

Run (adjust the source path if your portfolio repo lives elsewhere):
```bash
cp ~/Code-Brain/sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png \
   ~/Downloads/profile-readme/assets/character-source.png
```

- [ ] **Step 3: Verify**

Run: `ls -la ~/Downloads/profile-readme/assets/`
Expected: `character-source.png` is present (a few MB).

---

### Task 2: Prepare the banner

> SUPERSEDED 2026-06-20: the banner art is already generated — the chosen Nano Banana 21:9 image at `docs/superpowers/images/github-hero-nb2-21x9.png`. This task is now: crop/optimize that image into `assets/banner.png` (downscale to ~1600px wide, optimize file size, preserve every figure, the frame numbers, the "A-1" label, and the hole-punches; trim only uniform empty margins). The from-scratch Pillow composition steps below are retained for reference only and are NOT executed.

**Files:**
- Create: `~/Downloads/profile-readme/build_banner.py`
- Output: `~/Downloads/profile-readme/assets/banner.png`

- [ ] **Step 1: Inspect the source image (dimensions, transparency, corner color)**

Create `~/Downloads/profile-readme/inspect_source.py`:
```python
from PIL import Image
im = Image.open("assets/character-source.png")
print("size:", im.size, "mode:", im.mode)
print("has alpha:", im.mode in ("RGBA", "LA") or "transparency" in im.info)
rgb = im.convert("RGB")
print("top-left pixel:", rgb.getpixel((0, 0)))
print("top-right pixel:", rgb.getpixel((im.size[0] - 1, 0)))
```
Run: `cd ~/Downloads/profile-readme && python3 inspect_source.py`
Expected: prints the source dimensions, whether it has an alpha channel, and the corner colors. This tells us the pad color to blend the banner edges.

- [ ] **Step 2: Write the banner composer**

Create `~/Downloads/profile-readme/build_banner.py`:
```python
from PIL import Image

SRC = "assets/character-source.png"
OUT = "assets/banner.png"
BANNER_W, BANNER_H = 1280, 360          # GitHub-friendly wide aspect (~3.5:1)
PAPER = (255, 249, 240)                  # warm paper #FFF9F0 (brand)

src = Image.open(SRC).convert("RGBA")

# If the source has no transparency, sample its top-left corner so the banner
# background blends with the artwork's own background instead of showing a box.
flat = src.convert("RGB")
corner = flat.getpixel((0, 0))
bg = corner if corner != (255, 255, 255) else PAPER

canvas = Image.new("RGBA", (BANNER_W, BANNER_H), bg + (255,))

# Scale the character to ~88% of banner height, preserving aspect.
target_h = int(BANNER_H * 0.88)
scale = target_h / src.height
target_w = int(src.width * scale)
char = src.resize((target_w, target_h), Image.LANCZOS)

# Place left-of-center, leaving open paper on the right (room to breathe).
x = int(BANNER_W * 0.08)
y = (BANNER_H - target_h) // 2
canvas.alpha_composite(char, (x, y))

canvas.convert("RGB").save(OUT, "PNG")
print("wrote", OUT, canvas.size)
```

- [ ] **Step 3: Run it**

Run: `cd ~/Downloads/profile-readme && python3 build_banner.py`
Expected: `wrote assets/banner.png (1280, 360)`
(If Pillow is missing: `pip3 install Pillow --break-system-packages` then re-run.)

- [ ] **Step 4: Verify visually**

Run: `open ~/Downloads/profile-readme/assets/banner.png`
Expected: a wide banner, character on the left, blended background, no hard rectangular edge around the artwork. If the edge shows or the crop feels off, adjust `bg`, `x`, or `target_h` in `build_banner.py` and re-run Step 3. Iterate until it reads clean.

---

### Task 3: Write the README

**Files:**
- Create: `~/Downloads/profile-readme/README.md`

- [ ] **Step 1: Write the README**

Create `~/Downloads/profile-readme/README.md` with exactly this content:
```markdown
<p align="center">
  <img src="assets/banner.png" alt="Hand-drawn pencil-test character by Sean Winslow" width="100%">
</p>

# Sean Winslow

AI Product Manager · a creative who learned to think like a PM, now shipping with a fleet of agents

> The agents handle the loops. I handle the taste.

I build at the seam where creative work meets autonomous systems — I design the pipeline, make the calls that need taste, and let a fleet of agents do everything that can be made cheap, parallel, and structured.

## What I'm building

- **[anima](https://github.com/seanwinslow28/anima)** — a 2D-animation pipeline run by a human and a fleet of agents. Ten phases, a critic stack, a human gate at every taste call.
- **[code-brain](https://github.com/seanwinslow28/code-brain)** — my command center: 100+ skills and 9 autonomous agents running my second brain on a schedule.
- **[intent-engineering-mcp](https://github.com/seanwinslow28/sw-mcp-intent-engineering)** — an MCP server that tells agents to act with intent.
- **[16BitFit](https://github.com/seanwinslow28/16BitFit-V3)** — a fitness fighting game where real workouts power your fighter. On pause to build its engine first.

## How I work

Nine agents run on a schedule, backed by 100+ skills. They draft, research, QA, and remember. I own timing, casting, and taste — and the final call to ship.

🟢 **Currently open to AI, Technical, and Creative PM roles**

### See the full portfolio → [seanwinslow.com](https://seanwinslow.com)

[Portfolio](https://seanwinslow.com) · [Email](mailto:sean.winslow28@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sean-winslow-204390a5)
```

- [ ] **Step 2: Verify the markdown locally**

Run: `cat ~/Downloads/profile-readme/README.md` and eyeball it.
Expected: four project bullets each link to a real repo; the availability line, portfolio CTA, and the three footer links are all present. (Full render is verified live in Task 5.)

> Optional upgrade: the `🟢` line can become a teal shields.io badge instead — `![Open to roles](https://img.shields.io/badge/Open_to-AI_·_Technical_·_Creative_PM_roles-0A3E42)`. Plain text is the robust default; only swap if you want the visual pop and accept the external image dependency.

---

### Task 4: Write the ship script

**Files:**
- Create: `~/Downloads/profile-readme/create-profile-readme.sh`

- [ ] **Step 1: Write the script**

Create `~/Downloads/profile-readme/create-profile-readme.sh`:
```bash
#!/usr/bin/env bash
set -euo pipefail

# Creates (or updates) the GitHub profile README repo and pushes README + banner.
USER_REPO="seanwinslow28/seanwinslow28"
WORKDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

command -v gh >/dev/null 2>&1 || { echo "Install GitHub CLI first: brew install gh"; exit 1; }
gh auth status >/dev/null 2>&1 || { echo "Log in first: gh auth login"; exit 1; }
[ -f "$WORKDIR/README.md" ] || { echo "Missing README.md — run Task 3 first."; exit 1; }
[ -f "$WORKDIR/assets/banner.png" ] || { echo "Missing assets/banner.png — run Task 2 first."; exit 1; }

TMP="$(mktemp -d)"
if gh repo view "$USER_REPO" >/dev/null 2>&1; then
  echo "Repo exists — cloning to update..."
  gh repo clone "$USER_REPO" "$TMP" >/dev/null 2>&1
else
  echo "Creating $USER_REPO (public)..."
  gh repo create "$USER_REPO" --public --clone=false >/dev/null
  git -C "$TMP" init -q
  git -C "$TMP" remote add origin "https://github.com/$USER_REPO.git"
  git -C "$TMP" branch -M main
fi

cp "$WORKDIR/README.md" "$TMP/README.md"
mkdir -p "$TMP/assets"
cp "$WORKDIR/assets/banner.png" "$TMP/assets/banner.png"

git -C "$TMP" add README.md assets/banner.png
git -C "$TMP" commit -q -m "Add profile README with character banner" || { echo "Nothing changed."; exit 0; }
git -C "$TMP" branch -M main
git -C "$TMP" push -u origin main

echo "Done → https://github.com/seanwinslow28"
```

- [ ] **Step 2: Make it executable + sanity-check**

Run:
```bash
chmod +x ~/Downloads/profile-readme/create-profile-readme.sh
bash -n ~/Downloads/profile-readme/create-profile-readme.sh && echo "syntax OK"
```
Expected: `syntax OK`.

---

### Task 5: Ship it + verify live

**Files:** none (runs the script, then checks the live profile)

- [ ] **Step 1: Confirm gh has repo-creation scope**

Run: `gh auth status`
Expected: logged in. (Repo creation uses the standard `repo` scope from `gh auth login` — no extra refresh needed, unlike the earlier `delete_repo` cleanup.)

- [ ] **Step 2: Run the ship script**

Run: `~/Downloads/profile-readme/create-profile-readme.sh`
Expected: prints "Creating seanwinslow28/seanwinslow28 (public)..." then "Done → https://github.com/seanwinslow28".

- [ ] **Step 3: Verify the live profile**

Open `https://github.com/seanwinslow28` and confirm:
- The banner renders at the top, character visible, no broken-image icon.
- All four project names link to live repos (click each; none 404). If `sw-mcp-intent-engineering` or `16BitFit-V3` is private, either make it public (`gh repo edit seanwinslow28/<repo> --visibility public --accept-visibility-change-consequences`) or repoint that bullet to its portfolio case study.
- The portfolio CTA opens seanwinslow.com; Email opens a compose window; LinkedIn opens the profile.
- Repo itself is public: `gh repo view seanwinslow28/seanwinslow28 --json visibility`.

- [ ] **Step 4: Done**

The profile README is live. (No further commit needed — the script already pushed.)

---

## Self-review

**Spec coverage:** Banner (Task 2) ✓ · name/positioning/tagline/intro/projects/how-I-work/availability/CTA/contact, all in the README copy (Task 3) ✓ · portfolio-primary funnel (Task 3 CTA + Task 5 link check) ✓ · honesty numbers 9 agents / 100+ skills (Task 3 copy) ✓ · GitHub-native rendering constraint, name-as-text-not-baked-into-banner (Task 2 composes character only; name lives in README markdown) ✓ · script ship mechanism (Tasks 4–5) ✓. Out-of-scope items (pinned-repos polish) intentionally excluded.

**Placeholder scan:** All file paths, the full README content, the banner script, and the ship script are concrete. The one adjustable is banner aesthetics (Task 2 Step 4 iterate loop) — expected, with explicit knobs named.

**Consistency:** Repo URLs match the locked-inputs table everywhere they appear. `~/Downloads/profile-readme/` is the working folder in every task. Display labels (`intent-engineering-mcp`, `16BitFit`) intentionally differ from repo slugs (`sw-mcp-intent-engineering`, `16BitFit-V3`) — link text vs. repo name, by design.

## Out of scope (separate follow-ons)

- Pinned-repos polish (About descriptions, topic tags, per-repo README heroes for the six pins).
- Making the linked project repos public if any are currently private (flagged as a check in Task 5 Step 3).
