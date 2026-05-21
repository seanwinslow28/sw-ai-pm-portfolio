#!/usr/bin/env node
/**
 * scripts/validate_content.mjs — schema validator.
 *
 * Phase 3b scope (still active): work collection.
 * Phase 3c.1 scope (added): transactions collection — required fields,
 *   array minimums, explanationUrl OR inline-body 4Q (one-of), forbidden
 *   slug collision check (slug must not match surface enum).
 * Phase 3c.2 will add: architecture + essays collections (the unified
 *   validator merge per essays-spec §11.2 also folds JD URL HEAD checks
 *   + `roleMap.lastValidated` staleness check at that point).
 *
 * Astro's content collection schema (src/content/config.ts) catches
 * most of this at build time, but THIS validator catches semantic
 * rules Astro can't express:
 *   - exactly one of {four_q, explanation_url} must be present (work)
 *   - exactly one of {explanationUrl, inline-body 4Q headings} (transactions)
 *   - status-specific frontmatter (work)
 *   - methods[] / limitations[] are non-empty
 *   - slug must not collide with a routing-level enum value
 *
 * Source: case-study-spec-v1.md §15 + transactions-spec-v1.md §11.1 +
 *         BLUEPRINT-COMPLETE.md §3.3.
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
  {
    name: "transactions",
    contentDir: path.join(ROOT, "src/content/transactions"),
    requiredFields: [
      "title", "dateline", "shipped", "surface", "status", "valueProp",
    ],
    // explanationUrl OR inline-body 4Q (validator detects the latter
    // by scanning the MDX body for all 4 canonical h2 headings).
    requiredOneOf: [["explanationUrl", "__inline_4Q__"]],
    statusFields: {
      // SHIPPED has no extra required fields on the ledger (no shipped_at;
      // `shipped` IS the date). Status-specific fields are intentionally
      // narrower than work — transactions spec §3.2 doesn't require
      // shipped_stats_endpoint / return_condition / archived_reference_url
      // at the ledger row level. Those live on case-study pages only.
    },
    requiredArrays: ["methods", "limitations"],
    // Transactions-specific: slug must not collide with a surface enum value
    // (Astro routing safety — `src/pages/transactions/[surface]/index.astro`
    // and `src/pages/transactions/[slug].astro` both resolve under
    // /transactions/<value>/; disjoint slug sets prevent collision).
    forbiddenSlugs: ["fleet", "pipeline", "product", "writing", "infra"],
    // Cross-link fields whose value must resolve to a real slug in another
    // collection (derive_crosslinks.mjs Task 2.3 enforces; the validator
    // just notes them here for completeness).
    crossLinkFields: [
      "relatedCaseStudy", "relatedTransactions", "relatedEssay",
      "previousVersion", "relatedArchitecture",
    ],
  },
];

/**
 * Parses YAML frontmatter robustly enough for our schema. Detects:
 *   - inline scalars: key: value
 *   - lists of scalars: key: \n  - item \n  - item
 *   - objects: key: \n  child: val
 *   - lists of objects: key: \n  - child: val \n    other: val
 *   - block scalars: key: | \n  multi \n  line
 */
