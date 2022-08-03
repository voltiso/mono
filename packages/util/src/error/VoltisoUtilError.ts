// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { packageInfo } from '~/_/packageInfo'
import { lazyConstructor } from '~/lazy/lazyConstructor'

import { VoltisoError } from './VoltisoError'

export class VoltisoUtilError extends lazyConstructor(() => VoltisoError) {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, { packageInfo, ...options })

		Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoUtilError'
	}
}
