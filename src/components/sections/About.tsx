import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/content/about'
import { site } from '@/content/site'
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
    <section id="about" className="py-20 md:py-28">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading index="02" eyebrow={about.eyebrow} title={about.title} />

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
          <div className="max-w-[62ch]">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-7 text-[17px] leading-[1.8] text-muted last:mb-0 md:text-[18px]"
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
