import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ListSkeletonProps {
  id?: string
  className?: string
  rows?: number
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ className, id = 'ListSkeleton', rows = 3 }) =>
  <div id={id} role="status" className={twMerge("p-4 pt-0 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse", className)}>
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center justify-between pt-4">
        <div className='w-7/12'>
          <div className="w-3/4 h-2.5 bg-gray-300 rounded-full mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full"></div>
        </div>
        <div className="w-1/5 h-2.5 bg-gray-300 rounded-full"></div>
      </div>
    ))}
  </div>

export default ListSkeleton
