"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/store/cart"
import { processCheckout } from "@/actions/checkout.actions"
import { validateCoupon } from "@/actions/coupon.actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CheckCircle2, ShieldCheck, MapPin, Loader2, CreditCard, Tag, X, Truck, Gift, Lock, Plus, Smartphone, Building2, Banknote } from "lucide-react"
import { upsertAddress } from "@/actions/user.address.actions"

interface CouponResult {
  couponId: string
  code: string
  discount: number
  description: string
}

type PaymentMethod = "CARD" | "UPI" | "NET_BANKING" | "COD"

export function CheckoutForm({ addresses }: { addresses: any[] }) {
  const router = useRouter()
  const { items, getSubtotal, clearCart } = useCartStore()
  const [selectedAddress, setSelectedAddress] = useState<string>(
    addresses.find(a => a.isDefault)?.id || addresses[0]?.id || ""
  )
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("CARD")
  const [isPending, setIsPending] = useState(false)
  const [paymentStep, setPaymentStep] = useState<"checkout" | "processing" | "success">("checkout")
  const [showAddressForm, setShowAddressForm] = useState(false)
  
  // Coupon state
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<CouponResult | null>(null)
  const [couponLoading, setCouponLoading] = useState(false)

  // Hydration safety
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  if (items.length === 0 && paymentStep !== "success") {
    router.push("/cart")
    return null
  }

  const subtotal = getSubtotal()
  const discount = appliedCoupon?.discount || 0
  const afterDiscount = subtotal - discount
  const freeShipThreshold = 5000
  const shipping = afterDiscount >= freeShipThreshold ? 0 : 150
  const taxRate = 18
  const taxAmount = Math.round(afterDiscount * taxRate / (100 + taxRate))
  const total = afterDiscount + shipping

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    const result = await validateCoupon(couponCode, subtotal)
    setCouponLoading(false)
    
    if (result.error) {
      toast.error(result.error)
    } else if (result.success) {
      setAppliedCoupon({
        couponId: result.couponId!,
        code: result.code!,
        discount: result.discount!,
        description: result.description!,
      })
      toast.success(`Coupon applied: ${result.description}`)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
    toast.info("Coupon removed")
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAddress) {
      toast.error("Please select a shipping address")
      return
    }

    setIsPending(true)
    setPaymentStep("processing")

    // Simulate payment gateway processing visually for the demo
    await new Promise(resolve => setTimeout(resolve, 3000))

    const formData = new FormData()
    formData.append("addressId", selectedAddress)
    formData.append("cartItems", JSON.stringify(items))
    formData.append("paymentMethod", selectedPayment)
    if (appliedCoupon) {
      formData.append("couponId", appliedCoupon.couponId)
    }

    const res = await processCheckout(formData)
    
    if (res.error) {
      toast.error(res.error)
      setIsPending(false)
      setPaymentStep("checkout")
    } else if (res.success && res.orderId) {
      clearCart()
      router.replace(`/checkout/success/${res.orderId}`)
    }
  }

  // Payment processing overlay
  if (paymentStep === "processing") {
    return (
      <div className="max-w-lg mx-auto px-6 text-center py-20 min-h-[50vh] flex flex-col justify-center">
        <div className="bg-white rounded-3xl border border-[#E8E0D5] p-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#E8E0D5]">
            <div className="h-full bg-[#B8935A] w-2/3 animate-[pulse_1s_ease-in-out_infinite]" />
          </div>
          <div className="w-20 h-20 bg-[#FAF8F4] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse shadow-inner">
            <Lock className="w-10 h-10 text-[#B8935A]" />
          </div>
          <Loader2 className="w-10 h-10 animate-spin text-[#B8935A] mx-auto mb-6" />
          <h2 className="text-3xl font-display text-[#1A1918] mb-4">Processing {selectedPayment === 'COD' ? 'Order' : 'Payment'}</h2>
          <p className="text-[#9C9690] font-body mb-2 text-sm lg:text-base">Connecting securely to {selectedPayment === 'COD' ? 'our servers' : 'the payment gateway'}...</p>
          <p className="text-xs text-[#9C9690] font-body">Please do not refresh or close this window.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-7xl mx-auto px-6 md:px-12 pb-24">
      
      <div className="lg:col-span-7 space-y-12">
        
        {/* Shipping Address Selector */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-display text-[#1A1918] flex items-center gap-2">
                <MapPin size={24} className="text-[#B8935A]" /> Delivery Details
              </h2>
              <p className="text-sm font-body text-[#9C9690] mt-1">Select where you'd like your order delivered.</p>
            </div>
            {!showAddressForm && addresses.length > 0 && (
              <button 
                onClick={() => setShowAddressForm(true)}
                className="inline-flex items-center gap-2 text-[11px] font-body tracking-[0.1em] uppercase text-[#1A1918] hover:text-[#B8935A] transition-colors border border-[#E8E0D5] px-4 py-2 rounded-full hover:border-[#B8935A] bg-white"
              >
                <Plus size={14} /> New Address
              </button>
            )}
          </div>
          
          {addresses.length === 0 && !showAddressForm ? (
            <div className="bg-white p-10 rounded-2xl border border-[#E8E0D5] text-center shadow-sm">
              <MapPin className="w-10 h-10 text-[#E8E0D5] mx-auto mb-4" />
              <p className="text-[#9C9690] mb-6 font-body text-sm">You have not saved any addresses yet.</p>
              <button 
                onClick={() => setShowAddressForm(true)} 
                className="bg-[#1A1918] text-white py-3.5 px-8 rounded-full text-[11px] font-body tracking-[0.2em] uppercase hover:bg-[#B8935A] transition-all duration-300 shadow-lg shadow-black/5"
              >
                Add Shipping Address
              </button>
            </div>
          ) : showAddressForm ? (
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-[#B8935A]/30 shadow-[0_20px_40px_rgba(0,0,0,0.03)] relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
               <div className="absolute top-0 right-0 p-6">
                  <button onClick={() => setShowAddressForm(false)} className="text-[#9C9690] hover:bg-[#F5F2ED] rounded-full transition-colors p-2">
                    <X size={18} />
                  </button>
               </div>
               <h3 className="font-display text-xl text-[#1A1918] mb-8 border-b border-[#F5F2ED] pb-4">Add New Location</h3>
               
               <form action={async (formData) => {
                 const res = await upsertAddress(formData)
                 if (res.error) toast.error(res.error)
                 else {
                   toast.success("Address added")
                   setShowAddressForm(false)
                   router.refresh()
                 }
               }} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">First Name *</label>
                      <input name="firstName" placeholder="John" required className="luxury-input-field w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Last Name *</label>
                      <input name="lastName" placeholder="Doe" required className="luxury-input-field w-full" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Phone Number *</label>
                    <input name="phone" placeholder="+91 98765 43210" required className="luxury-input-field w-full" />
                  </div>

                  <div className="w-full h-px bg-[#F5F2ED] my-6" />

                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Address Line 1 *</label>
                    <input name="addressLine1" placeholder="House/Flat No., Building Name" required className="luxury-input-field w-full" />
                  </div>
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Address Line 2 & Landmark</label>
                    <input name="addressLine2" placeholder="Street Name, Area, Landmark (Optional)" className="luxury-input-field w-full" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Pincode *</label>
                      <input name="postalCode" placeholder="Enter 6-digit Pincode" required className="luxury-input-field w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">City *</label>
                      <input name="city" placeholder="e.g. Mumbai" required className="luxury-input-field w-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">State *</label>
                      <input name="state" placeholder="e.g. Maharashtra" required className="luxury-input-field w-full" />
                    </div>
                    <div>
                      <label className="block text-xs font-body uppercase tracking-wider text-[#9C9690] mb-1.5 ml-1">Country *</label>
                      <input name="country" placeholder="Country" required defaultValue="India" disabled className="luxury-input-field w-full bg-gray-50 text-gray-400 cursor-not-allowed border-[#E8E0D5]" />
                    </div>
                  </div>
                  
                  <div className="pt-4 pb-2">
                    <div className="flex items-center gap-3 p-4 border border-[#E8E0D5] rounded-xl bg-[#FAF8F4]/50">
                      <input type="checkbox" name="isDefault" id="isDefault" className="w-5 h-5 rounded border-[#E8E0D5] text-[#B8935A] focus:ring-[#B8935A] cursor-pointer" />
                      <label htmlFor="isDefault" className="text-sm text-[#1A1918] font-body cursor-pointer font-medium">Use as my default delivery address</label>
                    </div>
                  </div>
 
                  <div className="pt-2">
                    <button type="submit" className="w-full bg-[#1A1918] text-white py-4 bg-gradient-to-r hover:from-[#B8935A] hover:to-[#1A1918] rounded-xl text-[12px] font-body tracking-[0.2em] uppercase transition-all shadow-md">
                      Save & Deliver Here
                    </button>
                  </div>
               </form>
            </div>
          ) : (
            <div className="grid gap-4">
              {addresses.map(addr => (
                <label 
                  key={addr.id} 
                  className={`relative flex cursor-pointer rounded-2xl border p-6 shadow-sm focus:outline-none transition-all duration-300 ${
                    selectedAddress === addr.id 
                    ? 'border-[#B8935A] bg-[#FAF8F4] ring-1 ring-[#B8935A] scale-[1.01]' 
                    : 'border-[#E8E0D5] bg-white hover:border-[#B8935A]/50 hover:bg-gray-50/50'
                  }`}
                >
                  <input
                    type="radio" name="addressOption" value={addr.id}
                    className="sr-only" checked={selectedAddress === addr.id}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  />
                  <div className="flex w-full items-start justify-between">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-3 mb-1">
                        <p className="font-medium text-[#1A1918] text-base">{addr.firstName} {addr.lastName}</p>
                        {addr.isDefault && <span className="text-[10px] uppercase tracking-widest text-[#B8935A] border border-[#B8935A]/30 bg-[#B8935A]/5 px-2.5 py-0.5 rounded-full">Primary</span>}
                      </div>
                      <p className="text-[#5C5752] text-sm font-body max-w-sm">{addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ''}</p>
                      <p className="text-[#5C5752] text-sm font-body">{addr.city}, {addr.state} {addr.postalCode}</p>
                      <p className="text-[#1A1918] text-sm font-body mt-2 flex items-center gap-2"><Smartphone size={14} className="text-[#9C9690]" /> {addr.phone || "No phone added"}</p>
                    </div>
                    <div className="flex flex-col items-end gap-3 h-full justify-between">
                       <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${selectedAddress === addr.id ? 'border-[#B8935A] bg-[#B8935A]' : 'border-[#E8E0D5] bg-white'}`}>
                          {selectedAddress === addr.id && <CheckCircle2 className="h-4 w-4 text-white" />}
                       </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Payment Method */}
        <section className={`transition-opacity duration-300 ${!selectedAddress ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <div className="mb-6">
            <h2 className="text-2xl font-display text-[#1A1918] flex items-center gap-2">
              <ShieldCheck size={24} className="text-[#B8935A]" /> Payment Options
            </h2>
            <p className="text-sm font-body text-[#9C9690] mt-1">All transactions are secure and encrypted.</p>
          </div>
          
          <div className="grid gap-4">
            {/* Credit / Debit Card Option */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${selectedPayment === "CARD" ? 'border-[#B8935A] ring-1 ring-[#B8935A]' : 'border-[#E8E0D5] hover:border-[#B8935A]/50'}`}>
              <label className={`flex cursor-pointer p-5 ${selectedPayment === "CARD" ? 'bg-[#FAF8F4]' : 'bg-white'}`}>
                <input type="radio" name="paymentMethod" value="CARD" checked={selectedPayment === "CARD"} onChange={() => setSelectedPayment("CARD")} className="sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedPayment === "CARD" ? 'bg-white border-[#B8935A]/30 text-[#B8935A]' : 'bg-[#F5F2ED] border-transparent text-[#9C9690]'}`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1918] text-sm font-body">Credit / Debit Card</p>
                      <p className="text-xs text-[#9C9690] mt-0.5 font-body">Visa, Mastercard, Amex, RuPay</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === "CARD" ? 'border-[#B8935A] bg-[#B8935A]' : 'border-[#E8E0D5]'}`}>
                     {selectedPayment === "CARD" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </label>
              {/* Card Form Mock Details */}
              {selectedPayment === "CARD" && (
                <div className="px-6 pb-6 pt-2 bg-[#FAF8F4] animate-in slide-in-from-top-2 duration-300">
                  <div className="grid gap-4">
                    <input type="text" placeholder="Card Number (Demo: 4242 4242 4242 4242)" className="luxury-input-field w-full bg-white text-sm" />
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="MM/YY" className="luxury-input-field w-full bg-white text-sm" />
                      <input type="text" placeholder="CVV" className="luxury-input-field w-full bg-white text-sm" />
                    </div>
                    <input type="text" placeholder="Name on Card" className="luxury-input-field w-full bg-white text-sm" />
                  </div>
                </div>
              )}
            </div>

            {/* UPI Option */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${selectedPayment === "UPI" ? 'border-[#B8935A] ring-1 ring-[#B8935A]' : 'border-[#E8E0D5] hover:border-[#B8935A]/50'}`}>
              <label className={`flex cursor-pointer p-5 ${selectedPayment === "UPI" ? 'bg-[#FAF8F4]' : 'bg-white'}`}>
                <input type="radio" name="paymentMethod" value="UPI" checked={selectedPayment === "UPI"} onChange={() => setSelectedPayment("UPI")} className="sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedPayment === "UPI" ? 'bg-white border-[#B8935A]/30 text-[#B8935A]' : 'bg-[#F5F2ED] border-transparent text-[#9C9690]'}`}>
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1918] text-sm font-body">UPI</p>
                      <p className="text-xs text-[#9C9690] mt-0.5 font-body">Google Pay, PhonePe, Paytm, BHIM</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === "UPI" ? 'border-[#B8935A] bg-[#B8935A]' : 'border-[#E8E0D5]'}`}>
                     {selectedPayment === "UPI" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </label>
              {selectedPayment === "UPI" && (
                <div className="px-6 pb-6 pt-2 bg-[#FAF8F4] animate-in slide-in-from-top-2 duration-300">
                  <p className="text-xs text-[#5C5752] mb-3">Enter your UPI ID or VPA to receive a payment request on your app.</p>
                  <input type="text" placeholder="e.g. yourname@upi" className="luxury-input-field w-full bg-white text-sm mb-2" />
                  <p className="text-[10px] text-green-700 bg-green-100 p-2 rounded inline-block font-medium">Demo Note: Any input is accepted for this demo.</p>
                </div>
              )}
            </div>

            {/* Net Banking */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${selectedPayment === "NET_BANKING" ? 'border-[#B8935A] ring-1 ring-[#B8935A]' : 'border-[#E8E0D5] hover:border-[#B8935A]/50'}`}>
              <label className={`flex cursor-pointer p-5 ${selectedPayment === "NET_BANKING" ? 'bg-[#FAF8F4]' : 'bg-white'}`}>
                <input type="radio" name="paymentMethod" value="NET_BANKING" checked={selectedPayment === "NET_BANKING"} onChange={() => setSelectedPayment("NET_BANKING")} className="sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedPayment === "NET_BANKING" ? 'bg-white border-[#B8935A]/30 text-[#B8935A]' : 'bg-[#F5F2ED] border-transparent text-[#9C9690]'}`}>
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1918] text-sm font-body">Net Banking</p>
                      <p className="text-xs text-[#9C9690] mt-0.5 font-body">All major Indian banks supported</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === "NET_BANKING" ? 'border-[#B8935A] bg-[#B8935A]' : 'border-[#E8E0D5]'}`}>
                     {selectedPayment === "NET_BANKING" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </label>
              {selectedPayment === "NET_BANKING" && (
                <div className="px-6 pb-6 pt-2 bg-[#FAF8F4] animate-in slide-in-from-top-2 duration-300 flex flex-col gap-3">
                   <select className="luxury-input-field w-full bg-white text-sm cursor-pointer appearance-none">
                     <option>Select your bank...</option>
                     <option>HDFC Bank</option>
                     <option>ICICI Bank</option>
                     <option>State Bank of India</option>
                     <option>Axis Bank</option>
                     <option>Kotak Mahindra Bank</option>
                     <option>Yes Bank</option>
                     <option>Demo Bank (For Testing)</option>
                   </select>
                </div>
              )}
            </div>

            {/* Cash on Delivery */}
            <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${selectedPayment === "COD" ? 'border-[#B8935A] ring-1 ring-[#B8935A]' : 'border-[#E8E0D5] hover:border-[#B8935A]/50'}`}>
              <label className={`flex cursor-pointer p-5 ${selectedPayment === "COD" ? 'bg-[#FAF8F4]' : 'bg-white'}`}>
                <input type="radio" name="paymentMethod" value="COD" checked={selectedPayment === "COD"} onChange={() => setSelectedPayment("COD")} className="sr-only" />
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${selectedPayment === "COD" ? 'bg-white border-[#B8935A]/30 text-[#B8935A]' : 'bg-[#F5F2ED] border-transparent text-[#9C9690]'}`}>
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1A1918] text-sm font-body">Cash on Delivery (COD)</p>
                      <p className="text-xs text-[#9C9690] mt-0.5 font-body">Pay at your doorstep seamlessly</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedPayment === "COD" ? 'border-[#B8935A] bg-[#B8935A]' : 'border-[#E8E0D5]'}`}>
                     {selectedPayment === "COD" && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              </label>
              {selectedPayment === "COD" && (
                <div className="px-6 pb-6 pt-2 bg-[#FAF8F4] animate-in slide-in-from-top-2 duration-300">
                  <div className="bg-white border border-[#E8E0D5] p-4 rounded-xl flex gap-3 text-sm">
                    <Banknote className="w-5 h-5 text-[#B8935A] flex-shrink-0" />
                    <p className="text-[#5C5752]">You can pay securely in cash or via UPI to the delivery executive when your package arrives safely at your location.</p>
                  </div>
                </div>
              )}
            </div>
            
          </div>
        </section>
      </div>

      {/* Right Column: Order Summary (Sticky) */}
      <div className="lg:col-span-5 relative">
        <form onSubmit={handleCheckout} className="bg-white p-8 lg:p-10 rounded-3xl border border-[#E8E0D5] shadow-[0_10px_40px_rgba(0,0,0,0.04)] sticky top-32">
            <h3 className="font-display text-2xl text-[#1A1918] mb-6">Order Summary</h3>
            
            <div className="max-h-[30vh] overflow-y-auto pr-2 scrollbar-hide mb-6">
              <ul className="divide-y divide-[#E8E0D5]/50">
                {items.map(item => (
                  <li key={item.id} className="py-4 flex gap-4">
                    <div className="h-20 w-20 bg-[#F5F2ED] rounded-xl overflow-hidden flex-shrink-0 relative border border-[#E8E0D5]/50">
                       {/* eslint-disable-next-line @next/next/no-img-element */}
                       <img src={item.image || "https://picsum.photos/200"} alt="" className="object-contain w-full h-full p-2 mix-blend-multiply transition-transform hover:scale-110 duration-500" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-medium text-[13px] text-[#1A1918] line-clamp-2 font-body leading-snug">{item.name}</p>
                      <div className="flex flex-col mt-1.5 gap-1">
                        <p className="text-[11px] text-[#9C9690] font-body">Qty: {item.quantity}</p>
                        {item.variant && (
                          <p className="text-[10px] text-[#B8935A] font-body flex items-center gap-1.5 bg-[#FAF8F4] w-fit px-2 py-0.5 rounded border border-[#B8935A]/20">
                            {item.variant.color && <span>{item.variant.color}</span>}
                            {item.variant.size && <span className="uppercase">{item.variant.size}</span>}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-[#1A1918] font-body flex items-start pt-1">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promo Code Input (Moved to Summary area for a tighter layout) */}
            <div className="mb-8 pt-4 border-t border-[#E8E0D5]/50">
              {appliedCoupon ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-1.5 rounded-full shadow-sm"><Gift className="w-4 h-4 text-green-600" /></div>
                    <div>
                      <p className="text-xs font-bold text-green-800 font-body tracking-wider">{appliedCoupon.code}</p>
                      <p className="text-[11px] text-green-600 font-body font-medium mt-0.5">₹{appliedCoupon.discount.toLocaleString()} savings applied!</p>
                    </div>
                  </div>
                  <button onClick={handleRemoveCoupon} className="p-1.5 hover:bg-green-200 rounded-full transition-colors group">
                    <X className="w-4 h-4 text-green-600 group-hover:text-green-800" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Gift card or discount code"
                    className="flex-1 rounded-xl border border-[#E8E0D5] bg-[#FAF8F4]/50 px-4 py-3 text-sm font-body font-medium tracking-wide focus:ring-1 focus:ring-[#B8935A] focus:border-[#B8935A] outline-none placeholder:font-normal placeholder:text-[#9C9690]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    className="bg-black text-white px-5 py-3 rounded-xl text-xs font-body tracking-[0.1em] uppercase hover:bg-[#B8935A] transition-colors disabled:opacity-30 disabled:hover:bg-black font-medium"
                  >
                    {couponLoading ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            <dl className="space-y-3 font-body text-[13px] mb-8 bg-[#FAF8F4]/50 p-6 rounded-2xl border border-[#E8E0D5]/30">
                <div className="flex justify-between text-[#5C5752]">
                  <dt>Item Subtotal</dt>
                  <dd className="font-medium text-[#1A1918]">₹{subtotal.toLocaleString()}</dd>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <dt className="flex items-center gap-1.5"><Tag size={14}/> Discount</dt>
                    <dd>-₹{discount.toLocaleString()}</dd>
                  </div>
                )}
                <div className="flex justify-between text-[#5C5752]">
                  <dt className="flex items-center gap-1.5">Shipping</dt>
                  <dd className="font-medium text-[#1A1918]">{shipping === 0 ? <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-0.5 rounded textxs font-bold uppercase tracking-wider">Free</span> : `₹${shipping.toLocaleString()}`}</dd>
                </div>
                <div className="flex justify-between text-[#9C9690] text-xs pt-1">
                  <dt>Taxes (Includes {taxRate}% GST)</dt>
                  <dd>₹{taxAmount.toLocaleString()}</dd>
                </div>
                
                <div className="pt-4 mt-2 border-t border-[#E8E0D5] flex justify-between items-end">
                  <dt className="text-base text-[#1A1918] font-medium">Total</dt>
                  <dd className="flex items-baseline gap-1">
                    <span className="text-[#9C9690] text-xs font-medium mr-1 border border-[#E8E0D5] px-1.5 py-0.5 rounded">INR</span>
                    <span className="text-2xl font-display text-[#1A1918]">₹{total.toLocaleString()}</span>
                  </dd>
                </div>
            </dl>

            <button
              type="submit"
              disabled={isPending || addresses.length === 0}
              className="group relative w-full overflow-hidden bg-[#1A1918] text-white py-5 px-6 rounded-2xl font-body text-sm tracking-[0.2em] uppercase transition-all disabled:opacity-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#B8935A] to-[#D4AA72] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />
              <span className="relative flex items-center justify-center gap-3">
                {isPending ? <>Processing <Loader2 size={16} className="animate-spin" /></> : <>{selectedPayment === 'COD' ? 'Confirm Cash Delivery' : 'Complete Payment'} <Lock size={14}/></>}
              </span>
            </button>
            <p className="text-center text-[10px] text-[#9C9690] mt-5 uppercase tracking-widest font-body flex items-center justify-center gap-1.5 bg-[#FAF8F4] py-2 rounded-lg border border-[#E8E0D5]/50">
              <ShieldCheck size={12} className="text-[#B8935A]" /> Backed by 256-Bit SSL Security
            </p>
        </form>
      </div>

    </div>
  )
}
