"use server"

import { ObjectId } from "mongodb"
import { revalidatePath } from "next/cache"
import {
  createAdminSession,
  destroyAdminSession,
  passwordIsValid,
  requireAdmin,
} from "@/lib/admin-auth"
import { COLLECTIONS, type CaseStudy, getDb } from "@/lib/db"
import {
  savePortfolioSettings,
  seedPortfolioSettings as seedPortfolioSettingsDb,
  type PortfolioSettings,
} from "@/lib/settings"

export type CaseStudyInput = Omit<CaseStudy, "_id">

export async function loginAdmin(
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  if (!passwordIsValid(password)) {
    return { ok: false, error: "Invalid password" }
  }
  await createAdminSession()
  return { ok: true }
}

export async function logoutAdmin(): Promise<void> {
  await destroyAdminSession()
}

export async function createCaseStudy(
  input: CaseStudyInput,
): Promise<{ id: string }> {
  await requireAdmin()
  const db = await getDb()
  const result = await db.collection<CaseStudy>(COLLECTIONS.caseStudies).insertOne({
    ...input,
    _id: new ObjectId(),
  })
  revalidatePath("/")
  return { id: result.insertedId.toString() }
}

export async function updateCaseStudy(
  id: string,
  input: Partial<CaseStudyInput>,
): Promise<void> {
  await requireAdmin()
  if (!ObjectId.isValid(id)) throw new Error("Invalid case study ID")
  const db = await getDb()
  await db
    .collection<CaseStudy>(COLLECTIONS.caseStudies)
    .updateOne({ _id: new ObjectId(id) }, { $set: input })
  revalidatePath("/")
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await requireAdmin()
  if (!ObjectId.isValid(id)) throw new Error("Invalid case study ID")
  const db = await getDb()
  await db
    .collection<CaseStudy>(COLLECTIONS.caseStudies)
    .deleteOne({ _id: new ObjectId(id) })
  revalidatePath("/")
}

export async function seedCaseStudies(): Promise<{ count: number }> {
  await requireAdmin()
  const { fallbackCaseStudies } = await import("@/lib/seed-data")
  const db = await getDb()
  const collection = db.collection<CaseStudy>(COLLECTIONS.caseStudies)
  const existing = await collection.countDocuments()

  if (existing > 0) {
    return { count: existing }
  }

  const docs = fallbackCaseStudies.map(({ id: _id, ...rest }) => ({
    ...rest,
    _id: new ObjectId(),
  }))

  await collection.insertMany(docs)
  revalidatePath("/")
  return { count: docs.length }
}

export async function updatePortfolioSettings(
  settings: PortfolioSettings,
): Promise<void> {
  await requireAdmin()
  await savePortfolioSettings(settings)
  revalidatePath("/")
  revalidatePath("/admin")
}

export async function seedPortfolioSettings(): Promise<void> {
  await requireAdmin()
  await seedPortfolioSettingsDb()
  revalidatePath("/")
  revalidatePath("/admin")
}
