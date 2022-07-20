// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function getConstructorName(x: unknown): string | undefined {
	type T = { constructor?: { name?: string } } | undefined
	return (x as T)?.constructor?.name
}
