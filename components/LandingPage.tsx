'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import HeroSection from './sections/HeroSection'
import HowItWorks from './sections/HowItWorks'
import Testimonials from './sections/Testimonials'
import PrivacySection from './sections/PrivacySection'
import FinalCTA from './sections/FinalCTA'
import SwiftieDecorations from './SwiftieDecorations'
import EasterEgg from './EasterEgg'
import AlbumCollageBackground from './AlbumCollageBackground'

export default function LandingPage() {
  const router = useRouter()
  
  const handleStartQuiz = useCallback(() => {
    router.push('/quiz')
  }, [router])

  return (
    <main className="min-h-screen gradient-bg flex flex-col items-center px-3 sm:px-4 md:px-6 py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-x-hidden">
      {/* Premium Album Collage Background - Full page */}
      <AlbumCollageBackground />
      
      {/* Enhanced Swiftie Decorations */}
      <SwiftieDecorations />
      
      {/* Easter Egg */}
      <EasterEgg />
      
      {/* Hero Section - Clean, inviting, trustworthy layout */}
      <div className="relative z-10 w-full flex flex-col items-center mb-12 sm:mb-16 md:mb-20 lg:mb-24 pt-6 sm:pt-8 md:pt-10">
        <HeroSection onStartQuiz={handleStartQuiz} />
      </div>

      {/* Below-the-Fold Content - Natural spacing and flow */}
      <div className="w-full max-w-6xl space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24 relative z-10 pb-12 sm:pb-16 md:pb-20 px-3 sm:px-4 md:px-6">
        <HowItWorks />
        <Testimonials />
        <PrivacySection />
        <FinalCTA />
      </div>
    </main>
  )
}
