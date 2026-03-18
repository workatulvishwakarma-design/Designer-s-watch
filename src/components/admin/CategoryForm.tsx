"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertCategory } from "@/actions/admin.category.actions"
import { ImageUploader } from "@/components/admin/ImageUploader"

export function CategoryForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    if (initialData?.id) formData.append("id", initialData.id)

    const res = await upsertCategory(formData)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      router.push("/admin/categories")
    }
    setIsPending(false)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!initialData) {
      const slugInput = document.getElementById("slug") as HTMLInputElement
      if (slugInput) {
        slugInput.value = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium leading-6 text-gray-900 dark:text-gray-100">
          {initialData ? "Edit Category" : "Create New Category"}
        </h2>
        <div className="flex items-center space-x-4">
          <Link href="/admin/categories" className="text-sm font-semibold text-gray-900 dark:text-gray-100 hover:underline">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Category"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Name</label>
          <input
            type="text" name="name" id="name" required
            defaultValue={initialData?.name}
            onChange={handleNameChange}
            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>

        <div>
           <label htmlFor="slug" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Slug</label>
           <input
             type="text" name="slug" id="slug" required
             defaultValue={initialData?.slug}
             className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
           />
        </div>

        <div>
           <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Description</label>
           <textarea
             name="description" id="description" rows={3}
             defaultValue={initialData?.description}
             className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
           />
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-zinc-800">
          <div>
            <label htmlFor="sortPriority" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Menu Sort Priority (0 is first)</label>
            <input
              type="number" name="sortPriority" id="sortPriority" required min="0"
              defaultValue={initialData?.sortPriority || 0}
              className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
            />
          </div>

          <div className="flex items-center pt-8">
            <input
              type="checkbox" name="visibility" id="visibility"
              defaultChecked={initialData ? initialData.visibility : true}
              className="h-4 w-4 rounded border-gray-300 dark:border-zinc-700 text-black focus:ring-black"
            />
            <label htmlFor="visibility" className="ml-3 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
              Visible on Storefront
            </label>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
           <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-2">Collection Header Image</label>
           <ImageUploader maxImages={1} />
        </div>
      </div>
    </form>
  )
}
