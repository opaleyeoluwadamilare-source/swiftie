'use client'

import React, { memo } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useIntersectionObserver'
import { cn } from '@/lib/utils'
import Button from '../ui/Button'
import { useRouter } from 'next/navigation'

const testimonials = [
  {
    text: "I'm 2 connections from Taylor! My roommate works at Republic. INSANE 🤯",
    author: '@swiftie_queen',
    badge: 'Top 1%',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    text: "Best $25 ever. The coolest backstory for every party 😂",
    author: '@taylorstan13',
    badge: 'Verified',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    text: 'Top 2%. Basically VIP status now 💜',
    author: '@erastourlife',
    badge: 'Top 2%',
    gradient: 'from-purple-600 to-purple-400',
  },
]

const Testimonials = memo(() => {
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
      aria-labelledby="testimonials-heading"
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border border-purple-100">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-dark mb-4 sm:mb-5 leading-tight px-2"
          >
            What Swifties
            <br />
            <span className="bg-gradient-to-r from-purple-gradient-start to-purple-gradient-end bg-clip-text text-transparent">
              Are Saying
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={index}
              className={cn(
                'relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6',
                'border-2 border-purple-100 hover:border-purple-300',
                'shadow-md hover:shadow-xl transition-all duration-300',
                'transition-all duration-700',
                hasIntersected
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Badge */}
              <div className={cn(
                'absolute -top-2.5 sm:-top-3 -right-2.5 sm:-right-3 px-2.5 sm:px-3 py-1 rounded-full',
                'bg-gradient-to-r text-white text-xs font-bold shadow-md',
                testimonial.gradient
              )}>
                {testimonial.badge}
              </div>

              {/* Quote */}
              <div className="text-3xl sm:text-4xl text-purple-200 mb-3 sm:mb-4">"</div>
              <p className="text-gray-medium mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
                {testimonial.text}
              </p>
              
              {/* Author */}
              <footer className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-gradient-start to-purple-gradient-end flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {testimonial.author[1].toUpperCase()}
                </div>
                <cite className="text-xs sm:text-sm font-semibold text-purple-dark not-italic">
                  {testimonial.author}
                </cite>
              </footer>
            </blockquote>
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
              <span>See Your Connection</span>
              <span className="text-xl sm:text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
            </span>
          </Button>
        </div>
      </div>
    </section>
  )
})

Testimonials.displayName = 'Testimonials'

export default Testimonials
