'use client'

import React, { memo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

/**
 * Premium album cover collage background - horizontal scrolling carousel
 * Displays actual Taylor Swift album covers scrolling from left to right
 */
const AlbumCollageBackground = memo(() => {
  const prefersReducedMotion = useReducedMotion()
  
  // All album covers available in the images directory
  const albums = [
    { name: '1989', src: '/images/1989.jpg', alt: '1989 Album Cover' },
    { name: 'Evermore', src: '/images/evermore.jpg', alt: 'Evermore Album Cover' },
    { name: 'Fearless', src: '/images/fearless.jpg', alt: 'Fearless Album Cover' },
    { name: 'Folklore', src: '/images/folklore.jpg', alt: 'Folklore Album Cover' },
    { name: 'Lover', src: '/images/lover.jpg', alt: 'Lover Album Cover' },
    { name: 'Midnights', src: '/images/midnights.jpg', alt: 'Midnights Album Cover' },
    { name: 'Red', src: '/images/red.jpg', alt: 'Red Album Cover' },
    { name: 'Red (Taylor\'s Version)', src: '/images/red-taylor-version.jpg', alt: 'Red (Taylor\'s Version) Album Cover' },
    { name: 'Reputation', src: '/images/reputation.jpg', alt: 'Reputation Album Cover' },
    { name: 'Speak Now', src: '/images/speak-now.jpg', alt: 'Speak Now Album Cover' },
  ]

  // Duplicate albums for seamless infinite scroll
  const allAlbums = [...albums, ...albums, ...albums]

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Multiple horizontal scrolling rows with premium effects */}
      <div className="absolute inset-0 flex flex-col justify-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
        {/* Top row - scrolls left to right */}
        <div className="flex items-center">
          <div
            className={cn(
              'flex gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12',
              'will-change-transform',
              !prefersReducedMotion && 'animate-scroll-horizontal'
            )}
            style={{
              animationDuration: prefersReducedMotion ? '0s' : '80s',
            }}
          >
            {allAlbums.map((album, index) => (
              <div
                key={`top-${index}`}
                className={cn(
                  'relative aspect-square rounded-2xl',
                  'overflow-hidden',
                  'shadow-2xl border-2 border-white/40',
                  'opacity-15 hover:opacity-25 transition-all duration-500',
                  'flex-shrink-0',
                  'w-32 sm:w-40 md:w-48 lg:w-56 xl:w-72',
                  'backdrop-blur-sm',
                  'transform hover:scale-105 hover:rotate-2',
                  'group'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src={album.src}
                  alt={album.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 288px"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Middle row - scrolls right to left (reverse) */}
        <div className="flex items-center">
          <div
            className={cn(
              'flex gap-8 md:gap-10 lg:gap-12',
              'will-change-transform',
              !prefersReducedMotion && 'animate-scroll-horizontal-reverse'
            )}
            style={{
              animationDuration: prefersReducedMotion ? '0s' : '90s',
            }}
          >
            {allAlbums.map((album, index) => (
              <div
                key={`middle-${index}`}
                className={cn(
                  'relative aspect-square rounded-2xl',
                  'overflow-hidden',
                  'shadow-2xl border-2 border-white/40',
                  'opacity-12 hover:opacity-22 transition-all duration-500',
                  'flex-shrink-0',
                  'w-28 sm:w-36 md:w-44 lg:w-52 xl:w-64',
                  'backdrop-blur-sm',
                  'transform hover:scale-105 hover:-rotate-2',
                  'group'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src={album.src}
                  alt={album.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, (max-width: 1280px) 208px, 256px"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row - scrolls left to right */}
        <div className="flex items-center">
          <div
            className={cn(
              'flex gap-6 sm:gap-7 md:gap-8 lg:gap-10 xl:gap-12',
              'will-change-transform',
              !prefersReducedMotion && 'animate-scroll-horizontal'
            )}
            style={{
              animationDuration: prefersReducedMotion ? '0s' : '100s',
            }}
          >
            {allAlbums.map((album, index) => (
              <div
                key={`bottom-${index}`}
                className={cn(
                  'relative aspect-square rounded-2xl',
                  'overflow-hidden',
                  'shadow-2xl border-2 border-white/40',
                  'opacity-10 hover:opacity-20 transition-all duration-500',
                  'flex-shrink-0',
                  'w-24 sm:w-32 md:w-40 lg:w-48 xl:w-60',
                  'backdrop-blur-sm',
                  'transform hover:scale-105 hover:rotate-1',
                  'group'
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src={album.src}
                  alt={album.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, (max-width: 1280px) 192px, 240px"
                  unoptimized={process.env.NODE_ENV === 'development'}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Premium gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 via-purple-50/30 to-pink-50/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
})

AlbumCollageBackground.displayName = 'AlbumCollageBackground'

export default AlbumCollageBackground
