# Essays Surface — Prose Locked Content

**Date:** 2026-05-28
**Status:** LOCKED — Phase 1 index page chrome + Phase 2 meaning-over-access per-essay frontmatter. Ready to apply on Mac Mini AFTER the upstream essay + EXPLANATION ship to `code-brain` main (currently `status: draft-voice-pass-applied` on disk; voice-stable per the 2026-05-21 council pass, but `sourceUrl` + `explanationUrl` resolve only after Sean tags the `draft_lock_target: 2026-05-23` commit and pushes).
**Scope:** The `/essays/` route's prose surfaces — index page chrome (h1, italic hook, sober subhead, metadata strip template, staged footer fold) + full per-essay frontmatter for v1's single occupant, `meaning-over-access`. Out of scope: the essay body itself (lives canonically upstream at [`code-brain/docs/MEANING_OVER_ACCESS.md`](../../../code-brain/docs/MEANING_OVER_ACCESS.md), already voice-passed); future essays beyond the manifesto.
**Authors:** Sean + Claude (Sonnet 4.6), brainstorm session 2026-05-28 (continued from the architecture lock 2026-05-27 on MBP — Workstream D Phase 3 of the writing-council pass).
**Build environment:** MBP (this doc authored on MBP — no MDX edits committed here to avoid Github conflicts; Sean applies on Mac Mini).

---

## ⚠️ Apply order — read before Mac Mini work

This is the third Workstream D lock doc. Apply sequence at Mac Mini-side should be:

1. **Transactions lock** ([`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md)) — apply first; establishes the ledger rows that the essays manifesto references via `plottedArtifacts`.
2. **Architecture lock** ([`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md)) — apply second, AFTER the upstream essay voice-review gate clears (per that doc's gate). Adds Vault Scorecard architecture page.
3. **Essays lock** (this doc) — apply third. Requires: (a) the upstream manifesto + EXPLANATION shipped to `code-brain` main and tagged voice-reviewed; (b) the schema amendment in §3 spec implications applied first (roleMap row shape, Option A); (c) `astro-mermaid` integration installed (architecture lock already installs it — confirm).

If applying the essays lock BEFORE the upstream essay ships: set `status: DRAFT` instead of `PUBLISHED`, and the `prebuild` fetch will warn-on-404 + leave the cached canonical empty until the upstream ships. The page will render the chrome + frontmatter but the body + 4Q will be empty placeholders. Flip to `PUBLISHED` on the actual 6/19 publish day.

---

## TL;DR — what's locked

### Phase 1 — Index page chrome

| Surface | Locked content |
|---|---|
| Index h1 | `Essays` |
| Index 1-line italic hook | `I bet on meaning, not access.` |
| Index sober subhead | `Thesis-shaped writing where the artifacts back the claim.` |
| Index metadata strip | template — `<N> ESSAY · LAST PUBLISHED <date> · RSS →` (build-rendered) |
| Index footer fold (v1, staged) | `→ read on Substack    → view the fleet ↗` (2 affordances; RSS added when `/essays/rss.xml` resolves at 6/19 publish) |

### Phase 2 — meaning-over-access per-essay frontmatter

| Field | Locked value |
|---|---|
| `title` | `"Access Over Meaning"` |
| `subtitle` | `"A bet on the semantic layer."` |
| `dateline` | `"BOSTON, JUNE 19, 2026"` |
| `published` | `"2026-06-19"` |
| `lastRevised` | `null` |
| `readingTime` | `6` (1622 words / ~270wpm) |
| `status` | `PUBLISHED` (at publish day; `DRAFT` if applying before 6/19) |
| `tags` | `["meaning-layer", "agents", "pm-thesis", "agent-infrastructure"]` |
| `excerpt` | E-1: spec-default semantic-layer thesis (188 chars) — full text in §2.2 |
| `sourceUrl` | `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS.md` |
| `explanationUrl` | `https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS_EXPLANATION.md` |
| `mermaidSource` | `diagrams/access-meaning-spectrum.mmd` |
| `mermaidCaption` | M-1: `"fig 1 — seven artifacts on the meaning side; two negative-space callouts on the access side."` |
| `quadrantLegend` | 9 entries (3 resolved artifact slugs, 6 `null`) |
| `roleMap` | 5 rows (Option A schema amendment: jdUrl optional + isNegativeSpace flag) |
| `plottedArtifacts` | 3 resolvers — `intent-engineering-mcp`, `phase-d-typed-edges`, `vault-synthesizer-eval-suite` |
| `relatedLedgerRow` | `null` — backfill when `meaning-over-access` ledger row ships |
| `relatedCaseStudy` | `null` |
| `relatedArchitecture` | `null` — backfill when `vault-scorecard` architecture page ships |
| `relatedEssays` | `[]` |
| `crossPostedTo` | `[{name: "Substack", url: "https://sean.substack.com/p/meaning-over-access"}]` (slug matches portfolio) |
| `sourceRepoUrl` | `https://github.com/seanwinslow28/code-brain` |
| `ogImage` | `/og-cards/essays/meaning-over-access.png` (already authored per CLAUDE.md) |

---

## Carry-forward constraints

1. **The essay body itself lives upstream and was voice-passed 2026-05-21.** The per-essay frontmatter Sean locks here is the portfolio's render-shell around the canonical Markdown. Any future amendment to the upstream essay (Nate URL swap, factual correction, EXPLANATION 4Q edit) flows through automatically via the build-time fetch — no portfolio commit needed. The reverse is also true: any change to the prose CONTENT in `code-brain/docs/MEANING_OVER_ACCESS.md` requires a fresh voice-review pass via `writing-voice-modes` before publish (per the architecture lock's gate, generalized to all upstream essays on the /essays/ surface).
2. **The voice register for the index page is wire-service-mono throughout, with one Newsreader-italic moment** (the hook line). Per essays-spec §5. The italic hook IS the page's only personal-voice surface above the row list — calibrate carefully, ages well only because the manifesto's bet is durable.
3. **The voice register for the deep-dive page** is governed by spec §7's 5-section contract: personal-voice bookends (§1 opener + §5 closer at Sean Mode 80-100%), sober middle three sections (§2 artifact map + §3 role map + §4 anti-thesis at strategic-sober 40-50%). **No visual chrome marks the register switch** — the prose voice change is the only signal. This contract is honored at the upstream level; the portfolio renders whatever the canonical Markdown contains.
4. **Cross-link nulls are intentional v1 limitations.** Four `null` fields (`relatedLedgerRow`, `relatedCaseStudy`, `relatedArchitecture`, and the 6 `null` artifact slugs inside `quadrantLegend`) all represent upstream artifacts that haven't shipped to portfolio surfaces yet. Backfill amendments land as each shipping ledger row + architecture writeup pulls a slug into resolution. **Do NOT populate these fields with placeholder strings** — the validator hard-fails on dangling slugs per spec §14.2. Null is the correct shape until the slug exists.
5. **All carry-forward constraints from prior lock docs still apply.** Particularly the HybridRouter STOP-DOING (not in the essay body; methods-strip rows only), no Code Brain fixed counts, no iPad / no "Comprehension is the artifact" / no "Building got cheap" ceiling violations. The manifesto body honors all of these (audited 2026-05-28 against the 2026-05-21 voice pass).
6. **Schema amendment requirement.** Option A (jdUrl optional + isNegativeSpace flag) must be applied to `essays-spec-v1.md` §3 schema BEFORE this lock's frontmatter validates. See §Spec implications.

