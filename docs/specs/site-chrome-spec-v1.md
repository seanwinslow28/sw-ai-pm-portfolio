# Site Chrome + Footer v1 — Build Spec

> **Status:** LOCKED 2026-05-20. All 5 OPEN-N items resolved to recommended defaults per [`BLUEPRINT-COMPLETE.md`](BLUEPRINT-COMPLETE.md) §4.8 (email = `sean@seanwinslow.com`, wordmark = `SW` mono uppercase, sticky-nav on sub-pages, `/contact/` route preserved, "view the source" link included). See [CHANGELOG.md](../../CHANGELOG.md) for the lock entry.
> **Scope:** Global site chrome — the `BaseLayout.astro` shell, top nav, universal footer (which folds in Contact), the `/contact/` minimal route, the 404 page, theme toggle, skip link, meta-tag defaults, RSS auto-discovery, sitemap. Inherits everything from the five prior locked specs.
> **The smallest of the redesign specs.** Restraint is the principle — this is the part of the site that LITERALLY repeats on every page.
> **Buildable as-is** once locked. Hand to a Claude Code session with this file + the five inherited specs open.

---

## 1. The Site Chrome, in one sentence

A nav-free home page + thin sticky top nav on every sub-page + a universal 3-column wire-service footer (Contact / Subscribe / Dashboard) anchored by a text-label theme toggle and a dated copyright — wrapping every page in calm wire-service register without ever competing with the editorial content above it.

## 1.1 Changelog

- **2026-05-17:** Initial draft. Kills the V3-bridge `<form>`-based `/contact/` route (placeholder-alert pattern). Kills the V3 React islands `<NavIsland.jsx>` + `<SmoothScroll.jsx>`. Keeps the V3 theme-cookie pattern verbatim. Folds in Contact per About spec §18 deferral. Aggregates all three collection RSS feeds (`/transactions/`, `/architecture/`, `/essays/`) into the footer's Subscribe column. Reconciles the nav-budget tension between hero spec §13 (home has no nav) and the four collection specs (sub-pages have implicit ~56px desktop / ~48px mobile nav above their vertical budgets) via a `noChrome` BaseLayout prop.

---

## 2. Anatomy

### 2.1 Top nav (sub-pages only)

```
┌──────────────────────────────────────────────────────────────────────┐
│  SW                          WORK · TRANSACTIONS · ARCHITECTURE ·    │
│                              ESSAYS · ABOUT                          │
└──────────────────────────────────────────────────────────────────────┘
   ↑ wordmark (mono)                ↑ 5 sibling tabs, right-aligned (mono)
   links to home                      active tab gets 1px stamp-amber
                                       bottom border + aria-current="page"
```

56px tall desktop / 48px mobile. Paper bg `#FFF9F0`. 0.5px teal bottom border. `position: sticky; top: 0; z-index: 100`. Wordmark links to `/`; each tab links to its route. No center element. No search. No hamburger.

**Home page (`/`) does NOT render the nav** — controlled by the `noChrome={true}` flag on BaseLayout. The hero owns the top of the home page per hero spec §13.

### 2.2 Universal footer (every page including home)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│                     ── 0.5px teal top border ──                      │
│                                                                      │
│  CONTACT                  SUBSCRIBE                 DASHBOARD        │
│                                                                      │
│  → email                  → /transactions/rss.xml   → view the       │
│    sean@seanwinslow.com   → /architecture/rss.xml     fleet ↗        │
│  → linkedin ↗             → /essays/rss.xml         → view the       │
│  → github ↗               → read on substack ↗         source ↗      │
│                                                                      │
│  ─────────────────────────────────────────────────────────────       │
│                                                                      │
│  LIGHT · DARK                              © 2026 SEAN WINSLOW ·     │
│                                              BOSTON                  │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

3-column grid (desktop) + bottom strip. Wire-service mono throughout. Paper bg with 0.5px teal top border (**no torn-paper edge between page content and footer** — torn-paper is reserved for editorial section seams, not page-to-chrome transitions). 60px vertical padding desktop / 40px mobile.

