"use client"

import * as React from "react"
import {
  RiMore2Line,
  RiShareLine,
  RiStarLine,
  RiDeleteBinLine,
} from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

function DropdownMenuDemo() {
  const [starred, setStarred] = React.useState(false)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <RiMore2Line className="size-4" />
          Open menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Project actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText("nxn-01")}>
          Copy project ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStarred((value) => !value)}>
          <RiStarLine className="size-4" />
          {starred ? "Remove star" : "Add star"}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <RiShareLine className="size-4" />
          Share workspace
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <RiDeleteBinLine className="size-4" />
          Archive project
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { DropdownMenuDemo }
