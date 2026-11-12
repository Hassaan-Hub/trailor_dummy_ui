import { useNavigate } from 'react-router-dom'
import {
  ClipboardList,
  Truck,
  Users,
  IndianRupee,
  Plus,
  UserPlus,
  Ruler,
  ChevronRight,
  Bell,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { SkeletonStatCard, SkeletonCard } from '@/components/ui/Skeleton'
import { orders, customers, shopSettings, messages } from '@/data/mockData'
import { formatCurrency, formatShortDate, cn } from '@/lib/utils'
import { useTheme } from '@/context/ThemeContext'
import { useState, useEffect } from 'react'

export function Dashboard() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const pendingOrders = orders.filter((o) => o.status === 'Pending' || o.status === 'In Progress').length
  const todayDeliveries = orders.filter((o) => {
    const today = new Date('2026-11-12').toDateString()
    return new Date(o.deliveryDate).toDateString() === today && o.status !== 'Delivered' && o.status !== 'Cancelled'
  }).length
  const totalCustomers = customers.length
  const monthlyRevenue = orders
    .filter((o) => o.status === 'Delivered')
    .reduce((sum, o) => sum + o.amount, 0)

  const recentOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5)
  const unreadCount = messages.filter((m) => !m.read).length

  const stats = [
    { label: 'Pending', value: pendingOrders, icon: ClipboardList, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-500/15' },
    { label: 'Today', value: todayDeliveries, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/15' },
    { label: 'Customers', value: totalCustomers, icon: Users, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/15' },
    { label: 'Revenue', value: formatCurrency(monthlyRevenue), icon: IndianRupee, color: 'text-gold-500', bg: 'bg-gold-100 dark:bg-gold-500/15' },
  ]

  const quickActions = [
    { label: 'New Order', icon: Plus, path: '/create-order', color: 'bg-navy-900 dark:bg-navy-700' },
    { label: 'Add Customer', icon: UserPlus, path: '/customers', color: 'bg-gold-500' },
    { label: 'Measurements', icon: Ruler, path: '/measurements', color: 'bg-purple-500' },
    { label: 'Catalog', icon: ChevronRight, path: '/catalog', color: 'bg-blue-500' },
  ]

  if (loading) {
    return (
      <div className="px-4 pt-6 space-y-4">
        <div className="h-24 rounded-2xl bg-navy-900 dark:bg-navy-800 shimmer" />
        <div className="grid grid-cols-2 gap-3">
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
          <SkeletonStatCard />
        </div>
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 pt-6 space-y-5 safe-top-px">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Good evening,</p>
          <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">{shopSettings.ownerName}</h1>
        </div>
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-10 h-10 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform"
        >
          <Bell size={20} className="text-navy-600 dark:text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Shop banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 dark:from-navy-800 dark:to-navy-600 p-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl -mr-10 -mt-10" />
        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-wide">{shopSettings.name}</p>
            <h2 className="text-white text-lg font-bold mt-0.5">Tailor Management</h2>
            <p className="text-gray-400 text-xs mt-1">{orders.length} orders • {customers.length} customers</p>
          </div>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white text-sm active:scale-90 transition-transform"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-navy-900 dark:text-gray-100 mt-1">{stat.value}</p>
              </div>
              <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', stat.bg)}>
                <stat.icon size={18} className={stat.color} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-bold text-navy-900 dark:text-gray-100 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1.5"
            >
              <div className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm active:scale-90 transition-transform',
                action.color,
              )}>
                <action.icon size={20} className="text-white" />
              </div>
              <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 text-center leading-tight">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent orders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-navy-900 dark:text-gray-100">Recent Orders</h3>
          <button
            onClick={() => navigate('/orders')}
            className="text-xs font-semibold text-gold-600 dark:text-gold-400 flex items-center gap-0.5"
          >
            View All <ChevronRight size={14} />
          </button>
        </div>

        {/* Horizontal scroll list */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-4 px-4 pb-2">
          {recentOrders.map((order) => {
            const customer = customers.find((c) => c.id === order.customerId)
            return (
              <button
                key={order.id}
                onClick={() => navigate('/orders')}
                className="shrink-0 w-64 text-left active:scale-[0.98] transition-transform"
              >
                <Card className="p-3.5 h-full">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <Avatar name={order.customerName} color={customer?.avatarColor} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-900 dark:text-gray-100 truncate">{order.customerName}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{order.id}</p>
                    </div>
                    <StatusBadge status={order.status} size="sm" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{order.garmentType}</p>
                      <p className="font-semibold text-navy-700 dark:text-gray-300 mt-0.5">{formatCurrency(order.amount)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 dark:text-gray-400">Delivery</p>
                      <p className="font-medium text-navy-700 dark:text-gray-300 mt-0.5">{formatShortDate(order.deliveryDate)}</p>
                    </div>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
