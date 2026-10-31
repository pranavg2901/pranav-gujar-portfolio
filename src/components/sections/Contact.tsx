import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { useContactForm } from '@/hooks/useContactForm'
import { site } from '@/content/site'

export function Contact() {
  return (
    <section id="contact" className="border-t border-line pt-16 md:pt-20">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            note="Open to backend engineering and applied AI roles, and happy to talk about anything in the projects above."
          />

          <ul className="flex flex-col gap-2.5 text-[15px]">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-accent hover:underline"
              >
                {site.email}
              </a>
            </li>
            {site.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent hover:underline"
                >
                  {link.href.replace(/^https?:\/\//, '')}
                </a>
              </li>
            ))}
            <li className="text-faint">{site.location}</li>
          </ul>
        </div>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}

function ContactForm() {
  const { fields, setField, submit, status, error } = useContactForm()
  const busy = status === 'submitting'

  return (
    <form onSubmit={submit} className="flex flex-col gap-3.5">
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

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={busy} className="disabled:opacity-60">
          {busy ? 'Sending…' : 'Send message'}
        </Button>

        <p aria-live="polite" className="text-[13.5px]">
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
      'rounded-lg border border-line bg-raised px-3 py-2.5 text-[14.5px] text-ink placeholder:text-faint/70 focus:border-accent focus:outline-none',
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[12.5px] text-faint">
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} className={`${shared.className} min-h-22 resize-y`} />
      ) : (
        <input {...shared} type={type} autoComplete={type === 'email' ? 'email' : 'name'} />
      )}
    </div>
  )
}
