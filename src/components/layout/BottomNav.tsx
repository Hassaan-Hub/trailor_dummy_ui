import { useLocation, useNavigate } from 'react-router-dom'
import { Home, ClipboardList, Plus, Users, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/orders', label: 'Orders', icon: ClipboardList },
  { path: '/create-order', label: 'New Order', icon: Plus, isCenter: true },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/more', label: 'More', icon: Menu },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-navy-800 border-t border-gray-100 dark:border-navy-700/50 safe-bottom-px">
      <div className="flex items-stretch justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.isCenter
            ? location.pathname === item.path
            : location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path))

          if (item.isCenter) {
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center -mt-6 shrink-0"
              >
                <div className={cn(
                  'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-200 active:scale-90',
                  isActive
                    ? 'bg-gold-600 text-white'
                    : 'bg-gold-500 text-navy-900',
                )}>
                  <item.icon size={26} strokeWidth={2.5} />
                </div>
                <span className={cn(
                  'text-[10px] mt-1 font-medium',
                  isActive ? 'text-gold-600 dark:text-gold-400' : 'text-gray-400',
                )}>
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center gap-1 flex-1 min-w-0"
            >
              <item.icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(
                  'transition-colors',
                  isActive
                    ? 'text-gold-500 dark:text-gold-400'
                    : 'text-gray-400 dark:text-gray-500',
                )}
              />
              <span className={cn(
                'text-[10px] font-medium truncate',
                isActive
                  ? 'text-gold-500 dark:text-gold-400'
                  : 'text-gray-400 dark:text-gray-500',
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
