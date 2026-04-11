import { prisma } from "@/lib/db"
import { Truck, Package, Globe, IndianRupee, Clock, ShieldCheck, Banknote } from "lucide-react"
import { updateShippingConfig } from "@/actions/admin.shipping.actions"

export default async function AdminShippingPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  // Get recent shipping-related orders for insights
  const [totalShipped, codOrders, avgShipping] = await Promise.all([
    prisma.order.count({ where: { status: "SHIPPED" } }),
    prisma.order.count({ where: { isCOD: true } }),
    prisma.order.aggregate({ _avg: { shippingAmount: true }, where: { status: { notIn: ["CANCELLED", "REFUNDED"] } } }),
  ])

  const shippingMethods = [
    {
      name: "Standard Delivery",
      description: "Pan-India delivery via trusted courier partners",
      rate: `₹${settings?.defaultShippingFee?.toString() || "0"}`,
      eta: "5–7 business days",
      status: true,
      icon: Truck,
      color: "blue",
    },
    {
      name: "Free Shipping",
      description: `Orders above ₹${settings?.freeShippingThreshold?.toString() || "5,000"}`,
      rate: "FREE",
      eta: "5–7 business days",
      status: true,
      icon: Package,
      color: "green",
    },
    {
      name: "Cash on Delivery",
      description: "COD with advance payment option",
      rate: "Order Total",
      eta: "5–7 business days",
      status: true,
      icon: Banknote,
      color: "amber",
    },
  ]

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Shipping & Delivery</h2>
        <p className="text-xs text-gray-500 mt-1">Configure shipping methods, rates, and delivery policies.</p>
      </div>

      {/* Shipping Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Orders Shipped</p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">{totalShipped}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl">
            <Banknote className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">COD Orders</p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">{codOrders}</p>
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl">
            <IndianRupee className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Avg. Shipping Fee</p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">₹{Math.round(Number(avgShipping._avg.shippingAmount || 0)).toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Shipping Methods Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-gray-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" /> Active Shipping Methods
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
          <thead className="bg-gray-50/50 dark:bg-zinc-950/50">
            <tr>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Method</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Rate</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Est. Delivery</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {shippingMethods.map((method) => (
              <tr key={method.name} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl ${
                      method.color === 'blue' ? 'bg-blue-50 dark:bg-blue-900/10' :
                      method.color === 'green' ? 'bg-green-50 dark:bg-green-900/10' :
                      'bg-amber-50 dark:bg-amber-900/10'
                    }`}>
                      <method.icon className={`w-4 h-4 ${
                        method.color === 'blue' ? 'text-blue-600' :
                        method.color === 'green' ? 'text-green-600' :
                        'text-amber-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{method.name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">{method.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{method.rate}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {method.eta}
                  </span>
                </td>
                <td className="px-8 py-5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-green-700 bg-green-50 dark:bg-green-900/10 dark:text-green-400 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Enabled
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shipping Configuration Form */}
      <form action={async (formData) => {
        "use server"
        await updateShippingConfig(formData)
      }} className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black dark:bg-white rounded-lg">
            <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Shipping Configuration</h3>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Free Shipping Threshold (₹)</label>
            <input
              name="freeShippingThreshold"
              type="number"
              step="100"
              defaultValue={settings?.freeShippingThreshold.toString() || "5000"}
              className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
            />
            <p className="text-[10px] text-gray-400">Orders above this amount get free shipping</p>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Default Flat Rate (₹)</label>
            <input
              name="defaultShippingFee"
              type="number"
              step="10"
              defaultValue={settings?.defaultShippingFee.toString() || "0"}
              className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
            />
            <p className="text-[10px] text-gray-400">Applied when order does not qualify for free shipping</p>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Estimated Delivery (Days)</label>
            <input
              name="estimatedDeliveryDays"
              type="text"
              defaultValue="5-7"
              className="w-full rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
            />
            <p className="text-[10px] text-gray-400">Displayed to customers during checkout</p>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">COD Settings</label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="codEnabled"
                  defaultChecked={true}
                  className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Enable Cash on Delivery</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  name="codAdvancePercent"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="10"
                  className="w-24 rounded-xl border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 px-4 py-3 text-sm focus:ring-2 focus:ring-black transition-all"
                />
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">% advance required for COD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Save Shipping Settings
          </button>
        </div>
      </form>
    </div>
  )
}
