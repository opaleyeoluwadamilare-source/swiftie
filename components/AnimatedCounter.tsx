'use client'

import { useEffect, useState, useRef } from 'react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface AnimatedCounterProps {
  target: number
  duration?: number
  className?: string
}

/**
 * Animated counter component with smooth number animation
 * Respects reduced motion preferences
 */
export default function AnimatedCounter({
  target,
  duration = 1000,
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const hasAnimated = useRef(false)

  useEffect(() => {
    // Check if counter-trigger exists, otherwise start immediately (for above-fold usage)
    const element = document.getElementById('counter-trigger')
    
    if (element) {
      // Use Intersection Observer to trigger animation when visible
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            setIsVisible(true)
            hasAnimated.current = true
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(element)

      return () => {
        observer.unobserve(element)
      }
    } else {
      // No trigger element found, start immediately (for hero section)
      setIsVisible(true)
      hasAnimated.current = true
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    const startValue = Math.floor(target * 0.9)
    const increment = (target - startValue) / (duration / 16) // 60fps
    let current = startValue
    const startTime = Date.now()

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      if (elapsed >= duration) {
        setCount(target)
        clearInterval(timer)
      } else {
        current += increment
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration, isVisible, prefersReducedMotion])

  return (
    <span className={className} aria-live="polite" aria-atomic="true">
      {count.toLocaleString()}
    </span>
  )
}
