'use client'

import React, { memo, useState, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface PathNode {
  type: 'you' | 'connection' | 'taylor'
  label?: string
  delay?: number
}

interface VisualPathProps {
  connections?: number // Number of connections (3, 4, 5, etc.)
  firstName?: string | null // User's first name for personalization
}

// Generate path nodes based on connection count
// "5 connections" means 5 steps in the path, so we need:
// - 1 "you" node
// - (connections - 1) connection nodes (the intermediate people)
// - 1 "taylor" node
// Total: connections + 1 nodes
const generatePathNodes = (connections: number = 4, isMobile: boolean = false): PathNode[] => {
  const nodes: PathNode[] = [{ type: 'you', label: 'YOU' }]
  
  // Number of intermediate connection nodes (excluding you and Taylor)
  // If connections = 5, we need 4 intermediate nodes
  const intermediateNodes = connections - 1
  
  // On mobile, we might need to show fewer nodes for visibility, but let's try to show all
  // We'll make them smaller and scrollable instead
  const nodesToShow = intermediateNodes
  
  for (let i = 0; i < nodesToShow; i++) {
    nodes.push({ type: 'connection', delay: i * 0.2 })
  }
  
  // Always end with Taylor
  nodes.push({ type: 'taylor', label: 'TAYLOR' })
  
  return nodes
}

// Full path nodes (default)
const allPathNodes: PathNode[] = [
  { type: 'you', label: 'YOU' },
  { type: 'connection' },
  { type: 'connection', delay: 0.2 },
  { type: 'connection', delay: 0.4 },
  { type: 'taylor', label: 'TAYLOR' },
]

// Mobile path nodes - fewer connections for better visibility
const mobilePathNodes: PathNode[] = [
  { type: 'you', label: 'YOU' },
  { type: 'connection' },
  { type: 'connection', delay: 0.2 },
  { type: 'taylor', label: 'TAYLOR' },
]

// Premium SVG User Icon Component
const UserIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="9" r="3.5" fill="currentColor" />
    <path
      d="M6 21c0-3.314 2.686-6 6-6s6 2.686 6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
)

// Elegant Connection Icon - Simpler for mobile
const ConnectionIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
)

