'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'

interface Question1Props {
  answer?: string
  onAnswer: (value: string) => void
  onNext: () => void
  progress: number
}

const vibeOptions = [
  { value: 'student', label: 'Still in my student era', age: '(18-24)' },
  { value: 'early-career', label: 'Early career grind', age: '(25-30)' },
  { value: 'thriving', label: 'Thriving in my career', age: '(31-40)' },
  { value: 'running-show', label: 'Running the show', age: '(41-50)' },
  { value: 'peak', label: 'Peak experience mode', age: '(51+)' },
]

export default function Question1({ answer, onAnswer, onNext, progress }: Question1Props) {
  const [selected, setSelected] = useState(answer)

  const handleSelect = (value: string) => {
    setSelected(value)
    onAnswer(value)
  }

  return (
    <QuestionBase
      progress={progress}
      emoji="✨"
      title="What's your vibe right now?"
      onNext={onNext}
      canProceed={!!selected}
      footerText={
        <>
          This helps us find connections at your stage of life ✨
          <br />
          <span className="text-xs">🔒 Your answers stay private</span>
        </>
      }
    >
      <div className="space-y-4">
        {vibeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              'w-full text-left p-4 rounded-xl border-2 transition-all',
              'hover:border-purple-gradient-start hover:bg-purple-50',
              selected === option.value
                ? 'border-purple-gradient-start bg-purple-100'
                : 'border-gray-200 bg-white'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                  selected === option.value
                    ? 'border-purple-gradient-start bg-purple-gradient-start'
                    : 'border-gray-300'
                )}
              >
                {selected === option.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
              <div>
                <div className="font-medium text-purple-dark">{option.label}</div>
                <div className="text-sm text-gray-medium">{option.age}</div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </QuestionBase>
  )
}

