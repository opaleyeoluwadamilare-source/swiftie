'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import Question1 from './questions/Question1'
import Question2 from './questions/Question2'
import Question3 from './questions/Question3'
import Question5 from './questions/Question5'
import Question6 from './questions/Question6'
import Question7 from './questions/Question7'
import ProcessingScreen from './ProcessingScreen'
import ResultsScreen from './ResultsScreen'

export interface QuizAnswers {
  vibe?: string
  city?: string
  musicCities?: string[]
  college?: string
  gradYear?: string
  noCollege?: boolean
  industry?: string
  level?: string
  companies?: string[]
  firstName?: string
  anonymous?: boolean
}

export default function QuizFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const updateAnswer = (key: keyof QuizAnswers, value: any) => {
    setAnswers((prev) => ({ ...prev, [key]: value }))
  }

  const nextStep = () => {
    if (currentStep < 6) {
      setIsTransitioning(true)
      // Wait for flip-out animation, then show next card
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1)
        setIsTransitioning(false)
      }, 500) // Match animation duration
    } else if (currentStep === 6) {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentStep(7) // Processing
        setIsTransitioning(false)
        // Simulate processing delay
        setTimeout(() => {
          setIsTransitioning(true)
          setTimeout(() => {
            setCurrentStep(8) // Results
            setIsTransitioning(false)
          }, 500)
        }, 3000)
      }, 500)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Question1
            answer={answers.vibe}
            onAnswer={(value) => updateAnswer('vibe', value)}
            onNext={nextStep}
            progress={1}
          />
        )
      case 2:
        return (
          <Question2
            city={answers.city}
            musicCities={answers.musicCities || []}
            onCityChange={(value) => updateAnswer('city', value)}
            onMusicCitiesChange={(value) => updateAnswer('musicCities', value)}
            onNext={nextStep}
            progress={2}
          />
        )
      case 3:
        return (
          <Question3
            college={answers.college}
            gradYear={answers.gradYear}
            noCollege={answers.noCollege}
            onCollegeChange={(value) => updateAnswer('college', value)}
            onGradYearChange={(value) => updateAnswer('gradYear', value)}
            onNoCollegeChange={(value) => updateAnswer('noCollege', value)}
            onNext={nextStep}
            progress={3}
          />
        )
      case 4:
        return (
          <Question5
            industry={answers.industry}
            level={answers.level}
            onIndustryChange={(value) => updateAnswer('industry', value)}
            onLevelChange={(value) => updateAnswer('level', value)}
            onNext={nextStep}
            progress={4}
          />
        )
      case 5:
        return (
          <Question6
            companies={answers.companies || []}
            onCompaniesChange={(value) => updateAnswer('companies', value)}
            onNext={nextStep}
            progress={5}
          />
        )
      case 6:
        return (
          <Question7
            firstName={answers.firstName}
            anonymous={answers.anonymous}
            onFirstNameChange={(value) => updateAnswer('firstName', value)}
            onAnonymousChange={(value) => updateAnswer('anonymous', value)}
            onNext={nextStep}
            progress={6}
          />
        )
      case 7:
        return <ProcessingScreen />
      case 8:
        return <ResultsScreen answers={answers} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <div className="w-full max-w-2xl relative px-2 sm:px-4">
        <div
          key={currentStep}
          className={cn(
            'relative',
            isTransitioning
              ? 'animate-card-slide-out'
              : currentStep === 1
              ? 'animate-card-deal'
              : 'animate-card-slide-in'
          )}
        >
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
