import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/content/metrics'

/**
 * A hairline-ruled strip. The dividers are borders on the cells rather than a
 * separate element, so the grid reflows on mobile without leaving stray rules.
 *
 * Every number here is traceable to one project; see content/metrics.ts.
 */
export function Metrics() {
  return (
    <Reveal>
      <dl className="grid grid-cols-2 border-b border-line sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <div
              key={metric.caption}
              className="border-t border-line py-8 pr-4 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
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
