// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type PlainObject<S extends {} = {}> = object & S

export function isPlainObject(x: unknown): x is PlainObject {
	const ctor = (x as object | null)?.constructor
	return ctor?.name === 'Object'
}
