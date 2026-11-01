import { useParams } from 'react-router-dom'
import { StudyArticle } from '@/components/study/StudyArticle'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { projects, projectYears } from '@/content/projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((candidate) => candidate.slug === slug)

  useDocumentTitle(project?.name)

  // A project without a study has no page, so an unwritten study 404s rather
  // than rendering an empty shell.
  if (!project?.study) return <NotFoundPage />

  // Wraps around, so the last case study points back at the first instead of
  // ending on nothing — a reader who got that far had to use the back button.
  const studies = projects.filter((candidate) => candidate.study)
  const position = studies.findIndex((candidate) => candidate.slug === project.slug)
  const next = studies.length > 1 ? studies[(position + 1) % studies.length] : undefined

  return (
    <StudyArticle
      back={{ to: '/#work', label: 'All projects' }}
      eyebrow={`Case study / ${projectYears(project)}`}
      title={project.name}
      tags={project.tags}
      links={project.links}
      study={project.study}
      image={project.image}
      next={
        next ? { to: `/projects/${next.slug}`, label: 'Next case study', name: next.name } : undefined
      }
    />
  )
}
