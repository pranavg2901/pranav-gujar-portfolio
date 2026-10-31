import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/content/site'
import { intro } from '@/content/intro'
import { withBase } from '@/lib/paths'

export function Hero() {
  return (
    <Container>
      <div className="grid gap-8 pt-12 pb-16 md:grid-cols-[1fr_216px] md:gap-16 md:pt-20 md:pb-18">
        {/* The photo sits first on mobile and last on desktop — one line of CSS
            rather than rendering the markup twice. */}
        <Portrait className="order-first w-28 md:order-last md:w-full" />

        <div>
          <h1 className="text-[31px] font-semibold tracking-[-0.03em] text-ink md:text-display">
            {site.name}
          </h1>
          <p className="mt-2.5 text-[19px] font-medium tracking-[-0.01em] text-accent">
            {site.role}
          </p>
          <p className="mt-1.5 text-sm text-faint">{site.location}</p>

          <p className="mt-6 max-w-[62ch] text-[16px] leading-[1.65] text-muted md:text-[17.5px]">
            {intro.paragraph.map((part, index) =>
              part.strong ? (
                <strong key={index} className="font-medium text-ink">
                  {part.text}
                </strong>
              ) : (
                part.text
              ),
            )}
          </p>

          <dl className="mt-7 flex flex-col gap-1.5 text-[13.5px]">
            {intro.stack.map((line) => (
              <div key={line.label} className="flex flex-wrap gap-x-3 gap-y-1">
                <dt className="w-[72px] shrink-0 font-medium text-muted">{line.label}</dt>
                <dd className="text-faint">{line.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2.5">
            <ButtonLink href={withBase(site.resume.href)} external variant="solid">
              {site.resume.label}
            </ButtonLink>
            {site.social.map((link) => (
              <ButtonLink key={link.label} href={link.href} external variant="outline">
                {link.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

function Portrait({ className }: { className?: string }) {
  const { profileImage } = site

  return (
    <picture className={className}>
      <source srcSet={withBase(profileImage.webp)} type="image/webp" />
      <img
        src={withBase(profileImage.jpg)}
        alt={profileImage.alt}
        width={760}
        height={760}
        className="aspect-square w-full rounded-[14px] border border-line object-cover object-[center_top]"
      />
    </picture>
  )
}
