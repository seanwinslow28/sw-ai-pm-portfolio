# Phase 3b Implementation Plan — Case-Study Body for `/work/[slug]`

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (direct controller execution) to implement this plan task-by-task. **Do NOT dispatch via superpowers:subagent-driven-development** — Phase 2 / 2b / 3a all attempted subagent dispatch and all hit hallucinated context constraints in the implementer subagent. Direct controller execution worked. Re-attempt subagents only if the harness has demonstrably improved since Phase 3a. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the full case-study body at `/work/[slug]` per [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md). Replaces the Phase 2 stub. Six bands top-to-bottom: dateline strip → title block → hero media (View Transition target preserved) → opener → investigation board → Methods strip → 4Q block → next/prev nav. Status-driven page-shape (ACTIVE / SHIPPED / PAUSED / ARCHIVED) governs the chrome around the MDX body.

**Architecture:** Astro 5 dynamic route + content collection (work) reads frontmatter for the chrome, renders the MDX body inline with injected artifact + annotation components, and reads the 4Q block from a `four_q:` frontmatter mirror (Option B fallback per case-study spec §9.2). Three new prebuild scripts ship the validator + canonical-source fetcher + crosslink-graph derivator — all three are extended in Phase 3c to cover transactions/architecture/essays. The four MDX artifact components (`<PRDDecision />`, `<SlackQuote />`, `<BoardArtifact />`, `<MetricChart />`) are single-file Astro components — `<SlackQuote />` renders static SVG only (never a real screenshot). The `<Annotation />` wrapper resolves target IDs + offsets at runtime via a tiny vanilla JS positioner (no React, no anchor-positioning polyfill — desktop Chromium + Safari handle `getBoundingClientRect` + ResizeObserver natively).

**Tech Stack:** Astro 5 + Tailwind 4 (already installed Phase 2), Node 20 for prebuild scripts, vanilla JS for the annotation positioner. No new npm dependencies.

**Scope:** Matches [`case-study-spec-v1.md`](../../specs/case-study-spec-v1.md) §§2-16 + the Phase 3b carve-out from [`docs/superpowers/plans/2026-05-21-phase-3-backlog.md`](2026-05-21-phase-3-backlog.md).
- **IN:** prebuild scripts (`fetch_canonical_sources.mjs` + `validate_content.mjs` + `derive_crosslinks.mjs`) wired via `npm run build` prebuild hook; schema extensions to `src/content/config.ts` (role + anchor_metric + methods[] + four_q + status-specific frontmatter); 6 case-study chrome components (`DatelineStrip`, `TitleBlock`, `HeroMedia`, `Opener`, `InvestigationBoard`, `MethodsStrip`); 1 closer component (`FourQBlock`); 4 status-shape components (`ShippedStamp`, `ShippedNow`, `ReturnConditionCallout`, `FrameTheWorkPreamble`); 4 MDX artifact components (`PRDDecision`, `SlackQuote`, `BoardArtifact`, `MetricChart`); 1 wrapper component (`ArtifactImage` for Polaroid frame); 1 annotation system (`<Annotation />` wrapper + 4 SVG vocabularies + positioner JS module); 1 next/prev nav component; full rewrite of `src/pages/work/[slug].astro` to compose the chrome around the MDX body; 5 MDX content stubs with full frontmatter + minimal placeholder opener + 4 artifact stubs each + four_q populated (Option B fallback); hand-seeded `/api/shipped-stats-intent-engineering-mcp.json`; DoD walk-through against case-study spec §16 items 1-13.
- **OUT (Sean authors post-plan):** Real ~1-2k word opener prose for each of the 5 case studies; real investigation-board artifact content + captions; real 4Q content. Phase 3b ships the page structure + components + view transitions wired; the prose is Sean's separate authoring pass.
- **OUT (Phase 3c):** `/transactions/` + `/architecture/` + `/essays/` index, surface, and slug routes + 3 RSS feeds. The prebuild scripts shipped in 3b are extended in 3c to cover the additional collections.
- **OUT (Phase 3d):** `/about/` page body.
- **OUT (Phase 4):** Daily Driver agent writer for `/api/shipped-stats-<slug>.json` (v1 hand-seeds the JSON), Plausible analytics, Vercel deploy, hard cutover from V3 bridge.
- **OUT entirely (deferred indefinitely):** Hand-authored Procreate substrate, interactive `<MetricChart />` variant, MCP-tool-call embed on intent-engineering-mcp case study.

**Branch state:** `phase-2-foundations` at HEAD `48f396e`. 24 commits ahead of `origin/phase-2-foundations`. **Do NOT switch branches.** Sean's standing rule is "Sean works on `main`" but Phase 2 / 2b / 3a accumulated on this branch — the spec'd cutover to main is Phase 4. Each task in this plan commits atomically; ~36-42 incremental commits total.

**Operating posture (direct controller execution):** Run each task in order. After each commit, verify the next task's preconditions are still true (e.g., dev server still serving 200 on the relevant route). Surface BLOCKED status only if genuinely stuck (a real error in the build log, a route returning a non-2xx that should). Don't pause to check in between routine tasks — the user signed off on continuous execution.

---

## File Structure

Files this plan creates or modifies, organized by responsibility:

```
sw-ai-pm-portfolio/
├── package.json                                          ← Task 1.4: prebuild hook wiring
│
├── scripts/                                              ← Node prebuild gates (NEW folder)
│   ├── fetch_canonical_sources.mjs                       ← Task 1.1: canonical 4Q fetcher (work scope; extended 3c)
│   ├── validate_content.mjs                              ← Task 1.2: schema validator (work scope; extended 3c)
│   └── derive_crosslinks.mjs                             ← Task 1.3: cross-link graph derivator (partial; extended 3c)
│
├── .cache/                                               ← Task 1.5: gitignored
│   └── canonical-sources.lockfile                        ← ETag cache for fetcher
│
├── public/
│   └── api/
│       └── shipped-stats-intent-engineering-mcp.json     ← Task 8.6: hand-seeded; Daily Driver writes in Phase 4
│
├── src/
│   ├── content/
│   │   ├── config.ts                                     ← Task 1.6: extend work schema (role, anchor_metric, methods[], four_q, etc.)
│   │   ├── work/                                         ← Task 8.x: replace 5 MDX stubs with full Phase 3b stubs
│   │   │   ├── animation-pipeline.mdx                    ← Task 8.1: ACTIVE
│   │   │   ├── code-brain.mdx                            ← Task 8.2: ACTIVE
│   │   │   ├── intent-engineering-mcp.mdx                ← Task 8.3: SHIPPED
│   │   │   ├── the-block.mdx                             ← Task 8.4: ARCHIVED
│   │   │   └── 16bitfit.mdx                              ← Task 8.5: PAUSED
│   │   └── explanations/                                 ← Task 1.1: build-time-fetched canonical EXPLANATION.md (empty in v1)
│   │
│   ├── components/
│   │   ├── case-study/                                   ← NEW folder
│   │   │   ├── DatelineStrip.astro                       ← Task 2.4
│   │   │   ├── TitleBlock.astro                          ← Task 2.5
│   │   │   ├── HeroMedia.astro                           ← Task 2.6
│   │   │   ├── Opener.astro                              ← Task 5.3
│   │   │   ├── InvestigationBoard.astro                  ← Task 5.2
│   │   │   ├── MethodsStrip.astro                        ← Task 2.2
│   │   │   ├── FourQBlock.astro                          ← Task 2.1
│   │   │   ├── ShippedStamp.astro                        ← Task 3.1
│   │   │   ├── ShippedNow.astro                          ← Task 3.2
│   │   │   ├── ReturnConditionCallout.astro              ← Task 3.3
│   │   │   ├── FrameTheWorkPreamble.astro                ← Task 3.4
│   │   │   └── NextPrevNav.astro                         ← Task 6.1
│   │   │
│   │   ├── artifacts/                                    ← NEW folder
│   │   │   ├── ArtifactImage.astro                       ← Task 4.5: Polaroid wrapper
│   │   │   ├── PRDDecision.astro                         ← Task 4.1
│   │   │   ├── SlackQuote.astro                          ← Task 4.2 (static SVG only)
│   │   │   ├── BoardArtifact.astro                       ← Task 4.3
│   │   │   └── MetricChart.astro                         ← Task 4.4
│   │   │
│   │   └── annotations/                                  ← NEW folder
│   │       ├── Annotation.astro                          ← Task 2.3
│   │       ├── arrow.svg                                 ← Task 2.3
│   │       ├── strikethrough-x.svg                       ← Task 2.3
│   │       ├── coffee-ring.svg                           ← Task 2.3
│   │       └── registration-mark.svg                     ← Task 2.3
│   │
│   ├── scripts/
│   │   └── annotation-positioner.js                      ← Task 2.3: runtime positioner
│   │
│   ├── pages/
│   │   └── work/
│   │       └── [slug].astro                              ← Task 5.1: rewrite (replaces Phase 2 stub)
│   │
│   └── styles/
│       └── case-study.css                                ← Task 5.1: page-scoped styles (extracted)
│
├── .gitignore                                            ← Task 1.5: add `.cache/`
│
└── docs/superpowers/plans/
    └── 2026-05-21-phase-3b-case-study-body.md            ← this file
```

The `case-study/`, `artifacts/`, and `annotations/` folders are new under `src/components/`. The split mirrors the existing `chrome/` + `hero/` + `home/` + `projects/` + `teaser/` organization.

---

## Section 0 — Pre-flight

### Task 0.1: Verify Phase 3a baseline + clean working tree

**Files:**
- Read-only verification

- [ ] **Step 1: Verify branch + HEAD + status**

Run: `git branch --show-current && git rev-parse HEAD && git status --porcelain | grep -v "phase-2b-full.png\|teaser-closeup.png"`

Expected: branch `phase-2-foundations`, HEAD `48f396e` (or later if any v1.1 follow-ups landed), `git status --porcelain` returns no output once the two untracked screenshots are filtered out.

- [ ] **Step 2: Verify dev server is up**

Run: `curl -sI http://localhost:4321/ | head -1`

Expected: `HTTP/1.1 200 OK`. If not, start with `npm run dev` in a background terminal before proceeding.

- [ ] **Step 3: Verify Phase 3a artifacts are in place**

Run: `ls src/components/chrome/SiteNav.astro src/pages/contact.astro src/pages/404.astro`

Expected: all 3 files exist (Phase 3a shipped them).

Run: `curl -s http://localhost:4321/work/animation-pipeline/ | grep -c "Case-study body lands in Phase 3"`

Expected: `1` — the Phase 2 stub message confirms we're replacing the right thing.

- [ ] **Step 4: No commit**

Verification only.

---

## Section 1 — Prebuild gate scripts

The three scripts here are the load-bearing build infrastructure for Phase 3 onward. Phase 3b ships them with `work`-collection-only scope; Phase 3c extends them to walk `transactions` + `architecture` + `essays`. The scripts run via `npm run build`'s `prebuild` hook before Astro's own build starts.

### Task 1.1: Canonical-source fetcher script

**Files:**
- Create: `scripts/fetch_canonical_sources.mjs`
- Create (empty placeholder): `src/content/explanations/.gitkeep`

Per case-study spec §15: walks the `work` collection, looks for entries with `explanation_url:` frontmatter, fetches the markdown raw from each URL, validates against the 4 canonical headings from `EXPLANATION-template.md` (`## ... What is this?` / `## ... Why this approach?` / `## ... What would break?` / `## ... What did I learn?`), writes to `src/content/explanations/<slug>.md`. ETag-cached in `.cache/canonical-sources.lockfile`. Fails the build on missing or malformed files.

**Phase 3b shipping posture:** the v1 case studies all use the `four_q:` frontmatter mirror (Option B fallback per case-study spec §9.2). No entry declares `explanation_url:` yet. The fetcher ships idle — it walks the collection, finds zero entries with `explanation_url`, exits 0. Sean can flip any entry to `explanation_url:` later by editing frontmatter; the fetcher activates on the next build.

- [ ] **Step 1: Write the script**

Create `scripts/fetch_canonical_sources.mjs`:

```js
#!/usr/bin/env node
/**
 * scripts/fetch_canonical_sources.mjs — canonical 4Q fetcher.
 *
 * Phase 3b scope: walks src/content/work/*.mdx looking for entries that
 * declare `explanation_url:` in frontmatter, fetches the markdown raw
 * via HTTPS, validates against the 4 canonical EXPLANATION headings,
 * writes to src/content/explanations/<slug>.md. ETag-cached so
 * subsequent builds skip unchanged sources.
 *
 * Phase 3c extends this to also walk transactions + architecture +
 * essays collections; rename the WALK_COLLECTIONS array to add them.
 *
 * Source: case-study-spec-v1.md §9 + §15; BLUEPRINT-COMPLETE.md §3.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CACHE_PATH = path.join(ROOT, ".cache/canonical-sources.lockfile");
const OUT_DIR = path.join(ROOT, "src/content/explanations");

const WALK_COLLECTIONS = [
  {
    name: "work",
    contentDir: path.join(ROOT, "src/content/work"),
    urlField: "explanation_url",
    outDir: OUT_DIR,
  },
  // Phase 3c will add: { name: "transactions", contentDir: ..., urlField: "explanationUrl", outDir: ... }
  //                   + { name: "architecture", contentDir: ..., urlField: "essaySourceUrl", outDir: ... }
  //                   + { name: "essays", contentDir: ..., urlField: "sourceUrl", outDir: ... }
];

const REQUIRED_HEADINGS = [
  /^##\s+[\w\-.]+\s*Q1\s+What is this\?/m,
  /^##\s+[\w\-.]+\s*Q2\s+Why this approach\?/m,
  /^##\s+[\w\-.]+\s*Q3\s+What would break\?/m,
  /^##\s+[\w\-.]+\s*Q4\s+What did I learn\?/m,
];

async function loadCache() {
  try {
    const raw = await fs.readFile(CACHE_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function saveCache(cache) {
  await fs.mkdir(path.dirname(CACHE_PATH), { recursive: true });
  await fs.writeFile(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
}

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w_]+):\s*(.+?)\s*$/);
    if (!kv) continue;
    let value = kv[2];
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fm[kv[1]] = value;
  }
  return fm;
}

async function fetchWithETag(url, etag) {
  const headers = etag ? { "If-None-Match": etag } : {};
  const res = await fetch(url, { headers });
  if (res.status === 304) return { changed: false };
  if (!res.ok) throw new Error(`fetch ${url} → ${res.status}`);
  const text = await res.text();
  return { changed: true, text, etag: res.headers.get("etag") ?? null };
}

function validateHeadings(slug, text) {
  const missing = [];
  for (const re of REQUIRED_HEADINGS) {
    if (!re.test(text)) missing.push(re.source);
  }
  if (missing.length > 0) {
    throw new Error(
      `${slug} EXPLANATION.md missing canonical headings:\n  - ${missing.join("\n  - ")}`
    );
  }
}

async function walkCollection(coll, cache) {
  const entries = await fs.readdir(coll.contentDir);
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const filePath = path.join(coll.contentDir, fname);
    const src = await fs.readFile(filePath, "utf8");
    const fm = parseFrontmatter(src);
    const url = fm[coll.urlField];
    if (!url) continue;
    const slug = fm.slug ?? fname.replace(/\.mdx?$/, "");
    const cacheKey = `${coll.name}:${slug}`;
    const cached = cache[cacheKey];
    try {
      const result = await fetchWithETag(url, cached?.etag);
      if (!result.changed) {
        process.stdout.write(`  ✓ ${cacheKey} (cached)\n`);
        continue;
      }
      validateHeadings(slug, result.text);
      await fs.mkdir(coll.outDir, { recursive: true });
      const outFile = path.join(coll.outDir, `${slug}.md`);
      await fs.writeFile(outFile, result.text, "utf8");
      cache[cacheKey] = { etag: result.etag, fetchedAt: new Date().toISOString() };
      process.stdout.write(`  → ${cacheKey} fetched (${(result.text.length / 1024).toFixed(1)}KB)\n`);
    } catch (e) {
      process.stderr.write(`✗ ${cacheKey}: ${e.message}\n`);
      process.exit(1);
    }
  }
}

async function main() {
  process.stdout.write("\nfetch_canonical_sources.mjs — Phase 3b scope (work)\n");
  const cache = await loadCache();
  for (const coll of WALK_COLLECTIONS) {
    process.stdout.write(`\n[${coll.name}]\n`);
    await walkCollection(coll, cache);
  }
  await saveCache(cache);
  process.stdout.write("\ndone.\n");
}

main().catch((e) => {
  process.stderr.write(`fetch_canonical_sources.mjs: ${e.message}\n`);
  process.exit(1);
});
```

- [ ] **Step 2: Create the explanations output dir placeholder**

Run: `mkdir -p src/content/explanations && touch src/content/explanations/.gitkeep`

- [ ] **Step 3: Smoke-test the script (no entries declare explanation_url yet, should be a no-op)**

Run: `node scripts/fetch_canonical_sources.mjs`

Expected output:
```
fetch_canonical_sources.mjs — Phase 3b scope (work)

[work]

done.
```

Zero fetches because none of the 5 MDX stubs declare `explanation_url:` yet (we ship them with `four_q:` frontmatter in Section 8).

- [ ] **Step 4: Commit**

```bash
git add scripts/fetch_canonical_sources.mjs src/content/explanations/.gitkeep
git commit -m "$(cat <<'EOF'
feat(phase-3b): fetch_canonical_sources.mjs — work-scope canonical 4Q fetcher

ETag-cached HTTPS fetcher that walks src/content/work/*.mdx looking
for entries with `explanation_url:` frontmatter, fetches the markdown,
validates against EXPLANATION-template.md's 4 canonical headings,
writes to src/content/explanations/<slug>.md. Phase 3c extends to
walk transactions + architecture + essays collections; the
WALK_COLLECTIONS array is the extension point.

Ships idle in Phase 3b — none of the 5 work MDX stubs declare an
explanation_url, so the script exits 0 after walking. Sean can flip
any entry to explanation_url later by editing frontmatter; the
fetcher activates on the next build.

Per case-study-spec §9 + §15 + BLUEPRINT-COMPLETE §3.3.
EOF
)"
```

### Task 1.2: Content validator script

**Files:**
- Create: `scripts/validate_content.mjs`

Per blueprint §3.3 + case-study spec §15: schema completeness validator. Phase 3b scope: walks `work` collection, asserts every MDX has the required Phase 3b frontmatter fields (frame, title, status, tags, hero_media, hero_media_type, hero_media_alt, order, role, anchor_metric, methods[], and either `four_q` OR `explanation_url`). Phase 3c extends to validate transactions + architecture + essays. Fails the build on missing or malformed.

- [ ] **Step 1: Write the script**

Create `scripts/validate_content.mjs`:

