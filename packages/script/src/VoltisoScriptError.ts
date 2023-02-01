// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export class VoltisoScriptError extends Error {
	constructor(
		message?: string | undefined,
		options?: ErrorOptions | undefined,
	) {
		super(message, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'VoltisoScriptError'
	}
}
