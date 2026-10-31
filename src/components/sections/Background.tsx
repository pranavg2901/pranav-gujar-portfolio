import { Reveal } from '@/components/ui/Reveal'
import { certifications, education } from '@/content/background'
import type { Credential } from '@/types/content'

/**
 * Education and certifications. Deliberately quiet and near the end — true,
 * relevant, and not the reason anyone hires a backend engineer.
 */
export function Background() {
  return (
    <section id="background" className="pb-20 md:pb-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <Group title="Education" items={education} />
        <Group title="Certification" items={certifications} />
      </div>
    </section>
  )
}

function Group({ title, items }: { title: string; items: Credential[] }) {
  return (
    <Reveal>
      <h3 className="eyebrow flex items-center gap-4">
        <span aria-hidden className="h-px w-11 bg-accent" />
        {title}
      </h3>
      <ul className="mt-6 border-t border-line">
        {items.map((item) => (
          <li key={item.title} className="border-b border-line py-5">
            <p className="text-[16px] font-semibold text-ink">{item.title}</p>
            <p className="mt-1.5 font-mono text-[11.5px] tracking-[0.1em] text-faint uppercase">
              {item.issuer} / {item.period}
            </p>
            {item.note && <p className="mt-2 text-[14px] text-muted">{item.note}</p>}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}
