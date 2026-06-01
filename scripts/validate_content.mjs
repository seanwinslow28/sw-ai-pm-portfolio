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
 * Launch-readiness guardrails (post-mortem 2026-06-01 §5) — catch the silent
 * failure class that passes `astro build` but leaves the page wrong:
 *   - F1: every <BoardArtifact> needs an excerpt OR ticketKey+ticketTitle
 *   - F6: em-dash lint over rendered prose (DESIGN.md §213 allowlist)
 *   - F2: about-pulse.json date_iso may not be after the build date
 *   - F3/F4: OG cards must be wired; no font-CDN font loads in src/
 *
 * Source: case-study-spec-v1.md §15 + transactions-spec-v1.md §11.1 +
 *         architecture-spec-v1.md §11.1 + essays-spec-v1.md §11.1 +
 *         §11.2 (the unified-validator merge).
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

// "Today" in Boston time, matching the wire-service datelines. Build runs
// in UTC on Vercel; computing in America/New_York avoids a late-night-UTC
// false positive on the dateline freshness check below.
function bostonTodayISO() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}
const TODAY_ISO = bostonTodayISO();

function daysBetween(isoA, isoB) {
  return Math.round(
    (Date.parse(`${isoB}T12:00:00Z`) - Date.parse(`${isoA}T12:00:00Z`)) / 86400000
  );
}

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
    boardArtifacts: true,                  // F1: every <BoardArtifact> needs a body
    emDashFields: ["tagline"],             // F6: rendered prose fields
    scanBody: true,
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
    futureDate: { field: "shipped" },   // any status: a future ship date is staged
    forbiddenSlugs: ["fleet", "pipeline", "product", "writing", "infra"],
    crossLinkFields: [
      "relatedCaseStudy", "relatedTransactions", "relatedEssay",
      "previousVersion", "relatedArchitecture",
    ],
    emDashFields: ["valueProp", "limitations"],
    scanBody: true,
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
    futureDate: { field: "shipped", statuses: ["SHIPPED"] },
    crossLinkFields: [
      "relatedLedgerRow", "relatedCaseStudy", "relatedEssay",
      "relatedArchitecture",
    ],
    mermaidSourceField: "mermaidSource",      // existence check if value is a path
    honestNotesField: "honestNotes",           // anchor warning check
    scoreboardField: "scoreboard",             // row/column count consistency
    emDashFields: ["lead", "mermaidCaption", "honestNotes.body"],
    scanBody: true,
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
    futureDate: { field: "published", statuses: ["PUBLISHED"] },
    crossLinkFields: [
      "relatedLedgerRow", "relatedCaseStudy", "relatedArchitecture",
      "relatedEssays", "plottedArtifacts",
    ],
    mermaidSourceField: "mermaidSource",
    roleMapField: "roleMap",                   // jdUrl HEAD checks + lastValidated staleness
    emDashFields: ["excerpt", "subtitle", "mermaidCaption"],
    scanBody: true,
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

// ============================================================
// Launch-readiness guardrails (post-mortem 2026-06-01 §5).
// These catch the silent failure class: valid-but-incomplete data
// and authored-but-unwired assets that pass `astro build` but leave
// the rendered page wrong.
// ============================================================

/**
 * Strip inline-code spans (`...`) so backticked CLI flags and sample
 * text (e.g. `--skip-llm-judge`, `fonts.gstatic.com`) never trip the
 * prose lints below. Code is not editorial prose.
 */
