"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { loginAdmin } from "@/app/actions"

export function AdminLogin() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setPending(true)
    setError("")
    try {
      const result = await loginAdmin(password)
      if (!result.ok) {
        setError(result.error ?? "Login failed")
        return
      }
      router.refresh()
    } catch {
      setError("Unable to sign in")
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="admin-login">
      <form className="admin-login-card" onSubmit={submit}>
        <span className="admin-command">$ sudo portfolio-admin</span>
        <h1>Admin access</h1>
        <p>Use the password configured in ADMIN_PASSWORD.</p>
        <label htmlFor="admin-password">Password</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          autoFocus
        />
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" disabled={pending}>
          {pending ? "Authenticating…" : "Sign in"}
        </button>
      </form>
    </main>
  )
}
