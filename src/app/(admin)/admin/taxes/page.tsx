import { prisma } from "@/lib/db"
import { Percent, ShieldCheck, FileText, Clock, IndianRupee, BarChart3 } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { updateStoreSettings } from "@/actions/admin.settings.actions"

export default async function AdminTaxesPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "singleton" }
  })

  // Tax revenue insight
  const taxAgg = await prisma.order.aggregate({
    _sum: { taxAmount: true },
    where: { status: { notIn: ["CANCELLED", "REFUNDED"] } }
  })

  const totalTaxCollected = Number(taxAgg._sum.taxAmount || 0)

  const recentAuditLogs = await prisma.auditLog.findMany({
    where: { entityType: "StoreSettings" },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  // Tax rules display
  const taxRules = [
    {
      region: "Pan-India (Default)",
      taxLabel: settings?.taxLabel || "GST",
      rate: `${settings?.taxRate?.toString() || "18"}%`,
      pricing: settings?.taxInclusive ? "Inclusive" : "Exclusive",
      status: "active",
      effectiveDate: settings?.updatedAt?.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) || "N/A",
    },
    {
      region: "Export / International",
      taxLabel: "Zero-rated",
      rate: "0%",
      pricing: "N/A",
      status: "inactive",
      effectiveDate: "—",
    },
  ]

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Tax Configuration</h2>
        <p className="text-xs text-gray-500 mt-1">Manage tax rules, rates, and compliance settings for your boutique.</p>
      </div>

      {/* Tax Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
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
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Total Tax Collected</p>
          <p className="text-2xl font-medium text-emerald-600 dark:text-emerald-400">₹{totalTaxCollected.toLocaleString()}</p>
        </div>
      </div>

      {/* Tax Rules Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-gray-400" /> Tax Rules
          </h3>
        </div>
        <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
          <thead className="bg-gray-50/50 dark:bg-zinc-950/50">
            <tr>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Region</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax Type</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Rate</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Pricing</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Effective Date</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {taxRules.map((rule) => (
              <tr key={rule.region} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-8 py-5">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{rule.region}</p>
                </td>
                <td className="px-8 py-5">
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{rule.taxLabel}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{rule.rate}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs text-gray-600 dark:text-gray-400">{rule.pricing}</span>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs text-gray-500">{rule.effectiveDate}</span>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={rule.status === "active" ? "success" : "neutral"}>
                    {rule.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tax Configuration Form */}
      <form action={async (formData) => {
        "use server"
        await updateStoreSettings(formData)
      }} className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black dark:bg-white rounded-lg">
            <ShieldCheck className="w-4 h-4 text-white dark:text-black" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Edit Tax Settings</h3>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-sm">
          <div className="space-y-4">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Tax Label</label>
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
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Pricing Mode</label>
            <div className="flex items-center h-[46px] gap-3">
              <input
                type="checkbox"
                name="taxInclusive"
                defaultChecked={settings?.taxInclusive ?? true}
                className="h-5 w-5 rounded-lg border-gray-300 dark:border-zinc-700 text-black dark:bg-zinc-950 focus:ring-black"
              />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Tax Inclusive Pricing</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
          >
            Save Tax Configuration
          </button>
        </div>
      </form>

      {/* Recent Changes Audit Trail */}
      {recentAuditLogs.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-8 py-5 border-b border-gray-100 dark:border-zinc-800">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> Recent Configuration Changes
            </h3>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-zinc-800">
            {recentAuditLogs.map((log) => (
              <div key={log.id} className="px-8 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{log.action}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{log.details || "Settings updated"}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{log.createdAt.toLocaleDateString("en-IN")}</p>
                  <p className="text-[10px] text-gray-400">{log.adminName}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
