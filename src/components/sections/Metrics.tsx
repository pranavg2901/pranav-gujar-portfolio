import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/content/metrics'
import { cn } from '@/lib/cn'

/**
 * A hairline-ruled strip. The dividers are borders on the cells rather than a
 * separate element, so the grid reflows without leaving stray rules.
 *
 * Two across on a phone, with a shorter caption.
 *
 * The captions were what made this long: at full length each wrapped to two
 * lines, so four metrics filled most of a screen however they were arranged.
 * Cut to two or three words they fit beside each other, and with the
 * certifications count hidden at that width the remaining four make two even
 * rows.
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
      <dl className="mt-8 grid grid-cols-2 border-b border-line sm:mt-12 sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
        {metrics.map((metric) => (
          <div
            key={metric.caption}
            className={cn(
              'border-t border-line py-5 pr-4 sm:border-r sm:px-6 sm:py-8 sm:pr-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0',
              metric.minorOnMobile && 'max-sm:hidden',
            )}
          >
            <dt className="text-[1.75rem] leading-none font-extrabold whitespace-nowrap text-accent sm:text-stat">
              {metric.value}
            </dt>
            <dd className="mt-2 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-faint uppercase sm:mt-3">
              <span className="sm:hidden">{metric.short}</span>
              <span className="hidden sm:inline">{metric.caption}</span>
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
