"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  HelpCircle,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MessageCircle,
  Phone,
  Truck,
  ShieldCheck,
  FileText
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export interface PlainOrderData {
  id: string;
  totalAmount: string | number;
  createdAt?: string;
  status?: string;
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    phone?: string;
  } | null;
  items?: Array<{
    variant?: {
      sku?: string;
      family?: { name?: string };
    };
    quantity?: number;
  }>;
}

interface OrderModalProps {
  order: PlainOrderData;
}

export function OrderActionButtons({ order }: OrderModalProps) {
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setReturnModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E0D5] bg-white text-[#1A1918] hover:border-[#B8935A] hover:bg-[#FAF8F4] text-xs font-body tracking-wider uppercase transition-all duration-200 shadow-sm"
        >
          <RotateCcw size={13} className="text-[#B8935A]" />
          <span>Return / Exchange</span>
        </button>

        <button
          onClick={() => setHelpModalOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E8E0D5] bg-white text-[#1A1918] hover:border-[#003926] hover:bg-[#FAF8F4] text-xs font-body tracking-wider uppercase transition-all duration-200 shadow-sm"
        >
          <HelpCircle size={13} className="text-[#003926]" />
          <span>Need Help?</span>
        </button>
      </div>

      {/* Return Modal */}
      <ReturnOrderModal
        order={order}
        isOpen={returnModalOpen}
        onClose={() => setReturnModalOpen(false)}
      />

      {/* Help Modal */}
      <HelpCenterModal
        order={order}
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </>
  );
}

