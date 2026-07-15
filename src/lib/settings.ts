import "server-only"

import { COLLECTIONS, getDb } from "@/lib/db"
import {
  defaultSettings,
  mergeProfile,
  mergeTheme,
  type PortfolioSettings,
} from "@/lib/theme-settings"

export type { PortfolioSettings, ThemeSettings } from "@/lib/theme-settings"
export {
  THEME_FIELDS,
  defaultSettings,
  defaultTheme,
  mergeTheme,
} from "@/lib/theme-settings"

type SettingsDocument = PortfolioSettings & {
  key: "portfolio"
  updatedAt?: Date
}

export async function hasPortfolioSettings(): Promise<boolean> {
  try {
    const db = await getDb()
    const count = await db
      .collection<SettingsDocument>(COLLECTIONS.settings)
      .countDocuments({ key: "portfolio" })
    return count > 0
  } catch {
    return false
  }
}

export async function getPortfolioSettings(): Promise<PortfolioSettings> {
  try {
    const db = await getDb()
    const saved = await db
      .collection<SettingsDocument>(COLLECTIONS.settings)
      .findOne({ key: "portfolio" })

    if (!saved) return defaultSettings
    return {
      profile: mergeProfile(saved.profile),
      theme: mergeTheme(saved.theme as unknown as Record<string, string>),
    }
  } catch {
    return defaultSettings
  }
}

export async function savePortfolioSettings(
  settings: PortfolioSettings,
): Promise<void> {
  const db = await getDb()
  await db.collection<SettingsDocument>(COLLECTIONS.settings).updateOne(
    { key: "portfolio" },
    {
      $set: {
        key: "portfolio",
        profile: settings.profile,
        theme: mergeTheme(settings.theme as unknown as Record<string, string>),
        updatedAt: new Date(),
      },
      $unset: {
        "theme.canvas": "",
        "theme.cyan": "",
        "theme.lime": "",
      },
    },
    { upsert: true },
  )
}

export async function seedPortfolioSettings(): Promise<void> {
  const db = await getDb()
  const existing = await db
    .collection<SettingsDocument>(COLLECTIONS.settings)
    .countDocuments({ key: "portfolio" })
  if (existing > 0) return
  await savePortfolioSettings(defaultSettings)
}
