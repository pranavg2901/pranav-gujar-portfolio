import type { Metric } from '@/types/content'

/** The strip under the hero. Every number here is traceable to one project. */
export const metrics: Metric[] = [
  { value: '2.5+ yrs', caption: 'Production engineering' },
  { value: '70%', caption: 'API response time cut' },
  { value: '120K+', caption: 'Chunks indexed, CPU-only RAG' },
  { value: '17 nodes', caption: 'LangGraph evaluation pipeline' },
  { value: '150+', caption: 'Tests over failure states' },
]
