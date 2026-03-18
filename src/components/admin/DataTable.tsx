"use client"

import React from "react"

export interface Column<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  emptyMessage?: string
}

export function DataTable<T>({ data, columns, keyField, emptyMessage = "No records found." }: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300 dark:divide-zinc-800">
        <thead className="bg-gray-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-zinc-800 bg-white dark:bg-zinc-950">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-3 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={String(row[keyField])} className="hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors">
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900 dark:text-gray-300 sm:pl-6"
                  >
                    {typeof col.accessor === "function" ? col.accessor(row) : String(row[col.accessor])}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
