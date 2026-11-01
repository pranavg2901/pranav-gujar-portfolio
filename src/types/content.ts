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
  /**
   * Dropped from the strip on a phone, where the list is one per row and
   * every extra entry is another screen of scrolling before the work. Only
   * for figures stated in full elsewhere on the page.
   */
  minorOnMobile?: boolean
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
   * Slug of the employer product this role was spent on, from
   * content/products.ts. Shown inside the experience entry and never as a
   * project card — the company owns it.
   */
  product?: string
}

export type Credential = {
  title: string
  issuer: string
  period: string
  note?: string
  /**
   * Where the credential can be checked. A certification nobody can verify is
   * a line of text; one that links to the issuer's own badge is evidence.
   */
  href?: string
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

/**
 * A product owned by an employer. Same long-form page as a case study, with
 * the ownership stated rather than implied.
 */
export type Product = {
  /** URL segment under /work. */
  slug: string
  /** The short name, set as display type. Keep it to one word where there is one. */
  name: string
  /**
   * The name spelled out, set small beneath it. "DMFU — Daily Mess For U" as
   * a single heading ran to two lines of display type and filled the screen
   * before the reader had learned anything.
   */
  fullName?: string
  /** Whose product it is. Printed on the page, not left to be inferred. */
  company: string
  period: string
  /** The blurb shown in the experience panel. */
  summary: string
  tags: ProjectTag[]
  /** Outbound links. These live on the product page, not on the home page. */
  links: Link[]
  study: CaseStudy
}

export type Project = {
  /** URL segment under /projects. */
  slug: string
  name: string
  /**
   * The year work started. For anything still being worked on, set `ongoing`
   * rather than writing a range — see projectYears() in content/projects.ts.
   */
  year: string
  /** Still being worked on, so the displayed period ends in "present". */
  ongoing?: boolean
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
