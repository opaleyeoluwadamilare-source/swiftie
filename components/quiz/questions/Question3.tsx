'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'
import Button from '@/components/ui/Button'

interface Question3Props {
  college?: string
  gradYear?: string
  noCollege?: boolean
  onCollegeChange: (value: string) => void
  onGradYearChange: (value: string) => void
  onNoCollegeChange: (value: boolean) => void
  onNext: () => void
  progress: number
}

const currentYear = new Date().getFullYear()
const gradYears = Array.from({ length: 50 }, (_, i) => currentYear - i)

export default function Question3({
  college,
  gradYear,
  noCollege = false,
  onCollegeChange,
  onGradYearChange,
  onNoCollegeChange,
  onNext,
  progress,
}: Question3Props) {
  const [collegeInput, setCollegeInput] = useState(college || '')
  const [selectedYear, setSelectedYear] = useState(gradYear || '')
  const [skipped, setSkipped] = useState(noCollege)

  const handleCollegeInput = (value: string) => {
    setCollegeInput(value)
    onCollegeChange(value)
  }

  const handleYearChange = (value: string) => {
    setSelectedYear(value)
    onGradYearChange(value)
  }

  const handleSkip = () => {
    setSkipped(true)
    onNoCollegeChange(true)
    setCollegeInput('')
    setSelectedYear('')
    onCollegeChange('')
    onGradYearChange('')
  }

  return (
    <QuestionBase
      progress={progress}
      emoji="🎓"
      title="Where'd you go to school?"
      onNext={onNext}
      canProceed={true}
      footerText={
        <>
          School connections are POWERFUL in the music world 💜
          <br />
          <span className="text-xs">Even high schools have alumni in the industry!</span>
        </>
      }
    >
      <div className="space-y-6">
        {/* School Input */}
        <div>
          <input
            type="text"
            value={collegeInput}
            onChange={(e) => handleCollegeInput(e.target.value)}
            placeholder="Type school name... (High school, college, or university — any works!)"
            disabled={skipped}
            className={cn(
              'w-full p-4 rounded-xl border-2 focus:outline-none text-lg',
              skipped
                ? 'border-gray-200 bg-gray-100 text-gray-400'
                : 'border-gray-200 focus:border-purple-gradient-start'
            )}
          />
        </div>

        {/* Grad Year */}
        <div>
          <p className="text-gray-medium mb-3">What year did you graduate?</p>
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(e.target.value)}
            disabled={skipped}
            className={cn(
              'w-full p-4 rounded-xl border-2 focus:outline-none text-lg',
              skipped
                ? 'border-gray-200 bg-gray-100 text-gray-400'
                : 'border-gray-200 focus:border-purple-gradient-start'
            )}
          >
            <option value="">Select year...</option>
            {gradYears.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Skip Button */}
        {!skipped && (
          <div className="pt-2">
            <Button
              onClick={handleSkip}
              variant="outline"
              className="w-full"
            >
              Skip - I prefer not to share
            </Button>
          </div>
        )}
      </div>
    </QuestionBase>
  )
}
