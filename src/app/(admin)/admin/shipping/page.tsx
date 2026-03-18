import { prisma } from "@/lib/db"
import { Truck, Package } from "lucide-react"

export default async function AdminShippingPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Shipping & Delivery</h2>
        <p className="text-xs text-gray-500 mt-1">Configure shipping methods, rates, and delivery policies.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl">
            <Truck className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Free Shipping Threshold</p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">₹{settings?.freeShippingThreshold.toString() || "5,000"}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Flat Rate</p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">₹{settings?.defaultShippingFee.toString() || "150"}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 text-center">
        <Truck className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <p className="text-xs text-gray-500">
          Shipping settings are managed from the <a href="/admin/settings" className="text-black dark:text-white font-semibold underline">System Registry</a>.
        </p>
      </div>
    </div>
  )
}
