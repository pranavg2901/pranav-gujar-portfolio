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
            {/* Two display fragments read as one name visually but as noise to
                a screen reader, so the accessible name is supplied once. */}
            {/* Two lines at every width.
            
                One line on a phone was tried and reverted: fitting both words
                across 350px caps the type at around 40px, which is not a
                display size — the name ended up smaller than the paragraph
                beneath it was long. Stacked, each word can run to 76px.

                That figure is measured rather than guessed. "Pranav" is
                4.035em wide in this face at this tracking, so the size is set
                in vw to hold the longer word at about 88% of the column,
                from 320px upwards. An earlier version was tuned to fill the
                column exactly, which measured as "no overflow" and looked
                like the name running off the edge of the phone.

                Every override is scoped to max-sm. From 640px up this is
                plain `text-hero` and nothing else, exactly as it was before
                any of the mobile work — that token carries its own
                line-height of 0.88 and letter-spacing of -0.055em, and an
                earlier attempt at this reset both to `inherit` at the
                breakpoint, which quietly loosened the desktop headline. */}
            <h1 className="text-[clamp(2.6rem,19.5vw,5rem)] font-extrabold uppercase max-sm:leading-[0.92] max-sm:tracking-[-0.045em] sm:text-hero">
              <span className="sr-only">{intro.headlineLabel}</span>
              <span aria-hidden className="block text-ink">
                {intro.headline.lead}
              </span>
              <span aria-hidden className="block text-accent">
                {intro.headline.accent}
              </span>
            </h1>

            {/* The job title, at a fraction of the name's size. */}
            <p className="mt-5 font-mono text-[11.5px] font-medium tracking-[0.1em] text-muted uppercase sm:text-[13px] sm:tracking-[0.14em] md:text-[14.5px]">
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
