// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor, VoltisoUtilError } from '~'

export class AssertionError extends lazyConstructor(() => VoltisoUtilError) {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, options)

		Error.captureStackTrace(this, this.constructor)
		this.name = 'AssertionError'
	}
}
