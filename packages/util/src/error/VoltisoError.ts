// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getPackageJsonCachedSync } from '~/package-json/getPackageJsonCached'

export class VoltisoError extends Error {
	constructor(
		dir: string,
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		const packageJson = getPackageJsonCachedSync(dir)
		let prefixedMessage = `[${packageJson.name}]`

		if (message) prefixedMessage = `${prefixedMessage} ${message}`

		super(prefixedMessage, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoError'
	}
}
