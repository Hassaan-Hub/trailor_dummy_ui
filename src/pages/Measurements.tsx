import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Ruler,
  Search,
  Plus,
  Calendar,
  Eye,
  Save,
  X,
  TrendingUp,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { EmptyState } from '@/components/ui/EmptyState'
import { Modal } from '@/components/ui/Modal'
import { Select, Textarea } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { customers, measurementRecords, shopSettings } from '@/data/mockData'
import { formatDate, cn } from '@/lib/utils'
import type { Measurements, GarmentType } from '@/types'

export function Measurements() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [search, setSearch] = useState('')
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  // Add modal state
  const [modalCustomerId, setModalCustomerId] = useState('')
  const [modalGarmentType, setModalGarmentType] = useState<GarmentType>('Shirt')
  const [modalMeasurements, setModalMeasurements] = useState<Measurements>({})
  const [modalNotes, setModalNotes] = useState('')

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )
  }, [search])

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const customerRecords = measurementRecords.filter(
    (r) => r.customerId === selectedCustomerId
  )

  const measurementFields: { key: keyof Measurements; label: string; group: 'upper' | 'lower' }[] = [
    { key: 'chest', label: 'Chest', group: 'upper' },
    { key: 'shoulder', label: 'Shoulder', group: 'upper' },
    { key: 'sleeveLength', label: 'Sleeve Length', group: 'upper' },
    { key: 'neck', label: 'Neck', group: 'upper' },
    { key: 'waistShirt', label: 'Waist (Shirt)', group: 'upper' },
    { key: 'fullLength', label: 'Full Length', group: 'upper' },
    { key: 'bicep', label: 'Bicep', group: 'upper' },
    { key: 'wrist', label: 'Wrist', group: 'upper' },
    { key: 'armhole', label: 'Armhole', group: 'upper' },
    { key: 'backLength', label: 'Back Length', group: 'upper' },
    { key: 'waist', label: 'Waist', group: 'lower' },
    { key: 'hip', label: 'Hip', group: 'lower' },
    { key: 'thigh', label: 'Thigh', group: 'lower' },
    { key: 'knee', label: 'Knee', group: 'lower' },
    { key: 'bottom', label: 'Bottom', group: 'lower' },
    { key: 'length', label: 'Length', group: 'lower' },
    { key: 'inseam', label: 'Inseam', group: 'lower' },
  ]

  const garmentTypes: GarmentType[] = ['Shirt', 'Trouser', 'Kurta', 'Pathani', 'Sherwani', 'Suit', 'Blazer', 'Salwar Suit', 'Lehenga', 'Coat', 'Waistcoat', 'Pant']

  const handleSaveMeasurement = () => {
    toast('Measurement record saved successfully!', 'success')
    setShowAddModal(false)
    setModalCustomerId('')
    setModalMeasurements({})
    setModalNotes('')
  }

  const renderMeasurementsGrid = (m: Measurements) => {
    const upper = measurementFields.filter((f) => f.group === 'upper')
    const lower = measurementFields.filter((f) => f.group === 'lower')

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-3">Upper Body</h4>
          <div className="grid grid-cols-2 gap-2">
            {upper.map((f) => (
              <div key={f.key} className="flex items-center justify-between bg-navy-50 dark:bg-navy-800/50 rounded-lg px-3 py-1.5">
                <span className="text-xs text-navy-500">{f.label}</span>
                <span className="text-sm font-medium text-navy-800 dark:text-navy-100">
                  {m[f.key] ? `${m[f.key]}"` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-navy-500 uppercase tracking-wider mb-3">Lower Body</h4>
          <div className="grid grid-cols-2 gap-2">
            {lower.map((f) => (
              <div key={f.key} className="flex items-center justify-between bg-navy-50 dark:bg-navy-800/50 rounded-lg px-3 py-1.5">
                <span className="text-xs text-navy-500">{f.label}</span>
                <span className="text-sm font-medium text-navy-800 dark:text-navy-100">
                  {m[f.key] ? `${m[f.key]}"` : '—'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Measurements</h1>
          <p className="text-sm text-navy-400 mt-1">
            Customer measurement history and templates
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus size={16} />
          Add Measurement
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="px-4 pb-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers..."
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                />
              </div>
            </div>
            <div className="max-h-[500px] overflow-y-auto">
              {filteredCustomers.map((c) => {
                const recordCount = measurementRecords.filter((r) => r.customerId === c.id).length
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCustomerId(c.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 hover:bg-navy-50 dark:hover:bg-navy-800/50 transition-colors cursor-pointer text-left border-b border-navy-50 dark:border-navy-800/50',
                      selectedCustomerId === c.id && 'bg-gold-50 dark:bg-gold-950/20'
                    )}
                  >
                    <Avatar name={c.name} color={c.avatarColor} size="md" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">{c.name}</p>
                      <p className="text-xs text-navy-400">{c.city}</p>
                    </div>
                    {recordCount > 0 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-navy-100 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                        {recordCount}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Measurement Detail */}
        <div className="lg:col-span-2">
          {!selectedCustomer ? (
            <Card>
              <EmptyState
                icon={<Ruler size={28} />}
                title="Select a customer"
                description="Choose a customer from the list to view their measurement history."
              />
            </Card>
          ) : customerRecords.length === 0 ? (
            <Card>
              <EmptyState
                icon={<Ruler size={28} />}
                title="No measurements yet"
                description={`No measurement records for ${selectedCustomer.name}.`}
                action={<Button onClick={() => setShowAddModal(true)}><Plus size={16} /> Add Measurement</Button>}
              />
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Customer info header */}
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedCustomer.name} color={selectedCustomer.avatarColor} size="lg" />
                  <div>
                    <h2 className="text-lg font-semibold text-navy-900 dark:text-white">{selectedCustomer.name}</h2>
                    <p className="text-sm text-navy-400">{selectedCustomer.phone} • {selectedCustomer.city}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-navy-900 dark:text-white">{customerRecords.length}</p>
                      <p className="text-xs text-navy-400">Records</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Measurement Records */}
              {customerRecords.map((record) => (
                <Card key={record.id}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-50 dark:bg-gold-950/30 text-gold-600 dark:text-gold-400">
                        <Ruler size={16} />
                      </div>
                      <div>
                        <CardTitle>{record.garmentType}</CardTitle>
                        <p className="text-xs text-navy-400 mt-0.5 flex items-center gap-1">
                          <Calendar size={12} />
                          {formatDate(record.date)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/customers/${selectedCustomer.id}`)}
                      className="text-navy-400 hover:text-gold-600 dark:hover:text-gold-400 cursor-pointer p-1.5 rounded-lg hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </CardHeader>
                  <CardContent>
                    {renderMeasurementsGrid(record.measurements)}
                    {record.measurements.notes && (
                      <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                          <strong>Note:</strong> {record.measurements.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Templates section */}
      <Card>
        <CardHeader>
          <CardTitle>Measurement Templates</CardTitle>
          <Button variant="outline" size="sm"><Save size={14} /> Save Template</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: 'Standard Shirt', fields: '10 fields', uses: 45 },
              { name: 'Slim Fit Trouser', fields: '7 fields', uses: 32 },
              { name: 'Wedding Sherwani', fields: '6 fields', uses: 18 },
              { name: 'Corporate Suit', fields: '10 fields', uses: 27 },
              { name: 'Traditional Kurta', fields: '5 fields', uses: 22 },
              { name: 'Salwar Suit (Female)', fields: '6 fields', uses: 15 },
            ].map((template) => (
              <div
                key={template.name}
                className="p-4 rounded-xl border border-navy-100 dark:border-navy-800 hover:border-gold-300 dark:hover:border-gold-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy-50 dark:bg-navy-800 text-navy-600 dark:text-navy-300">
                    <Ruler size={14} />
                  </div>
                  <span className="text-xs text-navy-400">{template.fields}</span>
                </div>
                <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{template.name}</p>
                <p className="text-xs text-navy-400 mt-1 flex items-center gap-1">
                  <TrendingUp size={10} />
                  Used {template.uses} times
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add Measurement Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Measurement Record"
        size="xl"
      >
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Customer"
              value={modalCustomerId}
              onChange={(e) => setModalCustomerId(e.target.value)}
            >
              <option value="">Select customer...</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
            <Select
              label="Garment Type"
              value={modalGarmentType}
              onChange={(e) => setModalGarmentType(e.target.value as GarmentType)}
            >
              {garmentTypes.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Select>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3">
              Upper Body Measurements ({shopSettings.measurementUnit})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {measurementFields.filter((f) => f.group === 'upper').map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">{f.label}</label>
                  <input
                    type="number"
                    step="0.25"
                    value={modalMeasurements[f.key] ?? ''}
                    onChange={(e) =>
                      setModalMeasurements({
                        ...modalMeasurements,
                        [f.key]: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="0.0"
                    className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-2.5 py-1.5 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3">
              Lower Body Measurements ({shopSettings.measurementUnit})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {measurementFields.filter((f) => f.group === 'lower').map((f) => (
                <div key={f.key}>
                  <label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">{f.label}</label>
                  <input
                    type="number"
                    step="0.25"
                    value={modalMeasurements[f.key] ?? ''}
                    onChange={(e) =>
                      setModalMeasurements({
                        ...modalMeasurements,
                        [f.key]: e.target.value ? parseFloat(e.target.value) : undefined,
                      })
                    }
                    placeholder="0.0"
                    className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-2.5 py-1.5 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>

          <Textarea
            label="Special Requirements / Notes"
            value={modalNotes}
            onChange={(e) => setModalNotes(e.target.value)}
            rows={2}
            placeholder="Any special fitting notes..."
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy-100 dark:border-navy-800">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              <X size={16} /> Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveMeasurement} disabled={!modalCustomerId}>
              <Save size={16} /> Save Measurement
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
