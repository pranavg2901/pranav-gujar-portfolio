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
 * The two application counts are kept separate on purpose. The applications
 * I hosted include the ones I built, so adding them would publish a total
 * that cannot be defended.
 *
 * Values are kept to a single short token and the unit moved into the caption
 * — at five across, anything longer collides with the next cell.
 */
export const metrics: Metric[] = [
  { value: experienceShort(), caption: `In production, since ${experienceSince}` },
  { value: '6+', caption: 'Client applications delivered end to end' },
  { value: '10+', caption: 'Applications I have run in production' },
  { value: '3', caption: 'Systems I designed, built and operate' },
  { value: '2', caption: 'AWS certifications' },
]
