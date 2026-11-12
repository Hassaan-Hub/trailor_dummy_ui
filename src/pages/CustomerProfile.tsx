import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Phone, Mail, MapPin, ShoppingBag, IndianRupee, Calendar, Ruler, Package } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Button } from '@/components/ui/Button'
import { customers, orders, measurements } from '@/data/mockData'
import { formatCurrency, formatDate, formatShortDate } from '@/lib/utils'

export function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const customer = customers.find((c) => c.id === id)
  if (!customer) {
    return (
      <div className="px-4 pt-10 text-center">
        <p className="text-gray-500">Customer not found</p>
        <Button className="mt-4" onClick={() => navigate('/customers')}>Back to Customers</Button>
      </div>
    )
  }

  const customerOrders = orders.filter((o) => o.customerId === customer.id)
  const customerMeasurements = measurements.filter((m) => m.customerId === customer.id)
  const latestMeasurement = customerMeasurements[0]

  const stats = [
    { label: 'Orders', value: customer.totalOrders, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/15' },
    { label: 'Spent', value: formatCurrency(customer.totalSpent), icon: IndianRupee, color: 'text-gold-500', bg: 'bg-gold-100 dark:bg-gold-500/15' },
    { label: 'Measurements', value: customerMeasurements.length, icon: Ruler, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/15' },
  ]

  return (
    <div className="min-h-screen safe-top-px">
      {/* Header with back button */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/customers')}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform"
        >
          <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-bold text-navy-900 dark:text-gray-100">Customer Profile</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Profile header */}
        <Card className="p-5 text-center">
          <Avatar name={customer.name} color={customer.avatarColor} size="lg" />
          <h2 className="text-lg font-bold text-navy-900 dark:text-gray-100 mt-3">{customer.name}</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Customer since {formatDate(customer.joinedDate)}</p>

          <div className="flex items-center justify-center gap-2 mt-3">
            <Button size="sm" variant="secondary">
              <Phone size={14} /> Call
            </Button>
            <Button size="sm" variant="gold">
              <Calendar size={14} /> New Order
            </Button>
          </div>
        </Card>

        {/* Contact info */}
        <Card className="p-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Contact Info</h3>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/15 flex items-center justify-center">
              <Phone size={15} className="text-blue-500" />
            </div>
            <p className="text-sm text-navy-700 dark:text-gray-300">{customer.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <Mail size={15} className="text-purple-500" />
            </div>
            <p className="text-sm text-navy-700 dark:text-gray-300">{customer.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold-100 dark:bg-gold-500/15 flex items-center justify-center">
              <MapPin size={15} className="text-gold-500" />
            </div>
            <p className="text-sm text-navy-700 dark:text-gray-300">{customer.address}, {customer.city}</p>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-3 text-center">
              <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mx-auto mb-1.5`}>
                <stat.icon size={15} className={stat.color} />
              </div>
              <p className="text-sm font-bold text-navy-900 dark:text-gray-100">{stat.value}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Latest measurements */}
        {latestMeasurement && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Latest Measurements</h3>
              <button
                onClick={() => navigate('/measurements')}
                className="text-xs font-semibold text-gold-600 dark:text-gold-400"
              >
                View All
              </button>
            </div>
            <p className="text-sm font-semibold text-navy-900 dark:text-gray-100 mb-1">{latestMeasurement.garmentType}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 mb-3">{formatDate(latestMeasurement.date)}</p>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {Object.entries({ ...latestMeasurement.upperBody, ...latestMeasurement.lowerBody }).map(([key, val]) => {
                if (val === undefined) return null
                return (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-semibold text-navy-700 dark:text-gray-300">{val}"</span>
                  </div>
                )
              })}
            </div>
          </Card>
        )}

        {/* Order history */}
        <div>
          <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Order History</h3>
          <div className="space-y-2.5">
            {customerOrders.map((order) => (
              <Card key={order.id} className="p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{order.garmentType}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{order.id} • {formatShortDate(order.orderDate)}</p>
                  </div>
                  <StatusBadge status={order.status} size="sm" />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50 dark:border-navy-700/30">
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <Package size={11} /> {order.fabricName}
                  </span>
                  <span className="text-sm font-bold text-navy-900 dark:text-gray-100">{formatCurrency(order.amount)}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
