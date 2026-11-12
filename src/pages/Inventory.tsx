import { useState } from 'react'
import {
  Package,
  Search,
  Plus,
  AlertTriangle,
  IndianRupee,
  Layers,
  Truck,
  TrendingDown,
  Edit,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { fabrics } from '@/data/mockData'
import { formatCurrency, cn } from '@/lib/utils'

export function Inventory() {
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newFabric, setNewFabric] = useState({ name: '', type: 'Cotton', color: '', stockMeters: '', pricePerMeter: '', supplier: '' })

  const fabricTypes = ['All', 'Cotton', 'Silk', 'Linen', 'Wool', 'Polyester', 'Blend', 'Synthetic', 'Rayon']

  const filteredFabrics = fabrics.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.color.toLowerCase().includes(search.toLowerCase()) ||
      f.supplier.toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'All' || f.type === filterType
    return matchesSearch && matchesType
  })

  const lowStockFabrics = fabrics.filter((f) => f.stockMeters <= f.lowStockThreshold)
  const totalStockValue = fabrics.reduce((s, f) => s + f.stockMeters * f.pricePerMeter, 0)
  const totalMeters = fabrics.reduce((s, f) => s + f.stockMeters, 0)

  const handleAddFabric = () => {
    if (newFabric.name && newFabric.stockMeters && newFabric.pricePerMeter) {
      toast('Fabric added to inventory!', 'success')
      setShowAddModal(false)
      setNewFabric({ name: '', type: 'Cotton', color: '', stockMeters: '', pricePerMeter: '', supplier: '' })
    }
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Inventory / Fabric Management</h1>
          <p className="text-sm text-navy-400 mt-1">Track fabric stock, prices, and suppliers</p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Fabric
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <Layers size={14} />
            <span className="text-xs">Total Fabrics</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">{fabrics.length}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <Package size={14} />
            <span className="text-xs">Total Stock</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">{totalMeters}m</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <IndianRupee size={14} />
            <span className="text-xs">Stock Value</span>
          </div>
          <p className="text-xl font-bold text-navy-900 dark:text-white">{formatCurrency(totalStockValue)}</p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-2 text-navy-400 mb-1">
            <TrendingDown size={14} />
            <span className="text-xs">Low Stock Alerts</span>
          </div>
          <p className="text-xl font-bold text-red-500">{lowStockFabrics.length}</p>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {lowStockFabrics.length > 0 && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 shrink-0">
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-700 dark:text-red-300">Low Stock Alert</h3>
              <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                {lowStockFabrics.length} fabric(s) are running low on stock. Consider restocking soon.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {lowStockFabrics.map((f) => (
                  <span key={f.id} className="text-xs bg-white dark:bg-navy-800 px-2 py-1 rounded-lg text-red-700 dark:text-red-300 font-medium">
                    {f.name} — {f.stockMeters}m left
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search fabrics..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {fabricTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                filterType === type
                  ? 'bg-navy-800 text-white dark:bg-navy-700'
                  : 'bg-white dark:bg-navy-900 text-navy-600 dark:text-navy-300 border border-navy-200 dark:border-navy-700 hover:bg-navy-50 dark:hover:bg-navy-800'
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Fabric Table */}
      <Card>
        <CardContent className="p-0">
          {filteredFabrics.length === 0 ? (
            <EmptyState
              icon={<Package size={28} />}
              title="No fabrics found"
              description="Try adjusting your filters or add a new fabric."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-navy-100 dark:border-navy-800 text-left">
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Fabric</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden md:table-cell">Type</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden sm:table-cell">Color</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Stock</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider">Price/m</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider hidden lg:table-cell">Supplier</th>
                    <th className="px-5 py-3 font-medium text-navy-500 text-xs uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFabrics.map((fabric) => (
                    <tr
                      key={fabric.id}
                      className="border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/30 transition-colors"
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="h-8 w-8 rounded-lg shrink-0 border border-navy-200 dark:border-navy-700"
                            style={{ backgroundColor: fabric.color.toLowerCase().includes('red') ? '#dc2626' : fabric.color.toLowerCase().includes('blue') ? '#2563eb' : fabric.color.toLowerCase().includes('green') ? '#16a34a' : fabric.color.toLowerCase().includes('black') ? '#1e293b' : fabric.color.toLowerCase().includes('white') ? '#f8fafc' : fabric.color.toLowerCase().includes('cream') || fabric.color.toLowerCase().includes('beige') || fabric.color.toLowerCase().includes('peach') ? '#fef3c7' : fabric.color.toLowerCase().includes('grey') || fabric.color.toLowerCase().includes('charcoal') ? '#475569' : fabric.color.toLowerCase().includes('olive') ? '#84cc16' : '#e6a02f' }}
                          />
                          <span className="font-medium text-navy-800 dark:text-navy-100">{fabric.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 hidden md:table-cell">
                        <span className="text-xs px-2 py-0.5 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                          {fabric.type}
                        </span>
                      </td>
                      <td className="px-5 py-3 hidden sm:table-cell text-navy-600 dark:text-navy-300">{fabric.color}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            'font-medium',
                            fabric.stockMeters <= fabric.lowStockThreshold ? 'text-red-600 dark:text-red-400' : 'text-navy-800 dark:text-navy-100'
                          )}>
                            {fabric.stockMeters}m
                          </span>
                          {fabric.stockMeters <= fabric.lowStockThreshold && (
                            <AlertTriangle size={14} className="text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 font-medium text-navy-800 dark:text-navy-100">
                        {formatCurrency(fabric.pricePerMeter)}
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell text-navy-600 dark:text-navy-300">
                        <span className="flex items-center gap-1">
                          <Truck size={12} className="text-navy-400" />
                          {fabric.supplier}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button className="text-navy-400 hover:text-gold-600 dark:hover:text-gold-400 cursor-pointer p-1 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors inline-flex">
                          <Edit size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Fabric Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Fabric" size="md">
        <div className="p-6 space-y-4">
          <Input label="Fabric Name *" value={newFabric.name} onChange={(e) => setNewFabric({ ...newFabric, name: e.target.value })} placeholder="e.g. Premium Cotton" />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Type" value={newFabric.type} onChange={(e) => setNewFabric({ ...newFabric, type: e.target.value })}>
              {fabricTypes.filter((t) => t !== 'All').map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Input label="Color" value={newFabric.color} onChange={(e) => setNewFabric({ ...newFabric, color: e.target.value })} placeholder="e.g. Navy Blue" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Stock (meters)" type="number" value={newFabric.stockMeters} onChange={(e) => setNewFabric({ ...newFabric, stockMeters: e.target.value })} placeholder="0" />
            <Input label="Price per meter (₹)" type="number" value={newFabric.pricePerMeter} onChange={(e) => setNewFabric({ ...newFabric, pricePerMeter: e.target.value })} placeholder="0" />
          </div>
          <Input label="Supplier" value={newFabric.supplier} onChange={(e) => setNewFabric({ ...newFabric, supplier: e.target.value })} placeholder="e.g. Raymond" />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddFabric} disabled={!newFabric.name || !newFabric.stockMeters}>Add Fabric</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
