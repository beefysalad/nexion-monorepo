"use client"

import { useEffect, useRef, useState } from "react"
import { RiCheckLine, RiFileCopyLine } from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"

const DEV_COMMAND = "npm run dev:apps"
const COPIED_RESET_MS = 1600

function CopyCommandButton() {
  const [copied, setCopied] = useState(false)
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current)
      }
    }
  }, [])

  async function handleCopyCommand() {
    try {
      await navigator.clipboard.writeText(DEV_COMMAND)
    } catch {
      return
    }

    setCopied(true)

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current)
    }

    resetTimeoutRef.current = setTimeout(
      () => setCopied(false),
      COPIED_RESET_MS
    )
  }

  return (
    <Button
      type="button"
      onClick={handleCopyCommand}
      className="border-lp-ink bg-lp-ink text-lp-paper hover:bg-lp-ink h-12 gap-0 rounded-lg py-0 pr-2 pl-[18px] font-mono text-[15px] font-medium shadow-none hover:opacity-88 hover:shadow-none"
    >
      <span className="opacity-55">$&nbsp;</span>
      {DEV_COMMAND}
      <span className="bg-lp-paper/10 ml-4 inline-flex h-8 items-center gap-1.5 rounded-[5px] px-2.5 font-sans text-xs">
        {copied ? (
          <RiCheckLine className="size-3.5" />
        ) : (
          <RiFileCopyLine className="size-3.5" />
        )}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </span>
    </Button>
  )
}

export { CopyCommandButton }
