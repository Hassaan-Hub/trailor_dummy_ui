import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Store, Ruler, IndianRupee, Bell, Moon, Sun, Camera, Check } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Input, Select } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import { useTheme } from '@/context/ThemeContext'
import { shopSettings } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function Settings() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()

  const [shopName, setShopName] = useState(shopSettings.name)
  const [ownerName, setOwnerName] = useState(shopSettings.ownerName)
  const [phone, setPhone] = useState(shopSettings.phone)
  const [address, setAddress] = useState(shopSettings.address)
  const [unit, setUnit] = useState<'inches' | 'cm'>(shopSettings.measurementUnit)
  const [taxRate, setTaxRate] = useState(String(shopSettings.taxRate))

  const [toggles, setToggles] = useState({
    orderUpdates: true,
    trialReminders: true,
    lowStockAlerts: true,
    dailySummary: false,
  })

  const toggle = (key: keyof typeof toggles) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <div className="min-h-screen safe-top-px">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/more')} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-bold text-navy-900 dark:text-gray-100 flex-1">Settings</h1>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Shop logo */}
        <Card className="p-4 flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-navy-900 dark:bg-navy-700 flex items-center justify-center">
              <span className="font-display text-xl font-bold text-gold-400">S</span>
            </div>
            <button
              onClick={() => toast('Logo upload (demo only)', 'info')}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center active:scale-90 transition-transform"
            >
              <Camera size={12} className="text-navy-900" />
            </button>
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Shop Logo</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">Tap the camera to change</p>
          </div>
        </Card>

        {/* Shop details */}
        <div>
          <SectionTitle icon={Store} title="Shop Details" />
          <Card className="p-4 space-y-3.5">
            <Input label="Shop Name" value={shopName} onChange={(e) => setShopName(e.target.value)} />
            <Input label="Owner Name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
            <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Card>
        </div>

        {/* Preferences */}
        <div>
          <SectionTitle icon={Ruler} title="Preferences" />
          <Card className="p-4 space-y-3.5">
            <Select label="Measurement Unit" value={unit} onChange={(e) => setUnit(e.target.value as 'inches' | 'cm')}>
              <option value="inches">Inches (in)</option>
              <option value="cm">Centimeters (cm)</option>
            </Select>
            <Select label="Currency" defaultValue="INR">
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="AED">د.إ UAE Dirham (AED)</option>
            </Select>
            <Input label="Tax Rate (%)" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} suffix="%" />
          </Card>
        </div>

        {/* Appearance */}
        <div>
          <SectionTitle icon={theme === 'dark' ? Moon : Sun} title="Appearance" />
          <Card className="overflow-hidden">
            {(['light', 'dark'] as const).map((mode, i) => (
              <button
                key={mode}
                onClick={() => setTheme(mode)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 text-left active:bg-gray-50 dark:active:bg-navy-700/50 transition-colors',
                  i === 0 && 'border-b border-gray-50 dark:border-navy-700/30',
                )}
              >
                <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-navy-700 flex items-center justify-center">
                  {mode === 'light' ? <Sun size={17} className="text-gold-500" /> : <Moon size={17} className="text-navy-500 dark:text-gold-400" />}
                </div>
                <span className="flex-1 text-sm font-semibold text-navy-900 dark:text-gray-100 capitalize">{mode} Mode</span>
                {theme === mode && (
                  <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center">
                    <Check size={14} className="text-navy-900" strokeWidth={3} />
                  </div>
                )}
              </button>
            ))}
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <SectionTitle icon={Bell} title="Notifications" />
          <Card className="overflow-hidden">
            {([
              { key: 'orderUpdates', label: 'Order Status Updates', desc: 'When an order changes status' },
              { key: 'trialReminders', label: 'Trial Reminders', desc: 'Before scheduled fittings' },
              { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'When fabric runs low' },
              { key: 'dailySummary', label: 'Daily Summary', desc: 'End of day report' },
            ] as const).map((item, i, arr) => (
              <div
                key={item.key}
                className={cn(
                  'flex items-center gap-3 p-3.5',
                  i !== arr.length - 1 && 'border-b border-gray-50 dark:border-navy-700/30',
                )}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={cn(
                    'w-11 h-6 rounded-full p-0.5 transition-colors duration-200 shrink-0',
                    toggles[item.key] ? 'bg-gold-500' : 'bg-gray-300 dark:bg-navy-600',
                  )}
                >
                  <div className={cn(
                    'w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
                    toggles[item.key] ? 'translate-x-5' : 'translate-x-0',
                  )} />
                </button>
              </div>
            ))}
          </Card>
        </div>

        {/* Tax info */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-blue-50 dark:bg-blue-500/10">
          <IndianRupee size={18} className="text-blue-500 shrink-0" />
          <p className="text-[11px] text-blue-700 dark:text-blue-400">
            Tax of {taxRate}% applies to all orders. All values are demo placeholders.
          </p>
        </div>

        <Button fullWidth size="lg" variant="gold" onClick={() => toast('Settings saved successfully!', 'success')}>
          <Check size={18} /> Save Settings
        </Button>

        <p className="text-center text-[10px] text-gray-400 pb-4">StitchCraft v1.0.0 • Frontend Prototype</p>
      </div>
    </div>
  )
}

function SectionTitle({ icon: Icon, title }: { icon: typeof Store; title: string }) {
  return (
    <div className="flex items-center gap-1.5 mb-2 px-1">
      <Icon size={13} className="text-gold-500" />
      <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{title}</p>
    </div>
  )
}
