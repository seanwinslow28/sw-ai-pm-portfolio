<?xml version="1.0" encoding="UTF-8"?>
<!--
  public/rss/styles.xsl — browser-facing landing for the RSS feeds.

  Referenced from each feed via rss({ stylesheet: "/rss/styles.xsl" }), which
  injects an <?xml-stylesheet?> PI at the top of the XML. Feed readers ignore
  it and parse the raw RSS 2.0; a human who opens the feed in a browser sees
  this on-brand page instead of the raw XML tree.

  Standalone: this does NOT inherit the site's fonts or CSS. Styling is inlined
  with web-safe stacks only (no font CDN — that would regress the self-hosted
  font fix and trip the prebuild font guard). Paper / ink / teal / stamp-amber
  per DESIGN.md. No em dashes in any authored copy here.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title><xsl:value-of select="/rss/channel/title"/> / RSS</title>
        <style>
          :root {
            --paper: #FFF9F0;
            --ink: #1A1A1E;
            --ink-secondary: #546E71;
            --teal: #0A3E42;
            --stamp-amber: #7C2D12;
            --border: rgba(10, 62, 66, 0.14);
            --serif: Georgia, "Times New Roman", serif;
            --mono: "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            background-color: var(--teal);
            color: var(--ink);
            font-family: var(--serif);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
          }
          .sheet {
            max-width: 720px;
            margin: 48px auto;
            background-color: var(--paper);
            padding: 48px 40px 56px;
            border-radius: 2px;
          }
          .kicker {
            font-family: var(--mono);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: var(--stamp-amber);
            margin: 0 0 12px;
          }
          h1 {
            font-family: var(--serif);
            font-size: 34px;
            font-weight: 600;
            line-height: 1.15;
            color: var(--teal);
            margin: 0 0 10px;
          }
          .channel-desc {
            font-size: 19px;
            color: var(--ink);
            margin: 0 0 24px;
          }
          .blurb {
            font-family: var(--mono);
            font-size: 13px;
            line-height: 1.6;
            color: var(--ink-secondary);
            background-color: rgba(10, 62, 66, 0.04);
            border-left: 2px solid var(--stamp-amber);
            padding: 14px 18px;
            margin: 0 0 40px;
            border-radius: 0 2px 2px 0;
          }
          .blurb a { color: var(--teal); }
          .items-head {
            font-family: var(--mono);
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            color: var(--ink-secondary);
            border-bottom: 1px solid var(--border);
            padding-bottom: 8px;
            margin: 0 0 24px;
          }
          .item {
            padding: 0 0 24px;
            margin: 0 0 24px;
            border-bottom: 1px solid var(--border);
          }
          .item:last-child { border-bottom: none; margin-bottom: 0; }
          .item h2 { font-size: 21px; font-weight: 600; line-height: 1.25; margin: 0 0 6px; }
          .item h2 a { color: var(--teal); text-decoration: none; }
          .item h2 a:hover { text-decoration: underline; }
          .item .date {
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
            color: var(--stamp-amber);
            margin: 0 0 8px;
          }
          .item .desc { font-size: 16px; color: var(--ink); margin: 0; }
          .footer {
            font-family: var(--mono);
            font-size: 11px;
            letter-spacing: 0.6px;
            color: var(--ink-secondary);
            margin-top: 40px;
          }
          .footer a { color: var(--teal); }
        </style>
      </head>
      <body>
        <main class="sheet">
          <p class="kicker">RSS feed</p>
          <h1><xsl:value-of select="/rss/channel/title"/></h1>
          <p class="channel-desc"><xsl:value-of select="/rss/channel/description"/></p>

          <p class="blurb">
            This is an RSS feed, not a broken page. Copy this page's address
            from your browser's address bar and paste it into your reader to
            subscribe. New items show up there as they ship.
          </p>

          <p class="items-head">
            Latest (<xsl:value-of select="count(/rss/channel/item)"/>)
          </p>

          <xsl:for-each select="/rss/channel/item">
            <div class="item">
              <p class="date"><xsl:value-of select="pubDate"/></p>
              <h2>
                <a href="{link}"><xsl:value-of select="title"/></a>
              </h2>
              <p class="desc"><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>

          <p class="footer">
            Back to <a href="{/rss/channel/link}"><xsl:value-of select="/rss/channel/link"/></a>
          </p>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
