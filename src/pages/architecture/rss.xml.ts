/**
 * /architecture/rss.xml — RSS 2.0 feed for architecture writeups.
 *
 * Items carry the long-form essay HTML (read from
 * src/content/architecture/essays/<slug>.md when fetched, otherwise
 * the MDX body) as content:encoded. Sort matches the index.
 *
 * Per architecture-spec §12.
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

async function readBody(slug: string): Promise<string | null> {
  const p = path.join(ROOT, "src/content/architecture/essays", `${slug}.md`);
  try { return await fs.readFile(p, "utf8"); } catch { return null; }
}

export async function GET(context: { site?: URL }) {
  const writeups = (await getCollection("architecture"))
    .sort((a, b) => b.data.shipped.localeCompare(a.data.shipped));

  const items = await Promise.all(
    writeups.map(async (w) => {
      let content = "";
      if (w.data.essaySourceUrl) {
        const body = await readBody(w.slug);
        if (body) content = body;
      }
      if (!content) content = w.body ?? "";
      return {
        title: w.data.title,
        link: `/architecture/${w.slug}/`,
        pubDate: new Date(`${w.data.shipped}T12:00:00Z`),
        description: w.data.lead,
        content,
        customData: `<status>${w.data.status}</status>`,
      };
    })
  );

  return rss({
    title: "Sean Winslow — Architecture",
    description: "Architectural arguments where the proof is the code, linked.",
    site: context.site ?? new URL("https://seanwinslow.com"),
    items,
    customData: `<language>en-us</language>`,
  });
}
