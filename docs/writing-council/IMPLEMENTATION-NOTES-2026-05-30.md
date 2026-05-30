# Implementation Notes — v1 remediation apply (2026-05-30)

Running log of on-disk-vs-lock surprises encountered during the apply, per IMPLEMENTATION-PROMPT §9. For Sean's post-apply review.

## Baseline

**Baseline `npm run prebuild && npm run build` FAILS** (before any apply edits) — see BLOCKER-1. `npm run prebuild` alone passes (validators + cross-links green). The failure is in the Astro `build` content-sync step.

## BLOCKER-1 — architecture lock #6 breaks every build (committed, commit 1e692cd)

**Symptom:** `npm run build` → `InvalidContentEntryDataError: architecture → essays/vault-scorecard data does not match collection schema` at `src/content/architecture/essays/vault-scorecard.md`.

**Root cause (two independent bugs in committed lock #6):**
1. `src/content/architecture/vault-scorecard.mdx` sets `essaySourceUrl` + `explanationUrl` to GitHub **`/blob/` HTML URLs** (`https://github.com/.../blob/main/docs/VAULT_AS_AGENT_INFRASTRUCTURE.md`), not raw. The fetch returns the GitHub **HTML page**, which gets written into the body-cache.
2. `scripts/fetch_canonical_sources.mjs` writes the `essaySourceUrl` body to `ARCH_ESSAYS_DIR = src/content/architecture/essays/` — which sits **inside the architecture content-collection glob**. Astro loads the frontmatter-less cache file as a (malformed) content entry → schema fail. This triggers on *every* build because npm's `prebuild` lifecycle hook runs the fetch before `build`.

**Why it surfaced now:** architecture is the only collection with non-null canonical URLs (essays uses `sourceUrl: null` / `explanationUrl: null` — the OQ-C inline fallback). The fetch skips null URLs, so only architecture writes a body-cache → only architecture collides. Lock #6 set the URLs non-null, surfacing a latent infra bug.

**Render path is also broken:** `src/pages/architecture/[slug].astro:122` does `<article set:html={essayBodyMarkdown} />` — raw injection of the fetched file. Even with a correct *raw markdown* URL, this injects unprocessed markdown source (no md→html), so the live-fetch body would render broken regardless of the build error.

**The inline body already works + is complete:** `vault-scorecard.mdx` lines 75–89 carry the full authored 4Q scorecard prose. With `essaySourceUrl: null`, the page renders this via `<Content />` (proper Astro markdown→HTML) — the documented OQ-C v1 fallback (`config.ts:104` comment: "both fields nullable for v1; placeholders ship inline-body 4Q + body. When Sean ships upstream EXPLANATION.md, populate both").

**Resolution (pending Sean's call — see chat):** recommended Option B — set the two architecture canonical URLs to `null`, matching essays' proven inline-fallback pattern. Unblocks the build, renders the authored inline body correctly, defers the live-upstream-fetch infra (path relocation + md→html rendering) to v1.1. The committed lock #6 surface content is otherwise untouched.

## NOTE-2 — Stage 1 ceiling check (Task 4) clean; one deferred flag

After Stage 1 (about + 5 case-study openers/4Q/taglines): iPad=3, "Comprehension is the artifact"=2 (+B-4 "Comprehension didn't"=3 total), "Building got cheap"=2, no fixed Code-Brain counts, zero HybridRouter in work openers/4Q/about. transactions+architecture HybridRouter all in `methods:` cost cells (allowed).

**Deferred flag:** `src/content/essays/meaning-over-access.mdx:120` uses "HybridRouter" in PROSE (the 5/24 unreconciled essays body). The IMPLEMENTATION-PROMPT ceiling table allows HybridRouter only in methods[]/transactions/architecture — not essays prose. Resolve during Task 8 (lock #7 reconciliation): confirm whether lock #7's canonical essays text retains HybridRouter in prose (allowed technical-manifesto exception?) or it must go.

## NOTE-3 — Task 5 schema reconciliation: archived_reference_url nullable

Lock #9 §1.4 sets the-block `archived_reference_url` to null (or drops it). On-disk reality: the custom validator (validate_content) REQUIRES the key present when status=ARCHIVED, but Astro's zod schema had `z.string().url().optional()` which rejects `null`. Resolved by making the work-schema field `.nullable().optional()` (config.ts) + keeping `archived_reference_url: null` in the mdx. This matches lock #9's "null = honest shape" intent. Schema-additive, no other surface affected.

## NOTE-4 — Task 7 transactions union (D11) + reconciliation decisions

- **HOLD POINT resolved (Sean): add all 3 union rows; Claude authors inline 4Q.** Upstream verification: vault-synthesizer-eval-suite EXPLANATION → HTTP 200 (but plain `## What is this?` headings don't match the fetch validator's Q1–Q4 token format → warn-and-skip), substack-drafter → 404, knowledge-loop-phase-6 → inline-by-design (lock sets explanationUrl: null). Decision: ALL 3 new rows use inline-body 4Q (explanationUrl null/omitted), rendering via `<Content />` like the existing phase-d row. vault-synth's inline 4Q is grounded verbatim in its live upstream EXPLANATION; knowledge-loop + substack 4Q authored from the locked valueProp/methods/limitations + code-brain facts. **Sean to review the 3 authored inline-4Q bodies post-apply (voice authority).**
- **Final ledger = 8-row curated union (D11):** intent-engineering-mcp, phase-d-typed-edges, vault-knowledge-mcp, vault-scorecard, enterprise-data-readiness-matrix (D9), + knowledge-loop-phase-6, vault-synthesizer-eval-suite, substack-drafter.
- **infra surface** already present in SURFACE_ENUM (config.ts) + FilterPills + [surface] route — no change needed (D9 was already routable).
- **Chrome:** IndexHeader subhead + index.astro meta updated to lock #5 §1.1 "Every shipped artifact, dated and explained."
- **Reconciliation deviation — existing `intent-engineering-mcp` row left as-is:** its on-disk valueProp/methods diverge from lock #5 Row 3 (on-disk is valid Sean-authored 5/24 content with a working inline 4Q body). NOT re-keyed to the lock's explanationUrl form to avoid the fetch-heading-validation + render churn on a row that already renders. Flag for Sean: decide whether to align intent's valueProp to the locked "three tools / 23-25 dogfood" string in a follow-up.
- **Dateline templates (lock §1.2):** these are computed by the Daily Driver agent in the code-brain repo, not portfolio code — out of this repo's scope. Logged for the code-brain session.
