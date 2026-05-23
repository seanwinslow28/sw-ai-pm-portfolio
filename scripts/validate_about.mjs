#!/usr/bin/env node
/**
 * scripts/validate_about.mjs — about-page lead-line + beat-lane gate.
 *
 * Phase 3d scope. Two assertions:
 *
 *   1. The `lead:` frontmatter field on src/content/about/index.mdx
 *      matches the locked PMP §4 row 2 string BYTE-FOR-BYTE. Build
 *      fails on drift. Per about-spec §16 + §17 DoD #2.
 *
 *   2. The `beats[]` frontmatter array contains at least 2 entries
 *      with `lane: braided`. Per about-spec §9.3 ("Rule for the
 *      writer"). Zod can't express min-count-with-predicate cleanly,
 *      so the check lives here.
 *
 * Both failures exit 1; the npm prebuild chain aborts.
 *
 * Source: about-spec-v1.md §16 (build stack) + §17 DoD #2 + §9.3.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ABOUT_MDX = path.join(ROOT, "src/content/about/index.mdx");

const LOCKED_LEAD = "Raised by Saturday morning cartoons and Vercel deployment logs.";

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

function extractBeatsLanes(frontmatter) {
  // Count `lane: braided` occurrences within the beats: array. Cheap
  // string scan — we don't need a full YAML parser for one rule.
  // The beats[] section ends at the next top-level frontmatter key
  // (e.g., `b3_load_bearing_cel:`). Bound the search loosely.
  const beatsStart = frontmatter.indexOf("\nbeats:");
  if (beatsStart === -1) {
    console.error(`❌ beats: field missing in ${path.relative(ROOT, ABOUT_MDX)}.`);
    process.exit(1);
  }
  const beatsBody = frontmatter.slice(beatsStart);
  const braidedMatches = beatsBody.match(/lane:\s*braided/g) || [];
  return braidedMatches.length;
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
    console.error("   OR update PMP §4 + this script's LOCKED_LEAD constant in lockstep.");
    process.exit(1);
  }

  // Assertion 2 — ≥2 braided beats
  const braidedCount = extractBeatsLanes(frontmatter);
  if (braidedCount < 2) {
    console.error(`❌ about-page B-1 braided-beat count too low.`);
    console.error(`   Found ${braidedCount} entries with lane: braided in beats[].`);
    console.error("   Spec §9.3 requires at least 2: braided beats are the load-bearing");
    console.error("   evidence for the parallel-lineage thesis. Re-author beats[] in");
    console.error("   src/content/about/index.mdx to include ≥2 braided entries.");
    process.exit(1);
  }

  console.log(`✓ about: lead-line matches PMP §4 row 2 byte-for-byte`);
  console.log(`✓ about: ${braidedCount} braided beats in beats[] (≥2 required)`);
  console.log("done.");
}

main().catch((err) => {
  console.error("❌ validate_about.mjs failed unexpectedly:", err);
  process.exit(1);
});
