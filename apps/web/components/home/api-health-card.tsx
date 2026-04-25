import {
  RiCheckLine,
  RiErrorWarningLine,
  RiLoader4Line,
  RiRefreshLine,
} from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

type ApiHealthCardProps = {
  apiUrl: string
  isLoading: boolean
  isError: boolean
  message?: string
  onRefresh: () => void
}

export function ApiHealthCard({
  apiUrl,
  isLoading,
  isError,
  message,
  onRefresh,
}: ApiHealthCardProps) {
  const statusLabel = isLoading ? "Checking" : isError ? "Offline" : "Online"
  const statusClassName = isError
    ? "border-destructive/30 bg-destructive/10 text-destructive"
    : isLoading
      ? "border-border bg-muted text-muted-foreground"
      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
  const StatusIcon = isLoading
    ? RiLoader4Line
    : isError
      ? RiErrorWarningLine
      : RiCheckLine

  return (
    <section className="rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-border bg-background">
              <StatusIcon
                className={isLoading ? "size-5 animate-spin" : "size-5"}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold">API health</h2>
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusClassName}`}
                >
                  {statusLabel}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs break-all text-muted-foreground">
                GET {apiUrl}/
              </p>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-6">
            {isLoading
              ? "Calling the NestJS backend..."
              : isError
                ? "The frontend could not reach the API. Check the API server and NEXT_PUBLIC_API_URL."
                : `Backend response: ${message ?? "No message returned"}`}
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RiRefreshLine className={isLoading ? "animate-spin" : undefined} />
          {isLoading ? "Pinging" : "Ping API"}
        </Button>
      </div>
    </section>
  )
}
