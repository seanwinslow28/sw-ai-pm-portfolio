/**
 * /essays/rss.xml — RSS 2.0 feed for essays.
 *
 * content:encoded carries the full essay body (fetched sourceUrl when
 * present; otherwise the MDX body). Sort matches the index.
 *
 * Per essays-spec §12.
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

async function readBody(slug: string): Promise<string | null> {
  const p = path.join(ROOT, "src/content/essays/essay-bodies", `${slug}.md`);
  try { return await fs.readFile(p, "utf8"); } catch { return null; }
}

export async function GET(context: { site?: URL }) {
  const essays = (await getCollection("essays"))
    .sort((a, b) => b.data.published.localeCompare(a.data.published));

  const items = await Promise.all(
    essays.map(async (e) => {
      let content = "";
      if (e.data.sourceUrl) {
        const body = await readBody(e.slug);
        if (body) content = body;
      }
      if (!content) content = e.body ?? "";
      return {
        title: e.data.title,
        link: `/essays/${e.slug}/`,
        pubDate: new Date(`${e.data.published}T12:00:00Z`),
        description: e.data.excerpt,
        content,
        customData: `<status>${e.data.status}</status>`,
      };
    })
  );

  return rss({
    title: "Sean Winslow — Essays",
    description: "Thesis-shaped writing where the artifacts back the claim.",
    site: context.site ?? new URL("https://seanwinslow.com"),
    items,
    customData: `<language>en-us</language>`,
  });
}
