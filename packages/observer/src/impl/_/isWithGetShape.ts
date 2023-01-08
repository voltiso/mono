// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isWithGetShape(x: unknown): x is { getShape: unknown } {
	return (x as { getShape: unknown } | undefined)?.getShape !== undefined
}

export function isWithGetDeepShape(x: unknown): x is { getDeepShape: unknown } {
	return (x as { getDeepShape: unknown } | undefined) !== undefined
}
