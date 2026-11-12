import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg slide-in-right pointer-events-auto min-w-[280px] max-w-md',
              t.type === 'success' && 'bg-white dark:bg-navy-800 border border-green-200 dark:border-green-900',
              t.type === 'error' && 'bg-white dark:bg-navy-800 border border-red-200 dark:border-red-900',
              t.type === 'info' && 'bg-white dark:bg-navy-800 border border-blue-200 dark:border-blue-900'
            )}
          >
            {t.type === 'success' && <CheckCircle2 className="text-green-500 shrink-0" size={20} />}
            {t.type === 'error' && <AlertCircle className="text-red-500 shrink-0" size={20} />}
            {t.type === 'info' && <Info className="text-blue-500 shrink-0" size={20} />}
            <span className="text-sm text-navy-800 dark:text-navy-100 flex-1">{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="text-navy-300 hover:text-navy-500 transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
