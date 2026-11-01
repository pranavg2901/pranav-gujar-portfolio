import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * The inline script in index.html has already applied the right class before
 * React mounts, so this reads the DOM as the source of truth rather than
 * re-deriving it — that is what avoids a flash on first paint.
 *
 * Light is the default and the operating system preference is deliberately
 * ignored: the site is shown to people on machines set to dark by habit, and
 * the light treatment is the one it is designed around.
 */
function currentTheme(): Theme {
  // No DOM while pre-rendering. Light is the default, and the inline script
  // in index.html has already applied the real choice before React runs, so
  // the first client render agrees with what is on screen.
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Private browsing can refuse writes. The theme still applies for this visit.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
