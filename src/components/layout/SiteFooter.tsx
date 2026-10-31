import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/content/site'
import { withBase } from '@/lib/paths'

/**
 * The closing band and the footer are one dark panel with a large top radius,
 * so the page ends on a deliberate edge rather than trailing off.
 *
 * The backdrop is a warm dusk gradient rather than a photograph: it carries the
 * same weight at a few hundred bytes, and there is no stock image to licence.
 */
export function SiteFooter() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <footer className="relative mt-24 overflow-hidden rounded-t-[2.5rem] bg-panel md:rounded-t-[3.5rem]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(120% 85% at 50% 118%, #8a5630 0%, #5a3720 38%, transparent 70%), linear-gradient(180deg, #15120e 0%, #221a12 60%, #2e2014 100%)',
        }}
      />

      <Container className="relative">
        <div className="pt-20 pb-16 text-center md:pt-28">
          <p className="eyebrow rule-both mb-7 inline-block uppercase">{site.closing.eyebrow}</p>

          <h2 className="text-hero font-semibold text-panel-ink">{site.closing.headline}</h2>

          <p className="mx-auto mt-6 max-w-[48ch] text-[17px] leading-relaxed text-panel-muted">
            {site.closing.note}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <ButtonLink href={`mailto:${site.email}`} variant="clay">
              Email me
            </ButtonLink>
            <ButtonLink href={withBase(site.resume.href)} external variant="on-dark">
              {site.resume.label}
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 pb-8 text-[14.5px]">
          <ul className="flex flex-wrap gap-6">
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-panel-muted transition-colors hover:text-panel-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-6">
            {site.nav.map((item) => (
              <li key={item.id}>
                {isHome ? (
                  <a
                    href={`#${item.id}`}
                    className="text-panel-muted transition-colors hover:text-panel-ink"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={`/#${item.id}`}
                    className="text-panel-muted transition-colors hover:text-panel-ink"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-panel-line py-7 text-[13.5px] text-panel-faint">
          <p>
            &copy; {new Date().getFullYear()} {site.name} &middot; {site.location}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-panel-ink"
          >
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  )
}
