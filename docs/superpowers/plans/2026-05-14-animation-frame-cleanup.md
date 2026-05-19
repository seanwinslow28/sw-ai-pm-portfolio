# Animation Frame Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Clean every raw animation frame in `loop-1/loop-1-raw/` and `loop-2/loop-2-raw/` (273 frames total, excluding `EXTRA FRAMES/`) so the combined `anchor-1 → loop-1 → anchor-2 → loop-2 → anchor-1` sequence holds a consistent 2D Disney pencil-test feel — no face-drift on Sean, no dirt/grain artifacts over the characters, no morphing in transition frames.

**Architecture:** Per-frame `gemini-3.1-flash-image-preview` (Nano Banana 2) calls via the existing `gemini-pencil-animation-image-gen` skill's `generate_image.py`. Each call passes 3 identity anchors (`anchor-1.png`, `anchor-2.png`, `ai-companion-turnaround-anchor.png`) plus the raw frame itself as pose reference. A thin Bash wrapper (`clean-frame.sh`) handles the per-frame invocation; a batch wrapper (`clean-batch.sh`) iterates a frame range. We work in **calibration → priority batch (frames 92–166) → remainder of loop-1 → loop-2**, with a USER REVIEW GATE between every chunk so the prompt can be re-tuned before more spend.

**Tech Stack:** Python 3 + `google-genai` SDK, Bash wrapper scripts, Gemini 3.1 Flash Image Preview model. Image references: `anchor-1.png`, `anchor-2.png`, `ai-companion-turnaround-anchor.png`. Aspect ratio: `16:9` (matches the raw frames and anchor-2 layout).

---

## Working Paths (memorize these)

| What | Path |
|---|---|
| Animation working dir | `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/` |
| Raw loop-1 frames | `…/loop-1/loop-1-raw/` (146 frames, excluding `EXTRA FRAMES/`) |
| Raw loop-2 frames | `…/loop-2/loop-2-raw/` (127 frames, excluding `EXTRA FRAMES/`) |
| Cleaned loop-1 output | `…/loop-1/loop-1-cleaned/` (created in Task 1) |
| Cleaned loop-2 output | `…/loop-2/loop-2-cleaned/` (created in Task 1) |
| Anchor 1 (Sean solo) | `…/anchor-1.png` |
| Anchor 2 (Sean + companion on shoulder) | `…/anchor-2.png` |
| AI companion turnaround | `…/ai-companion-turnaround-anchor.png` |
| Generation script | `/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py` |
| Wrapper scripts | `…/sw-portfolio-animation-2026/scripts/` (created in Task 1) |
| Prompt text file | `…/sw-portfolio-animation-2026/scripts/cleanup-prompt.txt` (created in Task 2) |
| Cleanup log (audit trail) | `…/sw-portfolio-animation-2026/cleanup-log.txt` |
| `.env` (GEMINI_API_KEY) | `…/sw-portfolio-animation-2026/.env` |

---

## Priority & Sequencing

**Sean's directive:** start with **frames 92–166 of loop-1** (63 frames in that range — the dirt/grain problem zone) because they are the worst regression in the current loop. Everything else flows from a prompt locked there.

- **Phase 0 (Tasks 1–2):** Setup — directories, wrapper scripts, draft prompt
- **Phase 1 (Tasks 3–4):** Calibration on 3 sample frames from the priority zone + USER REVIEW GATE
- **Phase 2 (Tasks 5–7):** Priority batch — process frames 92–166 in 3 chunks of ~21 with review gates
- **Phase 3 (Tasks 8–10):** Loop-1 remainder (frames 1–91) in chunks of ~25 with review gates
- **Phase 4 (Tasks 11–13):** Loop-2 (all 127 frames) in chunks of ~25 with review gates
- **Phase 5 (Task 14):** End-to-end sequence stitching check

**Estimated API cost:** ~273 frames × Nano Banana 2 image gen ≈ low double digits in USD. Calibration may add 5–15 additional sample calls.

---

## Phase 0 — Setup

### Task 1: Directory + .env setup

