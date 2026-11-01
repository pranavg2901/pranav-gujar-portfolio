import { useRef, useState } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Check, Copy, Spinner } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SuccessDialog } from '@/components/ui/SuccessDialog'
import { useContactForm } from '@/hooks/useContactForm'
import { site } from '@/content/site'

export function Contact() {
  return (
    <section id="contact" className="py-14 md:py-28">
      <SectionHeading
        index="05"
        eyebrow="Contact"
        title="Get in touch"
        note="I am seeking a full-time backend engineering or applied AI role and am open to relocation anywhere in India. Email is the quickest way to reach me."
      />

      {/* Details across the top, form beneath — not side by side.
          Four short rows next to a six-field form left one column empty
          whatever width it was given, and the only thing that filled the gap
          was text written to fill a gap. Laid out as a strip, the same way
          the metrics read under the hero, there is no gap to fill. */}
      <Reveal>
        {/* Both rows share one column template. They were different — the
            first weighted to give the email more room — and the dividers
            landed in different places on each row, which read as a broken
            table rather than two groups of facts. Four equal columns, and
            the email still fits on one line. */}
        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          <Row
            label="Email"
            value={site.email}
            href={`mailto:${site.email}`}
            copy={site.email}
          />
          <Row
            label="Phone"
            value={site.phone.display}
            href={`tel:${site.phone.dial}`}
            copy={site.phone.display}
          />
          {site.social.map((link) => (
            <Row
              key={link.href}
              label={link.label}
              // Just the handle. The label already says which site it is, so
              // repeating "github.com/" only costs the width that pushed the
              // handle onto a second line.
              value={link.href.replace(/^https?:\/\/(www\.)?(github|linkedin)\.com\//, '')}
              href={link.href}
              external
              copy={link.href}
            />
          ))}
        </dl>

        {/* The questions an HR screen asks before it reads anything else.
            Left unanswered, each one is assumed — and the assumption is
            always the one that rules a candidate out. */}
        <dl className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          <Row label="Based" value={site.location} />
          <Row label="Relocation" value={site.availability.relocation} />
          <Row label="Notice period" value={site.availability.notice} />
          <Row label="Work mode" value={site.availability.workMode} />
        </dl>
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-14">
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
  copy,
}: {
  label: string
  value: string
  href?: string
  external?: boolean
  /**
   * What the copy control puts on the clipboard. Given explicitly because it
   * is not always the text on screen: the handles are displayed without their
   * domain, but what a reader wants to paste is the whole profile URL.
   */
  copy?: string
}) {
  // A cell in the strip. Label above value, because the values are long
  // enough that a label beside them leaves nothing for them to sit in.
  return (
    <div className="border-b border-line py-5 sm:pr-5 lg:border-r lg:px-6 lg:py-6 lg:first:pl-0 lg:last:border-r-0">
      <dt className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">{label}</dt>
      {/* Centred, not top-aligned. The value's own padding — there to give the
          link a touch-sized target — made its box taller than the icon, so
          aligning to the top left the icon sitting above the text it belongs
          to. */}
      <dd className="mt-2 flex items-center gap-1.5 text-[15px]">
        <span className="min-w-0 break-words">
          {href ? (
            <a
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="-my-2 inline-block py-2 text-accent hover:underline"
            >
              {value}
            </a>
          ) : (
            <span className="text-muted">{value}</span>
          )}
        </span>

        {copy && <CopyButton value={copy} label={label} />}
      </dd>
    </div>
  )
}

/**
 * Copies a detail to the clipboard and says so.
 *
 * The confirmation is the icon itself turning into a tick for a moment,
 * rather than a toast: the feedback belongs where the finger just was, and
 * four of these firing toasts would be noise.
 */
function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Some in-app browsers refuse the async clipboard API. This older path
      // still works in them, and failing silently would leave the visitor
      // believing they had copied something.
      const field = document.createElement('textarea')
      field.value = value
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      try {
        document.execCommand('copy')
      } finally {
        document.body.removeChild(field)
      }
    }

    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      title={copied ? 'Copied' : 'Copy'}
      className="-m-2 shrink-0 cursor-pointer p-2 text-faint transition-colors hover:text-accent"
    >
      {copied ? (
        <Check className="size-4 text-accent" />
      ) : (
        <Copy className="size-4" />
      )}
    </button>
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
        message="Your message has reached my inbox. I will respond shortly."
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
        placeholder="The role, the team, or anything you would like to discuss"
        value={fields.message}
        onChange={(value) => setField('message', value)}
        multiline
      />

      {/* Status on the left, action on the right — the far corner is where
          the eye lands after filling a form down the page. */}
      <div className="mt-2 flex flex-wrap-reverse items-center justify-end gap-x-6 gap-y-4">
        {/* A spinner and a fixed width, not just a word change. Swapping
            "Send message" for "Sending" moved the button's edges and was easy
            to miss, so people pressed it again while the first request was
            still in flight. The button is disabled throughout, but looking
            disabled is the part that stops the second click. */}

        <p aria-live="polite" className="mr-auto font-mono text-[12px] tracking-[0.08em]">
          {busy && <span className="text-muted">Sending your message…</span>}
          {status === 'handoff' && (
            <span className="text-muted">Opening your email client with the message prepared.</span>
          )}
          {status === 'error' && <span className="text-muted">{error}</span>}
        </p>
        <Button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="w-full min-w-[13rem] disabled:cursor-wait disabled:border-line-strong disabled:bg-transparent disabled:text-muted sm:w-auto"
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
