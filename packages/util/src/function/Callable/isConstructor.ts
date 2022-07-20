// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isFunction } from '../isFunctions.js'
import type { Constructor } from './Constructor.js'

export function isConstructor(x: unknown): x is Constructor {
	return isFunction(x) && typeof (x as Constructor).prototype === 'object'
}
