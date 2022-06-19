import packageJson from '../../package.json'
const packageName = packageJson.name

export class SchemarError extends Error {
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
