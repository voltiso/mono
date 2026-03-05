// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isSubset(a: Set<unknown>, b: Set<unknown>): boolean {
	for (const value of a) if (!b.has(value)) return false
	return true
}
