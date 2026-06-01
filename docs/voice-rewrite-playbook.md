# Voice Rewrite Playbook — interview → council → iterate

How to rewrite a piece of portfolio prose so it actually **sounds like Sean**, instead of sounding like an argument Claude built and then polished. Distilled from the 2026-06-01 About-page B-2/B-4 rewrite ([council transcript](critiques/about-b2-b4-council-2026-06-01.md), [CHANGELOG](../CHANGELOG.md) about-spec entry).

Use it for any voice-bearing surface: About sections, project/case-study pages, essays, the home teaser line, even a cover letter.

---

## The failure this fixes

The first B-2/B-4 drafts were technically fine and died on contact with Sean: *"it doesn't really sound like me."*

The root cause wasn't the writing — it was the **brief**. The old process was:

> Claude picks a topic loosely related to Sean → Claude writes it → the council critiques it with the voice modes.

Nobody ever asked Sean *what should be on the page* or *whether he related to it*. The council was polishing a thesis Sean never endorsed. You can voice-match a sentence Sean would never say, and it will still sound like a stranger.

**The fix is to move Sean to the front of the line.** Interview first. The council only ever works from a seed Sean has already approved.

---

## The five steps

### 1. Load the real context (NOT a generic profile)

Read the source of truth for *this specific surface* before asking anything.

- **About / personal surfaces** → [`docs/prompts-and-references/Sean-Winslow-Full-Personal-Context-v2.0.md`](prompts-and-references/Sean-Winslow-Full-Personal-Context-v2.0.md).
- **Project / case-study surfaces** → point at the **actual project folder or repo** where the lived context exists, not the personal-context file. That's where the truth is — READMEs, commit history, design docs, retros, the artifacts themselves. Examples:
  - Code Brain → `/Users/seanwinslow/Code-Brain/code-brain/` (skills, agents, hooks, vault)
  - 2D Animation Pipeline → `sw-portfolio-animation-2026/` + `sw-portfolio-animation-pipeline`
  - The Block → `the-block/` (archived role artifacts)
  - 16BitFit → its own repo
  - Intent Engineering MCP → its repo / the code-brain MCP server source
- Also read the **current draft** of the surface and its **spec** (`docs/specs/<surface>-spec-v1.md`) so you know the locked structure, footprint, and any hard constraints (e.g. About B-4 must be employment-state-neutral) before you propose changes.

The point: the interview questions should be grounded in real material — actual commits, actual decisions, actual war stories — so Sean is reacting to *his* truth, not inventing it on the spot.

### 2. Interview Sean — one decision at a time

Use `superpowers:brainstorming` (or `pm-product-discovery:brainstorm`) to hold the multi-perspective headspace. Then ask **one load-bearing question per message**, multiple-choice where possible, each option grounded in something real from step 1. The `AskUserQuestion` tool is good for this — give 3-4 concrete angles, each with a short preview of what that direction would *feel* like.

The questions that mattered for B-2/B-4, generalized:

