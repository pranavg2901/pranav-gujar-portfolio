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
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link to="/" className="shrink-0 text-[15px] font-semibold tracking-[-0.01em] text-ink">
            {site.name}
            <span className="hidden font-normal text-faint sm:inline"> / {site.tagline}</span>
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-7">
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

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            {/* Wrapped rather than given a `hidden` class: ButtonLink already
                sets inline-flex, and two display utilities on one element are
                resolved by stylesheet order, not by the order written here. */}
            <div className="hidden sm:block">
              <ButtonLink
                href={withBase(site.resume.href)}
                external
                variant="solid"
                className="px-3.5 py-2"
              >
                Resume
              </ButtonLink>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="grid size-9 place-items-center rounded-lg border border-line text-muted md:hidden"
            >
              {menuOpen ? <Close className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </Container>

      {menuOpen && (
        <nav aria-label="Sections" className="border-t border-line bg-surface md:hidden">
          <Container>
            <ul className="flex flex-col py-2">
              {site.nav.map((item) => (
                <li key={item.id} className="border-b border-line/60 last:border-b-0">
                  <SectionLink
                    id={item.id}
                    label={item.label}
                    isHome={isHome}
                    isActive={false}
                    className="block py-3 text-[15px]"
                    onNavigate={() => setMenuOpen(false)}
                  />
                </li>
              ))}
              {/* The header Resume button is hidden on phones, so the sheet
                  carries it — otherwise the resume is unreachable on mobile. */}
              <li className="pt-3 pb-1">
                <ButtonLink href={withBase(site.resume.href)} external variant="solid">
                  {site.resume.label}
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
    'text-[14.5px] transition-colors duration-150 hover:text-ink',
    isActive ? 'text-ink' : 'text-muted',
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
