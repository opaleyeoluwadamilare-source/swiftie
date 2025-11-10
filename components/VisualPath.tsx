'use client'

import React, { memo, useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface PathNode {
  type: 'you' | 'connection' | 'taylor'
  label?: string
  delay?: number
}

interface VisualPathProps {
  connections?: number // Number of intermediate people in the path (2-6). Example: 2 = YOU → Person1 → Person2 → TAYLOR
  firstName?: string | null // User's first name for personalization
}

// Generate path nodes based on connection count
// "X connections" means X intermediate people between you and Taylor
// Example: 2 connections = YOU → Person1 → Person2 → TAYLOR
// So we need:
// - 1 "you" node
// - connections number of intermediate connection nodes
// - 1 "taylor" node
// Total: connections + 2 nodes
const generatePathNodes = (connections: number = 4, isMobile: boolean = false): PathNode[] => {
  const nodes: PathNode[] = [{ type: 'you', label: 'YOU' }]
  
  // Number of intermediate connection nodes (the people between you and Taylor)
  // If connections = 2, we need 2 intermediate nodes: YOU → Person1 → Person2 → TAYLOR
  // If connections = 5, we need 5 intermediate nodes: YOU → P1 → P2 → P3 → P4 → P5 → TAYLOR
  const intermediateNodes = connections
  
  // Always show all nodes - we'll make them smaller if needed to fit
  for (let i = 0; i < intermediateNodes; i++) {
    nodes.push({ type: 'connection', delay: i * 0.15 })
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
const UserIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
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
const ConnectionIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    className={className}
    style={style}
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
  const containerRef = useRef<HTMLDivElement>(null)
  const [scaleFactor, setScaleFactor] = useState(1)

  // Generate path nodes based on connections prop, or use default
  const connectionCount = connections || 4 // Default to 4 if not provided
  const pathNodes = generatePathNodes(connectionCount, false)
  
  // Get user label - use first letter of firstName if provided, otherwise "YOU"
  const userLabel = firstName ? firstName.toUpperCase() : 'YOU'
  const userInitial = firstName ? firstName[0].toUpperCase() : null

  // Calculate total nodes: 1 (you) + connections + 1 (taylor) = connections + 2
  const totalNodes = pathNodes.length

  // Calculate responsive base sizes based on connection count
  // These will be scaled by the scaleFactor
  const baseSizes = useMemo(() => {
    // Base sizes that work well for different connection counts
    // These are scaled down proportionally based on number of connections
    const baseScale = Math.max(0.6, 1 - (connectionCount - 2) * 0.1) // Scale down as connections increase
    
    return {
      nodeSize: Math.round(56 * baseScale), // Base node size
      connectionSize: Math.round(48 * baseScale), // Connection node size (slightly smaller)
      arrowSize: Math.round(20 * baseScale), // Arrow size
      gapSize: Math.round(8 * baseScale), // Gap between elements
      fontSize: Math.max(10, Math.round(14 * baseScale)), // Font size
      iconSize: Math.round(24 * baseScale), // Icon size
      labelSize: Math.max(8, Math.round(10 * baseScale)), // Label font size
    }
  }, [connectionCount])

  // Calculate scale factor to fit all nodes in container
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return

      const container = containerRef.current
      const containerWidth = container.clientWidth
      const containerPadding = 32 // Account for padding (px-2 sm:px-4 = 8-16px)
      const availableWidth = containerWidth - containerPadding

      // Calculate total width needed using actual base sizes
      // We have: 1 you node + (connections) connection nodes + 1 taylor node
      // Arrows: (totalNodes - 1) arrows
      // Gaps: (totalNodes - 1) gaps
      const youNodeWidth = baseSizes.nodeSize
      const connectionNodesWidth = (totalNodes - 2) * baseSizes.connectionSize // All connection nodes
      const taylorNodeWidth = baseSizes.nodeSize
      const arrowsWidth = (totalNodes - 1) * baseSizes.arrowSize
      const gapsWidth = (totalNodes - 1) * baseSizes.gapSize
      
      const totalNeededWidth = youNodeWidth + connectionNodesWidth + taylorNodeWidth + arrowsWidth + gapsWidth

      // Calculate scale factor
      let scale = 1
      if (totalNeededWidth > availableWidth) {
        scale = availableWidth / totalNeededWidth
        // Add some padding (0.92 = 92% of available space to ensure fit)
        scale = scale * 0.92
      }

      // Clamp scale between reasonable bounds
      scale = Math.max(0.35, Math.min(1.1, scale))
      setScaleFactor(scale)
    }

    calculateScale()
    window.addEventListener('resize', calculateScale)
    
    // Recalculate after a short delay to ensure DOM is ready
    const timeout = setTimeout(calculateScale, 100)
    
    return () => {
      window.removeEventListener('resize', calculateScale)
      clearTimeout(timeout)
    }
  }, [totalNodes, connections, baseSizes])

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
      ref={containerRef}
      data-visual-path-container
      className="w-full mb-4 sm:mb-6 px-2 sm:px-4"
      style={{ 
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center justify-center flex-nowrap w-full"
        role="img"
        aria-label="Visual representation of connection path from you to Taylor Swift"
        style={{
          transform: `scale(${scaleFactor})`,
          transformOrigin: 'center',
          gap: `${baseSizes.gapSize}px`,
        }}
      >
      {pathNodes.map((node, index) => {
        const isLast = index === pathNodes.length - 1

        return (
          <React.Fragment key={index}>
            {/* Node */}
            <div className="flex flex-col items-center flex-shrink-0">
              {node.type === 'you' && (
                <div
                  className="rounded-full border-2 border-purple-gradient-start flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-md relative group hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: `${baseSizes.nodeSize}px`,
                    height: `${baseSizes.nodeSize}px`,
                    borderWidth: '2px'
                  }}
                  aria-label={firstName || "You"}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-md group-hover:blur-xl transition-all duration-300" />
                  {userInitial ? (
                    <span 
                      className="text-purple-gradient-start relative z-10 font-black"
                      style={{ fontSize: `${baseSizes.fontSize}px` }}
                    >
                      {userInitial}
                    </span>
                  ) : (
                    <UserIcon 
                      className="text-purple-gradient-start relative z-10"
                      style={{ width: `${baseSizes.iconSize}px`, height: `${baseSizes.iconSize}px` }}
                    />
                  )}
                </div>
              )}

              {node.type === 'connection' && (
                <div
                  className="flex items-center justify-center flex-shrink-0 rounded-full bg-gradient-to-br from-purple-100/90 via-pink-100/90 to-purple-100/90 border-2 border-purple-200/70 shadow-sm backdrop-blur-sm relative group hover:scale-110 hover:border-purple-300 transition-all duration-300"
                  style={{ 
                    width: `${baseSizes.connectionSize}px`,
                    height: `${baseSizes.connectionSize}px`,
                    animationDelay: !prefersReducedMotion && node.delay ? `${node.delay}s` : undefined
                  }}
                  aria-label="Connection"
                >
                  {!prefersReducedMotion && <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300/20 to-pink-300/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-gentle" />}
                  <ConnectionIcon 
                    className="text-purple-gradient-start/80 relative z-10"
                    style={{ width: `${baseSizes.iconSize}px`, height: `${baseSizes.iconSize}px` }}
                  />
                </div>
              )}

              {node.type === 'taylor' && (
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border-2 border-purple-gradient-start shadow-md bg-gradient-to-br from-purple-100 to-pink-100 relative group hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: `${baseSizes.nodeSize}px`,
                    height: `${baseSizes.nodeSize}px`,
                    borderWidth: '2px'
                  }}
                  aria-label="Taylor Swift"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-md group-hover:blur-xl transition-all duration-300" />
                  {currentFormat !== 'fallback' ? (
                    <Image
                      src={getImageSrc()}
                      alt="Taylor Swift"
                      width={baseSizes.nodeSize}
                      height={baseSizes.nodeSize}
                      className="w-full h-full object-cover rounded-full relative z-10"
                      priority
                      onError={handleImageError}
                      unoptimized={process.env.NODE_ENV === 'development'}
                    />
                  ) : (
                    <span 
                      className="relative z-10"
                      style={{ fontSize: `${baseSizes.fontSize}px` }}
                    >✨</span>
                  )}
                </div>
              )}

              {node.label && (
                <span 
                  className="font-bold text-purple-dark mt-1 tracking-wide whitespace-nowrap"
                  style={{ fontSize: `${baseSizes.labelSize}px` }}
                >
                  {node.type === 'you' ? userLabel : node.label}
                </span>
              )}
            </div>

            {/* Elegant Arrow - Dynamic sizing */}
            {!isLast && (
              <div
                className="flex-shrink-0 relative"
                aria-hidden="true"
                style={{ width: `${baseSizes.arrowSize}px`, height: `${baseSizes.arrowSize}px` }}
              >
                <svg
                  className="text-purple-gradient-start"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: '100%', height: '100%' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 blur-sm opacity-30">
                  <svg
                    className="text-purple-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    style={{ width: '100%', height: '100%' }}
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
