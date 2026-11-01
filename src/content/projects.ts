import type { Project } from '@/types/content'

/**
 * Newest first, worked out rather than arranged. `projects` below is the
 * sorted list; `entries` is the raw one, and the order things are written in
 * there only decides ties.
 *
 * Recency is the year work last happened: the year it was built, or this year
 * if it is still being worked on. That means an ongoing project climbs back to
 * the top on its own each January, and a new one lands in the right place
 * without anyone remembering to move it.
 *
 * Only projects with a `study` get a /projects/<slug> page; the rest render as
 * a card with no "Case study" link, so adding or removing a study is a content
 * change and nothing else.
 *
 * Copy rules for everything in this file:
 * - A professional register: precise, measured, no conversational asides. This
 *   is read by hiring managers, and the writing is part of what is assessed.
 * - Plain words and short sentences all the same. Formality is not density.
 * - Every figure is one I can point to in the repository it came from. A
 *   number that cannot survive "show me" does not belong on the page.
 */
const entries: Project[] = [
  {
    slug: 'agentcv',
    name: 'AgentCV',
    year: '2025',
    summary:
      'Reads a job posting and assembles a tailored, ATS-ready resume and cover letter from achievements I have already written, then assesses the fit requirement by requirement and explains the result.',
    highlights: [
      '**Designed, built and shipped independently in five weeks** — 318 commits, 59 routes across 10 screens, 5 document templates. Live, and in use for every application I submit.',
      'Built a **matching engine that explains its own output**. Each requirement in a posting is classified as evidenced, mentioned, available but unused, or a genuine gap, so every score identifies the sentence behind it.',
      'Developed a skill vocabulary of **211 canonical terms and 614 surface variants**, together with detection for technologies outside it, so no requirement is silently discarded.',
      'Wrote **46 test suites, 9 of which measure rendered output** in a real browser across 10 device widths — identifying overlapping text and sub-44px tap targets that static analysis cannot.',
    ],
    tags: [
      { label: 'Resume engine', emphasis: true },
      { label: 'Flask' },
      { label: 'python-docx' },
      { label: 'WeasyPrint' },
      { label: 'Playwright' },
      { label: 'Docker' },
    ],
    links: [{ label: 'Live demo', href: 'https://agentcv-tf7z.onrender.com/', external: true }],
    study: {
      premise:
        'A resume engine that generates no prose of its own. It selects from material I have written, fits it to the posting and to the page, and assesses the match candidly enough to advise against applying.',
      facts: [
        { label: 'Role', value: 'Sole engineer' },
        { label: 'Built', value: '2025' },
        { label: 'Scale', value: '59 routes, 10 screens, 5 document templates' },
        { label: 'Stack', value: 'Flask, python-docx, WeasyPrint, Playwright, Docker' },
        { label: 'Tests', value: '46 suites, 72 files' },
        { label: 'Storage', value: 'GitHub Contents API' },
        { label: 'Status', value: 'Live' },
      ],
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'Tailoring a resume for each application is slow, repetitive work that nonetheless affects the outcome: the same experience reads very differently depending on what is presented first. The objective was to keep the tailoring and remove the retyping.',
            'The conventional approach is to pass the job description and the resume to a language model. I chose a different design, and that decision shaped the rest of the project.',
          ],
        },
        {
          heading: 'Every line traces back to written material',
          body: [
            'A resume is a factual claim about a person’s own history. When a model rewrites it, detail drifts: six months of contract work becomes "led the team", and a library used once becomes a core competency. Verifying every line afterwards costs as much as the tailoring it was meant to replace.',
            'The engine therefore generates no prose. Every sentence in the output already exists, word for word, in a library I maintain by hand. It decides only which entries to include, in what order, and what to remove so the document fits the page. Everything that reaches the page is material I can defend in an interview.',
          ],
          points: [
            'Content is held as tagged, hand-written JSON — version controlled, one file per domain.',
            'Figures live in a single file, so revising a number updates every bullet that cites it.',
            'Edits made before an export apply to that export alone and never modify the library.',
          ],
        },
        {
          heading: 'A score that identifies its evidence',
          body: [
            'The first version of the score carried no information. It returned 92–100% for every posting, including roles I was plainly unqualified for. A score that is always high is not merely useless but misleading, since it recommends applying everywhere.',
            'The cause was a misplaced denominator: the metric measured how much of my own content reached the output, rather than how much of the posting that content covered. Reversing it made the figures meaningful and made a low score possible.',
            'It no longer reports a single percentage. Each requirement receives its own verdict, and the report names the bullet that earned it.',
          ],
          points: [
            'Four verdicts per requirement: evidenced, mentioned only, present in the library but unused, or a genuine gap.',
            'Placement warnings: a must-have appearing once, or not until page two, is flagged as effectively invisible.',
            'Requirements are weighted by position — a skill under "Requirements" counts for more than the same term in a culture paragraph.',
          ],
        },
        {
          heading: 'Recognising unfamiliar technologies',
          body: [
            'Job postings name tools that no fixed list can contain: in-house frameworks, recently released libraries, and misspellings. A dictionary lookup discards them silently, which is the most damaging failure available to a matching tool, because the score still appears healthy afterwards.',
            'The vocabulary covers 211 canonical skills and the 614 surface forms postings use for them. Terms outside it are identified from the structure of the surrounding sentence — the phrasing that marks a word as a technology rather than a verb. The method requires no model, no GPU and no additional image size, and it fails visibly: unmatched terms are surfaced rather than dropped.',
          ],
        },
        {
          heading: 'Fitting the page without rewriting',
          body: [
            'A resume that runs four lines onto a third page is unlikely to be read in full. The usual remedies are to reduce the font size or to let a model condense the prose; the first compromises legibility and the second alters what was written.',
            'Instead the document is trimmed in a fixed priority order and re-measured after each step, until it occupies exactly one or two pages. Nothing is reworded and no type is reduced — the least relevant item is removed.',
          ],
        },
        {
          heading: 'Persistence on a host without storage',
          body: [
            'The free tier restarts the container and provides no persistent disk, which ruled out SQLite and local files. A managed Postgres instance was not justifiable in cost or operational overhead for a tool opened a few times a week.',
            'In production every write goes through the GitHub Contents API, which makes a private repository the datastore: small JSON documents, a single writer, infrequent writes, and a complete history of every change at no cost. Each save is a commit that can be inspected and reverted. One module touches storage, which is what made replacing the entire layer practical.',
          ],
        },
        {
          heading: 'Tests that measure the rendered page',
          body: [
            'Most of the 46 test suites inspect code, which cannot detect a broken layout. Nine drive a real browser and measure what was actually rendered, across 10 device widths and 4 breakpoints.',
            'They verify the conditions only a human eye would otherwise catch: text rendered over text, edges that should align and do not, controls with identical function rendered differently, text below 11.5px, and tap targets below 44px on a phone.',
          ],
        },
      ],
      retrospective: [
        'The score is the component I would approach differently. I shipped a metric before establishing any means of evaluating it, and because it was consistently high it appeared to be working. A small set of deliberately poor-fit postings as fixtures would have exposed the fault immediately.',
        'Using GitHub as the datastore is a decision I would repeat at this scale and would not defend for a second concurrent writer. It succeeds precisely because there is no concurrency to manage.',
      ],
    },
  },

  {
    slug: 'eigenn',
    name: 'EIGENN',
    year: '2026',
    summary:
      'A platform built for a single domain: competitive-exam preparation. Coaching institutes enrol and grant access to their students; a student submits a handwritten answer sheet and receives an evaluation in one step, with a human reviewer approving every AI result before the student sees it.',
    highlights: [
      'Built a **multi-tenant platform serving two distinct user groups** — coaching institutes who enrol and administer their own students, and the UPSC, state PSC, CA and CS candidates those students are.',
      'Engineered a **17-node LangGraph pipeline** that reads a scanned answer sheet, reviews its own intermediate output, declares every failure state, and resumes from any node rather than restarting — instrumented end to end with Langfuse.',
      'Built retrieval over **120K+ chunks** using BGE-M3 with cross-encoder reranking, quantised to ONNX INT8 to run on CPU within 300MB — removing GPU cost from the platform entirely.',
      'Architected the backend as **10+ containerised services** on a private IPv6 mesh behind a React and TypeScript front end, with long-running evaluations made durable on Temporal.',
      'Implemented idempotent Razorpay payments over an append-only ledger so retries are safe, supported by **150+ tests** including contract tests that detect changes in AI output structure.',
    ],
    tags: [
      { label: 'Evaluation platform', emphasis: true },
      { label: 'FastAPI' },
      { label: 'LangGraph' },
      { label: 'Temporal' },
      { label: 'ONNX' },
      { label: 'React' },
    ],
    links: [{ label: 'Live demo', href: 'https://demo.eigenn.in/', external: true }],
    study: {
      premise:
        'Everything an exam candidate needs in one platform, with grading as the difficult part of it. The pipeline performs the reading; a reviewer signs the result.',
      facts: [
        { label: 'Domain', value: 'Competitive-exam preparation' },
        { label: 'Exams', value: 'UPSC, state PSC, CA, CS' },
        { label: 'Users', value: 'Coaching institutes and their students' },
        { label: 'Built', value: '2026' },
        { label: 'Backend', value: 'FastAPI, LangGraph, Temporal, PostgreSQL, Redis, RabbitMQ' },
        { label: 'Frontend', value: 'React, TypeScript' },
        { label: 'Observability', value: 'Langfuse' },
        { label: 'Scale', value: '120K+ indexed chunks, 10+ services' },
      ],
      sections: [
        {
          heading: 'One domain, addressed properly',
          body: [
            'A candidate preparing for UPSC, a state PSC, CA or CS is not short of tools. They are short of a single environment that understands the examination they are actually sitting. General-purpose products treat an answer sheet as a document; this platform treats it as an answer to a question with a defined marking scheme.',
            'The platform is multi-tenant and two-sided. An institute enrols, brings its own students, and retains its own content, cohorts and branding. The student signs in through their institute and completes the entire cycle in one place: submit the handwritten sheet, have it read, receive an evaluation against the marking scheme — rather than scanning in one tool, querying a model in another, and receiving no mark anyone will stand behind.',
          ],
          points: [
            'Institutes administer their own students, content and cohorts; data is separated by tenant.',
            'A handwritten answer sheet is scanned and read on entry to the pipeline, so the input is paper rather than typed text.',
            'A single step for the student: submit, and the reviewed evaluation returns.',
          ],
        },
        {
          heading: 'A reviewer signs every result',
          body: [
            'A platform that issues machine-generated marks directly to a student is a liability rather than a product. Institutes are judged on their grading, and one confidently incorrect score costs more trust than a hundred correct ones earn.',
            'The pipeline therefore never issues a final mark. It produces a draft with its reasoning attached, and a reviewer approves, amends or rejects it; only the approved version reaches the student. That makes the model a rapid first reader rather than an authority, which is the role it performs well.',
          ],
        },
        {
          heading: 'A pipeline with declared failure states',
          body: [
            'The evaluation flow comprises 17 nodes in LangGraph, several of which cycle so the pipeline reviews its own intermediate output before continuing. The cycles matter: a first pass over a handwritten answer is frequently wrong in a way a second pass identifies.',
            'Every node checkpoints, so a failure resumes rather than restarts, and each failure state is typed rather than raised as a generic error. A system that can report only that something went wrong is a system that cannot be operated.',
          ],
          points: [
            'Typed failure states, each with a defined owner and recovery path.',
            'Per-node checkpoint and resume, so a partial run is not discarded.',
            'Long-running work orchestrated on Temporal rather than inside request handlers.',
            'Langfuse traces every node, so a poor result can be examined after the fact.',
          ],
        },
        {
          heading: 'Retrieval within a CPU budget',
          body: [
            'Retrieval runs over more than 120,000 chunks of reference material, embedded with BGE-M3 and reranked by a cross-encoder. Reranking is the step that separates broadly relevant passages from the correct one.',
            'Running that on GPUs would have been the straightforward choice and a recurring cost. Quantising the models to ONNX INT8 brought the entire retrieval stack within approximately 300MB of RAM on ordinary CPU hosts. The accuracy cost was marginal; the infrastructure cost was eliminated.',
          ],
        },
        {
          heading: 'Testing output that is permitted to vary',
          body: [
            'A model does not return an identical sentence twice, so conventional equality assertions establish nothing. What must remain fixed is the structure: the fields, the types, and the ranges a mark may occupy.',
            'Contract tests verify exactly that, and they are what detect a prompt or model change quietly breaking downstream code — a failure that otherwise reaches a reviewer as a blank screen.',
          ],
        },
        {
          heading: 'Payments require a higher standard',
          body: [
            'Payments are the one area where a retry must never become a second charge. Writes go to an append-only ledger and every operation is idempotent, so a duplicated webhook or a double submission settles to the same balance.',
            'Most of the 150+ tests in this area are not happy-path tests. They cover the duplicate callback, the timeout mid-write, and the out-of-order delivery — the states that appear in production only if they have been written down first.',
          ],
        },
      ],
    },
  },

  {
    slug: 'algopy',
    name: 'AlgoPy',
    year: '2025',
    ongoing: true,
    summary:
      'Runs 16 independent screening strategies across 8,100 NSE and BSE companies each night, publishes each as a pre-computed snapshot, and states the measured backtest result on the page — including where it shows no edge.',
    highlights: [
      '**Publishes its own negative results.** Each strategy states what its backtest measured — t-statistics, profit factors, multiple-testing corrections — including the screens that demonstrate no edge.',
      'Serves **8,100 companies in under 0.3s** on a 512MB host by committing each night’s data into the deployment, so no external call occurs while a reader waits.',
      'Reduced serve time **200s → 0.7s**, memory **62MB → 27MB per worker**, and upstream requests **13,000 → 3,000 per night**. Each figure is a measurement taken before and after.',
      'Covered the platform with **2,341 automated tests**, 147 of which drive a real browser, and operate the whole system at **₹0/month** within free-tier limits.',
    ],
    tags: [
      { label: 'Market screener', emphasis: true },
      { label: 'Django 5' },
      { label: 'Playwright' },
      { label: 'GitHub Actions' },
      { label: 'Docker' },
      { label: 'PWA' },
    ],
    links: [
      { label: 'Live demo', href: 'https://algo-trading-lq8e.onrender.com/', external: true },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.onrender.algo_trading_lq8e.twa',
        external: true,
      },
    ],
    study: {
      premise:
        'Sixteen screens across 8,100 companies, rebuilt nightly and committed into the deployment — and each one states what its backtest actually measured, including the results that show no edge.',
      facts: [
        { label: 'Role', value: 'Sole engineer' },
        { label: 'Built', value: 'Since 2025' },
        { label: 'Scale', value: '16 screens, 187 routes' },
        { label: 'Coverage', value: '8,111 NSE and BSE companies' },
        { label: 'Stack', value: 'Django 5, Playwright, GitHub Actions, Docker, Render' },
        { label: 'Tests', value: '2,341 automated' },
        { label: 'Hosting', value: '512MB host, ₹0 per month' },
        { label: 'Also on', value: 'Google Play' },
      ],
      sections: [
        {
          heading: 'The work is collection, not analysis',
          body: [
            'Equity research in India is predominantly data collection. The figures are distributed across four sources that do not agree with one another, each company requires ten to twenty fields gathered by hand, and the market has moved by the time thirty have been completed. Reviewing 8,100 is not feasible manually.',
            'The platform performs the collection nightly, so the reader opens only companies that qualified for something. It screens; it does not advise and it does not place orders. That boundary is a design decision rather than an omission.',
          ],
        },
        {
          heading: 'Data as a build artifact rather than a query',
          body: [
            'End-of-day market data does not change. Yesterday’s prices are final, and anything immutable can be built in rather than looked up — which is what makes a 512MB host sufficient.',
            'A nightly GitHub Actions job fetches from every source, runs each of the 16 screens as an independent step, writes each result as an atomic JSON snapshot, and commits it. The commit triggers a deploy, so the image ships with the data already inside it. Serving a page is then a dictionary lookup: nothing is fetched while a reader waits, and the site cannot be slow because an upstream provider is slow.',
          ],
          points: [
            'Under 0.3s per page across 8,111 companies, on 512MB.',
            'No external call in the read path, so there are no rate limits to accommodate.',
            'Rolling back incorrect data is a redeploy of the previous build.',
            'A provider outage presents as slightly stale data rather than a broken page.',
          ],
        },
        {
          heading: 'Four figures that required measurement',
          body: [
            'None of the performance work began as an assumption. Each started with an unacceptable measurement and concluded with the same measurement retaken.',
            'The most severe case was a screen that built its default window at request time, fetching approximately 850 days of candles per company. It took over 200 seconds, beyond the server’s 120-second timeout, so the worker was terminated before it could complete and cache the result, and every visitor restarted the same work. As a committed snapshot it responds in 0.7 seconds.',
          ],
          points: [
            'Serve time 200s → 0.7s, by moving the build out of the request path.',
            'Time to first byte 0.95s → 0.30s, by encoding each feed once per data version. 0.30s is the India-to-Singapore network floor.',
            'Memory 62.3MB → 27.2MB per worker, after identifying four modules each building a separate index of the same instrument list. A two-worker configuration measured 675MB and was OOM-killed, which is why production runs one.',
            'Upstream requests ~13,000 → ~3,000 per night, via a build-time shared cache guarded so it cannot alter any screen’s output.',
          ],
        },
        {
          heading: 'The screens that found nothing, stated plainly',
          body: [
            'Most trading projects imply an edge and never test for one. This platform runs the backtest and publishes the result on the page regardless of whether the result is favourable.',
            'Several screens measured as no edge and say so publicly. Stage 2 breakouts returned +0.24% over their own 15-day window with a t-statistic of 0.12 — the in-sample half negative and the holdout positive, which indicates regime rather than skill. The F&O momentum screen wins 29.8% against a 33.3% breakeven at a profit factor of 0.83, and no cost assumption recovers it. A study of a 2013 astrology trading method found 0 of 1,589 rules surviving a multiple-testing correction.',
            'The architecture supports that position: there is no combined score and no average anywhere. The screens disagree — two differed by 44 points on the same company on the same day — and they are of different ages, so every block carries its own date, and a company’s absence from a screen means it did not qualify, never that it should be sold.',
          ],
        },
        {
          heading: 'A pipeline that starved itself of data',
          body: [
            'The nightly job ran its test suite before building the data. Poor upstream data failed a test, the failed gate skipped all thirty builds, and the only process capable of repairing the file was the build that had just been skipped. The site served stale data on six separate occasions before I identified the pattern.',
            'Data-reading tests are now tagged out of that gate, and the gate itself reports without blocking: a failing test publishes the data and still marks the run red. "Partial publish, loud failure" was stated in the job’s own header throughout — the gate was the single step not honouring it.',
          ],
        },
        {
          heading: 'A figure that was wrong on 1,005 companies',
          body: [
            'One provider returns NSE history adjusted for splits and bonuses, and BSE history unadjusted. Taking the higher of the two as the all-time high therefore adopted the unadjusted BSE figure and produced drawdowns that had never occurred, across 1,005 companies.',
            'Nothing failed and nothing appeared incorrect, which is what makes this class of defect worth recording. Every BSE all-time high is now labelled unverified on the page rather than silently trusted.',
          ],
        },
      ],
      retrospective: [
        'A monitor must not run inside the system it monitors. When the Actions budget was exhausted, every workflow failed within four seconds, the site served 17-day-old data, and the health check remained green throughout because it verified only that the web server was running. A separate staleness endpoint is now monitored from outside GitHub, with alerts that fire only on failure.',
        'Four audit guards passed with the defect deliberately reintroduced. The comment explaining the fix contained the exact string the guard searched for, so the guard matched its own documentation. Guards now strip comments before matching, and I do not rely on a new one until I have made it fail deliberately.',
        'The dependency scan ran before the tests and was configured to block, so a single advisory in a transitive dependency meant a push executed zero tests while the run still appeared normal. It is non-blocking now, runs after the tests, and a final always-run step fails the build on its result.',
      ],
    },
  },
]

/** The year a project was last worked on — this year, while it is ongoing. */
const recency = (project: Project): number =>
  project.ongoing ? new Date().getFullYear() : Number(project.year)

/**
 * Sorted newest first. Array.prototype.sort is stable, so two projects from
 * the same year keep the order they are written in above.
 */
export const projects: Project[] = [...entries].sort((a, b) => recency(b) - recency(a))

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)

/**
 * What the card and the case-study header print for a project's dates.
 *
 * AlgoPy used to be written as "2025–26", which would have quietly become
 * wrong on 1 January — in the card, the page heading and the browser title at
 * once, with nothing to catch it. "Present" cannot go stale, and it states the
 * more useful fact anyway: the project is still active.
 */
export const projectYears = (project: Project): string =>
  project.ongoing ? `${project.year}–present` : project.year
