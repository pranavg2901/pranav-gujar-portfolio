import type { Link } from '@/types/content'
// Relative, not the "@/" alias: the Node build scripts import this module
// directly to generate the page metadata, and Node resolves no such alias.
// A type-only import is erased before Node sees it, which is why the line
// above can keep it.
import { experienceLong } from '../lib/experience.ts'

/**
 * Everything global lives here: identity, navigation, outbound links, SEO,
 * and the contact-form target. Nothing in src/components hardcodes any of it.
 */
export const site = {
  name: 'Pranav Gujar',
  role: 'Software Engineer — Backend Systems & Applied AI',
  location: 'Pune, India',
  email: 'pranavgujar2901@gmail.com',
  /** Spaced for reading; the tel: link strips it back down. */
  phone: { display: '+91 91466 24414', dial: '+919146624414' },

  /** The three things an HR screen checks before anything else. */
  availability: {
    notice: '60 days',
    relocation: 'Anywhere in India',
    workMode: 'Onsite, hybrid or remote',
  },

  /** Shown beside the name in the header. Keep it to a few words. */
  /** Shown beside the name in the header. Rendered in monospace. */
  tagline: 'Backend / AI',

  seo: {
    // Name first: the search that matters most is someone typing "Pranav
    // Gujar" after seeing the resume or the LinkedIn profile, and the page
    // has to be the obvious first result for it. The role terms follow, for
    // the searches where the name is not known yet.
    title: 'Pranav Gujar — Python Backend & AI Engineer | Pune, India',
    // Rebuilt monthly by .github/workflows, so the figure here cannot drift
    // the way a typed one does.
    description: `Pranav Gujar is a software engineer in Pune with ${experienceLong()} building production Python systems — FastAPI, Django, PostgreSQL, LangGraph and RAG pipelines on AWS. Open to full-time backend and applied AI roles, and to relocating anywhere in India.`,
    url: 'https://pranavg2901.github.io/',

    /** Used in the structured data a search engine reads. */
    jobTitle: 'Software Engineer — Backend Systems & Applied AI',
    locality: 'Pune',
    region: 'Maharashtra',
    country: 'IN',
    employer: 'Blueport Solutions',
    alumniOf: 'Savitribai Phule Pune University',
    /** What this person works on, in the words someone would search for. */
    knowsAbout: [
      'Python',
      'Backend development',
      'FastAPI',
      'Django',
      'Django REST Framework',
      'Flask',
      'REST API design',
      'PostgreSQL',
      'Redis',
      'MongoDB',
      'Applied AI',
      'LangGraph',
      'Retrieval-Augmented Generation',
      'Large language model applications',
      'ONNX',
      'Docker',
      'AWS',
      'CI/CD',
      'Distributed systems',
      'Temporal',
      'RabbitMQ',
    ],
    seeking:
      'Full-time backend engineering or applied AI role — 60 days notice, open to relocating anywhere in India, and to onsite, hybrid or remote work',
  },

  /** Anchors in the one-page layout. Order here is the order in the header. */
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],

  resume: {
    /**
     * Two labels, because the same link does two different things. A desktop
     * browser opens the PDF in its own viewer; a phone hands it to a download
     * or to another app. "Download resume" on a machine that is about to show
     * it on screen is simply wrong, and a button that misdescribes itself is
     * a small thing a careful reader notices.
     */
    label: 'View resume',
    mobileLabel: 'Download resume',
    /** Relative to the site base — resolved by withBase() in lib/paths.ts. */
    href: 'files/pranav-gujar-resume.pdf',
  },

  profileImage: {
    jpg: 'images/pranav-gujar.jpg',
    webp: 'images/pranav-gujar.webp',
    alt: 'Pranav Gujar',
  },

  social: [
    { label: 'GitHub', href: 'https://github.com/pranavg2901', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/pranavpgujar', external: true },
  ] satisfies Link[],

  /**
   * Confirmations for actions that otherwise give no feedback. Keyed by the
   * kind of link, so every Resume button on the page says the same thing.
   */
  toasts: {
    resume: 'Opening the resume — thanks for taking a look.',
    github: 'Opening GitHub in a new tab.',
    linkedin: 'Opening LinkedIn in a new tab.',
    email: 'Opening your email app.',
  },

  /** The closing band above the footer links. */
  closing: {
    eyebrow: 'Open to opportunities',
    headline: 'Let’s talk',
    note: 'I am looking for a full-time backend or applied AI role — based in Pune and open to relocating anywhere in India. If you are hiring, I am happy to walk you through any of the work above.',
  },

  /**
   * Web3Forms submits straight from the browser to one fixed inbox.
   *
   * The access key lives here rather than in an environment variable on
   * purpose. It is public by design — it can only ever deliver to the single
   * address it was issued for, and Vite inlines it into the bundle either
   * way, so an env var hides nothing and adds a step that fails silently if
   * CI forgets to pass it. VITE_WEB3FORMS_KEY still overrides it if the key
   * ever needs rotating without a code change.
   *
   * With no key at all the form falls back to opening a pre-filled email, so
   * the page is never broken; it just costs the visitor one more click.
   */
  contactForm: {
    endpoint: 'https://api.web3forms.com/submit',
    // `||`, not `??`. An unset GitHub Actions variable expands to an empty
    // string rather than undefined, and `??` only falls back on null or
    // undefined — so CI was building with an empty key and the live form was
    // silently falling back to a mailto draft while local builds worked.
    // `import.meta.env` is read through a fallback so this module can also be
    // imported by the Node build scripts, which have no such object. Vite
    // still replaces it with a real object in the bundle.
    accessKey:
      (import.meta.env ?? {}).VITE_WEB3FORMS_KEY || '79f8c094-9cf5-43ee-a7be-2c19f38f2dfd',
  },
} as const
