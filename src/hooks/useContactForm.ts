import { useCallback, useState } from 'react'
import { site } from '@/content/site'

export type FormStatus = 'idle' | 'submitting' | 'sent' | 'handoff' | 'error'

export type ContactFields = {
  name: string
  email: string
  message: string
}

const EMPTY: ContactFields = { name: '', email: '', message: '' }

/**
 * Two paths, one form.
 *
 * With a Web3Forms access key the message posts straight to the inbox and the
 * visitor never leaves the page. Without one, the same values are handed to the
 * visitor's own mail client as a pre-filled draft. The second path is worse,
 * but it always works and it never silently swallows a message — which is the
 * usual fate of a static-site contact form wired to nothing.
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

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `Portfolio enquiry from ${fields.name}`,
            from_name: fields.name,
            email: fields.email,
            message: fields.message,
          }),
        })

        if (!response.ok) throw new Error(`Request failed with ${response.status}`)

        setFields(EMPTY)
        setStatus('sent')
      } catch {
        // Keep whatever they typed — losing a written message to a failed
        // request is the one outcome worth engineering against.
        setError(`Could not send that. Email me directly at ${site.email}.`)
        setStatus('error')
      }
    },
    [fields],
  )

  return { fields, setField, submit, status, error }
}
