import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { site } from '@/content/site'
import { intro } from '@/content/intro'
import { withBase } from '@/lib/paths'

export function Hero() {
  return (
    <Container>
      <div className="grid items-center gap-10 pt-14 pb-20 lg:grid-cols-[1fr_minmax(290px,37%)] lg:gap-14 lg:pt-20 lg:pb-28">
        {/* Portrait first on mobile, last on desktop — ordered in CSS so the
            markup is written once. */}
        <Portrait className="order-first w-44 sm:w-56 lg:order-last lg:w-full" />

        <div>
          <p className="eyebrow mb-5 uppercase">{intro.eyebrow}</p>

          <h1 className="text-hero font-semibold text-balance text-ink">
            <span className="block">{intro.headline.light}</span>
            <span className="block text-accent">{intro.headline.accent}</span>
          </h1>

          <p className="mt-6 text-[17px] font-medium text-muted">
            {site.role.replace('Software Engineer — ', '')}
            <span className="text-faint"> · {site.location}</span>
          </p>

          <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.7] text-muted md:text-[18.5px]">
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

          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={withBase(site.resume.href)} external variant="solid">
              {site.resume.label}
            </ButtonLink>
            {site.social.map((link) => (
              <ButtonLink key={link.label} href={link.href} external variant="outline">
                {link.label}
              </ButtonLink>
            ))}
          </div>

          <dl className="mt-11 grid gap-x-10 gap-y-2.5 border-t border-line pt-7 text-[13.5px] sm:grid-cols-2">
            {intro.stack.map((line) => (
              <div key={line.label} className="flex gap-3">
                <dt className="w-[74px] shrink-0 font-medium text-ink">{line.label}</dt>
                <dd className="text-faint">{line.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Container>
  )
}

function Portrait({ className }: { className?: string }) {
  const { profileImage } = site

  return (
    <div className={className}>
      <div className="relative">
        {/* An offset clay shape behind the photo, rotated the other way. It is
            what stops the mask reading as a single floating blob. */}
        <div
          aria-hidden
          className="blob absolute inset-0 translate-x-3 translate-y-4 rotate-6 bg-accent-wash"
        />
        <picture>
          <source srcSet={withBase(profileImage.webp)} type="image/webp" />
          <img
            src={withBase(profileImage.jpg)}
            alt={profileImage.alt}
            width={760}
            height={760}
            className="blob relative aspect-square w-full object-cover object-[center_top]"
          />
        </picture>
      </div>
    </div>
  )
}
