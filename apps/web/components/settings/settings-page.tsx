"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import {
  RiCheckLine,
  RiComputerLine,
  RiLockPasswordLine,
  RiMailLine,
  RiMoonLine,
  RiNotification3Line,
  RiShieldCheckLine,
  RiSunLine,
  RiUser3Line,
} from "@remixicon/react"

import { BrandThemeSettings } from "@/components/dashboard/brand-theme-settings"
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field"
import { Input } from "@workspace/ui/components/input"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs"
import { cn } from "@workspace/ui/lib/utils"

const themeOptions = [
  {
    icon: RiSunLine,
    label: "Light",
    value: "light",
  },
  {
    icon: RiMoonLine,
    label: "Dark",
    value: "dark",
  },
  {
    icon: RiComputerLine,
    label: "System",
    value: "system",
  },
]

function SettingsPage() {
  const user = useDashboardUser()
  const { setTheme, theme } = useTheme()
  const initials = getInitials(user.name, user.email)
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true)
  const [productUpdatesEnabled, setProductUpdatesEnabled] = useState(true)
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true)
  const [sessionReviewEnabled, setSessionReviewEnabled] = useState(false)

  return (
    <main className="flex flex-1 flex-col gap-6 p-4 md:p-8">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">Settings</p>
          <h1 className="font-heading text-3xl font-semibold tracking-normal md:text-4xl">
            Workspace settings
          </h1>
        </div>
        <Button className="w-full sm:w-auto">
          <RiCheckLine data-icon="inline-start" />
          Save changes
        </Button>
      </section>

      <Tabs defaultValue="profile" className="gap-5">
        <TabsList
          variant="line"
          className="w-full justify-start overflow-x-auto"
        >
          <TabsTrigger value="profile">
            <RiUser3Line />
            Profile
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <RiSunLine />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <RiNotification3Line />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <RiShieldCheckLine />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="profile"
          className="grid gap-4 lg:grid-cols-[1fr_0.8fr]"
        >
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Identity used across the workspace shell.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <div className="bg-muted/30 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-16" size="lg">
                      {user.imageUrl ? (
                        <AvatarImage alt={user.name} src={user.imageUrl} />
                      ) : null}
                      <AvatarFallback className="text-lg font-semibold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Profile photo</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline">Upload</Button>
                    <Button variant="ghost">Remove</Button>
                  </div>
                </div>
                <Field>
                  <FieldLabel htmlFor="settings-name">Display name</FieldLabel>
                  <Input id="settings-name" defaultValue={user.name} disabled />
                </Field>
                <Field>
                  <FieldLabel htmlFor="settings-email">
                    Email address
                  </FieldLabel>
                  <Input
                    id="settings-email"
                    defaultValue={user.email}
                    type="email"
                    disabled
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="settings-workspace">
                    Workspace name
                  </FieldLabel>
                  <Input
                    id="settings-workspace"
                    defaultValue="Nexion"
                    disabled
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Connected authentication and billing state.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                ["Authentication", "Clerk connected"],
                ["Plan", "Development workspace"],
                ["API sync", "Current user synced"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-muted/30 flex items-center justify-between gap-4 rounded-lg border px-4 py-3 text-sm"
                >
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="grid gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Display</CardTitle>
              <CardDescription>
                Theme preferences for this browser.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-3">
              {themeOptions.map((option) => {
                const Icon = option.icon
                const isActive = theme === option.value

                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "bg-background hover:border-primary flex min-h-24 items-center justify-between rounded-lg border p-4 text-left transition-colors",
                      isActive && "border-primary ring-ring/25 ring-2"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="bg-muted flex size-9 items-center justify-center rounded-lg">
                        <Icon className="text-primary size-5" />
                      </span>
                      <span className="font-medium">{option.label}</span>
                    </span>
                    {isActive ? (
                      <RiCheckLine className="text-primary size-5" />
                    ) : null}
                  </button>
                )
              })}
            </CardContent>
          </Card>

          <BrandThemeSettings />
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Email preferences for workspace activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <SettingSwitch
                  checked={weeklyDigestEnabled}
                  description="A compact summary of workspace activity and sync status."
                  icon={RiMailLine}
                  label="Weekly digest"
                  onCheckedChange={setWeeklyDigestEnabled}
                />
                <Separator />
                <SettingSwitch
                  checked={productUpdatesEnabled}
                  description="New features, UI updates, and platform changes."
                  icon={RiNotification3Line}
                  label="Product updates"
                  onCheckedChange={setProductUpdatesEnabled}
                />
                <Separator />
                <SettingSwitch
                  checked={securityAlertsEnabled}
                  description="Sign-in, session, and integration security events."
                  icon={RiShieldCheckLine}
                  label="Security alerts"
                  onCheckedChange={setSecurityAlertsEnabled}
                />
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Session controls for the authenticated workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <SettingSwitch
                  checked={sessionReviewEnabled}
                  description="Require a fresh sign-in before sensitive workspace changes."
                  icon={RiLockPasswordLine}
                  label="Sensitive action review"
                  onCheckedChange={setSessionReviewEnabled}
                />
                <Separator />
                <div className="bg-muted/30 flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active sessions</p>
                    <p className="text-muted-foreground text-sm">
                      Manage sessions from the account menu.
                    </p>
                  </div>
                  <Button variant="outline">Open account</Button>
                </div>
              </FieldGroup>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
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

function SettingSwitch({
  checked,
  description,
  icon: Icon,
  label,
  onCheckedChange,
}: {
  checked: boolean
  description: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  onCheckedChange: (checked: boolean) => void
}) {
  return (
    <Field
      orientation="horizontal"
      className="items-start justify-between gap-4"
    >
      <FieldContent className="flex-row items-start gap-3">
        <span className="bg-muted mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-primary size-5" />
        </span>
        <span className="space-y-1">
          <FieldTitle>{label}</FieldTitle>
          <FieldDescription>{description}</FieldDescription>
        </span>
      </FieldContent>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </Field>
  )
}

export { SettingsPage }
