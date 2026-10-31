// GitHub Pages has no server-side rewrite, so a deep link like
// /projects/agentcv 404s on reload. Pages does serve 404.html for any
// unknown path, so shipping a copy of index.html under that name lets the
// router take over and resolve the route client-side.
import { copyFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve(import.meta.dirname, '..', 'dist')

await copyFile(resolve(dist, 'index.html'), resolve(dist, '404.html'))
console.log('spa-fallback: dist/404.html written')
