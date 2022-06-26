import { packageJson } from "./packageJson.js";

export class VoltisoScriptError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined
	) {
		const packageName = packageJson.name;
		let prefixedMessage = `[${packageName}]`;
		if (message) prefixedMessage = `${prefixedMessage} ${message}`;
		super(prefixedMessage, options);
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
	}
}
