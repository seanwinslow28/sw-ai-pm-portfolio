#!/usr/bin/env node
/**
 * scripts/derive_crosslinks.mjs — 4-way cross-link graph derivator.
 *
 * Phase 3b scope: work collection's methods[].link cross-references.
 * Phase 3c.1 scope: transactions bidirectional graph (work ⇄ transactions
 *   + transaction siblings + previousVersion + forward-declared
 *   relatedArchitecture / relatedEssay slots).
 * Phase 3c.2 scope (added): architecture + essays passes; closes the
 *   4-way graph. Essays' plottedArtifacts reverse-renders onto every
 *   cited ledger row + architecture writeup as `namedInEssays[]`.
 *
 *   Writes:
 *     - src/content/transactions/_crosslinks.json  (extended: namedInEssays[] per row)
 *     - src/content/architecture/_crosslinks.json  (NEW)
 *     - src/content/essays/_crosslinks.json        (NEW; mostly empty in v1 — no reverse links flow INTO essays)
 *
 * Source: case-study-spec-v1.md §8.2; transactions-spec-v1.md §11.1 + §14;
 *         architecture-spec-v1.md §14 + §11.1;
 *         essays-spec-v1.md §10 + §14.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const WORK_DIR = path.join(ROOT, "src/content/work");
const TXN_DIR = path.join(ROOT, "src/content/transactions");
const ARCH_DIR = path.join(ROOT, "src/content/architecture");
const ESSAY_DIR = path.join(ROOT, "src/content/essays");
const CACHE_DIR = path.join(ROOT, ".cache");
const TXN_CROSSLINKS_OUT = path.join(CACHE_DIR, "transactions-crosslinks.json");
const ARCH_CROSSLINKS_OUT = path.join(CACHE_DIR, "architecture-crosslinks.json");
const ESSAY_CROSSLINKS_OUT = path.join(CACHE_DIR, "essays-crosslinks.json");

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

function extractScalar(fm, field) {
  const re = new RegExp(`^${field}:\\s*(.+?)\\s*$`, "m");
  const match = fm.match(re);
  if (!match) return null;
  const val = match[1].replace(/^["']|["']$/g, "");
  if (val === "null" || val === "") return null;
  return val;
}

function extractStringList(fm, field) {
  const lines = fm.split("\n");
  const list = [];
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (new RegExp(`^${field}:\\s*\\[`).test(line)) {
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

function extractStringOrList(fm, field) {
  const scalar = extractScalar(fm, field);
  if (scalar !== null) return [scalar];
  return extractStringList(fm, field);
}

/**
 * Extracts the `quadrantLegend[].artifact` slugs from an essays MDX
 * frontmatter. Returns the list of artifact slugs (skipping null entries).
 */
