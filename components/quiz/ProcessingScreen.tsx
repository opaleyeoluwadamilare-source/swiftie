'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export default function ProcessingScreen() {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { emoji: '🔍', text: 'Searching your college alumni in the music world...', status: 'searching' },
    { emoji: '🧠', text: 'Checking your career crossovers...', status: 'searching' },
    { emoji: '🔗', text: 'Building your path...', status: 'searching' },
  ]

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    // Update steps
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border-4 border-purple-gradient-start max-w-2xl w-full">
      <div className="text-center">
        <div className="text-5xl mb-6">✨</div>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-dark mb-8">
          Finding your connection to Taylor Swift...
        </h2>

        {/* Animated Visualization Area */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-12 mb-8 border-2 border-purple-200 min-h-[200px] flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Sparkle animation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-pulse-gentle">✨</div>
            </div>
            {/* Network visualization dots */}
            <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-purple-gradient-start rounded-full animate-pulse-gentle" style={{ animationDelay: '0s' }} />
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-purple-gradient-start rounded-full animate-pulse-gentle" style={{ animationDelay: '0.3s' }} />
            <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-purple-gradient-start rounded-full animate-pulse-gentle" style={{ animationDelay: '0.6s' }} />
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-gradient-start rounded-full animate-pulse-gentle" style={{ animationDelay: '0.9s' }} />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl transition-all',
                index < currentStep
                  ? 'bg-green-50 border-2 border-green-200'
                  : index === currentStep
                  ? 'bg-purple-50 border-2 border-purple-200'
                  : 'bg-gray-50 border-2 border-gray-200'
              )}
            >
              <span className="text-2xl">{step.emoji}</span>
              <span className="flex-1 text-left text-gray-medium">{step.text}</span>
              {index < currentStep && (
                <span className="text-green-600 font-bold">✓ Found some connections!</span>
              )}
              {index === currentStep && step.status === 'searching' && (
                <span className="text-purple-gradient-start font-bold animate-pulse">Searching...</span>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-medium mb-2">
            <span>Progress:</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-gradient-start to-purple-gradient-end h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-lg text-purple-dark font-medium">Almost there... ✨</p>
      </div>
    </div>
  )
}

