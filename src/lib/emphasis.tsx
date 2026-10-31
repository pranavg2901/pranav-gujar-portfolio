import { Fragment, type ReactNode } from 'react'

/**
 * Content files mark the few words that carry a sentence with **asterisks**.
 * This renders those runs in full-contrast ink and leaves everything else
 * alone. It is not a Markdown parser and should not become one — if a content
 * file ever needs more than emphasis, that content belongs in a case study.
 */
export function emphasise(text: string): ReactNode {
  const parts = text.split('**')

  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  )
}
