// The JSON-LD a search engine reads. None of it is visible on the page.
//
// Two jobs. First, the obvious one: when someone types "Pranav Gujar" after
// seeing the resume or a LinkedIn profile, this page should be the result
// Google is confident about, with the right job title, employer and links to
// the other profiles that are the same person. That confidence comes from
// Person.sameAs agreeing with what those profiles say back.
//
// Second: each case study describes a real piece of software, so it carries
// SoftwareSourceCode with the stack and a breadcrumb back to the project
// list, which is what makes a search result show the trail rather than a bare
// URL.
//
// Everything is derived from src/content, so the structured data cannot drift
// away from what the page actually says.
import { productTitle } from '../src/content/products.ts'
import { site } from '../src/content/site.ts'

const person = () => ({
  '@type': 'Person',
  '@id': `${site.seo.url}#person`,
  name: site.name,
  givenName: 'Pranav',
  familyName: 'Gujar',
  jobTitle: site.seo.jobTitle,
  description: site.seo.description,
  url: site.seo.url,
  image: `${site.seo.url}images/pranav-gujar.jpg`,
  email: `mailto:${site.email}`,
  telephone: site.phone.dial,
  address: {
    '@type': 'PostalAddress',
    addressLocality: site.seo.locality,
    addressRegion: site.seo.region,
    addressCountry: site.seo.country,
  },
  worksFor: { '@type': 'Organization', name: site.seo.employer },
  alumniOf: { '@type': 'CollegeOrUniversity', name: site.seo.alumniOf },
  knowsAbout: site.seo.knowsAbout,
  seeks: { '@type': 'Demand', name: site.seo.seeking },
  // The link that ties the identities together. A search engine trusts this
  // far more when the profiles link back, which is why the LinkedIn and
  // GitHub profiles need this site's URL on them.
  sameAs: site.social.map((link) => link.href),
})

/** The home page: a profile page about one person, plus the site itself. */
export function homeGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': site.seo.url,
        url: site.seo.url,
        name: site.seo.title,
        description: site.seo.description,
        inLanguage: 'en',
        mainEntity: { '@id': `${site.seo.url}#person` },
        primaryImageOfPage: `${site.seo.url}og-card.png`,
      },
      person(),
      {
        '@type': 'WebSite',
        '@id': `${site.seo.url}#website`,
        url: site.seo.url,
        name: `${site.name} — portfolio`,
        inLanguage: 'en',
        publisher: { '@id': `${site.seo.url}#person` },
      },
    ],
  }
}

/**
 * An employer's product. Authorship is split on purpose: I wrote the page,
 * the company owns the software. Claiming `author` on something a company
 * owns is the kind of overstatement a recruiter checks.
 */
export function productGraph(product, url) {
  const stack = product.study.facts.find((fact) => fact.label === 'Stack')?.value

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': url,
        url,
        headline: `${productTitle(product)} — ${product.company}`,
        description: product.study.premise,
        inLanguage: 'en',
        author: { '@id': `${site.seo.url}#person` },
        about: { '@id': `${url}#software` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}#software`,
        name: productTitle(product),
        description: product.summary,
        publisher: { '@type': 'Organization', name: product.company },
        contributor: { '@id': `${site.seo.url}#person` },
        ...(stack ? { programmingLanguage: stack.split(', ') } : {}),
        ...(product.links[0] ? { url: product.links[0].href } : {}),
      },
      person(),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.seo.url },
          { '@type': 'ListItem', position: 2, name: 'Experience', item: `${site.seo.url}#experience` },
          { '@type': 'ListItem', position: 3, name: product.name, item: url },
        ],
      },
    ],
  }
}

/** A case study: the write-up, the software it describes, and the trail. */
export function caseStudyGraph(project, url) {
  const stack = project.study.facts.find((fact) => fact.label === 'Stack')?.value
  const live = project.links.find((link) => link.label === 'Live demo')?.href

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': url,
        url,
        headline: `${project.name} — case study`,
        description: project.study.premise,
        inLanguage: 'en',
        author: { '@id': `${site.seo.url}#person` },
        publisher: { '@id': `${site.seo.url}#person` },
        image: `${site.seo.url}og-card.png`,
        about: { '@id': `${url}#software` },
      },
      {
        '@type': 'SoftwareSourceCode',
        '@id': `${url}#software`,
        name: project.name,
        description: project.summary,
        author: { '@id': `${site.seo.url}#person` },
        ...(stack ? { programmingLanguage: stack.split(', ') } : {}),
        ...(live ? { codeRepository: undefined, url: live } : {}),
      },
      person(),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: site.seo.url },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${site.seo.url}#work` },
          { '@type': 'ListItem', position: 3, name: project.name, item: url },
        ],
      },
    ],
  }
}
