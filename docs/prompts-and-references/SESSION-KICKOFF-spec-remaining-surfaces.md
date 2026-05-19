# Session Kickoff — Spec the Remaining Portfolio Surfaces

> **Purpose:** Drop the block between the `---` markers into a fresh Claude Cowork session at the start of a portfolio-planning session. The session's job is to take the portfolio from "hero + projects spec'd, animation rendered" to "every surface spec'd, blueprint complete, build unblocked."
> **Created:** 2026-05-16. Update if the surface list in §7 of the master plan changes.

---

You are joining Sean Winslow's PM portfolio project mid-build. The hero and projects-section specs are locked. The character animation has been rendered, prototype-validated, and reconciled with the hero spec. **Your job is to spec the remaining surfaces** — case-study page first, then About, then site-wide foundations, then footer/agent feed + contact + MCP embed. No code yet. The build only starts once the full blueprint exists.

## Read first, in order

1. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/CLAUDE.md` — project orientation, the three load-bearing things, the template trap
2. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/docs/PORTFOLIO-MASTER-PLAN.md` — the strategic plan (§7 lists what's left to spec; §10 lists open decisions)
3. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/docs/hero-spec-v1.md` — locked + prototype-validated; the *format and depth* a v1 spec should reach
4. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/docs/projects-section-spec-v1.md` — locked; sets the click-through contract you'll inherit
5. `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/mynrd.co.uk-site-analysis/01-site-dna.md` — the #1 inspiration anchor; reference when proposing patterns

Optional but useful when relevant:
- `docs/previous-design-specs/DESIGN-SPEC-V3.md` and `V4.md` — superseded direction, but the 4Q block + Methods strip patterns inherited from V4 belong in the case-study spec; site-wide foundations (color tokens, paper texture, torn-paper edge) live in V3 §2–§6
- `docs/Sean-Winslow-Full-Personal-Context-v2.0.md` — Sean's Tier-0 context, including the Communication Baseline you must respect

## Current state (as of 2026-05-16)

- Hero spec locked, prototype rendered at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/prototype/index.html` and visually approved.
- Projects section spec locked.
- Character animation done: 9.2s loop redirected to the animation-pipeline case study; the 3.9s "Sean at desk + AI companion" loop lives in the hero.
- Hero tagline + About lead line locked (master plan §4).
- The Block — Campus + RevOps reframed as ARCHIVED (status locked).
- Build NOT started. Don't start it.

## What you'll spec — priority order

Each gets its own `docs/<surface>-spec-v1.md` file in the same shape as `hero-spec-v1.md` (anatomy + vertical budget + motion timeline + type/color/cursor rules in scope + accessibility + Definition of Done + a build hand-off prompt). Cross-link each into master plan §6 + §7 when locked.

1. **Case-study page** (`/work/<slug>` body) — `case-study-spec-v1.md`
   The single highest-value spec remaining. Five MDX bodies depend on it. Inherits the click-through contract from `projects-section-spec-v1.md` §10. Should cover: the investigation board (P4 from master plan §5.1), Methods strip + 4Q block (V4 §7.3/§7.4 inheritance), pencil-margin annotations in their fullest form (D3), View Transition contract, next/prev nav. Open question to surface: how the animation-pipeline case study's hero media is the 9.2s loop (master plan §8.1).

2. **About page** — `about-spec-v1.md`
   Where the character lives in his fullest form. Opens with the locked lead line (master plan §4). Carries the most pencil-margin annotation density. The warm/origin-story half of the duality lives here. Open question to surface: open decision #6 (three-folder nav P3) — does this page format imply revisiting?

3. **Site-wide foundations** — `site-foundations-spec-v1.md`
   Consolidation pass on what V3/V4 already specced, harmonized with what hero v1 actually used. Section-scoped CSS custom properties for the splash-color rule (D2), the torn-paper edge component, the global cursor behavior across surfaces, dark-mode tokens (deferred to V2 but stub them now), font loading, accessibility baseline. Must be done before the build session — otherwise per-page specs will fork CSS tokens.

4. **Footer + live agent feed** (E1) — `footer-spec-v1.md`
   The Cloudflare Worker reading `agent-run-history.csv`, the last-3-events display, the contact CTA that the hero badge gave up. Shares the data-source pattern with the hero dateline — call out the reuse, don't redefine.

5. **Contact section** — likely folds into the footer spec, but flag the decision explicitly (own spec vs. folded). The amber-splash block from §10 of the splash-color rule.

6. **MCP embed page** (E2) — `mcp-embed-spec-v1.md`
   `/work/intent-engineering-mcp` with a live read-only MCP tool call. Time it ~1 week before the 2026-05-25 `sw-mcp-intent-engineering` launch (master plan §9.1).

## How Sean works on this

- **Sean drives the brainstorm.** He'll invoke `pm-product-discovery:brainstorm` when he wants to ideate on a surface. Do not auto-invoke it. Until he does: read, propose, challenge, converge.
- **Update the master plan when direction shifts.** §6 gets a pointer per new spec. §7 shrinks as items become spec'd. §10 open decisions get closed when resolved. The master plan is the strategic layer; the per-section specs are tactical.
- **Pressure-test every proposal against** *"why is this Sean, not a template?"* If the answer isn't immediate, it's drifting.
- **Specs are tactical, the plan is strategic.** When a section locks, write `docs/<surface>-spec-v1.md` and point to it from the master plan — don't bloat the plan with build detail.
- **Cross-pollinate.** Animation, game design, PM frameworks, newsroom craft. Generic PM advice is the template trap in a different costume.

## Non-negotiables (load-bearing — don't drop one)

1. **The template trap is the enemy.** Two failure modes Sean's two prior attempts kept drifting into: (a) the design-system viewer, (b) the luxury-minimal PM template. Before proposing anything, ask: does this drift toward either? If yes, stop. (Master plan §1.3.)
2. **The three load-bearing things:** the character, the voice, the live layer. Every surface must carry at least one in a way no template could fake.
3. **The parallel-lineage rule (voice).** Never frame the animator-self as the "before" and the PM-self as the "after." Both happen in childhood, both run in parallel, both are present-tense. (Master plan §3.1.)
4. **Two fonts only.** Newsreader (serif) + JetBrains Mono. No Inter, no Sora, no third font. (Inherited from hero spec §4.)
5. **One splash color per section, never two.** Per the D2 architectural rule in master plan §5.2.

## Sean's communication baseline (brief)

Calm and factual, no scolding, no trailing summaries. *"Here's an alternative to consider,"* not *"you're wrong."* Challenge while exploring; amplify once committed. Be a partner, not an executor. Brief and to the point — he's a PM, he scans fast. (Full doc: `docs/Sean-Winslow-Full-Personal-Context-v2.0.md` §Communication Baseline.)

## Start procedure

1. Read the five files listed above. Confirm understanding back to Sean in ≤120 words.
2. Open the master plan to §7 (What's still to spec) and §10 (Open Decisions). Note any decisions that block specs in the priority list.
3. Ask Sean which surface to start with. Default recommendation: **case-study page first**, because five MDX bodies are waiting on it. Don't pick yourself — ask.
4. Once Sean picks, write the spec collaboratively. Outline → critique → revise → lock. The hero and projects specs are the depth target; don't ship a thinner artifact.
5. When the spec is locked, add the pointer to master plan §6 + remove from §7, then check whether any open decisions in §10 just got resolved and close them.

## Out of scope for this session

- Starting the Astro build. The build session is downstream — see master plan §9 Phase 2.
- Re-litigating the hero or projects-section specs. Both are locked + validated.
- Re-opening the animation reconcile. Resolved (master plan §8.1).
- Touching `docs/previous-design-specs/`. Reference-only.
- Editing `sw-portfolio-animation-2026/cleanup-log.txt` or any generated build logs.

Begin.
