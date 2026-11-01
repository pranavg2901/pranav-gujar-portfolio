import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/content/metrics'
import { cn } from '@/lib/cn'

/**
 * A hairline-ruled strip. The dividers are borders on the cells rather than a
 * separate element, so the grid reflows on mobile without leaving stray rules.
 *
 * Every number here is traceable to one project; see content/metrics.ts.
 */
export function Metrics() {
  return (
    <Reveal>
      {/* Space above, because the marquee's bottom rule and this grid's top
          rule otherwise sit against each other. Two hairlines a pixel apart
          read as one thick line, and the hero stack, the marquee and these
          figures — three separate things — collapsed into a single dense
          band with no way to tell where one ended. */}
      <dl className="mt-12 grid grid-cols-2 border-b border-line sm:grid-cols-3 md:mt-16 lg:grid-cols-5">
          {metrics.map((metric, index) => (
            <div
              key={metric.caption}
              className={cn(
                'border-t border-line py-8 pr-4 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0',
                // Two columns on a phone, and an odd number of metrics left
                // the last one as a half-width cell with a gap beside it.
                // Stretching it across closes the gap without padding the
                // list with a number that is only there to make it even.
                index === metrics.length - 1 && metrics.length % 2 === 1 && 'max-sm:col-span-2',
              )}
            >
              <dt className="text-stat font-extrabold whitespace-nowrap text-accent">
                {metric.value}
              </dt>
              <dd className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.1em] text-faint uppercase">
                {metric.caption}
              </dd>
            </div>
          ))}
      </dl>
    </Reveal>
  )
}
