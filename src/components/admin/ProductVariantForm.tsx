"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { upsertProductVariant } from "@/actions/admin.product.actions"

export function ProductVariantForm({ familyId, initialData }: { familyId: string, initialData?: any }) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "specs">("general")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    formData.append("familyId", familyId)
    
    if (initialData?.id) {
      formData.append("id", initialData.id)
    }

    try {
      const res = await upsertProductVariant(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success)
        router.push(`/admin/products/${familyId}`)
      }
    } catch (e) {
      toast.error("An unexpected error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  const tabs = [
    { id: "general", label: "General & Pricing" },
    { id: "specs", label: "Specifications" },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Header & Global Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {initialData ? "Edit Variant" : "Register New Variant"}
          </h2>
          <p className="text-xs text-gray-500 mt-1">Manage SKU, pricing, specs, and inventory.</p>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href={`/admin/products/${familyId}`}
            className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-black dark:bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-white dark:text-black shadow-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {isPending ? "Saving..." : "Save Variant"}
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
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label htmlFor="sku" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">SKU</label>
                <input
                  type="text"
                  name="sku"
                  id="sku"
                  required
                  defaultValue={initialData?.sku}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow uppercase"
                  placeholder="e.g. 840GNB_R"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Selling Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  required
                  min="0"
                  step="0.01"
                  defaultValue={initialData?.price}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="24500"
                />
              </div>

              <div>
                <label htmlFor="mrp" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">MRP (₹)</label>
                <input
                  type="number"
                  name="mrp"
                  id="mrp"
                  min="0"
                  step="0.01"
                  defaultValue={initialData?.mrp}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="29500"
                />
              </div>

              <div>
                <label htmlFor="color" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">General Color</label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  defaultValue={initialData?.color}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Rose Gold"
                />
              </div>

              <div>
                <label htmlFor="dialColor" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Dial Color</label>
                <input
                  type="text"
                  name="dialColor"
                  id="dialColor"
                  defaultValue={initialData?.dialColor}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Black"
                />
              </div>

              <div>
                <label htmlFor="strapColor" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Strap Color</label>
                <input
                  type="text"
                  name="strapColor"
                  id="strapColor"
                  defaultValue={initialData?.strapColor}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Black"
                />
              </div>
            </div>
          </div>

          {/* SPECS TAB */}
          <div className={activeTab === "specs" ? "block space-y-8" : "hidden"}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="movement" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Movement</label>
                <input
                  type="text"
                  name="movement"
                  id="movement"
                  defaultValue={initialData?.movement}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Quartz"
                />
              </div>
              
              <div>
                <label htmlFor="glass" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Glass</label>
                <input
                  type="text"
                  name="glass"
                  id="glass"
                  defaultValue={initialData?.glass}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Sapphire Crystal"
                />
              </div>

              <div>
                <label htmlFor="caseSize" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Case Size</label>
                <input
                  type="text"
                  name="caseSize"
                  id="caseSize"
                  defaultValue={initialData?.caseSize}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="42mm"
                />
              </div>

              <div>
                <label htmlFor="caseThickness" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Case Thickness</label>
                <input
                  type="text"
                  name="caseThickness"
                  id="caseThickness"
                  defaultValue={initialData?.caseThickness}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="10mm"
                />
              </div>

              <div>
                <label htmlFor="strapMaterial" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Strap Material</label>
                <input
                  type="text"
                  name="strapMaterial"
                  id="strapMaterial"
                  defaultValue={initialData?.strapMaterial}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="Stainless Steel"
                />
              </div>

              <div>
                <label htmlFor="waterResistance" className="block text-xs font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300 mb-2">Water Resistance</label>
                <input
                  type="text"
                  name="waterResistance"
                  id="waterResistance"
                  defaultValue={initialData?.waterResistance}
                  className="block w-full rounded-lg border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm transition-shadow"
                  placeholder="5 ATM"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-6 shadow-sm">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-zinc-800 pb-4">
              Inventory & Availability
            </h3>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="stock" className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Available Stock</label>
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  required
                  min="0"
                  defaultValue={initialData?.inventory?.stock || 0}
                  className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black dark:bg-zinc-900 dark:text-white dark:ring-zinc-800 dark:focus:ring-white sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
