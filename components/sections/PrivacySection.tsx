'use client'

import React, { memo } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'

const privacyPoints = [
  {
    icon: '🔒',
    title: 'Never sold',
    description: '',
  },
  {
    icon: '🚫',
    title: 'No socials needed',
    description: '',
  },
  {
    icon: '✋',
    title: 'You control what to share',
    description: '',
  },
  {
    icon: '🗑️',
    title: 'Auto-deleted after 30 days',
    description: '',
  },
]

const PrivacySection = memo(() => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.2 })

  return (
    <section
      ref={ref}
      className={cn(
        'relative w-full',
        'transition-all duration-700',
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      )}
      aria-labelledby="privacy-heading"
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-purple-100">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            id="privacy-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-dark mb-4 sm:mb-5 leading-tight px-2"
          >
            Your Privacy Matters 💜
          </h2>
        </div>

        {/* Privacy Points Grid - Visual First */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10">
          {privacyPoints.map((point, index) => (
            <div
              key={index}
              className={cn(
                'flex flex-col items-center text-center p-4 sm:p-5 md:p-6 rounded-xl bg-gradient-to-br from-white to-purple-50/30',
                'border-2 border-purple-100 hover:border-purple-300',
                'transition-all duration-500 hover:shadow-lg',
                hasIntersected
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{point.icon}</div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-purple-dark">
                {point.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Community Trust Message */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium max-w-2xl mx-auto px-4">
            We're Swifties too. Built by fans, for fans.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#"
            className={cn(
              'inline-flex items-center gap-2',
              'text-purple-gradient-start hover:text-purple-gradient-end',
              'font-semibold text-base sm:text-lg',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-purple-300 focus:ring-offset-2 rounded-lg px-4 py-2'
            )}
            aria-label="Read our full privacy policy"
          >
            Privacy Policy
            <span className="text-lg sm:text-xl">→</span>
          </a>
        </div>
      </div>
    </section>
  )
})

PrivacySection.displayName = 'PrivacySection'

export default PrivacySection
