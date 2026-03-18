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
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Joined", accessor: "joined" },
  { header: "Orders", accessor: "orderCount" },
  { header: "Lifetime Value", accessor: "ltv" },
  {
    header: "Status",
    accessor: () => (
      <Badge variant="success">Active</Badge>
    )
  }
]

export function CustomersTable({ data }: { data: CustomerRow[] }) {
  return <DataTable data={data} columns={columns} keyField="id" />
}
