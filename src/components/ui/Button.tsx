import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      'bg-gold-500 hover:bg-gold-600 text-white shadow-sm hover:shadow-md transition-all',
    secondary:
      'bg-navy-800 hover:bg-navy-700 text-white shadow-sm hover:shadow-md transition-all dark:bg-navy-700 dark:hover:bg-navy-600',
    outline:
      'border border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-200 hover:bg-navy-50 dark:hover:bg-navy-800/50 transition-colors',
    ghost:
      'text-navy-600 dark:text-navy-300 hover:bg-navy-50 dark:hover:bg-navy-800/50 transition-colors',
    danger:
      'bg-red-500 hover:bg-red-600 text-white shadow-sm transition-colors',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-4 py-2 text-sm rounded-lg',
    lg: 'px-6 py-3 text-base rounded-xl',
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