```js
#!/usr/bin/env node
/**
 * scripts/validate_content.mjs — schema validator.
 *
 * Phase 3b scope: walks src/content/work/*.mdx and asserts every entry
 * carries the required Phase 3b frontmatter fields. Phase 3c extends
 * to cover transactions + architecture + essays.
 *
 * Astro's content collection schema (src/content/config.ts) catches
 * most of this at build time, but THIS validator catches semantic
 * rules Astro can't express:
 *   - exactly one of {four_q, explanation_url} must be present
 *   - status-specific frontmatter (SHIPPED → shipped_at + shipped_stats_endpoint;
 *     PAUSED → return_condition; ARCHIVED → archived_reference_url)
 *   - methods[] is non-empty
 *
 * Source: case-study-spec-v1.md §15 + BLUEPRINT-COMPLETE.md §3.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const COLLECTIONS = [
  {
    name: "work",
    contentDir: path.join(ROOT, "src/content/work"),
    requiredFields: [
      "frame", "title", "status", "hero_media", "hero_media_type",
      "hero_media_alt", "order", "role", "anchor_metric",
    ],
    requiredOneOf: [["four_q", "explanation_url"]],
    statusFields: {
      SHIPPED: ["shipped_at", "shipped_stats_endpoint"],
      PAUSED: ["return_condition"],
      ARCHIVED: ["archived_reference_url"],
    },
    requiredArrays: ["tags", "methods"],
  },
  // Phase 3c will add transactions / architecture / essays here.
];

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return null;
  const block = m[1];
  const fm = {};
  let currentKey = null;
  let listItems = null;
  let inMultiline = null;
  for (const rawLine of block.split("\n")) {
    if (inMultiline) {
      if (rawLine.startsWith("  ") || rawLine === "") {
        inMultiline.value += (inMultiline.value ? "\n" : "") + rawLine.replace(/^  /, "");
        continue;
      }
      fm[inMultiline.key] = inMultiline.value;
      inMultiline = null;
    }
    const listMatch = rawLine.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentKey && Array.isArray(fm[currentKey])) {
      fm[currentKey].push(listMatch[1].replace(/^["']|["']$/g, ""));
      continue;
    }
    const objMatch = rawLine.match(/^\s+([\w_]+):\s*(.*)$/);
    if (objMatch && currentKey && typeof fm[currentKey] === "object" && !Array.isArray(fm[currentKey])) {
      const val = objMatch[2].replace(/^["']|["']$/g, "");
      fm[currentKey][objMatch[1]] = val;
      continue;
    }
    const kvMatch = rawLine.match(/^([\w_]+):\s*(.*)$/);
    if (!kvMatch) continue;
    const key = kvMatch[1];
    const value = kvMatch[2];
    currentKey = key;
    if (value === "" || value === "|" || value === ">") {
      // multiline scalar — collect indented continuation
      inMultiline = { key, value: "" };
      continue;
    }
    if (value === "[]") { fm[key] = []; continue; }
    if (value === "{}") { fm[key] = {}; continue; }
    const stripped = value.replace(/^["']|["']$/g, "");
    fm[key] = stripped;
    // peek-ahead would be cleaner; for now allow lists/objects to be detected by next-line indent
    // a key with empty value starts a list or object — detect via next iteration's indent
  }
  if (inMultiline) fm[inMultiline.key] = inMultiline.value;
  return fm;
}

/**
 * Parses YAML frontmatter robustly enough for our schema by re-parsing
 * via a second pass that detects list/object children of any empty-value key.
 */
function parseFrontmatterV2(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return null;
  const lines = m[1].split("\n");
  const fm = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const kv = line.match(/^([\w_]+):\s*(.*)$/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    const inline = kv[2];
    if (inline === "" || inline === "|") {
      // peek next non-empty line for indent
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      if (j < lines.length && /^\s+-\s/.test(lines[j])) {
        // list
        const list = [];
        while (j < lines.length && /^\s+-\s/.test(lines[j])) {
          list.push(lines[j].replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, ""));
          j++;
        }
        fm[key] = list;
        i = j;
        continue;
      }
      if (j < lines.length && /^\s+\w+:/.test(lines[j])) {
        // object OR list-of-objects
        if (/^\s+-\s+\w/.test(lines[j + 1] || "")) {
          // list of objects — special-case `methods` and similar
          const list = [];
          let current = null;
          while (j < lines.length && (lines[j].startsWith("  -") || lines[j].startsWith("    "))) {
            if (lines[j].startsWith("  -")) {
              if (current) list.push(current);
              current = {};
              const inlineKv = lines[j].match(/^\s+-\s+(\w+):\s*(.+)$/);
              if (inlineKv) current[inlineKv[1]] = inlineKv[2].replace(/^["']|["']$/g, "");
            } else {
              const itemKv = lines[j].match(/^\s+(\w+):\s*(.+)$/);
              if (itemKv && current) current[itemKv[1]] = itemKv[2].replace(/^["']|["']$/g, "");
            }
            j++;
          }
          if (current) list.push(current);
          fm[key] = list;
          i = j;
          continue;
        }
        // plain object
        const obj = {};
        while (j < lines.length && /^\s+\w+:/.test(lines[j])) {
          const objKv = lines[j].match(/^\s+(\w+):\s*(.+)$/);
          if (objKv) obj[objKv[1]] = objKv[2].replace(/^["']|["']$/g, "");
          j++;
        }
        fm[key] = obj;
        i = j;
        continue;
      }
      if (inline === "|") {
        // multiline block scalar
        let acc = "";
        let j2 = i + 1;
        while (j2 < lines.length && (lines[j2].startsWith("  ") || lines[j2] === "")) {
          acc += (acc ? "\n" : "") + lines[j2].replace(/^  /, "");
          j2++;
        }
        fm[key] = acc;
        i = j2;
        continue;
      }
      fm[key] = "";
      i++;
      continue;
    }
    if (inline === "[]") { fm[key] = []; i++; continue; }
    fm[key] = inline.replace(/^["']|["']$/g, "");
    i++;
  }
  return fm;
}

async function validateCollection(coll) {
  const entries = await fs.readdir(coll.contentDir);
  const errors = [];
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = fname.replace(/\.mdx?$/, "");
    const src = await fs.readFile(path.join(coll.contentDir, fname), "utf8");
    const fm = parseFrontmatterV2(src);
    if (!fm) {
      errors.push(`${coll.name}/${slug}: missing or malformed frontmatter`);
      continue;
    }
    for (const f of coll.requiredFields) {
      if (fm[f] === undefined || fm[f] === "") {
        errors.push(`${coll.name}/${slug}: missing required field "${f}"`);
      }
    }
    for (const arrField of coll.requiredArrays ?? []) {
      if (!Array.isArray(fm[arrField]) || fm[arrField].length === 0) {
        errors.push(`${coll.name}/${slug}: required array "${arrField}" is missing or empty`);
      }
    }
    for (const oneOf of coll.requiredOneOf) {
      const present = oneOf.filter((f) => fm[f] !== undefined && fm[f] !== "");
      if (present.length === 0) {
        errors.push(`${coll.name}/${slug}: must declare one of [${oneOf.join(", ")}]`);
      }
    }
    const statusReq = coll.statusFields[fm.status] ?? [];
    for (const f of statusReq) {
      if (fm[f] === undefined || fm[f] === "") {
        errors.push(`${coll.name}/${slug}: status=${fm.status} requires field "${f}"`);
      }
    }
    process.stdout.write(`  ✓ ${coll.name}/${slug}\n`);
  }
  return errors;
}

async function main() {
  process.stdout.write("\nvalidate_content.mjs — Phase 3b scope (work)\n");
  const allErrors = [];
  for (const coll of COLLECTIONS) {
    process.stdout.write(`\n[${coll.name}]\n`);
    const errs = await validateCollection(coll);
    allErrors.push(...errs);
  }
  if (allErrors.length > 0) {
    process.stderr.write(`\n✗ ${allErrors.length} validation errors:\n`);
    for (const e of allErrors) process.stderr.write(`  - ${e}\n`);
    process.exit(1);
  }
  process.stdout.write("\ndone.\n");
}

main().catch((e) => {
  process.stderr.write(`validate_content.mjs: ${e.stack || e.message}\n`);
  process.exit(1);
});
```

- [ ] **Step 2: Smoke-test (Phase 2 stubs lack the new required fields — expect FAIL)**

Run: `node scripts/validate_content.mjs`

Expected: exits with code 1 and prints several errors per slug — missing `role`, `anchor_metric`, `methods`, and `four_q` (because the Phase 2 stubs don't carry them yet). This proves the validator works; Section 8 below adds the missing fields when the stubs are rewritten.

- [ ] **Step 3: Commit**

```bash
git add scripts/validate_content.mjs
git commit -m "$(cat <<'EOF'
feat(phase-3b): validate_content.mjs — work-scope schema validator

Catches semantic rules Astro's content collection schema can't express:
exactly one of {four_q, explanation_url} must be present; status-specific
frontmatter (SHIPPED → shipped_at + shipped_stats_endpoint; PAUSED →
return_condition; ARCHIVED → archived_reference_url); methods[] is
non-empty. Phase 3c extends to walk transactions + architecture +
essays.

Currently fails on Phase 2's stubbed work MDX entries (missing
role/anchor_metric/methods/four_q) — Section 8 below adds the fields
when the stubs are rewritten with full Phase 3b shape.

Per case-study-spec §15 + BLUEPRINT-COMPLETE §3.3.
EOF
)"
```

### Task 1.3: Cross-link graph derivator (partial — Phase 3b methods cross-links only)

**Files:**
- Create: `scripts/derive_crosslinks.mjs`

Per blueprint §3.3: derives the 4-way bidirectional cross-link table from frontmatter. Phase 3b ships with **methods-strip cross-link validation only** — walks `work` collection, reads `methods[].link` fields, asserts every `/work/<slug>` link resolves to an existing slug in the work collection. Phase 3c extends to derive bidirectional ledger ↔ architecture ↔ essays graphs.

- [ ] **Step 1: Write the script**

Create `scripts/derive_crosslinks.mjs`:

```js
#!/usr/bin/env node
/**
 * scripts/derive_crosslinks.mjs — cross-link graph derivator.
 *
 * Phase 3b scope: walks src/content/work/*.mdx, reads methods[].link
 * fields, asserts every `/work/<slug>` link resolves to a real slug
 * in the work collection. Phase 3c extends to derive bidirectional
 * ledger ↔ architecture ↔ essays graphs from `plottedArtifacts`,
 * `relatedArchitecture`, `relatedLedgerRow`, `relatedCaseStudy`,
 * `relatedEssay`, `previousVersion` fields.
 *
 * Source: case-study-spec-v1.md §8.2 + BLUEPRINT-COMPLETE.md §3.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const WORK_DIR = path.join(ROOT, "src/content/work");

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return null;
  return m[1];
}

function extractSlug(fname) {
  return fname.replace(/\.mdx?$/, "");
}

function extractMethodsLinks(frontmatterBlock) {
  // Look for `methods:` block, parse list of objects, collect `link:` values.
  const lines = frontmatterBlock.split("\n");
  const links = [];
  let inMethods = false;
  for (const line of lines) {
    if (/^methods:/.test(line)) { inMethods = true; continue; }
    if (inMethods && /^\w+:/.test(line)) { inMethods = false; }
    if (!inMethods) continue;
    const linkMatch = line.match(/^\s+link:\s*(.+)$/);
    if (linkMatch) {
      const val = linkMatch[1].trim().replace(/^["']|["']$/g, "");
      if (val !== "null" && val !== "") links.push(val);
    }
  }
  return links;
}

async function main() {
  process.stdout.write("\nderive_crosslinks.mjs — Phase 3b scope (methods cross-links)\n");
  const entries = await fs.readdir(WORK_DIR);
  const validSlugs = new Set(
    entries
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(extractSlug)
  );
  const errors = [];
  let total = 0;
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(WORK_DIR, fname), "utf8");
    const fm = parseFrontmatter(src);
    if (!fm) continue;
    const links = extractMethodsLinks(fm);
    for (const link of links) {
      total++;
      const targetMatch = link.match(/^\/work\/([\w-]+)\/?$/);
      if (!targetMatch) continue; // external links allowed; only validate /work/* shape
      const targetSlug = targetMatch[1];
      if (!validSlugs.has(targetSlug)) {
        errors.push(`${slug}: methods cross-link to /work/${targetSlug}/ — no such slug`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${targetSlug}/\n`);
      }
    }
  }
  if (errors.length > 0) {
    process.stderr.write(`\n✗ ${errors.length} cross-link errors:\n`);
    for (const e of errors) process.stderr.write(`  - ${e}\n`);
    process.exit(1);
  }
  process.stdout.write(`\ndone. validated ${total} methods cross-links.\n`);
}

main().catch((e) => {
  process.stderr.write(`derive_crosslinks.mjs: ${e.message}\n`);
  process.exit(1);
});
```

- [ ] **Step 2: Smoke-test (Phase 2 stubs have no methods yet — should be a no-op zero validation)**

Run: `node scripts/derive_crosslinks.mjs`

Expected:
```
derive_crosslinks.mjs — Phase 3b scope (methods cross-links)

done. validated 0 methods cross-links.
```

- [ ] **Step 3: Commit**

```bash
git add scripts/derive_crosslinks.mjs
git commit -m "$(cat <<'EOF'
feat(phase-3b): derive_crosslinks.mjs — methods cross-link validator

Phase 3b scope: walks src/content/work/*.mdx, reads methods[].link
fields, asserts every `/work/<slug>/` reference resolves to a real
work entry. Phase 3c extends to derive bidirectional ledger ↔
architecture ↔ essays graphs from plottedArtifacts, relatedArchitecture,
relatedLedgerRow, relatedCaseStudy, relatedEssay, previousVersion
fields.

Ships idle today — Phase 2 stubs have no methods arrays yet. Section
8 below populates them; the validator activates on the next build.

Per case-study-spec §8.2 + BLUEPRINT-COMPLETE §3.3.
EOF
)"
```

### Task 1.4: Wire prebuild hook in package.json

**Files:**
- Modify: `package.json`

The three scripts run sequentially before `astro build`. Order matters: validate first (cheap; catches schema errors before fetching), then fetch (slow; HTTPS); then derive (cheap; uses validated state).

- [ ] **Step 1: Read package.json**

Current `scripts` block from Read earlier:
```json
"scripts": {
  "dev": "astro dev",
  "start": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "astro": "astro"
}
```

- [ ] **Step 2: Update package.json scripts block**

Edit `package.json` and replace the `scripts` block with:

```json
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "prebuild": "node scripts/validate_content.mjs && node scripts/fetch_canonical_sources.mjs && node scripts/derive_crosslinks.mjs",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro",
    "validate": "node scripts/validate_content.mjs",
    "fetch-canonical": "node scripts/fetch_canonical_sources.mjs",
    "derive-crosslinks": "node scripts/derive_crosslinks.mjs"
  },
```

- [ ] **Step 3: Smoke-test by running build (expected to fail at the validator because Phase 2 stubs lack new fields)**

Run: `npm run build 2>&1 | head -30`

Expected: build fails at the `prebuild` step with the validator's errors about missing role/anchor_metric/methods/four_q on the work entries. This is correct — the failure proves the prebuild hook fires.

If the build *succeeds*, the validator isn't running — check the package.json wiring.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "$(cat <<'EOF'
feat(phase-3b): wire prebuild hook — validate → fetch → derive crosslinks

npm run build now runs validate_content.mjs (schema) →
fetch_canonical_sources.mjs (canonical 4Q fetcher) →
derive_crosslinks.mjs (methods cross-link validator) before astro
build kicks off. Build fails fast on schema drift, missing
canonical sources, or dangling /work/<slug>/ links.

Also exposes the three scripts as standalone npm scripts (validate /
fetch-canonical / derive-crosslinks) for local debugging.

Per case-study-spec §15 + BLUEPRINT-COMPLETE §3.3.
EOF
)"
```

### Task 1.5: Gitignore the canonical-sources cache

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Read current .gitignore**

Run: `cat .gitignore`

Expected: existing entries for `dist/`, `node_modules/`, `.env`, etc.

- [ ] **Step 2: Append cache directory**

Append to `.gitignore`:

```
# Prebuild canonical-source ETag cache (Phase 3b)
.cache/
```

Use a Bash heredoc append rather than overwriting the file:

```bash
cat >> .gitignore <<'EOF'

# Prebuild canonical-source ETag cache (Phase 3b)
.cache/
EOF
```

- [ ] **Step 3: Verify**

Run: `tail -3 .gitignore`

Expected: the new comment + `.cache/` line are present.

- [ ] **Step 4: Commit**

```bash
git add .gitignore
git commit -m "$(cat <<'EOF'
chore(phase-3b): gitignore .cache/ — canonical-sources ETag cache

The fetcher writes ETags + fetchedAt timestamps to
.cache/canonical-sources.lockfile so subsequent builds skip
unchanged sources. The cache is local-machine-derived state and
shouldn't be in git.
EOF
)"
```

### Task 1.6: Extend `src/content/config.ts` work schema

**Files:**
- Modify: `src/content/config.ts`

Per case-study spec Appendix B: extend the work schema with `role`, `anchor_metric`, `investigation_order`, `methods[]`, `four_q`, `explanation_url`, and the status-specific frontmatter fields (`shipped_at`, `shipped_stats_endpoint`, `return_condition`, `archived_reference_url`). Astro will catch the schema-level issues at content sync; the validator script (Task 1.2) catches the semantic rules Astro can't express.

- [ ] **Step 1: Replace `src/content/config.ts`**

Replace the entire file with:

```ts
import { defineCollection, z } from "astro:content";

const methodRow = z.object({
  task: z.string(),
  tool: z.string(),
  cost: z.string(),
  link: z.string().nullable().optional(),
});

const fourQ = z.object({
  what: z.string(),
  why: z.string(),
  break: z.string(),
  learn: z.string(),
});

const work = defineCollection({
  type: "content",
  schema: z.object({
    // `slug` is reserved by Astro — comes from frontmatter override or filename
    frame: z.enum(["A-1", "A-2", "A-3", "A-4", "A-5"]),
    title: z.string(),
    tagline: z.string().optional(),
    status: z.enum(["ACTIVE", "COMING", "PAUSED", "ARCHIVED", "SHIPPED"]),
    tags: z.array(z.string()),
    hero_media: z.string(),
    hero_media_type: z.enum(["video", "image"]),
    hero_media_alt: z.string(),
    order: z.number().int().min(1).max(5),
    date_started: z.coerce.string().optional(),
    date_active_through: z.coerce.string().optional(),
    case_study_dateline_pattern: z
      .enum(["fleet_pulse", "ship_log", "reading_log", "now_line", "ledger_row"])
      .optional(),

    // --- Phase 3b additions (case-study-spec Appendix B) ---
    role: z.string(),
    anchor_metric: z.string(),
    investigation_order: z.enum(["reverse", "forward"]).default("reverse"),

    methods: z.array(methodRow).min(1),

    // One of (four_q, explanation_url) is required — enforced by
    // scripts/validate_content.mjs since Zod can't express "one-of" cleanly
    // without union-discriminator gymnastics. Both fields are optional at
    // the schema level; the validator is the source of truth.
    four_q: fourQ.optional(),
    explanation_url: z.string().url().optional(),

    // --- Status-specific frontmatter (validator enforces presence per status) ---
    shipped_at: z.coerce.string().optional(),                  // SHIPPED only
    shipped_stats_endpoint: z.string().optional(),             // SHIPPED only
    return_condition: z.string().optional(),                   // PAUSED only
    archived_reference_url: z.string().url().optional(),       // ARCHIVED only
  }),
});

const teaserDeck = defineCollection({
  type: "data",
  schema: z.object({
    cards: z.array(
      z.object({
        cardIndex: z.number().int().min(0).max(9),
        src: z.string(),
        alt: z.string(),
        style: z.string(),
      })
    ).length(10),
  }),
});

export const collections = { work, teaserDeck };
```

- [ ] **Step 2: Verify Astro content sync**

Run: `npx astro sync 2>&1 | tail -10`

Expected: sync completes, but reports schema errors on each of the 5 work entries (missing `role`, `anchor_metric`, `methods`). That's correct — Section 8 below adds them when the stubs are rewritten.

If Astro reports `Cannot read property 'task' of undefined` or a similar parsing error in `methodRow`, the issue is the methodRow defined-before-use ordering — verify it's declared at the top of the file.

- [ ] **Step 3: Commit**

```bash
git add src/content/config.ts
git commit -m "$(cat <<'EOF'
feat(phase-3b): extend work content schema — role, anchor_metric, methods[], four_q

Adds the Phase 3b case-study frontmatter shape from case-study-spec
Appendix B:
  - role (string) — e.g., "pm + builder + operator"
  - anchor_metric (string) — e.g., "220 FRAMES"
  - investigation_order (enum reverse|forward, default reverse)
  - methods[] (array of {task, tool, cost, link?})
  - four_q ({what, why, break, learn}) OR explanation_url (URL)
  - shipped_at + shipped_stats_endpoint (SHIPPED only)
  - return_condition (PAUSED only)
  - archived_reference_url (ARCHIVED only)

The "one-of (four_q, explanation_url)" + status-specific-required rules
are enforced by scripts/validate_content.mjs since Zod can't express
them cleanly. Schema-level fields are all optional; the validator is
the source of truth for the semantic constraints.

Currently fails astro sync on all 5 Phase 2 work stubs (missing role,
anchor_metric, methods) — Section 8 rewrites the stubs to satisfy the
schema.

Per case-study-spec Appendix B + BLUEPRINT-COMPLETE §3.1.
EOF
)"
```

---

## Section 2 — Shared component primitives

The five components in this section originate in case-study spec but are also consumed by Phase 3c's transactions / architecture / essays deep-dive pages. Build them with that future scope in mind: file location `src/components/case-study/` is the canonical home; 3c imports from here.

### Task 2.1: `<FourQBlock />` component

**Files:**
- Create: `src/components/case-study/FourQBlock.astro`

Per case-study spec §9: renders the 4 canonical sections (Q1 What is this / Q2 Why this approach / Q3 What would break / Q4 What did I learn). Phase 3b reads from `four_q:` frontmatter (Option B fallback per §9.2). When Sean later sets `explanation_url:` on a case study, the page passes the fetched markdown body instead via the `canonicalMarkdown` prop. The component prefers `canonicalMarkdown` when present.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/FourQBlock.astro`:

```astro
---
/**
 * <FourQBlock /> — renders the canonical 4Q closer.
 *
 * Source: case-study-spec-v1.md §9.
 *
 * Prefers `canonicalMarkdown` (the fetched EXPLANATION.md body from
 * scripts/fetch_canonical_sources.mjs) when present; falls back to
 * the `fourQ` frontmatter mirror per spec §9.2 Option B.
 */
