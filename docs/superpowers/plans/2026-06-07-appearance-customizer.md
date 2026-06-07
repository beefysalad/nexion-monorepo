# Appearance Customizer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a screenshot-matching top-right appearance customizer with theme preset, scale, radius, color mode, content layout, sidebar mode, reset behavior, and quick light/dark controls.

**Architecture:** Extend the existing brand theme provider into a broader appearance preferences provider while keeping its public hook name stable. Add a focused `AppearanceCustomizer` popover component and wire it into the protected dashboard shell topbar. Apply layout preferences through root data attributes/CSS variables and shell classes, not scattered local state.

**Tech Stack:** Next.js App Router, React client components, `next-themes`, shared `@workspace/ui` shadcn primitives (`Button`, `Popover`, `ToggleGroup`, `Separator`), Remix icons, Tailwind v4 CSS variables.

---

## Source Reference

Target screenshot:

`/Users/jpatrickzxc/Documents/coding/monorepo/nexion-monorepo/Screenshot 2026-06-07 at 12.58.14 PM.png`

Customizer screenshot:

`/Users/jpatrickzxc/Documents/coding/monorepo/nexion-monorepo/Screenshot 2026-06-07 at 12.58.44 PM.png`

The important screenshot detail is the top-right customizer, not only the moon icon. It should expose:

- Theme preset
- Scale
- Radius
- Color mode
- Content layout
- Sidebar mode
- Reset to Default

The second screenshot is the source of truth for control shape:

- Theme preset is a focused select-like row with a dot, label, and chevron.
- Scale has `Off`, `XS`, and `LG`.
- Radius has `Off`, `SM`, `MD`, `LG`, and `XL`.
- Color mode has `Light` and `Dark`.
- Content layout has `Full` and `Centered`.
- Sidebar mode has `Default` and `Icon`.
- Reset is a full-width black button at the bottom.

## File Structure

- Modify `apps/web/components/theme/brand-theme-provider.tsx`
  - Keep the existing brand color preset behavior.
  - Add persisted appearance preferences for scale, radius, content layout, and sidebar mode.
  - Apply `--radius`, `data-ui-scale`, `data-content-layout`, and `data-sidebar-mode` to `document.documentElement`.

- Create `apps/web/components/theme/appearance-customizer.tsx`
  - Top-right palette popover matching the screenshot behavior.
  - Uses existing shadcn primitives; no new shadcn install required.
  - Contains theme preset select-like control, scale controls, radius controls, color mode controls, content layout controls, sidebar mode controls, and reset behavior.

- Modify `apps/web/components/dashboard/dashboard-shell.tsx`
  - Add the customizer trigger and quick theme button to the topbar.
  - Apply content layout classes based on appearance state.
  - Pass sidebar mode state into the sidebar.

- Modify `apps/web/components/dashboard/dashboard-sidebar.tsx`
  - Accept sidebar mode and support the screenshot-style icon/default sidebar behavior.

- Modify `apps/web/components/dashboard/brand-theme-settings.tsx`
  - Reuse appearance provider state.
  - Keep settings page consistent with the new popover, or reduce this card to a compact summary.

- Modify `apps/web/components/settings/appearance-settings.tsx`
  - Replace large theme cards with compact controls or a callout to the same `AppearanceCustomizer` component.

- Modify `packages/ui/src/styles/globals.css`
  - Add root-level scale/layout/sidebar data attribute styling.
  - Keep light/dark contrast and existing theme tokens intact.

## Existing Components To Reuse

These are already present and should be used before adding anything:

- `@workspace/ui/components/button`
- `@workspace/ui/components/popover`
- `@workspace/ui/components/toggle-group`
- `@workspace/ui/components/separator`
- `@workspace/ui/components/sidebar`
- `@workspace/ui/lib/utils`

The repo does not currently have a shared shadcn `Select`, so implement the theme preset as a select-like button plus inline swatch list inside the popover. Do not add `Select` unless the user explicitly approves it.

Do not run `shadcn add` for this task unless implementation discovers a missing primitive and the user explicitly approves it.

