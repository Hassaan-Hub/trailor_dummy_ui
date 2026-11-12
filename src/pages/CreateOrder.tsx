import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Search,
  Plus,
  User as UserIcon,
  Shirt,
  Ruler,
  CheckCircle2,
  Package,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { ProgressSteps } from '@/components/ui/ProgressSteps'
import { useToast } from '@/components/ui/Toast'
import { customers, fabrics, garmentStyles } from '@/data/mockData'
import { formatCurrency, cn, formatDate } from '@/lib/utils'
import type { GarmentType, Priority } from '@/types'

const stepNames = ['Customer', 'Garment', 'Measurements', 'Fabric & Style', 'Review & Confirm']

export function CreateOrder() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [step, setStep] = useState(0)
  const [completed, setCompleted] = useState(false)

  // Step 1 state
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [showAddCustomer, setShowAddCustomer] = useState(false)

  // Step 2 state
  const [selectedGarment, setSelectedGarment] = useState<GarmentType | ''>('')

  // Step 3 state — measurements
  const [measurements, setMeasurements] = useState<Record<string, string>>({})

  // Step 4 state
  const [selectedFabricId, setSelectedFabricId] = useState('')
  const [styleNotes, setStyleNotes] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})

  // Step 5 state
  const [deliveryDate, setDeliveryDate] = useState('')
  const [priority, setPriority] = useState<Priority>('Normal')
  const [orderNotes, setOrderNotes] = useState('')

  // Derived values
  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const selectedStyle = garmentStyles.find((s) => s.type === selectedGarment)
  const selectedFabric = fabrics.find((f) => f.id === selectedFabricId)

  const fabricCost = selectedFabric ? selectedFabric.pricePerMeter * 3 : 0 // ~3 meters
  const garmentPrice = selectedStyle?.basePrice || 0
  const priorityMultiplier = priority === 'Urgent' ? 1.2 : priority === 'High' ? 1.1 : 1
  const totalAmount = Math.round((garmentPrice + fabricCost) * priorityMultiplier)

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(customerSearch.toLowerCase()) || c.phone.includes(customerSearch),
  )

  const measurementFields = selectedGarment
    ? garmentStyles.find((s) => s.type === selectedGarment)?.type.includes('Trouser') || selectedGarment === 'Pathani'
      ? [
          { key: 'waist', label: 'Waist', group: 'lower' },
          { key: 'hip', label: 'Hip', group: 'lower' },
          { key: 'thigh', label: 'Thigh', group: 'lower' },
          { key: 'knee', label: 'Knee', group: 'lower' },
          { key: 'bottom', label: 'Bottom', group: 'lower' },
          { key: 'length', label: 'Length', group: 'lower' },
          { key: 'inseam', label: 'Inseam', group: 'lower' },
        ]
      : selectedGarment === 'Lehenga' || selectedGarment === 'Salwar Suit' || selectedGarment === 'Designer Gown'
      ? [
          { key: 'chest', label: 'Chest', group: 'upper' },
          { key: 'waist', label: 'Waist', group: 'lower' },
          { key: 'hip', label: 'Hip', group: 'lower' },
          { key: 'shoulder', label: 'Shoulder', group: 'upper' },
          { key: 'fullLength', label: 'Full Length', group: 'upper' },
          { key: 'sleeveLength', label: 'Sleeve Length', group: 'upper' },
        ]
      : [
          { key: 'chest', label: 'Chest', group: 'upper' },
          { key: 'shoulder', label: 'Shoulder', group: 'upper' },
          { key: 'sleeveLength', label: 'Sleeve Length', group: 'upper' },
          { key: 'neck', label: 'Neck', group: 'upper' },
          { key: 'waistShirt', label: 'Waist (Shirt)', group: 'upper' },
          { key: 'fullLength', label: 'Full Length', group: 'upper' },
          { key: 'bicep', label: 'Bicep', group: 'upper' },
          { key: 'wrist', label: 'Wrist', group: 'upper' },
          { key: 'waist', label: 'Waist (Trouser)', group: 'lower' },
          { key: 'hip', label: 'Hip', group: 'lower' },
          { key: 'thigh', label: 'Thigh', group: 'lower' },
          { key: 'length', label: 'Trouser Length', group: 'lower' },
        ]
    : []

  const canProceed = () => {
    if (step === 0) return !!selectedCustomerId
    if (step === 1) return !!selectedGarment
    if (step === 2) return measurementFields.some((f) => measurements[f.key]?.trim())
    if (step === 3) return !!selectedFabricId
    if (step === 4) return !!deliveryDate
    return true
  }

  const handleNext = () => {
    if (step < stepNames.length - 1) {
      setStep(step + 1)
    } else {
      // Submit
      setCompleted(true)
      toast('Order created successfully!', 'success')
    }
  }

  const handleBack = () => {
    if (step === 0) {
      navigate(-1)
    } else {
      setStep(step - 1)
    }
  }

  // Success screen
  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex flex-col items-center justify-center px-6 text-center safe-top-px">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-500/15 flex items-center justify-center mb-5 animate-scale-in">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>
        <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">Order Created!</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xs">
          Order for {selectedCustomer?.name} ({selectedGarment}) has been created successfully.
        </p>

        {/* Summary */}
        <div className="w-full max-w-sm mt-5 bg-white dark:bg-navy-800 rounded-2xl p-4 space-y-2 text-left">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Order ID</span>
            <span className="font-bold text-navy-900 dark:text-gray-100">ORD-{Math.floor(Math.random() * 900 + 100)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Delivery</span>
            <span className="font-bold text-navy-900 dark:text-gray-100">{formatDate(deliveryDate)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Total Amount</span>
            <span className="font-bold text-gold-600 dark:text-gold-400">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6 w-full max-w-sm">
          <Button variant="secondary" fullWidth onClick={() => navigate('/orders')}>
            View Orders
          </Button>
          <Button variant="gold" fullWidth onClick={() => navigate('/')}>
            Go Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 safe-top-px flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform"
          >
            <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
          </button>
          <div className="flex-1">
            <h1 className="text-base font-bold text-navy-900 dark:text-gray-100">New Order</h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">{shopName()}</p>
          </div>
        </div>
        <ProgressSteps steps={stepNames} currentStep={step} />
      </div>

      {/* Step content */}
      <div className="flex-1 px-4 py-5 pb-24">
        {/* Step 0: Customer Selection */}
        {step === 0 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3">
                <UserIcon size={26} className="text-gold-400" />
              </div>
              <h2 className="text-base font-bold text-navy-900 dark:text-gray-100">Select Customer</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose existing or add new</p>
            </div>

            <div className="relative">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 pl-11 pr-4 py-3 text-sm text-navy-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
              />
            </div>

            <button
              onClick={() => setShowAddCustomer(true)}
              className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-gold-50 dark:bg-gold-500/10 border border-dashed border-gold-300 dark:border-gold-500/30 active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center">
                <Plus size={20} className="text-navy-900" />
              </div>
              <span className="text-sm font-semibold text-gold-700 dark:text-gold-400">Add New Customer</span>
            </button>

            <div className="space-y-2">
              {filteredCustomers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCustomerId(c.id)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all active:scale-[0.98]',
                    selectedCustomerId === c.id
                      ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                      : 'border-transparent bg-white dark:bg-navy-800',
                  )}
                >
                  <Avatar name={c.name} color={c.avatarColor} size="md" />
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{c.name}</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">{c.phone} • {c.totalOrders} orders</p>
                  </div>
                  {selectedCustomerId === c.id && (
                    <Check size={18} className="text-gold-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Garment Selection */}
        {step === 1 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3">
                <Shirt size={26} className="text-gold-400" />
              </div>
              <h2 className="text-base font-bold text-navy-900 dark:text-gray-100">Choose Garment</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">What will you tailor?</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {garmentStyles.map((gs) => (
                <button
                  key={gs.id}
                  onClick={() => setSelectedGarment(gs.type)}
                  className={cn(
                    'p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.97]',
                    selectedGarment === gs.type
                      ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                      : 'border-transparent bg-white dark:bg-navy-800',
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center mb-2',
                    selectedGarment === gs.type ? 'bg-gold-500' : 'bg-gray-100 dark:bg-navy-700',
                  )}>
                    <Shirt size={18} className={selectedGarment === gs.type ? 'text-navy-900' : 'text-gray-500 dark:text-gray-400'} />
                  </div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{gs.type}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">from {formatCurrency(gs.basePrice)}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Measurements */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3">
                <Ruler size={26} className="text-gold-400" />
              </div>
              <h2 className="text-base font-bold text-navy-900 dark:text-gray-100">Enter Measurements</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">For {selectedGarment} (in inches)</p>
            </div>

            {/* Quick fill for demo */}
            <button
              onClick={() => {
                const sample: Record<string, string> = {
                  chest: '40', shoulder: '18', sleeveLength: '24.5', neck: '16',
                  waistShirt: '36', fullLength: '30', bicep: '13', wrist: '9',
                  waist: '34', hip: '40', thigh: '23', knee: '16', bottom: '16',
                  length: '42', inseam: '32',
                }
                setMeasurements({ ...measurements, ...sample })
                toast('Sample measurements filled', 'info')
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-dashed border-purple-300 dark:border-purple-500/30 text-xs font-semibold text-purple-700 dark:text-purple-400 active:scale-[0.98] transition-transform"
            >
              <Ruler size={14} /> Fill sample measurements (demo)
            </button>

            {/* Upper body */}
            {measurementFields.some((f) => f.group === 'upper') && (
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <span className="w-1 h-3 rounded-full bg-blue-500" /> Upper Body
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {measurementFields.filter((f) => f.group === 'upper').map((field) => (
                    <Input
                      key={field.key}
                      label={field.label}
                      type="number"
                      suffix="in"
                      placeholder="0"
                      value={measurements[field.key] || ''}
                      onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lower body */}
            {measurementFields.some((f) => f.group === 'lower') && (
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 flex items-center gap-1.5 mt-2">
                  <span className="w-1 h-3 rounded-full bg-purple-500" /> Lower Body
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {measurementFields.filter((f) => f.group === 'lower').map((field) => (
                    <Input
                      key={field.key}
                      label={field.label}
                      type="number"
                      suffix="in"
                      placeholder="0"
                      value={measurements[field.key] || ''}
                      onChange={(e) => setMeasurements({ ...measurements, [field.key]: e.target.value })}
                    />
                  ))}
                </div>
              </div>
            )}

            <Textarea
              label="Special Requirements"
              placeholder="Any special fitting notes, preferences, etc."
              value={measurements.notes || ''}
              onChange={(e) => setMeasurements({ ...measurements, notes: e.target.value })}
            />
          </div>
        )}

        {/* Step 3: Fabric & Style */}
        {step === 3 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3">
                <Package size={26} className="text-gold-400" />
              </div>
              <h2 className="text-base font-bold text-navy-900 dark:text-gray-100">Fabric & Style</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose fabric and customize</p>
            </div>

            {/* Fabric selection */}
            <div>
              <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Select Fabric</p>
              <div className="space-y-2">
                {fabrics.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFabricId(f.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all active:scale-[0.98]',
                      selectedFabricId === f.id
                        ? 'border-gold-500 bg-gold-50 dark:bg-gold-500/10'
                        : 'border-transparent bg-white dark:bg-navy-800',
                    )}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-200 to-gray-300 dark:from-navy-600 dark:to-navy-500 flex items-center justify-center">
                      <Package size={18} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{f.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400">{f.color} • {f.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-navy-900 dark:text-gray-100">{formatCurrency(f.pricePerMeter)}</p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400">per meter</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style options */}
            {selectedStyle && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mt-2">Style Options</p>
                {Object.entries(selectedStyle.styleOptions).map(([category, options]) => (
                  options && options.length > 0 ? (
                    <div key={category}>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 capitalize">
                        {category}
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {options.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setSelectedOptions({ ...selectedOptions, [category]: opt })}
                            className={cn(
                              'px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95',
                              selectedOptions[category] === opt
                                ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                                : 'bg-gray-100 dark:bg-navy-700 text-gray-600 dark:text-gray-400',
                            )}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            )}

            <Textarea
              label="Style Notes"
              placeholder="Embroidery details, design preferences, etc."
              value={styleNotes}
              onChange={(e) => setStyleNotes(e.target.value)}
            />
          </div>
        )}

        {/* Step 4: Review & Confirm */}
        {step === 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center mx-auto mb-3">
                <Check size={26} className="text-gold-400" />
              </div>
              <h2 className="text-base font-bold text-navy-900 dark:text-gray-100">Review & Confirm</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Final details for this order</p>
            </div>

            {/* Delivery date */}
            <Input
              label="Delivery Date"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
            />

            {/* Priority */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Low', 'Normal', 'High', 'Urgent'] as Priority[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={cn(
                      'py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95',
                      priority === p
                        ? p === 'Urgent'
                          ? 'bg-red-500 text-white'
                          : p === 'High'
                          ? 'bg-orange-500 text-white'
                          : p === 'Normal'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-400 text-white'
                        : 'bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400',
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="Order Notes"
              placeholder="Any additional notes for this order..."
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
            />

            {/* Order Summary */}
            <div className="rounded-2xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 p-4 space-y-3">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Order Summary</h3>

              <div className="flex items-center gap-3 pb-3 border-b border-gray-50 dark:border-navy-700/30">
                <Avatar name={selectedCustomer?.name || ''} color={selectedCustomer?.avatarColor} size="md" />
                <div>
                  <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{selectedCustomer?.name}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{selectedCustomer?.phone}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-sm">
                <Row label="Garment" value={selectedGarment || '-'} />
                <Row label="Fabric" value={selectedFabric?.name || '-'} />
                <Row label="Garment Price" value={formatCurrency(garmentPrice)} />
                <Row label="Fabric (3m)" value={formatCurrency(fabricCost)} />
                {priorityMultiplier > 1 && (
                  <Row label={`Priority (${priority})`} value={`+${Math.round((priorityMultiplier - 1) * 100)}%`} />
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-navy-700/30">
                <span className="text-sm font-bold text-navy-900 dark:text-gray-100">Total</span>
                <span className="text-lg font-bold text-gold-600 dark:text-gold-400">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky bottom button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-navy-800 border-t border-gray-100 dark:border-navy-700/50 px-4 py-3 safe-bottom-px">
        <div className="flex items-center gap-3">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-navy-700 flex items-center justify-center shrink-0 active:scale-95 transition-transform"
            >
              <ArrowLeft size={20} className="text-navy-700 dark:text-gray-300" />
            </button>
          )}
          <Button
            variant={step === stepNames.length - 1 ? 'gold' : 'primary'}
            size="lg"
            fullWidth
            disabled={!canProceed()}
            onClick={handleNext}
            className={cn(!canProceed() && 'opacity-50')}
          >
            {step === stepNames.length - 1 ? (
              <>Confirm Order <Check size={18} /></>
            ) : (
              <>Next <ArrowRight size={18} /></>
            )}
          </Button>
        </div>
      </div>

      {/* Add Customer Sheet */}
      <BottomSheet open={showAddCustomer} onClose={() => setShowAddCustomer(false)} title="Add New Customer">
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter name" />
          <Input label="Phone" placeholder="+91 98765 43210" type="tel" />
          <Input label="City" placeholder="Mumbai" />
          <Button
            fullWidth
            size="lg"
            onClick={() => {
              setShowAddCustomer(false)
              toast('Customer added! Select to continue.', 'success')
            }}
          >
            Save & Continue
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-navy-700 dark:text-gray-300">{value}</span>
    </div>
  )
}

function shopName() {
  return 'StitchCraft Tailors'
}
