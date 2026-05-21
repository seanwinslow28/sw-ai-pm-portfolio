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
