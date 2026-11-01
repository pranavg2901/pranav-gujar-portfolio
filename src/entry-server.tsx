import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
// React Router 7 consolidated the server entry points into the core package;
// 'react-router-dom/server' no longer exists.
import { StaticRouter } from 'react-router'
import { App } from '@/App'

/**
 * Renders a route to HTML at build time. See scripts/prerender.mjs.
 *
 * The site was shipping an empty <div id="root">, so nothing at all appeared
 * until 105KB of JavaScript had been fetched, parsed and run — which is why
 * first paint and largest paint were the same millisecond on every
 * measurement. Rendering here breaks that dependency: the text is in the
 * HTML, and React takes over afterwards.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
