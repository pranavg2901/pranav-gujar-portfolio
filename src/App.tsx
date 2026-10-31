import { Route, Routes } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { ScrollRestoration } from '@/components/layout/ScrollRestoration'
import { HomePage } from '@/pages/HomePage'
import { CaseStudyPage } from '@/pages/CaseStudyPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:border focus:border-line focus:bg-raised focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <ScrollRestoration />
      <SiteHeader />

      <main id="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/:slug" element={<CaseStudyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <SiteFooter />
    </>
  )
}