## UI/UX Skill Context

Use `.codex/skills/ui-ux-pro-max` during execution. The relevant searches were already run:

```bash
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "SaaS dashboard appearance customizer theme preset scale radius sidebar settings" --design-system -p "Nexion"
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "dashboard appearance customizer segmented controls popover" --stack shadcn
python3 .codex/skills/ui-ux-pro-max/scripts/search.py "theme switcher segmented controls accessibility focus contrast" --domain ux
```

Apply these findings:

- Keep the UI flat, minimal, typography-focused, and operational rather than decorative.
- Use `Popover` with explicit `align="end"` and `sideOffset` for the floating customizer panel.
- Keep hover transitions fast, around `150-200ms`.
- Every clickable customizer control needs `cursor-pointer` and a visible `focus-visible` ring.
- Check normal text contrast at `4.5:1` minimum; avoid gray text on gray surfaces.
- Use icons from Remix/shadcn-compatible SVG icons, not emojis.
- Verify responsive behavior at `375px`, `768px`, `1024px`, and `1440px`.

---

### Task 1: Extend Appearance State

**Files:**

- Modify: `apps/web/components/theme/brand-theme-provider.tsx`

- [ ] **Step 1: Add appearance option types and configs**

Add these types near the existing `BrandThemeId` and `ThemeMode` types:

```ts
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
```

Add these option arrays after `brandThemePresets`:

```ts
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
```

- [ ] **Step 2: Extend context value**

Change `BrandThemeContextValue` to include all appearance controls:

```ts
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
```

- [ ] **Step 3: Add localStorage keys and event**

Add constants next to the existing brand theme storage constants:

```ts
const APPEARANCE_STORAGE_KEY = "nexion-appearance-preferences"
const APPEARANCE_CHANGE_EVENT = "nexion-appearance-change"
```

- [ ] **Step 4: Read and validate appearance preferences**

Add helper guards below `isBrandThemeId`:

```ts
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
```

- [ ] **Step 5: Add appearance external store**

Add these helpers near `getBrandThemeSnapshot`:

```ts
function subscribeToAppearance(onStoreChange: () => void) {
  window.addEventListener(APPEARANCE_CHANGE_EVENT, onStoreChange)
  window.addEventListener("storage", onStoreChange)

  return () => {
    window.removeEventListener(APPEARANCE_CHANGE_EVENT, onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function getAppearanceSnapshot(): AppearancePreferences {
  return parseAppearancePreferences(
    window.localStorage.getItem(APPEARANCE_STORAGE_KEY)
  )
}

function getDefaultAppearanceSnapshot(): AppearancePreferences {
  return defaultAppearancePreferences
}
```

- [ ] **Step 6: Apply preferences to the document root**

Add this helper:

```ts
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
```

- [ ] **Step 7: Wire provider state**

Inside `BrandThemeProvider`, add:

```ts
const appearance = useSyncExternalStore(
  subscribeToAppearance,
  getAppearanceSnapshot,
  getDefaultAppearanceSnapshot
)
```

Add an effect:

```ts
useEffect(() => {
  applyAppearancePreferences(appearance)
}, [appearance])
```

Add setter:

```ts
const setAppearancePreference = useCallback(
  <TKey extends keyof AppearancePreferences>(
    key: TKey,
    value: AppearancePreferences[TKey]
  ) => {
    const nextPreferences = {
      ...getAppearanceSnapshot(),
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
```

Add reset behavior:

```ts
const resetAppearance = useCallback(() => {
  window.localStorage.removeItem(BRAND_THEME_STORAGE_KEY)
  window.localStorage.removeItem(APPEARANCE_STORAGE_KEY)
  window.dispatchEvent(new Event(BRAND_THEME_CHANGE_EVENT))
  window.dispatchEvent(new Event(APPEARANCE_CHANGE_EVENT))
}, [])
```

Include these values in `contextValue`:

```ts
appearance,
setAppearancePreference,
resetAppearance,
scaleOptions,
radiusOptions,
contentLayoutOptions,
sidebarModeOptions,
```

