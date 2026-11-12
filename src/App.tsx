import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/context/ThemeContext'
import { ToastProvider } from '@/components/ui/Toast'
import { Layout } from '@/components/layout/Layout'
import { Dashboard } from '@/pages/Dashboard'
import { Orders } from '@/pages/Orders'
import { CreateOrder } from '@/pages/CreateOrder'
import { Measurements } from '@/pages/Measurements'
import { Customers } from '@/pages/Customers'
import { CustomerProfile } from '@/pages/CustomerProfile'
import { Inventory } from '@/pages/Inventory'
import { Catalog } from '@/pages/Catalog'
import { Messages } from '@/pages/Messages'
import { Settings as SettingsPage } from '@/pages/Settings'

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="orders/new" element={<CreateOrder />} />
              <Route path="measurements" element={<Measurements />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/:id" element={<CustomerProfile />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="messages" element={<Messages />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  )
}
