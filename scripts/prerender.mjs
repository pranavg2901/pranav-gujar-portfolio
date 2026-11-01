// Writes a real HTML file for every case-study route, plus robots.txt and a
// sitemap.
//
// Why this exists: GitHub Pages serves 404.html for unknown paths, which lets
// the router recover — but the response still carries HTTP 404. Browsers do
// not care; Google does, and so does the link preview in LinkedIn, Slack and
// WhatsApp. A case study shared as a link was effectively invisible.
//
// Each generated file is the built index.html with its title, description and
// Open Graph tags swapped for that project's. The body is still rendered by
// the app, so this is not server-side rendering — it is the metadata and the
// 200 status, which is what crawlers and preview bots actually read.
//
// The project list is imported straight from the TypeScript source (Node
// strips the types), so adding a project adds its page with no second list to
// keep in sync.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { projects } from '../src/content/projects.ts'
import { products } from '../src/content/products.ts'
import { site } from '../src/content/site.ts'
import { caseStudyGraph, homeGraph, productGraph } from './structured-data.mjs'

const dist = resolve(import.meta.dirname, '..', 'dist')

const template = await readFile(resolve(dist, 'index.html'), 'utf8')

// Taken from the built file rather than from a constant here, so the domain
// lives in exactly one place (src/content/site.ts, by way of index.html).
const origin = template.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
if (!origin) throw new Error('prerender: no canonical link found in dist/index.html')

const escape = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * Swaps in the JSON-LD for a page. The source file ships an empty object in
 * that slot, so a page that somehow missed this step carries nothing rather
 * than another page's data.
 */
function setStructuredData(html, graph) {
  const pattern = /(<script type="application\/ld\+json" data-structured-data>)[^<]*(<\/script>)/
  if (!pattern.test(html)) throw new Error('prerender: no structured-data slot in the template')
  // Escaping "<" keeps a stray closing tag inside the data from ending the
  // script element early.
  const json = JSON.stringify(graph).replace(/</g, '\u003c')
  return html.replace(pattern, `$1${json}$2`)
}

/** Replaces the content of one meta tag, matched by its name or property. */
function setMeta(html, attribute, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`)
  const replaced = html.replace(pattern, `$1${escape(value)}$2`)
  if (replaced !== html) return replaced

  // The tags written across several lines by the formatter need the other
  // attribute order too. Failing loudly beats shipping a page that silently
  // kept the home page's description.
  const multiline = new RegExp(`(<meta\\s+${attribute}="${key}"\\s+content=\\s*")[^"]*(")`, 's')
  const second = html.replace(multiline, `$1${escape(value)}$2`)
  if (second === html) throw new Error(`prerender: could not set ${attribute}="${key}"`)
  return second
}

// The home page's own title and description are written here rather than
// left to index.html, so src/content/site.ts stays the only place they are
// decided. index.html keeps a copy for the dev server.
{
  let home = template
  home = home.replace(/<title>[^<]*<\/title>/, `<title>${escape(site.seo.title)}</title>`)
  home = setMeta(home, 'name', 'description', site.seo.description)
  home = setMeta(home, 'property', 'og:title', site.seo.title)
  home = setMeta(home, 'property', 'og:description', site.seo.description)
  home = setStructuredData(home, homeGraph())
  await writeFile(resolve(dist, 'index.html'), home)
  // 404.html is a copy of the home page, so it has to be rewritten too.
  await writeFile(resolve(dist, '404.html'), home)
}

const studies = projects.filter((project) => project.study)

for (const project of studies) {
  // Trailing slash: Pages serves these as directories and 301s the
  // slash-less form to it, so the canonical has to name the URL that
  // actually answers 200 rather than one that redirects.
  const url = `${origin}projects/${project.slug}/`
  const title = `${project.name} — Case study — Pranav Gujar`
  const description = project.study.premise

  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:type', 'article')
  html = setStructuredData(html, caseStudyGraph(project, url))

  const directory = resolve(dist, 'projects', project.slug)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}

for (const product of products) {
  const url = `${origin}work/${product.slug}/`
  const title = `${product.name} — ${product.company} — Pranav Gujar`

  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escape(title)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  html = setMeta(html, 'name', 'description', product.study.premise)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', product.study.premise)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'property', 'og:type', 'article')
  html = setStructuredData(html, productGraph(product, url))

  const directory = resolve(dist, 'work', product.slug)
  await mkdir(directory, { recursive: true })
  await writeFile(resolve(directory, 'index.html'), html)
}

const today = new Date().toISOString().slice(0, 10)
const urls = [
  { loc: origin, priority: '1.0' },
  ...studies.map((project) => ({ loc: `${origin}projects/${project.slug}/`, priority: '0.8' })),
  ...products.map((product) => ({ loc: `${origin}work/${product.slug}/`, priority: '0.7' })),
]

await writeFile(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) =>
      `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`,
)

await writeFile(
  resolve(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${origin}sitemap.xml\n`,
)

console.log(
  `prerender: ${studies.length} case studies, ${products.length} product pages, ` +
    'structured data, sitemap.xml and robots.txt written',
)
