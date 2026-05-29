import { ProductsTable } from "./ProductsTable"
import Link from "next/link"
import { Plus } from "lucide-react"
import { prisma } from "@/lib/db"

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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Product Families</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A list of all watch families in your catalog including their name, base price, and total inventory across variants.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
            Add Family
          </Link>
        </div>
      </div>
      
      <ProductsTable data={mappedData} />
    </div>
  )
}
