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
