import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { metrics } from '@/content/metrics'

/**
 * A full-bleed dark band, the only place the page leaves its container. The
 * section that follows rides up over it with a large top radius, which is what
 * stops a long scroll reading as one continuous column.
 *
 * Every number here is traceable to one project; see content/metrics.ts.
 */
export function Metrics() {
  return (
    <div className="bg-panel pt-16 pb-28 md:pb-32">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-4">
            {metrics.map((metric, index) => (
              <div
                key={metric.caption}
                className={
                  index === 0
                    ? 'lg:px-6'
                    : 'lg:border-l lg:border-panel-line lg:px-6'
                }
              >
                <dt className="text-stat font-semibold whitespace-nowrap text-accent-soft">{metric.value}</dt>
                <dd className="mt-3 max-w-[22ch] text-[14px] leading-snug text-panel-muted">
                  {metric.caption}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </div>
  )
}
