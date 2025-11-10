'use client'

import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ShareableCardProps {
  displayName: string
  connections: number
  rarity: string
  username: string
  firstName?: string | null
  className?: string
}

export default function ShareableCard({ 
  displayName, 
  connections, 
  rarity, 
  username,
  firstName,
  className 
}: ShareableCardProps) {
  // Always personalize - use firstName if available, otherwise displayName
  // Clean and format the name properly
  const rawName = firstName || displayName
  const personalizedName = rawName && rawName.trim() !== '' 
    ? rawName.trim().charAt(0).toUpperCase() + rawName.trim().slice(1).toLowerCase()
    : 'Swiftie'
  const isPersonalized = firstName !== null && firstName !== undefined && firstName !== '' && firstName.trim() !== ''
  
  // Format rarity for clean display
  const formattedRarity = rarity || '0%'
  
  // Album covers for background - subtle and elegant
  const albumCovers = [
    { src: '/images/1989.jpg', alt: '1989', position: { top: '5%', left: '2%', size: 200, rotation: -8 } },
    { src: '/images/lover.jpg', alt: 'Lover', position: { top: '15%', right: '3%', size: 180, rotation: 12 } },
    { src: '/images/folklore.jpg', alt: 'Folklore', position: { top: '35%', left: '1%', size: 160, rotation: -5 } },
    { src: '/images/midnights.jpg', alt: 'Midnights', position: { top: '50%', right: '2%', size: 200, rotation: 8 } },
    { src: '/images/reputation.jpg', alt: 'Reputation', position: { top: '65%', left: '3%', size: 170, rotation: -10 } },
    { src: '/images/evermore.jpg', alt: 'Evermore', position: { top: '75%', right: '1%', size: 190, rotation: 6 } },
    { src: '/images/red.jpg', alt: 'Red', position: { bottom: '15%', left: '2%', size: 180, rotation: -7 } },
    { src: '/images/fearless.jpg', alt: 'Fearless', position: { bottom: '5%', right: '3%', size: 200, rotation: 9 } },
  ]
  
  // IG Story format: 9:16 aspect ratio (1080x1920px)
  return (
    <div 
      id="shareable-card"
      className={cn(
        'relative',
        'flex flex-col items-center justify-center',
        'overflow-hidden',
        className
      )}
      style={{
        width: '1080px',
        height: '1920px',
        background: 'linear-gradient(180deg, #fef3f8 0%, #f5f3ff 30%, #fef3f8 50%, #f5f3ff 70%, #fef3f8 100%)',
        position: 'relative',
      }}
    >
      {/* Album Cover Backgrounds - Subtle and Elegant */}
      {albumCovers.map((album, index) => (
        <div
          key={index}
          className="absolute rounded-2xl overflow-hidden"
          style={{
            ...album.position,
            width: `${album.position.size}px`,
            height: `${album.position.size}px`,
            transform: `rotate(${album.position.rotation}deg)`,
            opacity: 0.08,
            filter: 'blur(8px)',
            zIndex: 1,
          }}
        >
          <Image
            src={album.src}
            alt={album.alt}
            width={album.position.size}
            height={album.position.size}
            className="object-cover rounded-2xl"
            unoptimized={process.env.NODE_ENV === 'development'}
          />
        </div>
      ))}
      
      {/* White overlay to ensure text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(254, 243, 248, 0.4) 0%, rgba(245, 243, 255, 0.3) 30%, rgba(254, 243, 248, 0.4) 50%, rgba(245, 243, 255, 0.3) 70%, rgba(254, 243, 248, 0.4) 100%)',
          zIndex: 2,
        }}
      />

      {/* Animated Gradient Orbs - Similar to landing page */}
      <div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Beautiful Butterflies - Multiple sizes and positions */}
      <div className="absolute top-16 left-16 text-5xl opacity-25" style={{ transform: 'rotate(-15deg)', filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3))' }}>🦋</div>
      <div className="absolute top-24 right-20 text-4xl opacity-30" style={{ transform: 'rotate(20deg)', filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.3))' }}>🦋</div>
      <div className="absolute top-1/3 left-12 text-3xl opacity-20" style={{ transform: 'rotate(-25deg)', filter: 'drop-shadow(0 2px 6px rgba(139, 92, 246, 0.25))' }}>🦋</div>
      <div className="absolute top-2/3 right-16 text-4xl opacity-25" style={{ transform: 'rotate(15deg)', filter: 'drop-shadow(0 2px 8px rgba(236, 72, 153, 0.3))' }}>🦋</div>
      <div className="absolute bottom-24 left-20 text-5xl opacity-30" style={{ transform: 'rotate(-20deg)', filter: 'drop-shadow(0 2px 8px rgba(139, 92, 246, 0.3))' }}>🦋</div>
      <div className="absolute bottom-16 right-12 text-3xl opacity-20" style={{ transform: 'rotate(25deg)', filter: 'drop-shadow(0 2px 6px rgba(236, 72, 153, 0.25))' }}>🦋</div>
      <div className="absolute top-1/2 left-8 text-2xl opacity-15" style={{ transform: 'rotate(-10deg)', filter: 'drop-shadow(0 1px 4px rgba(139, 92, 246, 0.2))' }}>🦋</div>
      <div className="absolute top-3/4 right-8 text-2xl opacity-15" style={{ transform: 'rotate(10deg)', filter: 'drop-shadow(0 1px 4px rgba(236, 72, 153, 0.2))' }}>🦋</div>

      {/* Decorative Elements - Sparkles, Stars, Hearts */}
      <div className="absolute top-12 left-1/4 text-3xl opacity-20" style={{ filter: 'drop-shadow(0 2px 6px rgba(139, 92, 246, 0.3))' }}>✨</div>
      <div className="absolute top-20 right-1/4 text-2xl opacity-25" style={{ filter: 'drop-shadow(0 1px 4px rgba(236, 72, 153, 0.3))' }}>💜</div>
      <div className="absolute top-1/4 left-1/3 text-2xl opacity-20" style={{ filter: 'drop-shadow(0 1px 4px rgba(139, 92, 246, 0.25))' }}>💫</div>
      <div className="absolute top-3/4 right-1/3 text-2xl opacity-20" style={{ filter: 'drop-shadow(0 1px 4px rgba(236, 72, 153, 0.25))' }}>🌟</div>
      <div className="absolute bottom-20 left-1/4 text-3xl opacity-25" style={{ filter: 'drop-shadow(0 2px 6px rgba(139, 92, 246, 0.3))' }}>✨</div>
      <div className="absolute bottom-12 right-1/4 text-2xl opacity-20" style={{ filter: 'drop-shadow(0 1px 4px rgba(236, 72, 153, 0.25))' }}>💖</div>

      {/* Top Section - Premium Headline */}
      <div className="relative z-20 w-full pt-48 px-16 text-center flex-shrink-0">
        {/* Purple Heart Icon - Elegant */}
        <div 
          className="mx-auto mb-10 w-24 h-24 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: '50%',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
          }}
        >
          <span className="text-5xl">💜</span>
        </div>

        {/* Headline - Premium Gradient Text - Always Personalized */}
        <div className="space-y-4 mb-20">
          {isPersonalized ? (
            <div 
              className="font-black text-5xl leading-tight"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
                textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
              }}
            >
              {personalizedName.toUpperCase()},
            </div>
          ) : null}
          <div 
            className="font-black text-6xl leading-tight"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
            }}
          >
            YOU'RE
          </div>
          <div 
            className="font-black text-[140px] leading-none"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.04em',
              filter: 'drop-shadow(0 4px 20px rgba(139, 92, 246, 0.4))',
            }}
          >
            {connections}
          </div>
          <div 
            className="font-black text-5xl leading-tight"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
            }}
          >
            CONNECTIONS
          </div>
          <div 
            className="font-black text-5xl leading-tight"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.02em',
              textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
            }}
          >
            FROM TAYLOR SWIFT!
          </div>
        </div>
      </div>

      {/* Bottom Section - Premium Glass Card */}
      <div className="relative z-20 w-full pb-32 px-16 text-center flex-shrink-0">
        {/* Beautiful Glass-Effect Rarity Panel */}
        <div 
          className="rounded-3xl p-12 mb-10 mx-auto max-w-xl"
          style={{
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(30px) saturate(180%)',
            WebkitBackdropFilter: 'blur(30px) saturate(180%)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 20px 60px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1) inset, 0 1px 0 rgba(255, 255, 255, 0.2) inset',
          }}
        >
          {/* RARITY Label */}
          <p 
            className="font-bold mb-6"
            style={{ 
              fontSize: '18px',
              letterSpacing: '0.3em',
              color: '#8b5cf6',
              textShadow: '0 1px 3px rgba(139, 92, 246, 0.2)',
            }}
          >
            RARITY
          </p>
          
          {/* Rarity Message - Beautifully Styled and Personalized */}
          {isPersonalized ? (
            <>
              <p 
                className="font-bold leading-tight mb-3"
                style={{
                  fontSize: '36px',
                  lineHeight: '1.3',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
                }}
              >
                {personalizedName}, only {formattedRarity} of
              </p>
              <p 
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: '36px',
                  lineHeight: '1.3',
                  background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px rgba(236, 72, 153, 0.2)',
                }}
              >
                Swifties are this close! 💜
              </p>
            </>
          ) : (
            <>
              <p 
                className="font-bold leading-tight mb-3"
                style={{
                  fontSize: '36px',
                  lineHeight: '1.3',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
                }}
              >
                Only {formattedRarity} of
              </p>
              <p 
                className="font-black leading-tight mb-6"
                style={{
                  fontSize: '36px',
                  lineHeight: '1.3',
                  background: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px rgba(236, 72, 153, 0.2)',
                }}
              >
                Swifties are this close! 💜
              </p>
            </>
          )}

          {/* VIP Status - Personalized */}
          <p 
            className="font-bold mb-5"
            style={{ 
              fontSize: '24px',
              color: '#8b5cf6',
              textShadow: '0 1px 3px rgba(139, 92, 246, 0.2)',
            }}
          >
            {isPersonalized 
              ? `${personalizedName}, you're basically VIP status! ✨`
              : "You're basically VIP status! ✨"
            }
          </p>

          {/* Username */}
          <p 
            className="font-mono"
            style={{ 
              fontSize: '18px',
              color: '#64748b',
            }}
          >
            {username}
          </p>
        </div>

        {/* Footer - Clean Call to Action */}
        <div 
          className="font-semibold space-y-2"
          style={{
            fontSize: '18px',
            color: '#64748b',
          }}
        >
          <div>Find out how close you are to Taylor Swift at</div>
          <div 
            className="font-bold"
            style={{
              fontSize: '22px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            swifties.getsanely.com
          </div>
        </div>
      </div>
    </div>
  )
}
