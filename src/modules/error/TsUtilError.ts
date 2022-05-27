import packageJson from '../../../package.json'
const packageName = packageJson.name

export class TsUtilError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined
	) {
		const prefixedMessage = `[${packageName}] ${message || ''}`
		super(prefixedMessage, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name
	}
}
