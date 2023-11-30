import { useEffect, useState } from 'react'
import { type NextPage } from 'next'

import useToggle from '@/hooks/useToggle'
import { inspect, sleepResolve } from '@/utils'
import { SeatManagementTemplate, type Category, type SeatManagementPageProps } from '@/ui'

const emptyData = {
  seatCategories: [],
  lastUpdateTime: '',
}

const mockData = {
  seatCategories: [
    { name: 'A', seats: 0 },
    { name: 'B', seats: 0 },
    { name: 'C', seats: 100 }
  ] satisfies Category[],
  lastUpdateTime: '1/24/22 at 10:31 am',
}

const HomePage: NextPage = () => {
  const [data, setData] = useState<SeatManagementPageProps>(emptyData)

  useEffect(() => {
    sleepResolve(2000, mockData).then(setData)
  }, [])

  /* /-- */

  const [isFakingLoading, toggleFakeLoading] = useToggle(null)
  const toggleData = isFakingLoading ? emptyData : mockData
  inspect({ toggleFakeLoading })

  /* --/ */

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <SeatManagementTemplate {...(isFakingLoading === null ? data : toggleData)} />
    </main>
  )
}

export default HomePage
