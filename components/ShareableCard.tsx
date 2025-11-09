'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ShareableCardProps {
  displayName: string
  connections: number
  rarity: string
  username: string
  className?: string
}

export default function ShareableCard({ 
  displayName, 
  connections, 
  rarity, 
  username,
  className 
}: ShareableCardProps) {
  return (
    <div 
      id="shareable-card"
      className={cn(
        'relative w-[1200px] h-[630px]',
        'flex flex-col items-center justify-center',
        'overflow-hidden',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #8b5cf6 100%)',
        backgroundSize: '200% 200%',
      }}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 15% 30%, rgba(255,255,255,0.4) 0%, transparent 40%),
              radial-gradient(circle at 85% 70%, rgba(255,255,255,0.4) 0%, transparent 40%),
              radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, transparent 60%)
            `,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl text-center space-y-6 px-16">
        {/* Heart Icon */}
        <div className="text-7xl mb-2 drop-shadow-lg">💜</div>

        {/* Headline */}
        <h1 
          className="text-5xl font-black text-white leading-tight drop-shadow-2xl"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.2)',
            letterSpacing: '-0.02em',
          }}
        >
          {displayName === 'Swiftie' 
            ? (
              <>
                YOU'RE<br />
                {connections} CONNECTIONS FROM<br />
                TAYLOR SWIFT!
              </>
            )
            : (
              <>
                {displayName.toUpperCase()}, YOU'RE<br />
                {connections} CONNECTIONS FROM<br />
                TAYLOR SWIFT!
              </>
            )
          }
        </h1>

        {/* Card Container */}
        <div 
          className="bg-white rounded-3xl p-10 shadow-2xl border-2 border-white/80"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* Rarity Badge */}
          <div className="mb-6">
            <p className="text-xl font-bold text-purple-dark mb-3" style={{ letterSpacing: '0.15em', fontSize: '22px' }}>
              RARITY:
            </p>
            <p 
              className="text-4xl font-black mb-5 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '42px',
                lineHeight: '1.2',
              }}
            >
              {displayName === 'Swiftie' 
                ? `Only ${rarity} of Swifties are this close! 💜`
                : `${displayName}, only ${rarity} of Swifties are this close! 💜`
              }
            </p>
          </div>

          {/* VIP Status - Personalized */}
          <p className="text-2xl font-bold text-purple-dark mb-5" style={{ fontSize: '26px' }}>
            {displayName === 'Swiftie' 
              ? "You're basically VIP status! ✨"
              : `${displayName}, you're basically VIP status! ✨`
            }
          </p>

          {/* Username */}
          <p className="text-lg text-gray-600 font-mono" style={{ fontSize: '18px' }}>{username}</p>
        </div>

        {/* Footer */}
        <div 
          className="text-white/90 text-lg font-semibold"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          Find your connection at taylorconnect.com
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 text-5xl opacity-25" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>✨</div>
      <div className="absolute top-8 right-8 text-5xl opacity-25" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>💜</div>
      <div className="absolute bottom-8 left-8 text-5xl opacity-25" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>🎤</div>
      <div className="absolute bottom-8 right-8 text-5xl opacity-25" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>✨</div>
    </div>
  )
}

