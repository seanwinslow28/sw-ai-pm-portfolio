# sw-ai-pm-portfolio

The source for **[seanwinslow.com](https://seanwinslow.com)**: a product manager's portfolio that tries to *prove* its positioning instead of describing it.

I'm an AI PM with a creative background. The site argues one thing: a creative who learned to think like a product manager, and who ships with an agent fleet. This repo is that argument's source code. If the claim were just words, you'd close the tab. So the page is built to be the evidence.

---

## What you're looking at

A live, hand-built portfolio. Nine surfaces: a hero, a projects grid, an about page, a case study per project, a transactions ledger, an architecture page, an essays section, and the site chrome that holds it together. No template, no page builder, no CMS. Astro 5 and Tailwind 4, deployed on Vercel.

The look is deliberate: warm paper, a hand-drawn pencil-test character on every key surface, a newsroom dateline, two fonts and one accent color and nothing else. It reads handmade up front, then the engineering precision shows itself as you scroll. That contrast is the whole point.

## The five projects

| | Project | What it is |
|---|---|---|
| 1 | **Anima** | A 2D animation pipeline where AI agents do the volume work. |
| 2 | **Code Brain** | A second brain run by an agent fleet on the night shift. |
| 3 | **Intent Engineering MCP** | An MCP server that checks an agent's spec before it runs. |
| 4 | **The Block** | Campus + RevOps. B2B PM work. |
| 5 | **16BitFit** | A fitness fighting game where real workouts power your fighter. On pause to build its engine first. |

Each one gets a full case study at `/work/<slug>`, structured around four plain questions: what is this, why does it exist, how was it built, what did it prove.

## The part I'm proudest of: the daily-dated layer

Most portfolios are frozen the day they ship. This one isn't.

A scheduled agent (the Daily Driver) wakes up every morning, measures what my agent fleet actually did, writes it to a handful of JSON files, runs the site's own validation, and only then commits and pushes. The dateline on the homepage, the activity pulse, the shipped-stats. None of it is typed by me. None of it is faked-live streaming theater either. It's real, it's measured, and it's dated to the morning it was written, with a freshness gate that hides anything stale rather than lie about it.

A portfolio that says "I ship with agents" should be able to show the agents shipping. This is that.

## Stack

- **Astro 5** + **Tailwind 4**, static build, View Transitions between routes
- **Newsreader** (editorial serif) + **JetBrains Mono** (wire-service). Two fonts, no more.
- Content in MDX collections, validated by build-time scripts (`npm run validate`)
- Deployed on **Vercel**; the daily refresh is an autonomous agent, not a human

No Next.js, no GSAP, no Framer, no Lenis, no CMS. The restraint is a product decision.

## What I learned building it

The honest version, because that's more useful than a feature list:

- **Specs before code, every time.** This whole repo is spec-driven — decisions get locked in `docs/specs/` before anything ships. One of the five projects, the Intent Engineering MCP, is that exact lesson turned into a product: a server that reads an agent's spec and stops it if it's about to do the wrong thing. I built the discipline, then I built the tool that enforces it.

- **Positioning is a discipline, not a vibe.** This is attempt three. The first two were beautifully built and both drifted into the same trap. They ended up looking like every other PM portfolio. The fix wasn't better taste, it was naming my own failure mode out loud and locking three things I kept dropping: the character, the voice, and the dated agent layer. Diagnosing your own drift is the job.

- **Evidence beats claims.** The strongest line on the site isn't a sentence, it's the dateline that an agent wrote this morning. I learned to stop asserting things the page could just demonstrate.

- **Know where to spend a human.** The agents handle the loops; I handle the taste. The fleet does volume work (generation, refresh, the night shift) and I make the calls that need judgment. Learning that boundary is most of what made this fast.

- **Constraints ship things.** Two fonts. One accent color per section. No framework I didn't need. Every "no" made the next decision easier.

## Run it locally

```bash
npm install
npm run dev      # local dev server
npm run build    # validate → fetch → crosslink → build
```

---

The dateline you see on the homepage was written by an agent at 8:45 this morning, not by me. That's not a gimmick. It's the resume.
