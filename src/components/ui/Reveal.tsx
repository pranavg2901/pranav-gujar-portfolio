import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type RevealProps = {
  children: ReactNode
  /** Milliseconds. Used sparingly, to stagger siblings by a hair. */
  delay?: number
  className?: string
}

/**
 * A short, small entrance: 10px of travel over 400ms reads as the page
 * settling, where anything longer reads as a slideshow. It plays once.
 *
 * This is deliberately not an animation library. The whole behaviour is one
 * IntersectionObserver and one CSS transition — a library for it would have
 * cost more in download than every other dependency on the site combined.
 *
 * The hidden starting state is gated on html.js (set by the inline script in
 * index.html), so with scripting unavailable the content is simply visible
 * rather than permanently transparent.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || shown) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShown(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [shown])

  return (
    <div
      ref={ref}
      data-reveal={shown ? 'shown' : 'pending'}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn('reveal', className)}
    >
      {children}
    </div>
  )
}
