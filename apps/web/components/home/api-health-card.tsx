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
    <Card className="relative overflow-hidden rounded-lg border-border bg-card shadow-sm shadow-foreground/10 transition-colors hover:border-primary/30">
      <CardContent className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-6">
          <div className="flex items-center gap-5">
            <div className="flex size-14 items-center justify-center rounded-[1.25rem] border border-border bg-background">
              <StatusIcon
                className={isLoading ? "size-7 animate-spin text-primary" : "size-7"}
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="text-2xl font-black tracking-tight">System Health</h2>
                <span
                  className={`inline-flex rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${statusClassName}`}
                >
                  {statusLabel}
                </span>
              </div>
              <p className="mt-1 font-mono text-xs tracking-tight text-muted-foreground">
                {apiUrl}/
              </p>
            </div>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
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
          className="h-14 rounded-2xl px-8 font-bold transition-all hover:border-primary/50 hover:bg-muted active:scale-95"
        >
          <RiRefreshLine className={isLoading ? "mr-2 size-5 animate-spin" : "mr-2 size-5"} />
          {isLoading ? "Pinging" : "Ping API"}
        </Button>
      </CardContent>
    </Card>
  )
}
