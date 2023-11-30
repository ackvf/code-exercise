import React, { useCallback, useEffect, useMemo, useReducer } from "react"

import useShallowState from '@/hooks/useShallowState'
import { BarChart, Dropdown, LineSkeleton, SeatAllocationForm, type BarChartData, type Category, type SeatAllocationFormState, ArrowUpRight, colors } from '@/ui'

export interface SeatManagementPageProps {
  seatCategories?: Category[]
  lastUpdateTime?: string
}

export const SeatManagementTemplate: React.FC<SeatManagementPageProps> = (props) => {
  const [seatFormStateRef, resetSeatFormStateRef] = useReducer(() => Math.random(), Math.random())
  const [{ lastUpdateTime, seatCategories, total, barChartData }, setState] = useShallowState({
    lastUpdateTime: '',
    seatCategories: [],
    ...props,
    barChartData: {} as BarChartData,
    total: 0,
  })

  /** Update state after fetch. */
  const updateState = useCallback((props: SeatManagementPageProps) => {
    const barChartData = categoriesToBarChartData(props.seatCategories)
    setState({
      ...props,
      barChartData,
      total: barChartData._total
    })
  }, [setState])

  useEffect(() => void updateState(props), [props, updateState])

  /** Update state after form submit. */
  const handleSeatsUpdate = useCallback((state: SeatAllocationFormState) => {
    console.log('[SEAT ENTRY FORM]:', state)
    const seatCategories: Category[] = Object.entries(state).map(([name, seats]) => ({ name, seats }))
    const barChartData = categoriesToBarChartData(seatCategories)
    setState({
      seatCategories,
      lastUpdateTime: new Date().toLocaleString().replace(/, /, ' at ').toLowerCase(),
      barChartData,
      total: barChartData._total
    })
  }, [setState])

  const dropdownOptions = useMemo((onClick = function (this: { label: string }) { console.log('[DROPDOWN]:', this.label) }) => ([
    {
      label: 'Download CSV',
      onClick,
    },
    {
      label: 'Configure Admission Process',
      onClick,
    },
    {
      label: 'Reset All Open Seats',
      onClick: resetSeatFormStateRef
    },
    {
      label: 'Change Seat Allocation Status',
      onClick,
    }
  ]), [])

  const isLoaded = !!seatCategories.length

  return (
    <div id="Container" className="w-[1440px] h-[1036px] px-[120px] py-16 bg-white rounded-lg flex-col justify-start items-center gap-14 inline-flex">
      <div id="Header" className="w-[1200px] pr-1 justify-between items-start inline-flex">
        <div className="w-[791px] flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch text-[64px] font-bold leading-[74px]">Seat Management</div>
          <div className="self-stretch text-5xl font-bold leading-[56px]">Admission Process Name</div>
          <div className="self-stretch text-[40px] font-bold leading-[48px]">School Name</div>
          <div id="Description" className="self-stretch text-2xl font-normal leading-loose">The number of offers made to students in the lottery depends on the number of seats you declare.</div>
        </div>
        <Dropdown label="Actions" options={dropdownOptions} />
      </div>
      <div id="Line" className="w-[1196px] min-h-[8px] bg-slate-100" />
      <div id="SchoolsTable" className="h-[498px] flex-col justify-start items-start gap-12 flex">
        <div className="flex-col justify-start items-start gap-4 flex">
          <div className="w-[1200px] justify-start items-center gap-12 inline-flex">
            <div id="Grades" className="grow shrink basis-0 text-[40px] font-bold leading-[48px]">Grades</div>
            <div id="InfoAndButton" className="justify-start items-center gap-6 flex">
              {lastUpdateTime
                ? <div className="text-right text-xs font-normal leading-tight">Last Updated {lastUpdateTime}</div>
                : <LineSkeleton />
              }
            </div>
          </div>
        </div>
        <div id="TableContainer" className="self-stretch h-[402px] flex-col justify-start items-start gap-8 flex">
          <div id="HeaderRow" className="self-stretch h-[82px] pb-4 border-b-2 border-slate-100 justify-start items-start inline-flex">
            <div id="TableCell" className="w-[167px] pb-4 flex-col justify-start items-start gap-3.5 inline-flex">
              <div id="Line" className="self-stretch h-0.5 bg-yellow-400" />
              <div id="TextContainer" className="self-stretch pl-1 pr-2 py-1 justify-start items-center gap-2.5 inline-flex">
                <div id="HeaderCell" className="text-center text-xs font-bold leading-none">School Name</div>
              </div>
            </div>
            <div id="TableCell" className="w-[167px] pb-4 flex-col justify-start items-center gap-3.5 inline-flex">
              <div id="Line" className="self-stretch h-0.5 bg-yellow-400" />
              <div id="TextContainer" className="self-stretch h-6 p-1 flex-col justify-center items-center gap-2 flex">
                <div id="HeaderCellAndTooltip" className="justify-start items-center gap-1 inline-flex">
                  <div id="HeaderCell" className="text-center text-xs font-bold leading-none">Applicant List</div>
                </div>
              </div>
            </div>
            <div id="TableCell" className="w-[533px] pb-4 flex-col justify-start items-center gap-3.5 inline-flex">
              <div id="Line" className="self-stretch h-0.5 bg-yellow-400" />
              <div id="TextContainer" className="self-stretch p-1 justify-center items-center gap-1 inline-flex">
                <div id="LegendTableCell" className="grow shrink basis-0 self-stretch px-1 flex-col justify-start items-center gap-1.5 inline-flex">
                  <div id="TextAndIcon" className="self-stretch justify-center items-center gap-1 inline-flex">
                    <div id="CurrentStatus" className="text-center text-xs font-bold leading-none">Current Status</div>
                    <div id="StandardTooltip" className="w-3 h-3 relative" />
                  </div>
                  <div id="LegendContainer" className="self-stretch justify-center items-center gap-4 inline-flex">
                    {isLoaded
                      ? seatCategories?.map(({ name, seats }, ix) => (
                        <div key={name} id="DataLegend" className="justify-start items-center gap-1 flex">
                          <div id="LegendColor" style={{ backgroundColor: colors[ix] }} className="w-3 h-3 rounded-full border border-black" />
                          <div id="LegendLabel" className="text-slate-600 text-xs font-normal leading-tight">{name}</div>
                        </div>
                      ))
                      : <LineSkeleton className='w-24 h-4' />
                    }
                  </div>
                </div>
              </div>
            </div>
            <div id="TableCell" className="grow shrink basis-0 pb-4 flex-col justify-start items-center gap-3.5 inline-flex">
              <div id="Line" className="self-stretch h-0.5 bg-yellow-400" />
              <div id="TextContainer" className="self-stretch h-6 p-1 flex-col justify-center items-center gap-2 flex">
                <div id="HeaderCellAndTooltip" className="justify-start items-center gap-1 inline-flex">
                  <div id="HeaderCell" className="text-center text-xs font-bold leading-none">Open Seats</div>
                </div>
              </div>
            </div>
          </div>
          <div id="GradesContainer" className="flex-col justify-start items-start gap-12 flex">
            <div id="Grade" className="flex-col justify-start items-end gap-4 flex">
              <div className="w-[1200px] text-[22px] font-bold leading-7">Grade 8</div>
              <div id="TableRows" className="border-b-2 border-slate-100 flex-col justify-start items-start gap-8 flex">
                <div id="TableRow" className="w-[1200px] py-4 border-t-2 border-slate-100 justify-start items-center gap-6 inline-flex">
                  <div id="LeftTableCells" className="justify-start items-center flex">
                    <div className="TableCell w-[167px] pb-4 flex-col justify-start items-center gap-3.5 inline-flex">
                      <div className="TextContainer self-stretch pl-1 pr-2 justify-start items-center gap-2 inline-flex">
                        <div className="TitleCell grow shrink basis-0 text-sky-950 text-lg font-bold font-['IBM Plex Sans'] leading-normal">Default</div>
                      </div>
                    </div>
                    <div className="TableCell w-[157px] px-2 flex-col justify-start items-center inline-flex">
                      <div className="TextButton p-0.5 rounded flex-col justify-start items-center flex">
                        <div className="TextAndIcon justify-center items-center gap-1 inline-flex">
                          <div className="ButtonText text-slate-600 text-2xl font-normal font-['IBM Plex Sans'] leading-loose">809</div>
                          <ArrowUpRight />
                        </div>
                      </div>
                    </div>
                    <SeatAllocationForm key={seatFormStateRef} loading={!isLoaded} onChange={handleSeatsUpdate} initialCategories={seatCategories} />
                    <BarChart data={barChartData} loading={!isLoaded} />
                  </div>
                </div>
              </div>
              {total
                ? <div className="text-right text-black text-base font-bold leading-normal">Grade 8 Total Open Seats: {total}</div>
                : <LineSkeleton className='w-56 h-4' />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatManagementTemplate

function categoriesToBarChartData(categories: Category[] = []): BarChartData {
  const total = Object.values(categories).reduce((acc, { seats }) => acc + seats ?? 0, 0)
  return categories?.reduce((acc, category) => {
    if (typeof category === 'string') return { ...acc, [category]: 0 }
    return {
      ...acc,
      [category.name]: category.seats,
      _percent: {
        ...acc._percent,
        [category.name]: category.seats ? Math.round(100 * category.seats / total) || 0 : 0
      }
    } satisfies BarChartData
  }, { _percent: {}, _total: total } as any) as BarChartData ?? {}
}
