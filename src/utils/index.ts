import { ENABLE_INSPECTION } from '@/constants'

/** Assigns various objects onto `window.d` object for inspecting and debugging. */
export function inspect(object: AnyObject) {
  if (ENABLE_INSPECTION) Object.assign(((globalThis as unknown as Window).d ??= {}), object)
}

export const sleepResolve = <T = void>(msec: number, retVal?: T) => new Promise<T>((resolve) => setTimeout(resolve, msec, retVal))
export const sleepReject = <T = void>(msec: number, retVal?: T) => new Promise<T>((_, reject) => setTimeout(reject, msec, retVal))
