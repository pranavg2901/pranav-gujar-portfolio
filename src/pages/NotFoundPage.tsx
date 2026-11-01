import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <div className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-field absolute inset-0 -z-10" />
      <Container>
        <div className="py-32 md:py-40">
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-6 bg-accent sm:w-11" />
            Error 404
          </p>
          <h1 className="mt-6 text-hero font-extrabold uppercase text-ink">
            No such
            <br />
            <span className="stroke-type">page</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-[16.5px] leading-relaxed text-muted">
            The link may be out of date. Everything on this site is reachable from the home page.
          </p>
          <Link
            to="/"
            className="mt-9 inline-flex border border-line-strong px-7 py-4 font-mono text-[12.5px] font-semibold tracking-[0.1em] uppercase transition-colors hover:border-accent-bright hover:text-accent"
          >
            Back to the start
          </Link>
        </div>
      </Container>
    </div>
  )
}
