"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/store/cart"
import Link from "next/link"
import { Trash2, ShoppingBag, Plus, Minus, ArrowRight, ArrowLeft } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()

  // Hydration safety
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null // Prevent hydration mismatch Flash

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 bg-[#FAF8F4]">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-[#E8E0D5] text-center max-w-md w-full">
           <ShoppingBag className="mx-auto h-16 w-16 text-[#B8935A] mb-6 opacity-80" strokeWidth={1} />
           <h2 className="text-2xl font-display text-[#1A1918] mb-3">Your cart is empty</h2>
           <p className="text-sm text-[#9C9690] mb-8 font-body">Looks like you haven't made your choice yet.</p>
           <Link 
             href="/collections/dsigner"
             className="inline-flex items-center justify-center w-full bg-[#1A1918] text-white py-4 rounded-full font-body text-xs tracking-widest uppercase hover:bg-[#B8935A] transition-colors"
           >
             Continue Shopping
           </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-32 pb-24">
       <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex items-end justify-between mb-12">
             <div>
                <h1 className="text-4xl md:text-5xl font-display text-[#1A1918]">Your Cart</h1>
                <div className="w-12 h-0.5 bg-[#B8935A] mt-6" />
             </div>
             <span className="font-body text-sm text-[#9C9690] uppercase tracking-wider hidden md:block">
               {items.length} {items.length === 1 ? 'Item' : 'Items'}
             </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-6">
                 {items.map((item) => (
                   <div key={item.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-[#E8E0D5] shadow-sm group hover:border-[#B8935A]/30 transition-all duration-300">
                      <div className="w-28 h-28 shrink-0 bg-[#F5F2ED] rounded-xl flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={item.image || "https://picsum.photos/200"} 
                          alt={item.name} 
                          className="object-contain p-2 w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between pt-2">
                         <div className="flex justify-between items-start gap-4">
                            <div>
                               <Link href={`/product/${item.slug}`} className="font-display text-lg text-[#1A1918] hover:text-[#B8935A] transition-colors line-clamp-2 leading-tight mb-2">
                                 {item.name}
                               </Link>
                               <div className="flex flex-wrap gap-2 items-center">
                                  <span className="font-body text-[10px] uppercase tracking-widest text-[#9C9690] bg-[#FAF8F4] px-2 py-1 rounded">
                                    Ref: {item.productId.slice(0,6).toUpperCase()}
                                  </span>
                                  {item.variant && (
                                    <>
                                      {item.variant.color && (
                                        <span className="font-body text-[10px] uppercase tracking-widest text-[#B8935A] bg-[#B8935A]/10 px-2 py-1 rounded">
                                          {item.variant.color}
                                        </span>
                                      )}
                                      {item.variant.size && (
                                        <span className="font-body text-[10px] uppercase tracking-widest text-[#1A1918] bg-[#EDE8DF] px-2 py-1 rounded">
                                          {item.variant.size}
                                        </span>
                                      )}
                                    </>
                                  )}
                               </div>
                            </div>
                            <p className="font-display text-xl text-[#B8935A]">
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </p>
                         </div>
 
                         <div className="flex items-center justify-between mt-6">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-[#E8E0D5] rounded-full overflow-hidden bg-[#FAF8F4]">
                               <button 
                                 onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                 className="px-4 py-2 hover:bg-[#E8E0D5] text-[#1A1918] transition-colors"
                               >
                                 <Minus size={14} />
                               </button>
                               <span className="w-10 text-center font-dm text-sm font-medium">{item.quantity}</span>
                               <button 
                                 onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                 className="px-4 py-2 hover:bg-[#E8E0D5] text-[#1A1918] transition-colors"
                               >
                                 <Plus size={14} />
                               </button>
                            </div>
 
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-[10px] font-body tracking-[0.2em] uppercase flex items-center gap-2 text-[#9C9690] hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={14} /> Remove Item
                            </button>
                         </div>
                      </div>
                   </div>
                 ))}

                 <Link 
                   href="/collections/dsigner"
                   className="inline-flex items-center gap-2 text-xs font-body tracking-widest uppercase text-[#B8935A] hover:gap-4 transition-all duration-300 group mt-4 px-2"
                 >
                   <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                   Continue Shopping
                 </Link>
              </div>
 
              {/* Order Summary Form */}
              <div className="lg:col-span-4">
                 <div className="bg-white p-8 rounded-2xl border border-[#E8E0D5] shadow-[0_20px_50px_rgba(0,0,0,0.04)] sticky top-32">
                    <h3 className="font-display text-2xl text-[#1A1918] mb-8 relative pb-4">
                      Order Summary
                      <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-[#B8935A]" />
                    </h3>
                    
                    <div className="space-y-5 font-body text-sm mb-10">
                       <div className="flex justify-between text-[#5C5752]">
                          <span className="tracking-wide">Subtotal</span>
                          <span className="text-[#1A1918] font-medium">₹{getSubtotal().toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between text-[#5C5752] items-center">
                          <span className="tracking-wide">Shipping</span>
                          <span className="text-[11px] text-[#B8935A] bg-[#B8935A]/10 px-2 py-0.5 rounded-full">Complimentary</span>
                       </div>
                       <div className="flex justify-between text-[#5C5752]">
                          <span className="tracking-wide">Taxes (GST)</span>
                          <span className="text-[#9C9690]">Included</span>
                       </div>
                       <div className="pt-6 border-t border-[#E8E0D5] flex justify-between items-end">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C9690] mb-1">Total Amount</p>
                            <p className="font-display text-3xl text-[#1A1918]">₹{getSubtotal().toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
 
                    <div className="space-y-4">
                      <Link
                        href="/checkout"
                        className="group relative flex items-center justify-center bg-[#1A1918] text-white w-full py-5 px-8 rounded-full font-body text-xs tracking-[0.2em] uppercase hover:bg-[#B8935A] transition-all duration-500 overflow-hidden shadow-lg shadow-black/5"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          Proceed to Checkout
                          <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                        </span>
                      </Link>
                      
                      <div className="flex items-center justify-center gap-4 pt-4 opacity-50">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                      </div>
                    </div>
                 </div>
              </div>

          </div>
       </div>
    </div>
  )
}
