/**
 * Single source of truth for URLs + identity values that appear across the
 * chrome + the minimal pages. Imported by SiteFooter, /contact/, /404, and
 * BaseLayout meta tags.
 *
 * Source: docs/specs/site-chrome-spec-v1.md §11.
 */

// Email set per SHIP-PLAN-2026-05-29 D4 (supersedes the prior seanwinslow.com
// address — lock record updated in site-chrome-prose-locked-2026-05-28,
// BLUEPRINT-COMPLETE OPEN-5, and CLAUDE.md Locked decisions).
export const EMAIL = "sean.winslow28@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/sean-winslow-204390a5";
export const GITHUB_URL = "https://github.com/seanwinslow28";
export const SUBSTACK_URL = "https://substack.com/@seanpwins";
export const FLEET_DASHBOARD_URL = "https://fleet.seanwinslow.com";
export const SITE_REPO_URL = "https://github.com/seanwinslow28/sw-ai-pm-portfolio";

export const SITE_NAME = "Sean Winslow";
export const SITE_DESCRIPTION = "AI Product Manager. Raised by Saturday morning cartoons and Vercel deployment logs.";
export const SITE_LOCALE = "BOSTON";
export const COPYRIGHT_YEAR = "2026";

/* Wordmark — site-chrome §16 OPEN-1 CONFIRMED 2026-05-21 */
export const WORDMARK = "SW";

/* Asset paths (canonical)
 * Hero loop ships as TRUE-alpha (transparent bg) so the background reads as
 * "removed" on every engine — see CharacterLane.astro for the selection logic:
 *   - HEVC-with-alpha MP4 (hvc1) → Safari / iOS (incl. all iOS browsers).
 *   - VP9-alpha WebM            → Chrome / Firefox / Android.
 * The MP4 is encoded with PREMULTIPLIED alpha (transparent pixels are truly
 * (0,0,0,0)); Apple's VideoToolbox tags HEVC as PremultipliedAlpha, so feeding
 * it straight RGBA used to blow transparent areas out to a white box on iOS.
 * The WebM uses STRAIGHT alpha (what Chrome/VP9 expect). Both are regenerated
 * by scripts/phase-2/encode_hero_loop.sh.
 *
 * Mobile (≤768px) gets a downscaled 720-wide pair to cut the cellular payload
 * (~half the bytes) while staying crisp for a hand-drawn loop. */
export const HERO_LOOP_MP4 = "/assets/character/hero-loop-alpha.mp4";
export const HERO_LOOP_WEBM = "/assets/character/hero-loop-alpha.webm";
export const HERO_LOOP_MP4_MOBILE = "/assets/character/hero-loop-alpha-mobile.mp4";
export const HERO_LOOP_WEBM_MOBILE = "/assets/character/hero-loop-alpha-mobile.webm";
export const HERO_LOOP_POSTER = "/assets/hero-icons/icon-1-loop.webp";

/* OG defaults */
export const OG_DEFAULT_IMAGE = "/og-default.png";

/**
 * RSS feeds rendered in the chrome footer's SUBSCRIBE column + BaseLayout <head>
 * auto-discovery tags (F-2 staging mechanism, site-chrome-prose-locked-2026-05-28 §2).
 * Stage by uncommenting entries as each surface ships a populated RSS endpoint.
 * v1 launch = transactions + architecture (both live; Gate A green). Essays went
 * live early: the manifesto was published 2026-06-01 (status PUBLISHED), so the
 * feed is un-gated as of that date (was staged for 2026-06-19).
 */
export const RSS_FEEDS = [
  { surface: "transactions", url: "/transactions/rss.xml", label: "transactions / rss" },
  { surface: "architecture", url: "/architecture/rss.xml", label: "architecture / rss" },
  { surface: "essays",       url: "/essays/rss.xml",       label: "essays / rss" },  // un-gated 2026-06-01 (manifesto published early)
] as const;

/**
 * External subscribe affordances rendered alongside the RSS feeds in the chrome
 * footer's SUBSCRIBE column. Substack is the only external entry at v1.
 */
export const EXTERNAL_SUBSCRIBE_LINKS = [
  { name: "Substack", url: SUBSTACK_URL, label: "read on substack" },
] as const;
