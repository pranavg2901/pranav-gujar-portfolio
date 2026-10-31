import { useCallback, useState } from 'react'
import { site } from '@/content/site'

export type FormStatus = 'idle' | 'submitting' | 'sent' | 'handoff' | 'error'

export type ContactFields = {
  name: string
  email: string
  message: string
}

const EMPTY: ContactFields = { name: '', email: '', message: '' }

/** Give up rather than leave the button disabled forever on a hung request. */
const TIMEOUT_MS = 15_000

/**
 * Two paths, one form.
 *
 * With a Web3Forms access key the message posts straight to the inbox and the
 * visitor never leaves the page. Without one, the same values are handed to
 * the visitor's own mail client as a pre-filled draft. The second path is
 * worse, but it always works and never silently swallows a message — which is
 * the usual fate of a static-site form wired to nothing.
 *
 * Note that the key is inlined at build time, so the deployed site only has it
 * if CI passes VITE_WEB3FORMS_KEY to the build. See .github/workflows.
 */
export function useContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const setField = useCallback((key: keyof ContactFields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }))
    setStatus('idle')
  }, [])

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      // Honeypot: a field hidden from people but visible to naive bots. If it
      // has anything in it, accept silently rather than telling the bot why.
      const form = event.currentTarget
      const trap = form.elements.namedItem('botcheck')
      if (trap instanceof HTMLInputElement && trap.checked) {
        setFields(EMPTY)
        setStatus('sent')
        return
      }

      const { accessKey, endpoint } = site.contactForm

      if (!accessKey) {
        const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`)
        const body = encodeURIComponent(`${fields.message}\n\n— ${fields.name} (${fields.email})`)
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
        setStatus('handoff')
        return
      }

      setStatus('submitting')
      setError(null)

      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), TIMEOUT_MS)

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          signal: abort.signal,
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Portfolio enquiry from ${fields.name}`,
            from_name: fields.name,
            email: fields.email,
            message: fields.message,
          }),
        })

        // Web3Forms answers 200 with {"success": false} for a rejected key or
        // a blocked submission. Trusting response.ok alone would report
        // success while the message was discarded — the one failure a contact
        // form must never have.
        const result = (await response.json().catch(() => null)) as {
          success?: boolean
          message?: string
        } | null

        if (!response.ok || result?.success !== true) {
          throw new Error(result?.message ?? `Request failed with ${response.status}`)
        }

        setFields(EMPTY)
        setStatus('sent')
      } catch {
        // Keep whatever they typed — losing a written message to a failed
        // request is the other outcome worth engineering against.
        setError(`Could not send that. Please email me directly at ${site.email}.`)
        setStatus('error')
      } finally {
        clearTimeout(timer)
      }
    },
    [fields],
  )

  return { fields, setField, submit, status, error }
}
