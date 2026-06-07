"use client"

import {
  RiArrowDownSLine,
  RiCheckLine,
  RiForbidLine,
  RiPaletteLine,
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
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const

function AppearanceCustomizer() {
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
        <CustomizerSection title="Theme preset:">
          <button
            type="button"
            className="ring-foreground/40 border-foreground/40 bg-background hover:bg-muted focus-visible:ring-ring/30 flex h-12 w-full cursor-pointer items-center gap-3 rounded-lg border px-3 text-left text-sm font-medium ring-2 transition-colors focus-visible:ring-3 focus-visible:outline-none"
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
          title="Scale:"
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
          title="Radius:"
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

        <CustomizerSection title="Color mode:">
          <ToggleGroup
            type="single"
            value={appearance.colorMode}
            onValueChange={(value) => {
              if (value === "light" || value === "dark") {
                setAppearancePreference("colorMode", value)
              }
            }}
            variant="outline"
            size="sm"
            className="border-border bg-background grid w-full grid-cols-2 rounded-lg border"
          >
            {modeOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="data-[state=on]:bg-muted h-10 cursor-pointer rounded-none border-0 text-sm first:rounded-l-lg last:rounded-r-lg data-[state=on]:shadow-none"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
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
          title="Sidebar mode:"
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

function CustomizerSection({
  children,
  title,
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <section className="space-y-2">
      <h3 className="text-foreground text-sm font-medium">{title}</h3>
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
            className="data-[state=on]:bg-muted data-[state=on]:text-foreground h-10 cursor-pointer rounded-none border-0 text-sm first:rounded-l-lg last:rounded-r-lg data-[state=on]:shadow-none"
          >
            {renderLabel ? renderLabel(option) : option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </CustomizerSection>
  )
}

export { AppearanceCustomizer }
