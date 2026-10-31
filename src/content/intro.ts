import type { StackLine, TextRun } from '@/types/content'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: {
  eyebrow: string
  headline: { light: string; accent: string }
  paragraph: TextRun[]
  stack: StackLine[]
} = {
  /** Sits above the headline, in clay. Three words, no sentence. */
  eyebrow: 'Backend · Applied AI · Production',

  /**
   * Two lines, two colours. The split is what gives the headline its weight at
   * this size — a single-colour block of 92px type reads as shouting.
   */
  headline: { light: 'Pranav Gujar', accent: 'Software Engineer' },

  paragraph: [
    {
      text: 'I build production Python systems — APIs, data pipelines and AI workflows — and take them from requirements through deployment and the support calls afterwards. Currently at ',
    },
    { text: 'Blueport Solutions', strong: true },
    { text: ', where I own a multi-tenant SaaS platform end to end.' },
  ],

  /** Four labelled lines, so the stack is scannable in seconds. */
  stack: [
    { label: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Django REST'] },
    { label: 'Data', items: ['PostgreSQL', 'Redis', 'MongoDB', 'PgBouncer'] },
    { label: 'Applied AI', items: ['LangGraph', 'RAG', 'Hugging Face', 'ONNX'] },
    { label: 'Infra', items: ['Docker', 'AWS', 'Temporal', 'RabbitMQ', 'CI/CD'] },
  ],
}
