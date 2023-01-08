// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isFunction } from '~/function'

import type { Constructor } from './Constructor'

export function isConstructor(x: unknown): x is Constructor {
	return isFunction(x) && typeof (x as Constructor).prototype === 'object'
}
