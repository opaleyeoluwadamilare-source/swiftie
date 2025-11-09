'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

/**
 * Hidden Easter egg - 13 clicks reveal a special message
 * Taylor's lucky number! 💜
 */
export default function EasterEgg() {
  const [clickCount, setClickCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    if (clickCount === 13) {
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
        setClickCount(0)
      }, 5000)
    }
  }, [clickCount])

  return (
    <>
      <button
        onClick={() => setClickCount((prev) => prev + 1)}
        className="fixed bottom-4 right-4 w-10 h-10 opacity-30 hover:opacity-60 transition-opacity cursor-pointer z-50 bg-purple-100/50 rounded-full flex items-center justify-center border border-purple-200/50 backdrop-blur-sm"
        aria-label="Easter egg"
        title="Click 13 times..."
      >
        <span className="text-xs font-bold text-purple-dark">13</span>
      </button>

      {showMessage && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex items-center justify-center',
            'bg-black/50 backdrop-blur-sm',
            'animate-fade-in'
          )}
          onClick={() => {
            setShowMessage(false)
            setClickCount(0)
          }}
        >
          <div
            className={cn(
              'bg-white rounded-2xl p-8 max-w-md mx-4',
              'border-4 border-purple-gradient-start',
              'shadow-2xl text-center'
            )}
          >
            <div className="text-6xl mb-4">💜✨</div>
            <h3 className="text-2xl font-bold text-purple-dark mb-2">
              You found it! 🎉
            </h3>
            <p className="text-gray-medium">
              You're a true Swiftie! 13 is Taylor's lucky number. 🫶
            </p>
            <p className="text-sm text-gray-light mt-4">
              Click anywhere to close
            </p>
          </div>
        </div>
      )}
    </>
  )
}

