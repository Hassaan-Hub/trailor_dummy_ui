import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center py-12 px-6',
        className
      )}
    >
      {icon && (
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy-50 dark:bg-navy-800 text-navy-300 dark:text-navy-600">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-navy-800 dark:text-navy-100 mb-1">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-navy-400 max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
