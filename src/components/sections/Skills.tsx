import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { skills } from '@/content/skills'

/**
 * A two-column definition list. No bars, no star ratings, no percentages —
 * those are unverifiable claims dressed up as data.
 */
export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <SectionHeading eyebrow="Skills" title="What I work with" />
      <Reveal>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {skills.map((group) => (
            <div
              key={group.label}
              className="grid gap-1.5 border-t border-line py-5 sm:grid-cols-[170px_1fr] sm:gap-6"
            >
              <dt className="text-[14px] font-medium text-ink">{group.label}</dt>
              <dd className="text-[14.5px] leading-relaxed text-muted">
                {group.items.join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
