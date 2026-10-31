import type { ReactNode } from 'react'
import { ArrowUpRight } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

type Variant = 'solid' | 'outline' | 'quiet'

const base =
  'inline-flex items-center gap-2 rounded-[9px] border px-4 py-2.5 text-[14.5px] font-medium transition-colors duration-150'

const variants: Record<Variant, string> = {
  solid: 'border-transparent bg-ink text-surface hover:bg-ink/88',
  outline: 'border-line bg-raised text-ink hover:border-line-strong',
  quiet: 'border-transparent bg-transparent text-muted hover:text-ink',
}

type SharedProps = {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function Button({
  children,
  variant = 'solid',
  className,
  ...props
}: SharedProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
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
}: SharedProps & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <ArrowUpRight className="size-3.5 opacity-70" aria-hidden />}
    </a>
  )
}
