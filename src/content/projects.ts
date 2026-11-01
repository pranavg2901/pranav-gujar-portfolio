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
 * - Short sentences, plain words. A recruiter skims this on a phone, and a
 *   clever phrase that costs them a re-read costs the rest of the page.
 * - Every number here is one I can point at in the repository it came from.
 *   A figure that cannot survive "show me" is worse than no figure.
 */
const entries: Project[] = [
  {
    slug: 'agentcv',
    name: 'AgentCV',
    year: '2025',
    summary:
      'Reads a job posting and builds a tailored, ATS-ready resume and cover letter out of achievements I have already written — then grades how well I fit the role, requirement by requirement, and says why.',
    highlights: [
      '**Designed, built and shipped it on my own in five weeks** — 318 commits, 59 routes across 10 screens, 5 document templates. Live, and I use it for every application.',
      'Built a **matching engine that explains itself**. Every requirement in a posting is marked evidenced, mentioned, available but unused, or a real gap — so a score always names the sentence behind it.',
      'Built a skill vocabulary of **211 terms and 614 real-world variants**, plus detection for technologies it has never seen, so a requirement is never silently dropped.',
      'Wrote **46 test suites, 9 of which measure rendered pixels** in a real browser across 10 device widths — catching overlapped text and tap targets under 44px that reading the source cannot.',
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
        'A resume engine that writes nothing of its own. It picks from lines I wrote, fits them to the posting and to the page, and grades the fit honestly enough to tell me not to apply.',
      facts: [
        { label: 'Role', value: 'Sole engineer — design, build, deploy, operate' },
        { label: 'Built', value: '2025 — 318 commits over five weeks' },
        { label: 'Scale', value: '59 routes, 10 screens, 5 document templates' },
        { label: 'Stack', value: 'Flask, python-docx, WeasyPrint, Playwright, Docker' },
        { label: 'Tests', value: '46 suites, 72 files, 9 measuring real pixels' },
        { label: 'Storage', value: 'A private GitHub repo, through the Contents API' },
        { label: 'Status', value: 'Live, in weekly use by me' },
      ],
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'Rewriting a resume for every application is slow work, and it still matters. The same two years of experience read very differently depending on what you put first. I wanted the tailoring without the retyping.',
            'The easy answer in 2025 is to hand the job description and the resume to a language model. I took a different route, and that one decision shaped the rest of the project.',
          ],
        },
        {
          heading: 'Every line traces back to something I wrote',
          body: [
            'A resume is a factual claim about your own history. When a model rewrites it, small things slip: six months of contract work becomes "led the team", a library you used once becomes a core skill. Then you have to check every line yourself, which is most of the work you were trying to skip.',
            'So the engine writes no sentences. Every sentence in the output already exists, word for word, in a library I keep by hand. The engine only decides which entries to use, what order to put them in, and what to cut so it fits the page. Whatever reaches the paper is something I can defend in an interview.',
          ],
          points: [
            'Content lives in tagged, hand-written JSON — version controlled, one file per area.',
            'Figures live in one file, so changing a number updates every bullet that quotes it.',
            'Edits made before an export apply to that export only, and never touch the library.',
          ],
        },
        {
          heading: 'A score that names its evidence',
          body: [
            'The first version of the score was useless. It came back 92–100% for every posting I pasted in, including roles I was clearly not qualified for. A score that is always high tells you nothing, and this one was worse than nothing: it told me to apply everywhere.',
            'The reason was simple. I was measuring how much of my own content made it into the output, instead of how much of the posting my content actually covered. Turning that around made the numbers move, and made a low score possible.',
            'It no longer reports one percentage at all. Every requirement in the posting gets a verdict of its own, and the report says which bullet earned it.',
          ],
          points: [
            'Four verdicts per requirement: evidenced, only mentioned, in the library but unused, or a real gap.',
            'Placement warnings: a must-have that appears once, or not until page two, is flagged as effectively invisible.',
            'Requirements are weighted by where they sit — a skill under "Requirements" counts for more than the same word in a culture paragraph.',
          ],
        },
        {
          heading: 'Recognising tools it has never seen',
          body: [
            'Job postings name tools that no fixed list will ever hold: in-house frameworks, this month’s libraries, plain typos. A dictionary lookup drops them without a word, and that is the worst thing a matching tool can do, because the score still looks fine afterwards.',
            'The vocabulary covers 211 canonical skills and the 614 ways postings actually spell them. Anything outside it is spotted from the shape of the sentence around it — the wording that marks something as a technology rather than a verb. It is not a model, it needs no GPU and it adds nothing to the image size, and it fails out loud: what it could not match is shown rather than hidden.',
          ],
        },
        {
          heading: 'Fitting the page without rewording',
          body: [
            'A resume that runs four lines onto a third page is a resume nobody finishes reading. The usual fixes are to shrink the font or let a model tighten the prose, and both are quiet lies — one about readability, one about what I actually wrote.',
            'Instead the document is trimmed in a fixed priority order and re-measured after every step, until it lands on exactly one or two pages. Nothing is reworded and nothing shrinks; the least relevant item simply goes.',
          ],
        },
        {
          heading: 'Storing data on a host that forgets',
          body: [
            'The free tier restarts the container and keeps no disk, so SQLite and local files were out. Paying for a managed Postgres, for a tool I open a few times a week, was not worth the money or the extra thing to look after.',
            'In production every save goes through the GitHub Contents API, which makes a private repository the database: small JSON documents, one writer, writes that are rare, and a full history of every change for free. Every save is a commit I can diff and undo. One module touches storage at all, which is what made swapping the whole layer possible in the first place.',
          ],
        },
        {
          heading: 'Tests that look at the screen',
          body: [
            'Most of the 46 test suites read code, which cannot see a layout break. Nine of them drive a real browser and measure what was actually painted, at 10 device widths and 4 breakpoints.',
            'They check the things that only show up to a human eye: text painted over text you need to read, edges that should line up and do not, two controls doing the same job that look different, any text under 11.5px, any tap target under 44px on a phone. A resume tool that looks broken has lost before it is read.',
          ],
        },
      ],
      retrospective: [
        'The score is the part I would build differently from the start. I shipped a number before I had any way to tell whether it was a good number, and because it was always high it looked like it was working. A few deliberately bad postings as test cases would have caught it on day one.',
        'Using GitHub as the database I would do again at this size, and would not defend for a second user. It works because there is no concurrency to get wrong.',
      ],
    },
  },

  {
    slug: 'eigenn',
    name: 'EIGENN',
    year: '2026',
    summary:
      'A platform built for one domain: competitive-exam preparation. Coaching institutes enrol and give their students access; a student uploads a handwritten answer sheet and gets it evaluated in one step — with a human reviewer approving every AI result before the student sees it.',
    highlights: [
      'Built a **multi-tenant platform serving two kinds of user at once** — coaching institutes who enrol and manage their own students, and the UPSC, state PSC, CA and CS aspirants those students are.',
      'Built a **17-node LangGraph pipeline** that reads a scanned answer sheet, reviews its own working, names every way it can fail, and resumes from any node instead of starting over — traced end to end in Langfuse.',
      'Built search over **120K+ chunks** with BGE-M3 and cross-encoder reranking, quantised to ONNX INT8 so it runs on an ordinary CPU in 300MB — taking GPU cost out of the platform entirely.',
      'Architected the backend as **10+ containerised services** on a private IPv6 mesh behind a React and TypeScript front end, with long-running evaluations durable on Temporal.',
      'Built Razorpay payments on an append-only ledger where a retry never charges twice, backed by **150+ tests** including contract tests that catch the AI output changing shape.',
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
        'Everything an exam aspirant needs in one place, and grading is the hard part of it. The pipeline does the reading; a human signs the result.',
      facts: [
        { label: 'Domain', value: 'Competitive-exam preparation — a vertical AI platform' },
        { label: 'Exams', value: 'UPSC, state PSC, CA, CS' },
        { label: 'Users', value: 'Institutes enrol; their students get access' },
        { label: 'Built', value: '2026' },
        { label: 'Backend', value: 'FastAPI, LangGraph, Temporal, PostgreSQL with PgBouncer' },
        { label: 'Also', value: 'Redis, RabbitMQ, ONNX, React and TypeScript' },
        { label: 'Observability', value: 'Langfuse tracing across every node' },
        { label: 'Scale', value: '120K+ indexed chunks, 10+ services on a private IPv6 mesh' },
      ],
      sections: [
        {
          heading: 'One domain, done properly',
          body: [
            'An aspirant preparing for UPSC, a state PSC, CA or CS is not short of tools. They are short of one place that understands the exam they are actually sitting. General-purpose products treat an answer sheet as a document; this one treats it as an answer to a question with a known marking scheme.',
            'The platform is multi-tenant and two-sided. A coaching institute enrols, brings its own students, and keeps its own content, cohorts and branding. The student signs in through their institute and gets the whole loop in one place: upload the handwritten sheet, have it read, get it evaluated, see the feedback against the marking scheme — rather than scanning in one tool, asking a model in another and never getting a mark anyone stands behind.',
          ],
          points: [
            'Institutes manage their own students, content and cohorts; data stays separated by tenant.',
            'A handwritten answer sheet is scanned and read on the way into the pipeline, so the input is paper, not typing.',
            'One step for the student: upload, and the evaluation comes back reviewed.',
          ],
        },
        {
          heading: 'A human signs every result',
          body: [
            'A platform that sends machine-written marks straight to a student is a risk, not a product. Institutes are judged on their grading, and one confidently wrong score costs more trust than a hundred right ones earn.',
            'So the pipeline never gives a final mark. It produces a draft with its reasoning next to it, and a reviewer approves, edits or rejects it. Only the approved version reaches the student. That makes the AI a very fast first reader instead of the authority, which is the job it is actually good at.',
          ],
        },
        {
          heading: 'A pipeline that fails in named ways',
          body: [
            'The evaluation flow is 17 nodes in LangGraph, and some of them loop back so the pipeline checks its own working before it carries on. The loops matter: a first pass over a handwritten answer is often wrong in a way a second pass catches.',
            'Every node saves its state, so a failure picks up where it stopped instead of starting again. And every failure has a name and a type rather than one generic error. A system that can only tell you "something went wrong" is a system nobody can run.',
          ],
          points: [
            'Named failure types — each one has an owner and a way to recover.',
            'Every node saves state, so a half-finished run is not wasted work.',
            'Long jobs run on Temporal, not inside a web request.',
            'Langfuse traces every node, so a bad result can be opened and read afterwards.',
          ],
        },
        {
          heading: 'Search that fits on a CPU',
          body: [
            'Search runs over more than 120,000 chunks of reference material, embedded with BGE-M3 and then reranked by a cross-encoder. Reranking is the step that separates roughly relevant passages from the right one.',
            'Running that on GPUs would have been the easy choice and a bill every month. Quantising the models to ONNX INT8 got the whole search stack into about 300MB of RAM on ordinary CPU machines. Accuracy dropped a little. The cost dropped to nothing.',
          ],
        },
        {
          heading: 'Tests for output that is allowed to vary',
          body: [
            'A model does not return the same sentence twice, so the usual "assert equals" tests say nothing. What has to stay fixed is the shape: the fields, the types, the ranges a mark can sit in.',
            'Contract tests check exactly that, and they are the ones that catch a prompt or model change quietly breaking the code downstream — the failure that otherwise reaches a reviewer as a blank screen.',
          ],
        },
        {
          heading: 'Money needs a higher standard',
          body: [
            'Payments are the one place where a retry must never become a second charge. Every write goes into an append-only ledger and every operation is safe to repeat, so a duplicated webhook or a double-tapped button ends at the same balance.',
            'Most of the 150+ tests here are not happy-path tests. They cover the duplicate callback, the timeout halfway through a write, the message that arrives out of order — the cases that only turn up in production if you have not written them down first.',
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
      'Runs 16 independent screening strategies over 8,100 NSE and BSE companies every night, publishes each as a pre-computed snapshot, and prints the measured backtest result on the page — including when it shows no edge.',
    highlights: [
      '**Publishes its own negative results.** Each strategy states what its backtest actually measured — t-statistics, profit factors, multiple-testing corrections — including the screens that show no edge at all.',
      'Serves **8,100 companies in under 0.3s** on a 512MB host by committing the night’s data into the deployment, so nothing external is called while a reader waits.',
      'Cut serve time **200s → 0.7s**, memory **62MB → 27MB per worker**, and upstream calls **13,000 → 3,000 a night**. Every one of those is a measurement, before and after.',
      'Covered it with **2,341 automated tests**, 147 of them driving a real browser, and ran the whole platform at **₹0/month** inside free-tier limits.',
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
        studyOnly: true,
      },
    ],
    study: {
      premise:
        'Sixteen screens over 8,100 companies, rebuilt every night and baked into the deployment — and every one of them prints what its backtest actually measured, including the ones with no edge.',
      facts: [
        { label: 'Role', value: 'Sole engineer' },
        { label: 'Built', value: 'Since 2025 — 1,162 commits over 16 months' },
        { label: 'Scale', value: '16 screens, 187 routes, ~106,000 hand-written lines' },
        { label: 'Coverage', value: '8,111 companies from ~23,000 NSE and BSE instruments' },
        { label: 'Stack', value: 'Django 5, Playwright, GitHub Actions, Docker, Render' },
        { label: 'Tests', value: '2,341 — 2,194 offline, 147 in a real browser' },
        { label: 'Budget', value: '512MB host, ₹0 a month' },
        { label: 'Also on', value: 'Google Play, as a trusted web activity' },
      ],
      sections: [
        {
          heading: 'The work is gathering, not analysing',
          body: [
            'Equity research in India is mostly data collection. The numbers sit across four sites that do not agree with each other, each company needs ten to twenty fields pulled by hand, and by the time you have done thirty the market has moved. Nobody checks 8,100.',
            'So the machine does the gathering every night, and the reader only ever opens companies that qualified for something. It screens; it does not advise and it does not place orders. That boundary is a design decision, not a missing feature.',
          ],
        },
        {
          heading: 'The data is a build artifact, not a query',
          body: [
            'End-of-day market data never changes. Yesterday’s prices are final. Anything that never changes can be built in instead of looked up — which is what makes a 512MB host enough.',
            'A nightly GitHub Actions job fetches from every source, runs each of the 16 screens as its own step, writes each result as an atomic JSON snapshot and commits it. That commit triggers a deploy, so the image ships with the data already inside it. Serving a page is then a dictionary lookup: nothing is scraped while a reader waits, and the site cannot be slow because a data provider is slow.',
          ],
          points: [
            'Under 0.3s per page across 8,111 companies, on 512MB.',
            'No API call in the read path, so there are no rate limits to work around.',
            'Rolling back bad data is a redeploy of the previous build.',
            'A provider outage shows up as a slightly old page instead of a broken one.',
          ],
        },
        {
          heading: 'Four numbers that had to be measured, not guessed',
          body: [
            'None of the performance work started as an opinion. Each one began with a number that was unacceptable and ended with the same number taken again.',
            'The worst was a screen that built its default window live, fetching about 850 days of candles per company. It took over 200 seconds, which is past the server’s 120-second timeout — so the worker was killed before it could ever finish and cache the result, and every visitor restarted the same doomed work. As a committed snapshot it answers in 0.7 seconds.',
          ],
          points: [
            'Serve time 200s → 0.7s, by moving the build out of the request.',
            'Time to first byte 0.95s → 0.30s, by encoding each feed once per data version. 0.30s is the India-to-Singapore network floor, so there is nothing left to win.',
            'Memory 62.3MB → 27.2MB per worker, after finding four modules each building their own index of the same instrument list. Two workers measured 675MB and were killed mid-request, which is why production runs one.',
            'Upstream calls ~13,000 → ~3,000 a night, with a build-time shared cache that is guarded so it cannot change any screen’s output.',
          ],
        },
        {
          heading: 'The screens that found nothing — and say so',
          body: [
            'Most trading projects imply an edge and never test for one. This platform runs the backtest and prints the result on the page whether or not the result is flattering.',
            'Several screens measured as no edge, and they still say that in public. Stage 2 breakouts came out at +0.24% over their own 15-day window with a t-statistic of 0.12 — the in-sample half negative, the holdout positive, which is regime rather than skill. The F&O momentum screen wins 29.8% against a 33.3% breakeven, a profit factor of 0.83, and no cost assumption rescues it. A study of a 2013 astrology trading book found 0 of 1,589 rules surviving a multiple-testing correction.',
            'Supporting that in the architecture: there is no combined score and no average anywhere. The screens disagree — two were 44 points apart on the same company on the same day — and they are different ages, so every block prints its own date, and a company missing from a screen means it did not qualify, never sell.',
          ],
        },
        {
          heading: 'A pipeline that starved itself',
          body: [
            'The nightly job ran its test suite before it built the data. Bad data from an upstream failed a test, the failed gate skipped all thirty builds, and the only thing that could have repaired the file was the build that had just been skipped. It left the site on stale data six separate times before I understood the shape of it.',
            'Data-reading tests are now tagged out of that gate, and the gate itself reports without blocking: a red test publishes the data and still turns the run red. "Partial publish, loud failure" was written in the job’s own header the whole time — the gate was the one step disobeying it.',
          ],
        },
        {
          heading: 'A number that was quietly wrong 1,005 times',
          body: [
            'One provider returns NSE history adjusted for splits and bonuses, and BSE history unadjusted. Taking the higher of the two as the all-time high therefore adopted the unadjusted BSE figure, and invented drawdowns that never happened — on 1,005 companies.',
            'Nothing crashed and nothing looked wrong, which is what makes this class of bug worth the story. Every BSE all-time high is now labelled unverified on the page rather than quietly trusted.',
          ],
        },
      ],
      retrospective: [
        'A monitor must not live inside the thing it monitors. When the Actions budget ran out, every workflow died in four seconds, the site served 17-day-old data, and the health check stayed green through all of it because it only ever checked whether the web server was up. There is now a separate staleness endpoint watched from outside GitHub, and alerts that fire only on failure.',
        'Four audit guards passed with the bug deliberately put back. The comment explaining the fix contained the exact string the guard was grepping for, so the guard found its own documentation and went green. Guards now strip comments before matching, and I do not trust a new one until I have made it fail on purpose.',
        'The dependency scan ran before the tests and was set to block. One advisory in a transitive dependency therefore meant a push ran zero tests while the run still looked normal. It is non-blocking now, runs after the tests, and a final always-run step fails the build on its result.',
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
 * once, with nothing to catch it. "Present" cannot go stale, and it says the
 * more useful thing anyway: the project is still alive.
 */
export const projectYears = (project: Project): string =>
  project.ongoing ? `${project.year}–present` : project.year
