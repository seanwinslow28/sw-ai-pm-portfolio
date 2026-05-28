# Architecture Surface — Prose Locked Content

**Date:** 2026-05-27
**Status:** LOCKED — Phase 1 page chrome + Phase 2 Vault Scorecard frontmatter. Ready to apply on Mac Mini AFTER the upstream essay voice-review pass per §"Voice-review gate" below.
**Scope:** The `/architecture/` route's prose surfaces — index page 1-line italic hook, sober subhead, deep-dive dateline body template, footer fold confirmation, OPEN-question resolutions, and the full frontmatter for v1's single occupant (Vault Scorecard, ships 2026-06-03). Vault Knowledge MCP Design + Control Architecture deferred to follow-up sessions per the "get site up first" preference.
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-27 (continued from the transactions lock earlier this session — Phase 1 + Phase 2 ledger rows landed at [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## ⚠️ Voice-review gate — read before apply

The Task 15 Step 0 pre-build prep doc ([`vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-20-task-15-step-0-prebuild-prep.md`](../../../code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-20-task-15-step-0-prebuild-prep.md)) carries a 2026-05-21 voice-review reminder:

> Sean's decision is "all defaults for now, revisit wording with the writing-voice-modes skill later." Both `vault/SCORECARD.md` and `docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` ship as **first-pass strategic-sober drafts**. Before any public posting (LinkedIn announcement, Substack candidate post in Step 7, the `/architecture/` page going live), Sean runs the [`writing-voice-modes`](.claude/skills/writing-voice-modes/SKILL.md) skill against both files and edits the voice. The Step 8 verification gate (commit + tag) is the canonical "voice-reviewed" checkpoint — if the voice review hasn't happened, don't tag.

**The architecture page going live IS the public surface this reminder governs.** Do not apply this lock doc on the Mac Mini until:

1. The upstream essay at `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` has been voice-reviewed via the `writing-voice-modes` skill
2. The companion `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md` (the 4Q) has been voice-reviewed
3. The `vault/SCORECARD.md` honest notes have been voice-reviewed
4. Sean has tagged the v3.X.X version that marks "voice-reviewed and ready"

If those four conditions aren't met when this lock doc gets a "ready to apply" call, **block the apply** — the architecture page would ship with strategic-sober prose that hasn't earned its public-facing voice. The lock doc itself (this file) is voice-final; it's the *referenced source files* that need the review.

---

## TL;DR — what's locked

### Phase 1 — Page chrome

| Surface | Locked content |
|---|---|
| Index 1-line italic hook | `Most people see Obsidian as content. I treat my vault as agent infrastructure.` |
| Index sober subhead | `Architectural arguments where the proof is the code, linked.` |
| Deep-dive dateline body template | `BOSTON, <date> — <title lowercased>, <past-tense verb>.` with 3-verb default set (`scored` / `designed` / `shipped`) |
| Footer fold | `→ subscribe via RSS` + `→ view the fleet ↗` (same as transactions footer) |
| OPEN-1 (v1 occupant count) | **1 occupant only — Vault Scorecard.** Vault Knowledge MCP Design + Control Architecture deferred to follow-up |
| OPEN-3 (Mermaid palette) | Ship 5-var override; escalate to mmdc only if visual integration fails |
| OPEN-4 (reading-time) | Manual in frontmatter (Sean writes `8`); auto-compute deferred to v2 |
| OPEN-5 (honest-note anchor matching) | Warning, not error; build keeps shipping; Sean updates manually |

### Phase 2 — Vault Scorecard frontmatter

| Field | Locked value |
|---|---|
| `title` | `"Vault as Agent Infrastructure"` |
| `dateline` | `"BOSTON, JUNE 3, 2026"` |
| `shipped` | `"2026-06-03"` |
| `readingTime` | `8` |
| `status` | `SHIPPED` |
| `tags` | `["agent-infrastructure", "sqlite", "obsidian", "linear"]` |
| `lead` | `"Three passes, two failures, and the failures are where vault-knowledge-mcp and the Judge Layer are going next."` |
| `methods` | 4 rows (persistent state / typed edges / er diagram gen / fixture author) |
| `essaySourceUrl` | `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md` |
| `explanationUrl` | `code-brain/docs/VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md` |
| `mermaidSource` | `diagrams/concept-edges-erd.mmd` |
| `mermaidCaption` | `"concept_edges schema — 6 relation types, validated against 478 production edges."` |
| `scoreboard` | 4 systems × 5 tests (Notion / Obsidian default / Linear / Sean's vault) |
| `honestNotes` | 2 (Ownership + Permissions) — verbatim from Task 15 Step 0 |
| `tryItYourselfUrl` + `Command` | per spec Appendix B |

---

## Carry-forward constraints

1. **Architecture is the most austere voice register on the site.** Per spec §5: no Sedaris, no comedic juxtaposition, sober/declarative throughout. The mono HONEST NOTE callouts inside Newsreader essay prose are the load-bearing visual signal — register-switching IS the visual punctuation.
2. **All carry-forward constraints from [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md), [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md), [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md), and [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md) still apply.** Particularly: no tenure-foregrounding; no Code Brain fixed counts; the HybridRouter STOP-DOING (Methods strip rows only); no "fleet" at tagline level (architecture has no tagline so non-issue).
3. **Honesty calibration is the load-bearing credibility signal on this surface.** Per spec §8 + the Task 15 Step 0 doc's framing: "the honesty about the two losses is the credibility move. Tier-1 recruiters detect over-claiming; admitting the two losses signals seniority." Don't soften the HONEST NOTE language in any future amendment.
4. **Flat presentation IS the credibility on the scoreboard.** Per spec §6 + §7: all rows visually identical, no Sean's-vault accent, no zebra striping. The reader reaches the conclusion from the symbols. Any future amendment that suggests highlighting Sean's row is a template trap.
5. **Voice-review gate applies to every architecture writeup before public posting** — not just Vault Scorecard. Future architecture writeups (Vault Knowledge MCP Design, Control Architecture, etc.) carry the same gate from the moment they're added to this lock doc.

---

## Phase 1 — Page chrome (LOCKED)

### 1.1 Index 1-line italic hook

**File:** rendered by `src/components/architecture/IndexHeader.astro` (per spec Appendix A).

**Locked:**

> Most people see Obsidian as content. I treat my vault as agent infrastructure.

**Why this lands:**
- Sean's own line from the Task 15 Step 0 §0 "The bet, in one sentence (carry into interviews)" — already battle-tested as a thesis Sean is willing to repeat in interviews. Page-level rhyme with the strategic frame.
- The italic Newsreader register (per spec §5 type system) + first-person "I" makes it quotable and personal — the single Newsreader-italic moment on the page above the writeup rows. Architecture-route austerity earns one personal moment at the top; this is it.
- The "agent infrastructure" claim is the architecture surface's thesis. Vault Scorecard's whole scoreboard exists to prove this single claim. The hook reads like the headline of an editorial; the writeup rows below are the supporting essays.
- Per spec OPEN-2: keep this hook until 3+ writeups exist, then revisit. Add a §1.1-style amendment to this lock doc when the architecture surface earns its 3rd occupant.

### 1.2 Index sober subhead

**File:** same component as §1.1.

**Locked:**

> Architectural arguments where the proof is the code, linked.

**Why this lands:**
- Spec'd default — clean, declarative, names the comprehension thesis.
- Pairs with the italic hook above (claim) by adding the methodology (proof is the code, linked). Reader reads claim + method in two beats before scanning the writeup rows.
- "Linked" specifically means: every architectural claim on every writeup has a permalink to the code or schema or fixture that backs it up. This is the surface's discipline — no hand-waving claims.

### 1.3 Deep-dive dateline body template

**File:** computed at build time in the deep-dive page template `src/pages/architecture/[slug].astro`.

**Locked template:**

```
BOSTON, <date> — <title lowercased>, <past-tense verb>.
```

**3-verb default set:**

| Writeup type | Default verb | Trigger |
|---|---|---|
| Scorecard / comparison essays | `scored` | When the writeup includes a `scoreboard:` frontmatter field |
| Design essays (MCP, agent, system) | `designed` | When `tags:` includes `design` OR title contains "Design" |
| Code-first writeups (post-ship architecture rationales) | `shipped` | Default fallback when neither of above fires |

**Examples:**

- Vault Scorecard: `BOSTON, JUNE 3, 2026 — vault as agent infrastructure, scored.`
- Vault Knowledge MCP Design (future): `BOSTON, JUNE 4, 2026 — vault knowledge mcp, designed.`
- Control Architecture (future): `BOSTON, JUNE 10, 2026 — control architecture, shipped.`

Per-row override available via a `datelineVerb:` optional frontmatter field if a writeup needs a non-default verb (e.g., "refactored," "decoupled"). Validator (per spec §11) doesn't enforce the verb shape — Sean's editorial call.

### 1.4 Footer fold

**File:** rendered by `src/components/architecture/FooterFold.astro` (or shared with the transactions footer fold component).

**Locked: keep as spec'd — same as transactions footer fold.**

```
→ subscribe via RSS                  → view the fleet ↗
```

Two affordances, clean. Reopen if/when essays ships and a third `→ read the manifesto` affordance earns the row (matches transactions decision).

### 1.5 OPEN-question resolutions

| OPEN | Resolution | Why |
|---|---|---|
| **OPEN-1** (v1 occupant count) | **1 occupant — Vault Scorecard only.** Vault Knowledge MCP Design + Control Architecture deferred to follow-up sessions. | Matches the "get site up first" preference Sean applied to the transactions ledger. Architecture page renders "1 WRITEUP" at v1 launch; gains second + third when those writeups land (each gets its own lock-doc amendment + Mac Mini apply). Avoids shipping the page with research-pending content (Vault Knowledge MCP per the design spec) or undrafted content (Control Architecture, no doc found via grep). |
| **OPEN-2** (index hook line) | Resolved by §1.1 above — keep Vault-Scorecard-specific hook until 3+ writeups exist | Spec recommended default |
| **OPEN-3** (Mermaid palette completeness) | Ship 5-var override per spec §9.2; observe rendered output during Step 5 of Task 15 build; escalate to mmdc PNG-export only if visual integration fails | Spec recommended default |
| **OPEN-4** (reading-time computation) | Manual for v1 — Sean writes `readingTime: 8` in Vault Scorecard frontmatter. Auto-compute deferred to v2. | Spec recommended default; adds build complexity for low payoff at 1-3 writeup scale |
| **OPEN-5** (honest-note anchor matching across upstream essay edits) | Warning, not error. Build keeps shipping; Sean sees the warning at next build and updates the MDX anchor manually. | Spec recommended default |

---

## Phase 2 — Vault Scorecard frontmatter (LOCKED)

**File:** `src/content/architecture/vault-scorecard.mdx`

**Frontmatter (locked, paste-ready):**

```yaml
---
# --- Identity ---
title: "Vault as Agent Infrastructure"
dateline: "BOSTON, JUNE 3, 2026"
shipped: "2026-06-03"
readingTime: 8

# --- IA + status ---
status: SHIPPED
tags:
  - agent-infrastructure
  - sqlite
  - obsidian
  - linear

# --- Comprehension layer ---
lead: "Three passes, two failures, and the failures are where vault-knowledge-mcp and the Judge Layer are going next."
methods:
  - task: persistent state
    tool: SQLite + git + JSONL
    cost: local / $0
    link: null
  - task: typed edges
    tool: Code Brain (concept_edges)
    cost: Sonnet 4.6 (HybridRouter)
    link: /work/code-brain
  - task: er diagram gen
    tool: scripts/generate_schema.py
    cost: stdlib / $0
    link: null
  - task: fixture author
    tool: Sean + LLM seed
    cost: ~$0.10
    link: null

# --- Canonical sources (fetched at build) ---
essaySourceUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/VAULT_AS_AGENT_INFRASTRUCTURE_EXPLANATION.md

# --- Diagram ---
mermaidSource: diagrams/concept-edges-erd.mmd
mermaidCaption: "concept_edges schema — 6 relation types, validated against 478 production edges."

# --- Scoreboard ---
# Real telemetry from vault/.vault-index.db (2026-05-20T02:01 last_run, per Task 15 Step 0 §1)
scoreboard:
  columns: ["STATE", "VERBS", "OWN", "PERM", "AUDIT"]
  rows:
    - label: "Notion"
      scores: ["✗", "✗", "✓", "✓", "⚠"]
    - label: "Obsidian (default)"
      scores: ["⚠", "⚠", "✗", "✗", "✗"]
    - label: "Linear"
      scores: ["✓", "✓", "✓✓", "✓✓", "✓"]
    - label: "Sean's vault"
      scores: ["✓✓", "✓✓", "⚠", "⚠", "✓✓"]

# --- Honest notes (anchored to section headings) ---
honestNotes:
  - anchor: ownership
    body: "Linear is genuinely better here. That gap is exactly why vault-knowledge-mcp matters — it's the first step toward giving the vault Linear-grade ownership semantics on the axes that matter for agent control."
  - anchor: permissions
    body: "Filesystem permissions only. POSIX read/write + git remotes. Linear's RBAC is the upgrade path; the Judge Layer (Task 12) is the first step toward permissioned action surfaces."

# --- Cross-links ---
relatedLedgerRow: vault-scorecard
relatedCaseStudy: code-brain
relatedEssay: null            # access-vs-meaning manifesto — wire when /essays/ ships
relatedArchitecture: []       # vault-knowledge-mcp added when that writeup lands

# --- Optional editorial ---
sourceRepoUrl: https://github.com/seanwinslow28/code-brain
tryItYourselfUrl: https://github.com/seanwinslow28/code-brain/tree/main/examples/public_vault_fixture
tryItYourselfCommand: |
  git clone https://github.com/seanwinslow28/code-brain
  cp -r code-brain/examples/public_vault_fixture /tmp/test_vault
  AGENT_VAULT_PATH=/tmp/test_vault python3 ./agents-sdk/scripts/query.py \
    "what brewing methods compete with espresso?"
---
```

**MDX body:** empty for v1. The essay renders from the fetched canonical `essaySourceUrl`; the 4Q renders from the fetched canonical `explanationUrl`. No inline prose in the MDX file itself.

### Source-of-truth grounding

Every cell in this frontmatter is grounded in either the spec, the Task 15 Step 0 pre-build prep doc, or live vault telemetry. Specific grounding:

| Field | Source |
|---|---|
| `title`, `dateline`, `shipped`, `readingTime`, `status`, `tags` | Spec Appendix B + Task 15 ship target (2026-06-03) |
| `lead` | Task 15 Step 0 §0 "The bet, in one sentence (carry into interviews)" — verbatim |
| `methods` array | Spec Appendix B + Task 15 Step 0 §3 (the `scripts/generate_schema.py` skeleton) + Task 15 Step 0 §1 (fixture author cost ~$0.10) |
| `essaySourceUrl`, `explanationUrl` | Spec Appendix B (paths confirmed; files don't exist yet — written during Task 15 build window 6/1-6/3 per Task 15 Step 0 frontmatter `build_window`) |
| `mermaidSource`, `mermaidCaption` | Task 15 Step 0 §3 (`scripts/generate_schema.py` emits `docs/diagrams/concept-edges-erd.mmd`) + Task 15 Step 0 §1 telemetry (478 production edges) |
| `scoreboard` columns + rows | Task 15 Step 0 §2 SCORECARD.md draft closing table — verbatim |
| `honestNotes[0]` (ownership) | Task 15 Step 0 §2 (c) Ownership "HONEST NOTE — Linear wins here" — verbatim |
| `honestNotes[1]` (permissions) | Task 15 Step 0 §2 (d) Permissions "HONEST NOTE — Linear wins here too" — paraphrased + extended with Judge Layer (Task 12) framing to match the closing scoreboard's "two failures are the roadmap" thesis |
| `relatedLedgerRow: vault-scorecard` | Cross-link to the paired ledger row — needs to exist in `src/content/transactions/vault-scorecard.md` before `validate_architecture.mjs` passes |
| `tryItYourself*` | Spec Appendix B — verbatim |

**Build-time gotchas:**

- `essaySourceUrl` and `explanationUrl` resolve only after Task 15 Step 8 ships the upstream essays to `code-brain/docs/`. Build script per spec §11.1 logs a warning + leaves committed cache in place on 404; if Sean lands the lock doc apply before the essays ship, the cached files won't exist yet either. **Sequence:** ship upstream essays → voice-review them → apply this lock doc → run portfolio build.
- `relatedLedgerRow: vault-scorecard` requires a corresponding ledger row at `src/content/transactions/vault-scorecard.md`. This row is NOT in the current locked 5-row transactions batch (Phase D, knowledge-loop, intent-engineering-mcp, vault-synthesizer-eval-suite, substack-drafter). **Sean must add a 6th ledger row for Vault Scorecard before the architecture apply** OR set `relatedLedgerRow: null` in the lock until the ledger row exists. Recommend: add the 6th ledger row using the same shape rules as the 5 already locked.

---

## Spec implications (architecture-spec-v1.md)

Apply alongside the Phase 1 + Phase 2 lock content in a single Mac Mini commit.

| Spec section | Currently says | Amend to |
|---|---|---|
| §16 OPEN-1 (Control Architecture surface placement) | Open question | Resolved: defer Vault Knowledge MCP Design + Control Architecture to follow-up lock-doc amendments. V1 ships with Vault Scorecard only. |
| §16 OPEN-2 (index hook line) | Open question | Resolved: keep `Most people see Obsidian as content. I treat my vault as agent infrastructure.` until 3+ writeups exist. |
| §16 OPEN-3 (Mermaid palette completeness) | Open question | Resolved: ship 5-var override; escalate to mmdc PNG-export only if visual integration fails during Step 5 of Task 15. |
| §16 OPEN-4 (reading-time computation) | Open question | Resolved: manual frontmatter for v1; auto-compute deferred to v2. |
| §16 OPEN-5 (honest-note anchor matching) | Open question | Resolved: warning, not error. Build keeps shipping; Sean updates manually. |
| §13 build-time ARCHITECTURE_TOTAL render | "BOSTON, JUNE 3, 2026 — vault scorecard shipped. 1 writeup." | Confirmed shape; lock the count-based template `BOSTON, <date> — <most recent writeup>, <verb>. <N> writeup(s).` |
| §2.2 deep-dive dateline body | Example only (`vault as agent infrastructure, scored.`) | Add §1.3 template + 3-verb default set as canonical: `BOSTON, <date> — <title lowercased>, <past-tense verb>.` with `scored` / `designed` / `shipped` defaults per writeup-shape trigger. |
| §5 deep-dive dateline pattern row | "wire-service mono, project-specific body" (rendering only) | Same + add a pointer: "Body template + 3-verb defaults locked in [`docs/writing-council/architecture-prose-locked-2026-05-27.md`](../writing-council/architecture-prose-locked-2026-05-27.md) §1.3." |

Apply as a single spec-amendment commit on Mac Mini after the lock-doc apply lands. Closes out the 5 OPEN questions and canonicalizes the dateline body template.

---

## Apply-on-Mac-Mini checklist

**⚠️ DO NOT START STEP 1 UNTIL THE VOICE-REVIEW GATE AT THE TOP OF THIS DOC IS GREEN.** Specifically: upstream essay + EXPLANATION + SCORECARD honest notes voice-reviewed via the `writing-voice-modes` skill; Task 15 Step 8 v3.X.X tag landed; ready for public.

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree; should already have transactions lock doc landed)
3. **Add the 6th ledger row first.** Create `src/content/transactions/vault-scorecard.md` using the same shape rules locked in [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md):
   - `surface: fleet` (or `infra` per the transactions spec §12.3 "manual per row" guidance — Sean's call)
   - `status: SHIPPED`
   - `valueProp:` (write per the 6 shape rules — 1-2 sentences, ≤280 chars, lead with the scoreboard primitive)
   - `methods[]:` same shape as architecture row
   - `relatedArchitecture: vault-scorecard` (bidirectional cross-link target)
   - `relatedCaseStudy: code-brain`
   - `explanationUrl:` (same as architecture row — uses the same canonical EXPLANATION)
4. Confirm `src/content/architecture/` directory exists; create empty if not
5. Confirm `src/content/architecture/diagrams/` exists; create empty if not
6. **Architecture frontmatter:** Create `src/content/architecture/vault-scorecard.mdx` with the locked frontmatter per §Phase 2 above. Empty MDX body.
7. **Mermaid source:** copy or symlink `code-brain/docs/diagrams/concept-edges-erd.mmd` (generated by `scripts/generate_schema.py` per Task 15 Step 3) to `src/content/architecture/diagrams/concept-edges-erd.mmd`
8. **Astro components:** ensure all spec Appendix A components exist (`IndexHeader.astro` carrying the locked hook + subhead per §1.1 + §1.2; `WriteupRow.astro`; `ThesisPullQuote.astro`; `Scoreboard.astro`; `HonestNote.astro`; `TryItYourself.astro`; `ErDiagram.astro`; `RelatedBlock.astro`; the deep-dive `[slug].astro` template with the locked dateline body template per §1.3)
9. **Schema:** confirm `src/content/config.ts` declares the `architecture` collection per spec §3. Add the additive `relatedArchitecture: z.union([z.string(), z.array(z.string())]).optional()` field to the `transactions` schema per spec §14.1 if not already present (transactions-spec-v1.md flagged this as a required additive change).
10. **Build scripts:** rename `scripts/fetch_explanations.mjs` → `scripts/fetch_canonical_sources.mjs` per spec §11.1; add `scripts/validate_architecture.mjs` + extend `scripts/derive_crosslinks.mjs` to include the architecture collection.
11. **Mermaid integration:** install `astro-mermaid` + configure the 5-var palette override per spec §9.2.
12. Run `npm run dev` and QA:
    - `/architecture/` renders the locked hook + subhead + 1 writeup row + footer fold
    - `/architecture/vault-scorecard/` renders all 11 bands per spec §2.2: dateline → title → thesis pullquote → essay body (from fetched canonical) → ER diagram → flat scoreboard → 2 HONEST NOTEs (Ownership + Permissions) → Try It Yourself → Methods → 4Q (from fetched canonical) → Related (bidirectional to /transactions/vault-scorecard/ + /work/code-brain/)
    - Mermaid ER diagram renders inline SVG with the 5-var palette
    - Scoreboard renders flat (no row highlights) with custom inline SVG symbols
    - HONEST NOTE callouts render in wire-service mono with stamp-amber prefix + 1px secondary-ink left border
    - `prebuild` scripts all pass (fetch_canonical_sources / validate_architecture / derive_crosslinks)
    - RSS feed at `/architecture/rss.xml` validates
    - View Transition seam: clicking the index row morphs into the deep-dive `<h1>` via `arch-title-vault-scorecard`
    - Cross-link bidirectionality: /transactions/vault-scorecard/ Related block shows "→ read the architectural argument"; /work/code-brain/ Related block shows "→ architectural arguments referencing this project"
13. Commit:
    ```bash
    git add .
    git commit -m "Architecture v1: Vault Scorecard + page chrome (hook, subhead, dateline template) per architecture-prose-locked-2026-05-27"
    ```
14. (Separate spec-amendment commit) Update `docs/specs/architecture-spec-v1.md` §13 + §2.2 + §5 + §16 per "Spec implications" above. Same recommended note format as prior spec amendments.

---

*Authored 2026-05-27 in the brainstorm-ideas-existing skill session on MBP. Companion artifact to [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md), [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) (with second 2026-05-27 amendment), [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md), [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) (with second 2026-05-27 amendment), and [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md). Sean retains voice authority on every locked string above.*
