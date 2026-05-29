import { ProductVariantForm } from "@/components/admin/ProductVariantForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditVariantPage({ params }: { params: Promise<{ id: string, variantId: string }> }) {
  const { id, variantId } = await params
  
  const family = await prisma.productFamily.findUnique({
    where: { id }
  })

  if (!family) {
    notFound()
  }

  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: {
      inventory: true
    }
  })

  if (!variant) {
    notFound()
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Edit Variant: {variant.sku}
        </h1>
        <p className="text-sm text-gray-500">Family: {family.name}</p>
      </div>
      <ProductVariantForm familyId={family.id} initialData={variant} />
    </div>
  )
}
