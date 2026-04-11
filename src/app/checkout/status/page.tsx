"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, Package, Truck, CreditCard, Clock, ArrowRight, ShoppingBag, Copy, Check, AlertTriangle, Download } from "lucide-react";
import { generateInvoicePDF } from "@/lib/invoice";

interface PaymentResult {
  success: boolean;
  status: string;
  orderId: string;
  orderStatus?: string;
  totalAmount?: number;
  paymentMethod?: string;
  isCOD?: boolean;
  advancePaid?: number;
  balanceDue?: number;
  transactionRef?: string;
  message?: string;
  date?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  taxAmount?: number;
  shippingAmount?: number;
  shippingAddress?: any;
  items?: { name: string; quantity: number; price: number; image: string | null }[];
}

function CheckoutStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCartStore();
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const orderId = searchParams.get("order_id");
  const txn = searchParams.get("txn");

  useEffect(() => {
    if (!orderId) {
      router.push("/");
      return;
    }

    async function verifyPayment() {
      try {
        const res = await fetch(`/api/payment/verify?order_id=${orderId}&txn=${txn || ""}`);
        const data = await res.json();
        
        if (!res.ok) {
          // It's an error from the API (like 404 Not Found)
          setResult({
            success: false,
            status: "ERROR",
            orderId: orderId || "",
            message: data.error || "Failed to verify payment status."
          });
        } else {
          setResult(data);

          // Clear cart on successful order creation (including test PENDING modes)
          if (data.success) {
            clearCart();
          }
        }
      } catch (err) {
        setResult({ 
          success: false, 
          status: "ERROR", 
          orderId: orderId || "",
          message: "A network error occurred. We couldn't fetch your order." 
        });
      } finally {
        setIsLoading(false);
      }
    }

    verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, txn]);

  const copyOrderId = () => {
    if (result?.orderId) {
      navigator.clipboard.writeText(result.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadInvoice = async () => {
    if (!result) return;
    
    // Address string formatting:
    const addr = result.shippingAddress;
    const addressStr = addr ? `${addr.firstName} ${addr.lastName}\n${addr.addressLine1}${addr.addressLine2 ? ', ' + addr.addressLine2 : ''}\n${addr.city}, ${addr.state} ${addr.postalCode}\nPhone: ${addr.phone}` : 'N/A';

    setCopied(true); // just use for a generic visual queue or simply proceed
    await generateInvoicePDF({
      orderId: result.orderId,
      date: result.date ? new Date(result.date).toLocaleDateString() : new Date().toLocaleDateString(),
      customerName: addr ? `${addr.firstName} ${addr.lastName}` : (result.customerName || 'Customer'),
      customerEmail: result.customerEmail,
      customerPhone: addr?.phone || result.customerPhone,
      shippingAddress: addressStr,
      items: result.items || [],
      subtotal: (result.totalAmount || 0) - (result.taxAmount || 0) - (result.shippingAmount || 0),
      taxAmount: result.taxAmount || 0,
      shippingAmount: result.shippingAmount || 0,
      discount: 0, // Not explicitly tracked currently but can be later
      total: result.totalAmount || 0,
      isCOD: result.isCOD || false,
      advancePaid: result.advancePaid || 0,
      balanceDue: result.balanceDue || 0
    }, "download");
    
    setTimeout(() => setCopied(false), 2000);
  };

  // ─── Loading State ───
  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl border border-[#E8E0D5] p-16 shadow-2xl text-center max-w-md mx-auto w-full">
        <Loader2 className="w-12 h-12 animate-spin text-[#B8935A] mx-auto mb-6" />
        <h2 className="text-2xl font-cormorant text-[#1A1918] mb-3">Verifying Payment</h2>
        <p className="text-[#9C9690] font-dm text-sm">Please wait while we confirm your payment...</p>
      </div>
    );
  }

  if (!result) return null;

  const isSuccess = result.status === "PAID" || result.status === "ADVANCE_PAID";
  const isFailed = result.status === "FAILED";
  const isPending = result.status === "PENDING";
  const isError = result.status === "ERROR" || (!isSuccess && !isFailed && !isPending);

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* ─── Success State ─── */}
      {isSuccess && (
        <div className="bg-white rounded-3xl border border-[#E8E0D5] overflow-hidden shadow-lg">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#003926] to-[#005C3F] p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9zdmc+')] opacity-40" />
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-cormorant text-3xl text-white mb-2">
                {result.isCOD ? "COD Order Confirmed!" : "Payment Successful!"}
              </h1>
              <p className="text-white/70 font-dm text-sm">
                {result.isCOD
                  ? `₹${result.advancePaid} advance paid. ₹${result.balanceDue} payable on delivery.`
                  : `₹${result.totalAmount?.toLocaleString()} paid successfully.`}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            {/* Order ID */}
            <div className="flex items-center justify-between bg-[#FAF8F4] rounded-xl p-4 border border-[#E8E0D5]/50">
              <div>
                <p className="text-[10px] font-dm text-[#9C9690] uppercase tracking-widest">Order ID</p>
                <p className="text-[#1A1918] font-dm font-medium text-sm mt-0.5">{result.orderId}</p>
              </div>
              <button onClick={copyOrderId} className="p-2 hover:bg-white rounded-lg transition-colors">
                {copied ? <Check size={16} className="text-[#003926]" /> : <Copy size={16} className="text-[#9C9690]" />}
              </button>
            </div>

            {/* Transaction Ref */}
            {result.transactionRef && (
              <div className="bg-[#FAF8F4] rounded-xl p-4 border border-[#E8E0D5]/50">
                <p className="text-[10px] font-dm text-[#9C9690] uppercase tracking-widest">Transaction Ref</p>
                <p className="text-[#1A1918] font-dm font-medium text-sm mt-0.5">{result.transactionRef}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-4">
              <TimelineStep icon={<CreditCard size={16} />} title="Payment Received" subtitle={result.isCOD ? `₹${result.advancePaid} advance` : `₹${result.totalAmount?.toLocaleString()}`} active />
              <TimelineStep icon={<Package size={16} />} title="Order Processing" subtitle="We're preparing your order" active={result.orderStatus === "PROCESSING"} />
              <TimelineStep icon={<Truck size={16} />} title="Shipping" subtitle="Estimated 3-5 business days" />
            </div>

            {/* COD Note */}
            {result.isCOD && (
              <div className="bg-[#FFF8E1] border border-[#F5E6B8] rounded-xl p-4 flex gap-3">
                <Clock className="w-5 h-5 text-[#B8935A] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-dm font-medium text-[#1A1918]">Cash on Delivery</p>
                  <p className="text-xs text-[#5C5752] mt-1">₹{result.balanceDue?.toLocaleString()} is payable to the delivery executive upon delivery.</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#E8E0D5]/50">
              <Link
                href={`/admin/orders/${result.orderId}`}
                className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1A1918] text-white rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors group"
              >
                Track Order <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleDownloadInvoice}
                className="flex-1 flex items-center justify-center gap-2 py-4 border border-[#E8E0D5] text-[#1A1918] rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#FAF8F4] transition-colors"
                title="Download Invoice PDF"
              >
                <Download size={14} /> Download Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Failed State ─── */}
      {isFailed && (
        <div className="bg-white rounded-3xl border border-[#E8E0D5] overflow-hidden shadow-lg text-center p-12">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="font-cormorant text-3xl text-[#1A1918] mb-3">Payment Failed</h1>
          <p className="text-[#9C9690] font-dm text-sm mb-8 max-w-md mx-auto">
            {result.message || "Your payment could not be processed. Please try again."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <Link
              href="/checkout"
              className="flex-1 py-4 bg-[#1A1918] text-white rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
            >
              Retry Payment
            </Link>
            <Link
              href="/cart"
              className="flex-1 py-4 border border-[#E8E0D5] text-[#1A1918] rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#FAF8F4] transition-colors"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      )}

      {/* ─── Pending / Test Mode State ─── */}
      {isPending && (
        <div className="bg-white rounded-3xl border border-[#E8E0D5] overflow-hidden shadow-lg text-center p-12">
          <div className="w-20 h-20 rounded-full bg-[#FFF8E1] flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-[#B8935A]" />
          </div>
          <h1 className="font-cormorant text-3xl text-[#1A1918] mb-3">
            {result.message?.includes("not configured") ? "Test Order Created" : "Payment Processing"}
          </h1>
          <p className="text-[#9C9690] font-dm text-sm mb-4 max-w-md mx-auto">
            {result.message || "Your payment is being processed. You'll receive a confirmation shortly."}
          </p>
          {result.orderId && (
            <div className="bg-[#FAF8F4] rounded-xl p-4 border border-[#E8E0D5]/50 inline-block mb-8">
              <p className="text-[10px] font-dm text-[#9C9690] uppercase tracking-widest">Order ID</p>
              <p className="text-[#1A1918] font-dm font-medium">{result.orderId}</p>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <Link
              href="/"
              className="flex-1 py-4 bg-[#1A1918] text-white rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* ─── Error / Invalid State ─── */}
      {isError && (
        <div className="bg-white rounded-3xl border border-[#E8E0D5] overflow-hidden shadow-lg text-center p-12 w-full">
          <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="font-cormorant text-3xl text-[#1A1918] mb-3">Invalid Request</h1>
          <p className="text-[#9C9690] font-dm text-sm mb-8 max-w-md mx-auto">
            {result.message || "We couldn't verify this order. Please ensure the link is correct or try looking it up in your account."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <Link
              href="/"
              className="flex-1 py-4 bg-[#1A1918] text-white rounded-xl font-dm text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutStatusPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#FAF8F4] py-12 px-4">
      <Suspense fallback={
        <div className="bg-white rounded-3xl border border-[#E8E0D5] p-16 shadow-2xl text-center max-w-md mx-auto w-full">
          <Loader2 className="w-12 h-12 animate-spin text-[#B8935A] mx-auto mb-6" />
          <h2 className="text-2xl font-cormorant text-[#1A1918] mb-3">Loading Status...</h2>
          <p className="text-[#9C9690] font-dm text-sm">Please wait.</p>
        </div>
      }>
        <CheckoutStatusContent />
      </Suspense>
    </div>
  );
}

function TimelineStep({ icon, title, subtitle, active = false }: { icon: React.ReactNode; title: string; subtitle: string; active?: boolean }) {
  return (
    <div className={`flex items-start gap-4 ${active ? "opacity-100" : "opacity-40"}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${active ? "bg-[#003926] text-white" : "bg-[#F5F2ED] text-[#9C9690]"}`}>
        {icon}
      </div>
      <div>
        <p className={`font-dm text-sm font-medium ${active ? "text-[#1A1918]" : "text-[#9C9690]"}`}>{title}</p>
        <p className="font-dm text-xs text-[#9C9690] mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