### 2.3 `/contact/` route (minimal, preserves V3 SEO)

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON · CONTACT                                                    │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  Contact                                                             │
│                                                                      │
│  Email me at sean@seanwinslow.com.                                   │
│                                                                      │
│  → email · sean@seanwinslow.com                                      │
│  → linkedin.com/in/seanwinslow ↗                                     │
│  → github.com/seanwinslow ↗                                          │
│                                                                      │
│  ◐ registration mark (page closeout, bottom-right)                   │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, into chrome footer) ╲╱╲╱╲╱╲╱╲
```

~600px page height. Sober one-paragraph + 3 mono links. **No form. No "Let's talk!" energy.** The page exists primarily to preserve V3-bridge bookmarks pointing at `/contact/`; the meaningful surface is the chrome footer's Contact column.

### 2.4 `/404/` route

```
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (top) ╲╱╲╱╲╱╲╱╲
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  BOSTON · 404                                                        │
│  ──────────────────────────────────────────────────────────────      │
│                                                                      │
│  PAGE NOT FOUND                                                      │
│                                                                      │
│  Nothing at this URL.                                                │
│                                                                      │
│  → HOME                                                              │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
                    ╲╱╲╱╲╱╲╱╲ torn-paper edge (bottom, into chrome footer) ╲╱╲╱╲╱╲╱╲
```

~400px page height. Sober wire-service. No comedy, no illustration, no apologetic tone. The mono `→ HOME` link is the only affordance besides the universal footer.

---

## 3. The `noChrome` contract

### 3.1 BaseLayout prop

```ts
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  noChrome?: boolean;  // suppresses the top nav only; footer always renders
}
```

### 3.2 Per-route default behavior

| Route | `noChrome` | Top nav renders? | Footer renders? |
|---|---|---|---|
| `/` (home) | `true` | NO | YES |
| `/work/<slug>/` | `false` | YES | YES |
| `/transactions/` + `/transactions/<surface>/` + `/transactions/<slug>/` | `false` | YES | YES |
| `/architecture/` + `/architecture/<slug>/` | `false` | YES | YES |
| `/essays/` + `/essays/<slug>/` | `false` | YES | YES |
| `/about/` | `false` | YES | YES |
| `/contact/` | `false` | YES | YES |
| `/404.html` | `false` | YES | YES |

### 3.3 Vertical-budget reconciliation with prior specs

All five collection specs assumed implicit nav height in their desktop/mobile budgets:

- Sub-page content area starts **56px below viewport top** on desktop (the nav)
- Sub-page content area starts **48px below viewport top** on mobile
- Footer adds ~280-360px desktop / ~480-560px mobile to the end of every page

The hero spec §3 vertical budget (hero ~720px desktop) assumed no nav above. With `noChrome={true}` the home page renders the hero starting from `y=0` exactly as hero spec §3 specified. **No vertical-budget conflict.**

---

## 4. Type system (deltas only)

Inherits hero §4 + case-study §4 + ledger §5 + architecture §5 + essays §5. Chrome-specific:

| Role | Font | Size | Weight | Tracking | Color |
|---|---|---|---|---|---|
| **Wordmark "SW"** | JetBrains Mono | 14 (both) | 500 | 1.4px uppercase | `#0A3E42` |
| **Nav tab (inactive)** | JetBrains Mono | 12 (both) | 500 | 1.2px uppercase | `#546E71` |
| **Nav tab (hover / active)** | JetBrains Mono | 12 (both) | 500 | 1.2px uppercase | `#0A3E42` + 1px stamp-amber bottom border (active only) |
| **Footer column header** | JetBrains Mono | 11 (both) | 500 | 1.8px uppercase | `#7C2D12` (stamp amber) |
| **Footer link** | JetBrains Mono | 13 (both) | 500 | 0.8px | `#0A3E42` (no underline default, underline on hover) |
| **Footer external-link glyph** `↗` | JetBrains Mono | 12 (both) | 400 | 0 | `#546E71` |
| **Theme toggle label (active)** | JetBrains Mono | 11 (both) | 500 | 1.6px uppercase | `#0A3E42` |
| **Theme toggle label (inactive)** | JetBrains Mono | 11 (both) | 400 | 1.6px uppercase | `#546E71` |
| **Theme toggle separator** `·` | JetBrains Mono | 11 (both) | 400 | 1.6px | `#546E71` |
| **Copyright** | JetBrains Mono | 11 (both) | 400 | 1.2px uppercase | `#546E71` |
| **Skip link** | JetBrains Mono | 13 (both) | 500 | 1.0px | `#FFF9F0` (paper) on `#7C2D12` (stamp amber) bg |
| **404 h1** | Newsreader | `clamp(40px, 5vw, 72px)` | 400 | -0.4px | `#0A3E42` |
| **404 body** | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
| **404 mono link** `→ HOME` | JetBrains Mono | 14 (both) | 500 | 1.0px | `#0A3E42` |
| **`/contact/` h1** | Newsreader | `clamp(40px, 5vw, 72px)` | 400 | -0.4px | `#0A3E42` |
| **`/contact/` body** | Newsreader | 20 / 18 | 300 | -0.1px | `#1A1A1E` |
| **`/contact/` mono links** | JetBrains Mono | 14 / 13 | 500 | 0.8px | `#0A3E42` |

