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
    'I am a software engineer in Pune. I work on backend systems and applied AI, mostly in Python: HTTP APIs, data pipelines, background workers, and the search and evaluation layers around language models.',
    'I work on the whole thing, not one slice of it — the database schema, the API, the retrieval and evaluation around a model, and then keeping it fast and correct once real traffic arrives. Recent work includes a 17-node LangGraph evaluation pipeline, search over 120,000+ chunks running on CPU, and an OCR pipeline that moved five years of old records into PostgreSQL without losing a row.',
    'I also run what I build: deployments, SSL, logging, the 2am call. Being the person responsible for it in production is what taught me which shortcuts you can afford and which you cannot.',
  ],

  // Sits under the heading, where the left column was otherwise empty down
  // the whole height of the prose. Three lines only, and deliberately not the
  // education block that used to be here: this is the hiring information a
  // recruiter scans for, and nothing that repeats the resume.
  facts: [
    { label: 'Based', value: 'Pune, India' },
    { label: 'Open to', value: 'Full-time roles' },
    { label: 'Experience', value: '2.5+ years in production' },
  ],
}
