'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'

interface Question5Props {
  industry?: string
  level?: string
  onIndustryChange: (value: string) => void
  onLevelChange: (value: string) => void
  onNext: () => void
  progress: number
}

const industries = [
  { value: 'music', label: 'Music/Entertainment 🎵', note: '(Direct path!)' },
  { value: 'tech', label: 'Tech/Software' },
  { value: 'media', label: 'Media/Marketing/Creative' },
  { value: 'business', label: 'Business/Finance' },
  { value: 'healthcare', label: 'Healthcare/Education' },
  { value: 'service', label: 'Service/Retail/Hospitality' },
  { value: 'student', label: 'Student' },
  { value: 'break', label: 'Taking a break/Between jobs' },
  { value: 'other', label: 'Other' },
]

const levels = [
  { value: '0-2', label: 'Just starting out (0-2 years)' },
  { value: '3-5', label: 'Getting established (3-5 years)' },
  { value: '6-10', label: 'Mid-career pro (6-10 years)' },
  { value: '10+', label: 'Experienced leader (10+ years)' },
]

export default function Question5({
  industry,
  level,
  onIndustryChange,
  onLevelChange,
  onNext,
  progress,
}: Question5Props) {
  const [selectedIndustry, setSelectedIndustry] = useState(industry || '')
  const [selectedLevel, setSelectedLevel] = useState(level || '')
  const [otherIndustry, setOtherIndustry] = useState('')

  const handleIndustrySelect = (value: string) => {
    setSelectedIndustry(value)
    onIndustryChange(value === 'other' ? otherIndustry : value)
  }

  return (
    <QuestionBase
      progress={progress}
      emoji="💼"
      title="What do you do?"
      onNext={onNext}
      canProceed={!!selectedIndustry && !!selectedLevel}
      footerText={
        <>
          Everyone's connected somehow — even unexpected industries! ✨
        </>
      }
    >
      <div className="space-y-8">
        {/* Industry */}
        <div>
          <p className="font-medium text-purple-dark mb-4">Your industry:</p>
          <div className="space-y-3">
            {industries.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleIndustrySelect(opt.value)}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all',
                  'hover:border-purple-gradient-start hover:bg-purple-50',
                  selectedIndustry === opt.value
                    ? 'border-purple-gradient-start bg-purple-100'
                    : 'border-gray-200 bg-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      selectedIndustry === opt.value
                        ? 'border-purple-gradient-start bg-purple-gradient-start'
                        : 'border-gray-300'
                    )}
                  >
                    {selectedIndustry === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-purple-dark">{opt.label}</div>
                    {opt.note && (
                      <div className="text-sm text-gray-medium">{opt.note}</div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
          {selectedIndustry === 'other' && (
            <input
              type="text"
              value={otherIndustry}
              onChange={(e) => {
                setOtherIndustry(e.target.value)
                onIndustryChange(e.target.value)
              }}
              placeholder="Type your industry..."
              className="w-full mt-3 p-4 rounded-xl border-2 border-purple-gradient-start focus:outline-none text-lg"
            />
          )}
        </div>

        {/* Experience Level */}
        <div>
          <p className="font-medium text-purple-dark mb-4">Your experience level:</p>
          <div className="space-y-3">
            {levels.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSelectedLevel(opt.value)
                  onLevelChange(opt.value)
                }}
                className={cn(
                  'w-full text-left p-4 rounded-xl border-2 transition-all',
                  'hover:border-purple-gradient-start hover:bg-purple-50',
                  selectedLevel === opt.value
                    ? 'border-purple-gradient-start bg-purple-100'
                    : 'border-gray-200 bg-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      selectedLevel === opt.value
                        ? 'border-purple-gradient-start bg-purple-gradient-start'
                        : 'border-gray-300'
                    )}
                  >
                    {selectedLevel === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="font-medium text-purple-dark">{opt.label}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </QuestionBase>
  )
}
