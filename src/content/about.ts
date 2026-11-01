import { experienceLong } from '@/lib/experience'

/**
 * The one place on the site with a face on it. Kept small and placed after the
 * work, so the hero stays type-led and the projects arrive before the person.
 *
 * Plain words on purpose. This is the paragraph a recruiter reads before they
 * know any of the terms below it.
 */
export const about: {
  eyebrow: string
  title: string
  paragraphs: string[]
  facts: { label: string; value: string }[]
} = {
  eyebrow: 'Profile',
  // Two short words. "Who is writing this" was arch for a hiring audience and
  // wrapped to three lines of display type in the heading column.
  title: 'About me',

  paragraphs: [
    'I am a software engineer based in Pune, working on backend systems and applied AI. Most of my work is in Python: HTTP APIs, data pipelines, background workers, and the retrieval and evaluation layers around language models.',
    'I take responsibility for the full stack of a system rather than a single layer: the database schema, the API, the retrieval and evaluation around a model, and the work of keeping it fast and correct once it carries real traffic. Recent projects include a 17-node LangGraph evaluation pipeline, retrieval over 120,000+ chunks running entirely on CPU, and an OCR pipeline that migrated five years of legacy records into PostgreSQL without the loss of a single row.',
    'I also operate what I build — deployments, certificates, logging, and the on-call response when something fails at an inconvenient hour. Being accountable for a system in production is what taught me which shortcuts are affordable and which are not.',
  ],

  // Sits under the heading, where the left column was otherwise empty down
  // the whole height of the prose. Three lines only, and deliberately not the
  // education block that used to be here: this is the hiring information a
  // recruiter scans for, and nothing that repeats the resume.
  facts: [
    { label: 'Based', value: 'Pune, India' },
    { label: 'Open to', value: 'Full-time roles' },
    { label: 'Relocation', value: 'Anywhere in India' },
    { label: 'Notice period', value: '60 days' },
    { label: 'Work mode', value: 'Onsite, hybrid or remote' },
    // Just the duration. "2 years 9 months, since Feb 2024" said the same
    // thing twice and was the only value in the panel that needed two lines.
    { label: 'Experience', value: experienceLong() },
  ],
}
