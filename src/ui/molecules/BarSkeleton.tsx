import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BarSkeletonProps {
  id?: string
  className?: string
  rows?: number
  legend?: number
}

export const BarSkeleton: React.FC<BarSkeletonProps> = ({ className, id = 'BarSkeleton', rows = 3, legend = 3 }) =>
  <div id={id} role="status" className={twMerge("m-2 p-3 border border-gray-200 rounded shadow animate-pulse flex flex-col gap-2", className)}>
    {!!rows && <div id={`${id}Bars`} className="flex flex-col items-baseline gap-1">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-2 bg-gray-200" style={{ width: `${w[i % w.length]}%` }} />
      ))}
    </div>}
    {!!legend && <div id={`${id}Legend`} className="flex justify-center gap-1">
      {Array.from({ length: legend }).map((_, i) => (
        <div key={i} className="h-2.5 max-w-[10%] grow bg-gray-200 rounded-full" />
      ))}
    </div>}
  </div>

export default BarSkeleton

const w = [90, 64, 80, 56, 72, 80, 64]
