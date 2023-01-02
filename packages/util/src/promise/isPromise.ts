// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isPromise<CastToType = unknown>(
	x: unknown,
): x is Promise<CastToType> {
	return typeof (x as Promise<any> | null)?.catch === 'function'
}

export function isPromiseLike<CastToType = unknown>(
	x: unknown,
): x is PromiseLike<CastToType> {
	return typeof (x as PromiseLike<any> | null)?.then === 'function'
}
