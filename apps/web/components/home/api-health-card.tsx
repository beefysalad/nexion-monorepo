import {
  RiCheckLine,
  RiErrorWarningLine,
  RiRefreshLine,
} from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import { Card, CardContent } from "@workspace/ui/components/card"
import { Spinner } from "@workspace/ui/components/spinner"
import { cn } from "@workspace/ui/lib/utils"

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
  const isOnline = !isLoading && !isError

  const StatusIcon = isError ? RiErrorWarningLine : RiCheckLine

  return (
    <Card className="border-border bg-card">
      <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl border",
              isLoading && "border-border bg-muted text-muted-foreground",
              isError && "border-destructive/30 bg-destructive/10 text-destructive",
              isOnline && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}
          >
            {isLoading ? (
              <Spinner className="size-5" />
            ) : (
              <StatusIcon className="size-5" />
            )}
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-sm font-bold">API Health</h2>
              <span
                className={cn(
                  "inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  isLoading && "border-border bg-muted text-muted-foreground",
                  isError && "border-destructive/30 bg-destructive/10 text-destructive",
                  isOnline && "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                )}
              >
                {isLoading ? "Checking" : isError ? "Offline" : "Online"}
              </span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{apiUrl}/</p>
            <p className="text-sm text-muted-foreground">
              {isLoading
                ? "Connecting to the NestJS backend…"
                : isError
                  ? "Connection failed — ensure the API server is running."
                  : (message ?? "Backend is reachable and responding.")}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          isLoading={isLoading}
          loadingText="Checking"
          className="h-9 gap-2 rounded-xl px-4 text-xs font-semibold shrink-0"
        >
          <RiRefreshLine className="size-3.5" />
          Ping API
        </Button>
      </CardContent>
    </Card>
  )
}
