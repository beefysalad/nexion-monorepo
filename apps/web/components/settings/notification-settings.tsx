"use client"

import { useState } from "react"
import {
  RiMailLine,
  RiNotification3Line,
  RiShieldCheckLine,
} from "@remixicon/react"
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
  FieldTitle,
} from "@workspace/ui/components/field"
import { Separator } from "@workspace/ui/components/separator"
import { Switch } from "@workspace/ui/components/switch"

export function NotificationSettings() {
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true)
  const [productUpdatesEnabled, setProductUpdatesEnabled] = useState(true)
  const [securityAlertsEnabled, setSecurityAlertsEnabled] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Notifications</CardTitle>
        <CardDescription>
          Choose what you want to be notified about via email.
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
  )
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
      className="items-start justify-between py-2"
    >
      <FieldContent className="flex-row items-start gap-4">
        <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
          <Icon className="size-5 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <FieldTitle className="text-base">{label}</FieldTitle>
          <FieldDescription className="max-w-md">{description}</FieldDescription>
        </div>
      </FieldContent>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </Field>
  )
}
