// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObservable } from './IObservable'

export function isObservableLike(x: unknown): x is IObservable {
	return typeof (x as { subscribe?: unknown } | null)?.subscribe === 'function'
}
