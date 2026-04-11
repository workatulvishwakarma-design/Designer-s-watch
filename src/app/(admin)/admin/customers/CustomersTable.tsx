"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"

type CustomerRow = {
  id: string
  name: string
  email: string
  joined: string
  orderCount: number
  ltv: string
}

const columns: Column<CustomerRow>[] = [
  { header: "Name", accessor: "name", sortKey: "name" },
  { header: "Email", accessor: "email", sortKey: "email" },
  { header: "Joined", accessor: "joined", sortKey: "joined" },
  { header: "Orders", accessor: "orderCount", sortKey: "orderCount" },
  { header: "Lifetime Value", accessor: "ltv", sortKey: "ltv" },
  {
    header: "Status",
    accessor: (row) => (
      <Badge variant={row.orderCount > 0 ? "success" : "neutral"}>
        {row.orderCount > 0 ? "Active" : "New"}
      </Badge>
    ),
    exportValue: (row) => row.orderCount > 0 ? "Active" : "New",
  }
]

export function CustomersTable({ data }: { data: CustomerRow[] }) {
  return (
    <DataTable
      data={data}
      columns={columns}
      keyField="id"
      searchable
      searchPlaceholder="Search by name or email..."
      exportable
      exportFilename="DesignerWorld_Customers"
      getRowHref={(row) => `/admin/customers/${row.id}`}
      pageSize={20}
      stickyHeader
    />
  )
}
