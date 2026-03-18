"use client"

import { useState } from "react"
import { upsertAddress } from "@/actions/user.address.actions"
import { toast } from "sonner"

export function AddressForm({ initialData, onClose }: { initialData?: any, onClose: () => void }) {
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)

    const formData = new FormData(e.currentTarget)
    if (initialData?.id) formData.append("id", initialData.id)

    const res = await upsertAddress(formData)
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      onClose()
    }
    setIsPending(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
          <input type="text" name="firstName" required defaultValue={initialData?.firstName}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
          <input type="text" name="lastName" required defaultValue={initialData?.lastName}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 1</label>
        <input type="text" name="addressLine1" required defaultValue={initialData?.addressLine1}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address Line 2 (Optional)</label>
        <input type="text" name="addressLine2" defaultValue={initialData?.addressLine2}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">City</label>
          <input type="text" name="city" required defaultValue={initialData?.city}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">State / Province</label>
          <input type="text" name="state" required defaultValue={initialData?.state}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Postal Code</label>
          <input type="text" name="postalCode" required defaultValue={initialData?.postalCode}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
          <input type="text" name="country" required defaultValue={initialData?.country || "India"}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
        <input type="tel" name="phone" defaultValue={initialData?.phone}
          className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
        />
      </div>

      <div className="flex items-center pb-4 pt-2">
        <input type="checkbox" name="isDefault" id="isDefault" defaultChecked={initialData ? initialData.isDefault : false}
          className="h-4 w-4 rounded border-gray-300 dark:border-zinc-700 text-black focus:ring-black"
        />
        <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
          Make this my default shipping address
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <button type="button" onClick={onClose} disabled={isPending}
          className="rounded-md bg-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-700"
        >
          Cancel
        </button>
        <button type="submit" disabled={isPending}
          className="rounded-md bg-black dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save Address"}
        </button>
      </div>
    </form>
  )
}
