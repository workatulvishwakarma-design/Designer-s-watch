import { prisma } from "@/lib/db"
import { Percent } from "lucide-react"

export default async function AdminTaxesPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Tax Configuration</h2>
        <p className="text-xs text-gray-500 mt-1">Manage tax rules, rates, and compliance settings for your boutique.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tax Label</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">{settings?.taxLabel || "GST"}</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Tax Rate</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">{settings?.taxRate.toString() || "18"}%</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Pricing Mode</p>
          <p className="text-2xl font-medium text-gray-900 dark:text-white">{settings?.taxInclusive ? "Inclusive" : "Exclusive"}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 text-center">
        <Percent className="w-10 h-10 text-gray-300 mx-auto mb-4" />
        <p className="text-xs text-gray-500">
          Tax settings are managed from the <a href="/admin/settings" className="text-black dark:text-white font-semibold underline">System Registry</a>.
        </p>
      </div>
    </div>
  )
}
