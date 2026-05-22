#!/usr/bin/env node
/**
 * scripts/fetch_canonical_sources.mjs — canonical source fetcher.
 *
 * Phase 3b scope: work collection (`explanation_url` field).
 * Phase 3c.1 scope: transactions collection (`explanationUrl` field).
 * Phase 3c.2 scope (added): architecture (TWO walks per row:
 *   `explanationUrl` for 4Q + `essaySourceUrl` for the long-form
 *   essay body) AND essays (TWO walks: `explanationUrl` for 4Q +
 *   `sourceUrl` for the body).
 *
 * Walks each collection's MDX files looking for entries that declare
 * the named URL field, fetches the markdown raw via HTTPS, validates
 * against the 4 canonical EXPLANATION headings (4Q walks only — body
 * walks skip validation since long-form essays don't carry the 4Q
 * heading structure), writes to the per-collection outDir. ETag-cached
 * via .cache/canonical-sources.lockfile so subsequent builds skip
 * unchanged sources.
 *
 * Graceful no-dir: missing content directories return empty.
 * Graceful no-URL: rows with `<urlField>: null` (OQ-C inline-body
 *   fallback path) are skipped silently.
 *
 * Source: case-study-spec-v1.md §9 + §15; transactions-spec-v1.md §11.1;
 *         architecture-spec-v1.md §11.1; essays-spec-v1.md §11.1.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const CACHE_PATH = path.join(ROOT, ".cache/canonical-sources.lockfile");
const EXPLANATIONS_DIR = path.join(ROOT, "src/content/explanations");
const ARCH_ESSAYS_DIR = path.join(ROOT, "src/content/architecture/essays");
const ESSAY_BODIES_DIR = path.join(ROOT, "src/content/essays/essay-bodies");

const WALK_COLLECTIONS = [
  // --- 4Q canonical fetches (validated against 4 EXPLANATION headings) ---
  {
    name: "work",
    contentDir: path.join(ROOT, "src/content/work"),
    urlField: "explanation_url",
    outDir: EXPLANATIONS_DIR,
    validateHeadings: true,
  },
  {
    name: "transactions",
    contentDir: path.join(ROOT, "src/content/transactions"),
    urlField: "explanationUrl",
    outDir: EXPLANATIONS_DIR,
    validateHeadings: true,
  },
  {
    name: "architecture",
    contentDir: path.join(ROOT, "src/content/architecture"),
    urlField: "explanationUrl",
    outDir: EXPLANATIONS_DIR,
    validateHeadings: true,
  },
  {
    name: "essays",
    contentDir: path.join(ROOT, "src/content/essays"),
    urlField: "explanationUrl",
    outDir: EXPLANATIONS_DIR,
    validateHeadings: true,
  },
  // --- Body fetches (no heading validation — long-form essays) ---
  {
    name: "architecture-body",
    contentDir: path.join(ROOT, "src/content/architecture"),
    urlField: "essaySourceUrl",
    outDir: ARCH_ESSAYS_DIR,
    validateHeadings: false,
  },
  {
    name: "essays-body",
    contentDir: path.join(ROOT, "src/content/essays"),
    urlField: "sourceUrl",
    outDir: ESSAY_BODIES_DIR,
    validateHeadings: false,
  },
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
  const entries = await fs.readdir(coll.contentDir).catch(() => []);
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const filePath = path.join(coll.contentDir, fname);
    const src = await fs.readFile(filePath, "utf8");
    const fm = parseFrontmatter(src);
    const url = fm[coll.urlField];
    // OQ-C inline-body fallback: skip rows with null/empty URL silently.
    if (!url || url === "null" || url === "") continue;
    const slug = fm.slug ?? fname.replace(/\.mdx?$/, "");
    const cacheKey = `${coll.name}:${slug}`;
    const cached = cache[cacheKey];
    try {
      const result = await fetchWithETag(url, cached?.etag);
      if (!result.changed) {
        process.stdout.write(`  ✓ ${cacheKey} (cached)\n`);
        continue;
      }
      if (coll.validateHeadings) validateHeadings(slug, result.text);
      await fs.mkdir(coll.outDir, { recursive: true });
      const outFile = path.join(coll.outDir, `${slug}.md`);
      await fs.writeFile(outFile, result.text, "utf8");
      cache[cacheKey] = { etag: result.etag, fetchedAt: new Date().toISOString() };
      process.stdout.write(`  → ${cacheKey} fetched (${(result.text.length / 1024).toFixed(1)}KB)\n`);
    } catch (e) {
      // Network failures + 404s log warning + leave committed version in place
      // (architecture-spec §11.1 fallback contract). The architecture body and
      // essay body walks write to gitignored dirs, but the 4Q walks write to
      // src/content/explanations/ which IS committed — so a failed fetch leaves
      // the last-known-good file in place.
      process.stderr.write(`  ⚠ ${cacheKey}: ${e.message} — leaving committed version in place\n`);
    }
  }
}

async function main() {
  process.stdout.write("\nfetch_canonical_sources.mjs — Phase 3c.2 scope (work + transactions + architecture × 2 + essays × 2)\n");
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