**Voice register:** wire-service mono throughout the chrome — except the 404 page's body sentence and the `/contact/` page's calm one-paragraph, which use Newsreader 20px weight 300 (matches /architecture/ + /essays/ body register). **No Sedaris on the chrome.** No comedic register. The chrome is the calm frame around the content — it must never be the personality moment.

---

## 5. Color rules (chrome scope)

| Element | Color rule |
|---|---|
| Nav bg | `#FFF9F0` (paper) |
| Nav bottom border | 0.5px `rgba(10, 62, 66, 0.15)` |
| Footer bg | `#FFF9F0` (paper) |
| Footer top border | 0.5px `rgba(10, 62, 66, 0.15)` |
| Active nav tab indicator | 1px `#7C2D12` (stamp amber) bottom border, 4px below text baseline |
| Skip link | `#FFF9F0` text on `#7C2D12` bg when focused; visually hidden (sr-only pattern) otherwise |
| 404 page bg | `#FFF9F0` (paper) — full bleed |
| `/contact/` page bg | `#FFF9F0` (paper) — full bleed |
| Dark-mode tokens | per V3 bridge's `data-theme="dark"` palette; defined site-wide but home hero stays light-only per hero spec §14 |

KILL: drop shadows on the nav (no elevation), background blur (no glass morphism), gradient borders (no decoration). The chrome stays flat.

---

## 6. The nav

### 6.1 Sticky behavior

`position: sticky; top: 0; z-index: 100`. The nav stays at the top of the viewport as the user scrolls a sub-page. Paper bg masks content scrolling beneath. **No scroll-aware hide/reveal** (no "nav disappears when scrolling down, reappears when scrolling up") — too template-coded, adds JS.

### 6.1.1 First-sub-page impression — locked

The site uses **two navigation grammars**: no-nav on home (mynrd-coded linear scroll, one beat at a time), sticky-nav on every sub-page (recruiters reading a 2k-word essay need escape). This is a deliberate split — but the first sub-page visit risks reading as "wait, where did the no-nav site go?"

Three rules mitigate:

1. **The sticky nav uses the same chrome substrate as the home footer** (cream-on-teal, JetBrains Mono, no animated reveal). The visitor sees the chrome teal — the substrate they've already been looking through since the home page — and registers continuity, not change.
2. **The first sub-page nav reveal is delayed 600ms after View Transition completes.** The recruiter lands; the page renders; *then* the nav fades in from translateY(-8px). Reads as "the page added a nav for me," not "a different site loaded."
3. **Mockup verification before build complete:** a build-time QA step renders the home → first-sub-page transition in Playwright and visually inspects that the chrome continuity reads correctly. Logged as a DoD item in this spec's Definition of Done.

### 6.2 Active route highlighting

Server-rendered via `Astro.url.pathname` comparison. Each nav tab renders as:

```astro
<a
  href="/work/"
  class={pathname.startsWith('/work/') ? 'active' : ''}
  aria-current={pathname.startsWith('/work/') ? 'page' : undefined}
>
  WORK
</a>
```

`pathname.startsWith('/work/')` matches both `/work/` and `/work/animation-pipeline/`. Same pattern for the other 4 tabs.

### 6.3 Mobile behavior

5 tabs may wrap to 2 lines below ~640px viewport. Wordmark stays left-aligned; tabs flow right-aligned with `flex-wrap: wrap`. Pad reduces from 24px / 16px → 16px / 12px. Font stays 12px. **No hamburger, no slide-out drawer, no fullscreen overlay.**

### 6.4 View Transitions

The nav element sits OUTSIDE `<main>`, persists across page transitions (no fade, no morph, no transition-name shared). When the user navigates work → about, the nav stays in place; only the `<main>` content swaps with the View Transition.

### 6.5 Accessibility

- `<header><nav aria-label="Primary navigation">...</nav></header>`
- Each tab is a real `<a>` element
- `aria-current="page"` on the active tab
- Skip link as the first focusable element in `<body>`, jumps to `#main-content`
- Keyboard order: skip link → wordmark → 5 tabs → page content → footer

---

## 7. The footer

### 7.1 Structure

