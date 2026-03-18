"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertProduct } from "@/actions/admin.product.actions"
import { ImageUploader } from "@/components/admin/ImageUploader"

export function ProductForm({ categories, initialData }: { categories: any[], initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "pricing" | "story" | "specs" | "media" | "inventory" | "seo">("general")

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    // Map initial ID if editing
    if (initialData?.id) {
      formData.append("id", initialData.id)
    }

    try {
      const res = await upsertProduct(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success)
        router.push("/admin/products")
      }
    } catch (e) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  // Generates slug from title
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
    { id: "pricing", label: "Pricing" },
    { id: "story", label: "Story & Heritage" },
    { id: "specs", label: "Specifications" },
    { id: "media", label: "Media" },
    { id: "inventory", label: "Inventory" },
    { id: "seo", label: "SEO Settings" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header & Global Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {initialData ? "Edit Masterpiece" : "Register New Timepiece"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Fill in the details for the luxury showcase.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-black dark:bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white dark:text-black shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isPending ? "Persisting..." : "Save Product"}
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
                      : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* TAB: General */}
          {activeTab === "general" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Title / Reference</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  defaultValue={initialData?.name}
                  onChange={handleNameChange}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="e.g. Royal Oak Selfwinding 41mm"
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="slug" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Slug Handle</label>
                <div className="flex rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-800">
                  <span className="inline-flex items-center bg-gray-100 dark:bg-zinc-800 px-4 text-xs font-medium text-gray-500 border-r border-gray-200 dark:border-zinc-800">
                    /product/
                  </span>
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    required
                    defaultValue={initialData?.slug}
                    className="block w-full border-0 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-0"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label htmlFor="description" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Main Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows={8}
                  required
                  defaultValue={initialData?.description}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="The primary sales copy for the product..."
                />
              </div>
            </div>
          )}

          {/* TAB: Pricing */}
          {activeTab === "pricing" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label htmlFor="price" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Selling Price (INR)</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      id="price"
                      required
                      defaultValue={initialData?.price}
                      className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="comparePrice" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Compare at (MSRP)</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <span className="text-gray-500 font-medium">₹</span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      name="comparePrice"
                      id="comparePrice"
                      defaultValue={initialData?.comparePrice}
                      className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Story & Heritage */}
          {activeTab === "story" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="space-y-4">
                <label htmlFor="heritageText" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Heritage & Lineage</label>
                <textarea
                  id="heritageText"
                  name="heritageText"
                  rows={4}
                  defaultValue={initialData?.heritageText}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="The historical context of this collection..."
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="storyText" className="block text-xs font-bold uppercase tracking-widest text-gray-400">The Narrative</label>
                <textarea
                  id="storyText"
                  name="storyText"
                  rows={6}
                  defaultValue={initialData?.storyText}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  placeholder="A compelling story about the craftsmanship or design inspiration..."
                />
              </div>
            </div>
          )}

          {/* TAB: Specifications */}
          {activeTab === "specs" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label htmlFor="movementType" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Movement</label>
                  <input
                    type="text"
                    name="movementType"
                    id="movementType"
                    defaultValue={initialData?.movementType}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="e.g. Automatic Calibre 3120"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="caseSize" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Case Size</label>
                  <input
                    type="text"
                    name="caseSize"
                    id="caseSize"
                    defaultValue={initialData?.caseSize}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="e.g. 41mm"
                  />
                </div>
                <div className="space-y-4 md:col-span-2">
                  <label htmlFor="materialDetails" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Materials & Finish</label>
                  <input
                    type="text"
                    name="materialDetails"
                    id="materialDetails"
                    defaultValue={initialData?.materialDetails}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                    placeholder="e.g. 18-carat pink gold, satined brushed"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="strapDetails" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Strap / Bracelet</label>
                  <input
                    type="text"
                    name="strapDetails"
                    id="strapDetails"
                    defaultValue={initialData?.strapDetails}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
                <div className="space-y-4">
                  <label htmlFor="warrantyInfo" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Warranty</label>
                  <input
                    type="text"
                    name="warrantyInfo"
                    id="warrantyInfo"
                    defaultValue={initialData?.warrantyInfo}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Media */}
          {activeTab === "media" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-6">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">Gallery Assets</label>
              <ImageUploader />
            </div>
          )}

          {/* TAB: Inventory */}
          {activeTab === "inventory" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label htmlFor="sku" className="block text-xs font-bold uppercase tracking-widest text-gray-400">SKU (Master Reference)</label>
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    required
                    defaultValue={initialData?.inventory?.[0]?.sku}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>

                <div className="space-y-4">
                  <label htmlFor="stock" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Current Stock Level</label>
                  <input
                    type="number"
                    name="stock"
                    id="stock"
                    required
                    min={0}
                    defaultValue={initialData?.inventory?.[0]?.stock || 0}
                    className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: SEO */}
          {activeTab === "seo" && (
            <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
              <div className="space-y-4">
                <label htmlFor="seoTitle" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Meta Title</label>
                <input
                  type="text"
                  name="seoTitle"
                  id="seoTitle"
                  defaultValue={initialData?.seoTitle}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
                  placeholder="The title appearing in Google results..."
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="seoDescription" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Meta Description</label>
                <textarea
                  id="seoDescription"
                  name="seoDescription"
                  rows={3}
                  defaultValue={initialData?.seoDescription}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
                  placeholder="Short summary for SERPs..."
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="seoKeywords" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Keywords</label>
                <input
                  type="text"
                  name="seoKeywords"
                  id="seoKeywords"
                  defaultValue={initialData?.seoKeywords}
                  className="block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm"
                  placeholder="Comma separated: luxury, watch, precision..."
                />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Status & Organization Details */}
        <div className="space-y-10">
          <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-8">
            <div className="space-y-4">
              <label htmlFor="status" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Publication Status</label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status || "DRAFT"}
                className="mt-2 block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              >
                <option value="DRAFT">Draft — Hidden</option>
                <option value="ACTIVE">Active — Published</option>
                <option value="ARCHIVED">Archived — Disabled</option>
              </select>
            </div>

            <div className="space-y-4">
              <label htmlFor="categoryId" className="block text-xs font-bold uppercase tracking-widest text-gray-400">Collection / Series</label>
              <select
                id="categoryId"
                name="categoryId"
                defaultValue={initialData?.categoryId || ""}
                className="mt-2 block w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              >
                <option value="">(Uncategorized)</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 sm:rounded-2xl p-8 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-zinc-800 pb-2">Visibility Flags</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">Featured Item</span>
                <span className="text-[10px] text-gray-500 uppercase font-medium">Homepage Exposure</span>
              </div>
              <input
                id="featured"
                name="featured"
                type="checkbox"
                defaultChecked={initialData?.featured}
                className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">Best Seller</span>
                <span className="text-[10px] text-gray-500 uppercase font-medium">Curated Section</span>
              </div>
              <input
                id="bestSeller"
                name="bestSeller"
                type="checkbox"
                defaultChecked={initialData?.bestSeller}
                className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">New Arrival</span>
                <span className="text-[10px] text-gray-500 uppercase font-medium">Boutique Exposure</span>
              </div>
              <input
                id="newArrival"
                name="newArrival"
                type="checkbox"
                defaultChecked={initialData?.newArrival}
                className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">Limited Ed.</span>
                <span className="text-[10px] text-gray-500 uppercase font-medium">Scarcity Indicator</span>
              </div>
              <input
                id="limitedEdition"
                name="limitedEdition"
                type="checkbox"
                defaultChecked={initialData?.limitedEdition}
                className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