function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---/);
  if (!m) return null;
  const lines = m[1].split("\n");
  const fm = {};
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "" || line.trim().startsWith("#")) { i++; continue; }
    const kv = line.match(/^([\w_]+):\s*(.*)$/);
    if (!kv) { i++; continue; }
    const key = kv[1];
    const inline = kv[2];
    if (inline === "" || inline === "|" || inline === ">") {
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      // List of scalars: next line begins with `  - text`
      if (j < lines.length && /^\s+-\s+(?!\w+:)/.test(lines[j])) {
        const list = [];
        while (j < lines.length && /^\s+-\s/.test(lines[j])) {
          list.push(lines[j].replace(/^\s+-\s+/, "").replace(/^["']|["']$/g, ""));
          j++;
        }
        fm[key] = list;
        i = j;
        continue;
      }
      // List of objects: next line begins with `  - child: val`
      if (j < lines.length && /^\s+-\s+\w+:/.test(lines[j])) {
        const list = [];
        let current = null;
        while (j < lines.length && (/^\s+-\s/.test(lines[j]) || /^\s{4,}\w+:/.test(lines[j]))) {
          if (/^\s+-\s/.test(lines[j])) {
            if (current) list.push(current);
            current = {};
            const inlineKv = lines[j].match(/^\s+-\s+(\w+):\s*(.*)$/);
            if (inlineKv) {
              const v = inlineKv[2].replace(/^["']|["']$/g, "");
              current[inlineKv[1]] = v === "null" ? null : v;
            }
          } else {
            const itemKv = lines[j].match(/^\s+(\w+):\s*(.*)$/);
            if (itemKv && current) {
              const v = itemKv[2].replace(/^["']|["']$/g, "");
              current[itemKv[1]] = v === "null" ? null : v;
            }
          }
          j++;
        }
        if (current) list.push(current);
        fm[key] = list;
        i = j;
        continue;
      }
      // Plain object: next line begins with `  child: val`
      if (j < lines.length && /^\s+\w+:/.test(lines[j])) {
        const obj = {};
        while (j < lines.length && /^\s+\w+:/.test(lines[j])) {
          const objKv = lines[j].match(/^\s+(\w+):\s*(.*)$/);
          if (objKv) {
            const v = objKv[2].replace(/^["']|["']$/g, "");
            obj[objKv[1]] = v;
          }
          j++;
        }
        fm[key] = obj;
        i = j;
        continue;
      }
      if (inline === "|") {
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
  const entries = await fs.readdir(coll.contentDir).catch(() => []);
  const errors = [];
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = fname.replace(/\.mdx?$/, "");
    const src = await fs.readFile(path.join(coll.contentDir, fname), "utf8");
    const fm = parseFrontmatter(src);
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
    // Forbidden slugs (transactions: slug must not match a surface enum value)
    for (const forbidden of coll.forbiddenSlugs ?? []) {
      if (slug === forbidden) {
        errors.push(`${coll.name}/${slug}: slug "${slug}" collides with the surface enum — pick a different slug`);
      }
    }
    // Inline-4Q detection — used by transactions' requiredOneOf
    const hasInline4Q = detectInline4Q(src);
    for (const oneOf of coll.requiredOneOf ?? []) {
      const present = oneOf.filter((f) => {
        if (f === "__inline_4Q__") return hasInline4Q;
        return fm[f] !== undefined && fm[f] !== "";
      });
      if (present.length === 0) {
        const label = oneOf.map((f) => (f === "__inline_4Q__" ? "inline-body 4Q headings" : f)).join(", ");
        errors.push(`${coll.name}/${slug}: must declare one of [${label}]`);
      }
    }
    const statusReq = coll.statusFields?.[fm.status] ?? [];
    for (const f of statusReq) {
      if (fm[f] === undefined || fm[f] === "") {
        errors.push(`${coll.name}/${slug}: status=${fm.status} requires field "${f}"`);
      }
    }
    process.stdout.write(`  ✓ ${coll.name}/${slug}\n`);
  }
  return errors;
}

/**
 * Scans an MDX file body (everything after the closing `---`) for the
 * 4 canonical EXPLANATION.md h2 headings. Returns true when all 4 are
 * present. Used by the transactions validator's requiredOneOf:
 * [explanationUrl, __inline_4Q__] — the V3-bridge fallback path.
 */
function detectInline4Q(src) {
  const bodyMatch = src.match(/^---\n[\s\S]+?\n---\n([\s\S]*)$/);
  if (!bodyMatch) return false;
  const body = bodyMatch[1];
  const required = [
    /^##\s+What is this\?/m,
    /^##\s+Why this approach\?/m,
    /^##\s+What would break\?/m,
    /^##\s+What did I learn\?/m,
  ];
  return required.every((re) => re.test(body));
}

async function main() {
  process.stdout.write("\nvalidate_content.mjs — Phase 3c.1 scope (work + transactions)\n");
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
