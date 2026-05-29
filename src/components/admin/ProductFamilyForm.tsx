"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertProductFamily } from "@/actions/admin.product.actions"

export function ProductFamilyForm({ collections, initialData }: { collections: any[], initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "story">("general")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    if (initialData?.id) {
      formData.append("id", initialData.id)
    }

    try {
      const res = await upsertProductFamily(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success)
        if (!initialData) {
            router.push("/admin/products")
        }
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

  const tabs = [
    { id: "general", label: "General" },
    { id: "story", label: "Story & Heritage" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header & Global Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {initialData ? "Edit Family" : "Register New Family"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">A family groups multiple variants (models) together.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Back
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-black dark:bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white dark:text-black shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isPending ? "Saving..." : "Save Family"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Main Form Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 dark:border-zinc-800 overflow-x-auto">
            <nav className="-mb-px flex space-x-6 min-w-max" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`
                    whitespace-nowrap border-b-2 py-4 px-1 text-[11px] font-bold uppercase tracking-widest transition-all
                    ${activeTab === tab.id 
                      ? "border-black text-black dark:border-white dark:text-white" 
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300"}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* GENERAL TAB */}
          <div className={activeTab === "general" ? "block space-y-8" : "hidden"}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Family Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={initialData?.name}
                  onChange={handleNameChange}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="e.g. Tactix 840"
                />
              </div>

              <div>
                <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">URL Slug</label>
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  defaultValue={initialData?.slug}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="tactix-840"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  required
                  defaultValue={initialData?.description}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Describe the family..."
                />
              </div>
            </div>
          </div>

          {/* STORY TAB */}
          <div className={activeTab === "story" ? "block space-y-8" : "hidden"}>
            <div className="space-y-4">
              <div>
                <label htmlFor="heritageText" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Heritage Text</label>
                <textarea
                  name="heritageText"
                  id="heritageText"
                  rows={3}
                  defaultValue={initialData?.heritageText}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Since 1990..."
                />
              </div>
              
              <div>
                <label htmlFor="storyText" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Philosophy / Story Text</label>
                <textarea
                  name="storyText"
                  id="storyText"
                  rows={4}
                  defaultValue={initialData?.storyText}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Crafted for the modern explorer..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">
              Organization
            </h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="status" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Status</label>
                <select
                  name="status"
                  id="status"
                  defaultValue={initialData?.status || "DRAFT"}
                  className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              <div>
                <label htmlFor="collectionId" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Collection</label>
                <select
                  name="collectionId"
                  id="collectionId"
                  defaultValue={initialData?.collectionId || ""}
                  className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm"
                >
                  <option value="">-- None --</option>
                  {collections.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="brand" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Brand</label>
                <select
                  name="brand"
                  id="brand"
                  defaultValue={initialData?.brand || "D'SIGNER"}
                  className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm"
                >
                  <option value="D'SIGNER">D'SIGNER</option>
                  <option value="ESCORT">ESCORT</option>
                </select>
              </div>

              <div>
                <label htmlFor="gender" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Gender</label>
                <select
                  name="gender"
                  id="gender"
                  defaultValue={initialData?.gender || ""}
                  className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm"
                >
                  <option value="">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">
              Visibility Features
            </h3>
            <div className="space-y-4">
              {['featured', 'newArrival', 'bestSeller', 'limitedEdition'].map((field) => (
                <div key={field} className="relative flex items-start">
                  <div className="flex h-6 items-center">
                    <input
                      id={field}
                      name={field}
                      type="checkbox"
                      defaultChecked={initialData?.[field]}
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black dark:border-zinc-700 dark:bg-zinc-900 dark:checked:bg-white"
                    />
                  </div>
                  <div className="ml-3 text-sm leading-6">
                    <label htmlFor={field} className="font-medium text-gray-900 dark:text-gray-300 capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
