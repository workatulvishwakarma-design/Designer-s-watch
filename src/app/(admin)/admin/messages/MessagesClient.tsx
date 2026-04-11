"use client"

import { useState } from "react"
import { Mail, MessageSquare, Clock, User, Archive, CheckCircle, Send, X, StickyNote, Eye } from "lucide-react"
import { Badge } from "@/components/admin/Badge"
import { Drawer } from "@/components/admin/Drawer"
import { DataTable, Column } from "@/components/admin/DataTable"
import { updateInquiryStatus } from "@/actions/admin.message.actions"
import { toast } from "sonner"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string | null
  message: string
  status: string
  internalNote: string | null
  createdAt: string
  time: string
}

function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, "warning" | "neutral" | "success" | "info"> = {
    PENDING: "warning",
    READ: "info",
    RESPONDED: "success",
    ARCHIVED: "neutral"
  }
  return <Badge variant={variants[status] || "neutral"}>{status}</Badge>
}

export function MessagesClient({ inquiries }: { inquiries: Inquiry[] }) {
  const [selected, setSelected] = useState<Inquiry | null>(null)
  const [filterStatus, setFilterStatus] = useState("")

  const filtered = filterStatus ? inquiries.filter(i => i.status === filterStatus) : inquiries

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter(i => i.status === "PENDING").length,
    responded: inquiries.filter(i => i.status === "RESPONDED").length,
    archived: inquiries.filter(i => i.status === "ARCHIVED").length,
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const formData = new FormData()
    formData.set("id", id)
    formData.set("status", newStatus)
    await updateInquiryStatus(formData)
    toast.success(`Status updated to ${newStatus}`)
    // Optimistic: update in-memory
    if (selected?.id === id) {
      setSelected({ ...selected, status: newStatus })
    }
  }

  const columns: Column<Inquiry>[] = [
    {
      header: "Date",
      accessor: (row) => (
        <div>
          <p className="text-xs font-medium text-gray-900 dark:text-white">{row.createdAt}</p>
          <p className="text-[10px] text-gray-500">{row.time}</p>
        </div>
      ),
      exportValue: (row) => `${row.createdAt} ${row.time}`,
      sortKey: "createdAt" as any,
    },
    {
      header: "Client",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">{row.name}</p>
            <p className="text-[10px] text-gray-500 lowercase">{row.email}</p>
          </div>
        </div>
      ),
      exportValue: (row) => `${row.name} (${row.email})`,
    },
    {
      header: "Subject",
      accessor: (row) => (
        <div className="max-w-[200px]">
          <p className="text-xs font-medium text-gray-900 dark:text-zinc-300 truncate">{row.subject || "No Subject"}</p>
          <p className="text-[11px] text-gray-500 line-clamp-1">{row.message}</p>
        </div>
      ),
      exportValue: (row) => row.subject || "No Subject",
    },
    {
      header: "Status",
      accessor: (row) => <StatusBadge status={row.status} />,
      exportValue: (row) => row.status,
    },
    {
      header: "",
      accessor: (row) => (
        <button
          onClick={(e) => { e.stopPropagation(); setSelected(row) }}
          className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white hover:underline transition-all flex items-center gap-1"
        >
          <Eye className="w-3 h-3" /> View
        </button>
      ),
      exportValue: () => "",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white">Message Boutique</h2>
        <p className="text-xs text-gray-500 mt-1">Manage customer inquiries and appointment requests from the concierge desk.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <StatCard icon={Mail} label="Total Inquiries" value={stats.total} color="blue" onClick={() => setFilterStatus("")} active={!filterStatus} />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="yellow" onClick={() => setFilterStatus("PENDING")} active={filterStatus === "PENDING"} />
        <StatCard icon={CheckCircle} label="Responded" value={stats.responded} color="green" onClick={() => setFilterStatus("RESPONDED")} active={filterStatus === "RESPONDED"} />
        <StatCard icon={Archive} label="Archived" value={stats.archived} color="gray" onClick={() => setFilterStatus("ARCHIVED")} active={filterStatus === "ARCHIVED"} />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 rounded-2xl overflow-hidden">
        <DataTable
          data={filtered}
          columns={columns}
          keyField="id"
          searchable
          searchPlaceholder="Search by name, email, subject..."
          exportable
          exportFilename="DesignerWorld_Inquiries"
          pageSize={15}
          emptyMessage="No inquiries match your criteria."
        />
      </div>

      {/* Detail Drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Inquiry Detail"
        subtitle={selected ? `From ${selected.name}` : ""}
        width="xl"
      >
        {selected && (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-gray-100 dark:border-zinc-800">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-[10px] text-gray-400 mb-0.5">Name</p><p className="font-medium text-gray-900 dark:text-white">{selected.name}</p></div>
                <div><p className="text-[10px] text-gray-400 mb-0.5">Email</p><p className="font-medium text-gray-900 dark:text-white">{selected.email}</p></div>
                {selected.phone && <div><p className="text-[10px] text-gray-400 mb-0.5">Phone</p><p className="font-medium text-gray-900 dark:text-white">{selected.phone}</p></div>}
                <div><p className="text-[10px] text-gray-400 mb-0.5">Received</p><p className="font-medium text-gray-900 dark:text-white">{selected.createdAt} at {selected.time}</p></div>
              </div>
            </div>

            {/* Subject & Message */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Subject</h4>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{selected.subject || "No Subject"}</p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Message</h4>
              <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl p-5 border border-gray-100 dark:border-zinc-800">
                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>

            {/* Internal Note */}
            {selected.internalNote && (
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-1">
                  <StickyNote className="w-3 h-3" /> Internal Note
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 italic bg-yellow-50 dark:bg-yellow-900/10 p-3 rounded-lg border border-yellow-100 dark:border-yellow-800">
                  {selected.internalNote}
                </p>
              </div>
            )}

            {/* Status & Actions */}
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Current Status</h4>
              <StatusBadge status={selected.status} />
            </div>
            <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
              {selected.status !== "RESPONDED" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "RESPONDED")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Responded
                </button>
              )}
              {selected.status !== "ARCHIVED" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "ARCHIVED")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" /> Archive
                </button>
              )}
              {selected.status !== "PENDING" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "PENDING")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-widest bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" /> Reopen
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color, onClick, active }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 dark:bg-blue-900/10",
    yellow: "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/10",
    green: "text-green-600 bg-green-50 dark:bg-green-900/10",
    gray: "text-gray-600 bg-gray-50 dark:bg-zinc-900",
  }
  return (
    <button
      onClick={onClick}
      className={`bg-white dark:bg-zinc-900 p-6 rounded-2xl border shadow-sm flex items-center gap-5 transition-all text-left w-full ${
        active ? 'border-black dark:border-white ring-1 ring-black dark:ring-white' : 'border-gray-100 dark:border-zinc-800 hover:border-gray-300'
      }`}
    >
      <div className={`p-4 rounded-xl ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{label}</p>
        <p className="text-xl font-medium text-gray-900 dark:text-white mt-1">{value}</p>
      </div>
    </button>
  )
}
