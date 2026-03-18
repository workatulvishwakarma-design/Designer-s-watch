"use client"

import { DataTable, Column } from "@/components/admin/DataTable"
import { ConfirmModal } from "@/components/admin/ConfirmModal"
import { Badge } from "@/components/admin/Badge"
import Link from "next/link"
import { Trash2, Edit } from "lucide-react"
import { deleteCategory } from "@/actions/admin.category.actions"
import { toast } from "sonner"

export function CategoryClientActions({ initialData }: { initialData: any[] }) {
  
  const handleDelete = async (id: string) => {
    const res = await deleteCategory(id)
    if (res.error) toast.error(res.error)
    else toast.success(res.success)
  }

  const columns: Column<any>[] = [
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    { header: "Priorities", accessor: "sortPriority" },
    { 
      header: "Products Linked", 
      accessor: "products" 
    },
    {
      header: "Visibility",
      accessor: (row) => (
        <Badge variant={row.visibility ? "success" : "neutral"}>
          {row.visibility ? "Visible" : "Hidden"}
        </Badge>
      )
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-4 items-center">
          <Link href={`/admin/categories/${row.id}/edit`} className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">
            <Edit className="h-4 w-4" />
          </Link>
          <ConfirmModal
            title="Delete Category"
            description={`Are you sure you want to delete '${row.name}'? This cannot be undone. Products linked must be removed first.`}
            confirmText="Delete"
            variant="danger"
            onConfirm={() => handleDelete(row.id)}
            triggerButton={
              <button className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-500 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            }
          />
        </div>
      )
    }
  ]

  return (
    <DataTable data={initialData} columns={columns} keyField="id" />
  )
}
