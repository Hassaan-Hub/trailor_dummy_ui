import { useState } from 'react'
import { Shirt, Search, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { garmentStyles } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'
import type { GarmentStyle } from '@/types'

export function Catalog() {
  const [search, setSearch] = useState('')
  const [selectedStyle, setSelectedStyle] = useState<GarmentStyle | null>(null)

  const filteredStyles = garmentStyles.filter(
    (s) =>
      s.type.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Garment Catalog</h1>
        <p className="text-sm text-navy-400 mt-1">Browse garment types, styles, and pricing</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search garments..."
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStyles.map((style) => (
          <Card
            key={style.id}
            className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedStyle(style)}
          >
            {/* Image placeholder */}
            <div
              className="h-40 flex items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: style.imageColor }}
            >
              <Shirt size={56} className="text-white/80 group-hover:scale-110 transition-transform" />
              <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1">
                <span className="text-xs text-white font-medium">{style.priceRange}</span>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="text-base font-semibold text-navy-900 dark:text-white">{style.type}</h3>
              <p className="text-xs text-navy-400 mt-0.5">{style.name}</p>
              <p className="text-sm text-navy-500 dark:text-navy-300 mt-2 line-clamp-2">
                {style.description}
              </p>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-navy-100 dark:border-navy-800">
                <div>
                  <p className="text-xs text-navy-400">Base Price</p>
                  <p className="text-sm font-semibold text-gold-600 dark:text-gold-400">
                    {formatCurrency(style.basePrice)}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye size={14} /> Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedStyle}
        onClose={() => setSelectedStyle(null)}
        title={selectedStyle?.name}
        size="lg"
      >
        {selectedStyle && (
          <div className="p-6 space-y-6">
            {/* Hero */}
            <div
              className="h-48 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: selectedStyle.imageColor }}
            >
              <Shirt size={72} className="text-white/80" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-navy-900 dark:text-white">{selectedStyle.type}</h3>
              <p className="text-sm text-navy-500 dark:text-navy-300 mt-1">{selectedStyle.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-50 dark:bg-navy-800/50 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">Base Price</p>
                <p className="text-xl font-bold text-gold-600 dark:text-gold-400">
                  {formatCurrency(selectedStyle.basePrice)}
                </p>
                <p className="text-xs text-navy-400 mt-1">{selectedStyle.priceRange}</p>
              </div>
              <div className="bg-navy-50 dark:bg-navy-800/50 rounded-lg p-4">
                <p className="text-xs text-navy-400 mb-1">Price Range</p>
                <p className="text-sm font-medium text-navy-800 dark:text-navy-100">
                  {selectedStyle.priceRange}
                </p>
              </div>
            </div>

            {/* Style Options */}
            {selectedStyle.styleOptions && (
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-navy-700 dark:text-navy-200">Available Style Options</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedStyle.styleOptions.collars && (
                    <div>
                      <p className="text-xs font-medium text-navy-500 mb-2">Collar Types</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStyle.styleOptions.collars.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedStyle.styleOptions.cuffs && (
                    <div>
                      <p className="text-xs font-medium text-navy-500 mb-2">Cuff Types</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStyle.styleOptions.cuffs.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedStyle.styleOptions.pockets && (
                    <div>
                      <p className="text-xs font-medium text-navy-500 mb-2">Pocket Styles</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStyle.styleOptions.pockets.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedStyle.styleOptions.closures && (
                    <div>
                      <p className="text-xs font-medium text-navy-500 mb-2">Closure Types</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStyle.styleOptions.closures.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedStyle.styleOptions.necklines && (
                    <div>
                      <p className="text-xs font-medium text-navy-500 mb-2">Neckline Options</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedStyle.styleOptions.necklines.map((c) => (
                          <span key={c} className="text-xs px-2 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
