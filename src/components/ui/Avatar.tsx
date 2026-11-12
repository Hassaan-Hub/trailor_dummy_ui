import { cn } from '@/lib/utils'
import { initials } from '@/lib/utils'

interface AvatarProps {
  name: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
}

export function Avatar({ name, color = '#f59e0b', size = 'md' }: AvatarProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full font-bold shrink-0',
        sizeMap[size],
      )}
      style={{
        backgroundColor: `${color}20`,
        color: color,
      }}
    >
      {initials(name)}
    </div>
  )
}
