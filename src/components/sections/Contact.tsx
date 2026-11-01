import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Spinner } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SuccessDialog } from '@/components/ui/SuccessDialog'
import { useContactForm } from '@/hooks/useContactForm'
import { site } from '@/content/site'

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title="Get in touch"
        note="I am looking for a full-time backend or applied AI role, and I am open to relocating anywhere in India. Email is the fastest way to reach me."
      />

      {/* Details across the top, form beneath — not side by side.
          Four short rows next to a six-field form left one column empty
          whatever width it was given, and the only thing that filled the gap
          was text written to fill a gap. Laid out as a strip, the same way
          the metrics read under the hero, there is no gap to fill. */}
      <Reveal>
        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          <Row label="Email" value={site.email} href={`mailto:${site.email}`} />
          {site.social.map((link) => (
            <Row
              key={link.href}
              label={link.label}
              value={link.href.replace(/^https?:\/\//, '')}
              href={link.href}
              external
            />
          ))}
          {/* Two cells, not one. "Pune, India" on its own answers where I am
              and leaves the question an HR screen actually filters on
              unanswered. */}
          <Row label="Based" value={site.location} />
          <Row label="Relocation" value="Anywhere in India" />
        </dl>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-14 max-w-[44rem]">
          <ContactForm />
        </div>
      </Reveal>
    </section>
  )
}

function Row({
  label,
  value,
  href,
  external = false,
}: {
  label: string
  value: string
  href?: string
  external?: boolean
}) {
  // A cell in the strip. Label above value, because the values are long
  // enough that a label beside them leaves nothing for them to sit in.
  return (
    <div className="border-b border-line py-5 sm:pr-5 lg:border-r lg:px-6 lg:py-6 lg:first:pl-0 lg:last:border-r-0">
      <dt className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{label}</dt>
      <dd className="mt-2 text-[15px] break-words">
        {href ? (
          <a
            href={href}
            {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            className="text-accent hover:underline"
          >
            {value}
          </a>
        ) : (
          <span className="text-muted">{value}</span>
        )}
      </dd>
    </div>
  )
}

function ContactForm() {
  const { fields, setField, submit, reset, status, error } = useContactForm()
  const busy = status === 'submitting'

  return (
    <>
      <SuccessDialog
        open={status === 'sent'}
        onClose={reset}
        title="Message sent"
        message="Thanks for writing. It is in my inbox and I will reply soon."
        action="Back to the site"
      />

    <form onSubmit={submit} className="flex flex-col gap-5">
      {/* Honeypot. Hidden from people and from assistive tech, but a naive
          bot fills every field it finds. Checked in useContactForm. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="sr-only"
      />

      <Field
        id="contact-name"
        label="Name"
        placeholder="Your name"
        value={fields.name}
        onChange={(value) => setField('name', value)}
      />
      <Field
        id="contact-email"
        label="Email"
        type="email"
        placeholder="you@company.com"
        value={fields.email}
        onChange={(value) => setField('email', value)}
      />
      <Field
        id="contact-message"
        label="Message"
        placeholder="What would you like to talk about?"
        value={fields.message}
        onChange={(value) => setField('message', value)}
        multiline
      />

      <div className="flex flex-wrap items-center gap-5">
        {/* A spinner and a fixed width, not just a word change. Swapping
            "Send message" for "Sending" moved the button's edges and was easy
            to miss, so people pressed it again while the first request was
            still in flight. The button is disabled throughout, but looking
            disabled is the part that stops the second click. */}
        <Button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="min-w-[13rem] disabled:cursor-wait disabled:border-line-strong disabled:bg-transparent disabled:text-muted"
        >
          {busy ? (
            <>
              <Spinner className="size-4" />
              Sending…
            </>
          ) : (
            'Send message'
          )}
        </Button>

        <p aria-live="polite" className="font-mono text-[12px] tracking-[0.08em]">
          {busy && <span className="text-muted">Sending your message…</span>}
          {status === 'handoff' && (
            <span className="text-muted">Opening your email app with the message ready.</span>
          )}
          {status === 'error' && <span className="text-muted">{error}</span>}
        </p>
      </div>
    </form>
    </>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: string
  multiline?: boolean
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  multiline = false,
}: FieldProps) {
  const shared = {
    id,
    name: id,
    required: true,
    value,
    placeholder,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    className:
      'border border-line bg-transparent px-4 py-3.5 text-[15px] text-ink placeholder:text-faint/60 focus:border-accent-bright focus:outline-none',
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} className={`${shared.className} min-h-28 resize-y`} />
      ) : (
        <input {...shared} type={type} autoComplete={type === 'email' ? 'email' : 'name'} />
      )}
    </div>
  )
}
