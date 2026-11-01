import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/App'
import { ROUTER_BASE } from '@/lib/paths'
import '@/styles/global.css'

const container = document.getElementById('root')

if (!container) throw new Error('Missing #root — check index.html')

const tree = (
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// The build pre-renders each route into the HTML, so the usual path is to
// adopt that markup rather than throw it away and draw it again. createRoot
// is the fallback for the dev server, where #root really is empty.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
