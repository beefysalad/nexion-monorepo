"use client"

import { useState } from "react"

import { RiAlarmWarningLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"

export default function ComponentsErrorPreviewPage() {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error("Components error preview")
  }

  return (
    <main className="flex flex-1 items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-xl rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Error Preview</CardTitle>
          <CardDescription>
            Trigger the route error boundary manually to preview the error
            screen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShouldThrow(true)}>
            <RiAlarmWarningLine data-icon="inline-start" />
            Trigger error state
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
