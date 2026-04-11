"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import Link from "next/link"

type ProductRow = {
  id: string
  name: string
  price: string
  status: string
  inventory: number
}

const columns: Column<ProductRow>[] = [
  { header: "Name", accessor: "name" },
  { header: "Price", accessor: "price" },
  { 
    header: "Status", 
    accessor: (row) => (
      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
        row.status === "ACTIVE" 
          ? "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20"
          : "bg-gray-50 text-gray-600 ring-gray-500/10 dark:bg-zinc-800 dark:text-gray-400 dark:ring-white/10"
      }`}>
        {row.status}
      </span>
    )
  },
  { header: "Stock", accessor: "inventory" },
]

export function ProductsTable({ data }: { data: ProductRow[] }) {
  return <DataTable data={data} columns={columns} keyField="id" getRowHref={(row) => `/admin/products/${row.id}/edit`} />
}