```
<footer>
  <div class="footer__columns">
    <section aria-labelledby="footer-contact-heading">
      <h2 id="footer-contact-heading">CONTACT</h2>
      <ul>
        <li>→ email · <a href="mailto:sean@seanwinslow.com">sean@seanwinslow.com</a></li>
        <li>→ <a href="https://linkedin.com/in/seanwinslow">linkedin.com/in/seanwinslow</a> ↗</li>
        <li>→ <a href="https://github.com/seanwinslow">github.com/seanwinslow</a> ↗</li>
      </ul>
    </section>
    <section aria-labelledby="footer-subscribe-heading">
      <h2 id="footer-subscribe-heading">SUBSCRIBE</h2>
      <ul>
        <li>→ <a href="/transactions/rss.xml">transactions / rss</a></li>
        <li>→ <a href="/architecture/rss.xml">architecture / rss</a></li>
        <li>→ <a href="/essays/rss.xml">essays / rss</a></li>
        <li>→ <a href="https://sean.substack.com">read on substack</a> ↗</li>
      </ul>
    </section>
    <section aria-labelledby="footer-dashboard-heading">
      <h2 id="footer-dashboard-heading">DASHBOARD</h2>
      <ul>
        <li>→ <a href="https://fleet.seanwinslow.com">view the fleet</a> ↗</li>
        <li>→ <a href="https://github.com/seanwinslow/sw-portfolio">view the source</a> ↗</li>
      </ul>
    </section>
  </div>
  <div class="footer__strip">
    <ThemeToggle />
    <p class="copyright">© 2026 SEAN WINSLOW · BOSTON</p>
  </div>
</footer>
```

### 7.2 Desktop layout

3 equal columns via CSS Grid (`grid-template-columns: repeat(3, 1fr)`). Column gap 40px. Bottom strip below the columns: theme toggle left-aligned, copyright right-aligned. 60px vertical padding. Max-width matches the site's max-width (1120px).

### 7.3 Mobile layout

Columns stack vertically (`grid-template-columns: 1fr` below 768px). Bottom strip stacks: theme toggle on top, copyright below. 40px vertical padding.

### 7.4 Column headers

Mono 11px weight 500 tracking 1.8px uppercase, stamp amber `#7C2D12`. 16px below the column header is the link list. List items use a `→` glyph prefix (not bullet markers) to inherit the wire-service register from the rest of the site.

### 7.5 External-link glyph

`↗` (U+2197 NORTH EAST ARROW) appears after every external URL. NOT applied to internal RSS links or mailto. Mono 12px secondary ink, 4px left margin from the link text.

### 7.6 Why the footer is on the home page too

The home page has no top nav per hero spec §13 — but it still needs an end-of-page navigation surface. The footer IS that surface on the home page: visitor scrolls hero → projects → about → reaches footer → finds Contact + Subscribe + Dashboard. **The home page's footer is the only navigation affordance the home page provides.** This is the mynrd-coded linear-scroll discipline operationalized.

### 7.7 Why the "view the source" link

The portfolio's thesis is comprehension + transparency. Showing the portfolio's own repo materializes the claim. Recruiters who care about how the site is built can click through; recruiters who don't, don't. **Transparency at zero UX cost.**

---

## 8. The theme toggle

> **Phase 3e (2026-05-22) — DEVIATION: dark mode removed entirely.** The toggle was deleted, the `:root[data-theme="dark"]` token block was deleted, and the FOUC-prevention cookie reader in `BaseLayout.astro` was deleted. The V3 bridge `sw-theme` cookie may still exist in legacy browsers but is no longer read or honored. Sections §8.1–§8.6 below remain as historical reference for the rationale; do not implement them. Re-introducing dark mode would require a fresh design pass — the warm-paper torn-paper texture and the hero animation aren't currently dark-mode-compatible. See CHANGELOG for the bug context.

### 8.1 Visual

```
LIGHT · DARK
```

Two mono labels separated by a `·`. The active mode is weight 500 + `#0A3E42`; the inactive mode is weight 400 + `#546E71`. Click toggles. Hovering an inactive label shifts it 1px upward (subtle affordance) without changing color until clicked.

### 8.2 KILL alternatives

- **Sun/moon icon swap** — template-coded; competes with the wire-service register
- **Slider switch with knob** — luxury-PM-coded
- **Auto-detect via `prefers-color-scheme`** — V3 didn't ship it; PMP §10 Decision 3 keeps manual-only for v1; auto-detect is v2

### 8.3 Persistence + FOUC prevention

Same pattern as V3 bridge:

