import { PortfolioView } from "@/components/portfolio/portfolio-view"
import { getCaseStudies } from "@/lib/queries"
import { getPortfolioSettings } from "@/lib/settings"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [caseStudies, settings] = await Promise.all([
    getCaseStudies(),
    getPortfolioSettings(),
  ])

  return (
    <PortfolioView
      profile={settings.profile}
      theme={settings.theme}
      caseStudies={caseStudies}
    />
  )
}
