# Case-Study Page v1 — Build Spec

> **Status:** Drafted 2026-05-17. Awaiting Sean's lock.
> **Scope:** The body of each `/work/<slug>` page. Inherits everything from `hero-spec-v1.md` (color, type, motion, cursor) and `projects-section-spec-v1.md` (status labels, View Transition contract, content-collection schema). This file ends at the page footer; the global site chrome lives in `site-chrome-spec-v1.md`.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + `hero-spec-v1.md` + `projects-section-spec-v1.md` open.

---

## 1. The Case-Study Page, in one sentence

A landed-from-the-tile editorial dossier — investigation board of real artifacts up top, Methods strip in the middle, the canonical `EXPLANATION.md` 4Q block at the bottom — where status (`ACTIVE` / `SHIPPED` / `PAUSED` / `ARCHIVED`) governs the page's shape, not just its label.

## 1.1 Changelog

- **2026-05-17:** Initial draft. Inherits projects-spec §10 (click contract) + §11 (high-level shape sketch). The 4Q block here is canonical — mirrors [`EXPLANATION-template.md`](../../../code-brain/vault/40_knowledge/templates/EXPLANATION-template.md) heading-for-heading. The `SHIPPED` status (added 2026-05-17 to the projects spec for Intent Engineering MCP) is treated as a full citizen here.

---

## 2. Anatomy

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top, from projects) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON, MAY 13, 2026 — animation pipeline, rev 3.                   │
│  last frame rendered 14 hours ago.                                   │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  ROLE — pm + builder + operator         IN FLIGHT 2026-03 → 2026-06  │
│                                                                      │
│  A-1 · ACTIVE                                                        │
│  2D Animation Pipeline                                               │
│  animation · agentic · pipeline                          ◐ 220 FRAMES│
│                                                                      │
│  ╭──────────────────── HERO MEDIA, FULL-BLEED ────────────────────╮  │
│  │                                                                │  │
│  │   (the 9.2s WebM loop, view-transitioned in from the tile)     │  │
│  │                                                                │  │
│  ╰────────────────────────────────────────────────────────────────╯  │
│                                                                      │
│  ─ OPENER ─ ────────────────────────────────────────────────────    │
│  3 short paragraphs, Newsreader, Sedaris-coded. Specific nouns.      │
│  No setup. No tagline echo. The first paragraph is the one a         │
│  recruiter scans cold.                                               │
│                                                                      │
│                                                                      │
│  ─ INVESTIGATION BOARD ─ ──────────────────────────────────────     │
│                                                                      │
│  ┌──────────────────────────┐   ╮                                    │
│  │   ARTIFACT 1 — Polaroid   │   ├─ APR 17 — first cleaned cycle.    │
│  │   frame, 0.5px amber      │   │  the v2a pipeline holds: 146→127  │
│  │   border, hand-drawn      │   │  frames at 24fps, alpha clean.    │
│  │   "tape" SVG at corners.  │   ╯                                   │
│  └──────────────────────────┘                                        │
│        ↗ pencil annotation: curved arrow + "the one we kept"         │
│                                                                      │
│  ┌──────────────────────────┐   ╮                                    │
│  │   ARTIFACT 2 — Slack DM   │   ├─ APR 23 — anonymized DM:          │
│  │   anonymized (eng lead,   │   │  "the alpha channel is the rub.   │
│  │   design crit), static    │   │  vp9 with alpha_mode=1, not h264."│
│  │   SVG mockup. NOT a       │   ╯                                   │
│  │   real screenshot.        │                                       │
│  └──────────────────────────┘                                        │
│                                                                      │
│  ┌──────────────────────────┐   ╮                                    │
│  │   ARTIFACT 3 — metric     │   ├─ MAY 6 — chart: render time per   │
│  │   chart (MDX component,   │   │  frame, v1 → v2a. 22s → 4s.       │
│  │   local JSON, no runtime  │   ╯                                   │
│  │   fetch).                 │                                       │
│  └──────────────────────────┘                                        │
│         ☕ pencil annotation: coffee-ring stain (process intrusion)  │
│                                                                      │
│  ┌──────────────────────────┐   ╮                                    │
│  │   ARTIFACT 4 — board      │   ├─ MAY 15 — board excerpt: 9.2s     │
│  │   excerpt or PRD diff,    │   │  loop final. moves to case study  │
│  │   sanitized.              │   │  hero, not portfolio hero.        │
│  │                          │   ╯                                   │
│  └──────────────────────────┘                                        │
│  ╳ strikethrough on cut artifact: "we tried this — rev 2 killed it"  │
│                                                                      │
│                                                                      │
│  ─ METHODS ─ ──────────────────────────────────────────────────     │
│  ┌────────────────┬──────────────────────┬─────────────────┐         │
│  │ TASK           │ AGENT / TOOL         │ MODEL / COST    │         │
│  ├────────────────┼──────────────────────┼─────────────────┤         │
│  │ frame cleanup  │ clean-frame-v2a.sh   │ rembg / $0      │         │
│  │ render         │ ffmpeg + libvpx-vp9  │ local / $0      │         │
│  │ style anchor   │ Seedream 2.0         │ ~$0.40/run      │         │
│  │ orchestration  │ → /work/superuser…   │ Claude Sonnet…  │         │
│  └────────────────┴──────────────────────┴─────────────────┘         │
│                                                                      │
│                                                                      │
│  ─ 4Q (the canonical EXPLANATION.md, read from the repo) ─          │
│                                                                      │
│  ## A-1.Q1   What is this?                                           │
│  (2–4 sentences, leads with value.)                                  │
│                                                                      │
│  ## A-1.Q2   Why this approach?                                      │
│  (3 options considered, chose X because Y, trade-offs.)              │
│                                                                      │
│  ## A-1.Q3   What would break?                                       │
│  (3 named failure modes + detection signals.)                        │
│                                                                      │
│  ## A-1.Q4   What did I learn?                                       │
│  (2–3 sentences. The non-obvious insight that travels.)              │
│                                                                      │
│  → read the canonical EXPLANATION.md ⓘ                              │
│                                                                      │
│                                                                      │
│  ─ NEXT / PREV ──────────────────────────────────────────────       │
│  ← A-? prev project              A-2 SUPERUSER PACK →                │
│                                                                      │
│  ◐ registration mark (page closeout)                                 │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, into site chrome footer) ╲╱╲╱╲╱╲╱╲
```

Six bands. Top to bottom: **dateline strip → title block → hero media → opener → investigation board → Methods strip → 4Q block → next/prev**. The page sits on cream paper from edge to edge — no internal splash teal block (the splash was the click-through; this page is the document the click delivered).

---

## 3. Vertical budget

### Desktop (≥1024px, 1440px reference)

| Slot | Height | Notes |
|---|---|---|
| Torn-paper top edge | 32px | overlaps the projects section by 16px (View-Transition seam) |
| Top padding | 60px | |
| **Dateline strip** | ~54px | same component as hero §8, project-specific body |
| **Role + in-flight** | 24px + 16px margin | mono, role pill on left, date range on right |
| **Title block** | ~220px total | frame (mono 14px) → status pill (mono 12px) → title (Newsreader, `clamp(48px, 5.6vw, 84px)`) → tags (mono 12px) → anchor metric (mono 18px, right-aligned) |
| Gap | 48px | |
| **Hero media** | 16:9 box, max-width 1120px, centered | View Transition target |
| Gap | 64px | |
| **Opener** | 3 paragraphs, 22-24px Newsreader, max-width 680px | |
| Gap | 80px | |
| **Investigation board** | variable; ~120px per artifact + 40px caption + 60px gap | typical 4-6 artifacts = ~960-1440px |
| Gap | 80px | |
| **Methods strip** | ~280px (table + caption + cross-link rule) | |
| Gap | 80px | |
| **4Q block** | ~600px (4 sections, each ~120px + heading) | |
| Gap | 56px | |
| **Next/prev nav** | 80px | |
| Bottom padding | 80px | registration mark sits in the bottom-right |
| Torn-paper bottom edge | 32px | overlaps site-chrome footer by 16px |
| **Page height** | ~3300-3800px typical | scroll-friendly, not 100vh-fixed |

The page is a long-form scroll, not a hero-and-CTA. Recruiter scans the title block + hero media + first opener paragraph, then either bounces or commits to the artifact thread.

### Mobile (<768px)

| Slot | Adaptation |
|---|---|
| Title block | Stacks: frame + status on line 1, title on line 2 (clamp bottoms at 36px), tags + anchor metric on line 3 |
| Hero media | Full-bleed, 4:3 box (more landscape-tolerant) |
| Opener | 18px Newsreader, max-width 100% |
| Investigation board | Artifacts go full-width, captions stack below (not beside) |
| Methods strip | Table scrolls horizontally if needed; cells stay mono 11px |
| 4Q block | Each Q is its own card, full-width, stacked |
| Next/prev nav | Two stacked tiles, 50/50 split |
| Pencil annotations | Render at ≤4 per page (coffee ring + registration mark + 2 arrows max) — geometry breaks below 4 |

---

## 4. Type + voice register

### Type system (this page only — inherits hero spec §4 fonts)

| Role | Font | Size (responsive) | Weight | Tracking | Color |
|---|---|---|---|---|---|
| Dateline stamp | JetBrains Mono | 12 / 11 | 500 | 1.2px | `#7C2D12` (stamp) |
| Dateline body | JetBrains Mono | 12 / 11 | 400 | 1.2px | `#546E71` |
| Role pill | JetBrains Mono | 11 (both) | 500 | 1.6px | `#7C2D12` |
| In-flight range | JetBrains Mono | 11 (both) | 400 | 1.6px | `#546E71` |
| Frame number | JetBrains Mono | 14 / 12 | 500 | 1.6px | `#FAC775` (amber mid-stop) |
| Status pill | JetBrains Mono | 12 (both) | 500 | 1.8px | varies (see §5) |
| Title | Newsreader | `clamp(48px, 5.6vw, 84px)` | 400 | -0.6px | `#0A3E42` |
| Tags | JetBrains Mono | 12 (both) | 400 | 1.2px | `#546E71` |
| Anchor metric | JetBrains Mono | 18 / 14 | 500 | 0.8px | `#0A3E42` |
| Opener | Newsreader | 24 / 18 | 300 | -0.2px | `#1A1A1E` |
| Section heading (`─ NAME ─`) | JetBrains Mono | 14 (both) | 500 | 2.4px | `#0A3E42` @ 0.8 |
| Artifact caption (stamp) | JetBrains Mono | 11 (both) | 500 | 1.2px | `#7C2D12` |
| Artifact caption (body) | JetBrains Mono | 12 / 11 | 400 | 1.0px | `#546E71` |
| Methods strip cell | JetBrains Mono | 13 (both) | 400 | 0.6px | `#1A1A1E` |
| 4Q heading | JetBrains Mono | 14 (both) | 500 | 2.4px | `#0A3E42` |
| 4Q "What is this?" body | Newsreader | 24 / 20 | 300 | -0.2px | `#1A1A1E` |
| 4Q Q2-Q4 body | Newsreader | 18 / 16 | 300 | -0.1px | `#1A1A1E` |
| Next/prev label | JetBrains Mono | 14 / 12 | 500 | 1.8px | `#0A3E42` |

