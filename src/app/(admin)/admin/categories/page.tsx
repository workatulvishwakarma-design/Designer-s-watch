import { prisma } from "@/lib/db"
import Link from "next/link"
import { Plus } from "lucide-react"
import { CategoryClientActions } from "./ClientActions"

export const dynamic = "force-dynamic"

export default async function AdminCategoriesPage() {
  const collections = await prisma.collection.findMany({
    include: { _count: { select: { families: true } } },
    orderBy: { createdAt: "asc" },
  })

  const mappedData = collections.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    products: c._count.families,
    visibility: "ACTIVE",
    sortPriority: 0,
  }))

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Collections & Categories</h1>
          <p className="mt-1 text-xs text-slate-500 font-medium">
            Define watch collections, view linked watch models, and manage navigation groupings.
          </p>
        </div>
        <div>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Collection
          </Link>
        </div>
      </div>
      
      <CategoryClientActions initialData={mappedData} />
    </div>
  )
}
