import { useCallback, useRef, useState } from 'react'
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
 * A request that answers in 120ms would otherwise flash the spinner and look
 * like a glitch. Holding the sending state briefly makes the submit read as a
 * step that happened rather than a flicker.
 */
const MIN_VISIBLE_MS = 550

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
/** Holds the sending state until it has been on screen long enough to read. */
function settle(startedAt: number): Promise<void> {
  const remaining = MIN_VISIBLE_MS - (Date.now() - startedAt)
  return remaining > 0 ? new Promise((resolve) => setTimeout(resolve, remaining)) : Promise.resolve()
}

export function useContactForm() {
  const [fields, setFields] = useState<ContactFields>(EMPTY)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  // The button is disabled while a request is open, but a double-tap can fire
  // both clicks before React re-renders. This is the guard that actually
  // stops a second message being sent.
  const inFlight = useRef(false)

  const setField = useCallback((key: keyof ContactFields, value: string) => {
    setFields((previous) => ({ ...previous, [key]: value }))
    setStatus('idle')
  }, [])

  const submit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (inFlight.current) return

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

      inFlight.current = true
      setStatus('submitting')
      setError(null)

      const startedAt = Date.now()
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

        await settle(startedAt)
        setFields(EMPTY)
        setStatus('sent')
      } catch {
        // Keep whatever they typed — losing a written message to a failed
        // request is the other outcome worth engineering against.
        await settle(startedAt)
        setError(`Could not send that. Please email me directly at ${site.email}.`)
        setStatus('error')
      } finally {
        clearTimeout(timer)
        inFlight.current = false
      }
    },
    [fields],
  )

  /** Dismisses the confirmation and returns the form to its resting state. */
  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
  }, [])

  return { fields, setField, submit, reset, status, error }
}
