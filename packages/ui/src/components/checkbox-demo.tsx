"use client"

import * as React from "react"

import { Checkbox } from "@workspace/ui/components/checkbox"
import { Label } from "@workspace/ui/components/label"

function CheckboxDemo() {
  const [checked, setChecked] = React.useState<boolean>(true)

  return (
    <div className="flex items-start gap-3 rounded-lg border p-4">
      <Checkbox
        id="checkbox-demo"
        checked={checked}
        onCheckedChange={(value) => setChecked(value === true)}
      />
      <div className="grid gap-1.5">
        <Label htmlFor="checkbox-demo">Require approval before publish</Label>
        <p className="text-muted-foreground text-sm">
          Keep a human review step in the release flow.
        </p>
      </div>
    </div>
  )
}

export { CheckboxDemo }
