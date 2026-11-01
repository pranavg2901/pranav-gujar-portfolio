/**
 * How long I have been working, worked out rather than written down.
 *
 * "2.5+ years" was typed into five places and was already wrong — it had been
 * true in late 2025 and nobody updates a number that does not complain. A
 * portfolio quietly understating its author's experience is a bad bug to have
 * on a hiring page, and the fix is for the number to compute itself.
 *
 * Deliberately dependency-free and free of `import.meta`, because the Node
 * build scripts import this too, by way of content/site.ts.
 */

/** First day of the first job. Everything else is derived from this. */
const START = { year: 2024, month: 2 } // February 2024

export function experienceMonths(now: Date = new Date()): number {
  return (now.getFullYear() - START.year) * 12 + (now.getMonth() + 1 - START.month)
}

/**
 * "2Y 9M" — for the metrics strip, where the cell is one short token.
 *
 * Uppercase because the neighbouring cells are digits and symbols — 10+, 5+,
 * 3+, 2 — all of which stand at full cap height. Lowercase y and m sit at
 * x-height, so in the same bold display face they looked shrunken next to
 * their own numbers rather than like part of them.
 */
export function experienceShort(now: Date = new Date()): string {
  const months = experienceMonths(now)
  const years = Math.floor(months / 12)
  const rest = months % 12
  return rest === 0 ? `${years}Y` : `${years}Y ${rest}M`
}

/** "2 years 9 months" — for prose, labels and the page description. */
export function experienceLong(now: Date = new Date()): string {
  const months = experienceMonths(now)
  const years = Math.floor(months / 12)
  const rest = months % 12

  const yearPart = `${years} ${years === 1 ? 'year' : 'years'}`
  if (rest === 0) return yearPart
  return `${yearPart} ${rest} ${rest === 1 ? 'month' : 'months'}`
}

/** "Feb 2024" — so the figure above can be checked rather than believed. */
export const experienceSince = 'Feb 2024'
