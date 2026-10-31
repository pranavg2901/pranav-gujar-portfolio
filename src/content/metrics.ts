import type { Metric } from '@/types/content'

/**
 * The strip under the hero. Every number here is traceable to one project.
 *
 * Values are kept to a single short token and the unit moved into the caption
 * — at five across, anything longer collides with the next cell.
 */
export const metrics: Metric[] = [
  { value: '2.5+', caption: 'Years in production engineering' },
  { value: '70%', caption: 'API response time cut' },
  { value: '120K+', caption: 'Chunks indexed, CPU-only RAG' },
  { value: '17', caption: 'Node LangGraph evaluation pipeline' },
  { value: '150+', caption: 'Tests over failure states' },
]
