"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import {
  createCaseStudy,
  deleteCaseStudy,
  logoutAdmin,
  seedCaseStudies,
  seedPortfolioSettings,
  updateCaseStudy,
  updatePortfolioSettings,
  type CaseStudyInput,
} from "@/app/actions"
import { AdminPreview } from "@/components/admin/admin-preview"
import { ProfileEditor } from "@/components/admin/profile-editor"
import type { Profile } from "@/lib/profile"
import type { CaseStudyDTO } from "@/lib/queries"
import {
  THEME_FIELDS,
  type PortfolioSettings,
  type ThemeSettings,
} from "@/lib/theme-settings"

type Props = {
  initialSettings: PortfolioSettings
  initialCases: CaseStudyDTO[]
  hasSavedSettings: boolean
}

type Tab = "edit" | "preview" | "cases" | "theme"

const emptyCase: CaseStudyInput = {
  title: "",
  category: "",
  problem: "",
  architecture: "",
  impact: "",
  metrics: "",
  order: 1,
}

function normalizeHex(value: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"
}

export function AdminDashboard({
  initialSettings,
  initialCases,
  hasSavedSettings,
}: Props) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>("edit")
  const [settings, setSettings] = useState(initialSettings)
  const [cases, setCases] = useState(initialCases)
  const [draft, setDraft] = useState<CaseStudyInput>({
    ...emptyCase,
    order: initialCases.length + 1,
  })
  const [status, setStatus] = useState("")
  const [pending, setPending] = useState(false)

  const previewStyle = useMemo(
    () =>
      ({
        "--preview-bg": settings.theme.background,
        "--preview-surface": settings.theme.surface,
        "--preview-border": settings.theme.border,
        "--preview-muted": settings.theme.muted,
        "--preview-primary": settings.theme.primary,
        "--preview-secondary": settings.theme.secondary,
        "--preview-text": settings.theme.text,
      }) as React.CSSProperties,
    [settings.theme],
  )

  async function run(task: () => Promise<void>, success: string) {
    setPending(true)
    setStatus("")
    try {
      await task()
      setStatus(success)
      router.refresh()
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Operation failed")
    } finally {
      setPending(false)
    }
  }

  function changeTheme(key: keyof ThemeSettings, value: string) {
    setSettings((current) => ({
      ...current,
      theme: { ...current.theme, [key]: value },
    }))
  }

  function changeProfile(profile: Profile) {
    setSettings((current) => ({ ...current, profile }))
  }

  async function saveSettings() {
    await run(
      () => updatePortfolioSettings(settings),
      "Portfolio saved to MongoDB",
    )
  }

  async function addCase() {
    await run(async () => {
      const result = await createCaseStudy(draft)
      setCases((current) => [...current, { ...draft, id: result.id }])
      setDraft({ ...emptyCase, order: draft.order + 1 })
    }, "Case study created")
  }

  function editCase(id: string, key: keyof CaseStudyInput, value: string | number) {
    setCases((current) =>
      current.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    )
  }

  return (
    <main className="admin-page" style={previewStyle}>
      <header className="admin-header">
        <div>
          <span className="admin-command">$ portfolio-admin --edit</span>
          <h1>Portfolio control center</h1>
        </div>
        <div className="admin-header-actions">
          <a href="/" target="_blank" rel="noreferrer">
            Live site ↗
          </a>
          <button
            type="button"
            className="secondary"
            onClick={() => run(logoutAdmin, "Signed out").then(() => router.refresh())}
          >
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin-tabs">
        {(
          [
            ["edit", "Edit content"],
            ["preview", "Preview"],
            ["cases", "Case studies"],
            ["theme", "Colors"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? "active" : "secondary"}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
        <button type="button" onClick={saveSettings} disabled={pending}>
          Save to MongoDB
        </button>
      </nav>

      {status && <div className="admin-status">{status}</div>}

      {!hasSavedSettings && (
        <div className="admin-panel seed-banner">
          <p>No portfolio document exists in MongoDB yet. Edit below, then save — or seed defaults now.</p>
          <button
            type="button"
            className="secondary"
            disabled={pending}
            onClick={() => run(seedPortfolioSettings, "Default portfolio seeded to MongoDB")}
          >
            Seed defaults
          </button>
        </div>
      )}

      {tab === "edit" && (
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-command">$ edit profile</span>
              <h2>Profile sections</h2>
            </div>
          </div>
          <ProfileEditor profile={settings.profile} onChange={changeProfile} />
        </section>
      )}

      {tab === "preview" && (
        <AdminPreview
          profile={settings.profile}
          theme={settings.theme}
          caseStudies={cases}
        />
      )}

      {tab === "theme" && (
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-command">$ theme --configure</span>
              <h2>Color controls</h2>
            </div>
          </div>
          <div className="color-grid">
            {THEME_FIELDS.map(({ key, label }) => (
              <label key={key} className="color-control">
                <span>{label}</span>
                <div>
                  <input
                    type="color"
                    value={normalizeHex(settings.theme[key])}
                    onChange={(event) => changeTheme(key, event.target.value)}
                    aria-label={`${label} color picker`}
                  />
                  <input
                    value={settings.theme[key]}
                    onChange={(event) => changeTheme(key, event.target.value)}
                    placeholder="#000000"
                    pattern="^#[0-9a-fA-F]{6}$"
                    spellCheck={false}
                    aria-label={`${label} hex code`}
                  />
                </div>
              </label>
            ))}
          </div>
          <div className="theme-preview">
            <span>user@portfolio:~$</span> Dynamic theme preview
            <strong> █</strong>
          </div>
        </section>
      )}

      {tab === "cases" && (
        <section className="admin-panel">
          <div className="admin-panel-heading">
            <div>
              <span className="admin-command">$ mongo case_studies</span>
              <h2>Project briefs and case studies</h2>
            </div>
            {cases.length === 0 && (
              <button
                type="button"
                className="secondary"
                disabled={pending}
                onClick={() =>
                  run(async () => {
                    await seedCaseStudies()
                  }, "Default case studies seeded")
                }
              >
                Seed defaults
              </button>
            )}
          </div>

          <div className="case-list">
            {cases.map((study) => (
              <CaseEditor
                key={study.id}
                study={study}
                disabled={pending}
                onChange={(key, value) => editCase(study.id, key, value)}
                onSave={() =>
                  run(
                    () =>
                      updateCaseStudy(study.id, {
                        title: study.title,
                        category: study.category,
                        problem: study.problem,
                        architecture: study.architecture,
                        impact: study.impact,
                        metrics: study.metrics,
                        order: study.order,
                      }),
                    `"${study.title}" saved`,
                  )
                }
                onDelete={() =>
                  run(async () => {
                    await deleteCaseStudy(study.id)
                    setCases((current) => current.filter((item) => item.id !== study.id))
                  }, `"${study.title}" deleted`)
                }
              />
            ))}
          </div>

          <div className="case-editor new-case">
            <h3>New case study</h3>
            <CaseFields
              value={draft}
              onChange={(key, value) =>
                setDraft((current) => ({ ...current, [key]: value }))
              }
            />
            <button type="button" onClick={addCase} disabled={pending || !draft.title.trim()}>
              Add case study
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

function CaseEditor({
  study,
  disabled,
  onChange,
  onSave,
  onDelete,
}: {
  study: CaseStudyDTO
  disabled: boolean
  onChange: (key: keyof CaseStudyInput, value: string | number) => void
  onSave: () => void
  onDelete: () => void
}) {
  return (
    <div className="case-editor">
      <CaseFields value={study} onChange={onChange} />
      <div className="case-actions">
        <button type="button" onClick={onSave} disabled={disabled}>
          Save
        </button>
        <button type="button" className="danger" onClick={onDelete} disabled={disabled}>
          Delete
        </button>
      </div>
    </div>
  )
}

function CaseFields({
  value,
  onChange,
}: {
  value: CaseStudyInput
  onChange: (key: keyof CaseStudyInput, value: string | number) => void
}) {
  return (
    <div className="case-fields">
      <label>
        Title
        <input
          value={value.title}
          onChange={(event) => onChange("title", event.target.value)}
        />
      </label>
      <label>
        Category
        <input
          value={value.category}
          onChange={(event) => onChange("category", event.target.value)}
        />
      </label>
      {(["problem", "architecture", "impact", "metrics"] as const).map((key) => (
        <label key={key}>
          {key}
          <textarea
            value={value[key]}
            onChange={(event) => onChange(key, event.target.value)}
            rows={key === "metrics" ? 2 : 4}
          />
        </label>
      ))}
      <label>
        Display order
        <input
          type="number"
          value={value.order}
          onChange={(event) => onChange("order", Number(event.target.value))}
        />
      </label>
    </div>
  )
}
