"use client"

import { useState, useMemo } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend } from "recharts"

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
      { name: "COD", value: cod }
    ];
  }, [orders, timeRange]);

  const PIE_COLORS = ['#003926', '#B8935A'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Revenue Chart */}
      <div className="lg:col-span-2 bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 flex flex-col h-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-zinc-800">
          <div>
            <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Revenue Trends</h3>
            <p className="text-sm text-gray-500">Gross revenue over time</p>
          </div>
          <div className="mt-4 sm:mt-0 flex bg-gray-50 dark:bg-zinc-800 p-1 rounded-lg">
            {[7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setTimeRange(days as any)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  timeRange === days 
                    ? "bg-white text-black shadow dark:bg-zinc-700 dark:text-white" 
                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
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
                  <stop offset="5%" stopColor="#B8935A" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#B8935A" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5DDD0" opacity={0.5} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9C9690' }}
                dy={10}
                minTickGap={20}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#9C9690' }}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #E8E0D5', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                itemStyle={{ color: '#1A1918', fontWeight: 600 }}
                formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#003926" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payment Split Pie */}
      <div className="bg-white dark:bg-zinc-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6 flex flex-col h-full">
        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white mb-2">Revenue by Method</h3>
        <p className="text-sm text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-4 mb-4">Last {timeRange} Days</p>
        
        <div className="flex-1 min-h-[250px] w-full flex items-center justify-center">
          {paymentSplitData[0].value === 0 && paymentSplitData[1].value === 0 ? (
            <p className="text-sm text-gray-500 italic">No revenue data</p>
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
                  contentStyle={{ borderRadius: '8px', border: '1px solid #E8E0D5' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}
