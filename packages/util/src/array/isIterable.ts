// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isIterable(x: unknown): x is Iterable<unknown> {
	return (
		typeof (x as Iterable<unknown> | null)?.[Symbol.iterator] === 'function'
	)
}
