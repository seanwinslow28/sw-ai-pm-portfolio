# Animation Frame Cleanup — Resume Prompt

Paste the section between the `---` markers below into a new Claude Code session to resume work. Multiple sessions can run this in parallel; each will ask which frame range to own.

---

You are resuming a parallel-execution session of Sean Winslow's portfolio animation frame cleanup pipeline. Multiple Claude Code sessions may be running this same prompt concurrently against different frame ranges. **Sean is the coordinator** — ask him which range your session owns before doing anything, and don't touch ranges he hasn't assigned to you.

## Read first (in order)
1. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md` — project orientation
2. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/docs/superpowers/plans/2026-05-14-animation-frame-cleanup.md` — original implementation plan
3. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/RESUME-PROMPT.md` — this file (you may have it already; if not, read it for the full state below)

## Current state (as of 2026-05-14)
- **Loop-1 frames 92–166:** ✅ 63 cleaned with the WITH-COMPANION wrapper, gate-approved by Sean. Do not re-run these.
- **Loop-1 frames 1–4:** ⏳ 4 cleaned with the SOLO wrapper (partial batch from last night) — **awaiting Sean's first solo-wrapper gate review**. Before any new solo batch runs, these 4 must be reviewed.
- **Loop-1 frames 5–45:** 🔴 not yet run. Use the SOLO wrapper (Sean is alone in this whole range).
- **Loop-1 frames 46–91:** 🔴 not yet run. MIXED mode — companion appears somewhere mid-range. Per-frame classification needed (raw inspection or pixel detection).
- **Loop-2 frames 1–~166 (127 total):** 🔴 0 done, no calibration. Mostly with-companion (loop starts at anchor-2 midpoint), ending frames may transition back to solo (anchor-1 wraparound). The very first loop-2 chunk requires an anchor-2 transition gate before bulk work.

## Two locked pipelines

| Mode | Prompt | Per-frame wrapper | Batch wrapper | References |
|---|---|---|---|---|
| **With companion** (v1.3) | `scripts/cleanup-prompt.txt` | `scripts/clean-frame.sh` | `scripts/clean-batch.sh` | raw + anchor-1 + companion turnaround |
| **Solo Sean** | `scripts/cleanup-prompt-solo.txt` | `scripts/clean-frame-solo.sh` | `scripts/clean-batch-solo.sh` | raw + anchor-1 |

All paths are under `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/`. The wrappers handle output paths, logging, and skip-existing automatically — re-running the same batch range is safe and won't re-bill existing frames.

The `.env` is symlinked at `sw-portfolio-animation-2026/.env` → `/Users/seanwinslow/Code-Brain/BMAD/.env` (contains `GEMINI_API_KEY`).

## Non-negotiable behavior contract

1. **USER REVIEW GATES are blocking.** After every chunk, Read 4 spot-check frames (lowest, highest, 2 middle) plus any relevant anchor transition. Walk Sean through this 5-question checklist:
   a. Sean's face matches anchor-1 (no drift, no asymmetry)?
   b. Dirt/grain over characters gone (paper texture in background only)?
   c. Companion matches turnaround (if applicable)?
   d. Pose/composition preserved from raw frame?
   e. Paper texture, A-7 label, pencil weight match anchors?
2. **Never auto-approve a gate.** Wait for Sean's explicit "go" before the next chunk.
3. **Run long batches in background mode** (`Bash` with `run_in_background=true`). The Bash foreground timeout is 10 min and most batches take 15–30 min. Run yourself; do NOT dispatch a subagent to run a long batch — subagents drop background processes when their turn ends.
4. **Never overwrite or delete** files in `loop-1/loop-1-raw/` or `loop-2/loop-2-raw/`. Cleaned outputs go to `loop-1/loop-1-cleaned/` and `loop-2/loop-2-cleaned/`.
5. **Don't modify the prompts** (`cleanup-prompt.txt`, `cleanup-prompt-solo.txt`) without Sean's explicit approval — they're locked.

## Failure modes that drove the current design
- v1.1 prompt: pose collapse to anchor-2 on all frames. Fixed by dropping anchor-2 from refs and putting raw frame first (v1.2).
- v1.2 prompt: occasional 2-companion hallucination on mid-mount frames. Fixed by single-instance language (v1.3).
- v1.3 prompt on Sean-solo frames: hallucinated a companion in 2/4 spot-checks. Fixed by creating the solo wrapper (drops turnaround reference + "render zero companions" framing). The solo pipeline has NOT yet been gate-reviewed at the chunk level — that's the first thing to verify.

## What to do on session start
1. Read the three files at the top of this prompt.
2. Run quick state check:
   ```bash
   ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-1/loop-1-cleaned/ | wc -l
   ls /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/sw-portfolio-animation-2026/loop-2/loop-2-cleaned/ 2>/dev/null | wc -l
   ```
3. Confirm understanding back to Sean in ≤120 words.
4. Ask: **"Which frame range and mode should this session own?"** Don't pick a range yourself.
5. Once assigned, dispatch the batch via Bash in background mode, then surface spot-checks + run the gate when complete.

## Coordination signals (parallel sessions)
- **If you start work, tell Sean immediately** which range you've claimed so he can keep the other sessions off it.
- **Before dispatching any batch**, `ls` the output directory to verify no other session has already produced the frames in your range. The skip-existing logic means duplicates won't re-bill, but you shouldn't waste a gate review on frames another session owns.
- **Special case — the 4 unreviewed solo frames (0001–0004):** Whichever session is first should surface these to Sean for the inaugural solo-wrapper gate review before any new solo batch runs. If another session has already claimed this, sit out and ask for a different range.

Begin.

---
