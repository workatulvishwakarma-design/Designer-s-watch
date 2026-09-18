import { ProductsTable } from "./ProductsTable"
import Link from "next/link"
import { Plus } from "lucide-react"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
  const families = await prisma.productFamily.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      variants: {
        include: { inventory: true }
      },
      collection: true
    }
  });

  const mappedData = families.map(f => {
    // Calculate total inventory across variants
    const totalInventory = f.variants.reduce((acc, v) => acc + (v.inventory?.stock || 0), 0);
    // Get a baseline price
    const basePrice = f.variants.length > 0 ? f.variants[0].price : 0;

    return {
      id: f.id,
      name: f.name,
      price: `₹${Number(basePrice).toLocaleString()}`,
      status: f.status,
      inventory: totalInventory,
      collection: f.collection?.name || "Unassigned"
    };
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Watch Products Catalog</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Manage all watch families, collection assignments, base pricing, and aggregated variant inventory.
          </p>
        </div>
        <div>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Watch
          </Link>
        </div>
      </div>
      
      <ProductsTable data={mappedData} />
    </div>
  )
}
