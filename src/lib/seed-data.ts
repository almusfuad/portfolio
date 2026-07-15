import type { CaseStudyDTO } from "@/lib/queries"

/** Shown when Atlas is empty or unreachable — mirrors architecture-manifest schema. */
export const fallbackCaseStudies: CaseStudyDTO[] = [
  {
    id: "seed-1",
    title: "Real-Time Industrial Flow Monitoring Core",
    category: "High-Throughput Ingestion Layer",
    problem:
      "Plant operators needed sub-second visibility into 40k sensor events/sec without overloading the legacy SCADA bridge.",
    architecture:
      "Kafka ingress → stream processor → MongoDB Atlas time-series collections → Next.js Server Components at request time.",
    impact:
      "Eliminated batch lag for floor supervisors; unified alerting into a single operational pane.",
    metrics: "Single-digit ms delivery · 40k events/sec sustained",
    order: 1,
  },
  {
    id: "seed-2",
    title: "Serverless Portfolio CMS",
    category: "Edge-Native Content Pipeline",
    problem:
      "Static case-study pages required redeploys for every copy change; editors needed a secure mutation path without a separate admin UI host.",
    architecture:
      "MongoDB Atlas case_studies collection · Next.js Server Actions gated by ADMIN_PASSWORD · zero client-side loaders.",
    impact:
      "Content updates propagate on next request; attack surface reduced to a single serverless surface.",
    metrics: "0 client bundles for data fetch · <50ms Atlas read",
    order: 2,
  },
  {
    id: "seed-3",
    title: "Multi-Region Payment Ledger Migration",
    category: "Distributed Consistency Layer",
    problem:
      "Cross-region ledger reads exhibited 240ms p99 during settlement windows, blocking reconciliation SLAs.",
    architecture:
      "Rust write path · regional read replicas · idempotent consumer groups · observability via distributed traces.",
    impact:
      "p99 read latency dropped to 38ms; settlement batch window shortened by 4 hours.",
    metrics: "240ms → 38ms p99 · 99.97% uptime over 30 months",
    order: 3,
  },
  {
    id: "seed-4",
    title: "Engineering Blog — Pipeline Deep Dives",
    category: "Technical Writing",
    problem:
      "Hiring managers needed verifiable depth beyond NDA-bound employer work.",
    architecture:
      "Long-form posts on ingestion design, schema evolution, and Atlas indexing — cited in HN and internal RFC threads.",
    impact:
      "Higher recruiter conversion on roles requiring systems design interviews.",
    metrics: "3 posts · 12k+ combined reads",
    order: 4,
  },
]
