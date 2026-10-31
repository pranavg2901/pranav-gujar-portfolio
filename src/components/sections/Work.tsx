import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/ui/Icon'
import { ArrowButton } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { projects } from '@/content/projects'
import { emphasise } from '@/lib/emphasis'
import { withBase } from '@/lib/paths'
import type { Project } from '@/types/content'

export function Work() {
  return (
    <section id="work" className="py-20 md:py-28">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        note="Three systems where the hard part was a constraint rather than a feature."
      />

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 70}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/**
 * A dark panel per project. The whole card is the case-study link via a
 * stretched overlay, which keeps the outbound links clickable — nesting them
 * inside a wrapping anchor would be invalid markup.
 *
 * When a project gains an `image`, it becomes the card background behind a
 * scrim and nothing else about the card changes.
 */
function ProjectCard({ project }: { project: Project }) {
  const emphasisTag = project.tags.find((tag) => tag.emphasis)
  const restTags = project.tags.filter((tag) => !tag.emphasis)

  return (
    <article className="group relative isolate overflow-hidden rounded-[28px] bg-panel">
      {project.image && (
        <>
          <img
            src={withBase(project.image.src)}
            alt=""
            loading="lazy"
            className="absolute inset-0 -z-10 size-full object-cover opacity-45 transition-transform duration-700 group-hover:scale-105"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-panel/75" />
        </>
      )}

      {project.study && (
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`${project.name} case study`}
          className="absolute inset-0 z-10"
        />
      )}

      <div className="p-7 sm:p-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            {emphasisTag && (
              <span className="inline-block rounded-full bg-accent-soft/15 px-3.5 py-1.5 text-[12px] font-medium tracking-wide text-accent-soft">
                {emphasisTag.label}
              </span>
            )}
            <h3 className="mt-5 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-none font-semibold tracking-[-0.03em] text-panel-ink">
              {project.name}
            </h3>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-5">
            <span className="font-mono text-[12.5px] text-panel-faint">{project.year}</span>
            {project.study && <ArrowButton />}
          </div>
        </div>

        <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-panel-muted">
          {project.summary}
        </p>

        <ul className="mt-7 grid gap-3 md:grid-cols-2 md:gap-x-10">
          {project.highlights.map((item) => (
            <li
              key={item}
              className="relative pl-5 text-[14.5px] leading-relaxed text-panel-muted"
            >
              <span
                aria-hidden
                className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent-soft"
              />
              <Emphasised text={item} />
            </li>
          ))}
        </ul>

        <footer className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-panel-line pt-6">
          <div className="flex flex-wrap gap-2">
            {restTags.map((tag) => (
              <span
                key={tag.label}
                className="rounded-full border border-panel-line px-3 py-1.5 text-[12px] text-panel-muted"
              >
                {tag.label}
              </span>
            ))}
          </div>

          {project.links.length > 0 && (
            <div className="relative z-20 flex flex-wrap gap-5 text-[14px] font-medium">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="inline-flex items-center gap-1.5 text-accent-soft hover:underline"
                >
                  {link.label}
                  {link.external && <ArrowUpRight className="size-4" />}
                </a>
              ))}
            </div>
          )}
        </footer>
      </div>
    </article>
  )
}

/** Bullets use ** emphasis, which has to resolve to light ink on a dark card. */
function Emphasised({ text }: { text: string }) {
  return <span className="[&_strong]:text-panel-ink">{emphasise(text)}</span>
}
