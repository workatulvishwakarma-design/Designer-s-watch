import { ProductForm } from "@/components/admin/ProductForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      inventory: true,
      images: { orderBy: { sortOrder: "asc" } },
    }
  })

  if (!product) {
    notFound()
  }

  const categories = await prisma.category.findMany({
    orderBy: { sortPriority: "asc" }
  })

  return (
    <div className="space-y-6 max-w-5xl">
      <ProductForm categories={categories} initialData={product} />
    </div>
  )
}
