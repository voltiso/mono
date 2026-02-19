// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export class VoltisoScriptError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, options)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, unicorn/no-useless-error-capture-stack-trace
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoScriptError'
	}
}
