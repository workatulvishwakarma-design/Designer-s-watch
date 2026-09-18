import { prisma } from "@/lib/db"
import { StoresClient } from "./StoresClient"
import { MapPin, Store, CheckCircle, EyeOff } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminStoresPage() {
  let stores: any[] = []
  try {
    stores = await prisma.store.findMany({
      orderBy: [
        { sortOrder: "asc" },
        { name: "asc" }
      ]
    })
  } catch (err) {
    console.error("Failed to load stores:", err)
    stores = []
  }

  const totalStores = stores.length
  const activeStores = stores.filter(s => s.isActive).length
  const inactiveStores = totalStores - activeStores
  const uniqueCitiesCount = new Set(stores.map(s => s.city?.trim().toUpperCase()).filter(Boolean)).size

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Store Locator & Dealers</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your network of brand boutiques, authorized dealers, and service points across India.
          </p>
        </div>
      </div>

      {/* Stat Cards - Clean Light Theme */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 text-gray-900 flex items-center justify-center shrink-0">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Stores</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{totalStores}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">Active Stores</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{activeStores}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <EyeOff className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Inactive Stores</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{inactiveStores}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Cities Covered</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{uniqueCitiesCount}</p>
          </div>
        </div>
      </div>

      {/* Stores Management Client Component */}
      <StoresClient initialStores={stores} />
      
    </div>
  )
}
