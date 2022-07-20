// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//! TODO: use findPackageJson util

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable n/global-require */
/* eslint-disable unicorn/prefer-module */

import type { PackageJson } from '../type'

let packageJson: PackageJson | undefined

export class VoltisoError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		try {
			if (!packageJson) packageJson = require('../../package.json')
		} catch {}

		let prefixedMessage = packageJson ? `[${packageJson.name}]` : ''

		if (message) prefixedMessage = `${prefixedMessage} ${message}`

		super(prefixedMessage, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoError'
	}
}