Update the `useMemo` dependency list to include `appearance`, `setAppearancePreference`, and `resetAppearance`.

- [ ] **Step 8: Verify provider types**

Run:

```bash
npm run typecheck -w web
```

Expected: TypeScript should only fail if later tasks have not been implemented and imports reference missing files. At this task boundary, no imports should reference new files yet, so expected result is PASS.

---

### Task 2: Create Appearance Customizer Popover

**Files:**

- Create: `apps/web/components/theme/appearance-customizer.tsx`

- [ ] **Step 1: Create the component shell**

Create `apps/web/components/theme/appearance-customizer.tsx` with this structure:

```tsx
"use client"

import { useTheme } from "next-themes"
import {
  RiArrowDownSLine,
  RiCheckLine,
  RiForbidLine,
  RiMoonLine,
  RiPaletteLine,
  RiSunLine,
} from "@remixicon/react"

import { useBrandTheme } from "@/components/theme/brand-theme-provider"
import { Button } from "@workspace/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Separator } from "@workspace/ui/components/separator"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@workspace/ui/components/toggle-group"
import { cn } from "@workspace/ui/lib/utils"

const modeOptions = [
  { value: "light", label: "Light", icon: RiSunLine },
  { value: "dark", label: "Dark", icon: RiMoonLine },
] as const

function AppearanceCustomizer() {
  const { setTheme, theme } = useTheme()
  const {
    activeTheme,
    appearance,
    contentLayoutOptions,
    presets,
    radiusOptions,
    resetAppearance,
    scaleOptions,
    setAppearancePreference,
    setBrandTheme,
    sidebarModeOptions,
  } = useBrandTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Customize appearance"
          className="border-foreground/15 bg-background text-foreground hover:bg-muted shadow-sm"
        >
          <RiPaletteLine />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={10}
        className="w-[min(calc(100vw-2rem),24rem)] gap-4 rounded-xl p-4 shadow-xl"
      >
        <CustomizerSection title="Theme preset">
          <button
            type="button"
            className="border-foreground/40 bg-background hover:bg-muted focus-visible:ring-ring/30 flex h-12 w-full cursor-pointer items-center gap-3 rounded-lg border px-3 text-left text-sm font-medium shadow-[0_0_0_3px_oklch(0.13_0_0/35%)] transition-colors focus-visible:ring-3 focus-visible:outline-none"
          >
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: activeTheme.swatch }}
            />
            <span className="min-w-0 flex-1 truncate">{activeTheme.label}</span>
            <RiArrowDownSLine className="text-muted-foreground size-4" />
          </button>
          <div className="grid grid-cols-6 gap-2 pt-2">
            {presets.map((preset) => {
              const isActive = preset.id === activeTheme.id

              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={preset.label}
                  aria-pressed={isActive}
                  onClick={() => setBrandTheme(preset.id)}
                  className={cn(
                    "border-border bg-background hover:border-foreground/40 focus-visible:ring-ring/30 relative flex size-8 cursor-pointer items-center justify-center rounded-full border transition-colors focus-visible:ring-3 focus-visible:outline-none",
                    isActive && "border-foreground"
                  )}
                >
                  <span
                    className="size-5 rounded-full"
                    style={{ backgroundColor: preset.swatch }}
                  />
                  {isActive ? (
                    <span className="bg-foreground text-background absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full">
                      <RiCheckLine className="size-3" />
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </CustomizerSection>

        <Separator />

        <SegmentedSection
          title="Scale"
          value={appearance.scale}
          options={scaleOptions}
          renderLabel={(option) =>
            option.value === "none" ? (
              <RiForbidLine className="size-4" />
            ) : (
              option.label
            )
          }
          onValueChange={(value) => setAppearancePreference("scale", value)}
        />
        <SegmentedSection
          title="Radius"
          value={appearance.radius}
          options={radiusOptions}
          renderLabel={(option) =>
            option.value === "none" ? (
              <RiForbidLine className="size-4" />
            ) : (
              option.label
            )
          }
          onValueChange={(value) => setAppearancePreference("radius", value)}
        />

        <CustomizerSection title="Color mode">
          <ToggleGroup
            type="single"
            value={theme === "dark" ? "dark" : "light"}
            onValueChange={(value) => {
              if (value) setTheme(value)
            }}
            variant="outline"
            size="sm"
            className="border-border bg-background grid w-full grid-cols-2 rounded-lg border"
          >
            {modeOptions.map((option) => {
              return (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="data-[state=on]:bg-muted h-10 rounded-none border-0 text-sm first:rounded-l-lg last:rounded-r-lg data-[state=on]:shadow-none"
                >
                  {option.label}
                </ToggleGroupItem>
              )
            })}
          </ToggleGroup>
        </CustomizerSection>

        <SegmentedSection
          title="Content layout"
          value={appearance.contentLayout}
          options={contentLayoutOptions}
          onValueChange={(value) =>
            setAppearancePreference("contentLayout", value)
          }
        />
        <SegmentedSection
          title="Sidebar mode"
          value={appearance.sidebarMode}
          options={sidebarModeOptions}
          onValueChange={(value) =>
            setAppearancePreference("sidebarMode", value)
          }
        />

        <Button
          type="button"
          className="bg-foreground text-background hover:bg-foreground/90 h-11 w-full"
          onClick={resetAppearance}
        >
          Reset to Default
        </Button>
      </PopoverContent>
    </Popover>
  )
}
```

