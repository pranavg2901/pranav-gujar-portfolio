import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { ArrowUpRight } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type Variant = 'solid' | 'outline' | 'ghost'

/**
 * Square, monospace, uppercase. Buttons sit flush against each other in a row
 * rather than being spaced, which is where the control-panel feel comes from.
 */
const base =
  'inline-flex items-center justify-center gap-2 border px-7 py-4 font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase transition-colors duration-200'

const variants: Record<Variant, string> = {
  solid: 'border-accent-bright bg-accent-bright text-on-accent hover:bg-transparent hover:text-accent',
  outline: 'border-line-strong text-ink hover:border-accent-bright hover:text-accent',
  ghost: 'border-transparent px-0 text-muted hover:text-accent',
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
      {external && <ArrowUpRight className="size-3.5" />}
    </a>
  )
}
