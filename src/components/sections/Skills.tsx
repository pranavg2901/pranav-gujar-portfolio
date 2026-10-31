import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { skills } from '@/content/skills'

/**
 * Grouped, and deliberately not rated. Percentage bars on a skills section are
 * an unverifiable claim dressed up as data.
 */
export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <SectionHeading index="04" eyebrow="Stack" title="What I work with" />

      <Reveal>
        <dl className="grid border-t border-line md:grid-cols-2">
          {skills.map((group, index) => (
            <div
              key={group.label}
              className={
                'border-b border-line py-6 md:px-8 md:first:pl-0 ' +
                (index % 2 === 0 ? 'md:border-r md:pl-0' : '')
              }
            >
              <dt className="font-mono text-[11px] tracking-[0.18em] text-accent uppercase">
                {group.label}
              </dt>
              <dd className="mt-3 text-[15.5px] leading-relaxed text-muted">
                {group.items.join('  ·  ')}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
