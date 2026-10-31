import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

// GitHub Pages serves this repo from a subpath. Keep it in one place —
// the router reads the same value back out of import.meta.env.BASE_URL.
const base = process.env.SITE_BASE ?? '/pranav-gujar-portfolio/'

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
