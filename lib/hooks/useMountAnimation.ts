'use client'

import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

interface UseMountAnimationOptions {
  delay?: number
  duration?: number
}

/**
 * Hook to trigger animation on component mount
 * Respects reduced motion preferences
 */
export function useMountAnimation(
  options: UseMountAnimationOptions = {}
): boolean {
  const { delay = 0, duration = 600 } = options
  const prefersReducedMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setIsMounted(true)
      return
    }

    // Trigger animation after delay
    const timer = setTimeout(() => {
      setIsMounted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, prefersReducedMotion])

  return isMounted
}

