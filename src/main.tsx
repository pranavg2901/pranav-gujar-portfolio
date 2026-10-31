import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from '@/App'
import { ROUTER_BASE } from '@/lib/paths'
import '@/styles/global.css'

const container = document.getElementById('root')

if (!container) throw new Error('Missing #root — check index.html')

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={ROUTER_BASE}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
