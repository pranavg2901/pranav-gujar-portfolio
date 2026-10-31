import type { ReactNode } from 'react'

/**
 * The repeating masthead: a mono eyebrow, a title, and an optional line that
 * frames what follows. The eyebrow carries the only colour, which is what keeps
 * the section starts legible without a rule or a box.
 */
export function SectionHeading({
  eyebrow,
  title,
  note,
}: {
  eyebrow: string
  title: string
  note?: ReactNode
}) {
  return (
    <header className="mb-8">
      <p className="eyebrow mb-3 uppercase">{eyebrow}</p>
      <h2 className="text-[28px] font-semibold tracking-[-0.025em] text-ink">{title}</h2>
      {note && <p className="mt-3 max-w-[58ch] text-[15.5px] text-muted">{note}</p>}
    </header>
  )
}
