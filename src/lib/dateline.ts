/**
 * Single source of truth for "as-of" / "today" dates across the site.
 *
 * The daily-dated layer (hero dateline, projects label, about pulse) is
 * written by the Daily Driver fleet agent into public/api/*.json. Those
 * files lag if the fleet misses a morning, or if the site is redeployed
 * without a fresh fleet run. To guarantee the dates a recruiter sees are
 * always internally coherent, every "as-of" date label derives from the
 * build date here; the fleet JSON supplies the body and stats content.
 *
 * Fresh fleet JSON (written the same morning) matches the build date
 * exactly, so this is invisible on a normal daily deploy and self-heals
 * the date on a lagged one. Dates are resolved in America/New_York so the
 * "BOSTON" locale stamp is honest regardless of the build server timezone.
 */
const BUILD_DATE = new Date();
const ET = "America/New_York";

/** ISO yyyy-mm-dd in Boston time, e.g. "2026-06-01". */
export const BUILD_DATE_ISO = BUILD_DATE.toLocaleDateString("en-CA", {
  timeZone: ET,
});

/** Pretty uppercase date in Boston time, e.g. "JUNE 1, 2026". */
export const BUILD_DATE_PRETTY = BUILD_DATE.toLocaleDateString("en-US", {
  timeZone: ET,
  month: "long",
  day: "numeric",
  year: "numeric",
}).toUpperCase();

/** Full wire-service dateline stamp, e.g. "BOSTON, JUNE 1, 2026". */
export function dateline(locale = "BOSTON"): string {
  return `${locale}, ${BUILD_DATE_PRETTY}`;
}

/**
 * True when an ISO date (yyyy-mm-dd) from a fleet JSON file is recent enough
 * to present as "today's" data. Use to gate fleet body/stats so a stale file
 * is never labelled with a fresh date.
 */
export function isFresh(iso: string, maxAgeHours = 48): boolean {
  const then = new Date(`${iso}T08:30:00-04:00`).getTime();
  const ageMs = BUILD_DATE.getTime() - then;
  return ageMs >= 0 && ageMs <= maxAgeHours * 60 * 60 * 1000;
}
