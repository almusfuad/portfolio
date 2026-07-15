import { COLLECTIONS, type CaseStudy, getDb } from "@/lib/db"
import { fallbackCaseStudies } from "@/lib/seed-data"

export type CaseStudyDTO = Omit<CaseStudy, "_id"> & { id: string }

function toDTO(doc: CaseStudy): CaseStudyDTO {
  return {
    id: doc._id.toString(),
    title: doc.title,
    category: doc.category,
    problem: doc.problem,
    architecture: doc.architecture,
    impact: doc.impact,
    metrics: doc.metrics,
    order: doc.order,
  }
}

export async function getCaseStudies(): Promise<CaseStudyDTO[]> {
  try {
    const db = await getDb()
    const docs = await db
      .collection<CaseStudy>(COLLECTIONS.caseStudies)
      .find({})
      .sort({ order: 1 })
      .toArray()

    if (docs.length === 0) {
      return fallbackCaseStudies
    }

    return docs.map(toDTO)
  } catch {
    return fallbackCaseStudies
  }
}

export async function getManagedCaseStudies(): Promise<CaseStudyDTO[]> {
  const db = await getDb()
  const docs = await db
    .collection<CaseStudy>(COLLECTIONS.caseStudies)
    .find({})
    .sort({ order: 1 })
    .toArray()
  return docs.map(toDTO)
}