---

## Phase 1 — Index page chrome (LOCKED)

### 1.1 Index h1

**File:** rendered by `src/components/essays/IndexHeader.astro` (per spec Appendix A).

**Locked:**

> Essays

Newsreader `clamp(56px, 6vw, 96px)` weight 400, teal `#0A3E42`. Spec default per §5 type system. No editorial work.

### 1.2 Index 1-line italic hook (H-1)

**File:** same component as §1.1; sits between the h1 and the sober subhead.

**Locked:**

> *I bet on meaning, not access.*

Newsreader `clamp(20px, 2.4vw, 32px)` weight 300 italic, ink `#1A1A1E`. The page's only personal-voice (Sean-coded) moment above the row list. First-person identity claim; mirrors the manifesto's bet direction; stages cleanly against the title's reverse-framing ("Access Over Meaning" reads as the world-as-it-is, the hook reads as Sean's bet).

**Resolves spec §17 OPEN-1** with the recommended default. Ages out only when /essays/ surface gains a second thesis-cluster (e.g., comprehension cluster, agent-control cluster). Per spec §17 OPEN-4, that revisit happens at 5+ entries.

**Page-level callbacks honored:** none yet (no other surface uses this exact phrase). H-3 candidate (`Theses get callbacks. Tools get bookmarked.`) reserved as v2 replacement when the surface earns a second occupant.

### 1.3 Index sober subhead

**File:** same component as §1.1.

**Locked:**

> Thesis-shaped writing where the artifacts back the claim.

Newsreader 18/16px weight 300, secondary ink `#546E71`. Sober/declarative. Names the surface's discipline (every claim has a linked artifact behind it). Pairs with the italic hook above by adding the methodology to the claim. **Spec §17 alternative-default** ("ages well" candidate) picked over the per-essay-specific default.

### 1.4 Index metadata strip template

**File:** computed at build time by `src/components/essays/IndexHeader.astro`.

**Locked template:**

```
<N> ESSAY · LAST PUBLISHED <YYYY-MM-DD> · RSS →
```