- [ ] **Step 2: Add local helper components**

Append these helpers in the same file:

```tsx
function CustomizerSection({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-muted-foreground text-xs font-medium">{title}</h3>
      {children}
    </section>
  )
}

function SegmentedSection<TValue extends string>({
  onValueChange,
  options,
  renderLabel,
  title,
  value,
}: {
  onValueChange: (value: TValue) => void
  options: Array<{ value: TValue; label: string }>
  renderLabel?: (option: { value: TValue; label: string }) => React.ReactNode
  title: string
  value: TValue
}) {
  return (
    <CustomizerSection title={title}>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(nextValue) => {
          if (nextValue) onValueChange(nextValue as TValue)
        }}
        variant="outline"
        size="sm"
        className="border-border bg-background grid w-full auto-cols-fr grid-flow-col rounded-lg border"
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className="data-[state=on]:bg-muted data-[state=on]:text-foreground h-10 rounded-none border-0 text-sm first:rounded-l-lg last:rounded-r-lg data-[state=on]:shadow-none"
          >
            {renderLabel ? renderLabel(option) : option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </CustomizerSection>
  )
}

export { AppearanceCustomizer }
```

- [ ] **Step 3: Verify component typing**

Run:

```bash
npm run typecheck -w web
```

Expected: PASS, assuming Task 1 is complete.

---

### Task 3: Wire Customizer Into Dashboard Shell

**Files:**

- Modify: `apps/web/components/dashboard/dashboard-shell.tsx`
- Modify: `apps/web/components/dashboard/dashboard-sidebar.tsx`

- [ ] **Step 1: Import appearance state and customizer**

In `dashboard-shell.tsx`, add:

```ts
import { useTheme } from "next-themes"
import { RiMoonLine, RiSunLine } from "@remixicon/react"

import { AppearanceCustomizer } from "@/components/theme/appearance-customizer"
import { useBrandTheme } from "@/components/theme/brand-theme-provider"
import { Button } from "@workspace/ui/components/button"
```

- [ ] **Step 2: Read appearance and theme**

Inside `DashboardShell`, add:

```ts
const { appearance } = useBrandTheme()
const { resolvedTheme, setTheme } = useTheme()
const isDark = resolvedTheme === "dark"
```

- [ ] **Step 3: Add screenshot-style topbar actions**

Replace the current `header` contents after `Breadcrumb` with this right-side group:

```tsx
<div className="ml-auto flex shrink-0 items-center gap-2">
  <Button
    type="button"
    variant="ghost"
    size="icon-sm"
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    className="text-muted-foreground hover:text-foreground"
    onClick={() => setTheme(isDark ? "light" : "dark")}
  >
    {isDark ? <RiSunLine /> : <RiMoonLine />}
  </Button>
  <AppearanceCustomizer />
</div>
```