const VisualPath = memo(({ connections, firstName }: VisualPathProps = {}) => {
  const prefersReducedMotion = useReducedMotion()
  const [imageError, setImageError] = useState(false)
  const [currentFormat, setCurrentFormat] = useState<'webp' | 'jpg' | 'png' | 'fallback'>('webp')
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(0)

  // Detect mobile screen size and container width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
      // Get container width for dynamic sizing
      const container = document.querySelector('[data-visual-path-container]')
      if (container) {
        setContainerWidth(container.clientWidth)
      } else {
        setContainerWidth(window.innerWidth - 32) // Account for padding
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    // Check after a short delay to ensure DOM is ready
    setTimeout(checkMobile, 100)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Generate path nodes based on connections prop, or use default
  const pathNodes = connections 
    ? generatePathNodes(connections, isMobile)
    : (isMobile ? mobilePathNodes : allPathNodes)
  
  // Get user label - use first letter of firstName if provided, otherwise "YOU"
  const userLabel = firstName ? firstName.toUpperCase() : 'YOU'
  const userInitial = firstName ? firstName[0].toUpperCase() : null

  // Calculate dynamic sizing based on number of nodes
  // More nodes = smaller sizes to fit in viewport
  const totalNodes = pathNodes.length
  const getNodeSize = () => {
    if (totalNodes <= 4) {
      // 2-4 connections: larger nodes
      return {
        you: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18',
        connection: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16',
        taylor: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18',
        gap: 'gap-2 sm:gap-3 md:gap-4 lg:gap-5',
        arrow: 'w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6',
        text: 'text-base sm:text-lg md:text-xl lg:text-2xl',
        icon: 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9',
        label: 'text-[10px] sm:text-xs md:text-sm lg:text-base',
      }
    } else if (totalNodes === 5) {
      // 5 connections: medium nodes
      return {
        you: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16',
        connection: 'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14',
        taylor: 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16',
        gap: 'gap-1.5 sm:gap-2 md:gap-3 lg:gap-4',
        arrow: 'w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5',
        text: 'text-sm sm:text-base md:text-lg lg:text-xl',
        icon: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8',
        label: 'text-[9px] sm:text-[10px] md:text-xs lg:text-sm',
      }
    } else {
      // 6+ connections: smaller nodes
      return {
        you: 'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14',
        connection: 'w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12',
        taylor: 'w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14',
        gap: 'gap-1 sm:gap-1.5 md:gap-2 lg:gap-3',
        arrow: 'w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4',
        text: 'text-xs sm:text-sm md:text-base lg:text-lg',
        icon: 'w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7',
        label: 'text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs',
      }
    }
  }

  const sizes = getNodeSize()

  // Try formats in priority order: WebP -> JPG -> PNG -> Fallback
  const handleImageError = () => {
    if (currentFormat === 'webp') {
      setCurrentFormat('jpg')
    } else if (currentFormat === 'jpg') {
      setCurrentFormat('png')
    } else {
      setCurrentFormat('fallback')
      setImageError(true)
    }
  }

  const getImageSrc = () => {
    switch (currentFormat) {
      case 'webp':
        return '/images/taylor-swift.webp'
      case 'jpg':
        return '/images/taylor-swift.jpg'
      case 'png':
        return '/images/taylor-swift.png'
      default:
        return ''
    }
  }

  // Check if image exists on mount
  useEffect(() => {
    const checkImage = async () => {
      const formats: ('webp' | 'jpg' | 'png')[] = ['webp', 'jpg', 'png']
      
      for (const format of formats) {
        const img = new window.Image()
        const src = `/images/taylor-swift.${format}`
        
        await new Promise<void>((resolve) => {
          img.onload = () => {
            if (img.complete && img.naturalWidth > 0) {
              setCurrentFormat(format)
              resolve()
              return
            }
            resolve()
          }
          img.onerror = () => {
            if (format === 'png') {
              setCurrentFormat('fallback')
              setImageError(true)
            }
            resolve()
          }
          img.src = src
        })
        
        if (img.complete && img.naturalWidth > 0) {
          break
        }
      }
    }
    
    checkImage()
  }, [])

  return (
    <div 
      data-visual-path-container
      className="w-full mb-4 sm:mb-6 px-2 sm:px-4"
      style={{ 
        maxWidth: '100%',
        overflow: 'hidden'
      }}
    >
      <div
        className={cn(
          "flex items-center justify-center flex-nowrap w-full",
          sizes.gap
        )}
        role="img"
        aria-label="Visual representation of connection path from you to Taylor Swift"
        style={{
          // Ensure everything fits in one viewport
          maxWidth: '100%',
          minWidth: 0, // Allow flex items to shrink
        }}
      >
      {pathNodes.map((node, index) => {
        const isLast = index === pathNodes.length - 1

        return (
          <React.Fragment key={index}>
            {/* Node */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ minWidth: 0 }}>
              {node.type === 'you' && (
                <div
                  className={cn(
                    sizes.you,
                    'rounded-full border-2 border-purple-gradient-start flex-shrink-0',
                    'flex items-center justify-center',
                    'bg-gradient-to-br from-white via-purple-50 to-pink-50',
                    'shadow-md sm:shadow-lg',
                    'relative group',
                    'hover:scale-105 transition-all duration-300'
                  )}
                  style={{ borderWidth: '2px' }}
                  aria-label={firstName || "You"}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-md sm:blur-lg group-hover:blur-xl transition-all duration-300" />
                  {userInitial ? (
                    <span className={cn(
                      'text-purple-gradient-start relative z-10 font-black',
                      sizes.text
                    )}>
                      {userInitial}
                    </span>
                  ) : (
                    <UserIcon className={cn(
                      'text-purple-gradient-start relative z-10',
                      sizes.icon
                    )} />
                  )}
                </div>
              )}

              {node.type === 'connection' && (
                <div
                  className={cn(
                    sizes.connection,
                    'flex items-center justify-center flex-shrink-0',
                    'rounded-full',
                    'bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-purple-100/90',
                    'border-2 border-purple-200/70',
                    'shadow-sm sm:shadow-md backdrop-blur-sm',
                    !prefersReducedMotion && 'animate-pulse-gentle',
                    'relative group',
                    'hover:scale-110 hover:border-purple-300 transition-all duration-300'
                  )}
                  style={!prefersReducedMotion && node.delay ? { animationDelay: `${node.delay}s` } : undefined}
                  aria-label="Connection"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ConnectionIcon className={cn(
                    sizes.icon,
                    'text-purple-gradient-start/80 relative z-10'
                  )} />
                </div>
              )}

              {node.type === 'taylor' && (
                <div
                  className={cn(
                    sizes.taylor,
                    'rounded-full flex items-center justify-center flex-shrink-0',
                    'overflow-hidden border-2 border-purple-gradient-start',
                    'shadow-md sm:shadow-lg',
                    'bg-gradient-to-br from-purple-100 to-pink-100',
                    'relative group',
                    'hover:scale-105 transition-all duration-300'
                  )}
                  style={{ borderWidth: '2px' }}
                  aria-label="Taylor Swift"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-md sm:blur-lg group-hover:blur-xl transition-all duration-300" />
                  {currentFormat !== 'fallback' ? (
                    <Image
                      src={getImageSrc()}
                      alt="Taylor Swift"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover rounded-full relative z-10"
                      priority
                      onError={handleImageError}
                      unoptimized={process.env.NODE_ENV === 'development'}
                    />
                  ) : (
                    <span className={cn(
                      'relative z-10',
                      sizes.text
                    )}>✨</span>
                  )}
                </div>
              )}

              {node.label && (
                <span className={cn(
                  sizes.label,
                  'font-bold text-purple-dark mt-1 sm:mt-1.5 md:mt-2 tracking-wide whitespace-nowrap'
                )}>
                  {node.type === 'you' ? userLabel : node.label}
                </span>
              )}
            </div>

            {/* Elegant Arrow - Dynamic sizing */}
            {!isLast && (
              <div
                className="flex-shrink-0 relative"
                aria-hidden="true"
              >
                <svg
                  className={cn(
                    sizes.arrow,
                    'text-purple-gradient-start'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 blur-sm opacity-30">
                  <svg
                    className={cn(
                      sizes.arrow,
                      'text-purple-300'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
              </div>
            )}
          </React.Fragment>
        )
      })}
      </div>
    </div>
  )
})

VisualPath.displayName = 'VisualPath'

export default VisualPath
