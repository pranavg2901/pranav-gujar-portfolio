# pranav-gujar-portfolio

Personal portfolio — one scrolling page plus a case-study route per project.
React, Vite and Tailwind, built to static files and served from GitHub Pages.

Live: https://pranavg2901.github.io

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script             | What it does                                         |
| ------------------ | ---------------------------------------------------- |
| `npm run dev`      | Dev server with hot reload                           |
| `npm run build`    | Typecheck, build to `dist/`, write the SPA fallback  |
| `npm run preview`  | Serve `dist/` exactly as GitHub Pages will           |
| `npm run typecheck`| Types only, no build                                 |

## Changing the content

**All text lives in `src/content/`. Nothing is hardcoded in a component.**
To update the site you edit a data file, not markup.

| File                     | Holds                                                 |
| ------------------------ | ----------------------------------------------------- |
| `content/site.ts`        | Name, role, email, nav, social links, resume, SEO, form |
| `content/intro.ts`       | Hero headline, paragraph, stack summary, tech marquee  |
| `content/about.ts`       | The about block beside the portrait                    |
| `content/metrics.ts`     | The five numbers in the band under the hero            |
| `content/projects.ts`    | Project cards **and** their full case studies          |
| `content/experience.ts`  | Jobs and their bullets                                 |
| `content/skills.ts`      | Skill groups                                           |
| `content/background.ts`  | Education and certifications                           |

Two conventions worth knowing:

- `**double asterisks**` inside a bullet render as emphasis. That is the only
  markup supported, deliberately — see `lib/emphasis.tsx`.
- A project only gets a `/projects/<slug>` page if it has a `study` key.
  Remove the key and the card loses its "Case study" link; nothing else changes.

Colours, fonts and the type scale are in `src/styles/tokens.css` — light and
dark are the same file, so a palette change is one edit.

Two accent tokens exist on purpose. `--accent-bright` is the signature lime and
is only ever a fill behind dark text; `--accent` is the contrast-safe pair used
for anything that is itself text. Using the bright one as a text colour fails
contrast badly in light mode.

## Layout

```
public/            favicon, social card, fonts, resume PDF, profile images
scripts/           favicon.py     — favicon set, from one font glyph
                   structured-data.mjs — the JSON-LD a search engine reads
                   og-card.py     — the 1200x630 social card
                   spa-fallback.mjs — writes dist/404.html after a build
                   prerender.mjs  — a real page per case study, + sitemap
src/
  content/         all copy and data (edit here)
  types/           shapes for everything in content/
  components/
    layout/        header, footer, theme toggle, scroll restoration
    sections/      hero, metrics, work, about, experience, skills,
                   background, contact
    ui/            container, button, tag, reveal, icons, section heading
  hooks/           theme, active section, contact form, document title
  lib/             base-path helpers, class join, emphasis renderer
  pages/           home, case study, 404
  styles/          tokens.css (palette), global.css
```

## Contact form

The form posts to [Web3Forms](https://web3forms.com), which submits straight
from the browser to one fixed inbox. Its access key is public by design and is
safe in the bundle — unlike a mail password, it can only deliver to the one
address it was issued for.

```bash
cp .env.example .env
# then set VITE_WEB3FORMS_KEY
```

Without a key the form still works: it hands the message to the visitor's own
mail client as a pre-filled draft. That is worse, but it never silently drops a
message, which is the usual fate of a static-site form wired to nothing.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes
to GitHub Pages, which is configured with **Settings → Pages → Source** set to
**GitHub Actions**.

Note that the repository has to stay public. Private repositories bill Actions
minutes and cannot use Pages on the free plan, which blocks the deploy at the
first step with a billing error rather than anything to do with the build.

Two things this setup gets right that are easy to miss:

- The repository is named `pranavg2901.github.io`, so Pages serves it from the
  domain root. The base path is set once in `vite.config.ts` and read back
  everywhere through `lib/paths.ts`, so moving to a host that serves from a
  subpath is one environment variable (`SITE_BASE`).
- Pages has no server-side rewrite, so reloading `/projects/agentcv` would 404.
  `scripts/prerender.mjs` writes a real `projects/<slug>/index.html` for every
  case study, each carrying its own title, description and Open Graph tags, so
  those routes answer 200 and preview correctly when shared. `404.html` is
  still written as the fallback for any other unknown path.
- The same script writes `sitemap.xml` and `robots.txt`, taking the domain
  from the canonical link in the built `index.html` so it is not a second
  place to keep the URL.

## SEO

None of this is visible on the page.

- The home page's title, description and structured data are written at build
  time from `content/site.ts`, so there is one place to change them. The copy
  in `index.html` is what the dev server shows.
- `scripts/structured-data.mjs` emits schema.org JSON-LD: a `ProfilePage` and
  `Person` on the home page, and `TechArticle` + `SoftwareSourceCode` +
  `BreadcrumbList` on each case study. The `Person.sameAs` list and the
  `rel="me"` links in the footer are what tell a search engine that this site,
  the GitHub account and the LinkedIn profile are one person — which only
  works fully once those profiles link back here.
- The title leads with the name. The search that matters is someone typing
  "Pranav Gujar" after reading the resume; ranking for "backend engineer" is
  not a realistic target for a personal site and is not what it is tuned for.

## Dependencies

React, React DOM, React Router. That is the whole runtime list.

Fonts are self-hosted from `public/fonts` (the two variable latin subsets,
79KB together) rather than fetched from Google, which removes two DNS lookups
and a render-blocking stylesheet from the critical path.

Animations are an `IntersectionObserver` and a CSS transition
(`components/ui/Reveal.tsx`); icons are drawn in `components/ui/Icon.tsx`. The
libraries that would have supplied those two things cost 56MB on disk and
roughly 40kB gzipped in the bundle, for a fade and seven glyphs.

## Known limitation

The generated case-study pages carry correct metadata but an empty body — the
content is still rendered by the app. Search engines run JavaScript, so they
index it; a preview bot that does not will show the title and description and
nothing else. Real server rendering would need an SSR build, which is more
machinery than three pages justify.

## Outstanding

- Project screenshots. Add `image: { src, alt }` to a project in
  `content/projects.ts` and the card picks it up. No other change is needed.
- Retrospectives for EIGENN and AlgoPy. AgentCV has one; the others are blank
  because only the person who built them can write that honestly.
