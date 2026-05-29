import { ProductFamilyForm } from "@/components/admin/ProductFamilyForm"
import { prisma } from "@/lib/db"

export default async function NewProductPage() {
  const collections = await prisma.collection.findMany({
    orderBy: { name: "asc" }
  })

  return (
    <div className="space-y-6 max-w-5xl">
      <ProductFamilyForm collections={collections} />
    </div>
  )
}
