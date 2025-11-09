/**
 * Shared TypeScript types for the application
 */

export interface QuizStartHandler {
  (): void
}

export interface Testimonial {
  text: string
  author: string
}

export interface PrivacyPoint {
  text: string
}

export interface Step {
  emoji: string
  title: string
  description: string
}

