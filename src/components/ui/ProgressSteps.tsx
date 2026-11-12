import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProgressStepsProps {
  steps: string[]
  currentStep: number
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="px-4 py-3">
      {/* Step dots */}
      <div className="flex items-center justify-between">
        {steps.map((_, i) => {
          const isActive = i === currentStep
          const isComplete = i < currentStep
          const isLast = i === steps.length - 1

          return (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              {/* Dot */}
              <div className={cn(
                'flex items-center justify-center rounded-full transition-all duration-300 shrink-0',
                'w-7 h-7 text-xs font-bold',
                isComplete && 'bg-green-500 text-white',
                isActive && 'bg-gold-500 text-navy-900 ring-4 ring-gold-500/20',
                !isActive && !isComplete && 'bg-gray-200 dark:bg-navy-600 text-gray-400',
              )}>
                {isComplete ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div className={cn(
                  'h-0.5 flex-1 mx-1 rounded-full transition-all duration-300',
                  isComplete ? 'bg-green-500' : 'bg-gray-200 dark:bg-navy-600',
                )} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step label */}
      <div className="mt-2 text-center">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="ml-2 text-xs font-bold text-navy-900 dark:text-gray-100">
          {steps[currentStep]}
        </span>
      </div>
    </div>
  )
}
