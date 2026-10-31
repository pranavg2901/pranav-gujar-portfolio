import { Container } from '@/components/ui/Container'
import { site } from '@/content/site'

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line py-12">
      <Container className="flex flex-wrap items-center justify-between gap-3 text-[13.5px] text-faint">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <p>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-ink"
          >
            {site.email}
          </a>
        </p>
      </Container>
    </footer>
  )
}
