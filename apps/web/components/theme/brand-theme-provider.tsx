"use client"

import { useTheme } from "next-themes"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react"

type BrandThemeId =
  | "amber"
  | "blue"
  | "emerald"
  | "rose"
  | "violet"
  | "cyan"
  | "lime"
  | "fuchsia"
  | "orange"
  | "indigo"
  | "electric"
type ThemeMode = "light" | "dark"
type AppearanceScaleId = "none" | "xs" | "lg"
type AppearanceRadiusId = "none" | "sm" | "md" | "lg" | "xl"
type ContentLayoutId = "full" | "contained"
type SidebarModeId = "default" | "icon"

type AppearanceOption<TValue extends string> = {
  value: TValue
  label: string
}

type AppearancePreferences = {
  scale: AppearanceScaleId
  radius: AppearanceRadiusId
  contentLayout: ContentLayoutId
  sidebarMode: SidebarModeId
}

type BrandThemeTokens = {
  primary: string
  primaryForeground: string
  ring: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
}

type BrandThemePreset = {
  id: BrandThemeId
  label: string
  swatch: string
  tokens: Record<ThemeMode, BrandThemeTokens>
}

type BrandThemeContextValue = {
  activeTheme: BrandThemePreset
  presets: BrandThemePreset[]
  setBrandTheme: (themeId: BrandThemeId) => void
  appearance: AppearancePreferences
  setAppearancePreference: <TKey extends keyof AppearancePreferences>(
    key: TKey,
    value: AppearancePreferences[TKey]
  ) => void
  resetAppearance: () => void
  scaleOptions: AppearanceOption<AppearanceScaleId>[]
  radiusOptions: AppearanceOption<AppearanceRadiusId>[]
  contentLayoutOptions: AppearanceOption<ContentLayoutId>[]
  sidebarModeOptions: AppearanceOption<SidebarModeId>[]
}

const BRAND_THEME_STORAGE_KEY = "nexion-brand-theme"
const BRAND_THEME_CHANGE_EVENT = "nexion-brand-theme-change"
const APPEARANCE_STORAGE_KEY = "nexion-appearance-preferences"
const APPEARANCE_CHANGE_EVENT = "nexion-appearance-change"

