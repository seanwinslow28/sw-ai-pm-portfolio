# Animation Frame Cleanup — Loop-2 Resume Prompt

Paste the section between the `---` markers below into a new Claude Code session to execute loop-2 cleanup. The pipeline is fully locked from loop-1 work; this session just runs the same playbook on the second loop.

---

You are starting the loop-2 cleanup of Sean Winslow's portfolio animation. Loop-1 is fully complete (146/146 cleaned, gate-approved). The pipeline, prompt, and wrappers are LOCKED — your job is to apply them to loop-2.

## Read first (in order)
1. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/CLAUDE.md` — project orientation
2. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/superpowers/plans/2026-05-14-animation-frame-cleanup.md` — original plan (older — the v2a wrapper below supersedes the multi-reference approach in the plan)
3. This file

## Current state
- **Loop-1:** ✅ 146/146 cleaned, gate-approved across the whole range.
- **Loop-2:** 🔴 0/127 cleaned. Untouched.

## The locked pipeline (v2a — DO NOT DEVIATE)

Through loop-1 we ruled out three approaches before locking v2a:
- v1.1/v1.2/v1.3 multi-reference complex prompts → pose collapse, expression drift, companion hallucination
- v2b (raw + sean-character-turnaround as identity guide, minimal prompt) → still subtly drifts expression toward turnaround sheet's resting smile
- **v2a (raw frame ONLY + single-sentence prompt) → APPROVED.** Preserves pose, expression, and (where present in the raw) the orange companion. Empirically validated across the full loop-1 range.

| Component | Path |
|---|---|
| Prompt (one sentence) | `scripts/cleanup-prompt-v2a.txt` |
| Per-frame wrapper | `scripts/clean-frame-v2a.sh` (single reference: raw frame) |
| Working dir | `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/` |
| Loop-2 raw frames | `loop-2/loop-2-raw/` (127 frames, ignore `EXTRA FRAMES/` if present) |
| Loop-2 output | `loop-2/loop-2-cleaned/` (currently empty) |
| Anchor 1 (Sean solo) | `anchor-1.png` |
| Anchor 2 (Sean + companion mounted) | `anchor-2.png` |
| `.env` (GEMINI_API_KEY) | `.env` (symlink to `/Users/seanwinslow/Code-Brain/BMAD/.env`) |

**The wrapper takes 2 args:** `clean-frame-v2a.sh <raw_path> <output_path>`. It logs to `cleanup-log.txt`. Outputs that already exist are NOT skipped by this wrapper (unlike `clean-batch.sh`) — you call it directly per frame.

## Loop-2 structure
- **Frame 0001 starts at the anchor-2 midpoint** (companion mounted on shoulder). Frame 0001 must transition cleanly FROM anchor-2.
- **Bulk of loop-2 has the companion present** (whether mounted, mid-motion, or dismounting).
- **Final frames wrap back toward anchor-1** (companion exits / dismounts). The last cleaned frame must transition cleanly TO anchor-1.

## Non-negotiable behavior contract
1. **USER REVIEW GATES are blocking.** After every chunk: Read 4 spot-check frames (lowest, highest, 2 middle) + any anchor transition. Walk Sean through the 5-Q checklist:
   - a. Sean's face matches anchor-1 (no drift, no asymmetry)?
   - b. Dirt/grain over characters gone (paper texture in background only)?
   - c. Companion correctly rendered (no extras, no hallucination, no identity drift)?
   - d. Pose/composition preserved from raw frame?
   - e. Paper texture, A-7 label, pencil weight match anchors?
2. **Never auto-approve a gate.** Wait for Sean's explicit "go" before the next chunk.
3. **Dispatch batches as parallel background Bash calls** (`run_in_background=true`). Match the loop-1 cadence: ~23 frames per parallel batch. Foreground timeout is 10 min; single-frame calls average 1–3 min. Do NOT dispatch via a subagent — subagents kill their background processes when their turn ends. You dispatch the jobs yourself.
4. **Handle stuck jobs:** if any background job hangs more than ~10 min while siblings complete, check `ps aux | grep generate_image`, kill the stuck PIDs (`kill <pid>`), and re-dispatch that single frame. This happened twice on loop-1 (API rate-limit retry without timeout) and the kill-and-retry approach worked cleanly.
5. **Never overwrite or delete** files in `loop-2/loop-2-raw/`. Cleaned outputs go ONLY to `loop-2/loop-2-cleaned/`.
6. **Don't modify the prompt** (`cleanup-prompt-v2a.txt`) without Sean's explicit approval — it's locked.

## Start procedure
1. Read the orientation files above.
2. Run quick state check:
   ```bash
   ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw/ | wc -l
   ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/ 2>/dev/null | wc -l
   ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw/frame_*.png | awk -F'frame_|\\.png' '{print $2}' | sort -n | head -5
   ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw/frame_*.png | awk -F'frame_|\\.png' '{print $2}' | sort -n | tail -5
   ```
3. Confirm understanding back to Sean in ≤120 words.
4. **Calibration first — run frame 0001 alone and gate it against the anchor-2 transition.** Loop-2 starts at the midpoint, so the first frame's continuity from `anchor-2.png` is the critical test:
   ```bash
   /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/scripts/clean-frame-v2a.sh \
     /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-raw/frame_0001.png \
     /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/frame_0001.png
   ```
   Then Read `anchor-2.png` + cleaned `frame_0001.png` + raw `frame_0001.png` and walk Sean through the 5-Q. **Block on his approval.**
5. After anchor-2 transition is approved, proceed in chunks of ~23 parallel frames. Suggested chunking (adjust to actual frame ranges):
   - Chunk H: 1–25 (already includes the gated 0001)
   - Chunk I: 26–50
   - Chunk J: 51–75
   - Chunk K: 76–100
   - Chunk L: 101–end (final chunk — includes the anchor-1 wraparound transition gate)
   Each chunk = parallel background dispatch → wait for all completions → 4-frame spot-check → 5-Q gate → block on Sean's "go."
6. **Final transition gate (last chunk):** after the highest-numbered loop-2 frame is cleaned, surface it alongside `anchor-1.png` for the wraparound continuity check.

## Sequence completion
When all 127 loop-2 frames are gate-approved:
```bash
ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/*.png | wc -l   # expect 146
ls /Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/*.png | wc -l   # expect 127
```
Full sequence is then `anchor-1 → loop-1 (146) → anchor-2 → loop-2 (127) → anchor-1` (wraparound).

## Known style boundaries already in loop-1 (Sean has accepted)
- **0017 → 0018:** v1.3-solo (older, more polished face) → v2a (looser, more faithful to raw).
- **0091 → 0092:** v2a (companion has face features) → v1.3-companion (companion as stylized cube, no face). Loop-1 frames 0092–0166 were NOT re-run with v2a; they were already gate-approved under the old wrapper before v2a existed.

Loop-2 will use v2a from frame 0001 onward — no internal style boundary expected.

Begin.

---