JetBrains Mono 12px weight 500, tracking 1.6px, secondary ink. `<N>` and `<YYYY-MM-DD>` are computed from the `essays` collection at build. The `RSS →` link's `href` resolves to `/essays/rss.xml` when status is `PUBLISHED` (per §1.5 footer staging — both surface the RSS link simultaneously on publish day).

### 1.5 Index footer fold (v1, STAGED per Option A)

**File:** rendered by `src/components/essays/FooterFold.astro` (or shared with the transactions footer fold component, per the architecture lock convention).

**Locked — v1 launch (architecture goes live first, essays goes live later):**

```
→ read on Substack                    → view the fleet ↗
```

Two affordances. `→ subscribe via RSS` is intentionally omitted from v1 because `/essays/rss.xml` doesn't render until at least one essay carries `status: PUBLISHED`. The metadata strip's `RSS →` link in §1.4 follows the same staging rule.

**v2 — on 6/19 publish day or whenever the manifesto flips to `PUBLISHED`:**

```
→ subscribe via RSS    → read on Substack    → view the fleet ↗
```

Three affordances. Add the RSS link via a one-line component edit; no other surface changes. The metadata strip's `RSS →` resolves at the same moment.

**Resolves spec §17 OPEN-5** by confirming the inline newsletter form omission is intentional + adding the v1-staging pattern as a new locked behavior.

---

## Phase 2 — meaning-over-access frontmatter (LOCKED, paste-ready)

**File:** `src/content/essays/meaning-over-access.mdx`

```yaml
---
# --- Identity ---
title: "Access Over Meaning"
subtitle: "A bet on the semantic layer."
dateline: "BOSTON, JUNE 19, 2026"
published: "2026-06-19"
lastRevised: null
readingTime: 6

# --- IA + status ---
status: PUBLISHED                              # if applying before 6/19, set to DRAFT and flip on publish day
tags:
  - meaning-layer
  - agents
  - pm-thesis
  - agent-infrastructure

# --- Comprehension layer ---
excerpt: "I don't think the durable enterprise value is agents clicking around UIs. I think it's the semantic layer: typed work objects, scoped authority, memory provenance, reviewable decisions."

# --- Canonical sources (fetched at build) ---
sourceUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS.md
explanationUrl: https://raw.githubusercontent.com/seanwinslow28/code-brain/main/docs/MEANING_OVER_ACCESS_EXPLANATION.md

# --- Visual centerpiece ---
mermaidSource: diagrams/access-meaning-spectrum.mmd
mermaidCaption: "fig 1 — seven artifacts on the meaning side; two negative-space callouts on the access side."

# --- Structured chart legend ---
# 9 entries: 7 plotted artifacts + 2 negative-space callouts.
# `artifact:` resolves to a ledger row slug ONLY when the row exists at apply time.
# The 6 currently-null entries get backfilled as each upstream artifact ships its ledger row.
quadrantLegend:
  - key: iemcp
    label: "intent-engineering MCP"
    artifact: intent-engineering-mcp
  - key: vkmcp
    label: "vault-knowledge MCP"
    artifact: null                              # ships ~6/4 — backfill amendment due then
  - key: ce
    label: "concept_edges (Phase D)"
    artifact: phase-d-typed-edges
  - key: evals
    label: "eval suite"
    artifact: vault-synthesizer-eval-suite
  - key: cost
    label: "cost caps (authority primitive)"
    artifact: null                              # not yet a shipped ledger row
  - key: judge
    label: "judge layer"
    artifact: null                              # not yet a shipped ledger row
  - key: fleet
    label: "fleet observability"
    artifact: null                              # not yet a shipped ledger row
  - key: browser
    label: "browser-use / computer-use agents"
    artifact: null                              # negative-space callout (intentional, permanent)
  - key: http
    label: "MCP HTTP transports / SaaS connectors"
    artifact: null                              # negative-space callout (intentional, permanent)

# --- Role map (5 rows — Option A schema amendment required: jdUrl optional + isNegativeSpace flag) ---
roleMap:
  lastValidated: "2026-06-19"
  rows:
    - buyer: "Anthropic FDE (Boston / NYC / Chicago)"
      position: "meaning + workflow"
      vocabularyTell: '"MCP servers, sub-agents, and agent skills"; "control architectures around production agent deployments"'
      jdUrl: "https://job-boards.greenhouse.io/anthropic/jobs/4985877008"
    - buyer: "Glean (Forward Deployed PM)"
      position: "meaning + infrastructure"
      vocabularyTell: '"0-to-1 product creation"; "shipped AI in production"'
      jdUrl: "https://job-boards.greenhouse.io/gleanwork/jobs/4651950005"
    - buyer: "Sierra / Decagon"
      position: "meaning + workflow"
      vocabularyTell: '"PM, Agent Development" (Sierra); "Senior Agent Product Manager" (Decagon); "review and escalation paths"'
      jdUrl: "https://jobs.ashbyhq.com/Sierra/effd7cd2-8a28-4bae-a3b8-40720ba09717"
    - buyer: "Cohere (Agent Harness & Modelling)"
      position: "mixed (meaning + workflow, leaning infrastructure)"
      vocabularyTell: '"agent runtime"; "tool orchestration, parallel execution, failure recovery"'
      jdUrl: "https://jobs.ashbyhq.com/cohere/1d1b300d-254b-48c4-958f-99c6b907f295"
    - buyer: "Manus / Adept / browser-use / OpenAI Operator"
      position: "access + workflow"
      vocabularyTell: '"computer-use"; "browser automation"; "general computer-using agent"'
      jdUrl: null                                # negative-space callout — not on Sean's target list
      isNegativeSpace: true

# --- Cross-link contracts (4 nulls = intentional v1 limitations; backfill on upstream ship) ---
plottedArtifacts:
  - intent-engineering-mcp
  - phase-d-typed-edges
  - vault-synthesizer-eval-suite
relatedLedgerRow: null                          # backfill when /transactions/meaning-over-access/ ships
relatedCaseStudy: null
relatedArchitecture: null                       # backfill when /architecture/vault-scorecard/ ships
relatedEssays: []

# --- Syndication + footer affordances ---
crossPostedTo:
  - name: Substack
    url: https://sean.substack.com/p/meaning-over-access
sourceRepoUrl: https://github.com/seanwinslow28/code-brain

# --- OG ---
ogImage: /og-cards/essays/meaning-over-access.png
---
```

