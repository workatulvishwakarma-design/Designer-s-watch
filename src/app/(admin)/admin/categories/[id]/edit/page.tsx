import { CategoryForm } from "@/components/admin/CategoryForm"
import { prisma } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.category.findUnique({
    where: { id: params.id },
  })

  if (!category) notFound()

  return (
    <div className="space-y-6 max-w-5xl">
      <CategoryForm initialData={category} />
    </div>
  )
}