function extractQuadrantLegendArtifacts(fm) {
  const lines = fm.split("\n");
  const artifacts = [];
  let inLegend = false;
  for (const line of lines) {
    if (/^quadrantLegend:/.test(line)) { inLegend = true; continue; }
    if (inLegend && /^\w+:/.test(line)) { inLegend = false; }
    if (!inLegend) continue;
    const m = line.match(/^\s+artifact:\s*(.+)$/);
    if (m) {
      const val = m[1].trim().replace(/^["']|["']$/g, "");
      if (val && val !== "null") artifacts.push(val);
    }
  }
  return artifacts;
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
  process.stdout.write("\nderive_crosslinks.mjs — Phase 3c.2 scope (4-way close: work + transactions + architecture + essays)\n");

  // ----- Phase 3c.2: forward-declared sets are now REAL -----
  const workSlugs = await readSlugSet(WORK_DIR);
  const txnSlugs = await readSlugSet(TXN_DIR);
  const archSlugs = await readSlugSet(ARCH_DIR);
  const essaySlugs = await readSlugSet(ESSAY_DIR);

  const errors = [];

  // ----- Transactions reverse tables (extended with namedInEssays) -----
  const reverseTxns = new Map();   // txnSlug → { supersededBy, siblingShips: [], namedInEssays: [] }
  const byCaseStudy = new Map();
  const byArchitecture = new Map();
  const byEssay = new Map();
  // Helper to safely append to an array property on the reverse map.
  function appendReverse(map, key, prop, value) {
    if (!map.has(key)) map.set(key, {});
    const obj = map.get(key);
    obj[prop] = obj[prop] ?? [];
    if (!obj[prop].includes(value)) obj[prop].push(value);
  }

  // ----- Architecture reverse tables -----
  const reverseArch = new Map();   // archSlug → { siblingArchitecture: [], namedInEssays: [] }
  const archByLedger = new Map();  // txnSlug → [archSlug]
  const archByCaseStudy = new Map();
  const archByEssay = new Map();

  // ----- Essays reverse tables -----
  // Essays in v1 receive cross-links mostly OUTBOUND (plottedArtifacts +
  // relatedLedgerRow + relatedArchitecture + relatedCaseStudy). The few
  // inbound paths are essay-to-essay via relatedEssays[].
  const reverseEssays = new Map(); // essaySlug → { siblingEssays: [] }

  // ============================================================
  // Pass 1: work collection (Phase 3b methods cross-links — unchanged)
  // ============================================================
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
      if (!t) continue;
      const targetSlug = t[1];
      if (!workSlugs.has(targetSlug)) {
        errors.push(`work/${slug}: methods cross-link to /work/${targetSlug}/ — no such slug.${suggestion(targetSlug, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${targetSlug}/\n`);
      }
    }
  }

  // ============================================================
  // Pass 2: transactions cross-links + reverse graph (Phase 3c.1 unchanged)
  // ============================================================
  process.stdout.write("\n[transactions] cross-links + bidirectional graph\n");
  const txnEntries = await fs.readdir(TXN_DIR).catch(() => []);
  let totalTxn = 0;
  for (const fname of txnEntries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(TXN_DIR, fname), "utf8");
    const fm = parseFrontmatterBlock(src);
    if (!fm) continue;

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

    for (const sib of extractStringList(fm, "relatedTransactions")) {
      totalTxn++;
      if (!txnSlugs.has(sib)) {
        errors.push(`transactions/${slug}: relatedTransactions "${sib}" → /transactions/${sib}/ — no such slug.${suggestion(sib, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} ↔ /transactions/${sib}/ (sibling)\n`);
        appendReverse(reverseTxns, sib, "siblingShips", slug);
        appendReverse(reverseTxns, slug, "siblingShips", sib);
      }
    }

    const prev = extractScalar(fm, "previousVersion");
    if (prev) {
      totalTxn++;
      if (!txnSlugs.has(prev)) {
        errors.push(`transactions/${slug}: previousVersion "${prev}" → /transactions/${prev}/ — no such slug.${suggestion(prev, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /transactions/${prev}/ (supersedes)\n`);
        if (!reverseTxns.has(prev)) reverseTxns.set(prev, {});
        reverseTxns.get(prev).supersededBy = slug;
      }
    }

    // relatedArchitecture — NOW REAL (archSlugs populated from disk)
    for (const archSlug of extractStringOrList(fm, "relatedArchitecture")) {
      totalTxn++;
      if (!archSlugs.has(archSlug)) {
        // Phase 3c.2 still permits forward declaration when archSlugs is
        // empty (zero architecture MDXs in v1.x), but warns when archSlugs
        // is populated and the slug doesn't resolve.
        if (archSlugs.size > 0) {
          errors.push(`transactions/${slug}: relatedArchitecture "${archSlug}" → /architecture/${archSlug}/ — no such slug.${suggestion(archSlug, [...archSlugs])}`);
        } else {
          process.stdout.write(`  ✓ ${slug} → /architecture/${archSlug}/ (forward-declared; archSlugs empty)\n`);
        }
      } else {
        process.stdout.write(`  ✓ ${slug} → /architecture/${archSlug}/\n`);
      }
      if (!byArchitecture.has(archSlug)) byArchitecture.set(archSlug, []);
      byArchitecture.get(archSlug).push(slug);
    }

    const relEssay = extractScalar(fm, "relatedEssay");
    if (relEssay) {
      totalTxn++;
      if (!essaySlugs.has(relEssay)) {
        if (essaySlugs.size > 0) {
          errors.push(`transactions/${slug}: relatedEssay "${relEssay}" → /essays/${relEssay}/ — no such slug.${suggestion(relEssay, [...essaySlugs])}`);
        } else {
          process.stdout.write(`  ✓ ${slug} → /essays/${relEssay}/ (forward-declared; essaySlugs empty)\n`);
        }
      } else {
        process.stdout.write(`  ✓ ${slug} → /essays/${relEssay}/\n`);
      }
      if (!byEssay.has(relEssay)) byEssay.set(relEssay, []);
      byEssay.get(relEssay).push(slug);
    }
  }

  // ============================================================
  // Pass 3: architecture cross-links + reverse graph (NEW)
  // ============================================================
  process.stdout.write("\n[architecture] cross-links + bidirectional graph\n");
  const archEntries = await fs.readdir(ARCH_DIR).catch(() => []);
  let totalArch = 0;
  for (const fname of archEntries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(ARCH_DIR, fname), "utf8");
    const fm = parseFrontmatterBlock(src);
    if (!fm) continue;

    // methods[].link → /work/<slug>
    for (const link of extractMethodsLinks(fm)) {
      totalArch++;
      const t = link.match(/^\/work\/([\w-]+)\/?$/);
      if (!t) continue;
      const target = t[1];
      if (!workSlugs.has(target)) {
        errors.push(`architecture/${slug}: methods cross-link to /work/${target}/ — no such slug.${suggestion(target, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${target}/ (methods)\n`);
      }
    }

    // relatedLedgerRow → /transactions/<slug> (closes the arch ⇄ txn loop)
    const relLed = extractScalar(fm, "relatedLedgerRow");
    if (relLed) {
      totalArch++;
      if (!txnSlugs.has(relLed)) {
        errors.push(`architecture/${slug}: relatedLedgerRow "${relLed}" → /transactions/${relLed}/ — no such slug.${suggestion(relLed, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /transactions/${relLed}/\n`);
        if (!archByLedger.has(relLed)) archByLedger.set(relLed, []);
        archByLedger.get(relLed).push(slug);
      }
    }

    // relatedCaseStudy → /work/<slug>
    const relCs = extractScalar(fm, "relatedCaseStudy");
    if (relCs) {
      totalArch++;
      if (!workSlugs.has(relCs)) {
        errors.push(`architecture/${slug}: relatedCaseStudy "${relCs}" → /work/${relCs}/ — no such slug.${suggestion(relCs, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${relCs}/\n`);
        if (!archByCaseStudy.has(relCs)) archByCaseStudy.set(relCs, []);
        archByCaseStudy.get(relCs).push(slug);
      }
    }

    // relatedEssay → /essays/<slug>
    const relEss = extractScalar(fm, "relatedEssay");
    if (relEss) {
      totalArch++;
      if (!essaySlugs.has(relEss)) {
        if (essaySlugs.size > 0) {
          errors.push(`architecture/${slug}: relatedEssay "${relEss}" → /essays/${relEss}/ — no such slug.${suggestion(relEss, [...essaySlugs])}`);
        } else {
          process.stdout.write(`  ✓ ${slug} → /essays/${relEss}/ (forward-declared; essaySlugs empty)\n`);
        }
      } else {
        process.stdout.write(`  ✓ ${slug} → /essays/${relEss}/\n`);
      }
      if (!archByEssay.has(relEss)) archByEssay.set(relEss, []);
      archByEssay.get(relEss).push(slug);
    }

    // relatedArchitecture[] (sibling architecture writeups)
    for (const sib of extractStringList(fm, "relatedArchitecture")) {
      totalArch++;
      if (!archSlugs.has(sib)) {
        errors.push(`architecture/${slug}: relatedArchitecture "${sib}" → /architecture/${sib}/ — no such slug.${suggestion(sib, [...archSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} ↔ /architecture/${sib}/ (sibling)\n`);
        appendReverse(reverseArch, sib, "siblingArchitecture", slug);
        appendReverse(reverseArch, slug, "siblingArchitecture", sib);
      }
    }
  }

  // ============================================================
  // Pass 4: essays cross-links + reverse graph (NEW)
  // Essays are the source of the most reverse links: every plottedArtifact
  // slug gets "← named in: <essay title>" reverse-rendered on its txn +
  // architecture surfaces.
  // ============================================================
  process.stdout.write("\n[essays] cross-links + 4-way close\n");
  const essayEntries = await fs.readdir(ESSAY_DIR).catch(() => []);
  let totalEssay = 0;
  for (const fname of essayEntries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = extractSlug(fname);
    const src = await fs.readFile(path.join(ESSAY_DIR, fname), "utf8");
    const fm = parseFrontmatterBlock(src);
    if (!fm) continue;

    // plottedArtifacts[] → reverse "← named in: <slug>" onto txn + arch surfaces
    const plotted = extractStringList(fm, "plottedArtifacts");
    // ALSO pick up the quadrantLegend[].artifact slugs (they're a superset
    // in v1 but explicit plottedArtifacts wins when both exist).
    const legendArtifacts = extractQuadrantLegendArtifacts(fm);
    const allArtifactSlugs = Array.from(new Set([...plotted, ...legendArtifacts]));
    for (const artifactSlug of allArtifactSlugs) {
      totalEssay++;
      const onTxn = txnSlugs.has(artifactSlug);
      const onArch = archSlugs.has(artifactSlug);
      if (!onTxn && !onArch) {
        errors.push(`essays/${slug}: plottedArtifacts entry "${artifactSlug}" does not resolve to /transactions/${artifactSlug}/ or /architecture/${artifactSlug}/ (no MDX at either).${suggestion(artifactSlug, [...txnSlugs, ...archSlugs])}`);
        continue;
      }
      if (onTxn) {
        process.stdout.write(`  ✓ ${slug} → /transactions/${artifactSlug}/ (plotted artifact)\n`);
        appendReverse(reverseTxns, artifactSlug, "namedInEssays", slug);
      }
      if (onArch) {
        process.stdout.write(`  ✓ ${slug} → /architecture/${artifactSlug}/ (plotted artifact)\n`);
        appendReverse(reverseArch, artifactSlug, "namedInEssays", slug);
      }
    }

    // relatedLedgerRow → /transactions/<slug>
    const relLed = extractScalar(fm, "relatedLedgerRow");
    if (relLed) {
      totalEssay++;
      if (!txnSlugs.has(relLed)) {
        errors.push(`essays/${slug}: relatedLedgerRow "${relLed}" → /transactions/${relLed}/ — no such slug.${suggestion(relLed, [...txnSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /transactions/${relLed}/\n`);
        appendReverse(reverseTxns, relLed, "namedInEssays", slug);
      }
    }

    // relatedCaseStudy → /work/<slug>
    const relCs = extractScalar(fm, "relatedCaseStudy");
    if (relCs) {
      totalEssay++;
      if (!workSlugs.has(relCs)) {
        errors.push(`essays/${slug}: relatedCaseStudy "${relCs}" → /work/${relCs}/ — no such slug.${suggestion(relCs, [...workSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /work/${relCs}/\n`);
      }
    }

    // relatedArchitecture[] → /architecture/<slug>
    for (const archSlug of extractStringList(fm, "relatedArchitecture")) {
      totalEssay++;
      if (!archSlugs.has(archSlug)) {
        errors.push(`essays/${slug}: relatedArchitecture "${archSlug}" → /architecture/${archSlug}/ — no such slug.${suggestion(archSlug, [...archSlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} → /architecture/${archSlug}/\n`);
        appendReverse(reverseArch, archSlug, "namedInEssays", slug);
      }
    }

    // relatedEssays[] (sibling essays)
    for (const sib of extractStringList(fm, "relatedEssays")) {
      totalEssay++;
      if (!essaySlugs.has(sib)) {
        errors.push(`essays/${slug}: relatedEssays "${sib}" → /essays/${sib}/ — no such slug.${suggestion(sib, [...essaySlugs])}`);
      } else {
        process.stdout.write(`  ✓ ${slug} ↔ /essays/${sib}/ (sibling)\n`);
        appendReverse(reverseEssays, sib, "siblingEssays", slug);
        appendReverse(reverseEssays, slug, "siblingEssays", sib);
      }
    }
  }

  // ============================================================
  // Halt on errors
  // ============================================================
  if (errors.length > 0) {
    process.stderr.write(`\n✗ ${errors.length} cross-link errors:\n`);
    for (const e of errors) process.stderr.write(`  - ${e}\n`);
    process.exit(1);
  }

  // ============================================================
  // Write the three per-collection crosslinks files
  // ============================================================
  const txnOut = {
    schemaVersion: "phase-3c.2",
    generatedAt: new Date().toISOString(),
    transactions: Object.fromEntries(reverseTxns),
    byCaseStudy: Object.fromEntries(byCaseStudy),
    byArchitecture: Object.fromEntries(byArchitecture),
    byEssay: Object.fromEntries(byEssay),
  };
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(TXN_CROSSLINKS_OUT, JSON.stringify(txnOut, null, 2), "utf8");
  process.stdout.write(`\n  wrote ${path.relative(ROOT, TXN_CROSSLINKS_OUT)}\n`);

  const archOut = {
    schemaVersion: "phase-3c.2",
    generatedAt: new Date().toISOString(),
    architecture: Object.fromEntries(reverseArch),
    byLedger: Object.fromEntries(archByLedger),
    byCaseStudy: Object.fromEntries(archByCaseStudy),
    byEssay: Object.fromEntries(archByEssay),
  };
  await fs.writeFile(ARCH_CROSSLINKS_OUT, JSON.stringify(archOut, null, 2), "utf8");
  process.stdout.write(`  wrote ${path.relative(ROOT, ARCH_CROSSLINKS_OUT)}\n`);

  const essayOut = {
    schemaVersion: "phase-3c.2",
    generatedAt: new Date().toISOString(),
    essays: Object.fromEntries(reverseEssays),
  };
  await fs.writeFile(ESSAY_CROSSLINKS_OUT, JSON.stringify(essayOut, null, 2), "utf8");
  process.stdout.write(`  wrote ${path.relative(ROOT, ESSAY_CROSSLINKS_OUT)}\n`);

  process.stdout.write(`\ndone. validated ${totalWork + totalTxn + totalArch + totalEssay} cross-links (${totalWork} work + ${totalTxn} transactions + ${totalArch} architecture + ${totalEssay} essays).\n`);
}

main().catch((e) => {
  process.stderr.write(`derive_crosslinks.mjs: ${e.stack || e.message}\n`);
  process.exit(1);
});
