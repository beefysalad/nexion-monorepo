"use client"

import * as React from "react"
import type { Column } from "@tanstack/react-table"
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiEyeOffLine,
  RiExpandUpDownLine,
} from "@remixicon/react"

import { Button } from "@workspace/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { cn } from "@workspace/ui/lib/utils"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <RiArrowDownSLine className="size-4" />
            ) : column.getIsSorted() === "asc" ? (
              <RiArrowUpSLine className="size-4" />
            ) : (
              <RiExpandUpDownLine className="size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {column.getCanSort() ? (
            <>
              <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                <RiArrowUpSLine className="size-4" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                <RiArrowDownSLine className="size-4" />
                Desc
              </DropdownMenuItem>
            </>
          ) : null}
          {column.getCanSort() && column.getCanHide() ? (
            <DropdownMenuSeparator />
          ) : null}
          {column.getCanHide() ? (
            <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
              <RiEyeOffLine className="size-4" />
              Hide
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { DataTableColumnHeader }
