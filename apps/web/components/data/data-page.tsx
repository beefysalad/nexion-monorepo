"use client"

import {
  RiDatabase2Line,
  RiRefreshLine,
  RiServerLine,
  RiStackLine,
  RiUser3Line,
} from "@remixicon/react"
import { useMemo } from "react"

import { useDashboardUser } from "@/components/dashboard/dashboard-user-provider"
import { useApiHealth } from "@/hooks/api/use-api-health"
import { useAllUsers } from "@/hooks/api/use-all-users"
import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Progress } from "@workspace/ui/components/progress"
import { Separator } from "@workspace/ui/components/separator"
import { Skeleton } from "@workspace/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

export function DataPage() {
  const dashboardUser = useDashboardUser()
  const {
    data: health,
    isPending: isHealthPending,
    isError: isHealthError,
    refetch: refetchHealth,
    dataUpdatedAt: healthUpdatedAt,
  } = useApiHealth()
  const {
    data,
    isPending: isUsersPending,
    isError: isUsersError,
    refetch: refetchUsers,
    dataUpdatedAt: usersUpdatedAt,
  } = useAllUsers()

  const users = data?.users ?? []

  const withAvatarCount = useMemo(
    () => users.filter((user) => Boolean(user.imageUrl)).length,
    [users]
  )
  const withoutAvatarCount = users.length - withAvatarCount
  const avatarCoverage =
    users.length > 0 ? Math.round((withAvatarCount / users.length) * 100) : 0
  const latestSyncAt = Math.max(healthUpdatedAt, usersUpdatedAt)
  const lastUpdatedLabel =
    latestSyncAt > 0
      ? new Date(latestSyncAt).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      : "Not synced yet"

  const handleRefresh = () => {
    void refetchHealth()
    void refetchUsers()
  }

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Data</p>
          <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
            Data Workspace
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm">
            Monitor synced records, API readiness, and profile completeness
            across the protected app surfaces.
          </p>
        </div>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <Badge variant="secondary" className="h-8 px-3 text-xs font-medium">
            Last updated {lastUpdatedLabel}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 sm:w-auto"
            onClick={handleRefresh}
          >
            <RiRefreshLine className="size-4" />
            Refresh data
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="API health"
          value={
            isHealthPending
              ? "Checking..."
              : health?.status === "ok"
                ? "Online"
                : "Issue"
          }
          description={
            isHealthError
              ? "The API health check could not be reached."
              : (health?.message ?? "Waiting for the latest backend status.")
          }
          icon={<RiServerLine className="size-4" />}
        />
        <MetricCard
          title="Synced users"
          value={isUsersPending ? "Loading..." : users.length.toString()}
          description="Records available from the backend users endpoint."
          icon={<RiDatabase2Line className="size-4" />}
        />
        <MetricCard
          title="Profile coverage"
          value={isUsersPending ? "Loading..." : `${avatarCoverage}%`}
          description={`${withAvatarCount} of ${users.length} profiles have avatars.`}
          icon={<RiUser3Line className="size-4" />}
        />
        <MetricCard
          title="Current operator"
          value={dashboardUser.name}
          description={dashboardUser.email}
          icon={<RiStackLine className="size-4" />}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-border/60">
          <CardHeader className="gap-2">
            <CardTitle className="text-base font-semibold">
              Synced account records
            </CardTitle>
            <CardDescription>
              A quick read on which user records are fully hydrated for the app.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-border/50 overflow-hidden rounded-xl border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="px-6 py-4">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Avatar</TableHead>
                    <TableHead className="px-6 text-right">Clerk ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isUsersPending ? (
                    [...Array(5)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="px-6 py-4">
                          <Skeleton className="h-4 w-28" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-40" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </TableCell>
                        <TableCell className="px-6 text-right">
                          <Skeleton className="ml-auto h-4 w-20" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : isUsersError ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-muted-foreground h-28 text-center"
                      >
                        We could not load synced user records right now.
                      </TableCell>
                    </TableRow>
                  ) : users.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-muted-foreground h-28 text-center"
                      >
                        No synced records yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="px-6 py-4 font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.imageUrl ? "secondary" : "outline"}
                          >
                            {user.imageUrl ? "Present" : "Missing"}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 text-right">
                          <code className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px]">
                            {user.clerkId.slice(-8)}
                          </code>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card className="border-border/60">
            <CardHeader className="gap-2">
              <CardTitle className="text-base font-semibold">
                Profile completeness
              </CardTitle>
              <CardDescription>
                Coverage across synced member records.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {isUsersPending ? (
                <div className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              ) : (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Avatar coverage
                      </span>
                      <span className="font-medium">{avatarCoverage}%</span>
                    </div>
                    <Progress value={avatarCoverage} className="h-2" />
                  </div>
                  <Separator />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <StatusBlock
                      label="Profiles with images"
                      value={withAvatarCount.toString()}
                    />
                    <StatusBlock
                      label="Profiles missing images"
                      value={withoutAvatarCount.toString()}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="border-border/60">
            <CardHeader className="gap-2">
              <CardTitle className="text-base font-semibold">
                Data source status
              </CardTitle>
              <CardDescription>
                Snapshot of the live backend connection for this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isHealthPending ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">
                      Status
                    </span>
                    <Badge
                      variant={
                        !isHealthError && health?.status === "ok"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {!isHealthError && health?.status === "ok"
                        ? "Online"
                        : "Attention needed"}
                    </Badge>
                  </div>
                  <Separator />
                  <StatusBlock
                    label="Backend message"
                    value={
                      isHealthError
                        ? "Health endpoint unavailable"
                        : (health?.message ?? "No message returned")
                    }
                  />
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

function MetricCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card className="border-border/60">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-1">
          <CardDescription>{title}</CardDescription>
          <CardTitle className="text-2xl font-semibold tracking-normal">
            {value}
          </CardTitle>
        </div>
        <div className="border-border/60 bg-muted/30 text-muted-foreground rounded-lg border p-2">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function StatusBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="text-foreground text-base font-medium">{value}</p>
    </div>
  )
}
