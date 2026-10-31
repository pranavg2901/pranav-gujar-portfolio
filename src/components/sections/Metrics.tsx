import { Container } from '@/components/ui/Container'
import { metrics } from '@/content/metrics'

/**
 * A full-bleed band on a raised surface. It is the only place the page breaks
 * out of the container, which is what stops the sections blurring into one
 * another on a long scroll.
 */
export function Metrics() {
  return (
    <div className="border-y border-line bg-raised">
      <Container>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.caption}>
              <dt className="text-[26px] font-semibold tracking-[-0.02em] text-ink">
                {metric.value}
              </dt>
              <dd className="mt-1 text-[12.5px] leading-snug text-faint">{metric.caption}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </div>
  )
}
