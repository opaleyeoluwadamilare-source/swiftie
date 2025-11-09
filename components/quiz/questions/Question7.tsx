'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'

interface Question7Props {
  firstName?: string
  anonymous?: boolean
  onFirstNameChange: (value: string) => void
  onAnonymousChange: (value: boolean) => void
  onNext: () => void
  progress: number
}

export default function Question7({
  firstName,
  anonymous,
  onFirstNameChange,
  onAnonymousChange,
  onNext,
  progress,
}: Question7Props) {
  const [nameInput, setNameInput] = useState(firstName || '')
  const [isAnonymous, setIsAnonymous] = useState(anonymous || false)

  const handleNameChange = (value: string) => {
    setNameInput(value)
    if (!isAnonymous) {
      onFirstNameChange(value)
    }
  }

  const handleAnonymousToggle = (checked: boolean) => {
    setIsAnonymous(checked)
    onAnonymousChange(checked)
    if (checked) {
      onFirstNameChange('')
    } else if (nameInput) {
      onFirstNameChange(nameInput)
    }
  }

  const displayName = isAnonymous ? '' : (nameInput || 'Sarah')

  return (
    <QuestionBase
      progress={progress}
      emoji="✨"
      title="Last one! What should we call you?"
      onNext={onNext}
      nextLabel="Find My Connection! →"
      canProceed={true}
      footerText={
        <>
          <p className="mb-3">We'll personalize your story:</p>
          <div className="space-y-2 text-left bg-purple-50 p-4 rounded-xl mb-3">
            <p className="font-medium text-purple-dark">
              "{displayName}, you're 3 connections from Taylor!"
            </p>
            <p className="text-center text-gray-medium text-sm">vs</p>
            <p className="font-medium text-purple-dark">
              "You're 3 connections from Taylor!"
            </p>
          </div>
          <p>Ready to see your connection? 💜</p>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Your first name..."
            disabled={isAnonymous}
            className={cn(
              'w-full p-4 rounded-xl border-2 focus:outline-none text-lg',
              isAnonymous
                ? 'border-gray-200 bg-gray-100 text-gray-400'
                : 'border-gray-200 focus:border-purple-gradient-start'
            )}
          />
        </div>

        <label className="flex items-center gap-3 p-4 rounded-xl cursor-pointer hover:bg-purple-50 transition-all">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(e) => handleAnonymousToggle(e.target.checked)}
            className="w-5 h-5 rounded border-2 border-purple-gradient-start text-purple-gradient-start focus:ring-purple-gradient-start"
          />
          <span className="text-purple-dark">Keep me anonymous</span>
        </label>
      </div>
    </QuestionBase>
  )
}
