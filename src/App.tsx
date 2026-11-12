import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/ui/Toast'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Orders } from '@/pages/Orders'
import { CreateOrder } from '@/pages/CreateOrder'
import { Measurements } from '@/pages/Measurements'
import { Customers } from '@/pages/Customers'
import { CustomerProfile } from '@/pages/CustomerProfile'
import { More } from '@/pages/More'
import { Inventory } from '@/pages/Inventory'
import { Catalog } from '@/pages/Catalog'
import { Notifications } from '@/pages/Notifications'
import { Settings } from '@/pages/Settings'

function AppRoutes() {
  const location = useLocation()

  // Fullscreen routes without bottom nav
  const fullscreenRoutes = ['/create-order']
  const isFullscreen = fullscreenRoutes.some((r) => location.pathname.startsWith(r))

  return (
    <Layout showBottomNav={!isFullscreen}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/measurements" element={<Measurements />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customers/:id" element={<CustomerProfile />} />
        <Route path="/more" element={<More />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
