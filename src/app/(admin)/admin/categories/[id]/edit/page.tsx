import { CollectionForm } from "@/components/admin/CollectionForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const collection = await prisma.collection.findUnique({
    where: { id },
  })

  if (!collection) notFound()

  return (
    <div className="space-y-6 max-w-5xl">
      <CollectionForm initialData={collection} />
    </div>
  )
}
