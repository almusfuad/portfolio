import type { Profile } from "@/lib/profile"
import { profile as defaultProfile } from "@/lib/profile"

export type ThemeSettings = {
  background: string
  surface: string
  border: string
  muted: string
  primary: string
  secondary: string
  text: string
}

export type PortfolioSettings = {
  profile: Profile
  theme: ThemeSettings
}

/** Ordered labels shown in the admin color controls. */
export const THEME_FIELDS: Array<{ key: keyof ThemeSettings; label: string }> = [
  { key: "background", label: "Background" },
  { key: "surface", label: "Surface" },
  { key: "border", label: "Border" },
  { key: "text", label: "Text" },
  { key: "muted", label: "Muted text" },
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
]

export const defaultTheme: ThemeSettings = {
  background: "#050508",
  surface: "#0b0b0f",
  border: "#1f1f2e",
  muted: "#6b7280",
  primary: "#22d3ee",
  secondary: "#0fee0f",
  text: "#e5e7eb",
}

export const defaultSettings: PortfolioSettings = {
  profile: defaultProfile,
  theme: defaultTheme,
}

export function mergeProfile(saved?: Partial<Profile>): Profile {
  if (!saved) return defaultProfile
  return {
    name: saved.name ?? defaultProfile.name,
    title: saved.title ?? defaultProfile.title,
    subtitle: saved.subtitle ?? defaultProfile.subtitle,
    location: saved.location ?? defaultProfile.location,
    availability: saved.availability ?? defaultProfile.availability,
    about: saved.about ?? defaultProfile.about,
    techStack: saved.techStack ?? defaultProfile.techStack,
    experience: saved.experience ?? defaultProfile.experience,
    education: saved.education ?? defaultProfile.education,
    testimonials: saved.testimonials ?? defaultProfile.testimonials,
    contact: { ...defaultProfile.contact, ...saved.contact },
  }
}

/** Normalize theme from MongoDB, including legacy cyan/lime/canvas keys. */
export function mergeTheme(saved?: Record<string, string>): ThemeSettings {
  if (!saved) return defaultTheme
  return {
    background: saved.background ?? saved.canvas ?? defaultTheme.background,
    surface: saved.surface ?? defaultTheme.surface,
    border: saved.border ?? defaultTheme.border,
    muted: saved.muted ?? defaultTheme.muted,
    primary: saved.primary ?? saved.cyan ?? defaultTheme.primary,
    secondary: saved.secondary ?? saved.lime ?? defaultTheme.secondary,
    text: saved.text ?? defaultTheme.text,
  }
}
