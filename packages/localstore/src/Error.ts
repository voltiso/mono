// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '@voltiso/util'

export class LocalstoreError extends VoltisoError {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, { ...options, packageInfo: { name: '@voltiso/localstore' } })
		Error.captureStackTrace(this, this.constructor)
		this.name = 'LocalstoreError'
	}
}

export class CongestionError extends LocalstoreError {
	constructor(message?: string, options?: ErrorOptions | undefined) {
		super(message, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'CongestionError'
	}
}
