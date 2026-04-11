"use client"

import { generateInvoicePDF } from "@/lib/invoice"
import { Download, Eye } from "lucide-react"

interface InvoiceData {
  orderId: string;
  date: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  shippingAddress: string;
  items: { name: string; quantity: number; price: number }[];
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discount: number;
  total: number;
  isCOD: boolean;
  advancePaid: number;
  balanceDue: number;
}

export function AdminOrderInvoiceButton({ data }: { data: InvoiceData }) {
  const handleView = async () => {
    const blob = await generateInvoicePDF(data, "blob") as Blob;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // setTimeout(() => URL.revokeObjectURL(url), 10000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleView}
        className="inline-flex flex-1 justify-center items-center gap-2 rounded-md bg-white border border-gray-300 dark:border-zinc-700 dark:bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-700 focus:outline-none transition-colors"
      >
        <Eye className="h-4 w-4" /> View Invoice Live
      </button>
      <button
        onClick={() => generateInvoicePDF(data, "download")}
        className="inline-flex flex-1 justify-center items-center gap-2 rounded-md bg-[#1A1918] border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#2A2928] focus:outline-none transition-colors"
      >
        <Download className="h-4 w-4" /> Download PDF
      </button>
    </div>
  )
}
