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
        className="bloom absolute -top-64 -right-40 -z-10 size-[620px] rounded-full"
      />

      <Container>
        <div className="pt-16 pb-20 md:pt-24 md:pb-28">
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-11 bg-accent" />
            {intro.kicker}
          </p>

          {/* Three display fragments read as one phrase visually but as noise
              to a screen reader, so the accessible name is supplied once. */}
          <h1 className="mt-7 text-hero font-extrabold uppercase">
            <span className="sr-only">{intro.headlineLabel}</span>
            <span aria-hidden className="block text-ink">
              {intro.headline.lead}
            </span>
            <span aria-hidden className="block">
              <span className="text-accent">{intro.headline.accent}</span>{' '}
              <span className="stroke-type">{intro.headline.outline}</span>
            </span>
          </h1>

          <p className="mt-9 max-w-[54ch] text-[16.5px] leading-[1.75] text-muted md:text-[17.5px]">
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

          <div className="mt-10 flex flex-wrap">
            <ButtonLink href="#work" variant="solid">
              See the work
            </ButtonLink>
            <ButtonLink href={withBase(site.resume.href)} external variant="outline">
              Resume
            </ButtonLink>
          </div>

          <dl className="mt-14 grid gap-x-12 gap-y-4 border-t border-line pt-8 font-mono text-[12.5px] sm:grid-cols-2">
            {intro.stack.map((line) => (
              <div key={line.label} className="flex gap-4">
                <dt className="w-[82px] shrink-0 tracking-wider text-accent uppercase">
                  {line.label}
                </dt>
                <dd className="text-faint">{line.items.join(' / ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </header>
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
