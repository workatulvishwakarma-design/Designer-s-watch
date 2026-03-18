"use client"

import { useState } from "react"
import { Plus, MapPin, SearchX, Edit2, Trash2 } from "lucide-react"
import { AddressForm } from "@/components/user/AddressForm"
import { deleteAddress } from "@/actions/user.address.actions"
import { toast } from "sonner"
import { ConfirmModal } from "@/components/admin/ConfirmModal"

export function AddressBook({ addresses }: { addresses: any[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any | null>(null)

  const handleCreate = () => {
    setEditingAddress(null)
    setIsModalOpen(true)
  }

  const handleEdit = (addr: any) => {
    setEditingAddress(addr)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    const res = await deleteAddress(id)
    if (res.error) toast.error(res.error)
    else toast.success(res.success)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div>
          <h2 className="text-xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:tracking-tight">
            Address Book
          </h2>
          <p className="mt-1 text-sm text-gray-500">Manage your shipping destinations.</p>
         </div>
         <button
            onClick={handleCreate}
            className="flex items-center justify-center rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 transition-colors"
         >
           <Plus className="-ml-0.5 mr-1.5 h-4 w-4" /> Add New Address
         </button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center rounded-xl border-2 border-dashed border-gray-300 dark:border-zinc-800 p-12">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No addresses</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't saved any addresses yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
             <div key={addr.id} className="relative rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm flex flex-col">
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10">
                    Default
                  </span>
                )}
                
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{addr.firstName} {addr.lastName}</h3>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1 flex-grow">
                  <p>{addr.addressLine1}</p>
                  {addr.addressLine2 && <p>{addr.addressLine2}</p>}
                  <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                  <p>{addr.country}</p>
                  {addr.phone && <p className="pt-2">Phone: {addr.phone}</p>}
                </div>

                <div className="mt-6 flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                  <button onClick={() => handleEdit(addr)} className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors flex items-center">
                    <Edit2 className="h-4 w-4 mr-1.5" /> Edit
                  </button>
                  <ConfirmModal
                    title="Delete Address"
                    description="Are you sure you want to remove this address from your book?"
                    confirmText="Delete"
                    variant="danger"
                    onConfirm={() => handleDelete(addr.id)}
                    triggerButton={
                      <button className="text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-500 flex items-center">
                        <Trash2 className="h-4 w-4 mr-1.5" /> Delete
                      </button>
                    }
                  />
                </div>
             </div>
          ))}
        </div>
      )}

      {/* Basic headless dialog emulation for the form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto px-4 py-6 sm:px-0">
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 p-6 text-left shadow-xl transition-all">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-6">
              {editingAddress ? "Edit Shipping Address" : "Add New Shipping Address"}
            </h3>
            <AddressForm initialData={editingAddress} onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
