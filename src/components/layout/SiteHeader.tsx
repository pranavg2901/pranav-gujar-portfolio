import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Close, Menu } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { useActiveSection } from '@/hooks/useActiveSection'
import { site } from '@/content/site'
import { withBase } from '@/lib/paths'
import { cn } from '@/lib/cn'

const sectionIds = site.nav.map((item) => item.id)

export function SiteHeader() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  // A route change should never leave the mobile sheet hanging open.
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)

    // Lock the page behind the sheet. Without this the content scrolls under
    // an open menu on a phone, which reads as the menu having come loose from
    // the page rather than sitting on top of it.
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
      <Container>
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link
            to="/"
            className="-my-3 inline-block shrink-0 py-3 font-mono text-[14px] font-bold text-ink uppercase"
          >
            {site.name}
            <span className="hidden text-faint sm:inline"> / {site.tagline}</span>
          </Link>

          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.map((item) => (
                <li key={item.id}>
                  <SectionLink
                    id={item.id}
                    label={item.label}
                    isHome={isHome}
                    isActive={isHome && active === item.id}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Wrapped rather than given a `hidden` class: ButtonLink already
                sets inline-flex, and two display utilities on one element are
                resolved by stylesheet order, not by the order written here. */}
            <div className="hidden sm:block">
              <ButtonLink
                href={withBase(site.resume.href)}
                external
                variant="outline"
                className="h-11 px-5 py-0"
              >
                Resume
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="grid h-11 w-11 shrink-0 place-items-center border border-line-strong text-muted lg:hidden"
            >
              {menuOpen ? <Close className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <nav aria-label="Sections" className="border-t border-line bg-surface lg:hidden">
          <Container>
            <ul className="flex flex-col py-3">
              {site.nav.map((item) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <SectionLink
                    id={item.id}
                    label={item.label}
                    isHome={isHome}
                    isActive={false}
                    className="block py-4"
                    onNavigate={() => setMenuOpen(false)}
                  />
                </li>
              ))}
              {/* The header Resume button is hidden on phones, so the sheet
                  carries it — otherwise the resume is unreachable on mobile.
                  The phone label, because this link downloads the file here
                  rather than opening it in a viewer. */}
              <li className="pt-5 pb-2">
                <ButtonLink
                  href={withBase(site.resume.href)}
                  external
                  variant="solid"
                  className="w-full"
                >
                  {site.resume.mobileLabel}
                </ButtonLink>
              </li>
            </ul>
          </Container>
        </nav>
      )}
    </header>
  )
}

/**
 * On the home page these are plain anchors, so the browser handles smooth
 * scrolling. From a case study they have to route home first, which React
 * Router does and ScrollRestoration finishes.
 */
function SectionLink({
  id,
  label,
  isHome,
  isActive,
  className,
  onNavigate,
}: {
  id: string
  label: string
  isHome: boolean
  isActive: boolean
  className?: string
  onNavigate?: () => void
}) {
  const styles = cn(
    'font-mono text-[12.5px] tracking-[0.12em] uppercase transition-colors duration-200 hover:text-accent',
    isActive ? 'text-accent' : 'text-muted',
    className,
  )

  if (isHome) {
    return (
      <a href={`#${id}`} onClick={onNavigate} className={styles}>
        {label}
      </a>
    )
  }

  return (
    <Link to={`/#${id}`} onClick={onNavigate} className={styles}>
      {label}
    </Link>
  )
}
