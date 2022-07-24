// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '../error'
import { lazyConstructor } from '../lazy'
import type { AlsoAccept } from '../type'

class AssertionError extends lazyConstructor(() => VoltisoUtilError) {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, options)

		Error.captureStackTrace(this, this.constructor)
		this.name = 'AssertionError'
	}
}

export function assert(
	condition: boolean | AlsoAccept<unknown>,
	message?: string,
): asserts condition {
	if (!condition) throw new AssertionError(message)
}
