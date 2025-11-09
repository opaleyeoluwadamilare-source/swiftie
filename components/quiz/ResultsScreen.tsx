'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'
import { QuizAnswers } from './QuizFlow'
import VisualPath from '../VisualPath'

interface ResultsScreenProps {
  answers: QuizAnswers
}

export default function ResultsScreen({ answers }: ResultsScreenProps) {
  const [showUnlock, setShowUnlock] = useState(false)
  
  // Generate a random rarity percentage
  const rarity = (Math.random() * 5 + 2).toFixed(1)
  const degrees = Math.floor(Math.random() * 3) + 3 // 3, 4, or 5 degrees
  
  const displayName = answers.anonymous ? 'You' : (answers.firstName || 'You')
  const username = answers.firstName 
    ? `@${answers.firstName.toLowerCase()}swiftie` 
    : '@swiftie'

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border-4 border-purple-gradient-start max-w-2xl w-full">
      <div className="text-center space-y-6">
        {/* Header */}
        <div className="text-5xl mb-4">🎤</div>
        <h2 className="text-3xl md:text-4xl font-bold text-purple-dark">
          {displayName.toUpperCase()}, YOU'RE {degrees} DEGREES FROM TAYLOR SWIFT!
        </h2>

        {/* Result Card */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
          <div className="mb-6 flex justify-center">
            <VisualPath />
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-lg font-bold text-purple-dark mb-2">RARITY:</p>
              <p className="text-2xl font-bold text-purple-gradient-start">
                Only {rarity}% of Swifties are this close! 💜
              </p>
            </div>

            <p className="text-lg text-purple-dark font-medium">
              You're basically VIP status! ✨
            </p>

            <p className="text-sm text-gray-medium font-mono">{username}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="flex-1">
            Share My Card 📸
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            Download to Camera Roll
          </Button>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-gray-200 pt-6">
          <p className="text-xl font-bold text-purple-dark mb-6">
            Okay but WHO are these people?
          </p>

          {!showUnlock ? (
            <Button
              onClick={() => setShowUnlock(true)}
              size="lg"
              className="w-full mb-6"
            >
              🔓 Unlock Your Full Story
            </Button>
          ) : (
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 text-left">
                <p className="font-bold text-purple-dark mb-4">
                  See exactly who connects you:
                </p>
                <ul className="space-y-2 text-gray-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>All the names revealed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>How they know each other</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Where they work</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Verified sources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✅</span>
                    <span>Share without watermark</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-purple-gradient-start to-purple-gradient-end rounded-xl p-6 text-white">
                <p className="text-2xl font-bold mb-2">$25 • One-time • Yours forever</p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full mt-4 bg-white text-purple-gradient-start hover:bg-gray-100"
                >
                  Unlock My Path - $25
                </Button>
              </div>

              <p className="text-sm text-gray-medium flex items-center justify-center gap-2">
                <span>🔒</span>
                <span>Private & secure • No subscriptions, no spam</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

