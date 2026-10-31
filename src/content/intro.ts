import type { StackLine, TextRun } from '@/types/content'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: {
  kicker: string
  headline: { lead: string; accent: string; outline: string }
  /** Read by screen readers in place of the three display fragments. */
  headlineLabel: string
  paragraph: TextRun[]
  stack: StackLine[]
  marquee: string[]
} = {
  kicker: 'Pranav Gujar · Pune, India',

  /**
   * Three fragments, three treatments: solid, accent, outlined. The split is
   * what carries the headline at this size — a single block of 100px type is
   * just loud.
   */
  headline: { lead: 'Software', accent: 'Engineer', outline: '/ 2.5 yrs' },
  headlineLabel: 'Pranav Gujar — Software Engineer, 2.5 years in production',

  paragraph: [
    {
      text: 'I build production Python systems — APIs, data pipelines and AI workflows — and take them from requirements through deployment and the support calls afterwards. Currently at ',
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
