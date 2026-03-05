// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const a = undefined

const b = a

export function shadowSameType(): undefined {
	const undefined = b
	return undefined
}

export function shadowDifferentType(): number {
	const undefined = 123
	return undefined
}
