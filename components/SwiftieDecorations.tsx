'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface Decoration {
  emoji: string
  size: string
  position: { top?: string; left?: string; right?: string; bottom?: string }
  delay: number
  duration: number
}

const decorations: Decoration[] = [
  { emoji: '💜', size: 'text-2xl md:text-3xl', position: { top: '10%', left: '3%' }, delay: 0, duration: 8 },
  { emoji: '✨', size: 'text-xl md:text-2xl', position: { top: '25%', right: '5%' }, delay: 1, duration: 7 },
  { emoji: '💫', size: 'text-xl md:text-2xl', position: { top: '60%', left: '4%' }, delay: 2, duration: 9 },
  { emoji: '🌟', size: 'text-lg md:text-xl', position: { top: '75%', right: '8%' }, delay: 1.5, duration: 8 },
  { emoji: '🦋', size: 'text-lg md:text-xl', position: { top: '40%', left: '2%' }, delay: 0.5, duration: 10 },
  { emoji: '💖', size: 'text-xl md:text-2xl', position: { top: '85%', right: '3%' }, delay: 2.5, duration: 7 },
]

const SwiftieDecorations = memo(() => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]" aria-hidden="true">
      {decorations.map((decoration, index) => (
        <div
          key={index}
          className={cn(
            'absolute opacity-20 hover:opacity-40 transition-opacity duration-500',
            decoration.size,
            !prefersReducedMotion && 'animate-float',
            'filter drop-shadow-lg'
          )}
          style={{
            ...decoration.position,
            animationDelay: `${decoration.delay}s`,
            animationDuration: `${decoration.duration}s`,
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 blur-md opacity-50">{decoration.emoji}</div>
            <div className="relative">{decoration.emoji}</div>
          </div>
        </div>
      ))}
    </div>
  )
})

SwiftieDecorations.displayName = 'SwiftieDecorations'

export default SwiftieDecorations
