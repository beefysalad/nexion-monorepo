"use client"

import {
  useLoading,
  type LoadingKind,
} from "@/components/providers/loading-provider"
import { Spinner } from "@workspace/ui/components/spinner"
import { cn } from "@workspace/ui/lib/utils"

const loadingLabels: Record<LoadingKind, string> = {
  redirect: "Opening page",
  render: "Loading page",
}

function GlobalLoadingIndicator() {
  const loading = useLoading()
  const kind = loading.kind
  const isVisible = loading.isLoading
  const label = loading.label ?? (kind ? loadingLabels[kind] : "Loading")

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-background/70 backdrop-blur-sm transition-opacity duration-200",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative grid size-16 place-items-center">
          <div
            className={cn(
              "absolute inset-0 rounded-full border-2 border-current opacity-20",
              kind === "redirect" ? "text-blue-500" : "text-primary"
            )}
          />
          <Spinner
            className={cn(
              "size-10",
              kind === "redirect" ? "text-blue-500" : "text-primary"
            )}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Please wait a moment.
          </p>
        </div>
      </div>
    </div>
  )
}

export { GlobalLoadingIndicator }
