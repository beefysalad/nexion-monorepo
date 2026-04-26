"use client"

import type { User } from "@workspace/shared"
import {
  RiFilter2Line,
  RiMore2Fill,
  RiSearchLine,
  RiSettings3Line,
  RiShieldUserLine,
  RiUser3Line,
} from "@remixicon/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { useAllUsers } from "@/hooks/api/use-all-users"
import { Button } from "@workspace/ui/components/button"
import { Item, ItemMedia, ItemTitle } from "@workspace/ui/components/item"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover"
import { Input } from "@workspace/ui/components/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"

export function UsersPage() {
  const { data, isLoading } = useAllUsers()
  const users = data?.users ?? []

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">User</p>
          <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
            Accounts
          </h1>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">
              {users.length}
            </span>{" "}
            total members across synced accounts.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <RiSearchLine className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search members..."
              className="h-9 w-full border-none bg-muted/40 pl-9 focus-visible:ring-1"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-2 sm:w-auto">
            <RiFilter2Line className="size-4" />
            Filter
          </Button>
        </div>
      </section>

      <div className="overflow-hidden rounded-xl border border-border/50 bg-background/50 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/20 hover:bg-transparent">
              <TableHead className="w-[300px] px-6 py-4">User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>System ID</TableHead>
              <TableHead className="w-[80px] px-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-muted" />
                      <div className="h-4 w-24 rounded bg-muted" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-32 rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-16 rounded bg-muted" />
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <div className="ml-auto size-8 rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-muted-foreground"
                >
                  No members found in this workspace.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="group transition-colors hover:bg-muted/30"
                >
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 border border-border/50">
                        <AvatarImage
                          src={user.imageUrl ?? undefined}
                          alt={user.name}
                        />
                        <AvatarFallback className="text-xs font-bold">
                          {user.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="truncate text-sm font-bold text-foreground">
                        {user.name}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">
                      {user.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      {user.clerkId.slice(-8)}
                    </code>
                  </TableCell>
                  <TableCell className="px-6 text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 transition-colors hover:bg-muted"
                        >
                          <RiMore2Fill className="size-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-48 p-2">
                        <div className="flex flex-col gap-1">
                          <Item size="xs" className="cursor-pointer">
                            <ItemMedia variant="icon">
                              <RiUser3Line className="size-4" />
                            </ItemMedia>
                            <ItemTitle>View profile</ItemTitle>
                          </Item>
                          <Item size="xs" className="cursor-pointer">
                            <ItemMedia variant="icon">
                              <RiSettings3Line className="size-4" />
                            </ItemMedia>
                            <ItemTitle>Edit permissions</ItemTitle>
                          </Item>
                          <div className="my-1 border-t border-border" />
                          <Item
                            size="xs"
                            className="cursor-pointer text-destructive hover:bg-destructive/10"
                          >
                            <ItemMedia variant="icon">
                              <RiShieldUserLine className="size-4 text-destructive" />
                            </ItemMedia>
                            <ItemTitle>Deactivate</ItemTitle>
                          </Item>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  )
}
