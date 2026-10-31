import { cn } from '@/lib/cn'

/**
 * One tag per project is emphasised: the thing that makes the project unusual,
 * rather than another framework name.
 */
export function Tag({ label, emphasis = false }: { label: string; emphasis?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-[5px] px-2.5 py-1 text-[11.5px] leading-none',
        emphasis
          ? 'bg-accent-wash font-medium text-accent'
          : 'bg-sunken text-muted',
      )}
    >
      {label}
    </span>
  )
}
