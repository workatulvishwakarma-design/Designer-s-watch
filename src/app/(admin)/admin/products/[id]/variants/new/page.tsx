import { ProductVariantForm } from "@/components/admin/ProductVariantForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function NewVariantPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const family = await prisma.productFamily.findUnique({
    where: { id }
  })

  if (!family) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Add Variant to {family.name}
        </h1>
      </div>
      <ProductVariantForm familyId={family.id} />
    </div>
  )
}
