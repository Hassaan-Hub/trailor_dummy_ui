import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface BottomSheetProps {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  maxHeight?: string
}

export function BottomSheet({ open, onClose, title, children, maxHeight = '85vh' }: BottomSheetProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        className={cn(
          'relative bg-white dark:bg-navy-800 rounded-t-3xl shadow-2xl',
          'animate-sheet-up max-h-full overflow-hidden flex flex-col',
        )}
        style={{ maxHeight }}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300 dark:bg-navy-600" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 dark:border-navy-700/50">
            <h3 className="text-lg font-bold text-navy-900 dark:text-gray-100">{title}</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-navy-700 text-gray-500 dark:text-gray-400 active:scale-90 transition-transform"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="overflow-y-auto scroll-smooth-touch no-scrollbar px-5 py-4 safe-bottom-px">
          {children}
        </div>
      </div>
    </div>
  )
}
