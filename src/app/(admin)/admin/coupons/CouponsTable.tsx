"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"

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
  { 
    header: "Code", 
    accessor: (row) => <span className="font-mono font-semibold tracking-wider text-slate-900 bg-slate-100 border border-slate-200/80 px-2 py-1 rounded-md text-xs">{row.code}</span>,
    exportValue: (row) => row.code,
    sortKey: "code",
  },
  { header: "Discount", accessor: "discount", sortKey: "discount" },
  { header: "Usage", accessor: "usage", sortKey: "usage" },
  { header: "Expires", accessor: "expires", sortKey: "expires" },
  { 
    header: "Status", 
    accessor: (row) => (
      <Badge variant={row.status ? "success" : "neutral"}>
        {row.status ? "Active" : "Disabled"}
      </Badge>
    ),
    exportValue: (row) => row.status ? "Active" : "Disabled",
  },
]

export function CouponsTable({ data }: { data: CouponRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      keyField="id"
      searchable
      searchPlaceholder="Search by coupon code..."
      exportable
      exportFilename="DesignerWorld_Coupons"
      getRowHref={(row) => `/admin/coupons/${row.id}/edit`}
      pageSize={15}
    />
  )
}
