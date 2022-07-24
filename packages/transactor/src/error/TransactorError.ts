// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '@voltiso/util'

export class TransactorError extends VoltisoError {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		// eslint-disable-next-line unicorn/prefer-module
		super(__dirname, message, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'TransactorError'
	}
}
