import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Package, AlertTriangle, Plus, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { fabrics } from '@/data/mockData'
import { formatCurrency, cn } from '@/lib/utils'

export function Inventory() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [showAdd, setShowAdd] = useState(false)

  const types = ['All', ...Array.from(new Set(fabrics.map((f) => f.type)))]
  const lowStock = fabrics.filter((f) => f.stockMeters < 10)
  const totalValue = fabrics.reduce((sum, f) => sum + f.stockMeters * f.pricePerMeter, 0)

  const filtered = useMemo(() => {
    let result = [...fabrics]
    if (typeFilter !== 'All') result = result.filter((f) => f.type === typeFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((f) => f.name.toLowerCase().includes(q) || f.color.toLowerCase().includes(q))
    }
    return result
  }, [search, typeFilter])

  return (
    <div className="min-h-screen safe-top-px">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/more')} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-bold text-navy-900 dark:text-gray-100 flex-1">Inventory</h1>
        <button onClick={() => setShowAdd(true)} className="w-9 h-9 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center active:scale-90 transition-transform">
          <Plus size={18} strokeWidth={2.5} />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-navy-900 dark:text-gray-100">{fabrics.length}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Fabrics</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-lg font-bold text-red-500">{lowStock.length}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Low Stock</p>
          </Card>
          <Card className="p-3 text-center">
            <p className="text-sm font-bold text-gold-600 dark:text-gold-400">{formatCurrency(totalValue)}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Stock Value</p>
          </Card>
        </div>

        {/* Low stock alert */}
        {lowStock.length > 0 && (
          <button
            onClick={() => setTypeFilter('All')}
            className="w-full flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-left active:scale-[0.98] transition-transform"
          >
            <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700 dark:text-red-400">Low Stock Alert</p>
              <p className="text-[11px] text-red-600/80 dark:text-red-400/70 mt-0.5">
                {lowStock.map((f) => f.name).join(', ')} — restock soon
              </p>
            </div>
          </button>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search fabrics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 pl-11 pr-4 py-3 text-sm text-navy-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
          />
        </div>

        {/* Type chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                'shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all active:scale-95',
                typeFilter === t
                  ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                  : 'bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-navy-700/50',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Fabric list */}
        {filtered.length === 0 ? (
          <EmptyState icon={Package} title="No fabrics found" description="Try a different filter or search" />
        ) : (
          <div className="space-y-2.5">
            {filtered.map((f, i) => {
              const isLow = f.stockMeters < 10
              return (
                <Card key={f.id} className="p-3.5 animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-navy-600 dark:to-navy-500 flex items-center justify-center shrink-0">
                      <Package size={19} className="text-gray-400 dark:text-gray-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-navy-900 dark:text-gray-100 truncate">{f.name}</p>
                        {isLow && <span className="shrink-0 px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-[9px] font-bold">LOW</span>}
                      </div>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{f.color} • {f.type} • {f.supplier}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-navy-900 dark:text-gray-100">{f.stockMeters}m</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">{formatCurrency(f.pricePerMeter)}/m</p>
                    </div>
                  </div>
                  {/* Stock bar */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-navy-700 overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', isLow ? 'bg-red-500' : 'bg-green-500')}
                        style={{ width: `${Math.min(100, (f.stockMeters / 60) * 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                      <TrendingUp size={10} /> {formatCurrency(f.stockMeters * f.pricePerMeter)}
                    </span>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Add fabric sheet */}
      <BottomSheet open={showAdd} onClose={() => setShowAdd(false)} title="Add Fabric">
        <div className="space-y-4">
          <Input label="Fabric Name" placeholder="e.g. Premium Cotton" />
          <Input label="Type" placeholder="Cotton / Silk / Wool" />
          <Input label="Color" placeholder="e.g. Navy" />
          <Input label="Stock (meters)" type="number" placeholder="0" />
          <Input label="Price per meter" type="number" placeholder="0" />
          <Input label="Supplier" placeholder="Supplier name" />
          <Button fullWidth size="lg" variant="gold" onClick={() => { setShowAdd(false); toast('Fabric added to inventory!', 'success') }}>
            Save Fabric
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
