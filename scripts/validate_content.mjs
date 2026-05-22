#!/usr/bin/env node
/**
 * scripts/validate_content.mjs — schema validator (unified).
 *
 * Phase 3b scope: work collection.
 * Phase 3c.1 scope: transactions collection.
 * Phase 3c.2 scope (added): architecture + essays collections.
 *
 * Astro's content collection schema (src/content/config.ts) catches
 * most structural issues at build time. This validator catches
 * semantic rules Astro can't express:
 *   - exactly one of {four_q, explanation_url} must be present (work)
 *   - exactly one of {explanationUrl, inline-body 4Q headings}
 *     for transactions + architecture + essays (OQ-C v1 fallback path)
 *   - status-specific frontmatter (work)
 *   - methods[] / limitations[] are non-empty
 *   - slug must not collide with a routing-level enum (transactions only)
 *   - architecture: honestNotes[].anchor matches a section heading in
 *     the fetched essay body (warning only — upstream essay edits may
 *     have renamed the heading)
 *   - architecture: mermaidSource file exists when set to a path
 *   - architecture: scoreboard row/column counts consistent
 *   - essays: jdUrl HEAD checks (warning on 4xx/5xx)
 *   - essays: roleMap.lastValidated staleness (>30 days = warning)
 *
 * Source: case-study-spec-v1.md §15 + transactions-spec-v1.md §11.1 +
 *         architecture-spec-v1.md §11.1 + essays-spec-v1.md §11.1 +
 *         §11.2 (the unified-validator merge).
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
    requiredOneOf: [["explanationUrl", "__inline_4Q__"]],
    statusFields: {},
    requiredArrays: ["methods", "limitations"],
    forbiddenSlugs: ["fleet", "pipeline", "product", "writing", "infra"],
    crossLinkFields: [
      "relatedCaseStudy", "relatedTransactions", "relatedEssay",
      "previousVersion", "relatedArchitecture",
    ],
  },
  // ============================================================
  // Phase 3c.2 — architecture collection
  // Source: architecture-spec-v1.md §11.1.
  // OQ-C deviation from §3.1: requiredOneOf accepts inline-body 4Q
  // as fallback (mirrors transactions); tighten to canonical-only
  // when Sean ships upstream EXPLANATION.md sources.
  // ============================================================
  {
    name: "architecture",
    contentDir: path.join(ROOT, "src/content/architecture"),
    requiredFields: [
      "title", "dateline", "shipped", "readingTime", "status", "lead",
    ],
    requiredOneOf: [["explanationUrl", "__inline_4Q__"]],
    statusFields: {},
    requiredArrays: ["tags", "methods"],
    crossLinkFields: [
      "relatedLedgerRow", "relatedCaseStudy", "relatedEssay",
      "relatedArchitecture",
    ],
    mermaidSourceField: "mermaidSource",      // existence check if value is a path
    honestNotesField: "honestNotes",           // anchor warning check
    scoreboardField: "scoreboard",             // row/column count consistency
  },
  // ============================================================
  // Phase 3c.2 — essays collection
  // Source: essays-spec-v1.md §11.1 + §11.2.
  // ============================================================
  {
    name: "essays",
    contentDir: path.join(ROOT, "src/content/essays"),
    requiredFields: [
      "title", "dateline", "published", "readingTime", "status", "excerpt",
    ],
    requiredOneOf: [["explanationUrl", "__inline_4Q__"]],
    statusFields: {},
    requiredArrays: ["tags"],
    crossLinkFields: [
      "relatedLedgerRow", "relatedCaseStudy", "relatedArchitecture",
      "relatedEssays", "plottedArtifacts",
    ],
    mermaidSourceField: "mermaidSource",
    roleMapField: "roleMap",                   // jdUrl HEAD checks + lastValidated staleness
  },
];

const ROLEMAP_STALE_DAYS = 30;

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

/**
 * Scans an MDX file body for the 4 canonical EXPLANATION h2 headings.
 * Used by transactions/architecture/essays' requiredOneOf check.
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

async function headCheck(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return res.status;
  } catch (e) {
    return -1;
  }
}

async function validateCollection(coll, warnings) {
  const entries = await fs.readdir(coll.contentDir).catch(() => []);
  const errors = [];
  for (const fname of entries) {
    if (!fname.endsWith(".mdx") && !fname.endsWith(".md")) continue;
    const slug = fname.replace(/\.mdx?$/, "");
    const filePath = path.join(coll.contentDir, fname);
    const src = await fs.readFile(filePath, "utf8");
    const fm = parseFrontmatter(src);
    if (!fm) {
      errors.push(`${coll.name}/${slug}: missing or malformed frontmatter`);
      continue;
    }
    // Required scalar fields
    for (const f of coll.requiredFields) {
      if (fm[f] === undefined || fm[f] === "") {
        errors.push(`${coll.name}/${slug}: missing required field "${f}"`);
      }
    }
    // Required arrays
    for (const arrField of coll.requiredArrays ?? []) {
      if (!Array.isArray(fm[arrField]) || fm[arrField].length === 0) {
        errors.push(`${coll.name}/${slug}: required array "${arrField}" is missing or empty`);
      }
    }
    // Forbidden slugs
    for (const forbidden of coll.forbiddenSlugs ?? []) {
      if (slug === forbidden) {
        errors.push(`${coll.name}/${slug}: slug "${slug}" collides with the surface enum — pick a different slug`);
      }
    }
    // requiredOneOf (with __inline_4Q__ detection for transactions + architecture + essays)
    const hasInline4Q = detectInline4Q(src);
    for (const oneOf of coll.requiredOneOf ?? []) {
      const present = oneOf.filter((f) => {
        if (f === "__inline_4Q__") return hasInline4Q;
        // null/empty/literal-"null" all count as absent for OneOf semantics
        return fm[f] !== undefined && fm[f] !== "" && fm[f] !== "null" && fm[f] !== null;
      });
      if (present.length === 0) {
        const label = oneOf.map((f) => (f === "__inline_4Q__" ? "inline-body 4Q headings" : f)).join(", ");
        errors.push(`${coll.name}/${slug}: must declare one of [${label}]`);
      }
    }
    // status-specific fields
    const statusReq = coll.statusFields?.[fm.status] ?? [];
    for (const f of statusReq) {
      if (fm[f] === undefined || fm[f] === "") {
        errors.push(`${coll.name}/${slug}: status=${fm.status} requires field "${f}"`);
      }
    }
    // architecture: mermaidSource path existence
    if (coll.mermaidSourceField && fm[coll.mermaidSourceField]) {
      const val = fm[coll.mermaidSourceField];
      // Only check when value looks like a path (not inline mermaid source).
      // Heuristic: value contains `/` or ends in `.mmd` AND has no newlines.
      if (!val.includes("\n") && (val.endsWith(".mmd") || val.includes("/"))) {
        const mmdPath = path.join(coll.contentDir, val);
        try {
          await fs.access(mmdPath);
        } catch {
          errors.push(`${coll.name}/${slug}: mermaidSource path "${val}" does not exist at ${mmdPath}`);
        }
      }
    }
    // architecture: scoreboard row/column count consistency
    if (coll.scoreboardField && fm[coll.scoreboardField]) {
      const sb = fm[coll.scoreboardField];
      if (sb && typeof sb === "object" && Array.isArray(sb.columns) && Array.isArray(sb.rows)) {
        const colCount = sb.columns.length;
        for (const [idx, row] of sb.rows.entries()) {
          if (Array.isArray(row.scores) && row.scores.length !== colCount) {
            errors.push(`${coll.name}/${slug}: scoreboard row ${idx} ("${row.label}") has ${row.scores.length} scores; expected ${colCount} (matching columns count)`);
          }
        }
      }
    }
    // architecture: honestNotes[].anchor matches a section heading
    // (warning — upstream essay edits may have renamed the heading)
    if (coll.honestNotesField && Array.isArray(fm[coll.honestNotesField])) {
      const essayBodyPath = path.join(ROOT, "src/content/architecture/essays", `${slug}.md`);
      let essayBody = "";
      try { essayBody = await fs.readFile(essayBodyPath, "utf8"); } catch { /* not fetched yet */ }
      // Only warn when the essay body exists — otherwise we have nothing to check against.
      if (essayBody) {
        for (const note of fm[coll.honestNotesField]) {
          const anchor = note.anchor;
          if (!anchor) continue;
          // Match either `## <anchor>` or `## <Anchor>` (case-insensitive heading match)
          const re = new RegExp(`^##\\s+.*${anchor.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}`, "im");
          if (!re.test(essayBody)) {
            warnings.push(`${coll.name}/${slug}: honestNote anchor "${anchor}" does not match any heading in the fetched essay body. Did Sean rename the heading upstream?`);
          }
        }
      }
    }
    // essays: roleMap jdUrl HEAD checks + lastValidated staleness
    if (coll.roleMapField && fm[coll.roleMapField]) {
      const rm = fm[coll.roleMapField];
      if (rm.lastValidated) {
        const lvDate = new Date(`${rm.lastValidated}T12:00:00Z`);
        const ageDays = Math.floor((Date.now() - lvDate.getTime()) / 86400000);
        if (ageDays > ROLEMAP_STALE_DAYS) {
          warnings.push(`${coll.name}/${slug}: roleMap.lastValidated is ${ageDays} days old; refresh recommended (>${ROLEMAP_STALE_DAYS} days)`);
        }
      }
      if (Array.isArray(rm.rows)) {
        for (const row of rm.rows) {
          if (!row.jdUrl) continue;
          const status = await headCheck(row.jdUrl);
          if (status >= 400 && status < 600) {
            warnings.push(`${coll.name}/${slug}: roleMap row "${row.buyer}" jdUrl ${row.jdUrl} returned ${status} — JD may have been removed. Build keeps shipping; update on next review.`);
          } else if (status === -1) {
            warnings.push(`${coll.name}/${slug}: roleMap row "${row.buyer}" jdUrl ${row.jdUrl} fetch failed (network/DNS). Treating as transient.`);
          }
        }
      }
    }

    process.stdout.write(`  ✓ ${coll.name}/${slug}\n`);
  }
  return errors;
}

async function main() {
  process.stdout.write("\nvalidate_content.mjs — Phase 3c.2 scope (work + transactions + architecture + essays)\n");
  const allErrors = [];
  const warnings = [];
  for (const coll of COLLECTIONS) {
    process.stdout.write(`\n[${coll.name}]\n`);
    const errs = await validateCollection(coll, warnings);
    allErrors.push(...errs);
  }
  if (warnings.length > 0) {
    process.stdout.write(`\n⚠ ${warnings.length} warnings (build proceeds):\n`);
    for (const w of warnings) process.stdout.write(`  - ${w}\n`);
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
