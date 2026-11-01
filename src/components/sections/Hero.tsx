import { useEffect, useRef, useState } from 'react'
import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/content/site'
import { intro } from '@/content/intro'
import { withBase } from '@/lib/paths'

export function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      <div aria-hidden className="grid-field absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="bloom absolute -top-40 -right-28 -z-10 size-[340px] rounded-full sm:-top-64 sm:-right-40 sm:size-[620px]"
      />

      <Container>
        <div className="grid items-center gap-14 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-[1fr_300px] lg:gap-16">
          <div>
            <p className="eyebrow flex items-center gap-4">
              <span aria-hidden className="h-px w-6 bg-accent sm:w-11" />
              {intro.kicker}
            </p>

            {/* Two display fragments read as one name visually but as noise to
                a screen reader, so the accessible name is supplied once. */}
            <h1 className="mt-6 text-hero font-extrabold uppercase">
              <span className="sr-only">{intro.headlineLabel}</span>
              <span aria-hidden className="block text-ink">
                {intro.headline.lead}
              </span>
              <span aria-hidden className="block text-accent">
                {intro.headline.accent}
              </span>
            </h1>

            {/* The job title, at a fraction of the name's size. */}
            <p className="mt-5 font-mono text-[13px] font-medium tracking-[0.14em] text-muted uppercase md:text-[14.5px]">
              {intro.role}
            </p>

            <p className="mt-8 max-w-[52ch] text-[16px] leading-[1.7] text-muted md:mt-9 md:text-[17.5px]">
              {intro.paragraph.map((part, index) =>
                part.strong ? (
                  <strong key={index} className="font-semibold text-ink">
                    {part.text}
                  </strong>
                ) : (
                  part.text
                ),
              )}
            </p>

            {/* A shared minimum width, so the pair reads as one control
                rather than two buttons that happen to sit together. Without
                it each is as wide as its own label, and "Resume" came out
                noticeably smaller than "See the work". */}
            {/* A two-column grid rather than a flex row, so both buttons are
                exactly the same width. Sized to their own labels, "Resume"
                came out visibly smaller than "See the work" and the pair read
                as two unrelated controls. */}
            <div className="mt-8 grid w-full max-w-[25rem] grid-cols-2 md:mt-10">
              <ButtonLink href="#work" variant="solid">
                See the work
              </ButtonLink>
              <ButtonLink href={withBase(site.resume.href)} external variant="outline">
                Resume
              </ButtonLink>
            </div>
          </div>

          {/* Shown from lg up only. The About block carries the same portrait
              below that, so exactly one photo is on screen at any width. */}
          <Portrait className="hidden lg:block" />
        </div>

        {/* Not shown on a phone. The marquee immediately beneath it names the
            same technologies, and the Skills section lists all of them
            grouped — so at that width this was a third copy, costing roughly
            300px of scrolling before the first project.

            From 640px up the two columns sit beside the portrait and cost
            nothing, so it stays. */}
        <dl className="hidden gap-x-12 gap-y-5 border-t border-line py-8 font-mono text-[12.5px] sm:grid sm:grid-cols-2 sm:gap-y-3">
          {intro.stack.map((line) => (
            <div key={line.label} className="flex flex-col gap-1.5 sm:flex-row sm:gap-4">
              <dt className="tracking-wider text-accent uppercase sm:w-[82px] sm:shrink-0">
                {line.label}
              </dt>
              <dd className="leading-relaxed text-faint">{line.items.join(' / ')}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </header>
  )
}

/**
 * Framed rather than cropped to a shape: a lime rule on two sides and a hard
 * offset square behind it, so the photo reads as part of the blueprint grid
 * instead of a sticker dropped on top of it.
 */
function Portrait({ className }: { className?: string }) {
  const { profileImage } = site

  return (
    <div className={className}>
      <div className="relative">
        <span
          aria-hidden
          className="absolute -top-3 -left-3 h-24 w-24 border-t-2 border-l-2 border-accent-bright"
        />
        <span
          aria-hidden
          className="absolute -right-3 -bottom-3 h-24 w-24 border-r-2 border-b-2 border-accent-bright"
        />
        <picture>
          <source srcSet={withBase(profileImage.webp)} type="image/webp" />
          <img
            src={withBase(profileImage.jpg)}
            alt={profileImage.alt}
            width={760}
            height={760}
            className="relative aspect-4/5 w-full object-cover object-[center_top] grayscale transition-all duration-500 hover:grayscale-0"
          />
        </picture>
      </div>
    </div>
  )
}

/**
 * The scrolling tech strip. The list is rendered twice and the track travels
 * exactly half its width, so the loop has no visible seam.
 */
export function Marquee() {
  const items = [...intro.marquee, ...intro.marquee]
  const strip = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  // Pause it once it has scrolled away.
  //
  // A transform animation never stops asking the compositor for frames, and
  // this one sits at the top of a page that is several screens long — so it
  // ran the whole time a reader was down in the case studies, for something
  // nobody could see. It was enough to make screenshots of the live page time
  // out; on a phone it is battery.
  useEffect(() => {
    const element = strip.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: '120px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={strip} className="overflow-hidden border-y border-line py-6">
      <ul
        className="marquee-track flex w-max items-center"
        style={{ animationPlayState: visible ? 'running' : 'paused' }}
      >
        {items.map((item, index) => (
          <li
            key={`${item}-${index}`}
            aria-hidden={index >= intro.marquee.length}
            className="flex items-center font-mono text-[13px] tracking-[0.14em] text-faint uppercase"
          >
            <span className="px-7">{item}</span>
            <span className="size-1 rounded-full bg-accent-bright/50" />
          </li>
        ))}
      </ul>
    </div>
  )
}