**Files:**
- Create: `…/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/` (output dir, will hold PNGs)
- Create: `…/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/` (output dir)
- Create: `…/sw-portfolio-animation-2026/scripts/` (script dir)
- Create / verify: `…/sw-portfolio-animation-2026/.env` (contains `GEMINI_API_KEY=...`)
- Create: `…/sw-portfolio-animation-2026/cleanup-log.txt` (empty log)

- [ ] **Step 1: Make output and script directories**

Run:
```bash
mkdir -p /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned
mkdir -p /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned
mkdir -p /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts
touch    /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/cleanup-log.txt
```
Expected: no output, no errors.

- [ ] **Step 2: Verify `GEMINI_API_KEY` is available**

Run:
```bash
test -f /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/.env && \
  grep -c '^GEMINI_API_KEY=' /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/.env
```
Expected: prints `1` if `.env` exists with the key.

If it prints `0` or the file is missing: STOP and ask Sean for the key. Add it with:
```bash
echo 'GEMINI_API_KEY=YOUR_KEY_HERE' > /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/.env
chmod 600 /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/.env
```

- [ ] **Step 3: Verify the `google-genai` Python package is installed**

Run:
```bash
python3 -c "import google.genai; print('ok')"
```
Expected: prints `ok`. If `ModuleNotFoundError`: `pip3 install google-genai`.

- [ ] **Step 4: Sanity-check the generation script is reachable**

Run:
```bash
python3 /Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py --help | head -5
```
Expected: usage banner.

---

### Task 2: Build the cleanup prompt + per-frame wrapper

**Files:**
- Create: `…/sw-portfolio-animation-2026/scripts/cleanup-prompt.txt`
- Create: `…/sw-portfolio-animation-2026/scripts/clean-frame.sh`
- Create: `…/sw-portfolio-animation-2026/scripts/clean-batch.sh`

- [ ] **Step 1: Write the v1 cleanup prompt**

Create file `…/sw-portfolio-animation-2026/scripts/cleanup-prompt.txt` with this exact content (v1.1):

