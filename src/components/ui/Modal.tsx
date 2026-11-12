import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 fade-in">
      <div
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full bg-white dark:bg-navy-900 rounded-2xl shadow-2xl animate-in max-h-[90vh] overflow-hidden flex flex-col',
          sizes[size]
        )}
      >
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100 dark:border-navy-800">
            <h2 className="text-lg font-semibold text-navy-900 dark:text-navy-50">{title}</h2>
            <button
              onClick={onClose}
              className="text-navy-400 hover:text-navy-600 dark:hover:text-navy-200 transition-colors rounded-lg p-1 hover:bg-navy-50 dark:hover:bg-navy-800 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        )}
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  )
}