**MDX body:** empty for v1. The essay renders from the fetched canonical `sourceUrl`; the 4Q renders from the fetched canonical `explanationUrl`. No inline prose in the MDX file itself.

---

## Phase 2 — Editorial rationale

### 2.2.1 `excerpt` (E-1) — 188 chars, under the 280 cap

> I don't think the durable enterprise value is agents clicking around UIs. I think it's the semantic layer: typed work objects, scoped authority, memory provenance, reviewable decisions.

**Why this lands:**
- Anchors all four technical primitives the manifesto §2 lists (typed work objects / scoped authority / memory provenance / reviewable decisions) in a single sentence.
- First-person Sean-voice ("I don't think" / "I think it's") — distinguishes from the Nate Jones quote attributed in the manifesto body. The thesis pullquote belongs to Sean; the buyer-archetype validation in the role map belongs to Nate's framing.
- Doubles as meta description for `<head>` rendering — recruiter Google-result preview gets the lane named in the first 80 chars.
- 188 chars fits Newsreader 24px italic at max-width 680px in 2 lines on desktop, 3 on mobile. Visual rhythm tested against the spec's anatomy diagram.

**Carry-forward:** spec §3.2 schema cap `z.string().max(280)` enforced per Sean's audit answer #4. Validator should hard-fail any future essay's excerpt that exceeds 280; no warning-only fallback.

### 2.2.2 `subtitle` (S-1) — spec default

> A bet on the semantic layer.

**Why this lands:**
- Newsreader `clamp(20px, 2.2vw, 28px)` weight 300 italic, secondary ink `#546E71`. Compresses the manifesto's thesis into 5 words without echoing the title's word order ("Access Over Meaning" → "A bet on the semantic layer" — different lexicon, same argument).
- "Semantic layer" is the durable technical noun that ages best across the manifesto's lifetime; "meaning" is the everyday English word the page argues for; the subtitle uses the technical version so the visitor scanning subtitle-only gets the precise frame.

### 2.2.3 `mermaidCaption` (M-1) — count-corrected to 7

> fig 1 — seven artifacts on the meaning side; two negative-space callouts on the access side.

**Why this lands:**
- Sober wire-service convention for figure captions (JetBrains Mono 12px secondary ink). Matches the architecture lock's caption shape (`"concept_edges schema — 6 relation types, validated against 478 production edges."`).
- Spec §8.3 default text said "five artifacts on the meaning side" — wrong count, carried over from an earlier brainstorm pass. M-1 corrects to seven per the manifesto's actual quadrantChart source (§2 Mermaid block: intent-engineering MCP, vault-knowledge MCP, concept_edges Phase D, eval suite, cost caps, judge layer, fleet observability = 7).
- The semicolon-break between "meaning side" and "two negative-space callouts" preserves the spec's rhythm without adding a closer flourish.

**Spec amendment:** §8.3 caption example count `5` → `7`. Companion edit lands in the spec-amendment commit.

### 2.2.4 `tags` (4 tags)

- `meaning-layer` — primary thesis keyword
- `agents` — surface taxonomy (broad)
- `pm-thesis` — content-type marker (per spec Appendix B example)
- `agent-infrastructure` — durable secondary keyword that ages well across the manifesto's lifetime (matches the architecture lock's tag set)

