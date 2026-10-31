import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { site } from '@/content/site'

type Toast = {
  id: number
  message: string
}

const ToastContext = createContext<((message: string) => void) | null>(null)

const LIFETIME_MS = 3800

/**
 * Small confirmations for actions that otherwise give no feedback — a resume
 * download, or a link opening in a tab the visitor may not notice has opened.
 *
 * Deliberately not a dialog: these acknowledge something minor, so they sit in
 * the corner and leave on their own. The success dialog is reserved for the
 * one action that matters.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(0)

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const toast = useCallback(
    (message: string) => {
      const id = nextId.current++
      setToasts((current) => {
        // Re-clicking the same link should feel like one acknowledgement, not
        // a growing stack of identical notes.
        const withoutDuplicate = current.filter((item) => item.message !== message)
        return [...withoutDuplicate, { id, message }]
      })
      setTimeout(() => dismiss(id), LIFETIME_MS)
    },
    [dismiss],
  )

  const value = useMemo(() => toast, [toast])

  // One delegated listener rather than a handler on every link. The resume,
  // GitHub, LinkedIn and email links each appear in three or four places, and
  // wiring them individually guarantees one gets missed the next time a link
  // is added. Matching on the href keeps the mapping in a single spot and
  // covers links that do not exist yet.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks through untouched — the visitor is managing their
      // own tabs and does not need to be told what they just did.
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.button !== 0) return

      const anchor = (event.target as Element | null)?.closest?.('a')
      if (!(anchor instanceof HTMLAnchorElement)) return

      const href = anchor.getAttribute('href') ?? ''
      if (!href) return

      const { toasts } = site

      if (href.startsWith('mailto:')) return toast(toasts.email)
      if (href.includes('github.com')) return toast(toasts.github)
      if (href.includes('linkedin.com')) return toast(toasts.linkedin)
      if (href.endsWith('.pdf')) return toast(toasts.resume)
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-90 flex flex-col items-center gap-2 p-5 sm:items-end"
      >
        {toasts.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => dismiss(item.id)}
            className="toast-item pointer-events-auto flex max-w-sm items-center gap-3 border border-accent-bright bg-surface px-5 py-3.5 text-left font-mono text-[12px] tracking-[0.06em] text-ink"
          >
            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent-bright" />
            {item.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

/**
 * Returns a function that shows a toast. Safe to call anywhere under the
 * provider; outside it, it is a no-op rather than a crash, so a component
 * rendered in isolation (a test, a future standalone page) still works.
 */
export function useToast() {
  const toast = useContext(ToastContext)
  return useCallback((message: string) => toast?.(message), [toast])
}