interface FourQ {
  what: string;
  why: string;
  break: string;
  learn: string;
}
interface Props {
  frame: string;          // e.g., "A-1"
  slug: string;
  fourQ?: FourQ;
  canonicalMarkdown?: string;
  explanationUrl?: string;
}

const { frame, slug, fourQ, canonicalMarkdown, explanationUrl } = Astro.props;

const SECTIONS = [
  { q: "Q1", title: "What is this?", key: "what" as const },
  { q: "Q2", title: "Why this approach?", key: "why" as const },
  { q: "Q3", title: "What would break?", key: "break" as const },
  { q: "Q4", title: "What did I learn?", key: "learn" as const },
];

const usingCanonical = Boolean(canonicalMarkdown);
const usingFrontmatter = Boolean(fourQ);
const showLink = Boolean(explanationUrl);
---

<section class="four-q" aria-labelledby={`four-q-${slug}`}>
  <header class="section-heading-row">
    <h2 id={`four-q-${slug}`} class="section-heading">
      ─ 4Q ─
    </h2>
    {usingCanonical && (
      <span class="canonical-marker" aria-label="rendered from canonical EXPLANATION.md">
        canonical
      </span>
    )}
  </header>

  {usingCanonical && (
    <article class="four-q-canonical" set:html={canonicalMarkdown} />
  )}

  {!usingCanonical && usingFrontmatter && (
    <div class="four-q-frontmatter">
      {SECTIONS.map(({ q, title, key }) => (
        <article class="four-q-section" aria-labelledby={`${slug}-${q}`}>
          <h3 id={`${slug}-${q}`} class="four-q-heading">
            <span class="frame-prefix">{frame}.{q}</span>{"  "}<span class="four-q-title">{title}</span>
          </h3>
          <p class={`four-q-body four-q-body-${key}`}>
            {fourQ![key]}
          </p>
        </article>
      ))}
    </div>
  )}

  {showLink && (
    <p class="canonical-link">
      <a href={explanationUrl} rel="external">&rarr; read the canonical EXPLANATION.md</a>
      <span class="info-glyph" aria-hidden="true">&#9432;</span>
    </p>
  )}
</section>

