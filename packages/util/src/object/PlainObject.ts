// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface PlainObject {
	[x: number]: never
}

export function isPlainObject(x: unknown): x is object {
	const ctor = (x as object | null)?.constructor
	return ctor?.name === 'Object'
}
