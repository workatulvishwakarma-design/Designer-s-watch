"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"

type ProductRow = {
  id: string
  name: string
  price: string
  status: string
  inventory: number
  collection?: string
}

const columns: Column<ProductRow>[] = [
  { header: "Watch Family Name", accessor: "name" },
  { header: "Collection", accessor: "collection" },
  { header: "Base Price", accessor: "price" },
  { 
    header: "Status", 
    accessor: (row) => (
      <Badge variant={row.status === "ACTIVE" ? "success" : "neutral"}>
        {row.status}
      </Badge>
    )
  },
  { 
    header: "Stock Units", 
    accessor: (row) => (
      <span className={`font-semibold ${row.inventory === 0 ? 'text-rose-600' : row.inventory < 10 ? 'text-amber-600' : 'text-slate-800'}`}>
        {row.inventory}
      </span>
    ) 
  },
]

export function ProductsTable({ data }: { data: ProductRow[] }) {
  return (
    <DataTable 
      data={data} 
      columns={columns} 
      keyField="id" 
      searchable 
      searchPlaceholder="Search products by name or collection..."
      exportable
      exportFilename="products-catalog"
      pageSize={15}
      getRowHref={(row) => `/admin/products/${row.id}`} 
    />
  )
}
