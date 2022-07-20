// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObject } from '../object'

export function isMap(x: unknown): x is Map<unknown, unknown> {
	if (x instanceof Map) return true

	if (!isObject(x)) return false

	return x.constructor.name === 'Map'
}
