"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertCollection } from "@/actions/admin.collection.actions"

export function CollectionForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    if (initialData?.id) {
      formData.append("id", initialData.id)
    }

    try {
      const res = await upsertCollection(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success)
        router.push("/admin/categories") // Kept routing to categories for now
      }
    } catch (e) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
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
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {initialData ? "Edit Collection" : "Create Collection"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Manage the core editorial collections of the platform.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/categories"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-black dark:bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white dark:text-black shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isPending ? "Saving..." : "Save Collection"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#111] p-8 rounded-xl border border-gray-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 md:col-span-1">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Collection Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              defaultValue={initialData?.name}
              onChange={handleNameChange}
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm"
              placeholder="e.g. Tactix"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
            <input
              type="text"
              name="slug"
              id="slug"
              required
              defaultValue={initialData?.slug}
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm"
              placeholder="tactix"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Gender</label>
            <select
              name="gender"
              id="gender"
              defaultValue={initialData?.gender || "Unisex"}
              className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm"
            >
              <option value="Unisex">Unisex</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="meaning" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Tagline / Meaning</label>
          <input
            type="text"
            name="meaning"
            id="meaning"
            defaultValue={initialData?.meaning}
            className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm"
            placeholder="Tactical precision and utility..."
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Philosophy / Description</label>
          <textarea
            name="description"
            id="description"
            rows={4}
            required
            defaultValue={initialData?.description}
            className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 sm:text-sm"
            placeholder="Engineered for those who approach life..."
          />
        </div>
      </div>
    </form>
  )
}
