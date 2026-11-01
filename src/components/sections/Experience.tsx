import { Link } from 'react-router-dom'
import { ArrowRight } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'
import { productBySlug } from '@/content/products'
import { emphasise } from '@/lib/emphasis'

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <SectionHeading index="03" eyebrow="Experience" title="Where I have worked" />

      <div className="border-t border-line">
        {experience.map((role, index) => {
          const product = role.product ? productBySlug(role.product) : undefined

          return (
          <Reveal key={role.company} delay={index * 60}>
            <article className="grid gap-6 border-b border-line py-10 md:grid-cols-[260px_1fr] md:gap-16 md:py-12">
              {/* Rides along with its own entry. The bullets and the product
                  panel run long enough that the company name scrolls away
                  before a reader is finished with it, leaving them reading
                  about a job with no label on it. `self-start` is what makes
                  this work in a grid — stretched to the row height, a sticky
                  element has nothing to travel within. */}
              <div className="md:sticky md:top-28 md:self-start">
                <p className="font-mono text-[11.5px] tracking-[0.16em] text-accent uppercase">
                  {role.period}
                </p>
                <h3 className="mt-4 text-[22px] leading-tight font-extrabold tracking-[-0.03em] text-ink uppercase">
                  {role.company}
                </h3>
                <p className="mt-2 font-mono text-[12px] tracking-[0.1em] text-faint uppercase">
                  {role.location}
                </p>
              </div>

              <div>
                <p className="mb-6 text-[17px] font-semibold text-ink">{role.title}</p>
                <ul className="flex flex-col gap-4">
                  {role.highlights.map((item) => (
                    <li
                      key={item}
                      className="border-l border-line pl-5 text-[15px] leading-relaxed text-muted"
                    >
                      <span className="[&_strong]:text-ink">{emphasise(item)}</span>
                    </li>
                  ))}
                </ul>

                {/* The product gets its own page, and the panel is the
                    way in. No outbound link here on purpose: the home page
                    sends a reader inward to the write-up, not straight out to
                    a site they have been given no reason to care about yet. */}
                {product && (
                  <Link
                    to={`/work/${product.slug}`}
                    className="group mt-9 block border border-line p-6 transition-colors hover:border-accent-bright"
                  >
                    <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                      The product I {role.period.includes('Present') ? 'work' : 'worked'} on
                    </p>
                    <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <span className="text-[21px] font-extrabold tracking-[-0.03em] text-ink uppercase transition-colors group-hover:text-accent">
                        {product.name}
                        {product.fullName && (
                          <span className="ml-3 font-mono text-[11.5px] font-medium tracking-[0.14em] text-faint">
                            {product.fullName}
                          </span>
                        )}
                      </span>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold tracking-[0.12em] text-accent uppercase">
                        Read about it
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                    <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
                      {product.summary}
                    </p>
                  </Link>
                )}
              </div>
            </article>
          </Reveal>
          )
        })}
      </div>
    </section>
  )
}
