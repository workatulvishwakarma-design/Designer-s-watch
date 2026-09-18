import { prisma } from "@/lib/db"
import { updateStoreSettings } from "@/actions/admin.settings.actions"
import { Settings, Shield, Bell, MapPin, Percent, Truck, Search, Globe } from "lucide-react"

export default async function AdminSettingsPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  return (
    <div className="space-y-8 pb-20 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">System Registry</h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">Configure global parameters and brand identity for Designer World.</p>
        </div>
      </div>

      <form action={async (formData) => {
        "use server"
        await updateStoreSettings(formData)
      }} className="space-y-8">
        {/* Brand & Identity */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-900 rounded-xl">
                <Shield className="w-4 h-4 text-white" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Brand Hallmark</h3>
          </div>
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-xs">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Store Name</label>
              <input 
                name="storeName" 
                defaultValue={settings?.storeName || "Designer's Watch"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Official Email</label>
              <input 
                name="contactEmail" 
                type="email"
                defaultValue={settings?.contactEmail || "info@dsigner.com"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Concierge Phone</label>
              <input 
                name="contactPhone" 
                defaultValue={settings?.contactPhone || "+91 84549 26088"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Boutique Address</label>
              <textarea 
                name="businessAddress" 
                rows={3}
                defaultValue={settings?.businessAddress || "First floor, Pinnacle Business Park, F1-8, Mahakali Caves Rd, Shanti Nagar, Andheri East, Mumbai, Maharashtra 400093"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
          </div>
        </section>

        {/* Finance & Delivery */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-900 rounded-xl">
                <Percent className="w-4 h-4 text-white" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Commerce & Logistics</h3>
          </div>
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Tax Nomenclature (e.g. GST)</label>
              <input 
                name="taxLabel" 
                defaultValue={settings?.taxLabel || "GST"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Tax Rate (%)</label>
              <input 
                name="taxRate" 
                type="number"
                step="0.01"
                defaultValue={settings?.taxRate.toString() || "18"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Shipping Mode</label>
              <div className="flex items-center h-[42px] gap-3">
                <input 
                  type="checkbox" 
                  name="taxInclusive" 
                  defaultChecked={settings?.taxInclusive ?? true}
                  className="h-5 w-5 rounded-md border-slate-300 text-slate-900 focus:ring-slate-900"
                />
                <span className="text-sm font-semibold text-slate-700">Inclusive Pricing</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Free Ship Base (₹)</label>
              <input 
                name="freeShippingThreshold" 
                type="number"
                defaultValue={settings?.freeShippingThreshold.toString() || "5000"} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
          </div>
        </section>

        {/* Global SEO */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-900 rounded-xl">
                <Search className="w-4 h-4 text-white" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Global SEO Hallmarks</h3>
          </div>
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 space-y-6 shadow-xs">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Default META Title</label>
              <input 
                name="defaultSeoTitle" 
                defaultValue={settings?.defaultSeoTitle || ""} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
                placeholder="The shop name used for non-customized pages..."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Default META Description</label>
              <textarea 
                name="defaultSeoDescription" 
                rows={3}
                defaultValue={settings?.defaultSeoDescription || ""} 
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
              />
            </div>
          </div>
        </section>

        {/* Visibility & Announcements */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-slate-900 rounded-xl">
                <Bell className="w-4 h-4 text-white" />
             </div>
             <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Boutique Announcements</h3>
          </div>
          
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 flex flex-col md:flex-row gap-6 shadow-xs">
             <div className="flex-1 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Header Banner Text</label>
                <input 
                  name="announcementText" 
                  defaultValue={settings?.announcementText || ""} 
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-slate-900 transition-all shadow-xs"
                  placeholder="e.g. Complimentary worldwide shipping for limited editions."
                />
             </div>
             <div className="md:w-64 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Visibility</label>
                <div className="flex items-center h-[42px] gap-3">
                  <input 
                    type="checkbox" 
                    name="announcementActive" 
                    defaultChecked={settings?.announcementActive || false}
                    className="h-5 w-5 rounded-md border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-semibold text-slate-700">Broadcast Enabled</span>
                </div>
             </div>
          </div>
        </section>

        <div className="sticky bottom-8 flex justify-center z-30">
           <button 
             type="submit"
             className="bg-slate-950 text-white px-10 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-slate-800 transition-all"
           >
             Commit System Changes
           </button>
        </div>
      </form>
    </div>
  )
}
