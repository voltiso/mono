import type { IObservable } from './IObservable'

export function isObservableLike(x: unknown): x is IObservable {
	return typeof (x as { subscribe?: unknown } | null)?.subscribe === 'function'
}
