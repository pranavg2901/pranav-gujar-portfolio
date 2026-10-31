import { useEffect } from 'react'
import { site } from '@/content/site'

/**
 * Case studies are real routes, so they need real titles — a shared tab label
 * across four pages makes browser history useless.
 */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${site.name}` : site.seo.title
  }, [title])
}
