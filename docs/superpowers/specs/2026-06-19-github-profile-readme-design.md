# GitHub Profile README — Design Spec

- **Date:** 2026-06-19
- **Status:** Approved (design); ready for implementation plan
- **Target repo:** `seanwinslow28/seanwinslow28` (GitHub profile README — renders at the top of github.com/seanwinslow28)
- **Author/owner:** Sean Winslow

## Goal

A GitHub profile README that supports the AI PM > Tech PM > Creative PM job hunt. The reader who matters is a recruiter or hiring manager who landed from the resume or portfolio and is deciding, in ~30 seconds, whether Sean is worth a real conversation. The README's job is to make that reader think "I need to see the full thing" and click through to the portfolio.

## Locked decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Audience | Blend, weighted recruiter-first | The differentiator is the agentic depth, but the gate-keeper is time-poor and not always deeply technical. Hook on positioning, reward the curious with depth below. |
| Tone | Personality in the framing, rigor in the evidence | A recruiter should smile once and trust the content the whole way down. (Full-comedic voice was prototyped and rejected — it front-loads jokes before substance, a risk on the GitHub gate.) |
| Structure | Landing page + character banner (Approach 2) | The hand-drawn pencil-test character is the single biggest differentiator. Spend the one visual moment on *it*, not on GitHub stats/streak widgets (a junior-dev tell that fights the positioning). |
| Funnel | Portfolio is the primary CTA | The portfolio is the strongest, most-controlled surface. Email and pinned repos are secondary — present and frictionless, not the headline. |

## Honesty grounding (verified 2026-06-19)

These numbers were verified against `code-brain` so they hold up if raised in an interview:

- **9 active agents** — `agents-sdk/config.toml` shows 9 agents `enabled = true` and scheduled; 8 disabled; 1 (skill optimizer) is `enabled` but manual-trigger-only, so it is excluded. One of the 9 (vault synthesizer) runs intermittently. "9" is the honest, defensible figure; "8 plus 1 intermittent" is the ultra-conservative phrasing if ever needed.
- **Skills: actual count 124** (`ls .claude/skills/`). The README uses "100+", which is deliberately under the true number.
- The deprecated "14 autonomous agents" claim (more than half off for months) is retired everywhere in favor of 9.

## Final copy (locked)

> Markdown formatting details (badge style, link targets, alignment) are an implementation-plan concern. The copy below is locked.

```
[HEADER BANNER: wide pencil-test character image]

# Sean Winslow
AI Product Manager · a creative who learned to think like a PM, now shipping with a fleet of agents

> The agents handle the loops. I handle the taste.

I build at the seam where creative work meets autonomous systems — I design the
pipeline, make the calls that need taste, and let a fleet of agents do everything
that can be made cheap, parallel, and structured.

**What I'm building**

- anima — a 2D-animation pipeline run by a human and a fleet of agents. Ten phases,
  a critic stack, a human gate at every taste call.
- code-brain — my command center: 100+ skills and 9 autonomous agents running my
  second brain on a schedule.
- intent-engineering-mcp — an MCP server that tells agents to act with intent.
- 16BitFit — a fitness fighting game where real workouts power your fighter. On
  pause to build its engine first.

**How I work**

Nine agents run on a schedule, backed by 100+ skills. They draft, research, QA, and
remember. I own timing, casting, and taste — and the final call to ship.

Currently open to AI, Technical, and Creative PM roles

→ See the full portfolio: seanwinslow.com

portfolio: seanwinslow.com · email: sean.winslow28@gmail.com · linkedin: linkedin.com/in/sean-winslow-204390a5
```

## Section intent (for the build)

1. **Header banner** — the pencil-test character, wide image. The one visual signature; does the "not a template" work before a word is read. Exact asset chosen at build time.
2. **Name + positioning line** — H1 name (kept as text, not baked into the banner image, for accessibility/SEO) + one-line positioning.
3. **Tagline** — blockquote: "The agents handle the loops. I handle the taste."
4. **Intro** — one short paragraph establishing the seam (creative × autonomous systems) and the human-owns-taste premise.
5. **What I'm building** — four projects, one outcome-line each, mirroring the pinned repos: anima, code-brain, intent-engineering-mcp, 16BitFit. Project names link to their repos.
6. **How I work** — the differentiator + operating model, ending on "the final call to ship."
7. **Availability** — explicit "open to roles" signal (kept on purpose during the active hunt; can render as a small badge or plain text).
8. **CTA** — the portfolio (seanwinslow.com), the primary destination.
9. **Contact footer** — portfolio · email · LinkedIn, quiet.

## Real values

- Portfolio: `https://seanwinslow.com`
- Email: `sean.winslow28@gmail.com`
- LinkedIn: `https://www.linkedin.com/in/sean-winslow-204390a5`

## Constraints

- GitHub README markdown renders in GitHub's own typography — no custom fonts or CSS. Plan for GitHub-native rendering (images, HTML alignment, badges, tables are available; fonts/colors for text are not).
- Tagline and name stay as markdown text below the banner, not baked into the banner image.
- No GitHub stats/streak/language widgets (explicitly rejected — junior signal, template risk).
- The character art is the only decorative visual.

## Out of scope (separate follow-ons)

- **Banner asset creation** — selecting/generating the exact wide character image (candidate sources: `sw-ai-pm-portfolio/reference-images/2D-Character-Sketch-Sean-v1.png`, `anima/characters/sean-anchor/anchor.png`). Decided in the build plan.
- **Pinned-repos polish** — the per-repo About descriptions, topic tags, and README heroes for the six pins (already discussed separately; not part of this artifact).
- **Repo creation** — initializing `seanwinslow28/seanwinslow28` and committing the README.