### Voice register by section (PMP §3.3)

| Section | Register | What it sounds like |
|---|---|---|
| Dateline strip | Wire-service mono | `BOSTON, MAY 13, 2026 — animation pipeline, rev 3.` |
| Title block (role + tags + anchor) | Wire-service mono | Single nouns. Numbers. No verbs. |
| **Opener** | **Sedaris-coded narrative** | First-person-warm, specific nouns, comedic juxtaposition without a punchline. ≤3 paragraphs. |
| Investigation board captions | Wire-service mono | Dated. Factual. One claim per caption. "this is the one we kept." |
| Methods strip | Wire-service mono | Pure table — task / tool / cost. No prose. |
| **4Q block** | **Sober / declarative** | The canonical EXPLANATION voice — analytical, not comedic. Personal warmth in the "What did I learn?" closer only. |
| Next/prev nav | Wire-service mono | Frame + status + title. No verbs. |

The rule: **personal warmth lives in the opener and the 4Q's "What did I learn?" kicker. Everything between is evidence.** That's what makes the warmth land — it's earned by the wire-service middle.

**STOP-DOING:** Per PMP §3.4 / roadmap Task 7, the HybridRouter is never framed as "Agent OS" or "runtime architecture" on any case-study page. If the work involves model routing (Superuser Pack, Animation Pipeline), it lives inside the Control Architecture write-up's "Authority" section — *"authority over which brain runs which task"* — and is referenced from the case-study page, not redescribed.

