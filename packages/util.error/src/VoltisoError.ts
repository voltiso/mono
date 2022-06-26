import type { FullVersion } from 'package-json'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json') as FullVersion
const packageName = packageJson.name

export class VoltisoError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined
	) {
		let prefixedMessage = `[${packageName}]`
		if (message) prefixedMessage = `${prefixedMessage} ${message}`
		super(prefixedMessage, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name
	}
}
