// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BehaviorSubject } from 'rxjs'

// eslint-disable-next-line etc/no-misused-generics
export function isBehaviorSubject<T = unknown>(
	x: unknown,
): x is BehaviorSubject<T> {
	return typeof (x as BehaviorSubject<T> | null)?.getValue === 'function'
}
