/**
 * /transactions/rss.xml — RSS 2.0 feed for the ledger.
 *
 * Sorts desc by ISO `shipped`. Items carry full 4Q content as
 * content:encoded (read from the fetched EXPLANATION.md when
 * explanationUrl is set + the canonical file exists; otherwise
 * the MDX body's rendered HTML).
 *
 * Per transactions-spec-v1.md §10.
 */
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

async function readCanonical(slug: string): Promise<string | null> {
  const canonicalPath = path.join(ROOT, "src/content/explanations", `${slug}.md`);
  try {
    return await fs.readFile(canonicalPath, "utf8");
  } catch {
    return null;
  }
}

export async function GET(context: { site?: URL }) {
  const transactions = (await getCollection("transactions"))
    .sort((a, b) => b.data.shipped.localeCompare(a.data.shipped));

  const items = await Promise.all(
    transactions.map(async (t) => {
      // Prefer canonical EXPLANATION.md when fetched; fall back to the MDX body.
      let content = "";
      if (t.data.explanationUrl) {
        const canonical = await readCanonical(t.slug);
        if (canonical) content = canonical;
      }
      if (!content) {
        // Render the MDX body as a string — Astro's renderer is async + returns
        // an Astro component. For RSS we want the raw body text since the
        // inline-body 4Q already carries the same prose as the deep-dive page.
        const { body } = t;
        content = body ?? "";
      }

      return {
        title: t.data.title,
        link: `/transactions/${t.slug}/`,
        pubDate: new Date(`${t.data.shipped}T12:00:00Z`),
        description: t.data.valueProp,
        // content:encoded — wrap in <![CDATA[ ... ]]> so HTML entities don't double-escape
        content: content,
        customData: `<surface>${t.data.surface}</surface><status>${t.data.status}</status>`,
      };
    })
  );

  return rss({
    title: "Sean Winslow — Transactions",
    description: "Every shipped artifact across the agent fleet, dated, with the explanation attached.",
    site: context.site ?? new URL("https://seanwinslow.com"),
    items,
    customData: `<language>en-us</language>`,
  });
}
