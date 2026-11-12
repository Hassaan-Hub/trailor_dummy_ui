import { useState } from 'react'
import {
  Store,
  User,
  Ruler,
  IndianRupee,
  Save,
  Upload,
  Bell,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'
import { useTheme } from '@/context/ThemeContext'
import { shopSettings } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function Settings() {
  const { toast } = useToast()
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState(shopSettings)
  const [notifSettings, setNotifSettings] = useState({
    orderUpdates: true,
    trialReminders: true,
    lowStockAlerts: true,
    deliveryReminders: false,
  })

  const handleSave = () => {
    toast('Settings saved successfully!', 'success')
  }

  return (
    <div className="space-y-6 animate-in max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">Settings</h1>
        <p className="text-sm text-navy-400 mt-1">Manage your shop details and preferences</p>
      </div>

      {/* Shop Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store size={18} className="text-gold-500" />
            Shop Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-navy-800 text-white text-xl font-bold shrink-0">
              {settings.logoText}
            </div>
            <div>
              <Button variant="outline" size="sm">
                <Upload size={14} /> Upload Logo
              </Button>
              <p className="text-xs text-navy-400 mt-1">PNG or JPG, max 2MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Shop Name"
              value={settings.shopName}
              onChange={(e) => setSettings({ ...settings, shopName: e.target.value })}
            />
            <Input
              label="Owner Name"
              value={settings.ownerName}
              onChange={(e) => setSettings({ ...settings, ownerName: e.target.value })}
            />
            <Input
              label="Phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
            <Input
              label="Email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
            <Input
              label="Address"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="sm:col-span-2"
            />
            <Input
              label="City"
              value={settings.city}
              onChange={(e) => setSettings({ ...settings, city: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Measurement & Currency */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ruler size={18} className="text-gold-500" />
            Measurement & Currency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Measurement Unit"
              value={settings.measurementUnit}
              onChange={(e) => setSettings({ ...settings, measurementUnit: e.target.value as 'inches' | 'cm' })}
            >
              <option value="inches">Inches (")</option>
              <option value="cm">Centimeters (cm)</option>
            </Select>
            <Select
              label="Currency"
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
            </Select>
            <div>
              <label className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5">
                <IndianRupee size={14} className="inline mr-1" />
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={18} className="text-gold-500" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { key: 'orderUpdates', label: 'Order status updates', desc: 'Get notified when order status changes' },
            { key: 'trialReminders', label: 'Trial reminders', desc: 'Send automatic trial date reminders' },
            { key: 'lowStockAlerts', label: 'Low stock alerts', desc: 'Alert when fabric stock is low' },
            { key: 'deliveryReminders', label: 'Delivery reminders', desc: 'Send delivery date reminders to customers' },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between py-2"
            >
              <div>
                <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{item.label}</p>
                <p className="text-xs text-navy-400">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifSettings({
                    ...notifSettings,
                    [item.key]: !notifSettings[item.key as keyof typeof notifSettings],
                  })
                }
                className={cn(
                  'relative h-6 w-11 rounded-full transition-colors cursor-pointer',
                  notifSettings[item.key as keyof typeof notifSettings]
                    ? 'bg-gold-500'
                    : 'bg-navy-200 dark:bg-navy-700'
                )}
              >
                <span
                  className={cn(
                    'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                    notifSettings[item.key as keyof typeof notifSettings] ? 'translate-x-5' : 'translate-x-0.5'
                  )}
                />
              </button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {theme === 'light' ? <Sun size={18} className="text-gold-500" /> : <Moon size={18} className="text-gold-500" />}
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-navy-800 dark:text-navy-100">Dark Mode</p>
              <p className="text-xs text-navy-400">Toggle between light and dark theme</p>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                'relative h-6 w-11 rounded-full transition-colors cursor-pointer',
                theme === 'dark' ? 'bg-gold-500' : 'bg-navy-200 dark:bg-navy-700'
              )}
            >
              <span
                className={cn(
                  'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform flex items-center justify-center',
                  theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                )}
              >
                {theme === 'dark' ? <Moon size={12} /> : <Sun size={12} />}
              </span>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User size={18} className="text-gold-500" />
            Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-white text-lg font-bold">
              {settings.ownerName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-800 dark:text-navy-100">{settings.ownerName}</p>
              <p className="text-xs text-navy-400">{settings.email}</p>
            </div>
            <Button variant="danger" size="sm">
              <LogOut size={14} /> Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button variant="primary" size="lg" onClick={handleSave}>
          <Save size={16} /> Save All Settings
        </Button>
      </div>
    </div>
  )
}
