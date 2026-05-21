#!/usr/bin/env node
/**
 * scripts/derive_crosslinks.mjs — cross-link graph derivator.
 *
 * Phase 3b scope (still active): work collection's methods[].link
 *   cross-references to other /work/<slug>/ pages.
 *
 * Phase 3c.1 scope (added): transactions collection bidirectional graph.
 *   Walks src/content/transactions/*.mdx, reads:
 *     - methods[].link (same as work — internal /work/<slug> links)
 *     - relatedCaseStudy (string → /work/<slug>)
 *     - relatedTransactions (string[] → /transactions/<slug>)
 *     - relatedEssay (string → /essays/<slug>; forward-declared, consumer
 *       arrives in Phase 3c.2 — validation is permissive in 3c.1)
 *     - previousVersion (string → /transactions/<slug>)
 *     - relatedArchitecture (string | string[] → /architecture/<slug>;
 *       forward-declared, consumer arrives in Phase 3c.2)
 *
 *   Writes src/content/transactions/.crosslinks.json with reverse-lookup
 *   tables:
 *     {
 *       transactions: {
 *         "<slug>": {
 *           supersededBy?: "<slug>",   // reverse of previousVersion
 *           siblingShips?: ["<slug>"], // reverse of relatedTransactions
 *         }
 *       },
 *       byCaseStudy: { "<work-slug>": ["<txn-slug>", ...] },
 *         // forward-declared; consumer is case-study page Related block (post-plan)
 *       byArchitecture: { "<arch-slug>": ["<txn-slug>", ...] },
 *         // forward-declared; consumer is Phase 3c.2 architecture Related block
 *       byEssay: { "<essay-slug>": ["<txn-slug>", ...] },
 *         // forward-declared; consumer is Phase 3c.2 essay Related block
 *     }
 *
 *   The deep-dive page's <RelatedBlock /> (Task 4.6) reads this file to
 *   render the forward direction (transactions → other surfaces). The
 *   reverse direction lights up automatically when each consumer surface
 *   imports the same JSON.
 *
 * Phase 3c.2 will add: architecture + essays collections (the four-way
 *   bidirectional close — essays' plottedArtifacts auto-reverse-renders
 *   "← named in: <essay title>" on every cited ledger row + architecture
 *   writeup).
 *
 * Validator behavior on dangling slugs: build fails with a clear message
 * naming the offending file, field, slug value, and (when Levenshtein
 * distance ≤2) the closest matching real slug. Per transactions-spec §11.1
 * error message contract.
 *
 * Source: case-study-spec-v1.md §8.2 + transactions-spec-v1.md §11.1 +
 *         §14 + BLUEPRINT-COMPLETE.md §3.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const WORK_DIR = path.join(ROOT, "src/content/work");
const TXN_DIR = path.join(ROOT, "src/content/transactions");
const CROSSLINKS_OUT = path.join(TXN_DIR, ".crosslinks.json");

function parseFrontmatterBlock(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  return m ? m[1] : null;
}

function extractSlug(fname) {
  return fname.replace(/\.mdx?$/, "");
}

function extractMethodsLinks(fm) {
  const lines = fm.split("\n");
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

/**
 * Extracts a scalar field's value from a frontmatter block. Returns
 * null when absent. Strips surrounding quotes. Ignores comments.
 */