Keep the breadcrumb area `min-w-0` so it truncates before overlapping the new controls.

- [ ] **Step 4: Apply content layout to main area**

Replace the child rendering:

```tsx
<main className="bg-app-canvas dark:bg-background min-w-0 flex-1 overflow-x-hidden">
  {children}
</main>
```

with:

```tsx
<main className="bg-app-canvas dark:bg-background min-w-0 flex-1 overflow-x-hidden">
  <div
    className={cn(
      "min-h-full",
      appearance.contentLayout === "contained" && "mx-auto w-full max-w-7xl"
    )}
  >
    {children}
  </div>
</main>
```

Also import `cn` from `@workspace/ui/lib/utils`.

- [ ] **Step 5: Pass sidebar mode**

Change:

```tsx
<DashboardSidebar />
```

to:

```tsx
<DashboardSidebar mode={appearance.sidebarMode} />
```

- [ ] **Step 6: Update sidebar props and default state**

In `dashboard-sidebar.tsx`, add:

```ts
import type { SidebarModeId } from "@/components/theme/brand-theme-provider"
```

If the type is not exported yet, export it from `brand-theme-provider.tsx`:

```ts
export type { SidebarModeId }
```

Change the component signature:

```ts
function DashboardSidebar({ mode }: { mode: SidebarModeId }) {
```

Change:

```tsx
<Sidebar collapsible="icon">
```

to:

```tsx
<Sidebar collapsible="icon" variant="sidebar">
```

The screenshot's `Sidebar mode: Icon` should mean the desktop sidebar starts collapsed to icon mode. To support this, update `DashboardShell`:

```tsx
<SidebarProvider defaultOpen={appearance.sidebarMode !== "icon"}>
```

This sets the initial state. Existing `SidebarTrigger` still lets the user expand/collapse during the session.

- [ ] **Step 7: Verify shell compile**

Run:

```bash
npm run typecheck -w web
```

Expected: PASS.

---

### Task 4: Align Settings Appearance UI

**Files:**

- Modify: `apps/web/components/settings/appearance-settings.tsx`
- Modify: `apps/web/components/dashboard/brand-theme-settings.tsx`
- Modify: `apps/web/components/settings/settings-page.tsx`

- [ ] **Step 1: Replace large theme cards in `appearance-settings.tsx`**

Remove the local `themeOptions` card grid. Replace the card content with a compact row that mirrors the topbar customizer:

```tsx
<Card>
  <CardHeader>
    <CardTitle>Appearance</CardTitle>
    <CardDescription>
      Theme preset, scale, radius, layout, and sidebar preferences.
    </CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="space-y-1">
      <p className="text-sm font-medium">Workspace appearance</p>
      <p className="text-muted-foreground text-sm">
        Open the customizer to tune the dashboard shell.
      </p>
    </div>
    <AppearanceCustomizer />
  </CardContent>
</Card>
```

Import:

```ts
import { AppearanceCustomizer } from "@/components/theme/appearance-customizer"
```

Remove unused imports from `next-themes`, `RiCheckLine`, `RiComputerLine`, `RiMoonLine`, `RiSunLine`, and `cn` if they are no longer needed.

- [ ] **Step 2: Compact `BrandThemeSettings`**

Keep `BrandThemeSettings` for gallery/settings reuse, but make it visually consistent with the customizer. Replace card classes:

```tsx
<Card className="rounded-2xl shadow-sm">
```

Replace the grid button class with:

```ts
"bg-background hover:border-foreground/40 flex min-h-16 items-center gap-3 rounded-xl border p-3 text-left text-sm transition-colors"
```

Use the swatch + label + active check in one row:

```tsx
<span
  className="border-border size-7 shrink-0 rounded-full border"
  style={{ backgroundColor: preset.swatch }}
/>
<span className="min-w-0 flex-1 truncate font-medium">{preset.label}</span>
{isActive ? <RiCheckLine className="text-primary size-4" /> : null}
```

