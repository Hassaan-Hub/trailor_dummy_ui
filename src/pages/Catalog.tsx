import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Shirt, IndianRupee, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { Button } from '@/components/ui/Button'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { garmentStyles } from '@/data/mockData'
import { formatCurrency, cn } from '@/lib/utils'
import type { GarmentStyle } from '@/types'

export function Catalog() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<GarmentStyle | null>(null)

  const filtered = useMemo(() => {
    if (!search.trim()) return garmentStyles
    const q = search.toLowerCase()
    return garmentStyles.filter(
      (g) => g.type.toLowerCase().includes(q) || g.name.toLowerCase().includes(q) || g.description.toLowerCase().includes(q),
    )
  }, [search])

  const categoryLabel: Record<string, string> = {
    collars: 'Collar / Lapel', cuffs: 'Cuff Styles', pockets: 'Pocket Styles',
    closures: 'Closures', necklines: 'Necklines',
  }

  return (
    <div className="min-h-screen safe-top-px">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/more')} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-bold text-navy-900 dark:text-gray-100 flex-1">Garment Catalog</h1>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Intro */}
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 dark:from-navy-800 dark:to-navy-600 p-4">
          <p className="text-gold-400 text-xs font-semibold uppercase tracking-wide">Style Library</p>
          <h2 className="text-white text-lg font-bold mt-0.5">{garmentStyles.length} Garment Types</h2>
          <p className="text-gray-400 text-xs mt-1">Tap any garment to explore style variations</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search garments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 pl-11 pr-4 py-3 text-sm text-navy-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
          />
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState icon={Shirt} title="No garments found" description="Try a different search term" />
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((g, i) => (
              <button
                key={g.id}
                onClick={() => setSelectedStyle(g)}
                className="text-left animate-slide-up active:scale-[0.97] transition-transform"
                style={{ animationDelay: `${i * 35}ms` }}
              >
                <Card className="h-full overflow-hidden">
                  {/* Illustration placeholder */}
                  <div className="h-24 bg-gradient-to-br from-navy-100 to-gold-100 dark:from-navy-700 dark:to-navy-600 flex items-center justify-center relative">
                    <Shirt size={36} className="text-navy-400 dark:text-gold-400/60" strokeWidth={1.2} />
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/70 dark:bg-navy-800/70 flex items-center justify-center">
                      <ChevronRight size={13} className="text-navy-500" />
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-bold text-navy-900 dark:text-gray-100">{g.type}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{g.description}</p>
                    <p className="text-[11px] font-bold text-gold-600 dark:text-gold-400 mt-1.5 flex items-center gap-0.5">
                      <IndianRupee size={11} /> from {formatCurrency(g.basePrice)}
                    </p>
                  </div>
                </Card>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Style detail sheet */}
      <BottomSheet open={!!selectedStyle} onClose={() => setSelectedStyle(null)} title={selectedStyle?.type}>
        {selectedStyle && (
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-navy-100 to-gold-100 dark:from-navy-700 dark:to-navy-600 h-28 flex items-center justify-center">
              <Shirt size={44} className="text-navy-400 dark:text-gold-400/60" strokeWidth={1.2} />
            </div>

            <div>
              <h3 className="text-base font-bold text-navy-900 dark:text-gray-100">{selectedStyle.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{selectedStyle.description}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-gold-50 dark:bg-gold-500/10">
              <span className="text-sm text-navy-700 dark:text-gray-300">Base Price</span>
              <span className="text-lg font-bold text-gold-600 dark:text-gold-400">{formatCurrency(selectedStyle.basePrice)}</span>
            </div>

            {Object.entries(selectedStyle.styleOptions).map(([category, options]) => options && options.length > 0 ? (
              <div key={category}>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                  {categoryLabel[category] || category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {options.map((opt) => (
                    <span key={opt} className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium',
                      'bg-gray-100 dark:bg-navy-700 text-navy-700 dark:text-gray-300',
                    )}>
                      {opt}
                    </span>
                  ))}
                </div>
              </div>
            ) : null)}

            <Button
              fullWidth
              size="lg"
              variant="gold"
              onClick={() => {
                setSelectedStyle(null)
                navigate('/create-order')
                toast(`Creating new ${selectedStyle.type} order`, 'info')
              }}
            >
              Create Order with This Style
            </Button>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
