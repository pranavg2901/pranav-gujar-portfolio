import { cn } from '@/lib/cn'

/**
 * One tag per project is emphasised — the thing that makes it unusual, rather
 * than another framework name. That one gets the accent; the rest are outlined.
 */
export function Tag({ label, emphasis = false }: { label: string; emphasis?: boolean }) {
  return (
    <span
      className={cn(
        'font-mono text-[11px] leading-none tracking-[0.1em] uppercase',
        emphasis
          ? 'bg-accent-wash px-3 py-2 font-semibold text-accent'
          : 'border border-line px-3 py-2 text-faint',
      )}
    >
      {label}
    </span>
  )
}
