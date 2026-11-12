import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('shimmer rounded-xl', className)} />
  )
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700/50 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  )
}

export function SkeletonStatCard() {
  return (
    <div className="rounded-2xl bg-white dark:bg-navy-800/60 border border-gray-100 dark:border-navy-700/50 p-4 flex-1">
      <Skeleton className="h-3 w-16 mb-2" />
      <Skeleton className="h-6 w-20" />
    </div>
  )
}
