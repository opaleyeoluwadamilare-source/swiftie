'use client'

import React, { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
}

/**
 * Hook to observe when an element enters the viewport
 * Useful for scroll-triggered animations
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): { ref: React.RefObject<HTMLElement>; hasIntersected: boolean } {
  const {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  } = options

  const elementRef = useRef<HTMLElement>(null)
  const [hasIntersected, setHasIntersected] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Skip if already triggered and triggerOnce is true
    if (triggerOnce && hasTriggered.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting

        if (isVisible) {
          setHasIntersected(true)
          if (triggerOnce) {
            hasTriggered.current = true
          }
        } else if (!triggerOnce) {
          setHasIntersected(false)
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, root, rootMargin, triggerOnce])

  return { ref: elementRef, hasIntersected }
}