const brandThemePresets: BrandThemePreset[] = [
  {
    id: "amber",
    label: "Amber",
    swatch: "oklch(0.78 0.185 82)",
    tokens: {
      light: {
        primary: "oklch(0.78 0.185 82)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.11 82)",
        sidebarPrimary: "oklch(0.64 0.15 76)",
        sidebarPrimaryForeground: "oklch(0.99 0.02 95)",
      },
      dark: {
        primary: "oklch(0.82 0.17 84)",
        primaryForeground: "oklch(0.18 0.025 70)",
        ring: "oklch(0.72 0.13 84)",
        sidebarPrimary: "oklch(0.82 0.17 84)",
        sidebarPrimaryForeground: "oklch(0.18 0.025 70)",
      },
    },
  },
  {
    id: "blue",
    label: "Blue",
    swatch: "oklch(0.55 0.2 255)",
    tokens: {
      light: {
        primary: "oklch(0.55 0.2 255)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.58 0.16 255)",
        sidebarPrimary: "oklch(0.5 0.18 255)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.72 0.15 250)",
        primaryForeground: "oklch(0.15 0.04 255)",
        ring: "oklch(0.68 0.14 250)",
        sidebarPrimary: "oklch(0.72 0.15 250)",
        sidebarPrimaryForeground: "oklch(0.15 0.04 255)",
      },
    },
  },
  {
    id: "emerald",
    label: "Emerald",
    swatch: "oklch(0.58 0.17 155)",
    tokens: {
      light: {
        primary: "oklch(0.58 0.17 155)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.6 0.12 155)",
        sidebarPrimary: "oklch(0.5 0.14 155)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.74 0.14 155)",
        primaryForeground: "oklch(0.14 0.035 155)",
        ring: "oklch(0.68 0.12 155)",
        sidebarPrimary: "oklch(0.74 0.14 155)",
        sidebarPrimaryForeground: "oklch(0.14 0.035 155)",
      },
    },
  },
  {
    id: "rose",
    label: "Rose",
    swatch: "oklch(0.58 0.22 18)",
    tokens: {
      light: {
        primary: "oklch(0.58 0.22 18)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.6 0.15 18)",
        sidebarPrimary: "oklch(0.52 0.18 18)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.72 0.17 18)",
        primaryForeground: "oklch(0.16 0.04 18)",
        ring: "oklch(0.66 0.14 18)",
        sidebarPrimary: "oklch(0.72 0.17 18)",
        sidebarPrimaryForeground: "oklch(0.16 0.04 18)",
      },
    },
  },
  {
    id: "violet",
    label: "Violet",
    swatch: "oklch(0.56 0.22 300)",
    tokens: {
      light: {
        primary: "oklch(0.56 0.22 300)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.6 0.15 300)",
        sidebarPrimary: "oklch(0.5 0.18 300)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.74 0.15 300)",
        primaryForeground: "oklch(0.16 0.04 300)",
        ring: "oklch(0.68 0.13 300)",
        sidebarPrimary: "oklch(0.74 0.15 300)",
        sidebarPrimaryForeground: "oklch(0.16 0.04 300)",
      },
    },
  },
  {
    id: "cyan",
    label: "Neon Cyan",
    swatch: "oklch(0.72 0.18 205)",
    tokens: {
      light: {
        primary: "oklch(0.56 0.16 210)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.12 210)",
        sidebarPrimary: "oklch(0.5 0.14 210)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.78 0.16 205)",
        primaryForeground: "oklch(0.13 0.04 215)",
        ring: "oklch(0.7 0.14 205)",
        sidebarPrimary: "oklch(0.78 0.16 205)",
        sidebarPrimaryForeground: "oklch(0.13 0.04 215)",
      },
    },
  },
  {
    id: "lime",
    label: "Neon Lime",
    swatch: "oklch(0.86 0.22 132)",
    tokens: {
      light: {
        primary: "oklch(0.55 0.17 135)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.13 135)",
        sidebarPrimary: "oklch(0.48 0.14 135)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.86 0.2 132)",
        primaryForeground: "oklch(0.13 0.04 135)",
        ring: "oklch(0.76 0.16 132)",
        sidebarPrimary: "oklch(0.86 0.2 132)",
        sidebarPrimaryForeground: "oklch(0.13 0.04 135)",
      },
    },
  },
  {
    id: "fuchsia",
    label: "Neon Pink",
    swatch: "oklch(0.7 0.26 340)",
    tokens: {
      light: {
        primary: "oklch(0.58 0.23 340)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.16 340)",
        sidebarPrimary: "oklch(0.52 0.2 340)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.76 0.2 340)",
        primaryForeground: "oklch(0.16 0.04 340)",
        ring: "oklch(0.68 0.16 340)",
        sidebarPrimary: "oklch(0.76 0.2 340)",
        sidebarPrimaryForeground: "oklch(0.16 0.04 340)",
      },
    },
  },
  {
    id: "orange",
    label: "Signal Orange",
    swatch: "oklch(0.7 0.2 45)",
    tokens: {
      light: {
        primary: "oklch(0.6 0.18 45)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.13 45)",
        sidebarPrimary: "oklch(0.54 0.16 45)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.78 0.17 50)",
        primaryForeground: "oklch(0.16 0.04 45)",
        ring: "oklch(0.7 0.14 50)",
        sidebarPrimary: "oklch(0.78 0.17 50)",
        sidebarPrimaryForeground: "oklch(0.16 0.04 45)",
      },
    },
  },
  {
    id: "indigo",
    label: "Indigo",
    swatch: "oklch(0.52 0.22 285)",
    tokens: {
      light: {
        primary: "oklch(0.52 0.22 285)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.58 0.15 285)",
        sidebarPrimary: "oklch(0.47 0.18 285)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.72 0.16 285)",
        primaryForeground: "oklch(0.15 0.04 285)",
        ring: "oklch(0.66 0.14 285)",
        sidebarPrimary: "oklch(0.72 0.16 285)",
        sidebarPrimaryForeground: "oklch(0.15 0.04 285)",
      },
    },
  },
  {
    id: "electric",
    label: "Electric",
    swatch: "oklch(0.68 0.25 285)",
    tokens: {
      light: {
        primary: "oklch(0.57 0.24 285)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.62 0.17 285)",
        sidebarPrimary: "oklch(0.5 0.21 285)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
      },
      dark: {
        primary: "oklch(0.78 0.2 285)",
        primaryForeground: "oklch(0.14 0.05 285)",
        ring: "oklch(0.7 0.16 285)",
        sidebarPrimary: "oklch(0.78 0.2 285)",
        sidebarPrimaryForeground: "oklch(0.14 0.05 285)",
      },
    },
  },
]

