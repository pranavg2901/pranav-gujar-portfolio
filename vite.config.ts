import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// The repo is named <user>.github.io, so Pages serves it from the domain
// root. Kept as one overridable value: a host that serves from a subpath
// only needs SITE_BASE set, and the router reads the same value back out
// of import.meta.env.BASE_URL.
const base = process.env.SITE_BASE ?? '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
})
