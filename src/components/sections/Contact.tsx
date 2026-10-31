import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useContactForm } from '@/hooks/useContactForm'
import { site } from '@/content/site'

export function Contact() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title="Get in touch"
        note="Open to backend engineering and applied AI roles, and happy to talk about anything in the projects above."
      />

      <div className="grid gap-12 border-t border-line pt-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <dl className="flex flex-col">
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
            <Row label="Location" value={site.location} />
          </dl>
        </Reveal>

        <Reveal delay={60}>
          <ContactForm />
        </Reveal>
      </div>
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
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-line py-5">
      <dt className="w-24 shrink-0 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
        {label}
      </dt>
      <dd className="text-[16px]">
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
  const { fields, setField, submit, status, error } = useContactForm()
  const busy = status === 'submitting'

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
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
        <Button type="submit" disabled={busy} className="disabled:opacity-60">
          {busy ? 'Sending' : 'Send message'}
        </Button>

        <p aria-live="polite" className="font-mono text-[12px] tracking-[0.08em]">
          {status === 'sent' && <span className="text-accent">Sent — I will reply shortly.</span>}
          {status === 'handoff' && (
            <span className="text-muted">Opening your email app with the message ready.</span>
          )}
          {status === 'error' && <span className="text-muted">{error}</span>}
        </p>
      </div>
    </form>
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
