import { prisma } from "@/lib/db"
import { ProductsTable } from "./ProductsTable"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      inventory: { select: { stock: true } }
    },
    orderBy: { createdAt: "desc" }
  })

  const mappedData = products.map(p => ({
    id: p.id,
    name: p.name,
    price: `₹${Number(p.price).toLocaleString()}`,
    status: p.status,
    inventory: p.inventory.reduce((acc, inv) => acc + inv.stock, 0),
  }))

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Products</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            A list of all watches in your catalog including their name, price, status, and stock.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/products/new"
            className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 dark:hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
            Add Product
          </Link>
        </div>
      </div>
      
      <ProductsTable data={mappedData} />
    </div>
  )
}
