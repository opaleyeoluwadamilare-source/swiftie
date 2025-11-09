'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import QuestionBase from '../QuestionBase'

interface Question2Props {
  city?: string
  musicCities?: string[]
  onCityChange: (value: string) => void
  onMusicCitiesChange: (value: string[]) => void
  onNext: () => void
  progress: number
}

const musicCitiesOptions = [
  { value: 'nashville', label: 'Nashville' },
  { value: 'los-angeles', label: 'Los Angeles' },
  { value: 'new-york', label: 'New York' },
]

export default function Question2({
  city,
  musicCities = [],
  onCityChange,
  onMusicCitiesChange,
  onNext,
  progress,
}: Question2Props) {
  const [cityInput, setCityInput] = useState(city || '')
  const [selectedCities, setSelectedCities] = useState<string[]>(musicCities)

  const handleCityInput = (value: string) => {
    setCityInput(value)
    onCityChange(value)
  }

  const handleMusicCityToggle = (value: string) => {
    const newSelection = selectedCities.includes(value)
      ? selectedCities.filter((c) => c !== value)
      : [...selectedCities, value]
    setSelectedCities(newSelection)
    onMusicCitiesChange(newSelection)
  }

  return (
    <QuestionBase
      progress={progress}
      emoji="📍"
      title="Where do you call home?"
      onNext={onNext}
      canProceed={true}
      footerText={
        <>
          Check if you've lived in any of these — it boosts your connection chances! 🎵
        </>
      }
    >
      <div className="space-y-6">
        {/* City Input */}
        <div>
          <input
            type="text"
            value={cityInput}
            onChange={(e) => handleCityInput(e.target.value)}
            placeholder="Type your city..."
            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-purple-gradient-start focus:outline-none text-lg"
          />
        </div>

        {/* Music Cities */}
        <div>
          <p className="text-gray-medium mb-3">Music magic happens in:</p>
          <div className="space-y-3">
            {musicCitiesOptions.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all',
                  'hover:bg-purple-50',
                  selectedCities.includes(option.value) && 'bg-purple-100'
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedCities.includes(option.value)}
                  onChange={() => handleMusicCityToggle(option.value)}
                  className="w-5 h-5 rounded border-2 border-purple-gradient-start text-purple-gradient-start focus:ring-purple-gradient-start"
                />
                <span className="text-purple-dark font-medium">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </QuestionBase>
  )
}

