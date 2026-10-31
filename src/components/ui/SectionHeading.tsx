import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from '@/components/ui/Reveal'

/**
 * The repeating masthead: a clay mono eyebrow, a large title, and an optional
 * line framing what follows. The eyebrow carries the only colour, which keeps
 * section starts legible without rules or boxes.
 */
export function SectionHeading({
  eyebrow,
  title,
  note,
  align = 'left',
  tone = 'page',
}: {
  eyebrow: string
  title: ReactNode
  note?: ReactNode
  align?: 'left' | 'center'
  tone?: 'page' | 'dark'
}) {
  const centred = align === 'center'

  return (
    <Reveal>
      <header className={cn('mb-12', centred && 'text-center')}>
        <p className={cn('eyebrow mb-5 uppercase', centred && 'rule-both')}>{eyebrow}</p>
        <h2
          className={cn(
            'text-display font-semibold',
            tone === 'dark' ? 'text-panel-ink' : 'text-ink',
          )}
        >
          {title}
        </h2>
        {note && (
          <p
            className={cn(
              'mt-5 max-w-[56ch] text-[17px] leading-relaxed',
              centred && 'mx-auto',
              tone === 'dark' ? 'text-panel-muted' : 'text-muted',
            )}
          >
            {note}
          </p>
        )}
      </header>
    </Reveal>
  )
}