---

## 5. Color rules — page scope + status variants

### Base palette (inherited from hero §5)

| Color | Hex | Used by |
|---|---|---|
| Paper | `#FFF9F0` | Page background, full-bleed |
| Ink (primary) | `#1A1A1E` | Opener prose, 4Q body, table cells |
| Teal (primary) | `#0A3E42` | Title, section headings, anchor metric |
| Secondary ink | `#546E71` | Dateline body, captions, tags |
| Stamp amber | `#7C2D12` | Dateline prefix, caption stamps, ACTIVE/COMING status |
| Amber mid-stop | `#FAC775` | Frame numbers, registration marks, artifact borders |
| Success teal | `#0F6E56` | SHIPPED status pill only |
| Border whisper | `rgba(10, 62, 66, 0.15)` | Dateline divider, Methods table grid, torn-paper shadow |
| Right-margin accent | `rgba(10, 62, 66, 0.4)` | 1px column down the right edge (desktop only) — visual rhyme back to the projects-section teal |

### Status variants

The page's *shape* changes by status (see §12). The page's *palette* also shifts in 2 places:

| Status | What desaturates | Why |
|---|---|---|
| `ACTIVE` | nothing | Live, full color |
| `COMING` | nothing (status pill pulses) | Still live, anticipatory |
| `SHIPPED` | nothing (status pill in success teal `#0F6E56` + literal SHIPPED stamp in title block) | Bright, in-the-world |
| `PAUSED` | status pill + frame number drop to secondary-ink `#546E71` | "on the shelf" visual signal |
| `ARCHIVED` | status pill, frame number, AND right-margin accent at 50% opacity | "closed chapter" — the page reads as historical reference |

Status-driven desaturation is one CSS custom-property swap (`--page-status-desat`), governed by frontmatter `status:`. No JS.

---

## 6. Motion timeline (page enter via View Transition)

Trigger: the user clicked a tile on the projects section; the browser is mid-transition.

| t (ms) | Element | Animation | Easing | Duration |
|---|---|---|---|---|
| 0 | Hero media (shared element) | Cross-fade + morph from tile to full-bleed position (Astro View Transitions handles natively). **Both endpoints use `object-fit: cover` + `object-position: center`** — a `cover`/`contain` mismatch would snap the morph mid-transition. See projects-spec §10. | browser default | ~400ms |
| 0 | Dateline + title block | Pre-rendered, instant — already visible when the View Transition completes (mounted above the fold) | — | — |
| 400 | Opener | Per-paragraph reveal: translateY(24px) → 0 + opacity 0 → 1, 80ms stagger | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms |
| 600 | Investigation board section heading | Type-on, character by character | `cubic-bezier(0.16, 1, 0.3, 1)` | 300ms |
| 700+ | Investigation board artifacts | IntersectionObserver-triggered (NOT on initial paint). Each artifact fades + translateY(40px) → 0 as it enters viewport. 400ms duration. | `cubic-bezier(0.16, 1, 0.3, 1)` | 400ms each |
| viewport-triggered | Methods strip | Single fade-in + table-cell stagger (each cell 40ms apart) | `cubic-bezier(0.16, 1, 0.3, 1)` | 600ms total |
| viewport-triggered | 4Q block | Per-question fade-in, 200ms stagger between Q1-Q4 | `cubic-bezier(0.16, 1, 0.3, 1)` | 800ms total |
| viewport-triggered | Pencil annotations | Each fades in 200ms after its target artifact lands | `cubic-bezier(0.22, 1, 0.36, 1)` | 200ms |

**The opinionated bit:** the page's *above-the-fold* (dateline + title + hero) is instant after the View Transition completes — no fade-up cascade. The recruiter sees the same hero they clicked, the same title, no waiting. Motion is reserved for *below* the fold, where it earns its keep as a scroll reward.

**Reduced motion:** everything collapses to opacity 0 → 1 over 200ms. View Transition disables to instant page swap. Hero media renders as poster image (same rule as hero spec §12).

---

## 7. Investigation board (the P4 artifact thread)

The load-bearing section. This is where "I shipped real things with real evidence" stops being a claim and becomes a document.

### 7.1 Structure

A vertical thread of **4-6 artifacts**, left-aligned, each artifact paired with a wire-service caption on the right. Artifacts and captions sit at 50/50 split on desktop (~520px each in a 1120px column), stack vertically on mobile.

```
┌──────────────────────────┐   ╮
│   ARTIFACT (Polaroid     │   │   STAMP — date.
│   frame, 0.5px amber     │   │   one-line caption, JetBrains Mono,
│   border, optional tape  │   │   what the artifact is + what it
│   SVG corners)           │   │   proved.
└──────────────────────────┘   ╯
```

### 7.2 The 4 allowed artifact types

| Type | MDX component | What it carries | Source rule |
|---|---|---|---|
| **PRD decision** | `<PRDDecision />` | A snippet of a real PRD with the load-bearing decision sentence + a 1-line rationale | Sanitized from the actual PRD. Never paraphrased. |
| **Slack DM** | `<SlackQuote />` | A 1-2 message exchange, **always static SVG**, names replaced with role labels (`eng lead`, `design crit`, `customer`) | Never a real screenshot. SVG render is the anonymization guarantee. |
| **Jira / board state** | `<BoardArtifact />` | A board excerpt or single Jira ticket card | Sanitized — project keys redacted, anonymized assignee |
| **Metric chart** | `<MetricChart />` | A small chart (line, bar, or sparkline) reading from a **local JSON file** — no runtime fetch | Deterministic. Static at build time. |

**No fifth type.** If a moment doesn't fit one of these four, it doesn't go on the board. The discipline IS the credibility.

### 7.3 Caption shape

Every caption is one or two lines. Single shape:

```
APR 17 — first cleaned cycle.
         the v2a pipeline holds: 146→127 frames at 24fps, alpha clean.
```

Stamp prefix in stamp amber `#7C2D12`. Body in secondary ink `#546E71`. JetBrains Mono throughout. Wire-service register — past-tense, factual, one claim per caption.

### 7.4 Artifact ordering rule

**Default: reverse-chronological.** Newest first; scroll back to the kickoff. Recruiter scanning the page sees "what shipped" before "what we tried."

**Override per page:** an MDX page can declare `investigation_order: forward` in frontmatter to flip to forward-chronological. Use this when the *arc* is the story (e.g., The Block — Campus + RevOps, where the narrative is "what was built over 2 years").

