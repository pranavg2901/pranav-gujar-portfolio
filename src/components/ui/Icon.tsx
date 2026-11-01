import type { SVGProps } from 'react'

/**
 * The seven icons this site uses, drawn here rather than pulled from an icon
 * package. The nearest library costs 47MB on disk to deliver these seven
 * shapes; they are ten lines of path data.
 *
 * All of them share a 24x24 box and a 1.75 stroke, which is what keeps them
 * looking like one set.
 */
function Glyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    />
  )
}

export function ArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Glyph>
  )
}

export function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M20 12H5M11 6l-6 6 6 6" />
    </Glyph>
  )
}

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Glyph>
  )
}

export function Menu(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Glyph>
  )
}

export function Close(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Glyph>
  )
}

export function Sun(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Glyph>
  )
}

export function Moon(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.6 6.6 0 0 0 10.5 10.5Z" />
    </Glyph>
  )
}

/**
 * The only moving icon. Shown while the contact form is submitting — a label
 * change alone was too quiet, and people clicked Send a second time.
 *
 * The faint full ring keeps the shape stable while the bright quarter turns,
 * so it reads as one object spinning rather than a flickering arc.
 */
export function Spinner({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <Glyph
      className={`animate-spin motion-reduce:animate-none${className ? ` ${className}` : ''}`}
      strokeWidth={2.5}
      {...props}
    >
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <path d="M12 3a9 9 0 0 1 9 9" />
    </Glyph>
  )
}

/** Two offset sheets. Used on the contact details, beside anything copyable. */
export function Copy(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4H5.5A1.5 1.5 0 0 0 4 5.5v8A1.5 1.5 0 0 0 5.5 15" />
    </Glyph>
  )
}

/** Confirms a copy. Shown in place of the Copy glyph for a moment after. */
export function Check(props: SVGProps<SVGSVGElement>) {
  return (
    <Glyph {...props}>
      <path d="M5 12.5 10 17.5 19 7" />
    </Glyph>
  )
}
