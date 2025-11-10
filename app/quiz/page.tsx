'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'

interface QuizData {
  ageRange?: string
  city?: string
  school?: string
  company?: string
  industry?: string
  experienceLevel?: string
  firstName?: string
}

const loadingMessages = [
  '✨ Searching the Swiftieverse...',
  '🎓 Checking alumni networks...',
  '🎤 Scanning music industry databases...',
  '💜 Finding your hidden connections...',
  '✨ Mapping paths to Taylor...',
  '💫 Almost there, bestie...',
]

const ageOptions = [
  { value: '18-24', label: 'Gen Z Energy', emoji: '✨', age: '(18-24)' },
  { value: '25-34', label: 'Millennial Magic', emoji: '💜', age: '(25-34)' },
  { value: '35-44', label: 'Experienced Era', emoji: '🎤', age: '(35-44)' },
  { value: '45+', label: 'Timeless', emoji: '🌟', age: '(45+)' },
]

const industryOptions = [
  { value: 'music', label: 'Music/Entertainment', emoji: '🎵' },
  { value: 'tech', label: 'Tech/Software', emoji: '💻' },
  { value: 'creative', label: 'Creative (Design/Media/Arts)', emoji: '🎨' },
  { value: 'business', label: 'Business/Finance', emoji: '💼' },
  { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
  { value: 'education', label: 'Education', emoji: '📚' },
  { value: 'marketing', label: 'Marketing/PR', emoji: '📢' },
  { value: 'hospitality', label: 'Hospitality/Service', emoji: '🍽️' },
  { value: 'student', label: 'Student', emoji: '🎓' },
  { value: 'break', label: 'Career Break', emoji: '🌴' },
  { value: 'other', label: 'Other', emoji: '✨' },
]

const experienceOptions = [
  { value: '0-2', label: 'Just Starting', years: '(0-2 years)' },
  { value: '2-5', label: 'Getting There', years: '(2-5 years)' },
  { value: '5-10', label: 'Experienced', years: '(5-10 years)' },
  { value: '10+', label: 'Very Experienced', years: '(10+ years)' },
  { value: 'not-working', label: 'Not Working Right Now', years: '' },
]

const popularCities = [
  'New York', 'Los Angeles', 'Nashville', 'London', 'Toronto',
  'Sydney', 'Melbourne', 'Chicago', 'Austin', 'Boston',
  'Seattle', 'Denver', 'Atlanta', 'Miami', 'San Francisco',
]

const popularSchools = [
  'NYU', 'USC', 'UCLA', 'Berkeley', 'Stanford',
  'Harvard', 'Yale', 'Princeton', 'Columbia', 'MIT',
  'Vanderbilt', 'Belmont', 'Berklee', 'Juilliard', 'Full Sail',
]

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
  const [formData, setFormData] = useState<QuizData>({})
  const [errors, setErrors] = useState<Partial<Record<keyof QuizData, string>>>({})
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const totalQuestions = 7

  // Rotate loading messages
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  const updateFormData = (key: keyof QuizData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
    // Clear error when user starts typing
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  const validateCurrentQuestion = (): boolean => {
    const newErrors: Partial<Record<keyof QuizData, string>> = {}

    switch (currentQuestion) {
      case 1:
        if (!formData.ageRange) {
          newErrors.ageRange = 'Please select your age range'
        }
        break
      case 2:
        if (!formData.city || formData.city.trim() === '') {
          newErrors.city = 'Please enter your city'
        }
        break
      case 3:
        if (!formData.school || formData.school.trim() === '') {
          newErrors.school = 'Please enter your school'
        }
        break
      case 4:
        // Company is optional, no validation needed
        break
      case 5:
        if (!formData.industry) {
          newErrors.industry = 'Please select your industry'
        }
        break
      case 6:
        if (!formData.experienceLevel) {
          newErrors.experienceLevel = 'Please select your experience level'
        }
        break
      case 7:
        // Name is optional, no validation needed
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (currentQuestion < totalQuestions) {
        setDirection('forward')
        setIsTransitioning(true)
        // Wait for flip-out animation, then show next card
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1)
          setIsTransitioning(false)
        }, 500) // Match animation duration
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (currentQuestion > 1) {
      setDirection('backward')
      setIsTransitioning(true)
      // Wait for flip-out animation, then show previous card
      setTimeout(() => {
        setCurrentQuestion((prev) => prev - 1)
        setIsTransitioning(false)
      }, 500) // Match animation duration
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit quiz')
      }

      const data = await response.json()
        // Pass quiz data as URL params for result calculation (fallback if DB fails)
        const params = new URLSearchParams({
          session: data.sessionId,
        })
        if (formData.firstName) {
          params.append('firstName', formData.firstName)
        }
        // Add quiz inputs for calculation
        if (formData.ageRange) params.append('ageRange', formData.ageRange)
        if (formData.city) params.append('city', formData.city)
        if (formData.school) params.append('school', formData.school)
        if (formData.company) params.append('company', formData.company)
        if (formData.industry) params.append('industry', formData.industry)
        if (formData.experienceLevel) params.append('experienceLevel', formData.experienceLevel)
        
        router.push(`/result?${params.toString()}`)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      setIsLoading(false)
      // For now, redirect anyway with a mock session ID
      const params = new URLSearchParams({
        session: `mock-${Date.now()}`,
      })
      if (formData.firstName) {
        params.append('firstName', formData.firstName)
      }
      // Add quiz inputs for calculation
      if (formData.ageRange) params.append('ageRange', formData.ageRange)
      if (formData.city) params.append('city', formData.city)
      if (formData.school) params.append('school', formData.school)
      if (formData.company) params.append('company', formData.company)
      if (formData.industry) params.append('industry', formData.industry)
      if (formData.experienceLevel) params.append('experienceLevel', formData.experienceLevel)
      
      router.push(`/result?${params.toString()}`)
    }
  }

  const canProceed = () => {
    switch (currentQuestion) {
      case 1:
        return !!formData.ageRange
      case 2:
        return !!formData.city && formData.city.trim() !== ''
      case 3:
        return !!formData.school && formData.school.trim() !== ''
      case 4:
        return true // Optional
      case 5:
        return !!formData.industry
      case 6:
        return !!formData.experienceLevel
      case 7:
        return true // Optional
      default:
        return false
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-8 animate-spin">✨</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {loadingMessages[loadingMessageIndex]}
          </h2>
          <p className="text-white/80 text-lg">
            This usually takes about 15 seconds...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center p-3 sm:p-4 md:p-6 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-2xl relative">
        {/* Progress Indicator */}
        <div className="mb-4 sm:mb-5 md:mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
            <span className="text-white font-semibold text-sm sm:text-base">
              Question {currentQuestion}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Question Card with Flip Animation */}
        <div
          key={currentQuestion}
          className={cn(
            'relative transform-gpu',
            isTransitioning
              ? direction === 'forward'
                ? 'animate-card-slide-out'
                : 'animate-card-slide-out-reverse'
              : currentQuestion === 1
              ? 'animate-card-deal'
              : direction === 'backward'
              ? 'animate-card-slide-in-reverse'
              : 'animate-card-slide-in'
          )}
        >
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border border-purple-100/50">
          {/* Question 1: Age Range */}
          {currentQuestion === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">✨</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  What's your vibe?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">Let's find your Swiftie era!</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {ageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData('ageRange', option.value)}
                    className={cn(
                      'p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left',
                      'hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98]',
                      'hover:shadow-lg touch-manipulation',
                      'min-h-[80px] sm:min-h-[100px] flex items-center',
                      formData.ageRange === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    )}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{option.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-base sm:text-lg md:text-xl text-purple-dark truncate">
                          {option.label}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">{option.age}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.ageRange && (
                <p className="text-red-500 text-sm text-center">{errors.ageRange}</p>
              )}
            </div>
          )}

          {/* Question 2: City */}
          {currentQuestion === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">📍</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  Where's your scene?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">Enter your city</p>
              </div>
              <div>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  placeholder="Enter your city..."
                  className="w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base sm:text-lg transition-all touch-manipulation"
                  list="cities"
                />
                <datalist id="cities">
                  {popularCities.map((city) => (
                    <option key={city} value={city} />
                  ))}
                </datalist>
              </div>
              {errors.city && (
                <p className="text-red-500 text-sm text-center">{errors.city}</p>
              )}
            </div>
          )}

          {/* Question 3: School */}
          {currentQuestion === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎓</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  Where'd you go to school?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">High school, college, or university</p>
              </div>
              <div>
                <input
                  type="text"
                  value={formData.school || ''}
                  onChange={(e) => updateFormData('school', e.target.value)}
                  placeholder="Enter your school/university..."
                  className="w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base sm:text-lg transition-all touch-manipulation"
                  list="schools"
                />
                <datalist id="schools">
                  {popularSchools.map((school) => (
                    <option key={school} value={school} />
                  ))}
                </datalist>
              </div>
              {errors.school && (
                <p className="text-red-500 text-sm text-center">{errors.school}</p>
              )}
            </div>
          )}

          {/* Question 4: Company */}
          {currentQuestion === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🏢</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  Where have you worked?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">This helps us find connections! (Optional)</p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  placeholder="Enter your company..."
                  className="w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base sm:text-lg transition-all touch-manipulation"
                />
                <Button
                  onClick={() => {
                    updateFormData('company', '')
                    handleNext()
                  }}
                  variant="outline"
                  className="w-full py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center px-3 sm:px-4 whitespace-nowrap"
                >
                  Skip this question
                </Button>
              </div>
            </div>
          )}

          {/* Question 5: Industry */}
          {currentQuestion === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">💼</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  What industry are you in?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">Pick the closest match</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                {industryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData('industry', option.value)}
                    className={cn(
                      'p-3 sm:p-4 md:p-5 rounded-xl border-2 transition-all text-left',
                      'hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98]',
                      'hover:shadow-md touch-manipulation min-h-[60px] sm:min-h-[70px]',
                      'flex items-center',
                      formData.industry === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    )}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <span className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{option.emoji}</span>
                      <span className="font-semibold text-sm sm:text-base md:text-lg text-purple-dark truncate">
                        {option.label}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              {errors.industry && (
                <p className="text-red-500 text-sm text-center">{errors.industry}</p>
              )}
            </div>
          )}

          {/* Question 6: Experience Level */}
          {currentQuestion === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">⭐</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  What's your experience level?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">How long have you been in your field?</p>
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {experienceOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateFormData('experienceLevel', option.value)}
                    className={cn(
                      'w-full p-4 sm:p-5 md:p-6 rounded-xl border-2 transition-all text-left',
                      'hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99]',
                      'hover:shadow-md touch-manipulation min-h-[60px] sm:min-h-[70px]',
                      formData.experienceLevel === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md ring-2 ring-purple-200'
                        : 'border-gray-200 bg-white hover:border-purple-300'
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-base sm:text-lg md:text-xl text-purple-dark">
                        {option.label}
                      </span>
                      {option.years && (
                        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{option.years}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm text-center">{errors.experienceLevel}</p>
              )}
            </div>
          )}

          {/* Question 7: First Name */}
          {currentQuestion === 7 && (
            <div className="space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">💜</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-purple-dark mb-2 sm:mb-3 leading-tight">
                  Last one! What should we call you?
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-600">We'll personalize your results</p>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  placeholder="Your first name..."
                  className="w-full p-3 sm:p-4 md:p-5 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200 text-base sm:text-lg transition-all touch-manipulation"
                />
                <Button
                  onClick={() => {
                    updateFormData('firstName', '')
                    handleNext()
                  }}
                  variant="outline"
                  className="w-full py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-xs sm:text-sm md:text-base flex items-center justify-center px-3 sm:px-4 whitespace-nowrap"
                >
                  <span className="hidden sm:inline">Continue as &quot;Swiftie&quot;</span>
                  <span className="sm:hidden">Continue as Swiftie</span>
                </Button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className={cn(
            'flex gap-3 sm:gap-4 mt-6 sm:mt-8',
            'sticky bottom-0 bg-white pt-4 pb-2 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10',
            'border-t border-gray-100 sm:border-0 sm:relative sm:bg-transparent sm:pt-0 sm:pb-0 sm:mx-0 sm:px-0'
          )}>
            {currentQuestion > 1 && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px] text-sm sm:text-base md:text-lg flex items-center justify-center gap-1 sm:gap-2"
              >
                <span className="flex-shrink-0">←</span>
                <span>Back</span>
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className={cn(
                'flex-1 py-3 sm:py-4 touch-manipulation min-h-[48px] sm:min-h-[52px]',
                'text-xs sm:text-sm md:text-base lg:text-lg',
                'flex items-center justify-center gap-1 sm:gap-2',
                'px-3 sm:px-4',
                currentQuestion === 1 && 'ml-auto'
              )}
            >
              <span className="whitespace-nowrap">
                {currentQuestion === totalQuestions ? (
                  <>
                    <span className="hidden sm:inline">Find My Connection!</span>
                    <span className="sm:hidden">Find Connection!</span>
                  </>
                ) : (
                  'Next'
                )}
              </span>
              <span className="flex-shrink-0">→</span>
            </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
