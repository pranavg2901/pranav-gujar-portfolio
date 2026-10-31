import type { Project } from '@/types/content'

/**
 * Order matters — this is the order on the page. AgentCV leads because it is
 * live, public and entirely mine.
 *
 * Only projects with a `study` get a /projects/<slug> page; the rest render as
 * a card with no "Case study" link, so adding or removing a study is a content
 * change and nothing else.
 */
export const projects: Project[] = [
  {
    slug: 'agentcv',
    name: 'AgentCV',
    year: '2025',
    summary:
      'Assembles a job-tailored resume and cover letter by matching hand-written content against a pasted job description, then reports how well the role actually fits.',
    highlights: [
      '**No LLM anywhere.** Nothing is generated — the engine only selects, ranks and reorders content I wrote myself. The rule is enforced in code, not by convention.',
      'Rewrote match confidence after the first version scored **92–100% on every job**, including the ones that were a poor fit.',
      'Recognises technologies the vocabulary has never seen, from surrounding context rather than a dictionary or a model.',
      'A private GitHub repository is the database — the free hosting tier gives you no disk that survives a restart.',
    ],
    tags: [
      { label: 'No LLM', emphasis: true },
      { label: 'Flask' },
      { label: 'Playwright' },
      { label: 'WeasyPrint' },
      { label: 'Docker' },
    ],
    links: [{ label: 'Live demo', href: 'https://agentcv-tf7z.onrender.com/', external: true }],
    image: { src: 'images/agentcv.jpg', alt: 'The AgentCV landing page' },
    study: {
      premise:
        'A resume builder that refuses to write anything. It only decides what to show, in what order, and tells you honestly how close the match is.',
      facts: [
        { label: 'Role', value: 'Sole engineer — design, build, deploy, operate' },
        { label: 'Built', value: '2025' },
        { label: 'Stack', value: 'Flask, Jinja, vanilla JS, WeasyPrint, Playwright, Docker' },
        { label: 'Hosting', value: 'Free tier, behind gunicorn' },
        { label: 'Status', value: 'Live, in weekly use by me' },
      ],
      sections: [
        {
          heading: 'Why I built it',
          body: [
            'Tailoring a resume for every application is slow, repetitive work that nonetheless matters: the same two years of experience read very differently depending on which parts you lead with. I wanted the tailoring without the retyping.',
            'The obvious 2025 answer is to hand a job description and a resume to a language model. I deliberately did not do that, and that single decision shaped everything else in the project.',
          ],
        },
        {
          heading: 'The constraint: no generation',
          body: [
            'A resume is a factual claim about your own history. If a model paraphrases it, the output drifts — a six-month contract becomes "led", a library you touched once becomes a core skill. You then have to proof-read every line, which is most of the work you were trying to avoid.',
            'So the engine never writes prose. Every sentence in the output exists verbatim in a JSON file I maintain by hand. The engine only chooses which entries to include, how to order them, and which to cut to fit the page.',
          ],
          points: [
            'Content lives in structured JSON — hand-written, version-controlled, one file per domain.',
            'Matching is lexical and contextual scoring over that content, not inference.',
            'The no-generation rule is asserted in code, so it cannot quietly erode later.',
          ],
        },
        {
          heading: 'The scoring bug worth admitting',
          body: [
            'The first match-confidence metric was useless. It returned 92–100% for every job description I pasted in, including roles I was plainly unqualified for. A score that is always high carries no information, and this one was actively misleading — it told me to apply everywhere.',
            'The cause was straightforward in hindsight. I was measuring how much of my own content found a home in the output, rather than how much of the job description my content actually covered. Flipping the denominator made the numbers move, and made a low score possible.',
          ],
        },
        {
          heading: 'Recognising unfamiliar technologies',
          body: [
            'Job descriptions name tools no fixed vocabulary will ever contain: internal frameworks, this quarter’s libraries, outright misspellings. A dictionary lookup drops them silently, and silently dropping a requirement is the worst failure mode a matching tool has, because the score still looks fine afterwards.',
            'Instead, unknown terms are identified from the shape of the sentence around them — the phrasing that marks something as a technology rather than a verb. It is not a model and it is not perfect, but it fails loudly: unmatched requirements get surfaced rather than ignored.',
          ],
        },
        {
          heading: 'Persistence on a disposable host',
          body: [
            'The free tier restarts containers and keeps no disk, which rules out SQLite and local files. Standing up a managed Postgres for a single-user tool I open a few times a week was not worth the cost or the operational surface.',
            'A private GitHub repository turned out to be a reasonable database for this shape of problem: small JSON documents, exactly one writer, writes that are rare, and a complete history of every change for free. Access is gated behind a single six-digit code, which is proportionate for a tool with one user.',
          ],
        },
      ],
      retrospective: [
        'The confidence metric is the part I would build differently from the start. I shipped a number before I had any way to tell whether it was a good number, and because it was always high it looked like it was working. A handful of deliberately bad job descriptions as fixtures would have caught it on day one.',
        'The GitHub-as-database decision I would make again at this scale, and would not defend for a second user. It works precisely because there is no concurrency to get wrong.',
      ],
    },
  },

  {
    slug: 'eigenn',
    name: 'EIGENN',
    year: '2026',
    summary:
      'AI answer-evaluation platform for competitive-exam institutes. A human reviewer approves every AI result before a student ever sees it.',
    highlights: [
      '**17-node LangGraph pipeline** with cyclic self-review, typed failure states, and checkpoint and resume at every node.',
      'RAG over **120K+ chunks** using BGE-M3 with cross-encoder reranking, quantised to ONNX INT8 so it runs on CPU in 300MB — no GPU bill.',
      '10+ containerised services on a private IPv6 mesh, with long-running work handed to Temporal.',
      'Idempotent payments over an append-only ledger, covered by 150+ tests aimed at the failure states.',
    ],
    tags: [
      { label: 'Human approval', emphasis: true },
      { label: 'FastAPI' },
      { label: 'LangGraph' },
      { label: 'Temporal' },
      { label: 'ONNX' },
      { label: 'React' },
    ],
    links: [],
    study: {
      premise:
        'Grading is a decision about a person. The pipeline does the reading; a human signs the result.',
      facts: [
        { label: 'Domain', value: 'Answer evaluation for competitive-exam institutes' },
        { label: 'Built', value: '2026' },
        { label: 'Stack', value: 'FastAPI, LangGraph, Temporal, ONNX, PostgreSQL, React' },
        { label: 'Scale', value: '120K+ indexed chunks, 10+ services' },
      ],
      sections: [
        {
          heading: 'Approval is the architecture',
          body: [
            'An evaluation platform that posts machine-generated marks straight to a student is a liability, not a product. Institutes stake their reputation on their grading, and one confidently wrong score costs more trust than a hundred correct ones earn.',
            'So the pipeline never produces a verdict. It produces a draft with its reasoning attached, and a human reviewer approves, edits or rejects it — only the approved version is published. That turns the AI from an authority into a very fast first reader, which is the job it is actually good at.',
          ],
        },
        {
          heading: 'A pipeline that can fail in named ways',
          body: [
            'The evaluation flow is 17 nodes in LangGraph, including cycles where the pipeline reviews its own intermediate output before continuing. Cycles matter here because a first pass over a handwritten answer is often wrong in a way a second pass catches.',
            'Every node checkpoints, so a failure resumes rather than restarts, and failure states are typed rather than thrown as generic errors. A pipeline that can only report that something went wrong is a pipeline nobody can operate.',
          ],
          points: [
            'Typed failure states — each one has a defined owner and recovery path.',
            'Per-node checkpoint and resume, so a partial run is not wasted work.',
            'Long-running orchestration on Temporal rather than inside request handlers.',
          ],
        },
        {
          heading: 'Retrieval that fits on a CPU',
          body: [
            'Retrieval runs over more than 120,000 chunks of reference material, embedded with BGE-M3 and reranked by a cross-encoder. Reranking is the step that separates roughly relevant passages from the right one.',
            'Doing that on GPUs would have been the straightforward choice and a permanent line item. Quantising the models to ONNX INT8 brought the whole retrieval stack inside about 300MB of RAM on ordinary CPU hosts. The accuracy cost was small; the shape of the cost curve changed completely.',
          ],
        },
        {
          heading: 'Money needs a different standard',
          body: [
            'Payments are the one area where a retry must never become a second charge. Writes go through an append-only ledger and every operation is idempotent, so a duplicated webhook or a client that double-taps settles to the same balance.',
            'The 150+ tests around this area are mostly not happy-path tests. They cover the duplicate callback, the timeout mid-write, the out-of-order delivery — the states that only show up in production if you have not written them down first.',
          ],
        },
      ],
    },
  },

  {
    slug: 'algopy',
    name: 'AlgoPy',
    year: '2025–26',
    summary:
      'Market screening across NSE, BSE, F&O and mutual funds, running fifteen rule-based strategies over roughly 22,000 instruments.',
    highlights: [
      'Serves **~22,000 instruments in under 0.3s** on a 512MB host by baking the market data into each deployment.',
      'Scheduled GitHub Actions refresh prices, fundamentals and corporate actions — there is no external API call at serve time.',
      'All fifteen strategies are backtested in Pytest; valuation models are pinned to golden tests checked against spreadsheets.',
    ],
    tags: [
      { label: 'No API at serve time', emphasis: true },
      { label: 'Django 5' },
      { label: 'Playwright' },
      { label: 'GitHub Actions' },
      { label: 'Docker' },
    ],
    links: [
      { label: 'Live demo', href: 'https://algo-trading-lq8e.onrender.com/', external: true },
    ],
    image: { src: 'images/algopy.jpg', alt: 'The AlgoPy screener landing page' },
    study: {
      premise:
        'End-of-day market data never changes, so the screener treats it as a build artifact rather than a live dependency.',
      facts: [
        { label: 'Role', value: 'Sole engineer' },
        { label: 'Built', value: '2025–26' },
        { label: 'Stack', value: 'Django 5, Playwright, GitHub Actions, Docker' },
        { label: 'Coverage', value: 'NSE, BSE, F&O, mutual funds — ~22,000 instruments' },
        { label: 'Budget', value: '512MB host' },
      ],
      sections: [
        {
          heading: 'The constraint: 512MB and no budget',
          body: [
            'A screener is read-heavy, bursty, and completely idle between market sessions. Paying for a database and a data feed to sit unused overnight made no sense for a personal tool — but neither did a screener that takes six seconds to answer a question.',
            'The observation that unlocked it: end-of-day market data is immutable. Yesterday’s prices will not change. Anything immutable can be a build artifact instead of a query.',
          ],
        },
        {
          heading: 'Data as a build step',
          body: [
            'Scheduled GitHub Actions collect prices, fundamentals and corporate actions, normalise them, and commit the result into the image that gets deployed. At serve time the application reads local, pre-shaped data and calls nothing over the network.',
            'That removes both usual sources of screener latency and flakiness in one move — no per-request API calls, and no database connection pool to exhaust. It also means a data-provider outage shows up as a stale page rather than a broken one.',
          ],
          points: [
            'Sub-0.3s responses across ~22,000 instruments on a 512MB host.',
            'Nothing external in the request path, so there are no rate limits to respect.',
            'Rolling back bad data is a redeploy of the previous build.',
          ],
        },
        {
          heading: 'Testing strategies that have a right answer',
          body: [
            'Fifteen rule-based strategies and a set of valuation models are exactly the kind of code that drifts silently: a sign error or an off-by-one window still produces plausible-looking output, so nothing alerts you.',
            'Each strategy is backtested in Pytest against known historical windows, and the valuation models are checked against spreadsheets I had already worked through by hand, then pinned as golden tests. When a refactor changes a number, the test says so before the screener does.',
          ],
        },
        {
          heading: 'What it is not',
          body: [
            'It screens; it does not advise and it does not trade. The strategies are published rules applied consistently, which is useful for narrowing a list of instruments and nothing more. Keeping that boundary explicit was a design decision, not a disclaimer bolted on afterwards.',
          ],
        },
      ],
    },
  },
]

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)