```
[TASK]
You are receiving FOUR reference images and a goal. Redraw the FOURTH reference
image (the raw frame) exactly as it is composed — same character placement,
same body pose, same camera framing, same scale, same hand position, same head
turn, same gaze direction, same facial expression — but with the clean,
anchor-grade pencil-test rendering shown in references 1, 2, and 3.

References 1, 2, and 3 are IDENTITY references only — use them to lock who
the characters ARE (anatomy, proportions, colors, costume, paper aesthetic).
Use Reference 4 for everything about how the scene is COMPOSED in this specific
frame (pose, expression, position, framing).

[REFERENCES]
- Reference 1 (anchor-1): Sean's locked character design — solo, standing,
  three-quarter view. This is THE identity of the human character. His face
  ANATOMY (eye shape and spacing, nose shape, ear position, jaw and chin
  structure, beard density and shape, hairline, hair color and volume, head
  shape), body build, navy t-shirt, gray jeans, and gray sneakers must match
  THIS reference in every output. The hand-drawn "A-2" label in a circle in
  the top-left corner shows the production label style and pencil weight.
  DO NOT copy his pose, expression, or framing from this reference.
- Reference 2 (anchor-2): Sean with the orange companion character perched on
  his shoulder. This is the midpoint composition of the loop. Use it as the
  locked rendering of Sean + companion together — how the two characters
  relate visually when co-present. The "A-7" label in a circle and warm cream
  paper texture in this image is the target paper aesthetic and label style
  for every output frame. DO NOT copy its pose or framing.
- Reference 3 (companion turnaround): Five-view turnaround sheet of the orange
  companion character (front, 3/4 front, side, 3/4 back, back). This is THE
  identity of the orange creature — soft cube-shaped body with rounded edges,
  small rounded stubby limbs, warm terra-cotta orange color, simple dot eyes,
  gentle expression. The companion in your output MUST match the proportions,
  silhouette, and color of this turnaround, regardless of which view angle
  the raw frame requires you to draw it from.
- Reference 4 (raw frame): The COMPOSITION target. Preserve every element of
  the pose, expression, character positioning, and frame layout from this
  image exactly. ONLY change the rendering quality — fix grain, fix face drift,
  fix any morphing artifacts. Do not change WHAT is happening in the frame.

[WHAT TO FIX]
1. SEAN'S FACE IDENTITY (anatomy lock, NOT expression lock) — Across the loop
   Sean's underlying facial anatomy has been subtly drifting (asymmetric features,
   off-center eyes, inconsistent jaw, "morphing" between frames). Lock the
   ANATOMY to Reference 1: same eye shape and spacing, same nose shape, same
   ear position, same jaw/chin structure, same beard density and shape, same
   hairline, same hair color and volume, same head shape. He is the same
   PERSON Reference 1 shows.

   However, his EXPRESSION (mouth shape, eyebrow position, gaze direction,
   eyelid position) follows Reference 4 — if the raw frame shows him laughing,
   draw him laughing; if it shows him with his mouth open, draw it open. The
   anatomy is locked; the performance is not.

2. DIRT / GRAIN ARTIFACTS — Remove any pencil-grain noise, gritty texture,
   smudges, or speckles that overlay the characters' bodies, faces, clothing,
   or the companion. Paper texture (subtle, behind the drawing) is OK and
   expected. Grain ON the drawn characters is NOT OK. Both characters should
   render as cleanly inked-and-colored pencil lines on cream paper — no
   overlay grit on skin, hair, fabric, or the companion's body.

3. COMPANION CONSISTENCY — If the orange companion is in the frame, render it
   with the proportions, color, and silhouette from Reference 3 (turnaround)
   and Reference 2 (mounted on shoulder). No drift in companion shape or color.

4. MORPHING SHAPES — If the raw frame contains an in-between morph/blur shape
   (e.g., a half-formed object between Sean's hands), render it as a clean,
   intentional pencil sketch of the same object — confident lines, no blur,
   no anatomical ambiguity. The shape should read as "an animator drew this
   on purpose," not "AI generated a soft blob."

[WHAT TO PRESERVE — from Reference 4]
- The exact body pose and limb positions.
- Sean's exact facial expression (mouth, eyes, eyebrows, gaze direction).
- The exact camera framing and character scale.
- The position of Sean in the frame (left/center/right).
- The position of the companion relative to Sean (if present).
- The 16:9 horizontal layout matching Reference 4's framing.

[STYLE — PENCIL ANIMATION]
- Traditional animation pencil test drawing on warm cream animation paper (#FAF5E8 approx).
- Lines are warm gray graphite (NOT solid black, NOT ink). Slight stroke-weight
  variation: contour ~2-3px, interior ~1px.
- Visible construction-line ghosts beneath the final drawing — barely there,
  but present.
- Subtle cross-hatching on shaded clothing folds, under the chin, and shadow areas.
- Limited, desaturated flat color fills OVER the pencil work: navy t-shirt,
  cool gray jeans, warm skin tones, muted sandy blonde hair, warm terra-cotta
  orange for the companion.
- Subtle paper grain texture in the background paper only.
- Three small hole-punch marks at the bottom edge of the paper.
- Hand-drawn "A-7" label inside a hand-drawn circle in the TOP-LEFT corner of
  the paper. The label must be in the same screen position, same approximate
  size, and same hand-drawn circle weight as the label in Reference 2. This
  label is identical across every frame — do not re-letter it or move it.

[NEGATIVES — STRICT]
- NO vector-clean lines. NO solid black outlines. NO ink-look. NO cel shading. NO anime style.
- NO saturated colors. NO digital painting / airbrush gradients.
- NO grain, noise, or dirt overlay ON the character bodies, faces, hair, clothing,
  or the companion. (Paper texture in background only.)
- NO drift in Sean's facial ANATOMY — match Reference 1 anatomy precisely.
- NO change to Sean's EXPRESSION — match Reference 4's expression precisely.
- NO drift in companion proportions or color — match Reference 3 precisely.
- NO change to the pose, composition, or framing of Reference 4.
- NO repositioning, resizing, or re-lettering of the "A-7" label.

[OUTPUT]
A single 16:9 image — the cleaned version of Reference 4, with Sean and (if
present) the orange companion rendered at anchor-grade pencil-test quality.
```

- [ ] **Step 2: Write the per-frame wrapper script**

