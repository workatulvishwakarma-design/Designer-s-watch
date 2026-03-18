import { prisma } from "@/lib/db"
import { updateStoreSettings } from "@/actions/admin.settings.actions"
import { Settings, Shield, Bell, MapPin, Percent, Truck, Search, Globe } from "lucide-react"

export default async function AdminSettingsPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  return (
    <div className="space-y-10 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">System Registry</h2>
          <p className="text-xs text-gray-500 mt-1">Configure global parameters and brand identity for the boutique.</p>
        </div>
      </div>

      <form action={async (formData) => {
        "use server"
        await updateStoreSettings(formData)
      }} className="space-y-12">
        {/* Brand & Identity */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Shield className="w-4 h-4 text-white dark:text-black" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white一线">Brand Hallmark</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Store Name</label>
              <input 
                name="storeName" 
                defaultValue={settings?.storeName || "Designer's Watch"} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Official Email</label>
              <input 
                name="contactEmail" 
                type="email"
                defaultValue={settings?.contactEmail || ""} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Concierge Phone</label>
              <input 
                name="contactPhone" 
                defaultValue={settings?.contactPhone || ""} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Boutique Address</label>
              <textarea 
                name="businessAddress" 
                rows={3}
                defaultValue={settings?.businessAddress || ""} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
          </div>
        </section>

        {/* Finance & Delivery */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Percent className="w-4 h-4 text-white dark:text-black" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Commerce & Logistics</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax Nomenclature (e.g. GST)</label>
              <input 
                name="taxLabel" 
                defaultValue={settings?.taxLabel || "GST"} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax Rate (%)</label>
              <input 
                name="taxRate" 
                type="number"
                step="0.01"
                defaultValue={settings?.taxRate.toString() || "18"} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Shipping Mode</label>
              <div className="flex items-center h-[46px] gap-3">
                <input 
                  type="checkbox" 
                  name="taxInclusive" 
                  defaultChecked={settings?.taxInclusive ?? true}
                  className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Inclusive Pricing</span>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Free Ship Base (₹)</label>
              <input 
                name="freeShippingThreshold" 
                type="number"
                defaultValue={settings?.freeShippingThreshold.toString() || "5000"} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
          </div>
        </section>

        {/* Global SEO */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Search className="w-4 h-4 text-white dark:text-black" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Global SEO Hallmarks</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 space-y-8 shadow-sm">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Default META Title</label>
              <input 
                name="defaultSeoTitle" 
                defaultValue={settings?.defaultSeoTitle || ""} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
                placeholder="The shop name used for non-customized pages..."
              />
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Default META Description</label>
              <textarea 
                name="defaultSeoDescription" 
                rows={3}
                defaultValue={settings?.defaultSeoDescription || ""} 
                className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
              />
            </div>
          </div>
        </section>

        {/* Visibility & Announcements */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-black dark:bg-white rounded-lg">
                <Bell className="w-4 h-4 text-white dark:text-black" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Boutique Announcements</h3>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 flex flex-col md:flex-row gap-8 shadow-sm">
             <div className="flex-1 space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Header Banner Text</label>
                <input 
                  name="announcementText" 
                  defaultValue={settings?.announcementText || ""} 
                  className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
                  placeholder="e.g. Complimentary worldwide shipping for limited editions."
                />
             </div>
             <div className="md:w-64 space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Visibility</label>
                <div className="flex items-center h-[46px] gap-3">
                  <input 
                    type="checkbox" 
                    name="announcementActive" 
                    defaultChecked={settings?.announcementActive || false}
                    className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
                  />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Broadcast Enabled</span>
                </div>
             </div>
          </div>
        </section>

        <div className="sticky bottom-8 flex justify-center z-30">
           <button 
             type="submit"
             className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
           >
             Commit System Changes
           </button>
        </div>
      </form>
    </div>
  )
}
