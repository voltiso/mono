// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BehaviorSubject } from 'rxjs'

export function isBehaviorSubject<CastToType = unknown>(
	x: unknown,
): x is BehaviorSubject<CastToType> {
	return typeof (x as BehaviorSubject<CastToType> | null)?.getValue === 'function'
}
