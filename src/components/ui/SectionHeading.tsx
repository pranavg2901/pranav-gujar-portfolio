import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/ui/Reveal'

/**
 * The repeating masthead: an accent rule and mono label, then an oversized
 * uppercase title. The rule is what marks a new section without needing a
 * divider across the whole page.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  note,
  align = 'left',
}: {
  /** Two-digit section number, e.g. "01". Part of the blueprint language. */
  index?: string
  eyebrow: string
  title: ReactNode
  note?: ReactNode
  align?: 'left' | 'center'
}) {
  const centred = align === 'center'

  return (
    <Reveal>
      <header className={cn('mb-14', centred && 'text-center')}>
        <p className={cn('eyebrow flex items-center gap-4', centred && 'justify-center')}>
          {index && <span className="text-faint">{index}</span>}
          <span aria-hidden className="h-px w-11 bg-accent" />
          {eyebrow}
        </p>

        <h2 className="mt-6 text-display font-extrabold uppercase text-ink">{title}</h2>

        {note && (
          <p
            className={cn(
              'mt-5 max-w-[56ch] text-[16.5px] leading-relaxed text-muted',
              centred && 'mx-auto',
            )}
          >
            {note}
          </p>
        )}
      </header>
    </Reveal>
  )
}
