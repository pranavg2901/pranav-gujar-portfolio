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
