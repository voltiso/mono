// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '@voltiso/util'

export class TransactorError extends VoltisoError {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, { ...options, package: { name: '@voltiso/transactor' } })
		Error.captureStackTrace(this, this.constructor)
		this.name = 'TransactorError'
	}
}
