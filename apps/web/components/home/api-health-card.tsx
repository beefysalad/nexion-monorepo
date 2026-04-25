import {
  RiCheckLine,
  RiErrorWarningLine,
  RiLoader4Line,
  RiRefreshLine,
} from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"

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
    <Card className="relative overflow-hidden transition-all hover:border-primary/30">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
      
      <CardContent className="flex flex-col gap-8 py-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-background shadow-inner">
              <StatusIcon
                className={isLoading ? "size-6 animate-spin text-primary" : "size-6"}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-bold tracking-tight">System Status</h2>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusClassName}`}
                >
                  {statusLabel}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs tracking-tight text-muted-foreground/60">
                {apiUrl}/
              </p>
            </div>
          </div>

          <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
            {isLoading
              ? "Establishing connection to the NestJS backend..."
              : isError
                ? "Connection failed. Please ensure the API server is running and the environment variables are correctly configured."
                : `Success: ${message ?? "Backend is reachable and responding correctly."}`}
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          onClick={onRefresh}
          disabled={isLoading}
          className="h-12 rounded-xl px-6 font-bold shadow-sm transition-all hover:bg-muted active:scale-95"
        >
          <RiRefreshLine className={isLoading ? "size-5 animate-spin" : "size-5"} />
          {isLoading ? "Pinging" : "Ping API"}
        </Button>
      </CardContent>
    </Card>
  )
}
