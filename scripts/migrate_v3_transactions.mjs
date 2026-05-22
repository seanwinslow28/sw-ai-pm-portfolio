#!/usr/bin/env node
/**
 * scripts/migrate_v3_transactions.mjs — one-shot V3 → redesign migration.
 *
 * Per transactions-spec-v1.md §11.1 + §12.2 + §12.3.
 *
 * Reads ~/Code-Brain/sw-portfolio/src/content/transactions/*.md (the V3
 * bridge repo, sibling clone of this repo). For each file:
 *   1. Preserves the slug (filename unchanged)
 *   2. Preserves the MDX body verbatim — the inline-body 4Q headings
 *      carry forward via the validator's V3-fallback contract
 *   3. Prompts Sean interactively for the ISO `shipped` date (V3
 *      strings like "May 2026" are too coarse to auto-convert)
 *   4. Maps V3 `beat` to the redesign `surface` enum per §12.3 table
 *      (defaults pre-suggested; Sean confirms or overrides per row)
 *   5. Splits V3 `producedBy` (free-text "Tool A + Tool B") into a
 *      structured methods[] array (Sean reviews each row)
 *   6. Sets status: SHIPPED for all migrated rows (the 2 committed V3
 *      entries are both shipped — Sean can override per row)
 *   7. Drops V3-only fields: loomFrame (the redesign's loomPosterUrl
 *      carries the editorial-photo moment instead)
 *
 * Writes new MDX at src/content/transactions/<slug>.md in THIS repo.
 *
 * Operating posture: this script is interactive and breaks the
 * continuous-execution posture of the build pipeline. It runs OUTSIDE
 * the prebuild gate — Sean invokes it manually:
 *   node scripts/migrate_v3_transactions.mjs
 *
 * After Sean runs it and commits the output, **delete this file** —
 * one-shot, not recurring infrastructure.
 *
 * Source: transactions-spec-v1.md §11.1 + §12.2 + §12.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";

const V3_BRIDGE = path.resolve(process.env.HOME ?? "", "Code-Brain/sw-portfolio/src/content/transactions");
const OUT_DIR = path.resolve(process.cwd(), "src/content/transactions");

// V3 beat → redesign surface mapping (transactions-spec §12.3).
// `cushion-economics` is flagged for manual confirmation per the spec.
const BEAT_TO_SURFACE = {
  "agentic-engineering": "fleet",
  "creative-pipeline": "pipeline",
  "cushion-economics": "MANUAL",          // surface must be picked per-row: product OR infra
};

const VALID_SURFACES = ["fleet", "pipeline", "product", "writing", "infra"];

function parseFrontmatter(src) {
  const m = src.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: src };
  const fm = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w_]+):\s*(.+?)\s*$/);
    if (!kv) continue;
    let value = kv[2];
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fm[kv[1]] = value;
  }
  return { frontmatter: fm, body: m[2] };
}

async function prompt(rl, q, def = "") {
  const suffix = def ? ` [${def}]` : "";
  const ans = (await rl.question(`${q}${suffix}: `)).trim();
  return ans || def;
}

async function migrateRow(rl, fname) {
  const filePath = path.join(V3_BRIDGE, fname);
  const src = await fs.readFile(filePath, "utf8");
  const { frontmatter: v3, body } = parseFrontmatter(src);
  const slug = fname.replace(/\.md$/, "");

  process.stdout.write(`\n━━━ ${slug} ━━━\n`);
  process.stdout.write(`V3 frontmatter:\n`);
  for (const [k, v] of Object.entries(v3)) {
    process.stdout.write(`  ${k}: ${v}\n`);
  }

  // 1. dateline (preserve verbatim or override)
  const dateline = await prompt(rl, "dateline (e.g., BOSTON, MAY 13, 2026)", v3.dateline ?? "");

  // 2. shipped — ISO conversion (V3 is too coarse)
  const shipped = await prompt(rl, `shipped ISO (YYYY-MM-DD) [V3 was "${v3.shipped ?? "?"}"]`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(shipped)) {
    throw new Error(`invalid ISO date: "${shipped}"`);
  }

  // 3. surface — beat → surface mapping with confirmation
  const suggestedSurface = BEAT_TO_SURFACE[v3.beat] ?? "MANUAL";
  let surface = suggestedSurface;
  if (suggestedSurface === "MANUAL") {
    process.stdout.write(`  ⚠ beat "${v3.beat}" requires manual surface assignment.\n`);
    surface = await prompt(rl, `surface (one of: ${VALID_SURFACES.join(", ")})`);
  } else {
    surface = await prompt(rl, `surface`, suggestedSurface);
  }
  if (!VALID_SURFACES.includes(surface)) {
    throw new Error(`invalid surface: "${surface}"`);
  }

  // 4. status (defaults to SHIPPED; the 2 committed V3 entries are both shipped)
  const status = await prompt(rl, `status (ACTIVE / SHIPPED / PAUSED / ARCHIVED)`, "SHIPPED");

  // 5. valueProp (carry forward V3's valueProp verbatim)
  const valueProp = v3.valueProp ?? "";

  // 6. methods — split V3 producedBy on "+" into structured rows
  const producedBy = v3.producedBy ?? "";
  process.stdout.write(`  V3 producedBy: "${producedBy}"\n`);
  process.stdout.write(`  Split into methods[]; press Enter to accept Sean-typed entries one per row.\n`);
  const methods = [];
  const seedItems = producedBy.split("+").map((s) => s.trim()).filter(Boolean);
  for (let i = 0; i < seedItems.length; i++) {
    process.stdout.write(`  -- method row ${i + 1} (seeded from "${seedItems[i]}") --\n`);
    const task = await prompt(rl, `  task`);
    const tool = await prompt(rl, `  tool`, seedItems[i]);
    const cost = await prompt(rl, `  cost`, "local / $0");
    const link = await prompt(rl, `  link (/work/<slug> or external; "null" to omit)`, "null");
    if (!task) continue;
    methods.push({ task, tool, cost, link: link === "null" ? null : link });
  }
  // Add additional rows interactively (empty task ends the loop)
  while (true) {
    process.stdout.write(`  -- add another method row? (empty task to skip) --\n`);
    const task = await prompt(rl, `  task`);
    if (!task) break;
    const tool = await prompt(rl, `  tool`);
    const cost = await prompt(rl, `  cost`, "local / $0");
    const link = await prompt(rl, `  link`, "null");
    methods.push({ task, tool, cost, link: link === "null" ? null : link });
  }
  if (methods.length === 0) {
    throw new Error(`${slug}: methods[] must have at least 1 entry`);
  }

  // 7. limitations — V3 carries them as a list; preserve verbatim
  const limitations = [];
  const v3LimRaw = src.match(/^limitations:\s*\n((?:\s+-\s+.+\n)+)/m);
  if (v3LimRaw) {
    for (const line of v3LimRaw[1].split("\n")) {
      const m = line.match(/^\s+-\s+(.+)$/);
      if (m) limitations.push(m[1].trim().replace(/^["']|["']$/g, ""));
    }
  }
  if (limitations.length === 0) {
    process.stdout.write(`  no limitations[] in V3 — add at least one (transactions-spec §3.2 min 1).\n`);
    const lim = await prompt(rl, `  limitation 1`);
    if (lim) limitations.push(lim);
  }

  // Optional editorial
  const repoUrl = await prompt(rl, `repoUrl (https://github.com/... or empty)`, "");
  const loomUrl = await prompt(rl, `loomUrl (or empty)`, "");

  // Build new MDX
  const fm = [
    "---",
    `title: "${(v3.title ?? "").replace(/"/g, '\\"')}"`,
    `dateline: "${dateline}"`,
    `shipped: ${shipped}`,
    ``,
    `surface: ${surface}`,
    `status: ${status}`,
    ``,
    `valueProp: ${JSON.stringify(valueProp)}`,
    `methods:`,
    ...methods.flatMap((m) => [
      `  - task: ${JSON.stringify(m.task)}`,
      `    tool: ${JSON.stringify(m.tool)}`,
      `    cost: ${JSON.stringify(m.cost)}`,
      `    link: ${m.link === null ? "null" : JSON.stringify(m.link)}`,
    ]),
    `limitations:`,
    ...limitations.map((l) => `  - ${JSON.stringify(l)}`),
    ``,
    `# 4Q source: inline-body fallback (V3-bridge legacy contract).`,
    `# explanationUrl: <upstream EXPLANATION.md URL> when one exists.`,
    ``,
    `# Cross-links (all optional; derive_crosslinks.mjs enforces resolution):`,
    `# relatedCaseStudy: <work-slug>`,
    `# relatedTransactions: [<txn-slug>, ...]`,
    `# previousVersion: <txn-slug>`,
    `# relatedArchitecture: <arch-slug> | [<arch-slug>, ...]`,
    ``,
    repoUrl ? `repoUrl: ${repoUrl}` : `# repoUrl: <url>`,
    loomUrl ? `loomUrl: ${loomUrl}` : `# loomUrl: <url>`,
    `---`,
    ``,
    body.trim(),
    ``,
  ].join("\n");

  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUT_DIR, `${slug}.mdx`), fm, "utf8");
  process.stdout.write(`  → wrote src/content/transactions/${slug}.mdx\n`);
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  process.stdout.write(`\nmigrate_v3_transactions.mjs — one-shot V3 → redesign migration\n`);
  process.stdout.write(`Reading V3 bridge: ${V3_BRIDGE}\n`);

  const files = await fs.readdir(V3_BRIDGE).catch((e) => {
    process.stderr.write(`✗ V3 bridge not found at ${V3_BRIDGE}: ${e.message}\n`);
    process.exit(1);
  });
  const mdFiles = files.filter((f) => f.endsWith(".md"));
  process.stdout.write(`Found ${mdFiles.length} V3 transaction(s).\n`);

  for (const fname of mdFiles) {
    try {
      await migrateRow(rl, fname);
    } catch (e) {
      process.stderr.write(`✗ ${fname}: ${e.message}\n`);
      const cont = await rl.question(`continue with next? (y/n): `);
      if (cont.trim().toLowerCase() !== "y") break;
    }
  }

  rl.close();
  process.stdout.write(`\ndone. Review the new MDX, run \`npm run validate\`, then commit.\n`);
  process.stdout.write(`After committing the migrated entries, **delete this script** — it's one-shot.\n`);
}

main().catch((e) => {
  process.stderr.write(`migrate_v3_transactions.mjs: ${e.stack || e.message}\n`);
  process.exit(1);
});
