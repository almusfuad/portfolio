"use client"

import { useMemo } from "react"
import { PortfolioView } from "@/components/portfolio/portfolio-view"
import type { Profile } from "@/lib/profile"
import type { CaseStudyDTO } from "@/lib/queries"
import type { ThemeSettings } from "@/lib/theme-settings"

type Props = {
  profile: Profile
  theme: ThemeSettings
  caseStudies: CaseStudyDTO[]
}

export function AdminPreview({ profile, theme, caseStudies }: Props) {
  const profileJson = useMemo(
    () => JSON.stringify(profile, null, 2),
    [profile],
  )

  function downloadJson() {
    const blob = new Blob([profileJson], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "profile.json"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  function copyJson() {
    void navigator.clipboard.writeText(profileJson)
  }

  return (
    <div className="admin-preview-layout">
      <section className="admin-panel preview-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="admin-command">$ portfolio --preview</span>
            <h2>Final view</h2>
          </div>
          <div className="admin-header-actions">
            <button type="button" className="secondary" onClick={copyJson}>
              Copy JSON
            </button>
            <button type="button" onClick={downloadJson}>
              Download profile.json
            </button>
          </div>
        </div>
        <p className="admin-help">
          This is the live portfolio render using your current unsaved edits.
          Save from the Edit tab to persist everything to MongoDB.
        </p>
        <div className="preview-frame">
          <PortfolioView profile={profile} theme={theme} caseStudies={caseStudies} />
        </div>
      </section>

      <section className="admin-panel json-panel">
        <span className="admin-command">$ cat profile.json</span>
        <h2>Generated profile JSON</h2>
        <pre className="json-output">{profileJson}</pre>
      </section>
    </div>
  )
}
