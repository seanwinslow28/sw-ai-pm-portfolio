# Kickoff Prompt — Spec Pass for the Remaining Surfaces

> **Created:** 2026-05-17
> **Purpose:** Paste this into a fresh Claude Cowork session to spec the 6 remaining portfolio surfaces before any code gets written.
> **Owner:** Sean Winslow

---

## The prompt (copy from here ⤵︎)

You're starting a fresh Cowork session to spec the remaining surfaces of my portfolio redesign before any code gets written. The strategic layer is locked. The tactical specs are next. No building this session — specs only.

**Read these in this order before doing anything else:**

1. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/PORTFOLIO-MASTER-PLAN.md` — the strategic blueprint. Focus especially on §0.5 (V3-bridge → redesign succession), §1.3 (the template trap), §2 (design philosophy), §3 (voice rules — including §3.3 register-by-surface and §3.4 the HybridRouter STOP-DOING), §6 (what's locked), §7 (your work list), §10 (open decisions, especially #7 nav shape and #9 crossover sequencing).
2. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/hero-spec-v1.md` — the format model. Your specs match this section structure + opinionated tone + Appendix-B hand-off prompt at the end.
3. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/projects-section-spec-v1.md` — format model. §10 (click-through contract) and §11 (case-study high-level shape) are direct inputs to spec #1.
4. `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/2026-05-06-unified-roadmap copy.md` — the source of truth for what ships into the ledger. Skim Tasks 1 (Step 3 = transactions ledger), 13 (essays), 14 (control architecture), 15 (architecture / vault scorecard).
5. `/Users/seanwinslow/Code-Brain/claude-code-superuser-pack/vault/40_knowledge/templates/EXPLANATION-template.md` — the canonical 4Q template. The case-study spec's 4Q block must mirror it exactly, not invent a parallel shape.

**Your job:** spec the 6 remaining surfaces in this order, one at a time, each saved as `<name>-spec-v1.md` in `/Users/seanwinslow/Code-Brain/BMAD/sw-ai-pm-portfolio/docs/`:

| # | Spec | Filename | Why this order |
|---|---|---|---|
| 1 | Case-study page (`/work/<slug>` body) | `case-study-spec-v1.md` | 5 MDX bodies block on it; first click from the home page lands here. Inherits projects-spec §10 + §11. |
| 2 | About page | `about-spec-v1.md` | Where the character lives most fully. The warm/origin-story half of the duality. |
| 3 | `/transactions/` ledger | `transactions-spec-v1.md` | Schema-first — many other surfaces read from this content collection. V3 bridge at `~/Code-Brain/sw-portfolio/` is the reference implementation; ground in real schema. |
| 4 | `/architecture/` route | `architecture-spec-v1.md` | Roadmap Task 15 ships 6/3 (Vault Scorecard); render surface must be ready. |
| 5 | `/essays/` route | `essays-spec-v1.md` | Roadmap Task 13 draft-locks 5/22 (Access-vs-Meaning Manifesto); render ready before publish ~6/19. |
| 6 | Site chrome + footer (folds in Contact) | `site-chrome-spec-v1.md` | Smallest. Footer links to `fleet.seanwinslow.com`. No custom Worker (that scope was removed). |

**For every spec, use `pm-product-discovery:brainstorm` first.** Three perspectives (PM / Designer / Engineer). Aim for 100+ ideas before converging on a Top 5. Pressure-test every idea against the load-bearing question: *"why is this Sean, not a template?"* Don't skip the brainstorm — that's the working mindset the master plan §12 codifies; it's how hero and projects earned their opinionatedness.

**Working rules (from PMP §12):**

1. The template trap is the enemy (§1.3). Before proposing anything, ask: does this drift toward the design-system-viewer or the luxury-minimal-PM template? If yes, stop.
2. The three load-bearing things: the **character**, the **voice**, the **live layer**. If a proposal drops any of them, it's drifting.
3. Voice register by surface (§3.3): Sedaris for narrative (hero/About/case studies); sober-with-bookends for `/essays/`; wire-service mono for technical surfaces (dateline, frame numbers, Methods strip).
4. Inherited STOP-DOING (§3.4): no Agent-OS / runtime-architecture framing of the HybridRouter anywhere on the portfolio.
5. The 4Q template (`EXPLANATION-template.md`) is canonical. Mirror, don't fork.
6. Be a thinking partner, not an executor. Challenge during exploration; amplify after commit.
7. Brief and to the point. Calm, factual, zen tone. No trailing summaries.

**Don't:**

- Don't start writing a spec. Start with the brainstorm skill.
- Don't propose changes to anything locked in PMP, hero spec, or projects spec without flagging it explicitly first.
- Don't fold contact, architecture, and essays into one mega-spec. IA discipline matters — each gets its own file.
- Don't build anything. Specs only this session.

**Do:**

- Inspect the V3 bridge at `~/Code-Brain/sw-portfolio/src/content/transactions/` + `src/content/config.ts` to ground the `/transactions/` schema in something real before spec #3.
- For each spec, when you finish writing it, output a one-paragraph summary of the non-obvious calls. I review → lock → move to next spec.
- Flag open questions as `[OPEN: ...]` inline so they don't drift into the locked layer.
- When you finish all 6, write a 1-page `BLUEPRINT-COMPLETE.md` summary linking every spec, every open decision, and the full build sequence — so the build session has one entry point.

**Starting point for this session:** spec #1 (the case-study page). Read the 5 docs above first. Then invoke `pm-product-discovery:brainstorm` with this topic:

> *"The case-study page body at `/work/<slug>` — the surface that lives behind each of the 5 project tiles on the home page. It inherits the dateline strip + hero media (View Transitions in from the tile) + frame number / status / title block from the projects spec. It needs to spec: the investigation-board artifact thread (P4 — real Jira screenshots, PRD diffs, anonymized Slack DMs, metric charts as MDX components), the Methods strip (mono mini-table of agents/tools that produced or shipped the work), the 4Q block (mirroring `EXPLANATION-template.md` exactly), the next/prev project nav, and the pencil-margin annotations that make their site-wide pattern debut here. Plus the 5 MDX body shapes that get drafted from this spec once it's locked: animation-pipeline, superuser-pack, intent-engineering-mcp (now SHIPPED, retrospective framing), the-block (ARCHIVED, frame-the-work-not-the-exit), 16bitfit (PAUSED, leans on the pipeline not a finished game)."*

Three perspectives. ≥100 ideas. Converge on a Top 5. Then write `case-study-spec-v1.md`.

(paste ends here ⤴︎)

---

## Notes for Sean (don't paste this part)

- **Estimated session count:** ~3 sessions to get through all 6 specs at a sustainable pace (specs 1+2 in one, 3+4 in one, 5+6 in one). Could compress to 2 if a session goes long.
- **When all 6 are locked:** revisit `PORTFOLIO-MASTER-PLAN.md` §7 + §9 — the "What's Still to Spec" table empties out, and the build phase becomes the only open work.
- **Open Decisions #7 (nav shape) and #9 (crossover sequencing)** should get re-examined after spec #3 (`/transactions/`) lands — the ledger spec is what makes the nav-shape decision real.
