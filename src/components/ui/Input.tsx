import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export function Input({ label, error, hint, className, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-300 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all',
          error && 'border-red-400 focus:ring-red-400/50',
          className
        )}
        {...props}
      />
      {hint && !error && (
        <p className="mt-1 text-xs text-navy-400">{hint}</p>
      )}
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  children: ReactNode
}

export function Select({ label, className, id, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          'w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-navy-700 dark:text-navy-200 mb-1.5"
        >
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cn(
          'w-full rounded-lg border border-navy-200 dark:border-navy-700 bg-white dark:bg-navy-800 px-3 py-2 text-sm text-navy-900 dark:text-navy-100 placeholder:text-navy-300 dark:placeholder:text-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition-all resize-none',
          className
        )}
        {...props}
      />
    </div>
  )
}
