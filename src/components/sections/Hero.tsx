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
              <span aria-hidden className="h-px w-11 bg-accent" />
              {intro.kicker}
            </p>

            {/* Three display fragments read as one phrase visually but as noise
                to a screen reader, so the accessible name is supplied once. */}
            <h1 className="mt-6 text-hero font-extrabold uppercase">
              <span className="sr-only">{intro.headlineLabel}</span>
              <span aria-hidden className="block text-ink">
                {intro.headline.lead}
              </span>
              <span aria-hidden className="block text-accent">
                {intro.headline.accent}
              </span>
            </h1>

            <p className="mt-7 max-w-[52ch] text-[16px] leading-[1.7] text-muted md:mt-9 md:text-[17.5px]">
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

            <div className="mt-8 flex flex-wrap md:mt-10">
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

        <dl className="grid gap-x-12 gap-y-3 border-t border-line py-8 font-mono text-[12.5px] sm:grid-cols-2">
          {intro.stack.map((line) => (
            <div key={line.label} className="flex gap-4">
              <dt className="w-[82px] shrink-0 tracking-wider text-accent uppercase">
                {line.label}
              </dt>
              <dd className="text-faint">{line.items.join(' / ')}</dd>
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
            className="relative aspect-square w-full object-cover object-[center_top] grayscale transition-all duration-500 hover:grayscale-0"
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

  return (
    <div className="overflow-hidden border-y border-line py-5">
      <ul className="marquee-track flex w-max items-center">
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
