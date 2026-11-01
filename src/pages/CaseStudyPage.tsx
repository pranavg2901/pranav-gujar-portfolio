import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'
import { Reveal } from '@/components/ui/Reveal'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { projects, projectYears } from '@/content/projects'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { withBase } from '@/lib/paths'

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const index = projects.findIndex((project) => project.slug === slug)
  const project = index === -1 ? undefined : projects[index]

  useDocumentTitle(project?.name)

  // A project without a study has no page, so an unwritten study 404s rather
  // than rendering an empty shell.
  if (!project?.study) return <NotFoundPage />

  const { study } = project

  // Wraps around, so the last case study points back at the first instead of
  // ending on nothing. AlgoPy sits last in the list and was the one page with
  // no way forward — a reader who got that far had to use the back button.
  const studies = projects.filter((candidate) => candidate.study)
  const position = studies.findIndex((candidate) => candidate.slug === project.slug)
  const next = studies.length > 1 ? studies[(position + 1) % studies.length] : undefined

  return (
    <article>
      <div className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="grid-field absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="bloom absolute -top-40 -right-28 -z-10 size-[320px] rounded-full sm:-top-64 sm:-right-40 sm:size-[560px]"
        />

        <Container>
          <div className="py-16 md:py-20">
            <Link
              to="/#work"
              className="inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" />
              All projects
            </Link>

            <p className="eyebrow mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-11 bg-accent" />
              Case study / {projectYears(project)}
            </p>

            <h1 className="mt-6 text-hero font-extrabold text-ink uppercase">{project.name}</h1>

            <p className="mt-7 max-w-[56ch] text-[18px] leading-[1.65] text-muted">
              {study.premise}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Tag key={tag.label} label={tag.label} emphasis={tag.emphasis} />
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-7">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="inline-flex items-center gap-2 font-mono text-[12.5px] font-semibold tracking-[0.12em] text-accent uppercase hover:underline"
                  >
                    {link.label}
                    {link.external && <ArrowUpRight className="size-4" />}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid gap-14 py-16 lg:grid-cols-[1fr_260px] lg:gap-20">
          <div className="max-w-[68ch]">
            {study.sections.map((section, sectionIndex) => (
              <Reveal key={section.heading} delay={sectionIndex === 0 ? 0 : 40}>
                <section className="mb-14">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-faint">
                    {String(sectionIndex + 1).padStart(2, '0')}
                  </p>
                  <h2 className="mt-3 mb-5 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight font-extrabold tracking-[-0.035em] text-ink uppercase">
                    {section.heading}
                  </h2>
                  {section.body.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mb-4 text-[16.5px] leading-[1.8] text-muted last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.points && (
                    <ul className="mt-6 flex flex-col gap-3">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="border-l-2 border-accent-bright/50 pl-5 text-[15px] leading-relaxed text-muted"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              </Reveal>
            ))}

            {study.retrospective && (
              <section className="border border-line p-7 md:p-9">
                <p className="eyebrow">What I would do differently</p>
                {study.retrospective.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-4 text-[16px] leading-[1.8] text-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            )}
          </div>

          {/* Deliberately not sticky. The fact lists are now six to eight
              rows, and most values wrap to two lines in this column — about
              750px, which is taller than a laptop viewport. A sticky element
              taller than the space it sticks in has its bottom rows pinned
              off-screen permanently, so the last two facts could never be
              read. Letting it scroll with the page costs nothing. */}
          <aside className="lg:self-start">
            {project.image && (
              <img
                src={withBase(project.image.src)}
                alt={project.image.alt}
                loading="lazy"
                className="mb-8 w-full border border-line object-cover"
              />
            )}
            <dl className="flex flex-col border-t border-line">
              {study.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-4">
                  <dt className="font-mono text-[10.5px] tracking-[0.16em] text-accent uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {next?.study && (
          <Link
            to={`/projects/${next.slug}`}
            className="group flex items-center justify-between gap-6 border-t border-line py-12"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
                Next case study
              </p>
              <p className="mt-3 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-none font-extrabold tracking-[-0.04em] text-ink uppercase transition-colors group-hover:text-accent">
                {next.name}
              </p>
            </div>
            <ArrowRight className="size-7 shrink-0 text-faint transition-all group-hover:translate-x-2 group-hover:text-accent" />
          </Link>
        )}
      </Container>
    </article>
  )
}
