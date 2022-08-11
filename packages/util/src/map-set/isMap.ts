// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isMap(x: unknown): x is Map<unknown, unknown> {
	if (x instanceof Map) return true

	return (x as object | null)?.constructor.name === 'Map'
}
