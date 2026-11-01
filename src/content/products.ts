import type { Product } from '@/types/content'

/**
 * Products owned by an employer, each with its own page under /work.
 *
 * These are deliberately not project cards. The company owns them, and a
 * portfolio that files an employer's product beside work the author built
 * alone is making a claim it cannot support. They sit inside the role that
 * produced them, and the page states the owner in its first fact.
 *
 * They are given a page because the engineering warrants one: the Experience
 * section has room for five bullets, and five bullets cannot hold a
 * multi-tenant architecture or a migration that could not lose a record.
 *
 * Copy register matches content/projects.ts — precise and measured, no
 * conversational asides.
 */
export const products: Product[] = [
  {
    slug: 'sutram',
    name: 'Sutram',
    company: 'Blueport Solutions',
    period: 'Aug 2025 — Present',
    summary:
      'Tender discovery and bid management for government contracts — identifying matching tenders, reading their documents, and carrying the work through to payment.',
    tags: [
      { label: 'Multi-tenant', emphasis: true },
      { label: 'Django REST' },
      { label: 'PostgreSQL' },
      { label: 'Redis' },
      { label: 'Coolify' },
    ],
    links: [{ label: 'Visit site', href: 'https://sutram.blueportsolutions.in/', external: true }],
    study: {
      premise:
        'Several tender-management firms, each with their own branding and their own data, served from a single codebase I deliver and operate end to end.',
      facts: [
        { label: 'Owner', value: 'Blueport Solutions — I build and operate it' },
        { label: 'My role', value: 'Software Engineer, end-to-end delivery' },
        { label: 'Period', value: 'Aug 2025 — Present' },
        { label: 'Architecture', value: 'Multi-tenant, white-label SaaS' },
        { label: 'Stack', value: 'Python, Django REST, PostgreSQL, Redis' },
        { label: 'Infrastructure', value: 'VPS on Coolify — SSL/TLS, versioned releases' },
      ],
      sections: [
        {
          heading: 'What a tender costs a firm',
          body: [
            'A government tender is published as a set of documents with a deadline and a format that admits no error. Firms that bid professionally spend most of their time on the work preceding the bid: identifying which tenders are relevant, reading the documentation, and tracking what has been submitted and what has been paid.',
            'Sutram covers that entire cycle in one platform — discovery, the documents, the bid, and the payment that concludes it.',
          ],
        },
        {
          heading: 'One codebase, several firms',
          body: [
            'Each client is a separate firm with its own branding, its own users and its own commercially sensitive bids. The straightforward approach is to run a copy of the application per client and then maintain five copies indefinitely.',
            'Instead there is one codebase and one deployment, with separation enforced in the database rather than in the code that queries it. That distinction is the one worth being careful about: an access rule written into a handler is a rule that will be omitted from the next endpoint, and in this domain a leak between two clients is not a defect report but the end of a contract.',
          ],
          points: [
            'Row-level isolation, so each client’s data is separated by the database rather than by remembering to filter.',
            'Role-based access control governing what each user within a firm may see and do.',
            'White-label branding per tenant, from a single deployment.',
          ],
        },
        {
          heading: 'Surfacing only the relevant tenders',
          body: [
            'Tender listings arrive in volume, and almost none of a given day’s postings are relevant to any one firm. Keyword filtering is too coarse, because the language of a tender rarely matches the language a firm uses to describe itself.',
            'A retrieval pipeline reads incoming listings and surfaces only those within each client’s own field, which reduces the queue to a length that will actually be reviewed.',
          ],
        },
        {
          heading: 'Five years of records into a database',
          body: [
            'The clients arrived with five years of history in spreadsheets and scanned PDFs — a complete record of everything they had bid for, in a form nothing could query.',
            'An OCR ingestion pipeline migrated all of it into PostgreSQL without the loss of a record. That is the whole requirement: a migration that is 99% correct is one a client cannot rely on, and they would be correct not to.',
          ],
        },
        {
          heading: 'Response times suited to daily use',
          body: [
            'This is software that remains open throughout the working day, so response time determines whether it functions as a tool or an obstruction.',
            'Average API response time was reduced by 70% through four measures: Redis caching for data that does not change between requests, indexes for queries reading more than they required, load balancing, and rewriting the queries that were slow by construction rather than by volume.',
          ],
        },
        {
          heading: 'Operating it, not only building it',
          body: [
            'The VPS is mine to operate as well: SSL/TLS, versioned releases and centralised logging, managed through Coolify.',
            'Automating the release path removed approximately 20 minutes from every deploy. The time saved matters less than what it enables — a deploy that is quick and uneventful is one worth performing to correct something minor, rather than deferring it.',
          ],
        },
      ],
    },
  },

  {
    slug: 'dmfu',
    name: 'DMFU',
    fullName: 'Daily Mess For U',
    company: 'Beginning Solutions',
    period: '2024 — 2025',
    summary:
      'Two Android applications addressing the same problem: locating an affordable daily meal, and administering the mess that serves it.',
    tags: [
      { label: 'Shipped to Play Store', emphasis: true },
      { label: 'Python' },
      { label: 'MongoDB' },
      { label: 'Ubuntu VPS' },
      { label: 'Figma' },
    ],
    links: [
      {
        label: 'Mess Finder',
        href: 'https://play.google.com/store/apps/details?id=com.dmfu',
        external: true,
      },
      {
        label: 'Mess Manager',
        href: 'https://play.google.com/store/apps/details?id=com.dmfu_mess_manager',
        external: true,
      },
    ],
    study: {
      premise:
        'A student in an unfamiliar city has to eat every day, affordably. DMFU is the application that locates a mess for them — and the second application the mess uses to administer itself.',
      facts: [
        { label: 'Owner', value: 'Beginning Solutions' },
        { label: 'My role', value: 'Full Stack Developer — built and shipped it' },
        { label: 'Period', value: '2024 — 2025' },
        { label: 'Shipped', value: 'Two Android applications, both on Google Play' },
        { label: 'Stack', value: 'Python, MongoDB, Shell, Ubuntu, Figma' },
        { label: 'Operations', value: 'Apache, SSL automation, automated backups' },
      ],
      sections: [
        {
          heading: 'Two applications, one problem',
          body: [
            'A mess is where a great many students and working professionals in India eat daily: a kitchen serving a fixed menu at a fixed price, generally on a monthly plan. Identifying a good one is a matter of word of mouth, and administering one is typically a paper record.',
            'DMFU addresses both halves. One application serves the people eating — search what is nearby, review the menu, compare the price and the ratings, then subscribe. The other serves the kitchen, which administers its own listing, menu and plans through it.',
          ],
        },
        {
          heading: 'What the finder provides',
          body: [
            'The application is structured around how a person actually selects a mess: proximity, budget, dietary preference, and recent reputation.',
          ],
          points: [
            'Nearby messes ranked by ratings from people who have eaten there.',
            'Vegetarian and non-vegetarian filtering, which for many users is the first criterion rather than a preference.',
            'Full detail before committing: address, photographs, menu, pricing and plan options.',
            'Daily meals or a subscription, according to the user’s schedule and budget.',
            'A Mess Pocket wallet, topped up with coupons and redeemed at the counter.',
            'Notifications when a mess opens or closes, so no one travels to a closed kitchen.',
            'Meal ratings, which are what keep the rankings meaningful.',
          ],
        },
        {
          heading: 'The second application, for the kitchen',
          body: [
            'Everything the finder displays has to originate somewhere, and that somewhere is a person running a mess with no particular interest in software. The manager application is therefore deliberately the smaller of the two: it performs the few operations that keep a listing accurate, and nothing further.',
            'The pairing is what makes the product function. An unmaintained listing becomes inaccurate within a week, and an inaccurate listing is worse than none, because it directs someone to a kitchen that closed an hour earlier.',
          ],
          points: [
            'The listing itself: name, address and photographs — what a prospective customer sees first.',
            'The menu and the pricing, which change more frequently than anything else.',
            'The plans offered, daily or monthly, so the finder can display the cost.',
            'Open or closed status, which drives the notification a subscriber receives.',
            'Coupons redeemed at the counter against a subscriber’s Mess Pocket.',
            'Ratings and feedback as they arrive, which is what keeps the rankings honest.',
          ],
        },
        {
          heading: 'Migrating a live database without data loss',
          body: [
            'The production database used a legacy schema that no longer fitted the product. Changing it meant moving live records belonging to users who would open the application the following morning regardless.',
            'I wrote the migration in Python specifically for this data, rather than adopting a general-purpose tool that would have required the data to be more consistent than it was. Every existing user record was preserved. No one signed in to find a subscription missing, which is the only measure by which a migration succeeds.',
          ],
        },
        {
          heading: 'The infrastructure behind the applications',
          body: [
            'An application on a phone is the visible half. The other half was an Ubuntu VPS I owned outright: Apache, SSL automation so certificates renewed without intervention, and domain routing.',
            'The component worth noting is the shell tooling — automated backups, and health checks capable of restarting what they found unresponsive. A food application has a firm daily peak at lunch and dinner, with no one available to intervene. Self-healing was not an enhancement; it was the on-call arrangement.',
          ],
        },
        {
          heading: 'Two Play Store releases',
          body: [
            'I designed the interface in Figma before implementation, which is the least expensive point at which to discover that a screen does not work.',
            'The full Play Store path followed for both applications: signing, versioning, a staged rollout rather than a release to the entire user base at once, and crash monitoring afterwards. Releasing to a store is a different discipline from deploying a server — a defective build cannot be withdrawn from a user’s device, so the staging is the safeguard.',
          ],
        },
      ],
    },
  },
]

export const productBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug)

/**
 * The full name as one string, for a page title or structured data — the
 * places that are read as text rather than set as type. The page itself
 * splits the two so the heading does not fill the screen, but a search for
 * "Daily Mess For U" still has to find it.
 */
export const productTitle = (product: Product): string =>
  product.fullName ? `${product.name} — ${product.fullName}` : product.name