Create file `…/sw-portfolio-animation-2026/scripts/clean-frame.sh` with this exact content:

```bash
#!/usr/bin/env bash
# clean-frame.sh — run Nano Banana 2 cleanup on a single raw frame.
# Usage: ./clean-frame.sh <raw_frame_path> <output_path>

set -euo pipefail

RAW="${1:?usage: clean-frame.sh <raw_frame_path> <output_path>}"
OUT="${2:?usage: clean-frame.sh <raw_frame_path> <output_path>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026"
SCRIPT="/Users/seanwinslow/Code-Brain/BMAD/.claude/skills/gemini-pencil-animation-image-gen/scripts/generate_image.py"
PROMPT_FILE="${ANIM_DIR}/scripts/cleanup-prompt.txt"
ENV_FILE="${ANIM_DIR}/.env"
LOG="${ANIM_DIR}/cleanup-log.txt"

ANCHOR_1="${ANIM_DIR}/anchor-1.png"
ANCHOR_2="${ANIM_DIR}/anchor-2.png"
TURNAROUND="${ANIM_DIR}/ai-companion-turnaround-anchor.png"

PROMPT="$(cat "$PROMPT_FILE")"

mkdir -p "$(dirname "$OUT")"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] CLEAN $RAW -> $OUT" | tee -a "$LOG"

python3 "$SCRIPT" "$PROMPT" \
  --output "$OUT" \
  --aspect-ratio 16:9 \
  --env-file "$ENV_FILE" \
  --reference "$ANCHOR_1" "$ANCHOR_2" "$TURNAROUND" "$RAW" \
  2>&1 | tee -a "$LOG"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] DONE  $OUT" | tee -a "$LOG"
```

Then mark executable:
```bash
chmod +x /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame.sh
```

- [ ] **Step 3: Write the batch wrapper script**

Create file `…/sw-portfolio-animation-2026/scripts/clean-batch.sh` with this exact content:

```bash
#!/usr/bin/env bash
# clean-batch.sh — clean a numeric range of raw frames from a given raw dir.
# Usage: ./clean-batch.sh <raw_dir> <out_dir> <start_num> <end_num>
#   e.g. ./clean-batch.sh .../loop-1/loop-1-raw .../loop-1/loop-1-cleaned 92 166

set -euo pipefail

RAW_DIR="${1:?usage: clean-batch.sh <raw_dir> <out_dir> <start_num> <end_num>}"
OUT_DIR="${2:?usage: clean-batch.sh <raw_dir> <out_dir> <start_num> <end_num>}"
START="${3:?usage: clean-batch.sh <raw_dir> <out_dir> <start_num> <end_num>}"
END="${4:?usage: clean-batch.sh <raw_dir> <out_dir> <start_num> <end_num>}"

ANIM_DIR="/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026"
CLEAN="${ANIM_DIR}/scripts/clean-frame.sh"
LOG="${ANIM_DIR}/cleanup-log.txt"

mkdir -p "$OUT_DIR"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] BATCH $RAW_DIR frames $START..$END" | tee -a "$LOG"

processed=0
skipped=0
for raw in "$RAW_DIR"/frame_*.png; do
  name="$(basename "$raw")"
  num=$(echo "$name" | sed -E 's/frame_0*([0-9]+)\.png/\1/')
  if (( num < START || num > END )); then continue; fi
  out="$OUT_DIR/$name"
  if [[ -f "$out" ]]; then
    echo "  SKIP existing $out" | tee -a "$LOG"
    skipped=$((skipped+1))
    continue
  fi
  "$CLEAN" "$raw" "$out"
  processed=$((processed+1))
done

echo "[$(date '+%Y-%m-%d %H:%M:%S')] BATCH DONE processed=$processed skipped=$skipped" | tee -a "$LOG"
```

Then mark executable:
```bash
chmod +x /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh
```

- [ ] **Step 4: Smoke-test the wrapper with `--help` of the underlying script (no API call)**

Run:
```bash
bash -n /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame.sh
bash -n /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh
```
Expected: no output (syntax-OK).

---

## Phase 1 — Calibration

### Task 3: Run 3 calibration frames

