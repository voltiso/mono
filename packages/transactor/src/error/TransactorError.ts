// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '@voltiso/util'

export class TransactorError extends VoltisoError {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, { ...options, packageInfo: { name: '@voltiso/transactor' } })
		Error.captureStackTrace(this, this.constructor)
		this.name = 'TransactorError'
	}
}
