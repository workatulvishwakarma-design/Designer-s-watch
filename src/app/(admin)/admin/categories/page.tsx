import { prisma } from "@/lib/db"
import { DataTable, Column } from "@/components/admin/DataTable"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { CategoryClientActions } from "./ClientActions"

export default async function AdminCategoriesPage() {
  // Fetch real data from DB
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { sortPriority: "asc" },
  })

  // We convert dates and counts to string/number format matching the table mapping easily
  const mappedData = categories.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    products: c._count.products,
    visibility: c.visibility,
    sortPriority: c.sortPriority,
  }))

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">Collections & Categories</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Define your product collections and control homepage display priority.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            href="/admin/categories/new"
            className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <Plus className="-ml-0.5 mr-1.5 h-4 w-4" />
            Add Collection
          </Link>
        </div>
      </div>
      
      {/* We defer Delete button logic to a client wrapper */}
      <CategoryClientActions initialData={mappedData} />
    </div>
  )
}
