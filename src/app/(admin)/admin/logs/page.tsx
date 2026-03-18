import { prisma } from "@/lib/db"
import { History, User } from "lucide-react"
import { Badge } from "@/components/admin/Badge"

export default async function AdminLogsPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Digital Trail</h2>
        <p className="text-xs text-gray-500 mt-1">Complete audit log of all administrative actions for security and accountability.</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <table className="min-w-full divide-y divide-gray-100 dark:divide-zinc-800">
          <thead className="bg-gray-50/50 dark:bg-zinc-950/50">
            <tr>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Timestamp</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Admin</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Action</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Entity</th>
              <th className="px-8 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-gray-400">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors">
                <td className="px-8 py-5 whitespace-nowrap">
                  <p className="text-xs font-medium text-gray-900 dark:text-white">{log.createdAt.toLocaleDateString()}</p>
                  <p className="text-[10px] text-gray-500">{log.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                      <User className="w-3 h-3 text-gray-500" />
                    </div>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{log.adminName || "System"}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <Badge variant={log.action.includes("DELETE") ? "error" : log.action.includes("CREATE") ? "success" : "neutral"}>
                    {log.action}
                  </Badge>
                </td>
                <td className="px-8 py-5">
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{log.entityType}</span>
                </td>
                <td className="px-8 py-5 max-w-xs">
                  <p className="text-[11px] text-gray-500 truncate">{log.details || "—"}</p>
                </td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <History className="w-8 h-8 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm font-medium text-gray-500">No activity recorded yet.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