const defaultBrandTheme = brandThemePresets[0] as BrandThemePreset
const scaleOptions: AppearanceOption<AppearanceScaleId>[] = [
  { value: "none", label: "Off" },
  { value: "xs", label: "XS" },
  { value: "lg", label: "LG" },
]
const radiusOptions: AppearanceOption<AppearanceRadiusId>[] = [
  { value: "none", label: "Off" },
  { value: "sm", label: "SM" },
  { value: "md", label: "MD" },
  { value: "lg", label: "LG" },
  { value: "xl", label: "XL" },
]
const contentLayoutOptions: AppearanceOption<ContentLayoutId>[] = [
  { value: "full", label: "Full" },
  { value: "contained", label: "Centered" },
]
const sidebarModeOptions: AppearanceOption<SidebarModeId>[] = [
  { value: "default", label: "Default" },
  { value: "icon", label: "Icon" },
]
const defaultAppearancePreferences: AppearancePreferences = {
  scale: "none",
  radius: "md",
  contentLayout: "full",
  sidebarMode: "default",
}
const defaultAppearanceSnapshot = JSON.stringify(defaultAppearancePreferences)

const BrandThemeContext = createContext<BrandThemeContextValue | null>(null)

function BrandThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme, setTheme } = useTheme()
  const brandThemeId = useSyncExternalStore(
    subscribeToBrandTheme,
    getBrandThemeSnapshot,
    getDefaultBrandThemeSnapshot
  )
  const appearanceSnapshot = useSyncExternalStore(
    subscribeToAppearance,
    getAppearanceSnapshot,
    getDefaultAppearanceSnapshot
  )
  const appearance = useMemo(
    () => parseAppearancePreferences(appearanceSnapshot),
    [appearanceSnapshot]
  )
  const activeTheme =
    brandThemePresets.find((preset) => preset.id === brandThemeId) ??
    defaultBrandTheme

  useEffect(() => {
    const mode = resolvedTheme === "dark" ? "dark" : "light"
    applyBrandTheme(activeTheme.tokens[mode])
  }, [activeTheme, resolvedTheme])

  useEffect(() => {
    applyAppearancePreferences(appearance)
  }, [appearance])

  const setBrandTheme = useCallback((themeId: BrandThemeId) => {
    window.localStorage.setItem(BRAND_THEME_STORAGE_KEY, themeId)
    window.dispatchEvent(new Event(BRAND_THEME_CHANGE_EVENT))
  }, [])

  const setAppearancePreference = useCallback(
    <TKey extends keyof AppearancePreferences>(
      key: TKey,
      value: AppearancePreferences[TKey]
    ) => {
      const nextPreferences = {
        ...parseAppearancePreferences(
          window.localStorage.getItem(APPEARANCE_STORAGE_KEY)
        ),
        [key]: value,
      }

      window.localStorage.setItem(
        APPEARANCE_STORAGE_KEY,
        JSON.stringify(nextPreferences)
      )
      window.dispatchEvent(new Event(APPEARANCE_CHANGE_EVENT))
    },
    []
  )

  const resetAppearance = useCallback(() => {
    window.localStorage.removeItem(BRAND_THEME_STORAGE_KEY)
    window.localStorage.removeItem(APPEARANCE_STORAGE_KEY)
    setTheme("light")
    window.dispatchEvent(new Event(BRAND_THEME_CHANGE_EVENT))
    window.dispatchEvent(new Event(APPEARANCE_CHANGE_EVENT))
  }, [setTheme])

  const contextValue = useMemo<BrandThemeContextValue>(
    () => ({
      activeTheme,
      presets: brandThemePresets,
      setBrandTheme,
      appearance,
      setAppearancePreference,
      resetAppearance,
      scaleOptions,
      radiusOptions,
      contentLayoutOptions,
      sidebarModeOptions,
    }),
    [
      activeTheme,
      appearance,
      resetAppearance,
      setAppearancePreference,
      setBrandTheme,
    ]
  )

  return (
    <BrandThemeContext.Provider value={contextValue}>
      {children}
    </BrandThemeContext.Provider>
  )
}

