import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'gold'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-navy-900 text-white active:bg-navy-800 dark:bg-navy-700 dark:active:bg-navy-600',
  secondary: 'bg-gray-100 text-navy-800 active:bg-gray-200 dark:bg-navy-700/50 dark:text-gray-200 dark:active:bg-navy-700',
  ghost: 'bg-transparent text-navy-600 active:bg-gray-100 dark:text-gray-300 dark:active:bg-navy-700/50',
  danger: 'bg-red-500 text-white active:bg-red-600',
  gold: 'bg-gold-500 text-navy-900 active:bg-gold-600 font-bold',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm rounded-lg',
  md: 'px-4 py-3 text-sm rounded-xl',
  lg: 'px-5 py-3.5 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 active:scale-[0.97] select-none',
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
