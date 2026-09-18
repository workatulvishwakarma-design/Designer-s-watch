"use client"

import { useState, useTransition } from "react"
import { upsertStore } from "@/actions/admin.store.actions"
import { toast } from "sonner"
import { X, Loader2, MapPin, Building, Phone, Mail, User, Compass, ExternalLink } from "lucide-react"

interface StoreFormProps {
  store?: any
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

const POPULAR_BRANDS = [
  "D'Signer Watches",
  "Escort Watches"
]

const STORE_CATEGORIES = [
  "Authorized Retailer",
  "D'Signer Exclusive",
  "Dual Brand Boutique",
  "Escort Specialist",
  "Flagship Boutique",
  "Multi-Brand Showroom"
]

export function StoreForm({ store, isOpen, onClose, onSuccess }: StoreFormProps) {
  const [isPending, startTransition] = useTransition()
  
  // State for form
  const [name, setName] = useState(store?.name || "")
  const [contactPerson, setContactPerson] = useState(store?.contactPerson || "")
  const [phone, setPhone] = useState(store?.phone || "")
  const [email, setEmail] = useState(store?.email || "")
  const [brands, setBrands] = useState<string[]>(
    Array.isArray(store?.brands) && store.brands.length > 0 
      ? store.brands 
      : ["D'Signer Watches", "Escort Watches"]
  )
  const [category, setCategory] = useState(store?.category || "Authorized Retailer")
  const [address, setAddress] = useState(store?.address || "")
  const [area, setArea] = useState(store?.area || "")
  const [city, setCity] = useState(store?.city || "")
  const [state, setState] = useState(store?.state || "")
  const [location, setLocation] = useState(store?.location || "")
  const [latitude, setLatitude] = useState(store?.latitude !== undefined && store?.latitude !== null ? String(store.latitude) : "")
  const [longitude, setLongitude] = useState(store?.longitude !== undefined && store?.longitude !== null ? String(store.longitude) : "")
  const [googleMapsQuery, setGoogleMapsQuery] = useState(store?.googleMapsQuery || "")
  const [isActive, setIsActive] = useState(store ? Boolean(store.isActive) : true)
  const [sortOrder, setSortOrder] = useState(store?.sortOrder !== undefined ? String(store.sortOrder) : "0")

  if (!isOpen) return null

  const handleBrandToggle = (brand: string) => {
    if (brands.includes(brand)) {
      setBrands(brands.filter(b => b !== brand))
    } else {
      setBrands([...brands, brand])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      toast.error("Store name is required")
      return
    }
    if (!address.trim()) {
      toast.error("Address is required")
      return
    }
    if (!city.trim()) {
      toast.error("City is required")
      return
    }
    if (!state.trim()) {
      toast.error("State is required")
      return
    }

    const formData = new FormData()
    if (store?.id) {
      formData.append("id", store.id)
    }
    formData.append("name", name.trim())
    formData.append("contactPerson", contactPerson.trim())
    formData.append("phone", phone.trim())
    formData.append("email", email.trim())
    formData.append("brands", JSON.stringify(brands))
    formData.append("category", category)
    formData.append("address", address.trim())
    formData.append("area", area.trim())
    formData.append("city", city.trim().toUpperCase())
    formData.append("state", state.trim().toUpperCase())
    formData.append("location", location.trim())
    formData.append("latitude", latitude.trim())
    formData.append("longitude", longitude.trim())
    formData.append("googleMapsQuery", googleMapsQuery.trim())
    formData.append("isActive", isActive ? "true" : "false")
    formData.append("sortOrder", sortOrder)

    startTransition(async () => {
      const res = await upsertStore(formData)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success(res.success || "Store saved successfully!")
        if (onSuccess) onSuccess()
        onClose()
      }
    })
  }

  const autoGenerateMapsLink = () => {
    if (!name && !address) {
      toast.info("Please enter store name and address first")
      return
    }
    const q = encodeURIComponent(`${name} ${address} ${city} ${state}`.trim())
    setGoogleMapsQuery(`https://www.google.com/maps/search/?api=1&query=${q}`)
    toast.success("Google Maps link generated!")
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in-0 zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {store ? "Edit Store Details" : "Add New Store"}
              </h2>
              <p className="text-xs text-gray-500">
                Configure store information, location, and brand availability
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-sm">
          
          {/* Basic Info */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Store Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Store / Dealer Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. A. J. TIME or LUXURY WATCH BOUTIQUE"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category / Store Type</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                >
                  {STORE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Custom">Custom / Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Regional Branch / Office</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  placeholder="e.g. DELHI OFFICE or MUMBAI HUB"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-2">Available Brands</label>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_BRANDS.map(brand => {
                    const isSelected = brands.includes(brand)
                    return (
                      <button
                        type="button"
                        key={brand}
                        onClick={() => handleBrandToggle(brand)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          isSelected 
                            ? "bg-black text-white border-black" 
                            : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "} {brand}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person</label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={e => setContactPerson(e.target.value)}
                    placeholder="e.g. Abhi Singh"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 9812345678"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="e.g. contact@store.com"
                    className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Address */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Address & Coordinates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Full Street Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="e.g. Shop No. 1, Opp. Ritz Hotel, Mall Road"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Area / Locality</label>
                <input
                  type="text"
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="e.g. Mall Road, Connaught Place"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="e.g. NEW DELHI, MUMBAI, AMRITSAR"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={e => setState(e.target.value)}
                  placeholder="e.g. DELHI, MAHARASHTRA, PUNJAB"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white uppercase"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={latitude}
                    onChange={e => setLatitude(e.target.value)}
                    placeholder="e.g. 28.6139"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={longitude}
                    onChange={e => setLongitude(e.target.value)}
                    placeholder="e.g. 77.2090"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-700">Google Maps Query / URL</label>
                  <button
                    type="button"
                    onClick={autoGenerateMapsLink}
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                  >
                    <Compass className="w-3.5 h-3.5" /> Auto-generate from address
                  </button>
                </div>
                <input
                  type="text"
                  value={googleMapsQuery}
                  onChange={e => setGoogleMapsQuery(e.target.value)}
                  placeholder="https://www.google.com/maps/search/?api=1&query=..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* Status & Ordering */}
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={e => setIsActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <div>
                <p className="text-xs font-semibold text-gray-900">
                  {isActive ? "Active (Visible on Website)" : "Inactive (Hidden)"}
                </p>
                <p className="text-[11px] text-gray-500">
                  Toggle whether this store appears in the Home Page store locator
                </p>
              </div>
            </div>

            <div className="w-24">
              <label className="block text-xs font-medium text-gray-700 mb-1">Sort Order</label>
              <input
                type="number"
                value={sortOrder}
                onChange={e => setSortOrder(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-black focus:border-black outline-hidden text-sm bg-white text-center"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2 text-xs font-semibold text-white bg-black hover:bg-gray-800 rounded-lg shadow-sm transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {store ? "Save Changes" : "Create Store"}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