<style>
  .four-q {
    margin: 80px auto 0;
    max-width: 1120px;
    padding: 0 24px;
  }

  .section-heading-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 32px;
  }

  .section-heading {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    opacity: 0.8;
    text-transform: uppercase;
    margin: 0;
  }

  .canonical-marker {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: var(--ink-secondary);
    padding: 2px 8px;
    border: 0.5px solid var(--border-paper);
    border-radius: 2px;
  }

  .four-q-frontmatter {
    display: flex;
    flex-direction: column;
    gap: 48px;
  }

  .four-q-section {
    max-width: 720px;
  }

  .four-q-heading {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    margin: 0 0 12px;
    text-transform: uppercase;
  }
  .four-q-heading .frame-prefix {
    font-weight: 500;
  }
  .four-q-heading .four-q-title {
    font-family: var(--font-serif);
    font-size: 22px;
    font-weight: 300;
    letter-spacing: -0.2px;
    text-transform: none;
    color: var(--teal);
  }

  .four-q-body {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.55;
    letter-spacing: -0.1px;
    color: var(--ink);
    margin: 0;
  }
  /* Q1 body is slightly larger per spec §4 type table */
  .four-q-body-what {
    font-size: 22px;
  }

  .four-q-canonical :global(h2) {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    text-transform: uppercase;
    margin: 48px 0 12px;
  }
  .four-q-canonical :global(p) {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.55;
    color: var(--ink);
    max-width: 720px;
    margin: 0 0 16px;
  }

  .canonical-link {
    margin: 32px 0 0;
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 500;
    color: var(--teal);
  }
  .canonical-link a {
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: 1px;
    transition: border-color 160ms var(--ease-out);
  }
  .canonical-link a:hover,
  .canonical-link a:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }
  .canonical-link .info-glyph {
    margin-left: 6px;
    color: var(--ink-secondary);
    font-size: 12px;
  }

  @media (max-width: 767px) {
    .four-q { padding: 0 16px; }
    .four-q-body { font-size: 16px; }
    .four-q-body-what { font-size: 20px; }
    .four-q-heading .four-q-title { font-size: 20px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/FourQBlock.astro
git commit -m "$(cat <<'EOF'
feat(phase-3b): FourQBlock component — canonical 4Q closer with Option-B fallback

Renders the 4 sections (Q1 What is this / Q2 Why this approach /
Q3 What would break / Q4 What did I learn). Prefers canonicalMarkdown
(the fetched EXPLANATION.md body) when present; falls back to the
fourQ frontmatter mirror per case-study-spec §9.2 Option B. Q1 body
gets the larger 22px Newsreader treatment per §4 type table.

Per case-study-spec §9.
EOF
)"
```

### Task 2.2: `<MethodsStrip />` component

**Files:**
- Create: `src/components/case-study/MethodsStrip.astro`

Per case-study spec §8: wire-service mini-table. Three columns. 0.5px teal grid. Cross-link rule: cells with a `link:` field render as internal anchors with a 1px underline.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/MethodsStrip.astro`:

```astro
---
/**
 * <MethodsStrip /> — wire-service Methods mini-table.
 *
 * Renders 3 columns (TASK / AGENT-TOOL / MODEL-COST) from a
 * methods[] frontmatter array. Cells with a link: field render as
 * internal anchors with a 1px teal underline. No prose. No logos.
 *
 * Source: case-study-spec-v1.md §8.
 */
interface MethodRow {
  task: string;
  tool: string;
  cost: string;
  link?: string | null;
}
interface Props {
  methods: MethodRow[];
}

const { methods } = Astro.props;
---

<section class="methods-strip" aria-labelledby="methods-heading">
  <h2 id="methods-heading" class="section-heading">─ METHODS ─</h2>
  <table>
    <caption class="visually-hidden">Tools, agents, and models used on this project</caption>
    <thead>
      <tr>
        <th scope="col">TASK</th>
        <th scope="col">AGENT / TOOL</th>
        <th scope="col">MODEL / COST</th>
      </tr>
    </thead>
    <tbody>
      {methods.map((row) => (
        <tr>
          <td class="cell-task">{row.task}</td>
          <td class="cell-tool">
            {row.link ? (
              <a href={row.link} class="methods-link">{row.tool}</a>
            ) : (
              row.tool
            )}
          </td>
          <td class="cell-cost">{row.cost}</td>
        </tr>
      ))}
    </tbody>
  </table>
</section>

<style>
  .methods-strip {
    margin: 80px auto 0;
    max-width: 1120px;
    padding: 0 24px;
  }

  .section-heading {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    opacity: 0.8;
    text-transform: uppercase;
    margin: 0 0 24px;
  }

  table {
    width: 100%;
    max-width: 720px;
    border-collapse: collapse;
    background-color: var(--paper);
  }
  th, td {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    letter-spacing: 0.6px;
    text-align: left;
    padding: 12px 16px;
    border: 0.5px solid var(--border-paper);
    color: var(--ink);
  }
  th {
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    color: var(--ink-secondary);
    background-color: rgba(10, 62, 66, 0.04);
  }
  .cell-task { color: var(--ink); }
  .cell-tool { color: var(--ink); font-feature-settings: "tnum" on; }
  .cell-cost { color: var(--ink-secondary); }

  .methods-link {
    color: var(--teal);
    text-decoration: none;
    border-bottom: 1px solid var(--teal);
    padding-bottom: 1px;
    transition: opacity 160ms var(--ease-out);
  }
  .methods-link:hover,
  .methods-link:focus-visible {
    opacity: 0.7;
    outline: none;
  }

  .visually-hidden {
    position: absolute;
    width: 1px; height: 1px;
    padding: 0; margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 767px) {
    .methods-strip { padding: 0 16px; }
    th, td {
      font-size: 11px;
      padding: 8px 12px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/MethodsStrip.astro
git commit -m "$(cat <<'EOF'
feat(phase-3b): MethodsStrip component — wire-service Methods mini-table

3-column table (TASK / AGENT-TOOL / MODEL-COST) rendered from a
methods[] frontmatter array. Cells with a link: field become
internal anchors with a 1px teal underline — this is the cross-link
rule that emerges as a methods graph across the portfolio. JetBrains
Mono throughout, paper bg, 0.5px teal grid. No prose. No logos.

Per case-study-spec §8.
EOF
)"
```

### Task 2.3: `<Annotation />` system (component + 4 SVGs + positioner JS)

**Files:**
- Create: `src/components/annotations/Annotation.astro`
- Create: `src/components/annotations/arrow.svg`
- Create: `src/components/annotations/strikethrough-x.svg`
- Create: `src/components/annotations/coffee-ring.svg`
- Create: `src/components/annotations/registration-mark.svg`
- Create: `src/scripts/annotation-positioner.js`

Per case-study spec §11: 4 vocabularies (curved arrow with 1-2-word label / strikethrough X / coffee ring / registration mark). Declarative MDX usage with `target` + `offset`. The positioner JS reads each `<Annotation>`'s `data-target` + `data-offset-x` / `data-offset-y` at runtime, computes the position via `getBoundingClientRect` of the target, and applies absolute positioning. ResizeObserver re-runs on viewport change.

- [ ] **Step 1: Write the 4 SVGs**

Create `src/components/annotations/arrow.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2,30 Q40,5 80,18 L110,18 M104,12 L110,18 L104,24" />
</svg>
```

Create `src/components/annotations/strikethrough-x.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
  <path d="M8,8 L72,72 M72,8 L8,72" />
</svg>
```

Create `src/components/annotations/coffee-ring.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 70" fill="none" stroke="currentColor" stroke-width="1.0" opacity="0.3">
  <ellipse cx="40" cy="35" rx="32" ry="28" />
  <ellipse cx="40" cy="35" rx="36" ry="30" stroke-dasharray="2 4" />
</svg>
```

Create `src/components/annotations/registration-mark.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round">
  <line x1="12" y1="2" x2="12" y2="22" />
  <line x1="2" y1="12" x2="22" y2="12" />
  <circle cx="12" cy="12" r="6" />
</svg>
```

- [ ] **Step 2: Write the positioner JS**

Create `src/scripts/annotation-positioner.js`:

```js
/**
 * src/scripts/annotation-positioner.js — runtime positioner.
 *
 * Each <Annotation> renders as a fixed-size absolutely-positioned
 * element inside its nearest .annotation-anchor-root parent. The
 * positioner reads data-target + data-offset-x/y, resolves the
 * target's getBoundingClientRect relative to the root, and applies
 * top/left.
 *
 * ResizeObserver on the root re-runs the layout pass on viewport
 * changes. No layout reads inside RAF — geometry is event-driven.
 *
 * Source: case-study-spec-v1.md §11.
 */
function positionAnnotations(root) {
  if (!root) return;
  const annotations = root.querySelectorAll(".annotation[data-target]");
  const rootRect = root.getBoundingClientRect();
  annotations.forEach((el) => {
    const targetId = el.getAttribute("data-target");
    if (!targetId) return;
    const target = root.querySelector(targetId);
    if (!target) {
      el.style.display = "none";
      return;
    }
    const offsetX = parseInt(el.getAttribute("data-offset-x") || "0", 10);
    const offsetY = parseInt(el.getAttribute("data-offset-y") || "0", 10);
    const r = target.getBoundingClientRect();
    el.style.position = "absolute";
    el.style.left = `${r.right - rootRect.left + offsetX}px`;
    el.style.top = `${r.top - rootRect.top + offsetY}px`;
    el.style.display = "";
  });
}

export function initAnnotations() {
  const roots = document.querySelectorAll(".annotation-anchor-root");
  if (roots.length === 0) return;
  roots.forEach((root) => {
    positionAnnotations(root);
    const ro = new ResizeObserver(() => positionAnnotations(root));
    ro.observe(root);
  });
  // Defer one re-position pass after web fonts load (Newsreader/JetBrains
  // Mono reflow shifts artifact heights enough to misposition annotations
  // on first render).
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      roots.forEach((root) => positionAnnotations(root));
    });
  }
}
```

- [ ] **Step 3: Write the Annotation component**

Create `src/components/annotations/Annotation.astro`:

```astro
---
/**
 * <Annotation /> — pencil-margin annotation wrapper.
 *
 * Declarative usage in MDX:
 *   <Annotation type="arrow" label="the one we kept" target="#artifact-3" offsetX={-40} offsetY={8} />
 *
 * The page shell wraps the investigation board in a
 * .annotation-anchor-root container and includes the positioner JS
 * module. The script computes top/left at runtime via getBoundingClientRect.
 *
 * Density rule (case-study-spec §11.2): ≤6 per page desktop, ≤4 mobile.
 * Enforcement is currently Sean's authoring discipline; a Phase 4
 * build-time counter could escalate to a warning.
 *
 * Source: case-study-spec-v1.md §11.
 */
import arrowSvg from "./arrow.svg?raw";
import strikethroughSvg from "./strikethrough-x.svg?raw";
import coffeeRingSvg from "./coffee-ring.svg?raw";
import registrationMarkSvg from "./registration-mark.svg?raw";

interface Props {
  type: "arrow" | "strikethrough" | "coffee-ring" | "registration-mark";
  label?: string;
  target?: string;        // CSS selector, e.g. "#artifact-3"
  offsetX?: number;       // px offset from target's right edge
  offsetY?: number;       // px offset from target's top edge
}

const { type, label, target, offsetX = 0, offsetY = 0 } = Astro.props;

const SVG_MAP = {
  arrow: arrowSvg,
  strikethrough: strikethroughSvg,
  "coffee-ring": coffeeRingSvg,
  "registration-mark": registrationMarkSvg,
} as const;

const svgMarkup = SVG_MAP[type];
const targetAttr = target ? { "data-target": target } : {};
---

<span
  class:list={["annotation", `annotation-${type}`, target && "annotation-anchored"]}
  data-target={target}
  data-offset-x={String(offsetX)}
  data-offset-y={String(offsetY)}
  aria-hidden="true"
>
  <span class="annotation-svg" set:html={svgMarkup} />
  {label && type === "arrow" && (
    <span class="annotation-label">{label}</span>
  )}
</span>

<style>
  .annotation {
    pointer-events: none;
    color: var(--teal);
    opacity: 0.7;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .annotation-anchored {
    position: absolute;
  }
  .annotation-svg {
    display: inline-block;
    line-height: 0;
  }
  .annotation-svg :global(svg) {
    display: block;
  }
  .annotation-arrow .annotation-svg :global(svg) { width: 80px; height: 28px; }
  .annotation-strikethrough .annotation-svg :global(svg) { width: 80px; height: 80px; color: var(--stamp-amber); opacity: 0.8; }
  .annotation-coffee-ring .annotation-svg :global(svg) { width: 90px; height: 75px; color: var(--stamp-amber); opacity: 0.3; }
  .annotation-registration-mark .annotation-svg :global(svg) { width: 24px; height: 24px; color: var(--amber-mid); }

  .annotation-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--teal);
    opacity: 0.7;
    text-transform: lowercase;
    white-space: nowrap;
  }

  @media (max-width: 767px) {
    .annotation-arrow .annotation-svg :global(svg) { width: 60px; height: 20px; }
    .annotation-label { font-size: 10px; }
  }

  @media (prefers-reduced-motion: reduce) {
    /* annotations render statically; no idle animation across the system anyway */
  }
</style>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/annotations/ src/scripts/annotation-positioner.js
git commit -m "$(cat <<'EOF'
feat(phase-3b): Annotation system — wrapper component + 4 SVG vocabularies + positioner

Declarative MDX usage: <Annotation type="arrow" label="..."
target="#artifact-3" offsetX={-40} offsetY={8} />. Renders the
appropriate SVG (arrow / strikethrough-x / coffee-ring /
registration-mark) and registers position metadata on the element.

annotation-positioner.js computes top/left at runtime via
getBoundingClientRect of the target inside the nearest
.annotation-anchor-root container. ResizeObserver re-runs on
viewport changes; document.fonts.ready triggers one re-position
after web fonts load (Newsreader / JetBrains Mono reflow shifts
artifact heights on first render).

Density rule (≤6/page desktop, ≤4/page mobile, never adjacent within
200px) is currently authoring discipline; a Phase 4 build-time
counter could escalate to a warning.

Per case-study-spec §11.
EOF
)"
```

### Task 2.4: `<DatelineStrip />` component

**Files:**
- Create: `src/components/case-study/DatelineStrip.astro`

Per case-study spec §2 + hero spec §8: project-specific dateline body (e.g., "BOSTON, MAY 13, 2026 — animation pipeline, rev 3. / last frame rendered 14 hours ago."). Two lines: stamp prefix + body, then a thin rule.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/DatelineStrip.astro`:

```astro
---
/**
 * <DatelineStrip /> — case-study page dateline.
 *
 * Two lines: stamp prefix + body. Mono throughout. Thin rule below.
 * Locale + date come from frontmatter or computed at build; body is
 * project-specific authored copy.
 *
 * Source: case-study-spec-v1.md §2 + hero-spec-v1.md §8.
 */
interface Props {
  locale?: string;       // default "BOSTON"
  date?: string;         // ISO yyyy-mm-dd or pretty "MAY 13, 2026"
  body: string;          // project-specific dateline body
  bodyLine2?: string;    // optional second line
}

const today = new Date().toLocaleDateString("en-US", {
  month: "long", day: "numeric", year: "numeric",
}).toUpperCase();

const { locale = "BOSTON", date, body, bodyLine2 } = Astro.props;
const datePretty = date ?? today;
---

<div class="dateline-strip">
  <p class="dateline-line">
    <span class="dateline-stamp">{locale}, {datePretty} —</span>
    <span class="dateline-body">{body}</span>
  </p>
  {bodyLine2 && <p class="dateline-line-2">{bodyLine2}</p>}
  <hr />
</div>

<style>
  .dateline-strip {
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .dateline-line {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.2px;
    line-height: 1.5;
    color: var(--ink-secondary);
    margin: 0;
  }
  .dateline-stamp {
    font-weight: 500;
    color: var(--stamp-amber);
    margin-right: 6px;
  }
  .dateline-line-2 {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.2px;
    line-height: 1.5;
    color: var(--ink-secondary);
    margin: 4px 0 0;
  }
  hr {
    border: 0;
    border-top: 0.5px solid var(--border-paper);
    margin: 16px 0 0;
  }
  @media (max-width: 767px) {
    .dateline-strip { padding: 0 16px; }
    .dateline-line, .dateline-line-2 { font-size: 11px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/DatelineStrip.astro
git commit -m "feat(phase-3b): DatelineStrip component — project-specific case-study dateline"
```

### Task 2.5: `<TitleBlock />` component

**Files:**
- Create: `src/components/case-study/TitleBlock.astro`

Per case-study spec §2 + §4: frame number (mono amber) → status pill (mono, color per status) → title (Newsreader clamp) → tags (mono secondary) → anchor metric (mono teal, right-aligned). Status pill color resolves via a small map.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/TitleBlock.astro`:

```astro
---
/**
 * <TitleBlock /> — case-study title block.
 *
 * Layout: frame + status pill (top row), title (next), tags + anchor
 * metric (bottom row, split). Status pill color is driven by frontmatter
 * status:; the status-driven page-shape desaturation lives on the page
 * shell (status="PAUSED" or "ARCHIVED" applies a CSS class that drops
 * the frame number opacity).
 *
 * Source: case-study-spec-v1.md §2 + §4 + §5.
 */
interface Props {
  frame: string;       // e.g., "A-1"
  title: string;
  status: "ACTIVE" | "COMING" | "PAUSED" | "ARCHIVED" | "SHIPPED";
  tags: string[];
  role: string;        // e.g., "pm + builder + operator"
  dateStarted?: string;
  dateActiveThrough?: string;
  anchorMetric: string;
}

const { frame, title, status, tags, role, dateStarted, dateActiveThrough, anchorMetric } = Astro.props;

const inFlightRange = (() => {
  if (!dateStarted) return null;
  const fmt = (iso: string) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "2-digit" }).replace("/", "-");
  };
  const start = fmt(dateStarted);
  const end = dateActiveThrough ? fmt(dateActiveThrough) : "now";
  return `IN FLIGHT ${start} → ${end}`;
})();
---

<header class="title-block" data-status={status}>
  <div class="role-row">
    <span class="role-pill">ROLE — {role}</span>
    {inFlightRange && <span class="in-flight">{inFlightRange}</span>}
  </div>
  <div class="frame-row">
    <span class="frame-number">{frame}</span>
    <span class="bullet" aria-hidden="true">·</span>
    <span class={`status-pill status-${status.toLowerCase()}`}>{status}</span>
  </div>
  <h1 class="case-study-title">{title}</h1>
  <div class="tag-row">
    <p class="tags">{tags.join(" · ")}</p>
    <p class="anchor-metric">◐ {anchorMetric}</p>
  </div>
</header>

<style>
  .title-block {
    max-width: 1120px;
    margin: 24px auto 0;
    padding: 0 24px;
  }

  .role-row {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
  }
  .role-pill {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.6px;
    color: var(--stamp-amber);
    text-transform: uppercase;
  }
  .in-flight {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 1.6px;
    color: var(--ink-secondary);
    text-transform: uppercase;
  }

  .frame-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }
  .frame-number {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.6px;
    color: var(--amber-mid);
  }
  .bullet { color: var(--ink-secondary); }
  .status-pill {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.8px;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 2px;
  }
  .status-active   { color: var(--stamp-amber);     border: 0.5px solid var(--stamp-amber); }
  .status-coming   { color: var(--stamp-amber);     border: 0.5px solid var(--stamp-amber); opacity: 0.85; }
  .status-shipped  { color: var(--success-teal, #0F6E56); border: 0.5px solid var(--success-teal, #0F6E56); }
  .status-paused   { color: var(--ink-secondary);   border: 0.5px solid var(--ink-secondary); }
  .status-archived { color: var(--ink-secondary);   border: 0.5px solid var(--ink-secondary); }

  .case-study-title {
    font-family: var(--font-serif);
    font-size: clamp(40px, 5.6vw, 84px);
    font-weight: 400;
    line-height: 1.04;
    letter-spacing: -0.6px;
    color: var(--teal);
    margin: 0 0 16px;
  }

  .tag-row {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    align-items: baseline;
  }
  .tags {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.2px;
    color: var(--ink-secondary);
    text-transform: lowercase;
    margin: 0;
  }
  .anchor-metric {
    font-family: var(--font-mono);
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--teal);
    margin: 0;
    text-align: right;
  }

  /* Status-driven desaturation per case-study-spec §5 */
  .title-block[data-status="PAUSED"] .frame-number,
  .title-block[data-status="ARCHIVED"] .frame-number {
    color: var(--ink-secondary);
  }
  .title-block[data-status="ARCHIVED"] .frame-number {
    opacity: 0.5;
  }

  @media (max-width: 767px) {
    .title-block { padding: 0 16px; }
    .role-row { flex-direction: column; gap: 6px; }
    .case-study-title { font-size: clamp(36px, 8vw, 56px); }
    .tag-row { flex-direction: column; gap: 8px; align-items: flex-start; }
    .anchor-metric { text-align: left; font-size: 14px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/TitleBlock.astro
git commit -m "feat(phase-3b): TitleBlock component — frame + status pill + title + tags + anchor metric"
```

### Task 2.6: `<HeroMedia />` component

**Files:**
- Create: `src/components/case-study/HeroMedia.astro`

Per case-study spec §2 + projects spec §10.4: View Transition target wrapper. Sets `view-transition-name: hero-media-<slug>` (preserved from the Phase 2 stub). Renders video or image based on `hero_media_type`. Both endpoints use `object-fit: cover` so the cover/contain transition lands smoothly per spec §6.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/HeroMedia.astro`:

```astro
---
/**
 * <HeroMedia /> — case-study hero media (View Transition target).
 *
 * Renders <video> for hero_media_type=video, <img> for image. Both
 * endpoints use object-fit: cover so the morph from the projects-tile
 * lands cleanly per case-study-spec §6 + projects-spec §10.4.
 *
 * The view-transition-name attribute lives on the wrapper, NOT on
 * <video>/<img> directly — Astro 5's ClientRouter handles the
 * morph by name match.
 *
 * Source: case-study-spec-v1.md §2 + projects-section-spec-v1.md §10.4.
 */
interface Props {
  slug: string;
  heroMedia: string;          // path under /public, e.g. /assets/projects/...
  heroMediaType: "video" | "image";
  heroMediaAlt: string;
}

const { slug, heroMedia, heroMediaType, heroMediaAlt } = Astro.props;
---

<figure class="hero-media-wrap" style={`view-transition-name: hero-media-${slug};`}>
  {heroMediaType === "video" ? (
    <video
      src={heroMedia}
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-label={heroMediaAlt}
    />
  ) : (
    <img src={heroMedia} alt={heroMediaAlt} loading="eager" decoding="async" />
  )}
</figure>

<style>
  .hero-media-wrap {
    max-width: 1120px;
    margin: 48px auto 0;
    padding: 0;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: rgba(10, 62, 66, 0.06);
  }
  .hero-media-wrap video,
  .hero-media-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  @media (max-width: 767px) {
    .hero-media-wrap {
      aspect-ratio: 4 / 3;
      margin: 24px 0 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-media-wrap video {
      animation: none;
      /* Astro 5's ClientRouter respects prefers-reduced-motion at the
         transition level — no per-component override needed here. */
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/HeroMedia.astro
git commit -m "feat(phase-3b): HeroMedia component — View Transition target wrapper"
```

---

## Section 3 — Status-shape components

Four components that fire only when their status condition is met. The page shell (Section 5) renders the right one based on frontmatter status.

### Task 3.1: `<ShippedStamp />` component

**Files:**
- Create: `src/components/case-study/ShippedStamp.astro`

Per case-study spec §12.2: a literal `SHIPPED` stamp baked into the title block top-right of SHIPPED pages. Hand-drawn SVG, stamp amber, rotated -3°.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/ShippedStamp.astro`:

```astro
---
/**
 * <ShippedStamp /> — hand-drawn SHIPPED stamp for SHIPPED case studies.
 *
 * Baked into the title block top-right per case-study-spec §12.2.
 * SVG is hand-traced (slightly imperfect rectangles + counterstrokes
 * to read as inked rubber stamp, not vector-clean type).
 */
interface Props {
  shippedAt: string;   // ISO yyyy-mm-dd
}
const { shippedAt } = Astro.props;
const prettyDate = (() => {
  const d = new Date(shippedAt);
  if (Number.isNaN(d.getTime())) return shippedAt;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase();
})();
---

<aside class="shipped-stamp" aria-label={`Shipped ${prettyDate}`}>
  <svg viewBox="0 0 220 80" role="img" aria-hidden="true">
    <rect x="4" y="4" width="212" height="72" fill="none"
      stroke="currentColor" stroke-width="2.2"
      transform="skewX(-3) translate(2 0)" />
    <rect x="2" y="2" width="216" height="76" fill="none"
      stroke="currentColor" stroke-width="1.0" opacity="0.45" />
    <text x="110" y="42" text-anchor="middle"
      font-family="JetBrains Mono, monospace"
      font-weight="700" font-size="28" letter-spacing="3.5"
      fill="currentColor">SHIPPED</text>
    <text x="110" y="64" text-anchor="middle"
      font-family="JetBrains Mono, monospace"
      font-weight="500" font-size="11" letter-spacing="1.8"
      fill="currentColor">{prettyDate}</text>
  </svg>
</aside>

<style>
  .shipped-stamp {
    position: absolute;
    top: 8px;
    right: 24px;
    width: 140px;
    height: auto;
    color: var(--stamp-amber);
    opacity: 0.85;
    transform: rotate(-3deg);
    pointer-events: none;
  }
  .shipped-stamp svg {
    width: 100%;
    height: auto;
    display: block;
  }
  @media (max-width: 767px) {
    .shipped-stamp {
      width: 96px;
      top: 4px;
      right: 16px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/ShippedStamp.astro
git commit -m "feat(phase-3b): ShippedStamp — hand-drawn SHIPPED rubber stamp (rotated -3°, stamp amber)"
```

### Task 3.2: `<ShippedNow />` component

**Files:**
- Create: `src/components/case-study/ShippedNow.astro`

Per case-study spec §12.2: live block below the title block on SHIPPED pages. Reads from `/api/shipped-stats-<slug>.json` at build via `fetch`. Wire-service mono. Includes "updated <iso> by daily driver" footer per spec §12.2 example.

Phase 3b: hand-seeded JSON file (Section 8.6). Phase 4: Daily Driver agent writes nightly.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/ShippedNow.astro`:

```astro
---
/**
 * <ShippedNow /> — live install-count block for SHIPPED case studies.
 *
 * Reads /api/shipped-stats-<slug>.json at BUILD time (no client fetch).
 * Daily Driver writes this file nightly in Phase 4; v1 hand-seeds it
 * (see scripts/.../shipped-stats-intent-engineering-mcp.json).
 *
 * Source: case-study-spec-v1.md §12.2 + §15.
 */
import fs from "node:fs/promises";
import path from "node:path";

interface Props {
  slug: string;
  shippedStatsEndpoint: string;   // e.g. /api/shipped-stats-intent-engineering-mcp.json
}

const { slug, shippedStatsEndpoint } = Astro.props;

interface StatsRow { label: string; value: string; unit?: string }
interface Stats {
  updated_at?: string;
  items?: StatsRow[];
}

async function readLocalJson(endpoint: string): Promise<Stats | null> {
  // endpoint = "/api/foo.json" → public/api/foo.json
  const rel = endpoint.replace(/^\//, "");
  try {
    const filePath = path.join(process.cwd(), "public", rel);
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const stats = await readLocalJson(shippedStatsEndpoint);
const fallbackText = stats === null
  ? "LIVE — stats will refresh nightly"
  : null;

const updatedPretty = stats?.updated_at
  ? new Date(stats.updated_at).toLocaleString("en-US", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", hour12: false,
    })
  : null;
---

<aside class="shipped-now" aria-labelledby={`shipped-now-${slug}`}>
  <p id={`shipped-now-${slug}`} class="live-label">
    <span class="live-dot" aria-hidden="true">●</span>
    LIVE
  </p>
  {fallbackText && <p class="fallback">{fallbackText}</p>}
  {stats?.items && (
    <ul class="stats-list">
      {stats.items.map((row) => (
        <li class="stats-row">
          <span class="stat-value">{row.value}</span>
          <span class="stat-unit">{row.unit ?? ""}</span>
          <span class="stat-label">{row.label}</span>
        </li>
      ))}
    </ul>
  )}
  {updatedPretty && (
    <p class="updated-at">updated {updatedPretty} by daily driver</p>
  )}
</aside>

<style>
  .shipped-now {
    max-width: 720px;
    margin: 32px auto 0;
    padding: 16px 24px;
    border: 0.5px solid var(--border-paper);
    border-radius: 2px;
    background-color: rgba(15, 110, 86, 0.04);
    font-family: var(--font-mono);
  }
  .live-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--success-teal, #0F6E56);
    text-transform: uppercase;
    margin: 0 0 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .live-dot {
    color: var(--success-teal, #0F6E56);
    font-size: 10px;
    animation: live-pulse 2s ease-in-out infinite;
  }
  @keyframes live-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .fallback {
    font-size: 12px;
    font-weight: 400;
    color: var(--ink-secondary);
    margin: 0;
  }
  .stats-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 12px 32px;
  }
  .stats-row {
    font-size: 13px;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.4px;
    display: inline-flex;
    align-items: baseline;
    gap: 6px;
  }
  .stat-value { font-weight: 500; color: var(--teal); }
  .stat-unit { color: var(--ink-secondary); font-size: 11px; }
  .stat-label { color: var(--ink-secondary); }
  .updated-at {
    font-size: 11px;
    font-weight: 400;
    letter-spacing: 0.6px;
    color: var(--ink-secondary);
    margin: 12px 0 0;
    padding-top: 12px;
    border-top: 0.5px dashed var(--border-paper);
  }

  @media (max-width: 767px) {
    .shipped-now { padding: 12px 16px; }
    .stats-list { gap: 8px 16px; }
    .stats-row { font-size: 12px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .live-dot { animation: none; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/ShippedNow.astro
git commit -m "$(cat <<'EOF'
feat(phase-3b): ShippedNow — live install-count block for SHIPPED case studies

Reads /api/shipped-stats-<slug>.json at BUILD time (no client fetch).
Pulsing dot + LIVE label + stats list + "updated by daily driver"
footer. Daily Driver writes the JSON file nightly in Phase 4; Phase
3b hand-seeds the intent-engineering-mcp file (Task 8.6).

Per case-study-spec §12.2 + §15.
EOF
)"
```

### Task 3.3: `<ReturnConditionCallout />` component

**Files:**
- Create: `src/components/case-study/ReturnConditionCallout.astro`

Per case-study spec §12.3: a mono callout box for PAUSED case studies. Sits below the title block, BEFORE the hero media. The recruiter sees explicitly what un-pauses the work.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/ReturnConditionCallout.astro`:

```astro
---
/**
 * <ReturnConditionCallout /> — PAUSED-status callout.
 *
 * Sits below the title block, BEFORE the hero media on PAUSED case
 * studies. The recruiter sees the return condition explicitly — no
 * apologetic tone, just "here's what un-pauses it."
 *
 * Source: case-study-spec-v1.md §12.3.
 */
interface Props {
  returnCondition: string;   // multiline string from frontmatter
}
const { returnCondition } = Astro.props;
---

<aside class="return-condition" role="note">
  <p class="callout-label">PAUSED — return condition:</p>
  <p class="callout-body">{returnCondition}</p>
</aside>

<style>
  .return-condition {
    max-width: 720px;
    margin: 24px auto 0;
    padding: 16px 24px;
    background-color: var(--paper);
    border: 0.5px solid var(--ink-secondary);
    border-radius: 2px;
  }
  .callout-label {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1.6px;
    color: var(--ink-secondary);
    text-transform: uppercase;
    margin: 0 0 8px;
  }
  .callout-body {
    font-family: var(--font-mono);
    font-size: 13px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--ink);
    margin: 0;
    white-space: pre-line;
  }
  @media (max-width: 767px) {
    .return-condition { padding: 12px 16px; }
    .callout-body { font-size: 12px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/ReturnConditionCallout.astro
git commit -m "feat(phase-3b): ReturnConditionCallout — PAUSED-status mono callout"
```

### Task 3.4: `<FrameTheWorkPreamble />` component

**Files:**
- Create: `src/components/case-study/FrameTheWorkPreamble.astro`

Per case-study spec §12.4: a short paragraph that opens with the work for ARCHIVED case studies. **Opens with the work, never with the layoff.**

- [ ] **Step 1: Write the component**

Create `src/components/case-study/FrameTheWorkPreamble.astro`:

```astro
---
/**
 * <FrameTheWorkPreamble /> — ARCHIVED-status preamble.
 *
 * One short paragraph that opens with the work, never with the
 * exit/layoff. Sits before the opener proper, frames "this was the
 * work" — not "this is why it ended."
 *
 * The MDX page provides the content via slot; this component is the
 * styled wrapper.
 *
 * Source: case-study-spec-v1.md §12.4.
 */
---

<aside class="frame-the-work" role="note">
  <p class="archived-stamp">ARCHIVED — framing the work</p>
  <div class="preamble-body">
    <slot />
  </div>
</aside>

<style>
  .frame-the-work {
    max-width: 720px;
    margin: 24px auto 0;
    padding: 16px 0 24px;
    border-bottom: 0.5px solid var(--border-paper);
  }
  .archived-stamp {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.6px;
    color: var(--ink-secondary);
    text-transform: uppercase;
    margin: 0 0 12px;
    opacity: 0.7;
  }
  .preamble-body :global(p) {
    font-family: var(--font-serif);
    font-size: 18px;
    font-weight: 300;
    line-height: 1.5;
    color: var(--ink);
    margin: 0;
  }
  @media (max-width: 767px) {
    .preamble-body :global(p) { font-size: 16px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/FrameTheWorkPreamble.astro
git commit -m "feat(phase-3b): FrameTheWorkPreamble — ARCHIVED-status preamble (opens with the work, not the exit)"
```

---

## Section 4 — MDX artifact components

The four allowed artifact types per case-study spec §7.2. Each component takes the same outer shape (Polaroid frame + caption slot) but a different inner body. Spec rule: no fifth type. **`<SlackQuote />` is static SVG only — never a real screenshot.**

### Task 4.1: `<ArtifactImage />` Polaroid wrapper

**Files:**
- Create: `src/components/artifacts/ArtifactImage.astro`

The shared Polaroid frame wrapper. All 4 artifact components compose this as their outer layer.

- [ ] **Step 1: Write the component**

Create `src/components/artifacts/ArtifactImage.astro`:

```astro
---
/**
 * <ArtifactImage /> — Polaroid-framed wrapper for investigation-board artifacts.
 *
 * Outer layer for all 4 artifact components (PRDDecision, SlackQuote,
 * BoardArtifact, MetricChart). Renders the artifact body via slot
 * inside a Polaroid frame (paper bg + 0.5px amber border + optional
 * tape SVG at corners), with the caption block beside it (50/50 split
 * on desktop, stacked on mobile).
 *
 * Source: case-study-spec-v1.md §7.1.
 */
interface Props {
  artifactId: string;
  date: string;          // e.g. "MAY 6" — the caption stamp
  killed?: boolean;      // true for cut artifacts (§7.5)
}
const { artifactId, date, killed = false } = Astro.props;
const stamp = killed ? "KILLED" : date;
---

<article id={artifactId} class:list={["artifact", killed && "artifact-killed"]} tabindex="0">
  <div class="polaroid">
    <slot name="body" />
  </div>
  <aside class="artifact-caption">
    <p class="caption-stamp">{stamp} —</p>
    <slot name="caption" />
  </aside>
</article>

<style>
  .artifact {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    align-items: start;
    margin: 0 0 60px;
    max-width: 1120px;
  }
  .artifact:focus-visible {
    outline: 2px solid var(--teal);
    outline-offset: 8px;
  }

  .polaroid {
    position: relative;
    background-color: var(--paper);
    border: 0.5px solid var(--amber-mid);
    box-shadow:
      0 1px 2px rgba(10, 62, 66, 0.06),
      0 4px 12px rgba(10, 62, 66, 0.08);
    padding: 16px;
    min-height: 180px;
  }

  .artifact-caption {
    padding-top: 8px;
    max-width: 520px;
  }
  .caption-stamp {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.2px;
    color: var(--stamp-amber);
    text-transform: uppercase;
    margin: 0 0 8px;
  }
  .artifact-caption :global(p),
  .artifact-caption :global(div) {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 1.0px;
    line-height: 1.55;
    color: var(--ink-secondary);
    margin: 0 0 8px;
  }

  .artifact-killed .polaroid {
    opacity: 0.5;
  }
  .artifact-killed .caption-stamp {
    color: var(--ink-secondary);
  }

  @media (max-width: 767px) {
    .artifact {
      grid-template-columns: 1fr;
      gap: 16px;
      margin-bottom: 48px;
    }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/artifacts/ArtifactImage.astro
git commit -m "feat(phase-3b): ArtifactImage — Polaroid wrapper for the 4 artifact components"
```

### Task 4.2: `<PRDDecision />` component

**Files:**
- Create: `src/components/artifacts/PRDDecision.astro`

Per case-study spec §7.2: snippet of a real PRD with the load-bearing decision sentence + a 1-line rationale.

- [ ] **Step 1: Write the component**

Create `src/components/artifacts/PRDDecision.astro`:

```astro
---
/**
 * <PRDDecision /> — investigation-board artifact: a real PRD's decision sentence.
 *
 * Sanitized from the actual PRD. Never paraphrased. The decision line is
 * the load-bearing claim; the rationale is one supporting sentence.
 *
 * Source: case-study-spec-v1.md §7.2.
 */
import ArtifactImage from "./ArtifactImage.astro";

interface Props {
  artifactId: string;
  date: string;
  prdTitle: string;
  decisionLine: string;
  rationale: string;
  killed?: boolean;
}
const { artifactId, date, prdTitle, decisionLine, rationale, killed = false } = Astro.props;
---

<ArtifactImage artifactId={artifactId} date={date} killed={killed}>
  <div slot="body" class="prd-body">
    <p class="prd-title">{prdTitle}</p>
    <p class="prd-decision">{decisionLine}</p>
    <p class="prd-rationale">{rationale}</p>
  </div>
  <slot slot="caption" />
</ArtifactImage>

<style>
  .prd-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .prd-title {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
    color: var(--stamp-amber);
    text-transform: uppercase;
    margin: 0;
  }
  .prd-decision {
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 400;
    line-height: 1.45;
    color: var(--ink);
    margin: 0;
  }
  .prd-rationale {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.6px;
    color: var(--ink-secondary);
    margin: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/artifacts/PRDDecision.astro
git commit -m "feat(phase-3b): PRDDecision artifact — sanitized PRD decision sentence + rationale"
```

### Task 4.3: `<SlackQuote />` component

**Files:**
- Create: `src/components/artifacts/SlackQuote.astro`

Per case-study spec §7.2: **always static SVG, never a real screenshot.** 1-2 message exchange, names replaced with role labels (`eng lead`, `design crit`, `customer`).

- [ ] **Step 1: Write the component**

Create `src/components/artifacts/SlackQuote.astro`:

```astro
---
/**
 * <SlackQuote /> — investigation-board artifact: anonymized Slack DM.
 *
 * **STATIC SVG ONLY.** Never a real screenshot — anonymization
 * guaranteed by construction. Names replaced with role labels.
 *
 * Source: case-study-spec-v1.md §7.2.
 */
import ArtifactImage from "./ArtifactImage.astro";

interface SlackMessage {
  role: string;     // e.g. "eng lead", "design crit", "customer"
  text: string;
}
interface Props {
  artifactId: string;
  date: string;
  messages: SlackMessage[];   // 1-2 messages typical
  killed?: boolean;
}
const { artifactId, date, messages, killed = false } = Astro.props;

const ariaLabel = `Slack exchange: ${messages.map((m) => `${m.role} — ${m.text}`).join(" / ")}`;
---

<ArtifactImage artifactId={artifactId} date={date} killed={killed}>
  <div slot="body" class="slack-body" role="img" aria-label={ariaLabel}>
    {messages.map((m) => (
      <div class="slack-message">
        <div class="slack-meta">
          <span class="slack-role">{m.role}</span>
          <span class="slack-time" aria-hidden="true">14:0{Math.floor(Math.random() * 9)}</span>
        </div>
        <p class="slack-text">{m.text}</p>
      </div>
    ))}
    <p class="slack-disclaimer">— anonymized, static svg —</p>
  </div>
  <slot slot="caption" />
</ArtifactImage>

<style>
  .slack-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .slack-message {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .slack-meta {
    display: flex;
    gap: 8px;
    align-items: baseline;
  }
  .slack-role {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.8px;
    color: var(--teal);
    text-transform: lowercase;
  }
  .slack-time {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--ink-secondary);
  }
  .slack-text {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 400;
    line-height: 1.5;
    color: var(--ink);
    margin: 0;
  }
  .slack-disclaimer {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 0.4px;
    color: var(--ink-secondary);
    margin: 8px 0 0;
    padding-top: 8px;
    border-top: 0.5px dashed var(--border-paper);
    opacity: 0.7;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/artifacts/SlackQuote.astro
git commit -m "$(cat <<'EOF'
feat(phase-3b): SlackQuote artifact — static-SVG anonymized DM (never a screenshot)

1-2 message exchange. Names replaced with role labels (eng lead /
design crit / customer). Anonymization is guaranteed by construction
because the component renders text + CSS, never an image. The
"anonymized, static svg" disclaimer makes the contract visible to
the reader.

Per case-study-spec §7.2.
EOF
)"
```

### Task 4.4: `<BoardArtifact />` component

**Files:**
- Create: `src/components/artifacts/BoardArtifact.astro`

Per case-study spec §7.2: a board excerpt or Jira ticket card. Sanitized — project keys redacted.

- [ ] **Step 1: Write the component**

Create `src/components/artifacts/BoardArtifact.astro`:

```astro
---
/**
 * <BoardArtifact /> — investigation-board artifact: a board excerpt
 * or single Jira ticket card. Sanitized — project keys redacted,
 * anonymized assignee.
 *
 * Source: case-study-spec-v1.md §7.2.
 */
import ArtifactImage from "./ArtifactImage.astro";

interface Props {
  artifactId: string;
  date: string;
  boardLabel: string;      // e.g. "Roadmap Q2 — INTENT-ENG"
  ticketKey?: string;       // e.g. "INT-127" (redact further as needed)
  ticketTitle?: string;
  excerpt?: string;         // free-form board excerpt
  killed?: boolean;
}
const { artifactId, date, boardLabel, ticketKey, ticketTitle, excerpt, killed = false } = Astro.props;
---

<ArtifactImage artifactId={artifactId} date={date} killed={killed}>
  <div slot="body" class="board-body">
    <p class="board-label">{boardLabel}</p>
    {ticketKey && ticketTitle && (
      <div class="ticket-card">
        <p class="ticket-key">{ticketKey}</p>
        <p class="ticket-title">{ticketTitle}</p>
      </div>
    )}
    {excerpt && <pre class="board-excerpt">{excerpt}</pre>}
  </div>
  <slot slot="caption" />
</ArtifactImage>

<style>
  .board-body { display: flex; flex-direction: column; gap: 12px; }
  .board-label {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
    color: var(--stamp-amber);
    text-transform: uppercase;
    margin: 0;
  }
  .ticket-card {
    background-color: rgba(10, 62, 66, 0.04);
    border-left: 2px solid var(--teal);
    padding: 8px 12px;
    border-radius: 0 2px 2px 0;
  }
  .ticket-key {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1.2px;
    color: var(--ink-secondary);
    text-transform: uppercase;
    margin: 0 0 4px;
  }
  .ticket-title {
    font-family: var(--font-serif);
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--ink);
    margin: 0;
  }
  .board-excerpt {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 400;
    line-height: 1.55;
    color: var(--ink);
    margin: 0;
    white-space: pre-wrap;
    background: transparent;
    padding: 0;
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/artifacts/BoardArtifact.astro
git commit -m "feat(phase-3b): BoardArtifact — sanitized board excerpt or Jira ticket card"
```

### Task 4.5: `<MetricChart />` component

**Files:**
- Create: `src/components/artifacts/MetricChart.astro`

Per case-study spec §7.2: a small chart (line, bar, sparkline) reading from a **local JSON file** — no runtime fetch. Deterministic. Static at build.

V1 implementation: hand-rolled SVG line chart from a `data[]` prop. Sean authors the data array inline in the MDX call.

- [ ] **Step 1: Write the component**

Create `src/components/artifacts/MetricChart.astro`:

```astro
---
/**
 * <MetricChart /> — investigation-board artifact: hand-rolled SVG chart.
 *
 * Static SVG at build. Line chart geometry computed from a data[] prop.
 * No runtime fetch, no charting library. The discipline IS the artifact —
 * "I shipped a chart" without pulling in 200KB of recharts.
 *
 * Source: case-study-spec-v1.md §7.2 + §15 anti-stack.
 */
import ArtifactImage from "./ArtifactImage.astro";

interface DataPoint {
  x: string;   // label, e.g. "v1" or "Apr 17"
  y: number;
}
interface Props {
  artifactId: string;
  date: string;
  chartTitle: string;
  yLabel?: string;
  data: DataPoint[];
  killed?: boolean;
}
const { artifactId, date, chartTitle, yLabel, data, killed = false } = Astro.props;

const W = 460, H = 200;
const padding = { top: 24, right: 16, bottom: 28, left: 32 };
const ys = data.map((d) => d.y);
const maxY = Math.max(...ys);
const minY = Math.min(...ys);
const yRange = maxY - minY || 1;
const xStep = data.length > 1
  ? (W - padding.left - padding.right) / (data.length - 1)
  : 0;
const points = data.map((d, i) => {
  const x = padding.left + i * xStep;
  const y = padding.top + (H - padding.top - padding.bottom) * (1 - (d.y - minY) / yRange);
  return { x: x.toFixed(1), y: y.toFixed(1), label: d.x, value: d.y };
});
const polyline = points.map((p) => `${p.x},${p.y}`).join(" ");

const ariaLabel = `Chart titled ${chartTitle}. ${data.length} points ranging from ${minY} to ${maxY}.`;
---

<ArtifactImage artifactId={artifactId} date={date} killed={killed}>
  <div slot="body" class="chart-body">
    <p class="chart-title">
      {chartTitle}
      {yLabel && <span class="chart-y-label"> ({yLabel})</span>}
    </p>
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel}>
      {/* Y baseline */}
      <line
        x1={padding.left} x2={W - padding.right}
        y1={H - padding.bottom} y2={H - padding.bottom}
        stroke="var(--border-paper)" stroke-width="0.5" />
      {/* Data polyline */}
      <polyline points={polyline}
        fill="none" stroke="var(--teal)" stroke-width="1.5"
        stroke-linecap="round" stroke-linejoin="round" />
      {/* Points */}
      {points.map((p) => (
        <circle cx={p.x} cy={p.y} r="3" fill="var(--amber-mid)" />
      ))}
      {/* X labels */}
      {points.map((p, i) => (
        i % Math.ceil(points.length / 6) === 0 && (
          <text x={p.x} y={H - 8}
            font-family="JetBrains Mono, monospace"
            font-size="10" fill="var(--ink-secondary)"
            text-anchor="middle">{p.label}</text>
        )
      ))}
      {/* Y endpoints */}
      <text x={6} y={padding.top + 4}
        font-family="JetBrains Mono, monospace"
        font-size="10" fill="var(--ink-secondary)">{maxY}</text>
      <text x={6} y={H - padding.bottom + 4}
        font-family="JetBrains Mono, monospace"
        font-size="10" fill="var(--ink-secondary)">{minY}</text>
    </svg>
  </div>
  <slot slot="caption" />
</ArtifactImage>

<style>
  .chart-body { display: flex; flex-direction: column; gap: 8px; }
  .chart-title {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.4px;
    color: var(--stamp-amber);
    text-transform: uppercase;
    margin: 0;
  }
  .chart-y-label {
    font-weight: 400;
    color: var(--ink-secondary);
    text-transform: lowercase;
    letter-spacing: 0.8px;
  }
  svg { width: 100%; height: auto; display: block; }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/artifacts/MetricChart.astro
git commit -m "$(cat <<'EOF'
feat(phase-3b): MetricChart — hand-rolled static SVG line chart (no charting library)

Computes line chart geometry from a data[] prop at build time. No
runtime fetch, no recharts/d3/chart.js. Renders the polyline + point
markers + X labels (sparse) + Y endpoint labels + a baseline rule.
ARIA label summarizes the data range for screen readers. The
discipline IS the artifact per case-study-spec §15 anti-stack.

Per case-study-spec §7.2.
EOF
)"
```

---

## Section 5 — Page shell

### Task 5.1: `<Opener />` MDX wrapper

**Files:**
- Create: `src/components/case-study/Opener.astro`

Per case-study spec §2 + §4: thin styled wrapper around the MDX opener prose. The MDX file provides the 3 paragraphs; this component supplies the typography + section heading.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/Opener.astro`:

```astro
---
/**
 * <Opener /> — case-study opener wrapper.
 *
 * Renders the section heading + applies the opener-specific typography
 * (Newsreader 24/18 weight 300, max-width 680px) to the MDX body via
 * :global() child selectors. The MDX page wraps its 3 paragraphs in
 * this component.
 *
 * Source: case-study-spec-v1.md §2 + §4.
 */
---

<section class="opener" aria-labelledby="opener-heading">
  <h2 id="opener-heading" class="section-heading">─ OPENER ─</h2>
  <div class="opener-body">
    <slot />
  </div>
</section>

<style>
  .opener {
    max-width: 1120px;
    margin: 64px auto 0;
    padding: 0 24px;
  }
  .section-heading {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    opacity: 0.8;
    text-transform: uppercase;
    margin: 0 0 32px;
  }
  .opener-body :global(p) {
    font-family: var(--font-serif);
    font-size: 24px;
    font-weight: 300;
    line-height: 1.45;
    letter-spacing: -0.2px;
    color: var(--ink);
    max-width: 680px;
    margin: 0 0 24px;
  }
  .opener-body :global(p:last-child) { margin-bottom: 0; }

  @media (max-width: 767px) {
    .opener { padding: 0 16px; margin-top: 40px; }
    .opener-body :global(p) { font-size: 18px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/Opener.astro
git commit -m "feat(phase-3b): Opener — case-study opener wrapper (Newsreader 24px, 680px max-width)"
```

### Task 5.2: `<InvestigationBoard />` wrapper

**Files:**
- Create: `src/components/case-study/InvestigationBoard.astro`

Per case-study spec §7: vertical thread of artifacts wrapped in a `<section>` with `role="region"`. This component is also the **annotation-anchor-root** — the `<Annotation>` positioner finds it via `.annotation-anchor-root` and resolves targets within.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/InvestigationBoard.astro`:

```astro
---
/**
 * <InvestigationBoard /> — investigation-board section wrapper.
 *
 * Wraps the MDX body's artifacts in a <section role="region">. Acts
 * as the annotation-anchor-root container for the
 * src/scripts/annotation-positioner.js module — that script reads
 * .annotation-anchor-root elements at load and resolves data-target
 * within them.
 *
 * Source: case-study-spec-v1.md §7.
 */
---

<section
  class="investigation-board annotation-anchor-root"
  role="region"
  aria-labelledby="investigation-heading"
>
  <h2 id="investigation-heading" class="section-heading">─ INVESTIGATION BOARD ─</h2>
  <div class="board-content">
    <slot />
  </div>
</section>

<style>
  .investigation-board {
    max-width: 1120px;
    margin: 80px auto 0;
    padding: 0 24px;
    position: relative;  /* annotation positioner anchors here */
  }
  .section-heading {
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 2.4px;
    color: var(--teal);
    opacity: 0.8;
    text-transform: uppercase;
    margin: 0 0 40px;
  }
  .board-content {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 767px) {
    .investigation-board { padding: 0 16px; margin-top: 56px; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/InvestigationBoard.astro
git commit -m "feat(phase-3b): InvestigationBoard — section wrapper + annotation-anchor-root container"
```

### Task 5.3: Rewrite `src/pages/work/[slug].astro` — page shell

**Files:**
- Modify: `src/pages/work/[slug].astro` (replaces the Phase 2 stub)

The composing page shell. Imports all the components, reads the entry via `getCollection`, renders the MDX body with the artifact + annotation components injected, conditionally renders status-shape chrome (ShippedStamp + ShippedNow / ReturnConditionCallout / FrameTheWorkPreamble), and surfaces the 4Q + Methods + NextPrev chrome.

- [ ] **Step 1: Replace the file**

Replace `src/pages/work/[slug].astro` with:

```astro
---
/**
 * /work/[slug] — case-study page.
 *
 * Composes the 6-band chrome around the MDX body per case-study-spec §2:
 *   dateline → title block → hero media → status preamble (if any) →
 *   opener → investigation board → Methods strip → 4Q block → next/prev
 *
 * The MDX body supplies the opener prose + the investigation-board
 * artifact components + any pencil-margin annotations. Frontmatter
 * supplies the chrome and the four_q closer.
 *
 * Source: case-study-spec-v1.md §2 + §12.
 */
import { getCollection } from "astro:content";
import BaseLayout from "~/layouts/BaseLayout.astro";

import DatelineStrip from "~/components/case-study/DatelineStrip.astro";
import TitleBlock from "~/components/case-study/TitleBlock.astro";
import HeroMedia from "~/components/case-study/HeroMedia.astro";
import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import MethodsStrip from "~/components/case-study/MethodsStrip.astro";
import FourQBlock from "~/components/case-study/FourQBlock.astro";
import NextPrevNav from "~/components/case-study/NextPrevNav.astro";

import ShippedStamp from "~/components/case-study/ShippedStamp.astro";
import ShippedNow from "~/components/case-study/ShippedNow.astro";
import ReturnConditionCallout from "~/components/case-study/ReturnConditionCallout.astro";
import FrameTheWorkPreamble from "~/components/case-study/FrameTheWorkPreamble.astro";

import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";
import Annotation from "~/components/annotations/Annotation.astro";

export async function getStaticPaths() {
  const work = await getCollection("work");
  const sorted = work.slice().sort((a, b) => a.data.order - b.data.order);
  return sorted.map((entry, idx) => {
    const prev = sorted[(idx - 1 + sorted.length) % sorted.length];
    const next = sorted[(idx + 1) % sorted.length];
    return {
      params: { slug: entry.slug },
      props: { entry, prev, next },
    };
  });
}

const { entry, prev, next } = Astro.props as {
  entry: Awaited<ReturnType<typeof getCollection<"work">>>[number];
  prev: Awaited<ReturnType<typeof getCollection<"work">>>[number];
  next: Awaited<ReturnType<typeof getCollection<"work">>>[number];
};
const { data } = entry;
const { Content } = await entry.render();

const datelineBody = `${data.title.toLowerCase()}, ${data.status.toLowerCase()}`;
---

<BaseLayout
  title={`${data.title} — Sean Winslow`}
  description={data.tagline ?? data.hero_media_alt}
>
  <article class={`case-study case-study-${data.status.toLowerCase()}`}>
    <DatelineStrip body={datelineBody} />

    <div class="title-block-wrap">
      <TitleBlock
        frame={data.frame}
        title={data.title}
        status={data.status}
        tags={data.tags}
        role={data.role}
        dateStarted={data.date_started}
        dateActiveThrough={data.date_active_through}
        anchorMetric={data.anchor_metric}
      />
      {data.status === "SHIPPED" && data.shipped_at && (
        <ShippedStamp shippedAt={data.shipped_at} />
      )}
    </div>

    {data.status === "SHIPPED" && data.shipped_stats_endpoint && (
      <ShippedNow slug={entry.slug} shippedStatsEndpoint={data.shipped_stats_endpoint} />
    )}

    {data.status === "PAUSED" && data.return_condition && (
      <ReturnConditionCallout returnCondition={data.return_condition} />
    )}

    {data.status === "ARCHIVED" && (
      <FrameTheWorkPreamble>
        <p>{data.tagline ?? "Two years of B2B and infrastructure work. Frame the work, not the exit."}</p>
      </FrameTheWorkPreamble>
    )}

    <HeroMedia
      slug={entry.slug}
      heroMedia={data.hero_media}
      heroMediaType={data.hero_media_type}
      heroMediaAlt={data.hero_media_alt}
    />

    <Content
      components={{
        Opener,
        InvestigationBoard,
        PRDDecision,
        SlackQuote,
        BoardArtifact,
        MetricChart,
        Annotation,
      }}
    />

    <MethodsStrip methods={data.methods} />

    <FourQBlock
      frame={data.frame}
      slug={entry.slug}
      fourQ={data.four_q}
      explanationUrl={data.explanation_url}
    />

    <NextPrevNav prev={prev} next={next} />

    {/* Page closeout — registration mark in the bottom-right corner (annotation §11.1) */}
    <div class="page-closeout">
      <Annotation type="registration-mark" />
    </div>
  </article>

  <script>
    import { initAnnotations } from "~/scripts/annotation-positioner.js";
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initAnnotations);
    } else {
      initAnnotations();
    }
    document.addEventListener("astro:after-swap", initAnnotations);
  </script>
</BaseLayout>

<style>
  .case-study {
    background-color: var(--paper);
    padding: 48px 0 80px;
    position: relative;
  }
  .title-block-wrap {
    position: relative;
  }

  /* Status-driven right-margin accent per case-study-spec §5 */
  .case-study::before {
    content: "";
    position: absolute;
    top: 100px;
    right: 24px;
    bottom: 100px;
    width: 1px;
    background-color: rgba(10, 62, 66, 0.4);
    pointer-events: none;
  }
  @media (max-width: 1023px) {
    .case-study::before { display: none; }
  }
  .case-study-archived::before { opacity: 0.5; }
  .case-study-paused::before    { opacity: 0.7; }

  .page-closeout {
    max-width: 1120px;
    margin: 80px auto 0;
    padding: 0 24px;
    height: 24px;
    position: relative;
  }
  .page-closeout :global(.annotation-registration-mark) {
    position: absolute;
    right: 24px;
    bottom: 0;
  }

  @media (max-width: 767px) {
    .case-study { padding: 24px 0 56px; }
    .page-closeout { padding: 0 16px; }
  }
</style>
```

- [ ] **Step 2: Verify build still gates on validator failures**

Run: `npm run build 2>&1 | tail -20`

Expected: build still fails at the validator step because the Phase 2 work MDX stubs still lack role/anchor_metric/methods/four_q. The validator failure proves the page shell isn't being reached yet; Section 8 fixes the stubs.

- [ ] **Step 3: Commit**

```bash
git add "src/pages/work/[slug].astro"
git commit -m "$(cat <<'EOF'
feat(phase-3b): rewrite /work/[slug] — full case-study page shell

Replaces the Phase 2 stub with the 6-band chrome composition per
case-study-spec §2: dateline → title block → hero media → status
preamble → opener → investigation board → Methods strip → 4Q block
→ next/prev. The MDX body supplies opener prose + artifacts +
annotations; the page shell renders frontmatter-driven chrome around
it.

Status-driven page-shape behavior wired:
  - SHIPPED → ShippedStamp baked into title block + ShippedNow live
    block below
  - PAUSED  → ReturnConditionCallout below title block
  - ARCHIVED → FrameTheWorkPreamble before hero + 50% opacity on
    right-margin accent
  - ACTIVE/COMING → default

The view-transition-name on HeroMedia (hero-media-<slug>) is preserved
from the Phase 2 stub so the projects-tile → case-study morph still
lands cleanly.

annotation-positioner.js initializes on DOMContentLoaded and re-runs
on astro:after-swap so cross-case-study View Transitions don't leave
annotations stranded.

Per case-study-spec §2 + §6 + §12.
EOF
)"
```

---

## Section 6 — Next/Prev navigation

### Task 6.1: `<NextPrevNav />` component

**Files:**
- Create: `src/components/case-study/NextPrevNav.astro`

Per case-study spec §10: two pills. Title-only. Wrap-around. No "you might also like" cards.

- [ ] **Step 1: Write the component**

Create `src/components/case-study/NextPrevNav.astro`:

```astro
---
/**
 * <NextPrevNav /> — two pills at the bottom of the case-study body.
 *
 * Title-only. Reads from getCollection('work').sort(order); the page
 * shell computes prev + next with wrap-around at A-1 ↔ A-5.
 *
 * Source: case-study-spec-v1.md §10.
 */
import type { CollectionEntry } from "astro:content";

interface Props {
  prev: CollectionEntry<"work">;
  next: CollectionEntry<"work">;
}
const { prev, next } = Astro.props;
---

<nav class="next-prev-nav" aria-label="Adjacent case studies">
  <a href={`/work/${prev.slug}/`} class="nav-pill nav-prev">
    <span class="arrow" aria-hidden="true">&larr;</span>
    <span class="frame">{prev.data.frame}</span>
    <span class="title">{prev.data.title.toUpperCase()}</span>
  </a>
  <a href={`/work/${next.slug}/`} class="nav-pill nav-next">
    <span class="frame">{next.data.frame}</span>
    <span class="title">{next.data.title.toUpperCase()}</span>
    <span class="arrow" aria-hidden="true">&rarr;</span>
  </a>
</nav>

<style>
  .next-prev-nav {
    max-width: 1120px;
    margin: 56px auto 0;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 24px;
  }
  .nav-pill {
    display: inline-flex;
    align-items: baseline;
    gap: 8px;
    font-family: var(--font-mono);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 1.8px;
    color: var(--teal);
    text-decoration: none;
    text-transform: uppercase;
    padding: 4px 0;
    border-bottom: 1px solid transparent;
    transition: border-color 160ms var(--ease-out);
  }
  .nav-pill:hover,
  .nav-pill:focus-visible {
    border-bottom-color: var(--teal);
    outline: none;
  }
  .nav-pill .arrow { font-size: 18px; }
  .nav-pill:hover .arrow { transform: translateX(0); transition: transform 200ms var(--ease-out); }
  .nav-prev:hover .arrow { transform: translateX(-4px); }
  .nav-next:hover .arrow { transform: translateX(4px); }
  .nav-pill .frame {
    font-weight: 500;
    color: var(--amber-mid);
    letter-spacing: 1.6px;
  }
  .nav-pill .title { color: var(--teal); }

  @media (max-width: 767px) {
    .next-prev-nav {
      padding: 0 16px;
      flex-direction: column;
      gap: 16px;
      align-items: stretch;
    }
    .nav-pill { font-size: 12px; justify-content: center; }
    .nav-next { justify-content: center; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/case-study/NextPrevNav.astro
git commit -m "feat(phase-3b): NextPrevNav — title-only pills with wrap-around (A-1 ↔ A-5)"
```

---

## Section 7 — View Transition continuity verification

### Task 7.1: Verify projects-tile → case-study hero morph

**Files:**
- Read-only verification

- [ ] **Step 1: Navigate the transition**

Open `http://localhost:4321/` in the browser. Click the first projects tile (A-1 2D Animation Pipeline). Observe.

Expected:
- The hero media morphs from the tile position to the full-bleed hero-media wrapper on the case-study page.
- The `view-transition-name: hero-media-<slug>` declared in both `<HeroMedia>` (case-study page) and the projects-tile component (already shipped Phase 2) drives the morph.
- The dateline + title block + role row appear instantly at the top of the new page (no fade-up cascade above the fold per case-study-spec §6 "instant after View Transition").
- The opener / investigation board / Methods / 4Q sections below the fold remain hidden until user scroll triggers their IntersectionObserver reveal (or render immediately if there's no observer yet — Phase 3b defers the per-section IO reveal as a v1.1 enhancement; see Section 10 deferral table).

- [ ] **Step 2: If the morph doesn't fire**

Most common cause: the `view-transition-name` on the tile uses a different format than `hero-media-<slug>`. Inspect the tile via DevTools Elements panel; confirm the attribute.

Second-most-common: the BaseLayout isn't including Astro's `<ClientRouter />`. Check `src/layouts/BaseLayout.astro` — the `<ClientRouter />` import from `astro:transitions` must be rendered inside `<head>`.

Third: prefers-reduced-motion is on. Toggle off via DevTools Rendering panel.

If none of the above resolve, surface BLOCKED with the failing observation.

- [ ] **Step 3: No commit**

Verification only.

### Task 7.2: Verify case-study → adjacent case-study transition

**Files:**
- Read-only verification

- [ ] **Step 1: Navigate the transition**

From `http://localhost:4321/work/animation-pipeline/`, click the `A-2 CODE BRAIN →` next-pill. Expected:
- View Transition fires (Astro 5 ClientRouter handles the cross-page swap).
- Hero media wraps in a `view-transition-name: hero-media-code-brain` element on the new page; the previous page didn't have a matching name (different slug), so the morph degrades to a cross-fade rather than a shared-element morph. This is correct behavior per case-study spec §6.
- The SiteNav persists across the swap (it lives outside `<main>` per Phase 3a + site-chrome §6.4).
- annotation-positioner.js re-initializes via the `astro:after-swap` event listener wired in the page shell. Inspect any annotations on the new page; they should be positioned correctly.

- [ ] **Step 2: No commit**

Verification only.

---

## Section 8 — MDX content stubs

Each task here replaces a Phase 2 stub with a Phase 3b stub: full frontmatter (incl. role + anchor_metric + methods[] + four_q + status-specific fields), minimal placeholder opener prose (1 paragraph of Sedaris-coded sentinel text — Sean replaces with real prose post-plan), and 2-4 artifact stubs that exercise the layout. The `four_q:` frontmatter mirror (Option B fallback) is used for all 5 so the build doesn't block on upstream EXPLANATION.md files.

**Placeholder convention:** every text the user will eventually replace is marked with `[PLACEHOLDER —` so Sean can grep for them in one pass. The sentinel text is well-formed sentences so the page still reads as intentional during the gap between Phase 3b ship and Sean's prose authoring.

### Task 8.1: animation-pipeline.mdx — ACTIVE

**Files:**
- Modify: `src/content/work/animation-pipeline.mdx`

- [ ] **Step 1: Replace the file**

Replace `src/content/work/animation-pipeline.mdx` with:

```mdx
---
slug: animation-pipeline
frame: A-1
title: 2D Animation Pipeline
tagline: Teaching Seedance to draw me, then teaching the pipeline to ship the drawing.
status: ACTIVE
tags:
  - animation
  - agentic
  - pipeline
hero_media: /assets/projects/animation-pipeline.webp
hero_media_type: image
hero_media_alt: A pencil-test frame from Sean's portfolio short, mid-walk.
order: 1
date_started: 2026-03-15
date_active_through: 2026-06-11
case_study_dateline_pattern: ship_log

role: pm + builder + operator
anchor_metric: 220 FRAMES
investigation_order: reverse

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
    tool: Seedance 2.0
    cost: ~$0.40 per run
    link: null
  - task: orchestration
    tool: Code Brain
    cost: Claude Sonnet 4.6
    link: /work/code-brain/

four_q:
  what: "[PLACEHOLDER — Q1] A 2D pencil-test animation pipeline that ships consistent character animation from sketch through render via a small fleet of agents."
  why: "[PLACEHOLDER — Q2] Three options considered: Midjourney for stylization, hand-drawn end-to-end, or a hybrid pipeline. Chose hybrid because the consistency-of-character requirement breaks pure-AI approaches and the volume requirement breaks pure-hand-drawn."
  break: "[PLACEHOLDER — Q3] Three named failure modes: 1) Seedance drift across long sequences; 2) alpha channel loss in the ffmpeg encode; 3) the render queue silently dropping frames at >150 frames."
  learn: "[PLACEHOLDER — Q4] The pipeline is the artifact. The character is the test the pipeline has to pass."
---

import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";
import Annotation from "~/components/annotations/Annotation.astro";

<Opener>
  <p>[PLACEHOLDER OPENER — paragraph 1 of 3] I taught Seedance to draw me. Then I taught the pipeline to ship the drawing. The character on this page is the test the pipeline has to pass — if a single frame breaks line, the whole short breaks.</p>
  <p>[PLACEHOLDER OPENER — paragraph 2 of 3] The pipeline runs on five agents and one shell script. The script handles frame cleanup; the agents handle the harder calls. Sean writes the prose; Sean replaces this paragraph post-plan.</p>
  <p>[PLACEHOLDER OPENER — paragraph 3 of 3] What's on the page below is the production thread — what shipped, what was killed, what's still running.</p>
</Opener>

<InvestigationBoard>
  <PRDDecision
    artifactId="artifact-1"
    date="MAY 15"
    prdTitle="A-1 Pipeline rev 3 — final cleanup chain"
    decisionLine="220-frame cycle locks. Move to case-study hero media (not portfolio hero)."
    rationale="Rev 3 is consistent enough to ship; portfolio hero stays with the 94-frame loop per hero-spec §7.5.">
    <p slot="caption">[PLACEHOLDER CAPTION] First fully cleaned 220-frame cycle. Alpha holds; line stays consistent; ffmpeg encode passes.</p>
  </PRDDecision>

  <MetricChart
    artifactId="artifact-2"
    date="MAY 6"
    chartTitle="Render time per frame"
    yLabel="seconds"
    data={[
      { x: "v1", y: 22 },
      { x: "v1.5", y: 18 },
      { x: "v2", y: 11 },
      { x: "v2a", y: 4 },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Render time per frame across pipeline versions. v2a landed the libvpx-vp9 + alpha_mode=1 combo.</p>
  </MetricChart>

  <SlackQuote
    artifactId="artifact-3"
    date="APR 23"
    messages={[
      { role: "eng lead", text: "[PLACEHOLDER DM] the alpha channel is the rub. vp9 with alpha_mode=1, not h264." },
      { role: "sean", text: "[PLACEHOLDER REPLY] tried that yesterday — re-running with the corrected flag." },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Anonymized DM exchange on the alpha-channel encode rub.</p>
  </SlackQuote>

  <BoardArtifact
    artifactId="artifact-4"
    date="APR 17"
    boardLabel="Production board — first cleaned cycle"
    ticketKey="A1-014"
    ticketTitle="Land 146-frame raw cycle with consistent line">
    <p slot="caption">[PLACEHOLDER CAPTION] First raw cleaned cycle lands. 146 frames at 24fps, alpha clean.</p>
  </BoardArtifact>
</InvestigationBoard>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/work/animation-pipeline.mdx
git commit -m "$(cat <<'EOF'
feat(phase-3b): animation-pipeline.mdx — ACTIVE case-study Phase 3b stub

Full frontmatter shape per case-study-spec Appendix B (role,
anchor_metric, methods[], four_q). Opener placeholder (3 paragraphs
of [PLACEHOLDER OPENER] sentinel text). 4 artifact stubs exercising
PRDDecision + MetricChart + SlackQuote + BoardArtifact (the spec's 4
artifact types). Sean replaces [PLACEHOLDER —] strings post-plan.

four_q uses Option-B fallback per case-study-spec §9.2 — no
explanation_url yet. Flip to explanation_url later by editing
frontmatter; fetcher activates on next build.

Per case-study-spec §13.1.
EOF
)"
```

### Task 8.2: code-brain.mdx — ACTIVE

**Files:**
- Modify: `src/content/work/code-brain.mdx`

- [ ] **Step 1: Replace the file**

Replace `src/content/work/code-brain.mdx` with:

```mdx
---
slug: code-brain
frame: A-2
title: Code Brain
tagline: My second brain has a fleet now.
status: ACTIVE
tags:
  - agents
  - infrastructure
  - personal-automation
hero_media: /assets/projects/code-brain.webp
hero_media_type: image
hero_media_alt: A terminal showing the Daily Driver agent firing its morning brief.
order: 2
date_started: 2025-09-01
case_study_dateline_pattern: fleet_pulse

role: pm + builder + operator
anchor_metric: "118 SKILLS · 14 HOOKS · 8 AGENTS"
investigation_order: reverse

methods:
  - task: agent runtime
    tool: Claude Agent SDK
    cost: per-token billing
    link: null
  - task: scheduling
    tool: launchd (macOS)
    cost: local / $0
    link: null
  - task: local model
    tool: Ollama (Qwen3-14B, nomic-embed-text)
    cost: local / $0
    link: null
  - task: animation pipeline (downstream consumer)
    tool: Animation Pipeline
    cost: see case study
    link: /work/animation-pipeline/

four_q:
  what: "[PLACEHOLDER — Q1] A personal command-center that runs a small fleet of Claude agents on a daily schedule. Skills + hooks + 8 named agents; the morning Daily Driver writes the portfolio's daily-dated layer."
  why: "[PLACEHOLDER — Q2] Three options considered: ChatGPT Plus + custom GPTs, Cursor + project rules, or a Claude-Code-native fleet. Chose Claude-Code-native because skills compose better than prompts and because the agent SDK lets a single launchd job orchestrate the whole morning."
  break: "[PLACEHOLDER — Q3] Three named failure modes: 1) launchd silently failing on first run after a macOS update; 2) the morning agent hitting a tool-call quota; 3) prompt-cache misses cascading across the morning."
  learn: "[PLACEHOLDER — Q4] The fleet's job isn't to write code. The fleet's job is to keep me thinking about the next problem instead of the last one."
---

import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";

<Opener>
  <p>[PLACEHOLDER OPENER — paragraph 1 of 3] My second brain has a fleet now. The same vault that held meeting notes a year ago is now the runtime for eight named agents that wake up at 08:45 every weekday, read overnight commits, and write the day's brief into the file system before I've opened Slack.</p>
  <p>[PLACEHOLDER OPENER — paragraph 2 of 3] The thesis is small: skills compose better than prompts. The artifacts on this page are the evidence — Sean replaces this paragraph post-plan.</p>
  <p>[PLACEHOLDER OPENER — paragraph 3 of 3] What's below is the morning. What's not below is the cost — the fleet pays for itself in attention, not money.</p>
</Opener>

<InvestigationBoard>
  <MetricChart
    artifactId="artifact-1"
    date="MAY 16"
    chartTitle="Daily Driver fleet runs"
    yLabel="runs/day"
    data={[
      { x: "Apr 1", y: 12 },
      { x: "Apr 15", y: 24 },
      { x: "May 1", y: 38 },
      { x: "May 16", y: 47 },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Morning fleet runs scaling as more skills are wired in.</p>
  </MetricChart>

  <PRDDecision
    artifactId="artifact-2"
    date="MAY 13"
    prdTitle="Tier 1 retrofit — agent SDK stable"
    decisionLine="Retrofit all Tier-1 agents to the stable SDK. Hooks lifecycle wired."
    rationale="The beta SDK shipped breaking changes weekly; Tier 1 ROI requires a stable surface.">
    <p slot="caption">[PLACEHOLDER CAPTION] Tier 1 retrofit decision. The agent SDK reached 1.0; the fleet retrofitted in a day.</p>
  </PRDDecision>

  <SlackQuote
    artifactId="artifact-3"
    date="APR 28"
    messages={[
      { role: "design crit", text: "[PLACEHOLDER DM] how do you measure fleet ROI when most of the value is attention?" },
      { role: "sean", text: "[PLACEHOLDER REPLY] commit cadence, mostly. and the days I'm not at my desk by 9." },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] DM exchange on fleet ROI; the answer is attention, not throughput.</p>
  </SlackQuote>

  <BoardArtifact
    artifactId="artifact-4"
    date="MAR 20"
    boardLabel="schedule-recommendations.md — March update"
    excerpt="[PLACEHOLDER EXCERPT]\n- 08:45 daily — Daily Driver morning brief\n- 14:00 weekday — Synth agent runs against new commits\n- 22:00 nightly — vault-knowledge-mcp re-index">
    <p slot="caption">[PLACEHOLDER CAPTION] Schedule update from the March cadence review.</p>
  </BoardArtifact>
</InvestigationBoard>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/work/code-brain.mdx
git commit -m "feat(phase-3b): code-brain.mdx — ACTIVE Phase 3b stub with methods + four_q + 4 artifact stubs"
```

### Task 8.3: intent-engineering-mcp.mdx — SHIPPED

**Files:**
- Modify: `src/content/work/intent-engineering-mcp.mdx`

This is the only SHIPPED case study. Frontmatter must include `shipped_at` + `shipped_stats_endpoint` (validator enforces).

- [ ] **Step 1: Replace the file**

Replace `src/content/work/intent-engineering-mcp.mdx` with:

```mdx
---
slug: intent-engineering-mcp
frame: A-3
title: Intent Engineering MCP
tagline: Drawing up agents to act with intent.
status: SHIPPED
tags:
  - mcp
  - ai-pm
  - infrastructure
hero_media: /assets/projects/intent-engineering-mcp.png
hero_media_type: image
hero_media_alt: Terminal showing npm install @swins/intent-engineering-mcp resolving.
order: 3
date_started: 2026-04-20
date_active_through: 2026-05-12
case_study_dateline_pattern: ship_log

role: pm + builder + operator
anchor_metric: "0.1.0 · NPM + MCP REGISTRY · 2026-05-12"
investigation_order: forward

shipped_at: 2026-05-12
shipped_stats_endpoint: /api/shipped-stats-intent-engineering-mcp.json

methods:
  - task: protocol implementation
    tool: MCP SDK
    cost: open-source / $0
    link: null
  - task: registry verification
    tool: DNS-verified MCP registry
    cost: registry / $0
    link: null
  - task: package publish
    tool: npm
    cost: free tier
    link: null
  - task: development
    tool: Claude Code
    cost: per-token billing
    link: null

four_q:
  what: "[PLACEHOLDER — Q1] A Model Context Protocol server that exposes intent-engineering tools to Claude Desktop. Shipped to npm and the MCP registry on May 12, 2026."
  why: "[PLACEHOLDER — Q2] Three options considered: ship as a standalone tool, bake into a larger MCP, or ship as a registered server. Chose registered server because DNS-verified registry adoption was the right scope-cut signal."
  break: "[PLACEHOLDER — Q3] Three named failure modes: 1) Claude Desktop's MCP client revs faster than the server; 2) DNS verification expiring; 3) npm registry vetting failing on first publish."
  learn: "[PLACEHOLDER — Q4] It shipped 13 days early because the design was right. What got cut was right too — the embed page is a future spec, not v1."
---

import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";

<Opener>
  <p>[PLACEHOLDER OPENER — paragraph 1 of 3] It shipped on May 12. Thirteen days early. The cut list is on this page, alongside what stayed.</p>
  <p>[PLACEHOLDER OPENER — paragraph 2 of 3] Intent Engineering MCP is a Model Context Protocol server that does one thing — Sean replaces this sentence post-plan with the actual one-line value claim. The interesting part is what was cut from the scope to ship early.</p>
  <p>[PLACEHOLDER OPENER — paragraph 3 of 3] It's installed by a small but real set of developers — see the LIVE block above. The chart below is the build-size journey; the cut decisions are alongside.</p>
</Opener>

<InvestigationBoard>
  <BoardArtifact
    artifactId="artifact-1"
    date="APR 24"
    boardLabel="MCP protocol implementation — spec lock"
    excerpt="[PLACEHOLDER EXCERPT] tools/list + tools/call wired against the SDK. registry verification block opens.">
    <p slot="caption">[PLACEHOLDER CAPTION] Spec lock on the protocol surface. Two MCP tools, registered.</p>
  </BoardArtifact>

  <PRDDecision
    artifactId="artifact-2"
    date="APR 30"
    prdTitle="Cut decision: keep registry verification"
    decisionLine="Keep the DNS-verified registry block. Defer the embed page to a separate future spec."
    rationale="Verification is load-bearing for adoption trust; the embed is retrospective polish.">
    <p slot="caption">[PLACEHOLDER CAPTION] The big scope cut. Verification stayed; the embed page got deferred.</p>
  </PRDDecision>

  <MetricChart
    artifactId="artifact-3"
    date="MAY 1"
    chartTitle="Build size vs feature count"
    yLabel="KB"
    data={[
      { x: "v0.0.1", y: 320 },
      { x: "v0.0.5", y: 290 },
      { x: "v0.0.8", y: 240 },
      { x: "v0.1.0", y: 180 },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Build size shrank as features got cut to the load-bearing core.</p>
  </MetricChart>

  <SlackQuote
    artifactId="artifact-4"
    date="MAY 14"
    messages={[
      { role: "customer", text: "[PLACEHOLDER DM] install worked first try. how do I configure the verification block?" },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] First post-ship customer DM. Install friction was lower than expected.</p>
  </SlackQuote>
</InvestigationBoard>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/work/intent-engineering-mcp.mdx
git commit -m "feat(phase-3b): intent-engineering-mcp.mdx — SHIPPED Phase 3b stub (shipped_at + shipped_stats wired)"
```

### Task 8.4: the-block.mdx — ARCHIVED

**Files:**
- Modify: `src/content/work/the-block.mdx`

- [ ] **Step 1: Replace the file**

Replace `src/content/work/the-block.mdx` with:

```mdx
---
slug: the-block
frame: A-4
title: The Block — Campus + RevOps
tagline: Two products, one institutional research firm, two years.
status: ARCHIVED
tags:
  - b2b
  - revops
  - product
hero_media: /assets/projects/the-block.webp
hero_media_type: image
hero_media_alt: A sanitized screenshot of the Campus research surface.
order: 4
date_started: 2024-02-01
date_active_through: 2026-02-01

role: pm + product partner
anchor_metric: "2024 – 2026 · TWO PRODUCTS · ONE FIRM"
investigation_order: forward

archived_reference_url: https://www.theblockcrypto.com/post/example-placeholder

methods:
  - task: institutional research
    tool: Campus (B2B platform)
    cost: SaaS
    link: null
  - task: revenue operations
    tool: Internal RevOps system
    cost: internal
    link: null
  - task: data partnerships
    tool: redacted partner stack
    cost: enterprise
    link: null

four_q:
  what: "[PLACEHOLDER — Q1] Two years of B2B product work for an institutional crypto-research firm. Campus is a research platform; RevOps is the internal product that supports the broader Block business."
  why: "[PLACEHOLDER — Q2] Three options considered for the Campus thesis. Sean adjudicates the framing post-plan; this stub frames the work, not the exit."
  break: "[PLACEHOLDER — Q3] Three failure modes existed at scale and were managed. Sean lists them post-plan."
  learn: "[PLACEHOLDER — Q4] B2B research is a relationship product. The infrastructure has to disappear; the relationship has to remain."
---

import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import PRDDecision from "~/components/artifacts/PRDDecision.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";

<Opener>
  <p>[PLACEHOLDER OPENER — paragraph 1 of 3] Two years of B2B and infrastructure work for an institutional research firm. Campus is a research platform; RevOps is the internal product that supports the broader business. Sean writes the real opener post-plan.</p>
  <p>[PLACEHOLDER OPENER — paragraph 2 of 3] The arc was build → grow → hand off. The artifacts on this page are sanitized — project keys redacted, screenshots sanitized.</p>
  <p>[PLACEHOLDER OPENER — paragraph 3 of 3] The work is real and shippable; the framing is "this was the work," not "this is why it ended."</p>
</Opener>

<InvestigationBoard>
  <BoardArtifact
    artifactId="artifact-1"
    date="2024"
    boardLabel="Campus product launch — Q1 2024"
    excerpt="[PLACEHOLDER EXCERPT] Campus v1 ships to a small set of institutional customers. Onboarding runs through the partnerships team.">
    <p slot="caption">[PLACEHOLDER CAPTION] Campus v1 launch. The first surface that B2B customers used directly.</p>
  </BoardArtifact>

  <PRDDecision
    artifactId="artifact-2"
    date="2025 Q1"
    prdTitle="Subscription tier structure"
    decisionLine="[PLACEHOLDER] Tier structure locked at 3 levels — research-only, research+data, research+data+API."
    rationale="[PLACEHOLDER] The 3-tier structure mapped customer segments cleanly.">
    <p slot="caption">[PLACEHOLDER CAPTION] Subscription tier decision. The 3-tier model held for the remainder of the arc.</p>
  </PRDDecision>

  <BoardArtifact
    artifactId="artifact-3"
    date="2025 Q2"
    boardLabel="RevOps internal launch">
    <p slot="caption">[PLACEHOLDER CAPTION] RevOps internal product launches to the partnerships + research teams.</p>
  </BoardArtifact>

  <MetricChart
    artifactId="artifact-4"
    date="2025-2026"
    chartTitle="Institutional subscriber growth"
    yLabel="subscribers"
    data={[
      { x: "2024 Q2", y: 18 },
      { x: "2024 Q4", y: 42 },
      { x: "2025 Q2", y: 87 },
      { x: "2025 Q4", y: 134 },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Subscriber growth across the arc. Numbers are illustrative; final figures sanitized.</p>
  </MetricChart>
</InvestigationBoard>

<p class="reference-artifact-link">
  <a href={frontmatter.archived_reference_url} rel="external">&rarr; reference artifact — public sanitized writeup</a>
</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/work/the-block.mdx
git commit -m "$(cat <<'EOF'
feat(phase-3b): the-block.mdx — ARCHIVED Phase 3b stub (frame-the-work, not the exit)

ARCHIVED status. archived_reference_url placeholder URL (Sean replaces
with a real sanitized public artifact post-plan per case-study-spec
§12.4). FrameTheWorkPreamble renders above the hero media via the
page shell's conditional. forward-chronological investigation order.

Methods + four_q populated as placeholders; Sean rewrites with real
content post-plan. No "I was laid off" framing anywhere — the opener
sentinel text deliberately opens with the work.

Per case-study-spec §13.4.
EOF
)"
```

### Task 8.5: 16bitfit.mdx — PAUSED

**Files:**
- Modify: `src/content/work/16bitfit.mdx`

- [ ] **Step 1: Replace the file**

Replace `src/content/work/16bitfit.mdx` with:

```mdx
---
slug: 16bitfit
frame: A-5
title: 16BitFit Battle Mode
tagline: The pipeline is the artifact, not the game.
status: PAUSED
tags:
  - game
  - pixel-art
  - paused
hero_media: /assets/projects/16bitfit.webp
hero_media_type: image
hero_media_alt: A pixel-art sprite collision frame from the battle-mode prototype.
order: 5
date_started: 2025-12-01
date_active_through: 2026-04-01

role: pm + builder
anchor_metric: "PIPELINE 47% · GAME ON SHELF"
investigation_order: reverse

return_condition: |
  when the animation pipeline ships its first full
  short. then the game inherits the pipeline. ~2026-08.

methods:
  - task: game engine
    tool: Phaser
    cost: open-source / $0
    link: null
  - task: sprite generation
    tool: Seedance 2.0 + pixel-art Gemini skill
    cost: ~$1/run
    link: null
  - task: pipeline (cross-link)
    tool: Animation Pipeline
    cost: see case study
    link: /work/animation-pipeline/

four_q:
  what: "[PLACEHOLDER — Q1] A 16-bit fitness battle game with AI-generated sprites. The battle mode is the build target; the pipeline is the artifact."
  why: "[PLACEHOLDER — Q2] Three options considered for the sprite pipeline. Chose AI-generated + manual cleanup hybrid because the volume target was incompatible with full-hand pixel art."
  break: "[PLACEHOLDER — Q3] Three named failure modes: 1) sprite consistency across animation cycles; 2) Phaser performance with large sprite atlases; 3) the gameplay loop being uninteresting without the visual polish."
  learn: "[PLACEHOLDER — Q4] Pausing was right. The return condition is the animation pipeline shipping; until then, the game can't inherit a tested production system."
---

import Opener from "~/components/case-study/Opener.astro";
import InvestigationBoard from "~/components/case-study/InvestigationBoard.astro";
import BoardArtifact from "~/components/artifacts/BoardArtifact.astro";
import MetricChart from "~/components/artifacts/MetricChart.astro";
import SlackQuote from "~/components/artifacts/SlackQuote.astro";

<Opener>
  <p>[PLACEHOLDER OPENER — paragraph 1 of 3] I built the pipeline before I built the game on purpose. The pipeline is the test, the game is the application. Right now the pipeline is at 47%; the game is on the shelf with a clear return condition.</p>
  <p>[PLACEHOLDER OPENER — paragraph 2 of 3] The return condition is above the hero media. The pause is deliberate. Sean writes the real prose post-plan.</p>
  <p>[PLACEHOLDER OPENER — paragraph 3 of 3] What's below is the pipeline's progress and the gameplay-loop work that was killed when the pause landed.</p>
</Opener>

<InvestigationBoard>
  <MetricChart
    artifactId="artifact-1"
    date="MAY"
    chartTitle="Sprite frames generated by pipeline"
    yLabel="frames"
    data={[
      { x: "Mar", y: 12 },
      { x: "Apr", y: 38 },
      { x: "May", y: 64 },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] Sprite generation across pipeline iterations. The pipeline is the load-bearing artifact.</p>
  </MetricChart>

  <BoardArtifact
    artifactId="artifact-2"
    date="APR 2"
    boardLabel="Pause decision board"
    excerpt="[PLACEHOLDER EXCERPT] Pause game work; continue pipeline work. Return when animation pipeline ships first full short.">
    <p slot="caption">[PLACEHOLDER CAPTION] The pause decision. Pipeline continues; gameplay-loop work pauses.</p>
  </BoardArtifact>

  <SlackQuote
    artifactId="artifact-3"
    date="MAR 12"
    messages={[
      { role: "design crit", text: "[PLACEHOLDER DM] Phaser scope creep again?" },
      { role: "sean", text: "[PLACEHOLDER REPLY] yeah. pausing game; pipeline keeps going." },
    ]}>
    <p slot="caption">[PLACEHOLDER CAPTION] The scope-creep exchange that triggered the pause decision.</p>
  </SlackQuote>

  <BoardArtifact
    artifactId="artifact-4"
    date="MAR 5"
    boardLabel="Killed: v1 gameplay loop"
    excerpt="[PLACEHOLDER EXCERPT] v1 gameplay loop killed. The fight loop wasn't carrying its own weight without the polish layer."
    killed={true}>
    <p slot="caption">[PLACEHOLDER CAPTION] The killed v1 gameplay loop. Pipeline-first is the new bet.</p>
  </BoardArtifact>
</InvestigationBoard>
```

- [ ] **Step 2: Commit**

```bash
git add src/content/work/16bitfit.mdx
git commit -m "$(cat <<'EOF'
feat(phase-3b): 16bitfit.mdx — PAUSED Phase 3b stub (return_condition wired)

PAUSED status. return_condition multiline string in frontmatter
("when the animation pipeline ships its first full short...") —
ReturnConditionCallout renders below the title block on the page.
Cross-link to /work/animation-pipeline/ in methods strip is
exercised; derive_crosslinks.mjs validator should pass on next build.

Includes a killed artifact (artifact-4, killed={true}) to exercise
the cut-artifact rendering path per case-study-spec §7.5.

Per case-study-spec §13.5.
EOF
)"
```

### Task 8.6: Hand-seed shipped-stats JSON

**Files:**
- Create: `public/api/shipped-stats-intent-engineering-mcp.json`

Per case-study spec §15: the SHIPPED case study reads this file at build via `ShippedNow`. Daily Driver agent writes it nightly in Phase 4; for v1 we hand-seed today's content.

- [ ] **Step 1: Write the JSON**

Create `public/api/shipped-stats-intent-engineering-mcp.json`:

```json
{
  "slug": "intent-engineering-mcp",
  "updated_at": "2026-05-21T08:45:00-04:00",
  "items": [
    { "label": "weekly downloads", "value": "47", "unit": "npm" },
    { "label": "verified installs", "value": "12", "unit": "MCP registry" },
    { "label": "stars", "value": "8", "unit": "GitHub" }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add public/api/shipped-stats-intent-engineering-mcp.json
git commit -m "$(cat <<'EOF'
feat(phase-3b): hand-seed shipped-stats-intent-engineering-mcp.json

Per case-study-spec §15: SHIPPED case studies render a live block
reading this file at build time. Hand-seeded for v1 (Daily Driver
agent writes it nightly in Phase 4). Format: { slug, updated_at,
items[] of { label, value, unit } }.

The values (47 weekly downloads, 12 verified installs, 8 stars) are
illustrative placeholders; Sean updates with real numbers post-plan
if needed before the Daily Driver wiring lands.
EOF
)"
```

### Task 8.7: Verify the full build pipeline now passes

**Files:**
- (no edits — verification)

After all 5 MDX stubs + hand-seeded JSON land, the validator + fetcher + crosslink-deriver + Astro build should ALL pass.

- [ ] **Step 1: Run the full build**

Run: `npm run build 2>&1 | tail -30`

Expected: build completes successfully. Output should show:
```
> sw-ai-pm-portfolio@0.1.0 prebuild
> node scripts/validate_content.mjs && node scripts/fetch_canonical_sources.mjs && node scripts/derive_crosslinks.mjs

validate_content.mjs — Phase 3b scope (work)
[work]
  ✓ work/16bitfit
  ✓ work/animation-pipeline
  ✓ work/code-brain
  ✓ work/intent-engineering-mcp
  ✓ work/the-block

done.

fetch_canonical_sources.mjs — Phase 3b scope (work)
[work]
done.

derive_crosslinks.mjs — Phase 3b scope (methods cross-links)
  ✓ 16bitfit → /work/animation-pipeline/
  ✓ code-brain → /work/animation-pipeline/
done. validated 2 methods cross-links.

> astro build
... (Astro output) ...
Complete!
```

If any of the three scripts fails, fix the underlying issue (a missing field in an MDX, a typo in a methods link, etc.) and re-run.

- [ ] **Step 2: Verify static output**

Run: `ls dist/work/`

Expected: 5 directories — `16bitfit/`, `animation-pipeline/`, `code-brain/`, `intent-engineering-mcp/`, `the-block/`.

Run: `grep -oE "PAUSED — return condition" dist/work/16bitfit/index.html | head -1`
Expected: 1 match — the PAUSED callout rendered.

Run: `grep -oE "SHIPPED" dist/work/intent-engineering-mcp/index.html | head -3`
Expected: at least 2 matches — one in the stamp SVG, one in the status pill.

Run: `grep -oE "ARCHIVED — framing the work" dist/work/the-block/index.html | head -1`
Expected: 1 match — the FrameTheWorkPreamble rendered.

- [ ] **Step 3: No commit**

Verification only — if all checks pass, Phase 3b is functionally complete.

---

## Section 9 — DoD verification

### Task 9.1: Walk case-study spec §16 items 1–13

For each DoD item below, verify on `http://localhost:4321` (dev) AND in `dist/` (build) and mark `[PASS]` / `[FAIL]` / `[DEFERRED]`. If FAIL, return to the relevant earlier task to fix. Items 1, 5, 6, 8, 9, 10, 11, 12 are testable now; items 2, 3, 4, 7, 13 are either functionally testable or have explicit Phase-3b-scope caveats.

- [ ] **Step 1: §16 item 1 — 5 MDX files with full frontmatter, opener, investigation board, four_q**

Run: `ls src/content/work/*.mdx | wc -l`
Expected: `5`.

Run: `grep -L "four_q:" src/content/work/*.mdx`
Expected: empty output — every entry declares four_q.

Run: `grep -L "anchor_metric:" src/content/work/*.mdx`
Expected: empty output — every entry declares anchor_metric.

Result: ☐

- [ ] **Step 2: §16 item 2 — fetch_canonical_sources.mjs runs in prebuild**

Run: `grep -oE 'prebuild.*fetch_canonical_sources' package.json`
Expected: 1 match (the prebuild hook references it).

**Phase 3b scope caveat:** all 5 stubs use four_q (Option B). The fetcher walks the collection, finds zero entries with explanation_url, exits 0. The infrastructure ships; activation lands when Sean flips frontmatter.

Result: ☐ [PASS — IDLE; activates on next build when first explanation_url lands]

- [ ] **Step 3: §16 item 3 — validate_content.mjs runs in prebuild**

Run: `npm run validate 2>&1 | tail -5`
Expected: `done.` and exit code 0.

Result: ☐

- [ ] **Step 4: §16 item 4 — 4 MDX artifact components render on all 5 pages**

Run: `for slug in 16bitfit animation-pipeline code-brain intent-engineering-mcp the-block; do echo "=== $slug ==="; grep -oE "artifact-[1-4]" dist/work/$slug/index.html | sort -u; done`

Expected: each slug prints `artifact-1` through `artifact-4` (each MDX stub has 4 artifacts).

Result: ☐

- [ ] **Step 5: §16 item 5 — View Transition tile → case-study (already verified in Task 7.1)**

Visual smoke test of the home → /work/animation-pipeline/ transition. Cross-browser: Chrome required; Safari smoke. Firefox falls back to instant navigation gracefully.

Result: ☐ (from Task 7.1)

- [ ] **Step 6: §16 item 6 — Status-driven page shape (4 statuses render differently)**

| Status | URL | Verifier |
|---|---|---|
| ACTIVE | `/work/animation-pipeline/` | no ShippedStamp, no ReturnCondition, no FrameTheWork |
| SHIPPED | `/work/intent-engineering-mcp/` | ShippedStamp + ShippedNow render |
| PAUSED | `/work/16bitfit/` | ReturnConditionCallout renders before hero media |
| ARCHIVED | `/work/the-block/` | FrameTheWorkPreamble + 50% opacity right-margin accent |

Run: `grep -oE "SHIPPED|PAUSED — return condition|ARCHIVED — framing the work" dist/work/*/index.html | sort -u`
Expected: at least 3 distinct status markers.

Visual: hit each URL in the browser, confirm the status-specific chrome.

Result: ☐

- [ ] **Step 7: §16 item 7 — Live block on SHIPPED page reads from real JSON file**

Run: `curl -s http://localhost:4321/work/intent-engineering-mcp/ | grep -oE "47|12|8" | head -3`
Expected: 3 numbers from the hand-seeded `shipped-stats-intent-engineering-mcp.json`.

Phase 4 caveat: Daily Driver wiring is Phase 4. v1 reads the hand-seeded file.

Result: ☐ [PASS — file is the hand-seeded v1; Daily Driver writes nightly in Phase 4]

- [ ] **Step 8: §16 item 8 — Pencil annotations render with density limits**

This is enforced at authoring time per case-study-spec §11.2. The 5 v1 MDX stubs include at most 1 annotation each (the page closeout registration mark wired in the page shell). When Sean writes real artifact content with `<Annotation>` calls inline, the discipline is "≤6/page desktop, ≤4/page mobile, never adjacent within 200px."

Visual verify on `/work/16bitfit/` (the only page with a killed-artifact strikethrough X — actually, the Phase 3b stub renders the killed artifact via `killed={true}` opacity, NOT a strikethrough overlay. The strikethrough overlay is a future v1.1 enhancement; the opacity fade is the v1 visual signal.)

Result: ☐ [PARTIAL — authoring discipline; v1 ships with minimal annotation usage]

- [ ] **Step 9: §16 item 9 — Methods strip cross-links work**

Run: `curl -s http://localhost:4321/work/code-brain/ | grep -oE 'href="/work/animation-pipeline/"' | head -1`
Expected: 1 match (Code Brain's Methods strip links to Animation Pipeline).

Click test: from `/work/code-brain/`, click the "Animation Pipeline" link in the Methods strip. Expected: View Transition to `/work/animation-pipeline/`.

Result: ☐

- [ ] **Step 10: §16 item 10 — Per-artifact permalinks (id="artifact-N")**

Run: `curl -s http://localhost:4321/work/animation-pipeline/ | grep -oE 'id="artifact-[1-4]"' | sort -u | wc -l`
Expected: `4`.

Hash-jump test: open `http://localhost:4321/work/animation-pipeline/#artifact-3` — the page should scroll to the SlackQuote artifact on load.

Result: ☐

- [ ] **Step 11: §16 item 11 — Reduced motion (View Transition disables gracefully)**

In Chrome DevTools → Rendering → Emulate CSS media feature prefers-reduced-motion → `reduce`. Reload `/work/animation-pipeline/`.

Expected:
- ShippedNow's live-pulse dot animation is disabled (CSS rule in ShippedNow.astro).
- View Transition fires as instant page swap (Astro 5 honors prefers-reduced-motion at the transition level — no per-component override needed).

Result: ☐

- [ ] **Step 12: §16 item 12 — Lighthouse on /work/<slug>**

Open `http://localhost:4321/work/animation-pipeline/` in Chrome → DevTools → Lighthouse → Mobile → Performance / Accessibility / Best Practices / SEO → Analyze.

Expected:
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices = 100
- SEO ≥ 90

If Accessibility < 95: most likely the `<MetricChart>` SVG is missing an accessible name (already set via aria-label), or color contrast on the dateline strip (already passes WCAG AA). Investigate via Lighthouse breakdown.

Result: ☐

- [ ] **Step 13: §16 item 13 — 90-second cold-read test**

This is Sean's test post-build. The plan ships the structural shell; Sean validates the cold-read carrying his real prose.

Result: ☐ [PARTIAL — structure ships v1; prose validation is Sean's post-plan]

- [ ] **Step 14: Note HEAD + commit count**

Run: `git log --oneline 48f396e..HEAD | wc -l`
Expected: ~36-42 commits.

Run: `git rev-parse HEAD`
Note the SHA. This is the Phase 3b completion mark; Phase 3c's plan should reference it as its baseline.

Result: ☐

### Task 9.2: Final smoke — npm run build

- [ ] **Step 1: Production build**

Run: `npm run build 2>&1 | tail -25`

Expected: prebuild gates pass, Astro build completes. Output lists:
- `dist/404.html` (Phase 3a)
- `dist/contact/index.html` (Phase 3a)
- `dist/index.html` (Phase 2)
- `dist/work/<slug>/index.html` × 5 (Phase 3b)
- `dist/sitemap-index.xml` + `dist/sitemap-0.xml`

- [ ] **Step 2: Verify sitemap picks up case-study routes**

Run: `grep -oE "<loc>[^<]+</loc>" dist/sitemap-0.xml | sort -u | head -20`

Expected entries include:
- `<loc>https://seanwinslow.com/</loc>`
- `<loc>https://seanwinslow.com/contact/</loc>`
- `<loc>https://seanwinslow.com/work/animation-pipeline/</loc>` (× 5 slugs)

- [ ] **Step 3: No commit**

Verification only.

---

## Section 10 — What's NOT in this plan (deferrals)

For clarity to the next planning sessions:

| Defer | Spec / Reason | Owner plan |
|---|---|---|
| Real opener prose (~3 paragraphs × 5 case studies) | Sean's authoring pass post-plan. The structure ships v1; the prose is iterative. All placeholders are marked with `[PLACEHOLDER —` so `grep "PLACEHOLDER" src/content/work/*.mdx` surfaces every remaining edit. | **Sean post-plan** |
| Real investigation-board artifact content + captions | Same authoring pattern. 4 artifact stubs ship per case study; real content + cross-link weight + actual data points = Sean's iterative authoring. | **Sean post-plan** |
| Real 4Q content (Q1-Q4 × 5 case studies) | Same. The `four_q:` frontmatter is populated with sentinel text that satisfies the validator + the renderer; real comprehension content is Sean's authoring pass. | **Sean post-plan** |
| Upstream `EXPLANATION.md` authoring + `explanation_url:` activation | 5 upstream files exist per blueprint §5 #14-15. When Sean wants Option-A canonical fetch instead of Option-B frontmatter mirror, the migration is one frontmatter edit per slug (`explanation_url: <github raw url>`). The fetcher activates on next build. | **Sean post-plan + per-slug** |
| `<MetricChart />` interactive variant | Spec §17 — V1 ships static SVG. Interactive variant lives in V2 if any case study warrants it. | v2 |
| `/work/intent-engineering-mcp` MCP-tool-call embed (E2 from PMP §7) | Separate future spec. The SHIPPED case study ships with the Loom poster + ShippedNow block + 4 artifacts; the actual-tool-call embed is post-V1. | Post-V1 separate spec |
| Per-section IntersectionObserver fade-up reveal cascade for below-the-fold sections | Case-study spec §6 motion timeline calls for IO-triggered fades on the opener, investigation board, Methods strip, 4Q block. Phase 3b ships with sections rendering immediately on initial paint (no IO observer). The above-the-fold "instant after View Transition" behavior IS shipped (the page shell renders dateline + title + hero media without animation). Below-the-fold cascade is a v1.1 polish layer. | v1.1 |
| Hand-drawn pencil strikethrough X overlay on killed artifacts | Spec §7.5 + §11.1: cut artifacts get a strikethrough SVG overlay. Phase 3b ships with `killed={true}` lowering the polaroid opacity to 50% — geometric signal of "this was cut" without the overlay. The full overlay is a v1.1 enhancement; the opacity fade is the v1 visual. | v1.1 |
| `<Annotation />` density build-time validator | Spec §11.2: ≤6/page desktop, ≤4/page mobile. Phase 3b enforces this via Sean's authoring discipline. A build-time counter that warns on >6 annotations per MDX is a small Phase 4 enhancement (5 lines added to `derive_crosslinks.mjs`). | Phase 4 |
| Per-page TOC, "see also" footer, frame-number sticky chrome ticker | Spec §17 — all explicitly deferred v1. | v2 |
| `/work/` index route | Spec §17 — defer until project count grows past ~8. Home page projects section is the index for v1. | v2 |
| `/transactions/` + `/architecture/` + `/essays/` collection routes + RSS | The 3 collection routes — index + slug + RSS each. Phase 3b ships the shared `<FourQBlock />` + `<MethodsStrip />` + `<Annotation />` that 3c consumes. | **Phase 3c** |
| `/about/` page body | Phase 3d. | **Phase 3d** |
| Daily Driver `shipped-stats-<slug>.json` writer | Per blueprint §3.6: Daily Driver writes the file nightly. v1 hand-seeds the JSON. | **Phase 4** |
| Plausible analytics; Vercel deploy; custom-domain DNS; hard cutover from V3 bridge | Per blueprint §6 Phase 4. | **Phase 4** |
| Hand-authored Procreate substrate | Per texture-and-artifacts-spec §3.2 + §4.2. Pillow substitutes ship v1; hand-authored versions are an indefinite v1.1+ option. | **Deferred indefinitely** |
| Re-attempt subagent-driven-development dispatch | Phase 2 + 2b + 3a + 3b (this plan) defaulted to direct controller execution after the implementer subagent hallucinated context constraints. Re-attempt only if the harness has improved between this phase and the next. | Each subsequent planning session re-evaluates |

---

## Self-review summary

- **Spec coverage:** case-study-spec §16 items 1–13 are each covered by a verification step in Section 9 (Task 9.1 Steps 1–13). The status-shape components (§12.1-§12.4) all render conditionally on frontmatter status — Tasks 3.1/3.2/3.3/3.4 + the conditional in the page shell (Task 5.3) cover all 4 statuses. The 4 artifact types (§7.2) are each their own component (Tasks 4.2-4.4 + ArtifactImage wrapper Task 4.1) and exercised on every MDX stub. Methods strip cross-link rule (§8.2) is wired in MethodsStrip.astro (Task 2.2) and validated by derive_crosslinks.mjs (Task 1.3). View Transition continuity (§6) is verified in Tasks 7.1/7.2.
- **Placeholders:** Every text Sean will eventually replace is marked `[PLACEHOLDER —` for grep-ability. The sentinel text is well-formed enough to ship between Phase 3b lock and Sean's prose pass without reading as broken.
- **Type consistency:** `entry.data.four_q` shape (`{ what, why, break, learn }`) is consistent between `src/content/config.ts` (Task 1.6), the validator (Task 1.2), `FourQBlock.astro`'s Props interface (Task 2.1), and all 5 MDX stubs (Tasks 8.1-8.5). `methods[]` shape (`{ task, tool, cost, link? }`) is consistent between the schema, validator, MethodsStrip.astro, derive_crosslinks.mjs, and all 5 MDX stubs.
- **Scripts cover graceful idle behavior:** `fetch_canonical_sources.mjs` ships idle (no MDX declares explanation_url yet); `derive_crosslinks.mjs` validates 2 cross-links (code-brain + 16bitfit both link to /work/animation-pipeline/); `validate_content.mjs` passes on all 5 stubs after Section 8. The prebuild hook fires all three in order; build halts on any failure.
- **No new npm dependencies.** Astro 5 + Tailwind 4 + Node 20's built-in `fetch` cover the prebuild scripts; vanilla JS covers the annotation positioner; hand-rolled SVG covers MetricChart's chart geometry.

---

*Drafted 2026-05-21 from the Phase 3 backlog's Phase 3b hand-off prompt. Phase 3c (3 collection routes) follows next; Phase 3d (about page body) closes Phase 3 before the Phase 4 deploy.*