Remove the bulky `Active preset` footer if the active state is obvious.

- [ ] **Step 3: Update duplicate appearance tab in `settings-page.tsx`**

The file currently has its own inline appearance tab. Replace that inline `Display` card and `BrandThemeSettings` block with the shared component:

```tsx
<TabsContent value="appearance" className="grid gap-4">
  <AppearanceSettings />
</TabsContent>
```

Import:

```ts
import { AppearanceSettings } from "@/components/settings/appearance-settings"
```

Remove now-unused `useTheme`, `RiComputerLine`, `RiMoonLine`, `RiSunLine`, `BrandThemeSettings`, and local `themeOptions` from `settings-page.tsx`.

- [ ] **Step 4: Verify settings compile**

Run:

```bash
npm run typecheck -w web
```

Expected: PASS.

---

### Task 5: Add CSS Hooks For Scale And Layout

**Files:**

- Modify: `packages/ui/src/styles/globals.css`

- [ ] **Step 1: Add root scale styling**

Add this below the `.dark` block and before `@theme inline`:

```css
:root[data-ui-scale="xs"] {
  --app-density-scale: 0.95;
}

:root[data-ui-scale="none"] {
  --app-density-scale: 1;
}

:root[data-ui-scale="lg"] {
  --app-density-scale: 1.05;
}
```

- [ ] **Step 2: Apply scale without destabilizing layout**

In `@layer base`, add:

```css
body {
  font-size: calc(1rem * var(--app-density-scale, 1));
}
```

If this conflicts with the existing `body` rule, merge it into the existing `body` rule so there is still only one `body` selector inside `@layer base`:

```css
body {
  @apply bg-background text-foreground min-h-svh overflow-x-hidden;
  font-size: calc(1rem * var(--app-density-scale, 1));
}
```

- [ ] **Step 3: Verify radius behavior**

Do not add extra CSS for radius. Task 1 updates `--radius`, and existing theme variables derive `--radius-sm` through `--radius-4xl` from it.

- [ ] **Step 4: Run UI package typecheck**

Run:

```bash
npm run typecheck -w @workspace/ui
```

Expected: PASS. CSS changes do not affect TypeScript, but this confirms the workspace still resolves.

---

### Task 6: Verification And Visual QA

**Files:**

- No code edits unless verification finds issues.

- [ ] **Step 1: Run frontend typecheck**

Run:

```bash
npm run typecheck -w web
```

Expected: PASS.

- [ ] **Step 2: Run frontend build**

Run:

```bash
npm run build -w web
```

Expected: PASS.

- [ ] **Step 3: Start dev server**

Run:

```bash
npm run dev -w web
```

Expected: Next.js dev server starts, usually at `http://localhost:3000`.

- [ ] **Step 4: Visual check protected settings**

Open the app and inspect:

- Top-right has quick light/dark button and palette customizer.
- Palette customizer opens a right-aligned panel matching the second screenshot with theme preset, scale, radius, color mode, content layout, sidebar mode, and reset.
- Theme preset swatches update the primary color immediately.
- Scale `XS` and `LG` change text size without horizontal overflow; the `Off` option returns to default scale.
- Radius changes button/card/popover roundness.
- Content layout switches between full and centered max-width content.
- Sidebar mode `Icon` starts the desktop sidebar collapsed to icon mode.
- Light and dark mode both maintain readable contrast.

- [ ] **Step 5: Mobile check**

At `375px` width:

- Topbar controls remain visible and do not overlap breadcrumbs.
- Popover fits within viewport width.
- Content layout does not create horizontal scroll.
- Sidebar mobile behavior still uses the existing shadcn sheet behavior.

---

## Self-Review

- Spec coverage: The plan covers the screenshot-specific customizer controls: theme preset, scale, radius, color mode, content layout, sidebar mode, reset, and quick mode toggle.
- Placeholder scan: No task contains unfinished placeholder language.
- Type consistency: `SidebarModeId`, `AppearancePreferences`, and context property names are defined in Task 1 before use in later tasks.
- Dependency check: No new package or shadcn component is required; existing shared primitives are enough.
