import type { Product } from '@/types/content'

/**
 * Products owned by an employer, each with its own page under /work.
 *
 * These are deliberately not project cards. The company owns them, and a
 * portfolio that quietly files an employer's product next to work the author
 * built alone is making a claim it cannot support. They sit inside the role
 * that produced them, and the page says whose it is in the first fact.
 *
 * What they are not short of is engineering worth reading about, which is why
 * they get a page at all: the Experience section has room for five bullets,
 * and five bullets cannot hold a multi-tenant architecture or a database
 * migration that could not lose a row.
 */
export const products: Product[] = [
  {
    slug: 'sutram',
    name: 'Sutram',
    company: 'Blueport Solutions',
    period: 'Aug 2025 — Present',
    summary:
      'Tender discovery and bid management for government contracts — finding matching tenders, reading their documents, and running the work through to payment.',
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
        'Several tender-management firms, each with their own branding and their own data, served from one codebase I own end to end.',
      facts: [
        { label: 'Owner', value: 'Blueport Solutions — I build and run it' },
        { label: 'My role', value: 'Software Engineer, end-to-end delivery' },
        { label: 'Period', value: 'Aug 2025 — Present' },
        { label: 'Shape', value: 'Multi-tenant, white-label SaaS' },
        { label: 'Stack', value: 'Python, Django REST, PostgreSQL, Redis' },
        { label: 'Infrastructure', value: 'VPS on Coolify — SSL/TLS, versioned releases' },
      ],
      sections: [
        {
          heading: 'What a tender actually costs a firm',
          body: [
            'A government tender is published as a pile of documents, with a deadline and a format that is unforgiving about both. Firms that bid for a living spend most of their time on the part before the bidding: finding the tenders that are even relevant, reading the documents, and keeping track of what has been submitted and what has been paid.',
            'Sutram is the whole of that loop in one place — discovery, the documents, the bid, and the payment at the end of it.',
          ],
        },
        {
          heading: 'One codebase, several firms',
          body: [
            'Each client is a separate firm with its own branding, its own users and its own commercially sensitive bids. The straightforward answer is to run a copy of the application per client, and then maintain five copies forever.',
            'Instead it is one codebase and one deployment, with the separation enforced in the database rather than in the code that queries it. That is the part worth being careful about: an access rule that lives in a handler is a rule somebody forgets to write on the next endpoint, and in this domain a leak between two clients is not a bug report, it is the end of the contract.',
          ],
          points: [
            'Row-level isolation, so a client’s data is separated by the database and not by remembering to filter.',
            'Role-based access control over what each user inside a firm can see and do.',
            'White-label branding per tenant, from one deployment.',
          ],
        },
        {
          heading: 'Showing a firm only the tenders that are theirs',
          body: [
            'Tender listings arrive as a flood, and almost none of any day’s postings are relevant to any one firm. A keyword filter is too blunt — the language of a tender rarely matches the language a firm uses about itself.',
            'A retrieval pipeline reads incoming listings and surfaces only the ones inside each client’s own field, so the inbox is short enough to actually be read.',
          ],
        },
        {
          heading: 'Five years of paper into a database',
          body: [
            'The clients did not arrive empty-handed. They arrived with five years of history in spreadsheets and scanned PDFs — the record of everything they had bid for, in a form nothing could query.',
            'An OCR ingestion pipeline moved all of it into PostgreSQL without losing a row. "Without losing a row" is the whole requirement: a migration that is 99% correct is one a client cannot trust, and they would be right not to.',
          ],
        },
        {
          heading: 'Making it fast enough to live in',
          body: [
            'This is software people have open all day, so response time is not a vanity metric — it is the difference between a tool and a chore.',
            'Average API response time came down by 70%, from four directions at once: Redis caching for what does not change between requests, indexes for the queries that were reading more than they needed, load balancing, and rewriting the queries that were slow by construction rather than by volume.',
          ],
        },
        {
          heading: 'Running it, not just building it',
          body: [
            'The VPS is mine to run as well: SSL/TLS, versioned releases and centralised logging, managed through Coolify.',
            'Automating the release path took about 20 minutes off every deploy. The time matters less than what it buys — a deploy that is quick and boring is a deploy you are willing to do on a Friday to fix something small, instead of letting it wait.',
          ],
        },
      ],
    },
  },

  {
    slug: 'dmfu',
    name: 'DMFU — Daily Mess For U',
    company: 'Beginning Solutions',
    period: '2024 — 2025',
    summary:
      'Two Android apps for the same problem: finding an affordable daily meal, and running the mess that serves it.',
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
        'A student in a new city has to eat every day, cheaply. DMFU is the app that finds them a mess — and the second app the mess uses to run itself.',
      facts: [
        { label: 'Owner', value: 'Beginning Solutions' },
        { label: 'My role', value: 'Full Stack Developer — built and shipped it' },
        { label: 'Period', value: '2024 — 2025' },
        { label: 'Shipped', value: 'Two Android apps, both on Google Play' },
        { label: 'Stack', value: 'Python, MongoDB, Shell, Ubuntu, Figma' },
        { label: 'Operations', value: 'Apache, SSL automation, automated backups' },
      ],
      sections: [
        {
          heading: 'Two apps, one problem',
          body: [
            'A mess is where a great many students and working people in India eat every day: a kitchen that serves a fixed menu at a fixed price, usually on a monthly plan. Finding a good one near you is word of mouth, and running one is a notebook.',
            'DMFU is both halves. One app is for the people eating — search what is nearby, read the menu, see the price and what others thought, then subscribe. The other is for the people cooking, who manage their own listing, menu and plans from it.',
          ],
        },
        {
          heading: 'What the finder does',
          body: [
            'The app is built around how someone actually chooses a mess: close to me, within my budget, serving what I eat, and not disappointing anyone recently.',
          ],
          points: [
            'Messes near you, ranked by ratings left by people who have actually eaten there.',
            'Veg and non-veg filtering, because for a lot of users this is the first question, not a preference.',
            'The full detail before committing: address, photos, menu, prices and plan options.',
            'Daily meals or a subscription, whichever matches the person’s week and budget.',
            'A Mess Pocket wallet, topped up with coupons and redeemed at the counter.',
            'Notifications when a mess opens or closes, so nobody walks to a shut kitchen.',
            'Ratings on meals, which is what keeps the rest of the list honest.',
          ],
        },
        {
          heading: 'Moving a live database without losing anyone',
          body: [
            'The production database was on a legacy schema that had stopped fitting the product. Changing it meant moving real records belonging to real users who would open the app the next morning either way.',
            'I wrote the migration in Python specifically for this data, rather than reaching for a generic tool that would have needed the data to be tidier than it was. Every existing user record came through intact. Nobody logged in to find their subscription missing, which is the only measure of success a migration has.',
          ],
        },
        {
          heading: 'The server behind the apps',
          body: [
            'An app on a phone is the visible half. The other half was an Ubuntu VPS I owned outright: Apache, SSL automation so certificates renewed without anyone remembering, and domain routing.',
            'The part I would point at is the shell scripts — automated backups, and health checks that could restart what they found broken. A food app has a hard daily peak at lunch and dinner, and there is nobody on call at 1pm. Self-healing was not a nice extra, it was the on-call rota.',
          ],
        },
        {
          heading: 'Getting it into the store, twice',
          body: [
            'I designed the interface in Figma before any of it was built, which is the cheapest place to find out that a screen does not work.',
            'Then the whole Play Store path for both apps: signing, versioning, a staged rollout rather than shipping to everybody at once, and crash monitoring afterwards. Releasing to a store is a different discipline from deploying a server — you cannot roll back a bad build out of a user’s phone, so the staging is the safety net.',
          ],
        },
      ],
    },
  },
]

export const productBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug)
