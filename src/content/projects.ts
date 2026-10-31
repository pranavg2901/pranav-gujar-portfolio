import type { Project } from '@/types/content'

/**
 * Order matters — this is the order on the page. AgentCV leads because it is
 * live, public and entirely mine.
 *
 * Only projects with a `study` get a /projects/<slug> page; the rest render as
 * a card with no "Case study" link, so adding or removing a study is a content
 * change and nothing else.
 *
 * Copy rule for everything in this file: short sentences, plain words, and no
 * sentence that needs a second read. A recruiter skims this on a phone, and a
 * clever phrase that costs them a re-read costs me the rest of the page.
 */
export const projects: Project[] = [
  {
    slug: 'agentcv',
    name: 'AgentCV',
    year: '2025',
    summary:
      'Builds a resume and cover letter for a specific job out of lines I have already written, then scores how well the role actually fits.',
    highlights: [
      '**Designed, built and shipped it on my own** — first schema to live deployment, and the support after. Live, and I use it every week.',
      'Built a **matching engine that gives the same answer every time**. It ranks my written content against a job description, so every line in the output traces back to a line I wrote.',
      'Made the match score honest: it rates a weak fit low. Tested against job descriptions picked to be a bad match.',
      'Spots tools it has never seen before from the wording around them, so a requirement is never quietly dropped.',
    ],
    tags: [
      { label: 'Shipped solo', emphasis: true },
      { label: 'Flask' },
      { label: 'Playwright' },
      { label: 'WeasyPrint' },
      { label: 'Docker' },
    ],
    links: [{ label: 'Live demo', href: 'https://agentcv-tf7z.onrender.com/', external: true }],
    study: {
      premise:
        'A resume builder that writes nothing of its own. It picks from lines I wrote, orders them for the job, and scores the fit.',
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
            'Rewriting a resume for every application is slow work, and it still matters. The same two years of experience read very differently depending on what you put first. I wanted the tailoring without the retyping.',
            'The easy answer in 2025 is to hand the job description and the resume to a language model. I took a different route, and that one decision shaped the rest of the project.',
          ],
        },
        {
          heading: 'Every line traces back to something I wrote',
          body: [
            'A resume is a factual claim about your own history. When a model rewrites it, small things slip: six months of contract work becomes "led the team", a library you used once becomes a core skill. Then you have to check every line yourself, which is most of the work you were trying to skip.',
            'So the engine writes no sentences. Every sentence in the output already exists, word for word, in a JSON file I keep by hand. The engine only decides which entries to use, what order to put them in, and what to cut so it fits the page.',
          ],
          points: [
            'All content lives in hand-written JSON — version controlled, one file per area.',
            'Matching is scoring over that content, by keyword and by context. Nothing is invented.',
            'The rule is enforced in code, so it cannot slip later.',
          ],
        },
        {
          heading: 'Making the match score mean something',
          body: [
            'The first version of the score was useless. It came back 92–100% for every job description I pasted in, including roles I was clearly not qualified for. A score that is always high tells you nothing, and this one was worse than nothing: it told me to apply everywhere.',
            'The reason was simple. I was measuring how much of my own content made it into the output, instead of how much of the job description my content actually covered. Turning that around made the numbers move, and made a low score possible.',
          ],
        },
        {
          heading: 'Recognising tools it has never seen',
          body: [
            'Job descriptions name tools that no fixed list will ever hold: in-house frameworks, this month’s libraries, plain typos. A dictionary lookup drops them without a word, and that is the worst thing a matching tool can do, because the score still looks fine afterwards.',
            'So unknown words are spotted from the shape of the sentence around them — the wording that marks something as a technology rather than a verb. It is not a model and it is not perfect, but it fails out loud: anything it could not match is shown to me instead of hidden.',
          ],
        },
        {
          heading: 'Storing data on a host that forgets',
          body: [
            'The free tier restarts the container and keeps no disk, so SQLite and local files were out. Paying for a managed Postgres, for a tool I open a few times a week, was not worth the money or the extra thing to look after.',
            'A private GitHub repository turned out to fit this shape of problem: small JSON files, one writer, writes that are rare, and a full history of every change for free. Access sits behind a single six-digit code, which is enough for a tool with one user.',
          ],
        },
      ],
      retrospective: [
        'The score is the part I would build differently from the start. I shipped a number before I had any way to tell whether it was a good number, and because it was always high it looked like it was working. A few deliberately bad job descriptions as test cases would have caught it on day one.',
        'Using GitHub as the database I would do again at this size, and would not defend for a second user. It works because there is no concurrency to get wrong.',
      ],
    },
  },

  {
    slug: 'eigenn',
    name: 'EIGENN',
    year: '2026',
    summary:
      'AI answer-evaluation platform for competitive-exam institutes. A human reviewer approves every AI result before a student sees it.',
    highlights: [
      'Built a **17-node LangGraph pipeline** that checks its own working, names every way it can fail, and resumes from any node instead of starting over.',
      'Built search over **120K+ chunks** with BGE-M3 and cross-encoder reranking, shrunk to ONNX INT8 so it runs on an ordinary CPU in 300MB — taking GPU cost out of the platform entirely.',
      'Run 10+ containerised services on a private IPv6 network, with long jobs handled by Temporal.',
      'Built payments on an append-only ledger where a retry never charges twice, backed by 150+ tests on the ways it can go wrong.',
    ],
    tags: [
      { label: 'Production AI', emphasis: true },
      { label: 'FastAPI' },
      { label: 'LangGraph' },
      { label: 'Temporal' },
      { label: 'ONNX' },
      { label: 'React' },
    ],
    links: [{ label: 'Live demo', href: 'https://demo.eigenn.in/', external: true }],
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
          ],
        },
        {
          heading: 'Search that fits on a CPU',
          body: [
            'Search runs over more than 120,000 chunks of reference material, embedded with BGE-M3 and then reranked by a cross-encoder. Reranking is the step that separates roughly relevant passages from the right one.',
            'Running that on GPUs would have been the easy choice and a bill every month. Shrinking the models to ONNX INT8 got the whole search stack into about 300MB of RAM on ordinary CPU machines. Accuracy dropped a little. The cost dropped a lot.',
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
    year: '2025–26',
    summary:
      'Market screening across NSE, BSE, F&O and mutual funds, running fifteen rule-based strategies over roughly 22,000 instruments.',
    highlights: [
      'Answers across **~22,000 instruments in under 0.3s** on a 512MB host, by building the market data into each deployment.',
      'Automated the data pipeline with scheduled GitHub Actions, so nothing external is called while a user waits and a provider outage never reaches them.',
      'Backtested all fifteen strategies in Pytest and pinned the valuation models to golden tests, so a refactor cannot change a number without a test saying so.',
    ],
    tags: [
      { label: 'Sub-300ms', emphasis: true },
      { label: 'Django 5' },
      { label: 'Playwright' },
      { label: 'GitHub Actions' },
      { label: 'Docker' },
    ],
    links: [
      { label: 'Live demo', href: 'https://algo-trading-lq8e.onrender.com/', external: true },
    ],
    study: {
      premise:
        'End-of-day market data never changes again, so the screener builds it in rather than fetching it.',
      facts: [
        { label: 'Role', value: 'Sole engineer' },
        { label: 'Built', value: '2025–26' },
        { label: 'Stack', value: 'Django 5, Playwright, GitHub Actions, Docker' },
        { label: 'Coverage', value: 'NSE, BSE, F&O, mutual funds — ~22,000 instruments' },
        { label: 'Budget', value: '512MB host' },
      ],
      sections: [
        {
          heading: 'Fast answers on a 512MB host',
          body: [
            'A screener reads a lot, in bursts, and then sits idle between market sessions. Paying for a database and a data feed to do nothing overnight made no sense for a personal tool. But neither did a screener that takes six seconds to answer a question.',
            'The thing that unlocked it: end-of-day market data never changes. Yesterday’s prices are final. Anything that never changes can be built in instead of looked up.',
          ],
        },
        {
          heading: 'Data as a build step',
          body: [
            'Scheduled GitHub Actions collect prices, fundamentals and corporate actions, tidy them into shape, and commit the result into the image that gets deployed. Serving a request then means reading local, ready-made data and calling nothing over the network.',
            'That removes both usual reasons a screener is slow or flaky: no API call per request, and no database connections to run out of. It also means a data-provider outage shows up as a slightly old page instead of a broken one.',
          ],
          points: [
            'Under 0.3s across ~22,000 instruments on a 512MB host.',
            'Nothing external while a user waits, so there are no rate limits to work around.',
            'Rolling back bad data is a redeploy of the previous build.',
          ],
        },
        {
          heading: 'Testing strategies that have a right answer',
          body: [
            'Fifteen rule-based strategies and a set of valuation models are exactly the code that goes wrong quietly. A flipped sign or an off-by-one window still produces numbers that look believable, so nothing warns you.',
            'So each strategy is backtested in Pytest over known historical windows, and the valuation models are checked against spreadsheets I had already worked out by hand, then pinned as golden tests. If a refactor changes a number, the test says so before the screener does.',
          ],
        },
        {
          heading: 'What it does not do',
          body: [
            'It screens. It does not give advice and it does not trade. The strategies are published rules applied consistently, which is useful for narrowing a list of instruments and nothing more. Keeping that line clear was a design decision, not a disclaimer added at the end.',
          ],
        },
      ],
    },
  },
]

export const projectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug)
