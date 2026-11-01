// Measures what a visitor actually waits for, over the DevTools protocol.
// Same approach as screenshots.mjs: no dependencies, real Chrome.
//
// Reports the numbers worth arguing about — time to first byte, first paint,
// largest paint, when the main thread stops being busy — plus where the bytes
// went, because "the site is slow" is usually one of those two and the fix is
// different depending on which.
//
// Start Chrome with --remote-debugging-port=9222 (see screenshots.mjs), then:
//   node scripts/perf.mjs <url> [fast|4g|slow4g] [cpu-slowdown]
//
// Example — what a mid-range phone on mobile data sees:
//   node scripts/perf.mjs https://example.com/ 4g 4
import { setTimeout as sleep } from 'node:timers/promises'

const [url, profile = 'fast', cpu = '1'] = process.argv.slice(2)
if (!url) {
  console.error('usage: node scripts/perf.mjs <url> [fast|4g|slow4g] [cpu-slowdown]')
  process.exit(1)
}

// Chrome DevTools' own presets, so the numbers are comparable with a Lighthouse run.
const NETWORK = {
  fast: null,
  '4g': { downloadThroughput: (9 * 1024 * 1024) / 8, uploadThroughput: (1.5 * 1024 * 1024) / 8, latency: 85 },
  slow4g: { downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8, latency: 150 },
}

const port = process.env.CDP_PORT ?? '9222'
const version = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()
const socket = new WebSocket(version.webSocketDebuggerUrl)
await new Promise((r) => (socket.onopen = r))

let nextId = 0
const pending = new Map()
socket.onmessage = (event) => {
  const message = JSON.parse(event.data)
  const waiting = pending.get(message.id)
  if (!waiting) return
  pending.delete(message.id)
  waiting(message.result)
}
const send = (method, params = {}, sessionId) =>
  new Promise((resolve) => {
    const id = ++nextId
    pending.set(id, resolve)
    socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
await send('Page.enable', {}, sessionId)
await send('Network.enable', {}, sessionId)

// A cold visit is the one that matters: a recruiter opening the link has
// nothing cached.
await send('Network.clearBrowserCache', {}, sessionId)
await send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId)

const conditions = NETWORK[profile]
if (conditions) {
  await send('Network.emulateNetworkConditions', { offline: false, ...conditions }, sessionId)
}
if (Number(cpu) > 1) {
  await send('Emulation.setCPUThrottlingRate', { rate: Number(cpu) }, sessionId)
}

await send('Page.navigate', { url }, sessionId)
await sleep(9000)

const { result } = await send(
  'Runtime.evaluate',
  {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      const nav = performance.getEntriesByType('navigation')[0]
      const paint = Object.fromEntries(
        performance.getEntriesByType('paint').map((entry) => [entry.name, entry.startTime]),
      )

      // LCP is only available through an observer, and the buffered flag is
      // what makes entries from before this ran visible.
      const lcp = await new Promise((resolve) => {
        let value = 0
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) value = entry.startTime
        }).observe({ type: 'largest-contentful-paint', buffered: true })
        setTimeout(() => resolve(value), 400)
      })

      const resources = performance.getEntriesByType('resource').map((entry) => ({
        name: entry.name.split('/').pop().split('?')[0],
        type: entry.initiatorType,
        ms: Math.round(entry.duration),
        bytes: entry.transferSize,
      }))

      const longTasks = await new Promise((resolve) => {
        const tasks = []
        try {
          new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) tasks.push(Math.round(entry.duration))
          }).observe({ type: 'longtask', buffered: true })
        } catch {}
        setTimeout(() => resolve(tasks), 300)
      })

      return {
        ttfb: Math.round(nav.responseStart - nav.requestStart),
        htmlBytes: nav.transferSize,
        domContentLoaded: Math.round(nav.domContentLoadedEventEnd),
        loaded: Math.round(nav.loadEventEnd),
        fcp: Math.round(paint['first-contentful-paint'] ?? 0),
        lcp: Math.round(lcp),
        longTasks,
        resources,
      }
    })()`,
  },
  sessionId,
)

const m = result.value
const total = m.htmlBytes + m.resources.reduce((sum, r) => sum + r.bytes, 0)
const blocking = m.longTasks.reduce((sum, task) => sum + task, 0)

console.log(`\n  ${url}`)
console.log(`  network ${profile}, cpu ${cpu}x, cache empty\n`)
console.log(`  time to first byte     ${m.ttfb} ms`)
console.log(`  first contentful paint ${m.fcp} ms`)
console.log(`  largest paint          ${m.lcp} ms`)
console.log(`  dom ready              ${m.domContentLoaded} ms`)
console.log(`  load                   ${m.loaded} ms`)
console.log(`  long tasks             ${m.longTasks.length} (${blocking} ms blocked)`)
console.log(`  transferred            ${(total / 1024).toFixed(1)} KB over ${m.resources.length + 1} requests\n`)

for (const resource of m.resources.sort((a, b) => b.bytes - a.bytes).slice(0, 8)) {
  console.log(
    `    ${String(Math.round(resource.bytes / 1024)).padStart(5)} KB  ${String(resource.ms).padStart(5)} ms  ${resource.type.padEnd(6)} ${resource.name}`,
  )
}
console.log()

socket.close()
