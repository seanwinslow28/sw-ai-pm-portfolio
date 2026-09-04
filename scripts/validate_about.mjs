#!/usr/bin/env node
/**
 * scripts/validate_about.mjs — about-page locked-copy gate.
 *
 * One assertion:
 *
 *   The MDX body contains the page's one permitted paragraph
 *   (2026-08-06 sidecar L13, FINAL text) byte-for-byte after
 *   whitespace collapse. It is the page's only prose.
 *
 * (The lead-line byte-check retired 2026-08-08 with the on-page title —
 * Sean's round-2 preview review; the "Raised by..." line survives in the
 * meta description, which this script no longer polices.)
 *
 * Failure exits 1; the npm prebuild chain aborts.
 *
 * Source: about-spec-v1.md §16 (build stack); sidecar L13.
 */
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const ABOUT_MDX = path.join(ROOT, "src/content/about/index.mdx");

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
  extractFrontmatter(mdx); // still asserts a well-formed frontmatter block

  // The one permitted paragraph, byte-locked (whitespace-collapsed)
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

  console.log(`✓ about: the L13 paragraph is present verbatim (whitespace-collapsed)`);
  console.log("done.");
}

main().catch((err) => {
  console.error("❌ validate_about.mjs failed unexpectedly:", err);
  process.exit(1);
});
