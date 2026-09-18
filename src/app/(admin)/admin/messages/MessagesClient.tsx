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

  const handleStatusChange = async (id: string, newStatus: "PENDING" | "READ" | "RESPONDED" | "ARCHIVED") => {
    const res = await updateInquiryStatus(id, newStatus)
    if (res?.error) {
      toast.error(res.error)
      return
    }
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
          <p className="text-xs font-bold text-slate-900">{row.createdAt}</p>
          <p className="text-[11px] font-medium text-slate-500">{row.time}</p>
        </div>
      ),
      exportValue: (row) => `${row.createdAt} ${row.time}`,
      sortKey: "createdAt" as any,
    },
    {
      header: "Client",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
            <User className="w-4 h-4 text-slate-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900 tracking-wide">{row.name}</p>
            <p className="text-[11px] font-medium text-slate-500 lowercase">{row.email}</p>
          </div>
        </div>
      ),
      exportValue: (row) => `${row.name} (${row.email})`,
    },
    {
      header: "Subject",
      accessor: (row) => (
        <div className="max-w-[240px]">
          <p className="text-xs font-semibold text-slate-800 truncate">{row.subject || "No Subject"}</p>
          <p className="text-[11px] font-medium text-slate-500 line-clamp-1">{row.message}</p>
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
          className="text-xs font-semibold text-slate-900 hover:text-slate-600 transition-all flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg"
        >
          <Eye className="w-3.5 h-3.5" /> View
        </button>
      ),
      exportValue: () => "",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">Message Boutique</h2>
        <p className="text-sm text-slate-500 mt-1 font-medium">Manage customer inquiries and appointment requests from the concierge desk.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard icon={Mail} label="Total Inquiries" value={stats.total} color="blue" onClick={() => setFilterStatus("")} active={!filterStatus} />
        <StatCard icon={Clock} label="Pending" value={stats.pending} color="yellow" onClick={() => setFilterStatus("PENDING")} active={filterStatus === "PENDING"} />
        <StatCard icon={CheckCircle} label="Responded" value={stats.responded} color="green" onClick={() => setFilterStatus("RESPONDED")} active={filterStatus === "RESPONDED"} />
        <StatCard icon={Archive} label="Archived" value={stats.archived} color="gray" onClick={() => setFilterStatus("ARCHIVED")} active={filterStatus === "ARCHIVED"} />
      </div>

      {/* Table */}
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
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">Contact Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Name</p><p className="font-bold text-slate-900">{selected.name}</p></div>
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Email</p><p className="font-semibold text-slate-800">{selected.email}</p></div>
                {selected.phone && <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Phone</p><p className="font-semibold text-slate-800">{selected.phone}</p></div>}
                <div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">Received</p><p className="font-semibold text-slate-800">{selected.createdAt} at {selected.time}</p></div>
              </div>
            </div>

            {/* Subject & Message */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Subject</h4>
              <p className="text-sm font-bold text-slate-900">{selected.subject || "No Subject"}</p>
            </div>
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">Message</h4>
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90">
                <p className="text-sm font-medium text-slate-800 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>

            {/* Internal Note */}
            {selected.internalNote && (
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                  <StickyNote className="w-3.5 h-3.5" /> Internal Note
                </h4>
                <p className="text-xs font-medium text-amber-900 italic bg-amber-50 p-3.5 rounded-xl border border-amber-200">
                  {selected.internalNote}
                </p>
              </div>
            )}

            {/* Status & Actions */}
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">Current Status</h4>
              <StatusBadge status={selected.status} />
            </div>
            <div className="flex flex-wrap gap-2.5 pt-3 border-t border-slate-200">
              {selected.status !== "RESPONDED" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "RESPONDED")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Mark Responded
                </button>
              )}
              {selected.status !== "ARCHIVED" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "ARCHIVED")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <Archive className="w-3.5 h-3.5" /> Archive
                </button>
              )}
              {selected.status !== "PENDING" && (
                <button
                  onClick={() => handleStatusChange(selected.id, "PENDING")}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-amber-50 border border-amber-200 text-amber-800 rounded-xl hover:bg-amber-100 transition-colors"
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
    blue: "text-blue-600 bg-blue-50 border border-blue-200/70",
    yellow: "text-amber-600 bg-amber-50 border border-amber-200/70",
    green: "text-emerald-600 bg-emerald-50 border border-emerald-200/70",
    gray: "text-slate-600 bg-slate-100 border border-slate-200/70",
  }
  return (
    <button
      onClick={onClick}
      className={`bg-white p-5 rounded-2xl border shadow-xs flex items-center gap-4 transition-all text-left w-full ${
        active 
          ? 'border-slate-900 ring-2 ring-slate-900/10' 
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div className={`p-3.5 rounded-xl ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{label}</p>
        <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{value}</p>
      </div>
    </button>
  )
}
