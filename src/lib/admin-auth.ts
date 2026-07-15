import "server-only"

import { createHmac, timingSafeEqual } from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "portfolio_admin"
const SESSION_SECONDS = 60 * 60 * 8

function secret(): string {
  const value = process.env.ADMIN_PASSWORD
  if (!value) throw new Error("ADMIN_PASSWORD is not configured")
  return value
}

function sign(expiresAt: string): string {
  return createHmac("sha256", secret()).update(expiresAt).digest("base64url")
}

export async function createAdminSession(): Promise<void> {
  const expiresAt = String(Date.now() + SESSION_SECONDS * 1000)
  const token = `${expiresAt}.${sign(expiresAt)}`
  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  })
}

export async function destroyAdminSession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function isAdmin(): Promise<boolean> {
  const token = (await cookies()).get(COOKIE_NAME)?.value
  if (!token) return false

  const [expiresAt, signature] = token.split(".")
  if (!expiresAt || !signature || Number(expiresAt) <= Date.now()) return false

  const expected = sign(expiresAt)
  const actualBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expected)
  return (
    actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer)
  )
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) throw new Error("Unauthorized")
}

export function passwordIsValid(password: string): boolean {
  const expected = Buffer.from(secret())
  const actual = Buffer.from(password)
  return expected.length === actual.length && timingSafeEqual(expected, actual)
}
