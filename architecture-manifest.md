# Architectural Matrix Portfolio - System Manifest

## System Design Goals
* **Positioning:** High-end Systems Architect & Senior Data Engineer portfolio.
* **UI Vibe:** Dark theme, minimalist, high structural contrast. Use 1px borders, zero box shadows, flat layout grids.
* **Backend Pipeline:** Completely serverless. Next.js Server Components pull content directly from MongoDB Atlas at request time. No client-side loaders.
* **Data Mutation:** Direct Next.js Server Actions secured via `ADMIN_PASSWORD` environment verification.

## Core Schema Structure (Collection: `case_studies`)
* `_id`: ObjectId
* `title`: string (e.g., "Real-Time Industrial Flow Monitoring Core")
* `category`: string (e.g., "High-Throughput Ingestion Layer")
* `problem`: string (Deep-dive technical challenge description)
* `architecture`: string (System engineering/pipeline implementation)
* `impact`: string (Business metrics or performance parameters)
* `metrics`: string (e.g., "Single-digit ms delivery")
* `order`: number (For layout tracking hierarchy)