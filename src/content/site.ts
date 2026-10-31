import type { Link } from '@/types/content'

/**
 * Everything global lives here: identity, navigation, outbound links, SEO,
 * and the contact-form target. Nothing in src/components hardcodes any of it.
 */
export const site = {
  name: 'Pranav Gujar',
  role: 'Software Engineer — Backend Systems & Applied AI',
  location: 'Pune, India',
  email: 'pranavgujar2901@gmail.com',

  /** Shown beside the name in the header. Keep it to a few words. */
  /** Shown beside the name in the header. Rendered in monospace. */
  tagline: 'Backend / AI',

  seo: {
    title: 'Pranav Gujar — Software Engineer',
    description:
      'I build production Python backends, data pipelines and AI workflows, and run them end to end.',
    url: 'https://pranavg2901.github.io/',
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
    label: 'Download resume',
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
    resume: 'Resume downloading — thanks for taking a look.',
    github: 'Opening GitHub in a new tab.',
    linkedin: 'Opening LinkedIn in a new tab.',
    email: 'Opening your email app.',
  },

  /** The closing band above the footer links. */
  closing: {
    eyebrow: 'Open to opportunities',
    headline: 'Let’s talk',
    note: 'I am looking for a full-time backend engineering or applied AI role. If you are hiring, I would be glad to walk you through any of the work above.',
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
    accessKey: import.meta.env.VITE_WEB3FORMS_KEY || '79f8c094-9cf5-43ee-a7be-2c19f38f2dfd',
  },
} as const
