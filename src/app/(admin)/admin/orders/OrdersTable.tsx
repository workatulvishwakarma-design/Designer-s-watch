"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"
import { Eye } from "lucide-react"

type OrderRow = {
  id: string
  date: string
  customer: string
  method: string
  total: string
  status: string
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED": return "success"
    case "PENDING":
    case "PROCESSING": return "warning"
    case "CANCELLED":
    case "REFUNDED": return "error"
    case "SHIPPED": return "info"
    default: return "neutral"
  }
}

const columns: Column<OrderRow>[] = [
  { 
    header: "Order ID", 
    accessor: (row) => <span className="font-mono text-xs">{row.id.toUpperCase().slice(-8)}</span> 
  },
  { header: "Date", accessor: "date" },
  { header: "Customer", accessor: "customer" },
  { 
    header: "Payment", 
    accessor: (row) => (
      <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-zinc-800 dark:text-gray-400 px-2 py-1 rounded">
        {row.method}
      </span>
    )
  },
  { header: "Total", accessor: "total" },
  { 
    header: "Status", 
    accessor: (row) => (
      <Badge variant={getStatusColor(row.status)}>
        {row.status}
      </Badge>
    ) 
  },
  {
    header: "Actions",
    accessor: (row) => (
      <Link href={`/admin/orders/${row.id}`} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <Eye className="h-4 w-4" />
      </Link>
    )
  }
]

export function OrdersTable({ data }: { data: OrderRow[] }) {
  return <DataTable data={data} columns={columns} keyField="id" />
}
