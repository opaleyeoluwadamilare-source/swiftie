'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'

interface QuestionBaseProps {
  progress: number
  totalSteps?: number
  emoji: string
  title: string
  children: ReactNode
  onNext: () => void
  nextLabel?: string
  canProceed?: boolean
  footerText?: ReactNode
}

export default function QuestionBase({
  progress,
  totalSteps = 6,
  emoji,
  title,
  children,
  onNext,
  nextLabel = 'Next →',
  canProceed = true,
  footerText,
}: QuestionBaseProps) {
  const progressDots = Array.from({ length: totalSteps }, (_, i) => (
    <span
      key={i}
      className={cn(
        'text-2xl',
        i < progress ? 'text-purple-gradient-start' : 'text-gray-300'
      )}
    >
      ●
    </span>
  ))

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border-4 border-purple-gradient-start max-w-2xl w-full">
      {/* Progress */}
      <div className="flex justify-center gap-2 mb-8">
        {progressDots}
      </div>

      {/* Emoji */}
      <div className="text-center text-5xl mb-6">{emoji}</div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-purple-dark text-center mb-8">
        {title}
      </h2>

      {/* Content */}
      <div className="mb-8">{children}</div>

      {/* Footer Text */}
      {footerText && (
        <div className="text-center text-gray-medium mb-8 text-sm md:text-base">
          {footerText}
        </div>
      )}

      {/* Next Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          size="lg"
          className="min-w-[200px]"
        >
          {nextLabel}
        </Button>
      </div>
    </div>
  )
}

