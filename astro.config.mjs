import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import mermaid from 'astro-mermaid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://seanwinslow.com',
  // ============================================================
  // Phase 3c.2 — astro-mermaid integration
  // Source: architecture-spec-v1.md §9.2 + essays-spec-v1.md §8.2.
  // 5-var palette override (OQ-A: ship v1 with 5-var, observe,
  // expand only if rendered SVG looks visually inconsistent).
  // Mermaid must come AFTER mdx() so MDX renders the SVG-wrapped
  // fenced code blocks correctly.
  // ============================================================
  integrations: [
    mdx(),
    mermaid({
      theme: 'base',
      autoTheme: false,
      mermaidConfig: {
        themeVariables: {
          background: '#FFF9F0',
          primaryColor: '#FFF9F0',
          primaryTextColor: '#0A3E42',
          primaryBorderColor: '#0A3E42',
          lineColor: '#546E71',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13px',
          // Essays quadrantChart fills — all four quadrants share the paper
          // bg (no quadrant tinting). Per essays-spec §8.2.
          quadrant1Fill: '#FFF9F0',
          quadrant2Fill: '#FFF9F0',
          quadrant3Fill: '#FFF9F0',
          quadrant4Fill: '#FFF9F0',
        },
      },
    }),
    sitemap(),
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    // Astro 5 has ClientRouter View Transitions stable; no flag needed.
  },
  build: {
    inlineStylesheets: 'auto',
  },
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },
});