```html
<!-- In BaseLayout <head>, BEFORE first paint -->
<script is:inline>
  (function() {
    var match = document.cookie.match(/sw-theme=(light|dark)/);
    var theme = match ? match[1] : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

Cookie attributes: `sw-theme=<value>; path=/; max-age=31536000; SameSite=Lax`. No `Secure` flag in local dev; production sets it via Vercel header.

### 8.4 Click handler

~15 lines of vanilla JS in `<ThemeToggle.astro>`:

```js
const toggle = document.querySelector('.theme-toggle');
toggle.addEventListener('click', (e) => {
  if (e.target.dataset.theme) {
    const newTheme = e.target.dataset.theme;
    document.documentElement.setAttribute('data-theme', newTheme);
    document.cookie = `sw-theme=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    toggle.querySelectorAll('[data-theme]').forEach(el => {
      el.classList.toggle('active', el.dataset.theme === newTheme);
    });
  }
});
```

No framework, no React island, no Astro component re-render. Pure DOM.

### 8.5 Dark-mode scope

Per PMP §10 Decision 3 + hero spec §14:
- v1 ships **light-mode default**
- Manual toggle in footer
- Dark-mode color tokens defined site-wide (continuation of V3 bridge's `data-theme="dark"` palette)
- **Home hero remains light-only per hero spec §14** even when theme is set to dark — the hero's character lane, paper texture, and dateline are all calibrated for light mode; dark-mode home hero is v2
- Sub-pages render in dark mode normally when toggled

When a visitor is in dark mode and lands on `/`, the home hero forces back to light for that page only; sub-pages restore the toggled preference.

### 8.6 Time-of-day auto-switch (D5)

Deferred to v2. The cookie-persisted manual toggle is the v1 affordance.

---

## 9. The `/contact/` minimal route

### 9.1 Why preserve the route

V3 bridge launched `/contact/` Mon 2026-05-19 with a non-functional form. Search engines + recruiter bookmarks may point at it during the redesign crossover window. **Dropping the route would 404 those bookmarks.** Preserving it as a minimal page costs ~80 lines of Astro + 1 paragraph of prose.

### 9.2 Render

Wrapped in BaseLayout with full chrome. ~600px page height.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { EMAIL, LINKEDIN_URL, GITHUB_URL } from '../lib/site.ts';
---
<BaseLayout title="Contact — Sean Winslow" description="Email me at sean@seanwinslow.com.">
  <article class="contact-page">
    <div class="dateline">BOSTON · CONTACT</div>
    <hr />
    <h1>Contact</h1>
    <p>Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    <ul class="contact-links">
      <li>→ email · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
      <li>→ <a href={LINKEDIN_URL}>linkedin.com/in/seanwinslow</a> ↗</li>
      <li>→ <a href={GITHUB_URL}>github.com/seanwinslow</a> ↗</li>
    </ul>
  </article>
</BaseLayout>
```

### 9.3 What's killed

- The V3 form (`<form>` with name/email/message + non-functional `alert()`)
- "Let's talk. Whether it's a product opportunity..." copy
- "What's on your mind?" placeholder
- "Send Message" button
- Social-row icons rendered as SVG (replaced with mono text links)

### 9.4 What stays

- The route at `/contact/` resolves
- A page exists for V3 bookmarks
- The same Contact affordances surface in the chrome footer below

---

## 10. The `/404/` page

### 10.1 Render

`src/pages/404.astro` wrapped in BaseLayout. ~400px page height.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---
<BaseLayout title="Not Found — Sean Winslow" description="Nothing at this URL.">
  <article class="not-found">
    <div class="dateline">BOSTON · 404</div>
    <hr />
    <h1>PAGE NOT FOUND</h1>
    <p>Nothing at this URL.</p>
    <p><a href="/" class="mono-link">→ HOME</a></p>
  </article>
</BaseLayout>
```

### 10.2 Serving

Astro renders `404.astro` at `/404.html`. Vercel serves it on any unmatched route. No additional config needed.

### 10.3 Tone discipline

**No comedy.** No "lost in the wilderness" framing. No illustration. No "let's get you back on track!" energy. The 404 is a fact, stated calmly. The mono `→ HOME` link is the only affordance besides the universal footer below it.

---

## 11. The site constants module

`src/lib/site.ts` — single source of truth for URLs + identity values that appear across the chrome + the minimal pages:

```ts
export const EMAIL = "sean@seanwinslow.com";
export const LINKEDIN_URL = "https://linkedin.com/in/seanwinslow";
export const GITHUB_URL = "https://github.com/seanwinslow";
export const SUBSTACK_URL = "https://sean.substack.com";
export const FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com";
export const SITE_REPO_URL = "https://github.com/seanwinslow/sw-portfolio";

export const SITE_NAME = "Sean Winslow";
export const SITE_DESCRIPTION = "AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs.";
export const SITE_LOCALE = "BOSTON";
export const COPYRIGHT_YEAR = "2026";
```

Both `<SiteFooter.astro>` + `src/pages/contact.astro` + the BaseLayout meta tags import from this module.

---

## 12. Meta tags + OG defaults

### 12.1 BaseLayout `<head>` rendering

```astro
---
import { SITE_DESCRIPTION } from '../lib/site.ts';
const {
  title,
  description = SITE_DESCRIPTION,
  ogImage = '/og-default.png',
  noChrome = false,
} = Astro.props;
const canonicalUrl = new URL(Astro.url.pathname, Astro.site).toString();
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <title>{title}</title>

  <link rel="canonical" href={canonicalUrl} />

  <!-- OG -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={new URL(ogImage, Astro.site).toString()} />
  <meta property="og:url" content={canonicalUrl} />

  <!-- Twitter card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={new URL(ogImage, Astro.site).toString()} />

  <!-- RSS auto-discovery (3 feeds) -->
  <link rel="alternate" type="application/rss+xml" href="/transactions/rss.xml" title="Sean Winslow — Transactions" />
  <link rel="alternate" type="application/rss+xml" href="/architecture/rss.xml" title="Sean Winslow — Architecture" />
  <link rel="alternate" type="application/rss+xml" href="/essays/rss.xml" title="Sean Winslow — Essays" />

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

  <!-- Fonts (per hero spec §13) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" />

  <!-- Inline theme script (FOUC prevention) -->
  <script is:inline>
    (function() {
      var match = document.cookie.match(/sw-theme=(light|dark)/);
      var theme = match ? match[1] : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>

  <!-- View Transitions -->
  <ClientRouter />
</head>
```

### 12.2 Per-page OG image overrides

Each collection deep-dive page's frontmatter declares `ogImage:` which BaseLayout consumes. Defaults to `/og-default.png` (a 1200×630 PNG showing the wordmark + hero tagline, manually authored).

---

## 13. Sitemap + robots.txt

### 13.1 Sitemap

`@astrojs/sitemap` integration in `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://seanwinslow.com',
  integrations: [sitemap()],
});
```

Auto-generates `/sitemap-index.xml` + `/sitemap-0.xml` at build. Includes every static route (home + collection indexes + per-slug pages + /contact + /404 excluded by default).

### 13.2 robots.txt

`/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://seanwinslow.com/sitemap-index.xml
```

Allow all crawlers. Point at sitemap.

---

## 14. Print stylesheet

`@media print` block in `src/styles/global.css` applies site-wide:

```css
@media print {
  /* Hide chrome */
  header,
  footer,
  .skip-link,
  .theme-toggle,
  .subscribe-fold,
  .next-prev-nav,
  [aria-hidden="true"] {
    display: none !important;
  }

  /* Expand link URLs */
  a[href^="http"]::after,
  a[href^="mailto"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: #546E71;
  }

  /* Force light palette */
  :root {
    color-scheme: light !important;
  }

  /* Preserve paper background suppression in print */
  body {
    background: white !important;
  }
}
```

Same baseline across all pages. Per-page specs may extend with surface-specific rules.

---

## 15. Anti-stack

What the chrome explicitly does NOT include:

- No analytics (v1) — Plausible deferred per all prior specs; if added later, single inline script in BaseLayout, no per-page events for v1
- No Hotjar, no Google Tag Manager, no MS Clarity, no Segment, no Mixpanel
- No chat widget (Intercom, Drift, Crisp, etc.)
- No live-chat overlay
- No cookie banner — no tracking cookies (theme cookie is functional, not tracking)
- No privacy policy page — no data collection
- No terms-of-service page — no commercial relationship
- No newsletter signup form anywhere (per /essays/ spec §16.4 cross-surface confirmation)
- No "Built with Astro" badge (template-coded)
- No "Made in Boston" decorative graphic (copyright line says BOSTON; that's enough)
- No `<SmoothScroll />` React island (V3 bridge had it — killed per hero spec §13 anti-stack)
- No `<NavIsland />` React island (V3 bridge had it — replaced with native Astro)
- No hamburger menu
- No scroll-aware nav hide/reveal
- No breadcrumbs
- No "back to top" floating button
- No "share this page" buttons
- No reading-progress bar
- No social-media follow widgets
- No web push notifications

---

## 16. Open questions

**~~[OPEN-1: Wordmark style (§4, §6)]~~ — CONFIRMED 2026-05-21.** Wordmark = **"SW" in JetBrains Mono uppercase (weight 700)**, teal `#0A3E42` on warm paper `#FFF9F0`. The same wordmark renders across the nav (§6.1), the universal footer (§7.1), the favicon set (Appendix A — favicon.svg + favicon.ico + apple-touch-icon.png), and the lower-left corner of all 4 OG cards (§12.2). The Newsreader alternative would compete with every page's Newsreader `<h1>` and lose the wire-service register that ties the chrome together. Favicon assets land at [`reference-images/favicon/`](../../reference-images/favicon/); OG cards at [`reference-images/og-cards/`](../../reference-images/og-cards/). Both move to `/public/` at Phase 2 scaffold.

**[OPEN-2: Sticky nav vs. scrolls-away (§6.1)]** — proposed: `position: sticky`. **Switch only if** Sean wants a more mynrd-pure linear-scroll on sub-pages — alternative: `position: relative`, nav scrolls away with the page. **Recommended default:** sticky. Recruiters reading a 2,000-word architecture essay or a long case-study scroll benefit from persistent escape to siblings. Mynrd-pure scrolls-away is the home-page discipline; sub-pages get the pragmatic affordance. Confirm.

**[OPEN-3: `/contact/` route preservation (§9.1)]** — proposed: keep the route, minimal page. **Switch only if** Sean prefers a hard redirect — alternative: 301 from `/contact/` to `/#footer` (anchor link to the chrome footer). **Recommended default:** keep the minimal page. The 80 lines of Astro cost less than a recruiter hitting a 404 from a V3-bridge bookmark during the crossover window. Reassess in 6 months — if the page gets <5 hits/month after crossover, drop it. Confirm.

**[OPEN-4: "View the source" link in footer (§7.7)]** — proposed: include the link, pointing at `github.com/seanwinslow/sw-portfolio`. **Switch only if** Sean doesn't want the portfolio repo public yet. **Recommended default:** include. The comprehension-first thesis is undermined by hiding the portfolio's own source. The link is wire-service mono, single line — recruiters who care click, recruiters who don't, don't. Confirm the portfolio repo is OK to make public at crossover.

**[OPEN-5: Email constant (§11)]** — proposed: `sean@seanwinslow.com`. **Recommended default:** confirm this is the address Sean wants on the public portfolio (vs. `sean.winslow28@gmail.com` per Sean's personal env, or a separate portfolio-inbound alias). The chrome footer + `/contact/` + the `mailto:` link all read from this one constant — changing it later is a one-character edit. Confirm.

---

## 17. Out of scope for v1

- Auto-detect `prefers-color-scheme` for theme — v2
- Time-of-day theme switch (PMP §10 D5) — v2
- Home-page dark-mode hero — v2
- Plausible analytics — defer until launch validates need
- PWA manifest + service worker — v2
- Internationalization / `lang` other than `en` — out
- Multi-language footer or nav — out
- A11y skip-link variations beyond "Skip to content" — v1 ships single skip-link
- "Built with" colophon page — KILL
- "Inspirations" or "Acknowledgments" page — KILL
- Site changelog page surfacing each deploy — could be a future `/changelog/` route, deferred
- A "Subscribe via email" form (mailing list capture) — KILL, see §15 anti-stack
- A "Press kit" page — premature
- A "Speaking" page — premature
- Auto-generated OG cards via satori at build — v2; v1 ships static PNG defaults + per-page overrides where authored
- 410 Gone pages for known-killed V3 routes (e.g., `/design-arena/` from V3 bridge) — Astro renders 404 on these by default; explicit 410 is over-engineering for v1
- Custom 500 error page — Vercel default suffices for the rare server-error case
- "What's new" indicator on nav tabs when new content ships in that collection — deferred (the home hero's dateline + the ledger row's recency signal already cover this)

---

## 18. Definition of Done

Site chrome v1 ships when:

1. `src/layouts/BaseLayout.astro` accepts `title` + `description?` + `ogImage?` + `noChrome?` props; renders skip-link, conditional `<SiteNav>`, `<main id="main-content">` slot, and `<SiteFooter>` on every page.
2. The home page (`src/pages/index.astro`) passes `noChrome={true}` and renders without the top nav. Hero spec §3 vertical budget is preserved exactly (hero starts at y=0).
3. All sub-pages (`/work/`, `/transactions/`, `/architecture/`, `/essays/`, `/about/`, `/contact/`, `/404`) render the top nav with the active tab carrying `aria-current="page"`.
4. The nav uses `position: sticky; top: 0; z-index: 100` on sub-pages, paper bg, 0.5px teal bottom border. Mobile wraps to 2 lines below ~640px viewport. No hamburger.
5. Wordmark "SW" links to `/`; the 5 sibling tabs link to their respective routes.
6. The footer renders on every page including home. 3-column grid (Contact / Subscribe / Dashboard) on desktop; stacks single-column on mobile. Bottom strip with theme toggle + copyright.
7. Footer Subscribe column renders the 3 RSS feed links + the Substack link. Each external link has the `↗` glyph.
8. Footer Dashboard column renders the fleet.seanwinslow.com link + the portfolio repo link.
9. The theme toggle uses two mono text labels "LIGHT · DARK" — no icons, no slider. Click toggles `<html data-theme="...">` and writes the `sw-theme` cookie. FOUC-prevented by inline `<script is:inline>` in `<head>`.
10. Theme cookie persists across reloads (1-year max-age, SameSite=Lax). V3 bridge cookie name (`sw-theme`) is preserved — V3 bookmarks with the cookie set continue to work.
11. Dark-mode color tokens defined site-wide; home hero stays light-only when dark mode is toggled (per hero spec §14).
12. Skip link is the first focusable element in `<body>`, jumps to `#main-content`.
13. `src/lib/site.ts` exports all URL + identity constants used by chrome + minimal pages; footer + /contact/ + meta tags import from this single module.
14. `/contact/` route renders a ~600px minimal page with 1 sober paragraph + 3 mono links. No form, no alert placeholder, no template "Let's talk!" energy.
15. `/404.html` renders ~400px page: dateline strip → "PAGE NOT FOUND" h1 → "Nothing at this URL." → `→ HOME` mono link.
16. RSS auto-discovery: 3 `<link rel="alternate" type="application/rss+xml">` tags in `<head>` for all 3 collection feeds.
17. `@astrojs/sitemap` integration generates `/sitemap-index.xml` automatically; robots.txt at `/public/robots.txt` allows all + points at sitemap.
18. Default OG image at `/public/og-default.png` (1200×630) renders for any page without a frontmatter `ogImage:` override. Per-page overrides work end-to-end.
19. Print stylesheet in `src/styles/global.css` hides nav + footer interactives, expands inline link URLs, forces light palette.
20. View Transitions: nav + footer persist (not part of the morph); page content swaps via `<ClientRouter />` (per hero/projects/case-study spec contracts).
21. Lighthouse on the home page: Performance ≥95 (no nav adds zero JS; footer is lightweight); Accessibility ≥95; Best Practices = 100.
22. Lighthouse on each sub-page index (`/work/<slug>/`, `/transactions/`, etc.): Performance ≥90; Accessibility ≥95; Best Practices = 100.
23. V3 bridge bookmarks pointing at `/contact/` resolve to the new minimal page (no 404); the `sw-theme` cookie from V3 continues to work without modification at crossover.

When all 23 are green, site chrome v1 is locked and we close the blueprint with `BLUEPRINT-COMPLETE.md`.

---

## Appendix A — File map (additions to essays spec's map)

```
sw-ai-pm-portfolio/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro                     ← chrome shell; accepts noChrome prop
│   ├── components/
│   │   └── chrome/
│   │       ├── SiteNav.astro                    ← sticky top nav (wordmark + 5 tabs)
│   │       ├── SiteFooter.astro                 ← 3-column footer + bottom strip
│   │       ├── ThemeToggle.astro                ← text-label toggle, vanilla JS
│   │       └── SkipLink.astro                   ← first focusable element
│   ├── lib/
│   │   └── site.ts                              ← constants (EMAIL, LINKEDIN_URL, etc.)
│   ├── pages/
│   │   ├── contact.astro                        ← minimal route preserving V3 SEO
│   │   └── 404.astro                            ← sober wire-service
│   └── styles/
│       └── global.css                           ← chrome styling + print stylesheet
├── public/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── og-default.png                           ← 1200×630, wordmark + hero tagline
│   └── robots.txt
└── astro.config.mjs                             ← @astrojs/sitemap integration
```

---

## Appendix B — Hand-off prompt for the build session

> Open a Claude Code session at `/Users/seanwinslow/Code-Brain/sw-ai-pm-portfolio/`. Read `hero-spec-v1.md`, `projects-section-spec-v1.md`, `case-study-spec-v1.md`, `transactions-spec-v1.md`, `architecture-spec-v1.md`, `essays-spec-v1.md`, and `site-chrome-spec-v1.md` end-to-end. Implement `src/layouts/BaseLayout.astro` per §3 + §12. Build `<SiteNav.astro>` + `<SiteFooter.astro>` + `<ThemeToggle.astro>` + `<SkipLink.astro>` per Appendix A. Create `src/lib/site.ts` with all constants per §11. Author `src/pages/contact.astro` per §9 and `src/pages/404.astro` per §10. Install `@astrojs/sitemap` and configure per §13. Add `/public/robots.txt`. Create the static favicon + apple-touch-icon + og-default.png assets (manually authored or placeholder). Add the print stylesheet to `src/styles/global.css` per §14. Wire the `noChrome={true}` flag on `src/pages/index.astro`. **Do NOT add analytics, chat widgets, cookie banners, or any of the §15 anti-stack items.** Stop when the 23 Definition-of-Done items can be ticked on a `localhost:4321` preview.

---

*Drafted 2026-05-17. Awaits Sean's lock. Open questions flagged in §16.*
