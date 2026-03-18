import { ProductForm } from "@/components/admin/ProductForm"
import { prisma } from "@/lib/db"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortPriority: "asc" }
  })

  return (
    <div className="space-y-6 max-w-5xl">
      <ProductForm categories={categories} />
    </div>
  )
}
