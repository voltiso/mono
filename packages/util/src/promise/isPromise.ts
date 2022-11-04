// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isPromise(x: unknown): x is Promise<unknown> {
	return typeof (x as Promise<any> | null)?.catch === 'function'
}

export function isPromiseLike(x: unknown): x is PromiseLike<unknown> {
	return typeof (x as PromiseLike<any> | null)?.then === 'function'
}
