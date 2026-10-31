import { cn } from '@/lib/cn'
import { withBase } from '@/lib/paths'

type ScreenshotProps = {
  src?: string
  alt?: string
  /** Shown in place of a missing image, so the gap is labelled rather than blank. */
  pending: string
  className?: string
}

/**
 * Project screenshots are not in yet. Rather than ship a grey box, this states
 * what belongs here — and the moment an image lands in src, the placeholder
 * disappears with no other change.
 */
export function Screenshot({ src, alt = '', pending, className }: ScreenshotProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[9px] border border-line',
        'aspect-16/10 bg-linear-to-br from-[var(--shot-from)] to-[var(--shot-to)]',
        className,
      )}
    >
      {src ? (
        <img src={withBase(src)} alt={alt} loading="lazy" className="size-full object-cover" />
      ) : (
        <span
          className="absolute inset-0 grid place-items-center px-4 text-center font-mono text-[11px] tracking-[0.08em] uppercase"
          style={{ color: 'var(--shot-ink)' }}
        >
          {pending}
        </span>
      )}
    </div>
  )
}
