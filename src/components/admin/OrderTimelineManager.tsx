"use client"

import { useState } from "react"
import { OrderStatus } from "@prisma/client"
import { appendTrackingEvent, updateOrderStatus } from "@/actions/admin.order.actions"
import { toast } from "sonner"

export function OrderTimelineManager({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) {
  const [isPending, setIsPending] = useState(false)

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsPending(true)
    const newStatus = e.target.value as OrderStatus
    const res = await updateOrderStatus(orderId, newStatus)
    if (res.error) toast.error(res.error)
    else toast.success(`Order moved to ${newStatus}`)
    setIsPending(false)
  }

  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    const res = await appendTrackingEvent(orderId, formData)
    
    if (res.error) {
      toast.error(res.error)
    } else {
      toast.success(res.success)
      ;(e.target as HTMLFormElement).reset()
    }
    setIsPending(false)
  }

  return (
    <div className="space-y-8">
      {/* High Level Status */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
        <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 mb-4">Master Status</h3>
        <select
          disabled={isPending}
          value={currentStatus}
          onChange={handleStatusChange}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 focus:ring-2 focus:ring-black sm:text-sm"
        >
          {Object.values(OrderStatus).map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <p className="mt-2 text-xs text-gray-500">Changing this automatically appends a tracking log.</p>
      </div>

      {/* Manual Timeline Appender */}
      <form onSubmit={handleAddEvent} className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 space-y-4">
        <h3 className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">Add Manual Tracking Event</h3>
        
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Associated Status Phase</label>
          <select
            name="status"
            defaultValue={currentStatus}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          >
             {Object.values(OrderStatus).map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Public Label (e.g., 'Arrived at sorting facility')</label>
          <input
            type="text" name="label" required
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Location (Optional)</label>
          <input
            type="text" name="location" placeholder="e.g., Mumbai Hub"
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">Internal Note / Description</label>
          <textarea
            name="description" rows={2}
            className="mt-1 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white dark:bg-zinc-800 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-zinc-700 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-md bg-black dark:bg-white px-3 py-2 text-sm font-semibold text-white dark:text-black shadow-sm disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Append Timeline"}
        </button>
      </form>
    </div>
  )
}
