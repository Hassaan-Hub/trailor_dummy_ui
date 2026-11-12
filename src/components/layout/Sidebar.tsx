import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingCart,
  Ruler,
  Users,
  Package,
  Shirt,
  MessageSquare,
  Settings,
  ChevronLeft,
  Scissors,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { shopSettings } from '@/data/mockData'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onMobileClose: () => void
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/measurements', label: 'Measurements', icon: Ruler },
  { to: '/customers', label: 'Customers', icon: Users },
  { to: '/inventory', label: 'Inventory', icon: Package },
  { to: '/catalog', label: 'Garment Catalog', icon: Shirt },
  { to: '/messages', label: 'Messages', icon: MessageSquare },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-navy-950/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-40 h-screen bg-navy-900 dark:bg-navy-950 flex flex-col transition-all duration-300',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-16 border-b border-navy-800 shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500 text-white shrink-0">
            <Scissors size={22} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-white font-bold text-sm whitespace-nowrap">{shopSettings.shopName}</p>
              <p className="text-navy-400 text-xs whitespace-nowrap">Tailor Management</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onMobileClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-gold-500 text-white shadow-sm'
                    : 'text-navy-300 hover:text-white hover:bg-navy-800',
                  collapsed && 'justify-center'
                )
              }
            >
              <item.icon size={20} className="shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="hidden lg:flex items-center justify-center py-3 border-t border-navy-800">
          <button
            onClick={onToggle}
            className="flex items-center gap-2 text-navy-400 hover:text-white transition-colors cursor-pointer p-1.5 rounded-lg hover:bg-navy-800"
          >
            <ChevronLeft
              size={20}
              className={cn('transition-transform', collapsed && 'rotate-180')}
            />
            {!collapsed && <span className="text-xs">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
