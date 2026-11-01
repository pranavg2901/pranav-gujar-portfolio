import { Link } from 'react-router-dom'
import { ArrowUpRight } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Tag } from '@/components/ui/Tag'
import { projects, projectYears } from '@/content/projects'
import { emphasise } from '@/lib/emphasis'
import { withBase } from '@/lib/paths'
import type { Project } from '@/types/content'

export function Work() {
  return (
    <section id="work" className="py-20 md:py-28">
      <SectionHeading
        index="01"
        eyebrow="Selected work"
        title="Projects"
        note="Three systems I built and run. In each one, the hard part was a limit to work within, not a feature to add."
      />

      <div>
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectCard project={project} index={index + 1} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/**
 * The whole card is the case-study link via a stretched overlay, which keeps
 * the outbound links clickable — nesting them inside a wrapping anchor would
 * be invalid markup.
 *
 * When a project gains an `image` it becomes the card background behind a
 * scrim, and nothing else about the card changes.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const emphasisTag = project.tags.find((tag) => tag.emphasis)
  const restTags = project.tags.filter((tag) => !tag.emphasis)

  return (
    <article className="group relative isolate -mx-5 border-t border-line px-5 last:border-b sm:-mx-8 sm:px-8">
      {/* Hover feedback is this 2px rule drawing itself across the top of the
          card, not a tint behind the whole thing. Repainting a full-width
          block on hover is a lot of movement for "this is a link", and it
          washed the copy out; a line that travels is quieter and points at
          the card you are on. */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 h-0.5 w-0 bg-accent-bright transition-[width] duration-500 ease-out group-hover:w-full"
      />

      {project.study && (
        <Link
          to={`/projects/${project.slug}`}
          aria-label={`${project.name} case study`}
          className="absolute inset-0 z-10"
        />
      )}

      <div className="py-10 lg:py-14">
        {/* The screenshot is shown, not used as wallpaper. Behind the text at
            low opacity it muddied the copy and told the reader nothing; as a
            framed panel it is the first thing they actually look at. */}
        {project.image && (
          <div className="relative mb-10">
            <span
              aria-hidden
              className="absolute -top-2 -left-2 z-10 h-14 w-14 border-t-2 border-l-2 border-accent-bright"
            />
            <span
              aria-hidden
              className="absolute -right-2 -bottom-2 z-10 h-14 w-14 border-r-2 border-b-2 border-accent-bright"
            />
            <img
              src={withBase(project.image.src)}
              alt={project.image.alt}
              loading="lazy"
              width={1400}
              height={614}
              className="aspect-16/7 w-full border border-line object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
            />
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-6">
            <span className="font-mono text-[11.5px] tracking-[0.16em] text-faint">
              {String(index).padStart(2, '0')} / {projectYears(project)}
            </span>
            {project.study && (
              <ArrowUpRight className="size-6 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent lg:hidden" />
            )}
          </div>

          {emphasisTag && (
            <p className="mt-7 font-mono text-[11.5px] font-semibold tracking-[0.14em] text-accent uppercase">
              {emphasisTag.label}
            </p>
          )}

          <h3 className="mt-3 text-[clamp(2rem,4.4vw,3.25rem)] leading-[0.95] font-extrabold tracking-[-0.045em] text-ink uppercase">
            {project.name}
          </h3>

          <p className="mt-5 max-w-[44ch] text-[15.5px] leading-relaxed text-muted">
            {project.summary}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {restTags.map((tag) => (
              <Tag key={tag.label} label={tag.label} />
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-5 hidden justify-end lg:flex">
            {project.study && (
              <ArrowUpRight className="size-7 text-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
            )}
          </div>

          <ul className="flex flex-col gap-4">
            {project.highlights.map((item) => (
              <li
                key={item}
                className="border-l border-line pl-5 text-[14.5px] leading-relaxed text-muted transition-colors duration-300 group-hover:border-accent-bright/40"
              >
                <span className="[&_strong]:text-ink">{emphasise(item)}</span>
              </li>
            ))}
          </ul>

        </div>
        </div>
      </div>
    </article>
  )
}
