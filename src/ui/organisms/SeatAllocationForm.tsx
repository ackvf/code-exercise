import React, { type ChangeEventHandler, useCallback, useMemo, useRef } from 'react'

import useForceUpdate from '@/hooks/useForceUpdate'
import { useFormState } from '@/hooks/useFormState'
import { ListSkeleton, Pen } from '@/ui'


interface SeatAllocationFormProps {
  loading?: boolean
  initialCategories: Array<string | Category>
  onChange?: (seatEntries: SeatEntryState) => void
}

export interface Category {
  name: string
  seats: number
}

export interface SeatEntryState {
  [key: Category['name']]: Category['seats']
}

export const SeatAllocationForm: React.FC<SeatAllocationFormProps> = ({ loading, ...props }) =>
  loading
    ? <ListSkeleton className="w-[253px] m-2 p-3 pt-[2px] [&>div]:pt-3 space-y-3" rows={3} />
    : <SeatAllocationFormComponent {...props} />

export default SeatAllocationForm

const SeatAllocationFormComponent: React.FC<SeatAllocationFormProps> = ({ initialCategories: categories, onChange }) => {
  const forceUpdate = useForceUpdate()

  const handleSaveForm = useCallback(() => {
    lastState.current = refState.current
    forceUpdate()
    onChange?.(refState.current)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const initialCategories = useMemo(() => categories.reduce((acc, category) => {
    if (typeof category === 'string') return { ...acc, [category]: 0 }
    return { ...acc, [category.name]: category.seats }
  }, {} as SeatEntryState), []) // eslint-disable-line react-hooks/exhaustive-deps

  const emptyCategories = useMemo(() => categories.reduce((acc, category) => {
    if (typeof category === 'string') return { ...acc, [category]: 0 }
    return { ...acc, [category.name]: 0 }
  }, {} as SeatEntryState), []) // eslint-disable-line react-hooks/exhaustive-deps

  const [formState, { onNumberInputChange }, , refState] = useFormState<SeatEntryState>(emptyCategories, initialCategories, {
    onChange(state, field) { if (state[field] < 0) state[field] = 0 },
  })

  const lastState = useRef(initialCategories)
  const total = useMemo(() => Object.values(formState).reduce((acc, seats) => acc + seats, 0), [formState])
  const enableSave = Object.entries(formState).some(([name, value]) => lastState.current[name] !== value)

  const rows = useMemo(() =>
    Object.entries(formState).map(([name, value], i) =>
      <Row key={name} {...{ name, value, percent: Math.round(100 * value / total), onChange: onNumberInputChange }} />
    ), [formState, total, onNumberInputChange])

  return (
    <div id="SeatAllocationForm" className="w-[253px] p-2 flex flex-col gap-2">
      <div className="flex gap-[5px]">
        <div className="grow flex flex-col gap-[10px]">
          {rows}
        </div>
        <div id="Total" className="w-[54px] flex items-center justify-center bg-slate-100 rounded-lg text-slate-600 text-base font-bold" >
          <span title={total.toString()} className='overflow-hidden text-ellipsis'>{total}</span>
        </div>
      </div>
      <div id="ButtonPrimary" onClick={handleSaveForm} className={`${enableSave ? 'bg-blue-700 text-white cursor-pointer' : 'bg-zinc-100 text-neutral-400 cursor-default'} px-6 py-1.5 rounded-lg text-center text-sm font-bold`}>
        Save
      </div>
    </div>
  )
}

interface RowProps {
  name: string
  value: number
  percent: number
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Row: React.FC<RowProps> = ({ name, value, percent, onChange }) => (
  <div id="FormItem" className="items-center flex">
    <div className="grow pl-[15%] text-slate-600 text-xs font-normal leading-tight">{`${name}:  ${percent}%`}</div>
    <label htmlFor={name} className="relative bg-white rounded border border-slate-300 justify-start items-center inline-flex cursor-text">
      <input id={name} name={name} value={value.toString()} min={0} onChange={onChange} type='number' className="w-[65px] h-8 pl-[6px] pr-[22px] text-center text-xs font-bold leading-none focus:outline-1 focus:outline-blue-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
      <div className="w-3 h-3 absolute right-[6px]"><Pen /></div>
    </label>
  </div>
)