### 7.5 Cut artifacts

An artifact that represents a reversed decision is rendered with a hand-drawn strikethrough X overlay (a pencil annotation, see §11). Its caption opens with `KILLED —` instead of a date stamp. **Cut artifacts count toward the ≤6 artifact budget.** Their job is to show that decisions were considered and rejected, not pretend the path was straight.

### 7.6 Per-artifact permalinks

Each artifact has `id="artifact-<n>"` generated from its MDX heading. The URL `/work/animation-pipeline#artifact-3` jumps to artifact 3. Recruiter can share a single piece of evidence in a message without sending the whole page.

---

## 8. Methods strip

A wire-service mini-table that lives between the investigation board and the 4Q block. The job: *prove the agent-fleet thesis as data, not slogan.*

### 8.1 Structure

Three columns. Four to seven rows typical. Mono throughout. Paper background, 0.5px teal grid lines (`rgba(10, 62, 66, 0.15)`).

| TASK | AGENT / TOOL | MODEL / COST |
|---|---|---|
| frame cleanup | `clean-frame-v2a.sh` | rembg / $0 |
| render | ffmpeg + libvpx-vp9 | local / $0 |
| style anchor | Seedream 2.0 | ~$0.40/run |
| orchestration | → `/work/superuser-pack` | Claude Sonnet 4.6 (HybridRouter) |
| frame interpolation | RIFE | local GPU / $0 |

### 8.2 Cross-link rule

When the AGENT/TOOL column references something that has its own case study, the cell becomes an internal link. The mono text gets a 1px underline in `#0A3E42`. The Methods strip emerges as a **methods graph** across the portfolio — claude code superuser pack appears in 3 case studies' methods, animation pipeline appears in 1, etc.

### 8.3 Source

Rendered from a `methods:` frontmatter array. Schema:

```yaml
methods:
  - task: frame cleanup
    tool: clean-frame-v2a.sh
    cost: rembg / $0
    link: null
  - task: orchestration
    tool: Claude Code Superuser Pack
    cost: Claude Sonnet 4.6 (HybridRouter)
    link: /work/superuser-pack
```

The MDX body never writes the Methods table inline — it's frontmatter-driven so the cross-link graph stays queryable and uniform.

### 8.4 What Methods is NOT

**Not a tech-stack badge wall.** No logos. No version numbers. No "powered by." The Methods strip is the operational truth: *here's the work, here's the agent that did it, here's what it cost.* If a row reads as a brag, it gets cut.

---

## 9. 4Q block — the canonical `EXPLANATION.md`

The closer. Sits below Methods, above next/prev. Mirrors [`EXPLANATION-template.md`](../../../code-brain/vault/40_knowledge/templates/EXPLANATION-template.md) **heading-for-heading**.

### 9.1 The four sections, in order

```
## A-1.Q1   What is this?
(2–4 sentences. Leads with value, not implementation. A reader can repeat back what the thing does after one pass.)

## A-1.Q2   Why this approach?
(3 options considered. Chose X because Y. Trade-offs accepted. The honesty about what was rejected is load-bearing.)

## A-1.Q3   What would break?
(3 named failure modes with detection signals. "How would you notice it broke," not just "what would break.")

## A-1.Q4   What did I learn?
(2–3 sentences. The non-obvious insight that travels. If it reduces to "I learned the API," it's too small.)
```

Heading shape: `## <frame>.Q<n>   <title>` — frame number prefix (mono) + the canonical template's exact title (Newsreader). Two-space gap is intentional.

### 9.2 The source-of-truth rule

The case-study page does **not** fork the 4Q content. It **reads from the canonical `EXPLANATION.md`** living in the artifact's repo at build time.

Two implementation options, in order of preference:

**Option A — read from the repo at build time (preferred):**
A build-time script (`scripts/fetch_explanations.mjs`) curls each artifact's `EXPLANATION.md` raw from GitHub, validates it against the template's 4 headings, and writes it to `src/content/explanations/<slug>.md`. The case-study page renders that file inline. CI catches missing or malformed EXPLANATION files; the page fails the build before deploy.

**Option B — frontmatter mirror (fallback):**
The MDX page's frontmatter carries `four_q: { what, why, break, learn }` as structured strings. The page renders them into the heading shape. Used only when the artifact lives in a private repo or can't be fetched.

**Every page declares one of:** `explanation_url: <github raw url>` OR `four_q: { ... }`. A build-time validator (script `scripts/validate_case_study.mjs`) rejects any MDX missing both.

### 9.3 "Read the canonical" link

Below the four sections, a single line:

```
→ read the canonical EXPLANATION.md ⓘ
```

