import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Navigating to a case study should land at the top of it; coming back to the
 * home page with a hash should land on that section. React Router does neither
 * by default, so both live here.
 */
export function ScrollRestoration() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }

    // Wait a frame so the target section exists before we scroll to it.
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