Calibration set — three frames chosen to span the priority zone's challenges:
1. `frame_0092.png` — companion airborne / mid-summon (silhouette test for the orange character)
2. `frame_0125.png` — companion mounting Sean's shoulder (composition test with both characters)
3. `frame_0166.png` — companion fully settled on shoulder (closest match to `anchor-2`, identity-lock test)

**Files:**
- Read: `…/loop-1/loop-1-raw/frame_0092.png`, `frame_0125.png`, `frame_0166.png`
- Write: `…/loop-1/loop-1-cleaned/frame_0092.png`, `frame_0125.png`, `frame_0166.png`

- [ ] **Step 1: Run frame 0092 through the wrapper**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw/frame_0092.png \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/frame_0092.png
```
Expected: prints `Saved: …/frame_0092.png` and `DONE`. File appears at the output path.

- [ ] **Step 2: Run frame 0125**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw/frame_0125.png \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/frame_0125.png
```
Expected: same — file written.

- [ ] **Step 3: Run frame 0166**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw/frame_0166.png \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/frame_0166.png
```
Expected: file written.

- [ ] **Step 4: Display all three cleaned outputs side-by-side against raw + anchor**

Read each via the Read tool and surface them to Sean:
- `…/anchor-1.png` (identity target — Sean)
- `…/anchor-2.png` (identity target — Sean + companion)
- `…/loop-1/loop-1-raw/frame_0092.png` vs `…/loop-1/loop-1-cleaned/frame_0092.png`
- `…/loop-1/loop-1-raw/frame_0125.png` vs `…/loop-1/loop-1-cleaned/frame_0125.png`
- `…/loop-1/loop-1-raw/frame_0166.png` vs `…/loop-1/loop-1-cleaned/frame_0166.png`

---

### Task 4: 🚦 USER REVIEW GATE — Calibration

- [ ] **Step 1: Present checklist to Sean**

For each of the 3 cleaned calibration frames, ask:
1. Does Sean's face match `anchor-1.png` (no drift, no asymmetry, beard/hair/eyes intact)?
2. Is the dirt/grain over the characters gone (paper grain in background is fine)?
3. If the companion is present, does it match the turnaround proportions and color?
4. Is the pose/composition preserved from the raw frame?
5. Does the overall paper texture, label style, and pencil weight match the anchors?

- [ ] **Step 2: Decision**

- If all 3 pass on all 5 criteria → proceed to Task 5.
- If any fail → identify the specific failure mode, edit `scripts/cleanup-prompt.txt` (the "WHAT TO FIX" or "STYLE" section as appropriate), delete the 3 cleaned files, and re-run Task 3. Repeat until pass.

⚠️ **Do not proceed past this gate without Sean's explicit approval.** This is the single most important checkpoint in the plan — every downstream frame uses this prompt.

---

## Phase 2 — Priority Batch (loop-1 frames 92–166)

63 frames in this range. Three chunks of ~21 each.

### Task 5: Priority chunk A — frames 92–113

**Files:**
- Read: 22 frames in `…/loop-1/loop-1-raw/` numbered 92–113 (inclusive, when they exist; gaps are normal)
- Write: corresponding frames in `…/loop-1/loop-1-cleaned/`

- [ ] **Step 1: Run the chunk**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  92 113
```
Expected: `BATCH DONE processed=<N> skipped=<M>` where N+M equals the count of raw frames in range 92–113. (The frame 0092 from calibration will be skipped because the output already exists.)

- [ ] **Step 2: Surface 4 spot-check frames to Sean**

Use the Read tool to display: the lowest-numbered output, the highest-numbered output, and 2 middle outputs. Compare each against its raw counterpart.

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk A**

Same 5-question checklist as Task 4 Step 1. If any frame fails identity lock or has grain over characters: pause, regenerate that single frame (delete + re-run `clean-frame.sh`), re-review. If a systemic regression appears across multiple frames, revisit the prompt and rerun the failed frames.

⚠️ Do not start Task 6 until Sean approves Chunk A.

---

### Task 6: Priority chunk B — frames 114–139

