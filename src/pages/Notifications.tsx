import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, CalendarCheck, Truck, Ruler, ClipboardList, CheckCheck, Send } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import { BottomSheet } from '@/components/ui/BottomSheet'
import { useToast } from '@/components/ui/Toast'
import { messages, customers } from '@/data/mockData'
import { relativeTime, cn } from '@/lib/utils'
import type { Message } from '@/types'

const typeConfig: Record<Message['type'], { icon: typeof Bell; label: string; color: string; bg: string }> = {
  trial_reminder: { icon: CalendarCheck, label: 'Trial Reminder', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-500/15' },
  delivery_ready: { icon: Truck, label: 'Ready for Delivery', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-500/15' },
  measurement_confirm: { icon: Ruler, label: 'Measurement', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/15' },
  order_update: { icon: ClipboardList, label: 'Order Update', color: 'text-gold-500', bg: 'bg-gold-100 dark:bg-gold-500/15' },
}

export function Notifications() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [readIds, setReadIds] = useState<string[]>([])
  const [showCompose, setShowCompose] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')

  const isRead = (m: Message) => m.read || readIds.includes(m.id)
  const unreadCount = messages.filter((m) => !isRead(m)).length

  const displayed = messages
    .filter((m) => filter === 'all' || !isRead(m))
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const quickActions = [
    { label: 'Trial Reminder', icon: CalendarCheck, type: 'trial_reminder' as const },
    { label: 'Delivery Ready', icon: Truck, type: 'delivery_ready' as const },
    { label: 'Measurement', icon: Ruler, type: 'measurement_confirm' as const },
  ]

  return (
    <div className="min-h-screen safe-top-px">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white dark:bg-navy-800 border-b border-gray-100 dark:border-navy-700/50 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/more')} className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform">
          <ArrowLeft size={18} className="text-navy-700 dark:text-gray-300" />
        </button>
        <h1 className="text-base font-bold text-navy-900 dark:text-gray-100 flex-1">Notifications</h1>
        <button
          onClick={() => {
            setReadIds(messages.map((m) => m.id))
            toast('All marked as read', 'success')
          }}
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center active:scale-90 transition-transform"
        >
          <CheckCheck size={17} className="text-navy-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Quick send */}
        <div>
          <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Quick Reminders</p>
          <div className="grid grid-cols-3 gap-2">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => { setShowCompose(true); toast(`${a.label} template ready`, 'info') }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white dark:bg-navy-800 border border-gray-100 dark:border-navy-700/50 active:scale-95 transition-transform"
              >
                <div className="w-9 h-9 rounded-xl bg-gold-100 dark:bg-gold-500/15 flex items-center justify-center">
                  <a.icon size={17} className="text-gold-500" />
                </div>
                <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {(['all', 'unread'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95',
                filter === f
                  ? 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900'
                  : 'bg-white dark:bg-navy-800 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-navy-700/50',
              )}
            >
              {f === 'all' ? 'All' : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {displayed.length === 0 ? (
          <div className="text-center py-12">
            <Bell size={40} className="mx-auto text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">All caught up!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {displayed.map((m, i) => {
              const cfg = typeConfig[m.type]
              const customer = customers.find((c) => c.id === m.customerId)
              const read = isRead(m)
              return (
                <button
                  key={m.id}
                  onClick={() => setReadIds((prev) => prev.includes(m.id) ? prev : [...prev, m.id])}
                  className={cn(
                    'block w-full text-left animate-slide-up active:scale-[0.98] transition-transform',
                  )}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Card className={cn('p-3.5', !read && 'border-l-4 border-l-gold-500')}>
                    <div className="flex gap-3">
                      <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', cfg.bg)}>
                        <cfg.icon size={17} className={cfg.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-navy-900 dark:text-gray-100">{cfg.label}</p>
                          <span className="text-[10px] text-gray-400 shrink-0">{relativeTime(m.timestamp)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Avatar name={m.customerName} color={customer?.avatarColor} size="sm" />
                          <span className="text-[11px] text-gray-500 dark:text-gray-400">{m.customerName}</span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">{m.content}</p>
                      </div>
                      {!read && <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 mt-2" />}
                    </div>
                  </Card>
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* Compose sheet */}
      <BottomSheet open={showCompose} onClose={() => setShowCompose(false)} title="Send Reminder">
        <div className="space-y-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Dummy preview — no message is actually sent.</p>
          <div className="p-4 rounded-xl bg-navy-900 dark:bg-navy-700">
            <p className="text-white text-sm leading-relaxed">
              Hi! This is a friendly reminder from StitchCraft Tailors regarding your order. Please visit us at your convenience. Thank you!
            </p>
          </div>
          <Button fullWidth size="lg" variant="gold" onClick={() => { setShowCompose(false); toast('Reminder sent (demo)', 'success') }}>
            <Send size={17} /> Send Reminder
          </Button>
        </div>
      </BottomSheet>
    </div>
  )
}
