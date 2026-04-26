"use client"

import { RiUser3Line } from "@remixicon/react"
import { useDashboardUser } from "@/components/dashboard/dashboard-user-provider"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar"
import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Field, FieldGroup, FieldLabel } from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"

export function ProfileSettings() {
  const user = useDashboardUser()
  const initials = getInitials(user.name, user.email)

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile information</CardTitle>
            <CardDescription>
              This is how you will appear to others in the workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Avatar
                  className="border-background size-20 border-2 shadow-sm"
                  size="lg"
                >
                  {user.imageUrl ? (
                    <AvatarImage alt={user.name} src={user.imageUrl} />
                  ) : null}
                  <AvatarFallback className="bg-primary/5 text-primary text-xl font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Change photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    JPG, GIF or PNG. Max size of 2MB.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="settings-name">Display name</FieldLabel>
                  <Input
                    id="settings-name"
                    defaultValue={user.name}
                    placeholder="Your name"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="settings-email">
                    Email address
                  </FieldLabel>
                  <Input
                    id="settings-email"
                    defaultValue={user.email}
                    type="email"
                    placeholder="name@example.com"
                  />
                </Field>
              </div>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workspace details</CardTitle>
            <CardDescription>
              Information about your current workspace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="settings-workspace">
                  Workspace name
                </FieldLabel>
                <Input id="settings-workspace" defaultValue="Nexion" disabled />
                <p className="text-muted-foreground mt-1 text-xs">
                  Workspace names can only be changed by administrators.
                </p>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-muted/30">
          <CardHeader>
            <CardTitle className="text-sm">Account Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4">
              {[
                ["Authentication", "Clerk"],
                ["Plan", "Free"],
                ["Region", "US-East"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Upgrade plan
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function getInitials(name: string, email: string) {
  const nameInitials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  if (nameInitials) {
    return nameInitials
  }

  return email[0]?.toUpperCase() ?? "N"
}
