import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  suffix?: string
}

export function Input({ label, suffix, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'w-full rounded-xl bg-gray-50 dark:bg-navy-700/50 border border-gray-200 dark:border-navy-600/50',
            'px-4 py-3 text-base text-navy-900 dark:text-gray-100 placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400',
            'transition-all',
            suffix && 'pr-16',
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full rounded-xl bg-gray-50 dark:bg-navy-700/50 border border-gray-200 dark:border-navy-600/50',
          'px-4 py-3 text-base text-navy-900 dark:text-gray-100 placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400',
          'transition-all resize-none',
          className,
        )}
        rows={3}
        {...props}
      />
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
}

export function Select({ label, className, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <select
        className={cn(
          'w-full rounded-xl bg-gray-50 dark:bg-navy-700/50 border border-gray-200 dark:border-navy-600/50',
          'px-4 py-3 text-base text-navy-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400',
          'transition-all appearance-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
