"use client"

import { useState } from "react"
import { History, User, Search, Filter, ChevronDown, Eye, X } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { DataTable, Column } from "@/components/admin/DataTable"
import { Drawer } from "@/components/admin/Drawer"

interface LogEntry {
  id: string
  adminName: string
  action: string
  entityType: string
  entityId: string | null
  details: string | null
  createdAt: string
  time: string
}

const getActionVariant = (action: string): "success" | "error" | "warning" | "info" | "neutral" => {
  if (action.includes("DELETE")) return "error"
  if (action.includes("CREATE")) return "success"
  if (action.includes("UPDATE") || action.includes("CHANGE")) return "warning"
  return "neutral"
}

export function LogsClient({ logs }: { logs: LogEntry[] }) {
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null)
  const [filterAdmin, setFilterAdmin] = useState("")
  const [filterModule, setFilterModule] = useState("")
  const [filterAction, setFilterAction] = useState("")

  // Derive unique values for filter dropdowns
  const uniqueAdmins = [...new Set(logs.map(l => l.adminName))]
  const uniqueModules = [...new Set(logs.map(l => l.entityType))]
  const uniqueActions = [...new Set(logs.map(l => l.action))]

  // Apply filters
  const filteredLogs = logs.filter(l => {
    if (filterAdmin && l.adminName !== filterAdmin) return false
    if (filterModule && l.entityType !== filterModule) return false
    if (filterAction && l.action !== filterAction) return false
    return true
  })

  const columns: Column<LogEntry>[] = [
    {
      header: "Timestamp",
      accessor: (row) => (
        <div>
          <p className="text-xs font-medium text-gray-900 dark:text-white">{row.createdAt}</p>
          <p className="text-[10px] text-gray-500">{row.time}</p>
        </div>
      ),
      exportValue: (row) => `${row.createdAt} ${row.time}`,
      sortKey: "createdAt",
    },
    {
      header: "Admin",
      accessor: (row) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
            <User className="w-3 h-3 text-gray-500" />
          </div>
          <span className="text-xs font-medium text-gray-900 dark:text-white">{row.adminName}</span>
        </div>
      ),
      exportValue: (row) => row.adminName,
      sortKey: "adminName",
    },
    {
      header: "Action",
      accessor: (row) => (
        <Badge variant={getActionVariant(row.action)}>{row.action}</Badge>
      ),
      exportValue: (row) => row.action,
      sortKey: "action",
    },
    {
      header: "Module",
      accessor: (row) => (
        <span className="text-xs font-mono text-gray-600 dark:text-gray-400">{row.entityType}</span>
      ),
      exportValue: (row) => row.entityType,
      sortKey: "entityType",
    },
    {
      header: "Details",
      accessor: (row) => (
        <p className="text-[11px] text-gray-500 truncate max-w-[200px]">{row.details || "—"}</p>
      ),
      exportValue: (row) => row.details || "—",
    },
    {
      header: "",
      accessor: (row) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelectedLog(row) }}
          className="text-gray-400 hover:text-black dark:hover:text-white transition-colors"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
      exportValue: () => "",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white uppercase">Digital Trail</h2>
        <p className="text-xs text-gray-500 mt-1">Complete audit log of all administrative actions for security and accountability.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-3">
        <select
          value={filterAdmin}
          onChange={(e) => setFilterAdmin(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-black"
        >
          <option value="">All Admins</option>
          {uniqueAdmins.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        <select
          value={filterModule}
          onChange={(e) => setFilterModule(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-black"
        >
          <option value="">All Modules</option>
          {uniqueModules.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select
          value={filterAction}
          onChange={(e) => setFilterAction(e.target.value)}
          className="rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-black"
        >
          <option value="">All Actions</option>
          {uniqueActions.map(a => <option key={a} value={a}>{a}</option>)}
        </select>
        {(filterAdmin || filterModule || filterAction) && (
          <button
            onClick={() => { setFilterAdmin(""); setFilterModule(""); setFilterAction("") }}
            className="text-xs text-red-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear Filters
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{logs.length}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Total Entries</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-green-600">{logs.filter(l => l.action.includes("CREATE")).length}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Creates</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-amber-600">{logs.filter(l => l.action.includes("UPDATE")).length}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Updates</p>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-xl p-4 shadow-sm text-center">
          <p className="text-2xl font-semibold text-red-600">{logs.filter(l => l.action.includes("DELETE")).length}</p>
          <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mt-1">Deletes</p>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        <DataTable
          data={filteredLogs}
          columns={columns}
          keyField="id"
          searchable
          searchPlaceholder="Search logs by admin, action, module..."
          exportable
          exportFilename="DesignerWorld_AuditLogs"
          pageSize={20}
          stickyHeader
          emptyMessage="No audit logs match your filters."
        />
      </div>

      {/* Detail Drawer */}
      <Drawer
        open={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        title="Audit Log Detail"
        subtitle={selectedLog ? `ID: ${selectedLog.id}` : ""}
      >
        {selectedLog && (
          <div className="space-y-6">
            <DetailRow label="Timestamp" value={`${selectedLog.createdAt} at ${selectedLog.time}`} />
            <DetailRow label="Admin" value={selectedLog.adminName} />
            <DetailRow label="Action">
              <Badge variant={getActionVariant(selectedLog.action)}>{selectedLog.action}</Badge>
            </DetailRow>
            <DetailRow label="Module / Entity Type" value={selectedLog.entityType} />
            {selectedLog.entityId && <DetailRow label="Entity ID" value={selectedLog.entityId} mono />}
            <DetailRow label="Details" value={selectedLog.details || "No additional details recorded."} />
          </div>
        )}
      </Drawer>
    </div>
  )
}

function DetailRow({ label, value, mono = false, children }: { label: string; value?: string; mono?: boolean; children?: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100 dark:border-zinc-800 pb-4">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">{label}</p>
      {children || <p className={`text-sm text-gray-900 dark:text-white ${mono ? 'font-mono text-xs' : ''}`}>{value}</p>}
    </div>
  )
}
