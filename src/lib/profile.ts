export type TechGroup = {
  label: string
  items: string[]
}

export type Experience = {
  company: string
  role: string
  period: string
  highlight: string
}

export type Education = {
  school: string
  degree: string
  period: string
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export type Profile = {
  name: string
  title: string
  subtitle: string
  location: string
  availability: string
  about: string[]
  techStack: TechGroup[]
  experience: Experience[]
  education: Education[]
  testimonials: Testimonial[]
  contact: {
    email: string
    github: string
    linkedin: string
    note: string
  }
}

export const profile: Profile = {
  name: "Fuad Hassan",
  title: "Systems Architect",
  subtitle: "Senior Data Engineer · High-Throughput Pipelines",
  location: "Remote · EU / MENA",
  availability: "Open to senior architect & staff data roles · Q3 2026",
  about: [
    "I design and ship serverless data platforms — event ingestion cores, real-time monitoring layers, and MongoDB-backed delivery pipelines that stay fast under production load. My work sits at the intersection of systems engineering and data infrastructure: schema design, request-time Server Components, and mutation paths secured at the edge.",
    "This portfolio is the live system — case studies below are loaded from MongoDB Atlas on every request. No client-side loaders, no shadow CMS. Flat grids, 1px borders, measurable impact only.",
  ],
  techStack: [
    {
      label: "Languages I Ship in Production",
      items: ["TypeScript", "Python", "SQL", "Bash"],
    },
    {
      label: "Distributed Systems & Data",
      items: ["MongoDB Atlas", "Kafka", "Redis", "ClickHouse", "Airflow"],
    },
    {
      label: "Cloud & Deployment",
      items: ["Azure", "Vercel", "Docker", "Terraform", "GitHub Actions"],
    },
    {
      label: "Engineering Practice",
      items: ["Next.js App Router", "Server Actions", "Observability", "RFC-driven design"],
    },
  ],
  experience: [
    {
      company: "Industrial IoT Platform",
      role: "Lead Data Engineer",
      period: "2022 — Present",
      highlight:
        "Cut end-to-end flow alert latency from 240ms p99 to 38ms by redesigning the ingestion fan-out and Atlas read path.",
    },
    {
      company: "Fintech Ledger Core",
      role: "Senior Backend Engineer",
      period: "2019 — 2022",
      highlight:
        "Owned a 1.2B events/day pipeline with 99.97% uptime over 30 months; authored three cross-team RFCs on idempotent writes.",
    },
    {
      company: "Analytics Consultancy",
      role: "Data Engineer",
      period: "2016 — 2019",
      highlight:
        "Migrated twelve client warehouses to streaming-first architectures; mentored four junior engineers into production owners.",
    },
  ],
  education: [
    {
      school: "University of Engineering & Technology",
      degree: "B.Sc. Computer Science",
      period: "2012 — 2016",
    },
  ],
  testimonials: [
    {
      quote:
        "Fuad's architecture reviews are the reason our ingestion layer survived Black Friday without a pager.",
      name: "Sara Lindgren",
      role: "VP Engineering · Nordic Retail Tech",
    },
    {
      quote:
        "Rare engineer who writes the RFC, ships the pipeline, and documents the runbook in the same sprint.",
      name: "Omar Khalid",
      role: "Staff Engineer · Payments Platform",
    },
    {
      quote:
        "His MongoDB schema decisions held up two years later — zero migration debt when we 10×'d traffic.",
      name: "Elena Voss",
      role: "Principal Architect · Open Data Collective",
    },
  ],
  contact: {
    email: "hello@fuadhassan.dev",
    github: "https://github.com/fuadhassan",
    linkedin: "https://linkedin.com/in/fuadhassan",
    note: "Email for senior roles, architecture reviews, or pipeline audits. No contact form — one clear next step.",
  },
}

export const navSections = [
  { id: "hero", label: "home" },
  { id: "about", label: "about" },
  { id: "stack", label: "stack" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "education", label: "education" },
  { id: "testimonials", label: "testimonials" },
  { id: "contact", label: "contact" },
] as const
