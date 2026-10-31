import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function NotFoundPage() {
  useDocumentTitle('Page not found')

  return (
    <Container>
      <div className="py-28">
        <p className="eyebrow uppercase">404</p>
        <h1 className="mt-3 text-[31px] font-semibold tracking-[-0.03em] text-ink">
          That page does not exist
        </h1>
        <p className="mt-3 max-w-[48ch] text-muted">
          The link may be out of date. Everything on this site is reachable from the home page.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block font-medium text-accent hover:underline"
        >
          Back to the start
        </Link>
      </div>
    </Container>
  )
}
