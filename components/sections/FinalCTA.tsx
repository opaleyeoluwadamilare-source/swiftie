'use client'

import React, { memo } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

const FinalCTA = memo(() => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 })
  const router = useRouter()

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full',
        'transition-all duration-700',
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-purple-100 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-dark mb-4 sm:mb-5 leading-tight">
          Are You in the Top 5%?
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-2 sm:mb-3 max-w-2xl mx-auto">
          Most Swifties are 3-5 connections away.
        </p>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Some are even closer.
        </p>
        
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-gradient-premium mb-6 sm:mb-8">
          There's only one way to find out
        </p>
        
        <div className="flex flex-col items-center gap-3 sm:gap-4">
          <Button
            onClick={() => router.push('/quiz')}
            className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:shadow-glow transition-all duration-500 group"
            size="lg"
          >
            <span className="flex items-center gap-2.5 sm:gap-3">
              <span>Find Your Path - Free</span>
              <span className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform duration-300">→</span>
            </span>
          </Button>
          
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            No payment needed to start
          </p>
        </div>
      </div>
    </section>
  )
})

FinalCTA.displayName = 'FinalCTA'

export default FinalCTA

