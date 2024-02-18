// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const a = undefined

const b = a

export function shadowSameType() {
	// eslint-disable-next-line no-shadow-restricted-names
	const undefined = b
	return undefined
}

export function shadowDifferentType() {
	// eslint-disable-next-line no-shadow-restricted-names
	const undefined = 123
	return undefined
}

export {}
