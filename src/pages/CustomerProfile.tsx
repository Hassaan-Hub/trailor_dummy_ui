import { useParams, useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ShoppingBag,
  IndianRupee,
  Ruler,
  Edit,
  Plus,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { EmptyState } from '@/components/ui/EmptyState'
import { customers, orders, measurementRecords } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

export function CustomerProfile() {
  const { id } = useParams()
  const navigate = useNavigate()

  const customer = customers.find((c) => c.id === id)
  const customerOrders = orders.filter((o) => o.customerId === id)
  const customerMeasurements = measurementRecords.filter((r) => r.customerId === id)

  if (!customer) {
    return (
      <Card>
        <EmptyState
          icon={<ShoppingBag size={28} />}
          title="Customer not found"
          description="The customer you're looking for doesn't exist."
          action={<Button onClick={() => navigate('/customers')}>Back to Customers</Button>}
        />
      </Card>
    )
  }

  const measurementFields: { key: string; label: string }[] = [
    { key: 'chest', label: 'Chest' },
    { key: 'shoulder', label: 'Shoulder' },
    { key: 'sleeveLength', label: 'Sleeve Length' },
    { key: 'neck', label: 'Neck' },
    { key: 'waistShirt', label: 'Waist (Shirt)' },
    { key: 'fullLength', label: 'Full Length' },
    { key: 'bicep', label: 'Bicep' },
    { key: 'wrist', label: 'Wrist' },
    { key: 'waist', label: 'Waist' },
    { key: 'hip', label: 'Hip' },
    { key: 'thigh', label: 'Thigh' },
    { key: 'knee', label: 'Knee' },
    { key: 'bottom', label: 'Bottom' },
    { key: 'length', label: 'Length' },
    { key: 'inseam', label: 'Inseam' },
  ]

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/customers')}
          className="text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors cursor-pointer"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Customer Profile</h1>
      </div>

      {/* Profile Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <Avatar name={customer.name} color={customer.avatarColor} size="lg" />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-navy-900 dark:text-white">{customer.name}</h2>
                <p className="text-sm text-navy-400">
                  Customer since {formatDate(customer.createdAt)}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Edit size={14} /> Edit
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                <Phone size={14} className="text-navy-400" />
                {customer.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300">
                <Mail size={14} className="text-navy-400" />
                {customer.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-navy-600 dark:text-navy-300 sm:col-span-2">
                <MapPin size={14} className="text-navy-400" />
                {customer.address}, {customer.city}
              </div>
            </div>

            {customer.notes && (
              <div className="mt-4 bg-gold-50 dark:bg-gold-950/20 rounded-lg p-3">
                <p className="text-xs text-gold-700 dark:text-gold-300">
                  <strong>Notes:</strong> {customer.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-navy-100 dark:border-navy-800">
          <div className="text-center">
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 mb-1">
              <ShoppingBag size={18} />
            </div>
            <p className="text-xl font-bold text-navy-900 dark:text-white">{customer.totalOrders}</p>
            <p className="text-xs text-navy-400">Total Orders</p>
          </div>
          <div className="text-center">
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-gold-50 dark:bg-gold-950/30 text-gold-600 dark:text-gold-400 mb-1">
              <IndianRupee size={18} />
            </div>
            <p className="text-xl font-bold text-navy-900 dark:text-white">{formatCurrency(customer.totalSpent)}</p>
            <p className="text-xs text-navy-400">Total Spent</p>
          </div>
          <div className="text-center">
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 mb-1">
              <Ruler size={18} />
            </div>
            <p className="text-xl font-bold text-navy-900 dark:text-white">{customerMeasurements.length}</p>
            <p className="text-xs text-navy-400">Measurements</p>
          </div>
          <div className="text-center">
            <div className="flex h-10 w-10 mx-auto items-center justify-center rounded-lg bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400 mb-1">
              <Calendar size={18} />
            </div>
            <p className="text-xl font-bold text-navy-900 dark:text-white">
              {customerOrders.filter((o) => o.status === 'Delivered').length}
            </p>
            <p className="text-xs text-navy-400">Delivered</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order History */}
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/orders/new')}>
              <Plus size={14} /> New Order
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {customerOrders.length === 0 ? (
              <EmptyState
                icon={<ShoppingBag size={24} />}
                title="No orders yet"
                description="This customer hasn't placed any orders."
              />
            ) : (
              <div className="divide-y divide-navy-50 dark:divide-navy-800/50">
                {customerOrders.map((order) => (
                  <div
                    key={order.id}
                    className="px-5 py-3 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors cursor-pointer"
                    onClick={() => navigate('/orders')}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-navy-800 dark:text-navy-100">{order.id}</span>
                        <StatusBadge status={order.status} />
                      </div>
                      <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                        {formatCurrency(order.totalAmount)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-navy-400">
                      <span>{order.items[0].garmentType}{order.items.length > 1 && ` +${order.items.length - 1}`}</span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {formatDate(order.deliveryDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest Measurements */}
        <Card>
          <CardHeader>
            <CardTitle>Latest Measurements</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => navigate('/measurements')}>
              <Ruler size={14} /> View All
            </Button>
          </CardHeader>
          <CardContent>
            {customerMeasurements.length === 0 ? (
              <EmptyState
                icon={<Ruler size={24} />}
                title="No measurements"
                description="No measurement records for this customer."
              />
            ) : (
              <div className="space-y-4">
                {customerMeasurements.slice(0, 2).map((record) => (
                  <div key={record.id} className="bg-navy-50 dark:bg-navy-800/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-navy-800 dark:text-navy-100">
                        {record.garmentType}
                      </span>
                      <span className="text-xs text-navy-400">{formatDate(record.date)}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {measurementFields.map((f) => {
                        const val = (record.measurements as Record<string, number | undefined>)[f.key]
                        if (!val) return null
                        return (
                          <div key={f.key} className="flex items-center justify-between bg-white dark:bg-navy-900 rounded px-2 py-1">
                            <span className="text-xs text-navy-500">{f.label}</span>
                            <span className="text-xs font-medium text-navy-800 dark:text-navy-100">{val}"</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
