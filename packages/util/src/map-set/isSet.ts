// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isSet(x: unknown): x is Set<unknown> {
	if (x instanceof Set) return true

	return (x as object | null)?.constructor.name === 'Set'
}
