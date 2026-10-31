import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { withBase } from '@/lib/paths'

/**
 * The hero carries the portrait from lg up, which used to leave this section
 * with an empty left column on desktop. The prose now runs full width and the
 * facts sit beneath it as a ruled strip — the same device as the metrics band,
 * so it reads as part of the same system rather than as leftover space.
 */
export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <SectionHeading index="02" eyebrow={about.eyebrow} title={about.title} />

      <div className="grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
        {/* Below lg the hero hides the portrait, so it appears here instead —
            exactly one photo is on screen at any width. */}
        <Reveal className="lg:hidden">
          <div className="relative w-40">
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
        </Reveal>

        <Reveal className="lg:col-span-2">
          <div className="max-w-[68ch]">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-6 text-[16.5px] leading-[1.8] text-muted last:mb-0 md:text-[17.5px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-line py-6 sm:border-r sm:px-6 sm:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              >
                <dt className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2.5 text-[15px] leading-snug text-ink">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
