import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/content/metrics'
import { cn } from '@/lib/cn'

/**
 * A hairline-ruled strip. The dividers are borders on the cells rather than a
 * separate element, so the grid reflows without leaving stray rules.
 *
 * One per row on a phone, with the figure beside its caption rather than
 * above it. Two columns there meant an odd number of items left the last
 * metric spanning the width with its value — a lone "2" — against an empty
 * half, and the captions wrapped to two lines at uneven heights. Laid out as
 * rows, the figures align down a single edge, every caption gets the full
 * width, and there is no odd one out to accommodate.
 *
 * Every number here is a career figure, not a project one; see
 * content/metrics.ts for why that distinction is kept.
 */
export function Metrics() {
  return (
    <Reveal>
      {/* Space above, because the marquee's bottom rule and this grid's top
          rule otherwise sit against each other. Two hairlines a pixel apart
          read as one thick line, and the hero stack, the marquee and these
          figures — three separate things — collapsed into a single dense
          band with no way to tell where one ended. */}
      <dl className="mt-12 grid border-b border-line sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.caption}
            className={cn(
              'flex items-baseline gap-5 border-t border-line py-5 sm:block sm:border-r sm:px-6 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0',
              metric.minorOnMobile && 'max-sm:hidden',
            )}
          >
            <dt className="w-[5.5rem] shrink-0 text-[1.9rem] leading-none font-extrabold whitespace-nowrap text-accent sm:w-auto sm:text-stat">
              {metric.value}
            </dt>
            <dd className="font-mono text-[11px] leading-relaxed tracking-[0.1em] text-faint uppercase sm:mt-3">
              {metric.caption}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
