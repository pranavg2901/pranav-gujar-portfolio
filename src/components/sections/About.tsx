import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/content/about'
import { cn } from '@/lib/cn'

/**
 * Heading and the hiring facts on the left, prose on the right.
 *
 * No portrait here any more. The hero carries one photo from large screens
 * up, and the copy that used to sit below that width made the section lead
 * with a face rather than with what the person does — on the narrow width
 * where a reader has the least patience for scrolling past it.
 *
 * The prose used to run against a full-height accent rule, which drew a hard
 * line down the whole section and made three paragraphs look like a pulled
 * quotation. The lead carries the emphasis instead: a size up, full-contrast
 * ink, and a short accent rule above it — the same device the section
 * headings use, so the page keeps one vocabulary.
 */
export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-20">
        <div className="lg:self-start">
          <SectionHeading index="02" eyebrow={about.eyebrow} title={about.title} />

          {/* Ruled rather than boxed. The tinted panel made a card of
              something that reads better as a plain register of facts, set
              on the same hairline grid as the rest of the page.

              Two across, so six facts are three clean rows. */}
          <dl className="mt-9 grid grid-cols-2 border-t border-line">
            {about.facts.map((fact, index) => {
              const odd = about.facts.length % 2 === 1
              const last = index === about.facts.length - 1

              return (
                <div
                  key={fact.label}
                  className={cn(
                    'border-b border-line py-3.5 pr-5',
                    index % 2 === 0 && !(last && odd) && 'border-r border-line',
                    index % 2 === 1 && 'pl-5',
                    // An odd count leaves the last one alone on its row; let
                    // it take the width rather than sit beside a gap.
                    last && odd && 'col-span-2 pr-0',
                  )}
                >
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14.5px] leading-snug text-muted">{fact.value}</dd>
                </div>
              )
            })}
          </dl>
        </div>

        <Reveal>
          <div className="max-w-[62ch]">
            <span aria-hidden className="mb-7 block h-0.5 w-12 bg-accent-bright" />

            {/* The first paragraph is set larger and in full-contrast ink.
                Three paragraphs at one size read as a wall; a lead gives the
                eye a place to start and the rest somewhere to go. */}
            {about.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph.slice(0, 40)}
                className={
                  index === 0
                    ? 'mb-7 text-[20px] leading-[1.6] font-medium text-ink md:text-[23px] md:leading-[1.55]'
                    : 'mb-6 text-[16px] leading-[1.8] text-muted last:mb-0 md:text-[16.5px]'
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
