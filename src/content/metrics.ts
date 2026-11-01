import type { Metric } from '@/types/content'
import { experienceShort, experienceSince } from '@/lib/experience'

/**
 * The strip under the hero. Career-level facts only.
 *
 * It used to carry the strongest project numbers, which meant a reader met
 * 120K chunks and 8,100 companies twice: once here and again on the card
 * three screens down. This says the things no project card can — how long,
 * how many, how much of it I still run — and leaves the projects to speak
 * for themselves.
 *
 * The two application counts measure different things and must not be added:
 * one is everything delivered across both jobs, the other is what is on my
 * hands right now. The second caption says "today" for exactly that reason —
 * the Experience section below mentions 10+ applications hosted at a previous
 * employer, and without the word these two look like a contradiction.
 *
 * Values are kept to a single short token and the unit moved into the caption
 * — at five across, anything longer collides with the next cell.
 */
export const metrics: Metric[] = [
  // "In production" was meant as shipping-production-systems and read as
  // something else entirely next to a figure in years.
  { value: experienceShort(), caption: `Experience, since ${experienceSince}` },
  { value: '10+', caption: 'Client applications delivered end to end' },
  { value: '5+', caption: 'Applications I run in production today' },
  { value: '3+', caption: 'Systems I designed, built and operate' },
  { value: '2', caption: 'AWS certifications' },
]
