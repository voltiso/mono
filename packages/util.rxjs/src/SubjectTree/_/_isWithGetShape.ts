// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal */
export function _isWithGetShape(x: unknown): x is { getShape: unknown } {
	return (x as { getShape: unknown } | undefined)?.getShape !== undefined
}

/** @internal */
export function _isWithGetDeepShape(
	x: unknown,
): x is { getDeepShape: unknown } {
	return (x as { getDeepShape: unknown } | undefined) !== undefined
}
