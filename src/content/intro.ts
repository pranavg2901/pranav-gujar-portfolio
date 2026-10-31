import type { StackLine, TextRun } from '@/types/content'

/** The hero. Plain statements of fact — no slogan, no pitch. */
export const intro: { paragraph: TextRun[]; stack: StackLine[] } = {
  /**
   * `strong: true` renders in full-contrast ink. Used to pull the eye to the
   * two or three words that actually matter in the paragraph.
   */
  paragraph: [
    { text: 'I build production Python systems — APIs, data pipelines and AI workflows — and take them from requirements through deployment and the support calls afterwards. Currently at ' },
    { text: 'Blueport Solutions', strong: true },
    { text: ', where I own a multi-tenant SaaS platform end to end.' },
  ],

  /** Four lines, deliberately labelled, so the stack is scannable in seconds. */
  stack: [
    { label: 'Backend', items: ['Python', 'FastAPI', 'Flask', 'Django REST'] },
    { label: 'Data', items: ['PostgreSQL', 'Redis', 'MongoDB', 'PgBouncer'] },
    { label: 'Applied AI', items: ['LangGraph', 'RAG', 'Hugging Face', 'ONNX'] },
    { label: 'Infra', items: ['Docker', 'AWS', 'Temporal', 'RabbitMQ', 'CI/CD'] },
  ],
}
