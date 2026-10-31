/** Shapes for everything under src/content. Edit the data there, not here. */

export type Link = {
  label: string
  href: string
  /** Leaves the site — renders an external-link marker and rel="noreferrer". */
  external?: boolean
}

export type Metric = {
  value: string
  caption: string
}

export type SkillGroup = {
  label: string
  items: string[]
}

export type Role = {
  company: string
  title: string
  location: string
  /** Free text so "Present" stays readable: "Aug 2025 — Present". */
  period: string
  highlights: string[]
  /**
   * The employer's product this role was spent on. Shown inside the
   * experience entry, never as a project card — the company owns it.
   */
  product?: {
    name: string
    /** One line on what it does, so the name is not left unexplained. */
    description: string
    href?: string
    image?: { src: string; alt: string }
  }
}

export type Credential = {
  title: string
  issuer: string
  period: string
  note?: string
}

export type ProjectTag = {
  label: string
  /** One tag per project may be emphasised — the thing that makes it unusual. */
  emphasis?: boolean
}

/** A block of prose in a case study. Headings are rendered as <h2>. */
export type StudySection = {
  heading: string
  body: string[]
  /** Rendered as a bulleted list under the prose. */
  points?: string[]
}

export type CaseStudy = {
  /** One sentence a reader can repeat back after closing the tab. */
  premise: string
  facts: { label: string; value: string }[]
  sections: StudySection[]
  /** Written in the first person. The most useful part of any case study. */
  retrospective?: string[]
}

export type Project = {
  /** URL segment under /projects. */
  slug: string
  name: string
  year: string
  /** The card blurb: what the thing does, in plain language. */
  summary: string
  /** Card bullets. Lead with the constraint, not the feature list. */
  highlights: string[]
  tags: ProjectTag[]
  links: Link[]
  image?: {
    src: string
    alt: string
  }
  study?: CaseStudy
}

/** A run of hero prose. `strong` lifts it to full-contrast ink. */
export type TextRun = {
  text: string
  strong?: boolean
}

export type StackLine = {
  label: string
  items: string[]
}
