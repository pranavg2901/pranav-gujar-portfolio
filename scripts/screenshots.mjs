// Screenshots of the site, driven straight through the Chrome DevTools
// protocol. No Playwright, no Puppeteer, no node_modules — Node 24 has a
// WebSocket client built in, and Chrome is already installed.
//
// It exists because checking a layout by reading CSS does not work, and the
// browser tooling that would normally do this is not always available.
//
// Start Chrome first:
//   chrome --headless=new --remote-debugging-port=9222 \
//     --hide-scrollbars --user-data-dir=/tmp/chrome-shot about:blank
//
// Then, one argument per shot, as url|WIDTHxHEIGHT|label[|full][|dark]:
//   node scripts/screenshots.mjs ./shots \
//     "http://localhost:5173/|1440x900|home" \
//     "http://localhost:5173/|390x844|home-mobile|full|dark"
import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const [outDir, ...specs] = process.argv.slice(2)
if (!outDir || specs.length === 0) {
  console.error('usage: node scripts/screenshots.mjs <outDir> <url|WxH|label[|full][|dark]>...')
  process.exit(1)
}
await mkdir(outDir, { recursive: true })

const version = await (async () => {
  // Chrome may still be starting up.
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      return await (await fetch('http://127.0.0.1:9222/json/version')).json()
    } catch {
      await new Promise((r) => setTimeout(r, 500))
    }
  }
  throw new Error('no debugging port on 9222 — is Chrome running with --remote-debugging-port?')
})()

const socket = new WebSocket(version.webSocketDebuggerUrl)
await new Promise((r) => (socket.onopen = r))

let nextId = 0
const pending = new Map()
socket.onmessage = (event) => {
  const message = JSON.parse(event.data)
  const waiting = pending.get(message.id)
  if (!waiting) return
  pending.delete(message.id)
  message.error ? waiting.reject(new Error(JSON.stringify(message.error))) : waiting.resolve(message.result)
}

const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, sessionId)

for (const spec of specs) {
  const [url, size, label, ...flags] = spec.split('|')
  const [width, height] = size.split('x').map(Number)
  const full = flags.includes('full')

  await send(
    'Emulation.setDeviceMetricsOverride',
    { width, height, deviceScaleFactor: 1, mobile: width < 700 },
    sessionId,
  )
  await send('Page.navigate', { url }, sessionId)
  await wait(2500)

  if (flags.includes('dark')) {
    await send('Runtime.evaluate', { expression: "localStorage.setItem('theme','dark')" }, sessionId)
    await send('Page.reload', {}, sessionId)
    await wait(2500)
  }

  if (full) {
    // Reveal is driven by IntersectionObserver, so a full-page capture of an
    // unscrolled page catches most sections still faded out. Scrolling to the
    // bottom and back makes every section observe and settle first.
    await send('Runtime.evaluate', { expression: 'scrollTo(0, document.body.scrollHeight)' }, sessionId)
    await wait(1200)
    await send('Runtime.evaluate', { expression: 'scrollTo(0, 0)' }, sessionId)
    await wait(800)
  }

  const { data } = await send(
    'Page.captureScreenshot',
    { format: 'png', captureBeyondViewport: full },
    sessionId,
  )
  const file = resolve(outDir, `${label}.png`)
  await writeFile(file, Buffer.from(data, 'base64'))
  console.log(file)
}

socket.close()