function useBrandTheme() {
  const context = useContext(BrandThemeContext)

  if (!context) {
    throw new Error("useBrandTheme must be used within BrandThemeProvider")
  }

  return context
}

function applyBrandTheme(tokens: BrandThemeTokens) {
  const root = document.documentElement

  root.style.setProperty("--primary", tokens.primary)
  root.style.setProperty("--primary-foreground", tokens.primaryForeground)
  root.style.setProperty("--ring", tokens.ring)
  root.style.setProperty("--sidebar-primary", tokens.sidebarPrimary)
  root.style.setProperty(
    "--sidebar-primary-foreground",
    tokens.sidebarPrimaryForeground
  )
}

function getRadiusValue(radius: AppearanceRadiusId) {
  const values: Record<AppearanceRadiusId, string> = {
    none: "0rem",
    sm: "0.3rem",
    md: "0.5rem",
    lg: "0.8rem",
    xl: "1rem",
  }

  return values[radius]
}

function applyAppearancePreferences(preferences: AppearancePreferences) {
  const root = document.documentElement

  root.style.setProperty("--radius", getRadiusValue(preferences.radius))
  root.dataset.uiScale = preferences.scale
  root.dataset.contentLayout = preferences.contentLayout
  root.dataset.sidebarMode = preferences.sidebarMode
}

function isBrandThemeId(value: string | null): value is BrandThemeId {
  return brandThemePresets.some((preset) => preset.id === value)
}

function isAppearanceScaleId(value: unknown): value is AppearanceScaleId {
  return value === "none" || value === "xs" || value === "lg"
}

function isAppearanceRadiusId(value: unknown): value is AppearanceRadiusId {
  return (
    value === "none" ||
    value === "sm" ||
    value === "md" ||
    value === "lg" ||
    value === "xl"
  )
}

function isContentLayoutId(value: unknown): value is ContentLayoutId {
  return value === "full" || value === "contained"
}

function isSidebarModeId(value: unknown): value is SidebarModeId {
  return value === "default" || value === "icon"
}

function parseAppearancePreferences(
  value: string | null
): AppearancePreferences {
  if (!value) {
    return defaultAppearancePreferences
  }

  try {
    const parsed = JSON.parse(value) as Partial<AppearancePreferences>

    return {
      scale: isAppearanceScaleId(parsed.scale)
        ? parsed.scale
        : defaultAppearancePreferences.scale,
      radius: isAppearanceRadiusId(parsed.radius)
        ? parsed.radius
        : defaultAppearancePreferences.radius,
      contentLayout: isContentLayoutId(parsed.contentLayout)
        ? parsed.contentLayout
        : defaultAppearancePreferences.contentLayout,
      sidebarMode: isSidebarModeId(parsed.sidebarMode)
        ? parsed.sidebarMode
        : defaultAppearancePreferences.sidebarMode,
    }
  } catch {
    return defaultAppearancePreferences
  }
}

function subscribeToBrandTheme(onStoreChange: () => void) {
  window.addEventListener(BRAND_THEME_CHANGE_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)

  return () => {
    window.removeEventListener(BRAND_THEME_CHANGE_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function subscribeToAppearance(onStoreChange: () => void) {
  window.addEventListener(APPEARANCE_CHANGE_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)

  return () => {
    window.removeEventListener(APPEARANCE_CHANGE_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getBrandThemeSnapshot(): BrandThemeId {
  const storedTheme = window.localStorage.getItem(BRAND_THEME_STORAGE_KEY)

  return isBrandThemeId(storedTheme) ? storedTheme : defaultBrandTheme.id
}

function getDefaultBrandThemeSnapshot(): BrandThemeId {
  return defaultBrandTheme.id
}

function getAppearanceSnapshot(): string {
  return (
    window.localStorage.getItem(APPEARANCE_STORAGE_KEY) ??
    defaultAppearanceSnapshot
  )
}

function getDefaultAppearanceSnapshot(): string {
  return defaultAppearanceSnapshot
}

export { BrandThemeProvider, useBrandTheme }
export type { SidebarModeId }
