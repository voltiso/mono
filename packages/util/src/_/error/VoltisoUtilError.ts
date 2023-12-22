// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { packageInfo } from '_/packageInfo'

import { lazyConstructor } from '~/lazy/lazyConstructor'

import {
	parseVoltisoErrorConstructorArguments,
	VoltisoError,
} from './VoltisoError'

export class VoltisoUtilError extends lazyConstructor(() => VoltisoError) {
	constructor(
		message?: string | undefined,
		options?: VoltisoError.Options | undefined,
	)

	constructor(
		options:
			| (VoltisoError.Options & { message?: string | undefined })
			| undefined,
	)

	constructor(
		arg0?:
			| string
			| (VoltisoError.Options & { message?: string | undefined })
			| undefined,
		arg1?: VoltisoError.Options | undefined,
	) {
		const { message, options } = parseVoltisoErrorConstructorArguments(
			arg0,
			arg1,
		)

		super(message, { package: packageInfo, ...options })

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoUtilError'
	}
}
