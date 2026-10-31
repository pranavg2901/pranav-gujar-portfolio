import { SectionHeading } from '@/components/ui/SectionHeading'
import { HighlightList } from '@/components/ui/HighlightList'
import { Reveal } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <SectionHeading eyebrow="Experience" title="Where I have worked" />

      <div>
        {experience.map((role, index) => (
          <Reveal key={role.company} delay={index * 0.05}>
            <article className="grid gap-4 border-t border-line py-9 md:grid-cols-[220px_1fr] md:gap-12">
              <div>
                <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{role.company}</h3>
                <p className="mt-0.5 text-[13px] text-faint">{role.period}</p>
                <p className="text-[13px] text-faint">{role.location}</p>
              </div>
              <div>
                <p className="mb-4 text-[17px] font-medium text-accent">
                  {role.title}
                </p>
                <HighlightList items={role.highlights} />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
