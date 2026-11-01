import { ArrowUpRight } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { certifications, education } from '@/content/background'
import type { Credential } from '@/types/content'

/**
 * Education and certifications.
 *
 * It was two lists of plain lines, which read as the bottom of a form rather
 * than part of the page: a title, a grey line under it, and nothing to hold
 * the eye. Each credential is a card now, on the same ruled grid as the rest
 * of the site, with the period set as a date stamp in the corner and the
 * grade or the verification link given its own row.
 *
 * Still deliberately near the end. True, relevant, and not the reason anyone
 * hires a backend engineer.
 */
export function Background() {
  return (
    <section id="background" className="pb-20 md:pb-28">
      <div className="grid gap-12 md:grid-cols-2 md:gap-14">
        <Group title="Education" items={education} />
        <Group title="Certifications" items={certifications} />
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

      <ul className="mt-7 flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title}>
            <Card item={item} />
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

/**
 * A card, and a link when the credential can be verified — the whole card is
 * the target in that case, so the click area matches what it looks like.
 */
function Card({ item }: { item: Credential }) {
  const shared =
    'flex h-full flex-col border border-line p-6 transition-colors duration-300 hover:border-accent-bright'

  const body = (
    <>
      <div className="flex items-start justify-between gap-5">
        <p className="text-[16.5px] leading-snug font-semibold text-ink">{item.title}</p>
        <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap text-faint uppercase">
          {item.period}
        </span>
      </div>

      <p className="mt-2 font-mono text-[11.5px] tracking-[0.1em] text-muted uppercase">
        {item.issuer}
      </p>

      {(item.note || item.href) && (
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-line pt-4">
          {item.note && (
            <span className="font-mono text-[12px] tracking-[0.08em] text-accent">{item.note}</span>
          )}
          {item.href && (
            <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.12em] text-accent uppercase group-hover:underline">
              Verify
              <ArrowUpRight className="size-3.5" />
            </span>
          )}
        </div>
      )}
    </>
  )

  if (!item.href) return <div className={shared}>{body}</div>

  return (
    <a href={item.href} target="_blank" rel="noreferrer" className={`group ${shared}`}>
      {body}
    </a>
  )
}
