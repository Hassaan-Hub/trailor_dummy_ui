import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users,
  Search,
  Plus,
  Phone,
  MapPin,
  ShoppingBag,
  IndianRupee,
  Eye,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { customers } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

export function Customers() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', address: '', city: '' })

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.city.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.phone) {
      toast('Customer added successfully!', 'success')
      setShowAddModal(false)
      setNewCustomer({ name: '', phone: '', email: '', address: '', city: '' })
    }
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Customers</h1>
          <p className="text-sm text-navy-400 mt-1">
            {customers.length} total customers
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Customer
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, phone, or city..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
        />
      </div>

      {/* Customer Grid */}
      {filteredCustomers.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Users size={28} />}
            title="No customers found"
            description="Try adjusting your search or add a new customer."
            action={<Button onClick={() => setShowAddModal(true)}><Plus size={16} /> Add Customer</Button>}
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCustomers.map((c) => (
            <Card
              key={c.id}
              className="p-4 hover:shadow-md transition-all cursor-pointer"
              onClick={() => navigate(`/customers/${c.id}`)}
            >
              <div className="flex items-start gap-3">
                <Avatar name={c.name} color={c.avatarColor} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-navy-900 dark:text-white truncate">
                    {c.name}
                  </h3>
                  <p className="text-xs text-navy-400 mt-0.5">
                    Customer since {formatDate(c.createdAt)}
                  </p>
                </div>
                <button
                  className="text-navy-300 hover:text-gold-600 dark:hover:text-gold-400 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/customers/${c.id}`)
                  }}
                >
                  <Eye size={16} />
                </button>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-navy-500">
                  <Phone size={13} className="text-navy-400" />
                  <span>{c.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-500 truncate">
                  <MapPin size={13} className="text-navy-400 shrink-0" />
                  <span className="truncate">{c.address}, {c.city}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-navy-100 dark:border-navy-800 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-navy-400 flex items-center gap-1">
                    <ShoppingBag size={11} /> Orders
                  </p>
                  <p className="text-sm font-semibold text-navy-800 dark:text-navy-100">{c.totalOrders}</p>
                </div>
                <div>
                  <p className="text-xs text-navy-400 flex items-center gap-1">
                    <IndianRupee size={11} /> Total Spent
                  </p>
                  <p className="text-sm font-semibold text-navy-800 dark:text-navy-100">{formatCurrency(c.totalSpent)}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add Customer Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Customer"
        size="md"
      >
        <div className="p-6 space-y-4">
          <Input
            label="Full Name *"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="e.g. Rahul Verma"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone *"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              placeholder="+91 98765 43210"
            />
            <Input
              label="Email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              placeholder="email@example.com"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="City"
              value={newCustomer.city}
              onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })}
              placeholder="Mumbai"
            />
            <Input
              label="Address"
              value={newCustomer.address}
              onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
              placeholder="Street address"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddCustomer} disabled={!newCustomer.name || !newCustomer.phone}>
              Add Customer
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
