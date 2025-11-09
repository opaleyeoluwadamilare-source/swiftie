'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'
import { useMountAnimation } from '@/lib/hooks/useMountAnimation'
import VisualPath from '../VisualPath'
import Button from '../ui/Button'
import AnimatedCounter from '../AnimatedCounter'

interface HeroSectionProps {
  onStartQuiz?: () => void
}

const HeroSection = memo(({ onStartQuiz }: HeroSectionProps) => {
  // Natural, approachable flow: Headline → Subheadline → Button → Visual → Trust
  const headlineMounted = useMountAnimation({ delay: 0 })
  const subheadlineMounted = useMountAnimation({ delay: 150 })
  const buttonMounted = useMountAnimation({ delay: 300 })
  const visualMounted = useMountAnimation({ delay: 500 })
  const trustMounted = useMountAnimation({ delay: 700 })

  return (
    <div className="w-full max-w-5xl flex flex-col items-center px-4 sm:px-6">
      {/* Premium Headline - Approachable, Not Overwhelming */}
      <h1
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black',
          'text-center mb-5 sm:mb-6 md:mb-7 leading-[1.1] tracking-tight',
          'text-gradient-premium font-display',
          'transition-all duration-1000 ease-out',
          'drop-shadow-[0_2px_8px_rgba(139,92,246,0.2)]',
          headlineMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        <span className="block">Only TRUE Swifties know</span>
        <span className="block mt-1 sm:mt-1.5">how close they really are</span>
        <span className="block mt-1 sm:mt-1.5">
          to Taylor <span className="text-pink-500">💜</span>
        </span>
      </h1>

      {/* Subheadline - Clear and Inviting */}
      <p
        className={cn(
          'text-lg sm:text-xl md:text-2xl text-center mb-6 sm:mb-7 md:mb-8',
          'max-w-2xl font-medium leading-relaxed',
          'text-gray-800 font-sans',
          'transition-all duration-1000 ease-out',
          subheadlineMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        Find your hidden connection in 60 seconds
      </p>

      {/* Primary CTA - Inviting, Not Intimidating */}
      <div
        className={cn(
          'w-full max-w-md sm:max-w-lg mb-8 sm:mb-10 md:mb-12',
          'transition-all duration-700 ease-out',
          buttonMounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
        )}
      >
        <Button
          onClick={onStartQuiz}
          className="w-full flex items-center justify-center gap-2.5 py-5 sm:py-6 md:py-7 text-lg sm:text-xl md:text-2xl font-bold shadow-xl hover:shadow-glow transition-all duration-500 group relative overflow-hidden"
          size="lg"
          aria-label="Start free quiz to find your connection to Taylor Swift"
        >
          <span className="relative z-10 flex items-center gap-2.5 sm:gap-3">
            <span className="font-display">Find Your Path</span>
            <span className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
          </span>
        </Button>
        <p className="text-center mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 font-medium">
          Free • 60 seconds • No signup
        </p>
      </div>

      {/* Visual Path - Balanced and Clear */}
      <div
        className={cn(
          'w-full max-w-4xl mb-8 sm:mb-10 md:mb-12',
          'glass-effect rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8',
          'premium-shadow border border-white/60',
          'transition-all duration-1000 ease-out',
          'relative overflow-hidden group',
          'backdrop-blur-xl',
          visualMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
        )}
      >
        {/* Subtle animated gradient orbs */}
        <div className="absolute top-0 right-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-gentle" />
        <div className="absolute bottom-0 left-0 w-32 sm:w-48 md:w-56 h-32 sm:h-48 md:h-56 bg-gradient-to-tr from-pink-400/10 to-purple-400/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-gentle" style={{ animationDelay: '1s' }} />
        
        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-7">
            <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-purple-300/50 to-purple-300" />
            <span className="text-[10px] sm:text-xs font-bold text-purple-gradient-start uppercase tracking-[0.25em] sm:tracking-[0.3em] px-2">
              Your Connection Path
            </span>
            <div className="h-px w-10 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-purple-300/50 to-purple-300" />
          </div>
          
          <div className="mb-5 sm:mb-6 md:mb-7 -mx-2 sm:mx-0">
            <VisualPath />
          </div>
          
          <div className="text-center">
            <p className="text-base sm:text-lg md:text-xl font-semibold text-gradient-premium leading-relaxed px-2">
              Most fans are 3-5 connections away. What about you?
            </p>
          </div>
        </div>
      </div>

      {/* Trust Signals - Subtle and Professional */}
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-3 sm:gap-4',
          'transition-all duration-700 ease-out',
          'w-full max-w-3xl',
          trustMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        )}
      >
        <span className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-effect border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <span className="text-lg sm:text-xl">🔒</span>
          <span className="text-sm sm:text-base font-semibold text-purple-dark whitespace-nowrap">Private</span>
        </span>
        <span className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-effect border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <span className="text-lg sm:text-xl">💜</span>
          <span className="text-sm sm:text-base font-semibold text-purple-dark whitespace-nowrap">Made by Swifties</span>
        </span>
        <span className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full glass-effect border border-purple-200/50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
          <span className="text-lg sm:text-xl">⚡</span>
          <span className="text-sm sm:text-base font-semibold text-purple-dark whitespace-nowrap">
            <AnimatedCounter target={12847} /> found theirs
          </span>
        </span>
      </div>
    </div>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
