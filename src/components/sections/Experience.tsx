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
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
