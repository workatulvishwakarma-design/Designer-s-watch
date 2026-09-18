"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import * as xlsx from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { FileText, FileSpreadsheet, Search, ChevronUp, ChevronDown, ChevronsUpDown, PackageOpen } from "lucide-react"

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  exportValue?: (row: T) => string | number // strictly for CSV/PDF dumps
  sortKey?: keyof T // field to sort by when column header is clicked
  searchable?: boolean // whether this column is included in global search
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  emptyMessage?: string
  emptyIcon?: React.ReactNode
  exportable?: boolean
  exportFilename?: string
  getRowHref?: (row: T) => string
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  stickyHeader?: boolean
}

export function DataTable<T>({ 
  data, 
  columns, 
  keyField, 
  emptyMessage = "No records found.",
  emptyIcon,
  exportable = false,
  exportFilename = "export",
  getRowHref,
  searchable = false,
  searchPlaceholder = "Search records...",
  pageSize = 0,
  stickyHeader = false,
}: DataTableProps<T>) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<keyof T | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc")
  const [currentPage, setCurrentPage] = useState(1)

  // Search filter
  const searchedData = useMemo(() => {
    if (!searchTerm.trim()) return data
    const term = searchTerm.toLowerCase()
    return data.filter(row => {
      return columns.some(col => {
        if (typeof col.accessor === "function") {
          if (col.exportValue) {
            return String(col.exportValue(row)).toLowerCase().includes(term)
          }
          return false
        }
        const val = row[col.accessor]
        if (val === null || val === undefined) return false
        return String(val).toLowerCase().includes(term)
      })
    })
  }, [data, searchTerm, columns])

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortField) return searchedData
    return [...searchedData].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]
      if (aVal === bVal) return 0
      if (aVal === null || aVal === undefined) return 1
      if (bVal === null || bVal === undefined) return -1
      
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }
      const strA = String(aVal).toLowerCase()
      const strB = String(bVal).toLowerCase()
      return sortDir === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA)
    })
  }, [searchedData, sortField, sortDir])

  // Pagination
  const effectivePageSize = pageSize > 0 ? pageSize : sortedData.length
  const totalPages = Math.ceil(sortedData.length / effectivePageSize) || 1
  const paginatedData = useMemo(() => {
    if (pageSize <= 0) return sortedData
    const start = (currentPage - 1) * effectivePageSize
    return sortedData.slice(start, start + effectivePageSize)
  }, [sortedData, currentPage, effectivePageSize, pageSize])

  const handleSort = (col: Column<T>) => {
    const field = col.sortKey || (typeof col.accessor !== "function" ? col.accessor : null)
    if (!field) return
    if (sortField === field) {
      if (sortDir === "asc") setSortDir("desc")
      else {
        setSortField(null)
        setSortDir("asc")
      }
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  // Exports
  const getExportData = () => {
    return sortedData.map(row => {
      const exportRow: Record<string, any> = {}
      columns.forEach(col => {
        if (col.exportValue) {
          exportRow[col.header] = col.exportValue(row)
        } else if (typeof col.accessor !== "function") {
          exportRow[col.header] = row[col.accessor]
        }
      })
      return exportRow
    })
  }

  const handleExportExcel = () => {
    const exportData = getExportData()
    const ws = xlsx.utils.json_to_sheet(exportData)
    const wb = xlsx.utils.book_new()
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1")
    const wbout = xlsx.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([wbout], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${exportFilename}-${new Date().toISOString().split('T')[0]}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportCSV = () => {
    const exportData = getExportData()
    const ws = xlsx.utils.json_to_sheet(exportData)
    const csv = xlsx.utils.sheet_to_csv(ws)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${exportFilename}-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleExportPDF = () => {
    const doc = new jsPDF() as any
    const source = sortedData
    const tableData = source.map(row => 
      columns.map(col => 
        col.exportValue 
          ? col.exportValue(row) 
          : (typeof col.accessor === 'function' ? '' : String(row[col.accessor] || ''))
      )
    )
    autoTable(doc, {
      head: [columns.map(c => c.header)],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 8 }
    })
    doc.save(`${exportFilename}-${new Date().toISOString().split('T')[0]}.pdf`)
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {searchable && (
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all placeholder:text-slate-400 shadow-2xs"
            />
          </div>
        )}
        {exportable && data.length > 0 && (
          <div className="flex gap-2 ml-auto">
            <button onClick={handleExportCSV} className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer">
              <FileText size={13} className="text-blue-600" /> CSV
            </button>
            <button onClick={handleExportExcel} className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer">
              <FileSpreadsheet size={13} className="text-emerald-600" /> Excel
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 px-3 py-1.5 rounded-xl hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs cursor-pointer">
              <FileText size={13} className="text-rose-600" /> PDF
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-2xs border border-slate-200/90 rounded-2xl bg-white">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className={`bg-slate-50/90 border-b border-slate-200 ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {columns.map((col, index) => {
                const isSortable = col.sortKey || (typeof col.accessor !== "function")
                const activeSort = sortField === (col.sortKey || (typeof col.accessor !== "function" ? col.accessor : null))
                return (
                  <th
                    key={index}
                    scope="col"
                    onClick={() => isSortable && handleSort(col)}
                    className={`py-3.5 pl-4 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:pl-6 ${isSortable ? 'cursor-pointer select-none hover:text-slate-900 transition-colors' : ''}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {isSortable && (
                        activeSort 
                          ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3 text-slate-900" /> : <ChevronDown className="h-3 w-3 text-slate-900" />) 
                          : <ChevronsUpDown className="h-3 w-3 opacity-30 text-slate-400" />
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-16 text-center">
                  {emptyIcon || <PackageOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />}
                  <p className="text-sm font-semibold text-slate-700">{emptyMessage}</p>
                  {searchTerm && <p className="text-xs text-slate-400 mt-1">Try adjusting your search terms.</p>}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr 
                  key={String(row[keyField])} 
                  onClick={getRowHref ? () => router.push(getRowHref(row)) : undefined}
                  className={`hover:bg-slate-50/80 transition-colors ${getRowHref ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-xs font-medium text-slate-800 sm:pl-6"
                    >
                      {typeof col.accessor === "function" ? col.accessor(row) : String(row[col.accessor] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pageSize > 0 && totalPages > 1 && (
        <div className="flex items-center justify-between pt-2 text-xs">
          <p className="text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-900">{((currentPage - 1) * effectivePageSize) + 1}</span>–<span className="font-bold text-slate-900">{Math.min(currentPage * effectivePageSize, sortedData.length)}</span> of <span className="font-bold text-slate-900">{sortedData.length}</span> results
          </p>
          <div className="flex gap-1.5 items-center">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
            >
              Prev
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let page: number
              if (totalPages <= 5) {
                page = i + 1
              } else if (currentPage <= 3) {
                page = i + 1
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i
              } else {
                page = currentPage - 2 + i
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    page === currentPage 
                      ? 'bg-slate-950 text-white border-slate-950 shadow-2xs' 
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-2xs cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
