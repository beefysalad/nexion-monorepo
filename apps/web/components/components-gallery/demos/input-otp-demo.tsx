"use client"

import * as React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp"
import { Label } from "@workspace/ui/components/label"

function InputOTPDemo() {
  const [value, setValue] = React.useState("")

  return (
    <div className="grid gap-3 rounded-lg border p-4">
      <div className="grid gap-1">
        <Label htmlFor="otp-demo">Verification code</Label>
        <p className="text-muted-foreground text-sm">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>
      <InputOTP
        id="otp-demo"
        maxLength={6}
        value={value}
        onChange={setValue}
        containerClassName="justify-start"
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  )
}

export { InputOTPDemo }
