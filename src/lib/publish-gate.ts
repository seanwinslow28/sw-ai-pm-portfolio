/**
 * src/lib/publish-gate.ts — build-time publish gate.
 *
 * The portfolio's load-bearing promise is "real and dated." Nothing dated
 * in the future may render as live, or the credibility the daily-dated
 * layer exists to build is the first thing a sharp recruiter pokes.
 *
 * "Today" resolves at build time from the system clock. Future-dated
 * content therefore auto-appears on its real date with the next scheduled
 * build, no code change required. Comparisons are lexicographic on ISO
 * YYYY-MM-DD strings, which is correct ordering at day granularity.
 */
export const BUILD_TODAY_ISO = new Date().toISOString().slice(0, 10);

/** Essays: live only when PUBLISHED and the publish date has arrived. */
export function isLiveEssay(data: { status: string; published: string }): boolean {
  return data.status === "PUBLISHED" && data.published <= BUILD_TODAY_ISO;
}

/** Transactions: any status is real, but a future ship date is not yet true. */
export function isLiveTransaction(data: { shipped: string }): boolean {
  return data.shipped <= BUILD_TODAY_ISO;
}

/** Architecture: live only when SHIPPED and the ship date has arrived. */
export function isLiveArchitecture(data: { status: string; shipped: string }): boolean {
  return data.status === "SHIPPED" && data.shipped <= BUILD_TODAY_ISO;
}
