"use client"

import { useState, useMemo, useTransition } from "react"
import { StoreForm } from "@/components/admin/StoreForm"
import { deleteStore, toggleStoreStatus } from "@/actions/admin.store.actions"
import { toast } from "sonner"
import { 
  Search, Plus, MapPin, Phone, Mail, User, ExternalLink, 
  Edit, Trash2, Eye, CheckCircle2, XCircle, Filter, 
  ChevronLeft, ChevronRight, Store as StoreIcon, AlertTriangle, Loader2
} from "lucide-react"

interface StoresClientProps {
  initialStores: any[]
}

export function StoresClient({ initialStores }: StoresClientProps) {
  const [stores, setStores] = useState<any[]>(initialStores)
  const [search, setSearch] = useState("")
  const [cityFilter, setCityFilter] = useState("ALL")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 20

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingStore, setEditingStore] = useState<any | null>(null)
  const [viewingStore, setViewingStore] = useState<any | null>(null)
  const [deletingStore, setDeletingStore] = useState<any | null>(null)
  const [isPending, startTransition] = useTransition()

  // Unique cities & categories for filters
  const uniqueCities = useMemo(() => {
    const set = new Set<string>()
    stores.forEach(s => {
      if (s.city) set.add(s.city.trim().toUpperCase())
    })
    return Array.from(set).sort()
  }, [stores])

  const uniqueCategories = useMemo(() => {
    const set = new Set<string>()
    stores.forEach(s => {
      if (s.category) set.add(s.category.trim())
    })
    return Array.from(set).sort()
  }, [stores])

  // Filtered stores
  const filteredStores = useMemo(() => {
    return stores.filter(s => {
      // Search
      if (search.trim()) {
        const query = search.toLowerCase()
        const matchName = s.name?.toLowerCase().includes(query)
        const matchCity = s.city?.toLowerCase().includes(query)
        const matchState = s.state?.toLowerCase().includes(query)
        const matchAddress = s.address?.toLowerCase().includes(query)
        const matchContact = s.contactPerson?.toLowerCase().includes(query)
        const matchPhone = s.phone?.toLowerCase().includes(query)
        if (!matchName && !matchCity && !matchState && !matchAddress && !matchContact && !matchPhone) {
          return false
        }
      }

      // City filter
      if (cityFilter !== "ALL" && s.city?.trim().toUpperCase() !== cityFilter) {
        return false
      }

      // Category filter
      if (categoryFilter !== "ALL" && s.category?.trim() !== categoryFilter) {
        return false
      }

      // Status filter
      if (statusFilter === "ACTIVE" && !s.isActive) return false
      if (statusFilter === "INACTIVE" && s.isActive) return false

      return true
    })
  }, [stores, search, cityFilter, categoryFilter, statusFilter])

  // Paginated stores
  const totalPages = Math.ceil(filteredStores.length / pageSize) || 1
  const paginatedStores = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredStores.slice(start, start + pageSize)
  }, [filteredStores, currentPage, pageSize])

  // Reset page when filter changes
  const handleFilterChange = (setter: any, val: any) => {
    setter(val)
    setCurrentPage(1)
  }

  // Handle Toggle Status
  const handleToggle = (store: any) => {
    const nextStatus = !store.isActive
    // Optimistic update
    setStores(prev => prev.map(s => s.id === store.id ? { ...s, isActive: nextStatus } : s))

    startTransition(async () => {
      const res = await toggleStoreStatus(store.id, nextStatus)
      if (res.error) {
        toast.error(res.error)
        // Rollback
        setStores(prev => prev.map(s => s.id === store.id ? { ...s, isActive: store.isActive } : s))
      } else {
        toast.success(res.success || `Store ${nextStatus ? 'activated' : 'deactivated'}`)
      }
    })
  }

  // Handle Delete
  const handleDeleteConfirm = () => {
    if (!deletingStore) return
    const storeId = deletingStore.id

    startTransition(async () => {
      const res = await deleteStore(storeId)
      if (res.error) {
        toast.error(res.error)
      } else {
        toast.success("Store deleted successfully")
        setStores(prev => prev.filter(s => s.id !== storeId))
        setDeletingStore(null)
      }
    })
  }

  return (
    <div className="space-y-6">
      
      {/* Action Header & Filters Card */}
      <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => handleFilterChange(setSearch, e.target.value)}
              placeholder="Search stores by name, city, state, contact, phone, address..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:bg-white focus:ring-2 focus:ring-black focus:border-black outline-hidden transition-all"
            />
          </div>

          <button
            onClick={() => {
              setEditingStore(null)
              setIsFormOpen(true)
            }}
            className="flex items-center justify-center gap-2 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-black hover:bg-gray-800 rounded-xl shadow-xs transition-all flex-shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add New Store
          </button>
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gray-100 text-xs">
          <div className="flex items-center gap-2 text-gray-500 font-medium">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* City Filter */}
          <select
            value={cityFilter}
            onChange={e => handleFilterChange(setCityFilter, e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium outline-hidden hover:bg-gray-100 transition-colors"
          >
            <option value="ALL">All Cities ({uniqueCities.length})</option>
            {uniqueCities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={e => handleFilterChange(setCategoryFilter, e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium outline-hidden hover:bg-gray-100 transition-colors"
          >
            <option value="ALL">All Categories ({uniqueCategories.length})</option>
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => handleFilterChange(setStatusFilter, e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 font-medium outline-hidden hover:bg-gray-100 transition-colors"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="INACTIVE">Inactive Only</option>
          </select>

          {(search || cityFilter !== "ALL" || categoryFilter !== "ALL" || statusFilter !== "ALL") && (
            <button
              onClick={() => {
                setSearch("")
                setCityFilter("ALL")
                setCategoryFilter("ALL")
                setStatusFilter("ALL")
                setCurrentPage(1)
              }}
              className="ml-auto text-xs text-gray-500 hover:text-black font-semibold underline underline-offset-2"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Stores Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StoreIcon className="w-5 h-5 text-gray-700" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Stores & Dealers ({filteredStores.length})
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {paginatedStores.length === 0 ? (
          <div className="py-16 text-center px-4">
            <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-700">No stores found</p>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              No store records matched your active search or filters. Try clearing your filters or create a new store.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-16 text-center">Status</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Store Name & Category</th>
                  <th className="py-3.5 px-4 min-w-[150px]">Location</th>
                  <th className="py-3.5 px-4 min-w-[200px]">Address & Contact</th>
                  <th className="py-3.5 px-4 min-w-[140px]">Brands</th>
                  <th className="py-3.5 px-4 w-20 text-center">Order</th>
                  <th className="py-3.5 px-4 w-32 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedStores.map(store => {
                  return (
                    <tr 
                      key={store.id} 
                      className={`hover:bg-gray-50/70 transition-colors ${!store.isActive ? 'bg-gray-50/30 opacity-75' : ''}`}
                    >
                      {/* Active Toggle */}
                      <td className="py-3 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggle(store)}
                          title={store.isActive ? "Click to Deactivate" : "Click to Activate"}
                          className="relative inline-flex items-center cursor-pointer"
                        >
                          <span className={`inline-block w-8 h-4.5 rounded-full transition-colors ${store.isActive ? 'bg-green-600' : 'bg-gray-300'}`}>
                            <span className={`inline-block w-3.5 h-3.5 transform bg-white rounded-full transition-transform mt-0.5 ml-0.5 ${store.isActive ? 'translate-x-3.5' : 'translate-x-0'}`} />
                          </span>
                        </button>
                      </td>

                      {/* Store Name & Category */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900 text-sm">{store.name}</div>
                        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                          <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-medium">
                            {store.category || "Authorized Retailer"}
                          </span>
                          {store.location && (
                            <span className="text-[10px] text-gray-400">
                              • {store.location}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800">{store.city}</div>
                        <div className="text-[11px] text-gray-500">{store.state}</div>
                        {store.area && <div className="text-[10px] text-gray-400 truncate">{store.area}</div>}
                      </td>

                      {/* Address & Contact */}
                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-gray-600 truncate text-[11px]" title={store.address}>
                          {store.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-500">
                          {store.contactPerson && (
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="truncate max-w-[90px]">{store.contactPerson}</span>
                            </span>
                          )}
                          {store.phone && (
                            <a href={`tel:${store.phone}`} className="flex items-center gap-1 hover:text-black font-medium">
                              <Phone className="w-3 h-3 text-gray-400" />
                              {store.phone}
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Brands */}
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {Array.isArray(store.brands) && store.brands.length > 0 ? (
                            store.brands.map((b: string) => (
                              <span 
                                key={b} 
                                className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                                  b.toLowerCase().includes("designer") 
                                    ? "bg-amber-50 text-amber-900 border-amber-200" 
                                    : "bg-blue-50 text-blue-900 border-blue-200"
                                }`}
                              >
                                {b}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-[10px]">Dual Brand</span>
                          )}
                        </div>
                      </td>

                      {/* Sort Order */}
                      <td className="py-3 px-4 text-center font-mono text-gray-500 text-[11px]">
                        {store.sortOrder}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Detail */}
                          <button
                            type="button"
                            onClick={() => setViewingStore(store)}
                            title="View Store Details"
                            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Edit */}
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStore(store)
                              setIsFormOpen(true)
                            }}
                            title="Edit Store"
                            className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => setDeletingStore(store)}
                            title="Delete Store"
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {filteredStores.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
            <div>
              Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * pageSize + 1}</span> to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(currentPage * pageSize, filteredStores.length)}
              </span>{" "}
              of <span className="font-semibold text-gray-900">{filteredStores.length}</span> stores
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="p-1.5 border border-gray-200 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1 font-semibold text-gray-900">
                {currentPage} / {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="p-1.5 border border-gray-200 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Store Modal */}
      {isFormOpen && (
        <StoreForm
          isOpen={isFormOpen}
          store={editingStore}
          onClose={() => {
            setIsFormOpen(false)
            setEditingStore(null)
          }}
          onSuccess={() => {
            window.location.reload()
          }}
        />
      )}

      {/* View Store Details Modal */}
      {viewingStore && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{viewingStore.name}</h3>
                  <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${viewingStore.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {viewingStore.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setViewingStore(null)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-gray-100">
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Category</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{viewingStore.category || "Authorized Retailer"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Region / Office</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{viewingStore.location || "Main"}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1">Full Address</p>
                <p className="text-gray-800 font-medium leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                  {viewingStore.address}
                </p>
                <div className="flex gap-4 mt-2 text-gray-600">
                  <span><strong>City:</strong> {viewingStore.city}</span>
                  <span><strong>State:</strong> {viewingStore.state}</span>
                  {viewingStore.area && <span><strong>Area:</strong> {viewingStore.area}</span>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Contact Person</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{viewingStore.contactPerson || "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Phone</p>
                  {viewingStore.phone ? (
                    <a href={`tel:${viewingStore.phone}`} className="text-blue-600 font-semibold hover:underline block mt-0.5">
                      {viewingStore.phone}
                    </a>
                  ) : <p className="text-gray-400 mt-0.5">—</p>}
                </div>
              </div>

              {viewingStore.email && (
                <div>
                  <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Email</p>
                  <a href={`mailto:${viewingStore.email}`} className="text-blue-600 font-medium hover:underline block mt-0.5">
                    {viewingStore.email}
                  </a>
                </div>
              )}

              <div className="pt-2 border-t border-gray-100">
                <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px] mb-1.5">Brands Offered</p>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(viewingStore.brands) && viewingStore.brands.map((b: string) => (
                    <span key={b} className="px-2 py-0.5 bg-black text-white rounded text-[10px] font-medium">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {viewingStore.googleMapsQuery && (
                <div className="pt-2 border-t border-gray-100">
                  <a 
                    href={viewingStore.googleMapsQuery} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end">
              <button
                type="button"
                onClick={() => setViewingStore(null)}
                className="px-4 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingStore && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-gray-100 p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-gray-900 text-base">Delete Store?</h3>
              <p className="text-xs text-gray-500 mt-1">
                Are you sure you want to permanently delete <strong>{deletingStore.name}</strong> ({deletingStore.city})? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingStore(null)}
                disabled={isPending}
                className="px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-all flex items-center gap-1.5 shadow-sm"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Delete Store
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
