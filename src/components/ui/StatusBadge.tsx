import { cn } from '@/lib/utils'
import type { OrderStatus, Priority } from '@/types'

const statusConfig: Record<OrderStatus, { bg: string; text: string; dot: string }> = {
  'Pending': { bg: 'bg-amber-100 dark:bg-amber-500/15', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  'In Progress': { bg: 'bg-blue-100 dark:bg-blue-500/15', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
  'Ready for Trial': { bg: 'bg-purple-100 dark:bg-purple-500/15', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
  'Ready for Delivery': { bg: 'bg-cyan-100 dark:bg-cyan-500/15', text: 'text-cyan-700 dark:text-cyan-400', dot: 'bg-cyan-500' },
  'Delivered': { bg: 'bg-green-100 dark:bg-green-500/15', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
  'Cancelled': { bg: 'bg-red-100 dark:bg-red-500/15', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
}

const priorityConfig: Record<Priority, { bg: string; text: string }> = {
  'Low': { bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-600 dark:text-gray-400' },
  'Normal': { bg: 'bg-blue-100 dark:bg-blue-500/15', text: 'text-blue-600 dark:text-blue-400' },
  'High': { bg: 'bg-orange-100 dark:bg-orange-500/15', text: 'text-orange-600 dark:text-orange-400' },
  'Urgent': { bg: 'bg-red-100 dark:bg-red-500/15', text: 'text-red-600 dark:text-red-400' },
}

export function StatusBadge({ status, size = 'md' }: { status: OrderStatus; size?: 'sm' | 'md' }) {
  const config = statusConfig[status]
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full font-semibold',
      config.bg, config.text,
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs',
    )}>
      <span className={cn('rounded-full', config.dot, size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2')} />
      {status}
    </span>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const config = priorityConfig[priority]
  return (
    <span className={cn('inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', config.bg, config.text)}>
      {priority}
    </span>
  )
}
