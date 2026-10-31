/**
 * The one place on the site with a face on it. Kept small and placed after the
 * work, so the hero stays type-led and the projects arrive before the person.
 */
export const about: {
  eyebrow: string
  title: string
  paragraphs: string[]
  /** Short factual pairs shown beside the photo. */
  facts: { label: string; value: string }[]
} = {
  eyebrow: 'About',
  title: 'Who is writing this',

  paragraphs: [
    'I am a software engineer in Pune working on backend systems and applied AI. Most of what I do is Python: HTTP APIs, data pipelines, background workers, and the retrieval and evaluation layers around language models.',
    'The thread through my work is accountability. The evaluation platform I work on puts a human reviewer in front of every AI result before a student sees it. The resume tool I built for myself uses no language model at all, and enforces that rule in code — because knowing when not to reach for a model is as much of the job as wiring one in.',
    'I also run what I ship. Deployments, SSL, logging, the 2am page — being on the hook for the thing in production is what taught me which shortcuts are affordable and which are not.',
  ],

  facts: [
    { label: 'Based in', value: 'Pune, India' },
    { label: 'Focus', value: 'Backend systems, applied AI' },
    { label: 'Primary stack', value: 'Python, PostgreSQL, Docker' },
    { label: 'Education', value: 'MBA Business Analytics, BSc Computer Science' },
  ],
}
