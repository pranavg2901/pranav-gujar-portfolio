/**
 * The one place on the site with a face on it. Kept small and placed after the
 * work, so the hero stays type-led and the projects arrive before the person.
 */
export const about: {
  eyebrow: string
  title: string
  paragraphs: string[]
} = {
  eyebrow: 'About',
  title: 'Who is writing this',

  paragraphs: [
    'I am a software engineer in Pune working on backend systems and applied AI. Most of what I do is Python: HTTP APIs, data pipelines, background workers, and the retrieval and evaluation layers around language models.',
    'I work across the whole lifecycle: designing the schema, building the API, shipping the retrieval and evaluation layers around a model, and then keeping the result fast and correct under real traffic. Recent work includes a 17-node LangGraph evaluation pipeline, retrieval over 120,000+ chunks running on CPU, and an OCR pipeline that migrated five years of legacy records into PostgreSQL without losing a row.',
    'I also run what I ship. Deployments, SSL, logging, the 2am page — being on the hook for the thing in production is what taught me which shortcuts are affordable and which are not.',
  ],

}
