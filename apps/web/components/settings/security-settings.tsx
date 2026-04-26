"use client"

import { useState } from "react"
import { RiLockPasswordLine } from "@remixicon/react"
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
  FieldTitle,
} from "@workspace/ui/components/field"
import { Switch } from "@workspace/ui/components/switch"

export function SecuritySettings() {
  const [sessionReviewEnabled, setSessionReviewEnabled] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account security</CardTitle>
          <CardDescription>
            Protect your account with additional verification layers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field
              orientation="horizontal"
              className="items-start justify-between py-2"
            >
              <FieldContent className="flex-row items-start gap-4">
                <div className="bg-muted/50 mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg border">
                  <RiLockPasswordLine className="text-muted-foreground size-5" />
                </div>
                <div className="space-y-1">
                  <FieldTitle className="text-base">
                    Sensitive action review
                  </FieldTitle>
                  <FieldDescription className="max-w-md">
                    Require a fresh sign-in before making sensitive workspace
                    changes.
                  </FieldDescription>
                </div>
              </FieldContent>
              <Switch
                checked={sessionReviewEnabled}
                onCheckedChange={setSessionReviewEnabled}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card className="border-destructive/20 bg-destructive/[0.01]">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>
            Irreversible actions related to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-destructive/20 bg-background flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Delete account</p>
              <p className="text-muted-foreground text-sm">
                Permanently remove your account and all associated data.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
