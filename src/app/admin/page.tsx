import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminLogin } from "@/components/admin/admin-login"
import { isAdmin } from "@/lib/admin-auth"
import { getManagedCaseStudies } from "@/lib/queries"
import { getPortfolioSettings, hasPortfolioSettings } from "@/lib/settings"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin />

  const [settings, caseStudies, hasSavedSettings] = await Promise.all([
    getPortfolioSettings(),
    getManagedCaseStudies(),
    hasPortfolioSettings(),
  ])

  return (
    <AdminDashboard
      initialSettings={settings}
      initialCases={caseStudies}
      hasSavedSettings={hasSavedSettings}
    />
  )
}
