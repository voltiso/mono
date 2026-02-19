// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Not available publicly in NodeJS yet */
export class AbortError extends Error {
	constructor() {
		super()
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, unicorn/no-useless-error-capture-stack-trace
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		this.name = 'AbortError'
	}
}
