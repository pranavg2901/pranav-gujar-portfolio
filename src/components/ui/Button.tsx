import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

/**
 * `solid` and `outline` sit on the page; `clay` and `on-dark` sit on the dark
 * panels, where the page tokens would invert with the theme and break.
 */
type Variant = 'solid' | 'outline' | 'clay' | 'on-dark'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3 text-[15px] font-medium transition-colors duration-200'

const variants: Record<Variant, string> = {
  solid: 'border-transparent bg-ink text-surface hover:bg-ink/88',
  outline: 'border-line-strong bg-transparent text-ink hover:border-ink',
  clay: 'border-transparent bg-accent-soft text-[#1b1610] hover:bg-accent-soft/88',
  'on-dark': 'border-panel-muted/45 bg-transparent text-panel-ink hover:border-panel-ink',
}

type Shared = { children: ReactNode; variant?: Variant; className?: string }

export function Button({
  children,
  variant = 'solid',
  className,
  ...props
}: Shared & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({
  children,
  href,
  external = false,
  variant = 'solid',
  className,
  ...props
}: Shared & { href: string; external?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <ArrowUpRight className="size-4 opacity-70" />}
    </a>
  )
}

/**
 * The circular arrow that sits on every project card. Borrowed straight from
 * the reference design, where it is the single element that makes a card read
 * as clickable without a label.
 */
export function ArrowButton({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-[#1b1610]',
        'transition-transform duration-300 group-hover:rotate-45',
        className,
      )}
    >
      <ArrowUpRight className="size-5" />
    </span>
  )
}
