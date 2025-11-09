'use client'

import React, { memo } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

const steps = [
  {
    number: '01',
    emoji: '✨',
    title: 'Quick Questions',
    description: 'School, work, city — just the basics',
    color: 'from-purple-500 to-purple-600',
  },
  {
    number: '02',
    emoji: '🔍',
    title: 'AI Searches Real Connections',
    description: 'Alumni, companies, music industry links',
    color: 'from-pink-500 to-rose-500',
  },
  {
    number: '03',
    emoji: '💜',
    title: 'See Your Path',
    description: 'Free: Your connection + rarity score\n$25: Unlock names & full story',
    color: 'from-purple-600 to-pink-500',
  },
]

const HowItWorks = memo(() => {
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
      aria-labelledby="how-it-works-heading"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-purple-100">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            id="how-it-works-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-dark mb-4 sm:mb-5 leading-tight px-2"
          >
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 mb-8 sm:mb-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                'relative group',
                'transition-all duration-700',
                hasIntersected
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white to-purple-50/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-purple-100 hover:border-purple-300 transition-all duration-300 hover:shadow-lg">
                {/* Number Badge */}
                <div className="absolute -top-3 sm:-top-4 -left-3 sm:-left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-lg">
                  {step.number}
                </div>

                {/* Emoji */}
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-center">{step.emoji}</div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-dark mb-2 sm:mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-medium text-sm sm:text-base leading-relaxed text-center whitespace-pre-line">
                  {step.description}
                </p>

                {/* Decorative Line */}
                <div className={cn(
                  'absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r rounded-b-xl sm:rounded-b-2xl',
                  step.color,
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                )} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => router.push('/quiz')}
            className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 text-base sm:text-lg md:text-xl font-bold shadow-xl hover:shadow-glow transition-all duration-500 group"
            size="lg"
          >
            <span className="flex items-center gap-3">
              <span>Find Your Path</span>
              <span className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
})

HowItWorks.displayName = 'HowItWorks'

export default HowItWorks
