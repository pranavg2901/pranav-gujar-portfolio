import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'theme'

/**
 * The inline script in index.html has already applied the right class before
 * React mounts, so this reads the DOM as the source of truth rather than
 * re-deriving it — that is what avoids a flash on first paint.
 */
function currentTheme(): Theme {
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

  // Follow the OS only while the visitor has not made a choice of their own.
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')

    const onChange = (event: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return
      setTheme(event.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme((previous) => (previous === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
