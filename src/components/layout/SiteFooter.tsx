import { Link, useLocation } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/content/site'
import { withBase } from '@/lib/paths'

/**
 * The closing band and the footer are one block, separated by hairlines rather
 * than by a change of background — the page ends on structure, not on a slab.
 */
export function SiteFooter() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <footer className="relative isolate mt-10 overflow-hidden border-t border-line">
      <div aria-hidden className="grid-field absolute inset-0 -z-10 rotate-180" />
      <div
        aria-hidden
        className="bloom absolute -bottom-48 left-1/2 -z-10 size-[360px] -translate-x-1/2 rounded-full sm:-bottom-72 sm:size-[620px]"
      />

      <Container>
        <div className="py-24 text-center md:py-32">
          <p className="eyebrow flex items-center justify-center gap-4">
            <span aria-hidden className="h-px w-11 bg-accent" />
            {site.closing.eyebrow}
            <span aria-hidden className="h-px w-11 bg-accent" />
          </p>

          <h2 className="mt-7 text-hero font-extrabold text-ink uppercase">
            {site.closing.headline}
          </h2>

          <p className="mx-auto mt-7 max-w-[46ch] text-[16.5px] leading-relaxed text-muted">
            {site.closing.note}
          </p>

          {/* Equal halves, for the same reason as the hero pair. */}
          {/* Stacked on a phone: at half of 390px, "Download resume" wrapped
              to two lines while "Email me" stayed on one, and the pair read as
              a mistake. Side by side from 480px, where both fit. */}
          <div className="mx-auto mt-10 grid w-full max-w-[29rem] grid-cols-1 min-[480px]:grid-cols-2">
            <ButtonLink href={`mailto:${site.email}`} variant="solid">
              Email me
            </ButtonLink>
            <ButtonLink href={withBase(site.resume.href)} external variant="outline">
              {site.resume.label}
            </ButtonLink>
          </div>
        </div>

        {/* rel="me" on the profile links marks them as the same person's
            other accounts, which is what lets a search engine tie the
            identities together. */}
        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-t border-line py-7 font-mono text-[12px] tracking-[0.12em] uppercase">
          <ul className="flex flex-wrap gap-7">
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="me noreferrer"
                  className="text-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-7">
            {site.nav.map((item) => (
              <li key={item.id}>
                {isHome ? (
                  <a
                    href={`#${item.id}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={`/#${item.id}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-line py-7 font-mono text-[11.5px] tracking-[0.12em] text-faint uppercase">
          <p>
            &copy; {new Date().getFullYear()} {site.name} / {site.location}
          </p>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-accent">
            {site.email}
          </a>
        </div>
      </Container>
    </footer>
  )
}