Mono 13px, `#0A3E42`. Points at the GitHub raw URL (or the rendered file on the artifact's repo). Recruiter clicks → lands on the source. The portfolio doesn't own the comprehension layer; it surfaces it.

### 9.4 Why this matters strategically

The 4Q block exists in three places: (1) the artifact's repo (`EXPLANATION.md`), (2) the `/transactions/` ledger row, (3) this case-study page. **All three read from the same file.** When Sean updates the EXPLANATION in the repo, both the ledger row and the case-study page update on the next build — automatic, no duplication, no drift. This is the comprehension-artifact thesis (Karpathy / Nate B Jones) made operational across surfaces.

---

## 10. Next / Prev nav

Two pills at the bottom of the page body, above the registration mark.

```
← A-2 SUPERUSER PACK              A-4 THE BLOCK →
```

| Element | Style |
|---|---|
| Layout | Flex row, `justify-content: space-between`, 80px below 4Q block |
| Type | JetBrains Mono 14px / 1.8px tracking, `#0A3E42` |
| Arrow | Single character `←` / `→` at 18px, same color, 8px gap |
| Hover | Underline appears (1px, animated from left); arrow translates 4px outward |
| Click | Standard navigation with View Transition (target page's title block becomes the next hero) |

### 10.1 Order

Reads from `getCollection('work').sort(order)`. Wraps around — at A-1 the prev pill goes to A-5; at A-5 the next pill goes to A-1.

### 10.2 What's NOT in next/prev

**No "you might also like" cards.** No thumbnails. No descriptions. The pill is title-only. The discipline IS the restraint — the recruiter knows there are 5 projects, they came from the grid, they can scan the grid. Adding card peeks here turns the page foot into a content farm.

---

## 11. Pencil-margin annotations — site debut

Three vocabularies, ≤6 per page, never adjacent.

| # | Vocabulary | When it fires | Visual |
|---|---|---|---|
| 1 | **Curved arrow** with a 1-2 word label | Points at one specific artifact. "the one we kept" / "rev 3" / "shipped this" | Hand-drawn SVG, stroke `#0A3E42` @ 0.7 opacity, 1.2px |
| 2 | **Strikethrough X** | Marks a cut artifact (§7.5) | Hand-drawn SVG cross, stroke `#7C2D12` @ 0.8 opacity, 1.8px |
| 3 | **Coffee ring** | Once per page, on one artifact, as a physical-process intrusion | Watercolor-like circle PNG (sepia, ~30% opacity, slightly oblong) |
| 4 | **Registration mark** | Page closeout, bottom-right corner | Hand-drawn `+` cross with perpendicular ticks, stroke `#FAC775`, 1.2px |

### 11.1 Implementation

Declarative MDX components — never absolute pixel coordinates. Each annotation is anchored to a target by ID + offset:

```jsx
<Annotation
  type="arrow"
  label="the one we kept"
  target="#artifact-3"
  offset={{ x: -40, y: 8 }}
/>
```

The component lives in `src/components/annotations/`. SVGs live alongside. The pattern is **shared across surfaces** — About + `/transactions/` import the same components.

### 11.2 Density rule

**≤6 per page. Never adjacent.** If two annotations would land within 200px of each other on desktop, drop the second one. The signal is "human hands touched this," not "decoration." Crowding kills the signal.

### 11.3 Mobile rule

≤4 per page below 768px. The registration mark + coffee ring + 2 arrows. The strikethrough X only renders on a cut artifact and counts toward the cap.

### 11.4 Reduced motion

Annotations render in final position with no idle animation. The 4-second bob on the "updated weekly" arrow from projects-spec §9 does NOT propagate here — that's a projects-section pattern, not a site-wide one.

---

## 12. Status-driven page shape

The page is one template, four behaviors, governed by frontmatter `status:`. The shape changes — not just the label.

### 12.1 ACTIVE

The default. Page reads as live and in-motion.

- Title block: status pill in stamp amber `#7C2D12`
- Opener: leads with "current frame" — what's happening this week
- Investigation board: reverse-chronological, newest artifact at the top is from this month
- Methods strip: shows tools currently in rotation
- 4Q block: written in present tense
- "In flight" date range in the chrome (`IN FLIGHT 2026-03 → 2026-06`)

### 12.2 SHIPPED

Reserved for finished launches that landed. **Intent Engineering MCP** is the V1 occupant.

- Title block: status pill in success teal `#0F6E56` + a **literal `SHIPPED` stamp** (hand-drawn SVG, transaction-stamp amber, rotated -3°) baked into the title block top-right
- Below the title block: a **live block** (`<ShippedNow />`) — wire-service mini-card showing live install counts:
  ```
  LIVE — npm: 47 weekly downloads · mcp registry: 12 verified installs · github: 8 stars
  updated 2026-05-17 08:45 by daily driver
  ```
  Reads from `/api/shipped-stats-<slug>.json` written by the Daily Driver agent
- Opener: retrospective framing. Past tense for the build, present tense for the live state. "It shipped on May 12, 13 days early. It's installed by..."
- Investigation board: forward-chronological by default (the arc was build → ship → live)
- Methods strip: shows the build-time tools, not necessarily what's running now
- 4Q block: blends past tense (Q1-Q3) with present tense (Q4)

### 12.3 PAUSED

For real work that's deliberately on the shelf. **16BitFit Battle Mode** is the V1 occupant.

- Title block: status pill in secondary ink `#546E71` (desaturated)
- **Return-condition callout** sits directly below the title block, before the hero media:
  ```
  ┌─────────────────────────────────────────────────┐
  │  PAUSED — return condition:                     │
  │  when the animation pipeline ships its first    │
  │  full short. then the game inherits the         │
  │  pipeline. ~2026-08.                            │
  └─────────────────────────────────────────────────┘
  ```
  Mono throughout. Paper background. 0.5px secondary-ink border. The recruiter sees explicitly what un-pauses it.
- Opener: "What this is" + "Why it's on the shelf" — never apologetic
- Investigation board: reverse-chronological, leans on **pipeline artifacts** (renders, sprite explorations, agent runs) rather than gameplay screenshots. The pipeline IS the artifact.
- Methods strip: shows what's still active in the broader fleet that overlaps (e.g., the animation pipeline)
- 4Q block: Q3 "What would break?" includes "the return condition slipping past Q4" as a named failure mode

### 12.4 ARCHIVED

For closed chapters. **The Block — Campus + RevOps** is the V1 occupant.

- Title block: status pill in secondary ink `#546E71`, frame number desaturated to 50%
- Right-margin accent column drops to 50% opacity (the desaturation signal)
- **Pre-opener "frame the work" preamble** — one short paragraph that opens with the work, never with the layoff:
  > "Two years of B2B and infrastructure work for an institutional crypto research firm. Campus (a B2B research platform) and the internal RevOps system that supported the broader Block business."
- Opener: scope, dates, role. What was built. The frame is "this was the work," not "this is why it ended."
- Investigation board: forward-chronological by default (arc was 2-year arc; the chronology IS the story)
- "**Reference artifact**" link at the end of the investigation board: a single sanitized public artifact (blog post, talk, public PRD excerpt) that proves it was real
- Methods strip: shows the agent-fleet work as it overlapped with The Block era — honest about which artifacts emerged from this period
- 4Q block: written in past tense throughout, including Q4

---

## 13. The 5 MDX body shapes

Each of the 5 case studies is a single `.mdx` file in `src/content/work/`. Frontmatter governs the title block + Methods + status behavior. The MDX body governs the opener + investigation board.

### 13.1 `animation-pipeline.mdx` — `ACTIVE`

**Hero media:** the 9.2s WebM loop (`character.webm`, 220 frames) — the one redirected from the home hero per PMP §8.1.
**Anchor metric:** `220 FRAMES`
**Opener angle:** "I taught Seedream to draw me." Specific, comedic-juxtaposition, Sedaris-coded. Why pencil-test instead of Midjourney/Flux.
**Investigation board (reverse-chronological, ~5 artifacts):**
  1. The 220-frame cleaned cycle landing (May 15)
  2. A metric chart: render-time-per-frame v1 → v2a (May 6)
  3. An anonymized Slack DM about the alpha channel rub (Apr 23)
  4. The first 146-frame raw cycle (Apr 17) — Polaroid frame
  5. A killed v2 cleanup script — strikethrough X annotation
**Methods strip:** rembg / ffmpeg+libvpx-vp9 / Seedream 2.0 / Superuser Pack orchestration (cross-link)
**4Q source:** read from `EXPLANATION.md` in the animation-pipeline repo (or co-located in the superuser-pack working folder if it lives there)
**[OPEN: confirm where the animation-pipeline EXPLANATION.md lives — superuser-pack repo or its own folder]**

### 13.2 `superuser-pack.mdx` — `ACTIVE`

**Hero media:** a looping terminal recording of an agent fleet event firing (Daily Driver morning brief, ~6s loop)
**Anchor metric:** `16 SKILLS · 14 HOOKS · 8 AGENTS`
**Opener angle:** "My second brain has a fleet now." How the personal automation system became a load-bearing PM tool.
**Investigation board (reverse-chronological, ~5-6 artifacts):**
  1. The synth-manifest JSON from a recent nightly run (May 16) — metric chart
  2. A PRD diff: Tier 1 retrofit decision (May 13) — PRDDecision
  3. An anonymized Slack DM about agent-fleet ROI (Apr 28)
  4. A board excerpt: schedule-recommendations.md update (Mar)
  5. A killed v1 process-inbox cloud-Sonnet approach — strikethrough
**Methods strip:** Claude Agent SDK / launchd / Ollama (Mac Mini + MBP) / nomic-embed-text / Qwen3-14B
**4Q source:** read from `EXPLANATION.md` in `~/Code-Brain/code-brain/`
**Note on STOP-DOING:** HybridRouter mentioned in Methods strip only. Not in opener. Not in 4Q's Q2 framing.

### 13.3 `intent-engineering-mcp.mdx` — `SHIPPED`

**Hero media:** a 90-sec Loom poster — terminal showing `npm install @swins/intent-engineering-mcp` resolving + Claude Desktop loading the server (per projects-spec Open Decision #8). On hover, the loom plays inline.
**Anchor metric:** `0.1.0 · NPM + MCP REGISTRY · 2026-05-12`
**Opener angle:** Retrospective framing. **"It shipped 13 days early because the design was right."** What got cut, what stayed.
**Live block (`<ShippedNow />`) below title:** npm weekly downloads, MCP registry installs, GitHub stars — Daily Driver writes nightly
**Investigation board (forward-chronological, ~5 artifacts):**
  1. The MCP protocol diagram (Apr) — what was specced
  2. A board excerpt: scope decision to keep the registry verification (Apr 20)
  3. A metric chart: build size vs feature count across versions (May 1)
  4. The npm registry page screenshot (May 12) — the ship moment
  5. An anonymized customer DM about install friction (May 14)
**Methods strip:** MCP SDK / npm / DNS-verified registry verification / Claude Code (for development)
**4Q source:** read from `EXPLANATION.md` in the intent-engineering-mcp repo
**Note:** Per PMP §7, the embed (E2 idea — an actual MCP tool call you can fire from the page) is **deferred** as a future spec. This case-study page does NOT need the embed to ship. The Loom + live block carry the SHIPPED status credibly.

### 13.4 `the-block.mdx` — `ARCHIVED`

**Hero media:** sanitized product screenshot (Campus surface OR RevOps surface — pick one, keep restraint)
**Anchor metric:** `2024 – 2026 · TWO PRODUCTS · ONE FIRM`
**Frame-the-work-not-the-exit preamble** (§12.4) — one paragraph, opens with the work.
**Opener angle:** What was built. The B2B research arc. The RevOps internal product. No "I was laid off" framing anywhere on the page.
**Investigation board (forward-chronological, ~6 artifacts):**
  1. Campus product launch (2024) — sanitized screenshot
  2. A PRD decision on subscription tier structure (2025 Q1)
  3. RevOps internal launch (2025 Q2)
  4. A metric chart: institutional research subscriber growth (2025-2026)
  5. An anonymized customer Slack DM (2025)
  6. The handoff doc (2026 Q1) — Reference artifact link
**Methods strip:** lean — sanitize aggressively, list 4-5 tools max
**Reference artifact** link at the bottom: a single public artifact (blog post Sean was credited on, public-facing talk, sanitized screenshot of a finished surface) that proves it was real
**4Q source:** likely `four_q:` frontmatter mirror (Option B from §9.2) — the original work doesn't have a public repo with an `EXPLANATION.md`. Sean writes the 4Q content directly in frontmatter.
**[OPEN: confirm with Sean — Larry Cermak is the named primary reference per PMP §10 Decision 4; how much of the work is anonymizable enough to ship? This needs a content review before the body is drafted.]**

### 13.5 `16bitfit.mdx` — `PAUSED`

**Hero media:** a looping pixel-art sprite collision (battle mode), 4-6s loop, ~1MB. **Not** a finished-game screenshot.
**Anchor metric:** `PIPELINE: 47% · GAME: ON SHELF`
**Return-condition callout** directly below title block per §12.3.
**Opener angle:** "I built the pipeline before I built the game on purpose." Why the production system is the artifact, not the game.
**Investigation board (reverse-chronological, ~4-5 artifacts):**
  1. A sprite explorations sheet — what the pipeline can generate now (May)
  2. A metric chart: frames generated by the pipeline over time (Mar–May)
  3. A board excerpt: the pause decision (Apr) — what's blocking, return condition
  4. An anonymized Slack DM about Phaser scope creep (Mar)
  5. A killed gameplay-loop v1 — strikethrough X
**Methods strip:** Phaser / Seedream 2.0 / animation pipeline (cross-link to `/work/animation-pipeline`) / pixel-art Gemini skill
**4Q source:** `four_q:` frontmatter mirror initially; consider co-locating an `EXPLANATION.md` in `creative-studio/16bitfit-battle-mode/` when the pause status doc gets formalized
**[OPEN: confirm with Sean per PMP §10 Decision 5 — is there enough shippable artifact material that leans on the pipeline rather than the unfinished game? Spec assumes yes; review before body draft.]**

---

## 14. Accessibility + reduced motion

- All artifact content (titles, captions, table cells, 4Q body) is real text. No background-image-baked text anywhere.
- Each artifact is `<article>` inside the investigation board's `<section role="region" aria-labelledby="investigation-board">`. Screen readers get the structure.
- Per-artifact permalinks via `id="artifact-<n>"` — each independently shareable.
- Slack DMs are static SVG components — anonymized by construction, never real screenshots. Each carries an `aria-label` of the spoken content ("Slack message from eng lead: ...").
- Pencil annotations are decorative — `aria-hidden="true"`. The strikethrough X on a cut artifact additionally adds `aria-label="Cut decision"` to the artifact's `<article>` element so screen readers convey the meaning.
- Methods strip uses semantic `<table>` with `<caption>`, `<thead>`, `<tbody>`. Cells are keyboard-tabbable in column order; linked cells (cross-links) are focusable.
- 4Q heading levels: `<h2>` for each Q1-Q4, `<h2>` for each major section heading (Opener / Investigation Board / Methods / 4Q / Next-Prev). The page title is `<h1>`.
- Status pill always carries the status as text (`ACTIVE`, `SHIPPED`, etc.), never icon-only.
- Color contrast: status pills + frame numbers cleared at WCAG AA on cream paper at all sizes. Success teal `#0F6E56` on paper = 7.1:1 (passes AAA at 14px+); secondary ink desaturation for ARCHIVED/PAUSED keeps text at 4.5:1 minimum.
- `prefers-reduced-motion: reduce`:
  - View Transition disabled → instant page swap
  - Hero media renders as poster image only (no video mount)
  - All section fade-up cascades collapse to opacity 0→1 over 200ms
  - Annotation idle animations disabled
  - Strikethrough X still renders, just static
- Keyboard order: dateline (skipped, decorative) → role + in-flight chrome → frame + status → title (focusable via `<h1>`) → tags → anchor metric → opener → each artifact (focusable as `<article tabindex="0">` so the permalink can be navigated to) → Methods strip cells → 4Q headings → "read the canonical" link → next-prev nav.

---

## 15. Build stack

Inherits all choices from hero spec §13 — Astro 5, Tailwind 4, native CSS, Newsreader + JetBrains Mono. Additions for the case-study page:

| Layer | Choice | Why |
|---|---|---|
| MDX rendering | Astro's built-in `@astrojs/mdx` | Already in the stack via the content collection |
| Artifact MDX components | Single-file Astro components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) | No React unless interactive (`<MetricChart />` is the only one that *might* hydrate, and only if it gains an interactive variant later — V1 is static SVG) |
| Image optimization | `astro:assets` `<Image>` | Native, handles WebP + responsive `sizes` automatically |
| Build-time EXPLANATION fetch | `scripts/fetch_explanations.mjs` (Node, runs in `prebuild`) | Curls GitHub raw URLs, validates against the 4Q template, writes to `src/content/explanations/`. Fails the build if any expected file is missing or malformed. |
| Live block data | `/api/shipped-stats-<slug>.json` written by Daily Driver agent (existing infra per PMP §0.5) | Same agent that writes `dateline.json`, no new infrastructure |
| Annotation library | `src/components/annotations/` — SVG + a single `<Annotation />` wrapper component | Shared with About + `/transactions/` |
| View Transition | Astro 5 `<ClientRouter />` with `view-transition-name: hero-media-<slug>` on both tile + case-study hero | Inherited from projects spec §10 |
| Validator | `scripts/validate_case_study.mjs` runs in `prebuild` | Asserts every MDX has `slug`, `frame`, `title`, `status`, `tags`, `hero_media`, `methods[]`, and either `explanation_url` or `four_q{}`. Fails build on missing fields. |

**Anti-stack (additions):**
- No `react-markdown` (MDX already renders)
- No charting library (`<MetricChart />` is hand-rolled SVG over local JSON)
- No third-party "card" component library
- No client-side TOC (deferred — see §17)
- No animated typing on artifact captions (only the dateline + section headings type-on)

---

## 16. Definition of Done

Case-study page v1 ships when:

1. The 5 MDX files exist in `src/content/work/` with full frontmatter, opener prose, investigation board MDX content, and either `four_q` or `explanation_url`.
2. `scripts/fetch_explanations.mjs` runs in `prebuild`, fetches every `explanation_url`, validates the 4 headings, writes to `src/content/explanations/`, and fails the build if any file is missing or malformed.
3. `scripts/validate_case_study.mjs` runs in `prebuild` and rejects any MDX missing required frontmatter fields.
4. The 4 MDX artifact components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) render correctly on all 5 pages.
5. View Transition: clicking a tile on the projects section morphs into the case-study hero with the correct `view-transition-name` continuity. Tested on Chrome and Safari; Firefox falls back to instant navigation gracefully.
6. Status-driven page shape: each of the 4 statuses (`ACTIVE` / `SHIPPED` / `PAUSED` / `ARCHIVED`) demonstrably renders differently per §12 (SHIPPED has live block + stamp, PAUSED has return-condition callout, ARCHIVED has frame-the-work preamble + desaturated palette).
7. Live block: the SHIPPED page (`intent-engineering-mcp`) reads from a real `/api/shipped-stats-intent-engineering-mcp.json` written by the Daily Driver — not hardcoded.
8. Pencil annotations render with ≤6 per page on desktop, ≤4 on mobile, never adjacent within 200px, anchored via `target` + `offset` (no absolute pixel coords).
9. Methods strip cross-links work — `Claude Code Superuser Pack` cell on `animation-pipeline` page navigates to `/work/superuser-pack` via View Transition.
10. Per-artifact permalinks work — `/work/animation-pipeline#artifact-3` scrolls to the third artifact on page load.
11. Reduced-motion: every animation collapses per §14. The View Transition gracefully disables.
12. Lighthouse Performance ≥90 (the page is image-heavier than the hero so the threshold is lower), Accessibility ≥95, Best Practices = 100.
13. Cold-read test: a fresh reader can grok the page's "what" + "why" + "what shipped" within 90 seconds of landing. Re-run per case study.

When all 13 are green, case-study v1 is locked and we move to About.

---

## 17. Out of scope for v1

- **Page-local TOC.** Sticky right-rail TOC was brainstormed (D23/E79/E80) but deferred — at this page length the value of a TOC is low vs. the chrome it adds. Revisit if individual case studies grow past ~4000px scroll height.
- **"See also" footer with peer case studies.** Brainstormed (PM16) and deferred — next/prev already gives most of the value; cross-links from Methods strip cells give the rest.
- **Frame number sticky chrome ticker.** Brainstormed (PM29/D55/E88) and deferred — adds JS for low payoff vs. just keeping the frame number in the title block.
- **Interactive `<MetricChart />` variant.** V1 ships static SVG charts. An interactive (hoverable, sortable, A/B-switchable) variant lives in V2 if any case study warrants it.
- **The MCP embed page (E2 from PMP §7).** Separate future spec. The `intent-engineering-mcp` case study ships with a Loom + live block; the actual-tool-call embed is post-V1.
- **A `/work/` index route.** The home page's projects section is the index for V1. Defer until project count grows past ~8 (matches projects-spec §14 deferral).
- **Page-level analytics.** Per-artifact scroll-depth tracking, time-on-artifact, etc. — add post-launch as a single Plausible event listener if needed.

---

## Appendix A — File map (additions to projects-spec's map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── pages/
│   │   └── work/
│   │       └── [slug].astro         ← dynamic route, builds the page shape per §2 + §12
│   ├── components/
│   │   ├── case-study/
│   │   │   ├── DatelineStrip.astro      ← reused from hero, project-specific body
│   │   │   ├── TitleBlock.astro         ← frame + status + title + tags + anchor metric
│   │   │   ├── HeroMedia.astro          ← View Transition target wrapper
│   │   │   ├── Opener.astro             ← thin wrapper, renders MDX opener body
│   │   │   ├── InvestigationBoard.astro ← <section role="region"> wrapper
│   │   │   ├── MethodsStrip.astro       ← renders <table> from frontmatter methods[]
│   │   │   ├── FourQBlock.astro         ← renders the 4Q from explanation OR frontmatter
│   │   │   ├── ShippedNow.astro         ← live block for SHIPPED pages
│   │   │   ├── ReturnConditionCallout.astro  ← for PAUSED pages
│   │   │   ├── FrameTheWorkPreamble.astro    ← for ARCHIVED pages
│   │   │   └── NextPrevNav.astro
│   │   ├── artifacts/
│   │   │   ├── PRDDecision.astro
│   │   │   ├── SlackQuote.astro         ← static SVG, anonymized by construction
│   │   │   ├── BoardArtifact.astro
│   │   │   ├── MetricChart.astro        ← reads local JSON
│   │   │   └── ArtifactImage.astro      ← wraps astro:assets <Image> + Polaroid frame + caption slot
│   │   └── annotations/
│   │       ├── Annotation.astro         ← wrapper component, takes type + label + target + offset
│   │       ├── arrow.svg
│   │       ├── strikethrough-x.svg
│   │       ├── coffee-ring.png
│   │       └── registration-mark.svg
│   ├── content/
│   │   ├── work/                        ← from projects spec, 5 MDX files
│   │   └── explanations/                ← NEW: build-time-fetched canonical EXPLANATION.md files
│   └── scripts/                         ← Node scripts run in `prebuild` (not Astro pages)
│       ├── fetch_explanations.mjs
│       └── validate_case_study.mjs
└── public/
    └── api/
        ├── dateline.json                ← from hero spec
        ├── next-piece.json              ← from projects spec
        └── shipped-stats-<slug>.json    ← NEW: per-SHIPPED-page live block data (Daily Driver writes)
```

---

## Appendix B — MDX frontmatter shape (case-study additions)

Extends the projects-spec Appendix B shape. Adds the case-study-specific fields.

```yaml
---
# --- From projects spec (unchanged) ---
slug: animation-pipeline
frame: A-1
title: 2D Animation Pipeline
status: ACTIVE                  # ACTIVE | COMING | PAUSED | ARCHIVED | SHIPPED
tags:
  - animation
  - agentic
  - pipeline
hero_media: /assets/projects/animation-pipeline-hero.webm
hero_media_type: video
hero_media_alt: A 9.2s pencil-test loop of Sean and his AI companion arriving and departing.
order: 1
date_started: 2026-03-15
date_active_through: 2026-06-11

# --- NEW: case-study additions ---
role: pm + builder + operator
anchor_metric: "220 FRAMES"
investigation_order: reverse    # reverse | forward (default reverse)

methods:
  - task: frame cleanup
    tool: clean-frame-v2a.sh
    cost: rembg / $0
    link: null
  - task: render
    tool: ffmpeg + libvpx-vp9
    cost: local / $0
    link: null
  - task: style anchor
    tool: Seedream 2.0
    cost: ~$0.40 per run
    link: null
  - task: orchestration
    tool: Claude Code Superuser Pack
    cost: Claude Sonnet 4.6
    link: /work/superuser-pack

# Either explanation_url (preferred) OR four_q must be present:
explanation_url: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/animation-pipeline/EXPLANATION.md
# OR:
# four_q:
#   what: "..."
#   why: "..."
#   break: "..."
#   learn: "..."

# Status-specific frontmatter (optional, only if applicable):
shipped_at: 2026-05-12             # SHIPPED only
shipped_stats_endpoint: /api/shipped-stats-intent-engineering-mcp.json   # SHIPPED only
return_condition: |                # PAUSED only
  when the animation pipeline ships its first full short. then the
  game inherits the pipeline. ~2026-08.
archived_reference_url: https://...   # ARCHIVED only — points at the single public sanitized artifact
---
```

---

## Appendix C — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `projects-section-spec-v1.md`, and `case-study-spec-v1.md` end-to-end. The hero and projects section are presumed built per their own specs. Build the case-study route components per the file map in Appendix A. Implement `scripts/fetch_explanations.mjs` and `scripts/validate_case_study.mjs` as `prebuild` hooks in `package.json`. Build the 4 artifact MDX components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) as single-file Astro components — `<SlackQuote />` renders static SVG only (never a real screenshot). Build the `<Annotation />` wrapper + 3 SVG vocabularies + the coffee-ring PNG. Draft the 5 MDX bodies — frontmatter complete per Appendix B, opener prose (3 short paragraphs per §4 voice register), investigation board MDX with the artifact counts called out in §13. The `intent-engineering-mcp` page must have a working `<ShippedNow />` reading `/api/shipped-stats-intent-engineering-mcp.json` (hardcode the JSON for now; Daily Driver wiring comes in Phase 4 of the master plan build sequence). Stop when the 13 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Awaits Sean's lock. Open questions flagged inline; see §13.1, §13.4, §13.5.*
