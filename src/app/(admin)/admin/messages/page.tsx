import { prisma } from "@/lib/db"
import { Badge } from "@/components/admin/Badge"
import { Mail, MessageSquare, Clock, User, Archive, CheckCircle } from "lucide-react"
import { updateInquiryStatus } from "@/actions/admin.message.actions"

export default async function AdminMessagesPage() {
  const inquiries = await prisma.contactQuery.findMany({
    orderBy: { createdAt: "desc" }
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">Message Boutique</h2>
        <p className="text-xs text-gray-500 mt-1">Manage customer inquiries and appointment requests from the concierge desk.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statistics Widgets */}
        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-4 gap-6">
          <StatCard icon={Mail} label="Total Inquiries" value={inquiries.length} color="blue" />
          <StatCard icon={Clock} label="Pending" value={inquiries.filter(i => i.status === "PENDING").length} color="yellow" />
          <StatCard icon={CheckCircle} label="Responded" value={inquiries.filter(i => i.status === "RESPONDED").length} color="green" />
          <StatCard icon={Archive} label="Archived" value={inquiries.filter(i => i.status === "ARCHIVED").length} color="gray" />
        </div>

        {/* Message List */}
        <div className="lg:col-span-3 bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
            <thead className="bg-gray-50/50 dark:bg-zinc-950/50">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Timestamp</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Client</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Message Snippet</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-gray-400">Entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="group hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">{inquiry.createdAt.toLocaleDateString()}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tight">{inquiry.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">{inquiry.name}</p>
                        <p className="text-[10px] text-gray-500 lowercase">{inquiry.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 max-w-sm">
                    <p className="text-xs font-medium text-gray-900 dark:text-zinc-300 truncate mb-1">{inquiry.subject || "No Subject"}</p>
                    <p className="text-[11px] text-gray-500 line-clamp-1">{inquiry.message}</p>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <StatusBadge status={inquiry.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white hover:underline transition-all">
                       Open File
                    </button>
                  </td>
                </tr>
              ))}
              {inquiries.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-4" />
                    <p className="text-sm font-medium text-gray-500">The desk is currently clear.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/10",
    yellow: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/10",
    green: "text-green-600 bg-green-50 dark:bg-green-900/10",
    gray: "text-gray-600 bg-gray-50 dark:bg-zinc-900",
  }
  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center gap-5">
      <div className={`p-4 rounded-xl ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
        <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const variants: any = {
    PENDING: "warning",
    READ: "neutral",
    RESPONDED: "success",
    ARCHIVED: "neutral"
  }
  return (
    <Badge variant={variants[status] || "neutral"}>
      {status}
    </Badge>
  )
}