function stripInlineCode(s) {
  return s.replace(/`[^`]*`/g, "");
}

// DESIGN.md §213 allowlist: the locked project title carries an em dash by lock.
const LOCKED_TITLE = "The Block — Campus + RevOps";

// Wire-service dateline stamp at the start of a line / caption, e.g.
// "MAY 27 —", "DEC 2025 —", "JUNE 1, 2026 —", "KILLED —". Allowlisted
// by DESIGN.md §213 (datelines + ledger captions inherit newspaper em dashes).
const WIRE_STAMP_RE = /^\s*(?:<p[^>]*>)?\s*(?:[A-Z]{3,9}\.?(?:\s+\d{1,4})?(?:,\s*\d{4})?|KILLED)\s*—/;

/**
 * Returns the list of em-dash / typographic-double-hyphen violations in a
 * single rendered-prose string, after removing inline code and the locked
 * title. `--` is only flagged in its URL-free, code-free form (a real CLI
 * flag lives in backticks and is already stripped).
 */
function emDashHits(text) {
  if (typeof text !== "string") return [];
  const cleaned = stripInlineCode(text).split(LOCKED_TITLE).join("");
  const hits = [];
  if (cleaned.includes("—")) hits.push("em dash (—)");
  if (/(?:^|[^-])--(?:[^-]|$)/.test(cleaned)) hits.push("double hyphen (--)");
  return hits;
}

/**
 * Scan named frontmatter prose fields for em dashes. `fields` entries may be
 * scalar ("valueProp"), array ("limitations"), or array-of-objects with a
 * property ("honestNotes.body"). Only fields that actually render are passed
 * in per-collection; title/description/dateline/alt-text are intentionally
 * excluded (they legitimately carry the "— Sean Winslow" separator, locked
 * titles, and wire-service stamps).
 */
function scanFieldEmDashes(fm, fields, label, errors) {
  for (const field of fields) {
    if (field.includes(".")) {
      const [arr, prop] = field.split(".");
      if (!Array.isArray(fm[arr])) continue;
      fm[arr].forEach((o, i) => {
        if (o && typeof o[prop] === "string") {
          const hits = emDashHits(o[prop]);
          if (hits.length) errors.push(`${label}: ${hits.join(" + ")} in ${arr}[${i}].${prop} (rendered prose — DESIGN.md §213)`);
        }
      });
    } else {
      const v = fm[field];
      const vals = Array.isArray(v) ? v : typeof v === "string" ? [v] : [];
      vals.forEach((s, i) => {
        const hits = emDashHits(s);
        if (hits.length) errors.push(`${label}: ${hits.join(" + ")} in ${field}${Array.isArray(v) ? `[${i}]` : ""} (rendered prose — DESIGN.md §213)`);
      });
    }
  }
}

/**
 * Scan the MDX body (prose + JSX prop strings like boardLabel="…",
 * excerpt="…") for em dashes. Skips fenced code blocks, `<p slot="caption">`
 * ledger captions (wire-service voice), and strips the leading wire-service
 * dateline stamp before checking the remainder of a line.
 */
function scanBodyEmDashes(src, label, errors) {
  const bodyMatch = src.match(/^---\n[\s\S]+?\n---\n([\s\S]*)$/);
  if (!bodyMatch) return;
  const lines = bodyMatch[1].split("\n");
  const fmOffset = src.slice(0, src.length - bodyMatch[1].length).split("\n").length - 1;
  let inCode = false;
  lines.forEach((rawLine, idx) => {
    if (/^\s*```/.test(rawLine)) { inCode = !inCode; return; }
    if (inCode) return;
    if (/slot="caption"/.test(rawLine)) return;          // ledger caption = wire-service voice
    const line = rawLine.replace(WIRE_STAMP_RE, "");     // allow a leading stamp, scan the rest
    const hits = emDashHits(line);
    if (hits.length) {
      errors.push(`${label} (line ${fmOffset + idx + 1}): ${hits.join(" + ")} in rendered prose — "${rawLine.trim().slice(0, 80)}" (DESIGN.md §213)`);
    }
  });
}

/**
 * Empty-board-card check (post-mortem F1). A <BoardArtifact> with only a
 * boardLabel renders as an empty polaroid frame: it must carry an `excerpt`
 * OR both `ticketKey` and `ticketTitle`. The opening-tag regex tolerates `>`
 * inside double-quoted attribute values.
 */
