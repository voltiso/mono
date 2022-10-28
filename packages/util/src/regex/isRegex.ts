// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export function isRegex(x: unknown): x is RegExp {
	if (x instanceof RegExp) return true
	return (x as object | null)?.constructor.name === 'RegExp'
}
