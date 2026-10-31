import { ArrowUpRight } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'
import { emphasise } from '@/lib/emphasis'

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <SectionHeading index="03" eyebrow="Experience" title="Where I have worked" />

      <div className="border-t border-line">
        {experience.map((role, index) => (
          <Reveal key={role.company} delay={index * 60}>
            <article className="grid gap-6 border-b border-line py-10 md:grid-cols-[260px_1fr] md:gap-16 md:py-12">
              <div>
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

                {/* The employer's product, shown inside the role rather than
                    as a project card — they own it, not me. */}
                {role.product && (
                  <div className="mt-9 border border-line p-6">
                    <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                      The product I work on
                    </p>
                    <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <span className="text-[21px] font-extrabold tracking-[-0.03em] text-ink uppercase">
                        {role.product.name}
                      </span>
                      {role.product.href && (
                        <a
                          href={role.product.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 font-mono text-[11.5px] font-semibold tracking-[0.12em] text-accent uppercase hover:underline"
                        >
                          Visit site
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      )}
                    </div>
                    <p className="mt-3 max-w-[60ch] text-[14.5px] leading-relaxed text-muted">
                      {role.product.description}
                    </p>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