function scanBoardArtifacts(src, label, errors) {
  const tagRe = /<BoardArtifact\b((?:[^>"]|"[^"]*")*)>/g;
  let m;
  while ((m = tagRe.exec(src)) !== null) {
    const props = m[1];
    const prop = (name) => {
      const pm = props.match(new RegExp(`${name}=("[^"]*"|'[^']*')`));
      return pm ? pm[1].slice(1, -1).trim() : "";
    };
    const id = prop("artifactId") || "(no artifactId)";
    const hasBody = prop("excerpt").length > 0 || (prop("ticketKey").length > 0 && prop("ticketTitle").length > 0);
    if (!hasBody) {
      errors.push(`${label}: BoardArtifact "${id}" has no excerpt and no ticketKey+ticketTitle — renders as an empty polaroid frame (post-mortem F1).`);
    }
  }
}

/** Recursively list every file under a directory (absolute paths). */
async function walkFiles(dir) {
  const out = [];
  let entries = [];
  try { entries = await fs.readdir(dir, { withFileTypes: true }); } catch { return out; }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walkFiles(full));
    else out.push(full);
  }
  return out;
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
    // Future-date staging notice. The publish gate (src/lib/publish-gate.ts)
    // hides these until their date arrives, so this is informational — it
    // tells Sean exactly what is staged and won't render yet.
    if (coll.futureDate) {
      const { field, statuses } = coll.futureDate;
      const d = fm[field];
      const statusInScope = !statuses || statuses.includes(fm.status);
      if (statusInScope && typeof d === "string" && d > TODAY_ISO) {
        warnings.push(`${coll.name}/${slug}: ${field} ${d} is in the future (today ${TODAY_ISO}). Staged — the publish gate hides it until then.`);
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

    // F1 — empty-board-card check (work only)
    if (coll.boardArtifacts) scanBoardArtifacts(src, `${coll.name}/${slug}`, errors);
    // F6 — em-dash lint over rendered frontmatter fields + MDX body prose
    if (coll.emDashFields) scanFieldEmDashes(fm, coll.emDashFields, `${coll.name}/${slug}`, errors);
    if (coll.scanBody) scanBodyEmDashes(src, `${coll.name}/${slug}`, errors);

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

  // Dateline freshness. The home hero reads public/api/dateline.json (the
  // Daily Driver writes it ~08:30 ET). A stale date on the hero quietly
  // undercuts the whole "real and dated" thesis, so guard it:
  //   - stale by 1 day  → warn (normal pre-08:30 window; run the driver)
  //   - stale by 2+ days → hard error (clearly forgotten; do not ship)
  // Flip the 1-day case to an error once the deploy is wired to fire after
  // the 08:30 write.
  process.stdout.write(`\n[dateline freshness]\n`);
  try {
    const dl = JSON.parse(await fs.readFile(path.join(ROOT, "public/api/dateline.json"), "utf8"));
    if (typeof dl.date_iso !== "string") {
      allErrors.push(`dateline.json: missing or non-string date_iso`);
    } else if (dl.date_iso > TODAY_ISO) {
      allErrors.push(`dateline.json: date_iso ${dl.date_iso} is in the FUTURE (today ${TODAY_ISO}). The hero would show a fabricated-looking future date.`);
    } else {
      const staleDays = daysBetween(dl.date_iso, TODAY_ISO);
      if (staleDays >= 2) {
        allErrors.push(`dateline.json: date_iso ${dl.date_iso} is ${staleDays} days stale (today ${TODAY_ISO}). Run the Daily Driver before deploying — a stale hero date undercuts the dated-fleet thesis.`);
      } else if (staleDays === 1) {
        warnings.push(`dateline.json: date_iso ${dl.date_iso} is 1 day stale (today ${TODAY_ISO}). Run the Daily Driver before deploying so the hero dateline is current.`);
      } else {
        process.stdout.write(`  ✓ dateline.json is current (${dl.date_iso})\n`);
      }
    }
  } catch (e) {
    allErrors.push(`dateline.json: could not read/parse (${e.message})`);
  }

  // about-pulse coherence (post-mortem F2). The home About-teaser pulse strip
  // reads public/api/about-pulse.json. A future date_iso would let the strip
  // label not-yet-real stats with a fabricated date; stale-behind is handled
  // by the isFresh() fallback in src/lib/dateline.ts, so only *ahead* is a bug.
  process.stdout.write(`\n[about-pulse coherence]\n`);
  try {
    const ap = JSON.parse(await fs.readFile(path.join(ROOT, "public/api/about-pulse.json"), "utf8"));
    if (typeof ap.date_iso !== "string") {
      allErrors.push(`about-pulse.json: missing or non-string date_iso`);
    } else if (ap.date_iso > TODAY_ISO) {
      allErrors.push(`about-pulse.json: date_iso ${ap.date_iso} is in the FUTURE (today ${TODAY_ISO}). The pulse strip would label not-yet-real stats with a future date.`);
    } else {
      const staleDays = daysBetween(ap.date_iso, TODAY_ISO);
      if (staleDays >= 2) {
        warnings.push(`about-pulse.json: date_iso ${ap.date_iso} is ${staleDays} days stale (today ${TODAY_ISO}). The strip degrades TODAY→LATEST past 48h, but run the Daily Driver before deploying.`);
      } else {
        process.stdout.write(`  ✓ about-pulse.json is coherent (${ap.date_iso})\n`);
      }
    }
  } catch (e) {
    allErrors.push(`about-pulse.json: could not read/parse (${e.message})`);
  }

  // Render-gated asset locks (post-mortem F3/F4). An asset is only "locked"
  // when it is wired into the page that uses it.
  process.stdout.write(`\n[asset locks]\n`);
  // F4 — every OG card on disk must be referenced by some page's ogImage.
  const ogDir = path.join(ROOT, "public/og-cards");
  const ogFiles = (await walkFiles(ogDir)).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  let refHaystack = "";
  for (const d of ["src/content", "src/lib", "src/pages"]) {
    for (const f of await walkFiles(path.join(ROOT, d))) {
      if (/\.(mdx?|astro|ts|js)$/.test(f)) refHaystack += await fs.readFile(f, "utf8");
    }
  }
  for (const cardFull of ogFiles) {
    const rel = "/og-cards/" + path.relative(ogDir, cardFull).split(path.sep).join("/");
    if (!refHaystack.includes(rel)) {
      allErrors.push(`og-cards: "${rel}" exists on disk but no page references it via ogImage — authored-but-unwired card (post-mortem F4).`);
    } else {
      process.stdout.write(`  ✓ ${rel} is wired\n`);
    }
  }
  // F3 — fonts must stay self-hosted: no font-CDN URL in src. Match the URL
  // form (//fonts.gstatic.com) so a bare-domain mention in a comment doesn't
  // false-positive.
  const FONT_CDN_RE = /(?:https?:)?\/\/fonts\.(?:gstatic|googleapis)\.com/;
  const fontHits = [];
  for (const f of await walkFiles(path.join(ROOT, "src"))) {
    if (!/\.(astro|css|ts|js)$/.test(f)) continue;
    const txt = await fs.readFile(f, "utf8");
    if (FONT_CDN_RE.test(txt)) fontHits.push(path.relative(ROOT, f));
  }
  if (fontHits.length) {
    for (const f of fontHits) allErrors.push(`font CDN: ${f} loads a font from fonts.gstatic.com/googleapis.com — fonts must stay self-hosted via @fontsource (post-mortem F3).`);
  } else {
    process.stdout.write(`  ✓ no font-CDN font loads in src/ (self-hosted)\n`);
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
