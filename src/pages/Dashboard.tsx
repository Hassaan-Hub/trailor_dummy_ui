import { useNavigate } from 'react-router-dom'
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  IndianRupee,
  Users,
  Plus,
  UserPlus,
  ArrowRight,
  TrendingUp,
  Package,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import {
  dashboardStats,
  orders,
  customers,
  ordersThisWeek,
  popularGarments,
} from '@/data/mockData'
import { formatCurrency, formatDate, daysUntil, cn } from '@/lib/utils'

export function Dashboard() {
  const navigate = useNavigate()
  const recentOrders = orders.slice(0, 6)
  const maxBarHeight = Math.max(...ordersThisWeek.map((d) => d.count))
  const maxGarmentCount = Math.max(...popularGarments.map((g) => g.count))

  const stats = [
    {
      label: 'Total Orders',
      value: dashboardStats.totalOrders,
      icon: ShoppingCart,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400',
      trend: '+12%',
    },
    {
      label: 'Pending Orders',
      value: dashboardStats.pendingOrders + dashboardStats.inProgressOrders,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
      trend: '3 new',
    },
    {
      label: 'Completed Orders',
      value: dashboardStats.completedOrders,
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400',
      trend: '+5%',
    },
    {
      label: 'Revenue (Nov)',
      value: formatCurrency(dashboardStats.revenueThisMonth),
      icon: IndianRupee,
      color: 'bg-gold-50 text-gold-600 dark:bg-gold-950/40 dark:text-gold-400',
      trend: '+18%',
    },
    {
      label: 'Active Customers',
      value: dashboardStats.activeCustomers,
      icon: Users,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400',
      trend: '+2',
    },
  ]

  return (
    <div className="space-y-6 animate-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
            Welcome back, Mubarak! 👋
          </h1>
          <p className="text-sm text-navy-400 mt-1">
            Here's what's happening at your tailor shop today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="md" onClick={() => navigate('/customers')}>
            <UserPlus size={16} />
            New Customer
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/orders/new')}>
            <Plus size={16} />
            New Order
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className={cn('p-2 rounded-lg', stat.color)}>
                <stat.icon size={18} />
              </div>
              <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                <TrendingUp size={12} />
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-bold text-navy-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-navy-400 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Orders This Week */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Orders This Week</CardTitle>
            <span className="text-xs text-navy-400">Last 7 days</span>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between gap-3 h-48 pt-4">
              {ordersThisWeek.map((day) => (
                <div key={day.day} className="flex flex-col items-center gap-2 flex-1">
                  <span className="text-xs font-semibold text-navy-600 dark:text-navy-300">
                    {day.count}
                  </span>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-navy-700 to-gold-400 transition-all hover:from-navy-600 hover:to-gold-300"
                      style={{ height: `${(day.count / maxBarHeight) * 100}%`, minHeight: '8px' }}
                    />
                  </div>
                  <span className="text-xs text-navy-400">{day.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Garments */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Garments</CardTitle>
            <Package size={16} className="text-navy-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3 pt-2">
              {popularGarments.slice(0, 5).map((g) => (
                <div key={g.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-navy-700 dark:text-navy-200">{g.name}</span>
                    <span className="text-xs font-semibold text-navy-500">{g.count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-navy-100 dark:bg-navy-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(g.count / maxGarmentCount) * 100}%`,
                        backgroundColor: g.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <button
            onClick={() => navigate('/orders')}
            className="text-sm text-gold-600 dark:text-gold-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all <ArrowRight size={14} />
          </button>
        </CardHeader>
        <CardContent className="p-0">
          {recentOrders.length === 0 ? (
            <EmptyState
              icon={<ShoppingCart size={28} />}
              title="No orders yet"
              description="Create your first order to get started."
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
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden lg:table-cell">Delivery</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const daysLeft = daysUntil(order.deliveryDate)
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors cursor-pointer"
                        onClick={() => navigate('/orders')}
                      >
                        <td className="px-5 py-3 font-medium text-navy-800 dark:text-navy-100">
                          {order.id}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <Avatar
                              name={order.customerName}
                              color={customers.find((c) => c.id === order.customerId)?.avatarColor}
                              size="sm"
                            />
                            <span className="text-navy-800 dark:text-navy-100 truncate">
                              {order.customerName}
                            </span>
                          </div>
                        </td>
                        <td className="px-5 py-3 hidden md:table-cell text-navy-600 dark:text-navy-300">
                          {order.items[0].garmentType}
                          {order.items.length > 1 && ` +${order.items.length - 1}`}
                        </td>
                        <td className="px-5 py-3 hidden lg:table-cell">
                          <span className="text-navy-600 dark:text-navy-300">{formatDate(order.deliveryDate)}</span>
                          {daysLeft > 0 && daysLeft <= 7 && order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                            <span className="block text-xs text-amber-600 dark:text-amber-400">
                              {daysLeft} days left
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="px-5 py-3 text-right font-semibold text-navy-800 dark:text-navy-100">
                          {formatCurrency(order.totalAmount)}
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
    </div>
  )
}
