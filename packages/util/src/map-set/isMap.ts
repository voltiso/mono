// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isMap(x: unknown): x is Map<unknown, unknown> {
	if (x instanceof Map) return true

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (x as object | null)?.constructor?.name === 'Map'
}
