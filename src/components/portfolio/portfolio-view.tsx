"use client"

import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"
import { Education } from "@/components/portfolio/education"
import { Experience } from "@/components/portfolio/experience"
import { Hero } from "@/components/portfolio/hero"
import { Projects } from "@/components/portfolio/projects"
import { PortfolioShell } from "@/components/portfolio/shell"
import { TechStack } from "@/components/portfolio/tech-stack"
import { Testimonials } from "@/components/portfolio/testimonials"
import type { Profile } from "@/lib/profile"
import type { CaseStudyDTO } from "@/lib/queries"
import type { ThemeSettings } from "@/lib/theme-settings"

type Props = {
  profile: Profile
  theme: ThemeSettings
  caseStudies: CaseStudyDTO[]
}

export function PortfolioView({ profile, theme, caseStudies }: Props) {
  return (
    <PortfolioShell profile={profile} theme={theme}>
      <Hero profile={profile} />
      <About profile={profile} />
      <TechStack profile={profile} />
      <Projects caseStudies={caseStudies} />
      <Experience profile={profile} />
      <Education profile={profile} />
      <Testimonials profile={profile} />
      <Contact profile={profile} />
    </PortfolioShell>
  )
}
