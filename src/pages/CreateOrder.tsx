import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Check,
  User,
  Shirt,
  Ruler,
  Palette,
  ClipboardList,
  Plus,
  Search,
  Calendar,
  Flag,
  IndianRupee,
  CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input, Select, Textarea } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { useToast } from '@/components/ui/Toast'
import { customers, fabrics, garmentStyles, shopSettings } from '@/data/mockData'
import { formatCurrency, cn } from '@/lib/utils'
import type { GarmentType, Measurements, Priority, Customer } from '@/types'

const steps = [
  { number: 1, label: 'Customer', icon: User },
  { number: 2, label: 'Garment', icon: Shirt },
  { number: 3, label: 'Measurements', icon: Ruler },
  { number: 4, label: 'Fabric & Style', icon: Palette },
  { number: 5, label: 'Summary', icon: ClipboardList },
]

export function CreateOrder() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)

  // Form state
  const [selectedCustomerId, setSelectedCustomerId] = useState('')
  const [customerSearch, setCustomerSearch] = useState('')
  const [showNewCustomer, setShowNewCustomer] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', address: '', city: '' })

  const [selectedStyleId, setSelectedStyleId] = useState('')

  const [measurements, setMeasurements] = useState<Measurements>({})
  const [measurementNotes, setMeasurementNotes] = useState('')

  const [selectedFabricId, setSelectedFabricId] = useState('')
  const [styleDetails, setStyleDetails] = useState('')
  const [selectedCollar, setSelectedCollar] = useState('')
  const [selectedCuff, setSelectedCuff] = useState('')

  const [deliveryDate, setDeliveryDate] = useState('')
  const [trialDate, setTrialDate] = useState('')
  const [priority, setPriority] = useState<Priority>('Normal')
  const [notes, setNotes] = useState('')
  const [advancePaid, setAdvancePaid] = useState(0)

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch)
  )

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId)
  const selectedStyle = garmentStyles.find((s) => s.id === selectedStyleId)
  const selectedFabric = fabrics.find((f) => f.id === selectedFabricId)

  const unitPrice = selectedStyle?.basePrice || 0
  const fabricCost = selectedFabric ? selectedFabric.pricePerMeter * 3 : 0
  const totalAmount = unitPrice + fabricCost
  const balance = totalAmount - advancePaid

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!selectedCustomerId || (!!newCustomer.name && !!newCustomer.phone)
      case 2:
        return !!selectedStyleId
      case 3:
        return true
      case 4:
        return true
      case 5:
        return !!deliveryDate
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    toast('Order created successfully! Order ID: ORD' + Math.floor(Math.random() * 900 + 100), 'success')
    setTimeout(() => navigate('/orders'), 1500)
  }

  const handleSelectGarment = (garment: GarmentType) => {
    const style = garmentStyles.find((s) => s.type === garment)
    if (style) {
      setSelectedStyleId(style.id)
    }
  }

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

  const upperFields = measurementFields.filter((f) => f.group === 'upper')
  const lowerFields = measurementFields.filter((f) => f.group === 'lower')

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/orders')}
            className="text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Create New Order</h1>
            <p className="text-sm text-navy-400 mt-0.5">Fill in the details step by step</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-between bg-white dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-800 p-4">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full transition-all shrink-0',
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-gold-500 text-white shadow-md ring-4 ring-gold-100 dark:ring-gold-900/30'
                        : 'bg-navy-100 dark:bg-navy-800 text-navy-400'
                    )}
                  >
                    {currentStep > step.number ? <Check size={18} /> : <step.icon size={18} />}
                  </div>
                  <span className={cn(
                    'text-xs font-medium hidden sm:block',
                    currentStep >= step.number ? 'text-navy-700 dark:text-navy-200' : 'text-navy-400'
                  )}>
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-0.5 mx-2 transition-all',
                    currentStep > step.number ? 'bg-green-500' : 'bg-navy-100 dark:bg-navy-800'
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="bg-white dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-800 p-6 min-h-[400px]">
            {/* Step 1: Customer */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-in">
                <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Select Customer</h2>

                {!showNewCustomer ? (
                  <>
                    <div className="relative max-w-md">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
                      <input
                        type="text"
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        placeholder="Search customers by name or phone..."
                        className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto">
                      {filteredCustomers.map((c: Customer) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCustomerId(c.id)}
                          className={cn(
                            'flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer text-left',
                            selectedCustomerId === c.id
                              ? 'border-gold-400 bg-gold-50 dark:bg-gold-950/20'
                              : 'border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700'
                          )}
                        >
                          <Avatar name={c.name} color={c.avatarColor} size="md" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">{c.name}</p>
                            <p className="text-xs text-navy-400 truncate">{c.phone}</p>
                            <p className="text-xs text-navy-400 truncate">{c.city}</p>
                          </div>
                          {selectedCustomerId === c.id && (
                            <CheckCircle2 size={18} className="text-gold-500 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowNewCustomer(true)}
                      className="flex items-center gap-2 text-sm text-gold-600 dark:text-gold-400 font-medium hover:underline cursor-pointer"
                    >
                      <Plus size={16} /> Or create a new customer
                    </button>
                  </>
                ) : (
                  <div className="space-y-4 max-w-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-navy-800 dark:text-navy-100">New Customer Details</h3>
                      <button
                        onClick={() => setShowNewCustomer(false)}
                        className="text-sm text-navy-400 hover:text-navy-600 cursor-pointer"
                      >
                        ← Select existing
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="Full Name *" value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} placeholder="e.g. Rahul Verma" />
                      <Input label="Phone *" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} placeholder="+91 98765 43210" />
                      <Input label="Email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} placeholder="email@example.com" />
                      <Input label="City" value={newCustomer.city} onChange={(e) => setNewCustomer({ ...newCustomer, city: e.target.value })} placeholder="Mumbai" />
                    </div>
                    <Input label="Address" value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} placeholder="Full address" />
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Garment */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-in">
                <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Select Garment Type</h2>
                <p className="text-sm text-navy-400">Choose the garment you want to tailor</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {garmentStyles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => handleSelectGarment(style.type)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer text-center',
                        selectedStyleId === style.id
                          ? 'border-gold-400 bg-gold-50 dark:bg-gold-950/20'
                          : 'border-navy-100 dark:border-navy-800 hover:border-navy-300 dark:hover:border-navy-700'
                      )}
                    >
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-xl shrink-0"
                        style={{ backgroundColor: style.imageColor }}
                      >
                        <Shirt size={24} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{style.type}</p>
                        <p className="text-xs text-navy-400 mt-0.5">{style.priceRange}</p>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedStyle && (
                  <div className="bg-navy-50 dark:bg-navy-800/50 rounded-lg p-4 mt-4">
                    <h3 className="text-sm font-semibold text-navy-800 dark:text-navy-100 mb-1">{selectedStyle.name}</h3>
                    <p className="text-sm text-navy-500 dark:text-navy-300">{selectedStyle.description}</p>
                    <p className="text-sm font-medium text-gold-600 dark:text-gold-400 mt-2">
                      Base Price: {formatCurrency(selectedStyle.basePrice)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Measurements */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-in">
                <div>
                  <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Detailed Measurements</h2>
                  <p className="text-sm text-navy-400 mt-0.5">
                    All measurements in {shopSettings.measurementUnit}. Use decimals for precision.
                  </p>
                </div>

                {/* Upper Body */}
                <div>
                  <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-gold-500" />
                    Upper Body Measurements
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {upperFields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          value={measurements[field.key] ?? ''}
                          onChange={(e) =>
                            setMeasurements({
                              ...measurements,
                              [field.key]: e.target.value ? parseFloat(e.target.value) : undefined,
                            })
                          }
                          placeholder="0.0"
                          className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-2.5 py-1.5 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-300 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lower Body */}
                <div>
                  <h3 className="text-sm font-semibold text-navy-700 dark:text-navy-200 mb-3 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-navy-500" />
                    Lower Body Measurements
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {lowerFields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-xs font-medium text-navy-600 dark:text-navy-300 mb-1">
                          {field.label}
                        </label>
                        <input
                          type="number"
                          step="0.25"
                          value={measurements[field.key] ?? ''}
                          onChange={(e) =>
                            setMeasurements({
                              ...measurements,
                              [field.key]: e.target.value ? parseFloat(e.target.value) : undefined,
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
                  value={measurementNotes}
                  onChange={(e) => setMeasurementNotes(e.target.value)}
                  rows={2}
                  placeholder="e.g. Extra loose on waist, right arm slightly longer, etc."
                />
              </div>
            )}

            {/* Step 4: Fabric & Style */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-in">
                <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Fabric & Style Details</h2>

                {/* Fabric Selection */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                    Select Fabric
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                    {fabrics.map((fabric) => (
                      <button
                        key={fabric.id}
                        onClick={() => setSelectedFabricId(fabric.id)}
                        className={cn(
                          'flex items-center justify-between p-3 rounded-lg border-2 transition-all cursor-pointer text-left',
                          selectedFabricId === fabric.id
                            ? 'border-gold-400 bg-gold-50 dark:bg-gold-950/20'
                            : 'border-navy-100 dark:border-navy-800 hover:border-navy-300'
                        )}
                      >
                        <div>
                          <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{fabric.name}</p>
                          <p className="text-xs text-navy-400">{fabric.type} • {fabric.color}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-navy-700 dark:text-navy-200">
                            {formatCurrency(fabric.pricePerMeter)}/m
                          </p>
                          <p className={cn(
                            'text-xs',
                            fabric.stockMeters <= fabric.lowStockThreshold ? 'text-red-500' : 'text-navy-400'
                          )}>
                            {fabric.stockMeters}m in stock
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Options */}
                {selectedStyle && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedStyle.styleOptions.collars && (
                        <Select
                          label="Collar Type"
                          value={selectedCollar}
                          onChange={(e) => setSelectedCollar(e.target.value)}
                        >
                          <option value="">Select collar...</option>
                          {selectedStyle.styleOptions.collars.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </Select>
                      )}
                      {selectedStyle.styleOptions.cuffs && (
                        <Select
                          label="Cuff Type"
                          value={selectedCuff}
                          onChange={(e) => setSelectedCuff(e.target.value)}
                        >
                          <option value="">Select cuff...</option>
                          {selectedStyle.styleOptions.cuffs.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </Select>
                      )}
                    </div>

                    <Textarea
                      label="Additional Style Details"
                      value={styleDetails}
                      onChange={(e) => setStyleDetails(e.target.value)}
                      rows={3}
                      placeholder="e.g. Slim fit, single chest pocket, back darts, etc."
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Summary */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-in">
                <h2 className="text-lg font-semibold text-navy-900 dark:text-white">Delivery & Final Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                      <Calendar size={14} className="inline mr-1" />
                      Delivery Date *
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                      <Calendar size={14} className="inline mr-1" />
                      Trial Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={trialDate}
                      onChange={(e) => setTrialDate(e.target.value)}
                      className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-2">
                    <Flag size={14} className="inline mr-1" />
                    Priority
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['Low', 'Normal', 'High', 'Urgent'] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={cn(
                          'py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border-2',
                          priority === p
                            ? p === 'Urgent'
                              ? 'border-red-400 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-300'
                              : p === 'High'
                              ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300'
                              : p === 'Normal'
                              ? 'border-blue-400 bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                              : 'border-gray-300 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                            : 'border-navy-100 dark:border-navy-800 text-navy-500 hover:border-navy-300'
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Advance Paid (₹)"
                    type="number"
                    value={advancePaid || ''}
                    onChange={(e) => setAdvancePaid(e.target.value ? parseInt(e.target.value) : 0)}
                    placeholder="0"
                    hint={`Balance: ${formatCurrency(balance)}`}
                  />
                </div>

                <Textarea
                  label="Order Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Any additional notes for this order..."
                />
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-navy-100 dark:border-navy-800">
              <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
                <ChevronLeft size={16} />
                Previous
              </Button>
              {currentStep < 5 ? (
                <Button variant="primary" onClick={handleNext} disabled={!canProceed()}>
                  Next
                  <ChevronRight size={16} />
                </Button>
              ) : (
                <Button variant="primary" onClick={handleSubmit} disabled={!deliveryDate}>
                  <Check size={16} />
                  Create Order
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Live Summary Sidebar */}
        <div className="lg:sticky lg:top-20 h-fit">
          <div className="bg-white dark:bg-navy-900 rounded-xl border border-navy-100 dark:border-navy-800 p-5 space-y-4">
            <h3 className="text-base font-semibold text-navy-900 dark:text-white flex items-center gap-2">
              <ClipboardList size={18} className="text-gold-500" />
              Order Summary
            </h3>

            {/* Customer */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Customer</p>
              {selectedCustomer ? (
                <div className="flex items-center gap-2">
                  <Avatar name={selectedCustomer.name} color={selectedCustomer.avatarColor} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{selectedCustomer.name}</p>
                    <p className="text-xs text-navy-400">{selectedCustomer.phone}</p>
                  </div>
                </div>
              ) : newCustomer.name ? (
                <div className="flex items-center gap-2">
                  <Avatar name={newCustomer.name} size="sm" />
                  <div>
                    <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{newCustomer.name}</p>
                    <p className="text-xs text-navy-400">{newCustomer.phone}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-navy-300 italic">Not selected</p>
              )}
            </div>

            <hr className="border-navy-100 dark:border-navy-800" />

            {/* Garment */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Garment</p>
              {selectedStyle ? (
                <>
                  <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{selectedStyle.type}</p>
                  <p className="text-xs text-navy-400">{selectedStyle.name}</p>
                </>
              ) : (
                <p className="text-sm text-navy-300 italic">Not selected</p>
              )}
            </div>

            <hr className="border-navy-100 dark:border-navy-800" />

            {/* Fabric */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Fabric</p>
              {selectedFabric ? (
                <>
                  <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{selectedFabric.name}</p>
                  <p className="text-xs text-navy-400">{selectedFabric.color} • {formatCurrency(selectedFabric.pricePerMeter)}/m</p>
                </>
              ) : (
                <p className="text-sm text-navy-300 italic">Not selected</p>
              )}
            </div>

            <hr className="border-navy-100 dark:border-navy-800" />

            {/* Measurements count */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Measurements</p>
              <p className="text-sm text-navy-700 dark:text-navy-200">
                {Object.values(measurements).filter((v) => v !== undefined).length} fields filled
              </p>
            </div>

            <hr className="border-navy-100 dark:border-navy-800" />

            {/* Delivery */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-navy-400 uppercase tracking-wider">Delivery</p>
              <p className="text-sm text-navy-700 dark:text-navy-200">
                {deliveryDate ? new Date(deliveryDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not set'}
              </p>
              {priority && (
                <span className={cn(
                  'inline-block text-xs px-2 py-0.5 rounded mt-1',
                  priority === 'Urgent' ? 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300' :
                  priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300' :
                  priority === 'Normal' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' :
                  'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                )}>
                  {priority} priority
                </span>
              )}
            </div>

            <hr className="border-navy-100 dark:border-navy-800" />

            {/* Price */}
            <div className="space-y-2 bg-navy-50 dark:bg-navy-800/50 rounded-lg p-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500">Garment Base</span>
                <span className="font-medium text-navy-800 dark:text-navy-100">{formatCurrency(unitPrice)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500">Fabric (3m)</span>
                <span className="font-medium text-navy-800 dark:text-navy-100">{formatCurrency(fabricCost)}</span>
              </div>
              <hr className="border-navy-200 dark:border-navy-700" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-navy-700 dark:text-navy-200">Total</span>
                <span className="text-lg font-bold text-gold-600 dark:text-gold-400">{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500 flex items-center gap-1"><IndianRupee size={12} /> Advance</span>
                <span className="font-medium text-green-600">{formatCurrency(advancePaid)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-navy-500">Balance</span>
                <span className="font-medium text-navy-800 dark:text-navy-100">{formatCurrency(balance)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
