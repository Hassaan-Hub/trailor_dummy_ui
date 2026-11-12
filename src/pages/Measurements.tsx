import { useState, useMemo, useCallback } from 'react'
import { Search, Plus, Ruler, Calendar, ChevronRight, Save, X, TrendingUp, Layers } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { EmptyState } from '@/components/ui/EmptyState'
import { useToast } from '@/components/ui/Toast'
import { PullToRefresh } from '@/components/ui/PullToRefresh'
import { customers, measurements, measurementTemplates } from '@/data/mockData'
import { formatDate, cn } from '@/lib/utils'

const upperLabels: Record<string, string> = {
  chest: 'Chest', shoulder: 'Shoulder', sleeveLength: 'Sleeve Length',
  neck: 'Neck', waistShirt: 'Waist (Shirt)', fullLength: 'Full Length',
  bicep: 'Bicep', wrist: 'Wrist',
}
const lowerLabels: Record<string, string> = {
  waist: 'Waist', hip: 'Hip', thigh: 'Thigh', knee: 'Knee',
  bottom: 'Bottom', length: 'Length', inseam: 'Inseam',
}

export function Measurements() {
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null)
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [formGarment, setFormGarment] = useState('Shirt')
  const [formNotes, setFormNotes] = useState('')

  const filteredCustomers = useMemo(() => {
    const withData = customers.filter((c) => measurements.some((m) => m.customerId === c.id))
    if (!search.trim()) return withData
    const q = search.toLowerCase()
    return withData.filter((c) => c.name.toLowerCase().includes(q) || c.phone.includes(q))
  }, [search])

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const customerMeasurements = measurements.filter((m) => m.customerId === selectedCustomerId)

  const applyTemplate = (templateName: string) => {
    const template = measurementTemplates.find((t) => t.name === templateName)
    if (!template) return
    setActiveTemplate(templateName)
    setShowTemplates(false)
    toast(`Template "${templateName}" applied`, 'info')
  }

  const openAdd = () => {
    setFormValues({})
    setFormGarment('Shirt')
    setFormNotes('')
    setActiveTemplate(null)
    setShowAdd(true)
  }

  const handleSave = () => {
    const filled = Object.values(formValues).filter((v) => v.trim()).length
    if (filled === 0) {
      toast('Please enter at least one measurement', 'error')
      return
    }
    setShowAdd(false)
    toast('Measurements saved successfully!', 'success')
  }

  const handleRefresh = useCallback(() => {
    setSearch('')
    toast('Measurements refreshed', 'success')
  }, [toast])

  // Detail view
  if (selectedCustomerId && selectedCustomer) {
    return (
      <div className="min-h-screen safe-top-px">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSelectedCustomerId(null)}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ChevronRight size={18} className="rotate-180 text-navy-700 dark:text-gray-300" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-navy-900 dark:text-gray-100">{selectedCustomer.name}</h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{customerMeasurements.length} saved sets</p>
          </div>
          <button
            onClick={openAdd}
            className="w-9 h-9 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center active:scale-90 transition-transform"
          >
            <Plus size={18} strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-4 py-4 space-y-4">
          {customerMeasurements.length === 0 ? (
            <EmptyState
              icon={Ruler}
              title="No measurements yet"
              description="Add a measurement set for this customer"
              actionLabel="Add Measurements"
              onAction={openAdd}
            />
          ) : (
            customerMeasurements.map((record, idx) => (
              <Card key={record.id} className="overflow-hidden animate-slide-up" style={{ animationDelay: `${idx * 60}ms` }}>
                {/* Card header */}
                <div className="p-4 bg-gradient-to-r from-navy-900 to-navy-700 dark:from-navy-700 dark:to-navy-600 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm">{record.garmentType}</p>
                    <p className="text-gray-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <Calendar size={11} /> {formatDate(record.date)}
                    </p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Ruler size={18} className="text-gold-400" />
                  </div>
                </div>

                <div className="p-4">
                  {/* Upper body */}
                  {Object.keys(record.upperBody).length > 0 && (
                    <div className="mb-4">
                      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <span className="w-1 h-3 rounded-full bg-blue-500" /> Upper Body
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {Object.entries(record.upperBody).map(([key, val]) => val !== undefined && (
                          <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-navy-700/30">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{upperLabels[key] || key}</span>
                            <span className="text-sm font-bold text-navy-900 dark:text-gray-100">{val}<span className="text-[10px] text-gray-400 ml-0.5">in</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Lower body */}
                  {Object.keys(record.lowerBody).length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <span className="w-1 h-3 rounded-full bg-purple-500" /> Lower Body
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {Object.entries(record.lowerBody).map(([key, val]) => val !== undefined && (
                          <div key={key} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-navy-700/30">
                            <span className="text-xs text-gray-500 dark:text-gray-400">{lowerLabels[key] || key}</span>
                            <span className="text-sm font-bold text-navy-900 dark:text-gray-100">{val}<span className="text-[10px] text-gray-400 ml-0.5">in</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {record.notes && (
                    <div className="mt-3 p-3 rounded-xl bg-gold-50 dark:bg-gold-500/10">
                      <p className="text-[10px] font-bold text-gold-700 dark:text-gold-400 uppercase mb-1">Notes</p>
                      <p className="text-xs text-navy-700 dark:text-gray-300">{record.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        <MeasurementForm
          open={showAdd}
          onClose={() => setShowAdd(false)}
          garment={formGarment}
          setGarment={setFormGarment}
          values={formValues}
          setValues={setFormValues}
          notes={formNotes}
          setNotes={setFormNotes}
          activeTemplate={activeTemplate}
          onOpenTemplates={() => setShowTemplates(true)}
          onSave={handleSave}
          customerName={selectedCustomer.name}
        />
        <TemplatesSheet
          open={showTemplates}
          onClose={() => setShowTemplates(false)}
          onApply={applyTemplate}
        />
      </div>
    )
  }

  // Customer list view
  return (
    <PullToRefresh onRefresh={handleRefresh}>
    <div className="px-4 pt-6 space-y-4 safe-top-px">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">Measurements</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{measurements.length} saved records</p>
        </div>
        <button
          onClick={openAdd}
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

      {/* Templates quick access */}
      <button
        onClick={() => setShowTemplates(true)}
        className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 active:scale-[0.98] transition-transform"
      >
        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
          <Layers size={18} className="text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Standard Templates</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{measurementTemplates.length} ready-to-use presets</p>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </button>

      {/* Customer list */}
      {filteredCustomers.length === 0 ? (
        <EmptyState icon={Search} title="No customers found" description="Try a different search term" />
      ) : (
        <div className="space-y-2.5">
          {filteredCustomers.map((c, i) => {
            const records = measurements.filter((m) => m.customerId === c.id)
            const latest = records[0]
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCustomerId(c.id)}
                className="block w-full text-left animate-slide-up active:scale-[0.98] transition-transform"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Card className="p-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.name} color={c.avatarColor} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{c.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">
                        {records.length} set{records.length > 1 ? 's' : ''} • Latest: {latest?.garmentType}
                      </p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-navy-700 flex items-center justify-center">
                      <Ruler size={14} className="text-gold-500" />
                    </div>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      )}

      <MeasurementForm
        open={showAdd}
        onClose={() => setShowAdd(false)}
        garment={formGarment}
        setGarment={setFormGarment}
        values={formValues}
        setValues={setFormValues}
        notes={formNotes}
        setNotes={setFormNotes}
        activeTemplate={activeTemplate}
        onOpenTemplates={() => setShowTemplates(true)}
        onSave={handleSave}
        customerName={null}
      />
      <TemplatesSheet
        open={showTemplates}
        onClose={() => setShowTemplates(false)}
        onApply={applyTemplate}
      />
    </div>
    </PullToRefresh>
  )
}

interface FormProps {
  open: boolean
  onClose: () => void
  garment: string
  setGarment: (v: string) => void
  values: Record<string, string>
  setValues: (v: Record<string, string>) => void
  notes: string
  setNotes: (v: string) => void
  activeTemplate: string | null
  onOpenTemplates: () => void
  onSave: () => void
  customerName: string | null
}

function MeasurementForm({
  open, onClose, garment, setGarment, values, setValues, notes, setNotes,
  activeTemplate, onOpenTemplates, onSave, customerName,
}: FormProps) {
  const allFields = [
    { key: 'chest', label: 'Chest', group: 'Upper Body' },
    { key: 'shoulder', label: 'Shoulder', group: 'Upper Body' },
    { key: 'sleeveLength', label: 'Sleeve Length', group: 'Upper Body' },
    { key: 'neck', label: 'Neck', group: 'Upper Body' },
    { key: 'waistShirt', label: 'Waist (Shirt)', group: 'Upper Body' },
    { key: 'fullLength', label: 'Full Length', group: 'Upper Body' },
    { key: 'bicep', label: 'Bicep', group: 'Upper Body' },
    { key: 'wrist', label: 'Wrist', group: 'Upper Body' },
    { key: 'waist', label: 'Waist', group: 'Lower Body' },
    { key: 'hip', label: 'Hip', group: 'Lower Body' },
    { key: 'thigh', label: 'Thigh', group: 'Lower Body' },
    { key: 'knee', label: 'Knee', group: 'Lower Body' },
    { key: 'bottom', label: 'Bottom', group: 'Lower Body' },
    { key: 'length', label: 'Length', group: 'Lower Body' },
    { key: 'inseam', label: 'Inseam', group: 'Lower Body' },
  ]

  return (
    <BottomSheet open={open} onClose={onClose} title="Add Measurements" maxHeight="90vh">
      <div className="space-y-4">
        {customerName && (
          <div className="p-3 rounded-xl bg-navy-900 dark:bg-navy-700 flex items-center gap-2.5">
            <Ruler size={16} className="text-gold-400" />
            <p className="text-sm text-white font-medium">For {customerName}</p>
          </div>
        )}

        {/* Garment type */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">Garment Type</label>
          <select
            value={garment}
            onChange={(e) => setGarment(e.target.value)}
            className="w-full rounded-xl bg-gray-50 dark:bg-navy-700/50 border border-gray-200 dark:border-navy-600/50 px-4 py-3 text-base text-navy-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
          >
            {['Shirt', 'Trouser', 'Kurta', 'Sherwani', 'Suit', 'Blazer', 'Salwar Suit', 'Lehenga', 'Pathani', 'Waistcoat', 'Formal Shirt', 'Designer Gown'].map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Template picker */}
        <button
          onClick={onOpenTemplates}
          className={cn(
            'w-full flex items-center gap-2.5 p-3 rounded-xl border-2 border-dashed transition-all active:scale-[0.98]',
            activeTemplate
              ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
              : 'border-gray-200 dark:border-navy-600',
          )}
        >
          <TrendingUp size={16} className={activeTemplate ? 'text-gold-500' : 'text-gray-400'} />
          <span className="text-sm font-medium text-navy-700 dark:text-gray-300 flex-1 text-left">
            {activeTemplate ? `Template: ${activeTemplate}` : 'Apply a standard template'}
          </span>
          {activeTemplate && (
            <span
              onClick={(e) => { e.stopPropagation() }}
              className="text-gray-400"
            >
              <X size={14} />
            </span>
          )}
        </button>

        {/* Upper body */}
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1 h-3 rounded-full bg-blue-500" /> Upper Body (inches)
          </p>
          <div className="grid grid-cols-2 gap-3">
            {allFields.filter((f) => f.group === 'Upper Body').map((f) => (
              <Input
                key={f.key}
                label={f.label}
                type="number"
                suffix="in"
                placeholder="0"
                value={values[f.key] || ''}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            ))}
          </div>
        </div>

        {/* Lower body */}
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1 h-3 rounded-full bg-purple-500" /> Lower Body (inches)
          </p>
          <div className="grid grid-cols-2 gap-3">
            {allFields.filter((f) => f.group === 'Lower Body').map((f) => (
              <Input
                key={f.key}
                label={f.label}
                type="number"
                suffix="in"
                placeholder="0"
                value={values[f.key] || ''}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
              />
            ))}
          </div>
        </div>

        <Textarea label="Extra Notes" placeholder="Special fitting requirements..." value={notes} onChange={(e) => setNotes(e.target.value)} />

        <Button fullWidth size="lg" variant="gold" onClick={onSave}>
          <Save size={18} /> Save Measurements
        </Button>
      </div>
    </BottomSheet>
  )
}

function TemplatesSheet({ open, onClose, onApply }: { open: boolean; onClose: () => void; onApply: (name: string) => void }) {
  return (
    <BottomSheet open={open} onClose={onClose} title="Standard Templates">
      <div className="space-y-2.5">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick-start presets for common garments</p>
        {measurementTemplates.map((t) => (
          <button
            key={t.name}
            onClick={() => onApply(t.name)}
            className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-navy-700/50 border border-gray-100 dark:border-navy-600/50 active:scale-[0.98] transition-transform text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/15 flex items-center justify-center">
              <Layers size={18} className="text-purple-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{t.name}</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">{t.fields.length} measurement fields</p>
            </div>
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
    </BottomSheet>
  )
}