Spec §3 enforces `.min(2).max(6)` — four is comfortable in the range. No `semantic-layer` tag added because it would double with `meaning-layer` (same concept, different lexicon).

### 2.2.5 `quadrantLegend` — 9 entries, 3 resolved, 6 null

The 9-entry structure mirrors the manifesto §2's quadrantChart source exactly: 7 plotted artifacts + 2 negative-space callouts.

**Three resolved at v1:**
- `intent-engineering-mcp` → ledger row exists (transactions lock row 3)
- `phase-d-typed-edges` → ledger row exists (transactions lock row 1); manifesto calls it "concept_edges (Phase D)" per the label
- `vault-synthesizer-eval-suite` → ledger row exists (transactions lock row 4); manifesto calls it "eval suite" per the label

**Six null at v1:**
- `vault-knowledge MCP` → ships ~6/4 per the architecture lock's Vault Knowledge MCP deferral; backfill amendment when the ledger row lands
- `cost caps` → no ledger row yet; backfill when shipped
- `judge layer` → no ledger row yet; backfill when shipped
- `fleet observability` → no ledger row yet; backfill when shipped
- `browser-use agents` → negative-space callout, permanently null (not a Sean artifact)
- `MCP HTTP transports` → negative-space callout, permanently null

**Schema-correctness:** spec §10.1 already supports `artifact: null` for negative-space callouts. This lock extends the pattern to "not-yet-resolved" artifacts. The validator (per spec §14.2) should treat `null` the same regardless of intent — no hard-fail on null. Confirm `derive_crosslinks.mjs` skips null entries cleanly during reverse-derivation.

### 2.2.6 `roleMap` — 5 rows, Option A schema amendment required

The manifesto §3 cites 5 buyer archetypes with verbatim JD URLs. Four are target-list buyers with cited URLs; the fifth (Manus / Adept / browser-use / OpenAI Operator) is a "negative-space callout — not on Sean's target list" with no JD URL.

The current spec §3 schema declares `jdUrl: z.string().url()` — required, non-null. Two clean fixes were brainstormed; **Option A** locked:

```ts
// AMEND essays-spec-v1.md §3:
rows: z.array(z.object({
  buyer: z.string(),
  position: z.string(),
  vocabularyTell: z.string(),
  jdUrl: z.string().url().optional(),          // was required; now optional
  isNegativeSpace: z.boolean().optional(),     // NEW — marks "this is the contrast row"
}))
```

**Render behavior for negative-space rows:**
- Row renders in the same table, but in italic + secondary ink to mark the contrast
- JD column shows an em-dash `—` instead of the `↗` link glyph
- The `last validated` mono badge logic ignores negative-space rows (no URL to HEAD-check)

The validator (per spec §9.2) should skip the HEAD-check on rows where `isNegativeSpace: true` OR `jdUrl == null` — no warning logged for either.