function extractScalar(fm, field) {
  const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, "m");
  const match = fm.match(re);
  if (!match) return null;
  const val = match[1].replace(/^["']|["']$/g, "");
  if (val === "null" || val === "") return null;
  return val;
}

/**
 * Extracts a list-of-strings field from a frontmatter block. Returns
 * empty array when absent. Supports both `field:` followed by indented
 * `- entry` lines and the inline `field: [a, b]` form.
 */
function extractStringList(fm, field) {
  const lines = fm.split("\n");
  const list = [];
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (new RegExp(`^${field}:\\s*\\[`).test(line)) {
      // Inline form: field: [a, b, c]
      const inlineMatch = line.match(new RegExp(`^${field}:\\s*\\[(.+)\\]`));
      if (inlineMatch) {
        return inlineMatch[1]
          .split(",")
          .map((s) => s.trim().replace(/^["']|["']$/g, ""))
          .filter((s) => s && s !== "null");
      }
    }
    if (new RegExp(`^${field}:\\s*$`).test(line)) { inList = true; continue; }
    if (inList && /^\w+:/.test(line)) { inList = false; }
    if (!inList) continue;
    const itemMatch = line.match(/^\s+-\s+(.+)$/);
    if (itemMatch) {
      const val = itemMatch[1].trim().replace(/^["']|["']$/g, "");
      if (val && val !== "null") list.push(val);
    }
  }
  return list;
}

/**
 * Extracts a string | string[] union field (used for relatedArchitecture).
 * Returns array of slugs (single-string input wrapped to length-1 array).
 */
function extractStringOrList(fm, field) {
  const scalar = extractScalar(fm, field);
  if (scalar !== null) return [scalar];
  return extractStringList(fm, field);
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n; if (n === 0) return m;
  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    }
  }
  return d[m][n];
}

function suggestion(needle, haystack) {
  let best = null;
  let bestDist = Infinity;
  for (const candidate of haystack) {
    const d = levenshtein(needle, candidate);
    if (d < bestDist) { bestDist = d; best = candidate; }
  }
  if (best && bestDist <= 2) return ` Did you mean "${best}"?`;
  return "";
}

async function readSlugSet(dir) {
  const entries = await fs.readdir(dir).catch(() => []);
  return new Set(
    entries
      .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
      .map(extractSlug)
  );
}

async function main() {
  process.stdout.write("\nderive_crosslinks.mjs — Phase 3c.1 scope (work + transactions bidirectional)\n");

  const workSlugs = await readSlugSet(WORK_DIR);
  const txnSlugs = await readSlugSet(TXN_DIR);
  // Forward-declared; not yet validated against real dirs in Phase 3c.1.
  // Phase 3c.2 swaps these to readSlugSet() calls on real dirs.
  const archSlugs = new Set();   // /architecture/ — arrives in Phase 3c.2
  const essaySlugs = new Set();  // /essays/ — arrives in Phase 3c.2

  const errors = [];
  const txnEntries = await fs.readdir(TXN_DIR).catch(() => []);

  const reverseTxns = new Map();   // txnSlug → { supersededBy, siblingShips: [] }
  const byCaseStudy = new Map();   // workSlug → [txnSlug]
  const byArchitecture = new Map();// archSlug → [txnSlug] (forward-declared)
  const byEssay = new Map();       // essaySlug → [txnSlug] (forward-declared)

  // --- Pass 1: work collection (Phase 3b methods cross-links — unchanged) ---
  process.stdout.write("\n[work] methods cross-links\n");
  const workEntries = await fs.readdir(WORK_DIR).catch(() => []);
  let totalWork = 0;
  for (const fname of workEntries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(WORK_DIR, fname), "utf8");
    const fm = parseFrontmatterBlock(src);
    if (!fm) continue;
    const links = extractMethodsLinks(fm);
    for (const link of links) {
      totalWork++;
      const t = link.match(/^\/work\/([\w-]+)\/?$/);
      if (!t) continue; // external links allowed
      const targetSlug = t[1];
      if (!workSlugs.has(targetSlug)) {
        errors.push(`work/${slug}: methods cross-link to /work/${targetSlug}/ — no such slug.${suggestion(targetSlug, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${targetSlug}/\n`);
      }
    }
  }

  // --- Pass 2: transactions collection cross-links + reverse graph ---
  process.stdout.write("\n[transactions] cross-links + bidirectional graph\n");
  let totalTxn = 0;
  for (const fname of txnEntries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(TXN_DIR, fname), "utf8");
    const fm = parseFrontmatterBlock(src);
    if (!fm) continue;

    // methods[].link → /work/<slug>
    for (const link of extractMethodsLinks(fm)) {
      totalTxn++;
      const t = link.match(/^\/work\/([\w-]+)\/?$/);
      if (!t) continue;
      const target = t[1];
      if (!workSlugs.has(target)) {
        errors.push(`transactions/${slug}: methods cross-link to /work/${target}/ — no such slug.${suggestion(target, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${target}/ (methods)\n`);
      }
    }

    // relatedCaseStudy → /work/<slug>
    const relCs = extractScalar(fm, "relatedCaseStudy");
    if (relCs) {
      totalTxn++;
      if (!workSlugs.has(relCs)) {
        errors.push(`transactions/${slug}: relatedCaseStudy "${relCs}" → /work/${relCs}/ — no such slug.${suggestion(relCs, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${relCs}/ (relatedCaseStudy)\n`);
        if (!byCaseStudy.has(relCs)) byCaseStudy.set(relCs, []);
        byCaseStudy.get(relCs).push(slug);
      }
    }

    // relatedTransactions[] → /transactions/<slug> (sibling ships, bidirectional)
    for (const sib of extractStringList(fm, "relatedTransactions")) {
      totalTxn++;
      if (!txnSlugs.has(sib)) {
        errors.push(`transactions/${slug}: relatedTransactions "${sib}" → /transactions/${sib}/ — no such slug.${suggestion(sib, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} ↔ /transactions/${sib}/ (sibling)\n`);
        if (!reverseTxns.has(sib)) reverseTxns.set(sib, { siblingShips: [] });
        const rt = reverseTxns.get(sib);
        rt.siblingShips = rt.siblingShips ?? [];
        if (!rt.siblingShips.includes(slug)) rt.siblingShips.push(slug);
        // The forward direction is also tracked so the source row's
        // Related block can render its declared siblings.
        if (!reverseTxns.has(slug)) reverseTxns.set(slug, { siblingShips: [] });
        const fwd = reverseTxns.get(slug);
        fwd.siblingShips = fwd.siblingShips ?? [];
        if (!fwd.siblingShips.includes(sib)) fwd.siblingShips.push(sib);
      }
    }

    // previousVersion → /transactions/<slug> (supersedes / superseded-by)
    const prev = extractScalar(fm, "previousVersion");
    if (prev) {
      totalTxn++;
      if (!txnSlugs.has(prev)) {
        errors.push(`transactions/${slug}: previousVersion "${prev}" → /transactions/${prev}/ — no such slug.${suggestion(prev, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /transactions/${prev}/ (supersedes)\n`);
        // Forward direction: this row knows it supersedes prev.
        // Reverse direction: prev gains supersededBy = slug.
        if (!reverseTxns.has(prev)) reverseTxns.set(prev, {});
        reverseTxns.get(prev).supersededBy = slug;
      }
    }

    // relatedArchitecture (string | string[]) → /architecture/<slug>
    // Forward-declared in Phase 3c.1; archSlugs is empty so validation
    // permits any value (warning rather than error).
    for (const archSlug of extractStringOrList(fm, "relatedArchitecture")) {
      totalTxn++;
      if (archSlugs.size > 0 && !archSlugs.has(archSlug)) {
        errors.push(`transactions/${slug}: relatedArchitecture "${archSlug}" → /architecture/${archSlug}/ — no such slug.${suggestion(archSlug, [...archSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /architecture/${archSlug}/ (forward-declared; consumer in Phase 3c.2)\n`);
        if (!byArchitecture.has(archSlug)) byArchitecture.set(archSlug, []);
        byArchitecture.get(archSlug).push(slug);
      }
    }

    // relatedEssay → /essays/<slug> (forward-declared)
    const relEssay = extractScalar(fm, "relatedEssay");
    if (relEssay) {
      totalTxn++;
      if (essaySlugs.size > 0 && !essaySlugs.has(relEssay)) {
        errors.push(`transactions/${slug}: relatedEssay "${relEssay}" → /essays/${relEssay}/ — no such slug.${suggestion(relEssay, [...essaySlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /essays/${relEssay}/ (forward-declared; consumer in Phase 3c.2)\n`);
        if (!byEssay.has(relEssay)) byEssay.set(relEssay, []);
        byEssay.get(relEssay).push(slug);
      }
    }
  }

  if (errors.length > 0) {
    process.stderr.write(`\n✗ ${errors.length} cross-link errors:\n`);
    for (const e of errors) process.stderr.write(`  - ${e}\n`);
    process.exit(1);
  }

  // --- Write the reverse-lookup JSON ---
  const out = {
    schemaVersion: "phase-3c.1",
    generatedAt: new Date().toISOString(),
    transactions: Object.fromEntries(reverseTxns),
    byCaseStudy: Object.fromEntries(byCaseStudy),
    byArchitecture: Object.fromEntries(byArchitecture),
    byEssay: Object.fromEntries(byEssay),
  };
  await fs.mkdir(TXN_DIR, { recursive: true });
  await fs.writeFile(CROSSLINKS_OUT, JSON.stringify(out, null, 2), "utf8");
  process.stdout.write(`\n  wrote ${path.relative(ROOT, CROSSLINKS_OUT)}\n`);

  process.stdout.write(`\ndone. validated ${totalWork + totalTxn} cross-links (${totalWork} work + ${totalTxn} transactions).\n`);
}

main().catch((e) => {
  process.stderr.write(`derive_crosslinks.mjs: ${e.stack || e.message}\n`);
  process.exit(1);
});
