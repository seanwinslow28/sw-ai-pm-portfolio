# Kickoff prompt — brainstorm new project subtitles (paste into a fresh Cowork session)

---

I want to brainstorm new **subtitle lines** for the five projects on my AI PM portfolio. The portfolio repo is `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio` (Astro 5 + Tailwind 4, live on Vercel). Read its `CLAUDE.md` first to load the project's voice, the "template trap," and the three load-bearing things.

## Why this matters

A PM-lead friend reviewed the live site as a hiring manager. We just finished a redesign (W1 of `docs/superpowers/specs/2026-06-16-portfolio-critique-execution-design.md`) that strips the cryptic header cluster off every project page so each page now leads with **just the title + this one subtitle line, then the hero image**. That makes the subtitle load-bearing: it is the first thing a recruiter reads on the page AND the line under each project tile on the home grid. If they don't instantly get what the project *is*, or it doesn't grab them, they bounce.

The current subtitles are clever but oblique. They try to be witty about the project instead of telling you what it is. I want to flip the priority: **clarity first, personality second.** A recruiter should be able to read the line in about two seconds and think "ah, it's an X that does Y" and want to click. Keep a spark of my voice (it's the load-bearing character of the site), but never at the cost of comprehension.

## The five projects

The subtitle is the `tagline:` field in each `src/content/work/<slug>.mdx`. One change updates both the home tile and the case-study subtitle (and the page's meta description). Read each project's real source before writing so nothing is invented.

| Slug | Title | Current subtitle (too clever) | What it actually is | Source to read |
|---|---|---|---|---|
| `animation-pipeline` | Anima | "A pencil-test pipeline with a fleet of in-betweeners." | A 10-phase pipeline for making 2D animated shorts where a human owns timing and taste and a fleet of named AI agents does the volume work. ACTIVE. | `/Users/seanwinslow/Code-Brain/anima` (CLAUDE.md, PHILOSOPHY.md) |
| `code-brain` | Code Brain | "A second brain that grew a third one for itself." | My personal command center built on Claude Code: a large skill library plus an autonomous overnight agent fleet (scheduled SDK agents) that indexes, synthesizes, and maintains an Obsidian knowledge vault. ACTIVE. | `/Users/seanwinslow/Code-Brain/code-brain` (CLAUDE.md) |
| `intent-engineering-mcp` | Intent Engineering MCP | "Drawing up agents to act with intent." | A shipped MCP server (npm + MCP registry, v0.1.0) with tools that assess, audit, and scaffold "intent specs" so agents act with engineered intent. SHIPPED. **Note: this exact line is a LOCKED decision in the portfolio `CLAUDE.md` and also appears on the project tile + case-study hero. Changing it means updating that locked decision too.** | `/Users/seanwinslow/Code-Brain/sw-mcp-intent-engineering` |
| `the-block` | The Block — Campus + RevOps | "B2B PM work where the agreement is the UX." | My prior B2B product role at The Block (institutional crypto research): Campus + RevOps products. Framed as a credential / prior role (ARCHIVED status). | `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/assets/Sean_Winslow_Resume_AI_PM_UPDATED.md` and `…/vault/30_domains/product-management/the-block-resume-info/The-Block-Job-Description.md` and `…/the-block-resume-info/the-block-resume-additions-2026.md` |
| `16bitfit` | 16BitFit | "Paused the game. Shipped the pipeline." | A fitness video game I paused to pivot to Anima, because the game needed an animation pipeline I had to go build first. PAUSED — keep that paused/pivot framing. | `/Users/seanwinslow/Code-Brain/16BitFit-V3/CLAUDE.md` |

## The brief for each subtitle

- **Lead with what it is.** Concrete nouns. A recruiter who has never heard of the project should understand the category and the point. ("A personal AI command center that runs an agent fleet overnight" beats "a second brain that grew a third one.")
- **Then earn the click.** One specific, true detail that makes it interesting (the scale, the unusual approach, the outcome). Real, never inflated.
- **My voice as seasoning, not the meal.** Warm, specific, lightly self-aware — but the joke never blocks the meaning. If someone has to be in on the bit to understand the line, it fails.
- **One line.** Roughly 5–12 words. It renders as a subtitle under a large serif title and on the tile.
- **No em-dashes** (the humanity-pass rule). No inside jargon, no acronyms a recruiter wouldn't know on sight.

## How to run it

1. Read the portfolio `CLAUDE.md`, then skim each project's real source above so the lines are grounded.
2. Use `superpowers:brainstorming` (or `pm-product-discovery:brainstorm`) to work through this with me interactively — generate breadth before converging.
3. For **each** project, present a small spread of options along a spectrum: from **plainest/clearest** to **clear + a spark of voice**. Show the current line next to them so we can feel the upgrade. A short table per project works well.
4. Voice the candidates through `.claude/skills/writing-voice-modes` (Sean Mode at a recruiter-safe dial, grit by substitution not subtraction) and finish with `.claude/skills/writing-humanity-pass` (strip AI tells, no em-dashes). The fuller critique chain (`storytelling-architecture`, `writing-critique`, LLM Council) lives in `code-brain` and is optional here — a one-liner rarely needs it, but if we want an independent read on the finalists, note that it would take a code-brain session.
5. Let me pick per project. Don't unilaterally rewrite the frontmatter until I've chosen.

## When I've picked

- Update `tagline:` in each `src/content/work/<slug>.mdx`.
- If the `intent-engineering-mcp` line changes, update the "Locked decisions" entry in the portfolio `CLAUDE.md` (and remember the line also sits on the tile + case-study hero).
- Run `npm run validate` to confirm content still passes, then `npm run build` before deploy.
- Add a `CHANGELOG.md` entry noting the subtitle rewrites and why (recruiter scan-ability, follow-on to the W1 critique redesign).