**Sierra/Decagon row note:** manifesto cites two URLs (one for Sierra, one for Decagon). The structured `jdUrl` field holds Sierra's (first-cited); Decagon's reference moves into the `vocabularyTell` string. This is a minor editorial loss (the reader doesn't get the Decagon URL clickable from the structured table) but avoids a second schema amendment for multi-URL support. Acceptable trade.

### 2.2.7 Cross-link `null`s — backfill schedule

Four `null` fields are all "ships when the upstream artifact ships."

| Field | Backfills when | Backfill amendment |
|---|---|---|
| `relatedLedgerRow: null` | `src/content/transactions/meaning-over-access.md` ledger row ships (Sean authors per the transactions lock's row-shape rules) | Set to `meaning-over-access`; bidirectional reverse-link auto-renders on the ledger row |
| `relatedCaseStudy: null` | Never — the manifesto thesis doesn't cite a single case-study; it's cross-cutting across all five case studies. Stays `null` permanently. | — |
| `relatedArchitecture: null` | `/architecture/vault-scorecard/` ships (post-6/3, post-voice-review per the architecture lock) | Set to `["vault-scorecard"]`; bidirectional reverse-link auto-renders on the architecture writeup |
| `quadrantLegend.*.artifact: null` (6 entries) | Each upstream artifact's ledger row ships individually | Per-entry backfill amendment per slug; 4 backfills total for non-negative-space rows (vault-knowledge-mcp, cost caps, judge layer, fleet observability); 2 stay null permanently (browser-use, MCP HTTP transports) |

**Reverse-derivation behavior** (per spec §10.3 + §14.1): `scripts/derive_crosslinks.mjs` reads `plottedArtifacts: [...]` and reverse-renders "← named in: Access Over Meaning (essay)" on each cited artifact's `/transactions/<slug>/` + `/architecture/<slug>/` (when both exist). At v1, three reverse-renders fire: on the intent-engineering-mcp, phase-d-typed-edges, and vault-synthesizer-eval-suite ledger rows. The Methods strip on each ledger row gains a new line in the Related block.

### 2.2.8 `crossPostedTo` URL slug

`https://sean.substack.com/p/meaning-over-access` — matches the portfolio's URL slug for consistency. The Substack draft file at `code-brain/vault/.../substack-drafts/2026-06-19-meaning-over-access-substack-cross.md` uses the same slug; Sean publishes to that URL on Substack on 6/19.

**Title-vs-slug note:** the page `<title>` displays "Access Over Meaning" (matches the manifesto's frontmatter title); the URL slug is `meaning-over-access` (matches the portfolio's locked slug + the EXPLANATION.md's deployment path + CLAUDE.md's OG-cards entry). This is a deliberate title-slug split: the title carries the rhetorical move (the ironic framing of the world-as-it-is), the slug carries the searchable thesis (the bet).

---

## Spec implications (essays-spec-v1.md)

Apply alongside the Phase 1 + Phase 2 lock content in a single Mac Mini commit (or split into a separate spec-amendment commit, matching prior amendments' pattern).

| Spec section | Currently says | Amend to |
|---|---|---|
| §3 schema — `roleMap.rows` shape | `jdUrl: z.string().url()` (required) | `jdUrl: z.string().url().optional()` + new field `isNegativeSpace: z.boolean().optional()` per Option A (§2.2.6) |
| §9.1 roleMap example | 5 rows, all with `jdUrl` | Same 5 rows, last row drops `jdUrl` + adds `isNegativeSpace: true` |
| §9.2 validation behavior | HEAD-checks every `jdUrl` at build | Same + add: "Rows with `isNegativeSpace: true` OR `jdUrl == null` skip the HEAD-check; no warning logged." |
| §9.3 render component `<RoleMap />` | 4-column table (Buyer / Spectrum position / Vocabulary tell / JD ↗) | Same + add: "Rows with `isNegativeSpace: true` render in italic + secondary ink (matches the negative-space callout register); JD column shows `—` instead of `↗` link." |
| §8.3 mermaidCaption example | `"fig 1 — five artifacts on the meaning side; two negative-space callouts on the access side"` | `"fig 1 — seven artifacts on the meaning side; two negative-space callouts on the access side."` (count-correction per manifesto's actual chart) |
| §17 OPEN-1 (index page hook) | Open question — proposed `"I bet on meaning, not access."` | Resolved: locked `I bet on meaning, not access.` per §1.2 of this doc. Ages out at 5+ essay entries per OPEN-4. |
| §17 OPEN-3 (`plottedArtifacts` locked-at-draft-time) | Open question | Resolved: locked at publish-time per spec recommendation; the §2.2.7 backfill schedule documents the v1→vN amendment pattern for entries that become resolvable post-publish. |
| §17 OPEN-5 (newsletter-form omission) | Open question | Resolved: confirmed intentional. Also confirmed: footer Subscribe affordances stage with the surface — v1 launches with `→ read on Substack` + `→ view the fleet ↗` only; `→ subscribe via RSS` adds on publish day per §1.5. |
| §2.1 index anatomy ASCII | shows 3 footer affordances | Add a v1/v2 footer-fold staging note pointing at this lock's §1.5. |
| §10 plotted-artifacts section behavior | Wire-service mono unordered list per spec §10.1 | Same + add: "When a slug in `plottedArtifacts` resolves to no ledger row + no architecture writeup, the render skips the slug silently rather than rendering a broken link. The legend's `artifact: null` pattern (§8.4) is the canonical representation for these cases until the upstream artifact ships." |

Apply as a single spec-amendment commit on Mac Mini after the lock-doc apply lands. Closes out OPEN-1, OPEN-3, OPEN-5 + adds the roleMap schema amendment + corrects the mermaidCaption count + documents the footer staging pattern.

---

## Apply-on-Mac-Mini checklist

**Sequence preconditions** (per §"Apply order" at the top of this doc):

- Transactions lock applied (5 ledger rows live)
- Architecture lock applied (Vault Scorecard live; 6th ledger row `vault-scorecard` authored)
- Upstream manifesto + EXPLANATION shipped to `code-brain` main branch; both files voice-reviewed; the `draft_lock_target: 2026-05-23` commit tagged
- `astro-mermaid` integration installed (from the architecture lock's apply work)

If applying BEFORE the upstream essay ships: set `status: DRAFT` in step 5 and flip to `PUBLISHED` on 6/19.

1. `cd /Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio`
2. `git pull` (confirm clean working tree)
3. **Schema amendment FIRST.** Open `src/content/config.ts`. In the `essaysCollection` definition's `roleMap.rows` Zod object:
   - Change `jdUrl: z.string().url()` → `jdUrl: z.string().url().optional()`
   - Add `isNegativeSpace: z.boolean().optional()` to the row object
   - Save + run `npm run build` to confirm the type-checker accepts the amendment before any content commits
4. Confirm `src/content/essays/` directory exists; create empty if not. Same for `src/content/essays/diagrams/`.
5. **Create the manifesto MDX.** `src/content/essays/meaning-over-access.mdx` — paste the locked frontmatter from §Phase 2 above. Empty MDX body.
6. **Create the Mermaid source.** `src/content/essays/diagrams/access-meaning-spectrum.mmd` — copy from the manifesto §2 quadrantChart block (lines 57-75 of `code-brain/docs/MEANING_OVER_ACCESS.md`):
   ```mermaid
   quadrantChart
     title Access vs Meaning × Infrastructure vs Workflow
     x-axis Access --> Meaning
     y-axis Workflow --> Infrastructure
     quadrant-1 Meaning + Infrastructure
     quadrant-2 Access + Infrastructure
     quadrant-3 Access + Workflow
     quadrant-4 Meaning + Workflow
     intent-engineering MCP: [0.80, 0.85]
     vault-knowledge MCP: [0.82, 0.80]
     concept_edges (Phase D): [0.75, 0.90]
     eval suite: [0.78, 0.30]
     cost caps (authority primitive): [0.70, 0.25]
     judge layer: [0.85, 0.20]
     fleet observability: [0.72, 0.35]
     browser-use agents: [0.15, 0.20]
     MCP HTTP transports: [0.25, 0.75]
   ```
7. **Astro components.** Ensure all spec Appendix A components exist (`IndexHeader.astro` carrying the locked h1 + italic hook + sober subhead + metadata strip per §1.1-§1.4; `EssayRow.astro`; `ThesisPullQuote.astro`; `EssayBody.astro`; `QuadrantChart.astro`; `QuadrantLegend.astro`; `RoleMap.astro` with the negative-space row render behavior per spec amendment §9.3; `PublishedRevisedStrip.astro`; `PlottedArtifacts.astro`; `FootLinks.astro`; `FooterFold.astro` with v1/v2 staging logic per §1.5).
8. **Build scripts.**
   - Confirm `scripts/fetch_canonical_sources.mjs` extended a 4th time to walk the `essays` collection (fetches `sourceUrl` + `explanationUrl` per essay MDX with ETag caching)
   - Confirm `scripts/validate_content.mjs` (unified validator) dispatches the essays validation rules — JD URL HEAD checks (per amendment §9.2 — skips negative-space rows), `roleMap.lastValidated` staleness check, schema-amendment validation
   - Confirm `scripts/derive_crosslinks.mjs` extended a 4th time for `plottedArtifacts` reverse-derivation; null entries skip cleanly per §2.2.7
9. **`/essays/rss.xml`** endpoint at `src/pages/essays/rss.xml.ts` per spec §12. RSS link in `<head>` BaseLayout per spec §12.3.
10. **OG card.** Confirm `/public/og-cards/essays/meaning-over-access.png` exists (already authored per CLAUDE.md §"Current status" — moves from `reference-images/og-cards/` to `/public/` at Phase 2 scaffold).
11. Run `npm run dev` and QA:
    - `/essays/` index renders: h1 `Essays` + italic hook `I bet on meaning, not access.` + sober subhead + metadata strip `1 ESSAY · LAST PUBLISHED 2026-06-19 · RSS →` + 1 essay row + footer fold v2 (3 affordances) if `status: PUBLISHED` OR v1 (2 affordances) if `status: DRAFT`
    - `/essays/meaning-over-access/` deep-dive renders all 12 bands per spec §2.2: dateline → title block → published/revised strip → thesis pullquote (E-1) → essay body (from fetched canonical) → quadrantChart inline (with M-1 caption) → quadrant legend table (9 rows, linked slugs for 3) → role map table (5 rows, italic row for Manus) → plotted-artifacts section (3 links) → 4Q block (from fetched canonical) → 3 foot-of-page links → Related (empty in v1) → Next/Prev (empty) → registration mark
    - The voice contract is honored at the body level (the upstream essay is voice-stable)
    - Mermaid `quadrantChart` renders inline SVG with the 5-var palette override (shared with /architecture/)
    - View Transition: clicking the index row morphs into the deep-dive `<h1>` via shared `essay-title-meaning-over-access`
    - Cross-link bidirectionality: each of the 3 resolved `plottedArtifacts` ledger rows shows "← named in: Access Over Meaning (essay)" in Related block
    - RSS feed at `/essays/rss.xml` validates against RSS 2.0; full essay content in `content:encoded`
    - Reduced motion + dark mode confirmations: spec §14 + site-chrome §8 deviation (dark mode removed entirely — confirm no `data-theme="dark"` references creep into essays components)
    - Lighthouse: Performance ≥85 on deep-dive (Mermaid chart heavier per spec §17 budget); Accessibility ≥95; Best Practices = 100
12. Commit:
    ```bash
    git add .
    git commit -m "Essays v1: meaning-over-access manifesto + index chrome (hook, subhead, staged footer) + roleMap schema amendment per essays-prose-locked-2026-05-28"
    ```
13. **Separate spec-amendment commit.** Update `docs/specs/essays-spec-v1.md` per §"Spec implications" above:
    ```bash
    git add docs/specs/essays-spec-v1.md
    git commit -m "Essays spec v1.1: schema amendment (roleMap row jdUrl optional + isNegativeSpace flag), mermaidCaption count correction, OPEN-1/3/5 resolutions, footer-staging pattern documented"
    ```
14. **Optional follow-up (separate session, low priority per Sean's 2026-05-28 audit answer #1):** Draft the 6th ledger row `src/content/transactions/meaning-over-access.md` paired with the manifesto. Sean's call whether to do this session if time allows, or defer to a future session alongside the architecture apply. Uses the same row-shape rules locked in the transactions lock doc §1.5.
15. **Backfill amendments queued for future sessions:**
    - When `meaning-over-access` ledger row ships → set `relatedLedgerRow: meaning-over-access`
    - When `vault-scorecard` architecture page ships → set `relatedArchitecture: ["vault-scorecard"]`
    - When each of `vault-knowledge-mcp`, `cost caps`, `judge layer`, `fleet observability` ledger rows ship → set `quadrantLegend.<key>.artifact: <slug>` per row
    - Each backfill is a 1-2 line MDX edit + a new amendment section in this lock doc

When all 12 + step 13 are green, /essays/ v1 is locked and the surface goes live on the manifesto's publish day (2026-06-19).

---

## Source-of-truth files used in this lock

For future sessions writing about the meaning-over-access manifesto:

| File | Role |
|---|---|
| `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS.md` | Canonical manifesto body — 1622 words, voice-stable per the 2026-05-21 council pass. Page title = "Access Over Meaning" per frontmatter. |
| `/Users/seanwinslow/Code-Brain/code-brain/docs/MEANING_OVER_ACCESS_EXPLANATION.md` | Canonical 4Q EXPLANATION — 4-question template per Nate B Jones / ADR convention. Reads cold in <90 seconds. |
| `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/substack-drafts/2026-06-19-meaning-over-access-substack-cross.md` | Substack cross-post draft — useful for voice tone calibration on future essays. |
| `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-06-unified-roadmap.md` | Unified roadmap — context for what Sean's building toward (matches the manifesto's bet); useful framing reference for future essay topics, NOT a source-of-truth for the manifesto's specific claims. |
| `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-20-task-13-step-1-manifesto-outline.md` | Manifesto outline (Step 1 of Task 13) — useful reference for understanding the manifesto's structural intent. |
| `/Users/seanwinslow/Code-Brain/code-brain/vault/20_projects/prj-job-hunt-2026/onwards-and-upwards-5-4-26/job-hunt-2026-roadmap/2026-05-21-task-13-step-2-council-draft.md` | Council critique pass (Step 2) — voice-pass rationale for the 4 edits applied 2026-05-21. |

---

## Companion lock docs

This lock continues the Workstream D writing-council pass. Read in sequence:

1. [`about-b1-b2-b4-locked-2026-05-25.md`](about-b1-b2-b4-locked-2026-05-25.md) — About B-1/B-2/B-4 prose
2. [`case-study-openers-locked-2026-05-26.md`](case-study-openers-locked-2026-05-26.md) — 5 case-study openers (with 2 amendments)
3. [`project-taglines-locked-2026-05-26.md`](project-taglines-locked-2026-05-26.md) — 4 project taglines
4. [`project-four-q-locked-2026-05-27.md`](project-four-q-locked-2026-05-27.md) — 3 case-study 4Q blocks (with 1 amendment)
5. [`transactions-prose-locked-2026-05-27.md`](transactions-prose-locked-2026-05-27.md) — Transactions ledger v1 (5 rows + page chrome)
6. [`architecture-prose-locked-2026-05-27.md`](architecture-prose-locked-2026-05-27.md) — Architecture surface v1 (Vault Scorecard + page chrome)
7. **This doc** — Essays surface v1 (meaning-over-access + page chrome)
8. *(next session)* Site chrome v1 + dark-mode wipe + footer staging — completes Workstream D

All carry-forward constraints accumulate across the seven lock docs. Sean retains voice authority on every locked string above.

---

*Authored 2026-05-28 in the brainstorm-ideas-existing skill session on MBP. Sean retains voice authority on every locked string above.*
