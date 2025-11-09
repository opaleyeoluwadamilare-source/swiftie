'use client'

import React, { memo } from 'react'
import { cn } from '@/lib/utils'

interface SwiftieBadgeProps {
  text: string
  className?: string
}

const SwiftieBadge = memo(({ text, className }: SwiftieBadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1',
        'px-3 py-1 rounded-full',
        'bg-gradient-to-r from-purple-100 to-pink-100',
        'border border-purple-200',
        'text-xs font-medium text-purple-dark',
        className
      )}
    >
      <span>💜</span>
      <span>{text}</span>
    </div>
  )
})

SwiftieBadge.displayName = 'SwiftieBadge'

export default SwiftieBadge

