import React from 'react'
import { twMerge } from 'tailwind-merge'

interface LineSkeletonProps {
  id?: string
  /** @default `w-44 h-2.5` */
  className?: string
}

export const LineSkeleton: React.FC<LineSkeletonProps> = ({ className, id = 'LineSkeleton' }) =>
  <div id={id} role="status" className="animate-pulse">
    <div className={twMerge('w-44 h-2.5 bg-gray-200 rounded-full', className)}></div>
  </div>

export default LineSkeleton