- [ ] **Step 1: Run the chunk**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  114 139
```
Expected: `BATCH DONE` with frame 0125 skipped (calibration).

- [ ] **Step 2: Spot-check 4 frames**

Same as Task 5 Step 2.

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk B**

Same 5-question checklist. ⚠️ Block Task 7 on approval.

---

### Task 7: Priority chunk C — frames 140–166

- [ ] **Step 1: Run the chunk**

Run:
```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  140 166
```
Expected: `BATCH DONE` with frame 0166 skipped (calibration).

- [ ] **Step 2: Spot-check 4 frames**

Same as Task 5 Step 2.

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk C + transition check**

Plus an extra check at this gate: pull `…/loop-1/loop-1-cleaned/frame_0166.png` and compare to `…/anchor-2.png`. The last priority-zone frame must transition cleanly into the midpoint anchor. If it doesn't, regenerate frame 0166 with stronger anchor-2 emphasis (e.g., temporarily reorder references to put anchor-2 first).

⚠️ Block Task 8 on approval. Priority zone complete after this.

---

## Phase 3 — Loop-1 remainder (frames 1–91)

91 candidate frame numbers, ~88 actual frames (gaps exist). Four chunks of ~22.

### Task 8: Loop-1 chunk D — frames 1–22

- [ ] **Step 1: Run**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  1 22
```

- [ ] **Step 2: Spot-check 4 frames** + check `frame_0001.png` transitions cleanly from `anchor-1.png`.

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk D + anchor-1 transition check**

⚠️ Block Task 9 on approval.

---

### Task 9: Loop-1 chunk E — frames 23–45

- [ ] **Step 1: Run**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  23 45
```

- [ ] **Step 2: Spot-check 4 frames**

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk E**

⚠️ Block on approval.

---

### Task 10: Loop-1 chunks F + G — frames 46–91

Combined chunk this time (~45 frames, but it's familiar territory by now — Sean solo, no companion). If runtime gets long, the batch script can be ctrl-C'd and re-run; it skips existing outputs.

- [ ] **Step 1: Run chunk F (46–68)**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  46 68
```

Pay special attention to `frame_0064.png` (the "morphing red shape between hands" frame). Spot-check it specifically against Sean's prompt direction in the WHAT TO FIX section for clean intentional shape rendering.

- [ ] **Step 2: 🚦 USER REVIEW GATE — Chunk F (includes morphing-shape decision)**

If `frame_0064`-style frames are rendering ambiguously, edit the prompt's "MORPHING SHAPES" section with a more specific instruction (e.g., "render as a clean pencil-line motion arc" vs "render as the companion materializing as a soft glow"). Regenerate any morphing-shape frames after prompt edit.

- [ ] **Step 3: Run chunk G (69–91)**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned \
  69 91
