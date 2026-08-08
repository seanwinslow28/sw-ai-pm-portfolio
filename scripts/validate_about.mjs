#!/usr/bin/env node
/**
 * scripts/validate_about.mjs — about-page locked-copy gate.
 *
 * Two assertions:
 *
 *   1. The `lead:` frontmatter field on src/content/about/index.mdx
 *      matches the locked PMP §4 row 2 string BYTE-FOR-BYTE. Build
 *      fails on drift. Per about-spec §16 + §17 DoD #2.
 *
 *   2. The MDX body contains the page's one permitted paragraph
 *      (2026-08-06 sidecar L13, FINAL text) byte-for-byte after
 *      whitespace collapse. The paragraph replaced the Beats band
 *      (+ its ≥2-braided-beats check) in the 2026-08-08 About v2
 *      recut — it is now the page's only prose, locked as hard as
 *      the lead.
 *
 * Both failures exit 1; the npm prebuild chain aborts.
 *
 * Source: about-spec-v1.md §16 (build stack) + §17 DoD #2; sidecar L13.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ABOUT_MDX = path.join(ROOT, "src/content/about/index.mdx");

const LOCKED_LEAD = "Raised by Saturday morning cartoons and Vercel deployment logs.";

const LOCKED_PARAGRAPH =
  "I studied film in college and taught myself animation in my parents' basement. " +
  "I managed teams in studios and timelines in editing software. " +
  "One day, I played around with generating images and my whole world changed. " +
  "I fell down the AI rabbit hole and never looked back. " +
  "I was suddenly deep into product meetings, agentic frameworks, and prototypes. " +
  "Now I spend my days building agent systems and holding them to the same bar I held my drawings to. " +
  "It ships when it's right.";

async function readAboutMdx() {
  try {
    return await fs.readFile(ABOUT_MDX, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") {
      console.error(`❌ ${path.relative(ROOT, ABOUT_MDX)} not found.`);
      console.error("   Phase 3d Task 8.2 lands this file. Re-run validation after Task 8.2.");
      process.exit(1);
    }
    throw err;
  }
}

function extractFrontmatter(mdx) {
  const match = mdx.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    console.error(`❌ ${path.relative(ROOT, ABOUT_MDX)} has no YAML frontmatter block.`);
    process.exit(1);
  }
  return match[1];
}

function extractLead(frontmatter) {
  // Match `lead: "…"` or `lead: '…'`; per about-spec the value is a
  // double-quoted string. Single-line only — multi-line YAML scalars
  // are rejected here as a side-effect (the locked string fits on
  // one line).
  const dq = frontmatter.match(/^lead:\s*"([^"]*)"\s*$/m);
  const sq = frontmatter.match(/^lead:\s*'([^']*)'\s*$/m);
  if (dq) return dq[1];
  if (sq) return sq[1];
  console.error(`❌ lead: field missing or not a single-line quoted string in ${path.relative(ROOT, ABOUT_MDX)}.`);
  console.error("   Expected format: lead: \"…\"");
  process.exit(1);
}

function extractBody(mdx) {
  // Everything after the closing frontmatter fence.
  const match = mdx.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?([\s\S]*)$/);
  return match ? match[1] : "";
}

function collapseWhitespace(s) {
  return s.replace(/\s+/g, " ").trim();
}

async function main() {
  const mdx = await readAboutMdx();
  const frontmatter = extractFrontmatter(mdx);

  // Assertion 1 — lead-line byte-match
  const lead = extractLead(frontmatter);
  if (lead !== LOCKED_LEAD) {
    console.error(`❌ about-page lead-line drift detected.`);
    console.error(`   Expected: ${JSON.stringify(LOCKED_LEAD)}`);
    console.error(`   Got:      ${JSON.stringify(lead)}`);
    console.error("   PMP §4 row 2 is the source of truth; edit src/content/about/index.mdx to match,");
    console.error("   OR update PMP §4 + this script's LOCKED_PARAGRAPH/LOCKED_LEAD constants in lockstep.");
    process.exit(1);
  }

  // Assertion 2 — the one permitted paragraph, byte-locked (whitespace-collapsed)
  const body = collapseWhitespace(extractBody(mdx));
  if (!body.includes(LOCKED_PARAGRAPH)) {
    console.error(`❌ about-page paragraph drift detected.`);
    console.error("   The sidecar-L13 FINAL paragraph must appear in the MDX body verbatim");
    console.error("   (whitespace-collapsed). It is the page's only prose and is locked as");
    console.error("   hard as the lead. Restore it in src/content/about/index.mdx, OR update");
    console.error("   this script's LOCKED_PARAGRAPH constant only with Sean's sign-off.");
    console.error(`   Expected to find: ${JSON.stringify(LOCKED_PARAGRAPH.slice(0, 80))}…`);
    process.exit(1);
  }

  console.log(`✓ about: lead-line matches PMP §4 row 2 byte-for-byte`);
  console.log(`✓ about: the L13 paragraph is present verbatim (whitespace-collapsed)`);
  console.log("done.");
}

main().catch((err) => {
  console.error("❌ validate_about.mjs failed unexpectedly:", err);
  process.exit(1);
});
