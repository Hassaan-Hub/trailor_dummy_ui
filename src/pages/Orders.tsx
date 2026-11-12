import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  ShoppingCart,
  Filter,
  Calendar,
  IndianRupee,
  Eye,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { orders, customers, statusConfig } from '@/data/mockData'
import { formatCurrency, formatDate, daysUntil, cn } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const statusFilters: (OrderStatus | 'All')[] = [
  'All',
  'Pending',
  'In Progress',
  'Ready for Trial',
  'Ready for Delivery',
  'Delivered',
  'Cancelled',
]

export function Orders() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'All'>('All')

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.id.toLowerCase().includes(search.toLowerCase())
      const matchesFilter = activeFilter === 'All' || order.status === activeFilter
      return matchesSearch && matchesFilter
    })
  }, [search, activeFilter])

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: orders.length }
    for (const status of Object.keys(statusConfig)) {
      counts[status] = orders.filter((o) => o.status === status).length
    }
    return counts
  }, [])

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Orders</h1>
          <p className="text-sm text-navy-400 mt-1">
            Manage and track all customer orders
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/orders/new')}>
          <Plus size={16} />
          Create New Order
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="relative max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name or order ID..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-navy-400" />
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                activeFilter === status
                  ? 'bg-navy-800 text-white dark:bg-navy-700'
                  : 'bg-white dark:bg-navy-900 text-navy-600 dark:text-navy-300 border border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-800'
              )}
            >
              {status}
              <span className={cn(
                'text-xs px-1.5 py-0.5 rounded',
                activeFilter === status ? 'bg-white/20' : 'bg-navy-100 dark:bg-navy-700'
              )}>
                {filterCounts[status] || 0}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={<ShoppingCart size={28} />}
              title="No orders found"
              description="Try adjusting your filters or create a new order."
              action={<Button onClick={() => navigate('/orders/new')}><Plus size={16} /> New Order</Button>}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800 text-left">
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Order ID</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden md:table-cell">Garment</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden lg:table-cell">Delivery Date</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden sm:table-cell">Priority</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider text-right">Amount</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => {
                    const daysLeft = daysUntil(order.deliveryDate)
                    const customer = customers.find((c) => c.id === order.customerId)
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors"
                      >
                        <td className="px-5 py-3.5 font-medium text-navy-800 dark:text-navy-100">
                          {order.id}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            <Avatar
                              name={order.customerName}
                              color={customer?.avatarColor}
                              size="sm"
                            />
                            <div className="min-w-0">
                              <p className="text-navy-800 dark:text-navy-100 truncate font-medium">
                                {order.customerName}
                              </p>
                              <p className="text-xs text-navy-400 truncate">{customer?.phone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 hidden md:table-cell text-navy-600 dark:text-navy-300">
                          {order.items[0].garmentType}
                          {order.items.length > 1 && (
                            <span className="text-xs text-navy-400 ml-1">+{order.items.length - 1} more</span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div className="flex items-center gap-1.5 text-navy-600 dark:text-navy-300">
                            <Calendar size={14} className="text-navy-400" />
                            <span>{formatDate(order.deliveryDate)}</span>
                          </div>
                          {daysLeft >= 0 && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <span className={cn(
                              'text-xs ml-5',
                              daysLeft <= 3 ? 'text-red-500' : daysLeft <= 7 ? 'text-amber-500' : 'text-navy-400'
                            )}>
                              {daysLeft === 0 ? 'Due today' : `${daysLeft} days left`}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 hidden sm:table-cell">
                          <PriorityBadge priority={order.priority} />
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3.5 text-right font-semibold text-navy-800 dark:text-navy-100">
                          {formatCurrency(order.totalAmount)}
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            className="text-navy-400 hover:text-gold-600 dark:hover:text-gold-400 transition-colors cursor-pointer p-1 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 inline-flex items-center gap-1 text-xs font-medium"
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <IndianRupee size={14} />
            <span className="text-xs">Total Revenue</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">
            {formatCurrency(orders.reduce((s, o) => s + o.totalAmount, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <IndianRupee size={14} />
            <span className="text-xs">Advance Received</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">
            {formatCurrency(orders.reduce((s, o) => s + o.advancePaid, 0))}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <ShoppingCart size={14} />
            <span className="text-xs">Active Orders</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">
            {orders.filter((o) => o.status !== 'Delivered' && o.status !== 'Cancelled').length}
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <Calendar size={14} />
            <span className="text-xs">Due This Week</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">
            {orders.filter((o) => {
              const d = daysUntil(o.deliveryDate)
              return d >= 0 && d <= 7 && o.status !== 'Delivered' && o.status !== 'Cancelled'
            }).length}
          </p>
        </Card>
      </div>
    </div>
  )
}
