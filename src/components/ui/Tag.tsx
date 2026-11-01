import { cn } from '@/lib/cn'

/**
 * One tag per project is emphasised. It names what the thing is — a resume
 * engine, an evaluation platform, a market screener — and nothing else.
 *
 * It used to carry a verdict instead ("Shipped solo", "Honest backtests").
 * That read as copy written to impress rather than to inform, and a reader
 * who suspects the words are decoration stops trusting the numbers under
 * them too. The accent is on the category; the rest of the tags are outlined.
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
