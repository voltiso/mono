export type Primitive = null | undefined | string | number | boolean | symbol | bigint
// export type Primitive = string | number | bigint | boolean | null | undefined // zod (does not include symbol)

export function isPrimitive(x: unknown): x is Primitive {
	return (typeof x !== 'object' && typeof x !== 'function') || x === null
}
