// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isSubset<T>(a: Set<T>, b: Set<T>) {
	for (const x of a) if (!b.has(x)) return false

	return true
}
