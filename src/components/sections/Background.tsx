import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { certifications, education } from '@/content/background'
import type { Credential } from '@/types/content'

export function Background() {
  return (
    <section id="background" className="py-16 md:py-20">
      <SectionHeading eyebrow="Background" title="Education and certification" />

      <div className="grid gap-10 md:grid-cols-2">
        <Group title="Education" items={education} />
        <Group title="Certification" items={certifications} />
      </div>
    </section>
  )
}

function Group({ title, items }: { title: string; items: Credential[] }) {
  return (
    <Reveal>
      <h3 className="mb-3 font-mono text-[12px] tracking-[0.1em] text-faint uppercase">{title}</h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.title} className="rounded-xl border border-line bg-raised p-4">
            <p className="text-[15.5px] font-semibold text-ink">{item.title}</p>
            <p className="mt-1 text-[13.5px] text-faint">
              {item.issuer} &middot; {item.period}
            </p>
            {item.note && <p className="mt-2 text-[13.5px] text-muted">{item.note}</p>}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
