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
      'Own the delivery of a white-label SaaS platform that serves several tender-management firms from one codebase, with each client’s data kept separate and access set by role.',
      'Cut the average API response time by **70%** with Redis caching, indexing, load balancing and faster queries.',
      'Built an OCR pipeline that moved five years of old spreadsheets and PDFs into PostgreSQL without losing a row.',
      'Built a RAG pipeline that reads tender listings and shows each client only the ones in their own field.',
      'Run the VPS setup on Coolify — SSL/TLS, versioned releases, logging in one place. Automating the release steps took about 20 minutes off every deploy.',
    ],
    product: 'sutram',
  },
  {
    company: 'Beginning Solutions',
    title: 'Full Stack Developer',
    location: 'Pune, India',
    period: 'Feb 2024 — Jul 2025',
    highlights: [
      'Delivered **6+ client applications** end to end — scope, design, build, deployment and maintenance.',
      'Built REST APIs in Django REST Framework with JWT auth, wired up to Razorpay, OpenAI and Google APIs.',
      'Managed hosting for **10+ live applications** on Hostinger VPS and AWS EC2; faster queries cut page load times by 30%.',
      'Ran full Google Play release cycles — signing, staged rollouts, pre-release testing, and crash and ANR monitoring.',
      'Migrated a production database off a legacy schema with Python written for the job, keeping every existing user record intact.',
    ],
    product: 'dmfu',
  },
]
