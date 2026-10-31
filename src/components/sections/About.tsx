import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { about } from '@/content/about'
import { site } from '@/content/site'
import { withBase } from '@/lib/paths'

/**
 * The only place on the site with a face on it, and it sits after the work on
 * purpose: the projects should land before the person does.
 *
 * The portrait is desaturated by default and comes back to colour on hover —
 * a full-colour photograph in the middle of a monochrome page pulls far more
 * attention than it deserves.
 */
export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <SectionHeading index="02" eyebrow={about.eyebrow} title={about.title} />

      <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-20">
        <Reveal>
          <div className="relative w-44 lg:w-full">
            <span
              aria-hidden
              className="absolute -top-2 -left-2 size-16 border-t-2 border-l-2 border-accent-bright lg:hidden"
            />
            <picture className="lg:hidden">
              <source srcSet={withBase(site.profileImage.webp)} type="image/webp" />
              <img
                src={withBase(site.profileImage.jpg)}
                alt={site.profileImage.alt}
                width={760}
                height={760}
                loading="lazy"
                className="relative aspect-4/5 w-full object-cover object-[center_top] grayscale transition-all duration-500 hover:grayscale-0"
              />
            </picture>

            <dl className="mt-8 hidden flex-col lg:flex">
              {about.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line py-3.5">
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[13.5px] leading-snug text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="max-w-[62ch]">
            {about.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="mb-6 text-[16.5px] leading-[1.8] text-muted last:mb-0 md:text-[17.5px]"
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
