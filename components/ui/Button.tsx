import React, { forwardRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'lg',
      isLoading = false,
      disabled,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || isLoading) return
        onClick?.(e)
      },
      [disabled, isLoading, onClick]
    )

    const baseStyles = cn(
      'relative inline-flex items-center justify-center',
      'font-bold rounded-full',
      'transition-all duration-300 ease-out',
      'focus:outline-none focus:ring-4 focus:ring-purple-300/50 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      'active:scale-[0.98]',
      'overflow-hidden',
      'text-center',
      'px-4 sm:px-6 md:px-8',
      className
    )

    const variantStyles = {
      primary: cn(
        'gradient-button text-white',
        'shadow-[0px_8px_32px_rgba(139,92,246,0.4)]',
        'hover:scale-105 hover:shadow-[0px_12px_48px_rgba(139,92,246,0.5)]',
        'will-change-transform',
        'border border-white/20'
      ),
      secondary: cn(
        'bg-white text-purple-gradient-start border-2 border-purple-gradient-start',
        'hover:bg-purple-50 shadow-lg hover:shadow-xl',
        'backdrop-blur-sm'
      ),
      outline: cn(
        'bg-transparent text-purple-gradient-start border-2 border-purple-gradient-start',
        'hover:bg-purple-50/50 shadow-md hover:shadow-lg',
        'backdrop-blur-sm'
      ),
    }

    const sizeStyles = {
      sm: 'h-12 text-sm sm:text-base',
      md: 'h-14 text-base sm:text-lg',
      lg: 'h-16 text-base sm:text-lg md:text-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size])}
        disabled={disabled || isLoading}
        onClick={handleClick}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin text-2xl">⏳</span>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
