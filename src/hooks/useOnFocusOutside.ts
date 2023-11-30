import { useCallback, useEffect, useMemo } from 'react'

import debounce from '@/utils/debounce'

/**
 * @author Qwerty <qwerty@qwerty.xyz>
 *
 * @description This hook is used to detect mouse clicks and tab navigation outside of a given element.
 *
 * @param {string} id - The id of the element to detect focus outside of.
 * @param {function} callback - The callback to execute when a focus outside of the element is detected.
 * @param {boolean} shouldAttachListeners - An escape hatch for components that are always mounted.
 *
 * @example
 * // used in a component that itself unmounts and thus automatically unregisters the event listeners
 * useOnFocusOutside('Dropdown', () => setIsDropdownOpen(false))
 * // used in a component that is always mounted
 * useOnFocusOutside('Dropdown', () => setIsDropdownOpen(false), isDropdownOpen)
 */

export const useOnFocusOutside = (id: string, callback_: () => void, shouldAttachListeners = true) => {
  const callback = useMemo(() => debounce(callback_, 100, true), [callback_])

  const handleFocusOutside = useCallback(
    (e: FocusEvent) => {
      const path = e.composedPath?.() ?? (e as FocusEvent & { path: Node[] }).path
      if (!path.some((item) => (item as HTMLElement).id === id)) callback()
    },
    [callback, id]
  )

  useEffect(() => {
    if (shouldAttachListeners) {
      window.addEventListener('mousedown', handleFocusOutside)
      window.addEventListener('focusin', handleFocusOutside)
    }
    return () => {
      window.removeEventListener('mousedown', handleFocusOutside)
      window.removeEventListener('focusin', handleFocusOutside)
    }
  }, [handleFocusOutside, shouldAttachListeners])
}
