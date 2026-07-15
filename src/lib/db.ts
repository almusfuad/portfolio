import { MongoClient, type Db, type ObjectId } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME ?? "portfolio"

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in environment variables")
}

/** Core `case_studies` collection schema (architecture-manifest). */
export type CaseStudy = {
  _id: ObjectId
  title: string
  category: string
  problem: string
  architecture: string
  impact: string
  metrics: string
  order: number
}

export const COLLECTIONS = {
  caseStudies: "case_studies",
  settings: "settings",
} as const

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(MONGODB_URI)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  const client = new MongoClient(MONGODB_URI)
  clientPromise = client.connect()
}

/** Returns a connected MongoDB database handle for server-side data access. */
export async function getDb(): Promise<Db> {
  const client = await clientPromise
  return client.db(MONGODB_DB_NAME)
}