export function ReturnOrderModal({
  order,
  isOpen,
  onClose,
}: {
  order: OrderModalProps["order"];
  isOpen: boolean;
  onClose: () => void;
}) {
  const shortId = order.id.slice(-8).toUpperCase();
  const [reason, setReason] = useState("Size / Fit issue");
  const [resolution, setResolution] = useState<"EXCHANGE" | "REFUND" | "STORE_CREDIT">("REFUND");
  const [notes, setNotes] = useState("");
  const [phone, setPhone] = useState(order.shippingAddress?.phone || "");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ returnId: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders/return", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          reason,
          resolution,
          notes,
          contactPhone: phone,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setResult({
          returnId: data.returnId,
          message: data.message,
        });
        toast.success(`Return request ${data.returnId} logged successfully!`);
      } else {
        toast.error(data.error || "Failed to submit return request");
      }
    } catch {
      toast.error("Failed to connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EDE8DF]"
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>

            {result ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#EBF7F0] text-[#003926] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-display text-2xl text-[#1A1918] mb-2">
                  Return Request Received
                </h3>
                <div className="inline-block bg-[#FAF8F4] px-4 py-2 rounded-xl border border-[#EDE8DF] font-mono text-sm text-[#003926] font-bold mb-4">
                  {result.returnId}
                </div>
                <p className="text-sm font-dm text-[#5C5752] max-w-sm mx-auto mb-6 leading-relaxed">
                  {result.message}
                </p>
                <div className="p-4 bg-[#FAF8F4] rounded-2xl border border-[#EDE8DF] text-xs font-dm text-[#706B65] text-left space-y-1.5 mb-6">
                  <p className="font-semibold text-[#1A1918]">Next Steps:</p>
                  <p>1. Keep the watch in original packaging with tags and warranty booklet intact.</p>
                  <p>2. Our courier partner will contact you for doorstep pickup within 48 hours.</p>
                  <p>3. Once inspected, your {resolution.toLowerCase()} will be processed promptly.</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full py-3.5 bg-[#003926] text-white rounded-xl font-dm text-xs uppercase tracking-widest hover:bg-[#024D35] transition-colors"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <RotateCcw size={20} className="text-[#B8935A]" />
                  <h3 className="font-display text-xl text-[#1A1918]">
                    Request Return / Exchange
                  </h3>
                </div>
                <p className="text-xs font-dm text-[#8A847C] mb-6">
                  Order <span className="font-semibold text-[#1A1918]">#{shortId}</span> • 7-day hassle-free doorstep pickup
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Reason for Return *
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A]"
                    >
                      <option value="Size / Fit issue">Size / Fit issue</option>
                      <option value="Defective or damaged timepiece">Defective or damaged timepiece</option>
                      <option value="Different from pictures / wrong color">Different from pictures / wrong color</option>
                      <option value="Delivery was delayed">Delivery was delayed</option>
                      <option value="Changed mind / No longer needed">Changed mind / No longer needed</option>
                      <option value="Warranty claim / servicing">Warranty claim / servicing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Preferred Resolution *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { key: "REFUND", label: "Full Refund" },
                        { key: "EXCHANGE", label: "Exchange Watch" },
                        { key: "STORE_CREDIT", label: "Store Credit" },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setResolution(item.key as any)}
                          className={`p-3 rounded-xl border text-center font-dm text-xs transition-all ${
                            resolution === item.key
                              ? "border-[#003926] bg-[#003926] text-white font-medium shadow-sm"
                              : "border-[#EDE8DF] bg-[#FAF8F4] text-[#1A1918] hover:border-[#B8935A]"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Contact Phone for Pickup Courier
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Additional Details (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Please mention any specific dial, strap or defect notes..."
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A] resize-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={loading}
                      className="flex-1 py-3.5 border border-[#EDE8DF] text-[#1A1918] rounded-xl font-dm text-xs uppercase tracking-wider hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-3.5 bg-[#003926] text-white rounded-xl font-dm text-xs uppercase tracking-widest hover:bg-[#024D35] flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit Request"}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export function HelpCenterModal({
  order,
  isOpen,
  onClose,
}: {
  order: OrderModalProps["order"];
  isOpen: boolean;
  onClose: () => void;
}) {
  const shortId = order.id.slice(-8).toUpperCase();
  const [activeTab, setActiveTab] = useState<"ticket" | "quick">("ticket");
  const [category, setCategory] = useState("Delivery & Courier Tracking");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState(order.shippingAddress?.phone || "");
  const [loading, setLoading] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/orders/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          category,
          message,
          phone,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedTicket(data.ticketId);
        toast.success(data.message || "Support ticket created!");
      } else {
        toast.error(data.error || "Failed to submit query");
      }
    } catch {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMsg = encodeURIComponent(
    `Hello Designer World Concierge,\n\nI need assistance with my Order #${shortId}.\nTotal: ₹${order.totalAmount}\nStatus: ${order.status || "Pending"}`
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EDE8DF]"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <HelpCircle size={20} className="text-[#003926]" />
              <h3 className="font-display text-xl text-[#1A1918]">Help Center</h3>
            </div>
            <p className="text-xs font-dm text-[#8A847C] mb-5">
              Support for Order <span className="font-semibold text-[#1A1918]">#{shortId}</span>
            </p>

            {/* Tab switch */}
            <div className="flex rounded-xl bg-[#FAF8F4] p-1 border border-[#EDE8DF] mb-6">
              <button
                onClick={() => setActiveTab("ticket")}
                className={`flex-1 py-2 text-xs font-dm font-medium rounded-lg transition-all ${
                  activeTab === "ticket"
                    ? "bg-white text-[#003926] shadow-sm font-semibold"
                    : "text-[#706B65] hover:text-[#1A1918]"
                }`}
              >
                Send Message / Ticket
              </button>
              <button
                onClick={() => setActiveTab("quick")}
                className={`flex-1 py-2 text-xs font-dm font-medium rounded-lg transition-all ${
                  activeTab === "quick"
                    ? "bg-white text-[#003926] shadow-sm font-semibold"
                    : "text-[#706B65] hover:text-[#1A1918]"
                }`}
              >
                Instant Concierge
              </button>
            </div>

            {activeTab === "ticket" ? (
              submittedTicket ? (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-[#EBF7F0] text-[#003926] rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 className="font-display text-lg text-[#1A1918] mb-1">Ticket Submitted</h4>
                  <p className="font-mono text-xs text-[#003926] font-bold mb-3">{submittedTicket}</p>
                  <p className="text-xs font-dm text-[#706B65] mb-6 leading-relaxed">
                    Our luxury customer service specialist has received your inquiry for Order #{shortId} and will contact you within 2 business hours.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full py-3 bg-[#003926] text-white rounded-xl font-dm text-xs uppercase tracking-widest hover:bg-[#024D35]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Issue Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A]"
                    >
                      <option value="Delivery & Courier Tracking">Delivery & Courier Tracking</option>
                      <option value="Product Sizing & Strap Adjustments">Product Sizing & Strap Adjustments</option>
                      <option value="Payment / Invoice Inquiry">Payment / Invoice Inquiry</option>
                      <option value="Warranty Registration">Warranty Registration</option>
                      <option value="Return / Exchange Assistance">Return / Exchange Assistance</option>
                      <option value="Other Question">Other Question</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-dm font-semibold text-[#1A1918] uppercase tracking-wider mb-1.5">
                      How can we assist you? *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please describe your question regarding this timepiece order..."
                      className="w-full px-4 py-3 bg-[#FAF8F4] border border-[#EDE8DF] rounded-xl font-dm text-sm text-[#1A1918] focus:outline-none focus:border-[#B8935A] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-[#003926] text-white rounded-xl font-dm text-xs uppercase tracking-widest hover:bg-[#024D35] flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : "Submit Support Ticket"}
                  </button>
                </form>
              )
            ) : (
              <div className="space-y-4">
                <a
                  href={`https://wa.me/918454926088?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-sm">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-dm font-semibold text-sm text-[#1A1918]">Chat on WhatsApp</p>
                      <p className="font-dm text-xs text-[#5C5752]">Instant response from our concierge</p>
                    </div>
                  </div>
                  <span className="text-xs font-dm font-bold text-[#003926] group-hover:translate-x-1 transition-transform">
                    Chat Now →
                  </span>
                </a>

                <a
                  href="tel:+918454926088"
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#EDE8DF] bg-[#FAF8F4] hover:bg-white hover:border-[#B8935A] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#003926] text-white flex items-center justify-center shadow-sm">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="font-dm font-semibold text-sm text-[#1A1918]">Direct Phone Line</p>
                      <p className="font-dm text-xs text-[#5C5752]">+91 84549 26088 (10 AM – 7 PM IST)</p>
                    </div>
                  </div>
                  <span className="text-xs font-dm font-bold text-[#003926] group-hover:translate-x-1 transition-transform">
                    Call →
                  </span>
                </a>

                <Link
                  href="/return-cancellation-policy"
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-2xl border border-[#EDE8DF] bg-[#FAF8F4] hover:bg-white transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#B8935A] text-white flex items-center justify-center shadow-sm">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="font-dm font-semibold text-sm text-[#1A1918]">Warranty & Return Policy</p>
                      <p className="font-dm text-xs text-[#5C5752]">Read our 7-day policy & 2-year warranty details</p>
                    </div>
                  </div>
                  <span className="text-xs font-dm font-bold text-[#B8935A] group-hover:translate-x-1 transition-transform">
                    View →
                  </span>
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
