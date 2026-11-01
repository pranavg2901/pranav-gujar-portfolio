import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { cn } from '@/lib/cn'
import { withBase } from '@/lib/paths'

/**
 * Heading on the left, prose on the right.
 *
 * Previously the title and the paragraphs both ran down the left edge and the
 * right half of the section was empty, which read as unfinished. Splitting
 * them fills the width and gives the heading something to sit against, and
 * the heading sticks while the text scrolls past it.
 */
export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="02" eyebrow={about.eyebrow} title={about.title} />

          {/* Two across, not five down — and shown at every width.

              These were lg-only, which meant the relocation and notice-period
              answers simply did not exist on a phone. Most recruiters open a
              portfolio on a phone.
              
              One per row turned the column into a long thin form — five
              labels, five rules, and more vertical space than the prose
              beside it, so the facts finished after the paragraphs they were
              meant to sit against. Paired up they read as a block, and the
              last one spans rather than leaving an orphan in a column of its
              own. */}
          <dl className="mt-9 grid grid-cols-2 border-t border-line">
            {about.facts.map((fact, index) => (
              <div
                key={fact.label}
                className={cn(
                  'border-b border-line py-3.5 pr-5',
                  index % 2 === 0 && index !== about.facts.length - 1 && 'border-r',
                  index % 2 === 1 && 'pl-5',
                  // An odd count leaves the last one alone on its row; let it
                  // take the width rather than sit beside a gap.
                  index === about.facts.length - 1 &&
                    about.facts.length % 2 === 1 &&
                    'col-span-2 pr-0',
                )}
              >
                <dt className="font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-1.5 text-[14.5px] leading-snug text-muted">{fact.value}</dd>
              </div>
            ))}
          </dl>

          {/* The hero carries the portrait from lg up, so it appears here only
              on the narrower layouts where the hero hides it. */}
          <div className="relative -mt-6 w-36 lg:hidden">
            <span
              aria-hidden
              className="absolute -top-2 -left-2 size-14 border-t-2 border-l-2 border-accent-bright"
            />
            <picture>
              <source srcSet={withBase(site.profileImage.webp)} type="image/webp" />
              <img
                src={withBase(site.profileImage.jpg)}
                alt={site.profileImage.alt}
                width={760}
                height={950}
                loading="lazy"
                className="relative aspect-4/5 w-full object-cover object-[center_top] grayscale"
              />
            </picture>
          </div>
        </div>

        <Reveal>
          {/* The first paragraph is set larger and in full-contrast ink. Three
              paragraphs at one size read as a wall; a lead gives the eye a
              place to start and the rest somewhere to go. */}
          <div className="max-w-[60ch] border-l-2 border-accent-bright pl-7 md:pl-9">
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={
                  index === 0
                    ? 'mb-7 text-[19px] leading-[1.65] font-medium text-ink md:text-[21px]'
                    : 'mb-6 text-[16px] leading-[1.75] text-muted last:mb-0 md:text-[16.5px]'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
