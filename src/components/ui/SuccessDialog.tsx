import { useEffect, useRef, useState } from 'react'

type SuccessDialogProps = {
  open: boolean
  onClose: () => void
  title: string
  message: string
  /** Label for the dismiss button. */
  action?: string
  /** Milliseconds before it closes itself. Set to 0 to require a dismissal. */
  autoCloseMs?: number
}

/**
 * The confirmation shown after a message is sent.
 *
 * A line of text under the button was easy to miss — the visitor has just
 * done the one thing the page exists for, and it deserves to be acknowledged
 * properly. The check mark draws itself: the ring sweeps, then the tick, so
 * the eye follows the motion to the words rather than arriving before them.
 *
 * It closes itself after a few seconds so nobody is forced to dismiss it. The
 * countdown pauses on keyboard focus but deliberately NOT on hover: the send
 * button sits roughly where the dialog appears, so the pointer is usually
 * resting on the panel without the visitor reading anything, and pausing on
 * that meant it frequently never closed at all.
 */
export function SuccessDialog({
  open,
  onClose,
  title,
  message,
  action = 'Close',
  autoCloseMs = 6000,
}: SuccessDialogProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)

    // Move focus into the dialog so a keyboard user is not left behind on the
    // form, and lock the page behind it.
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = overflow
    }
  }, [open, onClose])

  // Separate from the effect above so pausing restarts only the timer, and
  // does not tear down the key listener or re-steal focus mid-read.
  useEffect(() => {
    if (!open || paused || autoCloseMs <= 0) return
    const timer = setTimeout(onClose, autoCloseMs)
    return () => clearTimeout(timer)
  }, [open, paused, autoCloseMs, onClose])

  if (!open) return null

  return (
    <div
      className="dialog-backdrop fixed inset-0 z-100 grid place-items-center bg-black/75 p-5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-message"
        // Stop a click inside the panel from reaching the backdrop handler.
        onClick={(event) => event.stopPropagation()}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="dialog-panel relative w-full max-w-md overflow-hidden border border-accent-bright bg-surface p-9 text-center"
      >
        <SuccessMark />

        <h2
          id="success-title"
          className="mt-7 text-[clamp(1.6rem,4vw,2.1rem)] leading-none font-extrabold tracking-[-0.035em] text-ink uppercase"
        >
          {title}
        </h2>

        <p id="success-message" className="mt-4 text-[15.5px] leading-relaxed text-muted">
          {message}
        </p>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="mt-8 w-full border border-accent-bright bg-accent-bright px-7 py-4 font-mono text-[12.5px] font-semibold tracking-[0.1em] text-on-accent uppercase transition-colors hover:bg-transparent hover:text-accent"
        >
          {action}
        </button>

        {/* Shows the remaining time, so self-closing reads as intended rather
            than as the dialog glitching away. Freezes with the timer. */}
        {autoCloseMs > 0 && (
          <span
            aria-hidden
            className="dialog-timer absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent-bright"
            style={{
              animationDuration: `${autoCloseMs}ms`,
              animationPlayState: paused ? 'paused' : 'running',
            }}
          />
        )}
      </div>
    </div>
  )
}

/** Ring sweeps first, then the tick draws. Both are pure stroke animations. */
function SuccessMark() {
  return (
    <svg viewBox="0 0 80 80" className="mx-auto size-20" fill="none" aria-hidden>
      <circle cx="40" cy="40" r="34" stroke="var(--line)" strokeWidth="3" />
      <circle
        className="mark-ring"
        cx="40"
        cy="40"
        r="34"
        stroke="var(--accent-bright)"
        strokeWidth="3"
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
      />
      <path
        className="mark-tick"
        d="M25 41.5 L35.5 52 L55 31"
        stroke="var(--accent-bright)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
