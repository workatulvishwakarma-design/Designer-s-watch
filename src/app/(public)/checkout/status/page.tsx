"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Link from "next/link"
import { CheckCircle2, Clock, XCircle, Package, ArrowRight, Loader2 } from "lucide-react"

function StatusContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const txn = searchParams.get("txn")
  const status = searchParams.get("status") || "success"

  const isSuccess = status !== "failed"

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-32 pb-24">
      <div className="max-w-lg mx-auto px-6">
        <div className="bg-white rounded-3xl border border-[#E8E0D5] p-10 md:p-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.04)]">
          {/* Status Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          }`}>
            {isSuccess ? (
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            ) : (
              <XCircle className="w-10 h-10 text-red-500" />
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display text-[#1A1918] mb-3">
            {isSuccess ? "Order Confirmed" : "Payment Failed"}
          </h1>

          <p className="text-[#9C9690] font-body text-sm mb-6 max-w-sm mx-auto">
            {isSuccess
              ? "Thank you for your purchase. Your order has been placed successfully."
              : "Something went wrong with your payment. Please try again."}
          </p>

          {/* Order Details */}
          {orderId && (
            <div className="bg-[#FAF8F4] rounded-2xl p-5 mb-6 space-y-2.5">
              <div className="flex justify-between items-center text-sm font-body">
                <span className="text-[#9C9690]">Order ID</span>
                <span className="text-[#1A1918] font-medium font-mono text-xs">{orderId}</span>
              </div>
              {txn && (
                <div className="flex justify-between items-center text-sm font-body">
                  <span className="text-[#9C9690]">Transaction Ref</span>
                  <span className="text-[#1A1918] font-medium font-mono text-xs">{txn}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-sm font-body">
                <span className="text-[#9C9690]">Status</span>
                <span className={`flex items-center gap-1.5 font-medium text-xs uppercase tracking-wider ${
                  isSuccess ? "text-green-600" : "text-red-500"
                }`}>
                  {isSuccess ? <Clock size={12} /> : <XCircle size={12} />}
                  {isSuccess ? "Processing" : "Failed"}
                </span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          {isSuccess && (
            <div className="bg-[#F0F7F4] border border-green-200 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-2 text-green-700 mb-1">
                <Package size={14} />
                <span className="text-xs font-body font-semibold uppercase tracking-wider">What happens next?</span>
              </div>
              <p className="text-xs text-green-600 font-body">
                You will receive an order confirmation email shortly. We will notify you when your timepiece ships.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3 mt-8">
            {isSuccess ? (
              <>
                <Link
                  href="/account/orders"
                  className="w-full bg-[#1A1918] text-white py-4 rounded-xl font-body text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8935A] transition-all flex items-center justify-center gap-2"
                >
                  View My Orders <ArrowRight size={14} />
                </Link>
                <Link
                  href="/"
                  className="w-full border border-[#E8E0D5] text-[#1A1918] py-3.5 rounded-xl font-body text-[11px] tracking-[0.2em] uppercase hover:border-[#B8935A] hover:text-[#B8935A] transition-all"
                >
                  Continue Shopping
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/checkout"
                  className="w-full bg-[#1A1918] text-white py-4 rounded-xl font-body text-[11px] tracking-[0.2em] uppercase hover:bg-[#B8935A] transition-all flex items-center justify-center gap-2"
                >
                  Try Again <ArrowRight size={14} />
                </Link>
                <Link
                  href="/"
                  className="w-full border border-[#E8E0D5] text-[#1A1918] py-3.5 rounded-xl font-body text-[11px] tracking-[0.2em] uppercase hover:border-[#B8935A] hover:text-[#B8935A] transition-all"
                >
                  Return Home
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#B8935A]" />
      </div>
    }>
      <StatusContent />
    </Suspense>
  )
}
