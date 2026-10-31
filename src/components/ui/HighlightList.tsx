import { emphasise } from '@/lib/emphasis'
import { cn } from '@/lib/cn'

/** Bullets with a small clay dot instead of a disc, and ** emphasis honoured. */
export function HighlightList({
  items,
  className,
}: {
  items: readonly string[]
  className?: string
}) {
  return (
    <ul className={cn('flex flex-col gap-1.5', className)}>
      {items.map((item) => (
        <li key={item} className="relative pl-4 text-[14.5px] leading-relaxed text-muted">
          <span
            aria-hidden
            className="absolute left-0 top-[0.58em] size-1 rounded-full bg-accent-soft"
          />
          {emphasise(item)}
        </li>
      ))}
    </ul>
  )
}
