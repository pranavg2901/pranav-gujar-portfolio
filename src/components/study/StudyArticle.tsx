import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/ui/Icon'
import { Container } from '@/components/ui/Container'
import { Tag } from '@/components/ui/Tag'
import { Reveal } from '@/components/ui/Reveal'
import { withBase } from '@/lib/paths'
import type { CaseStudy, Link as ContentLink, ProjectTag } from '@/types/content'

type StudyArticleProps = {
  /** Where the back link goes, and what it says. */
  back: { to: string; label: string }
  /** The small line above the title: "Case study / 2026", "Product / Blueport". */
  eyebrow: string
  title: string
  /**
   * The name spelled out, set small under the title. It stays inside the
   * <h1> so the heading a crawler and a screen reader read is still the
   * whole name, while the page is not dominated by it.
   */
  subtitle?: string
  tags?: ProjectTag[]
  /**
   * Outbound links — a live site, a store listing. These appear on this page
   * and nowhere else: the home page sends a reader inward, to the write-up,
   * rather than off to a demo before they have read a word about it.
   */
  links?: ContentLink[]
  study: CaseStudy
  image?: { src: string; alt: string }
  /** The pointer at the foot of the page, so a reader is never left at a dead end. */
  next?: { to: string; label: string; name: string }
}

/**
 * The long-form page body, shared by project case studies and by the
 * employer-product pages. They are the same article with different labels on
 * it, and keeping one implementation means a fix to the layout cannot land on
 * one kind of page and miss the other.
 */
export function StudyArticle({
  back,
  eyebrow,
  title,
  subtitle,
  tags,
  links,
  study,
  image,
  next,
}: StudyArticleProps) {
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
              to={back.to}
              className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-[12px] tracking-[0.14em] text-muted uppercase transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-4" />
              {back.label}
            </Link>

            <p className="eyebrow mt-10 flex items-center gap-4">
              <span aria-hidden className="h-px w-6 bg-accent sm:w-11" />
              {eyebrow}
            </p>

            <h1 className="mt-6 text-hero font-extrabold text-ink uppercase">
              {title}
              {subtitle && (
                <span className="mt-4 block font-mono text-[clamp(0.8rem,1.5vw,1rem)] font-medium tracking-[0.18em] text-faint">
                  {subtitle}
                </span>
              )}
            </h1>

            <p className="mt-7 max-w-[56ch] text-[18px] leading-[1.65] text-muted">
              {study.premise}
            </p>

            {tags && tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag.label} label={tag.label} emphasis={tag.emphasis} />
                ))}
              </div>
            )}

            {links && links.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-7">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                    className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-[12.5px] font-semibold tracking-[0.12em] text-accent uppercase hover:underline"
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
            {study.sections.map((section, index) => (
              <Reveal key={section.heading} delay={index === 0 ? 0 : 40}>
                <section className="mb-14">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-faint">
                    {String(index + 1).padStart(2, '0')}
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
                  <p key={paragraph.slice(0, 40)} className="mt-4 text-[16px] leading-[1.8] text-muted">
                    {paragraph}
                  </p>
                ))}
              </section>
            )}
          </div>

          {/* Not shown on a phone.
          
              Stacked below the article it became a second reading of the same
              material: the stack, the period and the role are all stated in
              the prose above it, and on a narrow screen a reader meets them
              twice, the second time as a list of labels with no context.
              Beside the text on a wide screen it is a reference panel the eye
              checks; underneath it is just repetition.

              Deliberately not sticky either. The lists run six to eight rows
              and most values wrap to two lines in this column — about 750px,
              taller than a laptop viewport. A sticky element taller than the
              space it sticks in has its bottom rows pinned off-screen for
              good, so the last facts could never be read. */}
          <aside className="hidden lg:block lg:self-start">
            {image && (
              <img
                src={withBase(image.src)}
                alt={image.alt}
                loading="lazy"
                className="mb-8 w-full border border-line object-cover"
              />
            )}
            <dl className="flex flex-col border-t border-line">
              {study.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-4">
                  <dt className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {next && (
          <Link
            to={next.to}
            className="group flex items-center justify-between gap-6 border-t border-line py-12"
          >
            <div>
              <p className="font-mono text-[11px] tracking-[0.18em] text-faint uppercase">
                {next.label}
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
