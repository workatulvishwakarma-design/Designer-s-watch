"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"
import { Edit } from "lucide-react"

type CouponRow = {
  id: string
  code: string
  discount: string
  type: string
  usage: string
  status: boolean
  expires: string
}

const columns: Column<CouponRow>[] = [
  { header: "Code", accessor: (row) => <span className="font-mono font-medium tracking-wide">{row.code}</span> },
  { header: "Discount", accessor: "discount" },
  { header: "Usage", accessor: "usage" },
  { header: "Expires", accessor: "expires" },
  { 
    header: "Status", 
    accessor: (row) => (
      <Badge variant={row.status ? "success" : "neutral"}>
        {row.status ? "Active" : "Disabled"}
      </Badge>
    ) 
  },
  {
    header: "Actions",
    accessor: (row) => (
      <Link href={`/admin/coupons/${row.id}/edit`} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
        <Edit className="h-4 w-4" />
      </Link>
    )
  }
]

export function CouponsTable({ data }: { data: CouponRow[] }) {
  return <DataTable data={data} columns={columns} keyField="id" />
}
