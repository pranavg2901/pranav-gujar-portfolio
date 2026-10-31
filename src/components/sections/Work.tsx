import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { HighlightList } from '@/components/ui/HighlightList'
import { Screenshot } from '@/components/ui/Screenshot'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { projects } from '@/content/projects'
import type { Project } from '@/types/content'

export function Work() {
  return (
    <section id="work" className="py-16 md:py-20">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        note="Three systems where the hard part was a constraint rather than a feature."
      />

      <div className="flex flex-col gap-4">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="grid gap-4 rounded-[14px] border border-line bg-raised p-4 transition-colors duration-200 hover:border-line-strong md:grid-cols-[300px_1fr] md:gap-7 md:p-5">
      <Screenshot
        src={project.image?.src}
        alt={project.image?.alt}
        pending={`${project.name} screenshot`}
      />

      <div className="flex flex-col">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink">{project.name}</h3>
          <span className="shrink-0 font-mono text-[12.5px] text-faint">{project.year}</span>
        </div>

        <p className="mt-2 text-[15px] leading-relaxed text-muted">{project.summary}</p>

        <HighlightList items={project.highlights} className="mt-3.5" />

        <footer className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} emphasis={tag.emphasis} />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[13.5px] font-medium">
            {project.study && (
              <Link
                to={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-accent hover:underline"
              >
                Case study
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            )}
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
        </footer>
      </div>
    </article>
  )
}
