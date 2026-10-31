import { SectionHeading } from '@/components/ui/SectionHeading'
import { HighlightList } from '@/components/ui/HighlightList'
import { Reveal } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20">
      <SectionHeading eyebrow="Experience" title="Where I have worked" />

      <div>
        {experience.map((role, index) => (
          <Reveal key={role.company} delay={index * 0.05}>
            <article className="grid gap-3 border-t border-line py-7 md:grid-cols-[186px_1fr] md:gap-8">
              <div>
                <h3 className="text-[15px] font-semibold text-ink">{role.company}</h3>
                <p className="mt-0.5 text-[13px] text-faint">{role.period}</p>
                <p className="text-[13px] text-faint">{role.location}</p>
              </div>
              <div>
                <p className="mb-2.5 text-[17px] font-semibold tracking-[-0.015em] text-ink">
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
