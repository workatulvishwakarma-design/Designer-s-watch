"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { ConfirmModal } from "@/components/admin/ConfirmModal"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"
import { Trash2, Edit } from "lucide-react"
import { toast } from "sonner"

export function CategoryClientActions({ initialData }: { initialData: any[] }) {
  
  const handleDelete = async (id: string) => {
    toast.error("Collection deletion is temporarily disabled during migration.")
  }

  const columns: Column<any>[] = [
    { header: "Collection Name", accessor: "name" },
    { header: "URL Slug", accessor: "slug" },
    { header: "Watch Families Linked", accessor: "products" },
    {
      header: "Status",
      accessor: (row) => (
        <Badge variant={row.visibility === "ACTIVE" ? "success" : "neutral"}>
          {row.visibility === "ACTIVE" ? "Active" : "Hidden"}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-3 items-center">
          <Link 
            href={`/admin/categories/${row.id}/edit`} 
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Edit Collection"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <ConfirmModal
            title="Delete Collection"
            description={`Are you sure you want to delete '${row.name}'? This cannot be undone. Families linked must be removed first.`}
            confirmText="Delete"
            variant="danger"
            onConfirm={() => handleDelete(row.id)}
            triggerButton={
              <button 
                className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Collection"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            }
          />
        </div>
      )
    }
  ]

  return (
    <DataTable 
      data={initialData} 
      columns={columns} 
      keyField="id" 
      searchable
      searchPlaceholder="Search collections..."
    />
  )
}
