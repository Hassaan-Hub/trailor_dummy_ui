import { useNavigate } from 'react-router-dom'
import { Package, BookOpen, Bell, Settings as SettingsIcon, Ruler, ChevronRight, Moon, Sun, ShieldCheck, HelpCircle, Star } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { useTheme } from '@/context/ThemeContext'
import { shopSettings, fabrics, garmentStyles, messages, orders } from '@/data/mockData'
import { cn } from '@/lib/utils'

export function More() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const unread = messages.filter((m) => !m.read).length
  const lowStock = fabrics.filter((f) => f.stockMeters < 10).length

  const menuGroups = [
    {
      title: 'Management',
      items: [
        { icon: Package, label: 'Inventory / Fabrics', desc: `${fabrics.length} fabrics`, badge: lowStock > 0 ? `${lowStock} low` : null, path: '/inventory', color: 'bg-blue-100 dark:bg-blue-500/15 text-blue-500' },
        { icon: BookOpen, label: 'Garment Catalog', desc: `${garmentStyles.length} styles`, path: '/catalog', color: 'bg-gold-100 dark:bg-gold-500/15 text-gold-500' },
        { icon: Ruler, label: 'Measurements', desc: 'Customer measurements', path: '/measurements', color: 'bg-purple-100 dark:bg-purple-500/15 text-purple-500' },
        { icon: Bell, label: 'Notifications', desc: 'Order updates & reminders', badge: unread > 0 ? `${unread} new` : null, path: '/notifications', color: 'bg-green-100 dark:bg-green-500/15 text-green-500' },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: SettingsIcon, label: 'Settings', desc: 'Shop, units, tax', path: '/settings', color: 'bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400' },
      ],
    },
  ]

  return (
    <div className="px-4 pt-6 space-y-5 safe-top-px pb-6">
      <h1 className="text-xl font-bold text-navy-900 dark:text-gray-100">More</h1>

      {/* Profile card */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <Avatar name={shopSettings.ownerName} color="#f59e0b" size="lg" />
          <div className="flex-1">
            <p className="font-bold text-sm text-navy-900 dark:text-gray-100">{shopSettings.ownerName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Owner • {shopSettings.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{shopSettings.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-navy-700/50">
          <div className="text-center">
            <p className="text-base font-bold text-navy-900 dark:text-gray-100">{orders.length}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Orders</p>
          </div>
          <div className="text-center border-x border-gray-100 dark:border-navy-700/50">
            <p className="text-base font-bold text-navy-900 dark:text-gray-100">{fabrics.length}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Fabrics</p>
          </div>
          <div className="text-center">
            <p className="text-base font-bold text-navy-900 dark:text-gray-100">{garmentStyles.length}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Styles</p>
          </div>
        </div>
      </Card>

      {/* Dark mode toggle */}
      <Card className="p-3.5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-navy-900 dark:bg-gold-500/15 flex items-center justify-center">
          {theme === 'dark' ? <Moon size={18} className="text-gold-400" /> : <Sun size={18} className="text-gold-400" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Dark Mode</p>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">{theme === 'dark' ? 'Currently on' : 'Currently off'}</p>
        </div>
        <button
          onClick={toggleTheme}
          className={cn(
            'w-12 h-7 rounded-full p-1 transition-colors duration-200',
            theme === 'dark' ? 'bg-gold-500' : 'bg-gray-300 dark:bg-navy-600',
          )}
        >
          <div className={cn(
            'w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
            theme === 'dark' ? 'translate-x-5' : 'translate-x-0',
          )} />
        </button>
      </Card>

      {/* Menu groups */}
      {menuGroups.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-1">{group.title}</p>
          <Card className="overflow-hidden">
            {group.items.map((item, i) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 p-3.5 active:bg-gray-50 dark:active:bg-navy-700/50 transition-colors text-left',
                  i !== group.items.length - 1 && 'border-b border-gray-50 dark:border-navy-700/30',
                )}
              >
                <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', item.color)}>
                  <item.icon size={17} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{item.label}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-500/15 text-red-600 dark:text-red-400 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </button>
            ))}
          </Card>
        </div>
      ))}

      {/* Other */}
      <div>
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-1">Other</p>
        <Card className="overflow-hidden">
          <div className="w-full flex items-center gap-3 p-3.5 border-b border-gray-50 dark:border-navy-700/30">
            <div className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-500/15 flex items-center justify-center">
              <ShieldCheck size={17} className="text-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Privacy & Security</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Local demo data only</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-3 p-3.5 border-b border-gray-50 dark:border-navy-700/30">
            <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-500/15 flex items-center justify-center">
              <Star size={17} className="text-gold-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Rate the App</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Version 1.0.0</p>
            </div>
          </div>
          <div className="w-full flex items-center gap-3 p-3.5">
            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-navy-700 flex items-center justify-center">
              <HelpCircle size={17} className="text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">Help & Support</p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">Prototype • no real backend</p>
            </div>
          </div>
        </Card>
      </div>

      <p className="text-center text-[10px] text-gray-400 pb-4">StitchCraft © 2026 • Demo Prototype</p>
    </div>
  )
}
