import { ProductFamilyForm } from "@/components/admin/ProductFamilyForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Plus } from "lucide-react"
import { DataTable, Column } from "@/components/admin/DataTable"

type VariantRow = {
  id: string
  sku: string
  price: string
  stock: number
  color: string
}

const variantColumns: Column<VariantRow>[] = [
  { header: "SKU", accessor: "sku" },
  { header: "Color", accessor: "color" },
  { header: "Price", accessor: "price" },
  { header: "Stock", accessor: "stock" },
]

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const family = await prisma.productFamily.findUnique({
    where: { id },
    include: {
      variants: {
        include: { inventory: true }
      },
    }
  })

  if (!family) {
    notFound()
  }

  const collections = await prisma.collection.findMany({
    orderBy: { name: "asc" }
  })

  const mappedVariants = family.variants.map(v => ({
    id: v.id,
    sku: v.sku,
    price: `₹${Number(v.price).toLocaleString()}`,
    stock: v.inventory?.stock || 0,
    color: v.dialColor || v.color || "N/A"
  }))

  return (
    <div className="space-y-10 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 mb-6 border-b border-slate-200/90 pb-4">
          Family Details
        </h2>
        <ProductFamilyForm collections={collections} initialData={family} />
      </div>

      <div className="pt-8 border-t border-slate-200/90">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Variants</h2>
            <p className="mt-1 text-sm text-slate-500 font-medium">
              Manage the individual models, pricing, and inventory for this family.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href={`/admin/products/${family.id}/variants/new`}
              className="flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-800 transition-colors"
            >
              <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
              Add Variant
            </Link>
          </div>
        </div>
        
        {mappedVariants.length > 0 ? (
          <DataTable data={mappedVariants} columns={variantColumns} keyField="id" getRowHref={(row) => `/admin/products/${family.id}/variants/${row.id}`} />
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <h3 className="text-sm font-bold text-slate-900">No variants</h3>
            <p className="mt-1 text-sm text-slate-500 font-medium">Get started by creating a new variant for this family.</p>
          </div>
        )}
      </div>
    </div>
  )
}
