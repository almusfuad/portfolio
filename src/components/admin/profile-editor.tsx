"use client"

import type {
  Education,
  Experience,
  Profile,
  TechGroup,
  Testimonial,
} from "@/lib/profile"

type Props = {
  profile: Profile
  onChange: (profile: Profile) => void
}

export function ProfileEditor({ profile, onChange }: Props) {
  function patch<K extends keyof Profile>(key: K, value: Profile[K]) {
    onChange({ ...profile, [key]: value })
  }

  function patchContact(key: keyof Profile["contact"], value: string) {
    onChange({ ...profile, contact: { ...profile.contact, [key]: value } })
  }

  return (
    <div className="profile-editor">
      <EditorBlock title="Hero" command="edit hero">
        <div className="field-grid">
          <Field label="Name" value={profile.name} onChange={(v) => patch("name", v)} />
          <Field label="Title" value={profile.title} onChange={(v) => patch("title", v)} />
          <Field
            label="Subtitle"
            value={profile.subtitle}
            onChange={(v) => patch("subtitle", v)}
          />
          <Field
            label="Location"
            value={profile.location}
            onChange={(v) => patch("location", v)}
          />
          <Field
            label="Availability"
            value={profile.availability}
            onChange={(v) => patch("availability", v)}
            full
          />
        </div>
      </EditorBlock>

      <EditorBlock title="About" command="edit about">
        {profile.about.map((paragraph, index) => (
          <div key={index} className="list-item">
            <label>
              Paragraph {index + 1}
              <textarea
                value={paragraph}
                rows={4}
                onChange={(event) => {
                  const about = [...profile.about]
                  about[index] = event.target.value
                  patch("about", about)
                }}
              />
            </label>
            <button
              type="button"
              className="danger small"
              onClick={() => patch("about", profile.about.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="secondary small"
          onClick={() => patch("about", [...profile.about, ""])}
        >
          + Add paragraph
        </button>
      </EditorBlock>

      <EditorBlock title="Tech stack" command="edit stack">
        {profile.techStack.map((group, groupIndex) => (
          <TechGroupEditor
            key={groupIndex}
            group={group}
            onChange={(next) => {
              const techStack = [...profile.techStack]
              techStack[groupIndex] = next
              patch("techStack", techStack)
            }}
            onRemove={() =>
              patch(
                "techStack",
                profile.techStack.filter((_, i) => i !== groupIndex),
              )
            }
          />
        ))}
        <button
          type="button"
          className="secondary small"
          onClick={() =>
            patch("techStack", [...profile.techStack, { label: "", items: [] }])
          }
        >
          + Add stack group
        </button>
      </EditorBlock>

      <EditorBlock title="Experience" command="edit experience">
        {profile.experience.map((job, index) => (
          <ExperienceEditor
            key={index}
            job={job}
            onChange={(next) => {
              const experience = [...profile.experience]
              experience[index] = next
              patch("experience", experience)
            }}
            onRemove={() =>
              patch(
                "experience",
                profile.experience.filter((_, i) => i !== index),
              )
            }
          />
        ))}
        <button
          type="button"
          className="secondary small"
          onClick={() =>
            patch("experience", [
              ...profile.experience,
              { company: "", role: "", period: "", highlight: "" },
            ])
          }
        >
          + Add role
        </button>
      </EditorBlock>

      <EditorBlock title="Education" command="edit education">
        {profile.education.map((entry, index) => (
          <EducationEditor
            key={index}
            entry={entry}
            onChange={(next) => {
              const education = [...profile.education]
              education[index] = next
              patch("education", education)
            }}
            onRemove={() =>
              patch(
                "education",
                profile.education.filter((_, i) => i !== index),
              )
            }
          />
        ))}
        <button
          type="button"
          className="secondary small"
          onClick={() =>
            patch("education", [
              ...profile.education,
              { school: "", degree: "", period: "" },
            ])
          }
        >
          + Add education
        </button>
      </EditorBlock>

      <EditorBlock title="Testimonials" command="edit testimonials">
        {profile.testimonials.map((item, index) => (
          <TestimonialEditor
            key={index}
            item={item}
            onChange={(next) => {
              const testimonials = [...profile.testimonials]
              testimonials[index] = next
              patch("testimonials", testimonials)
            }}
            onRemove={() =>
              patch(
                "testimonials",
                profile.testimonials.filter((_, i) => i !== index),
              )
            }
          />
        ))}
        <button
          type="button"
          className="secondary small"
          onClick={() =>
            patch("testimonials", [
              ...profile.testimonials,
              { quote: "", name: "", role: "" },
            ])
          }
        >
          + Add testimonial
        </button>
      </EditorBlock>

      <EditorBlock title="Contact" command="edit contact">
        <div className="field-grid">
          <Field
            label="Email"
            value={profile.contact.email}
            onChange={(v) => patchContact("email", v)}
          />
          <Field
            label="GitHub URL"
            value={profile.contact.github}
            onChange={(v) => patchContact("github", v)}
          />
          <Field
            label="LinkedIn URL"
            value={profile.contact.linkedin}
            onChange={(v) => patchContact("linkedin", v)}
          />
          <Field
            label="Contact note"
            value={profile.contact.note}
            onChange={(v) => patchContact("note", v)}
            full
            multiline
          />
        </div>
      </EditorBlock>
    </div>
  )
}

function EditorBlock({
  title,
  command,
  children,
}: {
  title: string
  command: string
  children: React.ReactNode
}) {
  return (
    <div className="editor-block">
      <span className="admin-command">$ {command}</span>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  full,
  multiline,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  full?: boolean
  multiline?: boolean
}) {
  return (
    <label className={full ? "full" : undefined}>
      {label}
      {multiline ? (
        <textarea value={value} rows={3} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  )
}

function TechGroupEditor({
  group,
  onChange,
  onRemove,
}: {
  group: TechGroup
  onChange: (group: TechGroup) => void
  onRemove: () => void
}) {
  return (
    <div className="list-item">
      <Field
        label="Group label"
        value={group.label}
        onChange={(label) => onChange({ ...group, label })}
      />
      <label>
        Items (comma-separated)
        <input
          value={group.items.join(", ")}
          onChange={(event) =>
            onChange({
              ...group,
              items: event.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            })
          }
        />
      </label>
      <button type="button" className="danger small" onClick={onRemove}>
        Remove group
      </button>
    </div>
  )
}

function ExperienceEditor({
  job,
  onChange,
  onRemove,
}: {
  job: Experience
  onChange: (job: Experience) => void
  onRemove: () => void
}) {
  return (
    <div className="list-item field-grid">
      <Field label="Company" value={job.company} onChange={(v) => onChange({ ...job, company: v })} />
      <Field label="Role" value={job.role} onChange={(v) => onChange({ ...job, role: v })} />
      <Field label="Period" value={job.period} onChange={(v) => onChange({ ...job, period: v })} />
      <label className="full">
        Highlight
        <textarea
          value={job.highlight}
          rows={3}
          onChange={(event) => onChange({ ...job, highlight: event.target.value })}
        />
      </label>
      <button type="button" className="danger small" onClick={onRemove}>
        Remove role
      </button>
    </div>
  )
}

function EducationEditor({
  entry,
  onChange,
  onRemove,
}: {
  entry: Education
  onChange: (entry: Education) => void
  onRemove: () => void
}) {
  return (
    <div className="list-item field-grid">
      <Field label="School" value={entry.school} onChange={(v) => onChange({ ...entry, school: v })} />
      <Field label="Degree" value={entry.degree} onChange={(v) => onChange({ ...entry, degree: v })} />
      <Field label="Period" value={entry.period} onChange={(v) => onChange({ ...entry, period: v })} />
      <button type="button" className="danger small" onClick={onRemove}>
        Remove
      </button>
    </div>
  )
}

function TestimonialEditor({
  item,
  onChange,
  onRemove,
}: {
  item: Testimonial
  onChange: (item: Testimonial) => void
  onRemove: () => void
}) {
  return (
    <div className="list-item field-grid">
      <label className="full">
        Quote
        <textarea
          value={item.quote}
          rows={3}
          onChange={(event) => onChange({ ...item, quote: event.target.value })}
        />
      </label>
      <Field label="Name" value={item.name} onChange={(v) => onChange({ ...item, name: v })} />
      <Field label="Role" value={item.role} onChange={(v) => onChange({ ...item, role: v })} />
      <button type="button" className="danger small" onClick={onRemove}>
        Remove
      </button>
    </div>
  )
}
