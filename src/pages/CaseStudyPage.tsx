import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { Screenshot } from '@/components/ui/Screenshot'
import { Tag } from '@/components/ui/Tag'
import { Reveal } from '@/components/ui/Reveal'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { projects } from '@/content/projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = index === -1 ? undefined : projects[index]

  useDocumentTitle(project?.name)

  // A project without a study has no page, so an unwritten study 404s rather
  // than rendering an empty shell.
  if (!project?.study) return <NotFoundPage />

  const { study } = project
  const next = projects.slice(index + 1).find((candidate) => candidate.study)

  return (
    <Container>
      <article className="pb-6">
        <Link
          to="/#work"
          className="mt-10 inline-flex items-center gap-2 text-[13.5px] text-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          All projects
        </Link>

        <header className="mt-7 border-b border-line pb-10">
          <p className="eyebrow uppercase">Case study</p>
          <h1 className="mt-3 text-[31px] font-semibold tracking-[-0.03em] text-ink md:text-display">
            {project.name}
          </h1>
          <p className="mt-4 max-w-[60ch] text-[18px] leading-[1.6] text-muted">{study.premise}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} emphasis={tag.emphasis} />
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-5 text-[14px] font-medium">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 text-accent hover:underline"
                >
                  {link.label}
                  {link.external && <ArrowUpRight className="size-3.5" aria-hidden />}
                </a>
              ))}
            </div>
          )}
        </header>

        <div className="grid gap-12 py-12 lg:grid-cols-[1fr_250px] lg:gap-16">
          <div className="max-w-[68ch]">
            {study.sections.map((section, sectionIndex) => (
              <Reveal key={section.heading} delay={sectionIndex === 0 ? 0 : 0.04}>
                <section className="mb-11">
                  <h2 className="mb-3 text-[21px] font-semibold tracking-[-0.02em] text-ink">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mb-3.5 text-[16.5px] leading-[1.7] text-muted last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.points && (
                    <ul className="mt-4 flex flex-col gap-2 border-l-2 border-accent-wash pl-5">
                      {section.points.map((point) => (
                        <li key={point} className="text-[15px] leading-relaxed text-muted">
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}

            {study.retrospective && (
              <section className="rounded-[14px] border border-line bg-raised p-6">
                <h2 className="mb-3 text-[17px] font-semibold text-ink">
                  What I would do differently
                </h2>
                {study.retrospective.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-3 text-[15.5px] leading-[1.7] text-muted last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Screenshot
              src={project.image?.src}
              alt={project.image?.alt}
              pending={`${project.name} screenshot`}
              className="mb-6"
            />
            <dl className="flex flex-col">
              {study.facts.map((fact) => (
                <div key={fact.label} className="border-t border-line py-3">
                  <dt className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1 text-[14px] leading-snug text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {next?.study && (
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-4 border-t border-line py-8"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-faint uppercase">
                Next case study
              </p>
              <p className="mt-1.5 text-[21px] font-semibold tracking-[-0.02em] text-ink">
                {next.name}
              </p>
            </div>
            <ArrowRight
              className="size-5 text-faint transition-transform group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        )}
      </article>
    </Container>
  )
}
