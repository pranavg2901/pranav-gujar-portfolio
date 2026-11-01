import { Moon, Sun } from '@/components/ui/Icon'
import { useTheme } from '@/hooks/useTheme'

/**
 * Renders the same markup in both themes, and lets CSS choose which icon is
 * visible.
 *
 * It used to pick the icon in JavaScript, from state read off the document.
 * The build renders these pages on a machine with no DOM, so the server
 * always produced the light-mode icon — and any visitor with dark saved got
 * a different first render on the client. React treated that as a corrupted
 * tree, threw a hydration error, discarded the entire page and drew it again
 * from scratch. The page looked correct afterwards, which is what made it
 * easy to miss: the only visible symptoms were a console error and the whole
 * document being rebuilt on every visit.
 *
 * The `dark` class is on <html> before React runs — the inline script in
 * index.html puts it there — so the CSS is already correct at first paint
 * and the markup no longer has to be.
 *
 * The label is fixed for the same reason: "Switch to dark theme" and "Switch
 * to light theme" are different strings, and that difference was part of the
 * same mismatch.
 */
export function ThemeToggle() {
  const { toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark theme"
      title="Switch theme"
      className="grid h-11 w-11 shrink-0 place-items-center border border-line-strong text-muted transition-colors hover:border-accent-bright hover:text-accent"
    >
      <Moon className="size-4 dark:hidden" />
      <Sun className="hidden size-4 dark:block" />
    </button>
  )
}
