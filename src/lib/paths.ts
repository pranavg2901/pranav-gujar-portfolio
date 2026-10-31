/**
 * The site is served from a subpath on GitHub Pages ("/pranav-gujar-portfolio/")
 * and from "/" in dev. Vite exposes whichever applies as BASE_URL, so every
 * asset reference in src/content is stored relative and resolved here.
 */
export const BASE_URL = import.meta.env.BASE_URL

/** Router basename — BASE_URL without its trailing slash. */
export const ROUTER_BASE = BASE_URL.replace(/\/$/, '')

export function withBase(path: string): string {
  return `${BASE_URL}${path.replace(/^\//, '')}`
}
