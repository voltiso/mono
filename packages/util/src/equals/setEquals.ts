// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isSubset } from '~/map-set'

export function setEquals(a: Set<unknown>, b: Set<unknown>): boolean {
	return a.size === b.size && isSubset(a, b) // && isSubset(b, a)
}
