import React, { useMemo, type PropsWithChildren } from 'react'

import { useOnFocusOutside } from '@/hooks/useOnFocusOutside'
import useToggle from '@/hooks/useToggle'
import { Chevron, Cogwheel } from '@/ui'

interface DropdownProps {
  label: string
  icon?: React.ReactNode | boolean
  options: Array<{
    label: string
    onClick: () => void
  }>
}

export const Dropdown: React.FC<PropsWithChildren<DropdownProps>> = ({ label, icon = true, options: options_ = [] }) => {
  const [isVisible, toggle] = useToggle()

  useOnFocusOutside('Dropdown', toggle, isVisible)

  const options = useMemo(() =>
    options_.map((option) => ({
      ...option,
      onClick() {
        toggle()
        option.onClick()
      }
    })), [options_, toggle])

  return (
    <div id="Dropdown" className="flex-col justify-start items-end gap-1 inline-flex">
      <div onClick={toggle} className="justify-start items-center gap-2 inline-flex cursor-pointer">
        {icon && (
          icon !== true ? icon :
            <div className="w-5 h-5 relative">
              <Cogwheel />
            </div>
        )}
        <div className="justify-start items-center gap-1 flex">
          <div className="text-sm font-bold leading-tight">{label}</div>
          <div id="IconChevronUp" className="w-4 h-4 relative" >
            <Chevron up={isVisible} />
          </div>
        </div>
      </div>
      {isVisible && (
        <div id="DropdownOptions" className="px-px py-3 bg-white rounded-lg shadow border border-slate-300 flex-col justify-start items-start flex">
          {options.map((optionProps) => <DropdownItem key={optionProps.label} {...optionProps} />)}
        </div>
      )}
    </div >
  )
}

export default Dropdown

interface DropdownItemProps {
  label: string
  onClick: () => void
}

export const DropdownItem: React.FC<PropsWithChildren<DropdownItemProps>> = ({ label, onClick }) => (
  <div id="DropdownItem" onClick={onClick} className="px-4 py-2.5 justify-start items-center inline-flex cursor-pointer">
    <div className="w-64 text-center text-sm font-normal leading-tight">{label}</div>
  </div>
)
