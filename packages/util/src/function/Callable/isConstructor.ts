// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isFunction } from '~'

import type { Constructor } from '.'

export function isConstructor(x: unknown): x is Constructor {
	return isFunction(x) && typeof (x as Constructor).prototype === 'object'
}
