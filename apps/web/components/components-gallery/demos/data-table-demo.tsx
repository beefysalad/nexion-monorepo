"use client"

import * as React from "react"
import type { ColumnDef } from "@tanstack/react-table"
import {
  RiArrowRightLine,
  RiMore2Line,
  RiUserLine,
} from "@remixicon/react"

import { Badge } from "@workspace/ui/components/badge"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"
import { DataTable } from "@workspace/ui/components/data-table"
import { DataTableColumnHeader } from "@workspace/ui/components/data-table-column-header"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"

type PaymentStatus = "pending" | "processing" | "success" | "failed"

type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  email: string
}

const payments: Payment[] = [
  { id: "728ed52f", amount: 100, status: "pending", email: "m@example.com" },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "f91c6a21",
    amount: 342,
    status: "success",
    email: "ops@nexion.dev",
  },
  {
    id: "07f5ab12",
    amount: 89,
    status: "failed",
    email: "alerts@nexion.dev",
  },
  {
    id: "8c44de19",
    amount: 560,
    status: "success",
    email: "finance@nexion.dev",
  },
  {
    id: "c38f91d7",
    amount: 214,
    status: "processing",
    email: "patrick@nexion.dev",
  },
]

const statusVariantMap: Record<PaymentStatus, "outline" | "secondary" | "destructive"> =
  {
    pending: "outline",
    processing: "secondary",
    success: "secondary",
    failed: "destructive",
  }

const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge variant={statusVariantMap[row.original.status]}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="justify-end"
      />
    ),
    cell: ({ row }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(row.original.amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="ml-auto">
            <span className="sr-only">Open menu</span>
            <RiMore2Line className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(row.original.id)}
          >
            Copy payment ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <RiUserLine className="size-4" />
            View customer
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RiArrowRightLine className="size-4" />
            View payment details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DataTableDemo() {
  return (
    <DataTable
      columns={columns}
      data={payments}
      filterColumnId="email"
      filterPlaceholder="Filter emails..."
      pageSizeOptions={[5, 10, 20]}
    />
  )
}

export { DataTableDemo }
