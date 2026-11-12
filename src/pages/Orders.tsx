import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge, PriorityBadge } from '@/components/ui/StatusBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { SkeletonCard } from '@/components/ui/Skeleton'
import { PullToRefresh } from '@/components/ui/PullToRefresh'
import { useToast } from '@/components/ui/Toast'
import { orders, customers } from '@/data/mockData'
import { formatCurrency, formatShortDate, daysUntil, cn } from '@/lib/utils'
import type { OrderStatus } from '@/types'

const filterChips: ('All' | OrderStatus)[] = ['All', 'Pending', 'In Progress', 'Ready for Trial', 'Ready for Delivery', 'Delivered', 'Cancelled']

export function Orders() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<'All' | OrderStatus>('All')
  const [loading, setLoading] = useState(false)

  const filtered = useMemo(() => {
    let result = [...orders]
    if (activeFilter !== 'All') {
      result = result.filter((o) => o.status === activeFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (o) => o.customerName.toLowerCase().includes(q) || o.id.toLowerCase().includes(q),
      )
    }
    return result.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
  }, [search, activeFilter])

  const handleFilterChange = (filter: 'All' | OrderStatus) => {
    setLoading(true)
    setActiveFilter(filter)
    setTimeout(() => setLoading(false), 300)
  }

  const countFor = (filter: 'All' | OrderStatus) =>
    filter === 'All' ? orders.length : orders.filter((o) => o.status === filter).length

  const handleRefresh = useCallback(() => {
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      toast('Orders up to date', 'success')
    }, 800)
  }, [toast])

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="px-4 pt-6 space-y-4 safe-top-px">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">Orders</h1>
        <button
          onClick={() => navigate('/create-order')}
          className="w-10 h-10 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by customer or order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 pl-11 pr-4 py-3 text-sm text-navy-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
        />
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleFilterChange(chip)}
            className={cn(
              'shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95',
              activeFilter === chip
                ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                : 'bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-navy-700/50',
            )}
          >
            {chip} <span className="opacity-60">({countFor(chip)})</span>
          </button>
        ))}
      </div>

      {/* Order list */}
      {loading ? (
        <div className="space-y-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No orders found"
          description="Try changing the filter or search term"
          actionLabel="New Order"
          onAction={() => navigate('/create-order')}
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => {
            const customer = customers.find((c) => c.id === order.customerId)
            const days = daysUntil(order.deliveryDate)
            const isUrgent = days <= 2 && order.status !== 'Delivered' && order.status !== 'Cancelled'

            return (
              <button
                key={order.id}
                onClick={() => navigate(`/customers/${order.customerId}`)}
                className="block w-full text-left animate-slide-up active:scale-[0.98] transition-transform"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Card className="p-3.5">
                  <div className="flex items-start gap-3">
                    <Avatar name={order.customerName} color={customer?.avatarColor} size="md" />

                    <div className="flex-1 min-w-0">
                      {/* Top row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold text-sm text-navy-900 dark:text-gray-100 truncate">{order.customerName}</p>
                          <p className="text-[11px] text-gray-500 dark:text-gray-400">{order.id} • {order.garmentType}</p>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 shrink-0 mt-0.5" />
                      </div>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1.5">
                          <StatusBadge status={order.status} size="sm" />
                          <PriorityBadge priority={order.priority} />
                        </div>
                        <p className="font-bold text-sm text-navy-900 dark:text-gray-100">{formatCurrency(order.amount)}</p>
                      </div>

                      {/* Delivery date */}
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 dark:border-navy-700/30">
                        <span className="text-[11px] text-gray-500 dark:text-gray-400">
                          Delivery: {formatShortDate(order.deliveryDate)}
                        </span>
                        {isUrgent && (
                          <span className="text-[10px] font-bold text-red-500">
                            {days === 0 ? 'Due today!' : days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
                          </span>
                        )}
                        {order.status === 'Delivered' && (
                          <span className="text-[10px] font-bold text-green-500">Delivered</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      )}
    </div>
    </PullToRefresh>
  )
}
