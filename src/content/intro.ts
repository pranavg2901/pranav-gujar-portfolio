import type { StackLine, TextRun } from '@/types/content'
import { experienceLong } from '@/lib/experience'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: {
  headline: { lead: string; accent: string }
  /** Sits under the name, at a fraction of its size. */
  role: string
  /** Read by screen readers in place of the two display fragments. */
  headlineLabel: string
  paragraph: TextRun[]
  stack: StackLine[]
  marquee: string[]
} = {
  /**
   * The name, set as the headline.
   *
   * It used to be "Software Engineer" at that size, with the name reduced to
   * a line of small type above it — which is the arrangement a template
   * ships with, because a template does not know whose site it is. A person
   * does: the name leads, and the job title sits under it.
   *
   * Two words, two treatments, so it is two clean lines at every width.
   */
  headline: { lead: 'Pranav', accent: 'Gujar' },
  role: 'Software Engineer — Backend systems & applied AI',
  headlineLabel: `Pranav Gujar — Software Engineer, backend systems and applied AI, ${experienceLong()} in production, Pune, India`,

  paragraph: [
    {
      text: 'I build production Python systems — APIs, data pipelines and AI workflows — and take them from initial requirements through to deployment and ongoing support. Currently at ',
    },
    { text: 'Blueport Solutions', strong: true },
    { text: ', where I own the delivery of a multi-tenant SaaS platform end to end.' },
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
