import type { Role } from '@/types/content'

/**
 * Employer work stays here and never appears as a project card — these are
 * products the company owns, not things I can claim as mine.
 */
export const experience: Role[] = [
  {
    company: 'Blueport Solutions',
    title: 'Software Engineer',
    location: 'Pune, India',
    period: 'Aug 2025 — Present',
    highlights: [
      'Own end-to-end delivery of a multi-tenant, white-label SaaS platform serving several tender-management firms from one codebase, with row-level isolation and role-based access control.',
      'Cut average API response time by **70%** through Redis caching, indexing, load balancing and query optimisation.',
      'Built an OCR ingestion pipeline that moved five years of legacy spreadsheets and PDFs into PostgreSQL with zero data loss.',
      'Shipped a RAG pipeline that ingests tender listings and surfaces only the matches inside each client’s domain.',
      'Run the VPS infrastructure on Coolify — SSL/TLS, versioned releases, centralised logging. Automating the release path removed about 20 minutes from every deploy.',
    ],
    product: {
      name: 'Sutram',
      href: 'https://sutram.blueportsolutions.in/',
      image: { src: 'images/sutram.jpg', alt: 'The Sutram product site' },
    },
  },
  {
    company: 'Beginning Solutions',
    title: 'Full Stack Developer',
    location: 'Pune, India',
    period: 'Feb 2024 — Jul 2025',
    highlights: [
      'Delivered **6+ client applications** end to end — scope, architecture, build, deployment and maintenance.',
      'Built REST APIs in Django REST Framework with JWT auth, integrating Razorpay, OpenAI and Google APIs.',
      'Managed hosting for **10+ production applications** on Hostinger VPS and AWS EC2; query optimisation cut page load times by 30%.',
      'Ran full Google Play release cycles — signing, staged rollouts, pre-release testing, and crash and ANR monitoring.',
    ],
  },
]
