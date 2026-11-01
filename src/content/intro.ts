import type { StackLine, TextRun } from '@/types/content'
import { experienceLong } from '@/lib/experience'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: {
  kicker: { name: string; location: string }
  headline: { lead: string; accent: string }
  /** Read by screen readers in place of the three display fragments. */
  headlineLabel: string
  paragraph: TextRun[]
  stack: StackLine[]
  marquee: string[]
} = {
  // Split, because the whole string spans a phone edge to edge: with the
  // rule in front of it, the line reads as a bar drawn across the screen.
  // The name is already in the header and in the heading directly beneath,
  // so the narrow layout keeps only what is not repeated.
  kicker: { name: 'Pranav Gujar', location: 'Pune, India' },

  /**
   * Two fragments, two treatments. Kept to two words so the headline is two
   * clean lines at every width — a third fragment wrapped mid-phrase on
   * phones and again on desktop once the portrait narrowed the column.
   * The years figure leads the metrics strip immediately below instead, and
   * is computed there rather than written.
   */
  headline: { lead: 'Software', accent: 'Engineer' },
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
