import { CategoryForm } from "@/components/admin/CategoryForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = await prisma.category.findUnique({
    where: { id },
  })

  if (!category) notFound()

  return (
    <div className="space-y-6 max-w-5xl">
      <CategoryForm initialData={category} />
    </div>
  )
}
