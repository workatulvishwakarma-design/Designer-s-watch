"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import * as xlsx from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { Download, FileText, FileSpreadsheet, Search, ChevronUp, ChevronDown, ChevronsUpDown, PackageOpen } from "lucide-react"

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
  searchPlaceholder = "Search...",
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
        return String(row[col.accessor] ?? "").toLowerCase().includes(term)
      })
    })
  }, [data, searchTerm, columns])

  // Sort
  const sortedData = useMemo(() => {
    if (!sortField) return searchedData
    return [...searchedData].sort((a, b) => {
      const valA = a[sortField]
      const valB = b[sortField]
      const strA = String(valA ?? "").toLowerCase()
      const strB = String(valB ?? "").toLowerCase()
      const numA = Number(strA.replace(/[^0-9.-]/g, ""))
      const numB = Number(strB.replace(/[^0-9.-]/g, ""))
      
      if (!isNaN(numA) && !isNaN(numB)) {
        return sortDir === "asc" ? numA - numB : numB - numA
      }
      return sortDir === "asc" ? strA.localeCompare(strB) : strB.localeCompare(strA)
    })
  }, [searchedData, sortField, sortDir])

  // Pagination
  const effectivePageSize = pageSize > 0 ? pageSize : sortedData.length
  const totalPages = Math.max(1, Math.ceil(sortedData.length / effectivePageSize))
  const paginatedData = pageSize > 0 
    ? sortedData.slice((currentPage - 1) * effectivePageSize, currentPage * effectivePageSize) 
    : sortedData

  // Reset page when search changes
  React.useEffect(() => { setCurrentPage(1) }, [searchTerm])

  const handleSort = (col: Column<T>) => {
    const key = col.sortKey || (typeof col.accessor !== "function" ? col.accessor : null)
    if (!key) return
    if (sortField === key) {
      setSortDir(prev => prev === "asc" ? "desc" : "asc")
    } else {
      setSortField(key)
      setSortDir("asc")
    }
  }

  const getExportData = () => {
    const source = sortedData // export all filtered/sorted data, not just current page
    return source.map(row => {
      const obj: Record<string, any> = {}
      columns.forEach(col => {
        obj[col.header] = col.exportValue 
          ? col.exportValue(row) 
          : (typeof col.accessor === 'function' ? '-' : row[col.accessor])
      })
      return obj
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
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950 pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>
        )}
        {exportable && data.length > 0 && (
          <div className="flex gap-2 ml-auto">
            <button onClick={handleExportCSV} className="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-2 rounded-lg hover:border-blue-500 transition-colors">
              <FileText size={14} className="text-blue-600" /> CSV
            </button>
            <button onClick={handleExportExcel} className="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-2 rounded-lg hover:border-green-500 transition-colors">
              <FileSpreadsheet size={14} className="text-green-600" /> Excel
            </button>
            <button onClick={handleExportPDF} className="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 px-3 py-2 rounded-lg hover:border-red-500 transition-colors">
              <FileText size={14} className="text-red-600" /> PDF
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
          <thead className={`bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 ${stickyHeader ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {columns.map((col, index) => {
                const isSortable = col.sortKey || (typeof col.accessor !== "function")
                const activeSort = sortField === (col.sortKey || (typeof col.accessor !== "function" ? col.accessor : null))
                return (
                  <th
                    key={index}
                    scope="col"
                    onClick={() => isSortable && handleSort(col)}
                    className={`py-3.5 pl-4 pr-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 sm:pl-6 ${isSortable ? 'cursor-pointer select-none hover:text-gray-900 dark:hover:text-white transition-colors' : ''}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.header}
                      {isSortable && (
                        activeSort 
                          ? (sortDir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />) 
                          : <ChevronsUpDown className="h-3 w-3 opacity-30" />
                      )}
                    </span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-3 py-16 text-center">
                  {emptyIcon || <PackageOpen className="h-10 w-10 text-gray-300 dark:text-zinc-700 mx-auto mb-3" />}
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{emptyMessage}</p>
                  {searchTerm && <p className="text-xs text-gray-400 mt-1">Try adjusting your search terms.</p>}
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => (
                <tr 
                  key={String(row[keyField])} 
                  onClick={getRowHref ? () => router.push(getRowHref(row)) : undefined}
                  className={`hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors ${getRowHref ? 'cursor-pointer' : ''}`}
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-300 sm:pl-6"
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
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-gray-500">
            Showing {((currentPage - 1) * effectivePageSize) + 1}–{Math.min(currentPage * effectivePageSize, sortedData.length)} of {sortedData.length} results
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                    page === currentPage 
                      ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white' 
                      : 'border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              )
            })}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
