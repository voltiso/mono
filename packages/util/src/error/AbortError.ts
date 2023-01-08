// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Not available publicly in NodeJS yet */
export class AbortError extends Error {
	constructor() {
		super()
		Error.captureStackTrace(this, this.constructor)
		this.name = 'AbortError'
	}
}
