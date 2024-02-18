// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export function _getInstanceConstructorName(x: unknown): string | undefined {
	type T = { constructor?: { name?: string } } | undefined
	return (x as T)?.constructor?.name
}
