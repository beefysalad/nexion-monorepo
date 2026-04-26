"use client"

import { RiUser3Line } from "@remixicon/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { useAllUsers } from "@/hooks/api/use-all-users"
import { Skeleton } from "@workspace/ui/components/skeleton"
import type { User } from "@workspace/shared"

export function RecentUsersCard() {
  const { data, isLoading } = useAllUsers()
  const users = data?.users?.slice(0, 5) ?? []

  return (
    <Card className="rounded-xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Recent Users</CardTitle>
        <CardDescription>
          Latest accounts synced to your workspace.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading ? (
          [...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="size-9 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))
        ) : users.length === 0 ? (
          <div className="border-border text-muted-foreground flex h-32 items-center justify-center rounded-lg border border-dashed text-sm">
            No recent users found.
          </div>
        ) : (
          users.map((user: User) => (
            <div key={user.id} className="flex items-center gap-4">
              <Avatar className="border-border/50 size-9 border">
                <AvatarImage src={user.imageUrl ?? undefined} alt={user.name} />
                <AvatarFallback className="text-xs font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-bold">
                  {user.name}
                </p>
                <p className="text-muted-foreground truncate text-xs">
                  {user.email}
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
