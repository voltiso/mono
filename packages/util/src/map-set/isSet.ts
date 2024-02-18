// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isSet(x: unknown): x is Set<unknown> {
	if (x instanceof Set) return true
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (x as object | null)?.constructor?.name === 'Set'
}
