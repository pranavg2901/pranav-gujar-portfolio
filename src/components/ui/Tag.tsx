import { cn } from '@/lib/cn'

/**
 * One tag per project is emphasised: the thing that makes the project unusual,
 * rather than another framework name.
 */
export function Tag({ label, emphasis = false }: { label: string; emphasis?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-3.5 py-1.5 text-[12px] leading-none',
        emphasis
          ? 'bg-accent-wash font-medium text-accent'
          : 'border border-line text-muted',
      )}
    >
      {label}
    </span>
  )
}
