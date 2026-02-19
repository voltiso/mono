// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isRegex(x: unknown): x is RegExp {
	if (x instanceof RegExp) return true
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	return (x as object | null)?.constructor?.name === 'RegExp'
}
