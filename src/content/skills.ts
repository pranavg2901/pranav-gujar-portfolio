import type { SkillGroup } from '@/types/content'

/**
 * Grouped rather than listed, and deliberately not rated. Percentage bars on a
 * skills section are a claim nobody can check, including me.
 */
export const skills: SkillGroup[] = [
  { label: 'Languages', items: ['Python', 'JavaScript', 'SQL'] },
  {
    label: 'Backend',
    items: ['FastAPI', 'Flask', 'Django', 'Django REST Framework', 'Pytest'],
  },
  {
    label: 'Applied AI',
    items: ['LangGraph', 'RAG pipelines', 'Hugging Face', 'ChromaDB', 'Langfuse', 'ONNX INT8'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'PgBouncer', 'Schema migrations'],
  },
  {
    label: 'Distributed',
    items: ['RabbitMQ', 'Temporal', 'Background workers', 'Async queues'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['AWS (EC2, S3, RDS, VPC, Route 53, IAM)', 'Docker', 'GitHub Actions', 'Linux'],
  },
  {
    label: 'Testing',
    items: ['Pytest', 'Playwright', 'Contract tests', 'Golden tests', 'Backtests'],
  },
  {
    label: 'Operations',
    items: ['VPS', 'Coolify', 'Apache', 'SSL/TLS', 'Logging', 'Monitoring', 'Releases'],
  },
]