1. **Core truth** — what's the *honest* reason, the thing Sean would say out loud? (Offer real angles, not abstractions. Sean's answer was a blend nobody had pre-written: "I was always a director" + the survival edge.)
2. **Direction** — where does this point? (For project pages: what's the one thing this project *proves* about Sean, vs. a feature list.)
3. **Voice register** — how much comedic / self-deprecating Sean? (He picked "warm + funny" — the prior draft was austere and humorless, which was half the "doesn't sound like me.")
4. **Guardrails** — what must be preserved or avoided? (He chose: kill the jargon, no invented set-pieces, tie lightly to real onsite proof. These become hard rules in the brief.)

Let each answer reshape the next question. Sean's B-2 answer ("I was always a director") is what made the B-4 "bridge person" framing land.

### 3. Write the brief and get Sean to approve it BEFORE the council runs

This is the step the old process skipped. Assemble:

- **A seed thesis per section** — 2-5 sentences in Sean's own words (lift them from his interview answers), stating the truth the section must carry.
- **Voice constraints** — which mode (default: Sean Mode, warm+funny), dialed to context (~80% for his own site).
- **Hard rules** — the guardrails from step 2, written as bans and requirements (banned jargon list, "no invented daily-fleet scenes," "tie to real onsite proof, lightly," "don't re-narrate the timeline above," any spec constraint like employment-neutrality).
- **Footprint** — paragraph count / length, from the spec.

**Show Sean the brief and let him redline the seeds.** They are load-bearing — the council can only be as right as the seed. He cut a whole sub-thesis from B-2 at this stage ("production companies decide what gets made") before a single model ran. That edit would have been expensive to discover after generation.

### 4. Convene the council (generative, not just critique)

Use the [`llm-council`](../.claude/skills/llm-council) skill, **variance profile** (mixed-lineage models — divergence is the signal for stylistic work).

Frame it as **generative + cross-rank**, not pure critique:

> Each model writes its own candidate sections from the seed + voice constraints, then they cross-rank all candidates, and the chairman synthesizes a winner per section — free to graft the strongest individual line from any runner-up.

Build the prompt file with everything embedded so all models read the same calibration:
- who Sean is (voice context),
- the **Sean Mode spec pasted verbatim** from [`.claude/skills/writing-voice-modes/SKILL.md`](../.claude/skills/writing-voice-modes/SKILL.md) (modes, signature moves, anti-patterns, professional dial),
- the approved seed theses,
- the hard rules,
- the deliverable format (e.g. "3 heading options + 3-paragraph body + 2-paragraph body").

Invoke with an explicit absolute `--output` path next to the artifact:

```bash
cd /Users/seanwinslow/Code-Brain/code-brain/tools/llm-council && uv run python -m council \
  --profile variance \
  --prompt-file /tmp/llm-council/<surface>-<date>.md \
  --output /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/docs/critiques/<surface>-council-<YYYY-MM-DD>.md \
  --tag <surface>-generative
```

Cost runs ~$0.10–0.40 for the variance profile. The transcript (4 named drafts + cross-rank table + chairman synthesis) is a permanent record — it lives in `docs/critiques/`.

### 5. Sean keeps the final 10% — iterate the output into his voice

**The council output is a draft, not a verdict.** Present the chairman's winner to Sean explicitly as *his to edit*. Then:

- Flag the weak spots honestly — the softest line, a doubled idea, a metaphor used twice. (For B-2/B-4: a repeated "ceiling" idea, a soft B-4 opener, a flat closer.)
- Let Sean redline. His edits are the real win: he swapped in "a wise-cracking chipmunk with a robotic arm and an alcohol problem," cut a redundant paragraph, brought back "the bridge between my two worlds," and caught a logic bug Claude missed (you can't say the ceiling "got higher" two sentences after "the ceiling doesn't exist"). That's the 10% only Sean can do — the taste layer.
- Iterate as many passes as it takes. Send a section back to the council for another round if a whole direction is off; hand-edit if it's close.

Then wire it in and verify (next section).

---

## Wiring it in + verification

1. **Match house style** — normalize curly quotes/apostrophes to straight to match the surrounding file. Keep prose em-dash-free where the surface is in scope of the `validate_content.mjs` F6 em-dash lint (work / transactions / architecture / essays — `about` is currently out of scope, but stay clean anyway).
2. **Edit the real file** — `src/content/<collection>/<slug>.mdx` for content collections.
3. **Run the gates** — `node scripts/validate_about.mjs` (about), `node scripts/validate_content.mjs` (everything else), then `npm run build`. All three must be green.
4. **Confirm the bytes rendered** — `grep` your new phrases out of `dist/.../index.html` so you *know* it shipped, not just that it compiled.
5. **Log it** — append an entry to the relevant spec section in [`CHANGELOG.md`](../CHANGELOG.md) (read its "How to add an entry" header first). Note what changed, why, and that the build is green.
6. **Eyeball it live** — `npm run dev`, view the surface in the browser. Prose reads differently in the page frame than in a markdown block.

---

## Applying this to the project pages

The five `work/` pages ([`src/content/work/`](../src/content/work/)) — 2D Animation Pipeline, Code Brain, Intent Engineering MCP, The Block, 16BitFit — are the obvious next candidates. Same loop, with two differences:

- **Step 1 source** is the project's own folder/repo, not the personal-context file. Read the README, the commit log, the design/retro docs, and the artifacts. The seed for a project page should be grounded in *what actually happened* on that project, not a generic "I built X" claim.
- **The seed question shifts** from "what's the honest reason" to **"what's the one thing this project proves about how Sean works — that a feature list wouldn't?"** A case study that lists features sounds like every case study. One that names the real decision, the real constraint, the real mistake, sounds like Sean.

Everything else — interview one question at a time, get the seed approved, variance council, iterate the output, verify, log — is identical.

One caution worth keeping: don't run all five at once. Do one project page end-to-end, look at it live, confirm the loop produced something that sounds like Sean, *then* decide whether to repeat. The whole reason this playbook exists is that batch-producing prose without Sean in the loop is how the first drafts went wrong.
