"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"
import { Eye, Banknote, CreditCard } from "lucide-react"
import { useState } from "react"

type OrderRow = {
  id: string
  date: string
  customer: string
  method: string
  total: string
  status: string
  // New fields
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
        <span className="font-mono text-xs">{row.id.toUpperCase().slice(-8)}</span>
        {row.transactionRef && (
          <p className="text-[10px] text-gray-400 mt-0.5">{row.transactionRef}</p>
        )}
      </div>
    )
  },
  { header: "Date", accessor: "date", exportValue: (row) => row.date },
  { 
    header: "Customer", 
    exportValue: (row) => `${row.customer} ${row.phone ? `(${row.phone})` : ""}`,
    accessor: (row) => (
      <div>
        <span>{row.customer}</span>
        {row.phone && <p className="text-[10px] text-gray-400 mt-0.5">{row.phone}</p>}
      </div>
    )
  },
  { 
    header: "Payment", 
    exportValue: (row) => `${row.isCOD ? "COD" : row.method || "Prepaid"} [${row.paymentStatus}]`,
    accessor: (row) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          {row.isCOD ? <Banknote className="w-3 h-3 text-amber-500" /> : <CreditCard className="w-3 h-3 text-blue-500" />}
          <span className="text-xs font-medium">
            {row.isCOD ? "COD" : row.method || "Prepaid"}
          </span>
        </div>
        <Badge variant={getPaymentStatusColor(row.paymentStatus)}>
          {row.paymentStatus}
        </Badge>
      </div>
    )
  },
  { 
    header: "Amount", 
    exportValue: (row) => `${row.total} ${row.isCOD ? `(Adv: ${row.advancePaid}, Due: ${row.balanceDue})` : ""}`,
    accessor: (row) => (
      <div>
        <span className="font-semibold">{row.total}</span>
        {row.isCOD && (
          <div className="text-[10px] mt-0.5">
            <span className="text-green-600">Adv: {row.advancePaid}</span>
            <span className="text-gray-400 mx-1">|</span>
            <span className="text-amber-600">Due: {row.balanceDue}</span>
          </div>
        )}
      </div>
    )
  },
  { 
    header: "Status", 
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
      <span className="text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer inline-flex items-center group">
        <Eye className="h-4 w-4 mr-1 group-hover:text-gold" /> <span className="text-xs">View</span>
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
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-2">
        <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.length}</p>
          <p className="text-[10px] text-gray-500 uppercase tracking-wider">Total Orders</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{prepaidCount}</p>
          <p className="text-[10px] text-blue-500 uppercase tracking-wider">Prepaid</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">{codCount}</p>
          <p className="text-[10px] text-amber-500 uppercase tracking-wider">COD Orders</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-red-700 dark:text-red-400">{failedCount}</p>
          <p className="text-[10px] text-red-500 uppercase tracking-wider">Failed</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <input 
          type="text"
          placeholder="Search by Order ID, Customer, Phone, or TXN Ref..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
        >
          <option value="ALL">All Types</option>
          <option value="COD">COD Only</option>
          <option value="PREPAID">Prepaid Only</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6"
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
        getRowHref={(row) => `/admin/orders/${row.id}`} 
      />
    </div>
  )
}