```

- [ ] **Step 4: 🚦 USER REVIEW GATE — Chunk G (loop-1 complete)**

Final loop-1 check: confirm count.
```bash
ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/*.png | wc -l
ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-raw/*.png 2>/dev/null | wc -l
```
Expected: both equal 146. Block Task 11 on approval.

---

## Phase 4 — Loop-2 (all 127 frames)

Loop-2 raw range: frame_0001 through ~frame_0166 with gaps (127 frames total). Five chunks of ~25.

### Task 11: Loop-2 chunk H — frames 1–35

- [ ] **Step 1: Run**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned \
  1 35
```

Plus an extra check at this gate: confirm `…/loop-2/loop-2-cleaned/frame_0001.png` transitions cleanly from `anchor-2.png` (loop-2 starts at the midpoint, with companion on shoulder).

- [ ] **Step 2: Spot-check 4 frames + anchor-2 transition**

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk H**

⚠️ Block on approval.

---

### Task 12: Loop-2 chunks I + J — frames 36–105

- [ ] **Step 1: Run chunk I (36–70)**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned \
  36 70
```

- [ ] **Step 2: 🚦 USER REVIEW GATE — Chunk I**

- [ ] **Step 3: Run chunk J (71–105)**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned \
  71 105
```

- [ ] **Step 4: 🚦 USER REVIEW GATE — Chunk J**

⚠️ Block on approval.

---

### Task 13: Loop-2 chunk K — frames 106–end

- [ ] **Step 1: Run**

```bash
/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-batch.sh \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw \
  /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned \
  106 999
```

Plus an extra check: the LAST loop-2 frame (highest numbered) must transition cleanly back to `anchor-1.png` (the loop wraps around).

- [ ] **Step 2: Spot-check final 3 frames + anchor-1 transition**

- [ ] **Step 3: 🚦 USER REVIEW GATE — Chunk K (loop-2 complete)**

Final loop-2 count check:
```bash
ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/*.png | wc -l
ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw/*.png 2>/dev/null | wc -l
```
Expected: both equal 127. Block Task 14 on approval.

---

## Phase 5 — Sequence verification

### Task 14: End-to-end loop stitching check

- [ ] **Step 1: Verify total counts**

```bash
echo "anchor-1 + loop-1 + anchor-2 + loop-2 = $(echo "1 + $(ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/*.png | wc -l) + 1 + $(ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/*.png | wc -l)" | bc) frames in full loop"
```
Expected: prints `1 + 146 + 1 + 127 = 275 frames in full loop` (the wraparound back to anchor-1 isn't double-counted — it's the same file as the start).

- [ ] **Step 2: Surface the four critical transitions to Sean for sign-off**

Display these pairs via the Read tool:
1. `anchor-1.png` → `loop-1/loop-1-cleaned/frame_0001.png` (start)
2. `loop-1/loop-1-cleaned/frame_0166.png` (or actual max number) → `anchor-2.png` (midpoint)
3. `anchor-2.png` → `loop-2/loop-2-cleaned/frame_0001.png` (post-midpoint)
4. `loop-2/loop-2-cleaned/frame_<max>.png` → `anchor-1.png` (loop wraparound)

- [ ] **Step 3: 🚦 USER REVIEW GATE — Final sign-off**

If any of the four transitions read as discontinuous (jump cut, identity drift, paper-texture mismatch), regenerate just the bordering 1–3 frames with extra prompt emphasis on matching the adjacent anchor.

- [ ] **Step 4: Optional — generate a contact-sheet preview**

Skip if Sean is happy. Otherwise (and only if requested), use ffmpeg to build a quick MP4 preview:
```bash
# This is a preview-only step. Frame numbering has gaps so we may need a renumbering pass first; ask Sean before running.
echo "Preview generation deferred — ask Sean if needed."
```

---

## Self-Review Summary

**Spec coverage check:**
- ✅ Clean all loop-1 frames (Tasks 5–10)
- ✅ Clean all loop-2 frames (Tasks 11–13)
- ✅ Skip `EXTRA FRAMES/` subdirs (batch script only reads `frame_*.png` in the supplied raw dir, not subdirs)
- ✅ Use anchor-1, anchor-2, and ai-companion-turnaround as identity references (wrapper passes all three)
- ✅ Fix dirt/grain artifacts (prompt "WHAT TO FIX" §2)
- ✅ Fix face morphing on Sean (prompt "WHAT TO FIX" §1)
- ✅ Fix odd morphing shapes like frame_0064 (prompt "WHAT TO FIX" §4)
- ✅ Sample-test before batching (Phase 1 calibration)
- ✅ Multiple review rounds with checkpoints (every chunk has a USER REVIEW GATE)
- ✅ Combined loop starts and ends with anchor-1 (Task 14 transition checks)
- ✅ Priority on dirt/grain frames 92–166 first (Phase 2 runs before Phase 3)

**Placeholder scan:** No TBDs, no "implement later," no "similar to Task N" — each task has explicit commands and paths.

**Type/path consistency:** Wrapper scripts always invoke `clean-frame.sh` by absolute path. Output directory naming (`loop-1-cleaned/`, `loop-2-cleaned/`) is consistent. Reference order (anchor-1, anchor-2, turnaround, raw) is consistent across all batches — the prompt's reference numbering matches.

**Open risks not eliminated:**
1. Nano Banana 2 may not preserve exact pose perfectly — if pose drift appears in calibration, we'll need a prompt tweak before Phase 2.
2. The "morphing shapes" creative call (frame_0064 et al.) is deferred to a Phase 3 mid-task decision rather than pre-locked. This is intentional — Sean should see how the model handles those frames first before deciding the visual direction.
