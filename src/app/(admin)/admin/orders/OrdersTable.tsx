"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"
import { Eye, Banknote, CreditCard } from "lucide-react"
import { useState } from "react"

type OrderRow = {
  id: string
  date: string
  customer: string
  method: string
  total: string
  status: string
  paymentStatus: string
  isCOD: boolean
  advancePaid: string
  balanceDue: string
  transactionRef: string | null
  phone: string | null
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "DELIVERED": return "success"
    case "PENDING":
    case "PROCESSING": return "warning"
    case "CANCELLED":
    case "REFUNDED": return "error"
    case "SHIPPED": return "info"
    default: return "neutral"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "PAID": return "success"
    case "ADVANCE_PAID": return "warning"
    case "PENDING": return "neutral"
    case "FAILED": return "error"
    case "CANCELLED": return "error"
    case "REFUNDED": return "info"
    default: return "neutral"
  }
}

const columns: Column<OrderRow>[] = [
  { 
    header: "Order ID", 
    exportValue: (row) => row.id,
    accessor: (row) => (
      <div>
        <span className="font-mono text-xs font-bold text-slate-900">#{row.id.toUpperCase().slice(-8)}</span>
        {row.transactionRef && (
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{row.transactionRef}</p>
        )}
      </div>
    )
  },
  { header: "Order Date", accessor: "date", exportValue: (row) => row.date },
  { 
    header: "Customer", 
    exportValue: (row) => `${row.customer} ${row.phone ? `(${row.phone})` : ""}`,
    accessor: (row) => (
      <div>
        <span className="font-semibold text-slate-900">{row.customer}</span>
        {row.phone && <p className="text-[11px] text-slate-500 mt-0.5">{row.phone}</p>}
      </div>
    )
  },
  { 
    header: "Payment Method", 
    exportValue: (row) => `${row.isCOD ? "COD" : row.method || "Prepaid"} [${row.paymentStatus}]`,
    accessor: (row) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          {row.isCOD ? <Banknote className="w-3.5 h-3.5 text-amber-600" /> : <CreditCard className="w-3.5 h-3.5 text-blue-600" />}
          <span className="text-xs font-bold text-slate-800">
            {row.isCOD ? "COD" : row.method || "Prepaid"}
          </span>
        </div>
        <div>
          <Badge variant={getPaymentStatusColor(row.paymentStatus)}>
            {row.paymentStatus}
          </Badge>
        </div>
      </div>
    )
  },
  { 
    header: "Total Amount", 
    exportValue: (row) => `${row.total} ${row.isCOD ? `(Adv: ${row.advancePaid}, Due: ${row.balanceDue})` : ""}`,
    accessor: (row) => (
      <div>
        <span className="font-bold text-slate-950 text-sm">{row.total}</span>
        {row.isCOD && (
          <div className="text-[10.5px] mt-0.5 flex items-center gap-1 font-medium">
            <span className="text-emerald-700">Adv: {row.advancePaid}</span>
            <span className="text-slate-300">•</span>
            <span className="text-amber-700">Due: {row.balanceDue}</span>
          </div>
        )}
      </div>
    )
  },
  { 
    header: "Fulfillment Status", 
    exportValue: (row) => row.status,
    accessor: (row) => (
      <Badge variant={getStatusColor(row.status)}>
        {row.status}
      </Badge>
    ) 
  },
  {
    header: "Actions",
    exportValue: () => "View",
    accessor: (row) => (
      <span className="text-slate-600 hover:text-black font-semibold transition-colors cursor-pointer inline-flex items-center gap-1">
        <Eye className="h-4 w-4 text-slate-400" /> <span className="text-xs">Details</span>
      </span>
    )
  }
]

export function OrdersTable({ data }: { data: OrderRow[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [filterType, setFilterType] = useState<"ALL" | "COD" | "PREPAID">("ALL")

  const filteredData = data.filter((row) => {
    const matchesSearch = 
      row.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.transactionRef || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (row.phone || "").includes(searchTerm)
    
    const matchesStatus = filterStatus === "ALL" || row.status === filterStatus
    const matchesType = filterType === "ALL" || 
      (filterType === "COD" && row.isCOD) ||
      (filterType === "PREPAID" && !row.isCOD)

    return matchesSearch && matchesStatus && matchesType
  })

  // Stats
  const codCount = data.filter(d => d.isCOD).length
  const prepaidCount = data.filter(d => !d.isCOD).length
  const failedCount = data.filter(d => d.paymentStatus === "FAILED").length

  return (
    <div className="space-y-4 p-4">
      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-extrabold text-slate-900">{data.length}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">Total Orders</p>
        </div>
        <div className="bg-blue-50/70 border border-blue-200/80 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-extrabold text-blue-700">{prepaidCount}</p>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">Prepaid</p>
        </div>
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-extrabold text-amber-700">{codCount}</p>
          <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mt-0.5">COD Orders</p>
        </div>
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-3.5 text-center">
          <p className="text-2xl font-extrabold text-rose-700">{failedCount}</p>
          <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wider mt-0.5">Failed</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input 
          type="text"
          placeholder="Search by Order ID, Customer, Phone, or TXN Ref..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 bg-white py-2 px-3.5 text-slate-900 text-xs font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 outline-hidden shadow-2xs"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-slate-900 outline-hidden shadow-2xs cursor-pointer"
        >
          <option value="ALL">All Payment Types</option>
          <option value="COD">COD Only</option>
          <option value="PREPAID">Prepaid Only</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-8 text-slate-800 text-xs font-semibold focus:ring-2 focus:ring-slate-900 outline-hidden shadow-2xs cursor-pointer"
        >
          <option value="ALL">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      {/* Data Table */}
      <DataTable 
        data={filteredData} 
        columns={columns} 
        keyField="id" 
        emptyMessage="No orders found matching your criteria."
        exportable={true}
        exportFilename="DesignerWorld_Orders"
        pageSize={15}
        getRowHref={(row) => `/admin/orders/${row.id}`} 
      />
    </div>
  )
}
