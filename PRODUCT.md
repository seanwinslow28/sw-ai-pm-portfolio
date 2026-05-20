# Product

## Register

brand

## Users

Recruiters, hiring managers, and engineering leaders evaluating Sean Winslow for **AI PM > Tech PM > Creative PM** roles (Boston metro or remote) during his 8-week post-layoff job hunt (laid off from The Block 2026-05-04, sprint runs through ~2026-07-04).

**Context when using:** triaging a stack of PM portfolios — likely at a desk, on a 27-inch monitor or a laptop, during a hiring window. They've already seen the luxury-minimal-PM template a dozen times today. They have ~10 seconds to decide if Sean is worth a call.

**Job to be done:** Decide whether Sean's positioning — *"a creative who learned to think like a product manager, who ships with an agent fleet"* — is real, or another well-designed claim. They're looking for evidence (real shipped work, real agent activity, specific nouns) that can be reproduced inside their org.

## Product Purpose

A portfolio that proves the positioning by *being* it, not by *describing* it. Every surface — the hero, the projects grid, the daily-dated agent feed, the case studies — is constructed to convert a recruiter glance into a recruiter call.

**This is attempt 3.** V3 (April 2026) and V4 (May 7, 2026) were beautifully specced but kept drifting into one of two templates: the design-system-viewer (a designer's tool) or the luxury-minimal-PM-portfolio (the "VISION MEETS VELOCITY" aesthetic every PM portfolio uses). This build fixes that by locking three load-bearing things prior attempts kept dropping — the hand-drawn character, the comedic-confident voice, and a real daily-dated agent-fleet layer.

**Success looks like:** Callbacks from AI PM roles. The recruiter-readable bridge (the V3 site shipping 2026-05-19 to `seanwinslow.com`) buys time; the redesign replaces it at the apex with no DNS churn once it ships.

## Brand Personality

**Three words:** handmade, comedic-confident, evidence-based.

**Voice register by surface** (per master plan §3.3):

- **Hero, About, case-study narrative** — Sedaris-tuned: first-person-warm, comedic juxtaposition without a punchline, specific nouns ("Saturday morning cartoons," "Vercel deployment logs," not "cartoons" or "tech"). Calibrated through `.claude/skills/writing-voice-modes` (Domestic Observer + Minimalist Absurdist).
- **`/essays/` middle sections** — sober, declarative, thesis-forward. Personal-voice bookends only.
- **Wire-service surfaces** (dateline, project tags, frame numbers, Methods strip, agent feed) — JetBrains Mono, real data, dated. Em-dash exception lives here only.

**The parallel-lineage rule (load-bearing — master plan §3.1):** Never frame the animator-self as the "before" and the PM-self as the "after." Both halves happen in childhood; both have always been there. Any line that puts the two selves on a timeline fails.

**Emotional goals:** the first five seconds feel *handmade* — warm paper, the illustrated character, a real dateline. Then the museum's engineering precision reveals itself as you scroll. The portfolio should make recruiters smile *and* trust the work — comedy and credibility on the same surface.

## Anti-references

**The two template traps (master plan §1.3) — never drift toward either:**

1. **The design-system-viewer.** The V3 "Iterative Blueprint" mockups (`reference-images/sw-portfolio-light-1.png`, `sw-portfolio-dark-2.png`) — color swatches + type samples + component cards on every screen. A designer's *kit*, not a portfolio. Killed entirely.
2. **The luxury-minimal-PM-portfolio.** The "Alex Vonn / PM" reference set (`Portfolio-Design-Inspo-1` through `-5`) — minimal serif, abstract gradient art, "VISION MEETS VELOCITY" headlines, "SAY HELLO." footers. Gorgeous, and exactly what every PM portfolio looks like.

**Other things this should NOT look like:**
- Generic AI-PM aesthetic: dark navy + electric gradient + glassmorphism. The first-order category reflex.
- The hero-metric template: big number + small label + supporting stats + gradient accent. SaaS cliché, banned globally.
- Killed taglines that put the two selves on a timeline: "Ten years of cartoons, six months of PRDs" (master plan §4 — violates parallel-lineage).
- Framing the HybridRouter as "Agent OS" or "runtime architecture" anywhere on the portfolio (master plan §3.4 — invites senior-engineer screens to grill on concurrency that beginner-to-intermediate coding can't defend; Sean's edge is *semantic product architecture*).

**Aesthetic anchor — the right lane:** mynrd.co.uk (`mynrd.co.uk-site-analysis/` — full DNA teardown). Hand-drawn character anchor, torn-paper transitions, comedic-confident voice, one-splash-color discipline, 8.5× display-to-meta type ratio, no-nav linear scroll.

## Design Principles

1. **The character is the load-bearing wall.** Sean's hand-drawn pencil-test character (`reference-images/2D-Character-Sketch-Sean-v1.png`) appears on every key surface — hero, About, project tiles, case studies. Every prior attempt that lost the character drifted into template-land. If a section can't earn the character, the section is wrong.

2. **Specificity is the trust mechanism.** Real dates, real nouns, real agent activity. The dateline reads from a file the Daily Driver agent writes each morning at 08:45 — never invented, never streaming-faked. "Saturday morning cartoons" not "cartoons." "Vercel deployment logs" not "tech." The specific nouns are what make the comedic juxtaposition land and what make the credibility unforgeable.

3. **Show, don't claim — the page earns the headline through evidence.** The hero's "duet" treatment (dateline strip above the name, tagline below) earns the tagline through real fleet data instead of self-claim. This is the credibility the killed "ten years" line was trying and failing to provide. No "VISION MEETS VELOCITY" — ever.

4. **Parallel lineage, never timeline.** Both the animator-self and the PM-self have always been there. No before/after, no hierarchy, no "old hobby vs. new career." Check every line of copy — hero, About, case study, meta — against this before locking.

5. **The frame is Vercel; the content is pencil test.** Engineering-precise containers (Committed-teal substrate at Z=0, monospace accents, restraint) holding expressive, hand-made content (pencil-test paper at Z=10, torn-paper section edges, the illustrated character, warm cream `#FFF9F0`). Both layers, always. Dropping the pencil test produces the design-system-viewer; dropping the Vercel frame produces a hobby blog.

## Accessibility & Inclusion

**WCAG AA** at minimum across the whole site. Target compliance, not exceeded targets — keep the bar honest.

**Specific commitments (drawn from existing specs):**

- **Color contrast:** Status pills and frame numbers cleared at WCAG AA on cream paper at all sizes. Success teal `#0F6E56` on paper = 7.1:1 (passes AAA at 14px+). Secondary ink desaturation for ARCHIVED/PAUSED keeps text at 4.5:1 minimum (`case-study-spec-v1.md` §14, `projects-section-spec-v1.md` §12).
- **Semantic structure:** `<article>` per case-study artifact, inside `<section role="region" aria-labelledby="...">`. Hand-drawn heading SVGs render with proper `<h2>` + `aria-label` so screen readers get the structure, not the decoration (`about-spec-v1.md` §15, `architecture-spec-v1.md` §407).
- **Decorative-vs-meaningful split:** Pencil annotations, registration peg SVGs, torn-paper edges → `aria-hidden="true"`. Meaningful artifacts (Slack DMs, status changes, cut-decision strikethroughs) carry `aria-label` of the spoken content.
- **`prefers-reduced-motion: reduce`** disables: hero video character loop (poster image fallback, no `<video>` element mounted — `hero-spec-v1.md` §6); SVG `stroke-dasharray` line-draw animations (rules render solid at final color); staggered viewport-entry reveals (content lands instantly).
- **Print stylesheet support** for the Vault Scorecard symbol-table (renders symbols as text labels — `architecture-spec-v1.md` §9.2).
- **Keyboard order** explicitly specified per section (e.g., projects: dateline → annotations → tiles A-1…A-5 → next-in-production card).

**No known additional accommodations** beyond standard WCAG AA + reduced-motion. Single-author site, English-only, no i18n in scope.
