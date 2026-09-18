"use client"

import { useState, useMemo } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts"

interface OrderData {
  createdAt: Date
  totalAmount: number
  isCOD?: boolean
}

interface DashboardChartsProps {
  orders: OrderData[]
}

export function DashboardCharts({ orders }: DashboardChartsProps) {
  const [timeRange, setTimeRange] = useState<30 | 7 | 90 | 365>(30)

  const chartData = useMemo(() => {
    const today = new Date()
    const dataMap = new Map<string, number>()
    
    // Initialize map with empty dates for the selected range to ensure no gaps
    for (let i = timeRange - 1; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = d.toLocaleDateString('default', { month: 'short', day: 'numeric' })
      dataMap.set(key, 0)
    }

    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - timeRange)

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt)
      if (orderDate >= cutoffDate) {
        const key = orderDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })
        if (dataMap.has(key)) {
          dataMap.set(key, dataMap.get(key)! + Number(order.totalAmount))
        }
      }
    })

    return Array.from(dataMap.entries()).map(([date, revenue]) => ({
      date,
      revenue
    }))
  }, [orders, timeRange])

  const paymentSplitData = useMemo(() => {
    let cod = 0;
    let prepaid = 0;
    
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - timeRange);

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      if (orderDate >= cutoffDate) {
        if (order.isCOD) cod += Number(order.totalAmount);
        else prepaid += Number(order.totalAmount);
      }
    });

    return [
      { name: "Prepaid", value: prepaid },
      { name: "Cash on Delivery", value: cod }
    ];
  }, [orders, timeRange]);

  const PIE_COLORS = ['#003926', '#B8935A'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Revenue Chart */}
      <div className="lg:col-span-2 bg-white shadow-xs border border-slate-200/80 rounded-2xl p-6 flex flex-col h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-100 gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Revenue Analytics</h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">Daily gross revenue over time</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setTimeRange(days as any)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  timeRange === days 
                    ? "bg-white text-slate-900 shadow-2xs" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {days}D
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#003926" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#003926" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                dy={10}
                minTickGap={20}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#64748B' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', backgroundColor: '#FFFFFF' }}
                itemStyle={{ color: '#0F172A', fontWeight: 700 }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#003926" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Split Pie */}
      <div className="bg-white shadow-xs border border-slate-200/80 rounded-2xl p-6 flex flex-col h-full">
        <h3 className="text-sm font-bold text-slate-900">Revenue by Payment Method</h3>
        <p className="text-xs text-slate-500 font-medium border-b border-slate-100 pb-4 mb-4 mt-0.5">Last {timeRange} Days</p>
        
        <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
          {paymentSplitData[0].value === 0 && paymentSplitData[1].value === 0 ? (
            <p className="text-xs text-slate-400 italic">No revenue data for this period</p>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentSplitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {paymentSplitData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', backgroundColor: '#FFFFFF' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: '#334155' }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
