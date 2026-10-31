import type { StackLine, TextRun } from '@/types/content'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: {
  kicker: string
  headline: { lead: string; accent: string }
  /** Read by screen readers in place of the three display fragments. */
  headlineLabel: string
  paragraph: TextRun[]
  stack: StackLine[]
  marquee: string[]
} = {
  kicker: 'Pranav Gujar · Pune, India',

  /**
   * Two fragments, two treatments. Kept to two words so the headline is two
   * clean lines at every width — a third fragment wrapped mid-phrase on
   * phones and again on desktop once the portrait narrowed the column.
   * The "2.5+" figure leads the metrics strip immediately below instead.
   */
  headline: { lead: 'Software', accent: 'Engineer' },
  headlineLabel: 'Pranav Gujar — Software Engineer, 2.5 years in production',

  paragraph: [
    {
      text: 'I build Python systems that run in production — APIs, data pipelines and AI workflows — and take them from the first requirement through to deployment and the support calls after. Currently at ',
    },
    { text: 'Blueport Solutions', strong: true },
    { text: ', where I own a multi-tenant SaaS platform end to end.' },
  ],

  stack: [
    { label: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Django REST'] },
    { label: 'Data', items: ['PostgreSQL', 'Redis', 'MongoDB', 'PgBouncer'] },
    { label: 'Applied AI', items: ['LangGraph', 'RAG', 'Hugging Face', 'ONNX'] },
    { label: 'Infra', items: ['Docker', 'AWS', 'Temporal', 'RabbitMQ', 'CI/CD'] },
  ],

  /** The scrolling strip under the hero. Keep it short enough to read. */
  marquee: [
    'Python',
    'FastAPI',
    'LangGraph',
    'PostgreSQL',
    'Redis',
    'Temporal',
    'RabbitMQ',
    'Docker',
    'AWS',
    'ONNX',
    'Pytest',
    'GitHub Actions',
  ],
}
