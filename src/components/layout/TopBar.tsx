import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Search, Moon, Sun, Bell, Plus, X } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { messages } from '@/data/mockData'
import { Avatar } from '@/components/ui/Avatar'
import { shopSettings } from '@/data/mockData'
import { cn } from '@/lib/utils'

interface TopBarProps {
  onMobileMenuOpen: () => void
}

export function TopBar({ onMobileMenuOpen }: TopBarProps) {
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const unreadMessages = messages.filter((m) => !m.read)

  return (
    <header className="sticky top-0 z-20 h-16 bg-white dark:bg-navy-900 border-b border-navy-100 dark:border-navy-800 flex items-center justify-between px-4 lg:px-6 gap-4">
      {/* Left: Mobile menu + Search */}
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 p-2 rounded-lg cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="relative max-w-md w-full hidden sm:block">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, customers..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-navy-200 dark:border-navy-700 bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-navy-100 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => navigate('/orders/new')}
          className="hidden sm:inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all cursor-pointer"
        >
          <Plus size={16} />
          New Order
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <Bell size={20} />
            {unreadMessages.length > 0 && (
              <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadMessages.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-navy-900 rounded-xl shadow-xl border border-navy-100 dark:border-navy-800 z-40 animate-in overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-navy-100 dark:border-navy-800">
                  <h3 className="text-sm font-semibold text-navy-900 dark:text-navy-50">Notifications</h3>
                  <button onClick={() => setNotifOpen(false)} className="text-navy-400 hover:text-navy-600 cursor-pointer">
                    <X size={16} />
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {unreadMessages.length === 0 ? (
                    <p className="text-center text-sm text-navy-400 py-8">No new notifications</p>
                  ) : (
                    unreadMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'px-4 py-3 border-b border-navy-50 dark:border-navy-800/50 hover:bg-navy-50 dark:hover:bg-navy-800/50 cursor-pointer transition-colors'
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <div className="h-2 w-2 bg-gold-500 rounded-full mt-1.5 shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-navy-800 dark:text-navy-100 truncate">
                              {msg.customerName}
                            </p>
                            <p className="text-xs text-navy-400 truncate">{msg.text}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="px-4 py-2 border-t border-navy-100 dark:border-navy-800">
                  <button
                    onClick={() => { setNotifOpen(false); navigate('/messages') }}
                    className="text-xs text-gold-600 dark:text-gold-400 font-medium hover:underline cursor-pointer"
                  >
                    View all messages
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800 p-2 rounded-lg cursor-pointer transition-colors"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* User avatar */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-navy-100 dark:border-navy-800">
          <Avatar name={shopSettings.ownerName} color="#e6a02f" size="sm" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-navy-800 dark:text-navy-100">{shopSettings.ownerName}</p>
            <p className="text-xs text-navy-400">Owner</p>
          </div>
        </div>
      </div>
    </header>
  )
}
