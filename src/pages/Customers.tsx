import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Phone, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { PullToRefresh } from '@/components/ui/PullToRefresh'
import { customers } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

export function Customers() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = useMemo(() => {
    if (!search.trim()) return customers
    const q = search.toLowerCase()
    return customers.filter(
      (c) => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.city.toLowerCase().includes(q),
    )
  }, [search])

  const handleRefresh = useCallback(() => {
    setSearch('')
    toast('Customer list refreshed', 'success')
  }, [toast])

  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="px-4 pt-6 space-y-4 safe-top-px">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">Customers</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="w-10 h-10 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 pl-11 pr-4 py-3 text-sm text-navy-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
        />
      </div>

      {/* Customer list */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No customers found"
          description="Try a different search term"
        />
      ) : (
        <div className="space-y-2.5">
          {filtered.map((customer, i) => (
            <button
              key={customer.id}
              onClick={() => navigate(`/customers/${customer.id}`)}
              className="block w-full text-left animate-slide-up active:scale-[0.98] transition-transform"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <Card className="p-3.5">
                <div className="flex items-center gap-3">
                  <Avatar name={customer.name} color={customer.avatarColor} size="lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-navy-900 dark:text-gray-100">{customer.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Phone size={12} /> {customer.phone}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <ShoppingBag size={11} /> {customer.totalOrders} orders
                      </span>
                      <span className="text-[11px] font-bold text-gold-600 dark:text-gold-400 flex items-center gap-0.5">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </button>
          ))}
        </div>
      )}

      {/* Add Customer Bottom Sheet */}
      <BottomSheet open={showAdd} onClose={() => setShowAdd(false)} title="Add New Customer">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter customer name" />
          <Input label="Phone Number" placeholder="+91 98765 43210" type="tel" />
          <Input label="Email (optional)" placeholder="email@example.com" type="email" />
          <Input label="Address" placeholder="Street address" />
          <Input label="City" placeholder="Mumbai" />
          <Button
            fullWidth
            size="lg"
            onClick={() => {
              setShowAdd(false)
              toast('Customer added successfully!', 'success')
            }}
          >
            Save Customer
          </Button>
        </div>
      </BottomSheet>
    </div>
    </PullToRefresh>
  )
}
